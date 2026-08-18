Exit code: 0
Wall time: 1 seconds
Output:
import React, { useState } from 'react';
import { FormativeUnit, Question, ExamAttempt, TopicContent } from '../types';
import { QuizEngine } from './QuizEngine';
import { SummaryPrinter } from './SummaryPrinter';
import { AiTutorChat } from './AiTutorChat';
import { AnkiFlashcards } from './AnkiFlashcards';
import { BookOpen, Sparkles, FileText, Bot, ArrowLeft, ListOrdered, Shield, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface UfDetailViewProps {
  uf: FormativeUnit;
  moduleTitle: string;
  onBack: () => void;
  onSaveAttempt?: (attempt: ExamAttempt) => void;
}

export const UfDetailView: React.FC<UfDetailViewProps> = ({
  uf,
  moduleTitle,
  onBack,
  onSaveAttempt
}) => {
  const [activeTab, setActiveTab] = useState<'temari' | 'flash' | 'anki' | 'quiz' | 'tutor'>('temari');
  const [pendingQuery, setPendingQuery] = useState('');
  const [questions, setQuestions] = useState<Question[]>(uf.preguntesExamenPredefinides || []);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [currentUf, setCurrentUf] = useState<FormativeUnit>(uf);

  // Helper function to render paragraph text with yellow underlines for important terms
  const renderParagraphWithGreenUnderlines = (paragraphText: string, greenTerms: string[] = []) => {
    if (!greenTerms || greenTerms.length === 0) return paragraphText;

    const escapedTerms = greenTerms
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    if (escapedTerms.length === 0) return paragraphText;

    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const parts = paragraphText.split(regex);

    return parts.map((part, index) => {
      const isMatch = greenTerms.some(term => term.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={index}
            className="font-extrabold text-amber-950 bg-amber-300 px-1.5 py-0.5 rounded shadow-2xs mx-0.5"
            title="Destacat en groc: Concepte clau"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Helper function to guarantee topic-by-topic structure for every single UF
  const getTopicsForUf = (unit: FormativeUnit): TopicContent[] => {
    if (unit.temes && unit.temes.length > 0) {
      return unit.temes;
    }

    const indexItems = unit.indexPdf && unit.indexPdf.length > 0
      ? unit.indexPdf
      : unit.resumPuntsClau.map((p, i) => `Tema ${i + 1}. ${p.split(':')[0] || p}`);

    return indexItems.map((item, idx) => {
      const rawParagraph = unit.resumPuntsClau[idx] || unit.pdfTextContingut || '';
      const parts = rawParagraph.split(':');
      const topicHeading = item.startsWith('Tema') ? item : `Tema ${idx + 1}. ${item}`;
      const keyHighlight = parts.length > 1 ? parts[0] : `Punt Clau d'Examen ${idx + 1}`;
      const mainBody = parts.length > 1 ? parts.slice(1).join(':') : rawParagraph;

      return {
        titolTema: topicHeading,
        desenvolupamentText: [
          `Desenvolupament oficial complet per al ${topicHeading} de la ${unit.code} (${unit.titol}).`,
          mainBody.trim() || `Contingut de referència de la unitat formativa ${unit.code}.`
        ],
        subratllatVerd: [
          keyHighlight.trim(),
          `Temari Oficial ${unit.code}`
        ],
        destacatsVermell: [
          `Llei i Concepte Destacat en Vermell: ${keyHighlight.trim()}`,
          `Referència Oficial de la UF: ${unit.code} - Pàgina de referència del temari oficial`
        ],
        resumBreu: `Síntesi executiva del ${topicHeading}: ${mainBody.trim() || rawParagraph}`
      };
    });
  };

  const topicsList = getTopicsForUf(currentUf);

  // Function to call /api/generate-quiz
  const handleGenerateAiQuiz = async () => {
    setIsLoadingQuiz(true);
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfText: currentUf.pdfTextContingut,
          ufTitle: `${currentUf.code} - ${currentUf.titol}`,
          count: 5,
          difficulty: 'alta'
        })
      });

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setActiveTab('quiz');
      } else {
        alert('No s\'han pogut generar noves preguntes. Utilitzant el banc de preguntes existent.');
      }
    } catch (err) {
      console.error('Error generant preguntes de test:', err);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  // Function to call /api/generate-summary
  const handleGenerateAiSummary = async () => {
    setIsLoadingSummary(true);
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfText: currentUf.pdfTextContingut,
          ufTitle: `${currentUf.code} - ${currentUf.titol}`
        })
      });

      const data = await response.json();
      if (data.puntsClau && Array.isArray(data.puntsClau)) {
        setCurrentUf(prev => ({
          ...prev,
          resumPuntsClau: data.puntsClau
        }));
      }
    } catch (err) {
      console.error('Error regenerant resum:', err);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Back Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Tornar al Mòdul ({moduleTitle})
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Curs Oficial • <strong className="text-indigo-700">{currentUf.code}</strong>
        </span>
      </div>

      {/* UF Title Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md shadow-2xs">
              {currentUf.code}
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-md font-semibold border border-slate-200">
              ⏱️ {currentUf.duradaHores} Hores Lectives
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentUf.titol}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {currentUf.descripcio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <FileText className="w-4 h-4 text-indigo-600" />
              Temari Oficial: <strong>{currentUf.code}</strong>
            </span>
            <span>• {currentUf.pdfPagines} pàgines</span>
            <span>• Actualitzat: {currentUf.pdfDataPublicacio}</span>
          </div>
        </div>
      </div>

      {/* Topic Index Box */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Índex de Continguts de la Unitat Formativa ({currentUf.code})
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentUf.code}
          </span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
          {topicsList.map((topic, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="w-5 h-5 rounded bg-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium text-slate-200">{topic.titolTema}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('temari')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'temari'
              ? 'bg-indigo-600 text-white shadow-xs border-l-4 border-indigo-800'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          📖 Temari
        </button>

        <button
          onClick={() => setActiveTab('flash')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'flash'
              ? 'bg-amber-600 text-white shadow-xs border-l-4 border-amber-800'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          ⚡ Flash
        </button>

        <button
          onClick={() => setActiveTab('anki')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'anki'
              ? 'bg-amber-700 text-white shadow-xs border-l-4 border-amber-900'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          🃏 ANKI
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-indigo-900 text-white shadow-xs border-l-4 border-indigo-950'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          📝 Generar Test ({questions.length})
        </button>

        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tutor'
              ? 'bg-teal-700 text-white shadow-xs border-l-4 border-teal-900'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          💬 Formador Virtual
        </button>
      </div>

      {/* Tab Content Rendering */}

      {/* Pestaña Temari: Desenvolupat punt per punt segons l'índex, amb text en negre, subratllat verd i destacats en vermell */}
      {activeTab === 'temari' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-950">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Temari Complet Desenvolupat Tema per Tema</p>
                <p className="text-slate-600 text-xs">
                  Aquest temari conté tot el contingut desenvolupat de la unitat formativa ({currentUf.code}). El text de l'explicació es mostra en <strong>negre</strong>, els conceptes i termes rellevants estan <strong className="font-extrabold text-amber-950 bg-amber-300 px-1 py-0.5 rounded">DESTACATS EN GROC</strong>, i el contingut més destacat d'examen es mostra ressaltat en <strong className="text-red-700 font-extrabold bg-red-100 px-1 py-0.5 rounded border-b border-red-400">VERMELL</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('flash')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Veure Targetes Flash ⚡
              </button>
            </div>
          </div>

          {/* Iterate over each topic in the index point by point */}
          <div className="space-y-6">
            {topicsList.map((topic, topicIdx) => (
              <div key={topicIdx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                {/* Topic Header */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {topicIdx + 1}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {topic.titolTema}
                  </h3>
                </div>

                {/* Developed Text Paragraphs in BLACK with YELLOW HIGHLIGHTS */}
                <div className="space-y-3 text-slate-900 leading-relaxed font-normal text-sm sm:text-base">
                  {topic.desenvolupamentText.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-slate-900 font-normal leading-relaxed">
                      {renderParagraphWithGreenUnderlines(paragraph, topic.subratllatVerd)}
                    </p>
                  ))}
                </div>

                {/* Conceptes Importants Destacats en Groc Box */}
                {topic.subratllatVerd && topic.subratllatVerd.length > 0 && (
                  <div className="bg-amber-50/90 border-l-4 border-amber-500 border border-amber-200 rounded-r-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>CONCEPTES I TERMES CLAU (DESTACATS EN GROC):</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {topic.subratllatVerd.map((term, vIdx) => (
                        <span
                          key={vIdx}
                          className="font-bold text-xs text-amber-950 bg-white border border-amber-300 px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Highlights in RED */}
                <div className="bg-red-50/90 border-l-4 border-red-600 border border-red-200 rounded-r-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-red-800 font-extrabold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>DESTACAT I CLAU D'EXAMEN (EN VERMELL):</span>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {topic.destacatsVermell.map((destacat, dIdx) => (
                      <li key={dIdx} className="text-red-800 font-bold text-xs sm:text-sm flex items-start gap-2">
                        <span className="text-red-600 font-black shrink-0 mt-0.5">•</span>
                        <span className="leading-snug">{destacat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña Flash: Targetes Flash amb contingut verd i vermell */}
      {activeTab === 'flash' && (
        <SummaryPrinter
          uf={currentUf}
          topics={topicsList}
          onRegenerateSummary={handleGenerateAiSummary}
          isLoadingAi={isLoadingSummary}
          onAskTutor={(query) => {
            if (query) setPendingQuery(query);
            setActiveTab('tutor');
          }}
        />
      )}

      {activeTab === 'anki' && <AnkiFlashcards topics={topicsList} />}

      {/* Pestaña Generar Test */}
      {activeTab === 'quiz' && (
        <QuizEngine
          questions={questions}
          ufCode={currentUf.code}
          ufTitle={currentUf.titol}
          pdfText={currentUf.pdfTextContingut}
          onSaveAttempt={onSaveAttempt}
          onRegenerateAiQuiz={handleGenerateAiQuiz}
          isLoadingAi={isLoadingQuiz}
        />
      )}

      {/* Pestaña Formador Virtual */}
      {activeTab === 'tutor' && (
        <AiTutorChat
          uf={currentUf}
          initialQuery={pendingQuery}
          onClearInitialQuery={() => setPendingQuery('')}
        />
      )}
    </div>
  );
};

