from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
INDEX = ROOT / 'index.html'
CSS = ROOT / 'style.css'
SW = ROOT / 'sw.js'
VERSION = ROOT / 'VERSION'


def replace_function(src: str, name: str, replacement: str) -> str:
    markers = [f'  function {name}(', f'  async function {name}(']
    starts = [src.find(m) for m in markers]
    start = min((v for v in starts if v >= 0), default=-1)
    if start < 0:
        raise RuntimeError(f'function not found: {name}')

    # Find the closing parameter parenthesis first. This is necessary for
    # signatures such as renderBoard(options = {}) whose default value has braces.
    paren = src.find('(', start)
    if paren < 0:
        raise RuntimeError(f'opening parenthesis not found: {name}')
    pdepth = 0
    i = paren
    in_s = in_d = in_t = False
    esc = False
    param_end = -1
    while i < len(src):
        ch = src[i]
        if esc:
            esc = False
        elif ch == '\\':
            esc = True
        elif in_s:
            if ch == "'": in_s = False
        elif in_d:
            if ch == '"': in_d = False
        elif in_t:
            if ch == '`': in_t = False
        else:
            if ch == "'": in_s = True
            elif ch == '"': in_d = True
            elif ch == '`': in_t = True
            elif ch == '(': pdepth += 1
            elif ch == ')':
                pdepth -= 1
                if pdepth == 0:
                    param_end = i
                    break
        i += 1
    if param_end < 0:
        raise RuntimeError(f'parameter close not found: {name}')
    brace = src.find('{', param_end)
    if brace < 0:
        raise RuntimeError(f'opening brace not found: {name}')

    depth = 0
    i = brace
    in_s = in_d = in_t = False
    esc = False
    while i < len(src):
        ch = src[i]
        if esc:
            esc = False
        elif ch == '\\':
            esc = True
        elif in_s:
            if ch == "'": in_s = False
        elif in_d:
            if ch == '"': in_d = False
        elif in_t:
            if ch == '`': in_t = False
        else:
            if ch == "'": in_s = True
            elif ch == '"': in_d = True
            elif ch == '`': in_t = True
            elif ch == '{': depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    return src[:start] + replacement.rstrip() + '\n' + src[i+1:]
        i += 1
    raise RuntimeError(f'closing brace not found: {name}')


text = GAME.read_text(encoding='utf-8')

# Use purpose-built portrait crops so the four quarters reconstruct without stretching.
text = text.replace("'assets/pictures/", "'assets/pictures-portrait/")

# Reference measurement from the supplied recordings: base tile W/H ~= 0.69.
anchor = "  const pairKey = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;\n"
insert = anchor + "  const TILE_ASPECT = 0.69;\n"
if 'const TILE_ASPECT = 0.69;' not in text:
    if anchor not in text:
        raise RuntimeError('pairKey anchor not found')
    text = text.replace(anchor, insert, 1)

# Board sizing is height-driven on mobile. The grid is 4x4 on L14 and 5x5 on L15,
# but each cell keeps the same portrait aspect ratio.
geometry_anchor = "  function gridMetrics() {\n"
layout_fn = r'''  function updateBoardLayout() {
    const stage = document.getElementById('gameStage');
    const area = dom.board.closest('.game-area');
    const wrap = dom.board.parentElement;
    if (!stage || !area || !wrap) return;

    const stageW = stage.clientWidth || window.innerWidth || 390;
    const areaH = area.clientHeight || Math.max(520, (stage.clientHeight || window.innerHeight || 844) - 64);
    const deckH = GRID >= 5 ? 64 : 62;
    const statusH = 40;
    const verticalSlack = 16;
    const maxW = Math.max(250, Math.min(stageW - 18, 420));
    const maxH = Math.max(360, areaH - deckH - statusH - verticalSlack);
    const boardW = Math.max(238, Math.min(maxW, maxH * TILE_ASPECT));
    const boardH = boardW / TILE_ASPECT;

    wrap.style.width = `${boardW}px`;
    wrap.style.height = `${boardH}px`;
    dom.deckArea.style.width = `${boardW}px`;
    const status = dom.board.closest('.game-area')?.querySelector('.status-row');
    if (status) status.style.width = `${boardW}px`;
    dom.board.style.setProperty('--live-board-w', `${boardW}px`);
    dom.board.style.setProperty('--live-board-h', `${boardH}px`);
  }

'''
if 'function updateBoardLayout()' not in text:
    if geometry_anchor not in text:
        raise RuntimeError('gridMetrics anchor missing')
    text = text.replace(geometry_anchor, layout_fn + geometry_anchor, 1)

