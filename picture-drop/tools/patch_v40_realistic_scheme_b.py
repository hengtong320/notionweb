#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js';INDEX=ROOT/'index.html';CSS=ROOT/'style.css';SW=ROOT/'sw.js';VERSION=ROOT/'VERSION';STANDALONE=ROOT/'tools'/'build_standalone.py'
s=GAME.read_text(encoding='utf-8')

replacements={
"    {path:'assets/blessings/01-lotus-sunrise.svg',name:'荷花晨曦',title:'早安',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff7da8',titleColor:'#fff8f4'},":
"    {path:'assets/blessings-realistic/01-lotus-sunrise.png',name:'荷香晨曦',title:'早安',english:'GOOD MORNING',lines:['岁岁安康','日日舒心顺遂'],accent:'#ff9ab9',titleColor:'#fffaf5',scheme:'realistic-b',layout:{titleX:938,titleY:154,titleAlign:'right',titleSize:150,lineX:925,lineY:1085,lineAlign:'right',lineSize:65,plateX:430,plateY:965,plateW:590,plateH:285}},",
"    {path:'assets/blessings/02-trumpet-flower.svg',name:'凌霄花开',title:'早安',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffcc72',titleColor:'#fff7df'},":
"    {path:'assets/blessings-realistic/02-trumpet-flower.png',name:'凌霄花开',title:'早安',english:'GOOD MORNING',lines:['日子舒心少烦忧','阖家喜乐福常留'],accent:'#ffd58b',titleColor:'#fff8e8',scheme:'realistic-b',layout:{titleX:90,titleY:170,titleAlign:'left',titleSize:160,lineX:86,lineY:1040,lineAlign:'left',lineSize:61,plateX:42,plateY:925,plateW:760,plateH:305}},",
"    {path:'assets/blessings/03-jujube-orchard.svg',name:'枣园丰收',title:'早上好',lines:['喜乐相伴','轻松惬意'],accent:'#f5dd62',titleColor:'#fffef2'},":
"    {path:'assets/blessings-realistic/03-jujube-orchard.png',name:'枣园丰收',title:'早上好',english:'A BEAUTIFUL DAY',lines:['喜乐相伴','轻松惬意'],accent:'#ffe16f',titleColor:'#fffdf3',scheme:'realistic-b',layout:{titleX:84,titleY:170,titleAlign:'left',titleSize:142,lineX:86,lineY:1025,lineAlign:'left',lineSize:67,plateX:42,plateY:905,plateW:665,plateH:310}},",
"    {path:'assets/blessings/04-blessing-vase.svg',name:'福气花瓶',title:'早上好',lines:['开心快乐','幸福安康'],accent:'#ffcc72',titleColor:'#fff8ec'},":
"    {path:'assets/blessings-realistic/04-elegant-woman.png',name:'花间晨安',title:'晨安',english:'MORNING BLESSINGS',lines:['清晨有光，岁月有暖','愿我们都快乐幸福'],accent:'#ffd3e2',titleColor:'#fffdf8',scheme:'realistic-b',layout:{titleX:74,titleY:150,titleAlign:'left',titleSize:148,lineX:76,lineY:930,lineAlign:'left',lineSize:56,plateX:36,plateY:810,plateW:700,plateH:330}},",
"    {path:'assets/blessings/05-pine-crane.svg',name:'松鹤延年',title:'晨安',lines:['福寿绵长','平安喜乐'],accent:'#f2dc9a',titleColor:'#fffdf4'},":
"    {path:'assets/blessings-realistic/05-blessing-vase.png',name:'福气花瓶',title:'幸福安康',english:'BEST WISHES',lines:['开心快乐','福气常伴'],accent:'#ffd489',titleColor:'#fffdf7',scheme:'realistic-b',layout:{titleX:540,titleY:148,titleAlign:'center',titleSize:130,lineX:540,lineY:1080,lineAlign:'center',lineSize:68,plateX:145,plateY:955,plateW:790,plateH:300}},",
"    {path:'assets/blessings/06-peony-gold.svg',name:'花开富贵',title:'吉祥如意',lines:['花开富贵','好运常在'],accent:'#ffd06b',titleColor:'#fff8e7'},":
"    {path:'assets/blessings-realistic/06-pine-crane.png',name:'松鹤延年',title:'福寿安康',english:'PEACE & LONGEVITY',lines:['福寿绵长','平安喜乐'],accent:'#f8df9b',titleColor:'#fffdf4',scheme:'realistic-b',layout:{titleX:925,titleY:150,titleAlign:'right',titleSize:130,lineX:900,lineY:1080,lineAlign:'right',lineSize:67,plateX:400,plateY:955,plateW:620,plateH:300}},"
}
for old,new in replacements.items():
    if old not in s: raise SystemExit(f'missing blessing metadata row: {old[:70]}')
    s=s.replace(old,new,1)

