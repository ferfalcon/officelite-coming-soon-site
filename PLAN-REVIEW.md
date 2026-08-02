# Officelite Coming Soon Site — Plan Review

## 1. Document information

- **Status:** Stage 8 complete
- **Review date:** 2026-08-02
- **Project:** Officelite coming soon site
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Application root:** `frontend/`
- **Reviewed plan:** `PLAN.md` version 0.1
- **Updated plan:** `PLAN.md` version 0.2
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Workflow stage:** Stage 8 — challenge and refine the implementation plan
- **Primary sources:** `FIGMA-AUDIT.md`, `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, `DOCUMENT-REVIEW.md`, `ARCHITECTURE.md`, `PLAN.md`, the current repository, `Figma-to-Implementation Workflow.md`, and `Document-Guidelines-PLAN.md`

## 2. Review purpose

This review challenged whether `PLAN.md` can be decomposed into executable implementation tasks without forcing a coding agent to invent major behavior, repository paths, validation rules, state handling, deployment assumptions, or data policy.

The review examined:

- repository accuracy;
- hidden dependencies;
- phase and task ordering;
- task granularity;
- integration boundaries;
- state, responsive, accessibility, and validation coverage;
- IndexedDB schema, testing, and recovery;
- security and privacy risks;
- deployment and rollback work;
- requirement and specification traceability;
- unresolved stakeholder decisions.

## 3. Review method

### Pass 1 — Adversarial completeness and feasibility

The first pass compared the plan against:

- the current nested Astro application;
- all confirmed requirements and specifications;
- architecture decisions `AD-001` through `AD-010`;
- the six Figma production frames and interaction-state evidence;
- the Stage 9 task-file naming convention.

Each phase was challenged for incorrect assumptions, false serial dependencies, missing states, missing test boundaries, work that was too broad, and release risks.

### Pass 2 — Updated-plan end-to-end review

After corrections, the second pass rechecked:

- task identifiers and dependencies;
- phase numbering and traceability;
- source-file impact;
- test isolation and repeatability;
- navigation, validation, persistence, and feedback flows;
- privacy and deployment gates;
- rollback implications for both static code and persistent browser data.

## 4. Findings and resolutions

| ID | Finding | Impact | Resolution | Change made to `PLAN.md` | Remaining risk |
|---|---|---|---|---|---|
| `PR-001` | The plan began with Phase 0 and task IDs such as `P0-01`, while Stage 9 requires zero-padded task files beginning with `Phase-01--Task-01.md`. | Task decomposition would need an unnecessary translation layer and could create inconsistent phase references. | Align plan phases directly with the task-file convention before task files exist. | Renumbered phases 0–9 to 1–10 and all task IDs to `P1-*` through `P10-*`; updated dependencies, critical path, traceability, and review text. | None. |
| `PR-002` | Sign Up was described as depending on completed Home and countdown phases even though architecture permits parallel page slices after shared foundations. | Unnecessary serialization would delay the form and hide opportunities for smaller parallel work. | Make Home, countdown logic, and Sign Up separate branches after the shared foundation. | Updated phase overview, critical path, and parallel-work rules. Sign Up structure can begin after Phase 3 and does not wait for Home completion or an approved live countdown target. | Shared components still require coordination when changed by both page slices. |
| `PR-003` | The shared `Countdown.astro` component was located inside the Home phase, creating a hidden Home dependency for Sign Up. | Sign Up could not truthfully begin after shared foundations. | Move shared static countdown markup into the runtime-foundation phase; keep dynamic behavior in the countdown phase. | Added `P3-09`, removed the Home-owned countdown task, and updated Home/Sign Up dependencies. | None. |
| `PR-004` | Home browser tests were described as navigation tests before `/sign-up/` existed. | Tests could treat a 404 navigation as success or make Phase 4 fail for a route intentionally created later. | Test the Home link contract first, then test actual navigation after Sign Up exists. | `P4-07` now verifies anchor semantics and `href` values; full pointer/keyboard navigation closes in `P6-08`. | None. |
| `PR-005` | The plan required custom associated validation messages but did not define how native browser constraint validation would avoid intercepting form submission. | Browser bubbles could prevent the controller from running, producing inconsistent validation and accessibility behavior. | Retain native input types and `required`, add form `novalidate`, and use controlled validation rendering. | Updated `P6-01`, Phase 7 validation tasks, risks, and review checks. | Native validity behavior can vary at browser edges and remains part of browser testing. |
| `PR-006` | “Native email syntax” was assigned to a pure validator without defining the DOM-to-pure boundary. | An implementer might add a custom regular expression, contradicting `SP-VAL-002`. | Read `ValidityState.valueMissing` and `ValidityState.typeMismatch` in the DOM adapter and pass the result into pure validation. | Refined `P7-01` and its unit/browser validation. | The final browser-support matrix remains open under `G-007`. |
| `PR-007` | Sign Up state work covered fields and select but omitted the primary submit button’s supplied default, hover, and focus states. | The completed page could miss a demonstrated interactive state and fail visual/accessibility review. | Treat the submit button as part of the primary-button component family. | Expanded `P6-07` to cover fields, native select, and submit button using Figma component `10:526`. | Accepted contrast deviation remains. |
| `PR-008` | Phase completion language claimed Home and Sign Up matched final compositions before font, dynamic countdown, feedback design, and optional Plan supporting text were resolved. | The plan could falsely close visual work while known gates remained. | Separate base structural fidelity from final visual sign-off. | Qualified Phase 4 and Phase 6 completion evidence and reserved final sign-off for Phase 9. | Final fidelity remains dependent on `G-001`, `G-002`, `G-003`, and `G-008`. |
| `PR-009` | The plan did not explicitly verify `SP-DATA-002`, which requires a committed IndexedDB record to remain after reload. | A transient in-memory or incorrectly scoped implementation could pass transaction tests but violate persistence behavior. | Add a real-browser reload durability test. | Added `P8-09`, updated phase evidence, required scenarios, browser-flow matrix, and Definition of Done. | Browser data can still be cleared by the user/browser, as allowed by the specification. |
| `PR-010` | IndexedDB browser tests lacked explicit database cleanup and failure-injection boundaries. | Tests could become order-dependent, leak records between scenarios, or add production-only test hooks. | Use fresh contexts, clear the test database before each scenario, and inject failure before app code using browser initialization overrides. | Expanded the E2E helper responsibility and added `P8-09`; updated risks and quality criteria. | Browser-engine differences in IndexedDB failure simulation remain exploratory until `G-007`. |
| `PR-011` | Approved secondary Plan text could tempt an implementation to place rich markup inside native `<option>` elements or replace the popup. | This would be inconsistent across browsers and could violate the confirmed native-select requirement. | If approved, render secondary text as a non-interactive sibling in the closed-control wrapper; otherwise omit it. | Refined `P9-02` and kept `G-008` explicit. | Exact labels and design remain unapproved. |
| `PR-012` | One hardening task combined visual review of all six frames and all interaction states. | The task was too broad for one executable Stage 9 task and made evidence difficult to review. | Split the work by evidence set. | Replaced the broad task with `P9-10` Home review, `P9-11` Sign Up review, and `P9-12` interaction-state review. | Native select menu appearance remains platform-dependent. |
| `PR-013` | The repository contains a generated `frontend/README.md`, but the plan only updated the root README. | Starter paths and Astro starter claims would remain after the product implementation. | Treat both documentation entry points as migration work. | Added `frontend/README.md` to the file inventory, risk table, Phase 10 task, and Definition of Done. | The team may choose replacement or intentional deletion during implementation. |
| `PR-014` | Preview and browser-test commands did not explicitly manage long-running server processes or Playwright browser binaries. | Baseline and CI tasks could hang or fail in clean environments despite correct source. | Use controlled server start/probe/stop behavior and document browser installation. | Refined `P1-01`, `P2-01`, `P2-04`, `P10-01`, and `P10-05`. | Exact compatible package and browser versions remain implementation-time decisions. |
| `PR-015` | CI and deployment tasks did not consistently state that the executable application is nested under `frontend/`. | Commands could run at the repository root and fail or produce the wrong output. | Make the working directory explicit in CI and deployment evidence. | Updated the workflow file description, `P2-06`, `P10-04`, and `P10-05`. | External Vercel settings remain unverified under `G-009`. |
| `PR-016` | The privacy gate blocked “production sign-off” but did not constrain the data used in preview verification. | Real contact information could be entered into an environment without an approved notice, retention, or deletion policy. | Require synthetic data and no invitation for public submission until `G-006` is resolved. | Strengthened `P10-03` and `P10-04`. | Local records remain accessible to scripts on the same origin; dependency and script review remains required. |
| `PR-017` | Rollback work was limited to recording generic notes and did not address persistent IndexedDB data or schema compatibility. | Rolling back static code could leave incompatible browser data, and a careless rollback could silently clear user records. | Define code rollback separately from data recovery; never downgrade or automatically delete IndexedDB. | Added §22.6, expanded `P10-08`, added risks, and updated release completion evidence. | Future schema versions require new migration and recovery review. |
| `PR-018` | Traceability wording could be interpreted as requiring requirement IDs in every production source file. | This would add noisy comments without improving maintainability. | Keep traceability in task files, tests/coverage records, and review evidence; add source comments only for non-obvious contracts. | Refined the quality Definition of Done. | Stage 9 must preserve this distinction when authoring task files. |
| `PR-019` | Provisional validation/result messages were not explicitly constrained to safe text rendering. | Future content changes could create an unnecessary HTML-injection surface. | Use trusted content configuration and text-content APIs rather than `innerHTML`. | Refined `P7-04` and its validation evidence. | A future CMS or remote content source would require a separate sanitization review. |
| `PR-020` | The live deployment and external Vercel settings could not be independently verified during this review. | Deployment assumptions cannot be promoted to confirmed facts. | Keep deployment as an operational gate and require direct preview verification. | Retained `G-009`, `P1-04`, and `P10-04`; no checked-in deployment configuration was invented. | Production deployment remains blocked until access and settings are verified. |

## 5. Task granularity review

The updated plan contains 76 task rows across 10 phases.

The review did not merge tasks solely to reduce file count because most rows produce one concrete implementation or validation result and the project explicitly uses small, reviewable steps. One task was moved to the correct shared phase, and the single over-broad visual-review task was split into three evidence-focused tasks.

Task decomposition should not split rows further unless a row cannot be completed and reviewed in one focused change. Conversely, task files may combine tightly coupled code and its direct test when separating them would create an unverified intermediate state.

## 6. Coverage review

### Functional and state coverage

The updated plan covers:

- Home and Sign Up routes;
- generic and Plan-specific navigation;
- Basic fallback;
- native Plan selection;
- required and email validation;
- validation recovery;
- pending submission;
- transaction-completion success;
- storage failure and retry;
- sequential duplicate gate;
- visible/programmatic success and failure;
- countdown calculation, ticking, and catch-up;
- reload persistence;
- default, hover, and focus states;
- long content, missing decoration, narrow widths, zoom, and reduced motion.

### Requirement traceability

- All confirmed functional requirements `FR-001` through `FR-012` remain represented.
- Architecture decisions `AD-001` through `AD-010` remain represented.
- Persistence work now explicitly covers `SP-DATA-002`.
- Submit-button interaction evidence now covers the primary-button Figma component.
- The plan continues to preserve open and recommended specification behavior without presenting it as confirmed.

### Repository and migration coverage

The plan now covers:

- the nested `frontend/` working directory;
- both README files;
- starter source and asset removal;
- lockfile-controlled development dependencies;
- browser-binary setup;
- runtime asset ownership;
- version-1 IndexedDB schema;
- test-only database cleanup;
- static deployment and direct route loading;
- code rollback and persistent-data compatibility.

## 7. Remaining risks and gates

| Gate or risk | Current disposition | Task-decomposition impact |
|---|---|---|
| `G-001` — Placeholder launch timestamp/timezone | Open | Create the decision task and pure countdown tasks; page integration remains blocked. |
| `G-002` — Kumbh Sans delivery | Open | Structural and fallback-font work proceeds; final typography task remains blocked. |
| `G-003` — Error/result visual pattern and final copy | Open | Semantic slots and provisional understandable text proceed; final visual/copy task remains blocked. |
| `G-004` — Post-success form behavior | Open | Persistence and success detection proceed; final success-state controller/E2E assertion remains blocked. |
| `G-005` — Sequential duplicate policy | Open | Concurrent pending suppression proceeds; sequential repeated-success behavior remains blocked. |
| `G-006` — Retention/privacy disposition | Open | Local implementation and synthetic-data preview proceed; production use with real data remains blocked. |
| `G-007` — Browser matrix | Open | Standards-based implementation and one initial browser project proceed; compatibility claim remains blocked. |
| `G-008` — Plan supporting text | Open | Native select proceeds; optional sibling presentation remains blocked. |
| `G-009` — Vercel settings | Open | Local build proceeds; deployment completion remains blocked. |
| `G-010` — CI inclusion | Open | Local validation proceeds; repository automation remains optional. |
| Accepted color contrast deviation | Confirmed risk | Must remain documented; no full WCAG AA claim. |
| External live-site access unavailable during review | Operational limitation | Stage 9 deployment tasks must verify the actual site and settings. |

## 8. Validation performed

- Read the complete Stage 8 workflow and planning guideline.
- Reviewed the full current `PLAN.md` and all upstream project documents.
- Reinspected the current repository files relevant to the executable frontend and discovered the stale generated `frontend/README.md`.
- Reinspected Home, Sign Up, and interaction-state Figma frames.
- Compared the original and updated plan.
- Verified 76 unique task IDs across phases 1–10 with no numbering gaps.
- Verified eight planning decision IDs and ten gate IDs remain stable.
- Verified task-table column consistency and balanced Markdown code fences.
- Verified all 12 confirmed functional requirement IDs occur in the updated plan.
- Verified no remaining Phase 0 or Stage 7 readiness language.
- Verified task dependencies contain no missing or self-referential task IDs.
- Completed the required second end-to-end review after corrections.

## 9. Validation not performed

- No package installation was run.
- No Astro build, template check, unit test, browser test, or accessibility test was run.
- No Vercel setting or deployment was changed.
- The live site could not be fetched successfully from the available environment.
- No Figma content was modified.

These are implementation or external-access validations, not documentation validations.

## 10. Final readiness

**Ready with documented risks**

The updated plan is ready for Stage 9 task decomposition. The unresolved gates do not prevent creation of task files, but the affected task files must preserve their blocked status and must not invent final product, content, privacy, compatibility, or deployment decisions.
