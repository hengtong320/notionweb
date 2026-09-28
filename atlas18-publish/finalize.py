"""Apply the final, user-reviewed V18 fixes before browser verification.
Only derived display code changes. Original anatomical assets stay untouched.
Expected hashes identify files from anatomy-v18-source-review.zip.
"""
from pathlib import Path
import hashlib
import json

root = Path('fullbody-tcm-v18')
def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()
def replace_once(text, old, new):
    assert text.count(old) == 1, old[:100]
    return text.replace(old, new, 1)

before = {
    'body-frame-v18.js':'7999f39910cee43c541e02ab6d61d710294726eded05e356b0eaf86078fd3267',
    'body-frame-v18.json':'b616a9e8db12d7e19b217173b80fd454cbc3493ade97d6c3faf90c8db4253155',
    'skin-v17.js':'b4ce659f1389cfccb495043253a79b8eb8c307fb59401d1dca56ea9a3cf18092'
}
after = {
    'body-frame-v18.js':'0a3a93bd7b058efb82a1da8bde7c59edc3282add21438c9fef980770ee77f2f3',
    'body-frame-v18.json':'acb5fe7c123321f81844e87930911cc69a6ecc8cc313b7401d8e9fe8e19ba7f9',
    'skin-v17.js':'08e548bfd1205ff90352200f1ea3315c71ef3b27cd08ba6598ff7449fd830f39',
    'female-hand-route-v18.json':'1edd6a2217cfd03b497e7289239c84e388f2ecb3fa3bb397adf00c5ec3b2c5ee'
}
for name, sha in before.items():
    assert digest(root/name) == sha, 'Unexpected input: '+name

f = root/'body-frame-v18.js'
s = replace_once(f.read_text(),
    'const boundary=140+35*(1-smooth(1050,1240,y));',
    'const boundary=175+70*(1-smooth(880,1050,y))-35*smooth(1050,1240,y);')
f.write_text(s)

# Exact section measurements from the final reviewed source archive.
rows = [
[690.0,690.0,94.15873718260005,-87.86105433594227,99.55318155698481,-47.01969868519668,0.8620175721966291,0.8368907251912074],
[710.0,710.0,94.15873718260005,-91.27801907582038,99.55318155698481,-48.89261476955464,0.8619125665126985,0.8485783603046305],
[730.0,730.0,94.15873718260005,-94.77439683596272,99.55318155698481,-51.34780956520831,0.8611316815637771,0.8649599607197211],
[750.0,750.0,94.15873718260005,-97.13117007129249,99.55318155698481,-53.73344916674773,0.8601096864542339,0.8813036935660156],
[770.0,770.0,94.15873718260005,-97.38541309661284,99.55318155698481,-55.20013374053063,0.8603221781970154,0.8926306774244384],
[790.0,790.0,94.15873718260005,-95.20605827745622,99.55318155698481,-55.097135361397605,0.8636905743380232,0.8976291466122484],
[810.0,810.0,94.15873718260005,-90.84356652736774,99.55318155698481,-53.20517941957327,0.8710501760054057,0.8983082511505263],
[830.0,830.0,94.15873718260005,-84.85741161688311,99.55318155698481,-49.67761499659531,0.8812052102508381,0.8966120602563588],
[850.0,850.0,94.15873718260005,-77.89728549825291,99.55318155698481,-44.773745565617745,0.8918007081088679,0.8924417262426698],
[870.0,870.0,94.15873718260005,-70.63107531952124,99.55318155698481,-38.705704084301054,0.9011764689142016,0.8843059251624839],
[890.0,890.0,94.15873716360964,-63.24531896469702,99.55318160305839,-30.063342787257735,0.8839977569087829,0.8651530621843608],
[910.0,910.0,94.15873711832484,-56.73877979418326,99.55318171292616,-21.810995045811392,0.8469220052414658,0.8411789794075828],
[930.0,930.0,94.15873706427521,-52.102539095105655,99.55318184405866,-16.007670282127854,0.8363944935732748,0.819124169341108],
[950.0,950.0,94.1587370189904,-49.347064756862885,99.55318195392643,-12.443715121483184,0.8687777267141858,0.7999035304826704]
]
f = root/'body-frame-v18.json'
d = json.loads(f.read_text())
changes = {r[0]:r for r in rows}
d['frames']['body'] = [changes.get(r[0], r) for r in d['frames']['body']]
d['pelvisBlendFix'] = 'pelvic side surfaces and upper thighs, excluding genital midline when estimating sagittal bounds; smooth blend to trunk'
f.write_text(json.dumps(d, ensure_ascii=False, separators=(',',':')))

