#!/usr/bin/env python3
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new');opts.add_argument('--no-sandbox');opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932');opts.add_argument('--force-device-scale-factor=1')
driver=webdriver.Chrome(options=opts)
try:
    driver.get('http://127.0.0.1:8765/?level=15&v=3.6.0')
    wait=WebDriverWait(driver,18)
    wait.until(lambda d:d.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))

    # Seam architecture: every joined logical group should render as one image surface.
    seam=driver.execute_script('''
      const gs=window.__JIGSAW__.game.groups.filter(g=>g.ids.length>1);
      const surfaces=[...document.querySelectorAll('.joined-surface')];
      const member=document.querySelector('.tile.is-surface-member');
      return {groups:gs.length,surfaces:surfaces.length,memberBg:member?getComputedStyle(member).backgroundImage:null,
              surfaceBg:surfaces[0]?getComputedStyle(surfaces[0]).backgroundImage:null};
    ''')
    if seam['groups'] and seam['surfaces'] < seam['groups']:
        raise RuntimeError(f"joined surface missing: {seam}")
    if seam['groups'] and seam['memberBg'] != 'none':
        raise RuntimeError(f"member tile still rasterizes separate background: {seam}")
    if seam['groups'] and (not seam['surfaceBg'] or seam['surfaceBg']=='none'):
        raise RuntimeError(f"joined surface has no image: {seam}")

    # Soft-gravity synthetic regression: an L-shaped visual connection must fracture
    # when one side is blocked; after settling no occupied tile may hang over a hole.
    grav=driver.execute_script('''
      let b=Array(25).fill(null);
      b[3]='A'; b[4]='B'; b[8]='C'; b[9]='BLOCK'; b[24]='BASE';
      // Keep BLOCK supported in col4 and BASE at the bottom of col4; leave col3 open.
      b[14]='S1';b[19]='S2';
      let waves=0;
      while(waves++<20){const s=window.__JIGSAW__.gravityStep(b);if(!s.moved)break;b=s.board;}
      let gaps=[];
      for(let c=0;c<5;c++){
        let emptyBelow=false;
        for(let r=4;r>=0;r--){const v=b[r*5+c];if(!v)emptyBelow=true;else if(emptyBelow)gaps.push({r,c,v});}
      }
      return {b,gaps};
    ''')
    if grav['gaps']:
        raise RuntimeError(f"soft gravity left hanging gaps: {grav['gaps']}")

    # Real pointer drag still works.
    before=driver.execute_script('return window.__JIGSAW__.game.moves')
    move=driver.execute_script('''const m=window.__JIGSAW__.findHelpfulMove();return m?{id:m.group.ids[0],dr:m.dr,dc:m.dc,split:!!m.splitMode}:null''')
    if not move: raise RuntimeError('no helpful move available')
    tile=driver.find_element(By.CSS_SELECTOR,f".tile[data-tile-id='{move['id']}']")
    board=driver.find_element(By.ID,'board')
    rect=driver.execute_script('const r=arguments[0].getBoundingClientRect();return {w:r.width,h:r.height};',board)
    actions=ActionChains(driver).move_to_element(tile).click_and_hold()
    if move['split']: actions=actions.pause(0.38)
    actions.move_by_offset(move['dc']*rect['w']/5.0,move['dr']*rect['h']/5.0).pause(.05).release().perform()
    wait.until(lambda d:d.execute_script('return window.__JIGSAW__.game.moves')>before)
    wait.until(lambda d:d.execute_script("return window.__JIGSAW__.game.phase==='idle' || window.__JIGSAW__.game.phase==='won'"))

    # After a real resolve, each column must also be bottom-packed.
    gaps=driver.execute_script('''
      const b=window.__JIGSAW__.game.board,g=5,out=[];
      for(let c=0;c<g;c++){let empty=false;for(let r=g-1;r>=0;r--){const v=b[r*g+c];if(!v)empty=true;else if(empty)out.push({r,c,id:v});}}
      return out;
    ''')
    if gaps: raise RuntimeError(f"real board has unsupported gaps after resolve: {gaps}")
    print('PASS v3.6 browser: joined surfaces, soft gravity, real drag, stable bottom-packed board')
finally:
    driver.quit()
