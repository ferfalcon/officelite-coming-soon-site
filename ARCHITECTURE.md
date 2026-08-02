# Officelite Coming Soon Site — Architecture

## 1. Document information

- **Status:** Draft — Stage 6 complete
- **Version:** 0.1
- **Last updated:** 2026-08-01
- **Project:** Officelite coming soon site
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Application root:** `frontend/`
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Primary sources:** `FIGMA-AUDIT.md`, `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, `DOCUMENT-REVIEW.md`, the current repository, and `Document-Guidelines-ARCHITECTURE.md`
- **Workflow stage:** Stage 6 — define the architecture

## 2. Purpose and authority

This document defines how the current release is organized technically and which structural rules later planning and implementation must preserve.

It covers:

- the verified repository baseline;
- the browser-only runtime boundary;
- Astro pages, shared UI patterns, and client-side TypeScript responsibilities;
- navigation and state ownership;
- IndexedDB persistence and schema decisions;
- styling, assets, accessibility, testing, deployment, and security boundaries;
- important alternatives, trade-offs, risks, and open technical decisions.

This document does not define implementation ordering; that belongs in `PLAN.md`. It does not resolve stakeholder-owned product, content, data-lifecycle, or visual-feedback decisions that remain open in `DOCUMENT-REVIEW.md`.

### Evidence classification

- **Confirmed constraint:** established by project documentation or a user decision.
- **Observed:** directly verified in the repository or Figma.
- **Architecture decision:** technical resolution made in this stage within delegated authority.
- **Recommended:** proposed but still requiring approval.
- **Open question:** cannot be determined safely from current evidence.

## 3. Verified repository baseline

### 3.1 Repository layout

**Observed:** The repository root contains project documentation, workflow guidance, the design preview, and two implementation-related areas:

```text
/
├── docs/
│   └── starter-code/
├── frontend/
├── ARCHITECTURE.md          # created by this stage
├── DESIGN.md
├── DOCUMENT-REVIEW.md
├── FIGMA-AUDIT.md
├── README.md
├── REQUIREMENTS.md
└── SPEC.md
```

`docs/starter-code/` contains supplied Officelite HTML and SVG source material. It is reference material, not the current built application.

`frontend/` is the current executable application root.

### 3.2 Current frontend toolchain

**Observed:** `frontend/package.json` defines:

- Astro `^7.1.6` as the only application dependency;
- ECMAScript modules;
- Node.js `>=22.12.0`;
- `dev`, `build`, `preview`, and generic `astro` scripts.

**Observed:** `frontend/tsconfig.json` extends `astro/tsconfigs/strict`.

**Observed:** `frontend/astro.config.mjs` uses the default empty configuration. No server adapter, client framework integration, or custom build configuration is present.

**Observed:** `frontend/pnpm-workspace.yaml` permits the `esbuild` and `sharp` install scripts. It does not define multiple workspace packages.

### 3.3 Current source state

**Observed:** The current executable source is still the generated Astro starter:

```text
frontend/src/
├── assets/
│   ├── astro.svg
│   └── background.svg
├── components/
│   └── Welcome.astro
├── layouts/
│   └── Layout.astro
└── pages/
    └── index.astro
```

The current page renders `Welcome.astro`, uses Astro starter artwork and copy, and has no Sign Up route, Officelite components, IndexedDB integration, countdown implementation, or product validation behavior.

**Observed:** Comparing the initial Astro source commit with `main` shows that later changes are documentation and configuration additions. No product source file has been modified since the starter was added.

### 3.4 Current quality and infrastructure gaps

**Observed:** The frontend currently has no dedicated scripts or configuration for:

- Astro type/template checking;
- linting or formatting enforcement;
- unit, integration, accessibility, or end-to-end tests;
- continuous integration;
- a checked-in Vercel configuration;
- environment-variable validation;
- production observability.

**Observed:** The root README identifies a Vercel live URL. The deployed project settings and the live response could not be independently inspected during this stage.

## 4. System context

The current release is a browser-hosted marketing and sign-up experience.

```text
Visitor
   │
   │ HTTPS
   ▼
Vercel static hosting
   │
   ▼
Astro-generated Home and Sign Up pages
   │
   ├── browser DOM and native form controls
   ├── countdown TypeScript
   └── sign-up TypeScript
             │
             ▼
        Browser IndexedDB
