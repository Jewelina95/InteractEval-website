'use strict';

const atlasFindings=[
  {id:'initiative',measure:'stage-profile',title:"What separates today's models is their ability to proactively advance an interaction.",description:'Across ten systems, the score range widens from 0.035 in passive execution to 0.370 in proactive promotion — a 10.6-fold difference in separation.',source:'Table 5 · Figure 7',destination:'Compare the three capability stages'},
  {id:'information',measure:'information',title:'More information can make a model perform worse.',description:'All three matched models score lower with partial than insufficient information. One possible explanation is that an obvious gap prompts clarification, while a partial specification invites unsupported assumptions.',source:'Tables 7–8 · Figures 8 and 10',destination:'Compare information conditions'},
  {id:'partners',measure:'pairings',title:"An AI's interactive performance depends on both its own capabilities and its ability to understand and adapt to its partner.",description:'The same assistant performs differently across partners. The 10 × 10 evaluation reveals a pairing effect beyond the separate effects of assistant and partner identity.',source:'Tables 11 and 29 · Figure 11',destination:'Explore all 100 pairings'}
];
let atlasMobileGroup=0;
const atlasSymbols={
  mind:'<path d="M12 57V38a19 19 0 0 1 38 0v19M30 64V48m19-23a17 17 0 0 1 19 17v20H50" stroke="currentColor" stroke-width="3"/><circle cx="31" cy="34" r="7" fill="currentColor" opacity=".4"/><path d="M43 34h17m-5-5 5 5-5 5" stroke="currentColor" stroke-width="3"/>',
  grounding:'<circle cx="29" cy="39" r="23" fill="currentColor" opacity=".18"/><circle cx="51" cy="39" r="23" fill="currentColor" opacity=".18"/><path d="m28 40 8 8 17-19" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  awareness:'<circle cx="28" cy="48" r="17" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="48" r="6" fill="currentColor"/><path d="M28 48 57 19m-18 0h18v18M50 56h18M59 47v18" stroke="currentColor" stroke-width="3"/>',
  information:'<rect x="12" y="15" width="23" height="50" rx="3" fill="currentColor" opacity=".2"/><path d="M19 28h9m-9 12h9m-9 12h9M45 24h22M45 40h9M45 56h22" stroke="currentColor" stroke-width="5"/>',
  partner:'<circle cx="23" cy="25" r="10" fill="currentColor"/><circle cx="57" cy="55" r="10" fill="currentColor" opacity=".45"/><path d="M12 57V45h23M68 23v12H45M35 51l10-22" stroke="currentColor" stroke-width="4"/>',
  architecture:'<path d="M12 15h22v22H12zM46 43h22v22H46z" fill="currentColor" opacity=".3"/><path d="M12 43h22v22H12zM46 15h22v22H46zM34 26h12M34 54h12" stroke="currentColor" stroke-width="3"/>',
  iceberg:'<path d="m17 32 20-25 18 25Z" fill="currentColor"/><path d="m10 39 19 30 23-4 17-26Z" fill="currentColor" opacity=".27"/><path d="M6 35h68" stroke="currentColor" stroke-width="3"/><path d="m37 39-8 30 23-4Z" fill="currentColor" opacity=".28"/>',
  movie:'<path d="M12 19h56v42H12Z" fill="currentColor" opacity=".15"/><path d="M12 19h56v42H12Z" stroke="currentColor" stroke-width="3"/><path d="m34 29 17 11-17 11Z" fill="currentColor"/><path d="M19 13v12m14-12v12m14-12v12m14-12v12M19 55v12m14-12v12m14-12v12m14-12v12" stroke="currentColor" stroke-width="3"/>',
  agency:'<path d="M12 61V42h18V27h18V12h19v12H58v15H40v15H22v7Z" fill="currentColor" opacity=".22"/><path d="M12 61h12V49h18V34h18V19h7" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="65" cy="18" r="7" fill="currentColor"/>'
};
function atlasSymbol(name){return `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">${atlasSymbols[name]}</svg>`;}
function atlasHero(){return `<section class="atlas-hero"><div><h1>The measure of intelligence is the ability to change</h1><a href="#response-interaction" data-research-section="response-interaction">Why interact <span aria-hidden="true">&#8595;</span></a></div>${atlasWorldFigure()}</section>`;}
const atlasWorldLayers = [
  {name:'galaxy', hit:11.3},
  {name:'mountain', hit:30},
  {name:'timeline', hit:44},
  {name:'waves', hit:60},
  {name:'city', hit:84}
];

