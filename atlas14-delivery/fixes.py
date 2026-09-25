from pathlib import Path
p=Path('fullbody-tcm-v14')
f=p/'styles.css';s=f.read_text()
for old in ['.organ-view-active .detail-scroll>section:not(#currentStudy):not(#tissueDetail)', '.tissue-detail-active .detail-scroll>section:not(#tissueDetail):not(#currentStudy)']:
 assert old in s,old
 s=s.replace(old,old+':not(#femaleDetail):not(#tcmPointCard):not(#v9MeridianCard)')
f.write_text(s)
# Capture real UI state if a later assertion fails, rather than accepting an API-only success.
f=Path('atlas14-delivery/verify.cjs');s=f.read_text()
s=s.replace('let server,browser;','let server,browser,testPage;')
s=s.replace('const p=await ctx.newPage();','const p=await ctx.newPage();testPage=p;')
s=s.replace("}catch(e){report.failure=String(e);console.error(e);process.exitCode=1;}","""}catch(e){report.failure=String(e);console.error(e);process.exitCode=1;
 if(testPage)try{await testPage.screenshot({path:path.join(out,type+'-failure.png')});report.failureDOM=await testPage.evaluate(()=>({bodyClass:document.body.className,kind:document.body.dataset.currentKind,panes:[...document.querySelectorAll('#femaleDetail,#tcmPointCard,#v9MeridianCard,.detail-scroll,.detail-panel')].map(x=>({id:x.id,className:x.className,hidden:x.hidden,display:getComputedStyle(x).display,visibility:getComputedStyle(x).visibility,rect:JSON.stringify(x.getBoundingClientRect()),html:x.outerHTML.slice(0,2000)})),state:window.__ATLAS_SHARED__?.getState()}));}catch{} }
""")
f.write_text(s)
print('FIXED shared detail visibility and diagnostic capture')
