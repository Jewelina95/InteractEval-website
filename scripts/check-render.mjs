import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const context = vm.createContext({
  document: {
    addEventListener() {},
    currentScript: { src: 'https://worldeology.com/InteractNet/why-interaction.js' },
    body: { hasAttribute: () => false }
  },
  window: { interactNetTheory: { render: () => '<section id="theoretical-framework"></section>' } },
  location: { hash: '' },
  URL, URLSearchParams,
  safe: value => String(value),
  atlasHero: () => '<header id="main-hero"></header>',
  coreFindings: () => '<section id="key-findings"></section>',
  mainComparisonPanel: () => '<p>Selected comparison</p>'
});
const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
vm.runInContext(read('why-interaction.js'), context);
context.interactionFigure = kind => {
  return kind === 'motivation' ? context.window.whyInteractionFigure() : '<section id="system-overview"></section>';
};
const source = read('results-explorer.js');
const start = source.indexOf('function resultsHomeV2()');
const end = source.indexOf('function comparisonDataTable(', start);
vm.runInContext(source.slice(source.indexOf('const mainComparisonGroups='), source.indexOf('const leaderboardGroups=')), context);
vm.runInContext(source.slice(source.indexOf('function resultResources('), source.indexOf('function capabilityMatrix(')), context);
vm.runInContext(source.slice(start, end), context);

const home = vm.runInContext('resultsHomeV2()', context);
const order = ['id="main-hero"', 'id="response-interaction"', 'id="why-response-heading"', 'id="why-situation-a"', 'id="why-situation-b"', 'data-definition="interactive"', 'id="theoretical-framework"', 'id="key-findings"', 'id="system-overview"', 'id="resources"'];
assert.ok(order.every(id => home.includes(id)));
for (let i = 1; i < order.length; i++) assert.ok(home.indexOf(order[i - 1]) < home.indexOf(order[i]), order[i]);
assert.doesNotMatch(home, /main-results-rail|figure1-field-aligned|why-teardown/);
assert.match(home, /<details id="comparisons" class="why-resources"\s*>/);
assert.match(home, /aria-label="Full demo progress"/);
assert.equal((home.match(/class="why-frame"/g) || []).length, 6);

for (const [, path] of home.matchAll(/(?:src|poster)="https:\/\/worldeology\.com\/InteractNet\/(assets\/why-interact\/[^"]+)"/g)) {
  assert.ok(fs.statSync(new URL('../' + path, import.meta.url)).size > 0, path);
}

for (const [hash, group, measure] of [
  ['#comparisons?measure=stage-profile', 'stages', 'stage-profile'],
  ['#comparisons?measure=information', 'scenarios', 'information'],
  ['#comparisons?measure=pairings', 'partners', 'pairings'],
  ['#coverage', 'setup', 'scenario-coverage']
]) {
  context.location.hash = hash;
  const result = vm.runInContext('resultsHomeV2()', context);
  assert.match(result, /<details id="comparisons" class="why-resources" open>/);
  assert.equal(vm.runInContext('mainComparisonGroup', context), group);
  assert.equal(vm.runInContext('mainComparisonMeasure', context), measure);
}
console.log('Main renders both videos and the chat dialogue, six timeline frames, definitions, findings, and the vertical resource links. Direct comparison links still open the selected measure.');
