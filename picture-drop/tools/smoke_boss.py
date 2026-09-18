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
wait=WebDriverWait(driver,30)

try:
    driver.get('http://127.0.0.1:8765/boss.html?v=1.0.0')
    wait.until(lambda d:d.execute_script("return !!window.__BOSS_DEMO__ && window.__BOSS_DEMO__.version==='1.0.0'"))
    initial=driver.execute_script("return window.__BOSS_DEMO__.state()")
    assert initial['phase']=='micro' and initial['wave']==0 and initial['collected']==0, initial
    assert len(initial['microBoard'])==16, initial
    assert driver.execute_script("return document.querySelectorAll('.micro-tile').length")==16

    driver.execute_script("window.__BOSS_DEMO__.enterBoss()")
    boss=driver.execute_script("return window.__BOSS_DEMO__.state()")
    assert boss['phase']=='boss' and boss['collected']==16, boss
    assert len(boss['bossOrder'])==16
    assert driver.execute_script("return document.querySelectorAll('.boss-tile').length")==16

    driver.execute_script("window.__BOSS_DEMO__.solveBoss()")
    wait.until(lambda d:d.execute_script("return window.__BOSS_DEMO__.state().phase==='done'"))
    wait.until(lambda d:d.execute_script("return document.getElementById('finishOverlay').classList.contains('is-visible')"))
    assert driver.execute_script("return document.getElementById('bossAccuracy').textContent")=='100%'

    print('PASS BOSS mode: micro stage, 16-card collection, BOSS stage, final full image')
finally:
    driver.quit()
