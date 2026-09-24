from pathlib import Path
import shutil, hashlib, json, sys
ROOT=Path(sys.argv[1] if len(sys.argv)>1 else '.')
BASE=ROOT/'fullbody-tcm-v7'; OUT=ROOT/'fullbody-tcm-v8'; TOOLS=ROOT/'atlas-v8-refine'
expected='cfd5d9858b915c85727a7fa390cdcd08767d6a8fb710fa0fc1eff49685462ffa'
assert hashlib.sha256((BASE/'index.html').read_bytes()).hexdigest()==expected,'V7 changed; inspect before patching'
if OUT.exists(): raise RuntimeError('V8 exists; refusing to overwrite')
shutil.copytree(BASE,OUT)
for d in ['checks','qa','qa-v3','qa-v4']:shutil.rmtree(OUT/d,ignore_errors=True)
for f in ['delivery-release.json','build-info.json']:(OUT/f).unlink(missing_ok=True)
for f in ['route-smoothing-v8.js','head-study-v8.js']:shutil.copyfile(TOOLS/f,OUT/f)

def rep(s,a,b):
 assert a in s, 'Missing patch target: '+a[:110]
 return s.replace(a,b,1)

s=(OUT/'learning-enhancements.js').read_text()
s=rep(s,"import {REFERENCES} from './reference-data.js';", "import {REFERENCES as ORIGINAL_REFERENCES} from './reference-data.js';\nimport {headStudyReferences} from './head-study-v8.js';\nimport {smoothGuidePath} from './route-smoothing-v8.js';\nconst REFERENCES=headStudyReferences(ORIGINAL_REFERENCES,NAVIGATION_POINTS);")
s=rep(s,"let hoveredPoint=null,", "let studyContext=null,curveStyle='smooth';\n let hoveredPoint=null,")
s=rep(s,"const smooth=[];for(let j=1;j<path.points.length;j++){const a=path.points[j-1],b=path.points[j],steps=Math.max(2,Math.ceil(a.distanceTo(b)/7));for(let k=0;k<steps;k++)smooth.push(a.clone().lerp(b,k/steps));}if(path.points.length)smooth.push(path.points[path.points.length-1].clone());", "const sampled=smoothGuidePath(THREE,path.points,10),smooth=sampled.points;")
s=s.replace("dashed:true,dashSize:8,gapSize:4", "dashed:false,dashSize:12,gapSize:6")
s=rep(s,"return {guide,border,points:smooth,note:path.note};", "return {guide,border,points:smooth,note:path.note,curveDiagnostics:sampled.diagnostics};")
s=s.replace('显示虚线走向导览（非取穴定位）','显示经络导览（非取穴定位）')
s=rep(s,'<div class="guide-actions">', '<label class="tcm-xray">线型<select id="curveStyle"><option value="smooth">平滑导览</option><option value="dashed">虚线导览</option></select></label><div class="guide-actions">')
s=rep(s,"$('guideToggle').onchange=e=>", "$('curveStyle').onchange=e=>{curveStyle=e.target.value;for(const r of routeRecords)for(const g of r.guides)for(const obj of [g.guide,g.border]){obj.material.dashed=curveStyle==='dashed';obj.material.needsUpdate=true;}updateOverlayVisibility();};\n $('guideToggle').onchange=e=>")
s=s.replace('勾选虚线导览恢复线路。','勾选走向导览恢复线路。').replace('`虚线：体表区域导览；圆点：穴名导航示意（未经临床校准）。当前 ${gn} 段导览。`', "`${curveStyle==='smooth'?'平滑线':'虚线'}：区域导览，非真实神经或取穴线；圆点：原穴名参照。${gn} 段；仅平滑显示，未改变穴位坐标。`")
s=rep(s,"function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.geometry.dispose();selectedMarker.material.dispose();selectedMarker=null;}lastLabelRebuild='';}", "function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.traverse(n=>{n.geometry?.dispose();n.material?.dispose();});selectedMarker=null;}areaTag.hidden=true;lastLabelRebuild='';}")
s=rep(s,"viewport.append(hover);", "viewport.append(hover);\n const areaTag=document.createElement('div');areaTag.id='headAreaTag';areaTag.className='head-area-tag';areaTag.hidden=true;viewport.append(areaTag);")
s=s.replace("if(p.position){if(!selectedMeridians.has", "if(p.position||p.navigationArea){if(!selectedMeridians.has")
s=rep(s,"selectedPoint=p;labelPage=0;clearSelectedMarker();", "selectedPoint=p;labelPage=0;clearSelectedMarker();setStudyContext(p);")
needle="const m=meridianMap[p.meridian];cardOpen=true;"
insert="""if(!p.position&&p.navigationArea){
  const a=p.navigationArea,ring=new THREE.Mesh(new THREE.RingGeometry(a.ring*.83,a.ring,80),new THREE.MeshBasicMaterial({color:'#bb791d',transparent:true,opacity:.82,side:THREE.DoubleSide,depthTest:false,depthWrite:false,toneMapped:false}));
  ring.position.copy(areaCenter(p));ring.quaternion.copy(camera.quaternion);ring.renderOrder=60;ring.userData.studyArea=true;selectedMarker=ring;routeRoot.add(ring);areaTag.textContent=p.name+' · '+a.label+'观察范围';
 }
 const m=meridianMap[p.meridian];cardOpen=true;"""
