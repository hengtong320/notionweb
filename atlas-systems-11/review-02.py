from pathlib import Path
p=Path('fullbody-tcm-v11')
f=p/'surface-v11.js';s=f.read_text();assert 'project(v,offset=2.1)' in s
s=s.replace('project(v,offset=2.1)','project(v,offset=3.8)').replace('project(v,2.1)','project(v,3.8)').replace('),2.1)', '),3.8)').replace('count,1.35,10,false','count,1.9,12,false')
f.write_text(s)
f=p/'learning-enhancements.js';s=f.read_text()
s=s.replace('surfaceProjector.project(p.sourcePosition,2.4)','surfaceProjector.project(p.sourcePosition,4.1)')
a='g.tube.material.opacity=xray?.82:.97;';assert a in s
s=s.replace(a,"g.tube.material.opacity=surfaceAttached?1:xray?.82:.97;g.tube.material.color.set(r.color);if(surfaceAttached)g.tube.material.color.multiplyScalar(.68);g.tube.material.emissive.set(surfaceAttached?r.color:'#000000');g.tube.material.emissiveIntensity=surfaceAttached?.13:0;")
a='r.cloud.material.uniforms.pixelSize.value=selectedMeridians.size>3?8:12;';assert a in s
s=s.replace(a,'r.cloud.material.uniforms.pixelSize.value=surfaceAttached?8:selectedMeridians.size>3?8:12;')
f.write_text(s)
f=Path('atlas-systems-11/compile.cjs');s=f.read_text().replace("info.visualRevision='11.0.1'","info.visualRevision='11.0.2'");f.write_text(s)
print('SURFACE_LEGIBILITY_READY')
