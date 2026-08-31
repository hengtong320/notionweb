#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; CSS=ROOT/'style.css'; INDEX=ROOT/'index.html'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'
s=GAME.read_text(encoding='utf-8')

# ---------- DOM hooks ----------
old_dom="""    deckArea: $('deckArea'), board: $('board'), cellLayer: $('cellLayer'), tileLayer: $('tileLayer'), fxLayer: $('fxLayer'),
    tutorialHand: $('tutorialHand'), timeText: $('timeText'), moveText: $('moveText'), progressBar: $('progressBar'),"""
new_dom="""    deckArea: $('deckArea'), board: $('board'), cellLayer: $('cellLayer'), tileLayer: $('tileLayer'), fxLayer: $('fxLayer'),
    juiceCanvas: $('juiceCanvas'), chainStatus: $('chainStatus'), flowMeter: $('flowMeter'), flowFill: $('flowFill'), flowText: $('flowText'),
    tutorialHand: $('tutorialHand'), timeText: $('timeText'), moveText: $('moveText'), progressBar: $('progressBar'),"""
if old_dom not in s: raise SystemExit('DOM mapping marker not found')
s=s.replace(old_dom,new_dom,1)

# ---------- richer, cached WebAudio feedback ----------
s=s.replace("    constructor() { this.ctx = null; this.master = null; }","    constructor() { this.ctx = null; this.master = null; this.noiseBuffer = null; }",1)
noise_start=s.index('    noise(duration = .08, gain = .05) {')
noise_end=s.index('    tap() {',noise_start)
noise_block=r'''    noise(duration = .08, gain = .05, when = 0) {
      if (!this.ensure()) return;
      if (!this.noiseBuffer) {
        const length=Math.max(1,Math.floor(this.ctx.sampleRate*.28));
        this.noiseBuffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate);
        const data=this.noiseBuffer.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length*.72);
      }
      const now=this.ctx.currentTime+when;
      const src=this.ctx.createBufferSource(),g=this.ctx.createGain();
      src.buffer=this.noiseBuffer;
      g.gain.setValueAtTime(.0001,now);
      g.gain.exponentialRampToValueAtTime(gain,now+.008);
      g.gain.exponentialRampToValueAtTime(.0001,now+duration);
      src.connect(g);g.connect(this.master);src.start(now);src.stop(now+duration+.02);
    }
'''
s=s[:noise_start]+noise_block+s[noise_end:]
old_methods="""    merge() { this.tone(610, .1, 'sine', .09, 0, 770); this.tone(880, .1, 'sine', .06, .07, 1050); }
    clear() { [540, 690, 860, 1080].forEach((f, i) => this.tone(f, .16, i < 2 ? 'triangle' : 'sine', .09, i * .055, f * 1.04)); this.noise(.13, .025); }
    deal() { this.tone(190, .055, 'triangle', .055, 0, 245); }"""
new_methods=r'''    merge() { this.mergeStage(2); }
    mergeStage(size=2) {
      const stage=Math.max(2,Math.min(4,size));
      const root=stage===2?610:stage===3?720:840;
      this.tone(root,.085,'sine',.075,0,root*1.18);
      this.tone(root*1.34,.095,'triangle',.052,.035,root*1.55);
      if(stage>=3)this.tone(root*.52,.11,'sine',.048,0,root*.68);
    }
    chain(level=1,fever=false) {
      const tier=Math.max(1,Math.min(5,level));
      const notes=[523.25,659.25,783.99,1046.5,1318.51];
      const root=notes[tier-1];
      this.tone(root,.15,'triangle',.09,0,root*1.04);
      this.tone(root*1.5,.17,'sine',.06,.025,root*1.62);
      this.tone(Math.max(92,root/4),.19,'sine',.075,0,Math.max(110,root/3.4));
      this.noise(.11,.018+tier*.006,.02);
      if(tier>=3)this.tone(root*2,.12,'sine',.04,.075,root*2.15);
      if(fever)this.tone(root*.75,.24,'sawtooth',.032,0,root*1.02);
    }
    clear() { this.chain(1,false); }
    drop(distance=1) {
      const d=Math.max(1,Math.min(5,distance));
      this.tone(170-d*9,.055+d*.008,'triangle',.038+d*.006,0,205-d*5);
    }
    feverStart() {
      [523,659,784,1046].forEach((f,i)=>this.tone(f,.28,'triangle',.055,i*.065,f*1.02));
      this.noise(.16,.025,.12);
    }
    feverEnd() { this.tone(740,.18,'sine',.05,0,390); }
    deal() { this.tone(190, .055, 'triangle', .055, 0, 245); }'''
if old_methods not in s: raise SystemExit('Audio methods marker not found')
s=s.replace(old_methods,new_methods,1)

