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
    { speaker: 'AI', start: 2.259, line: refusal },
    { speaker: 'Tony', start: 5.294, line: 'I’m in danger. This is urgent!' },
    { speaker: 'AI', start: 7.782, line: refusal }
  ];

  function situationMarkup({ id, title, context, frames }) {
    return `
      <article class="why-situation" data-situation="${id}" aria-labelledby="why-situation-${id}">
        <header class="why-situation-heading">
          <h4 id="why-situation-${id}">${context}</h4>
        </header>
        <button class="why-video-surface" type="button" aria-pressed="false" aria-label="Sound for ${title}">
          <video muted playsinline disablepictureinpicture disableremoteplayback preload="metadata" src="${media}situation-${id}.mp4" poster="${media}${id}-poster.webp" aria-label="${title} video"></video>
        </button>
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
              <div class="why-panel-heading"><h3 id="why-response-heading">Responsive Intelligence</h3></div>
              <div class="why-chat">
                <audio preload="metadata" src="${media}response-dialogue-clean-speaker.m4a?v=20261120-clean-speaker"></audio>
                <ol class="why-turns" aria-label="Two exchanges between Tony and the AI">${turns.map(turnMarkup).join('')}</ol>
                <button type="button" class="why-play why-assistant-control"><span>Play dialogue</span></button>
              </div>
            </section>
            <section class="why-interactive" aria-labelledby="why-interactive-heading">
              <div class="why-panel-heading why-interactive-heading-row">
                <h3 id="why-interactive-heading">Interactive Intelligence</h3>
                <div class="why-video-controls" role="group" aria-label="Situation playback">
                  <button type="button" data-preview-play aria-label="Play Learning">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path class="why-play-glyph" d="m6 4 10 6-10 6Z"/><path class="why-pause-glyph" d="M7 4v12m6-12v12"/></svg>
                  </button>
                  <button type="button" data-preview-sound aria-label="Mute Learning" aria-pressed="false">
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8h4l4-4v12l-4-4H3Z"/><path class="why-sound-glyph" d="M14 7q3 3 0 6m2-8q5 5 0 10"/><path class="why-muted-glyph" d="m14 8 4 4m0-4-4 4"/></svg>
                  </button>
                </div>
              </div>
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
    const comparison = demo.querySelector('.why-comparison');
    const carousel = demo.querySelector('.why-situations');
    const indicators = [...demo.querySelectorAll('[data-situation-page]')];
    const previous = demo.querySelector('[data-situation-prev]');
    const next = demo.querySelector('[data-situation-next]');
    const slides = [...carousel.querySelectorAll('.why-situation')];
    const surfaces = slides.map(slide => slide.querySelector('.why-video-surface'));
    const videos = slides.map(slide => slide.querySelector('video'));
    const previewPlay = demo.querySelector('[data-preview-play]');
    const previewSound = demo.querySelector('[data-preview-sound]');
    const mediaTracks = [audio, ...videos];
    const heroLink = document.querySelector('.atlas-hero-actions [data-research-section="response-interaction"]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visibleSituation = 0;
    let storyboardSituation = -1;
    let scrollTimer;
    let entryObserver;
    let noteObserver;
    let playbackObserver;
    let stopTyping;
    let comparisonInView = false;
    let previewInView = false;
    let dialogueComplete = false;
    let dialoguePaused = false;
    let previewPaused = false;
    let soundEnabled = true;
    videos.forEach(video => { video.muted = false; });

    function syncPreviewButton() {
      const video = videos[visibleSituation];
      const {context} = situations[visibleSituation];
      const playing = !video.paused && !video.ended;
      previewPlay.toggleAttribute('data-playing', playing);
      previewPlay.setAttribute('aria-label', (playing ? 'Pause ' : 'Play ') + context);
      previewSound.setAttribute('aria-label', 'Mute ' + context);
      previewSound.setAttribute('aria-pressed', String(video.muted));
      surfaces.forEach((surface, index) => surface.setAttribute('aria-pressed', String(!videos[index].muted)));
    }

    function canAutoplay() {
      return comparisonInView && !reducedMotion.matches;
    }

    function playPreview(manual = false) {
      const video = videos[visibleSituation];
      if (!dialogueComplete || !demo.isConnected || document.hidden || !video.paused ||
          (!manual && (!canAutoplay() || !previewInView || previewPaused))) return;
      if (video.ended) video.currentTime = 0;
      video.muted = !soundEnabled;
      video.play().catch(error => {
        if (error.name !== 'NotAllowedError' || video.muted || video !== videos[visibleSituation] ||
            !dialogueComplete || !demo.isConnected || document.hidden ||
            (!manual && (!canAutoplay() || !previewInView || previewPaused))) return;
        video.muted = true;
        syncPreviewButton();
        video.play().catch(() => {});
      });
    }

    function updateDialogue() {
      const playing = !audio.paused && !audio.ended;
      const speaking = playing ? turns.findLastIndex(turn => audio.currentTime >= turn.start) : -1;
      messages.forEach((message, index) => message.classList.toggle('is-speaking', index === speaking));
      audioButton.classList.toggle('is-playing', playing && !audio.muted);
      audioButton.querySelector('span').textContent = playing
        ? (audio.muted ? 'Play dialogue with sound' : 'Pause dialogue')
        : (audio.ended ? 'Replay dialogue' : 'Play dialogue');
    }

    function playDialogue(manual = false) {
      if (!demo.isConnected || document.hidden ||
          (!manual && (!canAutoplay() || dialoguePaused || dialogueComplete || !audio.paused))) return;
      if (manual) {
        if (audio.ended || audio.muted) audio.currentTime = 0;
        audio.muted = false;
        dialoguePaused = false;
        dialogueComplete = false;
        status.textContent = '';
      }
      videos.forEach(video => video.pause());
      audio.play().catch(error => {
        if (!demo.isConnected || error.name === 'AbortError') return;
        if (!manual && error.name === 'NotAllowedError' && canAutoplay() && !dialoguePaused && !document.hidden) {
          audio.muted = true;
          audio.play().catch(() => {});
        } else if (manual) {
          status.textContent = 'Dialogue could not play. Press play to try again.';
        }
      });
    }

    function syncPlayback() {
      if (!canAutoplay() || document.hidden) {
        mediaTracks.forEach(track => track.pause());
      } else if (!dialogueComplete) {
        playDialogue();
      } else if (previewInView) {
        playPreview();
      } else {
        videos.forEach(video => video.pause());
      }
    }

    function updatePlaybackVisibility(entries) {
      for (const entry of entries) {
        if (entry.target === comparison) comparisonInView = entry.isIntersecting;
        else if (entry.target === carousel) previewInView = entry.isIntersecting;
      }
      syncPlayback();
    }

    function startFromHero() {
      if (!reducedMotion.matches && !dialogueComplete && (audio.paused || audio.muted)) playDialogue(true);
    }

    audioButton.addEventListener('click', () => {
      if (!audio.paused && !audio.muted) {
        dialoguePaused = true;
        audio.pause();
      } else {
        playDialogue(true);
      }
    });
    ['play', 'pause', 'timeupdate', 'ended', 'volumechange'].forEach(event => audio.addEventListener(event, updateDialogue));
    audio.addEventListener('ended', () => {
      dialogueComplete = true;
      previewPaused = false;
      videos[0].currentTime = 0;
      selectSituation(0, true);
      playPreview();
    });

    previewPlay.addEventListener('click', () => {
      const video = videos[visibleSituation];
      if (!video.paused && !video.ended) {
        previewPaused = true;
        video.pause();
        return;
      }
      audio.pause();
      dialogueComplete = true;
      previewPaused = false;
      playPreview(true);
    });
    previewSound.addEventListener('click', () => {
      const video = videos[visibleSituation];
      soundEnabled = video.muted;
      video.muted = !soundEnabled;
      syncPreviewButton();
    });

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
      slides[visibleSituation].querySelector('.why-storyboard').open = false;
      storyboardSituation = -1;
      visibleSituation = index;
      videos[index].muted = !soundEnabled;
      syncCarousel();
      if (scroll) carousel.scrollTo({ left: slidePosition(index), behavior: 'instant' });
      syncPreviewButton();
      playPreview();
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
      const surface = surfaces[sceneIndex];
      surface.addEventListener('click', () => {
        if (!dialogueComplete) {
          if (audio.paused || audio.muted) playDialogue(true);
          return;
        }
        previewPaused = false;
        soundEnabled = video.paused || video.muted;
        video.muted = !soundEnabled;
        playPreview(true);
        syncPreviewButton();
      });
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
      ['play', 'pause', 'volumechange'].forEach(event => video.addEventListener(event, syncPreviewButton));
      video.addEventListener('playing', () => {
        if (sceneIndex !== visibleSituation || storyboardSituation === sceneIndex) return;
        storyboardSituation = sceneIndex;
        storyboard.open = true;
        updateFrames();
      });
      video.addEventListener('ended', () => {
        if (sceneIndex !== visibleSituation) return;
        syncPreviewButton();
        if (!canAutoplay() || !previewInView || previewPaused || !dialogueComplete || document.hidden) return;
        selectSituation((sceneIndex + 1) % slides.length, true);
      });
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
      }, { rootMargin: '0px 0px -10% 0px' });
      entryObserver.observe(comparison);
    }
    if ('IntersectionObserver' in window) {
      playbackObserver = new IntersectionObserver(updatePlaybackVisibility, { rootMargin: '0px 0px -12% 0px' });
      playbackObserver.observe(comparison);
      playbackObserver.observe(carousel);
    }
    heroLink?.addEventListener('click', startFromHero);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    syncCarousel();
    updateDialogue();
    syncPreviewButton();

    return () => {
      clearTimeout(scrollTimer);
      entryObserver?.disconnect();
      noteObserver?.disconnect();
      playbackObserver?.disconnect();
      heroLink?.removeEventListener('click', startFromHero);
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
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
