// Explicit schematic navigation paths, kept separate from named point coordinates.
// These control vertices are NOT additional acupoints and have no clinical accuracy claim.
export function createGuidePaths(THREE,bones,meridian,side,data){
 const mid=99.55318155698478;
 const bb=id=>{const b=bones.get(id);return b?.geometry.boundingBox?.clone().translate(b.userData.home);};
 const back=(id,offset=24)=>{const b=bb(id);return b?new THREE.Vector3(mid,(b.min.y+b.max.y)/2,b.min.z-offset):null;};
 const pts=data.map(p=>p.position.clone());
 const spine=['coccyx','sacrum',...Array.from({length:5},(_,i)=>'L'+(5-i)),...Array.from({length:12},(_,i)=>'T'+(12-i)),...Array.from({length:7},(_,i)=>'C'+(7-i))];
 if(meridian==='GV'){
  const route=spine.map(id=>back(id)).filter(Boolean);
  route.push(new THREE.Vector3(mid,1513,-124),new THREE.Vector3(mid,1562,-145),new THREE.Vector3(mid,1620,-125),new THREE.Vector3(mid,1668,-54),new THREE.Vector3(mid,1645,13),new THREE.Vector3(mid,1609,70),new THREE.Vector3(mid,1565,79),new THREE.Vector3(mid,1527,103),new THREE.Vector3(mid,1497,89));
  return [{points:route,note:'背部至头面走向导览；不含完整体内分支，非定位线'}];
 }
 if(meridian==='CV')return [{points:[[mid,804,69],[mid,905,87],[mid,995,106],[mid,1100,102],[mid,1198,103],[mid,1284,100],[mid,1362,46],[mid,1410,43],[mid,1461,77]].map(p=>new THREE.Vector3(...p)),note:'前正中走向导览；未按皮肤及骨度分寸配准'}];
 if(meridian==='BL'){
  const sign=side==='left'?1:-1;const neck=back('C2',30);const paths=[];
  for(const lateral of [40,71]){
   const track=['T1','T3','T5','T7','T9','T11','L1','L3','L5','sacrum'].map(id=>{let p=back(id,30);if(p)p.x+=sign*lateral;return p;}).filter(Boolean);
   if(neck)track.unshift(neck.clone().add(new THREE.Vector3(sign*29,0,0)));
   const p40=data.find(p=>p.code==='BL40');if(p40)track.push(p40.position.clone());
   paths.push({points:track,note:'背部双列导览：横向间距为示意，不是标准寸距'});
  }
  const tail=['BL40','BL60','BL67'].map(code=>data.find(p=>p.code===code)?.position.clone()).filter(Boolean);
  if(tail.length>1)paths.push({points:tail,note:'下肢参考点间的示意连接'});
  const upper=['BL2','BL10'].map(code=>data.find(p=>p.code===code)?.position.clone()).filter(Boolean);
  if(upper.length>1){const [a,b]=upper;paths.push({points:[a,new THREE.Vector3(mid+sign*27,1633,28),new THREE.Vector3(mid+sign*27,1654,-50),new THREE.Vector3(mid+sign*27,1570,-138),b],note:'头面至后颈示意导览'});}
  return paths;
 }
 // EX consists of independent entries, not one channel. Never connect them.
 if(meridian==='EX'||pts.length<2)return [];
 return [{points:pts,note:'仅示意连接已标注参考点；不等于完整循行'}];
}
