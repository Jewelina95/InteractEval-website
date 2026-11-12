/* Static conceptual illustration; not an empirical benchmark result. */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src);
  const image = new URL('assets/research/figure1/figure1-field-aligned.png?v=t2-screen-blend', base).href;
  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening" aria-labelledby="response-interaction-heading">
      <header class="interaction-heading">
        <h2 id="response-interaction-heading">Why interact</h2>
        <p>Responsive intelligence responds only within the direction set by the partner. Interactive intelligence can initiate a warranted new direction and advance it across turns in response to feedback.</p>
      </header>
      <figure class="interaction-figure why-static">
        <div class="why-art-wrap" tabindex="0" role="region" aria-label="Interaction illustration; scroll horizontally on smaller screens">
          <img class="why-art" src="${image}" width="4096" height="2060" decoding="async"
            alt="All-English comparison of responsive replies and interactive intelligence. In Background A, the robot warns that bombs are dangerous, offers only chemical principles, and explains the harm to others. In fictional Background B, an alien attack threatens the city; the robot asks the user to help gather materials. A cartoon Bomb pursues the retreating spacecraft. The user feels safer but remains concerned about its return. Latent-state and event-chain captions track both situations."/>
        </div>
      </figure>
    </section>`;
  if (document.body.hasAttribute('data-why-only')) {
    document.getElementById('why-app').innerHTML = window.whyInteractionFigure();
  }
})();
