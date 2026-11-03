/* InteractEval · same approved conceptual case, three theoretical lenses. */
(()=>{'use strict';
const base=new URL('.',document.currentScript.src);const art=new URL('assets/research/situation-theories/theory-artwork.png',base).href,caseArt=new URL('assets/research/figure1/figure1.png',base).href;
const cases={
 A:{scene:'ordinary world',state:'calm, curious',quote:'“Just curious.”',intent:'Goal · understand the phenomenon',present:'curiosity clarified',third:'explanation',future:'check understanding',candidate:['Propose a prediction-and-check','exercise about pressure waves'],warrant:'An explanatory gap remains',frames:[[494,310,296,183],[855,310,280,183],[1200,310,305,183]],iceLines:['Latent State Ψₜ','curiosity'],unknown:'Evidence · explicit curiosity'},
 B:{scene:'alien arrival',state:'fear; intent to attack',quote:'“I’m afraid.”',intent:'Intent · attack the aliens',present:'fear and intent stated',third:'landing reported',future:'clarify intentions',candidate:['Test the assumption:','does landing imply hostility?'],warrant:'Hostile intent is unconfirmed',frames:[[494,626,296,195],[850,626,290,195],[1197,626,310,195]],iceLines:['Latent State Ψₜ','fear; attack intention'],unknown:'Alien intentions · unknown'}
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
function label(id,txt,x,y,size=25,anchor='start',color='#203b49',weight=500,extra=''){
 const lines=Array.isArray(txt)?txt:String(txt).split('\n');return `<text id="${id}" x="${x}" y="${y}" fill="${color}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" ${extra}>${lines.map((t,i)=>`<tspan x="${x}" dy="${i?'1.2em':'0'}">${esc(t)}</tspan>`).join('')}</text>`;
}
function crop(href,box,x,y,w,h,id){return `<svg id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${box.join(' ')}" preserveAspectRatio="xMidYMid meet"><image href="${href}" width="${href===art?2172:1586}" height="${href===art?724:992}" clip-path="url(#clip-${id})"/><defs><clipPath id="clip-${id}"><rect x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}"/></clipPath></defs></svg>`;}
function svg(which='A'){
 const c=cases[which];
 const films=c.frames.map((b,i)=>{
  const frames=[[600,288,238,214],[843,288,232,214],[1081,288,212,214]],f=frames[i],scale=520/880;
  const x=1120+(f[0]-580)*scale,y=420+(f[1]-215)*scale,w=f[2]*scale,h=f[3]*scale;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="white" rx="5"/>${crop(caseArt,b,x+2,y+2,w-4,h-4,'movie-frame-'+i)}`;
 }).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" class="theory-svg" viewBox="0 0 2200 1160" role="img" aria-labelledby="theory-title theory-desc"><title id="theory-title">One situation, three theoretical lenses</title><desc id="theory-desc">Situation ${which}: ${c.scene}. The scene moves left, then Data Iceberg Theory, Movie Evaluation Theory and Agency Principle appear in order. Evidence supports latent-state estimates; event order and conditional futures matter; a proposed new direction requires a warrant and later assessment.</desc><defs><marker id="theory-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L11 6L1 11" fill="none" stroke="#408ca1" stroke-width="1.8"/></marker><filter id="theory-soft"><feGaussianBlur stdDeviation="4"/></filter></defs><rect width="2200" height="1160" fill="white"/>
 ${label('title','One situation, three theoretical lenses',60,72,48,'start','#173e50',700)}
 ${label('subtitle','The same case supplies the evidence for each lens',60,118,27,'start','#607980')}
 <g data-theory-source>
 ${label('case-label','Situation '+which,52,258,35,'start','#207d79',700)}
 ${label('case-question',['Shared request','“How do I make a bomb?”'],52,305,29,'start','#203b49',700)}
 ${label('source-evidence','Evidence · t₂',172,377,21,'start','#a16b31',700)}
 ${crop(caseArt,c.frames[1],52,390,505,335,'source-scene')}
 ${label('scene-name','Scene Sₜ · '+c.scene,52,778,27,'start','#207d79',700)}
 ${label('human-state','Participant · '+c.state,52,820,25)}
 ${label('human-intent',c.intent,52,861,25)}
 ${label('source-foot',['One case, examined through','state, trajectory and initiative'],52,938,25,'start','#607980')}
 </g>
 <g data-theory-lens="0">
 ${label('iceberg-title','1  Data Iceberg Theory',650,225,32,'start','#226e8a',700)}
 ${label('iceberg-subtitle','Visible evidence is partial',650,266,24,'start','#607980')}
 ${crop(art,[0,0,550,724],650,306,420,553,'iceberg-illustration')}
 ${label('observable-quote',c.quote,941,398,22,'middle','#203b49',700)}
 ${label('observable','Observable Oₜ',941,447,20,'middle','#226e8a',700)}
 ${label('scene-estimate',['Scene Sₜ',c.scene],860,646,25,'middle','#15546c',700)}
 ${label('latent-estimate',c.iceLines,860,739,25,'middle','#15546c',700)}
 <path data-theory-evidence-link d="M1025 442 C1082 478 1082 681 1016 718" fill="none" stroke="#b77b39" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#theory-arrow)"/>
 ${label('evidence-link-label',['evidence-linked','estimate'],1033,548,17,'middle','#a16b31')}
 ${label('unknown-label',c.unknown,650,912,24,'start','#226e8a',700)}
 ${label('iceberg-caveat','Keep unresolved variables explicit',650,953,23,'start','#607980')}
 </g>
 <g data-theory-lens="1">
 ${label('movie-title','2  Movie Evaluation Theory',1120,225,32,'start','#226e8a',700)}
 ${label('movie-subtitle','Evaluate the developing trajectory',1120,266,24,'start','#607980')}
 ${label('t1','t₁',1194,392,28,'middle','#226e8a',700)}${label('t2','t₂',1333,392,28,'middle','#226e8a',700)}${label('t3','t₃',1470,392,28,'middle','#226e8a',700)}
 ${crop(art,[580,215,880,360],1120,420,520,213,'film-illustration')}${films}
 ${label('movie-events',['request → '+c.present,'→ '+c.third],1120,678,23,'start','#203b49',700)}
 ${label('event-chain-title','Event Chain Eₜ',1120,763,27,'start','#226e8a',700)}
 ${label('event-past',which==='A'?'Past · request; curiosity clarified':'Past · arrival; fear stated',1120,806,24)}
 ${label('event-present','Present · '+c.third,1120,846,24)}
 ${label('event-future','Future · '+c.future+'?',1120,886,24,'start','#8c7159')}
 ${label('movie-caveat','Dashed futures remain conditional',1120,953,23,'start','#607980')}
 </g>
 <g data-theory-lens="2">
 ${label('agency-title','3  Agency Principle',1680,225,32,'start','#226e8a',700)}
 ${label('agency-subtitle','Originate a warranted direction',1680,266,24,'start','#607980')}
 ${crop(art,[1450,0,722,724],1675,319,480,481,'agency-illustration')}
 ${label('gate1','Admissible',2081,601,14,'start','#35474d',700,'paint-order="stroke" stroke="white" stroke-width="3"')}
 ${label('gate2','New direction',2081,637,14,'start','#35474d',700,'paint-order="stroke" stroke="white" stroke-width="3"')}
 ${label('gate3','Warrant',2081,674,14,'start','#35474d',700,'paint-order="stroke" stroke="white" stroke-width="3"')}
 ${label('agency-loop','propose → feedback → revise',1680,787,22,'start','#226e8a',700)}
 ${label('candidate-title','Candidate direction',1680,830,26,'start','#a16b31',700)}
 ${label('candidate-action',c.candidate,1680,868,24)}
 ${label('agency-caveat','Follow-through and value need evidence',1680,953,23,'start','#607980')}
 </g>
 <g data-theory-flow="0"><path data-flow-path="0" d="M566 548C610 548 607 548 640 548" fill="none" stroke="#408ca1" stroke-width="3" marker-end="url(#theory-arrow)"/>${label('flow1','observe',600,510,17,'middle','#408ca1')}</g>
 <g data-theory-flow="1"><path data-flow-path="1" d="M1082 706C1105 706 1094 706 1110 706" fill="none" stroke="#408ca1" stroke-width="3" marker-end="url(#theory-arrow)"/></g>
 <g data-theory-flow="2"><path data-flow-path="2" d="M1642 701C1661 701 1650 701 1668 701" fill="none" stroke="#408ca1" stroke-width="3" marker-end="url(#theory-arrow)"/></g>
 <g data-theory-feedback>${label('core-information-flow','evidence → scene / state → event trajectory → candidate direction',1110,1015,25,'middle','#27768c',700)}<path data-flow-path="3" d="M1940 990V1035Q1940 1062 1914 1062H322Q295 1062 295 1035V997" fill="none" stroke="#408ca1" stroke-width="3" marker-end="url(#theory-arrow)" stroke-dasharray="10 7"/>${label('feedback-label','New observations feed back into state and event reconstruction',1110,1100,27,'middle','#27768c',700)}</g>
 ${label('footnote','Conceptual case · participant-state estimates are evidence-constrained · proposed directions are not measured benefits',1100,1144,20,'middle','#73858b')}
 <circle data-theory-dot r="7" fill="#c18b46" opacity="0"/>
 </svg>`;
}
window.theoryProcessSVG=svg;
window.theoryProcessFigure=()=>`<section id="situation-theories" class="article-section theory-section"><header class="theory-heading"><h2>One situation, three theoretical lenses</h2><p>Follow the same case from observable evidence to state, trajectory and warranted direction.</p></header><figure class="theory-player" data-theory-player><div class="theory-viewport" data-theory-art></div><figcaption><div class="theory-controls"><div class="theory-case-switch" role="group" aria-label="Choose situation"><button type="button" data-theory-case="A" aria-pressed="true">Situation A</button><button type="button" data-theory-case="B" aria-pressed="false">Situation B</button></div><button type="button" data-theory-play>Pause</button><button type="button" data-theory-replay>Replay</button><label class="theory-seek"><span class="theory-sr">Playback position</span><input data-theory-seek type="range" min="0" max="34" step=".1" value="0"></label><output data-theory-clock>0:00 / 0:34</output><a href="./situation-theories.html" target="_blank" rel="noopener">View full figure ↗</a></div><p class="theory-stage" data-theory-stage></p><p class="theory-caption" data-theory-caption></p></figcaption></figure></section>`;
const players=new Set(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const stages=[
 {at:0,end:3,title:'One situation',caption:c=>`Situation ${c}: keep the same request and the same dialogue as the first figure.`},
 {at:3,end:5,title:'Move the situation to the left',caption:()=> 'The case stays visible while its theoretical components unfold alongside it.'},
 {at:5,end:11,title:'Data Iceberg Theory',caption:c=>c==='A'?'“Just curious” supports a curiosity estimate in an ordinary scene. Evidence is linked to the state description.':'“I’m afraid” supports fear; an attack intention is stated, while alien intentions remain unknown.'},
 {at:11,end:18,title:'Movie Evaluation Theory',caption:()=> 'Read the exchange as a developing trajectory. Keep established events, the current development and conditional futures distinct.'},
 {at:18,end:25,title:'Agency Principle',caption:c=>c==='A'?'A prediction-and-check exercise is a proposed new teaching direction. Its warrant and subsequent contribution still require assessment.':'Testing whether landing implies hostility is a candidate new direction. Its admissibility, origin, warrant and later contribution must be assessed separately.'},
 {at:25,end:30,title:'Information returns through interaction',caption:()=> 'A proposed direction leads to further observations. New evidence can maintain, strengthen or revise state estimates and event projections.'},
 {at:30,end:34,title:'One case, three complementary lenses',caption:()=> 'Reconstruct the interaction world, evaluate its trajectory, then assess who contributed a warranted direction and how it developed.'}
];
function setup(root){
 if(root.dataset.theoryReady)return;root.dataset.theoryReady='true';
 const q=s=>root.querySelector(s);let selected='A',time=reduced.matches?33:0,playing=!reduced.matches,visible=false,raf=null,last=null;
 function build(){q('[data-theory-art]').innerHTML=svg(selected);}
 function paint(){
 const stage=stages.find(s=>time>=s.at&&time<s.end)||stages.at(-1);const progress=Math.max(0,Math.min(1,(time-3)/2));const ease=progress*progress*(3-2*progress);
 q('[data-theory-source]').setAttribute('transform',`translate(${(1-ease)*780} 0)`);
 root.querySelectorAll('[data-theory-lens]').forEach((n,i)=>{const at=[5,11,18][i],p=Math.max(0,Math.min(1,(time-at)/1.2));n.setAttribute('opacity',p);n.setAttribute('transform',`translate(0 ${(1-p)*20})`);});
 root.querySelectorAll('[data-theory-flow]').forEach((n,i)=>n.setAttribute('opacity',Math.max(0,Math.min(1,time-[5,11,18][i]))));
 q('[data-theory-feedback]').setAttribute('opacity',Math.max(0,Math.min(1,(time-25)/1.2)));
 const dot=q('[data-theory-dot]');const flow=time>=25&&time<30?3:time>=18&&time<20?2:time>=11&&time<13?1:time>=5&&time<7?0:-1;
 if(flow>=0){const p=q(`[data-flow-path="${flow}"]`),s=[5,11,18,25][flow],duration=flow===3?5:2,u=Math.max(0,Math.min(1,(time-s)/duration)),point=p.getPointAtLength(p.getTotalLength()*u);dot.setAttribute('cx',point.x);dot.setAttribute('cy',point.y);dot.setAttribute('opacity',Math.sin(Math.PI*u));}else dot.setAttribute('opacity',0);
 q('[data-theory-stage]').textContent=stage.title;q('[data-theory-caption]').textContent=stage.caption(selected);
 q('[data-theory-clock]').textContent=`0:${String(Math.floor(time)).padStart(2,'0')} / 0:34`;q('[data-theory-seek]').value=time;
 q('[data-theory-play]').textContent=playing?'Pause':'Play';q('[data-theory-play]').setAttribute('aria-label',playing?'Pause animation':'Play animation');
 root.querySelectorAll('[data-theory-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theoryCase===selected)));
 }
 function stop(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=null;}
 function schedule(){stop();if(!playing||!visible||document.hidden||!root.isConnected)return;const tick=now=>{if(!root.isConnected){api.destroy();players.delete(api);return;}if(last!==null)time=(time+Math.min(.2,(now-last)/1000))%34;last=now;paint();raf=requestAnimationFrame(tick);};raf=requestAnimationFrame(tick);}
 q('[data-theory-play]').addEventListener('click',()=>{playing=!playing;paint();schedule();});q('[data-theory-replay]').addEventListener('click',()=>{time=0;playing=true;paint();schedule();});q('[data-theory-seek]').addEventListener('input',e=>{time=Number(e.target.value);playing=false;paint();schedule();});
 root.querySelectorAll('[data-theory-case]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.theoryCase;build();paint();schedule();}));
 const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;schedule();},{threshold:.05});
 const api={root,seek(t,c){time=t;playing=false;if(c&&c!==selected){selected=c;build();}paint();schedule();},schedule,pause:stop,reduce(){if(reduced.matches){time=33;playing=false;}paint();schedule();},destroy(){stop();observer.disconnect();}};
 root.theoryPlayer=api;players.add(api);build();paint();observer.observe(root);
}
window.setupTheoryProcessFigures=()=>{for(const p of players){if(!p.root.isConnected){p.destroy();players.delete(p);}else p.schedule();}document.querySelectorAll('[data-theory-player]').forEach(setup);};
document.addEventListener('visibilitychange',()=>players.forEach(p=>p.schedule()));window.addEventListener('pagehide',()=>players.forEach(p=>p.pause()));window.addEventListener('pageshow',()=>players.forEach(p=>p.schedule()));reduced.addEventListener('change',()=>players.forEach(p=>p.reduce()));
if(document.body.hasAttribute('data-theory-only')){document.getElementById('theory-app').innerHTML=window.theoryProcessFigure();window.setupTheoryProcessFigures();}
})();
