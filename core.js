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
 const fields=[
  {id:'budget',rx:/预算|报价|费用|budget|price|cost|fee/i,concrete:/(?:\d[\d,.]*\s*(?:元|块|万|千|usd|cny|rmb|dollars)|[$¥￥€£]\s*\d|(?:usd|cny|rmb)\s*\d)/i,qz:'总预算、付款节点和超出范围后的计费方式分别是什么？',qe:'What is the total budget, payment schedule and pricing for extra scope?'},
  {id:'deadline',rx:/交付|截止|上线|工期|deadline|delivery|due|launch|by\s/i,concrete:/\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}\s*月\s*\d{1,2}\s*[日号]?|\d+\s*(?:天|周|days?|weeks?)|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}/i,qz:'首版和最终交付各是哪一天？何时收到反馈与素材？',qe:'What are the first-draft and final-delivery dates, and when will feedback and assets arrive?'},
  {id:'revisions',rx:/修改|返工|revision|feedback round/i,concrete:/\d+\s*(?:轮|次|rounds?|revisions?)|(?:一|二|两|三|四|五)\s*(?:轮|次)/i,qz:'包含几轮修改？如何区分修改与新增需求？',qe:'How many revision rounds are included, and what counts as new scope?'},
  {id:'acceptance',rx:/验收(?:标准|条件|要求)|验收\s*[:：]|acceptance\s*(?:criteria|:)|success criteria|sign.off\s*:/i,concrete:/.+/,qz:'由谁按哪些可观察标准验收，多久内反馈结果？',qe:'Who approves delivery, against which observable criteria, and within what feedback window?'},
  {id:'assets',rx:/素材|文案|源文件|assets|copywriting|source files/i,concrete:/客户|甲方|提供|自备|负责|client|supplied|provid|owner/i,qz:'文案、图片、账号和授权由谁提供，何时准备好？',qe:'Who provides copy, images, accounts and permissions, and when will they be ready?'}
 ];
 function analyze(input,lang='zh'){
  const source=String(input||'').trim();
  if(!source) throw new Error('empty'); if(source.length>20000) throw new Error('20000');
  lang=lang==='en'?'en':'zh';
  const clauses=source.split(/\r?\n|[。！？；;]|(?<=[.!?])\s+|[，,](?!\d)/).map(s=>s.trim()).filter(Boolean);
  const say=(z,e)=>enZh(lang,z,e);
  const unknown=/待定|未定|没定|不确定|不清楚|再说|商量|不限|无限|TBD|unknown|unlimited|not decided|not set/i;
  const facts={}; const questions=[];
  for(const f of fields){
   const evidence=clauses.find(c=>f.rx.test(c)&&f.concrete.test(c)&&!unknown.test(c)&&!/^\s*(?:无|没有|未|no\s)/i.test(c));
   facts[f.id]=evidence||null;
   if(!evidence) questions.push({id:f.id,question:say(f.qz,f.qe),answer:''});
  }
  const deliverables=rules.flatMap(r=>{
   const evidence=clauses.find(c=>r.rx.test(c)&&!/(?:不需要|不要|无需|不做|no need|do not need|without)\s*[^。；;]{0,8}$/i.test(c.split(r.rx)[0]));
   return evidence?[{id:r.id,name:say(r.zh,r.en),evidence,acceptance:say(r.az,r.ae),confirmed:false}]:[];
  });
  if(!deliverables.length) deliverables.push({id:'custom',name:say('自定义交付项','Custom deliverable'),evidence:clauses[0],acceptance:say('填写实际交付物、数量、格式，以及可重复检查的完成条件。','Define the actual output, count, format and repeatable completion checks.'),confirmed:false});
  const risks=[];
  function requestedFeature(clause,rx){
   return clause.split(/但是?|不过|然而|\bbut\b|\bhowever\b/i).some(part=>{
    const match=rx.exec(part);
    if(!match)return false;
    const prefix=part.slice(0,match.index);
    const suffix=part.slice(match.index+match[0].length);
    return !/(?:不需要|不要|无需|不做|不用|without|\bno\b|\bnot\b|do not need|don't need)[^。！？；;]{0,30}$/i.test(prefix)
     && !/^\s*(?:功能|接口)?\s*(?:不需要|不要|无需|不做|is not required|not needed)/i.test(suffix);
   });
  }
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
  return {version:1,lang,source,facts,questions,risks,deliverables,milestones:[
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
  out+=`\n## ${s('交付与验收清单','Deliverables and acceptance')}\n\n`;
  for(const d of r.deliverables) out+=`### ${clean(d.name)} — ${d.confirmed?s('已确认','User-confirmed'):s('待确认','To clarify')}\n\n${clean(d.acceptance)}\n\n${s('来源','Source')}: ${clean(d.evidence)}\n\n`;
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
 const api={analyze,toMarkdown}; if(typeof module==='object'&&module.exports) module.exports=api; else root.BriefCheck=api;
})(typeof globalThis!=='undefined'?globalThis:this);
