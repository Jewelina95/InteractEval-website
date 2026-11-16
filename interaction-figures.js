"use strict";

const systemImage = './assets/research/pipeline/interactnet-pipeline-v168.svg?v=light-design';
const architectureImage = './assets/research/pipeline/interactnet-world-architecture-v168.svg';

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
          <figcaption>
            <h3 id="evaluation-diagram-heading">Evaluation Diagram</h3>
            <a class="method-full-image" href="${systemImage}" target="_blank" rel="noopener"
              aria-label="Open the full evaluation diagram in a new tab">Full diagram <span aria-hidden="true">↗</span></a>
          </figcaption>
          <div class="interaction-picture pipeline-picture" tabindex="0" role="region" aria-label="Evaluation pipeline; scroll horizontally on smaller screens">
            <img src="${architectureImage}" width="1350" height="825" loading="lazy" decoding="async"
              alt="Interaction-world architecture showing scene context, participant-state inference, the event chain, and the previous world carried across turns."/>
          </div>
        </figure>
      </div>
    </div>
  </section>`;
}

let stopDiagramScroll;
function setupInteractionFigures() {
  window.setupTheoryProcessFigures?.();
  stopDiagramScroll?.();
  stopDiagramScroll = undefined;
  const sequence = document.querySelector('.method-sequence:not(.is-static)');
  if (!sequence) return;

  const layout = sequence.querySelector('.method-layout');
  const motion = matchMedia('(min-width: 801px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)');
  const events = new AbortController();
  let frame = 0;
  let previousProgress;

  function update() {
    frame = 0;
    if (!motion.matches) return;
    const stickyTop = parseFloat(getComputedStyle(layout).top) || 0;
    const travel = sequence.offsetHeight - layout.offsetHeight;
    const progress = travel > 0
      ? Math.min(1, Math.max(0, (stickyTop - sequence.getBoundingClientRect().top) / travel))
      : 1;
    if (progress !== previousProgress) {
      sequence.style.setProperty('--method-progress', progress);
      previousProgress = progress;
    }
  }

  function schedule() {
    if (motion.matches && !frame) frame = requestAnimationFrame(update);
  }

  function syncMotion() {
    sequence.classList.toggle('is-scroll-animated', motion.matches);
    schedule();
  }

  const {signal} = events;
  window.addEventListener('scroll', schedule, {passive: true, signal});
  window.addEventListener('resize', schedule, {signal});
  motion.addEventListener('change', syncMotion, {signal});
  syncMotion();
  stopDiagramScroll = () => {
    events.abort();
    cancelAnimationFrame(frame);
  };
}

if (document.body.dataset.interactionOnly === 'system') {
  document.getElementById('interaction-app').innerHTML = interactionFigure('system');
}
