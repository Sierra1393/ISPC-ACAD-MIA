import React, { useState } from 'react';
import { Question, ExamAttempt } from '../types';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Award, Sparkles, Clock, AlertTriangle, FileText } from 'lucide-react';

interface QuizEngineProps {
  questions: Question[];
  ufCode: string;
  ufTitle: string;
  pdfText: string;
  onSaveAttempt?: (attempt: ExamAttempt) => void;
  onRegenerateAiQuiz?: () => void;
  isLoadingAi?: boolean;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  ufCode,
  ufTitle,
  pdfText,
  onSaveAttempt,
  onRegenerateAiQuiz,
  isLoadingAi = false
}) => {
  const [mode, setMode] = useState<'practica' | 'examen'>('practica');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="bg-indigo-900 border border-indigo-950 rounded-xl p-8 text-center space-y-4 text-white shadow-lg">
        <Sparkles className="w-12 h-12 text-amber-300 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-white">Generar Test d'Examen</h3>
        <p className="text-xs text-indigo-200 max-w-md mx-auto">
          Genera un qüestionari d'examen basat <strong>únicament en el PDF oficial</strong> d'aquesta Unitat Formativa.
        </p>
        <button
          onClick={onRegenerateAiQuiz}
          disabled={isLoadingAi}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          {isLoadingAi ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generant preguntes des del PDF...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generar Test Ara
            </>
          )}
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isAnswered = selectedAnswers[currentIndex] !== undefined;

  const handleSelectOption = (optIndex: number) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
    if (mode === 'practica') {
      setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.respostaCorrecta) {
        correctCount++;
      }
    });

    const score = Number(((correctCount / questions.length) * 10).toFixed(1));

    if (onSaveAttempt) {
      onSaveAttempt({
        id: 'attempt-' + Date.now(),
        ufId: ufCode,
        data: new Date().toLocaleDateString('ca-ES'),
        puntuacio: score,
        totalPreguntes: questions.length,
        encerts: correctCount,
        tempsSegons: elapsedTime
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setIsFinished(false);
  };

  // Score calculation
  const totalCorrect = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.respostaCorrecta ? acc + 1 : acc;
  }, 0);
  const finalScore = ((totalCorrect / questions.length) * 10).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm text-slate-800">
      {/* Quiz Top Bar - Dark Indigo Header */}
      <div className="p-5 bg-indigo-900 text-white border-b border-indigo-950 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-800 text-indigo-100 font-mono text-xs font-bold px-2 py-0.5 rounded border border-indigo-700">
              {ufCode}
            </span>
            <h3 className="font-bold text-sm text-white">{ufTitle}</h3>
          </div>
          <p className="text-[11px] text-indigo-200 mt-0.5">
            Preguntes de test basades únicament en el PDF oficial
          </p>
        </div>

        {/* Mode Selector & Regenerate */}
        <div className="flex items-center gap-2">
          {!isFinished && (
            <div className="bg-indigo-950 border border-indigo-800 rounded-lg p-1 flex items-center gap-1 text-xs">
              <button
                onClick={() => setMode('practica')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  mode === 'practica' ? 'bg-indigo-600 text-white font-bold shadow-2xs' : 'text-indigo-300 hover:text-white'
                }`}
              >
                Mode Pràctica
              </button>
              <button
                onClick={() => setMode('examen')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  mode === 'examen' ? 'bg-amber-600 text-white font-bold shadow-2xs' : 'text-indigo-300 hover:text-white'
                }`}
              >
                Mode Examen
              </button>
            </div>
          )}

          {onRegenerateAiQuiz && (
            <button
              onClick={onRegenerateAiQuiz}
              disabled={isLoadingAi}
              className="px-3 py-1.5 rounded-lg bg-indigo-800 hover:bg-indigo-700 border border-indigo-700 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Generar noves preguntes de test"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Noves Preguntes
            </button>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="p-6 space-y-6">
          {/* Question Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Pregunta {currentIndex + 1} de {questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Completat</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Qüestió {currentIndex + 1}
              </span>
              <h4 className="text-base font-semibold text-slate-900 leading-relaxed">
                {currentQ.pregunta}
              </h4>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.opcions.map((opcio, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                const isCorrect = idx === currentQ.respostaCorrecta;
                const isPracticeRevealed = mode === 'practica' && isAnswered;

                let optionStyle = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';

                if (isPracticeRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-50 border-2 border-indigo-600 text-indigo-900 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opcio}</span>
                    {isPracticeRevealed && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isPracticeRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice Mode Explanation Box */}
            {mode === 'practica' && isAnswered && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs text-indigo-950 animate-fade-in">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Explicació Oficial & Cita del PDF:</span>
                </div>
                <p className="leading-relaxed">{currentQ.explicacio}</p>
                <div className="text-[11px] text-indigo-700 font-mono pt-1">
                  📌 Cita: {currentQ.referenciaOficial}
                </div>
              </div>
            )}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              Anterior
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all"
              >
                Següent
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all"
              >
                Finalitzar i Qualificar
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">Resultat de l'Examen</h3>
            <p className="text-xs text-slate-500 mt-1">{ufCode}: {ufTitle}</p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-4xl font-extrabold text-indigo-700">
              {finalScore} <span className="text-lg text-slate-400 font-normal">/ 10</span>
            </div>
            <p className="text-xs font-medium text-slate-700">
              Has encertat <strong>{totalCorrect}</strong> de <strong>{questions.length}</strong> preguntes.
            </p>
            {Number(finalScore) >= 5 ? (
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                🎉 APTO! Superat amb èxit.
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold">
                ⚠️ NO APTO. Revisa els punts clau del PDF.
              </span>
            )}
          </div>

          {/* Detailed Question Review */}
          <div className="max-w-2xl mx-auto text-left space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-bold text-sm text-slate-900">Revisió de Respostes i Explicacions Oficials:</h4>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.respostaCorrecta;
                return (
                  <div key={idx} className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                  }`}>
                    <div className="flex items-start justify-between gap-2 font-semibold text-slate-900">
                      <span>{idx + 1}. {q.pregunta}</span>
                      {isCorrect ? (
                        <span className="text-emerald-700 shrink-0 flex items-center gap-1 font-bold">
                          <CheckCircle className="w-4 h-4 text-emerald-600" /> Correcta
                        </span>
                      ) : (
                        <span className="text-rose-700 shrink-0 flex items-center gap-1 font-bold">
                          <XCircle className="w-4 h-4 text-rose-600" /> Incorrecta
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Resposta seleccionada: <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                        {userAns !== undefined ? q.opcions[userAns] : 'No me n\'he recordat'}
                      </strong>
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-800 text-[11px]">
                        Resposta correcta: <strong>{q.opcions[q.respostaCorrecta]}</strong>
                      </div>
                    )}
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                      💡 <strong>Explicació:</strong> {q.explicacio}
                      <br />
                      📌 <strong>Ref. Oficial:</strong> {q.referenciaOficial}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
