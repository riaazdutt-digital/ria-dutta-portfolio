/* Shared helpers: icons + case study card builder */
const A='assets/';
const STAR='<svg viewBox="0 0 24 24"><path d="M12 1.5c.7 5.2 2.3 8.6 4.1 9.4 1.2.6 3.4 1.1 6.4 1.1-3 .2-5.200.7-6.400 1.300-1.800.900-3.400 4.300-4.100 9.400-.7-5.100-2.300-8.500-4.100-9.400-1.200-.6-3.400-1.100-6.400-1.300 3 0 5.200-.5 6.400-1.100 1.800-.8 3.400-4.200 4.100-9.400z" fill="#FF6B2C"/></svg>';
const AMZ='<svg viewBox="0 0 24 24"><text x="12" y="15" font-size="16" font-weight="800" text-anchor="middle" fill="currentColor" font-family="Outfit,sans-serif">a</text><path d="M4.500 18.500c4.500 2.600 10.500 2.600 15 0" stroke="#FF9900" stroke-width="1.900" fill="none" stroke-linecap="round"/></svg>';
const st='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const LI={
 trend:`<svg viewBox="0 0 24 24" ${st}><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>`,
 down:`<svg viewBox="0 0 24 24" ${st}><path d="M7 7l10 10"/><path d="M17 8v9H8"/></svg>`,
 target:`<svg viewBox="0 0 24 24" ${st}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.500"/></svg>`,
 cross:`<svg viewBox="0 0 24 24" ${st}><circle cx="12" cy="12" r="8"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/></svg>`,
 mega:`<svg viewBox="0 0 24 24" ${st}><path d="M3 11v3a1 1 0 001 1h2l7 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M17 9a4 4 0 010 6"/></svg>`,
 globe:`<svg viewBox="0 0 24 24" ${st}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>`,
 sync:`<svg viewBox="0 0 24 24" ${st}><path d="M20 11a8 8 0 00-14-4L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0014 4l2-2"/><path d="M20 20v-5h-5"/></svg>`,
 arrow:`<svg viewBox="0 0 24 24" ${st}><path d="M7 17L17 7M8 7h9v9"/></svg>`,
 up:`<svg viewBox="0 0 24 24" ${st}><path d="M6 15l6-6 6 6"/></svg>`
};
const LEVERS=[
 ['ROAS & ROI improvement','trend','Returns, not reach','ROAS & ROI improvement','I moved a brand\u2019s monthly ROAS from 1.5\u00d7 to 4\u00d7 at Amazon and delivered ~200% average monthly ROI on lead-gen at QS. Returns are the metric I defend first.'],
 ['CPL / CAC / CPC reduction','down','Cheaper every quarter','CPL / CAC / CPC reduction','Cut CPL from (INR) 1,200 to (INR) 250 at Vtiger by restructuring search intent, and held B2C leads around (INR) 200 across 20+ QS clients.'],
 ['ACOS reduction','target','Waste out, margin in','ACOS reduction','Took a Beauty brand\u2019s monthly ACOS from 70% to 20% at Amazon through proactive defect tracking and placement optimisation.'],
 ['TACOS improvement','cross','Profit, not just ads','TACOS improvement','I treat ACOS and total-sales efficiency together: fix wasted ad spend first, then scale what is proven, so ad growth does not outrun the brand\u2019s overall sales.'],
 ['Brand SOV improvement','mega','Own the shelf','Brand SOV improvement','Category-level share tracking with Amazon Pi \u2014 search rank, glance views and market share turned into briefings brand stakeholders actually act on.'],
 ['QoQ website traffic growth','globe','Traffic that converts','QoQ website traffic growth','Grew landing and product page traffic 160% quarter-on-quarter at Vtiger through Search and Display strategy.'],
 ['Conversion rate improvement','sync','More from every click','Conversion rate improvement','Landing page redesigns plus CTA and creative A/B tests lifted conversion rates 15\u201325% \u2014 and took one campaign\u2019s ROAS from 0.7 to 1.3 in four months.']
];
const circ=(l,bg,fg)=>`<span class="ic circ" style="background:${bg};color:${fg||'#fff'}">${l}</span>`;
const im=(f)=>`<span class="ic"><img src="${A}logos/${f}" alt=""></span>`;
const sv=(s)=>`<span class="ic">${s}</span>`;
const G='<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.600 12.200c0-.7-.1-1.300-.2-1.900H12v3.600h5.400a4.600 4.600 0 01-2 3v2.500h3.200c1.900-1.700 3-4.300 3-7.200z"/><path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.500l-3.200-2.500c-.9.600-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0012 22z"/><path fill="#FBBC05" d="M6.400 14c-.2-.6-.3-1.300-.3-2s.1-1.400.3-2V7.400H3.100a10 10 0 000 9.200z"/><path fill="#EA4335" d="M12 5.900c1.500 0 2.800.5 3.800 1.500l2.800-2.800A10 10 0 003.100 7.400L6.400 10c.8-2.300 3-4.100 5.600-4.100z"/></svg>';
const TOOLS=[
 ['Paid media platforms',[['Meta Ads',im('meta-icon.png')],['Google Ads',im('google-ads-icon.png')],['Amazon Ads',sv(AMZ)],['Flipkart Ads',im('flipkart.png')],['Quick-Commerce Ads',circ('Z','#3b0764')]]],
 ['AI platforms',[['Claude',sv('<svg viewBox="0 0 24 24" stroke="#D97757" stroke-width="2.200" stroke-linecap="round"><path d="M12 3v18M3 12h18M5.600 5.600l12.800 12.800M18.400 5.600L5.600 18.400"/></svg>')],['Claude Code',sv('<svg viewBox="0 0 24 24" fill="none" stroke="#D97757" stroke-width="2.200" stroke-linecap="round"><path d="M4 19L9 5l5 14M6 14h6M16 19l3-9"/></svg>')],['ChatGPT',sv('<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.700"><path d="M12 3l7.500 4.300v8.700L12 20.300 4.500 16V7.300z"/><path d="M12 3v8.600l7.500 4.400M12 11.600L4.500 16"/></svg>')],['Emergent',circ('E','#D9F24F','#111')],['Wispr Flow',circ('W','#1677FF')],['Gemini',sv('<svg viewBox="0 0 24 24"><path d="M12 2c.6 5.600 4.400 9.400 10 10-5.600.6-9.400 4.400-10 10-.6-5.600-4.400-9.400-10-10 5.600-.6 9.400-4.400 10-10z" fill="#9B87C4"/></svg>')],['Perplexity',sv('<svg viewBox="0 0 24 24" fill="none" stroke="#2BB8C9" stroke-width="1.800" stroke-linejoin="round"><path d="M12 2v20M6 6l6 5 6-5M6 6v7l6 4 6-4V6M6 13l-3 3V8l3-2M18 13l3 3V8l-3-2"/></svg>')],['Adsbrew',circ('A','#7B4DFF')],['Adscopilot',circ('AC','#FF6B2C')]]],
 ['Analytics & tracking',[['Google Analytics 4',sv('<svg viewBox="0 0 24 24"><rect x="3" y="13" width="5" height="8" rx="2.500" fill="#F9AB00"/><rect x="9.500" y="8" width="5" height="13" rx="2.500" fill="#F9AB00"/><rect x="16" y="3" width="5" height="18" rx="2.500" fill="#E37400"/></svg>')],['Google Tag Manager',sv('<svg viewBox="0 0 24 24"><path d="M12 2l10 10-10 10L2 12z" fill="#4285F4"/><path d="M12 8l4 4-4 4-4-4z" fill="#fff"/></svg>')],['Amazon Pi',circ('PI','#FF9900')],['Meta/Google pixels',im('meta-icon.png')+sv(G)],['Microsoft Clarity',sv('<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8.500" height="8.500" fill="#5E5ADB"/><rect x="12.500" y="3" width="8.500" height="8.500" fill="#7C79E8"/><rect x="3" y="12.500" width="8.500" height="8.500" fill="#7C79E8"/><rect x="12.500" y="12.500" width="8.500" height="8.500" fill="#5E5ADB"/></svg>')]]],
 ['Data & reporting',[['Advanced Excel',sv('<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#1D6F42"/><path d="M8 9l8 6M16 9l-8 6" stroke="#fff" stroke-width="1.800"/></svg>')],['Google Workspace',sv(G)],['NotebookLM',circ('N','#4B8DF8')]]],
 ['Social media marketing tools',[['Hootsuite',sv('<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="#F04E37"/><circle cx="9" cy="12" r="2" fill="#fff"/><circle cx="15" cy="12" r="2" fill="#fff"/><circle cx="9" cy="12" r=".9" fill="#111"/><circle cx="15" cy="12" r=".9" fill="#111"/></svg>')],['SocialPilot',circ('S','#E8483B')]]],
 ['Creative tools',[['Canva',circ('','#18C5C5')],['Gemini Flow',circ('F','#8E6CC0')]]],
 ['Project management tools',[['ClickUp',sv('<svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16l4.500-3.500L14 16M9 9l3-2.500L15 9"/></svg>')],['Asana',sv('<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#F06A6A"/><circle cx="6.500" cy="16.500" r="4" fill="#F06A6A"/><circle cx="17.500" cy="16.500" r="4" fill="#F06A6A"/></svg>')],['Zoho CRM',sv('<svg viewBox="0 0 24 24" fill="none" stroke="#D4344A" stroke-width="1.800"><rect x="2" y="9" width="4.500" height="6" rx="1"/><rect x="7.500" y="9" width="4.500" height="6" rx="1"/><rect x="13" y="9" width="4.500" height="6" rx="1"/><rect x="18.500" y="9" width="3.500" height="6" rx="1"/></svg>')],['Salesforce CRM',sv('<svg viewBox="0 0 24 24"><path d="M7 18a4 4 0 01-.600-7.900A5 5 0 0116 8.500a4 4 0 012 7.500 3.500 3.500 0 01-4 2 4 4 0 01-7 0z" fill="#00A1E0"/></svg>')]]]
];
const IMPACT=[
 ['p','amz','(INR) 5Cr+','monthly ad budgets managed','26+ brands \u00b7 Amazon India'],
 ['o','amz','115%','ad sales uplift vs BAU','key Amazon events, on +77% spend'],
 ['l','amz','70\u219220%','monthly ACOS cut','one Amazon brand'],
 ['p','amz','1.5x\u21924x','monthly ROAS lift','one brand, via bids & structure'],
 ['o','g','(INR) 1,200\u2192250','cost per lead at Vtiger','search restructuring & landing pages'],
 ['l','m','-61%','ad costs, +30% quarterly sales','Vtiger CRM \u00b7 Google & Meta'],
 ['p','g','160%','landing-page traffic growth QoQ','Search + Display'],
 ['o','m','4.96x','purchase ROAS on a new launch','Gatim Fashion \u00b7 397 purchases']
];

