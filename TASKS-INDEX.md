---
artifact: TASKS-INDEX
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

# Tasks Index

## 1. State Ownership Mode

This project is CLI-managed. Canonical task IDs, status, prerequisites, baselines, references, output lineage, and structured validation state are owned by `.workflow/workflow-record.json` and projected in `.workflow/generated/TASK-INDEX.md`. This document owns phase rationale, coverage, coordination, and implementation guidance only.

## 2. Document Information

- Project: Officelite coming soon site
- Source plan: `PLAN.md`
- Plan review: `PLAN-REVIEW.md`
- Architecture: `ARCHITECTURE.md` — required and approved
- Implementation root: `frontend/`
- Baseline: `SRC-DS-001`, `SRC-REPO-001`
- Task set: nine implementation tasks across four phases

## 3. Scope

### Included
- Replace the Astro starter with the approved Home and Sign Up experience.
- Shared plan data, plan URL context, countdown, native form validation, IndexedDB persistence, status feedback, responsive/accessibility behavior, regression coverage, and Vercel verification.
- The single approved repo-wide integration: `.github/workflows/frontend-validation.yml`.

### Excluded
- Backend/API, authentication, payments, analytics, CMS, remote persistence or logging.
- Bespoke plan-select popup, undefined countdown terminal behavior, or invented local-data lifecycle policy.
- Design edits outside Figma node `4:3`.

## 4. Execution Rules

- Use the canonical generated task registry for mutable task state.
- Start only tasks whose prerequisites are complete; Home and Sign Up may branch after `P01-T02`.
- At task start, verify the current Figma scope and repository lineage. Expected previous-task outputs may become the new task-start snapshot through the canonical CLI.
- Never silently rebaseline an unexpected source change.
- Integrate accessibility, responsive behavior, state/error handling, and tests in the task that owns the behavior.
- Do not expand architecture or product scope during implementation; reopen the owning upstream artifact when a material discrepancy is discovered.

## 5. Phase Summary

| Phase | Objective | Depends on | Parallel work | Completion criteria |
|---|---|---|---|---|
| Phase 01 | Establish the product foundation and shared contracts | None | Sequential | Product shell/toolchain is usable; shared plan/countdown contracts compile and are ready for route use |
| Phase 02 | Complete Home | Phase 01 | May run alongside Phase 03 after `P01-T02` | Home hierarchy, CTAs, plan context, states, responsive behavior, and route tests are complete |
| Phase 03 | Complete Sign Up behavior | Phase 01 | `P03-T01` may run alongside Phase 02 | Native form, validation, IndexedDB persistence, status feedback, keyboard flow, and network safety are complete |
| Phase 04 | Converge, harden, validate, and verify production | Phases 02–03 | Sequential | Fidelity sweep, full regression suite, repository validation, and Vercel production verification pass |

## 6. Phase Details

### Phase 01 — Foundation and shared contracts
- `P01-T01` implements `PLAN-001`: shell, tokens, assets, font, diagnostics, Playwright, and the path-scoped remote frontend-validation workflow.
- `P01-T02` implements `PLAN-002`: shared plan domain, URL plan helpers, launch configuration, and reusable countdown.
- Phase 01 closes when later route tasks can consume stable shared contracts without revisiting the foundation.

### Phase 02 — Home conversion experience
- `P02-T01` implements `PLAN-003`.
- It consumes Phase 01 contracts but does not depend on Sign Up markup.
- It may proceed in parallel with `P03-T01` once `P01-T02` is complete.

### Phase 03 — Sign Up interaction and persistence
- `P03-T01` implements `PLAN-004`: route and accessible native form shell.
- `P03-T02` implements `PLAN-005`: validation and field feedback.
- `P03-T03` implements `PLAN-006`: IndexedDB persistence and contextual status.
- Validation must complete before persistence so invalid records cannot reach storage.

### Phase 04 — Fidelity, regression protection, and deployment
- `P04-T01` implements `PLAN-007` after Home and Sign Up are functionally complete.
- `P04-T02` implements `PLAN-008` and closes the `AC-001`–`AC-110` regression map.
- `P04-T03` implements `PLAN-009` by verifying the existing Vercel static deployment path and production behavior.

## 7. Plan Coverage

| PLAN item | Task | Coverage | Notes |
|---|---|---|---|
| PLAN-001 | P01-T01 | Complete | Foundation/toolchain/remote validation |
| PLAN-002 | P01-T02 | Complete | Shared plans, plan context, countdown |
| PLAN-003 | P02-T01 | Complete | Home |
| PLAN-004 | P03-T01 | Complete | Sign Up shell |
| PLAN-005 | P03-T02 | Complete | Validation |
| PLAN-006 | P03-T03 | Complete | IndexedDB/status |
| PLAN-007 | P04-T01 | Complete | Cross-route fidelity/responsive hardening |
| PLAN-008 | P04-T02 | Complete | Full regression and repository validation |
| PLAN-009 | P04-T03 | Complete | Vercel production verification |

