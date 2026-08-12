import React, { useState } from 'react';
import { FormativeUnit } from '../types';
import { Download, Printer, Sparkles, FileCheck2, BookOpen, CheckCircle, Lightbulb, Shield } from 'lucide-react';

interface SummaryPrinterProps {
  uf: FormativeUnit;
  onRegenerateSummary?: () => void;
  isLoadingAi?: boolean;
}

export const SummaryPrinter: React.FC<SummaryPrinterProps> = ({
  uf,
  onRegenerateSummary,
  isLoadingAi = false
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    const textContent = `=====================================================
INSTITUT DE SEGURETAT PÚBLICA DE CATALUNYA (ISPC)
Plataforma ALPHA 13 - Oposicions Policies (Curs 2026-2027)
RESUM DE PUNTS CLAU PER ESTUDIAR EL DIA D'ABANS
Unitat Formativa: ${uf.code} - ${uf.titol}
PDF Oficial: ${uf.pdfNom} (${uf.pdfPagines} pàgines)
Data de descàrrega: ${new Date().toLocaleDateString('ca-ES')}
=====================================================

🎯 PUNTS CLAU FONAMENTALS DE L'EXAMEN:

${uf.resumPuntsClau.map((p, idx) => `${idx + 1}. ${p}`).join('\n\n')}

-----------------------------------------------------
📌 EXTRACTE DE LEGISIACIÓ I NORMATIVA RELLEVANT:
- Constitució Espanyola (CE): Art. 14 (Igualtat), Art. 15 (Prohibició de Tortura), Art. 17 (Garanties de la Detenció), Art. 18 (Secret de Comunicacions), Art. 104 (Missió de les FCS).
- Llei Orgànica 2/1986 de Forces i Cossos de Seguretat (LOFCS).
- Llei 4/2003 del Sistema de Seguretat Pública de Catalunya.
- Llei 10/1994 del Cos de Mossos d'Esquadra i Llei 16/1991 de Policies Locals.
- Codi d'Ètica de la Policia de Catalunya (Acord GOV/25/2015).
-----------------------------------------------------

💪 Consell d'estudi: Repassa els principis COP (Congruència, Oportunitat i Proporcionalitat), els terminis de detenció (màx 24h menors / 72h general) i les competències exclusives de cada cos policial.

=====================================================
Generat automàticament des del Moodle d'Oposicions
=====================================================`;

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Resum_Dia_Abans_${uf.code.replace(' ', '_')}.txt`;
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
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 font-mono text-xs font-bold px-2 py-0.5 rounded border border-amber-200">
                Resum de Repàs Intensiu
              </span>
              <span className="text-slate-500 text-xs font-medium">Per estudiar el dia d'abans</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{uf.code}: {uf.titol}</h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onRegenerateSummary && (
            <button
              onClick={onRegenerateSummary}
              disabled={isLoadingAi}
              className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-indigo-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {isLoadingAi ? 'Regenerant...' : 'Regenerar Resum'}
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
            Descarregar Resum (.TXT / PDF)
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Resum descarregat amb èxit! Guardat al teu dispositiu.
        </div>
      )}

      {/* Printable Sheet View */}
      <div id="printable-summary" className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 print:bg-white print:text-black print:p-0 print:border-none">
        {/* ISPC Academic Watermark / Header */}
        <div className="flex items-center justify-between border-b border-slate-200 print:border-black pb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600 print:text-black" />
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 print:text-black">
                Institut de Seguretat Pública de Catalunya (ISPC)
              </h2>
              <p className="text-xs text-slate-500 print:text-gray-600">
                Fitxa de Repàs d'Urgència • Acadèmia ALPHA 13 - ISPC 2026-2027
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-amber-700 print:text-black">{uf.code}</span>
            <p className="text-[11px] text-slate-500 print:text-gray-500">{uf.pdfNom}</p>
          </div>
        </div>

        {/* Summary Points Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 print:text-black flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Punts Clau Imprescindibles per a l'Examen:
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {uf.resumPuntsClau.map((punt, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white border border-slate-200 print:bg-gray-50 print:border-gray-300 flex items-start gap-3 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 print:bg-gray-200 print:text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 print:text-black leading-relaxed font-medium">
                  {punt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Legislative Cheat Sheet */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 print:bg-gray-100 print:border-gray-400 space-y-2">
          <h5 className="font-bold text-xs text-indigo-900 print:text-black uppercase tracking-wider">
            📋 Taula Mnemotècnica de Lleis Clau:
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
    </div>
  );
};
