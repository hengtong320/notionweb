#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932')
opts.add_argument('--force-device-scale-factor=1')
d=webdriver.Chrome(options=opts)
d.set_script_timeout(75)
wait=WebDriverWait(d,55)

try:
    d.get('http://127.0.0.1:8765/?mode=blessing&level=1&v=4.2.0')
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.version==='4.2.0' && window.__JIGSAW__.game.phase==='idle'"))

    meta=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game,packs=J.blessingPacks;
      const firstThree=new Set(packs.slice(0,3).flatMap(p=>p.images));
      return {
        version:J.version,realistic:J.realisticBlessingCount,packCounts:packs.map(p=>p.images.length),packGrids:packs.map(p=>p.grid),
        uniqueFirstThree:firstThree.size,allFirstThree:packs.slice(0,3).flatMap(p=>p.images).length,
        helicopter:packs[2].images.every(i=>J.blessingMeta(i).path.includes('heli-')),
        total:g.totalImages,grid:g.board.length,deck:g.decks.flat().length,stagePack:document.getElementById('gameStage').dataset.blessingPack,
        entry:document.getElementById('blessingBtn').innerText,packModal:!!document.getElementById('blessingPackModal')
      };
    ''')
    assert meta['version']=='4.2.0' and meta['realistic']==18,meta
    assert meta['packCounts']==[4,8,6,8] and meta['packGrids']==[4,5,5,5],meta
    assert meta['uniqueFirstThree']==18 and meta['allFirstThree']==18 and meta['helicopter'],meta
    assert meta['total']==4 and meta['grid']==16 and meta['deck']==0 and meta['stagePack']=='1',meta
    assert '一局拼多张' in meta['entry'] and meta['packModal'],meta

    loaded=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,items=J.blessingPacks.slice(0,3).flatMap(p=>p.images).map(i=>J.blessingMeta(i).path);
      Promise.all(items.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve({ok:true,w:im.naturalWidth,h:im.naturalHeight,src});im.onerror=()=>resolve({ok:false,src});im.src=src;}))).then(done);
    ''')
    assert len(loaded)==18 and all(x['ok'] and x['w']>700 and x['h']>900 for x in loaded),loaded

    first=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,m=J.findHelpfulMove();
      if(!m){done({error:'no move'});return;}
      J.commitMove(m.group,m.dr,m.dc,m.board,true).then(()=>setTimeout(()=>done({
        moves:g.moves,cleared:g.clearedCount,phase:g.phase,modal:document.getElementById('blessingModal').classList.contains('is-visible'),albums:(JSON.parse(localStorage.getItem('jigsaw-drop-h5-v2')||'{}').albums||[]).length
      }),120)).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in first and first['moves']==1 and first['cleared']>=1,first
    assert not first['modal'] and first['albums']==0,first

    d.execute_async_script("const done=arguments[0];window.__JIGSAW__.startLevel(1).then(()=>done(true)).catch(e=>done(String(e)))")
    wait.until(lambda x:x.execute_script("return window.__JIGSAW__.game.phase==='idle'"))
    d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,anchors=[[0,0],[0,2],[2,0],[2,2]];
      const board=Array(16).fill(null);
      g.selectedImages.forEach((imageIndex,k)=>{
        const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===imageIndex)ids[t.quadrant]=t.id;
        const [r,c]=anchors[k];board[r*4+c]=ids[0];board[r*4+c+1]=ids[1];board[(r+1)*4+c]=ids[2];board[(r+1)*4+c+1]=ids[3];
      });
      g.board=board;g.decks=Array.from({length:4},()=>[]);g.clearedCount=0;g.clearedImages=[];g.totalImages=4;g.phase='idle';g.autoRewardShown=true;J.renderBoard();
      J.resolveBoard(new Set(),false).then(()=>done(true)).catch(e=>done(String(e)));
    ''')
    album=wait.until(lambda x:x.execute_script('''
      const J=window.__JIGSAW__,g=J.game,p=document.getElementById('blessingPreview'),stored=JSON.parse(localStorage.getItem('jigsaw-drop-h5-v2')||'{}');
      if(!g.shareAlbum||p.naturalWidth<1)return null;
      return {phase:g.phase,count:g.shareAlbum.images.length,pack:g.shareAlbum.packId,modal:document.getElementById('blessingModal').classList.contains('is-visible'),albums:(stored.albums||[]).length,continueVisible:!document.getElementById('blessingContinueBtn').hidden,previewWidth:p.naturalWidth};
    '''))
    assert album['phase']=='won' and album['count']==4 and album['pack']==1 and album['modal'],album
    assert album['albums']>=1 and album['continueVisible'] and album['previewWidth']>0,album

    canvas=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__;J.renderBlessingAlbum(J.game.shareAlbum).then(c=>done({w:c.width,h:c.height,scheme:c.dataset.scheme,count:c.dataset.imageCount,pack:c.dataset.packId,url:c.toDataURL('image/png').slice(0,30)})).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in canvas and canvas['w']==1080 and canvas['h']==1440,canvas
    assert canvas['scheme']=='album-v42' and canvas['count']=='4' and canvas['pack']=='1' and canvas['url'].startswith('data:image/png'),canvas

    # The helicopter generator deliberately parks one chain feeder in the deck,
    # so the six-picture 5x5 pack has one trustworthy next-card preview.
    for pack_id, expected_count, expected_deck, expected_grid in [(2,8,7,25),(3,6,1,25),(4,8,7,25)]:
        result=d.execute_async_script('''
          const pack=arguments[0],done=arguments[1],J=window.__JIGSAW__;J.game.mode='blessing';J.startLevel(pack).then(()=>done({
            phase:J.game.phase,total:J.game.totalImages,deck:J.game.decks.flat().length,grid:J.game.board.length,
            selected:J.game.selectedImages.slice(),chain:J.game.generation.chainSeed?.depth||0,flow:J.game.flowEnergy,
            challenge:document.getElementById('gameStage').classList.contains('is-blessing-challenge'),
            hasDeck:document.getElementById('gameStage').classList.contains('has-blessing-deck')
          })).catch(e=>done({error:String(e)}));
        ''',pack_id)
        assert 'error' not in result and result['phase']=='idle',result
        assert result['total']==expected_count and result['deck']==expected_deck and result['grid']==expected_grid,result
        assert result['challenge'] and result['hasDeck']==(expected_deck>0),result
        if pack_id==3:
            heli=d.execute_script("const J=window.__JIGSAW__;return J.game.selectedImages.every(i=>J.blessingMeta(i).path.includes('heli-'));")
            assert heli,result
        if pack_id==4:
            assert result['chain']>=3 and result['flow']>=30,result

    classic=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__;J.game.mode='classic';J.startLevel(15).then(()=>done({phase:J.game.phase,total:J.game.totalImages,grid:J.game.board.length,pieces:J.game.board.filter(Boolean).length+J.game.decks.flat().length})).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in classic and classic['phase']=='idle',classic
    assert classic['total']==9 and classic['grid']==25 and classic['pieces']==36,classic

    print('PASS v4.2 multi-image albums, 18 real photos, helicopter hard pack, expert flow pack and classic rebalance')
finally:
    d.quit()
