"""Guarded incremental V10 upgrade. It never edits the accepted V9 directory."""
from pathlib import Path
import hashlib,shutil,re,json
BASE=Path('fullbody-tcm-v9'); OUT=Path('fullbody-tcm-v10'); TOOLS=Path('atlas-v10-upgrade')
assert hashlib.sha256((BASE/'index.html').read_bytes()).hexdigest()=='70acd90b6d022f2563ca3dce5d3bbfcf30a202599f8af3a6681cbb9508a3cc47', 'V9 changed; reconcile before rebuilding'
if OUT.exists():shutil.rmtree(OUT)  # Candidate directory only. CI publication has separate guards.
shutil.copytree(BASE,OUT,ignore=shutil.ignore_patterns('checks','delivery-release.json','app.bundle.js','index.html'))
(OUT/'checks').mkdir()
for f in (TOOLS/'files').iterdir():shutil.copy2(f,OUT/f.name)
def edit(name,fn):
 p=OUT/name;s=p.read_text();p.write_text(fn(s))
def sub(s,a,b,count=1):
 assert a in s,'Missing patch target: '+a[:100]
 return s.replace(a,b,count)
# Correct phrase readings consistently. No global replacement of a Chinese character's every reading.
edit('pronunciation-v5.js',lambda s:s.replace("if(clean.includes('俞'))result=result.replace(/yú/g,'shù');", "// No blanket polyphone substitution: unreviewed phrases retain their recorded spelling.").replace(".replace(/俞/g,'树')",''))
# Term correction now happens once in catalog-v10, used by both 3D and evidence.
edit('speech-v4.js',lambda s:sub(s,"import voiceData", "import {lookupTerm} from './catalog-v10.js';\nimport voiceData").replace("spokenText=speechHint(text);", "spokenText=lookupTerm(text)?.spokenText||speechHint(text);").replace("const guarded=requiresReadingGuard(text)","const guarded=lookupTerm(text)?.readingGuard||requiresReadingGuard(text)").replace("v.name+' · '+v.lang", "v.name+' · '+v.lang+(v.localService?' · 设备本地':' · 在线服务')").replace("synthetic:true,readingGuard:true", "synthetic:true,readingGuard:true,termSource:'catalog-v10',remoteVoicePossible:true"))

