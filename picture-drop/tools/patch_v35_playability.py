from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; CSS=ROOT/'style.css'; INDEX=ROOT/'index.html'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

# ---------- 1) Guaranteed visible completion frontier ----------
# Replace the weak v3.4 board-only rescue with a stronger invariant: whenever play
# would otherwise return idle without a fully visible 4-piece image, swap missing
# quarters from hidden decks with low-value board tiles. Total tile/deck counts stay
# exactly unchanged, but the user always has at least one image that can be finished.
start=s.index('  function buildRescueBoard() {')
end=s.index('  async function resolveBoard', start)
helpers=r'''  function imageIdsByQuadrant(imageIndex) {
    const ids=Array(4).fill(null);
    for(const tile of game.tiles.values()) if(tile.imageIndex===imageIndex) ids[tile.quadrant]=tile.id;
    return ids;
  }

  function visibleImageState(board=game.board) {
    const map=new Map();
    board.forEach((id,index)=>{
      if(!id)return;
      const tile=game.tiles.get(id); if(!tile)return;
      let state=map.get(tile.imageIndex);
      if(!state){state={imageIndex:tile.imageIndex,ids:[],cells:[],quadrants:new Set()};map.set(tile.imageIndex,state);}
      state.ids.push(id);state.cells.push(index);state.quadrants.add(tile.quadrant);
    });
    return map;
  }

  function visibleCompletionImage(board=game.board) {
    for(const state of visibleImageState(board).values()) if(state.quadrants.size===4) return state.imageIndex;
    return null;
  }

  function locateDeckTile(id) {
    for(let c=0;c<game.decks.length;c++){
      const pos=game.decks[c].indexOf(id);
      if(pos>=0)return{col:c,pos};
    }
    return null;
  }

  function chooseFrontierCandidate(maxMissing=4) {
    const states=visibleImageState();
    const candidates=[];
    const imageIndices=[...new Set([...game.tiles.values()].map(t=>t.imageIndex))];
    for(const imageIndex of imageIndices){
      const ids=imageIdsByQuadrant(imageIndex);
      if(ids.some(id=>!id))continue;
      const visible=states.get(imageIndex)?.quadrants.size||0;
      const missing=ids.filter(id=>!game.board.includes(id));
      if(missing.length===0||missing.length>maxMissing)continue;
      if(missing.some(id=>!locateDeckTile(id)))continue;
      candidates.push({imageIndex,ids,visible,missing});
    }
    candidates.sort((a,b)=>b.visible-a.visible||a.missing.length-b.missing.length||a.imageIndex-b.imageIndex);
    return candidates[0]||null;
  }

  function ensureVisibleCompletionSet() {
    const already=visibleCompletionImage();
    if(already!==null)return{changed:false,imageIndex:already,changedIds:[]};
    const candidate=chooseFrontierCandidate(4);
    if(!candidate)return{changed:false,imageIndex:null,changedIds:[]};

    const groups=computeGroups();
    const protectedIds=new Set(candidate.ids.filter(id=>game.board.includes(id)));
    const replaceable=[];
    for(let cell=0;cell<CELL_COUNT;cell++){
      const id=game.board[cell]; if(!id||protectedIds.has(id))continue;
      const group=groupAtCell(cell,groups);
      const tile=game.tiles.get(id);
      // Prefer unrelated singletons, then small groups, and avoid tearing another
      // nearly-complete image apart unless there is no other choice.
      const sameCount=visibleImageState().get(tile?.imageIndex)?.quadrants.size||0;
      const score=(group?.ids.length||1)*100+sameCount*12+idxToRC(cell).r;
      replaceable.push({cell,score});
    }
    replaceable.sort((a,b)=>a.score-b.score||a.cell-b.cell);
    if(replaceable.length<candidate.missing.length)return{changed:false,imageIndex:null,changedIds:[]};

    const changedIds=[];
    for(const missingId of candidate.missing){
      const loc=locateDeckTile(missingId); if(!loc)continue;
      const target=replaceable.shift().cell;
      const displaced=game.board[target];
      game.board[target]=missingId;
      game.decks[loc.col][loc.pos]=displaced;
      changedIds.push(missingId);
    }
    return{changed:changedIds.length>0,imageIndex:candidate.imageIndex,changedIds};
  }

  function primeDecksForPlayableFrontier() {
    if(visibleCompletionImage()!==null)return false;
    const slots=[];
    for(let c=0;c<GRID;c++){
      let capacity=0;
      for(let r=0;r<GRID;r++){
        const index=rcToIdx(r,c);
        if(game.board[index])break;
        capacity++;
      }
      for(let i=0;i<capacity;i++)slots.push(c);
    }
    if(!slots.length)return false;
    const candidate=chooseFrontierCandidate(slots.length);
    if(!candidate)return false;
    const usedByColumn=Array(GRID).fill(0);
    for(let i=0;i<candidate.missing.length;i++){
      const id=candidate.missing[i], targetCol=slots[i];
      const targetPos=usedByColumn[targetCol]++;
      const loc=locateDeckTile(id); if(!loc)continue;
      const targetId=game.decks[targetCol][targetPos];
      if(loc.col===targetCol&&loc.pos===targetPos)continue;
      game.decks[loc.col][loc.pos]=targetId;
      game.decks[targetCol][targetPos]=id;
    }
    return true;
  }

  async function ensurePlayableFrontier(announce=true) {
    if(visibleCompletionImage()!==null)return false;
    const result=ensureVisibleCompletionSet();
    if(!result.changed)return false;
    renderBoard();
    result.changedIds.forEach(id=>tileEls.get(id)?.classList.add('frontier-in'));
    await delay(260);
    result.changedIds.forEach(id=>tileEls.get(id)?.classList.remove('frontier-in'));
    game.movesSinceClear=0;
    if(announce)showToast('已整理出可解图片',850);
    haptic(10);
    return true;
  }

  async function rescueIfStalled() {
    return ensurePlayableFrontier(true);
  }

'''
s=s[:start]+helpers+s[end:]

