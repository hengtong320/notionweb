from pathlib import Path
import json
p=Path('fullbody-tcm-v16');a=json.loads((p/'hegu-reference-v16.json').read_text());v=a['view']
f=p/'surface-v13.js';s=f.read_text();old="if(['forearm','wrist','upper','elbow'].includes(r))";assert old in s
s=s.replace(old,"if(r==='hand'&&m==='LI')return new THREE.Vector3(right?"+str(v[0])+":"+str(-v[0])+","+str(v[1])+","+str(v[2])+").normalize();"+old);f.write_text(s)
f=p/'evidence-data-v9.json';d=json.loads(f.read_text());d['sources']['hegu-location']={'title':'中日友好医院医生：合谷穴定位说明','url':'https://www.haodf.com/neirong/wenzhang/7980866877.html'};d['points']['LI4'].setdefault('evidenceSources',[]).append('hegu-location');f.write_text(json.dumps(d,ensure_ascii=False,indent=2))
f=Path('atlas16-delivery/verify.cjs');s=f.read_text();old="await snap('hegu-landmarks');";assert old in s
s=s.replace(old,old+"""
 await page.evaluate(async()=>{await __ATLAS_SHARED__.choose('surface',true);__ATLAS_LEARNING__.setMeridians(['LI']);__ATLAS_LEARNING__.selectPoint('LI4','right',true);});await settle();
 const skin=await page.evaluate(()=>__ATLAS_LEARNING__.getDisplayAudit());const h=skin.points.find(r=>r.code==='LI4'&&r.side==='right');
 ck('LI4 attached point and dorsal route use same anchor',h&&h.secondaryShift<.00001&&h.lineGap<.02,h);
 ck('Skin guide geometry finite after hand direction correction',skin.geometryFinite);
 await page.evaluate(()=>document.body.classList.remove('nav-open','detail-open'));await snap('hegu-surface');
 await page.evaluate(()=>__ATLAS_SHARED__.choose('bones',true));await settle();
""");f.write_text(s)
f=p/'README.md';f.write_text(f.read_text()+'\n手部贴面复核：大肠经手部线路与合谷参照统一使用手背方向，避免线路仍投到掌侧而点位已经切到手背。该修订不构成临床定位认证。\n')
print('Dorsal hand point and route consistency review added')
