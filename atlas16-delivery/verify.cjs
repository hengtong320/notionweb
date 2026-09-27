'use strict';
const {chromium,webkit}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');
const type=process.env.BROWSER||'chromium',online=!!process.env.TEST_URL,root=path.resolve('fullbody-tcm-v16'),out=path.join(root,'checks');fs.mkdirSync(out,{recursive:true});
const report={version:'16.0.0',browser:type,online,startedAt:new Date().toISOString(),checks:[],errors:[],success:false,physicalIPadTested:false};let browser,server,page;
function ck(name,ok,detail){report.checks.push({name,pass:!!ok,...detail===undefined?{}:{detail}});if(!ok)throw Error(name+': '+JSON.stringify(detail));}
const camera=()=>page.evaluate(()=>__FOOT_ATLAS__.captureCamera());
const delta=(a,b)=>Math.max(...['position','target'].flatMap(k=>a[k].map((v,i)=>Math.abs(v-b[k][i]))));
async function settle(){await page.waitForFunction(()=>!__FOOT_ATLAS__.getState().cameraAnimating&&!__ATLAS_SHARED__.getState().busy&&!__ATLAS_LEARNING__.getSurfaceState().busy);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));}
async function snap(n){await settle();await page.screenshot({path:path.join(out,(online?'live-':'')+type+'-'+n+'.png')});}
async function actualTouches(start,end){const cdp=await page.context().newCDPSession(page);const pts=arr=>arr.map(([x,y],id)=>({x,y,id,radiusX:3,radiusY:3,force:1}));await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(start)});for(let n=1;n<=12;n++){const a=start.map((v,i)=>v.map((x,k)=>x+(end[i][k]-x)*n/12));await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(a)});await page.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(400);await cdp.detach();}
(async()=>{try{
 if(!online){const base=process.cwd();server=http.createServer((q,r)=>{let f=path.resolve(base,'.'+decodeURIComponent(new URL(q.url,'http://local').pathname));if(!f.startsWith(base+path.sep)){r.statusCode=403;return r.end();}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){r.statusCode=404;return r.end();}r.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r);});await new Promise(r=>server.listen(0,'127.0.0.1',r));}
 report.url=process.env.TEST_URL||'http://127.0.0.1:'+server.address().port+'/fullbody-tcm-v16/';
 browser=await(type==='webkit'?webkit:chromium).launch({headless:true,...type==='chromium'?{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}: {}});
 const ctx=await browser.newContext({viewport:{width:820,height:1180},deviceScaleFactor:1,hasTouch:true,isMobile:true,userAgent:'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'});page=await ctx.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>report.errors.push(String(e)));
 await page.addInitScript(()=>localStorage.setItem('atlas-auto-speak','0'));
 const response=await page.goto(report.url,{timeout:90000});ck('Viewer returns HTTP200',response.status()===200);await page.waitForFunction(()=>window.__ATLAS_VIEW__?.getState().version==='16.0.0'&&__FOOT_ATLAS__.getState().ready);await settle();
 ck('Original 210 bone meshes retained',await page.evaluate(()=>__FOOT_ATLAS__.getState().count===210));
 await page.locator('#fullscreenBtn').click();await page.waitForTimeout(200);await settle();
 ck('iPad-sized touch session opens stable expanded view',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded));
 ck('Tablet expansion does not require native fullscreen',await page.evaluate(()=>!document.fullscreenElement));
 ck('Viewport uses actual expanded height',await page.evaluate(()=>Math.abs(__ATLAS_VIEW__.getState().viewport.height-(visualViewport?.height||innerHeight))<3));
 const touchBefore=await camera();
 if(type==='chromium'){
  await actualTouches([[310,560],[510,560]],[[220,560],[600,560]]);
  ck('Real two-finger input changes 3D zoom',delta(touchBefore,await camera())>.1);
  ck('Real pinch keeps expanded mode',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded));
  await page.locator('#widePan').click();const beforePan=await camera();await actualTouches([[430,600]],[[490,650]]);const afterPan=await camera();
  ck('Real single-finger pan moves camera target',Math.max(...beforePan.target.map((x,i)=>Math.abs(x-afterPan.target[i])))>.1);
 }else{
  await page.locator('#wideZoomIn').click();ck('WebKit zoom button changes view',delta(touchBefore,await camera())>.1);
  await page.locator('#widePan').click();const beforePan=await camera();await page.mouse.move(430,600);await page.mouse.down({button:'right'});await page.mouse.move(490,650,{steps:12});await page.mouse.up({button:'right'});ck('WebKit pointer pan changes camera',delta(beforePan,await camera())>.1);
 }
 ck('Pan toggle uses shared camera',await page.evaluate(()=>__ATLAS_VIEW__.getState().pan));
 const retained=await camera();await page.evaluate(()=>document.dispatchEvent(new Event('fullscreenchange')));await settle();
 ck('Fullscreen-exit state notification does not collapse webpage expansion',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded));ck('Fullscreen state handling preserves target and zoom',delta(retained,await camera())<.001);
 await page.locator('#wideFrame').click();await settle();const framed=await page.evaluate(()=>__ATLAS_VIEW__.getFrameAudit());
 ck('Complete-display contains all visible bone bounding corners',framed.corners.length===8&&framed.corners.every(p=>p.every(Number.isFinite)&&Math.abs(p[0])<=framed.fit.wf+.02&&Math.abs(p[1])<=framed.fit.hf+.02&&p[2]>-1&&p[2]<1),framed);
 await snap('ipad-fullbody-fit');
 const portrait=await camera();await page.setViewportSize({width:1180,height:820});await page.waitForTimeout(250);await settle();ck('Orientation keeps chosen camera rather than resets overview',delta(portrait,await camera())<.001);ck('Landscape remains expanded with no horizontal overflow',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded&&document.documentElement.scrollWidth<=innerWidth+1));await page.locator('#wideFrame').click();await snap('ipad-landscape-fit');
 await page.locator('#wideLayers').click();ck('Original layer panel accessible inside expanded view',await page.locator('#tissuePanel').isVisible());await page.locator('#wideClosePanel').click();ck('Closing panel does not exit expanded view',await page.evaluate(()=>__ATLAS_VIEW__.getState().expanded&&!document.body.classList.contains('nav-open')));
 await page.locator('#wideExit').click();await settle();ck('User can explicitly exit expansion',await page.evaluate(()=>!__ATLAS_VIEW__.getState().expanded));
 await page.evaluate(()=>__ATLAS_SHARED__.choose('chest',false));await settle();
 const chest=await page.evaluate(()=>({t:__ATLAS_TISSUES__.getState(),b:__FOOT_ATLAS__.getState()}));
 ck('Male chest preset shows heart and lungs',chest.t.systems.heart.visible>0&&chest.t.systems.visceral.visible>0);
 ck('Organs default to skeleton-in-body context, not isolated',chest.b.visible>150&&chest.t.boneOpacity>=.25&&!chest.t.isolated,{visibleBones:chest.b.visible,boneOpacity:chest.t.boneOpacity});
 ck('No default organ clipping planes',!chest.t.clipOn);
 await page.evaluate(()=>document.body.classList.remove('nav-open','detail-open'));await snap('organs-in-body');
 const catalog=await page.evaluate(()=>__ATLAS_TISSUES__.getVisibleCatalog());const lung=catalog.find(r=>r.category==='lung');ck('Source lung available',!!lung,lung?.id);
 const pick=await page.evaluate(id=>__ATLAS_TISSUES__.getPickPoint(id),lung.id);ck('Lung has a real mouse hit target',!!pick,pick);
 await page.mouse.click(pick.x,pick.y);await settle();ck('Actual organ click selects that source structure',await page.evaluate(id=>__ATLAS_TISSUES__.getState().selected?.id===id,lung.id));
 ck('Organ selection keeps skeleton visible',await page.evaluate(()=>__FOOT_ATLAS__.getState().visible>150));
 await page.locator('#tissueIsolate').click();await settle();ck('Explicit single-organ inspection still works',await page.evaluate(()=>__ATLAS_TISSUES__.getState().isolated));await page.locator('#tissueIsolate').click();await settle();ck('Returning from single organ restores body reference',await page.evaluate(()=>!__ATLAS_TISSUES__.getState().isolated&&__FOOT_ATLAS__.getState().visible>150));
 ck('Visible body-position action present',await page.locator('[data-body-context]').isVisible());
 await page.evaluate(()=>__ATLAS_SHARED__.choose('abdomen',false));await settle();ck('Abdominal organs also keep skeleton context',await page.evaluate(()=>__FOOT_ATLAS__.getState().visible>150&&__ATLAS_TISSUES__.getState().systems.visceral.visible>0));
 await page.evaluate(()=>__ATLAS_SHARED__.switchSex('female'));await settle();await page.evaluate(()=>__ATLAS_SHARED__.choose('chest',false));await settle();
 const fem=await page.evaluate(()=>__ATLAS_FEMALE__.getState());ck('Female organs retain own surface and partial skeleton',fem.systems.respiratory.visible>0&&fem.systems.surface.visible>0&&fem.systems.skeletal.visible>0,fem.systems);ck('Female context never uses male skeleton',await page.evaluate(()=>__FOOT_ATLAS__.getState().visible===0));await page.evaluate(()=>document.body.classList.remove('nav-open','detail-open'));await snap('female-in-body');
 await page.evaluate(()=>__ATLAS_SHARED__.switchSex('male'));await settle();await page.evaluate(()=>__ATLAS_SHARED__.choose('bones',false));await settle();
 await page.locator('#tcmTab').click();await page.locator('#acupointSearch').fill('合谷');await page.locator('[data-point="LI4"]').first().click();await settle();
 ck('Actual Hegu catalog click selects LI4',await page.evaluate(()=>__ATLAS_LEARNING__.getState().selectedPoint.code==='LI4'));
 const a=JSON.parse(fs.readFileSync(path.join(root,'hegu-reference-v16.json')));const ref=await page.evaluate(()=>__ATLAS_LEARNING__.getNavigationCatalog().find(p=>p.code==='LI4'&&p.side==='right'));
 ck('LI4 source reference equals reproducible shaft-midpoint derivation',Math.max(...ref.position.map((x,i)=>Math.abs(x-a.position[i])))<.00001,{position:ref.position,fraction:a.longitudinalFraction,clinicalCalibration:a.clinicalCalibration});
 ck('Hegu viewing direction is dorsal, not old palm view',ref.view[2]<-.5,ref.view);
 const view=await camera(),d=view.position.map((x,i)=>x-view.target[i]);ck('Actual LI4 focus is on hand-dorsal side',d.reduce((s,x,i)=>s+x*a.view[i],0)>0);
 ck('Hegu landmark explanation is readable',await page.locator('#heguReferenceCard').isVisible());await page.locator('#heguLandmarks').click();await settle();ck('Landmark control preserves selected LI4 and shows hand reference',await page.evaluate(()=>__ATLAS_LEARNING__.getState().selectedPoint.code==='LI4'&&__FOOT_ATLAS__.getState().visible>0));await snap('hegu-landmarks');
 await page.evaluate(()=>__ATLAS_LEARNING__.selectPoint('LI4','left',true));await settle();const left=await page.evaluate(()=>__ATLAS_LEARNING__.getNavigationCatalog().find(p=>p.code==='LI4'&&p.side==='left'));ck('Left Hegu uses corresponding mirrored reference',Math.abs(left.position[0]+ref.position[0]-199.10636311396956)<1e-4&&Math.abs(left.position[1]-ref.position[1])<1e-5);
 const beforeFilter=await camera();await page.evaluate(()=>__ATLAS_LEARNING__.setMeridians(['HT','PC']));await settle();ck('Meridian switches still preserve chosen view',delta(beforeFilter,await camera())<.001);
 await page.evaluate(()=>{__FOOT_ATLAS__.setRegion('lumbar');__FOOT_ATLAS__.setExplode(100);});await settle();ck('Lumbar separation remains vertical',await page.evaluate(()=>__FOOT_ATLAS__.getState().bones.filter(b=>/^L[1-5]$/.test(b.id)).every(b=>Math.abs(b.position[0]-b.home[0])<.001&&Math.abs(b.position[2]-b.home[2])<.001)));
 await page.evaluate(()=>__FOOT_ATLAS__.reset());await settle();ck('Original skeleton restores',await page.evaluate(()=>__FOOT_ATLAS__.getState().count===210));
 ck('No unhandled JavaScript error',report.errors.length===0,report.errors);report.success=true;
 }catch(e){report.failure=String(e);console.error(e);process.exitCode=1;if(page)try{await page.screenshot({path:path.join(out,type+'-failure.png')});report.failureState=await page.evaluate(()=>({body:document.body.className,view:window.__ATLAS_VIEW__?.getState(),study:window.__ATLAS_STUDY__?.getState(),tissues:window.__ATLAS_TISSUES__?.getState()}));}catch{}}
 finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,(online?'live-':'local-')+type+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({success:report.success,checks:report.checks.length,failure:report.failure},null,2));await browser?.close();server?.close();}
})();
