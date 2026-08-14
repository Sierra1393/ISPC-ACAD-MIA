// src/data/plans.ts

export interface Plan {
  id: 'basic' | 'pro';
  name: string;
  price: number;
  pricePerMonth: number;
  features: string[];
  popular?: boolean;
  description: string;
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 4.99,
    pricePerMonth: 4.99,
    description: 'Perfecto para empezar tu preparación',
    features: [
      'Acceso a todos los módulos del curso',
      'Tests ilimitados por unidad formativa',
      'Generador de flashcards automático',
      'Seguimiento de progreso básico',
      'Soporte por email (72h)'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    pricePerMonth: 9.99,
    description: 'Para opositores que quieren ir un paso más allá',
    popular: true,
    features: [
      'Todo lo del plan Básico',
      'Simulacros de examen completos con IA',
      'Estadísticas avanzadas de rendimiento',
      'Contenido exclusivo descargable (PDFs)',
      'Soporte prioritario 24h',
      'Acceso anticipado a nuevos contenidos'
    ]
  }
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find(plan => plan.id === id);
}
