---
artifact: PLAN
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

# Implementation Plan

## 1. Document Information

- Scope: Repository-aware implementation plan for the current-release Officelite Home and Sign Up experience inside frontend/.
- Last updated: 2026-08-27.
- Source baseline: SOURCE-BASELINE.md.
- Repository snapshot: SRC-REPO-001 at commit 602d0e987bacea61f81f4d8f159510e220e97af4.
- Design snapshot: SRC-DS-001, Figma file L7MdLOW8usVUcPwV0cMQ1n, authorized node 4:3.
- Architecture: required and approved at Stage 6.
- Source documents: PROJECT-CONTEXT.md, DESIGN-AUDIT.md, REQUIREMENTS.md, DESIGN.md, SPEC.md, DOCUMENT-REVIEW.md, ARCHITECTURE.md.
- Implementation root: frontend/.
- Deployment target: existing Vercel project officelite-coming-soon-site.

## 2. Objective and Scope

The implementation will replace the current Astro starter with the approved Officelite coming-soon experience while preserving the existing Astro/TypeScript/pnpm application boundary. The target remains a statically generated Astro site with two routes and small native browser controllers for plan initialization, countdown updates, form validation, IndexedDB persistence, and non-modal feedback.

### Included

- Home at / with hero, pricing, countdown, and all approved conversion actions.
- Sign Up at /sign-up/ with intro, countdown, native Plan select, five required fields, validation, IndexedDB persistence, and success/failure feedback.
- Basic, Pro, and Ultimate plan context carried through the Sign Up URL and constrained to the approved domain.
- Basic fallback for generic and direct Sign Up entry.
- Shared current-release plan data, launch target, and replaceable content configuration.
- Figma-derived visual foundations, Kumbh Sans, approved assets, Default/Hover/Focus states, responsive transformations, and long-content resilience.
- Keyboard operation, logical DOM order, visible focus, accessible labels, validation relationships, and programmatic persistence-status announcements.
- Network-inert sign-up behavior: no remote form action or sign-up fetch.
- Browser-local IndexedDB storage and explicit storage-failure handling.
- Automated Astro diagnostics/build checks and Playwright browser tests for critical flows.
- Vercel build/deployment verification against the existing frontend/ project configuration.

### Excluded

- Remote sign-up API or remote database.
- Production launch-date API.
- Authentication, authorization, payments, analytics, CMS, remote logging, or client application framework.
- Retention/deletion/encryption/consent policy that is not defined by approved requirements.
- A bespoke Plan select popup.
- A product rule for the countdown after the target reaches zero.
- Any Figma work outside node 4:3.
- Runtime dependency on docs/starter-code/.

## 3. Current Repository State

### Observed at SRC-REPO-001

- frontend/package.json is Astro 7.1.6-or-compatible via ^7.1.6, ESM, Node >=22.12.0, with scripts for dev, build, preview, and astro.
- frontend/astro.config.mjs is the default static Astro configuration.
- frontend/tsconfig.json extends astro/tsconfigs/strict.
- frontend/src/pages/index.astro renders only the Astro starter Welcome component.
- frontend/src/layouts/Layout.astro is the starter document shell and still uses the title Astro Basics.
- frontend/src/components/Welcome.astro, frontend/src/assets/astro.svg, and frontend/src/assets/background.svg are starter-only content.
- No Sign Up route, product components, product configuration, browser controllers, IndexedDB module, diagnostics dependency, test runner, or product test suite exists.
- frontend/AGENTS.md requires the Astro development server to run in background mode when started and points implementation work to current official Astro guidance.
- docs/starter-code/ contains the product reference HTML and supplied assets, but it is outside the runtime implementation root.

### Observed source assets

Approved source assets available under docs/starter-code/assets/ include:

- shared/logo.svg;
- home/bg-pattern-header.svg;
- home/bg-pattern-pricing.svg;
- home/bg-pattern-footer.svg;
- home/illustration-charts.svg;
- sign-up/bg-pattern-side.svg;
- sign-up/icon-arrow-down.svg;
- favicon-32x32.png.

The supplied sign-up icon-check.svg and icon-cross.svg belong to the starter asset set but are not required by the approved native-select architecture and should not be copied unless an implementation task proves a current approved use.

### Observed Vercel state on 2026-08-27

- Existing project: officelite-coming-soon-site.
- Linked GitHub repository: ferfalcon/officelite-coming-soon-site.
- Project Node setting: 24.x, compatible with the repository minimum.
- Current build logs execute pnpm run build from /vercel/path0/frontend.
- Astro produces static output at /vercel/path0/frontend/dist/.
- Current production deployments are READY.
- Vercel currently resolves pnpm 10.x and reported pnpm 10.28.0 for the inspected build.
- The connected project API reports framework as null; no framework override is required for the current successful build path.

### Current technical debt relevant to this plan

- The application surface is still starter content.
- The product design tokens and asset vocabulary are not represented in frontend/.
- The package has no explicit Astro diagnostics script; astro build transpiles TypeScript but does not itself provide full Astro/TypeScript checking.
- There is no automated interaction regression suite.
- The pnpm version is selected by Vercel rather than explicitly pinned by packageManager.
- Current Vercel deployments run for workflow/documentation commits as well as application changes; changing that deployment policy is not required by the approved product scope and is not part of this plan.

## 4. Technical Approach

### 4.1 Rendering and routing

Use Astro static rendering and file-based routes:

- frontend/src/pages/index.astro → Home.
- frontend/src/pages/sign-up.astro → Sign Up.

Use native anchor navigation. Home plan actions point to /sign-up/?plan=basic, /sign-up/?plan=pro, or /sign-up/?plan=ultimate. Generic actions point to /sign-up/ without plan state. Sign Up validates any URL plan value against the shared domain and falls back to Basic when the value is absent or unsupported.

No client router or application-wide state store is introduced.

### 4.2 Shared product configuration

Create one shared TypeScript module for:

- the Basic / Pro / Ultimate domain and display content;
- stable plan keys used in URLs and persistence;
- the current placeholder launch-date label and launch instant;
- current marketing/form status copy that must stay easy to replace.

Home, Sign Up, Countdown, and persistence consume the same plan domain rather than duplicating values.

Because the approved source provides the placeholder date 31 Dec 2026 but not a time zone, implementation will use a deterministic planning assumption of 2026-12-31T00:00:00Z for countdown arithmetic. This is a Recommended Stage 7 implementation interpretation of placeholder content, not a permanent business rule. A later production launch-date service can replace this one value.

### 4.3 Styling and design-system integration

Create a shared global stylesheet containing:

- Figma-derived color, typography, spacing, radius, shadow, and focus custom properties;
- base box sizing, body defaults, semantic text roles, and focus-visible behavior;
- reusable container and visually-hidden helpers only where they reduce duplication.

Use scoped Astro component/page styles for local composition. Preserve logical DOM order and let CSS Grid/Flexbox alter visual placement.

Use self-hosted Kumbh Sans through @fontsource-variable/kumbh-sans so font files are emitted with the static application rather than fetched from a third-party font service. Import the variable weight CSS once from the shared layout and use the Figma-observed weight range through semantic roles.

### 4.4 Assets

Copy only runtime-used product reference assets from docs/starter-code/ into frontend/src/assets/ with corresponding shared, home, and sign-up groupings. Copy the product favicon into frontend/public/.

The runtime must not reference docs/ paths. Decorative orbit/background assets are excluded from the accessibility tree by presentation role. The dashboard illustration will initially use an empty alternative because approved design intent treats it as illustrative support and the surrounding heading/copy/action carry the required meaning; this remains replaceable if later product authority declares it informative.

### 4.5 Countdown

Use one shared Countdown.astro presentation plus a small TypeScript browser controller.

- Static markup exposes the launch-date label and four value units.
- Client code derives days/hours/minutes/seconds from the shared target and updates visible text once per second while the target is in the future.
- The per-second values are not a live region.
- Both pages consume the same target.
- Tests use a future mocked/controlled target or clock where necessary; no terminal-state product behavior is invented.

### 4.6 Sign Up form and safe progressive enhancement

Render native input, select, and button semantics.

- Name: text input, required.
- Email Address: email input, required.
- Plan: native select, required, Basic/Pro/Ultimate.
- Phone Number: tel input, required.
- Company: text input, required.

Each control has a programmatic label independent of placeholder-like styling. Error messages use stable IDs and are associated to affected controls; invalid state is conveyed with text plus the approved red treatment, while focus remains visible.

To preserve the no-remote-submission boundary if client initialization fails, the static submit control is not capable of native form submission before the local controller is installed. The controller attaches the submit handler first and only then enables native submit behavior. No action URL contains or receives personal values.

### 4.7 Validation and persistence

The Sign Up controller coordinates, in order:

1. plan-context initialization;
2. required-field and email validity checks;
3. field-specific feedback;
4. creation of the five-value record;
5. IndexedDB adapter call;
6. contextual visible/programmatic status update.

Use HTML single-address email constraint semantics, matching SPEC-VAL-002. Do not add whitespace trimming, duplicate-record policy, or disabled/loading product states that are not approved.

Create a dedicated IndexedDB module that owns database open/version/store/write behavior and returns success/failure to the form controller. The module must not render UI, log personal values, or perform network requests. A write failure leaves current control values intact where the runtime permits and allows normal resubmission.

Recommended provisional feedback copy, isolated in shared configuration so product wording can change without altering behavior:

- required field: “This field is required.”
- invalid email: “Enter a valid email address.”
- success: “Thanks. Your sign-up was saved on this device.”
- failure: “We couldn’t save your sign-up on this device. Please try again.”

These strings are Recommended content for the current implementation because upstream sources intentionally leave final wording open; approving Stage 7 approves their use as replaceable current-release copy, not as permanent product language.

### 4.8 Responsive strategy

Do not use Figma frame widths as automatic CSS breakpoints. Implement the large/medium/compact structures defined by DES-RWD-001 through DES-RWD-007 and select actual transition values during implementation by content-fit testing.

For each structural transition, the implementing task must:

1. reproduce the nearest approved supplied compositions;
2. reduce/increase the viewport until current content begins to crowd, overlap, clip, produce unusably narrow controls, or create page-level horizontal scrolling;
3. place the media/container transition before that failure;
4. verify widths on both sides and record the chosen value in the task evidence.

The 375px, 768px, 1440px Home, and 1321px Sign Up frames are required validation evidence points, not breakpoint mandates.

### 4.9 Testing and validation tooling

Use the smallest test tool set that covers the approved behaviors:

- add @astrojs/check and typescript as development dependencies;
- add a check script running astro check;
- keep build as astro build and run check separately before build in validation/CI;
- add @playwright/test as the end-to-end browser test dependency;
- add frontend/playwright.config.ts using the built preview server;
- keep browser behavior tests in frontend/tests/e2e/.

