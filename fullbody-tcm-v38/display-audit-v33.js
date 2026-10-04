import {vesselKind} from './vessel-kind-v34.js';
// Local acceptance tools only; never expose a debug control on the public site.
if (location.hostname === '127.0.0.1' && new URLSearchParams(location.search).has('audit')) {
 const nav=document.createElement('button');nav.textContent='检查镜头';nav.style.cssText='position:fixed;bottom:5px;left:230px;z-index:9999';document.body.append(nav);const navOut=document.createElement('pre');navOut.id='navigationAudit';navOut.hidden=true;document.body.append(navOut);nav.onclick=()=>{const e=window.__FOOT_ATLAS__.getState();navOut.textContent=JSON.stringify({camera:e.camera,target:e.target,mode:e.mode,navigation:window.__ATLAS_NAVIGATION__.getState(),body:window.__ATLAS_LEARNING__.getState().referenceBody,selected:window.__ATLAS_LEARNING__.getState().selectedPoint});};
 const button=document.createElement('button');button.textContent='检查显示状态';button.style.cssText='position:fixed;bottom:5px;left:5px;z-index:9999';document.body.append(button);
 const out=document.createElement('pre');out.id='displayAudit';out.hidden=true;out.style.cssText='position:fixed;inset:80px 10px 40px;background:white;z-index:10000;overflow:auto;font-size:11px';document.body.append(out);
 out.onclick=()=>{out.hidden=true};
 const sweep=document.createElement('button');sweep.textContent='逐穴检查';sweep.style.cssText='position:fixed;bottom:5px;left:120px;z-index:9999';document.body.append(sweep);
 const progress=document.createElement('pre');progress.id='pointSweep';progress.hidden=true;progress.style.cssText='position:fixed;right:5px;bottom:5px;max-height:100px;max-width:280px;overflow:auto;background:white;z-index:9999;font-size:10px';document.body.append(progress);
 sweep.onclick=async()=>{
  if(sweep.disabled)return;sweep.disabled=true;progress.hidden=false;
  const l=window.__ATLAS_LEARNING__,catalog=l.getNavigationCatalog(),rows=[],old=l.getState();
  l.setTCMSide('both');l.setMeridians(['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','GV','CV']);
  for(const p of catalog){
   l.selectPoint(p.code,p.side,true);
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
   l.flushLabels();
   const point=l.getPointScreen(p.code,p.side),selected=l.getState().selectedPoint,labels=l.getLabelPlacementAudit();
   const named=labels.find(q=>q.code===p.code&&q.side===p.side);
   rows.push({code:p.code,side:p.side,selectionMatches:selected?.code===p.code&&selected?.side===p.side,finite:point&&Object.values(point).every(Number.isFinite),screen:point,unoccluded:l.getSelectedVisibility(),named:!!named,label:named?.box});
   progress.textContent=JSON.stringify({running:true,body:l.getState().referenceBody,completed:rows.length,total:catalog.length,last:p.code});
  }
  const result={running:false,body:l.getState().referenceBody,viewport:[innerWidth,innerHeight],total:rows.length,selectionFailures:rows.filter(r=>!r.selectionMatches),nonfinite:rows.filter(r=>!r.finite),missingSelectedNames:rows.filter(r=>!r.named),rows};
  progress.textContent=JSON.stringify(result);progress.hidden=true;sweep.disabled=false;
  l.setMeridians(old.selectedMeridians);l.setTCMSide(old.tcmSide);if(old.selectedPoint)l.selectPoint(old.selectedPoint.code,old.selectedPoint.side,true);
 };
 button.onclick=()=>{
  const l=window.__ATLAS_LEARNING__,s=l.getState(),a=l.getSurfaceConsistencyAudit(),g=l.getDisplayAudit(),labels=l.getLabelPlacementAudit();
  const valid=a.points.every(p=>p.position.every(Number.isFinite)&&(!p.skinContact||p.skinContact.every(Number.isFinite)));
  const labelButtons=[...document.querySelectorAll('#acupointLabels button')].filter(b=>b.getBoundingClientRect().width).map(b=>({name:b.getAttribute('aria-label'),rect:b.getBoundingClientRect().toJSON()}));
  const engine=window.__FOOT_ATLAS__.getState();
  const visibleBlood={artery:0,vein:0,other:0};let visibleDepthMasks=0,ignoredNerveDepth=0;window.__ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh)return;for(let q=n;q;q=q.parent)if(!q.visible)return;const row=n.userData.atlas||n.userData.female;if(['vessels','vascular','heart'].includes(row?.system))visibleBlood[vesselKind(row)]++;if(n.userData.skinInkDepth)visibleDepthMasks++;if((n.userData.atlas?.system||n.userData.female?.system)==='nervous'&&n.material.depthTest===false)ignoredNerveDepth++;});
  const result={bindingDiagnostics:l.getSurfaceState().projectionDiagnostics,visibleBlood,vesselFilter:window.__ATLAS_SHARED__.getState().vesselFilter,visibleDepthMasks,ignoredNerveDepth,camera:engine.camera,target:engine.target,scene:window.__ATLAS_SHARED__.getState().scene,version:s.version,body:a.body,referenceBody:a.referenceBody,skinVisible:a.skinVisible,attached:a.surfaceAttached,busy:a.surfaceBusy,transition:a.transition,enabled:s.enabled,side:s.tcmSide,xray:s.xray,lines:s.linesOn,points:s.pointsOn,names:s.namesOn,visibilityProbe:a.visibilityProbe,selected:a.selected,count:g.count,valid,finite:g.geometryFinite,collisions:g.collisions,maxSecondaryShift:g.maxSecondaryShift,maxLineGap:g.maxLineGap,missingContacts:a.points.filter(p=>!p.skinContact).map(p=>p.code+'|'+p.side),largestGaps:g.points.filter(p=>p.lineGap>15).map(p=>({code:p.code,side:p.side,gap:p.lineGap,skinDistance:p.skinDistance})),ink:a.ink.map(({centers,...rest})=>rest),labels,labelButtons,pointsData:a.points};
  out.textContent=JSON.stringify(result,null,2);out.hidden=false;
 };
}
