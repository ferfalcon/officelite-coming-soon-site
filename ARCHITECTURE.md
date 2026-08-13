---
artifact: ARCHITECTURE
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Architecture

## 1. Document Information

- Version: 0.1
- Last updated: 2026-08-13
- Owners: architecture author — Codex; approval owner — `ferfalcon`
- Scope: target structure for Home and Sign Up in the existing `frontend/` Astro package.
- Source baseline: `SOURCE-BASELINE.md`
- Repository snapshot: `SRC-REPO-001`
- Runtime snapshots: None
- Related documents: approved `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, and `DOCUMENT-REVIEW.md`; `PLAN.md` is not yet created.
- Lifecycle and artifact baseline: owned by the canonical CLI record.

## 2. Purpose and Scope

This document protects the structural decisions needed to add two connected static routes, shared countdown behavior, URL-carried plan intent, native form orchestration, and browser-local IndexedDB persistence to the pinned Astro starter.

It distinguishes the **Observed current architecture** at `SRC-REPO-001`, the **Accepted target architecture**, and the small **Transitional replacement** of starter content. It does not define file-by-file sequencing, CSS measurements, deployment, a backend, authentication, analytics, retention policy, or future API behavior.

## 3. Evidence and Sources

- `SRC-REPO-001`: `frontend/package.json`, lockfile, Astro/TypeScript configuration, current page/layout/component/assets, and absence of adapters, test runners, persistence modules, or Officelite feature code.
- `SRC-DS-001`: two route compositions, reusable patterns, responsive/state evidence, and the Time-bound limitation confirmed by `VER-010`.
- `SRC-DOC-001`: navigation, plan handling, native select, validation, IndexedDB, announcements, countdown, keyboard behavior, and future-API exclusion.
- Approved Requirements: all 35 `REQ-*` definitions and `AC-001`–`AC-038`.
- Approved Specification: `SPEC-BEH-001`–`SPEC-BEH-008`, `SPEC-INT-001`–`SPEC-INT-006`, `SPEC-ACC-001`–`SPEC-ACC-005`, `SPEC-DATA-001`–`SPEC-DATA-004`, and `SPEC-VAL-001`–`SPEC-VAL-004`.
- `ferfalcon`'s approved target `2026-12-31T00:00:00-03:00` and permanent all-zero expiry behavior.

Current Astro and repository-required modern form guidance was consulted for feasibility, not promoted to project authority. The required native Plan select, absence of a backend, and lack of an approved numeric touch-target threshold override generic alternatives.

## 4. System Context

```text
Visitor
  → static Home or Sign Up document
    → same-origin bundled browser modules
      → URL query (entry plan intent)
      → document/form state
      → origin-scoped IndexedDB (accepted records)

