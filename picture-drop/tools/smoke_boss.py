#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

opts=Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--disable-dev-shm-usage')
opts.add_argument('--window-size=430,932')
driver=webdriver.Chrome(options=opts)
wait=WebDriverWait(driver,35)

try:
    driver.get('http://127.0.0.1:8765/boss.html?v=1.1.0')
    wait.until(lambda d:d.execute_script("return !!window.__BOSS_DEMO__ && window.__BOSS_DEMO__.version==='1.1.0'"))
    initial=driver.execute_script("return window.__BOSS_DEMO__.state()")
    assert initial['phase']=='micro' and initial['wave']==0 and initial['collected']==0, initial
    assert len(initial['microBoard'])==16, initial
    assert driver.execute_script("return document.querySelectorAll('.micro-tile').length")==16
    assert driver.execute_script("return new Set([...document.querySelectorAll('.micro-tile')].map(x=>x.dataset.image)).size")==4
    assert driver.execute_script("return document.querySelectorAll('.micro-tile.join-left,.micro-tile.join-right,.micro-tile.join-up,.micro-tile.join-down').length")>0
    assert driver.execute_script("return document.querySelectorAll('.wave-preview-card').length")==4
    assert driver.execute_script("return document.querySelectorAll('.collect-dot').length")==16

    driver.execute_script("window.__BOSS_DEMO__.autoCompleteWave()")
    wait.until(lambda d:d.execute_script("const s=window.__BOSS_DEMO__.state();return s.collected>=4 && s.wave===1"))
    assert driver.execute_script("return document.querySelectorAll('.collect-dot.done').length")>=4

    driver.execute_script("window.__BOSS_DEMO__.enterBoss()")
    boss=driver.execute_script("return window.__BOSS_DEMO__.state()")
    assert boss['phase']=='boss' and boss['collected']==16 and boss['bossCursor']==0, boss
    assert len(boss['bossDeck'])==16 and len(boss['bossPlaced'])==16
    assert driver.execute_script("return document.querySelectorAll('.boss-cell').length")==16
    assert driver.execute_script("return document.querySelectorAll('.boss-target-preview i').length")==16
    assert driver.execute_script("return document.querySelectorAll('.boss-next-cards i').length")==3

    driver.execute_async_script("const done=arguments[0];Promise.resolve(window.__BOSS_DEMO__.dropCorrect()).then(()=>done(true)).catch(e=>done(String(e)))")
    after_drop=driver.execute_script("return window.__BOSS_DEMO__.state()")
    assert after_drop['bossCursor']==1 and sum(x is not None for x in after_drop['bossPlaced'])==1, after_drop
    assert driver.execute_script("return document.querySelectorAll('.boss-tile').length")==1

    driver.execute_script("window.__BOSS_DEMO__.solveBoss()")
    wait.until(lambda d:d.execute_script("return window.__BOSS_DEMO__.state().phase==='done'"))
    wait.until(lambda d:d.execute_script("return document.getElementById('finishOverlay').classList.contains('is-visible')"))
    assert driver.execute_script("return document.getElementById('bossAccuracy').textContent")=='100%'
    assert driver.execute_script("return document.querySelectorAll('#finishCollage i').length")==16

    print('PASS BOSS v1.1: distinct photos, magnetic joins, falling collection, BOSS queue and final 16-image collage')
finally:
    driver.quit()
