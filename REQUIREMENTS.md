# Officelite Coming Soon Site — Project Requirements

## 1. Document information

- **Status:** Reviewed — Stage 5 consistency gate complete
- **Version:** 0.3
- **Last updated:** 2026-08-01
- **Owner:** Project owner
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Sources:** `FIGMA-AUDIT.md`, `README.md`, `Figma-to-Implementation Workflow.md`, `Document-Guidelines-REQUIREMENTS.md`
- **Review trail:** `DOCUMENT-REVIEW.md`
- **Downstream documents:** `DESIGN.md`, `SPEC.md`, `ARCHITECTURE.md`, `PLAN.md`

## 2. Authority and evidence

This document is the product-requirements source of truth for the current scope.

- **Confirmed:** supported by Figma, repository documentation, or an explicit user decision.
- **Observed:** directly visible in Figma or the current repository.
- **Inferred:** strongly suggested but not approved.
- **Recommended:** proposed to close a gap and requiring approval.
- **Architecture decision required:** a mandatory technical choice delegated to `ARCHITECTURE.md`.
- **Open product/data decision:** an unresolved stakeholder policy that later documents must not guess.
- **Open question:** cannot be decided safely from available evidence.

Later explicit user decisions take precedence when sources conflict. Conflicts remain recorded so stale sources can be corrected during the documentation consistency gate.

## 3. Overview and problem statement

Officelite is a responsive pre-launch website that communicates the product proposition, presents three pricing plans, displays a launch countdown, and lets prospective users join an early-access list.

The current release is browser-only. Valid sign-up data is stored in browser IndexedDB. A future integration will provide the real launch date and process sign-up records through an API, but that integration is outside the present scope.

Prospective users need to understand the product, compare plans, see expected launch timing, and register interest before a production backend exists. The implementation must support this flow across the demonstrated responsive layouts while preserving a clear boundary for future API integration.

## 4. Goals

- **G-001 — Communicate the product proposition:** Present the brand, product message, decorative dashboard illustration, launch timing, and pricing options in a clear hierarchy.
- **G-002 — Support plan-informed sign-up:** Carry a plan selected from pricing into the Sign Up form.
- **G-003 — Capture early-access interest locally:** Validate and store the displayed form data in IndexedDB.
- **G-004 — Provide responsive and accessible interaction:** Support the demonstrated responsive transformations, keyboard operation, visible focus, semantic controls, and understandable feedback.
- **G-005 — Preserve future integration boundaries:** Keep the browser-only release compatible with a future server-provided date and future API submission without implementing them now.

## 5. Non-goals

- **NG-001:** Sending form data to a backend, serverless function, email service, CRM, or third-party processor.
- **NG-002:** Defining behavior when the countdown reaches zero.
- **NG-003:** Anti-spam, consent, privacy-policy integration, retention schedules, server-side security, and production data-processing rules.
- **NG-004:** Localization and locale-specific content or date formatting.
- **NG-005:** Final approval of the current marketing copy, date, prices, billing text, or plan features.
- **NG-006:** Changing the approved Figma colors to remediate the documented contrast risks during this stage.
- **NG-007:** Authentication, accounts, authorization, or authenticated data ownership.
- **NG-008:** A user-facing interface for listing, editing, exporting, or deleting locally stored sign-up records.

## 6. Users and needs

### Primary users

Prospective Officelite users who want to understand the product, compare plans, and join the early-access list.

### Secondary users and stakeholders

Project stakeholders, UX/UI contributors, front-end contributors, and future API/data-processing owners.

### User needs

- **UN-001:** Understand the product proposition without navigating through multiple informational pages.
- **UN-002:** Compare Basic, Pro, and Ultimate plans.
- **UN-003:** Reach Sign Up from every primary Home call to action.
- **UN-004:** Preserve a plan choice when moving from pricing to Sign Up.
- **UN-005:** Know whether sign-up data was stored successfully.
- **UN-006:** Use the site across mobile, tablet, and desktop viewports.
- **UN-007:** Complete navigation, selection, validation, submission, and feedback using a keyboard and assistive technology.

## 7. Confirmed functional requirements

### FR-001 — Render the Home experience

**Classification:** Confirmed  
**Priority:** Must

**Description:** The application must provide a Home page containing the Officelite brand, hero message, decorative product illustration, primary CTA, Basic/Pro/Ultimate pricing plans, launch date/countdown, and final CTA.

