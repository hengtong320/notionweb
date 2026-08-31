#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

# ---------- blessing metadata and a separate, non-overlapping picture pool ----------
marker='  const QUADRANTS = ['
if marker not in s: raise SystemExit('quadrant marker missing')
blessing=r'''  const STANDARD_PICTURE_COUNT=PICTURE_PATHS.length;
  const BLESSING_CARDS=[
    {path:'assets/blessings/01-lotus-sunrise.svg',name:'荷花晨曦',title:'早安',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff7da8',titleColor:'#fff8f4'},
    {path:'assets/blessings/02-trumpet-flower.svg',name:'凌霄花开',title:'早安',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffcc72',titleColor:'#fff7df'},
    {path:'assets/blessings/03-jujube-orchard.svg',name:'枣园丰收',title:'早上好',lines:['喜乐相伴','轻松惬意'],accent:'#f5dd62',titleColor:'#fffef2'},
    {path:'assets/blessings/04-blessing-vase.svg',name:'福气花瓶',title:'早上好',lines:['开心快乐','幸福安康'],accent:'#ffcc72',titleColor:'#fff8ec'},
    {path:'assets/blessings/05-pine-crane.svg',name:'松鹤延年',title:'晨安',lines:['福寿绵长','平安喜乐'],accent:'#f2dc9a',titleColor:'#fffdf4'},
    {path:'assets/blessings/06-peony-gold.svg',name:'花开富贵',title:'吉祥如意',lines:['花开富贵','好运常在'],accent:'#ffd06b',titleColor:'#fff8e7'},
    {path:'assets/blessings/07-moon-osmanthus.svg',name:'月圆桂香',title:'中秋安康',lines:['花好月圆','阖家团圆'],accent:'#ffd86b',titleColor:'#fff8d9'},
    {path:'assets/blessings/08-lantern-festival.svg',name:'灯火佳节',title:'佳节快乐',lines:['家和万事兴','福气常相伴'],accent:'#ffd56a',titleColor:'#fff4db'},
    {path:'assets/blessings/09-chrysanthemum-mountain.svg',name:'菊香重阳',title:'重阳安康',lines:['登高望远','福寿康宁'],accent:'#ffe079',titleColor:'#fff9df'},
    {path:'assets/blessings/10-plum-snow.svg',name:'踏雪寻梅',title:'冬日安好',lines:['岁月静好','温暖常在'],accent:'#ffd4e2',titleColor:'#fff'},
    {path:'assets/blessings/11-fireworks-city.svg',name:'烟火新岁',title:'新年快乐',lines:['万事顺遂','心想事成'],accent:'#ffe36b',titleColor:'#fff'},
    {path:'assets/blessings/12-spring-fortune.svg',name:'新春纳福',title:'新春大吉',lines:['福气满满','阖家安康'],accent:'#ffd36a',titleColor:'#fff8df'}
  ];
  const BLESSING_START=PICTURE_PATHS.length;
  PICTURE_PATHS.push(...BLESSING_CARDS.map(card=>card.path));
  PICTURE_NAMES.push(...BLESSING_CARDS.map(card=>card.name));
  const BLESSING_INDICES=BLESSING_CARDS.map((_,i)=>BLESSING_START+i);
  function isBlessingIndex(index){return Number.isInteger(index)&&index>=BLESSING_START&&index<BLESSING_START+BLESSING_CARDS.length;}
  function blessingMeta(index){return isBlessingIndex(index)?BLESSING_CARDS[index-BLESSING_START]:null;}

'''
if 'const BLESSING_CARDS=' not in s:s=s.replace(marker,blessing+marker,1)

# ---------- DOM hooks ----------
old="""    settingsModal: $('settingsModal'), galleryModal: $('galleryModal'), levelIntro: $('levelIntro'),
    homeSettingsBtn: $('homeSettingsBtn'), homeStars: $('homeStars'), homeLevel: $('homeLevel'), homePreview: $('homePreview'),
    playBtn: $('playBtn'), galleryBtn: $('galleryBtn'), galleryCount: $('galleryCount'), levelNumber: $('levelNumber'),"""
new="""    settingsModal: $('settingsModal'), galleryModal: $('galleryModal'), blessingModal: $('blessingModal'), levelIntro: $('levelIntro'),
    homeSettingsBtn: $('homeSettingsBtn'), homeStars: $('homeStars'), homeLevel: $('homeLevel'), homePreview: $('homePreview'),
    playBtn: $('playBtn'), blessingBtn: $('blessingBtn'), homeWorksBtn: $('homeWorksBtn'), galleryBtn: $('galleryBtn'), galleryCount: $('galleryCount'), levelNumber: $('levelNumber'),"""
