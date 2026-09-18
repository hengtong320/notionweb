(() => {
'use strict';

const VERSION='3.0.0';
const MASTER_URL='assets/pictures-portrait/30-library.webp';
const MACRO_N=4;
const MICRO_N=2;
const STAGE1_N=4;
const STAGE2_N=5;
const TOTAL_MACROS=MACRO_N*MACRO_N;
const img=new Image();
img.decoding='async';
img.src=MASTER_URL;

const $=id=>document.getElementById(id);
const els={
  canvas:$('gameCanvas'),map:$('masterMap'),loading:$('loading'),toast:$('toast'),
  kicker:$('stageKicker'),title:$('stageTitle'),goalLabel:$('goalLabel'),goalValue:$('goalValue'),progress:$('progressFill'),
  deckTitle:$('deckTitle'),deckCount:$('deckCount'),deckPreview:$('deckPreview'),message:$('message'),moveCount:$('moveCount'),
  hint:$('hintBtn'),restart:$('restartBtn'),quick:$('quickBtn'),transition:$('transition'),transitionCanvas:$('transitionCanvas'),
  transitionKicker:$('transitionKicker'),transitionTitle:$('transitionTitle'),transitionText:$('transitionText'),
  finish:$('finish'),microMoves:$('microMoves'),bossMoves:$('bossMoves'),again:$('againBtn')
};
const ctx=els.canvas.getContext('2d',{alpha:false});
const mapCtx=els.map.getContext('2d');
const transitionCtx=els.transitionCanvas.getContext('2d');

let dpr=1,W=1,H=1,raf=0,last=performance.now(),audioCtx=null,toastTimer=0;
const state={
  stage:1,boardN:STAGE1_N,board:[],decks:[],pieceDefs:new Map(),collected:new Set(),moves:[0,0],snaps:0,
  busy:true,drag:null,anims:new Map(),mergeFx:[],particles:[],hintIds:new Set(),hintUntil:0,
  boardRect:null,cellW:0,cellH:0,gap:3
};

function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function lerp(a,b,t){return a+(b-a)*t;}
function easeOutCubic(t){return 1-Math.pow(1-t,3);}
function easeOutBack(t){const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);}
function wait(ms){return new Promise(r=>setTimeout(r,ms));}
function seeded(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,seed){const r=seeded(seed);for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function rc(index,n=state.boardN){return{r:Math.floor(index/n),c:index%n};}
function idx(r,c,n=state.boardN){return r*n+c;}
function key(a,b){return a<b?`${a}|${b}`:`${b}|${a}`;}
function buzz(pattern=10){try{navigator.vibrate?.(pattern);}catch(_){}}
function sound(type='tap',level=1){
  try{
    if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended')audioCtx.resume();
    const now=audioCtx.currentTime,notes=type==='snap'?[510,690]:type==='merge'?[360,540,810]:type==='deal'?[260]:type==='win'?[392,523,659,784]:[300];
    notes.forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=i?'triangle':'sine';o.connect(g);g.connect(audioCtx.destination);const st=now+i*.035;o.frequency.setValueAtTime(f*(1+(level-1)*.03),st);g.gain.setValueAtTime(.0001,st);g.gain.exponentialRampToValueAtTime(type==='tap'?.035:.075,st+.012);g.gain.exponentialRampToValueAtTime(.0001,st+(type==='win'?.46:.22));o.start(st);o.stop(st+(type==='win'?.5:.25));});
  }catch(_){ }
}
function toast(text,ms=1400){clearTimeout(toastTimer);els.toast.textContent=text;els.toast.classList.add('is-visible');toastTimer=setTimeout(()=>els.toast.classList.remove('is-visible'),ms);}

