import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ACUPOINTS,MERIDIANS} from '../fullbody-tcm-v33/acupoints-data.js';
import {POINT_TERMS,evidenceData,canonicalPoint} from '../fullbody-tcm-v33/catalog-v10.js';
const expected={LU:11,LI:20,ST:45,SP:21,HT:9,SI:19,BL:67,KI:27,PC:9,TE:23,GB:44,LR:14,GV:28,CV:24};
assert.equal(ACUPOINTS.length,361);assert.equal(new Set(ACUPOINTS.map(p=>p.code)).size,361);
for(const [m,n]of Object.entries(expected)){
 const rows=ACUPOINTS.filter(p=>p.meridian===m);assert.equal(rows.length,n,m);
 for(let i=1;i<=n;i++)assert.ok(rows.some(p=>p.code===m+i),m+i);
}
for(const p of ACUPOINTS){const t=canonicalPoint(p);assert.equal(t.name,evidenceData.points[p.code].name);assert.equal(t.pinyin,evidenceData.points[p.code].pinyin);assert.ok(t.name&&t.pinyin,p.code);assert.ok(!/[()（）\u3400-\u9fff\uf900-\ufaff]/.test(t.pinyin),p.code);}
const registry=JSON.parse(fs.readFileSync(new URL('../fullbody-tcm-v33/point-registration-v18.json',import.meta.url)));
assert.equal(Object.keys(registry.points).length,361);assert.equal(registry.clinicalVerifiedCount,0);
assert.ok(Object.values(registry.points).every(p=>p.position?.length===3&&p.position.every(Number.isFinite)&&p.clinicalVerified===false));
console.log('Data checks: 361 unique codes, 14 complete channels, consistent names/pinyin, finite reference coordinates. Clinical verification remains 0.');

// A visible front patch blocks a rear contact; hiding/clipping that exact
// patch must reveal it, while hiding the target patch removes its label.
import * as THREE from 'three';
import {createSkinProjector} from '../fullbody-tcm-v33/skin-v17.js';
const back=new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial());
const front=new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial());front.position.z=20;
const projector=createSkinProjector([back,front]);
const contact=new THREE.Vector3(0,0,5),eye=new THREE.Vector3(0,0,50);
projector.syncOcclusion();assert.equal(projector.isVisible(contact,eye),false);
front.visible=false;projector.syncOcclusion();assert.equal(projector.isVisible(contact,eye),true);
front.visible=true;front.material.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,0,1),-26)];projector.syncOcclusion();assert.equal(projector.isVisible(contact,eye),true);
front.material.clippingPlanes=[];back.visible=false;projector.syncOcclusion();assert.equal(projector.isVisible(contact,eye),false);
back.visible=true;front.visible=false;back.material.opacity=.08;back.material.depthWrite=false;assert.equal(projector.syncOcclusion(),true);
const ink=projector.createInk([], [{code:'TEST',point:contact}], '#123456');
assert.ok(ink.mesh.geometry.attributes.skinOwner.array.every(v=>v===0));
assert.equal(ink.mesh.material.uniforms.skinVisibility.value.image.data[0],1);
assert.equal(ink.mesh.material.uniforms.skinVisibility.value.image.data[4],0);
back.visible=false;projector.syncOcclusion();assert.equal(ink.mesh.material.uniforms.skinVisibility.value.image.data[0],0);
ink.dispose();projector.dispose();back.geometry.dispose();front.geometry.dispose();
console.log('Surface checks: front/back occlusion, hidden/clipped patch visibility, live ink ownership and translucent depth mask.');