**Rationale:** This is the primary communication and conversion surface demonstrated in Figma.

**Acceptance criteria:**

- Brand, hero content, three plans, launch information, and CTAs are present.
- Pro is visually distinguished as the featured plan.
- Decorative imagery does not replace or obscure the textual message.
- Placeholder content can be replaced without restructuring the page.

**Evidence:** `FIGMA-AUDIT.md`; Home frames `2141:1599`, `2141:1724`, `2141:1813`.

### FR-002 — Navigate from Home to Sign Up

**Classification:** Confirmed  
**Priority:** Must

**Description:** Every Home CTA must navigate to Sign Up.

**Rationale:** The Figma prototype connects hero, pricing, and countdown actions to Sign Up.

**Acceptance criteria:**

- Hero `Get Started`, each `Try for Free`, and countdown `Get Started` open Sign Up.
- Navigation works by pointer and keyboard.

**Evidence:** Figma prototype reactions recorded in `FIGMA-AUDIT.md`.

### FR-003 — Preselect a plan from plan-specific actions

**Classification:** Confirmed  
**Priority:** Must

**Description:** Basic, Pro, and Ultimate plan CTAs must preselect their corresponding plan on Sign Up.

**Rationale:** This preserves the context of the user’s pricing decision.

**Acceptance criteria:**

- Each plan CTA results in its matching Plan value.
- The selected value is available to the IndexedDB record.

**Evidence:** Explicit user decision; pricing and Sign Up frames.

### FR-004 — Render the Sign Up experience

**Classification:** Confirmed  
**Priority:** Must

**Description:** Sign Up must contain the logo, heading, supporting copy, launch date/countdown, fields for Name, Email Address, Plan, Phone Number, and Company, and a submission action.

**Rationale:** This is the conversion form shown at all supplied widths.

**Acceptance criteria:**

- All five displayed data fields and the submission action are present.
- Phone Number and Company remain in the current release.
- The page remains understandable when placeholder copy changes length.

**Evidence:** Sign Up frames `2141:1680`, `2141:1896`, `2141:1940`; user decisions.

### FR-005 — Use a native plan selection control

**Classification:** Confirmed  
**Priority:** Must

**Description:** Plan must use native select behavior and expose Basic, Pro, and Ultimate.

**Rationale:** The user selected native select behavior rather than a scripted custom menu.

**Acceptance criteria:**

- Standard platform pointer and keyboard select interactions work.
- The closed control reflects the current selection.
- The open menu uses native platform behavior; no custom popup is required.

**Evidence:** User decision; Figma component `10:512`.

### FR-006 — Validate required fields before storage

**Classification:** Confirmed, provisional field policy  
**Priority:** Must

**Description:** Name, Email Address, Plan, Phone Number, and Company are required for now. Email Address must be syntactically valid and Plan must be one of the supported values.

**Rationale:** The user provisionally defined all displayed fields as required. The README also establishes empty Name/Email and malformed-email validation expectations.

**Acceptance criteria:**

- Empty required values, malformed email, or unsupported Plan prevent storage.
- No extra phone/company format is imposed without a later decision.
- The user receives understandable field-specific feedback; final copy and visual treatment remain open.

**Evidence:** User decision; current `README.md` validation statement.

### FR-007 — Store valid sign-up data in IndexedDB

**Classification:** Confirmed  
**Priority:** Must

**Description:** A valid submission must be stored in browser IndexedDB.

**Rationale:** IndexedDB is the confirmed persistence destination for the current release.

**Acceptance criteria:**

- Storage is attempted only after validation succeeds.
- The record includes Name, Email Address, Plan, Phone Number, and Company.
- Success is not reported until the write transaction completes.
- No submitted record is sent to a remote API.
- Database/store names, record key, timestamp, duplicate handling, and schema metadata remain open.

**Evidence:** Explicit user decision.

### FR-008 — Confirm successful local storage

**Classification:** Confirmed  
**Priority:** Must

**Description:** After IndexedDB confirms a successful write, the interface must display an on-screen confirmation.

**Rationale:** Successful storage, not button activation, defines successful sign-up.

**Acceptance criteria:**

- Confirmation appears only after transaction success.
- It is visible without navigation and programmatically exposed to assistive technology.
- Exact copy and final visual treatment remain open.

**Evidence:** Explicit user decision.

### FR-009 — Display and update the launch countdown

**Classification:** Confirmed  
**Priority:** Must

