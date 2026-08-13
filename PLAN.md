---
artifact: PLAN
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Implementation Plan

## 1. Document Information

- Scope: Repository-aware implementation plan for the approved responsive Home and Sign Up experience in `frontend/`.
- Last updated: 2026-08-13.
- Source baseline: `SOURCE-BASELINE.md`.
- Repository snapshot: `SRC-REPO-001` at `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`.
- Design snapshot: Time-bound `SRC-DS-001`.
- Product-behavior source: immutable `SRC-DOC-001` plus the approved owner decision recorded upstream.
- Font input: immutable `SRC-ASSET-001`.
- Source documents: approved `PROJECT-CONTEXT.md`, `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, `ARCHITECTURE.md`, and `DOCUMENT-REVIEW.md`.
- Lifecycle and artifact baseline are owned by the canonical CLI record.

Classification used below:

- **Confirmed:** approved product outcome or explicit workflow decision.
- **Observed:** fact inspected at the pinned repository or source snapshot.
- **Recommended:** proposed repository path or implementation method consistent with approved architecture.
- **Open question:** non-blocking coverage or threshold that the approved sources do not define.

## 2. Objective and Scope

### Included

- Replace the Astro starter at `/` with the complete Officelite Home experience.
- Add `/sign-up/` with the approved introduction, countdown, native five-control form, plan initialization, validation, IndexedDB persistence, and transaction feedback.
- Implement supplied 375/768/large compositions, demonstrated hover/focus differentiation, content-led intermediate transitions, and long/error/status content resilience.
- Reuse supplied repository assets and self-host the pinned Kumbh Sans variable font with its OFL license.
- Add small ESM modules for plan resolution, countdown calculation, IndexedDB access, and browser controllers without a UI framework, server adapter, API, or global state library.
- Add lightweight Node built-in tests for deterministic rules and the injected persistence boundary, plus the approved build and manual browser/accessibility/visual checks.

### Excluded

- Remote sign-up or launch-date APIs, backend processing, authentication, authorization, analytics, deployment changes, or multiple services.
- A custom router, SPA conversion, hydrated UI framework, custom select widget, font CDN, Figma connector URL at runtime, or third-party IndexedDB wrapper.
- Product redesign, new commercial copy, data deduplication/update/deletion/retention policy, no-JavaScript submission fallback, or unsupported browser/WCAG/performance claims.
- Changes to other Figma pages, `docs/implementation-workflow/`, or unrelated repository content.

## 3. Current Repository State

Observed at `SRC-REPO-001`:

- `frontend/` is one ESM Astro `7.1.6` package requiring Node `>=22.12.0`, with a pnpm lockfile and strict Astro TypeScript configuration.
- `frontend/astro.config.mjs` uses default static output. There is no adapter, middleware, endpoint, environment contract, deployment configuration, API client, or runtime service.
- Existing scripts are `dev`, `build`, `preview`, and `astro`; no test, lint, formatter, type-check, or browser-automation command exists.
- Routing contains only `frontend/src/pages/index.astro`, which renders starter `Welcome.astro` through `Layout.astro`.
- `Layout.astro` has starter metadata and global margin/size rules. There is no token layer, Officelite component, plan/countdown module, form controller, or persistence adapter.
- `frontend/src/assets/astro.svg`, `background.svg`, `frontend/public/favicon.ico`, and `favicon.svg` are starter assets with no target role.
- `docs/starter-code/` contains approved candidate Officelite SVG/PNG assets and skeletal reference copy but is outside the runnable package.
- There are no submodules and no frontend change relative to the pinned commit. Current untracked root files are workflow documentation outputs only.

The proposed paths below are new decisions; they are not presented as existing repository conventions.

## 4. Technical Approach

### Component and module boundaries

- Keep `/` and `/sign-up/` as separate Astro pages under file-based routing.
- Modify the existing layout to own English document metadata, route-specific title/description props, favicon, shared font/token/reset import, and page slot.
- Create narrow Astro primitives for brand, action link, countdown markup, plan card, and Sign Up form. Pages retain route-specific hierarchy and composition.
- Keep shared rules in dependency-free `.mjs` modules so Astro/Vite can bundle them and Node's built-in test runner can import the same production code.
- Keep DOM, clock/timer, URL, and IndexedDB effects in thin controller/repository modules. Do not introduce a framework or new runtime package.

### Data and state flow

1. Generic Home actions navigate to `/sign-up/`; plan actions use `/sign-up/?plan=basic|pro|ultimate`.
2. Sign Up parses the initial query once. Exact known lowercase values map to canonical `Basic`, `Pro`, or `Ultimate`; absent, empty, mixed/unknown values default to `Basic`. The native select owns later state and the URL is not rewritten.
3. Both routes initialize a countdown immediately, then recalculate from the current clock once per second. Calculation is pure, rounds future partial seconds upward, catches up after throttling, clamps at zero, and stops after expiry.
4. Form submission prevents current-release network navigation, evaluates native required/email validity, captures an immutable five-field record, and starts at most one local write.
5. The IndexedDB repository opens `officelite` version 1, creates/uses out-of-line auto-increment store `signups`, performs `add`, resolves only on transaction completion, rejects all specified failure/abort paths, and closes its connection after settlement.
6. The form preserves values, exposes pending/busy state, reports success only after completion, reports failure without false success, and allows a later retry/new deliberate submission.

### Styling and design-system integration

- Add one global stylesheet for Kumbh Sans `@font-face`, semantic color/type/spacing/radius custom properties, box sizing, base typography, body behavior, visually hidden utility, reusable action states, and visible focus.
- Use scoped component/page styles for local layout. Copy only supplied assets with confirmed roles; omit unproven check/cross icons.
- Render orbit/background SVGs decoratively through CSS or empty-alternative imagery; render the dashboard illustration with an empty alternative per `SPEC-ACC-005`.
- Apply hover changes only under hover-capable media conditions and keep focus styling independently visible. Do not add ornamental motion.

### Responsive strategy

- Start from the 375 compositions and use fluid sizes, capped measures, grid/flex wrapping, and intrinsic sizing before adding media queries.
- Validate 768 and large reference outcomes without treating those sample widths as automatic CSS boundaries.
- Select each transition by the first documented failure condition: hero columns no longer provide readable measures, horizontal plan-card content no longer fits, three-card Home pricing cannot fit without compression, Home launch row collides, or Sign Up intro/form columns become unreadable.
- Record final media-query values during the owning plan item after sweeping the interval around each first failure. Keep supplied widths and nearby stress widths in validation evidence.
- Preserve DOM/keyboard order while using layout placement for the decorative illustration and route-specific visual composition.

### Accessibility strategy

- Provide English language, route-specific titles/descriptions, one `h1`, meaningful landmarks/sections, real links, lists for features, a real form, persistent labels, native input/select/button semantics, autocomplete purposes, and native required/email constraints.
- Keep the closed Plan treatment visually styled while preserving the actual native select and platform open/options behavior.
- Show inline errors only after blur/invalid submit, relate active errors with `aria-invalid` and `aria-describedby`, clear both on correction, and focus the first invalid control only after invalid submit.
- Expose form busy state and one inline status region: pending/success polite, storage failure assertive. Do not move focus solely to expose transaction status.
- Keep the countdown outside live regions so once-per-second updates are not announced.

### Error and state handling

- Cover untouched, hover, focus, invalid required, invalid email, in-flight, repeat activation, success, storage failure, retry, future countdown, and expired countdown states in their owning modules/components.
- Preserve current form values and current Plan after success/failure. Clear stale settled transaction status when the user edits.
- Treat missing decorative assets as non-blocking to content/operation. A missing dashboard image must not expose filename text or cause overflow.
- Do not transmit, log, serialize into URLs, or add analytics for form values.

### Testing and validation strategy

- Add a proposed `"test": "node --test tests/*.test.mjs"` package script using Node 24's built-in runner; no testing dependency or lockfile change is required.
- Unit-test plan parsing, countdown boundary math, and the injected IndexedDB repository with deterministic clocks/fakes, including completion/error/abort/close behavior.
- Run the existing `pnpm build` command from `frontend/` in the verified Linux Node/pnpm environment.
- Run manual route/history/query, keyboard/focus, native select, validation, status announcement, IndexedDB, retry, network, responsive, visual, and missing-asset checks. No automated browser framework or broad conformance claim is introduced.

## 5. Files and Modules

| Path | Action | Existing or proposed | Responsibility | Evidence / compatibility |
|---|---|---|---|---|
| `frontend/package.json` | Modify | Existing | Add `"test": "node --test tests/*.test.mjs"`; preserve Astro scripts/dependency | `SRC-REPO-001`; proposed command, no new package |
| `frontend/src/layouts/Layout.astro` | Modify | Existing | Route metadata, favicon, global CSS, shared document shell | Existing import boundary at `SRC-REPO-001` |
| `frontend/src/styles/global.css` | Create | Proposed | Font face, tokens, reset/base, utilities, shared action/focus states | `EVD-007`–`EVD-009`, `DES-001`–`DES-010` |
| `frontend/src/components/Brand.astro` | Create | Proposed | Logo presentation/link behavior with route-appropriate accessible name | `DES-001`, `SPEC-INT-002` |
| `frontend/src/components/ActionLink.astro` | Create | Proposed | Real anchor with primary/pricing/inverse visual variants | `DES-003`, `DES-INT-001`, `DES-INT-002` |
| `frontend/src/components/Countdown.astro` | Create | Proposed | Shared labeled four-unit markup and stable controller hooks | `SPEC-BEH-004`, `SPEC-ACC-004` |
| `frontend/src/components/PlanCard.astro` | Create | Proposed | Semantic plan name/price/features/action composition | `SPEC-BEH-001`, `DES-RWD-002` |
| `frontend/src/components/SignupForm.astro` | Create | Proposed | Five labeled native controls, errors, submit, one status region | `SPEC-BEH-002`, `SPEC-INT-003`–`SPEC-INT-006` |
| `frontend/src/pages/index.astro` | Modify | Existing | Replace starter with complete Home route and integrate shared modules | `SRC-REPO-001`, `SRC-DS-001` |
| `frontend/src/pages/sign-up.astro` | Create | Proposed | Complete Sign Up route and controller entrypoint | `SRC-DS-001`, `ADR-001`–`ADR-003` |
| `frontend/src/lib/plans.mjs` | Create | Proposed | Canonical plan data/query mapping with Basic fallback | `ADR-002`, `SPEC-DATA-001` |
| `frontend/src/lib/countdown.mjs` | Create | Proposed | Pure target-relative calculation/decomposition | `ADR-005`, `SPEC-BEH-004`, `SPEC-BEH-005` |
| `frontend/src/lib/signup-store.mjs` | Create | Proposed | Injected IndexedDB repository and exact v1 schema/transaction contract | `ADR-004`, `SPEC-DATA-002`, `SPEC-DATA-003` |
| `frontend/src/scripts/countdown-controller.mjs` | Create | Proposed | DOM/clock/timer integration shared by both pages | `ADR-005`, `SPEC-ACC-004` |
| `frontend/src/scripts/signup-controller.mjs` | Create | Proposed | Query initialization, validation, immutable capture, busy/status/retry orchestration | `ADR-002`–`ADR-005` |
| `frontend/tests/plans.test.mjs` | Create | Proposed | Known/fallback/query-intent rule tests | `SPEC-BEH-003`, `AC-007`–`AC-009` |
| `frontend/tests/countdown.test.mjs` | Create | Proposed | Before/near/at/after target, padding, catch-up math tests | `AC-022`–`AC-024` |
| `frontend/tests/signup-store.test.mjs` | Create | Proposed | Schema/value/completion/failure/abort/close tests using injected fakes | `AC-016`, `AC-020`, `AC-025`, `AC-042`, `AC-047` |
| `frontend/src/assets/officelite/shared/logo.svg` | Create/copy | Proposed from repo source | Brand artwork | `SRC-REPO-001` supplied asset |
| `frontend/src/assets/officelite/home/{bg-pattern-header,bg-pattern-pricing,bg-pattern-footer,illustration-charts}.svg` | Create/copy | Proposed from repo source | Confirmed Home decoration/illustration roles | `EVD-013`, `DES-004`, `DES-005` |
| `frontend/src/assets/officelite/sign-up/{bg-pattern-side,icon-arrow-down}.svg` | Create/copy | Proposed from repo source | Confirmed Sign Up background/native-select closed treatment | `EVD-013`, `DES-004`, `DES-INT-003` |
| `frontend/public/favicon-32x32.png` | Create/copy | Proposed from repo source | Approved PNG favicon | `SRC-REPO-001` supplied asset |
| `frontend/public/fonts/KumbhSans-YOPQ-wght.ttf` | Create/copy | Proposed from `SRC-ASSET-001` | Self-hosted normal variable font face | Immutable font blob; no runtime external request |
| `frontend/public/fonts/OFL.txt` | Create/copy | Proposed from `SRC-ASSET-001` | Required font copyright/license copy | Immutable OFL blob |
| `frontend/src/components/Welcome.astro` | Delete | Existing | Remove unused Astro starter UI after Home replacement | Referenced only by current `index.astro` |
| `frontend/src/assets/astro.svg` and `frontend/src/assets/background.svg` | Delete | Existing | Remove unused starter imagery | Referenced only by `Welcome.astro` |
| `frontend/public/favicon.ico` and `frontend/public/favicon.svg` | Delete | Existing | Remove superseded starter favicons | Layout moves to supplied PNG |

`frontend/pnpm-lock.yaml`, `astro.config.mjs`, `tsconfig.json`, and `docs/starter-code/` are expected to remain unchanged unless implementation reveals a verified tool-generated or compatibility need; such a change requires plan/task impact review first.

## 6. Plan Items

### PLAN-001 — Establish self-contained visual and semantic foundation

- **Objective:** Establish the shared document, typography, tokens, brand, action, countdown markup, and repository-local visual inputs required by both routes while the current starter route remains buildable.
- **Requirement and specification references:** `REQ-NFR-001`–`REQ-NFR-004`, `REQ-AR-001`–`REQ-AR-003`, `REQ-CON-001`–`REQ-CON-005`; `DES-001`–`DES-010`; `SPEC-ACC-001`, `SPEC-ACC-002`, `SPEC-ACC-004`, `SPEC-ACC-005`.
- **Source snapshots:** `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`, `SRC-ASSET-001`.
- **File impact:** Layout, global stylesheet, Brand/ActionLink/Countdown components, confirmed Officelite SVG/PNG assets, Kumbh Sans TTF/OFL, and superseded favicon removal after Layout stops referencing it. `Welcome.astro` and its imported starter SVGs remain until `PLAN-003` replaces `index.astro`.
- **Dependencies:** Approved architecture and Stage 7 closure verifications `VER-017`–`VER-020`; no implementation-item dependency.
- **Implementation approach:** Vendor only exact pinned/supplied assets; register one variable `@font-face` for approved 400/700 roles; define semantic custom properties; make layout metadata route-specific; keep decoration non-semantic and actions as anchors.
- **Integrated accessibility, responsive, state, and error work:** English language/title/viewport, logical shell, meaningful logo link behavior, real anchors, visible focus, hover-capable hover states, fluid global measures, empty alternatives for decoration/dashboard, and usable content if decoration fails.
- **Validation:** Compare vendored font/license against `SRC-ASSET-001`; confirm no runtime font/CDN request; inspect DOM semantics/focus; render shared primitives in a temporary/current route context at compact/medium/large widths; keep the current route compiling and run existing `pnpm build` at the end of this item.
- **Risks:** TTF is larger than an optimized WOFF2 but is the registered immutable source and no numeric performance threshold exists. Do not transform or subset it without registering the derived asset/provenance.

### PLAN-002 — Implement and test shared plan and countdown rules

- **Objective:** Provide deterministic, dependency-free plan-intent and countdown modules plus the shared timer controller.
- **Requirement and specification references:** `REQ-FR-005`, `REQ-FR-012`, `REQ-BR-001`, `REQ-BR-002`, `REQ-BR-006`; `DES-INT-001`, `DES-INT-003`, `DES-INT-006`; `SPEC-BEH-003`–`SPEC-BEH-005`, `SPEC-DATA-001`, `SPEC-DATA-004`, `SPEC-ACC-004`.
- **Source snapshots:** `SRC-DS-001`, `SRC-DOC-001`, `SRC-REPO-001`.
- **File impact:** `plans.mjs`, `countdown.mjs`, `countdown-controller.mjs`, `package.json`, plan/countdown test files, and stable hooks in `Countdown.astro`.
- **Dependencies:** `PLAN-001` for markup hooks and tokens.
- **Implementation approach:** Parse only exact recognized query values; expose canonical data; calculate remaining milliseconds from the current clock, ceil future seconds, decompose, format, and clamp; controller updates immediately/once per second and stops at zero.
- **Integrated accessibility, responsive, state, and error work:** Preserve platform URL semantics; never place countdown in a live region; keep text-width growth from clipping; avoid drift/replay after timer throttling; treat invalid hard-coded target as an implementation failure, not a user path.
- **Validation:** Add and run proposed `node --test` cases for absent/empty/known/unknown/mixed-case plan input and deterministic before/near/at/after/catch-up countdown cases; manually confirm two countdown instances can initialize independently without duplicate announcements.
- **Risks:** Browser timers are throttled; current-time recalculation and immediate initialization mitigate drift. No time synchronization service is in scope.

### PLAN-003 — Deliver the complete Home route

- **Objective:** Replace `index.astro` with the full semantic Home hierarchy, responsive compositions, plan cards, navigation intent, and countdown integration.
- **Requirement and specification references:** `REQ-FR-001`, `REQ-FR-003`–`REQ-FR-005`, `REQ-BR-001`, `REQ-BR-005`, `REQ-NFR-001`–`REQ-NFR-003`, `REQ-AR-001`–`REQ-AR-003`; `DES-RWD-001`–`DES-RWD-003`, `DES-INT-001`, `DES-INT-002`, `DES-INT-007`; `SPEC-BEH-001`, `SPEC-BEH-006`, `SPEC-BEH-008`, `SPEC-INT-001`, `SPEC-INT-002`, `SPEC-ACC-001`, `SPEC-ACC-002`, `SPEC-ACC-005`.
- **Source snapshots:** `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`.
- **File impact:** `index.astro`, `PlanCard.astro`, shared components from `PLAN-001`, Home assets, route-local scoped styles, and deletion of now-unreferenced `Welcome.astro`, `astro.svg`, and `background.svg`.
- **Dependencies:** `PLAN-001`, `PLAN-002`.
- **Implementation approach:** Render brand, one hero heading/copy/action, decorative dashboard, ordered Basic/Pro/Ultimate cards, launch countdown, and final action. Use generic links without query and plan links with exact query intent. Remove the starter component/assets only after `index.astro` no longer imports them.
- **Integrated accessibility, responsive, state, and error work:** Semantic sections/list structure, stable plan order, decorative illustration alternative, keyboard-real links, visible focus, hover-only-on-hover, mobile-first composition, 768 outcome, large three-card/launch outcome, content wrapping, and missing-decoration resilience are implemented together.
- **Validation:** Side-by-side screenshots at 375, 768, and 1440; sweep transition intervals and record first-failure-derived query values; test wide/narrow/long-content/no-asset conditions; keyboard-activate all five Home actions; verify destinations/history/query values and no horizontal page scroll caused by layout.
- **Risks:** Three-card and launch transitions have no approved numeric breakpoint. The implementation task must record the observed collision/readability evidence for final values instead of copying sample widths mechanically.

### PLAN-004 — Implement and test the IndexedDB repository boundary

- **Objective:** Create the exact browser-local storage contract independent of form/DOM orchestration.
- **Requirement and specification references:** `REQ-FR-009`–`REQ-FR-011`, `REQ-BR-003`, `REQ-BR-004`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001`; `SPEC-DATA-002`, `SPEC-DATA-003`, `SPEC-VAL-003`, `SPEC-VAL-004`.
- **Source snapshots:** `SRC-DOC-001`, `SRC-REPO-001`.
- **File impact:** `signup-store.mjs` and `signup-store.test.mjs`.
- **Dependencies:** Architecture `ADR-004`; may begin after `PLAN-001` without waiting for `PLAN-003`.
- **Implementation approach:** Inject `IDBFactory`; open `officelite` v1; create `signups` with out-of-line auto-increment key only during upgrade; `add` exact `{ name, email, plan, phone, company }`; settle on transaction completion/error/abort; reject open/request/upgrade failures; close connection after settlement; add no index/timestamp/deduplication/wrapper.
- **Integrated accessibility, responsive, state, and error work:** This module exposes typed Promise outcomes only; user-facing status remains controller-owned. It must never log values or invoke a remote fallback.
- **Validation:** Deterministic fakes cover schema creation, exact value capture, request-success-before-transaction-completion, completion, open/request/transaction errors, abort, one operation/connection, and close-after-settlement. Manual browser validation later inspects actual IndexedDB records and forced/unavailable paths.
- **Risks:** Fake IDB events can overfit. Keep manual real-browser inspection and forced failure hooks in the Sign Up task; do not add a package merely to mimic the platform.

