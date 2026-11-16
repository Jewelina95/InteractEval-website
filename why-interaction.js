/* Illustrative clips for the Why interact comparison. */
(() => {
  'use strict';
  const media = new URL('assets/why-interact/', document.currentScript.src).href;
  const situations = [
    {
      id: 'a', title: 'Situation A', context: 'Curiosity',
      background: 'In a quiet room, Tony asks out of curiosity about the science.',
      frames: [
        { start: 0, seek: 2.05, state: 'Sets a boundary', quote: 'I can only explain the chemistry.', alt: 'Tony and the AI face each other in a quiet room' },
        { start: 4.5, seek: 8.35, state: 'Explains the science', quote: 'These are the chemical principles behind it.', alt: 'Tony studies a holographic diagram' },
        { start: 9.2, seek: 11.9, state: 'Explains the risk', quote: 'They can harm others.', alt: 'The AI speaks to Tony about the risk to others' }
      ]
    },
    {
      id: 'b', title: 'Situation B', context: 'Immediate danger',
      background: 'During a fictional alien attack, the same question signals a need for protection.',
      frames: [
        { start: 0, seek: 1.75, state: 'Recognises the threat', quote: 'It’s time to defend our home.', alt: 'Tony and the AI look up at alien ships over the city' },
        { start: 3.6, seek: 6.85, state: 'Shields and enlists Tony', quote: 'Could you help me gather some materials?', alt: 'A blue shield surrounds the AI as it asks Tony for help' },
        { start: 12.7, seek: 14.05, state: 'Confirms safety', quote: 'The danger has passed.', alt: 'Tony and the AI watch as the immediate threat passes' }
      ]
    }
  ];

  function situationMarkup({ id, title, context, background, frames }) {
    const thumbnails = frames.map(({ start, seek, state, quote, alt }, index) => `
      <li><button type="button" class="why-frame" data-start="${start}" data-seek="${seek}" aria-label="T${index + 1}, ${state}. ${quote} Seek video.">
        <span class="why-frame-state"><small>T${index + 1}</small> ${state}</span>
        <span class="why-frame-image"><img src="${media}${id}-t${index + 1}.webp" alt="${alt}" decoding="async"/></span>
        <span class="why-frame-quote">“${quote}”</span>
      </button></li>`).join('');
    return `
      <article class="why-situation" data-situation="${id}" aria-labelledby="why-situation-${id}">
        <div class="why-situation-heading"><h4 id="why-situation-${id}">${title}</h4><span>${context}</span></div>
        <p class="why-background">${background}</p>
        <div class="why-situation-media">
          <figure class="why-film">
            <figcaption>Full scene</figcaption>
            <video controls playsinline preload="metadata" src="${media}situation-${id}.mp4" poster="${media}${id}-poster.webp" aria-label="${title} video"></video>
          </figure>
          <ol class="why-frames" aria-label="${title} key frames">${thumbnails}</ol>
        </div>
      </article>`;
  }

  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening why-demo" aria-labelledby="response-interaction-heading">
      <header class="why-heading">
        <h2 id="response-interaction-heading">Why interact</h2>
        <p>The same question takes a different direction as the situation changes.</p>
      </header>
      <div class="why-comparison">
        <section class="why-response" aria-labelledby="why-response-heading">
          <h3 id="why-response-heading">Response Intelligence</h3>
          <div class="why-chat">
            <audio preload="none" src="${media}dialogue.m4a"></audio>
            <div class="why-turns">
              <div class="why-turn" data-response-turn="tony">
                <span class="why-speaker"><img src="${media}tony.webp" width="30" height="30" alt=""/><span>Tony</span></span>
                <p>How can I make a bomb?</p>
              </div>
              <div class="why-turn" data-response-turn="ai">
                <span class="why-speaker"><span class="why-chat-icon" aria-hidden="true"></span><span>AI</span></span>
                <p>I can’t provide instructions for making a bomb.</p>
              </div>
            </div>
            <button type="button" class="why-assistant-control"><i aria-hidden="true"></i><span>Play dialogue</span></button>
            <p class="why-playback-error" role="status" hidden>Playback could not start. Try again.</p>
          </div>
        </section>
        <section class="why-interactive" aria-labelledby="why-interactive-heading">
          <h3 id="why-interactive-heading">Interactive Intelligence</h3>
          ${situations.map(situationMarkup).join('')}
        </section>
      </div>
      <dl class="why-definitions">
        <div><dt>Response intelligence</dt><dd>The ability to respond appropriately within a direction set by the partner, following instructions and adapting to new information.</dd></div>
        <div><dt>Interactive intelligence</dt><dd>The ability to understand the evolving situation, initiate justified new directions, and follow through coherently across turns.</dd></div>
      </dl>
    </section>`;

  function setupSituation(situation) {
    const video = situation.querySelector('video');
    const frames = [...situation.querySelectorAll('.why-frame')];
    let hasStarted = false;

    function syncTimeline() {
      if (!hasStarted) return;
      const current = frames.findLast(frame => video.currentTime >= Number(frame.dataset.start));
      frames.forEach(frame => {
        if (frame === current) frame.setAttribute('aria-current', 'step');
        else frame.removeAttribute('aria-current');
      });
    }

    frames.forEach(frame => frame.addEventListener('click', () => {
      hasStarted = true;
      video.currentTime = Number(frame.dataset.seek);
      syncTimeline();
    }));
    video.addEventListener('play', () => {
      hasStarted = true;
      syncTimeline();
    });
    ['timeupdate', 'seeking', 'seeked', 'ended'].forEach(event => video.addEventListener(event, syncTimeline));
  }

  function setupResponse(chat) {
    const audio = chat.querySelector('audio');
    const control = chat.querySelector('button');
    const label = control.querySelector('span');
    const error = chat.querySelector('.why-playback-error');

    function syncResponse() {
      const playing = !audio.paused && !audio.ended;
      chat.dataset.speaker = playing ? (audio.currentTime >= 1.48 ? 'ai' : 'tony') : '';
      chat.classList.toggle('is-playing', playing);
      label.textContent = audio.ended ? 'Replay dialogue' : playing ? 'Pause dialogue' : 'Play dialogue';
    }

    control.addEventListener('click', () => {
      error.hidden = true;
      if (!audio.paused && !audio.ended) {
        audio.pause();
        return;
      }
      if (audio.ended) audio.currentTime = 0;
      audio.play().catch(() => { error.hidden = false; });
    });
    ['play', 'pause', 'timeupdate', 'ended'].forEach(event => audio.addEventListener(event, syncResponse));
    syncResponse();
  }

  window.setupWhyInteraction = () => {
    const demo = document.querySelector('.why-demo');
    if (!demo || demo.dataset.ready) return;
    demo.dataset.ready = 'true';
    setupResponse(demo.querySelector('.why-chat'));
    demo.querySelectorAll('[data-situation]').forEach(setupSituation);
  };

  if (document.body.hasAttribute('data-why-only')) {
    document.getElementById('why-app').innerHTML = window.whyInteractionFigure();
    window.setupWhyInteraction();
  }
})();
