/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Targetes de preus per als plans d'ALPHA 13
 * 2 plans: Bàsic (39.99€/8 mesos) i Pro (79.99€/8 mesos)
 */

import React from 'react';
import { PLANS } from '../../data/plans';
import { Check, Zap } from 'lucide-react';

interface PricingCardsProps {
  selectedPlanId: string | null;
  onSelectPlan: (planId: 'basic' | 'pro') => void;
}

export function PricingCards({
  selectedPlanId,
  onSelectPlan,
}: PricingCardsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Capçalera */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">
          Escull el teu pla de formació
        </h2>
        <p className="text-slate-600 text-lg">
          8 mesos d'accés complet al temari per a oposicions de seguretat pública
        </p>
      </div>

      {/* Grid de plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 ${
              selectedPlanId === plan.id
                ? 'border-indigo-600 shadow-2xl shadow-indigo-200 scale-105'
                : 'border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
            }`}
          >
            {/* Badge popular */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                ⭐ MÉS POPULAR
              </div>
            )}

            {/* Nom del pla */}
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {plan.name}
            </h3>

            {/* Descripció */}
            <p className="text-sm text-slate-600 mb-6 h-10">
              {plan.description}
            </p>

            {/* Preu prominente */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black text-indigo-600">
                  {plan.price.toFixed(2).replace('.', ',')}€
                </span>
                <span className="text-slate-500 text-sm font-semibold">
                  total
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {plan.pricePerMonth.toFixed(2).replace('.', ',')}€/mes durant {plan.monthsDuration} mesos
              </p>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full">
                  ✓ Accés permanent al contingut
                </p>
              </div>
            </div>

            {/* Llista de features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                  <span className="text-sm text-slate-700 leading-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Botó de selecció */}
            <button
              onClick={() => onSelectPlan(plan.id as 'basic' | 'pro')}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedPlanId === plan.id
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}
            >
              {selectedPlanId === plan.id ? (
                <>
                  <Check className="w-5 h-5" />
                  Pla seleccionat
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Seleccionar aquest pla
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Nota informativa */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <p className="text-sm text-blue-900">
          <strong>💡 Tota la formació:</strong> Els 7 mòduls, 30 unitats formatives i accés complet durant 8 mesos consecutius.
          <br />
          <strong>No hi ha límit d'intents</strong> als tests d'examen ni accés limitat al temari.
        </p>
      </div>
    </div>
  );
}