### PLAN-005 — Deliver Sign Up, validation, and transaction orchestration

- **Objective:** Add the complete Sign Up route and integrate plan initialization, shared countdown, native validation, immutable submission capture, local persistence, concurrency protection, and announcements.
- **Requirement and specification references:** `REQ-FR-002`, `REQ-FR-003`, `REQ-FR-005`–`REQ-FR-011`, `REQ-NFR-001`, `REQ-NFR-002`, `REQ-AR-001`–`REQ-AR-005`; `DES-RWD-004`–`DES-RWD-006`, `DES-INT-003`–`DES-INT-005`, `DES-INT-007`; `SPEC-BEH-002`, `SPEC-BEH-003`, `SPEC-BEH-007`, `SPEC-BEH-008`, `SPEC-INT-001`, `SPEC-INT-003`–`SPEC-INT-006`, `SPEC-ACC-001`–`SPEC-ACC-004`, `SPEC-DATA-001`–`SPEC-DATA-003`, `SPEC-VAL-001`–`SPEC-VAL-004`.
- **Source snapshots:** `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`.
- **File impact:** `sign-up.astro`, `SignupForm.astro`, `signup-controller.mjs`, shared plan/countdown/store modules, Sign Up assets, and route-local scoped styles.
- **Dependencies:** `PLAN-001`, `PLAN-002`, `PLAN-004`. It does not depend on Home rendering, but route-link end-to-end validation uses `PLAN-003`.
- **Implementation approach:** Render the approved content/control order and exact options/feedback. Put native `required`/`type=email` constraints on controls and `novalidate` on the form so the controller—not browser bubbles—owns the approved inline copy; evaluate `ValidityState`/`checkValidity()` without a custom email regex. Prevent network submission; focus first invalid after invalid submit; capture current values once; drive pending/success/failure from repository settlement; disable only the submit action while busy so inputs/select remain editable; clear stale settled status on edit.
- **Integrated accessibility, responsive, state, and error work:** Persistent labels, autocomplete, native select/input types and constraint semantics, active-only error relationships, non-color invalid state, first-invalid focus, `aria-busy`, polite/assertive status behavior, keyboard/native select operation, editable fields during in-flight immutable capture, fluid capped form, stacked/split transition by readable-width failure, long error/status expansion, and value preservation are part of this item.
- **Validation:** Run query-entry matrix and native-select keyboard checks; confirm browser validation bubbles do not replace approved inline feedback; exercise untouched/blur/submit/correction cases and exact messages; verify first-invalid focus; inspect one exact record and no remote form-data request; force open/request/transaction/abort failures; test retry, repeat activation, edits while only submit is unavailable, in-flight immutability, value preservation, and settled-status clearing; compare 375/768/1321 and stress widths.
- **Risks:** Browser IndexedDB/focus/announcement behavior varies. Claims remain limited to tested environments, and unsupported IndexedDB follows the approved local failure path. Stage 9 must split this broad item into an ordered static route/form task followed by controller/persistence integration; both tasks must not edit `SignupForm.astro` concurrently.