# ---------- Canvas JuiceDirector: pooled particles/rings/beams, no per-particle DOM ----------
haptic_marker="""  function haptic(pattern = 12) {
    if (save.settings.vibration && navigator.vibrate) navigator.vibrate(pattern);
  }
"""
if haptic_marker not in s: raise SystemExit('haptic marker not found')
juice_code=r'''

  class JuiceDirector {
    constructor(canvas,board) {
      this.canvas=canvas;this.board=board;this.ctx=canvas?.getContext('2d')||null;
      this.pool=Array.from({length:280},()=>({active:false}));
      this.rings=[];this.beams=[];this.raf=0;this.last=0;this.w=1;this.h=1;this.dpr=1;this.lastCenter=null;
    }
    resize() {
      if(!this.canvas||!this.ctx||!this.board)return;
      const rect=this.board.getBoundingClientRect();if(rect.width<2||rect.height<2)return;
      this.w=rect.width;this.h=rect.height;this.dpr=Math.min(2,window.devicePixelRatio||1);
      const pw=Math.round(this.w*this.dpr),ph=Math.round(this.h*this.dpr);
      if(this.canvas.width!==pw||this.canvas.height!==ph){this.canvas.width=pw;this.canvas.height=ph;}
      this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    }
    reset() {
      cancelAnimationFrame(this.raf);this.raf=0;this.last=0;this.lastCenter=null;this.rings.length=0;this.beams.length=0;
      this.pool.forEach(p=>p.active=false);if(this.ctx)this.ctx.clearRect(0,0,this.w,this.h);
    }
    ensureLoop() { if(!this.raf)this.raf=requestAnimationFrame(t=>this.frame(t)); }
    particle(x,y,tier=1,color=null) {
      const p=this.pool.find(v=>!v.active);if(!p)return;
      const a=Math.random()*Math.PI*2,s=1.9+Math.random()*(2.5+tier*.65);
      Object.assign(p,{active:true,x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.1,life:1,max:1,size:2+Math.random()*(2.2+tier*.5),rot:Math.random()*6.28,vr:(Math.random()-.5)*.22,color:color||['#fff57d','#75f6ff','#ffffff','#ff86cf','#7dffab'][Math.floor(Math.random()*5)]});
    }
    burstPercent(xp,yp,tier=1,count=0) {
      const x=xp/100*this.w,y=yp/100*this.h,n=count||Math.min(52,14+tier*8);
      for(let i=0;i<n;i++)this.particle(x,y,tier);
      this.rings.push({x,y,r:8,max:42+tier*13,life:1,tier});this.ensureLoop();
    }
    beamPercent(a,b,tier=1) {
      if(!a||!b)return;
      this.beams.push({x1:a.x/100*this.w,y1:a.y/100*this.h,x2:b.x/100*this.w,y2:b.y/100*this.h,life:1,tier});this.ensureLoop();
    }
    mergeGroup(group) {
      const rect=groupRectPercent(group),center={x:rect.left+rect.width/2,y:rect.top+rect.height/2};
      this.burstPercent(center.x,center.y,Math.min(3,Math.max(1,group.ids.length-1)),8+group.ids.length*3);
    }
    clearGroups(groups,tier=1) {
      const centers=[];
      groups.forEach(group=>{const r=groupRectPercent(group);centers.push({x:r.left+r.width/2,y:r.top+r.height/2});});
      centers.forEach((center,i)=>{
        if(i===0&&this.lastCenter)this.beamPercent(this.lastCenter,center,tier);
        if(i>0)this.beamPercent(centers[i-1],center,tier);
        this.burstPercent(center.x,center.y,tier);
      });
      if(centers.length)this.lastCenter=centers[centers.length-1];
      this.pulse(tier);
    }
    pulse(tier=1) {
      const wrap=this.board?.closest('.board-wrap');if(!wrap)return;
      const cls=`juice-hit-${Math.min(5,tier)}`;
      wrap.classList.remove('juice-hit-1','juice-hit-2','juice-hit-3','juice-hit-4','juice-hit-5');
      requestAnimationFrame(()=>wrap.classList.add(cls));
      setTimeout(()=>wrap.classList.remove(cls),300);
      dom.deckArea?.classList.add('deck-react');setTimeout(()=>dom.deckArea?.classList.remove('deck-react'),260);
    }
    frame(now) {
      this.raf=0;if(!this.ctx)return;
      const dt=Math.min(2.1,Math.max(.45,(this.last?now-this.last:16.7)/16.7));this.last=now;
      const ctx=this.ctx;ctx.clearRect(0,0,this.w,this.h);ctx.save();ctx.globalCompositeOperation='lighter';
      let active=false;
      this.beams=this.beams.filter(b=>{
        b.life-=.075*dt;if(b.life<=0)return false;active=true;
        ctx.globalAlpha=Math.min(1,b.life)*.8;ctx.strokeStyle=b.tier>=4?'#fff59a':'#7bf7ff';ctx.lineWidth=2+b.tier*.55;
        ctx.beginPath();ctx.moveTo(b.x1,b.y1);ctx.lineTo(b.x2,b.y2);ctx.stroke();return true;
      });
      this.rings=this.rings.filter(r=>{
        r.life-=.052*dt;if(r.life<=0)return false;active=true;r.r+=(r.max-r.r)*.16*dt;
        ctx.globalAlpha=r.life*.72;ctx.strokeStyle=r.tier>=3?'#fff378':'#80f8ff';ctx.lineWidth=1.5+r.tier*.45;
        ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();return true;
      });
      for(const p of this.pool){
        if(!p.active)continue;p.life-=.035*dt;if(p.life<=0){p.active=false;continue;}active=true;
        p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.085*dt;p.vx*=Math.pow(.985,dt);p.rot+=p.vr*dt;
        ctx.globalAlpha=Math.min(1,p.life*1.45);ctx.fillStyle=p.color;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
        ctx.fillRect(-p.size,-p.size*.36,p.size*2,p.size*.72);ctx.restore();
      }
      ctx.restore();if(active)this.ensureLoop();else this.last=0;
    }
  }
  const juice=new JuiceDirector(dom.juiceCanvas,dom.board);
'''
s=s.replace(haptic_marker,haptic_marker+juice_code,1)

