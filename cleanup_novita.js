const fs = require('fs');
const file = 'phone_preview.html';
let content = fs.readFileSync(file, 'utf8');

// IDs of laws to mark as not new (to remove from 'novita' folder)
const targetIds = ['per-rinnovo-lavoro', 'per-costi', 'per-questura'];

targetIds.forEach(id => {
    // Look for the specific object by ID and change isNew: true to isNew: false
    const regex = new RegExp(`({ id: '${id}', [\\s\\S]*?isNew: )true`, 'g');
    content = content.replace(regex, '$1false');
});

fs.writeFileSync(file, content, 'utf8');
console.log('Cleanup completed: target laws are no longer marked as isNew.');
