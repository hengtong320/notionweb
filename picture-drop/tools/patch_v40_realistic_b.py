#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'; INDEX=ROOT/'index.html'; CSS=ROOT/'style.css'; SW=ROOT/'sw.js'; VERSION=ROOT/'VERSION'; STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

start=s.index('  const BLESSING_CARDS=[')
end=s.index('\n  ];',start)+5
cards=r'''  const BLESSING_CARDS=[
    {path:'assets/blessings-real/01-lotus-sunrise.webp',name:'荷塘晨曦',title:'早安',english:'GOOD MORNING',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff8eb4',titleColor:'#fffaf6',layout:'right'},
    {path:'assets/blessings-real/02-trumpet-bloom.webp',name:'凌霄花开',title:'晨安',english:'A BEAUTIFUL DAY',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffd275',titleColor:'#fff8df',layout:'left'},
    {path:'assets/blessings-real/03-elegant-morning.webp',name:'温柔问候',title:'早安',english:'WARM WISHES',lines:['清晨的问候是祝福','愿每天快乐幸福'],accent:'#f5b2d4',titleColor:'#fff',layout:'left'},
    {path:'assets/blessings-real/04-jujube-harvest.webp',name:'枣园丰收',title:'早上好',english:'GOOD MORNING',lines:['喜乐相伴','轻松惬意'],accent:'#ffd968',titleColor:'#fffef4',layout:'center'},
    {path:'assets/blessings-real/05-fortune-vase.webp',name:'福气花瓶',title:'早上好',english:'BLESSINGS FOR YOU',lines:['开心快乐','幸福安康'],accent:'#ffc66b',titleColor:'#fff9e9',layout:'center'},
    {path:'assets/blessings-real/06-pine-crane.webp',name:'松鹤延年',title:'晨安',english:'PEACE & HEALTH',lines:['福寿绵长','平安喜乐'],accent:'#efd596',titleColor:'#fffdf4',layout:'left'}
  ];'''
s=s[:start]+cards+s[end:]

rs=s.index('  async function renderBlessingPoster(')
for marker in ('\n\n  function openBlessingWorks','\n\n  async function openBlessingWorks','\n\n  function updateBlessingWorks'):
    try:
        re_=s.index(marker,rs);break
    except ValueError: pass
