from pathlib import Path
import os
p=Path('fullbody-tcm-v16');tools=Path(os.environ.get('ATLAS16_TOOLS','/tmp/atlas16-reviewed/atlas16-delivery'))
def change(name,a,b):
 f=p/name;s=f.read_text();assert a in s,(name,a[:90]);f.write_text(s.replace(a,b))
# A female scene selection must update the common study object, unless a point is being compared.
change('shared-v14.js',"if(ticket!==viewTicket||initialSex!==sex())return false;if(held)restoreCamera(held);", "if(ticket!==viewTicket||initialSex!==sex())return false;if(female.active&&!currentReference)window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:key,name:sceneNames[key]||key,side:'both'}}));if(held)restoreCamera(held);")
# In wide view use the same focus button and therefore the correct male/female adapter.
change('view-v16.js',"window.__ATLAS_STUDY__?.focusCurrent?.();invalidate();", "if(!$('focusCurrent').disabled)$('focusCurrent').click();invalidate();")
change('tissues-v4.js',"$('tissueFocus').onclick=()=>focusBounds(new THREE.Box3().setFromObject(n).expandByScalar(12));", "$('tissueFocus').onclick=()=>choose(id,true);")
# Fit chest/abdomen around the requested organs plus surrounding space, not entire skin bounds.
change('female-v12.js',"function fit(dir){const ns=selected&&isolated?[maps.get(selected)]:visible();const box=new THREE.Box3();ns.forEach(n=>n&&box.expandByObject(n));", "function fit(dir){let ns=selected&&isolated?[maps.get(selected)]:visible();const contextual=!isolated&&['chest','abdomen','pelvis'].includes(preset);if(contextual){const selected=ns.filter(n=>!['surface','skeletal'].includes(n.userData.female.system)&&(preset!=='chest'||n.userData.female.system==='respiratory'));if(selected.length)ns=selected;}const box=new THREE.Box3();ns.forEach(n=>n&&box.expandByObject(n));if(contextual)box.expandByScalar(115);")
# Context mode previously multiplied two very low alpha factors, making skin practically invisible.
change('female-v12.js',"opacity*=s.opacity??1;", "if(['chest','abdomen','pelvis','vessels'].includes(preset)&&['surface','skeletal'].includes(r.system)&&mode==='context')opacity=1;opacity*=s.opacity??1;")
change('female-v12.js',"systems.get('surface').opacity=.10;", "systems.get('surface').opacity=.18;")
change('female-v12.js',"systems.get('skeletal').opacity=.35;", "systems.get('skeletal').opacity=.40;")
# Keep the layout style, change only application/cache version identifiers.
for n in ['view-v16.js','shared-v14.js','index.html','evidence.html']:
 f=p/n;f.write_text(f.read_text().replace('16.0.0','16.0.1'))
f=p/'README.md';f.write_text(f.read_text()+'\n16.0.1 实际画面复核：女性胸腹场景与当前学习对象同步；器官仍在原位，取景以器官和周围人体范围为主，不再因整个人体外壳而把器官缩得过小。修正透明参照的双重衰减。大屏看当前沿用共用聚焦控件。\n')
f=tools/'build.cjs';s=f.read_text().replace("version:'16.0.0'","version:'16.0.1'").replace("'hegu-reference-v16.json','evidence.bundle.js'","'hegu-reference-v16.json','surface-v13.js','evidence-data-v9.json','evidence.bundle.js'");f.write_text(s)
f=tools/'verify.cjs';s=f.read_text().replace("'16.0.0'","'16.0.1'")
a="await snap('female-in-body');"
assert a in s
s=s.replace(a,"""ck('Female chest current-object title matches its actual scene',await page.locator('#currentStudyName').innerText().then(s=>s.includes('胸腔')));ck('Female chest reference is visible rather than multiplied away',fem.systems.surface.opacity>=.17);await snap('female-in-body');
 await page.locator('#fullscreenBtn').click();await settle();const heldFemale=await camera();await page.locator('#wideFocus').click();await settle();ck('Expanded focus remains in the female model and scene',await page.evaluate(()=>__ATLAS_FEMALE__.active&&__ATLAS_FEMALE__.getState().preset==='chest'&&__FOOT_ATLAS__.getState().visible===0));await page.locator('#wideExit').click();await settle();
""")
f.write_text(s)
print('V16.0.1 reviewed scene title, framing, material and shared-focus corrections')
