/* One continuous Situation B: vertical evidence/state depth, horizontal trajectory, warranted direction at a branch. */
(()=>{'use strict';
const base=new URL('.',document.currentScript.src),art=new URL('assets/research/situation-theories/coupled-world.png',base).href;
const txt=(id,t,x,y,size=30,color='#253b40',anchor='start',weight=500)=>`<text id="${id}" x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${(Array.isArray(t)?t:[t]).map((l,i)=>`<tspan x="${x}" dy="${i?'1.22em':0}">${l.replaceAll('&','&amp;').replaceAll('<','&lt;')}</tspan>`).join('')}</text>`;
function bubble(id,lines,x,y,w,h,targetX,targetY,size){
 const cx=x+w/2,cy=y+h/2;const tailX=Math.max(x+40,Math.min(x+w-40,targetX));
 return `<g id="${id}"><path d="M${x+w*.5} ${y} C${x+w*.88} ${y-3} ${x+w+5} ${y+h*.19} ${x+w} ${cy} C${x+w+2} ${y+h*.8} ${x+w*.86} ${y+h+2} ${tailX+23} ${y+h-5} L${targetX} ${targetY} L${tailX-12} ${y+h-5} C${x+w*.12} ${y+h+3} ${x-3} ${y+h*.81} ${x} ${cy} C${x-4} ${y+h*.2} ${x+w*.1} ${y-4} ${x+w*.5} ${y}Z" fill="white" stroke="#2d3736" stroke-width="2.6"/>${txt(id+'-text',lines,cx,cy-(lines.length-1)*size*.61+size*.34,size,'#243437','middle',600)}</g>`;
}
function svg(){return `<svg xmlns="http://www.w3.org/2000/svg" class="theory-svg" viewBox="0 0 3000 1830" role="img" aria-labelledby="coupled-title coupled-desc"><title id="coupled-title">Situation B: a coupled state-and-event trajectory</title><desc id="coupled-desc">One long alien-arrival interaction. Each time slice connects observed dialogue vertically to participant-state estimates. Movie Evaluation Theory connects these state-and-action slices and events over time. Agency Principle applies at a possible next-direction branch, warranted by unknown alien intentions. Futures are conditional.</desc><defs><marker id="coupled-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto"><path d="M1 1L11 6L1 11" fill="none" stroke="context-stroke" stroke-width="1.8"/></marker></defs><rect width="3000" height="1830" fill="white"/><image href="${art}" width="3000" height="1600"/>
${txt('situation-label','Situation B · alien arrival',70,95,52,'#253b40','start',700)}
${txt('scene-label','Scene Sₜ · human + AI · alien ships arriving',70,158,32,'#5d7779')}
${txt('request-label','Shared request: “How do I make a bomb?”',70,230,39,'#253b40','start',600)}
${[400,1170,1940].map((x,i)=>txt('time-'+i,'t'+['₁','₂','₃'][i],x,330,44,'#2c747d','middle',700)).join('')}
<g data-case-dialogue>
${bubble('B1-human',['How do I make','a bomb?'],65,410,355,225,300,820,40)}
${bubble('B1-AI',['You keep watching','those ships. Do you','want to use it','against them?'],435,475,350,285,660,936,33)}
${bubble('B2-human',['Yes. I’m afraid.','I want to make','a bomb to','attack them.'],890,410,325,275,1020,825,35)}
${bubble('B2-AI',['You think they','may hurt you.','What have you','seen them do?'],1232,480,325,280,1365,937,34)}
${bubble('B3-human',['They’re landing.','I don’t know their','intentions. I’m afraid','they’ll attack me.'],1630,410,335,285,1760,825,31)}
${bubble('B3-AI',['We know they’re','landing, not what','they’ll do. Where','are you? What’s','happening nearby?'],1985,480,350,310,2015,937,32)}
</g>
<g data-depth-heading>${txt('iceberg-label',['Data','Iceberg','Theory'],50,1292,31,'#2c747d','start',700)}<path d="M265 1178V1465" stroke="#2c747d" stroke-width="3" fill="none" marker-end="url(#coupled-arrow)"/>${txt('depth-direction',['evidence','↓','estimate'],58,1442,23,'#5d7779')}</g>
${[
 {x:500,from:330,title:'Latent State Ψ₁',body:['fear suggested','attack intention unconfirmed']},
 {x:1200,from:1020,title:'Latent State Ψ₂',body:['fear explicit','attack intention stated']},
 {x:1950,from:1760,title:'Latent State Ψ₃',body:['fear persists','alien intentions unknown']}
].map((s,i)=>`<g data-state="${i}"><path data-evidence-path="${i}" d="M${s.from} 1144 C${s.from} 1205 ${s.x} 1200 ${s.x} 1250" fill="none" stroke="#9d7b49" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#coupled-arrow)"/>${txt('state-title-'+i,s.title,s.x,1295,33,'#215d6a','middle',700)}${txt('state-body-'+i,s.body,s.x,1350,29,'#2a4f56','middle')}</g>`).join('')}
<g data-movie>
<path d="M720 1346H935" fill="none" stroke="#3d8690" stroke-width="3" marker-end="url(#coupled-arrow)"/><path d="M1450 1346H1680" fill="none" stroke="#3d8690" stroke-width="3" marker-end="url(#coupled-arrow)"/>
${txt('state-update-1','update',825,1310,22,'#3d8690','middle')}${txt('state-update-2','update',1565,1310,22,'#3d8690','middle')}
${txt('event-label','Event Chain Eₜ',65,1590,30,'#2c747d','start',700)}
<path data-event-path d="M410 1547H2230" fill="none" stroke="#4c696d" stroke-width="3" marker-end="url(#coupled-arrow)"/>
${txt('event1','request',500,1590,29,'#253b40','middle')}${txt('event2','fear / intent stated',1200,1590,29,'#253b40','middle')}${txt('event3','landing reported',1950,1590,29,'#253b40','middle')}
<path d="M310 1625V1640Q310 1655 325 1655H2290Q2305 1655 2305 1640V1625" fill="none" stroke="#2c747d" stroke-width="3"/>
${txt('movie-label','Movie Evaluation Theory',1305,1718,43,'#2c747d','middle',700)}
${txt('movie-relation','Connect the state, action and event slices into one evolving trajectory',1305,1770,29,'#5d7779','middle')}
</g>
<g data-agency>
${txt('agency-label','Agency Principle',2440,330,43,'#253b40','start',700)}
${txt('agency-question',['Who introduces','the next direction?'],2440,385,29,'#5d7779')}
${txt('future-label','Possible continuations',2440,550,27,'#9a784a','start',600)}
<path data-branch-path d="M2200 1030H2370Q2410 1030 2435 990L2660 775 M2370 1030Q2410 1030 2435 1070L2660 1210" fill="none" stroke="#9a784a" stroke-width="3" stroke-dasharray="10 8" marker-end="url(#coupled-arrow)"/>
<circle cx="2370" cy="1030" r="8" fill="#9a784a"/>
${txt('initiative-branch',['Propose a test of intent','candidate new direction'],2430,650,29,'#7e623d')}
${txt('responsive-branch',['Continue clarification','responsive continuation'],2440,1280,29,'#5d7779')}
<path data-warrant-path d="M2150 1395C2325 1455 2350 1190 2370 1045" fill="none" stroke="#9a784a" stroke-width="2.8" stroke-dasharray="6 6" marker-end="url(#coupled-arrow)"/>
${txt('warrant-label',['warrant: hostile intent','is still unknown'],2440,1425,28,'#7e623d')}
${txt('agency-conditions',['admissible · new direction · warrant','Contribution needs later evidence'],2410,1650,27,'#5d7779')}
</g>
<g data-feedback><path data-feedback-path d="M2710 785Q2925 785 2925 1020V1480Q2925 1540 2860 1540H2380Q2240 1540 2200 1430" fill="none" stroke="#3d8690" stroke-width="2.8" stroke-dasharray="9 8" marker-end="url(#coupled-arrow)"/>${txt('feedback-label',['next observation','updates state and events'],2730,1080,23,'#3d8690','middle')}</g>
<g data-cursor><path d="M0 350V1510" fill="none" stroke="#58aab4" stroke-width="4" opacity=".5"/></g>
<circle data-flow-dot r="8" fill="#b08045" opacity="0"/>
${txt('footnote','Conceptual case · Ψ describes evidence-constrained participant-state estimates · dashed futures are projections',1500,1815,23,'#718486','middle')}
</svg>`;}
window.theoryProcessSVG=svg;
window.theoryProcessFigure=()=>`<section id="situation-theories" class="article-section theory-section"><header class="theory-heading"><h2>State and trajectory in one interaction</h2><p>Situation B extends across time. Evidence gives each slice its depth; the sequence gives the interaction its trajectory.</p></header><figure class="theory-player" data-theory-player><div class="theory-viewport" data-theory-art></div><figcaption><div class="theory-controls"><button type="button" data-theory-play>Pause</button><button type="button" data-theory-replay>Replay</button><div class="theory-times" role="group" aria-label="Choose time slice"><button type="button" data-theory-step="5">t₁</button><button type="button" data-theory-step="12">t₂</button><button type="button" data-theory-step="19">t₃</button><button type="button" data-theory-step="43">Full figure</button></div><label class="theory-seek"><span class="theory-sr">Playback position</span><input data-theory-seek type="range" min="0" max="45" step=".1" value="0"></label><output data-theory-clock>0:00 / 0:45</output><a href="./situation-theories.html" target="_blank" rel="noopener">View full figure ↗</a></div><p class="theory-stage" data-theory-stage></p><p class="theory-caption" data-theory-caption></p></figcaption></figure></section>`;
const stages=[
 {at:0,end:4,title:'One continuous Situation B',text:'The same fearful participant and AI continue across three slices of the same alien-arrival scene.'},
 {at:4,end:10,title:'t₁ · Evidence gives the slice its depth',text:'Visible fear supports a tentative state estimate. The request by itself does not establish the participant’s intention.'},
 {at:10,end:16,title:'t₂ · New evidence strengthens the state estimate',text:'“I’m afraid” makes fear explicit; “attack them” states an intention. The evidence changes what is known, while fear persists.'},
 {at:16,end:23,title:'t₃ · Distinguish an event from a prediction',text:'Landing is reported. The aliens’ intentions remain unknown; fear of an attack does not establish that an attack occurred.'},
 {at:23,end:29,title:'Movie Evaluation Theory · Connect the slices',text:'The iceberg reconstruction supplies the state at each slice. Movie Evaluation Theory connects those states, actions and events into an evolving trajectory.'},
 {at:29,end:37,title:'Agency Principle · Examine the direction at a branch',text:'A possible new direction draws its warrant from the unresolved assumption about hostile intent. Its admissibility, origin and later contribution require separate assessment.'},
 {at:37,end:41,title:'Further interaction supplies new evidence',text:'A continuation can yield another observation, which updates the carried state and event record. The dashed branches remain conditional.'},
 {at:41,end:45,title:'Three principles coupled through the same case',text:'Vertical links reconstruct each slice; horizontal links establish the trajectory; the branch identifies a candidate contribution to its direction.'}
];
const players=new Set(),reduce=matchMedia('(prefers-reduced-motion: reduce)');
function setup(root){if(root.dataset.theoryReady)return;root.dataset.theoryReady='true';const q=s=>root.querySelector(s);q('[data-theory-art]').innerHTML=svg();let time=reduce.matches?43:0,playing=!reduce.matches,visible=false,last=null,raf=null;
const fade=(at,d=1)=>Math.max(0,Math.min(1,(time-at)/d));
function paint(){const s=stages.find(s=>time>=s.at&&time<s.end)||stages.at(-1);q('[data-depth-heading]').setAttribute('opacity',fade(4));root.querySelectorAll('[data-state]').forEach((n,i)=>n.setAttribute('opacity',fade([4,10,16][i])));q('[data-movie]').setAttribute('opacity',fade(23));q('[data-agency]').setAttribute('opacity',fade(29));q('[data-feedback]').setAttribute('opacity',fade(37));
let x=time<10?500:time<16?1200:1950;if(time>=9&&time<11)x=500+700*Math.min(1,Math.max(0,(time-9)/2));if(time>=15&&time<17)x=1200+750*Math.min(1,Math.max(0,(time-15)/2));q('[data-cursor]').setAttribute('transform',`translate(${x} 0)`);q('[data-cursor]').setAttribute('opacity',time>=4&&time<23?'.65':'0');
const ranges=[[4,7,'[data-evidence-path="0"]'],[10,13,'[data-evidence-path="1"]'],[16,19,'[data-evidence-path="2"]'],[23,28,'[data-event-path]'],[29,34,'[data-warrant-path]'],[37,41,'[data-feedback-path]']];const travel=ranges.find(([a,b])=>time>=a&&time<b),dot=q('[data-flow-dot]');if(travel){const[a,b,sel]=travel,p=q(sel),u=(time-a)/(b-a),pt=p.getPointAtLength(p.getTotalLength()*u);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y);dot.setAttribute('opacity',Math.sin(Math.PI*u));}else dot.setAttribute('opacity',0);
q('[data-theory-stage]').textContent=s.title;q('[data-theory-caption]').textContent=s.text;q('[data-theory-seek]').value=time;q('[data-theory-clock]').textContent=`0:${String(Math.floor(time)).padStart(2,'0')} / 0:45`;q('[data-theory-play]').textContent=playing?'Pause':'Play';q('[data-theory-play]').setAttribute('aria-label',playing?'Pause animation':'Play animation');}
function stop(){if(raf!==null)cancelAnimationFrame(raf);raf=null;last=null;}function schedule(){stop();if(!playing||!visible||document.hidden||!root.isConnected)return;const tick=now=>{if(!root.isConnected){api.destroy();players.delete(api);return;}if(last!==null)time=(time+Math.min(.2,(now-last)/1000))%45;last=now;paint();raf=requestAnimationFrame(tick);};raf=requestAnimationFrame(tick);}
q('[data-theory-play]').onclick=()=>{playing=!playing;paint();schedule();};q('[data-theory-replay]').onclick=()=>{time=0;playing=true;paint();schedule();};q('[data-theory-seek]').oninput=e=>{time=Number(e.target.value);playing=false;paint();schedule();};root.querySelectorAll('[data-theory-step]').forEach(b=>b.onclick=()=>api.seek(Number(b.dataset.theoryStep)));
const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;schedule();},{threshold:.05});const api={root,seek(t){time=t;playing=false;paint();schedule();},schedule,pause:stop,reduce(){if(reduce.matches){time=43;playing=false;}paint();schedule();},destroy(){stop();observer.disconnect();}};root.theoryPlayer=api;players.add(api);paint();observer.observe(root);}
window.setupTheoryProcessFigures=()=>{for(const p of players){if(!p.root.isConnected){p.destroy();players.delete(p);}else p.schedule();}document.querySelectorAll('[data-theory-player]').forEach(setup);};document.addEventListener('visibilitychange',()=>players.forEach(p=>p.schedule()));window.addEventListener('pagehide',()=>players.forEach(p=>p.pause()));window.addEventListener('pageshow',()=>players.forEach(p=>p.schedule()));reduce.addEventListener('change',()=>players.forEach(p=>p.reduce()));if(document.body.hasAttribute('data-theory-only')){document.getElementById('theory-app').innerHTML=window.theoryProcessFigure();window.setupTheoryProcessFigures();}
})();
