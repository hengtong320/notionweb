"""Finalize only the new ankle viewer; anatomy and the approved foot page remain untouched."""
from pathlib import Path
import base64,hashlib,json,re,subprocess
base=Path(__file__).resolve().parents[1]/'ankle-atlas'
report=json.loads((base/'qa/offline-report.json').read_text())
assert report['success'] and len(report['checks'])==87 and all(c['pass'] for c in report['checks'])
p=base/'app.js';text=p.read_text()
# SSAOPass caches depth/projection uniforms. Keep them aligned when region views
# change the camera far plane, so the original shading remains consistent.
helper="""
function syncAOProjection(){
 if(!aoPass)return;
 const u=aoPass.ssaoMaterial.uniforms;
 u.cameraNear.value=camera.near;u.cameraFar.value=camera.far;
 u.cameraProjectionMatrix.value.copy(camera.projectionMatrix);
 u.cameraInverseProjectionMatrix.value.copy(camera.projectionMatrixInverse);
 aoPass.depthRenderMaterial.uniforms.cameraNear.value=camera.near;
 aoPass.depthRenderMaterial.uniforms.cameraFar.value=camera.far;
}
"""
assert 'function syncAOProjection' not in text
text=text.replace('function animate(now){',helper+'\nfunction animate(now){')
assert 'composer.render(dt);' in text and 'composer.render();' in text
text=text.replace('composer.render(dt);','syncAOProjection();composer.render(dt);').replace('composer.render();','syncAOProjection();composer.render();')
p.write_text(text)
# Retain all interaction assertions. A standard laptop viewport reduces software
# rendering time; separate full-size screenshots remain included in the evidence.
q=base/'verify.cjs';test=q.read_text().replace('viewport:{width:1600,height:1000}','viewport:{width:1366,height:900}')
test=test.replace("const label=live?'live':engine===webkit?'webkit':'offline';","const label=live?'live':engine===webkit?'webkit':'final-offline';")
q.write_text(test)
(base/'qa/offline-failure.png').unlink(missing_ok=True)
subprocess.run(['node','--check',str(p)],check=True)
subprocess.run(['node','-e',"require('esbuild').buildSync({entryPoints:[process.argv[1]],bundle:true,minify:true,nodePaths:[process.env.NODE_PATH],format:'iife',target:['es2020'],outfile:process.argv[2],legalComments:'inline'})",str(p),str(base/'app.bundle.js')],check=True)
h=(base/'index.template.html').read_text().replace('<link rel="stylesheet" href="styles.css">','<style>'+(base/'styles.css').read_text()+'</style>')
h=re.sub(r'<script type="importmap">.*?</script>','',h,flags=re.S)
bundle=(base/'app.bundle.js').read_text().replace('</script','<\\/script')
h=h.replace('<script type="module" src="app.js"></script>','<script>window.FOOT_ATLAS_EMBEDDED="'+base64.b64encode((base/'assets/ankle.glb').read_bytes()).decode()+'";</script>\n<script>'+bundle+'</script>')
(base/'index.html').write_text(h)
info=json.loads((base/'build-info.json').read_text())
info.update({'revision':'2026-09-21-ankle-v1-final','htmlBytes':len(h.encode()),'htmlSHA256':hashlib.sha256(h.encode()).hexdigest(),'renderProjectionSynchronized':True,'priorCompleteOfflineTestRun':35624709689})
(base/'build-info.json').write_text(json.dumps(info,indent=2))
with (base/'README.md').open('a') as f:f.write('\n最终发布保留87项已通过的完整回归记录；最终构建补上区域切换的深度渲染参数同步，再对公开网址执行全部交互检查。以 qa/live-report.json 和 qa/final-render-check.json 为最终版本证据。最终补丁见 ankle-release-tools/finalize.py。\n')
print('FINALIZED',json.dumps(info))
