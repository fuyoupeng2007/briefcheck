---
doc: prd
status: draft
---
# BriefCheck — proposed product requirements

Source: `scope.md > The Unique Kernel`, `The Core Loop`, `The POC Boundary`. All design and behavior choices below are agent proposals awaiting final review.

## The Core Journey
1. Open the workspace, choose Chinese or English, enter a project name and client brief or load a fictitious sample.
2. Generate a report with deliverables, missing tracked fields, source clauses and scope reminders.
3. Review source evidence before acting on a suggestion.
4. Edit suggested criteria and mark only agreed items confirmed. Record answers without overwriting the original source facts.
5. Refresh to recover edits and confirmation state.
6. Download Markdown or JSON containing the original brief and current report, or print through the browser.

## Screens and Layout
One page. Desktop: sticky input panel on the left, report on the right. Mobile: stacked input and report. First-use empty state explains the journey. Results show counts, source details, editable criteria, questions, reminders, milestones and export controls in order.

## Look and Feel
Agent-proposed cream and forest green palette, restrained lime status accents, serif headline, readable sans-serif controls, subtle borders. No external font requests or assets. Controls have labels and keyboard focus; status feedback is announced.

## Features and Behavior
### Evidence and missing fields
Missing budget, date, revision count, acceptance criteria and asset ownership become questions. Matching details display source wording without invented numeric values. “Acceptance payment” alone is not acceptance criteria.

### Editable acceptance
Recognized deliverables get suggested acceptance text and source evidence. Criteria can be edited; all start unconfirmed. Editing resets confirmation. Confirmation records a user action, never automatic client approval.

### Draft and freshness
One draft saves locally, including source, edits, answers, language and title. Changed source disables exporting an old report. Regeneration warns before overwriting edited work. Clearing requires a confirmation dialog. Blocked local storage reports the need to export.

### Export
MD and JSON preserve source evidence, full brief and edited report. Filenames follow the project title with invalid path characters replaced. Printing uses a print stylesheet. Downloads need no server-side upload.

### Language
All interface and rule-generated guidance supports Chinese and English. Toggling retains handwritten edits and answers. A translated suggestion loses its old confirmation because its wording changed.

## States and Boundaries
- Empty input: show a prompt without producing a report.
- Input limit: 20,000 characters.
- No known deliverable: provide one customizable item using source evidence.
- No triggered reminder: say so; do not claim no risk exists.
- Returning: restore a draft; malformed storage is not executed as HTML.
- Stale report: visible banner and disabled export/print.

## Product Decisions
The user chose Devpost and autonomous completion before final review. They have not chosen the project identity, visual style or individual features. Those are explicitly proposed by the agent.

## What We're Building
The complete journey above, zero external network dependencies, factual technical documentation and an actual screen recording for review.

## Deferred From the POC
Cloud publishing, accounts, multi-project storage, import, model inference and automatic client communications.

## Open Questions
Final approval, eligibility and learner-written submission copy are pending. They do not block local development under the user's instruction; they do block claiming a completed contest entry.
