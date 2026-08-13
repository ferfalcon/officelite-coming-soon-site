---
artifact: TASK
id: P01-T01
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 01 — Task 01: Establish the shared visual and semantic foundation

## 2. Objective

Produce a buildable, self-contained Astro shell with route metadata, global Officelite tokens/styles, reusable brand/action/countdown primitives, and exact approved local assets/font provenance, while the existing starter route remains functional.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`; `VER-025`–`VER-028` at decomposition.
- Design: Time-bound `SRC-DS-001`, especially sections `2141:935`, `2141:938`, and demonstrated interaction states `2141:2949`.
- Task-start repository: `SRC-REPO-001` at `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`.
- Documentation: `SRC-DOC-001`; assets: `SRC-ASSET-001`; runtime: None.
- Plan/review: `PLAN-001`; `PLAN-REVIEW.md` and `PLANREV-001`.
- Requirements: `REQ-NFR-001`–`REQ-NFR-004`, `REQ-AR-001`–`REQ-AR-003`, `REQ-CON-001`–`REQ-CON-005`.
- Specifications/design: `SPEC-ACC-001`, `SPEC-ACC-002`, `SPEC-ACC-005`; `DES-001`–`DES-010`.
- Architecture: `ADR-001`, `ADR-005`, `ADR-006`.
- Related tasks: prerequisite for `P01-T02`, `P02-T01`, `P02-T02`, and `P02-T03`.

## 4. Snapshot Verification

- Decomposition check: `VER-025`–`VER-028` classified all inputs Unchanged; Figma remains Time-bound.
- Before implementation: rerun the CLI source checks, confirm the recorded task baseline is an ancestor of current `HEAD`, and inspect frontend differences.
- Expected task-start classification: Unchanged; an approved previous workflow output is documentation-only and does not alter `frontend/`.
- Rebaseline: not currently required. Stop for any unexpected source/frontend change.

## 5. Prerequisites

- No task prerequisite.
- Approved `ART-PLAN`, `ART-PLAN-REVIEW`, `ART-ARCHITECTURE`, and active four-source baseline.
- Verified Linux Node 24/pnpm environment and no concurrent editor on owned files.

## 6. Scope

### Included

- Route-aware Layout metadata, English document shell, favicon ownership, global CSS import, reset/base typography, semantic tokens, focus treatment, and utilities.
- `Brand.astro`, `ActionLink.astro`, and stable non-live `Countdown.astro` markup/controller hooks.
- Copy exact confirmed Officelite artwork plus pinned Kumbh Sans variable TTF and OFL license into the runnable package.
- Preserve a compiling starter route until Home replaces it.

### Excluded

- Final Home/Sign Up composition, countdown logic/controller, plan cards, form, persistence, or starter `Welcome.astro` deletion.
- Font transformation/subsetting, CDN requests, a new package, or broad performance/conformance claims.

## 7. Repository Context

- Observed: `frontend/` is Astro 7.1.6 ESM; `src/layouts/Layout.astro` has starter metadata/global rules and `src/pages/index.astro` imports `Welcome.astro`.
- Observed: Officelite source artwork is under `docs/starter-code/`, outside the package; current package has only starter SVG/favicon assets.
- Observed scripts: `dev`, `build`, `preview`, `astro`; no formatter/linter/test script.
- Convention: Astro files use tabs; semantic HTML, mobile-first CSS, custom properties, visible focus, and PascalCase components.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/src/layouts/Layout.astro` | Modify | Existing | Route metadata, language, favicon, global stylesheet, slot shell |
| `frontend/src/styles/global.css` | Create | Proposed | Font face, tokens, reset/base, utilities, shared action/focus states |
| `frontend/src/components/Brand.astro` | Create | Proposed | Brand artwork/link contract and accessible naming |
| `frontend/src/components/ActionLink.astro` | Create | Proposed | Real-anchor visual variants and interaction states |
| `frontend/src/components/Countdown.astro` | Create | Proposed | Four labeled units and stable controller hooks without live region |
| `frontend/src/assets/officelite/**` | Create/copy | Proposed | Confirmed logo, decoration, illustration, form-arrow assets |
| `frontend/src/assets/fonts/KumbhSans-Variable.ttf` | Create/copy | Proposed | Pinned Kumbh Sans bytes |
| `frontend/src/assets/fonts/OFL.txt` | Create/copy | Proposed | Pinned font license |
| `frontend/public/favicon.*` | Replace/delete as applicable | Existing | Remove superseded Astro branding after Layout no longer references it |

