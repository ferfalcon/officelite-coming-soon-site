# Officelite Coming Soon Site — Implementation Plan

## 1. Document information

- **Status:** Draft — Stage 7 complete
- **Version:** 0.1
- **Last updated:** 2026-08-02
- **Project:** Officelite coming soon site
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Application root:** `frontend/`
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Workflow stage:** Stage 7 — create the implementation plan
- **Primary sources:** `FIGMA-AUDIT.md`, `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, `DOCUMENT-REVIEW.md`, `ARCHITECTURE.md`, the current repository, and `Document-Guidelines-PLAN.md`

## 2. Purpose and authority

This document defines the ordered implementation approach for replacing the current Astro starter with the Officelite Home and Sign Up experience.

It translates confirmed requirements, design intent, testable specifications, and architectural decisions into small implementation units with explicit:

- file impact;
- dependencies;
- validation evidence;
- decision gates;
- migration and deployment work;
- risks and completion criteria.

`PLAN.md` does not redefine product behavior. When this plan and an upstream source conflict, the owning upstream document remains authoritative:

- product outcomes and policy → `REQUIREMENTS.md`;
- visual and interaction intent → `DESIGN.md`;
- observable behavior → `SPEC.md`;
- structural technical decisions → `ARCHITECTURE.md`.

### Evidence classification

- **Confirmed:** supported by project documentation or an explicit user decision.
- **Observed:** directly verified in Figma or the repository.
- **Implementation decision:** a concrete planning choice consistent with the architecture.
- **Recommended:** useful work that is not currently a confirmed requirement.
- **Open question / gate:** unresolved behavior that must not be silently implemented as final.

## 3. Source review

The plan is based on the following verified evidence:

| Source | Planning use |
|---|---|
| Figma Home frames `2141:1599`, `2141:1724`, `2141:1813` | Large, medium, and compact Home compositions |
| Figma Sign Up frames `2141:1680`, `2141:1896`, `2141:1940` | Large, medium, and compact Sign Up compositions |
| Figma interaction section `2141:2949` and component sets | Default, hover, and focus visual states |
| `FIGMA-AUDIT.md` | Factual design evidence, assets, tokens, inconsistencies, and source limitations |
| `REQUIREMENTS.md` | Confirmed scope, requirements, non-goals, risks, and Definition of Done |
| `DESIGN.md` | Visual hierarchy, responsive intent, component anatomy, and accepted deviations |
| `SPEC.md` | Testable navigation, validation, countdown, persistence, state, accessibility, and edge behavior |
| `DOCUMENT-REVIEW.md` | Resolved contradictions and remaining stakeholder decisions |
| `ARCHITECTURE.md` | Astro MPA, framework-free TypeScript, query-string Plan context, IndexedDB schema, CSS, testing, and deployment boundaries |
| Current repository | Existing files, scripts, dependency baseline, and starter implementation |

## 4. Current implementation state

### 4.1 Confirmed existing application

The executable application is the nested `frontend/` project.

```text
frontend/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

### 4.2 Observed toolchain

- Astro `^7.1.6`
- Node.js `>=22.12.0`
- ESM package configuration
- strict Astro TypeScript configuration
- default static Astro configuration
- pnpm lockfile and local build-script allowlist
- no client UI framework
- no backend or server adapter
- no test runner, browser-test framework, accessibility-test integration, lint script, CI workflow, or checked-in Vercel configuration

### 4.3 Current product gap

The current page still renders the generated Astro `Welcome.astro` experience. The repository has no implemented:

- Officelite Home page;
- Sign Up route;
- runtime Officelite asset ownership;
- responsive pricing or sign-up composition;
- countdown;
- Plan-context navigation;
- form validation;
- IndexedDB persistence;
- success or storage-failure feedback;
- automated product tests.

### 4.4 Reusable repository material

`docs/starter-code/` contains matching Officelite SVG assets and starter HTML. It is reference material, not runtime source.

Reusable assets include:

- `assets/shared/logo.svg`;
- `assets/home/illustration-charts.svg`;
- `assets/home/bg-pattern-header.svg`;
- `assets/home/bg-pattern-footer.svg`;
- `assets/home/bg-pattern-pricing.svg`;
- `assets/sign-up/bg-pattern-side.svg`;
- `assets/sign-up/icon-arrow-down.svg`;
- `assets/favicon-32x32.png`.

`icon-check.svg` and `icon-cross.svg` remain reference-only until feedback iconography is approved.

## 5. Scope

### 5.1 Included

- Replace the generated Astro starter UI.
- Implement static Astro routes for `/` and `/sign-up/`.
- Implement the six supplied responsive compositions and fluid intermediate behavior.
- Migrate matching SVG assets into the runtime application boundary.
- Add shared CSS tokens and component/page styles.
- Implement direct link navigation and validated query-string Plan context.
- Implement a visually updating countdown with a replaceable target source.
- Implement the native Sign Up form and all confirmed validation behavior.
- Implement IndexedDB `officelite` version `1`, object store `signups`, auto-increment `id`, UTC `createdAt`, and transaction-completion success semantics.
- Implement pending-write protection, success feedback, and storage-failure recovery.
- Implement semantic structure, keyboard behavior, visible focus, labels, relationships, announcements, reflow, and decorative-asset handling.
- Add layered static, unit, persistence, browser, responsive, and accessibility validation.
- Verify the static build and Vercel deployment configuration.
- Update repository documentation after implementation.

### 5.2 Excluded

- Backend, serverless function, CRM, email, or remote API submission.
- Future launch-date API integration.
- Countdown zero-state behavior.
- Authentication or user accounts.
- User-facing listing, editing, exporting, or deleting of IndexedDB records.
- Localization.
- Analytics or tracking.
- Custom scripted select popup.
- New color values intended to remediate the accepted contrast deviation.
- Unapproved duplicate, retention, deletion, or consent policies.
- Unapproved feedback iconography or final feedback copy.

## 6. Implementation decisions and gates

### 6.1 Planning decisions

| ID | Decision | Status | Rationale |
|---|---|---|---|
| `PD-001` | Keep Astro static output and normal document navigation. | Confirmed by `AD-001`, `AD-010` | Fits two routes and the current repository. |
| `PD-002` | Use framework-free TypeScript and explicit `data-*` DOM hooks. | Implementation decision consistent with `AD-002` | Keeps runtime small and DOM contracts testable. |
| `PD-003` | Store replaceable page, Plan, and launch-label content in one typed `src/content/site.ts` module. | Implementation decision | Prevents structural components from owning placeholder copy and gives the future date source one replacement boundary. |
| `PD-004` | Use global token/base CSS plus page-level CSS and scoped component styles. | Implementation decision consistent with `AD-007` | Avoids one monolithic stylesheet without creating a CSS framework. |
| `PD-005` | Test pure logic with Vitest, IndexedDB modules with a controlled test implementation, and browser behavior with Playwright. | Implementation decision consistent with `AD-009` | Matches responsibility boundaries and avoids a client DOM test framework unless later evidence requires one. |
| `PD-006` | Do not add a lint tool in this scope unless separately approved. | Implementation decision | No lint convention exists; Astro checks, tests, and build provide the confirmed validation baseline. |
| `PD-007` | Do not add runtime dependencies beyond Astro. Testing and static-analysis packages are development-only. | Implementation decision | Preserves the small-project architecture. |
| `PD-008` | Use provisional non-empty validation/success/failure strings from `src/content/site.ts` until final copy is approved; tests assert meaning and relationships, not exact prose. | Implementation decision allowed by `SP-CONTENT-005` | Makes the behavior testable without presenting provisional content as final. |

### 6.2 Decision gates

