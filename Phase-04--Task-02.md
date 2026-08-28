---
artifact: TASK
id: P04-T02
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

# Phase 04 — Task 02: Complete regression coverage and repository validation

## 2. Objective

Close the complete acceptance-criteria/regression map and prove the repository output passes Astro diagnostics, static build, critical browser flows, accessibility/responsive checks, persistence/network-safety tests, and the remote frontend validation workflow.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-008`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: All approved `REQ-FR-001–012`, `REQ-BR-001–005`, `REQ-DR-001–003`, `REQ-AR-001–005`, `REQ-NFR-001–002`, `REQ-CON-001–004`
- Specification/design references: All applicable Stage 4 SPEC IDs and acceptance criteria `AC-001–AC-110`
- Architecture references: `ARCHITECTURE.md` Section 21 and `ADR-010`
- Related tasks: Prerequisite `P04-T01`; prerequisite for `P04-T03`

## 4. Snapshot Verification

Before implementation, reverify applicable Figma evidence and start through the canonical CLI so repository lineage is classified. Expected previous-task output may become the task-start snapshot. Stop and rebaseline if a material design or `frontend/` change is unexpected.

## 5. Prerequisites

`P04-T01` Complete. All product behavior and fidelity fixes must exist so this task closes gaps rather than creating primary features.

## 6. Scope

### Included
- Complete E2E coverage for navigation, plan state, countdown, form validity, IndexedDB success/failure, network safety, keyboard/focus, and responsive smoke.
- Explicit AC-001–AC-110 mapping to automated or justified manual validation.
- Blocking `pnpm check`, `pnpm build`, and `pnpm test:e2e` in the frontend validation workflow.
- Manual keyboard-only, assistive-status, and Figma visual checks where browser assertions are insufficient.
- Regression review for unsupported-scope leakage.

### Excluded
- Declaring a formal browser/device support matrix from Playwright engines.
- New features discovered only because tests would be convenient.
- Production Vercel acceptance, owned by P04-T03.

## 7. Repository Context

The plan deliberately selects Astro diagnostics plus Playwright as the smallest validation surface. Multi-engine Playwright may provide engineering evidence, but Chromium is the minimum blocking project unless execution-time repository evidence supports the already approved broader setup; this does not create product support policy.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/playwright.config.ts` | Modify if needed | Final projects/web-server/test contract |
| `frontend/tests/e2e/navigation.spec.ts` | Modify | Navigation/plan/countdown coverage |
| `frontend/tests/e2e/signup.spec.ts` | Modify | Validation/persistence/network coverage |
| `frontend/tests/e2e/responsive.spec.ts` | Modify | Cross-route viewport/reflow coverage |
| `frontend/package.json` | Modify only if validation scripts need final correction | Blocking command surface |
| `.github/workflows/frontend-validation.yml` | Modify | Blocking remote check/build/E2E execution |

## 9. Dependencies and Interfaces

Tests exercise public behavior only or controlled test-boundary failure mechanisms; no product-only debug UI. Validation workflow remains separate from canonical design-workflow control. Manual checks fill only areas not reliably automated and must be documented.

## 10. Implementation Steps

1. Start from P04-T01 output and inventory existing focused tests against requirements/SPEC/AC-001–110.
2. Add missing browser assertions without duplicating coverage or inventing unsupported behaviors.
3. Ensure diagnostics/build/E2E commands are deterministic and blocking in the path-scoped remote workflow.
4. Execute full repository validation and repair regressions within approved task scope.
5. Perform manual keyboard-only, accessible-status/relationship, and Figma visual checks; document evidence and any justified manual-only AC mapping.
6. Review final suite for network safety, static output, no backend/server adapter, and no implied browser-support policy.

## 11. State, Responsive, and Accessibility Requirements

- Accessibility, responsive, error/success, privacy/network and semantic checks are first-class validation dimensions.
- Loading/empty/disabled states remain not applicable where upstream scope intentionally omits them.
- Reduced-motion/contrast/reflow requirements are checked where specified; do not manufacture numeric performance/support thresholds.

## 12. Validation

### Automated
- `pnpm check` passes.
- `pnpm build` passes and remains static.
- `pnpm test:e2e` passes for all blocking browser projects.
- Remote `frontend-validation.yml` run is green for the implementation commit.
### Manual
- Keyboard-only critical flows and focus visibility/order.
- Assistive-status/error relationship check for validation and persistence outcomes.
- Figma visual comparison at supplied reference widths.
- AC-001–AC-110 coverage matrix has no silent omission; any manual/N/A item has explicit rationale.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] Every approved Must requirement/material specification reaches a passing validation path.
- [ ] AC-001–AC-110 are mapped to automated or explicit manual/N/A evidence.
- [ ] Astro diagnostics, static build, and E2E suite pass through the repository's remote validation transport.
- [ ] No regression introduces backend behavior, remote sign-up transmission, unsupported product state, or hidden accessibility failure.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Tests imply browser support promise | Label engines as engineering regression only |
| Flaky countdown/IndexedDB tests | Control clock/failure at test boundary; avoid product debug UI |
| Final suite misses early ACs | Maintain explicit AC-001–110 map, corrected by PLAN-REVIEW |

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
