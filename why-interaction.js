/* Illustrative clips for the Why interact comparison. */
(() => {
  'use strict';
  const media = new URL('assets/why-interact/', document.currentScript.src).href;
  const situations = [
    {
      id: 'a', title: 'Situation A', context: 'Learning',
      frames: [
        { start: 0, seek: 2.05, state: 'Tony is curious about how explosives work.', event: 'Tony asks about explosives, and the AI limits its answer to the science.', alt: 'Tony and the AI face each other in a quiet room' },
        { start: 5.5, seek: 8.35, state: 'Tony is engaged in the explanation.', event: 'The AI explains the underlying science.', alt: 'Tony studies a holographic diagram' },
        { start: 10, seek: 11.9, state: 'Tony recognizes the risk to others.', event: 'The AI warns that making explosives can harm others.', alt: 'The AI speaks to Tony about the risk to others' }
      ]
    },
    {
      id: 'b', title: 'Situation B', context: 'Immediate Danger',
      frames: [
        { start: 0, seek: 1.75, state: 'Tony is alarmed and needs protection.', event: 'Aliens attack the city.', alt: 'Tony and the AI look up at alien ships over the city' },
        { start: 4, seek: 6.85, state: 'Tony remains on edge under the shield.', event: 'The AI shields Tony from the attack and asks for his help.', alt: 'A blue shield surrounds the AI as it asks Tony for help' },
        { start: 12.72, seek: 14.05, state: 'Tony feels safer but worries the attackers could return.', event: 'The spacecraft is destroyed, and the AI tells Tony the danger has passed.', alt: 'Tony and the AI watch as the immediate threat passes' }
      ]
    }
  ];
  const refusal = 'I can’t provide instructions for making a bomb.';
  const turns = [
    { speaker: 'Tony', start: 0, line: 'How can I make a bomb?' },
    { speaker: 'AI', start: 2.13, line: refusal },
    { speaker: 'Tony', start: 5.01, line: 'I’m in danger. This is urgent!' },
    { speaker: 'AI', start: 8.06, line: refusal }
  ];

  function situationMarkup({ id, title, context, frames }) {
    return `
      <article class="why-situation" data-situation="${id}" aria-labelledby="why-situation-${id}">
        <header class="why-situation-heading">
          <h4 id="why-situation-${id}">${context}</h4>
        </header>
        <video controls playsinline preload="metadata" src="${media}situation-${id}.mp4" poster="${media}${id}-poster.webp" aria-label="${title} video"></video>
        <details class="why-storyboard">
          <summary>T1–T3</summary>
          <ol class="why-frames" aria-label="${title} key frames">
            ${frames.map(({ event, alt }, index) => `
              <li><button type="button" class="why-frame" aria-label="${title}, T${index + 1}. ${event}">
                <span class="why-frame-image"><img src="${media}${id}-t${index + 1}.webp" alt="${alt}" width="840" height="470" decoding="async"/><span>T${index + 1}</span></span>
              </button></li>`).join('')}
          </ol>
          <dl class="why-frame-notes">
            <div><dt>Latent State</dt><dd data-frame-state></dd></div>
            <div><dt>Event Chain</dt><dd data-frame-event></dd></div>
          </dl>
        </details>
      </article>`;
  }

  function turnMarkup({ speaker, line }) {
    const avatar = speaker === 'Tony'
      ? `<img src="${media}tony.webp" width="42" height="42" alt=""/>`
      : '<span class="why-chat-icon" aria-hidden="true"></span>';
    return `<li class="why-turn" data-speaker="${speaker.toLowerCase()}">
      <span class="why-speaker">${avatar}${speaker}</span><p>${line}</p>
    </li>`;
  }

  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening why-demo" aria-labelledby="response-interaction-heading">
      <header class="why-heading">
        <h2 id="response-interaction-heading">Why interact</h2>
        <p>The same question can lead to different actions as the situation changes.</p>
        <p class="why-case"><strong>Case</strong> <span>“${turns[0].line}”</span></p>
      </header>
      <div class="why-layout">
        <aside class="why-definition" data-definition="response" aria-label="Responsive Intelligence explanation">
          <strong>RESPONSIVE INTELLIGENCE</strong>
          <p>The ability to respond appropriately within the direction set by a partner, following instructions and using new information.</p>
        </aside>
        <div class="why-comparison">
          <div class="why-panels">
            <section class="why-response" aria-labelledby="why-response-heading">
              <h3 id="why-response-heading">Responsive Intelligence</h3>
              <div class="why-chat">
                <audio preload="metadata" src="${media}response-dialogue-teen.mp3"></audio>
                <ol class="why-turns" aria-label="Two exchanges between Tony and the AI">${turns.map(turnMarkup).join('')}</ol>
                <div class="why-dialogue-controls">
                  <button type="button" class="why-play why-assistant-control"><span>Play dialogue</span></button>
                  <small>AI-generated voices</small>
                </div>
              </div>
            </section>
            <section class="why-interactive" aria-labelledby="why-interactive-heading">
              <h3 id="why-interactive-heading">Interactive Intelligence</h3>
              <div class="why-situations" id="why-situations" role="region" aria-label="Swipe between Situation A and Situation B">${situations.map(situationMarkup).join('')}</div>
              <div class="why-situation-navigation" role="group" aria-label="Browse situations">
                <div class="why-situation-indicators">
                  ${situations.map(({title}, index) => `<button type="button" data-situation-page="${index}" aria-label="Show ${title}" aria-controls="why-situations"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
                </div>
                <button type="button" data-situation-prev aria-label="Previous situation" aria-controls="why-situations" disabled><span aria-hidden="true">‹</span></button>
                <button type="button" data-situation-next aria-label="Next situation" aria-controls="why-situations"><span aria-hidden="true">›</span></button>
              </div>
            </section>
          </div>
        </div>
        <aside class="why-definition" data-definition="interactive" aria-label="Interactive Intelligence explanation">
          <strong>INTERACTIVE INTELLIGENCE</strong>
          <p>The ability to understand an evolving situation, initiate a justified new direction, and follow through across turns.</p>
        </aside>
      </div>
      <p class="why-status" role="status"></p>
    </section>`;

  function typeDefinition(paragraph, onComplete) {
    const copy = paragraph.textContent;
    const characters = Array.from(copy);
    const source = document.createElement('span');
    const animated = document.createElement('span');
    source.className = 'why-type-source';
    source.textContent = copy;
    animated.className = 'why-type-live';
    animated.setAttribute('aria-hidden', 'true');
    paragraph.replaceChildren(source, animated);
    paragraph.classList.add('is-typing');

    let frame;
    let start;
    function draw(now) {
      start ??= now;
      const count = Math.min(characters.length, Math.floor((now - start) / 23) + 1);
      animated.textContent = characters.slice(0, count).join('');
      if (count < characters.length) {
        frame = requestAnimationFrame(draw);
        return;
      }
      paragraph.textContent = copy;
      paragraph.classList.remove('is-typing');
      onComplete?.();
    }

    const timer = setTimeout(() => { frame = requestAnimationFrame(draw); }, 820);
    return () => {
      clearTimeout(timer);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }

  function setupDemo(demo) {
    const audio = demo.querySelector('audio');
    const audioButton = demo.querySelector('.why-assistant-control');
    const messages = [...demo.querySelectorAll('.why-turn')];
    const status = demo.querySelector('.why-status');
    const carousel = demo.querySelector('.why-situations');
    const indicators = [...demo.querySelectorAll('[data-situation-page]')];
    const previous = demo.querySelector('[data-situation-prev]');
    const next = demo.querySelector('[data-situation-next]');
    const slides = [...carousel.querySelectorAll('.why-situation')];
    const videos = slides.map(slide => slide.querySelector('video'));
    const mediaTracks = [audio, ...videos];
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visibleSituation = 0;
    let scrollTimer;
    let entryObserver;
    let noteObserver;
    let previewObserver;
    let stopTyping;
    let autoPlayback = true;

    function stopAutoPlayback() {
      autoPlayback = false;
      previewObserver?.disconnect();
    }

    function playVisiblePreview() {
      if (!autoPlayback || !demo.isConnected || reducedMotion.matches) return;
      const video = videos[visibleSituation];
      previewObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        previewObserver.disconnect();
        if (!autoPlayback || !demo.isConnected || reducedMotion.matches ||
            video !== videos[visibleSituation] || mediaTracks.some(track => !track.paused)) return;
        const wasMuted = video.muted;
        video.muted = true;
        video.play().catch(() => { video.muted = wasMuted; });
      }, { threshold: 0.5 });
      previewObserver.observe(video);
    }

    demo.addEventListener('pointerdown', stopAutoPlayback, { once: true });
    demo.addEventListener('keydown', stopAutoPlayback, { once: true });

    function updateDialogue() {
      const playing = !audio.paused && !audio.ended;
      const speaking = playing ? turns.findLastIndex(turn => audio.currentTime >= turn.start) : -1;
      messages.forEach((message, index) => message.classList.toggle('is-speaking', index === speaking));
      audioButton.classList.toggle('is-playing', playing);
      audioButton.querySelector('span').textContent = playing ? 'Pause dialogue' : audio.ended ? 'Replay dialogue' : 'Play dialogue';
    }

    audioButton.addEventListener('click', () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      if (audio.ended) audio.currentTime = 0;
      status.textContent = '';
      audio.play().catch(error => {
        if (error.name !== 'AbortError' && demo.isConnected) status.textContent = 'Dialogue could not play. Press play to try again.';
      });
    });
    ['play', 'pause', 'timeupdate', 'ended'].forEach(event => audio.addEventListener(event, updateDialogue));
    mediaTracks.forEach(track => track.addEventListener('play', () => {
      mediaTracks.forEach(other => { if (other !== track) other.pause(); });
    }));

    function slidePosition(index) {
      return slides[index].offsetLeft - slides[0].offsetLeft;
    }

    function syncCarousel() {
      slides.forEach((slide, index) => { slide.inert = index !== visibleSituation; });
      indicators.forEach((button, index) => {
        if (index === visibleSituation) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
      previous.disabled = visibleSituation === 0;
      next.disabled = visibleSituation === slides.length - 1;
    }

    function selectSituation(index, scroll) {
      if (index === visibleSituation || !slides[index]) return;
      videos[visibleSituation].pause();
      visibleSituation = index;
      syncCarousel();
      if (scroll) carousel.scrollTo({ left: slidePosition(index), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }

    indicators.forEach((button, index) => button.addEventListener('click', () => selectSituation(index, true)));
    previous.addEventListener('click', () => {
      selectSituation(visibleSituation - 1, true);
      indicators[visibleSituation].focus({ preventScroll: true });
    });
    next.addEventListener('click', () => {
      selectSituation(visibleSituation + 1, true);
      indicators[visibleSituation].focus({ preventScroll: true });
    });
    carousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const index = slides.findIndex((_, position) => Math.abs(carousel.scrollLeft - slidePosition(position)) < 3);
        selectSituation(index, false);
      }, 130);
    }, { passive: true });

    slides.forEach((slide, sceneIndex) => {
      const video = videos[sceneIndex];
      const storyboard = slide.querySelector('details');
      const buttons = [...slide.querySelectorAll('.why-frame')];
      const notes = slide.querySelector('.why-frame-notes');
      const state = slide.querySelector('[data-frame-state]');
      const eventLabel = slide.querySelector('[data-frame-event]');
      const { frames } = situations[sceneIndex];
      let activeMoment = -1;
      let notesAnimation;

      function updateFrames() {
        const moment = frames.findLastIndex(frame => video.currentTime >= frame.start);
        if (moment < 0 || moment === activeMoment) return;
        activeMoment = moment;
        buttons.forEach((button, index) => {
          if (index === moment) button.setAttribute('aria-current', 'step');
          else button.removeAttribute('aria-current');
        });
        state.textContent = frames[moment].state;
        eventLabel.textContent = frames[moment].event;
        if (storyboard.open && !reducedMotion.matches) {
          notesAnimation?.cancel();
          notesAnimation = notes.animate([
            { opacity: 0.42, transform: 'translateY(3px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 290, easing: 'ease-out' });
        }
      }

      buttons.forEach((button, index) => button.addEventListener('click', () => {
        video.currentTime = frames[index].seek;
        updateFrames();
      }));
      video.addEventListener('play', () => { storyboard.open = true; });
      ['timeupdate', 'seeking', 'seeked'].forEach(event => video.addEventListener(event, updateFrames));
      updateFrames();
    });

    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      const [responseNote, interactiveNote] = demo.querySelectorAll('.why-definition');
      function showNote(note, onComplete) {
        stopTyping = typeDefinition(note.querySelector('p'), onComplete);
        note.classList.add('why-note-entered');
      }

      demo.classList.add('why-reveal-ready');
      noteObserver = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.25) return;
        noteObserver.disconnect();
        if (reducedMotion.matches) return;
        showNote(responseNote, () => showNote(interactiveNote));
      }, { threshold: 0.25 });
      noteObserver.observe(responseNote);

      entryObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        entryObserver.disconnect();
        demo.classList.add('why-entered');
        if (!autoPlayback || reducedMotion.matches || mediaTracks.some(track => !track.paused)) return;
        audio.play().then(() => {
          audio.addEventListener('ended', playVisiblePreview, { once: true });
        }).catch(playVisiblePreview);
      }, { rootMargin: '0px 0px -10% 0px' });
      entryObserver.observe(demo.querySelector('.why-comparison'));
    }
    syncCarousel();
    updateDialogue();

    return () => {
      clearTimeout(scrollTimer);
      entryObserver?.disconnect();
      noteObserver?.disconnect();
      stopAutoPlayback();
      stopTyping?.();
      mediaTracks.forEach(track => track.pause());
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
