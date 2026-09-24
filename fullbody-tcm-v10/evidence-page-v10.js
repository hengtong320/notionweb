import {evidenceData as DATA,POINT_TERMS,ALL_TERMS,normalizeTerm} from './catalog-v10.js';
import {evidenceBody,channelBody} from './evidence-ui-v9.js';
const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const extras=Object.fromEntries(Object.values(ALL_TERMS).filter(t=>t.kind==='point'&&t.meridian==='EX').map(t=>[t.id,{...t,code:t.id,region:'头面部观察区域'}]));
const hash=new URLSearchParams(location.hash.slice(1));let tab=hash.get('kind')==='meridian'?'meridian':'point',selected=hash.get('id')||'PC6',side=['right','left','both','midline'].includes(hash.get('side'))?hash.get('side'):'right',mode=hash.get('mode')==='illustrative'?'illustrative':'strict';
function targetLink(id=selected){const u=new URL('./',location.href);u.hash=new URLSearchParams({kind:tab,id,side,mode}).toString();return u.href;}
function record(){const h=new URLSearchParams({kind:tab,id:selected,side,mode});try{history.replaceState(null,'','#'+h.toString());}catch{}if($('return3d'))$('return3d').href=targetLink();}
function show(id){
 selected=id;const p=DATA.points[id]||extras[id],ids=String(id).split(',').filter(v=>DATA.meridians[v]||v==='EX');
 if(tab==='point'&&p){$('detail').innerHTML=`<h2 id="focusHeading">${esc(p.name)}<small>${esc(p.pinyin)} · ${esc(id)}</small></h2><p><b>${esc(DATA.meridians[p.meridian]?.name||'经外／头面补充')}</b> · ${esc(p.region)}</p><div class="actions"><a id="open3d" href="${esc(targetLink())}">在三维中查看相关部位 ↗</a></div>${evidenceBody(p)}`;}
 else if(tab==='meridian'&&ids.length){$('detail').innerHTML=`<h2 id="focusHeading">${esc(ids.map(v=>DATA.meridians[v]?.name||'头面补充').join('＋'))}<small>${esc(ids.join(' / '))}</small></h2><div class="actions"><a id="open3d" href="${esc(targetLink())}">在三维中查看所选经脉 ↗</a></div>${channelBody(ids)}`;}
 else{$('detail').innerHTML='<h2>选择一个条目</h2><p>可搜索名称、正确拼音或编号，查看资料与三维观察范围。</p><a id="open3d" href="./">返回三维</a>';}
 record();for(const b of $('results').querySelectorAll('button'))b.classList.toggle('active',b.dataset.id===selected||tab==='meridian'&&ids.includes(b.dataset.id));
}
function render(){
 $('pointTab').classList.toggle('active',tab==='point');$('meridianTab').classList.toggle('active',tab==='meridian');$('channel').hidden=tab==='meridian';
 const q=normalizeTerm($('search').value),filter=$('channel').value;
 const source=tab==='point'?[...Object.values(DATA.points),...((q||filter==='EX')?Object.values(extras):[])]:Object.values(DATA.meridians);
 const list=source.filter(p=>(tab==='meridian'||!filter||p.meridian===filter)&&(!q||normalizeTerm([p.name,p.pinyin,p.id,p.code,...(POINT_TERMS[p.code]?.aliases||[])].join(' ')).includes(q)));
 $('count').textContent=`${list.length}条 · 标准目录与头面补充分列；定位状态单独记录`;$('results').replaceChildren();
 for(const p of list){const id=p.code||p.id,b=document.createElement('button');b.type='button';b.dataset.id=id;b.innerHTML=`<b>${esc(p.name)}<small>${esc(p.pinyin)}</small></b><span>${esc(id)}</span>`;b.classList.toggle('active',id===selected);b.onclick=()=>show(id);$('results').append(b);}
 if(!list.length){const t=document.createElement('p');t.textContent='没有找到。请检查拼音、编号或经脉筛选。';$('results').append(t);}
}
$('channel').innerHTML='<option value="">全部十四经脉</option>'+Object.values(DATA.meridians).map(m=>`<option value="${esc(m.id)}">${esc(m.name)}</option>`).join('')+'<option value="EX">头面补充 · 独立目录</option>';
$('search').oninput=render;$('channel').onchange=render;
$('pointTab').onclick=()=>{tab='point';$('search').value='';render();show(DATA.points[selected]||extras[selected]?selected:'PC6');};
$('meridianTab').onclick=()=>{tab='meridian';$('search').value='';render();show(DATA.meridians[selected]?selected:'HT');};
for(const b of document.querySelectorAll('[data-topic]'))b.onclick=()=>{tab='point';$('search').value='';$('channel').value='';render();show(b.dataset.topic);};
$('allSources').innerHTML=Object.values(DATA.sources).map(s=>`<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></p>`).join('');
window.addEventListener('hashchange',()=>{const h=new URLSearchParams(location.hash.slice(1));tab=h.get('kind')==='meridian'?'meridian':'point';side=['left','right','midline','both'].includes(h.get('side'))?h.get('side'):'right';mode=h.get('mode')==='illustrative'?'illustrative':'strict';render();show(h.get('id')||'PC6');});
window.__EVIDENCE_PAGE__={DATA,getState:()=>({tab,selected,side,mode}),show};render();show(selected);
