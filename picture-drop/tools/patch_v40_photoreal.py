#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

# Replace the illustrated blessing pack with six text-free, photorealistic source images.
# Copy is added only after the puzzle is completed, so the board remains a visual puzzle.
pattern=r"  const BLESSING_CARDS=\[.*?\n  \];\n  const BLESSING_START"
replacement=r'''  const BLESSING_CARDS=[
    {path:'assets/blessings-realistic/01-lotus-sunrise.webp',name:'荷塘晨曦',title:'早安',english:'GOOD MORNING',lines:['岁岁安康','日日舒心顺遂'],accent:'#ffb0c7',titleColor:'#fffaf7',layout:{align:'center',x:540,titleY:168,englishY:264,linesY:1115,shade:'top-bottom',maxWidth:900}},
    {path:'assets/blessings-realistic/02-trumpet-flower.webp',name:'凌霄花开',title:'早安',english:'A BEAUTIFUL DAY',lines:['花开见喜','天天好心情'],accent:'#ffd37a',titleColor:'#fff9e9',layout:{align:'left',x:88,titleY:174,englishY:270,linesY:1110,shade:'bottom-left',maxWidth:780}},
    {path:'assets/blessings-realistic/03-jujube-orchard.webp',name:'枣园丰收',title:'早上好',english:'GOOD MORNING',lines:['喜乐相伴','健康平安'],accent:'#ffe57a',titleColor:'#fffdf2',layout:{align:'left',x:88,titleY:168,englishY:268,linesY:1120,shade:'top-bottom',maxWidth:820}},
    {path:'assets/blessings-realistic/04-elegant-woman.webp',name:'清晨花语',title:'晨安',english:'MORNING WISHES',lines:['清晨的问候是祝福','愿你每天快乐幸福'],accent:'#ffd0df',titleColor:'#fffafc',layout:{align:'left',x:78,titleY:166,englishY:264,linesY:915,shade:'left',maxWidth:590}},
    {path:'assets/blessings-realistic/05-blessing-vase.webp',name:'福气花瓶',title:'早安',english:'GOOD MORNING',lines:['开心快乐','幸福安康'],accent:'#ffd47f',titleColor:'#fffaf2',layout:{align:'center',x:540,titleY:160,englishY:258,linesY:1118,shade:'top-bottom',maxWidth:860}},
    {path:'assets/blessings-realistic/06-pine-crane.webp',name:'松鹤晨光',title:'晨安',english:'PEACE & HEALTH',lines:['福寿绵长','平安喜乐'],accent:'#ffe4a0',titleColor:'#fffdf5',layout:{align:'right',x:992,titleY:158,englishY:254,linesY:1115,shade:'top-bottom',maxWidth:820}}
  ];
  const BLESSING_START'''
s,n=re.subn(pattern,replacement,s,count=1,flags=re.S)
if n!=1: raise SystemExit('BLESSING_CARDS block not found')

# Scheme-B messaging and a photo-backed entry point.
s=s.replace("if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';",
            "if(game.mode==='blessing')return '先拼无字写实美图，完成后自动生成精美祝福海报';",1)
s=s.replace("showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);",
            "showToast('游戏里拼无字写实美图，完成后自动加祝福语并生成海报',3600);",1)
s=s.replace("dom.homeWorksBtn.textContent=`我的祝福作品 ${save.blessings.length?`(${save.blessings.length})`:''}`;",
            "dom.homeWorksBtn.textContent=`我的写实祝福作品 ${save.blessings.length?`(${save.blessings.length})`:''}`;",1)
s=s.replace("if(dom.homeWorksBtn){dom.homeWorksBtn.hidden=save.blessings.length===0;dom.homeWorksBtn.textContent=`我的写实祝福作品 ${save.blessings.length?`(${save.blessings.length})`:''}`;}",
            "if(dom.homeWorksBtn){dom.homeWorksBtn.hidden=save.blessings.length===0;dom.homeWorksBtn.textContent=`我的写实祝福作品 ${save.blessings.length?`(${save.blessings.length})`:''}`;}\n    if(dom.blessingBtn){dom.blessingBtn.style.backgroundImage=`linear-gradient(90deg,rgba(3,42,45,.84),rgba(4,69,66,.35)),url(\"${PICTURE_PATHS[BLESSING_START]}\")`;}",1)