## 9. Dependencies and Interfaces

- Layout exposes route title/description props and one page slot.
- ActionLink exposes only approved primary/pricing/inverse variants and an ordinary `href`.
- Countdown exposes stable unit/value hooks consumed later by `countdown-controller.mjs`; it does not calculate time.
- Asset paths become shared inputs; `docs/starter-code/` remains unchanged source evidence.

## 10. Implementation Steps

1. Reverify sources/task baseline and inspect exact owned files.
2. Copy only approved-role artwork and exact font/license bytes; record checksums/provenance evidence.
3. Establish global font/tokens/reset/base/focus utilities and a resilient document shell.
4. Build narrow Brand, ActionLink, and Countdown primitives with semantic/native behavior.
5. Update Layout metadata/favicon/global import without breaking the starter route.
6. Inspect semantics, focus, asset failure behavior, and representative compact/medium/large rendering.
7. Run the existing production build.
8. Commit only this coherent result and create its Implementation-output snapshot through the CLI.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Default/hover/focus: approved variants remain distinct; hover applies only on hover-capable pointers; focus is independently visible.
- Missing decoration: content and operation remain intact with no filename text or overflow.
- Loading/empty/success: Not applicable; these primitives have no async product state.

### Responsive behavior

- Use intrinsic/fluid sizing and capped measures from compact upward; shared primitives must render without clipping at 375, 768, and large widths.
- Long labels and countdown values may wrap/grow without page-level horizontal overflow.

### Accessibility

- English language, route-specific title/description contract, semantic slot content, real links, meaningful brand name, empty alternatives/non-semantic decoration.
- Logical keyboard order and visible unclipped focus; no countdown live region or ornamental motion.

## 12. Validation

### Automated

- `pnpm build` in `frontend/`: production build exits successfully with the starter route still compiling.
- Asset comparison: copied TTF/OFL bytes match `SRC-ASSET-001`; no runtime CDN URL exists.

### Manual

- Inspect title/lang/viewport/layout DOM, anchor semantics, accessible brand name, empty decorative alternatives, and focus at compact/medium/large widths.
- Exercise Default/Hover/Focus; confirm hover media behavior and missing-decoration resilience.
- Compare primitives/tokens against `SRC-DS-001` without claiming unsupported pixel identity.

## 13. Acceptance Criteria

- [ ] `REQ-NFR-001`–`REQ-NFR-004` and `SPEC-ACC-001`, `SPEC-ACC-002`, `SPEC-ACC-005` are observable in the shared shell/primitives.
- [ ] `AC-027`, `AC-029`, `AC-030`, `AC-036`, `AC-037`, and `AC-044` have foundation support without premature route claims.
- [ ] Exact font/license and approved artwork provenance are verified; no font CDN is used.
- [ ] The existing route builds, and `Welcome.astro` plus its imported starter SVGs remain for `P02-T01`.
- [ ] Required CLI validations pass and the committed output snapshot is recorded.

## 14. Risks and Considerations

| Risk or assumption | Impact | Mitigation |
|---|---|---|
| Variable TTF is larger than transformed web formats | Transfer cost | Use the pinned file; do not transform without new provenance |
| Shared hooks change later | Downstream rework | Keep primitives narrow and document contracts before commit |
| Removing starter assets too early breaks build | High regression | Delete only superseded favicon here; defer imported UI/SVGs to `P02-T01` |
| Time-bound design drifts | Fidelity uncertainty | Reverify exact scoped nodes before work |

## 15. Implementation Discoveries

No discovery is known at decomposition. Record any source, requirement, design, architecture, or plan mismatch in its owning artifact before proceeding.

## 16. Deviations

None at decomposition. Implementation deviations require evidence and approval where material.

## 18. Definition of Done

- [ ] Objective and acceptance criteria are implemented within scope.
- [ ] Required build, provenance, responsive, visual, and accessibility checks pass.
- [ ] Input verification/rebaseline state is current.
- [ ] Implementation-output commit/snapshot and lineage are recorded.
- [ ] Documentation, discoveries, deviations, and remaining risks are current.
- [ ] Downstream interface contracts are clear and canonical task state is updated through the CLI.

## 19. Completion Report

Complete after implementation with owned file changes, source checks, output snapshot/commit, validation evidence, deviations, remaining risks, and next unblocked task. Do not pre-claim results during decomposition.