function resize(){
  const r=els.canvas.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=Math.max(1,r.width);H=Math.max(1,r.height);els.canvas.width=Math.round(W*dpr);els.canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  const mr=els.map.getBoundingClientRect();els.map.width=Math.round(mr.width*dpr);els.map.height=Math.round(mr.height*dpr);mapCtx.setTransform(dpr,0,0,dpr,0,0);
  layoutBoard();drawMap();updateDeckPreview();
}
function layoutBoard(){
  const n=state.boardN,top=10,bottom=10,maxW=W-14,maxH=H-top-bottom;
  let bw=Math.min(maxW,maxH*.75),bh=bw/.75;if(bh>maxH){bh=maxH;bw=bh*.75;}
  const x=(W-bw)/2,y=top+(maxH-bh)/2;state.boardRect={x,y,w:bw,h:bh};state.cellW=bw/n;state.cellH=bh/n;state.gap=n===5?2:3;
}
function cellRect(cell,expand={}){
  const {r,c}=rc(cell),g=state.gap,x=state.boardRect.x+c*state.cellW+g/2,y=state.boardRect.y+r*state.cellH+g/2;
  let w=state.cellW-g,h=state.cellH-g,xx=x,yy=y;
  if(expand.left){xx-=g/2;w+=g/2;}if(expand.right)w+=g/2;if(expand.up){yy-=g/2;h+=g/2;}if(expand.down)h+=g/2;
  return{x:Math.round(xx*2)/2,y:Math.round(yy*2)/2,w:Math.round(w*2)/2,h:Math.round(h*2)/2};
}
function cellAt(x,y){const b=state.boardRect;if(x<b.x||x>b.x+b.w||y<b.y||y>b.y+b.h)return-1;const c=clamp(Math.floor((x-b.x)/state.cellW),0,state.boardN-1),r=clamp(Math.floor((y-b.y)/state.cellH),0,state.boardN-1);return idx(r,c);}
function centerOfCell(cell){const r=cellRect(cell);return{x:r.x+r.w/2,y:r.y+r.h/2};}

function microDef(macro,q){return{id:`p-${macro}-${q}`,kind:'micro',macro,q};}
function macroDef(macro){return{id:`m-${macro}`,kind:'macro',macro,q:0};}
function targetCoord(def){
  if(def.kind==='micro')return{r:def.q>1?1:0,c:def.q%2};
  return{r:Math.floor(def.macro/MACRO_N),c:def.macro%MACRO_N};
}
function sourceRect(def){
  if(def.kind==='micro'){
    const mr=Math.floor(def.macro/MACRO_N),mc=def.macro%MACRO_N,qr=def.q>1?1:0,qc=def.q%2,n=MACRO_N*MICRO_N;
    return{x:(mc*2+qc)/n,y:(mr*2+qr)/n,w:1/n,h:1/n};
  }
  const mr=Math.floor(def.macro/MACRO_N),mc=def.macro%MACRO_N;
  return{x:mc/MACRO_N,y:mr/MACRO_N,w:1/MACRO_N,h:1/MACRO_N};
}
function drawCrop(c,def,r,alpha=1){
  const s=sourceRect(def);c.save();c.globalAlpha=alpha;c.drawImage(img,s.x*img.naturalWidth,s.y*img.naturalHeight,s.w*img.naturalWidth,s.h*img.naturalHeight,r.x,r.y,r.w,r.h);c.restore();
}
function drawMacroCrop(c,macro,r,alpha=1){drawCrop(c,macroDef(macro),r,alpha);}
function drawFull(c,r,alpha=1){c.save();c.globalAlpha=alpha;c.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,r.x,r.y,r.w,r.h);c.restore();}