**Description:** Home and Sign Up must display a launch date and days/hours/minutes/seconds countdown. Visible values update every second while active.

**Rationale:** Figma presents the countdown and the README requires a live one-second update.

**Acceptance criteria:**

- Units are `days`, `hours`, `min`, and `sec`.
- The date uses the `DD Mon YYYY` pattern shown by `31 Dec 2026`.
- A placeholder target date may be used until the future server date source exists.
- Behavior at or after zero is not required.

**Evidence:** Figma countdowns; `README.md`; explicit user decisions.

### FR-010 — Navigate Home from the Sign Up logo

**Classification:** Confirmed  
**Priority:** Must

**Description:** The logo on Sign Up must navigate Home. The Home-page logo is not required to be a link.

**Rationale:** This matches the prototype and explicit scope decision.

**Acceptance criteria:**

- Pointer and keyboard activation from Sign Up open Home.
- The logo link has an accessible name.

**Evidence:** Figma prototype reactions; explicit user decision.

## 8. Additional confirmed functional requirements

### FR-011 — Report IndexedDB storage failure

**Classification:** Confirmed  
**Priority:** Must

**Description:** A failed IndexedDB write must show and announce an error without showing success.

**Rationale:** Silent failure would make the confirmed success definition unreliable.

**Acceptance criteria:**

- Failure never produces success feedback.
- Visible and programmatic failure feedback is provided.
- Entered values remain available for correction or retry where technically possible.

**Evidence:** Explicit user approval; reliability gap in `FIGMA-AUDIT.md`.

### FR-012 — Define the generic CTA default plan

**Classification:** Confirmed  
**Priority:** Must

**Description:** Generic `Get Started` actions and direct Sign Up navigation must select Basic by default.

**Rationale:** All supplied Sign Up frames show Basic selected, and the user explicitly approved this default behavior.

**Acceptance criteria:**

- Generic and direct navigation begin with Basic unless a valid plan is supplied.

**Evidence:** Figma Sign Up frames; explicit user approval.

## 9. Business and data requirements

| ID | Class | Priority | Requirement | Verification / evidence |
|---|---|---:|---|---|
| BR-001 | Confirmed | Must | Only Basic, Pro, and Ultimate are valid plans. | Native select exposes these values. |
| BR-002 | Confirmed | Must | A plan CTA maps one-to-one to its matching Plan value. | Test each pricing CTA. |
| BR-003 | Confirmed, provisional | Must | All five displayed form fields are required. | No record is stored while any is empty. |
| BR-004 | Confirmed | Must | Sign-up succeeds only after IndexedDB commit. | Success never precedes transaction completion. |
| BR-005 | Confirmed | Must | Current records remain local and are not sent to an API. | No record transmission occurs during submission. |
| BR-006 | Confirmed | Must | The logo acts as Home navigation on Sign Up only. | Matches prototype and decision. |
| BR-007 | Confirmed | Must | Current copy, pricing, features, and date are placeholders. | Content remains replaceable. |
| DR-001 | Confirmed | Must | Store Name, Email, Plan, Phone, and Company. | Successful record contains all five. |
| DR-002 | Confirmed, provisional | Must | Validate required values, email syntax, and Plan membership. | Invalid values prevent storage. |
| DR-003 | Confirmed | Must | Persist in browser IndexedDB. | A completed write can be read from the origin database. |
| DR-004 | Confirmed | Must | Do not transmit the record remotely. | Network inspection shows no form-record request. |
| DR-005 | Architecture decision required | Must | `ARCHITECTURE.md` must define the IndexedDB database name, object-store name, schema version, key strategy, and any record identifier or timestamp needed by the implementation. | Architecture records the choices, rationale, and migration implications before implementation tasks are finalized. |
| DR-006 | Future dependency | Could | Keep field meaning mappable to a future API without defining an API schema now. | No current API contract is claimed. |
| DR-007 | Open product/data decision | Could | Duplicate handling, retention duration, and any future update or deletion policy are undefined for the current release. | Later documents must keep these decisions visible and must not present an unapproved lifecycle policy as confirmed. |

## 10. Accessibility requirements

