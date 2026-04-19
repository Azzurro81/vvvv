/**
 * InfoStranieri Bot - Scraper Principale
 * 
 * Fa il giro di tutti i siti dello Stato italiano e dei portali legali,
 * trova le novità legislative per gli stranieri,
 * le classifica automaticamente e le inserisce nell'app.
 * 
 * USO:
 *   node bot/scraper.js           → Esegue una scansione completa
 *   node bot/scraper.js --watch   → Resta in ascolto e controlla ogni 30 minuti
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { SOURCES } = require('./sources');
const { classifyLaw, isRelevantForStranieri } = require('./classifier');

// ===== CONFIGURAZIONE =====
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // Ogni 24 ore
const DATA_DIR = path.join(__dirname, '..', 'constants');
const LOG_FILE = path.join(__dirname, 'bot_log.json');
const SEEN_FILE = path.join(__dirname, 'seen_articles.json');

// ===== UTILITY =====

/** Fetch URL e ritorna il contenuto come stringa */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { 
      headers: { 
        'User-Agent': 'InfoStranieri-Bot/1.0 (Legal News Aggregator)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      // Segui i redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

/** Parsing semplice di un feed RSS (senza dipendenze esterne) */
function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');

    if (title) {
      items.push({
        title: cleanHtml(title),
        link: link || '',
        description: cleanHtml(description || ''),
        pubDate: pubDate || new Date().toISOString()
      });
    }
  }

  return items;
}

/** Estrae il contenuto di un tag XML */
function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

/** Rimuove tag HTML da una stringa */
function cleanHtml(str) {
  return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();
}

/** Carica gli articoli già visti (per evitare duplicati) */
function loadSeenArticles() {
  try {
    return JSON.parse(fs.readFileSync(SEEN_FILE, 'utf8'));
  } catch {
    return {};
  }
}

/** Salva gli articoli visti */
function saveSeenArticles(seen) {
  fs.writeFileSync(SEEN_FILE, JSON.stringify(seen, null, 2), 'utf8');
}

/** Genera un ID unico per un articolo */
function articleId(source, title) {
  return `${source}-${title.substring(0, 80).replace(/[^a-zA-Z0-9]/g, '_')}`;
}

// ===== SCRAPING =====

/** Scarica e analizza un singolo feed RSS */
async function scrapeRSSSource(source) {
  try {
    const url = source.rssUrl || source.url;
    console.log(`  📡 Scaricando ${source.name}...`);
    const xml = await fetchUrl(url);
    const items = parseRSS(xml);
    console.log(`  ✅ Trovati ${items.length} articoli da ${source.name}`);
    return items.map(item => ({ ...item, sourceId: source.id, sourceName: source.name }));
  } catch (err) {
    console.log(`  ⚠️  Errore su ${source.name}: ${err.message}`);
    return [];
  }
}

/** Scarica e analizza un sito HTML (cerca titoli e link) */
async function scrapeHTMLSource(source) {
  try {
    console.log(`  🌐 Scaricando ${source.name}...`);
    const html = await fetchUrl(source.url);
    
    // Estrae tutti i link con titolo dalla pagina
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi;
    const items = [];
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      const title = cleanHtml(match[2]);
      
      // Filtra solo link rilevanti (se ci sono keyword specifiche per la fonte)
      if (title.length > 15 && source.keywords) {
        const isRelevant = source.keywords.some(kw => title.toLowerCase().includes(kw));
        if (isRelevant) {
          items.push({
            title,
            link: link.startsWith('http') ? link : `${new URL(source.url).origin}${link}`,
            description: title,
            pubDate: new Date().toISOString(),
            sourceId: source.id,
            sourceName: source.name
          });
        }
      } else if (title.length > 15 && !source.keywords) {
        items.push({
          title,
          link: link.startsWith('http') ? link : `${new URL(source.url).origin}${link}`,
          description: title,
          pubDate: new Date().toISOString(),
          sourceId: source.id,
          sourceName: source.name
        });
      }
    }

    console.log(`  ✅ Trovati ${items.length} link rilevanti da ${source.name}`);
    return items.slice(0, 20); // Max 20 per fonte
  } catch (err) {
    console.log(`  ⚠️  Errore su ${source.name}: ${err.message}`);
    return [];
  }
}

// ===== INSERIMENTO NELL'APP =====

/** Genera un nuovo oggetto legge per l'app */
function createLawEntry(article, classification) {
  const today = new Date().toISOString().split('T')[0];
  const idPrefix = classification.moduleId.substring(0, 3);
  const idSuffix = Date.now().toString(36);

  return {
    id: `${idPrefix}-bot-${idSuffix}`,
    categoryId: classification.subcategoryId,
    title: article.title.substring(0, 80),
    lawReference: `Fonte: ${article.sourceName}`,
    description: article.description.substring(0, 300),
    requirements: ['Vedi dettagli nella fonte originale.'],
    duration: 'Aggiornamento automatico',
    isNew: true,
    dateAdded: today,
    documentsNeeded: ['Consultare la fonte ufficiale per la lista documenti.'],
    whereToApply: article.link || 'Consultare il sito ufficiale.',
    _botMeta: {
      sourceUrl: article.link,
      sourceName: article.sourceName,
      fetchedAt: new Date().toISOString(),
      confidence: classification.confidence,
      autoClassified: true
    }
  };
}

