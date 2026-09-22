from pathlib import Path
p=Path('atlas-v3-tools/implementation')
f=p/'learning-v3.js';s=f.read_text()
old="function focusPoint(pos){ctx.focusBounds(new THREE.Box3(pos.clone().addScalar(-85),pos.clone().addScalar(85)));}"
new="function focusPoint(pos){setRegion('body',false);ctx.focusBounds(new THREE.Box3(pos.clone().addScalar(-85),pos.clone().addScalar(85)));}"
assert old in s;s=s.replace(old,new)
s=s.replace("const occupied=[];let shown=0;const rect=viewport.getBoundingClientRect();for(const item of labelNodes)","const occupied=[];let shown=0;const rect=viewport.getBoundingClientRect();const topReserve=Math.max(document.querySelector('.study-toolbar').getBoundingClientRect().bottom,status.hidden?0:status.getBoundingClientRect().bottom)-rect.top+8;const dockTop=document.querySelector('.control-dock').getBoundingClientRect().top;const chipTop=chip.offsetWidth?chip.getBoundingClientRect().top:Infinity;const bottomReserve=Math.min(dockTop,chipTop)-rect.top-28;for(const item of labelNodes)")
s=s.replace('y>185&&y<h-150','y>topReserve&&y<bottomReserve')
f.write_text(s)
f=p/'build.py';s=f.read_text();s=s.replace("if(dir.lengthSq()<.1)dir.set(0,.1,1).normalize();","if(dir.lengthSq()<.1||Math.abs(dir.y)>.96)dir.set(0,.1,1).normalize();")
f.write_text(s)
with (p/'styles-v3.css').open('a') as f:f.write('''
/* Landscape phone: reserve a real central working area, not just no overflow. */
@media(max-height:500px) and (max-width:1100px){
 .topbar{height:44px}.workspace{height:calc(100dvh - 64px)}.statusbar{height:20px;font-size:8px}.sidebar,.detail-panel{top:44px;bottom:20px}.brand-mark{height:28px;width:28px}.brand small,.header-actions #helpBtn{display:none}.drawer-buttons button{min-height:30px}.stage-heading{top:5px;left:12px;right:auto;max-width:170px}.stage-heading h2{font-size:15px;margin:5px 0}.stage-heading h2 span,.stage-heading .model-status,.axis-gizmo{display:none}.view-switcher{top:4px;left:186px;right:58px;max-width:none}.view-switcher button{min-height:28px;font-size:10px}.study-toolbar{top:41px;left:12px;right:60px;max-width:650px}.study-toolbar button,.study-toolbar select{min-height:31px;padding:4px 7px}.tcm-status{top:77px;left:12px}.tcm-status button{min-height:22px;font-size:9px}.stage-tools{top:105px;right:9px;max-height:calc(100% - 170px);padding:3px;gap:2px}.stage-tools button{min-width:30px;min-height:30px}.stage-tools span{display:none}.control-dock{left:12px;right:56px;bottom:7px;transform:none;width:auto;max-width:none;padding:6px 8px;display:grid;grid-template-columns:220px minmax(180px,1fr);gap:12px;align-items:center}.mode-row{margin:0!important;gap:6px}.mode-switcher button{font-size:10px!important;min-height:29px;padding:5px 7px}.mode-switcher svg,.mode-switcher kbd{display:none}.reset-button{font-size:10px}.explode-row{margin:0!important;border:0!important;padding:0!important;flex-wrap:nowrap;gap:6px}.explode-row input{min-width:50px}.explode-row label{font-size:10px!important;white-space:nowrap}.explode-presets button{min-width:25px;height:27px;font-size:9px}.dock-hint,.explode-note,.side-notice{display:none}.selection-chip{bottom:62px;left:auto;right:58px;max-width:calc(100% - 80px);transform:none;padding:3px 6px;width:max-content}.selection-chip button{font-size:10px;min-height:25px;padding:3px 5px}.more-views-panel{top:107px;right:48px;max-height:calc(100% - 167px)}
}
''')
f=p/'verify.cjs';s=f.read_text()
s=s.replace("ck(profile.name+' no automatic detail obstruction'", "ck(profile.name+' acupoint focus restores anatomical context',(await state(p)).region==='body');ck(profile.name+' no automatic detail obstruction'")
s=s.replace("await capture(p,'v3-'+profile.name);", "if(profile.h<500){const d=await p.locator('.control-dock').boundingBox();ck(profile.name+' landscape dock remains compact',d.height<75,d);}await capture(p,'v3-'+profile.name);")
s=s.replace("const p=await c.newPage();lastPage=p;", "let deliveredHTMLHash='';if(live)await c.route(url,async route=>{const upstream=await route.fetch();const body=await upstream.body();deliveredHTMLHash=crypto.createHash('sha256').update(body).digest('hex');await route.fulfill({response:upstream,body});});const p=await c.newPage();lastPage=p;")
s=s.replace("const hash=crypto.createHash('sha256').update(await res.body()).digest('hex');", "const hash=deliveredHTMLHash;report.navigationIntegrity='Public navigation bytes hashed then forwarded unchanged to the browser';")
f.write_text(s)
print('V3 screenshot-driven fixes applied')
