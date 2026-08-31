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
    paren = src.find('(', start)
    if paren < 0:
        raise RuntimeError(f'opening paren not found: {name}')
    pdepth = 0
    close_paren = -1
    j = paren
    ps = pd = pt = False
    pesc = False
    while j < len(src):
        ch = src[j]
        if pesc:
            pesc = False
        elif ch == '\\':
            pesc = True
        elif ps:
            if ch == "'": ps = False
        elif pd:
            if ch == '"': pd = False
        elif pt:
            if ch == '`': pt = False
        else:
            if ch == "'": ps = True
            elif ch == '"': pd = True
            elif ch == '`': pt = True
            elif ch == '(': pdepth += 1
            elif ch == ')':
                pdepth -= 1
                if pdepth == 0:
                    close_paren = j
                    break
        j += 1
    if close_paren < 0:
        raise RuntimeError(f'closing paren not found: {name}')
    brace = src.find('{', close_paren + 1)
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
                    end = i + 1
                    return src[:start] + replacement.rstrip() + '\n' + src[end:]
        i += 1
    raise RuntimeError(f'closing brace not found: {name}')


text = GAME.read_text(encoding='utf-8')

# Dynamic grid: the reference recording is 4x4 on level 14 and 5x5 on level 15.
text = text.replace('  const GRID = 4;\n  const CELL_COUNT = GRID * GRID;', '  let GRID = 4;\n  let CELL_COUNT = GRID * GRID;', 1)
text = text.replace('    deck: [],', '    decks: [],', 1)
text = text.replace('    comboMax: 1,', '    comboMax: 1,\n    comboStreak: 0,', 1)

old_cells = '''  const tileEls = new Map();
  const cellEls = [];
  for (let i = 0; i < CELL_COUNT; i++) {
    const cell = document.createElement('div');
    const { r, c } = idxToRC(i);
    cell.className = 'cell';
    cell.dataset.index = String(i);
    cell.style.left = `${c * 25}%`; cell.style.top = `${r * 25}%`;
    dom.cellLayer.appendChild(cell); cellEls.push(cell);
  }
'''
new_cells = r'''  const tileEls = new Map();
  const cellEls = [];

  function gridMetrics() {
    // The original keeps a narrow blue gutter between unrelated cells.
    // Connected pieces bridge that gutter, so a joined image reads as one shape.
    const gap = GRID >= 5 ? 0.56 : 0.52;
    const cell = (100 - gap * (GRID - 1)) / GRID;
    return { gap, cell, step: cell + gap };
  }

  function cellRectPercentByRC(r, c) {
    const m = gridMetrics();
    return { left: c * m.step, top: r * m.step, width: m.cell, height: m.cell, gap: m.gap, step: m.step };
  }

  function cellRectPercent(index) {
    const { r, c } = idxToRC(index);
    return cellRectPercentByRC(r, c);
  }

  function groupRectPercent(group) {
    const m = gridMetrics();
    return {
      left: group.minC * m.step,
      top: group.minR * m.step,
      width: (group.maxC - group.minC + 1) * m.cell + (group.maxC - group.minC) * m.gap,
      height: (group.maxR - group.minR + 1) * m.cell + (group.maxR - group.minR) * m.gap
    };
  }

  function applyBaseGeometry(el, index) {
    const g = cellRectPercent(index);
    el.style.left = `${g.left}%`;
    el.style.top = `${g.top}%`;
    el.style.width = `${g.width}%`;
    el.style.height = `${g.height}%`;
  }

  function applyTileGeometry(el, index, join) {
    const g = cellRectPercent(index);
    const bridge = g.gap / 2;
    let left = g.left, top = g.top, width = g.width, height = g.height;
    if (join?.left) { left -= bridge; width += bridge; }
    if (join?.right) width += bridge;
    if (join?.up) { top -= bridge; height += bridge; }
    if (join?.down) height += bridge;
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.width = `${width}%`;
    el.style.height = `${height}%`;
  }

  function configureGrid(size) {
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
  }

  configureGrid(4);
'''
if old_cells not in text:
    raise SystemExit('cell setup block changed unexpectedly')
text = text.replace(old_cells, new_cells, 1)

