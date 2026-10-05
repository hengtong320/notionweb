const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const child = require('child_process');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'fullbody-tcm-v56');
require('esbuild').buildSync({
  entryPoints:[path.join(dir,'app.js')], outfile:path.join(dir,'app.bundle.js'),
  bundle:true, minify:true, format:'iife', target:['es2020'],
  nodePaths:[process.env.NODE_PATH], loader:{'.txt':'text'}
});
require('esbuild').buildSync({entryPoints:[path.join(dir,'evidence-page-v10.js')],outfile:path.join(dir,'evidence.bundle.js'),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH]});
require('esbuild').buildSync({entryPoints:[path.join(dir,'pose-lab.js')],outfile:path.join(dir,'pose.bundle.js'),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH]});

require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/contact-gpu-check.mjs')],outfile:path.join(root,'atlas56-tools/contact-gpu-check.bundle.js'),bundle:true,minify:true,format:'iife',target:['es2020'],nodePaths:[process.env.NODE_PATH],loader:{'.txt':'text'}});

child.execFileSync(process.execPath,[path.join(root,'atlas56-tools/check-pointer.mjs')],{stdio:'inherit',cwd:root});
const detectorCheck=path.join(require('os').tmpdir(),'atlas56-detector-check.mjs');require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-crossing-detector.mjs')],outfile:detectorCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});child.execFileSync(process.execPath,[detectorCheck],{stdio:'inherit',cwd:root});
const checkFile=path.join(require('os').tmpdir(),'atlas56-data-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-data.mjs')],outfile:checkFile,bundle:true,platform:'node',format:'cjs',define:{'import.meta.url':JSON.stringify(require('url').pathToFileURL(path.join(root,'atlas56-tools/check-data.mjs')).href)},nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[checkFile],{stdio:'inherit'});

const poseCheck=path.join(require("os").tmpdir(),"atlas56-pose-check.cjs");
require("esbuild").buildSync({entryPoints:[path.join(root,"atlas56-tools/check-geometry.mjs")],outfile:poseCheck,bundle:true,platform:"node",format:"cjs",nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[poseCheck],{stdio:"inherit"});

const gripCheck=path.join(require('os').tmpdir(),'atlas56-grip-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-grip.mjs')],outfile:gripCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[gripCheck],{stdio:'inherit',cwd:root});

const observationCheck=path.join(require('os').tmpdir(),'atlas56-observation-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-observation.mjs')],outfile:observationCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[observationCheck],{stdio:'inherit'});

const gravityCheck=path.join(require('os').tmpdir(),'atlas56-gravity-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-gravity.mjs')],outfile:gravityCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[gravityCheck],{stdio:'inherit',cwd:root});

const spineCheck=path.join(require('os').tmpdir(),'atlas56-spine-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-spine.mjs')],outfile:spineCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[spineCheck],{stdio:'inherit',cwd:root});

const contactCheck=path.join(require('os').tmpdir(),'atlas56-contact-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-contacts.mjs')],outfile:contactCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[contactCheck],{stdio:'inherit',cwd:root});

const bindingCheck=path.join(require('os').tmpdir(),'atlas56-binding-check.mjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-binding.mjs')],outfile:bindingCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[bindingCheck],{stdio:'inherit',cwd:root});

const supportCheck=path.join(require('os').tmpdir(),'atlas56-support-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-support.mjs')],outfile:supportCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[supportCheck],{stdio:'inherit',cwd:root});

const namesCheck=path.join(require('os').tmpdir(),'atlas56-names-check.cjs');
require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-names.mjs')],outfile:namesCheck,bundle:true,platform:'node',format:'cjs',nodePaths:[process.env.NODE_PATH]});
child.execFileSync(process.execPath,[namesCheck],{stdio:'inherit',cwd:root});

for (const name of ['preparation','leg-isolation','deformation','crossings']){
 const out=path.join(require('os').tmpdir(),'atlas56-'+name+'-check.mjs');
 require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-'+name+'.mjs')],outfile:out,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});
 child.execFileSync(process.execPath,[out],{stdio:'inherit',cwd:root});
}
for(const name of ['deformation','crossing']) fs.copyFileSync(path.join(root,'atlas56-tools/'+name+'-verification.json'),path.join(dir,'pose-'+name+'-verification.json'));
const inventoryCheck=path.join(require('os').tmpdir(),'atlas56-inventory-check.mjs');require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-inventory.mjs')],outfile:inventoryCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});child.execFileSync(process.execPath,[inventoryCheck],{stdio:'inherit',cwd:root});fs.copyFileSync(path.join(root,'atlas56-tools/surface-inventory-verification.json'),path.join(dir,'pose-surface-inventory.json'));
const fullSurfaceCheck=path.join(require('os').tmpdir(),'atlas56-full-surface-check.mjs');require('esbuild').buildSync({entryPoints:[path.join(root,'atlas56-tools/check-full-surface.mjs')],outfile:fullSurfaceCheck,bundle:true,platform:'node',format:'esm',nodePaths:[process.env.NODE_PATH]});child.execFileSync(process.execPath,[fullSurfaceCheck],{stdio:'inherit',cwd:root});
const files = Object.fromEntries(fs.readdirSync(dir).filter(n => fs.statSync(path.join(dir,n)).isFile() && n !== 'build-info.json').map(n => [n,crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,n))).digest('hex')]));
fs.writeFileSync(path.join(dir,'build-info.json'),JSON.stringify({version:'56.0.0',baseVersion:'55.0.0',baseCommit:process.env.ATLAS_BASE_COMMIT||child.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),files,clinicalCalibration:false},null,2));
console.log('Built V56:',Object.keys(files).length,'hashed files');
