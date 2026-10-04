from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v41';target=root/'fullbody-tcm-v42'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='41.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='42.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('41.0.0','42.0.0').replace('V41','V42'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v42','atlas42-tools/changes.patch'],cwd=root,check=True)
print('Prepared V42; V41 verified and preserved.')
