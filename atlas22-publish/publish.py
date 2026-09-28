"""Publish only a reviewed versioned directory, never overwrite the old site."""
from pathlib import Path
import hashlib,json,os,shutil
roots={e:Path('/tmp/atlas22-'+e+'/fullbody-tcm-v22') for e in ['chromium','webkit']}
a=json.loads((roots['chromium']/'build-info.json').read_text());b=json.loads((roots['webkit']/'build-info.json').read_text())
assert a==b,'Browser engines must verify identical runtime files'
assert a['version']=='22.0.0' and a['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(a['verificationRun'])==os.environ['CANDIDATE_RUN'] and not a['clinicalCalibration']
checks={}
for engine,root in roots.items():
 for name,digest in a['sha256'].items():
  assert '/' not in name and '..' not in name
  assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
 checks[engine]={}
 for prefix,minimum in [('local-',20),('compatibility-local-',63)]:
  r=json.loads((root/'checks'/(prefix+engine+'.json')).read_text())
  assert r['success'] and not r['errors'] and len(r['checks'])>=minimum and all(x['pass'] for x in r['checks']),(engine,prefix)
  checks[engine][prefix.strip('-')]={'passed':len(r['checks']),'finishedAt':r['finishedAt']}
base=json.loads((roots['chromium']/'checks/baseline-v21-chromium.json').read_text())
assert base['baseline'] and not base.get('failure'),'Old-version reproduction must finish normally'
reproduced=[x for x in base['checks'] if not x['pass']]
assert len(reproduced)>0,'No old-version defects were reproduced'
p=Path('fullbody-tcm-v22');assert not p.exists(),'Refuse to replace an existing published V22'
shutil.copytree(roots['chromium'],p)
for f in (roots['webkit']/'checks').iterdir():shutil.copy2(f,p/'checks'/f.name)
release={'version':'22.0.0','sourceCommit':a['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':a['sha256']['app.bundle.js'],'browserChecks':checks,'reproducedV21Defects':reproduced,'originalModelsUnchanged':True,'pointRegistrationUnchanged':True,'clinicalCalibration':False,'previousV21Preserved':True,'savedV21CombinationsRetained':True,'note':'Interaction repairs only. Clinical point registration and native-versus-shared teaching geometry provenance remain unchanged.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
