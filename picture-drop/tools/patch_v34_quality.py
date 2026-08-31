from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
g=ROOT/'game.js'; c=ROOT/'style.css'; v=ROOT/'VERSION'
s=g.read_text(encoding='utf-8')
# Perfect image continuity: logical cells touch exactly. Separation is visual border only.
s=s.replace("    const gap = GRID >= 5 ? 0.56 : 0.52;\n    const cell = (100 - gap * (GRID - 1)) / GRID;", "    const gap = 0;\n    const cell = 100 / GRID;",1)
# No geometry stretching on joined pieces: stretching changes background sampling and causes image mismatch.
start=s.index('  function applyTileGeometry(el, index, join) {')
end=s.index('\n  function configureGrid',start)
s=s[:start]+'''  function applyTileGeometry(el, index, join) {
    const g = cellRectPercent(index);
    // Tiles always keep the exact cell rectangle. Joined seams are removed only by
    // borders/radii, so all four 200% background quadrants line up pixel-perfectly.
    el.style.left = `${g.left}%`;
    el.style.top = `${g.top}%`;
    el.style.width = `${g.width}%`;
    el.style.height = `${g.height}%`;
  }
'''+s[end:]
# Progress watchdog state.
s=s.replace("    unlockedThisLevel: []", "    unlockedThisLevel: [],\n    movesSinceClear: 0",1)
# Increment after move.
s=s.replace("    game.board=validation.board; game.moves++; renderBoard(); updateHud();", "    game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard(); updateHud();",1)
# Reset on clear.
s=s.replace("    game.clearedCount+=groups.length;renderBoard();", "    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();",1)
# Reset level.
s=s.replace("game.comboMax=1;game.comboStreak=0;game.hintCount=3;game.autoCount=3;game.timerBase=0;game.timerRunning=false;", "game.comboMax=1;game.comboStreak=0;game.hintCount=3;game.autoCount=3;game.movesSinceClear=0;game.timerBase=0;game.timerRunning=false;",1)
# Add deterministic rescue: if player has made many moves without a clear, expose one complete image
# by swapping its four quarters into a bottom 2x2. This preserves every tile and guarantees progress.
marker='  async function resolveBoard(beforeConnections=new Set(), isPlayerMove=false) {'
rescue=r'''  function buildRescueBoard() {
    if ((game.movesSinceClear||0) < Math.max(12, GRID*3)) return null;
    const allLocations=new Map();
    game.board.forEach((id,i)=>{if(id)allLocations.set(id,{kind:'board',index:i});});
    game.decks.forEach((deck,c)=>deck.forEach((id,p)=>allLocations.set(id,{kind:'deck',col:c,pos:p})));
    const candidates=[...new Set([...game.tiles.values()].map(t=>t.imageIndex))];
    for(const imageIndex of candidates){
      const ids=[0,1,2,3].map(q=>[...game.tiles.values()].find(t=>t.imageIndex===imageIndex&&t.quadrant===q)?.id);
      if(ids.some(id=>!id||!allLocations.has(id)))continue;
      // Prefer an image already fully present on the board; otherwise do not pull through a deck.
      if(!ids.every(id=>allLocations.get(id).kind==='board'))continue;
      for(let r=GRID-2;r>=0;r--)for(let c=0;c<GRID-1;c++){
        const targets=[rcToIdx(r,c),rcToIdx(r,c+1),rcToIdx(r+1,c),rcToIdx(r+1,c+1)];
        const next=game.board.slice();
        const sourceCells=ids.map(id=>next.indexOf(id));
        // Permute by swaps so tile integrity is preserved.
        for(let q=0;q<4;q++){
          const want=ids[q], target=targets[q], src=next.indexOf(want);
          if(src<0)break;
          [next[src],next[target]]=[next[target],next[src]];
        }
        if(findCompleteGroups(next,game.tiles).some(g=>g.imageIndex===imageIndex))return next;
      }
    }
    return null;
  }

  async function rescueIfStalled() {
    const next=buildRescueBoard();
    if(!next)return false;
    const first=captureTileRects();
    game.board=next; renderBoard();
    await animateFlipFromRects(first,260);
    game.movesSinceClear=0;
    showToast('已自动解开死局',900); audio.merge(); haptic(16);
    return true;
  }

'''
s=s.replace(marker,rescue+marker,1)
# Before resolving ends, invoke rescue if stalled.
s=s.replace("      break;\n    }\n\n    if(remainingDeckCount()===0", "      if (await rescueIfStalled()) { baseline=new Set(); continue; }\n      break;\n    }\n\n    if(remainingDeckCount()===0",1)
g.write_text(s,encoding='utf-8')
css=c.read_text(encoding='utf-8')
css += r'''

/* v3.4-pixel-perfect-joins */
/* Cells now touch geometrically; borders alone describe unjoined pieces. */
.tile{background-size:200% 200%;background-repeat:no-repeat}
.tile.is-joined{box-shadow:none}
.tile.join-left{border-left:0!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important}
.tile.join-right{border-right:0!important;border-top-right-radius:0!important;border-bottom-right-radius:0!important}
.tile.join-up{border-top:0!important;border-top-left-radius:0!important;border-top-right-radius:0!important}
.tile.join-down{border-bottom:0!important;border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}
/* Neighboring unjoined borders overlap visually instead of creating a physical blue gutter. */
.cell{background:rgba(20,102,190,.34);border-color:rgba(65,150,224,.24)}
'''
c.write_text(css,encoding='utf-8');v.write_text('3.4.0\n',encoding='utf-8')
print('patched v3.4 quality')
