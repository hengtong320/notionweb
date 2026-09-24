"""Recover hash-checked complete build files from the existing staged transport.
No unverified staged code is executed. The recovered files remain readable in releases.
"""
from pathlib import Path
import base64,zlib,json,hashlib
T=Path('atlas-v10-upgrade');F=T/'files';F.mkdir(exist_ok=True)
s=''.join((T/'chunks'/f'{i:02}.txt').read_text().strip() for i in range(10))
raw=zlib.decompressobj(31).decompress(base64.b64decode(s)).decode('utf-8')
dec=json.JSONDecoder();i=1
expected={'build.py':'0d92cdabc4b1fce012ea2bc53fe96c3a5dbac70fcb53cb13e0f84d6f213ef878','verify.cjs':'540dacb7401ea682b49334ce40107541696a0b3baa7123ff7dbbf016b17d1ba0','compile.cjs':'39feadcaf88c4b4b521cd447c01050e7b58a1ac3f1526a0848056218ee0b2765'}
for _ in range(3):
 name,n=dec.raw_decode(raw,i);i=n+1;content,n=dec.raw_decode(raw,i);i=n+1
 assert name in expected and hashlib.sha256(content.encode()).hexdigest()==expected[name],name
 (T/name).write_text(content)
s=Path('fullbody-tcm-v9/evidence-ui-v9.js').read_text()
s=s.replace("import DATA from './evidence-data-v9.json';\nexport const evidenceData=DATA;","import {evidenceData as DATA} from './catalog-v10.js';\nexport const evidenceData=DATA;")
s=s.replace('严谨查阅：隐藏未校准的点线','资料查阅：不显示未校准位置').replace('返回严谨查阅','返回资料查阅').replace('严谨查阅 · 未校准点线已隐藏；目录仍可查阅','资料查阅 · 未校准点线未显示，目录可查阅')
s=s.replace("const set=v=>{api.setPrecisionMode(v?'strict':'illustrative');", "const sync=v=>{")
s=s.replace("document.getElementById('v9Strict').onchange=e=>set(e.target.checked);", "const set=v=>{api.setPrecisionMode(v?'strict':'illustrative');sync(v);};window.addEventListener('atlas:precision-changed',()=>sync(api.getState().precisionMode==='strict'));document.getElementById('v9Strict').onchange=e=>set(e.target.checked);")
s=s.replace('<a href="coordinate-audit.csv" download>查看逐穴校准清单</a>','<a href="calibration.html">定位校准工作台 ↗</a>')
s=s.replace('return `<section class="v9-evidence"><span class="v9-quality">三维坐标：', 'return `<section class="v9-evidence"><p class="v10-point-summary"><b>${esc(r.name)} · ${esc(r.region)}</b><br>${esc(r.location)}</p><span class="v9-quality">三维坐标：',1)
s=s.replace('本模型原有骨性导航参照（不是取穴坐标）','附近骨性参照（不是已核实的医学关联）')
(F/'evidence-ui-v9.js').write_text(s)
p=F/'stability-v10.js';s=p.read_text()
marker='// Whole-body navigation restores the sidebar without changing layer visibility.'
if marker not in s:
 s+='\n'+marker+'\n'+"window.addEventListener('atlas:region-changed',e=>{if(e.detail?.region==='body'){window.__ATLAS_TISSUES__?.showPanel(false);window.__ATLAS_LEARNING__?.setPanel(false);document.body.classList.remove('nav-open');}});\n"
 p.write_text(s)
print('Restored hash-checked readable build sources and prepared shared evidence UI')