```

### External boundaries

| Boundary | Current status | Responsibility |
|---|---|---|
| Figma | Confirmed design source | Visual intent, responsive compositions, assets, and supplied interaction states |
| Vercel | Observed deployment destination from README | Static site hosting and HTTPS delivery |
| IndexedDB | Confirmed current persistence | Store successful sign-up records for the current origin |
| Launch-date API | Future only | Eventually provide the real launch target |
| Sign-up processing API | Future only | Eventually receive and process records |
| Authentication provider | Not applicable | No authentication or authorization is in current scope |

No current form record crosses the browser boundary. No backend or serverless function participates in the current success path.

## 5. Architectural goals

The architecture prioritizes:

1. **Progressive, semantic delivery:** meaningful page structure is rendered by Astro before client scripts run.
2. **Minimal runtime JavaScript:** only countdown, plan-context resolution, validation coordination, feedback, and IndexedDB persistence require browser code.
3. **Clear responsibility boundaries:** presentation, interaction control, data mapping, and persistence do not collapse into one page script.
4. **Accessible native behavior:** links, buttons, inputs, and the Plan select retain native semantics and keyboard behavior.
5. **Reliable persistence outcomes:** success is tied to IndexedDB transaction completion, not button activation or request success alone.
6. **Replaceable future integrations:** the current local date source and IndexedDB sink can later be replaced or supplemented without rewriting page composition.
7. **Design-system consistency:** shared CSS tokens and reusable UI patterns map to the Figma foundations and variants.
8. **Small-project proportionality:** avoid a SPA router, UI framework, state library, backend, dependency-injection framework, or generalized domain layering that the current scope does not justify.
9. **Testability:** time calculation, navigation context, validation coordination, record mapping, and persistence outcomes have independently testable boundaries.
10. **Traceability:** architectural decisions map to requirements and specification identifiers.

## 6. High-level architecture

### 6.1 Application model

**Architecture decision `AD-001`: Use an Astro static multi-page application.**

The current release consists of two statically generated routes:

- `/` — Home
- `/sign-up/` — Sign Up

Astro renders the shared page shell, semantic content, pricing structure, form controls, and decorative asset references at build time. Browser TypeScript enhances only the dynamic behaviors.

**Rationale:** The experience contains two document-like pages with direct navigation and limited local interaction. A multi-page application preserves native navigation, minimizes JavaScript, and fits the verified Astro repository.

**Trade-off:** Page-to-page navigation performs a normal document load rather than a client-router transition. The Figma prototype already uses direct navigation with no transition animation.

**Supports:** `FR-001`, `FR-002`, `FR-004`, `FR-010`, `AR-001`, `CON-002`; `SP-GLOBAL-*`, `SP-HOME-*`, `SP-SIGNUP-*`.

### 6.2 Client enhancement model

**Architecture decision `AD-002`: Use framework-free TypeScript for dynamic behavior.**

No React, Vue, Svelte, or other client framework is required for the current release. Client behavior is organized into small TypeScript modules initialized from the relevant Astro page or component.

The browser enhancement layer owns:

- countdown updates;
- incoming Plan context resolution;
- form validation coordination and field feedback;
- submission-state coordination;
- IndexedDB writes;
- success and storage-failure announcements.

Astro components own markup and visual structure. Client modules locate explicit DOM hooks and do not generate the primary page structure from JavaScript.

**Rationale:** The existing repository has no client framework, and current behavior does not justify adding one.

**Trade-off:** DOM contracts must remain explicit and tested because no component runtime synchronizes state automatically.

**Supports:** `NFR-004`, `CON-002`, `AR-001`–`AR-008`, `SP-SUBMIT-*`, `SP-COUNT-*`.

### 6.3 Runtime boundaries

```text
Astro build-time layer
├── routes and document metadata
├── semantic page composition
├── shared presentational components
├── placeholder content/configuration
└── asset imports

Browser interaction layer
├── countdown controller
├── Plan-context resolver
├── sign-up form controller
├── validation/feedback coordinator
└── IndexedDB persistence adapter

Browser infrastructure
└── IndexedDB
```

The browser interaction layer may depend on pure utilities and the persistence boundary. Presentational Astro components must not open IndexedDB directly.

## 7. Route and navigation architecture

### 7.1 Route ownership

| Route | Page responsibility | Browser enhancement |
|---|---|---|
| `/` | Header, hero, pricing, countdown, generic and plan-specific navigation | Countdown only |
| `/sign-up/` | Header, introduction, countdown, native form, feedback slots | Countdown, Plan context, validation, persistence, feedback |

### 7.2 Plan context

**Architecture decision `AD-003`: Pass Plan context through a query parameter.**

Plan-specific links use:

```text
/sign-up/?plan=basic
/sign-up/?plan=pro
/sign-up/?plan=ultimate
```

Generic `Get Started` links use `/sign-up/` without a required Plan parameter.

The Sign Up controller reads `URLSearchParams`, accepts only `basic`, `pro`, or `ultimate`, and maps them to the corresponding native-select option. Missing or unsupported values resolve to Basic.

The lower-case slugs are transport and persistence values. Visible labels remain Basic, Pro, and Ultimate.

**Rationale:** Query parameters preserve native links, support direct entry and shareable navigation, and avoid a global client state store.

**Trade-off:** Plan context is visible in the URL and must be validated rather than trusted.

**Supports:** `FR-002`, `FR-003`, `FR-012`, `BR-001`, `BR-002`; `SP-NAV-001`–`SP-NAV-004`, `SP-EDGE-003`.

### 7.3 Logo behavior

The Home logo is static brand identity. The Sign Up logo is an anchor to `/`. No click script is required.

**Supports:** `FR-010`, `BR-006`, `SP-NAV-005`.

## 8. Frontend structure and component boundaries

### 8.1 Structural organization

**Architecture decision `AD-004`: Organize by page and feature responsibility, with shared presentational primitives.**

The target source structure should follow this conceptual model:

```text
frontend/src/
├── assets/                 # runtime Officelite SVG assets
├── components/             # shared presentational Astro components
├── features/
│   ├── countdown/          # pure calculation and DOM controller
│   └── signup/             # Plan context, validation, submission, persistence boundary
├── layouts/                # document shell and metadata
├── pages/                  # Astro route entry points
└── styles/                 # global foundations and shared tokens
```

Exact filenames belong in `PLAN.md`. The architectural boundaries are normative even if implementation uses fewer files initially.

### 8.2 Shared presentational patterns

Reusable Astro patterns should cover genuine repetition:

- page shell and site header;
- brand logo;
- primary and pricing CTA treatments;
- countdown group and countdown unit;
- pricing card, including neutral and featured variants;
- form field wrapper and Plan select presentation;
- decorative asset wrappers.

A component remains presentation-focused when it receives content/state through props and does not own browser persistence or cross-page navigation state.

### 8.3 Feature boundaries

#### Countdown feature

Owns:

- target-date input;
- duration decomposition;
- display formatting;
- once-per-second wall-clock recalculation;
- updates to one or more countdown instances.

It does not own page layout, live announcements, zero-state product behavior, or future API transport.

#### Sign-up feature

Owns:

- Plan query parsing and default resolution;
- form DOM coordination;
- validation-state rendering and accessible relationships;
- submission state (`idle`, `invalid`, `pending`, `success`, `storage-failure`);
- record mapping;
- interaction with the IndexedDB persistence boundary;
- visible and programmatic result feedback.

It does not own final copy, final feedback styling, post-success field treatment, duplicate policy, or retention policy.

#### Persistence boundary

Owns:

- opening and upgrading the database;
- starting the write transaction;
- adding a record;
- resolving only after transaction completion;
- translating browser storage failures into a stable application-level failure result.

It does not read or modify the DOM, choose messages, or move focus.

## 9. Dependency rules

Dependencies flow from page composition toward focused browser services:

```text
Astro pages
   ├── shared Astro components
   └── page initialization scripts
             ↓
       feature controllers
        ├── pure utilities
        └── persistence boundary
                 ↓
             IndexedDB
