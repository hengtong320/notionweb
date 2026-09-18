(() => {
'use strict';

const MASTER='assets/blessings-realistic/01-lotus-sunrise.png';
const BOSS_N=4;
const MICRO_N=4;
const MACRO_COUNT=16;
const WAVE_SIZE=4;
const TOTAL_WAVES=4;
const els={
  app:document.getElementById('bossApp'),stageKicker:document.getElementById('stageKicker'),stageTitle:document.getElementById('stageTitle'),
  phaseText:document.getElementById('phaseText'),progressText:document.getElementById('progressText'),progressFill:document.getElementById('progressFill'),
  collector:document.getElementById('collector'),microStage:document.getElementById('microStage'),microBoard:document.getElementById('microBoard'),
  microMessage:document.getElementById('microMessage'),microMoves:document.getElementById('microMoves'),bossStage:document.getElementById('bossStage'),
  bossBoard:document.getElementById('bossBoard'),bossAccuracy:document.getElementById('bossAccuracy'),bossMessage:document.getElementById('bossMessage'),
  bossMoves:document.getElementById('bossMoves'),hintBtn:document.getElementById('hintBtn'),restartBtn:document.getElementById('restartBtn'),
  skipBossBtn:document.getElementById('skipBossBtn'),transition:document.getElementById('transitionOverlay'),transitionGrid:document.getElementById('transitionGrid'),
  finish:document.getElementById('finishOverlay'),finishMicroMoves:document.getElementById('finishMicroMoves'),finishBossMoves:document.getElementById('finishBossMoves'),
  againBtn:document.getElementById('againBtn')
};
document.documentElement.style.setProperty('--master',`url("${MASTER}")`);

let phase='micro',wave=0,microBoard=Array(16).fill(null),bossOrder=[],collected=new Set(),microMoves=0,bossMoves=0,busy=false;
let drag=null,audioCtx=null;

function randFactory(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,seed){const r=randFactory(seed);for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function coords(index,n){return{r:Math.floor(index/n),c:index%n};}
function posPct(v,n){return n<=1?0:(v/(n-1))*100;}
function microBg(piece){
  const mr=Math.floor(piece.macro/BOSS_N),mc=piece.macro%BOSS_N,qr=piece.q>1?1:0,qc=piece.q%2;
  return{bx:posPct(mc*2+qc,BOSS_N*2),by:posPct(mr*2+qr,BOSS_N*2)};
}
function bossBg(macro){const {r,c}=coords(macro,BOSS_N);return{bx:posPct(c,BOSS_N),by:posPct(r,BOSS_N)};}
function pieceId(m,q){return `${m}:${q}`;}
function parsePiece(id){const [m,q]=id.split(':').map(Number);return{macro:m,q};}

function buzz(pattern=12){try{navigator.vibrate?.(pattern);}catch(_){}}
function sound(type='tap'){
  try{
    if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    const now=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);
    const f=type==='clear'?660:type==='boss'?440:type==='win'?784:320;o.frequency.setValueAtTime(f,now);
    if(type==='clear')o.frequency.exponentialRampToValueAtTime(990,now+.18);
    if(type==='win')o.frequency.exponentialRampToValueAtTime(1174,now+.32);
    g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.12,now+.012);g.gain.exponentialRampToValueAtTime(.0001,now+(type==='win'?.42:.22));
    o.start(now);o.stop(now+(type==='win'?.45:.25));
  }catch(_){}
}

function buildCollector(){
  els.collector.innerHTML='';
  for(let m=0;m<MACRO_COUNT;m++){
    const d=document.createElement('i');d.className='collect-dot';d.dataset.macro=String(m);
    const p=bossBg(m);d.style.setProperty('--piece',`url("${MASTER}")`);d.style.setProperty('--px',p.bx+'%');d.style.setProperty('--py',p.by+'%');
    els.collector.appendChild(d);
  }
}
function syncCollector(){
  els.collector.querySelectorAll('.collect-dot').forEach((d,i)=>d.classList.toggle('done',collected.has(i)));
  els.progressText.textContent=`已完成 ${collected.size} / ${MACRO_COUNT}`;
  els.progressFill.style.width=(collected.size/MACRO_COUNT*100)+'%';
}

function loadWave(index){
  phase='micro';wave=index;busy=false;
  els.microStage.classList.add('is-visible');els.bossStage.classList.remove('is-visible');els.skipBossBtn.hidden=false;
  els.stageKicker.textContent='阶段 1 · 小图消除';els.stageTitle.textContent='先完成16张小图';els.phaseText.textContent=`第 ${index+1}/${TOTAL_WAVES} 波`;
  const ids=[];for(let m=index*WAVE_SIZE;m<(index+1)*WAVE_SIZE;m++)for(let q=0;q<4;q++)ids.push(pieceId(m,q));
  shuffle(ids,20260918+index*97);microBoard=ids;
  if(findCompletes().length){[microBoard[0],microBoard[15]]=[microBoard[15],microBoard[0]];}
  renderMicro();syncCollector();
  els.microMessage.textContent='拖动任意碎片，与目标位置交换';
}
function renderMicro(){
  els.microBoard.innerHTML='';
  for(let cell=0;cell<16;cell++){
    const wrap=document.createElement('div');wrap.className='micro-cell';wrap.dataset.cell=String(cell);
    const id=microBoard[cell];
    if(id){
      const piece=parsePiece(id),p=microBg(piece),t=document.createElement('div');t.className='micro-tile';t.dataset.id=id;t.dataset.cell=String(cell);t.dataset.macro=String(piece.macro);
      t.style.setProperty('--master',`url("${MASTER}")`);t.style.setProperty('--bx',p.bx+'%');t.style.setProperty('--by',p.by+'%');
      wrap.appendChild(t);
    }
    els.microBoard.appendChild(wrap);
  }
  els.microMoves.textContent=microMoves+'步';
}
function findCompletes(){
  const out=[];
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){
    const cells=[r*4+c,r*4+c+1,(r+1)*4+c,(r+1)*4+c+1],ids=cells.map(i=>microBoard[i]);
    if(ids.some(x=>!x))continue;const parts=ids.map(parsePiece),m=parts[0].macro;
    if(parts.every((p,i)=>p.macro===m&&p.q===i))out.push({macro:m,cells});
  }
  return out;
}
function gravityMicro(){
  for(let c=0;c<4;c++){
    const ids=[];for(let r=3;r>=0;r--){const id=microBoard[r*4+c];if(id)ids.push(id);}
    for(let r=3,k=0;r>=0;r--){microBoard[r*4+c]=k<ids.length?ids[k++]:null;}
  }
}
async function resolveMicro(){
  if(busy)return;busy=true;
  let loops=0;
  while(loops++<8){
    const complete=findCompletes();if(!complete.length)break;
    complete.forEach(g=>g.cells.forEach(cell=>els.microBoard.querySelector(`.micro-tile[data-cell="${cell}"]`)?.classList.add('clearing')));
    sound('clear');buzz([16,24,20]);await wait(390);
    complete.forEach(g=>{g.cells.forEach(cell=>microBoard[cell]=null);collected.add(g.macro);});
    syncCollector();gravityMicro();renderMicro();await wait(260);
  }
  if(microBoard.every(x=>!x)){
    if(collected.size>=MACRO_COUNT){busy=false;await startBossTransition();return;}
    await wait(420);loadWave(wave+1);busy=false;return;
  }
  busy=false;
}
function swapMicro(a,b){if(a===b||a<0||b<0||a>15||b>15)return;[microBoard[a],microBoard[b]]=[microBoard[b],microBoard[a]];microMoves++;renderMicro();sound();void resolveMicro();}

