from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
g=ROOT/'game.js'; c=ROOT/'style.css'; v=ROOT/'VERSION'
s=g.read_text(encoding='utf-8')
old='''  function applyTileGeometry(el, index, join) {
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
  }'''
new='''  function applyTileGeometry(el, index, join) {
    const g = cellRectPercent(index);
    // A correct join must visually cover the entire gutter, not only half of it.
    // Add a tiny seam overlap to avoid sub-pixel blue hairlines on DPR 2/3 screens.
    const seam = 0.08;
    let left = g.left, top = g.top, width = g.width, height = g.height;
    if (join?.left) { left -= g.gap + seam; width += g.gap + seam; }
    if (join?.right) width += g.gap + seam;
    if (join?.up) { top -= g.gap + seam; height += g.gap + seam; }
    if (join?.down) height += g.gap + seam;
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.width = `${width}%`;
    el.style.height = `${height}%`;
  }'''
if old not in s: raise SystemExit('applyTileGeometry base not found')
s=s.replace(old,new,1)
# Add group shape classes so joined interiors lose rounding/shadow while the exterior stays crisp.
needle="      if(join.down)el.classList.add('join-down');"
s=s.replace(needle,needle+"\n      el.classList.toggle('is-joined', join.left||join.right||join.up||join.down);",1)
g.write_text(s,encoding='utf-8')
css=c.read_text(encoding='utf-8')
css += r'''

/* v3.3-joined-visual-polish */
.tile.is-joined{box-shadow:none}
.tile.join-left{border-left-width:0;border-top-left-radius:0;border-bottom-left-radius:0}
.tile.join-right{border-right-width:0;border-top-right-radius:0;border-bottom-right-radius:0}
.tile.join-up{border-top-width:0;border-top-left-radius:0;border-top-right-radius:0}
.tile.join-down{border-bottom-width:0;border-bottom-left-radius:0;border-bottom-right-radius:0}
.tile.is-joined:not(.is-dragging){outline:0}
.tile.join-left.join-right{border-left-width:0;border-right-width:0}
.tile.join-up.join-down{border-top-width:0;border-bottom-width:0}
/* Keep the outside silhouette subtle; internal seams should disappear completely. */
.tile.is-joined{background-clip:border-box}
#gameStage[data-grid="5"] .tile.is-joined{border-width:1.35px}
'''
c.write_text(css,encoding='utf-8')
v.write_text('3.3.0\n',encoding='utf-8')
print('patched v3.3 visual joins')