```

Rules:

1. Astro pages may compose shared components and initialize page-specific feature modules.
2. Shared presentational components must not depend on IndexedDB.
3. Countdown calculation must remain a pure utility independent of the DOM and timers.
4. The countdown DOM controller may depend on countdown calculation, but not on the sign-up feature.
5. The sign-up controller may depend on validation helpers, record mapping, and the persistence boundary.
6. The persistence boundary must not depend on Astro components or browser presentation code.
7. No module may send sign-up records to a remote endpoint in the current release.
8. Query-string parsing must validate Plan values against the shared Plan value set.
9. Design tokens must be referenced through CSS custom properties rather than repeated arbitrary color or spacing literals where a token exists.
10. Product copy and Plan content remain data supplied to presentation rather than being embedded in persistence logic.

## 10. State ownership

The project does not require a global state library.

| State | Owner | Lifetime | Notes |
|---|---|---|---|
| Marketing, pricing, and feature content | Astro page/build configuration | Build and document load | Placeholder content remains replaceable |
| Current Plan selection | Native select control, initialized by sign-up controller | Sign Up document lifetime | URL context is read once at initialization; user may change selection |
| Form field values | Native form controls | Sign Up document lifetime | Preserved after storage failure; post-success behavior remains open |
| Field validity and messages | Sign-up controller plus native constraints | Submit/correction cycles | Exact copy and visual styling remain open |
| Submission state | Sign-up controller | Sign Up document lifetime | Prevents concurrent pending writes |
| Stored sign-up records | IndexedDB persistence boundary | Origin storage lifetime | Retention policy is not defined |
| Countdown target | Shared current-release configuration | Build/document lifetime | Exact placeholder timestamp and future API contract remain open |
| Countdown display values | Countdown controller per document | Active page lifetime | Recalculated from wall-clock time |

## 11. Data flow

### 11.1 Generic Home navigation

1. The visitor activates a generic Home CTA.
2. The browser navigates to `/sign-up/`.
3. The Sign Up page renders static content and form markup.
4. The sign-up controller finds no valid `plan` parameter and selects Basic.

### 11.2 Plan-specific navigation

1. The visitor activates a Plan CTA.
2. The anchor includes the Plan slug in the query string.
3. The Sign Up controller validates the slug.
4. The matching native-select option is selected.
5. Unsupported values fall back to Basic.

### 11.3 Valid sign-up submission

```text
Visitor
   ↓ submit
Native form controls
   ↓ validation values
Sign-up controller
   ↓ valid mapped record
IndexedDB persistence boundary
   ↓ readwrite transaction
IndexedDB signups store
   ↓ transaction complete
Sign-up controller
   ↓ success feedback
