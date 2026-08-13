---
artifact: TASK
id: P01-T02
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 01 — Task 02: Implement shared plan and countdown rules

## 2. Objective

Produce dependency-free, deterministically tested plan-intent and countdown modules plus a reusable browser timer controller that can initialize multiple countdowns independently and permanently clamp at zero after the approved target.

## 3. Source References

- Baseline: `SOURCE-BASELINE.md`; `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`; runtime None; asset input only through `P01-T01` output.
- Decomposition verification: `VER-025`–`VER-028`.
- Plan/review: `PLAN-002`; approved `PLAN-REVIEW.md`.
- Requirements: `REQ-FR-005`, `REQ-FR-012`, `REQ-BR-001`, `REQ-BR-002`, `REQ-BR-006`.
- Specifications: `SPEC-BEH-003`–`SPEC-BEH-005`, `SPEC-DATA-001`, `SPEC-DATA-004`, `SPEC-ACC-004`.
- Design: `DES-INT-001`, `DES-INT-003`, `DES-INT-006`; Home/Sign Up countdown evidence in `SRC-DS-001`.
- Architecture: `ADR-002`, `ADR-005`.
- Related tasks: requires `P01-T01`; feeds `P02-T01`, `P02-T03`, and `P02-T04`.

## 4. Snapshot Verification

- Before implementation, verify active design/document inputs and classify the completed `P01-T01` repository output as Expected previous-task output.
- The CLI task baseline initially names `SRC-REPO-001`; update/rebaseline to the approved `P01-T01` output snapshot before start if required by canonical policy.
- Stop for unrelated or unexpected frontend changes.

## 5. Prerequisites

- `P01-T01` Complete with its output snapshot approved as the task-start state.
- Stable `Countdown.astro` hooks and shared package conventions.
- Approved target `2026-12-31T00:00:00-03:00` and permanent `00/00/00/00` expiry behavior.

## 6. Scope

### Included

- Canonical Basic/Pro/Ultimate plan data and exact lowercase query mapping with Basic fallback.
- Pure countdown remaining-time, ceiling, decomposition, formatting, clamp, and expired-state functions.
- Immediate browser update plus current-clock recalculation once per second; stop after expiry; support multiple instances.
- Node built-in test script and plan/countdown suites.

### Excluded

- Home/Sign Up composition, form selection mutation, validation, persistence, a remote time service, or third-party test/timer packages.

## 7. Repository Context

- No current plan/countdown module or test command exists at `SRC-REPO-001`.
- Existing package is ESM and Node 24 is verified, so `.mjs` production modules can be imported by `node --test` without new dependencies.
- `P01-T01` provides shared Countdown markup/hooks; this task must not broaden its visual responsibility.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/package.json` | Modify | Existing | Add exact `node --test tests/*.test.mjs` script |
| `frontend/src/lib/plans.mjs` | Create | Proposed | Canonical plans and strict query mapping |
| `frontend/src/lib/countdown.mjs` | Create | Proposed | Pure target-relative math and formatting |
| `frontend/src/scripts/countdown-controller.mjs` | Create | Proposed | DOM/clock/timer effect integration |
| `frontend/tests/plans.test.mjs` | Create | Proposed | Known/fallback/query cases |
| `frontend/tests/countdown.test.mjs` | Create | Proposed | Boundary, padding, catch-up, expiry cases |
| `frontend/src/components/Countdown.astro` | Modify only if needed | Prior output | Preserve visual contract; finalize controller hooks |

## 9. Dependencies and Interfaces

- Plan module returns canonical labels/values and never mutates URL or DOM.
- Countdown pure API accepts current clock and fixed target; controller injects clock/timer where useful and scopes queries per instance.
- Controller updates visual text only; countdown containers are not live regions.
- Routes consume modules later without introducing global state.

## 10. Implementation Steps

1. Verify/rebaseline to the expected `P01-T01` output and inspect hooks/package scripts.
2. Implement canonical plan records and strict query resolution.
3. Implement pure remaining-time calculation using future-second ceiling and non-negative decomposition.
4. Implement immediate/one-second controller updates, throttling catch-up, independent instances, and stop-at-zero behavior.
5. Add Node test script and deterministic suites, including exact target/timezone and permanent expiry.
6. Confirm no live-region or duplicate-announcement behavior and no dependency/lockfile change.
7. Run tests and production build; commit and record output snapshot.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Known query: matching canonical plan; absent/empty/unknown/mixed-case: Basic.
- Future timer: correct padded units; at/after target: permanent all-zero units; delayed timer catches up from current time.
- Invalid hard-coded target is an implementation failure, not a user-facing branch.

### Responsive behavior

- Value widths must not clip shared markup; route tasks own final layout/fallback decisions.

### Accessibility

- Countdown is visual text with stable labels and never a per-second live region.
- No focus, keyboard, or announcement side effect is introduced by timer initialization.

## 12. Validation

### Automated

- `pnpm test`: absent, empty, exact known, unknown, and mixed-case plan inputs; before/near/at/after target; ceiling, padding, catch-up, non-negative clamp, and expiry stop.
- `pnpm build`: production build succeeds after script/modules are integrated.
- Confirm lockfile/dependency set is unchanged.

### Manual

- Initialize two countdown instances and confirm independent immediate updates and stop-at-zero behavior.
- Inspect accessibility tree/event behavior to confirm no once-per-second announcement.

## 13. Acceptance Criteria

- [ ] `AC-007`–`AC-009`, `AC-022`–`AC-024`, and `AC-044` are covered by deterministic and manual evidence.
- [ ] Exact recognized values map to Basic/Pro/Ultimate and all other entry values default to Basic.
- [ ] Countdown uses current time, ceiling, catch-up, correct decomposition, and permanent zero after expiry.
- [ ] Tests/build pass with no new runtime/test dependency or live-region behavior.
- [ ] Output commit/snapshot and current task documentation are recorded.

## 14. Risks and Considerations

| Risk | Impact | Mitigation |
|---|---|---|
| Browser timer throttling | Display drift | Recalculate from current clock on every tick |
| Shared component hook overlap | Downstream merge conflicts | Coordinate `Countdown.astro`; no concurrent edits |
| Timezone parsing ambiguity | Wrong target | Use exact approved ISO offset and boundary tests |
| Test-only abstraction distorts browser API | False confidence | Keep pure rules small and perform manual multi-instance check |

## 15. Implementation Discoveries

None known. Propagate any approved-target, copy, or controller-boundary mismatch upstream.

## 16. Deviations

None at decomposition.

## 18. Definition of Done

- [ ] Objective, acceptance criteria, tests, build, and accessibility checks pass.
- [ ] Snapshot classification/rebaseline and output lineage are recorded.
- [ ] No dependency/lockfile or unsupported behavior was added.
- [ ] Discoveries/deviations/risks are current and downstream routes have stable APIs.

## 19. Completion Report

Complete after implementation with files, source/output snapshots, test/build/manual evidence, deviations, and next unblocked tasks.