function boardPositions(board=state.board){const m=new Map();board.forEach((id,i)=>{if(id)m.set(id,i);});return m;}
function correctPair(idA,idB,cellA,cellB){
  const a=state.pieceDefs.get(idA),b=state.pieceDefs.get(idB);if(!a||!b)return false;if(state.stage===1&&a.macro!==b.macro)return false;
  const ba=rc(cellA),bb=rc(cellB),ta=targetCoord(a),tb=targetCoord(b),dr=bb.r-ba.r,dc=bb.c-ba.c;
  return Math.abs(dr)+Math.abs(dc)===1&&dr===tb.r-ta.r&&dc===tb.c-ta.c;
}
function computeGroups(board=state.board){
  const ids=board.filter(Boolean),parent=new Map(ids.map(id=>[id,id]));
  const find=x=>{let p=parent.get(x);while(p!==parent.get(p))p=parent.get(p);let y=x;while(parent.get(y)!==p){const n=parent.get(y);parent.set(y,p);y=n;}return p;};
  const union=(a,b)=>{const ra=find(a),rb=find(b);if(ra!==rb)parent.set(rb,ra);};
  const conns=new Map(ids.map(id=>[id,{left:false,right:false,up:false,down:false}]));
  board.forEach((idA,cell)=>{
    if(!idA)return;const {r,c}=rc(cell);
    [[0,1,'right','left'],[1,0,'down','up']].forEach(([dr,dc,da,db])=>{const nr=r+dr,nc=c+dc;if(nr>=state.boardN||nc>=state.boardN)return;const ni=idx(nr,nc),idB=board[ni];if(idB&&correctPair(idA,idB,cell,ni)){union(idA,idB);conns.get(idA)[da]=true;conns.get(idB)[db]=true;}});
  });
  const map=new Map();ids.forEach(id=>{const root=find(id);if(!map.has(root))map.set(root,[]);map.get(root).push(id);});
  const positions=boardPositions(board),groups=[...map.values()].map(ids=>({ids,cells:ids.map(id=>positions.get(id)),size:ids.length}));
  return{groups,conns,positions};
}
function groupFor(id,board=state.board){return computeGroups(board).groups.find(g=>g.ids.includes(id))||{ids:[id],cells:[board.indexOf(id)],size:1};}
function connectionCount(board=state.board){const {conns}=computeGroups(board);let count=0;for(const c of conns.values())count+=(c.right?1:0)+(c.down?1:0);return count;}
function stage1Completes(board=state.board){return computeGroups(board).groups.filter(g=>g.size===4&&new Set(g.ids.map(id=>state.pieceDefs.get(id)?.macro)).size===1);}
function stage2Complete(board=state.board){return computeGroups(board).groups.find(g=>g.size===TOTAL_MACROS)||null;}

function makeStage1Decks(){
  state.pieceDefs.clear();const sequence=[];
  for(let batch=0;batch<4;batch++){
    const batchIds=[];for(let macro=batch*4;macro<batch*4+4;macro++)for(let q=0;q<4;q++){const d=microDef(macro,q);state.pieceDefs.set(d.id,d);batchIds.push(d.id);}
    sequence.push(...shuffle(batchIds,20260918+batch*101));
  }
  const decks=Array.from({length:STAGE1_N},()=>[]);sequence.forEach((id,i)=>decks[i%STAGE1_N].push(id));return decks;
}
function makeStage2Decks(){
  state.pieceDefs.clear();const ids=[];for(let macro=0;macro<TOTAL_MACROS;macro++){const d=macroDef(macro);state.pieceDefs.set(d.id,d);ids.push(d.id);}
  shuffle(ids,20260918303);const decks=Array.from({length:STAGE2_N},()=>[]);ids.forEach((id,i)=>decks[i%STAGE2_N].push(id));return decks;
}
function remainingDeck(){return state.decks.reduce((n,d)=>n+d.length,0);}

function setAnim(id,from,to,duration=190,ease=easeOutCubic){state.anims.set(id,{from,to,start:performance.now(),duration,ease});}
function renderRectFor(id,cell){
  const a=state.anims.get(id);if(a){const t=clamp((performance.now()-a.start)/a.duration,0,1),e=a.ease(t);if(t>=1)state.anims.delete(id);else return{x:lerp(a.from.x,a.to.x,e),y:lerp(a.from.y,a.to.y,e),w:lerp(a.from.w,a.to.w,e),h:lerp(a.from.h,a.to.h,e)};}
  return cellRect(cell);
}
async function animateBoardChange(oldBoard,newBoard,duration=190,startOverrides=new Map()){
  const oldPos=boardPositions(oldBoard),newPos=boardPositions(newBoard);state.board=newBoard;
  for(const [id,cell] of newPos){const to=cellRect(cell),from=startOverrides.get(id)||((oldPos.has(id))?cellRect(oldPos.get(id)):to);setAnim(id,from,to,duration,easeOutBack);}
  await wait(duration+15);
}

async function dealRound(){
  const old=state.board.slice(),next=state.board.slice(),starts=new Map();let dealt=0;
  for(let c=0;c<state.boardN;c++){
    if(next[c]||!state.decks[c]?.length)continue;const id=state.decks[c].shift();next[c]=id;const r=cellRect(c);starts.set(id,{x:r.x,y:state.boardRect.y-r.h*.95,w:r.w,h:r.h});dealt++;
  }
  if(!dealt)return false;updateDeckPreview();sound('deal');await animateBoardChange(old,next,180,starts);await settleGravity();return true;
}
async function dealUntilBlocked(){let guard=0,any=false;while(guard++<16){const dealt=await dealRound();if(!dealt)break;any=true;}return any;}

