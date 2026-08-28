---
artifact: TASK
id: P04-T01
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

# Phase 04 — Task 01: Harden responsive behavior, content, and visual fidelity

## 2. Objective

Converge the completed Home and Sign Up experiences against approved Figma evidence, resolve content-fit transition values, stress long/current-release feedback content, and repair visual/reflow issues without changing semantics or product behavior.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-007`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-NFR-001`, `REQ-NFR-002`, `REQ-BR-005` plus the functional/accessibility requirements already owned by route tasks
- Specification/design references: `SPEC-BEH-005–007`, `SPEC-ACC-006`; `DES-RWD-001–007`
- Architecture references: `ADR-007`, `ADR-009`
- Related tasks: Prerequisites `P02-T01` and `P03-T03`; prerequisite for `P04-T02`

## 4. Snapshot Verification

Before implementation, reverify applicable Figma evidence and start through the canonical CLI so repository lineage is classified. Expected previous-task output may become the task-start snapshot. Stop and rebaseline if a material design or `frontend/` change is unexpected.

## 5. Prerequisites

Both Home (`P02-T01`) and complete Sign Up persistence flow (`P03-T03`) are Complete.

## 6. Scope

### Included
- Cross-route sweep between compact/medium/large reference compositions.
- Content-fit breakpoint/transition selection and recorded rationale.
- Longer marketing/plan/error/status-copy stress testing.
- Below-375 and above-supplied-large smoke coverage.
- Visual repair of spacing, typography, decoration, wrapping, and component-state fidelity.
- Keyboard/focus regression after CSS changes.

### Excluded
- New functionality, semantic rewrites without evidence, new product copy decisions.
- Treating Figma frame widths as automatic breakpoints.
- Formal browser-support policy.

## 7. Repository Context

Earlier tasks implement responsive behavior in the owning features. This task is a repair/hardening pass after both routes are complete, not the first responsive/accessibility implementation. Supplied evidence widths are Home 375/768/1440 and Sign Up 375/768/1321.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| Home/Sign Up component/page scoped styles | Modify as evidenced | Content-fit/fidelity fixes |
| `frontend/src/styles/global.css` | Modify only if shared token/base evidence requires | Cross-route shared correction |
| `frontend/tests/e2e/responsive.spec.ts` | Create/Modify | Required viewport/reflow smoke coverage |

## 9. Dependencies and Interfaces

Preserve DOM order, native controls, plan/persistence contracts, and existing behavior. CSS changes may alter only visual layout/presentation unless a documented upstream discrepancy is discovered.

## 10. Implementation Steps

1. Reverify supplied Figma structures and start from converged Home/Sign Up outputs.
2. Compare each route at supplied reference widths and representative in-between widths.
3. Resize toward content failure and choose/adjust transitions immediately before overlap, clipping, unusably narrow controls, or app-created horizontal scroll; record rationale.
4. Stress reasonable longer marketing, plan, validation, and status content plus very narrow/wide viewports.
5. Repair only evidence-backed visual/reflow issues while preserving DOM/semantics/controller contracts.
6. Add/update responsive smoke assertions and rerun route interactions, keyboard/focus, check/build/E2E after CSS changes.

## 11. State, Responsive, and Accessibility Requirements

- Required content must reflow without application-created horizontal scrolling.
- Decorative artwork may clip only when it does not obscure required content or interaction.
- Focus order/visibility and native control semantics must survive layout tuning.
- Error/status text must grow without clipping; no new loading/disabled states.

## 12. Validation

### Automated
- `pnpm check`, `pnpm build`, full relevant Playwright suite plus `responsive.spec.ts`.
- Viewport smoke at supplied widths and representative below/above/intermediate widths; assert required-content reflow/no page horizontal overflow.
### Manual
- Figma side-by-side visual review for both routes.
- Record final implemented transition values and content-fit rationale.
- Keyboard/focus retest and long-content/error/status review after all CSS repairs.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `DES-RWD-001–007` are represented by evidence-driven transitions rather than device-width guesses.
- [ ] `REQ-NFR-001/002`: both routes remain usable/reflow-safe across required and intermediate widths.
- [ ] Visual tuning does not regress semantic order, keyboard behavior, validation, persistence, or network safety.
- [ ] Long/current-release copy does not clip required content.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Visual tuning regresses behavior | Preserve DOM/contracts and rerun interaction suite after CSS changes |
| Overfitting to screenshot widths | Use content-failure process and validate both sides of transitions |
| Mutable Figma source | Reverify configured scope before claiming fidelity |

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
