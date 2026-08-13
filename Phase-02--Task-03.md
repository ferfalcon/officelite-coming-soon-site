---
artifact: TASK
id: P02-T03
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 02 — Task 03: Build the static Sign Up composition and form hooks

## 2. Objective

Produce a buildable, responsive `/sign-up/` route with the approved content hierarchy, shared countdown, five persistent labeled native controls, exact plan choices, semantic validation/status placeholders, and stable controller hooks—without implementing query, validation, busy, announcement, or persistence orchestration yet.

## 3. Source References

- Design: `SRC-DS-001` Sign Up `2141:2386`, interaction states `2141:2949`; frames `2141:1680` 1321, `2141:1896` 768, `2141:1940` 375.
- Repository/document: `SRC-REPO-001`, `SRC-DOC-001`; assets through prerequisite output; runtime None.
- Decomposition verification: `VER-025`–`VER-028`.
- Plan/review: static-composition portion of `PLAN-005`; `PLANREV-004` mandates this sequential split.
- Requirements: `REQ-FR-002`, `REQ-FR-003`, `REQ-FR-005`, `REQ-FR-006`, `REQ-NFR-001`, `REQ-NFR-002`, `REQ-AR-001`–`REQ-AR-003`.
- Specifications: `SPEC-BEH-002`, `SPEC-BEH-003`, `SPEC-BEH-007`, `SPEC-BEH-008`, `SPEC-INT-001`, `SPEC-INT-003`, `SPEC-ACC-001`–`SPEC-ACC-004`, `SPEC-DATA-001`.
- Design: `DES-RWD-004`–`DES-RWD-006`, `DES-INT-003`, `DES-INT-007`.
- Architecture: `ADR-001`–`ADR-003`, `ADR-005`, `ADR-006`.
- Related tasks: requires `P01-T01`, `P01-T02`; prerequisite for `P02-T04`, which owns follow-up form edits.

## 4. Snapshot Verification

- Before start, reverify exact Sign Up frames/states and classify completed Phase 01 output as Expected previous-task output.
- Rebaseline task-start repository as required; stop for unexpected `sign-up.astro`, `SignupForm.astro`, shared form asset, or component change.

## 5. Prerequisites

- `P01-T01` and `P01-T02` Complete with approved outputs.
- Shared Layout/Brand/Countdown, plan data, confirmed Sign Up background/arrow assets, and global form/focus tokens are stable.
- No concurrent work on `SignupForm.astro`.

## 6. Scope

### Included

- `/sign-up/` route with brand-home link, intro/launch content, shared countdown, form region, and supplied responsive composition.
- Native `form novalidate`, inputs for Name/Email/Phone/Company, native Plan select with exactly Basic/Pro/Ultimate, persistent labels, required/email/input/autocomplete semantics.
- Empty inactive inline error elements and one inline status region with stable IDs/data hooks for later controller ownership.
- Static Basic default; controller integration intentionally deferred.

### Excluded

- Query initialization, field error timing/copy mutation, first-invalid focus, `aria-invalid` mutation, busy/status announcements, IndexedDB, network prevention controller, or success/failure behavior.
- Custom select/widget, extra validation patterns, or concurrent follow-up editing.

## 7. Repository Context