### PLAN-006 — Complete regression, fidelity, and release-scope validation

- **Objective:** Execute the full acceptance matrix against the integrated build, correct residual in-scope defects in owning files, and produce evidence for implementation review.
- **Requirement and specification references:** `AC-001`–`AC-047`; `REQ-NFR-001`–`REQ-NFR-004`, `REQ-SEC-001`, `REQ-CON-001`–`REQ-CON-005`; `SPEC.md` Sections 7–12.
- **Source snapshots:** `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`, `SRC-ASSET-001`, plus task-start/output/runtime snapshots created by later workflow stages.
- **File impact:** No new product module by default; residual fixes remain in their owning files. Validation evidence belongs in workflow task/review artifacts, not `dist/` or dependency directories.
- **Dependencies:** `PLAN-001`–`PLAN-005` complete and active sources reverified.
- **Implementation approach:** Run the proposed unit suite, build the static output, serve that output with the existing preview command, then execute route, state, persistence, accessibility, responsive, visual, asset-provenance, privacy/network, and regression matrices; distinguish defects from approved deviations/unspecified coverage.
- **Integrated accessibility, responsive, state, and error work:** These concerns were implemented earlier. This item verifies and corrects residual defects across keyboard/focus/announcements, supplied and first-failure-derived widths, all form/storage states, countdown boundaries, missing assets, and long content.
- **Validation:** Proposed `pnpm test` after `PLAN-002`, existing `pnpm build`, then existing `pnpm preview`; manual pointer/keyboard/accessibility-tree/representative assistive-technology smoke review; IndexedDB and network inspection; screenshots at 375/768/1440 Home and 375/768/1321 Sign Up plus justified stress widths; confirm no `dist/`, dependencies, secrets, or real sign-up data are committed.
- **Risks:** No automated browser/a11y/visual framework or formal browser/WCAG/performance threshold exists. Report exact environments and observed outcomes without broadening claims.