No application server, remote sign-up API, authentication provider,
analytics service, or deployment mutation is inside the boundary.
```

The only runtime boundary storing submitted data is the visitor's browser origin. Functioning submission behavior must not send form values to a remote service.

## 5. Architectural Goals

1. Preserve native navigation, form, select, input, and button semantics.
2. Isolate URL, timer, DOM, validation, and IndexedDB side effects.
3. Keep static deployment with no adapter, UI framework, global state library, or remote service.
4. Keep plan/countdown rules pure and persistence outcomes controllable.
5. Report success only after transaction completion; never transmit or log submitted values.
6. Share genuine layout, action, countdown, plan, field, token, and behavior primitives.
7. Use repository-covered assets and require a registered self-hosted font source or approved fidelity deviation.

Client-side JavaScript and IndexedDB are required for successful current-release persistence/countdown behavior. A no-JavaScript or server fallback is outside approved scope.

## 6. Current Architecture

Observed at `SRC-REPO-001`:

- One ESM package, `frontend/`, uses Astro `7.1.6`, Node `>=22.12.0`, a pnpm lockfile, and strict Astro TypeScript.
- `astro.config.mjs` keeps default static output; no adapter, middleware, endpoint, environment contract, or deployment config exists.
- Routing contains only `src/pages/index.astro`, which imports one layout and starter component.
- No Officelite route, token layer, browser module, state system, IndexedDB adapter, form controller, countdown utility, or frontend test framework exists.
- Repository-covered Officelite markup/assets are under `docs/starter-code/`, outside the runnable package.

Starter content/boundaries are current-state evidence, not target truth.

## 7. Target and Transitional Architecture

Accepted target:

- Keep default static Astro output and file-based routing.
- Provide Home at `/` and Sign Up at `/sign-up/` as separate Astro pages using standard anchors/history.
- Use Astro components for static composition and small processed browser modules for countdown/form behavior; add no hydrated UI framework.
- Use one shared layout for document language, metadata, favicon, tokens/reset, and page slot. Pages own route-specific hierarchy.
- Carry initial plan intent through a URL query; the native select owns later form state.
- Persist accepted records through one isolated IndexedDB repository and one transaction per valid submission.
- Use repository-contained runtime assets. Font acquisition is a source-registration/planning precondition.

Transition: replace starter UI with Officelite pages/primitives. No data migration, feature flag, dual route, compatibility bridge, or transitional backend is needed.

## 8. High-Level Structure

```text
Astro pages
  ├─ shared layout and semantic tokens
  ├─ shared presentational components
  └─ client entries
       ├─ countdown controller → pure time calculation
       └─ sign-up controller
            ├─ plan-intent parser
            ├─ native validation/error adapter
            └─ sign-up repository → IndexedDB
