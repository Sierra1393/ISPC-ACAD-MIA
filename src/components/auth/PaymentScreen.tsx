/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pantalla de pagament amb integració Stripe Checkout
 * Processa pagaments reals dels plans de 8 mesos
 */

import React, { useState } from 'react';
import { Shield, CheckCircle2, CreditCard, Zap, BookOpen, FileText, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';
import { getPlanById } from '../../data/plans';

interface PaymentScreenProps {
  user: UserProfile;
  planId: 'basic' | 'pro';
  onSwitchToLogin: () => void;
  onPaymentSuccess?: (sessionId: string) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  user,
  planId,
  onSwitchToLogin,
  onPaymentSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const plan = getPlanById(planId);
  
  if (!plan) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 text-center mb-2">Error</h2>
          <p className="text-red-700 text-center mb-4">Pla no encontrat</p>
          <button
            onClick={onSwitchToLogin}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            Torna enrere
          </button>
        </div>
      </div>
    );
  }

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Validació bàsica
      if (!user.email || !user.nom) {
        setError('Falten dades de l\'usuari');
        setIsLoading(false);
        return;
      }

      // Crida al backend per crear sessió Stripe Checkout
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          userEmail: user.email,
          userName: user.nom,
          userDni: user.dni,
          amount: Math.round(plan.price * 100), // Stripe espera centaus
          currency: 'eur',
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la sessió de pagament');
      }

      // Redirigeix a Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.sessionId && onPaymentSuccess) {
        onPaymentSuccess(data.sessionId);
      }
    } catch (err) {
      console.error('Error en pagament:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Ha ocorregut un error. Intenta-ho més tard.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Capçalera */}
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black text-slate-900">ALPHA 13</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Finalitza la inscripció</h1>
          <p className="text-slate-600 text-sm">
            Completa el pagament segur per accedir a tota la formació per a oposicions
          </p>
        </div>

        {/* Contenidor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Esquerra: detalls del curs i usuari */}
          <div className="lg:col-span-2 space-y-6">
            {/* Targeta d'informació del pla */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  {plan.name === 'Pro' ? 'Formació Prèmium' : 'Formació Bàsica'}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Curs de Formació Bàsica per a Policies
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Oposicions 2026-2027 • Mossos d'Esquadra, Policia Local i Bombers
                </p>
              </div>

              {/* Contingut inclòs */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Inclou:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>7 mòduls oficials</strong> del curs complet
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>30 unitats formatives</strong> amb el temari complet
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Exàmens simulats</strong> basats en el temari oficial
                    </span>
                  </li>
                  {plan.id === 'pro' && (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">
                          <strong>Tutor IA</strong> per resoldre dubtes
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">
                          <strong>Estadístiques avançades</strong> de rendiment
                        </span>
                      </li>
                    </>
                  )}
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">
                      <strong>Accés de per vida</strong> al contingut comprat
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dades de l'usuari */}
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

          {/* Dreta: resum del pagament */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-sm sticky top-4 space-y-4">
              {/* Resum del preu */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800">Resum del pagament</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Pla {plan.name}</span>
                    <span className="font-semibold text-slate-900">
                      {plan.price.toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>({plan.pricePerMonth.toFixed(2).replace('.', ',')}€/mes × {plan.monthsDuration})</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold">
                    <span className="text-slate-900">Total a pagar</span>
                    <span className="text-2xl text-indigo-600">
                      {plan.price.toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Seguretat del pagament */}
              <div className="pt-2 border-t border-slate-200">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider mb-1">
                    ✓ Seguretat garantida
                  </p>
                  <p className="text-xs text-emerald-800">
                    Pagaments processats per Stripe. Les teves dades bancàries són segures.
                  </p>
                </div>
              </div>

              {/* Missatge d'error (si hi ha) */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-800">{error}</p>
                </div>
              )}

              {/* Botó de pagament */}
              <button
                onClick={handleStripeCheckout}
                disabled={isLoading}
                className="w-full py-4 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processant...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Procedeix al pagament segur
                  </>
                )}
              </button>

              {/* Botó alternativa */}
              <button
                onClick={onSwitchToLogin}
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Torna enrere
              </button>

              {/* Nota de peu */}
              <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-200">
                <p>Pagaments segurs via Stripe. No desarem dades de la targeta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};