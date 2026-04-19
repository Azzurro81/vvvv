export interface BonusCategory {
  id: string;
  name: string;
  icon: any;
}

export const BONUS_CATEGORIES: BonusCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
  { id: 'soldi', name: 'Soldi e Famiglia', icon: 'wallet-outline' },
  { id: 'spesa', name: 'Spesa e Bollette', icon: 'cart-outline' },
  { id: 'trasporti', name: 'Trasporti', icon: 'bus-outline' },
  { id: 'isee', name: 'ISEE', icon: 'calculator-outline' }
];

export interface BonusLaw {
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

export const BONUS_LAWS: BonusLaw[] = [
  // === SOLDI E FAMIGLIA ===
  {
    id: 'bonus-assegno-unico',
    categoryId: 'soldi',
    title: 'Assegno Unico Universale',
    lawReference: 'D.Lgs. 230/2021',
    description: 'Un contributo economico mensile per ogni figlio a carico, dal settimo mese di gravidanza fino ai 21 anni (senza limiti per figli disabili). L\'importo varia in base all\'ISEE: con ISEE basso si arriva fino a circa 190 € al mese per figlio.',
    requirements: [
      'Almeno 2 anni di residenza in Italia (anche non continuativi negli ultimi 5 anni), oppure un contratto di lavoro di almeno 6 mesi.',
      'Permesso di soggiorno per lungo soggiornanti, oppure permesso di almeno 6 mesi che autorizza a lavorare.',
      'Figli a carico (biologici, adottivi, affidati).',
      'ISEE aggiornato per ricevere l\'importo massimo (senza ISEE si riceve solo l\'importo minimo di circa 57 €).'
    ],
    duration: 'Mensile (erogazione automatica se l\'ISEE è aggiornato ogni anno)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Codice Fiscale di tutti i figli a carico.',
      'IBAN intestato al richiedente per l\'accredito.',
      'ISEE aggiornato (per ottenere l\'importo pieno).',
      'Permesso di soggiorno in corso di validità.'
    ],
    whereToApply: 'Sito web INPS (tramite SPID/CIE) oppure tramite Patronato/CAF gratuitamente.'
  },
  {
    id: 'bonus-adi',
    categoryId: 'soldi',
    title: 'Assegno di Inclusione (ADI)',
    lawReference: 'D.L. 48/2023 convertito Legge 85/2023',
    description: 'Sostegno economico per nuclei familiari con almeno un componente minorenne, disabile, ultra-sessantenne o in condizione di svantaggio certificato. Sostituisce il vecchio Reddito di Cittadinanza.',
    requirements: [
      'ISEE inferiore a 9.360 € annui.',
      'Residenza in Italia da almeno 5 anni, di cui gli ultimi 2 anni in modo continuativo.',
      'Permesso di soggiorno di lungo periodo o in corso di validità.',
      'Non possedere autoveicoli con cilindrata superiore a 1600cc immatricolati nei 36 mesi precedenti.',
      'Patrimonio immobiliare (esclusa prima casa) non superiore a 30.000 €.'
    ],
    duration: 'Massimo 18 mesi, rinnovabile per 12 mesi dopo 1 mese di sospensione',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'ISEE in corso di validità.',
      'Documento d\'identità e permesso di soggiorno.',
      'Dichiarazione di immediata disponibilità al lavoro (DID).',
      'Patto di Attivazione Digitale (PAD) firmato sul portale SIISL.'
    ],
    whereToApply: 'Portale INPS online (tramite SPID/CIE), oppure presso CAF e Patronati.'
  },
  {
    id: 'bonus-nido',
    categoryId: 'soldi',
    title: 'Bonus Asilo Nido',
    lawReference: 'Legge 232/2016 e successive modifiche',
    description: 'Rimborso delle rette pagate per la frequenza di asili nido pubblici o privati autorizzati, oppure per forme di assistenza domiciliare in caso di bambini con gravi patologie.',
    requirements: [
      'Genitore che sostiene il pagamento della retta del nido.',
      'Figlio nato o adottato, convivente con il richiedente.',
      'Iscrizione valida presso un asilo nido autorizzato.'
    ],
    duration: 'Fino a 3.600 € all\'anno con ISEE fino a 25.000 € (fino a 3.000 € con ISEE fino a 40.000 €)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Fatture o ricevute dei pagamenti mensili della retta.',
      'Certificato di iscrizione al nido firmato dalla struttura.',
      'ISEE minorenni aggiornato.',
      'Codice fiscale del minore.'
    ],
    whereToApply: 'Online sul portale INPS (sezione "Bonus Nido") tramite SPID, oppure tramite Patronato.'
  },

  // === SPESA E BOLLETTE ===
  {
    id: 'bonus-carta-dedicata',
    categoryId: 'spesa',
    title: 'Carta "Dedicata a Te"',
    lawReference: 'D.L. 48/2023 e Decreto interministeriale',
    description: 'Carta prepagata da 500 € annui che il Comune assegna automaticamente alle famiglie con ISEE basso. Serve per acquistare beni alimentari di prima necessità e carburante. Non si deve fare domanda: i beneficiari vengono selezionati dall\'INPS.',
    requirements: [
      'ISEE del nucleo familiare inferiore a 15.000 €.',
      'Nucleo composto da almeno 3 componenti (iscritti all\'anagrafe comunale).',
      'Nessun componente deve percepire ADI, NASpI, CIG, o altre indennità.',
      'Residenza nel Comune che distribuisce la carta.'
    ],
    duration: '500 € annui (caricati in un\'unica soluzione)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Nessuna domanda necessaria: l\'INPS seleziona i beneficiari in automatico in base all\'ISEE.',
      'Avere l\'ISEE aggiornato depositato (fondamentale).',
      'Documento d\'identità per il ritiro della carta presso l\'ufficio postale indicato dal Comune.'
    ],
    whereToApply: 'Assegnazione automatica dal Comune. Ritiro presso gli Uffici Postali comunicati dall\'ente locale.'
  },
  {
    id: 'bonus-bollette',
    categoryId: 'spesa',
    title: 'Bonus Sociale Bollette (Luce e Gas)',
    lawReference: 'D.L. 124/2019 e aggiornamenti ARERA',
    description: 'Sconto automatico sulle bollette di luce e gas per le famiglie con ISEE basso. Dal 2021 viene applicato direttamente in bolletta senza bisogno di fare domanda specifica: basta avere l\'ISEE valido.',
    requirements: [
      'ISEE del nucleo familiare non superiore a 9.530 € (fino a 20.000 € per famiglie numerose con almeno 4 figli).',
      'Avere un contratto di fornitura di energia elettrica e/o gas attivo.',
      'L\'ISEE deve essere aggiornato ogni anno per mantenere lo sconto.'
    ],
    duration: 'Sconto annuale automatico (rinnovabile con ISEE aggiornato)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'ISEE in corso di validità (lo sconto viene applicato automaticamente).',
      'Nessuna domanda aggiuntiva: il sistema incrocia i dati INPS con le utenze.'
    ],
    whereToApply: 'Automatico: basta presentare l\'ISEE presso un CAF. Lo sconto sarà applicato direttamente in bolletta dal fornitore.'
  },

  // === TRASPORTI ===
  {
    id: 'bonus-trasporti',
    categoryId: 'trasporti',
    title: 'Bonus Trasporti',
    lawReference: 'D.L. 5/2023 (se rinnovato per il 2026)',
    description: 'Contributo statale fino a 60 € per l\'acquisto di abbonamenti ai trasporti pubblici locali e regionali (autobus, metro, treno regionale). L\'importo copre una parte del costo dell\'abbonamento mensile o annuale.',
    requirements: [
      'Reddito personale complessivo non superiore a 20.000 € annui (non è l\'ISEE, ma il reddito individuale).',
      'Residenza in Italia.',
      'Non aver già usufruito del bonus nello stesso mese.'
    ],
    duration: 'Fino a 60 € una tantum (erogabile mensilmente finché i fondi sono disponibili)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'SPID o CIE per accedere al portale dedicato.',
      'Codice Fiscale.',
      'Dati dell\'abbonamento da acquistare (tipo, azienda di trasporto).'
    ],
    whereToApply: 'Portale bonustrasporti.lavoro.gov.it tramite SPID o CIE (quando i fondi vengono rifinanziati).'
  },

  // === ISEE ===
  {
    id: 'bonus-isee-guida',
    categoryId: 'isee',
    title: 'ISEE: Cos\'è e Perché è Fondamentale',
    lawReference: 'D.P.C.M. 159/2013',
    description: 'L\'Indicatore della Situazione Economica Equivalente (ISEE) è il documento indispensabile per accedere a quasi tutti i bonus, agevolazioni e servizi sociali in Italia. Senza ISEE, non si può richiedere l\'Assegno Unico, l\'ADI, il Bonus Nido, la mensa scolastica a tariffa ridotta e molti altri benefici.',
    requirements: [
      'Residenza in Italia.',
      'Codice Fiscale di TUTTI i componenti del nucleo familiare, compresi i minori.',
      'Documenti reddituali e patrimoniali dell\'anno precedente.'
    ],
    duration: 'Valido dal momento del rilascio fino al 31 dicembre dello stesso anno (va sempre rifatto a gennaio)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Documento d\'identità e Codice Fiscale di tutti i componenti del nucleo.',
      'Permesso di soggiorno in corso di validità.',
      'Contratto di affitto registrato (se in locazione).',
      'Saldo e Giacenza Media di TUTTI i conti correnti, postali e carte prepagate al 31/12 dell\'anno precedente (da richiedere alla propria banca/posta).',
      'Certificazione Unica (CU) o Modello 730/Redditi dell\'anno precedente.',
      'Targa di tutti i veicoli (auto e moto) di proprietà del nucleo.',
      'Documentazione di eventuali altri patrimoni (titoli di stato, azioni, fondi, ecc.).'
    ],
    whereToApply: 'CAF (Centro di Assistenza Fiscale) → servizio GRATUITO. In alternativa, online sul sito INPS tramite SPID/CIE (sezione "ISEE precompilato").'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const categoryHasUnreadNews = (categoryId: string) => {
  if (categoryId === 'novita') return hasAnyUnreadNews();
  return BONUS_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
};

export const hasAnyUnreadNews = () => BONUS_LAWS.some(law => isLawUnread(law.id, law.isNew));
