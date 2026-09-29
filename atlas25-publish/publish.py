"""Publish the tested V25 only; leave V24 and original model assets untouched."""
from pathlib import Path
import json,hashlib,os,shutil
source=Path('/tmp/runtime/fullbody-tcm-v25')
build=json.loads((source/'build-info.json').read_text())
assert build['version']=='25.0.0' and build['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(build['candidateRun'])==os.environ['CANDIDATE_RUN']
assert not build['clinicalCalibration'] and build['numberedAnchorDataUnchanged']
for name,digest in build['sha256'].items():
 assert '/' not in name and '..' not in name
 assert hashlib.sha256((source/name).read_bytes()).hexdigest()==digest,name
checks={};comparisons={};reports=[]
for engine in ['chromium','webkit']:
 checks[engine]={}
 for suite,prefix,minimum in [('quality','quality-local-',21),('quality','geometry-local-',41),('selection','selection-local-',25),('selection','prior-local-',20),('coverage','compatibility-local-',63)]:
  folder=Path('/tmp/results')/('atlas25-'+engine+'-'+suite)
  f=folder/(prefix+engine+'.json');r=json.loads(f.read_text())
  assert r['version']=='25.0.0' and r['success'] and not r.get('errors') and not r.get('failure'),(engine,prefix,r.get('failure'))
  assert len(r['checks'])>=minimum and all(c['pass'] for c in r['checks']),(engine,prefix)
  checks[engine][prefix.rstrip('-')]={'passed':len(r['checks']),'finishedAt':r['finishedAt']};reports.append(f)
  if suite=='quality' and prefix=='quality-local-':
   comparisons[engine]=r['comparison']
   for sex in ['male','female']:
    d=r['comparison'][sex]
    assert d['pointShift']<1e-7 and d['after']['severe']<d['before']['severe']
    assert d['after']['totalTurningDegrees']<d['before']['totalTurningDegrees'] and d['breaks']<=d['oldBreaks']
p=Path('fullbody-tcm-v25');assert not p.exists(),'Never overwrite an existing V25 release'
shutil.copytree(source,p)
(p/'checks').mkdir(exist_ok=True)
for f in reports:shutil.copy2(f,p/'checks'/f.name)
for f in Path('/tmp/results/atlas25-webkit-quality').glob('*.png'):shutil.copy2(f,p/'checks'/f.name)
for f in Path('fullbody-tcm-v24').iterdir():
 if f.suffix=='.json' and f.name not in ['release.json','build-info.json']:assert f.read_bytes()==(p/f.name).read_bytes(),f.name
release={'version':'25.0.0','sourceCommit':build['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':build['sha256']['app.bundle.js'],'browserChecks':checks,'curveComparisons':comparisons,'clinicalCalibration':False,'numberedAnchorDataUnchanged':True,'numberedDisplayAnchorPositionsUnchanged':True,'originalModelFilesUnchanged':True,'previousV24Preserved':True,'note':'Local route-loop, bounded fairing and skin-pigment rendering repairs. Tests measure display geometry, not anatomical or clinical point registration. Existing female-native and shared-teaching provenance remains unchanged.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