## 8. Requirement and Specification Coverage

| Requirement/specification area | Task(s) | Final validation | Coverage |
|---|---|---|---|
| Product constraints, static Astro boundary, shared shell | P01-T01 | P04-T02, P04-T03 | Complete |
| Plan domain/context and countdown | P01-T02 | P02-T01, P03-T01, P04-T02 | Complete |
| Home content/navigation/actions | P02-T01 | P04-T02 | Complete |
| Sign Up route/native controls/plan initialization | P03-T01 | P04-T02 | Complete |
| Required/email validation and field feedback | P03-T02 | P04-T02 | Complete |
| IndexedDB, success/failure, no remote submission | P03-T03 | P04-T02, P04-T03 | Complete |
| Accessibility and responsive requirements | P01-T01, P02-T01, P03-T01–T03, P04-T01 | P04-T02, P04-T03 | Complete |
| Stage 2 acceptance criteria AC-001–AC-110 | Owning tasks above | P04-T02 | Complete |
| Deployment/static runtime constraints | P01-T01, P04-T03 | P04-T03 | Complete |

## 9. Cross-Cutting Coverage

| Concern | Integrated tasks | Final validation | Gap |
|---|---|---|---|
| Source verification/rebaseline | Every task | P04-T03 | None |
| Accessibility | P01-T01, P02-T01, P03-T01–T03, P04-T01 | P04-T02/P04-T03 | None |
| Responsive behavior | P01-T01, P02-T01, P03-T01, P04-T01 | P04-T02/P04-T03 | None |
| Error/success states | P03-T02/P03-T03 | P04-T02 | Unsupported loading/disabled states are not invented |
| Security/privacy | P03-T01/P03-T03 | P04-T02/P04-T03 | No remote PII transmission |
| Performance | P01-T01/P04-T01 | P04-T02 | No unsupported numeric threshold introduced |
| Documentation | Every task when discrepancies arise | P04-T02 | None |
| Regression protection | Feature tasks add focused tests | P04-T02 | None |

## 10. Coordination Risks

| Area | Risk | Required action | Status |
|---|---|---|---|
| P02-T01 / P03-T01 | Parallel work can overlap in shared logo/countdown contracts | Treat Phase 01 exports as stable; coordinate shared-file changes rather than duplicating them | Managed |
| Figma | `SRC-DS-001` is mutable | Reverify at task boundaries; rebaseline only through canonical workflow when material | Managed |
| Copy/date/policy gaps | Feedback copy, countdown terminal state, browser matrix, local-data lifecycle remain non-blocking | Preserve approved bounded assumptions; do not invent new policy | Managed |
| Deployment | Existing Vercel auto-deploy behavior is broader than app-only changes | Do not change deploy-trigger policy in this scope | Managed |

## 11. Source-change Log

No Stage 9 source change required rebaseline. Stage 8 verification found the configured Figma scope structurally unchanged and no implementation-root change from `SRC-REPO-001`.

## 12. Overall Completion Criteria

- [ ] Every canonical task is Complete.
- [ ] Every task's required validation passed or is explicitly not applicable.
- [ ] Every Must requirement and material specification is covered.
- [ ] Task snapshot lineage remains valid.
- [ ] Documentation discrepancies discovered during implementation are propagated.
- [ ] No critical/high blocker remains.
- [ ] Stage 11 implementation validation can begin.

## 13. Index Validation

### Review pass 1 — Completeness and correctness
- [x] Every PLAN item maps to exactly one owning task.
- [x] Every task has one coherent, independently verifiable objective.
- [x] Task IDs and prerequisites match the canonical generated registry.
- [x] Phase entry/completion criteria and parallelization constraints are explicit.
- [x] Validation and deployment work are included.

### Review pass 2 — Consistency, traceability, source integrity, risks, and uncertainty
- [x] PLAN-001–PLAN-009 are registered canonical trace anchors and map to tasks.
- [x] Task baselines start from `SRC-REPO-001` and may advance only through canonical task-start lineage.
- [x] Home/Sign Up parallel work has an explicit shared-contract boundary.
- [x] Accessibility/responsiveness/errors/tests are integrated, not deferred solely to cleanup.
- [x] Non-blocking product/policy gaps remain visible and are not converted into requirements.
