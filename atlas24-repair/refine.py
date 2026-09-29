from pathlib import Path
p=Path('fullbody-tcm-v24')
def edit(name,old,new):
 f=p/name;s=f.read_text();assert old in s,(name,old[:100]);f.write_text(s.replace(old,new,1))
# The male regional skin has neighboring inner/outer shells ~3 units apart.
# Euclidean nearest-point projection can land on the inner one. Keep the
# continuous interpolated outward normal and select the local outer envelope.
edit('skin-v17.js',"function projectNear(v,aim){const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,.35),normal};}","""function projectNear(v,aim){let h=bvh.closestPointToPoint(v);if(!h)return null;const d=aim.clone().normalize();const outer=bvh.raycastFirst(new THREE.Ray(h.point.clone().addScaledVector(d,12),d.clone().negate()),THREE.DoubleSide);if(outer&&outer.point.distanceTo(h.point)<8)h=outer;const normal=faceNormal(h,d);return {point:h.point.clone().addScaledVector(normal,.35),normal};}""")
edit('skin-v17.js',"const nearest=(v,aim)=>{const h=bvh.closestPointToPoint(v);if(!h)return null;const normal=faceNormal(h,aim);return {point:h.point.clone().addScaledVector(normal,.35),normal};};","const nearest=projectNear;")
f=p/'skin-ink-v24.js';s=f.read_text()
a=s.index(' const vertices=[],ids=');b=s.index(' const material=new THREE.ShaderMaterial',a)
s=s[:a]+r'''
 const vertices=[],ranges=[],references=[];let subdivided=0,maxCandidates=0;
 function emit(a,b,c,list,depth=0){
  if(list.length>32){
   const tri=new ExtendedTriangle(a,b,c);tri.needsUpdate=true;list=list.filter(i=>tri.closestPointToSegment(primitives[i].line)<=primitives[i].radius);
   if(!list.length)return;
   if(list.length>32&&depth<3){subdivided++;const ab=a.clone().lerp(b,.5),bc=b.clone().lerp(c,.5),ca=c.clone().lerp(a,.5);emit(a,ab,ca,list,depth+1);emit(ab,b,bc,list,depth+1);emit(ca,bc,c,list,depth+1);emit(ab,bc,ca,list,depth+1);return;}
  }
  // Variable-length per-face lists retain all nearby primitives. Subdivision
  // bounds shader work without silently dropping dense points or curve spans.
  maxCandidates=Math.max(maxCandidates,list.length);const offset=references.length;references.push(...list);
  for(const v of [a,b,c]){vertices.push(v.x,v.y,v.z);ranges.push(offset,list.length);}
 }
 for(const f of faces.values())emit(f.a,f.b,f.c,f.ids);
 function textureFrom(values,width=256){const height=Math.max(1,Math.ceil(values.length/(width*4))),data=new Float32Array(width*height*4);data.set(values);const tex=new THREE.DataTexture(data,width,height,THREE.RGBAFormat,THREE.FloatType);tex.minFilter=THREE.NearestFilter;tex.magFilter=THREE.NearestFilter;tex.generateMipmaps=false;tex.needsUpdate=true;return {tex,size:new THREE.Vector2(width,height)};}
 const primitiveData=textureFrom(primitives.flatMap(p=>[...p.a.toArray(),p.kind,...p.b.toArray(),p.along]));
 const referenceData=textureFrom(references.flatMap(i=>[i,0,0,0]));
 const texture=primitiveData.tex;
 const meshGeometry=new THREE.BufferGeometry();meshGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));meshGeometry.setAttribute('inkRange',new THREE.Float32BufferAttribute(ranges,2));meshGeometry.computeBoundingSphere();
''' +s[b:]
s=s.replace("inkSize:{value:new THREE.Vector2(width,height)},lineScale:{value:1}","inkSize:{value:primitiveData.size},inkRefs:{value:referenceData.tex},refSize:{value:referenceData.size},lineScale:{value:1}")
s=s.replace('attribute vec4 inkIds0;attribute vec4 inkIds1;attribute vec4 inkIds2;attribute vec4 inkIds3;','attribute vec2 inkRange;')
s=s.replace('varying vec4 vIds0;varying vec4 vIds1;varying vec4 vIds2;varying vec4 vIds3;','varying vec2 vRange;')
s=s.replace('vIds0=inkIds0;vIds1=inkIds1;vIds2=inkIds2;vIds3=inkIds3;','vRange=inkRange;')
s=s.replace('uniform vec2 inkSize;','uniform vec2 inkSize;uniform sampler2D inkRefs;uniform vec2 refSize;')
s=s.replace('for(int k=0;k<16;k++){','for(int k=0;k<${Math.max(1,maxCandidates)};k++){')
s=s.replace('float id=k<4?vIds0[k]:k<8?vIds1[k-4]:k<12?vIds2[k-8]:vIds3[k-12];if(id<-.5)continue;', 'if(float(k)>=vRange.y)break;float ri=vRange.x+float(k);float id=texture2D(inkRefs,vec2(mod(ri,refSize.x)+.5,floor(ri/refSize.x)+.5)/refSize).x;')
s=s.replace('candidateOverflow:overflow','candidateOverflow:0')
s=s.replace('texture.dispose();','texture.dispose();referenceData.tex.dispose();')
f.write_text(s)
# Keep diagnostics small while retaining actionable location and cost data.
f=Path('atlas24-repair/verify.cjs');s=f.read_text();s=s.replace('d.ink.routes.filter(r=>r.candidateOverflow)',"d.ink.routes.filter(r=>r.candidateOverflow).map(({meridian,side,candidateOverflow})=>({meridian,side,candidateOverflow}))");f.write_text(s)
f=p/'README.md';s=f.read_text().replace('渲染间距由2.4缩为0.35模型单位，','男性内外体表区域之间增加局部外层选择，防止平滑后的采样落到内壳而断续。渲染间距由2.4缩为0.35模型单位，');f.write_text(s)
print('Local outer skin envelope and nontruncating pigment union ready')
