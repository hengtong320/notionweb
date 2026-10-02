from pathlib import Path
import hashlib,json,shutil,os
sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
roots={e:Path('/tmp/verified31-'+e) for e in ['chromium','webkit']}
expected_source='55e515814792204896da59349993701a6cee84a3'
builds={e:json.loads((r/'fullbody-tcm-v31/build-info.json').read_text()) for e,r in roots.items()}
b=builds['chromium'];assert b==builds['webkit'],'Browser candidates differ'
assert b['sourceCommit']==expected_source and b['version']=='31.0.0'
assert sha(Path('fullbody-tcm-v30/app.bundle.js'))=='32029acc4f9951fc5bd57473494e18e5749bd9a4a72fb4e9fe609d46572e26f5'
assert 'fullbody-tcm-v30/' in Path('anatomy/index.html').read_text(),'Do not replace another new release'
assert not Path('fullbody-tcm-v31').exists(),'Refuse to overwrite existing release'
reports={};reproductions={}
for e,r in roots.items():
 for n,digest in b['files'].items():
  assert '/' not in n and sha(r/'fullbody-tcm-v31'/n)==digest,(e,n)
 d=json.loads((r/f'atlas31-evidence/local-{e}-v31.json').read_text())
 assert d['success'] and not d.get('failure') and not d['errors']
 assert len(d['checks'])==42 and all(c['pass'] for c in d['checks'])
 assert len(d['pointPaint'])==18 and all(p['pixelDifference']>=4 and p['skinOpacity']==1 for p in d['pointPaint'])
 reports[e]={'passed':len(d['checks']),'finishedAt':d['finishedAt'],'pointPaint':d['pointPaint'],'lineAndDepth':d['lineAndDepth']}
 old=json.loads((r/f'atlas31-baseline/local-{e}-v30.json').read_text())
 reproductions[e]=[c['name'] for c in old['checks'] if not c['pass']]
for n in ['verify.cjs','extra.cjs','pixels.cjs','driver.cjs']:
 assert sha(roots['chromium']/'atlas31-repair'/n)==sha(roots['webkit']/'atlas31-repair'/n),n
p=Path('fullbody-tcm-v31');shutil.copytree(roots['chromium']/'fullbody-tcm-v31',p)
checks=p/'checks';checks.mkdir(exist_ok=True)
for e,r in roots.items():
 for directory in ['atlas31-evidence','atlas31-baseline']:
  for f in (r/directory).iterdir():
   if f.is_file():shutil.copy2(f,checks/f.name)
tests=Path('atlas31-publish/verified-tests');tests.mkdir(exist_ok=True)
for n in ['verify.cjs','extra.cjs','pixels.cjs','driver.cjs']:shutil.copy2(roots['chromium']/'atlas31-repair'/n,tests/n)
release={'version':'31.0.0','sourceCommit':b['sourceCommit'],'verificationRun':b['verificationRun'],'publishRun':os.environ['GITHUB_RUN_ID'],'bundleSHA256':b['files']['app.bundle.js'],'localBrowserChecks':reports,'baselineReproductions':reproductions,'originalModelsAndNumberedRoutesUnchanged':True,'clinicalCalibration':False,'previousV30Preserved':True,'publicVerification':'Recorded separately after fixed entry activation','testScope':'42 targeted surface-state, per-frame transition and real-pixel checks per browser; not all historical suites or clinical registration.'}
(p/'release.json').write_text(json.dumps(release,ensure_ascii=False,indent=2))
print('Verified artifact ready for publication',release['bundleSHA256'])
