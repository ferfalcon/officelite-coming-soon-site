---
artifact: TASK
id: P02-T01
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 02 — Task 01: Deliver the complete Home route

## 2. Objective

Replace the Astro starter Home page with the complete semantic, responsive Officelite Home experience, including five correct navigation actions, ordered plan cards, dashboard decoration, shared countdown, failure-derived responsive transitions, and ordered removal of now-unreferenced starter UI assets.

## 3. Source References

- Inputs: `SRC-DS-001` Home section `2141:2383` and interaction states `2141:2949`; `SRC-DOC-001`; original repository baseline `SRC-REPO-001` plus task-start lineage from completed Phase 01 output; no runtime source.
- Decomposition verification: `VER-025`–`VER-028`; Figma remains Time-bound.
- Plan/review: `PLAN-003`; `PLANREV-001`.
- Requirements: `REQ-FR-001`, `REQ-FR-003`–`REQ-FR-005`, `REQ-BR-001`, `REQ-BR-005`, `REQ-NFR-001`–`REQ-NFR-003`, `REQ-AR-001`–`REQ-AR-003`.
- Specifications: `SPEC-BEH-001`, `SPEC-BEH-006`, `SPEC-BEH-008`, `SPEC-INT-001`, `SPEC-INT-002`, `SPEC-ACC-001`, `SPEC-ACC-002`, `SPEC-ACC-005`.
- Design: `DES-RWD-001`–`DES-RWD-003`, `DES-INT-001`, `DES-INT-002`, `DES-INT-007`.
- Architecture: `ADR-001`, `ADR-002`, `ADR-005`, `ADR-006`.
- Related tasks: requires `P01-T01`, `P01-T02`; may be implemented independently of `P02-T02` when owned paths are disjoint.

## 4. Snapshot Verification

- Before start, verify design/document inputs and classify completed Phase 01 outputs as Expected previous-task output.
- Rebaseline the canonical task-start repository to the latest approved prerequisite output as required; stop for unexpected concurrent frontend changes.
- Re-inspect exact Home frames: `2141:1599` 1440, `2141:1724` 768, `2141:1813` 375.

## 5. Prerequisites

- `P01-T01` and `P01-T02` Complete with approved output snapshots.
- Shared Layout, primitives, assets, plan data, countdown rules/controller, and tests are stable.
- No concurrent edit to shared Home dependencies.

## 6. Scope

### Included

- Brand, hero heading/copy/generic action, decorative dashboard, Basic/Pro/Ultimate plan cards, launch date/countdown, and final generic action.
- Generic `/sign-up/` destinations and exact `?plan=basic|pro|ultimate` plan destinations.
- Mobile-first 375 result, 768 result, large 1440 result, first-failure-derived transitions, long-content/stress/missing-asset resilience.
- Delete `Welcome.astro`, `astro.svg`, and `background.svg` only after `index.astro` no longer imports them.

### Excluded

- Sign Up rendering/behavior, IndexedDB, global primitive redesign, arbitrary breakpoint copying, or new product content.

## 7. Repository Context

