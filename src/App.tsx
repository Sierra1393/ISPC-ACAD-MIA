/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile, Module, FormativeUnit, ExamAttempt } from './types';
import { COURSE_MODULES } from './data/courseData';
import { INITIAL_USERS } from './data/mockUsers';
import { Navbar } from './components/Navbar';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminPanel } from './components/AdminPanel';
import { ModuleCard } from './components/ModuleCard';
import { ModuleDetailView } from './components/ModuleDetailView';
import { UfDetailView } from './components/UfDetailView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Search, Shield, BookOpen, Lock, Sparkles, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function App() {
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[1]); // Default to Approved Student
  const [activeTab, setActiveTab] = useState<string>('cursos'); // 'cursos' | 'admin' | 'progres'
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedUf, setSelectedUf] = useState<FormativeUnit | null>(null);
  const [modules, setModules] = useState<Module[]>(COURSE_MODULES);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [attempts, setAttempts] = useState<ExamAttempt[]>([
    {
      id: 'att-1',
      ufId: 'UF 1.1',
      data: '05/02/2026',
      puntuacio: 8.5,
      totalPreguntes: 4,
      encerts: 3,
      tempsSegons: 120
    }
  ]);

  // Switch active user role
  const handleSwitchUser = (userId: string) => {
    const u = users.find(usr => usr.id === userId);
    if (u) {
      setCurrentUser(u);
      if (u.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('cursos');
      }
    }
  };

  // Submit registration / payment proof
  const handleSubmitRegistration = (data: Partial<UserProfile>) => {
    const updatedUser: UserProfile = {
      ...currentUser,
      ...data,
      estatPagament: 'pendent'
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Admin approves user access
  const handleApproveUser = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          estatPagament: 'aprovat',
          dataPagament: new Date().toLocaleDateString('ca-ES')
        };
      }
      return u;
    }));

    if (currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        estatPagament: 'aprovat',
        dataPagament: new Date().toLocaleDateString('ca-ES')
      }));
    }
  };

  // Admin rejects user access
  const handleRejectUser = (userId: string, motiu: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          estatPagament: 'rebutjat',
          motiuRebuig: motiu
        };
      }
      return u;
    }));
  };

  // Admin adds custom PDF to a UF
  const handleAddPdfToUf = (moduleCode: string, ufCode: string, pdfNom: string, pdfText: string) => {
    setModules(prev => prev.map(m => {
      if (m.code === moduleCode) {
        return {
          ...m,
          unitatsFormatives: m.unitatsFormatives.map(uf => {
            if (uf.code === ufCode) {
              return {
                ...uf,
                pdfNom,
                pdfTextContingut: pdfText
              };
            }
            return uf;
          })
        };
      }
      return m;
    }));
  };

  const handleSaveAttempt = (attempt: ExamAttempt) => {
    setAttempts(prev => [attempt, ...prev]);
  };

  const pendingCount = users.filter(u => u.estatPagament === 'pendent' && u.role === 'alumne').length;

  const filteredModules = modules.filter(m =>
    m.titol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.unitatsFormatives.some(u => u.titol.toLowerCase().includes(searchQuery.toLowerCase()) || u.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        users={users}
        onSwitchUser={handleSwitchUser}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedUf(null);
          setSelectedModuleId(null);
        }}
        pendingCount={pendingCount}
      />

      {/* Access Restriction Warning Banner for Unapproved Students */}
      {currentUser.role === 'alumne' && currentUser.estatPagament !== 'aprovat' && (
        <div className="bg-amber-50 border-b border-amber-200 p-3.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                <Clock className="w-4 h-4 animate-spin" />
              </div>
              <p className="text-xs sm:text-sm text-amber-900">
                <strong>Accés en Procés de Verificació:</strong> Un administrador ha de confirmar el teu pagament de la quota d'oposició per habilitar el temari complet.
              </p>
            </div>

            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Veure / Enviar Comprovant
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Render Selected UF Detail Page */}
        {selectedUf ? (
          <UfDetailView
            uf={selectedUf}
            moduleTitle={modules.find(m => m.unitatsFormatives.some(u => u.id === selectedUf.id))?.titol || 'Mòdul'}
            onBack={() => setSelectedUf(null)}
            onSaveAttempt={handleSaveAttempt}
          />
        ) : selectedModuleId && modules.find(m => m.id === selectedModuleId) ? (
          <ModuleDetailView
            module={modules.find(m => m.id === selectedModuleId)!}
            onBack={() => setSelectedModuleId(null)}
            onSelectUf={(uf) => {
              if (currentUser.role === 'alumne' && currentUser.estatPagament !== 'aprovat') {
                setIsRegistrationOpen(true);
              } else {
                setSelectedUf(uf);
              }
            }}
          />
        ) : activeTab === 'admin' ? (
          /* Render Admin Management Panel */
          <AdminPanel
            users={users}
            onApproveUser={handleApproveUser}
            onRejectUser={handleRejectUser}
            modules={modules}
            onAddPdfToUf={handleAddPdfToUf}
          />
        ) : activeTab === 'progres' ? (
          /* Render Student Gradebook / Progress Dashboard */
          <ProgressDashboard
            currentUser={currentUser}
            attempts={attempts}
            modules={modules}
          />
        ) : (
          /* Main Courses / Modules View */
          <div className="space-y-8 animate-fade-in">
            {/* Hero Welcome Banner */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="relative z-10 space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  Plataforma Moodle per a Oposicions de Seguretat Pública
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Curs de Formació Bàsica per a Policies <span className="text-indigo-600">2026-2027</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Accedeix als <strong>7 Mòduls Oficials del Curs</strong>, genera targetes Flash d'urgència per estudiar el dia d'abans i posa't a prova amb exàmens simulats <strong>basats en el temari oficial</strong>.
                </p>

                {/* Search input */}
                <div className="pt-2 relative max-w-xl">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca per temes, UFs (ex. UF 1.1, UF 2.1), o paraules clau..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Status Indicator Card */}
              <div className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 shrink-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estat de la Cursada</div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Convocatòria Activa 2026-2027
                </div>
                <div className="text-[11px] text-slate-500">
                  7 Mòduls • 30 Unitats Formatives amb generador de tests
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    Mòduls del Curs d'Oposició ({filteredModules.length} de 7)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tria qualsevol Mòdul o Unitat Formativa per accedir al temari oficial i als exàmens per IA.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onSelectModule={(id) => setSelectedModuleId(id)}
                    onSelectUf={(uf) => {
                      if (currentUser.role === 'alumne' && currentUser.estatPagament !== 'aprovat') {
                        setIsRegistrationOpen(true);
                      } else {
                        setSelectedUf(uf);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 py-6 mt-12 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Acadèmia ALPHA 13 • Curs 2026-2027</span>
          </div>
          <p>© 2026 ALPHA 13. Tots els drets reservats.</p>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        currentUser={currentUser}
        onSubmitRegistration={handleSubmitRegistration}
      />
    </div>
  );
}
