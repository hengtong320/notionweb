// The same camera and controls serve surface, internal layers and both bodies.
export function initNavigation({THREE,scene,camera,controls,viewport,state,focusBounds,captureCamera,invalidate,toast,zoom}){
 const $=id=>document.getElementById(id),body=document.body,tools=document.querySelector('.stage-tools');
 let mode='rotate',pickPosition=false,observingLocation=false;
 const modes=document.createElement('div');modes.className='navigation-modes';modes.setAttribute('role','group');modes.setAttribute('aria-label','拖动与局部观察');
 modes.innerHTML='<button id="navRotate" type="button" aria-pressed="true">旋转</button><button id="navPan" type="button" aria-pressed="false">平移</button><button id="navPick" type="button" aria-pressed="false">选位置</button>';
 const actions=document.createElement('div');actions.className='navigation-actions';
 for(const [id,label]of [['zoomOutBtn','− 缩小'],['zoomInBtn','＋ 放大'],['focusBtn','看当前'],['fitVisibleBtn','完整显示'],['homeBtn','回全身']]){
  const b=$(id);b.textContent=label;b.setAttribute('aria-label',label.replace(/^[−＋] /,''));b.title=label;actions.append(b);
 }
 const hint=document.createElement('p');hint.id='navigationHint';hint.textContent='拖动旋转 · 滚轮 / 双指缩放 · 双击放大此处';
 tools.replaceChildren(modes,actions,hint);tools.setAttribute('role','group');tools.setAttribute('aria-label','人物观察控制');
 function sync(){
  $('navRotate').setAttribute('aria-pressed',String(mode==='rotate'&&!pickPosition));$('navPan').setAttribute('aria-pressed',String(mode==='pan'&&!pickPosition));$('navPick').setAttribute('aria-pressed',String(pickPosition));
  $('widePan').textContent=mode==='pan'?'平移':'旋转';$('widePan').setAttribute('aria-pressed',String(mode==='pan'));
  $('widePickPosition')?.setAttribute('aria-pressed',String(pickPosition));
  body.classList.toggle('navigation-pick',pickPosition);body.classList.toggle('navigation-pan',mode==='pan');
  hint.textContent=pickPosition?'点人体上想看的位置 · Esc 取消':observingLocation?'局部位置观察 · 看当前返回所选对象':mode==='pan'?'拖动平移 · 滚轮 / 双指缩放 · 双击放大此处':'拖动旋转 · 滚轮 / 双指缩放 · 双击放大此处';
 }
 function setMode(next){
  pickPosition=false;mode=next;window.__FOOT_ATLAS__.setMode('orbit');
  controls.mouseButtons.LEFT=next==='pan'?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;
  controls.touches.ONE=next==='pan'?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;
  controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;sync();invalidate();
 }
 $('navRotate').onclick=()=>setMode('rotate');$('navPan').onclick=()=>setMode('pan');
 $('navPick').onclick=()=>{const on=!pickPosition;setMode('rotate');pickPosition=on;sync();};
 // Expanded viewing uses the same mode and focal-position action.
 $('widePan').onclick=()=>setMode(mode==='pan'?'rotate':'pan');
 const widePick=document.createElement('button');widePick.id='widePickPosition';widePick.textContent='选位置';widePick.type='button';$('wideViewBottom').insertBefore(widePick,$('wideZoomIn'));widePick.onclick=()=>$('navPick').click();
 function focusAt(event){
  if(!state.ready||state.bodyTransition||!(event.target===viewport||event.target===viewport.querySelector('canvas')))return false;
  const rect=viewport.getBoundingClientRect(),meshes=[];scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
  scene.traverse(n=>{
   if(!n.isMesh||n.userData.skinInk||!(n.userData.atlas||n.userData.female||n.userData.home))return;
   for(let p=n;p;p=p.parent)if(!p.visible)return;
   if((Array.isArray(n.material)?n.material:[n.material]).some(m=>m?.visible!==false&&m?.colorWrite!==false&&m?.opacity>.05))meshes.push(n);
  });
  const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(2*(event.clientX-rect.left)/rect.width-1,1-2*(event.clientY-rect.top)/rect.height),camera);
  const hit=ray.intersectObjects(meshes,false).find(h=>{
   const m=Array.isArray(h.object.material)?h.object.material[h.face?.materialIndex||0]:h.object.material;
   if(!m||m.visible===false||m.colorWrite===false||m.opacity<=.05)return false;
   const planes=m.clippingPlanes||[];return !planes.length||!(m.clipIntersection?planes.every(p=>p.distanceToPoint(h.point)<0):planes.some(p=>p.distanceToPoint(h.point)<0));
  });
  if(!hit){if(pickPosition)toast('请点在人体或已显示的结构上');return false;}
  const direction=camera.position.clone().sub(controls.target).normalize(),radius=THREE.MathUtils.clamp(camera.position.distanceTo(hit.point)*.095,5,85);
  captureCamera();const size=new THREE.Vector3(radius,radius,radius),box=new THREE.Box3(hit.point.clone().sub(size),hit.point.clone().add(size));
  focusBounds(box,{direction:direction.toArray(),up:camera.up.toArray(),safeCenter:true});observingLocation=true;pickPosition=false;sync();invalidate();toast('已放大此处；继续拖动或缩放观察');return true;
 }
 function handleClick(event){if(pickPosition){focusAt(event);return true;}return mode==='pan';}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pickPosition){pickPosition=false;sync();$('navPick').focus();}});
 for(const event of ['atlas:selection','atlas:profile-changed','atlas:sex-changed'])window.addEventListener(event,()=>{observingLocation=false;pickPosition=false;sync();});
 for(const id of ['homeBtn','fitVisibleBtn','wideFrame','wideExit','fullscreenBtn'])$(id).addEventListener('click',()=>{observingLocation=false;setMode('rotate');});
 document.addEventListener('click',e=>{if(e.target.closest('#focusBtn,#wideFocus,#focusCurrent')){observingLocation=false;pickPosition=false;sync();}},true);
 function continuous(button,factor){let timer=null,repeating=false;
  const stop=()=>{clearTimeout(timer);timer=null;};
  button.addEventListener('pointerdown',e=>{if(e.button!==0)return;stop();repeating=false;button.setPointerCapture(e.pointerId);timer=setTimeout(function tick(){repeating=true;zoom(factor);timer=setTimeout(tick,100);},330);});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,stop);
  button.addEventListener('click',e=>{if(repeating){e.stopImmediatePropagation();repeating=false;}},true);
  window.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 }
 continuous($('zoomInBtn'),.9);continuous($('zoomOutBtn'),1/.9);
 continuous($('wideZoomIn'),.9);continuous($('wideZoomOut'),1/.9);
 function measure(){const r=tools.getBoundingClientRect(),v=viewport.getBoundingClientRect();body.style.setProperty('--navigation-height',r.height+'px');body.style.setProperty('--navigation-bottom',Math.max(0,v.bottom-r.bottom)+'px');}
 new ResizeObserver(measure).observe(tools);window.addEventListener('resize',measure);
 window.__ATLAS_NAVIGATION__={handleClick,focusAt,setMode,getState:()=>({mode,pickPosition,observingLocation})};sync();measure();
}