text = replace_function(text, 'imageCountForLevel', r'''  function isHardLevel(level) {
    return level >= 15 && level % 5 === 0;
  }

  function gridForLevel(level) {
    // Video evidence: L14 is 4x4 / four piles; L15 expands to 5x5 / five piles.
    return level >= 15 ? 5 : 4;
  }

  function imageCountForLevel(level) {
    if (level <= 2) return 5;
    if (level <= 5) return 6;
    if (level <= 10) return 7;
    if (level <= 14) return 8;
    if (isHardLevel(level)) return Math.min(18, 15 + Math.floor((level - 15) / 10));
    return Math.min(15, 10 + Math.floor((level - 15) / 3));
  }''')

text = replace_function(text, 'generateLevel', r'''  function generateLevel(level) {
    const seed = (level * 2654435761 + 9109) >>> 0;
    const rnd = mulberry32(seed);
    const imageCount = imageCountForLevel(level);
    const selected = selectedImagesForLevel(level, imageCount);
    const tiles = new Map();
    const byImage = new Map();
    selected.forEach((imageIndex, imageOrder) => {
      const arr = [];
      for (let q = 0; q < 4; q++) {
        const id = `L${level}-I${imageIndex}-Q${q}`;
        const tile = { id, imageIndex, imageOrder, quadrant: q };
        tiles.set(id, tile); arr.push(id);
      }
      byImage.set(imageIndex, arr);
    });

    const allIds = [...tiles.keys()];
    shuffle(allIds, rnd);
    const board = allIds.splice(0, CELL_COUNT);
    const decks = Array.from({ length: GRID }, () => []);
    allIds.forEach((id, i) => decks[i % GRID].push(id));
    decks.forEach((deck) => shuffle(deck, rnd));

    const locateAndSwapIntoCell = (id, targetCell) => {
      const existing = board[targetCell];
      const boardPos = board.indexOf(id);
      if (boardPos >= 0) {
        [board[boardPos], board[targetCell]] = [board[targetCell], board[boardPos]];
        return;
      }
      for (let c = 0; c < decks.length; c++) {
        const p = decks[c].indexOf(id);
        if (p >= 0) {
          decks[c][p] = existing;
          board[targetCell] = id;
          return;
        }
      }
      throw new Error(`tile location missing: ${id}`);
    };

    // The reference starts with several already-joined 2/3-piece shapes.
    const patterns = GRID === 5
      ? [[0,1],[0,2],[2,3],[1,3],[0,1,2],[0,2,3]]
      : [[0,1],[0,2],[2,3],[0,1,2]];
    const anchors = [];
    for (let r = 0; r < GRID - 1; r++) for (let c = 0; c < GRID - 1; c++) anchors.push([r,c]);
    shuffle(anchors, rnd);
    const used = new Set();
    for (let k = 0; k < Math.min(patterns.length, selected.length, anchors.length); k++) {
      const imageIndex = selected[k];
      const pattern = patterns[k % patterns.length];
      let chosen = null;
      for (const anchor of anchors) {
        const cells = pattern.map((q) => rcToIdx(anchor[0] + QUADRANTS[q].y, anchor[1] + QUADRANTS[q].x));
        if (cells.every((cell) => !used.has(cell))) { chosen = { anchor, cells }; break; }
      }
      if (!chosen) continue;
      pattern.forEach((q, i) => {
        locateAndSwapIntoCell(byImage.get(imageIndex)[q], chosen.cells[i]);
        used.add(chosen.cells[i]);
      });
    }

    // Never begin with an immediately complete 2x2 image.
    let guard = 0;
    while (findCompleteGroups(board, tiles).length && guard++ < 80) {
      const group = findCompleteGroups(board, tiles)[0];
      const cell = group.cells[group.cells.length - 1];
      let other = Math.floor(rnd() * CELL_COUNT);
      let tries = 0;
      while ((group.cells.includes(other) || tiles.get(board[other])?.imageIndex === group.imageIndex) && tries++ < 40) {
        other = Math.floor(rnd() * CELL_COUNT);
      }
      [board[cell], board[other]] = [board[other], board[cell]];
    }

    return { seed, board, decks, tiles, selected, imageCount, grid: GRID };
  }''')

