from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v32';target=root/'fullbody-tcm-v33'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='32.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
shutil.copytree(base,target,dirs_exist_ok=True)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('32.0.0','33.0.0').replace('V32','V33'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v33','atlas33-tools/changes.patch'],cwd=root,check=True)
print('Prepared V33; V32 files verified and preserved.')
