import React, { useState } from 'react';
import { UserProfile, Module } from '../types';
import { ShieldCheck, CheckCircle2, XCircle, Clock, FileText, Search, UserCheck, Plus, Upload, BookOpen, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  users: UserProfile[];
  onApproveUser: (userId: string) => void;
  onRejectUser: (userId: string, motiu: string) => void;
  modules: Module[];
  onAddPdfToUf: (moduleCode: string, ufCode: string, pdfNom: string, pdfText: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  onApproveUser,
  onRejectUser,
  modules,
  onAddPdfToUf
}) => {
  const [searchTerm, setSearchTab] = useState('');
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || '');
  const [selectedUf, setSelectedUf] = useState(modules[0]?.unitatsFormatives[0]?.id || '');
  const [newPdfTitle, setNewPdfTitle] = useState('');
  const [newPdfContent, setNewPdfContent] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const pendingUsers = users.filter(u => u.estatPagament === 'pendent' && u.role === 'alumne');
  const approvedUsers = users.filter(u => u.estatPagament === 'aprovat' && u.role === 'alumne');
  const rejectedUsers = users.filter(u => u.estatPagament === 'rebutjat' && u.role === 'alumne');

  const filteredPending = pendingUsers.filter(u =>
    u.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePdfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPdfTitle || !newPdfContent) return;

    // Find selected module & uf
    const mod = modules.find(m => m.id === selectedModule);
    const uf = mod?.unitatsFormatives.find(u => u.id === selectedUf);

    if (mod && uf) {
      onAddPdfToUf(mod.code, uf.code, newPdfTitle, newPdfContent);
      setUploadSuccess(true);
      setNewPdfTitle('');
      setNewPdfContent('');
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      {/* Admin Header Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">{pendingUsers.length}</span>
            <p className="text-xs text-slate-500 font-medium">Pagaments Pendents</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">{approvedUsers.length}</span>
            <p className="text-xs text-slate-500 font-medium">Alumnes Aprovats</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">7</span>
            <p className="text-xs text-slate-500 font-medium">Mòduls del Curs</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {((approvedUsers.length + pendingUsers.length) * 49.9).toFixed(2)}€
            </span>
            <p className="text-xs text-slate-500 font-medium">Quota Recaptada</p>
          </div>
        </div>
      </div>

      {/* Pending Applications Section */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-amber-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-lg font-bold text-slate-900">Sol·licituds de Pagament Pendents de Verificació</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Verifica el comprovant bancari/Bizum i autoritza l'accés de l'alumne al temari d'oposicions.
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTab(e.target.value)}
              placeholder="Cercar per nom, DNI o email..."
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {filteredPending.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-emerald-500/80 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-800">No hi ha sol·licituds pendents de verificació</p>
            <p className="text-xs text-slate-500 mt-1">Tots els alumnes tenen el pagament al dia i accés convalidat.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredPending.map(user => (
              <div key={user.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-bold text-sm">
                    {user.nom.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{user.nom}</h3>
                      <span className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-mono border border-slate-200">
                        DNI: {user.dni}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{user.email} • <span className="text-indigo-700 font-semibold">{user.oposicio}</span></p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-amber-900 font-medium">
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      <span>Justificant: <strong className="underline">{user.comprovantNomFitxer || 'Comprovant_Bancari.pdf'}</strong></span>
                      <span className="text-slate-400">• Rebut el {user.dataRegistre}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRejectUser(user.id, 'Comprovant de pagament invàlid o no trobat')}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Rebutjar
                  </button>

                  <button
                    onClick={() => onApproveUser(user.id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Aprovar Accés (Verificar Pagament)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* List of Approved Students */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-emerald-600" />
          Alumnes amb Accés Actiu ({approvedUsers.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {approvedUsers.map(user => (
            <div key={user.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-slate-900">{user.nom}</h4>
                <p className="text-[11px] text-slate-500">{user.email}</p>
                <span className="text-[10px] text-emerald-700 font-medium">Aprovat el {user.dataPagament || user.dataRegistre}</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Accés Actiu
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Content Management: Add/Upload Official PDF to UF */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Penjar Nou PDF / Temari Oficial per a una UF</h2>
            <p className="text-xs text-slate-500">Adjunta contingut oficial per generar resums i preguntes automàticament.</p>
          </div>
        </div>

        {uploadSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            PDF afegit correctament! Les preguntes d'examen i resum s'actualitzaran per a la UF seleccionada.
          </div>
        )}

        <form onSubmit={handlePdfSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Selecciona Mòdul
              </label>
              <select
                value={selectedModule}
                onChange={(e) => {
                  setSelectedModule(e.target.value);
                  const m = modules.find(mod => mod.id === e.target.value);
                  if (m && m.unitatsFormatives[0]) {
                    setSelectedUf(m.unitatsFormatives[0].id);
                  }
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                {modules.map(m => (
                  <option key={m.id} value={m.id}>{m.code}: {m.titol}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Selecciona Unitat Formativa (UF)
              </label>
              <select
                value={selectedUf}
                onChange={(e) => setSelectedUf(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                {modules.find(m => m.id === selectedModule)?.unitatsFormatives.map(uf => (
                  <option key={uf.id} value={uf.id}>{uf.code}: {uf.titol}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nom del Document PDF Oficial
            </label>
            <input
              type="text"
              required
              value={newPdfTitle}
              onChange={(e) => setNewPdfTitle(e.target.value)}
              placeholder="Ex. Tema_Nova_Legislacio_2026.pdf"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Text del Temari Oficial / Extracte PDF
            </label>
            <textarea
              required
              rows={4}
              value={newPdfContent}
              onChange={(e) => setNewPdfContent(e.target.value)}
              placeholder="Enganxa aquí el text del PDF oficial per a la generació automatitzada de preguntes d'examen i resums..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Afegir Document i Actualitzar Contingut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
