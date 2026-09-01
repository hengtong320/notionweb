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
        realistic:J.realisticBlessingCount,
        button:document.getElementById('blessingBtn').innerText,
        tiles:[...document.querySelectorAll('.tile')].map(el=>getComputedStyle(el).backgroundImage).filter(Boolean)
      };
    ''')
    assert state['mode']=='blessing',state
    assert state['realistic']==6,state
    assert len(state['selected'])==6,state
    assert all(card and card.get('scheme')=='realistic-b' for card in state['cards']),state
    assert all('assets/blessings-realistic/' in card['path'] for card in state['cards']),state
    assert '写实祝福拼图' in state['button'] and '方案B' in state['button'],state
    assert any('blessings-realistic' in x for x in state['tiles']),state

    dimensions=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,paths=J.game.selectedImages.map(i=>J.blessingMeta(i).path);
      Promise.all(paths.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve({src,w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>resolve({src,w:0,h:0});im.src=src;}))).then(done);
    ''')
    assert len(dimensions)==6 and all(x['w']==896 and x['h']==1152 for x in dimensions),dimensions

    poster=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,idx=J.game.selectedImages[0],meta=J.blessingMeta(idx),base=new Image();
      base.onload=()=>J.renderBlessingPoster(idx).then(canvas=>{
        const raw=document.createElement('canvas');raw.width=1080;raw.height=1440;raw.getContext('2d').drawImage(base,0,0,1080,1440);
        const a=canvas.getContext('2d').getImageData(meta.layout.titleX,meta.layout.titleY,1,1).data;
        const b=raw.getContext('2d').getImageData(meta.layout.titleX,meta.layout.titleY,1,1).data;
        const p=canvas.getContext('2d').getImageData(meta.layout.plateX+30,meta.layout.plateY+30,1,1).data;
        const q=raw.getContext('2d').getImageData(meta.layout.plateX+30,meta.layout.plateY+30,1,1).data;
        const diff=(x,y)=>Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])+Math.abs(x[2]-y[2]);
        done({w:canvas.width,h:canvas.height,titleDiff:diff(a,b),plateDiff:diff(p,q),data:canvas.toDataURL('image/jpeg',.88).slice(0,24)});
      }).catch(e=>done({error:String(e)}));
      base.onerror=()=>done({error:'base load failed'});base.src=meta.path;
    ''')
    assert 'error' not in poster,poster
    assert poster['w']==1080 and poster['h']==1440,poster
    assert poster['titleDiff']>8 and poster['plateDiff']>8,poster
    assert poster['data'].startswith('data:image/jpeg;base64,'),poster

    result=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,idx=g.selectedImages[0];
      const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===idx)ids[t.quadrant]=t.id;
      g.decks=Array.from({length:4},()=>[]);g.board=Array(16).fill(null);
      [9,10,13,14].forEach((cell,q)=>g.board[cell]=ids[q]);g.totalImages=1;g.clearedCount=0;g.clearedImages=[];g.phase='idle';
      J.renderBoard();J.resolveBoard(new Set(),false).then(()=>{
        J.openBlessingWorks(idx);
        setTimeout(()=>done({won:g.phase==='won',modal:document.getElementById('blessingModal').classList.contains('is-visible'),preview:document.getElementById('blessingPreview').src.startsWith('data:image/jpeg')}),900);
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in result,result
    assert result['won'] and result['modal'] and result['preview'],result
    print('PASS v4.0 realistic scheme B: 6 photographic bases, clean puzzle stage, styled poster generation and works flow')
finally:
    d.quit()
