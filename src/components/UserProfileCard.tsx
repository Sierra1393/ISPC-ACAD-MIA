import React from 'react';
import { UserProfile } from '../types';
import { User, BadgeCheck } from 'lucide-react';

interface UserProfileCardProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{user.fullName}</h3>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Plan actual:</span>
          {user.plan ? (
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              user.plan === 'pro' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-slate-100 text-slate-700'
            }`}>
              {user.plan === 'pro' ? '⭐ Pro' : 'Básico'}
            </span>
          ) : (
            <span className="text-sm text-amber-600">Sin plan seleccionado</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-slate-600">Estado pago:</span>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
            user.estatPagament === 'aprovat' 
              ? 'bg-emerald-100 text-emerald-700' 
              : user.estatPagament === 'pendent'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {user.estatPagament === 'aprovat' ? '✅ Aprobado' : 
             user.estatPagament === 'pendent' ? '⏳ Pendiente' : '❌ Rechazado'}
          </span>
        </div>
      </div>
    </div>
  );
}