f = root/'skin-v17.js'
s = "import HAND_ROUTE from './female-hand-route-v18.json';\n"+f.read_text()
s = replace_once(s, 'hits.sort((a,b)=>a.distance-b.distance);let hit=hits[0];', "const local=['hand','foot'].includes(c.region);hits.sort((a,b)=>local?a.point.distanceToSquared(world)-b.point.distanceToSquared(world):a.distance-b.distance);let hit=hits[0];")
insert = '''  // A triangle-adjacency path keeps the female fourth-finger transition on
  // the actual hand, instead of crossing an inter-finger air gap. Model
  // geometry continuity is not clinical verification of the meridian.
  if(sex==='female'&&standardized&&context.meridian==='TE'&&context.side==='right'){
   const a=anchors.find(a=>a.code==='TE1'),b=anchors.find(a=>a.code==='TE2'),path=HAND_ROUTE.paths['TE1:TE2:right'];
   if(a&&b&&path){const i=raw.findIndex(r=>r.anchor&&r.source.distanceToSquared(a.source)<1e-8),j=raw.findIndex(r=>r.anchor&&r.source.distanceToSquared(b.source)<1e-8);
    if(i>=0&&j>i){const normals=geometry.attributes.normal,mid=path.map((p,k)=>{const v=new THREE.Vector3(...p),h=bvh.closestPointToPoint(v),aim=toV(normals,geometry.index.getX(h.faceIndex*3)),normal=faceNormal(h,aim);return {source:a.source.clone().lerp(b.source,(k+1)/(path.length+1)),point:h.point.clone().addScaledVector(normal,2.4),normal,anchor:false};});raw.splice(i,j-i+1,raw[i],...mid,raw[j]);}
   }
  }
'''
s = replace_once(s, '  const nearest=(v,aim)=>', insert+'  const nearest=(v,aim)=>')
f.write_text(s)
hand = json.loads(Path('atlas18-publish/female-hand-route-v18.json').read_text())
(root/'female-hand-route-v18.json').write_text(json.dumps(hand,ensure_ascii=False,separators=(',',':')))
for name, sha in after.items():
    assert digest(root/name) == sha, 'Final source mismatch: '+name

# Replace status text only after the exact reviewed rendering code is restored.
f = root/'README.md'
s = f.read_text()
s = s.replace('原始 GLB 文件不改写。','髋部外形与大腿连续过渡，手臂适配范围不再误影响大腿。原始 GLB 文件不改写。')
s += '\n## 最终发布修订\n\n本构建包括最后的髋部过渡、手部局部投影及女性右手指末端贴面连接修正。发布流水线重新执行 Chromium 与 WebKit 浏览器检查，通过后才提交此目录。旧版 V17 保留，不改写原始模型文件。点位临床审核状态保持不变。\n'
f.write_text(s)
(root/'final-source-match.json').write_text(json.dumps({
    'sourceArchiveSHA256':'53f76bc3c254840f1df190ae43fe3d715f03b23959ab6ad3c6ce0fe4b15bf27b',
    'matchedFinalFiles':after,
    'clinicalCalibration':False
},indent=2))
print('All four final rendering files exactly match the reviewed archive.')
