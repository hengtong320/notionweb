from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v52';target=root/'fullbody-tcm-v53'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='52.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='53.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('52.0.0','53.0.0').replace('V52','V53').replace('v52','v53').replace('fullbody-tcm-v51','fullbody-tcm-v52'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v53','atlas53-tools/changes.patch'],cwd=root,check=True)
print('Prepared V53; V52 verified and preserved.')
