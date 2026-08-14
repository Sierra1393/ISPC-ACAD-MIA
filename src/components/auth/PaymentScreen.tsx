/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Payment Screen Component
 * NOTE: This is a placeholder for payment integration.
 * Currently shows payment details but does not process payments.
 * Future integration will connect to Stripe, PayPal, or other payment providers.
 */

import React from 'react';
import { Shield, CheckCircle2, CreditCard, Zap, BookOpen, FileText, Users, ArrowRight } from 'lucide-react';
import { UserProfile } from '../../types';

interface PaymentScreenProps {
  user: UserProfile;
  onSwitchToLogin: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  user,
  onSwitchToLogin
}) => {
  const COURSE_PRICE = 49.90;

  const handlePaymentClick = () => {
    // TODO: Integrate payment provider (Stripe, PayPal, etc.)
    // For now, this is a placeholder
    alert('Sistema de pagos en desarrollo. Próximamente podrás pagar aquí.');
    // Future: onProcessPayment()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold text-slate-900">ISPC-ACAD-MIA</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Finaliza tu Inscripción</h1>
          <p className="text-slate-600 text-sm">
            Completa el pago para acceder al contenido de la formación
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Course Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Info Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  Formación Premium
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Curs de Formació Bàsica per a Policies
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Oposicions 2026-2027 • Mossos d'Esquadra, Policia Local i Bombers
                </p>
              </div>

              {/* What's Included */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Inclou:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>7 Mòduls Officials</strong> del curs completo
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>30 Unitats Formatives</strong> amb temari complet
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Exàmens Simulats</strong> basats en temari oficial
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Generador de Targetes Flash</strong> per estudiar
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Accés de Per Vida</strong> al contingut comprat
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Suport tècnic</strong> durant el curs
                    </span>
                  </li>
                </ul>
              </div>

              {/* User Verification */}
              <div className="pt-4 border-t border-slate-200 bg-slate-50 rounded-lg p-4">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Dades de la teva Inscripció:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Nom:</span>
                    <span className="font-semibold text-slate-900">{user.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-semibold text-slate-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">DNI:</span>
                    <span className="font-semibold text-slate-900">{user.dni}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Oposició:</span>
                    <span className="font-semibold text-slate-900 text-right max-w-xs">
                      {user.oposicio}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-sm sticky top-4 space-y-4">
              {/* Price Summary */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800">Resum de Pagament</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Accés a la plataforma</span>
                    <span className="font-semibold text-slate-900">{COURSE_PRICE.toFixed(2)}€</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between">
                    <span className="font-bold text-slate-900">Total a pagar</span>
                    <span className="text-xl font-bold text-indigo-600">{COURSE_PRICE.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="pt-2 border-t border-slate-200">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider mb-1">
                    Estat:
                  </p>
                  <p className="text-sm font-bold text-amber-900">
                    Pendent de Verificació
                  </p>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Completa el pagament per accedir al contingut.
                  </p>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePaymentClick}
                className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard className="w-4 h-4" />
                Procedir al Pago
              </button>

              {/* Alternative: Go Back to Login */}
              <button
                onClick={onSwitchToLogin}
                className="w-full py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Tornar al Inici de Sessió
              </button>

              {/* Security Note */}
              <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-200">
                <p>Tots els pagaments són segurs i protegits. No es guardaran dades de la tarja.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Pots contactar amb nosaltres a <span className="font-semibold">suport@alpha13.cat</span> si tens algun problema
          </p>
        </div>
      </div>
    </div>
  );
};
