from pathlib import Path
import re, json, datetime

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
INDEX = ROOT / 'index.html'
CSS = ROOT / 'style.css'
SW = ROOT / 'sw.js'
VERSION = ROOT / 'VERSION'

text = GAME.read_text(encoding='utf-8')


def replace_function(src: str, name: str, replacement: str) -> str:
    marker = f'  function {name}('
    start = src.find(marker)
    if start < 0:
        raise RuntimeError(f'function not found: {name}')
    brace = src.find('{', start)
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
                    return src[:start] + replacement.rstrip() + src[end:]
        i += 1
    raise RuntimeError(f'unclosed function: {name}')


# Difficulty curve: deeper levels without exploding first-session complexity.
text = replace_function(text, 'imageCountForLevel', r'''  function imageCountForLevel(level) {
    if (level <= 2) return 5;
    if (level <= 5) return 6;
    if (level <= 10) return 7;
    if (level <= 18) return 8;
    // The board still shows only 16 pieces at once; extra images stay in the four feed columns.
    return Math.min(12, 8 + Math.floor((level - 19) / 8));
  }''')

# Free-form replacement model.
# - A normal drag peels a single piece out of a joined group.
# - A short hold (>=180 ms) switches to whole-group mode.
# - A moved shape can displace any tiles under its destination; displaced tiles are sent back
#   to the exact source cells, so the operation is always a reversible region permutation.
text = replace_function(text, 'validateMove', r'''  function validateMove(sourceGroup, dr, dc, board = game.board, groups = game.groups, options = {}) {
    if (!sourceGroup || (!dr && !dc)) return { valid:false, reason:'same' };
    const cells = sourceGroup.cells.slice();
    const sourceSet = new Set(cells);
    const targets = [];
    for (const index of cells) {
      const {r,c}=idxToRC(index), nr=r+dr, nc=c+dc;
      if (nr<0||nr>=GRID||nc<0||nc>=GRID) return {valid:false,reason:'bounds'};
      targets.push(rcToIdx(nr,nc));
    }
    const targetSet = new Set(targets);
    if (targets.some((index)=>sourceSet.has(index))) return {valid:false,reason:'overlap',targets};

    const next = board.slice();
    const sourceValues = cells.map((cell)=>board[cell]);
    const displaced = targets.map((cell)=>board[cell]);

    // Clear both regions first, then perform a position-preserving region swap.
    cells.forEach((cell)=>{ next[cell]=null; });
    targets.forEach((cell)=>{ next[cell]=null; });
    targets.forEach((cell,i)=>{ next[cell]=sourceValues[i] || null; });
    cells.forEach((cell,i)=>{ next[cell]=displaced[i] || null; });

    // Sanity: never duplicate or lose pieces.
    const beforeIds = board.filter(Boolean).slice().sort().join('|');
    const afterIds = next.filter(Boolean).slice().sort().join('|');
    if (beforeIds !== afterIds) return {valid:false,reason:'integrity',targets};
    return {valid:true,targets,board:next,displaced};
  }''')

# New drag semantics. Long-press promotes single-tile drag to group drag before meaningful movement.
text = replace_function(text, 'onTilePointerDown', r'''  function onTilePointerDown(event) {
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    const joined = groupAtCell(index);
    if (!joined) return;
    event.preventDefault();
    const rect = dom.board.getBoundingClientRect();
    const single = { ids:[id], cells:[index], imageIndex:game.tiles.get(id)?.imageIndex, complete:false };
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      joinedGroup:joined, sourceGroup:single, sourceIds:[id], sourceCells:[index],
      boardRect:rect, cellSize:rect.width/GRID, lastDr:0,lastDc:0, validation:null,
      mode:'single', pressedAt:performance.now(), moved:false, holdTimer:0
    };
    if (joined.ids.length > 1) {
      drag.holdTimer = window.setTimeout(()=>{
        if (!game.drag || game.drag !== drag || drag.moved) return;
        drag.mode='group'; drag.sourceGroup=joined; drag.sourceIds=joined.ids.slice(); drag.sourceCells=joined.cells.slice();
        clearCellHighlights();
        drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
        drag.sourceIds.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
        showToast('整组移动',650); haptic(12); audio.merge();
      },180);
    }
    game.drag=drag; game.phase='dragging';
    drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
    drag.sourceIds.forEach((tileId)=>tileEls.get(tileId)?.classList.add('is-dragging'));
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
    if (Math.hypot(drag.dx,drag.dy) > Math.max(7,drag.cellSize*.08)) {
      drag.moved=true;
      if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer=0; }
    }
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id); if(el)el.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.035)`;
    });
    const dc=Math.round(drag.dx/drag.cellSize), dr=Math.round(drag.dy/drag.cellSize);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr; clearCellHighlights(); drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell].classList.add(result.valid?'is-target':'is-target-invalid'));
  }''')

text = replace_function(text, 'onDragEnd', r'''  async function onDragEnd(event) {
    const drag=game.drag; if(!drag)return;
    if (drag.holdTimer) clearTimeout(drag.holdTimer);
    window.removeEventListener('pointermove',onDragMove);
    window.removeEventListener('pointerup',onDragEnd);
    window.removeEventListener('pointercancel',onDragEnd);
    clearCellHighlights(); game.drag=null;

    // A tap is not a move and should never break a joined image.
    if (!drag.moved || (!drag.lastDr && !drag.lastDc)) {
      drag.sourceIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transform='';el.classList.remove('is-dragging');}});
      game.phase='idle'; return;
    }
    const validation=drag.validation || validateMove(drag.sourceGroup,drag.lastDr,drag.lastDc);
    if(validation.valid) {
      await commitMove(drag.sourceGroup,drag.lastDr,drag.lastDc,validation.board,true);
    } else {
      audio.invalid(); haptic([10,25,10]);
      drag.sourceIds.forEach((id)=>{
        const el=tileEls.get(id); if(!el)return;
        el.style.transition='transform 180ms cubic-bezier(.2,.9,.25,1.18)'; el.style.transform='none';
      });
      await delay(195);
      drag.sourceIds.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';el.classList.remove('is-dragging');}});
      game.phase='idle';
    }
  }''')

