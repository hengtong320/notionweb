const {PNG}=require('pngjs');
module.exports=async({page,settle,ck,snapshot,shot,setFlags,report})=>{
 const compare=(a,b,q,r)=>{let changed=0,checked=0;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const x=Math.round(q.x)+dx,y=Math.round(q.y)+dy;if(x<0||y<0||x>=a.width||y>=a.height)continue;const i=(y*a.width+x)*4;checked++;if(Math.abs(a.data[i]-b.data[i])+Math.abs(a.data[i+1]-b.data[i+1])+Math.abs(a.data[i+2]-b.data[i+2])>35)changed++;}return {changed,checked};};
 report.lineAndDepth=[];
 for(const sex of ['male','female']){
  await page.evaluate(sex=>__ATLAS_SHARED__.switchSex(sex),sex);await settle();await page.evaluate(()=>__ATLAS_SHARED__.choose('surface',false));await settle();await page.evaluate(()=>{__ATLAS_LEARNING__.setTCMSide('both');__ATLAS_LEARNING__.setMeridians(['PC']);__ATLAS_LEARNING__.selectPoint('PC6','right',true);});await settle();
  await setFlags({pointsOn:false,namesOn:false,linesOn:true,guideOn:true,xray:false,localStudyOnly:false});const q=await page.evaluate(()=>__ATLAS_LEARNING__.getPointScreen('PC6','right'));
  const lineOn=PNG.sync.read(await page.screenshot());await setFlags({linesOn:false,guideOn:false});const lineOff=PNG.sync.read(await page.screenshot()),line=compare(lineOn,lineOff,q,40);ck(sex+' skin line alone paints visible pixels at the actual contact',line.changed>=35,{sex,line,q});
  await setFlags({pointsOn:true});const view=await page.evaluate(()=>__FOOT_ATLAS__.captureCamera());await page.evaluate(v=>{const position=v.position.map((p,i)=>2*v.target[i]-p);__FOOT_ATLAS__.restoreCamera({...v,position});},view);await settle();const hidden=await snapshot(),backQ=await page.evaluate(()=>__ATLAS_LEARNING__.getPointScreen('PC6','right'));
  const backOn=PNG.sync.read(await page.screenshot());await setFlags({pointsOn:false});const backOff=PNG.sync.read(await page.screenshot()),back=compare(backOn,backOff,backQ,5);ck(sex+' far-side point stays occluded by opaque skin',!hidden.selected?.visibleFromCamera&&back.changed<4,{sex,visible:hidden.selected?.visibleFromCamera,back});
  report.lineAndDepth.push({sex,line,back});await page.evaluate(v=>__FOOT_ATLAS__.restoreCamera(v),view);await setFlags({pointsOn:true,linesOn:true,guideOn:true,namesOn:true});await shot(sex+'-final-opaque-skin');
 }
};