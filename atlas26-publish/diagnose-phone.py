from pathlib import Path
s=Path('atlas26-publish/verified-tests/verify.cjs').read_text().replace("(live?'live-':'local-')+engine","'paint-'+engine")
extra="""
await shot('phone-point-details');
report.paintHit=await p.evaluate(()=>({hit:document.elementsFromPoint(173,360).map(e=>({tag:e.tagName,id:e.id,cls:typeof e.className==='string'?e.className:'svg'})),sticky:[...document.querySelectorAll('body *')].filter(e=>['sticky','fixed'].includes(getComputedStyle(e).position)).map(e=>({tag:e.tagName,id:e.id,cls:typeof e.className==='string'?e.className:'svg',rect:e.getBoundingClientRect().toJSON(),position:getComputedStyle(e).position,transform:getComputedStyle(e).transform})),pseudo:[...document.querySelectorAll('body *')].flatMap(e=>['::before','::after'].map(p=>({id:e.id,cls:typeof e.className==='string'?e.className:'svg',pseudo:p,content:getComputedStyle(e,p).content,background:getComputedStyle(e,p).backgroundColor}))).filter(x=>x.content&&x.content!=='none'&&x.content!=='normal')}));
await p.locator('#viewport canvas').first().screenshot({path:path.join(out,prefix+'-canvas-only.png')});
for(const [name,css] of [
 ['no-labels','#acupointLabels{display:none!important}'],
 ['no-detail','.detail-panel{display:none!important}'],
 ['no-sticky','.detail-panel *{position:static!important;transform:none!important}'],
 ['contained-detail','.detail-panel{contain:paint!important;isolation:isolate!important;transform:translateZ(0)!important}'],
 ['no-card-head','.tcm-card-head{position:static!important;top:auto!important}'],
 ['no-filters','*{backdrop-filter:none!important;filter:none!important}'],
 ['no-transitions','*,*::before,*::after{animation:none!important;transition:none!important;will-change:auto!important}']
 ]){
 const tag=await p.addStyleTag({content:css});await p.waitForTimeout(100);await shot('phone-'+name);await tag.evaluate(e=>e.remove());await p.waitForTimeout(100);
}
"""
assert "await shot('phone-point-details');" in s
s=s.replace("await shot('phone-point-details');",extra,1)
Path('atlas26-publish/visual-inspection.cjs').write_text(s)
