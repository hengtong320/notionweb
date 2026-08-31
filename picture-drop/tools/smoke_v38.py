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
d.set_script_timeout(35)
wait=WebDriverWait(d,25)

def wait_idle():
    wait.until(lambda x:x.execute_script("return !!window.__JIGSAW__ && window.__JIGSAW__.game.phase==='idle'"))

def chain_probe():
    return d.execute_script('''
      const J=window.__JIGSAW__,g=J.game,cs=g.generation.chainSeed;
      if(!cs)return {error:'no-chain-seed'};
      const source=g.board.indexOf(cs.starterId),target=cs.targetCell,grid=Math.sqrt(g.board.length);
      const sr=Math.floor(source/grid),sc=source%grid,tr=Math.floor(target/grid),tc=target%grid;
      const group=J.computeGroups().find(x=>x.ids.includes(cs.starterId));
      const move=J.validateMove(group,tr-sr,tc-sc);
      if(!move.valid)return {error:'seed-move-invalid',source,target};
      const prediction=J.predictCascade(move.board,g.decks,5);
      return {depth:cs.depth,source,target,dr:tr-sr,dc:tc-sc,prediction,groupIds:group.ids,board:move.board};
    ''')

def commit_seed():
    return d.execute_async_script('''
      const done=arguments[0],J=window.__JIGSAW__,g=J.game,cs=g.generation.chainSeed;
      const source=g.board.indexOf(cs.starterId),target=cs.targetCell,grid=Math.sqrt(g.board.length);
      const sr=Math.floor(source/grid),sc=source%grid,tr=Math.floor(target/grid),tc=target%grid;
      const group=J.computeGroups().find(x=>x.ids.includes(cs.starterId));
      const move=J.validateMove(group,tr-sr,tc-sc);
      J.commitMove(group,tr-sr,tc-sc,move.board,false).then(()=>done({moves:g.moves,combo:g.comboMax,streak:g.streakCombo,flow:g.flowEnergy,fever:g.feverActive,trace:g.lastResolveTrace})).catch(e=>done({error:String(e)}));
    ''')

try:
    d.get('http://127.0.0.1:8765/?level=3&v=3.8.0')
    wait_idle()
    stats=d.execute_script('''
      const J=window.__JIGSAW__;
      return {
        pictures:J.pictureCount,
        counts:[1,3,5,15,20].map(J.imageCountForLevel),
        previews:[...document.querySelectorAll('.next-card.is-visible')].map(x=>getComputedStyle(x).backgroundImage),
        canvas:[document.getElementById('juiceCanvas').width,document.getElementById('juiceCanvas').height],
        flow:!!document.getElementById('flowMeter'),
        chain:!!document.getElementById('chainStatus'),
        seed:J.game.generation.chainSeed
      };
    ''')
    assert stats['pictures']==60,stats
    assert stats['counts']==[5,7,9,14,16],stats
    assert len(stats['previews'])==4 and all(x!='none' for x in stats['previews']),stats
    assert stats['canvas'][0]>100 and stats['canvas'][1]>100,stats
    assert stats['flow'] and stats['chain'],stats
    assert stats['seed']['depth']==2,stats
    p=chain_probe();assert not p.get('error'),p
    assert p['prediction']['waves']>=2,p
    result=commit_seed();assert not result.get('error'),result
    assert result['moves']>=1 and result['combo']>=2 and result['streak']>=2,result
    assert result['flow']>0 or result['fever'],result
    assert d.execute_script("return document.querySelectorAll('.spark').length") == 0
    print('PASS level3 seeded 2-chain, deck previews, canvas juice',stats,p,result)

    d.execute_async_script("const done=arguments[0];window.__JIGSAW__.startLevel(5).then(done)")
    wait_idle()
    p=chain_probe();assert not p.get('error'),p
    assert p['depth']==3 and p['prediction']['waves']>=3,p
    result=commit_seed();assert not result.get('error'),result
    assert result['combo']>=3 and result['streak']>=3,result
    print('PASS level5 seeded 3-chain',p,result)

    state=d.execute_script('''
      const J=window.__JIGSAW__,g=J.game;
      g.turnChain=0;g.turnCleared=0;g.streakCombo=2;g.streakGrace=2;g.flowEnergy=95;g.feverActive=false;g.feverStartedThisTurn=false;
      const tier=J.registerClear(1);
      return {tier,streak:g.streakCombo,grace:g.streakGrace,fever:g.feverActive,turns:g.feverTurns};
    ''')
    assert state['streak']==3 and state['grace']>=2 and state['fever'] and state['turns']==3,state
    print('PASS cross-move streak and FLOW fever state',state)
finally:
    d.quit()