if old not in s: raise SystemExit('DOM head mapping missing')
s=s.replace(old,new,1)
old="""    tutorialHand: $('tutorialHand'), timeText: $('timeText'), moveText: $('moveText'), progressBar: $('progressBar'),
    comboToast: $('comboToast'), messageToast: $('messageToast'), winTime: $('winTime'), winMoves: $('winMoves'),
    winCombo: $('winCombo'), starRow: $('starRow'), nextBtn: $('nextBtn'), replayBtn: $('replayBtn'), unlockedStrip: $('unlockedStrip'),
    confettiCanvas: $('confettiCanvas'), soundToggle: $('soundToggle'), vibrationToggle: $('vibrationToggle'),
    resumeBtn: $('resumeBtn'), restartBtn: $('restartBtn'), homeBtn: $('homeBtn'), galleryGrid: $('galleryGrid'),
    introLevel: $('introLevel'), introText: $('introText')"""
new="""    tutorialHand: $('tutorialHand'), timeText: $('timeText'), moveText: $('moveText'), progressBar: $('progressBar'), workBadge: $('workBadge'), workBadgeCount: $('workBadgeCount'),
    comboToast: $('comboToast'), messageToast: $('messageToast'), winTime: $('winTime'), winMoves: $('winMoves'),
    winCombo: $('winCombo'), starRow: $('starRow'), nextBtn: $('nextBtn'), replayBtn: $('replayBtn'), shareWorksBtn: $('shareWorksBtn'), unlockedStrip: $('unlockedStrip'),
    confettiCanvas: $('confettiCanvas'), soundToggle: $('soundToggle'), vibrationToggle: $('vibrationToggle'),
    resumeBtn: $('resumeBtn'), restartBtn: $('restartBtn'), homeBtn: $('homeBtn'), galleryGrid: $('galleryGrid'),
    blessingPreview: $('blessingPreview'), blessingMessage: $('blessingMessage'), blessingThumbs: $('blessingThumbs'), shareBlessingBtn: $('shareBlessingBtn'), downloadBlessingBtn: $('downloadBlessingBtn'), copyBlessingBtn: $('copyBlessingBtn'), blessingPrevBtn: $('blessingPrevBtn'), blessingNextBtn: $('blessingNextBtn'),
    introLevel: $('introLevel'), introText: $('introText')"""
if old not in s: raise SystemExit('DOM tail mapping missing')
s=s.replace(old,new,1)

# ---------- dynamic card aspect ----------
s=s.replace('  const TILE_ASPECT = 0.69;','  const CLASSIC_TILE_ASPECT=0.69;\n  const BLESSING_TILE_ASPECT=0.75;\n  let TILE_ASPECT=CLASSIC_TILE_ASPECT;',1)

# ---------- save model ----------
s=s.replace("      unlocked: [],\n      tutorialSeen: false,","      unlocked: [],\n      blessings: [],\n      blessingLevel: 1,\n      tutorialSeen: false,",1)
s=s.replace("        unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : []","        unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],\n        blessings: Array.isArray(parsed.blessings) ? parsed.blessings.filter(Number.isInteger) : [],\n        blessingLevel: Math.max(1,Number(parsed.blessingLevel)||1)",1)

# ---------- game state ----------
s=s.replace("    level: save.level,\n    phase: 'boot',","    level: save.level,\n    mode: 'classic',\n    shareIndex: null,\n    phase: 'boot',",1)

# ---------- modal routing ----------
s=s.replace("    [dom.settingsModal, dom.galleryModal].forEach((el) => el.classList.toggle('is-visible', el === modal));","    [dom.settingsModal, dom.galleryModal, dom.blessingModal].forEach((el) => el.classList.toggle('is-visible', el === modal));",1)
s=s.replace("    [dom.settingsModal, dom.galleryModal].forEach((el) => el.classList.remove('is-visible'));","    [dom.settingsModal, dom.galleryModal, dom.blessingModal].forEach((el) => el.classList.remove('is-visible'));",1)

