import React, { useState } from 'react';
import {
  UserProfile,
  Module,
  FormativeUnit,
  ExamAttempt
} from './types';

import { COURSE_MODULES } from './data/courseData';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { PricingCards } from './components/auth/PricingCards';

import { Navbar } from './components/Navbar';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminPanel } from './components/AdminPanel';
import { ModuleCard } from './components/ModuleCard';
import { ModuleDetailView } from './components/ModuleDetailView';
import { UfDetailView } from './components/UfDetailView';
import { ProgressDashboard } from './components/ProgressDashboard';

import {
  Search,
  Shield,
  BookOpen,
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

// ============================================================
// TIPUS DE PLA
// ============================================================

type PlanId = 'basic' | 'pro';

const FREE_PLAN_LABEL = 'Gratuït';

// ============================================================
// COMPONENT PRINCIPAL DESPRÉS DEL LOGIN
// ============================================================

function AppContent() {
  const {
    currentUser,
    users,
    setUsers,
    devSwitchUser,
    logout
  } = useAuth();

  // ============================================================
  // ESTAT DE NAVEGACIÓ
  // ============================================================

  const [activeTab, setActiveTab] =
    useState<string>('cursos');

  const [selectedModuleId, setSelectedModuleId] =
    useState<string | null>(null);

  const [selectedUf, setSelectedUf] =
    useState<FormativeUnit | null>(null);

  const [modules, setModules] =
    useState<Module[]>(COURSE_MODULES);

  const [isRegistrationOpen, setIsRegistrationOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  // ============================================================
  // INTENTS D'EXAMEN
  // ============================================================

  const [attempts, setAttempts] =
    useState<ExamAttempt[]>([
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

  if (!currentUser) {
    return null;
  }

  // ============================================================
  // PLA ACTUAL
  // ============================================================

  /*
   * GRATUÏT:
   * Usuari registrat sense cap pla actiu.
   *
   * BÀSIC:
   * Pla Bàsic aprovat.
   *
   * PRO:
   * Pla Pro aprovat.
   *
   * ADMIN:
   * Accés complet independentment del pagament.
   */

  const currentPlan: PlanId | null =
    currentUser.plan === 'basic' ||
    currentUser.plan === 'pro'
      ? currentUser.plan
      : null;

  const isAdmin =
    currentUser.role === 'admin';

  const isBasic =
    currentPlan === 'basic' &&
    currentUser.estatPagament === 'aprovat';

  const isPro =
    currentPlan === 'pro' &&
    currentUser.estatPagament === 'aprovat';

  const isPremium =
    isBasic ||
    isPro ||
    isAdmin;

  const planLabel = isAdmin
    ? 'Admin'
    : isPro
      ? 'Pro'
      : isBasic
        ? 'Bàsic'
        : FREE_PLAN_LABEL;

  // ============================================================
  // CANVI D'USUARI PER DESENVOLUPAMENT
  // ============================================================

  const handleDevSwitchUser = (
    userId: string
  ) => {
    devSwitchUser(userId);

    setActiveTab('cursos');
    setSelectedUf(null);
    setSelectedModuleId(null);
  };

  // ============================================================
  // REGISTRE / JUSTIFICANT
  // ============================================================

  const handleSubmitRegistration = (
    data: Partial<UserProfile>
  ) => {
    const updatedUser: UserProfile = {
      ...currentUser,
      ...data,
      estatPagament: 'pendent'
    };

    setUsers(
      users.map(user =>
        user.id === currentUser.id
          ? updatedUser
          : user
      )
    );
  };

  // ============================================================
  // ADMINISTRACIÓ DE PAGAMENTS
  // ============================================================

  const handleApproveUser = (
    userId: string
  ) => {
    setUsers(
      users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            estatPagament:
              'aprovat' as const,
            dataPagament:
              new Date().toLocaleDateString(
                'ca-ES'
              )
          };
        }

        return user;
      })
    );
  };

  const handleRejectUser = (
    userId: string,
    motiu: string
  ) => {
    setUsers(
      users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            estatPagament:
              'rebutjat' as const,
            motiuRebuig: motiu
          };
        }

        return user;
      })
    );
  };

  // ============================================================
  // AFEGIR PDF DES DE L'ADMIN
  // ============================================================

  const handleAddPdfToUf = (
    moduleCode: string,
    ufCode: string,
    pdfNom: string,
    pdfText: string
  ) => {
    setModules(prev =>
      prev.map(module => {
        if (module.code !== moduleCode) {
          return module;
        }

        return {
          ...module,
          unitatsFormatives:
            module.unitatsFormatives.map(uf => {
              if (uf.code !== ufCode) {
                return uf;
              }

              return {
                ...uf,
                pdfNom,
                pdfTextContingut: pdfText
              };
            })
        };
      })
    );
  };

  // ============================================================
  // DESAR INTENT D'EXAMEN
  // ============================================================

  const handleSaveAttempt = (
    attempt: ExamAttempt
  ) => {
    setAttempts(prev => [
      attempt,
      ...prev
    ]);
  };

  // ============================================================
  // CONTROL D'ACCÉS A LES UFs
  // ============================================================

  const handleSelectUf = (
    module: Module,
    uf: FormativeUnit
  ) => {
    // ADMIN, BÀSIC APROVAT I PRO APROVAT
    // tenen accés complet a les UFs.
    if (isPremium) {
      setSelectedUf(uf);
      return;
    }

    // GRATUÏT:
    // només pot accedir a la primera UF
    // de cada mòdul.
    const firstUf =
      module.unitatsFormatives[0];

    if (
      firstUf &&
      firstUf.id === uf.id
    ) {
      setSelectedUf(uf);
      return;
    }

    alert(
      'Aquesta unitat forma part del contingut Premium. Pots accedir gratuïtament a la primera unitat formativa de cada mòdul. Tria un pla per desbloquejar la resta del contingut.'
    );
  };

  // ============================================================
  // COMPTADORS
  // ============================================================

  const pendingCount =
    users.filter(
      user =>
        user.estatPagament ===
          'pendent' &&
        user.role === 'alumne'
    ).length;

  // ============================================================
  // FILTRE DE MÒDULS
  // ============================================================

  const filteredModules =
    modules.filter(module =>
      module.titol
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        ) ||
      module.code
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        ) ||
      module.unitatsFormatives.some(
        uf =>
          uf.titol
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            )
      )
    );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar
        currentUser={currentUser}
        users={users}
        onSwitchUser={
          handleDevSwitchUser
        }
        onOpenRegistration={() =>
          setIsRegistrationOpen(true)
        }
        onLogout={logout}
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          setSelectedUf(null);
          setSelectedModuleId(null);
        }}
        pendingCount={pendingCount}
      />

      {/* ======================================================
          BANNER GRATUÏT
      ====================================================== */}

      {currentUser.role === 'alumne' &&
        !isPremium && (
          <div className="bg-indigo-50 border-b border-indigo-200">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-indigo-900">
                      Estàs en el pla Gratuït
                    </p>

                    <p className="text-xs text-indigo-700 mt-0.5">
                      Pots explorar tots els mòduls i accedir gratuïtament a la primera unitat formativa de cadascun.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setIsRegistrationOpen(
                      true
                    )
                  }
                  className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                >
                  Veure plans
                </button>

              </div>

            </div>

          </div>
        )}

      {/* ======================================================
          BANNER BÀSIC
      ====================================================== */}

      {currentUser.role === 'alumne' &&
        isBasic && (
          <div className="bg-blue-50 border-b border-blue-200">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>

                <div>

                  <p className="text-sm font-semibold text-blue-900">
                    Pla Bàsic actiu
                  </p>

                  <p className="text-xs text-blue-700">
                    Tens accés complet al contingut inclòs en el teu pla.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      {/* ======================================================
          BANNER PRO
      ====================================================== */}

      {currentUser.role === 'alumne' &&
        isPro && (
          <div className="bg-emerald-50 border-b border-emerald-200">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div>

                  <p className="text-sm font-semibold text-emerald-900">
                    Pla Pro actiu
                  </p>

                  <p className="text-xs text-emerald-700">
                    Tens accés complet al contingut i a les funcionalitats Pro.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      {/* ======================================================
          CONTINGUT PRINCIPAL
      ====================================================== */}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {selectedUf ? (

          <UfDetailView
            uf={selectedUf}
            moduleTitle={
              modules.find(module =>
                module.unitatsFormatives.some(
                  uf =>
                    uf.id ===
                    selectedUf.id
                )
              )?.titol ||
              'Mòdul'
            }
            onBack={() =>
              setSelectedUf(null)
            }
            onSaveAttempt={
              handleSaveAttempt
            }
          />

        ) : selectedModuleId &&
          modules.find(
            module =>
              module.id ===
              selectedModuleId
          ) ? (

          <ModuleDetailView
            module={
              modules.find(
                module =>
                  module.id ===
                  selectedModuleId
              )!
            }
            onBack={() =>
              setSelectedModuleId(null)
            }
            onSelectUf={uf => {

              const module =
                modules.find(m =>
                  m.unitatsFormatives.some(
                    moduleUf =>
                      moduleUf.id ===
                      uf.id
                  )
                );

              if (module) {
                handleSelectUf(
                  module,
                  uf
                );
              }

            }}
          />

        ) : activeTab === 'admin' ? (

          <AdminPanel
            users={users}
            onApproveUser={
              handleApproveUser
            }
            onRejectUser={
              handleRejectUser
            }
            modules={modules}
            onAddPdfToUf={
              handleAddPdfToUf
            }
          />

        ) : activeTab === 'progres' ? (

          <ProgressDashboard
            currentUser={currentUser}
            attempts={attempts}
            modules={modules}
          />

        ) : (

          <div className="space-y-8">

            {/* ==================================================
                HERO DEL CATÀLEG
            ================================================== */}

            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">

              <div className="space-y-4 max-w-4xl">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">

                  <Shield className="w-3.5 h-3.5" />

                  Preparació per a la Seguretat Pública

                </div>

                <div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">

                    Prepara la teva oposició

                    <span className="text-indigo-600">
                      {' '}amb ALPHA 13
                    </span>

                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                    Accedeix al contingut de preparació, practica amb tests i segueix el teu progrés des d'una única plataforma.
                  </p>

                </div>

                {!isPremium && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">

                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />

                      <span className="text-xs text-slate-700">
                        Explora els mòduls
                      </span>

                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">

                      <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />

                      <span className="text-xs text-slate-700">
                        Primera UF gratuïta
                      </span>

                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">

                      <Lock className="w-4 h-4 text-slate-500 shrink-0" />

                      <span className="text-xs text-slate-700">
                        Més contingut amb Premium
                      </span>

                    </div>

                  </div>
                )}

                <div className="pt-2 relative max-w-xl">

                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                    placeholder="Cerca per mòduls, temes o unitats..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />

                </div>

              </div>

            </div>

            {/* ==================================================
                LLISTA DE MÒDULS
            ================================================== */}

            <div className="space-y-4">

              <div>

                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">

                  <BookOpen className="w-5 h-5 text-indigo-600" />

                  Mòduls del curs

                  <span className="text-slate-400 font-normal">
                    ({filteredModules.length})
                  </span>

                </h2>

                {!isPremium && (
                  <p className="text-xs text-slate-500 mt-1">
                    Pots explorar tots els mòduls. La primera unitat formativa de cada mòdul està disponible gratuïtament.
                  </p>
                )}

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredModules.map(
                  module => (

                    <ModuleCard
                      key={module.id}
                      module={module}
                      onSelectModule={id =>
                        setSelectedModuleId(
                          id
                        )
                      }
                      onSelectUf={uf =>
                        handleSelectUf(
                          module,
                          uf
                        )
                      }
                    />

                  )
                )}

              </div>

              {filteredModules.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

                  <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />

                  <h3 className="font-bold text-slate-800">
                    No s'han trobat resultats
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Prova amb un altre terme de cerca.
                  </p>

                </div>
              )}

            </div>

            {/* ==================================================
                CTA PREMIUM
            ================================================== */}

            {!isPremium && (
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  <div className="max-w-2xl">

                    <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">

                      <Sparkles className="w-4 h-4" />

                      ALPHA 13 Premium

                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold">
                      Accedeix a tota la preparació
                    </h2>

                    <p className="text-sm text-slate-300 mt-2">
                      Desbloqueja el contingut complet i la resta de funcionalitats disponibles en els plans Bàsic i Pro.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setIsRegistrationOpen(
                        true
                      )
                    }
                    className="shrink-0 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
                  >
                    Veure plans
                  </button>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-white border-t border-slate-200 text-slate-500 py-6 mt-12 text-center text-xs">

        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <Shield className="w-4 h-4 text-indigo-600" />

            <span className="font-semibold text-slate-700">
              ALPHA 13 • Curs 2026-2027
            </span>

          </div>

          <p>
            © 2026 ALPHA 13. Tots els drets reservats.
          </p>

        </div>

      </footer>

      {/* ======================================================
          MODAL DE REGISTRE
      ====================================================== */}

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() =>
          setIsRegistrationOpen(false)
        }
        currentUser={currentUser}
        onSubmitRegistration={
          handleSubmitRegistration
        }
      />

    </div>
  );
}

// ============================================================
// PANTALLA D'AUTENTICACIÓ
// ============================================================

export function AuthScreenWrapper() {

  const [screen, setScreen] =
    useState<
      'login' | 'register' | 'payment'
    >('login');

  const [registeredUser, setRegisteredUser] =
    useState<UserProfile | null>(null);

  const [selectedPlanId, setSelectedPlanId] =
    useState<PlanId | null>(null);

  // ============================================================
  // SELECCIÓ DE PLA
  // ============================================================

  const handleSelectPlan = (
    planId: PlanId
  ) => {
    setSelectedPlanId(planId);
  };

  // ============================================================
  // CONTINUAR AL PAGAMENT
  // ============================================================

  const handleContinueToPayment = () => {

    if (!selectedPlanId) {
      alert(
        'Si us plau, selecciona primer un pla.'
      );
      return;
    }

    if (!registeredUser) {
      alert(
        'Primer has de completar el registre.'
      );
      return;
    }

    const updatedUser: UserProfile = {
      ...registeredUser,
      plan: selectedPlanId,
      estatPagament: 'pendent'
    };

    setRegisteredUser(updatedUser);

    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          'auth_users'
        ) || '[]'
      );

    const updatedStoredUsers =
      storedUsers.map(
        (user: UserProfile) =>
          user.id === updatedUser.id
            ? updatedUser
            : user
      );

    localStorage.setItem(
      'auth_users',
      JSON.stringify(
        updatedStoredUsers
      )
    );

    alert(
      `Has seleccionat el pla ${
        selectedPlanId === 'basic'
          ? 'Bàsic (4,99 €/mes)'
          : 'Pro (9,99 €/mes)'
      }.`
    );
  };

  // ============================================================
  // RENDER AUTENTICACIÓ
  // ============================================================

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {screen === 'login' ? (

        <LoginScreen
          onSwitchToRegister={() =>
            setScreen('register')
          }
        />

      ) : screen === 'payment' ? (

        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="text-center mb-12">

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Tria el teu pla de subscripció
            </h1>

            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Selecciona el pla que millor s'adapti a les teves necessitats d'estudi.
            </p>

          </div>

          <PricingCards
            selectedPlanId={
              selectedPlanId
            }
            onSelectPlan={
              handleSelectPlan
            }
          />

          {selectedPlanId && (
            <div className="mt-8 text-center">

              <button
                onClick={
                  handleContinueToPayment
                }
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors"
              >
                Continuar amb el pagament →
              </button>

            </div>
          )}

        </div>

      ) : (

        <RegisterScreen
          onSwitchToLogin={() =>
            setScreen('login')
          }
          onSwitchToPayment={
            user => {
              setRegisteredUser(
                user
              );

              setSelectedPlanId(
                user.plan ?? null
              );

              setScreen(
                'payment'
              );
            }
          }
        />

      )}

    </div>
  );
}

// ============================================================
// COMPONENT ARREL
// ============================================================

function MainApp() {

  const {
    isAuthenticated
  } = useAuth();

  return isAuthenticated
    ? <AppContent />
    : <AuthScreenWrapper />;
}

// ============================================================
// APP
// ============================================================

export default function App() {

  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}