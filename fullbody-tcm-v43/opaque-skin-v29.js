/** Block only anatomy behind opaque skin, after visible meridian hit testing.
 * A bone moved in front of skin must remain selectable. Respect hierarchy,
 * material visibility, ray-facing sides and actual clipping planes.
 */
export function findOpaqueSkinHit({THREE,scene,camera,viewport},event){
 const rect=viewport.getBoundingClientRect();if(!rect.width||!rect.height)return null;
 const meshes=[],skins=new Set();scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
 scene.traverse(n=>{
  if(!n.isMesh||n.userData.skinInk)return;
  for(let q=n;q;q=q.parent)if(!q.visible)return;
  const skin=n.userData.atlas?.system==='surface'||n.userData.female?.system==='surface';
  if(!skin&&!n.userData.atlas&&!n.userData.female&&!n.userData.home)return;
  const materials=Array.isArray(n.material)?n.material:[n.material];
  if(!materials.some(m=>m&&m.visible!==false&&m.colorWrite!==false&&m.opacity>=(skin?.98:.18)))return;
  meshes.push(n);if(skin)skins.add(n);
 });
 if(!skins.size)return null;
 const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(2*(event.clientX-rect.left)/rect.width-1,1-2*(event.clientY-rect.top)/rect.height),camera);
 for(const hit of ray.intersectObjects(meshes,false)){
  const source=hit.object.material,m=Array.isArray(source)?source[hit.face?.materialIndex||0]:source,isSkin=skins.has(hit.object);
  if(!m||m.visible===false||m.opacity<(isSkin?.98:.18)||m.colorWrite===false)continue;
  const planes=m.clippingPlanes||[],clipped=planes.length&&(m.clipIntersection?planes.every(p=>p.distanceToPoint(hit.point)<0):planes.some(p=>p.distanceToPoint(hit.point)<0));
  if(clipped)continue;
  return isSkin?hit:null;
 }
 return null;
}
