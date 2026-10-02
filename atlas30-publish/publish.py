"""Promote exactly two passing browser artifacts, preserving the prior release."""
from pathlib import Path
import json,hashlib,shutil,os
roots={e:Path('/tmp/atlas30-'+e) for e in ['chromium','webkit']}
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
base=Path('fullbody-tcm-v29')
assert sha(base/'app.bundle.js')=='d0b37d4f9e3c91b02a1bb40ff201df3266bb48031104442c5e0617606c75122d'
assert '../fullbody-tcm-v29/' in Path('anatomy/index.html').read_text(),'Entrance changed; review before promotion'
builds={e:json.loads((r/'fullbody-tcm-v30/build-info.json').read_text()) for e,r in roots.items()}
b=builds['chromium'];assert b==builds['webkit'];assert b['version']=='30.0.0'
assert str(b['verificationRun'])==os.environ['CANDIDATE_RUN']
assert b['sourceCommit']==os.environ['CANDIDATE_SHA']
reports={};baseline={}
for e,r in roots.items():
 for n,digest in b['files'].items():assert '/' not in n and sha(r/'fullbody-tcm-v30'/n)==digest,n
 paths={'contact':r/f'atlas30-evidence/local-{e}-v30.json','surface':r/f'fullbody-tcm-v30/checks/local-{e}-surface-switch.json','observation':r/f'fullbody-tcm-v30/checks/observation-local-{e}-observation.json','opaque':r/f'atlas29-evidence/local-{e}-v30.json'}
 reports[e]={}
 for key,file in paths.items():
  d=json.loads(file.read_text());assert d['success'] and not d.get('failure') and not d['errors'] and all(c['pass'] for c in d['checks']),(e,key)
  reports[e][key]={'passed':len(d['checks']),'finishedAt':d['finishedAt']}
 d=json.loads((r/f'atlas30-evidence/local-{e}-v29.json').read_text());assert not d.get('failure') and not d['errors']
 baseline[e]=[{'name':c['name'],'detail':c.get('detail')} for c in d['checks'] if not c['pass']]
 assert len(baseline[e])>=3,'Insufficient reproductions in the unchanged baseline'
dest=Path('fullbody-tcm-v30');assert not dest.exists();shutil.copytree(roots['chromium']/'fullbody-tcm-v30',dest)
for f in (roots['webkit']/'fullbody-tcm-v30/checks').iterdir():shutil.copy2(f,dest/'checks'/f.name)
proof=Path('atlas30-publish/evidence');proof.mkdir(parents=True,exist_ok=True)
for e,r in roots.items():
 for name in ['atlas30-evidence','atlas29-evidence']:
  target=proof/name;target.mkdir(exist_ok=True)
  for f in (r/name).glob('*'+e+'*'):shutil.copy2(f,target/f.name)
tests=Path('atlas30-publish/verified-tests');tests.mkdir(parents=True,exist_ok=True)
for name in ['probe.cjs','prior-surface-regression.cjs','prior-observation-regression.cjs','prior-probe.cjs']:
 a=roots['chromium']/'atlas30-repair'/name;c=roots['webkit']/'atlas30-repair'/name
 assert sha(a)==sha(c);shutil.copy2(a,tests/name)
release={'version':'30.0.0','sourceCommit':b['sourceCommit'],'candidateRun':b['verificationRun'],'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':b['files']['app.bundle.js'],'localBrowserChecks':reports,'originalModelsAndNumberedRoutesUnchanged':True,'skinContactPositionsUsedForLabelsPickingAndSelection':True,'clinicalCalibration':False,'previousV29Preserved':True,'publicVerification':'Recorded separately after entry activation'}
(dest/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
(proof/'baseline-reproductions.json').write_text(json.dumps(baseline,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))