text = replace_function(text, 'renderBoard', r'''  function renderBoard(options = {}) {
    const hiddenIds = options.hiddenIds || new Set();
    game.groups = computeGroups();
    game.connections = computeConnections();
    const joinMap = new Map();
    game.board.forEach((id) => { if (id) joinMap.set(id, { left:false,right:false,up:false,down:false }); });
    for (let i = 0; i < CELL_COUNT; i++) {
      const id = game.board[i]; if (!id) continue;
      const tile = game.tiles.get(id); const {r,c}=idxToRC(i);
      if (c>0 && game.board[i-1] && isCompatibleEdge(game.tiles.get(game.board[i-1]),tile,0,1)) joinMap.get(id).left=true;
      if (c<GRID-1 && game.board[i+1] && isCompatibleEdge(tile,game.tiles.get(game.board[i+1]),0,1)) joinMap.get(id).right=true;
      if (r>0 && game.board[i-GRID] && isCompatibleEdge(game.tiles.get(game.board[i-GRID]),tile,1,0)) joinMap.get(id).up=true;
      if (r<GRID-1 && game.board[i+GRID] && isCompatibleEdge(tile,game.tiles.get(game.board[i+GRID]),1,0)) joinMap.get(id).down=true;
    }
    const activeIds = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (!activeIds.has(id)) el.style.display='none';
    }
    activeIds.forEach((id) => ensureTileElement(game.tiles.get(id)));
    for (const id of activeIds) {
      const el = tileEls.get(id);
      const index=game.board.indexOf(id);
      const {r}=idxToRC(index);
      const join=joinMap.get(id);
      el.style.display='block';
      el.dataset.cellIndex=String(index);
      applyTileGeometry(el, index, join);
      el.style.opacity=hiddenIds.has(id)?'0':'1';
      el.style.zIndex=String(10+r);
      el.classList.remove('join-left','join-right','join-up','join-down');
      if(join.left)el.classList.add('join-left');
      if(join.right)el.classList.add('join-right');
      if(join.up)el.classList.add('join-up');
      if(join.down)el.classList.add('join-down');
    }
    updateDeckVisuals(); updateHud();
  }''')

text = replace_function(text, 'updateDeckVisuals', r'''  function remainingDeckCount() {
    return (game.decks || []).reduce((sum, deck) => sum + deck.length, 0);
  }

  function updateDeckVisuals() {
    const columns = [...dom.deckArea.querySelectorAll('.deck-column')];
    columns.forEach((col, i) => {
      const count = game.decks?.[i]?.length || 0;
      col.classList.toggle('is-empty', count <= 0);
      col.dataset.depth = String(Math.min(3, count));
      col.dataset.showCount = 'false';
      const countEl = col.querySelector('.deck-count');
      if (countEl) countEl.textContent = '';
    });
  }''')

text = replace_function(text, 'validateMove', r'''  function validateMove(sourceGroup, dr, dc, board = game.board, groups = game.groups, options = {}) {
    if (!sourceGroup || (!dr && !dc)) return { valid:false, reason:'same' };
    const cells = sourceGroup.cells.slice();
    const sourceSet = new Set(cells);
    const targets = [];
    const edges = new Map();
    for (const index of cells) {
      const {r,c}=idxToRC(index), nr=r+dr, nc=c+dc;
      if (nr<0||nr>=GRID||nc<0||nc>=GRID) return {valid:false,reason:'bounds'};
      const target = rcToIdx(nr,nc);
      targets.push(target);
      edges.set(index, target);
    }
    const targetSet = new Set(targets);
    const next = board.slice();

    // Reference rule: the dragged joined shape remains rigid, but the target region
    // may cut through any other joined shape. Target cells are displaced back into
    // the source footprint. Overlapping translations are handled as path rotations.
    const starts = cells.filter((cell) => !targetSet.has(cell));
    const touched = new Set();
    for (const start of starts) {
      const path = [start];
      let cur = start;
      while (edges.has(cur)) {
        cur = edges.get(cur);
        path.push(cur);
      }
      const values = path.map((cell) => board[cell]);
      next[path[0]] = values[values.length - 1] || null;
      for (let i = 0; i < path.length - 1; i++) next[path[i+1]] = values[i] || null;
      path.forEach((cell)=>touched.add(cell));
    }
    // Disjoint source/target shapes are fully covered by the paths above. This is
    // an integrity fallback for any exotic translated shape.
    for (const s of cells) if (!touched.has(s) && !targetSet.has(s)) next[s] = null;

    const beforeIds = board.filter(Boolean).slice().sort().join('|');
    const afterIds = next.filter(Boolean).slice().sort().join('|');
    if (beforeIds !== afterIds) return {valid:false,reason:'integrity',targets};
    return {valid:true,targets,board:next};
  }''')