# Prime hidden decks before normal per-column dealing, so missing quarters are dealt
# naturally into newly opened cells rather than visibly teleporting later.
s=s.replace('  async function dealIntoBoard() {\n    const dealt=[];', '  async function dealIntoBoard() {\n    primeDecksForPlayableFrontier();\n    const dealt=[];',1)

# Guarantee the initial board is playable before the first reveal.
needle='    game.selectedImages=generated.selected;game.totalImages=generated.imageCount;'
s=s.replace(needle, needle+'\n    ensureVisibleCompletionSet();',1)

# ---------- 2) Target-oriented hint system ----------
fh_start=s.index('  function findHelpfulMove() {')
fh_end=s.index('  function markHint(move) {', fh_start)
new_hint=r'''  function countImageConnections(board,imageIndex) {
    let count=0;
    for(const edge of computeConnections(board,game.tiles)){
      const id=edge.split('|')[0];
      if(game.tiles.get(id)?.imageIndex===imageIndex)count++;
    }
    return count;
  }

  function findHelpfulMove() {
    const states=visibleImageState();
    const ready=[...states.values()].filter(s=>s.quadrants.size===4);
    if(!ready.length)return null;
    const groups=computeGroups();
    let best=null;

    // Prioritize images that already have the largest correctly joined component.
    ready.sort((a,b)=>{
      const ag=Math.max(...groups.filter(g=>g.imageIndex===a.imageIndex).map(g=>g.ids.length),1);
      const bg=Math.max(...groups.filter(g=>g.imageIndex===b.imageIndex).map(g=>g.ids.length),1);
      return bg-ag||b.ids.length-a.ids.length;
    });

    for(const state of ready){
      const imageIndex=state.imageIndex;
      const ids=imageIdsByQuadrant(imageIndex);
      const sources=[];
      for(const group of groups.filter(g=>g.imageIndex===imageIndex)){
        sources.push({group,splitMode:false});
        if(group.ids.length>1){
          for(const id of group.ids){
            const cell=game.board.indexOf(id),p=idxToRC(cell),tile=game.tiles.get(id);
            sources.push({group:{ids:[id],cells:[cell],imageIndex,minR:p.r,maxR:p.r,minC:p.c,maxC:p.c,complete:false},splitMode:true,tile});
          }
        }
      }

      for(let ar=0;ar<GRID-1;ar++)for(let ac=0;ac<GRID-1;ac++){
        const anchorCells=[rcToIdx(ar,ac),rcToIdx(ar,ac+1),rcToIdx(ar+1,ac),rcToIdx(ar+1,ac+1)];
        for(const source of sources){
          const firstId=source.group.ids[0];
          const tile=game.tiles.get(firstId); if(!tile)continue;
          const current=game.board.indexOf(firstId); if(current<0)continue;
          const cur=idxToRC(current),q=QUADRANTS[tile.quadrant];
          const tr=ar+q.y,tc=ac+q.x,dr=tr-cur.r,dc=tc-cur.c;
          if(!dr&&!dc)continue;
          const result=validateMove(source.group,dr,dc); if(!result.valid)continue;
          let placed=0;
          for(let qq=0;qq<4;qq++)if(result.board[anchorCells[qq]]===ids[qq])placed++;
          const complete=findCompleteGroups(result.board,game.tiles).some(g=>g.imageIndex===imageIndex);
          const connections=countImageConnections(result.board,imageIndex);
          const score=(complete?100000:0)+placed*3000+connections*650+source.group.ids.length*80-(source.splitMode?35:0)-(abs(dr)+abs(dc))*2;
          if(!best||score>best.score){
            best={group:source.group,dr,dc,board:result.board,score,splitMode:source.splitMode,imageIndex,targetAnchor:{r:ar,c:ac,cells:anchorCells}};
          }
        }
      }
    }
    return best;
  }
'''.replace('abs(dr)+abs(dc)','Math.abs(dr)+Math.abs(dc)')
s=s[:fh_start]+new_hint+'\n'+s[fh_end:]

