"""Check public Pages bytes, with bounded deployment polling; never infer deployment."""
import urllib.request,time,hashlib,json,os
from pathlib import Path
base='https://hengtong320.github.io/notionweb/'
p=Path('fullbody-tcm-v29');build=json.loads((p/'build-info.json').read_text())
files=['index.html','app.bundle.js','reading-v26.css','meridian-ux-v26.css']
assert build['version']=='29.0.0'
for attempt in range(36):
 try:
  def get(name):
   request=urllib.request.Request(base+name+'?check='+str(time.time_ns()),headers={'Cache-Control':'no-cache'})
   with urllib.request.urlopen(request,timeout=20) as response:return response.read()
  entry=get('anatomy/').decode('utf-8');assert '../fullbody-tcm-v29/' in entry,'Fixed entrance not yet V29'
  seen={name:hashlib.sha256(get('fullbody-tcm-v29/'+name)).hexdigest() for name in files}
  for name,value in seen.items():assert value==build['files'][name],name+' digest does not match reviewed candidate'
  report={'success':True,'version':'29.0.0','sourceCommit':build['sourceCommit'],'files':seen,'fixedEntrance':base+'anatomy/','checkedAt':time.time(),'engine':os.environ.get('BROWSER')}
  (p/'checks'/('live-'+os.environ.get('BROWSER','unknown')+'-content.json')).write_text(json.dumps(report,indent=2))
  print(json.dumps(report,indent=2));break
 except Exception as e:
  print('Public deployment not confirmed:',str(e),flush=True)
  if attempt==35:raise
  time.sleep(10)
