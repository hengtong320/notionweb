#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new');opts.add_argument('--no-sandbox');opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932');opts.add_argument('--force-device-scale-factor=1')
d=webdriver.Chrome(options=opts)
try:
    d.get('http://127.0.0.1:8765/?level=15&v=3.7.0')
    wait=WebDriverWait(d,20)
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))
    stats=d.execute_script('''
      const J=window.__JIGSAW__;
      const levels=[];
      for(let l=1;l<=30;l++)levels.push({l,count:J.imageCountForLevel(l),sel:J.selectedImagesForLevel(l,J.imageCountForLevel(l))});
      const overlaps=[];
      for(let i=1;i<levels.length;i++){
        const a=new Set(levels[i-1].sel);overlaps.push(levels[i].sel.filter(x=>a.has(x)).length);
      }
      return {pictureCount:J.pictureCount,levels,overlaps,deck:J.game.decks.reduce((s,x)=>s+x.length,0)};
    ''')
    assert stats['pictureCount']>=60,stats
    assert max(stats['overlaps'])==0,stats['overlaps']
    counts={x['l']:x['count'] for x in stats['levels']}
    assert counts[1]==5 and counts[15]==14 and counts[20]>=16 and counts[30]>=18,counts
    assert stats['deck']>=25,stats
    ok=d.execute_async_script('''
      const done=arguments[0];fetch('assets/pictures-extra/37-jellyfish.svg').then(r=>done(r.ok)).catch(()=>done(false));
    ''')
    assert ok,'extra picture asset failed'

    # Regression for the user's exact observation: a complete 2x2 formed in mid-air
    # must fall first and may only clear after gravity reaches a stable position.
    result=d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game;
      const first=[...g.tiles.values()][0].imageIndex;
      const ids=Array(4).fill(null);for(const t of g.tiles.values())if(t.imageIndex===first)ids[t.quadrant]=t.id;
      g.decks=Array.from({length:5},()=>[]);g.board=Array(25).fill(null);
      g.board[0]=ids[0];g.board[1]=ids[1];g.board[5]=ids[2];g.board[6]=ids[3];
      g.clearedCount=0;g.totalImages=1;g.phase='idle';J.renderBoard();
      J.resolveBoard(new Set(),false).then(()=>done({trace:g.lastResolveTrace.slice(),empty:g.board.every(v=>!v)})).catch(e=>done({error:String(e)}));
    ''')
    if 'error' in result: raise RuntimeError(result['error'])
    assert result['empty'],result
    assert 'gravity' in result['trace'] and 'clear' in result['trace'],result
    assert result['trace'].index('gravity') < result['trace'].index('clear'),result
    print('PASS v3.7 picture pool/progression/zero-adjacent-overlap/deep-deck')
    print('PASS settle-before-merge trace:',result['trace'])
finally:
    d.quit()
