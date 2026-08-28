---
artifact: TASK
id: P02-T01
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

# Phase 02 — Task 01: Build the complete Home route

## 2. Objective

Deliver the complete Home conversion experience with approved hierarchy, pricing data, CTA plan context, interactive states, logical semantics, and responsive transformations.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-003`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-FR-001`, `REQ-FR-003`, `REQ-BR-001`, `REQ-NFR-001`, `REQ-NFR-002`, `REQ-AR-001`, `REQ-AR-002`
- Specification/design references: `SPEC-BEH-001`, `SPEC-BEH-005`, `SPEC-BEH-006`, `SPEC-INT-001`, `SPEC-ACC-001/002/006`; `DES-001/003/004`, `DES-RWD-001–004/007`
- Architecture references: `ADR-002`, `ADR-003`, `ADR-007`
- Related tasks: Prerequisite `P01-T02`; may execute in parallel with `P03-T01`

## 4. Snapshot Verification

Before implementation:
- Reverify the applicable Figma evidence when this task depends on visual/state intent.
- Start through the canonical CLI so repository HEAD is classified as the planned baseline, expected previous-task output, or a task-start checkpoint.
- Treat workflow/documentation-only commits as expected lineage only when canonical task-start diagnostics accept them.
- Stop and rebaseline upstream if a material Figma or `frontend/` change is unexpected.

## 5. Prerequisites

`P01-T02` Complete. Shared plan data, plan URL helper, countdown, shell, assets, tokens, and validation surface must be stable.

## 6. Scope

### Included
- Semantic Home regions and brand link.
- Hero content/illustration/action.
- Data-driven Basic/Pro/Ultimate pricing cards and plan-specific CTAs.
- Shared countdown use.
- Large/medium/compact layout transformations and content-fit transition evidence.
- Focused Home navigation/CTA browser regression tests.

### Excluded
- Sign Up form behavior/persistence.
- New marketing content or pricing rules.
- Breakpoints chosen solely from common device widths.

## 7. Repository Context

Baseline Home is the Astro starter. Approved assets include logo, Home background patterns and dashboard illustration. Figma supplies 375/768/1440 reference compositions; these are evidence points, not CSS breakpoint mandates.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/src/pages/index.astro` | Modify | Compose Home route |
| `frontend/src/components/BrandLogo.astro` | Create/Reuse | Shared brand link/presentation |
| `frontend/src/components/HomeHero.astro` | Create | Hero hierarchy/action/illustration |
| `frontend/src/components/PricingPlans.astro` | Create | Plan-list composition |
| `frontend/src/components/PricingCard.astro` | Create | Reusable plan card/CTA variants |
| Home-scoped styles/assets | Modify/Use | Figma-aligned composition/states |
| `frontend/tests/e2e/navigation.spec.ts` | Create/Modify | Home CTA/logo/plan-context coverage |

## 9. Dependencies and Interfaces

Consume plan data, plan URL builder, Countdown, global tokens, and shared assets from Phase 01. All navigation remains native anchors; only plan-specific CTAs add `?plan=<key>`.

## 10. Implementation Steps

1. Reverify Home Figma structures and start from canonical Phase 01 output.
2. Build semantic Home DOM in logical reading order, using shared BrandLogo and Countdown.
3. Render plan cards from shared configuration; wire generic versus plan-specific Sign Up anchors correctly.
4. Implement default/hover/focus visual states and decorative/illustrative asset treatment.
5. Implement large/medium/compact layouts using content-fit transition testing; record actual transition rationale.
6. Add focused Playwright navigation/keyboard/responsive smoke assertions and run check/build/tests relevant to Home.

## 11. State, Responsive, and Accessibility Requirements

- Default/Hover/Focus CTA states follow approved visual language and never remove visible focus.
- DOM/read order stays logical even where grid/flex changes visual placement.
- Dashboard illustration is initially non-essential; decorative patterns stay out of the accessibility tree.
- Content can wrap/grow; no required-content horizontal page scroll at supplied or intermediate widths.

## 12. Validation

### Automated
- `pnpm check`, `pnpm build`, and Home-focused Playwright navigation tests.
- Verify each Home CTA reaches `/sign-up/` with correct generic/plan-specific query state.
- Responsive smoke at 375, 768, 1440 plus representative intermediate/narrow/wide widths; assert no page-level horizontal overflow.
### Manual
- Keyboard activation/focus visibility.
- Side-by-side visual comparison with Home Figma evidence.
- Inspect heading/landmark order and decorative image semantics.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `REQ-FR-001/003`: Home displays the approved conversion content and actions.
- [ ] `SPEC-INT-001`: native links preserve correct plan context.
- [ ] `SPEC-ACC-001/002/006`: semantics, focus, and reflow remain usable.
- [ ] `DES-RWD-001–004/007`: supplied responsive compositions and justified in-between transitions are represented.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Unsupplied breakpoints | Derive transitions from content failure, record evidence |
| Component over-fragmentation | Keep only boundaries with independent responsibility |
| Parallel Sign Up work touching shared files | Treat Phase 01 contracts as stable; coordinate any shared-file change |

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
