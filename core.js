(function(root){
 'use strict';
 const enZh=(lang,zh,en)=>lang==='en'?en:zh;
 const rules=[
  {id:'web',rx:/网站|网页|落地页|小程序|\bwebsite\b|\bweb app\b|landing page/i,zh:'网站 / 应用',en:'Website / app',az:'列出页面与操作路径；在约定的设备和浏览器逐项验证；以截图或录像留存结果。',ae:'List pages and user journeys; verify each on agreed devices and browsers; retain screenshots or recordings.'},
  {id:'video',rx:/视频|短剧|剪辑|\bvideo\b|\bfilm\b/i,zh:'视频交付',en:'Video delivery',az:'约定条数、时长、画幅、分辨率和字幕；确认音乐与素材来源；交付可播放成片。',ae:'Agree on count, duration, aspect ratio, resolution and captions; confirm asset rights; deliver playable files.'},
  {id:'design',rx:/海报|logo|品牌设计|品牌视觉|视觉设计|视觉稿|设计稿|poster|branding|design mockup/i,zh:'视觉设计',en:'Visual design',az:'约定尺寸、数量、文件格式与源文件范围；按双方认可的参考图逐项验收。',ae:'Agree on dimensions, count, formats and source files; review against approved visual references.'},
  {id:'automation',rx:/自动化|工作流|\bn8n\b|\bautomation\b|\bworkflow\b/i,zh:'自动化流程',en:'Automation workflow',az:'列出输入样例与期望输出；演示正常路径与一次错误路径；明确账号与运行环境归属。',ae:'Define sample inputs and expected outputs; demonstrate success and one failure case; assign account and runtime ownership.'},
  {id:'document',rx:/PPT|文档|报告|简历|presentation|\breport\b|\bdocument\b/i,zh:'文档 / 演示稿',en:'Document / presentation',az:'约定页数、语言、格式和可编辑范围；检查内容、排版与导出效果。',ae:'Agree on pages, language, format and editable content; inspect content, layout and exported files.'}
 ];
 function requestedFeature(clause,rx){
  return clause.split(/但是?|不过|然而|\bbut\b|\bhowever\b/i).some(part=>{
   const match=rx.exec(part);if(!match)return false;
   const prefix=part.slice(0,match.index),suffix=part.slice(match.index+match[0].length);
   return !/(?:不需要|不要|无需|不做|不用|without|\bno\b|\bnot\b|do not need|don't need)[^。！？；;]{0,30}$/i.test(prefix)
    && !/^\s*(?:功能|接口)?\s*(?:不需要|不要|无需|不做|is not required|not needed)/i.test(suffix);
  });
 }
 function optionalFeature(clause,rx){const match=rx.exec(clause),index=match.index;const others=rules.map(r=>r.rx.exec(clause)).filter(m=>m&&m.index!==index);const prior=Math.max(0,...others.filter(m=>m.index<index).map(m=>m.index+m[0].length));const next=Math.min(clause.length,...others.filter(m=>m.index>index).map(m=>m.index));const prefix=clause.slice(prior,index),suffix=clause.slice(index+match[0].length,next);return /最好|可选|如果.*(?:可以|有空|预算)|optional|nice.to.have|if.*budget|maybe|perhaps/i.test(prefix)||/would.*nice|nice.to.have|可选|is optional/i.test(suffix);}
 const fields=[
  {id:'budget',rx:/预算|报价|费用|budget|price|cost|fee/i,concrete:/(?:\d[\d,.]*\s*(?:元|块|万|千|usd|cny|rmb|dollars)|[$¥￥€£]\s*\d|(?:usd|cny|rmb)\s*\d)/i,qz:'总预算、付款节点和超出范围后的计费方式分别是什么？',qe:'What is the total budget, payment schedule and pricing for extra scope?'},
  {id:'deadline',rx:/交付|截止|上线|工期|deadline|delivery|due|launch|by\s/i,concrete:/\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}\s*月\s*\d{1,2}\s*[日号]?|\d+\s*(?:天|周|days?|weeks?)|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}/i,qz:'首版和最终交付各是哪一天？何时收到反馈与素材？',qe:'What are the first-draft and final-delivery dates, and when will feedback and assets arrive?'},
  {id:'revisions',rx:/修改|返工|revision|feedback round/i,concrete:/\d+\s*(?:轮|次|rounds?|revisions?)|(?:一|二|两|三|四|五)\s*(?:轮|次)/i,qz:'包含几轮修改？如何区分修改与新增需求？',qe:'How many revision rounds are included, and what counts as new scope?'},
  {id:'acceptance',rx:/验收(?:标准|条件|要求)|验收\s*[:：]|acceptance\s*(?:criteria|:)|success criteria|sign.off\s*:/i,concrete:/.+/,qz:'由谁按哪些可观察标准验收，多久内反馈结果？',qe:'Who approves delivery, against which observable criteria, and within what feedback window?'},
  {id:'assets',rx:/素材|文案|源文件|assets|copywriting|\bcopy\b|source files/i,concrete:/客户|甲方|提供|自备|负责|client|supplied|provid|owner/i,qz:'文案、图片、账号和授权由谁提供，何时准备好？',qe:'Who provides copy, images, accounts and permissions, and when will they be ready?'}
 ];
 function analyze(input,lang='zh'){
  const source=String(input||'').trim();
  if(!source) throw new Error('empty'); if(source.length>20000) throw new Error('20000');
  lang=lang==='en'?'en':'zh';
  const clauses=source.split(/\r?\n|[。！？；;]|(?<=[.!?])\s+|[，,](?!\s*\d)/).map(s=>s.trim()).filter(Boolean);
  const say=(z,e)=>enZh(lang,z,e);
  const unknown=/待定|未定|没定|不确定|不清楚|再说|商量|不限|无限|TBD|unknown|unlimited|not decided|not set/i;
  const facts={},conflicts={},evidence={}; const questions=[];
  for(const f of fields){
   const candidates=[...new Set(clauses.filter(c=>f.rx.test(c)&&f.concrete.test(c)&&!unknown.test(c)&&!/^\s*(?:无|没有|未|no\s)/i.test(c)))];
   evidence[f.id]=candidates;
   const comparable=f.id==='deadline'?candidates.filter(c=>!/首版|初稿|first.draft|feedback|反馈/i.test(c)):candidates;
   const fingerprints=comparable.map(c=>{
    if(f.id==='budget')return (c.match(/(?:[$¥￥€£]\s*\d[\d,.]*|\d[\d,.]*\s*(?:元|块|万|千|usd|cny|rmb|dollars)|(?:usd|cny|rmb)\s*\d[\d,.]*)/ig)||[]).join('|').toLowerCase().replace(/\s|,/g,'').replace(/￥|¥|rmb|cny|元|块/g,'CNY');
    if(f.id==='revisions')return (c.match(/\d+\s*(?:轮|次|rounds?|revisions?)|(?:一|二|两|三|四|五)\s*(?:轮|次)/ig)||[]).join('|').replace(/\s|轮|次|rounds?|revisions?/ig,'').replace(/一/g,'1').replace(/二|两/g,'2').replace(/三/g,'3').replace(/四/g,'4').replace(/五/g,'5');
    return c.toLowerCase().replace(/\s|[.!:：]/g,'');
   });
   const conflicting=['budget','revisions','deadline'].includes(f.id)&&new Set(fingerprints).size>1;
   if(conflicting)conflicts[f.id]=comparable;
   facts[f.id]=conflicting?null:(comparable[0]||candidates[0]||null);
   if(!facts[f.id]) questions.push({id:f.id,question:conflicting?say('原文出现多个'+({budget:'预算',revisions:'修改轮次',deadline:'最终期限'}[f.id])+'说法，最终采用哪一个？','The brief has competing '+f.id+' statements. Which one applies?'):say(f.qz,f.qe),answer:''});
  }
  const deliverables=[],options=[];
  for(const r of rules){
   const candidates=clauses.filter(c=>requestedFeature(c,r.rx)),required=candidates.find(c=>!optionalFeature(c,r.rx)),found=required||candidates[0];
   if(found)(required?deliverables:options).push({id:r.id,name:say(r.zh,r.en),evidence:found,acceptance:say(r.az,r.ae),confirmed:false});
  }
  if(!deliverables.length) deliverables.push({id:'custom',name:say('自定义交付项','Custom deliverable'),evidence:clauses[0],acceptance:say('填写实际交付物、数量、格式，以及可重复检查的完成条件。','Define the actual output, count, format and repeatable completion checks.'),confirmed:false});
  const risks=[];
  function risk(id,rx,zh,en,dz,de,negatable=false){
   const evidence=clauses.find(c=>negatable?requestedFeature(c,rx):rx.test(c));
   if(evidence) risks.push({id,title:say(zh,en),detail:say(dz,de),evidence});
  }
  risk('vague',/高级|大气|好看|尽快|简单|差不多|参考.*做|高级感|asap|simple|premium|beautiful/i,'主观描述需要变成可检查的标准','Subjective language needs observable criteria','补充参考图、具体交互或日期。不要把“好看”“尽快”作为最终验收条件。','Add visual references, specific interactions or dates. Avoid using “beautiful” or “ASAP” as final acceptance criteria.');
  risk('unlimited',/不限|无限|直到满意|满意为止|unlimited|until satisfied/i,'修改范围没有边界','Revisions have no boundary','约定包含轮次、每轮反馈截止时间，以及新增需求的处理方式。','Agree on included rounds, feedback windows and the treatment of new requests.');
  risk('payment',/支付|付款接口|收款|payment|checkout/i,'支付集成需要单独验证','Payment integration needs separate verification','确认商户账号、测试环境、退款流程与上线责任；功能通过测试前不算完成。','Confirm merchant account, test environment, refunds and launch ownership; passing tests is a completion requirement.',true);
  risk('auth',/登录|权限|账号系统|login|authentication|user accounts/i,'账号与权限增加交付工作','Accounts and permissions add delivery work','定义角色、找回密码与数据访问范围，并为每个角色准备验收路径。','Define roles, password recovery and data access; prepare acceptance journeys for each role.',true);
  risk('integration',/接口|第三方|API|集成|integration/i,'外部依赖需确认','External dependencies need clarification','确认接口文档、可用账号、调用限制和故障时的交付边界。','Confirm documentation, available accounts, rate limits and delivery boundaries when the dependency fails.');
  if(deliverables.length>1) risks.push({id:'mixed',title:say('多种交付物要分别验收','Multiple outputs need separate acceptance'),detail:say('分别确认数量、负责人、截止时间与修改轮次，避免一个交付物拖住全部验收。','Agree on count, owner, due date and revisions for each output.'),evidence:[...new Set(deliverables.map(d=>d.evidence))].join(' / ')});
  return {version:3,lang,source,facts,conflicts,evidence,questions,risks,deliverables,options,milestones:[
   {name:say('01 · 确认范围','01 · Agree on scope'),detail:say('答完待确认问题，双方确认交付清单与素材。','Resolve open questions and agree on deliverables and assets.')},
   {name:say('02 · 首版走查','02 · Review first draft'),detail:say('用约定的样例逐项演示，收集一份合并反馈。','Demonstrate agreed examples and collect one consolidated feedback list.')},
   {name:say('03 · 最终验收','03 · Accept delivery'),detail:say('按清单复核，记录结果，交付约定文件与说明。','Check each criterion, record results and hand over agreed files and instructions.')}
  ]};
 }
 function toMarkdown(r,title='BriefCheck'){
  const s=(z,e)=>enZh(r.lang,z,e), clean=t=>String(t||'').replace(/\r/g,'');
  let out=`# ${clean(title)}\n\n${s('本清单由本地规则整理；建议和原文分开显示，只有勾选的交付项表示用户已确认。','This checklist uses local rules. Suggestions are separate from source evidence; only checked deliverables are marked user-confirmed.')}\n\n`;
  out+=`## ${s('原文中的信息','Details found in the brief')}\n\n`;
  const labels={budget:s('预算','Budget'),deadline:s('交付时间','Deadline'),revisions:s('修改轮次','Revisions'),acceptance:s('验收','Acceptance'),assets:s('素材','Assets')};
  for(const [key,value] of Object.entries(r.facts)) out+=`- **${labels[key]}**: ${clean(value)||s('待确认','To clarify')}\n`;
  for(const [key,items] of Object.entries(r.conflicts||{}))out+=`\n**${s('冲突原文','Competing source statements')} (${labels[key]})**\n`+items.map(x=>'> '+clean(x)).join('\n')+'\n';
  out+=`\n## ${s('交付与验收清单','Deliverables and acceptance')}\n\n`;
  for(const d of r.deliverables) out+=`### ${clean(d.name)} — ${d.confirmed?s('已确认','User-confirmed'):s('待确认','To clarify')}\n\n${clean(d.acceptance)}\n\n${s('来源','Source')}: ${clean(d.evidence)}\n\n`;
  if(r.options?.length)out+=`## ${s('可选范围（未纳入交付）','Optional scope (not included)')}\n\n`+r.options.map(d=>`- ${clean(d.name)}: ${clean(d.evidence)}`).join('\n')+'\n\n';
  out+=`## ${s('待确认问题','Open questions')}\n\n`;
  if(!r.questions.length) out+=s('规则未发现上述字段缺失；仍需人工核对。','No missing tracked fields were found; human review is still needed.')+'\n';
  for(const q of r.questions) out+=`- ${clean(q.question)}\n  ${s('答复','Answer')}: ${clean(q.answer)||s('尚未填写','Not yet provided')}\n`;
  out+=`\n## ${s('范围提醒','Scope reminders')}\n\n`;
  for(const risk of r.risks) out+=`- **${clean(risk.title)}**: ${clean(risk.detail)}\n  ${s('来源','Source')}: ${clean(risk.evidence)}\n`;
  out+=`\n## ${s('建议里程碑（日期待双方确认）','Suggested milestones (dates to agree)')}\n\n`;
  for(const m of r.milestones) out+=`- ${m.name}: ${m.detail}\n`;
  out+=`\n## ${s('完整原始需求','Full original brief')}\n\n`+r.source.split('\n').map(x=>'> '+x).join('\n')+'\n';
  return out;
 }
 function restore(saved,lang){
  if(!saved||typeof saved.source!=='string'||!saved.source.trim()||saved.source.length>20000)throw new Error('invalid');
  const r=analyze(saved.source,lang||saved.lang),allowed=[...r.deliverables,...r.options],ids=new Set();
  if(Array.isArray(saved.deliverables))r.deliverables=saved.deliverables.slice(0,30).flatMap(d=>{
   if(!d||typeof d.id!=='string'||ids.has(d.id))return [];
   const base=allowed.find(x=>x.id===d.id),manual=d.manual===true&&/^manual-[a-zA-Z0-9-]{1,64}$/.test(d.id);
   if(!base&&!manual)return [];ids.add(d.id);
   const text=(key,max,fallback='')=>typeof d[key]==='string'?d[key].slice(0,max):fallback;
   const item={...(base||{}),id:d.id,manual:manual||d.manual===true,name:text('name',120,base?.name),acceptance:text('acceptance',5000,base?.acceptance),evidence:base?.evidence||text('evidence',3000),confirmed:false};
   item.confirmed=d.confirmed===true&&!!item.acceptance.trim()&&!!item.name.trim();return [item];
  });
  r.options=r.options.filter(d=>!ids.has(d.id));
  for(const q of r.questions){const old=Array.isArray(saved.questions)?saved.questions.find(x=>x?.id===q.id):null;if(typeof old?.answer==='string')q.answer=old.answer.slice(0,3000);}
  return r;
 }
 function reconcile(next,old){
  if(!old)return next;
  const baseline=analyze(old.source,old.lang),changed=next.source!==old.source;
  for(const d of next.deliverables){const prev=old.deliverables.find(x=>x.id===d.id),original=[...baseline.deliverables,...baseline.options].find(x=>x.id===d.id);if(prev){if(prev.acceptance!==original?.acceptance)d.acceptance=prev.acceptance;if(prev.name!==original?.name)d.name=prev.name;d.confirmed=!changed&&prev.confirmed&&d.acceptance===prev.acceptance;}}
  for(const d of old.deliverables.filter(x=>x.manual&&/^manual-/.test(x.id)))if(next.deliverables.length<30)next.deliverables.push({...d,confirmed:!changed&&d.confirmed});
  if(!changed){next=restore({...old,lang:next.lang},next.lang);}
  for(const q of next.questions){const prev=old.questions.find(x=>x.id===q.id);if(prev)q.answer=prev.answer;}
  return next;
 }
 function compare(before,after){
  if(!before)return [];
  const changes=[];
  for(const key of Object.keys(after.facts))if(before.facts[key]!==after.facts[key]||JSON.stringify(before.conflicts?.[key]||[])!==JSON.stringify(after.conflicts?.[key]||[]))changes.push({kind:'field',key,before:(before.conflicts?.[key]||[before.facts[key]]).filter(Boolean).join(' / '),after:(after.conflicts?.[key]||[after.facts[key]]).filter(Boolean).join(' / ')});
  for(const d of after.deliverables){const prev=before.deliverables.find(x=>x.id===d.id);if(!prev)changes.push({kind:'added',key:d.name,before:'',after:d.evidence});else if(d.evidence!==prev.evidence||d.acceptance!==prev.acceptance||d.name!==prev.name)changes.push({kind:'scope',key:d.name,before:prev.evidence+' · '+prev.acceptance,after:d.evidence+' · '+d.acceptance});}
  for(const d of before.deliverables)if(!after.deliverables.some(x=>x.id===d.id))changes.push({kind:'removed',key:d.name,before:d.evidence,after:''});
  if(before.source!==after.source&&!changes.length)changes.push({kind:'source',key:'source',before:before.source,after:after.source});
  return changes;
 }
 function toHTML(r,title='BriefCheck'){
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const say=(z,e)=>enZh(r.lang,z,e),labels={budget:say('预算','Budget'),deadline:say('交付时间','Deadline'),revisions:say('修改轮次','Revisions'),acceptance:say('验收标准','Acceptance'),assets:say('素材归属','Assets')};
  const section=(name,body)=>`<section><h2>${escape(name)}</h2>${body}</section>`,p=s=>`<p>${escape(s)}</p>`;
  const facts=Object.entries(r.facts).map(([key,value])=>`<article><h3>${escape(labels[key])}</h3>${p(value||say('待确认','To clarify'))}${(r.conflicts?.[key]||[]).map(p).join('')}</article>`).join('');
  const scope=r.deliverables.map(d=>`<article><h3>${escape(d.name)} · ${escape(d.confirmed?say('用户已确认','User-confirmed'):say('待确认','To clarify'))}</h3>${p(d.acceptance)}<small>${escape(say('来源','Source'))}: ${escape(d.evidence)}</small></article>`).join('');
  return `<!doctype html><html lang="${r.lang==='en'?'en':'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>${escape(title)}</title><style>body{font:16px/1.7 system-ui,sans-serif;max-width:820px;margin:40px auto;padding:24px;color:#193b32;background:#faf9f3}h1{font-size:36px}h2{margin-top:32px;border-bottom:1px solid #c5d0c9}article{padding:12px 0}p,small{white-space:pre-wrap;overflow-wrap:anywhere}small{color:#53685c}footer{margin-top:32px;font-size:13px}@media print{body{margin:0;padding:0;background:white}article{break-inside:avoid}}</style></head><body><h1>${escape(title)}</h1>${p(say('协商草稿。勾选状态表示本地用户确认，不代表客户签署。','Discussion draft. Checkmarks record local user confirmation and do not represent a client signature.'))}${section(say('原文信息','Source facts'),facts)}${section(say('交付与验收','Deliverables and acceptance'),scope)}${r.options?.length?section(say('可选范围（未纳入交付）','Optional scope (not included)'),r.options.map(d=>p(d.name+' · '+d.evidence)).join('')):''}${section(say('澄清与用户答复','Clarifications and user answers'),r.questions.map(q=>`<article><h3>${escape(q.question)}</h3>${p(q.answer||say('未答复','Unanswered'))}</article>`).join(''))}${section(say('范围提醒','Scope reminders'),r.risks.map(x=>`<article><h3>${escape(x.title)}</h3>${p(x.detail)}<small>${escape(x.evidence)}</small></article>`).join(''))}${section(say('完整原文','Full original brief'),p(r.source))}<footer>BriefCheck · ${escape(say('本文件没有网络请求或交互脚本。','This file has no network requests or interactive scripts.'))}</footer></body></html>`;
 }
 const api={analyze,toMarkdown,restore,reconcile,compare,toHTML}; if(typeof module==='object'&&module.exports) module.exports=api; else root.BriefCheck=api;
})(typeof globalThis!=='undefined'?globalThis:this);
