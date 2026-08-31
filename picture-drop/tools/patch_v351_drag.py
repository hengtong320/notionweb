from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; CSS=ROOT/'style.css'; INDEX=ROOT/'index.html'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'

s=GAME.read_text(encoding='utf-8')
# Make the input contract explicit instead of relying on stacking side effects.
s=s.replace("      el.className = 'tile'; el.dataset.tileId = tile.id;", "      el.className = 'tile'; el.dataset.tileId = tile.id;\n      el.style.pointerEvents = 'auto';", 1)
# Add a tiny self-heal only for an orphaned dragging phase; never override resolving/animation phases.
s=s.replace("  function onTilePointerDown(event) {\n    if (game.phase !== 'idle') return;", "  function onTilePointerDown(event) {\n    if (game.phase === 'dragging' && !game.drag) game.phase = 'idle';\n    if (game.phase !== 'idle') return;", 1)
# Export the drag state helpers for regression diagnostics.
s=s.replace("window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,gravityStep,validateMove,gridForLevel,isHardLevel,remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome};",
"window.__JIGSAW__={game,startLevel,findHelpfulMove,commitMove,computeGroups,computeConnections,boardScore,generateLevel,settleGroupsRigid,gravityStep,validateMove,gridForLevel,isHardLevel,remainingDeckCount,updateBoardLayout,TILE_ASPECT,finishLevel,goHome,visibleCompletionImage,ensureVisibleCompletionSet,primeDecksForPlayableFrontier};",1)
GAME.write_text(s,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css += r'''

/* v3.5.1-input-hotfix */
/* Decorative/full-board layers must never steal touch/pointer input. */
.cell-layer,.fx-layer{pointer-events:none!important}
.tile-layer{pointer-events:none!important;z-index:20}
.tile{pointer-events:auto!important;-webkit-user-drag:none!important;user-select:none!important;-webkit-user-select:none!important;touch-action:none!important}
/* Keep tile hit targets above all transparent board layers while dragging. */
.tile.is-dragging{z-index:80!important}
'''
CSS.write_text(css,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('manifest.webmanifest?v=3.5.0','manifest.webmanifest?v=3.5.1').replace('style.css?v=3.5.0','style.css?v=3.5.1').replace('game.js?v=3.5.0','game.js?v=3.5.1')
INDEX.write_text(idx,encoding='utf-8')

sw=SW.read_text(encoding='utf-8').replace('jigsaw-drop-h5-v3.5.0','jigsaw-drop-h5-v3.5.1').replace('style.css?v=3.5.0','style.css?v=3.5.1').replace('game.js?v=3.5.0','game.js?v=3.5.1').replace('manifest.webmanifest?v=3.5.0','manifest.webmanifest?v=3.5.1')
SW.write_text(sw,encoding='utf-8')

# Keep the downloadable offline edition truly self-contained with portrait assets.
b=STANDALONE.read_text(encoding='utf-8')
if "assets' / 'pictures-portrait'" not in b:
    b=b.replace("(ROOT / 'assets' / 'pictures').glob('*.webp')", "(ROOT / 'assets' / 'pictures-portrait').glob('*.webp')")
    b=b.replace("relative = f'assets/pictures/{image_path.name}'", "relative = f'assets/pictures-portrait/{image_path.name}'")
STANDALONE.write_text(b,encoding='utf-8')
VERSION.write_text('3.5.1\n',encoding='utf-8')
print('patched v3.5.1 drag input')
