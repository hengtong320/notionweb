"""V26: bounded display fixes. Never overwrite the published V25 or raw anatomy."""
from pathlib import Path
import shutil,hashlib,json
src=Path('fullbody-tcm-v25'); dst=Path('fullbody-tcm-v26'); tools=Path('atlas26-repair')
assert src.is_dir() and not dst.exists()
shutil.copytree(src,dst)
shutil.rmtree(dst/'checks',ignore_errors=True)
for f in ['build-info.json','release.json']:(dst/f).unlink(missing_ok=True)
def edit(name,old,new,count=1):
 f=dst/name;s=f.read_text();assert s.count(old)>=count,(name,old[:100]);f.write_text(s.replace(old,new,count))
for f in dst.iterdir():
 if f.suffix in ['.html','.js','.md'] and f.name!='app.bundle.js':
  s=f.read_text();f.write_text(s.replace('25.0.0','26.0.0').replace('fullbody-tcm-v25/','fullbody-tcm-v26/').replace('V25 · 经络曲线与笔触','V26 · 经络阅读与观察').replace('V25.0.0','V26.0.0'))
for a,b in [('label-layout.js','meridian-layout-v26.js'),('meridian-ux.js','meridian-ux-v26.js'),('meridian-ux.css','meridian-ux-v26.css')]:shutil.copy2(tools/a,dst/b)
# Unsigned-distance derivatives cancel when adjacent fragments straddle a line.
edit('skin-ink-v24.js','float lineDistance=1.e5,pointDistance=1.e5,lineAlong=0.;','vec3 lineTangent=vec3(0.,1.,0.);\n    float lineDistance=1.e5,pointDistance=1.e5,lineAlong=0.;')
edit('skin-ink-v24.js','lineAlong=b.w+t*length(ab);','lineAlong=b.w+t*length(ab);lineTangent=ab/max(length(ab),.00001);')
edit('skin-ink-v24.js','float perpendicularPixel=max(length(vec2(dFdx(lineDistance),dFdy(lineDistance))),.015);','vec3 dx=dFdx(vInkWorld),dy=dFdy(vInkWorld),surfaceNormal=cross(dx,dy);\n    surfaceNormal/=max(length(surfaceNormal),.000001);\n    vec3 across=cross(surfaceNormal,lineTangent);across/=max(length(across),.000001);\n    float perpendicularPixel=max(length(vec2(dot(dx,across),dot(dy,across))),.015);')
edit('skin-ink-v24.js','float lineAA=clamp(length(vec2(dFdx(lineDistance),dFdy(lineDistance)))*.65,.025,1.5);','float lineAA=clamp(perpendicularPixel*.65,.025,1.5);')
edit('skin-ink-v24.js','highDpiAware:true,','stableTransverseMetric:true,highDpiAware:true,')
# Camera adapts to the actual skin, without modifying the registered point.
extra=''' function visibleDirection(point,preferred){
  const first=new THREE.Vector3(...preferred).normalize(),check=d=>[180,600,1800].every(distance=>isVisible(point,point.clone().addScaledVector(d,distance)));
  if(check(first))return first.toArray();
  const choices=[],contact=bvh.closestPointToPoint(point);
  if(contact){const n=faceNormal(contact,point.clone().sub(contact.point));choices.push(n,n.clone().add(first).normalize());}
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)if(x||y||z)choices.push(new THREE.Vector3(x,y,z).normalize());
  choices.sort((a,b)=>b.dot(first)-a.dot(first));return (choices.find(check)||first).toArray();
 }
'''
edit('skin-v17.js',' const hasVisibleSkin=',extra+' const hasVisibleSkin=')
edit('skin-v17.js','mapSource,isVisible,stats:','mapSource,isVisible,visibleDirection,stats:')
edit('learning-enhancements.js',"v=>linesOn=v","v=>{linesOn=v;guideOn=v;$('guideToggle').checked=v;}")
edit('learning-enhancements.js',"guideOn=e.target.checked;updateOverlayVisibility();","guideOn=linesOn=e.target.checked;$('meridianLineToggle').classList.toggle('active',linesOn);updateOverlayVisibility();")
edit('learning-enhancements.js',"suspended=false;pointsOn=true;namesOn=true;\n  $('acupointToggle').classList.add('active');$('pointNamesToggle').classList.add('active');","suspended=false;")
edit('learning-enhancements.js',"let dir=p?.view?[...p.view]:[0,.05,1];if(p?.side==='left')dir[0]*=-1;","let dir=p?.view?[...p.view]:[0,.05,1];if(p?.side==='left')dir[0]*=-1;if(paintedSkinVisible()&&surfaceProjector?.visibleDirection)dir=surfaceProjector.visibleDirection(pos,dir);")
edit('learning-enhancements.js',"function routeMatches(r){return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide);}","function routeMatches(r){const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide)&&(!physical||physical==='both'||r.side==='midline'||r.side===physical);}")
edit('learning-enhancements.js',"selectedPoint=p;labelPage=0;", "if(p.side!=='midline'){const physical=state.bodySex==='female'?window.__ATLAS_FEMALE__?.getState().side:state.side;if(physical&&physical!=='both'&&physical!==p.side){if(state.bodySex==='female')window.__ATLAS_FEMALE__.setSide(p.side);else ctx.setSide(p.side);}}selectedPoint=p;pointsOn=true;labelPage=0;")
edit('learning-enhancements.js',"function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;", "function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;const keepDetails=document.body.classList.contains('detail-open');")
edit('learning-enhancements.js',"if(compact()){setPanel(false);document.body.classList.remove('nav-open');document.body.classList.add('detail-open');}","if(compact()){setPanel(false);document.body.classList.remove('nav-open');document.body.classList.toggle('detail-open',keepDetails||(!p.position&&!p.navigationArea));}")
edit('learning-enhancements.js'," function pointUnoccluded(p){", " let frameOccluders=null;\n function pointUnoccluded(p){")
edit('learning-enhancements.js',"const candidates=[];scene.traverse(n=>{if(!n.isMesh||!n.visible||(!n.userData.atlas&&!bones.has(n.name))||n.material.opacity<.5)return;let parent=n.parent;while(parent){if(!parent.visible)return;parent=parent.parent;}candidates.push(n);});", "if(!frameOccluders){frameOccluders=[];scene.traverse(n=>{if(!n.isMesh||!n.visible||(!n.userData.atlas&&!n.userData.female&&!bones.has(n.name))||n.material.opacity<.5)return;for(let p=n.parent;p;p=p.parent)if(!p.visible)return;frameOccluders.push(n);});}const candidates=frameOccluders;")
edit('learning-enhancements.js',"function hitPoint(e){if(!enabled", "function hitPoint(e){frameOccluders=null;if(!enabled")
edit('learning-enhancements.js'," function updateFrame(){", " function updateFrame(){frameOccluders=null;")
f=dst/'learning-enhancements.js';s=f.read_text();s="import {placeLabels} from './meridian-layout-v26.js';\n"+s
start=s.index(' function updatePointLabels(){');end=s.index(" $('meridianQuick').add",start)
s=s[:start]+(tools/'label-update.txt').read_text()+s[end:]
s=s.replace("getState:()=>({registration:","getLabelPlacementAudit:()=>labelPlacementAudit,getState:()=>({localStudyOnly:!!$('localStudyToggle')?.checked,labelPage,registration:")
s=s.replace("guideOn=v.guideOn!==false;", "guideOn=linesOn=linesOn&&v.guideOn!==false;")
s=s.replace("$('curveStyle').value=curveStyle;$('tcmXray').checked=xray;", "labelMode=v.labelMode==='complete'?'complete':'smart';$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'附近穴名';$('labelModeToggle').setAttribute('aria-pressed',String(labelMode==='complete'));$('autoFocusPoint').checked=autoFocus;if($('localStudyToggle')){$('localStudyToggle').checked=!!v.localStudyOnly;$('localStudyToggle').dispatchEvent(new Event('change',{bubbles:true}));}$('curveStyle').value=curveStyle;$('tcmXray').checked=xray;")
s=s.replace("enabled=!!v.enabled;if(!v.cardOpen)","labelPage=Math.max(0,Number(v.labelPage)||0);enabled=!!v.enabled;if(!v.cardOpen)")
s=s.replace("[...selectedMeridians].map(id=>meridianMap[id].name).join('＋')", "(selectedMeridians.size===14?'十四经总览':selectedMeridians.size>3?selectedMeridians.size+'条经脉对照':[...selectedMeridians].map(id=>meridianMap[id].name).join('＋'))")
s=s.replace("const summary=[...selectedMeridians].map(id=>meridianMap[id]?.short).join('＋');", "const summary=selectedMeridians.size===14?'十四经总览':selectedMeridians.size>3?selectedMeridians.size+'条经脉对照':[...selectedMeridians].map(id=>meridianMap[id]?.short).join('＋');")
f.write_text(s)
edit('app.js',"import {initViewportExperience", "import {initMeridianExperience} from './meridian-ux-v26.js';\nimport {initViewportExperience")
edit('app.js'," for(const event of ['pointerdown'", " initMeridianExperience({learning:learningEnhancements,invalidate});\n for(const event of ['pointerdown'")
for name in ['index.html','index.template.html']:
 if (dst/name).exists():edit(name,'</head>','<link rel="stylesheet" href="./meridian-ux-v26.css?v=26.0.0"></head>')
