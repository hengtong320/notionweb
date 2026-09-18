(() => {
'use strict';

const VERSION='2.0.0';
const IMAGE_URL='assets/pictures-portrait/30-library.webp';
const img=new Image();
img.decoding='async';
img.src=IMAGE_URL;

const $=id=>document.getElementById(id);
const els={
  canvas:$('gameCanvas'),map:$('mapCanvas'),loading:$('loadingMask'),toast:$('messageToast'),
  kicker:$('stageKicker'),title:$('stageTitle'),description:$('stageDescription'),
  progressLabel:$('progressLabel'),progressValue:$('progressValue'),progressFill:$('progressFill'),collection:$('collectionStrip'),
  stageMoves:$('stageMoves'),snapCount:$('snapCount'),totalPercent:$('totalPercent'),
  hint:$('hintBtn'),restart:$('restartBtn'),quick:$('quickBtn'),
  transition:$('transitionOverlay'),transitionKicker:$('transitionKicker'),transitionTitle:$('transitionTitle'),transitionText:$('transitionText'),transitionPreview:$('transitionPreview'),
  finish:$('finishOverlay'),finish1:$('finishStage1'),finish2:$('finishStage2'),finish3:$('finishStage3'),again:$('againBtn'),
  steps:[$('step1'),$('step2'),$('step3')]
};
const ctx=els.canvas.getContext('2d',{alpha:false});
const mapCtx=els.map.getContext('2d');
let dpr=1,W=0,H=0,last=performance.now(),raf=0;
let audioCtx=null,toastTimer=0,transitionTimer=0;

const state={
  stage:1,wave:0,moves:[0,0,0],snaps:0,
  completed1:new Set(),completed2:new Set(),lockedFinal:new Set(),
  cards:[],docks:[],queue:[],traySlots:[],tweens:[],effects:[],flies:[],
  drag:null,hintCard:null,hintSlot:null,inputLocked:false,finishing:false
};

const WAVES=[
  [0,5,10,15],
  [3,6,9,12],
  [1,4,11,14],
  [2,7,8,13]
];

function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function lerp(a,b,t){return a+(b-a)*t;}
function easeOutCubic(t){return 1-Math.pow(1-t,3);}
function easeInOutCubic(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
function easeOutBack(t){const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);}
function wait(ms){return new Promise(r=>setTimeout(r,ms));}
function seeded(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffle(arr,seed){const r=seeded(seed);for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function rectCenter(r){return{x:r.x+r.w/2,y:r.y+r.h/2};}
function pointIn(x,y,r,pad=0){return x>=r.x-pad&&x<=r.x+r.w+pad&&y>=r.y-pad&&y<=r.y+r.h+pad;}
function roundedPath(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function buzz(pattern=10){try{navigator.vibrate?.(pattern);}catch(_){}}
function sound(type='tap',level=1){
  try{
    if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended')audioCtx.resume();
    const now=audioCtx.currentTime;
    const notes=type==='snap'?[520,690]:type==='merge'?[420,630,840]:type==='transition'?[330,495,660]:type==='win'?[392,523,659,784]:[300];
    notes.forEach((freq,i)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=i===0?'sine':'triangle';o.connect(g);g.connect(audioCtx.destination);
      const start=now+i*.035;o.frequency.setValueAtTime(freq*(1+(level-1)*.035),start);
      g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(type==='tap'?.045:.085,start+.012);g.gain.exponentialRampToValueAtTime(.0001,start+(type==='win'?.5:.25));
      o.start(start);o.stop(start+(type==='win'?.52:.28));
    });
  }catch(_){ }
}
function toast(text,ms=1500){clearTimeout(toastTimer);els.toast.textContent=text;els.toast.classList.add('is-visible');toastTimer=setTimeout(()=>els.toast.classList.remove('is-visible'),ms);}

function srcMicro(macro,q){
  const mr=Math.floor(macro/4),mc=macro%4,qr=q>1?1:0,qc=q%2;
  return{x:(mc*2+qc)/8,y:(mr*2+qr)/8,w:1/8,h:1/8};
}
function srcMacro(macro){return{x:(macro%4)/4,y:Math.floor(macro/4)/4,w:1/4,h:1/4};}
function srcQuadrant(q){return{x:(q%2)/2,y:Math.floor(q/2)/2,w:1/2,h:1/2};}
function sourceFor(card){return card.kind==='micro'?srcMicro(card.unit,card.slot):card.kind==='macro'?srcMacro(card.unit):srcQuadrant(card.unit);}

function resize(){
  const r=els.canvas.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=Math.max(1,r.width);H=Math.max(1,r.height);
  els.canvas.width=Math.round(W*dpr);els.canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  resizeMap();layoutStage(true);
}
function resizeMap(){
  const r=els.map.getBoundingClientRect(),p=Math.min(2,window.devicePixelRatio||1);els.map.width=Math.round(r.width*p);els.map.height=Math.round(r.height*p);mapCtx.setTransform(p,0,0,p,0,0);drawMap();
}

function makeTween(obj,to,duration=260,ease=easeOutCubic,onComplete=null){
  const from={};Object.keys(to).forEach(k=>from[k]=Number(obj[k])||0);
  state.tweens.push({obj,from,to,start:performance.now(),duration,ease,onComplete});
}
function updateTweens(now){
  for(let i=state.tweens.length-1;i>=0;i--){
    const tw=state.tweens[i],t=clamp((now-tw.start)/tw.duration,0,1),e=tw.ease(t);
    Object.keys(tw.to).forEach(k=>tw.obj[k]=lerp(tw.from[k],tw.to[k],e));
    if(t>=1){state.tweens.splice(i,1);tw.onComplete?.();}
  }
}

function clearRuntime(){
  state.cards.length=0;state.docks.length=0;state.queue.length=0;state.traySlots.length=0;state.tweens.length=0;state.effects.length=0;state.flies.length=0;state.drag=null;state.hintCard=null;state.hintSlot=null;state.inputLocked=false;state.finishing=false;
}

function stageLayout(){
  const pad=14,top=20,trayH=state.stage===3?128:150,trayY=H-trayH-14;
  const dockGap=12;
  if(state.stage===1||state.stage===2){
    const maxDockW=state.stage===1?122:128;
    const dockW=Math.min(maxDockW,(W-pad*2-dockGap)/2);
    const dockH=dockW/0.75;
    const totalW=dockW*2+dockGap,totalH=dockH*2+dockGap;
    const startX=(W-totalW)/2,startY=Math.max(top,(trayY-totalH)/2-4);
    return{pad,top,trayY,trayH,dockW,dockH,dockGap,startX,startY,cols:2,rows:2};
  }
  const dockW=Math.min(W-54,286),dockH=dockW/0.75,startX=(W-dockW)/2,startY=Math.max(22,(trayY-dockH)/2-2);
  return{pad,top,trayY,trayH,dockW,dockH,dockGap:0,startX,startY,cols:1,rows:1};
}

function layoutStage(immediate=false){
  if(!W||!H)return;
  const L=stageLayout();
  state.docks.forEach((dock,i)=>{
    let x,y,w=L.dockW,h=L.dockH;
    if(state.stage<3){x=L.startX+(i%2)*(w+L.dockGap);y=L.startY+Math.floor(i/2)*(h+L.dockGap);}else{x=L.startX;y=L.startY;}
    dock.rect={x,y,w,h};dock.slotsRect=[];
    for(let s=0;s<4;s++)dock.slotsRect.push({x:x+(s%2)*w/2,y:y+Math.floor(s/2)*h/2,w:w/2,h:h/2});
  });
  const trayCols=state.stage===3?4:4,trayRows=state.stage===3?1:2,gap=8;
  const cardW=state.stage===3?Math.min(66,(W-38-gap*3)/4):Math.min(55,(W-44-gap*3)/4),cardH=cardW/0.75;
  const totalW=trayCols*cardW+(trayCols-1)*gap,totalH=trayRows*cardH+(trayRows-1)*7;
  const sx=(W-totalW)/2,sy=L.trayY+(L.trayH-totalH)/2+8;
  state.traySlots=[];
  for(let i=0;i<trayCols*trayRows;i++)state.traySlots.push({x:sx+(i%trayCols)*(cardW+gap),y:sy+Math.floor(i/trayCols)*(cardH+7),w:cardW,h:cardH,cardId:null});
  state.cards.filter(c=>c.state==='tray').forEach(card=>{
    const slot=state.traySlots[card.trayIndex];if(!slot)return;slot.cardId=card.id;card.homeX=slot.x;card.homeY=slot.y;card.w=slot.w;card.h=slot.h;
    if(immediate&&!state.drag){card.x=slot.x;card.y=slot.y;}
  });
}

function buildDocks(units){
  state.docks=units.map((unit,index)=>({id:index,unit,slots:[null,null,null,null],slotsRect:[],rect:null,merging:false,completed:false}));
}
function makeCard(kind,unit,slot,targetDock,targetSlot){
  return{id:`${kind}-${unit}-${slot}-${Math.random().toString(36).slice(2,7)}`,kind,unit,slot,targetDock,targetSlot,state:'queue',trayIndex:-1,x:0,y:-120,w:50,h:67,homeX:0,homeY:0,scale:1,alpha:1,rotation:0};
}
function fillTray(){
  state.traySlots.forEach((slot,index)=>{
    if(slot.cardId||!state.queue.length)return;
    const card=state.queue.shift();card.state='tray';card.trayIndex=index;slot.cardId=card.id;card.w=slot.w;card.h=slot.h;card.homeX=slot.x;card.homeY=slot.y;card.x=slot.x;card.y=-card.h-20;card.alpha=0;card.scale=.9;state.cards.push(card);
    makeTween(card,{y:slot.y,alpha:1,scale:1},360+index*24,easeOutBack);
  });
}

function startStage1(wave=0){
  clearRuntime();state.stage=1;state.wave=wave;
  const units=WAVES[wave].slice();buildDocks(units);layoutStage(true);
  const cards=[];units.forEach((macro,dock)=>{for(let q=0;q<4;q++)cards.push(makeCard('micro',macro,q,dock,q));});
  state.queue=shuffle(cards,2026091800+wave*137);layoutStage(true);fillTray();syncUI();toast(`第${wave+1}波：先完成这4个局部区域`,1900);
}
function startStage2(){
  clearRuntime();state.stage=2;state.wave=0;buildDocks([0,1,2,3]);layoutStage(true);
  const cards=[];for(let macro=0;macro<16;macro++){
    const r=Math.floor(macro/4),c=macro%4,quadrant=Math.floor(r/2)*2+Math.floor(c/2),slot=(r%2)*2+(c%2);
    cards.push(makeCard('macro',macro,0,quadrant,slot));
  }
  state.queue=shuffle(cards,2026091822);layoutStage(true);fillTray();syncUI();toast('16个局部重新出现：再合成4个更大的区域块',2300);
}
function startStage3(){
  clearRuntime();state.stage=3;state.wave=0;buildDocks([0]);layoutStage(true);
  const cards=[0,1,2,3].map(q=>makeCard('quadrant',q,0,0,q));
  state.queue=shuffle(cards,2026091833);layoutStage(true);fillTray();syncUI();toast('最终阶段：把4个大区域吸附成一张完整作品',2300);
}

function cardTargetRect(card){const dock=state.docks[card.targetDock];return dock?.slotsRect[card.targetSlot]||null;}
function freeTray(card){const slot=state.traySlots[card.trayIndex];if(slot&&slot.cardId===card.id)slot.cardId=null;card.trayIndex=-1;}
function snapCard(card,instant=false){
  if(card.state!=='tray')return false;
  const target=cardTargetRect(card),dock=state.docks[card.targetDock];if(!target||dock.slots[card.targetSlot])return false;
  freeTray(card);card.state='snapping';state.inputLocked=true;
  const done=()=>{
    card.state='locked';card.x=target.x;card.y=target.y;card.w=target.w;card.h=target.h;card.scale=1;dock.slots[card.targetSlot]=card.id;state.snaps++;state.inputLocked=false;
    state.effects.push({x:target.x+target.w/2,y:target.y+target.h/2,start:performance.now(),duration:430,color:'#ffe177'});
    sound('snap',dock.slots.filter(Boolean).length);buzz(10);toast(`磁吸成功 · ${dock.slots.filter(Boolean).length}/4`,900);fillTray();syncUI();
    if(dock.slots.every(Boolean))setTimeout(()=>mergeDock(dock),180);
  };
  if(instant){Object.assign(card,{x:target.x,y:target.y,w:target.w,h:target.h});done();}
  else makeTween(card,{x:target.x,y:target.y,w:target.w,h:target.h,scale:1.035},180,easeOutBack,()=>{card.scale=1;done();});
  return true;
}
function returnCard(card){card.state='tray';makeTween(card,{x:card.homeX,y:card.homeY,scale:1,rotation:0},230,easeOutBack);toast('靠近正确区域时会自动吸附',1000);sound('tap');}

function mergeDock(dock){
  if(dock.merging||dock.completed)return;dock.merging=true;state.inputLocked=true;
  const now=performance.now();state.effects.push({x:dock.rect.x+dock.rect.w/2,y:dock.rect.y+dock.rect.h/2,start:now,duration:680,color:'#7ef2ff',big:true});
  sound('merge',state.stage);buzz([16,24,28]);toast(state.stage===1?'局部合成完成 · 收入收藏':state.stage===2?'大区域合成完成 · 收入收藏':'最终区域锁定',1200);
  setTimeout(()=>{
    const ids=new Set(dock.slots);state.cards=state.cards.filter(c=>!ids.has(c.id));dock.completed=true;dock.merging=false;
    const kind=state.stage===1?'macro':state.stage===2?'quadrant':'final';
    state.flies.push({kind,unit:dock.unit,from:{...dock.rect},to:collectionTarget(state.stage,dock.unit),start:performance.now(),duration:560,alpha:1});
    dock.slots=[null,null,null,null];
    setTimeout(()=>completeDock(dock),530);
  },420);
}
function collectionTarget(stage,unit){
  if(stage===3)return{x:W/2-10,y:8,w:20,h:27};
  const count=stage===1?16:4,index=stage===1?unit:unit,cellW=Math.min(18,(W-40)/count),gap=stage===1?2:8,total=count*cellW+(count-1)*gap;
  return{x:(W-total)/2+index*(cellW+gap),y:5,w:cellW,h:cellW/0.75};
}
function completeDock(dock){
  if(state.stage===1){state.completed1.add(dock.unit);syncUI();
    const waveDone=WAVES[state.wave].every(m=>state.completed1.has(m));
    if(waveDone){
      if(state.completed1.size===16){showTransition(2);}else{state.inputLocked=true;setTimeout(()=>{state.inputLocked=false;startStage1(state.wave+1);},650);}
    }
  }else if(state.stage===2){state.completed2.add(dock.unit);syncUI();if(state.completed2.size===4)showTransition(3);}
  else{state.lockedFinal.add(dock.unit);syncUI();if(state.lockedFinal.size===1)finishGame();}
}

function showTransition(nextStage){
  state.inputLocked=true;clearTimeout(transitionTimer);els.transitionPreview.innerHTML='';
  if(nextStage===2){
    els.transitionKicker.textContent='16个局部已合成并收纳';els.transitionTitle.textContent='第二层合成开启';els.transitionText.textContent='刚才消失的16个局部重新出现，再拼成4个更大的区域块。';
    for(let m=0;m<16;m++)appendPreview(m,4);
  }else{
    els.transitionKicker.textContent='4个大区域已合成并收纳';els.transitionTitle.textContent='最终大图开启';els.transitionText.textContent='四个区域块重新出现，最后吸附成一张真正完整的大图。';
    for(let q=0;q<4;q++)appendPreview(q,2);
  }
  els.transition.classList.add('is-visible');sound('transition');buzz([18,26,34]);
  transitionTimer=setTimeout(()=>{els.transition.classList.remove('is-visible');state.inputLocked=false;nextStage===2?startStage2():startStage3();},1650);
}
function appendPreview(index,n){
  const i=document.createElement('i'),r=Math.floor(index/n),c=index%n;i.style.setProperty('--preview-image',`url("${IMAGE_URL}")`);i.style.backgroundSize=`${n*100}% ${n*100}%`;i.style.backgroundPosition=`${c/(n-1||1)*100}% ${r/(n-1||1)*100}%`;i.style.animationDelay=`${index*.035}s`;els.transitionPreview.appendChild(i);
}

function finishGame(){
  if(state.finishing)return;state.finishing=true;state.inputLocked=true;sound('win');buzz([24,25,42,30,70]);
  setTimeout(()=>{
    els.finish1.textContent=String(state.moves[0]);els.finish2.textContent=String(state.moves[1]);els.finish3.textContent=String(state.moves[2]);els.finish.classList.add('is-visible');
  },950);
}

function slotJoinCount(dock){
  let n=0;const s=dock.slots;
  if(s[0]&&s[1])n++;if(s[2]&&s[3])n++;if(s[0]&&s[2])n++;if(s[1]&&s[3])n++;return n;
}

function drawImageCrop(src,dest,radius=0,alpha=1){
  if(!img.complete||!img.naturalWidth)return;
  ctx.save();ctx.globalAlpha=alpha;roundedPath(ctx,dest.x,dest.y,dest.w,dest.h,radius);ctx.clip();
  ctx.drawImage(img,src.x*img.naturalWidth,src.y*img.naturalHeight,src.w*img.naturalWidth,src.h*img.naturalHeight,dest.x,dest.y,dest.w,dest.h);ctx.restore();
}
function drawPanel(r,fill='rgba(6,25,52,.72)',stroke='rgba(135,222,255,.25)',radius=16){ctx.save();roundedPath(ctx,r.x,r.y,r.w,r.h,radius);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();ctx.restore();}
function drawDocks(now){
  state.docks.forEach((dock,di)=>{
    if(dock.completed)return;drawPanel(dock.rect,'rgba(8,33,66,.73)','rgba(131,225,255,.25)',14);
    const ghostSrc=state.stage===1?srcMacro(dock.unit):state.stage===2?srcQuadrant(dock.unit):{x:0,y:0,w:1,h:1};
    drawImageCrop(ghostSrc,{x:dock.rect.x+3,y:dock.rect.y+3,w:dock.rect.w-6,h:dock.rect.h-6},11,state.stage===3?.16:.12);
    dock.slotsRect.forEach((s,si)=>{
      if(dock.slots[si])return;ctx.save();ctx.setLineDash([5,5]);ctx.lineWidth=1.2;ctx.strokeStyle=state.hintSlot?.dock===di&&state.hintSlot?.slot===si?'#ffe36f':'rgba(255,255,255,.24)';roundedPath(ctx,s.x+1,s.y+1,s.w-2,s.h-2,si===0||si===1||si===2||si===3?5:0);ctx.stroke();ctx.restore();
    });
    if(dock.merging){
      const p=clamp((now-(state.effects[state.effects.length-1]?.start||now))/420,0,1);ctx.save();ctx.globalAlpha=.55+.35*Math.sin(p*Math.PI);ctx.shadowColor='#fff6a0';ctx.shadowBlur=28;drawImageCrop(ghostSrc,{x:dock.rect.x-2,y:dock.rect.y-2,w:dock.rect.w+4,h:dock.rect.h+4},14,1);ctx.restore();
    }
    const joins=slotJoinCount(dock);if(joins>0&&!dock.merging){ctx.save();ctx.strokeStyle=`rgba(255,225,104,${.22+joins*.12})`;ctx.lineWidth=2;roundedPath(ctx,dock.rect.x+2,dock.rect.y+2,dock.rect.w-4,dock.rect.h-4,12);ctx.stroke();ctx.restore();}
  });
}
function drawTray(){
  const L=stageLayout(),r={x:10,y:L.trayY,w:W-20,h:L.trayH};drawPanel(r,'rgba(3,15,34,.8)','rgba(255,255,255,.11)',17);
  ctx.save();ctx.fillStyle='#8fbedc';ctx.font='700 10px sans-serif';ctx.fillText(state.stage===1?'微颗粒下落区':state.stage===2?'局部区域下落区':'最终区域下落区',r.x+12,r.y+15);ctx.fillStyle='#ffe082';ctx.textAlign='right';ctx.fillText(`待出现 ${state.queue.length}`,r.x+r.w-12,r.y+15);ctx.restore();
  state.traySlots.forEach(slot=>{ctx.save();ctx.strokeStyle='rgba(255,255,255,.12)';ctx.setLineDash([4,5]);roundedPath(ctx,slot.x,slot.y,slot.w,slot.h,7);ctx.stroke();ctx.restore();});
}
function drawCards(){
  const cards=state.cards.slice().sort((a,b)=>(a===state.drag?.card?1:0)-(b===state.drag?.card?1:0));
  cards.forEach(card=>{
    if(card.state==='queue'||card.alpha<=0)return;const r={x:card.x,y:card.y,w:card.w,h:card.h};
    ctx.save();ctx.translate(r.x+r.w/2,r.y+r.h/2);ctx.rotate(card.rotation);ctx.scale(card.scale,card.scale);ctx.translate(-(r.x+r.w/2),-(r.y+r.h/2));
    if(card.state==='tray'||card.state==='snapping'){
      ctx.shadowColor=card===state.drag?.card?'rgba(0,0,0,.55)':'rgba(0,0,0,.3)';ctx.shadowBlur=card===state.drag?.card?18:7;ctx.shadowOffsetY=card===state.drag?.card?10:3;
    }
    drawImageCrop(sourceFor(card),r,card.state==='locked'?0:7,card.alpha);
    if(card.state!=='locked'){
      ctx.globalAlpha=card.alpha;ctx.shadowColor='transparent';ctx.strokeStyle=card.id===state.hintCard?'#ffe36f':'rgba(255,255,255,.76)';ctx.lineWidth=card.id===state.hintCard?3:1.2;roundedPath(ctx,r.x+.6,r.y+.6,r.w-1.2,r.h-1.2,7);ctx.stroke();
    }
    ctx.restore();
  });
}
function drawEffects(now){
  for(let i=state.effects.length-1;i>=0;i--){const e=state.effects[i],t=(now-e.start)/e.duration;if(t>=1){state.effects.splice(i,1);continue;}ctx.save();ctx.globalAlpha=1-t;ctx.strokeStyle=e.color;ctx.lineWidth=e.big?5:3;ctx.shadowColor=e.color;ctx.shadowBlur=18;ctx.beginPath();ctx.arc(e.x,e.y,lerp(8,e.big?75:42,easeOutCubic(t)),0,Math.PI*2);ctx.stroke();ctx.restore();}
  for(let i=state.flies.length-1;i>=0;i--){const f=state.flies[i],t=clamp((now-f.start)/f.duration,0,1),e=easeInOutCubic(t),r={x:lerp(f.from.x,f.to.x,e),y:lerp(f.from.y,f.to.y,e),w:lerp(f.from.w,f.to.w,e),h:lerp(f.from.h,f.to.h,e)};
    const src=f.kind==='macro'?srcMacro(f.unit):f.kind==='quadrant'?srcQuadrant(f.unit):{x:0,y:0,w:1,h:1};ctx.save();ctx.globalAlpha=1-t*.45;ctx.shadowColor='#ffe070';ctx.shadowBlur=18;drawImageCrop(src,r,8,1);ctx.restore();if(t>=1)state.flies.splice(i,1);
  }
}
function render(now){
  ctx.setTransform(dpr,0,0,dpr,0,0);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#12345c');g.addColorStop(1,'#051126');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalAlpha=.13;ctx.fillStyle='#59dfff';for(let i=0;i<22;i++){const x=(i*83+now*.01)%W,y=(i*137)%H;ctx.beginPath();ctx.arc(x,y,1.2+(i%3),0,Math.PI*2);ctx.fill();}ctx.restore();
  drawDocks(now);drawTray();drawCards();drawEffects(now);
}
function loop(now){updateTweens(now);render(now);last=now;raf=requestAnimationFrame(loop);}

function drawMap(){
  const r=els.map.getBoundingClientRect();if(!r.width||!r.height)return;mapCtx.clearRect(0,0,r.width,r.height);const cols=state.stage===1?4:2,rows=cols;
  mapCtx.save();mapCtx.lineWidth=1;mapCtx.strokeStyle='rgba(255,255,255,.72)';for(let i=1;i<cols;i++){mapCtx.beginPath();mapCtx.moveTo(r.width*i/cols,0);mapCtx.lineTo(r.width*i/cols,r.height);mapCtx.stroke();mapCtx.beginPath();mapCtx.moveTo(0,r.height*i/rows);mapCtx.lineTo(r.width,r.height*i/rows);mapCtx.stroke();}
  if(state.stage===1){
    for(let m=0;m<16;m++){const rr=Math.floor(m/4),cc=m%4;if(state.completed1.has(m)){mapCtx.fillStyle='rgba(82,240,164,.28)';mapCtx.fillRect(cc*r.width/4,rr*r.height/4,r.width/4,r.height/4);}else if(WAVES[state.wave]?.includes(m)){mapCtx.fillStyle='rgba(255,211,84,.18)';mapCtx.fillRect(cc*r.width/4,rr*r.height/4,r.width/4,r.height/4);}}
  }else if(state.stage===2){for(let q=0;q<4;q++){if(state.completed2.has(q)){const rr=Math.floor(q/2),cc=q%2;mapCtx.fillStyle='rgba(82,240,164,.28)';mapCtx.fillRect(cc*r.width/2,rr*r.height/2,r.width/2,r.height/2);}}}
  else{for(let q=0;q<4;q++){if(state.lockedFinal.has(q)){const rr=Math.floor(q/2),cc=q%2;mapCtx.fillStyle='rgba(255,215,92,.3)';mapCtx.fillRect(cc*r.width/2,rr*r.height/2,r.width/2,r.height/2);}}}
  mapCtx.restore();
}

function syncCollection(){
  const count=state.stage===1?16:4,done=state.stage===1?state.completed1:state.stage===2?state.completed2:state.lockedFinal;els.collection.innerHTML='';els.collection.style.gridTemplateColumns=`repeat(${count},1fr)`;
  for(let i=0;i<count;i++){const d=document.createElement('i');d.className='collection-dot'+(done.has(i)?' done':'');if(done.has(i)){d.style.setProperty('--collection-image',`url("${IMAGE_URL}")`);const n=state.stage===1?4:2,r=Math.floor(i/n),c=i%n;d.style.backgroundSize=`${n*100}% ${n*100}%`;d.style.backgroundPosition=`${c/(n-1||1)*100}% ${r/(n-1||1)*100}%`;d.style.setProperty('--collection-image',`url("${IMAGE_URL}")`);}els.collection.appendChild(d);}
}
function syncUI(){
  const done=state.stage===1?state.completed1.size:state.stage===2?state.completed2.size:state.lockedFinal.size,total=state.stage===1?16:4;
  const stageIndex=state.stage-1;els.steps.forEach((s,i)=>{s.classList.toggle('is-active',i===stageIndex);s.classList.toggle('is-done',i<stageIndex);});
  if(state.stage===1){els.kicker.textContent='阶段 1 / 3 · 微颗粒拼合';els.title.textContent='先完成16个局部区域';els.description.textContent='把像素般的小颗粒先拼成局部；每完成一个局部，它会吸附、合成并消失进入收藏。';els.progressLabel.textContent=`第${state.wave+1}波 · 4个局部`;els.quick.textContent='快速看区域合成';}
  else if(state.stage===2){els.kicker.textContent='阶段 2 / 3 · 区域块合成';els.title.textContent='16个局部 → 4个大区域';els.description.textContent='刚才消失的16个局部重新出现；每4个局部再吸附成一个更大的区域块，然后再次消失收纳。';els.progressLabel.textContent='第二层 · 4个大区域';els.quick.textContent='快速看最终大图';}
  else{els.kicker.textContent='阶段 3 / 3 · 最终大图';els.title.textContent='4个区域 → 1张完整作品';els.description.textContent='最后四个大区域重新出现，吸附成真正连续、没有拼贴感的完整大图。';els.progressLabel.textContent='最终层 · 4个大区域';els.quick.textContent='直接完成大图';}
  els.progressValue.textContent=`${done} / ${total}`;els.progressFill.style.width=`${done/total*100}%`;els.stageMoves.textContent=`${state.moves[state.stage-1]}步`;els.snapCount.textContent=String(state.snaps);
  const totalPercent=state.stage===1?Math.round(state.completed1.size/16*50):state.stage===2?50+Math.round(state.completed2.size/4*30):80+Math.round(state.lockedFinal.size/4*20);els.totalPercent.textContent=`${totalPercent}%`;
  syncCollection();drawMap();
}

function pointerPos(e){const r=els.canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
function cardAt(x,y){for(let i=state.cards.length-1;i>=0;i--){const c=state.cards[i];if(c.state==='tray'&&pointIn(x,y,{x:c.x,y:c.y,w:c.w,h:c.h}))return c;}return null;}
function onDown(e){if(state.inputLocked||state.finishing)return;const p=pointerPos(e),card=cardAt(p.x,p.y);if(!card)return;try{els.canvas.setPointerCapture(e.pointerId);}catch(_){ }state.drag={card,id:e.pointerId,dx:p.x-card.x,dy:p.y-card.y};card.scale=1.045;sound('tap');}
function onMove(e){if(!state.drag||state.drag.id!==e.pointerId)return;e.preventDefault();const p=pointerPos(e),c=state.drag.card;c.x=p.x-state.drag.dx;c.y=p.y-state.drag.dy;
  const t=cardTargetRect(c);state.hintSlot=t?{dock:c.targetDock,slot:c.targetSlot}:null;
}
function onEnd(e){if(!state.drag||state.drag.id!==e.pointerId)return;const c=state.drag.card,p=pointerPos(e),t=cardTargetRect(c);state.drag=null;c.scale=1;state.hintSlot=null;
  if(!t){returnCard(c);return;}const center=rectCenter(t),dist=Math.hypot(p.x-center.x,p.y-center.y),magnet=Math.max(t.w,t.h)*.92;
  state.moves[state.stage-1]++;if(dist<=magnet||pointIn(p.x,p.y,t,Math.min(t.w,t.h)*.32))snapCard(c);else returnCard(c);syncUI();
}

function hint(){
  if(state.inputLocked)return;const card=state.cards.find(c=>c.state==='tray');if(!card){toast('当前没有待放碎片');return;}state.hintCard=card.id;state.hintSlot={dock:card.targetDock,slot:card.targetSlot};toast('发光碎片拖到黄色目标框，靠近后会自动吸附',2200);sound('snap');setTimeout(()=>{if(state.hintCard===card.id){state.hintCard=null;state.hintSlot=null;}},2300);
}
function quickNext(){if(state.inputLocked)return;if(state.stage===1){state.completed1=new Set(Array.from({length:16},(_,i)=>i));syncUI();showTransition(2);}else if(state.stage===2){state.completed2=new Set([0,1,2,3]);syncUI();showTransition(3);}else debugSolveFinal();}
function debugAutoPlace(){const card=state.cards.find(c=>c.state==='tray');if(!card)return false;state.moves[state.stage-1]++;snapCard(card,true);syncUI();return true;}
function debugSolveFinal(){if(state.stage!==3)startStage3();state.inputLocked=false;const cards=state.cards.filter(c=>c.state==='tray');cards.forEach(c=>snapCard(c,true));return true;}
function forceStage(n){els.transition.classList.remove('is-visible');clearTimeout(transitionTimer);if(n===1)startStage1(0);else if(n===2)startStage2();else startStage3();}
function reset(){clearTimeout(transitionTimer);els.transition.classList.remove('is-visible');els.finish.classList.remove('is-visible');state.moves=[0,0,0];state.snaps=0;state.completed1.clear();state.completed2.clear();state.lockedFinal.clear();startStage1(0);}

els.canvas.addEventListener('pointerdown',onDown);els.canvas.addEventListener('pointermove',onMove,{passive:false});els.canvas.addEventListener('pointerup',onEnd);els.canvas.addEventListener('pointercancel',onEnd);
els.hint.addEventListener('click',hint);els.restart.addEventListener('click',reset);els.quick.addEventListener('click',quickNext);els.again.addEventListener('click',reset);
window.addEventListener('resize',resize,{passive:true});

document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.drag){returnCard(state.drag.card);state.drag=null;}});

window.__HIERARCHY_SYNTH__={
  version:VERSION,
  state:()=>({stage:state.stage,wave:state.wave,completed1:state.completed1.size,completed2:state.completed2.size,lockedFinal:state.lockedFinal.size,cards:state.cards.length,queue:state.queue.length,moves:state.moves.slice(),snaps:state.snaps,imageLoaded:!!img.naturalWidth}),
  autoPlaceOne:debugAutoPlace,
  forceStage,
  solveFinal:debugSolveFinal,
  reset
};

img.onload=()=>{
  els.loading.classList.add('is-hidden');resize();reset();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
};
img.onerror=()=>{els.loading.innerHTML='<b>大图加载失败，请刷新重试</b>';};
})();
