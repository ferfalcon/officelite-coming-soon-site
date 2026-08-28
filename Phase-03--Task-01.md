---
artifact: TASK
id: P03-T01
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

# Phase 03 — Task 01: Build the Sign Up route and accessible form shell

## 2. Objective

Deliver the Sign Up route structure with direct/generic/plan-specific entry behavior, native accessible controls, network-inert pre-initialization form semantics, shared countdown, and responsive layout before persistence is added.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-004`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-FR-002`, `REQ-FR-004`, `REQ-FR-005`, `REQ-FR-006`, `REQ-FR-012`, `REQ-AR-001`, `REQ-AR-002`, `REQ-AR-004`, `REQ-NFR-001/002`
- Specification/design references: `SPEC-BEH-002/003/007`, `SPEC-INT-002/003`, `SPEC-ACC-001–003/006`
- Architecture references: `ADR-002`, `ADR-003`, `ADR-008`, `ADR-009`
- Related tasks: Prerequisite `P01-T02`; may execute in parallel with `P02-T01`; prerequisite for `P03-T02`

## 4. Snapshot Verification

Before implementation:
- Reverify the applicable Figma evidence when this task depends on visual/state intent.
- Start through the canonical CLI so repository HEAD is classified as the planned baseline, expected previous-task output, or a task-start checkpoint.
- Treat workflow/documentation-only commits as expected lineage only when canonical task-start diagnostics accept them.
- Stop and rebaseline upstream if a material Figma or `frontend/` change is unexpected.

## 5. Prerequisites

`P01-T02` Complete. Shared plan domain/parser, Countdown, shell, tokens and approved Sign Up assets must be available.

## 6. Scope

### Included
- `/sign-up/` static route with logo return link, intro/countdown, and form.
- Name, Email Address, native Plan select, Phone Number, Company, and submit control.
- Valid plan-query initialization with Basic fallback for direct/invalid entry.
- Programmatic labels and stable field/error/status hook structure needed by later tasks.
- Network-inert form before local controller owns submit behavior.
- Large side-by-side and medium/compact vertical responsive structures.

### Excluded
- Actual field validation messages/rules beyond native structural constraints (P03-T02).
- IndexedDB writes/status outcome behavior (P03-T03).
- Bespoke select popup or remote submission endpoint.

## 7. Repository Context

No Sign Up route exists at `SRC-REPO-001`. Figma provides large/medium/compact Sign Up compositions, field/select closed visual states, background asset, and logo. The approved architecture requires a native select and local controller; the open menu remains browser-owned.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/src/pages/sign-up.astro` | Create | Compose Sign Up route |
| `frontend/src/components/SignUpForm.astro` | Create | Native accessible form markup/hooks |
| `frontend/src/components/BrandLogo.astro` | Reuse/Modify if required | Home return semantics |
| `frontend/src/scripts/signup-controller.ts` | Create | Initialization/plan-context/network-inert submit ownership boundary |
| Sign Up scoped styles/assets | Create/Use | Approved layout/closed select presentation |
| `frontend/tests/e2e/signup.spec.ts` | Create | Entry/plan/form-shell regression |

## 9. Dependencies and Interfaces

Consume Phase 01 plan parser and Countdown. Expose stable field IDs/error placeholders/status hook for P03-T02/T03. The initial static form must not have a remote action/path that can receive personal values; enable submit semantics only after the local controller has installed ownership.

## 10. Implementation Steps

1. Reverify Sign Up Figma evidence and inspect shared Phase 01 contracts.
2. Compose the route and logical DOM order: brand return, intro/countdown, then native form.
3. Render all five required product fields using native input/select semantics and independent programmatic labels.
4. Initialize Plan from the constrained URL domain, defaulting absent/unsupported values to Basic.
5. Implement the safe pre-controller submission boundary and controller initialization without persistence.
6. Implement responsive visual compositions and closed-select styling while preserving browser-owned open behavior.
7. Add E2E tests for direct/valid/invalid plan entry, logo navigation, keyboard order, no PII in URL, and form network inertness; run diagnostics/build.

## 11. State, Responsive, and Accessibility Requirements

- Native select keyboard behavior and option semantics remain intact.
- Focus styles remain visible on all controls; field containers reserve/grow for later validation text.
- DOM order is stable across side-by-side/stacked layouts.
- No current product loading/disabled state is invented; pre-init network safety is an architecture safeguard, not a product loading design.

## 12. Validation

### Automated
- `pnpm check`, `pnpm build`, Sign Up E2E entry/navigation/form-shell tests.
- Direct and invalid plan entry select Basic; valid plan query selects matching option.
- Assert no personal field value is written to URL/network by the static shell.
- Responsive smoke at 375, 768, 1321 plus intermediate widths.
### Manual
- Keyboard tab order and native select interaction.
- Programmatic label inspection and visible focus.
- Figma comparison for large/medium/compact composition.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `REQ-FR-002`: Sign Up route is available and matches approved hierarchy.
- [ ] `REQ-FR-004/005`: plan context is constrained and Basic fallback is reliable.
- [ ] `REQ-FR-006`/accessibility requirements: all required native fields exist with programmatic labels and logical keyboard order.
- [ ] Static pre-controller behavior cannot submit PII remotely.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Custom select styling breaks native behavior | Style closed element only; keep native select/options |
| Form default submission leaks PII before JS | Preserve network-inert initial control/controller installation order |
| Parallel Home work changes shared logo/contracts | Coordinate shared changes; do not duplicate shared implementation |

## 15. Implementation Discoveries

None at decomposition. Record any source/documentation discrepancy here during implementation and update the owning upstream artifact instead of silently working around it.

## 16. Deviations

None planned. Any deviation from the approved task scope, architecture, source baseline, or validation contract requires evidence and the appropriate workflow update.

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
