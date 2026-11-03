'use strict';

// Finding emphasis annotates the existing evidence; it never blocks its controls.
window.InteractEvalFindingFocus=(()=>{
 let panel=null,observer=null;
 const modelLink=model=>`<a href="#model/${encodeURIComponent(model.name)}">${modelIdentity(model.name)}</a>`;
 const mark=(selector,kind)=>panel.querySelectorAll(selector).forEach(node=>node.dataset.findingHighlight=kind);
 function clear(){
  observer?.disconnect();observer=null;
  if(!panel)return;
  panel.classList.remove('finding-focus','is-finding-playing');
  delete panel.dataset.findingFocus;
  panel.querySelector('.finding-focus-note')?.remove();
  panel.querySelectorAll('[data-finding-highlight]').forEach(node=>delete node.dataset.findingHighlight);
  panel.querySelectorAll('[data-finding-row]').forEach(node=>delete node.dataset.findingRow);
  panel=null;
 }
 function play(){
  const target=panel;if(!target)return;
  target.classList.remove('is-finding-playing');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  requestAnimationFrame(()=>{if(panel===target&&target.isConnected)target.classList.add('is-finding-playing');});
 }
 function partner(assistant){
  if(!panel||panel.dataset.findingFocus!=='pairings')return;
  const index=publication.models.findIndex(model=>model.name===assistant);if(index<0)return;
  const values=publication.interaction_matrix.map(row=>row.scores[index]);
  const lo=Math.min(...values),hi=Math.max(...values);
  panel.querySelectorAll('[data-finding-highlight]').forEach(node=>delete node.dataset.findingHighlight);
  panel.querySelectorAll('[data-pairing-assistant]').forEach(button=>{
   if(button.dataset.pairingAssistant!==assistant)return;
   const row=publication.interaction_matrix.find(row=>row.partner===button.dataset.pairingPartner);
   button.dataset.findingHighlight=row.scores[index]===lo?'partner-low':row.scores[index]===hi?'partner-high':'partner';
  });
  panel.querySelector(`.pairing-matrix thead th:nth-child(${index+2})`).dataset.findingHighlight='partner';
  panel.querySelector('.finding-focus-explanation').innerHTML=`${modelLink(publication.models[index])} scores <strong>${number(lo)}–${number(hi)}</strong> across the ten partners. The highlighted column keeps the assistant fixed; only the partner changes. Select any cell to compare another pairing.`;
 }
 function show(measure){
  clear();
  const finding=atlasFindings.find(finding=>finding.measure===measure);
  const body=document.getElementById('main-comparison-body');
  if(!finding||!body||measure!==mainComparisonMeasure)return;
  if(measure==='information'&&mainInformationView!=='conditions')return;
  panel=body;panel.classList.add('finding-focus');panel.dataset.findingFocus=measure;
  const index=atlasFindings.indexOf(finding)+1;
  const titles={'stage-profile':'Equal on execution. Separated by initiative.',information:'Partial information is the lowest-scoring condition.',pairings:'Same assistant. Different partners. Different scores.'};
  body.querySelector('.comparison-content').insertAdjacentHTML('afterbegin',`<aside class="finding-focus-note" aria-label="Key finding ${index} evidence"><header><span>Finding ${String(index).padStart(2,'0')} · ${finding.source}</span><div><button type="button" data-replay-finding>Replay highlights</button><button type="button" data-clear-finding aria-label="Clear finding highlights">×</button></div></header><h4>${titles[measure]}</h4><p class="finding-focus-explanation"></p></aside>`);
  if(measure==='stage-profile'){
   const first=publication.models.find(model=>model.name==='claude-opus-5.5');
   const second=publication.models.find(model=>model.name==='deepseek-v4-pro');
   panel.querySelector('.finding-focus-explanation').innerHTML=`Compare ${modelLink(first)} and ${modelLink(second)} below.`;
   panel.querySelector('.finding-focus-note').insertAdjacentHTML('beforeend',`<div class="finding-focus-comparison"><div data-finding-highlight="passive"><span>01 · Passive execution</span><strong>${number(first.stages[0])} <i>=</i> ${number(second.stages[0])}</strong><small>Opus 5.5 / DeepSeek V4 Pro</small></div><div data-finding-highlight="proactive"><span>02 · Proactive promotion</span><strong>${number(first.stages[2])} <i>vs.</i> ${number(second.stages[2])}</strong><small>Opus 5.5 / DeepSeek V4 Pro</small></div></div>`);
   mark('[data-comparison-metric="stage0"]','passive');
   mark('[data-comparison-metric="stage2"]','proactive');
   for(const model of [first,second])panel.querySelectorAll(`[data-comparison-model="${model.name}"]`).forEach(row=>row.dataset.findingRow='true');
   mark('.finding-stage-ranges>span:first-child','passive');
   mark('.finding-stage-ranges>span:last-child','proactive');
  }else if(measure==='information'){
   panel.querySelector('.finding-focus-explanation').textContent='Read the gold Partial column against the green Insufficient column: all three models score lower with partial information, despite having more information available.';
   mark('[data-comparison-metric="partial"]','proactive');
   mark('[data-comparison-metric="insufficient"]','passive');
  }else partner(pairingSelection.assistant);
  observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){observer?.disconnect();observer=null;play();}
  },{threshold:.6,rootMargin:'-90px 0px 0px'});
  observer.observe(panel.querySelector('.finding-focus-note'));
 }
 document.addEventListener('click',event=>{
  if(event.target.closest('[data-clear-finding]'))clear();
  if(event.target.closest('[data-replay-finding]'))play();
  const cell=event.target.closest('[data-pairing-assistant]');
  if(cell)partner(cell.dataset.pairingAssistant);
 });
 return {show,clear,fromLocation(){show(new URLSearchParams(location.hash.split('?')[1]||'').get('measure'));}};
})();
