from pathlib import Path
import json, shutil, hashlib, re, math
T=Path('atlas-meridian-v6-delivery'); P=Path('fullbody-tcm-v6'); B=Path('fullbody-tcm-v5')
if P.exists(): raise RuntimeError('V6 already exists; refusing to overwrite an accepted viewer')
shutil.copytree(B,P)
for name in ['checks','qa','qa-v3','qa-v4']:shutil.rmtree(P/name,ignore_errors=True)
for name in ['delivery-release.json','build-info.json']:(P/name).unlink(missing_ok=True)
raw=(B/'acupoints-data.js').read_text();catalog=json.loads(raw.split('export const ACUPOINTS=',1)[1].strip().rstrip(';'))
refs=json.loads((B/'reference-data.js').read_text().split('=',1)[1].strip().rstrip(';'));old={r['code']:r for r in refs}
regions=['head','neck','chest','abdomen','pelvis','back','shoulder','upper','elbow','forearm','wrist','hand','thigh','knee','leg','ankle','foot','sole']
zh=['头面部','颈部','胸部','腹部','骨盆及会阴区域','背腰部','肩胛区','上臂','肘部','前臂','腕部','手部','大腿','膝部','小腿','踝部','足部','足底']
rows={}
for line in (T/'navigation-table.txt').read_text().splitlines():
 if not line.strip():continue
 code,coord,reg,view=line.split('|');reg=int(reg);pos=[float(x) for x in coord.split(',')];direction=[float(x) for x in view.split(',')]
 assert code not in rows and len(pos)==len(direction)==3 and all(math.isfinite(x) for x in pos+direction)
 note=old.get(code,{}).get('locationNote',zh[reg]+'的部位导航参照；请结合原始定位资料学习。图中位置未经皮肤或临床定位配准。')
 if code=='KI27':note='锁骨下缘、前胸内侧区域的示意参照；肾经胸部端，不是精确取穴位置。'
 if code=='KI1':note='足底前部的区域参照；从足底朝向观察，不在足背。'
 if code=='LI20':note='鼻翼旁、鼻唇沟附近的迎香部位参照；皮肤和软组织尚未精确配准。'
 if code in ['CV1','GV1','GV25','GV27','GV28']:note='会阴或面部软组织相应区域的导航示意；当前模型缺少完整皮肤或黏膜，不能从骨面精确取穴。'
 rows[code]={'code':code,'position':pos,'region':regions[reg],'regionLabel':zh[reg],'view':direction,'focusRadius':48 if reg in [0,10,11,15,16,17] else 90,'locationNote':note,'landmarks':old.get(code,{}).get('landmarks',[]),'positionQuality':'navigation-reference','navigationOnly':True,'method':'按部位、骨性标志及分寸关系近似换算；非临床定位坐标','sourceScheme':'WHO 2008 名称及部位体系；三维位置为本项目近似导航示意','reference':'https://iris.who.int/handle/10665/353407'}
assert set(rows)=={p['code'] for p in catalog} and len(rows)==361
(P/'navigation-points-v6.js').write_text('/* Model-specific region navigation; NOT clinical registration. */\nexport const NAVIGATION_POINTS='+json.dumps(list(rows.values()),ensure_ascii=False,separators=(',',':'))+';\n')
(P/'route-guides-v6.js').write_text('''export function createGuidePaths(THREE,bones,meridian,side,data){
 const p=Object.fromEntries(data.map(d=>[d.code,d.position]));
 const mid=99.55318155698478,mirror=v=>new THREE.Vector3(side==='left'?2*mid-v[0]:v[0],v[1],v[2]);
 const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>p[meridian+(a+i)]).filter(Boolean);
 const route=(points,note)=>({points:points.filter(Boolean).map(v=>v.clone()),note:note+'；体表区域导览，未含全部内行和支脉，非临床定位线'});
 if(meridian==='EX')return [];
 if(meridian==='BL')return [route(range(1,10),'头颈段'),route([p.BL10,...range(11,30),p.BL35,p.BL36,p.BL37,p.BL38,p.BL39,p.BL40,...range(55,67)],'背内侧及下肢段'),route([p.BL10,...range(41,54),p.BL36,p.BL40],'背外侧支线'),route(range(31,34),'骶后区参照点组')];
 if(meridian==='KI')return [route([...range(1,10),mirror([69,528,-92]),mirror([72,685,-66]),mirror([81,781,12]),...range(11,27)],'足底至腹胸段')];
 if(meridian==='GV')return [route(range(1,24),'骶腰背、颈及头顶段'),route([p.GV24,mirror([mid,1577,71]),...range(25,28)],'面部及上唇区域')];
 return [route([...data].sort((a,b)=>a.ordinal-b.ordinal).map(d=>d.position),'各穴名对应区域')];
}
''')
s=(P/'app.js').read_text()
def replace_once(text,a,b):
 if a not in text:raise RuntimeError('Missing patch anchor: '+a[:100])
 return text.replace(a,b,1)
