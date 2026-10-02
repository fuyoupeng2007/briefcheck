const {test}=require('node:test');
const assert=require('node:assert/strict');
const {analyze,toMarkdown}=require('../core.js');
test('missing terms become questions, never invented facts',()=>{
 const r=analyze('需要做一个网站，看起来高级一点，尽快做好。');
 assert.equal(r.facts.budget,null); assert.equal(r.facts.deadline,null);
 assert.ok(r.questions.some(x=>x.id==='budget'));
 assert.ok(r.risks.some(x=>x.id==='vague'));
 assert.ok(r.deliverables.some(x=>x.id==='web'));
 assert.equal(r.deliverables[0].confirmed,false);
});
test('concrete details remain traceable to source',()=>{
 const input='做一个网站，有登录和支付功能。\n预算 3000 元。\n交付日期 2026-10-20。\n修改最多 2 轮。\n验收：手机端与桌面端能正常打开。\n素材由客户提供。';
 const r=analyze(input); for(const f of Object.values(r.facts)) if(f) assert.ok(input.includes(f));
 assert.ok(r.facts.budget.includes('3000')); assert.ok(r.facts.deadline.includes('2026-10-20'));
 assert.ok(!r.questions.some(x=>x.id==='budget')); assert.ok(r.risks.some(x=>x.id==='payment'));
 assert.ok(r.risks.some(x=>x.id==='auth'));
});
test('unknown and negated terms are not treated as agreement',()=>{
 const r=analyze('做网站，不需要支付。预算待定，交付日期还没定，修改不限次数。');
 assert.equal(r.facts.budget,null); assert.equal(r.facts.deadline,null);
 assert.ok(r.questions.some(x=>x.id==='budget')); assert.ok(r.risks.some(x=>x.id==='unlimited'));
 assert.ok(!r.risks.some(x=>x.id==='payment'));
});
test('multiple deliverables and English input work',()=>{
 const r=analyze('Build a website and edit a video. Budget $500. Deadline October 20. Up to 2 revision rounds.','en');
 assert.ok(r.deliverables.some(x=>x.id==='web')); assert.ok(r.deliverables.some(x=>x.id==='video'));
 assert.ok(r.facts.budget.includes('$500')); assert.ok(r.facts.deadline.includes('October 20'));
 assert.ok(!r.questions.some(x=>x.id==='revisions')); assert.ok(r.questions.every(x=>!/预算/.test(x.question)));
});
test('a brand reference alone is not a separate design deliverable',()=>{
 const r=analyze('做一个网站，参考喜欢的咖啡品牌。');
 assert.ok(r.deliverables.some(x=>x.id==='web'));assert.ok(!r.deliverables.some(x=>x.id==='design'));
 assert.ok(analyze('设计一张海报和一个 logo。').deliverables.some(x=>x.id==='design'));
});
test('blank input is rejected and huge input is bounded',()=>{
 assert.throws(()=>analyze('  '),/empty/); assert.throws(()=>analyze('x'.repeat(20001)),/20000/);
});
test('payment on acceptance does not supply acceptance criteria',()=>{
 const r=analyze('做一个网站。验收后付余款。');
 assert.equal(r.facts.acceptance,null);assert.ok(r.questions.some(q=>q.id==='acceptance'));
 const detailed=analyze('做一个网站。验收后付余款。验收标准：390px 无横向滚动。');
 assert.ok(detailed.facts.acceptance.includes('390px'));
});
test('negating login preserves explicitly requested payment, and vice versa',()=>{
 for(const brief of ['做网站。不需要登录但需要支付功能。','Build a website. No login but include payment.']){
  const r=analyze(brief);assert.ok(r.risks.some(x=>x.id==='payment'));assert.ok(!r.risks.some(x=>x.id==='auth'));
 }
 for(const brief of ['做网站。不需要支付但需要登录功能。','Build a website. No payment but include login.']){
  const r=analyze(brief);assert.ok(r.risks.some(x=>x.id==='auth'));assert.ok(!r.risks.some(x=>x.id==='payment'));
 }
 for(const brief of ['做网站。不需要登录和支付功能。','Build a website. No login or payment required.']){
  const r=analyze(brief);assert.ok(!r.risks.some(x=>x.id==='auth'||x.id==='payment'));
 }
});
test('export preserves edits, confirmation and full original brief',()=>{
 const r=analyze('做一个网站。'); r.deliverables[0].acceptance='双方确认：宽度 390px 无横向滚动';
 r.deliverables[0].confirmed=true;
 const md=toMarkdown(r,'演示项目'); assert.ok(md.includes(r.deliverables[0].acceptance));
 assert.ok(md.includes('已确认')); assert.ok(md.includes('做一个网站。')); assert.ok(md.includes('待确认'));
});
