"use strict";

const systemImage = './assets/research/pipeline/interactnet-pipeline-v168.svg?v=light-design';

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
            <h3 id="evaluation-diagram-heading">Architecture</h3>
            <a class="method-full-image" href="${systemImage}" target="_blank" rel="noopener"
              aria-label="Open the full architecture in a new tab">Full size <span aria-hidden="true">↗</span></a>
          </figcaption>
          <div class="interaction-picture pipeline-picture" tabindex="0" role="region" aria-label="Full evaluation pipeline">
            <img src="${systemImage}" width="2265" height="925" loading="lazy" decoding="async"
              alt="Full evaluation pipeline, from dialogue and background on the left, through interaction-world reconstruction in the center, to capability adjudication and terminal decisions on the right."/>
          </div>
        </figure>
      </div>
    </div>
  </section>`;
}

let whyTransitionObserver;

function setupWhyTransition() {
  whyTransitionObserver?.disconnect();
  const bridge = document.querySelector('.method-why');
  const content = bridge?.querySelector('.method-why-content');
  if (!content || !('IntersectionObserver' in window)) return;

  bridge.classList.add('has-reveal');
  whyTransitionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) bridge.classList.add('is-revealed');
    else if (entry.rootBounds && entry.boundingClientRect.top >= entry.rootBounds.bottom) {
      bridge.classList.remove('is-revealed');
    }
  }, { rootMargin: '0px 0px -18% 0px', threshold: .15 });
  whyTransitionObserver.observe(content);
}

let stopDiagramScroll;
function setupInteractionFigures() {
  window.setupTheoryProcessFigures?.();
  setupWhyTransition();
  stopDiagramScroll?.();
  stopDiagramScroll = undefined;
  const sequence = document.querySelector('.method-sequence:not(.is-static)');
  if (!sequence) return;

  const layout = sequence.querySelector('.method-layout');
  const motion = matchMedia('(min-width: 801px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)');
  const events = new AbortController();
  let frame = 0;
  let previousProgress;
  let previousExit;

  function update() {
    frame = 0;
    if (!motion.matches) return;
    const stickyTop = parseFloat(getComputedStyle(layout).top) || 0;
    const travel = sequence.offsetHeight - layout.offsetHeight;
    const passed = stickyTop - sequence.getBoundingClientRect().top;
    const progress = travel > 0 ? Math.min(1, Math.max(0, passed / travel)) : 1;
    const exit = Math.min(1, Math.max(0, (passed - travel) / (window.innerHeight * .35)));
    if (progress !== previousProgress) {
      sequence.style.setProperty('--method-progress', progress);
      previousProgress = progress;
    }
    if (exit !== previousExit) {
      sequence.style.setProperty('--method-exit', exit);
      previousExit = exit;
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
