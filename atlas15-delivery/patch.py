from pathlib import Path
import shutil
base=Path('fullbody-tcm-v14');dst=Path('fullbody-tcm-v15')
if dst.exists():shutil.rmtree(dst)
shutil.copytree(base,dst,ignore=shutil.ignore_patterns('checks','delivery-release.json','build-info.json'))
(dst/'checks').mkdir()
def change(name,old,new):
 p=dst/name;s=p.read_text();assert old in s,(name,old[:100]);p.write_text(s.replace(old,new))
# Preserve original lateral offsets which the old same-height corridor mapping erased.
p=dst/'route-corridors-v13.js';s=p.read_text();a=s.index('export function correctRegionalReferences');b=s.index('export function createRegionalGuides',a)
s=s[:a]+r'''export function correctRegionalReferences(points){
 const revised=points.map(p=>{const m=p.code?.replace(/\d+$/,''),i=Number(p.code?.match(/\d+$/)?.[0]),c=settings[m];if(!c||!p.position||i<c.first||i>c.last)return p;const next=corridorPosition(m,p.position[1]);if(!next)return p;return {...p,originalPosition:[...p.position],position:next,navigationRevision:15,positionQuality:'regional-corridor-reference',navigationOnly:true,method:'既有部位参照；未完成逐穴定位配准'};});
 for(let i=0;i<revised.length;i++){const p=revised[i];if(!p.originalPosition)continue;for(let j=0;j<i;j++){const q=revised[j];if(!q.originalPosition||p.code.replace(/\d+$/,'')!==q.code.replace(/\d+$/,''))continue;
 if(p.position.every((v,k)=>Math.abs(v-q.position[k])<1e-7)&&p.originalPosition.some((v,k)=>Math.abs(v-q.originalPosition[k])>1e-5)){p.position=p.position.map((v,k)=>v+p.originalPosition[k]-q.originalPosition[k]);p.method+='；保留原参照同高度横向差异，防止整理函数合并不同穴名';break;}}
 }return revised;
}
'''+s[b:];p.write_text(s)
# Filter changes clear the old clipping volume, never reset a user's camera.
change('learning-enhancements.js',"function setMeridians(ids){ctx.invalidate();labelPage=0;", "function setMeridians(ids){ctx.invalidate();labelPage=0;window.__FOOT_ATLAS__?.captureCamera();studyContext=null;navigationFocus=null;focusSerial++;lastReferenceWindowKey='';")
change('learning-enhancements.js',"clearSelectedMarker();}updateOverlayVisibility();renderResults();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'meridian'", "clearSelectedMarker();}syncReferenceWindow();updateOverlayVisibility();renderResults();window.dispatchEvent(new CustomEvent('atlas:selection',{detail:selectedPoint?{kind:'point',id:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side}:{kind:'meridian'")
change('learning-enhancements.js',"setMeridian(r.meridian);setTCMSide(r.side==='midline'?'both':r.side);toast(meridianMap[r.meridian].name+' · 已选择，视角保持');", "clearStudyContext(true);toast(meridianMap[r.meridian].name+' · 对照选择与视角保持');")
change('learning-enhancements.js',"side:selectedPoint.side,position:null},true);}","side:selectedPoint.side,position:null},autoFocus);}")
change('learning-enhancements.js',"const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);if(d<bestDistance&&(!surfaceAttached||surfaceProjector.isVisible(g.points[i-1].clone().lerp(g.points[i],t),camera.position)))", "const world=g.points[i-1].clone().lerp(g.points[i],t),box=referenceWindow();if(box&&!box.containsPoint(world))continue;const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);if(d<bestDistance&&pointUnoccluded({position:world}))")
change('learning-enhancements.js',"if(labels.hidden)return;", "if(labels.hidden){wires.innerHTML='';return;}")
change('learning-enhancements.js',"const pin=sp&&inView(sp.v)?sp:null;", "const pin=sp&&inView(sp.v)&&getVisiblePoints().some(p=>p.code===sp.p.code&&p.side===sp.p.side)&&pointUnoccluded(sp.p)?sp:null;")
change('learning-enhancements.js',"if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;}","if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;wires.innerHTML='';}")
# Compute offscreen, publish all points/lines together, and honor the last requested state.
p=dst/'learning-enhancements.js';s=p.read_text();start=s.index(' async function setSurfaceAttachment(on){');end=s.index('\n window.__ATLAS_LEARNING__=',start)
s=s[:start]+''' let surfaceDesired=false,surfaceTask=null;
 function setSurfaceAttachment(on){
  surfaceDesired=!!on;
  if(surfaceTask)return surfaceTask;
  if(surfaceAttached===surfaceDesired)return Promise.resolve(true);
  surfaceBusy=true;
  surfaceTask=(async()=>{try{
   while(surfaceAttached!==surfaceDesired){
    const target=surfaceDesired;if(target&&!surfaceProjector){surfaceDesired=false;return false;}
    const pending=[];
    for(const r of routeRecords){
     const anchors=r.data.map(p=>{if(!p.sourcePosition)p.sourcePosition=p.position.clone();return {code:p.code,source:p.sourcePosition,point:target?surfaceProjector.project(p.sourcePosition,2.2,{meridian:r.meridian,side:r.side,region:p.region,view:p.view}):p.sourcePosition.clone(),region:p.region,view:p.view};});
     const guides=[];
     for(const g of r.guides){
      if(!g.sourcePoints){g.sourcePoints=g.points.map(v=>v.clone());g.sourceGeometry=g.tube.geometry;}
      if(target&&!g.projected)g.projected=surfaceProjector.curve(g.sourcePoints,{meridian:r.meridian,side:r.side,anchors});
      guides.push({g,value:target?g.projected:{points:g.sourcePoints,geometry:g.sourceGeometry}});
     }
     pending.push({r,anchors,guides});
     await new Promise(resolve=>setTimeout(resolve,0));
     if(target!==surfaceDesired)break;
    }
    if(target!==surfaceDesired)continue;
    for(const {r,anchors,guides} of pending){
     r.data.forEach((p,i)=>p.position.copy(anchors[i].point));
     for(const {g,value}of guides){g.tube.geometry=value.geometry;g.points=value.points;
      const geometry=new LineGeometry().setPositions(g.points.flatMap(v=>v.toArray()));const old=g.guide.geometry;g.guide.geometry=geometry;g.border.geometry=geometry;old.dispose();g.guide.computeLineDistances();g.border.computeLineDistances();}
    }
    surfaceAttached=target;surfaceBadge.hidden=!target;lastReferenceWindowKey='';lastLabelRebuild='';lastLabelsAt=0;
    if(target){xray=false;if($('tcmXray'))$('tcmXray').checked=false;}
    if(selectedPoint?.position){const p=pointIndex.get(selectedPoint.code+'|'+selectedPoint.side);if(p){selectedPoint={...selectedPoint,position:p.position};if(selectedMarker)selectedMarker.geometry.setFromPoints([p.position]);if(studyContext)setStudyContext(selectedPoint);}}
    syncReferenceWindow();updateOverlayVisibility();ctx.invalidate();
   }return true;
  }finally{surfaceBusy=false;surfaceTask=null;}})();return surfaceTask;
 }
''' + s[end:]
s=s.replace('handlePointerClick,hitPoint,','handlePointerClick,hitRoute,hitPoint,')
s=s.replace("version:'13.0.0'","version:'15.0.0'").replace('navigationRevision:13','navigationRevision:15')
s=s.replace('getSurfaceState:()=>({attached:surfaceAttached,','getSurfaceState:()=>({attached:surfaceAttached,desired:surfaceDesired,busy:surfaceBusy,')
s=s.replace("clearPointSelection:()=>{selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();updateStatus();}","clearPointSelection:()=>{selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();clearStudyContext(false);updateStatus();}")
s=s.replace('getSurfaceState:()=>', '''getDisplayAudit:()=>{
 const rows=[];for(const r of routeRecords)for(const p of r.data){const expected=surfaceAttached?surfaceProjector.project(p.sourcePosition||p.position,2.2,{meridian:r.meridian,side:r.side,region:p.region,view:p.view}):(p.sourcePosition||p.position);let gap=Infinity;for(const g of r.guides)for(let i=1;i<g.points.length;i++)gap=Math.min(gap,new THREE.Line3(g.points[i-1],g.points[i]).closestPointToPoint(p.position,true,new THREE.Vector3()).distanceTo(p.position));rows.push({code:p.code,name:p.name,side:p.side,position:p.position.toArray(),expected:expected.toArray(),secondaryShift:p.position.distanceTo(expected),lineGap:gap});}
 const collisions=[];for(let i=0;i<rows.length;i++)for(let j=0;j<i;j++)if(rows[i].side===rows[j].side&&rows[i].position.every((v,k)=>Math.abs(v-rows[j].position[k])<1e-6))collisions.push([rows[j].code,rows[i].code,rows[i].side]);
 return {source:'display consistency only; not anatomical calibration',count:rows.length,attached:surfaceAttached,collisions,maxSecondaryShift:Math.max(...rows.map(p=>p.secondaryShift)),maxLineGap:Math.max(...rows.map(p=>p.lineGap)),points:rows};},getSurfaceState:()=>''')