| ID | Class | Priority | Requirement | Acceptance evidence |
|---|---|---:|---|---|
| AR-001 | Confirmed quality constraint | Must | Use semantic landmarks, headings, links, buttons, labels, inputs, and native select; use ARIA only when native semantics are insufficient. | Accessibility tree exposes correct roles/names. |
| AR-002 | Confirmed quality constraint | Must | Navigation, selection, validation, submission, and feedback are keyboard operable. | Keyboard-only user completes the flow. |
| AR-003 | Observed/confirmed | Must | Controls have visible focus independent of hover, based on Figma focus states. | Focus remains identifiable at all layouts. |
| AR-004 | Confirmed quality constraint | Must | Every field has a programmatic label; placeholders are not the sole accessible name; errors are associated with fields. | Names and error relationships are exposed. |
| AR-005 | Confirmed | Must | Dashboard and orbit graphics are decorative. | Decorative SVGs are ignored by assistive technology. |
| AR-006 | Confirmed quality constraint | Must | Success and implemented validation/failure feedback are programmatically announced without unexpected focus movement. | Screen reader receives status/error information. |
| AR-007 | Confirmed quality constraint | Must | Do not announce every one-second countdown tick. | Countdown updates visually without a continuously updating live region. |
| AR-008 | Confirmed quality constraint | Must | Content reflows with zoom, text enlargement, and narrow viewports without losing primary functionality. | No primary-flow horizontal scrolling at the mobile reference. |
| AR-009 | Confirmed deviation | Document | Preserve current colors for now, document known contrast risk, and do not claim full WCAG AA conformance. | Deviation is recorded in downstream documents. |
| AR-010 | Confirmed quality constraint | Must | Essential behavior does not depend on decorative motion and remains usable with reduced motion. | All tasks remain available with reduced motion. |

## 11. Responsive requirements

| ID | Class | Priority | Requirement | Evidence / verification |
|---|---|---:|---|---|
| RR-001 | Confirmed | Must | Use `24rem`, `48rem`, and `80rem`. The composition beginning at each threshold applies at that threshold: below `24rem` narrow compact, `24rem`–below `48rem` compact, `48rem`–below `80rem` medium, and `80rem` and above large. | User-approved values; Stage 5 technical boundary resolution in `SPEC.md`. |
| RR-002 | Confirmed | Must | Layout is fluid between supplied Figma widths. | Intermediate widths show no overlap or clipping. |
| RR-003 | Observed/confirmed | Must | Home transforms from desktop columns, to tablet horizontal cards, to mobile centered stacks. | Home frames `2141:1599`, `2141:1724`, `2141:1813`. |
| RR-004 | Observed/confirmed | Must | Sign Up transforms from side-by-side desktop to stacked tablet/mobile. At 375 px, primary content uses 16 px insets and the form uses 24 px outer / 20 px inner horizontal spacing. | Sign Up frames and mobile reinspection. |
| RR-005 | Confirmed audit conclusion | Must | Do not implement the stale hidden tablet grid attached to mobile frames. | Actual mobile containers define layout. |
| RR-006 | Inferred from shared components | Must | Default, hover, and focus behavior remains available at all responsive widths. | Test shared controls at mobile/tablet/desktop. |

## 12. Content, quality, and constraints

| ID | Class | Priority | Requirement | Evidence / verification |
|---|---|---:|---|---|
| CR-001 | Confirmed | Must | Marketing, pricing, features, and date remain replaceable placeholders. | Replacement requires no structural rewrite. |
| CR-002 | Confirmed | Must | Containers support content longer than current examples. | Long strings wrap/grow without loss. |
| CR-003 | Confirmed | Must | Countdown labels are `days`, `hours`, `min`, `sec`; date pattern is `DD Mon YYYY`. | Rendered output matches. |
| CR-004 | Open question | Could | Exact validation, failure, and success copy is unapproved. | Copy remains explicitly provisional. |
| CR-005 | Confirmed | Must | Current release is single-language; localization infrastructure is not required. | No alternate locale acceptance criteria. |
| NFR-001 | Confirmed | Must | Success reflects the actual IndexedDB result. | Pending/failed writes never produce success. |
| NFR-002 | Confirmed | Must | Longer copy and messages do not clip or overlap. | Long-content tests pass. |
| NFR-003 | Confirmed process constraint | Must | Implementation and tests remain traceable to requirement IDs. | Plans/tasks/tests cite IDs. |
| NFR-004 | Confirmed direction / repository risk | Must | Preserve the documented Astro and TypeScript direction, subject to repository reinspection before planning. | ARCHITECTURE records verified files/versions. |
| NFR-005 | Open question | Could | No quantitative performance threshold is approved. | No numeric target is invented. |
| NFR-006 | Open question | Could | No browser-support matrix is approved. | SPEC carries the question. |
| NFR-007 | Inferred | Should | Static product and plan content remains readable if JavaScript fails; countdown/storage may be unavailable. | Requires approval before Must status. |
| CON-001 | Confirmed | Must | Figma and `FIGMA-AUDIT.md` own observed visual/interaction evidence. | Downstream documents cite nodes/audit. |
| CON-002 | Confirmed direction | Must | Use semantic HTML, CSS custom properties, Flexbox/Grid, mobile-first, Astro, and TypeScript after verifying the source tree. | ARCHITECTURE records reality and deviations. |
| CON-003 | Confirmed | Must | IndexedDB is current persistence. | No alternate store replaces it. |
| CON-004 | Confirmed | Must | Plan selection uses native select interaction. | Native keyboard/pointer behavior works. |
| CON-005 | Confirmed | Must | Reuse existing matching SVG assets. | Supplied asset bytes are referenced rather than redrawn. |
| CON-006 | Confirmed | Must | No production backend/API integration now. | Current flow completes without an API. |
| CON-007 | Confirmed deviation | Document | Preserve current colors despite known contrast risk for this stage. | Deviation remains visible. |

