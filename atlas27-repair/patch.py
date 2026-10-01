"""Small, reversible display repair on V26, preserving all anatomy."""
from pathlib import Path
import shutil,json,hashlib
src=Path('fullbody-tcm-v26');p=Path('fullbody-tcm-v27');tools=Path('atlas27-repair')
assert src.exists() and not p.exists()
assert hashlib.sha256((src/'app.bundle.js').read_bytes()).hexdigest()=='cc825ab442b39c0f5f4d72c829ed6ceb1cc9d7c5517fb29229375d9c02f2ed73','V26 changed; review before patching'
shutil.copytree(src,p);shutil.rmtree(p/'checks',ignore_errors=True);(p/'checks').mkdir()
for n in ['release.json','build-info.json','phone-final-build.json']:(p/n).unlink(missing_ok=True)
def edit(n,a,b):
 f=p/n;s=f.read_text();assert a in s,(n,a[:80]);f.write_text(s.replace(a,b,1))
for f in p.iterdir():
 if f.suffix in ['.js','.html','.css','.md'] and f.name!='app.bundle.js':
  s=f.read_text().replace('26.0.0','27.0.0').replace('V26 · 经络阅读与观察','V27 · 观察与标注同步')
  f.write_text(s)
shutil.copy2(tools/'label-layout.js',p/'meridian-layout-v26.js');shutil.copy2(tools/'observation.js',p/'observation-v27.js')
edit('app.js',"import {initMeridianExperience}","import {initObservationV27} from './observation-v27.js';\nimport {initMeridianExperience}")
edit('app.js',' initMeridianExperience({learning:learningEnhancements,invalidate});',' initMeridianExperience({learning:learningEnhancements,invalidate});\n initObservationV27({THREE,camera,controls,state,learning:learningEnhancements,captureCamera,syncCameraUp,invalidate});')
edit('learning-enhancements.js',"import {placeLabels}","import {placeLabels,labelSlots,placeCompleteLabels}")
edit('learning-enhancements.js',"  studyContext=null;\n  prepareNavigation();toggleTCM(true);labelPage=0;", "  const previousDirection=camera.position.clone().sub(controls.target).normalize().toArray(),previousUp=camera.up.toArray();\n  studyContext=null;\n  if($('localStudyToggle')){$('localStudyToggle').checked=false;$('localStudyToggle').dispatchEvent(new Event('change',{bubbles:true}));}\n  prepareNavigation();toggleTCM(true);labelPage=0;")
edit('learning-enhancements.js',"requestedDirection||dir,[0,1,0],ids.map(id=>meridianMap[id].short).join('＋')", "requestedDirection||previousDirection,requestedDirection?(Math.abs(requestedDirection[1])>.9?[0,0,1]:[0,1,0]):previousUp,ids.map(id=>meridianMap[id].short).join('＋')")
edit('learning-enhancements.js',"getLabelPlacementAudit:()=>labelPlacementAudit,", "getObservationState:()=>({active:enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')}),getLabelPerformance:()=>({...labelWork}),getLabelPlacementAudit:()=>labelPlacementAudit,")
edit('learning-enhancements.js',"let labelOffsets=new Map(),labelPlacementAudit=[],labelRefreshTimer=0;", "let labelOffsets=new Map(),labelPlacementAudit=[],labelRefreshTimer=0,labelFingerprint='';let labelSceneRevision=0;const labelWork={computed:0,skipped:0};for(const ev of ['atlas:selection','atlas:transition-settled','atlas:tcm-visibility','atlas:region-changed'])window.addEventListener(ev,()=>{labelSceneRevision++;});for(const ev of ['change','pointerup'])document.addEventListener(ev,()=>{labelSceneRevision++;},{capture:true,passive:true});")
edit('learning-enhancements.js',"  const all=getVisiblePoints(),inView=", "  const fingerprint=[labelSceneRevision,lastSkinPaintVisible,camera.matrixWorld.elements.join(','),camera.projectionMatrix.elements.join(','),w,h,labelMode,labelPage,selectedPoint?.code,selectedPoint?.side,[...selectedMeridians].join(','),tcmSide,state.side,referenceBody,studyContext?.code,JSON.stringify(studyContext),$('localStudyToggle')?.checked,xray,JSON.stringify(obstacles)].join('|');\n  if(paintedSkinVisible()&&labelFingerprint===fingerprint&&lastLabelRebuild){labelWork.skipped++;return;}labelFingerprint=fingerprint;labelWork.computed++;\n  const all=getVisiblePoints(),inView=")
edit('learning-enhancements.js',"if(!ready){wires.innerHTML='';labelPlacementAudit=[];return;}", "if(!ready){wires.innerHTML='';labelPlacementAudit=[];labelFingerprint='';return;}")
s=(p/'learning-enhancements.js').read_text();a=s.index('  const top=Math.max(75,...obstacles.filter');b=s.index('  }else{\n   let ordered=[];',a)
s=s[:a]+'''  const anchorObstacles=candidates.map(x=>({x:x.v.x-rect.left,y:x.v.y-rect.top}));
  const availableSlots=labelSlots({width:w,height:h,obstacles,anchors:anchorObstacles,labelWidth:phone?126:140,labelHeight:phone?32:28});
  const capacity=availableSlots.length,slots=Math.max(1,capacity-(pin?1:0)),pages=Math.max(1,Math.ceil(pool.length/slots));
  labelPage=Math.max(0,Math.min(labelPage,pages-1));let placements;
  if(labelMode==='complete'){
   const items=[...(pin?[pin]:[]),...pool.slice(labelPage*slots,(labelPage+1)*slots)].slice(0,capacity);
   placements=placeCompleteLabels(items.map(item),availableSlots);
''' +s[b:]
s=s.replace('width:w,height:h,obstacles,limit:phone?', 'width:w,height:h,obstacles,anchors:anchorObstacles,limit:phone?')
s=s.replace("el.textContent=x.p.name+' '+x.p.code+(x.p.side==='midline'?'':x.p.side==='right'?' R':' L');", "el.textContent=x.p.name+' '+x.p.code+(x.p.side==='midline'?'':x.p.side==='right'?' · 右':' · 左');el.setAttribute('aria-label',x.p.name+' '+x.p.code+' · '+(x.p.side==='midline'?'人体中线':x.p.side==='right'?'人体右侧':'人体左侧'));")
s=s.replace("$('labelPrevious').disabled=labelMode!=='complete'||!labelPage;$('labelNext').disabled=labelMode!=='complete'||labelPage>=pages-1;", "$('labelPrevious').disabled=labelMode!=='complete'||!capacity||!labelPage;$('labelNext').disabled=labelMode!=='complete'||!capacity||labelPage>=pages-1;if(labelMode==='complete'&&!capacity)$('labelPageInfo').textContent='空间不足，请收起面板或调整视角';")
(p/'learning-enhancements.js').write_text(s)
f=p/'meridian-ux-v26.css';f.write_text(f.read_text()+'''\n/* V27 current camera and point-to-label correspondence. */
.v26-orientation button.active{background:#356d59;color:white;border-color:#356d59}
.meridian-v26 #acupointLabels .acu-name.v6-label{font-size:12px;letter-spacing:0}
''')
unchanged=[f.name for f in src.glob('*.json') if f.name not in ['build-info.json','release.json','phone-final-build.json','invariants.json']]
for n in unchanged:assert (p/n).read_bytes()==(src/n).read_bytes(),n
(p/'README.md').write_text('''# V27 观察与标注同步

在 V26 上修正经络观察过程中的方向和标签冲突，不改编号穴位、经络几何、原始人体或模型来源。

- 顶部与经络面板的方向按钮共同读取实际镜头方向。拖动后如不再对准标准面，标记自由视角；切换男女及点选聚焦后不再残留错误方向高亮。
- 经络显示时方向按钮只旋转当前观察范围，不会突然跳回全身；“看全线”保持观察方向并关闭局部裁切，明确恢复全部线路。
- 完整穴名依据真实可用空间排版分页，避开顶部、侧边及手机详情面板；附近与完整穴名均避让屏幕上的点中心。引线从名称边界连向落点，中文左右侧取代 R/L。
- 镜头、选点和界面没有变化时复用标签结果，不重复执行全部遮挡射线与布局计算；这不是实体手机帧率保证。

## 边界

此次没有修改穴位的临床定位；仍为待逐穴复核的学习示意。原始路线弯折及网格缺口保留，不以美观为理由挪点。检查分为 V26 基线、V27 候选与公开网址，具体视口和断言记录在 checks。V26 保留回退。
''',encoding='utf-8')
(p/'versions.html').write_text('''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>人体研习室 V27</title><style>body{font:16px/1.8 system-ui;max-width:740px;padding:30px;margin:auto;background:#f3f6ed;color:#315842}a{color:#246a50}</style><h1>V27 · 观察与标注同步</h1><p>标准方向高亮随镜头同步；转向保留局部放大程度，看全线保留方向；穴名避让实点及界面，完整穴名根据可用空间分页。</p><p>仅显示与交互修复，穴位未逐穴临床校准。</p><p><a href="./">进入当前版本</a> · <a href="../anatomy/">固定入口</a> · <a href="../fullbody-tcm-v26/">V26 回退</a></p></html>''')
(p/'invariants.json').write_text(json.dumps({'unchangedJSON':unchanged,'clinicalCalibration':False},indent=2))
print('Prepared V27; immutable JSON',len(unchanged))