s=replace_once(s,'function focusBounds(box){','function focusBounds(box,options={}){')
s=replace_once(s,"const center=box.getCenter(new THREE.Vector3()),dir=camera.position.clone().sub(controls.target).normalize();if(dir.lengthSq()<.1||Math.abs(dir.y)>.96)dir.set(0,.1,1).normalize();\n camera.up.set(0,1,0);syncCameraUp();","const center=box.getCenter(new THREE.Vector3()),dir=options.direction?new THREE.Vector3(...options.direction).normalize():camera.position.clone().sub(controls.target).normalize();if(dir.lengthSq()<.1||(!options.direction&&Math.abs(dir.y)>.96))dir.set(0,.1,1).normalize();\n camera.up.copy(options.up?new THREE.Vector3(...options.up):new THREE.Vector3(0,1,0));if(Math.abs(camera.up.dot(dir))>.98)camera.up.set(0,0,1);syncCameraUp();")
s=replace_once(s,'camera.far=Math.max(24000,distance*8);camera.updateProjectionMatrix();controls.update();controls.enableDamping=old;','camera.far=Math.max(24000,distance*8);camera.updateProjectionMatrix();controls.update();camera.updateMatrixWorld(true);controls.enableDamping=old;')
s=replace_once(s,'if(changed&&state.ready)fitToContent(false);needsLabelRebuild=true;','if(changed&&state.ready){if(learningEnhancements?.hasNavigationFocus?.())learningEnhancements.restoreNavigationFocus();else fitToContent(false);}needsLabelRebuild=true;')
s=replace_once(s,'fitToContent,focusBounds,setView,bonePinyin,MERIDIANS,ACUPOINTS,speech}','fitToContent,focusBounds,setView,bonePinyin,MERIDIANS,ACUPOINTS,speech,prepareReferenceFocus}')
s=replace_once(s,'async function main(){','''function prepareReferenceFocus(){
 const moved=state.explode>0||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.01||b.quaternion.angleTo(new THREE.Quaternion())>.01);
 if(moved)resetBones(true);
 const hidden=state.hidden.size>0||state.isolated||state.neighbors;
 state.hidden.clear();state.isolated=false;state.neighbors=false;
 if(state.mode!=='orbit')setMode('orbit');
 if(state.region!=='body'||state.side!=='both'){state.side='both';setRegion('body',false);}else if(hidden){applyVisibility();updateTree();}
}
async function main(){''')
s=s.replace('version:"5.0"','version:"6.0"');(P/'app.js').write_text(s)
s=(P/'learning-enhancements.js').read_text()
s=replace_once(s,"import {createGuidePaths} from './route-guides-v5.js';","import {createGuidePaths} from './route-guides-v6.js';\nimport {NAVIGATION_POINTS} from './navigation-points-v6.js';")
s=replace_once(s,'const refMap=Object.fromEntries(REFERENCES.map(p=>[p.code,p]));','const refMap=Object.fromEntries([...REFERENCES,...NAVIGATION_POINTS].map(p=>[p.code,p]));')
s=replace_once(s,'let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=true, guideOn=true;','''let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=true, guideOn=true;
 let autoFocus=true,labelPage=0,labelMode='complete',navigationFocus=null,focusSerial=0,lastLabelsAt=0;
 let labelStats={total:0,inView:0,shown:0,page:1,pages:1,capacity:0};''')
