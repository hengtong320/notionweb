from pathlib import Path
p=Path('fullbody-tcm-v11')
f=p/'tissues-v4.js';s=f.read_text()
a="getCatalog:()=>[...entries.values()].map(n=>n.userData.atlas)"
assert a in s
s=s.replace(a,"getVisibleCatalog:()=>[...entries.values()].filter(n=>root.visible&&n.visible).map(n=>n.userData.atlas),"+a)
a="state.bonesOn=true;$('bonesOn').checked=true;setBoneOpacity(name==="
assert a in s
s=s.replace(a,"state.bonesOn=name==='vascular'||name.startsWith('ear-');$('bonesOn').checked=state.bonesOn;setBoneOpacity(name===")
f.write_text(s)
for name in ['index.template.html','index.html']:
 f=p/name;f.write_text(f.read_text().replace('V11 · 稳定修订','V11 · 器官与体表'))
f=Path('atlas-systems-11/verify.cjs');s=f.read_text()
a="window.__ATLAS_TISSUES__.getState().systems.visceral.visible<30"
assert a in s
s=s.replace(a,"window.__ATLAS_TISSUES__.getVisibleCatalog().filter(x=>x.system==='visceral').every(x=>['lung','airway'].includes(x.category)||/oesoph|esoph/i.test(x.en))")
f.write_text(s)
print('SEMANTIC_REVIEW_READY')
