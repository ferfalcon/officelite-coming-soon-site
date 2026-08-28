---
artifact: TASK
id: P03-T02
baseline:
  design:
    - SRC-DS-001
  repository:
    - SRC-REPO-001
  runtime: []
  documentation: []
  assets: []
created: 2026-08-28
updated: 2026-08-28
project: Officelite coming soon site
profile: Full
execution_mode: Gated
---

The canonical task registry owns mutable status, prerequisites, baseline changes, output lineage, and structured validation state.

# Phase 03 — Task 02: Implement form validation and accessible field feedback

## 2. Objective

Make invalid Sign Up submissions fail before the persistence boundary and provide field-specific, visible, programmatically associated validation feedback that recovers cleanly when corrected.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-005`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-FR-006`, `REQ-FR-007`, `REQ-BR-003`, `REQ-BR-004`, `REQ-AR-001`, `REQ-AR-004`, `REQ-AR-005`
- Specification/design references: `SPEC-INT-004`, `SPEC-ACC-003`, `SPEC-VAL-001`, `SPEC-VAL-002`; `DES-008`, `DES-INT-006`
- Architecture references: `ADR-004`, `ADR-009`
- Related tasks: Prerequisite `P03-T01`; prerequisite for `P03-T03`

## 4. Snapshot Verification

Before implementation, reverify applicable Figma evidence and start through the canonical CLI so repository lineage is classified. Expected previous-task output may become the task-start snapshot. Stop and rebaseline if a material design or `frontend/` change is unexpected.

## 5. Prerequisites

`P03-T01` Complete with stable native controls, IDs, controller initialization boundary, and validation/status hook structure.

## 6. Scope

### Included
- Required-field validation for Name, Email, Plan, Phone, Company.
- Single-address email validity using native/equivalent HTML constraint semantics.
- One contextual error message per invalid field using approved replaceable copy.
- Stable programmatic error associations and invalid state semantics.
- Recovery when a field becomes valid; persistence callback remains unreachable until all values pass.
- Focused E2E validation and keyboard tests.

### Excluded
- IndexedDB write/open behavior or persistence success/failure status.
- Whitespace normalization, duplicate policy, synthetic error-summary focus, or unsupported loading/disabled states.

## 7. Repository Context

The preceding task provides native form controls and controller ownership but intentionally does not implement the final validation orchestration. Figma lacks explicit validation-state compositions, so approved Stage 3/4 extensions use text plus red treatment while retaining visible focus.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/src/components/SignUpForm.astro` | Modify | Error message hooks/relationships |
| `frontend/src/scripts/signup-controller.ts` | Modify | Validation orchestration and pre-persistence gate |
| `frontend/src/data/product.ts` | Modify if copy not already present | Replaceable validation strings |
| Sign Up/global styles | Modify | Error text/border treatment without focus loss |
| `frontend/tests/e2e/signup.spec.ts` | Modify | Required/email/recovery/keyboard validation coverage |

## 9. Dependencies and Interfaces

The controller must expose a clear boundary where a normalized five-value product record is created only after all constraints pass. P03-T03 may attach persistence only behind that boundary. Validation uses the native field semantics already established by P03-T01.

## 10. Implementation Steps

1. Start from canonical P03-T01 output and inspect final field IDs/control semantics.
2. Implement required and email constraint evaluation without introducing unsupported normalization/business rules.
3. Render/update one field-specific error message and programmatic association per invalid control.
4. Ensure invalid styling coexists with visible focus and messages wrap/grow at narrow widths.
5. Prevent the persistence boundary from being called when any field is invalid; clear/update errors when corrected.
6. Add E2E scenarios for one/multiple required errors, invalid email, correction/retry, and keyboard-only submit; run check/build/tests.

## 11. State, Responsive, and Accessibility Requirements

- Error state uses text plus visual treatment; color alone is never the only signal.
- Focus stays on the user's current interaction path; no unsupported synthetic summary focus.
- Error text growth must not clip/overlap at compact widths.
- Loading/success/persistence-failure states are not owned by this task.

## 12. Validation

### Automated
- `pnpm check`, `pnpm build`, validation-focused `pnpm test:e2e` scenarios.
- Empty one/multiple required fields must block the storage boundary.
- Invalid single-address email must block the storage boundary; corrected email must recover.
- Keyboard-only submit path must produce the same contextual feedback.
### Manual
- Inspect labels, `aria-describedby`/invalid relationships or approved equivalent semantics.
- Verify focus ring remains visible on invalid controls and long messages reflow.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `REQ-FR-006/007`: required/email invalid submissions are blocked with contextual feedback.
- [ ] `SPEC-VAL-001/002`: validation semantics match the approved constraints exactly.
- [ ] `REQ-AR-004/005`: messages are programmatically related and understandable without relying on color.
- [ ] P03-T03 receives only valid record input.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Browser validation bubbles conflict with custom feedback | Use one observable orchestration path while preserving native validity semantics |
| Error UI hides focus | Explicitly test focus/error style combination |
| Validation scope grows into product rules | Do not trim/dedupe/reformat beyond approved constraints |

## 15. Implementation Discoveries

None at decomposition. Record source/documentation discrepancies during implementation and update the owning upstream artifact instead of silently working around them.

## 16. Deviations

None planned. Any deviation from approved scope, architecture, source baseline, or validation contract requires evidence and the appropriate workflow update.

## 18. Definition of Done

- [ ] The objective is implemented without scope expansion.
- [ ] Task-specific acceptance criteria pass.
- [ ] Required automated/manual validation executes successfully.
- [ ] Accessibility, responsive/state/error requirements owned by this task are verified.
- [ ] Snapshot verification is complete or an approved rebaseline was performed.
- [ ] An implementation output commit/snapshot is recorded separately from workflow bookkeeping.
- [ ] Relevant documentation/discoveries/deviations are updated.
- [ ] Downstream tasks have a stable contract.

## 19. Completion Report

Complete during Stage 10 with affected files, input/output snapshots, behavior implemented, validation evidence, deviations, remaining risks, documentation updates, and next unblocked task.