Visitor / assistive technology
```

Detailed sequence:

1. The controller clears stale result state and validates all controls.
2. Invalid data produces field feedback and no persistence call.
3. Valid data moves the controller to `pending` and exposes a programmatic busy state.
4. Repeated activation while pending does not start another write.
5. The controller creates the current record shape and calls the persistence boundary.
6. The persistence boundary opens the database, starts one `readwrite` transaction, and adds the record.
7. A request-level success does not complete the application operation.
8. The operation resolves only after the transaction `complete` event.
9. The controller shows and announces success.
10. Post-success field clearing, disabling, or replacement remains a stakeholder decision.

### 11.4 Storage failure

1. Database opening, upgrade, request, or transaction completion fails.
2. The persistence boundary returns one stable storage-failure outcome without exposing raw browser details to the UI.
3. The controller exits `pending`, preserves entered values where possible, removes stale success, and shows/announces failure.
4. A later submit may retry.

### 11.5 Countdown flow

1. Astro renders the date label and initial countdown markup.
2. The countdown controller reads the configured target.
3. A pure calculation derives whole days, remaining hours, minutes, and seconds from `target - now`.
4. Values are formatted with a two-digit minimum and written to the relevant DOM nodes.
5. The controller schedules the next update approximately once per second.
6. Every update recalculates from wall-clock time, so throttled tabs catch up.
7. Countdown values are not exposed as a one-second live region.

## 12. IndexedDB data architecture

This section resolves `DR-005` and `SP-DATA-004`.

### 12.1 Database definition

**Architecture decision `AD-005`: Use the following version-1 IndexedDB schema.**

| Property | Decision |
|---|---|
| Database name | `officelite` |
| Schema version | `1` |
| Object store | `signups` |
| Key path | `id` |
| Key generation | IndexedDB `autoIncrement: true` |
| Generated identifier | Numeric local `id`, assigned by IndexedDB |
| Timestamp | `createdAt`, UTC ISO 8601 string generated for each write attempt |
| Indexes | None in version 1 |

### 12.2 Record shape

```text
SignupRecord
- id: number               # generated by IndexedDB
- name: string
- email: string
- plan: "basic" | "pro" | "ultimate"
- phone: string
- company: string
- createdAt: string        # UTC ISO 8601
```

The persistence layer stores only the five required conceptual fields plus the architecture-required local identifier and creation timestamp.

No remote ID, synchronization status, updated timestamp, deletion marker, analytics field, consent field, or API payload metadata is added in the current release.

### 12.3 Rationale

- `officelite` is stable and product-specific without tying the database to a future API version.
- `signups` names the stored record category directly.
- Version `1` establishes an explicit migration boundary from the first implementation.
- An auto-increment numeric key avoids requiring browser UUID support while providing a stable local primary key.
- `createdAt` provides ordering and future migration context without defining retention or deduplication policy.
- No index is justified because the current release has no listing, search, update, delete, synchronization, or approved duplicate-resolution behavior.

### 12.4 Value handling

**Architecture decision:** The persistence boundary does not invent product normalization rules.

- Plan is serialized to its lower-case stable slug.
- The other form strings pass from the validated form mapping without casing, email canonicalization, phone formatting, or company normalization imposed by IndexedDB infrastructure.
- Validation may trim a copy of a value to determine whether it is whitespace-only, but that check does not silently define stored normalization.

Any later normalization policy must be documented as a product/data decision and covered by migration or compatibility tests where relevant.

### 12.5 Transaction contract

The save operation must:

1. open database `officelite` at version `1`;
2. create `signups` with `{ keyPath: "id", autoIncrement: true }` during `onupgradeneeded` when absent;
3. start one `readwrite` transaction;
4. add exactly one mapped record for one accepted submission;
5. resolve only when the transaction completes;
6. reject if opening, upgrading, adding, or committing cannot complete;
7. close or release database resources without leaving the UI in `pending`.

### 12.6 Migration rules

Future structural changes must increment the database version.

Rules:

- Schema changes occur inside `onupgradeneeded`.
- Existing stores and records are not deleted automatically.
- Destructive migrations require an explicit product/data decision.
- A future unique index for duplicate prevention must not be added until duplicate identity and conflict behavior are approved.
- Future API synchronization fields require a versioned migration if they are persisted locally.
- Upgrade failures map to storage failure for the current UI and must not produce success.

### 12.7 Unresolved lifecycle policy

The schema permits multiple records because no approved uniqueness key exists. This is a storage capability, not a product decision that duplicate submissions are acceptable.

Still open:

- sequential duplicate handling;
- retention duration;
- update and deletion policy;
- user-facing local-record management;
- future synchronization and conflict resolution.

No automatic cleanup, deduplication, or record replacement is architecturally authorized.

**Supports:** `FR-007`, `FR-008`, `FR-011`, `BR-004`, `BR-005`, `DR-001`–`DR-007`, `NFR-001`; `SP-SUBMIT-002`–`SP-SUBMIT-009`, `SP-DATA-001`–`SP-DATA-005`.

## 13. API and integration boundaries

### 13.1 Current release

**Architecture decision `AD-006`: No backend, serverless function, or remote form API is part of the current architecture.**

- Sign-up records remain local.
- The countdown uses a current-release local configuration boundary.
- No API client, authentication token, CORS policy, or server error model is required now.

### 13.2 Future launch-date source

The countdown feature must receive its target through one defined source boundary rather than reading a hard-coded date in multiple components.

Current adapter:

```text
local placeholder configuration → countdown target
```

Future adapter:

```text
launch-date API → validated target → countdown target
```

The future API payload, timezone, caching, loading, and fallback behavior are not defined. Architecture must not pre-commit to a transport library or response schema.

### 13.3 Future sign-up processing

The current persistence boundary should keep conceptual field names mappable to a later API, but an API client is not implemented now.

A future integration may:

- send a new submission directly after local storage;
- synchronize previously local records;
- replace local persistence;
- retain IndexedDB as an offline queue.

Those are different product architectures and require a later decision. The current document does not select one.

## 14. Authentication and authorization

No authentication or authorization boundary exists in the current release.

- Home and Sign Up are public routes.
- IndexedDB records are accessible to scripts executing under the same browser origin.
- No administrator interface or protected record-management capability is in scope.

If a future API processes personal data or exposes records, authentication, authorization, consent, and privacy architecture must be defined before implementation.

## 15. Styling and design-system integration

### 15.1 CSS architecture

**Architecture decision `AD-007`: Use CSS custom properties for shared foundations and scoped component styles for component behavior.**

The styling system has three responsibility levels:

1. **Global foundations:** reset/base rules, body typography, color variables, spacing variables, radius variables, shadows, content-width conventions, and breakpoint documentation.
2. **Shared component styles:** buttons, fields, select treatment, countdown units, pricing cards, and focus/hover variants.
3. **Page composition styles:** Home and Sign Up arrangement, responsive re-composition, decorative backgrounds, and overlap behavior.

No Tailwind dependency or CSS-in-JS runtime is introduced. Inline `style` attributes are avoided unless an asset or dynamic value cannot be represented through classes/custom properties.

### 15.2 Token mapping

Figma primitive names map to semantic implementation tokens where context improves clarity. For example:

```text
Figma colors/blue/500  → --color-action-primary
Figma neutral/900      → --color-surface-dark / --color-text-primary by use
Figma spacing/500      → --space-5 (or another documented semantic scale)
Figma corner-radius/12 → --radius-card
```

The exact code token names are finalized in implementation work, but the following rules are architectural:

- one source of truth for each shared value;
- semantic aliases may reference primitive values;
- media-query thresholds use the confirmed `24rem`, `48rem`, and `80rem` values;
- current accepted contrast deviations remain documented rather than silently changed;
- each component family retains its supplied Figma focus treatment.

### 15.3 Responsive styling

CSS is mobile-first:

- base rules cover narrow compact behavior below `24rem`;
- `min-width: 24rem` activates compact composition;
- `min-width: 48rem` activates medium composition;
- `min-width: 80rem` activates large composition.

Containers remain fluid between thresholds. Fixed Figma heights are not architectural constraints; content and feedback grow vertically.

### 15.4 Font delivery

**Open technical decision:** Kumbh Sans is required by the design, but the repository contains no verified web-font files or approved delivery method.

Before final implementation, choose and document either:

- self-hosted Kumbh Sans assets; or
- an approved external font provider with an appropriate fallback strategy.

This decision affects privacy, performance, offline behavior, and deployment headers but does not block structural planning.

## 16. Asset architecture

### 16.1 Source and runtime ownership

**Architecture decision `AD-008`: Move approved runtime assets into the Astro application asset boundary.**

The existing matching SVG source files under `docs/starter-code/assets/` are reference inputs. Runtime pages must not depend on documentation paths.

Approved runtime assets should live under `frontend/src/assets/` when imported and processed by Astro, or under `frontend/public/` only when stable public URLs are required.

Prefer `src/assets` for:

- logo;
- dashboard illustration;
- hero/footer/sign-up orbit artwork;
- select chevron and any approved feedback icons.

Use `public/` for favicons and files that must preserve a fixed URL.

### 16.2 Accessibility treatment

- The dashboard illustration and orbit artwork are decorative.
- Decorative `<img>` elements use empty alternative text and are hidden from assistive technology as appropriate.
- CSS background use is acceptable for purely decorative orbit artwork.
- The Sign Up logo link has a meaningful accessible name.
- A missing decorative asset must not create a broken-image announcement or remove meaningful content.

### 16.3 Asset integrity

Existing matching SVG bytes should be reused rather than redrawn. Figma-hosted temporary asset URLs are not production dependencies.

## 17. Error handling architecture

### 17.1 Validation errors

The sign-up controller maps control validity to field-specific visible feedback and accessible relationships.

- Validation prevents persistence.
- Each invalid field is programmatically marked invalid.
- Correcting and resubmitting removes stale field errors.
- Exact copy and visual styling remain open.

**Recommended, awaiting approval:** Move focus to the first invalid control after a failed submit.

### 17.2 Storage errors

The persistence boundary normalizes browser-specific failures into a stable application result. Internal categories may distinguish:

- IndexedDB unavailable;
- database open or upgrade failure;
- add-request failure;
- transaction abort or error;
- unknown storage failure.

The UI does not expose exception objects, stack traces, database names, or browser implementation details. Every non-completing write produces the same confirmed storage-failure outcome at the product boundary.

### 17.3 Initialization failures

A failure in one enhancement must remain local where possible:

- countdown initialization failure must not remove static page content;
- sign-up initialization failure must not corrupt static form markup;
- decorative asset failure must not affect navigation or form operation.

Static-content resilience without JavaScript remains a recommendation rather than a confirmed Must, but the chosen Astro architecture supports it naturally.

### 17.4 Error-boundary scope

A framework-level client error boundary is unnecessary because there is no client application runtime. Each feature initializer catches and contains its own initialization and operational failures.

## 18. Accessibility architecture

Accessibility is part of the structural implementation rather than a post-build enhancement.

Rules:

1. Astro renders semantic landmarks and one page-level heading per route.
2. Navigation uses anchors; submission uses a native form and submit button.
3. Plan uses a native `<select>` and native option list.
4. Every field has a persistent programmatic label.
5. Required and invalid states are exposed programmatically.
6. Field messages are associated with their controls.
7. Visible focus uses the supplied component-family variants and remains independent of hover.
8. Countdown updates are not placed in a one-second live region.
9. Success and storage failure have announcement hooks without unexpected focus movement.
10. The submission controller exposes a busy state while a write is pending.
11. Responsive DOM order remains meaningful when CSS changes visual composition.
12. Decorative assets do not contribute accessible names.
13. Reduced-motion preferences do not remove functionality.
14. Known contrast risk remains an explicit accepted deviation; full WCAG AA conformance is not claimed.

**Recommended, awaiting approval:** One form-level result region between fields and submit, with polite success and assertive failure semantics.

## 19. Security and privacy considerations

The current application stores contact information locally and therefore still has security and privacy responsibilities.

### 19.1 Data minimization

Only these values are stored:

- Name;
- Email Address;
- Plan;
- Phone Number;
- Company;
- local ID;
- creation timestamp.

No browser fingerprint, analytics identifier, remote status, or unrelated metadata is added.

### 19.2 Origin security

IndexedDB follows the browser origin boundary. Any script executing on the application origin may potentially access the records.

Architectural controls:

- avoid unnecessary third-party scripts;
- never render stored input through unsafe HTML insertion;
- use DOM text/value APIs rather than `innerHTML` for user-controlled content;
- do not log form values or stored records;
- serve production over HTTPS;
- keep dependencies minimal and reviewed.

### 19.3 Policy limitations

The current project has no approved retention, deletion, consent, privacy-notice, or duplicate policy. Architecture must not claim compliance with a data-protection regime or invent lifecycle behavior.

These policies must be approved before the future API phase and before final production sign-off for real personal data.

## 20. Testing architecture

### 20.1 Current baseline

**Observed:** No test runner, browser-test framework, accessibility test package, lint script, or Astro check script is currently configured.

### 20.2 Required testing layers

**Architecture decision `AD-009`: Use layered tests aligned with responsibility boundaries.**

#### Static validation

Covers:

- Astro template/type checking;
- production build;
- invalid imports and route generation;
- HTML structure where tool support permits.

#### Unit tests

Cover pure behavior:

- Plan query parsing and Basic fallback;
- Plan slug/label mapping;
- required whitespace checks;
- countdown duration decomposition and formatting;
- record mapping and timestamp injection;
- submission-state transitions where modeled independently.

#### Persistence integration tests

Cover:

- database creation and upgrade;
- `signups` store and auto-increment key behavior;
- stored record shape;
- resolution only after transaction completion;
- request, transaction, and unavailable-storage failure mapping;
- no unique index or unapproved deduplication behavior.

A test IndexedDB implementation may be used for module integration, but at least one real-browser test must verify the browser transaction path.

#### Component/DOM tests

Cover:

- labels, required state, and error associations;
- native Plan select initialization;
- pending busy state and repeated-activation protection;
- visible/programmatic success and failure;
- no unexpected focus movement;
- countdown DOM updates without a live-region tick announcement.

#### End-to-end browser tests

Cover critical flows:

- generic Home CTA → Basic Sign Up;
- each Plan CTA → matching Sign Up selection;
- Sign Up logo → Home;
- invalid form → no IndexedDB write;
- valid form → committed record → success;
- failed write → preserved values → failure → retry;
- responsive behavior at and between confirmed thresholds;
- keyboard-only completion;
- zoom/text enlargement and no primary-flow horizontal scrolling.

#### Visual and accessibility review

Cover:

- comparison with all six production Figma frames;
- default, hover, and focus variants;
- long content and feedback growth;
- automated accessibility checks plus manual keyboard and screen-reader-oriented inspection;
- documented contrast deviations without false conformance claims.

### 20.3 Tool selection

**Recommended for planning:**

- Astro’s official check command for template/type validation;
- Vitest for unit and module integration tests;
- a controlled IndexedDB test implementation for persistence integration;
- Playwright for browser and responsive flows;
- an automated accessibility integration compatible with Playwright.

Exact package versions and scripts belong in `PLAN.md` after compatibility verification with the installed Astro and Node versions.

## 21. Build and deployment architecture

### 21.1 Build output

**Architecture decision `AD-010`: Preserve Astro’s static-output deployment model.**

The current `astro.config.mjs` has no server output or adapter configuration. The target application can remain statically generated because all current dynamic behavior executes in the browser.

```text
frontend source
   ↓ pnpm build
