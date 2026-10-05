from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v48';target=root/'fullbody-tcm-v49'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='48.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version'] in ['49.0.0','49.0.1']
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('48.0.0','49.0.1').replace('V48','V49').replace('v48','v49'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v49','atlas49-tools/changes.patch'],cwd=root,check=True)
print('Prepared V49; V48 verified and preserved.')