function atlasWorldFigure(){
  const art = './assets/hero/layered-city.webp';
  return `<figure class="atlas-world" style="--world-image:url('${art}')">
    <div class="atlas-world-stage" role="img" aria-label="A particle descends from a galaxy and illuminates four layers in sequence: mountains, a timeline, waves, and a city.">
      <img class="atlas-world-art" src="${art}" width="1280" height="854" alt="" fetchpriority="high" decoding="async"/>
      ${atlasWorldLayers.map(({name,hit}) => `<span aria-hidden="true" class="atlas-world-layer atlas-world-layer--${name}" style="--hit:${hit}%"><span class="atlas-world-ink"></span><span class="atlas-world-pulse"></span></span>`).join('')}
      <span aria-hidden="true" class="atlas-world-signal">
        <span class="atlas-world-trail"></span>
        <span class="atlas-world-mote"></span>
        <span class="atlas-world-mote"></span>
        <span class="atlas-world-mote"></span>
        <span class="atlas-world-core"></span>
      </span>
    </div>
    <button type="button" class="atlas-world-replay" hidden aria-label="Replay layer animation" title="Replay layer animation">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5v5h5M4.4 10a8 8 0 1 1 .8 6"/></svg>
    </button>
  </figure>`;
}

let atlasWorldObserver;
function setupAtlasWorld(){
  const figure = document.querySelector('.atlas-world');
  if(figure?.dataset.ready) return;
  atlasWorldObserver?.disconnect();
  if(!figure) return;
  figure.dataset.ready = 'true';

  const stage = figure.querySelector('.atlas-world-stage');
  const art = stage.querySelector('img');
  const layers = Array.from(stage.querySelectorAll('.atlas-world-layer'));
  const signal = stage.querySelector('.atlas-world-signal');
  const core = signal.querySelector('.atlas-world-core');
  const trail = signal.querySelector('.atlas-world-trail');
  const motes = [...signal.querySelectorAll('.atlas-world-mote')];
  const replay = figure.querySelector('button');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const start = atlasWorldLayers[0].hit;
  const end = 93;
  const leadIn = 540;
  const duration = 5600;
  let animations = [];

  function play(){
    animations.forEach(animation => animation.cancel());
    animations = [];
    if(reducedMotion.matches) return;

    animations = layers.flatMap(layer => {
      const hit = parseFloat(layer.style.getPropertyValue('--hit'));
      const delay = leadIn + duration * (hit - start) / (end - start);
      const reveal = layer.querySelector('.atlas-world-ink').animate([
        {opacity:0}, {opacity:1}
      ], {duration:640, delay, fill:'forwards', easing:'ease-out'});
      const pulse = layer.querySelector('.atlas-world-pulse').animate([
        {opacity:0, scale:'.18 1'},
        {opacity:.78, scale:'.55 1', offset:.24},
        {opacity:0, scale:'1.1 1.9'}
      ], {duration:860, delay, easing:'ease-out'});
      return [reveal,pulse];
    });

    const travel = {duration, delay:leadIn};
    const position = progress => `${start + (end - start) * progress}%`;
    animations.push(
      signal.animate([
        {top:position(0), opacity:0},
        {top:position(.047), opacity:1, offset:.047},
        {top:position(.94), opacity:1, offset:.94},
        {top:position(1), opacity:0}
      ], travel),
      core.animate(
        [.35,1.25,.72,1.38,.86,1.18,.67,1.52,.48]
          .map(scale => ({scale:String(scale), easing:'ease-in-out'})),
        travel
      ),
      trail.animate(
        ['.4 .15','1.1 .65','.65 1','1.25 .72','.7 1.18','.5 .55']
          .map(scale => ({scale, easing:'ease-in-out'})),
        travel
      )
    );

    motes.forEach((mote, index) => {
      const drift = [-13, 10, -6][index];
      animations.push(mote.animate([
        {translate:'0 0', opacity:0},
        {translate:`${drift * .55}px -11px`, opacity:.9, offset:.24},
        {translate:`${drift}px -33px`, opacity:0}
      ], {duration:800 + index * 170, delay:leadIn + index * 140, iterations:4}));
    });
  }

  if(typeof stage.animate !== 'function'){
    figure.classList.add('atlas-world-static');
    return;
  }
  replay.hidden = false;
  replay.addEventListener('click', play);
  const begin = () => {
    if(!figure.isConnected) return;
    if(typeof IntersectionObserver === 'undefined'){play();return;}
    atlasWorldObserver = new IntersectionObserver(([entry], observer) => {
      if(entry.intersectionRatio < .35) return;
      observer.disconnect();
      play();
    }, {threshold:.35});
    atlasWorldObserver.observe(figure);
  };
  if(art.complete && art.naturalWidth) begin();
  else art.addEventListener('load', begin, {once:true});
}

