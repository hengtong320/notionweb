from pathlib import Path
p=Path('fullbody-tcm-v14')
f=p/'female-v12.js';s=f.read_text().replace("get active(){return active;}","setCustom:()=>{preset='custom';isolated=false;update();},get active(){return active;}");s=s.replace("'V13'","'V14'").replace('V13.png','V14.png');f.write_text(s)
f=p/'shared-v14.js';s=f.read_text()
s=s.replace("const ticket=++viewTicket,initialSex=sex(),held=captureCamera();if(!available(l))return;", "const ticket=++viewTicket,initialSex=sex(),held=captureCamera();if(!available(l))return;if(female.active)female.setCustom();else tissues.clearOrganScope();")
s=s.replace("if((target==='female')===female.active)return;", "if((target==='female')===female.active&&!sexSwitching)return;")
s=s.replace("const saved={section,scene,scroll:", "const saved={logical:layers.map(l=>{const a=systemsFor(l).map(k=>snapshots()[k]).filter(Boolean),on=a.filter(v=>v.on);return{id:l.id,on:on.length>0,opacity:on.reduce((n,v)=>n+(v.opacity??1),0)/Math.max(1,on.length)};}),display:$('sharedDisplay').value,section,scene,scroll:")
a="await female.setSex(target);if(ticket!==selectionTicket)return;section=saved.section;"
b="""await female.setSex(target);if(ticket!==selectionTicket)return;const afterSwitch=captureCamera();$('bodySelector').setAttribute('aria-busy','true');
   if(saved.scene==='custom'){if(female.active)female.setCustom();else tissues.clearOrganScope();}
   for(const item of saved.logical){const l=layers.find(x=>x.id===item.id);if(!available(l))continue;const keys=systemsFor(l),already=keys.filter(k=>snapshots()[k]?.on),wanted=item.on?(saved.scene==='custom'||!already.length?keys:already):[];
    for(const k of keys){if(ticket!==selectionTicket)return;const on=wanted.includes(k);if(female.active){await female.enable(k,on);female.setOpacity(k,item.opacity);}else if(k==='bones'){state.bonesOn=on;$('bonesOn').checked=on;$('bonesOn').dispatchEvent(new Event('change',{bubbles:true}));tissues.setBoneOpacity(item.opacity);}else{await tissues.enable(k,on);tissues.setOpacity(k,item.opacity);}}
   }
   if(ticket!==selectionTicket)return;$('sharedDisplay').value=saved.display;if(female.active)female.setDisplayMode(saved.display);restoreCamera(afterSwitch);section=saved.section;"""
assert a in s;s=s.replace(a,b)
s=s.replace("}finally{sexSwitching=false;schedule();}","}finally{if(ticket===selectionTicket){sexSwitching=false;$('bodySelector').setAttribute('aria-busy','false');schedule();}}")
s=s.replace("window.addEventListener('atlas:selection',e=>{if(['bone','tissue','region'].includes", "window.addEventListener('atlas:selection',e=>{if(e.detail?.kind==='meridian'&&!sexSwitching&&!learning.getState().selectedPoint){currentPoint=null;}if(['bone','tissue','region'].includes")
f.write_text(s)
f=p/'index.html';s=f.read_text().replace('aria-label="选中骨骼的解剖信息"','aria-label="结构与经穴详情"');f.write_text(s)
f=Path('atlas14-delivery/verify.cjs');s=f.read_text()
s=s.replace("ck('Female common opacity remains available',", "ck('Gender switch retains vascular opacity',await p.evaluate(()=>Math.abs(window.__ATLAS_FEMALE__.getState().systems.vascular.opacity-.44)<.001));ck('Female common opacity remains available',")
s=s.replace("ck('Phone point detail closes',await p.evaluate(()=>!document.body.classList.contains('detail-open')));", """ck('Phone point detail closes',await p.evaluate(()=>!document.body.classList.contains('detail-open')));
 await p.setViewportSize({width:1440,height:1000});await p.locator('#tcmTab').click();await p.locator('#acupointResults [data-point="PC6"]').first().click();const evidenceURL=await p.locator('#evidenceCurrent').getAttribute('href');ck('Female explanation link keeps body identity',evidenceURL.includes('sex=female'));await p.goto(evidenceURL);await p.waitForFunction(()=>window.__EVIDENCE_PAGE__);ck('Shared separate explanation contains target',await p.locator('#focusHeading').innerText().then(x=>x.includes('内关')));const back=await p.locator('#return3d').getAttribute('href');ck('Explanation return link keeps female target',back.includes('sex=female')&&back.includes('PC6'));await p.goto(back);await p.waitForFunction(()=>window.__ATLAS_FEMALE__?.active&&window.__ATLAS_LEARNING__?.getState().selectedPoint?.code==='PC6');await settle(p);ck('Full return loads shared female point explanation',await p.locator('#tcmPointCard').isVisible());await snap(p,'female-evidence-return');
""")
f.write_text(s)
print('FINAL common layer semantics and evidence-return journey')