text = replace_function(text, 'onTilePointerDown', r'''  function onTilePointerDown(event) {
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    const sourceGroup = groupAtCell(index);
    if (!sourceGroup) return;
    event.preventDefault();
    const rect = dom.board.getBoundingClientRect();
    const stepPx = rect.width * gridMetrics().step / 100;
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      sourceGroup, sourceIds:sourceGroup.ids.slice(), sourceCells:sourceGroup.cells.slice(),
      boardRect:rect, cellSize:stepPx, lastDr:0,lastDc:0, validation:null, moved:false
    };
    game.drag=drag; game.phase='dragging';
    sourceGroup.cells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    sourceGroup.ids.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
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
    if (Math.hypot(drag.dx,drag.dy) > Math.max(6,drag.cellSize*.06)) drag.moved=true;
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id);
      if(el) el.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.025)`;
    });
    const dc=Math.round(drag.dx/drag.cellSize), dr=Math.round(drag.dy/drag.cellSize);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr;
    clearCellHighlights();
    drag.sourceCells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));
  }''')

# Make the swap settle closer to the ~0.2-0.25 s motion in the recording.
text = text.replace('    await animateFlipFromRects(firstRects,285);', '    await animateFlipFromRects(firstRects,235);', 1)
text = text.replace('    await resolveBoard(0,beforeConnections);', '    await resolveBoard(beforeConnections,true,false);', 1)

text = replace_function(text, 'findHelpfulMove', r'''  function findHelpfulMove() {
    const groups=computeGroups();
    const base=boardScore(game.board); let best=null;
    for (const group of groups) {
      for (let dr=-(GRID-1);dr<=GRID-1;dr++) for(let dc=-(GRID-1);dc<=GRID-1;dc++) {
        if(!dr&&!dc)continue;
        const result=validateMove(group,dr,dc,game.board,groups); if(!result.valid)continue;
        const score=boardScore(result.board);
        const afterGroups=computeGroups(result.board,game.tiles);
        const completes=afterGroups.filter(g=>g.complete).length;
        const movedGrowth=group.ids.reduce((bestGrowth,id)=>{
          const targetIndex=result.board.indexOf(id);
          const after=afterGroups.find(g=>g.cells.includes(targetIndex));
          return Math.max(bestGrowth,(after?.ids.length||1)-group.ids.length);
        },0);
        const adjusted=score+completes*420+movedGrowth*75;
        if(!best||adjusted>best.score)best={group,dr,dc,board:result.board,score:adjusted,rawScore:score};
      }
    }
    if(best&&best.rawScore>=base-30) return best;
    return best;
  }''')

text = replace_function(text, 'averageCellCenter', r'''  function averageCellCenter(cells) {
    const points=cells.map((i)=>{
      const g=cellRectPercent(i);
      return{x:g.left+g.width/2,y:g.top+g.height/2};
    });
    return {x:points.reduce((s,p)=>s+p.x,0)/points.length,y:points.reduce((s,p)=>s+p.y,0)/points.length};
  }''')

text = replace_function(text, 'useHint', r'''  async function useHint() {
    if(game.phase!=='idle')return;
    if(game.hintCount<=0){showToast('提示次数用完啦');audio.invalid();return;}
    const move=findHelpfulMove();
    if(!move){showToast('拼好的组合可以整体搬动，也可以被其他碎片拆开替换');audio.invalid();return;}
    game.hintCount--;updateHud();markHint(move);audio.merge();showToast('拖动发光的拼合块到目标区域');
  }''')

