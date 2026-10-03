const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const child = require('child_process');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'fullbody-tcm-v32');
require('esbuild').buildSync({
  entryPoints:[path.join(dir,'app.js')], outfile:path.join(dir,'app.bundle.js'),
  bundle:true, minify:true, format:'iife', target:['es2020'],
  nodePaths:[process.env.NODE_PATH], loader:{'.txt':'text'}
});
const files = Object.fromEntries(fs.readdirSync(dir).filter(n => fs.statSync(path.join(dir,n)).isFile() && n !== 'build-info.json').map(n => [n,crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,n))).digest('hex')]));
fs.writeFileSync(path.join(dir,'build-info.json'),JSON.stringify({version:'32.0.0',baseVersion:'31.0.0',baseCommit:child.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),files,clinicalCalibration:false},null,2));
console.log('Built V32:',Object.keys(files).length,'hashed files');