p.write_text(s)
# Curves interpolate authoritative independently projected reference points, not vice versa.
p=dst/'surface-v13.js';s=p.read_text();old="refs=c.getSpacedPoints(count),raw=refs.map(v=>project(v,2.2,context)),points=[],samples=[];";assert old in s
s=s.replace(old,"""initial=c.getSpacedPoints(count),events=initial.map((source,i)=>({source,order:i,anchor:null})),points=[],samples=[];
  for(const a of context.anchors||[]){let best=null,d=Infinity;for(let i=1;i<initial.length;i++){const line=new THREE.Line3(initial[i-1],initial[i]),q=line.closestPointToPoint(a.source,true,new THREE.Vector3()),n=q.distanceToSquared(a.source);if(n<d){d=n;best={order:i-1+line.closestPointToPointParameter(a.source,true)};}}if(best&&d<144)events.push({source:a.source.clone(),order:best.order,anchor:a});}
  events.sort((a,b)=>a.order-b.order||Number(!!a.anchor)-Number(!!b.anchor));
  const clean=[];for(const e of events){if(clean.length&&e.source.distanceToSquared(clean.at(-1).source)<1e-8){if(e.anchor)clean[clean.length-1]=e;}else clean.push(e);}
  const refs=clean.map(e=>e.source),raw=clean.map(e=>e.anchor?e.anchor.point.clone():project(e.source,2.2,context)),fixed=new Set();""")
