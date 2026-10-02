/** Visible opaque skin consumes a blank-skin click, after meridian hit testing.
 * Do not remove skin from the picking ray and accidentally pick a hidden organ.
 * Respect actual hierarchy, material side, and material clipping planes.
 */
export function findOpaqueSkinHit({THREE,scene,camera,viewport},event){
 const rect=viewport.getBoundingClientRect();
 if(!rect.width||!rect.height)return null;
 const meshes=[];
 scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
 scene.traverse(n=>{
  if(!n.isMesh||(n.userData.atlas?.system!=='surface'&&n.userData.female?.system!=='surface'))return;
  for(let q=n;q;q=q.parent)if(!q.visible)return;
  const materials=Array.isArray(n.material)?n.material:[n.material];
  if(materials.some(m=>m&&m.visible!==false&&m.opacity>=.98&&m.colorWrite!==false))meshes.push(n);
 });
 if(!meshes.length)return null;
 const ray=new THREE.Raycaster();
 ray.setFromCamera(new THREE.Vector2(2*(event.clientX-rect.left)/rect.width-1,1-2*(event.clientY-rect.top)/rect.height),camera);
 for(const hit of ray.intersectObjects(meshes,false)){
  const source=hit.object.material,m=Array.isArray(source)?source[hit.face?.materialIndex||0]:source;
  if(!m||m.visible===false||m.opacity<.98||m.colorWrite===false)continue;
  const planes=m.clippingPlanes||[],clipped=planes.length&&(m.clipIntersection?planes.every(p=>p.distanceToPoint(hit.point)<0):planes.some(p=>p.distanceToPoint(hit.point)<0));
  if(!clipped)return hit;
 }
 return null;
}
