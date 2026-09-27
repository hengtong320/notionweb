from pathlib import Path
p=Path('atlas17-delivery/verify.cjs');s=p.read_text()
a="codes.includes(p.code)&&p.side==='right'";assert a in s
s=s.replace(a,"codes.includes(p.code)&&(p.side==='right'||p.side==='midline')")
s=s.replace("const normal=await skinAudit(['GV14']);await xray(true);", "const normal=await skinAudit(['GV14']);ck('Normal depth actually hides the rear GV14 point from the front',normal.points.length===1&&normal.points[0].hit!=='GV14',normal);await xray(true);")
s=s.replace("await snap('female-heart-pericardium');const target=", "report.femaleNavigation=await page.evaluate(()=>__ATLAS_LEARNING__.getNavigationCatalog());const pc9=report.femaleNavigation.find(p=>p.code==='PC9'&&p.side==='right');ck('Female fingertip reference remains in the hand region, never on the thigh',pc9.position[0]<-265&&pc9.position[1]<830,pc9);await snap('female-heart-pericardium');const target=")
p.write_text(s)
p=Path('atlas17-delivery/skin-v17.js');s=p.read_text();a=s.index(' function slice(');b=s.index(' function region(',a)
s=s[:a]+r''' function sliceAt(a,y,part,side,center){
  const key=(a===sourcePos?'s':'t')+'|'+y+'|'+part+'|'+side;if(slices.has(key))return slices.get(key);
  let vs=[];for(let i=0;i<a.count;i++)if(Math.abs(a.getY(i)-y)<12)vs.push([a.getX(i),a.getZ(i)]);
  if(vs.length<12){slices.set(key,null);return null;}vs.sort((a,b)=>a[0]-b[0]);const groups=[[]];
  for(const v of vs){const g=groups.at(-1);if(g.length&&v[0]-g.at(-1)[0]>23)groups.push([]);groups.at(-1).push(v);}
  const good=groups.filter(g=>g.length>8),central=good.find(g=>g[0][0]<=center&&g.at(-1)[0]>=center)||good[Math.floor(good.length/2)];let chosen=vs;
  if(part==='arm'){
   // Several separate digit islands belong to ONE hand. Selecting the extreme
   // island alone scales other fingertips far outside the hand (onto the thigh).
   const arm=good.filter(g=>g!==central&&(side==='left'?g[0][0]>center:g.at(-1)[0]<center)).flat();
   if(arm.length>=8)chosen=arm;else chosen=vs.filter(v=>side==='left'?v[0]>center+125:v[0]<center-125);
  }else if(part==='body'&&central)chosen=central;
  else if(part==='leg')chosen=vs.filter(v=>side==='left'?v[0]>center:v[0]<center);
  if(chosen.length<8){slices.set(key,null);return null;}
  const b={minX:Math.min(...chosen.map(v=>v[0])),maxX:Math.max(...chosen.map(v=>v[0])),minZ:Math.min(...chosen.map(v=>v[1])),maxZ:Math.max(...chosen.map(v=>v[1]))};slices.set(key,b);return b;
 }
 function slice(a,y,part,side,center){const low=Math.floor(y/8)*8,t=(y-low)/8,p=sliceAt(a,low,part,side,center),q=sliceAt(a,low+8,part,side,center);if(!p||!q)return p||q;return Object.fromEntries(Object.keys(p).map(k=>[k,p[k]+(q[k]-p[k])*t]));}
''' +s[b:]
p.write_text(s)
print('Refined actual digit surface clusters, interpolated section bounds and normal-depth assertions')
