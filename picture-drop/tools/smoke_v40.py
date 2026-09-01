#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new');opts.add_argument('--no-sandbox');opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932');opts.add_argument('--force-device-scale-factor=1')
d=webdriver.Chrome(options=opts)
d.set_script_timeout(35)
try:
    d.get('http://127.0.0.1:8765/?mode=blessing&level=1&v=4.0.0')
    wait=WebDriverWait(d,30)
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))

    state=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      return {
        mode:g.mode,
        selected:g.selectedImages.slice(),
        cards:g.selectedImages.map(i=>J.blessingMeta(i)),
        scheme:J.blessingScheme,
        button:document.getElementById('blessingBtn').innerText,
        tiles:[...document.querySelectorAll('.tile')].map(el=>getComputedStyle(el).backgroundImage).filter(Boolean)
      };
    ''')
    assert state['mode']=='blessing',state
    assert state['scheme']=='B-photorealistic',state
    assert len(state['selected'])==6,state
    assert all(card and card['path'].startswith('assets/blessings-real/') and card['path'].endswith('.png') for card in state['cards']),state
    assert '写实祝福拼图' in state['button'] and '方案B' in state['button'],state
    assert any('blessings-real' in x for x in state['tiles']),state

    dimensions=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,paths=J.game.selectedImages.map(i=>J.blessingMeta(i).path);
      Promise.all(paths.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve({src,w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>resolve({src,w:0,h:0});im.src=src;}))).then(done);
    ''')
    assert len(dimensions)==6 and all(x['w']==720 and x['h']==960 for x in dimensions),dimensions

    poster=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,idx=J.game.selectedImages[0];
      J.renderBlessingPoster(idx).then(c=>done({
        w:c.width,h:c.height,scheme:c.dataset.scheme,source:c.dataset.source,
        data:c.toDataURL('image/jpeg',.88).slice(0,24)
      })).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in poster,poster
    assert poster['w']==1080 and poster['h']==1440,poster
    assert poster['scheme']=='B' and poster['source']=='photorealistic',poster
    assert poster['data'].startswith('data:image/jpeg;base64,'),poster

    result=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,idx=g.selectedImages[0];
      const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===idx)ids[t.quadrant]=t.id;
      g.decks=Array.from({length:4},()=>[]);g.board=Array(16).fill(null);
      [9,10,13,14].forEach((cell,q)=>g.board[cell]=ids[q]);g.totalImages=1;g.clearedCount=0;g.clearedImages=[];g.phase='idle';
      J.renderBoard();J.resolveBoard(new Set(),false).then(()=>{
        J.openBlessingWorks(idx);
        setTimeout(()=>done({
          won:g.phase==='won',
          modal:document.getElementById('blessingModal').classList.contains('is-visible'),
          preview:document.getElementById('blessingPreview').src.startsWith('data:image/jpeg')
        }),900);
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in result,result
    assert result['won'] and result['modal'] and result['preview'],result

    print('PASS v4.0 Scheme B: 6 optimized photorealistic bases, clean puzzle stage, styled poster and works flow')
finally:
    d.quit()