s=s.replace("if(raw[i-1].distanceTo(raw[i+1])<9", "if(!clean[i].anchor&&raw[i-1].distanceTo(raw[i+1])<9")
s=s.replace("}else{points.push(raw[i].clone());samples.push({source:refs[i].clone(),point:raw[i].clone()});}}", "}else{points.push(raw[i].clone());samples.push({source:refs[i].clone(),point:raw[i].clone()});}if(clean[i].anchor)fixed.add(points.length-1);}")
s=s.replace("for(let i=1;i<sm.length-1;i++){const v=", "for(let i=1;i<sm.length-1;i++){if(fixed.has(i))continue;const v=")
s=s.replace('points:sm,samples};','points:sm,samples,anchorCount:fixed.size};')
p.write_text(s)
change('tissues-v4.js','surfaceProjector=null,viewSerial=0;', 'surfaceProjector=null,viewSerial=0,attachmentSerial=0;')
change('tissues-v4.js',"if(system==='surface'&&!on){ctx.learning.setSurfaceAttachment?.(false);", "if(system==='surface'&&!on){attachmentSerial++;ctx.learning.setSurfaceAttachment?.(false);")
change('tissues-v4.js',"async function attachSurface(on){\n", "async function attachSurface(on){\n  const ticket=++attachmentSerial;\n")
change('tissues-v4.js',"if(on){await enable('surface',true);if(!systems.surface.loaded)","if(on){await enable('surface',true);if(ticket!==attachmentSerial||state.bodySex==='female'||!systems.surface.on)return false;if(!systems.surface.loaded)")
change('tissues-v4.js',"await ctx.learning.setSurfaceAttachment(!!on);$('surfaceAttach').checked=!!on;", "await ctx.learning.setSurfaceAttachment(!!on);if(ticket!==attachmentSerial)return false;$('surfaceAttach').checked=ctx.learning.getSurfaceState().attached;")
change('tissues-v4.js',"return;viewSerial++;document.body.classList.remove('organ-view-active');", "return;const serial=++viewSerial;document.body.classList.remove('organ-view-active');")
change('tissues-v4.js',"for(const id of extraSystems)await enable(id,false);organBox=null;", "for(const id of extraSystems){await enable(id,false);if(serial!==viewSerial)return false;}organBox=null;")
change('tissues-v4.js',"if(profile===p){$('layerModeNote')", "if(serial===viewSerial&&profile===p){$('layerModeNote')")
change('tissues-v4.js',"await attachSurface(true);ctx.learning.setPrecisionMode('illustrative');ctx.learning.clearStudyContext(true);ctx.learning.setMeridians(['KI']);ctx.learning.setTCMSide('both');ctx.learning.toggleTCM(true,false);", "await attachSurface(true);if(serial!==viewSerial)return false;ctx.learning.setPrecisionMode('illustrative');ctx.learning.clearStudyContext(false);ctx.learning.toggleTCM(true,false);")
# Serialize mixed model/layer actions while superseding queued requests of the same kind.
p=dst/'shared-v14.js';s=p.read_text();at=" function fail(e){"
helper=""" let actionTail=Promise.resolve(),queuedActions=0;const actionSequence=new Map();
 function enqueueAction(key,fn){const n=(actionSequence.get(key)||0)+1;actionSequence.set(key,n);queuedActions++;$('bodySelector').setAttribute('aria-busy','true');
  const run=actionTail.catch(()=>{}).then(()=>n===actionSequence.get(key)?fn():false);
  actionTail=run.catch(()=>{});return run.finally(()=>{queuedActions--;if(!queuedActions)$('bodySelector').setAttribute('aria-busy','false');schedule();});
 }
 function choose(key,preserve=true,options={}){return enqueueAction('scene',()=>chooseNow(key,preserve,options));}
 function enableLayer(layer,on){return enqueueAction('layer:'+layer.id,()=>enableLayerNow(layer,on));}
 function pickStructure(id){return enqueueAction('structure',()=>pickStructureNow(id));}
 function switchSex(target){return enqueueAction('sex',()=>switchSexNow(target));}
"""
assert at in s;s=s.replace(at,helper+at)
s=s.replace('async function enableLayer(l,on){','async function enableLayerNow(l,on){').replace('async function choose(key,preserve=true,options={}){','async function chooseNow(key,preserve=true,options={}){').replace('async function switchSex(target){','async function switchSexNow(target){')
s=s.replace('async function pickStructure(id){','async function pickStructureNow(id){')
s=s.replace('busy:sexSwitching','busy:sexSwitching||queuedActions>0')
s=s.replace("$('restoreLayerCombo').onclick=async()=>{","$('restoreLayerCombo').onclick=()=>enqueueAction('combo',restoreCombo).catch(fail);async function restoreCombo(){")
s=s.replace("let currentPoint=null,currentReference=false;", "let currentPoint=null,currentReference=false,meridianOpened=false;")
s=s.replace("if(s==='meridians'){learning.setPanel(true);learning.toggleTCM(true);}","if(s==='meridians'){learning.setPanel(true);if(!meridianOpened){learning.toggleTCM(true);meridianOpened=true;}}")
s=s.replace("'V14 · 共用学习界面'","'V15 · 经络与切换修订'").replace("version:'14.0.0'","version:'15.0.0'")
p.write_text(s)
for name in ['index.html','evidence.html','versions.html']:
 p=dst/name;s=p.read_text().replace('fullbody-tcm-v14','fullbody-tcm-v15').replace('V14 共用学习界面','V15 经络与切换修订');p.write_text(s)
(dst/'README.md').write_text('''# V15 经络与切换修订

保留 V14 外观、男女共用控件和所有原始解剖模型。

修复：经脉筛选残留局部裁切；点线路清空多选；贴面开关异步竞争；男女与图层交叉操作；体表预设强制改选肾经；不遵守自动聚焦的上一穴/下一穴；隐藏图层后残留引线。

修正前臂分区函数将支沟/会宗合并为同一点的问题：保留原参照的横向差异，不是重新进行临床定位。

贴面曲线通过单独投影的参照点，不再为了贴线挪动参照点。原坐标保留且开关可逆。这是显示一致性修订，不是穴位临床配准；不能用于准确取穴。女性仍无配准经穴坐标，不套用男性坐标。

检查报告区分复现、显示几何、真实交互和公网发布。
''')
print('V15 patch applied')
