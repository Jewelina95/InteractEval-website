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
function atlasHero(){
  return `<section class="atlas-hero atlas-hero--animated" aria-labelledby="atlas-hero-title">
    <h1 id="atlas-hero-title">The measurement of intelligence<br/> is the ability to change</h1>
    ${atlasWorldFigure()}
    <div class="atlas-hero-actions">
      <a href="#response-interaction" data-research-section="response-interaction">Why interact <span aria-hidden="true">&#8595;</span></a>
    </div>
  </section>`;
}
const atlasWorldLayers = [
  {name:'galaxy', hit:11.3},
  {name:'mountain', hit:30},
  {name:'timeline', hit:44},
  {name:'waves', hit:60},
  {name:'city', hit:84}
];

const atlasWorldDustCount = 20;

function atlasWorldFigure(){
  const art = './assets/hero/layered-city.webp';
  const dust = '<span class="atlas-world-dust"></span>'.repeat(atlasWorldDustCount);
  return `<figure class="atlas-world" style="--world-image:url('${art}')">
    <div class="atlas-world-stage" role="img" aria-label="A beam descends from a galaxy through four floating layers, revealing each in a cloud of light.">
      <img class="atlas-world-art" src="${art}" width="1280" height="854" alt="" fetchpriority="high" decoding="async"/>
      ${atlasWorldLayers.map(({name,hit}) => `
        <span aria-hidden="true" class="atlas-world-layer atlas-world-layer--${name}" style="--hit:${hit}%">
          <span class="atlas-world-slice"><span class="atlas-world-ink"></span></span>
          <span class="atlas-world-impact">
            <span class="atlas-world-mist"></span><span class="atlas-world-ripple"></span>${dust}
          </span>
        </span>`).join('')}
      <span aria-hidden="true" class="atlas-world-beam"></span>
      <span aria-hidden="true" class="atlas-world-signal">
        <span class="atlas-world-trail"></span>
        <span class="atlas-world-core"></span>
      </span>
    </div>
    <div class="atlas-world-controls">
      <button type="button" class="atlas-world-sound" hidden aria-pressed="false">Sound</button>
      <button type="button" class="atlas-world-replay" hidden aria-label="Replay layer animation" title="Replay layer animation">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5v5h5M4.4 10a8 8 0 1 1 .8 6"/></svg>
      </button>
    </div>
  </figure>`;
}

function animateAtlasWorldImpact(layer, delay, width, layerIndex){
  const mist = layer.querySelector('.atlas-world-mist');
  const ripple = layer.querySelector('.atlas-world-ripple');
  const dust = [...layer.querySelectorAll('.atlas-world-dust')];
  const spread = width * (.17 + layerIndex * .038);
  const haze = mist.animate([
    {opacity:0, scale:'.09 .4', easing:'ease-out'},
    {opacity:.94, scale:'.63 .88', offset:.16, easing:'ease-out'},
    {opacity:.68, scale:'.98 1.13', offset:.48},
    {opacity:.28, scale:'1.14 1.28', offset:.76},
    {opacity:0, scale:'1.28 1.48'}
  ], {duration:2900, delay});
  const ring = ripple.animate([
    {opacity:0, scale:'.08 .13'},
    {opacity:.52, scale:'.6 .72', offset:.22},
    {opacity:0, scale:'1.18 1.2'}
  ], {duration:1900, delay:delay + 60, easing:'ease-out'});

  const drift = dust.map((mote, index) => {
    const angle = index * 2.39996 + layerIndex * .8;
    const distance = .34 + (index % 7) * .11;
    const x = Math.cos(angle) * spread * distance;
    const y = (Math.sin(angle) * .28 - .05) * spread * distance;
    const size = .48 + (index % 5) * .24;
    return mote.animate([
      {opacity:0, transform:'translate(0, 0) scale(.35)', easing:'ease-out'},
      {opacity:.85, transform:`translate(${x * .47}px, ${y * .44}px) scale(${size})`, offset:.24, easing:'ease-out'},
      {opacity:.6, transform:`translate(${x * .82}px, ${y * .81 - 3}px) scale(${size * .84})`, offset:.58},
      {opacity:.22, transform:`translate(${x * .95}px, ${y - 7}px) scale(${size * .53})`, offset:.84},
      {opacity:0, transform:`translate(${x}px, ${y - 11}px) scale(.24)`}
    ], {delay:delay + index % 6 * 45, duration:2170 + index % 7 * 130});
  });
  return [haze, ring, ...drift];
}

function playAtlasWorldChime(context, output, time, layer){
  const pitch = [784, 988, 880, 740, 330][layer];
  const city = layer === atlasWorldLayers.length - 1;
  const tones = [[pitch, .115, city ? .52 : .29], [pitch * 2.01, .035, .18]];
  if(city) tones.push([pitch * .5, .055, .34]);
  for(const [frequency, volume, length] of tones){
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(.0001, time);
    envelope.gain.exponentialRampToValueAtTime(volume, time + .014);
    envelope.gain.exponentialRampToValueAtTime(.0001, time + length);
    oscillator.connect(envelope).connect(output);
    oscillator.start(time);
    oscillator.stop(time + length + .02);
  }
}