/* ---- Case study cards ---- */
const LOGOF={"ivey": "ivey.png", "nutrabay": "nutrabay.png", "volt": "volt.jpg", "whimsy": "whimsy.png", "cureveda": "cureveda.png", "vtiger": "vtiger.png", "elements": "elements.jpg", "mohor": "mohor.jpg", "kiro": "kiro.jpg", "ultimutt": "ultimutt.jpg", "birmingham": "birmingham.png", "protogrow": "protogrow.png", "gatim": "gatim.png"};
const COVER={volt:{f:'volt.jpg',t:'cover'},kiro:{f:'kiro.jpg',t:'cover'},vtiger:{f:'vtiger.png',t:'logo',bg:'#ECE9E1'},gatim:{f:'gatim.png',t:'logo',bg:'#F47A2B'},birmingham:{f:'birmingham.png',t:'logo',bg:'#ECE9E1'},elements:{f:'elements.jpg',t:'logo',bg:'#ECE9E1'}};
function badge(c){
  if(c.platform.startsWith('Amazon'))return `<span class="badge"><img class="wide" src="${A}logos/amazon-ads.png" alt="Amazon Ads"></span>`;
  if(c.platform.startsWith('Meta'))return `<span class="badge"><img src="${A}logos/meta-icon.png" alt="Meta Ads"></span>`;
  return `<span class="badge"><img src="${A}logos/google-ads-icon.png" alt="Google Ads"></span>`;
}
function card(c,mode){
  let media;
  if(mode==='thumb')media=`<img class="thumb" src="${A}evidence/${c.id}.jpg" alt="${c.brand} campaign screenshot" loading="lazy">`;
  else{const v=COVER[c.id]||{f:LOGOF[c.id],t:'logo'};media=`<img class="${v.t}" src="${A}logos/${v.f}" alt="${c.brand} logo">`;}
  const bg=(mode!=='thumb'&&COVER[c.id]&&COVER[c.id].bg)?` style="background:${COVER[c.id].bg}"`:'';
  const t=c.tiles.slice(0,2);
  return `<a class="pc" href="case-study.html?id=${c.id}" data-fam="${c.family.join('|')}">
   <div class="im"${bg}><div class="imc">${media}</div>${badge(c)}</div>
   <div class="bd"><h4>${c.brand}</h4><div class="meta">${c.platform} \u00b7 ${c.short}</div>
   <p class="hd">${c.headline}</p>
   <div class="nums">${t.map(x=>`<div><b>${x.value}</b><small>${x.label}</small></div>`).join('')}</div>
   <span class="read">Read case study ${LI.arrow}</span></div></a>`;
}
document.addEventListener('DOMContentLoaded',()=>{
  const t=document.createElement('a');t.href='#top';t.className='totop';t.setAttribute('aria-label','Back to top');t.innerHTML=LI.up;document.body.appendChild(t);
  t.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});
});