old="  const BLESSING_INDICES=BLESSING_CARDS.map((_,i)=>BLESSING_START+i);"
new="  const REALISTIC_BLESSING_COUNT=6;\n  const BLESSING_INDICES=BLESSING_CARDS.slice(0,REALISTIC_BLESSING_COUNT).map((_,i)=>BLESSING_START+i);\n  const ALL_BLESSING_INDICES=BLESSING_CARDS.map((_,i)=>BLESSING_START+i);"
if old not in s: raise SystemExit('blessing index marker missing')
s=s.replace(old,new,1)

s=s.replace("    if(game.mode==='blessing')return '拼出完整祝福图，完成后可保存或分享给亲友';","    if(game.mode==='blessing')return '先拼一张干净写实美图，完成后自动生成祝福作品';",1)
s=s.replace("showToast('拼完整后会生成一张可保存、可分享的祝福作品',3300);","showToast('方案B：拼图里不带文字，完成后才生成精美祝福作品',3600);",1)

pattern=re.compile(r"  async function renderBlessingPoster\(index\)\{.*?\n  \}\n\n  async function posterBlob",re.S)
match=pattern.search(s)
if not match: raise SystemExit('renderBlessingPoster block missing')
poster=r'''  function posterRoundRect(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
  }

  function posterSparkle(ctx,x,y,size,color='#fff7ce'){
    ctx.save();ctx.translate(x,y);ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=size*.75;ctx.beginPath();
    ctx.moveTo(0,-size);ctx.quadraticCurveTo(size*.16,-size*.16,size,0);ctx.quadraticCurveTo(size*.16,size*.16,0,size);ctx.quadraticCurveTo(-size*.16,size*.16,-size,0);ctx.quadraticCurveTo(-size*.16,-size*.16,0,-size);ctx.fill();ctx.restore();
  }

  function drawPosterStrokeText(ctx,text,x,y,size,align,fill,accent,maxWidth=920){
    ctx.save();ctx.textAlign=align;ctx.textBaseline='middle';ctx.lineJoin='round';ctx.font=`900 ${size}px "STKaiti","KaiTi","PingFang SC","Microsoft YaHei",sans-serif`;
    let actual=size;while(actual>34&&ctx.measureText(text).width>maxWidth){actual-=3;ctx.font=`900 ${actual}px "STKaiti","KaiTi","PingFang SC","Microsoft YaHei",sans-serif`;}
    ctx.shadowColor='rgba(0,0,0,.34)';ctx.shadowBlur=20;ctx.shadowOffsetY=8;ctx.strokeStyle='rgba(28,25,30,.76)';ctx.lineWidth=Math.max(12,actual*.13);ctx.strokeText(text,x,y);
    ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.strokeStyle=accent;ctx.lineWidth=Math.max(4,actual*.035);ctx.strokeText(text,x,y);ctx.fillStyle=fill;ctx.fillText(text,x,y);ctx.restore();
  }

  async function renderBlessingPoster(index){
    const meta=blessingMeta(index);if(!meta)throw new Error('not a blessing card');
    const img=await loadPosterImage(PICTURE_PATHS[index]);
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1440;const ctx=canvas.getContext('2d');
    ctx.drawImage(img,0,0,1080,1440);

    const layout=meta.layout||{};
    const titleX=layout.titleX??540,titleY=layout.titleY??180,titleAlign=layout.titleAlign||'center',titleSize=layout.titleSize||148;
    const lineX=layout.lineX??540,lineY=layout.lineY??1080,lineAlign=layout.lineAlign||'center',lineSize=layout.lineSize||64;
    const plateX=layout.plateX??105,plateY=layout.plateY??945,plateW=layout.plateW??870,plateH=layout.plateH??310;

    const warm=ctx.createLinearGradient(0,0,1080,1440);warm.addColorStop(0,'rgba(255,244,225,.08)');warm.addColorStop(.52,'rgba(255,255,255,0)');warm.addColorStop(1,'rgba(25,18,23,.16)');ctx.fillStyle=warm;ctx.fillRect(0,0,1080,1440);
    const vignette=ctx.createRadialGradient(540,650,180,540,650,920);vignette.addColorStop(.55,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(8,10,16,.28)');ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1440);

    const titleGlow=ctx.createRadialGradient(titleX,titleY,10,titleX,titleY,360);titleGlow.addColorStop(0,'rgba(12,18,28,.33)');titleGlow.addColorStop(1,'rgba(12,18,28,0)');ctx.fillStyle=titleGlow;ctx.fillRect(0,0,1080,520);
    drawPosterStrokeText(ctx,meta.title,titleX,titleY,titleSize,titleAlign,meta.titleColor||'#fff',meta.accent||'#ffd77f',titleAlign==='center'?900:760);
    if(meta.english){
      ctx.save();ctx.textAlign=titleAlign;ctx.textBaseline='middle';ctx.font='600 33px Georgia,"Times New Roman",serif';ctx.letterSpacing='5px';ctx.fillStyle='rgba(255,255,255,.92)';ctx.shadowColor='rgba(0,0,0,.52)';ctx.shadowBlur=10;ctx.fillText(meta.english,titleX,titleY+titleSize*.66);ctx.restore();
    }

    ctx.save();ctx.shadowColor='rgba(0,0,0,.28)';ctx.shadowBlur=30;posterRoundRect(ctx,plateX,plateY,plateW,plateH,34);
    const plate=ctx.createLinearGradient(plateX,plateY,plateX,plateY+plateH);plate.addColorStop(0,'rgba(18,21,31,.08)');plate.addColorStop(.28,'rgba(18,21,31,.36)');plate.addColorStop(1,'rgba(12,14,24,.64)');ctx.fillStyle=plate;ctx.fill();ctx.restore();
    ctx.save();posterRoundRect(ctx,plateX+2,plateY+2,plateW-4,plateH-4,32);ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.stroke();ctx.restore();

    meta.lines.forEach((line,i)=>{
      const y=lineY+i*(lineSize+34);drawPosterStrokeText(ctx,line,lineX,y,lineSize,lineAlign,i===0?(meta.accent||'#ffe294'):'#fffdf5','#b73e34',lineAlign==='center'?850:760);
    });
    const dividerY=plateY+plateH-58;ctx.save();ctx.globalAlpha=.86;const divider=ctx.createLinearGradient(plateX+80,0,plateX+plateW-80,0);divider.addColorStop(0,'rgba(255,255,255,0)');divider.addColorStop(.5,meta.accent||'#ffe294');divider.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=divider;ctx.fillRect(plateX+70,dividerY,plateW-140,3);ctx.restore();
    ctx.save();ctx.textAlign='center';ctx.font='500 28px "PingFang SC","Microsoft YaHei",sans-serif';ctx.fillStyle='rgba(255,255,255,.9)';ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=8;ctx.fillText(`愿美好如约而至 · ${meta.name}`,540,plateY+plateH-23);ctx.restore();
    posterSparkle(ctx,Math.min(1015,plateX+plateW-56),plateY+45,18,meta.accent||'#fff2b6');posterSparkle(ctx,Math.max(65,plateX+54),plateY+82,10,'#fff');
    return canvas;
  }

  async function posterBlob'''
