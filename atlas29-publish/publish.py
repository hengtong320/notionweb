"""Publish identical, passing V29 artifacts. Never replace an existing release."""
from pathlib import Path
import os,json,hashlib,shutil
sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
roots={e:Path('/tmp/atlas29-'+e) for e in ['chromium','webkit']}
dest=Path('fullbody-tcm-v29');assert not dest.exists(),'Existing V29 must be reconciled, not overwritten'
base=Path('fullbody-tcm-v28')
assert sha(base/'app.bundle.js')=='e1ff086300771374f79b6ec838a8cb80e46ec9a4e9848409e48b3d89e2776efc'
assert '../fullbody-tcm-v28/' in Path('anatomy/index.html').read_text(),'Entrance changed; do not replace newer work'
reports={};manifests={}
for engine,root in roots.items():
 p=root/'fullbody-tcm-v29';b=json.loads((p/'build-info.json').read_text());manifests[engine]=b
 assert b['version']=='29.0.0' and str(b['verificationRun'])==os.environ['SOURCE_RUN']
 assert b['sourceCommit']==os.environ['SOURCE_COMMIT']
 for name,digest in b['files'].items():
  assert '/' not in name and sha(p/name)==digest,name
 for name,digest in b['tests'].items():assert sha(root/'atlas29-repair'/name)==digest,name
 inv=json.loads((p/'v29-invariants.json').read_text())
 for name,digest in inv['unchangedFiles'].items():assert sha(base/name)==digest==sha(p/name),name
 unit=json.loads((p/f'checks/local-{engine}-picking-unit.json').read_text())
 assert unit['success'] and len(unit['checks'])==12 and all(c['pass'] for c in unit['checks'])
 cases={
  'new':(root/f'atlas29-evidence/local-{engine}-v29.json',14),
  'surface':(p/f'checks/local-{engine}-surface-switch.json',44),
  'observation':(p/f'checks/observation-local-{engine}-observation.json',28)
 }
 reports[engine]={}
 for group,(f,count) in cases.items():
  r=json.loads(f.read_text());assert r['success'] and not r.get('failure') and not r['errors'],str(f)
  assert len(r['checks'])==count and all(c['pass'] for c in r['checks']),str(f)
  assert str(r['version']).startswith('29'),(f,r['version'])
  if group=='observation':assert any(str(v['version'])=='29' for v in r['viewports']) and all(str(v['version']) in ['26','29'] for v in r['viewports'])
  reports[engine][group]={'passed':count,'finishedAt':r['finishedAt']}
assert manifests['chromium']==manifests['webkit'],'Browser jobs must have identical source bytes and manifests'
shutil.copytree(roots['chromium']/'fullbody-tcm-v29',dest)
for engine,root in roots.items():
 for f in (root/'fullbody-tcm-v29/checks').iterdir():
  if f.is_file():shutil.copy2(f,dest/'checks'/f.name)
 for f in (root/'atlas29-evidence').iterdir():
  if f.is_file():shutil.copy2(f,dest/'checks'/f.name)
tests=Path('atlas29-publish/verified-tests');tests.mkdir(parents=True,exist_ok=True)
for f in (roots['chromium']/'atlas29-repair').glob('*.cjs'):shutil.copy2(f,tests/f.name)
b=manifests['chromium']
release={'version':'29.0.0','sourceCommit':b['sourceCommit'],'candidateRun':b['verificationRun'],'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':b['files']['app.bundle.js'],'localBrowserChecks':reports,'syntheticPickingBoundaryChecks':12,'publicBrowserChecks':'Recorded separately after public entrance activation','clinicalCalibration':False,'rawAnatomyUnchanged':True,'v28DisplayPointsRoutesAndPigmentGeometryUnchanged':True,'previousV28Preserved':True,'fixes':['Retain hidden meridian master state through sex switching','Preserve continuous opaque skin while locally cropping meridians','Exit incompatible internal-structure isolation when enabling skin','Reset stale nerve xray when explicitly adding skin','Block behind-skin click-through while permitting visible foreground structures'],'note':'86 current browser assertions per engine, plus 12 synthetic picking boundaries recorded separately. Geometry and visibility tests are not clinical calibration or an all-device guarantee.'}
(dest/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
