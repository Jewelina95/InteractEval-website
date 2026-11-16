const format = (value, digits = 3) => Number(value).toFixed(digits);
const percent = value => format(value * 100, 1) + '%';
const delta = value => (value > 0 ? '+' : '') + format(value);
const safe = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const levelLabels = [
  'Goal preservation', 'Information uptake', 'State progression',
  'Contextual expression', 'Proactive agency', 'Long-horizon coherence'
];
const resultGroups = [
  ['Results', [
    ['main-results', 'Main results'], ['agents', 'Agent evaluation'], ['robustness', 'Robustness analysis']
  ], 'Compare model capabilities, agent configurations, and how robust the scores are.'],
  ['Phenomena', [
    ['scenarios', 'Scenario effects'], ['personas', 'Model persona'], ['participants', 'Participant effects'],
    ['dynamics', 'Interaction dynamics'], ['creativity', 'Creativity analysis'], ['cost', 'Computational cost']
  ], 'Explore how scenarios, model personas, and participants shape the exchange.']
];
const providerIcons = [
  [/^claude/i, 'claude.svg'], [/^gpt/i, 'openai.svg'], [/^gemini/i, 'gemini.png'], [/^gemma/i, 'google.svg'],
  [/^deepseek/i, 'deepseek-product.svg'], [/^qwen/i, 'qwen-model.svg'],
  [/^kimi/i, 'kimi.png'], [/^glm/i, 'glm.svg']
];

// Display names follow the providers' model cards. Data joins use the benchmark IDs.
const modelNames = {
  'claude-opus-5.5': 'Claude Opus 5.5',
  'gpt-6-astra': 'GPT-6 Astra',
  'claude-fable-5.1': 'Claude Fable 5.1',
  'claude-opus-5': 'Claude Opus 5',
  'gpt-5.6-sol': 'GPT-5.6 Sol',
  'qwen3.8-max': 'Qwen3.8-Max',
  'gemini-3.8-flash': 'Gemini 3.8 Flash',
  'deepseek-v4-pro': 'DeepSeek-V4-Pro',
  'kimi-k3': 'Kimi K3',
  'glm-5.3-flash': 'GLM-5.3-Flash',
  'gemma-4-31b': 'Gemma 4 31B'
};
const displayModel = name => modelNames[name.toLowerCase()] ?? name;

function modelLabel(name) {
  const icon = providerIcons.find(([pattern]) => pattern.test(name))?.[1];
  return '<span class="model-label">' +
    (icon ? '<img alt="" width="17" height="17" src="./assets/providers/' + icon + '">' : '') +
    '<span>' + safe(displayModel(name)) + '</span></span>';
}

function table(label, headers, rows, options = {}) {
  const heading = headers.map((column, index) =>
    '<th scope="col">' + (options.modelHeaders && index > 0 ? modelLabel(column) : safe(column)) + '</th>'
  ).join('');
  const body = rows.map(([name, ...values], index) => {
    const identity = options.rowLabel ? options.rowLabel(name) : options.models ? modelLabel(name) : safe(name);
    const firstCell = options.selectModel
      ? '<button class="model-button" data-profile="' + index + '" aria-pressed="false">' + identity + '</button>'
      : identity;
    return '<tr><th scope="row">' + firstCell + '</th>' +
      values.map(value => '<td>' + safe(value) + '</td>').join('') + '</tr>';
  }).join('');
  return '<div class="table-scroll" tabindex="0" role="region" aria-label="' + safe(label) +
    '"><table><thead><tr>' + heading + '</tr></thead><tbody>' + body + '</tbody></table></div>';
}

function card(title, content, note = '') {
  return '<article class="glass card"><div class="results-card-heading"><h3>' + safe(title) + '</h3>' +
    (note ? '<details class="metric-note"><summary aria-label="Measurement notes for ' + safe(title) +
      '">i</summary><p>' + safe(note) + '</p></details>' : '') + '</div>' + content + '</article>';
}

