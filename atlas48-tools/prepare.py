from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v47';target=root/'fullbody-tcm-v48'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='47.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='48.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('47.0.0','48.0.0').replace('V47','V48').replace('v47','v48'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v48','atlas48-tools/changes.patch'],cwd=root,check=True)
print('Prepared V48; V47 verified and preserved.')