# ---------- state ----------
old_state="""    unlockedThisLevel: [],
    movesSinceClear: 0
  };"""
new_state="""    unlockedThisLevel: [],
    movesSinceClear: 0,
    turnChain: 0,
    turnCleared: 0,
    streakCombo: 0,
    streakGrace: 0,
    flowEnergy: 0,
    feverActive: false,
    feverTurns: 0,
    feverStartedThisTurn: false,
    lastChainPrediction: null,
    lastResolveTrace: []
  };"""
if old_state not in s: raise SystemExit('game state marker not found')
s=s.replace(old_state,new_state,1)

# Resize Canvas with the board.
s=s.replace("    dom.board.style.setProperty('--live-board-h', `${boardH}px`);\n  }","    dom.board.style.setProperty('--live-board-h', `${boardH}px`);\n    juice.resize();\n  }",1)

# ---------- next-card deck preview ----------
s=s.replace("      col.innerHTML = '<div class=\"deck-stack\"></div><span class=\"deck-count\"></span>';","      col.innerHTML = '<div class=\"deck-stack\"></div><div class=\"next-card\"><i></i></div><span class=\"deck-count\"></span>';",1)
upd_start=s.index('  function updateDeckVisuals() {')
upd_end=s.index('\n\n\n  function captureTileRects()',upd_start)
new_update=r'''  function updateDeckVisuals() {
    const columns=[...dom.deckArea.querySelectorAll('.deck-column')];
    columns.forEach((col,i)=>{
      const deck=game.decks?.[i]||[],count=deck.length,nextId=deck[0],tile=nextId?game.tiles.get(nextId):null;
      col.classList.toggle('is-empty',count<=0);col.dataset.depth=String(Math.min(3,count));col.dataset.showCount=count>0?'true':'false';
      const countEl=col.querySelector('.deck-count');if(countEl)countEl.textContent=count?String(count):'';
      const preview=col.querySelector('.next-card');
      if(preview){
        preview.classList.toggle('is-visible',!!tile);
        if(tile){preview.style.backgroundImage=`url("${PICTURE_PATHS[tile.imageIndex]}")`;preview.style.backgroundPosition=QUADRANTS[tile.quadrant].bg;preview.dataset.quadrant=String(tile.quadrant);preview.title=`下一张：${PICTURE_NAMES[tile.imageIndex]}`;}
        else{preview.style.backgroundImage='';preview.removeAttribute('title');}
      }
    });
  }'''
s=s[:upd_start]+new_update+s[upd_end:]