def app(s):
 s="import {initStability} from './stability-v10.js';\n"+s
 s=sub(s,"from './bones-data.js';","from './catalog-v10.js';")
 s=sub(s,'let tissueLayer=null,speech=null,richLayers=false;','let tissueLayer=null,speech=null,richLayers=false,studyController=null;\nlet frameRequest=0,framesRendered=0,invalidated=true;\nfunction invalidate(){invalidated=true;if(!frameRequest&&!document.hidden)frameRequest=requestAnimationFrame(animate);}\nwindow.addEventListener("atlas:invalidate",invalidate);')
 s=sub(s,"function setRegion(region,refit=true){", "function setRegion(region,refit=true,options={}){")
 s=sub(s,"if(!state.ready||!REGION_LABELS[region])return;\n state.region=region;", "if(!state.ready||!REGION_LABELS[region])return;\n if(!options.keepStudy)learningEnhancements?.clearStudyContext(true);\n state.region=region;")
 s=sub(s,"selectBone(state.selected,true);if(refit)setView('overview');", "selectBone(state.selected,true);if(refit)setView('overview');if(!options.keepStudy)window.dispatchEvent(new CustomEvent('atlas:region-changed',{detail:{region,name:REGION_LABELS[region][0],side:state.side}}));invalidate();")
 s=sub(s,"state.side=side;state.isolated=false;state.neighbors=false;", "learningEnhancements?.clearStudyContext(true);state.side=side;state.isolated=false;state.neighbors=false;")
 s=sub(s,"updateRegionUI();setExplode(state.explode,false);applyVisibility();selectBone(state.selected,true);setView('overview');","updateRegionUI();setExplode(state.explode,false);applyVisibility();selectBone(state.selected,true);setView('overview');window.dispatchEvent(new CustomEvent('atlas:region-changed',{detail:{region:state.region,name:REGION_LABELS[state.region][0],side}}));")
 # Internal point navigation restores normal anatomy but must not delete the point being focused.
 a=s.index('function prepareReferenceFocus()');b=s.index('async function main()',a)
 part=s[a:b].replace("resetBones(true)","resetBones(true,{keepStudy:true})").replace("setRegion('body',false)","setRegion('body',false,{keepStudy:true})")
 s=s[:a]+part+s[b:]
 s=sub(s,'function resetBones(full=false){','function resetBones(full=false,options={}){if(full&&!options.keepStudy)learningEnhancements?.clearStudyContext(true);')
 s=sub(s,"scene.background.set('#eff2e9');if(UPPER_REGIONS.has(state.region))scene.background.multiplyScalar(2);", "scene.background.set('#eff2e9');")
 # Keep existing controls but send shared commands to the active object.
 s=sub(s,"$('homeBtn').addEventListener('click',()=>resetBones(true));", "$('homeBtn').addEventListener('click',returnToOverview);")
 s=sub(s,"$('focusBtn').addEventListener('click',()=>{if(state.hidden.has(state.selected)){state.hidden.delete(state.selected);applyVisibility();updateTree();}fitToContent(true,null,null,true);});", "$('focusBtn').addEventListener('click',()=>studyController?.focusCurrent());")
 s=s.replace("e.preventDefault();resetBones(true);", "e.preventDefault();returnToOverview();")
 s=s.replace("f:()=>fitToContent(true,null,null,true),h:()=>resetBones(true)","f:()=>studyController?.focusCurrent(),h:returnToOverview")
 s=s.replace('version:"8.0"','version:"10.0.0",framesRendered,onDemand:true,currentTarget:studyController?.getState().current')
 s=s.replace('reset:()=>resetBones(true)','reset:returnToOverview')
 # Public calls and direct pointer operations all invalidate the renderer.
 for old,new in [
  ('function selectBone(id,fromList=false,announce=false){','function selectBone(id,fromList=false,announce=false){invalidate();'),
  ('function applyVisibility(){','function applyVisibility(){invalidate();'),
  ('function setMode(mode){','function setMode(mode){invalidate();'),
  ('function setExplode(percent,fit=true){','function setExplode(percent,fit=true){invalidate();'),
  ('function focusBounds(box,options={}){','function focusBounds(box,options={}){invalidate();'),
  ('function setView(name){','function setView(name){invalidate();'),
  ('function resize(){','function resize(){invalidate();')]:s=sub(s,old,new)
 s=s.replace("el.addEventListener('click',()=>selectBone(id));","el.addEventListener('click',()=>selectBone(id,false,true));")
 s=sub(s,"loader.loadAsync('./assets/fullbody.glb'", "loader.loadAsync((window.ATLAS_RESOURCE_BASE||'./')+'assets/fullbody.glb'")
 # Demand rendering: continue only for controls' damping / camera tween / explicit changes.
 start=s.index('function animate(now)');end=s.index('function saveCapture()',start)
 old=s[start:end]
 old=old.replace('requestAnimationFrame(animate);','frameRequest=0;invalidated=false;',1)
 fps=old.index('const fps=');dt=old.index('const dt=',fps)
 old=old[:fps]+old[dt:]
 old=old.replace('syncCameraUp();controls.update();','syncCameraUp();const moving=controls.update();')
 old=old.replace('composer.render(dt);','composer.render(dt);framesRendered++;')
 old=old.replace("if(previewMesh&&(innerWidth", "if((!studyController||studyController.getState().current.kind==='bone')&&previewMesh&&(innerWidth")
 old=old.rstrip();assert old.endswith('}}')
 old=old[:-1]+"if(cameraTween||moving||invalidated)invalidate();}\n"
 s=s[:start]+old+s[end:]
 start=s.index('function saveCapture()');end=s.index('function bindUI()',start)
 s=s[:start]+'''function saveCapture(){return studyController?.capture().catch(e=>toast('截图失败：'+e.message));}
function returnToOverview(){
 if(!state.ready)return;
 learningEnhancements?.clearStudyContext(true);tissueLayer?.clearSelection();
 state.side='both';resetBones(true);setRegion('body');
 document.body.classList.remove('detail-open','point-detail-active','tissue-detail-active');
 invalidate();
}
'''+s[end:]
 # Explicitly retry whole boot only after errors; no false success message.
 s=sub(s,"function displayError(error){", "function displayError(error){if($('loading'))$('loading').hidden=false;")
 s=sub(s,"$('renderStatus').textContent='模型未就绪';}","$('renderStatus').textContent='模型未就绪';if(!$('v10Fallback')){const n=document.createElement('div');n.id='v10Fallback';n.innerHTML='<button onclick=\"location.reload()\">重试三维</button><a href=\"./evidence.html\">先查阅文字资料</a>';$('loading').querySelector('.loading-card').append(n);}}")
 s=sub(s,"controls.update();scene.add(new THREE.HemisphereLight", "controls.update();controls.addEventListener('change',invalidate);scene.add(new THREE.HemisphereLight")
 s=sub(s,"previewControls.enableDamping=true;", "previewControls.enableDamping=true;previewControls.addEventListener('change',invalidate);")
 # Automated restart event requests a redraw; manual fallback remains accessible if unsupported.
 s=sub(s,"renderer.domElement.addEventListener('webglcontextlost'", "renderer.domElement.addEventListener('webglcontextrestored',()=>{invalidate();toast('三维上下文已恢复');});renderer.domElement.addEventListener('webglcontextlost'")
 s=sub(s,"resizeObserver.observe($('preview'));requestAnimationFrame(animate);", "resizeObserver.observe($('preview'));invalidate();")
 s=sub(s,"ACUPOINTS,speech,prepareReferenceFocus}","ACUPOINTS,speech,prepareReferenceFocus,invalidate}")
 s=sub(s,"setPerformance:on=>{richLayers=on;", "invalidate,setPerformance:on=>{if(richLayers===on)return;richLayers=on;invalidate();")
 end='},speech);setupV4Dock();}'
 assert end in s
 s=s.replace(end,"""},speech);setupV4Dock();
 studyController=initStability({THREE,renderer,camera,viewport,controls,bones,learning:learningEnhancements,tissues:tissueLayer,speech,toast,selectBone,setRegion,returnToOverview,invalidate,boneInfo:id=>BY_ID[id],focusBone:id=>{selectBone(id,true,true);fitToContent(true,null,null,true);},renderNow:()=>{syncAOProjection();composer.render();},flushLabels:()=>{updateLabels();learningEnhancements.flushLabels();}});
 for(const event of ['pointerdown','pointermove','pointerup','wheel','click','input','change','keydown','scroll'])document.addEventListener(event,()=>{invalidate();},{capture:true,passive:event!=='keydown'});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)invalidate();});
 const initialReadyMs=performance.now();window.__ATLAS_PERFORMANCE__={snapshot:()=>({framesRendered,renderScheduled:!!frameRequest,onDemand:true,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,readyMs:initialReadyMs})};
 invalidate();
}""",1)
 return s
