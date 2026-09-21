"""Build self-contained HTML from explicitly attributed and checksum-verified anatomy."""
from pathlib import Path
import base64, hashlib, os, re, shutil, subprocess, tempfile, urllib.request, json
base=Path(__file__).resolve().parent
package=Path(os.environ.get('THREE_PACKAGE',base.parent/'node_modules'/'three')).resolve()
assert package.is_dir(),f'Three.js missing: {package}'
# Correct a harmless UI wording typo before bundling.
p=base/'app.js';p.write_text(p.read_text().replace('拖拽空白白','拖拽空白'))
with tempfile.TemporaryDirectory(prefix='foot-atlas-') as td:
 work=Path(td)
 url='https://raw.githubusercontent.com/Liyucheng1997/242_lab-human-anatomy/main/public/models/skeleton.glb'
 req=urllib.request.Request(url,headers={'User-Agent':'FootAtlas-Education/1.0'})
 with urllib.request.urlopen(req,timeout=120) as resp:data=resp.read()
 blobsha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
 if blobsha!='5e15f7ea303c554f6c25a417f7f184696234b436':raise RuntimeError('Upstream changed; explicit model review required: '+blobsha)
 (work/'z-anatomy-skeleton.glb').write_bytes(data)
 shutil.copy(package/'examples/jsm/libs/draco/gltf/draco_decoder.js',work/'draco_decoder.cjs')
 env={**os.environ,'ATLAS_SOURCE':str(work),'THREE_PACKAGE':str(package)}
 subprocess.run(['node',str(base/'decode_draco.cjs')],env=env,check=True)
 subprocess.run(['python',str(base/'prepare_model.py')],env=env,check=True)
 subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(base/'app.js'),str(work/'app.bundle.js')],env=env,check=True,cwd=base.parent)
 html=(base/'index.template.html').read_text()
 html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+(base/'styles.css').read_text()+'</style>')
 html=re.sub(r'<script type="importmap">.*?</script>','',html,flags=re.S)
 model=base64.b64encode((base/'assets/foot.glb').read_bytes()).decode()
 bundle=(work/'app.bundle.js').read_text().replace('</script','<\\/script')
 html=html.replace('<script type="module" src="app.js"></script>',f'<script>window.FOOT_ATLAS_EMBEDDED="{model}";</script>\n<script>{bundle}</script>')
 (base/'index.html').write_text(html)
 (base/'app.bundle.js').write_text(bundle)
 report={'sourceBlobSHA':blobsha,'threeVersion':json.loads((package/'package.json').read_text())['version'],'htmlBytes':len(html.encode()),'modelBytes':(base/'assets/foot.glb').stat().st_size,'noRuntimeNetwork':True}
 (base/'build-info.json').write_text(json.dumps(report,indent=2))
 print('BUILD_OK',json.dumps(report))
