# BriefCheck

An offline acceptance workspace for freelancers. Turn an English or Chinese client brief into a source-backed checklist, clarify competing terms, retain edits across revisions, and export a portable client document.

## Try it

Open `index.html` directly, or run `npm start` and open http://127.0.0.1:4317. Node 20+ recommended. No npm install, API keys, fonts, dependencies or runtime network requests. Browser storage is more consistent with the loopback server than file URLs.

## Version 3 workflow

1. Choose the Website sample and generate. Samples are fictional.
2. Review source facts, competing statements, optional scope and unanswered questions.
3. Edit names and criteria, add custom scope, and record answers. Answers remain distinct from source facts.
4. Confirm criteria. Editing a name or criterion clears confirmation.
5. Change the budget in the source and regenerate. Matching written criteria and answers stay; confirmation resets. Compare the two revisions.
6. Create a second project, switch projects, and refresh to restore work.
7. Export JSON and import it as a new project. Import reanalyzes source facts and bounds editable fields.
8. Export Markdown, standalone HTML client preview, or use browser Print / PDF.

Source changes block export until regenerated. Up to 20 local projects; JSON import limited to 1 MB. Version-1 drafts migrate automatically. Clear/delete ask for confirmation.

## Two further iterations

Version 2 added competing budgets/revisions/final deadlines, optional scope, unanswered counts and editable/custom deliverables. Version 3 adds the project library, import, retained criteria, before/after differences and escaped script-free HTML. Visual review also corrected date-year evidence and ordinary English copy ownership.

[Iteration log and competitor comparison](devpost/ITERATIONS.md). The fixed 12-case regression set passed 6/12 on version 1, 12/12 on version 2 and 12/12 on version 3. This small hand-written set is not a real-world accuracy estimate. Eighteen final unit tests cover additional revision, import and export behavior.

## Honest limits

Runtime uses transparent rules, not an LLM. Complex conditions, negation, installments, equivalent dates and mixed clauses may be classified incorrectly. Conflicts are flagged, not resolved; deadline comparison is textual. Suggested milestones have no assigned dates. New-source regeneration can restore previously removed rule-generated items; manually added items remain.

Checkmarks record local user actions, not client signatures. No accounts, payments, sync, CRM integration or legal-agreement guarantees. Client HTML includes the full brief and answers: review before sharing. Storage denial, quota, private browsing or clearing browser data can prevent restoration; keep exported backups. The whole library is saved on each edit; large-library typing latency is unmeasured. Only Chromium was tested, with no broad compatibility certification.

## Verification

Run `npm test`, `npm run benchmark` and `node --check` on app.js, core.js and server.cjs. No installation needed. [VERIFICATION.md](VERIFICATION.md) records actual browser checks. No lint/type checker configured. The optional loopback server serves only five application files.

## Planning and provenance

New work began 2026-10-01. The [Build With AI: Basics](https://learn-ai-basics.devpost.com/) planning documents use the official [Devpost Learn Skill Pack](https://github.com/challengepost/learn-ai-basics), consulted before implementation. The user requested autonomous creation, then authorized publishing and further iterations. No learner interview, personal reflection or intermediate approval is fabricated; [PROCESS.md](devpost/PROCESS.md) discloses the curriculum deviation.

Codex assisted with all code, design, fictional examples and documentation. Runtime is not model inference. No unrelated existing project code, stock imagery, music or external API service was included. Official skill files were consulted, not redistributed. Contest entry status requires an actual Devpost receipt independently of repository publication.

License: MIT.
