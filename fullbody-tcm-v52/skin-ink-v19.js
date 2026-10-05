import * as THREE from 'three';
// Pigment uses the real skin triangles: never turn depth testing off.
export function createSkinInk(geometry,bvh,guides,points,color){
 const vertices=[],starts=[],ends=[],kinds=[],travel=[];
 const box=new THREE.Box3(),normal=new THREE.Vector3(),closest=new THREE.Vector3();
 let triangles=0,segments=0;const centers=[];
 function surface(v){const h=bvh.closestPointToPoint(v);if(!h)return null;const idx=geometry.index,p=geometry.attributes.position,i=h.faceIndex*3;
  const a=new THREE.Vector3().fromBufferAttribute(p,idx.getX(i)),b=new THREE.Vector3().fromBufferAttribute(p,idx.getX(i+1)),c=new THREE.Vector3().fromBufferAttribute(p,idx.getX(i+2));
  const n=b.sub(a).cross(c.sub(a)).normalize();const toward=v.clone().sub(h.point);if(n.dot(toward)<0)n.negate();return{point:h.point.clone(),normal:n};
 }
 function patch(a,b,aim,kind,lengthBefore){
  const padding=kind?10:8;box.makeEmpty().expandByPoint(a).expandByPoint(b).expandByScalar(padding);
  const segment=new THREE.Line3(a,b),mid=a.clone().lerp(b,.5);
  bvh.shapecast({intersectsBounds:b=>b.intersectsBox(box),intersectsTriangle:tri=>{
   tri.getNormal(normal);if(normal.dot(aim)<.08)return false;
   tri.closestPointToPoint(mid,closest);segment.closestPointToPoint(closest,true,normal);
   if(closest.distanceTo(normal)>padding)return false;
   for(const p of [tri.a,tri.b,tri.c]){vertices.push(p.x,p.y,p.z);starts.push(a.x,a.y,a.z);ends.push(b.x,b.y,b.z);kinds.push(kind);travel.push(lengthBefore);}
   triangles++;return false;
  }});
 }
 for(const g of guides){let along=0;const values=g.value||g,ps=values.points||[];let last=null;
  for(let i=0;i<ps.length;i++){const h=surface(ps[i]);if(!h){last=null;continue;}if(last&&(!values.connections||values.connections[i])){
   const aim=last.normal.clone().add(h.normal);if(aim.lengthSq()<.01)aim.copy(last.normal);aim.normalize();patch(last.point,h.point,aim,0,along);along+=last.point.distanceTo(h.point);segments++;}last=h;
  }
 }
 for(const p of points){const h=surface(p.point||p.position);if(!h)continue;centers.push({code:p.code,position:h.point.toArray()});patch(h.point,h.point,h.normal,1,0);}
 const meshGeometry=new THREE.BufferGeometry();
 meshGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));meshGeometry.setAttribute('inkStart',new THREE.Float32BufferAttribute(starts,3));meshGeometry.setAttribute('inkEnd',new THREE.Float32BufferAttribute(ends,3));meshGeometry.setAttribute('inkKind',new THREE.Float32BufferAttribute(kinds,1));meshGeometry.setAttribute('inkTravel',new THREE.Float32BufferAttribute(travel,1));meshGeometry.computeBoundingSphere();
 const material=new THREE.ShaderMaterial({
  uniforms:{tint:{value:new THREE.Color(color)},linesOn:{value:1},pointsOn:{value:1},dashed:{value:0},physicalSide:{value:0},midline:{value:99.55318156}},
  vertexShader:`attribute vec3 inkStart;attribute vec3 inkEnd;attribute float inkKind;attribute float inkTravel;
   varying vec3 vInkWorld;varying vec3 vInkStart;varying vec3 vInkEnd;varying float vInkKind;varying float vInkTravel;
   #include <clipping_planes_pars_vertex>
   void main(){vInkWorld=position;vInkStart=inkStart;vInkEnd=inkEnd;vInkKind=inkKind;vInkTravel=inkTravel;
    vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;
    #include <clipping_planes_vertex>
   }`,
  fragmentShader:`uniform vec3 tint;uniform float linesOn;uniform float pointsOn;uniform float dashed;uniform float physicalSide;uniform float midline;
   varying vec3 vInkWorld;varying vec3 vInkStart;varying vec3 vInkEnd;varying float vInkKind;varying float vInkTravel;
   #include <clipping_planes_pars_fragment>
   void main(){
    #include <clipping_planes_fragment>
    if((vInkKind<.5&&linesOn<.5)||(vInkKind>.5&&pointsOn<.5))discard;
    if(physicalSide!=0. && (vInkWorld.x-midline)*physicalSide<-.3)discard;
    vec3 ab=vInkEnd-vInkStart;float t=clamp(dot(vInkWorld-vInkStart,ab)/max(dot(ab,ab),.00001),0.,1.);
    float d=length(vInkWorld-(vInkStart+t*ab));float pixel=max(length(vec2(dFdx(d),dFdy(d))),.015);
    float radius=vInkKind>.5?clamp(max(2.1,pixel*2.6),2.1,8.):clamp(max(1.05,pixel*1.45),1.05,6.);
    if(dashed>.5&&vInkKind<.5&&mod(vInkTravel+t*length(ab),16.)>10.)discard;
    float aa=max(.08,pixel*.65);float coverage=1.-smoothstep(radius-aa,radius+aa,d);if(coverage<.02)discard;
    gl_FragColor=vec4(tint,coverage);
    #include <colorspace_fragment>
   }`,
  transparent:true,depthTest:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,side:THREE.DoubleSide,toneMapped:false,clipping:true
 });
 const mesh=new THREE.Mesh(meshGeometry,material);mesh.name='Skin pigment: actual surface triangles';mesh.renderOrder=41;mesh.userData.skinInk=true;
 return {mesh,centers,stats:{surfaceTriangles:triangles,drawnSegments:segments,points:centers.length,method:'skin-triangle pigment, normal depth test',clinicalCalibration:false},dispose(){meshGeometry.dispose();material.dispose();}};
}
