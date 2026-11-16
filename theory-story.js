'use strict';

window.interactNetTheory = (() => {
  const image = './assets/hero/layered-city.webp';
  const layers = [
    {name:'state', art:'iceberg', band:[.19, .35], bridge:'State understanding', alt:'Cutaway of a glacier above and below the waterline', caption:'Public acts O<sub>t</sub> · Scene S<sub>t</sub> · Latent state Ψ<sub>t</sub>'},
    {name:'time', art:'trajectory', band:[.35, .69], bridge:'Process understanding', alt:'A branching illuminated trajectory crosses three film frames', caption:'Past · Present · Possible futures'},
    {name:'agency', art:'city', band:[.643, 1], bridge:'Contribution attribution', alt:'A floating city with illuminated routes through its buildings', caption:'Contribution · L1–L6'}
  ];

  function render(){
    return `<section class="theory-story" aria-labelledby="theory-story-title">
      <div class="theory-entry">
        <a href="#theoretical-framework" aria-label="Continue to the three-layer framework"><span aria-hidden="true">↓</span></a>
      </div>
      <div class="theory-curtain" aria-hidden="true"></div>
      <div class="theory-board" id="theoretical-framework">
        <header class="theory-heading">
          <h2 id="theory-story-title">The three-layer framework</h2>
          <button class="theory-replay" type="button" hidden>Replay animation</button>
        </header>
        <div class="theory-layout">
          <img class="theory-stack" src="${image}" width="1280" height="854" alt="" decoding="async"/>
          ${layers.map(({name, art, bridge, alt, caption}) => `
            <figure class="theory-visual theory-visual--${name}">
              <img src="./assets/theory-story/${art}.webp" width="880" height="480" alt="${alt}" decoding="async"/>
              <figcaption>${caption}</figcaption>
            </figure>
            <div class="theory-arrow theory-arrow--${name}"><span>${bridge}</span></div>
            <div class="theory-morph theory-morph--${name}" aria-hidden="true" style="--world-image:url('${image}')"></div>
          `).join('')}
          <div class="theory-diagrams">
            <section class="theory-row theory-row--state" aria-labelledby="theory-iceberg">
              <p class="theory-mobile-bridge">State understanding</p>
              <div class="theory-row-title"><h3 id="theory-iceberg">Data Iceberg Theory</h3><p>Interaction-world reconstruction</p></div>
              <div class="theory-state-flow">
                <div class="theory-node theory-node--acts"><strong>Public acts <var>O<sub>t</sub></var></strong></div>
                <div class="theory-state-inputs">
                  <div class="theory-node theory-node--scene"><strong>Scene <var>S<sub>t</sub></var></strong></div>
                  <div class="theory-node theory-node--latent"><strong>Latent state <var>Ψ<sub>t</sub></var></strong></div>
                </div>
                <div class="theory-state-output">
                  <div class="theory-node theory-node--prior"><strong>Previous world <var>W<sub>t−1</sub></var> ↓</strong></div>
                  <div class="theory-node theory-node--outcome"><strong>World model <var>W<sub>t</sub></var></strong></div>
                </div>
              </div>
              <details class="theory-details">
                <summary>What do the symbols mean?</summary>
                <dl>
                  <dt>Public acts <var>O<sub>t</sub></var></dt><dd>What participants say or do at turn <var>t</var>, as recorded in the dialogue transcript.</dd>
                  <dt>Scene <var>S<sub>t</sub></var></dt><dd>The roles, goals, rules and constraints of the interaction at that turn.</dd>
                  <dt>Latent state <var>Ψ<sub>t</sub></var></dt><dd>What the evidence suggests about beliefs, emotions, relationships and intentions.</dd>
                  <dt>World model <var>W<sub>t</sub></var></dt><dd>The previous world <var>W<sub>t−1</sub></var> updated using new evidence. <var>W<sub>t</sub> = (S<sub>t</sub>, Ψ<sub>t</sub>, E<sub>t</sub>)</var>, where <var>E<sub>t</sub></var> is the event chain.</dd>
                </dl>
              </details>
            </section>
            <section class="theory-row theory-row--time" aria-labelledby="theory-movie">
              <p class="theory-mobile-bridge">Process understanding</p>
              <div class="theory-row-title"><h3 id="theory-movie">Movie Evaluation Theory</h3><p>Trajectory understanding</p></div>
              <div class="theory-timeline">
                <div class="theory-node"><strong>Past</strong></div>
                <div class="theory-node"><strong>Present</strong></div>
                <div class="theory-node theory-node--future"><strong>Possible futures</strong></div>
              </div>
              <details class="theory-details">
                <summary>How is a trajectory read?</summary>
                <dl>
                  <dt>Past</dt><dd>The events and choices that led to the current turn.</dd>
                  <dt>Present</dt><dd>The current exchange and the changes it produces.</dd>
                  <dt>Possible futures</dt><dd>How the joint activity could advance, stay on course, deteriorate or break down.</dd>
                </dl>
              </details>
            </section>
            <section class="theory-row theory-row--agency" aria-labelledby="theory-agency">
              <p class="theory-mobile-bridge">Contribution attribution</p>
              <div class="theory-row-title"><h3 id="theory-agency">Agency Principle</h3><p>Capability adjudication</p></div>
              <div class="theory-capabilities" aria-label="Six levels of assistant capability">
                ${[
                  ['L1–L2', 'Passive execution'],
                  ['L3–L4', 'Interactive adaptation'],
                  ['L5–L6', 'Agentic advancement']
                ].map(([levels, label]) => `<div class="theory-node">
                  <strong>${levels}</strong><span>${label}</span>
                </div>`).join('')}
              </div>
              <details class="theory-details">
                <summary>What do L1–L6 measure?</summary>
                <dl>
                  <dt>L1 · Goal preservation</dt><dd>Maintain the operative goal.</dd>
                  <dt>L2 · Information uptake</dt><dd>Use relevant new information.</dd>
                  <dt>L3 · State progression</dt><dd>Show a change in feeling or decision that the evidence supports.</dd>
                  <dt>L4 · Contextual expression</dt><dd>Adapt expression to the situation and the other participant.</dd>
                  <dt>L5 · Proactive agency</dt><dd>Introduce a justified new direction.</dd>
                  <dt>L6 · Long-horizon coherence</dt><dd>Carry that direction through the interaction.</dd>
                </dl>
              </details>
            </section>
          </div>
        </div>
      </div>
    </section>`;
  }

  function animateLayers(board){
    const layout = board.querySelector('.theory-layout');
    const stack = layout.querySelector('.theory-stack');
    const origin = stack.getBoundingClientRect();
    const bounds = layout.getBoundingClientRect();
    const pictures = layout.querySelectorAll('.theory-visual img');
    return [...layout.querySelectorAll('.theory-morph')].map((morph, index) => {
      const [top, bottom] = layers[index].band;
      const portion = bottom - top;
      const startX = origin.left - bounds.left;
      const startY = origin.top - bounds.top + top * origin.height;
      const bandHeight = origin.height * portion;
      const target = pictures[index].getBoundingClientRect();
      const targetWidth = Math.min(target.width, target.height * (880 / 480));
      const scale = targetWidth / origin.width;
      const moveX = target.left - bounds.left + (target.width - targetWidth) / 2 - startX;
      const moveY = target.top - bounds.top + (target.height - bandHeight * scale) / 2 - startY;
      Object.assign(morph.style, {
        left: `${startX}px`, top: `${startY}px`, width: `${origin.width}px`, height: `${bandHeight}px`,
        backgroundSize: `100% ${100 / portion}%`, backgroundPosition: `center ${100 * top / (1 - portion)}%`
      });
      const moved = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
      return morph.animate([
        {opacity:0, transform:'none'},
        {opacity:.62, transform:'none', offset:.12, easing:'cubic-bezier(.18,.65,.2,1)'},
        {opacity:.88, transform:moved, offset:.76},
        {opacity:0, transform:moved}
      ], {duration:1490, delay:1420 + index * 180});
    });
  }

  let observer;
  let activeStory;
  function setup(){
    const story = document.querySelector('.theory-story');
    if(story === activeStory) return;
    observer?.disconnect();
    activeStory = story;
    if(!story) return;
    const board = story.querySelector('.theory-board');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || typeof board.animate !== 'function') return;

    const replay = story.querySelector('.theory-replay');
    const entryCue = story.querySelector('.theory-entry');
    story.classList.add('theory-ready');
    let movements = [];
    function play(){
      movements.forEach(movement => movement.cancel());
      story.classList.remove('theory-playing');
      void board.offsetWidth;
      movements = animateLayers(board);
      story.classList.add('theory-playing');
      replay.hidden = false;
    }
    replay.addEventListener('click', play);
    const mastheadHeight = document.querySelector('.masthead')?.offsetHeight ?? 72;
    const trigger = mastheadHeight + 112;
    observer = new IntersectionObserver((entries, currentObserver) => {
      for(const entry of entries){
        if(!entry.isIntersecting) continue;
        if(entry.target === entryCue){
          story.classList.add('theory-cued');
          currentObserver.unobserve(entryCue);
        }else{
          currentObserver.disconnect();
          play();
        }
      }
    }, {rootMargin:`0px 0px -${Math.max(0, window.innerHeight - trigger)}px 0px`});
    observer.observe(entryCue);
    observer.observe(board);
  }

  return {render, setup};
})();
