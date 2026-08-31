'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const game = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

function assert(cond, msg) { if (!cond) throw new Error(msg); }

assert(version === '3.1.0', `bad version ${version}`);
assert(game.includes('const TILE_ASPECT = 0.69;'), 'portrait tile aspect missing');
assert(game.includes('function updateBoardLayout()'), 'height-driven board layout missing');
assert(game.includes('stepX:rect.width*m.step/100'), 'horizontal drag step missing');
assert(game.includes('stepY:rect.height*m.step/100'), 'vertical drag step missing');
assert(game.includes('drag.splitMode = true;'), 'split-mode drag missing');
assert(game.includes("showToast('已拆成单块'"), 'split feedback missing');
assert(game.includes('const moved=await applyGravity();'), 'continuous gravity is not in resolve loop');
assert(game.includes('const dealt=await dealIntoBoard();'), 'stable-board refill loop missing');
assert(game.includes('boardRect.height*gridMetrics().step/100'), 'vertical fall distance still based on board width');
assert(game.includes("'assets/pictures-portrait/"), 'portrait picture paths missing');
assert(index.includes('按住后拖可拆单块'), 'home split guidance missing');
assert(css.includes('/* v3.1-portrait-physics */'), 'portrait CSS override missing');
assert(css.includes('--tile-aspect:.69'), 'portrait CSS aspect missing');
assert(css.includes('.board-wrap{width:var(--board-w)!important;height:var(--board-h)!important'), 'board wrap remains square');

const portraitDir = path.join(root, 'assets', 'pictures-portrait');
const portraitFiles = fs.existsSync(portraitDir) ? fs.readdirSync(portraitDir).filter(f => f.endsWith('.webp')) : [];
assert(portraitFiles.length >= 36, `portrait asset count too low: ${portraitFiles.length}`);

// Geometry regression: a 0.69 board containing an NxN grid makes every base cell portrait.
for (const n of [4,5]) {
  const boardW = 345;
  const boardH = boardW / 0.69;
  const cellW = boardW / n;
  const cellH = boardH / n;
  const ratio = cellW / cellH;
  assert(Math.abs(ratio - 0.69) < 1e-9, `cell aspect wrong for ${n}x${n}: ${ratio}`);
}

// Pure model: joined source can move as a unit, but touched member can also be detached.
let GRID = 4;
const rc=(r,c)=>r*GRID+c;
const pos=i=>({r:Math.floor(i/GRID),c:i%GRID});
function swapTranslatedGroup(board,cells,dr,dc){
  const targets=[],edges=new Map();
  for(const i of cells){const {r,c}=pos(i);const nr=r+dr,nc=c+dc;if(nr<0||nr>=GRID||nc<0||nc>=GRID)return null;const t=rc(nr,nc);targets.push(t);edges.set(i,t)}
  const targetSet=new Set(targets),next=board.slice();
  const starts=cells.filter(c=>!targetSet.has(c));
  for(const start of starts){const path=[start];let cur=start;while(edges.has(cur)){cur=edges.get(cur);path.push(cur)}const vals=path.map(c=>board[c]);next[path[0]]=vals[vals.length-1]||null;for(let i=0;i<path.length-1;i++)next[path[i+1]]=vals[i]||null}
  return next;
}
{
  const b=Array(16).fill(null);
  b[rc(1,1)]='A';b[rc(2,1)]='B';b[rc(1,3)]='X';b[rc(2,3)]='Y';
  const whole=swapTranslatedGroup(b,[rc(1,1),rc(2,1)],0,2);
  assert(whole[rc(1,3)]==='A'&&whole[rc(2,3)]==='B','joined source did not move as a unit');
  const single=swapTranslatedGroup(b,[rc(1,1)],0,2);
  assert(single[rc(1,3)]==='A'&&single[rc(1,1)]==='X'&&single[rc(2,1)]==='B','single tear-out swap failed');
}

// Pure model: gravity must execute even when no image was cleared.
function simpleGravity(board){
  let next=board.slice(),moved=false;
  for(let c=0;c<GRID;c++){
    for(let r=GRID-2;r>=0;r--){
      let i=rc(r,c);
      if(!next[i])continue;
      let nr=r;
      while(nr+1<GRID&&!next[rc(nr+1,c)])nr++;
      if(nr!==r){next[rc(nr,c)]=next[i];next[i]=null;moved=true;}
    }
  }
  return {next,moved};
}
{
  const b=Array(16).fill(null);b[rc(0,2)]='floating';
  const g=simpleGravity(b);
  assert(g.moved&&g.next[rc(3,2)]==='floating','unsupported tile did not fall after ordinary move');
}

assert(game.includes('return level >= 15 ? 5 : 4;'), 'L14/L15 4x4->5x5 progression regressed');
console.log('v3.1 portrait/physics regression checks passed');
