#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
INDEX = ROOT / 'index.html'
CSS = ROOT / 'style.css'
SW = ROOT / 'sw.js'
VERSION = ROOT / 'VERSION'

if VERSION.read_text(encoding='utf-8').strip() != '4.0.0':
    raise SystemExit('v4.1 patch expects VERSION 4.0.0')

s = GAME.read_text(encoding='utf-8')

# Scheme B should reveal the clean image first. The finished blessing typography
# is generated in the dedicated poster view, not baked into the clear animation.
lockup = """      if(game.mode==='blessing'){
        const meta=blessingMeta(group.imageIndex);if(meta){const lock=document.createElement('div');lock.className='blessing-lockup';lock.innerHTML=`<strong>${meta.title}</strong><span>${meta.lines.join(' · ')}</span>`;overlay.appendChild(lock);}
      }
"""
s = s.replace(lockup, '', 1)

# Lightweight telemetry hooks in gesture-only branches.
s = s.replace(
    "showToast('已拆成单块', 650); haptic(12); audio.tap();",
    "showToast('已拆成单块', 650); haptic(12); audio.tap(); trackEvent('split_used',{tileId:id,groupSize:joined.ids.length});",
    1,
)
s = s.replace(
    "audio.invalid(); haptic([10,25,10]);",
    "audio.invalid(); haptic([10,25,10]); trackEvent('invalid_move',{dr:drag.lastDr,dc:drag.lastDc,splitMode:drag.splitMode});",
    1,
)

override_marker = "\n\n  async function boot() {"
if override_marker not in s:
    raise SystemExit('boot marker missing')

