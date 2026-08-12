import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy init Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Atenció: GEMINI_API_KEY no trobada a process.env. Utilitzant mode simulació si falla.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// API 1: Generate AI Exam Questions (Strictly grounded on PDF text)
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { pdfText, ufTitle, count = 5, difficulty = 'mitjana' } = req.body;

    if (!pdfText) {
      return res.status(400).json({ error: 'Falta el text del document PDF' });
    }

    const prompt = `Ets un catedràtic d'examen d'oposicions a la Policia de Catalunya (ISPC).
Genera exactament ${count} preguntes d'examen de tipus test en CATALÀ per a la Unitat Formativa: "${ufTitle || 'Unitat Formativa'}".

MOLT IMPORTANT - INSTRUCCIÓ STRICTE NOTEBOOK / GROUNDING:
- Les preguntes s'han de basar ÚNICAMENT I EXCLUSIVAMENT en el següent text oficial del PDF proporcionat.
- NO inventis dades ni utilitzis informació exterior que no estigui explícitament escrita al text.
- Cada explicació ha d'indicar la referència exacta del tema, article de llei o pàgina que apareix al text.

TEXT OFICIAL DEL PDF:
"""
${pdfText.slice(0, 15000)}
"""

Nivell de dificultat: ${difficulty}.

Retorna un array JSON de preguntes amb l'esquema exactament definit.`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Ets un generador d\'exàmens d\'oposicions oficials de la Generalitat de Catalunya. Respon sempre en català i en format JSON vàlid.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              pregunta: { type: Type.STRING },
              opcions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              respostaCorrecta: { type: Type.INTEGER, description: 'Índex de 0 a 3 de la resposta correcta' },
              explicacio: { type: Type.STRING },
              referenciaOficial: { type: Type.STRING }
            },
            required: ['pregunta', 'opcions', 'respostaCorrecta', 'explicacio', 'referenciaOficial']
          }
        }
      }
    });

    const jsonText = response.text || '[]';
    const questions = JSON.parse(jsonText);
    res.json({ questions });
  } catch (error: any) {
    console.error('Error generant preguntes amb IA:', error);
    // Fallback error response
    res.status(500).json({
      error: 'No s\'han pogut generar les preguntes mitjançant IA.',
      details: error.message
    });
  }
});

// API 2: Generate Key Summary (Punts Clau per estudiar el dia d'abans)
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { pdfText, ufTitle } = req.body;

    if (!pdfText) {
      return res.status(400).json({ error: 'Falta el text del PDF' });
    }

    const prompt = `Ets un tutor d'oposicions policials a Catalunya.
Genera un resum executiu ultra-concentrat en CATALÀ per a l'estudiant d'oposició per estudiar EL DIA D'ABANS DE L'EXAMEN per a la Unitat Formativa "${ufTitle}".

INSTRUCCIONS:
1. Extraieu els punts clau, números clau, articles de llei (LOFCS 2/86, Llei 4/2003, Llei 10/94, Llei 16/91, Codi Penal, CE, etc.), terminis, principis bàsics (COP) i conceptes clau que solen sortir als exàmens.
2. Organitza el resum en 8-12 punts esquemàtics clars amb guions.
3. El text s'ha de basar ÚNICAMENT en el contingut del PDF aportat.

TEXT DEL PDF:
"""
${pdfText.slice(0, 15000)}
"""`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Ets un resumidor oficial de temaris d\'oposició en català.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titolResum: { type: Type.STRING },
            puntsClau: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            articlesLleiClau: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            consellsExamen: { type: Type.STRING }
          },
          required: ['titolResum', 'puntsClau', 'articlesLleiClau', 'consellsExamen']
        }
      }
    });

    const summaryData = JSON.parse(response.text || '{}');
    res.json(summaryData);
  } catch (error: any) {
    console.error('Error generant resum:', error);
    res.status(500).json({ error: 'Error al generar el resum amb IA', details: error.message });
  }
});

// API 3: AI Tutor RAG Chat (Ask questions about PDF)
app.post('/api/tutor-chat', async (req, res) => {
  try {
    const { pdfText, ufTitle, userQuery, history = [] } = req.body;

    if (!userQuery) {
      return res.status(400).json({ error: 'Falta la consulta de l\'usuari' });
    }

    const systemPrompt = `Ets el Tutor Virtual IA del Moodle d'Oposicions de Policia a Catalunya.
Estàs responent a un alumne sobre la unitat formativa "${ufTitle}".

REGLA D'OR DE GROUNDING:
- Respon de manera amable, pedagògica i molt precisa en CATALÀ.
- Basa la teva resposta ÚNICAMENT en el text oficial del PDF següent.
- Si la resposta no es troba al PDF, digues clarament que el document oficial no conté aquesta informació.
- Cita el tema o article de llei pertinent quan sigui possible.

TEXT OFICIAL DEL PDF:
"""
${pdfText.slice(0, 12000)}
"""`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { role: 'user', parts: [{ text: `Pregunta de l'alumne: ${userQuery}` }] }
      ],
      config: {
        systemInstruction: systemPrompt
      }
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error('Error en el tutor IA:', error);
    res.status(500).json({ error: 'No s\'ha pogut processar la consulta del tutor IA.' });
  }
});

// Vite or Static files handling
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server d'Oposicions Moodle actiu a http://localhost:${PORT}`);
  });
}

setupServer();