s=s[:match.start()]+poster+s[match.end():]

# Expose scheme metadata for browser regression.
s=s.replace('blessingCount:BLESSING_CARDS.length,', 'blessingCount:BLESSING_CARDS.length,realisticBlessingCount:REALISTIC_BLESSING_COUNT,',1)
GAME.write_text(s,encoding='utf-8')

idx=INDEX.read_text(encoding='utf-8')
idx=idx.replace('<button id="blessingBtn" class="blessing-entry"><span>早安祝福拼图</span><small>拼完生成作品 · 可保存分享</small></button>',
'''<button id="blessingBtn" class="blessing-entry"><b class="realistic-badge">方案B · 写实</b><span>写实祝福拼图</span><small>先拼干净美图 · 完成后生成分享作品</small></button>''')
idx=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',idx)
idx=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',idx)
idx=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',idx)
INDEX.write_text(idx,encoding='utf-8')

css=CSS.read_text(encoding='utf-8')
css+=r'''

/* v4.0 realistic blessing scheme B */
.blessing-entry{position:relative;overflow:hidden;background-image:linear-gradient(90deg,rgba(5,76,72,.88),rgba(14,108,94,.72)),url('assets/blessings-realistic/01-lotus-sunrise.png');background-size:cover;background-position:center 62%;border:1px solid rgba(255,231,158,.78);box-shadow:0 8px 24px rgba(0,35,50,.23),inset 0 1px rgba(255,255,255,.24)}
.blessing-entry::before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.18),transparent 35%,transparent 68%,rgba(255,224,151,.16));pointer-events:none}
.blessing-entry>span,.blessing-entry>small,.blessing-entry>.realistic-badge{position:relative;z-index:1}
.realistic-badge{position:absolute!important;right:10px;top:8px;padding:3px 7px;border-radius:999px;background:linear-gradient(135deg,#ffe7a5,#e9aa42);color:#563308;font-size:9px;line-height:1;font-weight:900;box-shadow:0 2px 8px rgba(62,34,0,.26)}
.is-blessing .blessing-lockup{left:6%;right:6%;bottom:6%;padding:8px 10px;border-radius:12px;background:linear-gradient(180deg,rgba(10,18,27,.04),rgba(10,18,27,.62));text-shadow:0 2px 6px rgba(0,0,0,.78);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)}
.is-blessing .blessing-lockup strong{font-family:"STKaiti","KaiTi","PingFang SC",sans-serif;font-size:clamp(19px,5.6vw,31px);letter-spacing:.06em;color:#fffdf7;-webkit-text-stroke:.5px rgba(132,55,36,.85)}
.is-blessing .blessing-lockup span{font-weight:800;color:#ffeab0;font-size:clamp(9px,2.5vw,14px)}
.blessing-preview-shell{background:radial-gradient(circle at 50% 15%,rgba(255,230,171,.19),transparent 35%),linear-gradient(180deg,#183f3b,#082b2e)}
.blessing-preview-shell img{box-shadow:0 18px 42px rgba(0,0,0,.38),0 0 0 1px rgba(255,235,187,.5)}
'''
CSS.write_text(css,encoding='utf-8')

