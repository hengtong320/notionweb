#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new');opts.add_argument('--no-sandbox');opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932');opts.add_argument('--force-device-scale-factor=1')
d=webdriver.Chrome(options=opts)
d.set_script_timeout(40)
try:
    d.get('http://127.0.0.1:8765/?mode=blessing&level=1&v=4.0.0')
    wait=WebDriverWait(d,30)
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))
    state=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      const metas=g.selectedImages.map(i=>J.blessingMeta(i));
      return {
        mode:g.mode,selected:g.selectedImages.slice(),selectedCount:g.selectedImages.length,
        blessingCount:J.blessingCount,standard:J.standardPictureCount,total:J.totalPictureCount,
        scheme:J.blessingScheme,allReal:metas.every(m=>m&&m.path.includes('assets/blessings-real/')&&m.path.endsWith('.png')),
        button:document.getElementById('blessingBtn').innerText,
        title:document.querySelector('.level-title span').textContent,
        rawLockups:document.querySelectorAll('.blessing-lockup').length,
        worksVisible:!document.getElementById('workBadge').hidden
      };
    ''')
    assert state['mode']=='blessing',state
    assert state['selectedCount']==6 and state['blessingCount']==6,state
    assert state['standard']==60 and state['total']==66,state
    assert state['scheme']=='B-photorealistic' and state['allReal'],state
    assert '写实' in state['button'] and state['rawLockups']==0 and state['worksVisible'],state

    loaded=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,items=J.game.selectedImages.map(i=>J.blessingMeta(i).path);
      Promise.all(items.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve({ok:true,w:im.naturalWidth,h:im.naturalHeight,src});im.onerror=()=>resolve({ok:false,src});im.src=src;}))).then(done);
    ''')
    assert len(loaded)==6 and all(x['ok'] and x['w']==720 and x['h']==960 for x in loaded),loaded

    poster=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,idx=J.game.selectedImages[0];
      J.renderBlessingPoster(idx).then(c=>{
        const a=c.getContext('2d').getImageData(540,720,1,1).data;
        done({w:c.width,h:c.height,alpha:a[3],scheme:c.dataset.scheme,source:c.dataset.source,title:c.dataset.title,url:c.toDataURL('image/png').slice(0,30)});
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in poster,poster
    assert poster['w']==1080 and poster['h']==1440 and poster['alpha']>0,poster
    assert poster['scheme']=='B' and poster['source']=='photorealistic' and poster['url'].startswith('data:image/png'),poster

    result=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,idx=g.selectedImages[0];
      const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===idx)ids[t.quadrant]=t.id;
      g.decks=Array.from({length:4},()=>[]);g.board=Array(16).fill(null);
      [9,10,13,14].forEach((cell,q)=>g.board[cell]=ids[q]);g.totalImages=1;g.clearedCount=0;g.clearedImages=[];g.phase='idle';
      J.renderBoard();J.resolveBoard(new Set(),false).then(()=>{
        J.openBlessingWorks(idx);
        setTimeout(()=>{
          const preview=document.getElementById('blessingPreview'),src=preview.currentSrc||preview.src||'';
          done({
            won:g.phase==='won',modal:document.getElementById('blessingModal').classList.contains('is-visible'),
            preview:src.startsWith('data:image/')||src.startsWith('blob:'),previewWidth:preview.naturalWidth,
            count:Number(document.getElementById('workBadgeCount').textContent||0),
            message:document.getElementById('blessingMessage').textContent,
            stored:Object.values(localStorage).some(v=>{try{return JSON.parse(v).blessings?.includes(idx)}catch(e){return false}})
          });
        },1200);
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in result,result
    assert result['won'] and result['modal'] and result['preview'] and result['previewWidth']>0 and result['count']>=1 and result['stored'],result
    assert '早安' in result['message'] or '晨安' in result['message'],result

    classic=d.execute_script('''
      const J=window.__JIGSAW__;J.game.mode='classic';const s=J.selectedImagesForLevel(1,5);return {s,ok:s.every(i=>i<J.standardPictureCount)};
    ''')
    assert classic['ok'],classic
    print('PASS v4.0 Scheme-B photorealistic assets, clean puzzle bases, premium poster render and sharing flow')
finally:
    d.quit()
