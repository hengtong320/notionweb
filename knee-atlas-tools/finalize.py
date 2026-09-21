"""Final display adaptations for new upper regions; lower-region rendering stays unchanged."""
from pathlib import Path
import base64,hashlib,json,re,subprocess
p=Path(__file__).resolve().parents[1]/'knee-atlas'
f=p/'app.js';s=f.read_text()
old="floor.visible=!state.isolated&&camera.position.y>-38.5;"
new="floor.visible=!state.isolated&&camera.position.y>-38.5&&!['whole','knee'].includes(state.region);"
assert old in s;s=s.replace(old,new,1)
old='function updateRegionUI(){'
new="function updateRegionUI(){\n scene.background.set('#eff2e9');if(['whole','knee'].includes(state.region))scene.background.multiplyScalar(2.0);"
assert old in s;s=s.replace(old,new,1);f.write_text(s)
f=p/'index.template.html';s=f.read_text()
s=s.replace('原足骨 28 块 + 小腿骨 2 块','原有 30 块 + 股骨、髌骨').replace('保留足骨原版；本次新增胫骨、腓骨。','原两版保持不变；本期增加大腿与膝。').replace('右侧 · 第一期','右侧 · 第二期').replace('下肢骨骼图谱 · Foot Atlas','下肢骨骼图谱 · Lower Limb Atlas')
s=s.replace('href="https://hengtong320.github.io/notionweb/foot-atlas/" target="_blank" rel="noopener">上一版：足踝','href="https://hengtong320.github.io/notionweb/ankle-atlas/" target="_blank" rel="noopener">上一版：足踝')
f.write_text(s)
subprocess.run(['node','--check',str(p/'app.js')],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(p/'app.js'),str(p/'app.bundle.js')],check=True)
s=s.replace('<link rel="stylesheet" href="styles.css">','<style>'+(p/'styles.css').read_text()+'</style>')
s=re.sub(r'<script type="importmap">.*?</script>','',s,flags=re.S)
bundle=(p/'app.bundle.js').read_text().replace('</script','<\\/script')
s=s.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((p/'assets/knee.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(p/'index.html').write_text(s)
f=p/'build-info.json';info=json.loads(f.read_text());info.update(htmlBytes=len(s.encode()),htmlSHA256=hashlib.sha256(s.encode()).hexdigest(),upperRegionHorizonRemoved=True);f.write_text(json.dumps(info,ensure_ascii=False,indent=2))
print('FINAL_KNEE_BUILD',json.dumps(info))
