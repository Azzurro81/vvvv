const fs = require('fs');
const file = 'phone_preview.html';
let content = fs.readFileSync(file, 'utf8');

// Definizione delle sequenze di "mojibake" (caratteri corrotti) e le loro versioni corrette
const corrections = [
    [/ÃƒÂ /g, 'à'], [/ÃƒÂ/g, 'à'], [/ÃƒÂ²/g, 'ò'], [/ÃƒÂ¹/g, 'ù'], [/ÃƒÂ¬/g, 'ì'], [/ÃƒÂ¨/g, 'è'], [/ÃƒÂ©/g, 'é'],
    [/Ã /g, 'à'], [/Ã²/g, 'ò'], [/Ã¹/g, 'ù'], [/Ã¬/g, 'ì'], [/Ã¨/g, 'è'], [/Ã©/g, 'é'], [/Â /g, ' '],
    [/Ãƒ/g, 'à'], // Caso limite per alcune doppie codifiche
    [/â‚¬/g, '€'], [/â€™/g, "'"], [/â€œ/g, '"'], [/â€\u009d/g, '"']
];

let fixedContent = content;
corrections.forEach(([regex, replacement]) => {
    fixedContent = fixedContent.replace(regex, replacement);
});

// Pulizia finale specifica per "Novit"
fixedContent = fixedContent.replace(/Novit[ÃƒÂ\s]+/g, 'Novità');
fixedContent = fixedContent.replace(/validit[ÃƒÂ\s]+/g, 'validità');
fixedContent = fixedContent.replace(/alloggiativ[ÃƒÂ\s]+/g, 'alloggiativa');
fixedContent = fixedContent.replace(/unitÃ /g, 'unità');
fixedContent = fixedContent.replace(/mensilitÃ /g, 'mensilità');
fixedContent = fixedContent.replace(/abilitÃ /g, 'abilità');

fs.writeFileSync(file, fixedContent, 'utf8');
console.log('Encoding ripristinato con successo!');
