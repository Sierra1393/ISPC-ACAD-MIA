import { UserProfile } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-admin-1',
    nom: 'Sergi Planas (Administrador)',
    email: 'admin@oposicions-policia.cat',
    dni: '47123984A',
    oposicio: "Coordinació d'Oposicions - ISPC",
    role: 'admin',
    estatPagament: 'aprovat',
    dataRegistre: '01/01/2026',
    dataPagament: '01/01/2026',
    quantitatPagada: 120
  },
  {
    id: 'usr-student-approved',
    nom: 'Marc Soler i Font',
    email: 'marc.soler@email.cat',
    dni: '48239102X',
    oposicio: "Mossos d'Esquadra (Escala Bàsica 2026-2027)",
    role: 'alumne',
    estatPagament: 'aprovat',
    dataRegistre: '02/02/2026',
    dataPagament: '02/02/2026',
    comprovanatUrl: '#',
    comprovantNomFitxer: 'Transferencia_Cuota_MarcSoler.pdf',
    quantitatPagada: 49.90
  },
  {
    id: 'usr-student-pending-1',
    nom: 'Laia Guitart Vila',
    email: 'laia.guitart@email.cat',
    dni: '49301928B',
    oposicio: "Policia Local / Guàrdia Urbana",
    role: 'alumne',
    estatPagament: 'pendent',
    dataRegistre: '11/08/2026',
    comprovantNomFitxer: 'Rebut_Bizum_LaiaGuitart.jpg',
    quantitatPagada: 49.90
  },
  {
    id: 'usr-student-pending-2',
    nom: 'Jordi Clotet Valls',
    email: 'jclotet@email.cat',
    dni: '39482019M',
    oposicio: "Mossos d'Esquadra",
    role: 'alumne',
    estatPagament: 'pendent',
    dataRegistre: '10/08/2026',
    comprovantNomFitxer: 'Comprovant_Bancari_JordiC.pdf',
    quantitatPagada: 49.90
  }
];
