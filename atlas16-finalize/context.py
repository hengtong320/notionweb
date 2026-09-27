from pathlib import Path
import os
p=Path('fullbody-tcm-v16')
f=p/'shared-v14.js';s=f.read_text();anchor=' // Keep the actual DOM, current tab, search terms, filters and disclosures across both adapters.'
assert anchor in s
s=s.replace(anchor,""" function announceFemaleScene(key){if(female.active&&!currentReference&&!female.getState().selected){window.dispatchEvent(new CustomEvent('atlas:selection',{detail:{kind:'region',id:'body',name:sceneNames[key]||'女性结构',side:female.getState().side||'both'}}));}}
"""+anchor)
a="if(currentReference&&currentPoint)learning.selectPoint(currentPoint.code,currentPoint.side,false);redraw();return true;"
assert a in s;s=s.replace(a,"if(currentReference&&currentPoint)learning.selectPoint(currentPoint.code,currentPoint.side,false);announceFemaleScene(key);redraw();return true;")
a="if(female.active)female.setSide(saved.side);redraw();sidebar.scrollTop=saved.scroll;"
assert a in s;s=s.replace(a,"if(female.active)female.setSide(saved.side);announceFemaleScene(saved.scene);redraw();sidebar.scrollTop=saved.scroll;")
s=s.replace("version:'16.0.0'","version:'16.0.1'");f.write_text(s)
f=p/'female-v12.js';s=f.read_text().replace("systems.get('surface').opacity=.10;","systems.get('surface').opacity=.18;")
a="function fit(dir){const ns=selected&&isolated?[maps.get(selected)]:visible();const box=new THREE.Box3();"
b="""function fit(dir){let ns=selected&&isolated?[maps.get(selected)]:visible();const contextSystems={chest:['respiratory'],abdomen:['digestive','urinary'],pelvis:['reproductive','urinary']}[preset];if(contextSystems&&!isolated){const targets=ns.filter(n=>contextSystems.includes(n?.userData.female?.system));if(targets.length)ns=targets;}const box=new THREE.Box3();"""
assert a in s;s=s.replace(a,b)
a="box.expandByScalar(preset==='pelvis'?25:15)"
assert a in s;s=s.replace(a,"box.expandByScalar(contextSystems&&!isolated?135:preset==='pelvis'?25:15)")
f.write_text(s)
f=p/'view-v16.js';s=f.read_text().replace("version:'16.0.0'","version:'16.0.1'");f.write_text(s)
for n in ['index.html','evidence.html']:
 f=p/n;f.write_text(f.read_text().replace('16.0.0','16.0.1'))
f=p/'README.md';f.write_text(f.read_text()+'''\n\n16.0.1 实际画面复核：女性切换器官场景时同步当前学习对象，避免胸腔画面仍显示腹部标题。胸腹盆腔默认围绕对应器官并保留本体表/部分骨架参照；“完整显示”仍适配全部可见结构。没有修改源模型顶点。\n''')
tools=Path(os.environ.get('ATLAS16_TOOLS','/tmp/atlas16-reviewed/atlas16-delivery'))
f=tools/'build.cjs';f.write_text(f.read_text().replace("version:'16.0.0'","version:'16.0.1'"))
f=tools/'verify.cjs';s=f.read_text().replace("'16.0.0'","'16.0.1'")
a="const fem=await page.evaluate(()=>__ATLAS_FEMALE__.getState());"
assert a in s;s=s.replace(a,"""ck('Female scene title matches the current chest instead of previous abdomen',await page.locator('#currentStudyName').innerText().then(x=>x==='胸腔器官'));const fem=await page.evaluate(()=>__ATLAS_FEMALE__.getState());ck('Female body outline retains a usable context opacity',fem.systems.surface.opacity>=.17&&fem.systems.surface.opacity<.3);""")
f.write_text(s)
print('REVIEWED_CONTEXT_PATCH_16_0_1')
