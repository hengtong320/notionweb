#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'
INDEX=ROOT/'index.html'
CSS=ROOT/'style.css'
SW=ROOT/'sw.js'
BUILD=ROOT/'tools'/'build_standalone.py'
VERSION=ROOT/'VERSION'

if VERSION.read_text(encoding='utf-8').strip()!='4.1.0':
    raise SystemExit('v4.2 patch expects VERSION 4.1.0')

s=GAME.read_text(encoding='utf-8')

sixth="""    {path:'assets/blessings-realistic/06-pine-crane.png',name:'松鹤延年',title:'福寿安康',english:'PEACE & LONGEVITY',lines:['福寿绵长','平安喜乐'],accent:'#f8df9b',titleColor:'#fffdf4',scheme:'realistic-b',layout:{titleX:925,titleY:150,titleAlign:'right',titleSize:130,lineX:900,lineY:1080,lineAlign:'right',lineSize:67,plateX:400,plateY:955,plateW:620,plateH:300}},
"""
new_cards="""    {path:'assets/blessings-v42/07-peony-courtyard.webp',name:'牡丹晨露',title:'花开见喜',english:'BLOOMING JOY',lines:['花开富贵','喜乐常伴'],accent:'#ffb3c7',titleColor:'#fffaf5',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/08-tea-terraces.webp',name:'云海茶山',title:'清晨安好',english:'MORNING PEACE',lines:['心有清欢','岁月安然'],accent:'#d8ef9e',titleColor:'#fffdf3',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/09-wheat-windmill.webp',name:'麦田晨光',title:'丰收喜乐',english:'GOLDEN DAYS',lines:['所愿皆得','一路丰盈'],accent:'#ffd47b',titleColor:'#fffdf3',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/10-ocean-sailboat.webp',name:'海上朝阳',title:'一帆风顺',english:'SMOOTH SAILING',lines:['乘风向前','万事顺遂'],accent:'#ffd3bd',titleColor:'#fff',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/11-sunflower-lane.webp',name:'向阳花路',title:'向阳而行',english:'FOLLOW THE SUN',lines:['日日有光','步步生花'],accent:'#ffe16f',titleColor:'#fffdf0',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/12-ginkgo-temple.webp',name:'银杏古寺',title:'岁月安暖',english:'GOLDEN PEACE',lines:['静享时光','福气绵长'],accent:'#ffd064',titleColor:'#fffdf2',scheme:'realistic-v42'},
    {path:'assets/blessings-v42/13-heli-red-mountain.webp',name:'赤翼群山',title:'一路高飞',english:'RISE HIGH',lines:['志在高远','前程万里'],accent:'#ff8d72',titleColor:'#fff',scheme:'helicopter-v42'},
    {path:'assets/blessings-v42/14-heli-white-coast.webp',name:'白翼海岸',title:'乘风破浪',english:'SOAR FORWARD',lines:['心向远方','一路顺风'],accent:'#8fe5ff',titleColor:'#fff',scheme:'helicopter-v42'},
    {path:'assets/blessings-v42/15-heli-yellow-alpine.webp',name:'金翼雪湖',title:'展翅高飞',english:'FLY HIGH',lines:['所行皆坦途','所愿皆抵达'],accent:'#ffe069',titleColor:'#fff',scheme:'helicopter-v42'},
    {path:'assets/blessings-v42/16-heli-blue-city.webp',name:'蓝翼都市',title:'青云直上',english:'ABOVE THE CITY',lines:['步步向上','日日精进'],accent:'#91c8ff',titleColor:'#fff',scheme:'helicopter-v42'},
    {path:'assets/blessings-v42/17-heli-black-desert.webp',name:'玄翼沙海',title:'勇往直前',english:'FORWARD ALWAYS',lines:['心有方向','脚下有路'],accent:'#ffc06d',titleColor:'#fff',scheme:'helicopter-v42'},
    {path:'assets/blessings-v42/18-heli-silver-snow.webp',name:'银翼雪峰',title:'直上云霄',english:'TO THE SUMMIT',lines:['越过高山','抵达晴朗'],accent:'#cfe6ff',titleColor:'#fff',scheme:'helicopter-v42'},
"""
if sixth not in s: raise SystemExit('sixth blessing card marker missing')
s=s.replace(sixth,sixth+new_cards,1)
s=s.replace('const REALISTIC_BLESSING_COUNT=6;','const REALISTIC_BLESSING_COUNT=18;',1)

marker='\n\n  async function boot() {'
if marker not in s: raise SystemExit('boot marker missing')