text = replace_function(text, 'resolveBoard', r'''  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false, refill=false) {
    game.phase='resolving';
    game.groups=computeGroups(); game.connections=computeConnections();
    const newIds=new Set();
    for(const edge of game.connections) if(!beforeConnections.has(edge)) edge.split('|').forEach(id=>newIds.add(id));
    if(newIds.size) {
      newIds.forEach((id)=>tileEls.get(id)?.classList.add('merge-pop'));
      audio.merge(); haptic(14);
      await delay(260);
      newIds.forEach((id)=>tileEls.get(id)?.classList.remove('merge-pop'));
    }

    const complete=game.groups.filter(g=>g.complete);
    if(complete.length) {
      game.comboStreak += complete.length;
      game.comboMax=Math.max(game.comboMax,game.comboStreak);
      showCombo(game.comboStreak);
      await animateAndClear(complete);
      const beforeGravity=new Set(game.connections);
      await applyGravity();
      await resolveBoard(beforeGravity,false,true);
      return;
    }

    if(isPlayerMove) game.comboStreak=0;

    if(refill) {
      const beforeDeal=new Set(game.connections);
      const dealt=await dealIntoBoard();
      if(dealt) {
        await resolveBoard(beforeDeal,false,true);
        return;
      }
    }

    if(remainingDeckCount()===0 && game.board.every(v=>!v)) { await finishLevel(); return; }
    game.phase='idle';
  }''')

text = replace_function(text, 'animateAndClear', r'''  async function animateAndClear(groups) {
    const clearIds=[]; const overlays=[];
    for(const group of groups) {
      clearIds.push(...group.ids);
      const overlay=document.createElement('div');overlay.className='complete-overlay';
      const rect=groupRectPercent(group);
      overlay.style.left=`${rect.left}%`;overlay.style.top=`${rect.top}%`;
      overlay.style.width=`${rect.width}%`;overlay.style.height=`${rect.height}%`;
      overlay.style.backgroundImage=`url("${PICTURE_PATHS[group.imageIndex]}")`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      createSparks(rect.left+rect.width/2,rect.top+rect.height/2,20);
      if(!game.clearedImages.includes(group.imageIndex)) game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);
    }
    clearIds.forEach((id)=>tileEls.get(id)?.classList.add('clear-out'));
    audio.clear();haptic([25,25,35]);
    // The reference holds the completed 2x2 image on screen long enough to read it.
    await delay(720);
    game.board=game.board.map((id)=>clearIds.includes(id)?null:id);
    clearIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.remove();tileEls.delete(id);}});
    overlays.forEach((el)=>el.remove());
    game.clearedCount+=groups.length;renderBoard();
  }''')

text = replace_function(text, 'settleGroupsRigid', r'''  function gravityStep(board) {
    const groups=computeGroups(board,game.tiles).sort((a,b)=>b.maxR-a.maxR||b.minR-a.minR);
    const owner=new Map();
    groups.forEach((group)=>group.cells.forEach((cell)=>owner.set(cell,group)));
    const movable=new Set();
    let changed=true;
    while(changed) {
      changed=false;
      for(const group of groups) {
        if(movable.has(group.key)||group.maxR>=GRID-1)continue;
        const own=new Set(group.cells);
        const can=group.cells.every((cell)=>{
          const target=cell+GRID;
          if(target>=CELL_COUNT)return false;
          if(own.has(target)||!board[target])return true;
          const blocker=owner.get(target);
          return blocker ? movable.has(blocker.key) : false;
        });
        if(can){movable.add(group.key);changed=true;}
      }
    }
    const movingGroups=groups.filter((group)=>movable.has(group.key));
    if(!movingGroups.length)return{moved:false,board:board.slice(),ids:[]};
    const next=board.slice();
    const entries=[];
    movingGroups.forEach((group)=>group.cells.forEach((cell)=>entries.push([cell,board[cell]])));
    entries.forEach(([cell])=>{next[cell]=null;});
    entries.sort((a,b)=>b[0]-a[0]).forEach(([cell,id])=>{next[cell+GRID]=id;});
    return{moved:true,board:next,ids:entries.map(([,id])=>id)};
  }

  function settleGroupsRigid(board) {
    let next=board.slice();
    let safety=0;
    while(safety++<GRID*GRID*2){
      const step=gravityStep(next);
      if(!step.moved)break;
      next=step.board;
    }
    return next;
  }''')