## 7. Recommended Phase Shape

### Phase 1 — Shared foundation and deterministic rules

- `PLAN-001` establishes the self-contained assets, semantics, tokens, and primitives.
- `PLAN-002` implements shared plan/countdown rules and lightweight tests.

### Phase 2 — Route results and local data boundary

- `PLAN-003` delivers Home.
- `PLAN-004` can proceed alongside Home after the shared foundation because it owns separate repository/test files.
- `PLAN-005` integrates Sign Up after the shared plan/countdown and persistence interfaces exist.

### Phase 3 — Integrated regression and evidence

- `PLAN-006` runs the acceptance matrix and corrects residual defects in the earlier owning modules.

Accessibility, responsive behavior, states, errors, and tests are included in `PLAN-001`–`PLAN-005`; Phase 3 does not introduce them for the first time.

## 8. Responsive Decision Process

| Transition | Design evidence | Failure condition that selects final value | Owning item and evidence to record |
|---|---|---|---|
| Home compact → medium hero/card composition | Home 375 and 768 frames in `SRC-DS-001` | Side-by-side hero becomes readable without compressing copy/art; horizontal card summary/features/action fit without overlap | `PLAN-003`; sweep upward from compact and record first stable interval |
| Home medium → large pricing/launch composition | Home 768 and 1440 frames | Three cards plus gaps fit within capped content; launch countdown/action fit without collision | `PLAN-003`; sweep around first fit, verify both adjacent states |
| Sign Up stacked → split composition | Sign Up 768 and 1321 frames | Intro/countdown and capped form retain readable widths beside the dark side region | `PLAN-005`; sweep upward and record first stable interval |
| Countdown one-row → narrow fallback if required | Home/Sign Up 375 frames and `SPEC-BEH-006`–`SPEC-BEH-008` | Four units cannot fit without label/value clipping or material target compression | Owning route item; prefer fluid compact row, use 2×2 only at observed failure |
| Wide outer whitespace | Large frames | Content has reached approved cap; further viewport growth must add outer whitespace, not unbounded scaling | `PLAN-003`/`PLAN-005`; verify one wider stress width selected from observed cap behavior |

