from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v36';target=root/'fullbody-tcm-v37'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='36.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='37.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('36.0.0','37.0.0').replace('V36','V37'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v37','atlas37-tools/changes.patch'],cwd=root,check=True)
print('Prepared V37; V36 verified and preserved.')