text = replace_function(text, 'configureGrid', r'''  function configureGrid(size) {
    GRID = Math.max(4, Math.min(5, Number(size) || 4));
    CELL_COUNT = GRID * GRID;
    game.board = Array(CELL_COUNT).fill(null);
    game.decks = Array.from({ length: GRID }, () => []);
    dom.board.dataset.grid = String(GRID);
    document.getElementById('gameStage')?.setAttribute('data-grid', String(GRID));

    dom.cellLayer.innerHTML = '';
    cellEls.length = 0;
    for (let i = 0; i < CELL_COUNT; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = String(i);
      applyBaseGeometry(cell, i);
      dom.cellLayer.appendChild(cell);
      cellEls.push(cell);
    }

    dom.deckArea.innerHTML = '';
    dom.deckArea.style.gridTemplateColumns = `repeat(${GRID}, 1fr)`;
    for (let c = 0; c < GRID; c++) {
      const col = document.createElement('div');
      col.className = 'deck-column';
      col.dataset.col = String(c);
      col.innerHTML = '<div class="deck-stack"></div><span class="deck-count"></span>';
      dom.deckArea.appendChild(col);
    }
    updateBoardLayout();
  }''')

text = replace_function(text, 'onTilePointerDown', r'''  function onTilePointerDown(event) {
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    const joined = groupAtCell(index);
    if (!joined) return;
    event.preventDefault();

    const rect = dom.board.getBoundingClientRect();
    const m = gridMetrics();
    const tile = game.tiles.get(id);
    const singleGroup = { ids:[id], cells:[index], imageIndex:tile?.imageIndex, minR:idxToRC(index).r, maxR:idxToRC(index).r, minC:idxToRC(index).c, maxC:idxToRC(index).c, complete:false };
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      wholeGroup:joined, singleGroup,
      sourceGroup:joined, sourceIds:joined.ids.slice(), sourceCells:joined.cells.slice(),
      touchedId:id, boardRect:rect,
      stepX:rect.width*m.step/100, stepY:rect.height*m.step/100,
      lastDr:0,lastDc:0, validation:null, moved:false, splitMode:false, holdTimer:0
    };

    // Normal gesture = move the whole joined shape. Holding briefly before dragging
    // tears the touched quarter out, which matches the user's expected dual behavior.
    if (joined.ids.length > 1) {
      drag.holdTimer = window.setTimeout(() => {
        if (!game.drag || game.drag !== drag || drag.moved) return;
        drag.splitMode = true;
        drag.sourceGroup = singleGroup;
        drag.sourceIds = [id];
        drag.sourceCells = [index];
        clearCellHighlights();
        joined.ids.forEach((tileId)=>tileEls.get(tileId)?.classList.remove('is-dragging'));
        joined.cells.forEach((cell)=>cellEls[cell]?.classList.remove('is-source'));
        cellEls[index]?.classList.add('is-source');
        tileEls.get(id)?.classList.add('is-dragging');
        showToast('已拆成单块', 650); haptic(12); audio.tap();
      }, 320);
    }

    game.drag=drag; game.phase='dragging';
    joined.cells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    joined.ids.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
    window.addEventListener('pointermove', onDragMove, {passive:false});
    window.addEventListener('pointerup', onDragEnd, {passive:false,once:true});
    window.addEventListener('pointercancel', onDragEnd, {passive:false,once:true});
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch (_) {}
    audio.tap(); haptic(7);
  }''')

text = replace_function(text, 'onDragMove', r'''  function onDragMove(event) {
    const drag=game.drag; if(!drag||event.pointerId!==drag.pointerId)return;
    event.preventDefault();
    drag.dx=event.clientX-drag.startX; drag.dy=event.clientY-drag.startY;
    if (Math.hypot(drag.dx,drag.dy) > Math.max(6,Math.min(drag.stepX,drag.stepY)*.06)) {
      drag.moved=true;
      if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer=0; }
    }
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id);
      if(el) el.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.025)`;
    });
    const dc=Math.round(drag.dx/drag.stepX), dr=Math.round(drag.dy/drag.stepY);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr;
    clearCellHighlights();
    drag.sourceCells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));
  }''')

