import React from 'react';
import { ExamAttempt, Module, UserProfile } from '../types';
import { Award, CheckCircle2, TrendingUp, BookOpen, Clock, FileCheck } from 'lucide-react';

interface ProgressDashboardProps {
  currentUser: UserProfile;
  attempts: ExamAttempt[];
  modules: Module[];
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  currentUser,
  attempts,
  modules
}) => {
  const averageScore = attempts.length > 0
    ? (attempts.reduce((sum, a) => sum + a.puntuacio, 0) / attempts.length).toFixed(1)
    : 'N/A';

  const totalPassed = attempts.filter(a => a.puntuacio >= 5.0).length;

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
              Expedient de l'Alumne
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.nom}</h1>
            <p className="text-xs text-slate-300">
              Oposició: <strong>{currentUser.oposicio}</strong> • DNI: {currentUser.dni}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center min-w-[110px]">
              <span className="text-2xl font-black text-blue-400">{averageScore}</span>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Mitjana d'Exàmens</p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center min-w-[110px]">
              <span className="text-2xl font-black text-emerald-400">{totalPassed}</span>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Tests Aprovats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Completion Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Estat de Progrés per Mòduls (7 Mòduls Oficials)
        </h2>

        <div className="space-y-3">
          {modules.map(m => {
            const ufs = m.unitatsFormatives;
            const hasAttempts = attempts.some(a => ufs.some(u => u.code === a.ufId));

            return (
              <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {m.code}
                    </span>
                    <h4 className="font-bold text-sm text-white">{m.titol}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {ufs.length} Unitats Formatives • {ufs.map(u => u.code).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {hasAttempts ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> En Curs / Aprovat
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      Pendent de test
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Attempts History */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Historial de Proves i Exàmens Simulats
        </h2>

        {attempts.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Clock className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">Encara no has realitzat cap test d'examen.</p>
            <p className="text-[11px] text-slate-500 mt-1">Entra a qualsevol Unitat Formativa i genera el teu primer test!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {attempts.map(a => (
              <div key={a.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{a.ufId}</span>
                  <span className="text-slate-400 ml-2">• Data: {a.data}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">{a.encerts} / {a.totalPreguntes} Encerts</span>
                  <span className={`font-mono font-bold px-2.5 py-0.5 rounded text-xs ${
                    a.puntuacio >= 5 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    Nota: {a.puntuacio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
