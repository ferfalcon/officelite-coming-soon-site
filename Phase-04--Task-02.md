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

- The existing P04-T01 suite already covered the product shell, responsive geometry, form validation, IndexedDB success/failure, network safety, and core keyboard flows. P04-T02 therefore required regression-coverage closure rather than product-code changes.
- The material gaps were direct activation of every Home conversion action, end-to-end plan handoff, timed/shared countdown evidence, native-select keyboard mutation, proof that invalid submissions never open IndexedDB, and visible focus evidence across the complete Sign Up keyboard sequence.
- `.github/workflows/frontend-validation.yml`, `frontend/package.json`, and `frontend/playwright.config.ts` already satisfied the approved blocking validation contract, so changing them would have added unnecessary scope.
- The P04-T02 implementation commit changes only `frontend/tests/e2e/navigation.spec.ts` and `frontend/tests/e2e/signup.spec.ts`. Runtime UI source is unchanged from the passing P04-T01 output.
- Current Figma source verification remains unchanged. The six approved reference frames rendered successfully at their expected natural dimensions: Home 375 (`2141:1813`), Home 768 (`2141:1724`), Home 1440 (`2141:1599`), Sign Up 375 (`2141:1940`), Sign Up 768 (`2141:1896`), and Sign Up 1321 (`2141:1680`).

## 16. Deviations

No product, architecture, repository-boundary, or validation-contract deviation was introduced.

The visual review intentionally carries forward the passing P04-T01 runtime/Figma comparison after a GitHub comparison proved P04-T02 contains no runtime UI source changes. The current Figma scope was reverified independently. This avoids manufacturing a second visual implementation change where none exists.

## 17. Acceptance-Criteria Coverage Map

The following map covers every approved acceptance criterion from `AC-001` through `AC-110`. “Manual” means a criterion intentionally depends on source/Figma/native-platform semantic inspection rather than being misrepresented as fully automated.

| Acceptance criteria | Validation path | Evidence |
|---|---|---|
| `AC-001–AC-004` | Automated + Figma continuity | Home/Sign Up hierarchy and responsive availability tests; current compact/medium/large Figma frames |
| `AC-005–AC-011` | Automated | Direct activation of hero, all pricing, and countdown CTAs; plan handoff/defaults; native select pointer + keyboard behavior |
| `AC-012–AC-018` | Automated | Five-value IndexedDB record inspection; required/email invalid submissions prove zero IndexedDB opens; corrected valid submit opens storage; no sign-up network request |
| `AC-019–AC-023` | Automated + semantic inspection | Success/failure status visibility, polite atomic status semantics, retained values, unchanged focus, ordinary retry |
| `AC-024–AC-025` | Automated | Countdown values change while active; Home and Sign Up expose the same target instant and label |
| `AC-026–AC-033` | Automated + semantic inspection | Sign Up logo keyboard/pointer return; full keyboard order; visible focus; success/failure role=status; labels and error relationships |
| `AC-034–AC-036` | Automated + Figma continuity | Cross-route 320–1800px sweep, content-fit transition boundaries, no application-created horizontal overflow |
| `AC-037–AC-043` | Automated + Manual | DOM hierarchy/order, responsive action availability, Sign Up logical order; Pro visual emphasis confirmed by featured runtime source plus unchanged Figma/P04-T01 visual evidence |
| `AC-044–AC-048` | Automated | Basic/Pro/Ultimate pricing activation plus generic/direct entry produce deterministic selected plan |
| `AC-049–AC-052` | Automated | One-second runtime tick, shared target, no fetch/XHR launch service, values demonstrably not frozen to Figma example |
| `AC-053–AC-054` | Automated | Long marketing, billing, feature, validation, and status copy reflows without clipping; cards/forms grow as needed |
| `AC-055–AC-065` | Automated + Figma continuity | Compact/medium/large geometry, 703/704 and 1189/1190 transition brackets, narrow/wide smoke, current six reference frames |
| `AC-066–AC-070` | Automated | Home conversion actions activate to Sign Up; plan/default context preserved; Sign Up logo activates by keyboard and pointer with visible focus |
| `AC-071–AC-073` | Automated + Manual | Native `<select>` exposes all plans, pointer and keyboard selection update current value; native popup presentation remains platform-owned and no bespoke popup is asserted |
| `AC-074–AC-077` | Automated | Empty/invalid email submissions prove zero IndexedDB opens; valid submission opens IndexedDB; no remote sign-up request |
| `AC-078–AC-082` | Automated | Success/failure outcomes, programmatic status, retained values, focus retention, and normal retry |
| `AC-083–AC-090` | Automated + semantic inspection | Full keyboard-only sequence, native select keyboard change, visible focus on every required control, invalid + focus distinction, programmatic labels and error association |
| `AC-091–AC-095` | Automated + Manual | Status live-region semantics/no forced focus; countdown ticks in a non-live subtree; cross-route reflow and required-element viewport containment; unchanged decorative/Figma composition evidence |
| `AC-096–AC-101` | Automated | Stored record contains exactly the five current-release values, plan remains in approved domain, IndexedDB is browser-local, network remains inert |
| `AC-102–AC-107` | Automated | Required-field and HTML single-address email blocking, field-specific feedback, and correction recovery |
| `AC-108–AC-110` | Automated | Forced IndexedDB failure shows failure only, preserves values, and permits ordinary retry that later succeeds |