function startBossTransition(){
  els.transitionGrid.innerHTML='';
  for(let m=0;m<16;m++){const i=document.createElement('i'),p=bossBg(m);i.style.setProperty('--px',p.bx+'%');i.style.setProperty('--py',p.by+'%');i.style.animationDelay=(m*.035)+'s';els.transitionGrid.appendChild(i);}
  els.transition.classList.add('is-visible');sound('win');buzz([25,35,45]);
  return wait(1650).then(()=>{els.transition.classList.remove('is-visible');enterBoss();});
}
function enterBoss(){
  phase='boss';busy=false;collected=new Set(Array.from({length:16},(_,i)=>i));syncCollector();
  els.microStage.classList.remove('is-visible');els.bossStage.classList.add('is-visible');els.skipBossBtn.hidden=true;
  els.stageKicker.textContent='阶段 2 · BOSS 合成';els.stageTitle.textContent='16张小图 → 1张超大图';els.phaseText.textContent='终极阶段';
  bossOrder=shuffle(Array.from({length:16},(_,i)=>i),2026091807);
  if(bossOrder.every((v,i)=>v===i))[bossOrder[0],bossOrder[1]]=[bossOrder[1],bossOrder[0]];
  renderBoss();sound('boss');
}
function renderBoss(){
  els.bossBoard.innerHTML='';els.bossBoard.classList.remove('solved');
  let correct=0;
  for(let cell=0;cell<16;cell++){
    const wrap=document.createElement('div');wrap.className='boss-cell';wrap.dataset.cell=String(cell);
    const macro=bossOrder[cell],p=bossBg(macro),t=document.createElement('div');t.className='boss-tile';t.dataset.cell=String(cell);t.dataset.macro=String(macro);
    t.style.setProperty('--master',`url("${MASTER}")`);t.style.setProperty('--bx',p.bx+'%');t.style.setProperty('--by',p.by+'%');
    if(macro===cell){t.classList.add('correct');correct++;}
    wrap.appendChild(t);els.bossBoard.appendChild(wrap);
  }
  const accuracy=Math.round(correct/16*100);els.bossAccuracy.textContent=accuracy+'%';els.bossMoves.textContent=bossMoves+'步';
  if(correct===16)finishBoss();
}
function swapBoss(a,b){if(a===b||a<0||b<0||a>15||b>15)return;if(bossOrder[a]===a)return;[bossOrder[a],bossOrder[b]]=[bossOrder[b],bossOrder[a]];bossMoves++;renderBoss();sound('boss');buzz(10);}
async function finishBoss(){
  if(phase==='done')return;phase='done';els.bossBoard.classList.add('solved');els.bossAccuracy.textContent='100%';sound('win');buzz([30,25,50,25,80]);
  await wait(1500);els.finishMicroMoves.textContent=String(microMoves);els.finishBossMoves.textContent=String(bossMoves);els.finish.classList.add('is-visible');
}

