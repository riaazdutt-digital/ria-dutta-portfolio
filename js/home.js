const $=s=>document.querySelector(s);
$('#mk').outerHTML=STAR; $('#mk2').outerHTML=STAR;
// platforms
const PL=[['Google Ads','<img src="assets/logos/google-ads-icon.png" alt="">'],['Meta Ads','<img src="assets/logos/meta-icon.png" alt="">'],['Amazon Ads',AMZ],['Flipkart Ads','<img src="assets/logos/flipkart.png" alt="">'],['Swiggy','<img src="assets/logos/instamart.png" alt="">'],['Zepto','<img src="assets/logos/zepto.png" alt="">']];
$('#platforms').innerHTML=PL.map(p=>`<span>${p[1]}${p[0]}</span>`).join('');
// ticker
const T=['Amazon Ads','ROAS 1.5\u00d7 \u2192 4\u00d7','(INR) 5Cr+ monthly budgets','Meta Ads','ACOS sculpting','150+ brands managed','Google Ads','200% campaign ROI','Full-funnel CRO','CPL (INR) 1,200\u2192250'];
const row=T.map(t=>`<span>${t}</span>`).join('');
$('#ticker').innerHTML=row+row;
// tools
$('#toolgroups').innerHTML=TOOLS.map(g=>`<div class="grp"><h4>${g[0]}</h4><div class="chips">${g[1].map(t=>`<span class="chip">${t[1]}${t[0]}</span>`).join('')}</div></div>`).join('');
// levers
const lp=$('#levpanel'),ll=$('#levlist');
ll.innerHTML=LEVERS.map((l,i)=>`<button class="lev-btn" role="tab" data-i="${i}">${LI[l[1]]}${l[0]}</button>`).join('');
let cur=-1,swapT;
function fill(i){const l=LEVERS[i];lp.innerHTML=`<div class="lev-in"><div class="lev-ic">${LI[l[1]]}</div><h3>${l[2]}</h3><div class="k">${l[3]}</div><p>${l[4]}</p></div>`}
function showLever(i,anim){
  if(i===cur)return;cur=i;
  ll.querySelectorAll('.lev-btn').forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-selected',j===i)});
  clearTimeout(swapT);
  if(!anim){fill(i);return}
  lp.classList.add('swap');
  swapT=setTimeout(()=>{fill(i);lp.classList.add('swap');void lp.offsetWidth;lp.classList.remove('swap')},230);
}
ll.addEventListener('click',e=>{const b=e.target.closest('.lev-btn');if(b)showLever(+b.dataset.i,true)});
showLever(3,false);
// impact
const PIC={amz:AMZ,g:'<img src="assets/logos/google-ads-icon.png" alt="">',m:'<img src="assets/logos/meta-icon.png" alt="">'};
$('#imp').innerHTML=IMPACT.map(x=>`<div class="tile ${x[0]}"><span class="pic">${PIC[x[1]]}</span><b>${x[2]}</b><strong>${x[3]}</strong><small>${x[4]}</small></div>`).join('');
// projects
$('#home-cards').innerHTML=CASES.slice(0,6).map(c=>card(c,'brand')).join('');
// copy email
const cm=$('#copymail');
cm.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('dutta.riawork@gmail.com')}catch(e){const t=document.createElement('textarea');t.value='dutta.riawork@gmail.com';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
  $('#mailsm').textContent='Copied!';setTimeout(()=>$('#mailsm').innerHTML='Email &mdash; click to copy',1800)});
