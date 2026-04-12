export interface WorkLaw {
  id: string;
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

export const WORK_LAWS: WorkLaw[] = [
  {
    id: 'lavoro-1',
    title: 'Decreto Flussi 2026',
    lawReference: 'D.P.C.M. Programmazione Flussi',
    description: 'Il sistema delle quote che permette l\'ingresso in Italia per motivi di lavoro subordinato, stagionale e autonomo per cittadini residenti all\'estero.',
    requirements: [
      'Disponibilità di una quota residua nel decreto flussi corrente.',
      'Proposta di contratto di soggiorno da parte di un datore di lavoro in Italia.',
      'Assenza di motivi ostativi per l\'ingresso e il soggiorno nel territorio nazionale.'
    ],
    duration: 'Pari alla durata del contratto di lavoro subordinato (fino a 2 anni).',
    isNew: true,
    dateAdded: '2026-03-20',
    documentsNeeded: [
      'Nulla osta al lavoro rilasciato dallo Sportello Unico Immigrazione.',
      'Passaporto in corso di validità del cittadino straniero.',
      'Proposta di contratto di lavoro firmata dal datore.'
    ],
    whereToApply: 'Richiesta telematica tramite il portale ALI del Ministero dell\'Interno.'
  },
  {
    id: 'lavoro-2',
    title: 'Lavoro Subordinato a Tempo Indeterminato',
    lawReference: 'Art. 22 Testo Unico Immigrazione',
    description: 'Rilascio e rinnovo del permesso di soggiorno per chi ha un rapporto di lavoro stabile presso un\'azienda o un datore di lavoro privato.',
    requirements: [
      'Contratto di lavoro a tempo indeterminato regolarmente depositato.',
      'Reddito lordo annuo non inferiore all\'importo dell\'assegno sociale.',
      'Disponibilità di un alloggio certificato (idoneità abitativa).'
    ],
    duration: '2 anni (Rinnovabile fino a quando sussistono le condizioni del contratto).',
    isNew: false,
    dateAdded: '2025-12-15',
    documentsNeeded: [
      'Ultime tre buste paga e certificazione reddituale (CUD/730).',
      'Modello UNILAV di assunzione aggiornato.',
      'Copia del contratto di affitto o ospitalità registrato.'
    ],
    whereToApply: 'Invio del Kit Postale (Busta Gialla) presso gli uffici abilitati di Poste Italiane.'
  },
  {
      id: 'lavoro-3',
      title: 'Lavoro Autonomo e Partita IVA',
      lawReference: 'Art. 26 Testo Unico Immigrazione',
      description: 'Permesso dedicato a chi intende esercitare attività non occasionali di natura professionale o commerciale in proprio.',
      requirements: [
        'Disponibilità di risorse finanziarie sufficienti per l\'attività.',
        'Nulla osta della Camera di Commercio o dell\'ordine professionale.',
        'Certificazione del reddito presunto superiore al livello sociale.'
      ],
      duration: '2 anni (Rinnovabile).',
      isNew: true,
      dateAdded: '2026-04-01',
      documentsNeeded: [
        'Attribuzione Partita IVA e visura camerale aggiornata.',
        'Dichiarazione dei redditi o bilancino provvisorio.',
        'Copia delle licenze o autorizzazioni se previste.'
      ],
      whereToApply: 'Kit Postale (Busta Gialla) e successiva integrazione presso lo Sportello Unico.'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const hasAnyUnreadNews = () => WORK_LAWS.some(law => isLawUnread(law.id, law.isNew));