No acceptance criterion is left unmapped. No Playwright engine result is treated as a formal product browser-support policy.

## 18. Definition of Done

- [x] The objective is implemented without scope expansion.
- [x] Task-specific acceptance criteria pass.
- [x] Required automated/manual validation executes successfully.
- [x] Accessibility, responsive/state/error requirements owned by this task are verified.
- [x] Snapshot verification is complete; task-start lineage contained only expected canonical workflow output before implementation.
- [ ] An implementation output commit/snapshot is recorded separately from workflow bookkeeping. Canonical `task complete` owns this item.
- [x] Relevant documentation/discoveries/deviations are updated.
- [x] Downstream P04-T03 has a stable validation contract once canonical completion records P04-T02 output.

## 19. Completion Report

### Affected files

- `frontend/tests/e2e/navigation.spec.ts`
- `frontend/tests/e2e/signup.spec.ts`
- `Phase-04--Task-02.md` — acceptance coverage/evidence narrative only

### Behavior implemented

No product behavior changed. Regression coverage now directly protects every previously identified acceptance gap: complete CTA activation and plan context, countdown runtime/shared-target behavior, native-select keyboard selection, invalid-before-storage enforcement, and complete Sign Up focus-state evidence.

### Validation evidence

- GitHub Actions **Frontend Validation run #32** (`33197785445`) passed on implementation commit `6775a7391d51464ea9b07b59e3bd7ad1ee0ca841`.
- `pnpm check`: Passed.
- `pnpm build`: Passed; existing static Astro deployment boundary unchanged.
- `pnpm test:e2e`: **56/56 passed** in Chromium.
- Manual accessibility/source review: Passed for labels/error relationships, status announcement semantics, focus retention, invalid/focus distinction, countdown non-live semantics, and no unsupported remote submission.
- Figma/source continuity review: Passed; configured node `4:3` remains unchanged and all six reference-frame screenshots rendered successfully.
- Runtime-fidelity continuity: GitHub comparison from P04-T01 output `9f9759d81fbf23ca3e935b00ba1df191002637d2` to the P04-T02 implementation commit contains no runtime UI source changes.

### Deviations and remaining risks

No task-scope deviation. Native select popup presentation remains browser/platform-owned. A formal browser/device support matrix remains intentionally undefined. Production Vercel acceptance remains owned by P04-T03.

### Next permitted action

Record P04-T02 completion through the canonical workflow CLI. Do not begin P04-T03 until the refreshed generated workflow state marks it unblocked.