s=rep(s,needle,insert)
s=s.replace("pointsOn&&!!selectedPoint?.position", "pointsOn&&!!(selectedPoint?.position||selectedPoint?.navigationArea)")
s=s.replace("${p.position?'':'disabled'}>聚焦此部位", "${p.position||p.navigationArea?'':'disabled'}>聚焦此部位")
s=rep(s,"${p.position?'这是按所属部位", "${p.navigationArea?'光环是观察范围，不是精确穴位；没有把未配准条目伪装成标准取穴点。':p.position?'这是按所属部位")
s=s.replace("$('focusPointBtn').onclick=()=>focusPoint(p.position);", "$('focusPointBtn').onclick=()=>focusReference(p);")
s=rep(s,"if(focus&&p.position){focusPoint(p.position);}if(focus&&!p.position){document.body.classList.add('detail-open');toast('该补充穴为资料条目，尚无三维位置；不伪装成聚焦成功');}", "if(focus&&(p.position||p.navigationArea)){focusReference(p);}if(focus&&!p.position&&!p.navigationArea){document.body.classList.add('detail-open');toast('尚无可导航位置，保留资料说明');}")
s=s.replace("${arr.filter(p=>p.mapped).length}可导航", "${arr.filter(p=>p.mapped||p.areaNavigation).length}可导航")
s=s.replace("${p.mapped?(p.regionLabel||'部位示意'):'资料条目'}", "${p.navigationArea?'看'+p.navigationArea.label:p.mapped?(p.regionLabel||'部位示意'):'资料条目'}")
s=rep(s,"$('tcmStatusMain').onclick=()=>selectedPoint?.position?focusPoint(selectedPoint.position):fitMeridian();", "$('tcmStatusMain').onclick=()=>selectedPoint&&(selectedPoint.position||selectedPoint.navigationArea)?focusReference(selectedPoint):fitMeridian();")
s=rep(s,"if(!pts.length){toast('该补充条目尚无三维参照；十四经的361个穴名均可导航');return false;}", "if(selectedMeridians.has('EX'))for(const p of ctx.ACUPOINTS.filter(p=>p.navigationArea)){pts.push(areaCenter({...p,side:'right'}));if(p.side==='paired')pts.push(areaCenter({...p,side:'left'}));}\n  if(!pts.length){toast('所选条目尚无导航范围');return false;}\n  studyContext=null;")
s=rep(s,"setRegion('head');ctx.setView('front');};", "fitMeridian([0,.04,1]);};")
functions="""
 function areaCenter(p){const a=p.navigationArea,v=new THREE.Vector3(...a.center);if(p.side==='left'&&!a.fixedSide)v.x=2*99.55318155698478-v.x;return v;}
 function setStudyContext(p){
  const a=p.navigationArea,pos=p.position||a&&areaCenter(p);
  studyContext=pos?{code:p.code,name:p.name,side:p.side,center:pos.toArray(),radius:a?.radius||p.focusRadius||70,regionLabel:a?.label||p.regionLabel||p.region,areaOnly:!p.position}:null;
 }
 function focusReference(p){
  if(p.position)return focusPoint(p.position);if(!p.navigationArea)return false;
  prepareNavigation();setStudyContext(p);toggleTCM(true);const a=p.navigationArea,pos=areaCenter(p),dir=[...a.view];if(p.side==='left'&&!a.fixedSide)dir[0]*=-1;
  const up=Math.abs(dir[1])>.9?[0,0,1]:[0,1,0];
  frameNavigation(new THREE.Box3(pos.clone().addScalar(-a.radius),pos.clone().addScalar(a.radius)),dir,up,p.name+' · '+a.label+'观察范围');
  updateOverlayVisibility();return true;
 }
 function mountLayerContext(){
  const box=document.createElement('section');box.id='pointLayerContext';box.className='point-layer-context';
  box.innerHTML='<h4>同一位置看结构</h4><p>保留当前名称与视角，仅切换显示重点。经络与神经是不同图层，不代表一一对应或神经支配关系。</p><div class="profile-grid"><button data-study-profile="bones">骨骼</button><button data-study-profile="muscles">肌肉</button><button data-study-profile="nerves">神经</button><button data-study-profile="compare">分层对照</button></div><small id="studyLayerStatus"></small>';
  card.append(box);
  for(const b of box.querySelectorAll('[data-study-profile]'))b.onclick=async()=>{await window.__ATLAS_TISSUES__?.setProfile(b.dataset.studyProfile);refreshLayerContext();};
  refreshLayerContext();
 }
 function refreshLayerContext(){
  const profile=window.__ATLAS_TISSUES__?.getState().profile||'bones';
  card.querySelectorAll('[data-study-profile]').forEach(b=>b.classList.toggle('active',b.dataset.studyProfile===profile));
  if($('studyLayerStatus'))$('studyLayerStatus').textContent='当前观察：'+(selectedPoint?.name||'未选穴名')+' · '+({bones:'骨骼结构',muscles:'肌肉外形',nerves:'神经走行',compare:'分层对照',custom:'自选图层'}[profile]||profile);
 }
 window.addEventListener('atlas:profile-changed',refreshLayerContext);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user)studyContext=null;});
 document.querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>{studyContext=null;}));
"""
s=rep(s," function stepPoint(d){",functions+"\n function stepPoint(d){")
s=rep(s,"if(autoSpeak())speak(p.name);return true;", "mountLayerContext();if(autoSpeak())speak(p.name);return true;")
s=rep(s,"  updatePointLabels();", """  if(selectedMarker?.userData.studyArea){selectedMarker.quaternion.copy(camera.quaternion);selectedMarker.visible=enabled&&!suspended&&pointsOn;const p=project({position:selectedMarker.position}),r=viewport.getBoundingClientRect();areaTag.hidden=!(enabled&&!suspended&&p.z>-1&&p.z<1&&p.x>=r.left&&p.x<=r.right&&p.y>=r.top&&p.y<=r.bottom);areaTag.style.left=Math.max(5,Math.min(w-205,p.x-r.left+14))+'px';areaTag.style.top=Math.max(8,p.y-r.top+22)+'px';}
  updatePointLabels();""")