s=replace_once(s,'const autoSpeak=()=>',"controls.addEventListener('start',()=>{navigationFocus=null;focusSerial++;});\n const autoSpeak=()=>")
s=s.replace('经脉对照 · 参考点','经脉与穴名 · 点击定位').replace('点名目录含尚未标注位置的条目。','十四经361个穴名均有部位导航；示意点不等于临床定位。')
s=s.replace('<label class="tcm-search">','<label class="tcm-xray"><input id="autoFocusPoint" type="checkbox" checked>点击穴名／点位，自动转向并聚焦</label><label class="tcm-search">')
s=s.replace('穴名 / 无声调拼音 / LU5','穴名 / 拼音 / 编码，如迎香、KI27')
s=s.replace('已停用旧版均匀插值点位。现仅显示逐点参考锚点；未配准皮肤、未经临床校准。顺序线只连接连续已标注穴名，不代表完整经络循行或实体管道。','点位为按部位和骨性标志建立的导航示意，未经临床定位校准。虚线展示体表区域，不含完整内行、络脉及其他支脉。')
s=replace_once(s,"const hover=document.createElement('div');",'''const labelNav=document.createElement('div');labelNav.id='acupointLabelNav';labelNav.className='acupoint-label-nav';labelNav.hidden=true;
 labelNav.innerHTML='<button id="labelModeToggle" aria-pressed="true">完整穴名</button><button id="labelPrevious" aria-label="上一页穴名">‹</button><span id="labelPageInfo"></span><button id="labelNext" aria-label="下一页穴名">›</button><button id="labelFitAll">看全线</button>';
 document.querySelector('.stage').append(labelNav);
 const wires=document.createElementNS('http://www.w3.org/2000/svg','svg');wires.classList.add('acupoint-label-wires');labels.append(wires);
 const hover=document.createElement('div');''')
s=replace_once(s,"$('acupointSearch').oninput=renderResults;","""$('acupointSearch').oninput=renderResults;
 $('autoFocusPoint').onchange=e=>autoFocus=e.target.checked;
 $('labelPrevious').onclick=()=>{labelPage=Math.max(0,labelPage-1);lastLabelsAt=0;};
 $('labelNext').onclick=()=>{labelPage=Math.min(labelStats.pages-1,labelPage+1);lastLabelsAt=0;};
 $('labelFitAll').onclick=()=>fitMeridian();
 $('labelModeToggle').onclick=()=>{labelMode=labelMode==='complete'?'smart':'complete';labelPage=0;$('labelModeToggle').textContent=labelMode==='complete'?'完整穴名':'就近穴名';$('labelModeToggle').setAttribute('aria-pressed',String(labelMode==='complete'));lastLabelsAt=0;};""")
s=s.replace("const q=normalize($('acupointSearch').value);","const q=normalize($('acupointSearch').value.replace(/影像穴?|迎像穴?/g,'迎香').replace(/穴$/,''));")
s=s.replace('function setMeridians(ids){','function setMeridians(ids){navigationFocus=null;labelPage=0;')
s=s.replace('function setTCMSide(side){','function setTCMSide(side){labelPage=0;navigationFocus=null;')
s=s.replace("if(id==='ALL'){setMeridians(ctx.MERIDIANS.map(m=>m.id));return;}","if(id==='ALL'){setMeridians(ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id));toggleTCM(true);fitMeridian();return;}")
s=s.replace('setMeridians([...selectedMeridians]);toggleTCM(true);});','setMeridians([...selectedMeridians]);toggleTCM(true);fitMeridian();});')
s=s.replace("ctx.MERIDIANS.map(m=>m.id):[id]","ctx.MERIDIANS.filter(m=>m.id!=='EX').map(m=>m.id):[id]")
s=s.replace("panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>setTCMSide(b.dataset.tcmSide));","panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>{setTCMSide(b.dataset.tcmSide);fitMeridian();});")
s=s.replace("$('guideBack').onclick=()=>{ctx.setView('back');fitMeridian();};$('guideFront').onclick=()=>{ctx.setView('front');fitMeridian();};","$('guideBack').onclick=()=>fitMeridian([0,.05,-1]);$('guideFront').onclick=()=>fitMeridian([0,.05,1]);")
s=replace_once(s,"const smooth=new THREE.CatmullRomCurve3(path.points,false,'centripetal',.2).getPoints(Math.max(24,path.points.length*6));","const smooth=[];for(let j=1;j<path.points.length;j++){const a=path.points[j-1],b=path.points[j],steps=Math.max(2,Math.ceil(a.distanceTo(b)/7));for(let k=0;k<steps;k++)smooth.push(a.clone().lerp(b,k/steps));}if(path.points.length)smooth.push(path.points[path.points.length-1].clone());")
s=s.replace('r.line.visible=show&&linesOn&&!guideOn&&r.hasSegments;r.outline.visible=r.line.visible;','r.line.visible=false;r.outline.visible=false;')
s=s.replace('虚线：走向导览；圆点：已收录的参考锚点。未标注的穴位只在目录，不补假点。当前 ${gn} 段导览。','虚线：体表区域导览；圆点：穴名导航示意（未经临床校准）。当前 ${gn} 段导览。')
s=s.replace('当前仅连接编号连续的参考点；未标注段不连线。勾选走向导览可查看示意虚线。','线路已关闭；点位和穴名仍可查看。勾选虚线导览恢复线路。')
s=s.replace('${arr.filter(p=>p.mapped).length}有参考锚点','${arr.filter(p=>p.mapped).length}可导航')
s=s.replace("p.mapped?'参考锚点':'仅名称目录'","p.mapped?(p.regionLabel||'部位示意'):'资料条目'")
s=s.replace("selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},true)","selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},autoFocus)")
a=s.index(' function fitMeridian(){');b=s.index(' function renderResults()',a);s=s[:a]+(T/'focus-functions.js.txt').read_text()+s[b:]
s=replace_once(s,'function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;selectedPoint=p;clearSelectedMarker();',"""function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;
  if(p.position){if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);if(tcmSide!=='both'&&p.side!=='midline'&&p.side!==tcmSide)setTCMSide(p.side);toggleTCM(true);}
  selectedPoint=p;labelPage=0;clearSelectedMarker();""")
