import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as T from 'three';
import {loadSkin} from './fixture.mjs';
import {createGuidePaths} from '../fullbody-tcm-v58/route-guides-v6.js';
import {createSkinProjector as before} from '../fullbody-tcm-v57/skin-v17.js';
import {createSkinProjector as after} from '../fullbody-tcm-v58/skin-v17.js';
const refs=JSON.parse(fs.readFileSync('atlas58-tools/source-points.json','utf8'));
const male=await loadSkin('male'),rows=[];
for(const sex of ['male','female']){
 const ns=sex==='male'?male:await loadSkin(sex),old=before(ns,{sex,templateMeshes:male,standardized:sex==='female'}),next=after(ns,{sex,templateMeshes:male,standardized:sex==='female'});
 const keys=[...new Set(refs.filter(p=>/^(LU|LI|ST|SP|HT|SI|BL|KI|PC|TE|GB|LR|GV|CV)\d+$/.test(p.code)).map(p=>p.code.replace(/\d+$/,'')+'|'+p.side))];
 for(const key of keys){
  const [meridian,side]=key.split('|'),ps=refs.filter(p=>p.side===side&&p.code.replace(/\d+$/,'')===meridian).map(p=>({...p,ordinal:Number(p.code.slice(meridian.length)),position:new T.Vector3(...p.sourcePosition)})).sort((a,b)=>a.ordinal-b.ordinal);
  const anchors=projector=>ps.map(p=>({...p,source:p.position.clone(),point:projector.project(p.position,.35,{...p,meridian})}));
  const oa=anchors(old),na=anchors(next);assert.deepEqual(na.map(a=>a.point.toArray()),oa.map(a=>a.point.toArray()),sex+' '+key+' point contacts changed');
  for(const [branch,path]of createGuidePaths(T,null,meridian,side,ps).entries()){
   const context={meridian,side,codes:path.codes};const a=old.curve(path.points,{...context,anchors:oa.filter(a=>path.codes.includes(a.code))}),b=next.curve(path.points,{...context,anchors:na.filter(a=>path.codes.includes(a.code))});
   assert(b.traceDiagnostics.disconnectedTransitions<=a.traceDiagnostics.disconnectedTransitions,sex+' '+key+' new disconnect');
   const used=na.filter(a=>path.codes.includes(a.code));const maxAnchorGap=Math.max(0,...used.map(a=>Math.min(...b.points.map(p=>p.distanceTo(a.point)))));assert(maxAnchorGap<1e-6,sex+' '+key+' anchor lost');
   assert(b.points.every(p=>p.toArray().every(Number.isFinite)),sex+' '+key+' invalid route');
   const length=g=>g.points.reduce((sum,p,i)=>sum+(i&&g.connections[i]?p.distanceTo(g.points[i-1]):0),0);
   rows.push({sex,meridian,side,branch,anchors:used.length,maxAnchorGap,before:{length:length(a),...a.traceDiagnostics},after:{length:length(b),...b.traceDiagnostics}});
  }
 }
 old.dispose();next.dispose();console.log('Checked '+sex+' routes');
}
const report={version:'58.0.0',scope:'All currently mapped fourteen-channel branches, both anatomical sides and sexes; exact retained point contacts; no new disconnected transitions',clinicalCalibration:false,rows};
fs.writeFileSync('atlas58-tools/route-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({rows:rows.length,points:rows.reduce((s,r)=>s+r.anchors,0),beforeBreaks:rows.reduce((s,r)=>s+r.before.disconnectedTransitions,0),afterBreaks:rows.reduce((s,r)=>s+r.after.disconnectedTransitions,0),maxAnchorGap:Math.max(...rows.map(r=>r.maxAnchorGap))}));
