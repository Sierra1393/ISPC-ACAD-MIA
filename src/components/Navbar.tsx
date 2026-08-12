import React from 'react';
import { UserProfile } from '../types';
import { Shield, User, CheckCircle2, Clock, AlertCircle, LogOut, KeyRound, FileCheck, Award, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile;
  users: UserProfile[];
  onSwitchUser: (userId: string) => void;
  onOpenRegistration: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  users,
  onSwitchUser,
  onOpenRegistration,
  activeTab,
  setActiveTab,
  pendingCount
}) => {
  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-40 shadow-xs">
      {/* Top Banner for Quick Role Switcher */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulador de Rols per a Proves:</span>
          <span className="text-white font-medium">Usuari actual: <strong className="text-amber-300 underline">{currentUser.nom}</strong> ({currentUser.role === 'admin' ? 'Administrador' : 'Alumne'})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Canviar perfil:</span>
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => onSwitchUser(u.id)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                u.id === currentUser.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {u.role === 'admin' ? '🔑 Admin' : u.estatPagament === 'aprovat' ? '✅ Alumne Aprovat' : '⏳ Alumne Pendent'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('cursos')}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-indigo-700 group-hover:text-indigo-800 transition-colors">
                ALPHA 13
              </span>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">
                CURS 2026-2027
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Plataforma de Formació en Seguretat Pública</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('cursos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'cursos'
                ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600 shadow-2xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Mòduls i Cursos
          </button>

          <button
            onClick={() => setActiveTab('progres')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'progres'
                ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600 shadow-2xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            El Meu Progrés
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold relative transition-colors ${
                activeTab === 'admin'
                  ? 'bg-amber-50 text-amber-800 border-l-2 border-amber-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-4 h-4 text-amber-600" />
              Gestió de Pagaments
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Section: User Status & Registration */}
        <div className="flex items-center gap-3">
          {/* Payment Status Badge */}
          {currentUser.role === 'alumne' && (
            <div className="hidden sm:block">
              {currentUser.estatPagament === 'aprovat' ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Accés Verificat
                </div>
              ) : currentUser.estatPagament === 'pendent' ? (
                <button
                  onClick={onOpenRegistration}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  Pendent de Verificació
                </button>
              ) : (
                <button
                  onClick={onOpenRegistration}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  Sol·licitar Accés / Pagar
                </button>
              )}
            </div>
          )}

          {/* User Button */}
          <button
            onClick={onOpenRegistration}
            className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium transition-colors"
          >
            <span className="text-xs text-slate-700 font-semibold hidden sm:inline">{currentUser.nom.split(' ')[0]}</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {currentUser.nom.charAt(0)}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