text = replace_function(text, 'onDragEnd', r'''  async function onDragEnd(event) {
    const drag=game.drag; if(!drag)return;
    if (drag.holdTimer) clearTimeout(drag.holdTimer);
    window.removeEventListener('pointermove',onDragMove);
    window.removeEventListener('pointerup',onDragEnd);
    window.removeEventListener('pointercancel',onDragEnd);
    clearCellHighlights(); game.drag=null;

    if (!drag.moved || (!drag.lastDr && !drag.lastDc)) {
      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transform='';el.classList.remove('is-dragging');}});
      game.phase='idle'; return;
    }

    let source = drag.sourceGroup;
    let validation = drag.validation || validateMove(source,drag.lastDr,drag.lastDc);

    // If whole-shape placement cannot happen, automatically allow the touched
    // quarter to tear out when that single-cell swap is legal.
    if (!validation.valid && !drag.splitMode && drag.wholeGroup.ids.length > 1) {
      const singleValidation = validateMove(drag.singleGroup,drag.lastDr,drag.lastDc);
      if (singleValidation.valid) {
        source = drag.singleGroup;
        validation = singleValidation;
        drag.splitMode = true;
      }
    }

    drag.wholeGroup.ids.forEach((id)=>tileEls.get(id)?.classList.remove('is-dragging'));
    if(validation.valid) {
      await commitMove(source,drag.lastDr,drag.lastDc,validation.board,true);
    } else {
      audio.invalid(); haptic([10,25,10]);
      drag.wholeGroup.ids.forEach((id)=>{
        const el=tileEls.get(id); if(!el)return;
        el.style.transition='transform 180ms cubic-bezier(.2,.9,.25,1.18)'; el.style.transform='none';
      });
      await delay(195);
      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';}});
      game.phase='idle';
    }
  }''')

# Every player move must resolve gravity, not only moves that create a completed image.
text = replace_function(text, 'resolveBoard', r'''  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {
    game.phase='resolving';
    if (isPlayerMove) game.comboStreak=0;
    let baseline=new Set(beforeConnections);
    let safety=0;

    while (safety++ < 96) {
      game.groups=computeGroups(); game.connections=computeConnections();
      const newIds=new Set();
      for(const edge of game.connections) if(!baseline.has(edge)) edge.split('|').forEach(id=>newIds.add(id));
      if(newIds.size) {
        newIds.forEach((id)=>tileEls.get(id)?.classList.add('merge-pop'));
        audio.merge(); haptic(14);
        await delay(220);
        newIds.forEach((id)=>tileEls.get(id)?.classList.remove('merge-pop'));
      }

      const complete=game.groups.filter(g=>g.complete);
      if(complete.length) {
        game.comboStreak += complete.length;
        game.comboMax=Math.max(game.comboMax,game.comboStreak);
        if(game.comboStreak>=2) showCombo(game.comboStreak);
        else showToast('拼好了！',650);
        await animateAndClear(complete);
        baseline=new Set(computeConnections());
        continue;
      }

      // Reference behavior: unsupported pieces/groups always fall after a move.
      const beforeGravity=new Set(game.connections);
      const moved=await applyGravity();
      if(moved) {
        baseline=beforeGravity;
        continue;
      }

      // Once stable, each column independently feeds its accessible top vacancies.
      const beforeDeal=new Set(game.connections);
      const dealt=await dealIntoBoard();
      if(dealt) {
        baseline=beforeDeal;
        continue;
      }
      break;
    }

    if(remainingDeckCount()===0 && game.board.every(v=>!v)) { await finishLevel(); return; }
    game.phase='idle';
  }''')

text = replace_function(text, 'dealIntoBoard', r'''  async function dealIntoBoard() {
    const dealt=[];
    for(let c=0;c<GRID;c++){
      const deck=game.decks?.[c]; if(!deck?.length)continue;
      const emptyTop=[];
      for(let r=0;r<GRID;r++){
        const index=rcToIdx(r,c);
        if(game.board[index])break;
        emptyTop.push(index);
      }
      for(let k=emptyTop.length-1;k>=0&&deck.length;k--){
        const index=emptyTop[k], id=deck.shift();
        game.board[index]=id; dealt.push({index,id,col:c,order:dealt.length});
      }
    }
    if(!dealt.length){updateDeckVisuals();return false;}

    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();
    const dropBase=Math.max(105,boardRect.top-deckRect.top+34);
    const rowStepPx=boardRect.height*gridMetrics().step/100;
    dealt.forEach((item,n)=>{
      const geom=cellRectPercent(item.index); const {r}=idxToRC(item.index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropBase+r*rowStepPx}px`);
      card.style.animationDelay=`${n*38}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{
        audio.deal();const tile=tileEls.get(item.id);
        if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}
        card.remove();
      },270+n*38);
    });
    await delay(325+dealt.length*38+390);
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return true;
  }''')