s=s.replace("heading.textContent=blessing?'祝福作品完成':'关卡完成'","heading.textContent=blessing?'写实祝福作品完成':'关卡完成'",1)
s=s.replace("dom.nextBtn.textContent=blessing?'下一组祝福':'下一关'","dom.nextBtn.textContent=blessing?'再拼一组祝福':'下一关'",1)

# Save every completed blessing immediately, not only after the entire six-image round.
clear_marker="    game.clearedCount+=groups.length;game.movesSinceClear=0;renderBoard();\n"
clear_replacement="""    game.clearedCount+=groups.length;game.movesSinceClear=0;
    if(game.mode==='blessing'){
      let added=0;
      groups.forEach(group=>{const index=group.imageIndex;if(isBlessingIndex(index)&&!save.blessings.includes(index)){save.blessings.push(index);added++;}});
      if(added){persist();showToast(`已生成 ${added} 张写实祝福作品`,1050);}
    }
    renderBoard();
"""
if clear_marker not in s: raise SystemExit('clear persistence marker missing')
s=s.replace(clear_marker,clear_replacement,1)

# Replace the basic poster compositor with adaptive Scheme-B typography and shading.
poster_start=s.index('  function drawPosterText(')
poster_end=s.index('\n\n  async function posterBlob',poster_start)
poster_code=r'''  function posterDateLabel(){
    try{return new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date());}
    catch(_){return '';}
  }

  function roundedRectPath(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }

  function posterGradient(ctx,meta){
    const shade=meta.layout?.shade||'top-bottom';
    if(shade.includes('top')){
      const g=ctx.createLinearGradient(0,0,0,470);g.addColorStop(0,'rgba(10,18,28,.62)');g.addColorStop(.58,'rgba(10,18,28,.20)');g.addColorStop(1,'rgba(10,18,28,0)');ctx.fillStyle=g;ctx.fillRect(0,0,1080,500);
    }
    if(shade.includes('bottom')){
      const g=ctx.createLinearGradient(0,780,0,1440);g.addColorStop(0,'rgba(12,17,25,0)');g.addColorStop(.40,'rgba(12,17,25,.30)');g.addColorStop(1,'rgba(9,13,21,.76)');ctx.fillStyle=g;ctx.fillRect(0,720,1080,720);
    }
    if(shade.includes('left')){
      const g=ctx.createLinearGradient(0,0,720,0);g.addColorStop(0,'rgba(14,17,28,.68)');g.addColorStop(.56,'rgba(14,17,28,.20)');g.addColorStop(1,'rgba(14,17,28,0)');ctx.fillStyle=g;ctx.fillRect(0,0,760,1440);
    }
    if(shade.includes('right')){
      const g=ctx.createLinearGradient(1080,0,360,0);g.addColorStop(0,'rgba(14,17,28,.68)');g.addColorStop(.58,'rgba(14,17,28,.18)');g.addColorStop(1,'rgba(14,17,28,0)');ctx.fillStyle=g;ctx.fillRect(320,0,760,1440);
    }
    const vignette=ctx.createRadialGradient(540,640,360,540,640,940);vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(0,0,0,.18)');ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1440);
  }

  function fitPosterFont(ctx,text,maxWidth,start,min,weight='800'){
    let size=start;while(size>min){ctx.font=`${weight} ${size}px "PingFang SC","Microsoft YaHei",sans-serif`;if(ctx.measureText(text).width<=maxWidth)break;size-=2;}return size;
  }

  function drawOutlinedPosterText(ctx,text,x,y,maxWidth,startSize,fill,stroke,align='center',weight='800'){
    const size=fitPosterFont(ctx,text,maxWidth,startSize,36,weight);ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';ctx.lineWidth=Math.max(8,size*.105);ctx.strokeStyle=stroke;ctx.fillStyle=fill;ctx.shadowColor='rgba(0,0,0,.28)';ctx.shadowBlur=9;ctx.shadowOffsetY=4;ctx.strokeText(text,x,y);ctx.fillText(text,x,y);ctx.shadowColor='transparent';return size;
  }

  function drawPosterSpark(ctx,x,y,r,color){
    ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,-r);ctx.quadraticCurveTo(r*.18,-r*.18,r,0);ctx.quadraticCurveTo(r*.18,r*.18,0,r);ctx.quadraticCurveTo(-r*.18,r*.18,-r,0);ctx.quadraticCurveTo(-r*.18,-r*.18,0,-r);ctx.fill();ctx.restore();
  }

  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,0,0,1080,1440);posterGradient(ctx,meta);
    const layout=meta.layout||{},align=layout.align||'center',x=layout.x??540,maxWidth=layout.maxWidth??880;

    const date=posterDateLabel();
    if(date){
      ctx.font='600 30px "PingFang SC","Microsoft YaHei",sans-serif';const w=ctx.measureText(date).width+52;
      const chipX=align==='right'?x-w:align==='left'?x:x-w/2;roundedRectPath(ctx,chipX,74,w,54,27);ctx.fillStyle='rgba(8,20,28,.42)';ctx.fill();ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='rgba(255,255,255,.92)';ctx.fillText(date,chipX+w/2,101);
    }

    drawOutlinedPosterText(ctx,meta.title,x,layout.titleY??170,maxWidth,154,meta.titleColor||'#fffdf7','rgba(39,22,26,.70)',align,'900');
    if(meta.english){ctx.textAlign=align;ctx.textBaseline='middle';ctx.font='italic 700 43px Georgia,"Times New Roman",serif';ctx.fillStyle=meta.accent||'#ffe4a8';ctx.shadowColor='rgba(0,0,0,.42)';ctx.shadowBlur=8;ctx.shadowOffsetY=3;ctx.fillText(meta.english,x,layout.englishY??270);ctx.shadowColor='transparent';}

    const lineY=layout.linesY??1110,lineGap=92;
    meta.lines.forEach((line,i)=>drawOutlinedPosterText(ctx,line,x,lineY+i*lineGap,maxWidth,70,'#fffdf7','rgba(40,22,27,.78)',align,'850'));

    const ruleY=lineY+meta.lines.length*lineGap+8;
    ctx.strokeStyle=meta.accent||'#ffd98a';ctx.lineWidth=5;ctx.globalAlpha=.95;ctx.beginPath();
    if(align==='left'){ctx.moveTo(x,ruleY);ctx.lineTo(Math.min(1010,x+330),ruleY);}else if(align==='right'){ctx.moveTo(Math.max(70,x-330),ruleY);ctx.lineTo(x,ruleY);}else{ctx.moveTo(x-170,ruleY);ctx.lineTo(x+170,ruleY);}ctx.stroke();ctx.globalAlpha=1;
    drawPosterSpark(ctx,align==='left'?Math.min(1020,x+360):align==='right'?Math.max(60,x-360):x+205,ruleY,17,meta.accent||'#fff0a8');
    drawPosterSpark(ctx,align==='left'?Math.min(1040,x+405):align==='right'?Math.max(40,x-405):x+250,ruleY-32,8,'rgba(255,255,255,.95)');

    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='500 28px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.82)';ctx.fillText('亲手拼出的美好 · 送给重要的人',540,1384);
    return canvas;
  }'''
