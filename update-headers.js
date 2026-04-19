const fs = require('fs');
const glob = require('glob');
const files = glob.sync('app/*/_layout.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Sfondo blu, testo bianco, freccia bianca
  content = content.replace(/headerStyle:\s*\{[^}]*\}/g, "headerStyle: { backgroundColor: '#0f4c81' }");
  content = content.replace(/headerTintColor:\s*'#0f4c81'/g, "headerTintColor: '#fff'");
  content = content.replace(/headerTitleStyle:\s*\{[^}]*\}/g, "headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 }");

  fs.writeFileSync(file, content);
  console.log('Updated: ' + file);
});
console.log('Done! Updated ' + files.length + ' layout files');
