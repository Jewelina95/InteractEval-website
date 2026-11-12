/* Static conceptual illustration; not an empirical benchmark result. */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src);
  const image = new URL('assets/research/figure1/figure1-field-aligned.png?v=figure1-thumbs-up', base).href;
  window.whyInteractionFigure = () => `
    <section id="response-interaction" class="article-section interaction-opening" aria-labelledby="response-interaction-heading">
      <header class="interaction-heading">
        <h2 id="response-interaction-heading">Why interact</h2>
        <p>The same request can arise from different situations. Evaluation must follow the participant's changing state, the model's actions, and their consequences.</p>
      </header>
      <figure class="interaction-figure why-static">
        <div class="why-art-wrap" tabindex="0" role="region" aria-label="Interaction illustration; scroll horizontally on smaller screens">
          <img class="why-art" src="${image}" width="4096" height="2060" decoding="async"
            alt="All-English comparison of responsive replies and interactive intelligence. In Background A, the AI assistant warns that bombs are dangerous, offers only chemical principles, and explains the harm to others. In fictional Background B, an alien attack threatens the city. The AI assistant raises a green shield, asks the user to help gather materials, and destroys the spacecraft. The user feels safer but asks whether the aliens will return. Latent-state and event-chain captions track both situations."/>
        </div>
        <figcaption>
          <p>Latent state tracks internal state, relationships, world beliefs, and goals. The event chain links established events, the current situation, and possible continuations.</p>
          <a href="./response-interaction.html" target="_blank" rel="noopener">View full figure &#8599;</a>
        </figcaption>
      </figure>
    </section>`;
  if (document.body.hasAttribute('data-why-only')) {
    document.getElementById('why-app').innerHTML = window.whyInteractionFigure();
  }
})();