edit('app.js',app)

def learning(s):
 s="import {canonicalPoint} from './catalog-v10.js';\n"+s
 s=sub(s,"ctx.ACUPOINTS=ctx.ACUPOINTS.map(p=>({...p,name:evidenceData.points[p.code]?.name||p.name,aliases:evidenceData.points[p.code]?.aliases||[],pinyin:correctedPinyin(evidenceData.points[p.code]?.name||p.name,p.pinyin)}));","ctx.ACUPOINTS=ctx.ACUPOINTS.map(canonicalPoint);")
 s=s.replace("labelMode='complete'","labelMode='smart'",1)
 s=s.replace('aria-pressed="true">完整穴名','aria-pressed="false">就近穴名',1)
 s=sub(s,"function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;", "function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;ctx.invalidate();p=canonicalPoint(p);")
 start=s.index(' function setTCMSide(side){');end=s.index('\n',start)
 s=s[:start]+""" function setTCMSide(side){
  if(!['right','both','left'].includes(side))return;ctx.invalidate();labelPage=0;const prior=selectedPoint;navigationFocus=null;tcmSide=side;
  panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.classList.toggle('active',b.dataset.tcmSide===side));
  if(prior&&prior.side!=='midline'&&side!=='both'){
   const target=pointIndex.get(prior.code+'|'+side);
   if(target){selectPoint(target,autoFocus);return;}
  }
  updateOverlayVisibility();updateStatus();
  if(!prior)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian',id:[...selectedMeridians].join(','),name:[...selectedMeridians].map(id=>meridianMap[id].name).join('＋'),side}}));
 }
"""+s[end:]

 s=sub(s,"detail:{code:p.code}}", "detail:{code:p.code,side:p.side}}")
 s=sub(s,"mountLayerContext();if(autoSpeak())speak(p.name);return true;", "mountLayerContext();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'point',id:p.code,name:p.name,side:p.side}}));if(autoSpeak())speak(p.name);return true;")
 # Manual region changes now use the shared API, not a special DOM-only cleanup.
 s=s.replace("document.querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>{studyContext=null;}));",'')
 s=s.replace("const now=performance.now();if(now-lastLabelsAt<85)return;lastLabelsAt=now;","const now=performance.now();lastLabelsAt=now;")
 s=s.replace("const pool=candidates.filter(x=>x.p!==pin?.p)","const pool=candidates.filter(x=>!(x.p.code===pin?.p.code&&x.p.side===pin?.p.side))")
 # Context labels stay near the selected target; the full paged directory remains opt-in.
 s=sub(s,"let pageItems=labelMode==='complete'?pool.slice(labelPage*slots,(labelPage+1)*slots):pool;", "let pageItems=labelMode==='complete'?pool.slice(labelPage*slots,(labelPage+1)*slots):pool.slice().sort((a,b)=>pin?Math.hypot(a.v.x-pin.v.x,a.v.y-pin.v.y)-Math.hypot(b.v.x-pin.v.x,b.v.y-pin.v.y):0).slice(0,pin?5:8);")
 s=sub(s,"if(selectedMeridians.size===1&&selectedMeridians.has('GV')){ctx.setView('back');fitMeridian();}}","if(selectedMeridians.size===1&&selectedMeridians.has('GV')){ctx.setView('back');fitMeridian();}window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian',id:[...selectedMeridians].join(','),name:[...selectedMeridians].map(id=>meridianMap[id].name).join('＋'),side:tcmSide}}));}")
 # Notify focus/selection invalidation for API and user actions.
 for target in [' function updateOverlayVisibility(){',' function setMeridians(ids){',' function setTCMSide(side){',' function frameNavigation(box,direction,up,title){']:
  s=sub(s,target,target+'ctx.invalidate();')
 s=sub(s,"if(region)ctx.setRegion(region);", "if(region)ctx.setRegion(region,true,{keepStudy:true});")
 s=sub(s,"window.__ATLAS_LEARNING__={", """function clearStudyContext(clearSelection=false){
 studyContext=null;navigationFocus=null;focusSerial++;lastLabelRebuild='';lastLabelsAt=0;
 if(clearSelection){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();document.body.classList.remove('point-detail-active');if($('v9MeridianCard'))$('v9MeridianCard').hidden=true;}
 updateOverlayVisibility();updateStatus();ctx.invalidate();
 }
 window.__ATLAS_LEARNING__={clearStudyContext,focusSelectedPoint:()=>selectedPoint?focusReference(selectedPoint):false,flushLabels:()=>{lastLabelsAt=0;updatePointLabels();},setLabelMode:mode=>{labelMode=mode==='complete'?'complete':'smart';$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'就近穴名';lastLabelRebuild='';ctx.invalidate();},""")
 s=sub(s,"if(selectedPoint)setStudyContext(selectedPoint);updateOverlayVisibility();lastLabelsAt=0;lastLabelRebuild='';},getReferenceWindowState", "if(selectedPoint)setStudyContext(selectedPoint);updateOverlayVisibility();lastLabelsAt=0;lastLabelRebuild='';window.dispatchEvent(new CustomEvent('atlas:precision-changed'));ctx.invalidate();},getReferenceWindowState")
 s=s.replace("version:'9.0-research'","version:'10.0.0',termSource:'catalog-v10'")
 return s