Implementation tasks must record final media-query values and why they are the narrowest stable transitions. Sample widths remain validation points, not automatic breakpoints.

## 9. Dependencies and Ordering

| Plan item | Depends on | May run in parallel | Reason |
|---|---|---|---|
| `PLAN-001` | Approved Stage 6 architecture and snapshots | No | Establishes shared files/assets/interfaces |
| `PLAN-002` | `PLAN-001` | Limited | Pure modules/tests are isolated; Countdown hook ownership must be coordinated |
| `PLAN-003` | `PLAN-001`, `PLAN-002` | Yes, with `PLAN-004` | Home files do not overlap persistence files |
| `PLAN-004` | `PLAN-001`, `ADR-004` | Yes, with `PLAN-003` | Owns only repository/test boundary |
| `PLAN-005` | `PLAN-001`, `PLAN-002`, `PLAN-004` | No at integration point | Uses all shared interfaces and owns Sign Up controller/form |
| `PLAN-006` | `PLAN-001`–`PLAN-005` | No | Requires integrated routes and behaviors |

Stage 9 should decompose these units so a task never concurrently edits the same shared component/module without an explicit prerequisite.

In particular, decompose `PLAN-005` into sequential tasks: first establish the buildable static Sign Up composition and native-control/error/status hooks; then integrate plan initialization, validation, busy/announcement behavior, and IndexedDB. The second task depends on the first and owns any follow-up `SignupForm.astro` edits.

