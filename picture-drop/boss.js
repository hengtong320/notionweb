(() => {
'use strict';

const VERSION='1.1.0';
const GRID=4;
const PICTURES=[
  {src:'assets/blessings-realistic/01-lotus-sunrise.png',name:'荷塘晨曦'},
  {src:'assets/blessings-realistic/02-trumpet-flower.png',name:'凌霄花开'},
  {src:'assets/blessings-v42/07-peony-courtyard.webp',name:'牡丹庭院'},
  {src:'assets/blessings-v42/11-sunflower-lane.webp',name:'向阳花路'},
  {src:'assets/blessings-v42/08-tea-terraces.webp',name:'云海茶山'},
  {src:'assets/blessings-v42/09-wheat-windmill.webp',name:'麦田风车'},
  {src:'assets/blessings-v42/10-ocean-sailboat.webp',name:'海上帆船'},
  {src:'assets/pictures-portrait/10-hot-air-balloons.webp',name:'晨光热气球'},
  {src:'assets/blessings-realistic/03-jujube-orchard.png',name:'枣园丰收'},
  {src:'assets/blessings-realistic/04-elegant-woman.png',name:'花间晨安'},
  {src:'assets/blessings-realistic/05-blessing-vase.png',name:'福气花瓶'},
  {src:'assets/pictures-portrait/18-violin.webp',name:'小提琴'},
  {src:'assets/pictures-portrait/03-golden-dog.webp',name:'金毛伙伴'},
  {src:'assets/pictures-portrait/04-white-cat.webp',name:'白猫'},
  {src:'assets/blessings-realistic/06-pine-crane.png',name:'松鹤延年'},
  {src:'assets/blessings-v42/12-ginkgo-temple.webp',name:'银杏古寺'}
];
const BLOCKS=[[0,1,4,5],[2,3,6,7],[8,9,12,13],[10,11,14,15]];
const els={
  app:$('#bossApp'),stageKicker:$('#stageKicker'),stageTitle:$('#stageTitle'),phaseText:$('#phaseText'),
  progressText:$('#progressText'),progressFill:$('#progressFill'),collector:$('#collector'),microStage:$('#microStage'),
  wavePreview:$('#wavePreview'),microBoard:$('#microBoard'),microMessage:$('#microMessage'),microMoves:$('#microMoves'),
  bossStage:$('#bossStage'),bossTargetPreview:$('#bossTargetPreview'),bossCurrentCard:$('#bossCurrentCard'),
  bossCurrentName:$('#bossCurrentName'),bossNextCards:$('#bossNextCards'),bossColumns:$('#bossColumns'),
  bossBoard:$('#bossBoard'),bossAccuracy:$('#bossAccuracy'),bossMessage:$('#bossMessage'),bossMoves:$('#bossMoves'),
  hintBtn:$('#hintBtn'),restartBtn:$('#restartBtn'),skipBossBtn:$('#skipBossBtn'),transition:$('#transitionOverlay'),
  transitionGrid:$('#transitionGrid'),finish:$('#finishOverlay'),finishCollage:$('#finishCollage'),
  finishMicroMoves:$('#finishMicroMoves'),finishBossMoves:$('#finishBossMoves'),againBtn:$('#againBtn')
};

let phase='micro';
let wave=0;
let microBoard=Array(16).fill(null);
let collected=new Set();
let microMoves=0;
let bossMoves=0;
let busy=false;
let drag=null;
let audioCtx=null;
let bossDeck=[];
let bossCursor=0;
let bossPlaced=Array(16).fill(null);

function $(selector){return document.querySelector(selector);}
function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
function coords(cell){return{r:Math.floor(cell/GRID),c:cell%GRID};}
function qCoords(q){return{r:q>1?1:0,c:q%2};}
function pieceId(image,q){return `${image}:${q}`;}
function parsePiece(id){const [image,q]=id.split(':').map(Number);return{image,q};}
function pct(v){return v?100:0;}
function randFactory(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(items,seed){const a=items.slice(),r=randFactory(seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function vibrate(pattern=12){try{navigator.vibrate?.(pattern);}catch(_){}}
function sound(type='tap',tier=1){
  try{
    if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    const now=audioCtx.currentTime;
    const frequencies={tap:300,snap:520,clear:690,drop:220,wrong:160,boss:430,row:620,win:784};
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type=type==='drop'?'triangle':'sine';o.connect(g);g.connect(audioCtx.destination);
    const f=(frequencies[type]||320)*(1+(tier-1)*.08);o.frequency.setValueAtTime(f,now);
    if(type==='snap'||type==='clear'||type==='row'||type==='win')o.frequency.exponentialRampToValueAtTime(f*1.45,now+.18);
    if(type==='wrong')o.frequency.linearRampToValueAtTime(105,now+.18);
    g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(type==='win'?.14:.09,now+.012);g.gain.exponentialRampToValueAtTime(.0001,now+(type==='win'?.42:.22));
    o.start(now);o.stop(now+(type==='win'?.45:.25));
  }catch(_){}
}

function preload(){PICTURES.forEach(p=>{const img=new Image();img.decoding='async';img.src=p.src;});}

function buildCollector(){
  els.collector.innerHTML='';
  PICTURES.forEach((picture,index)=>{
    const dot=document.createElement('i');dot.className='collect-dot';dot.dataset.image=String(index);
    dot.style.setProperty('--img',`url("${picture.src}")`);els.collector.appendChild(dot);
  });
}
function syncCollector(){
  els.collector.querySelectorAll('.collect-dot').forEach((dot,index)=>dot.classList.toggle('done',collected.has(index)));
  els.progressText.textContent=`已完成 ${collected.size} / ${PICTURES.length}`;
  els.progressFill.style.width=`${collected.size/PICTURES.length*100}%`;
}
function renderWavePreview(){
  els.wavePreview.innerHTML='';
  for(let image=wave*4;image<wave*4+4;image++){
    const card=document.createElement('i');card.className='wave-preview-card';card.dataset.name=PICTURES[image].name;
    card.style.setProperty('--img',`url("${PICTURES[image].src}")`);els.wavePreview.appendChild(card);
  }
}

function solvedWave(index){
  const board=Array(16).fill(null);
  for(let local=0;local<4;local++){
    const image=index*4+local;
    BLOCKS[local].forEach((cell,q)=>board[cell]=pieceId(image,q));
  }
  const swap=(a,b)=>{[board[a],board[b]]=[board[b],board[a]];};
  if(index===0){swap(5,7);swap(13,15);}
  if(index===1){swap(1,3);swap(12,14);}
  if(index===2){swap(4,6);swap(9,11);}
  if(index===3){const cycle=[0,2,8,10],values=cycle.map(c=>board[c]);cycle.forEach((c,i)=>board[c]=values[(i+1)%values.length]);swap(5,7);}
  return board;
}

function loadWave(index,{deal=true}={}){
  phase='micro';wave=index;busy=false;drag=null;
  microBoard=solvedWave(index);
  els.microStage.classList.add('is-visible');els.bossStage.classList.remove('is-visible');els.skipBossBtn.hidden=false;
  els.stageKicker.textContent='阶段 1 · 掉落消除';els.stageTitle.textContent='先合成16张小图';els.phaseText.textContent=`第 ${index+1}/4 波`;
  renderWavePreview();renderMicro({deal});syncCollector();
  els.microMessage.textContent=index===0?'先试试下方两张：交换右下角，能一次合成两张':'拖动碎片交换位置；正确拼边会自动吸附';
}

function microConnections(board=microBoard){
  const edges=new Set();
  for(let cell=0;cell<16;cell++){
    const id=board[cell];if(!id)continue;const a=parsePiece(id),rc=coords(cell),qa=qCoords(a.q);
    for(const [dr,dc,label] of [[0,1,'h'],[1,0,'v']]){
      const nr=rc.r+dr,nc=rc.c+dc;if(nr>=4||nc>=4)continue;
      const next=nr*4+nc,nextId=board[next];if(!nextId)continue;const b=parsePiece(nextId),qb=qCoords(b.q);
      if(a.image===b.image&&qb.r-qa.r===dr&&qb.c-qa.c===dc)edges.add(`${Math.min(cell,next)}-${Math.max(cell,next)}-${label}`);
    }
  }
  return edges;
}
function connectionClassMap(board=microBoard){
  const map=Array.from({length:16},()=>[]);
  for(const edge of microConnections(board)){
    const [a,b,label]=edge.split('-');const x=Number(a),y=Number(b);
    if(label==='h'){map[x].push('join-right');map[y].push('join-left');}
    else{map[x].push('join-down');map[y].push('join-up');}
  }
  return map;
}
function connectedGroups(board=microBoard){
  const adjacency=Array.from({length:16},()=>[]);
  for(const edge of microConnections(board)){const [a,b]=edge.split('-').map(Number);adjacency[a].push(b);adjacency[b].push(a);}
  const groups=[],seen=new Set();
  for(let cell=0;cell<16;cell++){
    if(!board[cell]||seen.has(cell))continue;
    const stack=[cell],cells=[];seen.add(cell);
    while(stack.length){const cur=stack.pop();cells.push(cur);for(const n of adjacency[cur])if(!seen.has(n)){seen.add(n);stack.push(n);}}
    groups.push(cells);
  }
  return groups;
}

function renderMicro({deal=false,dropIds=new Map(),snapIds=new Set()}={}){
  els.microBoard.innerHTML='';
  const classes=connectionClassMap();
  for(let cell=0;cell<16;cell++){
    const wrap=document.createElement('div');wrap.className='micro-cell';wrap.dataset.cell=String(cell);
    const id=microBoard[cell];
    if(id){
      const {image,q}=parsePiece(id),qc=qCoords(q),tile=document.createElement('div');
      tile.className='micro-tile';tile.dataset.id=id;tile.dataset.cell=String(cell);tile.dataset.image=String(image);tile.dataset.q=String(q);
      classes[cell].forEach(cls=>tile.classList.add(cls));
      if(deal){tile.classList.add('drop-in');tile.style.setProperty('--delay',`${cell*18}ms`);tile.style.setProperty('--deal-rows',String(4-Math.floor(cell/4)));}
      const dropRows=dropIds.get(id);if(dropRows){tile.classList.add('gravity-drop');tile.style.setProperty('--drop-rows',String(dropRows));}
      if(snapIds.has(id))tile.classList.add('snap');
      tile.style.setProperty('--img',`url("${PICTURES[image].src}")`);tile.style.setProperty('--px',`${pct(qc.c)}%`);tile.style.setProperty('--py',`${pct(qc.r)}%`);
      wrap.appendChild(tile);
    }
    els.microBoard.appendChild(wrap);
  }
  els.microMoves.textContent=`${microMoves}步`;
}

function findCompletes(board=microBoard){
  const out=[];
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){
    const cells=[r*4+c,r*4+c+1,(r+1)*4+c,(r+1)*4+c+1],ids=cells.map(i=>board[i]);
    if(ids.some(id=>!id))continue;
    const parts=ids.map(parsePiece),image=parts[0].image;
    if(parts.every((p,i)=>p.image===image&&p.q===i))out.push({image,cells,ids});
  }
  return out;
}

function gravityStepMicro(){
  const groups=connectedGroups(),groupByCell=new Map();groups.forEach((cells,i)=>cells.forEach(cell=>groupByCell.set(cell,i)));
  const memo=new Map(),visiting=new Set();
  const canMove=index=>{
    if(memo.has(index))return memo.get(index);if(visiting.has(index))return false;visiting.add(index);
    const own=new Set(groups[index]);let ok=true;
    for(const cell of groups[index]){
      const {r}=coords(cell);if(r>=3){ok=false;break;}
      const below=cell+4;if(own.has(below)||!microBoard[below])continue;
      const support=groupByCell.get(below);if(support===undefined||support===index||!canMove(support)){ok=false;break;}
    }
    visiting.delete(index);memo.set(index,ok);return ok;
  };
  const movable=groups.map((_,i)=>i).filter(canMove);if(!movable.length)return new Map();
  const next=microBoard.slice(),dropMap=new Map();
  movable.forEach(i=>groups[i].forEach(cell=>{next[cell]=null;}));
  movable.forEach(i=>groups[i].forEach(cell=>{const id=microBoard[cell];next[cell+4]=id;dropMap.set(id,1);}));
  microBoard=next;return dropMap;
}

async function animateMergedGroup(group){
  const boardRect=els.microBoard.getBoundingClientRect();
  const rects=group.cells.map(cell=>els.microBoard.querySelector(`.micro-cell[data-cell="${cell}"]`).getBoundingClientRect());
  const left=Math.min(...rects.map(r=>r.left))-boardRect.left,top=Math.min(...rects.map(r=>r.top))-boardRect.top;
  const right=Math.max(...rects.map(r=>r.right))-boardRect.left,bottom=Math.max(...rects.map(r=>r.bottom))-boardRect.top;
  group.cells.forEach((cell,i)=>{
    const tile=els.microBoard.querySelector(`.micro-tile[data-cell="${cell}"]`);
    if(tile){const dx=i%2===0?4:-4,dy=i<2?4:-4;tile.style.transform=`translate(${dx}px,${dy}px) scale(1.015)`;tile.style.filter='brightness(1.35)';}
  });
  await wait(120);
  const overlay=document.createElement('div');overlay.className='merge-card';overlay.style.left=`${left}px`;overlay.style.top=`${top}px`;overlay.style.width=`${right-left}px`;overlay.style.height=`${bottom-top}px`;overlay.style.setProperty('--img',`url("${PICTURES[group.image].src}")`);
  els.microBoard.appendChild(overlay);sound('clear',1+group.image%3);vibrate([18,18,28]);
  await wait(260);
  const target=els.collector.querySelector(`.collect-dot[data-image="${group.image}"]`);
  if(target){
    const from=overlay.getBoundingClientRect(),to=target.getBoundingClientRect(),fly=document.createElement('div');fly.className='fly-card';fly.style.backgroundImage=`url("${PICTURES[group.image].src}")`;fly.style.left=`${from.left}px`;fly.style.top=`${from.top}px`;fly.style.width=`${from.width}px`;fly.style.height=`${from.height}px`;document.body.appendChild(fly);
    fly.animate([{left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`,opacity:1,transform:'rotate(0)'},{left:`${to.left}px`,top:`${to.top}px`,width:`${to.width}px`,height:`${to.height}px`,opacity:.9,transform:'rotate(2deg)'}],{duration:430,easing:'cubic-bezier(.2,.75,.2,1)',fill:'forwards'}).finished.finally(()=>fly.remove());
  }
  await wait(300);overlay.remove();
}

async function settleAndResolve(){
  if(busy)return;busy=true;
  let guard=0;
  while(guard++<30){
    const drop=gravityStepMicro();
    if(drop.size){renderMicro({dropIds:drop});sound('drop');await wait(300);continue;}
    const complete=findCompletes();
    if(!complete.length)break;
    await Promise.all(complete.map(animateMergedGroup));
    complete.forEach(group=>{group.cells.forEach(cell=>microBoard[cell]=null);collected.add(group.image);});
    syncCollector();renderMicro();await wait(100);
  }
  if(microBoard.every(id=>!id)){
    if(collected.size===PICTURES.length){busy=false;await startBossTransition();return;}
    await wait(380);loadWave(wave+1,{deal:true});busy=false;return;
  }
  busy=false;
}

async function swapMicro(source,target){
  if(busy||source===target||source<0||target<0)return;
  const before=microConnections();
  [microBoard[source],microBoard[target]]=[microBoard[target],microBoard[source]];
  microMoves++;
  const after=microConnections(),newEdges=[...after].filter(edge=>!before.has(edge)),snapIds=new Set();
  newEdges.forEach(edge=>edge.split('-').slice(0,2).map(Number).forEach(cell=>{if(microBoard[cell])snapIds.add(microBoard[cell]);}));
  renderMicro({snapIds});
  if(newEdges.length){els.microMessage.textContent=`磁吸成功 +${newEdges.length} 边`;sound('snap',Math.min(4,newEdges.length));vibrate(12);}
  else{els.microMessage.textContent='已交换，棋盘开始结算';sound('tap');}
  await wait(newEdges.length?220:80);void settleAndResolve();
}

function findMicroHint(){
  let best=null;
  for(let a=0;a<16;a++)for(let b=a+1;b<16;b++){
    if(!microBoard[a]&&!microBoard[b])continue;
    const test=microBoard.slice();[test[a],test[b]]=[test[b],test[a]];
    const complete=findCompletes(test).length,connections=microConnections(test).size;
    const value=complete*100+connections;
    if(!best||value>best.value)best={a,b,value,complete};
  }
  return best&&best.value>microConnections().size?best:null;
}

function buildBossTarget(){
  els.bossTargetPreview.innerHTML='';
  PICTURES.forEach(p=>{const i=document.createElement('i');i.style.setProperty('--img',`url("${p.src}")`);els.bossTargetPreview.appendChild(i);});
}
function buildTransitionGrid(container){
  container.innerHTML='';
  PICTURES.forEach((p,index)=>{const i=document.createElement('i');i.style.setProperty('--img',`url("${p.src}")`);i.style.animationDelay=`${index*35}ms`;container.appendChild(i);});
}
function makeBossDeck(){
  const deck=[];
  for(let row=3;row>=0;row--)deck.push(...shuffle([row*4,row*4+1,row*4+2,row*4+3],20260918+row*101));
  return deck;
}
function currentBossImage(){return bossDeck[bossCursor];}
function nextEmptyRow(column){for(let row=3;row>=0;row--)if(bossPlaced[row*4+column]===null)return row;return-1;}
function renderBossQueue(){
  const current=currentBossImage();
  if(current===undefined){els.bossCurrentCard.style.backgroundImage='none';els.bossCurrentName.textContent='全部完成';}
  else{els.bossCurrentCard.style.setProperty('--img',`url("${PICTURES[current].src}")`);els.bossCurrentName.textContent=PICTURES[current].name;els.bossCurrentCard.dataset.image=String(current);}
  els.bossNextCards.innerHTML='';
  bossDeck.slice(bossCursor+1,bossCursor+4).forEach(image=>{const i=document.createElement('i');i.style.setProperty('--img',`url("${PICTURES[image].src}")`);els.bossNextCards.appendChild(i);});
}
function linkedCells(){
  const set=new Set();
  for(let cell=0;cell<16;cell++){
    if(bossPlaced[cell]===null)continue;const {r,c}=coords(cell);
    for(const [dr,dc] of [[0,1],[1,0]]){
      const nr=r+dr,nc=c+dc;if(nr>=4||nc>=4)continue;const n=nr*4+nc;if(bossPlaced[n]!==null){set.add(cell);set.add(n);}
    }
  }
  return set;
}
function renderBoss({dropCell=-1,rowBurst=-1}={}){
  els.bossBoard.innerHTML='';
  const linked=linkedCells();
  for(let cell=0;cell<16;cell++){
    const wrap=document.createElement('div');wrap.className='boss-cell';wrap.dataset.cell=String(cell);
    if(rowBurst===Math.floor(cell/4))wrap.classList.add('row-burst');
    const image=bossPlaced[cell];
    if(image!==null){
      const tile=document.createElement('div');tile.className='boss-tile';tile.dataset.cell=String(cell);tile.dataset.image=String(image);tile.style.setProperty('--img',`url("${PICTURES[image].src}")`);
      if(linked.has(cell))tile.classList.add('linked');
      if(cell===dropCell){tile.classList.add('dropping','new-snap');const boardHeight=els.bossBoard.clientHeight||430,cellHeight=boardHeight/4;tile.style.setProperty('--drop-distance',`${(coords(cell).r+1)*cellHeight+150}px`);tile.style.setProperty('--drop-duration',`${.38+coords(cell).r*.06}s`);}
      wrap.appendChild(tile);
    }
    els.bossBoard.appendChild(wrap);
  }
  const done=bossPlaced.filter(v=>v!==null).length;
  els.bossAccuracy.textContent=`${Math.round(done/16*100)}%`;els.bossMoves.textContent=`${bossMoves}步`;
  renderBossQueue();
}
async function dropBoss(column){
  if(busy||phase!=='boss')return;
  const image=currentBossImage();if(image===undefined)return;
  const targetColumn=image%4,targetRow=Math.floor(image/4),emptyRow=nextEmptyRow(column);
  bossMoves++;els.bossMoves.textContent=`${bossMoves}步`;
  if(column!==targetColumn||emptyRow!==targetRow){
    els.bossCurrentCard.classList.remove('wrong');void els.bossCurrentCard.offsetWidth;els.bossCurrentCard.classList.add('wrong');
    els.bossMessage.textContent=column!==targetColumn?`这张「${PICTURES[image].name}」不属于第${column+1}列`:'这一列要先从更下方开始';
    els.bossColumns.querySelector(`[data-column="${targetColumn}"]`)?.classList.add('active');setTimeout(()=>els.bossColumns.querySelector(`[data-column="${targetColumn}"]`)?.classList.remove('active'),900);
    sound('wrong');vibrate([10,25,10]);return;
  }
  busy=true;bossPlaced[targetRow*4+column]=image;bossCursor++;
  const newCell=targetRow*4+column,rowComplete=[0,1,2,3].every(c=>bossPlaced[targetRow*4+c]!==null);
  renderBoss({dropCell:newCell,rowBurst:rowComplete?targetRow:-1});
  els.bossMessage.textContent=rowComplete?`第${targetRow+1}行吸附完成！`:`${PICTURES[image].name}已落位并锁定`;
  sound(rowComplete?'row':'boss',4-targetRow);vibrate(rowComplete?[16,18,30]:12);
  await wait(rowComplete?720:500);busy=false;
  if(bossCursor>=bossDeck.length)await finishBoss();
}
async function startBossTransition(){
  buildTransitionGrid(els.transitionGrid);els.transition.classList.add('is-visible');sound('win');vibrate([25,35,45]);
  await wait(1650);els.transition.classList.remove('is-visible');enterBoss();
}
function enterBoss(){
  phase='boss';busy=false;drag=null;collected=new Set(PICTURES.map((_,i)=>i));syncCollector();
  els.microStage.classList.remove('is-visible');els.bossStage.classList.add('is-visible');els.skipBossBtn.hidden=true;
  els.stageKicker.textContent='阶段 2 · BOSS 下落合成';els.stageTitle.textContent='16张小图 → 1幅祝福画卷';els.phaseText.textContent='终极阶段';
  bossDeck=makeBossDeck();bossCursor=0;bossPlaced=Array(16).fill(null);bossMoves=0;buildBossTarget();renderBoss();
  els.bossMessage.textContent='拖动当前小图到正确列；它会自然掉落并吸附';sound('boss');
}
async function finishBoss(){
  if(phase==='done')return;phase='done';els.bossBoard.classList.add('solved');els.bossAccuracy.textContent='100%';sound('win');vibrate([30,25,50,25,80]);
  await wait(1450);buildTransitionGrid(els.finishCollage);els.finishMicroMoves.textContent=String(microMoves);els.finishBossMoves.textContent=String(bossMoves);els.finish.classList.add('is-visible');
}

function hint(){
  document.querySelectorAll('.hint,.active').forEach(node=>node.classList.remove('hint','active'));
  if(phase==='micro'){
    const h=findMicroHint();
    if(!h){els.microMessage.textContent='当前没有一步完成，先把同图碎片靠近';return;}
    [h.a,h.b].forEach(cell=>els.microBoard.querySelector(`.micro-tile[data-cell="${cell}"]`)?.classList.add('hint'));
    els.microMessage.textContent=h.complete?`交换这两块可立即合成${h.complete}张小图`:'交换这两块可以增加正确吸附边';
  }else if(phase==='boss'){
    const image=currentBossImage();if(image===undefined)return;const column=image%4;
    els.bossCurrentCard.classList.add('wrong');setTimeout(()=>els.bossCurrentCard.classList.remove('wrong'),460);
    els.bossColumns.querySelector(`[data-column="${column}"]`)?.classList.add('active');
    els.bossMessage.textContent=`${PICTURES[image].name}应该落入第${column+1}列`;
  }
  sound('tap');
}

function bindMicroDrag(){
  els.microBoard.addEventListener('pointerdown',event=>{
    const tile=event.target.closest('.micro-tile');if(!tile||busy||phase!=='micro')return;
    try{tile.setPointerCapture(event.pointerId);}catch(_){}
    drag={kind:'micro',tile,source:Number(tile.dataset.cell),pointer:event.pointerId,x:event.clientX,y:event.clientY,dx:0,dy:0};tile.classList.add('dragging');sound();
  });
  els.microBoard.addEventListener('pointermove',event=>{
    if(!drag||drag.kind!=='micro'||drag.pointer!==event.pointerId)return;event.preventDefault();drag.dx=event.clientX-drag.x;drag.dy=event.clientY-drag.y;drag.tile.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.035)`;
  },{passive:false});
  const end=event=>{
    if(!drag||drag.kind!=='micro'||drag.pointer!==event.pointerId)return;
    const d=drag;drag=null;d.tile.classList.remove('dragging');d.tile.style.transform='';
    const rect=els.microBoard.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top,c=Math.floor(x/(rect.width/4)),r=Math.floor(y/(rect.height/4));
    const target=r>=0&&r<4&&c>=0&&c<4?r*4+c:-1;if(target<0||Math.hypot(d.dx,d.dy)<8)return;
    void swapMicro(d.source,target);
  };
  els.microBoard.addEventListener('pointerup',end);els.microBoard.addEventListener('pointercancel',end);
}
function bindBossDrag(){
  els.bossCurrentCard.addEventListener('pointerdown',event=>{
    if(busy||phase!=='boss'||currentBossImage()===undefined)return;
    try{els.bossCurrentCard.setPointerCapture(event.pointerId);}catch(_){}
    drag={kind:'boss',pointer:event.pointerId,x:event.clientX,y:event.clientY,dx:0,dy:0};els.bossCurrentCard.classList.add('dragging');sound();
  });
  els.bossCurrentCard.addEventListener('pointermove',event=>{
    if(!drag||drag.kind!=='boss'||drag.pointer!==event.pointerId)return;event.preventDefault();drag.dx=event.clientX-drag.x;drag.dy=event.clientY-drag.y;els.bossCurrentCard.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.06)`;
  },{passive:false});
  const end=event=>{
    if(!drag||drag.kind!=='boss'||drag.pointer!==event.pointerId)return;
    const d=drag;drag=null;els.bossCurrentCard.classList.remove('dragging');els.bossCurrentCard.style.transform='';
    const rect=els.bossBoard.getBoundingClientRect(),x=event.clientX-rect.left,column=Math.floor(x/(rect.width/4));
    if(column>=0&&column<4&&event.clientY>=rect.top-80&&event.clientY<=rect.bottom+20&&Math.hypot(d.dx,d.dy)>8)void dropBoss(column);
  };
  els.bossCurrentCard.addEventListener('pointerup',end);els.bossCurrentCard.addEventListener('pointercancel',end);
  els.bossColumns.addEventListener('click',event=>{const button=event.target.closest('[data-column]');if(button)void dropBoss(Number(button.dataset.column));});
}

function reset(){
  phase='micro';wave=0;microMoves=0;bossMoves=0;bossCursor=0;bossDeck=[];bossPlaced=Array(16).fill(null);busy=false;drag=null;collected.clear();
  els.finish.classList.remove('is-visible');els.transition.classList.remove('is-visible');els.bossBoard.classList.remove('solved');
  buildCollector();syncCollector();loadWave(0,{deal:true});
}
function forceBoss(){collected=new Set(PICTURES.map((_,i)=>i));syncCollector();enterBoss();}
function solveBoss(){if(phase!=='boss')forceBoss();bossPlaced=PICTURES.map((_,i)=>i);bossCursor=16;renderBoss();void finishBoss();}
function autoCompleteWave(){
  microBoard=Array(16).fill(null);
  for(let local=0;local<4;local++){const image=wave*4+local;BLOCKS[local].forEach((cell,q)=>microBoard[cell]=pieceId(image,q));}
  renderMicro();void settleAndResolve();
}

els.hintBtn.addEventListener('click',hint);els.restartBtn.addEventListener('click',reset);els.skipBossBtn.addEventListener('click',forceBoss);els.againBtn.addEventListener('click',reset);
bindMicroDrag();bindBossDrag();preload();
document.addEventListener('pointerdown',()=>{if(audioCtx?.state==='suspended')void audioCtx.resume();},{once:true});
window.__BOSS_DEMO__={
  version:VERSION,
  state:()=>({phase,wave,collected:collected.size,microMoves,bossMoves,microBoard:microBoard.slice(),bossCursor,bossDeck:bossDeck.slice(),bossPlaced:bossPlaced.slice()}),
  enterBoss:forceBoss,solveBoss,reset,autoCompleteWave,
  dropCorrect:()=>{const image=currentBossImage();if(image!==undefined)return dropBoss(image%4);}
};
reset();
})();