Playwright is selected because current Astro documentation explicitly supports it for end-to-end testing and its browser automation can cover navigation, URL plan state, native form behavior, IndexedDB, keyboard flow, responsive viewport checks, and network assertions without adding a UI framework-specific test layer.

Automated coverage may execute Chromium, Firefox, and WebKit as engineering regression coverage, but this does not create a formal product browser-support matrix. Chromium is the minimum blocking automated project; Firefox and WebKit may remain additional engineering coverage without creating a product support policy.

Because the current connected execution environment has no direct local frontend-command runner, create one minimal repo-wide GitHub Actions workflow as the remote validation transport for frontend diagnostics, build, and E2E checks. It must run application commands from `frontend/`, trigger only for relevant `frontend/**` changes (plus its own workflow definition when needed), and must not alter or couple to the canonical design-workflow command workflow. This is the one required repo-wide integration outside `frontend/`, permitted by `REQ-CON-001`.

## 5. Files and Modules

The paths below are repository-aware proposals. “Existing” means the path exists at SRC-REPO-001; “Proposed” means Stage 7 selects it for implementation.

| Path | Action | Existing or proposed | Responsibility | Repository evidence |
|---|---|---|---|---|
| frontend/package.json | Modify | Existing | Add font, diagnostics, Playwright dependencies and validation scripts; optionally pin effective pnpm version | Existing package manifest |
| frontend/pnpm-lock.yaml | Modify | Existing | Lock newly selected packages | Existing pnpm lock |
| frontend/src/layouts/Layout.astro | Modify | Existing | Product document shell, metadata, font/global-style import | Starter layout |
| frontend/src/pages/index.astro | Modify | Existing | Compose Home route | Starter Home route |
| frontend/src/pages/sign-up.astro | Create | Proposed | Compose Sign Up route | Route absent |
| frontend/src/components/Welcome.astro | Delete | Existing | Remove Astro starter UI | Starter-only component |
| frontend/src/assets/astro.svg | Delete | Existing | Remove starter asset | Starter-only asset |
| frontend/src/assets/background.svg | Delete | Existing | Remove starter asset | Starter-only asset |
| frontend/src/styles/global.css | Create | Proposed | Global tokens, base styles, shared focus/container utilities | No product style layer exists |
| frontend/src/data/product.ts | Create | Proposed | Plans, plan keys, launch target, replaceable current-release copy | ADR-006 requires shared config |
| frontend/src/lib/plan-context.ts | Create | Proposed | Parse/constrain Sign Up plan query and build plan URLs | ADR-003 |
| frontend/src/lib/countdown.ts | Create | Proposed | Countdown arithmetic and ticking controller helpers | ADR-004/006 |
| frontend/src/lib/signup-store.ts | Create | Proposed | IndexedDB database/store/write boundary | ADR-005 |
| frontend/src/scripts/signup-controller.ts | Create | Proposed | Form initialization, validation, persistence orchestration, status updates | ADR-004/005/009 |
| frontend/src/components/BrandLogo.astro | Create | Proposed | Shared brand presentation/link semantics | Repeated Figma logo |
| frontend/src/components/Countdown.astro | Create | Proposed | Shared countdown semantic/presentation structure | Repeated Figma countdown |
| frontend/src/components/HomeHero.astro | Create | Proposed | Home hero content/illustration/action | Figma Home pattern |
| frontend/src/components/PricingPlans.astro | Create | Proposed | Plan list and data-driven card composition | Figma pricing pattern |
| frontend/src/components/PricingCard.astro | Create | Proposed | Reusable plan card visual/CTA variants | Repeated plan cards |
| frontend/src/components/SignUpForm.astro | Create | Proposed | Accessible form markup, field/error/status regions | Figma Sign Up form |
| frontend/src/assets/shared/logo.svg | Create from source asset | Proposed | Runtime brand asset | docs starter shared asset |
| frontend/src/assets/home/bg-pattern-header.svg | Create from source asset | Proposed | Home decorative asset | docs starter Home asset |
| frontend/src/assets/home/bg-pattern-pricing.svg | Create from source asset | Proposed | Pro/pricing decorative asset | docs starter Home asset |
| frontend/src/assets/home/bg-pattern-footer.svg | Create from source asset | Proposed | Home lower background decoration | docs starter Home asset |
| frontend/src/assets/home/illustration-charts.svg | Create from source asset | Proposed | Hero dashboard illustration | docs starter Home asset |
| frontend/src/assets/sign-up/bg-pattern-side.svg | Create from source asset | Proposed | Sign Up decorative background | docs starter Sign Up asset |
| frontend/src/assets/sign-up/icon-arrow-down.svg | Create from source asset | Proposed | Closed native select visual affordance | docs starter Sign Up asset |
| frontend/public/favicon.png | Create from source asset | Proposed | Product favicon | docs starter favicon asset |
| frontend/playwright.config.ts | Create | Proposed | E2E projects, preview server, base URL | No test config exists |
| frontend/tests/e2e/navigation.spec.ts | Create | Proposed | CTA, logo, and plan-context regression coverage | No test suite exists |
| frontend/tests/e2e/signup.spec.ts | Create | Proposed | validation, persistence, failure, network-safety coverage | No test suite exists |
| frontend/tests/e2e/responsive.spec.ts | Create | Proposed | required viewport/reflow assertions and smoke checks | No test suite exists |
| .github/workflows/frontend-validation.yml | Create | Proposed repo-wide integration | Provide the remote frontend check/build/Playwright validation transport for relevant `frontend/**` changes | Only design-workflow command workflow exists at baseline; current connected environment has no local frontend-command runner |