```

Templates render approved content and stable enhancement hooks. Persistence code knows nothing about DOM, visual copy, focus, or routes.

## 9. Components and Responsibilities

| Boundary | Responsibilities | Must not own |
|---|---|---|
| Site layout | Document shell, route title, metadata, favicon, global tokens/reset, slot | Route hierarchy or browser behavior |
| Home page | Hero, plans, launch region, navigation actions | Form state or persistence |
| Sign Up page | Intro/countdown/form hierarchy and semantic hooks | IndexedDB mechanics or plan parsing |
| Presentational primitives | Brand/action/countdown/plan/field anatomy and accessible markup | Global state, persistence, redirects |
| Countdown controller | Update roots from current time; stop after expiry | Announcements, navigation, persistence |
| Plan parser | Map URL token to canonical plan/default | DOM, history mutation, storage |
| Form controller | Initialization, validation, immutable capture, busy/status/error/focus | IndexedDB schema/events |
| Sign-up repository | Open/upgrade, add transaction, outcome translation, cleanup | Validation, messages, focus, network fallback |
| Token/style layer | Approved semantic roles and responsive primitives | Product behavior or literal Figma layers |

## 10. Dependency Rules

- Pages may depend on layout, presentational primitives, tokens, and their client entry.
- Presentational primitives may depend on static data/assets, never page code, controllers, or persistence.
- Controllers may depend on pure contracts and repository interfaces; pure utilities may not depend on DOM, Astro, timers, or IndexedDB.
- The controller calls persistence only after validity passes. The repository never calls UI or exposes database handles.
- CSS direction is global tokens/reset → component/route styles.
- Implementation must not send form values through network APIs, form-action fallback, analytics, logs, or URLs.
- Add no framework, state library, IndexedDB wrapper, CSS framework, icon library, or runtime font service without approved dependency/source impact.
- Avoid cycles. Browser entries enhance declared roots rather than unrelated global DOM.

## 11. Important Data and Interaction Flows

### Navigation and plan initialization

1. Generic actions link to `/sign-up/`; plan actions use `/sign-up/?plan=basic`, `pro`, or `ultimate`.
2. The parser reads the first `plan` value. Exact lowercase tokens map to canonical `Basic`, `Pro`, or `Ultimate`; absent/empty/unknown values map to `Basic`.
3. The native select receives that initial value. Later user selection is authoritative; the URL is not rewritten or persisted elsewhere.

### Valid submission

1. Native constraints and the validation adapter evaluate all five controls.
2. Invalid submission exposes errors, focuses the first invalid control, and starts no write.
3. Valid submission captures exactly Name, Email Address, Plan, Phone Number, and Company in an immutable candidate.
4. The controller enters busy state and invokes one repository add; repeat activation starts no second transaction.
5. Only transaction completion resolves success and produces the approved polite confirmation.

### Failure/retry and countdown

- IndexedDB absence/open/upgrade/request/transaction error or abort maps to one failure result. Values remain, busy ends, and deliberate retry revalidates a new candidate. No automatic retry or remote fallback exists.
- Countdown calculation clamps to zero, rounds future fractional seconds upward, decomposes units, recalculates from current time after delays, and may stop its interval at expiry. It is never a live region.

## 12. State and Data Ownership

| State/data | Authority | Lifetime/persistence |
|---|---|---|
| Plan entry token | Current URL query | Entry only; not synchronized after initialization |
| Current Plan/fields | Native form controls | Current document; captured only on valid submit |
| Error/busy/outcome state | Form controller + native validity | Current document/attempt; not persisted |
| In-flight candidate | Immutable object | One transaction; later edits cannot mutate it |
| Accepted record | IndexedDB `signups` store | Browser origin until browser/user eviction or future approved deletion |
| Countdown target/display | Approved constant/current clock | Recomputed; not fetched or persisted |

No global store is required. No duplicate detection, replacement, cross-tab sync, retention duration, deletion UI, encryption, or export behavior is added.

## 13. Frontend Architecture

- Static Astro HTML owns content, semantics, and initial layout; client modules own only countdown/form behavior.
- Two file-based routes use standard anchors; there is no custom router or view-transition dependency.
- Source order remains logical when CSS changes visual placement.
- Required/type constraints stay in HTML. The controller synchronizes approved messages, invalid relationships, correction, and focus without adding content rules.
- Styling uses mobile-first semantic custom properties plus component/route styles. Responsive transitions follow content failure, not automatic Figma breakpoints.
- Repository assets supply logo, illustration, patterns, icons, and favicon. Decorative assets remain unannounced.
- No runtime third-party font request is allowed. Plan must register/vendor self-hosted Kumbh Sans or record an owner-approved fidelity deviation.

## 14. Backend, API, and Integration Architecture

Not applicable. No adapter, server route, API, webhook, remote database, authentication, analytics, or launch-date service is added. `REQ-BR-005` forbids anticipating the future API through dormant network code.

## 15. Persistence Architecture

- Database: `officelite`, version `1`.
- Object store: `signups` with an out-of-line auto-increment key.
- Value: `{ name, email, plan, phone, company }`; plan is canonical Basic/Pro/Ultimate.
- Use `add`, not `put`: each accepted attempt is a record and duplicate-content replacement is out of scope.
- Version 1 creates the store when absent. Future schema changes require an explicit version/migration decision.
- Open for one operation and close after settlement. Resolve only on transaction completion; reject open/upgrade/request/transaction failure or abort once.
- Repository construction accepts an `IDBFactory`, defaulting to `window.indexedDB`, so failure cases can be controlled without DOM coupling.
- No index/timestamp is stored because current scope defines no query, uniqueness, update, deletion, or metadata behavior.

## 16. Authentication and Authorization

Not applicable. There is no identity, protected route, session, role, account, or server resource. Origin-scoped storage is not an authorization mechanism.

## 17. Accessibility Architecture

- Emit landmarks, one route heading, real anchors/form/select/inputs/submit, persistent labels, and meaningful lists.
- Brand links have destination names; decorative patterns/dashboard use approved empty alternative treatment.
- Every field owns stable label/control/error IDs. Expose invalid relationships only with visible errors.
- Native elements own keyboard behavior. Move focus only to the first invalid control after invalid submit.
- One stable status region owns pending/success/failure. Countdown updates are never live-announced.
- CSS reordering must not contradict source/focus order; visible focus stays unclipped on every surface.

## 18. Error Handling and Reliability

| Error | Owner | Recovery |
|---|---|---|
| Unsupported plan | Parser | Basic fallback; no message |
| Required/email invalidity | Form/native validity | Field message, no write, correction clears |
| IndexedDB unavailable/open/upgrade failure | Repository → controller | Failure outcome, preserve values, retry |
| Request/transaction error or abort | Repository → controller | Reject once; no success; close; retry |
| Repeat submit while pending | Controller | No second transaction/announcement |
| Delayed countdown | Countdown controller | Recalculate from current time |

No automatic retry, fallback store, queued network delivery, technical error disclosure, or personal-data logging is introduced.

## 19. Security and Privacy

- Keep submitted personal data in controls, an ephemeral candidate, and origin-scoped IndexedDB.
- Never place values in URL parameters, analytics, logs, error copy, HTML strings, network requests, or build output.
- Use constant messages and safe text/property updates; never interpolate values into HTML.
- Client validity is an acceptance/UX rule, not a server-security claim.
- Do not invent secrets, encryption, consent, retention, deletion, or cross-origin guarantees.
- Self-hosted fonts avoid an unapproved runtime third-party request.

## 20. Build, Deployment, Runtime, and Observability

- Preserve Astro ESM, strict TypeScript, pnpm lockfile, and default static output.
- Add no adapter, middleware, environment variable, server runtime, Docker/DDEV, or deployment mutation.
- Validate with `pnpm build` from `frontend/` in the verified Linux environment.
- Runtime requires functional JavaScript and IndexedDB; compatibility claims are limited to tested browsers.
- No logs, metrics, traces, health endpoint, or analytics are required. No runtime snapshot is active.

## 21. Testing Architecture

- Pure plan/countdown functions support deterministic tests without DOM/timers.
- The repository boundary supports controlled IndexedDB completion/error/abort cases.
- Form-level checks cover untouched/blur/submit/correction/busy/success/failure/retry/immutable capture/repeat activation.
- Page-level checks cover routes/history/query intent/native select/keyboard/focus/announcements/IndexedDB and absence of form-data network requests.
- Responsive/visual review covers supplied and stress widths; build validation covers static output.
- No current test framework or coverage threshold is claimed. Plan decides whether lightweight automation is justified.

## 22. Architectural Decisions

### ADR-001 — Preserve static Astro pages without a UI framework

- **Status:** Accepted
- **Decision:** Use separate Astro routes, shared Astro primitives, and processed browser modules; no UI framework, custom router, server adapter, or global state library.
- **Rationale:** Fits `SRC-REPO-001`, standard navigation, semantic HTML, and limited browser enhancement.
- **Alternatives:** SPA conditional view, framework island, server adapter; each adds an unsupported runtime boundary.
- **Tradeoff:** Normal page reloads and explicit DOM contracts.
- **References:** `REQ-FR-001`–`REQ-FR-004`, `REQ-CON-001`–`REQ-CON-003`; `DES-001`–`DES-010`, `DES-RWD-001`–`DES-RWD-006`; `SPEC-INT-001`, `SPEC-INT-002`.

### ADR-002 — Carry entry plan intent in the URL

- **Status:** Accepted
- **Decision:** Use `?plan=basic|pro|ultimate`; generic/direct entry omits it. Parse once and let the select own later state.
- **Rationale:** URL owns navigation intent without global/session/local storage.
- **Alternatives:** Path/hash/storage/global store/duplicated routes add unnecessary complexity.
- **Tradeoff:** Intent is visible/shareable; later selection is not reflected in the URL.
- **References:** `REQ-FR-003`, `REQ-FR-005`, `REQ-BR-002`; `DES-INT-001`, `DES-INT-003`; `SPEC-BEH-003`, `SPEC-DATA-001`.

### ADR-003 — Use a native form with one controller

- **Status:** Accepted
- **Decision:** Render semantic controls/constraints; one controller prevents current-release network submission and owns validation timing, focus, busy/status, immutable capture, and repository invocation.
- **Rationale:** Preserves platform semantics while implementing exact approved behavior.
- **Alternatives:** Generic controls, custom combobox, framework/server form, per-field controllers conflict or fragment ownership.
- **Tradeoff:** Successful submission requires JavaScript and stable DOM contracts.
- **References:** `REQ-FR-006`–`REQ-FR-011`, `REQ-AR-001`–`REQ-AR-005`; `DES-007`–`DES-010`, `DES-INT-003`–`DES-INT-005`; `SPEC-INT-003`–`SPEC-INT-006`, `SPEC-VAL-001`–`SPEC-VAL-004`.

### ADR-004 — Isolate IndexedDB behind a repository

- **Status:** Accepted
- **Decision:** Use `officelite` v1, auto-keyed `signups`, five-field values, and one `add` transaction; expose a Promise resolving only on transaction completion.
- **Rationale:** Preserves product data, duplicates, local boundary, false-success prevention, and testability.
- **Alternatives:** localStorage, remote API, controller-owned IndexedDB, email key, metadata fields, wrapper dependency conflict or add unsupported behavior.
- **Tradeoff:** No query index/user ID; future schema changes require migration review.
- **References:** `REQ-FR-009`–`REQ-FR-011`, `REQ-BR-003`, `REQ-BR-004`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`; `SPEC-DATA-002`, `SPEC-DATA-003`.

