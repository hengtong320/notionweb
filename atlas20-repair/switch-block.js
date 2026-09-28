 async function chooseNow(key,preserve=true,options={}){
  if(!sceneNames[key]&&key!=='custom')return false;
  if(female.active&&key.startsWith('ear-')||!female.active&&key==='breast'){toast('当前模型没有提供该结构；保留当前画面。');return false;}
  const prior=learning.getState(),held=preserve?captureCamera():null,keepPoint=!!options.keepSection&&!!prior.selectedPoint&&!options.internalSwitch;
  currentReference=false;currentPoint=null;learning.clearStudyContext(true);tissues.clearSelection();if(female.active)female.clearSelection();
  window.__FOOT_ATLAS__.prepareBodyScene(key==='pelvis'?'pelvis':'body');
  document.body.classList.remove('tissue-detail-active','point-detail-active','reference-detail');
  if(female.active){const mapping={bones:'bones',muscles:'muscles',nerves:'nerves',compare:'compare',chest:'chest',heart:'heart',abdomen:'abdomen',vascular:'vessels',surface:'surface',pelvis:'pelvis',breast:'breast'};if(key==='custom')female.setCustom();else await female.setPreset(mapping[key],{managed:true,preserveView:preserve,preservePanel:true});}
  else if(['bones','muscles','nerves','compare'].includes(key))await tissues.setProfile(key);
  else if(key==='pelvis'){await tissues.setAnatomyView('abdomen');tissues.setOrganScope([[-130,650,-200],[340,990,200]],'pelvis');}
  else if(key==='custom')tissues.clearOrganScope();else await tissues.setAnatomyView(key);
  scene=key;
  if(key==='surface'){if(female.active)female.setOpacity('surface',1);else tissues.setOpacity('surface',1);}
  await bindReference(key==='surface'||prior.enabled);
  learning.restoreDisplayState({...prior,enabled:key==='surface'||prior.enabled,selectedPoint:keepPoint?prior.selectedPoint:null,studyContext:keepPoint?prior.studyContext:null,cardOpen:keepPoint&&prior.cardOpen},{selection:keepPoint});
  currentReference=keepPoint;currentPoint=keepPoint?learning.getState().selectedPoint:null;
  $('sharedDisplay').value='solid';
  if(!keepPoint)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:key,name:(female.active?'女性':'男性')+' · '+sceneNames[key],side:'both'}}));
  if(held)restoreCamera(held);if(!options.keepSection)section='layers';redraw();return true;
 }
 async function bindVisibleSurface(){return bindReference();}
 async function switchSexNow(target){
  if(!['male','female'].includes(target)||target===sex())return false;
  const was=captureWorkspace(),from=sex(),savedSide=female.active?female.getState().side:state.side,savedLabels=female.active?female.getLabels():state.labels;
  const logical=layers.map(l=>{const states=systemsFor(l).map(k=>snapshots()[k]).filter(Boolean),on=states.filter(s=>s.on);return {id:l.id,on:on.length>0,opacity:on.length?on.reduce((n,s)=>n+(s.opacity??1),0)/on.length:1};});
  bodySnapshots.set(from,{scene:was.scene,revision:layoutRevision,native:was.native});sexSwitching=true;viewTicket++;selectionTicket++;
  try{
   await female.setSex(target,{managed:true});currentReference=false;currentPoint=null;document.body.classList.remove('reference-detail','point-detail-active','tissue-detail-active');
   let next=was.scene;if(!female.active&&next==='breast'||female.active&&next.startsWith('ear-')){next='surface';toast('当前模型没有对应结构，已切到体表；原结构状态已保留。');}
   const cached=bodySnapshots.get(target),reusable=cached&&cached.scene===next&&cached.revision===layoutRevision;
   if(reusable){await restoreNative(cached.native);scene=next;}
   else if(next==='custom'){
    window.__FOOT_ATLAS__.prepareBodyScene('body');if(female.active)female.setCustom();else{await tissues.setProfile('bones');tissues.clearOrganScope();}
    for(const item of logical){const l=layers.find(l=>l.id===item.id);for(const k of systemsFor(l)){
     if(female.active){await female.enable(k,item.on);female.setOpacity(k,item.opacity);}
     else if(k==='bones')window.__FOOT_ATLAS__.restoreBoneState({bonesOn:item.on,boneOpacity:item.opacity});
     else{await tissues.enable(k,item.on);tissues.setOpacity(k,item.opacity);}
    }}scene='custom';
   }else{
    await chooseNow(next,true,{keepSection:true,internalSwitch:true});
    // Preserve user opacity without enabling every organ subgroup in a preset.
    for(const item of logical){const l=layers.find(l=>l.id===item.id);for(const k of systemsFor(l)){const s=snapshots()[k];if(s?.on&&item.on){if(female.active)female.setOpacity(k,item.opacity);else if(k==='bones')tissues.setBoneOpacity(item.opacity);else tissues.setOpacity(k,item.opacity);}}}
   }
   if(female.active){female.setSide(savedSide);female.setLabels(savedLabels);female.setDisplayMode(was.display,{preserveOpacity:true});}
   else window.__FOOT_ATLAS__.restoreBoneState({side:savedSide,labels:savedLabels});
   await bindReference(was.learning.enabled||next==='surface');
   learning.restoreDisplayState({...was.learning,enabled:next==='surface'?true:was.learning.enabled});
   currentReference=was.reference||!!was.learning.selectedPoint;currentPoint=learning.getState().selectedPoint;
   if(!currentReference){const native=captureNative(),id=native.selected,row=id&&activeCatalog().find(r=>r.id===id);window.dispatchEvent(new CustomEvent('atlas:selection',{detail:row?{kind:row.kind||'tissue',id:row.id,name:row.name,side:row.side}:{kind:'region',id:scene,name:(female.active?'女性':'男性')+' · '+(sceneNames[scene]||'当前结构'),side:savedSide}}));}
   const bad=Object.entries(snapshots()).filter(([id,s])=>s.on&&!s.loaded);if(bad.length)throw Error('图层未就绪：'+bad.map(([id])=>id).join('、'));
   restoreCamera(was.camera);section=was.section;$('sharedDisplay').value=was.display;redraw();sidebar.scrollTop=was.scroll;document.body.classList.toggle('detail-open',was.detail);
   $('labelsBtn').classList.toggle('active',savedLabels);$('labelsBtn').setAttribute('aria-pressed',String(savedLabels));return true;
  }finally{sexSwitching=false;}
 }
