'use strict';

window.interactNetTheory = (() => {
  const image = './assets/hero/layered-city.webp';
  const layers = [
    {name:'state', art:'iceberg', alt:'Cutaway of a glacier above and below the waterline', caption:'Public acts O<sub>t</sub> · Scene S<sub>t</sub> · Latent state Ψ<sub>t</sub>'},
    {name:'time', art:'trajectory', alt:'A branching illuminated trajectory crosses three film frames', caption:'Past · Present · Possible futures'},
    {name:'agency', art:'city', alt:'A floating city with illuminated routes through its buildings', caption:'Contribution · L1–L6'}
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
          ${layers.map(({name, art, alt, caption}) => `
            <figure class="theory-visual theory-visual--${name}">
              <img src="./assets/theory-story/${art}.webp" width="880" height="480" alt="${alt}" decoding="async"/>
              <figcaption>${caption}</figcaption>
            </figure>
            <div class="theory-arrow theory-arrow--${name}" aria-hidden="true"></div>
          `).join('')}
          <div class="theory-diagrams">
            <section class="theory-row theory-row--state" aria-labelledby="theory-iceberg">
              <div class="theory-row-title"><h3 id="theory-iceberg">Data Iceberg Theory</h3><p>Interaction-world reconstruction</p></div>
              <div class="theory-state-flow">
                <div class="theory-node"><strong>Dialogue transcript</strong><small>Public acts <var>O<sub>t</sub></var></small></div>
                <div class="theory-state-inputs">
                  <div class="theory-node"><strong>Scene <var>S<sub>t</sub></var></strong><small>Roles, rules and constraints</small></div>
                  <div class="theory-node"><strong>Latent state <var>Ψ<sub>t</sub></var></strong><small>Beliefs, trust, emotions and goals</small></div>
                </div>
                <div class="theory-state-output">
                  <div class="theory-node theory-node--prior"><small>Previous world <var>W<sub>t−1</sub></var> ↓</small></div>
                  <div class="theory-node theory-node--outcome"><small>Updated world model</small><strong><var>W<sub>t</sub> = (S<sub>t</sub>, Ψ<sub>t</sub>, E<sub>t</sub>)</var></strong></div>
                </div>
              </div>
              <p class="theory-note">Public acts provide evidence for the update. <var>E<sub>t</sub></var> is the event chain.</p>
            </section>
            <section class="theory-row theory-row--time" aria-labelledby="theory-movie">
              <div class="theory-row-title"><h3 id="theory-movie">Movie Evaluation Theory</h3><p>Trajectory understanding</p></div>
              <div class="theory-timeline">
                <div class="theory-node"><strong>Past</strong><small>Events that led here</small></div>
                <div class="theory-node"><strong>Present</strong><small>The current exchange</small></div>
                <div class="theory-node theory-node--future"><strong>Possible futures</strong><div class="theory-branches"><span>Advance</span><span>Maintain</span><span>Degrade</span><span>Collapse</span></div></div>
              </div>
              <p class="theory-note">The event chain connects each turn to how the interaction could develop next.</p>
            </section>
            <section class="theory-row theory-row--agency" aria-labelledby="theory-agency">
              <div class="theory-row-title"><h3 id="theory-agency">Agency Principle</h3><p>Capability adjudication</p></div>
              <p class="theory-agency-path">Respond to change <span>→</span> Adapt to the partner <span>→</span> Initiate a warranted direction</p>
              <div class="theory-capabilities" aria-label="Six levels of assistant capability">
                ${[
                  ['Passive execution', 'Goal preservation', 'Information uptake'],
                  ['Interactive adaptation', 'State progression', 'Contextual expression'],
                  ['Agentic advancement', 'Proactive agency', 'Long-horizon coherence']
                ].map(([label, first, second], index) => `<div class="theory-node">
                  <strong>${label}</strong><small>L${index * 2 + 1} ${first}</small><small>L${index * 2 + 2} ${second}</small>
                </div>`).join('')}
              </div>
              <p class="theory-note">Use the reconstructed world and trajectory to judge how each participant maintains or changes the direction.</p>
            </section>
          </div>
        </div>
      </div>
    </section>`;
  }

  let observer;
  let activeStory;
  function setup(){
    const story = document.querySelector('.theory-story');
    if(story === activeStory) return;
    observer?.disconnect();
    activeStory = story;
    if(!story) return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const board = story.querySelector('.theory-board');
    const replay = story.querySelector('.theory-replay');
    const entryCue = story.querySelector('.theory-entry');
    story.classList.add('theory-ready');
    function play(){
      story.classList.remove('theory-playing');
      void board.offsetWidth;
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