## 13. Dependencies and assumptions

### Dependencies

- **DEP-001:** Figma source for visual intent, responsive transformations, states, and assets.
- **DEP-002:** Browser IndexedDB for the current success path.
- **DEP-003:** Future launch-date API; not required for the placeholder implementation.
- **DEP-004:** Future sign-up processing API; outside current scope.
- **DEP-005:** Later approval of final marketing, pricing, feedback, and launch content.

### Assumptions

- **A-001 — Resolved:** Basic is the confirmed default for generic CTAs and direct Sign Up navigation.
- **A-002 — Inferred:** The five displayed fields remain the complete form until changed by a stakeholder.
- **A-003 — Inferred:** The future date API will supply a value sufficient for a client countdown; timezone and payload are unknown.
- **A-004 — Inferred:** Target browsers permit IndexedDB; fallback behavior is unapproved.

## 14. Source conflicts and resolutions

| Conflict | Resolution and impact |
|---|---|
| README validated only Name and Email; user decision says all displayed fields are required. | Apply required validation to all five fields. README was corrected during Stage 5. |
| README requested a custom-styled select; user decision requires native select behavior. | Use native interaction. Closed-state appearance may follow Figma without replacing native behavior. README was corrected during Stage 5. |
| README requires one-second updates; launch date will eventually be server-derived. | Compatible: target-date source and client update frequency are separate concerns. |
| Figma lacks error/success compositions; product behavior requires validation and success confirmation. | Functional behavior is required; detailed visual treatment and copy remain open. |
| Accessibility intent conflicts with deferred contrast remediation. | Record the deviation and make no full WCAG AA claim. |
| Mobile frames contain an impossible hidden grid. | Use observed 16 px/24 px inset containers, not the stale grid. |

## 15. Risks

| Risk | Impact | Likelihood | Mitigation / disposition |
|---|---|---:|---|
| IndexedDB unavailable or write failure | High | Medium | Implement and verify FR-011. |
| No retention/deletion policy for contact data | High | Medium | Keep local-only; define policy before API phase. |
| Contrast combinations fail normal-text thresholds | Medium | Confirmed | Record deviation; revisit before conformance claims. |
| Placeholder content mistaken for final | Medium | Medium | Mark placeholders and keep content replaceable. |
| Long content breaks fixed-height layouts | Medium | Medium | Require flexible growth and long-string tests. |
| Native select visuals vary by browser | Low | High | Prioritize behavior; document acceptable variance. |
| Historical Astro source was not fully inspected during requirements work | Medium | Confirmed observation | Reinspect the current repository during Stage 6 before architectural decisions. |
| Duplicate submissions accumulate | Unknown | Unknown | Decide record identity and duplicate policy. |
| Post-success form behavior is undefined | Medium | Confirmed gap | Decide whether values remain, clear, disable, or are replaced before the success-state task is finalized. |

## 16. Open questions

### Product and data lifecycle

1. Should duplicate submissions be allowed, rejected, or update an existing record?
2. After successful storage, should the form keep its values, clear them, disable the controls, or be replaced by confirmation?
3. What retention duration, if any, applies to locally stored records before the future API phase?

### Technical and future integration

4. What browser-support matrix must the project meet?
5. What timezone and payload shape will the future launch-date API use?

