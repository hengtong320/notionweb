import {poseStructureInfo} from './pose-names.js';
import {BONES} from './catalog-v10.js';
import {normalizeFemaleMesh} from './body-frame-v18.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// These are teaching-frame derivatives, NOT newly acquired female scans.
// Female pelvis/viscera/skin remain native HRA data. No source asset is rewritten.
export function createFemaleCompletion({THREE,bones,loader}){
 let manifest=null,native=null;const documents=new Map();
 const nativeSystems=new Set(['skeletal','muscular','nervous']);
 const pelvisParts={sacrum:['VH_F_sacrum'],coccyx:['VH_F_coccyx']};
 function canonicalBone(b){return {id:'shared21-'+b.id,sourceId:b.id,name:b.name,pinyin:b.pinyin||'',english:b.en||b.name,sourceName:b.en||b.id,side:b.side,system:'skeletal',ancestry:['shared-teaching','skeletal',b.group],group:b.group,origin:'shared-teaching',femaleSource:false,detail:false};}
 async function getCatalog(original){
  if(manifest)return manifest;native=original;
  const r=await fetch('../fullbody-tcm-v9/assets/tissue-catalog.json');if(!r.ok)throw Error('完整教学结构目录加载失败');const common=await r.json();const er=await fetch('../fullbody-tcm-v11/assets/new-catalog.json');if(!er.ok)throw Error('全身血管与耳部目录加载失败');const extra=(await er.json()).filter(r=>['vessels','ear'].includes(r.system));const maleOnly=/penis|penile|prostat|testic|spermatic|scrot|cremaster|睾丸|阴茎|前列腺|精索|提睾/i;const excluded=extra.filter(r=>maleOnly.test([r.name,r.en,r.sourceNode].join(' ')));const included=extra.filter(r=>!excluded.includes(r));
  const skeletal=BONES.map(canonicalBone);
  for(const row of skeletal){if(/hip/.test(row.sourceId)){const suffix=row.side==='left'?'L':'R';pelvisParts[row.sourceId]=['pubis','ilium','ischium'].map(p=>'VH_F_'+p+'_compact_bone_'+suffix);}if(pelvisParts[row.sourceId]){row.origin='female-native';row.femaleSource=true;row.nativeComponents=pelvisParts[row.sourceId];}}
  const tissueRows=[...common,...included].map(r=>({...r,id:'shared21-'+r.id,sourceId:r.id,english:r.en,sourceName:r.sourceNode||r.en,system:r.system||r.id.split('-')[0],ancestry:['shared-teaching',r.system||r.id.split('-')[0]],origin:'shared-teaching',femaleSource:false,detail:r.category==='fascia'}));
  const originalRows=original.entries.map(source=>{const r=poseStructureInfo(source);return {...r,origin:'female-native',nativeSystem:r.system,...(nativeSystems.has(r.system)?{system:'native-'+r.system,nativeDetail:true}: {})};});
  manifest={...original,entries:[...skeletal,...tissueRows,...originalRows],teachingCompletion:{source:'Z-Anatomy / BodyParts3D',nativeFemalePelvis:true,clinicalRegistration:false,excludedMaleOnlyVessels:excluded.map(r=>({id:r.id,name:r.name,en:r.en})),primaryBoneParts:skeletal.length,note:'完整教学参考与女性原生细节分开计数；网格部件数不是人体标准骨数。'}};
  return manifest;
 }
 async function documentFor(system){
  if(!documents.has(system)){let url;
   if(system.startsWith('native-'))url='../fullbody-tcm-v12/assets/female/'+system.slice(7)+'.glb';
   else url=(['vessels','ear'].includes(system)?'../fullbody-tcm-v11/assets/':'../fullbody-tcm-v9/assets/')+system+'.glb';
   documents.set(system,loader.loadAsync(url).catch(e=>{documents.delete(system);throw e;}));
  }return documents.get(system);
 }
 function baked(n,normalize=false){
  if(normalize)normalizeFemaleMesh(n,THREE);n.updateWorldMatrix(true,false);
  const g=n.geometry.clone().applyMatrix4(n.matrixWorld);
  if(n.matrixWorld.determinant()<0){const a=g.index;if(a){for(let i=0;i<a.count;i+=3){const t=a.getX(i+1);a.setX(i+1,a.getX(i+2));a.setX(i+2,t);}}else{for(const a of Object.values(g.attributes)){for(let i=0;i<a.count;i+=3)for(let j=0;j<a.itemSize;j++){const t=a.array[(i+1)*a.itemSize+j];a.array[(i+1)*a.itemSize+j]=a.array[(i+2)*a.itemSize+j];a.array[(i+2)*a.itemSize+j]=t;}}}}
  g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();return g;
 }
 async function load(system){
  if(!manifest)throw Error('完整结构目录尚未就绪');const rows=manifest.entries.filter(r=>r.system===system),nodes=[];
  if(system==='skeletal'){
   const nativeDoc=await documentFor('native-skeletal');nativeDoc.scene.updateMatrixWorld(true);const nativeMeshes=new Map();nativeDoc.scene.traverse(n=>{if(n.isMesh)nativeMeshes.set(n.name,n);});
   for(const r of rows){let g;
    if(r.nativeComponents){const pieces=r.nativeComponents.map(name=>{const info=native.entries.find(r=>r.sourceName===name);const n=info&&nativeMeshes.get(info.id);if(!n)throw Error('女性骨盆缺失源结构：'+name);const geo=baked(n,true).toNonIndexed();for(const k of Object.keys(geo.attributes))if(!['position','normal'].includes(k))geo.deleteAttribute(k);return geo;});g=pieces.length===1?pieces[0]:mergeGeometries(pieces,false);if(!g)throw Error('女性骨盆合并失败');if(pieces.length>1)pieces.forEach(p=>p.dispose());}
    else{const source=bones.get(r.sourceId);if(!source)throw Error('完整骨架缺失：'+r.sourceId);g=source.geometry.clone().translate(...source.userData.home.toArray());}
    const mesh=new THREE.Mesh(g);mesh.name=r.id;mesh.userData.female=r;mesh.userData.referenceOrigin=r.origin;nodes.push(mesh);
   }
  }else{
   const doc=await documentFor(system);doc.scene.updateMatrixWorld(true);
   const bySource=new Map(rows.map(r=>[r.sourceId||r.id,r]));doc.scene.traverse(n=>{if(!n.isMesh)return;const r=bySource.get(n.userData.atlas?.id||n.name);if(!r)return;const mesh=new THREE.Mesh(baked(n,system.startsWith('native-')));mesh.name=r.id;mesh.userData.female=r;mesh.userData.referenceOrigin=r.origin;nodes.push(mesh);});
  }
  if(nodes.length!==rows.length)throw Error(system+'结构未完整加载：'+nodes.length+'/'+rows.length);
  return nodes;
 }
 return {getCatalog,load,handles:id=>nativeSystems.has(id)||['vessels','ear'].includes(id)||id.startsWith('native-'),audit:()=>manifest?{...manifest.teachingCompletion,systems:Object.fromEntries(['skeletal','muscular','nervous','vessels','ear'].map(s=>[s,manifest.entries.filter(r=>r.system===s).length])),nativeDetails:manifest.entries.filter(r=>r.nativeDetail).length}:null};
}