# ---------- deterministic 2/3-chain opportunities in level generation ----------
helper_marker='    // The reference starts with several already-joined 2/3-piece shapes.\n'
if helper_marker not in s: raise SystemExit('generator helper marker not found')
gen_helper=r'''    const locateAndSwapIntoDeckSlot=(id,col,pos=0)=>{
      const target=decks[col]?.[pos];
      if(target===id)return;
      const boardPos=board.indexOf(id);
      if(boardPos>=0){
        board[boardPos]=target||null;decks[col][pos]=id;return;
      }
      for(let dc=0;dc<decks.length;dc++){
        const p=decks[dc].indexOf(id);
        if(p<0)continue;
        decks[dc][p]=target;decks[col][pos]=id;return;
      }
      throw new Error(`deck tile location missing: ${id}`);
    };

'''
s=s.replace(helper_marker,gen_helper+helper_marker,1)
chain_marker='    // Never begin with an immediately complete 2x2 image.\n'
if chain_marker not in s: raise SystemExit('chain insertion marker not found')
chain_code=r'''    let chainSeed=null;
    if(level>=3&&selected.length>=3){
      const depth=level>=5?3:2;
      const chainImages=selected.slice(-depth);
      const anchors=[[0,GRID-2],[1,GRID-3],[2,GRID-4]];
      const protectedCells=new Set();
      const idsA=byImage.get(chainImages[0]),a=anchors[0];
      const aTargets=[0,1,2,3].map(q=>rcToIdx(a[0]+QUADRANTS[q].y,a[1]+QUADRANTS[q].x));
      [0,1,2].forEach(q=>{locateAndSwapIntoCell(idsA[q],aTargets[q]);protectedCells.add(aTargets[q]);});
      const sourceCandidates=Array.from({length:CELL_COUNT},(_,i)=>CELL_COUNT-1-i).filter(i=>!protectedCells.has(i)&&i!==aTargets[3]);
      const sourceCell=sourceCandidates[0];locateAndSwapIntoCell(idsA[3],sourceCell);protectedCells.add(sourceCell);

      for(let stage=1;stage<depth;stage++){
        const ids=byImage.get(chainImages[stage]),anchor=anchors[stage];
        const targets=[0,1,2,3].map(q=>rcToIdx(anchor[0]+QUADRANTS[q].y,anchor[1]+QUADRANTS[q].x));
        [0,2,3].forEach(q=>{locateAndSwapIntoCell(ids[q],targets[q]);protectedCells.add(targets[q]);});
        locateAndSwapIntoDeckSlot(ids[1],anchor[1]+1,0);
      }
      chainSeed={depth,starterId:idsA[3],targetCell:aTargets[3],protectedCells:[...protectedCells],images:chainImages};
    }

'''
s=s.replace(chain_marker,chain_code+chain_marker,1)
s=s.replace("    let guard = 0;\n    while (findCompleteGroups(board, tiles).length && guard++ < 80) {","    const chainProtected=new Set(chainSeed?.protectedCells||[]);\n    let guard = 0;\n    while (findCompleteGroups(board, tiles).length && guard++ < 80) {",1)
s=s.replace("      while ((group.cells.includes(other) || tiles.get(board[other])?.imageIndex === group.imageIndex) && tries++ < 40) {","      while ((group.cells.includes(other) || chainProtected.has(other) || tiles.get(board[other])?.imageIndex === group.imageIndex) && tries++ < 40) {",1)
s=s.replace("    return { seed, board, decks, tiles, selected, imageCount, grid: GRID };","    return { seed, board, decks, tiles, selected, imageCount, grid: GRID, chainSeed };",1)

# ---------- cascade prediction during drag ----------
pred_marker='  function captureTileRects() {\n'
if pred_marker not in s: raise SystemExit('prediction insertion marker not found')
pred_code=r'''  function simulateDealWave(board,decks) {
    let dealt=false;const waveCap=game.level<=2?1:2;
    for(let c=0;c<GRID;c++){
      const deck=decks[c];if(!deck?.length)continue;
      const emptyTop=[];for(let r=0;r<GRID;r++){const i=rcToIdx(r,c);if(board[i])break;emptyTop.push(i);}
      const minK=Math.max(0,emptyTop.length-waveCap);
      for(let k=emptyTop.length-1;k>=minK&&deck.length;k--){board[emptyTop[k]]=deck.shift();dealt=true;}
    }
    return dealt;
  }

  function predictCascade(board,decks=game.decks,maxWaves=5) {
    let b=board.slice(),d=decks.map(x=>x.slice()),waves=0,pictures=0,guard=0;
    while(guard++<80&&waves<maxWaves){
      const settled=settleGroupsRigid(b);
      if(settled.some((id,i)=>id!==b[i])){b=settled;continue;}
      const complete=findCompleteGroups(b,game.tiles);
      if(complete.length){
        const clear=new Set(complete.flatMap(g=>g.ids));b=b.map(id=>clear.has(id)?null:id);waves++;pictures+=complete.length;continue;
      }
      if(!simulateDealWave(b,d))break;
    }
    return{waves,pictures};
  }

  function clearChainPrediction() {
    game.lastChainPrediction=null;dom.fxLayer.querySelectorAll('.chain-predict-badge').forEach(el=>el.remove());
  }

  function updateChainPrediction(board,targetCells=[]) {
    clearChainPrediction();const prediction=predictCascade(board,game.decks,5);game.lastChainPrediction=prediction;
    if(prediction.pictures<1)return prediction;
    const center=averageCellCenter(targetCells.length?targetCells:[0]);
    const badge=document.createElement('div');badge.className='chain-predict-badge'+(prediction.waves>=2?' is-hot':'');
    badge.textContent=prediction.waves>=2?`连锁 ×${prediction.waves}`:'可完成';badge.style.left=`${center.x}%`;badge.style.top=`${center.y}%`;
    dom.fxLayer.appendChild(badge);return prediction;
  }

'''
s=s.replace(pred_marker,pred_code+pred_marker,1)

# clear prediction whenever highlights clear.
s=s.replace("  function clearCellHighlights() {\n    cellEls.forEach((cell) => cell.classList.remove('is-source','is-target','is-target-invalid'));\n  }","  function clearCellHighlights() {\n    cellEls.forEach((cell) => cell.classList.remove('is-source','is-target','is-target-invalid'));\n    clearChainPrediction();\n  }",1)
old_drag="""    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));"""
new_drag="""    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));
    if(result.valid&&result.board)updateChainPrediction(result.board,result.targets||[]);"""
if old_drag not in s: raise SystemExit('drag prediction marker not found')
s=s.replace(old_drag,new_drag,1)