# ---------- home, selection, progression ----------
start=s.index('  function updateHome() {')
end=s.index('\n\n  function isHardLevel',start)
new_home=r'''  function updateHome() {
    dom.homeStars.textContent=String(save.totalStars||0);
    dom.homeLevel.textContent=String(save.level||1);
    dom.galleryCount.textContent=`${save.unlocked.filter(i=>i<STANDARD_PICTURE_COUNT).length} / ${STANDARD_PICTURE_COUNT}`;
    const imageIndex=((save.level-1)*5)%STANDARD_PICTURE_COUNT;
    dom.homePreview.innerHTML='';
    for(let q=0;q<4;q++){
      const piece=document.createElement('div');piece.className='preview-piece';piece.style.backgroundImage=`url("${PICTURE_PATHS[imageIndex]}")`;piece.style.backgroundPosition=QUADRANTS[q].bg;dom.homePreview.appendChild(piece);
    }
    if(dom.homeWorksBtn){dom.homeWorksBtn.hidden=save.blessings.length===0;dom.homeWorksBtn.textContent=`我的祝福作品 ${save.blessings.length?`(${save.blessings.length})`:''}`;}
    renderGallery();
  }'''
s=s[:start]+new_home+s[end:]

s=s.replace("  function isHardLevel(level) {\n    return level >= 15 && level % 5 === 0;\n  }","  function isHardLevel(level) {\n    if(game.mode==='blessing')return false;\n    return level>=15&&level%5===0;\n  }",1)
s=s.replace("  function gridForLevel(level) {\n    // Video evidence: L14 is 4x4 / four piles; L15 expands to 5x5 / five piles.\n    return level >= 15 ? 5 : 4;\n  }","  function gridForLevel(level) {\n    if(game.mode==='blessing')return 4;\n    return level>=15?5:4;\n  }",1)
s=s.replace("  function imageCountForLevel(level) {\n    // A saw-tooth difficulty curve:","  function imageCountForLevel(level) {\n    if(game.mode==='blessing')return 6;\n    // A saw-tooth difficulty curve:",1)
sel_start=s.index('  function selectedImagesForLevel(level, count) {')
sel_end=s.index('\n\n  function levelIntroCopy',sel_start)
new_sel=r'''  function selectedImagesForLevel(level,count) {
    if(game.mode==='blessing'){
      const n=BLESSING_INDICES.length,start=((level-1)*6)%n;
      return Array.from({length:Math.min(6,n)},(_,i)=>BLESSING_INDICES[(start+i)%n]);
    }
    const n=STANDARD_PICTURE_COUNT;
    const order=Array.from({length:n},(_,i)=>(11+i*37)%n);
    const start=((level-1)*23)%n;
    return Array.from({length:Math.min(count,n)},(_,i)=>order[(start+i)%n]);
  }'''
s=s[:sel_start]+new_sel+s[sel_end:]
s=s.replace("  function levelIntroCopy(level) {\n    if(level===1)return", "  function levelIntroCopy(level) {\n    if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';\n    if(level===1)return",1)
s=s.replace("    const seed = (level * 2654435761 + 9109) >>> 0;","    const seed=((game.mode==='blessing'?0xB1E55100:0)+(level*2654435761+9109))>>>0;",1)

# ---------- HUD blessing collection ----------
hud_marker="    if(dom.flowText)dom.flowText.textContent=game.feverActive?'FEVER':`${Math.round(game.flowEnergy)}%`;\n"
if hud_marker not in s: raise SystemExit('HUD insertion marker missing')
hud_extra=r'''    if(dom.workBadge){
      const count=game.clearedImages.filter(isBlessingIndex).length;
      dom.workBadge.hidden=game.mode!=='blessing';
      if(dom.workBadgeCount)dom.workBadgeCount.textContent=String(count);
    }
'''
s=s.replace(hud_marker,hud_marker+hud_extra,1)

# Classic tutorial should not be consumed by a blessing round.
s=s.replace("    if (!save.tutorialSeen && game.level===1) {","    if (!save.tutorialSeen&&game.level===1&&game.mode==='classic') {",1)

# ---------- complete image reveal + immediate blessing unlock ----------
old="""      overlay.style.backgroundImage=`url(\"${PICTURE_PATHS[group.imageIndex]}\")`;overlay.style.animationDuration=`${Math.max(330,650-tier*55)}ms`;dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      if(!game.clearedImages.includes(group.imageIndex))game.clearedImages.push(group.imageIndex);
      if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);"""
