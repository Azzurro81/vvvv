export interface FamilyCategory {
  id: string;
  name: string;
  icon: any;
}

export const FAMILY_CATEGORIES: FamilyCategory[] = [
  { id: 'ricongiungimento', name: 'Ricongiungimento', icon: 'people-outline' },
  { id: 'coesione', name: 'Coesione Familiare', icon: 'heart-outline' },
  { id: 'minori', name: 'Parenti di Minori', icon: 'child-outline' }
];

export interface FamilyLaw {
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

export const FAMILY_LAWS: FamilyLaw[] = [
  {
    id: 'fam-min-1',
    categoryId: 'minori',
    title: 'Rinnovo Minori e Familiari',
    lawReference: 'D.P.R. 394/99 e s.m.i.',
    description: 'Guida completa per il rinnovo del permesso di soggiorno per i figli minori e i familiari a carico, con dettagli su impronte digitali e documenti scolastici.',
    requirements: [
      'Bambini da 0 a 6 anni: NON prendono le impronte, ma devono essere presenti in Questura per la foto.',
      'Bambini dai 6 anni in su: Obbligo di rilascio delle impronte digitali (segnalamento fotodattiloscopico).',
      'Presenza Fisica: Tutti i figli minori devono essere portati in Questura il giorno dell\'appuntamento.'
    ],
    duration: 'Pari alla durata del permesso del genitore/garante',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Passaporto del Minore: Fotocopia delle pagine dei dati personali e dei timbri.',
      'Certificato di Nascita: Deve contenere i nomi dei genitori (se non già depositato).',
      'Iscrizione Scolastica: Certificato di frequenza della scuola per i bambini in età scolare.',
      'Tessera Sanitaria: Fotocopia fronte/retro del minore.',
      'Idoneità Alloggiativa: Certificato originale del Comune (fondamentale per i familiari).',
      'CUD/CU Genitore: Prova di reddito del genitore garante sufficiente per il numero di familiari.',
      'Marca da Bollo: € 16,00 (un bollo per ogni kit/richiesta).'
    ],
    whereToApply: 'Kit Postale (Busta Gialla) inviato a nome del genitore se il minore è infraquattordicenne.'
  },
  {
    id: 'ric-1',
    categoryId: 'ricongiungimento',
    title: 'Documenti per Motivi Familiari',
    lawReference: 'Art. 29 e Art. 30 T.U. Immigrazione',
    description: 'Elenco completo dei documenti necessari per richiedere o rinnovare il permesso di soggiorno per motivi familiari (ricongiungimento o coesione).',
    requirements: [
      'Legame di parentela con un cittadino regolarmente soggiornante o UE.',
      'Reddito del familiare garante sufficiente per il nucleo familiare.',
      'Idoneità dell\'alloggio dove risiederà il familiare.'
    ],
    duration: 'Pari alla durata del permesso del familiare garante',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Certificato di Parentela: Originale munito di traduzione e legalizzazione (se estero).',
      'Passaporto del Richiedente: Fotocopia di tutte le pagine scritte (dati, visti e timbri).',
      'Permesso di Soggiorno del Garante: Fotocopia fronte/retro in corso di validità.',
      'Idoneità Alloggiativa: Certificato originale rilasciato dal Comune o dall\'ASL competente.',
      'Reddito Garante: CUD/CU, Modello Redditi e ultime 3 buste paga del familiare che garantisce il mantenimento.',
      'Dichiarazione di Mantenimento: Modulo firmato dal garante che si impegna a sostenere le spese del familiare.',
      'Stato di Famiglia: Certificato o autocertificazione dello stato di famiglia attuale.'
    ],
    whereToApply: 'Sportello Unico Immigrazione (per il Nulla Osta) e successiva Busta Gialla (per il Permesso).'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const hasAnyUnreadNews = () => FAMILY_LAWS.some(law => isLawUnread(law.id, law.isNew));
