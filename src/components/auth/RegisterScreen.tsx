/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Component de pantalla de registre
 */

import React, { useState } from 'react';
import {
  Shield,
  Mail,
  Lock,
  User,
  FileText,
  Briefcase,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Sparkles,
} from 'lucide-react';

import { UserProfile } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PLANS } from '../../data/plans';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
  onSwitchToPayment?: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSwitchToLogin,
  onSwitchToPayment,
}) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState<{
    nom: string;
    email: string;
    dni: string;
    oposicio: string;
    password: string;
    passwordConfirm: string;
    plan: 'basic' | 'pro' | null;
  }>({
    nom: '',
    email: '',
    dni: '',
    oposicio: "Mossos d'Esquadra",
    password: '',
    passwordConfirm: '',
    plan: null,
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): {
    valid: boolean;
    error?: string;
  } => {
    if (!formData.nom.trim()) {
      return {
        valid: false,
        error: 'El nom i cognoms són obligatoris.',
      };
    }

    if (!formData.email.trim()) {
      return {
        valid: false,
        error: 'El correu electrònic és obligatori.',
      };
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      return {
        valid: false,
        error: 'El correu electrònic no és vàlid.',
      };
    }

    if (!formData.dni.trim()) {
      return {
        valid: false,
        error: 'El DNI/NIE és obligatori.',
      };
    }

    if (!formData.oposicio) {
      return {
        valid: false,
        error: 'Has de seleccionar una oposició.',
      };
    }

    if (!formData.password) {
      return {
        valid: false,
        error: 'La contrasenya és obligatòria.',
      };
    }

    if (formData.password.length < 6) {
      return {
        valid: false,
        error:
          'La contrasenya ha de tenir almenys 6 caràcters.',
      };
    }

    if (
      formData.password !==
      formData.passwordConfirm
    ) {
      return {
        valid: false,
        error: 'Les contrasenyes no coincideixen.',
      };
    }

    return {
      valid: true,
    };
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setError('');

    const validation = validateForm();

    if (!validation.valid) {
      setError(
        validation.error ||
          'Hi ha un error al formulari.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        nom: formData.nom,
        email: formData.email,
        dni: formData.dni,
        oposicio: formData.oposicio,
        password: formData.password,
        plan: formData.plan,
      });

      if (!result.success || !result.user) {
        setError(
          result.error ||
            'No s’ha pogut crear el compte.'
        );

        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        if (
          formData.plan &&
          onSwitchToPayment
        ) {
          onSwitchToPayment(result.user);
        } else {
          onSwitchToLogin();
        }
      }, 1200);
    } catch (error) {
      console.error(
        'Error en el registre:',
        error
      );

      setError(
        'No s’ha pogut crear el compte. Torna-ho a provar.'
      );

      setIsLoading(false);
    }
  };

  if (isSuccess) {
    const selectedPlan = formData.plan
      ? PLANS.find(
          (plan) =>
            plan.id === formData.plan
        )
      : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-5">

            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Compte creat!
              </h2>

              <p className="text-slate-600 text-sm mt-2">
                El teu compte s’ha creat correctament.
              </p>
            </div>

            {selectedPlan ? (
              <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-4">

                <div className="flex items-center justify-center gap-2 text-indigo-700">
                  <CreditCard className="w-4 h-4" />

                  <span className="font-semibold">
                    Pla {selectedPlan.name}
                  </span>
                </div>

                <p className="text-2xl font-black text-slate-900 mt-1">
                  {selectedPlan.price
                    .toFixed(2)
                    .replace('.', ',')}{' '}
                  €/mes
                </p>

              </div>
            ) : (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">

                <div className="flex items-center justify-center gap-2 text-emerald-700">
                  <Sparkles className="w-4 h-4" />

                  <span className="font-semibold">
                    Pla gratuït
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-2">
                  Podràs explorar gratuïtament la primera unitat
                  formativa de cada mòdul.
                </p>

              </div>
            )}

            <p className="text-xs text-slate-500">
              Redirigint al següent pas...
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Capçalera */}

        <div className="text-center mb-8 space-y-2">

          <div className="flex items-center justify-center gap-2 mb-4">

            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-7 h-7" />
            </div>

            <span className="text-2xl font-bold text-slate-900">
              ISPC-ACAD-MIA
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Crear compte
          </h1>

          <p className="text-slate-600 text-sm">
            Registra’t per accedir a la plataforma de formació
          </p>

        </div>

        {/* Formulari de registre */}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4"
        >

          {/* Nom */}

          <div className="space-y-2">

            <label
              htmlFor="nom"
              className="block text-sm font-semibold text-slate-700"
            >
              Nom i cognoms
            </label>

            <div className="relative">

              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                id="nom"
                name="nom"
                type="text"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex.: Joan Martí Garcia"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />

            </div>

          </div>

          {/* Correu */}

          <div className="space-y-2">

            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700"
            >
              Correu electrònic
            </label>

            <div className="relative">

              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuari@exemple.cat"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />

            </div>

          </div>

          {/* DNI */}

          <div className="space-y-2">

            <label
              htmlFor="dni"
              className="block text-sm font-semibold text-slate-700"
            >
              DNI / NIE
            </label>

            <div className="relative">

              <FileText className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                id="dni"
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Ex.: 12345678A"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />

            </div>

          </div>

          {/* Oposició */}

          <div className="space-y-2">

            <label
              htmlFor="oposicio"
              className="block text-sm font-semibold text-slate-700"
            >
              Oposició
            </label>

            <div className="relative">

              <Briefcase className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <select
                id="oposicio"
                name="oposicio"
                value={formData.oposicio}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none bg-white"
              >

                <option value="Mossos d'Esquadra">
                  Mossos d’Esquadra
                </option>

                <option value="Policia Local / Guàrdia Urbana / Policia Municipal">
                  Policia Local / Guàrdia Urbana / Policia Municipal
                </option>

              </select>

            </div>

          </div>

          {/* Contrasenya */}

          <div className="space-y-2">

            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Contrasenya
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínim 6 caràcters"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />

            </div>

          </div>

          {/* Confirmació de contrasenya */}

          <div className="space-y-2">

            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-semibold text-slate-700"
            >
              Confirma la contrasenya
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Repeteix la contrasenya"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />

            </div>

          </div>

          {/* Pla */}

          <div className="space-y-3 pt-2">

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Tria com vols començar
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Pots començar gratuïtament o contractar un pla Premium.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">

              {/* GRATUÏT */}

              <button
                key="free"
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    plan: null,
                  }))
                }
                className={`text-left rounded-xl border-2 p-4 transition-all ${
                  formData.plan === null
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <div className="flex items-center gap-2">

                      <span className="font-bold text-slate-900">
                        Gratuït
                      </span>

                      <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        Per començar
                      </span>

                    </div>

                    <div className="mt-1">

                      <span className="text-2xl font-black text-slate-900">
                        0,00 €
                      </span>

                      <span className="text-xs text-slate-500 ml-1">
                        /mes
                      </span>

                    </div>

                    <p className="text-xs text-slate-600 mt-2">
                      Primera unitat formativa de cada mòdul i accés
                      bàsic a la plataforma.
                    </p>

                  </div>

                  {formData.plan === null && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}

                </div>

              </button>

              {/* PREMIUM */}

              {PLANS.map((plan) => {

                const selected =
                  formData.plan === plan.id;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        plan: plan.id,
                      }))
                    }
                    className={`text-left rounded-xl border-2 p-4 transition-all ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <div className="flex items-center gap-2">

                          <span className="font-bold text-slate-900">
                            Pla {plan.name}
                          </span>

                          {plan.popular && (
                            <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                              Més popular
                            </span>
                          )}

                        </div>

                        <div className="mt-1">

                          <span className="text-2xl font-black text-slate-900">
                            {plan.price
                              .toFixed(2)
                              .replace('.', ',')}{' '}
                            €
                          </span>

                          <span className="text-xs text-slate-500 ml-1">
                            /mes
                          </span>

                        </div>

                        <p className="text-xs text-slate-600 mt-2">
                          {plan.description}
                        </p>

                      </div>

                      {selected && (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                      )}

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Error */}

          {error && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">

              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

              <p className="text-sm text-red-700">
                {error}
              </p>

            </div>
          )}

          {/* Botó */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-6"
          >

            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                Creant el compte...
              </>
            ) : (
              <>
                Crear compte

                <ArrowRight className="w-4 h-4" />
              </>
            )}

          </button>

        </form>

        {/* Enllaç d'inici de sessió */}

        <div className="mt-6 text-center">

          <p className="text-slate-600 text-sm">

            Ja tens un compte?{' '}

            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              Inicia sessió aquí
            </button>

          </p>

        </div>

      </div>
    </div>
  );
};