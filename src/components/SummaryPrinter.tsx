import React, { useState } from 'react';
import { FormativeUnit, TopicContent } from '../types';
import { Download, Printer, Sparkles, Zap, CheckCircle2, AlertCircle, BookOpen, Shield, CheckCircle, X, HelpCircle, FileText, Info } from 'lucide-react';

export interface ConceptModalData {
  term: string;
  literalExcerpt: string;
  topicTitle?: string;
  definition: string;
  legalBasis: string;
  examTip: string;
}

const CONCEPT_DICTIONARY: Record<string, { term: string; definition: string; legalBasis: string; examTip: string }> = {
  'integritat': {
    term: 'Dret a la Integritat Física i Moral (Art. 15 CE)',
    definition: 'Dret fonamental derivat de la dignitat humana que prohibeix de forma absoluta la tortura, les penes o tractes cruels, inhumans o degradants. Protegeix la persona davant de qualsevol agressió o patiment físic o psíquic il·legítim durant actuacions o custòdia policial.',
    legalBasis: 'Article 15 de la Constitució Espanyola (CE) i Articles 174 a 177 del Codi Penal.',
    examTip: 'És un Dret Fonamental de màxima protecció (recurs d\'empara davant el Tribunal Constitucional) que no admet cap mena d\'excepció en estat d\'emergència.'
  },
  'tortura': {
    term: 'Prohibició de la Tortura i Tractes Inhumans',
    definition: 'Sotmetiment d\'una persona a patiments físics o mentals greus per part de funcionaris públics per obtenir confessions o informació. La prohibició és absoluta, incondicional i inderogable.',
    legalBasis: 'Art. 15 CE, Arts. 174-176 CP i Art. 3 del Conveni Europeu de Drets Humans.',
    examTip: 'A les oposicions sol demanar-se si la prohibició admet excepcions en estat de guerra o d\'emergència: La resposta és NO, és un dret absolut.'
  },
  'drets humans': {
    term: 'Dret Internacional dels Drets Humans (DUDH / CEDH)',
    definition: 'Conjunt de normes i principis universals inherents a totes les persones que fixen els límits i deures dels poders públics i dels agents de policia.',
    legalBasis: 'DUDH (ONU 1948) i CEDH (Consell d\'Europa 1950).',
    examTip: 'S\'ha de dominar la diferència entre la DUDH (Declaració Universal de l\'ONU) i el CEDH (Conveni Europeu protegit pel TEDH d\'Estrasburg).'
  },
  'prohibició absoluta': {
    term: 'Prohibició Absoluta i Inderogable',
    definition: 'Principi dretà segons el qual un dret (com la prohibició de la tortura o tractes inhumans) no pot ésser de cap manera restringit, suspès o devaluat, ni tan sols en circumstàncies excepcionals.',
    legalBasis: 'Art. 15 CE i Art. 3 del CEDH.',
    examTip: 'Molt preguntat a l\'examen: Els drets de l\'Art. 15 CE no es poden suspendre ni en els estats d\'excepció o de setge (Art. 55 CE).'
  },
  'llei 4/2003': {
    term: 'Llei 4/2003 de Seguretat Pública de Catalunya',
    definition: 'Llei marc que regula el Sistema de Seguretat Pública de Catalunya. Organitza les competències de la Generalitat, el Consell de Seguretat de Catalunya i la coordinació operativa entre el Cos de Mossos d\'Esquadra i les Policies Locals de Catalunya.',
    legalBasis: 'Llei 4/2003, de 7 d\'abril, del Sistema de Seguretat Pública de Catalunya (DOGC núm. 3865).',
    examTip: 'A l\'examen d\'oposicions sol sortir la composició i funcions de les Juntes Locals de Seguretat i del Consell de Seguretat de Catalunya com a òrgan consultiu superior.'
  },
  'cecat 112': {
    term: 'CECAT 112 (Centre de Coordinació Operativa de Catalunya)',
    definition: 'Centre neuràlgic de gestió d\'emergències i informació en temps real de la Generalitat de Catalunya. Coordina els plans territorials i especials de Protecció Civil (PROCICAT, PLASEQCAT, INFOCAT) i centralitza les trucades del 112.',
    legalBasis: 'Llei 4/1997 de Protecció Civil de Catalunya i Llei 4/2003 de Seguretat Pública.',
    examTip: 'A l\'examen sol sortir com l\'òrgan encarregat d\'activar els plans especials de protecció civil i coordinar la resposta multisectorial.'
  },
  'principis cop': {
    term: 'Principis Basso d\'Actuació: COP (Congruència, Oportunitat i Proporcionalitat)',
    definition: 'Trinomi constitucional i legal indispensable per a l\'ús de la força i els mitjans de protecció policial. Congruència: la mesura ha de ser adequada a l\'objectiu; Oportunitat: l\'actuació ha de realitzar-se en el moment adequat; Proporcionalitat: els mitjans no han de superar la gravetat de la situació.',
    legalBasis: 'Art. 5.2 LOFCS 2/1986 i Art. 11 de la Llei 10/1994 del Cos de Mossos d\'Esquadra.',
    examTip: 'Pregunta d\'examen garantida: L\'ús d\'armes de foc exigeix oportunitat, congruència i proporcionalitat davant de riscos racionals per a la vida o integritat física.'
  },
  'lofcs 2/1986': {
    term: 'LOFCS 2/1986 (Llei Orgànica de Forces i Cossos de Seguretat)',
    definition: 'Llei estatal bàsica que regula el marc general de la seguretat pública a Espanya, els principis bàsics d\'actuació de tots els membres dels Cossos de Seguretat i la distribució de competències entre la Policia Nacional, la Guàrdia Civil, les Policies Autonòmiques i les Policies Locals.',
    legalBasis: 'Llei Orgànica 2/1986, de 13 de març (BOE núm. 63).',
    examTip: 'Estudia minuciosament l\'Article 5 (Principis Bàsics d\'Actuació): neutralitat política, imparcialitat, dedicació professional i secret professional.'
  },
  'llei 10/1994': {
    term: 'Llei 10/1994 del Cos de Mossos d\'Esquadra',
    definition: 'Llei reguladora del Cos de Mossos d\'Esquadra com a policia ordinària i integral de Catalunya. Defineix la seva estructura, escala de comandament, drets i deures, règim disciplinari i principis operatius.',
    legalBasis: 'Llei 10/1994, de 11 de juliol, de la Generalitat de Catalunya.',
    examTip: 'Distingeix clarament les funcions de la Policia de la Generalitat: policia de seguretat ciutadana, policia administrativa, policia judicial i d\'investigació criminal.'
  },
  'llei 16/1991': {
    term: 'Llei 16/1991 de les Policies Locals de Catalunya',
    definition: 'Normativa que regula la naturalesa, organització i funcions dels Cossos de Policia Local dels municipis de Catalunya. Estableix que són institucions armades de naturalesa civil.',
    legalBasis: 'Llei 16/1991, de 10 de juliol (DOGC núm. 1469).',
    examTip: 'Recorda que la Policia Local té competència exclusiva en la regulació i ordenació del trànsit urbà i policia administrativa municipal.'
  },
  'presumpció de veracitat': {
    term: 'Presumpció de Veracitat de les Actes i Denúncies Policials',
    definition: 'Garantia jurídica (iuris tantum) per la qual les declaracions, atestats i denúncies formalitzades per agents de l\'autoritat en l\'exercici de les seves funcions gaudeixen de valor provatori davant l\'Administració, excepte prova en contrari presentada per l\'interessat.',
    legalBasis: 'Art. 77.5 de la Llei 39/2015 del Procediment Administratiu Comú.',
    examTip: 'Aquesta presumpció només s\'aplica als fets constatats directament per l\'agent de la seva pròpia percepció sensorial, no a apreciacions subjectives.'
  },
  'protocol d\'istanbul': {
    term: 'Protocol d\'Istanbul (ONU)',
    definition: 'Manual per a la investigació i documentació eficaç de la tortura i altres tractes o penes cruels, inhumans o degradants. Fixa directrius mèdiques, psicològiques i jurídiques per a la protecció de persones sota custòdia policial.',
    legalBasis: 'Adoptat per l\'Alt Comissionat de les Nacions Unides per als Drets Humans (1999).',
    examTip: 'Vinculat directament amb l\'Article 15 de la CE i l\'Article 520 de la LECrim sobre els drets dels detinguts.'
  },
  'tedh': {
    term: 'Tribunal Europeu de Drets Humans (TEDH)',
    definition: 'Òrgan judicial internacional de caràcter permanent amb seu a Estrasburg. Vetlla pel compliment i la interpretació del Conveni Europeu de Drets Humans (CEDH) de 1950.',
    legalBasis: 'Conveni Europeu per a la Protecció dels Drets Humans i de les Llibertats Fonamentals.',
    examTip: 'El TEDH exigeix investigacions judicials i policials exhaustives davant de qualsevol denúncia de tractes inhumans o ús il·legítim de la força.'
  },
  'art. 104 ce': {
    term: 'Article 104 de la Constitució Espanyola',
    definition: 'Estableix que les Forces i Cossos de Seguretat, sota la dependència del Govern, tenen com a missió protegir el lliure exercici dels drets i llibertats i garantir la seguretat ciutadana. Una Llei Orgànica (LOFCS 2/86) en determina els deures i principis.',
    legalBasis: 'Constitució Espanyola de 1978, Títol IV.',
    examTip: 'És l\'article constitucional fonament de totes les fons del Dret Policial a Espanya.'
  },
  'art. 15 ce': {
    term: 'Article 15 de la Constitució Espanyola (Integritat i Vida)',
    definition: 'Tots tenen dret a la vida i a la integritat física i moral, sense que, en cap cas, puguin ésser sotmesos a tortura ni a penes o tractes inhumans o degradants. Queda abolida la pena de mort.',
    legalBasis: 'Constitució Espanyola de 1978, Títol I, Capítol 2n, Secció 1a.',
    examTip: 'És un Dret Fonamental de màxima protecció (recurs d\'empara davant del Tribunal Constitucional).'
  },
  'art. 17 ce': {
    term: 'Article 17 de la Constitució Espanyola (Dret a la Llibertat)',
    definition: 'Tota persona té dret a la llibertat i a la seguretat. Ningú no pot ésser privat de la seva llibertat sinó amb l\'observança del que s\'estableix en aquest article i en els casos i en la forma previstos en la llei. La detenció preventiva no pot durar més del temps strictly necessari (màxim 72 hores).',
    legalBasis: 'Constitució Espanyola de 1978, Art. 17 i Llei Orgànica 6/1984 d\'Habeas Corpus.',
    examTip: 'Garanteix la informació immediata dels drets al detingut, assistència de lletrat i el procediment d\'Habeas Corpus.'
  },
  'art. 18 ce': {
    term: 'Article 18 de la Constitució Espanyola (Inviolabilitat del Domicili)',
    definition: 'Garanteix el dret a l\'honor, a la intimat personal i familiar i a la pròpia imatge. El domicili és inviolable. Cap entrada o escorcolls no es podrà fer sense consentiment del titular o resolució judicial, llevat de cas de delicte flagrant.',
    legalBasis: 'Constitució Espanyola de 1978, Títol I.',
    examTip: 'Molt important per a les actuacions policials: Les 3 excepcions per entrar en un domicili són: consentiment del titular, autorització judicial o delicte flagrant.'
  },
  'lo 4/2015': {
    term: 'Llei Orgànica 4/2015 de Protecció de la Seguretat Ciutadana',
    definition: 'Regula les actuacions de manteniment de la seguretat ciutadana, la protecció de persones i béns, el règim de sancions administratives, la identificació de persones a la via pública i els escorcolls corporals.',
    legalBasis: 'Llei Orgànica 4/2015, de 30 de març (BOE núm. 77).',
    examTip: 'Distingeix entre infraccions molt greus, greus (ex. desobediència o falta de respecte als agents) i lleus.'
  },
  'procicat': {
    term: 'PROCICAT (Pla Territorial de Protecció Civil de Catalunya)',
    definition: 'Pla multifuncional que estableix l\'estructura organitzativa i de resposta de les administracions catalanes per fer front a situacions de greu risc col·lectiu, calamitat pública o catàstrofe a Catalunya.',
    legalBasis: 'Llei 4/1997 de Protecció Civil de Catalunya.',
    examTip: 'Es diferencia dels Plans Especials (INFOCAT, PLASEQCAT, RADICAT) en què el PROCICAT és un pla territorial general.'
  },
  'junta local de seguretat': {
    term: 'Junta Local de Seguretat',
    definition: 'Òrgan col·legiat col·laboratiu en l\'àmbit municipal, presidit per l\'Alcalde/ssa, que reuneix representants del municipi, de la Policia Local, dels Mossos d\'Esquadra i de les FCS de l\'Estat per intercanviar informació i coordinar la seguretat local.',
    legalBasis: 'Art. 38 de la Llei 4/2003 del Sistema de Seguretat Pública de Catalunya.',
    examTip: 'Està presidida per l\'Alcalde, però el Conseller/a d\'Interior la pot co-presidir quan hi assisteixi.'
  }
};

