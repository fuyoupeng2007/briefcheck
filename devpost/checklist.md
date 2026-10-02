---
doc: checklist
status: draft
---
# Build Checklist

Build mode: autonomous implementation under the user's explicit instruction; final learner review pending. No learn/fast-mode participation is claimed.

## Slices

- [x] **1. A brief becomes a traceable editable checklist**
  Becomes usable: Client text produces source details, deliverables, questions and reminders in English or Chinese.
  Why now: Proves the unique kernel before adding sharing or infrastructure.
  PRD ref: `prd.md > Evidence and missing fields`, `Editable acceptance`
  Spec ref: `spec.md > Rule engine`, `Workspace`, `Presentation`
  Build: Application shell, phrase rules, source evidence and editable criteria.
  Verify (mechanical): Core tests; browser sample generation; desktop/mobile layout inspection.
  Learner check: Open the app, choose Website, inspect missing budget and exact reminder evidence.
  Commit: `feat: turn freelance briefs into traceable acceptance checklists`

- [x] **2. Agreed edits survive refresh and export**
  Becomes usable: Edited criteria, answers and confirmations persist; MD/JSON preserve source and changes.
  Why now: Makes the checklist useful outside the current screen without a cloud service.
  PRD ref: `prd.md > Draft and freshness`, `Export`, `Language`
  Spec ref: `spec.md > Data Model`, `Data Flow`, `Workspace`
  Build: Browser draft, freshness check, download and print actions.
  Verify (mechanical): Edit/confirm/answer/reload, download both formats, stale-source export disable before and after reload.
  Learner check: Replace one standard with your own, mark it confirmed, refresh and inspect the exported file.
  Commit: `feat: turn freelance briefs into traceable acceptance checklists`

## Hands-on Checkpoints
- [ ] Learner tries the candidate and gives observations; planned for final approval session.
- [ ] Final kick-the-tires exploration and feedback completed.

## Final Review
- [ ] User approves or requests changes to project identity, behavior, planning docs and MIT publication.
- [ ] Final review complete — feedback resolved and learner confirms ready to ship.

## Code Tour and App Map
- [ ] Learning activity completed by learner; unperformed.
- [ ] Optional edit/transfer reflection addressed; unperformed.
- [x] `devpost/app-map.html` generated from actual code as a reference route.

Activity and evidence: Mechanical agent verification is recorded in VERIFICATION.md. It is not learner practice.
Route and stops: `app.js > generate` → `core.js > analyze` → `app.js > render/download`, reference-only.
Edit outcome: Unperformed by learner.
Reflection: Unestablished; no response fabricated.
Activity mode: Reference map provided for review, no guided activity claimed.

## Revisions
- Acceptance extraction now requires criteria wording; an observed browser result incorrectly treated “验收后付余款” as a standard. A failing regression test demonstrated the issue before correction.
- The first browser pass exposed a JavaScript syntax error in two append calls. Syntax verification was added and the calls corrected before delivery.
- Contrastive clauses now preserve explicitly requested payment/login features when the other feature is negated; the original behavior failed a focused regression.
- A brand reference no longer creates a separate design deliverable; recognition requires an actual design-output phrase.
