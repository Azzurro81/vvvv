export interface LongTermCategory {
  id: string;
  name: string;
  icon: any;
}

export const LONG_TERM_CATEGORIES: LongTermCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
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
  },
  {
    id: 'long-ese-1',
    categoryId: 'esenzioni',
    title: 'Minori di 14 anni',
    lawReference: 'D.M. 4 giugno 2010 - Art. 4',
    description: 'I figli minori di 14 anni sono automaticamente esentati dallo svolgimento del test di lingua italiana per la richiesta del permesso di soggiorno a lungo periodo.',
    requirements: [
      'Età inferiore a 14 anni al momento della presentazione della domanda.',
      'Documento di identità valido che attesti l\'età.'
    ],
    duration: 'Permanente (legata all\'età)',
    isNew: false,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Passaporto o certificato di nascita tradotto e legalizzato.'
    ],
    whereToApply: 'Non serve richiesta specifica, l\'esenzione si applica in automatico inserendo la data di nascita nel Kit Postale.'
  },
  {
    id: 'long-ese-2',
    categoryId: 'esenzioni',
    title: 'Disabilità o gravi patologie',
    lawReference: 'D.M. 4 giugno 2010 - Art. 4',
    description: 'Esenzione per chi soffre di patologie, handicap o gravi limitazioni alla capacità di apprendimento linguistico, incluse quelle legate a un\'età molto avanzata.',
    requirements: [
      'Incapacità fisica, psichica o sensoriale di superare un test di apprendimento.',
      'Età molto avanzata comprovata da documenti medici se causa di deficit cognitivi.'
    ],
    duration: 'Permanente',
    isNew: false,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Certificazione medica rilasciata da una struttura sanitaria pubblica (ASL) o medico convenzionato SSN.',
      'La certificazione deve esplicitamente citare l\'impossibilità di apprendimento linguistico.'
    ],
    whereToApply: 'Da allegare al Kit Giallo (Modulo 1) al momento della spedizione.'
  },
  {
    id: 'long-ese-3',
    categoryId: 'esenzioni',
    title: 'Titolo di Studio in Italia',
    lawReference: 'Decreto Legislativo 286/98',
    description: 'Chi ha già studiato in Italia e conseguito almeno un diploma di scuola media, diploma superiore o frequentato l\'università è totalmente esentato dal test in Prefettura.',
    requirements: [
      'Il titolo deve essere stato rilasciato in Italia o in scuole italiane parificate.',
      'In alternativa, un attestato Cpia di un corso di lingua italiana (se concluso con successo).'
    ],
    duration: 'Permanente',
    isNew: true,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Fotocopia del Diploma di Licenza Media o Maturità.',
      'Certificato di iscrizione universitaria in corso, oppure Laurea ottenuta in Italia.'
    ],
    whereToApply: 'Da allegare in copia all\'interno della busta del Kit Giallo.'
  },
  {
    id: 'long-ese-4',
    categoryId: 'esenzioni',
    title: 'Professionisti Altamente Qualificati',
    lawReference: 'Art. 27 T.U. Immigrazione (lett. a, c, d, q)',
    description: 'Lavoratori esentati in virtù del loro ingresso per casi particolari, tra cui: Dirigenti di alto livello, Professori Universitari, Traduttori, Ricercatori o Giornalisti.',
    requirements: [
      'Ingresso e soggiorno in Italia con un permesso originato dall\'Art. 27 del Testo Unico nelle categorie specifiche citate.'
    ],
    duration: 'N/A',
    isNew: false,
    dateAdded: '2026-04-13',
    documentsNeeded: [
      'Copia degli atti o permessi legati al proprio status professionale.',
      'Dichiarazione del datore di lavoro o dell\'istituto (es. Università).'
    ],
    whereToApply: 'Allegare la documentazione comprovante il proprio status al Kit Postale.'
  },
  {
    id: 'long-man-1',
    categoryId: 'mantenimento',
    title: 'Cause di Revoca della Carta',
    lawReference: 'Art. 9 T.U. Immigrazione',
    description: 'La Carta di Soggiorno può essere revocata in specifiche circostanze previste dalla legge.',
    requirements: [
      'Acquisizione con frode o documenti falsi.',
      'Espulsione per motivi di ordine pubblico o sicurezza dello Stato.',
      'Assenza dal territorio UE per 12 mesi consecutivi.',
      'Acquisizione di permesso di lungo periodo in un altro Stato UE.'
    ],
    duration: 'N/A',
    isNew: false,
    dateAdded: '2026-01-05',
    documentsNeeded: [
      'Provvedimento di revoca della Questura.',
      'Eventuale ricorso legale.'
    ],
    whereToApply: 'Prefettura o Questura competente territoriale.'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const categoryHasUnreadNews = (categoryId: string) => {
  if (categoryId === 'novita') return hasAnyUnreadNews();
  return LONG_TERM_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
};

export const hasAnyUnreadNews = () => LONG_TERM_LAWS.some(law => isLawUnread(law.id, law.isNew));