text = replace_function(text, 'initialDealAnimation', r'''  async function initialDealAnimation() {
    const items=game.board.map((id,index)=>({id,index})).filter(x=>x.id);
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();const dropY=Math.max(150,boardRect.top-deckRect.top+52);
    const rowStepPx=boardRect.height*gridMetrics().step/100;
    items.forEach(({id,index})=>{
      const {r,c}=idxToRC(index);const geom=cellRectPercent(index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropY+r*rowStepPx}px`);
      const stagger=r*52+c*17;card.style.animationDelay=`${stagger}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{audio.deal();const tile=tileEls.get(id);if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}card.remove();},285+stagger);
    });
    await delay(285+(GRID-1)*52+(GRID-1)*17+500);renderBoard();
  }''')

text = replace_function(text, 'startLevel', r'''  async function startLevel(level) {
    hideModals();dom.winScreen.classList.remove('is-visible');showOnly(dom.playScreen);clearHintMarks();
    game.level=Math.max(1,level);
    configureGrid(gridForLevel(game.level));
    updateBoardLayout();
    game.phase='loading';game.moves=0;game.clearedCount=0;game.clearedImages=[];game.unlockedThisLevel=[];
    game.comboMax=1;game.comboStreak=0;game.hintCount=3;game.autoCount=3;game.timerBase=0;game.timerRunning=false;
    tileEls.forEach((el)=>el.remove());tileEls.clear();dom.fxLayer.innerHTML='';clearCellHighlights();
    const generated=generateLevel(game.level);game.generation=generated;game.initialSeed=generated.seed;
    game.board=generated.board.slice();game.decks=generated.decks.map((deck)=>deck.slice());game.tiles=generated.tiles;
    game.selectedImages=generated.selected;game.totalImages=generated.imageCount;

    const hard=isHardLevel(game.level);
    const stage=document.getElementById('gameStage');stage?.classList.toggle('is-hard',hard);
    const title=dom.levelNumber.parentElement;title?.classList.toggle('is-hard',hard);
    const titleLabel=title?.querySelector('span');if(titleLabel)titleLabel.textContent=hard?'困难':'关卡';
    dom.introLevel.textContent=String(game.level);dom.introText.textContent=GRID===5?'困难关卡 · 5×5 竖幅拼图':'4×4 竖幅拼图';
    dom.levelIntro.classList.add('is-visible');updateHud();updateDeckVisuals();

    const preloadSet=new Set();
    game.board.filter(Boolean).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex));
    game.decks.forEach((deck)=>deck.slice(0,2).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex)));
    await preloadImages([...preloadSet]);
    updateBoardLayout();
    renderBoard({hiddenIds:new Set(game.board.filter(Boolean))});
    await delay(220);await initialDealAnimation();
    await delay(80);dom.levelIntro.classList.remove('is-visible');startTimer();
    const initialConnections=new Set(game.connections);
    game.phase='resolving';
    await resolveBoard(initialConnections,false);
    if(game.phase!=='won')game.phase='idle';
    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('直接拖＝整组；按住后拖＝拆单块；所有悬空块都会下落',3300);}else dom.tutorialHand.classList.remove('is-visible');
  }''')

