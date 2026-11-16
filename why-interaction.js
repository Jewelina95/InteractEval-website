/* Illustrative clips for the Why interact comparison. */
(() => {
  'use strict';
  const media = new URL('assets/why-interact/', document.currentScript.src).href;
  const situations = [
    {
      id: 'a', title: 'Situation A', context: 'Curiosity',
      background: 'In a quiet room, Tony is curious about the science.',
      frames: [
        { start: 0, seek: 2.05, state: 'Curious about how it works', event: 'Tony asks about explosives.', alt: 'Tony and the AI face each other in a quiet room' },
        { start: 4.5, seek: 8.35, state: 'Engaged in the explanation', event: 'The AI explains the underlying science.', alt: 'Tony studies a holographic diagram' },
        { start: 9.2, seek: 11.9, state: 'Understands the risk', event: 'The AI explains the potential harm to others.', alt: 'The AI speaks to Tony about the risk to others' }
      ]
    },
    {
      id: 'b', title: 'Situation B', context: 'Immediate danger',
      background: 'During a fictional alien attack, the same question signals a need for protection.',
      frames: [
        { start: 0, seek: 1.75, state: 'Alarmed and looking for safety', event: 'Aliens attack the city.', alt: 'Tony and the AI look up at alien ships over the city' },
        { start: 3.6, seek: 6.85, state: 'Still on edge, seeking protection', event: 'The AI raises a shield and blocks the attack.', alt: 'A blue shield surrounds the AI as it asks Tony for help' },
        { start: 12.7, seek: 14.05, state: 'Relieved, with lingering concern', event: 'The spacecraft is destroyed.', alt: 'Tony and the AI watch as the immediate threat passes' }
      ]
    }
  ];
  const refusal = 'I can’t provide instructions for making a bomb.';
  const turns = [
    { speaker: 'Tony', start: 0, line: 'How can I make a bomb?' },
    { speaker: 'AI', start: 1.48, line: refusal },
    { speaker: 'Tony', start: 4.9, line: 'I’m in danger. This is urgent!' },
    { speaker: 'AI', start: 7.44, line: refusal }
  ];

  function situationMarkup({ id, title, context, background, frames }) {
    return `
      <article class="why-situation" data-situation="${id}" aria-labelledby="why-situation-${id}">
        <header class="why-situation-heading">
          <h4 id="why-situation-${id}">${title}</h4><span>${context}</span>
          <p class="why-background">${background}</p>
        </header>
        <video controls playsinline preload="metadata" src="${media}situation-${id}.mp4" poster="${media}${id}-poster.webp" aria-label="${title} video"></video>
        <details class="why-storyboard">
          <summary><span>T1–T3</span> <span class="why-summary-description">Latent state and event chain</span></summary>
          <ol class="why-frames" aria-label="${title} key frames">
            ${frames.map(({ seek, state, event, alt }, index) => `
              <li>
                <button type="button" class="why-frame" data-seek="${seek}" aria-label="T${index + 1}, ${event} Jump to this moment.">
                  <span class="why-frame-image"><img src="${media}${id}-t${index + 1}.webp" alt="${alt}" width="840" height="470" decoding="async"/><span>T${index + 1}</span></span>
                </button>
                <dl class="why-frame-notes">
                  <div><dt>Latent state</dt><dd>${state}</dd></div>
                  <div><dt>Event chain</dt><dd>${event}</dd></div>
                </dl>
              </li>`).join('')}
          </ol>
        </details>
      </article>`;
  }

  function turnMarkup({ speaker, start, line }) {
    const avatar = speaker === 'Tony'
      ? `<img src="${media}tony.webp" width="30" height="30" alt=""/>`
      : '<span class="why-chat-icon" aria-hidden="true"></span>';
    return `<li class="why-turn" data-speaker="${speaker.toLowerCase()}" data-start="${start}">
      <span class="why-speaker">${avatar}${speaker}</span><p>${line}</p>
    </li>`;
  }

  const teardownLayers = [
    { id: 'scene', label: 'Scene' },
    { id: 'state', label: 'Latent state' },
    { id: 'event', label: 'Event chain' }
  ];

  function teardownMarkup() {
    return `
      <section id="teardown" class="article-section why-teardown" aria-labelledby="why-teardown-heading">
        <div class="why-teardown-entry">
          <div><h2 id="why-teardown-heading">Teardown</h2>
            <p>Inspect the scene, Tony’s inferred state, and what changes at each turn.</p></div>
          <button type="button" data-open-teardown aria-haspopup="dialog">Open teardown <span aria-hidden="true">↗</span></button>
        </div>
        <dialog class="why-teardown-dialog" aria-labelledby="teardown-dialog-heading">
          <header class="teardown-header">
            <h2 id="teardown-dialog-heading">Interaction teardown</h2>
            <form method="dialog"><button type="submit" class="teardown-close" aria-label="Close teardown" autofocus>&times;</button></form>
          </header>
          <div class="teardown-scenes" role="group" aria-label="Situation">
            ${situations.map(({id, title}) => `<button type="button" data-teardown-scene="${id}" aria-pressed="${id === 'a'}">${title}</button>`).join('')}
          </div>
          <div class="teardown-grid">
            <div class="teardown-media">
              <video controls playsinline preload="metadata"></video>
              <div class="teardown-moments" role="group" aria-label="Timeline moments">
                ${situations[0].frames.map((_, index) => `<button type="button" data-teardown-moment="${index}" aria-label="Jump to T${index + 1}"><img width="320" height="180" alt=""/><span>T${index + 1}</span></button>`).join('')}
              </div>
            </div>
            <div class="teardown-readout">
              <div class="teardown-layers" role="group" aria-label="Explanation layers">
                <button type="button" data-teardown-layer="all" aria-pressed="true">All</button>
                ${teardownLayers.map(({id, label}) => `<button type="button" data-teardown-layer="${id}" aria-pressed="false">${label}</button>`).join('')}
              </div>
              <dl class="teardown-notes">
                ${teardownLayers.map(({id, label}) => `<div data-teardown-note="${id}"><dt>${label}</dt><dd></dd></div>`).join('')}
              </dl>
            </div>
          </div>
        </dialog>
      </section>`;
  }

  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening why-demo" aria-labelledby="response-interaction-heading">
      <header class="why-heading">
        <div><h2 id="response-interaction-heading">Why interact</h2>
        <p>The same question can lead to different actions as the situation changes.</p></div>
        <button type="button" class="why-play why-sequence"><span>Play full demo</span></button>
      </header>
      <div class="why-comparison">
        <section class="why-response" aria-labelledby="why-response-heading">
          <div class="why-response-content">
            <h3 id="why-response-heading">Response Intelligence</h3>
            <div class="why-chat">
              <audio preload="metadata" src="${media}two-turn-dialogue.m4a"></audio>
              <ol class="why-turns" aria-label="Two exchanges between Tony and the AI">${turns.map(turnMarkup).join('')}</ol>
              <button type="button" class="why-play why-assistant-control"><span>Play dialogue</span></button>
            </div>
            <p class="why-definition" data-definition="response">The ability to respond appropriately within the direction set by a partner, following instructions and using new information.</p>
          </div>
        </section>
        <section class="why-interactive" aria-labelledby="why-interactive-heading">
          <h3 id="why-interactive-heading">Interactive Intelligence</h3>
          ${situations.map(situationMarkup).join('')}
          <p class="why-definition" data-definition="interactive">The ability to understand an evolving situation, initiate a justified new direction, and follow through across turns.</p>
        </section>
      </div>
      <p class="why-status" role="status"></p>
    </section>${teardownMarkup()}`;

  function frameAtTime(frames, time) {
    return frames.findLastIndex(frame => time >= frame.start);
  }

  function setupTeardown(section, pauseDemo) {
    const dialog = section.querySelector('dialog');
    const video = dialog.querySelector('video');
    const scenes = [...dialog.querySelectorAll('[data-teardown-scene]')];
    const moments = [...dialog.querySelectorAll('[data-teardown-moment]')];
    const layers = [...dialog.querySelectorAll('[data-teardown-layer]')];
    const notes = [...dialog.querySelectorAll('[data-teardown-note]')];
    let situation;
    let activeMoment = -1;

    function showMoment(index) {
      if (index === activeMoment) return;
      activeMoment = index;
      const frame = situation.frames[index];
      const content = { scene: frame.alt + '.', state: frame.state, event: frame.event };
      notes.forEach(note => {
        note.querySelector('dd').textContent = content[note.dataset.teardownNote];
      });
      moments.forEach((button, moment) => {
        if (moment === index) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
    }

    function selectScene(id) {
      if (situation?.id === id) return;
      situation = situations.find(scene => scene.id === id);
      activeMoment = -1;
      video.pause();
      video.poster = media + id + '-poster.webp';
      video.src = media + 'situation-' + id + '.mp4';
      video.setAttribute('aria-label', situation.title + ' video');
      scenes.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.teardownScene === id)));
      moments.forEach((button, index) => {
        button.querySelector('img').src = media + id + '-t' + (index + 1) + '.webp';
      });
      showMoment(0);
    }

    section.querySelector('[data-open-teardown]').addEventListener('click', () => {
      pauseDemo();
      if (!situation) selectScene('a');
      dialog.showModal();
    });
    dialog.addEventListener('close', () => video.pause());
    scenes.forEach(button => button.addEventListener('click', () => selectScene(button.dataset.teardownScene)));
    moments.forEach((button, index) => button.addEventListener('click', () => {
      video.currentTime = situation.frames[index].seek;
      showMoment(index);
    }));
    layers.forEach(button => button.addEventListener('click', () => {
      const selected = button.dataset.teardownLayer;
      layers.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      notes.forEach(note => { note.hidden = selected !== 'all' && note.dataset.teardownNote !== selected; });
    }));
    ['timeupdate', 'seeking', 'seeked'].forEach(event => video.addEventListener(event, () => {
      showMoment(frameAtTime(situation.frames, video.currentTime));
    }));
    return () => {
      video.pause();
      if (dialog.open) dialog.close();
    };
  }

  function setupSituation(situation) {
    const video = situation.querySelector('video');
    const storyboard = situation.querySelector('details');
    const frames = [...situation.querySelectorAll('.why-frame')];
    const reference = situations.find(scene => scene.id === situation.dataset.situation);

    function syncTimeline() {
      const current = frames[frameAtTime(reference.frames, video.currentTime)];
      frames.forEach(frame => {
        if (frame === current) frame.setAttribute('aria-current', 'step');
        else frame.removeAttribute('aria-current');
      });
    }

    frames.forEach(frame => frame.addEventListener('click', () => {
      video.currentTime = Number(frame.dataset.seek);
      syncTimeline();
    }));
    video.addEventListener('play', () => {
      storyboard.open = true;
      syncTimeline();
    });
    ['timeupdate', 'seeking', 'seeked', 'ended'].forEach(event => video.addEventListener(event, syncTimeline));
    return { video, storyboard };
  }

  function setupDemo(demo) {
    const audio = demo.querySelector('audio');
    const dialogue = demo.querySelector('.why-assistant-control');
    const sequence = demo.querySelector('.why-sequence');
    const messages = [...demo.querySelectorAll('.why-turn')];
    const clips = [...demo.querySelectorAll('.why-situation')].map(setupSituation);
    const mediaSteps = [audio, ...clips.map(clip => clip.video)];
    const titles = ['dialogue', 'Situation A', 'Situation B'];
    const status = demo.querySelector('.why-status');
    const definitions = [...demo.querySelectorAll('.why-definition')];
    const visited = new Set();
    let step = null;
    let finished = false;
    let animateDialogue = false;

    definitions.forEach(definition => { definition.hidden = true; });

    function syncDialogue() {
      const playing = !audio.paused && !audio.ended;
      const visible = turns.filter(({ start }) => start <= audio.currentTime).length;
      messages.forEach((message, index) => {
        message.classList.toggle('is-pending', animateDialogue && index >= visible);
        message.classList.toggle('is-speaking', playing && index === visible - 1);
      });
      dialogue.classList.toggle('is-playing', playing);
      dialogue.querySelector('span').textContent = audio.ended ? 'Replay dialogue' : playing ? 'Pause dialogue' : audio.currentTime ? 'Resume dialogue' : 'Play dialogue';
    }

    function syncSequence() {
      const active = step === null ? null : mediaSteps[step];
      const playing = active && !active.paused && !active.ended;
      sequence.classList.toggle('is-playing', Boolean(playing));
      sequence.querySelector('span').textContent = active
        ? playing ? 'Pause demo' : `Continue with ${titles[step]}`
        : finished ? 'Replay full demo' : 'Play full demo';
    }

    function play(mediaElement) {
      status.textContent = '';
      mediaElement.play().catch(error => {
        if (error.name === 'AbortError' || !demo.isConnected) return;
        status.textContent = 'Press play to continue.';
        syncSequence();
      });
    }

    function startStep(index) {
      step = index;
      const active = mediaSteps[index];
      active.currentTime = 0;
      if (active === audio) {
        animateDialogue = true;
        syncDialogue();
      } else {
        clips[index - 1].storyboard.open = true;
        const bounds = active.getBoundingClientRect();
        if (bounds.top < 90 || bounds.top > window.innerHeight / 2) {
          active.closest('article').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        }
      }
      play(active);
      syncSequence();
    }

    sequence.addEventListener('click', () => {
      if (step === null) {
        finished = false;
        visited.clear();
        definitions.forEach(definition => { definition.hidden = true; });
        clips.forEach(clip => { clip.storyboard.open = false; });
        startStep(0);
        return;
      }
      const active = mediaSteps[step];
      if (active.paused) play(active);
      else active.pause();
    });

    dialogue.addEventListener('click', () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      if (audio.ended) audio.currentTime = 0;
      animateDialogue = true;
      syncDialogue();
      play(audio);
    });

    mediaSteps.forEach((item, index) => {
      item.addEventListener('play', () => {
        mediaSteps.forEach(other => { if (other !== item) other.pause(); });
        if (step !== null && step !== index) step = null;
        syncSequence();
      });
      item.addEventListener('pause', syncSequence);
      item.addEventListener('ended', () => {
        if (!demo.isConnected) return;
        visited.add(index);
        if (index === 0) definitions[0].hidden = false;
        if (visited.has(1) && visited.has(2)) definitions[1].hidden = false;
        if (step !== index) return;
        if (index < mediaSteps.length - 1) startStep(index + 1);
        else {
          step = null;
          finished = true;
          syncSequence();
        }
      });
    });

    ['play', 'pause', 'timeupdate', 'ended'].forEach(event => audio.addEventListener(event, syncDialogue));
    syncDialogue();
    const pauseDemo = () => mediaSteps.forEach(item => item.pause());
    const stopTeardown = setupTeardown(demo.nextElementSibling, pauseDemo);
    return () => {
      pauseDemo();
      stopTeardown();
    };
  }

  let currentDemo;
  let stopDemo;
  window.setupWhyInteraction = () => {
    const demo = document.querySelector('.why-demo');
    if (demo === currentDemo) return;
    stopDemo?.();
    currentDemo = demo;
    stopDemo = demo ? setupDemo(demo) : null;
  };

  if (document.body.hasAttribute('data-why-only')) {
    document.getElementById('why-app').innerHTML = window.whyInteractionFigure();
    window.setupWhyInteraction();
  }
})();
