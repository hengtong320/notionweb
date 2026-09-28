from pathlib import Path
p=Path('fullbody-tcm-v21')
f=p/'female-complete-v21.js';s=f.read_text()
needle='const common=await r.json();';assert needle in s
s=s.replace(needle,"const common=await r.json();const er=await fetch('../fullbody-tcm-v11/assets/new-catalog.json');if(!er.ok)throw Error('全身血管与耳部目录加载失败');const extra=(await er.json()).filter(r=>['vessels','ear'].includes(r.system));const maleOnly=/penis|penile|prostat|testic|spermatic|scrot|cremaster|睾丸|阴茎|前列腺|精索|提睾/i;const excluded=extra.filter(r=>maleOnly.test([r.name,r.en,r.sourceNode].join(' ')));const included=extra.filter(r=>!excluded.includes(r));")
s=s.replace('const tissueRows=common.map(r=>','const tissueRows=[...common,...included].map(r=>')
s=s.replace("system:r.id.split('-')[0],ancestry:['shared-teaching',r.id.split('-')[0]]","system:r.system||r.id.split('-')[0],ancestry:['shared-teaching',r.system||r.id.split('-')[0]]")
s=s.replace("nativeFemalePelvis:true,clinicalRegistration:false","nativeFemalePelvis:true,clinicalRegistration:false,excludedMaleOnlyVessels:excluded.map(r=>({id:r.id,name:r.name,en:r.en}))")
s=s.replace("else url='../fullbody-tcm-v9/assets/'+system+'.glb';","else url=(['vessels','ear'].includes(system)?'../fullbody-tcm-v11/assets/':'../fullbody-tcm-v9/assets/')+system+'.glb';")
s=s.replace("handles:id=>nativeSystems.has(id)||id.startsWith('native-')","handles:id=>nativeSystems.has(id)||['vessels','ear'].includes(id)||id.startsWith('native-')")
s=s.replace("['skeletal','muscular','nervous'].map(s=>","['skeletal','muscular','nervous','vessels','ear'].map(s=>")
f.write_text(s)
f=p/'female-v12.js';s=f.read_text()
s=s.replace("const colors=","groupNames.vessels='全身血管参考';groupNames.ear='耳部参考';\n const colors=",1)
s=s.replace("function color(r){","function color(r){if(r.system==='ear')return '#bc9d86';if(r.system==='vessels')return /vein|vena/i.test(r.sourceName)?'#3b6190':'#98434a';",1)
needle='function contextMatch(r){';assert needle in s
core="const nativeVascularCore=r=>/uterine_(artery|vein)$/.test(r.sourceName)||/^VH_F_(interventricular_septum|(left|right)_(cardiac_atrium|ventricle)|papillary_muscle_of_heart_.+|aortic_valve|pulmonary_valve|mitral_valve|tricuspid_valve)$/.test(r.sourceName);\n "
s=s.replace(needle,core+needle+"if(systems.get('vessels')?.on&&r.system==='vascular'&&!nativeVascularCore(r))return false;",1)
s=s.replace("vessels:['vascular','skeletal']","vessels:['vessels','vascular','skeletal']")
# Selecting a replaced native local vessel isolates it instead of duplicating
# its counterpart from the whole-body teaching circulation.
s=s.replace('isolated=keepIsolated||!!row.nativeDetail;','isolated=keepIsolated||!!row.nativeDetail||(row.system===\'vascular\'&&systems.get(\'vessels\')?.on&&!nativeVascularCore(row));')
f.write_text(s)
f=p/'shared-v14.js';s=f.read_text().replace("female:['vascular']","female:['vascular','vessels']").replace("{id:'ear',name:'耳部',male:['ear'],female:[]}","{id:'ear',name:'耳部',male:['ear'],female:['ear']}").replace("['bones','muscular','nervous'].map(id=>","['bones','muscular','nervous','vessels','ear'].map(id=>");f.write_text(s)
f=p/'layers-ui-v21.js';s=f.read_text();needle='</tbody></table><h3>两类来源';assert needle in s
s=s.replace(needle,"<tr><td>全身血管参考</td><td>'+(mc.vessels||'读取中')+'</td><td>'+(b?.vessels||'按需加载')+'</td></tr><tr><td>耳部参考</td><td>'+(mc.ear||'读取中')+'</td><td>'+(b?.ear||'按需加载')+'</td></tr>"+needle)
s=s.replace('不是新增女性扫描数据。</p>','不是新增女性扫描数据。</p><p>女性全身血管补充排除了10个男性独有的睾丸、阴茎血管部件，保留女性原生心脏和子宫血管。原生局部血管可从目录单独查看，不与全身参考重复叠画。因此血管部件数不强行凑成男女相同。</p>');f.write_text(s)
f=Path('atlas21-repair/verify.cjs');s=f.read_text()
needle=" for(const view of ['chest','heart','abdomen','pelvis','organs'])";assert needle in s
extra=""" await sex('female');await choose('vascular');r=await read();ck('Female whole-body vessels load 649 actual parts with male-only vessels excluded',r.f.systems.vessels.count===649&&r.f.systems.vessels.visible===649,r.f.systems.vessels);ck('Native female heart and uterine vessels remain beside the non-duplicated reference circulation',r.actual.filter(n=>n.system==='vascular'&&n.origin==='female-native').length===18);ck('Male-only vessel exclusions are explicit in the coverage record',r.audit.excludedMaleOnlyVessels.length===10,r.audit.excludedMaleOnlyVessels);await snap('female-full-vascular');await sex('male');r=await read();ck('Male vascular source retains all 659 original vessel parts',r.t.systems.vessels.count===659);await sex('female');r=await read();ck('Whole-body female vessels remain complete after gender roundtrip',r.f.systems.vessels.visible===649);await choose('bones');await p.locator('#sharedLayer-ear').check();await settle();r=await read();ck('Female ear teaching layer includes all 48 actual ear parts',r.f.systems.ear.count===48&&r.f.systems.ear.visible===48,r.f.systems.ear);ck('Supplemented systems never turn the original male scene on',r.actual.every(n=>n.sex==='female'));
"""
s=s.replace(needle,extra+needle,1);f.write_text(s)
f=p/'README.md';s=f.read_text()+'''\n## 外周血管与耳部覆盖\n\n全身血管补充包含649个共享教学部件，明确排除10个男性独有的睾丸、阴茎血管；女性原生14个心脏结构和4个子宫血管保留。全身血管模式不叠画重复的原生局部血管，原生局部血管仍可从目录单独查看。耳部48个教学部件也可从自定义区直接叠加。男性原始659个血管部件保持不变。排除项逐条记录在模型覆盖数据中，不用错误的男性结构凑齐女性数量。\n\n这些是全身教学参考，不表示女性源扫描本身变完整，也不表示缺失的所有微细解剖结构均已临床配准。\n''';f.write_text(s)
print('Whole-body vessel and ear teaching coverage; native female heart and sex-specific exclusions preserved')
