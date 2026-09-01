#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932')
d=webdriver.Chrome(options=opts)
try:
    d.get('http://127.0.0.1:8765/?v=4.1.0')
    WebDriverWait(d,30).until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.version==='4.1.0'"))
    audit=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game,failures=[];
      g.mode='classic';
      for(let level=1;level<=60;level++){
        J.configureGrid(J.gridForLevel(level));
        const gen=J.generateLevel(level);
        g.level=level;g.board=gen.board.slice();g.decks=gen.decks.map(d=>d.slice());g.tiles=gen.tiles;
        const ids=[...g.board.filter(Boolean),...g.decks.flat()],unique=new Set(ids);
        if(ids.length!==gen.imageCount*4||unique.size!==ids.length){
          failures.push({level,type:'integrity',ids:ids.length,unique:unique.size,expected:gen.imageCount*4});continue;
        }
        J.ensureVisibleCompletionSet();
        if(J.visibleCompletionImage()===null)failures.push({level,type:'initial-frontier'});
      }
      return {checked:60,failures};
    ''')
    assert audit['checked']==60 and not audit['failures'],audit
    print('PASS v4.1 generation integrity and visible initial frontier across 60 levels')
finally:
    d.quit()
