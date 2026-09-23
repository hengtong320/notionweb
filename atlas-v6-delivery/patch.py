from pathlib import Path
import shutil,re,json,hashlib
root=Path('fullbody-tcm-v6');base=Path('fullbody-tcm-v5')
if not root.exists():shutil.copytree(base,root)
for n in ['checks','qa','qa-v4','qa-v3']:shutil.rmtree(root/n,ignore_errors=True)
for n in ['delivery-release.json']:(root/n).unlink(missing_ok=True)
shutil.copyfile(Path(__file__).parent/'acupoint-layout-v6.js',root/'acupoint-layout-v6.js')
p=root/'learning-enhancements.js';s=(base/'learning-enhancements.js').read_text()
def rep(a,b):
 global s
 if a not in s:raise RuntimeError('Patch anchor missing '+a[:90])
 s=s.replace(a,b,1)
rep("import {createGuidePaths} from './route-guides-v5.js';","import {makePlacements,fullGuidePaths,viewFor,REGION_NAMES,COUNTS} from './acupoint-layout-v6.js';")
rep(" const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f\\s·]/g,'');"," const normalize = s => String(s).toLowerCase().replace(/影像|迎像/g,'迎香').replace(/內/g,'内').replace(/穴/g,'').replace(/\\b(kd|kid)\\s*(?=\\d)/g,'ki').normalize('NFD').replace(/[\\u0300-\\u036f\\s·-]/g,'');")
rep(" const refMap=Object.fromEntries(REFERENCES.map(p=>[p.code,p]));\n ctx.ACUPOINTS=[...ctx.ACUPOINTS.map(p=>({...p,...refMap[p.code],mapped:!!refMap[p.code]?.position})),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts)}))];", " ctx.ACUPOINTS=[...makePlacements(THREE,bones,ctx.ACUPOINTS,REFERENCES),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts),placementKind:'directory'}))];")
rep(" let selectedMeridians=new Set(['HT','SI']),suspended=false;"," let selectedMeridians=new Set(['KI']),suspended=false,selectedRoute=null,focusSerial=0,lastFocus=null,labelMode='auto',labelStats={shown:0,inFrame:0,total:0},lastLabelTime=0,activeFocusBox=null,activeFocusView=null;")
rep("routeRoot.name='Individually annotated reference anchors V4'","routeRoot.name='V6 educational placements and distinct route guides'")
rep(" let activeMeridian=store.get('atlas-meridian','LU'),", " let activeMeridian='KI',")
rep('经脉对照 · 参考点','经络专项 · 名称与定位导览')
rep('点名目录含尚未标注位置的条目。','十四经361穴均有教学示意位置；经外补充仍单独标明。')
rep('已停用旧版均匀插值点位。现仅显示逐点参考锚点；未配准皮肤、未经临床校准。顺序线只连接连续已标注穴名，不代表完整经络循行或实体管道。','361个穴名各有单独的模型教学位置，不沿曲线均分。所有坐标仍未经皮肤配准与临床校准；虚线是体表走向导览，不含完整内行支脉，不能用于取穴。')
rep('<div class="tcm-section-label">穴位名称目录', '<label class="v6-select-row">画面穴名<select id="labelMode"><option value="auto">清晰排布</option><option value="all">显示全部在屏穴名</option><option value="selected">仅当前穴</option></select></label><label class="v6-select-row">分部观察<select id="focusRegionSelect"><option value="all">整条经脉</option></select></label><div class="tcm-section-label">完整穴位目录')
rep("const labels=document.createElement('div');", "const labelInfo=document.createElement('button');labelInfo.id='v6LabelInfo';labelInfo.className='v6-label-info';labelInfo.hidden=true;document.querySelector('.stage').append(labelInfo);labelInfo.onclick=()=>{setPanel(true);$('acupointSearch').focus();};\n const labels=document.createElement('div');")
rep("viewport.append(labels);", "viewport.append(labels);const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('v6-label-leaders');leaders.setAttribute('aria-hidden','true');viewport.append(leaders);")
rep("const hover=document.createElement('div');", "labels.addEventListener('pointerdown',e=>e.stopPropagation(),true);labels.addEventListener('pointerup',e=>e.stopPropagation(),true);\n const hover=document.createElement('div');")
s=s.replace("ctx.MERIDIANS.map(m=>m.id)","ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id)")
rep("if(id==='ALL'){setMeridians(ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id));return;}","if(id==='ALL'){setMeridians(ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id));toggleTCM(true);fitMeridian();return;}")
rep("setMeridians([...selectedMeridians]);toggleTCM(true);});", "setMeridians([...selectedMeridians]);toggleTCM(true);fitMeridian();});")
rep(" $('acupointSearch').oninput=renderResults;", " $('acupointSearch').oninput=renderResults;\n $('labelMode').onchange=e=>{labelMode=e.target.value;lastLabelRebuild='';};\n $('focusRegionSelect').onchange=e=>{const pts=routeRecords.filter(routeMatches).flatMap(r=>r.data).filter(p=>e.target.value==='all'||p.region===e.target.value);if(pts.length)focusSet(pts.map(p=>p.position),e.target.value==='all'?null:viewFor(pts[0]));};")
rep(" $('guideBack').onclick=()=>{ctx.setView('back');fitMeridian();};$('guideFront').onclick=()=>{ctx.setView('front');fitMeridian();};", " $('guideBack').onclick=()=>fitMeridian({dir:[0,.05,-1],up:[0,1,0]});$('guideFront').onclick=()=>fitMeridian({dir:[0,.05,1],up:[0,1,0]});")
rep("updateOverlayVisibility();renderResults();if(selectedMeridians.size===1&&selectedMeridians.has('GV')){ctx.setView('back');fitMeridian();}", "updateOverlayVisibility();renderResults();rebuildRegions();")
rep('createGuidePaths(THREE,bones,m.id,side,data)','fullGuidePaths(THREE,m.id,side,data)')
rep(" function fitMeridian(){", " function fitMeridianOLD(){")
start=s.index(' function fitMeridianOLD(){');end=s.index(' function renderResults()',start)
s=s[:start]+''' function rebuildRegions(){const previous=$('focusRegionSelect').value;const keys=[...new Set(ctx.ACUPOINTS.filter(p=>selectedMeridians.has(p.meridian)).map(p=>p.region))];$('focusRegionSelect').innerHTML='<option value="all">整条经脉</option>'+keys.map(k=>`<option value="${k}">${REGION_NAMES[k]||k}</option>`).join('');$('focusRegionSelect').value=keys.includes(previous)?previous:'all';}
 function restoreForFocus(){
  const displaced=state.explode>0||state.isolated||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1||b.quaternion.angleTo(new THREE.Quaternion())>.015);
  if(displaced){ctx.restore();toast('为正确对照位置，已恢复骨骼原位');}
  suspended=false;ctx.setMode('orbit');setRegion('body',false);setSide('both');
  enabled=true;pointsOn=true;namesOn=true;$('acupointToggle').classList.add('active');$('pointNamesToggle').classList.add('active');updateOverlayVisibility();
 }
 function focusSet(points,view){
  if(!points.length)return false;restoreForFocus();if(compact())setPanel(false);document.body.classList.remove('detail-open','nav-open');
  const ticket=++focusSerial,box=new THREE.Box3().setFromPoints(points).expandByScalar(view?.half||32);
  const orient=view||{dir:((selectedMeridians.size===1&&['GV','BL'].includes([...selectedMeridians][0]))?[0,.06,-1]:[0,.08,1]),up:[0,1,0]};
  activeFocusBox=box.clone();activeFocusView=orient;lastFocus={kind:'region',target:box.getCenter(new THREE.Vector3()).toArray(),serial:ticket};
  const apply=()=>{if(ticket!==focusSerial)return;ctx.focusBounds(box,{direction:new THREE.Vector3(...orient.dir),up:new THREE.Vector3(...orient.up)});lastLabelRebuild='';};
  apply();requestAnimationFrame(()=>requestAnimationFrame(apply));return true;
 }
 function fitMeridian(view=null){
  const records=routeRecords.filter(routeMatches),pts=records.flatMap(r=>[...r.data.map(p=>p.position),...r.guides.flatMap(g=>g.points)]);
  if(!pts.length){setRegion('head');ctx.setView('front');toast('经外补充：目前仅有头面目录，未生成精准点位');return false;}
  selectedRoute=null;return focusSet(pts,view);
 }
 function focusPoint(p){
  if(p?.isVector3)p=selectedPoint&&selectedPoint.position===p?selectedPoint:{position:p,region:'head',side:'right'};
  if(!p?.position){setRegion('head');ctx.setView('front');lastFocus={kind:'region-only',code:p?.code,region:'head'};toast('已转到头面区域；此补充条目尚无点位，不冒充精准聚焦');return false;}
  focusSet([p.position],viewFor(p));lastFocus={kind:'educational-point',code:p.code,side:p.side,target:p.position.toArray(),clinicalCalibration:false};return true;
 }
''' + s[end:]
a=s.index("  if($('guideCoverage'))");b=s.index("  lastLabelRebuild='';updateStatus();",a)
s=s[:a]+'''  if($('guideCoverage')){const std=ctx.ACUPOINTS.filter(p=>selectedMeridians.has(p.meridian)&&p.meridian!=='EX');$('guideCoverage').textContent=`所选十四经：${std.length} / ${[...selectedMeridians].reduce((n,m)=>n+(COUNTS[m]||0),0)}个穴名，${std.filter(p=>p.position).length}个教学位置；${gn}段体表导览。坐标为示意，未作临床校准。`;}
''' + s[b:]
rep("$('pointResultCount').textContent=`${arr.length}项 · ${arr.filter(p=>p.mapped).length}有参考锚点`;", "$('pointResultCount').textContent=`${arr.length}项 · ${arr.filter(p=>p.mapped).length}有教学位置`;const savedScroll=$('acupointResults').scrollTop;")
rep("${p.mapped?'参考锚点':'仅名称目录'}", "${p.mapped?'教学示意位置':'仅区域导航'}")
rep("||'<p class=\"empty-search\">没有找到</p>';", "||'<p class=\"empty-search\">没有找到</p>';$('acupointResults').scrollTop=savedScroll;")
rep(" function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;selectedPoint=p;clearSelectedMarker();", " function selectPoint(p,focus=true){if(!p?.name||!p?.code)return false;if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);if(p.side!=='midline'&&tcmSide!=='both'&&p.side!==tcmSide)setTCMSide(p.side);selectedRoute=null;enabled=true;pointsOn=true;namesOn=true;selectedPoint=p;clearSelectedMarker();updateOverlayVisibility();")
rep('定位文字与体表标志','教学位置与体表定位说明')
rep('三维点是逐点人工标注的学习参考点，仍未经临床或体表配准验证，并非已注册皮肤上的标准穴位。肌肉层也不能代替皮肤定位。','此点是项目设置的模型教学位置，不是经过临床验证的取穴坐标。标准定位文字、骨度分寸与本模型坐标须区分；现无完整皮肤配准。')
rep("$('focusPointBtn').onclick=()=>focusPoint(p.position);", "$('focusPointBtn').onclick=()=>focusPoint(p);")
rep("if(focus&&p.position){focusPoint(p.position);if(compact())setPanel(false);}if(focus&&!p.position)document.body.classList.add('detail-open');", "if(focus){focusPoint(p);if(compact())setPanel(false);}")
rep(" function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);return !!p&&selectPoint(p,false);}", ''' function hitRoute(e){
  if(!enabled||suspended||!linesOn)return null;let best=null,limit=e.pointerType==='touch'?16:8;
  for(const r of routeRecords.filter(routeMatches))for(const g of r.guides)if(g.guide.visible)for(let i=1;i<g.points.length;i++){
   const a=project({position:g.points[i-1]}),b=project({position:g.points[i]});if(a.z< -1||a.z>1||b.z< -1||b.z>1)continue;
   const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;if(len<.01)continue;const t=Math.max(0,Math.min(1,((e.clientX-a.x)*dx+(e.clientY-a.y)*dy)/len));const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);
   if(d<limit){limit=d;best={meridian:r.meridian,side:r.side,position:g.points[i-1].clone().lerp(g.points[i],t)};}
  }return best;
 }
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);if(p)return selectPoint(p,true);const r=hitRoute(e);if(!r)return false;
  selectedPoint=null;clearSelectedMarker();selectedRoute=r;cardOpen=true;card.hidden=false;const m=meridianMap[r.meridian];
  card.innerHTML=`<div class="tcm-card-head"><b>${m.name} · 走向段</b><button id="closePointCard">收起</button></div><p>你选中的是经脉导览线，不是穴位。虚线只表示教学走向，不代表实体组织或完整内行分支。</p><button id="routeFit">返回整条经脉</button>`;
  $('closePointCard').onclick=()=>{cardOpen=false;card.hidden=true;};$('routeFit').onclick=()=>fitMeridian();
  focusSet([r.position],{dir:['GV','BL'].includes(r.meridian)?[0,.06,-1]:[0,.08,1],up:[0,1,0],half:125});updateStatus();return true;
 }''')
