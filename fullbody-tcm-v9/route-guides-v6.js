export function createGuidePaths(THREE,bones,meridian,side,data){
 const p=Object.fromEntries(data.map(d=>[d.code,d.position]));
 const mid=99.55318155698478,mirror=v=>new THREE.Vector3(side==='left'?2*mid-v[0]:v[0],v[1],v[2]);
 const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>p[meridian+(a+i)]).filter(Boolean);
 const route=(points,note)=>({points:points.filter(Boolean).map(v=>v.clone()),note:note+'；体表区域导览，未含全部内行和支脉，非临床定位线'});
 if(meridian==='EX')return [];
 if(meridian==='BL')return [route(range(1,10),'头颈段'),route([p.BL10,...range(11,30),p.BL35,p.BL36,p.BL37,p.BL38,p.BL39,p.BL40,...range(55,67)],'背内侧及下肢段'),route([p.BL10,...range(41,54),p.BL36,p.BL40],'背外侧支线'),route(range(31,34),'骶后区参照点组')];
 if(meridian==='KI')return [route([...range(1,10),mirror([69,528,-92]),mirror([72,685,-66]),mirror([81,781,12]),...range(11,27)],'足底至腹胸段')];
 if(meridian==='GV')return [route(range(1,24),'骶腰背、颈及头顶段'),route([p.GV24,mirror([mid,1577,71]),...range(25,28)],'面部及上唇区域')];
 return [route([...data].sort((a,b)=>a.ordinal-b.ordinal).map(d=>d.position),'各穴名对应区域')];
}