| Gate | Decision owner | Blocks | Does not block | Required evidence |
|---|---|---|---|---|
| `G-001` — Placeholder launch timestamp and timezone | Product/technical owner | Countdown page integration and final date verification | Pure countdown calculation/controller implementation | Approved ISO timestamp or equivalent unambiguous target |
| `G-002` — Kumbh Sans delivery | Project owner | Final typography and visual sign-off | Layout, semantics, fallback-font implementation | Approved self-hosted font files/source or approved external provider |
| `G-003` — Field-error and form-result visual pattern | Design/product | Final form-state styling and pixel comparison | Semantic error/result slots and programmatic relationships | Approved placement, spacing, colors, and optional icons |
| `G-004` — Post-success behavior | Product | Final success-state controller and E2E assertion | IndexedDB adapter and transaction success implementation | Keep values, clear, disable, or replace decision |
| `G-005` — Sequential duplicate behavior | Product/data | Final repeated-success behavior | Prevention of concurrent writes | Allow, reject, update, or otherwise define sequential duplicates |
| `G-006` — Retention/privacy production disposition | Product/data | Production sign-off with real personal data | Local preview implementation | Approved policy or explicit demo-only restriction |
| `G-007` — Browser support matrix | Product/technical owner | Final compatibility claim and required browser matrix | Standards-based implementation and exploratory testing | Named browsers/versions or support policy |
| `G-008` — Pro/Ultimate supporting Plan text | Design/content | Optional closed-select secondary text | Native selected Plan value | Approved labels/prices or explicit omission |
| `G-009` — Vercel project settings | Deployment owner | Production/preview deployment completion | Local build | Verified root `frontend`, install command, build command, and output directory |
| `G-010` — CI inclusion | Project owner | Only automated repository gating | Local/manual validation | Approve same-scope CI or defer to later infrastructure work |

### 6.3 Gate handling rule

Implementation may proceed around a gate only when the unresolved choice does not change the affected observable behavior. A phase cannot be marked complete when its acceptance evidence depends on an unresolved gate.

## 7. Technical approach

### 7.1 Route composition

- `src/pages/index.astro` becomes the Home route.
- `src/pages/sign-up/index.astro` becomes the Sign Up route.
- `Layout.astro` owns document metadata, favicon links, global CSS imports, and the page slot.
- Home CTAs are anchors. Plan CTAs include `?plan=basic|pro|ultimate`.
- Sign Up logo is an anchor to `/`.

### 7.2 Shared presentational components

Use Astro components for genuine repeated visual structures:

- brand/logo and site header;
- CTA link variants;
- countdown markup;
- pricing card variants;
- Sign Up form markup.

Do not place validation, query parsing, timers, or IndexedDB calls inside presentational components.

### 7.3 Browser feature modules

- Countdown logic is split between a pure calculation module and a DOM initializer.
- Sign Up logic is split into Plan parsing, validation, record mapping, persistence, and one controller.
- The controller owns submission state and accessible DOM updates.
- The IndexedDB module owns database creation/upgrades and resolves only on transaction completion.

### 7.4 Styling

- `tokens.css` maps the documented color, spacing, radius, typography, and breakpoint foundations to CSS custom properties.
- `global.css` provides reset/base semantics, background, type defaults, and shared container behavior.
- `home.css` and `sign-up.css` own page-level composition and responsive transformations.
- Component-specific visual variants remain scoped to their Astro components where practical.
- Use mobile-first media queries at `24rem`, `48rem`, and `80rem`.
- Do not reproduce the hidden copied tablet grid on compact frames.

### 7.5 Content and configuration

`src/content/site.ts` should expose typed values for:

- Home and Sign Up placeholder copy;
- Plan records and lower-case slugs;
- CTA labels;
- countdown labels and display date;
- the approved placeholder target timestamp after `G-001`;
- provisional validation, success, and failure strings.

The module is a build-time/local source, not an API abstraction.

### 7.6 Testing

- Static checks: Astro check and production build.
- Unit tests: Plan parsing, validation, countdown decomposition/formatting, record mapping.
- Persistence tests: database upgrade, object store shape, auto-increment key, transaction completion/failure mapping.
- Browser tests: navigation, form semantics, validation, IndexedDB success/failure, keyboard, responsive layouts, reduced motion, missing decorative assets, zoom/text growth.
- Accessibility: Playwright-compatible automated checks plus manual keyboard and screen-reader-oriented review.
- Visual validation: compare rendered reference widths and state examples with Figma; establish screenshot baselines only after first visual approval.

## 8. Files and modules

### 8.1 Existing files to preserve or modify

| File | Action | Responsibility | Notes |
|---|---|---|---|
| `frontend/package.json` | Modify | Add validation/test scripts and development dependencies | Preserve Astro and Node constraints; do not add a runtime framework. |
| `frontend/pnpm-lock.yaml` | Modify through pnpm | Lock compatible development dependencies | Never hand-edit. |
| `frontend/pnpm-workspace.yaml` | Preserve unless pnpm requires a documented change | Existing build-script allowlist | Reinspect after dependency installation. |
| `frontend/astro.config.mjs` | Verify; change only if required by confirmed static behavior or test tooling | Astro build configuration | No server adapter is planned. |
| `frontend/tsconfig.json` | Verify; modify only if test/config files require explicit inclusion/exclusion | Strict TypeScript configuration | Preserve strict mode. |
| `frontend/src/layouts/Layout.astro` | Replace starter content | Shared document shell, metadata, favicons, global styles | Add title/description props. |
| `frontend/src/pages/index.astro` | Replace starter content | Home route composition | Remove `Welcome` import. |
| `frontend/public/favicon.ico` | Remove or replace | Current Astro starter favicon | Do not leave Astro branding. |
| `frontend/public/favicon.svg` | Remove or replace | Current Astro starter favicon | Use supplied Officelite favicon material. |
| `README.md` | Modify after implementation | Commands, architecture summary, validation, deployment notes | Do not update before commands are real. |

### 8.2 Existing starter files to remove

| File | Action | Validation |
|---|---|---|
| `frontend/src/components/Welcome.astro` | Delete after replacement pages compile | Search confirms no imports. |
| `frontend/src/assets/astro.svg` | Delete | Search confirms no runtime references. |
| `frontend/src/assets/background.svg` | Delete | Search confirms no runtime references. |

### 8.3 Proposed runtime assets

| Proposed file | Source | Responsibility |
|---|---|---|
| `frontend/src/assets/logo.svg` | `docs/starter-code/assets/shared/logo.svg` | Shared brand asset |
| `frontend/src/assets/illustration-charts.svg` | `docs/starter-code/assets/home/illustration-charts.svg` | Decorative hero illustration |
| `frontend/src/assets/bg-pattern-header.svg` | `docs/starter-code/assets/home/bg-pattern-header.svg` | Decorative Home hero orbits |
| `frontend/src/assets/bg-pattern-footer.svg` | `docs/starter-code/assets/home/bg-pattern-footer.svg` | Decorative Home dark-region orbits |
| `frontend/src/assets/bg-pattern-pricing.svg` | `docs/starter-code/assets/home/bg-pattern-pricing.svg` | Decorative featured Plan pattern |
| `frontend/src/assets/bg-pattern-side.svg` | `docs/starter-code/assets/sign-up/bg-pattern-side.svg` | Decorative Sign Up dark-region pattern |
| `frontend/src/assets/icon-arrow-down.svg` | `docs/starter-code/assets/sign-up/icon-arrow-down.svg` | Closed native-select affordance |
| `frontend/public/favicon-32x32.png` | `docs/starter-code/assets/favicon-32x32.png` | Officelite favicon |
| `frontend/src/assets/fonts/*` | Location depends on `G-002` | Optional approved self-hosted Kumbh Sans files |

### 8.4 Proposed source modules

