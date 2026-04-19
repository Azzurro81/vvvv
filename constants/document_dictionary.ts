export const DOCUMENT_DICTIONARY: Record<string, string> = {
    'provvedimento di revoca': 'Documento ufficiale emesso dalla Questura che ti notifica la cancellazione del permesso. Da questa data partono i termini per fare eventuale ricorso.',
    'ricorso': 'Possibilità di impugnare il provvedimento sfavorevole davanti al Tribunale competente o al TAR. Richiede l\'assistenza di un avvocato e solitamente va depositato entro 30 o 60 giorni.',
    'passaporto': 'Devi presentare una fotocopia di tutte le pagine scritte del tuo passaporto in corso di validità (dati anagrafici, visti, timbri di ingresso e uscita). Le pagine bianche non servono.',
    'marca da bollo': 'Un contrassegno telematico del valore di 16,00 €. Può essere acquistata in qualsiasi tabaccheria italiana e va applicata fisicamente sulla documentazione.',
    'certificato penale': 'Documento rilasciato dalla Procura della Repubblica che attesta eventuali condanne penali subite. Spesso è richiesto in aggiunta a quello del Paese d\'origine tradotto.',
    'casellario': 'Il Certificato del Casellario Giudiziale riporta i provvedimenti di condanna definitivi emessi a carico della persona.',
    'carichi pendenti': 'Certificato rilasciato dal Tribunale che dimostra se hai procedimenti penali in corso (cioè processi aperti ma senza ancora una condanna definitiva).',
    'idoneità alloggiativa': 'Certificato (rilasciato dal Comune o dall\'ASL competente) garantente che l\'abitazione dove risiedi ha requisiti minimi di superficie e igiene per il numero totale degli occupanti.',
    'cud': 'La Certificazione Unica (ex CUD) è il documento fiscale che riassume tutti i redditi percepiti l\'anno precedente. Per la maggior parte dei permessi serve dimostrare di superare l\'importo dell\'assegno sociale.',
    'certificazione unica': 'La Certificazione Unica è un documento fiscale (rilasciato dal datore o dall\'INPS) che certifica i redditi di lavoro dipendente o assimilati percepiti nell\'ultimo anno solare.',
    'buste paga': 'Di solito servono le copie delle ultime 3 o 6 buste paga. Dimostrano alle autorità che stai percependo uno stipendio continuativo e che il tuo contratto è ancora attivo.',
    'affitto': 'Copia del contratto di affitto, che deve essere regolarmente registrato presso l\'Agenzia delle Entrate o accompagnato da comodato d\'uso formale.',
    'ospitalità': 'La "Dichiarazione di Ospitalità" (o Cessione di Fabbricato) è obbligatoria entro 48 ore dall\'inizio della convivenza, redatta dal proprietario di casa per informare la Polizia.',
    'unilav': 'Il Modello UNILAV è la comunicazione obbligatoria che il datore di lavoro invia al centro per l\'impiego, prova inconfutabile che sei stato regolarmente assunto.',
    'bollettino': 'Bollettino postale per il costo del permesso elettronico (PSE). In genere l\'importo è di € 30,46, più una somma variabile (€ 40, 50, 100) a seconda della durata richiesta.',
    'fototessere': '4 fotografie recenti formato tessera, con sfondo bianco, senza occhiali da sole o cappelli, da consegnare fisicamente in formato cartaceo al momento dell\'appuntamento in Questura.',
    'nascita': 'Certificato di nascita originale. Per avere validità in Italia estero deve essere tradotto ufficialmente e legalizzato o apostillato presso la rappresentanza consolare o la prefettura, se estero.',
    'matrimonio': 'Certificato o atto di matrimonio trascritto in Italia nei registri di stato civile per poter avere valore burocratico legale per le Questure o il Ministero.',
    'medica': 'Certificazione rilasciata esclusivamente da un medico o struttura di sanità pubblica del SSN (no medici privati) in caso di invalidità o gravi motivi di salute proposti come esenzione.',
    'certificazione b1': 'Certificazione di lingua italiana di livello B1. Può essere rilasciata solo da enti certificatori autorizzati (Università di Siena, Perugia, Roma Tre, Dante Alighieri, CPIA).',
    'lingua a2': 'Test di lingua italiana per la carta di soggiorno. Anche qui serve certificazione tramite CPIA, o il superamento del test standard organizzato dalla Prefettura.',
    'dichiarazione di mantenimento': 'Dichiarazione ufficiale da parte di un familiare garante, con dimostrazione reddituale, che si impegna a supportare il coniuge/figlio in Italia e non farlo gravare sul sistema pubblico.',
    'stato di famiglia': 'Documento anagrafico rilasciato dal Comune di residenza che specifica tutte le persone conviventi nello stesso nucleo.',
    'ricevuta': 'La famigerata ricevuta delle Poste o dell\'assicurata postale. Assolutamente essenziale: vale come titolo di soggiorno temporaneo finché non sarà ritirato il nuovo tesserino.',
    'iscritti': 'Certificato di iscrizione scolastica o certificato di frequenza utile a valutare i legami e i percorsi di integrazione per minori.',
    'partita iva': 'Certificato di attribuzione di Partita Iva, corredato da visura camerale recente e per le start-up tutta la dichiarazione dei redditi dell\'ultimo bilancio.'
};

export const getDocumentDetails = (rawDocText: string): string => {
    const textLower = rawDocText.toLowerCase();
    
    // Exact or partial substring match in the dictionary keys
    for (const [key, details] of Object.entries(DOCUMENT_DICTIONARY)) {
        if (textLower.includes(key)) {
            return details;
        }
    }
    
    // Fallback if no specific keyword matches
    return `Per questo specifico documento non c'è un approfondimento tecnico in archivio, ma assicurati sempre di fornirlo sia in formato originale per la visione, sia sotto forma di fotocopia per l'acquisizione nel fascicolo.`;
};