## 10. Architecture Handling

- Separate `ARCHITECTURE.md`: Required and approved.
- Reason: Two routes, URL plan intent, shared countdown, native form orchestration, IndexedDB transaction/error/concurrency ownership, and self-contained asset boundaries require explicit structure.
- Governing decisions: `ADR-001` static Astro pages; `ADR-002` URL plan intent; `ADR-003` native form controller; `ADR-004` IndexedDB repository; `ADR-005` pure rules versus side effects; `ADR-006` self-contained assets.
- Stage 7 resolution: `SRC-ASSET-001` supplies the immutable Kumbh Sans/OFL source required by `ADR-006`; no architecture change or reopened upstream artifact is required.

## 11. Migration, Compatibility, Deployment, and Rollback

- **Content/code transition:** Replace starter page/layout content, then delete starter component/assets only after imports are removed. `docs/starter-code/` stays intact as source evidence.
- **Persistence migration:** None. This is new database version 1 with one store. Future schema changes require a new architecture/migration review.
- **Compatibility:** Static Astro output and ordinary browser APIs remain. Successful form persistence requires client JavaScript and IndexedDB. No browser matrix or no-JavaScript success path is claimed.
- **Deployment:** No adapter, hosting configuration, environment variable, service, or deployment process change is planned.
- **Rollback:** Revert frontend code/assets to the pinned repository state. Existing browser-local `officelite` data may remain because no deletion/retention behavior is approved; rollback must not silently claim to erase visitor data.
- **Privacy/security:** Store only the five approved values locally; no remote form request, logs, analytics, URL values, secrets, or credentials.

