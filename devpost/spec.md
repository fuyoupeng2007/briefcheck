---
doc: spec
status: draft
---
# BriefCheck — proposed technical specification

## Version 3 addendum (2026-10-02)

This supersedes the original one-draft boundary: 20 local projects in `briefcheck-library-v3`, migrated version-1 drafts; report v3 adds conflicts, evidence, optional and custom scope. `restore` reanalyzes source and bounds edits; `reconcile` preserves matching written criteria/answers with confirmation reset after source changes; `compare` records one previous source revision; `toHTML` escapes text and exports without scripts/assets. JSON imports up to 1 MB create a new project. Nonempty answers reduce unanswered count without rewriting facts. See ITERATIONS.md for comparative evidence.

## How This Works, In Plain Language
The browser splits the brief into clauses and checks a small set of documented phrases. It shows matching clauses as evidence, leaves missing information blank, and offers editable acceptance suggestions. The browser saves the current work locally and produces downloadable files. There is no external AI inference service.

## Stack
HTML, CSS and plain JavaScript. Optional Node.js loopback server. No installed application dependencies. Browser APIs: [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [object URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static), [printing](https://developer.mozilla.org/en-US/docs/Web/API/Window/print). Verification uses the [Node test runner](https://nodejs.org/api/test.html) and local Playwright tooling. These are agent choices made under autonomous development authorization.

## Components
### Rule engine — `core.js`
Implements `prd.md > Evidence and missing fields` and suggested `Editable acceptance`. `analyze` accepts source and language; returns facts, questions, reminders, deliverables and milestones. `toMarkdown` serializes the actual report without computing new agreement data. A classic browser script and CommonJS export use the same implementation.

### Workspace — `app.js`, `index.html`
Implements `prd.md > Editable acceptance`, `Draft and freshness`, `Export`, `Language`. DOM output uses textContent and form values for user data. Only hard-coded translation markup uses innerHTML. Editable report data remains in memory, persists in localStorage, and exports with the original source. Language changes rebuild rule-generated text and merge edits by stable item ID.

### Presentation — `styles.css`
Implements `prd.md > Screens and Layout`, `Look and Feel`. Two-column desktop and stacked mobile, visible focus, print stylesheet, no external assets.

### Optional server — `server.cjs`
Implements local run instructions. Fixed allowlist serves only application files; binding is 127.0.0.1. Source docs, Git state and local draft data are not served. Node [HTTP](https://nodejs.org/api/http.html) and [file system](https://nodejs.org/api/fs.html) are standard-library APIs.

## Data Model
Report version 1: `lang`, original `source`, five nullable string `facts`, `questions[{id,question,answer}]`, `risks[{id,title,detail,evidence}]`, `deliverables[{id,name,evidence,acceptance,confirmed}]`, `milestones[{name,detail}]`. Browser draft adds title and current editor brief, which can differ from the analyzed source. Source mismatch blocks export.

## Data Flow
Textarea → `analyze` → source-backed report → editable DOM → user changes report → one localStorage entry → downloaded Blob. Reload rebuilds derived guidance from the saved source and merges bounded handwritten edits and confirmations. No remote calls.

## File Structure
```text
index.html          # accessible page shell
styles.css          # responsive and print layout
core.js             # analyzer and Markdown export
app.js              # browser controls and local draft
server.cjs          # optional loopback server
package.json        # start/test commands; no dependencies
tests/core.test.cjs  # rule and export behavior tests
devpost/            # planning, process, map, pending review
README.md           # factual running instructions and limits
LICENSE             # proposed MIT release license
VERIFICATION.md     # mechanical evidence
```

## Where It Runs and How Someone Tries It
Open index.html directly, or run `npm start` and open http://127.0.0.1:4317. No npm install. Review uses the local server. The required demo can be recorded locally. Public repository and public YouTube/Vimeo video URLs must exist before submission; deployment is optional and unperformed.

## External Services
None at runtime. Devpost and GitHub were consulted during development to verify the event and read its required skill pack.

## Failure Modes and Limits
Empty/oversized input has visible feedback. localStorage denial shows a warning. Rule matching may miss uncommon dates, negations or conditional requests; manual review is mandatory. Confirmation is a user action, not evidence of client assent. Only one local project is saved.

## Verification
Core tests: missing terms, traceable details, unknown/negated wording, English and mixed deliverables, blank/oversized input, acceptance-payment distinction, exports preserving edits. Browser journey: samples, confirmations, edits, draft reload, both downloads, stale source after reload, language toggle, desktop/mobile widths, offline entry point and print view.

## Decisions and Open Issues
The actual learner's technical uncertainty is unestablished; no learning claim is invented. A concrete implementation uncertainty was verified: browser downloads preserve user-edited criteria and confirmation after refresh. Final planning approval, learner participation and submission eligibility remain open.
