const {chromium,webkit}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const base=path.resolve('.'),root=path.join(base,'fullbody-tcm-v14'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const type=process.env.BROWSER||'chromium',online=!!process.env.TEST_URL;
const report={version:'14.0.0',browser:type,online,startedAt:new Date().toISOString(),checks:[],errors:[],success:false};
const ck=(name,pass,detail)=>{report.checks.push({name,pass:!!pass,...detail===undefined?{}:{detail}});if(!pass)throw Error(name+': '+JSON.stringify(detail));};
let server,browser;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function settle(p){await p.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function snap(p,name){await settle(p);await p.screenshot({path:path.join(out,type+'-'+name+'.png')});}
const cam=p=>p.evaluate(()=>window.__FOOT_ATLAS__.captureCamera());
function delta(a,b){return Math.max(...['position','target','up'].flatMap(k=>a[k].map((n,i)=>Math.abs(n-b[k][i]))));}
(async()=>{try{
 if(!online){server=http.createServer((req,res)=>{let url=new URL(req.url,'http://localhost');let p=path.join(base,decodeURIComponent(url.pathname));if(!p.startsWith(base+path.sep))return res.end();if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');if(!fs.existsSync(p)){res.statusCode=404;return res.end('missing');}const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg'};res.setHeader('Content-Type',mime[path.extname(p)]||'application/octet-stream');fs.createReadStream(p).pipe(res);});await new Promise(r=>server.listen(0,'127.0.0.1',r));}
 const url=process.env.TEST_URL||'http://127.0.0.1:'+server.address().port+'/fullbody-tcm-v14/';report.url=url;
 browser=await (type==='webkit'?webkit:chromium).launch({headless:true,...type==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}: {}});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});const p=await ctx.newPage();p.setDefaultTimeout(45000);p.on('pageerror',e=>report.errors.push(String(e)));await p.addInitScript(()=>{localStorage.setItem('atlas-auto-speak','0');});
 const response=await p.goto(url,{waitUntil:'load',timeout:90000});ck('Public/local page returns HTTP 200',response.status()===200);
 await p.waitForFunction(()=>window.__ATLAS_SHARED__?.getState().version==='14.0.0');await p.evaluate(()=>window.__ATLAS_SHARED__.ready);await settle(p);
 ck('All 210 existing bones remain loaded',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().count===210));
 ck('Read-only mode gate actually removed',await p.locator('#v9Strict,#v9Diagram').count()===0);
 ck('Single shared directory and search',await p.locator('#structureLibrary').count()===1&&await p.locator('#structureSearch').count()===1);
 await p.evaluate(()=>window.savedSharedNodes={directory:document.getElementById('structureLibrary'),search:document.getElementById('structureSearch'),layers:document.getElementById('sharedLayerRows'),tcm:document.getElementById('tcmControls')});
 await p.locator('#structureSearch').fill('胸骨');ck('Male structure directory searches real bones',await p.locator('#structureResults [data-structure-id="sternum"]').count()===1);
 await p.locator('#structureResults [data-structure-id="sternum"]').click();await settle(p);ck('Actual directory click selects sternum',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().selected==='sternum'));
 await p.locator('#structureSearch').fill('心');await p.locator('#structureSystem').selectOption('vascular');await snap(p,'male-directory');
 await p.locator('#layersTab').click();await p.locator('[data-system-view="chest"]').click();await p.waitForFunction(()=>window.__ATLAS_TISSUES__.getState().systems.visceral.loaded);await settle(p);
 await p.locator('#customLayers summary').click();const nodes=await p.locator('#sharedLayerRows>section').count();const checked=await p.locator('#sharedLayer-vascular').isChecked();ck('Common layer rows work on male',nodes===9&&checked);
 await p.locator('#sharedOpacity-vascular').evaluate(e=>{e.value='44';e.dispatchEvent(new Event('input',{bubbles:true}));});ck('Male common opacity changes real material state',await p.evaluate(()=>Math.abs(window.__ATLAS_TISSUES__.getState().systems.heart.opacity-.44)<.001));
 await snap(p,'male-layers');
 const before=await cam(p);await p.locator('[data-body-sex="female"]').click();await p.waitForFunction(()=>window.__ATLAS_FEMALE__.active&&!window.__ATLAS_FEMALE__.getState().sexBusy&&!window.__ATLAS_SHARED__.getState().busy);await settle(p);
 ck('Shared DOM instances survive male-to-female switch',await p.evaluate(()=>Object.entries(savedSharedNodes).every(([key,node])=>node===document.getElementById({directory:'structureLibrary',search:'structureSearch',layers:'sharedLayerRows',tcm:'tcmControls'}[key]))));
 ck('Current layers tab preserved',await p.locator('#layersTab').getAttribute('aria-selected')==='true');ck('Expanded custom controls remain open',await p.locator('#customLayers').evaluate(e=>e.open));
 ck('Female has the same nine layer rows',await p.locator('#sharedLayerRows>section').count()===nodes);ck('Search and filter values survive switching',await p.locator('#structureSearch').inputValue()==='心'&&await p.locator('#structureSystem').inputValue()==='vascular');
 ck('Female common opacity remains available',await p.locator('#sharedOpacity-vascular').isVisible());await p.locator('#sharedOpacity-vascular').evaluate(e=>{e.value='36';e.dispatchEvent(new Event('input',{bubbles:true}));});ck('Female common opacity changes real source materials',await p.evaluate(()=>Math.abs(window.__ATLAS_FEMALE__.getState().systems.vascular.opacity-.36)<.001));
 await snap(p,'female-layers');await p.locator('#boneTab').click();ck('Same directory renderer searches female structures',await p.locator('#structureResults button').count()>0);await snap(p,'female-directory');
 await p.locator('#structureSystem').selectOption('all');await p.locator('#structureSearch').fill('子宫');const id=await p.evaluate(()=>window.__ATLAS_FEMALE__.getCatalog().find(r=>r.name==='子宫')?.id||window.__ATLAS_FEMALE__.getCatalog().find(r=>r.name.includes('子宫'))?.id);ck('Female uterus is a source entry',!!id);
 await p.locator('[data-structure-id="'+id+'"]').click();await settle(p);ck('Same directory actual click selects female uterus',await p.evaluate(id=>window.__ATLAS_FEMALE__.getState().selected===id,id));
 ck('Female selected detail uses common detail scroll',await p.locator('.detail-scroll #femaleDetail h2').count()===1&&await p.locator('#femaleDetail').isVisible());
 await p.locator('#tcmTab').click();ck('Female has shared usable meridian catalog',await p.locator('#acupointSearch').isVisible()&&await p.locator('#meridianChips').isVisible());
 let c1=await cam(p);await p.locator('#pairHeartPericardium').click();let c2=await cam(p);ck('Female multi-select does not move camera',delta(c1,c2)<.001);ck('Heart and pericardium selections shared',await p.evaluate(()=>['HT','PC'].every(k=>window.__ATLAS_LEARNING__.getState().selectedMeridians.includes(k))));
 await p.locator('#acupointSearch').fill('内关');await p.locator('#acupointResults [data-point="PC6"]').first().click();await settle(p);
 ck('Female point click has real shared explanation, not a blank placeholder',await p.locator('#tcmPointCard').isVisible()&&(await p.locator('#tcmPointCard').innerText()).includes('现代研究')&&(await p.locator('#tcmPointCard').innerText()).includes('内关'));
 ck('Unregistered female coordinates are not fabricated',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().suspended&&window.__ATLAS_LEARNING__.getState().routeDiagnostics.every(r=>!r.visible)));
 ck('Female point selection keeps current view',delta(c2,await cam(p))<.001);await snap(p,'female-acupoint-description');
 await p.locator('#v9ChannelInfo').click();ck('Female channel introduction uses same populated card',await p.locator('#v9MeridianCard').isVisible()&&(await p.locator('#v9MeridianCard').innerText()).includes('现代解读'));
 await p.locator('#acupointResults [data-point="PC6"]').first().click();await p.locator('[data-body-sex="male"]').click();await p.waitForFunction(()=>!window.__ATLAS_FEMALE__.active&&!window.__ATLAS_SHARED__.getState().busy);await settle(p);
 ck('Switch back preserves selected TCM tab',await p.locator('#tcmTab').getAttribute('aria-selected')==='true');ck('Same meridian query survives round trip',await p.locator('#acupointSearch').inputValue()==='内关');
 ck('Selected point survives round trip',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint?.code==='PC6'));ck('The same populated point card works on male',await p.locator('#tcmPointCard').isVisible()&&(await p.locator('#tcmPointCard').innerText()).includes('内关'));
 await snap(p,'male-acupoint-description');c1=await cam(p);await p.locator('#meridianChips [data-meridian="LU"]').click();ck('Male filtering preserves current camera',delta(c1,await cam(p))<.001);
 await p.locator('#layersTab').click();if(!await p.locator('#customLayers').evaluate(e=>e.open))await p.locator('#customLayers summary').click();await p.locator('#sharedLayer-nervous').check();await p.waitForFunction(()=>window.__ATLAS_TISSUES__.getState().systems.nervous.loaded);await p.locator('#saveLayerCombo').click();await p.locator('#sharedLayer-nervous').uncheck();await p.locator('#restoreLayerCombo').click();await p.waitForFunction(()=>window.__ATLAS_TISSUES__.getState().systems.nervous.on);ck('Common saved layer combination restores visibility',await p.locator('#sharedLayer-nervous').isChecked());
 await p.locator('[data-profile="bones"]').click();await p.waitForFunction(()=>window.__ATLAS_SHARED__.getState().scene==='bones');await p.evaluate(()=>{window.__FOOT_ATLAS__.setRegion('lumbar');window.__FOOT_ATLAS__.setExplode(100);});await settle(p);ck('Existing lumbar separation stays vertical',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().bones.filter(b=>/^L[1-5]$/.test(b.id)).every(b=>Math.abs(b.position[0]-b.home[0])<.001&&Math.abs(b.position[2]-b.home[2])<.001)));
 await p.evaluate(()=>window.__FOOT_ATLAS__.reset());await settle(p);ck('Global restore retains 210 bones',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().count===210));
 await p.setViewportSize({width:390,height:844});await p.locator('#openNav').click();await p.locator('#boneTab').click();await p.locator('#structureSearch').fill('心');await snap(p,'phone-male-directory');
 await p.locator('[data-body-sex="female"]').click();await p.waitForFunction(()=>window.__ATLAS_FEMALE__.active&&!window.__ATLAS_SHARED__.getState().busy);ck('Phone body switch retains same directory input',await p.locator('#structureSearch').inputValue()==='心');ck('Phone has no horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await p.locator('#tcmTab').click();await p.locator('#acupointSearch').fill('内关');await p.locator('#acupointResults [data-point="PC6"]').first().click();await p.waitForTimeout(150);await snap(p,'phone-female-point');ck('Phone female description opens',await p.locator('#tcmPointCard').isVisible());await p.locator('#closePointCard').click();ck('Phone point detail closes',await p.evaluate(()=>!document.body.classList.contains('detail-open')));
 ck('No uncaught browser errors',report.errors.length===0,report.errors);
 report.success=true;
 }catch(e){report.failure=String(e);console.error(e);process.exitCode=1;}
 finally{report.finishedAt=new Date().toISOString();if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));fs.writeFileSync(path.join(out,(online?'live-':'local-')+type+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
