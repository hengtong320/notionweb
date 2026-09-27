from pathlib import Path
p=Path('atlas17-delivery/verify.cjs')
s=p.read_text()
a="codes.includes(p.code)&&p.side==='right'"
assert a in s
s=s.replace(a,"codes.includes(p.code)&&(p.side==='right'||p.side==='midline')")
p.write_text(s)
print('Regression includes midline points, not only right-sided points')
