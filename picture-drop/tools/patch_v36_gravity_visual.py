from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; CSS=ROOT/'style.css'; INDEX=ROOT/'index.html'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'
s=GAME.read_text(encoding='utf-8')

# 1) Joined groups get one continuous image surface. Individual tile DOMs remain
# hit targets/borders, but no longer each rasterize their own quarter while idle.
needle='  const tileEls = new Map();\n  const cellEls = [];'
s=s.replace(needle, needle+'\n  const joinedSurfaceEls = new Map();',1)

old="""      el.style.backgroundImage = `url(\"${PICTURE_PATHS[tile.imageIndex]}\")`;\n      el.style.backgroundPosition = QUADRANTS[tile.quadrant].bg;"""
new="""      const pieceImage=`url(\"${PICTURE_PATHS[tile.imageIndex]}\")`;\n      el.style.backgroundImage = pieceImage;\n      el.style.setProperty('--piece-image',pieceImage);\n      el.style.backgroundPosition = QUADRANTS[tile.quadrant].bg;"""
if old not in s: raise SystemExit('ensureTileElement image marker missing')
s=s.replace(old,new,1)

rstart=s.index('  function renderBoard(options = {}) {')
rend=s.index('\n\n  function updateHud()',rstart)
render=r'''  function clearJoinedSurfaces() {
    joinedSurfaceEls.forEach(el=>el.remove());
    joinedSurfaceEls.clear();
  }

  function quadrantClipPath(quadrants) {
    const key=[...quadrants].sort((a,b)=>a-b).join('');
    const paths={
      '01':'polygon(0 0,100% 0,100% 50%,0 50%)',
      '23':'polygon(0 50%,100% 50%,100% 100%,0 100%)',
      '02':'polygon(0 0,50% 0,50% 100%,0 100%)',
      '13':'polygon(50% 0,100% 0,100% 100%,50% 100%)',
      '012':'polygon(0 0,100% 0,100% 50%,50% 50%,50% 100%,0 100%)',
      '013':'polygon(0 0,100% 0,100% 100%,50% 100%,50% 50%,0 50%)',
      '023':'polygon(0 0,50% 0,50% 50%,100% 50%,100% 100%,0 100%)',
      '123':'polygon(50% 0,100% 0,100% 100%,0 100%,0 50%,50% 50%)',
      '0123':'inset(0)'
    };
    return paths[key]||'inset(0)';
  }

  function createJoinedSurface(group, hiddenIds=new Set()) {
    if(group.ids.length<2||group.ids.some(id=>hiddenIds.has(id)))return null;
    const firstId=group.ids[0], firstCell=game.board.indexOf(firstId);
    if(firstCell<0)return null;
    const tile=game.tiles.get(firstId), p=idxToRC(firstCell), q=QUADRANTS[tile.quadrant];
    const originR=p.r-q.y, originC=p.c-q.x, m=gridMetrics();
    const quadrants=new Set(group.ids.map(id=>game.tiles.get(id).quadrant));
    const el=document.createElement('div');
    el.className='joined-surface';el.dataset.groupKey=group.key;
    el.style.left=`${originC*m.step}%`;el.style.top=`${originR*m.step}%`;
    el.style.width=`${m.cell*2}%`;el.style.height=`${m.cell*2}%`;
    el.style.backgroundImage=`url(\"${PICTURE_PATHS[group.imageIndex]}\")`;
    el.style.clipPath=quadrantClipPath(quadrants);
    el.style.webkitClipPath=quadrantClipPath(quadrants);
    el.style.zIndex=String(5+Math.max(0,group.minR));
    dom.tileLayer.appendChild(el);joinedSurfaceEls.set(group.key,el);
    group.ids.forEach(id=>tileEls.get(id)?.classList.add('is-surface-member'));
    return el;
  }

  function suspendJoinedSurface(group,active) {
    if(!group)return;
    group.ids.forEach(id=>tileEls.get(id)?.classList.toggle('surface-drag-raw',active));
    const surface=joinedSurfaceEls.get(group.key);
    if(surface)surface.classList.toggle('is-suspended',active);
  }

  function renderBoard(options = {}) {
    const hiddenIds = options.hiddenIds || new Set();
    const suppressJoinedSurfaces=!!options.suppressJoinedSurfaces;
    clearJoinedSurfaces();
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
    const indexById = new Map();
    game.board.forEach((id,index)=>{ if(id) indexById.set(id,index); });
    for (const [id, el] of tileEls) {
      el.classList.remove('is-surface-member','surface-drag-raw');
      if (!activeIds.has(id)) el.style.display='none';
    }
    activeIds.forEach((id) => ensureTileElement(game.tiles.get(id)));
    for (const id of activeIds) {
      const el = tileEls.get(id);
      const index=indexById.get(id);
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
      el.classList.toggle('is-joined', join.left||join.right||join.up||join.down);
    }
    if(!suppressJoinedSurfaces) game.groups.filter(g=>g.ids.length>1).forEach(g=>createJoinedSurface(g,hiddenIds));
    updateDeckVisuals(); updateHud();
  }'''
s=s[:rstart]+render+s[rend:]

# Suspend the seamless surface during an actual drag so the moving DOM pieces are visible.
s=s.replace("    game.drag=drag; game.phase='dragging';", "    suspendJoinedSurface(joined,true);\n    game.drag=drag; game.phase='dragging';",1)
s=s.replace("      game.phase='idle'; return;", "      suspendJoinedSurface(drag.wholeGroup,false);\n      game.phase='idle'; return;",1)
# Invalid-drop path restores surface.
marker="      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';}});\n      game.phase='idle';"
s=s.replace(marker,"      drag.wholeGroup.ids.forEach((id)=>{const el=tileEls.get(id);if(el){el.style.transition='';el.style.transform='';}});\n      suspendJoinedSurface(drag.wholeGroup,false);\n      game.phase='idle';",1)

