import React from 'react';
import { Module, FormativeUnit } from '../types';
import {
  ShieldCheck,
  Scale,
  Users,
  Car,
  FileText,
  Search,
  Siren,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onSelectModule: (moduleId: string) => void;
  onSelectUf: (uf: FormativeUnit) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Scale,
  Users,
  Car,
  FileText,
  Search,
  Siren
};

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onSelectModule,
  onSelectUf
}) => {
  const IconComponent = ICON_MAP[module.icona] || ShieldCheck;
  const totalHours = module.unitatsFormatives.reduce(
    (sum, u) => sum + u.duradaHores,
    0
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Module Header */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <IconComponent className="w-4 h-4" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 font-mono block">
                {module.code}
              </span>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {module.titol}
              </h3>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
            {totalHours}h
          </span>
        </div>

        {/* Clean, Simple List of UFs */}
        <div className="space-y-1.5 pt-1">
          {module.unitatsFormatives.map(uf => (
            <button
              key={uf.id}
              onClick={() => onSelectUf(uf)}
              className="w-full text-left px-2.5 py-1.5 rounded-md bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-between group/uf"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.2 rounded shrink-0">
                  {uf.code}
                </span>

                <span className="text-xs text-slate-700 font-medium truncate group-hover/uf:text-indigo-900">
                  {uf.titol}
                </span>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/uf:text-indigo-600 shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Button to enter the module */}
      <button
        onClick={() => onSelectModule(module.id)}
        className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-indigo-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs"
      >
        Entrar al {module.code}

        <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
      </button>
    </div>
  );
};