| Proposed file | Responsibility | Primary traceability |
|---|---|---|
| `frontend/src/content/site.ts` | Typed placeholder copy, Plan data/slugs, launch display/config, provisional feedback strings | `CR-001`–`CR-005`, `BR-001`, `FR-009`; `SP-CONTENT-*` |
| `frontend/src/components/BrandLogo.astro` | Render shared logo as static brand or named Home link | `FR-001`, `FR-004`, `FR-010`; `SP-GLOBAL-003`, `SP-SIGNUP-002` |
| `frontend/src/components/SiteHeader.astro` | Shared header placement and logo behavior | `SP-HOME-001`, `SP-SIGNUP-001` |
| `frontend/src/components/CtaLink.astro` | Primary, standard-pricing, and inverse-pricing anchor variants | Figma `10:526`, `10:531`, `10:567`; `SP-NAV-*` |
| `frontend/src/components/Countdown.astro` | Static named countdown group and four labeled values | `FR-009`; `SP-COUNT-*`, `SP-A11Y-011` |
| `frontend/src/components/PricingCard.astro` | Neutral/featured Plan structure and Plan CTA | `FR-001`, `FR-003`; `SP-HOME-002`–`004` |
| `frontend/src/components/SignUpForm.astro` | Native fields/select, labels, field-message hooks, configurable form-result hook, submit button | `FR-004`–`FR-008`, `FR-011`; `SP-FORM-*`, `SP-VAL-*` |
| `frontend/src/features/countdown/countdown.ts` | Pure duration calculation and two-digit formatting | `SP-COUNT-001`–`008` |
| `frontend/src/features/countdown/initCountdown.ts` | Find countdown hooks, update values once per second, catch up from wall clock | `FR-009`; `SP-COUNT-*`, `AR-007` |
| `frontend/src/features/signup/plan.ts` | Supported Plan type, query parsing, Basic fallback | `FR-003`, `FR-012`; `SP-NAV-001`–`004` |
| `frontend/src/features/signup/validation.ts` | Required/whitespace/email/Plan validation result | `FR-006`; `SP-VAL-001`–`008` |
| `frontend/src/features/signup/record.ts` | Map valid form values and inject `createdAt` | `DR-001`, `DR-005`; `SP-DATA-*` |
| `frontend/src/features/signup/indexedDb.ts` | Open/upgrade `officelite`, write to `signups`, transaction-completion contract | `FR-007`, `FR-011`, `AD-005`; `SP-SUBMIT-*`, `SP-DATA-*` |
| `frontend/src/features/signup/initSignUpForm.ts` | Plan initialization, validation rendering, submission state, pending protection, result announcements | `FR-003`, `FR-006`–`FR-008`, `FR-011`, `FR-012`; `SP-SUBMIT-*` |
| `frontend/src/pages/sign-up/index.astro` | Sign Up route composition and feature initialization | `FR-004`, `FR-010`; `SP-SIGNUP-*` |
| `frontend/src/styles/tokens.css` | Figma token mapping and breakpoint variables/documentation | `CON-002`, `CON-007`; `DESIGN.md` §§8–10, 17 |
| `frontend/src/styles/global.css` | Reset, base document styles, global container and accessibility helpers | `SP-GLOBAL-*`, `AR-001`, `AR-008` |
| `frontend/src/styles/home.css` | Home compact/medium/large composition and decorative positioning | `RR-001`–`RR-006`; `SP-RWD-003`–`005` |
| `frontend/src/styles/sign-up.css` | Sign Up compact/medium/large composition and form overlap | `SP-RWD-006`–`008`, `SP-RWD-010` |

### 8.5 Proposed test and quality files

| Proposed file | Responsibility |
|---|---|
| `frontend/vitest.config.ts` | Unit and module-integration test configuration |
| `frontend/playwright.config.ts` | Local web server, browser projects, viewport defaults, reports |
| `frontend/src/features/countdown/countdown.test.ts` | Calculation and formatting tests |
| `frontend/src/features/signup/plan.test.ts` | Query and fallback tests |
| `frontend/src/features/signup/validation.test.ts` | Required, whitespace, email, and Plan validation tests |
| `frontend/src/features/signup/record.test.ts` | Record-shape and timestamp injection tests |
| `frontend/src/features/signup/indexedDb.test.ts` | Schema, transaction, and failure-mapping integration tests |
| `frontend/tests/e2e/navigation.spec.ts` | Generic/Plan links, Basic fallback, logo navigation |
| `frontend/tests/e2e/signup.spec.ts` | Form semantics, invalid/valid submission, IndexedDB outcomes, retry |
| `frontend/tests/e2e/responsive.spec.ts` | Breakpoint, intermediate width, long content, zoom/reflow checks |
| `frontend/tests/e2e/accessibility.spec.ts` | Keyboard, names, relationships, announcements, reduced motion, automated scan |
| `frontend/tests/e2e/helpers/indexeddb.ts` | Read/clear test DB and induce browser-side failure without production flags |
| `.github/workflows/frontend-ci.yml` | Recommended CI, only if `G-010` is approved |

## 9. Phase overview

| Phase | Verifiable result | Depends on |
|---|---|---|
| 0 — Decisions and baseline | Environment and gates are recorded; current starter validates before changes | None |
| 1 — Quality/tooling foundation | Repeatable check, unit-test, build, and browser-test commands exist | Phase 0 technical checks |
| 2 — Runtime foundations | Officelite shell, assets, tokens, and shared primitives render without starter branding | Phase 1 |
| 3 — Home vertical slice | Complete static and responsive Home page with correct links and visual states | Phase 2 |
| 4 — Countdown feature | Tested live countdown runs on Home and is ready for Sign Up | Phase 2; `G-001` for page integration |
| 5 — Sign Up and Plan context | Complete responsive Sign Up page with native Plan initialization and Home navigation | Phases 2–4 |
| 6 — Validation and accessible feedback shell | Invalid submissions are blocked and associated feedback is exposed | Phase 5; partial `G-003` |
| 7 — IndexedDB and result flow | Valid data commits once, pending repeats are blocked, success/failure are handled | Phase 6; `G-004`, `G-005` for final completion |
| 8 — Fidelity, resilience, and accessibility hardening | Six reference layouts and required states survive long content, narrow widths, and keyboard use | Phases 3–7; `G-002`, `G-003`, `G-008` for final visual sign-off |
| 9 — Release validation and deployment | Full validation passes; preview deployment and documentation are complete | All prior phases; `G-006`, `G-007`, `G-009` for production sign-off |

## 10. Phase 0 — Decisions and baseline

### Goal

Create a safe implementation starting point and expose unresolved choices before they become code assumptions.

| Task | Work | References | Files / systems | Dependencies | Validation |
|---|---|---|---|---|---|
| `P0-01` | Run the existing frontend install, build, and preview commands before changing source; record any baseline failure. | Repository baseline; `AD-010` | `frontend/package.json`, lockfile, local environment | None | `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm preview` or equivalent confirmed commands succeed or failures are documented. |
| `P0-02` | Confirm Node and pnpm versions used for implementation are compatible with the checked-in engine and lockfile. Do not invent a `packageManager` version. | `NFR-004`, repository engine | Local environment; optional package metadata update only after confirmation | `P0-01` | Record `node --version` and `pnpm --version`; install completes from lockfile. |
| `P0-03` | Open a decision register for `G-001`–`G-010`; assign owner and latest acceptable decision point. | `DOCUMENT-REVIEW.md` §6; `ARCHITECTURE.md` §27 | `PLAN.md` or task tracking system | None | Every gate has owner, blocking phase, and status. |
| `P0-04` | Verify current Vercel project root/build/output settings or record the exact missing access. | `AD-010`, `G-009` | External Vercel project | Deployment access | Root `frontend`, install command, build command, and `dist` output are confirmed or deployment remains explicitly blocked. |
| `P0-05` | Confirm test package compatibility before installation; choose compatible development-only versions and let pnpm update the lockfile. | `AD-009`; architecture §20.3 | Package registry during implementation; `frontend/package.json` | `P0-02` | Dependency resolution succeeds with Astro `^7.1.6` and Node engine; no runtime framework is added. |

### Phase completion evidence

- Baseline build status is recorded.
- Gate ownership is visible.
- No product behavior has been chosen implicitly.
- Tool versions and deployment access are not guessed.

## 11. Phase 1 — Quality and tooling foundation

### Goal

