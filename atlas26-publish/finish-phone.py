"""Finalize only the diagnosed mobile CSS fix. Original V25 and V26 JS stay unchanged."""
from pathlib import Path
import sys,os,json,hashlib,shutil
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
p=Path('fullbody-tcm-v26')
if sys.argv[1]=='prepare':
 f=p/'reading-v26.css';s=f.read_text();old=' .tcm-card-head{position:sticky;top:-8px;';new=' .tcm-card-head{position:static;top:auto;';assert s.count(old)==1
 base=sha(f);f.write_text(s.replace(old,new))
 f=p/'README.md';f.write_text(f.read_text()+'\n## 手机画面补查\n\nChromium 在固定底部详情中的吸顶标题上出现错误绘制遮挡，普通DOM坐标检查无法发现。逐项关闭标签、详情、模糊及吸顶样式后确认：仅去掉穴位卡片标题吸顶即可恢复所测点位的画面。标题改为普通布局，顶部“详情”按钮仍可随时收起。复测增加当前选中点附近实际画面像素检查；不通过延时截图掩盖问题。\n')
 t=Path('atlas26-publish/verified-tests/verify.cjs');s=t.read_text();needle="await shot('phone-point-details');"
 extra="""await shot('phone-point-details');
 const phoneImage=PNG.sync.read(await p.screenshot());let skinPixels=0,totalPointPixels=0;
 for(let dy=-6;dy<=6;dy++)for(let dx=-6;dx<=6;dx++){const x=Math.round(q.x)+dx,y=Math.round(q.y)+dy;if(x<0||y<0||x>=phoneImage.width||y>=phoneImage.height)continue;const i=(y*phoneImage.width+x)*4,R=phoneImage.data[i],G=phoneImage.data[i+1],B=phoneImage.data[i+2];if(R-G>8&&G-B>7&&R>120)skinPixels++;totalPointPixels++;}
 ck('Phone selected-point patch is rendered rather than covered by the pale band',totalPointPixels>100&&skinPixels/totalPointPixels>.4,{skinPixels,totalPointPixels,ratio:skinPixels/totalPointPixels,point:q});
"""
 assert needle in s;t.write_text(s.replace(needle,extra,1))
 b={'sourceCommit':os.environ['GITHUB_SHA'],'run':os.environ['GITHUB_RUN_ID'],'baseCSS':base,'files':{n:sha(p/n) for n in ['reading-v26.css','README.md','app.bundle.js']},'testSHA256':sha(t),'clinicalCalibration':False}
 (p/'phone-final-build.json').write_text(json.dumps(b,indent=2))
 print('Prepared exact CSS and phone point-pixel regression',b)
elif sys.argv[1]=='publish':
 roots={e:Path('/tmp/atlas26-final-'+e) for e in ['chromium','webkit']}
 builds={e:json.loads((r/'fullbody-tcm-v26/phone-final-build.json').read_text()) for e,r in roots.items()};b=builds['chromium'];assert b==builds['webkit']
 assert sha(p/'reading-v26.css')==b['baseCSS'],'Runtime changed since the visual candidate'
 assert sha(p/'app.bundle.js')==b['files']['app.bundle.js'],'Do not replace runtime JS'
 reports={}
 for e,r in roots.items():
  for n,digest in b['files'].items():assert sha(r/'fullbody-tcm-v26'/n)==digest
  t=r/'atlas26-publish/verified-tests/verify.cjs';assert sha(t)==b['testSHA256']
  report=json.loads((r/f'fullbody-tcm-v26/checks/local-{e}.json').read_text());assert report['success'] and not report['errors'] and not report.get('failure') and len(report['checks'])==35 and all(c['pass'] for c in report['checks'])
  reports[e]={'passed':35,'finishedAt':report['finishedAt'],'pointPaint':next(c['detail'] for c in report['checks'] if c['name'].startswith('Phone selected-point patch'))}
  for f in (r/'fullbody-tcm-v26/checks').glob('local-*'):shutil.copy2(f,p/'checks'/('final-'+f.name))
 for n in ['reading-v26.css','README.md','phone-final-build.json']:shutil.copy2(roots['chromium']/'fullbody-tcm-v26'/n,p/n)
 shutil.copy2(roots['chromium']/'atlas26-publish/verified-tests/verify.cjs','atlas26-publish/verified-tests/verify.cjs')
 f=p/'build-info.json';d=json.loads(f.read_text());d['sha256'].update({n:b['files'][n] for n in ['reading-v26.css','README.md']});d['phoneVisualRepair']=b;f.write_text(json.dumps(d,indent=2))
 f=p/'release.json';d=json.loads(f.read_text());d['phonePaintRepair']={'sourceCommit':b['sourceCommit'],'verificationRun':b['run'],'cssSHA256':b['files']['reading-v26.css'],'browserChecks':reports,'diagnosisRun':36846148792,'jsBundleUnchanged':True};f.write_text(json.dumps(d,ensure_ascii=False,indent=2))
 print(json.dumps(d['phonePaintRepair'],ensure_ascii=False,indent=2))
else:raise ValueError('prepare or publish required')