# 2) Soft gravity. Correct joins are a drag affordance, not an unbreakable physics rigid body.
# A tile falls if the cell below is empty or is itself falling. Thus horizontal/L joins
# stay together when equally supported, but naturally fracture when only one side is blocked.
gstart=s.index('  function gravityStep(board) {')
gend=s.index('\n  function settleGroupsRigid',gstart)
gravity=r'''  function gravityStep(board) {
    const movable=new Set();
    let changed=true;
    while(changed){
      changed=false;
      for(let r=GRID-2;r>=0;r--){
        for(let c=0;c<GRID;c++){
          const cell=rcToIdx(r,c), id=board[cell];
          if(!id||movable.has(id))continue;
          const below=board[cell+GRID];
          if(!below||movable.has(below)){movable.add(id);changed=true;}
        }
      }
    }
    if(!movable.size)return{moved:false,board:board.slice(),ids:[]};
    const next=board.slice(), entries=[];
    for(let r=GRID-1;r>=0;r--)for(let c=0;c<GRID;c++){
      const cell=rcToIdx(r,c),id=board[cell];if(id&&movable.has(id))entries.push([cell,id]);
    }
    entries.forEach(([cell])=>{next[cell]=null;});
    entries.forEach(([cell,id])=>{next[cell+GRID]=id;});
    return{moved:true,board:next,ids:entries.map(([,id])=>id)};
  }
'''
s=s[:gstart]+gravity+s[gend:]

# Compute the complete fall in memory, then one DOM render + one FLIP animation.
astart=s.index('  async function applyGravity() {')
aend=s.index('\n\n  async function dealIntoBoard()',astart)
apply=r'''  async function applyGravity() {
    let next=game.board.slice(),waves=0;
    const dropCount=new Map();
    while(waves<GRID*GRID*2){
      const step=gravityStep(next);if(!step.moved)break;
      step.ids.forEach(id=>dropCount.set(id,(dropCount.get(id)||0)+1));
      next=step.board;waves++;
    }
    if(!waves)return false;
    const first=captureTileRects();
    game.board=next;
    renderBoard({suppressJoinedSurfaces:true});
    const maxDrop=Math.max(...dropCount.values(),1);
    const duration=Math.min(430,Math.max(170,145+maxDrop*62));
    await animateFlipFromRects(first,duration);
    renderBoard();
    dropCount.forEach((_,id)=>tileEls.get(id)?.classList.add('land-pop'));
    audio.deal();haptic(Math.min(30,8+maxDrop*4));
    await delay(82);
    dropCount.forEach((_,id)=>tileEls.get(id)?.classList.remove('land-pop'));
    game.groups=computeGroups();game.connections=computeConnections();
    return true;
  }'''
s=s[:astart]+apply+s[aend:]

# Move/swap also uses raw tiles during FLIP, then restores a single joined surface.
old="game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard(); updateHud();\n    await animateFlipFromRects(firstRects,235);"
new="game.board=validation.board; game.moves++; game.movesSinceClear=(game.movesSinceClear||0)+1; renderBoard({suppressJoinedSurfaces:true}); updateHud();\n    await animateFlipFromRects(firstRects,215);\n    renderBoard();"
if old not in s: raise SystemExit('commitMove animation marker missing')
s=s.replace(old,new,1)

# Remove synchronous forced layout from FLIP; settle styles across animation frames instead.
old="""    // Force style flush.\n    void dom.board.offsetWidth;\n    requestAnimationFrame(() => moving.forEach((el) => {\n      el.style.transition = `transform ${duration}ms cubic-bezier(.22,.88,.28,1)`;\n      el.style.transform = 'none';\n    }));"""
new="""    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));\n    moving.forEach((el) => {\n      el.style.transition = `transform ${duration}ms cubic-bezier(.22,.88,.28,1)`;\n      el.style.transform = 'none';\n    });"""
if old not in s: raise SystemExit('FLIP forced-layout marker missing')
s=s.replace(old,new,1)

GAME.write_text(s,encoding='utf-8')

# 3) Visual surface: one original image per connected group means there is literally no
# internal raster boundary. Tile DOMs are transparent hit/border shells while idle.
css=CSS.read_text(encoding='utf-8')
css += r'''

/* v3.6-single-surface-joins */
.joined-surface{position:absolute;pointer-events:none;background-size:100% 100%;background-position:center;background-repeat:no-repeat;transform:translateZ(0);backface-visibility:hidden;-webkit-backface-visibility:hidden}
.joined-surface.is-suspended{opacity:0}
.tile.is-surface-member{background-image:none!important;box-shadow:none!important}
.tile.is-surface-member::after{display:none!important}
.tile.is-surface-member.surface-drag-raw{background-image:var(--piece-image)!important}
.tile.is-surface-member.surface-drag-raw::after{display:block!important}
/* Explicit input contract stays intact. */
.cell-layer,.fx-layer{pointer-events:none!important}.tile-layer{pointer-events:none!important}.tile{pointer-events:auto!important;touch-action:none!important}
'''
CSS.write_text(css,encoding='utf-8')

# Strong cache bust, because stale iOS service-worker assets previously masked visual fixes.
idx=INDEX.read_text(encoding='utf-8').replace('3.5.1','3.6.0')
INDEX.write_text(idx,encoding='utf-8')
sw=SW.read_text(encoding='utf-8').replace('3.5.1','3.6.0')
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('3.6.0\n',encoding='utf-8')
print('patched v3.6 soft gravity, seamless joined surfaces, one-pass fall')
