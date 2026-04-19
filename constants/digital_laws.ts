export interface DigitalCategory {
  id: string;
  name: string;
  icon: any;
}

export const DIGITAL_CATEGORIES: DigitalCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
  { id: 'spid', name: 'SPID', icon: 'finger-print-outline' },
  { id: 'cie', name: 'CIE', icon: 'card-outline' },
  { id: 'pec', name: 'PEC', icon: 'mail-unread-outline' }
];

export interface DigitalLaw {
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

export const DIGITAL_LAWS: DigitalLaw[] = [
  {
    id: 'spid-1',
    categoryId: 'spid',
    title: 'Richiedere lo SPID per Stranieri',
    lawReference: 'D.Lgs. 82/2005 (CAD)',
    description: 'Il Sistema Pubblico di Identità Digitale è necessario per accedere a tutti i servizi della Pubblica Amministrazione (INPS, Agenzia Entrate, Sanità).',
    requirements: [
      'Avere almeno 18 anni.',
      'Avere un documento d\'identità italiano valido (es. Carta d\'Identità).',
      'Avere la Tessera Sanitaria con Codice Fiscale.',
      'Un numero di cellulare italiano e un indirizzo email.'
    ],
    duration: 'Illimitata',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Carta d\'Identità Italiana (o Passaporto se il provider lo accetta).',
      'Permesso di Soggiorno (necessario per dimostrare la regolarità, anche se il documento principale è la CIE).',
      'Tessera Sanitaria.'
    ],
    whereToApply: 'Poste Italiane (PosteID), Aruba, InfoCert, Sielte, Lepida. Si può fare online o di persona in posta.'
  },
  {
    id: 'cie-1',
    categoryId: 'cie',
    title: 'CIE: Carta d\'Identità Elettronica',
    lawReference: 'D.L. 78/2015',
    description: 'Il documento d\'identità rilasciato dal Comune di residenza. Contiene il Codice Fiscale e permette l\'accesso ai servizi digitali (come lo SPID).',
    requirements: [
      'Essere residenti nel Comune.',
      'Essere in possesso di un permesso di soggiorno valido (o ricevuta di rinnovo).'
    ],
    duration: '10 anni (per adulti), 5 anni (per minori 3-18), 3 anni (sotto i 3 anni)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      '3 Fototessere recenti.',
      'Vecchio documento d\'identità (o denuncia di smarrimento/furto).',
      'Permesso di soggiorno o ricevute (Busta Gialla).',
      'Circa 22,21 € per i costi di emissione.'
    ],
    whereToApply: 'Ufficio Anagrafe del proprio Comune di residenza (spesso su appuntamento).'
  },
  {
    id: 'pec-1',
    categoryId: 'pec',
    title: 'PEC: Posta Elettronica Certificata',
    lawReference: 'D.P.R. 68/2005',
    description: 'Un sistema di posta elettronica che ha lo stesso valore legale di una raccomandata con ricevuta di ritorno.',
    requirements: [
      'Nessun requisito particolare, chiunque può attivarla pagando un canone annuale.'
    ],
    duration: 'Annuale (Rinnovabile)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Dati anagrafici e Codice Fiscale.'
    ],
    whereToApply: 'Provider accreditati come Aruba, Poste Italiane, Legalmail, Register.it.'
  }
];

// Mock In-Memory DB
const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const categoryHasUnreadNews = (categoryId: string) => 
  DIGITAL_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
export const hasAnyUnreadNews = () => DIGITAL_LAWS.some(law => isLawUnread(law.id, law.isNew));
