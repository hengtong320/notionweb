const fs=require('fs'),path=require('path'),crypto=require('crypto'),esbuild=require('esbuild');
const root='fullbody-tcm-v15';
esbuild.buildSync({entryPoints:[root+'/app.js'],bundle:true,minify:true,format:'iife',target:'es2020',nodePaths:[process.env.NODE_PATH],loader:{'.txt':'text'},outfile:root+'/app.bundle.js'});
esbuild.buildSync({entryPoints:[root+'/evidence-page-v10.js'],bundle:true,minify:true,format:'iife',target:'es2020',nodePaths:[process.env.NODE_PATH],outfile:root+'/evidence.bundle.js'});
const files={};for(const f of ['index.html','app.bundle.js','shared-v14.js','shared-v14.css','styles.css','evidence.bundle.js','female-v12.js','learning-enhancements.js','evidence-ui-v9.js','surface-v13.js','route-corridors-v13.js','tissues-v4.js']){const x=fs.readFileSync(path.join(root,f));files[f]={bytes:x.length,sha256:crypto.createHash('sha256').update(x).digest('hex')};}
fs.writeFileSync(root+'/build-info.json',JSON.stringify({version:'15.0.0',base:'14.0.0',files,clinicalCalibration:false,sourceModelsUnchanged:true,femaleAcupointCoordinates:false,sharedDirectory:true,sharedLayerControls:true,secondaryPointSnappingRemoved:true,preserveOriginalSameLevelOffsets:true,latestRequestedSurfaceState:true,builtAt:new Date().toISOString()},null,2));
console.log('BUILD_V15',files['app.bundle.js']);