else: raise SystemExit('renderBlessingPoster end marker not found')
renderer=r'''  async function renderBlessingPoster(index) {
    const card=blessingMeta(index);if(!card)throw new Error('blessing metadata missing');
    const image=await new Promise((resolve,reject)=>{
      const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=()=>reject(new Error(`image load failed: ${card.path}`));img.src=card.path;
    });
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;
    const ctx=canvas.getContext('2d');
    const scale=Math.max(canvas.width/image.naturalWidth,canvas.height/image.naturalHeight);
    const dw=image.naturalWidth*scale,dh=image.naturalHeight*scale;
    ctx.drawImage(image,(canvas.width-dw)/2,(canvas.height-dh)/2,dw,dh);

    const vignette=ctx.createRadialGradient(540,610,240,540,720,910);
    vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(.72,'rgba(0,0,0,.04)');vignette.addColorStop(1,'rgba(0,0,0,.28)');
    ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1440);
    const top=ctx.createLinearGradient(0,0,0,430);top.addColorStop(0,'rgba(5,23,26,.32)');top.addColorStop(.65,'rgba(5,23,26,.06)');top.addColorStop(1,'rgba(5,23,26,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,460);
    const bottom=ctx.createLinearGradient(0,850,0,1440);bottom.addColorStop(0,'rgba(4,23,28,0)');bottom.addColorStop(.5,'rgba(4,23,28,.12)');bottom.addColorStop(1,'rgba(4,23,28,.62)');ctx.fillStyle=bottom;ctx.fillRect(0,820,1080,620);

    ctx.save();ctx.strokeStyle='rgba(255,248,220,.72)';ctx.lineWidth=3;ctx.shadowColor='rgba(0,0,0,.28)';ctx.shadowBlur=10;ctx.strokeRect(22,22,1036,1396);ctx.restore();
    const sparkles=[[90,96,8],[982,172,6],[918,1070,7],[126,1190,5],[965,1280,4]];
    ctx.save();ctx.fillStyle='rgba(255,250,210,.92)';for(const [x,y,r] of sparkles){ctx.beginPath();ctx.moveTo(x,y-r*2);ctx.lineTo(x+r*.55,y-r*.55);ctx.lineTo(x+r*2,y);ctx.lineTo(x+r*.55,y+r*.55);ctx.lineTo(x,y+r*2);ctx.lineTo(x-r*.55,y+r*.55);ctx.lineTo(x-r*2,y);ctx.lineTo(x-r*.55,y-r*.55);ctx.closePath();ctx.fill();}ctx.restore();

    const layout=card.layout||'center';const tx=layout==='right'?900:layout==='left'?110:540;const align=layout==='right'?'right':layout==='left'?'left':'center';
    ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';
    ctx.save();ctx.font='900 150px "STKaiti","KaiTi","Songti SC",serif';ctx.lineWidth=13;ctx.strokeStyle='rgba(20,34,32,.72)';ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=18;ctx.shadowOffsetY=8;ctx.strokeText(card.title,tx,165);ctx.fillStyle=card.titleColor||'#fff';ctx.fillText(card.title,tx,165);ctx.restore();
    ctx.save();ctx.font='italic 600 42px Georgia,"Times New Roman",serif';ctx.fillStyle='rgba(255,255,255,.92)';ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=8;ctx.fillText(card.english||'GOOD MORNING',tx,270);ctx.restore();

    const maxLen=Math.max(...card.lines.map(v=>v.length));const fontSize=maxLen>=10?58:maxLen>=7?66:76;
    ctx.textAlign='center';ctx.save();ctx.font=`900 ${fontSize}px "PingFang SC","Microsoft YaHei",sans-serif`;ctx.lineWidth=11;ctx.strokeStyle='rgba(83,30,18,.82)';ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=14;ctx.shadowOffsetY=6;
    card.lines.forEach((line,i)=>{const y=1160+i*105;ctx.strokeText(line,540,y);ctx.fillStyle=i===0?'#fff8e8':(card.accent||'#ffd17a');ctx.fillText(line,540,y);});ctx.restore();
    ctx.save();ctx.textAlign='center';ctx.font='500 27px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.74)';ctx.fillText('一份亲手拼出的问候 · 愿美好常伴',540,1375);ctx.restore();
    return canvas;
  }'''
s=s[:rs]+renderer+s[re_:]
s=s.replace("showToast('祝福作品已收藏',", "showToast('写实祝福作品已收藏',")
s=s.replace("game.mode==='blessing'?'祝福拼图'", "game.mode==='blessing'?'写实祝福拼图'")
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('早安祝福拼图','写实祝福拼图').replace('拼完生成作品 · 可保存分享','拼写实美图 · 完成生成祝福作品')
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css += r'''

/* v4.0 photorealistic scheme-B blessing mode */
.blessing-entry{background:linear-gradient(145deg,rgba(255,250,235,.98),rgba(255,221,170,.96));border-color:rgba(255,207,104,.88);box-shadow:0 10px 24px rgba(73,32,8,.16),inset 0 1px rgba(255,255,255,.9)}
.blessing-entry::before{content:'写实';position:absolute;right:12px;top:9px;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#ff8c54,#e84a36);color:#fff;font-size:9px;font-weight:900;letter-spacing:1px;box-shadow:0 3px 8px rgba(116,32,11,.24)}
.blessing-preview-shell{background:linear-gradient(160deg,#183c36,#071f25);box-shadow:0 18px 45px rgba(0,25,31,.34)}
.blessing-preview-shell img{image-rendering:auto;filter:saturate(1.02) contrast(1.01)}
.game-stage.is-blessing .topbar{background:linear-gradient(180deg,rgba(11,73,68,.98),rgba(5,48,53,.97))}
.game-stage.is-blessing .deck-stack{filter:saturate(.9) sepia(.12)}
'''
CSS.write_text(css,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')

b=STANDALONE.read_text(encoding='utf-8')
if "blessings-real" not in b:
    b=b.replace("*((ROOT/'assets'/'blessings').glob('*.svg'))]","*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-real').glob('*.webp'))]")
    if "blessings-real" not in b:b=b.replace("assets=[", "assets=[*((ROOT/'assets'/'blessings-real').glob('*.webp')),")
STANDALONE.write_text(b,encoding='utf-8')
VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 photorealistic scheme B')