The exact number of Astro components may be reduced during task decomposition if a proposed boundary proves to add no independent responsibility. The plan does not require creating empty wrapper components merely to match this table.

## 6. Plan Items

### PLAN-001 — Establish the product shell, assets, tokens, and validation toolchain

- **Objective:** Convert the starter foundation into an Officelite-ready Astro shell and install the smallest approved build/test dependencies before feature work.
- **Requirement and specification references:** REQ-CON-001, REQ-CON-002, REQ-NFR-001, REQ-AR-002; SPEC-ACC-002, SPEC-ACC-006; ADR-002, ADR-007, ADR-010.
- **Source snapshots:** SRC-REPO-001, SRC-DS-001.
- **File impact:** package.json, pnpm-lock.yaml, Layout.astro, global.css, product assets, starter files, Playwright config, and `.github/workflows/frontend-validation.yml`.
- **Dependencies:** None.
- **Implementation approach:** remove starter-only assets/UI; self-host Kumbh Sans; map Figma foundations to CSS custom properties; establish product metadata/favicon; add @astrojs/check, typescript, @playwright/test; add check and test:e2e scripts; configure Playwright against Astro preview; copy only used product assets into frontend/; add the minimal path-filtered frontend validation workflow required to execute those commands in the current remote-only connected environment.
- **Integrated accessibility, responsive, state, and error work:** base focus-visible token/ring; base typography and fluid container rules; decorative asset treatment; no app-created horizontal overflow from the shell.
- **Validation:** pnpm check; pnpm build; Playwright configuration starts the preview server; / renders without starter content; product font/assets resolve.
- **Risks:** dependency/version drift; font bundle size; accidental changes to design-workflow CI. Mitigation: lockfile update, import only required font axis/subset, keep validation workflow isolated.

### PLAN-002 — Implement shared product configuration, plan-context helpers, and Countdown

- **Objective:** Create one source for approved plans/current launch target and one reusable countdown behavior shared by both routes.
- **Requirement and specification references:** REQ-FR-004, REQ-FR-005, REQ-FR-011, REQ-BR-001, REQ-BR-002, REQ-BR-005, REQ-DR-002, REQ-CON-004; SPEC-BEH-003, SPEC-BEH-004, SPEC-BEH-005, SPEC-DATA-002, SPEC-ACC-005; ADR-003, ADR-006.
- **Source snapshots:** SRC-DS-001, SRC-REPO-001.
- **File impact:** product.ts, plan-context.ts, countdown.ts, Countdown.astro.
- **Dependencies:** PLAN-001.
- **Implementation approach:** define typed plan keys/data; generate plan-aware Sign Up URLs; constrain untrusted query values; centralize the placeholder launch instant; implement days/hours/minutes/seconds rendering and once-per-second updates.
- **Integrated accessibility, responsive, state, and error work:** countdown values remain silent to assistive technology; four units stay in logical order; component supports compact four-column reflow; no terminal behavior invented.
- **Validation:** automated plan-key/fallback behavior through browser navigation tests; timed visible update test; network inspection confirms no launch-date request; Home/Sign Up later consume the same config.
- **Risks:** source gives date but not time zone. Mitigation: approved Stage 7 deterministic UTC placeholder assumption, isolated in one replaceable value.

### PLAN-003 — Build shared brand/action presentation and the complete Home route

- **Objective:** Implement Home with approved hierarchy, plan presentation, navigation behavior, visual states, and responsive transformations.
- **Requirement and specification references:** REQ-FR-001, REQ-FR-003, REQ-BR-001, REQ-NFR-001, REQ-NFR-002, REQ-AR-001, REQ-AR-002; SPEC-BEH-001, SPEC-BEH-005, SPEC-BEH-006, SPEC-INT-001, SPEC-ACC-001, SPEC-ACC-002, SPEC-ACC-006; DES-001, DES-003, DES-004, DES-RWD-001 through DES-RWD-004 and DES-RWD-007.
- **Source snapshots:** SRC-DS-001, SRC-REPO-001.
- **File impact:** index.astro, BrandLogo.astro, HomeHero.astro, PricingPlans.astro, PricingCard.astro, shared/action styles, Home assets.
- **Dependencies:** PLAN-001, PLAN-002.
- **Implementation approach:** compose semantic Home regions in logical order; render pricing from shared plan data; use native links for all CTAs; use plan URLs only on plan-specific actions; use CSS Grid/Flexbox for the large split hero, medium stacked/two-column cards, and compact illustration-first/single-column cards.
- **Integrated accessibility, responsive, state, and error work:** Default/Hover/Focus action styles; visible focus; logical DOM order; decorative backgrounds removed from accessibility tree; dashboard illustration non-essential; long content can wrap/grow; intermediate breakpoints chosen via content-fit testing.
- **Validation:** Playwright verifies each Home CTA and corresponding query state; keyboard activation; supplied 375/768/1440 conditions; representative intermediate/narrow/wide widths; no horizontal page scroll; visual comparison to Figma.
- **Risks:** exact breakpoints are not supplied. Mitigation: record content-fit rationale in implementation task evidence rather than copying frame widths.

