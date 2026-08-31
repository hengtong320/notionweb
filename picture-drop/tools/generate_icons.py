from PIL import Image,ImageDraw,ImageFont,ImageFilter
from pathlib import Path
P=Path(__file__).resolve().parents[1]/'assets'/'icons';P.mkdir(parents=True,exist_ok=True)
font_path='/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
if not Path(font_path).exists(): font_path='/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'
for size in (192,512):
    im=Image.new('RGB',(size,size));px=im.load()
    for y in range(size):
        t=y/(size-1); c=(int(38*(1-t)+8*t),int(213*(1-t)+111*t),int(239*(1-t)+224*t))
        for x in range(size): px[x,y]=c
    d=ImageDraw.Draw(im)
    # soft radial light
    glow=Image.new('RGBA',(size,size),(0,0,0,0));gd=ImageDraw.Draw(glow);gd.ellipse((size*.1,size*.02,size*.9,size*.82),fill=(130,255,255,75));glow=glow.filter(ImageFilter.GaussianBlur(size*.11));im=Image.alpha_composite(im.convert('RGBA'),glow)
    d=ImageDraw.Draw(im)
    pad=size*.13
    # four puzzle tiles
    coords=[(pad,pad),(size/2,pad),(pad,size/2),(size/2,size/2)]
    cols=[(255,207,70),(245,92,88),(92,225,137),(104,132,245)]
    for i,(x,y) in enumerate(coords):
        x2=x+size*.37;y2=y+size*.37
        d.rounded_rectangle((x,y,x2,y2),radius=size*.055,fill=cols[i],outline='white',width=max(3,int(size*.018)))
    # orange falling card over center
    w=size*.26;h=size*.34;x=size*.5-w/2;y=size*.37-h/2
    d.rounded_rectangle((x,y,x+w,y+h),radius=size*.035,fill=(224,124,28),outline=(255,244,197),width=max(3,int(size*.02)))
    d.rounded_rectangle((x+size*.025,y+size*.025,x+w-size*.025,y+h-size*.025),radius=size*.025,outline=(126,62,13),width=max(2,int(size*.012)))
    f=ImageFont.truetype(font_path,int(size*.14))
    text='J';bbox=d.textbbox((0,0),text,font=f,stroke_width=max(1,int(size*.006)));tw=bbox[2]-bbox[0];th=bbox[3]-bbox[1]
    d.text((size*.5-tw/2,size*.53-th/2),text,font=f,fill='white',stroke_width=max(1,int(size*.008)),stroke_fill=(58,55,91))
    im.convert('RGB').save(P/f'icon-{size}.png',optimize=True)