edit('learning-enhancements.js',learning)

def tissues(s):
 s=sub(s,"const r=await fetch('./assets/'+system+'.glb')", "const r=await fetch((window.ATLAS_RESOURCE_BASE||'./')+'assets/'+system+'.glb')")
 s=s.replace("nerves:{m:true,n:true,mo:.12,bo:.18,x:true}","nerves:{m:false,n:true,mo:.12,bo:.32,x:true}")
 s=s.replace("system==='nervous'?'#b97800'", "system==='nervous'?'#744707'")
 s=s.replace("system==='nervous'?'#4b2600'", "system==='nervous'?'#301200'")
 s=sub(s,"async function setProfile(p){","async function setProfile(p){ctx.invalidate();")
 s=sub(s,"async function enable(system,on){","async function enable(system,on){ctx.invalidate();")
 s=sub(s,"s.loading=false;lastKey='';updateFrame();","s.loading=false;lastKey='';updateFrame();ctx.invalidate();")
 s=sub(s,"if(key===lastKey)return;lastKey=key;","if(key===lastKey)return;lastKey=key;ctx.invalidate();")
 s=sub(s,"document.body.classList.add('detail-open');return true;}","document.body.classList.add('detail-open');window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'tissue',id:selected.id,name:selected.name,side:selected.side}}));ctx.invalidate();return true;}")
 s=sub(s,"speech.mount(panel);", "const layerNote=document.createElement('p');layerNote.className='v10-layer-note';layerNote.id='layerModeNote';layerNote.textContent='真实遮挡与透视辅助是显示方式，不改变解剖位置；范围内结构不等于已验证的神经支配关系。';panel.prepend(layerNote);speech.mount(panel);")
 s=sub(s,"if(profile===p){lastKey='';updateFrame();", "if(profile===p){$('layerModeNote').textContent=p==='nerves'?'神经透视辅助：神经不被前方结构遮挡，骨骼作为淡化参照。':'真实遮挡观察：前后关系按模型显示，范围筛选不等于已核验的医学关系。';lastKey='';updateFrame();")
 return s
