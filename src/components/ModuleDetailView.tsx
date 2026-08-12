import React from 'react';
import { Module, FormativeUnit } from '../types';
import { ArrowLeft, BookOpen, Clock, FileText, Sparkles, ChevronRight, CheckCircle2, Shield } from 'lucide-react';

interface ModuleDetailViewProps {
  module: Module;
  onBack: () => void;
  onSelectUf: (uf: FormativeUnit) => void;
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  onBack,
  onSelectUf
}) => {
  const totalHours = module.unitatsFormatives.reduce((sum, u) => sum + u.duradaHores, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Tornar al llistat de Mòduls
        </button>
        <span className="text-xs text-slate-400">/</span>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md">
          {module.code}
        </span>
      </div>

      {/* Module Header Card */}
      <div className="bg-indigo-900 border border-indigo-950 rounded-xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-800 border border-indigo-700 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            {module.code} • Programa Oficial
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {module.titol}
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            {module.descripcio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-indigo-200 font-medium">
            <span className="flex items-center gap-1.5 bg-indigo-800/80 px-3 py-1 rounded-lg border border-indigo-700">
              <Clock className="w-4 h-4 text-amber-300" />
              <strong>{totalHours} hores</strong> lectives totals
            </span>
            <span className="flex items-center gap-1.5 bg-indigo-800/80 px-3 py-1 rounded-lg border border-indigo-700">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <strong>{module.unitatsFormatives.length} Unitats Formatives</strong>
            </span>
          </div>
        </div>
      </div>

      {/* List of UFs Separated */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Unitats Formatives del {module.code} ({module.unitatsFormatives.length})
          </h2>
          <span className="text-xs text-slate-500">Selecciona una UF per accedir al temari i als tests d'examen</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.unitatsFormatives.map((uf) => (
            <div
              key={uf.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-indigo-100 text-indigo-800 font-mono text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-200">
                    {uf.code}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {uf.duradaHores} hores
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {uf.titol}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {uf.descripcio}
                  </p>
                </div>

                {/* Topic info */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate font-medium text-slate-700">Temari Oficial {uf.code}</span>
                  <span className="ml-auto font-mono text-slate-400 shrink-0">({uf.pdfPagines} pàg.)</span>
                </div>
              </div>

              <button
                onClick={() => onSelectUf(uf)}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2 transition-all group-hover:bg-indigo-700"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Accedir a {uf.code} (Temari + Generar Test)
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
