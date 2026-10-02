# BriefCheck: two further iterations

Authorized on 2026-10-02: publish completed work, search additional hackathons, compare similar products, and perform at least two further iterations. No entrant biography or learning experience is inferred.

## Documentation comparison

These are comparisons with official product documentation, not trials of paid competitor accounts. No claims about competitor speed or extraction accuracy are made.

| Product | Documented workflow | Useful lesson for BriefCheck |
| --- | --- | --- |
| [Bonsai proposals](https://help.hellobonsai.com/en/articles/5616844-all-about-proposals) and [services library](https://help.hellobonsai.com/en/articles/12824095-services-library) | Proposals organize scope, timeline and budget; saved services can be reused. | A category detector cannot replace editable, reusable project scope. |
| [Plutio proposals](https://help.plutio.com/help/proposals-overview) | Block-based proposals, status filters, signatures and conversion to projects/invoices. | Keep more than one project and distinguish answered questions from unresolved ones. |
| [Proposify client preview](https://support.proposify.com/hc/en-us/articles/4845167361051-Page-Breakdown-Client-Preview) | Client preview, share controls and PDF download. | Offer a portable client-facing document without requiring the editing application. |

BriefCheck focuses on traceability from an informal brief and offline editing. It has no payments, electronic signatures, client accounts or CRM integration. Those are substantive advantages of the documented commercial workflows; a local checkbox does not replace a signature.

## Baseline: version 1

Commit f0c13dca045272df7d696a6d48aa0bc0ea5ce35d. Nine tests and one draft. Known gaps: first-match fields hide competing values; optional outputs appear mandatory; missing-field count ignores answers; custom scope cannot be edited; regeneration loses edits; there is no project library or JSON import.

## Iteration 1: version 2

Target: competing budget/revision/final-deadline statements stay unresolved and retain both pieces of evidence; optional deliverables have a separate scope; negated deliverables are excluded; answers reduce unresolved count; custom items can be added and removed. Keep original facts distinct from user answers.

## Iteration 2: version 3

Target: separate local projects, bounded JSON import with source reanalysis, retained edits on regeneration with confirmation reset, visible before/after comparison, portable HTML client view. Preserve version-1 browser drafts through migration. Include real browser checks and a final limitation review.

## Measurement

Freeze a regression set before fixes. Run the same set against each git version. Count passing behavioral cases; do not claim statistical precision or real-world model accuracy from this small hand-written set. Record version-specific test results, browser export/import checks and remaining failures here after implementation.

Version 2 result: fixed 12-case benchmark 12/12, versus version 1's 6/12; all 12 unit tests pass. Browser checked conflict evidence, optional scope, unanswered count, custom-name/criteria restoration and desktop width. Remaining work addressed in version 3: multi-project storage, import, revision retention/comparison and client export.

Version 3: fixed benchmark remains 12/12; 18 tests pass. Browser verified separate projects across refresh, retained criteria after source change, cleared confirmation, budget/scope differences, real MD/JSON/HTML downloads and JSON import. Client HTML had only its local document request, zero subresources. Mobile width 390 equals document width 390; desktop 1440 equals document width 1440. English asset ownership and comma-separated date-year evidence gaps found in visual review were corrected with tests. Competitor comparison uses official documentation, not logged-in trials.

Remaining gaps: complex clauses; semantically equivalent deadlines can trigger conflict; changed-source regeneration can restore removed generated items; no screen-reader usability study or broad browser coverage; per-keystroke library storage has no large-library latency measurement. No customer trial or market validation is invented.