a=s.index("  const key=[enabled,pointsOn,namesOn,");b=s.index("\n }\n $('meridianQuick')",a)
s=s[:a]+'''  const key=[enabled,pointsOn,namesOn,[...selectedMeridians].join(','),suspended,tcmSide,selectedPoint?.code,selectedPoint?.side,labelMode].join('|');
  if(key!==lastLabelRebuild){lastLabelRebuild=key;labels.replaceChildren();leaders.replaceChildren();labelNodes.length=0;
   let arr=namesOn?(labelMode==='selected'?[]:getVisiblePoints()):[];
   if(selectedPoint?.position&&enabled&&!suspended&&pointsOn&&!arr.includes(selectedPoint))arr=[selectedPoint,...arr];
   for(const p of arr){const el=document.createElement('button');el.type='button';el.className='acu-name'+(p===selectedPoint?' selected':'');el.dataset.acuLabel=p.code;el.dataset.side=p.side;el.title=`${p.name} ${p.pinyin} ${p.code} · 点击聚焦教学位置`;el.textContent=`${p.side==='midline'?'':p.side==='left'?'左·':'右·'}${p.name} ${p.code}`;el.onclick=e=>{e.stopPropagation();selectPoint(p,true);};labels.append(el);const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('stroke',meridianMap[p.meridian].color);line.setAttribute('stroke-width',p===selectedPoint?'1.5':'.75');line.setAttribute('opacity',p===selectedPoint?'.9':'.45');leaders.append(line);labelNodes.push({p,el,line});}
  }
  if(performance.now()-lastLabelTime<65)return;lastLabelTime=performance.now();
  const rect=viewport.getBoundingClientRect(),toolbarBottom=document.querySelector('.study-toolbar').getBoundingClientRect().bottom,statusBottom=status.hidden?0:status.getBoundingClientRect().bottom;
  const top=Math.max(70,Math.max(toolbarBottom,statusBottom)-rect.top+8),dock=document.querySelector('.control-dock'),dockTop=document.body.classList.contains('dock-collapsed')?h-64:dock.getBoundingClientRect().top-rect.top;
  const bottom=Math.max(top+60,Math.min(h-70,dockTop-18));let candidates=[];
  for(const item of labelNodes){item.el.hidden=true;item.line.style.display='none';const v=project(item.p);if(v.z< -1||v.z>1||v.x<rect.left||v.x>rect.right||v.y<rect.top||v.y>rect.bottom)continue;candidates.push({...item,x:v.x-rect.left,y:v.y-rect.top});}
  const allCount=candidates.length,capacity=Math.max(6,Math.floor((bottom-top)/24)*2);
  if(labelMode==='auto'&&candidates.length>capacity){candidates.sort((a,b)=>(a.p===selectedPoint?-1:0)-(b.p===selectedPoint?-1:0)||Math.abs(a.y-h/2)-Math.abs(b.y-h/2));candidates=candidates.slice(0,capacity);}
  candidates.sort((a,b)=>a.y-b.y);const cols=[[],[]];for(const item of candidates){let side=item.x<w*.5?0:1;if(Math.abs(cols[0].length-cols[1].length)>4)side=cols[0].length<cols[1].length?0:1;cols[side].push(item);}
  for(let side=0;side<2;side++){const list=cols[side],step=Math.min(26,(bottom-top)/Math.max(1,list.length)),labelW=w<500?109:130,x=side?Math.max(0,w-labelW-10):10;let y=top-step;
   for(const a of list){a.ly=Math.max(top,Math.min(bottom,a.y-10),y+step);y=a.ly;}
   for(let i=list.length-1;i>=0;i--)list[i].ly=Math.min(list[i].ly,i===list.length-1?bottom:list[i+1].ly-step);
   for(const a of list){a.el.hidden=false;a.el.style.transform=`translate(${x}px,${a.ly}px)`;a.el.style.maxWidth=labelW+'px';a.el.style.fontSize=step<17?'10px':'';a.line.style.display='';a.line.setAttribute('x1',a.x);a.line.setAttribute('y1',a.y);a.line.setAttribute('x2',side?x:x+labelW);a.line.setAttribute('y2',a.ly+10);}
  }
  labelStats={shown:candidates.length,inFrame:allCount,total:getVisiblePoints().length};labelInfo.hidden=!enabled||suspended;
  labelInfo.textContent=`穴名 ${candidates.length}/${allCount} 在屏 · 所选${getVisiblePoints().length}个双侧标记 · 查看完整目录`;
''' + s[b:]
rep("$('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['HT','SI']);", "$('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['KI']);")
s=s.replace("version:'5.0'","version:'6.0'")
rep("getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,mapped:p.mapped,region:p.region,hasPosition:!!p.position}))", "getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,pinyin:p.pinyin,mapped:p.mapped,region:p.region,hasPosition:!!p.position,placementKind:p.placementKind,position:p.position}))")
rep("selectPoint:(code,side='right',focus=false)","selectPoint:(code,side='right',focus=true)")
rep("getState:()=>({guideOn,", "getState:()=>({lastFocus,labelStats,labelMode,focusSerial,selectedRoute:selectedRoute&&{meridian:selectedRoute.meridian,side:selectedRoute.side},guideOn,")
rep("handlePointerClick,hitPoint,toggleTCM", "handlePointerClick,hitPoint,hitRoute,refocusAfterResize:()=>{if(!enabled||!activeFocusBox)return false;ctx.focusBounds(activeFocusBox,{direction:new THREE.Vector3(...activeFocusView.dir),up:new THREE.Vector3(...activeFocusView.up)});return true;},setLabelMode:mode=>{if(['auto','all','selected'].includes(mode)){labelMode=mode;$('labelMode').value=mode;lastLabelRebuild='';}},getRouteScreen:(m,side='right')=>{const r=routeRecords.find(r=>r.meridian===m&&(r.side===side||r.side==='midline'));const g=r?.guides[0];return g?g.points.map(p=>project({position:p})):[];},toggleTCM")
s=s.replace('有参考锚点','有教学位置').replace('已收录的参考锚点','教学参考位置');p.write_text(s)
p=root/'app.js';s=(base/'app.js').read_text();s=s.replace('function focusBounds(box){','function focusBounds(box,options={}){',1)
s=s.replace('const center=box.getCenter(new THREE.Vector3()),dir=camera.position.clone().sub(controls.target).normalize();if(dir.lengthSq()<.1||Math.abs(dir.y)>.96)dir.set(0,.1,1).normalize();\n camera.up.set(0,1,0);','const center=box.getCenter(new THREE.Vector3()),dir=(options.direction||camera.position.clone().sub(controls.target)).clone().normalize();if(dir.lengthSq()<.1)dir.set(0,.1,1).normalize();\n camera.up.copy(options.up||new THREE.Vector3(0,1,0));',1)
s=s.replace('fitToContent,focusBounds,setView,bonePinyin,MERIDIANS,ACUPOINTS,speech','fitToContent,focusBounds,setView,setMode,restore:()=>resetBones(true),bonePinyin,MERIDIANS,ACUPOINTS,speech',1)
s=s.replace("if(!state.ready||e.button!==0)return;cameraTween=null;","if(!state.ready||e.button!==0||e.target.closest?.('.acu-name'))return;cameraTween=null;",1)
s=s.replace('if(changed&&state.ready)fitToContent(false);', 'if(changed&&state.ready){if(!learningEnhancements?.refocusAfterResize?.())fitToContent(false);}',1)
s=s.replace('version:"5.0"','version:"6.0"');p.write_text(s)
p=root/'index.template.html';s=(base/'index.template.html').read_text().replace('V5','V6').replace('V6 · 分层观察','V6 · 经络专项');p.write_text(s)
p=root/'styles.css';s=(base/'styles.css').read_text()+'''
/* V6 meridian-only refinement */
.v6-select-row{display:flex;align-items:center;gap:7px;margin:8px 0;font-size:12px;color:#42574e}.v6-select-row select{min-width:0;flex:1;padding:7px;border-radius:7px;border:1px solid #c9d8ce;background:#fff}
.v6-label-leaders{position:absolute;inset:0;width:100%;height:100%;z-index:9;pointer-events:none;overflow:hidden}
#acupointLabels{z-index:10;pointer-events:none}#acupointLabels .acu-name{pointer-events:auto;cursor:pointer;position:absolute;left:0;top:0;padding:3px 5px;line-height:17px;font-size:11px;height:23px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1px solid #c2cfc6;background:rgba(253,255,250,.93);border-radius:5px;box-shadow:0 1px 3px #173b2022}
#acupointLabels .acu-name.selected{z-index:5;background:#fff2d9;border-color:#bc7815;font-weight:700}
.acu-name[hidden]{display:none!important}.v6-label-info{position:absolute;bottom:69px;left:50%;transform:translateX(-50%);z-index:18;max-width:90%;font-size:11px;white-space:nowrap;color:#3f6152;background:#fcfff6e8;border:1px solid #c5d5c7;border-radius:7px;padding:5px 9px}
.dock-collapsed .v6-label-info{bottom:58px}.v6-label-info[hidden]{display:none}
.tcm-disclaimer{font-size:11px!important;line-height:1.65}.acupoint-results button{min-height:49px}.acupoint-results button:focus-visible,.acu-name:focus-visible{outline:3px solid #467763}
@media(max-width:1100px){.v6-label-info{font-size:10px;max-width:95%;bottom:82px;overflow:hidden;text-overflow:ellipsis}#acupointLabels .acu-name{font-size:10px}.acupoint-results button{min-height:52px}}
''';p.write_text(s)
(root/'README.md').write_text('''# V6 经络专项

入口：https://hengtong320.github.io/notionweb/fullbody-tcm-v6/

保留V5骨骼、肌肉、神经与语音。仅调整经脉导览、穴位教学布局、标签、点线选择与镜头聚焦。

十四经361个标准穴名对应670个左右/中线教学标记。新增布局逐条定义，不沿整条曲线均分。坐标为项目绘制的示意，未配准皮肤、未经临床校准，并非 WHO 发布的三维数据。虚线仅为体表教学导览，不包含所有内行支脉；不用于准确取穴、针刺、诊断或复位。经外头面补充仍为单独的名称目录，不混入361个计数。

可同时选择多条经脉，分部观察。画面穴名提供清晰排布、显示全部在屏穴名、仅当前穴；不再默默限制24个或多选后全隐藏。完整目录始终含全部所选穴名。点击列表、标签、3D点会聚焦教学位置，选择线段则明确显示经脉段而非冒充某个穴位。

骨骼已拆开时点穴位会恢复原位再聚焦；足底、头面与后背有独立镜头朝向。新增学习位置不是精确解剖测量；浏览器检查只验证完整性、渲染、交互，不认证穴位定位准确度。
''')
print('V6_PATCH_READY')