Create repeatable validation before replacing the starter so each later slice can be checked independently.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P1-01` | Add compatible development dependencies for Astro checking, TypeScript checking support, Vitest, controlled IndexedDB tests, Playwright, and Playwright-compatible accessibility checks. | `AD-009`; `SP-NFR-001` | `frontend/package.json`, `frontend/pnpm-lock.yaml` | `P0-05` | pnpm install succeeds; dependency tree contains no new runtime UI framework. |
| `P1-02` | Add scripts for `check`, unit tests, browser tests, and a combined validation command. Keep existing `dev`, `build`, `preview`, and `astro`. | `NFR-003`, `AD-009` | `frontend/package.json` | `P1-01` | Each script starts successfully; combined command fails when a deliberate test failure is introduced and passes after removal. |
| `P1-03` | Add Vitest configuration and one minimal pure smoke test. | `AD-009` | `frontend/vitest.config.ts`, temporary or first real test file | `P1-01` | `pnpm test` passes. |
| `P1-04` | Add Playwright configuration using the Astro preview/dev server and one route smoke test against the current page. | `AD-009`, `AD-010` | `frontend/playwright.config.ts`, `frontend/tests/e2e/` | `P1-01`, `P0-01` | `pnpm test:e2e` opens `/` and passes in the initial configured browser project. |
| `P1-05` | Add Astro static/template checking without weakening strict TypeScript. | `NFR-004`, `SP-NFR-003` | `frontend/package.json`; `tsconfig.json` only if necessary | `P1-01` | `pnpm check` passes against existing source. |
| `P1-06` | Decide CI inclusion. When approved, add the root workflow after local commands are stable; otherwise record CI as deferred. | Recommended `ARCHITECTURE.md` §21.4; `G-010` | `.github/workflows/frontend-ci.yml` | `P1-02`–`P1-05` | Approved workflow uses lockfile install and runs the same local commands; otherwise no unused workflow is added. |

### Phase completion evidence

- Static checks, unit tests, browser tests, and production build can be run independently.
- The starter still builds, proving later failures are introduced by later work rather than tooling setup.

## 12. Phase 2 — Runtime foundations and shared shell

### Goal

Remove Astro starter branding and establish the shared asset, content, style, and document boundaries without yet building complete pages.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P2-01` | Copy required Officelite SVG and favicon assets byte-for-byte from reference material into the runtime application. Do not use temporary Figma URLs. | `CON-005`, `AD-008`, `SP-NFR-004` | Proposed runtime assets in §8.3 | Phase 1 | Hash/source comparison confirms matching assets; build imports resolve. |
| `P2-02` | Remove Astro starter assets and favicon references after Officelite replacements exist. | Repository cleanup; `AD-008` | `astro.svg`, `background.svg`, current favicons | `P2-01` | Repository search finds no Astro starter asset imports or Astro favicon in rendered HTML. |
| `P2-03` | Create typed content and Plan data with Basic, Pro, Ultimate, placeholder copy, labels, and provisional messages. Leave the exact launch target unset or gated until `G-001`. | `BR-001`, `BR-007`, `CR-001`–`CR-005`; `SP-CONTENT-*` | `frontend/src/content/site.ts` | Phase 1 | Type checks pass; presentation can render all three Plans from data. |
| `P2-04` | Map Figma colors, spacing, radii, typography roles, shadows, and responsive thresholds to CSS custom properties. Preserve accepted contrast values. | `CON-002`, `CON-007`; `DESIGN.md` §§8–10, 17 | `tokens.css` | Phase 1 | Token audit compares values with `FIGMA-AUDIT.md`; no unauthorized replacement colors. |
| `P2-05` | Add global reset/base styles, body backgrounds, container rules, visually hidden utility, and reduced-motion-safe defaults. | `AR-001`, `AR-008`, `AR-010`; `SP-GLOBAL-*` | `global.css` | `P2-04` | Build passes; base page has no default margins or horizontal overflow. |
| `P2-06` | Replace `Layout.astro` with title/description props, language, viewport, Officelite favicon, global CSS, and slot. Resolve font delivery only when `G-002` is approved; use the documented fallback stack meanwhile. | `AD-001`, `G-002`; `SP-GLOBAL-001`, `003` | `Layout.astro` | `P2-01`, `P2-04`, `P2-05` | HTML metadata and favicon are correct; missing approved font does not block build. |
| `P2-07` | Create `BrandLogo.astro`, `SiteHeader.astro`, and `CtaLink.astro` with semantic static/link behavior and Figma variants. | `FR-001`, `FR-002`, `FR-010`; Figma components | Proposed component files | `P2-01`, `P2-04` | Component output has correct link semantics/names and default/hover/focus styles. |
| `P2-08` | Remove `Welcome.astro` only after `index.astro` no longer imports it. | Repository migration | `Welcome.astro`, `index.astro` | At least a temporary Officelite page shell exists | `pnpm check`, `pnpm build`, and import search pass. |

### Phase completion evidence

- `/` renders an Officelite-branded semantic shell.
- Astro starter artwork and copy are absent.
- Shared tokens and assets are application-owned.
- Static checks and build pass.

## 13. Phase 3 — Home vertical slice

### Goal

Deliver the complete Home experience, including responsive composition and correct link destinations, before adding dynamic countdown behavior.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P3-01` | Create `PricingCard.astro` with neutral/featured variants, typed Plan input, feature list, and matching query-string CTA. | `FR-001`, `FR-003`, `SP-HOME-002`–`004`, `AD-003` | `PricingCard.astro`, `site.ts` | Phase 2 | Basic/Pro/Ultimate render in order; links contain correct lower-case Plan slugs. |
| `P3-02` | Create static `Countdown.astro` markup with one named group, four labeled units, light/dark variants, and stable DOM hooks. | `FR-009`, `SP-A11Y-011`, `DESIGN.md` §11.7 | `Countdown.astro` | Phase 2 | Accessibility tree exposes one group and four associated values; no live region on tick values. |
| `P3-03` | Rebuild `index.astro` with semantic header, hero, decorative illustration, generic CTA, pricing, dark launch region, countdown, and final CTA. | `FR-001`, `FR-002`, `SP-HOME-001`, `SP-NAV-001`–`007` | `index.astro`, shared components | `P3-01`, `P3-02` | Content/order matches Home specification; links work by pointer and Enter. |
| `P3-04` | Implement compact Home composition first, including 16 px insets, centered hero, stacked cards, dark-region overlap, and countdown/CTA alignment. | `RR-001`–`RR-005`, `SP-RWD-003`, `009`, `011` | `home.css`, component styles | `P3-03` | Compare at 375 px and below 24rem; no primary-flow horizontal scrolling. |
| `P3-05` | Add medium Home transformation at `48rem`: side-by-side hero, horizontal card anatomy, centered launch region. | `SP-RWD-004`, Figma `2141:1724` | `home.css`, `PricingCard.astro` styles | `P3-04` | Compare at 768 px and immediately around 48rem. |
| `P3-06` | Add large Home transformation at `80rem`: 1110 px maximum region, hero columns, three-card row, left countdown/right CTA. | `SP-RWD-005`, Figma `2141:1599` | `home.css` | `P3-05` | Compare at 1440 px and immediately around 80rem. |
| `P3-07` | Implement CTA default, hover, and component-family focus variants without requiring active/disabled states. | `AR-003`, `RR-006`, `DESIGN.md` §§11.2–11.4, 12.2–12.3 | `CtaLink.astro` styles | `P3-03` | Pointer/keyboard state inspection at all responsive ranges. |
| `P3-08` | Add navigation E2E coverage for both generic links and all three Plan links before Sign Up behavior is implemented; initially assert destination URL. | `SP-NAV-001`–`007` | `navigation.spec.ts` | `P3-03` | Browser test asserts `/sign-up/` and expected query values. |

### Phase completion evidence

- Home matches the compact, medium, and large source compositions.
- All five Home CTAs are real links with correct destinations.
- Pro is featured while generic navigation remains Basic by contract.
- Static checks, Home browser tests, and build pass.

## 14. Phase 4 — Countdown feature

### Goal

Implement a tested countdown boundary that is independent of the page structure and ready for the future API source.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P4-01` | Implement a pure function that derives whole days, remaining hours, minutes, and seconds from `target - now`; keep time injection explicit. | `FR-009`; `SP-COUNT-001`–`005` | `countdown.ts` | Phase 1 | Deterministic unit tests cover ordinary, boundary, and throttling-recovery inputs. |
| `P4-02` | Implement two-digit minimum formatting without truncating values longer than two digits. | `SP-COUNT-006` | `countdown.ts`, tests | `P4-01` | Tests cover `0`, `7`, `14`, and `100+` days. |
| `P4-03` | Implement `initCountdown.ts` to initialize all countdown roots, update immediately, schedule approximately once per second, and recalculate from wall clock. | `SP-COUNT-007`–`009`, `AR-007` | `initCountdown.ts` | `P4-01`, `P4-02` | Fake-clock/module test and browser observation show catch-up after delayed timer. |
| `P4-04` | Confirm `G-001`; add the approved placeholder timestamp to content/config and initialize the Home countdown. | `G-001`, `SP-CONTENT-003` | `site.ts`, `index.astro` | Approved target; `P4-03` | Visible date and calculated values correspond to approved target and update once per second. |
| `P4-05` | Confirm countdown changes do not produce a one-second live announcement and stop or clean up safely when the page is unloaded. | `AR-007`, `SP-A11Y-005` | `initCountdown.ts`, accessibility test | `P4-03` | Accessibility inspection; no continuously updating live region. |

