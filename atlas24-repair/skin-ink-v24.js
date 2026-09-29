import * as THREE from 'three';
import {ExtendedTriangle} from 'three-mesh-bvh';
// Each skin face is drawn once per meridian. Adjacent line segments contribute
// to one distance field instead of stacking alpha and forming dark fat joints.
export function createSkinInk(geometry,bvh,guides,points,color){
 const primitives=[],faces=new Map(),centers=[],normal=new THREE.Vector3(),box=new THREE.Box3();
 const idx=geometry.index,pos=geometry.attributes.position;
 const vertex=i=>new THREE.Vector3().fromBufferAttribute(pos,i);
 function surface(v){const h=bvh.closestPointToPoint(v);if(!h)return null;const i=h.faceIndex*3,a=vertex(idx.getX(i)),b=vertex(idx.getX(i+1)),c=vertex(idx.getX(i+2)),n=b.sub(a).cross(c.sub(a)).normalize();if(n.dot(v.clone().sub(h.point))<0)n.negate();return {point:h.point.clone(),normal:n,face:h.faceIndex};}
 function add(a,b,aim,kind,along){
  const id=primitives.length,radius=kind?6.8:3.8,line=new THREE.Line3(a.point,b.point);
  primitives.push({a:a.point.clone(),b:b.point.clone(),kind,along,radius,line});
  box.makeEmpty().expandByPoint(a.point).expandByPoint(b.point).expandByScalar(radius);
  bvh.shapecast({intersectsBounds:bounds=>bounds.intersectsBox(box),intersectsTriangle:(tri,face)=>{
   tri.getNormal(normal);if(normal.dot(aim)<.015)return false;
   if(tri.closestPointToSegment(line)>radius)return false;
   let entry=faces.get(face);if(!entry){entry={a:tri.a.clone(),b:tri.b.clone(),c:tri.c.clone(),ids:[]};faces.set(face,entry);}entry.ids.push(id);return false;
  }});
 }
 let segments=0;
 for(const g of guides){const values=g.value||g,ps=values.points||[];let last=null,along=0;
  for(let i=0;i<ps.length;i++){const h=surface(ps[i]);if(!h){last=null;continue;}if(last&&(!values.connections||values.connections[i])){const aim=last.normal.clone().add(h.normal);if(aim.lengthSq()<.01)aim.copy(last.normal);aim.normalize();add(last,h,aim,0,along);along+=last.point.distanceTo(h.point);segments++;}else along=0;last=h;}
 }
 for(const p of points){const h=surface(p.point||p.position);if(!h)continue;centers.push({code:p.code,position:h.point.toArray()});add(h,h,h.normal,1,0);}
 const vertices=[],ids=[[],[],[],[]],CAPACITY=16;let subdivided=0,overflow=0,maxCandidates=0;
 function emit(a,b,c,list,depth=0){
  if(list.length>CAPACITY){
   const tri=new ExtendedTriangle(a,b,c);tri.needsUpdate=true;list=list.filter(i=>tri.closestPointToSegment(primitives[i].line)<=primitives[i].radius);
   if(!list.length)return;
   if(list.length>CAPACITY&&depth<7){subdivided++;const ab=a.clone().lerp(b,.5),bc=b.clone().lerp(c,.5),ca=c.clone().lerp(a,.5);emit(a,ab,ca,list,depth+1);emit(ab,b,bc,list,depth+1);emit(ca,bc,c,list,depth+1);emit(ab,bc,ca,list,depth+1);return;}
   if(list.length>CAPACITY){overflow++;const m=a.clone().add(b).add(c).multiplyScalar(1/3),v=new THREE.Vector3();list.sort((i,j)=>primitives[i].line.closestPointToPoint(m,true,v).distanceToSquared(m)-primitives[j].line.closestPointToPoint(m,true,v).distanceToSquared(m));list=list.slice(0,CAPACITY);}
  }
  maxCandidates=Math.max(maxCandidates,list.length);const candidates=Array.from({length:CAPACITY},(_,i)=>list[i]??-1);
  for(const v of [a,b,c]){vertices.push(v.x,v.y,v.z);for(let j=0;j<4;j++)ids[j].push(...candidates.slice(j*4,j*4+4));}
 }
 for(const f of faces.values())emit(f.a,f.b,f.c,f.ids);
 const width=256,height=Math.max(1,Math.ceil(primitives.length*2/width)),data=new Float32Array(width*height*4);
 primitives.forEach((p,i)=>data.set([...p.a.toArray(),p.kind,...p.b.toArray(),p.along],i*8));
 const texture=new THREE.DataTexture(data,width,height,THREE.RGBAFormat,THREE.FloatType);texture.minFilter=THREE.NearestFilter;texture.magFilter=THREE.NearestFilter;texture.generateMipmaps=false;texture.needsUpdate=true;
 const meshGeometry=new THREE.BufferGeometry();meshGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));ids.forEach((list,j)=>meshGeometry.setAttribute('inkIds'+j,new THREE.Float32BufferAttribute(list,4)));meshGeometry.computeBoundingSphere();
 const material=new THREE.ShaderMaterial({uniforms:{tint:{value:new THREE.Color(color)},linesOn:{value:1},pointsOn:{value:1},dashed:{value:0},physicalSide:{value:0},midline:{value:99.55318156},inkData:{value:texture},inkSize:{value:new THREE.Vector2(width,height)},lineScale:{value:1}},
  vertexShader:`attribute vec4 inkIds0;attribute vec4 inkIds1;attribute vec4 inkIds2;attribute vec4 inkIds3;
   varying vec4 vIds0;varying vec4 vIds1;varying vec4 vIds2;varying vec4 vIds3;varying vec3 vInkWorld;
   #include <clipping_planes_pars_vertex>
   void main(){vInkWorld=position;vIds0=inkIds0;vIds1=inkIds1;vIds2=inkIds2;vIds3=inkIds3;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;
    #include <clipping_planes_vertex>
   }`,
  fragmentShader:`uniform vec3 tint;uniform float linesOn;uniform float pointsOn;uniform float dashed;uniform float physicalSide;uniform float midline;uniform float lineScale;uniform sampler2D inkData;uniform vec2 inkSize;
   varying vec4 vIds0;varying vec4 vIds1;varying vec4 vIds2;varying vec4 vIds3;varying vec3 vInkWorld;
   #include <clipping_planes_pars_fragment>
   vec4 datum(float i){return texture2D(inkData,vec2(mod(i,inkSize.x)+.5,floor(i/inkSize.x)+.5)/inkSize);}
   void main(){
    #include <clipping_planes_fragment>
    if(physicalSide!=0.&&(vInkWorld.x-midline)*physicalSide<-.3)discard;
    float unitPixel=max(max(length(dFdx(vInkWorld)),length(dFdy(vInkWorld))),.015);
    float lineRadius=clamp(max(.5,unitPixel*.85),.5,3.)*lineScale;
    float pointRadius=clamp(max(1.2,unitPixel*2.),1.2,6.);
    float lineDistance=1.e5,pointDistance=1.e5;
    for(int k=0;k<16;k++){
     float id=k<4?vIds0[k]:k<8?vIds1[k-4]:k<12?vIds2[k-8]:vIds3[k-12];if(id<-.5)continue;
     vec4 a=datum(id*2.),b=datum(id*2.+1.);vec3 ab=b.xyz-a.xyz;float t=clamp(dot(vInkWorld-a.xyz,ab)/max(dot(ab,ab),.000001),0.,1.);float d=length(vInkWorld-(a.xyz+t*ab));
     if(a.w>.5){if(pointsOn>.5)pointDistance=min(pointDistance,d);}
     else if(linesOn>.5){if(dashed>.5&&mod(b.w+t*length(ab),16.)>10.)continue;lineDistance=min(lineDistance,d);}
    }
    float aa=clamp(unitPixel*.65,.06,.9),lineAlpha=1.-smoothstep(lineRadius-aa,lineRadius+aa,lineDistance),pointAlpha=1.-smoothstep(pointRadius-aa,pointRadius+aa,pointDistance);
    vec3 paint=tint;float alpha=max(lineAlpha,pointAlpha);
    if(pointAlpha>.01){float ring=smoothstep(pointRadius*.34-aa*.4,pointRadius*.55,pointDistance)*(1.-smoothstep(pointRadius*.80,pointRadius,pointDistance));paint=mix(tint,vec3(.98,.99,.97),ring);}
    if(alpha<.02)discard;gl_FragColor=vec4(paint,alpha);
    #include <colorspace_fragment>
   }`,transparent:true,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,side:THREE.DoubleSide,toneMapped:false,clipping:true});
 const mesh=new THREE.Mesh(meshGeometry,material);mesh.name='Skin pigment: single-pass surface union';mesh.renderOrder=41;mesh.userData.skinInk=true;
 return {mesh,centers,stats:{surfaceTriangles:vertices.length/9,sourceFaces:faces.size,drawnSegments:segments,points:centers.length,subdivided,maxCandidates,candidateOverflow:overflow,uniqueFacePainting:true,method:'single-pass skin distance-field union',clinicalCalibration:false},dispose(){meshGeometry.dispose();material.dispose();texture.dispose();}};
}
