from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
INDEX = ROOT / 'index.html'
SW = ROOT / 'sw.js'
VERSION = ROOT / 'VERSION'


def replace_function(src: str, name: str, replacement: str) -> str:
    markers = [f'  function {name}(', f'  async function {name}(']
    starts = [src.find(m) for m in markers]
    start = min((v for v in starts if v >= 0), default=-1)
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
                    return src[:start] + replacement.rstrip() + '\n' + src[end:]
        i += 1
    raise RuntimeError(f'closing brace not found: {name}')


text = GAME.read_text(encoding='utf-8')

text = replace_function(text, 'onTilePointerDown', r'''  function onTilePointerDown(event) {
    if (game.phase !== 'idle') return;
    audio.ensure();
    const id = event.currentTarget.dataset.tileId;
    const index = game.board.indexOf(id); if (index < 0) return;
    event.preventDefault();

    // v2.2 core rule: every drag always moves exactly ONE cell.
    // Joining is visual/semantic feedback only; it never locks a piece.
    // Therefore a source piece and a target piece may each belong to a
    // 2/3-piece joined image and the two cells can still swap directly.
    const tile = game.tiles.get(id);
    const single = { ids:[id], cells:[index], imageIndex:tile?.imageIndex, complete:false };
    const rect = dom.board.getBoundingClientRect();
    const drag = {
      pointerId:event.pointerId, startX:event.clientX, startY:event.clientY, dx:0,dy:0,
      sourceGroup:single, sourceIds:[id], sourceCells:[index],
      boardRect:rect, cellSize:rect.width/GRID, lastDr:0,lastDc:0, validation:null,
      moved:false
    };
    game.drag=drag; game.phase='dragging';
    cellEls[index].classList.add('is-source');
    tileEls.get(id)?.classList.add('is-dragging');
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
    if (Math.hypot(drag.dx,drag.dy) > Math.max(6,drag.cellSize*.065)) drag.moved=true;

    const id=drag.sourceIds[0];
    const el=tileEls.get(id);
    if(el) el.style.transform=`translate3d(${drag.dx}px,${drag.dy}px,0) scale(1.045)`;

    const dc=Math.round(drag.dx/drag.cellSize), dr=Math.round(drag.dy/drag.cellSize);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr;
    clearCellHighlights(); drag.sourceCells.forEach((cell)=>cellEls[cell].classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell].classList.add(result.valid?'is-target':'is-target-invalid'));
  }''')

text = replace_function(text, 'findHelpfulMove', r'''  function findHelpfulMove() {
    // Hints follow the same rule as the player: one-cell swaps only.
    const base=boardScore(game.board); let best=null;
    const singles=[];
    game.board.forEach((id,index)=>{
      if(!id)return;
      const tile=game.tiles.get(id);
      singles.push({ids:[id],cells:[index],imageIndex:tile?.imageIndex,complete:false});
    });
    for (const group of singles) {
      for (let dr=-(GRID-1);dr<=GRID-1;dr++) for(let dc=-(GRID-1);dc<=GRID-1;dc++) {
        if(!dr&&!dc)continue;
        const result=validateMove(group,dr,dc,game.board,game.groups); if(!result.valid)continue;
        const score=boardScore(result.board);
        const beforeGroup=groupAtCell(group.cells[0],computeGroups(game.board,game.tiles));
        const afterGroups=computeGroups(result.board,game.tiles);
        const movedId=group.ids[0];
        const movedCell=result.targets[0];
        const afterGroup=afterGroups.find(g=>g.cells.includes(movedCell));
        const growth=(afterGroup?.ids.length||1)-(beforeGroup?.ids.length||1);
        const completes=afterGroups.filter(g=>g.complete).length;
        const adjusted=score+growth*90+completes*300;
        if(!best||adjusted>best.score)best={group,dr,dc,board:result.board,score:adjusted,rawScore:score};
      }
    }
    if(best&&best.rawScore>=base-25) return best;
    return best;
  }''')

# Remove the obsolete long-press cleanup line from onDragEnd if present.
text = text.replace("    if (drag.holdTimer) clearTimeout(drag.holdTimer);\n", "")

# Make guidance consistent with the single-cell swap rule.
text = text.replace("试试直接拖一块拆开，或长按后整组移动", "任意拼好的组合都能直接拆开交换")
text = text.replace("直接拖可拆单块；长按再拖可搬整组", "发光碎片可直接和目标格交换")
text = text.replace("拖动碎片交换位置，正确的边会自动吸附", "拖动任意碎片交换位置，拼好的组合也可以拆开")

GAME.write_text(text, encoding='utf-8')

index = INDEX.read_text(encoding='utf-8')
index = index.replace('拖动已经拼好的碎片时，它们会作为一个整体移动', '任何碎片都能单独交换，拼好的组合也可以再次拆开')
INDEX.write_text(index, encoding='utf-8')

sw = SW.read_text(encoding='utf-8')
import re
sw = re.sub(r"const CACHE='[^']+';", "const CACHE='jigsaw-drop-h5-v2.2';", sw, count=1)
SW.write_text(sw, encoding='utf-8')
VERSION.write_text('2.2.0\n', encoding='utf-8')
print('patched to 2.2.0: universal single-cell swap')
