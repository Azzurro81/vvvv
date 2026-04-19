export interface SanitaCategory {
  id: string;
  name: string;
  icon: any;
}

export const SANITA_CATEGORIES: SanitaCategory[] = [
  { id: 'novita', name: 'Novità', icon: 'megaphone-outline' },
  { id: 'tessera', name: 'Tessera Sanitaria', icon: 'medical-outline' },
  { id: 'medico', name: 'Medico di Base', icon: 'person-add-outline' },
  { id: 'emergenza', name: 'Emergenze e Guardia', icon: 'flash-outline' },
  { id: 'stp', name: 'Codice STP', icon: 'bandage-outline' }
];

export interface SanitaLaw {
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

export const SANITA_LAWS: SanitaLaw[] = [
  {
    id: 'tes-1',
    categoryId: 'tessera',
    title: 'Richiesta Tessera Sanitaria',
    lawReference: 'Art. 34 e 35 T.U. Immigrazione',
    description: 'La Tessera Sanitaria è necessaria per accedere alle cure e avere un medico. Per gli stranieri regolari l\'iscrizione al Servizio Sanitario Nazionale (SSN) è obbligatoria e gratuita.',
    requirements: [
      'Essere regolarmente residenti o soggiornanti in Italia.',
      'Avere un contratto di lavoro o essere familiari a carico o essere iscritti alle liste di collocamento.'
    ],
    duration: 'Uguale alla durata del permesso di soggiorno',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Permesso di soggiorno valido (o ricevute Poste).',
      'Codice Fiscale.',
      'Certificato di residenza o dichiarazione di ospitalità.'
    ],
    whereToApply: 'ASL (Azienda Sanitaria Locale) del proprio comune di residenza/domicilio.'
  },
  {
    id: 'med-1',
    categoryId: 'medico',
    title: 'Scegliere il Medico di Base',
    lawReference: 'L. 833/1978',
    description: 'Il Medico di Medicina Generale (MMG) è il punto di riferimento per visite, ricette, certificati e invio a specialisti.',
    requirements: [
      'Essere describes al SSN (avere la Tessera Sanitaria).'
    ],
    duration: 'Finché non si decide di cambiarlo o scade il permesso',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Tessera Sanitaria.',
      'Documento d\'identità.'
    ],
    whereToApply: 'Sportelli Scelta e Revoca dell\'ASL o tramite il Portale Salute della Regione.'
  },
  {
    id: 'eme-1',
    categoryId: 'emergenza',
    title: 'Guardia Medica e Pronto Soccorso',
    lawReference: 'D.P.R. 484/1996',
    description: 'Capire quando andare in ospedale e quando chiamare il medico sostitutivo per evitare lunghe attese e costi aggiuntivi.',
    requirements: [
      'Stato di bisogno sanitario urgente (per il PS) o assistenza medica fuori orario (per la Guardia).'
    ],
    duration: 'Nazionale',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Tessera Sanitaria (se posseduta).',
      'Documento d\'identità.'
    ],
    whereToApply: 'Pronto Soccorso (solo per urgenze gravi); Guardia Medica (Continuità Assistenziale) per casi non urgenti di notte o nei festivi.'
  },
  {
    id: 'stp-1',
    categoryId: 'stp',
    title: 'Il Codice STP (Straniero Temporaneamente Presente)',
    lawReference: 'D.Lgs. 286/98 Art. 35',
    description: 'Garantisce l\'assistenza sanitaria urgente o essenziale anche a chi non è in regola con il permesso di soggiorno.',
    requirements: [
      'Essere cittadini extracomunitari non in regola con le norme di ingresso e soggiorno.'
    ],
    duration: '6 mesi (Rinnovabile)',
    isNew: true,
    dateAdded: '2026-04-15',
    documentsNeeded: [
      'Nessun documento d\'identità obbligatorio (si può fare anche in regime di anonimato dichiarando le proprie generalità).'
    ],
    whereToApply: 'Sedi ASL, Poliambulatori o Pronto Soccorso.'
  }
];

// Mock In-Memory DB
const readLaws = new Set<string>();
export const isLawUnread = (id: string, isNew: boolean) => !readLaws.has(id) && isNew;
export const markLawAsRead = (id: string) => readLaws.add(id);
export const categoryHasUnreadNews = (categoryId: string) => 
  SANITA_LAWS.some(law => law.categoryId === categoryId && isLawUnread(law.id, law.isNew));
export const hasAnyUnreadNews = () => SANITA_LAWS.some(law => isLawUnread(law.id, law.isNew));
