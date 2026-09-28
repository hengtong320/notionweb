const fs=require('fs'),path=require('path'),{PNG}=require('pngjs'),pw=require('playwright');
const engine=process.env.BROWSER||'chromium',out=path.resolve('fullbody-tcm-v19/checks');fs.mkdirSync(out,{recursive:true});
const report={version:'19.0.0',stage:'public-smoke',engine,checks:[],errors:[],pixelChecks:[],startedAt:new Date().toISOString(),clinicalCalibration:false};
function ck(name,pass,detail){report.checks.push({name,pass:!!pass,detail});if(!pass)throw Error(name);}
function difference(a,b){const x=PNG.sync.read(a),y=PNG.sync.read(b);let n=0;for(let i=0;i<x.data.length;i+=4)if(Math.abs(x.data[i]-y.data[i])+Math.abs(x.data[i+1]-y.data[i+1])+Math.abs(x.data[i+2]-y.data[i+2])>70)n++;return n;}
(async()=>{let browser,p;try{browser=await pw[engine].launch({headless:true,...(engine==='chromium'?{args:['--no-sandbox','--enable-unsafe-swiftshader']}: {})});p=await browser.newPage({viewport:{width:1440,height:1000}});p.setDefaultTimeout(90000);await p.addInitScript(()=>localStorage.setItem('atlas-auto-speak','0'));p.on('pageerror',e=>report.errors.push(e.message));
 const r=await p.goto('https://hengtong320.github.io/notionweb/anatomy/?v=19.0.0');ck('Public entrance HTTP200',r.status()===200);await p.waitForFunction(()=>window.__ATLAS_SHARED__&&__FOOT_ATLAS__.getState().ready);ck('Fixed entrance opens V19',p.url().includes('/fullbody-tcm-v19/'));
 async function settle(){await p.waitForFunction(()=>!__ATLAS_SHARED__.getState().busy&&!__ATLAS_LEARNING__.getSurfaceState().busy&&!__FOOT_ATLAS__.getState().cameraAnimating);await p.waitForTimeout(400);}
 const snap=name=>p.screenshot({path:out+'/live-'+engine+'-'+name+'.png'});
 const skin=()=>p.evaluate(()=>{const list=[];__ATLAS_RENDER_AUDIT__.scene.traverse(n=>{if(!n.isMesh||(n.userData.atlas?.system!=='surface'&&n.userData.female?.system!=='surface'))return;for(let q=n;q;q=q.parent)if(!q.visible)return;list.push({opacity:n.material.opacity,depth:n.material.depthWrite,transparent:n.material.transparent});});return list;});
 await p.locator('#layersTab').click();await p.locator('[data-system-view="surface"]').click();await settle();
 for(const sex of ['male','female']){
  if(sex==='female'){await p.locator('[data-body-sex="female"]').click();await settle();}
  await p.evaluate(()=>{__ATLAS_LEARNING__.clearStudyContext(true);__ATLAS_LEARNING__.setMeridians(['HT','PC','ST','CV']);__ATLAS_LEARNING__.fitMeridian([0,0,1]);const s=__ATLAS_LEARNING__.getState();if(s.namesOn)document.querySelector('#pointNamesToggle').click();});await settle();
  const sk=await skin();ck(sex+' public skin is fully opaque',sk.length>0&&sk.every(s=>s.opacity===1&&s.depth&&!s.transparent));
  ck(sex+' public ink uses normal skin-depth rendering',await p.evaluate(()=>{const a=__ATLAS_LEARNING__.getInkAudit();return a.active&&a.depthTest&&a.routes.every(r=>r.visible&&r.surfaceTriangles>0)&&!__ATLAS_LEARNING__.getState().xray;}));
  await p.evaluate(()=>{document.querySelector('#meridianLineToggle').click();document.querySelector('#acupointToggle').click();});await settle();const blank=await p.locator('#viewport canvas').first().screenshot();
  await p.evaluate(()=>{document.querySelector('#meridianLineToggle').click();});await settle();const line=await p.locator('#viewport canvas').first().screenshot();
  await p.evaluate(()=>{document.querySelector('#meridianLineToggle').click();document.querySelector('#acupointToggle').click();});await settle();const points=await p.locator('#viewport canvas').first().screenshot();
  const linePixels=difference(blank,line),pointPixels=difference(blank,points);report.pixelChecks.push({sex,linePixels,pointPixels});ck(sex+' lines and points are visibly drawn on the public skin',linePixels>350&&pointPixels>150,{linePixels,pointPixels});
  await p.evaluate(()=>document.querySelector('#meridianLineToggle').click());await settle();await snap(sex+'-opaque-skin');
 }
 await p.locator('[data-profile="bones"]').click();await settle();await p.locator('#labelsBtn').click();await settle();ck('Female bones and names are visible',await p.evaluate(()=>__ATLAS_FEMALE__.getState().systems.skeletal.visible>0)&&await p.locator('#femaleStructureLabels button:visible').count()>0);await snap('female-bones-labels');
 await p.locator('[data-body-sex="male"]').click();await settle();ck('Male skeleton is not obscured after switching',await p.evaluate(()=>__FOOT_ATLAS__.getState().visible===210)&&!(await skin()).length);ck('Male text labels return without female leftovers',await p.locator('#labels .bone-label:visible').count()>0&&await p.locator('#femaleStructureLabels button:visible').count()===0);await snap('male-bones-labels');
 await p.locator('[data-profile="nerves"]').click();await settle();ck('Male nerve layer visible',await p.evaluate(()=>__ATLAS_TISSUES__.getState().systems.nervous.visible>0));
 await p.locator('[data-body-sex="female"]').click();await settle();ck('Female nerve layer visible after switching',await p.evaluate(()=>__ATLAS_SHARED__.getState().scene==='nerves'&&__ATLAS_FEMALE__.getState().systems.nervous.visible>0));
 await p.locator('[data-system-view="surface"]').click();await settle();const sk=await skin();ck('Returning to female skin restores opacity and pigment',sk.length>0&&sk.every(s=>s.opacity===1)&&await p.evaluate(()=>__ATLAS_LEARNING__.getInkAudit().active));
 ck('No uncaught errors on the public site',report.errors.length===0,report.errors);report.success=true;
}catch(e){report.success=false;report.failure=String(e);process.exitCode=1;if(p)await snapFailure(p).catch(()=>{});}finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(out+'/live-'+engine+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser?.close();}})();
async function snapFailure(p){await p.screenshot({path:out+'/live-'+engine+'-failure.png'});}
