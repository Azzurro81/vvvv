export interface ResidenceCategory {
  id: string;
  name: string;
  icon: any;
}

export const RESIDENCE_CATEGORIES: ResidenceCategory[] = [
  { id: 'rinnovo', name: 'Rinnovo', icon: 'refresh-outline' },
  { id: 'aggiornamento', name: 'Aggiornamento', icon: 'create-outline' },
  { id: 'duplicato', name: 'Smarrimento/Duplicato', icon: 'copy-outline' }
];

export interface ResidenceLaw {
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

export const RESIDENCE_LAWS: ResidenceLaw[] = [
  {
    id: 'res-rin-1',
    categoryId: 'rinnovo',
    title: 'Documenti Rinnovo Lavoro',
    lawReference: 'D.Lgs. 286/98 e succ. mod.',
    description: 'Guida passo-passo alla preparazione dei documenti da inserire nel Kit Giallo per il rinnovo del permesso di soggiorno per motivi di lavoro subordinato.',
    requirements: [
      'Domanda presentata tra i 60 giorni prima e i 60 giorni dopo la scadenza.',
      'Possesso di un contratto di lavoro attivo al momento della richiesta.',
      'Residenza o domicilio nel comune di competenza della Questura.'
    ],
    duration: 'Ricevuta Poste (assicura la regolarità del soggiorno)',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Passaporto: Fotocopia di TUTTE le pagine scritte (dati, visti e timbri). NON fotocopiare le pagine bianche.',
      'Permesso di Soggiorno: Fotocopia fronte e retro del permesso in scadenza.',
      'Codice Fiscale: Fotocopia della tessera sanitaria o attribuzione AdE.',
      'Modello UNILAV: Copia della comunicazione di assunzione aggiornata.',
      'Reddito: Ultime 3 buste paga e ultima Certificazione Unica (CU/CUD).',
      'Alloggio: Contratto di affitto registrato o Dichiarazione di Ospitalità con cessione fabbricato.',
      'Marca da Bollo: Una marca da bollo da € 16,00 da applicare sul Modulo 1.',
      'Bollettino Postale: Versamento di € 30,46 (per 1 anno) o € 40,46 (per 2 anni) o € 50,46 (per 2+ anni).'
    ],
    whereToApply: 'Uffici Postali abilitati "Sportello Amico" tramite spedizione Kit Giallo.'
  },
  {
    id: 'res-rin-2',
    categoryId: 'rinnovo',
    title: 'Documenti Rinnovo Senza Lavoro',
    lawReference: 'Art. 22 comma 11 T.U. Immigrazione',
    description: 'Guida specifica per chi ha perso il lavoro e deve richiedere il permesso per "Attesa Occupazione".',
    requirements: [
      'Perdita del posto di lavoro (licenziamento o dimissioni).',
      'Iscrizione immediata al Centro per l\'Impiego.',
      'Disponibilità di mezzi di sostentamento (NASPI o risparmi).'
    ],
    duration: '1 Anno (Non rinnovabile per lo stesso motivo)',
    isNew: true,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Certificato del Centro per l\'Impiego: Iscrizione aggiornata e rilascio della DID (Dichiarazione di Immediata Disponibilità).',
      'Passaporto: Fotocopia di tutte le pagine scritte.',
      'Permesso di Soggiorno: Fotocopia del permesso scaduto o in scadenza.',
      'Documentazione NASPI: Se percepita, inserire la prova del beneficio INPS.',
      'Sostentamento: Se non si ha NASPI, dichiarazione di mantenimento dei familiari o estratto conto bankario.',
      'Alloggio: Contratto di affitto o Dichiarazione di Ospitalità.',
      'Kit Giallo: Compilazione Modulo 1 (Sezione per Attesa Occupazione).'
    ],
    whereToApply: 'Spedizione Kit Giallo presso Poste Italiane.'
  },
  {
    id: 'res-dup-1',
    categoryId: 'duplicato',
    title: 'Duplicato per Smarrimento o Furto',
    lawReference: 'D.P.R. 394/99',
    description: 'Procedura da seguire in caso di perdita, furto o danneggiamento del permesso di soggiorno.',
    requirements: [
      'Denuncia presentata presso Polizia o Carabinieri entro 48 ore.',
      'Permesso originale smarrito o rubato (o deteriorato da sostituire).'
    ],
    duration: 'Pari alla scadenza del permesso originale',
    isNew: false,
    dateAdded: '2026-04-12',
    documentsNeeded: [
      'Denuncia di Smarrimento/Furto: Fotocopia dell\'originale presentato alle autorità.',
      'Passaporto: Fotocopia delle pagine dei dati personali.',
      'Codice Fiscale: Fotocopia fronte/retro.',
      'Marca da Bollo: € 16,00.',
      'Bollettino Postale: € 30,46 per l\'emissione del nuovo permesso elettronico.',
      '4 Fototessere: Da portare in Questura al momento dell\'appuntamento.'
    ],
    whereToApply: 'Spedizione Kit Giallo (Sportello Amico) specifica per "Duplicato".'
  }
];

const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const hasAnyUnreadNews = () => RESIDENCE_LAWS.some(law => isLawUnread(law.id, law.isNew));
