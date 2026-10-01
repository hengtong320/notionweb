"""Retarget the existing suites while preserving their behavioural assertions."""
from pathlib import Path
p=Path('atlas28-repair')
s=Path('atlas27-repair/verify.cjs').read_text()
s=s.replace('fullbody-tcm-v27/checks','fullbody-tcm-v28/checks').replace("version:'27.0.0'","version:'28.0.0'").replace("v==='27'","v==='28'").replace("start('27')","start('28')")
s=s.replace("prefix=(live?'live-':'local-')+engine", "prefix='observation-'+(live?'live-':'local-')+engine")
(p/'observation.cjs').write_text(s)
s=Path('atlas27-repair/prior.cjs').read_text()
s=s.replace('fullbody-tcm-v27/checks','fullbody-tcm-v28/checks').replace("version:'27.0.0'","version:'28.0.0'").replace("v==='27'","v==='28'").replace("start('27')","start('28')")
s=s.replace("await shot('v26-'+sex+'-forearm')","await shot('v28-'+sex+'-forearm')")
# Two V26 assertions expected every displayed contact to remain at the old
# position. That contract intentionally changes in V28: wrong-side skin
# contacts are corrected. Record these changes instead of claiming they did
# not happen. The new surface suite independently verifies all 670 current
# point-to-route bindings for each body. All other 33 assertions are retained.
a="ck(sex+' all 670 display anchors preserved',pts.length===670&&shift<1e-7,{count:pts.length,maxShift:shift});"
assert s.count(a)==1
b="report.projectionChanges??={};report.projectionChanges[sex]={count:pts.length,maxShift:shift,points:pts.flatMap(q=>{const o=old.find(x=>x.code===q.code&&x.side===q.side);const distance=o?Math.hypot(...q.position.map((v,i)=>v-o.position[i])):Infinity;return distance>1e-6?[{code:q.code,side:q.side,before:o?.position,after:q.position,distance}]:[];})};"
s=s.replace(a,b)
(p/'prior.cjs').write_text(s)
print('Prepared 28 observation checks and 33 retained reading checks; changed contacts recorded separately')