edit('tissues-v4.js',tissues)
edit('speech-v4.js',lambda s:s.replace("'./voice/'+key", "(window.ATLAS_RESOURCE_BASE||'./')+'voice/'+key"))
# Keep layout and only correct labels that had become stale through incremental versions.
def template(s):
 s=s.replace('V9 · 研究修订','V10 · 稳定修订').replace('V9 · 三维经络研究','V10 · 稳定修订').replace('V9 ·','V10 ·').replace('全身骨骼研习室 —','全身骨骼研习室 V10 —')
 s=s.replace('</head>', '<link rel="stylesheet" href="stability-v10.css"><script>window.ATLAS_RESOURCE_BASE="../fullbody-tcm-v9/";</script></head>')
 s=s.replace('aria-label="腰椎、骨盆与双下肢三维模型"','aria-label="人体解剖与经穴学习三维模型"').replace('聚焦当前骨骼（F）','聚焦当前学习对象（F）').replace('全部归位并恢复视角（H）','返回全身并清除局部观察（H）')
 s=s.replace('一键归位</button>','归位骨骼</button>').replace('模型内置，无数据上传','同站点模型，语音服务另行区分').replace('<strong>本地</strong>','<strong>同站</strong>')
 s=s.replace('没有加入软骨、关节盘、韧带、神经或脊髓；','包含可选肌肉与神经层；尚无完整皮肤、软骨、关节盘和韧带；')
 s=s.replace('本模型是骨表面图谱，不包含软骨、关节囊、韧带、肌腱或骨髓腔。','本模型包含骨骼及可选的软组织层，不包含完整皮肤、关节囊、韧带与微观结构。')
 s=s.replace('<script type="module" src="app.js"></script>','<script src="app.bundle.js" defer></script>')
 s=re.sub(r'<script type="importmap">.*?</script>','',s,flags=re.S)
 s=s.replace('</footer>','<a href="./versions.html" class="v10-source-badge">V10 · 版本记录</a></footer>')
 return s
edit('index.template.html',template)
(OUT/'index.html').write_text((OUT/'index.template.html').read_text())
# Build the evidence page from the accepted layout, but no second embedded copy of the term data.
s=(BASE/'evidence.html').read_text();s=s[:s.index('<script type="application/json"')]
s=s.replace('</style>','</style><link rel="stylesheet" href="stability-v10.css">',1)
s=s.replace('<h1>经脉与经穴 · 证据查阅</h1>', '<h1>经脉与经穴 · 证据查阅</h1><a id="return3d" href="./" style="color:#fff">返回三维观察 ↗</a>')
s=s.replace('max-height:180px','max-height:220px')
(OUT/'evidence.html').write_text(s+'<script src="evidence.bundle.js" defer></script></html>')
# A small auditable starter workbench, not synthetic clinical approval.
data=json.loads((BASE/'evidence-data-v9.json').read_text());chosen=['GV14','PC6','KI3','KI27','LI20']
work=[]
for code in chosen:
 p=data['points'][code];work.append({'code':code,'name':p['name'],'locationSummary':p['location'],'requiredLandmarks':p['requiredLandmarks'],'referencePageHint':p['sourcePage'],'textReview':'pending-original-standard-review','skinMesh':None,'surfaceRegistration':None,'reviewer':None,'measuredError':None,'clinicalApproved':False})
