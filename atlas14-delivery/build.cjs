const fs=require('fs'),path=require('path'),crypto=require('crypto'),esbuild=require('esbuild');
const root='fullbody-tcm-v14';
esbuild.buildSync({entryPoints:[root+'/app.js'],bundle:true,minify:true,format:'iife',target:'es2020',nodePaths:[process.env.NODE_PATH],loader:{'.txt':'text'},outfile:root+'/app.bundle.js'});
const files={};for(const f of ['index.html','app.bundle.js','shared-v14.js','shared-v14.css','female-v12.js','learning-enhancements.js','evidence-ui-v9.js']){const x=fs.readFileSync(path.join(root,f));files[f]={bytes:x.length,sha256:crypto.createHash('sha256').update(x).digest('hex')};}
fs.writeFileSync(root+'/build-info.json',JSON.stringify({version:'14.0.0',base:'13.0.0',files,clinicalCalibration:false,sourceModelsUnchanged:true,femaleAcupointCoordinates:false,sharedDirectory:true,sharedLayerControls:true,sharedAcupointDescriptions:true,removedReadOnlyGate:true,builtAt:new Date().toISOString()},null,2));
console.log('BUILD_V14',files['app.bundle.js']);
