export interface KitGuide {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  videoUrl: string;
  pdfUrl: string;
  duration: string;
  isNew: boolean;
  dateAdded: string;
  instructions: string[];
}

export const KIT_GUIDES: KitGuide[] = [
  {
    id: 'kit-lavoro-1',
    categoryId: 'lavoro',
    title: 'Kit Permesso di Soggiorno Lavoro',
    description: 'Questa guida completa ti mostra passo per passo come compilare correttamente il Modulo 1 e il Modulo 2 del Kit Giallo (Busta con banda gialla) per il rilascio o rinnovo del permesso di soggiorno per motivi di lavoro subordinato.',
    videoUrl: 'https://example.com/video-placeholder.mp4',
    pdfUrl: 'https://example.com/guida-compilazione.pdf',
    duration: '15 Minuti',
    isNew: true,
    dateAdded: '2026-04-15',
    instructions: [
      'MARCA DA BOLLO: Prima di iniziare, acquista una Marca da Bollo da 16,00€ in tabaccheria e applicala in alto sul Modulo 1.',
      'COMPILAZIONE KIT: Usa penna nera e scrivi rigorosamente in STAMPATELLO. Compila il Modulo 1 (Dati Anagrafici) e il Modulo 2 (Dati sul Reddito/Lavoro).',
      'DOCUMENTI IDENTITÀ: Inserisci le Fotocopie di tutto il passaporto (solo la pagina dati e le pagine provviste di visti/timbri) e la Fotocopia del permesso in scadenza.',
      'DOCUMENTI LAVORO: Allega le Fotocopie del Contratto di Lavoro/Soggiorno, l\'ultimo Modello UNILAV (comunicazione di assunzione), ultime 3 Buste Paga e ultima Certificazione Unica (ex CUD).',
      'DOCUMENTI CASA / ALLOGGIO: Allega la Fotocopia del Contratto di Affitto registrato (oppure Dichiarazione di Ospitalità o Cessione di Fabbricato). Attenzione: alcune Questure richiedono anche il Certificato di Residenza e il Certificato di Idoneità Alloggiativa rilasciato dal Comune.',
      'SPEDIZIONE POSTA E COSTI: Porta il Kit APERTO allo Sportello Amico di Poste Italiane. Costi da sostenere: € 30,00 (spese postali/raccomandata) + € 30,46 (Bollettino stampa Permesso Elettronico) + € 40,00 (Contributo statale 1 anno) o € 50,00 (Contributo statale 2 anni). Totale approssimativo in posta: 100,46€ - 110,46€.',
      'SPEDIZIONE POSTA (RICEVUTA): L\'impiegato postale verificherà passaporto e permesso originali, poi ti consegnerà assieme alla Ricevuta un foglio di convocazione con la data per le impronte in Questura. Conservali gelosamente.',
      'APPUNTAMENTO IMPRONTE (in Questura): Devi presentarti con il Passaporto ORIGINALE, il Permesso di Soggiorno ORIGINALE, la Ricevuta delle Poste e la lettera di convocazione.',
      'APPUNTAMENTO IMPRONTE (Foto): OBBLIGATORIO portare 4 Fototessere identiche, recentissime (max 6 mesi), a colori su sfondo bianco.',
      'APPUNTAMENTO IMPRONTE (Aggiornamenti): Porta in visione anche gli originali (e relative copie) degli ultimi contratti o buste paga maturate dopo la spedizione del kit, nel caso la Questura chieda un aggiornamento lavorativo.'
    ]
  },
  {
    id: 'kit-senza-lavoro-1',
    categoryId: 'lavoro',
    title: 'Permesso di Soggiorno Senza Lavoro',
    description: 'Guida completa per la compilazione del Kit Giallo per la richiesta del permesso in "Attesa Occupazione". Destinata a chi ha perso il lavoro, include i passaggi specifici per le dichiarazioni, i documenti da inserire e la lista esatta di cosa portare il giorno del fotosegnalamento in Questura.',
    videoUrl: 'https://example.com/video-senza-lavoro.mp4',
    pdfUrl: 'https://example.com/guida-senza-lavoro.pdf',
    duration: '15 Minuti',
    isNew: true,
    dateAdded: '2026-04-15',
    instructions: [
      'COMPILAZIONE KIT: Usa penna nera e scrivi in stampatello il Modulo 1 indicando il motivo "Attesa Occupazione".',
      'DOCUMENTI NEL KIT: Inserisci la fotocopia del Passaporto e del Permesso scaduto.',
      'DOCUMENTI NEL KIT: Allega l\'iscrizione al Centro per l\'Impiego (DID) o la quietanza NASPI (disoccupazione).',
      'DOCUMENTI CASA / ALLOGGIO: Allega fotocopia del Contratto d\'Affitto registrato, oppure la Dichiarazione di Ospitalità o Cessione di Fabbricato. Se richiesto dalla tua Questura, includi il Certificato di Residenza.',
      'MARCA DA BOLLO: Prima di andare in posta, devi acquistare una Marca da Bollo da 16,00€ in tabaccheria da applicare sul Modulo 1.',
      'SPEDIZIONE POSTA (COSTI): Vai allo Sportello Amico. Costerà circa 106,46€ in totale: 30,00€ per la raccomandata, 30,46€ per la tessera elettronica e 40,00€ di contributo statale per permessi di 1 anno.',
      'APPUNTAMENTO IMPRONTE (in Questura): Devi portare assolutamente la Ricevuta delle Poste, il Passaporto ORIGINALE e il Permesso di Soggiorno ORIGINALE.',
      'APPUNTAMENTO IMPRONTE: Non dimenticare 4 Fototessere formato passaporto recenti (uguali, a colori su sfondo bianco).',
      'APPUNTAMENTO IMPRONTE: Porta l\'originale del Certificato del Centro per l\'Impiego (DID) aggiornato. Se nel frattempo hai trovato un nuovo lavoro, porta l\'originale del nuovo CONTRATTO e l\'UNILAV per registrarlo subito.'
    ]
  },
  {
    id: 'kit-carta-soggiorno-1',
    categoryId: 'carta',
    title: 'Kit Carta di Soggiorno (Lungo Periodo)',
    description: 'Guida completa per la richiesta del "Permesso di Soggiorno UE per Soggiornanti di Lungo Periodo" (ex Carta di Soggiorno). Qui trovi la lista dettagliata dei requisiti (5 anni di residenza, test di lingua) e dei documenti necessari da allegare al Kit Giallo.',
    videoUrl: 'https://example.com/video-carta-soggiorno.mp4',
    pdfUrl: 'https://example.com/guida-carta-soggiorno.pdf',
    duration: '20 Minuti',
    isNew: true,
    dateAdded: '2026-04-15',
    instructions: [
      'REQUISITI BASE: Devi risiedere legalmente e ininterrottamente in Italia da almeno 5 anni e possedere un reddito minimo (non inferiore all\'assegno sociale).',
      'TEST DI ITALIANO: È obbligatorio aver superato il test di lingua italiana livello A2 (o possedere una certificazione equivalente o aver conseguito un diploma in Italia).',
      'MARCA DA BOLLO: Acquista una Marca da Bollo da 16,00€ in tabaccheria prima di compilare il Kit Giallo e incollala sul Modulo 1.',
      'COMPILAZIONE KIT: Usa penna nera e scrivi in STAMPATELLO. Compila sia il Modulo 1 (Anagrafica) sia il Modulo 2 (Reddito).',
      'DOCUMENTI D\'IDENTITÀ: Inserisci la fotocopia dell\'intero Passaporto (tutte le pagine con timbri e visti) e la fotocopia fronte/retro del Permesso di Soggiorno attuale.',
      'DOCUMENTI CASA / ALLOGGIO: È FONDAMENTALE allegare il Certificato di Residenza Storico, lo Stato di Famiglia e, soprattutto, il Certificato di Idoneità Alloggiativa rilasciato dal Comune (e fotocopia del contratto di affitto/acquisto).',
      'DOCUMENTI DI LAVORO E REDDITO: Allega la fotocopia delle ultime 3 Buste Paga, dell\'ultimo Modello CUD/CU e del contratto di lavoro o Modello UNILAV.',
      'CASELLARIO GIUDIZIALE: Molte Questure richiedono di allegare il Certificato del Casellario Giudiziale e quello dei Carichi Pendenti per dimostrare l\'assenza di condanne penali.',
      'SPEDIZIONE POSTA (COSTI): Vai allo Sportello Amico (busta NON chiusa). Dovrai pagare circa 160,46€ totali: 30,00€ (raccomandata) + 30,46€ (Permesso elettronico) + 100,00€ (Contributo specifico per Carta di Soggiorno).',
      'APPUNTAMENTO QUESTURA: Porta la Ricevuta Postale, 4 Fototessere formato passaporto recenti e a colori, più TUTTI i documenti ORIGINALI (Passaporto e Permesso, e i moduli in originale) per l\'identificazione.'
    ]
  }
];

const readGuides = new Set<string>();
export const isGuideUnread = (id: string, isNew: boolean) => !readGuides.has(id) && isNew;
export const markGuideAsRead = (id: string) => readGuides.add(id);
export const hasAnyUnreadGuides = () => KIT_GUIDES.some(law => isGuideUnread(law.id, law.isNew));
