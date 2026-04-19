/**
 * InfoStranieri Bot - Fonti Governative Italiane
 * Lista completa di tutti i siti ufficiali da monitorare per novità legislative
 */

const SOURCES = [
  // ===== FONTI PRIMARIE DELLO STATO =====
  {
    id: 'gazzetta-ufficiale',
    name: 'Gazzetta Ufficiale',
    url: 'https://www.gazzettaufficiale.it/rss/SG',
    type: 'rss',
    description: 'Pubblicazione ufficiale di tutte le leggi italiane'
  },
  {
    id: 'normattiva',
    name: 'Normattiva',
    url: 'https://www.normattiva.it/ricerca/avanzata',
    type: 'html',
    searchTerms: ['straniero', 'immigrazione', 'soggiorno', 'asilo', 'rifugiato', 'cittadinanza'],
    description: 'Portale della legge vigente'
  },

  // ===== MINISTERI =====
  {
    id: 'ministero-interno',
    name: 'Ministero dell\'Interno',
    url: 'https://www.interno.gov.it/it/stampa-e-comunicazione/comunicati-stampa',
    rssUrl: 'https://www.interno.gov.it/it/feed/rss',
    type: 'rss',
    description: 'Comunicati su immigrazione, asilo, permessi'
  },
  {
    id: 'questure',
    name: 'Questura - Immigrazione',
    url: 'https://questure.poliziadistato.it/stranieri',
    type: 'html',
    description: 'Servizi Questura per stranieri'
  },
  {
    id: 'prefettura',
    name: 'Prefettura',
    url: 'https://www.prefettura.it/portale/index.htm',
    type: 'html',
    description: 'Comunicazioni Prefetture (test cittadinanza, ecc.)'
  },

  // ===== ENTI PREVIDENZIALI =====
  {
    id: 'inps',
    name: 'INPS - Circolari e Messaggi',
    url: 'https://servizi2.inps.it/servizi/CircMessStwords498/RSSfeed.aspx',
    type: 'rss',
    keywords: ['straniero', 'extracomunitario', 'permesso di soggiorno', 'assegno inclusione', 'invalidità', 'accompagnamento', 'naspi', 'disoccupazione'],
    description: 'Circolari INPS su prestazioni per stranieri'
  },
  {
    id: 'inail',
    name: 'INAIL - Circolari',
    url: 'https://www.inail.it/cs/internet/atti-e-documenti/circolari.html',
    type: 'html',
    keywords: ['lavoratore straniero', 'infortunio', 'malattia professionale'],
    description: 'Circolari INAIL per lavoratori stranieri'
  },

  // ===== AGENZIA DELLE ENTRATE =====
  {
    id: 'agenzia-entrate',
    name: 'Agenzia delle Entrate',
    url: 'https://www.agenziaentrate.gov.it/portale/web/guest/normativa-e-prassi/risoluzioni',
    type: 'html',
    keywords: ['codice fiscale', 'straniero', 'non residente', 'F24', 'dichiarazione redditi'],
    description: 'Risoluzioni e circolari fiscali per stranieri'
  },

  // ===== SITI SPECIALIZZATI IMMIGRAZIONE =====
  {
    id: 'meltingpot',
    name: 'Melting Pot Europa',
    url: 'https://www.meltingpot.org/feed/',
    type: 'rss',
    description: 'Notizie e analisi su immigrazione e asilo in Italia'
  },
  {
    id: 'immigrazione',
    name: 'Immigrazione.it',
    url: 'https://www.immigrazione.it/news/',
    type: 'html',
    description: 'Portale di riferimento per le notizie sull\'immigrazione'
  },
  {
    id: 'stranieriinitalia',
    name: 'Stranieri in Italia',
    url: 'https://www.stranieriinitalia.it/feed/',
    type: 'rss',
    description: 'News quotidiane su diritti e leggi per stranieri'
  },
  {
    id: 'asgi',
    name: 'ASGI - Associazione Studi Giuridici Immigrazione',
    url: 'https://www.asgi.it/feed/',
    type: 'rss',
    description: 'Analisi giuridiche di alto livello sull\'immigrazione'
  },

  // ===== PARLAMENTO =====
  {
    id: 'camera',
    name: 'Camera dei Deputati - Lavori',
    url: 'https://www.camera.it/leg19/1',
    type: 'html',
    keywords: ['immigrazione', 'straniero', 'asilo', 'protezione internazionale', 'decreto flussi'],
    description: 'Disegni di legge e proposte in discussione'
  },
  {
    id: 'senato',
    name: 'Senato della Repubblica',
    url: 'https://www.senato.it/leg/19/BGT/Schede/CtrlDDL.html',
    type: 'html',
    keywords: ['immigrazione', 'decreto flussi', 'permesso soggiorno'],
    description: 'DDL in discussione al Senato'
  }
];

module.exports = { SOURCES };
