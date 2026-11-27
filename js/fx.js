/* Interaction layer: scroll reveal (fade + unblur), tilt, page transitions, scroll-spy */
(function(){
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MOD={'.pc':3,'.tile':4,'.kp div':4,'.cc':4,'.chips .chip':5,'.more > div':3,'.spec span':4,'.brand':5,'.shot':3};
  const SEL=['.eyebrow','h2.sec','.about-h','.about-copy p','.headed','.spec','.row','.grp h4','.chips .chip','.lev-btn','.lev-panel','.tile','.job','.more > div','.head-row','.pc','.contact h2','.contact .lead','.cv-row','.cc','.ft','.cs-hero > *','.filters','.cs .all','.cs .kick','.cs-top','.kp div','.panel','.evid','.nextrow','.gal-head h2','.shot','.brand','.sm-card','.about-stickers','.sm-banner','.brands-sec h2'];
  let items=[];
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const ease=t=>1-Math.pow(1-t,3);

  function scan(root){
    if(RM)return;
    root=root||document;
    SEL.forEach(sel=>{
      root.querySelectorAll(sel).forEach(el=>{
        if(el._fx)return;
        const sibs=[...el.parentElement.children].filter(n=>n.matches(sel));
        el._fx={i:sibs.indexOf(el)%(MOD[sel]||2),on:false};
        items.push(el);
      });
    });
    items=items.filter(e=>e.isConnected);
    paint();
  }
  function clear(el){
    if(el._fx.on){el.style.opacity='';el.style.filter='';el.style.translate='';el.style.willChange='';el._fx.on=false}
  }
  function paint(){
    const vh=innerHeight;
    for(const el of items){
      const r=el.getBoundingClientRect();
      if(r.width===0&&r.height===0){clear(el);continue}
      const stag=el._fx.i*0.03*vh;
      const enter=clamp((vh*0.97-stag-r.top)/(vh*0.24));
      const exit=clamp((r.bottom-vh*0.1)/(vh*0.2));
      const p=Math.min(enter,exit);
      if(p>=0.995){clear(el);continue}
      const e=ease(p);
      el.style.opacity=(0.06+0.94*e).toFixed(3);
      el.style.filter='blur('+((1-e)*9).toFixed(2)+'px)';
      el.style.translate='0 '+(((1-ease(enter))*38)-((1-ease(exit))*14)).toFixed(1)+'px';
      el.style.willChange='opacity,filter,translate';
      el._fx.on=true;
    }
  }
  /* scroll-spy */
  const spyLinks=[...document.querySelectorAll('.nav ul a[href^="#"], .subnav a[href^="#"]')];
  function spy(){
    if(!spyLinks.length)return;
    let cur=null;
    spyLinks.forEach(a=>{const s=document.getElementById(a.getAttribute('href').slice(1));if(!s)return;const r=s.getBoundingClientRect();if(r.top<=innerHeight*0.4&&r.bottom>innerHeight*0.4)cur=a});
    spyLinks.forEach(a=>a.classList.toggle('on',a===cur));
  }
  function onScroll(){
    paint();spy();
    const t=document.querySelector('.totop');if(t)t.classList.toggle('show',scrollY>700);
  }
  let tick=false;
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(()=>{tick=false;onScroll()})}},{passive:true});
  addEventListener('resize',onScroll);

  /* tilt on impact tiles */
  if(matchMedia('(hover:hover)').matches&&!RM){
    document.addEventListener('pointermove',e=>{
      const t=e.target.closest&&e.target.closest('.tile');
      if(!t)return;
      const r=t.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      t.style.setProperty('--ry',(x*12).toFixed(2)+'deg');
      t.style.setProperty('--rx',(-y*12).toFixed(2)+'deg');
    });
    document.addEventListener('pointerout',e=>{
      const t=e.target.closest&&e.target.closest('.tile');
      if(t&&!t.contains(e.relatedTarget)){t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')}
    });
  }

  /* page transitions between real .html pages */
  document.addEventListener('click',e=>{
    const a=e.target.closest&&e.target.closest('a[href]');
    if(!a||RM||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download'))return;
    const h=a.getAttribute('href');
    if(!/\.html(\?|#|$)/.test(h))return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(()=>{location.href=a.href},320);
  });
  addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});

  /* in-page view swap (used by the single-file preview) */
  function transition(cb){
    if(RM){cb();return}
    document.body.classList.add('leaving');
    setTimeout(()=>{
      cb();
      document.body.classList.remove('leaving');
      document.body.classList.remove('entering');void document.body.offsetWidth;
      document.body.classList.add('entering');
      setTimeout(()=>document.body.classList.remove('entering'),800);
      paint();
    },320);
  }

  /* hero photo card: follows the cursor (tilt + parallax + glare), floats when idle */
  (function(){
    const hero=document.querySelector('.hero'),wrap=document.querySelector('.photo-wrap');
    if(!hero||!wrap||RM)return;
    let tx=0,ty=0,x=0,y=0,go=0,tgo=0,gx=50,gy=40,run=false,raf;
    const photo=wrap.querySelector('.photo');
    function setT(e){
      const r=wrap.getBoundingClientRect();
      tx=clamp((e.clientX-(r.left+r.width/2))/(r.width*0.9),-1,1);
      ty=clamp((e.clientY-(r.top+r.height/2))/(r.height*0.9),-1,1);
      const pr=photo.getBoundingClientRect();
      gx=((e.clientX-pr.left)/pr.width)*100;gy=((e.clientY-pr.top)/pr.height)*100;
      tgo=(e.clientX>=pr.left&&e.clientX<=pr.right&&e.clientY>=pr.top&&e.clientY<=pr.bottom)?1:0.35;
    }
    hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;setT(e)});
    hero.addEventListener('pointerleave',()=>{tx=0;ty=0;tgo=0});
    wrap.addEventListener('pointerdown',e=>{
      const r=photo.getBoundingClientRect();
      const d=document.createElement('span');d.className='ripple';
      d.style.left=(e.clientX-r.left)+'px';d.style.top=(e.clientY-r.top)+'px';
      photo.appendChild(d);setTimeout(()=>d.remove(),850);
    });
    function loop(t){
      x+=(tx-x)*0.09;y+=(ty-y)*0.09;go+=(tgo-go)*0.12;
      const s=wrap.style,k=t/1000;
      s.setProperty('--px',x.toFixed(4));s.setProperty('--py',y.toFixed(4));
      s.setProperty('--gx',gx.toFixed(1)+'%');s.setProperty('--gy',gy.toFixed(1)+'%');s.setProperty('--go',go.toFixed(3));
      s.setProperty('--f1',(Math.sin(k*1.3)*6).toFixed(2));
      s.setProperty('--f2',(Math.sin(k*1.1+2)*7).toFixed(2));
      s.setProperty('--f3',(Math.sin(k*1.5+4)*5).toFixed(2));
      raf=requestAnimationFrame(loop);
    }
    new IntersectionObserver(es=>{es.forEach(en=>{
      if(en.isIntersecting&&!run){run=true;raf=requestAnimationFrame(loop)}
      else if(!en.isIntersecting&&run){run=false;cancelAnimationFrame(raf)}
    })}).observe(wrap);
  })();
  window.FX={scan,paint,transition};
  document.addEventListener('DOMContentLoaded',()=>{scan();spy()});
})();
