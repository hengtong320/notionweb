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
d.set_script_timeout(60)
wait=WebDriverWait(d,45)

try:
    d.get('http://127.0.0.1:8765/?mode=blessing&level=1&v=4.1.0')
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.version==='4.1.0' && window.__JIGSAW__.game.phase==='idle'"))

    initial=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      const move=J.findHelpfulMove();
      return {
        version:J.version,mode:g.mode,level:g.level,pack:g.blessingPack,
        selected:g.selectedImages.slice(),total:g.totalImages,occupied:g.board.filter(Boolean).length,
        deck:g.decks.flat().length,workTotal:document.getElementById('workBadgeTotal')?.textContent,
        move:move?{dr:move.dr,dc:move.dc,size:move.group.ids.length,imageIndex:move.imageIndex}:null,
        board:g.board.slice(),
        cleanOverlay:document.querySelectorAll('.blessing-lockup').length===0,
        entry:document.getElementById('blessingBtn').innerText
      };
    ''')
    assert initial['version']=='4.1.0',initial
    assert initial['mode']=='blessing' and initial['level']==1 and initial['pack']==1,initial
    assert len(initial['selected'])==2 and initial['total']==2 and initial['occupied']==8 and initial['deck']==0,initial
    assert initial['workTotal']=='2' and initial['move'] and initial['move']['size']>=1,initial
    assert initial['cleanOverlay'] and '方案B' not in initial['entry'] and '今日祝福' in initial['entry'],initial

    d.execute_script('''
      const J=window.__JIGSAW__,m=J.findHelpfulMove();
      window.__v41Done=false;window.__v41Result=null;
      J.commitMove(m.group,m.dr,m.dc,m.board,true).then(v=>{window.__v41Done=true;window.__v41Result=v;});
    ''')
    wait.until(lambda x:x.execute_script("return window.__JIGSAW__.game.rewardPending && document.getElementById('blessingModal').classList.contains('is-visible')"))
    reward=wait.until(lambda x:x.execute_script('''
      const g=window.__JIGSAW__.game,p=document.getElementById('blessingPreview');
      return p.naturalWidth>0?{
        pending:g.rewardPending,cleared:g.clearedCount,moves:g.moves,
        previewWidth:p.naturalWidth,continueVisible:!document.getElementById('blessingContinueBtn').hidden,
        message:document.getElementById('blessingMessage').textContent
      }:null;
    '''))
    assert reward['pending'] and reward['cleared']==1 and reward['moves']==1, reward
    assert reward['previewWidth']>0 and reward['continueVisible'] and reward['message'],reward

    d.execute_script("document.getElementById('blessingContinueBtn').click()")
    wait.until(lambda x:x.execute_script("return window.__v41Done===true && window.__JIGSAW__.game.phase==='idle'"))
    after_move=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      return {ok:window.__v41Result,undo:!!g.undoSnapshot,moves:g.moves,cleared:g.clearedCount,board:g.board.slice(),telemetry:(JSON.parse(localStorage.getItem('jigsaw-drop-h5-v2')||'{}').telemetry||[]).map(e=>e.name)};
    ''')
    assert after_move['ok'] and after_move['undo'] and after_move['moves']==1 and after_move['cleared']==1,after_move
    assert 'blessing_first_reward' in after_move['telemetry'] and 'move_committed' in after_move['telemetry'],after_move

    undone=d.execute_script('''
      const J=window.__JIGSAW__,ok=J.undoLastMove(),g=J.game;
      const stored=JSON.parse(localStorage.getItem('jigsaw-drop-h5-v2')||'{}');
      return {ok,moves:g.moves,cleared:g.clearedCount,board:g.board.slice(),undo:!!g.undoSnapshot,blessings:stored.blessings||[]};
    ''')
    assert undone['ok'] and undone['moves']==0 and undone['cleared']==0 and not undone['undo'],undone
    assert undone['board']==initial['board'],(undone,initial)

    hint_before=d.execute_script("const g=window.__JIGSAW__.game;return JSON.stringify([g.board,g.decks]);")
    d.execute_async_script('''
      const done=arguments[0];window.__JIGSAW__.useHint();setTimeout(done,180);
    ''')
    hint=d.execute_script('''
      const g=window.__JIGSAW__.game;
      return {hash:JSON.stringify([g.board,g.decks]),preview:!!document.querySelector('.hint-picture-preview'),ghost:!!document.querySelector('.hint-image-ghost'),label:!!document.querySelector('.hint-action-label')};
    ''')
    assert hint['hash']==hint_before and hint['preview'] and hint['ghost'] and hint['label'],hint

    packs=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;g.mode='blessing';
      const packs=[1,2,3].map(n=>J.selectedImagesForLevel(n,2));
      g.mode='classic';
      return {packs,distinct:new Set(packs.flat()).size,level15:J.imageCountForLevel(15),prime:J.primeDecksForPlayableFrontier()};
    ''')
    assert all(len(p)==2 for p in packs['packs']) and packs['distinct']==6,packs
    assert packs['level15']==9 and packs['prime'] is False,packs

    gravity=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;g.mode='blessing';
      const ids=Array.from(g.tiles.values()).filter(t=>t.imageIndex===g.selectedImages[0]).sort((a,b)=>a.quadrant-b.quadrant).map(t=>t.id);
      const other=Array.from(g.tiles.values()).find(t=>t.imageIndex!==g.selectedImages[0]).id;
      let b=Array(16).fill(null);b[4]=ids[0];b[5]=ids[1];
      const rigid=J.gravityStep(b);
      b=Array(16).fill(null);b[8]=ids[0];b[9]=ids[1];b[13]=other;
      const fracture=J.gravityStep(b);
      return {
        rigidMoved:rigid.moved,rigidAt:[rigid.board[8],rigid.board[9]],
        fractureMoved:fracture.moved,fractureAt:[fracture.board[12],fracture.board[9],fracture.board[13]],ids,other
      };
    ''')
    assert gravity['rigidMoved'] and gravity['rigidAt']==gravity['ids'][:2],gravity
    assert gravity['fractureMoved'] and gravity['fractureAt'][0]==gravity['ids'][0] and gravity['fractureAt'][1]==gravity['ids'][1] and gravity['fractureAt'][2]==gravity['other'],gravity

    d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__;J.game.mode='classic';J.startLevel(15).then(()=>done(true)).catch(e=>done(String(e)));
    ''')
    wait.until(lambda x:x.execute_script("return window.__JIGSAW__.game.phase==='idle'"))
    level15=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      return {grid:g.board.length,total:g.totalImages,pieces:g.board.filter(Boolean).length+g.decks.flat().length,selected:g.selectedImages.length};
    ''')
    assert level15['grid']==25 and level15['total']==9 and level15['selected']==9 and level15['pieces']==36,level15

    deadlock_setup=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game,counts=new Map(),chosen=[],rest=[];
      for(const tile of g.tiles.values()){
        const n=counts.get(tile.imageIndex)||0;
        if(n<3&&chosen.length<25){chosen.push(tile.id);counts.set(tile.imageIndex,n+1);}else rest.push(tile.id);
      }
      if(chosen.length<25){for(const id of rest.splice(0,25-chosen.length))chosen.push(id);}
      const chosenSet=new Set(chosen);const hidden=Array.from(g.tiles.keys()).filter(id=>!chosenSet.has(id));
      g.board=chosen.slice(0,25);g.decks=Array.from({length:5},()=>[]);hidden.forEach((id,i)=>g.decks[i%5].push(id));
      g.needsRescue=false;g.phase='idle';J.renderBoard();
      const hash=JSON.stringify([g.board,g.decks]);
      return {hash,visible:J.visibleCompletionImage(),deck:g.decks.flat().length,board:g.board.length};
    ''')
    assert deadlock_setup['visible'] is None and deadlock_setup['deck']>0 and deadlock_setup['board']==25,deadlock_setup

    resolved=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game;
      J.resolveBoard(new Set(J.computeConnections()),false).then(()=>done({needs:g.needsRescue,hash:JSON.stringify([g.board,g.decks]),phase:g.phase})).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in resolved and resolved['needs'] and resolved['phase']=='idle',resolved
    assert resolved['hash']==deadlock_setup['hash'],resolved

    d.execute_async_script('''
      const done=arguments[0];window.__JIGSAW__.useHint();setTimeout(done,120);
    ''')
    hint_deadlock=d.execute_script("const g=window.__JIGSAW__.game;return {hash:JSON.stringify([g.board,g.decks]),needs:g.needsRescue};")
    assert hint_deadlock['hash']==deadlock_setup['hash'] and hint_deadlock['needs'],hint_deadlock

    rescued=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,before=g.autoCount;
      J.useAuto();setTimeout(()=>done({needs:g.needsRescue,hash:JSON.stringify([g.board,g.decks]),auto:g.autoCount,before}),700);
    ''')
    assert not rescued['needs'] and rescued['hash']!=deadlock_setup['hash'] and rescued['auto']==rescued['before'],rescued

    telemetry=d.execute_script('''
      const stored=JSON.parse(localStorage.getItem('jigsaw-drop-h5-v2')||'{}');
      const names=(stored.telemetry||[]).map(e=>e.name);
      return {schema:stored.schemaVersion,names,count:names.length};
    ''')
    assert telemetry['schema']==4 and telemetry['count']>5,telemetry
    assert 'deadlock_detected' in telemetry['names'] and 'explicit_rescue' in telemetry['names'] and 'undo_used' in telemetry['names'],telemetry

    print('PASS v4.1 blessing first reward, three packs, explicit rescue, support-aware gravity, undo, hints, telemetry and 5x5 rebalance')
finally:
    d.quit()
