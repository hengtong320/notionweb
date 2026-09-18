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
wait=WebDriverWait(d,45)

try:
    d.get('http://127.0.0.1:8765/synthesis.html?v=2.0.0')
    wait.until(lambda x:x.execute_script("return !!window.__HIERARCHY_SYNTH__ && window.__HIERARCHY_SYNTH__.version==='2.0.0' && window.__HIERARCHY_SYNTH__.state().imageLoaded"))
    initial=d.execute_script('return window.__HIERARCHY_SYNTH__.state()')
    assert initial['stage']==1 and initial['wave']==0 and initial['completed1']==0,initial
    assert initial['cards']>=8 and initial['queue']>=8,initial
    assert d.execute_script("return document.getElementById('gameCanvas').width>300 && document.getElementById('gameCanvas').height>400")

    placed=d.execute_script('return window.__HIERARCHY_SYNTH__.autoPlaceOne()')
    assert placed is True
    wait.until(lambda x:x.execute_script("return window.__HIERARCHY_SYNTH__.state().snaps>=1"))
    after_snap=d.execute_script('return window.__HIERARCHY_SYNTH__.state()')
    assert after_snap['stage']==1 and after_snap['snaps']>=1 and after_snap['moves'][0]>=1,after_snap

    d.execute_script('window.__HIERARCHY_SYNTH__.forceStage(2)')
    wait.until(lambda x:x.execute_script("return window.__HIERARCHY_SYNTH__.state().stage===2"))
    stage2=d.execute_script('return window.__HIERARCHY_SYNTH__.state()')
    assert stage2['cards']>=8 and stage2['queue']>=8,stage2
    assert '16个局部' in d.find_element('id','stageTitle').text

    d.execute_script('window.__HIERARCHY_SYNTH__.forceStage(3)')
    wait.until(lambda x:x.execute_script("return window.__HIERARCHY_SYNTH__.state().stage===3"))
    stage3=d.execute_script('return window.__HIERARCHY_SYNTH__.state()')
    assert stage3['cards']==4 and stage3['queue']==0,stage3

    d.execute_script('window.__HIERARCHY_SYNTH__.solveFinal()')
    wait.until(lambda x:x.execute_script("return document.getElementById('finishOverlay').classList.contains('is-visible')"))
    final=d.execute_script('return window.__HIERARCHY_SYNTH__.state()')
    assert final['stage']==3 and final['snaps']>=5,final
    assert d.find_element('id','totalPercent').text in ('100%','85%')

    print('PASS hierarchical synthesis: micro snap, region stage, final stage and complete image')
finally:
    d.quit()
