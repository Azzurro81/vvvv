const fs = require('fs');
const file = 'phone_preview.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Update CATEGORIES for 'carta'
const newCategories = `            { id: 'requisiti', name: 'Requisiti & Reddito', icon: 'fa-coins', hasNew: true },
            { id: 'documenti', name: 'Idoneità Alloggio', icon: 'fa-house-chimney', hasNew: false },
            { id: 'penale', name: 'Certificato Penale', icon: 'fa-gavel', hasNew: true }`;

content = content.replace(/\{ id: 'requisiti', name: 'Requisiti Reddito 2026'[\s\S]*?\{ id: 'documenti', name: 'Certificato IdoneitÃ  Alloggiativa'[\s\S]*?\}/, newCategories);

// 2. Update LAWS for 'carta'
const newLaws = `    carta: [
        { id: 'car-1', catId: 'requisiti', title: 'Reddito e Costi 2026', ref: 'INPS / Polizia di Stato', isNew: true, dateAdded: '2026-04-17', desc: 'Dettaglio degli importi necessari e delle spese fisse per il rilascio della Carta di Soggiorno (Permesso UE Lungo Periodo).', reqs: ['REDDITO ANNUO MINIMO (Assegno Sociale 2026):','Solo richiedente: 7.101,12 euro.','Con 1 familiare a carico: 10.651,68 euro.','Con 2 familiari a carico: 14.202,24 euro.','Con 3 familiari a carico: 17.752,80 euro.','REQUISITI BASE:','5 anni di residenza regolare e continuativa.','Test di lingua italiana livello A2 superato.','Assenza di pericolosita sociale.'], duration: 'Illimitata (Aggiornamento foto ogni 10 anni)', docs: ['COSTI DA SOSTENERE (Totale 176,46 euro):','Contributo fisso: 100,00 euro (bollettino).','Stampa carta elettronica: 30,46 euro (bollettino).','Spedizione Kit Postale: 30,00 euro (alle Poste).','Marca da bollo: 16,00 euro (in tabaccheria).','COSA METTERE NEL KIT:','Modulo 1 e 2 (se lavoratore).','Copia completa PASSAPORTO (tutte le pagine).','Copia permesso attuale e Codice Fiscale.','Dichiarazione redditi (CU, 730 o ultime 3 buste paga).','Certificato Idoneita Alloggiativa.','Certificato Residenza e Stato Famiglia.'], where: 'Ufficio Postale Sportello Amico. Il pagamento dei bollettini (100 + 30,46) si fa direttamente alle Poste.' },
        { id: 'car-2', catId: 'documenti', title: 'Certificato Idoneità Alloggiativa', ref: 'D.M. 5 luglio 1975', isNew: false, desc: 'Attesta che l\\'alloggio rispetta i parametri minimi di superficie e igiene.', reqs: ['Planimetria catastale.','Contratto affitto registrato.','Certificato agibilita.'], duration: 'Validita 6-12 mesi', docs: ['Modulo richiesta Comune.','Marca da bollo 16 euro.','Certificato impianti.'], where: 'Ufficio Tecnico del Comune di residenza.' },
        { id: 'car-3', catId: 'penale', title: 'Certificato Penale Online con SPID', ref: 'Ministero della Giustizia - giustizia.it', isNew: true, dateAdded: '2026-04-17', desc: 'Guida alla richiesta del certificato del Casellario Giudiziale necessaria per la Carta di Soggiorno.', reqs: ['Necessario per dimostrare l\\'assenza di condanne.','Si puo richiedere ONLINE per risparmiare tempo.','Accesso con SPID o CIE sul sito giustizia.it.'], duration: 'Validita 6 mesi', docs: ['COSTI CERTIFICATO:','Marca da bollo: 16,00 euro.','Diritti di certificato: 3,92 euro (totale 19,92 euro).','Urgenza: +3,92 euro (totale 23,84 euro).','PROCEDURA:','1. Entra nel sito giustizia.it (Servizi Online).','2. Prenota il certificato con SPID.','3. Ricevi conferma via email.','4. Ritira fisicamente presso la PROCURA DELLA REPUBBLICA scelta.'], where: 'Online (giustizia.it) poi ritiro presso la Procura della Repubblica.' }
    ],`;

content = content.replace(/carta: \[[\s\S]*?\],/, newLaws);

fs.writeFileSync(file, content, 'utf8');
console.log('Carta di Soggiorno updated successfully with accurate 2026 data.');
