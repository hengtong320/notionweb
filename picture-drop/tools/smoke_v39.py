#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new');opts.add_argument('--no-sandbox');opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932');opts.add_argument('--force-device-scale-factor=1')
d=webdriver.Chrome(options=opts)
d.set_script_timeout(30)
try:
    d.get('http://127.0.0.1:8765/?mode=blessing&level=1&v=3.9.0')
    wait=WebDriverWait(d,25)
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))
    state=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      return {
        mode:g.mode, selected:g.selectedImages.slice(), selectedCount:g.selectedImages.length,
        blessingCount:J.blessingCount, standard:J.standardPictureCount, total:J.pictureCount,
        allBlessing:g.selectedImages.every(J.isBlessingIndex),
        workHidden:document.getElementById('workBadge').hidden,
        button:!!document.getElementById('blessingBtn'), modal:!!document.getElementById('blessingModal')
      };
    ''')
    assert state['mode']=='blessing',state
    assert state['selectedCount']==6 and state['allBlessing'],state
    assert state['blessingCount']==12 and state['standard']==60 and state['total']>=72,state
    assert state['workHidden'] is False and state['button'] and state['modal'],state

    assets=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,ids=[];
      for(let i=J.standardPictureCount;i<J.standardPictureCount+J.blessingCount;i++)ids.push(J.blessingMeta(i).path);
      Promise.all(ids.map(src=>fetch(src).then(r=>r.ok))).then(v=>done(v)).catch(()=>done([]));
    ''')
    assert len(assets)==12 and all(assets),assets

    poster=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,idx=J.game.selectedImages[0];
      J.renderBlessingPoster(idx).then(c=>{
        const p=c.getContext('2d').getImageData(540,720,1,1).data;
        done({w:c.width,h:c.height,alpha:p[3],meta:J.blessingMeta(idx)});
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in poster,poster
    assert poster['w']==1080 and poster['h']==1440 and poster['alpha']>0,poster

    # Complete one blessing image through the real resolver. It must be persisted,
    # appear in the work counter and open in the share modal.
    result=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,idx=g.selectedImages[0];
      const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===idx)ids[t.quadrant]=t.id;
      g.decks=Array.from({length:4},()=>[]);g.board=Array(16).fill(null);
      [9,10,13,14].forEach((cell,q)=>g.board[cell]=ids[q]);g.totalImages=1;g.clearedCount=0;g.clearedImages=[];g.phase='idle';
      J.renderBoard();J.resolveBoard(new Set(),false).then(()=>{
        J.openBlessingWorks(idx);
        setTimeout(()=>done({
          won:g.phase==='won',modal:document.getElementById('blessingModal').classList.contains('is-visible'),
          preview:document.getElementById('blessingPreview').src.startsWith('data:image/jpeg'),
          count:Number(document.getElementById('workBadgeCount').textContent||0),
          stored:Object.values(localStorage).some(v=>{try{return JSON.parse(v).blessings?.includes(idx)}catch(e){return false}})
        }),800);
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in result,result
    assert result['won'] and result['modal'] and result['preview'] and result['count']>=1 and result['stored'],result

    classic=d.execute_script('''
      const J=window.__JIGSAW__;J.game.mode='classic';const s=J.selectedImagesForLevel(1,5);return {s,ok:s.every(i=>i<J.standardPictureCount)};
    ''')
    assert classic['ok'],classic
    print('PASS blessing mode, 12 original cards, poster rendering, persistence and share modal')
finally:
    d.quit()
