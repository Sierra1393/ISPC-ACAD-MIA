// src/data/plans.ts

export type PlanId = 'basic' | 'pro';

export type PlanFeature =
  | 'all_modules'
  | 'uf_content'
  | 'unlimited_quizzes'
  | 'flashcards'
  | 'basic_progress'
  | 'ai_exam_simulations'
  | 'advanced_statistics'
  | 'downloadable_pdfs'
  | 'priority_support'
  | 'early_access';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  pricePerMonth: number;
  monthsDuration: number;
  description: string;
  features: string[];
  featureKeys: PlanFeature[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Bàsic',
    price: 39.99,
    pricePerMonth: 4.99,
    monthsDuration: 8,
    description: 'Accés complet a 8 mesos de formació',
    features: [
      'Accés a tots els 7 mòduls del curs',
      'Accés al temari complet de les 30 unitats formatives',
      'Tests il·limitats per unitat formativa',
      'Generador automàtic de targetes d\'estudi (ANKI)',
      'Seguiment bàsic del progrés',
      'Suport per correu electrònic',
      '8 mesos d\'accés ininterromput',
    ],
    featureKeys: [
      'all_modules',
      'uf_content',
      'unlimited_quizzes',
      'flashcards',
      'basic_progress',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79.99,
    pricePerMonth: 9.99,
    monthsDuration: 8,
    description: 'Accés premium a 8 mesos amb simulacions IA',
    popular: true,
    features: [
      'Tot el que inclou el pla Bàsic',
      'Simulacres d\'examen complets amb IA',
      'Estadístiques avançades de rendiment i anàlisi de punts febles',
      'Contingut exclusiu descarregable en PDF',
      'Tutor virtual IA per resoldre dubtes',
      'Suport prioritari per telèfon i chat',
      'Accés anticipat als nous continguts',
      '8 mesos d\'accés ininterromput',
    ],
    featureKeys: [
      'all_modules',
      'uf_content',
      'unlimited_quizzes',
      'flashcards',
      'basic_progress',
      'ai_exam_simulations',
      'advanced_statistics',
      'downloadable_pdfs',
      'priority_support',
      'early_access',
    ],
  },
];

export function getPlanById(
  id: string
): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

export function planHasFeature(
  planId: PlanId | string | undefined,
  feature: PlanFeature
): boolean {
  if (!planId) {
    return false;
  }

  const plan = getPlanById(planId);

  if (!plan) {
    return false;
  }

  return plan.featureKeys.includes(feature);
}

export function canUseFeature(
  planId: PlanId | string | undefined,
  feature: PlanFeature
): boolean {
  return planHasFeature(planId, feature);
}

export function getBasicPlan(): Plan {
  return PLANS.find(
    (plan) => plan.id === 'basic'
  ) as Plan;
}

export function getProPlan(): Plan {
  return PLANS.find(
    (plan) => plan.id === 'pro'
  ) as Plan;
}