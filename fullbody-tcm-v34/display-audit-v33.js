import {vesselKind} from './vessel-kind-v34.js';
// Local acceptance tools only; never expose a debug control on the public site.
if (location.hostname === '127.0.0.1' && new URLSearchParams(location.search).has('audit')) {
 const button=document.createElement('button');button.textContent='检查显示状态';button.style.cssText='position:fixed;bottom:5px;left:5px;z-index:9999';document.body.append(button);
 const out=document.createElement('pre');out.id='displayAudit';out.hidden=true;out.style.cssText='position:fixed;inset:80px 10px 40px;background:white;z-index:10000;overflow:auto;font-size:11px';document.body.append(out);
 out.onclick=()=>{out.hidden=true};
 button.onclick=()=>{
  const l=window.__ATLAS_LEARNING__,s=l.getState(),a=l.getSurfaceConsistencyAudit(),g=l.getDisplayAudit(),labels=l.getLabelPlacementAudit();
  const valid=a.points.every(p=>p.position.every(Number.isFinite)&&(!p.skinContact||p.skinContact.every(Number.isFinite)));
  const labelButtons=[...document.querySelectorAll('#acupointLabels button')].filter(b=>b.getBoundingClientRect().width).map(b=>({name:b.getAttribute('aria-label'),rect:b.getBoundingClientRect().toJSON()}));
  const engine=window.__FOOT_ATLAS__.getState();
  const visibleBlood={artery:0,vein:0,other:0};let visibleDepthMasks=0,ignoredNerveDepth=0;window.__ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh)return;for(let q=n;q;q=q.parent)if(!q.visible)return;const row=n.userData.atlas||n.userData.female;if(['vessels','vascular','heart'].includes(row?.system))visibleBlood[vesselKind(row)]++;if(n.userData.skinInkDepth)visibleDepthMasks++;if((n.userData.atlas?.system||n.userData.female?.system)==='nervous'&&n.material.depthTest===false)ignoredNerveDepth++;});
  const result={visibleBlood,vesselFilter:window.__ATLAS_SHARED__.getState().vesselFilter,visibleDepthMasks,ignoredNerveDepth,camera:engine.camera,target:engine.target,scene:window.__ATLAS_SHARED__.getState().scene,version:s.version,body:a.body,referenceBody:a.referenceBody,skinVisible:a.skinVisible,attached:a.surfaceAttached,busy:a.surfaceBusy,transition:a.transition,enabled:s.enabled,side:s.tcmSide,xray:s.xray,lines:s.linesOn,points:s.pointsOn,names:s.namesOn,selected:a.selected,count:g.count,valid,finite:g.geometryFinite,collisions:g.collisions,maxSecondaryShift:g.maxSecondaryShift,maxLineGap:g.maxLineGap,missingContacts:a.points.filter(p=>!p.skinContact).map(p=>p.code+'|'+p.side),largestGaps:g.points.filter(p=>p.lineGap>15).map(p=>({code:p.code,side:p.side,gap:p.lineGap,skinDistance:p.skinDistance})),ink:a.ink.map(({centers,...rest})=>rest),labels,labelButtons,pointsData:a.points};
  out.textContent=JSON.stringify(result,null,2);out.hidden=false;
 };
}