function atlasMobileScores(){
 const columns=[[0,5,6],[1,2,3],[4,5,6]][atlasMobileGroup],names=['Overall','L1','L2','L3','L4','L5','L6'];
 return `<div class="atlas-mobile-switch" role="group" aria-label="Displayed capability levels">${['Overview','L1–L3','L4–L6'].map((label,i)=>`<button type="button" data-atlas-mobile="${i}" aria-pressed="${atlasMobileGroup===i}">${label}</button>`).join('')}</div><div>${publication.models.map(m=>`<div class="atlas-mobile-model"><a href="#model/${encodeURIComponent(m.name)}">${modelIdentity(m.name)}</a><div>${columns.map(i=>{const v=[m.composite,...m.levels][i];return `<button type="button" data-main-level="${i?'L'+i:'composite'}" style="--score-fill:${.06+v*.4}"><span>${names[i]}</span><b>${number(v)}</b></button>`;}).join('')}</div></div>`).join('')}</div>`;
}
function syncAtlasLayout(){
 setupAtlasWorld();
 setupInteractionFigures();
 window.setupWhyInteraction?.();
 window.InteractEvalMotion?.unmountAll();window.InteractEvalMotion?.scan();
 const header=document.querySelector('.masthead');
 if(header){const size=()=>document.documentElement.style.setProperty('--header-height',Math.ceil(header.getBoundingClientRect().height)+'px');size();if(!header.atlasResize){header.atlasResize=new ResizeObserver(size);header.atlasResize.observe(header);}}
 atlasResponsiveTables();
}
function atlasResponsiveTables(){
 document.querySelectorAll('.comparison-data-table,.agent-results-table').forEach(table=>{
   const wrap=table.parentElement;if(wrap.dataset.atlasCards==='true')return;
   const headerNodes=[...table.querySelectorAll('thead th')],heads=headerNodes.map(th=>th.textContent.trim());
   if(heads.length<2)return;
   const cards=document.createElement('div');cards.className='atlas-comparison-cards';
   for(const row of table.querySelectorAll('tbody tr')){
     const cells=[...row.children];if(cells.length!==heads.length)continue;
     const card=document.createElement('article'),name=document.createElement('div'),list=document.createElement('dl');
     if(row.dataset.comparisonModel)card.dataset.comparisonModel=row.dataset.comparisonModel;
     name.className='atlas-comparison-identity';name.innerHTML=cells[0].innerHTML;card.append(name);
     cells.slice(1).forEach((cell,i)=>{const item=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');const identity=headerNodes[i+1].querySelector('.model-identity');if(identity)term.append(identity.cloneNode(true));else term.textContent=heads[i+1];value.innerHTML=cell.innerHTML;if(cell.dataset.comparisonMetric)item.dataset.comparisonMetric=cell.dataset.comparisonMetric;item.append(term,value);list.append(item)});
     card.append(list);cards.append(card);
   }
   wrap.dataset.atlasCards='true';wrap.classList.add('has-atlas-cards');wrap.after(cards);
 });
}
function atlasScrollTo(element){
 if(!element)return;
 const instant=document.documentElement.dataset.uiInput==='keyboard'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 element.scrollIntoView({behavior:instant?'instant':'smooth',block:'start'});
}
document.addEventListener('keydown',()=>{document.documentElement.dataset.uiInput='keyboard'},{capture:true});
document.addEventListener('pointerdown',()=>{document.documentElement.dataset.uiInput='pointer'},{capture:true,passive:true});
document.addEventListener('click',event=>{
 const group=event.target.closest('[data-atlas-mobile]');if(group){atlasMobileGroup=Number(group.dataset.atlasMobile);document.querySelector('.atlas-mobile-scores').innerHTML=atlasMobileScores();}
});
