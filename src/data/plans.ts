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
  description: string;
  features: string[];
  featureKeys: PlanFeature[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Bàsic',
    price: 4.99,
    pricePerMonth: 4.99,
    description: 'Perfecte per començar la teva preparació',
    features: [
      'Accés a tots els mòduls del curs',
      'Accés al temari de les unitats formatives',
      'Tests il·limitats per unitat formativa',
      'Generador automàtic de targetes d’estudi',
      'Seguiment bàsic del progrés',
      'Suport per correu electrònic',
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
    price: 9.99,
    pricePerMonth: 9.99,
    description:
      'Per a opositors que volen anar un pas més enllà',
    popular: true,
    features: [
      'Tot el que inclou el pla Bàsic',
      'Simulacres d’examen complets amb IA',
      'Estadístiques avançades de rendiment',
      'Contingut exclusiu descarregable en PDF',
      'Suport prioritari',
      'Accés anticipat als nous continguts',
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

/**
 * Obtén un pla pel seu identificador.
 */
export function getPlanById(
  id: string
): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

/**
 * Comprova si un pla té una funcionalitat concreta.
 */
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

/**
 * Comprova si un usuari té accés a una funcionalitat.
 */
export function canUseFeature(
  planId: PlanId | string | undefined,
  feature: PlanFeature
): boolean {
  return planHasFeature(planId, feature);
}

/**
 * Retorna el pla Bàsic.
 */
export function getBasicPlan(): Plan {
  return PLANS.find(
    (plan) => plan.id === 'basic'
  ) as Plan;
}

/**
 * Retorna el pla Pro.
 */
export function getProPlan(): Plan {
  return PLANS.find(
    (plan) => plan.id === 'pro'
  ) as Plan;
}