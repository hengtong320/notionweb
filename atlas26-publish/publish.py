"""Publish an exact, browser-tested runtime. Never edit V25 or raw models."""
from pathlib import Path
import os,json,hashlib,shutil
roots={e:Path('/tmp/atlas26-'+e+'/fullbody-tcm-v26') for e in ['chromium','webkit']}
builds={e:json.loads((p/'build-info.json').read_text()) for e,p in roots.items()}
b=builds['chromium'];assert b==builds['webkit'],'Different runtimes were tested'
assert b['version']=='26.0.0' and b['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(b['verificationRun'])==os.environ['CANDIDATE_RUN'] and not b['clinicalCalibration']
checks={}
for e,p in roots.items():
 for name,digest in b['sha256'].items():
  assert '/' not in name and '..' not in name
  assert hashlib.sha256((p/name).read_bytes()).hexdigest()==digest,name
 r=json.loads((p/'checks'/('local-'+e+'.json')).read_text())
 assert r['success'] and not r['errors'] and not r.get('failure')
 assert len(r['checks'])>=30 and all(c['pass'] for c in r['checks'])
 checks[e]={'passed':len(r['checks']),'finishedAt':r['finishedAt'],'strokeComparison':r['comparison']}
inv=json.loads((roots['chromium']/'invariants.json').read_text())
for name in inv['anatomicalJSONUnchanged']:
 assert (Path('fullbody-tcm-v25')/name).read_bytes()==(roots['chromium']/name).read_bytes(),name
p=Path('fullbody-tcm-v26');assert not p.exists(),'Refuse to overwrite a published V26'
shutil.copytree(roots['chromium'],p)
for f in (roots['webkit']/'checks').iterdir():shutil.copy2(f,p/'checks'/f.name)
t=Path('atlas26-publish/verified-tests');t.mkdir(parents=True,exist_ok=True)
shutil.copy2('/tmp/atlas26-chromium/atlas26-repair/verify.cjs',t/'verify.cjs')
release={'version':'26.0.0','sourceCommit':b['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':b['sha256']['app.bundle.js'],'browserChecks':checks,'clinicalCalibration':False,'numberedCoordinatesUnchanged':True,'originalModelsUnchanged':True,'previousV25Preserved':True,'anatomicalJSONUnchanged':inv['anatomicalJSONUnchanged'],'note':'Targeted display and reading fixes. Screenshots and pixel tests cover recorded views only; they are not a claim of anatomical registration or complete absence of defects.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