async function settleGravity(){
  let guard=0,movedAny=false;
  while(guard++<24){
    const old=state.board.slice(),work=state.board.slice(),groups=computeGroups(work).groups.sort((a,b)=>Math.max(...b.cells.map(c=>rc(c).r))-Math.max(...a.cells.map(c=>rc(c).r)));let moved=false;
    for(const group of groups){
      const pos=boardPositions(work),cells=group.ids.map(id=>pos.get(id)).filter(Number.isInteger),own=new Set(cells);if(!cells.length)continue;
      const can=cells.every(cell=>{const {r}=rc(cell);if(r>=state.boardN-1)return false;const below=cell+state.boardN;return own.has(below)||!work[below];});
      if(!can)continue;const vals=cells.map(cell=>work[cell]);cells.forEach(cell=>work[cell]=null);cells.forEach((cell,i)=>work[cell+state.boardN]=vals[i]);moved=true;
    }
    if(!moved)break;movedAny=true;await animateBoardChange(old,work,145);
  }
  return movedAny;
}

function planMove(group,anchorId,targetCell){
  if(targetCell<0)return null;const pos=boardPositions(),anchorCell=pos.get(anchorId);if(anchorCell===undefined)return null;const a=rc(anchorCell),t=rc(targetCell),dr=t.r-a.r,dc=t.c-a.c;if(!dr&&!dc)return null;
  const sourceCells=group.ids.map(id=>pos.get(id)),targets=sourceCells.map(cell=>{const p=rc(cell);return{r:p.r+dr,c:p.c+dc};});if(targets.some(p=>p.r<0||p.c<0||p.r>=state.boardN||p.c>=state.boardN))return null;
  const targetCells=targets.map(p=>idx(p.r,p.c)),moving=new Set(group.ids),sourceSet=new Set(sourceCells),groups=computeGroups().groups,groupSize=new Map();groups.forEach(g=>g.ids.forEach(id=>groupSize.set(id,g.size)));
  const displaced=[];targetCells.forEach(cell=>{const id=state.board[cell];if(id&&!moving.has(id)&&!displaced.includes(id))displaced.push(id);});
  if(displaced.some(id=>(groupSize.get(id)||1)>1))return null;
  const vacated=sourceCells.filter(cell=>!targetCells.includes(cell));if(displaced.length>vacated.length)return null;
  const next=state.board.slice();sourceCells.forEach(cell=>next[cell]=null);group.ids.forEach((id,i)=>next[targetCells[i]]=id);displaced.forEach((id,i)=>next[vacated[i]]=id);
  return{board:next,dr,dc,targetCell,displaced,sourceCells,targetCells,score:0};
}
function completeScore(board){return state.stage===1?stage1Completes(board).length*20:(stage2Complete(board)?200:0);}
function findBestPlan(group,anchorId,x,y){
  const nearest=cellAt(x,y);if(nearest<0)return null;const base=rc(nearest),before=connectionCount()+completeScore(state.board);let best=null;
  for(let rr=base.r-1;rr<=base.r+1;rr++)for(let cc=base.c-1;cc<=base.c+1;cc++){
    if(rr<0||cc<0||rr>=state.boardN||cc>=state.boardN)continue;const cell=idx(rr,cc),plan=planMove(group,anchorId,cell);if(!plan)continue;const ctr=centerOfCell(cell),dist=Math.hypot(x-ctr.x,y-ctr.y),gain=connectionCount(plan.board)+completeScore(plan.board)-before;plan.score=gain*100-dist;
    if(!best||plan.score>best.score)best=plan;
  }
  return best;
}

async function commitMove(plan,group){
  if(!plan)return;state.busy=true;const old=state.board.slice(),before=connectionCount(old);state.moves[state.stage-1]++;await animateBoardChange(old,plan.board,190);const after=connectionCount(state.board),gained=Math.max(0,after-before);
  if(gained){state.snaps+=gained;sound('snap',Math.min(4,gained+1));buzz(gained>1?[10,18,14]:10);spawnSnapParticles(group.ids);toast(`磁吸成功 +${gained}边`,900);}else sound('tap');
  updateUI();await resolveBoard();state.busy=false;
}

