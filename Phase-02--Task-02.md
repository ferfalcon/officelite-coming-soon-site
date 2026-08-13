---
artifact: TASK
id: P02-T02
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Phase 02 — Task 02: Implement the IndexedDB repository boundary

## 2. Objective

Produce and deterministically test an injected, browser-local IndexedDB repository that implements the exact `officelite` version-1 `signups` store, immutable five-field `add` transaction, completion/error/abort semantics, one-operation connection lifecycle, and no remote/logging fallback.

## 3. Source References

- Inputs: `SRC-DOC-001`, `SRC-REPO-001`, approved prerequisite output; design is not materially applicable beyond downstream state ownership; runtime None.
- Decomposition verification: `VER-026`, `VER-027`; `VER-025`/`VER-028` remain active context.
- Plan/review: `PLAN-004`; approved `PLAN-REVIEW.md`.
- Requirements: `REQ-FR-009`–`REQ-FR-011`, `REQ-BR-003`, `REQ-BR-004`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`.
- Specifications: `SPEC-DATA-002`, `SPEC-DATA-003`, `SPEC-VAL-003`, `SPEC-VAL-004`.
- Architecture: `ADR-004`, `ADR-005`.
- Related tasks: requires `P01-T01`; feeds `P02-T04`; may proceed independently of Home.

## 4. Snapshot Verification

- Before start, verify the repository/document sources and classify `P01-T01` output as Expected previous-task output.
- Rebaseline canonical task start as required; stop on unexpected store module/test/package changes.
- Design input applicable: No for repository mechanics; downstream user-visible behavior remains specified elsewhere.

## 5. Prerequisites

- `P01-T01` Complete and its approved output available.
- Confirm Node built-in test runner/package script exists or coordinate its addition without concurrent `package.json` edits.
- Exact architecture decision `ADR-004` remains approved.

## 6. Scope

### Included

- Inject `IDBFactory`; open database `officelite` version 1.
- During upgrade create/use `signups` with out-of-line auto-increment key; no indexes.
- Add exact `{ name, email, plan, phone, company }`; resolve only on transaction completion.
- Reject unavailability, open/upgrade/request/transaction error and abort; close connection after settlement.
- Deterministic fake-based tests for schema, values, ordering, all failures, one operation/connection, and close.

### Excluded

- DOM/form/status behavior, automatic retry, remote fallback, timestamps/indexes/deduplication/update/delete/retention, a third-party wrapper, or real-browser final validation.

## 7. Repository Context

- No persistence module or database dependency exists.
- ESM `.mjs` modules and Node built-in tests are the approved boundary.
- Browser API injection is necessary for deterministic tests; production default uses global IndexedDB only at call time.

## 8. Files and Modules

| Path | Action | State | Responsibility |
|---|---|---|---|
| `frontend/src/lib/signup-store.mjs` | Create | Proposed | IndexedDB open/schema/add/settlement/close contract |
| `frontend/tests/signup-store.test.mjs` | Create | Proposed | Deterministic injected fake coverage |
| `frontend/package.json` | Modify only if test script absent | Existing/prior output | Preserve exact shared test command; avoid duplicate ownership |

## 9. Dependencies and Interfaces

- Export one narrow Promise-returning persistence operation accepting an immutable candidate and optional factory injection.
- Resolve only from transaction `complete`; request success alone is insufficient.
- Reject with technical errors consumed/mapped by `P02-T04`; never expose/log form values or user copy.
- No connection or mutable candidate escapes the operation.

## 10. Implementation Steps

1. Verify/rebaseline repository/document inputs and prerequisite output.
2. Define the smallest injected API and exact v1 schema/upgrade path.
3. Implement one readonly-free readwrite add operation, full error/abort handling, once-only settlement, and close.
4. Add fake IDB primitives that preserve request-before-transaction ordering without adding a dependency.
5. Test exact record shape, schema, completion ordering, every failure/abort, one connection/operation, and close.
6. Confirm no remote/logging/data expansion and run test/build.
7. Commit and record output snapshot.

## 11. State, Responsive, and Accessibility Requirements

### States and errors

- Pending Promise, completed success, and unified technical rejection for unavailability/open/upgrade/request/transaction/abort paths.
- Retry is caller-owned; no automatic retry or duplicate-content logic.

### Responsive behavior

- Not applicable: this task has no UI. Reason: it is a pure browser data boundary.

### Accessibility

- No UI/announcement/focus responsibility. Error outcomes must remain distinguishable for the downstream controller, which owns accessible status.

## 12. Validation

### Automated

- `pnpm test`: schema creation, exact values, request-success-before-complete, completion, open/upgrade/request/transaction errors, abort, unavailability, one operation/connection, and close-after-settlement.
- `pnpm build`: module is bundle-compatible.
- Static/manual inspection: no remote endpoint, console logging, extra persisted fields, dependency, index, or retention behavior.

### Manual

- No real-browser persistence claim in this isolated task; `P02-T04`/`P03-T01` own actual DevTools IndexedDB/network checks.

## 13. Acceptance Criteria

- [ ] `AC-016`, `AC-020`, `AC-021`, `AC-025`, `AC-026`, `AC-042`, and `AC-047` have repository-boundary coverage without claiming downstream UI.
- [ ] Database/store/version/key and exact five-field record match `ADR-004`/`SPEC-DATA-003`.
- [ ] Success occurs only on transaction completion; every approved error/abort rejects and closes.
- [ ] No remote/logging/wrapper/extra schema behavior exists; tests/build pass.
- [ ] Output lineage and downstream contract are recorded.

## 14. Risks and Considerations

| Risk | Impact | Mitigation |
|---|---|---|
| Fake events overfit | Browser mismatch | Keep API-shaped fakes minimal; require later real-browser cases |
| Multiple failure events race | Double settlement/close | Centralize once-only settlement and test races |
| Package script ownership overlaps | Merge conflict | Consume prior script; modify only when absent and coordinated |
| No retention policy | Unsupported deletion claims | Add no deletion/retention behavior |

## 15. Implementation Discoveries

Record any schema/API mismatch in `ARCHITECTURE.md`/`SPEC.md` before implementation proceeds; do not silently extend the store.

## 16. Deviations

None at decomposition.

## 18. Definition of Done

- [ ] Exact repository objective, tests, build, security/privacy inspection, and acceptance criteria pass.
- [ ] Input/output lineage and canonical validations are recorded.
- [ ] No unsupported schema, remote fallback, logging, or dependency exists.
- [ ] Downstream error/settlement interface and remaining browser risk are documented.

## 19. Completion Report

Complete after implementation with files, test cases/results, input/output snapshots, deviations, remaining risks, and downstream task readiness.
