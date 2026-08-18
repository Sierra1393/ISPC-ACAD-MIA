import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  X,
  Upload,
  Clock,
  CheckCircle2,
  CreditCard,
  Send,
  Lock,
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSubmitRegistration: (data: Partial<UserProfile>) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitRegistration,
}) => {
  const [nom, setNom] = useState(currentUser.nom || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [dni, setDni] = useState(currentUser.dni || '');

  const [oposicio, setOposicio] = useState(
    currentUser.oposicio || "Mossos d'Esquadra"
  );

  const [fileNom, setFileNom] = useState(
    currentUser.comprovantNomFitxer || ''
  );

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFileNom(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmitRegistration({
      nom,
      email,
      dni,
      oposicio,
      comprovantNomFitxer:
        fileNom || 'Rebut_Pagament_Cuota.pdf',
      estatPagament: 'pendent',
      dataRegistre: new Date().toLocaleDateString('ca-ES'),
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full overflow-hidden shadow-xl text-slate-800">

        {/* Modal Header */}
        <div className="bg-indigo-900 p-6 border-b border-indigo-950 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-indigo-800 border border-indigo-700 flex items-center justify-center text-amber-300 shadow-2xs">
              <CreditCard className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-white">
                Registre i Accés al Curs
              </h3>

              <p className="text-xs text-indigo-200">
                Verificació de pagament per Administració
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Status Alert Banner */}
          {currentUser.estatPagament === 'aprovat' ? (

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">

              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />

              <div>
                <h4 className="font-semibold text-sm text-emerald-900">
                  Accés Aprovat i Verificat
                </h4>

                <p className="text-xs text-emerald-800 mt-1">
                  La teva quota d'inscripció ha estat confirmada pels administradors. Tens accés il·limitat als 7 Mòduls, temaris oficials, resums i preguntes d'examen automatitzades.
                </p>
              </div>

            </div>

          ) : currentUser.estatPagament === 'pendent' || submitted ? (

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">

              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />

              <div>
                <h4 className="font-semibold text-sm text-amber-900">
                  Sol·licitud Pendent de Verificació
                </h4>

                <p className="text-xs text-amber-800 mt-1">
                  Hem rebut la teva sol·licitud i el teu justificant de pagament ({fileNom || 'Comprovant de quota'}). Els administradors estan l'estudiant i et donaran accés en un termini màxim de 24h.
                </p>

                <p className="text-[11px] text-amber-900 mt-2 font-bold">
                  💡 *Pots canviar al perfil '🔑 Admin' a la barra superior per provar la verificació instantània!*
                </p>
              </div>

            </div>

          ) : (

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-start gap-3">

              <Lock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />

              <div>
                <h4 className="font-semibold text-sm text-indigo-900">
                  Accés Restringit a Alumnes Inscrits
                </h4>

                <p className="text-xs text-indigo-800 mt-1">
                  Per accedir al temari oficial i generar preguntes d'examen, completa el formulari de registre i adjunta el comprovant del pagament de la quota d'accés (49,90€).
                </p>
              </div>

            </div>
          )}

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Nom */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Nom i Cognoms
              </label>

              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                placeholder="Ex. Maria Garcia i Puig"
              />
            </div>

            {/* DNI + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  DNI / NIF
                </label>

                <input
                  type="text"
                  required
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  placeholder="12345678X"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Correu Electrònic
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  placeholder="alumne@correu.cat"
                />
              </div>

            </div>

            {/* Oposició */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Oposició
              </label>

              <select
                value={oposicio}
                onChange={(e) => setOposicio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >

                <option value="Mossos d'Esquadra">
                  Mossos d'Esquadra
                </option>

                <option value="Policia Local / Guàrdia Urbana / Policia Municipal">
                  Policia Local / Guàrdia Urbana / Policia Municipal
                </option>

              </select>

            </div>

            {/* Payment Proof Attachment Upload */}
            <div>

              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Justificant de Pagament de Quota (PDF / Imatge)
              </label>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors">

                <input
                  type="file"
                  id="comprovant-upload"
                  accept="application/pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <label
                  htmlFor="comprovant-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >

                  <Upload className="w-8 h-8 text-indigo-600" />

                  <span className="text-xs text-slate-700 font-medium">
                    {fileNom
                      ? `Fitxer seleccionat: ${fileNom}`
                      : 'Clica per penjar el rebut bancari o Bizum'}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    Accepta PDF, PNG, JPG (Màx 10MB)
                  </span>

                </label>

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
              >
                Tancar
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs flex items-center gap-2 transition-all"
              >

                <Send className="w-3.5 h-3.5" />

                Enviar per a Verificació de l'Admin

              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};