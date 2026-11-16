'use strict';

(() => {
  const motion = matchMedia('(min-width: 851px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)');
  const clamp = value => Math.min(1, Math.max(0, value));
  const ramp = (progress, start, end) => clamp((progress - start) / (end - start));
  const ease = value => 1 - (1 - value) ** 2;

  let story, stage, content, heading, rows, frame;
  const resizeObserver = new ResizeObserver(schedule);

  function paint() {
    frame = 0;
    if (!story?.isConnected) return;

    // Keep everything in normal document flow whenever it cannot fit in one view.
    const viewport = document.documentElement.clientHeight;
    const style = getComputedStyle(stage);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const pinned = motion.matches && content.offsetHeight + padding <= viewport;
    story.classList.toggle('is-pinned', pinned);
    if (!pinned) {
      stage.removeAttribute('style');
      return;
    }

    const rect = story.getBoundingClientRect();
    const progress = clamp(-rect.top / Math.max(1, rect.height - stage.offsetHeight));
    const spread = ease(ramp(progress, 0, .48));
    const light = ramp(progress, .04, .44);
    stage.style.setProperty('--board-x', `${32 * (1 - spread)}%`);
    stage.style.setProperty('--board-y', `${32 * (1 - spread)}%`);
    stage.style.setProperty('--board-radius', `${28 * (1 - spread)}px`);
    stage.style.setProperty('--board-edge', .11 * (1 - spread));
    stage.style.setProperty('--board-gray', ease(ramp(progress, .13, .54)));
    stage.style.setProperty('--board-glint', .52 * Math.sin(light * Math.PI));
    stage.style.setProperty('--board-glint-x', `${(2 * light - 1) * 82}%`);
    heading.style.setProperty('--board-reveal', ease(ramp(progress, .20, .40)));
    rows.forEach((row, index) => {
      const start = .32 + index * .065;
      const reveal = ease(ramp(progress, start, start + .20));
      row.style.setProperty('--board-reveal', reveal);
      row.classList.toggle('is-readable', reveal >= .9);
    });
  }

  function schedule() {
    if (story?.isConnected && !frame) frame = requestAnimationFrame(paint);
  }

  function setup() {
    resizeObserver.disconnect();
    story = document.querySelector('.findings-story');
    if (!story) return;
    stage = story.querySelector('.findings-story-stage');
    content = story.querySelector('.findings-story-content');
    heading = content.querySelector('h2');
    rows = [...content.querySelectorAll('.finding-row')];
    resizeObserver.observe(content);
    paint();
  }

  window.interactNetFindingsStory = { setup };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
})();
