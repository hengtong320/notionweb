"""Idempotent build compatibility fixes; only this atlas directory is touched."""
from pathlib import Path
base=Path(__file__).resolve().parent
p=base/'build.py';s=p.read_text();s=s.replace("bundle:true,minify:true,format:'iife'","bundle:true,minify:true,nodePaths:[process.env.NODE_PATH||'node_modules'],format:'iife'");p.write_text(s)
p=base/'qa.cjs';s=p.read_text().replace("page.setDefaultTimeout(30000)","page.setDefaultTimeout(90000)");s=s.replace("getState().ready,{timeout:120000}","getState().ready,undefined,{timeout:120000}");p.write_text(s)
