"use strict";

const systemImage = './assets/research/pipeline/interactnet-pipeline-v173.svg';
const systemPdf = './assets/research/pipeline/interactnet-pipeline-v173.pdf';

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
            <a class="method-full-image" href="${systemPdf}" target="_blank" rel="noopener"
              aria-label="Open the full architecture PDF in a new tab">Full size <span aria-hidden="true">↗</span></a>
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

const futureDirections = [
  ['creativity', 'Creativity', 'Two gold trajectories intersect and form a new faceted structure.',
    "Probe the frontiers of intelligence by exploring AI's potential to expand the boundaries of human knowledge, generate novel discoveries, and advance questions that remain unresolved at the frontiers of science and human understanding."],
  ['group-effects', 'AI Community', 'Groups of virtual people meet across bridges and paths in a shared miniature city.',
    'Investigate how autonomous agents self-organize into communities, develop social structures and behavioral norms, and give rise to collective intelligence through cooperation, competition, and sustained interaction.'],
  ['multimodal', 'Multimodal', 'Three transparent structures contain distinct illuminated patterns.',
    'Explore the transition from multimodal perception to physical intelligence, investigating how AI integrates diverse sensory information to develop coherent and persistent representations of the physical world, understand its underlying properties and dynamics, and reason about physical states, causal relationships, and interactions.', 'model-characteristics'],
  ['framework-optimization', 'Evolution', 'Three evaluation signals illuminate a virtual model that exchanges information with two partners.',
    'Leverage the InteractNet framework to drive systematic model evolution, transforming multidimensional capability assessment into actionable insights for identifying developmental bottlenecks, guiding targeted optimization, and progressively advancing the frontiers of interactive intelligence.']
];

function creativityResults() {
  const rates = [
    ['Claude Opus 5.5', 'claude.svg', '12.3%', '8.7%'],
    ['GPT-6 Astra', 'openai.svg', '11.6%', '—'],
    ['Claude Fable 5.1', 'claude.svg', '9.1%', '6.2%'],
    ['Claude Opus 5', 'claude.svg', '8.7%', '5.6%']
  ];
  return `<table class="future-results">
    <caption>Frontier Emergence rate by configuration</caption>
    <thead><tr><th scope="col">Model</th>
      <th scope="col"><span class="future-model"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3"><path d="m10 2 7 4v8l-7 4-7-4V6Z M3 6l7 4 7-4 M10 10v8"/></svg>Cognizer</span><sup><a href="https://worldeology.com/blog/cognizer/" target="_blank" rel="noopener" aria-label="Reference 2, Cognizer">[2]</a></sup></th>
      <th scope="col"><span class="future-model future-model--code"><img src="./assets/providers/claude.svg" alt="" width="17" height="17"/><span>Claude Code</span></span></th>
      <th scope="col">Model alone</th></tr></thead>
    <tbody>${rates.map(([name, icon, cognizer, code]) => `<tr><th scope="row"><span class="future-model"><img src="./assets/providers/${icon}" alt="" width="17" height="17"/>${name}</span></th><td>${cognizer}</td><td>${code}</td><td>0.0%</td></tr>`).join('')}</tbody>
  </table>`;
}

