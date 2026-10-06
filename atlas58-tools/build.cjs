const fs=require('fs'),path=require('path'),crypto=require('crypto'),child=require('child_process'),esbuild=require('esbuild');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'fullbody-tcm-v58');
for(const [entry,bundle]of [['app.js','app.bundle.js'],['evidence-page-v10.js','evidence.bundle.js'],['pose-lab.js','pose.bundle.js']])esbuild.buildSync({entryPoints:[path.join(dir,entry)],outfile:path.join(dir,bundle),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH],loader:{'.txt':'text'}});
const files=Object.fromEntries(fs.readdirSync(dir).filter(n=>fs.statSync(path.join(dir,n)).isFile()&&n!=='build-info.json').map(n=>[n,crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,n))).digest('hex')]));
fs.writeFileSync(path.join(dir,'build-info.json'),JSON.stringify({version:'58.0.0',baseVersion:'57.0.0',scope:'Atlas surface layer occlusion and head/neck route continuity; posture geometry retained from V57',files,clinicalCalibration:false},null,2));
console.log(JSON.stringify({version:'58.0.0',hashedFiles:Object.keys(files).length}));