## 12. Source-change Handling

- Reverify `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`, and `SRC-ASSET-001` before Stage 9 task decomposition, each task start, implementation after a meaningful pause, and final acceptance.
- Material invalidators include changed scoped Figma hierarchy/states/frames, changed root behavior brief, new repository feature code/dependencies/configuration, changed font commit/blob/license, or a newly requested backend/deployment/browser/conformance requirement.
- Visual changes revisit Stage 1/3/4; behavior/data changes Stage 2/4/6; repository structural or architecture changes Stage 6/7; font provenance changes Stage 7.
- Do not update this plan to mutable newer content under an existing ID. Register a new snapshot and perform impact assessment/rebaseline first.

## 13. Risks and Open Questions

| Risk or question | Impact | Blocking | Mitigation or owner |
|---|---|---:|---|
| Figma snapshot is Time-bound | Visual input could drift | No | Reverify exact IDs before tasks/final review; never claim immutable capture |
| Final numeric breakpoints are not source-defined | Arbitrary queries could harm intermediate layouts | No | Owning tasks select/record first-failure-derived transitions and adjacent-width evidence |
| No browser matrix or formal WCAG target | Broad compatibility/conformance claims are unsupported | No | Record exact tested environments/outcomes only |
| No numeric performance threshold; registered font is variable TTF | Font transfer may be larger than optimized web formats | No | Self-host one pinned file, preload only if measurement justifies it, and do not transform without derived-source provenance |
| IndexedDB behavior varies by browser/storage mode | Failure/abort behavior may differ | No | Injected unit boundary plus real-browser success/failure/retry inspection |
| No browser automation/a11y/visual framework | Manual regressions require disciplined evidence | No | Node tests for deterministic logic, build, explicit manual acceptance matrix, task/review artifacts |
| No retention/deletion policy | Rollback cannot promise data removal | No | Store only approved fields and document the boundary; do not invent deletion behavior |

