"""Repair deterministic standard views; reuse the already verified anatomy, never redownload it."""
from pathlib import Path
import base64, hashlib, json, os, re, subprocess
base=Path(__file__).resolve().parent
p=base/'app.js';text=p.read_text()
old="function setView(name){if(!state.ready||!VIEWS[name])return;const v=VIEWS[name];state.view=name;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));$('viewBadge').lastElementChild.textContent=v.name;fitToContent(true,new THREE.Vector3(...v.dir),new THREE.Vector3(...v.up));}"
new="""function setView(name){
 if(!state.ready||!VIEWS[name])return;
 // Stable standard anatomical views: cancel interpolation and flush orbit damping
 // before changing the camera up axis. Ordinary free-orbit controls stay smooth.
 const v=VIEWS[name],damping=controls.enableDamping;
 cameraTween=null;controls.enableDamping=false;controls.update();
 state.view=name;
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
 $('viewBadge').lastElementChild.textContent=v.name;
 try{fitToContent(false,new THREE.Vector3(...v.dir),new THREE.Vector3(...v.up));}
 finally{controls.enableDamping=damping;}
}"""
if old in text:text=text.replace(old,new,1)
elif '// Stable standard anatomical views:' not in text:raise RuntimeError('Unexpected setView implementation; manual review required')
p.write_text(text)
model=(base/'assets/foot.glb').read_bytes()
blobsha=hashlib.sha1(b'blob '+str(len(model)).encode()+b'\0'+model).hexdigest()
if blobsha!='58e6bdc5285bcc3df7178fdfdb1c597649f7b1ea':raise RuntimeError('Unexpected anatomy asset; refusing to rebuild '+blobsha)
subprocess.run(['node','--check',str(p)],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(p),str(base/'app.bundle.js')],check=True)
html=(base/'index.template.html').read_text()
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+(base/'styles.css').read_text()+'</style>')
html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
bundle=(base/'app.bundle.js').read_text().replace('</script','<\\/script')
html=html.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode(model).decode()+'";</script>\n<script>'+bundle+'</script>')
(base/'index.html').write_text(html)
info=json.loads((base/'build-info.json').read_text())
info.update({'deliveryRevision':'2026-09-21-stable-views','htmlBytes':len(html.encode()),'embeddedModelBlobSHA':blobsha,'noRuntimeNetwork':True})
(base/'build-info.json').write_text(json.dumps(info,indent=2))
print('REBUILT',json.dumps(info))