### ADR-005 — Separate pure rules from side effects

- **Status:** Accepted
- **Decision:** Keep plan mapping/countdown math pure; thin controllers own URL/DOM/clock/timer access.
- **Rationale:** Direct testability and no route drift.
- **Alternative:** duplicate page scripts or one page-wide script increase coupling.
- **Tradeoff:** Requires small modules/contracts; Astro handles bundling.
- **References:** `REQ-FR-005`, `REQ-FR-012`, `REQ-BR-006`; `DES-006`, `DES-INT-006`; `SPEC-BEH-003`–`SPEC-BEH-005`.

### ADR-006 — Keep runtime assets self-contained

- **Status:** Accepted
- **Decision:** Use repository assets; no Figma connector URL or runtime third-party font. Resolve/register self-hosted Kumbh Sans before Plan approval or obtain an approved deviation.
- **Rationale:** Provenance, reproducibility, privacy, and static behavior.
- **Alternatives:** CDN/Google Fonts/expiring Figma assets/silent fallback add dependency or unexplained fidelity loss.
- **Tradeoff:** Font source remains a planning precondition; vendored bytes add modest size.
- **References:** `REQ-NFR-003`, `REQ-CON-004`, `REQ-CON-005`; `DES-004`, `DES-005`; `SPEC.md` Section 11.

