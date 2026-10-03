// Shared viewport framing and tablet-safe expansion. No model coordinates are changed here.
export function fitFractions(viewport){
 const r=viewport.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);
 let top=18,bottom=18,left=18,right=18;
 const expanded=document.body.classList.contains('atlas-expanded');
 const selectors=expanded?['#wideViewBar','#wideViewBottom']:['.stage-heading','.view-switcher','.study-toolbar','#tcmStatus','.control-dock','.zoom-instruction'];
 for(const sel of selectors){const e=document.querySelector(sel);if(!e||e.hidden||!e.getClientRects().length||getComputedStyle(e).visibility==='hidden')continue;const b=e.getBoundingClientRect();if(b.right<=r.left||b.left>=r.right||b.bottom<=r.top||b.top>=r.bottom)continue;
  if(b.top<r.top+h*.4)top=Math.max(top,b.bottom-r.top+12);else if(b.bottom>r.top+h*.6)bottom=Math.max(bottom,r.bottom-b.top+12);
 }
 if(!expanded)right=64;
 if(innerWidth<=650&&document.body.dataset.currentKind==='point'&&document.body.classList.contains('detail-open')){const e=document.querySelector('.detail-panel');if(e?.getClientRects().length){const b=e.getBoundingClientRect();if(b.top<r.bottom&&b.bottom>r.top)bottom=Math.max(bottom,r.bottom-b.top+12);}}
 const hf=Math.max(.28,Math.min(.94,1-2*Math.max(top,bottom)/h));
 const wf=Math.max(.38,Math.min(.94,1-2*Math.max(left,right)/w));
 return {hf,wf,top,bottom,left,right,width:w,height:h};
}
export function initViewportExperience(ctx){
 const {THREE,scene,camera,controls,viewport,focusBounds,resize,invalidate,captureCamera,restoreCamera,state,female,tissues,learning,toast}=ctx;
 const $=id=>document.getElementById(id),body=document.body,stage=$('stage');
 let expanded=false,pan=false,previous=null,nativeFailures=0,externalExits=0,resizeFrame=0;
 const touch=navigator.maxTouchPoints>1||matchMedia('(pointer:coarse)').matches;
 const top=document.createElement('div');top.id='wideViewBar';top.hidden=true;
 top.innerHTML='<button id="wideExit" type="button">退出看图</button><span class="wide-title">人体观察</span><button id="wideDirectory" type="button">目录</button><button id="wideLayers" type="button">图层</button><button id="wideMeridians" type="button">经穴</button><button id="wideDetail" type="button">详情</button><button id="wideNative" type="button" title="使用浏览器系统全屏；系统退出后仍保留铺满看图">系统全屏</button>';
 const bottom=document.createElement('div');bottom.id='wideViewBottom';bottom.hidden=true;
 bottom.innerHTML='<button id="wideZoomOut" type="button" aria-label="缩小人物">－</button><button id="wideFrame" type="button">完整显示</button><button id="wideFocus" type="button">看当前</button><button id="widePan" type="button" aria-pressed="false">单指旋转</button><button id="wideZoomIn" type="button" aria-label="放大人物">＋</button><small>双指：缩放与平移</small>';
 stage.append(top,bottom);const bodySelectorHome=document.createComment('body selector original position');$('bodySelector').before(bodySelectorHome);
 const fitButton=document.createElement('button');fitButton.id='fitVisibleBtn';fitButton.className='tool-button';fitButton.type='button';fitButton.title='完整显示当前结构，不改变图层';fitButton.setAttribute('aria-label',fitButton.title);fitButton.textContent='适配';document.querySelector('.stage-tools')?.append(fitButton);
 function nativeElement(){return document.fullscreenElement||document.webkitFullscreenElement;}
 function visibleMesh(n){if(!n.isMesh||!n.geometry)return false;if(!(n.userData.atlas||n.userData.female||ctx.bones.has(n.name)))return false;let p=n;while(p){if(!p.visible)return false;p=p.parent;}return true;}
 function visibleBounds(){scene.updateMatrixWorld(true);const box=new THREE.Box3();scene.traverse(n=>{if(!visibleMesh(n))return;if(!n.geometry.boundingBox)n.geometry.computeBoundingBox();box.union(n.geometry.boundingBox.clone().applyMatrix4(n.matrixWorld));});return box;}
 function frameAll(){const box=visibleBounds();if(box.isEmpty()){toast('当前没有可见结构，请打开一个结构图层');return false;}captureCamera();body.classList.remove('nav-open','detail-open');resize();focusBounds(box.expandByScalar(8),{direction:camera.position.clone().sub(controls.target).normalize().toArray(),up:camera.up.toArray()});invalidate();return true;}
 function layout(){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{const v=window.visualViewport;body.style.setProperty('--atlas-view-height',(v?.height||innerHeight)+'px');body.style.setProperty('--atlas-view-top',(v?.offsetTop||0)+'px');resize();invalidate();});}
 function setPan(on){pan=!!on;controls.touches.ONE=pan?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;$('widePan').textContent=pan?'单指平移':'单指旋转';$('widePan').setAttribute('aria-pressed',String(pan));}
 function enter(){if(expanded)return;previous={focus:body.classList.contains('study-focus'),scroll:scrollY,mode:state.mode};expanded=true;top.querySelector('.wide-title').after($('bodySelector'));captureCamera();body.classList.remove('study-focus','nav-open','detail-open');body.classList.add('atlas-expanded');top.hidden=bottom.hidden=false;$('fullscreenBtn').setAttribute('aria-pressed','true');window.__FOOT_ATLAS__.setMode('orbit');setPan(false);layout();}
 async function requestNative(){if(!expanded)enter();const node=document.documentElement,fn=node.requestFullscreen||node.webkitRequestFullscreen;if(!fn){toast('当前浏览器不支持系统全屏，已保持铺满看图');return false;}try{await fn.call(node);return true;}catch{nativeFailures++;toast('系统全屏未开启，铺满看图仍可继续使用');return false;}}
 async function exit(){if(!expanded)return;expanded=false;bodySelectorHome.after($('bodySelector'));body.classList.remove('atlas-expanded','nav-open','detail-open');top.hidden=bottom.hidden=true;$('fullscreenBtn').setAttribute('aria-pressed','false');setPan(false);if(previous?.focus)body.classList.add('study-focus');if(nativeElement()){try{const fn=document.exitFullscreen||document.webkitExitFullscreen;await fn?.call(document);}catch{}}window.scrollTo(0,previous?.scroll||0);layout();}
 $('fullscreenBtn').addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();expanded?exit():enter();},true);
 $('fullscreenBtn').title='铺满看图：双指缩放、平移；可选系统全屏';$('fullscreenBtn').setAttribute('aria-label','铺满看图');
 $('wideExit').onclick=exit;$('wideNative').onclick=()=>nativeElement()?(document.exitFullscreen||document.webkitExitFullscreen)?.call(document):requestNative();
 function fullChange(){if(expanded&&!nativeElement())externalExits++;$('wideNative').textContent=nativeElement()?'退出系统全屏':'系统全屏';layout();}
 document.addEventListener('fullscreenchange',fullChange);document.addEventListener('webkitfullscreenchange',fullChange);
 $('wideFrame').onclick=frameAll;fitButton.onclick=frameAll;
 $('wideFocus').onclick=()=>{body.classList.remove('nav-open','detail-open');if(!$('focusCurrent').disabled)$('focusCurrent').click();invalidate();};
 $('wideZoomIn').onclick=()=>$('zoomInBtn').click();$('wideZoomOut').onclick=()=>$('zoomOutBtn').click();$('widePan').onclick=()=>setPan(!pan);
 function openTab(which){window.__ATLAS_SHARED__.showSection(which);body.classList.remove('detail-open');body.classList.add('nav-open');}
 $('wideDirectory').onclick=()=>openTab('directory');$('wideLayers').onclick=()=>openTab('layers');$('wideMeridians').onclick=()=>openTab('meridians');$('wideDetail').onclick=()=>{body.classList.remove('nav-open');body.classList.toggle('detail-open');};
 const closePanel=document.createElement('button');closePanel.id='wideClosePanel';closePanel.textContent='收起面板';closePanel.type='button';document.querySelector('.workspace').append(closePanel);closePanel.onclick=()=>{body.classList.remove('nav-open','detail-open');layout();};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded&&!document.querySelector('dialog[open]')){e.stopImmediatePropagation();exit();}},true);
 viewport.addEventListener('touchmove',e=>{if(e.touches.length>1&&e.cancelable)e.preventDefault();},{passive:false});
 for(const type of ['gesturestart','gesturechange','gestureend'])viewport.addEventListener(type,e=>{if(e.cancelable)e.preventDefault();},{passive:false});
 controls.screenSpacePanning=true;controls.enablePan=true;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
 window.visualViewport?.addEventListener('resize',layout);window.visualViewport?.addEventListener('scroll',layout);window.addEventListener('orientationchange',layout);window.addEventListener('resize',layout);
 function addContextActions(){
  const current=window.__ATLAS_STUDY__?.getState().current;if(current?.kind!=='tissue')return;
  const card=female.active?$('femaleDetail'):$('tissueDetail');if(!card||card.hidden||card.querySelector('[data-body-context]'))return;
  const btn=document.createElement('button');btn.type='button';btn.dataset.bodyContext='true';btn.className='body-context-button';btn.textContent='看人体位置';btn.onclick=async()=>{if(female.active){await female.ensureBodyContext();female.focus();}else{tissues.ensureBodyContext();tissues.choose(current.id,true);}invalidate();};card.querySelector('.female-actions,.v4-button-row')?.append(btn);
 }
 const hegu=document.createElement('section');hegu.id='heguReferenceCard';hegu.hidden=true;hegu.innerHTML='<h3>合谷 · 掌骨参照</h3><p>手背，第2掌骨桡侧中点；桡侧是拇指侧。</p><button id="heguLandmarks" type="button">看掌骨参照</button><small>本点已按本模型掌骨中段重新计算观察参照；体表位置仍待独立复核。</small>';
 document.querySelector('.detail-scroll').append(hegu);
 $('heguLandmarks').onclick=async()=>{if(female.active)return;const p=learning.getState().selectedPoint;await window.__ATLAS_SHARED__.choose('bones',true);learning.toggleTCM(true);learning.setMeridians(['LI']);learning.setTCMSide(p?.side||'right');learning.selectPoint('LI4',p?.side||'right',true);};
 function details(){const st=learning.getState(),p=st.selectedPoint;hegu.hidden=!(p?.code==='LI4'&&!female.active&&st.cardOpen);if(!hegu.hidden){const host=$('tcmPointCard');const actions=host.querySelector('.tcm-card-actions');if(actions)actions.after(hegu);else host.append(hegu);}addContextActions();}
 window.addEventListener('atlas:selection',()=>queueMicrotask(details));window.addEventListener('atlas:structure-updated',()=>queueMicrotask(details));
 window.__ATLAS_VIEW__={enter,exit,frameAll,requestNative,setPan,getFrameAudit:()=>{const b=visibleBounds(),v=[];camera.updateMatrixWorld(true);if(!b.isEmpty())for(let i=0;i<8;i++)v.push(new THREE.Vector3(i&1?b.max.x:b.min.x,i&2?b.max.y:b.min.y,i&4?b.max.z:b.min.z).project(camera).toArray());return {corners:v,fit:fitFractions(viewport),near:camera.near,far:camera.far};},getBounds:()=>{const b=visibleBounds();return b.isEmpty()?null:{min:b.min.toArray(),max:b.max.toArray()};},getState:()=>({version:'16.0.1',expanded,native:!!nativeElement(),touch,pan,nativeFailures,externalExits,viewport:{width:viewport.clientWidth,height:viewport.clientHeight},fit:fitFractions(viewport)})};
 layout();
}
