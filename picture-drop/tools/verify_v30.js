'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const game = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

function assert(cond, msg) { if (!cond) throw new Error(msg); }

assert(version === '3.0.0', `bad version ${version}`);
assert(game.includes('let GRID = 4;'), 'GRID is not dynamic');
assert(game.includes('function gridForLevel(level)'), 'gridForLevel missing');
assert(game.includes('return level >= 15 ? 5 : 4;'), '4x4 -> 5x5 progression missing');
assert(game.includes('decks: []'), 'per-column decks missing');
assert(!/game\.deck(?!s)/.test(game), 'legacy global game.deck remains');
assert(game.includes('const sourceGroup = groupAtCell(index);'), 'joined source group is not draggable as a group');
assert(!game.includes('sourceGroup:single'), 'single-only drag rule remains');
assert(game.includes('function gravityStep(board)'), 'rigid gravity step missing');
assert(game.includes('async function dealIntoBoard()'), 'column deal missing');
assert(game.includes('game.comboStreak'), 'persistent combo streak missing');
assert(index.includes('拼合块直接整体拖动'), 'home reference guidance missing');
assert(css.includes('/* v3-reference-fidelity */'), 'v3 visual geometry CSS missing');
assert(css.includes('.game-stage.is-hard .deck-stack'), 'hard red deck styling missing');

// Pure reference-model helpers for rule regression.
let GRID = 4;
const rc = (r,c) => r*GRID+c;
const pos = i => ({r:Math.floor(i/GRID), c:i%GRID});

function swapTranslatedGroup(board, cells, dr, dc) {
  const targets=[];
  const edges=new Map();
  for(const index of cells){
    const {r,c}=pos(index), nr=r+dr, nc=c+dc;
    assert(nr>=0&&nr<GRID&&nc>=0&&nc<GRID,'test move out of bounds');
    const target=rc(nr,nc); targets.push(target); edges.set(index,target);
  }
  const targetSet=new Set(targets);
  const next=board.slice();
  const starts=cells.filter(cell=>!targetSet.has(cell));
  for(const start of starts){
    const path=[start]; let cur=start;
    while(edges.has(cur)){cur=edges.get(cur);path.push(cur);}
    const values=path.map(cell=>board[cell]);
    next[path[0]]=values[values.length-1]||null;
    for(let i=0;i<path.length-1;i++) next[path[i+1]]=values[i]||null;
  }
  assert(board.filter(Boolean).slice().sort().join('|')===next.filter(Boolean).slice().sort().join('|'),'piece integrity failure');
  return next;
}

// Reference example: a vertical 2-piece joined source swaps into two occupied target cells.
{
  const b=Array(16).fill(null);
  b[rc(1,3)]='owlR1'; b[rc(2,3)]='owlR2';
  b[rc(0,1)]='cat'; b[rc(1,1)]='house';
  const n=swapTranslatedGroup(b,[rc(1,3),rc(2,3)],-1,-2);
  assert(n[rc(0,1)]==='owlR1'&&n[rc(1,1)]==='owlR2','rigid source group did not land together');
  assert(n[rc(1,3)]==='cat'&&n[rc(2,3)]==='house','target region was not displaced to source footprint');
}

// Reference user screenshot: a single source may replace one member of a joined target shape.
{
  const b=Array(16).fill(null);
  b[rc(1,3)]='sushi';
  b[rc(1,1)]='violinA'; b[rc(2,1)]='violinB'; b[rc(2,2)]='violinC';
  const n=swapTranslatedGroup(b,[rc(1,3)],0,-2);
  assert(n[rc(1,1)]==='sushi','single did not enter joined target cell');
  assert(n[rc(1,3)]==='violinA','displaced joined-target cell did not return to source');
  assert(n[rc(2,1)]==='violinB'&&n[rc(2,2)]==='violinC','unaffected target-group pieces were lost');
}

function compatible(a,b,dr,dc){
  if(!a||!b||a.image!==b.image)return false;
  const Q=[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}];
  return Q[b.q].y-Q[a.q].y===dr&&Q[b.q].x-Q[a.q].x===dc;
}
function groups(board,tiles){
  const adj=new Map();board.forEach(id=>{if(id)adj.set(id,[])});
  const connect=(a,b)=>{adj.get(a).push(b);adj.get(b).push(a)};
  for(let i=0;i<board.length;i++){
    const id=board[i];if(!id)continue;const {r,c}=pos(i);
    if(c<GRID-1&&board[i+1]&&compatible(tiles[id],tiles[board[i+1]],0,1))connect(id,board[i+1]);
    if(r<GRID-1&&board[i+GRID]&&compatible(tiles[id],tiles[board[i+GRID]],1,0))connect(id,board[i+GRID]);
  }
  const seen=new Set(),out=[];
  for(const id of adj.keys()){
    if(seen.has(id))continue;const st=[id],ids=[];seen.add(id);
    while(st.length){const x=st.pop();ids.push(x);for(const y of adj.get(x))if(!seen.has(y)){seen.add(y);st.push(y)}}
    const cells=ids.map(x=>board.indexOf(x));const coords=cells.map(pos);
    out.push({key:ids.slice().sort().join(','),ids,cells,minR:Math.min(...coords.map(x=>x.r)),maxR:Math.max(...coords.map(x=>x.r))});
  }
  return out;
}
function gravityStep(board,tiles){
  const gs=groups(board,tiles).sort((a,b)=>b.maxR-a.maxR||b.minR-a.minR);
  const owner=new Map();gs.forEach(g=>g.cells.forEach(cell=>owner.set(cell,g)));
  const movable=new Set();let changed=true;
  while(changed){changed=false;for(const g of gs){if(movable.has(g.key)||g.maxR>=GRID-1)continue;const own=new Set(g.cells);const can=g.cells.every(cell=>{const t=cell+GRID;if(t>=board.length)return false;if(own.has(t)||!board[t])return true;const blocker=owner.get(t);return blocker?movable.has(blocker.key):false});if(can){movable.add(g.key);changed=true}}}
  const moving=gs.filter(g=>movable.has(g.key));if(!moving.length)return{moved:false,board:board.slice()};
  const next=board.slice(),entries=[];moving.forEach(g=>g.cells.forEach(cell=>entries.push([cell,board[cell]])));entries.forEach(([cell])=>next[cell]=null);entries.sort((a,b)=>b[0]-a[0]).forEach(([cell,id])=>next[cell+GRID]=id);return{moved:true,board:next};
}

// Horizontal joined pair must stay rigid while falling (confirmed in level-15 recording).
{
  GRID=5;
  const b=Array(25).fill(null);
  b[rc(2,2)]='s0'; b[rc(2,3)]='s1';
  const tiles={s0:{image:1,q:0},s1:{image:1,q:1}};
  let n=b.slice(),guard=0;while(guard++<10){const s=gravityStep(n,tiles);if(!s.moved)break;n=s.board;}
  assert(n[rc(4,2)]==='s0'&&n[rc(4,3)]==='s1','horizontal joined pair split or failed to fall rigidly');
}

console.log('v3 reference-rule verification passed');