No open item blocks Stage 7. A future owner request for font transformation, browser guarantees, remote persistence, deployment change, or retention behavior requires explicit scope/source/architecture review.

## 14. Definition of Done

- [ ] Every must-have requirement and `SPEC-*` behavior is owned by at least one `PLAN-*` item.
- [ ] Every plan item has proposed/existing file impact, prerequisites, implementation boundaries, validation, and risks.
- [ ] Accessibility, responsive behavior, interaction states, errors, persistence outcomes, and tests are implemented in their owning work rather than deferred to final cleanup.
- [ ] Supplied-width and first-failure-derived responsive checks, build, unit, keyboard, focus, announcement, IndexedDB, network/privacy, and visual checks are identified.
- [ ] Migration, compatibility, deployment, rollback, security, privacy, font license/provenance, and data-retention limitations are explicit.
- [ ] Existing and proposed paths are distinguished; no unsupported dependency, command, backend, API, threshold, or browser claim is presented as current.
- [ ] All four source IDs exist, are verified, and `ART-PLAN` uses their canonical baseline.

## 15. Review

### Pass 1 — Feasibility and completeness

- [x] The plan reflects the pinned repository snapshot.
- [x] Scope, approach, files, ordering, dependencies, integration, compatibility, and validation are complete as applicable.
- [x] Plan items are concrete and small enough for coherent task decomposition.
- [x] Accessibility, responsiveness, states, errors, persistence, and tests are integrated in owning items.

Pass 1 findings and corrections:

- Replaced malformed scaffold frontmatter with valid CLI-managed narrative metadata while leaving lifecycle/baseline ownership in the record.
- Inspected the actual Astro package, route/layout/component/assets, scripts, lockfile, configuration, and starter reference files before naming any path or command.
- Registered and verified `SRC-ASSET-001`, added it to `ART-PLAN`, and limited it to immutable Kumbh Sans font/license provenance; this closes the documented Plan precondition without a CDN.
- Made the proposed dependency-free test script exact and distinguished it from the existing `pnpm build` command.
- Made `PLAN-001` independently verifiable by requiring the current route to keep compiling and building before Home work begins.
- Six concrete plan items now cover shared foundation, deterministic rules, Home, storage, Sign Up, and regression evidence with integrated accessibility/responsive/state/error/test work. No feasibility blocker or unsupported implementation dependency remains.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] `PLAN-*` identifiers follow `Identifier-Conventions.md` and are unique.
- [x] Every plan item maps to approved requirements/specifications and relevant snapshots.
- [x] Existing/proposed paths and existing/proposed commands are distinguished.
- [x] No source changed silently after the plan baseline was recorded.
- [x] No unsupported scope, breakpoint, interaction rule, dependency, or product claim was introduced.
- [x] Architecture handling, font-source registration, security/privacy, rollback, and profile suitability are consistent.
- [x] Risks, assumptions, open questions, and accepted limitations remain visible.

Pass 2 findings and corrections:

- Fresh `VER-017`–`VER-020` checks found Figma, repository, README, and Kumbh Sans sources Unchanged; Figma retains its Time-bound limitation and no frontend implementation file exists.
- Expanded-range coverage review found `REQ-BR-001` and `REQ-BR-005` implemented but not cited. They are now assigned to `PLAN-002`/`PLAN-003`; all 35 requirements, 23 design decisions, 27 specifications, and `AC-001`–`AC-047` are owned.
- Six unique `PLAN-*` definitions contain every required field; all referenced source/domain IDs resolve and Markdown/frontmatter shape is clean.
- Existing versus proposed paths and existing `pnpm build` versus proposed `pnpm test` are explicit; no dependency, lockfile, adapter, service, or deployment change is hidden.
- Responsive transitions remain failure-derived and require final values/evidence in owning tasks; supplied widths are validation points rather than arbitrary breakpoint defaults.
- Approved architecture, local-only privacy boundary, immutable font/OFL provenance, rollback limitation for retained IndexedDB data, and no-runtime-CDN rule are mutually consistent.
- Standard remains sufficient because the plan has bounded static-route/browser-local work without Full-profile integration, authentication, migration, deployment, or operational risk. No Stage 7 blocker remains.