override = r'''

  // ---------------------------------------------------------------------------
  // v4.1 core-experience refactor
  // Challenge mode keeps the deeper gravity puzzle. Blessing mode is a short
  // two-picture creation loop whose first meaningful reward arrives in 1–2 moves.
  // ---------------------------------------------------------------------------
  const V41_VERSION='4.1.0';
  const V41_BLESSING_PACKS=[
    BLESSING_INDICES.slice(0,2),
    BLESSING_INDICES.slice(2,4),
    BLESSING_INDICES.slice(4,6)
  ];
  const V41_SESSION_ID=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

  dom.undoBtn=$('undoBtn');
  dom.workBadgeTotal=$('workBadgeTotal');
  dom.blessingContinueBtn=$('blessingContinueBtn');
  dom.blessingWinText=$('blessingWinText');
  dom.exportDataBtn=$('exportDataBtn');

  if(!Array.isArray(save.telemetry))save.telemetry=[];
  save.schemaVersion=4;
  Object.assign(game,{
    needsRescue:false,
    undoSnapshot:null,
    autoRewardShown:false,
    rewardPending:false,
    rewardResolve:null,
    firstMoveAt:0,
    blessingPack:1
  });

  let telemetryPersistTimer=0;
  function trackEvent(name,data={}){
    const event={
      name,
      at:Date.now(),
      session:V41_SESSION_ID,
      version:V41_VERSION,
      mode:game.mode,
      level:game.level,
      phase:game.phase,
      moves:game.moves,
      cleared:game.clearedCount,
      ...data
    };
    save.telemetry.push(event);
    if(save.telemetry.length>240)save.telemetry.splice(0,save.telemetry.length-240);
    clearTimeout(telemetryPersistTimer);
    telemetryPersistTimer=setTimeout(()=>persist(),180);
    return event;
  }

  function downloadTelemetry(){
    const payload={schemaVersion:save.schemaVersion||4,exportedAt:new Date().toISOString(),version:V41_VERSION,events:save.telemetry||[]};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=`jigsaw-drop-test-data-${Date.now()}.json`;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1200);showToast('测试数据已导出');
  }

  function blessingPackForLevel(level){return ((Math.max(1,Number(level)||1)-1)%V41_BLESSING_PACKS.length)+1;}

  const v40ImageCountForLevel=imageCountForLevel;
  imageCountForLevel=function(level){
    if(game.mode==='blessing')return 2;
    if(level<=14)return v40ImageCountForLevel(level);
    if(level===15)return 9;
    const band=Math.floor((level-15)/5);
    let count=Math.min(13,9+band);
    if(isHardLevel(level))count=Math.min(14,count+1);
    else if((level-16)%5===0)count=Math.max(9,count-1);
    return count;
  };

  const v40SelectedImagesForLevel=selectedImagesForLevel;
  selectedImagesForLevel=function(level,count){
    if(game.mode==='blessing')return V41_BLESSING_PACKS[blessingPackForLevel(level)-1].slice();
    return v40SelectedImagesForLevel(level,count);
  };

  const v40LevelIntroCopy=levelIntroCopy;
  levelIntroCopy=function(level){
    if(game.mode==='blessing'){
      const pack=blessingPackForLevel(level);
      return pack===1?'先拼出第一张写实美图，完成后立即生成祝福作品':`今日祝福第 ${pack}/3 组 · 每完成一张都可保存分享`;
    }
    if(level===15)return '5×5 规划关 · 9张图片，少一些杂乱，多一些落点与连锁';
    return v40LevelIntroCopy(level);
  };

  function makeBlessingTiles(level,selected){
    const tiles=new Map(),byImage=new Map();
    selected.forEach((imageIndex,imageOrder)=>{
      const ids=[];
      for(let q=0;q<4;q++){
        const id=`B${level}-I${imageIndex}-Q${q}`;
        tiles.set(id,{id,imageIndex,imageOrder,quadrant:q});ids.push(id);
      }
      byImage.set(imageIndex,ids);
    });
    return{tiles,byImage};
  }

  function generateBlessingLevelV41(level){
    const pack=blessingPackForLevel(level),selected=V41_BLESSING_PACKS[pack-1].slice();
    const {tiles,byImage}=makeBlessingTiles(pack,selected);
    const board=Array(CELL_COUNT).fill(null),decks=Array.from({length:GRID},()=>[]);
    const a=byImage.get(selected[0]),b=byImage.get(selected[1]);
    const assign=(cell,id)=>{board[cell]=id;};

    // All eight pieces are visible. Pack 1 gives a genuine one-move first reward:
    // move A3 from cell 15 to 13 and the first 2x2 image is complete.
    if(pack===1){
      [[8,a[0]],[9,a[1]],[10,b[0]],[11,b[1]],[12,a[2]],[13,b[2]],[14,b[3]],[15,a[3]]].forEach(([c,id])=>assign(c,id));
    }else{
      [[8,a[0]],[9,a[1]],[10,b[0]],[11,b[1]],[12,a[2]],[13,a[3]],[14,b[2]],[15,b[3]]].forEach(([c,id])=>assign(c,id));
      const swaps=pack===2?[[9,14],[12,11],[13,10]]:[[8,15],[9,12],[10,13],[11,14]];
      swaps.forEach(([x,y])=>{[board[x],board[y]]=[board[y],board[x]];});
    }
    return{
      seed:(0xB1E55100+pack*104729)>>>0,
      board,decks,tiles,selected,imageCount:2,grid:4,chainSeed:null,
      solutionHint:pack===1?{sourceCell:15,targetCell:13,imageIndex:selected[0]}:null,
      blessingPack:pack
    };
  }

  const v40GenerateLevel=generateLevel;
  generateLevel=function(level){
    if(game.mode==='blessing')return generateBlessingLevelV41(level);
    return v40GenerateLevel(level);
  };

  // Support-aware gravity: a joined shape first attempts to fall as one rigid body.
  // Only when a shape is asymmetrically supported and no complete body can fall do
  // unsupported quarters fracture and settle, preventing floating cavities.
  const v40GravityStep=gravityStep;
  gravityStep=function(board){
    const groups=computeGroups(board,game.tiles);
    const groupByCell=new Map();
    groups.forEach((group,index)=>group.cells.forEach(cell=>groupByCell.set(cell,index)));
    const memo=new Map(),visiting=new Set();
    const canMove=(index)=>{
      if(memo.has(index))return memo.get(index);
      if(visiting.has(index))return false;
      visiting.add(index);
      const group=groups[index],own=new Set(group.cells);
      let ok=true;
      for(const cell of group.cells){
        const {r}=idxToRC(cell);
        if(r>=GRID-1){ok=false;break;}
        const below=cell+GRID;
        if(own.has(below)||!board[below])continue;
        const support=groupByCell.get(below);
        if(support===undefined||support===index||!canMove(support)){ok=false;break;}
      }
      visiting.delete(index);memo.set(index,ok);return ok;
    };
    const movable=[];
    groups.forEach((_,i)=>{if(canMove(i))movable.push(i);});
    if(movable.length){
      const ids=[],next=board.slice();
      movable.forEach(i=>groups[i].cells.forEach(cell=>{ids.push(board[cell]);next[cell]=null;}));
      movable.forEach(i=>groups[i].cells.forEach(cell=>{next[cell+GRID]=board[cell];}));
      return{moved:true,board:next,ids};
    }
    return v40GravityStep(board);
  };

  // The next-card preview must be trustworthy. Runtime dealing no longer silently
  // reorders deck fronts; any true deadlock is surfaced and repaired only after the
  // player explicitly taps the glowing magic-wand button.
  primeDecksForPlayableFrontier=function(){return false;};

  function captureUndoSnapshot(){
    return{
      board:game.board.slice(),
      decks:(game.decks||[]).map(deck=>deck.slice()),
      moves:game.moves,clearedCount:game.clearedCount,clearedImages:game.clearedImages.slice(),
      unlockedThisLevel:game.unlockedThisLevel.slice(),movesSinceClear:game.movesSinceClear,
      comboMax:game.comboMax,comboStreak:game.comboStreak,turnChain:game.turnChain,turnCleared:game.turnCleared,
      streakCombo:game.streakCombo,streakGrace:game.streakGrace,flowEnergy:game.flowEnergy,
      feverActive:game.feverActive,feverTurns:game.feverTurns,needsRescue:game.needsRescue,
      elapsed:currentElapsed(),blessings:save.blessings.slice(),unlocked:save.unlocked.slice()
    };
  }

  function restoreUndoSnapshot(snapshot){
    if(!snapshot)return false;
    pauseTimer();hideModals();dom.winScreen.classList.remove('is-visible');
    game.board=snapshot.board.slice();game.decks=snapshot.decks.map(deck=>deck.slice());
    game.moves=snapshot.moves;game.clearedCount=snapshot.clearedCount;game.clearedImages=snapshot.clearedImages.slice();
    game.unlockedThisLevel=snapshot.unlockedThisLevel.slice();game.movesSinceClear=snapshot.movesSinceClear;
    game.comboMax=snapshot.comboMax;game.comboStreak=snapshot.comboStreak;game.turnChain=snapshot.turnChain;game.turnCleared=snapshot.turnCleared;
    game.streakCombo=snapshot.streakCombo;game.streakGrace=snapshot.streakGrace;game.flowEnergy=snapshot.flowEnergy;
    game.feverActive=snapshot.feverActive;game.feverTurns=snapshot.feverTurns;game.needsRescue=snapshot.needsRescue;
    game.timerBase=snapshot.elapsed;game.timerStartedAt=performance.now();
    save.blessings=snapshot.blessings.slice();save.unlocked=snapshot.unlocked.slice();persist();
    tileEls.forEach(el=>el.remove());tileEls.clear();clearJoinedSurfaces();dom.fxLayer.innerHTML='';clearCellHighlights();
    game.phase='idle';game.undoSnapshot=null;renderBoard();updateHome();updateHud();resumeTimer();
    trackEvent('undo_used');showToast('已撤销上一步');audio.swap();haptic(10);return true;
  }

  function undoLastMove(){
    if(game.phase!=='idle'||!game.undoSnapshot)return false;
    return restoreUndoSnapshot(game.undoSnapshot);
  }

  const v40CommitMove=commitMove;
  commitMove=async function(sourceGroup,dr,dc,preparedBoard=null,fromDrag=false){
    const snapshot=captureUndoSnapshot(),beforeMoves=game.moves;
    const ok=await v40CommitMove(sourceGroup,dr,dc,preparedBoard,fromDrag);
    if(ok){
      if(game.phase!=='won')game.undoSnapshot=snapshot;
      if(beforeMoves===0&&!game.firstMoveAt)game.firstMoveAt=Date.now();
      trackEvent('move_committed',{dr,dc,groupSize:sourceGroup?.ids?.length||0,fromDrag:!!fromDrag});
      updateHud();
    }
    return ok;
  };

  const v40UpdateHud=updateHud;
  updateHud=function(){
    v40UpdateHud();
    if(dom.undoBtn){
      const disabled=!game.undoSnapshot||game.phase!=='idle';
      dom.undoBtn.disabled=disabled;dom.undoBtn.classList.toggle('is-empty',disabled);
    }
    if(dom.workBadgeTotal)dom.workBadgeTotal.textContent=String(game.totalImages||2);
    if(dom.autoBtn){
      dom.autoBtn.classList.toggle('needs-rescue',!!game.needsRescue);
      dom.autoBtn.setAttribute('aria-label',game.needsRescue?'解锁当前局面':'自动整理');
      dom.autoBtn.title=game.needsRescue?'当前局面需要整理，点击解锁':'自动整理一步';
    }
  };

  const v40ClearHintMarks=clearHintMarks;
  clearHintMarks=function(){
    v40ClearHintMarks();
    tileEls.forEach(el=>el.classList.remove('hint-dim'));
    document.getElementById('gameStage')?.classList.remove('is-hinting');
    dom.fxLayer.querySelectorAll('.hint-picture-preview,.hint-image-ghost,.hint-action-label').forEach(el=>el.remove());
  };

  markHint=function(move){
    clearHintMarks();document.getElementById('gameStage')?.classList.add('is-hinting');
    const targetCells=move.group.cells.map(i=>{const {r,c}=idxToRC(i);return rcToIdx(r+move.dr,c+move.dc);});
    tileEls.forEach((el,id)=>{
      const same=game.tiles.get(id)?.imageIndex===move.imageIndex;
      el.classList.toggle('hint-dim',!same);
      if(same)el.classList.add('is-hint-family');
    });
    move.group.ids.forEach(id=>tileEls.get(id)?.classList.add('is-hint-source'));
    targetCells.forEach(cell=>{cellEls[cell]?.classList.add('is-target');const id=game.board[cell];if(id)tileEls.get(id)?.classList.add('is-hint-target');});

    if(move.targetAnchor){
      const g=cellRectPercentByRC(move.targetAnchor.r,move.targetAnchor.c);
      const ghost=document.createElement('div');ghost.className='hint-image-ghost';
      ghost.style.left=`${g.left}%`;ghost.style.top=`${g.top}%`;ghost.style.width=`${g.width*2}%`;ghost.style.height=`${g.height*2}%`;
      ghost.style.backgroundImage=`url("${PICTURE_PATHS[move.imageIndex]}")`;dom.fxLayer.appendChild(ghost);
      const frame=document.createElement('div');frame.className='hint-target-frame';frame.style.left=ghost.style.left;frame.style.top=ghost.style.top;frame.style.width=ghost.style.width;frame.style.height=ghost.style.height;dom.fxLayer.appendChild(frame);
    }

    const preview=document.createElement('div');preview.className='hint-picture-preview';preview.style.backgroundImage=`url("${PICTURE_PATHS[move.imageIndex]}")`;preview.innerHTML=`<span>正在拼：${PICTURE_NAMES[move.imageIndex]}</span>`;dom.fxLayer.appendChild(preview);
    const src=averageCellCenter(move.group.cells),label=document.createElement('div');label.className='hint-action-label';label.style.left=`${src.x}%`;label.style.top=`${src.y}%`;label.textContent=move.splitMode?'长按拆出这一块':'拖动这一组';dom.fxLayer.appendChild(label);
    drawHintArrow(move.group.cells,targetCells);
    game.hintTimer=window.setTimeout(clearHintMarks,4200);
  };

  useHint=async function(){
    if(game.phase!=='idle')return;
    if(game.hintCount<=0){showToast('提示次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){
      const need=game.needsRescue||(visibleCompletionImage()===null&&remainingDeckCount()>0);
      showToast(need?'关键碎片还在牌堆里，点击闪烁魔棒解锁局面':'先把同一张图的四块都露出来，再观察目标轮廓',2800);audio.invalid();trackEvent('hint_no_move',{needsRescue:need});return;
    }
    game.hintCount--;updateHud();markHint(move);audio.merge();trackEvent('hint_used',{imageIndex:move.imageIndex,splitMode:move.splitMode});
    showToast(move.splitMode?'看完整图预览：长按发光碎片，再拖进半透明目标':'看完整图预览：把发光组合拖进半透明目标',3000);
  };

  useAuto=async function(){
    if(game.phase!=='idle')return;
    if(game.needsRescue){
      game.phase='resolving';const changed=await ensurePlayableFrontier(true);game.needsRescue=!changed;game.phase='idle';
      trackEvent('explicit_rescue',{changed});renderBoard();updateHud();return;
    }
    if(game.autoCount<=0){showToast('自动整理次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){
      if(visibleCompletionImage()===null&&remainingDeckCount()>0){game.needsRescue=true;updateHud();showToast('局面需要整理，再点一次闪烁魔棒即可解锁',2600);trackEvent('deadlock_detected',{source:'auto'});}
      else{showToast('暂时没有需要整理的位置');audio.invalid();}
      return;
    }
    game.autoCount--;updateHud();markHint(move);game.phase='hinting';await delay(520);clearHintMarks();trackEvent('auto_used',{imageIndex:move.imageIndex});
    await commitMove(move.group,move.dr,move.dc,move.board,false);
  };

  resolveBoard=async function(beforeConnections=new Set(),isPlayerMove=false){
    game.phase='resolving';game.needsRescue=false;
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
        showCombo(game.turnChain,game.streakCombo,tier);await animateAndClear(complete,tier);baseline=new Set();game.needsRescue=false;continue;
      }

      const beforeDeal=new Set(game.connections),dealt=await dealIntoBoard();
      if(dealt){game.lastResolveTrace.push('deal');baseline=beforeDeal;game.needsRescue=false;continue;}
      break;
    }

    if(remainingDeckCount()===0&&game.board.every(v=>!v)){finishPlayerResolve(isPlayerMove);await finishLevel();return;}

    const stuck=visibleCompletionImage()===null&&remainingDeckCount()>0;
    if(stuck){
      game.needsRescue=true;trackEvent('deadlock_detected',{source:'resolver',deck:remainingDeckCount()});
      showToast('当前局面需要整理：点击闪烁魔棒即可解锁，不会暗中换牌',3200);
    }
    finishPlayerResolve(isPlayerMove);game.phase='idle';updateHud();
  };

  function finishBlessingReward(){
    if(!game.rewardPending)return false;
    game.rewardPending=false;dom.blessingContinueBtn.hidden=true;
    dom.blessingModal.querySelector('.blessing-modal-card')?.classList.remove('is-reward');hideModals();
    const resolve=game.rewardResolve;game.rewardResolve=null;if(resolve)resolve();resumeTimer();return true;
  }

  async function presentBlessingReward(index){
    pauseTimer();game.rewardPending=true;
    let release;const wait=new Promise(resolve=>{release=resolve;});game.rewardResolve=release;
    dom.blessingContinueBtn.hidden=false;dom.blessingModal.querySelector('.blessing-modal-card')?.classList.add('is-reward');
    showModal(dom.blessingModal);
    try{await refreshBlessingModal(index);}catch(_){showToast('作品生成失败，可稍后在作品集重试');}
    trackEvent('blessing_first_reward',{imageIndex:index,firstRewardMs:game.firstMoveAt?Date.now()-game.firstMoveAt:null});
    return wait;
  }

  const v40AnimateAndClear=animateAndClear;
  animateAndClear=async function(groups,tier=1){
    const blessingIndices=groups.map(g=>g.imageIndex).filter(isBlessingIndex);
    await v40AnimateAndClear(groups,tier);
    if(game.mode==='blessing'&&!game.autoRewardShown&&blessingIndices.length){
      game.autoRewardShown=true;await presentBlessingReward(blessingIndices[0]);
    }
  };

  const v40StartLevel=startLevel;
  startLevel=async function(level){
    if(game.mode==='blessing')level=blessingPackForLevel(level);
    game.blessingPack=game.mode==='blessing'?blessingPackForLevel(level):0;
    game.undoSnapshot=null;game.needsRescue=false;game.autoRewardShown=false;game.rewardPending=false;game.rewardResolve=null;game.firstMoveAt=0;
    dom.winScreen.classList.remove('is-blessing-win');if(dom.blessingWinText)dom.blessingWinText.hidden=true;
    const result=await v40StartLevel(level);
    trackEvent('level_start',{selected:(game.selectedImages||[]).slice(),totalImages:game.totalImages,blessingPack:game.blessingPack});
    updateHud();return result;
  };

  const v40FinishLevel=finishLevel;
  finishLevel=async function(){
    if(game.mode!=='blessing'){
      dom.winScreen.classList.remove('is-blessing-win');if(dom.blessingWinText)dom.blessingWinText.hidden=true;
      const result=await v40FinishLevel();trackEvent('level_complete',{elapsed:Math.round(currentElapsed()),combo:game.comboMax});return result;
    }

    game.phase='won';pauseTimer();audio.win();haptic([30,45,30,45,70]);await delay(360);
    const elapsed=currentElapsed(),pack=blessingPackForLevel(game.level),nextPack=pack>=V41_BLESSING_PACKS.length?1:pack+1;
    save.blessingLevel=nextPack;
    game.clearedImages.filter(isBlessingIndex).forEach(index=>{if(!save.blessings.includes(index))save.blessings.push(index);});persist();

    const heading=dom.winScreen.querySelector('h2');if(heading)heading.textContent=pack===3?'今日祝福已完成':`第 ${pack}/3 组祝福完成`;
    dom.winScreen.classList.add('is-blessing-win');
    if(dom.blessingWinText){dom.blessingWinText.hidden=false;dom.blessingWinText.textContent=pack===3?'三组写实祝福都已收入作品集，可以保存、分享，也可以再拼一轮。':'本组两张作品已收入图鉴。现在可以分享，也可以继续下一组。';}
    dom.nextBtn.textContent=pack===3?'再拼一轮':'下一组祝福';dom.shareWorksBtn.hidden=false;
    dom.winTime.textContent=formatTime(elapsed);dom.winMoves.textContent=String(game.moves);dom.winCombo.textContent=String(game.comboMax);
    dom.unlockedStrip.innerHTML='';
    game.clearedImages.slice(-2).forEach(idx=>{const img=document.createElement('img');img.src=PICTURE_PATHS[idx];img.alt=PICTURE_NAMES[idx];img.addEventListener('click',()=>openBlessingWorks(idx));dom.unlockedStrip.appendChild(img);});
    dom.winScreen.classList.add('is-visible');startConfetti();updateHome();
    trackEvent('blessing_pack_complete',{pack,elapsed:Math.round(elapsed),moves:game.moves,works:game.clearedImages.slice()});
  };

  const v40OpenBlessingWorks=openBlessingWorks;
  openBlessingWorks=function(preferred=null){
    dom.blessingContinueBtn.hidden=true;dom.blessingModal.querySelector('.blessing-modal-card')?.classList.remove('is-reward');
    trackEvent('poster_open',{imageIndex:preferred});return v40OpenBlessingWorks(preferred);
  };
  const v40DownloadBlessing=downloadBlessing;
  downloadBlessing=async function(){trackEvent('poster_save',{imageIndex:game.shareIndex});return v40DownloadBlessing();};
  const v40ShareBlessing=shareBlessing;
  shareBlessing=async function(){trackEvent('poster_share',{imageIndex:game.shareIndex});return v40ShareBlessing();};
  const v40CopyBlessing=copyBlessing;
  copyBlessing=async function(){trackEvent('poster_copy',{imageIndex:game.shareIndex});return v40CopyBlessing();};

  const v40GoHome=goHome;
  goHome=function(){
    if(dom.playScreen.classList.contains('is-visible')&&game.phase!=='won')trackEvent('level_abandon',{elapsed:Math.round(currentElapsed())});
    return v40GoHome();
  };

  const v40BindEvents=bindEvents;
  bindEvents=function(){
    // Capture reward closing before the v4.0 generic modal listeners. This resumes
    // the paused resolver instead of leaving a pending promise behind.
    dom.blessingModal?.addEventListener('pointerdown',event=>{
      if(game.rewardPending&&event.target===dom.blessingModal){event.preventDefault();event.stopImmediatePropagation();finishBlessingReward();}
    },true);
    document.querySelectorAll('#blessingModal [data-close-modal]').forEach(button=>button.addEventListener('click',event=>{
      if(game.rewardPending){event.preventDefault();event.stopImmediatePropagation();finishBlessingReward();}
    },true));

    v40BindEvents();
    dom.undoBtn?.addEventListener('click',()=>{audio.tap();undoLastMove();});
    dom.blessingContinueBtn?.addEventListener('click',()=>{audio.tap();finishBlessingReward();});
    dom.exportDataBtn?.addEventListener('click',()=>{audio.tap();downloadTelemetry();});
  };
'''

