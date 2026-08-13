---
artifact: TASK
id: P02-T04
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 02 — Task 04: Integrate Sign Up validation and persistence orchestration

## 2. Objective

Complete the Sign Up experience by integrating strict query-to-plan initialization, controller-owned native constraint feedback, immutable valid submission capture, single in-flight IndexedDB persistence, exact pending/success/failure announcements, retry/edit behavior, and value preservation into the approved static route/form.

## 3. Source References

- Inputs: `SRC-DS-001` Sign Up/states, `SRC-DOC-001`, original repository baseline `SRC-REPO-001`, and task-start repository from approved prerequisite outputs; runtime None.
- Decomposition verification: `VER-025`–`VER-028`.
- Plan/review: orchestration portion of `PLAN-005`; `PLANREV-002`, `PLANREV-003`, `PLANREV-004`.
- Requirements: `REQ-FR-002`, `REQ-FR-003`, `REQ-FR-005`–`REQ-FR-011`, `REQ-AR-001`–`REQ-AR-005`, `REQ-BR-002`–`REQ-BR-004`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`.
- Specifications: `SPEC-BEH-002`, `SPEC-BEH-003`, `SPEC-INT-003`–`SPEC-INT-006`, `SPEC-ACC-001`–`SPEC-ACC-004`, `SPEC-DATA-001`–`SPEC-DATA-003`, `SPEC-VAL-001`–`SPEC-VAL-004`.
- Design: `DES-007`–`DES-009`, `DES-INT-003`–`DES-INT-005`, `DES-RWD-004`–`DES-RWD-006`.
- Architecture: `ADR-002`–`ADR-005`.
- Related tasks: requires `P01-T02`, `P02-T02`, `P02-T03`; route-link end-to-end coverage later also consumes `P02-T01`.

## 4. Snapshot Verification

- Before start, reverify behavior/design inputs and classify prerequisite implementation outputs as Expected previous-task output.
- Rebaseline task-start repository to the approved `P02-T02`/`P02-T03` lineage as required; ensure no concurrent `SignupForm.astro` edit.
- Stop for changed feedback copy, database contract, form hook contract, or unexpected frontend modification.

## 5. Prerequisites

- `P01-T02`, `P02-T02`, and `P02-T03` Complete with approved output snapshots.
- Exact error/status copy and IndexedDB interface remain as approved.
- This task has exclusive follow-up ownership of `SignupForm.astro` during integration.

## 6. Scope

### Included

- Read initial URL once: exact known lowercase plan intent maps to canonical option; absent/empty/unknown/mixed-case defaults Basic; later select state is user-owned and URL is not rewritten.
- Prevent network navigation; use native `required`/`type=email` `ValidityState`/`checkValidity()` with form `novalidate`, exact inline copy, blur/submit timing, correction clearing, and first-invalid focus after invalid submit.
- Capture exact five current values once per valid attempt; one transaction only; disable only submit while busy; fields remain editable; captured record remains immutable.
- Exact pending/success/failure status semantics, delayed success until transaction complete, assertive failure, retry, value preservation, and stale settled-status clearing on edit.
- Real-browser IndexedDB/network/manual cases and any task-owned form/style corrections.

### Excluded

- Custom email regex, phone/name/company pattern, custom select, remote submission/fallback, automatic retry, duplicate detection, data normalization, retention/delete policy, or unrelated Home changes.

## 7. Repository Context

- `P02-T03` provides buildable route/form hooks; `P02-T02` provides Promise-returning repository outcomes; `P01-T02` provides plan resolution.
- No framework/global state is needed; a thin browser controller owns DOM/URL/form effects.
- Browser bubbles must not own approved feedback; native constraints remain the validity authority.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/src/scripts/signup-controller.mjs` | Create | Proposed | Query init, validation, capture, busy/status/retry orchestration |
| `frontend/src/components/SignupForm.astro` | Modify | Prior output | Final controller attributes/hooks and task-owned state styling |
| `frontend/src/pages/sign-up.astro` | Modify | Prior output | Controller entry integration only as required |
| `frontend/src/lib/{plans,signup-store}.mjs` | Consume; fix only upstream defect via documented process | Prior outputs | Strict plan and persistence contracts |

## 9. Dependencies and Interfaces

- Controller consumes canonical plan resolver and repository Promise; dependency injection may expose deterministic/manual failure hooks without shipping a user-facing debug API.
- One status region changes role/live behavior by state: pending/success polite; failure assertive; countdown remains outside.
- Active field error alone adds visible text, `aria-invalid`, and `aria-describedby`; correction removes all three coherently.
- Captured record is a new plain object; later DOM edits cannot mutate it.

