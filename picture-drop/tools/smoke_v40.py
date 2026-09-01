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
    wait=WebDriverWait(d,35)
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))

    state=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      return {
        mode:g.mode,
        selected:g.selectedImages.slice(),
        cards:g.selectedImages.map(i=>J.blessingMeta(i)),
        realisticCount:J.realisticBlessingCount,
        allRealistic:g.selectedImages.every(J.isRealisticBlessingIndex),
        stage:document.getElementById('gameStage').classList.contains('is-realistic-blessing'),
        button:document.getElementById('blessingBtn').innerText,
        tiles:[...document.querySelectorAll('.tile')].map(el=>getComputedStyle(el).getPropertyValue('--piece-image')||getComputedStyle(el).backgroundImage)
      };
    ''')
    assert state['mode']=='blessing',state
    assert state['realisticCount']==6 and state['allRealistic'],state
    assert len(state['selected'])==6,state
    assert all(card and card['path'].startswith('assets/blessings-realistic/') and card['path'].endswith('.png') for card in state['cards']),state
    assert state['stage'],state
    assert '写实祝福拼图' in state['button'] and '方案B' in state['button'],state
    assert any('blessings-realistic' in x for x in state['tiles']),state

    dimensions=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,paths=J.game.selectedImages.map(i=>J.blessingMeta(i).path);
      Promise.all(paths.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve({src,w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>resolve({src,w:0,h:0});im.src=src;}))).then(done);
    ''')
    assert len(dimensions)==6 and all(x['w']==1080 and x['h']==1440 for x in dimensions),dimensions

    poster=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,idx=J.game.selectedImages[0],src=J.blessingMeta(idx).path;
      const im=new Image();im.onload=async()=>{
        try{
          const source=document.createElement('canvas');source.width=1080;source.height=1440;source.getContext('2d').drawImage(im,0,0,1080,1440);
          const c=await J.renderBlessingPoster(idx);
          const a=source.getContext('2d').getImageData(540,170,1,1).data,b=c.getContext('2d').getImageData(540,170,1,1).data;
          const diff=Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2]);
          done({w:c.width,h:c.height,diff,data:c.toDataURL('image/jpeg',.88).slice(0,24)});
        }catch(e){done({error:String(e)});}
      };im.onerror=()=>done({error:'source image failed'});im.src=src;
    ''')
    assert 'error' not in poster,poster
    assert poster['w']==1080 and poster['h']==1440 and poster['diff']>10,poster
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
        }),1000);
      }).catch(e=>done({error:String(e)}));
    ''')
    assert 'error' not in result,result
    assert result['won'] and result['modal'] and result['preview'],result

    print('PASS v4.0 Scheme B: six 1080x1440 clean photorealistic puzzle bases and generated share posters')
finally:
    d.quit()