s = s.replace(override_marker, override + override_marker, 1)

# Expose v4.1 diagnostics and testable behaviors without changing the existing API.
s = s.replace(
    "  boot();\n})();",
    "  Object.assign(window.__JIGSAW__,{version:V41_VERSION,blessingPacks:V41_BLESSING_PACKS,blessingPackForLevel,generateBlessingLevelV41,undoLastMove,captureUndoSnapshot,trackEvent,downloadTelemetry,useHint,useAuto,presentBlessingReward,finishBlessingReward});\n  boot();\n})();",
    1,
)

GAME.write_text(s, encoding='utf-8')

html = INDEX.read_text(encoding='utf-8')
html = html.replace('manifest.webmanifest?v=4.0.0','manifest.webmanifest?v=4.1.0')
html = html.replace('style.css?v=4.0.0','style.css?v=4.1.0')
html = html.replace('game.js?v=4.0.0','game.js?v=4.1.0')
html = html.replace(
    '<button id="blessingBtn" class="blessing-entry"><b class="realistic-badge">方案B · 写实</b><span>写实祝福拼图</span><small>先拼干净美图 · 完成后生成分享作品</small></button>',
    '<button id="blessingBtn" class="blessing-entry"><span>今日祝福</span><small>拼一张写实美图 · 完成即生成作品</small></button>',
)
html = html.replace(
    '''            <button id="hintBtn" class="tool-btn" aria-label="提示">
              <span class="tool-icon hint-icon"><i></i></span>
              <b id="hintCount">3</b>
            </button>''',
    '''            <button id="hintBtn" class="tool-btn" aria-label="提示">
              <span class="tool-icon hint-icon"><i></i></span>
              <b id="hintCount">3</b>
            </button>
            <button id="undoBtn" class="tool-btn undo-btn is-empty" aria-label="撤销上一步" disabled>
              <span class="tool-icon undo-icon">↶</span>
            </button>''',
)
html = html.replace(
    '<button id="workBadge" class="work-badge" hidden>祝福作品 <b id="workBadgeCount">0</b>/6</button>',
    '<button id="workBadge" class="work-badge" hidden>本组作品 <b id="workBadgeCount">0</b>/<b id="workBadgeTotal">2</b></button>',
)
html = html.replace(
    '<h2>关卡完成</h2>\n          <div class="win-stats">',
    '<h2>关卡完成</h2>\n          <p id="blessingWinText" class="blessing-win-text" hidden></p>\n          <div class="win-stats">',
)
html = html.replace(
    '<button id="homeBtn" class="secondary-btn">返回首页</button>',
    '<button id="homeBtn" class="secondary-btn">返回首页</button>\n            <button id="exportDataBtn" class="text-btn export-data-btn">导出测试数据</button>',
)
html = html.replace(
    '<div class="blessing-actions"><button id="shareBlessingBtn" class="primary-btn">分享图片</button><button id="downloadBlessingBtn" class="secondary-btn">保存图片</button><button id="copyBlessingBtn" class="text-btn">复制祝福语</button></div>',
    '<div class="blessing-actions"><button id="shareBlessingBtn" class="primary-btn">分享图片</button><button id="downloadBlessingBtn" class="secondary-btn">保存图片</button><button id="copyBlessingBtn" class="text-btn">复制祝福语</button></div>\n          <button id="blessingContinueBtn" class="primary-btn blessing-continue-btn" hidden>继续拼下一张</button>',
)
INDEX.write_text(html, encoding='utf-8')

