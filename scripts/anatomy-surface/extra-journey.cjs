// Runs inside the existing real-browser journey, sharing page/ck/settle/snap.
await page.setViewportSize({width:1440,height:1000});
await page.evaluate(()=>{document.body.classList.remove('nav-open','detail-open');__ATLAS_SHARED__.showSection('meridians');__ATLAS_LEARNING__.clearStudyContext(true);__ATLAS_LEARNING__.setMeridians(['HT','PC']);__ATLAS_LEARNING__.fitMeridian([0,0,1]);});
await settle();
const femaleGeometry=await page.evaluate(()=>JSON.stringify(__ATLAS_LEARNING__.getRouteGeometry()));
await xray(true);await xray(false);
ck('Female xray leaves complete route geometry unchanged',await page.evaluate(old=>JSON.stringify(__ATLAS_LEARNING__.getRouteGeometry())===old,femaleGeometry));
for(const style of ['smooth','dashed','tube']){
 await page.evaluate(style=>{const e=document.querySelector('#curveStyle');e.value=style;e.dispatchEvent(new Event('change',{bubbles:true}));},style);await settle();
 ck('Female '+style+' route stays visible with normal depth',await page.evaluate(style=>{const s=__ATLAS_LEARNING__.getState();return s.curveStyle===style&&!s.xray&&!s.suspended&&s.routeDiagnostics.length===4&&s.routeDiagnostics.every(r=>r.visible);},style));
}
const ALL=['LU','LI','ST','SP','HT','SI','BL','KI','PC','TE','GB','LR','GV','CV'];
await page.evaluate(ids=>{__ATLAS_LEARNING__.setMeridians(ids);__ATLAS_LEARNING__.fitMeridian([0,0,1]);},ALL);await settle();
let da=await page.evaluate(()=>__ATLAS_LEARNING__.getDisplayAudit());
report.femaleDisplayAudit={count:da.count,attached:da.attached,geometryFinite:da.geometryFinite,maxSecondaryShift:da.maxSecondaryShift,maxLineGap:da.maxLineGap,collisions:da.collisions};
ck('All female projected point and curve geometries are finite',da.count===670&&da.attached&&da.geometryFinite&&da.maxSecondaryShift<1e-6,report.femaleDisplayAudit);
await snap('female-all-front');await page.evaluate(()=>__ATLAS_LEARNING__.fitMeridian([0,0,-1]));await settle();await snap('female-all-back');
// Turning skin off and on must not leave an opaque shell over unbound points.
for(const sex of ['female','male']){
 await page.evaluate(sex=>__ATLAS_SHARED__.switchSex(sex),sex);await settle();
 await page.evaluate(()=>{__ATLAS_SHARED__.showSection('layers');document.querySelector('#customLayers').open=true;});
 await page.locator('#sharedLayer-surface').uncheck();await settle();await page.locator('#sharedLayer-surface').check();await settle();
 ck(sex+' custom skin re-enable restores correct body binding',await page.evaluate(sex=>{const s=__ATLAS_LEARNING__.getState();return s.referenceBody===sex&&s.surfaceAttached&&!s.surfaceBusy&&!s.suspended&&!s.xray;},sex));
 ck(sex+' obsolete separate binding checkbox is not displayed',!(await page.locator('#surfaceAttach').isVisible()));
 await page.evaluate(()=>document.querySelector('#saveLayerCombo').click());
 await page.locator('#sharedLayer-surface').uncheck();await settle();
 await page.evaluate(()=>document.querySelector('#restoreLayerCombo').click());await settle();
 ck(sex+' saved skin combination restores attachment',await page.evaluate(sex=>{const s=__ATLAS_LEARNING__.getState();return s.referenceBody===sex&&s.surfaceAttached&&!s.surfaceBusy;},sex));
}
await page.evaluate(()=>__ATLAS_LEARNING__.setMeridians(['HT','PC']));
await page.evaluate(async()=>{await Promise.all(['female','male','female','male','female'].map(sex=>__ATLAS_SHARED__.switchSex(sex)));});await settle();
ck('Rapid gender switches finish on the last requested body',await page.evaluate(()=>{const s=__ATLAS_LEARNING__.getState();return __ATLAS_FEMALE__.active&&s.referenceBody==='female'&&s.surfaceAttached&&!s.surfaceBusy&&!s.suspended&&s.selectedMeridians.join(',')==='HT,PC';}));
await page.evaluate(()=>__ATLAS_LEARNING__.setTCMSide('left'));await settle();
ck('Female left-side filter is retained by the shared controls',await page.evaluate(()=>{const s=__ATLAS_LEARNING__.getState();return s.tcmSide==='left'&&s.visiblePoints===18;}));
await page.evaluate(()=>__ATLAS_SHARED__.switchSex('male'));await settle();
ck('Sex switch preserves left-side meridian filter',await page.evaluate(()=>__ATLAS_LEARNING__.getState().tcmSide==='left'&&__ATLAS_LEARNING__.getState().visiblePoints===18));
await page.evaluate(ids=>{__ATLAS_LEARNING__.setTCMSide('both');__ATLAS_LEARNING__.setMeridians(ids);__ATLAS_LEARNING__.fitMeridian([0,0,1]);},ALL);await settle();
da=await page.evaluate(()=>__ATLAS_LEARNING__.getDisplayAudit());report.maleDisplayAudit={count:da.count,attached:da.attached,geometryFinite:da.geometryFinite,maxSecondaryShift:da.maxSecondaryShift,maxLineGap:da.maxLineGap,collisions:da.collisions};
ck('All male projected point and curve geometries are finite',da.count===670&&da.attached&&da.geometryFinite&&da.maxSecondaryShift<1e-6,report.maleDisplayAudit);
await snap('male-all-front');await page.evaluate(()=>__ATLAS_LEARNING__.fitMeridian([0,0,-1]));await settle();await snap('male-all-back');
// Coordinates are checked in the same view before/after transparency changes.
await page.evaluate(()=>{__ATLAS_LEARNING__.setMeridians(['HT','PC']);__ATLAS_LEARNING__.fitMeridian([0,0,1]);});await settle();
const beforeOpacity=await page.evaluate(()=>JSON.stringify(__ATLAS_LEARNING__.getNavigationCatalog()));
await page.evaluate(()=>{const e=document.querySelector('#sharedOpacity-surface');e.value=35;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();
await page.evaluate(()=>{const e=document.querySelector('#sharedOpacity-surface');e.value=100;e.dispatchEvent(new Event('input',{bubbles:true}));});await settle();
ck('Skin opacity does not shift projected coordinates',await page.evaluate(old=>old===JSON.stringify(__ATLAS_LEARNING__.getNavigationCatalog()),beforeOpacity));
audit=await skinAudit(['PC6','HT7']);ck('After all switches opaque male skin still leaves front points visible',audit.points.length===2&&audit.points.every(x=>x.occlusion!==null&&x.occlusion<.2),audit);
report.checkedRouteModes=['tube','smooth','dashed'];report.expandedRegression=true;