b=STANDALONE.read_text(encoding='utf-8')
old="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg'))]"
new="assets=[*((ROOT/'assets'/'pictures-portrait').glob('*.webp')),*((ROOT/'assets'/'pictures-extra').glob('*.svg')),*((ROOT/'assets'/'blessings').glob('*.svg')),*((ROOT/'assets'/'blessings-realistic').glob('*.png'))]"
if old not in b: raise SystemExit('standalone asset list missing')
b=b.replace(old,new,1)
b=b.replace("mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else 'image/webp'","mime='image/svg+xml' if image_path.suffix.lower()=='.svg' else ('image/png' if image_path.suffix.lower()=='.png' else 'image/webp')",1)
STANDALONE.write_text(b,encoding='utf-8')

sw=SW.read_text(encoding='utf-8')
sw=re.sub(r'jigsaw-drop-h5-v[0-9.]+','jigsaw-drop-h5-v4.0.0',sw)
sw=re.sub(r'style\.css\?v=[0-9.]+','style.css?v=4.0.0',sw)
sw=re.sub(r'game\.js\?v=[0-9.]+','game.js?v=4.0.0',sw)
sw=re.sub(r'manifest\.webmanifest\?v=[0-9.]+','manifest.webmanifest?v=4.0.0',sw)
SW.write_text(sw,encoding='utf-8')
VERSION.write_text('4.0.0\n',encoding='utf-8')
print('patched v4.0 realistic blessing scheme B')
