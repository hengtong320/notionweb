#!/usr/bin/env python3
import os,time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932')
opts.add_argument('--force-device-scale-factor=1')

driver=webdriver.Chrome(options=opts)
try:
    driver.get('http://127.0.0.1:8765/?level=15&v=3.5.1')
    wait=WebDriverWait(driver,15)
    wait.until(lambda d: d.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))
    before=driver.execute_script('return window.__JIGSAW__.game.moves')
    move=driver.execute_script('''
      const m=window.__JIGSAW__.findHelpfulMove();
      if(!m)return null;
      return {id:m.group.ids[0],dr:m.dr,dc:m.dc,split:!!m.splitMode};
    ''')
    if not move:
        raise RuntimeError('no helpful move available in level 15 smoke state')
    tile=driver.find_element(By.CSS_SELECTOR, f".tile[data-tile-id='{move['id']}']")
    board=driver.find_element(By.ID,'board')
    rect=driver.execute_script('const r=arguments[0].getBoundingClientRect();return {w:r.width,h:r.height};',board)
    step_x=rect['w']/5.0; step_y=rect['h']/5.0
    dx=move['dc']*step_x; dy=move['dr']*step_y
    actions=ActionChains(driver).move_to_element(tile).click_and_hold()
    if move['split']:
        actions=actions.pause(0.38)
    actions.move_by_offset(dx,dy).pause(0.05).release().perform()
    wait.until(lambda d: d.execute_script('return window.__JIGSAW__.game.moves')>before)
    after=driver.execute_script('return window.__JIGSAW__.game.moves')
    phase=driver.execute_script('return window.__JIGSAW__.game.phase')
    if after<=before:
        raise RuntimeError(f'drag did not increment moves: {before}->{after}')
    print(f'PASS real browser drag {before}->{after}, phase={phase}, move={move}')
finally:
    driver.quit()
