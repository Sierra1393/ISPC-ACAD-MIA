import React from 'react';
import { UserProfile } from '../types';

export interface NavbarProps {
  currentUser: UserProfile;
  users: UserProfile[];
  onSwitchUser: (userId: string) => void;
  onOpenRegistration: () => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  users,
  onSwitchUser,
  onOpenRegistration,
  onLogout,
  activeTab,
  setActiveTab,
  pendingCount,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-wrap items-center justify-between gap-2">

        {/* ======================================================
            LOGOTIP + NAVEGACIÓ
        ====================================================== */}

        <div className="flex items-center gap-3 min-w-0">

          {/* LOGO */}
          <div className="flex items-center gap-2 font-bold text-lg shrink-0">
            <span className="text-indigo-400">
              ISPC
            </span>

            <span>
              ACAD-MIA
            </span>
          </div>

          {/* NAVEGACIÓ */}
          <nav className="flex items-center gap-1 flex-wrap">

            {/* CURSOS */}
            <button
              type="button"
              onClick={() =>
                setActiveTab('cursos')
              }
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'cursos'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Cursos
            </button>

            {/* PROGRÉS */}
            <button
              type="button"
              onClick={() =>
                setActiveTab('progres')
              }
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'progres'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Progrés
            </button>

            {/* ADMINISTRACIÓ */}
            {currentUser.role === 'admin' && (
              <button
                type="button"
                onClick={() =>
                  setActiveTab('admin')
                }
                className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-colors relative whitespace-nowrap ${
                  activeTab === 'admin'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                Gestió d’usuaris

                {pendingCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-bold rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}
          </nav>
        </div>

        {/* ======================================================
            ZONA D’USUARI
        ====================================================== */}

        <div className="flex items-center gap-2 flex-wrap justify-end">

          {/* SELECTOR DE DESENVOLUPAMENT */}
          <select
            value={currentUser.id}
            onChange={(e) =>
              onSwitchUser(
                e.target.value
              )
            }
            className="max-w-[180px] bg-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-indigo-500"
            title="Canvia d’usuari en desenvolupament"
          >
            {users.map(usr => (
              <option
                key={usr.id}
                value={usr.id}
              >
                {usr.fullName} ({usr.role})
              </option>
            ))}
          </select>

          {/* PREMIUM */}
          {currentUser.role === 'alumne' &&
            currentUser.estatPagament !==
              'aprovat' && (
              <button
                type="button"
                onClick={
                  onOpenRegistration
                }
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Prèmium
              </button>
            )}

          {/* TANCAR LA SESSIÓ */}
          <button
            type="button"
            onClick={onLogout}
            className="bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-slate-700 hover:border-red-500 whitespace-nowrap"
          >
            Tanca la sessió
          </button>
        </div>
      </div>
    </header>
  );
};
