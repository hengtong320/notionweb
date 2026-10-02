from pathlib import Path
p=Path('atlas30-repair/probe.cjs');s=p.read_text()
s=s.replace("p.locator('[data-body-sex=", "p.locator('button[data-body-sex=")
a="__ATLAS_LEARNING__.setMeridian(m);__ATLAS_LEARNING__.selectPoint(code,side,true);"
assert s.count(a)==1
s=s.replace(a,"__ATLAS_SHARED__.showSection('meridians');"+a)
s=s.replace("const fs=require('fs'),", "const {PNG}=require('pngjs');const fs=require('fs'),",1)
# Both baseline and candidate follow the same user actions and assertions.
s=s.replace("z.lines&&!z.points&&dist(z.camera.target,expected)<.01", "z.lines&&!z.points&&z.transfer?.applied&&z.transfer.visible&&Math.abs(dist(a.camera.position,a.camera.target)-dist(z.camera.position,z.camera.target))<.01")
a="if(code==='TE3')await shot(body+'-contact');"
b="""if(code==='TE3'){
 await shot(body+'-contact');const on=PNG.sync.read(await p.screenshot());
 await p.evaluate(()=>__ATLAS_LEARNING__.clearPointSelection());await settle();const off=PNG.sync.read(await p.screenshot());let changed=0,samples=0;
 for(let dy=-6;dy<=6;dy++)for(let dx=-6;dx<=6;dx++){const radius=Math.hypot(dx,dy);if(radius<3||radius>6)continue;const x=Math.round(q.paint.x)+dx,y=Math.round(q.paint.y)+dy;if(x<0||y<0||x>=on.width||y>=on.height)continue;const i=(y*on.width+x)*4;samples++;if(Math.abs(on.data[i]-off.data[i])+Math.abs(on.data[i+1]-off.data[i+1])+Math.abs(on.data[i+2]-off.data[i+2])>30)changed++;}
 ck(body+' selection is really painted at its skin center, not a lifted sprite',q.selectedInInk&&q.selected?.paintedSelection&&!q.selected?.spriteVisible&&changed>4,{changed,samples,selected:q.selected});
}
"""
assert s.count(a)==1;s=s.replace(a,b)
a="ck('No runtime exceptions',report.errors.length===0,report.errors);"
b="""await sex('male');await choose();await focus('TE3');
await p.evaluate(()=>{const F=__ATLAS_FEMALE__,original=F.ensureMeridianSurface;let used=false;window.__restoreSurfaceMethod=()=>F.ensureMeridianSurface=original;F.ensureMeridianSurface=async function(){if(!used){used=true;window.__surfaceHeld=true;await new Promise(r=>window.__releaseSurface=r);}return original();};window.__surfaceSwitchPromise=__ATLAS_SHARED__.switchSex('female');});
await p.waitForFunction(()=>window.__surfaceHeld);
const locked=await p.evaluate(()=>({controls:[...document.querySelectorAll('.view-switcher,.side-picker,.control-dock')].map(e=>({class:e.className,inert:e.inert})),transition:__ATLAS_SHARED__.getState().transition,pigment:__ATLAS_LEARNING__.getSurfaceConsistencyAudit().routeRootVisible}));
ck('Old-body view and side controls cannot mutate a pending skin switch',locked.transition&&!locked.pigment&&locked.controls.length>1&&locked.controls.every(e=>e.inert),locked);
await p.evaluate(async()=>{__restoreSurfaceMethod();__releaseSurface();await __surfaceSwitchPromise;});await settle();
const settled=await p.evaluate(()=>({unlocked:[...document.querySelectorAll('.view-switcher,.side-picker,.control-dock')].every(e=>!e.inert),a:__ATLAS_LEARNING__.getSurfaceConsistencyAudit(),s:__ATLAS_LEARNING__.getState(),skins:(()=>{const r=[];__ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh)return;for(let q=n;q;q=q.parent)if(!q.visible)return;const sys=n.userData.atlas?.system||n.userData.female?.system;if(sys==='surface')r.push({opacity:n.material.opacity,body:n.userData.female?'female':'male'});});return r;})()}));
ck('Settled body contains only matching opaque skin and matching selected pigment',settled.unlocked&&settled.a.body==='female'&&settled.a.referenceBody==='female'&&settled.s.xray===false&&settled.a.selected.paintedSelection&&settled.skins.length>0&&settled.skins.every(s=>s.opacity===1&&s.body==='female'),{unlocked:settled.unlocked,skin:settled.skins,selected:settled.a.selected});
"""
assert s.count(a)==1;s=s.replace(a,b+a);p.write_text(s)
# Reuse the exact previously published V29 regression sources, not pass counts.
prior=Path('/tmp/atlas29-tested/atlas29-repair')
for name in ['surface-regression.cjs','observation-regression.cjs','probe.cjs']:
 source=prior/name
 assert source.exists(),source
 text=source.read_text().replace('fullbody-tcm-v29','fullbody-tcm-v30').replace("version:'29.0.0'","version:'30.0.0'")
 Path('atlas30-repair','prior-'+name).write_text(text)
print('Prepared consistent baseline/candidate test and unmodified prior assertions')