function hint(){
  document.querySelectorAll('.hint,.source-hint,.target-hint').forEach(n=>n.classList.remove('hint','source-hint','target-hint'));
  if(phase==='micro'){
    const first=microBoard.find(Boolean);if(!first)return;const macro=parsePiece(first).macro;
    els.microBoard.querySelectorAll(`.micro-tile[data-macro="${macro}"]`).forEach(n=>n.classList.add('hint'));
    els.microMessage.textContent='提示：把这4块同一张小图拼成正确的2×2';
  }else if(phase==='boss'){
    const source=bossOrder.findIndex((m,i)=>m!==i);if(source<0)return;const target=bossOrder[source];
    els.bossBoard.querySelector(`.boss-tile[data-cell="${source}"]`)?.classList.add('source-hint');
    els.bossBoard.querySelector(`.boss-cell[data-cell="${target}"]`)?.classList.add('target-hint');
    els.bossMessage.textContent='提示：发光卡片应该放进虚线目标格';
  }
  sound();
}

function bindDrag(boardEl,kind){
  boardEl.addEventListener('pointerdown',e=>{
    const tile=e.target.closest(kind==='micro'?'.micro-tile':'.boss-tile');if(!tile||busy||phase==='done')return;
    if(kind==='boss'&&tile.classList.contains('correct'))return;
    try{tile.setPointerCapture(e.pointerId);}catch(_){}
    drag={kind,tile,source:Number(tile.dataset.cell),id:e.pointerId,startX:e.clientX,startY:e.clientY,dx:0,dy:0};
    tile.classList.add('dragging');sound();
  });
  boardEl.addEventListener('pointermove',e=>{
    if(!drag||drag.kind!==kind||drag.id!==e.pointerId)return;e.preventDefault();drag.dx=e.clientX-drag.startX;drag.dy=e.clientY-drag.startY;drag.tile.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.035)`;
  },{passive:false});
  const end=e=>{
    if(!drag||drag.kind!==kind||drag.id!==e.pointerId)return;
    const d=drag;drag=null;d.tile.classList.remove('dragging');d.tile.style.transform='';
    const rect=boardEl.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,c=Math.floor(x/(rect.width/4)),r=Math.floor(y/(rect.height/4));
    const target=(r>=0&&r<4&&c>=0&&c<4)?r*4+c:-1;
    if(target<0||Math.hypot(d.dx,d.dy)<8)return;
    if(kind==='micro')swapMicro(d.source,target);else swapBoss(d.source,target);
  };
  boardEl.addEventListener('pointerup',end);boardEl.addEventListener('pointercancel',end);
}

function wait(ms){return new Promise(r=>setTimeout(r,ms));}
function reset(){
  phase='micro';wave=0;microMoves=0;bossMoves=0;busy=false;drag=null;collected.clear();bossOrder=[];
  els.finish.classList.remove('is-visible');els.transition.classList.remove('is-visible');buildCollector();syncCollector();loadWave(0);
}
function solveBoss(){if(phase!=='boss')enterBoss();bossOrder=Array.from({length:16},(_,i)=>i);renderBoss();}
function forceFinishMicro(){
  collected=new Set(Array.from({length:16},(_,i)=>i));syncCollector();enterBoss();
}

els.hintBtn.addEventListener('click',hint);els.restartBtn.addEventListener('click',reset);els.skipBossBtn.addEventListener('click',forceFinishMicro);els.againBtn.addEventListener('click',reset);
bindDrag(els.microBoard,'micro');bindDrag(els.bossBoard,'boss');
document.addEventListener('pointerdown',()=>{if(audioCtx?.state==='suspended')audioCtx.resume();},{once:true});
window.__BOSS_DEMO__={
  version:'1.0.0',
  state:()=>({phase,wave,collected:collected.size,microMoves,bossMoves,microBoard:microBoard.slice(),bossOrder:bossOrder.slice()}),
  enterBoss:forceFinishMicro,
  solveBoss,
  reset
};
reset();
})();