# ---------- persistent streak HUD + FLOW meter ----------
hud_marker="    dom.progressBar.style.width = `${clamp(progress*100,0,100)}%`;\n"
if hud_marker not in s: raise SystemExit('HUD marker not found')
hud_extra=r'''    if(dom.chainStatus){
      const visible=game.streakCombo>=2&&game.streakGrace>0;
      dom.chainStatus.classList.toggle('is-visible',visible);
      dom.chainStatus.querySelector('strong').textContent=`×${Math.max(1,game.streakCombo)}`;
      dom.chainStatus.querySelector('small').textContent=game.feverActive?`热潮剩${game.feverTurns}步`:`可续${game.streakGrace}步`;
    }
    if(dom.flowFill)dom.flowFill.style.width=`${clamp(game.flowEnergy,0,100)}%`;
    if(dom.flowMeter)dom.flowMeter.classList.toggle('is-fever',game.feverActive);
    if(dom.flowText)dom.flowText.textContent=game.feverActive?'FEVER':`${Math.round(game.flowEnergy)}%`;
'''
s=s.replace(hud_marker,hud_marker+hud_extra,1)

# ---------- combo/flow state helpers ----------
resolve_start=s.index('  async function resolveBoard(')
resolve_end=s.index('\n\n  async function animateAndClear',resolve_start)
helpers=r'''  function chainSpeedFactor() {
    if(game.feverActive)return .67;
    if(game.turnChain>=4)return .72;
    if(game.turnChain>=3)return .78;
    if(game.turnChain>=2)return .88;
    return 1;
  }

  function comboHaptic(tier) {
    return [[10],[12,22,16],[18,20,24],[22,18,28,18,20],[26,16,32,16,26]][Math.max(1,Math.min(5,tier))-1];
  }

  function startFever() {
    if(game.feverActive)return;
    game.feverActive=true;game.feverTurns=3;game.feverStartedThisTurn=true;game.flowEnergy=0;game.streakGrace=Math.max(game.streakGrace,3);
    document.getElementById('gameStage')?.classList.add('is-fever');audio.feverStart();haptic([22,25,30]);juice.pulse(5);showToast('FLOW FEVER · 连锁加速！',1500);updateHud();
  }

  function endFever() {
    if(!game.feverActive)return;
    game.feverActive=false;game.feverTurns=0;document.getElementById('gameStage')?.classList.remove('is-fever');audio.feverEnd();updateHud();
  }

  function gainFlow(amount) {
    if(game.feverActive)return;
    game.flowEnergy=clamp(game.flowEnergy+amount,0,100);
    if(game.flowEnergy>=100)startFever();else updateHud();
  }

  function registerClear(count) {
    const firstThisTurn=game.turnCleared===0;
    game.turnCleared+=count;game.turnChain+=count;game.comboStreak=game.turnChain;
    if(firstThisTurn){
      if(game.streakGrace>0&&game.streakCombo>0)game.streakCombo+=count;
      else game.streakCombo=count;
    } else game.streakCombo+=count;
    game.streakGrace=game.feverActive?3:2;
    game.comboMax=Math.max(game.comboMax,game.turnChain,game.streakCombo);
    gainFlow(count*12+Math.max(0,game.turnChain-1)*7);
    return Math.min(5,game.turnChain+(game.feverActive?1:0));
  }

  function finishPlayerResolve(isPlayerMove) {
    if(!isPlayerMove)return;
    if(game.turnCleared===0){
      game.streakGrace=Math.max(0,game.streakGrace-1);
      if(game.streakGrace===0)game.streakCombo=0;
    }
    if(game.feverActive&&!game.feverStartedThisTurn){game.feverTurns--;if(game.feverTurns<=0)endFever();}
    updateHud();
  }

'''
new_resolve=r'''  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {
    game.phase='resolving';
    if(isPlayerMove){game.turnChain=0;game.turnCleared=0;game.feverStartedThisTurn=false;if(game.streakGrace<=0)game.streakCombo=0;}
    game.lastResolveTrace=[];
    let baseline=new Set(beforeConnections),safety=0;

    while(safety++<128){
      game.groups=computeGroups();game.connections=computeConnections();
      const beforeGravity=new Set(game.connections),moved=await applyGravity();
      if(moved){game.lastResolveTrace.push('gravity');baseline=beforeGravity;continue;}

      game.groups=computeGroups();game.connections=computeConnections();
      const newIds=new Set();
      for(const edge of game.connections)if(!baseline.has(edge))edge.split('|').forEach(id=>newIds.add(id));
      if(newIds.size){
        game.lastResolveTrace.push('merge');
        const touched=game.groups.filter(g=>g.ids.some(id=>newIds.has(id))),stage=Math.max(2,...touched.map(g=>g.ids.length));
        touched.forEach(g=>juice.mergeGroup(g));newIds.forEach(id=>tileEls.get(id)?.classList.add('merge-pop'));
        audio.mergeStage(stage);haptic(stage>=3?[10,18,14]:9);await delay(Math.round(120*chainSpeedFactor()));
        newIds.forEach(id=>tileEls.get(id)?.classList.remove('merge-pop'));baseline=new Set(game.connections);
      }

      const complete=game.groups.filter(g=>g.complete);
      if(complete.length){
        game.lastResolveTrace.push('clear');const tier=registerClear(complete.length);
        showCombo(game.turnChain,game.streakCombo,tier);await animateAndClear(complete,tier);baseline=new Set();continue;
      }

      const beforeDeal=new Set(game.connections),dealt=await dealIntoBoard();
      if(dealt){game.lastResolveTrace.push('deal');baseline=beforeDeal;continue;}
      if(await rescueIfStalled()){game.lastResolveTrace.push('rescue');baseline=new Set();continue;}
      break;
    }

    if(remainingDeckCount()===0&&game.board.every(v=>!v)){finishPlayerResolve(isPlayerMove);await finishLevel();return;}
    finishPlayerResolve(isPlayerMove);game.phase='idle';
  }'''
