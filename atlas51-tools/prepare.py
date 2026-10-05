from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v50';target=root/'fullbody-tcm-v51'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='50.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='51.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('50.0.0','51.0.0').replace('V50','V51').replace('v50','v51').replace('fullbody-tcm-v49','fullbody-tcm-v50'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v51','atlas51-tools/changes.patch'],cwd=root,check=True)
print('Prepared V51; V50 verified and preserved.')