## 23. Constraints, Risks, Assumptions, and Open Questions

| Item | Type | Impact | Evidence | Mitigation / status |
|---|---|---|---|---|
| Existing static Astro package | Constraint | No backend/framework expansion | `SRC-REPO-001`, `REQ-CON-001`–`REQ-CON-003` | ADR-001; accepted |
| Time-bound Figma | Risk | Visual evidence may drift | `SRC-DS-001`, `VER-010` | Reverify after meaningful pause; non-blocking |
| Kumbh Sans source absent | Question/risk | Fidelity/provenance can block Plan | `SRC-REPO-001`, `EVD-007`, `REQ-CON-005` | Register source or approved deviation before Plan approval |
| No browser/WCAG matrix | Constraint | No broad compatibility claim | `PROJECT-CONTEXT.md`, `REQ-NFR-001`–`REQ-NFR-004` | Claim only tested outcomes; non-blocking |
| IndexedDB variation | Risk | Storage failures vary | `SPEC-VAL-003` | Isolated repository/forced failure checks; non-blocking |
| Database contract unspecified upstream | Decision | Implementation needed stable boundary | `SPEC-DATA-003` | ADR-004 resolves |
| JavaScript required | Accepted assumption | No successful no-JS persistence/countdown | `SPEC.md` Section 13 | No remote fallback |
| No retention/deletion policy | Constraint | No lifecycle guarantee | `REQ-DR-001`, `REQ-SEC-001` | Store only required fields; non-blocking |

No item blocks Stage 6 approval. Font resolution is a hard precondition for later Plan approval.

## 24. Source-change Handling

