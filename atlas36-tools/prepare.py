from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v35';target=root/'fullbody-tcm-v36'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='35.0.1'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='36.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('35.0.1','36.0.0').replace('V35','V36'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v36','atlas36-tools/changes.patch'],cwd=root,check=True)
print('Prepared V36; V35 files verified and preserved.')