new="""      overlay.style.backgroundImage=`url(\"${PICTURE_PATHS[group.imageIndex]}\")`;overlay.style.animationDuration=`${Math.max(330,650-tier*55)}ms`;
      if(game.mode==='blessing'){
        const meta=blessingMeta(group.imageIndex);if(meta){const lock=document.createElement('div');lock.className='blessing-lockup';lock.innerHTML=`<strong>${meta.title}</strong><span>${meta.lines.join(' · ')}</span>`;overlay.appendChild(lock);}
      }
      dom.fxLayer.appendChild(overlay);overlays.push(overlay);
      if(!game.clearedImages.includes(group.imageIndex))game.clearedImages.push(group.imageIndex);
      if(game.mode==='blessing'){
        if(!save.blessings.includes(group.imageIndex)){save.blessings.push(group.imageIndex);persist();updateHome();}
      }else if(!save.unlocked.includes(group.imageIndex)&&!game.unlockedThisLevel.includes(group.imageIndex))game.unlockedThisLevel.push(group.imageIndex);"""
if old not in s: raise SystemExit('animateAndClear marker missing')
s=s.replace(old,new,1)
s=s.replace("    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();","    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();updateHud();",1)

# ---------- start mode ----------
s=s.replace("    game.level=Math.max(1,level);\n    configureGrid(gridForLevel(game.level));","    game.level=Math.max(1,level);\n    TILE_ASPECT=game.mode==='blessing'?BLESSING_TILE_ASPECT:CLASSIC_TILE_ASPECT;\n    configureGrid(gridForLevel(game.level));",1)
s=s.replace("    const hard=isHardLevel(game.level);\n    const stage=document.getElementById('gameStage');stage?.classList.toggle('is-hard',hard);","    const hard=isHardLevel(game.level);\n    const stage=document.getElementById('gameStage');stage?.classList.toggle('is-hard',hard);stage?.classList.toggle('is-blessing',game.mode==='blessing');",1)
s=s.replace("    const titleLabel=title?.querySelector('span');if(titleLabel)titleLabel.textContent=hard?'困难':'关卡';","    const titleLabel=title?.querySelector('span');if(titleLabel)titleLabel.textContent=game.mode==='blessing'?'祝福':(hard?'困难':'关卡');",1)
old_tutorial="""    if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}
    else{dom.tutorialHand.classList.remove('is-visible');if(game.level===3)showToast('看牌堆下一张：先完成上层图片，试着触发二连锁',3300);else if(game.level===5)showToast('三连锁教学：提前留好落点，连得越多反馈越强',3400);}"""
new_tutorial="""    if(game.mode==='blessing'){dom.tutorialHand.classList.remove('is-visible');showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);}
    else if(game.level===1&&!save.tutorialSeen){dom.tutorialHand.classList.add('is-visible');showToast('先拖动一块碎片，和同一张图拼起来',3000);}
    else{dom.tutorialHand.classList.remove('is-visible');if(game.level===3)showToast('看牌堆下一张：先完成上层图片，试着触发二连锁',3300);else if(game.level===5)showToast('三连锁教学：提前留好落点，连得越多反馈越强',3400);}"""
if old_tutorial not in s: raise SystemExit('tutorial block missing')
s=s.replace(old_tutorial,new_tutorial,1)

# ---------- mode-aware finish screen ----------
fs=s.index('  async function finishLevel() {')
fe=s.index('\n\n  function startConfetti()',fs)
new_finish=r'''  async function finishLevel() {
    game.phase='won';pauseTimer();audio.win();haptic([30,45,30,45,70]);await delay(420);
    const elapsed=currentElapsed(),stars=calculateStars(),blessing=game.mode==='blessing';
    if(blessing){
      save.blessingLevel=Math.max(save.blessingLevel||1,game.level+1);
      game.clearedImages.filter(isBlessingIndex).forEach(index=>{if(!save.blessings.includes(index))save.blessings.push(index);});
    }else{
      const oldStars=save.stars[game.level]||0;save.stars[game.level]=Math.max(oldStars,stars);save.totalStars=Object.values(save.stars).reduce((a,b)=>a+Number(b||0),0);
      const oldBest=save.best[game.level];if(!oldBest||elapsed<oldBest.time)save.best[game.level]={time:Math.round(elapsed),moves:game.moves};
      for(const imageIndex of game.unlockedThisLevel)if(!save.unlocked.includes(imageIndex))save.unlocked.push(imageIndex);
      save.level=Math.max(save.level,game.level+1);
    }
    persist();
    const heading=dom.winScreen.querySelector('h2');if(heading)heading.textContent=blessing?'祝福作品完成':'关卡完成';
    dom.nextBtn.textContent=blessing?'下一组祝福':'下一关';dom.shareWorksBtn.hidden=!blessing;
    dom.winTime.textContent=formatTime(elapsed);dom.winMoves.textContent=String(game.moves);dom.winCombo.textContent=String(game.comboMax);
    [...dom.starRow.children].forEach((el,i)=>{el.classList.toggle('is-on',i<stars);el.style.animationDelay=`${i*120}ms`;});
    dom.unlockedStrip.innerHTML='';
    const shown=(blessing?game.clearedImages:(game.unlockedThisLevel.length?game.unlockedThisLevel:game.clearedImages)).slice(-6);
    shown.forEach(idx=>{const img=document.createElement('img');img.src=PICTURE_PATHS[idx];img.alt=PICTURE_NAMES[idx];img.addEventListener('click',()=>{if(blessing)openBlessingWorks(idx);});dom.unlockedStrip.appendChild(img);});
    dom.winScreen.classList.add('is-visible');startConfetti();updateHome();
  }'''
