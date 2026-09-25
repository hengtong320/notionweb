from pathlib import Path
p=Path('fullbody-tcm-v14')
f=p/'learning-enhancements.js';s=f.read_text()
s=s.replace("if(state.bodySex==='female'){p={...p,position:null", "if(state.bodySex==='female'){window.__ATLAS_FEMALE__?.clearSelection();p={...p,position:null")
s=s.replace("`${arr.length}项 · ${arr.filter(p=>p.mapped||p.areaNavigation).length}可导航`", "`${arr.length} 项`")
a="if(focus&&!p.position&&!p.navigationArea){document.body.classList.add('detail-open');}"
assert a in s;s=s.replace(a,"if(focus&&!p.position&&!p.navigationArea){document.body.classList.remove('nav-open');document.body.classList.add('detail-open');}")
f.write_text(s)
f=p/'shared-v14.js';s=f.read_text()
a="if(f&&currentReference){document.body.classList.add('reference-detail','point-detail-active');"
b="for(const id of ['tcmLayerToggle','tcmMasterToggle']){$(id).disabled=f;if(f)$(id).textContent='点位未标注';} $('focusCurrent').disabled=f&&currentReference; if(f&&currentReference){document.body.classList.add('reference-detail','point-detail-active');"
assert a in s;s=s.replace(a,b);f.write_text(s)
f=p/'shared-v14.css';f.write_text(f.read_text()+'\nbody.female-view.reference-detail #femalePointLabel{display:none!important}\n')
f=Path('atlas14-delivery/verify.cjs');s=f.read_text().replace("ck('Female has shared usable meridian catalog',", "ck('Female directory does not claim unregistered navigation',!(await p.locator('#pointResultCount').innerText()).includes('可导航'));ck('Female has shared usable meridian catalog',");f.write_text(s)
print('REVIEW phone drawer and accurate shared-control states')
