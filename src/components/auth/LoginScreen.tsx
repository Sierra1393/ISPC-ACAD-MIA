/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Login Screen Component
 */

import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Completa todos los campos');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Error al iniciar sesión');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold text-slate-900">ISPC-ACAD-MIA</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Iniciar Sesión</h1>
          <p className="text-slate-600 text-sm">
            Plataforma de Formación para Oposiciones de Seguridad Pública
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.cat"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar Sesión
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center space-y-4">
          <p className="text-slate-600 text-sm">
            ¿Aún no tienes cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              Crear una cuenta
            </button>
          </p>

          {/* Demo Credentials */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Cuentas de Prueba (Demo)
            </p>
            <div className="space-y-1.5 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="font-semibold">Admin:</span> admin@oposicions-policia.cat
              </div>
              <div>
                <span className="font-semibold">Alumno Aprobado:</span> marc.soler@email.cat
              </div>
              <div className="text-[10px] text-slate-500 mt-2">
                (Cualquier contraseña funciona para las cuentas de prueba)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