- No Sign Up route/form/controller exists in the pinned repository.
- Astro file routing supports `src/pages/sign-up.astro` as `/sign-up/` under static output.
- Shared route shell, plan data, Countdown component/controller, and visual tokens arrive from Phase 01.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/src/pages/sign-up.astro` | Create | Proposed | Route hierarchy, responsive composition, shared script entry hooks |
| `frontend/src/components/SignupForm.astro` | Create | Proposed | Native five-control markup, exact options, inactive errors/status hooks |
| `frontend/src/components/{Brand,Countdown}.astro` | Consume | Prior output | Shared brand/countdown contracts |
| `frontend/src/assets/officelite/sign-up/**` | Consume | Prior output | Approved background and select-arrow roles |

## 9. Dependencies and Interfaces

- Form hooks must name every control/error/status relation stably for `P02-T04`; do not bind active invalid/busy/live-region state statically.
- Plan select option values align exactly with `plans.mjs` canonical values.
- Form `novalidate` suppresses browser-owned bubbles while retaining native constraint APIs for the later controller.
- `P02-T04` exclusively owns follow-up `SignupForm.astro` integration changes after this task commits.

## 10. Implementation Steps

1. Verify/rebaseline inputs and inspect full Sign Up design context before coding.
2. Define stable semantic form/controller hooks and document them in the component contract.
3. Build the route hierarchy and compact-first static form with native attributes and exact choices.
4. Integrate shared countdown visually without a live region and brand link to `/`.
5. Implement stacked 375/768 outcomes and first-readable split transition toward 1321; preserve DOM/focus order.
6. Exercise keyboard/native controls, labels, default/no-error state, long placeholder/status content, and responsive stress widths.
7. Run shared tests/build; commit static result and record output snapshot for `P02-T04`.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Untouched/default static form: no visible error, `aria-invalid`, busy, pending, success, or failure state.
- Hover/focus appearance supports the demonstrated closed native controls; open options remain platform-owned.
- Placeholder error/status regions can expand without overlap but are inactive until controller work.

### Responsive behavior

- 375 and 768 remain stacked/readable; 1321 uses approved intro/form split.
- Choose split at first stable readable width, record interval/adjacent evidence, cap the form, and preserve wide whitespace.
- Long labels/errors/status and narrow countdown cause no layout scroll; use 2×2 countdown only on observed failure if needed.

### Accessibility

- English route metadata, one `h1`, meaningful landmarks, persistent associated labels, exact native input types/select/options, `required`, `type=email`, approved autocomplete purposes, no unapproved pattern.
- Logical DOM/focus order, keyboard-native select behavior, visible focus, inactive error relationships, and non-live countdown.

## 12. Validation

### Automated

- `pnpm test`: shared plan/countdown tests remain passing.
- `pnpm build`: `/sign-up/` builds with no controller/persistence dependency.

### Manual

- DOM/accessibility inspection of route, headings, labels, types, required/autocomplete attributes, exact options, inactive error/status hooks, and `novalidate`.
- Keyboard traverse/select operation; screenshots at 375/768/1321 plus recorded split/stress widths and Default/Hover/Focus checks.
- Confirm no submission behavior is falsely claimed in this task.

## 13. Acceptance Criteria

- [ ] Static portions of `AC-003`, `AC-006`, `AC-010`, `AC-011`, `AC-027`–`AC-030`, `AC-034`–`AC-037`, `AC-039`, `AC-044`–`AC-046` pass.
- [ ] Five persistent labeled native controls and exactly three plan options exist in approved order.
- [ ] Untouched form exposes no active error/busy/status state; stable hooks support later exact behavior.
- [ ] Supplied and first-failure-derived responsive outcomes are recorded with no clipping/overlap/layout scroll.
- [ ] Tests/build pass and the output snapshot is ready for the strictly later controller task.

## 14. Risks and Considerations

| Risk | Impact | Mitigation |
|---|---|---|
| Hooks do not support controller behavior | Rework | Define exact ID/data contracts against `SPEC-INT-004`–`006` before commit |
| Static attributes activate errors too early | Accessibility failure | Keep error relationships/state inactive until controller exposes them |
| Native select differs by platform | False visual claim | Validate semantics/options/focus and only closed approved styling |
| Concurrent follow-up edits | Integration conflict | Enforce `P02-T04` prerequisite and exclusive follow-up ownership |

## 15. Implementation Discoveries

Record hook insufficiency, design/content mismatch, or responsive deviation in the owning upstream artifact/task before follow-up work.

## 16. Deviations

None at decomposition.

## 18. Definition of Done

- [ ] Static objective, acceptance subset, tests/build, responsive/visual/accessibility/keyboard checks pass.
- [ ] Source/task baseline and output lineage are current.
- [ ] Hook contract and sequential ownership are documented; no orchestration is prematurely claimed.
- [ ] Discoveries/deviations/risks are current for `P02-T04`.

## 19. Completion Report

Complete after implementation with files, hook contract, widths/evidence, snapshots, validation results, deviations, and readiness for `P02-T04`.
