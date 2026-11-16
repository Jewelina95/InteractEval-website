'use strict';

window.interactNetTheory = (() => {
  const image = './assets/hero/layered-city.webp';
  const layers = ['galaxy', 'mountain', 'timeline', 'waves', 'city'];

  function render(){
    return `<section class="theory-story" aria-labelledby="theory-story-title">
      <div class="theory-board" id="theoretical-framework">
        <header class="theory-heading">
          <h2 id="theory-story-title">The three-layer framework</h2>
          <button class="theory-replay" type="button" hidden>Replay animation</button>
        </header>
        <div class="theory-layout">
          <figure class="theory-world" style="--world-image:url('${image}')" aria-label="A galaxy above the mountain, timeline, waves and city of the interaction world">
            <img src="${image}" width="1280" height="854" alt="" decoding="async"/>
            ${layers.map(layer => `<i class="theory-slice theory-slice--${layer}" aria-hidden="true"></i>`).join('')}
            <div class="theory-cutaway" aria-hidden="true"></div>
            <div class="theory-mark theory-mark--state" aria-hidden="true"><span>Public acts O<sub>t</sub></span><span>Scene S<sub>t</sub> · Latent state Ψ<sub>t</sub></span></div>
            <div class="theory-mark theory-mark--time" aria-hidden="true">Past · Present · Possible future</div>
            <div class="theory-mark theory-mark--agency" aria-hidden="true">Contribution · L1–L6</div>
          </figure>
          ${['state', 'time', 'agency'].map((name, index) => `<div class="theory-leader theory-leader--${name}" aria-hidden="true" style="--reveal:${1.1 + index * .8}s"><i></i><i></i><i></i></div>`).join('')}
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

  function alignLeaders(story){
    const layout = story.querySelector('.theory-layout').getBoundingClientRect();
    const marks = story.querySelectorAll('.theory-mark');
    const rows = story.querySelectorAll('.theory-row');
    story.querySelectorAll('.theory-leader').forEach((leader, index) => {
      const mark = marks[index].getBoundingClientRect();
      const row = rows[index].getBoundingClientRect();
      const from = mark.top + mark.height / 2;
      const to = row.top + row.height / 2;
      const top = Math.min(from, to);
      Object.assign(leader.style, {
        left: `${mark.right - layout.left}px`,
        top: `${top - layout.top}px`,
        width: `${Math.max(0, row.left - mark.right)}px`,
        height: `${Math.max(1, Math.abs(from - to))}px`
      });
      leader.style.setProperty('--start-line', `${from - top}px`);
      leader.style.setProperty('--end-line', `${to - top}px`);
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
    alignLeaders(story);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const board = story.querySelector('.theory-board');
    const replay = story.querySelector('.theory-replay');
    story.classList.add('theory-ready');
    function play(){
      story.classList.remove('theory-playing');
      alignLeaders(story);
      story.classList.add('theory-playing');
      replay.hidden = false;
    }
    replay.addEventListener('click', play);
    const mastheadHeight = document.querySelector('.masthead')?.offsetHeight ?? 72;
    const trigger = mastheadHeight + 112;
    observer = new IntersectionObserver(entries => {
      if(!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      play();
    }, {rootMargin:`0px 0px -${Math.max(0, window.innerHeight - trigger)}px 0px`});
    observer.observe(board);
  }

  window.addEventListener('resize', () => {
    if(activeStory?.isConnected) alignLeaders(activeStory);
  }, {passive:true});

  return {render, setup};
})();
