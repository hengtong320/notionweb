"""Real browser verification with recorded software-rendering density."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,hashlib,subprocess,time,traceback
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'lumbar-atlas';OUT=BASE/'qa';OUT.mkdir(exist_ok=True)
engine=os.environ.get('BROWSER','chromium');url=os.environ.get('LIVE_URL');mode='live' if url else ('webkit' if engine=='webkit' else 'offline')
html=(BASE/'index.html').read_bytes();meta=json.loads((BASE/'assets/provenance.json').read_text());info=json.loads((BASE/'build-info.json').read_text())
report={'success':False,'browser':engine,'mode':mode,'url':url or 'self-contained local HTML','htmlSHA256':hashlib.sha256(html).hexdigest(),'deviceScaleFactor':0.65,'checks':[],'errors':[],'requests':[]}
def check(name,ok,detail=None):
 report['checks'].append({'name':name,'pass':bool(ok),**({'detail':detail} if detail is not None else {})});print(('PASS ' if ok else 'FAIL ')+name,flush=True);assert ok,name
with sync_playwright() as p:
 opts={'headless':True}
 if engine=='chromium':opts['args']=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']
 browser=getattr(p,engine).launch(**opts)
 try:
  report['browserVersion']=browser.version
  context=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=0.65,service_workers='block')
  if not url:context.route('http://**/*',lambda r:r.abort());context.route('https://**/*',lambda r:r.abort())
  page=context.new_page();page.set_default_timeout(45000)
  page.on('pageerror',lambda e:report['errors'].append(str(e)));page.on('console',lambda m:report['errors'].append(m.text) if m.type=='error' else None)
  page.on('request',lambda r:report['requests'].append(r.url) if r.url.startswith(('http:','https:')) else None)
  if url:
   res=page.goto(url,wait_until='load',timeout=90000);check('Public HTML HTTP 200',res.status==200);check('Public HTML equals tested artifact',hashlib.sha256(res.body()).hexdigest()==report['htmlSHA256'])
  else:page.goto((BASE/'index.html').as_uri(),wait_until='load',timeout=90000)
  page.wait_for_function('window.__FOOT_ATLAS__?.getState().ready',timeout=90000)
  def state():return page.evaluate('window.__FOOT_ATLAS__.getState()')
  def settle():
   page.wait_for_function('!window.__FOOT_ATLAS__.getState().cameraAnimating');page.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
  def click(sel):page.locator(sel).click();settle()
  def region(r):click('[data-region="'+r+'"]')
  def side(s):click('[data-side="'+s+'"]')
  def select(i):click('[data-select="'+i+'"]')
  def view(v):click('[data-view="'+v+'"]')
  def capture(n):settle();page.screenshot(path=str(OUT/(mode+'-'+n+'.png')))
  settle();s=state();check('73 independently loaded bones',s['count']==73 and s['visible']==73);check('Default displays both legs and lumbar spine',s['side']=='both' and s['region']=='all')
  check('All source triangles retained',sum(b['triangles'] for b in s['bones'])==meta['totalTriangles']);check('All original 36 bone coordinates unchanged',meta['approvedHipPreserved'] and meta['maxPriorCoordinateErrorMillimeters']==0)
  check('32 left/right anatomical pairs verified',len(meta['sideChecks'])==32 and all(x['pass'] for x in meta['sideChecks']))
  if (ROOT/'.git').exists():check('All four approved directories remain unchanged',not subprocess.check_output(['git','diff',info['baseRef'],'--','foot-atlas/','ankle-atlas/','knee-atlas/','hip-atlas/'],cwd=ROOT))
  check('No external engine or model requests',len(report['requests'])==(1 if url else 0),report['requests']);capture('01-both-legs')
  counts={'foot':56,'ankle':60,'leg':60,'knee':8,'whole':64,'hip':4,'pelvis':4,'pelvic-limb':68,'lumbar':5,'lumbosacral':9,'all':73}
  for r,n in counts.items():
   region(r);s=state();check('Region '+r+' bone count',s['visible']==n,s['visible']);check('Region '+r+' camera finite',all(isinstance(x,(int,float)) and abs(x)<100000 for x in s['camera']+s['target']))
   if r in ['lumbar','lumbosacral','foot','hip']:capture(r)
  region('foot');side('right');check('Right foot only',state()['visible']==28 and all(not b['id'].endswith('-left') for b in state()['bones'] if b['visible']))
  view('medial');s=state();check('Right medial view looks from body midline',s['camera'][0]>s['target'][0]);side('left');check('Left foot only',state()['visible']==28 and all(b['id'].endswith('-left') for b in state()['bones'] if b['visible']))
  view('medial');s=state();check('Left medial view reverses camera correctly',s['camera'][0]<s['target'][0]);view('lateral');s=state();check('Left lateral view reverses camera correctly',s['camera'][0]>s['target'][0]);view('overview');capture('left-foot')
  region('all');check('Left scope retains pelvis and lumbar',state()['visible']==41);side('right');check('Right scope retains pelvis and lumbar',state()['visible']==41);side('both');view('front')
  positions=page.evaluate("({r:window.__FOOT_ATLAS__.projectBone('femur'),l:window.__FOOT_ATLAS__.projectBone('femur-left')})")
  check('Anterior view patient right appears screen left',positions['r']['x']<positions['l']['x']);check('Laterality explanation visible','人体自身' in page.locator('#sideNotice').inner_text());capture('02-front-laterality')
  ids=[b['id'] for b in state()['bones']]
  for i in (ids if mode=='offline' else ['femur-left','talus-left','L1','L5']):
   select(i);check('Chinese identification '+i,state()['selected']==i and len(page.locator('#description').inner_text())>6)
  select('hip-left');check('Left hip explicitly links left femur',page.locator('[data-neighbor="femur-left"]').count()==1)
  select('sacrum');check('Sacrum links new L5',page.locator('[data-neighbor="L5"]').count()==1)
  for i in range(1,6):
   select('L'+str(i));check('Lumbar L'+str(i)+' is independent',state()['selected']=='L'+str(i));click('#isolateBtn');check('Isolate L'+str(i),state()['visible']==1);page.keyboard.press('Escape');settle()
  for q,n in [('左股骨',1),('L3',1),('腰椎',5),('髌',2)]:
   page.locator('#search').fill(q);check('Search '+q,page.locator('.bone-row:visible').count()==n);page.locator('#search').fill('')
  samples=[('talus','foot','right'),('femur','whole','right'),('talus-left','foot','left'),('femur-left','whole','left'),('patella-left','knee','left'),('tibia-left','leg','left'),('fibula-left','leg','left')]+[('L'+str(i),'lumbar','both') for i in range(1,6)]
  if mode=='live':samples=[('femur-left','whole','left'),('L3','lumbar','both')]
  if mode=='webkit':samples=[('talus-left','foot','left'),('L5','lumbar','both')]
  for ident,r,si in samples:
   region('all');side(si);region(r);click('#homeBtn');select(ident)
   point=None
   for v in ['overview','front','back','medial','lateral','dorsal']:
    view(v);point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',ident)
    if point:break
   check('Assembled bone raycast '+ident,bool(point));page.mouse.click(point['x'],point['y']);settle();check('Actual mouse selects '+ident,state()['selected']==ident)
   click('[data-mode="move"]');point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',ident);before=state()['camera']
   page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+58,point['y']-25,steps=4);page.mouse.up();settle();s=state()
   check('Drag moves only '+ident,len([b for b in s['bones'] if sum(v*v for v in b['offset'])>.01])==1 and sum(v*v for v in next(b for b in s['bones'] if b['id']==ident)['offset'])>1)
   check('Bone drag does not orbit '+ident,sum((a-b)**2 for a,b in zip(s['camera'],before))<.01)
   if ident in ['L3','femur-left']:click('#ghostBtn');capture(ident+'-separated');click('#ghostBtn')
   click('#resetBonesBtn');click('[data-mode="rotate"]');point=page.evaluate('(id)=>window.__FOOT_ATLAS__.getPickPoint(id)',ident)
   page.mouse.move(point['x'],point['y']);page.mouse.down();page.mouse.move(point['x']+32,point['y']+20,steps=4);page.mouse.up();settle();b=next(b for b in state()['bones'] if b['id']==ident);check('Independent rotation '+ident,abs(b['rotation'][3]-1)>.001)
   click('#resetSelectedBtn');check('Exact restoration '+ident,all(sum((x-y)**2 for x,y in zip(b['position'],b['home']))<1e-10 and abs(b['rotation'][3]-1)<1e-8 for b in state()['bones']))
   click('#isolateBtn');check('Single-bone study '+ident,state()['visible']==1);page.keyboard.press('Escape');settle()
  region('all');side('both');click('#homeBtn');page.locator('#explode').evaluate("e=>{e.value='55';e.dispatchEvent(new Event('input',{bubbles:true}));}");settle();s=state()
  check('All 73 bones separate',s['explode']==55 and all(sum((x-y)**2 for x,y in zip(b['position'],b['home']))>.01 for b in s['bones']))
  click('#labelsBtn');check('73 labels exist',page.locator('.bone-label').count()==73);capture('03-expanded');click('#labelsBtn');click('#homeBtn')
  region('lumbar');select('L3');click('#neighborsBtn');check('Neighbor emphasis',state()['neighbors']);click('#neighborsBtn');click('#hideSelectedBtn');check('Hide selected',state()['visible']==4);click('#showAllBtn');check('Show all respects lumbar scope',state()['visible']==5)
  region('foot');side('right');select('femur-left');check('Cross-side selection reveals left bone',state()['side']=='left' and next(b for b in state()['bones'] if b['id']=='femur-left')['visible'])
  region('lumbar');view('medial');capture('04-lumbar-side');page.set_viewport_size({'width':1366,'height':768});settle();check('Laptop has no horizontal overflow',page.evaluate('document.documentElement.scrollWidth<=innerWidth'));capture('05-laptop')
  click('#helpBtn');check('Help retained',page.locator('#helpDialog').is_visible());page.locator('#helpDialog [data-close]').last.click();click('#sourceBtn');check('Source explains missing discs','椎间盘' in page.locator('#sourceDialog').inner_text());page.locator('#sourceDialog [data-close]').click()
  with page.expect_download() as dl:page.locator('#captureBtn').click()
  dl.value.save_as(str(OUT/(mode+'-capture.png')));check('Capture download retained',(OUT/(mode+'-capture.png')).stat().st_size>5000)
  check('No JavaScript or shader errors',not report['errors'],report['errors']);report['success']=True
 except Exception as e:
  report['failure']=str(e);report['errors'].append(str(e));traceback.print_exc()
  try:page.screenshot(path=str(OUT/(mode+'-failure.png')),timeout=15000)
  except Exception:pass
 finally:
  report['finishedAt']=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime());(OUT/(mode+'-report.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2));browser.close()
print('SUMMARY',mode,report['success'],len(report['checks']),flush=True)
if not report['success']:raise SystemExit(1)