Astro static output: frontend/dist/
   ↓ deployment
Vercel static hosting
```

No runtime Node server is required after build.

### 21.2 Deployment root

The deployable application lives under `frontend/` rather than the repository root.

**Open operational verification:** Confirm that the Vercel project root directory is configured as `frontend` and that its install/build/output settings match the repository scripts. No checked-in `vercel.json` currently establishes this.

### 21.3 Environment configuration

No secret or environment variable is required for the current placeholder release.

A future date API will introduce environment and runtime configuration concerns. Those must be designed when the API contract is approved rather than added speculatively now.

### 21.4 Continuous integration

**Recommended:** Add CI that installs from the lockfile, runs static checks, tests, and a production build from `frontend/`. The exact workflow belongs in `PLAN.md`.

## 22. Observability

There is no backend or distributed runtime requiring centralized logs, metrics, or tracing.

Current observability is intentionally limited:

- user-facing validation, success, and storage-failure feedback;
- test assertions around IndexedDB outcomes;
- deployment/build logs supplied by the hosting platform;
- optional sanitized development diagnostics.

Rules:

- never log form values or stored records;
- do not add analytics without a product requirement and privacy review;
- production user-facing messages must not reveal storage internals.

## 23. Architectural decisions summary

| ID | Decision | Status | Primary rationale | Main traceability |
|---|---|---|---|---|
| `AD-001` | Astro static multi-page application | Architecture decision | Two routes, native navigation, minimal runtime | `FR-001`, `FR-002`, `FR-004`, `FR-010`; `SP-GLOBAL-*` |
| `AD-002` | Framework-free browser TypeScript | Architecture decision | Existing stack and limited interaction do not justify a framework | `NFR-004`, `CON-002`; `SP-SUBMIT-*`, `SP-COUNT-*` |
| `AD-003` | Query-string Plan context with validated lower-case slugs | Architecture decision | Direct links and no global state | `FR-003`, `FR-012`; `SP-NAV-*` |
| `AD-004` | Page/feature/shared-presentational source boundaries | Architecture decision | Clear responsibility and testability | `NFR-003`, `AR-001`; `SPEC.md` §13 |
| `AD-005` | IndexedDB `officelite` v1, `signups`, auto-increment `id`, `createdAt` | Architecture decision | Resolves delegated persistence structure without inventing duplicate policy | `DR-005`; `SP-DATA-004` |
| `AD-006` | No backend or remote form API | Confirmed architecture boundary | Current release is local-only | `BR-005`, `DR-004`, `CON-006`; `SP-SUBMIT-007` |
| `AD-007` | CSS custom-property foundations plus scoped/shared styles | Architecture decision | Figma token mapping without new styling framework | `CON-002`, `CON-007`; `DESIGN.md` §§8–11, 17 |
| `AD-008` | Runtime SVGs move into the Astro asset boundary | Architecture decision | Documentation paths are not runtime ownership | `CON-005`, `AR-005`; `SP-EDGE-002` |
| `AD-009` | Layered static, unit, persistence, DOM, browser, and visual tests | Architecture decision | Test each responsibility at the correct boundary | `NFR-001`–`NFR-003`, `AR-001`–`AR-010` |
| `AD-010` | Static Astro build deployed from `frontend/` to Vercel | Architecture decision with operational verification open | Current config and browser-only runtime | `NFR-004`, `CON-002`, `CON-006` |

## 24. Alternatives considered

### 24.1 Single-page application with client router

**Rejected for current scope.** It would add runtime, routing, hydration, and state complexity without improving the two-page direct-navigation flow.

### 24.2 React or another client UI framework

**Rejected for current scope.** No existing integration exists, and the dynamic behavior is small and DOM-local.

### 24.3 One large page script

**Rejected.** It would couple navigation, countdown, validation, storage, feedback, and DOM structure, making testing and future API replacement harder.

### 24.4 Global client state store

**Rejected.** URL context, native controls, and page-local controller state cover current needs.

### 24.5 `localStorage`

**Rejected.** IndexedDB is a confirmed requirement and provides transaction semantics needed by the success definition.

### 24.6 Custom select popup

**Rejected.** Native select behavior is confirmed and is required for platform keyboard and menu behavior.

### 24.7 Backend or serverless form endpoint

**Rejected for current release.** It contradicts the confirmed local-only boundary and introduces privacy, API, deployment, and error-handling scope not yet approved.

### 24.8 Runtime use of `docs/starter-code/`

**Rejected.** Documentation assets are source references; application-owned assets belong under `frontend/`.

### 24.9 IndexedDB uniqueness index in version 1

**Rejected.** No approved duplicate identity or conflict behavior exists. Adding a unique email or composite index would silently decide product policy.

## 25. Constraints and trade-offs

- Static Astro output keeps deployment simple but does not provide server-side processing.
- Framework-free TypeScript minimizes bundle size but requires disciplined DOM contracts.
- Native select behavior improves accessibility and reliability but varies visually across browsers.
- IndexedDB allows local persistence but depends on browser support, origin continuity, storage availability, and user-controlled site data.
- Auto-increment local IDs are simple but are not future server identifiers.
- No version-1 indexes keep the schema policy-neutral but provide no efficient lookup strategy.
- Existing accepted contrast failures remain visible technical debt.
- Placeholder content and date keep implementation moving but prevent final content sign-off.
- Keeping duplicate and retention policy open avoids inventing governance but blocks final persistence-policy acceptance.
- Static content can remain available without JavaScript, but the current requirement is only a recommendation rather than a confirmed Must.

## 26. Known risks and mitigations

| Risk | Impact | Architectural mitigation / disposition |
|---|---|---|
| IndexedDB unavailable, denied, or failing | Sign-up cannot complete | Stable persistence boundary, failure feedback, preserved values, retry path |
| Browser matrix is undefined | Unknown compatibility and test coverage | Keep dependencies minimal; require matrix before final compatibility sign-off |
| Sequential duplicate policy is undefined | Multiple or conflicting local records | No unique index or dedupe assumption; keep product decision visible |
| Retention/deletion policy is undefined | Local personal data may remain indefinitely | No automatic policy invented; require governance before real-data production sign-off |
| Final feedback design and copy are missing | Fidelity and content tests cannot be finalized | Flexible status/error slots; keep exact presentation as implementation gate |
| Post-success form behavior is undefined | Final success flow cannot be closed | Controller state supports options; do not clear/replace until approved |
| Current palette has contrast failures | Accessibility conformance risk | Preserve documented deviation; do not claim full WCAG AA |
| Kumbh Sans delivery is unresolved | Fidelity, performance, privacy risk | Decide self-hosted versus approved external source before implementation completion |
| Vercel project-root configuration is external | Deployment may build the wrong directory | Verify `frontend` root and build/output settings in planning/deployment task |
| Client script failure | Dynamic behavior unavailable | Astro-rendered semantic structure; feature-local initialization; progressive resilience recommendation |
| Future API integration changes data flow | Migration and privacy complexity | Isolated date source and persistence boundary; future architecture review required |
| Starter source may be mistaken for reusable product code | Unnecessary adaptation and design drift | Replace starter UI; preserve only verified project configuration and useful conventions |

## 27. Open decisions and implementation gates

### Stakeholder-owned

1. Final validation, success, and storage-failure copy.
2. Visual treatment and placement for field errors and form-level feedback.
3. Post-success field/form behavior.
4. Sequential duplicate policy.
5. Retention duration and any future deletion/update policy.
6. Browser-support matrix.
7. Pro/Ultimate supporting Plan text and exact `Pack` labels.
8. Extreme content-length limits.
9. Future launch-date API timezone and payload.

### Technical/operational

1. Kumbh Sans delivery: self-hosted or approved external provider.
2. Verification of Vercel’s `frontend` project root and build/output settings.
3. Exact compatible versions of the recommended testing and accessibility tools.
4. Whether CI is introduced in the same implementation plan or as a separate infrastructure phase.

None blocks creation of `PLAN.md`. The related implementation tasks must remain gated where a stakeholder decision affects observable behavior.

## 28. Traceability matrix

| Architecture area | Requirements | Primary specifications |
|---|---|---|
| Static routes and page shell | `FR-001`, `FR-002`, `FR-004`, `FR-010`, `CON-002` | `SP-GLOBAL-*`, Home and Sign Up sections |
| Plan navigation context | `FR-003`, `FR-005`, `FR-012`, `BR-001`, `BR-002` | `SP-NAV-*`, `SP-SIGNUP-*`, `SP-EDGE-003` |
| Form validation/controller | `FR-006`, `AR-002`, `AR-004`, `DR-002` | `SP-FORM-*`, `SP-VAL-*`, `SP-SUBMIT-001` |
| IndexedDB boundary/schema | `FR-007`, `FR-008`, `FR-011`, `BR-004`, `DR-001`–`DR-007` | `SP-SUBMIT-002`–`SP-SUBMIT-009`, `SP-DATA-*` |
| Countdown | `FR-009`, `AR-007`, `CR-003` | `SP-COUNT-*` |
| Responsive CSS architecture | `RR-001`–`RR-006`, `AR-008`, `NFR-002` | `SP-RESP-*`, `SP-EDGE-005` |
| Design tokens and assets | `CON-001`, `CON-002`, `CON-005`, `CON-007`, `AR-005` | Visual-state, component, and asset specifications |
| Accessibility structure | `AR-001`–`AR-010` | Keyboard/focus, feedback, responsive, and edge specifications |
| Build/deployment | `NFR-004`, `CON-002`, `CON-006` | Scope, non-functional, and current local-only specifications |
| Testing architecture | `NFR-001`–`NFR-003`, Definition of Done | Acceptance criteria and requirement-to-spec traceability |

## 29. Review pass 1 — Completeness and correctness

Completed checks:

- Inspected the current repository structure, executable source, package configuration, strict TypeScript configuration, starter assets, reference assets, and commit delta from the initial Astro source.
- Distinguished existing files from proposed structural boundaries.
- Covered system context, frontend and absent-backend boundaries, routes, components, state, data flow, persistence, APIs, authentication, styling, assets, errors, accessibility, testing, deployment, security, observability, alternatives, trade-offs, risks, and open decisions.
- Resolved the required IndexedDB database, store, version, key, identifier, timestamp, index, and migration decisions.
- Preserved duplicate, retention, post-success, browser, content, and feedback decisions as stakeholder-owned.
- Avoided implementation sequencing and task breakdown.

Corrections made during this pass:

- Did not treat `docs/starter-code/` as the runtime application.
- Did not treat the current Astro starter component as reusable Officelite product architecture.
- Did not add a backend, API client, UI framework, router, state library, custom select, or uniqueness index without evidence.
- Did not equate IndexedDB request success with application success.
- Kept stored-string normalization separate from whitespace validation.

## 30. Review pass 2 — Consistency, traceability, and uncertainty

Completed checks:

- Verified all architecture decisions align with `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, and `DOCUMENT-REVIEW.md`.
- Verified `AD-005` directly resolves `DR-005` and `SP-DATA-004` without resolving `DR-007`.
- Verified Basic remains the generic/direct default while Pro remains visually featured.
- Verified native navigation and native Plan selection remain intact.
- Verified the confirmed responsive thresholds and mobile-first boundary semantics are preserved.
- Verified focus, countdown announcement, pending-write, decorative-asset, and storage-failure behavior remain consistent.
- Verified accepted contrast deviation is not presented as conformance.
- Verified future APIs are isolated as future boundaries rather than current dependencies.
- Verified recommended first-invalid focus, form-level status placement, static no-JavaScript resilience, and Plan supporting text remain unapproved.

