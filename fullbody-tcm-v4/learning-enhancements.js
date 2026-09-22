import {REFERENCES} from './reference-data.js';
import {LineSegments2} from 'three/addons/lines/LineSegments2.js';
import {LineSegmentsGeometry} from 'three/addons/lines/LineSegmentsGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

// V3: panels are navigation; layer visibility is an independent, persistent state.
export function initLearningEnhancements(ctx) {
 const {THREE, scene, camera, renderer, viewport, bones, BONES, BY_ID, state, controls, toast, selectBone, setRegion, setSide, fitToContent} = ctx;
 const $ = id => document.getElementById(id);
 const store = {get(k,d){try{return localStorage.getItem(k)??d;}catch{return d;}},set(k,v){try{localStorage.setItem(k,v);}catch{}}};
 const compact = () => innerWidth <= 1100;
 const normalize = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\s·]/g,'');
 const bonePinyin = id => ctx.bonePinyin(BY_ID[id]);
 ctx.MERIDIANS=[...ctx.MERIDIANS,{id:'EX',short:'头面补充',name:'经外／头面补充',pinyin:'jīng wài',color:'#8259a0',count:12}];
 const refMap=Object.fromEntries(REFERENCES.map(p=>[p.code,p]));
 ctx.ACUPOINTS=[...ctx.ACUPOINTS.map(p=>({...p,...refMap[p.code],mapped:!!refMap[p.code]?.position})),...REFERENCES.filter(p=>p.meridian==='EX').map(p=>({...p,mapped:!!(p.position||p.parts)}))];
 const meridianMap=Object.fromEntries(ctx.MERIDIANS.map(m=>[m.id,m]));
 let selectedMeridians=new Set(['HT','SI']),suspended=false;
 const PAIR = new Set(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR']);
 const routeRoot = new THREE.Group(); routeRoot.name='Individually annotated reference anchors V4'; scene.add(routeRoot);
 let enabled=false, panelOpen=false, linesOn=true, pointsOn=true, namesOn=true, xray=false;
 let activeMeridian=store.get('atlas-meridian','LU'), tcmSide='both', selectedPoint=null, selectedMarker=null, cardOpen=false;
 if(!meridianMap[activeMeridian] && activeMeridian!=='ALL') activeMeridian='LU';
 const pointIndex=new Map(), routeRecords=[], labelNodes=[];
 let hoveredPoint=null, lastHover=0, lastLabelRebuild='', lastPose='', lastSize='';
 const autoSpeak=()=>store.get('atlas-auto-speak','1')!=='0';
 function speak(text){return ctx.speech.speak(text);}
 function setAutoSpeak(on){store.set('atlas-auto-speak',on?'1':'0');$('autoSpeakBtn').classList.toggle('active',on);$('autoSpeakBtn').setAttribute('aria-pressed',String(on));}
 const sidebar=document.querySelector('.sidebar'), detail=document.querySelector('.detail-panel');
 const bonePane=document.createElement('div');bonePane.className='bone-pane';
 while(sidebar.firstChild)bonePane.append(sidebar.firstChild);sidebar.append(bonePane);
 const tabs=document.createElement('div');tabs.className='library-tabs';tabs.innerHTML='<button id="boneTab" class="active">骨骼目录</button><button id="tcmTab">经络穴位</button><button id="closeNav" title="收起目录" aria-label="收起目录">收起</button>';sidebar.prepend(tabs);
 const drawer=document.createElement('div');drawer.className='drawer-buttons';drawer.innerHTML='<button id="openNav">部位 / 目录</button><button id="openDetail">详情</button>';document.querySelector('.header-actions').prepend(drawer);
 const closeDetail=document.createElement('button');closeDetail.id='closeDetail';closeDetail.textContent='收起详情';document.querySelector('.detail-top').prepend(closeDetail);
 const speakButton=document.createElement('button');speakButton.id='speakBoneBtn';speakButton.className='speak-bone-button';speakButton.textContent='▶ 朗读骨名';document.querySelector('.detail-top').append(speakButton);speakButton.onclick=()=>speak(BY_ID[state.selected]?.name);
 const tools=document.querySelector('.stage-tools');
 const auto=document.createElement('button');auto.id='autoSpeakBtn';auto.title='点选时自动朗读';auto.textContent='声';auto.setAttribute('aria-label','点选时自动朗读');tools.prepend(auto);auto.onclick=()=>setAutoSpeak(!autoSpeak());setAutoSpeak(autoSpeak());
 const more=document.createElement('button');more.id='moreViewsBtn';more.title='更多学习焦点';more.textContent='局部';tools.prepend(more);
 const viewPanel=document.createElement('div');viewPanel.id='moreViewsPanel';viewPanel.className='more-views-panel';viewPanel.hidden=true;viewPanel.innerHTML='<div class="panel-kicker">局部快捷观察</div><div class="preset-grid"></div>';document.querySelector('.stage').append(viewPanel);
 const PRESETS=[['face','面颅与下颌','head','mandible'],['skullbase','颅底','head','sphenoid'],['craniovertebral','颅颈交界','cervical','C1'],['neckshoulder','颈肩','shoulder','clavicle-right'],['shoulderjoint','肩关节','shoulder','humerus-right'],['elbowjoint','肘关节','elbow','radius-right'],['forearm','前臂','upper','radius-right'],['palm','腕掌与手指','hand','capitate-right'],['kneejoint','膝关节','knee','patella'],['anklejoint','踝关节','ankle','talus'],['plantar','足底','foot','calcaneus'],['sacroiliac','骶髂区','pelvis','sacrum']];
 for(const [id,name] of PRESETS){const b=document.createElement('button');b.dataset.preset=id;b.textContent=name;b.onclick=()=>runPreset(id);viewPanel.querySelector('.preset-grid').append(b);}
 function runPreset(id){const p=PRESETS.find(p=>p[0]===id);if(!p)return false;let bid=p[3];if(state.side==='left'){const original=BY_ID[bid];bid=BONES.find(b=>b.side==='left'&&b.baseId===original?.baseId)?.id||bid;}
  setRegion(p[2]);selectBone(bid,true,false);viewPanel.hidden=true;
  if(id==='plantar')ctx.setView('plantar');else if(['skullbase','face'].includes(id))fitToContent(true,null,null,true);
  document.body.classList.remove('nav-open');return true;
 }
 more.onclick=()=>{viewPanel.hidden=!viewPanel.hidden;};
 const toolbar=document.createElement('div');toolbar.className='study-toolbar';toolbar.innerHTML='<button id="tcmLayerToggle" aria-pressed="false">经络：隐藏</button><select id="meridianQuick" aria-label="快速切换经脉"></select><button id="tcmQuickFit">看所选</button><button id="tcmBtn">经络设置</button>';document.querySelector('.stage').append(toolbar);
 $('meridianQuick').innerHTML=ctx.MERIDIANS.map(m=>`<option value="${m.id}">${m.short} ${m.id}</option>`).join('')+'<option value="ALL">全部十四经脉</option>';$('meridianQuick').value=activeMeridian;
 const panel=document.createElement('section');panel.id='tcmControls';panel.className='tcm-controls';panel.hidden=true;panel.innerHTML=`<div class="tcm-head"><div><b>经脉对照 · 参考点</b><small>设置在侧栏，3D画面始终可操作</small></div><button id="tcmClose" aria-label="收起经络设置">收起</button></div><div class="tcm-master-row"><button id="tcmMasterToggle">显示经络</button><button id="tcmFitMeridian">看所选</button></div><div class="tcm-toggle-row"><button id="meridianLineToggle" class="active">顺序线</button><button id="acupointToggle" class="active">点位</button><button id="pointNamesToggle" class="active">穴名</button></div><div class="tcm-side-picker"><button data-tcm-side="right">人体右侧</button><button data-tcm-side="both" class="active">双侧</button><button data-tcm-side="left">人体左侧</button></div><label class="tcm-xray"><input id="tcmXray" type="checkbox">透视点线（背侧也可见，非体表深度）</label><label class="tcm-search"><input id="acupointSearch" type="search" placeholder="穴名 / 无声调拼音 / LU5" autocomplete="off"></label><div class="v4-button-row"><button id="pairHeart">心经＋小肠经</button><button id="pairLung">肺经＋大肠经</button><button id="headPoints">头面补充</button></div><div class="selection-help">可多选经脉；再次点击取消。点名目录含尚未标注位置的条目。</div><div id="meridianChips" class="meridian-chips"></div><div class="tcm-section-label">穴位名称目录 <small id="pointResultCount"></small></div><div id="acupointResults" class="acupoint-results"></div><p class="tcm-disclaimer">已停用旧版均匀插值点位。现仅显示逐点参考锚点；未配准皮肤、未经临床校准。顺序线只连接连续已标注穴名，不代表完整经络循行或实体管道。</p>`;sidebar.append(panel);
 const status=document.createElement('div');status.id='tcmStatus';status.className='tcm-status';status.hidden=true;status.innerHTML='<span class="tcm-status-dot"></span><button id="tcmStatusMain"></button><button id="tcmStatusSettings">设置</button><button id="tcmStatusHide">隐藏图层</button>';document.querySelector('.stage').append(status);
 const card=document.createElement('section');card.id='tcmPointCard';card.className='tcm-point-card';card.hidden=true;document.querySelector('.detail-scroll').prepend(card);
 const chip=document.createElement('div');chip.id='selectionChip';chip.className='selection-chip';chip.innerHTML='<button id="selectionChipText"></button><button id="chipDetails">详情</button><button id="chipSpeak">朗读</button>';document.querySelector('.stage').append(chip);
 const labels=document.createElement('div');labels.id='acupointLabels';labels.className='acupoint-label-layer';viewport.append(labels);
 const hover=document.createElement('div');hover.id='acuHover';hover.className='acu-hover';hover.hidden=true;viewport.append(hover);
 $('openNav').onclick=()=>{document.body.classList.toggle('nav-open');document.body.classList.remove('detail-open');};
 $('closeNav').onclick=()=>{document.body.classList.remove('nav-open');};
 $('openDetail').onclick=()=>{document.body.classList.toggle('detail-open');document.body.classList.remove('nav-open');};
 $('closeDetail').onclick=()=>document.body.classList.remove('detail-open');
 $('boneTab').onclick=()=>setPanel(false);$('tcmTab').onclick=()=>{toggleTCM(true);setPanel(true);};
 $('chipDetails').onclick=$('selectionChipText').onclick=()=>{if(selectedPoint&&enabled){card.hidden=false;cardOpen=true;document.body.classList.add('point-detail-active');}document.body.classList.add('detail-open');document.body.classList.remove('nav-open');};
 $('chipSpeak').onclick=()=>speak(selectedPoint&&enabled?selectedPoint.name:BY_ID[state.selected]?.name);
 window.addEventListener('atlas:bone-selected',e=>{if(e.detail?.user){selectedPoint=null;cardOpen=false;card.hidden=true;clearSelectedMarker();if(autoSpeak())speak(BY_ID[e.detail.id]?.name);}updateStatus();});
 window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){document.body.classList.remove('nav-open','detail-open');viewPanel.hidden=true;if(panelOpen)setPanel(false);}});
 $('meridianChips').innerHTML=ctx.MERIDIANS.map(m=>`<button data-meridian="${m.id}" style="--m:${m.color}">${m.short}<small>${m.id}</small></button>`).join('')+'<button data-meridian="ALL">全部经脉</button>';
 $('meridianChips').querySelectorAll('button').forEach(b=>b.onclick=()=>{const id=b.dataset.meridian;if(id==='ALL'){setMeridians(ctx.MERIDIANS.map(m=>m.id));return;}if(selectedMeridians.has(id)&&selectedMeridians.size>1)selectedMeridians.delete(id);else selectedMeridians.add(id);setMeridians([...selectedMeridians]);toggleTCM(true);});
 $('pairHeart').onclick=()=>{setMeridians(['HT','SI']);toggleTCM(true);fitMeridian();};$('pairLung').onclick=()=>{setMeridians(['LU','LI']);toggleTCM(true);fitMeridian();};$('headPoints').onclick=()=>{setMeridians(['EX']);toggleTCM(true);setRegion('head');ctx.setView('front');};
 $('meridianQuick').onchange=()=>{if($('meridianQuick').value==='MULTI'){toggleTCM(true);setPanel(true);return;}setMeridian($('meridianQuick').value);toggleTCM(true);fitMeridian();};
 $('tcmLayerToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmBtn').onclick=()=>{toggleTCM(true);setPanel(!panelOpen||!document.body.classList.contains('nav-open')&&compact());};
 $('tcmClose').onclick=()=>setPanel(false);
 $('tcmMasterToggle').onclick=()=>toggleTCM(!enabled);
 $('tcmStatusSettings').onclick=()=>setPanel(true);
 $('tcmStatusHide').onclick=()=>toggleTCM(false);
 $('tcmStatusMain').onclick=()=>selectedPoint?.position?focusPoint(selectedPoint.position):fitMeridian();
 $('tcmQuickFit').onclick=$('tcmFitMeridian').onclick=()=>{toggleTCM(true);fitMeridian();};
 for(const [id,get,set] of [['meridianLineToggle',()=>linesOn,v=>linesOn=v],['acupointToggle',()=>pointsOn,v=>pointsOn=v],['pointNamesToggle',()=>namesOn,v=>namesOn=v]])$(id).onclick=()=>{set(!get());$(id).classList.toggle('active',get());updateOverlayVisibility();};
 panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.onclick=()=>setTCMSide(b.dataset.tcmSide));
 $('tcmXray').onchange=()=>{xray=$('tcmXray').checked;updateOverlayVisibility();};
 $('acupointSearch').oninput=renderResults;
 function setPanel(open){panelOpen=!!open;panel.hidden=!panelOpen;bonePane.hidden=panelOpen;sidebar.classList.toggle('tcm-mode',panelOpen);$('boneTab').classList.toggle('active',!panelOpen);$('tcmTab').classList.toggle('active',panelOpen);$('tcmBtn').setAttribute('aria-expanded',String(panelOpen));if(compact()){document.body.classList.toggle('nav-open',panelOpen);document.body.classList.remove('detail-open');}viewPanel.hidden=true;}
 function toggleTCM(on){enabled=!!on;routeRoot.visible=enabled;updateOverlayVisibility();if(!enabled){card.hidden=true;cardOpen=false;hover.hidden=true;}updateStatus();}
 function setMeridians(ids){selectedMeridians=new Set(ids.filter(id=>meridianMap[id]));activeMeridian=selectedMeridians.size===1?[...selectedMeridians][0]:'MULTI';$('meridianQuick').value=activeMeridian;panel.querySelectorAll('[data-meridian]').forEach(b=>{b.classList.toggle('active',selectedMeridians.has(b.dataset.meridian));b.setAttribute('aria-pressed',String(selectedMeridians.has(b.dataset.meridian)));});if(selectedPoint&&!selectedMeridians.has(selectedPoint.meridian)){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}updateOverlayVisibility();renderResults();}
 function setMeridian(id){setMeridians(id==='ALL'?ctx.MERIDIANS.map(m=>m.id):[id]);}
 function setTCMSide(side){if(!['right','both','left'].includes(side))return;tcmSide=side;panel.querySelectorAll('[data-tcm-side]').forEach(b=>b.classList.toggle('active',b.dataset.tcmSide===side));if(selectedPoint&&selectedPoint.side!=='midline'&&side!=='both'&&side!==selectedPoint.side){selectedPoint=null;card.hidden=true;cardOpen=false;clearSelectedMarker();}updateOverlayVisibility();}
 function updateStatus(){if(!$('tcmStatusMain'))return;document.body.classList.toggle('point-detail-active',cardOpen&&enabled);status.hidden=!enabled;const m=meridianMap[activeMeridian];const summary=[...selectedMeridians].map(id=>meridianMap[id]?.short).join('＋');const text=selectedPoint?`${selectedPoint.name} ${selectedPoint.code} · ${selectedPoint.side==='left'?'人体左':selectedPoint.side==='right'?'人体右':'中线'}`:`${summary} · ${getVisiblePoints().length}参考点`;$('tcmStatusMain').textContent=text;status.style.setProperty('--m',m?.color||'#467961');$('tcmLayerToggle').textContent=enabled?'经络：显示':'经络：隐藏';$('tcmLayerToggle').classList.toggle('active',enabled);$('tcmLayerToggle').setAttribute('aria-pressed',String(enabled));$('tcmMasterToggle').textContent=enabled?'隐藏经络图层':'显示经络图层';$('selectionChipText').textContent=selectedPoint&&enabled?`${selectedPoint.name} · ${selectedPoint.pinyin} · ${selectedPoint.code}`:`${BY_ID[state.selected]?.name||'选择骨骼'} · ${bonePinyin(state.selected)||''}`;}
 function makePointMaterial(color,size){return new THREE.ShaderMaterial({uniforms:{tint:{value:new THREE.Color(color)},pixelSize:{value:size},pixelRatio:{value:renderer.getPixelRatio()}},vertexShader:'uniform float pixelSize;uniform float pixelRatio;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=pixelSize*pixelRatio;}',fragmentShader:'uniform vec3 tint;void main(){float d=length(gl_PointCoord-vec2(0.5));if(d>0.5)discard;vec3 c=d>0.35?vec3(0.98):tint;float a=1.0-smoothstep(0.44,0.5,d);gl_FragColor=vec4(c,a);\n#include <colorspace_fragment>\n}',transparent:true,depthWrite:false,depthTest:false,toneMapped:false});}
 function buildRoutes(){
 const mid=99.55318155698478;
 for(const m of ctx.MERIDIANS){const sideList=PAIR.has(m.id)?['right','left']:m.id==='EX'?['right','left','midline']:['midline'];
  for(const side of sideList){const members=ctx.ACUPOINTS.filter(p=>p.meridian===m.id);const data=[];
   for(const p of members){if(m.id==='EX'&&((p.side==='midline')!==(side==='midline')))continue;
    if(p.parts){if(side!=='midline')continue;p.parts.forEach((v,i)=>data.push({...p,part:i+1,side,position:new THREE.Vector3(...v)}));}
    else if(p.position){const v=new THREE.Vector3(...p.position);if(side==='left')v.x=2*mid-v.x;data.push({...p,side,position:v});}
    else pointIndex.set(p.code+'|'+side,{...p,side,position:null});
   }
   data.forEach(p=>{if(!pointIndex.get(p.code+'|'+side)?.position)pointIndex.set(p.code+'|'+side,p);});
   const c=new THREE.Color(m.color),hsl={};c.getHSL(hsl);c.setHSL(hsl.h,Math.max(.52,hsl.s),Math.min(.37,hsl.l));const color='#'+c.getHexString();
   const segments=[];if(m.id!=='EX')for(let i=1;i<data.length;i++){const a=data[i-1],b=data[i];if(Number(b.code.match(/\d+$/)?.[0])===Number(a.code.match(/\d+$/)?.[0])+1)segments.push(...a.position.toArray(),...b.position.toArray());}
   const geo=new LineSegmentsGeometry().setPositions(segments.length?segments:[0,0,0,0,0,0]);
   const material=new LineMaterial({color,linewidth:3,worldUnits:false,transparent:true,opacity:.78,depthTest:true,depthWrite:false,toneMapped:false});const line=new LineSegments2(geo,material);line.renderOrder=20;line.computeLineDistances();
   const outline=new LineSegments2(geo,new LineMaterial({color:'#ffffff',linewidth:5,worldUnits:false,transparent:true,opacity:.65,depthTest:true,depthWrite:false,toneMapped:false}));outline.renderOrder=19;
   const cloud=new THREE.Points(new THREE.BufferGeometry().setFromPoints(data.map(p=>p.position)),makePointMaterial(color,10));cloud.renderOrder=21;routeRoot.add(outline,line,cloud);routeRecords.push({meridian:m.id,side,data,line,outline,cloud,color,hasSegments:segments.length>0});
  }
 }
 }
 buildRoutes();
 function routeMatches(r){return selectedMeridians.has(r.meridian)&&(tcmSide==='both'||r.side==='midline'||r.side===tcmSide);}
 function getVisiblePoints(){return enabled&&!suspended&&pointsOn?routeRecords.filter(routeMatches).flatMap(r=>r.data):[];}
 function updateOverlayVisibility(){routeRoot.visible=enabled&&!suspended;for(const r of routeRecords){const show=enabled&&routeMatches(r);r.line.visible=show&&linesOn&&r.hasSegments;r.outline.visible=show&&linesOn&&r.hasSegments;r.cloud.visible=show&&pointsOn;for(const obj of [r.line,r.outline,r.cloud])obj.material.depthTest=!xray;r.line.material.linewidth=activeMeridian==='ALL'?2.2:3.5;r.outline.material.linewidth=activeMeridian==='ALL'?4:6.5;r.line.material.opacity=activeMeridian==='ALL'?.62:1;r.cloud.material.uniforms.pixelSize.value=activeMeridian==='ALL'?7:11;}if(selectedMarker)selectedMarker.visible=enabled&&!suspended&&pointsOn&&!!selectedPoint?.position;lastLabelRebuild='';updateStatus();}
 function fitMeridian(){const pts=routeRecords.filter(routeMatches).flatMap(r=>r.data.map(p=>p.position));if(!pts.length){toast('所选条目暂未标注三维位置，保留名称和资料入口');return;}setRegion('body',false);ctx.focusBounds(new THREE.Box3().setFromPoints(pts).expandByScalar(45));if(compact())setPanel(false);}
 function focusPoint(pos){if(!pos)return;setRegion('body',false);ctx.focusBounds(new THREE.Box3(pos.clone().addScalar(-85),pos.clone().addScalar(85)));}
 function renderResults(){const q=normalize($('acupointSearch').value);const arr=ctx.ACUPOINTS.filter(p=>(q||selectedMeridians.has(p.meridian))&&(!q||normalize([p.code,p.name,p.pinyin,p.meridianName].join(' ')).includes(q)));$('pointResultCount').textContent=`${arr.length}项 · ${arr.filter(p=>p.mapped).length}有参考锚点`;
 $('acupointResults').innerHTML=arr.map(p=>`<button data-point="${p.code}" class="${selectedPoint?.code===p.code?'active':''}"><b>${p.name}<small>${p.pinyin}</small></b><span>${p.code}<small>${p.mapped?'参考锚点':'仅名称目录'}</small></span></button>`).join('')||'<p class="empty-search">没有找到</p>';
 $('acupointResults').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=ctx.ACUPOINTS.find(p=>p.code===b.dataset.point);if(!selectedMeridians.has(p.meridian))setMeridians([...selectedMeridians,p.meridian]);toggleTCM(true);const side=PAIR.has(p.meridian)||p.side==='paired'?(tcmSide==='left'?'left':'right'):'midline';selectPoint(pointIndex.get(p.code+'|'+side)||{...p,side,position:null},true);});}
 function nearestBones(pos){return [...bones].map(([id,b])=>{const bb=b.geometry.boundingBox.clone().translate(b.userData.home);return {id,d:bb.distanceToPoint(pos)};}).sort((a,b)=>a.d-b.d).slice(0,3);}
 function clearSelectedMarker(){if(selectedMarker){routeRoot.remove(selectedMarker);selectedMarker.geometry.dispose();selectedMarker.material.dispose();selectedMarker=null;}lastLabelRebuild='';}
 function selectPoint(p,focus=false){if(!p?.name||!p?.code)return false;selectedPoint=p;clearSelectedMarker();
 if(p.position){selectedMarker=new THREE.Points(new THREE.BufferGeometry().setFromPoints([p.position]),makePointMaterial('#d37022',20));selectedMarker.renderOrder=30;routeRoot.add(selectedMarker);selectedMarker.visible=enabled&&!suspended&&pointsOn;}
 const m=meridianMap[p.meridian];cardOpen=true;card.hidden=false;document.body.classList.remove('tissue-detail-active');if($('tissueDetail'))$('tissueDetail').hidden=true;
 card.innerHTML=`<div class="tcm-card-head"><span>${m.name} · ${p.code}</span><button id="closePointCard">收起</button></div><h3>${p.name}<small>${p.pinyin} · ${p.side==='left'?'人体左侧':p.side==='right'?'人体右侧':'中线／组合'}</small></h3><h4>定位文字与体表标志</h4><p class="location-text">${p.locationNote||'此条目已收录名称与归经，位置说明待逐条复核，暂不绘制三维点。'}</p><p class="coordinate-warning">${p.position?'三维点是逐点人工标注的学习参考点，仍未经临床或体表配准验证，并非已注册皮肤上的标准穴位。肌肉层也不能代替皮肤定位。':'缺少相应标志或尚未标注：不生成假坐标，不自动跳到别的骨头。'}</p>${p.sourceScheme?`<small>${p.sourceScheme}</small>`:''}<div class="tcm-card-actions"><button id="focusPointBtn" ${p.position?'':'disabled'}>聚焦参考点</button><button id="speakPointBtn">朗读穴名</button></div><div class="point-step"><button id="pointPrev">上一穴</button><button id="pointNext">下一穴</button></div><details class="bone-reference"><summary>说明涉及的骨性标志（非最近距离猜测）</summary>${(p.landmarks||[]).filter(id=>BY_ID[id]).map(id=>`<button data-near="${id}">${BY_ID[id].name}</button>`).join('')||'待补充'}</details><p><a class="reference-link" href="${p.reference||'https://iris.who.int/handle/10665/353407'}" target="_blank" rel="noopener">查阅定位资料来源 ↗</a></p>`;
 $('closePointCard').onclick=()=>{card.hidden=true;cardOpen=false;document.body.classList.remove('detail-open','point-detail-active');};$('focusPointBtn').onclick=()=>focusPoint(p.position);$('speakPointBtn').onclick=()=>speak(p.name);$('pointPrev').onclick=()=>stepPoint(-1);$('pointNext').onclick=()=>stepPoint(1);card.querySelectorAll('[data-near]').forEach(b=>b.onclick=()=>{let id=b.dataset.near;if(p.side==='left'){const orig=BY_ID[id];id=BONES.find(b=>b.baseId===orig.baseId&&b.side==='left')?.id||id;}selectBone(id,true,true);});renderResults();updateStatus();lastLabelRebuild='';
 if(focus&&p.position){focusPoint(p.position);if(compact())setPanel(false);}if(focus&&!p.position)document.body.classList.add('detail-open');if(autoSpeak())speak(p.name);return true;
 }
 function stepPoint(d){if(!selectedPoint)return;const a=ctx.ACUPOINTS.filter(p=>p.meridian===selectedPoint.meridian),i=a.findIndex(p=>p.code===selectedPoint.code),next=a[(i+d+a.length)%a.length];selectPoint(pointIndex.get(next.code+'|'+selectedPoint.side)||{...next,side:selectedPoint.side,position:null},true);}
 function project(p){const v=p.position.clone().project(camera),r=viewport.getBoundingClientRect();return {x:r.left+(v.x*.5+.5)*r.width,y:r.top+(-v.y*.5+.5)*r.height,z:v.z};}
 function hitPoint(e){if(!enabled||suspended||!pointsOn)return null;let best=null,bestD=e.pointerType==='touch'?23:14;for(const p of getVisiblePoints()){const v=project(p);if(v.z< -1||v.z>1)continue;const d=Math.hypot(e.clientX-v.x,e.clientY-v.y);if(d<bestD){bestD=d;best=p;}}return best;}
 function handlePointerClick(e){if(state.mode!=='orbit'||e.button!==0)return false;const p=hitPoint(e);return !!p&&selectPoint(p,false);}
 viewport.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch'||performance.now()-lastHover<70){hover.hidden=true;return;}lastHover=performance.now();const p=hitPoint(e);hoveredPoint=p;if(!p){hover.hidden=true;return;}const r=viewport.getBoundingClientRect();hover.textContent=`${p.name} · ${p.pinyin} · ${p.code}`;hover.style.left=Math.min(e.clientX-r.left+15,r.width-210)+'px';hover.style.top=Math.max(8,e.clientY-r.top-38)+'px';hover.hidden=false;$('hoverTip').hidden=true;},{passive:true});
 viewport.addEventListener('pointerleave',()=>hover.hidden=true);
 function updateFrame(){
  const w=viewport.clientWidth,h=viewport.clientHeight,dpr=renderer.getPixelRatio(),sz=`${w},${h},${dpr}`;
  if(sz!==lastSize){lastSize=sz;for(const r of routeRecords){r.line.material.resolution.set(w,h);r.outline.material.resolution.set(w,h);r.cloud.material.uniforms.pixelRatio.value=dpr;}if(selectedMarker)selectedMarker.material.uniforms.pixelRatio.value=dpr;}
  const displaced=state.explode>0||[...bones.values()].some(b=>b.userData.offset.lengthSq()>.1);document.body.classList.toggle('anatomy-displaced',displaced&&enabled);
  const key=[enabled,pointsOn,namesOn,[...selectedMeridians].join(','),suspended,tcmSide,selectedPoint?.code,selectedPoint?.side].join('|');
  if(key!==lastLabelRebuild){lastLabelRebuild=key;labels.replaceChildren();labelNodes.length=0;let arr=namesOn?getVisiblePoints():[];if(selectedMeridians.size>3)arr=[];if(selectedPoint?.position&&enabled&&!suspended&&pointsOn&&!arr.includes(selectedPoint))arr=[selectedPoint,...arr];if(selectedPoint)arr.sort((a,b)=>(a===selectedPoint?-1:0)-(b===selectedPoint?-1:0));for(const p of arr){const el=document.createElement('span');el.className='acu-name'+(p===selectedPoint?' selected':'');el.textContent=`${p.name} ${p.code}`;labels.append(el);labelNodes.push({p,el});}}
  const occupied=[];let shown=0;const rect=viewport.getBoundingClientRect();const topReserve=Math.max(document.querySelector('.study-toolbar').getBoundingClientRect().bottom,status.hidden?0:status.getBoundingClientRect().bottom)-rect.top+8;const dockTop=document.querySelector('.control-dock').getBoundingClientRect().top;const chipTop=chip.offsetWidth?chip.getBoundingClientRect().top:Infinity;const bottomReserve=Math.min(dockTop,chipTop)-rect.top-28;for(const item of labelNodes){const v=project(item.p),x=v.x-rect.left+9,y=v.y-rect.top-10;let show=v.z>-1&&v.z<1&&x>0&&x<w-95&&y>topReserve&&y<bottomReserve;const box={x,y,w:92,h:25};if(show&&item.p!==selectedPoint&&(shown>=24||occupied.some(b=>x<b.x+b.w&&x+92>b.x&&y<b.y+b.h&&y+25>b.y)))show=false;item.el.hidden=!show;if(show){item.el.style.transform=`translate(${x}px,${y}px)`;occupied.push(box);shown++;}}
 }
 $('meridianQuick').add(new Option('多经脉对照','MULTI'));setMeridians(['HT','SI']);renderResults();updateStatus();
 window.__ATLAS_LEARNING__={setMeridians,suspend:value=>{if(suspended!==value){suspended=value;updateOverlayVisibility();}},getReferences:()=>ctx.ACUPOINTS.map(p=>({code:p.code,name:p.name,mapped:p.mapped,region:p.region,hasPosition:!!p.position})),handlePointerClick,hitPoint,toggleTCM,setPanel,setMeridian,setTCMSide,fitMeridian,runPreset,updateFrame,selectPoint:(code,side='right',focus=false)=>selectPoint(pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline')||{...ctx.ACUPOINTS.find(p=>p.code===code),side,position:null},focus),getPointScreen:(code,side='right')=>{const p=pointIndex.get(code+'|'+side)||pointIndex.get(code+'|midline');return p?.position?project(p):null;},speakBone:id=>speak(BY_ID[id]?.name),getState:()=>({version:'4.0',selectedMeridians:[...selectedMeridians],suspended,legacyEqualSpacingRemoved:true,clinicalCalibration:false,enabled,panelOpen,linesOn,pointsOn,namesOn,xray,tcmSide,activeMeridian,selectedPoint:selectedPoint&&{code:selectedPoint.code,name:selectedPoint.name,side:selectedPoint.side},cardOpen,statusVisible:!status.hidden,meridians:14,supplementalNames:12,standardAcupoints:361,annotatedNames:ctx.ACUPOINTS.filter(p=>p.mapped).length,markerInstances:routeRecords.reduce((n,r)=>n+r.data.length,0),visiblePoints:getVisiblePoints().length,routes:routeRecords.length,autoSpeak:autoSpeak(),lineWidthPixels:activeMeridian==='ALL'?2.2:3.5,pointSizePixels:activeMeridian==='ALL'?7:11})};
 return window.__ATLAS_LEARNING__;
}