css = CSS.read_text(encoding='utf-8')
if '/* v4.1-core-experience */' not in css:
    css += r'''

/* v4.1-core-experience */
.tools{gap:5px}.tool-btn{min-width:48px}.undo-btn .undo-icon{font:900 31px/1 system-ui,sans-serif;color:#fff;text-shadow:0 2px 4px rgba(0,49,94,.42);transform:translateY(-1px)}
.tool-btn:disabled{opacity:.34;filter:grayscale(.7);pointer-events:none}.tool-btn.needs-rescue{opacity:1;animation:v41RescuePulse .85s ease-in-out infinite;box-shadow:0 0 0 3px rgba(255,231,80,.45),0 0 24px rgba(255,227,73,.95)}
@keyframes v41RescuePulse{50%{transform:scale(1.1);filter:brightness(1.24)}}
.hint-dim{filter:brightness(.4) saturate(.45)!important;opacity:.55!important}.hint-picture-preview{position:absolute;left:2.5%;top:2.5%;width:24%;aspect-ratio:.75;background:center/cover no-repeat;border:3px solid #fff6a3;border-radius:12px;z-index:72;box-shadow:0 7px 22px rgba(0,25,69,.48);pointer-events:none;overflow:hidden}.hint-picture-preview span{position:absolute;left:0;right:0;bottom:0;padding:5px 3px;background:rgba(3,20,48,.76);color:#fff;font-size:10px;text-align:center;font-weight:800}.hint-image-ghost{position:absolute;background:center/100% 100% no-repeat;opacity:.28;z-index:58;pointer-events:none;filter:brightness(1.25);animation:v41GhostPulse 1s ease-in-out infinite}.hint-action-label{position:absolute;transform:translate(-50%,-145%);z-index:75;padding:5px 8px;border-radius:999px;background:#fff8a8;color:#17375e;font-size:11px;font-weight:900;white-space:nowrap;box-shadow:0 3px 12px rgba(0,25,60,.38);pointer-events:none}@keyframes v41GhostPulse{50%{opacity:.48;filter:brightness(1.5)}}
.blessing-continue-btn{width:100%;margin-top:10px;background:linear-gradient(180deg,#ffbd48,#f28a25);box-shadow:0 5px 0 #b85b17,0 10px 20px rgba(131,64,18,.25)}.blessing-modal-card.is-reward .blessing-modal-head small::after{content:' · 刚刚拼出的作品';color:#ffcf6d}.blessing-modal-card.is-reward{animation:v41RewardIn .34s cubic-bezier(.2,.9,.25,1.12)}@keyframes v41RewardIn{from{transform:translateY(18px) scale(.95);opacity:0}}
.blessing-win-text{margin:8px auto 14px;max-width:290px;color:#5b4b3c;font-weight:700;line-height:1.55}.win-screen.is-blessing-win .win-stats,.win-screen.is-blessing-win .star-row{display:none}.win-screen.is-blessing-win .win-card{padding-bottom:25px}.win-screen.is-blessing-win .ribbon span{font-size:0}.win-screen.is-blessing-win .ribbon span::after{content:'作品完成';font-size:18px}
.game-stage.is-blessing .deck-area,.game-stage.is-blessing .flow-meter,.game-stage.is-blessing .chain-status{display:none!important}.game-stage.is-blessing .status-row .status-item{display:none}.game-stage.is-blessing .status-row{margin-top:9px}.game-stage.is-blessing .progress-track{flex:1;height:8px}.game-stage.is-blessing .board-wrap{margin-top:5px}.game-stage.is-blessing .game-area{justify-content:flex-start;padding-top:8px}.game-stage.is-blessing .board{box-shadow:0 12px 30px rgba(11,56,104,.3),0 0 0 2px rgba(255,255,255,.55)}
.export-data-btn{margin-top:2px;font-size:13px;opacity:.72}.work-badge b{display:inline}.realistic-badge{display:none!important}
@media(max-width:380px){.tool-btn{min-width:43px}.tools{gap:3px}.hint-picture-preview{width:27%}}
'''
CSS.write_text(css, encoding='utf-8')

sw = SW.read_text(encoding='utf-8')
sw = sw.replace('jigsaw-drop-h5-v4.0.0','jigsaw-drop-h5-v4.1.0')
sw = sw.replace('style.css?v=4.0.0','style.css?v=4.1.0').replace('game.js?v=4.0.0','game.js?v=4.1.0').replace('manifest.webmanifest?v=4.0.0','manifest.webmanifest?v=4.1.0')
SW.write_text(sw, encoding='utf-8')
VERSION.write_text('4.1.0\n', encoding='utf-8')
print('patched Jigsaw Drop v4.1 core experience')
