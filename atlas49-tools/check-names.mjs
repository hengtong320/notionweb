import fs from 'node:fs';
import assert from 'node:assert/strict';
import {poseStructureInfo} from '../fullbody-tcm-v49/pose-names.js';
import {vesselKind} from '../fullbody-tcm-v49/vessel-kind-v34.js';
const rows=JSON.parse(fs.readFileSync('fullbody-tcm-v12/assets/female/catalog.json')).entries;
const systems=['respiratory','digestive','urinary','reproductive','breast','vascular'];
const selected=rows.filter(r=>systems.includes(r.system));
for(const r of selected){const copy=structuredClone(r),out=poseStructureInfo(r);assert.deepEqual(r,copy);assert.equal(out.sourceName,r.sourceName);assert.equal(out.ontology,r.ontology);assert.ok(!/[a-z]/i.test(out.name.replace(/部件 [A-Z]/g,'')),out.name);}
for(const [source,name,kind] of [['VH_F_superior_rectal_vein','直肠上静脉','vein'],['VH_F_inferior_mesenteric_vein','肠系膜下静脉','vein'],['VH_F_coronary_sinus','冠状窦','vein'],['VH_F_left_anterior_descending_artery','左冠状动脉前降支','artery'],['VH_F_pulmonary_vein_L_inf','左肺静脉 · 下支','vein'],['VH_F_left_uterine_vein','左子宫静脉','vein']]){const row=rows.find(r=>r.sourceName===source);assert.ok(row,source);const out=poseStructureInfo(row);assert.equal(out.name,name);assert.equal(vesselKind(out),kind);}
console.log(JSON.stringify({nativeStructureNames:selected.length,chineseDisplay:true,sourceMetadataUnchanged:true,conflictingVesselLabelsCorrected:true}));
