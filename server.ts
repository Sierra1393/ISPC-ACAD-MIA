import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// ============================================================
// STRIPE
// ============================================================

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;

if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey);
} else {
  console.warn(
    'Atenció: STRIPE_SECRET_KEY no trobada a process.env. Stripe no estarà disponible.'
  );
}

const STRIPE_PRICE_BASIC =
  'price_1U5LbOV05ct9VkZWtl30q3E7';

const STRIPE_PRICE_PRO =
  'price_1U5LboV05ct9VkZWu1JnIKK7';

// ============================================================
// EXPRESS
// ============================================================

app.use(express.json({ limit: '10mb' }));

// ============================================================
// GEMINI
// ============================================================

// Lazy init Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn(
        'Atenció: GEMINI_API_KEY no trobada a process.env. Utilitzant mode simulació si falla.'
      );
    }

    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  return aiClient;
}

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
  });
});

// ============================================================
// STRIPE CHECKOUT
// ============================================================

app.post(
  '/api/create-checkout-session',
  async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({
          error:
            'Stripe no està configurat. Falta STRIPE_SECRET_KEY.',
        });
      }

      const {
        planId,
        userId,
        userEmail,
      } = req.body;

      if (
        planId !== 'basic' &&
        planId !== 'pro'
      ) {
        return res.status(400).json({
          error: 'El pla seleccionat no és vàlid.',
        });
      }

      const priceId =
        planId === 'basic'
          ? STRIPE_PRICE_BASIC
          : STRIPE_PRICE_PRO;

      const baseUrl =
        process.env.APP_URL ||
        `${req.protocol}://${req.get('host')}`;

      const session =
        await stripe.checkout.sessions.create({
          mode: 'subscription',

          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],

          customer_email:
            typeof userEmail === 'string' &&
            userEmail.trim()
              ? userEmail.trim().toLowerCase()
              : undefined,

          client_reference_id:
            typeof userId === 'string'
              ? userId
              : undefined,

          success_url:
            `${baseUrl}/?stripe_success=true&session_id={CHECKOUT_SESSION_ID}`,

          cancel_url:
            `${baseUrl}/?stripe_cancelled=true`,

          billing_address_collection:
            'auto',

          allow_promotion_codes: true,

          metadata: {
            planId,
            userId:
              typeof userId === 'string'
                ? userId
                : '',
          },
        });

      return res.json({
        success: true,
        url: session.url,
      });
    } catch (error: any) {
      console.error(
        'Error creant la sessió de Stripe:',
        error
      );

      return res.status(500).json({
        error:
          'No s’ha pogut crear la sessió de pagament.',
        details: error.message,
      });
    }
  }
);

// ============================================================
// API 1: GENERATE AI EXAM QUESTIONS
// ============================================================

app.post(
  '/api/generate-quiz',
  async (req, res) => {
    try {
      const {
        pdfText,
        ufTitle,
        count = 5,
        difficulty = 'mitjana',
      } = req.body;

      if (!pdfText) {
        return res.status(400).json({
          error: 'Falta el text del temari',
        });
      }

      const prompt = `Ets un catedràtic d'examen d'oposicions a la Policia de Catalunya.
Genera exactament ${count} preguntes d'examen de tipus test en CATALÀ per a la Unitat Formativa: "${ufTitle || 'Unitat Formativa'}".

MOLT IMPORTANT - INSTRUCCIÓ STRICTE NOTEBOOK / GROUNDING:
- Les preguntes s'han de basar ÚNICAMENT I EXCLUSIVAMENT en el següent text oficial del temari proporcionat.
- NO inventis dades ni utilitzis informació exterior que no estigui explícitament escrita al text.
- Cada explicació ha d'indicar la referència exacta del tema, article de llei o secció que apareix al text.

TEXT OFICIAL DEL TEMARI:
"""
${pdfText.slice(0, 15000)}
"""

Nivell de dificultat: ${difficulty}.

Retorna un array JSON de preguntes amb l'esquema exactament definit.`;

      const ai = getGeminiClient();

      const response =
        await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            systemInstruction:
              "Ets un generador d'exàmens d'oposicions oficials de la Generalitat de Catalunya. Respon sempre en català i en format JSON vàlid.",
            responseMimeType:
              'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: {
                    type: Type.STRING,
                  },
                  pregunta: {
                    type: Type.STRING,
                  },
                  opcions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                  },
                  respostaCorrecta: {
                    type: Type.INTEGER,
                    description:
                      'Índex de 0 a 3 de la resposta correcta',
                  },
                  explicacio: {
                    type: Type.STRING,
                  },
                  referenciaOficial: {
                    type: Type.STRING,
                  },
                },
                required: [
                  'pregunta',
                  'opcions',
                  'respostaCorrecta',
                  'explicacio',
                  'referenciaOficial',
                ],
              },
            },
          },
        });

      const jsonText =
        response.text || '[]';

      const questions =
        JSON.parse(jsonText);

      res.json({
        questions,
      });
    } catch (error: any) {
      console.error(
        'Error generant preguntes amb IA:',
        error
      );

      res.status(500).json({
        error:
          "No s'han pogut generar les preguntes mitjançant IA.",
        details: error.message,
      });
    }
  }
);

// ============================================================
// API 2: GENERATE KEY SUMMARY
// ============================================================