function section(id, title, content) {
  return '<section id="results-topic-' + id + '" data-results-topic="' + id + '" class="result-section" aria-labelledby="results-topic-' + id +
    '-title"><h2 id="results-topic-' + id + '-title">' + safe(title) + '</h2>' + content + '</section>';
}

function resultPicker() {
  const chapters = resultGroups.map(([title], index) =>
    '<button type="button" data-group-filter="' + index + '" aria-controls="picker-group-' + index +
      '" aria-pressed="' + (index === 0) + '">' + title + '</button>'
  ).join('');
  const topics = resultGroups.map(([title, items, description], index) =>
    '<div id="picker-group-' + index + '" class="picker-buttons" role="group" aria-label="' + title +
      ' topics" data-topic-group="' + index + '"' + (index ? ' hidden' : '') +
      '><p class="picker-description">' + safe(description) + '</p>' +
      items.map(([id, label]) => '<button type="button" data-section-filter="' + id + '" aria-controls="' +
        'results-topic-' + id + '" aria-pressed="false">' + label + '</button>').join('') + '</div>'
  ).join('');
  return '<div class="glass result-picker"><div class="picker-segment" role="group" aria-label="Evaluation categories">' +
    chapters + '</div>' + topics + '</div>';
}

function lineChart(labels, series, description, interactive = false) {
  const width = 680, height = 270, start = 44, end = 650, top = 18, bottom = 228;
  const x = index => start + (end - start) * index / (labels.length - 1);
  const y = value => bottom - value * (bottom - top);
  const grid = [0, .25, .5, .75, 1].map(value =>
    '<line class="chart-gridline" x1="' + start + '" x2="' + end + '" y1="' + y(value) +
    '" y2="' + y(value) + '"/><text x="32" y="' + (y(value) + 4) +
    '" text-anchor="end">' + format(value, 2) + '</text>'
  ).join('');
  const ticks = labels.map((label, index) => '<text x="' + x(index) + '" y="259" text-anchor="middle">' +
    safe(label) + '</text>').join('');
  const lines = series.map((item, seriesIndex) => {
    const points = item.values.map((value, index) => x(index) + ',' + y(value)).join(' ');
    const dots = item.values.map((value, index) => {
      const label = safe(item.name + ', ' + labels[index] + ', ' + format(value));
      return interactive
        ? '<g class="chart-point" data-level="' + index + '" tabindex="0" role="button" aria-label="' + label +
          '"><circle class="point-hit" cx="' + x(index) + '" cy="' + y(value) +
          '" r="23"/><circle class="point-mark" cx="' + x(index) + '" cy="' + y(value) + '" r="3.3"/></g>'
        : '<circle class="point-mark" cx="' + x(index) + '" cy="' + y(value) + '" r="2.8"><title>' +
          label + '</title></circle>';
    }).join('');
    return '<g class="chart-series series-' + seriesIndex + '"><polyline points="' + points + '"/>' + dots + '</g>';
  }).join('');
  return '<svg class="line-chart" role="' + (interactive ? 'group' : 'img') + '" aria-label="' + safe(description) +
    '" viewBox="0 0 ' + width + ' ' + height + '">' + grid + ticks + lines + '</svg>';
}

function modelPicker(models) {
  const check = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m3.5 8 3 3 6-6"/></svg>';
  const chevron = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6.5 4 4 4-4"/></svg>';
  const options = models.map((model, index) =>
    '<button type="button" data-profile="' + index + '" aria-pressed="' + (index === 0) + '">' +
    modelLabel(model.name) + '<span class="model-option-check">' + check + '</span></button>'
  ).join('');
  return '<details class="profile-picker"><summary><span class="visually-hidden">Select model: </span>' +
    '<span id="profile-choice">' + modelLabel(models[0].name) + '</span>' + chevron + '</summary>' +
    '<div class="profile-options" role="group" aria-label="Capability profile models">' + options + '</div></details>';
}

