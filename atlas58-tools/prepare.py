from pathlib import Path
import hashlib, json, shutil, subprocess
root=Path(__file__).resolve().parent.parent
base=root/'fullbody-tcm-v57'; target=root/'fullbody-tcm-v58'
info=json.loads((base/'build-info.json').read_text())
assert info['version']=='57.0.0'
for name,digest in info['files'].items():
 assert hashlib.sha256((base/name).read_bytes()).hexdigest()==digest,name
if target.exists():
 current=json.loads((target/'build-info.json').read_text())
 assert current['version']=='58.0.0'
 for name,digest in current['files'].items():
  assert hashlib.sha256((target/name).read_bytes()).hexdigest()==digest,name
 shutil.rmtree(target)
shutil.copytree(base,target)
for p in target.rglob('*'):
 if p.is_file() and p.suffix in ['.js','.css','.html','.md'] and 'bundle' not in p.name:
  p.write_text(p.read_text().replace('57.0.0','58.0.0').replace('V57','V58').replace('v57','v58').replace('atlas57','atlas58'))
subprocess.run(['git','apply','--directory=fullbody-tcm-v58','atlas58-tools/changes.patch'],cwd=root,check=True)
print('Prepared V58 from hash-verified V57; existing source assets preserved.')