unchanged=[f.name for f in src.iterdir() if f.suffix=='.json' and f.name not in ['build-info.json','release.json']]
for name in unchanged:assert (src/name).read_bytes()==(dst/name).read_bytes(),name
(dst/'README.md').write_text('''# V26 经络阅读与观察

修复皮肤绘线采用无符号距离导数导致的周期性变细，改以皮肤世界坐标导数与局部线方向计算稳定的横向屏幕尺度。保持真实深度遮挡、皮肤不透明度与全部编号穴位不变。

附近穴名不再只截取纵向最上方几个候选再丢弃被工具栏挡住的项目，改为视野分散选取与边界避让；每个名称有指向实际点中心的引线，选中点优先。完整穴名保留翻页。点选后的观察方向以当前皮肤可见性检查为约束，不改点位。

线路改为单一有效开关；原导览复选框保留兼容但不重复显示。局部裁切移到经络面板、默认关闭，点选不会隐式截掉整条线路。看全线不再强制打开被关闭的穴名；保存与男女切换恢复标签模式、自动聚焦与局部裁切选项。标签、点选与绘线服从同一人体侧别过滤。

手机点选后保留三维画面与简短点位摘要，主动点击详情才打开说明。已打开详情时前后穴位仍可连续阅读。多经脉说明压缩为总览名称，避免十四个全名占满说明栏。

## 验收与边界

checks 区分当前版本基线、V26候选、公网复测，记录实际画面及点选流程。自动测试只证明所测路径，不代表所有体验问题或解剖位置均已解决。所有原始模型、编号穴位定位和女性数据来源保持不变；未完成逐穴临床校准。本轮不靠移动穴位、透明皮肤或关闭深度测试改善外观。
''',encoding='utf-8')
(dst/'invariants.json').write_text(json.dumps({'anatomicalJSONUnchanged':unchanged,'clinicalCalibration':False},indent=2))
print('V26 assembled; immutable anatomy verified',len(unchanged))
