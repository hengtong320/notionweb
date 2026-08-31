const fs = require('fs');
const game = fs.readFileSync('picture-drop/game.js','utf8');
const index = fs.readFileSync('picture-drop/index.html','utf8');
const version = fs.readFileSync('picture-drop/VERSION','utf8').trim();
function must(ok,msg){ if(!ok){ console.error(msg); process.exit(1); } }
must(version==='2.2.0','VERSION is not 2.2.0');
must(game.includes('every drag always moves exactly ONE cell'),'single-cell drag rule missing');
must(game.includes('sourceGroup:single, sourceIds:[id], sourceCells:[index]'),'single source group missing');
must(!game.includes("drag.mode='group'"),'obsolete long-press group mode remains');
must(!game.includes('holdTimer'), 'obsolete holdTimer remains');
must(game.includes('Hints follow the same rule as the player: one-cell swaps only.'),'hint solver not migrated to single swaps');
must(index.includes('任何碎片都能单独交换，拼好的组合也可以再次拆开'),'home guidance not updated');
console.log('v2.2 verification passed');