work.append({'code':'EX-YINTANG','name':'印堂','locationSummary':'眉间观察范围；尚无本模型的体表配准。','requiredLandmarks':'眉的内侧端、眉间体表','textReview':'pending-original-standard-review','skinMesh':None,'surfaceRegistration':None,'reviewer':None,'measuredError':None,'clinicalApproved':False})
(OUT/'calibration-pilot.json').write_text(json.dumps({'scope':'Representative registration workflow, not completed clinical calibration','cases':work},ensure_ascii=False,indent=2))
(OUT/'calibration.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>定位校准工作台</title><style>body{font:16px/1.8 system-ui;margin:32px auto;padding:0 20px;max-width:960px;color:#294b3c;background:#f4f6ee}article{padding:18px;background:white;border:1px solid #cddac8;border-radius:12px;margin:14px 0}a{color:#24684e}small{display:block}code{overflow-wrap:anywhere}</style><a href="./">返回三维</a> · <a href="./evidence.html">查阅资料</a><h1>定位校准工作台</h1><p>本轮建立6个代表条目的可追溯核对流程，没有伪造皮肤配准、专业审核或误差。0个坐标已通过完整定位审核。</p><div id="cases"></div><p><a href="calibration-pilot.json" download>导出核对清单 JSON</a> · <a href="coordinate-audit.csv" download>原361穴审核清单</a></p><script>fetch('calibration-pilot.json').then(r=>r.json()).then(d=>{for(const p of d.cases){const a=document.createElement('article'),h=document.createElement('h2'),desc=document.createElement('p'),small=document.createElement('small'),link=document.createElement('a');h.textContent=p.name+' '+p.code;desc.textContent=p.locationSummary;small.textContent='待确认标志：'+p.requiredLandmarks+'。皮肤配准、独立复核、实测误差：均未完成。';link.textContent='在三维中查看相关部位';link.href='./#kind=point&id='+encodeURIComponent(p.code)+'&mode=strict';a.append(h,desc,small,link);document.getElementById('cases').append(a);}});</script></html>''')
(OUT/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习 · 版本记录</title><style>body{font:16px/1.9 system-ui;max-width:760px;margin:40px auto;padding:0 20px;background:#f4f6ee;color:#315241}a{color:#24684e}</style><h1>人体研习 · 版本记录</h1><p><a href="../anatomy/">固定访问入口</a> · <a href="./">V10 稳定修订</a></p><p>保留旧界面与模型；统一术语、当前对象与聚焦，修复截图标注和说明页联动，在线模型独立加载，静止阅读按需绘制。</p><p>定位审核仍未完成；本轮未新增经穴坐标，也未逐条重制审听音频。</p><p><a href="../fullbody-tcm-v9/">V9 研究版</a> · <a href="../fullbody-tcm-v8/">V8</a> · <a href="../foot-atlas/">最初足骨版</a></p><p><a href="delivery-release.json">本次验证记录</a> · <a href="calibration.html">定位校准工作台</a></p></html>''')
(OUT/'README.md').write_text('''# V10 稳定修订\n\n保留V9布局、全部模型、原经穴示意坐标。没有新建取穴坐标或宣称临床校准。\n\n统一术语导出在term-catalog.json；三维与文字资料均使用catalog-v10。选择、聚焦、朗读与截图统一当前对象。返回整体清除局部范围；切层不改变当前点位。截图含可见穴名与定位状态。说明页支持对象深链接并回到三维。\n\n在线首页不嵌入骨模型；固定版本的骨骼/肌肉/神经/音频从同站V9目录加载复用缓存。需要保持V9资源可用。独立离线包另行生成。静止阅读按需绘制。\n\n定位流程：calibration.html列出6个代表条目的待校准记录；尚未取得体表配准、独立复核或实测误差。没有重新逐条审听音频；设备语音可能为在线服务。没有为共享notionweb仓库擅自更改分支保护设置。\n\n实际浏览器检查见checks/和delivery-release.json。无性能基准的真实设备不宣称普遍流畅。源模型和语音内容未改，许可仍见MODEL-LICENSES.txt。\n''')
(OUT/'build-info.json').write_text(json.dumps({'version':'10.0.0','baseCommit':'9bc00022e97fad7613c9d8ba576146b57abb302f','base':'V9','sourceHTMLSHA256':'70acd90b6d022f2563ca3dce5d3bbfcf30a202599f8af3a6681cbb9508a3cc47','modelsUnchanged':True,'coordinatesUnchanged':True,'clinicalCalibration':False,'allAudioHumanReviewed':False,'sharedResourceBase':'../fullbody-tcm-v9/','pilotCases':6,'onlineHTMLBytes':(OUT/'index.html').stat().st_size},ensure_ascii=False,indent=2))
print('Prepared guarded V10',OUT)