text = replace_function(text, 'bindEvents', r'''  function bindEvents() {
    dom.playBtn.addEventListener('click',()=>{audio.tap();startLevel(save.level);});
    dom.settingsBtn.addEventListener('click',()=>{audio.tap();openSettings();});dom.homeSettingsBtn.addEventListener('click',()=>{audio.tap();openSettings();});
    dom.galleryBtn.addEventListener('click',()=>{audio.tap();renderGallery();showModal(dom.galleryModal);});
    dom.hintBtn.addEventListener('click',()=>{audio.tap();useHint();});dom.autoBtn.addEventListener('click',()=>{audio.tap();useAuto();});
    dom.nextBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level+1);});
    dom.replayBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level);});
    dom.resumeBtn.addEventListener('click',()=>{audio.tap();closeSettings();});
    dom.restartBtn.addEventListener('click',()=>{audio.tap();hideModals();startLevel(game.level);});
    dom.homeBtn.addEventListener('click',()=>{audio.tap();goHome();});
    dom.soundToggle.addEventListener('click',()=>{save.settings.sound=!save.settings.sound;dom.soundToggle.classList.toggle('is-on',save.settings.sound);persist();if(save.settings.sound)audio.tap();});
    dom.vibrationToggle.addEventListener('click',()=>{save.settings.vibration=!save.settings.vibration;dom.vibrationToggle.classList.toggle('is-on',save.settings.vibration);persist();haptic(15);});
    document.querySelectorAll('[data-close-modal]').forEach((btn)=>btn.addEventListener('click',()=>{audio.tap();if(dom.settingsModal.classList.contains('is-visible'))closeSettings();else hideModals();}));
    [dom.settingsModal,dom.galleryModal].forEach((layer)=>layer.addEventListener('pointerdown',(event)=>{if(event.target===layer){if(layer===dom.settingsModal)closeSettings();else hideModals();}}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseTimer();else if(dom.playScreen.classList.contains('is-visible')&&!dom.settingsModal.classList.contains('is-visible')&&game.phase==='idle')resumeTimer();});
    window.addEventListener('resize',()=>{
      updateBoardLayout();
      if(game.phase==='dragging'&&game.drag){
        const rect=dom.board.getBoundingClientRect(),m=gridMetrics();
        game.drag.boardRect=rect;game.drag.stepX=rect.width*m.step/100;game.drag.stepY=rect.height*m.step/100;
      }
    });
    window.addEventListener('contextmenu',(event)=>event.preventDefault());
  }''')

text = replace_function(text, 'boot', r'''  async function boot() {
    bindEvents();updateHome();
    if(location.protocol.startsWith('http')&&'serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
    await preloadImages([((save.level-1)*5)%PICTURE_PATHS.length]);
    await delay(850);dom.splash.classList.remove('is-visible');
    const requested=Number(new URLSearchParams(location.search).get('level'));
    if(Number.isInteger(requested)&&requested>0){await startLevel(requested);return;}
    showOnly(dom.homeScreen);game.phase='home';
  }''')

# Expose layout/aspect for regression tests.
text = text.replace('validateMove,gridForLevel,isHardLevel,remainingDeckCount,finishLevel,goHome};', 'validateMove,gridForLevel,isHardLevel,remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome};')

GAME.write_text(text, encoding='utf-8')

index = INDEX.read_text(encoding='utf-8')
index = re.sub(r'<p class="home-tip">.*?</p>', '<p class="home-tip">竖幅拼图：直接拖整组 · 按住后拖可拆单块 · 悬空自动下落</p>', index, count=1)
INDEX.write_text(index, encoding='utf-8')

css = CSS.read_text(encoding='utf-8')
marker = '/* v3.1-portrait-physics */'
if marker not in css:
    css += r'''

/* v3.1-portrait-physics */
:root{--tile-aspect:.69;--board-w:360px;--board-h:522px}
.game-area{justify-content:flex-start}
.board-wrap{width:var(--board-w)!important;height:var(--board-h)!important;flex:0 0 auto}
.deck-area,.status-row{width:var(--board-w)!important}
.board{border:0;background:transparent;box-shadow:none;border-radius:8px}
.cell{border-radius:7px}
.tile{background-size:200% 200%;border-radius:8px}
#gameStage[data-grid="5"] .tile{border-width:1.6px}
#gameStage[data-grid="5"] .cell{border-radius:6px}
.home-preview{aspect-ratio:.69!important;width:min(64vw,300px)!important}
.gallery-item{aspect-ratio:.69!important}
.complete-overlay{background-size:cover}
@media(max-height:720px){.deck-area{height:50px;flex-basis:50px}.status-row{height:34px}}
'''
CSS.write_text(css, encoding='utf-8')

sw = SW.read_text(encoding='utf-8')
sw = re.sub(r"const CACHE='[^']+';", "const CACHE='jigsaw-drop-h5-v3.1';", sw, count=1)
SW.write_text(sw, encoding='utf-8')
VERSION.write_text('3.1.0\n', encoding='utf-8')
print('patched to 3.1.0 portrait geometry + continuous gravity + dual group/split drag')
