"""V30.0.1: one owner for skin captions; preserve contact geometry and switching."""
from pathlib import Path
import hashlib,json,os,shutil,sys
p=Path('fullbody-tcm-v30');sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
files=['shared-v14.js','refinement-v12.js','female-v12.js','learning-enhancements.js','app.bundle.js','index.html','index.template.html','README.md']
if sys.argv[1]=='prepare':
 assert sha(p/'app.bundle.js')=='fadf2269c595712a004c6296479fb96aabd4101959bd7b82f44ff86633cd3e7b'
 original={n:sha(p/n) for n in files}
 def edit(name,old,new):
  f=p/name;s=f.read_text();assert s.count(old)==1,(name,old[:100],s.count(old));f.write_text(s.replace(old,new))
 helper="""function refreshSurfaceCaption(){
  if(state.bodyTransition||!['surface','skin','custom'].includes(scene))return false;
  const surface=snapshots().surface;if(!surface?.on)return false;
  const caption=scene==='custom'?'自定义体表图层':learning.getState().enabled?'体表经络':'纯体表';
  const heading=(female.active?'女性':'男性')+' · '+caption;
  const count='体表 · 不透明度 '+Math.round((surface.opacity??1)*100)+'%';
  if($('regionHeading').textContent!==heading)$('regionHeading').textContent=heading;
  if($('visibleCount').textContent!==count)$('visibleCount').textContent=count;
  return true;
 }
 function redraw(){"""
 edit('shared-v14.js','function redraw(){',helper)
 needle="if(!['point','meridian'].includes(window.__ATLAS_STUDY__.getState().current.kind))$('evidenceCurrent').textContent='来源与说明';renderDirectory();invalidate();"
 edit('shared-v14.js',needle,'refreshSurfaceCaption();'+needle)
 edit('shared-v14.js','const api={getModelCounts:','const api={refreshSurfaceCaption,getModelCounts:')
 event="window.addEventListener('atlas:tcm-visibility',()=>{if(learning.getState().enabled"
 edit('shared-v14.js',event,"window.addEventListener('atlas:tcm-visibility',()=>{schedule();if(learning.getState().enabled")
 edit('refinement-v12.js','if(num){const count=',"if(num&&!window.__ATLAS_SHARED__?.refreshSurfaceCaption()){const count=")
 edit('female-v12.js',"if($('visibleCount').textContent!==n)$('visibleCount').textContent=n;", "if(!window.__ATLAS_SHARED__?.refreshSurfaceCaption()&&$('visibleCount').textContent!==n)$('visibleCount').textContent=n;")
 for n in ['shared-v14.js','learning-enhancements.js','index.html','index.template.html']:
  f=p/n;f.write_text(f.read_text().replace('30.0.0','30.0.1'))
 f=p/'README.md';f.write_text(f.read_text()+'\n## V30.0.1 体表标题与计数\n\n线上截图复查发现：切回男性、保留穴位选中状态时，骨骼恢复函数先写入“全身骨骼／0/210”，随后男女模型各自的旧计数回调又覆盖共用界面。现在体表标题和计数由同一方法维护，按当前人体、经络开关和皮肤不透明度显示；旧男女计数只在非体表场景继续工作。关闭总开关也立即刷新。标题不再把被不透明皮肤遮住的骨头数量当成体表可见数量。此修正不修改皮肤绘制、点线几何和切换恢复逻辑。\n')
 (p/'caption-base.json').write_text(json.dumps({'baseFiles':original,'sourceCommit':os.environ['GITHUB_SHA'],'verificationRun':os.environ['GITHUB_RUN_ID']},indent=2))
elif sys.argv[1]=='record':
 d=json.loads((p/'caption-base.json').read_text());d['files']={n:sha(p/n) for n in files};d['tests']={n:sha(Path(n)) for n in ['atlas30-caption/verify.cjs','atlas30-publish/verified-tests/probe.cjs']};(p/'caption-build.json').write_text(json.dumps(d,indent=2))
elif sys.argv[1]=='publish':
 roots={e:Path('/tmp/caption-'+e) for e in ['chromium','webkit']};builds={e:json.loads((r/'fullbody-tcm-v30/caption-build.json').read_text()) for e,r in roots.items()};d=builds['chromium'];assert d==builds['webkit']
 for n,old in d['baseFiles'].items():assert sha(p/n)==old,'Current runtime changed: '+n
 reports={}
 for e,r in roots.items():
  for n,h in d['files'].items():assert sha(r/'fullbody-tcm-v30'/n)==h
  reports[e]={}
  for key,file in [('caption',r/f'atlas30-caption-evidence/local-{e}.json'),('contact',r/f'atlas30-evidence/local-{e}-v30.json')]:
   a=json.loads(file.read_text());assert a['success'] and not a.get('failure') and not a['errors'] and all(c['pass'] for c in a['checks']),str(file)
   reports[e][key]={'passed':len(a['checks']),'finishedAt':a['finishedAt']}
  target=Path('atlas30-caption/evidence')/e;target.mkdir(parents=True,exist_ok=True)
  for folder in ['atlas30-caption-evidence','atlas30-evidence']:
   shutil.copytree(r/folder,target/folder,dirs_exist_ok=True)
 for n in files:shutil.copy2(roots['chromium']/'fullbody-tcm-v30'/n,p/n)
 shutil.copy2(roots['chromium']/'fullbody-tcm-v30/caption-build.json',p/'caption-build.json')
 f=p/'build-info.json';b=json.loads(f.read_text());b['version']='30.0.1';b['files'].update(d['files']);b['captionRepair']=d;f.write_text(json.dumps(b,indent=2))
 f=p/'release.json';b=json.loads(f.read_text());b['version']='30.0.1';b['previousBundleSHA256']=b['bundleSHA256'];b['bundleSHA256']=d['files']['app.bundle.js'];b['captionRepair']={'sourceCommit':d['sourceCommit'],'verificationRun':d['verificationRun'],'localBrowserChecks':reports,'scope':'Scene caption and version metadata only; skin and geometry code unchanged'};f.write_text(json.dumps(b,ensure_ascii=False,indent=2))
 print(json.dumps(b['captionRepair'],ensure_ascii=False,indent=2))
else:raise ValueError(sys.argv[1])