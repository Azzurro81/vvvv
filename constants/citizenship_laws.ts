export interface CitizenshipCategory {
  id: string;
  name: string;
  icon: any;
}

export const CITIZENSHIP_CATEGORIES: CitizenshipCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
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
  },
  {
    id: 'cit-mat-1',
    categoryId: 'matrimonio',
    title: 'Cittadinanza per Matrimonio',
    lawReference: 'Legge 91/1992 - Art. 5',
    description: 'Concessione della cittadinanza al coniuge straniero di cittadino italiano o naturalizzato.',
    requirements: [
      'Residenza legale da almeno 2 anni dopo il matrimonio (in Italia) o 3 anni (all\'estero).',
      'I termini sono dimezzati in presenza di figli nati o adottati dalla coppia.',
      'Validità del vincolo coniugale (nessuna separazione o divorzio).'
    ],
    duration: 'Circa 2 anni per la conclusione del procedimento.',
    isNew: false,
    dateAdded: '2025-08-20',
    documentsNeeded: [
      'Atto di matrimonio trascritto in Italia.',
      'Certificato penale estero tradotto e legalizzato.',
      'Certificazione B1 in lingua italiana.'
    ],
    whereToApply: 'Portale telematico ALI del Ministero dell\'Interno.'
  },
  {
    id: 'cit-iure-1',
    categoryId: 'iure-sanguinis',
    title: 'Discendenza Italiana (Iure Sanguinis)',
    lawReference: 'Legge 91/1992 - Art. 1',
    description: 'Diritto alla cittadinanza per discendenti diretti di avi italiani emigrati all\'estero senza interruzione della trasmissione.',
    requirements: [
      'Possesso di un avo italiano nato prima del 1861 o cittadino del Regno/Repubblica.',
      'L\'avo non deve essersi naturalizzato straniero prima della nascita del figlio.',
      'Nessuna rinuncia formale nella linea.'
    ],
    duration: 'Dipende dai Consolati/Comuni (da 6 mesi a diversi anni).',
    isNew: false,
    dateAdded: '2026-03-30',
    documentsNeeded: [
      'Certificati originali di nascita, matrimonio e morte dell\'avo.',
      'Certificato di "Mancata Naturalizzazione" del paese stero.',
      'Stato civile e certificati discendenti fino al richiedente.'
    ],
    whereToApply: 'Consolato di competenza all\'estero, o Comune se residenti e domiciliati in Italia.'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const categoryHasUnreadNews = (categoryId: string) => {
  if (categoryId === 'novita') return hasAnyUnreadNews();
  return CITIZENSHIP_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
};

export const hasAnyUnreadNews = () => CITIZENSHIP_LAWS.some(law => isLawUnread(law.id, law.isNew));