function futureDirectionGallery() {
  const requested = new URLSearchParams(location.hash.split('?')[1]).get('direction');
  const direction = requested === 'model-characteristics' ? 'multimodal' : requested;
  const current = Math.max(0, futureDirections.findIndex(([id]) => id === direction));
  return `<section id="future-directions" class="future-directions" aria-labelledby="future-directions-heading">
    <header class="method-why-content future-directions-intro">
      <h2 id="future-directions-heading">What comes next</h2>
    </header>
    <div class="future-gallery">
      <div class="future-tabs" role="tablist" aria-label="Research directions">
        ${futureDirections.map(([id, title], index) => `<button type="button" role="tab" id="future-tab-${id}"
          aria-controls="future-${id}" aria-selected="${index === current}" tabindex="${index === current ? 0 : -1}">${title}</button>`).join('')}
      </div>
      <div class="future-panels">
        ${futureDirections.map(([id, , alt, description, art = id], index) => `<div id="future-${id}" class="future-panel"
          role="tabpanel" aria-labelledby="future-tab-${id}"${index === current ? ' tabindex="0"' : ' aria-hidden="true" hidden inert'}>
          <figure class="future-artwork">
            <img src="./assets/future-directions/${art}.webp" width="768" height="512" alt="${alt}" decoding="async"/>
          </figure>
          <div class="future-detail">
            <p>${safe(description)}</p>
            ${id === 'creativity' ? creativityResults() : '<span class="future-pending">Pending</span>'}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

let futureGalleryEvents;
function setupFutureDirectionGallery() {
  futureGalleryEvents?.abort();
  const gallery = document.querySelector('.future-gallery');
  if (!gallery) return;
  futureGalleryEvents = new AbortController();
  const {signal} = futureGalleryEvents;
  const tabs = [...gallery.querySelectorAll('[role=tab]')];
  const panels = [...gallery.querySelectorAll('[role=tabpanel]')];
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  let current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  let animations = [];

  function showDirection(next, animate) {
    if (next === current) return;
    const previous = current;
    const shift = next > previous ? 1 : -1;
    current = next;
    animations.forEach(animation => animation.cancel());
    animations = [];
    tabs.forEach((tab, index) => {
      const selected = next === index;
      panels[index].classList.remove('is-exiting');
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
      panels[index].inert = !selected;
      if (selected) panels[index].removeAttribute('aria-hidden');
      else panels[index].setAttribute('aria-hidden', 'true');
      panels[index].tabIndex = selected ? 0 : -1;
    });
    if (animate && motion.matches && typeof panels[next].animate === 'function') {
      const exiting = panels[previous];
      exiting.hidden = false;
      exiting.classList.add('is-exiting');
      const options = {duration: 360, easing: 'cubic-bezier(0.23, 1, 0.32, 1)'};
      animations = [
        exiting.animate([
          {opacity: 1, transform: 'translateX(0)'},
          {opacity: 0, transform: `translateX(${-shift * 6}%)`}
        ], options),
        panels[next].animate([
          {opacity: 0, transform: `translateX(${shift * 8}%)`},
          {opacity: 1, transform: 'translateX(0)'}
        ], options)
      ];
      animations[0].onfinish = () => {
        exiting.classList.remove('is-exiting');
        if (current !== previous) exiting.hidden = true;
      };
    }
    history.replaceState(history.state, '', '#future-directions?direction=' + futureDirections[next][0]);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => showDirection(index, event.detail > 0), {signal});
    tab.addEventListener('keydown', event => {
      const destinations = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!Object.hasOwn(destinations, event.key)) return;
      event.preventDefault();
      const next = destinations[event.key];
      showDirection(next, false);
      tabs[next].focus();
    }, {signal});
  });
  signal.addEventListener('abort', () => animations.forEach(animation => animation.cancel()), {once: true});
}

let sectionEntranceObserver;

function setupSectionEntrances() {
  sectionEntranceObserver?.disconnect();
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('.method-why-content, .resources-intro');
  sectionEntranceObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('is-revealed');
      else if (entry.rootBounds && entry.boundingClientRect.top >= entry.rootBounds.bottom) {
        entry.target.classList.remove('is-revealed');
      }
    }
  }, { rootMargin: '0px 0px -22% 0px', threshold: .15 });

  for (const section of sections) {
    section.classList.add('has-reveal');
    sectionEntranceObserver.observe(section);
  }
}

let stopDiagramScroll;
function setupInteractionFigures() {
  window.setupTheoryProcessFigures?.();
  setupSectionEntrances();
  setupFutureDirectionGallery();
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
