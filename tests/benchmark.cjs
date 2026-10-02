const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const vm=require('node:vm');
const arg=process.argv[2];
let api;
if(arg){const sandbox={module:{exports:{}}};vm.runInNewContext(execFileSync('git',['show',`${arg}:core.js`],{encoding:'utf8'}),sandbox);api=sandbox.module.exports;}else api=require('../core.js');
const cases=[
 ['missing budget remains unknown',()=>assert.equal(api.analyze('Build a website.').facts.budget,null)],
 ['literal budget is traceable',()=>assert.equal(api.analyze('Budget $500.').facts.budget,'Budget $500.')],
 ['competing budgets unresolved',()=>{const r=api.analyze('Budget $500. Budget $900.');assert.equal(r.facts.budget,null);assert.equal(r.conflicts.budget.length,2)}],
 ['competing revisions unresolved',()=>{const r=api.analyze('Include 2 revision rounds. Include 4 revision rounds.');assert.equal(r.facts.revisions,null);assert.equal(r.conflicts.revisions.length,2)}],
 ['competing final deadlines unresolved',()=>assert.equal(api.analyze('Deadline October 20. Deadline October 25.').facts.deadline,null)],
 ['first draft is not a final deadline conflict',()=>assert.ok(api.analyze('Deadline October 20. First draft October 12.').facts.deadline.includes('October 20'))],
 ['optional video kept outside committed outputs',()=>{const r=api.analyze('Build a website. A video would also be nice.');assert.ok(!r.deliverables.some(d=>d.id==='video'));assert.ok(r.options.some(d=>d.id==='video'))}],
 ['negative video excluded',()=>assert.ok(!api.analyze('Build a website. No video is required.').deliverables.some(d=>d.id==='video'))],
 ['contrastive payment stays requested',()=>{const r=api.analyze('Build a website. No login but include payment.');assert.ok(r.risks.some(x=>x.id==='payment'));assert.ok(!r.risks.some(x=>x.id==='auth'))}],
 ['payment after acceptance is not criteria',()=>assert.equal(api.analyze('做网站。验收后付余款。').facts.acceptance,null)],
 ['Chinese conditional video is optional',()=>{const r=api.analyze('做一个网站。最好再加一条视频。');assert.ok(!r.deliverables.some(d=>d.id==='video'));assert.ok(r.options.some(d=>d.id==='video'))}],
 ['Markdown retains full source',()=>assert.ok(api.toMarkdown(api.analyze('Build a website.')).includes('> Build a website.'))]
];
let passed=0;for(const [name,check] of cases){try{check();passed++;console.log('PASS '+name)}catch{console.log('FAIL '+name)}}
console.log(JSON.stringify({version:arg||'working',passed,total:cases.length}));