text = replace_function(text, 'applyGravity', r'''  async function applyGravity() {
    let wave=0, moved=false;
    const movedIds=new Set();
    while(wave<GRID*GRID*2) {
      const step=gravityStep(game.board);
      if(!step.moved)break;
      moved=true; step.ids.forEach((id)=>movedIds.add(id));
      const first=captureTileRects();
      game.board=step.board; renderBoard();
      const duration=Math.max(72,128-wave*12);
      await animateFlipFromRects(first,duration);
      wave++;
    }
    if(moved) {
      movedIds.forEach((id)=>tileEls.get(id)?.classList.add('land-pop'));
      audio.deal(); haptic(Math.min(28,8+wave*4));
      await delay(95);
      movedIds.forEach((id)=>tileEls.get(id)?.classList.remove('land-pop'));
    }
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return moved;
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
      // Cards fall from the column pile to the deepest accessible top vacancy first.
      for(let k=emptyTop.length-1;k>=0&&deck.length;k--){
        const index=emptyTop[k], id=deck.shift();
        game.board[index]=id; dealt.push({index,id,col:c,order:dealt.length});
      }
    }
    if(!dealt.length){updateDeckVisuals();return false;}

    const hidden=new Set(dealt.map(d=>d.id));renderBoard({hiddenIds:hidden});updateDeckVisuals();
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();
    const dropBase=Math.max(105,boardRect.top-deckRect.top+34);
    dealt.forEach((item,n)=>{
      const geom=cellRectPercent(item.index); const {r}=idxToRC(item.index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropBase+r*(boardRect.width*gridMetrics().step/100)}px`);
      card.style.animationDelay=`${n*42}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{
        audio.deal();const tile=tileEls.get(item.id);
        if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}
        card.remove();
      },285+n*42);
    });
    await delay(340+dealt.length*42+430);
    game.groups=computeGroups();game.connections=computeConnections();renderBoard();
    return true;
  }''')

text = replace_function(text, 'startLevel', r'''  async function startLevel(level) {
    hideModals();dom.winScreen.classList.remove('is-visible');showOnly(dom.playScreen);clearHintMarks();
    game.level=Math.max(1,level);
    configureGrid(gridForLevel(game.level));
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
    dom.introLevel.textContent=String(game.level);dom.introText.textContent=GRID===5?'困难关卡 · 五列拼图':'把四块碎片拼成一张完整图片';
    dom.levelIntro.classList.add('is-visible');updateHud();updateDeckVisuals();

    const preloadSet=new Set();
    game.board.filter(Boolean).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex));
    game.decks.forEach((deck)=>deck.slice(0,2).forEach((id)=>preloadSet.add(game.tiles.get(id).imageIndex)));
    await preloadImages([...preloadSet]);
    renderBoard({hiddenIds:new Set(game.board.filter(Boolean))});
    await delay(260);await initialDealAnimation();
    await delay(100);dom.levelIntro.classList.remove('is-visible');startTimer();game.phase='idle';
    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('拼好的碎片会整体移动；目标拼合块可以被拆开替换',3000);}else dom.tutorialHand.classList.remove('is-visible');
  }''')

text = replace_function(text, 'initialDealAnimation', r'''  async function initialDealAnimation() {
    const items=game.board.map((id,index)=>({id,index})).filter(x=>x.id);
    const boardRect=dom.board.getBoundingClientRect();const deckRect=dom.deckArea.getBoundingClientRect();const dropY=Math.max(150,boardRect.top-deckRect.top+52);
    items.forEach(({id,index})=>{
      const {r,c}=idxToRC(index);const geom=cellRectPercent(index);
      const card=document.createElement('div');card.className='deal-card';
      card.style.left=`${geom.left}%`;card.style.top=`${geom.top}%`;card.style.width=`${geom.width}%`;card.style.height=`${geom.height}%`;
      card.style.setProperty('--drop-y',`${dropY+r*(boardRect.width*gridMetrics().step/100)}px`);
      const stagger=r*62+c*20;card.style.animationDelay=`${stagger}ms`;card.innerHTML='<div class="face back"></div>';dom.fxLayer.appendChild(card);
      setTimeout(()=>{audio.deal();const tile=tileEls.get(id);if(tile){tile.style.opacity='1';tile.classList.add('flip-in');setTimeout(()=>tile.classList.remove('flip-in'),500);}card.remove();},300+stagger);
    });
    await delay(300+(GRID-1)*62+(GRID-1)*20+520);renderBoard();
  }''')