function renderHighlightedText(text: string, term: string) {
  if (!term || !text) return text;
  const cleanTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  if (!cleanTerm) return text;

  let regex: RegExp;
  try {
    regex = new RegExp(`(${cleanTerm})`, 'gi');
  } catch {
    return text;
  }

  const parts = text.split(regex);
  if (parts.length <= 1) {
    const mainWords = cleanTerm.split(/\s+/).filter(w => w.length > 3);
    if (mainWords.length > 0) {
      try {
        const pattern = mainWords.map(w => `\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).join('|');
        const wordRegex = new RegExp(`(${pattern})`, 'gi');
        const wordParts = text.split(wordRegex);
        return (
          <span>
            {wordParts.map((part, i) =>
              mainWords.some(mw => mw.toLowerCase() === part.toLowerCase()) ? (
                <mark key={i} className="bg-amber-300 text-slate-950 font-black px-1 py-0.5 rounded border border-amber-400">
                  {part}
                </mark>
              ) : (
                part
              )
            )}
          </span>
        );
      } catch {
        return text;
      }
    }
    return text;
  }

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === cleanTerm.toLowerCase() ? (
          <mark key={i} className="bg-amber-300 text-slate-950 font-black px-1.5 py-0.5 rounded border border-amber-400">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function resolveConceptModalData(
  rawTerm: string,
  uf: FormativeUnit,
  topics?: TopicContent[],
  currentTopicTitle?: string
): ConceptModalData {
  const cleanTerm = rawTerm.trim();
  const searchLower = cleanTerm.toLowerCase();
  const allTopics = topics || uf.temes || [];

  let foundExcerpt = '';
  let foundTopicTitle = currentTopicTitle || `Unitat Formativa ${uf.code}`;

  const searchWords = searchLower.replace(/[()]/g, '').split(/\s+/).filter(w => w.length > 2);

  // 1. Search in current topic's desenvolupamentText first
  if (currentTopicTitle) {
    const topic = allTopics.find(t => t.titolTema === currentTopicTitle);
    if (topic && topic.desenvolupamentText) {
      for (const p of topic.desenvolupamentText) {
        if (p.toLowerCase().includes(searchLower)) {
          foundExcerpt = p;
          foundTopicTitle = topic.titolTema;
          break;
        }
      }
      if (!foundExcerpt) {
        for (const p of topic.desenvolupamentText) {
          if (searchWords.some(w => p.toLowerCase().includes(w))) {
            foundExcerpt = p;
            foundTopicTitle = topic.titolTema;
            break;
          }
        }
      }
    }
  }

  // 2. Search across ALL topics' desenvolupamentText
  if (!foundExcerpt) {
    for (const topic of allTopics) {
      if (topic.desenvolupamentText) {
        for (const p of topic.desenvolupamentText) {
          if (p.toLowerCase().includes(searchLower)) {
            foundExcerpt = p;
            foundTopicTitle = topic.titolTema;
            break;
          }
        }
      }
      if (foundExcerpt) break;
    }
  }

  // Fallback 2b: Search all topics for searchWords
  if (!foundExcerpt) {
    for (const topic of allTopics) {
      if (topic.desenvolupamentText) {
        for (const p of topic.desenvolupamentText) {
          if (searchWords.some(w => p.toLowerCase().includes(w))) {
            foundExcerpt = p;
            foundTopicTitle = topic.titolTema;
            break;
          }
        }
      }
      if (foundExcerpt) break;
    }
  }

  // 3. Search in resumPuntsClau
  if (!foundExcerpt && uf.resumPuntsClau) {
    for (const point of uf.resumPuntsClau) {
      if (point.toLowerCase().includes(searchLower) || searchWords.some(w => point.toLowerCase().includes(w))) {
        foundExcerpt = point;
        foundTopicTitle = `Punts Clau d'Examen (${uf.code})`;
        break;
      }
    }
  }

  // 4. Search in pdfTextContingut
  if (!foundExcerpt && uf.pdfTextContingut) {
    const lines = uf.pdfTextContingut.split('\n').filter(l => l.trim().length > 10);
    for (const l of lines) {
      if (l.toLowerCase().includes(searchLower) || searchWords.some(w => l.toLowerCase().includes(w))) {
        foundExcerpt = l.trim();
        foundTopicTitle = `Temari Oficial (${uf.code})`;
        break;
      }
    }
  }

  // Fallback excerpt if not found in any text
  if (!foundExcerpt) {
    foundExcerpt = `A la Unitat Formativa ${uf.code} (${uf.titol}), el concepte "${cleanTerm}" és un terme fonamental que regula les garanties, principis i procediments oficials per a l'oposició.`;
  }

  // Lookup or build dictionary base
  const cleanKey = searchLower;
  let baseDict = CONCEPT_DICTIONARY[cleanKey];

  if (!baseDict) {
    const matchKey = Object.keys(CONCEPT_DICTIONARY).find(k => cleanKey.includes(k) || k.includes(cleanKey));
    if (matchKey) {
      baseDict = CONCEPT_DICTIONARY[matchKey];
    }
  }

  if (!baseDict) {
    baseDict = {
      term: cleanTerm,
      definition: `El terme "${cleanTerm}" és un concepte clau del Temari Oficial de la ${uf.code}${currentTopicTitle ? ` (${currentTopicTitle})` : ''}. Defineix la doctrina jurídica, els principis d'actuació i els marcs de seguretat pública requerits a l'examen.`,
      legalBasis: `Temari Oficial de la Unitat Formativa ${uf.code} • Normativa de Seguretat Pública de Catalunya.`,
      examTip: `A l'examen tipus test sobre "${cleanTerm}", presta molta atenció a la definició exacta, les excepcions previstes a la llei i la seva relació amb la funció policial.`
    };
  }

  return {
    term: baseDict.term || cleanTerm,
    literalExcerpt: foundExcerpt,
    topicTitle: foundTopicTitle,
    definition: baseDict.definition,
    legalBasis: baseDict.legalBasis,
    examTip: baseDict.examTip
  };
}

interface SummaryPrinterProps {
  uf: FormativeUnit;
  topics?: TopicContent[];
  onRegenerateSummary?: () => void;
  isLoadingAi?: boolean;
  onAskTutor?: (query: string) => void;
}

export const SummaryPrinter: React.FC<SummaryPrinterProps> = ({
  uf,
  topics,
  onRegenerateSummary,
  isLoadingAi = false,
  onAskTutor
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<ConceptModalData | null>(null);

  // Fallback to compute topics if not provided
  const getTopics = (): TopicContent[] => {
    if (topics && topics.length > 0) return topics;
    if (uf.temes && uf.temes.length > 0) return uf.temes;

    const indexItems = uf.indexPdf && uf.indexPdf.length > 0
      ? uf.indexPdf
      : uf.resumPuntsClau.map((p, i) => `Tema ${i + 1}. ${p.split(':')[0] || p}`);

    return indexItems.map((item, idx) => {
      const rawParagraph = uf.resumPuntsClau[idx] || uf.pdfTextContingut || '';
      const parts = rawParagraph.split(':');
      const topicHeading = item.startsWith('Tema') ? item : `Tema ${idx + 1}. ${item}`;
      const keyHighlight = parts.length > 1 ? parts[0] : `Punt Clau d'Examen ${idx + 1}`;
      const mainBody = parts.length > 1 ? parts.slice(1).join(':') : rawParagraph;

      return {
        titolTema: topicHeading,
        desenvolupamentText: [mainBody.trim() || rawParagraph],
        subratllatVerd: [keyHighlight.trim(), `Temari Oficial ${uf.code}`],
        destacatsVermell: [`Llei i Concepte Destacat: ${keyHighlight.trim()}`],
        resumBreu: `Síntesi executiva del ${topicHeading}: ${mainBody.trim() || rawParagraph}`
      };
    });
  };

  const activeTopics = getTopics();

  const handleDownload = () => {
    let textContent = `=====================================================
PLATAFORMA DE FORMACIÓ ALPHA 13
Oposicions Policies (Curs 2026-2027)
TARGETES FLASH & SÍNTESI D'URGÈNCIA
Unitat Formativa: ${uf.code} - ${uf.titol}
Data de descàrrega: ${new Date().toLocaleDateString('ca-ES')}
=====================================================

⚡ TARGETES FLASH TEMA PER TEMA (VERD & VERMELL):

`;

    activeTopics.forEach((t, i) => {
      textContent += `-----------------------------------------------------\n`;
      textContent += `${t.titolTema.toUpperCase()}\n`;
      textContent += `Síntesi: ${t.resumBreu}\n\n`;
      textContent += `🟡 CONCEPTES I TERMES CLAU (SUBRATLLAT EN GROC):\n`;
      t.subratllatVerd.forEach(v => {
        textContent += `  - ${v}\n`;
      });
      textContent += `\n🔴 DESTACAT I CLAU D'EXAMEN (EN VERMELL):\n`;
      t.destacatsVermell.forEach(r => {
        textContent += `  - ${r}\n`;
      });
      textContent += `\n`;
    });

    textContent += `=====================================================\n`;
    textContent += `🎯 PUNTS CLAU D'EXAMEN:\n\n`;
    uf.resumPuntsClau.forEach((p, idx) => {
      textContent += `${idx + 1}. ${p}\n\n`;
    });

    textContent += `=====================================================\n`;
    textContent += `Generat des de la Plataforma de Formació ALPHA 13\n`;
    textContent += `=====================================================`;

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Targetes_Flash_${uf.code.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 text-slate-800 shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs">
            <Zap className="w-6 h-6 text-amber-600 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 font-mono text-xs font-extrabold px-2.5 py-0.5 rounded border border-amber-300">
                ⚡ Secció Flash
              </span>
              <span className="text-slate-500 text-xs font-medium">Repàs d'Alta Intensitat</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Targetes Flash: {uf.code} - {uf.titol}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onRegenerateSummary && (
            <button
              onClick={onRegenerateSummary}
              disabled={isLoadingAi}
              className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-indigo-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {isLoadingAi ? 'Regenerant...' : 'Regenerar Flash ⚡'}
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            Imprimir
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            Descarregar Flash (.TXT)
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Targetes Flash descarregades amb èxit! Guardades al teu dispositiu.
        </div>
      )}

      {/* Explanatory Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-emerald-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-800 shadow-2xs">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-extrabold text-sm text-slate-900">
              ⚡ Estructura de les Targetes Flash
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              En aquest apartat trobaràs de manera destacada tot el contingut subratllat de la pestanya <strong>Temari</strong>:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-extrabold text-amber-950 bg-amber-200 border border-amber-400 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                🟡 DESTACAT EN GROC: Conceptes i termes clau
              </span>
              <span className="font-extrabold text-red-900 bg-red-100 border border-red-300 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                🔴 EN VERMELL: Destacats i clau d'examen
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable / Main Flash Cards Content */}
      <div id="printable-summary" className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-7 space-y-6 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Academic Watermark / Header */}
        <div className="flex items-center justify-between border-b border-slate-200 print:border-black pb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-600 print:text-black" />
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 print:text-black">
                Plataforma de Formació en Seguretat Pública
              </h2>
              <p className="text-xs text-slate-500 print:text-gray-600">
                Fitxa de Targetes Flash • Acadèmia ALPHA 13 - Curs 2026-2027
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-amber-700 print:text-black">{uf.code}</span>
            <p className="text-[11px] text-slate-500 print:text-gray-500">Temari Oficial</p>
          </div>
        </div>

        {/* Section 1: Flash Cards Tema per Tema */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 print:text-black flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Targetes Flash Tema per Tema:
          </h4>

          <div className="space-y-4">
            {activeTopics.map((topic, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white border border-slate-200 print:bg-gray-50 print:border-gray-300 space-y-4 shadow-xs"
              >
                {/* Topic Header */}
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                  <span className="w-6 h-6 rounded bg-amber-600 text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {index + 1}
                  </span>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900 print:text-black">
                    {topic.titolTema}
                  </h5>
                </div>

                {/* Síntesi Executiva */}
                <p className="text-xs sm:text-sm text-slate-700 print:text-black leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-slate-900 font-bold">Síntesi del tema: </strong>
                  {topic.resumBreu}
                </p>

                {/* 🟡 Conceptes i Termes Clau (Subratllat en Groc) */}
                {topic.subratllatVerd && topic.subratllatVerd.length > 0 && (
                  <div className="bg-amber-50/90 border-l-4 border-amber-500 border border-amber-200 rounded-r-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-amber-950 font-extrabold text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>🟡 CONCEPTES I TERMES CLAU (DESTACATS EN GROC):</span>
                      </div>
                      <span className="text-[10px] text-amber-800 font-semibold lowercase bg-amber-100 px-2 py-0.5 rounded border border-amber-200 hidden sm:inline-block">
                        Fes clic sobre qualsevol concepte per veure el seu context
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {topic.subratllatVerd.map((term, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => setSelectedConcept(resolveConceptModalData(term, uf, activeTopics, topic.titolTema))}
                          className="font-bold text-xs text-amber-950 bg-white border border-amber-300 px-3 py-1.5 rounded-lg shadow-2xs flex items-center gap-2 cursor-pointer hover:bg-amber-100 hover:border-amber-500 transition-all hover:scale-102 active:scale-98 group text-left"
                          title="Fes clic per veure el text literal del temari"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 group-hover:bg-amber-600 group-hover:scale-125 transition-all"></span>
                          <span>{term}</span>
                          <span className="text-[10px] text-amber-900 font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors ml-1 flex items-center gap-1">
                            <span>📖</span>
                            <span>Text</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🔴 Destacat i Clau d'Examen (en Vermell) */}
                {topic.destacatsVermell && topic.destacatsVermell.length > 0 && (
                  <div className="bg-red-50/90 border-l-4 border-red-600 border border-red-200 rounded-r-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-red-950 font-extrabold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>🔴 DESTACAT I CLAU D'EXAMEN (EN VERMELL EN EL TEMARI):</span>
                    </div>

                    <ul className="space-y-1.5 pt-1">
                      {topic.destacatsVermell.map((destacat, dIdx) => (
                        <li key={dIdx} className="text-red-900 font-bold text-xs sm:text-sm flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-red-200 shadow-2xs">
                          <span className="text-red-600 font-black shrink-0 mt-0.5">•</span>
                          <span className="leading-snug">{destacat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Punts Clau Generals */}
        <div className="space-y-4 pt-2 border-t border-slate-200">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 print:text-black flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            Punts Clau Generals de la Unitat Formativa ({uf.code}):
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {uf.resumPuntsClau.map((punt, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white border border-slate-200 print:bg-gray-50 print:border-gray-300 flex items-start gap-3 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-950 print:bg-gray-200 print:text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 print:text-black leading-relaxed font-semibold">
                  {punt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Key Legislation Cheat Sheet */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 print:bg-gray-100 print:border-gray-400 space-y-2">
          <h5 className="font-bold text-xs text-indigo-900 print:text-black uppercase tracking-wider flex items-center gap-2">
            <span>📋 Taula Mnemotècnica de Lleis Clau per a l'Examen:</span>
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 print:text-gray-800">
            <div>• <strong>Art. 104 CE:</strong> Missió de les FCS (protegir drets i seguretat).</div>
            <div>• <strong>LOFCS 2/1986:</strong> Llei de Forces i Cossos de Seguretat.</div>
            <div>• <strong>Llei 4/2003:</strong> Sistema de Seguretat Pública de Catalunya.</div>
            <div>• <strong>Llei 10/1994:</strong> Cos de Mossos d'Esquadra (PG-ME).</div>
            <div>• <strong>Llei 16/1991:</strong> Policies Locals de Catalunya.</div>
            <div>• <strong>LO 4/2015:</strong> Protecció de la Seguretat Ciutadana.</div>
          </div>
        </div>
      </div>

      {/* Concept Definition Modal */}
      {selectedConcept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-300 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            {/* Modal Header */}
            <div className="bg-amber-500 border-b border-amber-600 text-slate-950 p-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                {selectedConcept.topicTitle && (
                  <div className="text-amber-950 font-bold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-900"></span>
                    {selectedConcept.topicTitle}
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-black leading-tight">
                  <span className="bg-amber-300 text-slate-950 font-black underline decoration-amber-700 decoration-2 px-3 py-1 rounded-lg shadow-2xs inline-block border border-amber-400">
                    {selectedConcept.term}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                className="p-1.5 rounded-lg bg-amber-600/40 hover:bg-amber-600/70 text-slate-950 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              {/* 1. Text Literal del PDF / Temari (Context Exacte) */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>📖 Text Literal del Temari Oficial (Context Exacte):</span>
                </h4>
                <div className="p-4 rounded-xl bg-amber-50/80 border-l-4 border-amber-500 border border-amber-200 text-slate-900 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs">
                  {renderHighlightedText(selectedConcept.literalExcerpt, selectedConcept.term)}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              {onAskTutor ? (
                <button
                  onClick={() => {
                    const query = `Explica'm amb detall el concepte "${selectedConcept.term}" de la ${uf.code}. Context literal: "${selectedConcept.literalExcerpt}"`;
                    setSelectedConcept(null);
                    onAskTutor(query);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Preguntar al Formador Virtual 🤖</span>
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={() => setSelectedConcept(null)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs transition-all ml-auto cursor-pointer"
              >
                Tancar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

