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
    d.get('http://127.0.0.1:8765/falling-combine.html?v=3.0.0')
    wait.until(lambda x:x.execute_script("return !!window.__FALLING_COMBINE__ && window.__FALLING_COMBINE__.version==='3.0.0' && !window.__FALLING_COMBINE__.state().busy"))
    first=d.execute_script("return window.__FALLING_COMBINE__.state()")
    assert first['stage']==1 and first['boardN']==4,first
    assert first['boardCount']==16 and first['deckCount']==48 and first['collected']==0,first
    size=d.execute_script("const c=document.getElementById('gameCanvas');return {w:c.width,h:c.height,cssW:c.getBoundingClientRect().width,cssH:c.getBoundingClientRect().height};")
    assert size['w']>300 and size['h']>500 and size['cssW']>300 and size['cssH']>450,size

    d.execute_async_script("const done=arguments[0];window.__FALLING_COMBINE__.skipToBoss().then(()=>done(true)).catch(e=>done(String(e)))")
    wait.until(lambda x:x.execute_script("return window.__FALLING_COMBINE__.state().stage===2 && !window.__FALLING_COMBINE__.state().busy"))
    boss=d.execute_script("return window.__FALLING_COMBINE__.state()")
    assert boss['stage']==2 and boss['boardN']==5,boss
    assert boss['boardCount']==16 and boss['deckCount']==0 and boss['collected']==16,boss

    d.execute_script("window.__FALLING_COMBINE__.solveBoss()")
    wait.until(lambda x:x.execute_script("return document.getElementById('finish').classList.contains('is-visible')"))
    solved=d.execute_script("return window.__FALLING_COMBINE__.state()")
    assert solved['largestGroup']==16,solved
    assert d.execute_script("return document.querySelector('.final-image')!==null")

    print('PASS falling combine: 4x4 dealt micro board, 16 collected local images, 5x5 dealt BOSS board, final continuous image')
finally:
    d.quit()
