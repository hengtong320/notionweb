const fs=require('fs');
const game=fs.readFileSync('picture-drop/game.js','utf8');
const css=fs.readFileSync('picture-drop/style.css','utf8');
const ver=fs.readFileSync('picture-drop/VERSION','utf8').trim();
const checks=[
 ['version',ver==='3.2.0'],
 ['RAF drag',game.includes('requestAnimationFrame(flushDragFrame)')],
 ['no forced reflow',!game.includes('moving[0].offsetWidth')],
 ['RAF FLIP settle',game.includes('requestAnimationFrame') && game.includes('moving.forEach((el)=>{ el.style.transition=`transform ${duration}ms')],
 ['active set rects',game.includes('const active = new Set(game.board.filter(Boolean))')],
 ['render index cache',game.includes('const indexById = new Map()')],
 ['portrait physics preserved',game.includes('const TILE_ASPECT = 0.69') && game.includes('drag.splitMode = true')],
 ['gravity preserved',game.includes('const moved=await applyGravity();')],
 ['GPU containment',css.includes('/* v3.2-performance */') && css.includes('contain:layout paint style')],
 ['drag filter removed',css.includes('.tile.is-dragging{filter:none;')]
];
let bad=false; for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`);if(!ok)bad=true;} if(bad)process.exit(1);
console.log('v3.2 performance verification passed');