s=s[:fs]+new_finish+s[fe:]

# ---------- normal gallery remains focused on the original game collection ----------
s=s.replace("    PICTURE_PATHS.forEach((src,index)=>{","    PICTURE_PATHS.slice(0,STANDARD_PICTURE_COUNT).forEach((src,index)=>{",1)

# ---------- poster builder, collection modal, download/share ----------
bind=s.index('  function bindEvents() {')
poster=r'''  function unlockedBlessingIndices(){return [...new Set(save.blessings.filter(isBlessingIndex))];}

  function loadPosterImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}

  function drawPosterText(ctx,text,x,y,maxWidth,fontSize,lineHeight){
    const chars=[...text];let line='',lines=[];
    for(const ch of chars){const test=line+ch;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=ch;}else line=test;}
    if(line)lines.push(line);lines.forEach((value,i)=>ctx.fillText(value,x,y+i*lineHeight));return lines.length;
  }

  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.drawImage(img,0,0,1080,1440);
    const top=ctx.createLinearGradient(0,0,0,430);top.addColorStop(0,'rgba(13,20,42,.40)');top.addColorStop(1,'rgba(13,20,42,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,470);
    const bottom=ctx.createLinearGradient(0,880,0,1440);bottom.addColorStop(0,'rgba(16,18,32,0)');bottom.addColorStop(.38,'rgba(16,18,32,.34)');bottom.addColorStop(1,'rgba(16,18,32,.68)');ctx.fillStyle=bottom;ctx.fillRect(0,820,1080,620);
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
    ctx.font='900 150px "PingFang SC","Microsoft YaHei",sans-serif';ctx.strokeStyle='rgba(32,30,45,.70)';ctx.lineWidth=20;ctx.strokeText(meta.title,540,205);ctx.fillStyle=meta.titleColor;ctx.fillText(meta.title,540,205);
    ctx.font='800 65px "PingFang SC","Microsoft YaHei",sans-serif';ctx.lineWidth=12;ctx.strokeStyle='rgba(28,24,38,.72)';ctx.fillStyle='#fffdf5';
    let y=1130;for(const line of meta.lines){ctx.strokeText(line,540,y);ctx.fillText(line,540,y);y+=92;}
    ctx.fillStyle=meta.accent;ctx.fillRect(390,1300,300,5);
    ctx.font='500 30px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillText('拼图完成 · 把这份祝福送给重要的人',540,1360);
    return canvas;
  }

  async function posterBlob(index){const canvas=await renderBlessingPoster(index);return await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));}

  async function refreshBlessingModal(index){
    const unlocked=unlockedBlessingIndices();if(!unlocked.length)return;
    if(!unlocked.includes(index))index=unlocked[0];game.shareIndex=index;
    const meta=blessingMeta(index);dom.blessingMessage.textContent=`${meta.title} · ${meta.lines.join('，')}`;
    dom.blessingPreview.classList.add('is-loading');const canvas=await renderBlessingPoster(index);dom.blessingPreview.src=canvas.toDataURL('image/jpeg',.92);dom.blessingPreview.alt=`${meta.name}祝福作品`;dom.blessingPreview.classList.remove('is-loading');
    dom.blessingThumbs.innerHTML='';unlocked.forEach(i=>{const button=document.createElement('button');button.className='blessing-thumb'+(i===index?' is-active':'');const img=document.createElement('img');img.src=PICTURE_PATHS[i];img.alt=PICTURE_NAMES[i];button.appendChild(img);button.addEventListener('click',()=>refreshBlessingModal(i));dom.blessingThumbs.appendChild(button);});
  }

  function openBlessingWorks(preferred=null){
    const unlocked=unlockedBlessingIndices();if(!unlocked.length){showToast('先完成一张祝福拼图，就能生成可分享作品',2200);return;}
    showModal(dom.blessingModal);refreshBlessingModal(preferred&&unlocked.includes(preferred)?preferred:unlocked[unlocked.length-1]).catch(()=>showToast('作品生成失败，请重试'));
  }

  function shiftBlessing(delta){const unlocked=unlockedBlessingIndices();if(!unlocked.length)return;const current=Math.max(0,unlocked.indexOf(game.shareIndex)),next=(current+delta+unlocked.length)%unlocked.length;refreshBlessingModal(unlocked[next]);}

  async function downloadBlessing(){
    const index=game.shareIndex;if(!isBlessingIndex(index))return;const blob=await posterBlob(index);if(!blob)return;
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${blessingMeta(index).title}-${blessingMeta(index).name}.png`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);showToast('祝福图片已生成');
  }

  async function shareBlessing(){
    const index=game.shareIndex;if(!isBlessingIndex(index))return;const meta=blessingMeta(index),blob=await posterBlob(index);if(!blob)return;
    const file=new File([blob],`${meta.title}-${meta.name}.png`,{type:'image/png'}),text=`${meta.title}！${meta.lines.join('，')}。`;
    try{
      if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:meta.title,text,files:[file]});return;}
    }catch(error){if(error?.name==='AbortError')return;}
    await downloadBlessing();
  }

  async function copyBlessing(){
    const meta=blessingMeta(game.shareIndex);if(!meta)return;const text=`${meta.title}！${meta.lines.join('，')}。`;
    try{await navigator.clipboard.writeText(text);showToast('祝福语已复制');}catch(_){showToast(text,2600);}
  }

'''
s=s[:bind]+poster+s[bind:]

