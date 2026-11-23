document.getElementById('mk').outerHTML=STAR;
const id=new URLSearchParams(location.search).get('id')||CASES[0].id;
const i=Math.max(0,CASES.findIndex(c=>c.id===id)); const c=CASES[i];
document.title=c.brand+' | Case Study | Ria Dutta';
const num=String(c.num).padStart(2,'0');
const nl=(arr)=>`<ol class="nl">${arr.map((t,k)=>`<li><b>${String(k+1).padStart(2,'0')}</b><span>${t}</span></li>`).join('')}</ol>`;
const logo=LOGOF[c.id];
const sub=c.subtitle||`${c.short} \u00b7 ${c.platform}`;
const prev=CASES[i-1],next=CASES[i+1];
document.getElementById('cs').innerHTML=`
<a class="all" href="projects.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>All projects</a>
<div class="kick"><img src="assets/logos/${logo}" alt="" style="object-fit:${(COVER[c.id]&&COVER[c.id].t==='cover')?'cover':'contain'};padding:${(COVER[c.id]&&COVER[c.id].t==='cover')?0:3}px"><span>Case study ${num} \u00b7 ${c.platform} \u00b7 ${c.brand}</span></div>
<header class="cs-top"><h1>${c.headline}</h1><p class="st">${sub}</p>
 <p class="ob"><b>Campaign objective:</b> ${c.objective||''}</p>
 <a class="btn btn-o" href="${c.url}" target="_blank" rel="noopener noreferrer">${c.store} ${LI.arrow}</a></header>
<div class="kp">${c.tiles.map(t=>`<div><small>${t.label}</small><b>${t.value}</b>${t.sub?`<em>${t.sub}</em>`:''}</div>`).join('')}</div>
<section class="panel">
 <div class="tabs" role="tablist"><button class="tab on" data-p="ch">Challenge</button><button class="tab" data-p="se">Strategy &amp; Execution</button><button class="tab" data-p="rs">Results &amp; Impact</button></div>
 <div class="pane on" id="p-ch"><h2>Challenge</h2><div class="ch">${c.challenge.map(p=>`<p>${p}</p>`).join('')}</div></div>
 <div class="pane" id="p-se"><h2>Strategy &amp; execution</h2><div class="two"><div class="s"><h5>Strategy</h5>${nl(c.strategy)}</div><div class="e"><h5>${c.execLabel||'Execution'}</h5>${nl(c.execution)}</div></div></div>
 <div class="pane res" id="p-rs"><h2>Results &amp; impact</h2>${nl(c.results)}<div class="take"><small>Key takeaway</small><p>${c.takeaway||''}</p></div></div>
</section>
<section class="evid"><div class="eyebrow">Campaign performance evidence</div>
 <figure><img src="assets/evidence/${c.id}.jpg" alt="${c.brand} campaign dashboard screenshot">${c.caption?`<figcaption>${c.caption}</figcaption>`:''}</figure></section>
<div class="nextrow">${prev?`<a href="case-study.html?id=${prev.id}">\u2190 ${prev.brand}</a>`:'<span></span>'}${next?`<a href="case-study.html?id=${next.id}">${next.brand} \u2192</a>`:''}</div>`;
document.querySelector('.tabs').addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;
 document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t===b));
 document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+b.dataset.p));});
