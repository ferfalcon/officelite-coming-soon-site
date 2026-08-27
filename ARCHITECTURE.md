---
artifact: ARCHITECTURE
project: Officelite coming soon site
profile: Full
execution_mode: Gated
baseline:
  design:
    - SRC-DS-001
  repository:
    - SRC-REPO-001
  runtime: []
  documentation: []
  assets: []
created: 2026-08-27
updated: 2026-08-27
---

# Architecture

## 1. Document Information

- Scope: Current-release Officelite Home and Sign Up implementation inside the authorized implementation root **frontend/**.
- Status: Stage 6 draft for human approval.
- Last updated: 2026-08-27.
- Source baseline: SOURCE-BASELINE.md.
- Evidence baseline: DESIGN-AUDIT.md.
- Approved upstream documents: REQUIREMENTS.md, DESIGN.md, SPEC.md, DOCUMENT-REVIEW.md.
- Active workflow snapshots: SRC-DS-001 and SRC-REPO-001.
- Repository baseline commit: 602d0e987bacea61f81f4d8f159510e220e97af4.
- Figma scope: file L7MdLOW8usVUcPwV0cMQ1n, page/node 4:3.
- Implementation profile: Full.
- Execution mode: Gated.

## 2. Purpose and Scope

This document defines the structural technical decisions required to turn the approved Officelite design and specification into a maintainable Astro implementation without expanding the product scope.

Architecture is required for this release because the product is more than a single static composition. It has two navigable experiences, plan context that crosses a route boundary, shared countdown state, client-side validation, browser-local IndexedDB persistence, accessibility behavior shared across controls, responsive design-system integration, and an existing deployment boundary.

The architecture covers:

- page and route boundaries;
- shared and page-specific component responsibilities;
- plan-context transfer between Home and Sign Up;
- browser-local state and IndexedDB ownership;
- countdown ownership;
- validation, status, and accessibility boundaries;
- styling and design-token integration;
- static build and Vercel deployment boundaries;
- testing responsibilities.

The architecture does not add:

- a backend or remote sign-up API;
- authentication or authorization;
- a production launch-date service;
- a CMS;
- remote synchronization;
- analytics or application telemetry requirements;
- a new frontend UI framework;
- a final IndexedDB retention, deletion, or encryption policy;
- implementation sequencing, which belongs in PLAN.md.

## 3. Evidence and Sources

### Confirmed project sources

- REQUIREMENTS.md defines current-release product outcomes and constraints, especially REQ-FR-001 through REQ-FR-012, REQ-DR-001 through REQ-DR-003, REQ-AR-001 through REQ-AR-005, and REQ-CON-001 through REQ-CON-004.
- DESIGN.md defines visual, interaction, responsive, and accessibility intent, especially DES-INT-001 through DES-INT-007 and DES-RWD-001 through DES-RWD-007.
- SPEC.md defines observable behavior, especially SPEC-BEH-001 through SPEC-BEH-007, SPEC-INT-001 through SPEC-INT-005, SPEC-ACC-001 through SPEC-ACC-006, SPEC-DATA-001 through SPEC-DATA-003, and SPEC-VAL-001 through SPEC-VAL-003.
- DOCUMENT-REVIEW.md records the Stage 5 result as ready with documented non-blocking assumptions.
- SRC-REPO-001 pins repository commit 602d0e987bacea61f81f4d8f159510e220e97af4.
- SRC-DS-001 identifies the authorized mutable Figma scope.

### Observed repository evidence at SRC-REPO-001

The implementation root is an Astro starter rather than an existing Officelite application:

- frontend/package.json uses Astro ^7.1.6, ESM, Node >=22.12.0, and pnpm-managed files.
- frontend/astro.config.mjs contains the default Astro configuration.
- frontend/src/pages/index.astro is the only product route currently present and renders the starter Welcome component.
- frontend/src/layouts/Layout.astro is the starter document shell.
- frontend/src/components/Welcome.astro is Astro starter content.
- No Sign Up route, IndexedDB persistence module, countdown module, product design-system layer, or automated test dependency is present.
- Product reference assets and starter text exist under docs/starter-code/, outside the implementation root.

### Observed design evidence

The authorized Figma scope contains:

- Home and Sign Up responsive compositions;
- local Brand / Logo, button, text-field, and plan-select component families;
- Default, Hover, and Focus states for current interactive component families;
- product illustration and decorative orbit assets;
- local design-system foundations and reusable visual tokens.

Figma does not establish runtime semantics, IndexedDB behavior, route implementation, browser support, or final accessibility compliance.

### Supplemental platform observation

The connected Vercel project currently exists and has a READY production deployment. The project reports Node 24.x. This is current platform evidence, not an active workflow runtime snapshot, so no deployed product behavior is inferred from it.

## 4. System Context

The current release is a browser-delivered static site with browser-local interactive behavior.

User flow:

Visitor → Home → Sign Up → local validation → IndexedDB

Supporting boundaries:

- Figma supplies design evidence.
- Astro supplies static page generation and component composition.
- Browser APIs supply URL parsing, timing, form interaction, and IndexedDB.
- Vercel hosts the built static site.
- There is no current-release application server, sign-up API, authentication service, or remote database.

### Trust and data boundary

The five sign-up values are user-provided data. For the current release, they remain inside the visitor's browser and must not be transmitted to a remote sign-up endpoint. Vercel is a hosting boundary, not the owner of submitted sign-up records.

## 5. Architectural Goals

### AG-001 — Preserve the approved conversion flow with minimal runtime complexity

Use Astro's existing static architecture and native browser capabilities instead of adding a client application framework or client router that the approved behavior does not require.

Supports: REQ-FR-001 through REQ-FR-005, REQ-CON-002.

### AG-002 — Keep shared product rules in one place

Plan definitions and the current launch target must not be independently redefined by Home and Sign Up. Shared configuration should make drift observable and easy to prevent.

Supports: REQ-FR-004, REQ-FR-011, REQ-BR-001, REQ-BR-005, SPEC-BEH-003 through SPEC-BEH-005.

### AG-003 — Isolate browser persistence from presentation

IndexedDB lifecycle and write failures must be encapsulated behind a small persistence boundary so form rendering and accessible feedback do not depend on IndexedDB implementation details.

Supports: REQ-FR-008 through REQ-FR-010, REQ-DR-003, SPEC-DATA-003, SPEC-VAL-003.

### AG-004 — Make accessibility structural rather than corrective

Native semantics, logical DOM order, focus visibility, field-message relationships, and status announcements belong to shared component and interaction contracts rather than a final cleanup pass.

Supports: REQ-AR-001 through REQ-AR-005, SPEC-ACC-001 through SPEC-ACC-006.

### AG-005 — Preserve responsive intent without JavaScript layout branching

Responsive transformation should be owned by CSS layout and content fit. JavaScript should not choose Home or Sign Up layout variants based on viewport width.

Supports: REQ-NFR-001, REQ-NFR-002, DES-RWD-001 through DES-RWD-007, SPEC-BEH-006, SPEC-BEH-007.

### AG-006 — Keep the current release replaceable by future integrations

The browser-local persistence adapter and shared launch-target configuration should be replaceable by future server/API integrations without forcing a rewrite of the visual component system.

Supports: REQ-CON-003, REQ-CON-004.

## 6. Current Architecture

### Observed

The pinned implementation is a single Astro starter application under frontend/.

Current structure:

- **Page boundary:** one index route.
- **Layout boundary:** one generic starter layout.
- **Component boundary:** one starter Welcome component.
- **State:** no product state.
- **Persistence:** none.
- **Integration:** none.
- **Styling:** component-local starter CSS.
- **Testing:** no test runner or product test suite is configured.
- **Deployment:** repository is connected to an existing Vercel project, but deployment configuration details are not part of SRC-REPO-001.

The current implementation therefore provides a framework baseline but no reusable Officelite product architecture that needs to be preserved beyond the Astro/TypeScript/pnpm constraints.

## 7. Target and Transitional Architecture

### Target architecture

The current release remains one Astro application with two file-based page routes and small browser scripts for the behavior that cannot be expressed by static HTML/CSS alone.

Primary boundaries:

- **Pages** compose route-level experiences.
- **Shared UI primitives** implement repeated brand/action/countdown/form-state behavior.
- **Feature components** own Home- or Sign-Up-specific presentation.
- **Shared product configuration** owns plan definitions and current launch-target content.
- **Client controllers** own route-local transient browser behavior.
- **Validation helpers** own product-neutral form validity interpretation where native constraints are insufficient for orchestration.
- **IndexedDB adapter** owns browser persistence lifecycle and errors.
- **Global design tokens** expose reusable Figma-derived visual values.
- **Scoped component/layout CSS** owns local layout and visual implementation.

### Transitional architecture

Implementation replaces the Astro starter in place. No dual application, compatibility bridge, remote migration, database migration, or parallel persistence system is required.

The docs/starter-code assets are source/reference material. Product assets selected for implementation may be copied or imported into the appropriate frontend asset boundary during planning and implementation; the architecture does not keep runtime dependencies on docs/.

## 8. High-Level Structure

Target communication paths:

Home page
→ shared plan/config data
→ plan-aware navigation URL
→ Sign Up page
→ form controller
→ validation
→ IndexedDB adapter
→ status feedback

Both Home and Sign Up
→ shared launch configuration
→ Countdown component/controller

All pages/components
→ shared design tokens
→ component/layout CSS

Build path:

Astro source in frontend/
→ static build output
→ Vercel hosting

No current-release path requires:

Browser → remote sign-up API
Browser → remote launch-date API
Browser → authentication service

## 9. Components and Responsibilities

The names below describe architectural responsibilities. PLAN.md may choose exact file names after repository-level planning.

### 9.1 Route pages

#### Home page

Responsibilities:

- compose the Home content hierarchy;
- render hero, pricing, countdown, and conversion actions;
- create generic or plan-specific Sign Up navigation targets;
- preserve logical reading order independently of responsive placement.

Must not:

- write IndexedDB records;
- own Sign Up form validation;
- duplicate plan or launch-target definitions.

#### Sign Up page

Responsibilities:

- compose intro, countdown, and form regions;
- expose a safe static Basic/default plan;
- initialize allowed URL-carried plan context in the browser;
- bind the form controller.

Must not:

- implement IndexedDB operations inline in page markup;
- define a second plan list;
- add remote submission.

### 9.2 Shared visual primitives

Likely shared primitives include Brand Logo, action/button presentation, Countdown, field presentation, and status presentation.

Responsibilities:

- reuse Figma-derived visual states;
- preserve native semantic elements where appropriate;
- provide consistent focus treatment;
- remain independent from page-specific business behavior.

Must not:

- import Home or Sign Up feature modules;
- own routing policy;
- own persistence.

### 9.3 Home feature components

Home Hero and Pricing components own page-specific composition and content presentation. Pricing cards receive plan data and navigation targets rather than defining plan rules internally.

### 9.4 Sign Up form feature

Responsibilities:

- render the five required current-release controls;
- bind programmatic labels and validation-message relationships;
- coordinate validation and persistence;
- preserve entered values on persistence failure where technically possible;
- expose success/failure through a non-modal status region.

The form feature depends on validation and persistence boundaries. IndexedDB must not depend on the form feature.

### 9.5 Shared configuration

Responsibilities:

- own the approved plan domain: Basic, Pro, Ultimate;
- own display data needed by both pages;
- own the current placeholder launch target and replaceable launch copy;
- expose stable values without DOM dependencies.

This boundary prevents Home, Sign Up, and persistence from defining competing plan values.

### 9.6 IndexedDB adapter

Responsibilities:

- open/version the application database;
- own the sign-up object store boundary;
- write valid records;
- translate browser storage failures into application-level success/failure results;
- avoid logging submitted field values.

Must not:

- render UI;
- decide validation messages;
- send network requests;
- define product navigation.

Exact database, store, key, and version identifiers are implementation details for PLAN.md unless later compatibility requirements make them architectural.

## 10. Dependency Rules

1. Route pages may depend on shared primitives, page feature components, and shared configuration.
2. Page feature components may depend on shared primitives and shared configuration.
3. Shared primitives must not import page feature modules.
4. Shared configuration must remain independent of DOM, routing, and IndexedDB implementation.
5. The Sign Up form controller may depend on validation and the IndexedDB adapter.
6. The IndexedDB adapter must not depend on UI components or DOM state.
7. Validation must not trigger persistence itself.
8. Responsive layout rules belong to CSS, not viewport-dependent JavaScript state.
9. Sign-up behavior must not invoke a remote API in this release.
10. Countdown behavior must not invoke a remote launch-date service in this release.
11. Product assets used at runtime must resolve from the implementation application rather than depending on docs/ as a runtime content source.
12. No new frontend framework, state-management library, or client router is introduced unless later planning demonstrates a requirement that cannot be met cleanly with Astro and native browser APIs.

## 11. Important Data and Interaction Flows

### 11.1 Generic Home conversion

1. Visitor activates a generic Home CTA using native link semantics.
2. Browser navigates to Sign Up without plan-specific state.
3. Sign Up renders/retains Basic as the deterministic default.
4. Client initialization does not need a global store or previous-page memory.

Supports: REQ-FR-003, REQ-FR-004, SPEC-INT-001, SPEC-BEH-003.

### 11.2 Plan-specific conversion

1. Visitor activates the Basic, Pro, or Ultimate pricing CTA.
2. Home constructs a Sign Up URL carrying only the selected approved plan identifier.
3. Browser performs normal navigation.
4. Sign Up reads the URL state on client initialization.
5. If the value belongs to the approved plan domain, the native select is updated to that plan.
6. Missing or unsupported plan state falls back to Basic rather than creating a fourth product value.

The recommended interface is a query parameter such as **plan=basic**, **plan=pro**, or **plan=ultimate**. This makes the conversion state explicit, bookmarkable, inspectable, and independent of global client memory.

Supports: REQ-FR-004, REQ-DR-002, SPEC-BEH-003, SPEC-DATA-002.

### 11.3 Sign-up submission

1. User activates the native form submit action.
2. The form controller evaluates required fields and HTML single-address email validity semantics.
3. Invalid fields prevent the persistence boundary from being called.
4. Field-specific visible feedback is associated with each invalid control.
5. A valid submission is converted to the five-value sign-up record contract.
6. The IndexedDB adapter attempts the local write.
7. Success produces visible/programmatic success status.
8. Failure produces visible/programmatic failure status and the form retains values where the runtime permits.
9. No remote fetch is part of the flow.

Supports: REQ-FR-006 through REQ-FR-010, SPEC-INT-004, SPEC-INT-005, SPEC-DATA-001, SPEC-VAL-001 through SPEC-VAL-003.

### 11.4 Countdown

1. Page reads the shared current-release launch target.
2. Countdown renders days, hours, minutes, and seconds.
3. A small client controller updates visible values once per second while the target is in the future.
4. Visual ticks are not placed in a live region that announces every second.
5. Home and Sign Up use the same target definition.
6. The target-reached terminal behavior remains an explicit open question.

Supports: REQ-FR-011, SPEC-BEH-004, SPEC-ACC-005.

## 12. State and Data Ownership

### Persistent state

IndexedDB is the only current-release product persistence boundary.

Stored product values:

- Name;
- Email Address;
- Plan;
- Phone Number;
- Company.

No remote synchronization is required or permitted for current-release sign-up submission.

### URL state

The selected plan may cross the Home → Sign Up route boundary through the plan query parameter. It is transient navigation context, not persisted sign-up data.

The URL must never carry Name, Email Address, Phone Number, or Company.

### Transient browser state

Route-local transient state includes:

- current form values;
- current field validity/feedback;
- current persistence status;
- currently selected plan before submission;
- current countdown display values.

This state should remain local to the responsible page/component/controller. No application-wide client store is justified.

### Authoritative shared configuration

The plan domain and launch target are shared application configuration. Pages consume these definitions rather than maintaining copies.

### Consistency

- Persistence is attempted only after the current form state passes validation.
- A failed write does not mutate the UI into success.
- A plan value written to IndexedDB must belong to the same shared approved plan domain used by navigation and the select.

## 13. Frontend Architecture

### 13.1 Routing and navigation

Use Astro file-based routes for:

- Home at the root route;
- Sign Up at a dedicated sign-up route.

Use native anchor navigation for Home CTAs and the Sign Up brand-return action. A client-side router is not required.

Plan-specific navigation uses explicit URL state. Generic/direct Sign Up entry defaults to Basic.

### 13.2 Rendering strategy

Use Astro static rendering for page structure and content. Add client JavaScript only for:

- plan-context initialization;
- countdown updates;
- form validation orchestration;
- IndexedDB persistence;
- dynamic success/failure status.

The site does not require hydration of a React/Vue/Svelte application.

### 13.3 Progressive enhancement and network safety

The no-remote-submission constraint applies even when JavaScript fails.

The Sign Up markup must not have a fallback action that serializes submitted personal data into the page URL or sends it to a server. Implementation should keep the submission path network-inert until the local form controller is installed. The exact HTML/JavaScript technique is a planning detail, but accidental GET or POST submission to the hosting origin is prohibited.

This protects REQ-CON-003 structurally rather than relying only on the success path.

### 13.4 Responsive layout

- Use CSS Grid/Flexbox and intrinsic/content-fit layout.
- Treat 375px, 768px, and supplied desktop frames as evidence conditions, not mandatory breakpoint values.
- Use media/container conditions when the current composition can no longer preserve readable widths and usable controls.
- Do not use browser-width JavaScript to choose content order.
- Keep DOM reading order stable while CSS changes visual arrangement.
- Principal large-screen content remains bounded rather than stretching indefinitely.

### 13.5 Styling and design-system integration

Use shared CSS custom properties for reusable Figma-derived visual roles such as:

- color;
- typography;
- spacing;
- radius;
- elevation/focus treatment where reusable.

Use component/layout-scoped styles for local composition.

The architecture favors semantic tokens/roles over copying raw values into every component. Exact token names and file layout belong in PLAN.md after inspection of the approved Figma foundations.

## 14. Backend, API, and Integration Architecture

### Current release

No application backend is required.

There is:

- no sign-up API;
- no launch-date API;
- no authentication service;
- no remote persistence;
- no webhook/background processing requirement.

Browser APIs are the only behavioral integrations:

- URL/SearchParams;
- form constraint validation;
- timers;
- IndexedDB.

### Future boundary

A future sign-up API should replace the persistence adapter's implementation boundary rather than requiring the form presentation to be redesigned.

A future launch-date API should replace the shared launch-target source while preserving the Countdown presentation/controller contract.

These are extension points, not current-release requirements.

## 15. Persistence Architecture

### Current persistence

Use IndexedDB for browser-local sign-up records.

The persistence module owns:

- database initialization;
- schema/store versioning;
- write transaction completion;
- storage errors.

The UI owns:

- field values;
- validation presentation;
- status presentation.

### Record contract

A successful current-release record contains the five required product values. Implementation metadata may be added only when it does not change product-required values or imply a new product policy.

### Failure semantics

- Opening or writing IndexedDB can fail.
- A failed transaction returns failure to the form controller.
- Failure must not be translated into success.
- Form data stays in the current controls where technically possible.
- No hidden remote fallback is allowed.

### Unresolved policy

Retention, user deletion, export, encryption-at-rest within browser storage, and cross-device synchronization are not defined by active sources. The architecture does not invent them.

## 16. Authentication and Authorization

Authentication and authorization are not applicable to the current release.

There are no authenticated users, protected routes, roles, server sessions, or authorization checks.

If a future remote sign-up/admin system is introduced, its identity and authorization architecture requires a new approved decision rather than being inferred from this static release.

## 17. Accessibility Architecture

Accessibility responsibilities are distributed structurally.

### Semantic controls

- Navigation actions use native links.
- Form inputs use native input/select/button semantics.
- The Plan control remains a native select.
- No custom widget is introduced where native behavior satisfies the specification.

### Reading and focus order

DOM order follows the logical content order defined in DESIGN.md and SPEC.md. Desktop side-by-side placement must not require DOM reordering that produces an illogical keyboard sequence.

### Labels and validation

Every form control exposes a programmatically determinable label independent of placeholder-like visual styling.

When invalid:

- the control exposes invalid state programmatically as appropriate;
- its field-specific message is programmatically associated with it;
- visible focus remains distinguishable from the invalid treatment.

### Persistence status

Success/failure feedback uses a stable non-modal status-announcement mechanism. The status can be discovered by assistive technology without forced focus movement.

### Countdown

The visual countdown changes once per second, but each tick must remain silent to assistive technology. Static or appropriately summarized launch information remains available without turning the ticking numbers into a repeated live announcement.

### Decorative assets

Decorative orbit artwork stays outside the accessibility tree. The product illustration should not duplicate surrounding content; if implementation treats it as informative, an appropriate alternative must be supplied.

## 18. Error Handling and Reliability

Error categories relevant to this release are intentionally small:

1. **Validation error** — owned by the form/validation boundary; prevents persistence.
2. **IndexedDB capability/open/write failure** — owned by persistence and translated to contextual form failure status.
3. **Client initialization failure** — must not create a remote form submission fallback or false success.
4. **Unsupported plan query value** — constrained at the route boundary and falls back to the approved default rather than creating invalid product state.

Reliability rules:

- no persistence call occurs for invalid form state;
- no failure is displayed as success;
- entered values survive storage failure where the browser/runtime permits;
- no automatic retry loop is required;
- the normal submit action remains available for a later retry;
- duplicate/in-flight submission policy is not invented because active sources do not require it;
- countdown terminal-state behavior remains unresolved rather than silently chosen.

## 19. Security and Privacy

### Confirmed boundary

Current-release sign-up data stays in browser IndexedDB and is not sent to a remote sign-up service.

### Structural controls

- No URL may include Name, Email Address, Phone Number, or Company.
- No client code should log submitted personal values as diagnostics.
- No application secret is required for current browser-local behavior.
- No remote sign-up endpoint is configured.
- Validation protects data quality but is not described as a security boundary.
- The Plan query parameter is untrusted URL input and must be constrained to the approved plan domain before use.

### Open privacy policy

Active sources do not define:

- retention duration;
- deletion UX;
- encryption policy;
- consent policy;
- export policy.

These remain visible risks. Stage 6 does not fabricate policy.

## 20. Build, Deployment, Runtime, and Observability

### Build

The application remains within frontend/ and uses the existing Astro/pnpm/TypeScript baseline.

Current repository build entry:

- pnpm build → astro build.

No server adapter or serverless function is required by the target architecture.

### Deployment

The target remains a statically deployable Astro site on the existing Vercel project.

Supplemental current platform evidence shows:

- the Vercel project exists;
- a production deployment is READY;
- project Node runtime setting is 24.x, compatible with the repository minimum Node >=22.12.0.

The exact Vercel root-directory/build-output configuration was not established by the active workflow snapshots and must be verified during planning/deployment work rather than assumed here.

### Runtime

Required runtime capabilities are standard browser features:

- URL parsing;
- native form controls/constraint validation;
- timers;
- IndexedDB.

A formal supported-browser/device matrix is not defined yet.

### Observability

No application analytics, tracing, or remote logging requirement exists.

Deployment/build diagnostics may use Vercel platform logs. Submitted sign-up values must not be intentionally included in diagnostic logs.

## 21. Testing Architecture

### Current state

The pinned repository has no product test runner or test suite. The existing package scripts expose dev, build, preview, and Astro commands.

### Target responsibilities

Planning must provide validation at the appropriate boundaries.

#### Static/build validation

Verify:

- Astro build succeeds;
- TypeScript/Astro diagnostics relevant to the selected implementation pass;
- both routes generate successfully;
- runtime asset references resolve.

#### Interaction/browser validation

Verify:

- every Home CTA reaches Sign Up;
- Basic/Pro/Ultimate plan context is preserved;
- generic/direct entry defaults Basic;
- native Plan select remains keyboard operable;
- required/email validation prevents persistence;
- successful IndexedDB write produces success feedback;
- failed/unavailable IndexedDB produces failure feedback and retains values where possible;
- no sign-up network request occurs.

#### Accessibility validation

Verify:

- native semantic roles and logical order;
- keyboard completion;
- visible focus;
- accessible labels;
- field/error relationships;
- status announcement behavior;
- countdown does not announce every tick;
- representative reflow/responsive widths remain usable.

#### Visual validation

Compare Home and Sign Up against the supplied compact, medium, and large Figma references and inspect representative intermediate widths.

The exact automated browser/test library is a PLAN.md decision. Stage 6 does not introduce a dependency merely to name a testing tool.

## 22. Architectural Decisions

### ADR-001 — Architecture is required for this release

- **Status:** Proposed pending canonical Stage 6 decision recording and human gate approval.
- **Context:** Two routes, shared route state, IndexedDB, client timing, accessibility behavior, and deployment concerns cross individual component boundaries.
- **Decision:** Maintain a separate architecture contract for the Full profile.
- **Alternatives:** Skip architecture as a simple static page.
- **Why not:** That would leave plan-context, persistence, failure, privacy, and dependency ownership to implementation-time inference.
- **Traceability:** REQ-FR-003 through REQ-FR-011; SPEC-INT-001 through SPEC-INT-005; SPEC-DATA-003.

### ADR-002 — Preserve Astro static delivery and native file-based routing

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Implement Home and Sign Up as Astro page routes with native link navigation.
- **Alternatives:** SPA router; separate applications.
- **Rationale:** The current requirements do not need persistent cross-route application state, server rendering, or client-router behavior.
- **Tradeoff:** Small client scripts initialize after static HTML rather than living in a single app runtime.
- **Traceability:** REQ-CON-002, REQ-FR-003, REQ-FR-012, SPEC-INT-001, SPEC-INT-002.

### ADR-003 — Carry plan context in the Sign Up URL

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Plan-specific Home CTAs carry an allowed plan identifier in the Sign Up query string; generic/direct entry defaults Basic.
- **Alternatives:** global store, sessionStorage, localStorage, duplicated plan routes.
- **Rationale:** URL state is explicit, bookmarkable, route-local, and does not require an application-wide client store.
- **Tradeoff:** Sign Up performs a small client initialization step because static output cannot know the browser URL at build time.
- **Traceability:** REQ-FR-004, REQ-DR-002, SPEC-BEH-003, SPEC-DATA-002.

### ADR-004 — Use small native client controllers instead of adding a UI framework

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Use Astro plus focused client scripts for plan initialization, countdown, validation orchestration, persistence, and status updates.
- **Alternatives:** add React/Vue/Svelte hydration; full SPA.
- **Rationale:** The interactive surface is bounded and native browser APIs already satisfy the required interaction model.
- **Tradeoff:** Shared client behavior requires disciplined module boundaries rather than framework state primitives.
- **Traceability:** REQ-CON-002, REQ-AR-001, SPEC-INT-003 through SPEC-INT-005.

### ADR-005 — Isolate IndexedDB behind a persistence adapter

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Form orchestration depends on a browser persistence interface, not direct IndexedDB calls distributed through UI code.
- **Alternatives:** IndexedDB calls inline in page/form event handlers.
- **Rationale:** Isolation makes errors testable and leaves a future API migration boundary.
- **Tradeoff:** Adds one small abstraction around a simple local store.
- **Traceability:** REQ-FR-008 through REQ-FR-010, REQ-DR-003, SPEC-DATA-003, SPEC-VAL-003.

### ADR-006 — Centralize plans and launch target as shared configuration

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Both pages consume one plan definition and one current launch target.
- **Alternatives:** duplicate values per page/component.
- **Rationale:** Product placeholders remain replaceable and Home/Sign Up cannot silently diverge.
- **Traceability:** REQ-BR-001, REQ-BR-005, REQ-FR-011, SPEC-BEH-004, SPEC-BEH-005.

### ADR-007 — Use shared CSS tokens plus scoped layout/component styles

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Figma foundations map to reusable CSS custom properties/semantic visual roles; page/component CSS owns local composition.
- **Alternatives:** duplicate raw values per component; runtime CSS-in-JS system.
- **Rationale:** The design has reusable foundations and component states, while the existing stack does not require a new styling runtime.
- **Traceability:** DESIGN.md visual system, DES-RWD-001 through DES-RWD-007, REQ-NFR-001, REQ-NFR-002.

### ADR-008 — Keep sign-up and countdown network-free in the current release

- **Status:** Recommended for Stage 6 approval.
- **Decision:** No sign-up fetch, form action, launch-date request, or hidden remote fallback is part of the current release.
- **Alternatives:** placeholder API endpoint; hosting-origin form fallback.
- **Rationale:** Both remote integrations are explicitly excluded and accidental form GET/POST could leak personal data.
- **Tradeoff:** Without JavaScript, sign-up cannot complete local persistence; it must fail safely rather than transmit.
- **Traceability:** REQ-CON-003, REQ-CON-004, REQ-FR-008, SPEC-DATA-003.

### ADR-009 — Accessibility behavior is part of shared interaction contracts

- **Status:** Recommended for Stage 6 approval.
- **Decision:** Native semantics, focus, labels, validation relationships, silent countdown ticks, and status announcements are owned by reusable primitives/controllers rather than post-implementation patches.
- **Rationale:** These behaviors cross pages and component families and are already required by the specification.
- **Traceability:** REQ-AR-001 through REQ-AR-005, SPEC-ACC-001 through SPEC-ACC-006.

### ADR-010 — Keep deployment statically hostable on the existing Vercel project

- **Status:** Recommended for Stage 6 approval.
- **Decision:** The target architecture requires only Astro static output and browser APIs; no Vercel Function/server runtime is introduced.
- **Alternatives:** server-rendered Astro adapter or serverless API.
- **Rationale:** Neither remote persistence nor server-side launch-date behavior is in scope.
- **Tradeoff:** Browser-local sign-up data is device/profile-specific and cannot synchronize.
- **Traceability:** REQ-CON-003, REQ-CON-004, SPEC-DATA-003.

## 23. Constraints, Risks, Assumptions, and Open Questions

### Confirmed constraints

- Implementation stays within frontend/ except minimal repo-wide workflow/deployment integration explicitly required.
- Astro ^7.1.6, ESM, Node >=22.12.0, and pnpm are the existing stack.
- No remote sign-up API.
- No production launch-date service.

### Risks

| ID | Risk | Impact | Architectural response |
|---|---|---|---|
| ARCH-RISK-001 | IndexedDB can be unavailable or fail | User cannot persist sign-up locally | Isolate persistence errors; keep values; announce failure |
| ARCH-RISK-002 | Personal data persists locally without defined retention/deletion policy | Privacy expectations remain unclear | Do not invent policy; keep data local and expose as open question |
| ARCH-RISK-003 | Invalid/tampered plan query state | Inconsistent product state | Constrain against shared plan domain; default safely |
| ARCH-RISK-004 | Placeholder copy or plan content changes length | Responsive regression | Intrinsic CSS layout, wrapping, content-fit transitions |
| ARCH-RISK-005 | No formal browser matrix | IndexedDB/layout behavior may vary | Keep browser APIs standard; make compatibility verification explicit in PLAN/Stage 11 |
| ARCH-RISK-006 | Countdown terminal behavior is undefined | Runtime behavior after target date is ambiguous | Keep terminal policy isolated in countdown boundary and unresolved |
| ARCH-RISK-007 | JavaScript initialization failure on form | Accidental native form navigation could expose PII | Keep form submission network-inert unless local controller handles it |

### Assumptions / bounded interpretations

- The approved Astro stack remains the implementation platform.
- The supplied responsive frames are reference conditions, not exact breakpoint mandates.
- The existing Vercel project remains the deployment target unless a later approved deployment decision changes it.
- A query parameter is an implementation-facing transport for already-approved plan context, not a new product requirement.

### Open questions — non-blocking for architecture approval

- What exact validation, success, and failure copy should be shown?
- What formal browser/device support matrix is required?
- What retention/deletion/encryption policy, if any, applies to IndexedDB records?
- What should the countdown display after the launch target is reached?
- Which automated browser/testing tool should PLAN.md select?
- What exact Vercel root/build settings are currently configured and should be preserved?

No Stage 6 blocking architecture question is identified.

## 24. Source-change Handling

- SRC-DS-001 is time-bound. A material Figma change must be recorded through canonical snapshot verification before implementation proceeds from assumptions based on the earlier design.
- SRC-REPO-001 is immutable. Current branch changes must be compared with the pinned baseline before task execution where workflow policy requires source-integrity verification.
- Workflow control and generated files are never edited manually.
- A future backend, remote API, authentication system, or materially different deployment model requires reopening the owning requirements/specification/architecture decisions rather than being inserted silently during implementation.

## 25. Traceability

| Architecture decision | Requirements | Specification / design |
|---|---|---|
| ADR-002 static Astro + native routes | REQ-FR-003, REQ-FR-012, REQ-CON-002 | SPEC-INT-001, SPEC-INT-002 |
| ADR-003 URL plan context | REQ-FR-004, REQ-DR-002 | SPEC-BEH-003, SPEC-DATA-002, DES-INT-002 |
| ADR-004 small native controllers | REQ-CON-002, REQ-AR-001 | SPEC-INT-003 through SPEC-INT-005 |
| ADR-005 IndexedDB adapter | REQ-FR-008 through REQ-FR-010, REQ-DR-003 | SPEC-DATA-003, SPEC-VAL-003 |
| ADR-006 shared plan/launch config | REQ-FR-004, REQ-FR-011, REQ-BR-001, REQ-BR-005 | SPEC-BEH-003 through SPEC-BEH-005 |
| ADR-007 token + scoped CSS | REQ-NFR-001, REQ-NFR-002 | DES-RWD-001 through DES-RWD-007, SPEC-BEH-006, SPEC-BEH-007 |
| ADR-008 network-free current release | REQ-FR-008, REQ-CON-003, REQ-CON-004 | SPEC-DATA-003, SPEC-BEH-004 |
| ADR-009 accessibility contracts | REQ-AR-001 through REQ-AR-005 | SPEC-ACC-001 through SPEC-ACC-006 |
| ADR-010 static Vercel deployment | REQ-CON-002 through REQ-CON-004 | SPEC-DATA-003 |

Validation ownership:

- PLAN.md must convert these boundaries into repository-specific files/modules, ordering, and commands.
- Task decomposition must reference the relevant ADR/REQ/SPEC identifiers.
- Stage 10 task validation must test each affected boundary.
- Stage 11 must verify implementation behavior, accessibility, responsive fidelity, local persistence, and deployment readiness against the approved sources.

## 26. Architecture Validation

### Pass 1 — Completeness and correctness

Completed 2026-08-27.

- Current architecture was checked against SRC-REPO-001 rather than inferred from the desired design.
- Current, target, and transitional architecture are explicitly separated.
- Route, component, dependency, URL-state, transient-state, persistence, accessibility, error, privacy, build/deployment, and testing boundaries are covered.
- No backend, authentication system, remote database, CMS, client framework, or telemetry system was invented.
- IndexedDB and no-remote-submission behavior preserve the approved current-release boundary.
- Responsive architecture uses content-fit CSS rather than treating Figma viewport widths as literal breakpoints.
- The target remains compatible with the confirmed Astro/TypeScript/pnpm constraints.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

Completed 2026-08-27.

- Architecture decisions were cross-checked against REQUIREMENTS.md, DESIGN.md, SPEC.md, and DOCUMENT-REVIEW.md.
- Recommended technical decisions remain identifiable as Stage 6 decisions and are not presented as observed repository structure.
- Shared plan and countdown configuration directly addresses cross-page consistency without creating new product rules.
- Plan URL state is restricted to the approved domain and does not carry personal data.
- No remote persistence or launch-date integration was introduced.
- Accessibility boundaries preserve native semantics, logical order, focus, validation relationships, non-modal status announcements, and silent countdown ticks.
- Privacy retention/deletion/encryption, final copy, browser matrix, test tooling, exact Vercel settings, and countdown terminal behavior remain visible non-blocking questions.
- All material decisions have requirement/specification/design traceability.
- No implementation sequencing is prescribed beyond stable dependency direction; detailed ordering remains owned by PLAN.md.

## 27. Stage 6 Completion Summary

### Files created or modified

- ARCHITECTURE.md — replaced the generic Stage 6 scaffold with project-specific current, target, and transitional architecture.

### Important findings

- A separate architecture stage is required despite the site's static delivery because route context, client state, IndexedDB persistence, accessibility contracts, and deployment boundaries cross individual component responsibilities.
- The existing Astro starter is intentionally minimal and does not constrain the target beyond the approved Astro/TypeScript/pnpm baseline.
- No backend or client framework is needed for the current release.
- A network-inert form fallback is necessary to preserve the explicit no-remote-submission privacy boundary if client initialization fails.

### Assumptions introduced

- Plan context is carried through an approved-domain query parameter.
- Shared plan and launch-target configuration provide one current-release source inside the application.
- The existing Vercel project remains the intended static hosting target.

These are Stage 6 architectural recommendations pending gate approval, not new product requirements.

### Open questions or blockers

No blocking architecture question is identified.

Non-blocking questions remain documented in Section 23.

### Readiness

The architecture has completed both required review passes and is ready for canonical source verification, workflow preflight, and human Stage 6 approval. Stage 7 must not begin until the Gated Stage 6 decision is explicitly approved and recorded.
