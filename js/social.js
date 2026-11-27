/* Social media page: copy email + lightbox viewer */
(function(){
  const $=s=>document.querySelector(s);
  document.querySelectorAll('.mkp').forEach(e=>e.outerHTML=STAR);
  const m1=document.getElementById('mk'),m2=document.getElementById('mk2');
  if(m1)m1.outerHTML=STAR; if(m2)m2.outerHTML=STAR;
  const cp=document.getElementById('smcopy');
  if(cp)cp.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText('dutta.riawork@gmail.com')}catch(e){const t=document.createElement('textarea');t.value='dutta.riawork@gmail.com';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
    const s=document.getElementById('smmail');s.textContent='Copied!';setTimeout(()=>s.textContent='Email, click to copy',1800);
  });
  /* lightbox */
  const lb=document.getElementById('lb');if(!lb)return;
  const img=lb.querySelector('img'),cap=lb.querySelector('figcaption');
  let group=[],idx=0,last=null;
  const src=el=>{const s=el.getAttribute('src');return (window.ASSETS&&ASSETS[s])||el.src};
  function show(i){
    idx=(i+group.length)%group.length;const f=group[idx],im=f.querySelector('img');
    img.src=src(im);img.alt=im.alt;
    cap.innerHTML='<span>'+f.querySelector('b').textContent+'</span><small>'+f.querySelector('figcaption span').textContent+'</small>';
    img.style.animation='none';void img.offsetWidth;img.style.animation='';
  }
  function open(f){group=[...f.closest('.shots').querySelectorAll('.shot')];last=document.activeElement;lb.hidden=false;document.body.style.overflow='hidden';show(group.indexOf(f));lb.querySelector('.lb-x').focus()}
  function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()}
  document.addEventListener('click',e=>{
    const b=e.target.closest('.shot-btn');if(b){open(b.closest('.shot'));return}
    if(e.target===lb||e.target.closest('.lb-x'))close();
    else if(e.target.closest('.lb-p'))show(idx-1);
    else if(e.target.closest('.lb-n'))show(idx+1);
  });
  document.addEventListener('keydown',e=>{
    if(lb.hidden)return;
    if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(idx-1);else if(e.key==='ArrowRight')show(idx+1);
  });
})();