# Replace markHint to show both the exact move and the intended final 2x2 destination.
m_start=s.index('  function markHint(move) {')
m_end=s.index('  function drawHintArrow',m_start)
mark=r'''  function markHint(move) {
    clearHintMarks();
    const targetCells=move.group.cells.map((i)=>{const {r,c}=idxToRC(i);return rcToIdx(r+move.dr,c+move.dc);});
    move.group.ids.forEach(id=>tileEls.get(id)?.classList.add('is-hint-source'));
    game.board.forEach(id=>{if(id&&game.tiles.get(id)?.imageIndex===move.imageIndex)tileEls.get(id)?.classList.add('is-hint-family');});
    targetCells.forEach(cell=>{
      cellEls[cell]?.classList.add('is-target');
      const id=game.board[cell];if(id)tileEls.get(id)?.classList.add('is-hint-target');
    });
    if(move.targetAnchor){
      const frame=document.createElement('div');frame.className='hint-target-frame';
      const g=cellRectPercentByRC(move.targetAnchor.r,move.targetAnchor.c);
      frame.style.left=`${g.left}%`;frame.style.top=`${g.top}%`;
      frame.style.width=`${g.width*2}%`;frame.style.height=`${g.height*2}%`;
      dom.fxLayer.appendChild(frame);
    }
    drawHintArrow(move.group.cells,targetCells);
    game.hintTimer=window.setTimeout(clearHintMarks,3000);
  }

'''
s=s[:m_start]+mark+s[m_end:]

# Clear the added target frame/family pulse as well.
s=s.replace("tileEls.forEach((el)=>el.classList.remove('is-hint-source','is-hint-target'));", "tileEls.forEach((el)=>el.classList.remove('is-hint-source','is-hint-target','is-hint-family'));",1)
s=s.replace("dom.fxLayer.querySelectorAll('.hint-arrow').forEach((el)=>el.remove());", "dom.fxLayer.querySelectorAll('.hint-arrow,.hint-target-frame').forEach((el)=>el.remove());",1)

# Hint/auto should first repair any impossible frontier for free, then point to an
# explicit completion-oriented move. A failed hint never consumes a charge.
uh_start=s.index('  async function useHint() {')
uh_end=s.index('  async function useAuto()',uh_start)
use_hint=r'''  async function useHint() {
    if(game.phase!=='idle')return;
    if(game.hintCount<=0){showToast('提示次数用完啦');audio.invalid();return;}
    let move=findHelpfulMove();
    if(!move&&remainingDeckCount()>0){
      game.phase='resolving';
      await ensurePlayableFrontier(false);
      game.phase='idle';
      move=findHelpfulMove();
    }
    if(!move){showToast('当前局面可继续交换，优先凑齐同一张图');audio.invalid();return;}
    game.hintCount--;updateHud();markHint(move);audio.merge();
    showToast(move.splitMode?'按住发光碎片后，拖到箭头位置':'拖动发光图片块到箭头位置',2400);
  }

'''
s=s[:uh_start]+use_hint+s[uh_end:]

ua_start=s.index('  async function useAuto() {')
ua_end=s.index('  function imageIdsByQuadrant',ua_start)
use_auto=r'''  async function useAuto() {
    if(game.phase!=='idle')return;
    if(game.autoCount<=0){showToast('自动整理次数用完啦');audio.invalid();return;}
    let move=findHelpfulMove();
    if(!move&&remainingDeckCount()>0){
      game.phase='resolving';await ensurePlayableFrontier(false);game.phase='idle';move=findHelpfulMove();
    }
    if(!move){showToast('暂时没有需要整理的位置');audio.invalid();return;}
    game.autoCount--;updateHud();markHint(move);game.phase='hinting';await delay(420);clearHintMarks();
    await commitMove(move.group,move.dr,move.dc,move.board,false);
  }

'''
s=s[:ua_start]+use_auto+s[ua_end:]

