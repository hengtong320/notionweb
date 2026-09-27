export function initTabletWorkspace(ctx){
 const {THREE,camera,controls,scene,viewport,toast,invalidate,captureCamera,focusBounds,setMode}=ctx;
 const $=id=>document.getElementById(id),isTouch=navigator.maxTouchPoints>0;
 let immersive=false,pan=false,previous=null,resizePending=0,nativeRequested=false;
 const bar=document.createElement('div');bar.id='tabletBar';bar.className='tablet-bar';bar.hidden=true;
 bar.innerHTML='<button id="tabletExit" aria-label="退出大屏观察">退出大屏</button><button id="tabletDirectory">目录 / 图层</button><button id="tabletFit">完整显示</button><button id="tabletFocus">聚焦当前</button><button id="tabletPan" aria-pressed="false">平移</button><button id="tabletPlus" aria-label="放大模型">＋</button><button id="tabletMinus" aria-label="缩小模型">−</button><details id="tabletMore"><summary>更多</summary><button id="tabletNative">系统全屏</button><button id="tabletShot">保存图片</button><p>单指旋转；双指张合缩放、一起移动可平移。iPad 默认使用网页内大屏。系统全屏可由系统手势退出。</p></details>';
 $('stage').append(bar);
 const help=document.createElement('div');help.className='tablet-gesture-hint';help.textContent='单指旋转 · 双指缩放 / 平移';help.hidden=!isTouch;$('stage').append(help);
 controls.screenSpacePanning=true;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
 for(const name of ['gesturestart','gesturechange','gestureend'])viewport.addEventListener(name,e=>{if(e.cancelable)e.preventDefault();},{passive:false});
 viewport.addEventListener('touchmove',e=>{if(e.touches.length>1&&e.cancelable)e.preventDefault();},{passive:false});
 function refresh(){if(resizePending)return;resizePending=requestAnimationFrame(()=>{resizePending=0;document.documentElement.style.setProperty('--atlas-screen-height',(window.visualViewport?.height||innerHeight)+'px');window.dispatchEvent(new Event('atlas:viewport-resize'));invalidate();});}
 function setPan(on){pan=!!on;setMode('orbit');controls.touches.ONE=pan?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;controls.mouseButtons.LEFT=pan?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;$('tabletPan').setAttribute('aria-pressed',String(pan));$('tabletPan').classList.toggle('active',pan);viewport.dataset.pan=String(pan);help.textContent=pan?'单指平移 · 双指缩放':'单指旋转 · 双指缩放 / 平移';}
 function setImmersive(on){if(immersive===!!on)return;captureCamera();immersive=!!on;if(on){previous={nav:document.body.classList.contains('nav-open'),detail:document.body.classList.contains('detail-open')};document.body.classList.remove('nav-open','detail-open');}else{setPan(false);if(previous){document.body.classList.toggle('nav-open',previous.nav);document.body.classList.toggle('detail-open',previous.detail);}}
  document.body.classList.toggle('atlas-immersive',immersive);bar.hidden=!immersive;$('fullscreenBtn').setAttribute('aria-pressed',String(immersive));$('fullscreenBtn').title=immersive?'退出大屏观察':'大屏观察';refresh();
 }
 async function exit(){setImmersive(false);nativeRequested=false;if(document.fullscreenElement||document.webkitFullscreenElement)try{if(document.exitFullscreen)await document.exitFullscreen();else await document.webkitExitFullscreen?.();}catch{}}
 async function enterNative(){setImmersive(true);const request=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;if(!request){toast('当前浏览器保留网页内大屏观察');return false;}try{nativeRequested=true;await request.call(document.documentElement);return true;}catch{nativeRequested=false;toast('已保持网页内大屏，当前浏览器未允许系统全屏');return false;}}
 $('fullscreenBtn').addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(immersive)exit();else{setImmersive(true);if(!isTouch)enterNative();}},{capture:true});
 $('tabletExit').onclick=exit;$('tabletNative').onclick=enterNative;
 const onFullChange=()=>{if(!(document.fullscreenElement||document.webkitFullscreenElement)&&nativeRequested){nativeRequested=false;if(immersive)toast('系统全屏已退出，仍保留大屏观察与当前视角');}refresh();};
 document.addEventListener('fullscreenchange',onFullChange);document.addEventListener('webkitfullscreenchange',onFullChange);
 window.addEventListener('keydown',e=>{if(e.key==='Escape'&&immersive&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();exit();}},true);
 window.visualViewport?.addEventListener('resize',refresh);for(const name of ['orientationchange','pageshow','resize'])window.addEventListener(name,refresh);
 function visibleBox(){scene.updateMatrixWorld(true);const box=new THREE.Box3();scene.traverse(n=>{if(!n.isMesh||!n.visible||!n.geometry||(!n.userData.atlas&&!n.userData.female&&!n.userData.home))return;for(let p=n.parent;p;p=p.parent)if(!p.visible)return;box.expandByObject(n);});return box;}
 function fractions(w=viewport.clientWidth,h=viewport.clientHeight){const r=viewport.getBoundingClientRect();let top=immersive?70:170,bottom=immersive?38:90,right=immersive?22:65;
  for(const sel of immersive?['#tabletBar']:['.view-switcher','#tcmStatus','.tcm-quickbar']){const e=document.querySelector(sel);if(!e||e.hidden||!e.getClientRects().length)continue;const b=e.getBoundingClientRect();if(b.top<r.top+h*.45)top=Math.max(top,b.bottom-r.top+14);}
  if(document.body.classList.contains('detail-open')&&innerWidth<=700){const b=document.querySelector('.detail-panel')?.getBoundingClientRect();if(b&&b.top>r.top&&b.top<r.bottom)bottom=Math.max(bottom,r.bottom-b.top+15);}
  return{hf:THREE.MathUtils.clamp((h-top-bottom)/h,.28,.93),wf:THREE.MathUtils.clamp((w-right-30)/w,.5,.96),top,bottom,right};
 }
 function fit(){const box=visibleBox();if(box.isEmpty()){toast('请先显示一个结构图层');return false;}captureCamera();focusBounds(box,{direction:camera.position.clone().sub(controls.target).normalize().toArray(),up:camera.up.toArray()});invalidate();return true;}
 function zoom(f){captureCamera();const d=camera.position.clone().sub(controls.target);const len=THREE.MathUtils.clamp(d.length()*f,Math.max(3,controls.minDistance),controls.maxDistance);camera.position.copy(controls.target).add(d.setLength(len));controls.update();invalidate();}
 $('tabletFit').onclick=fit;$('tabletFocus').onclick=()=>window.__ATLAS_STUDY__?.focusCurrent();$('tabletPan').onclick=()=>setPan(!pan);$('tabletPlus').onclick=()=>zoom(.82);$('tabletMinus').onclick=()=>zoom(1.22);$('tabletShot').onclick=()=>$('captureBtn').click();
 $('tabletDirectory').onclick=()=>{document.body.classList.toggle('nav-open');document.body.classList.remove('detail-open');invalidate();};
 document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(pan){pan=false;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.mouseButtons.LEFT=THREE.MOUSE.ROTATE;$('tabletPan').setAttribute('aria-pressed','false');$('tabletPan').classList.remove('active');}}));
 function auditView(){const box=visibleBox(),ps=[];camera.updateMatrixWorld(true);if(!box.isEmpty())for(let i=0;i<8;i++)ps.push(new THREE.Vector3(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).project(camera).toArray());return{bounds:box.isEmpty()?null:[box.min.toArray(),box.max.toArray()],projectedCorners:ps,fractions:fractions(),viewOffset:camera.view?.enabled||false};}
 window.__ATLAS_TABLET__={setImmersive,exit,fit,enterNative,fractions,auditView,getState:()=>({immersive,isTouch,pan,native:!!(document.fullscreenElement||document.webkitFullscreenElement),height:viewport.clientHeight,width:viewport.clientWidth,touchOne:controls.touches.ONE,touchTwo:controls.touches.TWO,screenSpacePanning:controls.screenSpacePanning})};refresh();return window.__ATLAS_TABLET__;
}
