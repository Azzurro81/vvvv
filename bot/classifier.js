/**
 * InfoStranieri Bot - Classificatore Automatico
 * Analizza il testo di una notizia/legge e decide in quale cartella dell'app metterla.
 * Usa un sistema di punteggi basato su parole chiave per massima precisione.
 */

// Dizionario di parole chiave per ogni modulo dell'app
// Ogni parola ha un peso (score): più è alto, più è specifica per quel modulo
const CATEGORY_KEYWORDS = {
  asilo: {
    moduleId: 'asilo',
    moduleName: 'Asilo e Protezione Internazionale',
    subcategories: {
      politico: ['rifugiato', 'persecuzione', 'ginevra', 'status rifugiato', 'asilo politico'],
      sussidiaria: ['protezione sussidiaria', 'conflitto armato', 'danno grave', 'violenza indiscriminata'],
      speciale: ['protezione speciale', 'inespellibilità', 'cutro', 'decreto cutro', 'cure mediche'],
      costituzionale: ['art. 10', 'costituzione', 'libertà democratiche', 'asilo costituzionale'],
      procedura: ['commissione territoriale', 'audizione', 'c3', 'modello c3', 'dublino', 'eurodac', 'ricorso', 'diniego']
    },
    keywords: [
      { term: 'asilo', score: 10 },
      { term: 'rifugiato', score: 15 },
      { term: 'protezione internazionale', score: 20 },
      { term: 'protezione sussidiaria', score: 18 },
      { term: 'protezione speciale', score: 18 },
      { term: 'richiedente asilo', score: 20 },
      { term: 'commissione territoriale', score: 15 },
      { term: 'status di rifugiato', score: 20 },
      { term: 'accoglienza', score: 8 },
      { term: 'dublino', score: 12 },
      { term: 'eurodac', score: 15 },
      { term: 'rimpatrio', score: 6 },
      { term: 'diniego', score: 10 },
      { term: 'audizione', score: 10 },
      { term: 'modello c3', score: 18 },
      { term: 'persecuzione', score: 12 },
      { term: 'conflitto armato', score: 12 },
      { term: 'decreto cutro', score: 15 },
    ]
  },

  permesso: {
    moduleId: 'permesso',
    moduleName: 'Permesso di Soggiorno',
    subcategories: {
      rinnovo: ['rinnovo', 'kit giallo', 'kit postale', 'sportello amico', 'scadenza permesso', 'proroga'],
      duplicato: ['smarrimento', 'furto', 'duplicato', 'deteriorato', 'sostituzione']
    },
    keywords: [
      { term: 'permesso di soggiorno', score: 20 },
      { term: 'rinnovo permesso', score: 18 },
      { term: 'kit giallo', score: 15 },
      { term: 'kit postale', score: 15 },
      { term: 'sportello amico', score: 12 },
      { term: 'questura', score: 6 },
      { term: 'cedolino', score: 10 },
      { term: 'attesa occupazione', score: 14 },
      { term: 'conversione permesso', score: 16 },
      { term: 'decreto flussi', score: 8 },
      { term: 'nulla osta', score: 10 },
      { term: 'visto d\'ingresso', score: 8 },
      { term: 'ricevuta postale', score: 10 },
    ]
  },

  carta: {
    moduleId: 'carta',
    moduleName: 'Carta di Soggiorno (Lungo Periodo)',
    subcategories: {
      'requisiti-base': ['requisiti', 'lungo periodo', 'indeterminato', 'cinque anni', '5 anni'],
      esenzioni: ['esenzione', 'test lingua', 'a2', 'cpia', 'diploma', 'disabilità'],
      mantenimento: ['revoca', 'mantenimento', 'decadenza', 'annullamento']
    },
    keywords: [
      { term: 'carta di soggiorno', score: 20 },
      { term: 'soggiornante di lungo periodo', score: 20 },
      { term: 'lungo periodo', score: 15 },
      { term: 'permesso ce', score: 18 },
      { term: 'test lingua italiana', score: 14 },
      { term: 'livello a2', score: 12 },
      { term: 'tempo indeterminato', score: 10 },
      { term: 'assegno sociale', score: 8 },
      { term: 'idoneità alloggiativa', score: 10 },
      { term: 'casellario giudiziale', score: 6 },
    ]
  },

  cittadinanza: {
    moduleId: 'cittadinanza',
    moduleName: 'Cittadinanza Italiana',
    subcategories: {
      residenza: ['residenza', '10 anni', 'naturalizzazione', 'reddito', 'b1'],
      matrimonio: ['matrimonio', 'coniuge', 'unione civile'],
      'iure-sanguinis': ['iure sanguinis', 'discendenza', 'avo italiano', 'antenato']
    },
    keywords: [
      { term: 'cittadinanza italiana', score: 20 },
      { term: 'cittadinanza per residenza', score: 18 },
      { term: 'cittadinanza per matrimonio', score: 18 },
      { term: 'iure sanguinis', score: 20 },
      { term: 'giuramento', score: 10 },
      { term: 'naturalizzazione', score: 15 },
      { term: 'decreto di concessione', score: 14 },
      { term: 'livello b1', score: 10 },
      { term: 'prefettura', score: 4 },
      { term: 'k10', score: 12 },
      { term: 'portale alk', score: 12 },
    ]
  },

  famiglia: {
    moduleId: 'famiglia',
    moduleName: 'Famiglia e Ricongiungimento',
    subcategories: {
      ricongiungimento: ['ricongiungimento', 'familiare', 'nulla osta', 'visto familiare'],
      coesione: ['coesione familiare', 'coesione', 'familiare già presente'],
      minori: ['minore', 'tutore', 'affidamento', 'minore straniero non accompagnato', 'msna']
    },
    keywords: [
      { term: 'ricongiungimento familiare', score: 20 },
      { term: 'coesione familiare', score: 18 },
      { term: 'familiare straniero', score: 14 },
      { term: 'minore straniero', score: 16 },
      { term: 'msna', score: 18 },
      { term: 'nulla osta familiare', score: 16 },
      { term: 'visto per famiglia', score: 14 },
      { term: 'idoneità alloggiativa', score: 8 },
      { term: 'reddito familiare', score: 8 },
      { term: 'tutore', score: 10 },
    ]
  },

  lavoro: {
    moduleId: 'lavoro',
    moduleName: 'Lavoro e Occupazione',
    subcategories: {
      flussi: ['decreto flussi', 'flussi', 'quote', 'click day', 'stagionale'],
      subordinato: ['lavoro subordinato', 'contratto di lavoro', 'assunzione', 'licenziamento', 'naspi'],
      autonomo: ['lavoro autonomo', 'partita iva', 'imprenditore', 'start-up']
    },
    keywords: [
      { term: 'decreto flussi', score: 18 },
      { term: 'lavoro subordinato', score: 16 },
      { term: 'lavoro autonomo', score: 16 },
      { term: 'click day', score: 15 },
      { term: 'quote flussi', score: 16 },
      { term: 'nulla osta lavoro', score: 14 },
      { term: 'contratto di soggiorno', score: 12 },
      { term: 'lavoratore straniero', score: 18 },
      { term: 'stagionale', score: 10 },
      { term: 'sanatoria', score: 10 },
      { term: 'emersione', score: 10 },
    ]
  },

  disabili: {
    moduleId: 'disabili',
    moduleName: 'Disabili e Accessibilità',
    subcategories: {
      invalidita: ['invalidità', 'accompagnamento', 'legge 104', 'handicap', 'disabilità grave'],
      agevolazioni: ['agevolazione', 'contrassegno', 'esenzione ticket', 'iva agevolata', 'bonus']
    },
    keywords: [
      { term: 'invalidità civile', score: 20 },
      { term: 'indennità di accompagnamento', score: 18 },
      { term: 'legge 104', score: 16 },
      { term: 'handicap', score: 14 },
      { term: 'disabilità', score: 14 },
      { term: 'contrassegno disabili', score: 16 },
      { term: 'assegno di inclusione', score: 12 },
      { term: 'esenzione ticket', score: 10 },
      { term: 'barriere architettoniche', score: 10 },
      { term: 'inps invalidità', score: 14 },
    ]
  }
};