# ---------- event routing ----------
s=s.replace("    dom.playBtn.addEventListener('click',()=>{audio.tap();startLevel(save.level);});","    dom.playBtn.addEventListener('click',()=>{audio.tap();game.mode='classic';startLevel(save.level);});\n    dom.blessingBtn.addEventListener('click',()=>{audio.tap();game.mode='blessing';startLevel(save.blessingLevel||1);});\n    dom.homeWorksBtn.addEventListener('click',()=>{audio.tap();openBlessingWorks();});",1)
s=s.replace("    dom.nextBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level+1);});","    dom.nextBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level+1);});\n    dom.shareWorksBtn.addEventListener('click',()=>{audio.tap();openBlessingWorks();});\n    dom.workBadge.addEventListener('click',()=>{audio.tap();openBlessingWorks();});",1)
s=s.replace("    dom.replayBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level);});","    dom.replayBtn.addEventListener('click',()=>{audio.tap();dom.winScreen.classList.remove('is-visible');startLevel(game.level);});\n    dom.shareBlessingBtn.addEventListener('click',()=>{audio.tap();shareBlessing();});\n    dom.downloadBlessingBtn.addEventListener('click',()=>{audio.tap();downloadBlessing();});\n    dom.copyBlessingBtn.addEventListener('click',()=>{audio.tap();copyBlessing();});\n    dom.blessingPrevBtn.addEventListener('click',()=>{audio.tap();shiftBlessing(-1);});dom.blessingNextBtn.addEventListener('click',()=>{audio.tap();shiftBlessing(1);});",1)
s=s.replace("    [dom.settingsModal,dom.galleryModal].forEach((layer)=>layer.addEventListener('pointerdown',","    [dom.settingsModal,dom.galleryModal,dom.blessingModal].forEach((layer)=>layer.addEventListener('pointerdown',",1)

# ---------- boot direct URL ----------
old_boot="""    const requested=Number(new URLSearchParams(location.search).get('level'));
    if(Number.isInteger(requested)&&requested>0){await startLevel(requested);return;}"""
new_boot="""    const params=new URLSearchParams(location.search),requested=Number(params.get('level'));
    game.mode=params.get('mode')==='blessing'?'blessing':'classic';
    if(Number.isInteger(requested)&&requested>0){await startLevel(requested);return;}"""
