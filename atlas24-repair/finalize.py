from pathlib import Path
p=Path('fullbody-tcm-v24/learning-enhancements.js')
s=p.read_text()
a="labels.hidden=!(enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&precisionMode==='illustrative');"
b="labels.hidden=!(enabled&&!suspended&&!surfaceBusy&&referenceBody===(state.bodySex||'male')&&pointsOn&&namesOn&&precisionMode==='illustrative');"
assert a in s
p.write_text(s.replace(a,b,1))
print('Point label master switch is respected after selecting and rotating')
