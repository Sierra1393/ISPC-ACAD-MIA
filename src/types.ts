export type UserRole = 'alumne' | 'admin';

export type PaymentStatus = 'pendent' | 'aprovat' | 'rebutjat';

export interface UserProfile {
  id: string;
  nom: string;
  email: string;
  dni: string;
  oposicio: string; // e.g. "Mossos d'Esquadra", "Policia Local / Guàrdia Urbana", "Bombers"
  role: UserRole;
  estatPagament: PaymentStatus;
  dataRegistre: string;
  dataPagament?: string;
  comprovanatUrl?: string;
  comprovantNomFitxer?: string;
  motiuRebuig?: string;
  quantitatPagada?: number;
}

export interface Question {
  id: string;
  pregunta: string;
  opcions: string[];
  respostaCorrecta: number; // 0, 1, 2, 3
  explicacio: string;
  referenciaOficial: string; // e.g. "Tema 3, Pàg. 32 - Principi de Congruència"
}

export interface ExamAttempt {
  id: string;
  ufId: string;
  data: string;
  puntuacio: number; // e.g. 8.5
  totalPreguntes: number;
  encerts: number;
  tempsSegons: number;
}

export interface FormativeUnit {
  id: string; // e.g. "uf-1-1"
  code: string; // e.g. "UF 1.1"
  titol: string;
  descripcio: string;
  duradaHores: number;
  pdfNom: string;
  pdfPagines: number;
  pdfDataPublicacio: string;
  pdfTextContingut: string; // Official text extracted from PDF
  indexPdf?: string[]; // Index / Table of Contents of topics in the PDF
  resumPuntsClau: string[]; // Key study points for the day before
  preguntesExamenPredefinides: Question[];
}

export interface Module {
  id: string; // e.g. "modul-1"
  numero: number; // 1 to 7
  code: string; // e.g. "Mòdul 1"
  titol: string;
  descripcio: string;
  unitatsFormatives: FormativeUnit[];
  icona: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citation?: string;
}
