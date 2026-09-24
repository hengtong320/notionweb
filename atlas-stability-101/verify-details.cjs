'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {chromium,webkit}=require('playwright');
const root=process.cwd(),dir=path.join(root,'fullbody-tcm-v10-1'),out=path.join(dir,'checks');
const mode=process.env.BROWSER||'chromium',live=!!process.env.LIVE_URL;
const report={version:'10.1.0',browser:mode,startedAt:new Date().toISOString(),checks:[],errors:[],success:false,clinicalValidation:false};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function ck(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name+': '+JSON.stringify(detail));}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{try{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!f.startsWith(root+path.sep))throw Error();if(fs.statSync(f).isDirectory())f=path.join(f,'index.html');res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);}catch{res.writeHead(404);res.end();}});
async function settle(page){await page.waitForFunction(()=>window.__ATLAS_STUDY__&&!window.__ATLAS_STUDY__.getState().restoring&&!window.__FOOT_ATLAS__.getState().cameraAnimating,null,{timeout:90000});await page.waitForTimeout(250);}
(async()=>{let browser,page;try{
 fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url=process.env.LIVE_URL||`http://127.0.0.1:${server.address().port}/fullbody-tcm-v10-1/`;report.url=url;
 const r=await fetch(url),html=Buffer.from(await r.arrayBuffer());ck('Exact current HTML, not a cached predecessor',r.ok&&sha(html)===sha(fs.readFileSync(path.join(dir,'index.html'))));
 browser=await (mode==='webkit'?webkit:chromium).launch({headless:true,...(mode==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,acceptDownloads:true,serviceWorkers:'block'});
 await context.addInitScript(()=>{localStorage.setItem('atlas-auto-speak','0');});page=await context.newPage();page.setDefaultTimeout(45000);page.on('pageerror',e=>report.errors.push(String(e)));
 await page.goto(url+'#kind=point&id=PC6&side=left&mode=illustrative&layer=nerves',{waitUntil:'load',timeout:90000});await settle(page);
 ck('Direct point link retains target, side and nerve profile',await page.evaluate(()=>{const s=window.__ATLAS_STUDY__.getState();return s.current.id==='PC6'&&s.current.side==='left'&&window.__ATLAS_TISSUES__.getState().profile==='nerves';}));
 ck('Quiet nearby labels are default, not a full-body text wall',await page.evaluate(()=>window.__ATLAS_LEARNING__.getState().labelMode==='smart'&&window.__ATLAS_LEARNING__.getState().labelStats.shown<=8));
 ck('Nearby mode does not suggest hidden pages can be turned',await page.locator('#labelNext').isDisabled());
 const href=await page.locator('#evidenceCurrent').getAttribute('href');await page.goto(href,{waitUntil:'load',timeout:90000});
 ck('Explanation receives selected layer',await page.evaluate(()=>window.__EVIDENCE_PAGE__.getState().layer==='nerves'));
 const back=await page.locator('#open3d').getAttribute('href');ck('Return link preserves layer plus exact target and side',back.includes('layer=nerves')&&back.includes('PC6')&&back.includes('side=left'));
 await page.locator('#open3d').click();await settle(page);
 ck('Actual explanation-to-3D click restores nerve context',await page.evaluate(()=>window.__ATLAS_STUDY__.getState().current.id==='PC6'&&window.__ATLAS_TISSUES__.getState().profile==='nerves'&&window.__ATLAS_TISSUES__.getState().systems.nervous.visible>0));
 // This case failed in V10: setProfile was executed after choose and cleared selection.
 await page.locator('#overallCurrent').click();await settle(page);
 const target=await page.evaluate(()=>{const t=window.__ATLAS_TISSUES__.getCatalog().find(t=>t.system==='nervous'&&t.side==='left');return{kind:'tissue',id:t.id,name:t.name,side:t.side,layer:'nerves',mode:'strict'};});
 await page.evaluate(t=>window.__ATLAS_STUDY__.navigate(t),target);await settle(page);
 ck('Restoring tissue target no longer clears selection after profile switch',await page.evaluate(id=>window.__ATLAS_TISSUES__.getState().selected?.id===id&&window.__ATLAS_STUDY__.getState().current.id===id,target.id));
 ck('Selected tissue is in an enabled layer',await page.evaluate(()=>window.__ATLAS_TISSUES__.getState().systems.nervous.on));
 await page.locator('#overallCurrent').click();await settle(page);
 await page.evaluate(()=>window.__ATLAS_TISSUES__.setProfile('bones'));
 await page.evaluate(()=>window.__ATLAS_STUDY__.navigate({kind:'point',id:'GV14',side:'midline',mode:'illustrative',layer:'bones'}));await settle(page);
 await page.evaluate(()=>window.__ATLAS_LEARNING__.setLabelMode('complete'));await settle(page);
 const dl=page.waitForEvent('download');await page.locator('#captureBtn').click();const downloaded=await dl;await downloaded.saveAs(path.join(out,mode+'-detail-export.png'));
 ck('Actual export still includes selected Chinese label',await page.evaluate(()=>window.__ATLAS_STUDY__.getState().lastCapture.labels.some(t=>t.includes('大椎'))));
 await page.evaluate(()=>window.__ATLAS_LEARNING__.setPrecisionMode('strict'));await settle(page);
 const strictDl=page.waitForEvent('download');await page.locator('#captureBtn').click();await strictDl;
 ck('Strict export does not leak labels hidden by their parent',await page.evaluate(()=>window.__ATLAS_STUDY__.getState().lastCapture.labels.length===0));
 await page.evaluate(()=>{window.__ATLAS_LEARNING__.setPrecisionMode('illustrative');window.__FOOT_ATLAS__.selectBone('C7',true,true);});await settle(page);
 const boneDl=page.waitForEvent('download');await page.locator('#captureBtn').click();await boneDl;
 ck('Bone selection cannot remove the uncalibrated warning when meridians remain enabled',await page.evaluate(()=>window.__ATLAS_STUDY__.getState().lastCapture.mode.includes('未校准')));
 const invalid=await page.evaluate(async()=>{const before=window.__ATLAS_STUDY__.getState().current.id;try{await window.__ATLAS_STUDY__.navigate({kind:'point',id:'INVALID-POINT'});return false;}catch{return window.__ATLAS_STUDY__.getState().current.id===before;}});
 ck('Unknown point does not silently become a fabricated position',invalid);
 await page.evaluate(()=>window.__ATLAS_STUDY__.navigate({kind:'point',id:'EX-YINTANG',side:'midline',mode:'strict',layer:'bones'}));await settle(page);
 if(!live)await page.screenshot({path:path.join(out,mode+'-head-study.png'),timeout:90000});
 await page.setViewportSize({width:390,height:844});await settle(page);
 ck('Phone width remains inside viewport',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 ck('Phone resize preserves the selected head area',await page.evaluate(()=>window.__ATLAS_STUDY__.getState().current.id==='EX-YINTANG'));
 const evidence=await page.locator('#evidenceCurrent').getAttribute('href');await page.goto(evidence,{waitUntil:'load',timeout:90000});await page.locator('#search').fill('da zhui');await page.locator('#results [data-id="GV14"]').click();await page.waitForTimeout(700);
 ck('Mobile result click moves the detail heading into view',await page.locator('#focusHeading').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=-2&&r.top<innerHeight*.8;}));
 ck('No uncaught script errors',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);process.exitCode=1;if(page)try{await page.screenshot({path:path.join(out,'details-failure-'+mode+'.png'),timeout:15000});}catch{}}
 finally{if(browser)await browser.close();await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(live?'details-live-':'details-local-')+mode+'.json'),JSON.stringify(report,null,2));console.log('DETAIL_RESULT',JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure}));}
})();
