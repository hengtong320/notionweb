from pathlib import Path
import hashlib,json,os,shutil
roots={e:Path('/tmp/atlas24-'+e+'/fullbody-tcm-v24') for e in ['chromium','webkit']}
a=json.loads((roots['chromium']/'build-info.json').read_text());b=json.loads((roots['webkit']/'build-info.json').read_text())
assert a==b,'Both engines must verify identical sources and bundle'
assert a['version']=='24.0.0' and a['sourceCommit']==os.environ['CANDIDATE_SHA']
assert str(a['verificationRun'])==os.environ['CANDIDATE_RUN'] and not a['clinicalCalibration']
checks={};geometry={}
for engine,root in roots.items():
 for name,digest in a['sha256'].items():
  assert '/' not in name and '..' not in name
  assert hashlib.sha256((root/name).read_bytes()).hexdigest()==digest,name
 checks[engine]={}
 for prefix,minimum in [('local-',37),('selection-local-',25),('prior-local-',20),('compatibility-local-',63)]:
  r=json.loads((root/'checks'/(prefix+engine+'.json')).read_text())
  assert r['version']=='24.0.0' and r['success'] and not r['errors'] and len(r['checks'])>=minimum and all(x['pass'] for x in r['checks']),(engine,prefix)
  checks[engine][prefix.strip('-')]={'passed':len(r['checks']),'finishedAt':r['finishedAt']}
  if prefix=='local-':
   geometry[engine]={sex:{k:data[k] for k in ['curvature','baselineCurvature','surfaceTriangles','baselineTriangles','disconnections','pointChanges']} for sex,data in r['bodies'].items()}
   assert all(t['candidateOverflow']==0 and t['uniqueFacePainting'] for data in r['bodies'].values() for t in data['ink'])
p=Path('fullbody-tcm-v24');assert not p.exists(),'Refuse to overwrite an existing release'
shutil.copytree(roots['chromium'],p)
for f in (roots['webkit']/'checks').iterdir():shutil.copy2(f,p/'checks'/f.name)
visual=Path('/tmp/atlas24-webkit/atlas24-inspection-v24')
assert json.loads((visual/'errors.json').read_text())==[]
for f in visual.glob('*.png'):shutil.copy2(f,p/'checks'/('closeup-local-'+f.name))
original=Path('fullbody-tcm-v23');unchanged=[]
for f in original.glob('*.json'):
 if f.name not in ['build-info.json','release.json']:
  assert f.read_bytes()==(p/f.name).read_bytes(),f.name
  unchanged.append(f.name)
t=Path('atlas24-publish/verified-tests');t.mkdir(parents=True,exist_ok=True)
for name in ['verify.cjs','prior-verify.cjs','prior-prior-interactions.cjs','prior-compatibility.cjs']:
 shutil.copy2(Path('/tmp/atlas24-webkit/atlas24-repair')/name,t/name)
s=Path('/tmp/atlas24-webkit/atlas24-repair/inspect.cjs').read_text()
s=s.replace("ver=process.env.VERSION||'23'","ver=process.env.VERSION||'24'")
s=s.replace("out=path.join(root,'atlas24-inspection-v'+ver)","out=path.join(root,process.env.TEST_URL?'atlas24-inspection-live':'atlas24-inspection-v'+ver)")
s=s.replace("p.goto('http://127.0.0.1:8204/fullbody-tcm-v'+ver+'/')","p.goto(process.env.TEST_URL||'http://127.0.0.1:8204/fullbody-tcm-v'+ver+'/')")
(t/'inspect.cjs').write_text(s)
release={'version':'24.0.0','sourceCommit':a['sourceCommit'],'candidateRun':int(os.environ['CANDIDATE_RUN']),'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':a['sha256']['app.bundle.js'],'browserChecks':checks,'geometryComparisons':geometry,'originalAnatomicalJSONUnchanged':unchanged,'originalModelsUnchanged':True,'pointRegistrationUnchanged':True,'bodySpecificDisplayCorrections':['female LU11, LI1, LI2, LI3, PC9 finger correspondence','local hand and foot projection','nearby flank, pelvis and thigh ray-hit clusters'],'renderer':'single-pass skin distance-field union, local outer-envelope smoothing','clinicalCalibration':False,'previousV23Preserved':True,'note':'Original point coordinates are preserved. Body-specific display contacts and intermediate route geometry are corrected. Smoothness and visibility checks are not clinical validation of every acupoint.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print(json.dumps(release,ensure_ascii=False,indent=2))
