from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v51';target=root/'fullbody-tcm-v52'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='51.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='52.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('51.0.0','52.0.0').replace('V51','V52').replace('v51','v52').replace('fullbody-tcm-v50','fullbody-tcm-v51'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v52','atlas52-tools/changes.patch'],cwd=root,check=True)
print('Prepared V52; V51 verified and preserved.')
