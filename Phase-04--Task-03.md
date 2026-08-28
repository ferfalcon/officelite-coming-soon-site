---
artifact: TASK
id: P04-T03
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

# Phase 04 — Task 03: Verify Vercel deployment and production readiness

## 2. Objective

Verify the final implementation deploys through the existing Vercel `frontend/` static build path and that production Home/Sign Up critical behavior matches the validated repository output without adding server runtime or changing the local-data boundary.

## 3. Source References

- Source baseline: `SOURCE-BASELINE.md`
- Planned design input: `SRC-DS-001`
- Planned repository baseline: `SRC-REPO-001`; canonical `task start` may advance this to an expected previous-task output/current checkpoint.
- `PLAN.md`: `PLAN-009`
- `PLAN-REVIEW.md`: Stage 8 corrections and residual-risk table
- Requirement IDs: `REQ-CON-002–004`, `REQ-FR-008`
- Specification/design references: `SPEC-DATA-003` and production-relevant acceptance criteria from the approved specification
- Architecture references: `ADR-008`, `ADR-010`
- Related tasks: Prerequisite `P04-T02`; final implementation task before Stage 11

## 4. Snapshot Verification

Before implementation, reverify applicable Figma evidence and start through the canonical CLI so repository lineage is classified. Expected previous-task output may become the task-start snapshot. Stop and rebaseline if a material design or `frontend/` change is unexpected.

## 5. Prerequisites

`P04-T02` Complete with green repository validation. Reverify current Vercel project/build settings before relying on Stage 7 evidence.

## 6. Scope

### Included
- Inspect final Vercel deployment/build logs and READY status.
- Confirm build executes from `frontend/`, uses compatible Node/pnpm, runs static Astro build, and emits `frontend/dist/`.
- Production smoke for `/` and `/sign-up/`, plan context, local persistence, keyboard flow, responsive conditions, and network safety.
- Confirm no serverless API/server adapter/runtime secret was introduced.
- Record deployment/runtime evidence for Stage 11.

### Excluded
- Changing Vercel deployment-trigger policy.
- Adding Vercel config/server functions without concrete mismatch evidence.
- New product behavior or environment-dependent remote persistence.

## 7. Repository Context

Stage 7/8 evidence showed the existing linked Vercel project builds from `/vercel/path0/frontend`, Node 24.x, managed pnpm, static `dist/`, and READY deployments. This task must re-check actual final state rather than infer success from GitHub.

## 8. Files and Modules

| Path | Action | Responsibility |
|---|---|---|
| Application files | None expected | Verification-only unless a concrete deployment mismatch is discovered |
| Vercel configuration | None expected | Any required change must be evidence-backed and remain within approved static architecture |

## 9. Dependencies and Interfaces

GitHub is authority for implementation commit/validation; Vercel is authority for deployment/runtime. Production must preserve local IndexedDB persistence and no sign-up network endpoint. If a deployment mismatch requires architecture drift, stop and reopen the owning stage instead of patching around it.

## 10. Implementation Steps

1. Start from the final validated implementation output and re-read Vercel project settings relevant to build root, Node, install/build, and output.
2. Identify the deployment for the final implementation commit and inspect its build/deploy logs and READY state.
3. Open production Home and Sign Up routes and smoke critical navigation/plan/countdown/form/local-persistence behavior.
4. Inspect production network activity to confirm no sign-up API/server function and verify representative responsive/keyboard behavior.
5. If no deployment change is required, record verification evidence without introducing configuration churn; if a concrete mismatch exists, repair only within approved static architecture and rerun repository/deployment validation.
6. Record production evidence and remaining non-blocking product/policy gaps for Stage 11.

## 11. State, Responsive, and Accessibility Requirements

- Production keyboard/focus and representative reflow checks must match repository validation.
- IndexedDB remains browser-local; no PII should appear in requests/URLs beyond approved plan key.
- Status/error behavior must remain non-modal and usable in deployed output.
- No formal browser-support policy is created by the smoke environment.

## 12. Validation

### Deployment/runtime
- Vercel deployment for the final implementation commit is `READY`.
- Build log shows work from `frontend/` and static Astro output; no server adapter/function is introduced.
- Production `/` and `/sign-up/` return successfully.
### Manual browser smoke
- Home CTAs and plan-specific Sign Up initialization work.
- Valid local submission persists in IndexedDB and does not send sign-up data remotely.
- Keyboard/focus and representative compact/large responsive conditions remain usable.
- Compare production behavior with the green P04-T02 repository result.

No check is considered passed until it executes successfully against the task output.

## 13. Acceptance Criteria

- [ ] Existing Vercel project successfully serves the final implementation through the approved static `frontend/` path.
- [ ] Production critical flows match validated repository behavior.
- [ ] No serverless sign-up endpoint, remote persistence, or runtime architecture drift is present.
- [ ] Deployment/runtime evidence is sufficient to begin Stage 11 implementation review.

## 14. Risks and Considerations

| Risk | Mitigation |
|---|---|
| Platform settings drift since Stage 8 | Reinspect actual project/deployment before concluding readiness |
| Auto-deploy noise from workflow/document commits | Verify the deployment tied to the final implementation commit; do not change trigger policy |
| Verification finds architecture mismatch | Stop and reopen owning architecture/plan stage instead of silently expanding scope |

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
