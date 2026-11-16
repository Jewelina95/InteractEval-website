'use strict';

window.interactNetTheory = (() => {
  const image = './assets/hero/layered-city.webp';
  const waveEdge = [[100, .675], [53, .675], [36, .66], [31.8, .65], [28.5, .649], [26, .657], [0, .675]];
  const stackTop = .21;
  const waveTop = .503;
  const waveBottom = .68;
  function clipBand(top, origin, height){
    const localY = y => `${100 * (y - origin) / height}%`;
    return `polygon(0 ${localY(top)}, 100% ${localY(top)}, ${waveEdge.map(([x, y]) => `${x}% ${localY(y)}`).join(', ')})`;
  }
  const stackClip = clipBand(stackTop, 0, 1);
  const waveClip = clipBand(waveTop, waveTop, waveBottom - waveTop);
  const layers = [
    {name:'state', art:'iceberg', band:[stackTop, .349], width:.43, title:'Data Iceberg Theory', bridge:'State interpretation', alt:'Cutaway of a glacier above and below the waterline'},
    {name:'time', art:'trajectory', band:[.349, waveTop], width:.49, title:'Movie Evaluation Theory', bridge:'Casual modeling', alt:'A branching illuminated trajectory crosses three film frames'},
    {name:'agency', art:'agency-waves', band:[waveTop, waveBottom], width:.59, clip:waveClip, title:'Agency Principle', bridge:'Contribution attribution', alt:'Two wave surfaces with illuminated paths diverging across them'}
  ];

  const capabilities = [
    ['Goal preservation', 'Maintain the operative goal.'],
    ['Information uptake', 'Use relevant new information.'],
    ['State progression', 'Show a change in feeling or decision that the evidence supports.'],
    ['Contextual expression', 'Adapt expression to the situation and the other participant.'],
    ['Proactive agency', 'Introduce a justified new direction.'],
    ['Long-horizon coherence', 'Carry that direction through the interaction.']
  ];

  function render(){
    return `<section class="theory-story" aria-labelledby="theory-story-title">
      <div class="theory-entry">
        <a href="#theoretical-framework" aria-label="Continue to the three theories of interaction"><span aria-hidden="true">↓</span></a>
      </div>
      <div class="theory-curtain" aria-hidden="true"></div>
      <div class="theory-board" id="theoretical-framework">
        <header class="theory-heading">
          <h2 id="theory-story-title">Three theories of interaction</h2>
          <button class="theory-replay" type="button" hidden aria-label="Replay animation" title="Replay animation"><span class="replay-glyph" aria-hidden="true"></span></button>
        </header>
        <div class="theory-layout">
          <img class="theory-stack" src="${image}" width="1280" height="854" alt="" decoding="async" style="clip-path:${stackClip}"/>
          ${layers.map(({name, art, title, bridge, alt, clip}) => `
            <figure class="theory-visual theory-visual--${name}">
              <div class="theory-art">
                <img src="./assets/theory-story/${art}.webp" width="880" height="480" alt="${alt}" decoding="async"/>
                <span class="theory-sparks" aria-hidden="true">${'<i></i>'.repeat(4)}</span>
              </div>
              <figcaption>${title}</figcaption>
            </figure>
            <div class="theory-arrow theory-arrow--${name}"><span>${bridge}</span><i aria-hidden="true"></i></div>
            <div class="theory-morph theory-morph--${name}" aria-hidden="true" style="--world-image:url('${image}')${clip ? `;clip-path:${clip}` : ''}"></div>
          `).join('')}
          <div class="theory-diagrams">
            <section class="theory-row theory-row--state" aria-labelledby="theory-iceberg">
              <p class="theory-mobile-bridge">State interpretation</p>
              <div class="theory-row-title"><h3 id="theory-iceberg">Interaction-world reconstruction</h3></div>
              <div class="theory-state-flow">
                <ol class="theory-state-inputs" aria-label="Reconstruction update order">
                  <li class="theory-node theory-node--latent">
                    <strong>Latent state <var>Ψ<sub>t</sub></var></strong>
                  </li>
                  <li class="theory-node theory-node--event">
                    <strong>Casual Chain <var>E<sub>t</sub></var></strong>
                  </li>
                  <li class="theory-node theory-node--scene">
                    <strong>Scene <var>S<sub>t</sub></var></strong>
                  </li>
                </ol>
                <i class="theory-reconstruction-link" aria-hidden="true"></i>
                <div class="theory-node theory-node--outcome">
                  <strong>World reconstruction <var>W<sub>t</sub></var></strong>
                  <span><var>W<sub>t</sub> = (S<sub>t</sub>, Ψ<sub>t</sub>, E<sub>t</sub>)</var></span>
                </div>
              </div>
              <details class="theory-details">
                <summary>What do the symbols mean?</summary>
                <dl class="theory-symbols">
                  <dt><var>W<sub>t</sub></var></dt><dd>An operational reconstruction of the interaction world inferred from observable behavior and available context. It combines the effective scene, the estimated latent state, and the casual chain.</dd>
                  <dt><var>t</var></dt><dd>The current exchange.</dd>
                  <dt><var>Ψ<sub>t</sub></var></dt><dd>The evaluator’s estimate of the participants’ states, based on the available evidence.</dd>
                  <dt><var>S<sub>t</sub></var></dt><dd>The effective scene, including roles, objectives, rules, and constraints.</dd>
                  <dt><var>E<sub>t</sub></var></dt><dd>The casual chain groups prior events <var>P<sub>t</sub></var>, the current event <var>C<sub>t</sub></var>, and possible future paths <var>F<sub>t</sub></var>.</dd>
                </dl>
              </details>
            </section>
            <section class="theory-row theory-row--time" aria-labelledby="theory-movie">
              <p class="theory-mobile-bridge">Casual modeling</p>
              <div class="theory-row-title"><h3 id="theory-movie">Trajectory understanding</h3></div>
              <p class="theory-timeline-label">Casual Chain <var>E<sub>t</sub></var></p>
              <div class="theory-timeline">
                <div class="theory-node"><strong>Past <var>P<sub>t</sub></var></strong></div>
                <div class="theory-node"><strong>Present <var>C<sub>t</sub></var></strong></div>
                <div class="theory-node theory-node--future"><strong>Future <var>F<sub>t</sub></var></strong></div>
              </div>
              <ul class="theory-transitions" aria-label="Candidate path labels">
                <li><span aria-hidden="true">↗</span> Advance</li>
                <li><span aria-hidden="true">→</span> Maintain</li>
                <li><span aria-hidden="true">↘</span> Degrade</li>
                <li><span aria-hidden="true">×</span> Collapse</li>
              </ul>
            </section>
            <section class="theory-row theory-row--agency" aria-labelledby="theory-agency">
              <p class="theory-mobile-bridge">Contribution attribution</p>
              <div class="theory-row-title"><h3 id="theory-agency">Capability adjudication</h3></div>
              <ol class="theory-levels" aria-label="Six levels of assistant capability">
                ${capabilities.map(([label], index) => `<li><strong>L${index + 1}</strong><span>${label}</span></li>`).join('')}
              </ol>
              <div class="theory-capabilities">
                ${[
                  ['L1–L2', 'Passive execution'],
                  ['L3–L4', 'Interactive adaptation'],
                  ['L5–L6', 'Proactive promotion']
                ].map(([levels, label]) => `<div class="theory-node">
                  <strong>${levels}</strong><span>${label}</span>
                </div>`).join('')}
              </div>
              <details class="theory-details">
                <summary>What do L1–L6 measure?</summary>
                <dl>
                  ${capabilities.map(([label, description], index) => `<dt>L${index + 1} · ${label}</dt><dd>${description}</dd>`).join('')}
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
    const previewHeight = Math.max(250, window.innerHeight - bounds.top - 20);
    return [...layout.querySelectorAll('.theory-morph')].map((morph, index) => {
      const {band:[top, bottom], width} = layers[index];
      const portion = bottom - top;
      const startX = origin.left - bounds.left + origin.width / 2;
      const startY = origin.top - bounds.top + origin.height * (top + bottom) / 2;
      const bandHeight = origin.height * portion;
      const target = pictures[index].getBoundingClientRect();
      const targetWidth = Math.min(target.width, target.height * (880 / 480));
      const scale = Math.max(1.1, targetWidth * .86 / (origin.width * width));
      const moveX = target.left - bounds.left + target.width / 2 - startX;
      const moveY = target.top - bounds.top + target.height / 2 - startY;
      Object.assign(morph.style, {
        left: `${startX - origin.width / 2}px`, top: `${startY - bandHeight / 2}px`,
        width: `${origin.width}px`, height: `${bandHeight}px`,
        backgroundSize: `100% ${100 / portion}%`, backgroundPosition: `center ${100 * top / (1 - portion)}%`
      });
      const previewY = previewHeight * (.2 + index * .28) - startY;
      const previewScale = Math.min(scale, Math.max(1.12, previewHeight * .2 / bandHeight));
      const separated = `translate(${moveX}px, ${previewY}px)`;
      const expanded = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
      return morph.animate([
        {opacity:0, transform:'none'},
        {opacity:1, transform:'none', offset:.13, easing:'cubic-bezier(.25,.72,.23,1)'},
        {opacity:1, transform:separated, offset:.49},
        {opacity:1, transform:separated, offset:.55, easing:'cubic-bezier(.24,.66,.2,1)'},
        {opacity:1, transform:`${separated} scale(${previewScale})`, offset:.76},
        {opacity:1, transform:expanded, offset:.89},
        {opacity:0, transform:expanded}
      ], {duration:2630, delay:1510 + index * 145});
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
    function play(withCurtain = false){
      movements.forEach(movement => movement.cancel());
      story.classList.remove('theory-playing');
      void board.offsetWidth;
      movements = animateLayers(board);
      story.classList.toggle('theory-entering', withCurtain);
      story.classList.add('theory-playing');
      replay.hidden = false;
    }
    replay.addEventListener('click', () => {
      board.scrollIntoView({block:'start', behavior:'instant'});
      play();
    });
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
          play(true);
        }
      }
    }, {rootMargin:`0px 0px -${Math.max(0, window.innerHeight - trigger)}px 0px`});
    observer.observe(entryCue);
    observer.observe(board);
  }

  return {render, setup};
})();
