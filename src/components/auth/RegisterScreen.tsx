/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Registration Screen Component
 */

import React, { useState } from 'react';
import { Shield, Mail, Lock, User, FileText, Briefcase, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
  onSwitchToPayment?: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onSwitchToLogin, onSwitchToPayment }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    dni: '',
    oposicio: "Mossos d'Esquadra (Escala Bàsica 2026-2027)",
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): { valid: boolean; error?: string } => {
    if (!formData.nom.trim()) {
      return { valid: false, error: 'El nombre es requerido' };
    }
    if (!formData.email.trim()) {
      return { valid: false, error: 'El correo electrónico es requerido' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return { valid: false, error: 'Correo electrónico inválido' };
    }
    if (!formData.dni.trim()) {
      return { valid: false, error: 'El DNI es requerido' };
    }
    if (!formData.oposicio) {
      return { valid: false, error: 'Debe seleccionar una oposición' };
    }
    if (!formData.password) {
      return { valid: false, error: 'La contraseña es requerida' };
    }
    if (formData.password.length < 6) {
      return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }
    if (formData.password !== formData.passwordConfirm) {
      return { valid: false, error: 'Las contraseñas no coinciden' };
    }
    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateForm();
    if (!validation.valid) {
      setError(validation.error || 'Error en el formulario');
      return;
    }

    setIsLoading(true);

    const result = await register({
      nom: formData.nom,
      email: formData.email,
      dni: formData.dni,
      oposicio: formData.oposicio,
      password: formData.password,
    });

    if (!result.success) {
      setError(result.error || 'Error al crear la cuenta');
      setIsLoading(false);
      return;
    }

    setRegisteredUser(result.user || null);
    setIsSuccess(true);
    setIsLoading(false);

    // Redirect to payment screen after 2 seconds
    setTimeout(() => {
      if (onSwitchToPayment && result.user) {
        onSwitchToPayment(result.user);
      } else {
        onSwitchToLogin();
      }
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">¡Cuenta Creada!</h2>
            <p className="text-slate-600 text-sm">
              Tu cuenta ha sido creada exitosamente. Redirigiendo al inicio de sesión...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-slate-900">Crear Cuenta</h1>
          <p className="text-slate-600 text-sm">
            Regístrate para acceder a la plataforma de formación
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="nom" className="block text-sm font-semibold text-slate-700">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="nom"
                name="nom"
                type="text"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ej: Joan Martí García"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@ejemplo.cat"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* DNI Input */}
          <div className="space-y-2">
            <label htmlFor="dni" className="block text-sm font-semibold text-slate-700">
              DNI/NIE
            </label>
            <div className="relative">
              <FileText className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="dni"
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Ej: 12345678A"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Oposicion Select */}
          <div className="space-y-2">
            <label htmlFor="oposicio" className="block text-sm font-semibold text-slate-700">
              Oposición
            </label>
            <div className="relative">
              <Briefcase className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="oposicio"
                name="oposicio"
                value={formData.oposicio}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none bg-white"
              >
                <option value="Mossos d'Esquadra (Escala Bàsica 2026-2027)">
                  Mossos d'Esquadra (Escala Bàsica 2026-2027)
                </option>
                <option value="Policia Local / Guàrdia Urbana">
                  Policia Local / Guàrdia Urbana
                </option>
                <option value="Bombers">Bombers</option>
                <option value="Policia Nacional">Policia Nacional</option>
                <option value="Guàrdia Civil">Guàrdia Civil</option>
              </select>
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-700">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-6"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creando cuenta...
              </>
            ) : (
              <>
                Crear Cuenta
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
