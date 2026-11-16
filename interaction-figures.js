"use strict";

const systemImage = './assets/research/pipeline/interactnet-pipeline-v168.svg';
function interactionFigure(kind) {
  if (kind === 'motivation') return window.whyInteractionFigure();
  const directToDiagram = location.hash === '#evaluation-diagram';
  return `<section id="system-overview" class="interaction-method" aria-labelledby="system-overview-heading">
    <div class="method-sequence${directToDiagram ? ' is-static' : ''}">
      <div class="method-layout">
        <header class="method-intro">
          <h2 id="system-overview-heading">How InteractNet works</h2>
        </header>
        <figure id="evaluation-diagram" class="method-diagram" aria-labelledby="evaluation-diagram-heading">
          <figcaption><h3 id="evaluation-diagram-heading">Evaluation Diagram</h3></figcaption>
          <div class="interaction-picture pipeline-picture" tabindex="0" role="region" aria-label="Evaluation pipeline; scroll horizontally on smaller screens">
            <img src="${systemImage}" width="2265" height="925" loading="lazy" decoding="async"
              alt="Evaluation pipeline: the dialogue and background inform interaction-world reconstruction, including the scene, latent-state inference, previous world, and event chain. The reconstructed world informs capability adjudication from L1 to L6. Task and interest terminal decisions feed dialogue control."/>
          </div>
        </figure>
      </div>
    </div>
  </section>`;
}

function setupInteractionFigures() {
  window.setupTheoryProcessFigures?.();
}

if (document.body.dataset.interactionOnly === 'system') {
  document.getElementById('interaction-app').innerHTML = interactionFigure('system');
}