function spawnSnapParticles(ids){const pos=boardPositions();ids.forEach(id=>{const cell=pos.get(id);if(cell===undefined)return;const c=centerOfCell(cell);for(let i=0;i<7;i++)state.particles.push({x:c.x,y:c.y,vx:(Math.random()-.5)*2.2,vy:(Math.random()-.5)*2.2-1,life:1,color:i%2?'#ffe576':'#6eeaff'});});}
function addMergeFx(group){const cells=group.cells,rects=cells.map(cell=>cellRect(cell)),x=Math.min(...rects.map(r=>r.x)),y=Math.min(...rects.map(r=>r.y)),right=Math.max(...rects.map(r=>r.x+r.w)),bottom=Math.max(...rects.map(r=>r.y+r.h)),macro=state.pieceDefs.get(group.ids[0]).macro;state.mergeFx.push({macro,x,y,w:right-x,h:bottom-y,start:performance.now(),duration:520});}
async function clearStage1Groups(groups){
  groups.forEach(addMergeFx);sound('merge',2);buzz([18,22,26]);await wait(430);
  const old=state.board.slice(),next=state.board.slice();groups.forEach(g=>{const macro=state.pieceDefs.get(g.ids[0]).macro;state.collected.add(macro);g.cells.forEach(cell=>next[cell]=null);});state.board=next;drawMap();updateUI();toast(`小图合成完成 · ${state.collected.size}/16`,1100);await wait(110);await settleGravity();await dealUntilBlocked();
}
async function resolveBoard(){
  await settleGravity();let guard=0;
  while(state.stage===1&&guard++<16){const complete=stage1Completes();if(complete.length){await clearStage1Groups(complete);continue;}const dealt=await dealUntilBlocked();if(dealt){await settleGravity();continue;}break;}
  if(state.stage===1&&state.collected.size===TOTAL_MACROS){await transitionToStage2();return;}
  if(state.stage===2&&stage2Complete()){await finishStage2();return;}
  updateUI();
}

function buildMapCanvas(){drawMap();}
function drawMap(){
  const r=els.map.getBoundingClientRect(),w=r.width,h=r.height;if(!w||!h||!img.complete)return;mapCtx.clearRect(0,0,w,h);mapCtx.fillStyle='#06162e';mapCtx.fillRect(0,0,w,h);
  const imageW=Math.min(w-16,h*.75),imageH=imageW/.75,x=(w-imageW)/2,y=(h-imageH)/2;mapCtx.globalAlpha=.18;mapCtx.drawImage(img,x,y,imageW,imageH);mapCtx.globalAlpha=1;
  if(state.stage===1){for(const macro of state.collected){const mr=Math.floor(macro/4),mc=macro%4,cell={x:x+mc*imageW/4,y:y+mr*imageH/4,w:imageW/4,h:imageH/4};drawMacroCrop(mapCtx,macro,cell,1);mapCtx.strokeStyle='#ffe16a';mapCtx.lineWidth=1.5;mapCtx.strokeRect(cell.x+.5,cell.y+.5,cell.w-1,cell.h-1);}}
  else{mapCtx.globalAlpha=.55;mapCtx.drawImage(img,x,y,imageW,imageH);mapCtx.globalAlpha=1;const group=computeGroups().groups.sort((a,b)=>b.size-a.size)[0];if(group)for(const id of group.ids){const macro=state.pieceDefs.get(id).macro,mr=Math.floor(macro/4),mc=macro%4;mapCtx.strokeStyle='#ffe16a';mapCtx.lineWidth=2;mapCtx.strokeRect(x+mc*imageW/4+1,y+mr*imageH/4+1,imageW/4-2,imageH/4-2);}}
}