### Phase completion evidence

- Pure countdown tests pass.
- Home updates once per second from an approved unambiguous target.
- Delayed browser timers recalculate correctly.
- Countdown values are not announced every second.

## 15. Phase 5 — Sign Up page and Plan context

### Goal

Deliver the complete Sign Up page structure, responsive layout, native form semantics, and Plan-context initialization before storage work.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P5-01` | Create `SignUpForm.astro` with persistent labels, required native controls, exact supported Plan options, field-message hooks, a configurable form-result hook, and submit button. Do not lock final result placement or styling before `G-003`. | `FR-004`–`FR-006`, `SP-FORM-*`, `SP-SIGNUP-005`–`007` | `SignUpForm.astro` | Phase 2 | Accessibility tree exposes labels, required state, native select, and submit button. |
| `P5-02` | Implement `plan.ts` with supported slugs, query parsing, unsupported/missing fallback to Basic, and mapping to the native select value. | `FR-003`, `FR-012`, `AD-003`; `SP-NAV-003`–`004` | `plan.ts`, `plan.test.ts` | `site.ts` Plan data | Unit tests cover absent, exact valid lower-case, unsupported (including mixed-case), and unrelated parameters; no unapproved repeated-parameter policy is asserted. |
| `P5-03` | Create `/sign-up/` page with linked logo, introduction, countdown, form, decorative side region, and page-level initializer imports. | `FR-004`, `FR-010`, `SP-SIGNUP-001`–`004` | `pages/sign-up/index.astro` | `P5-01`, `P4-03` | Route builds and contains one H1, named logo link, countdown, and all controls. |
| `P5-04` | Initialize Plan from the URL once, then allow the user to change it through native select behavior. | `SP-SIGNUP-003`–`006`, `SP-KEY-004` | `initSignUpForm.ts`, `plan.ts` | `P5-02`, `P5-03` | Direct/generic entry selects Basic; each valid query selects matching option; user change persists. |
| `P5-05` | Implement compact Sign Up layout with 16 px main insets, 24 px form outer insets, 20 px form padding, centered content, four tiles when they fit, and wrapping when required. | `SP-RWD-006`, `011`, Figma `2141:1940` | `sign-up.css` | `P5-03` | Compare at 375 px and narrow/enlarged-text cases. |
| `P5-06` | Implement medium and large Sign Up transformations, including 445 px reference form width and large light/dark split with 1110 px region. | `SP-RWD-007`–`008`, Figma `2141:1896`, `2141:1680` | `sign-up.css` | `P5-05` | Compare at 768 px, 1321 px, and breakpoint boundaries. |
| `P5-07` | Implement text-field and select default, hover, and component-family focus visuals while preserving native control semantics. | `AR-003`, `RR-006`; Figma `10:503`, `10:512` | `SignUpForm.astro` styles, `sign-up.css` | `P5-01` | Keyboard focus is visible and not clipped at all ranges; native select menu still opens normally. |
| `P5-08` | Complete navigation browser tests: generic and direct Basic, Plan-specific values, unsupported fallback, and Sign Up logo Home link. | `FR-002`, `FR-003`, `FR-010`, `FR-012`; `SP-NAV-*` | `navigation.spec.ts` | `P5-04` | All navigation paths pass by pointer and keyboard. |

### Phase completion evidence

- `/sign-up/` matches all three source compositions.
- Plan is a native select with exactly three supported options.
- Direct, generic, valid Plan, and invalid Plan entry behave correctly.
- Logo returns Home.

## 16. Phase 6 — Validation and accessible feedback shell

### Goal

Prevent invalid persistence attempts and expose field-specific feedback without depending on final approved visual treatment.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P6-01` | Implement pure validation for whitespace-only required values, native email syntax result, supported Plan, and no extra phone/company format. | `FR-006`, `SP-VAL-001`–`005` | `validation.ts`, `validation.test.ts` | Phase 5 | Tests cover each field empty, whitespace, malformed email, unsupported Plan, and varied non-empty phone/company values. |
| `P6-02` | Define a validation result shape keyed by form control name so controller and markup do not parse strings. | `NFR-003`, `AD-004` | `validation.ts` | `P6-01` | Type checks and tests prove deterministic field mapping. |
| `P6-03` | Add stable IDs and `aria-describedby`/equivalent relationships between controls and field messages. Toggle `aria-invalid` only for current invalid fields. | `AR-004`, `SP-VAL-006`–`008`, `SP-A11Y-004` | `SignUpForm.astro`, `initSignUpForm.ts` | `P6-01`, `P5-01` | Accessibility tree and browser tests show correct relationships; correcting/resubmitting clears stale state. |
| `P6-04` | Render provisional non-empty field messages from content data. Do not lock final wording or iconography. | `SP-VAL-009`, `SP-CONTENT-005`, `PD-008` | `site.ts`, form controller | `P6-03` | Tests assert message presence, field identity, and non-color indication rather than exact prose. |
| `P6-05` | Ensure invalid submit prevents every persistence call. Use an injected/stubbed persistence function until Phase 7. | `SP-VAL-005`, `FR-007` | `initSignUpForm.ts`, browser/unit tests | `P6-03` | Spy/stub confirms zero calls for all invalid scenarios. |
| `P6-06` | Preserve entered values after validation failure and keep keyboard focus stable. Do not implement first-invalid-field focus unless the recommendation is approved. | `SP-FORM-005`, `SP-KEY-006`, `SP-VAL-010` recommended | Controller/tests | `P6-03` | Values remain; focus does not move unexpectedly; recommendation status is documented. |
| `P6-07` | Apply approved field-error and result-region styling when `G-003` is resolved. If unresolved, retain semantic structural styling and keep final visual task open. | `G-003`, `DESIGN.md` §12.6 | Form/component styles | `P6-03` | Approved design comparison or explicit unresolved gate. |

### Phase completion evidence

- Invalid values never reach persistence.
- Every invalid field has visible, programmatically associated feedback.
- Values remain after invalid submission.
- Final styling remains clearly gated if not approved.

## 17. Phase 7 — IndexedDB persistence and result flow

### Goal

