---
artifact: TASKS-INDEX
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Tasks Index

## 2. Document Information

- Version: 1.0
- Last updated: 2026-08-13
- Project: Officelite coming soon site
- Canonical task registry: `.workflow/generated/TASK-INDEX.md` (read-only projection)
- Source plan: approved `PLAN.md`
- Plan review: approved `PLAN-REVIEW.md`
- Architecture: approved `ARCHITECTURE.md`; `ADR-001`–`ADR-006`
- Task lifecycle, prerequisites, baselines, references, outputs, and validation status are owned by `.workflow/workflow-record.json` and changed only through the CLI.

## 3. Scope

### Included

- Replace the Astro starter with the complete responsive Home route and add the complete responsive Sign Up route.
- Implement shared visual primitives, pinned assets, plan/query rules, countdown behavior, native form semantics, IndexedDB persistence, transaction feedback, and regression evidence.
- Integrate accessibility, responsive behavior, states, errors, tests, build verification, and manual browser evidence into the owning tasks.

### Excluded

- Backend/API submission, authentication, analytics, deployment changes, custom routing, a UI framework, a custom select, a font CDN, or a third-party IndexedDB wrapper.
- Product redesign, new commercial copy, data retention/deletion policy, automated browser tooling, or unsupported browser/WCAG/performance guarantees.
- Changes to `docs/implementation-workflow/`, `docs/starter-code/`, or unrelated repository content.

## 4. Execution Rules

- Execute only one CLI-selected Ready task at a time and only after all recorded prerequisites are Complete.
- Reverify active sources and the task-start repository snapshot before implementation; classify changes through the approved rebaseline protocol.
- Preserve a buildable repository at each task boundary and commit only the task's coherent result.
- Do not silently add work unsupported by `PLAN.md`, update mutable task state in narrative files, or edit the same shared file concurrently.
- Keep accessibility, responsiveness, state/error behavior, privacy, and tests in the feature task that owns them.
- Record implementation discoveries upstream instead of silently working around documentation or baseline errors.

## 5. Phase Summary

| Phase | Objective | Depends on | Parallel work | Completion criteria |
|---|---|---|---|---|
| Phase 01 | Establish the self-contained shared foundation and deterministic plan/countdown rules | Approved sources, architecture, and plan | Sequential because `P01-T02` consumes foundation hooks | Shared shell/assets build; deterministic rule tests pass |
| Phase 02 | Deliver Home, the isolated storage boundary, static Sign Up composition, then Sign Up orchestration | Phase 01 as recorded per task | Home, storage, and static Sign Up may proceed when their own prerequisites are complete and file ownership is disjoint | Both routes and local persistence behavior are integrated and independently verified |
| Phase 03 | Run the complete acceptance, fidelity, accessibility, privacy, and regression matrix | Every Phase 01/02 task | None | Test/build/preview and recorded manual matrix pass; residual defects are corrected in owning files |

## 6. Phase Details

### Phase 01 — Shared foundation and deterministic rules

- Entry: `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`, and `SRC-ASSET-001` verify without a material change.
- `P01-T01` establishes Layout metadata, global CSS/tokens, shared primitives, confirmed artwork, the pinned font/license, and a compiling route.
- `P01-T02` then adds dependency-free plan/countdown modules, the timer controller, and deterministic Node tests.
- Completion: the current route builds without runtime CDN requests and shared behavior is testable independently of either final route.

### Phase 02 — Route results and local data boundary

- `P02-T01` delivers Home after both Phase 01 tasks.
- `P02-T02` implements the isolated IndexedDB contract after the foundation and may proceed independently of Home.
- `P02-T03` builds the static Sign Up route/form and stable controller hooks after both Phase 01 tasks.
- `P02-T04` is strictly later than `P02-T03` and the storage task; it alone owns follow-up `SignupForm.astro` edits for validation, busy state, announcements, and persistence integration.
- Home, storage, and static Sign Up may overlap only when their owned paths remain disjoint; no two tasks may concurrently edit shared primitives.
- Completion: both routes build, Home navigation intent is correct, and Sign Up performs the exact local transaction contract.

### Phase 03 — Integrated regression and evidence

- `P03-T01` begins only after every prior task completes and active sources are freshly verified.
- It runs the full acceptance matrix against built output, corrects only in-scope defects in their owning files, and records exact environments/outcomes.
- Completion: no required check is failing or unverified and the implementation is ready for final workflow review.

## 7. Plan Coverage

| `PLAN.md` item | Task or tasks | Coverage | Notes |
|---|---|---|---|
| `PLAN-001` | `P01-T01` | Complete | Shared shell, tokens, primitives, pinned assets/font/license |
| `PLAN-002` | `P01-T02` | Complete | Plan/query and countdown rules/controller/tests |
| `PLAN-003` | `P02-T01` | Complete | Full Home route and ordered starter removal |
| `PLAN-004` | `P02-T02` | Complete | Exact IndexedDB schema/transaction boundary and tests |
| `PLAN-005` | `P02-T03`, `P02-T04` | Complete | Required sequential static composition then orchestration split |
| `PLAN-006` | `P03-T01` | Complete | Full integrated regression and evidence |

## 8. Requirement and Specification Coverage

