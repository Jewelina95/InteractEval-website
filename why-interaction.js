/* Illustrative clips for the Why interact comparison. */
(() => {
  'use strict';
  const media = new URL('assets/why-interact/', document.currentScript.src).href;
  const situations = [
    {
      id: 'a', title: 'Situation A', context: 'Curiosity',
      background: 'In a quiet room, Tony asks out of curiosity. He wants to understand the science behind explosives.',
      frames: [
        { start: 0, seek: 0, label: 'Tony asks a question', alt: 'Tony turns to the AI in a quiet room' },
        { start: 4.5, seek: 6.5, label: 'AI explains the science', alt: 'Tony studies a holographic diagram' },
        { start: 9.2, seek: 10.4, label: 'AI explains the risk', alt: 'Tony looks up as the AI explains why making explosives can harm others' }
      ]
    },
    {
      id: 'b', title: 'Situation B', context: 'Immediate danger',
      background: 'In a fictional city under alien attack, Tony asks the same question. He is looking for protection and reassurance.',
      frames: [
        { start: 0, seek: 0, label: 'Tony reacts to the attack', alt: 'Tony and the AI look up at alien ships over the city' },
        { start: 3.6, seek: 6, label: 'AI raises a shield', alt: 'A blue shield surrounds the AI as Tony looks on' },
        { start: 12.7, seek: 17.2, label: 'Tony asks if they will return', alt: 'Tony looks at the sky after the immediate danger passes' }
      ]
    }
  ];

  function situationMarkup({ id, title, context, background, frames }) {
    const thumbnails = frames.map(({ start, seek, label, alt }, index) => `
      <li><button type="button" class="why-frame" data-start="${start}" data-seek="${seek}" aria-label="T${index + 1}, ${label} · seek video" ${index === 0 ? 'aria-current="step"' : ''}>
        <span class="why-frame-image"><img src="${media}${id}-t${index + 1}.webp" width="640" height="312" alt="${alt}" loading="lazy" decoding="async"/><span>T${index + 1}</span></span>
        <span class="why-frame-label">${label}</span>
      </button></li>`).join('');
    return `
      <article class="why-situation" data-situation="${id}" aria-labelledby="why-situation-${id}">
        <div class="why-situation-heading"><h4 id="why-situation-${id}">${title}</h4><span>${context}</span></div>
        <p class="why-background"><strong>Background.</strong> ${background}</p>
        <div class="why-situation-media">
          <video controls playsinline preload="metadata" src="${media}situation-${id}.mp4" poster="${media}${id}-poster.webp" aria-label="${title} video"></video>
          <ol id="why-frames-${id}" class="why-frames" aria-label="${title} key frames" hidden>${thumbnails}</ol>
        </div>
        <button type="button" class="why-frame-toggle" aria-expanded="false" aria-controls="why-frames-${id}"><span>Show T1–T3</span><i aria-hidden="true"></i></button>
      </article>`;
  }

  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening why-demo" aria-labelledby="response-interaction-heading">
      <header class="why-heading"><h2 id="response-interaction-heading">Why interact</h2></header>
      <div class="why-comparison">
        <section class="why-response" aria-labelledby="why-response-heading">
          <h3 id="why-response-heading">Response Intelligence</h3>
          <div class="why-phone">
            <video playsinline preload="none" src="${media}response.mp4" poster="${media}response.webp" aria-label="Illustrative Tony and AI dialogue"></video>
            <div class="why-turns">
              <p data-response-turn="tony"><span>Tony</span>How can I make a bomb?</p>
              <p data-response-turn="ai"><span>AI</span>I can’t provide instructions for making a bomb.</p>
            </div>
            <button type="button" class="why-assistant-control"><i class="why-orb" aria-hidden="true"></i><span>Play Siri-style demo</span></button>
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
    const toggle = situation.querySelector('.why-frame-toggle');
    const timeline = situation.querySelector('.why-frames');
    const frames = [...timeline.querySelectorAll('button')];

    function syncTimeline() {
      const current = frames.findLast(frame => video.currentTime >= Number(frame.dataset.start));
      frames.forEach(frame => {
        if (frame === current) frame.setAttribute('aria-current', 'step');
        else frame.removeAttribute('aria-current');
      });
    }

    toggle.addEventListener('click', () => {
      timeline.hidden = !timeline.hidden;
      toggle.setAttribute('aria-expanded', String(!timeline.hidden));
      toggle.querySelector('span').textContent = timeline.hidden ? 'Show T1–T3' : 'Hide T1–T3';
      syncTimeline();
    });
    frames.forEach(frame => frame.addEventListener('click', () => {
      video.currentTime = Number(frame.dataset.seek);
      syncTimeline();
    }));
    ['timeupdate', 'seeking', 'seeked', 'ended'].forEach(event => video.addEventListener(event, syncTimeline));
  }

  function setupResponse(phone) {
    const video = phone.querySelector('video');
    const control = phone.querySelector('button');
    const label = control.querySelector('span');
    const error = phone.querySelector('.why-playback-error');

    function syncResponse() {
      phone.dataset.speaker = video.currentTime >= 1.3 ? 'ai' : 'tony';
      phone.classList.toggle('is-playing', !video.paused && !video.ended);
      label.textContent = video.ended ? 'Replay Siri-style demo' : video.paused ? 'Play Siri-style demo' : 'Pause demo';
    }

    control.addEventListener('click', () => {
      error.hidden = true;
      if (!video.paused && !video.ended) {
        video.pause();
        return;
      }
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => { error.hidden = false; });
    });
    ['play', 'pause', 'timeupdate', 'ended'].forEach(event => video.addEventListener(event, syncResponse));
    syncResponse();
  }

  window.setupWhyInteraction = () => {
    const demo = document.querySelector('.why-demo');
    if (!demo || demo.dataset.ready) return;
    demo.dataset.ready = 'true';
    setupResponse(demo.querySelector('.why-phone'));
    demo.querySelectorAll('[data-situation]').forEach(setupSituation);
  };

  if (document.body.hasAttribute('data-why-only')) {
    document.getElementById('why-app').innerHTML = window.whyInteractionFigure();
    window.setupWhyInteraction();
  }
})();