Complete the current browser-only sign-up path with reliable transaction outcomes and recovery.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P7-01` | Define the typed submission input and persisted record; inject `createdAt` as UTC ISO when mapping a valid submission. Do not invent trimming/casing beyond validation. | `DR-001`, `DR-005`, `SP-DATA-*` | `record.ts`, `record.test.ts` | `site.ts`, `plan.ts` | Tests verify five values, Plan slug, timestamp, and no preassigned `id`. |
| `P7-02` | Implement IndexedDB open/upgrade for `officelite` version `1`; create `signups` with key path `id`, auto-increment, and no indexes. | `AD-005`, `DR-005`, `SP-DATA-004` | `indexedDb.ts` | Phase 1 controlled IndexedDB test dependency | Integration test inspects database schema. |
| `P7-03` | Implement one-record `readwrite` transaction and resolve only on transaction `complete`; map open, request, abort, and transaction failures to one stable application failure. | `FR-007`, `FR-011`, `SP-SUBMIT-002`–`009` | `indexedDb.ts`, `indexedDb.test.ts` | `P7-02` | Tests prove request success alone does not resolve and failures reject/map correctly. |
| `P7-04` | Integrate valid submission with record mapping and persistence. Enter `pending`, expose `aria-busy` or equivalent, and suppress concurrent activation without requiring an unapproved disabled visual. | `SP-SUBMIT-001`, pending behavior, `AR-006` | `initSignUpForm.ts` | `P6-05`, `P7-01`, `P7-03` | Repeated activation during a pending transaction starts exactly one write. |
| `P7-05` | On transaction success, remove stale failure, show one visible/politely announced success, and apply the approved `G-004` post-success behavior. | `FR-008`, `SP-A11Y-005`, `SP-FORM-006` | Controller, content/styles | `P7-04`, `G-004` | Real-browser test reads committed record, then verifies approved success and form state. |
| `P7-06` | On storage failure, exit pending, keep entered values, remove stale success, show/announce failure once, and allow retry. | `FR-011`, `SP-EDGE-004`, error table | Controller, `indexedDb.ts` | `P7-04` | Controlled module failure and real-browser induced failure preserve values and allow successful retry. |
| `P7-07` | Apply approved sequential duplicate behavior from `G-005` at the controller/policy boundary without changing version-1 schema unless the approved policy requires a documented architecture change. | `DR-007`, `G-005`, `AD-005` | Controller and possibly architecture/docs | `P7-05` | E2E test verifies approved repeated-success outcome; schema change triggers documentation review. |
| `P7-08` | Verify no form values are transmitted or logged and no third-party runtime scripts can access them through new dependencies. | `BR-005`, `DR-004`, `AD-006`, security architecture | Browser network inspection; source review | `P7-04` | Valid submit produces no form-record network request and no console output containing values. |

### Phase completion evidence

- Valid data creates a version-1 IndexedDB record only after validation.
- Success appears only after transaction completion.
- Concurrent writes are prevented.
- Failure preserves values and supports retry.
- Approved post-success and sequential duplicate behavior are verified.
- No personal form data leaves the browser.

## 18. Phase 8 — Fidelity, resilience, and accessibility hardening

### Goal

Close visual, responsive, keyboard, content-growth, and accessibility gaps across the complete flow.

| Task | Work | References | Files | Dependencies | Validation |
|---|---|---|---|---|---|
| `P8-01` | Resolve `G-002` and implement approved Kumbh Sans delivery with fallbacks, preload only when justified, and no unapproved third-party request. | `DESIGN.md` §8, `G-002`, architecture §15.4 | `Layout.astro`, `tokens.css`, optional font assets | Approval | Network/font inspection and visual comparison. |
| `P8-02` | Resolve `G-008`; either implement approved Plan supporting text or explicitly omit it. Do not simulate a custom popup. | `SP-SIGNUP-006`–`007`, `G-008` | `SignUpForm.astro`, controller/content | Approval | Selection changes display only approved secondary content; native menu remains native. |
| `P8-03` | Run long-content scenarios across hero, Plans, labels, validation, success, and failure; adjust flexible sizing without adding unapproved truncation. | `CR-002`, `SP-CONTENT-002`, `SP-EDGE-001`, `SP-RWD-010` | Page/component CSS | Phases 3–7 | No overlap, clipping, or hidden controls at all ranges. |
| `P8-04` | Test immediately below/at/above 24rem, 48rem, and 80rem plus reference widths and representative intermediate widths. Correct layout interpolation. | `RR-001`–`RR-006`, `SP-RWD-001`–`012` | `home.css`, `sign-up.css` | Complete pages | Browser screenshots and layout assertions show correct compositions and no horizontal scroll. |
| `P8-05` | Verify default, hover, and focus variants on all CTA/control families across light, blue, and dark surfaces. Keep accepted contrast deviation documented. | `AR-003`, `AR-009`, `SP-A11Y-009` | Component styles | Complete pages | Keyboard/pointer state review against Figma interaction frames. |
| `P8-06` | Verify semantic outline, names, labels, required/invalid states, error relationships, result announcements, countdown grouping, decorative hiding, and no keyboard traps. | `AR-001`–`AR-008`, `SP-A11Y-*`, `SP-KEY-*` | Markup/controller/tests | Phases 3–7 | Automated accessibility scan plus manual keyboard/accessibility-tree review. |
| `P8-07` | Verify 200% zoom/text enlargement, reduced motion, unusually narrow widths, countdown wrapping, and focus-ring containment. | `AR-008`, `AR-010`, `SP-EDGE-005` | CSS/tests | `P8-04` | Manual and browser tests preserve all primary functionality. |
| `P8-08` | Block or remove decorative asset requests during browser tests and verify no broken-image announcement or lost meaning. | `SP-EDGE-002`, `AR-005` | E2E tests | Complete pages | Page remains operable and understandable; decorative images are hidden from accessibility tree. |
| `P8-09` | Recommended: disable JavaScript and verify static brand, marketing, pricing, and date-label content remains readable. Do not make this a release blocker unless the recommendation is approved. | `NFR-007`, `SP-EDGE-006` | Browser test/manual check | Static Astro pages | Result recorded as pass or documented recommendation gap. |
| `P8-10` | Perform visual comparison against all six production frames and interaction examples. Fix structural fidelity deviations; document approved native-control/platform variance and accepted contrast risk. | `FIGMA-AUDIT.md`, `DESIGN.md`, `SP-RWD-*` | All UI files | `P8-01`–`P8-08` | Review checklist with screenshots at 375, 768, 1321, and 1440 reference widths. |

### Phase completion evidence

- Complete flow remains usable by keyboard and with enlarged text.
- All six responsive compositions and required states are visually reviewed.
- Long content and feedback grow safely.
- Decorative failures remain nonessential.
- Known contrast deviations remain documented rather than hidden.

## 19. Phase 9 — Release validation, deployment, and documentation

### Goal

Produce reproducible implementation evidence and a verified static deployment without expanding scope.

| Task | Work | References | Files / systems | Dependencies | Validation |
|---|---|---|---|---|---|
| `P9-01` | Run the complete local validation command from a clean install. | Definition of Done; `AD-009`, `AD-010` | `frontend/` | All implementation phases | Frozen lockfile install, check, unit tests, build, and browser tests pass. |
| `P9-02` | Run exploratory browser-engine tests. Final required projects depend on `G-007`; do not claim unsupported browsers. | `NFR-006`, `G-007` | Playwright config/results | `P9-01` | Approved matrix passes or compatibility sign-off remains blocked. |
| `P9-03` | Confirm `G-006` before treating the deployed form as production-ready for real personal data. If unresolved, deploy only as a documented demo/preview or block production form use. | Privacy architecture; `DR-007` | Deployment/content notice as approved | Product/data decision | Release record states real-data disposition clearly. |
| `P9-04` | Verify `G-009`, deploy a preview from `frontend/`, and smoke test both routes, query parameters, static assets, IndexedDB behavior, and direct URL loads. | `AD-010` | Vercel project | Vercel access; `P9-01` | Preview URL passes critical smoke flows; output is static `frontend/dist/`. |
| `P9-05` | If `G-010` is approved, enable CI and verify it runs the same locked commands. If deferred, document the manual validation procedure. | Architecture §21.4 | Workflow or README | Stable local commands | CI pass or explicit deferral. |
| `P9-06` | Update README with actual application root, commands, architecture, local IndexedDB behavior, known contrast deviation, test commands, and deployment instructions. Remove stale starter references. | `NFR-003`, documentation responsibility | `README.md` | Commands proven | README commands execute as written; no unimplemented behavior is claimed. |
| `P9-07` | Update upstream documentation only for actual implementation deviations or approved decisions; preserve IDs and create no duplicate “final” documents. | Workflow shared rules | `REQUIREMENTS.md`, `DESIGN.md`, `SPEC.md`, `ARCHITECTURE.md`, `PLAN.md` as needed | Implementation evidence | Traceability review shows code/tests/tasks map to stable IDs. |
| `P9-08` | Record final validation evidence, accepted deviations, unresolved non-goals, and rollback/recovery notes. | `SP-NFR-001`, risk sections | Release notes or implementation report | `P9-01`–`P9-07` | Reviewer can identify commands run, results, deployment SHA, known risks, and how to revert. |

### Phase completion evidence

- Clean validation passes.
- Preview deployment is verified from the correct nested root.
- Documentation matches the implemented system.
- Production readiness is not claimed while privacy, browser, or deployment gates remain unresolved.

## 20. Dependencies and ordering

### 20.1 Critical path

```text
P0 baseline/gates
  ↓