/**
 * Classifica un testo nella categoria dell'app più appropriata.
 * @param {string} title - Titolo della notizia/legge
 * @param {string} body - Corpo del testo
 * @returns {{ moduleId: string, subcategoryId: string, confidence: number, scores: object }}
 */
function classifyLaw(title, body) {
  const fullText = `${title} ${body}`.toLowerCase();
  const scores = {};

  // Calcola il punteggio per ogni modulo
  for (const [moduleKey, moduleData] of Object.entries(CATEGORY_KEYWORDS)) {
    let totalScore = 0;

    for (const kw of moduleData.keywords) {
      // Conta quante volte appare la keyword nel testo
      const regex = new RegExp(kw.term.toLowerCase(), 'gi');
      const matches = fullText.match(regex);
      if (matches) {
        // Punteggio = peso keyword * numero occorrenze (max 3 per evitare spam)
        totalScore += kw.score * Math.min(matches.length, 3);
        
        // Bonus se la keyword è nel TITOLO (più rilevante)
        if (title.toLowerCase().includes(kw.term.toLowerCase())) {
          totalScore += kw.score * 2;
        }
      }
    }

    scores[moduleKey] = totalScore;
  }

  // Trova il modulo con il punteggio più alto
  const bestModule = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const [moduleId, topScore] = bestModule;

  // Se il punteggio è troppo basso, è probabilmente irrilevante
  if (topScore < 10) {
    return { moduleId: null, subcategoryId: null, confidence: 0, scores, reason: 'Punteggio troppo basso - notizia non rilevante per stranieri' };
  }

  // Trova la sotto-categoria più adatta
  const moduleData = CATEGORY_KEYWORDS[moduleId];
  let bestSubcat = Object.keys(moduleData.subcategories)[0]; // Default: prima sottocategoria
  let bestSubcatScore = 0;

  for (const [subcatId, subcatKeywords] of Object.entries(moduleData.subcategories)) {
    let subcatScore = 0;
    for (const term of subcatKeywords) {
      if (fullText.includes(term.toLowerCase())) {
        subcatScore += 5;
        if (title.toLowerCase().includes(term.toLowerCase())) {
          subcatScore += 10;
        }
      }
    }
    if (subcatScore > bestSubcatScore) {
      bestSubcatScore = subcatScore;
      bestSubcat = subcatId;
    }
  }

  // Calcola la confidenza (0-100%)
  const secondBest = Object.entries(scores).sort((a, b) => b[1] - a[1])[1];
  const confidence = secondBest ? Math.min(100, Math.round((topScore / (topScore + secondBest[1])) * 100)) : 100;

  return {
    moduleId,
    moduleName: moduleData.moduleName,
    subcategoryId: bestSubcat,
    confidence,
    topScore,
    scores,
    reason: `Classificato in "${moduleData.moduleName}" > "${bestSubcat}" con confidenza ${confidence}%`
  };
}

/**
 * Filtro rapido: controlla se un testo riguarda gli stranieri in Italia
 */
function isRelevantForStranieri(title, body) {
  const fullText = `${title} ${body}`.toLowerCase();
  const relevanceKeywords = [
    'straniero', 'stranieri', 'immigrazione', 'immigrato',
    'extracomunitario', 'soggiorno', 'asilo', 'rifugiato',
    'cittadinanza', 'ricongiungimento', 'espulsione', 'rimpatrio',
    'protezione internazionale', 'permesso', 'visto',
    'testo unico immigrazione', 'd.lgs. 286', 'decreto flussi',
    'lavoratore straniero', 'minore non accompagnato'
  ];

  return relevanceKeywords.some(kw => fullText.includes(kw));
}

module.exports = { classifyLaw, isRelevantForStranieri, CATEGORY_KEYWORDS };