### Content and design

6. What are the approved validation, failure, and success messages?
7. What visual pattern presents field errors, success, and storage-failure feedback?
8. Should the Plan control’s supporting price text update for Pro and Ultimate, and what exact labels should be displayed?

## 17. Definition of Done

The current requirements are satisfied when:

- All Must functional requirements and business rules are implemented.
- Valid data is committed to IndexedDB and only then confirmed as successful.
- IndexedDB failure produces visible and programmatically announced error feedback without showing success.
- Invalid required data is not stored.
- Plan CTAs preselect their corresponding plan, and generic/direct Sign Up defaults to Basic.
- The countdown updates once per second using the current placeholder-date boundary.
- Home and Sign Up implement the required transformations at and between the defined responsive ranges.
- Keyboard operation, semantic controls, visible focus, labels, and status announcements are verified.
- Decorative SVG content is excluded from redundant accessibility output.
- Long-content and narrow-viewport behavior are verified.
- Automated and manual checks defined by `SPEC.md` pass.
- No current behavior depends on the future API.
- Documentation is consistent or deviations are explicitly recorded.
- No full WCAG AA claim is made while the contrast deviation remains.

## 18. Traceability

| Requirement group | Evidence | Downstream owner | Status |
|---|---|---|---|
| FR-001–FR-005 | Home/Sign Up frames, components, prototype, user decisions | DESIGN/SPEC | Planned |
| FR-006–FR-010 | README, user decisions, Figma countdown/logo | SPEC | Planned |
| FR-011–FR-012 | Audit gaps, Figma default selection, explicit user approval | SPEC | Planned |
| BR-001–BR-007 | Figma, README, user decisions | SPEC | Planned |
| DR-001–DR-007 | User decisions, architecture-owned persistence choices, and future lifecycle boundary | SPEC/ARCHITECTURE | Planned/Open |
| AR-001–AR-010 | Project accessibility principles, Figma, user decisions | DESIGN/SPEC | Planned/Deviation |
| RR-001–RR-006 | Responsive frames and approved breakpoints | DESIGN/SPEC | Planned |
| CR/NFR/CON groups | Figma, corrected README, repository observations, user decisions | DESIGN/SPEC/ARCHITECTURE | Planned/Open |

## 19. Review pass 1 — Completeness and correctness

Completed:

- Covered purpose, goals, non-goals, users, needs, functional behavior, rules, data, accessibility, responsiveness, content, constraints, dependencies, risks, assumptions, questions, and completion criteria.
- Every functional requirement has classification, priority, rationale, evidence, and testable acceptance criteria.
- IndexedDB success is tied to transaction completion.
- API submission, zero-state behavior, localization, final content, and production governance remain outside scope.
- No unsupported performance target, browser matrix, retention rule, API schema, or duplicate policy was invented.

## 20. Review pass 2 — Consistency, traceability, and uncertainty

Completed:

- Explicit user decisions take precedence over stale README statements and every conflict is recorded.
- Server-derived target date and one-second visible updates are compatible.
- Required success feedback is separated from unresolved design and copy.
- Native select behavior is separated from closed-control appearance.
- Accepted contrast risk is not presented as conformance.
- Stale mobile-grid metadata is excluded from responsive requirements.
- Stage 5 resolved breakpoint boundary semantics, focus-treatment scope, stale README requirements, and persistence-decision ownership.
- Remaining questions do not block architecture and planning, but the post-success form behavior, duplicate policy, and feedback design must be decided before their implementation tasks are closed.
- FR-011 and FR-012 remain confirmed.

## 21. Stage completion

- **File reviewed and modified:** `REQUIREMENTS.md`
- **Important decisions captured:** IndexedDB persistence, provisional all-field validation, success definition, plan preselection, native select, live countdown, future server date, approved breakpoints, mobile inset layout, decorative imagery, placeholder content, and non-goals.
- **Newly confirmed requirements:** IndexedDB failure feedback and Basic as the generic CTA/direct-navigation default.
- **Accepted risks:** Contrast deviation, incomplete data-governance policy, unresolved duplicate/retention behavior, post-success form behavior, and future browser/API decisions.
- **Stage 5 review:** Corrections and remaining uncertainties are recorded in `DOCUMENT-REVIEW.md`.
- **Blockers:** None for architecture and planning. Some product/design decisions remain implementation gates.
- **Readiness:** **Ready for architecture and planning.**