function updateDeckPreview(){
  els.deckPreview.innerHTML='';const ids=[];for(let c=0;c<state.decks.length;c++)if(state.decks[c]?.[0])ids.push(state.decks[c][0]);ids.slice(0,5).forEach(id=>{const wrap=document.createElement('div');wrap.className='deck-card';const cv=document.createElement('canvas');cv.width=50;cv.height=68;const c=cv.getContext('2d'),def=state.pieceDefs.get(id);drawCrop(c,def,{x:0,y:0,w:50,h:68});wrap.appendChild(cv);els.deckPreview.appendChild(wrap);});els.deckCount.textContent=String(remainingDeck());
}
function updateUI(){
  if(state.stage===1){els.kicker.textContent='阶段一 · 小图消除';els.title.textContent='4块拼成1张小图';els.goalLabel.textContent='先拼出16张局部小图';els.goalValue.textContent=`${state.collected.size} / 16`;els.progress.style.width=`${state.collected.size/16*100}%`;els.deckTitle.textContent='待发碎片';els.quick.textContent='直接看最终大图';els.moveCount.textContent=`${state.moves[0]}步`;}
  else{const largest=Math.max(0,...computeGroups().groups.map(g=>g.size));els.kicker.textContent='阶段二 · 大图合成';els.title.textContent='16张小图再拼1张大图';els.goalLabel.textContent='让16张小图正确相邻并吸附';els.goalValue.textContent=`最大组合 ${largest} / 16`;els.progress.style.width=`${largest/16*100}%`;els.deckTitle.textContent='待发小图';els.quick.textContent='自动完成大图';els.moveCount.textContent=`${state.moves[1]}步`;}
  updateDeckPreview();drawMap();
}

async function startStage1(){
  state.stage=1;state.boardN=STAGE1_N;state.board=Array(STAGE1_N*STAGE1_N).fill(null);state.decks=makeStage1Decks();state.collected.clear();state.moves=[0,0];state.snaps=0;state.busy=true;state.drag=null;state.anims.clear();state.mergeFx=[];state.particles=[];layoutBoard();updateUI();await dealUntilBlocked();state.busy=false;toast('碎片会像发牌一样下落；先拼出16张小图',1900);
}
async function transitionToStage2(){
  state.busy=true;drawTransitionCanvas();els.transition.classList.add('is-visible');sound('win');buzz([20,30,40]);await wait(1550);els.transition.classList.remove('is-visible');await startStage2();
}
async function startStage2(){
  state.stage=2;state.boardN=STAGE2_N;state.board=Array(STAGE2_N*STAGE2_N).fill(null);state.decks=makeStage2Decks();state.busy=true;state.drag=null;state.anims.clear();state.mergeFx=[];state.particles=[];layoutBoard();updateUI();await dealUntilBlocked();state.busy=false;toast('16张刚完成的小图重新出现：再拼成真正完整大图',2200);
}
function drawTransitionCanvas(){
  const r=els.transitionCanvas.getBoundingClientRect(),p=Math.min(2,window.devicePixelRatio||1);els.transitionCanvas.width=Math.round(r.width*p);els.transitionCanvas.height=Math.round(r.height*p);transitionCtx.setTransform(p,0,0,p,0,0);transitionCtx.clearRect(0,0,r.width,r.height);transitionCtx.fillStyle='#07152c';transitionCtx.fillRect(0,0,r.width,r.height);const gap=3,cw=(r.width-gap*5)/4,ch=(r.height-gap*5)/4;for(let m=0;m<16;m++){const rr=Math.floor(m/4),cc=m%4,rect={x:gap+cc*(cw+gap),y:gap+rr*(ch+gap),w:cw,h:ch};drawMacroCrop(transitionCtx,m,rect);transitionCtx.strokeStyle='rgba(255,227,112,.85)';transitionCtx.strokeRect(rect.x+.5,rect.y+.5,rect.w-1,rect.h-1);}}
async function finishStage2(){
  if(state.busy&&state.stage===2&&els.finish.classList.contains('is-visible'))return;state.busy=true;sound('win');buzz([30,25,50,25,80]);toast('16张小图吸附完成，正在融合成完整大图…',1600);await wait(1250);els.microMoves.textContent=String(state.moves[0]);els.bossMoves.textContent=String(state.moves[1]);els.finish.classList.add('is-visible');
}