## 10. Implementation Steps

1. Verify/rebaseline prerequisite outputs; inspect stable form/store/plan interfaces.
2. Initialize Plan once from the URL and preserve native select ownership thereafter.
3. Implement controller-owned constraint evaluation/error timing/copy/relationships/focus without regex or `reportValidity()` bubbles.
4. Implement immutable capture, single in-flight guard, submit-only disabling, pending state, and repository settlement handling.
5. Implement exact success/failure announcements, retry, value preservation, and stale-settled-status clearing on edits.
6. Exercise full query, validation, transaction, concurrency, edit-during-flight, IndexedDB, network, keyboard, and responsive feedback matrices.
7. Run tests/build; commit integrated result and record output snapshot.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Untouched: no errors; interacted invalid blur/invalid submit: exact required/email feedback.
- Correction clears visible/programmatic error immediately when constraint passes.
- Pending: “Saving your details…”, busy exposed, submit unavailable, controls editable, repeats ignored.
- Success only after completion: “Thanks! Your details have been saved on this device.”
- Failure/abort: “We couldn't save your details on this device. Please try again.”; no false success, values preserved, retry available.
- Editing after settled status clears it; current Plan/values remain.

### Responsive behavior

- Active errors/status wrap and expand the form without overlap, clipping, focus obstruction, or layout scroll at supplied/stress widths.
- Controller state does not change logical DOM/focus order or invalidate the approved stacked/split composition.

### Accessibility

- Native inputs/select/button, persistent labels, exact autocomplete and constraints.
- First-invalid focus only after invalid submit; active-only `aria-invalid`/descriptions; visible non-color error differentiation.
- `aria-busy` during write; polite pending/success and assertive failure once per attempt; no focus move solely for transaction status.

## 12. Validation

### Automated

- `pnpm test`: all plan/countdown/store tests pass; add controller-unit tests only if achievable without unsupported dependency and justified by the task-start repository.
- `pnpm build`: integrated static output succeeds.

### Manual

- Direct/generic/three known/unknown/empty/mixed-case query matrix; change select afterward; verify no URL rewrite.
- Every required field absent, invalid/native-valid email, untouched/blur/submit/correction, first-invalid focus, no browser bubble, no invalid write.
- Valid delayed transaction, exact one record, immutable edit-during-flight, repeat activation, success timing, open/request/transaction/abort/unavailable failure, retry, preserved values, status clearing.
- DevTools IndexedDB/network inspection confirms exact local record and no form-data request; keyboard/a11y tree/live-region checks; supplied/stress feedback widths.

## 13. Acceptance Criteria

- [ ] `AC-003`, `AC-007`–`AC-021`, `AC-025`, `AC-026`, `AC-028`–`AC-033`, `AC-039`–`AC-043`, `AC-046`, and `AC-047` pass for Sign Up behavior.
- [ ] Native plan/select and validity rules are preserved with exact controller-owned feedback and focus behavior.
- [ ] One immutable record is accepted only on transaction completion; pending edits/repeats/failures/retry behave exactly as specified.
- [ ] No form data reaches a remote service or log; value/status/announcement behavior is verified.
- [ ] Tests/build/manual matrices pass and output lineage is recorded.

## 14. Risks and Considerations

| Risk | Impact | Mitigation |
|---|---|---|
| Browser validity/focus/live-region behavior varies | Inconsistent UX | Test exact recorded environment; limit claims |
| IndexedDB failures are hard to force | Missing negative evidence | Use injected boundary/controlled hooks plus real unavailability where possible |
| Pending edits mutate stored object | Data corruption | Capture a fresh immutable plain object; test `AC-047` |
| Browser bubble overrides copy | Spec violation | Keep `novalidate`; never use `reportValidity()` as UI owner |
| Shared form concurrent edit | Lost hooks | Exclusive sequential ownership after `P02-T03` |

## 15. Implementation Discoveries

Propagate any copy, form-hook, validity, announcement, or persistence-contract mismatch to the owning approved artifact; do not invent behavior.

## 16. Deviations

None at decomposition.

## 18. Definition of Done

- [ ] Full Sign Up behavior, acceptance matrix, tests/build, browser persistence/network, accessibility, and responsive feedback checks pass.
- [ ] Source/task-start/output lineage and canonical validation evidence are current.
- [ ] No unsupported remote/custom-validation/data behavior exists.
- [ ] Discoveries, deviations, environments, and remaining browser risks are recorded.

## 19. Completion Report

Complete after implementation with files, source/output snapshots, exact tested environment, record/network evidence, validation results, deviations, remaining risks, and readiness for integrated regression.