- `index.astro` currently imports `Welcome.astro`; the starter component imports `astro.svg` and `background.svg`.
- Phase 01 outputs provide route shell, visual primitives, confirmed assets, and plan/countdown modules.
- No router/framework is needed; Home remains a static Astro page with ordinary anchors and a small countdown controller script.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/src/pages/index.astro` | Replace | Existing | Complete Home hierarchy, composition, styles, controller integration |
| `frontend/src/components/PlanCard.astro` | Create | Proposed | Semantic plan summary/features/action composition |
| `frontend/src/components/{Brand,ActionLink,Countdown}.astro` | Consume; modify only if task-owned defect | Prior output | Shared UI contracts |
| `frontend/src/components/Welcome.astro` | Delete after import removal | Existing | Remove superseded starter UI |
| `frontend/src/assets/astro.svg` | Delete after import removal | Existing | Remove superseded starter asset |
| `frontend/src/assets/background.svg` | Delete after import removal | Existing | Remove superseded starter asset |

## 9. Dependencies and Interfaces

- Consume canonical plan records for stable Basic/Pro/Ultimate order and query slugs.
- Consume Countdown markup/controller without adding live announcements.
- Keep navigation as ordinary anchors so browser history/back behavior remains native.
- PlanCard accepts one plan record and approved visual variant; it does not own navigation state.

## 10. Implementation Steps

1. Verify/rebaseline sources and prerequisite outputs; inspect exact Home design context before coding.
2. Build semantic Home DOM and PlanCard from compact-first structure with unchanged keyboard/DOM order.
3. Integrate confirmed assets, shared action variants, plan-intent URLs, and countdown controller.
4. Implement 375/768/1440 outcomes and sweep transitions to the first stable interval for hero, cards, and launch row.
5. Remove starter import first, then delete now-unreferenced starter component/SVGs.
6. Exercise links, keyboard/focus/hover, content/stress/missing-asset cases, and visual comparisons.
7. Run tests/build; commit coherent route result and record output snapshot.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Default, hover-capable hover, and keyboard focus states match demonstrated roles.
- Future/expired countdown comes from shared rules; missing decorative/dashboard assets do not expose filenames or block content.
- Loading/empty/success/error product states are otherwise Not applicable on Home.

### Responsive behavior

- 375: stacked illustration/content/cards/countdown/action outcome.
- 768: readable hero columns and horizontal card content when it first fits.
- 1440: capped three-card row and launch row; wider screens add whitespace rather than unbounded scaling.
- Record final media-query values, tested adjacent widths, and failure evidence; no layout-caused horizontal scroll.

### Accessibility

- One `h1`, meaningful header/main/sections/list structure, real links, logical DOM/focus order, visible focus, empty decorative alternative, and no countdown live announcements.
- All five actions work by keyboard; focus remains visible and unclipped.

## 12. Validation

### Automated

- `pnpm test`: shared logic remains passing.
- `pnpm build`: production build succeeds without starter imports.

### Manual

- Screenshots/side-by-side review at 375, 768, 1440 plus recorded transition/stress widths.
- Pointer/keyboard activation for hero, three plan, and final actions; verify destination, query, history/back.
- DOM/accessibility inspection, Default/Hover/Focus differentiation, long content, missing asset, and overflow checks.

## 13. Acceptance Criteria

- [ ] `AC-001`, `AC-002`, `AC-004`, `AC-005`, `AC-027`, `AC-029`, `AC-030`, `AC-034`–`AC-037`, `AC-044`, and `AC-045` pass for Home.
- [ ] Home content/order/actions/countdown are complete and semantic at supplied widths.
- [ ] Generic and plan-specific links carry exact approved intent with native history behavior.
- [ ] Responsive transitions are evidence-derived and recorded; no clipping/overlap/layout scroll occurs.
- [ ] Starter component/SVG deletion occurs only after references are removed; tests/build pass.
- [ ] Output lineage and task evidence are recorded.

## 14. Risks and Considerations

| Risk | Impact | Mitigation |
|---|---|---|
| No approved numeric breakpoints | Arbitrary layout | Sweep first-failure intervals and record adjacent evidence |
| Starter deletion order | Build failure | Replace import before deletion; build immediately |
| Visual placement changes DOM order | Keyboard confusion | Preserve semantic DOM order; use CSS placement only |
| Time-bound Figma changes | Wrong target | Reverify scoped frames/states before implementation |

## 15. Implementation Discoveries

Record any source ambiguity, unavoidable visual deviation, asset mismatch, or shared-interface change in the owning artifact before continuing.

## 16. Deviations

None at decomposition.

## 18. Definition of Done

- [ ] Objective, Home acceptance matrix, tests/build, responsive/visual/accessibility/navigation checks pass.
- [ ] Source/task baseline and implementation-output lineage are current.
- [ ] Starter removal is complete and no unsupported scope was introduced.
- [ ] Breakpoint evidence, discoveries, deviations, and downstream information are documented.

## 19. Completion Report

Complete after implementation with file changes, exact widths/environments, screenshots/check evidence, source/output snapshots, deviations, and next task.
