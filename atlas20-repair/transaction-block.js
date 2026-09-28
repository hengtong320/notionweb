 let actionTail=Promise.resolve(),queuedActions=0,layoutRevision=0;const actionSequence=new Map(),bodySnapshots=new Map(),transitionErrors=[];
 const switchNotice=document.createElement('div');switchNotice.id='bodyTransitionNotice';switchNotice.hidden=true;switchNotice.setAttribute('role','status');switchNotice.textContent='正在同步人体、图层与标注…';document.querySelector('.stage').append(switchNotice);
 function captureNative(){return female.active?female.captureState():tissues.captureState();}
 async function restoreNative(v){return female.active?female.restoreState(v):tissues.restoreState(v);}
 function captureWorkspace(){return {sex:sex(),native:captureNative(),learning:learning.getState(),camera:captureCamera(),section,scene,reference:currentReference,point:currentPoint&&{...currentPoint},display:$('sharedDisplay').value,scroll:sidebar.scrollTop,detail:document.body.classList.contains('detail-open'),revision:layoutRevision};}
 async function bindReference(needed=learning.getState().enabled){
  const ss=snapshots();if(needed||ss.surface?.on){if(female.active)await female.ensureMeridianSurface();else await tissues.ensureMeridianReference();}
  else await learning.setReferenceBody(sex(),null,false);
 }
 async function rollbackWorkspace(v){
  await female.setSex(v.sex,{managed:true});await restoreNative(v.native);await bindReference(v.learning.enabled);learning.restoreDisplayState(v.learning);
  section=v.section;scene=v.scene;currentReference=v.reference;currentPoint=v.point;layoutRevision=v.revision;$('sharedDisplay').value=v.display;restoreCamera(v.camera);sidebar.scrollTop=v.scroll;document.body.classList.toggle('detail-open',v.detail);
 }
 function enqueueAction(key,fn){
  const n=(actionSequence.get(key)||0)+1;actionSequence.set(key,n);queuedActions++;$('bodySelector').setAttribute('aria-busy','true');
  const run=actionTail.catch(()=>{}).then(async()=>{
   if(n!==actionSequence.get(key))return false;const previous=captureWorkspace();state.bodyTransition=true;document.body.dataset.bodySwitching='true';switchNotice.hidden=false;learning.suspend(true);learning.cancelPendingFocus?.();
   try{return await fn();}
   catch(e){transitionErrors.push({action:key,message:e.message,at:new Date().toISOString()});try{await rollbackWorkspace(previous);}catch(restoreError){transitionErrors.push({action:'rollback',message:restoreError.message});}throw e;}
   finally{state.bodyTransition=false;document.body.dataset.bodySwitching='false';switchNotice.hidden=true;const displaced=!female.active&&(state.explode>0||[...ctx.bones.values()].some(b=>b.userData.offset.lengthSq()>.1||b.quaternion.angleTo(new ctx.THREE.Quaternion())>.015));learning.suspend(displaced);tissues.updateFrame();learning.updateFrame();redraw();window.dispatchEvent(new Event('atlas:transition-settled'));invalidate();}
  });
  actionTail=run.catch(()=>{});return run.finally(()=>{queuedActions--;if(!queuedActions)$('bodySelector').setAttribute('aria-busy','false');schedule();});
 }
 function choose(key,preserve=true,options={}){return enqueueAction('scene',()=>{layoutRevision++;return chooseNow(key,preserve,options);});}
 function enableLayer(layer,on){return enqueueAction('layer:'+layer.id,()=>enableLayerNow(layer,on));}
 function pickStructure(id){return enqueueAction('structure',()=>pickStructureNow(id));}
 function switchSex(target){return enqueueAction('sex',()=>switchSexNow(target));}
 function applyDisplayMode(mode){
  if(!['solid','context','focus'].includes(mode))return;
  if(female.active)female.setDisplayMode(mode);
  else{for(const [id,s]of Object.entries(tissues.getState().systems))if(s.on)tissues.setOpacity(id,mode==='context'?.28:1);tissues.setBoneOpacity(mode==='context'?.3:1);}
  $('sharedDisplay').value=mode;schedule();
 }
