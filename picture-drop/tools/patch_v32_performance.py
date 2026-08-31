from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'
CSS=ROOT/'style.css'
VERSION=ROOT/'VERSION'

s=GAME.read_text(encoding='utf-8')

# Add one RAF-backed drag renderer. Pointer events only record the latest coordinates;
# the browser gets at most one transform/highlight update per display frame.
start=s.index('  function onDragMove(event) {')
end=s.index('\n\n\n  async function onDragEnd', start)
new=r'''  function flushDragFrame() {
    const drag=game.drag;
    if(!drag){ return; }
    drag.rafId=0;
    const dx=drag.pendingDx ?? drag.dx ?? 0;
    const dy=drag.pendingDy ?? drag.dy ?? 0;
    drag.dx=dx; drag.dy=dy;
    if (Math.hypot(dx,dy) > Math.max(6,Math.min(drag.stepX,drag.stepY)*.06)) {
      drag.moved=true;
      if (drag.holdTimer) { clearTimeout(drag.holdTimer); drag.holdTimer=0; }
    }
    const transform=`translate3d(${dx}px,${dy}px,0) scale(1.018)`;
    drag.sourceIds.forEach((id)=>{
      const el=tileEls.get(id);
      if(el && el.style.transform!==transform) el.style.transform=transform;
    });
    const dc=Math.round(dx/drag.stepX), dr=Math.round(dy/drag.stepY);
    if(dc===drag.lastDc&&dr===drag.lastDr)return;
    drag.lastDc=dc; drag.lastDr=dr;
    clearCellHighlights();
    drag.sourceCells.forEach((cell)=>cellEls[cell]?.classList.add('is-source'));
    const result=validateMove(drag.sourceGroup,dr,dc); drag.validation=result;
    if(result.targets) result.targets.forEach((cell)=>cellEls[cell]?.classList.add(result.valid?'is-target':'is-target-invalid'));
  }

  function onDragMove(event) {
    const drag=game.drag; if(!drag||event.pointerId!==drag.pointerId)return;
    event.preventDefault();
    drag.pendingDx=event.clientX-drag.startX;
    drag.pendingDy=event.clientY-drag.startY;
    if(!drag.rafId) drag.rafId=requestAnimationFrame(flushDragFrame);
  }'''
s=s[:start]+new+s[end:]

# Ensure the final pointer position is rendered before evaluating the drop.
s=s.replace("    if (drag.holdTimer) clearTimeout(drag.holdTimer);\n    window.removeEventListener('pointermove',onDragMove);",
'''    if (drag.holdTimer) clearTimeout(drag.holdTimer);
    if (drag.rafId) { cancelAnimationFrame(drag.rafId); drag.rafId=0; flushDragFrame(); }
    window.removeEventListener('pointermove',onDragMove);''',1)

# Remove the explicit forced synchronous reflow from FLIP. Double RAF lets style/layout
# settle naturally between the inverse transform and transition without offsetWidth.
s=s.replace("    moving[0].offsetWidth;\n    moving.forEach((el)=>{ el.style.transition=`transform ${duration}ms cubic-bezier(.18,.84,.22,1)`; el.style.transform='none'; });",
'''    await new Promise((resolve)=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    moving.forEach((el)=>{ el.style.transition=`transform ${duration}ms cubic-bezier(.18,.84,.22,1)`; el.style.transform='none'; });''',1)

# Avoid repeated Array.includes scans in the hot FLIP path.
s=s.replace("  function captureTileRects() {\n    const rects = new Map();\n    for (const [id, el] of tileEls) {\n      if (el.style.display !== 'none' && game.board.includes(id)) rects.set(id, el.getBoundingClientRect());\n    }\n    return rects;\n  }",
'''  function captureTileRects() {
    const rects = new Map();
    const active = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (el.style.display !== 'none' && active.has(id)) rects.set(id, el.getBoundingClientRect());
    }
    return rects;
  }''',1)

s=s.replace("    const moving = [];\n    for (const [id, el] of tileEls) {\n      if (!game.board.includes(id) || !firstRects.has(id)) continue;",
'''    const moving = [];
    const active = new Set(game.board.filter(Boolean));
    for (const [id, el] of tileEls) {
      if (!active.has(id) || !firstRects.has(id)) continue;''',1)

# Cache id->cell for renderBoard instead of board.indexOf for every active tile.
s=s.replace("    const activeIds = new Set(game.board.filter(Boolean));",
'''    const activeIds = new Set(game.board.filter(Boolean));
    const indexById = new Map();
    game.board.forEach((id,index)=>{ if(id) indexById.set(id,index); });''',1)
s=s.replace("      const index=game.board.indexOf(id);", "      const index=indexById.get(id);",1)

# Preload/decode only the images used in the current level so first drag does not pay decode cost.
marker='  function selectedImagesForLevel(level, count) {'
insert=r'''  function warmLevelImages(indices) {
    if (!indices || !indices.length) return;
    indices.forEach((imageIndex)=>{
      const img=new Image();
      img.decoding='async';
      img.src=PICTURE_PATHS[imageIndex];
      if (img.decode) img.decode().catch(()=>{});
    });
  }

'''
if 'function warmLevelImages' not in s:
    s=s.replace(marker,insert+marker,1)
# generateLevel returns selected; warm when starting a level where the level object is assigned.
# Patch common assignment patterns safely.
s=s.replace("    const generated=generateLevel(level);", "    const generated=generateLevel(level); warmLevelImages(generated.selected);",1)
s=s.replace("    const generated = generateLevel(level);", "    const generated = generateLevel(level); warmLevelImages(generated.selected);",1)

GAME.write_text(s,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
perf=r'''

/* v3.2-performance */
.tile{will-change:transform;contain:layout paint style;backface-visibility:hidden;transform:translateZ(0)}
.tile.is-dragging{filter:none;box-shadow:0 8px 12px rgba(0,30,78,.30),0 0 0 1.5px rgba(255,255,255,.72)}
.cell{contain:layout paint style}
.tile-layer,.cell-layer,.fx-layer{contain:layout paint style}
.board{contain:layout paint style;transform:translateZ(0)}
@media(max-width:540px){
  .tile{box-shadow:0 0 0 1px rgba(22,42,69,.62),0 1px 2px rgba(0,29,78,.16)}
  .tile.is-dragging{box-shadow:0 7px 10px rgba(0,30,78,.28),0 0 0 1.5px rgba(255,255,255,.7)}
}
'''
if '/* v3.2-performance */' not in css:
    css += perf
CSS.write_text(css,encoding='utf-8')
VERSION.write_text('3.2.0\n',encoding='utf-8')
print('patched v3.2 performance')