s=s[:resolve_start]+helpers+new_resolve+s[resolve_end:]

# ---------- tiered clear sequence + Canvas effects ----------
clear_start=s.index('  async function animateAndClear(')
clear_end=s.index('\n\n  function createSparks',clear_start)
new_clear=r'''  async function animateAndClear(groups,tier=1) {
    const clearIds=[],overlays=[];tier=Math.max(1,Math.min(5,tier));
    for(const group of groups){
      clearIds.push(...group.ids);const overlay=document.createElement('div');overlay.className='complete-overlay';overlay.dataset.tier=String(tier);
      const rect=groupRectPercent(group);overlay.style.left=`${rect.left}%`;overlay.style.top=`${rect.top}%`;overlay.style.width=`${rect.width}%`;overlay.style.height=`${rect.height}%`;
      overlay.style.backgroundImage=`url("${PICTURE_PATHS[group.imageIndex]}")`;overlay.style.animationDuration=`${Math.max(330,650-tier*55)}ms`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      if(!game.clearedImages.includes(group.imageIndex))game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);
    }
    juice.clearGroups(groups,tier);audio.chain(tier,game.feverActive);haptic(comboHaptic(tier));
    if(tier>=3)await delay(52);
    clearIds.forEach(id=>tileEls.get(id)?.classList.add('clear-out'));
    const hold=Math.round(Math.max(285,570-tier*48)*chainSpeedFactor());await delay(hold);
    game.board=game.board.map(id=>clearIds.includes(id)?null:id);
    clearIds.forEach(id=>{const el=tileEls.get(id);if(el){el.remove();tileEls.delete(id);}});overlays.forEach(el=>el.remove());
    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();
    if(game.level===1&&game.clearedCount===groups.length&&!save.tutorialSeen)showToast('完成！空位会先下落，顶部牌堆再继续补牌',3000);
  }'''
s=s[:clear_start]+new_clear+s[clear_end:]

spark_start=s.index('  function createSparks(')
spark_end=s.index('\n\n  function gravityStep',spark_start)
new_spark=r'''  function createSparks(xPercent,yPercent,count=14) {
    juice.burstPercent(xPercent,yPercent,Math.max(1,Math.ceil(count/12)),count);
  }'''
s=s[:spark_start]+new_spark+s[spark_end:]

# ---------- faster chain-dependent falling/dealing ----------
s=s.replace("    const duration=Math.min(430,Math.max(170,145+maxDrop*62));","    const duration=Math.round(Math.min(430,Math.max(170,145+maxDrop*62))*chainSpeedFactor());",1)
s=s.replace("    audio.deal();haptic(Math.min(30,8+maxDrop*4));\n    await delay(82);","    audio.drop(maxDrop);haptic(Math.min(30,8+maxDrop*4));\n    await delay(Math.round(70*chainSpeedFactor()));",1)
s=s.replace("    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();","    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();\n    const dealFactor=chainSpeedFactor();",1)
s=s.replace("      card.style.animationDelay=`${n*24}ms`;card.innerHTML='<div class=\"face back\"></div>';dom.fxLayer.appendChild(card);","      card.style.animationDelay=`${Math.round(n*24*dealFactor)}ms`;card.style.animationDuration=`${Math.round(480*dealFactor)}ms`;card.innerHTML='<div class=\"face back\"></div>';dom.fxLayer.appendChild(card);",1)
s=s.replace("      },220+n*24);","      },Math.round(220*dealFactor+n*24*dealFactor));",1)
s=s.replace("    await delay(250+dealt.length*24+235);","    await delay(Math.round((250+dealt.length*24+235)*dealFactor));",1)