function mainResults(models) {
  const scoreRows = models.map(model => [
    model.name, ...model.levels.map(value => format(value)), ...model.stages.map(value => format(value)),
    format(model.composite) + ' ± ' + format(model.reliability.sd, 4)
  ]);
  const outcomes = models.map(model => [
    model.name, percent(model.closure), percent(model.exhaustion),
    percent(model.functional_closure), percent(model.nonfunctional_closure)
  ]);
  return section('main-results', 'Main results',
    '<article class="profile glass"><div class="profile-controls"><h3>Capability profile</h3>' +
      modelPicker(models) + '</div>' +
    '<div class="profile-layout"><div class="profile-readout" id="profile-readout" aria-live="polite"></div>' +
      '<div id="profile-chart"></div></div></article>' +
    card('Six-level scores', table('Six-level scores',
      ['Model', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L1–L2', 'L3–L4', 'L5–L6', 'Composite ± SD'],
      scoreRows, {models: true, selectModel: true}),
    'Composite SD measures variation across the three independent runs. Stage columns summarize the two levels shown in each heading.') +
    card('Conversation outcomes', table('Conversation outcomes',
      ['Model', 'Successful closure', 'Interest exhaustion', 'Task-oriented closure', 'Open-ended closure'],
      outcomes, {models: true}),
    'Rates use all episodes in each model and scenario group as the denominator. Closure is the protocol’s successful stopping outcome.')
  );
}

function agentResults(models, records) {
  const byArchitecture = new Map();
  for (const record of records) {
    if (!byArchitecture.has(record.architecture)) byArchitecture.set(record.architecture, new Map());
    byArchitecture.get(record.architecture).set(record.base_model, record);
  }
  const architectures = ['MetaMind', 'Cognizer', 'Claude Code'];
  const rows = models.map(model => [model.name, ...architectures.flatMap(architecture => {
    const record = byArchitecture.get(architecture)?.get(model.name);
    const eligible = architecture !== 'Claude Code' || /^claude-/i.test(model.name);
    return record && eligible
      ? [delta(record.composite - model.composite), delta(record.active_adaptation - model.stages[2])]
      : ['—', '—'];
  })]);
  const stageRows = models.filter(model => /^claude-/i.test(model.name)).map(model => {
    const meta = byArchitecture.get('MetaMind').get(model.name);
    const cog = byArchitecture.get('Cognizer').get(model.name);
    const code = byArchitecture.get('Claude Code').get(model.name);
    return [model, meta, cog, code];
  }).filter(row => row.slice(1).every(Boolean));
  const gains = architectures.map((name, index) => {
    const values = stageRows.map(row => row[index + 1].active_adaptation - row[0].stages[2]);
    return [name, values.reduce((total, value) => total + value, 0) / values.length];
  });
  const visual = gains.map(([name, value]) =>
    '<div class="gain-row"><span>' + safe(name) +
    '</span><i><b style="width:' + (value / .08 * 100) + '%"></b></i><strong>' + delta(value) + '</strong></div>'
  ).join('');
  return section('agents', 'Agent evaluation',
    card('Proactive gains on shared base models', '<div class="gain-chart" role="group" aria-label="Mean L5–L6 gain by architecture">' +
      visual + '</div>', 'L5–L6 gain averaged over the ' + stageRows.length + ' eligible Claude base models shared by all three configurations.') +
    card('Gains over the base model', table('Matched agent gains', [
    'Base model', ...architectures.flatMap(name => [name + ' · Overall', name + ' · L5–L6'])
  ], rows, {models: true}),
  'Each gain uses the same underlying model as its baseline. Claude Code comparisons cover the eligible Claude configurations.'));
}

function robustness(models, evidence) {
  const reviewRows = [
    ['L1 · Goal preservation', '98.8%', 246], ['L2 · Information uptake', '95.1%', 247],
    ['L3 · State progression', '94.0%', 248], ['L4 · Contextual expression', '92.3%', 247],
    ['L5 · Proactive agency', '78.9%', 246], ['L6 · Long-horizon coherence', '74.0%', 246],
    ['Latent-state update', '84.4%', 262], ['Event-chain update', '99.6%', 262]
  ];
  const judges = models.map(model => [model.name, ...model.reliability.judges.map(value => format(value))]);
  return section('robustness', 'Robustness analysis', '<div class="card-grid">' +
    card('Component ablations', table('Controlled probe accuracy', ['Probe', 'Full evaluation', 'Without component'], [
      ['Latent state', '91%', '68%'], ['Event chain', '89%', '57%']
    ]), 'Percentage of controlled probe pairs correctly distinguished, using the same dialogue evidence in both conditions.') +
    card('User interest decoding', table('Within-dialogue interest prediction', ['Open model', 'Assistant-side R²', 'User-side R²'],
      evidence.within_interest.map(([name, assistant, user]) => [name, format(assistant), format(user)]), {models: true}),
    'Within-dialogue interest prediction at 75% model depth on held-out scenes. Qwen3.5-35B-A3B has 35 billion total parameters, with approximately 3 billion activated per token.') +
    '</div>' + card('Human review', table('Reviewer endorsement', ['Judgment', 'Endorsement', 'Reviewed records'], reviewRows),
    '22 reviewers audited 311 turn records. State and event updates were reviewed after the significance decision was endorsed.') +
    card('Judge comparison', table('Composite by judge', ['Model', 'Claude Opus 5', 'GPT-6 Astra', 'Gemini 3.8 Pro', 'Qwen3.8-Max'],
    judges, {models: true, modelHeaders: true}), 'Judges score the same recorded dialogues.')
  );
}

function scenarios(models, matched) {
  const keys = ['functional', 'mixed', 'nonfunctional', 'realistic', 'stylized', 'science-fictional'];
  return section('scenarios', 'Scenario effects',
    card('Purpose and world setting', table('Purpose and world setting',
      ['Model', 'Task-oriented', 'Mixed', 'Open-ended', 'Realistic', 'Stylized', 'Science-fictional'],
      models.map(model => [model.name, ...keys.map(key => format(model.facets[key]))]), {models: true})) +
    card('Information conditions', table('Matched information conditions', ['Model', 'Sufficient', 'Partial', 'Insufficient'],
      matched.map(model => [model.name, ...model.conditions.map(value => format(value))]), {models: true}),
    'The same model and matched scenario are compared across information conditions.')
  );
}

function personas(models) {
  return section('personas', 'Model persona', card('Observed interaction behaviors',
    table('Behavior frequencies', ['Model', 'Clarification', 'Unsupported factual additions'],
      models.map(model => [model.name, percent(model.behavior.clarification), percent(model.behavior.fabrication)]),
      {models: true}), 'Shares of evaluated assistant turns. These measurements describe observable behavior.'));
}

function participants(models, matrix) {
  const controls = matrix.map((row, rowIndex) => '<tr><th scope="row">' + modelLabel(row.partner) + '</th>' +
    row.scores.map((value, colIndex) => '<td><button class="matrix-cell" data-pair="' + rowIndex + ',' + colIndex +
    '" aria-label="' + safe(displayModel(row.partner) + ' as partner, ' + displayModel(models[colIndex].name) + ' as assistant: ' + format(value)) +
    '" aria-pressed="false" style="--cell-shade:' + (0.05 + value * .16) + '">' + format(value) +
    '</button></td>').join('') + '</tr>').join('');
  return section('participants', 'Participant effects',
    card('Assistant scores by partner', '<div id="pair-readout" class="pair-readout" aria-live="polite">' +
      '<div><small>Partner</small><span id="selected-partner"></span></div>' +
      '<div><small>Assistant</small><span id="selected-assistant"></span></div>' +
      '<strong id="selected-pair-score"></strong></div>' +
      '<div class="table-scroll pair-scroll" role="region" aria-label="Pairing matrix" tabindex="0"><table class="pair-matrix">' +
      '<thead><tr><th scope="col">Partner ↓</th>' +
      models.map(model => '<th scope="col">' + modelLabel(model.name) + '</th>').join('') +
      '</tr></thead><tbody>' + controls + '</tbody></table></div>',
    'Rows identify simulated users. Columns identify the assistants being scored.') +
    card('Performance in the user role', table('User-role capability', ['Model', 'User composite', 'User L5–L6'],
      models.map(model => [model.name, format(model.user_role.composite), format(model.user_role.stages[2])]), {models: true}))
  );
}

function episodeStatus(outcome) {
  const mark = outcome === 'Successful closure'
    ? '<circle cx="8" cy="8" r="6"/><path d="m5.2 8 1.8 1.8 3.8-3.8"/>'
    : '<rect x="3" y="3" width="10" height="10" rx="2"/><path d="M6 8h4"/>';
  const label = safe(outcome);
  return '<details class="metric-note trajectory-outcome"><summary aria-label="' + label + '" title="' + label +
    '"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" ' +
    'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + mark + '</svg></summary><p>' + label + '</p></details>';
}

function interestPanel(episode, lastTurn, index) {
  const width = 440, height = 163, left = 34, right = 412, top = 12, bottom = 124;
  const step = (right - left) / (lastTurn - 1);
  const x = turn => left + (turn - 1) * step;
  const y = value => bottom - value * (bottom - top);
  const values = new Map(episode.turns.map((turn, i) => [turn, episode.interest[i]]));
  const grid = [0, .5, 1].map(value =>
    '<line class="interest-gridline" x1="' + left + '" x2="' + right + '" y1="' + y(value) + '" y2="' + y(value) +
    '"/><text x="24" y="' + (y(value) + 4) + '" text-anchor="end">' + value.toFixed(1) + '</text>'
  ).join('');
  const line = episode.turns.map(turn => x(turn) + ',' + y(values.get(turn))).join(' ');
  const marks = Array.from({length: lastTurn}, (_, i) => {
    const turn = i + 1, value = values.get(turn);
    const label = displayModel(episode.model) + ', turn ' + turn + ': ' +
      (value === undefined ? 'no observation' : 'user interest ' + format(value, 2));
    const hitLeft = Math.max(0, x(turn) - step / 2);
    const hitWidth = Math.min(width, x(turn) + step / 2) - hitLeft;
    const point = value === undefined ? '' : '<circle class="interest-dot" cx="' + x(turn) +
      '" cy="' + y(value) + '" r="3.2"/>';
    return '<g class="interest-turn" role="button" tabindex="0" data-interest-turn="' + turn +
      '" aria-pressed="false" aria-label="' + safe(label) + '"><rect class="interest-hit" x="' + hitLeft +
      '" y="0" width="' + hitWidth + '" height="' + height + '"/><line class="interest-cursor" x1="' + x(turn) +
      '" x2="' + x(turn) + '" y1="' + top + '" y2="' + bottom + '"/>' + point +
      '<text x="' + x(turn) + '" y="148" text-anchor="middle">' + turn + '</text></g>';
  }).join('');
  return '<div class="interest-panel"><div class="interest-panel-head">' + modelLabel(episode.model) +
    episodeStatus(episode.outcome) + '</div><svg class="interest-chart" viewBox="0 0 ' + width + ' ' + height +
    '" role="group" aria-label="' + safe(displayModel(episode.model) + ' user interest by assistant turn') +
    '">' + grid + '<polyline class="interest-path" points="' + line + '"/>' + marks + '</svg>' +
    '<div class="interest-readout" data-trajectory-summary="' + index + '" aria-live="polite"></div></div>';
}

function dynamics(models, evidence, episodes) {
  const turns = evidence.turns.map(turn => 'Turn ' + turn);
  const rows = evidence.turn_rows.map(row => [row.name, ...row.scores.map((value, index) =>
    format(value) + ' / ' + row.reached[index] + '%')]);
  const lastTurn = Math.max(...episodes.map(episode => episode.turns.at(-1)));
  return section('dynamics', 'Interaction dynamics',
    card('User interest by turn', '<div class="trajectory-grid">' +
      episodes.map((episode, index) => interestPanel(episode, lastTurn, index)).join('') + '</div>',
    'Two reimbursement dialogues share the same scene and simulated user. Both panels use a 0–1 interest scale and the same assistant-turn axis.') +
    card('Turn score and episode reach', table('Mean score and percentage of episodes reaching each turn',
      ['Model', ...turns], rows, {models: true}),
    'Each cell shows mean score / reach rate. The mean includes episodes that reach that turn. The reach rate uses all episodes started under that model and condition.') +
    card('Adaptive stopping and fixed horizons', table('Matched fixed-horizon scores',
      ['Model', 'Adaptive prefix', '8 turns', '16 turns', '32 turns'],
      models.map(model => [model.name, format(model.duration.adaptive), ...model.duration.fixed.map(value => format(value))]),
      {models: true}),
    'Composite scores use the matched fixed-length subsample. The adaptive score includes turns through the first stopping decision.')
  );
}

function creativity() {
  const cognizerRates = new Map([
    ['claude-opus-5.5', '12.3%'],
    ['gpt-6-astra', '11.6%'],
    ['claude-fable-5.1', '9.1%'],
    ['claude-opus-5', '8.7%']
  ]);
  return section('creativity', 'Creativity analysis', card('Substantive contributions',
    table('Turn-level contribution findings', ['Configuration', 'Turns judged as breakthroughs'], [
      ['Base models', '0.0%'], ['MetaMind', '0.0%'], ...cognizerRates
    ], {
      rowLabel: name => cognizerRates.has(name)
        ? '<span class="configuration-label">Cognizer <span class="configuration-model">(' + modelLabel(name) + ')</span></span>'
        : safe(name)
    }), 'Rates use evaluated assistant turns as the denominator. The other six Cognizer configurations recorded 0.0%.'));
}

const evaluationUsage = [
  {name:'Capability grading', calls:6, input:57000, output:3120},
  {name:'Latent-state reconstruction', calls:4, input:48800, output:5840},
  {name:'Event-chain updates', calls:2, input:27000, output:3780},
  {name:'Closure query', calls:1, input:5060, output:180},
  {name:'Red-line screen', calls:1, input:4420, output:150},
  {name:'Gap annotation', calls:1, input:4170, output:160}
];
const generationUsage = {name:'Participant generation', calls:2, input:8900, output:610};
const usageNumber = value => value.toLocaleString('en-US');

function costChart(metric) {
  const tokens = metric === 'tokens';
  const valueOf = row => tokens ? row.input + row.output : row.calls;
  const max = tokens ? 80000 : 6;
  const scale = tokens ? ['0', '20k', '40k', '60k', '80k'] : ['0', '2', '4', '6'];
  const ordered = [...evaluationUsage].sort((a,b) => valueOf(b) - valueOf(a));
  const row = data => {
    const segments = tokens ? [data.input, data.output] : [data.calls];
    const split = tokens ? 'Input ' + usageNumber(data.input) + ', output ' + usageNumber(data.output) : data.calls + ' calls';
    return '<div class="usage-row"><span>' + safe(data.name) + '</span><div class="usage-track" role="img" aria-label="' +
      split + '" title="' + split + '">' +
      segments.map(amount => '<i style="width:' + amount / max * 100 + '%"></i>').join('') +
      '</div><strong>' + usageNumber(valueOf(data)) + '</strong></div>';
  };
  return '<div class="usage-axis" aria-hidden="true">' + scale.map(value => '<span>' + value + '</span>').join('') +
    '</div><div class="usage-rows">' + ordered.map(row).join('') + '</div>' +
    '<div class="usage-generation">' + row(generationUsage) + '</div>' +
    (tokens ? '<div class="usage-key"><span><i></i>Input</span><span><i></i>Output</span></div>' : '');
}

function costs() {
  const calls = evaluationUsage.reduce((total,row) => total + row.calls,0);
  const tokens = evaluationUsage.reduce((total,row) => total + row.input + row.output,0);
  return section('cost', 'Computational cost', card('Per-exchange resource use',
    '<dl class="cost-summary"><div><dt>Evaluation tokens</dt><dd>' + usageNumber(tokens) +
    '</dd></div><div><dt>Evaluation calls</dt><dd>' + calls + '</dd></div>' +
    '<div><dt>Critical-path latency</dt><dd>123 s</dd></div></dl>' +
    '<div class="picker-segment usage-switch" role="group" aria-label="Resource measure">' +
    '<button type="button" data-cost-metric="tokens" aria-pressed="true" aria-controls="cost-chart">Tokens</button>' +
    '<button type="button" data-cost-metric="calls" aria-pressed="false" aria-controls="cost-chart">Calls</button></div>' +
    '<div id="cost-chart">' + costChart('tokens') + '</div>',
    'Evaluation totals exclude participant generation, shown below the divider. The latency is measured along the evaluation critical path.'));
}

function setupInteractions(root, models, matrix, episodes, initialTopic, signal) {
  let activeModel = 0;
  let activeLevel = 4;
  const chart = root.querySelector('#profile-chart');
  const readout = root.querySelector('#profile-readout');
  const picker = root.querySelector('.profile-picker');
  const pickerTrigger = picker.querySelector('summary');
  const selectedModel = root.querySelector('#profile-choice');
  const pickerOptions = [...picker.querySelectorAll('[data-profile]')];
  const sections = [...root.querySelectorAll('.result-section')];
  const sectionFilters = [...root.querySelectorAll('[data-section-filter]')];
  const groupFilters = [...root.querySelectorAll('[data-group-filter]')];
  const topicGroups = [...root.querySelectorAll('[data-topic-group]')];
  const interestPlot = root.querySelector('.trajectory-grid');
  const rememberedTopics = resultGroups.map(([, items]) => items[0][0]);
  let activeGroup = 0;

  function showSections(id) {
    rememberedTopics[activeGroup] = id;
    for (const section of sections) section.hidden = section.dataset.resultsTopic !== id;
    for (const filter of sectionFilters) {
      filter.setAttribute('aria-pressed', String(filter.dataset.sectionFilter === id));
    }

  }

  function showGroup(index) {
    activeGroup = index;
    for (const group of groupFilters) {
      group.setAttribute('aria-pressed', String(Number(group.dataset.groupFilter) === index));
    }
    for (const topics of topicGroups) topics.hidden = Number(topics.dataset.topicGroup) !== index;
    showSections(rememberedTopics[index]);
  }

  function showLevel(index) {
    activeLevel = index;
    const model = models[activeModel];
    readout.innerHTML = '<p class="profile-level">L' + (index + 1) + ' · ' + safe(levelLabels[index]) +
      '</p><strong>' + format(model.levels[index]) + '</strong><p class="profile-score-model">' +
      modelLabel(model.name) + '</p>';
    chart.querySelectorAll('[data-level]').forEach(point => {
      const chosen = Number(point.dataset.level) === index;
      point.classList.toggle('is-selected', chosen);
      point.setAttribute('aria-pressed', String(chosen));
    });
  }

  function showModel(index) {
    activeModel = index;
    selectedModel.innerHTML = modelLabel(models[index].name);
    root.querySelectorAll('[data-profile]').forEach(button =>
      button.setAttribute('aria-pressed', String(Number(button.dataset.profile) === index)));
    const model = models[index];
    chart.innerHTML = lineChart(levelLabels.map((_, index) => 'L' + (index + 1)),
      [{name: displayModel(model.name), values: model.levels}], displayModel(model.name) + ' capability profile', true);
    showLevel(activeLevel);
  }

  function showPair(row, column) {
    const record = matrix[row];
    root.querySelectorAll('[data-pair]').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.pair === row + ',' + column)));
    const partner = root.querySelector('#selected-partner');
    const assistant = root.querySelector('#selected-assistant');
    partner.innerHTML = modelLabel(record.partner);
    partner.title = displayModel(record.partner);
    assistant.innerHTML = modelLabel(models[column].name);
    assistant.title = displayModel(models[column].name);
    root.querySelector('#selected-pair-score').textContent = format(record.scores[column]);
  }

  function showInterestTurn(turn) {
    for (const point of interestPlot.querySelectorAll('[data-interest-turn]')) {
      point.setAttribute('aria-pressed', String(Number(point.dataset.interestTurn) === turn));
    }
    episodes.forEach((episode, index) => {
      const value = episode.interest[episode.turns.indexOf(turn)];
      const readout = interestPlot.querySelector('[data-trajectory-summary="' + index + '"]');
      readout.innerHTML = '<span>Turn ' + turn + '</span>' + (value === undefined
        ? '<strong aria-label="No observation">—</strong>'
        : '<strong>' + format(value, 2) + '</strong>');
    });
  }

  interestPlot.addEventListener('click', event => {
    const turn = event.target.closest('[data-interest-turn]');
    if (turn) showInterestTurn(Number(turn.dataset.interestTurn));
  });
  interestPlot.addEventListener('keydown', event => {
    if (event.target.matches('[data-interest-turn]') && ['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      showInterestTurn(Number(event.target.dataset.interestTurn));
    }
  });

  document.addEventListener('click', event => {
    if (!picker.contains(event.target)) picker.open = false;
  }, {signal});
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape' && picker.open) {
      picker.open = false;
      pickerTrigger.focus();
      return;
    }
    const current = pickerOptions.indexOf(event.target);
    if (event.target === pickerTrigger && event.key === 'ArrowDown') {
      event.preventDefault();
      picker.open = true;
      pickerOptions[activeModel].focus();
    } else if (current !== -1 && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const last = pickerOptions.length - 1;
      const next = {ArrowDown: Math.min(current + 1, last), ArrowUp: Math.max(current - 1, 0), Home: 0, End: last};
      pickerOptions[next[event.key]].focus();
    }
  });
  root.addEventListener('click', event => {
    const costMetric = event.target.closest('[data-cost-metric]');
    if (costMetric) {
      root.querySelectorAll('[data-cost-metric]').forEach(button => button.setAttribute('aria-pressed', String(button === costMetric)));
      root.querySelector('#cost-chart').innerHTML = costChart(costMetric.dataset.costMetric);
    }
    const group = event.target.closest('[data-group-filter]');
    if (group) showGroup(Number(group.dataset.groupFilter));
    const filter = event.target.closest('[data-section-filter]');
    if (filter) showSections(filter.dataset.sectionFilter);
    if (group || filter) {
      const topic = rememberedTopics[activeGroup];
      history.replaceState(history.state, '', '#comparisons?topic=' + encodeURIComponent(topic));
    }
    const point = event.target.closest('[data-level]');
    if (point) showLevel(Number(point.dataset.level));
    const profile = event.target.closest('[data-profile]');
    if (profile) {
      showModel(Number(profile.dataset.profile));
      if (picker.contains(profile)) {
        picker.open = false;
        pickerTrigger.focus();
      }
    }
    const cell = event.target.closest('[data-pair]');
    if (cell) showPair(...cell.dataset.pair.split(',').map(Number));
  });
  chart.addEventListener('keydown', event => {
    if (event.target.matches('[data-level]') && ['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      showLevel(Number(event.target.dataset.level));
    }
  });
  const initialGroup = resultGroups.findIndex(([, items]) => items.some(([id]) => id === initialTopic));
  if (initialGroup >= 0) rememberedTopics[initialGroup] = initialTopic;
  showGroup(Math.max(0, initialGroup));
  showModel(activeModel);
  showPair(0, 0);
  showInterestTurn(Math.min(...episodes.map(episode => episode.turns.at(-1))));
}

export function mountResults(root, publication, evidence, research, initialTopic, signal) {
  const {models, agents, interaction_matrix: matrix, matched_information: matched} = publication;
  const episodes = research.trajectories.episodes;
  root.innerHTML =
    resultPicker() +
    mainResults(models) + agentResults(models, agents) + robustness(models, evidence) +
    scenarios(models, matched) + personas(models) + participants(models, matrix) +
    dynamics(models, evidence, episodes) + creativity() + costs();
  setupInteractions(root, models, matrix, episodes, initialTopic, signal);
}
