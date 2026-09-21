const fs=require('fs'),path=require('path');
const source=process.env.ATLAS_SOURCE;if(!source)throw Error('ATLAS_SOURCE missing');
const factory=require(path.join(source,'draco_decoder.cjs'));
(async()=>{
const mod=await factory({});
const src=fs.readFileSync(path.join(source,'z-anatomy-skeleton.glb'));
const jn=src.readUInt32LE(12),doc=JSON.parse(src.subarray(20,20+jn)),off=20+jn;
let data=Buffer.from(src.subarray(off+8,off+8+src.readUInt32LE(off)));
const isFoot=n=>n.endsWith('.r.001')&&/Talus|Calcaneus|Navicular bone|Cuboid bone|cuneiform bone|metatarsal bone|phalanx.*finger of foot|Sesamoid bones of foot/i.test(n);
const selected=new Set(doc.nodes.filter(n=>isFoot(n.name||'')).map(n=>n.mesh));
function append(typed,type,componentType){const pad=(4-data.length%4)%4;if(pad)data=Buffer.concat([data,Buffer.alloc(pad)]);const byteOffset=data.length,b=Buffer.from(typed.buffer,typed.byteOffset,typed.byteLength);data=Buffer.concat([data,b]);const v=doc.bufferViews.length;doc.bufferViews.push({buffer:0,byteOffset,byteLength:b.length});const a=doc.accessors.length;doc.accessors.push({bufferView:v,componentType,count:typed.length/(type==='VEC3'?3:1),type});return a;}
let count=0;
for(const mi of selected){for(const p of doc.meshes[mi].primitives){
 const ex=p.extensions.KHR_draco_mesh_compression,v=doc.bufferViews[ex.bufferView],b=data.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength);
 const decoder=new mod.Decoder(),buffer=new mod.DecoderBuffer(),mesh=new mod.Mesh();buffer.Init(new Int8Array(b),b.length);const result=decoder.DecodeBufferToMesh(buffer,mesh);if(!result.ok())throw Error(result.error_msg());
 for(const [semantic,unique]of Object.entries(ex.attributes)){const a=decoder.GetAttributeByUniqueId(mesh,unique),arr=new mod.DracoFloat32Array();decoder.GetAttributeFloatForAllPoints(mesh,a,arr);const values=new Float32Array(arr.size());for(let i=0;i<values.length;i++)values[i]=arr.GetValue(i);const ai=append(values,a.num_components()===3?'VEC3':'SCALAR',5126);p.attributes[semantic]=ai;if(semantic==='POSITION'){const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<values.length;i++){min[i%3]=Math.min(min[i%3],values[i]);max[i%3]=Math.max(max[i%3],values[i]);}doc.accessors[ai].min=min;doc.accessors[ai].max=max;}mod.destroy(arr);}
 const indices=new Uint32Array(mesh.num_faces()*3),face=new mod.DracoInt32Array();for(let i=0;i<mesh.num_faces();i++){decoder.GetFaceFromMesh(mesh,i,face);for(let k=0;k<3;k++)indices[i*3+k]=face.GetValue(k);}p.indices=append(indices,'SCALAR',5125);delete p.extensions;console.log(doc.meshes[mi].name,mesh.num_points(),'vertices',mesh.num_faces(),'faces');count++;mod.destroy(face);mod.destroy(mesh);mod.destroy(buffer);mod.destroy(decoder);
}}
for(const n of doc.nodes)if(n.mesh!==undefined&&!selected.has(n.mesh))delete n.mesh;
delete doc.extensionsRequired;delete doc.extensionsUsed;doc.buffers=[{byteLength:data.length}];
let js=Buffer.from(JSON.stringify(doc));js=Buffer.concat([js,Buffer.alloc((4-js.length%4)%4,32)]);data=Buffer.concat([data,Buffer.alloc((4-data.length%4)%4)]);
const out=Buffer.alloc(12+8+js.length+8+data.length);out.writeUInt32LE(0x46546c67,0);out.writeUInt32LE(2,4);out.writeUInt32LE(out.length,8);out.writeUInt32LE(js.length,12);out.writeUInt32LE(0x4e4f534a,16);js.copy(out,20);out.writeUInt32LE(data.length,20+js.length);out.writeUInt32LE(0x004e4942,24+js.length);data.copy(out,28+js.length);
fs.writeFileSync(path.join(source,'skeleton-decoded.glb'),out);console.log('decoded',count);
})().catch(e=>{console.error(e);process.exit(1);});