# ---------- combo presentation without forced layout ----------
show_start=s.index('  function showCombo(')
show_end=s.index('  function showToast',show_start)
new_show=r'''  function showCombo(value,streak=value,tier=Math.min(5,value)) {
    const label=value>=5?'FEVER CHAIN':value>=3?'SUPER CHAIN':value>=2?'CHAIN':'NICE';
    dom.comboToast.querySelector('span').textContent=label;dom.comboToast.querySelector('strong').textContent=`× ${value}`;dom.comboToast.dataset.tier=String(tier);
    dom.comboToast.classList.remove('is-visible');requestAnimationFrame(()=>requestAnimationFrame(()=>dom.comboToast.classList.add('is-visible')));
    clearTimeout(game.comboToastTimer);game.comboToastTimer=setTimeout(()=>dom.comboToast.classList.remove('is-visible'),720+Math.min(5,tier)*90);
    updateHud();
  }
'''
s=s[:show_start]+new_show+s[show_end:]

# ---------- level reset/tutorial ----------
reset_old="game.comboMax=1;game.comboStreak=0;game.hintCount=3;game.autoCount=3;game.movesSinceClear=0;game.timerBase=0;game.timerRunning=false;"
reset_new="game.comboMax=1;game.comboStreak=0;game.turnChain=0;game.turnCleared=0;game.streakCombo=0;game.streakGrace=0;game.flowEnergy=0;game.feverActive=false;game.feverTurns=0;game.feverStartedThisTurn=false;game.hintCount=3;game.autoCount=3;game.movesSinceClear=0;game.timerBase=0;game.timerRunning=false;juice.reset();document.getElementById('gameStage')?.classList.remove('is-fever');"
if reset_old not in s: raise SystemExit('level reset marker not found')
s=s.replace(reset_old,reset_new,1)
tutorial_old="""    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}else dom.tutorialHand.classList.remove('is-visible');"""
tutorial_new="""    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}
    else{dom.tutorialHand.classList.remove('is-visible');if(game.level===3)showToast('看牌堆下一张：先完成上层图片，试着触发二连锁',3300);else if(game.level===5)showToast('三连锁教学：提前留好落点，连得越多反馈越强',3400);}"""
if tutorial_old not in s: raise SystemExit('tutorial marker not found')
s=s.replace(tutorial_old,tutorial_new,1)

# Export v3.8 debug/regression helpers.
export_old='pictureCount:PICTURE_PATHS.length};'
export_new='pictureCount:PICTURE_PATHS.length,predictCascade,simulateDealWave,chainSpeedFactor,juice,registerClear,startFever,endFever};'
if export_old not in s: raise SystemExit('export marker not found')
s=s.replace(export_old,export_new,1)

GAME.write_text(s,encoding='utf-8')

# ---------- HTML ----------
idx=INDEX.read_text(encoding='utf-8')
if 'id="juiceCanvas"' not in idx:
    idx=idx.replace('              <div id="fxLayer" class="fx-layer" aria-hidden="true"></div>',
'''              <div id="fxLayer" class="fx-layer" aria-hidden="true"></div>
              <canvas id="juiceCanvas" class="juice-canvas" aria-hidden="true"></canvas>
              <div id="chainStatus" class="chain-status" aria-live="polite"><span>连击</span><strong>×1</strong><small>可续2步</small></div>''',1)
if 'id="flowMeter"' not in idx:
    idx=idx.replace('          <div class="status-row">',
'''          <div id="flowMeter" class="flow-meter" aria-label="连锁能量"><span>FLOW</span><i><b id="flowFill"></b></i><em id="flowText">0%</em></div>
          <div class="status-row">''',1)
idx=idx.replace('图片图鉴 <span id="galleryCount">0 / 36</span>','图片图鉴 <span id="galleryCount">0 / 60</span>')
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=3.8.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=3.8.0',idx)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=3.8.0',idx)
INDEX.write_text(idx,encoding='utf-8')

