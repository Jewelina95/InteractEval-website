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
    {name:'state', art:'iceberg', band:[stackTop, .349], width:.43, title:'Data Iceberg Theory', bridge:'State understanding', alt:'Cutaway of a glacier above and below the waterline', caption:'Public acts O<sub>t</sub> · Scene S<sub>t</sub> · Latent state Ψ<sub>t</sub>'},
    {name:'time', art:'trajectory', band:[.349, waveTop], width:.49, title:'Movie Evaluation Theory', bridge:'Process understanding', alt:'A branching illuminated trajectory crosses three film frames'},
    {name:'agency', art:'agency-waves', band:[waveTop, waveBottom], width:.59, clip:waveClip, title:'Agency Principle', bridge:'Contribution attribution', alt:'Two wave surfaces with illuminated paths diverging across them'}
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
          <img class="theory-stack" src="${image}" width="1280" height="854" alt="" decoding="async" style="clip-path:${stackClip}"/>
          ${layers.map(({name, art, title, bridge, alt, caption, clip}) => `
            <figure class="theory-visual theory-visual--${name}">
              <div class="theory-art">
                <img src="./assets/theory-story/${art}.webp" width="880" height="480" alt="${alt}" decoding="async"/>
                <span class="theory-sparks" aria-hidden="true">${'<i></i>'.repeat(4)}</span>
              </div>
              <figcaption><strong>${title}</strong>${caption ? `<span>${caption}</span>` : ''}</figcaption>
            </figure>
            <div class="theory-arrow theory-arrow--${name}"><span>${bridge}</span><i aria-hidden="true"></i></div>
            <div class="theory-morph theory-morph--${name}" aria-hidden="true" style="--world-image:url('${image}')${clip ? `;clip-path:${clip}` : ''}"></div>
          `).join('')}
          <div class="theory-diagrams">
            <section class="theory-row theory-row--state" aria-labelledby="theory-iceberg">
              <p class="theory-mobile-bridge">State understanding</p>
              <div class="theory-row-title"><h3 id="theory-iceberg">Interaction-world reconstruction</h3><span>${layers[0].title}</span></div>
              <div class="theory-state-flow">
                <div class="theory-node theory-node--acts"><span>Dialogue transcript</span><strong>Public acts <var>O<sub>t</sub></var></strong></div>
                <div class="theory-state-inputs">
                  <div class="theory-node theory-node--scene"><strong>Scene <var>S<sub>t</sub></var></strong></div>
                  <div class="theory-node theory-node--latent"><strong>Latent state <var>Ψ<sub>t</sub></var></strong></div>
                </div>
                <div class="theory-state-output">
                  <div class="theory-node theory-node--prior"><strong>Previous world <var>W<sub>t−1</sub></var></strong></div>
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
              <div class="theory-row-title"><h3 id="theory-movie">Trajectory understanding</h3><span>${layers[1].title}</span></div>
              <div class="theory-timeline">
                <div class="theory-node"><strong>Past</strong><span>Event chain <var>E<sub>t</sub></var></span></div>
                <div class="theory-node"><strong>Present</strong><span>Current turn</span></div>
                <div class="theory-node theory-node--future"><strong>Possible futures</strong><span>State transitions</span></div>
              </div>
              <ul class="theory-transitions" aria-label="Possible state transitions">
                <li><strong>Advance</strong><span>Moves toward the goal</span></li>
                <li><strong>Maintain</strong><span>Stays on course</span></li>
                <li><strong>Degrade</strong><span>Loses progress</span></li>
                <li><strong>Collapse</strong><span>Breaks down</span></li>
              </ul>
            </section>
            <section class="theory-row theory-row--agency" aria-labelledby="theory-agency">
              <p class="theory-mobile-bridge">Contribution attribution</p>
              <div class="theory-row-title"><h3 id="theory-agency">Capability adjudication</h3><span>${layers[2].title}</span></div>
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
