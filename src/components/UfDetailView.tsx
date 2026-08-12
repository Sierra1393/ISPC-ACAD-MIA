import React, { useState } from 'react';
import { FormativeUnit, Question, ExamAttempt } from '../types';
import { QuizEngine } from './QuizEngine';
import { SummaryPrinter } from './SummaryPrinter';
import { AiTutorChat } from './AiTutorChat';
import { BookOpen, Sparkles, FileText, Bot, ArrowLeft, ListOrdered, Shield, CheckCircle2, Clock } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'document' | 'resum' | 'quiz' | 'tutor'>('document');
  const [questions, setQuestions] = useState<Question[]>(uf.preguntesExamenPredefinides || []);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [currentUf, setCurrentUf] = useState<FormativeUnit>(uf);

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
          Curs Oficial ISPC • <strong className="text-indigo-700">{currentUf.code}</strong>
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
              PDF Oficial: <strong>{currentUf.pdfNom}</strong>
            </span>
            <span>• {currentUf.pdfPagines} pàgines</span>
            <span>• Actualitzat: {currentUf.pdfDataPublicacio}</span>
          </div>
        </div>
      </div>

      {/* PDF Index Box - Directly below the UF title */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Índex de Continguts del Document PDF Oficial ({currentUf.code})
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentUf.pdfNom}
          </span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
          {(currentUf.indexPdf && currentUf.indexPdf.length > 0 ? currentUf.indexPdf : currentUf.resumPuntsClau).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="w-5 h-5 rounded bg-indigo-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium text-slate-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('document')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'document'
              ? 'bg-indigo-600 text-white shadow-xs border-l-4 border-indigo-800'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          📖 Document Oficial PDF
        </button>

        <button
          onClick={() => setActiveTab('resum')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'resum'
              ? 'bg-amber-600 text-white shadow-xs border-l-4 border-amber-800'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          ⚡ Resum Punts Clau (Dia d'abans)
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
          💬 Tutor Virtual
        </button>
      </div>

      {/* Tab Content Rendering */}
      {activeTab === 'document' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Visualitzador del Temari Oficial PDF</h3>
                <p className="text-xs text-slate-500">Institut de Seguretat Pública de Catalunya (ISPC)</p>
              </div>
            </div>
            {/* Note: PDF Download option strictly removed per requirements */}
          </div>

          {/* Quick Action Card */}
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Motor d'Avaluació i Generació de Tests
              </span>
              <p className="text-xs text-indigo-800/90">
                Aquest document s'utilitza com a base oficial per generar el resum executiu i els tests d'examen amb retroalimentació de l'ISPC.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateAiSummary}
                disabled={isLoadingSummary}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors disabled:opacity-50 shadow-2xs"
              >
                {isLoadingSummary ? 'Generant...' : 'Generar Resum'}
              </button>

              <button
                onClick={handleGenerateAiQuiz}
                disabled={isLoadingQuiz}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-2xs"
              >
                {isLoadingQuiz ? 'Generant...' : 'Generar Test'}
              </button>
            </div>
          </div>

          {/* Document Content View */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
              Contingut Oficial del Temari (Extracte de Text i Seccions):
            </h4>
            <div className="text-xs sm:text-sm text-slate-800 font-mono leading-relaxed whitespace-pre-line max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
              {currentUf.pdfTextContingut}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resum' && (
        <SummaryPrinter
          uf={currentUf}
          onRegenerateSummary={handleGenerateAiSummary}
          isLoadingAi={isLoadingSummary}
        />
      )}

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

      {activeTab === 'tutor' && (
        <AiTutorChat uf={currentUf} />
      )}
    </div>
  );
};