s=rep(s,"window.__ATLAS_LEARNING__={", "window.__ATLAS_LEARNING__={getStudyContext:()=>studyContext&&{...studyContext,center:[...studyContext.center]},getCurveDiagnostics:()=>routeRecords.flatMap(r=>r.guides.map(g=>({meridian:r.meridian,side:r.side,note:g.note,...g.curveDiagnostics}))),")
s=rep(s,"return p?.position?project(p):null;},speakBone", "return p?.position?project(p):p?.navigationArea?{...project({position:areaCenter(p)}),areaOnly:true}:null;},speakBone")
s=rep(s,"getState:()=>({labelStats,", "getState:()=>({curveStyle,headAreaVisible:!!selectedMarker?.userData.studyArea&&selectedMarker.visible,studyContext,labelStats,")
s=s.replace("selectedMarker.material.uniforms.pixelRatio.value=dpr", "selectedMarker.material.uniforms?.pixelRatio&&(selectedMarker.material.uniforms.pixelRatio.value=dpr)")
s=s.replace("version:'7.0'", "version:'8.0'")
s=rep(s,"name:selectedPoint.name,side:selectedPoint.side}", "name:selectedPoint.name,side:selectedPoint.side,areaOnly:!!selectedPoint.navigationArea}")
(OUT/'learning-enhancements.js').write_text(s)
t=(OUT/'tissues-v4.js').read_text()
t=rep(t,"profile='custom';", "profile='custom',localStudy=true;")
t=rep(t,"panel.prepend(presets);", """panel.prepend(presets);
 const context=document.createElement('section');context.id='tissueStudyContext';context.className='tissue-study-context';context.innerHTML='<b id="tissueStudyTitle">未选穴位：全区域观察</b><p>四个预设共用同一套模型，仅调整图层与透明度。</p><label><input id="localStudyToggle" type="checkbox" checked>只看当前观察范围相关模型</label><small>范围筛选是几何相交，不是穴位—神经支配关系。</small>';presets.after(context);
 $('localStudyToggle').onchange=e=>{localStudy=e.target.checked;lastKey='';updateFrame();};""")
