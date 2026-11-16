'use strict';

const navigationIcons={
  scatter:'<path d="M4 4v16h16"/><circle cx="8" cy="15" r="1"/><circle cx="12" cy="11" r="1"/><circle cx="16" cy="13" r="1"/><circle cx="19" cy="6" r="1"/>',
  trajectory:'<path d="M3 17l5-7 5 3 8-8M3 10l5 3 5 5 8-2"/>',
  computation:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4m-9 2 3-4h-3l2-4"/>',
  pressure:'<path d="M12 3v17m-7-2h14M4 7h16M6 7l-3 6h6L6 7Zm12 0-3 6h6l-3-6Z"/>',

  stages:'<path d="M3 20h6v-5h6v-5h6V4M3 20V9m0 11h18"/>',
  architecture:'<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="7" height="6" rx="1"/><rect x="15" y="16" width="7" height="6" rx="1"/><path d="M12 8v4H5.5v4M12 12h6.5v4"/>',
  overview:'<path d="M4 17V9m8 8V4m8 13v-6M3 21h18"/>',
  capability:'<path d="m12 3 8 5v8l-8 5-8-5V8Z"/><path d="m4 8 8 5 8-5m-8 5v8"/>',
  scenario:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  behavior:'<path d="M4 7h10m-3-3 3 3-3 3M20 17H10m3-3-3 3 3 3M4 17h2M18 7h2"/>',
  outcome:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  duration:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
  partner:'<circle cx="8" cy="8" r="3"/><path d="M2 20v-2a6 6 0 0 1 12 0v2m2-15a3 3 0 0 1 0 6m2 3a6 6 0 0 1 4 6"/>',
  repeat:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-2l2 3M4 16l2 3a7 7 0 0 0 12-2"/>',
  agent:'<rect x="5" y="7" width="14" height="14" rx="3"/><path d="M12 3v4M3 12h2m14 0h2M9 12h.01M15 12h.01M9 17h6"/>',
  media:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1"/><path d="m3 17 5-5 4 4 4-6 5 7"/>',
  conversation:'<path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 0 1 7-13h2a8 8 0 0 1 8 8Z"/><path d="M8 9h8M8 13h5"/>',
  theory:'<path d="M3 5c4-2 6-2 9 0 3-2 5-2 9 0v15c-4-2-6-2-9 0-3-2-5-2-9 0Z"/><path d="M12 5v15"/>',
  rubric:'<path d="M5 20h14M7 16h10M9 12h6M11 8h2M12 3v2"/>',
};
function navigationIcon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navigationIcons[name]||navigationIcons.overview}</svg>`;}

function setupSiteMenu(){
  const menu=document.querySelector('.site-menu');
  if(!menu)return;
  const panel=menu.querySelector('nav'),summary=menu.querySelector('summary');
  const home='./index.html',research='./research.html',showcase='./showcase.html';
  const destinations=[
    ['Main',home],
    ['Findings',home+'#key-findings'],
    ['Models',home+'#models',[
      ['All evaluations',home+'#models'],
      ['Capabilities',home+'#models?category=Capabilities'],
      ['Scenario conditions',home+'#models?category=Scenarios'],
      ['Behavior',home+'#models?category=Behavior'],
      ['Outcomes',home+'#models?category=Outcomes'],
      ['Conversation length',home+'#models?category=Duration'],
      ['Partners &amp; roles',home+'#models?category=Partners'],
      ['Repeatability',home+'#models?category=Reliability']
    ]],
    ['Agents',home+'#agents',[
      ['Compare architectures',home+'#agents'],
      ...['MetaMind','Cognizer','Claude Code'].map(name=>[name,home+'#agents?architecture='+encodeURIComponent(name)])
    ]],
    ['Image, Speech, Video',home+'#multimodal'],
    ['Showcase',showcase,[
      ['All conversations',showcase],
      ['Task-oriented',showcase+'#cases?purpose=functional'],
      ['Open-ended',showcase+'#cases?purpose=nonfunctional']
    ]],
    ['Leaderboards',home+'#leaderboards',[
      ['Overall ranking',home+'#leaderboards'],
      ['Interaction stages',home+'#leaderboards?metric=stage2'],
      ['Scenario performance',home+'#leaderboards?metric=nonfunctional'],
      ['Partner-role capability',home+'#leaderboards?metric=user-composite']
    ]],
    ['Research',research,[
      ['Three theoretical ideas',research+'#theory'],
      ['Instrument architecture',research+'#architecture'],
      ['World components',research+'#components'],
      ['Time-indexed records',research+'#temporal-records'],
      ['Key findings',research+'#discoveries'],
      ['Scenario design',research+'#scenario-space'],
      ['Capability rubric',research+'#rubric']
    ]]
  ];
  const link=([label,href])=>`<a href="${href}">${label}</a>`;
  panel.innerHTML=destinations.map(([label,href,items],index)=>{
    const id='site-menu-group-'+index;
    const children=items?`<button type="button" aria-label="${label} links" aria-expanded="false" aria-controls="${id}"></button><ul id="${id}" hidden>${items.map(item=>`<li>${link(item)}</li>`).join('')}</ul>`:'';
    return `<div class="site-menu-row">${link([label,href])}${children}</div>`;
  }).join('');

  panel.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(button){
      const list=document.getElementById(button.getAttribute('aria-controls'));
      list.hidden=!list.hidden;
      button.setAttribute('aria-expanded',String(!list.hidden));
    }
  });
  document.addEventListener('click',event=>{
    if(!menu.contains(event.target)||event.target.closest('.site-menu-panel a'))menu.open=false;
  });
  menu.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu.open){
      menu.open=false;
      summary.focus();
    }
  });
}
setupSiteMenu();

let headerHeroObserver;
function syncEditorialHeader(){
  if(headerHeroObserver)headerHeroObserver.disconnect();
  const hero=document.querySelector('.journal-hero'),header=document.querySelector('.masthead');
  if(!hero){document.body.classList.remove('nav-on-hero');return;}
  const height=header.offsetHeight;
  const update=()=>document.body.classList.toggle('nav-on-hero',hero.getBoundingClientRect().bottom>height);
  update();
  headerHeroObserver=new IntersectionObserver(update,{rootMargin:`-${height}px 0px 0px 0px`,threshold:0});
  headerHeroObserver.observe(hero);
}
