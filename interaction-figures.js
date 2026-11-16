"use strict";

const systemImage = './assets/research/pipeline/interactnet-pipeline-v168.svg';
const methodSteps = [
  {
    title: 'Reconstruct the interaction',
    description: 'Dialogue and background establish the scene. After each turn, InteractNet infers the participants’ latent states and updates the chain of events.',
    graphic: '<span>Scene</span><span>Latent state</span><span>Event chain</span>',
    graphicClass: 'method-world',
  },
  {
    title: 'Assess the response',
    description: 'The reconstructed interaction provides the context for judging six capability levels, from preserving the goal to taking initiative and following through.',
    graphic: '<span>L1</span><span>L2</span><span>L3</span><span>L4</span><span>L5</span><span>L6</span>',
    graphicClass: 'method-levels',
  },
  {
    title: 'Continue or stop',
    description: 'InteractNet checks task progress and user interest. If the conversation continues, the next turn updates the interaction and starts the cycle again.',
    graphic: '<span>Continue <b>↻</b></span><span>Stop <b>■</b></span>',
    graphicClass: 'method-decision',
  },
];

function interactionFigure(kind) {
  if (kind === 'motivation') return window.whyInteractionFigure();
  return `<section id="system-overview" class="interaction-method" aria-labelledby="system-overview-heading">
    <div class="method-layout">
      <header class="method-intro">
        <h2 id="system-overview-heading">How InteractNet works</h2>
        <p>Each turn updates the interaction, informs the evaluation, and helps decide what happens next.</p>
      </header>
      <ol class="method-steps" role="list">
        ${methodSteps.map(step => `
          <li class="method-step">
            <h3>${step.title}</h3>
            <p>${step.description}</p>
            <div class="method-graphic ${step.graphicClass}" aria-hidden="true">${step.graphic}</div>
          </li>`).join('')}
      </ol>
      <details class="method-diagram">
        <summary>View the full evaluation diagram</summary>
        <figure class="interaction-figure">
          <div class="interaction-picture pipeline-picture" tabindex="0" role="region" aria-label="Evaluation pipeline; scroll horizontally on smaller screens">
            <img src="${systemImage}" width="2265" height="925" loading="lazy" decoding="async"
              alt="Evaluation pipeline: the dialogue and background inform interaction-world reconstruction, including the scene, latent-state inference, previous world, and event chain. The reconstructed world informs capability adjudication from L1 to L6. Task and interest terminal decisions feed dialogue control."/>
          </div>
        </figure>
      </details>
    </div>
  </section>`;
}

let methodObserver;
function setupInteractionFigures() {
  window.setupTheoryProcessFigures?.();
  methodObserver?.disconnect();
  if (typeof IntersectionObserver !== 'function') return;

  const steps = document.querySelectorAll('.method-step');
  if (!steps.length) return;
  methodObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, {rootMargin: '0px 0px -18% 0px', threshold: .2});
  steps.forEach(step => methodObserver.observe(step));
}

if (document.body.dataset.interactionOnly === 'system') {
  document.getElementById('interaction-app').innerHTML = interactionFigure('system');
  setupInteractionFigures();
}