# Export playability helpers for regression/debugging.
s=s.replace('remainingDeckCount,finishLevel,goHome}', 'remainingDeckCount,finishLevel,goHome,visibleCompletionImage,ensureVisibleCompletionSet,primeDecksForPlayableFrontier}',1)
GAME.write_text(s,encoding='utf-8')

# ---------- 3) Truly seamless joins ----------
css=CSS.read_text(encoding='utf-8')
css += r'''

/* v3.5-true-seamless */
/* Background sampling must use the immutable border box. Otherwise removing an
   internal border changes the padding-box size and shifts the 200% image crop. */
.cell{border:0!important;background:transparent!important;box-shadow:none!important}
.tile{background-origin:border-box!important;background-clip:border-box!important;background-size:200% 200%!important;background-repeat:no-repeat!important}
.tile.is-joined{box-shadow:none!important;outline:0!important}
.tile.join-left{border-left-width:0!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important}
.tile.join-right{border-right-width:0!important;border-top-right-radius:0!important;border-bottom-right-radius:0!important}
.tile.join-up{border-top-width:0!important;border-top-left-radius:0!important;border-top-right-radius:0!important}
.tile.join-down{border-bottom-width:0!important;border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}
.frontier-in{animation:frontierIn .26s cubic-bezier(.2,.9,.25,1.2)}
@keyframes frontierIn{0%{opacity:.35;transform:scale(.92)}100%{opacity:1;transform:none}}
.is-hint-family{filter:brightness(1.08)!important}
.hint-target-frame{position:absolute;z-index:67;pointer-events:none;border:3px solid rgba(255,246,83,.96);border-radius:12px;box-shadow:0 0 0 2px rgba(255,255,255,.72),0 0 18px rgba(255,239,73,.82),inset 0 0 18px rgba(255,238,63,.12);animation:hintFramePulse .65s ease-in-out infinite alternate}
.hint-target-frame::after{content:'拼到这里';position:absolute;left:50%;top:-25px;transform:translateX(-50%);white-space:nowrap;padding:3px 9px;border-radius:10px;background:rgba(5,87,172,.9);font-size:10px;font-weight:900;color:#fff;box-shadow:0 2px 8px rgba(0,42,100,.25)}
@keyframes hintFramePulse{to{box-shadow:0 0 0 3px rgba(255,255,255,.9),0 0 25px rgba(255,239,73,.95),inset 0 0 24px rgba(255,238,63,.16)}}
'''
CSS.write_text(css,encoding='utf-8')

# ---------- 4) Bust the stale v3.1.1 service-worker cache ----------
html=INDEX.read_text(encoding='utf-8')
html=html.replace('href="style.css"','href="style.css?v=3.5.0"')
html=html.replace('src="game.js"','src="game.js?v=3.5.0"')
html=html.replace('href="manifest.webmanifest"','href="manifest.webmanifest?v=3.5.0"')
INDEX.write_text(html,encoding='utf-8')

SW.write_text(r'''const CACHE='jigsaw-drop-h5-v3.5.0';
const CORE=['./','./index.html','./style.css?v=3.5.0','./game.js?v=3.5.0','./manifest.webmanifest?v=3.5.0','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const fresh=/\.(?:html|js|css)$/.test(url.pathname)||event.request.mode==='navigate';
  if(fresh){
    event.respondWith(fetch(event.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return res;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return res;})));
});
''',encoding='utf-8')

# Fix the offline builder for portrait assets and cache-busted script/style URLs.
STANDALONE.write_text(r'''#!/usr/bin/env python3
from pathlib import Path
import base64,re
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text('utf-8');css=(ROOT/'style.css').read_text('utf-8');js=(ROOT/'game.js').read_text('utf-8')
for image_path in sorted((ROOT/'assets'/'pictures-portrait').glob('*.webp')):
    relative=f'assets/pictures-portrait/{image_path.name}'
    data_uri='data:image/webp;base64,'+base64.b64encode(image_path.read_bytes()).decode('ascii')
    js=js.replace(f"'{relative}'",f"'{data_uri}'")
html=re.sub(r'\s*<link rel="manifest"[^>]*>\n?','\n',html)
html=re.sub(r'  <link rel="stylesheet" href="style\.css[^\"]*" />',f'  <style>\n{css}\n  </style>',html)
html=re.sub(r'  <script src="game\.js[^\"]*"></script>',f'  <script>\n{js}\n  </script>',html)
out=ROOT/'Jigsaw-Drop-offline.html';out.write_text(html,'utf-8');print(f'Built {out} ({out.stat().st_size:,} bytes)')
''',encoding='utf-8')

VERSION.write_text('3.5.0\n',encoding='utf-8')
print('patched v3.5 playability + seamless joins + cache bust')
