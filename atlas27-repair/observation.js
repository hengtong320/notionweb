/** One camera state for all meridian view controls. No geometry changes. */
export function initObservationV27({THREE,camera,controls,state,learning,captureCamera,syncCameraUp,invalidate}){
 const directions={front:[0,0,1],back:[0,0,-1],medial:[1,0,0],lateral:[-1,0,0],dorsal:[0,1,0],plantar:[0,-1,0],overview:[-.48,.18,1.9]};
 const words={front:'正面',back:'背面',medial:'人体左侧',lateral:'人体右侧',dorsal:'上方',plantar:'下方',overview:'自由视角'};
 const quick={'正面':'front','背面':'back','左侧':'medial','右侧':'lateral'};
 let queued=false,lastKey='',previousActive=false,updates=0;
 const active=()=>learning.getObservationState().active;
 function refresh(){queued=false;const enabled=active();if(!enabled){previousActive=false;lastKey='';return;}
  const d=camera.position.clone().sub(controls.target).normalize();
  const selected=Object.keys(directions).filter(k=>k!=='overview').find(k=>d.dot(new THREE.Vector3(...directions[k]))>.990268)||'overview';
  const key=selected+'|'+(document.body.dataset.bodySex||'male');if(key===lastKey&&previousActive)return;
  lastKey=key;previousActive=true;updates++;state.view=selected;
  document.body.dataset.meridianOrientation=selected;
  for(const el of document.querySelectorAll('[data-view]')){const on=el.dataset.view===selected;el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on));}
  for(const el of document.querySelectorAll('[data-meridian-view]')){const on=quick[el.dataset.meridianView]===selected;el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on));el.title='只改变观察方向，保留当前放大程度';}
  const badge=document.getElementById('viewBadge')?.lastElementChild;if(badge)badge.textContent=words[selected]+' · 经络观察';
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(refresh);}}
 function orient(name){if(!active()||!directions[name])return false;
  captureCamera();const distance=camera.position.distanceTo(controls.target),damping=controls.enableDamping;
  controls.enableDamping=false;const dir=new THREE.Vector3(...directions[name]).normalize();
  camera.up.set(...(['dorsal','plantar'].includes(name)?[0,0,1]:[0,1,0]));
  camera.position.copy(controls.target).addScaledVector(dir,distance);syncCameraUp();controls.update();controls.enableDamping=damping;
  camera.updateMatrixWorld(true);lastKey='';refresh();learning.flushLabels();invalidate();return true;
 }
 document.querySelector('.view-switcher')?.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b&&active()){e.preventDefault();e.stopImmediatePropagation();orient(b.dataset.view);}},true);
 for(const b of document.querySelectorAll('[data-meridian-view]'))b.onclick=()=>orient(quick[b.dataset.meridianView]);
 controls.addEventListener('change',schedule);
 for(const ev of ['atlas:selection','atlas:sex-changed','atlas:tcm-visibility','atlas:transition-settled','atlas:region-changed'])window.addEventListener(ev,()=>{lastKey='';schedule();});
 document.addEventListener('pointerup',schedule,{passive:true});
 window.__ATLAS_OBSERVATION_V27__={refresh,orient,getState:()=>({active:active(),orientation:document.body.dataset.meridianOrientation||null,updates})};
 schedule();
}