### PLAN-004 — Build the Sign Up route and accessible native form shell

- **Objective:** Implement the approved Sign Up hierarchy, direct/generic/plan-specific entry state, native controls, and responsive visual structure before persistence wiring.
- **Requirement and specification references:** REQ-FR-002, REQ-FR-004, REQ-FR-005, REQ-FR-006, REQ-FR-012, REQ-AR-001, REQ-AR-002, REQ-AR-004, REQ-NFR-001, REQ-NFR-002; SPEC-BEH-002, SPEC-BEH-003, SPEC-BEH-007, SPEC-INT-002, SPEC-INT-003, SPEC-ACC-001 through SPEC-ACC-003, SPEC-ACC-006; ADR-002, ADR-003, ADR-008, ADR-009.
- **Source snapshots:** SRC-DS-001, SRC-REPO-001.
- **File impact:** sign-up.astro, SignUpForm.astro, BrandLogo.astro, Sign Up styles/assets, signup-controller.ts initialization boundary.
- **Dependencies:** PLAN-001, PLAN-002.
- **Implementation approach:** compose logo return link, intro/countdown, form; render native required inputs/select; initialize plan from URL; default Basic; keep form network-inert until controller ownership is installed.
- **Integrated accessibility, responsive, state, and error work:** programmatic labels; native select keyboard behavior; focus styles; stable field order; large side-by-side and medium/compact vertical layouts using CSS only; select open menu remains browser-owned; field containers allow validation copy growth.
- **Validation:** direct entry defaults Basic; valid plan query selects matching option; invalid query defaults Basic; logo returns Home; keyboard order follows logical sequence; supplied 375/768/1321 and intermediate widths remain usable; no PII appears in URL.
- **Risks:** custom select styling could accidentally remove native affordances. Mitigation: style the closed select only and preserve native element semantics/options.

### PLAN-005 — Implement validation and accessible field feedback

- **Objective:** Prevent invalid submissions from reaching persistence and make every current validation outcome visible and programmatically associated.
- **Requirement and specification references:** REQ-FR-006, REQ-FR-007, REQ-BR-003, REQ-BR-004, REQ-AR-001, REQ-AR-004, REQ-AR-005; SPEC-INT-004, SPEC-ACC-003, SPEC-VAL-001, SPEC-VAL-002.
- **Source snapshots:** SRC-REPO-001, SRC-DS-001 for visual state language.
- **File impact:** SignUpForm.astro, signup-controller.ts, global/component styles, product.ts feedback strings, signup E2E tests.
- **Dependencies:** PLAN-004.
- **Implementation approach:** on submit, evaluate required constraints and email using native/equivalent HTML single-address validity; display one field-specific message per invalid field; clear/update feedback when corrected; only construct the record when all fields are valid.
- **Integrated accessibility, responsive, state, and error work:** associate messages through stable IDs and appropriate invalid semantics; use red plus text; keep focus ring visible over error state; messages wrap without clipping; do not move focus to a synthetic summary that the spec does not require.
- **Validation:** empty single/multiple fields block the storage boundary; invalid email blocks it; corrected fields recover; keyboard-only submit path works; accessibility inspection confirms labels/message relationships.
- **Risks:** browser-native validation bubbles could conflict with custom contextual feedback. Mitigation: choose one observable orchestration path that preserves native validity semantics while rendering approved field feedback.

### PLAN-006 — Implement IndexedDB persistence and contextual status feedback

- **Objective:** Persist valid records locally, accurately distinguish success/failure, preserve data on failure, and prevent any remote sign-up transmission.
- **Requirement and specification references:** REQ-FR-008, REQ-FR-009, REQ-FR-010, REQ-DR-001 through REQ-DR-003, REQ-AR-003, REQ-CON-003; SPEC-INT-004, SPEC-INT-005, SPEC-ACC-004, SPEC-DATA-001 through SPEC-DATA-003, SPEC-VAL-003; ADR-005, ADR-008, ADR-009.
- **Source snapshots:** SRC-REPO-001.
- **File impact:** signup-store.ts, signup-controller.ts, SignUpForm.astro status region, signup E2E tests.
- **Dependencies:** PLAN-005.
- **Implementation approach:** define a small IndexedDB database/object-store version; persist the five required product values. Add implementation metadata only when a concrete storage need is documented in the task, it does not alter product-required values, and it does not imply a new retention/privacy/product policy; return an application-level success/failure result; render a stable non-modal status region; never clear values solely due to success; leave values available on failure.
- **Integrated accessibility, responsive, state, and error work:** programmatically announced status without focus movement; failure uses red/text; success uses approved blue/neutral language; status wraps/grows; no loading/disabled state invented.
- **Validation:** inspect IndexedDB record; force open/write failure; verify visible/programmatic success or failure as appropriate; verify values survive failure; retry via normal submit; intercept network to prove no sign-up request; disable/fail client initialization and confirm the static form cannot leak data through navigation.
- **Risks:** IndexedDB failure mechanics vary by engine. Mitigation: adapter isolation and deterministic forced-failure test hook/mocking at browser-test boundary without product-only debug UI.

### PLAN-007 — Complete responsive, content, and visual fidelity across both routes

