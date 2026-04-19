const fs = require('fs');
const glob = require('glob');
const files = glob.sync('app/*/_layout.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Rimuovi ", textShadowRadius: 2 }" residuo e sostituisci con semplice chiusura
  content = content.replace(/,\s*textShadowRadius:\s*2\s*\}/g, '');
  // Rimuovi anche ", textShadowRadius: 2 }," (con virgola finale)
  content = content.replace(/,\s*textShadowRadius:\s*2\s*\},/g, ',');

  fs.writeFileSync(file, content);
  console.log('Cleaned: ' + file);
});
console.log('Done!');
