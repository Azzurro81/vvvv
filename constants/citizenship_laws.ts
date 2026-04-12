export interface CitizenshipCategory {
  id: string;
  name: string;
  icon: any;
}

export const CITIZENSHIP_CATEGORIES: CitizenshipCategory[] = [
  { id: 'residenza', name: 'Per Residenza', icon: 'home-outline' },
  { id: 'matrimonio', name: 'Per Matrimonio', icon: 'calendar-outline' },
  { id: 'iure-sanguinis', name: 'Iure Sanguinis', icon: 'git-branch-outline' }
];

export interface CitizenshipLaw {
  id: string;
  categoryId: string;
  title: string;
  lawReference: string;
  description: string;
  requirements: string[];
  duration: string;
  isNew: boolean;
  dateAdded: string;
  documentsNeeded: string[];
  whereToApply: string;
}

export const CITIZENSHIP_LAWS: CitizenshipLaw[] = [
  {
    id: 'cit-res-1',
    categoryId: 'residenza',
    title: 'Richiesta per 10 anni di Residenza',
    lawReference: 'Legge 91/1992 - Art. 9',
    description: 'Riconoscimento della cittadinanza per chi vive regolarmente e ininterrottamente in Italia da 10 anni (per cittadini extra-UE).',
    requirements: [
      '10 anni di residenza anagrafica continua.',
      'Reddito minimo negli ultimi 3 anni superiori a € 8.263,31.',
      'Conoscenza lingua italiana livello B1.'
    ],
    duration: 'Procedura di circa 2-3 anni',
    isNew: false,
    dateAdded: '2025-05-10',
    documentsNeeded: [
      'Certificato di nascita originale legalizzato.',
      'Certificato penale del Paese d\'origine.',
      'Certificazione di lingua B1 (o superiore).'
    ],
    whereToApply: 'Portale Ministero dell\'Interno (telematico con SPID).'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const hasAnyUnreadNews = () => CITIZENSHIP_LAWS.some(law => isLawUnread(law.id, law.isNew));
