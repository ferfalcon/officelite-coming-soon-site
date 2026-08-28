---
artifact: TASK
id: P01-T01
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

# Phase 01 — Task 01: Establish product foundation and remote validation

## 2. Objective

Replace the starter foundation with an Officelite-ready Astro shell, design foundations, approved runtime assets, self-hosted typography, and a reproducible diagnostics/E2E validation transport without implementing route-specific product behavior.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-001`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-CON-001`, `REQ-CON-002`, `REQ-NFR-001`, `REQ-AR-002`
- Specification/design references: `SPEC-ACC-002`, `SPEC-ACC-006`; Figma foundations/assets in node `4:3`
- Architecture references: `ADR-002`, `ADR-007`, `ADR-010`
- Related tasks: Downstream `P01-T02`

## 4. Snapshot Verification

Before implementation:
- Reverify the applicable Figma evidence when this task depends on visual/state intent.
- Start through the canonical CLI so repository HEAD is classified as the planned baseline, expected previous-task output, or a task-start checkpoint.
- Treat workflow/documentation-only commits as expected lineage only when canonical task-start diagnostics accept them.
- Stop and rebaseline upstream if a material Figma or `frontend/` change is unexpected.

## 5. Prerequisites

None. Confirm `frontend/AGENTS.md`, current package/lockfile state, approved source assets, and canonical source verification before editing.

## 6. Scope

### Included
- Remove starter-only UI/assets and establish product document shell/metadata/favicon.
- Add global tokens/base styles/focus-visible treatment and self-hosted Kumbh Sans.
- Copy only approved runtime-used source assets from `docs/starter-code/assets/` into `frontend/`.
- Add Astro diagnostics, Playwright configuration/scripts, and the path-scoped `frontend-validation.yml` workflow.
- Pin pnpm only if execution-time repository/Vercel evidence still supports the approved PLAN-001 interpretation.

### Excluded
- Home/Sign Up feature composition.
- Plan parsing/countdown business behavior.
- Any backend, remote API, server adapter, analytics, or change to the canonical design-workflow caller.

## 7. Repository Context

At `SRC-REPO-001`, `frontend/` is the Astro 7 starter: `index.astro` renders `Welcome.astro`; `Layout.astro` has starter metadata; package scripts are dev/build/preview/astro only; no product styles/tests exist. Node is `>=22.12.0`; Astro config is static/default. The approved product assets exist under `docs/starter-code/assets/`.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| `frontend/package.json` / `frontend/pnpm-lock.yaml` | Modify | Font, diagnostics, Playwright, scripts, reproducibility |
| `frontend/src/layouts/Layout.astro` | Modify | Product shell, metadata, global imports |
| `frontend/src/styles/global.css` | Create | Tokens, base styles, focus/container helpers |
| `frontend/src/components/Welcome.astro` | Delete | Remove starter UI |
| `frontend/src/assets/astro.svg` / `background.svg` | Delete | Remove starter assets |
| `frontend/src/assets/{shared,home,sign-up}/...` | Create from approved sources | Runtime product assets |
| `frontend/public/favicon.png` | Create | Product favicon |
| `frontend/playwright.config.ts` | Create | E2E preview/browser configuration |
| `.github/workflows/frontend-validation.yml` | Create | Remote check/build/E2E transport scoped to frontend changes |

## 9. Dependencies and Interfaces

Preserve Astro static rendering and strict TypeScript. Global tokens/styles become the stable presentation foundation for later tasks. The validation workflow must run application commands from `frontend/` and remain independent of `.github/workflows/design-workflow-command.yml`.

## 10. Implementation Steps

1. Reverify baseline and inspect package/lockfile, layout, starter files, asset sources, and nested instructions.
2. Resolve execution-time versions before changing package metadata; add only the approved dependencies/scripts and update the lockfile.
3. Copy approved runtime assets and replace starter metadata/favicon/font/global styling.
4. Remove starter-only component/assets while keeping a valid static `/` route shell.
5. Configure Playwright preview and the isolated path-filtered GitHub validation workflow.
6. Run diagnostics/build plus a smoke check that starter content is gone and product font/assets resolve; record evidence.

## 11. State, Responsive, and Accessibility Requirements

- Base focus-visible styling must be clearly visible and survive later error states.
- Base layout must not create page-level horizontal scrolling; containers remain fluid.
- Decorative background assets are presentational; the shell must not create misleading accessible names.
- No loading/success/error product state is introduced here.

## 12. Validation

### Automated
- Existing/final Astro build: `pnpm build` must emit static output.
- Newly established diagnostics: `pnpm check` must pass after the task adds the script/dependencies.
- Validate Playwright configuration can resolve the preview server; no feature-flow pass is claimed before tests exist.
### Manual
- `/` renders without Astro starter branding/content.
- Product favicon/font/assets resolve from runtime paths.
- Inspect the new GitHub workflow for `frontend/**`-scoped application validation and no edits to the canonical workflow caller.
- Verify global focus and container primitives at narrow/large widths.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] `PLAN-001` output is a valid Officelite product foundation rather than the Astro starter.
- [ ] `REQ-CON-001/002`: implementation remains inside the Astro/static `frontend/` boundary except the approved validation workflow.
- [ ] `SPEC-ACC-002/006`: visible focus foundation and reflow-safe base styling are established.
- [ ] Diagnostics/build and remote validation transport are reproducible.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Dependency/pnpm drift | Recheck actual package/Vercel evidence; update lockfile intentionally |
| Font/asset bloat or wrong copies | Import/copy only approved runtime-used resources |
| CI scope creep | Add one isolated frontend-validation workflow; do not modify design-workflow caller |

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