# Resize uses the actual grid step, not raw boardWidth/GRID.
text = text.replace("game.drag.cellSize=game.drag.boardRect.width/GRID;", "game.drag.cellSize=game.drag.boardRect.width*gridMetrics().step/100;", 1)

# Expose the important model functions for QA/debugging.
text = re.sub(r"window\.__JIGSAW__=\{[^\n]+\};", "window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,gravityStep,validateMove,gridForLevel,isHardLevel,remainingDeckCount,finishLevel,goHome};", text, count=1)

# No legacy single global deck should remain.
if re.search(r'game\.deck(?!s)', text):
    raise SystemExit('legacy game.deck reference remains')

GAME.write_text(text, encoding='utf-8')

index = INDEX.read_text(encoding='utf-8')
index = re.sub(r'<p class="home-tip">.*?</p>', '<p class="home-tip">拼合块直接整体拖动 · 放到其他拼合块上可拆开替换</p>', index, count=1)
INDEX.write_text(index, encoding='utf-8')

css = CSS.read_text(encoding='utf-8')
marker = '/* v3-reference-fidelity */'
if marker in css:
    css = css[:css.index(marker)].rstrip() + '\n'
css += r'''
/* v3-reference-fidelity */
:root{--board-size:min(86vw,400px)}
.cell{border-radius:6px;border:1px solid rgba(78,155,222,.28);background:linear-gradient(145deg,rgba(45,132,210,.38),rgba(15,91,180,.46))}
.tile{border-width:2px;border-color:rgba(248,251,255,.96);border-radius:7px;box-shadow:0 0 0 1px rgba(22,42,69,.7),0 2px 3px rgba(0,29,78,.22)}
.tile.join-left{border-left-color:transparent}.tile.join-right{border-right-color:transparent}.tile.join-up{border-top-color:transparent}.tile.join-down{border-bottom-color:transparent}
.tile.is-dragging{filter:saturate(1.08) brightness(1.04);box-shadow:0 12px 18px rgba(0,30,78,.42),0 0 0 2px rgba(255,255,255,.64)}
.tile.land-pop{animation:landPopV3 .14s cubic-bezier(.2,.9,.3,1.3)}
@keyframes landPopV3{0%{transform:scaleY(.94) scaleX(1.025)}100%{transform:none}}
.deck-count{display:none!important}
.deck-column[data-depth="0"] .deck-stack{opacity:0}
.deck-column[data-depth="1"] .deck-stack::before,.deck-column[data-depth="1"] .deck-stack::after{display:none}
.deck-column[data-depth="2"] .deck-stack::after{display:none}
.level-title.is-hard span{color:#d9283d;font-weight:1000;text-shadow:0 1px rgba(255,255,255,.75)}
.game-stage.is-hard .deck-stack,.game-stage.is-hard .deck-stack::before,.game-stage.is-hard .deck-stack::after{background:linear-gradient(180deg,#f34f62,#c92343);border-color:#ffd7d7;box-shadow:inset 0 0 0 2px #941b35,0 2px 0 #86172f}
.game-stage.is-hard .deal-card .back{background:linear-gradient(145deg,#f34f62,#c92343);border-color:#ffd7d7;box-shadow:inset 0 0 0 3px #941b35,0 6px 10px rgba(0,42,103,.35)}
@media(max-height:700px){:root{--board-size:min(84vw,365px)}}
'''
CSS.write_text(css, encoding='utf-8')

sw = SW.read_text(encoding='utf-8')
sw = re.sub(r"const CACHE='[^']+';", "const CACHE='jigsaw-drop-h5-v3.0';", sw, count=1)
SW.write_text(sw, encoding='utf-8')
VERSION.write_text('3.0.0\n', encoding='utf-8')
print('patched to 3.0.0 reference-fidelity rules')
