from pathlib import Path
import hashlib,json,shutil,subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v55';target=root/'fullbody-tcm-v56'
manifest=json.loads((base/'build-info.json').read_text())
assert manifest['version']=='55.0.0'
for name,digest in manifest['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 existing=json.loads((target/'build-info.json').read_text())
 assert existing['version']=='56.0.0'
 for name,digest in existing['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.iterdir():
 if p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('55.0.0','56.0.0').replace('V55','V56').replace('v55','v56').replace('atlas55','atlas56'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v56','atlas56-tools/changes.patch'],cwd=root,check=True)
for name,digest in json.loads((root/'atlas56-tools/reviewed-source-files.json').read_text()).items():
 assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
print('Prepared V56; V55 verified and preserved; reviewed sources match.')
