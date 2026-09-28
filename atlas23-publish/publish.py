"""Promote exact tested runtime bytes only; retain V22 and anatomical assets."""
from pathlib import Path
import os,json,hashlib,shutil
roots={e:Path('/tmp/atlas23-'+e+'/fullbody-tcm-v23') for e in ['chromium','webkit']}
build=json.loads((roots['chromium']/'build-info.json').read_text())
assert build==json.loads((roots['webkit']/'build-info.json').read_text())
assert build['version']=='23.0.0' and build['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(build['verificationRun'])==os.environ['CANDIDATE_RUN']
checks={}
for engine,root in roots.items():
 for name,digest in build['sha256'].items():
  assert '/' not in name and '..' not in name
  assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
 checks[engine]={}
 for prefix,minimum in [('local-',24),('prior-local-',20),('compatibility-local-',63)]:
  r=json.loads((root/'checks'/(prefix+engine+'.json')).read_text())
  assert r['success'] and not r['errors'] and len(r['checks'])>=minimum and all(x['pass'] for x in r['checks']),(engine,prefix)
  checks[engine][prefix.strip('-')]={'passed':len(r['checks']),'finishedAt':r['finishedAt']}
base=json.loads((roots['chromium']/'checks/baseline-v22-chromium.json').read_text())
assert base['baseline'] and not base.get('failure'),'Old-version reproduction must finish normally'
reproduced=[x for x in base['checks'] if not x['pass']]
assert reproduced
untouched=[]
for f in Path('fullbody-tcm-v22').glob('*.json'):
 if f.name not in ['release.json','build-info.json']:
  assert f.read_bytes()==(roots['chromium']/f.name).read_bytes(),f.name
  untouched.append(f.name)
p=Path('fullbody-tcm-v23');assert not p.exists(),'Refuse to overwrite a published V23'
shutil.copytree(roots['chromium'],p)
for f in (roots['webkit']/'checks').iterdir():shutil.copy2(f,p/'checks'/f.name)
release={'version':'23.0.0','sourceCommit':build['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':build['sha256']['app.bundle.js'],'browserChecks':checks,'reproducedV22Defects':reproduced,'anatomicalDataFilesVerifiedUnchanged':untouched,'originalModelsUnchanged':True,'pointRegistrationUnchanged':True,'clinicalCalibration':False,'previousV22Preserved':True,'sourcePolicy':'Female native anatomy plus explicitly attributed common-proportion teaching reference; unchanged.','note':'Selection and interaction improvements only. The tested visibility checks do not establish anatomical or clinical registration.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