let atlasWorldCleanup;

function setupAtlasWorld(){
  const figure = document.querySelector('.atlas-world');
  if(figure?.dataset.ready) return;
  atlasWorldCleanup?.();
  atlasWorldCleanup = undefined;
  if(!figure) return;
  figure.dataset.ready = 'true';

  const stage = figure.querySelector('.atlas-world-stage');
  const layers = [...stage.querySelectorAll('.atlas-world-layer')];
  const beam = stage.querySelector('.atlas-world-beam');
  const signal = stage.querySelector('.atlas-world-signal');
  const core = signal.querySelector('.atlas-world-core');
  const trail = signal.querySelector('.atlas-world-trail');
  const replay = figure.querySelector('.atlas-world-replay');
  const sound = figure.querySelector('.atlas-world-sound');
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const start = atlasWorldLayers[0].hit;
  const end = 93;
  const leadIn = 480;
  const duration = 6200;
  let animations = [];
  let started = false;
  let audio;
  let output;
  let soundEnabled = false;
  let observer;

  function stopSound(){
    output?.disconnect();
    output = undefined;
  }

  function onVisibility(){
    if(document.hidden) stopSound();
  }

  document.addEventListener('visibilitychange', onVisibility);
  atlasWorldCleanup = () => {
    observer?.disconnect();
    animations.forEach(animation => animation.cancel());
    stopSound();
    if(audio) void audio.close();
    document.removeEventListener('visibilitychange', onVisibility);
  };

  function play(){
    started = true;
    animations.forEach(animation => animation.cancel());
    animations = [];
    stopSound();
    const still = reducedMotion.matches || typeof stage.animate !== 'function';
    figure.classList.toggle('atlas-world-static', still);
    replay.hidden = still;
    sound.hidden = still || !AudioContext;
    if(still) return;
    const width = stage.clientWidth;
    const audible = soundEnabled && audio?.state === 'running' && !document.hidden;
    const soundStart = audible ? audio.currentTime : 0;
    if(audible){
      output = audio.createGain();
      output.gain.value = .7;
      output.connect(audio.destination);
    }

    animations = layers.flatMap((layer, index) => {
      const {hit} = atlasWorldLayers[index];
      const delay = leadIn + duration * (hit - start) / (end - start);
      if(output) playAtlasWorldChime(audio, output, soundStart + delay / 1000, index);
      const reveal = layer.querySelector('.atlas-world-ink').animate([
        {opacity:0}, {opacity:1}
      ], {duration:760, delay, fill:'forwards', easing:'ease-out'});
      return [reveal, ...animateAtlasWorldImpact(layer, delay, width, index)];
    });

    const travel = {duration, delay:leadIn};
    const position = progress => `${start + (end - start) * progress}%`;
    animations.push(
      beam.animate([
        {scale:'.78 0', opacity:0},
        {scale:'1 .14', opacity:.94, offset:.14},
        {scale:'1.13 .48', opacity:.9, offset:.48},
        {scale:'1.04 .86', opacity:.82, offset:.86},
        {scale:'.9 1', opacity:0}
      ], travel),
      signal.animate([
        {top:position(0), opacity:0},
        {top:position(.055), opacity:1, offset:.055},
        {top:position(.92), opacity:1, offset:.92},
        {top:position(1), opacity:0}
      ], travel),
      core.animate([
        {scale:'.5 .9'}, {scale:'1.04 1.4'}, {scale:'.86 1'},
        {scale:'1.17 1.52'}, {scale:'.72 .88'}, {scale:'1.14 1.28'}, {scale:'.55 .9'}
      ], {...travel, easing:'ease-in-out'}),
      trail.animate([
        {scale:'.6 .27'}, {scale:'1 .8'}, {scale:'.78 1.13'},
        {scale:'1.18 .9'}, {scale:'.82 1.18'}, {scale:'.52 .52'}
      ], travel)
    );
  }

  replay.addEventListener('click', async () => {
    if(soundEnabled && audio?.state === 'suspended'){
      await audio.resume().catch(() => {});
    }
    if(figure.isConnected) play();
  });
  sound.addEventListener('click', async () => {
    soundEnabled = !soundEnabled;
    sound.setAttribute('aria-pressed', String(soundEnabled));
    if(!soundEnabled){
      stopSound();
      return;
    }
    try{
      audio ??= new AudioContext();
      await audio.resume();
      if(soundEnabled && figure.isConnected) play();
    }catch{
      soundEnabled = false;
      sound.setAttribute('aria-pressed', 'false');
    }
  });
  if(reducedMotion.matches || !('IntersectionObserver' in window)){
    figure.classList.add('is-in-view');
    play();
    return;
  }

  observer = new IntersectionObserver(([entry]) => {
    const visible = entry.intersectionRatio >= .25;
    figure.classList.toggle('is-in-view', visible);
    if(!visible) stopSound();
    if(visible && !started) play();
  }, {threshold:.25});
  observer.observe(stage);
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
