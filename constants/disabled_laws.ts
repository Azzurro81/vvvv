export interface DisabledCategory {
  id: string;
  name: string;
  icon: any;
}

export const DISABLED_CATEGORIES: DisabledCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
  { id: 'invalidita', name: 'Invalidità Civile', icon: 'medical-outline' },
  { id: 'agevolazioni', name: 'Agevolazioni e Bonus', icon: 'gift-outline' }
];

export interface DisabledLaw {
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

export const DISABLED_LAWS: DisabledLaw[] = [
  {
    id: 'dis-inv-1',
    categoryId: 'invalidita',
    title: 'Richiesta Invalidità Civile',
    lawReference: 'Legge 118/1971',
    description: 'Procedura per il riconoscimento della minorazione fisica, psichica o sensoriale che dà diritto a prestazioni assistenziali e agevolazioni.',
    requirements: [
      'Cittadinanza italiana o stranieri con permesso di soggiorno (minimo 1 anno).',
      'Certificazione del medico di base attestante la patologia.',
      'Soggiorno stabile e continuativo in Italia.'
    ],
    duration: 'Permanente (soggetta a revisione se prevista)',
    isNew: true,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Certificato medico digitale (trasmesso dal medico all\'INPS).',
      'Codice Fiscale e Documento di Identità.',
      'Copia del Permesso di Soggiorno.'
    ],
    whereToApply: 'On-line tramite il portale INPS con SPID/CIE o tramite Patronato.'
  },
  {
    id: 'dis-acc-1',
    categoryId: 'invalidita',
    title: 'Indennità di Accompagnamento',
    lawReference: 'Legge 18/1980',
    description: 'Sostegno economico erogato dall\'INPS a chi è impossibilitato a deambulare senza l\'aiuto di un accompagnatore o non è in grado di compiere gli atti quotidiani della vita.',
    requirements: [
      'Riconoscimento dell\'invalidità totale (100%).',
      'Residenza effettiva sul territorio nazionale.',
      'Nessun ricovero gratuito in istituto per più di 30 giorni.'
    ],
    duration: 'Mensile',
    isNew: true,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Verbale di invalidità con riconoscimento indennità.',
      'Certificato del medico curante.',
      'Documento di identità e permesso di soggiorno.'
    ],
    whereToApply: 'Domanda telematica all\'INPS.'
  },
  {
    id: 'dis-age-1',
    categoryId: 'agevolazioni',
    title: 'Contrassegno Unico Disabili UE',
    lawReference: 'D.P.R. 151/2012',
    description: 'Il contrassegno per il parcheggio e la circolazione nelle zone a traffico limitato (ZTL), valido in tutti i paesi membri dell\'UE.',
    requirements: [
      'Capacità di deambulazione sensibilmente ridotta.',
      'Cecità assoluta.',
      'Certificazione medico-legale dell\'ASL.'
    ],
    duration: '5 anni (Rinnovabile)',
    isNew: false,
    dateAdded: '2025-12-01',
    documentsNeeded: [
      'Certificato dell\'Ufficio Medico Legale dell\'ASL.',
      '2 Fototessere.',
      'Documento d\'identità valido.'
    ],
    whereToApply: 'Ufficio Polizia Locale o Comune di residenza.'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);

export const categoryHasUnreadNews = (categoryId: string) => {
  if (categoryId === 'novita') return hasAnyUnreadNews();
  return DISABLED_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
};

export const hasAnyUnreadNews = () => DISABLED_LAWS.some(law => isLawUnread(law.id, law.isNew));