s=s.replace('selectedMarker.renderOrder=30','selectedMarker.renderOrder=60')
s=s.replace('定位文字与体表标志','对应部位 · 导航参照').replace('聚焦参考点','聚焦此部位')
s=s.replace('三维点是逐点人工标注的学习参考点，仍未经临床或体表配准验证，并非已注册皮肤上的标准穴位。肌肉层也不能代替皮肤定位。','这是按所属部位、骨性标志和分寸关系近似换算的导航示意，未经临床校准。缺少皮肤和部分软组织时只能作区域对照，不能用于取穴。')
s=s.replace('说明涉及的骨性标志（非最近距离猜测）','相关骨性参照（不能代替体表取穴）')
s=s.replace('if(focus&&p.position){focusPoint(p.position);if(compact())setPanel(false);}','if(focus&&p.position){focusPoint(p.position);}')
s=s.replace("if(focus&&!p.position)document.body.classList.add('detail-open');","if(focus&&!p.position){document.body.classList.add('detail-open');toast('该补充穴为资料条目，尚无三维位置；不伪装成聚焦成功');}")
s=replace_once(s,"function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);return !!p&&selectPoint(p,false);}","""function hitRoute(e){
  if(!enabled||suspended||!guideOn||!linesOn)return null;let best=null,bestDistance=e.pointerType==='touch'?14:8;
  for(const r of routeRecords.filter(routeMatches))for(const g of r.guides)for(let i=1;i<g.points.length;i++){
   const a=project({position:g.points[i-1]}),b=project({position:g.points[i]});if(a.z< -1||a.z>1||b.z< -1||b.z>1)continue;
   const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((e.clientX-a.x)*dx+(e.clientY-a.y)*dy)/(dx*dx+dy*dy||1)));
   const d=Math.hypot(e.clientX-a.x-t*dx,e.clientY-a.y-t*dy);if(d<bestDistance){bestDistance=d;best=r;}
  }return best;
 }
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);if(p)return selectPoint(p,autoFocus);const r=hitRoute(e);if(!r)return false;setMeridian(r.meridian);setTCMSide(r.side==='midline'?'both':r.side);fitMeridian();toast(meridianMap[r.meridian].name+' · 已聚焦所选线路');return true;}
""")
a=s.index('  const key=[enabled,pointsOn,namesOn,');b=s.index(" $('meridianQuick').add",a);s=s[:a]+(T/'label-functions.js.txt').read_text()+s[b:]
s=replace_once(s,'window.__ATLAS_LEARNING__={setMeridians,',"""window.__ATLAS_LEARNING__={hasNavigationFocus:()=>!!navigationFocus&&enabled,restoreNavigationFocus:()=>{if(navigationFocus){const f=navigationFocus;ctx.focusBounds(f.box,{direction:f.direction,up:f.up});}},setLabelPage:value=>{labelPage=Math.max(0,Number(value)||0);lastLabelsAt=0;},getNavigationCatalog:()=>routeRecords.flatMap(r=>r.data.map(p=>({code:p.code,name:p.name,side:p.side,position:p.position.toArray(),region:p.region,view:p.view}))),getRouteScreen:(id,side='right')=>{const r=routeRecords.find(r=>r.meridian===id&&(r.side===side||r.side==='midline'));return r?.guides.flatMap(g=>g.points.map(position=>project({position})))||[];},setMeridians,""")
s=s.replace('getState:()=>({guideOn,','getState:()=>({labelStats,autoFocus,navigationFocus:navigationFocus&&{title:navigationFocus.title,serial:navigationFocus.serial,center:navigationFocus.box.getCenter(new THREE.Vector3()).toArray()},guideOn,').replace("version:'5.0'","version:'6.0'")
(P/'learning-enhancements.js').write_text(s)
css='''
.acupoint-label-layer{position:absolute;inset:0;pointer-events:none;z-index:7;overflow:hidden}
.acupoint-label-wires{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.acupoint-label-wires path{fill:none;stroke:#557b68;stroke-width:.7;opacity:.32}
.acupoint-label-wires path.active{stroke:#a34f11;stroke-width:1.6;opacity:.85}
.acu-name.v6-label{position:absolute;left:0;top:0;pointer-events:auto;height:23px;padding:2px 5px;border:1px solid #cbd8cb;background:rgba(250,253,247,.95);border-radius:5px;color:#263e32;font:500 11px/18px 'PingFang SC','Microsoft YaHei',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-shadow:0 1px 3px #2338250d;cursor:pointer;text-align:left}
.acu-name.v6-label.selected{border-color:#ba6929;background:#fff1dc;color:#6e360c;z-index:2;font-weight:700}
.acu-name.v6-label:focus-visible{outline:2px solid #347a60;outline-offset:1px}
.acupoint-label-nav{position:absolute;right:12px;bottom:68px;z-index:13;display:flex;align-items:center;gap:4px;padding:5px;background:#f8fbf4ed;border:1px solid #ccd7c8;border-radius:8px;max-width:calc(100% - 24px);box-shadow:0 2px 10px #172d1410}
.acupoint-label-nav[hidden]{display:none}
.acupoint-label-nav button{border:1px solid #d2ddcc;background:#fff;border-radius:5px;color:#355b40;min-width:25px;height:27px;padding:0 6px;font-size:11px;cursor:pointer}
.acupoint-label-nav button:disabled{opacity:.35;cursor:default}
.acupoint-label-nav span{font-size:10px;color:#58715b;white-space:nowrap}
.acupoint-results button[data-point]{min-height:47px}
.acupoint-results button.active{outline:1px solid #609374;background:#eaf3e8}
.tcm-controls .selection-help,.guide-coverage{line-height:1.6}
@media(max-width:600px){.acupoint-label-nav{bottom:67px;right:5px;padding:3px;gap:2px;max-width:calc(100% - 10px)}.acupoint-label-nav button{font-size:10px;padding:0 4px;height:28px}.acupoint-label-nav span{font-size:9px}.acu-name.v6-label{font-size:10px}.study-toolbar{max-width:calc(100% - 12px)}}
'''
(P/'styles.css').write_text((P/'styles.css').read_text()+css)
(P/'index.template.html').write_text((P/'index.template.html').read_text().replace('V5 · 分层观察','V6 · 经穴导航').replace('V5','V6'))
coverage={'version':'6.0','classicalNames':361,'navigationReferences':361,'bilateralMarkers':670,'clinicalCalibration':False,'sourceNote':'WHO 2008 locations and TARA curated catalog consulted; positions are model-specific approximate regional references, not clinical registration','sourceURLs':['https://github.com/SciCrunch/TARA-Ontology-Repository/blob/master/curated-data/acupoints/acupoints.csv','https://iris.who.int/handle/10665/353407'],'channels':{m:sum(p['meridian']==m for p in catalog) for m in ['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','GV','CV']},'coordinateTableSHA256':hashlib.sha256((T/'navigation-table.txt').read_bytes()).hexdigest()}
(P/'meridian-reference-coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2))
(P/'README.md').write_text('''# V6 经穴导航修订

入口：https://hengtong320.github.io/notionweb/fullbody-tcm-v6/

保留210骨块及原肌肉、神经、音频资源。只改进经络穴名的覆盖、目录/点位/标签联动聚焦、线路点击和穴名分页。

十四经361个名称均有独立的部位导航示意，左右及中线共670个标记。肾经覆盖足底至腹胸段；膀胱经背部内外两线显式分支，不按40→41从膝部跳回背部。虚线仅为体表区域导航，不包括完整内行、经筋、络脉和全部支脉。

注意：新增位置依照部位及骨性标志近似换算，没有皮肤或临床配准。已有与新增点都不是准确取穴坐标，不能用于针刺、诊断或手法复位。补充的12个经外名称保留资料状态，尚未统一建立三维定位。

点击目录、3D圆点或穴名标签可自动转向对应部位；可关闭自动聚焦。完整穴名按屏幕容量分页，不因多选经脉而整批消失；视野外的穴名可通过看全线、目录及搜索访问。音频没有在这一轮重新审听。

源码、定位参照说明、浏览器交互检查与页面截图随本目录发布。浏览器测试不是临床解剖准确度认证。
''')
print('V6 navigation names',len(rows),'preserved bones',210)