function joinedDirections(id,cell,conns){return conns.get(id)||{left:false,right:false,up:false,down:false};}
function drawPiece(id,cell,rect,conns,alpha=1){
  const def=state.pieceDefs.get(id),joins=joinedDirections(id,cell,conns),r={...rect};const g=state.gap/2;if(joins.left){r.x-=g;r.w+=g;}if(joins.right)r.w+=g;if(joins.up){r.y-=g;r.h+=g;}if(joins.down)r.h+=g;
  ctx.save();ctx.globalAlpha=alpha;ctx.beginPath();ctx.rect(r.x,r.y,r.w,r.h);ctx.clip();drawCrop(ctx,def,r);ctx.restore();
  ctx.save();ctx.strokeStyle=state.hintIds.has(id)?'#ffe26e':'rgba(255,255,255,.72)';ctx.lineWidth=state.hintIds.has(id)?3:1.25;ctx.shadowColor=state.hintIds.has(id)?'#ffe26e':'transparent';ctx.shadowBlur=state.hintIds.has(id)?15:0;ctx.beginPath();if(!joins.up){ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+r.w,r.y);}if(!joins.right){ctx.moveTo(r.x+r.w,r.y);ctx.lineTo(r.x+r.w,r.y+r.h);}if(!joins.down){ctx.moveTo(r.x+r.w,r.y+r.h);ctx.lineTo(r.x,r.y+r.h);}if(!joins.left){ctx.moveTo(r.x,r.y+r.h);ctx.lineTo(r.x,r.y);}ctx.stroke();ctx.restore();
}
function drawBoardBackground(){
  const b=state.boardRect;ctx.fillStyle='#07162e';ctx.fillRect(0,0,W,H);const bg=ctx.createLinearGradient(0,b.y,0,b.y+b.h);bg.addColorStop(0,'rgba(62,155,218,.25)');bg.addColorStop(1,'rgba(3,14,33,.96)');ctx.fillStyle=bg;roundRect(ctx,b.x,b.y,b.w,b.h,16);ctx.fill();ctx.strokeStyle='rgba(126,225,255,.38)';ctx.lineWidth=1.2;ctx.stroke();
  for(let i=0;i<state.board.length;i++){const r=cellRect(i);ctx.fillStyle='rgba(255,255,255,.035)';roundRect(ctx,r.x,r.y,r.w,r.h,5);ctx.fill();}
  if(state.drag?.plan){const moving=new Set(state.drag.group.ids),positions=boardPositions(state.drag.plan.board);ctx.save();ctx.strokeStyle=state.drag.plan.score>0?'#ffe36f':'#73eaff';ctx.lineWidth=3;ctx.setLineDash([7,5]);for(const id of moving){const cell=positions.get(id);if(cell===undefined)continue;const r=cellRect(cell);ctx.strokeRect(r.x+1.5,r.y+1.5,r.w-3,r.h-3);}ctx.restore();}
}
function roundRect(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function drawMergeEffects(now){
  for(let i=state.mergeFx.length-1;i>=0;i--){const f=state.mergeFx[i],t=clamp((now-f.start)/f.duration,0,1),s=1+Math.sin(t*Math.PI)*.06,rect={x:f.x+f.w*(1-s)/2,y:f.y+f.h*(1-s)/2,w:f.w*s,h:f.h*s};ctx.save();ctx.shadowColor='#ffe36f';ctx.shadowBlur=28*(1-t);drawMacroCrop(ctx,f.macro,rect,1);ctx.strokeStyle=`rgba(255,230,105,${1-t})`;ctx.lineWidth=4;ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);ctx.restore();if(t>=1)state.mergeFx.splice(i,1);}
}
function drawParticles(){for(let i=state.particles.length-1;i>=0;i--){const p=state.particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.life-=.035;if(p.life<=0){state.particles.splice(i,1);continue;}ctx.globalAlpha=p.life;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.6*p.life,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
function frame(now){
  const dt=Math.min(32,now-last);last=now;ctx.clearRect(0,0,W,H);drawBoardBackground();const {conns,positions}=computeGroups();const dragged=new Set(state.drag?.group?.ids||[]);
  for(const [id,cell] of positions){if(dragged.has(id))continue;drawPiece(id,cell,renderRectFor(id,cell),conns);}
  if(state.drag){const {dx,dy}=state.drag;for(const id of state.drag.group.ids){const cell=positions.get(id);if(cell===undefined)continue;const r=cellRect(cell),rr={x:r.x+dx,y:r.y+dy,w:r.w,h:r.h};ctx.save();ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=18;drawPiece(id,cell,rr,conns,.98);ctx.restore();}}
  drawMergeEffects(now);drawParticles();if(state.hintUntil&&now>state.hintUntil){state.hintIds.clear();state.hintUntil=0;}raf=requestAnimationFrame(frame);
}

function pointerPos(e){const r=els.canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
els.canvas.addEventListener('pointerdown',e=>{
  if(state.busy)return;const p=pointerPos(e),cell=cellAt(p.x,p.y),id=cell>=0?state.board[cell]:null;if(!id)return;const group=groupFor(id);state.drag={pointerId:e.pointerId,id,group,startX:p.x,startY:p.y,dx:0,dy:0,plan:null};try{els.canvas.setPointerCapture(e.pointerId);}catch(_){}sound('tap');
});
els.canvas.addEventListener('pointermove',e=>{
  const d=state.drag;if(!d||d.pointerId!==e.pointerId)return;e.preventDefault();const p=pointerPos(e);d.dx=p.x-d.startX;d.dy=p.y-d.startY;d.plan=findBestPlan(d.group,d.id,p.x,p.y);
},{passive:false});
async function endPointer(e){
  const d=state.drag;if(!d||d.pointerId!==e.pointerId)return;state.drag=null;const moved=Math.hypot(d.dx,d.dy);if(moved<7||!d.plan)return;await commitMove(d.plan,d.group);
}
els.canvas.addEventListener('pointerup',endPointer);els.canvas.addEventListener('pointercancel',endPointer);

function hint(){
  if(state.busy)return;state.hintIds.clear();
  if(state.stage===1){const onBoard=state.board.filter(Boolean).map(id=>state.pieceDefs.get(id));const counts=new Map();onBoard.forEach(d=>counts.set(d.macro,(counts.get(d.macro)||0)+1));const macro=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0];if(macro===undefined)return;state.board.filter(Boolean).forEach(id=>{if(state.pieceDefs.get(id).macro===macro)state.hintIds.add(id);});toast('发光的碎片属于同一张小图，把它们拼成正确2×2',2300);}
  else{const groups=computeGroups().groups.sort((a,b)=>b.size-a.size),g=groups[0];if(!g)return;g.ids.forEach(id=>state.hintIds.add(id));toast(`先保留这个${g.size}块组合，再把相邻区域接到它旁边`,2200);}
  state.hintUntil=performance.now()+2800;sound('snap');
}
async function quick(){if(state.busy)return;if(state.stage===1){state.collected=new Set(Array.from({length:16},(_,i)=>i));drawMap();await transitionToStage2();}else solveBoss();}
function solveBoss(){
  if(state.stage!==2)return;state.busy=true;const board=Array(STAGE2_N*STAGE2_N).fill(null);for(let m=0;m<16;m++){const r=Math.floor(m/4)+1,c=m%4;board[idx(r,c,STAGE2_N)]=`m-${m}`;}const old=state.board.slice();animateBoardChange(old,board,360).then(()=>finishStage2());
}
function reset(){els.finish.classList.remove('is-visible');els.transition.classList.remove('is-visible');startStage1();}

els.hint.addEventListener('click',hint);els.restart.addEventListener('click',reset);els.quick.addEventListener('click',quick);els.again.addEventListener('click',reset);
window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.drag)state.drag=null;});

function debugState(){const groups=computeGroups().groups.map(g=>g.size).sort((a,b)=>b-a);return{version:VERSION,stage:state.stage,boardN:state.boardN,boardCount:state.board.filter(Boolean).length,deckCount:remainingDeck(),collected:state.collected.size,moves:state.moves.slice(),largestGroup:groups[0]||0,busy:state.busy};}
window.__FALLING_COMBINE__={version:VERSION,state:debugState,skipToBoss:async()=>{if(state.stage===1){state.collected=new Set(Array.from({length:16},(_,i)=>i));await transitionToStage2();}},solveBoss,restart:reset};

img.onload=async()=>{resize();buildMapCanvas();raf=requestAnimationFrame(frame);await startStage1();els.loading.classList.add('is-hidden');};
img.onerror=()=>{els.loading.querySelector('span').textContent='图片加载失败，请刷新重试';};
})();