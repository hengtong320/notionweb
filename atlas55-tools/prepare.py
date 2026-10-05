from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v54';target=root/'fullbody-tcm-v55'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='54.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='55.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('54.0.0','55.0.0').replace('V54','V55').replace('v54','v55').replace('atlas54','atlas55').replace('fullbody-tcm-v53','fullbody-tcm-v54'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v55','atlas55-tools/changes.patch'],cwd=root,check=True)
for name,digest in json.loads((root/'atlas55-tools/reviewed-source-files.json').read_text()).items():
 assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
print('Prepared V55; V54 verified and preserved; reviewed sources match.')
