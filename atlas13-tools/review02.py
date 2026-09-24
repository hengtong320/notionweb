from pathlib import Path
p=Path('fullbody-tcm-v13')
f=p/'surface-v11.js';s=f.read_text()
a="if(group){const k=side+'-'+group;if(!sets.has(k))sets.set(k,[]);sets.get(k).push(q.clone());}"
b="if(group){for(const k of [side+'-'+group,side+'-arm']){if(!sets.has(k))sets.set(k,[]);sets.get(k).push(q.clone());}}"
assert a in s;s=s.replace(a,b)
a="const arm=['LU','HT','PC'].includes(context.meridian)&&v.y<1290&&v.y>630&&Math.abs(v.x-99.553)>95;"
b="const arm=['LU','HT','PC'].includes(context.meridian)&&context.region!=='chest'&&v.y<1290&&v.y>630&&Math.abs(v.x-99.553)>145;"
assert a in s;s=s.replace(a,b)
a="const domain=arm?(domains.get(side+(v.y<1065?'-distal-arm':'-upper-arm'))||all):all;"
b="const domain=arm?(domains.get(side+'-arm')||all):all;"
assert a in s;s=s.replace(a,b)
s=s.replace("['CV','ST','KI'].includes(context.meridian)","['CV','ST','KI','PC','LU'].includes(context.meridian)")
f.write_text(s)
f=Path('atlas13-tools/verify.cjs');s=f.read_text().replace("['HT','PC','GV','CV','KI','BL']","['HT','PC','GV','CV','KI','BL','LU','LI','ST','SP','SI','TE','GB','LR']",1)
a=" const pc=projected.find(p=>p.code==='PC6'"
b=""" const chestAnchor=projected.find(p=>p.code==='PC1'&&p.side==='right'),elbowAnchor=projected.find(p=>p.code==='PC3'&&p.side==='right');
 ck('PC chest anchor is not reassigned to upper arm',Math.abs(chestAnchor.position[0]-chestAnchor.sourcePosition[0])<5&&Math.abs(chestAnchor.position[1]-chestAnchor.sourcePosition[1])<5,chestAnchor.position);
 ck('Elbow projection remains in elbow region',Math.abs(elbowAnchor.position[1]-elbowAnchor.sourcePosition[1])<8,elbowAnchor.position);
 const pc=projected.find(p=>p.code==='PC6'"""
assert a in s;s=s.replace(a,b,1);f.write_text(s)
print('REVIEW02_REGIONAL_CONTINUITY_OK')
f=p/'refinement-v12.css';s=f.read_text()
a='.female-view .sidebar>*:not(#femaleLibrary){display:none!important}'
b='.female-view .sidebar>*:not(#femaleLibrary):not(.library-tabs):not(#sessionModes):not(#femaleTCMNotice){display:none!important}'
assert a in s;s=s.replace(a,b,1);f.write_text(s)
f=p/'session-v13.js';s=f.read_text()
a="async function choose(id){const token=++task,view=captureCamera();mode=id;"
b="async function choose(id){const token=++task,keepView=['bones','muscles','nerves','compare','surface'].includes(id),view=keepView?captureCamera():null;mode=id;"
assert a in s;s=s.replace(a,b,1)
s=s.replace("female.setPreset(mapped,{preserveView:true,preservePanels:true})","female.setPreset(mapped,{preserveView:keepView,preservePanels:true})")
s=s.replace("if(token===task){restoreCamera(view);box.removeAttribute", "if(token===task){if(view)restoreCamera(view);box.removeAttribute")
f.write_text(s)
f=Path('atlas13-tools/verify.cjs');s=f.read_text()
a=" await page.evaluate(()=>window.__ATLAS_SESSION__.choose('chest'));await page.evaluate(()=>window.__FOOT_ATLAS__.setView('overview'));await settle();"
b=""" const handBeforeChest=await camera();
 await page.evaluate(()=>window.__ATLAS_SESSION__.choose('chest'));await page.evaluate(()=>window.__FOOT_ATLAS__.setView('overview'));await settle();
 ck('Explicit chest scene navigates rather than remaining at previous wrist',delta(handBeforeChest,await camera())>100);
 const maleBeforeSex=await page.evaluate(()=>window.__FOOT_ATLAS__.getState());
 ck('Chest camera frames the requested torso region',maleBeforeSex.target[1]>1000&&maleBeforeSex.target[1]<1420,maleBeforeSex.target);"""
assert a in s;s=s.replace(a,b,1)
f.write_text(s)
print('REVIEW02_COMMON_SHELL_AND_EXPLICIT_NAV_OK')