s=s[:poster_start]+poster_code+s[poster_end:]

# Cache bust and expose the scheme metadata for browser regression tests.
s=s.replace('blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT}',
            'blessingCount:BLESSING_CARDS.length,standardPictureCount:STANDARD_PICTURE_COUNT,blessingCards:BLESSING_CARDS,schemeB:true}',1)
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
                '<button id="blessingBtn" class="blessing-entry scheme-b"><b>方案 B · 写实</b><span>写实祝福拼图</span><small>先拼无字美图 · 完成后生成祝福海报</small></button>')
idx=idx.replace('<div class="blessing-modal-head"><div><small>拼图生成作品</small><h2>我的祝福卡</h2></div>',
                '<div class="blessing-modal-head"><div><small>写实美图 · 自动生成文案</small><h2>我的祝福作品</h2></div>')
idx=idx.replace('浏览器支持时会直接调起系统分享；否则自动生成图片供保存。','游戏中拼的是无字写实底图；完成后自动生成带文案的高清祝福海报。')
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css += r'''

/* v4.0-scheme-b-photoreal */
.blessing-entry.scheme-b{min-height:86px;background-size:cover;background-position:center 58%;border:1px solid rgba(255,232,165,.86);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),0 10px 24px rgba(2,42,71,.27);padding:12px 16px 12px 94px;text-align:left;position:relative;isolation:isolate}
.blessing-entry.scheme-b::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,20,28,.42))}
.blessing-entry.scheme-b b{display:inline-flex;padding:3px 8px;border-radius:999px;background:linear-gradient(180deg,#ffe7a9,#efb852);color:#664008;font-size:10px;letter-spacing:.8px;text-shadow:none;box-shadow:0 2px 7px rgba(0,0,0,.18);margin-bottom:4px}
.blessing-entry.scheme-b span{display:block;font-size:19px;font-weight:950;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.66)}
.blessing-entry.scheme-b small{display:block;margin-top:3px;color:rgba(255,255,255,.92);font-size:11px;text-shadow:0 1px 5px rgba(0,0,0,.68)}
.game-stage.is-blessing{background:radial-gradient(circle at 50% 14%,rgba(80,219,196,.42),transparent 33%),linear-gradient(180deg,#0b8b9c 0%,#066d91 23%,#075d86 55%,#083f66 100%)}
.game-stage.is-blessing .topbar{background:linear-gradient(180deg,#6fe7da 0%,#37c7c3 70%,#23aaa9 100%);border-bottom-color:rgba(8,91,100,.55)}
.game-stage.is-blessing .board{background:linear-gradient(180deg,rgba(6,57,77,.74),rgba(4,41,61,.88));box-shadow:inset 0 0 0 2px rgba(255,232,176,.30),0 14px 30px rgba(1,27,49,.34)}
.game-stage.is-blessing .tile{border-color:rgba(255,248,225,.92);box-shadow:0 1px 3px rgba(0,23,40,.30)}
.game-stage.is-blessing .joined-surface{filter:saturate(1.025) contrast(1.015)}
.game-stage.is-blessing .work-badge{background:linear-gradient(180deg,#ffe2a2,#e6ab42);color:#66420b;border-color:rgba(255,255,255,.76);text-shadow:none;box-shadow:0 5px 12px rgba(0,35,55,.25)}
.blessing-preview-shell{background:linear-gradient(145deg,#f8e7c6,#c79345);padding:4px;box-shadow:0 12px 28px rgba(0,25,52,.34)}
.blessing-preview-shell img{display:block;background:#132832}
.blessing-thumb{border-color:rgba(236,189,92,.42)}
.blessing-thumb.is-active{border-color:#ffd26f;box-shadow:0 0 0 2px rgba(255,229,148,.30),0 4px 14px rgba(84,48,5,.30)}
@media(max-height:720px){.blessing-entry.scheme-b{min-height:72px;padding-top:8px;padding-bottom:8px}.blessing-entry.scheme-b span{font-size:17px}}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')

b=STANDALONE.read_text(encoding='utf-8')
old="*((ROOT/'assets'/'blessings').glob('*.svg'))]"
new="*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.webp'))]"
if old not in b: raise SystemExit('standalone asset list marker missing')
b=b.replace(old,new,1)
STANDALONE.write_text(b,encoding='utf-8')
VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 photorealistic blessing scheme B')