if old_boot not in s: raise SystemExit('boot query marker missing')
s=s.replace(old_boot,new_boot,1)
s=s.replace("await preloadImages([((save.level-1)*5)%PICTURE_PATHS.length]);","await preloadImages([((save.level-1)*5)%STANDARD_PICTURE_COUNT]);",1)

# ---------- debug/test exports ----------
s=s.replace("startFever,endFever};","startFever,endFever,renderBlessingPoster,openBlessingWorks,blessingMeta,isBlessingIndex,blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT};",1)
GAME.write_text(s,encoding='utf-8')

# ---------- HTML ----------
h=INDEX.read_text(encoding='utf-8')
h=h.replace('''          <button id="galleryBtn" class="secondary-btn">图片图鉴 <span id="galleryCount">0 / 60</span></button>''','''          <button id="galleryBtn" class="secondary-btn">图片图鉴 <span id="galleryCount">0 / 60</span></button>
          <button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>
          <button id="homeWorksBtn" class="text-btn blessing-works-link" hidden>我的祝福作品</button>''',1)
h=h.replace('''          <div class="status-row">
            <div class="status-item"><span class="status-icon clock-icon"></span><strong id="timeText">00:00</strong></div>
            <div class="progress-track"><i id="progressBar"></i></div>
            <div class="status-item"><span class="status-icon move-icon"></span><strong id="moveText">0</strong></div>
          </div>''','''          <div class="status-row">
            <div class="status-item"><span class="status-icon clock-icon"></span><strong id="timeText">00:00</strong></div>
            <div class="progress-track"><i id="progressBar"></i></div>
            <div class="status-item"><span class="status-icon move-icon"></span><strong id="moveText">0</strong></div>
          </div>
          <button id="workBadge" class="work-badge" hidden>祝福作品 <b id="workBadgeCount">0</b>/6</button>''',1)
h=h.replace('''          <button id="nextBtn" class="primary-btn next-btn">下一关</button>
          <button id="replayBtn" class="text-btn">再玩一次</button>''','''          <button id="nextBtn" class="primary-btn next-btn">下一关</button>
          <button id="shareWorksBtn" class="secondary-btn share-works-btn" hidden>查看并分享祝福作品</button>
          <button id="replayBtn" class="text-btn">再玩一次</button>''',1)
modal='''
      <section id="blessingModal" class="modal-layer" aria-label="祝福作品">
        <div class="modal-card blessing-modal-card">
          <button class="modal-close" data-close-modal aria-label="关闭">×</button>
          <div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div><div class="blessing-nav"><button id="blessingPrevBtn" aria-label="上一张">‹</button><button id="blessingNextBtn" aria-label="下一张">›</button></div></div>
          <p id="blessingMessage" class="blessing-message"></p>
          <div class="blessing-preview-shell"><img id="blessingPreview" alt="祝福作品预览" /></div>
          <div id="blessingThumbs" class="blessing-thumbs"></div>
          <div class="blessing-actions"><button id="shareBlessingBtn" class="primary-btn">分享图片</button><button id="downloadBlessingBtn" class="secondary-btn">保存图片</button><button id="copyBlessingBtn" class="text-btn">复制祝福语</button></div>
          <p class="blessing-note">浏览器支持时会直接调起系统分享；否则自动生成图片供保存。</p>
        </div>
      </section>

'''
if 'id="blessingModal"' not in h:h=h.replace('      <section id="levelIntro"',modal+'      <section id="levelIntro"',1)
h=h.replace('manifest.webmanifest?v=3.8.0','manifest.webmanifest?v=3.9.0').replace('style.css?v=3.8.0','style.css?v=3.9.0').replace('game.js?v=3.8.0','game.js?v=3.9.0')
INDEX.write_text(h,encoding='utf-8')

