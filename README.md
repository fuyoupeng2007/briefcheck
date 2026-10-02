# BriefCheck

An offline acceptance-checklist workspace for freelancers. Paste an English or Chinese client brief, review evidence-backed findings, edit suggested acceptance criteria, record client answers, and export the result.

## Try it

Open `index.html` directly in a modern browser. The app has no runtime dependencies, API keys or network calls. For consistent browser storage, use the local server:

```sh
npm start
```

Open http://127.0.0.1:4317. Node.js 20+ is recommended. No `npm install` is necessary. `PORT` can override the default port. The server binds to loopback only and exposes five application files, not the repository or draft data.

## Demo journey

1. Select English or Chinese, then choose the Website sample. Samples are fictitious.
2. Generate a checklist. Missing budget and deadline remain open questions.
3. Inspect the source wording under each deliverable and reminder.
4. Replace a suggested criterion with an observable check, then mark it confirmed.
5. Add an answer to an open question. Refresh to see the draft restored.
6. Export Markdown or JSON. Print / PDF uses the browser's own dialog.

Changing the original brief makes the current report stale and disables export until regeneration. Regeneration asks before replacing edited criteria or answers. Editing a confirmed criterion clears its confirmation. Switching languages keeps handwritten edits; translated suggestions must be confirmed again.

## What it does

- Extracts source clauses for five fields: budget, deadline, revision rounds, acceptance and asset ownership.
- Recognizes website/app, video, visual design, workflow and document deliverables; unrecognized work gets a customizable item.
- Flags subjective descriptions, unbounded revisions, payment, login and API dependencies, and mixed deliverables.
- Keeps missing data, suggestions and user-confirmed criteria distinct.
- Provides three suggested milestones without inventing dates or fees.
- Saves one draft in this browser's `localStorage`, with a clear-draft action.
- Exports the full original brief, source evidence, edits, answers and confirmation status.

## Honest limits

This is a rule-based tool built with AI assistance, not a language model or an AI negotiation agent. It does not understand arbitrary prose. Recognition covers common phrases in English and Chinese; uncommon dates, negations, contradictory budgets, conditional requests and mixed clauses may be missed or classified incorrectly. Detected details reproduce the first matching source clause, not a reconciled agreement. Open questions count missing tracked fields, not unanswered custom questions. A typed answer does not automatically change a source fact.

All suggestions require human review. A checkmark records the user's action, not proof that the client agreed. Clear local drafts on shared devices. Private browsing or browser settings can prevent draft storage; use exports as portable copies. Storage on `file://` can vary by browser; local-server use is preferable. No cross-device sync or project import is included.

## Verification

```sh
npm test
node --check app.js
node --check core.js
node --check server.cjs
```

Uses Node's built-in test runner, no framework installation. See `VERIFICATION.md` for browser evidence and reproducible review steps. There is no configured lint or static type checker.

## Planning and provenance

Created on 2026-10-01 for consideration in [Build With AI: Basics](https://learn-ai-basics.devpost.com/). `devpost/scope.md`, `prd.md` and `spec.md` were informed by the official [Devpost Learn Skill Pack](https://github.com/challengepost/learn-ai-basics), read before implementation. The user explicitly requested autonomous development followed by review, overriding the curriculum's intermediate interview and approval cadence. Planning documents retain `status: draft`; no learner interview or approval is fabricated. Eligibility, final learner-written submission fields, public repository and public video URL remain to be completed before submission. This is a locally verified candidate, not a submitted entry or a claim of organizer approval.

Code, styles and illustrative briefs were newly written with Codex. No existing project code, stock images, copyrighted music, third-party application code or API services were incorporated. Official skill files are not bundled in this source distribution. See `devpost/PROCESS.md` and `devpost/app-map.html`.

License: MIT.