t=rep(t,"if(profile===p){lastKey='';updateFrame();}", "if(profile===p){lastKey='';updateFrame();window.dispatchEvent(new CustomEvent('atlas:profile-changed',{detail:{profile}}));}")
t=rep(t,"function regionBox(){if(state.region==='body')", "function regionBox(){const c=ctx.learning.getStudyContext?.();if(c&&localStudy){const v=new THREE.Vector3(...c.center);return new THREE.Box3(v.clone().addScalar(-c.radius*1.6),v.clone().addScalar(c.radius*1.6));}if(state.region==='body')")
t=rep(t,"const key=[state.region,", "const study=ctx.learning.getStudyContext?.();const key=[study?.code,study?.side,localStudy,state.region,")
t=rep(t,"lastKey=key;ctx.setPerformance", "lastKey=key;$('tissueStudyTitle').textContent=study?'当前：'+study.name+' · '+study.regionLabel:'未选穴位：全区域观察';ctx.setPerformance")
t=rep(t,"getState:()=>({profile,", "getState:()=>({localStudy,studyContext:ctx.learning.getStudyContext?.(),profile,")
(OUT/'tissues-v4.js').write_text(t)
a=(OUT/'app.js').read_text().replace('version:"7.0"','version:"8.0"')
a=rep(a,'function prepareReferenceFocus(){', 'function prepareReferenceFocus(){\n if(state.tissueIsolated)tissueLayer?.clearSelection();')
(OUT/'app.js').write_text(a)
h=(OUT/'index.template.html').read_text().replace('V7','V8').replace('经穴导航','曲线与联动')
(OUT/'index.template.html').write_text(h)
with (OUT/'styles.css').open('a') as f:f.write('''\n/* V8 additions: compact context, no new overlay panel */
.head-area-tag{position:absolute;z-index:12;padding:5px 9px;border:1px solid #d5bd89;border-radius:8px;background:#fffcf2;color:#76501e;font-size:12px;pointer-events:none;max-width:210px;box-shadow:0 2px 8px #0001}
.point-layer-context,.tissue-study-context{border:1px solid #cad7c4;border-radius:10px;padding:10px;margin:12px 0;background:#f5f8f0}
.point-layer-context p,.tissue-study-context p,.tissue-study-context small{font-size:12px;line-height:1.7;color:#57634f}.point-layer-context h4{margin:0 0 7px}.point-layer-context .profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}.point-layer-context button{padding:7px 4px}.point-layer-context button.active{background:#dce9d6;color:#264e32}#studyLayerStatus{display:block;margin-top:7px;line-height:1.6;color:#587453}#curveStyle{margin-left:auto;padding:4px;border:1px solid #bdcbb6;border-radius:5px;background:#fff}.tissue-study-context label{font-size:12px;display:flex;align-items:center;gap:5px}.tissue-study-context small{display:block;margin-top:5px}
''')
info={'version':'fullbody-tcm-v8','baseVersion':'V7','baseHTMLSHA256':expected,'scope':'bounded smooth routes, head supplemental region focus, study-layer context','bones':210,'standardPointsUnchanged':True,'extraNames':12,'extraNavigation':'broad area rings, not new registered acupuncture points','maxCurveHandle':10,'clinicalCalibration':False,'audioChanged':False,'previousViewersUntouched':True}
(OUT/'build-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2))
(OUT/'README.md').write_text('''# V8 曲线与部位联动

网页：https://hengtong320.github.io/notionweb/fullbody-tcm-v8/

保留V7原210骨块、肌肉、神经及音频文件。范围仅为线条、头面区域导航与同一位置的图层联动。

经络导览按原分支分别用受限三次曲线平滑，经过原锚点，首尾保持不变。每个控制柄不超过模型坐标10单位；该约束仅限制图形偏移，不是临床精度。默认连续平滑线，可切回虚线。没有把所有穴位重新均分到曲线上，也没有改变361个标准穴名原有示意坐标。图形更平滑不等于经脉走向或体表配准已验证。

头面补充12项可转到对应观察区域。印堂打开眉间/鼻根，安眠打开耳后枕颈，可切左右。光环明确表示范围，不是新增加的精确穴位。耳尖和舌下条目缺少耳廓/黏膜等对应结构，只做区域导航。目录索引沿用原项目编码；不将这些补充项混入361穴计数。

四种观察预设共用骨骼、肌肉、神经模型，仅切换重点和透明度。详情新增“同一位置看结构”，切层保留选择与镜头。软组织可按当前观察范围筛选，几何相交不表示神经支配、治疗机制或一对一经络对应。骨、肌肉、神经之间的原始坐标不变；没有加入皮肤及全部软组织。

印堂部位文字参照：北京中医药大学教学资料 https://jxjyxb.bucm.edu.cn/BZYAttachs/courseware/zhenjiuxue/a2/a2_26.htm
头面补充目录说明参照：SciCrunch TARA extra-acupoints.csv，固定提交 b488d0bf855eef17a131946bd387d6e2e9dfa26d。仅转述部位，不复制治疗或操作说明。三维观察范围由项目定义，不是该资料的xyz数据。
曲线基元：Three.js CubicBezierCurve3。范围与曲线均非取穴、针刺、诊断或复位依据。

发布检查见 checks/ 与 delivery-release.json。模型许可与署名见 MODEL-LICENSES.txt。
''')
print('V8_PATCH_READY',json.dumps(info,ensure_ascii=False))
