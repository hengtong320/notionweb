const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const child = require('child_process');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'fullbody-tcm-v49');
require('esbuild').buildSync({
  entryPoints:[path.join(dir,'app.js')], outfile:path.join(dir,'app.bundle.js'),
  bundle:true, minify:true, format:'iife', target:['es2020'],
  nodePaths:[process.env.NODE_PATH], loader:{'.txt':'text'}
});
require('esbuild').buildSync({entryPoints:[path.join(dir,'evidence-page-v10.js')],outfile:path.join(dir,'evidence.bundle.js'),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH]});
require('esbuild').buildSync({entryPoints:[path.join(dir,'pose-lab.js')],outfile:path.join(dir,'pose.bundle.js'),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH]});

const checkFile=path.join(require('os').tmpdir(),'atlas49-data-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-data.mjs')],outfile:checkFile,bundle:true,platform:'node',format:'cjs',define:{'import.meta.url':JSON.stringify(require('url').pathToFileURL(path.join(root,'atlas49-tools/check-data.mjs')).href)},nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[checkFile],{stdio:'inherit'});

const poseCheck=path.join(require("os").tmpdir(),"atlas49-pose-check.cjs");
require("esbuild").buildSync({entryPoints:[path.join(root,"atlas49-tools/check-geometry.mjs")],outfile:poseCheck,bundle:true,platform:"node",format:"cjs",nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[poseCheck],{stdio:"inherit"});

const gripCheck=path.join(require('os').tmpdir(),'atlas49-grip-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-grip.mjs')],outfile:gripCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[gripCheck],{stdio:'inherit',cwd:root});

const observationCheck=path.join(require('os').tmpdir(),'atlas49-observation-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-observation.mjs')],outfile:observationCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[observationCheck],{stdio:'inherit'});

const gravityCheck=path.join(require('os').tmpdir(),'atlas49-gravity-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-gravity.mjs')],outfile:gravityCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[gravityCheck],{stdio:'inherit',cwd:root});

const spineCheck=path.join(require('os').tmpdir(),'atlas49-spine-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-spine.mjs')],outfile:spineCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[spineCheck],{stdio:'inherit',cwd:root});

const contactCheck=path.join(require('os').tmpdir(),'atlas49-contact-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-contacts.mjs')],outfile:contactCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[contactCheck],{stdio:'inherit',cwd:root});

const bindingCheck=path.join(require('os').tmpdir(),'atlas49-binding-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-binding.mjs')],outfile:bindingCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[bindingCheck],{stdio:'inherit',cwd:root});

const supportCheck=path.join(require('os').tmpdir(),'atlas49-support-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-support.mjs')],outfile:supportCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[supportCheck],{stdio:'inherit',cwd:root});

const namesCheck=path.join(require('os').tmpdir(),'atlas49-names-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-names.mjs')],outfile:namesCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[namesCheck],{stdio:'inherit',cwd:root});

for (const name of ['deformation','crossings']){
 const out=path.join(require('os').tmpdir(),'atlas49-'+name+'-check.mjs');
 require('esbuild').buildSync({entryPoints:[path.join(root,'atlas49-tools/check-'+name+'.mjs')],outfile:out,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
 child.execFileSync(process.execPath,[out],{stdio:'inherit',cwd:root});
}
for(const name of ['deformation','crossing']) fs.copyFileSync(path.join(root,'atlas49-tools/'+name+'-verification.json'),path.join(dir,'pose-'+name+'-verification.json'));
const files = Object.fromEntries(fs.readdirSync(dir).filter(n => fs.statSync(path.join(dir,n)).isFile() && n !== 'build-info.json').map(n => [n,crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,n))).digest('hex')]));
fs.writeFileSync(path.join(dir,'build-info.json'),JSON.stringify({version:'49.0.1',baseVersion:'48.0.0',baseCommit:child.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),files,clinicalCalibration:false},null,2));
console.log('Built V49:',Object.keys(files).length,'hashed files');
