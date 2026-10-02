const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),THREE=require('three');
const compiled=path.join('/tmp','atlas29-picking-'+process.env.BROWSER+'.cjs');
require('esbuild').buildSync({entryPoints:['atlas29-repair/opaque-skin.js'],outfile:compiled,bundle:true,format:'cjs',platform:'node'});
const {findOpaqueSkinHit}=require(compiled),checks=[];
function run(name,setup,expected){const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.set(0,0,10);camera.lookAt(0,0,0);camera.updateProjectionMatrix();const skin=new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));skin.userData.atlas={system:'surface'};scene.add(skin);const bone=new THREE.Mesh(new THREE.SphereGeometry(.6,12,8),new THREE.MeshBasicMaterial());bone.position.z=-2;bone.userData.home=bone.position.clone();scene.add(bone);const ctx={scene,camera,THREE,viewport:{getBoundingClientRect:()=>({left:0,top:0,width:200,height:200})}};setup({skin,bone,scene,ctx});const blocked=!!findOpaqueSkinHit(ctx,{clientX:100,clientY:100});checks.push({name,pass:blocked===expected});assert.equal(blocked,expected,name);}
run('Opaque male skin blocks rear anatomy',()=>{},true);
run('Opaque female skin blocks rear anatomy',({skin})=>{delete skin.userData.atlas;skin.userData.female={system:'surface'};},true);
run('A foreground moved bone is not blocked by skin behind it',({bone})=>{bone.position.z=2;},false);
run('Transparent skin permits ordinary anatomy picking',({skin})=>{skin.material.opacity=.5;skin.material.transparent=true;},false);
run('Invisible skin does not block picking',({skin})=>{skin.visible=false;},false);
run('Hidden parent is respected',({skin,scene})=>{scene.remove(skin);const group=new THREE.Group();group.visible=false;group.add(skin);scene.add(group);},false);
run('Invisible material is respected',({skin})=>{skin.material.visible=false;},false);
run('Non-color-writing material is not visible skin',({skin})=>{skin.material.colorWrite=false;},false);
run('Clipped-away skin is not a blocker',({skin})=>{skin.material.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,0,1),-1)];},false);
run('A clipped foreground bone does not bypass opaque skin',({bone})=>{bone.position.z=2;bone.material.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,0,1),-4)];},true);
run('Pigment helper geometry is not an internal structure',({scene})=>{const ink=new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.MeshBasicMaterial({side:THREE.DoubleSide}));ink.position.z=3;ink.userData.skinInk=true;ink.userData.atlas={system:'surface'};scene.add(ink);},true);
run('Zero-sized viewport is safe',({ctx})=>{ctx.viewport.getBoundingClientRect=()=>({left:0,top:0,width:0,height:0});},false);
const dir='fullbody-tcm-v29/checks';fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'local-'+(process.env.BROWSER||'node')+'-picking-unit.json'),JSON.stringify({success:true,checks,geometry:'Synthetic planes and spheres; distinct from browser/model checks'},null,2));console.log('Opaque picking boundary checks passed:',checks.length);
