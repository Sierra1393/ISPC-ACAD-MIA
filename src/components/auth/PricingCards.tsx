// src/components/auth/PricingCards.tsx

import React from 'react';
import { PLANS } from '../../data/plans';
import { Check } from 'lucide-react';

interface PricingCardsProps {
  selectedPlanId: string | null;
  onSelectPlan: (planId: 'basic' | 'pro') => void;
}

export function PricingCards({
  selectedPlanId,
  onSelectPlan,
}: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 transition-all hover:shadow-xl ${
            selectedPlanId === plan.id
              ? 'border-indigo-600 shadow-indigo-100'
              : 'border-slate-200'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              ⭐ Més popular
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-900 text-center">
            {plan.name}
          </h3>

          <div className="text-center mt-4">
            <span className="text-4xl font-extrabold text-slate-900">
              {plan.price.toFixed(2).replace('.', ',')} €
            </span>
            <span className="text-slate-500 text-sm">/mes</span>
          </div>

          <p className="text-sm text-slate-600 text-center mt-2">
            {plan.description}
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onSelectPlan(plan.id)}
            className={`mt-6 w-full py-3 rounded-lg font-bold transition-colors text-sm md:text-base ${
              selectedPlanId === plan.id
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            {selectedPlanId === plan.id
              ? '✓ Pla seleccionat'
              : 'Seleccionar aquest pla'}
          </button>
        </div>
      ))}
    </div>
  );
}