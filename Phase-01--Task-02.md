---
artifact: TASK
id: P01-T02
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

# Phase 01 — Task 02: Implement shared plan context and countdown

## 2. Objective

Create the stable shared plan/launch contracts, safe plan-query helpers, and reusable countdown presentation/controller that both product routes can consume.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-002`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-FR-004`, `REQ-FR-005`, `REQ-FR-011`, `REQ-BR-001`, `REQ-BR-002`, `REQ-BR-005`, `REQ-DR-002`, `REQ-CON-004`
- Specification/design references: `SPEC-BEH-003`, `SPEC-BEH-004`, `SPEC-BEH-005`, `SPEC-DATA-002`, `SPEC-ACC-005`
- Architecture references: `ADR-003`, `ADR-006`
- Related tasks: Prerequisite `P01-T01`; consumers `P02-T01`, `P03-T01`

## 4. Snapshot Verification

Before implementation:
- Reverify the applicable Figma evidence when this task depends on visual/state intent.
- Start through the canonical CLI so repository HEAD is classified as the planned baseline, expected previous-task output, or a task-start checkpoint.
- Treat workflow/documentation-only commits as expected lineage only when canonical task-start diagnostics accept them.
- Stop and rebaseline upstream if a material Figma or `frontend/` change is unexpected.

## 5. Prerequisites

`P01-T01` Complete, with diagnostics/build available and shared styling/assets established.

## 6. Scope

### Included
- Typed Basic/Pro/Ultimate domain and display content.
- Stable URL plan keys plus helpers that generate/parse/constrain plan context.
- Single replaceable launch label/instant and approved current-release copy location.
- Reusable countdown markup/controller with days/hours/minutes/seconds updated once per second while pre-target.

### Excluded
- Home/Sign Up full composition.
- Remote launch-date request or backend.
- An invented post-zero countdown product state.

## 7. Repository Context

No product data/helper/controller modules exist at `SRC-REPO-001`. The approved plan requires one source of truth for plan keys/content and the placeholder launch target. Current approved implementation assumption is `2026-12-31T00:00:00Z`, isolated so it can be replaced later.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/src/data/product.ts` | Create | Plans, keys, launch target/label, replaceable copy |
| `frontend/src/lib/plan-context.ts` | Create | Build/parse/constrain plan URLs |
| `frontend/src/lib/countdown.ts` | Create | Countdown arithmetic/ticking helpers |
| `frontend/src/components/Countdown.astro` | Create | Shared semantic/presentation structure |

## 9. Dependencies and Interfaces

Plan helpers expose only the approved three-key domain and Basic fallback; personal form values never enter URLs. Countdown consumes the shared target and exposes no network boundary. Later Home and Sign Up tasks must import these contracts rather than duplicate values.

## 10. Implementation Steps

1. Start from canonical expected output of P01-T01 and reverify relevant source intent.
2. Define typed plan keys/data and the single replaceable launch configuration.
3. Implement plan URL construction plus parsing that accepts only Basic/Pro/Ultimate and falls back safely.
4. Implement countdown arithmetic/ticking and shared Astro markup with stable four-unit order.
5. Ensure ticking remains local and network-inert and does not announce every second.
6. Run diagnostics/build and inspect exported contracts/component markup; record the placeholder UTC assumption as non-permanent.

## 11. State, Responsive, and Accessibility Requirements

- Countdown unit order stays Days → Hours → Minutes → Seconds at every width.
- Per-second changes are not a live region.
- Compact presentation must support a four-column reflow without changing DOM order.
- No terminal error/success state is invented for an undefined post-target behavior.

## 12. Validation

### Automated
- `pnpm check` and `pnpm build` must pass.
- Later route E2E owns browser navigation/ticking assertions; this task verifies shared modules compile cleanly and expose only the approved domain.
### Manual
- Inspect generated plan URLs and parser/fallback logic against Basic/Pro/Ultimate constraints.
- Confirm one shared launch target is used and no launch-date network request exists.
- Confirm countdown markup is silent to assistive technology for per-second updates.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `PLAN-002` is represented by one shared plan/launch contract.
- [ ] Invalid/absent plan context resolves to Basic; valid keys remain stable.
- [ ] Countdown exposes four ordered units and pre-target once-per-second behavior without live announcements.
- [ ] `REQ-DR-002` plan values come from the same approved domain used by URL and later persistence.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Placeholder date lacks timezone authority | Keep approved UTC interpretation isolated and replaceable |
| Shared contract drift between routes | Require both later route tasks to import the same module |
| Over-specifying terminal behavior | Stop at approved pre-target behavior |

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
