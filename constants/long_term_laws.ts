export interface LongTermCategory {
  id: string;
  name: string;
  icon: any;
}

export const LONG_TERM_CATEGORIES: LongTermCategory[] = [
  { id: 'requisiti-base', name: 'Requisiti Base', icon: 'checkmark-circle-outline' },
  { id: 'esenzioni', name: 'Esenzioni Test Lingua', icon: 'language-outline' },
  { id: 'mantenimento', name: 'Mantenimento/Revoca', icon: 'alert-circle-outline' }
];

export interface LongTermLaw {
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

export const LONG_TERM_LAWS: LongTermLaw[] = [
  {
    id: 'long-1',
    categoryId: 'requisiti-base',
    title: 'Soggiornanti Lungo Periodo UE',
    lawReference: 'Art. 9 T.U. Immigrazione',
    description: 'Permesso di soggiorno a tempo indeterminato che garantisce maggiori diritti in Italia e in UE.',
    requirements: [
      'Possesso di un permesso di soggiorno da almeno 5 anni.',
      'Reddito non inferiore all\'importo annuo dell\'assegno sociale.',
      'Superamento test lingua italiana livello A2.'
    ],
    duration: 'Indeterminato (Aggiornamento ogni 10 anni)',
    isNew: true,
    dateAdded: '2026-02-18',
    documentsNeeded: [
      'Certificato idoneità alloggiativa.',
      'Certificato carichi pendenti e casellario giudiziale.',
      'Attestato superamento test lingua A2.'
    ],
    whereToApply: 'Poste Italiane (Kit Postale).'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const hasAnyUnreadNews = () => LONG_TERM_LAWS.some(law => isLawUnread(law.id, law.isNew));