app.post(
  '/api/generate-summary',
  async (req, res) => {
    try {
      const {
        pdfText,
        ufTitle,
      } = req.body;

      if (!pdfText) {
        return res.status(400).json({
          error: 'Falta el text del temari',
        });
      }

      const prompt = `Ets un formador d'oposicions policials a Catalunya.
Genera un resum executiu ultra-concentrat en CATALÀ per a l'estudiant d'oposició per estudiar EL DIA D'ABANS DE L'EXAMEN per a la Unitat Formativa "${ufTitle}".

INSTRUCCIONS:
1. Extraieu els punts clau, números clau, articles de llei (LOFCS 2/86, Llei 4/2003, Llei 10/94, Llei 16/91, Codi Penal, CE, etc.), terminis, principis bàsics (COP) i conceptes clau que solen sortir als exàmens.
2. Organitza el resum en 8-12 punts esquemàtics clars amb guions.
3. El text s'ha de basar ÚNICAMENT en el contingut del temari aportat.

TEXT DEL TEMARI:
"""
${pdfText.slice(0, 15000)}
"""`;

      const ai = getGeminiClient();

      const response =
        await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            systemInstruction:
              "Ets un resumidor oficial de temaris d'oposició en català.",
            responseMimeType:
              'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                titolResum: {
                  type: Type.STRING,
                },
                puntsClau: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                articlesLleiClau: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                consellsExamen: {
                  type: Type.STRING,
                },
              },
              required: [
                'titolResum',
                'puntsClau',
                'articlesLleiClau',
                'consellsExamen',
              ],
            },
          },
        });

      const summaryData =
        JSON.parse(
          response.text || '{}'
        );

      res.json(summaryData);
    } catch (error: any) {
      console.error(
        'Error generant resum:',
        error
      );

      res.status(500).json({
        error:
          "Error al generar el resum amb IA",
        details: error.message,
      });
    }
  }
);

// ============================================================
// API 3: AI TUTOR RAG CHAT
// ============================================================

app.post(
  '/api/tutor-chat',
  async (req, res) => {
    try {
      const {
        pdfText,
        ufTitle,
        userQuery,
        userSurname = 'GARCÍA',
        history = [],
      } = req.body;

      if (!userQuery) {
        return res.status(400).json({
          error:
            "Falta la consulta de l'usuari",
        });
      }

      const surnameUpper =
        String(userSurname)
          .trim()
          .toUpperCase() ||
        'GARCÍA';

      const systemPrompt = `Ets el Formador Virtual IA del Moodle d'Oposicions de Policia a Catalunya.
Estàs atenent a l'alumne/a Sr. o Sra. ${surnameUpper} sobre la unitat formativa "${ufTitle}".

INSTRUCCIÓ D'ESTIL I SALUTACIÓ (MOLT IMPORTANT):
- NO utilitzis salutacions repetitives com "Hola", "Hola, Sr. o Sra. ${surnameUpper}" ni entradetes de benvinguda a cada resposta (la salutació inicial ja s'ha fet una sola vegada a l'inici).
- Respon DIRECTAMENT a la pregunta de l'alumne amb el contingut i text literal del temari oficial en PDF.

REGLA D'OR DE GROUNDING I TEXT LITERAL:
- Respon de manera directa, rigorosa, clara i molt precisa en CATALÀ.
- Basa la teva resposta ÚNICAMENT en el text oficial del temari següent.
- Proporciona el text literal, la definició o els paràgrafs del PDF que responen exactament a la dubte.
- Si la resposta no es troba al temari, indica directament que el document oficial no conté aquesta informació.

INSTRUCCIÓ DE SUBRATLLAT EN GROC (MOLT IMPORTANT):
- NO utilitzis mai triples asteriscos (***) ni asteriscos solts desordenats.
- Marca TOTS els conceptes clau, termes jurídics, articles de llei, terminis, xifres i paraules d'examen importants utilitzant la NEGRETA AMB DOS ASTERIS**com aquest**.
- L'aplicació mostrarà automàticament qualsevol text entre **àsteriscos** amb un fons i subratllat GROC destacat per a la lectura de l'estudiant.

TEXT OFICIAL DEL TEMARI:
"""
${pdfText.slice(0, 12000)}
"""`;

      const ai = getGeminiClient();

      const response =
        await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Pregunta de l'alumne: ${userQuery}`,
                },
              ],
            },
          ],
          config: {
            systemInstruction:
              systemPrompt,
          },
        });

      res.json({
        answer: response.text,
      });
    } catch (error: any) {
      console.error(
        'Error en el tutor IA:',
        error
      );

      res.status(500).json({
        error:
          "No s'ha pogut processar la consulta del tutor IA.",
      });
    }
  }
);

// ============================================================
// VITE / STATIC FILES
// ============================================================

async function setupServer() {
  if (
    process.env.NODE_ENV !==
    'production'
  ) {
    const {
      createServer: createViteServer,
    } = await import('vite');

    const vite =
      await createViteServer({
        server: {
          middlewareMode: true,
        },
        appType: 'spa',
      });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(
      process.cwd(),
      'dist'
    );

    app.use(
      express.static(distPath)
    );

    app.get('*', (req, res) => {
      res.sendFile(
        path.join(
          distPath,
          'index.html'
        )
      );
    });
  }

  app.listen(
    PORT,
    '0.0.0.0',
    () => {
      console.log(
        `Server d'Oposicions Moodle actiu a http://localhost:${PORT}`
      );
    }
  );
}

// En Vercel l'aplicació s'importa des de api/index.ts. No ha d'obrir un port
// propi, perquè Vercel ja s'encarrega de rebre les peticions.
if (!process.env.VERCEL) {
  setupServer();
}

export default app;