- Reverify all three active sources before implementation after a meaningful pause and before final acceptance.
- New existing repository patterns, changed behavior documentation, changed Figma boundary, or a newly registered font/asset source requires impact assessment.
- Visual changes may revisit Stages 1/3/4; behavior/data changes Stages 2/4/6; repository structural changes Stage 6.
- Never silently update an existing snapshot ID. Later implementation outputs advance lineage without replacing the input commit.

## 25. Traceability

| Item | Snapshot | Requirement/specification | Validation |
|---|---|---|---|
| `ADR-001` static routes | `SRC-REPO-001`, `SRC-DS-001` | `REQ-FR-001`–`REQ-FR-004`; `SPEC-INT-001`, `SPEC-INT-002` | Build and route/history checks |
| `ADR-002` plan query | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-003`, `REQ-FR-005`; `SPEC-BEH-003`, `SPEC-DATA-001` | Entry/query cases |
| `ADR-003` form controller | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-006`–`REQ-FR-011`, `REQ-AR-001`–`REQ-AR-005` | DOM/keyboard/validation/announcement checks |
| `ADR-004` repository | `SRC-DOC-001`, `SRC-REPO-001` | `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`; `SPEC-DATA-002`, `SPEC-DATA-003` | Store/outcome/retry/network checks |
| `ADR-005` pure rules | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-005`, `REQ-FR-012`; `SPEC-BEH-003`–`SPEC-BEH-005` | Deterministic plan/time cases |
| `ADR-006` assets | `SRC-REPO-001`, `SRC-DS-001` | `REQ-NFR-003`, `REQ-CON-004`, `REQ-CON-005` | Provenance/build/network/visual review |

## 26. Architecture Validation

### Pass 1 — Completeness and correctness

- [x] Scope/current-state observations are accurate.
- [x] Current, target, and transition are distinct.
- [x] Responsibilities, dependencies, state, and flows are explicit.
- [x] Accessibility, security, errors, deployment, and testing are addressed where relevant.

Pass 1 findings and corrections:

- The CLI scaffold retained orphan baseline children and an undefined runtime-snapshot identifier after removing record-owned keys. The artifact now contains valid CLI-managed narrative frontmatter; the record retains the actual baseline.
- An ambiguous wildcard non-functional-requirement reference now cites `REQ-NFR-001`–`REQ-NFR-004` explicitly.
- `ADR-001`–`ADR-003`, `ADR-005`, and `ADR-006` now cite relevant approved `DES-*` decisions instead of relying only on requirement/specification links.
- Persistence review made the database/store/version, out-of-line key, value, `add`, completion, cleanup, and injectable-factory boundaries explicit without inventing a product field.
- Form review confirmed native semantics plus a single controller; JavaScript is required and no remote fallback was introduced.
- Six unique `ADR-*` definitions, valid frontmatter, and clean Markdown whitespace were confirmed.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Snapshot IDs exist and were used.
- [x] No current claim silently relies on newer repository/runtime content.
- [x] Decisions trace to approved artifacts/evidence.
- [x] Tradeoffs, risks, assumptions, and open questions are visible.
- [x] No example technology or pattern was adopted without evidence.

Pass 2 findings and corrections:

- Fresh `VER-013`–`VER-015` checks found all three active inputs Unchanged; the mutable Figma source retains its Time-bound limitation, repository HEAD remains pinned, and README checksums match.
- Cross-artifact review found the architecture consistent with approved Requirements, Design, Specification, and document review. The stale Stage 0 architecture recommendation in `WORKFLOW-STATE.md` was updated to the CLI-recorded Required decision.
- Source authority remains separated: Figma supplies visual evidence, the root brief and owner decision supply behavior, and the repository supplies current technical constraints. Feasibility guidance was not promoted to project authority.
- No unsupported framework, router, adapter, backend, API, authentication, analytics, deployment, or runtime third-party dependency was introduced.
- Six unique accepted ADRs expose alternatives and tradeoffs. The unresolved Kumbh Sans source is a Plan-approval precondition; unspecified browser/WCAG targets limit later claims but do not block Stage 6.
- Standard remains sufficient: the architecture has meaningful local state and persistence boundaries but no Full-profile service, migration, security, or operational risk.