- **Objective:** Resolve implementation-time transition values and close visual/content edge cases without changing approved behavior.
- **Requirement and specification references:** REQ-NFR-001, REQ-NFR-002, REQ-BR-005; SPEC-BEH-005 through SPEC-BEH-007, SPEC-ACC-006; DES-RWD-001 through DES-RWD-007.
- **Source snapshots:** SRC-DS-001, SRC-REPO-001.
- **File impact:** Home/Sign Up component styles and global tokens only where evidence requires adjustment.
- **Dependencies:** PLAN-003 through PLAN-006.
- **Implementation approach:** sweep between compact/medium/large compositions; record actual content-fit transitions; stress reasonable longer marketing, plan, validation, and status copy; test below 375 and above supplied large widths; ensure decorations may clip without affecting required content.
- **Integrated accessibility, responsive, state, and error work:** this item verifies and repairs responsive/a11y/state behavior already implemented by earlier items; it is not the first accessibility/responsive implementation pass.
- **Validation:** Figma side-by-side visual review at supplied frames; automated viewport smoke checks; keyboard/focus retest after responsive changes; no required-content horizontal scroll.
- **Risks:** visual tuning can regress semantics or behavior. Mitigation: preserve DOM structure and rerun interaction suite after CSS changes.

### PLAN-008 — Lock regression coverage and repository validation

- **Objective:** Ensure all approved critical flows and static checks are reproducible before final implementation review.
- **Requirement and specification references:** REQ-FR-001 through REQ-FR-012, REQ-BR-001 through REQ-BR-005, REQ-DR-001 through REQ-DR-003, REQ-AR-001 through REQ-AR-005, REQ-NFR-001 through REQ-NFR-002, REQ-CON-001 through REQ-CON-004; all applicable acceptance criteria AC-001 through AC-110; all Stage 4 specification IDs; Architecture Section 21.
- **Source snapshots:** SRC-DS-001, SRC-REPO-001.
- **File impact:** package scripts, Playwright config/specs, and the frontend validation workflow.
- **Dependencies:** PLAN-003 through PLAN-007.
- **Implementation approach:** complete E2E coverage for navigation, plan state, form validity, IndexedDB success/failure, network safety, keyboard, focus, countdown ticking, representative responsive widths, and critical accessible relationships; ensure check and build are blocking validation commands in the remote frontend-validation workflow; map AC-001 through AC-110 to automated or explicitly manual validation so the final suite does not silently omit Stage 2 acceptance criteria.
- **Integrated accessibility, responsive, state, and error work:** automated tests protect previously implemented behavior; manual screen-reader/status checks and visual comparison remain required where browser assertions are insufficient.
- **Validation:** pnpm check; pnpm build; pnpm test:e2e; manual keyboard-only flow; manual assistive-status check; Figma visual review.
- **Risks:** test suite may imply unsupported browser policy. Mitigation: label engines as engineering regression coverage and keep product support matrix open.

### PLAN-009 — Verify static deployment and production readiness

- **Objective:** Confirm the implemented application deploys through the existing Vercel path without adding server behavior or changing the product data boundary.
- **Requirement and specification references:** REQ-CON-002 through REQ-CON-004, REQ-FR-008, SPEC-DATA-003, ADR-008, ADR-010.
- **Source snapshots:** SRC-REPO-001 plus current Vercel project evidence.
- **File impact:** no Vercel configuration file is planned unless implementation discovers a concrete mismatch; deployment integration changes require explicit evidence.
- **Dependencies:** PLAN-008.
- **Implementation approach:** preserve frontend/ build root, pnpm run build, static dist output, and Node 24.x-compatible package constraints; inspect deployment logs; verify both routes and critical client behavior on the deployed URL.
- **Integrated accessibility, responsive, state, and error work:** production smoke test includes keyboard navigation, Sign Up local persistence, no remote sign-up traffic, and supplied responsive conditions at representative device emulation.
- **Validation:** Vercel deployment READY; build log runs in frontend/ and emits static output; production / and /sign-up/ return successfully; production flow behaves like local validation; no serverless API is introduced.
- **Risks:** Vercel currently auto-deploys non-frontend workflow commits. Mitigation: treat that as existing platform behavior and do not expand Stage 7 scope to deployment-trigger policy.

## 7. Recommended Phase Shape

### Phase 1 — Foundation and shared contracts

- PLAN-001 product shell/tooling/tokens/assets.
- PLAN-002 shared data, plan context, and countdown.

**Phase completion:** starter UI is gone; product shell builds/checks; shared plan/launch contracts and countdown are verifiable.

### Phase 2 — Home conversion experience

- PLAN-003 complete Home implementation.

**Phase completion:** Home matches approved hierarchy/states across evidence widths and all CTAs enter Sign Up with correct plan context.

### Phase 3 — Sign Up interaction and local persistence

- PLAN-004 Sign Up route/form shell.
- PLAN-005 validation.
- PLAN-006 IndexedDB/status behavior.

**Phase completion:** direct/generic/plan-specific entry, native selection, validation, local persistence, success/failure, keyboard and network-safety behavior are complete.

### Phase 4 — Fidelity, regression protection, and deployment verification

- PLAN-007 responsive/content/visual hardening.
- PLAN-008 regression suite and full local validation.
- PLAN-009 Vercel production verification.

**Phase completion:** all planned automated/manual checks pass and deployed static behavior is ready for Stage 11 acceptance.

## 8. Responsive Decision Process

For each Home and Sign Up structural transition:

1. Start from the nearest approved Figma composition in SRC-DS-001.
2. Keep DOM/read order stable.
3. Resize until the current structure approaches a defined failure: overlap, clipping, excessively narrow required controls, unreadable content width, or application-created horizontal page scrolling.
4. Inspect whether an existing selected transition already solves that failure.
5. Choose the narrowest justified media/container threshold before the failure.
6. Validate immediately above/below that threshold and at the 375px, 768px, and supplied large reference widths.
7. Record the final implemented transition and rationale in the task evidence and later IMPLEMENTATION-REVIEW.md.

No plan item may justify a breakpoint only because it is a common device width.

## 9. Dependencies and Ordering

| Plan item | Depends on | May run in parallel | Reason |
|---|---|---|---|
| PLAN-001 | None | No | Establishes shell, assets, styles, dependencies, test surface |
| PLAN-002 | PLAN-001 | No | Shared config/controllers used by both routes |
| PLAN-003 | PLAN-001, PLAN-002 | Yes with later Sign Up shell only after shared contracts stabilize | Home consumes shared plan/countdown contracts |
| PLAN-004 | PLAN-001, PLAN-002 | Yes with PLAN-003 | Sign Up consumes same shared contracts but does not depend on Home markup |
| PLAN-005 | PLAN-004 | No | Validation depends on form markup/controller boundary |
| PLAN-006 | PLAN-005 | No | Persistence must only receive valid form state |
| PLAN-007 | PLAN-003 through PLAN-006 | No | Cross-route fidelity sweep requires complete behavior |
| PLAN-008 | PLAN-003 through PLAN-007 | Partly | Individual tests are added earlier; this item closes total regression coverage |
| PLAN-009 | PLAN-008 | No | Production verification follows passing implementation validation |

## 10. Architecture Handling

- Separate ARCHITECTURE.md: Required.
- Canonical Stage 6 decision: Required and human-approved.
- This plan implements ADR-002 through ADR-010 without reopening architecture.
- A later discovery that requires a backend, client router/framework, remote persistence, different routing model, or server runtime is material architecture drift and must reopen Stage 6 before implementation expands scope.

## 11. Migration, Compatibility, Deployment, and Rollback

### Migration

There is no user-data/server migration. The application transitions from an Astro starter to the product implementation in place.

Runtime assets currently under docs/starter-code/ are copied into frontend/ and the app never depends on docs/ after implementation.

### Compatibility

- Repository minimum Node remains >=22.12.0.
- Current Vercel project uses Node 24.x.
- Current Vercel build resolves pnpm 10.28.0; PLAN-001 should add packageManager: pnpm@10.28.0 unless repository/tooling evidence at execution shows a newer approved pin is already present. This removes current pnpm resolver ambiguity without changing the lockfile format intentionally.
- No formal browser support matrix is claimed.
- Playwright multi-engine runs are regression evidence, not a product support policy.

### Deployment

Preserve the existing successful Vercel pattern:

- project build root: frontend/ as evidenced by current build working directory;
- install: Vercel-managed pnpm install;
- build: pnpm run build;
- output: Astro static frontend/dist/;
- Node: 24.x project setting.

No Astro server adapter, Vercel Function, sign-up endpoint, or runtime environment secret is required.

### Rollback

- App code changes remain ordinary Git commits and can be reverted to the previous passing commit.
- IndexedDB records are browser-local and are not migrated or deleted by deployment rollback.
- If a deployed application change regresses behavior, use the last READY Vercel deployment/commit as rollback evidence while repairing the branch.
- Do not delete local IndexedDB records as an automated rollback action because no retention/deletion policy exists.

## 12. Source-change Handling

### Verification required before implementation

- Reverify SRC-DS-001 against the configured Figma node for material structural/design changes.
- Reverify SRC-REPO-001 against current implementation-root changes. Documentation/workflow-only commits do not constitute app-source drift, but any frontend/ change after this plan must be assessed.
- Verify current Vercel build settings again before PLAN-009 if project settings may have changed.

### Material changes that invalidate this plan

- new or changed Figma screens/states/components affecting Home or Sign Up behavior;
- changes to Basic/Pro/Ultimate domain or form fields;
- change from local IndexedDB to remote persistence;
- new authentication or backend requirement;
- change from static Astro routes to a different application architecture;
- changed implementation-root stack or package manager contract;
- defined countdown terminal behavior that changes the current controller contract.

### Earliest stage to revisit

- product outcome/rule change → Stage 2 requirements;
- visual/interaction intent change → Stage 3 design;
- observable behavior change → Stage 4 specification;
- architecture boundary change → Stage 6 architecture;
- repository-only implementation detail change that preserves upstream contracts → Stage 7 plan.

## 13. Risks and Open Questions

