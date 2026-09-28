"""Publish only a complete, tested V21 directory; retain original model assets."""
from pathlib import Path
import hashlib,json,shutil,os
left=Path('/tmp/atlas21-chromium/fullbody-tcm-v21')
right=Path('/tmp/atlas21-webkit/fullbody-tcm-v21')
build=json.loads((left/'build-info.json').read_text())
assert build['version']=='21.0.0'
assert build['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(build['verificationRun'])==os.environ['CANDIDATE_RUN']
assert not build['clinicalCalibration']
other=json.loads((right/'build-info.json').read_text())
assert build==other,'Both browser jobs must test the exact same source and bundle'
for root in [left,right]:
 for name,digest in build['sha256'].items():
  assert '/' not in name and '..' not in name
  assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
checks={}
for engine,root in [('chromium',left),('webkit',right)]:
 r=json.loads((root/'checks'/('local-'+engine+'.json')).read_text())
 assert r['success'] and not r['errors'] and len(r['checks'])>=50
 assert all(c['pass'] for c in r['checks'])
 assert r['coverage']['systems']=={'skeletal':210,'muscular':683,'nervous':550,'vessels':649,'ear':48}
 assert len(r['coverage']['excludedMaleOnlyVessels'])==10
 assert r['coverage']['nativeFemalePelvis'] and not r['coverage']['clinicalRegistration']
 assert len(r['pixelChecks'])==2 and all(p['linePixels']>350 and p['pointPixels']>150 for p in r['pixelChecks'])
 checks[engine]={'passed':len(r['checks']),'finishedAt':r['finishedAt'],'pixelChecks':r['pixelChecks']}
p=Path('fullbody-tcm-v21');assert not p.exists(),'Refuse to overwrite a published V21'
shutil.copytree(left,p)
for f in (right/'checks').glob('*'):shutil.copy2(f,p/'checks'/f.name)
release={'version':'21.0.0','sourceCommit':build['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':build['sha256']['app.bundle.js'],'browserChecks':checks,'femaleCoverage':r['coverage'],'quickViews':['surface','skin','bones','muscles','nerves','organs'],'alwaysOpenCustomLayers':True,'clinicalCalibration':False,'previousV20Preserved':True,'originalModelFilesUnchanged':True,'pointRegistrationUnchanged':True,'note':'Female native skin, pelvis and organs plus attributed common-proportion teaching anatomy. Model-part counts are not standard human bone counts. Male-only vessels are excluded, not used to inflate female counts. No new native female scan or clinical registration claim.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
