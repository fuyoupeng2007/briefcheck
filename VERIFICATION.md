# Verification evidence

## Version 3 evidence (2026-10-02)

Supersedes version-1 counts below: 18 tests, fixed 12-case benchmark 12/12 (v1 6/12, v2 12/12). Browser verified conflicts, optional/custom scope, reduced unanswered count, project switching/reload, criteria preservation and confirmation reset, revision differences, actual MD/JSON/HTML downloads and JSON import. Client HTML had one local-document request and zero subresources. Desktop 1440/mobile 390 widths showed no overflow. Ignored qa/v3-* files hold fictional exports/screenshots. Date-year and copy-ownership gaps were corrected. Original 70.4-second video below shows version 1 only. Formal contest entry requires a receipt.

Completed locally on 2026-10-02. Original build began 2026-10-01. No live deployment or contest submission is claimed.

## Core behavior

`npm test`: 9 tests passed, 0 failed. `node --check app.js`, `core.js`, `server.cjs`: passed.

Covered: missing terms stay unknown; matching details are source substrings; unknown/negated terms; English and mixed deliverables; brand references do not invent separate design work; blank/oversized input; acceptance-payment distinction; contrastive login/payment negation; export preserves user edits and confirmation.

Proof-first observations:
- Initial tests failed with missing core implementation before code existed.
- Acceptance-payment regression failed with actual `验收后付余款`, then passed after the matching rule required criteria wording.
- Contrastive negation regression failed because a negative login phrase removed the positive payment reminder, then passed after feature matching was limited to contrast segments.
- Brand-reference regression failed because merely referencing a coffee brand created a visual-design deliverable, then passed after recognition required an actual design output.

No existing suite was present in this newly initialized repository. Core behavior uses Node's built-in runner. UI rendering and downloads were verified in a real browser instead of implementation-mirroring DOM unit tests. No lint or static type checker is configured.

## Browser journey

Real Chromium / Playwright, desktop 1440×900 and mobile 390×844:
- Website sample generates source details, suggestions, missing-field questions and reminders.
- Editing, checking a criterion and filling an answer survive reload.
- Editing a confirmed criterion clears confirmation.
- Language toggle retains handwritten criteria and answers.
- Real MD and JSON downloads were saved and read back; edits and source remain present.
- Source edits disable exports and printing, including after reload.
- Clear-draft action removes its localStorage entry.
- HTML-looking source renders as text; no injected image element or script executes.
- Mobile document width equals the viewport: no horizontal overflow.
- Print-media screenshot inspected: controls omitted, report content visible. The OS print dialog and PDF save were not automated.
- Optional loopback server returns 404 for the private learner-profile path.
- Direct `file://` entry generates a report without a server.
- Standalone app-map opens offline.
- Final isolated browser check recorded no page JavaScript errors.

The final brand-reference correction was followed by the full core suite and the real Chinese sample, now showing two actual deliverables. The recorded English sample's outputs remain unchanged by this correction.

## Review

Three completed read-only reviews using ce-simplify-code personas:
- Reuse: applied Set-based evidence deduplication; order and string equality preserved.
- Quality: fixed contrastive negation with failing regression evidence. Positional risk-definition refactor and unused translation-key removal deferred as low-impact cleanup.
- Efficiency: considered debounce of localStorage writes; deferred because this bounded one-draft prototype showed no measured lag and immediate-save timing is part of current behavior. A later optimization should measure typing latency and explicitly test close/reload durability.

No independent security audit or broad browser-compatibility certification is claimed.

## Video

Done: `../BriefCheck-demo.mp4` — 70.4 s, 1600×900, 25 fps, H.264, no audio.

Steps: actual browser recording → FFmpeg skill YouTube export preset preserving source dimensions.

Check: 8 PASS, 2 WARN, 0 FAIL. Warnings are no audio and no subtitle track; the silent screen recording shows the English interface and actual edits/download/reload. No narration or copyrighted music was added.

Look: `qa/demo-contact-sheet.png` inspected at six moments: initial workspace, generated report, edited and confirmed acceptance, client answer, scope reminders/milestones and recovered draft.

Notes: recording finalized successfully before the interrupted turn; it is preserved and converted without trimming. Its duration is below the event's three-minute limit. Public YouTube/Vimeo upload remains pending.

## Review artifacts

`qa/` contains raw recording, screenshots and fictional sample exports. It is ignored by Git and omitted from the source ZIP. A user-facing preview and MP4 live beside the source directory. The ignored learner profile is also excluded from publication and the source ZIP.