override=r'''

  // ---------------------------------------------------------------------------
  // v4.2 — multi-image blessing albums + richer photorealistic challenge packs
  // ---------------------------------------------------------------------------
  const V42_VERSION='4.2.0';
  const V42_REALISTIC_INDICES=Array.from({length:18},(_,i)=>BLESSING_START+i);
  const V42_PACKS=[
    {
      id:1,name:'花开晨安',difficulty:'轻松',difficultyKey:'easy',grid:4,generatorLevel:1,
      imageOffsets:[0,1,6,7],headline:'花开见喜',english:'A BEAUTIFUL MORNING',
      lines:['愿晨光温柔相伴','日日顺心安康'],accent:'#ffbd86',bg1:'#442533',bg2:'#7e412d',
      hints:3,autos:3,flowStart:0,flowGain:1.12,speed:.96,
      description:'4张差异明显的花景与晨光，先熟悉拼合和重力。'
    },
    {
      id:2,name:'山河丰景',difficulty:'进阶',difficultyKey:'medium',grid:5,generatorLevel:3,
      imageOffsets:[2,3,4,5,8,9,10,11],headline:'山河有福',english:'GOOD FORTUNE EVERYWHERE',
      lines:['愿眼里有风景','心里有欢喜'],accent:'#f2d184',bg1:'#173a3f',bg2:'#6b542d',
      hints:4,autos:3,flowStart:16,flowGain:1.15,speed:.91,
      description:'8张写实美图、5×5棋盘和深牌堆，开始真正规划落点。'
    },
    {
      id:3,name:'一飞冲天',difficulty:'困难',difficultyKey:'hard',grid:5,generatorLevel:3,
      imageOffsets:[12,13,14,15,16,17],headline:'一飞冲天',english:'SOAR TOWARD THE SKY',
      lines:['愿你一路向上','前程辽阔明亮'],accent:'#ffd05f',bg1:'#14253b',bg2:'#325978',
      hints:5,autos:3,flowStart:24,flowGain:1.2,speed:.87,
      description:'6张构图相近的直升机照片，靠颜色、地貌与机身细节辨认。'
    },
    {
      id:4,name:'心流大师',difficulty:'大师',difficultyKey:'expert',grid:5,generatorLevel:5,
      imageOffsets:[0,2,6,8,10,12,15,17],headline:'万事皆顺',english:'EVERYTHING FLOWS',
      lines:['心有从容节奏','事事渐入佳境'],accent:'#ffe07d',bg1:'#271d42',bg2:'#754263',
      hints:3,autos:2,flowStart:34,flowGain:1.28,speed:.82,
      description:'8张跨主题写实图、三连锁种子与深牌堆，测试高级心流。'
    }
  ].map(pack=>({...pack,images:pack.imageOffsets.map(i=>V42_REALISTIC_INDICES[i])}));

  if(!Array.isArray(save.albums))save.albums=[];
  save.schemaVersion=5;
  Object.assign(game,{shareAlbum:null,albumCursor:0,albumReady:false,nextBlessingPack:1,currentPack:null});
  dom.blessingPackModal=$('blessingPackModal');
  dom.blessingPackGrid=$('blessingPackGrid');
  dom.blessingPackClose=$('blessingPackClose');

  function packById(id){return V42_PACKS.find(p=>p.id===Number(id))||V42_PACKS[0];}
  blessingPackForLevel=function(level){return ((Math.max(1,Number(level)||1)-1)%V42_PACKS.length)+1;};
  function currentBlessingPack(level=game.blessingPack||game.level){return packById(blessingPackForLevel(level));}

  trackEvent=function(name,data={}){
    const event={name,at:Date.now(),session:V41_SESSION_ID,version:V42_VERSION,mode:game.mode,level:game.level,phase:game.phase,moves:game.moves,cleared:game.clearedCount,...data};
    save.telemetry.push(event);if(save.telemetry.length>300)save.telemetry.splice(0,save.telemetry.length-300);persist();return event;
  };
  downloadTelemetry=function(){
    const payload={schemaVersion:save.schemaVersion||5,exportedAt:new Date().toISOString(),version:V42_VERSION,events:save.telemetry||[]};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=`jigsaw-drop-v42-test-data-${Date.now()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);showToast('测试数据已导出');
  };

  const v41GridForLevelV42=gridForLevel;
  gridForLevel=function(level){return game.mode==='blessing'?currentBlessingPack(level).grid:v41GridForLevelV42(level);};
  const v41IsHardLevelV42=isHardLevel;
  isHardLevel=function(level){
    if(game.mode==='blessing')return ['hard','expert'].includes(currentBlessingPack(level).difficultyKey);
    return v41IsHardLevelV42(level);
  };
  const v41ImageCountForLevelV42=imageCountForLevel;
  imageCountForLevel=function(level){return game.mode==='blessing'?currentBlessingPack(level).images.length:v41ImageCountForLevelV42(level);};
  const v41SelectedImagesForLevelV42=selectedImagesForLevel;
  selectedImagesForLevel=function(level,count){return game.mode==='blessing'?currentBlessingPack().images.slice():v41SelectedImagesForLevelV42(level,count);};
  const v41LevelIntroCopyV42=levelIntroCopy;
  levelIntroCopy=function(level){
    if(game.mode==='blessing'){
      const p=currentBlessingPack(level);return `${p.difficulty} · ${p.images.length}张写实图 · 完成本局后合成一张祝福合辑`;
    }
    return v41LevelIntroCopyV42(level);
  };

  function locateGeneratedTile(gen,id,targetCell){
    const existing=gen.board[targetCell],boardPos=gen.board.indexOf(id);
    if(boardPos>=0){[gen.board[boardPos],gen.board[targetCell]]=[gen.board[targetCell],gen.board[boardPos]];return;}
    for(let c=0;c<gen.decks.length;c++){
      const pos=gen.decks[c].indexOf(id);if(pos<0)continue;
      gen.decks[c][pos]=existing;gen.board[targetCell]=id;return;
    }
    throw new Error(`v4.2 tile missing: ${id}`);
  }

  function seedFastFirstAlbum(gen){
    if(GRID!==4||!gen.selected.length)return gen;
    const first=gen.selected[0],ids=Array(4).fill(null);
    for(const t of gen.tiles.values())if(t.imageIndex===first)ids[t.quadrant]=t.id;
    [[8,ids[0]],[9,ids[1]],[12,ids[2]],[15,ids[3]]].forEach(([cell,id])=>locateGeneratedTile(gen,id,cell));
    const protectedCells=new Set([8,9,12,13,15]);
    let guard=0;
    while(guard++<20){
      const complete=findCompleteGroups(gen.board,gen.tiles).find(g=>g.imageIndex!==first);if(!complete)break;
      const from=complete.cells[complete.cells.length-1];
      const to=Array.from({length:CELL_COUNT},(_,i)=>i).find(i=>!protectedCells.has(i)&&!complete.cells.includes(i)&&gen.tiles.get(gen.board[i])?.imageIndex!==complete.imageIndex);
      if(to===undefined)break;[gen.board[from],gen.board[to]]=[gen.board[to],gen.board[from]];
    }
    gen.solutionHint={sourceCell:15,targetCell:13,imageIndex:first};return gen;
  }

  const v41GenerateLevelV42=generateLevel;
  generateLevel=function(level){
    if(game.mode!=='blessing')return v41GenerateLevelV42(level);
    const pack=currentBlessingPack(level),gen=v40GenerateLevel(pack.generatorLevel);
    gen.selected=pack.images.slice();gen.imageCount=pack.images.length;gen.blessingPack=pack.id;gen.packName=pack.name;
    gen.seed=((0x42B1E500+pack.id*2654435761)>>>0);
    if(pack.id===1)seedFastFirstAlbum(gen);
    return gen;
  };

  const v41GainFlowV42=gainFlow;
  gainFlow=function(amount){
    const multiplier=game.mode==='blessing'?(game.currentPack?.flowGain||1):1;
    return v41GainFlowV42(amount*multiplier);
  };
  const v41ChainSpeedFactorV42=chainSpeedFactor;
  chainSpeedFactor=function(){
    const base=v41ChainSpeedFactorV42();
    return game.mode==='blessing'?base*(game.currentPack?.speed||1):base;
  };

  const v41AnimateAndClearV42=animateAndClear;
  animateAndClear=async function(groups,tier=1){
    const before=game.clearedCount;
    await v41AnimateAndClearV42(groups,tier);
    if(game.mode==='blessing'&&game.clearedCount>before){
      const gained=game.clearedCount-before;
      showToast(`已收集 ${game.clearedCount}/${game.totalImages} 张美图${gained>1?' · 连续完成！':''}`,1100);
      trackEvent('album_image_collected',{gained,total:game.totalImages,images:groups.map(g=>g.imageIndex)});
    }
  };

  const v41StartLevelV42=startLevel;
  startLevel=async function(level){
    if(game.mode==='blessing')level=blessingPackForLevel(level);
    const pack=game.mode==='blessing'?packById(level):null;
    game.currentPack=pack;game.blessingPack=pack?.id||0;game.shareAlbum=null;game.albumReady=false;game.nextBlessingPack=pack?((pack.id%V42_PACKS.length)+1):1;
    const result=await v41StartLevelV42(level);
    if(pack){
      // v4.1's per-image reward is intentionally disabled: the whole round now
      // becomes one shareable album after every selected picture is completed.
      game.autoRewardShown=true;game.hintCount=pack.hints;game.autoCount=pack.autos;game.flowEnergy=Math.max(game.flowEnergy,pack.flowStart);
      const stage=$('gameStage');stage?.classList.toggle('is-blessing-challenge',pack.grid===5);stage?.classList.toggle('has-blessing-deck',remainingDeckCount()>0);stage?.classList.toggle('is-helicopter-pack',pack.id===3);stage?.setAttribute('data-blessing-pack',String(pack.id));
      const label=dom.levelNumber.parentElement?.querySelector('span');if(label)label.textContent=pack.difficulty;
      dom.levelNumber.textContent=String(pack.id);updateHud();
      showToast(`${pack.name} · ${pack.difficulty} · 收集${pack.images.length}张后生成合辑`,2300);
      trackEvent('album_pack_start',{packId:pack.id,packName:pack.name,difficulty:pack.difficulty,imageCount:pack.images.length,grid:pack.grid,deck:remainingDeckCount()});
    }
    return result;
  };

  function albumDateText(ts=Date.now()){
    const d=new Date(ts);return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
  }
  function normalizedAlbums(){
    const valid=[];
    for(const raw of save.albums||[]){
      const pack=packById(raw.packId),images=(raw.images||[]).filter(isRealisticBlessingIndex);
      if(images.length)valid.push({...raw,packId:pack.id,images});
    }
    return valid;
  }
  function drawImageCoverV42(ctx,img,x,y,w,h){
    const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight),sw=w/scale,sh=h/scale,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2;
    ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
  }
  function drawAlbumCardV42(ctx,img,index,x,y,w,h,accent){
    ctx.save();posterRoundRect(ctx,x,y,w,h,24);ctx.clip();drawImageCoverV42(ctx,img,x,y,w,h);
    const shade=ctx.createLinearGradient(0,y+h*.58,0,y+h);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(5,10,17,.72)');ctx.fillStyle=shade;ctx.fillRect(x,y,w,h);
    ctx.fillStyle='rgba(255,255,255,.96)';ctx.font=`700 ${Math.max(22,Math.min(30,w*.075))}px "PingFang SC","Microsoft YaHei",sans-serif`;ctx.textAlign='left';ctx.textBaseline='bottom';ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=8;ctx.fillText(PICTURE_NAMES[index],x+18,y+h-14,w-36);ctx.restore();
    ctx.save();posterRoundRect(ctx,x,y,w,h,24);ctx.strokeStyle=accent;ctx.globalAlpha=.9;ctx.lineWidth=4;ctx.stroke();ctx.restore();
  }

  async function renderBlessingAlbum(albumOrPack,imagesArg=null){
    const album=albumOrPack?.packId?albumOrPack:null,pack=packById(album?.packId||albumOrPack?.id||game.blessingPack),indices=(imagesArg||album?.images||game.clearedImages).filter(isRealisticBlessingIndex);
    if(!indices.length)throw new Error('album has no images');
    const imgs=await Promise.all(indices.map(i=>loadPosterImage(PICTURE_PATHS[i])));
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;canvas.dataset.scheme='album-v42';canvas.dataset.packId=String(pack.id);canvas.dataset.imageCount=String(indices.length);
    const ctx=canvas.getContext('2d'),bg=ctx.createLinearGradient(0,0,1080,1440);bg.addColorStop(0,pack.bg1);bg.addColorStop(1,pack.bg2);ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1440);
    ctx.save();ctx.globalAlpha=.22;ctx.filter='blur(32px) brightness(.72)';drawImageCoverV42(ctx,imgs[0],-45,-30,1170,650);ctx.restore();
    const topShade=ctx.createLinearGradient(0,0,0,330);topShade.addColorStop(0,'rgba(5,8,18,.64)');topShade.addColorStop(1,'rgba(5,8,18,0)');ctx.fillStyle=topShade;ctx.fillRect(0,0,1080,340);
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='rgba(255,255,255,.9)';ctx.font='600 28px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillText(`${albumDateText(album?.createdAt)} · 亲手拼出的祝福合辑`,540,58);
    drawPosterStrokeText(ctx,pack.headline,540,142,112,'center','#fffdf7',pack.accent,900);
    ctx.save();ctx.textAlign='center';ctx.font='600 26px Georgia,serif';ctx.letterSpacing='5px';ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillText(pack.english,540,224);ctx.restore();

    const count=imgs.length,cols=count<=4?2:(count<=6?3:4),rows=Math.ceil(count/cols),areaX=60,areaY=280,areaW=960,areaH=800,gap=18;
    const cardW=(areaW-gap*(cols-1))/cols,cardH=(areaH-gap*(rows-1))/rows;
    imgs.forEach((img,i)=>{
      const row=Math.floor(i/cols),col=i%cols,lastRowCount=count-(rows-1)*cols;
      let x=areaX+col*(cardW+gap);
      if(row===rows-1&&lastRowCount<cols)x+=(cols-lastRowCount)*(cardW+gap)/2;
      const y=areaY+row*(cardH+gap);drawAlbumCardV42(ctx,img,indices[i],x,y,cardW,cardH,pack.accent);
    });

    const plateY=1120,plateH=245;ctx.save();ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=32;posterRoundRect(ctx,75,plateY,930,plateH,40);ctx.fillStyle='rgba(10,12,22,.56)';ctx.fill();ctx.restore();
    ctx.save();posterRoundRect(ctx,77,plateY+2,926,plateH-4,38);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.stroke();ctx.restore();
    pack.lines.forEach((line,i)=>drawPosterStrokeText(ctx,line,540,plateY+74+i*72,54,'center',i===0?pack.accent:'#fffdf6','#a84635',860));
    ctx.textAlign='center';ctx.font='500 25px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.78)';ctx.fillText(`${pack.name} · ${count}张写实作品`,540,1393);
    posterSparkle(ctx,965,74,16,pack.accent);posterSparkle(ctx,110,225,10,'#fff');
    return canvas;
  }

  async function albumBlobV42(album){const canvas=await renderBlessingAlbum(album);return await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));}

  async function refreshBlessingModal(albumInput=null){
    const albums=normalizedAlbums();let album=albumInput?.packId?albumInput:null;
    if(!album){
      if(game.shareAlbum)album=game.shareAlbum;
      else if(albums.length)album=albums[Math.max(0,Math.min(game.albumCursor,albums.length-1))];
    }
    if(!album)return;
    game.shareAlbum=album;const pack=packById(album.packId),all=normalizedAlbums(),idx=all.findIndex(a=>a.id===album.id);if(idx>=0)game.albumCursor=idx;
    const head=dom.blessingModal.querySelector('.blessing-modal-head');if(head){const small=head.querySelector('small'),h2=head.querySelector('h2');if(small)small.textContent=`${album.images.length}张美图合成一份作品`;if(h2)h2.textContent='本局祝福合辑';}
    dom.blessingMessage.textContent=`${pack.headline} · ${pack.lines.join('，')}`;dom.blessingPreview.classList.add('is-loading');
    const canvas=await renderBlessingAlbum(album);dom.blessingPreview.src=canvas.toDataURL('image/jpeg',.92);dom.blessingPreview.alt=`${pack.name}祝福合辑`;dom.blessingPreview.classList.remove('is-loading');
    dom.blessingThumbs.innerHTML='';album.images.forEach(i=>{const b=document.createElement('button');b.className='blessing-thumb is-album-piece';const img=document.createElement('img');img.src=PICTURE_PATHS[i];img.alt=PICTURE_NAMES[i];b.appendChild(img);dom.blessingThumbs.appendChild(b);});
  };

  function openBlessingAlbumV42(album,{showContinue=false}={}){
    if(!album)return;game.shareAlbum=album;showModal(dom.blessingModal);dom.blessingContinueBtn.hidden=!showContinue;dom.blessingContinueBtn.textContent=game.nextBlessingPack===1?'再拼一轮':'继续下一组';
    dom.blessingModal.querySelector('.blessing-modal-card')?.classList.toggle('is-album-result',showContinue);
    refreshBlessingModal(album).catch(()=>showToast('合辑生成失败，请重试'));trackEvent('album_open',{packId:album.packId,imageCount:album.images.length,auto:showContinue});
  }

  openBlessingWorks=function(preferred=null){
    const albums=normalizedAlbums();if(!albums.length){showToast('完成一整局祝福拼图，就能生成多图合辑',2400);return;}
    let album=preferred?.packId?preferred:null;
    if(!album&&Number.isInteger(preferred))album=[...albums].reverse().find(a=>a.images.includes(preferred));
    if(!album)album=albums[albums.length-1];game.albumCursor=Math.max(0,albums.findIndex(a=>a.id===album.id));openBlessingAlbumV42(album,{showContinue:false});
  };
  shiftBlessing=function(delta){
    const albums=normalizedAlbums();if(!albums.length)return;game.albumCursor=(game.albumCursor+delta+albums.length)%albums.length;game.shareAlbum=albums[game.albumCursor];refreshBlessingModal(game.shareAlbum);
  };
  downloadBlessing=async function(){
    const album=game.shareAlbum;if(!album)return;const pack=packById(album.packId),blob=await albumBlobV42(album);if(!blob)return;
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${pack.headline}-${pack.name}-祝福合辑.png`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);showToast('多图祝福合辑已生成');trackEvent('album_save',{packId:pack.id});
  };
  shareBlessing=async function(){
    const album=game.shareAlbum;if(!album)return;const pack=packById(album.packId),blob=await albumBlobV42(album);if(!blob)return;
    const file=new File([blob],`${pack.headline}-${pack.name}.png`,{type:'image/png'}),text=`${pack.headline}！${pack.lines.join('，')}。`;
    trackEvent('album_share',{packId:pack.id});
    try{if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:pack.headline,text,files:[file]});return;}}catch(error){if(error?.name==='AbortError')return;}
    await downloadBlessing();
  };
  copyBlessing=async function(){
    const album=game.shareAlbum;if(!album)return;const pack=packById(album.packId),text=`${pack.headline}！${pack.lines.join('，')}。`;
    try{await navigator.clipboard.writeText(text);showToast('整组祝福语已复制');}catch(_){showToast(text,2800);}trackEvent('album_copy',{packId:pack.id});
  };

  const v41FinishBlessingRewardV42=finishBlessingReward;
  finishBlessingReward=function(){
    if(game.albumReady){
      game.albumReady=false;hideModals();dom.blessingModal.querySelector('.blessing-modal-card')?.classList.remove('is-album-result');
      dom.winScreen.classList.remove('is-visible');game.mode='blessing';startLevel(game.nextBlessingPack);return true;
    }
    return v41FinishBlessingRewardV42();
  };

  const v41FinishLevelV42=finishLevel;
  finishLevel=async function(){
    if(game.mode!=='blessing')return v41FinishLevelV42();
    game.phase='won';pauseTimer();audio.win();haptic([30,45,30,45,70]);await delay(360);
    const pack=currentBlessingPack(),images=game.clearedImages.filter(isRealisticBlessingIndex),elapsed=Math.round(currentElapsed());
    const album={id:`album-${Date.now()}-${pack.id}`,packId:pack.id,images:images.slice(),createdAt:Date.now(),moves:game.moves,elapsed};
    save.albums.push(album);if(save.albums.length>24)save.albums.splice(0,save.albums.length-24);
    images.forEach(index=>{if(!save.blessings.includes(index))save.blessings.push(index);});
    game.nextBlessingPack=pack.id>=V42_PACKS.length?1:pack.id+1;save.blessingLevel=game.nextBlessingPack;persist();

    const heading=dom.winScreen.querySelector('h2');if(heading)heading.textContent=`${pack.name}合辑完成`;
    dom.winScreen.classList.add('is-blessing-win');if(dom.blessingWinText){dom.blessingWinText.hidden=false;dom.blessingWinText.textContent=`${images.length}张写实作品已经合成一张可保存、可分享的祝福合辑。`;}
    dom.nextBtn.textContent=game.nextBlessingPack===1?'再拼一轮':'下一组挑战';dom.shareWorksBtn.hidden=false;dom.unlockedStrip.innerHTML='';
    images.slice(0,8).forEach(idx=>{const img=document.createElement('img');img.src=PICTURE_PATHS[idx];img.alt=PICTURE_NAMES[idx];img.addEventListener('click',()=>openBlessingWorks(album));dom.unlockedStrip.appendChild(img);});
    dom.winScreen.classList.add('is-visible');startConfetti();updateHome();game.shareAlbum=album;game.albumReady=true;openBlessingAlbumV42(album,{showContinue:true});
    trackEvent('album_pack_complete',{packId:pack.id,packName:pack.name,difficulty:pack.difficulty,imageCount:images.length,elapsed,moves:game.moves});
  };

  const v41UpdateHomeV42=updateHome;
  updateHome=function(){
    v41UpdateHomeV42();const albums=normalizedAlbums();if(dom.homeWorksBtn){dom.homeWorksBtn.hidden=!albums.length;dom.homeWorksBtn.textContent=albums.length?`我的祝福合辑 (${albums.length})`:'我的祝福合辑';}
  };

  function renderPackMenuV42(){
    if(!dom.blessingPackGrid)return;dom.blessingPackGrid.innerHTML='';
    V42_PACKS.forEach(pack=>{
      const b=document.createElement('button');b.className=`blessing-pack-item is-${pack.difficultyKey}`;b.dataset.pack=String(pack.id);b.style.setProperty('--pack-image',`url("${PICTURE_PATHS[pack.images[0]]}")`);
      b.innerHTML=`<span class="pack-art"></span><span class="pack-copy"><i>${pack.difficulty}</i><strong>${pack.id}. ${pack.name}</strong><small>${pack.description}</small><em>${pack.images.length}张 · ${pack.grid}×${pack.grid}${pack.id===3?' · 同题材辨认':''}</em></span>`;
      dom.blessingPackGrid.appendChild(b);
    });
  }
  function openPackMenuV42(){hideModals();renderPackMenuV42();dom.blessingPackModal?.classList.add('is-visible');trackEvent('pack_menu_open');}
  function closePackMenuV42(){dom.blessingPackModal?.classList.remove('is-visible');}

  const v41BindEventsV42=bindEvents;
  bindEvents=function(){
    dom.blessingBtn?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();audio.tap();openPackMenuV42();},true);
    v41BindEventsV42();
    dom.blessingPackClose?.addEventListener('click',()=>{audio.tap();closePackMenuV42();});
    dom.blessingPackModal?.addEventListener('pointerdown',event=>{if(event.target===dom.blessingPackModal)closePackMenuV42();});
    dom.blessingPackGrid?.addEventListener('click',event=>{
      const button=event.target.closest('[data-pack]');if(!button)return;const pack=packById(button.dataset.pack);audio.tap();closePackMenuV42();game.mode='blessing';trackEvent('pack_selected',{packId:pack.id,difficulty:pack.difficulty});startLevel(pack.id);
    });
  };
'''

