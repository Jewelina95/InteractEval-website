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
context.document.body.dataset = {};
vm.runInContext(read('interaction-figures.js'), context);
const source = read('results-explorer.js');
const start = source.indexOf('function resultsHomeV2()');
const end = source.indexOf('function comparisonDataTable(', start);
vm.runInContext(source.slice(source.indexOf('const representationMeasures='), source.indexOf('const leaderboardGroups=')), context);
vm.runInContext(source.slice(source.indexOf('function resultResources('), source.indexOf('function capabilityMatrix(')), context);
vm.runInContext(source.slice(start, end), context);

const home = vm.runInContext('resultsHomeV2()', context);
const order = ['id="main-hero"', 'id="response-interaction"', 'data-definition="response"', 'class="why-comparison"', 'id="why-response-heading"', 'id="why-interactive-heading"', 'id="why-situation-a"', 'id="why-situation-b"', 'data-definition="interactive"', 'id="theoretical-framework"', 'id="key-findings"', 'id="system-overview"', 'id="evaluation-diagram"', 'id="method-why-heading"', 'id="resources"'];
assert.ok(order.every(id => home.includes(id)));
for (let i = 1; i < order.length; i++) assert.ok(home.indexOf(order[i - 1]) < home.indexOf(order[i]), order[i]);
assert.doesNotMatch(home, /main-results-rail|figure1-field-aligned|why-teardown|home-destinations|href="[^"]*(?:research\.html|showcase\.html|#leaderboards)/);
assert.doesNotMatch(home, /class="method-steps?"/);
assert.match(home, /<figure id="evaluation-diagram" class="method-diagram"/);
assert.ok(home.indexOf('id="system-overview-heading"') < home.indexOf('id="evaluation-diagram"'));
assert.match(home, /href="[^"]*interactnet-pipeline-v168\.svg/);
assert.match(home, /src="[^"]*interactnet-world-architecture-v168\.svg/);
assert.doesNotMatch(home, /interactnet-pipeline-v168-black-gold/);
assert.match(home, /<div id="comparisons" data-initial-topic="main-results"/);
assert.doesNotMatch(home, /result-carousel|result-library/);
assert.doesNotMatch(home, /§|04 · Experiments|05 · Discussion/);
assert.doesNotMatch(home, /Full demo progress|Play full demo/);
assert.equal((home.match(/class="why-frame"/g) || []).length, 6);

for (const [, path] of home.matchAll(/(?:src|poster)="https:\/\/worldeology\.com\/InteractNet\/(assets\/why-interact\/[^"]+)"/g)) {
  assert.ok(fs.statSync(new URL('../' + path, import.meta.url)).size > 0, path);
}

for (const [hash, group, measure, topic] of [
  ['#comparisons?measure=stage-profile', 'stages', 'stage-profile', 'main-results'],
  ['#comparisons?measure=information', 'scenarios', 'information', 'scenarios'],
  ['#comparisons?measure=pairings', 'partners', 'pairings', 'participants'],
  ['#coverage', 'setup', 'scenario-coverage', 'main-results'],
  ['#multi-party', 'partners', 'group-size', 'participants'],
  ['#representations', 'reliability', 'role-probes', 'robustness'],
  ['#creativity', 'creativity', 'creative-breakthroughs', 'creativity']
]) {
  context.location.hash = hash;
  const result = vm.runInContext('resultsHomeV2()', context);
  assert.ok(result.includes('id="comparisons" data-initial-topic="' + topic + '"'));
  assert.equal(vm.runInContext('mainComparisonGroup', context), group);
  assert.equal(vm.runInContext('mainComparisonMeasure', context), measure);
}
console.log('Main renders both videos and the chat dialogue, six timeline frames, definitions, findings, the focused architecture, and its transition to results. Direct comparison links still open the selected measure.');
