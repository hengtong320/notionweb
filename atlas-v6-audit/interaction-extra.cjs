'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');const {chromium}=require('playwright');
const out=path.resolve('fullbody-tcm-v6/checks');fs.mkdirSync(out,{recursive:true});
const url=process.env.LIVE_URL||'https://hengtong320.github.io/notionweb/fullbody-tcm-v6/';
const report={url,startedAt:new Date().toISOString(),success:false,checks:[],errors:[]};
function ck(name,pass,detail){report.checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});console.log(pass?'PASS':'FAIL',name);if(!pass)throw Error(name);}
async function settle(p){await p.waitForFunction(()=>!window.__FOOT_ATLAS__.getState().cameraAnimating);await p.waitForTimeout(180);}
(async()=>{let browser,p;try{
const bytes=Buffer.from(await(await fetch(url)).arrayBuffer());report.htmlSHA256=crypto.createHash('sha256').update(bytes).digest('hex');const info=JSON.parse(fs.readFileSync('fullbody-tcm-v6/build-info.json'));ck('Exact V6 public build',report.htmlSHA256===info.htmlSHA256);
browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});p=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});p.setDefaultTimeout(60000);p.on('pageerror',e=>report.errors.push(String(e)));await p.addInitScript(()=>localStorage.setItem('atlas-auto-speak','0'));await p.goto(url,{waitUntil:'load',timeout:120000});await p.waitForFunction(()=>window.__ATLAS_LEARNING__?.getState().version==='6.0');
await p.selectOption('#meridianQuick','KI');await settle(p);
ck('KI all 54 model markers project inside full-channel view',await p.evaluate(()=>{const r=document.querySelector('#viewport').getBoundingClientRect();return Array.from({length:27},(_,i)=>i+1).every(n=>['left','right'].every(side=>{const q=window.__ATLAS_LEARNING__.getPointScreen('KI'+n,side);return q&&q.x>r.left&&q.x<r.right&&q.y>r.top+80&&q.y<r.bottom-60;}));}));
await p.evaluate(()=>window.__ATLAS_LEARNING__.setLabelMode('selected'));await settle(p);
const hit=await p.evaluate(()=>{const a=window.__ATLAS_LEARNING__,r=document.querySelector('#viewport').getBoundingClientRect();for(const q of a.getRouteScreen('KI','right')){const e={clientX:q.x,clientY:q.y,button:0,pointerType:'mouse'};if(q.z<-1||q.z>1||q.y<r.top+180||q.y>r.bottom-150||q.x<r.left+140||q.x>r.right-140)continue;if(document.elementFromPoint(q.x,q.y)?.tagName!=='CANVAS'||a.hitPoint(e))continue;const h=a.hitRoute(e);if(h?.meridian==='KI')return {x:q.x,y:q.y};}return null;});
ck('A visible line segment is directly clickable',!!hit,hit);await p.mouse.click(hit.x,hit.y);await settle(p);
ck('Actual line click identifies KI without inventing a point',await p.evaluate(()=>{const s=window.__ATLAS_LEARNING__.getState();return s.selectedRoute?.meridian==='KI'&&!s.selectedPoint&&s.lastFocus.kind==='region';}));
ck('Line detail clearly distinguishes route from acupoint',(await p.locator('#routeFit').count())===1&&(await p.locator('#pointCard').count())>=0);
await p.click('#routeFit');await settle(p);ck('Return-to-channel keeps the KI route visible',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().routeDiagnostics.some(r=>r.meridian==='KI'&&r.visible)));
await p.click('#tcmBtn');await p.selectOption('#focusRegionSelect','foot');await settle(p);ck('KI foot subsection actually focuses the foot',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().target[1]<100));
await p.selectOption('#focusRegionSelect','chest');await settle(p);ck('KI chest subsection actually focuses chest',await p.evaluate(()=>window.__FOOT_ATLAS__.getState().target[1]>1100));
await p.fill('#acupointSearch','KI26');await p.click('[data-point="KI26"]');await settle(p);await p.click('#pointNext');await settle(p);ck('Next-point navigation focuses KI27',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint.code==='KI27'&&Math.abs(window.__FOOT_ATLAS__.getState().target[1]-1363)<.01));
await p.click('#pointPrev');await settle(p);ck('Previous-point navigation returns to KI26',await p.evaluate(()=>window.__ATLAS_LEARNING__.getState().selectedPoint.code==='KI26'));
ck('No uncaught errors',!report.errors.length,report.errors);report.success=true;
}catch(e){report.failure=String(e);console.error(e);process.exitCode=1;}finally{if(browser)await browser.close();report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,'extra-live-interactions.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));}})();