/** Scrive la nuova legge nel file TypeScript corretto */
function appendLawToModule(law, moduleId) {
  const moduleFiles = {
    asilo: 'asylum_laws.ts',
    permesso: 'residence_laws.ts',
    carta: 'long_term_laws.ts',
    cittadinanza: 'citizenship_laws.ts',
    famiglia: 'family_laws.ts',
    lavoro: 'work_laws.ts',
    disabili: 'disabled_laws.ts'
  };

  const fileName = moduleFiles[moduleId];
  if (!fileName) {
    console.log(`  ❌ Modulo sconosciuto: ${moduleId}`);
    return false;
  }

  const filePath = path.join(DATA_DIR, fileName);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Trova l'array delle leggi e inserisce la nuova legge prima della chiusura "];"
    // Cerca il pattern: ultimo "}" prima di "];" nell'array LAWS
    const lawEntry = JSON.stringify(law, null, 4)
      .replace(/"([^"]+)":/g, "$1:")  // Rimuovi le virgolette dalle chiavi
      .replace(/"/g, "'");            // Singoli apici per TypeScript
    
    // Trova la posizione giusta per inserire (gestisce formati diversi)
    const arrayEndRegex = /\n\];\ *\n\ *\n\ *(\/\/.*\n\ *)?const readLaws/;
    const match = content.match(arrayEndRegex);
    
    if (match) {
      const insertPos = content.indexOf(match[0]);
      const commentLine = match[1] ? `\n${match[1].trim()}\n` : '\n\n';
      const newContent = content.substring(0, insertPos) + 
        `,\n  ${lawEntry}\n];${commentLine}const readLaws` + 
        content.substring(insertPos + match[0].length);
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  📝 Legge inserita in ${fileName} > ${law.categoryId}`);
      return true;
    } else {
      console.log(`  ⚠️  Struttura file non riconosciuta: ${fileName}`);
      return false;
    }
  } catch (err) {
    console.log(`  ❌ Errore scrittura ${fileName}: ${err.message}`);
    return false;
  }
}

// ===== CICLO PRINCIPALE =====

async function runScan() {
  console.log('\n' + '='.repeat(60));
  console.log(`🤖 InfoStranieri Bot - Scansione ${new Date().toLocaleString('it-IT')}`);
  console.log('='.repeat(60));

  const seen = loadSeenArticles();
  const allArticles = [];
  let newLawsAdded = 0;

  // 1. Scarica da tutte le fonti
  console.log('\n📥 FASE 1: Scaricamento fonti...\n');
  for (const source of SOURCES) {
    let articles;
    if (source.type === 'rss') {
      articles = await scrapeRSSSource(source);
    } else {
      articles = await scrapeHTMLSource(source);
    }
    allArticles.push(...articles);
  }

  console.log(`\n📊 Totale articoli trovati: ${allArticles.length}`);

  // 2. Filtra solo quelli nuovi e rilevanti per stranieri
  console.log('\n🔍 FASE 2: Filtraggio e classificazione...\n');
  const newArticles = allArticles.filter(a => {
    const id = articleId(a.sourceId, a.title);
    return !seen[id];
  });

  console.log(`  Nuovi (non già visti): ${newArticles.length}`);

  const relevantArticles = newArticles.filter(a => 
    isRelevantForStranieri(a.title, a.description)
  );

  console.log(`  Rilevanti per stranieri: ${relevantArticles.length}`);

  // 3. Classifica e inserisci
  console.log('\n📂 FASE 3: Classificazione e inserimento...\n');
  for (const article of relevantArticles) {
    const classification = classifyLaw(article.title, article.description);
    
    if (classification.moduleId) {
      console.log(`\n  📰 "${article.title.substring(0, 60)}..."`);
      console.log(`     → ${classification.reason}`);
      
      // Crea e inserisci la legge solo se la confidenza è alta
      if (classification.confidence >= 60) {
        const law = createLawEntry(article, classification);
        const success = appendLawToModule(law, classification.moduleId);
        if (success) newLawsAdded++;
      } else {
        console.log(`     ⏭️  Skippato: confidenza troppo bassa (${classification.confidence}%)`);
      }
    }

    // Segna come visto
    const id = articleId(article.sourceId, article.title);
    seen[id] = { title: article.title, date: new Date().toISOString(), module: classification.moduleId };
  }

  // 4. Salva lo stato
  saveSeenArticles(seen);

  // 5. Log finale
  const logEntry = {
    timestamp: new Date().toISOString(),
    totalArticles: allArticles.length,
    newArticles: newArticles.length,
    relevantArticles: relevantArticles.length,
    lawsAdded: newLawsAdded
  };

  let logs = [];
  try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch {}
  logs.push(logEntry);
  if (logs.length > 100) logs = logs.slice(-100); // Tieni solo gli ultimi 100
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Scansione completata!`);
  console.log(`   📰 Articoli trovati: ${allArticles.length}`);
  console.log(`   🆕 Nuovi: ${newArticles.length}`);
  console.log(`   🎯 Rilevanti: ${relevantArticles.length}`);
  console.log(`   📝 Leggi aggiunte all'app: ${newLawsAdded}`);
  console.log('='.repeat(60) + '\n');

  return logEntry;
}

// ===== AVVIO =====

const isWatch = process.argv.includes('--watch');

if (isWatch) {
  console.log('🔄 Modalità WATCH attiva - Controllo ogni 30 minuti');
  console.log('   Premi Ctrl+C per fermare.\n');
  
  // Prima scansione immediata
  runScan().then(() => {
    // Poi ogni 30 minuti
    setInterval(runScan, CHECK_INTERVAL_MS);
  });
} else {
  // Scansione singola
  runScan().catch(err => {
    console.error('❌ Errore fatale:', err.message);
    process.exit(1);
  });
}
