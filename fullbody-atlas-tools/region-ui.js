function updateRegionUI(){
 scene.background.set('#eff2e9');if(UPPER_REGIONS.has(state.region))scene.background.multiplyScalar(2);
 camera.far=UPPER_REGIONS.has(state.region)?24000:6500;camera.updateProjectionMatrix();
 for(const el of document.querySelectorAll('[data-region]')){const active=el.dataset.region===state.region;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));}
 for(const el of document.querySelectorAll('[data-side]')){const active=el.dataset.side===state.side;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));el.disabled=FIXED_REGIONS.has(state.region);}
 const [cn,en]=REGION_LABELS[state.region],suffix=FIXED_REGIONS.has(state.region)?'':state.side==='both'?'双侧':state.side==='right'?'人体右侧':'人体左侧';
 const subtitle=document.createElement('span');subtitle.textContent=en;$('regionHeading').replaceChildren(document.createTextNode(cn+' '),subtitle);
 const count=BONES.filter(b=>regionContains(b.id)).length;
 $('regionHint').textContent=cn+' · '+count+' 个骨块'+(suffix?' · '+suffix:'')+(state.region==='body'?' · 206 标准骨 + 4 籽骨':'');
 $('sideNotice').textContent='左右均指人体自身；正面看：人体右侧在画面左边。';
 const upper=UPPER_REGIONS.has(state.region),globalSide=FIXED_REGIONS.has(state.region)||state.side==='both'||['body','head','thorax','auditory'].includes(state.region);
 document.querySelector('[data-view="dorsal"]').textContent=upper?'上方':'足背';
 document.querySelector('[data-view="plantar"]').textContent=upper?'下方':'足底';
 document.querySelector('[data-view="front"]').textContent=upper?'前面':'趾端';
 document.querySelector('[data-view="medial"]').textContent=globalSide?'人体左面':'内侧';
 document.querySelector('[data-view="lateral"]').textContent=globalSide?'人体右面':'外侧';
}
