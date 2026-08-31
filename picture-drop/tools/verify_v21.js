const fs=require('fs');
const src=fs.readFileSync('picture-drop/game.js','utf8');
const must=[
  "mode:'single'",
  "showToast('整组移动'",
  'const displaced = targets.map',
  'function settleGroupsRigid(board)',
  "classList.add('land-pop')",
  'return Math.min(12, 8 + Math.floor((level - 19) / 8))'
];
for(const token of must){if(!src.includes(token)){console.error('missing',token);process.exit(1)}}
new Function(src);
console.log('v2.1 interaction patch verified');
