from pathlib import Path

root = Path('fullbody-tcm-v19')
css = root / 'shared-v14.css'
css.write_text(css.read_text(encoding='utf-8') + '''
body[data-shared-ui].female-view #labelsBtn {
  display: inline-flex !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
''', encoding='utf-8')

# The source skin contains 125 negatively scaled meshes. Baking a reflection
# into positions without reversing triangle order inverts their normals.
# Reverse only the temporary projection copy, never the source meshes.
f = root / 'skin-v17.js'
s = f.read_text(encoding='utf-8')
old = 'p.applyMatrix4(n.matrixWorld);g.dispose();return p;'
assert old in s
s = s.replace(old, '''p.applyMatrix4(n.matrixWorld);
 if(n.matrixWorld.determinant()<0){const a=p.attributes.position.array;for(let i=0;i<a.length;i+=9){for(let k=0;k<3;k++){const t=a[i+3+k];a[i+3+k]=a[i+6+k];a[i+6+k]=t;}}p.attributes.position.needsUpdate=true;}
 g.dispose();return p;''')
f.write_text(s, encoding='utf-8')

# Every preset sets explicit opacities rather than retaining a previous view.
f = root / 'female-v12.js'
s = f.read_text(encoding='utf-8')
s = s.replace("compare:['surface','skeletal','nervous']", "compare:['skeletal','nervous','muscular']")
old = 'await Promise.all(cfg.map(k=>enable(k,true)));if(!active||token!==serial)return false;'
assert old in s
s = s.replace(old, old+"for(const k of cfg)systems.get(k).opacity=1;if(id==='compare'){systems.get('muscular').opacity=.27;systems.get('skeletal').opacity=.65;}")
s = s.replace("else{if(systems.get('surface'))systems.get('surface').opacity=1;if(systems.get('skeletal'))systems.get('skeletal').opacity=1;}", "else if(id!=='compare'){if(systems.get('surface'))systems.get('surface').opacity=1;if(systems.get('skeletal'))systems.get('skeletal').opacity=1;}")
f.write_text(s, encoding='utf-8')

f = root / 'shared-v14.js'
s = f.read_text(encoding='utf-8')
old = "else if(key==='pelvis')window.__FOOT_ATLAS__.setRegion('pelvis');"
assert old in s
s = s.replace(old, "else if(key==='pelvis'){await tissues.setProfile('bones');window.__FOOT_ATLAS__.setRegion('pelvis');}")
f.write_text(s, encoding='utf-8')
print('Reflected surfaces and explicit preset state repaired; original geometry and calibration status preserved.')
