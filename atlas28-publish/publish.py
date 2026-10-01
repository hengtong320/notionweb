"""Publish a pinned, completely verified candidate; never change V27 or anatomy."""
from pathlib import Path
import os,json,hashlib,shutil
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
roots={e:Path('/tmp/atlas28-'+e) for e in ['chromium','webkit']}
source=roots['chromium']/'fullbody-tcm-v28'
build=json.loads((source/'build-info.json').read_text())
assert build['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(build['verificationRun'])==os.environ['CANDIDATE_RUN']
assert build['version']=='28.0.0' and not build['clinicalCalibration']
reports={};changes={}
for engine,root in roots.items():
 p=root/'fullbody-tcm-v28'
 assert json.loads((p/'build-info.json').read_text())==build
 for name,digest in build['files'].items():
  assert '/' not in name and sha(p/name)==digest,name
 for name,digest in build['tests'].items():
  assert sha(root/'atlas28-repair'/name)==digest,name
 reports[engine]={}
 for suite,name,count in [('surface','local-'+engine+'-surface-switch.json',44),('observation','observation-local-'+engine+'-observation.json',28),('reading','prior-local-'+engine+'.json',33)]:
  d=json.loads((p/'checks'/name).read_text())
  assert d['success'] and not d.get('failure') and not d['errors'],(engine,suite)
  assert len(d['checks'])==count and all(c['pass'] for c in d['checks']),(engine,suite,len(d['checks']))
  reports[engine][suite]={'passed':count,'finishedAt':d['finishedAt']}
  if suite=='reading':changes[engine]=d['projectionChanges']
assert sha(Path('fullbody-tcm-v27/app.bundle.js'))=='428611725afdc06d60bb2cd1b4f96efa7f39dec15657ac2aceeddd5ad09f3f39'
dest=Path('fullbody-tcm-v28');assert not dest.exists()
shutil.copytree(source,dest)
for f in (roots['webkit']/'fullbody-tcm-v28/checks').iterdir():
 if f.is_file():shutil.copy2(f,dest/'checks'/f.name)
tests=Path('atlas28-publish/verified-tests');tests.mkdir(exist_ok=True)
for name in build['tests']:shutil.copy2(roots['chromium']/'atlas28-repair'/name,tests/name)
release={'version':'28.0.0','sourceCommit':build['sourceCommit'],'candidateRun':build['verificationRun'],'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':build['files']['app.bundle.js'],'localBrowserChecks':reports,'clinicalCalibration':False,'originalModelsUnchanged':True,'rawPointReferencesUnchanged':True,'previousV27Preserved':True,'displayContactsChanged':{body:len(rows['points']) for body,rows in changes['chromium'].items()},'note':'Opaque skin projection and male/female state consistency. Display contacts on wrong skin faces intentionally change; raw point references are not clinically recalibrated. Local and public checks remain separate.'}
(dest/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
(dest/'projection-changes.json').write_text(json.dumps({'baseline':'V25/V27 shared displayed anchors','version':'28.0.0','units':'model units; not patient millimetres or clinical error','clinicalCalibration':False,'engines':changes},ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