s=s.replace(marker,override+marker,1)

old_api="""  Object.assign(window.__JIGSAW__,{version:V41_VERSION,blessingPacks:V41_BLESSING_PACKS,blessingPackForLevel,generateBlessingLevelV41,undoLastMove,captureUndoSnapshot,trackEvent,downloadTelemetry,useHint,useAuto,presentBlessingReward,finishBlessingReward,configureGrid});
"""
new_api=old_api+"""  Object.assign(window.__JIGSAW__,{version:V42_VERSION,blessingPacks:V42_PACKS,realisticBlessingCount:REALISTIC_BLESSING_COUNT,renderBlessingAlbum,albumBlobV42,packById,currentBlessingPack,normalizedAlbums,openBlessingAlbumV42,openPackMenuV42,closePackMenuV42,trackEvent,downloadTelemetry,finishBlessingReward,configureGrid});
"""
if old_api not in s: raise SystemExit('v4.1 public API marker missing')
s=s.replace(old_api,new_api,1)
GAME.write_text(s,encoding='utf-8')

html=INDEX.read_text(encoding='utf-8')
html=html.replace('manifest.webmanifest?v=4.1.0','manifest.webmanifest?v=4.2.0').replace('style.css?v=4.1.0','style.css?v=4.2.0').replace('game.js?v=4.1.0','game.js?v=4.2.0')
html=html.replace('<button id="blessingBtn" class="blessing-entry"><span>今日祝福</span><small>拼一张写实美图 · 完成即生成作品</small></button>','<button id="blessingBtn" class="blessing-entry"><span>写实祝福合辑</span><small>一局拼多张 · 最后合成一份可分享作品</small></button>')
pack_modal='''\n      <section id="blessingPackModal" class="modal-layer" aria-label="选择祝福挑战">\n        <div class="modal-card blessing-pack-card">\n          <button id="blessingPackClose" class="modal-close" aria-label="关闭">×</button>\n          <div class="pack-menu-head"><small>写实祝福合辑</small><h2>选择本局主题</h2><p>从轻松识别，到同题材直升机困难关，再到深牌堆心流挑战。</p></div>\n          <div id="blessingPackGrid" class="blessing-pack-grid"></div>\n        </div>\n      </section>\n'''
anchor='''\n      <section id="blessingModal" class="modal-layer" aria-label="祝福作品">'''
if anchor not in html: raise SystemExit('blessing modal anchor missing')
html=html.replace(anchor,pack_modal+anchor,1)
html=html.replace('<div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div>','<div class="blessing-modal-head"><div><small>多张美图合成一份作品</small><h2>本局祝福合辑</h2></div>')
html=html.replace('<p class="blessing-note">浏览器支持时会直接调起系统分享；否则自动生成图片供保存。</p>','<p class="blessing-note">本局完成的多张写实图片会排成一张高清合辑；浏览器不支持直接分享时可先保存图片。</p>')
INDEX.write_text(html,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
if '/* v4.2-album-packs */' not in css:
    css+=r'''

/* v4.2-album-packs */
.blessing-pack-card{width:min(94vw,430px);max-height:min(90vh,840px);overflow:auto;padding:25px 18px 20px;background:linear-gradient(180deg,#fffaf0,#f4e6d2);color:#3f3026}.pack-menu-head{text-align:left;padding:2px 8px 13px}.pack-menu-head small{color:#bd6c42;font-weight:900;letter-spacing:.08em}.pack-menu-head h2{margin:4px 0 5px;font-size:27px}.pack-menu-head p{margin:0;color:#78665a;font-size:13px;line-height:1.55}.blessing-pack-grid{display:grid;gap:11px}.blessing-pack-item{position:relative;display:grid;grid-template-columns:92px 1fr;gap:12px;align-items:stretch;width:100%;min-height:112px;padding:8px;border:0;border-radius:18px;text-align:left;background:rgba(255,255,255,.83);box-shadow:0 6px 18px rgba(73,45,28,.12),inset 0 0 0 1px rgba(145,92,57,.12);color:#3e3027}.blessing-pack-item:active{transform:scale(.985)}.pack-art{border-radius:13px;background-image:linear-gradient(180deg,transparent,rgba(0,0,0,.22)),var(--pack-image);background-size:cover;background-position:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.44)}.pack-copy{display:flex;flex-direction:column;justify-content:center;min-width:0}.pack-copy i{align-self:flex-start;padding:2px 7px;border-radius:99px;background:#f2a65f;color:#fff;font-style:normal;font-size:10px;font-weight:900}.blessing-pack-item.is-hard .pack-copy i{background:#dc5b4d}.blessing-pack-item.is-expert .pack-copy i{background:#7858b6}.pack-copy strong{margin-top:4px;font-size:17px}.pack-copy small{margin-top:3px;color:#76665d;font-size:11px;line-height:1.42}.pack-copy em{margin-top:5px;color:#a65b39;font-style:normal;font-size:10px;font-weight:800}.blessing-modal-card.is-album-result{width:min(94vw,450px);background:linear-gradient(180deg,#fff8e8,#e9d4b5)}.blessing-preview-shell{background:#171522}.blessing-thumb.is-album-piece{pointer-events:none}.game-stage.is-blessing.is-blessing-challenge .flow-meter{display:flex!important}.game-stage.is-blessing.is-blessing-challenge.has-blessing-deck .deck-area{display:grid!important}.game-stage.is-blessing.is-blessing-challenge .board-wrap{margin-top:2px}.game-stage.is-blessing.is-helicopter-pack .board{box-shadow:0 12px 34px rgba(9,30,61,.54),0 0 0 2px rgba(255,218,101,.62)}.game-stage.is-blessing.is-helicopter-pack .topbar{background:linear-gradient(180deg,rgba(33,63,102,.82),rgba(16,42,75,.76))}.game-stage.is-blessing.is-blessing-challenge .status-row{display:flex}.game-stage.is-blessing.is-blessing-challenge .progress-track{height:9px}.unlocked-strip img{object-fit:cover}.blessing-entry span::before{content:'✦ ';color:#ffe494}.blessing-continue-btn{font-size:16px}.blessing-message{font-weight:800}
@media(max-width:380px){.blessing-pack-item{grid-template-columns:82px 1fr;min-height:105px}.pack-copy strong{font-size:16px}.pack-copy small{font-size:10px}}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8').replace('jigsaw-drop-h5-v4.1.0','jigsaw-drop-h5-v4.2.0').replace('style.css?v=4.1.0','style.css?v=4.2.0').replace('game.js?v=4.1.0','game.js?v=4.2.0').replace('manifest.webmanifest?v=4.1.0','manifest.webmanifest?v=4.2.0')
SW.write_text(sw,encoding='utf-8')

build=BUILD.read_text(encoding='utf-8')
needle="*((ROOT/'assets'/'blessings-realistic').glob('*.png'))"
if needle not in build: raise SystemExit('standalone asset marker missing')
build=build.replace(needle,needle+",*((ROOT/'assets'/'blessings-v42').glob('*.webp'))",1)
BUILD.write_text(build,encoding='utf-8')
VERSION.write_text('4.2.0\n',encoding='utf-8')
print('patched Jigsaw Drop v4.2 album packs')