No architectural contradiction blocks planning. Some tasks must retain stakeholder approval gates.

## 31. Stage completion

- **File created:** `ARCHITECTURE.md`
- **Important findings:** The verified executable repository is a nested Astro 7 starter with no product implementation, client framework, tests, backend, or checked-in deployment configuration. The current scope is best served by a static two-route Astro multi-page application with focused framework-free TypeScript enhancements.
- **Architecture decisions:** Static MPA, query-string Plan context, feature/presentation boundaries, local IndexedDB schema, CSS token integration, runtime asset ownership, layered testing, and static Vercel deployment model.
- **IndexedDB resolution:** `officelite` database, version `1`, `signups` store, auto-increment `id`, UTC `createdAt`, and no version-1 indexes.
- **Assumptions introduced:** Vercel is expected to deploy the `frontend/` static build, but the external project-root settings remain unverified. Target browsers are assumed to support IndexedDB until a browser matrix is approved.
- **Open questions:** Final feedback design/copy, post-success behavior, duplicate and retention policy, browser support, font delivery, future API contract, Plan supporting labels, extreme content limits, and deployment-setting verification.
- **Blockers:** None for Stage 7 planning. Stakeholder decisions remain gates for their affected implementation tasks.
- **Readiness:** **Ready for Stage 7 — create `PLAN.md`.**
