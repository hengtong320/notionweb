'use strict';
const fs=require('fs'),esbuild=require('esbuild'),crypto=require('crypto');
const root='fullbody-tcm-v6';
// Camera matrices must be current before immediate point projection/raycast.
let app=fs.readFileSync(root+'/app.js','utf8');
const at=app.indexOf('function focusBounds(box,options={})');
if(at<0)throw Error('Missing focus implementation');
let end=app.indexOf('\nlet renderQuality=',at);
let fn=app.slice(at,end);
const old='controls.update();controls.enableDamping=old;';
if(!fn.includes(old))throw Error('Unexpected focus controls');
fn=fn.replace(old,'controls.update();camera.updateMatrixWorld(true);controls.enableDamping=old;');
app=app.slice(0,at)+fn+app.slice(end);fs.writeFileSync(root+'/app.js',app);
esbuild.buildSync({entryPoints:[root+'/app.js'],bundle:true,minify:true,format:'iife',target:['es2020'],loader:{'.txt':'text'},nodePaths:[process.env.NODE_PATH],outfile:root+'/app.bundle.js',legalComments:'inline'});
let h=fs.readFileSync(root+'/index.template.html','utf8');
const entry='<script type="module" src="app.js"></script>';
if(h.split(entry).length!==2)throw Error('Expected one module entry');
// Callback replacement is essential: minified JS may legitimately contain $&.
h=h.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>'+fs.readFileSync(root+'/styles.css','utf8')+'</style>');
h=h.replace(/<script type="importmap">[\s\S]*?<\/script>/g,'');
const model=fs.readFileSync(root+'/assets/fullbody.glb').toString('base64');
const bundle=fs.readFileSync(root+'/app.bundle.js','utf8').replace(/<\/script/gi,()=>'<\\/script');
h=h.replace(entry,()=>'<script>window.FOOT_ATLAS_EMBEDDED='+JSON.stringify(model)+';</script>\n<script>'+bundle+'</script>');
if(h.includes(entry)||!h.includes('window.FOOT_ATLAS_EMBEDDED='))throw Error('Incomplete embedded build');
fs.writeFileSync(root+'/index.html',h);
const info=JSON.parse(fs.readFileSync(root+'/build-info.json','utf8'));
info.htmlSHA256=crypto.createHash('sha256').update(h).digest('hex');info.htmlBytes=Buffer.byteLength(h);info.safeTemplateSubstitution=true;info.immediateCameraMatrixSync=true;
fs.writeFileSync(root+'/build-info.json',JSON.stringify(info,null,2));console.log(info);