# ---------- CSS ----------
css=CSS.read_text(encoding='utf-8')
css += r'''

/* v3.8-chain-juice */
.juice-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:66;pointer-events:none!important;transform:translateZ(0)}
.chain-status{position:absolute;right:8px;top:8px;z-index:72;display:flex;align-items:center;gap:5px;padding:5px 8px;border-radius:12px;background:rgba(4,56,139,.72);border:1px solid rgba(255,255,255,.45);box-shadow:0 4px 10px rgba(0,32,94,.22);opacity:0;transform:translateY(-7px) scale(.92);transition:opacity .18s,transform .18s;pointer-events:none}
.chain-status.is-visible{opacity:1;transform:none}.chain-status span{font-size:9px;font-weight:900;color:#b8f7ff}.chain-status strong{font-size:16px;color:#fff27a;text-shadow:0 2px 4px rgba(0,0,0,.25)}.chain-status small{font-size:8px;color:#fff}
.flow-meter{width:var(--board-size);height:18px;margin-top:3px;display:grid;grid-template-columns:34px 1fr 30px;gap:5px;align-items:center;opacity:.92;transition:filter .2s,transform .2s}
.flow-meter span,.flow-meter em{font-size:8px;font-style:normal;font-weight:900;color:#dffcff;text-shadow:0 1px 2px rgba(0,38,96,.45)}
.flow-meter em{text-align:right}.flow-meter i{position:relative;height:6px;border-radius:7px;background:rgba(0,55,139,.32);border:1px solid rgba(255,255,255,.34);overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,32,90,.32)}
.flow-meter i b{display:block;height:100%;width:0;border-radius:6px;background:linear-gradient(90deg,#66f6ff,#fff06e,#ff86c7);box-shadow:0 0 9px rgba(119,246,255,.8);transition:width .28s cubic-bezier(.2,.9,.24,1)}
.flow-meter.is-fever{filter:brightness(1.25);transform:scale(1.015)}.flow-meter.is-fever i b{width:100%!important;animation:flowGlow .4s ease-in-out infinite alternate}
@keyframes flowGlow{to{filter:hue-rotate(35deg) brightness(1.35)}}
.next-card{position:absolute;left:50%;top:25px;width:30%;aspect-ratio:.69;transform:translateX(-50%) translateY(-2px) scale(.88);border-radius:3px;background-size:200% 200%;background-repeat:no-repeat;border:1.5px solid rgba(255,255,255,.9);box-shadow:0 3px 7px rgba(0,40,100,.28);opacity:0;transition:opacity .18s,transform .18s;z-index:4;overflow:hidden}
.next-card::after{content:'NEXT';position:absolute;left:50%;bottom:-1px;transform:translateX(-50%);font-size:5px;font-weight:900;letter-spacing:.3px;color:#fff;background:rgba(0,52,130,.68);padding:0 3px;border-radius:3px 3px 0 0}.next-card.is-visible{opacity:1;transform:translateX(-50%) scale(1)}
.deck-count{opacity:1!important;top:8px!important;right:1px!important;background:rgba(4,69,154,.78)!important}
.chain-predict-badge{position:absolute;z-index:74;pointer-events:none;transform:translate(-50%,-118%);padding:4px 8px;border-radius:12px;background:rgba(2,72,164,.88);border:1px solid rgba(255,255,255,.7);font-size:9px;font-weight:900;color:#c9faff;box-shadow:0 3px 12px rgba(0,42,110,.28);animation:predictPop .25s cubic-bezier(.2,1.2,.3,1)}
.chain-predict-badge.is-hot{color:#fff36f;background:rgba(159,64,10,.9);box-shadow:0 0 16px rgba(255,225,74,.72)}
@keyframes predictPop{from{opacity:0;transform:translate(-50%,-90%) scale(.72)}}
.combo-toast[data-tier="1"]{filter:none}.combo-toast[data-tier="2"]{transform:translate(-50%,-50%) scale(1.05)}.combo-toast[data-tier="3"]{transform:translate(-50%,-50%) scale(1.14);color:#fff17b}.combo-toast[data-tier="4"]{transform:translate(-50%,-50%) scale(1.22);color:#ffcf72}.combo-toast[data-tier="5"]{transform:translate(-50%,-50%) scale(1.3);color:#ff87dc;text-shadow:0 0 15px #fff,0 4px 0 #50306f}
.board-wrap.juice-hit-1{animation:boardHit1 .18s ease-out}.board-wrap.juice-hit-2{animation:boardHit2 .22s ease-out}.board-wrap.juice-hit-3{animation:boardHit3 .24s ease-out}.board-wrap.juice-hit-4,.board-wrap.juice-hit-5{animation:boardHit4 .28s ease-out}
@keyframes boardHit1{45%{transform:scale(1.004)}}@keyframes boardHit2{35%{transform:scale(1.009)}}@keyframes boardHit3{25%{transform:translateX(-2px) scale(1.013)}55%{transform:translateX(2px) scale(1.008)}}@keyframes boardHit4{20%{transform:translate(-3px,1px) scale(1.018)}48%{transform:translate(3px,-1px) scale(1.012)}75%{transform:translate(-1px,0) scale(1.006)}}
.deck-area.deck-react{animation:deckReact .24s ease-out}@keyframes deckReact{45%{transform:translateY(-2px);filter:brightness(1.22)}}
.game-stage.is-fever::before{content:'';position:absolute;inset:0;z-index:9;pointer-events:none;background:radial-gradient(circle at 50% 48%,transparent 45%,rgba(255,95,211,.16));animation:feverStage .65s ease-in-out infinite alternate}
@keyframes feverStage{to{filter:hue-rotate(24deg);opacity:.68}}
.complete-overlay[data-tier="3"],.complete-overlay[data-tier="4"],.complete-overlay[data-tier="5"]{box-shadow:0 0 0 4px rgba(255,232,76,.88),0 0 55px #fff487,0 16px 28px rgba(0,32,93,.35)}
/* Performance contract: canvas carries particles; static layers remain isolated. */
.juice-canvas,.joined-surface,.tile{backface-visibility:hidden;-webkit-backface-visibility:hidden}.deck-area,.board-wrap{will-change:transform}.fx-layer{contain:layout paint style}
@media(max-height:730px){.flow-meter{height:13px;margin-top:0}.next-card{top:23px;width:27%}}
'''
CSS.write_text(css,encoding='utf-8')

# ---------- cache ----------
sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v3.8.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=3.8.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=3.8.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=3.8.0',sw)
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('3.8.0\n',encoding='utf-8')
print('patched v3.8 chain planning and juice')
