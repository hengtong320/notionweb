from pathlib import Path
import os,json,math,hashlib,datetime,subprocess
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];P=ROOT/'fullbody-atlas';Q=P/'qa';Q.mkdir(exist_ok=True)
INFO=json.loads((P/'build-info.json').read_text());MEMBERS=json.loads((P/'region-membership.json').read_text());META=json.loads((P/'assets/provenance.json').read_text())
BROWSER=os.getenv('BROWSER','chromium');LIVE=os.getenv('LIVE_URL');PREVIEW=os.getenv('PREVIEW')=='1';PREFIX='preview' if PREVIEW else 'live' if LIVE else 'webkit' if BROWSER=='webkit' else 'offline'
DENSITY=1 if PREVIEW else .55
report={'success':False,'browser':BROWSER,'url':LIVE or 'file: embedded HTML','startedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'htmlSHA256':INFO['htmlSHA256'],'deviceScaleFactor':DENSITY,'checks':[],'errors':[],'requests':[]}
def check(name,passed,detail=None):
 report['checks'].append({'name':name,'pass':bool(passed),**({'detail':detail} if detail is not None else {})});print(('PASS ' if passed else 'FAIL ')+name,flush=True)
 if not passed:raise AssertionError(name+': '+str(detail))
with sync_playwright() as w:
 browser=getattr(w,BROWSER).launch(headless=True,**({'args':['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']} if BROWSER=='chromium' else {}))
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=DENSITY);page.set_default_timeout(45000)
 page.on('pageerror',lambda e:report['errors'].append(str(e)))
 page.on('request',lambda r:report['requests'].append(r.url) if r.url.startswith(('http:','https:')) else None)
 if not LIVE:page.route('http**://**/*',lambda r:r.abort())
 def state():return page.evaluate('window.__FOOT_ATLAS__.getState()')
 def settle():
  page.wait_for_function('!window.__FOOT_ATLAS__.getState().cameraAnimating',timeout=60000)
  page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
 def click(selector):page.locator(selector).click();settle()
 def select(id):
  page.locator('[data-select="'+id+'"]').click();settle()
 def reset():page.evaluate('window.__FOOT_ATLAS__.reset()');settle()
 def region(id,side='both'):
  page.evaluate('window.__FOOT_ATLAS__.setRegion("body");window.__FOOT_ATLAS__.setSide("both")');settle()
  click('[data-region="'+id+'"]')
  if side!='both':click('[data-side="'+side+'"]')
 try:
  response=page.goto(LIVE or (P/'index.html').as_uri(),wait_until='load',timeout=120000)
  if LIVE:
   check('Published URL returns HTTP 200',response.status==200)
   check('Published HTML byte-for-byte equals tested build',hashlib.sha256(response.body()).hexdigest()==INFO['htmlSHA256'])
  page.wait_for_function('window.__FOOT_ATLAS__?.getState().ready',timeout=120000);settle()
  s=state();check('All 210 independent bone objects loaded',s['count']==210 and s['visible']==210)
  check('Every source triangle preserved',sum(b['triangles'] for b in s['bones'])==INFO['totalTriangles'])
  check('No nonfinite bone positions',all(math.isfinite(x) for b in s['bones'] for x in b['position']))
  check('No secondary model or renderer downloads',len(report['requests'])==(1 if LIVE else 0),report['requests'])
  check('All 73 original bone coordinates preserved',META['maxPriorCoordinateErrorMillimeters']==0 and len(META['priorMeshCoordinateErrorsMillimeters'])==73)
  if (ROOT/'.git').exists():check('Five approved previous directories untouched',not subprocess.check_output(['git','diff',INFO['baseRef'],'--','foot-atlas/','ankle-atlas/','knee-atlas/','hip-atlas/','lumbar-atlas/'],cwd=ROOT))
  if PREVIEW:
   for r,side,view in [('body','both','front'),('head','both','overview'),('cervical','both','overview'),('thorax','both','overview'),('hand','right','front'),('auditory','right','overview'),('all','both','front')]:
    region(r,side);click('[data-view="'+view+'"]');page.screenshot(path=str(Q/('full-density-'+r+'.png')))
    check('Full density rendered '+r,state()['visible']==len(MEMBERS[r][side]))
  else:
   catalog=page.evaluate('window.__FOOT_ATLAS__.getCatalog()');check('210 unique Chinese catalog entries',len(catalog)==210 and len({b['id'] for b in catalog})==210 and all(b['name'] for b in catalog))
   # These are explicit DOM event tests, not falsely labelled as physical mouse clicks.
   results=page.evaluate('''()=>{const a=window.__FOOT_ATLAS__,out=[];for(const b of a.getCatalog()){document.querySelector('[data-select="'+b.id+'"]').click();out.push({id:b.id,pass:a.getState().selected===b.id&&document.querySelector('#description').textContent.length>5&&document.querySelector('#detailTitle').textContent.includes(b.name)});}return out;}''')
   for r in results:check('DOM name and description: '+r['id'],r['pass'])
   for r in MEMBERS:
    region(r);s=state();visible=sorted(b['id'] for b in s['bones'] if b['visible']);check('Region inventory: '+r,visible==sorted(MEMBERS[r]['both']))
    check('Finite camera: '+r,all(math.isfinite(v) for v in s['camera']+s['target']))
   for r in ['body','head','thorax','upper','shoulder','elbow','wrist','hand','foot','knee','whole','hip','all']:
    for side in ['right','left']:
     region(r,side);check('Patient side inventory: '+r+'/'+side,sorted(b['id'] for b in state()['bones'] if b['visible'])==sorted(MEMBERS[r][side]))
   if BROWSER=='chromium':
    samples=['talus','talus-left','femur-left','hip-right','L3','frontal','sphenoid','ethmoid','mandible','hyoid','C1','C2','C7','T1','T12','rib-1-right','rib-12-left','sternum','scapula-right','humerus-left','radius-right','ulna-left','scaphoid-right','capitate-left','hand-distal-1-left','stapes-right','incus-left']
    if LIVE:samples=['talus','talus-left','L3','frontal','mandible','C1','C7','T12','rib-12-left','sternum','scapula-right','humerus-left','scaphoid-right','hand-distal-1-left','stapes-right']
    for id in samples:
     reset();select(id);click('#isolateBtn');check('Isolate one mesh: '+id,state()['visible']==1)
     point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',id);check('Visible raycast surface: '+id,bool(point))
     page.mouse.click(point['x'],point['y']);check('Actual mouse identification: '+id,state()['selected']==id)
     click('[data-mode="move"]');point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',id)
     page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+36,point['y']-20,steps=6);page.mouse.up();settle()
     moved=[b['id'] for b in state()['bones'] if math.hypot(*b['offset'])>.01];check('Mouse drag changes only '+id,moved==[id],moved)
     click('#resetSelectedBtn');click('[data-mode="rotate"]');point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',id)
     page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+32,point['y']+18,steps=6);page.mouse.up();settle()
     bone=next(b for b in state()['bones'] if b['id']==id);check('Independent mouse rotation: '+id,abs(bone['rotation'][3])<.9999)
     click('#resetSelectedBtn');bone=next(b for b in state()['bones'] if b['id']==id);check('Exact single-bone restore: '+id,math.hypot(*bone['offset'])<1e-8 and abs(bone['rotation'][3]-1)<1e-8)
     if id in ['C1','scaphoid-right','stapes-right','frontal']:page.screenshot(path=str(Q/(PREFIX+'-single-'+id+'.png')))
     page.keyboard.press('Escape');settle()
   reset();region('body');page.locator('#explode').evaluate('(el)=>{el.value="55";el.dispatchEvent(new Event("input",{bubbles:true}));}');settle();s=state()
   check('Full-body expansion moves every independent bone',all(math.dist(b['position'],b['home'])>.01 for b in s['bones']))
   check('Expansion creates no NaN coordinates',all(math.isfinite(v) for b in s['bones'] for v in b['position']))
   click('#ghostBtn');check('Original-position reference retained',state()['ghost'])
   page.screenshot(path=str(Q/(PREFIX+'-exploded.png')));reset()
   check('All 210 positions and orientations restore exactly',all(math.dist(b['position'],b['home'])<1e-8 and abs(b['rotation'][3]-1)<1e-8 for b in state()['bones']))
   region('hand','left');click('#labelsBtn');check('All left-hand bone labels available',page.locator('.bone-label').count()==27);click('#labelsBtn')
   region('head');click('#labelsBtn');check('All head and hyoid labels available',page.locator('.bone-label').count()==29);click('#labelsBtn')
   select('mandible');click('#neighborsBtn');check('Neighbor emphasis retained',state()['neighbors']);click('#neighborsBtn')
   click('#hideSelectedBtn');check('Hide selected bone retained',not next(b for b in state()['bones'] if b['id']=='mandible')['visible']);click('#showAllBtn')
   for q,id in [('寰','C1'),('scaphoid','scaphoid-right'),('deng','stapes-right')]:
    page.locator('#search').fill(q);check('Search '+q,page.locator('[data-bone="'+id+'"]').is_visible())
   page.locator('#search').fill('');click('#colorBtn');check('Group-color mode retained',state()['colors']);click('#colorBtn')
   page.set_viewport_size({'width':1366,'height':768});settle();check('Laptop viewport without horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
   click('#helpBtn');check('Help dialog retained',page.locator('#helpDialog').is_visible());page.locator('#helpDialog [data-close]').first.click()
   click('#sourceBtn');check('Model limitations and 206-bone coverage documented','206' in page.locator('#sourceDialog').inner_text());page.locator('#sourceDialog [data-close]').first.click()
   if BROWSER=='chromium':
    with page.expect_download() as d:page.locator('#captureBtn').click()
    d.value.save_as(str(Q/(PREFIX+'-capture.png')));check('Current-view PNG download retained',(Q/(PREFIX+'-capture.png')).stat().st_size>1000)
  check('No uncaught browser errors',not report['errors'],report['errors']);report['success']=True
 except Exception as e:
  report['failure']=str(e)
  try:page.screenshot(path=str(Q/(PREFIX+'-failure.png')))
  except Exception:pass
  raise
 finally:
  report['finishedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat();(Q/(PREFIX+'-report.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
print('VERIFIED',PREFIX,len(report['checks']),flush=True)
