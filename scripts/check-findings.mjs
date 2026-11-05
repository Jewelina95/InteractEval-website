import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const data=JSON.parse(fs.readFileSync('data/findings-v5.json','utf8'));
assert.equal(data.findings.length,40);
assert.equal(data.categories.length,7);
assert.equal(data.homepage_ids.length,15);
const ids=new Set(data.findings.map(f=>f.id));
assert.equal(ids.size,40);
const categorized=data.categories.flatMap(c=>c.finding_ids);
assert.equal(categorized.length,40);
assert.equal(new Set(categorized).size,40);
for(const f of data.findings){
 assert.ok(data.categories.find(c=>c.slug===f.category_slug)?.finding_ids.includes(f.id));
 assert.ok(f.summary_en&&f.limitation_en);
 for(const id of [...f.related_ids,f.next_finding].filter(Boolean))assert.ok(ids.has(id),`${f.id}: unknown related finding ${id}`);
 for(const page of f.verified_pages)assert.ok(page>=1&&page<=data.paper.pages);
}
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(data.paper.path.replace('./',''))).digest('hex'),data.paper.sha256);
const noop=()=>{};
const c=vm.createContext({console,URLSearchParams,URL,location:{hash:'',pathname:'/index.html'},CSS:{supports:()=>false},document:{addEventListener:noop,querySelector:()=>null},window:{addEventListener:noop},IntersectionObserver:class{observe(){}disconnect(){}},history:{},matchMedia:()=>({matches:true}),setTimeout:noop});
for(const file of ['explorer.js','navigation.js','metric-guide.js','results-explorer.js','findings.js','paper-site.js']){
 let source=fs.readFileSync(file,'utf8');
 if(file==='paper-site.js')source=source.slice(0,source.indexOf("Promise.all(['paper-results.json'"));
 vm.runInContext(source,c,{filename:file});
}
c.catalog=data;c.extra=JSON.parse(fs.readFileSync('data/findings-evidence.json','utf8'));c.published=JSON.parse(fs.readFileSync('data/paper-results.json','utf8'));c.research=JSON.parse(fs.readFileSync('data/research-evidence.json','utf8'));
vm.runInContext('findingsResearch=catalog;findingsEvidence=extra;publication=published;researchEvidence=research;configureFindingMeasures();',c);
for(const f of data.findings){
 c.location.hash=`#comparisons?measure=${f.measure}&finding=${f.id}`;
 c.selected=f;
 vm.runInContext('mainComparisonMeasure=selected.measure;mainComparisonGroup=mainComparisonGroups.find(g=>g.items.some(i=>i[0]===selected.measure)).id;',c);
 const html=vm.runInContext('findingEvidenceIntro()+mainComparisonContent()+findingEvidenceFooter()',c);
 assert.ok(html.includes('finding-key-metrics'),f.id+' missing key metrics');
 assert.ok(html.includes('finding-data-explanation'),f.id+' missing below-data explanation');
 assert.ok(html.includes(`data-research-finding="${f.id}"`),f.id+' missing context');
 assert.ok(!html.includes('finding-source-links'),f.id+' source chips remain');
 assert.ok(!html.includes('How to read'),f.id+' tutorial heading remains');
 assert.ok(html.includes(f.limitation_en),f.id+' missing limitation');
 assert.ok(html.indexOf('finding-key-metrics')>html.indexOf('</header>'),f.id+' metrics must follow the evidence');
 if(f.id==='F11')assert.ok(html.includes('8.5 percentage points'));
 assert.ok(!/\bNaN\b|undefined|Infinity/.test(html),f.id+' invalid rendered value');
 assert.ok(/<table|evidence-bars|comparison-bars|architecture-comparison-grid/.test(html),f.id+' missing evidence');
}
c.location.hash='#key-findings';
const homepage=vm.runInContext('coreFindings()',c);
assert.equal((homepage.match(/class="selected-finding-link/g)||[]).length,15);
assert.ok(!homepage.includes('All findings'));
assert.ok(!homepage.includes('home-finding-search'));
for(const id of data.homepage_ids)assert.ok(homepage.includes('finding='+id));
assert.ok(homepage.includes('data-finding-measure="stage-profile"'));
assert.ok(homepage.includes('finding-category-tag'));
assert.ok(!homepage.includes('finding-data-explanation'));
assert.ok(!homepage.includes('finding-information-definitions'));
assert.equal((fs.readFileSync('key-findings-zh.html','utf8').match(/class="finding-catalog-card/g)||[]).length,40);
assert.match(homepage,/measure=stage-profile&finding=F01/);
assert.match(homepage,/measure=information&finding=F07/);
assert.ok(homepage.indexOf('finding=F01')<homepage.indexOf('finding=F07'));
for(const category of data.categories){
 c.location.hash='#findings?category='+category.slug;
 const html=vm.runInContext('findingsIndex()',c);
 assert.equal((html.match(/class="finding-catalog-card/g)||[]).length,category.finding_ids.length);
}
assert.match(vm.runInContext("findingsCards('', 'F42')",c),/1 finding/);
assert.match(vm.runInContext("findingsCards('', 'no matching phrase xyz')",c),/No findings match/);
console.log('40 evidence views render with below-chart metrics, definitions, caveats and valid values; 7 exclusive categories, 15 curated homepage rows, search and original finding routes verified.');

for(const id of ['F43','F44','F45','F46','F47','F48'])assert.ok(ids.has(id));
for(const id of ['F43','F44','F45'])assert.ok(data.homepage_ids.includes(id));
for(const row of c.extra.prose_scores)assert.ok(Number.isFinite(row));
assert.equal(c.extra.simulated_users.length,11);
assert.equal(c.extra.prose_scores.length,10);

const deltas=c.extra.prose_scores.map((v,i)=>v-c.published.models[i].composite);
assert.equal(deltas.filter(v=>v<0).length,9);
assert.ok(Math.abs(deltas.reduce((sum,v)=>sum+Math.abs(v),0)/10-0.0124)<1e-10);
const span=values=>Math.max(...values)-Math.min(...values);
assert.ok(Math.abs(span(c.published.models.map(m=>m.duration.adaptive))-0.223)<1e-10);
assert.ok(Math.abs(span(c.published.models.map(m=>m.duration.fixed[2]))-0.267)<1e-10);