# ---------- CSS ----------
css=CSS.read_text(encoding='utf-8')
css+=r'''

/* v3.9-blessing-share-mode */
.blessing-entry{width:100%;border:0;border-radius:18px;padding:13px 18px;background:linear-gradient(135deg,#ff8b99,#ffbf69);color:#fff;box-shadow:0 9px 20px rgba(136,45,79,.25),inset 0 1px rgba(255,255,255,.55);font:900 17px/1.1 inherit;display:flex;align-items:center;justify-content:space-between;gap:10px;cursor:pointer;text-shadow:0 1px 2px rgba(87,24,45,.24)}
.blessing-entry small{font-size:10px;font-weight:750;opacity:.92;text-align:right;line-height:1.3}.blessing-works-link{margin-top:-5px;color:#fff4c7!important;text-decoration:underline;text-underline-offset:3px}
.game-stage.is-blessing{background:radial-gradient(circle at 50% 0,#ffdbcf 0,#5bcbe3 34%,#076ad1 100%)}.game-stage.is-blessing .deck-stack{filter:hue-rotate(315deg) saturate(1.25)}
.work-badge{margin:-2px auto 1px;border:1px solid rgba(255,255,255,.74);background:rgba(255,119,143,.82);color:#fff;border-radius:999px;padding:6px 14px;font:800 12px/1 inherit;box-shadow:0 4px 12px rgba(36,66,121,.22);backdrop-filter:blur(8px)}.work-badge b{font-size:15px;color:#fff8a5}
.blessing-lockup{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:8% 5% 7%;pointer-events:none;text-align:center;text-shadow:0 2px 8px rgba(17,22,49,.75)}.blessing-lockup strong{font-size:clamp(20px,5.3vw,35px);font-weight:950;color:#fff8e9;-webkit-text-stroke:1px rgba(80,31,50,.4)}.blessing-lockup span{font-size:clamp(9px,2.3vw,14px);font-weight:900;color:#fff;letter-spacing:.04em;background:rgba(20,24,45,.28);padding:4px 8px;border-radius:999px;backdrop-filter:blur(4px)}
.share-works-btn{margin-top:8px!important;background:linear-gradient(135deg,#ff8b99,#ffbf69)!important;color:#fff!important;border:0!important}
.blessing-modal-card{width:min(92vw,430px);max-height:min(92vh,820px);overflow:auto;padding:20px 18px 16px;background:linear-gradient(180deg,#fffaf7,#fff0e6)}.blessing-modal-head{display:flex;justify-content:space-between;align-items:flex-start;text-align:left}.blessing-modal-head small{color:#b56a6d;font-weight:800}.blessing-modal-head h2{margin:2px 0 0;color:#773b50}.blessing-nav{display:flex;gap:6px;margin-right:32px}.blessing-nav button{width:34px;height:34px;border:0;border-radius:50%;background:#fff;color:#b94f68;font-size:25px;box-shadow:0 3px 10px rgba(112,56,75,.15)}
.blessing-message{margin:8px 0 11px;color:#8e5060;font-weight:800;font-size:13px}.blessing-preview-shell{width:min(72vw,300px);aspect-ratio:3/4;margin:0 auto;border-radius:18px;padding:5px;background:linear-gradient(145deg,#fff,#ffdcae);box-shadow:0 12px 28px rgba(86,47,66,.22);overflow:hidden}.blessing-preview-shell img{display:block;width:100%;height:100%;object-fit:cover;border-radius:14px;background:#eee;transition:opacity .18s}.blessing-preview-shell img.is-loading{opacity:.35}
.blessing-thumbs{display:flex;gap:7px;overflow-x:auto;padding:12px 2px 5px;scrollbar-width:none}.blessing-thumbs::-webkit-scrollbar{display:none}.blessing-thumb{flex:0 0 46px;aspect-ratio:3/4;border:2px solid transparent;border-radius:9px;padding:0;overflow:hidden;background:#fff;opacity:.68}.blessing-thumb.is-active{border-color:#ff728e;opacity:1;transform:translateY(-2px)}.blessing-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.blessing-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.blessing-actions .text-btn{grid-column:1/-1;color:#8f5160}.blessing-actions button{min-height:42px}.blessing-note{font-size:10px!important;color:#a07b81!important;margin:7px 0 0!important}
.unlocked-strip img{cursor:pointer}
@media(max-height:720px){.blessing-modal-card{padding-top:14px}.blessing-preview-shell{width:min(58vw,240px)}.blessing-thumbs{padding-top:8px}}
'''
CSS.write_text(css,encoding='utf-8')

# ---------- offline asset embedding ----------
b=STANDALONE.read_text(encoding='utf-8')
b=b.replace("*((ROOT/'assets'/'pictures-extra').glob('*.svg'))]","*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg'))]",1)
STANDALONE.write_text(b,encoding='utf-8')

# ---------- cache bust ----------
sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v3.9.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=3.9.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=3.9.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=3.9.0',sw)
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('3.9.0\n',encoding='utf-8')
print('patched v3.9 blessing puzzle/share mode')