| Requirement or specification group | Priority | Owning tasks | Final validation | Coverage |
|---|---|---|---|---|
| `REQ-FR-001`, `REQ-FR-003`–`REQ-FR-005`; `SPEC-BEH-001`, `SPEC-INT-001`, `SPEC-INT-002` | Must | `P01-T01`, `P01-T02`, `P02-T01` | `P03-T01` | Complete |
| `REQ-FR-002`, `REQ-FR-005`–`REQ-FR-008`; `SPEC-BEH-002`, `SPEC-BEH-003`, `SPEC-INT-003`–`SPEC-INT-005` | Must | `P01-T02`, `P02-T03`, `P02-T04` | `P03-T01` | Complete |
| `REQ-FR-009`–`REQ-FR-011`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`; `SPEC-DATA-002`, `SPEC-DATA-003`, `SPEC-VAL-003`, `SPEC-VAL-004` | Must | `P02-T02`, `P02-T04` | `P03-T01` | Complete |
| `REQ-FR-012`, `REQ-BR-001`, `REQ-BR-002`, `REQ-BR-006`; `SPEC-BEH-004`, `SPEC-BEH-005`, `SPEC-DATA-004` | Must | `P01-T02`, route tasks | `P03-T01` | Complete |
| `REQ-AR-001`–`REQ-AR-005`; `SPEC-ACC-001`–`SPEC-ACC-005` | Must | `P01-T01`, `P01-T02`, `P02-T01`, `P02-T03`, `P02-T04` | `P03-T01` | Complete |
| `REQ-NFR-001`–`REQ-NFR-004`; `SPEC-BEH-006`–`SPEC-BEH-008` | Must | Foundation and route tasks | `P03-T01` | Complete |
| `REQ-BR-003`–`REQ-BR-005`, `REQ-CON-001`–`REQ-CON-005`; specification Sections 7–12 | Must | `P02-T02`, `P02-T04` | `P03-T01` | Complete |
| `AC-001`–`AC-047` | Must | Feature-specific tasks | `P03-T01` | Complete |

## 9. Cross-Cutting Coverage

| Concern | Integrated tasks | Final validation | Gap |
|---|---|---|---|
| Source verification and rebaseline | Every task | `P03-T01` | None; Figma remains Time-bound |
| Accessibility | `P01-T01`, `P01-T02`, `P02-T01`, `P02-T03`, `P02-T04` | `P03-T01` | No formal WCAG level is claimed |
| Responsive behavior | `P01-T01`, `P02-T01`, `P02-T03`, `P02-T04` | `P03-T01` | Numeric breakpoints are implementation-selected from first failure |
| Loading, empty, error, success, retry, and expiry states | `P01-T02`, `P02-T02`, `P02-T03`, `P02-T04` | `P03-T01` | None within approved scope |
| Security and privacy | `P02-T02`, `P02-T04` | `P03-T01` | No retention/deletion policy is invented |
| Performance | `P01-T01`, `P01-T02`, route tasks | `P03-T01` | No numeric threshold; claims remain observational |
| Documentation and lineage | Every task | `P03-T01` | Canonical state remains CLI-owned |
| Regression protection | Logic/storage tests in `P01-T02`/`P02-T02`; build checks throughout | `P03-T01` | Browser/a11y/visual automation is not introduced |

## 10. Blocked Work and Coordination Risks

| Task | Risk | Decision owner | Required action | Impact | Status |
|---|---|---|---|---|---|
| All | Mutable Figma input could drift | Workflow operator | Reverify exact scoped IDs before task start and final review | Material drift may require rebaseline | Open, non-blocking |
| `P02-T01`, `P02-T03` | Final numeric breakpoints are unspecified | Implementer/reviewer | Record first-failure interval and adjacent-width evidence | Arbitrary breakpoint would fail validation | Open, non-blocking |
| `P02-T03`, `P02-T04` | Shared `SignupForm.astro` ownership | Workflow operator | Execute sequentially; controller task owns follow-up edits | Concurrent edits could invalidate hooks | Resolved by prerequisites |
| `P02-T02`, `P02-T04` | IndexedDB behavior varies by environment | Implementer/reviewer | Use deterministic fakes plus real-browser cases | Claims limited to tested environment | Open, non-blocking |
| `P03-T01` | No browser matrix/WCAG/performance threshold | Product/review owner | Report exact tested outcomes only | Prevents broad conformance claims | Accepted limitation |

## 11. Source-change Log

| Date | Verification | Affected tasks | Impact and action | Status |
|---|---|---|---|---|
| 2026-08-13 | `VER-025`–`VER-028` | All | Figma scope, repository commit, README checksum, and Kumbh Sans blobs unchanged before decomposition; Figma remains Time-bound | Complete |

## 12. Overall Completion Criteria

- [ ] Every task is Complete in the canonical task registry.
- [ ] Every required task validation has Passed.
- [ ] Every approved requirement, specification, plan item, and `AC-001`–`AC-047` is covered.
- [ ] Task source references remain verified or an approved rebaseline is recorded.
- [ ] Implementation discoveries and deviations are propagated to owning artifacts.
- [ ] No critical or high-severity blocker remains.
- [ ] Final implementation validation and review evidence are complete.

## 13. Index Validation

### Review pass 1 — Completeness and correctness

- [x] Every plan item maps to at least one canonical task.
- [x] Every task has one coherent, independently verifiable result.
- [x] The generated task registry is current at review time.
- [x] Every referenced task ID exists in the canonical registry.
- [x] Phase entry/completion criteria and coverage tables are complete.

### Review pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Requirement, specification, architecture, and plan references resolve in approved artifacts.
- [x] Every task uses the approved four-source input set and `SRC-REPO-001` task baseline in the record.
- [x] Parallel work has disjoint ownership; the Sign Up split is explicitly sequential.
- [x] Accessibility, responsiveness, states, errors, privacy, and tests are integrated before final regression.
- [x] Risks and limitations are visible without copying mutable task status.
- [x] No task introduces unsupported scope or silently newer source content.