# Gravity is now granular: connected edges are visual affinity only, not a permanent rigid body.
# Every column settles independently, bottom-up, which matches the reference game's "sand-like" drop
# and prevents L/2-piece formations from floating or blocking a solvable state.
text = replace_function(text, 'settleGroupsRigid', r'''  function settleGroupsRigid(board) {
    const next=Array(CELL_COUNT).fill(null);
    for(let c=0;c<GRID;c++){
      const ids=[];
      for(let r=GRID-1;r>=0;r--){
        const id=board[rcToIdx(r,c)]; if(id) ids.push(id);
      }
      ids.forEach((id,k)=>{ next[rcToIdx(GRID-1-k,c)]=id; });
    }
    return next;
  }''')

# Animate gravity by physical distance, with longer falls taking slightly longer and landing feedback.
text = replace_function(text, 'applyGravity', r'''  async function applyGravity() {
    const next=settleGroupsRigid(game.board);
    if(next.every((id,i)=>id===game.board[i]))return;
    const oldIndex=new Map(); game.board.forEach((id,i)=>{if(id)oldIndex.set(id,i);});
    const first=captureTileRects(); game.board=next; renderBoard();
    let maxRows=1;
    next.forEach((id,i)=>{
      if(!id)return; const from=oldIndex.get(id); if(from==null)return;
      maxRows=Math.max(maxRows,Math.max(0,idxToRC(i).r-idxToRC(from).r));
    });
    const duration=Math.min(420,170+maxRows*62);
    await animateFlipFromRects(first,duration);
    const landed=[];
    next.forEach((id,i)=>{
      if(!id)return; const from=oldIndex.get(id); if(from!=null&&idxToRC(i).r>idxToRC(from).r)landed.push(id);
    });
    landed.forEach((id)=>tileEls.get(id)?.classList.add('land-pop'));
    if(landed.length){ haptic(Math.min(24,7+maxRows*4)); audio.deal(); }
    await delay(95);
    landed.forEach((id)=>tileEls.get(id)?.classList.remove('land-pop'));
    game.groups=computeGroups(); game.connections=computeConnections(); renderBoard();
  }''')

# Hint copy should explain the two gestures instead of implying permanent groups.
text = text.replace("showToast('现在已经很接近了，试试移动组合块')", "showToast('试试直接拖一块拆开，或长按后整组移动')")
text = text.replace("showToast('发光的碎片可以这样交换')", "showToast('直接拖可拆单块；长按再拖可搬整组')")

GAME.write_text(text, encoding='utf-8')

# UI copy.
idx = INDEX.read_text(encoding='utf-8')
idx = idx.replace('拖动已经拼好的碎片时，它们会作为一个整体移动', '直接拖动可拆出单块 · 长按再拖可整体搬移')
idx = idx.replace('拖动碎片交换位置，正确的边会自动吸附', '直接拖动可拆单块，长按后拖动可整体搬移')
INDEX.write_text(idx, encoding='utf-8')

# Fine-grained landing animation and mobile sizing refinements.
css = CSS.read_text(encoding='utf-8')
if '.tile.land-pop' not in css:
    css += r'''

/* v2.1 interaction polish */
.tile.land-pop{animation:landPop .16s cubic-bezier(.2,.92,.28,1.28)}
@keyframes landPop{0%{transform:translateY(-5px) scaleY(1.03)}55%{transform:translateY(2px) scaleX(1.025) scaleY(.965)}100%{transform:none}}
@media (max-width:430px){
  :root{--board-size:min(calc(100vw - 18px),calc(100dvh - 178px),404px)}
  .game-area{justify-content:center}.deck-area{flex:0 0 58px}.status-row{flex:0 0 38px;margin-top:6px}
}
@media (max-height:720px){
  :root{--board-size:min(calc(100vw - 22px),calc(100dvh - 166px),360px)}
  .topbar{height:calc(56px + env(safe-area-inset-top))}.deck-area{height:48px}.status-row{height:34px;margin-top:4px}
}
'''
CSS.write_text(css, encoding='utf-8')

# Force service worker cache rotation so iOS/Android browsers don't keep the broken move model.
sw = SW.read_text(encoding='utf-8')
sw = re.sub(r"const CACHE='[^']+';", "const CACHE='jigsaw-drop-h5-v2-1';", sw, count=1)
SW.write_text(sw, encoding='utf-8')

VERSION.write_text('2.1.0\n', encoding='utf-8')
(ROOT / 'release.json').write_text(json.dumps({
    'version':'2.1.0',
    'builtAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'features':[
        'single-piece peel from joined groups',
        'long-press whole-group dragging',
        'reversible multi-cell region replacement',
        'independent-column natural gravity',
        'deeper level image counts',
        'mobile sizing and cache refresh'
    ]
}, ensure_ascii=False, indent=2), encoding='utf-8')

print('patched Jigsaw Drop to v2.1.0')