P1 quality tooling
  ↓
P2 assets/tokens/layout
  ├──→ P3 Home
  ├──→ P4 pure countdown
  └──→ P5 Sign Up shell
              ↓
          P6 validation
              ↓
          P7 IndexedDB/results
              ↓
        P8 complete hardening
              ↓
        P9 release/deployment
```

### 20.2 Parallel work

- `P4-01`–`P4-03` may run in parallel with Home visual work after Phase 1.
- Sign Up static layout may begin after Phase 2 while Home visual refinement continues, but shared component changes must remain coordinated.
- Unit tests should be written with each pure module rather than deferred to Phase 8.
- Browser tests should expand with each completed vertical slice.
- Final visual and content tasks cannot close before their gates are approved.

### 20.3 Ordering constraints

1. Do not delete starter files before an Officelite replacement compiles.
2. Do not implement persistence before validation can block invalid writes.
3. Do not show success before transaction-completion behavior is tested.
4. Do not finalize post-success or duplicate behavior before `G-004` and `G-005`.
5. Do not establish visual screenshot baselines before first visual approval.
6. Do not claim production readiness for personal data before `G-006`.
7. Do not claim browser support before `G-007`.
8. Do not add an IndexedDB uniqueness index or schema change without architecture and product review.

## 21. Testing and validation matrix

| Layer | Scope | Primary command/evidence | Introduced |
|---|---|---|---|
| Static/template | Astro syntax, types, imports, routes | `pnpm check` | Phase 1 |
| Unit | Countdown, Plan parsing, validation, record mapping | `pnpm test` | Phases 1, 4, 5, 6, 7 |
| IndexedDB module integration | Schema, key, transaction completion, failures | Vitest with controlled IndexedDB | Phase 7 |
| Production build | Static route and asset output | `pnpm build` | Every phase |
| Browser navigation | CTAs, query context, logo link | `pnpm test:e2e` | Phases 3 and 5 |
| Browser form flow | Validation, pending, success, failure, retry | Playwright | Phases 6 and 7 |
| Responsive | Reference/boundary/intermediate widths, long content, zoom | Playwright plus screenshots/manual review | Phase 8 |
| Accessibility automated | Common semantic and relationship failures | Playwright-compatible accessibility scan | Phase 8 |
| Accessibility manual | Keyboard order, focus, announcements, native select, reflow | Recorded manual checklist | Phase 8 |
| Visual fidelity | Six Figma frames and interaction examples | Side-by-side screenshot review | Phase 8 |
| Deployment | Direct routes, assets, IndexedDB, no API submission | Preview smoke test | Phase 9 |

### Required test scenarios

At minimum, the completed implementation must cover:

- generic Home CTA → Sign Up → Basic;
- each Plan CTA → matching Plan;
- direct Sign Up → Basic;
- unsupported Plan query → Basic;
- Sign Up logo → Home;
- each required field invalid individually;
- whitespace-only text invalid;
- malformed and ordinary valid email;
- unsupported Plan prevented from storage;
- valid transaction commits expected record;
- success occurs after transaction completion;
- repeated activation during pending creates one write;
- storage unavailable/failure preserves values and permits retry;
- approved post-success and sequential duplicate behavior;
- countdown decomposition, formatting, tick, and catch-up;
- compact, medium, large, and boundary compositions;
- long content and feedback;
- countdown wrapping at narrow/enlarged conditions;
- keyboard-only completion;
- visible focus across surfaces;
- no continuous countdown announcement;
- success/failure announced once;
- decorative assets ignored and nonessential;
- no form-record network request.

## 22. Migration and compatibility work

### 22.1 Starter replacement

- Preserve project configuration and strict TypeScript.
- Replace generated page, component, assets, metadata, and favicons.
- Remove starter files only after no imports remain.
- Avoid adapting starter CSS into product styles; it has no Officelite design value.

### 22.2 Asset ownership

- Copy source-reference SVGs into `frontend/src/assets/`.
- Keep `docs/starter-code/` unchanged as historical/reference material.
- Do not import runtime assets from `docs/`.
- Do not depend on short-lived Figma asset URLs.

### 22.3 IndexedDB schema

- This release creates version `1`; no existing application schema migration is expected.
- Upgrade code must create `signups` only when absent during version upgrade.
- Future schema changes increment the database version and preserve readable records unless an approved migration says otherwise.
- Do not add indexes or deduplication policy in version `1`.

### 22.4 URL compatibility

- `/` remains the Home route.
- `/sign-up/` is new.
- Query parameters are additive and direct-link-safe.
- No SPA fallback or router rewrite is required.
- Preview deployment must verify direct loading of `/sign-up/`.

### 22.5 Deployment compatibility

- Keep Astro static output.
- Verify Vercel uses `frontend/` as project root and `dist/` as output.
- No environment variables are required for the placeholder release.
- Future API configuration requires a new architecture/specification review.

## 23. Risks and mitigations

| Risk | Impact | Likelihood | Mitigation / plan location |
|---|---|---:|---|
| Open feedback visuals produce late form rework | Medium | High | Build flexible semantic slots in Phases 5–6; gate final styling with `G-003`. |
| Post-success/duplicate decisions arrive late | High | High | Isolate controller policy and block Phase 7 completion on `G-004`/`G-005`. |
| Personal data ships without governance | High | Medium | `G-006` blocks production sign-off; preview may be demo-only. |
| Placeholder date is ambiguous | High for countdown correctness | High | `G-001` blocks page integration; pure logic proceeds with injected test dates. |
| Font source is unavailable or unapproved | Medium | Medium | Use fallback during structural work; `G-002` blocks final visual sign-off. |
| Native select differs across platforms | Low/medium | High | Preserve native behavior; validate closed-state intent; document accepted menu variance. |
| Accepted color contrast remains | Medium | Confirmed | Preserve documented deviation and do not claim full WCAG AA. |
| Long content breaks Figma-height assumptions | Medium | Medium | Flexible containers and Phase 8 long-content matrix. |
| Focus rings are clipped by decorative overflow | Medium | Medium | Keep interactive controls outside clipping containers; test every range. |
| IndexedDB request success is mistaken for transaction success | High | Medium | Adapter resolves only on transaction complete; integration tests in Phase 7. |
| IndexedDB unavailable in target browser | High | Unknown | Failure path and retry; `G-007` browser matrix before support claim. |
| Test dependencies conflict with Astro/Node | Medium | Low/unknown | Compatibility verification in Phase 0; pin resolved versions in lockfile. |
| Excess abstractions slow a small project | Medium | Medium | Use only listed genuine repeated components and feature boundaries. |
| Vercel builds repository root instead of frontend | High | Medium | `G-009` and preview deployment verification. |
| CI work expands scope | Low | Medium | Treat CI as `G-010` recommendation; local validation remains required. |
| Visual baselines are approved too early | Medium | Medium | Establish snapshots only after first visual review. |

## 24. Open questions

### Product/data

1. What exact post-success form behavior is approved?
2. What sequential duplicate behavior is approved?
3. What retention/privacy disposition applies before real personal data is accepted?
4. What exact launch timestamp and timezone should the placeholder use?

### Design/content

5. What are the approved validation, success, and failure strings?
6. What field-error and form-result styling is approved?
7. Should Pro and Ultimate show secondary price text in the closed Plan control?
8. Which Kumbh Sans delivery source is approved?
9. Are there authoring limits for extreme content length?

### Technical/operational

10. What browser-support matrix is required?
11. Are Vercel root/build/output settings currently correct?
12. Should CI be included in this implementation or deferred?
13. Is static-content usability without JavaScript promoted from recommendation to release requirement?

## 25. Definition of Done

### 25.1 Functional

- [ ] Home and Sign Up routes render all confirmed content and controls.
- [ ] Generic and Plan-specific navigation produce the required Plan selection.
- [ ] Sign Up logo returns Home.
- [ ] Native Plan select exposes exactly Basic, Pro, and Ultimate.
- [ ] All provisional required fields are validated according to `SPEC.md`.
- [ ] Invalid data produces no IndexedDB write.
- [ ] Valid data commits the required record to `officelite/signups`.
- [ ] Success appears only after transaction completion.
- [ ] Pending repeated activation creates no concurrent write.
- [ ] Storage failure preserves values, suppresses success, announces failure, and allows retry.
- [ ] Approved post-success and duplicate behavior is implemented.
- [ ] Countdown uses the approved target and updates once per second from wall clock.
- [ ] No form record is sent remotely.

### 25.2 Design and responsive

- [ ] Home matches compact, medium, and large design intent.
- [ ] Sign Up matches compact, medium, and large design intent.
- [ ] Layout behaves correctly below/at/above 24rem, 48rem, and 80rem.
- [ ] Default, hover, and focus states match supplied component-family intent.
- [ ] Long content and feedback grow without clipping or overlap.
- [ ] No primary-flow horizontal scrolling occurs at 375 px or tested intermediate widths.
- [ ] Decorative assets are reused and remain nonessential.
- [ ] Native select platform variance and accepted contrast deviation are documented.

### 25.3 Accessibility

- [ ] Pages use semantic landmarks and one H1 each.
- [ ] All interactive controls have correct native roles and accessible names.
- [ ] Every form field has a persistent programmatic label.
- [ ] Required, invalid, and error relationships are exposed.
- [ ] Keyboard-only users can complete navigation, selection, validation, submission, and retry.
- [ ] Focus is visible and not clipped at all ranges.
- [ ] Success and storage failure are announced once without unexpected focus movement.
- [ ] Countdown ticks are not announced every second.
- [ ] Decorative assets are hidden from assistive technology.
- [ ] Reflow, zoom, text enlargement, and reduced motion preserve primary functionality.
- [ ] No full WCAG AA claim is made while accepted contrast failures remain.

### 25.4 Quality

- [ ] Clean lockfile installation succeeds from `frontend/`.
- [ ] `pnpm check` succeeds.
- [ ] Unit and IndexedDB integration tests succeed.
- [ ] `pnpm build` succeeds and creates static output.
- [ ] Critical Playwright flows succeed.
- [ ] Automated accessibility checks and manual checklist are complete.
- [ ] Visual comparison evidence covers all six Figma frames and interaction examples.
- [ ] Tests and implementation reference applicable requirement/specification IDs.

### 25.5 Deployment and documentation

- [ ] Vercel root, build, and output settings are verified.
- [ ] Preview direct-loads `/` and `/sign-up/` successfully.
- [ ] Production personal-data disposition is approved or production release is explicitly blocked/demo-only.
- [ ] README contains real commands and current architecture.
- [ ] Upstream documents are updated only for approved decisions or actual deviations.
- [ ] Final validation evidence and accepted risks are recorded.

## 26. Requirement and specification traceability

| Plan area | Requirements | Specifications / architecture |
|---|---|---|
| Phases 2–3 — shell and Home | `FR-001`, `FR-002`, `FR-003`, `AR-001`, `AR-005`, `RR-001`–`RR-006`, `CON-005` | `SP-GLOBAL-*`, `SP-HOME-*`, `SP-NAV-*`, `AD-001`, `AD-008` |
| Phase 4 — countdown | `FR-009`, `AR-007`, `CR-003` | `SP-COUNT-*`, `SP-A11Y-005`, `AD-002` |
| Phase 5 — Sign Up/Plan | `FR-004`, `FR-005`, `FR-010`, `FR-012`, `BR-001`, `BR-002`, `CON-004` | `SP-SIGNUP-*`, `SP-FORM-001`–`004`, `SP-NAV-*`, `AD-003` |
| Phase 6 — validation | `FR-006`, `AR-004`, `DR-002` | `SP-VAL-*`, `SP-FORM-005`, `SP-A11Y-004` |
| Phase 7 — persistence/results | `FR-007`, `FR-008`, `FR-011`, `BR-004`, `DR-001`–`DR-007` | `SP-SUBMIT-*`, `SP-DATA-*`, `SP-EDGE-004`, `AD-005`, `AD-006` |
| Phase 8 — responsive/accessibility | `AR-001`–`AR-010`, `NFR-002`, `CON-007` | `SP-RWD-*`, `SP-KEY-*`, `SP-A11Y-*`, `SP-EDGE-*`, `AD-007` |
| Phases 1 and 9 — quality/release | `NFR-001`–`NFR-004`, `CON-002`, `CON-006` | `SP-NFR-*`, `AD-009`, `AD-010` |

## 27. Review pass 1 — Completeness and correctness

Completed checks:

- Reinspected the executable `frontend/` repository and confirmed product source remains the Astro starter.
- Reinspected Home, Sign Up, and interaction-state Figma frames.
- Covered current state, scope, technical approach, file impact, phases, dependencies, testing, migration, compatibility, deployment, risks, questions, and Definition of Done.
- Gave every material task requirement/specification references, expected file impact, dependencies, and validation.
- Made every phase produce a meaningful independently verifiable result.
- Kept runtime dependencies minimal and avoided a client framework, router, state library, backend, custom select, analytics, and unsupported data policy.
- Placed validation before persistence and transaction testing before success-state completion.
- Kept exact test package versions out of the plan until implementation compatibility verification.

Corrections made during this pass:

- Moved final result styling behind `G-003` rather than treating the recommendation as approved.
- Made the placeholder countdown timestamp a gate rather than assuming midnight or UTC.
- Blocked Phase 7 completion on post-success and sequential duplicate decisions.
- Kept CI and no-JavaScript resilience as recommendations rather than Must requirements.
- Avoided copying unused feedback icons before feedback design approval.

## 28. Review pass 2 — Consistency, traceability, and uncertainty

Completed checks:

- Verified all phases align with `AD-001`–`AD-010`.
- Verified proposed files follow the architecture’s page, feature, shared-component, asset, and style boundaries.
- Verified Basic generic default remains separate from Pro visual emphasis.
- Verified query Plan values and IndexedDB Plan values use validated lower-case slugs.
- Verified no task adds a production API or sends personal data remotely.
- Verified IndexedDB version-1 schema is implemented without a unique index or silent lifecycle policy.
- Verified accepted contrast risk remains a documented deviation.
- Verified every confirmed functional requirement is covered by at least one implementation phase and validation scenario.
- Verified unresolved stakeholder decisions have owner, blocking phase, and required evidence.
- Verified current repository files are distinguished from proposed files and files whose location depends on approval.

No technical contradiction blocks Stage 8 plan review. The plan contains documented implementation gates that must remain visible.

## 29. Stage completion

- **File created:** `PLAN.md`
- **Important implementation approach:** Build in small vertical slices: validation tooling, runtime foundation, Home, countdown, Sign Up/Plan, validation, IndexedDB/results, hardening, then release.
- **Existing files affected:** `frontend/package.json`, lockfile, `Layout.astro`, `index.astro`, starter assets/components, favicons, and later `README.md`.
- **Proposed files:** Typed content, shared Astro components, focused countdown/sign-up modules, token/page CSS, unit/integration tests, and Playwright flows.
- **Assumptions introduced:** Exact filenames, `data-*` DOM hooks, a single typed content module, and the proposed development-only test stack. Package versions remain unselected until compatibility verification.
- **Open gates:** Placeholder timestamp, font delivery, feedback design/copy, post-success behavior, sequential duplicates, retention/privacy, browser support, optional Plan secondary text, Vercel settings, and CI inclusion.
- **Blockers:** None for Stage 8 adversarial plan review. Specific implementation phases cannot close until their listed gates are resolved.
- **Readiness:** **Ready for Stage 8 — challenge and refine the implementation plan.**
