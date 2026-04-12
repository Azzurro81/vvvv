export interface AsylumCategory {
  id: string;
  name: string;
  icon: any;
}

export const ASYLUM_CATEGORIES: AsylumCategory[] = [
  { id: 'politico', name: 'Asilo Politico', icon: 'ribbon-outline' },
  { id: 'sussidiaria', name: 'Protezione Sussidiaria', icon: 'shield-half-outline' },
  { id: 'speciale', name: 'Protezione Speciale', icon: 'shield-checkmark-outline' },
  { id: 'costituzionale', name: 'Asilo Costituzionale', icon: 'library-outline' },
  { id: 'procedura', name: 'Procedura d\'Esame', icon: 'chatbubbles-outline' }
];

export interface AsylumLaw {
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

export const ASYLUM_LAWS: AsylumLaw[] = [
  // ASILO POLITICO (Rifugiato)
  {
    id: 'pol-1',
    categoryId: 'politico',
    title: 'Riconoscimento Status di Rifugiato',
    lawReference: 'Convenzione di Ginevra 1951 - Art. 1 - D.Lgs. 251/2007',
    description: 'Riconosciuto a chi ha un fondato timore di persecuzione diretta per motivi di razza, religione, nazionalità, opinione politica o gruppo sociale.',
    requirements: [
      'Persecuzione individuale e mirata.',
      'Mancanza di protezione dallo Stato d\'origine.',
      'Timore oggettivo e soggettivo documentato.'
    ],
    duration: '5 anni (Rinnovabile)',
    isNew: false,
    dateAdded: '2025-01-10',
    documentsNeeded: [
      'Memoria scritta (memoriale) dettagliata.',
      'Passaporto o documenti d\'identità (se posseduti).',
      'Certificati medici, foto o denunce della persecuzione.'
    ],
    whereToApply: 'Ufficio Immigrazione della Questura o Polizia di Frontiera.'
  },
  // PROTEZIONE SUSSIDIARIA
  {
    id: 'sus-1',
    categoryId: 'sussidiaria',
    title: 'Protezione Sussidiaria (Conflitti Armati)',
    lawReference: 'D.Lgs. 251/2007',
    description: 'Per chi non è rifugiato ma rischia danni gravi (tortura, pena di morte, violenza in guerra) se rientra nel proprio paese.',
    requirements: [
      'Rischio di subire danni gravi nel Paese d\'origine.',
      'Situazione di violenza indiscriminata per conflitto armato.'
    ],
    duration: '5 anni (Rinnovabile)',
    isNew: false,
    dateAdded: '2025-02-15',
    documentsNeeded: [
      'Documentazione dell\'identità.',
      'Prove della situazione del Paese d\'origine (COI).'
    ],
    whereToApply: 'Polizia di Stato (Ufficio Immigrazione).'
  },
  // PROTEZIONE SPECIALE (CUTRO)
  {
    id: 'spe-1',
    categoryId: 'speciale',
    title: 'Protezione Speciale (Norme 2026)',
    lawReference: 'Legge 50/2023 (Decreto Cutro)',
    description: 'Forma di protezione per casi eccezionali, inclusi rischi di tortura e inespellibilità per gravi obblighi internazionali.',
    requirements: [
      'Rischio effettivo di tortura o trattamenti disumani.',
      'Inespellibilità per ragioni di salute o legami familiari primari (molto limitata).'
    ],
    duration: '2 anni (In genere non convertibile)',
    isNew: true,
    dateAdded: '2026-04-10',
    documentsNeeded: [
      'Passaporto o identificazione accertata.',
      'Sussistenza di obblighi di protezione internazionale.'
    ],
    whereToApply: 'Evaluata dalla Commissione Territoriale durante la domanda di asilo.'
  },
  // PROCEDURA
  {
    id: 'pro-1',
    categoryId: 'procedura',
    title: 'Modello C3 e Prima Accoglienza',
    lawReference: 'D.Lgs. 25/2008',
    description: 'Il colloquio iniziale dove si formalizza la richiesta di protezione internazionale e si ricevono le impronte digitali.',
    requirements: [
      'Essere fisicamente presenti in Italia.',
      'Dichiarare la volontà di chiedere asilo.'
    ],
    duration: 'Il "Cedolino" vale come permesso provvisorio',
    isNew: false,
    dateAdded: '2025-03-01',
    documentsNeeded: [
      'Fototessere.',
      'Dichiarazione di ospitalità o domicilio.'
    ],
    whereToApply: 'Questura locale.'
  },
  {
    id: 'pro-2',
    categoryId: 'procedura',
    title: 'Commissione Territoriale (L\'Audizione)',
    lawReference: 'D.Lgs. 25/2008',
    description: 'Il momento decisivo in cui il richiedente racconta la propria storia davanti a una Commissione che deciderà sull\'esito.',
    requirements: [
      'Convocazione ufficiale ricevuta in Questura.',
      'Presenza obbligatoria.'
    ],
    duration: 'Esito entro 45-60 giorni',
    isNew: true,
    dateAdded: '2026-04-11',
    documentsNeeded: [
      'Ricevuta del C3.',
      'Documentazione aggiuntiva presentata per l\'audizione.'
    ],
    whereToApply: 'Sedi della Commissione Territoriale Nazionale.'
  },
  {
    id: 'pro-3',
    categoryId: 'procedura',
    title: 'Regolamento Dublino',
    lawReference: 'Regolamento (UE) 604/2013',
    description: 'Normativa che stabilisce quale Stato membro è competente per l\'esame della domanda d\'asilo (in genere il primo Paese di ingresso o impronte).',
    requirements: [
      'Presenza di impronte digitali (Eurodac) in un altro Stato UE.',
      'Richiesta di asilo già presentata altrove.',
      'Legami familiari in altri Stati membri.'
    ],
    duration: 'Procedura di trasferimento (6-18 mesi)',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Verbale di identificazione.',
      'Prova di legami familiari o vulnerabilità.'
    ],
    whereToApply: 'Unità Dublino presso il Ministero dell\'Interno.'
  },
  {
    id: 'pro-4',
    categoryId: 'procedura',
    title: 'Ricorso Giurisdizionale',
    lawReference: 'D.Lgs. 25/2008 - D.Lgs. 13/2017',
    description: 'Procedura per impugnare un esito negativo della Commissione Territoriale davanti al Tribunale Specializzato.',
    requirements: [
      'Notifica della decisione negativa.',
      'Ricorso entro 30 giorni (15 in alcuni casi).',
      'Assistenza obbligatoria di un avvocato.'
    ],
    duration: 'Da 6 mesi a 2 anni',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Provvedimento di diniego della Commissione.',
      'Mandato all\'avvocato.',
      'Prove aggiuntive non presentate prima.'
    ],
    whereToApply: 'Sezione Specializzata Immigrazione del Tribunale competente.'
  },
  {
    id: 'spe-2',
    categoryId: 'speciale',
    title: 'Permesso per Cure Mediche',
    lawReference: 'Art. 19 co. 2 lett. d-bis T.U.I.',
    description: 'Tutela il diritto alla salute per chi si trova in gravi condizioni psicofisiche o patologie che non possono essere curate nel Paese d\'origine.',
    requirements: [
      'Gravi condizioni di salute certificate.',
      'Rischio di danno irreparabile se rimpatriato.',
      'Relazione medica di struttura pubblica o convenzionata.'
    ],
    duration: 'Durata del trattamento (massimo 1 anno)',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Certificazione medica dettagliata.',
      'Passaporto o identificazione.',
      'Prova di impossibilità di cure nel Paese d\'origine.'
    ],
    whereToApply: 'Questura locale (Ufficio Immigrazione).'
  }
];

// Mock In-Memory DB per lo stato "Letto/Non Letto"
const readLaws = new Set<string>();

export const isLawUnread = (id: string, isNew: boolean) => {
  if (!isNew) return false;
  return !readLaws.has(id);
};

export const markLawAsRead = (id: string) => {
  readLaws.add(id);
};

export const categoryHasUnreadNews = (categoryId: string) => {
  return ASYLUM_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
};

export const hasAnyUnreadNews = () => {
  return ASYLUM_LAWS.some(law => isLawUnread(law.id, law.isNew));
};
