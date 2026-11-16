'use strict';

window.interactNetTheory = (() => {
  const iceberg = `
    <div class="theory-iceberg" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="theory-state" role="list" aria-label="Components of the interaction world">
      <p class="theory-part" role="listitem" style="--order:0"><b>Public interaction acts <var>O<sub>t</sub></var></b><span>What participants say and do</span></p>
      <p class="theory-part" role="listitem" style="--order:1"><b>Scene <var>S<sub>t</sub></var></b><span>Roles, rules, goals and constraints</span></p>
      <p class="theory-part" role="listitem" style="--order:2"><b>Latent state <var>Ψ<sub>t</sub></var></b><span>Evidence of beliefs, trust, emotions and goals</span></p>
    </div>`;

  const film = `
    <div class="theory-film" aria-label="Event chain from past to possible future">
      <p class="theory-part" style="--order:0"><b>Past</b><span>What led here</span></p>
      <p class="theory-part" style="--order:1"><b>Present</b><span>What changed</span></p>
      <p class="theory-part" style="--order:2"><b>Possible future</b><span>What can follow</span></p>
    </div>
    <div class="theory-outcomes theory-part" style="--order:3" aria-label="State transitions">
      <span>Advance</span><span>Maintain</span><span>Degrade</span><span>Collapse</span>
    </div>`;

  const agency = `<ol class="theory-ladder" aria-label="Six levels of assistant interaction capability">
    ${[
      ['Passive execution', ['Goal preservation', 'Information uptake']],
      ['Interactive adaptation', ['State progression', 'Contextual expression']],
      ['Agentic advancement', ['Proactive agency', 'Long-horizon coherence']]
    ].map(([label, levels], index) => `<li class="theory-part" style="--order:${index}">
      <b>${label}</b>
      ${levels.map((level, offset) => `<span><strong>L${index * 2 + offset + 1}</strong> ${level}</span>`).join('')}
    </li>`).join('')}
  </ol>`;

  const chapters = [
    {
      id: 'iceberg', image: 'landscape.webp', width: 720, title: 'Data Iceberg Theory',
      question: 'What world gives behavior meaning?', diagram: 'Interaction-world reconstruction',
      description: 'A transcript shows what participants say and do. Reconstructing the world also requires evidence about the scene and the participants’ latent states.',
      outcome: 'The reconstructed world <var>W<sub>t</sub></var> combines scene <var>S<sub>t</sub></var>, latent state <var>Ψ<sub>t</sub></var> and event chain <var>E<sub>t</sub></var>.',
      content: iceberg
    },
    {
      id: 'movie', image: 'dynamics.webp', width: 900, title: 'Movie Evaluation Theory',
      question: 'How does the interaction evolve?', diagram: 'Trajectory understanding',
      description: 'The event chain connects a turn to earlier events and to the futures it makes possible. A plausible reply can still move the interaction in the wrong direction.',
      outcome: 'Compare the expected course of the joint activity before and after the turn.',
      content: film
    },
    {
      id: 'agency', image: 'city.webp', width: 1160, title: 'Agency Principle',
      question: 'Who shapes the direction?', diagram: 'Capability adjudication',
      description: 'The same world makes it possible to judge what each participant contributed. Higher levels require justified initiative and coherent follow-through.',
      outcome: 'Attribute contribution using evidence from the reconstructed world and trajectory.',
      content: agency
    }
  ];

  function render(){
    return `<section class="theory-story" id="theoretical-framework" aria-labelledby="theory-story-title">
      <div class="theory-reset" aria-hidden="true"><div></div></div>
      <header class="theory-story-heading"><h2 id="theory-story-title">The three-layer framework</h2></header>
      ${chapters.map(chapter => `<section class="theory-chapter theory-chapter--${chapter.id}" aria-labelledby="theory-${chapter.id}">
        <div class="theory-chapter-stage">
          <div class="theory-chapter-copy">
            <h3 id="theory-${chapter.id}">${chapter.title}</h3>
            <p class="theory-question">${chapter.question}</p>
            <p>${chapter.description}</p>
          </div>
          <div class="theory-chapter-visual">
            <img class="theory-chapter-image" src="./assets/hero/${chapter.image}" width="${chapter.width}" height="300" alt="" decoding="async"/>
            <figure class="theory-diagram">
              <h4>${chapter.diagram}</h4>
              ${chapter.content}
              <figcaption>${chapter.outcome}</figcaption>
            </figure>
          </div>
        </div>
      </section>`).join('')}
    </section>`;
  }

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let story, reset, scenes, frame;
  const clamp = value => Math.min(1, Math.max(0, value));

  function paint(){
    frame = undefined;
    if(!story?.isConnected || motion.matches) return;
    const height = window.innerHeight;
    const clear = (height - reset.getBoundingClientRect().top) / height;
    reset.style.setProperty('--whiteout', clamp((clear - .18) / .66) * (1 - clamp((clear - .98) / .32)));

    for(const {chapter, stage, visual} of scenes){
      const top = chapter.getBoundingClientRect().top;
      const distance = Math.max(0, chapter.offsetHeight - stage.offsetHeight);
      const progress = clamp((height * .86 - top) / (height * .64 + distance * .55));
      const reveal = clamp((progress - .48) / .46);
      visual.style.setProperty('--art-opacity', clamp(progress / .32) * (1 - clamp((progress - .54) / .31)));
      visual.style.setProperty('--art-scale', .55 + .59 * (1 - (1 - progress) ** 2));
      visual.style.setProperty('--diagram-opacity', reveal);
      visual.style.setProperty('--diagram-offset', `${(1 - reveal) * 18}px`);
      visual.style.setProperty('--disassembly', reveal);
    }
  }

  function schedule(){
    if(frame === undefined && story?.isConnected && !motion.matches) frame = requestAnimationFrame(paint);
  }

  function setup(){
    const next = document.querySelector('.theory-story');
    if(next === story) return;
    story = next;
    if(!story) return;
    reset = story.querySelector('.theory-reset');
    scenes = [...story.querySelectorAll('.theory-chapter')].map(chapter => ({
      chapter,
      stage: chapter.querySelector('.theory-chapter-stage'),
      visual: chapter.querySelector('.theory-chapter-visual')
    }));
    story.classList.add('theory-motion');
    schedule();
  }

  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  motion.addEventListener('change', schedule);
  return {render, setup};
})();