| Risk or question | Impact | Blocking | Mitigation or owner |
|---|---|---|---|
| Exact final validation/success/failure copy was not supplied upstream | Layout/content may change | No | Stage 7 proposes replaceable current-release copy in product.ts; later product authority may replace it |
| Placeholder launch date has no time zone | Countdown instant would otherwise vary by interpretation | No after Stage 7 approval | Use deterministic 2026-12-31T00:00:00Z placeholder in one shared config value |
| Countdown terminal behavior is undefined | Behavior after target date remains unspecified | No for current pre-target release | Do not invent terminal product state; reopen SPEC before target if needed |
| Browser/device support matrix is undefined | Cannot claim formal compatibility | No | Run broad engineering regression checks without claiming support policy |
| IndexedDB retention/deletion/encryption policy is undefined | Local-data lifecycle expectations remain open | No | Do not invent policy; keep records local and avoid destructive behavior |
| IndexedDB can fail/unavailable | Sign-up persistence can fail | No | Dedicated adapter, visible/programmatic failure, values retained, forced-failure test |
| Static form can leak PII if default submission becomes active before controller | Privacy boundary violation | No if implementation follows plan | Network-inert initial submit control; attach handler before enabling submit semantics |
| Native select appearance varies by platform | Minor visual variation | No | Preserve native control; style closed state only |
| Breakpoints are not prescribed | Visual divergence between supplied widths | No | Content-fit transition process with recorded values and responsive sweeps |
| Vercel uses inferred pnpm version today | Reproducibility risk | No | Pin effective pnpm version in packageManager during foundation task |
| Product illustration alt intent is not explicitly confirmed | Accessibility wording uncertainty | No | Treat as decorative/illustrative initially because surrounding content carries the meaning; reopen if product authority says informative |
| Added CI outside frontend/ expands edit boundary slightly | Repo-wide integration risk | No | Limit to one validation workflow and do not modify the canonical design-workflow caller |

No Stage 7 blocking technical decision is identified.

## 14. Definition of Done

The implementation plan is complete and implementation-ready when:

- [x] Every Must requirement and material specification is covered by at least one PLAN item.
- [x] Every PLAN item has concrete file/module impact, dependencies, implementation approach, validation, and risks.
- [x] Existing and proposed paths are explicitly distinguished.
- [x] Accessibility, responsiveness, validation, persistence states, and error handling are integrated into the items that create those behaviors.
- [x] Automated and manual validation surfaces are selected.
- [x] The Astro/TypeScript/pnpm stack and current Vercel build path are grounded in repository/platform evidence.
- [x] No backend, remote sign-up API, client framework, or unsupported product feature is added.
- [x] Migration, compatibility, deployment, rollback, privacy boundaries, and source-change handling are addressed.
- [x] Remaining uncertainty is visible and non-blocking.
- [x] Snapshot IDs exist and SRC-REPO-001 remains the implementation baseline pending canonical Stage 7 re-verification.

## 15. Review

### Pass 1 — Feasibility and completeness

Completed 2026-08-27.

- [x] The plan was built from the pinned implementation commit rather than inferred desired structure.
- [x] Existing Astro starter files, package scripts, Node constraint, assets, absence of tests, and nested frontend/ instructions were inspected.
- [x] Current Vercel deployment/build evidence was inspected before naming build root, command, output, Node, or pnpm behavior.
- [x] Each phase produces a coherent and verifiable outcome.
- [x] Validation/persistence dependencies are ordered so invalid data cannot bypass validation.
- [x] Responsive and accessibility work begins in the owning feature tasks, not in a final cleanup phase.
- [x] Proposed component/module boundaries are small and can be reduced during task decomposition when no independent responsibility exists.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

Completed 2026-08-27.

- [x] PLAN-001 through PLAN-009 use stable canonical PLAN identifiers.
- [x] Material work maps to approved REQ, SPEC, DES, and ADR references.
- [x] The live configured Figma scope was structurally re-inspected during Stage 7 and still contains the expected design-system, Home, and Sign Up structures.
- [x] No current app-code change was silently substituted for SRC-REPO-001.
- [x] Plan-specific URL state is restricted to the approved plan domain; personal values never belong in URLs.
- [x] Native select semantics and no-remote-submission boundaries are preserved.
- [x] Current open product/policy questions remain visible; only explicitly labeled Stage 7 implementation recommendations are proposed for placeholder time/copy.
- [x] Test tooling is grounded in current Astro/Playwright documentation and does not imply a new UI framework.
- [x] Architecture remains required and is not bypassed or redefined.

## 16. Stage 7 Completion Summary

### Files created or modified

- PLAN.md — replaced the Stage 7 scaffold with the repository-aware implementation plan.

### Important findings

- The product can be implemented without a client UI framework, backend, server adapter, or client router.
- The existing Vercel configuration already builds the nested frontend/ Astro app successfully as static output.
- The repository has no product test harness, so Playwright plus Astro diagnostics is the smallest appropriate regression surface.
- The starter reference assets are sufficient for the major supplied brand/illustration/background needs; runtime copies must live inside frontend/.
- A network-inert pre-initialization form state is necessary to protect the explicit no-remote-submission boundary.
- Two source gaps require bounded Stage 7 recommendations rather than silent guesses: the placeholder date time zone and exact feedback copy.

### Assumptions introduced

- Placeholder launch instant: 2026-12-31T00:00:00Z.
- Replaceable current-release feedback strings listed in Section 4.7.
- Product dashboard illustration is initially treated as decorative/illustrative, not essential semantic content.
- packageManager should pin the currently effective Vercel pnpm 10.28.0 unless execution finds an already-approved repository pin.

All are implementation recommendations for this release, not permanent product requirements.

### Open questions or blockers

No Stage 7 blocker is identified.

The browser support matrix, IndexedDB data lifecycle policy, and countdown terminal behavior remain upstream product/policy questions and are intentionally not invented by this plan.

### Readiness

The plan has completed both required review passes. It is ready for canonical SRC-REPO-001 and SRC-DS-001 Stage 7 verification, ART-PLAN review, Stage 7 preflight, and Gated human approval. Task decomposition must not begin until the Stage 7 gate is explicitly approved and recorded.
