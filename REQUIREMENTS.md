---
artifact: REQUIREMENTS
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

# Project Requirements

## 1. Document Information

- Scope: Current-release Officelite responsive Home and Sign Up experience inside the authorized Figma scope and implementation root `frontend/`.
- Last updated: 2026-08-27
- Owner: Project workflow
- Project context: `PROJECT-CONTEXT.md`
- Source baseline: `SOURCE-BASELINE.md`
- Evidence baseline: `DESIGN-AUDIT.md`
- Active snapshots: `SRC-DS-001`, `SRC-REPO-001`
- Current release excludes remote sign-up processing and a production launch-date service.

## 2. Overview and Problem

Officelite needs a usable coming-soon experience that lets prospective users understand the product offer, compare the supplied plan options, move from Home to Sign Up with the intended plan preserved, submit the current-release sign-up form, and receive accessible feedback even though no remote sign-up API exists yet.

The design source supplies compact, medium, and large Home and Sign Up compositions plus reusable visual states. Repository product documentation supplies the current-release behavior that the Figma prototype does not demonstrate: plan preservation/defaulting, required-field and email validation, browser IndexedDB persistence, success/failure feedback, a once-per-second countdown update, and keyboard operability.

## 3. Goals and Non-goals

### Goals

- Provide the Home and Sign Up experiences represented by the approved design evidence across compact, medium, and large layout conditions.
- Preserve the selected Basic, Pro, or Ultimate plan when a user enters Sign Up from a plan action, with Basic as the generic/direct-entry default.
- Collect the five current-release sign-up values and validate them before persistence.
- Persist valid sign-up records locally in browser IndexedDB without a remote API.
- Give users visible and programmatically announced persistence outcomes.
- Keep current interactions keyboard-operable with visible focus.
- Show a launch countdown whose visual values update once per second.

### Non-goals

- Remote sign-up API integration in the current release.
- A production launch-date service in the current release.
- Treating the supplied marketing copy, prices, plan features, or launch date as permanent business truth.
- Product or Figma scope outside configured node `4:3`.
- Authentication, authorization, payment, analytics, retention, or other policies not established by the active sources.

## 4. Users and Needs

| User or actor | Need | Evidence or snapshot |
|---|---|---|
| Prospective Officelite visitor | Understand the product proposition, available plans, and launch timing in a responsive page | `EVD-002`, `EVD-011`, `EVD-014`, `EVD-015` |
| Prospective early subscriber | Move from Home to Sign Up and keep the intended plan context | `EVD-009`, `EVD-019`, `AUD-003`, `AUD-004` |
| Sign-up user | Enter the required current-release information, correct validation problems, and submit it locally | `EVD-013`, `EVD-019` |
| Keyboard user | Complete navigation, selection, validation, submission, and feedback flows with visible focus | `EVD-005`, `EVD-006`, `EVD-016`, `EVD-019` |

## 5. Functional Requirements

### REQ-FR-001 — Provide the Home experience

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current release must provide a Home experience containing the supplied marketing hero, Basic/Pro/Ultimate plan presentation, launch countdown, and Home calls to action.
- **Rationale:** Home is the primary marketing and conversion entry point represented throughout the authorized design scope.
- **Evidence:** `EVD-002`, `EVD-011`, `EVD-014`, `EVD-015`.
- **Acceptance criteria:**
  - `AC-001`: Home exposes the hero, three supplied plans, countdown, and associated calls to action in each supplied compact, medium, and large composition.
  - `AC-002`: The core Home information and actions remain available when the layout transforms between the supplied compositions.

### REQ-FR-002 — Provide the Sign Up experience

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current release must provide a Sign Up experience containing the supplied intro content, countdown, plan selection, five current-release fields, and submit action.
- **Rationale:** Sign Up is the destination of the Home conversion flow and the current-release data-entry surface.
- **Evidence:** `EVD-003`, `EVD-012`, `EVD-013`.
- **Acceptance criteria:**
  - `AC-003`: Sign Up exposes Name, Email Address, Plan, Phone Number, Company, and the submit action.
  - `AC-004`: Sign Up retains its core content and form capabilities across the supplied compact, medium, and large compositions.

### REQ-FR-003 — Navigate Home calls to action to Sign Up

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Every current Home call to action must take the user to Sign Up.
- **Rationale:** Repository product intent requires every Home conversion action to enter the Sign Up flow, and Figma demonstrates that navigation for each supplied viewport class.
- **Evidence:** `EVD-009`, `SRC-REPO-001` README.
- **Acceptance criteria:**
  - `AC-005`: Activating the hero, pricing, or countdown call to action opens Sign Up.
  - `AC-006`: No current Home call to action leaves the user on a dead-end interaction.

### REQ-FR-004 — Preserve or default the selected plan

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Entering Sign Up from the Basic, Pro, or Ultimate plan action must preserve that plan. Generic Home actions and direct Sign Up entry must default the plan to Basic.
- **Rationale:** The repository explicitly defines the plan-context behavior that the Figma prototype does not encode.
- **Evidence:** `EVD-019`, `AUD-003`, `AUD-004`.
- **Acceptance criteria:**
  - `AC-007`: Basic plan entry results in Basic selected on Sign Up.
  - `AC-008`: Pro and Ultimate plan entries result in the corresponding plan selected on Sign Up.
  - `AC-009`: Generic Home entry and direct Sign Up entry result in Basic selected by default.

### REQ-FR-005 — Allow plan selection on Sign Up

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The user must be able to choose among Basic, Pro, and Ultimate on Sign Up using a native plan select with standard pointer and keyboard behavior.
- **Rationale:** The repository explicitly requires a native select, while Figma supplies the closed visual treatment.
- **Evidence:** `EVD-006`, `EVD-013`, `EVD-019`, `AUD-006`.
- **Acceptance criteria:**
  - `AC-010`: The plan control exposes Basic, Pro, and Ultimate as selectable values.
  - `AC-011`: The plan control behaves as a native select for pointer and keyboard interaction.

### REQ-FR-006 — Collect all current-release sign-up fields

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current release must collect Name, Email Address, Plan, Phone Number, and Company before a sign-up record can be persisted.
- **Rationale:** These five values are explicitly required by repository product documentation and visually represented in Sign Up.
- **Evidence:** `EVD-013`, `EVD-019`.
- **Acceptance criteria:**
  - `AC-012`: A valid persisted sign-up record contains a non-empty value for each of the five required fields.

### REQ-FR-007 — Validate required values and email syntax

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Before persistence, the form must identify each empty required field and reject an email value that is syntactically invalid.
- **Rationale:** Users need field-specific correction guidance before invalid data is stored.
- **Evidence:** `EVD-019`; design gap `AUD-007` confirms Figma does not define these states.
- **Acceptance criteria:**
  - `AC-013`: Submission does not persist a record while any required field is empty.
  - `AC-014`: Submission does not persist a record while the email value is syntactically invalid.
  - `AC-015`: Each invalid field receives field-specific visible feedback.

### REQ-FR-008 — Persist valid sign-up records in IndexedDB

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** A valid submission must be stored in browser IndexedDB and must not be sent to a remote sign-up API in the current release.
- **Rationale:** Local persistence is the explicit current-release product boundary before future server-side integration exists.
- **Evidence:** `EVD-019`, `SRC-REPO-001` README.
- **Acceptance criteria:**
  - `AC-016`: A valid submission attempts an IndexedDB write.
  - `AC-017`: A successful write creates a browser-local record containing the required sign-up data.
  - `AC-018`: The current release performs no remote sign-up API submission.

### REQ-FR-009 — Confirm successful local persistence

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** After a successful IndexedDB transaction, the user must receive visible confirmation and programmatically announced confirmation.
- **Rationale:** The user must know that the local sign-up operation completed successfully.
- **Evidence:** `EVD-019`; missing design state `AUD-005`, `AUD-007`.
- **Acceptance criteria:**
  - `AC-019`: Successful persistence produces visible success feedback.
  - `AC-020`: The success feedback is announced programmatically without requiring the user to move focus to discover it.

### REQ-FR-010 — Report local persistence failure without avoidable data loss

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** If IndexedDB storage cannot complete, the user must receive visible and programmatically announced failure feedback, and entered values must remain available where technically possible.
- **Rationale:** A storage failure must not appear as success or force unnecessary re-entry when the browser can retain the current form state.
- **Evidence:** `EVD-019`; missing design state `AUD-005`, `AUD-007`.
- **Acceptance criteria:**
  - `AC-021`: A failed IndexedDB transaction produces visible failure feedback.
  - `AC-022`: The failure feedback is announced programmatically.
  - `AC-023`: Entered values remain available after a storage failure unless the browser/runtime failure itself makes that impossible.

### REQ-FR-011 — Update the launch countdown visually once per second

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The Home and Sign Up countdown presentation must update its visible values once per second against the current-release launch target.
- **Rationale:** The repository explicitly defines live countdown behavior; Figma only supplies static visual evidence.
- **Evidence:** `EVD-015`, `EVD-019`, `AUD-009`.
- **Acceptance criteria:**
  - `AC-024`: Visible countdown values update at one-second intervals while the page is active.
  - `AC-025`: Both Home and Sign Up expose the same current-release launch target content.

### REQ-FR-012 — Return from Sign Up to Home through the logo

- **Classification:** Confirmed
- **Priority:** Should
- **Description:** The Officelite logo on Sign Up must provide a route back to Home.
- **Rationale:** The supplied prototype consistently demonstrates this return path across all three responsive compositions.
- **Evidence:** `EVD-010`.
- **Acceptance criteria:**
  - `AC-026`: Activating the Sign Up logo returns the user to Home.

## 6. Business Rules

### REQ-BR-001 — Current plan set

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current release exposes exactly the supplied Basic, Pro, and Ultimate plan choices.
- **Rationale:** These are the three plan choices established by the active product and design sources.
- **Evidence:** `EVD-014`, `EVD-019`.
- **Affected requirements:** `REQ-FR-001`, `REQ-FR-004`, `REQ-FR-005`.

### REQ-BR-002 — Basic generic-entry default

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Basic is the default plan for generic Home entry and direct Sign Up entry.
- **Rationale:** Repository product documentation explicitly establishes the default.
- **Evidence:** `EVD-019`.
- **Affected requirements:** `REQ-FR-004`, `REQ-FR-005`.

### REQ-BR-003 — Five required sign-up values

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Name, Email Address, Plan, Phone Number, and Company are all required for the current release.
- **Rationale:** The repository explicitly identifies these fields as required.
- **Evidence:** `EVD-013`, `EVD-019`.
- **Affected requirements:** `REQ-FR-006`, `REQ-FR-007`, `REQ-DR-001`.

### REQ-BR-004 — Syntactically valid email required

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The Email Address value must satisfy syntactic email validation before persistence is attempted.
- **Rationale:** Repository product documentation explicitly requires email-format validation.
- **Evidence:** `EVD-019`.
- **Affected requirements:** `REQ-FR-007`, `REQ-DR-001`.

### REQ-BR-005 — Placeholder business content

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Current marketing copy, prices, plan features, and launch date are placeholder/current-release content and must not be treated as permanent business rules or permanent external data contracts.
- **Rationale:** The repository explicitly marks these values as placeholders pending future services/content.
- **Evidence:** `SRC-REPO-001` README; design content `EVD-014`, `EVD-015`.
- **Affected requirements:** `REQ-FR-001`, `REQ-FR-011`.

## 7. Data Requirements

### REQ-DR-001 — Sign-up record data

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Each successful current-release sign-up record must contain Name, Email Address, Plan, Phone Number, and Company.
- **Required and optional data:** All five listed values are required; no additional required record fields are established at Stage 2.
- **Validation or ownership:** Required-field and email-syntax rules are defined by `REQ-BR-003` and `REQ-BR-004`.
- **Privacy or retention evidence:** No retention duration, deletion policy, encryption policy, or consent policy is established by the active sources.
- **Evidence:** `EVD-013`, `EVD-019`.

### REQ-DR-002 — Plan value domain

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The persisted plan value must identify one of Basic, Pro, or Ultimate.
- **Required and optional data:** Plan is required.
- **Validation or ownership:** Allowed values are owned by `REQ-BR-001`.
- **Privacy or retention evidence:** Not applicable.
- **Evidence:** `EVD-014`, `EVD-019`.

### REQ-DR-003 — Browser-local persistence boundary

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Current-release sign-up data is persisted in browser IndexedDB; remote sign-up transmission is outside the release.
- **Required and optional data:** Applies to all data in `REQ-DR-001`.
- **Validation or ownership:** Persistence behavior is governed by `REQ-FR-008` through `REQ-FR-010`.
- **Privacy or retention evidence:** The sources do not define retention, cleanup, export, encryption, or cross-device synchronization.
- **Evidence:** `EVD-019`.

## 8. Accessibility Requirements

### REQ-AR-001 — Keyboard-operable current interactions

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** All current navigation, plan selection, validation, submission, and feedback behavior must be operable using a keyboard.
- **Rationale:** Repository product intent explicitly requires keyboard operability for the current interaction set.
- **Evidence or standard:** `EVD-019`; Figma interaction/focus evidence `EVD-005`, `EVD-006`, `EVD-016`.
- **Acceptance criteria:**
  - `AC-027`: A keyboard user can reach and activate Home navigation actions, the Sign Up logo, plan selection, form fields, and submit action.
  - `AC-028`: Keyboard operation does not require pointer-only behavior.

### REQ-AR-002 — Visible focus

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Interactive controls must expose a visible focus state.
- **Rationale:** Repository product intent requires visible focus and Figma supplies explicit focus variants for buttons and form controls.
- **Evidence or standard:** `EVD-005`, `EVD-006`, `EVD-016`, `EVD-019`.
- **Acceptance criteria:**
  - `AC-029`: Keyboard focus is visibly distinguishable on every interactive control required by this release.

### REQ-AR-003 — Programmatic persistence outcome announcements

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Success and failure outcomes from IndexedDB persistence must be programmatically announced as well as visibly displayed.
- **Rationale:** The repository explicitly requires visible and programmatic transaction feedback.
- **Evidence or standard:** `EVD-019`.
- **Acceptance criteria:**
  - `AC-030`: Success feedback is exposed to assistive technology when the transaction succeeds.
  - `AC-031`: Failure feedback is exposed to assistive technology when the transaction fails.

### REQ-AR-004 — Programmatically determinable form labels

- **Classification:** Recommended
- **Priority:** Must
- **Description:** Each form control should have a programmatically determinable label that remains independent of placeholder-like visual treatment.
- **Rationale:** Figma does not establish accessible naming and visually places field text inside controls; relying on placeholder-only naming would create an accessibility gap.
- **Evidence or standard:** `AUD-008`; accessibility evidence limitation in `DESIGN-AUDIT.md`.
- **Acceptance criteria:**
  - `AC-032`: Name, Email Address, Plan, Phone Number, and Company each expose an accessible label to assistive technology.

### REQ-AR-005 — Associate validation feedback with affected controls

- **Classification:** Recommended
- **Priority:** Must
- **Description:** Field-specific validation feedback should be programmatically associated with the field it describes.
- **Rationale:** The product requires field-specific feedback, but Figma supplies no error-state semantics or relationships.
- **Evidence or standard:** `REQ-FR-007`, `AUD-005`, `AUD-007`, `AUD-008`.
- **Acceptance criteria:**
  - `AC-033`: When a field is invalid, assistive technology can determine the corresponding validation message for that field.

## 9. Other Non-functional Requirements

### REQ-NFR-001 — Preserve the supplied responsive capabilities

- **Classification:** Confirmed
- **Priority:** Must
- **Category:** Compatibility / responsive usability
- **Description:** Home and Sign Up must provide the same required capabilities and content hierarchy in the supplied compact, medium, and large layout conditions, while allowing the layout transformations demonstrated by Figma.
- **Measurement conditions:** Validate against the supplied 375px, 768px, and desktop reference compositions without treating those widths as automatic CSS breakpoints.
- **Evidence:** `EVD-002`, `EVD-003`, `EVD-011`, `EVD-012`, `AUD-001`, `AUD-002`.
- **Acceptance criteria:**
  - `AC-034`: Required Home and Sign Up capabilities are available in each supplied layout condition.
  - `AC-035`: The implementation does not assume a single shared desktop reference width merely because both flows have desktop compositions.

### REQ-NFR-002 — Keep intermediate widths usable

- **Classification:** Recommended
- **Priority:** Must
- **Category:** Responsive usability
- **Description:** Between supplied compact, medium, and large evidence points, layouts should adapt without content overlap, clipping, unusable controls, or horizontal page scrolling caused by the application layout.
- **Measurement conditions:** Exact breakpoint values and interpolation rules remain design/specification decisions; validate representative widths between the supplied compositions.
- **Evidence:** Responsive gap `AUD-002`; observed transformations `EVD-011`, `EVD-012`.
- **Acceptance criteria:**
  - `AC-036`: Representative intermediate widths preserve readable content and usable controls without application-caused horizontal page scrolling.

No numeric performance threshold or supported-browser matrix is established by the active sources, so no Stage 2 performance or browser-target requirement is invented.

## 10. Security Requirements

No independent `REQ-SEC-*` requirement is established by the active sources at Stage 2.

The current release has a confirmed **data boundary**—browser IndexedDB only, with no remote sign-up API transmission—captured by `REQ-DR-003` and `REQ-CON-003`. The sources do not establish authentication, authorization, encryption, retention, consent, or broader security/privacy policy, so those concerns remain outside confirmed current requirements unless later authority is supplied.

## 11. Responsive and Content Requirements

- Home and Sign Up must preserve the supplied content hierarchy and required interactions across the compact, medium, and large compositions represented by `EVD-002` and `EVD-003`.
- Layout transformation intent is supported by `EVD-011` and `EVD-012`; exact CSS breakpoints are not requirements at this stage.
- The current content includes the supplied hero copy, pricing content, Sign Up intro, field names, and launch-date presentation, but `REQ-BR-005` prevents those values from becoming permanent business rules.
- Validation, success, and failure message copy is not supplied by Figma (`AUD-014`) and remains a non-blocking content decision for downstream design/specification work.
- Long-content, localization, empty-content, and alternate-content variants are not established by the active sources.

## 12. Constraints

### REQ-CON-001 — Implementation root

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Application implementation work is scoped to repository directory `frontend/`, except minimal repo-wide integration explicitly required by the project workflow.
- **Rationale:** Project configuration and repository context define the implementation boundary.
- **Evidence:** `SRC-REPO-001`, `PROJECT-CONTEXT.md`.
- **Impact:** Planning and implementation must not relocate or replace the app outside this boundary without an approved architectural reason.

### REQ-CON-002 — Existing application stack

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current application uses Astro `^7.1.6`, ESM, Node `>=22.12.0`, and pnpm-managed repository files; downstream implementation must work within the existing stack unless an approved architecture decision changes it.
- **Rationale:** These are existing repository constraints, not design assumptions.
- **Evidence:** `SRC-REPO-001` `frontend/package.json`, `frontend/AGENTS.md`.
- **Impact:** Implementation planning must inspect and reuse repository conventions rather than replacing the stack by default.

### REQ-CON-003 — No remote sign-up API in current release

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Current-release sign-up submission must not depend on or send data to a remote sign-up API.
- **Rationale:** Server-side sign-up processing is explicitly deferred.
- **Evidence:** `EVD-019`, `SRC-REPO-001` README.
- **Impact:** Persistence and feedback must be complete using browser-local capabilities.

### REQ-CON-004 — No production launch-date service in current release

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The current countdown must not depend on a production launch-date service; a future API-backed launch date is outside the current release.
- **Rationale:** Repository documentation explicitly defers the real launch-date service.
- **Evidence:** `SRC-REPO-001` README.
- **Impact:** The current target remains placeholder/current-release content and must stay replaceable.

## 13. Dependencies

| Dependency | Snapshot or evidence | Purpose | Availability | Risk |
|---|---|---|---|---|
| Authorized Figma scope | `SRC-DS-001`, `EVD-001` | Responsive compositions, visual hierarchy, states, assets, tokens | Available; time-bound | Mutable source requires reverification |
| Repository product documentation | `SRC-REPO-001`, `EVD-019` | Product flow, validation, persistence, feedback, countdown rules | Available; immutable baseline | Must not be confused with Figma evidence |
| Existing Astro application | `SRC-REPO-001`, `EVD-020` | Implementation host and technical conventions | Available; starter state | Little reusable product UI exists yet |
| Browser IndexedDB | `REQ-DR-003` | Current-release sign-up persistence | Platform capability | Availability/quota/transaction failure must be handled |
| Current placeholder content | `EVD-014`, `EVD-015`, `REQ-BR-005` | Populate current Home/Sign Up/countdown | Available | Must not harden placeholder values into permanent business rules |

## 14. Assumptions and Open Questions

### Assumptions

- **Inferred:** The supplied 375px, 768px, and desktop compositions are responsive reference conditions rather than literal device-specific routes.
- **Inferred:** Repeated pricing and countdown structures are likely reusable implementation patterns, but code-component boundaries are not requirements and remain downstream decisions.
- **Confirmed limitation:** No external Figma library dependency was established by Stage 1; all audited reusable components were local (`EVD-017`).

### Blocking questions

No Stage 2 blocking product question is identified from the active sources.

### Non-blocking questions

- What exact layout interpolation and breakpoint rules should be used between the supplied responsive compositions? (`AUD-002`)
- What exact open-menu visual treatment should accompany the native plan select? (`AUD-006`)
- What final user-facing copy should be used for validation, persistence success, and persistence failure? (`AUD-014`)
- Should any additional disabled, loading, error, or success component variants be added to Figma, or should downstream design extend the existing visual language? (`AUD-005`)
- Which browsers/devices are formally supported? No matrix is currently documented.
- Are retention, deletion, privacy, or encryption rules required for IndexedDB records? No such policy is currently documented.
- What behavior should the countdown use once the current target is reached? The active sources do not define a terminal state.

## 15. Risks

| Risk | Impact | Likelihood | Mitigation | Blocking |
|---|---|---|---|---|
| Mutable Figma source changes after audit | Downstream requirements/design could reference stale evidence | Medium | Reverify `SRC-DS-001` before material stage transitions | No |
| Intermediate responsive behavior is unspecified | Layout may diverge between supplied reference widths | Medium | Keep `REQ-NFR-002` explicit and resolve interpolation in design/specification | No |
| Error/success/select-open states are missing from Figma | Runtime states could drift visually | Medium | Preserve requirements here; define visual treatment in downstream design/specification using existing tokens/states | No |
| IndexedDB is unavailable or a transaction fails | User cannot persist current-release sign-up | Medium | `REQ-FR-010` requires explicit failure feedback and value preservation where possible | No |
| Placeholder content is treated as permanent | Future API/content replacement becomes brittle or misleading | Medium | Enforce `REQ-BR-005` and `REQ-CON-004` | No |
| No browser-support matrix exists | Compatibility acceptance remains incomplete | Medium | Keep the gap visible until a product/technical authority defines support | No |
| No retention/privacy policy exists for local records | Future policy may require storage changes | Medium | Do not invent policy; carry the open question into later stages | No |

## 16. Definition of Done

The project implementation is complete for this requirements scope when:

- [ ] All Must requirements and their acceptance criteria pass.
- [ ] All approved Recommended requirements promoted through the Gated workflow are satisfied.
- [ ] Plan navigation, preservation/defaulting, native selection, validation, IndexedDB persistence, and transaction feedback are verified.
- [ ] The countdown updates visually once per second using current-release target content.
- [ ] Keyboard operability, visible focus, and required programmatic feedback are verified.
- [ ] Responsive behavior is verified against the supplied compact, medium, and large design evidence and approved intermediate-width behavior.
- [ ] No remote sign-up API or production launch-date service has been added to the current release.
- [ ] Approved downstream design, specification, architecture/planning, implementation, and validation artifacts remain traceable to these requirements.
- [ ] No critical or high-severity blocker remains.

## 17. Traceability

| Requirement | Snapshot or evidence | Design decision | Specification | Validation |
|---|---|---|---|---|
| `REQ-FR-001` | `EVD-002`, `EVD-011`, `EVD-014`, `EVD-015` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-002` | `EVD-003`, `EVD-012`, `EVD-013` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-003` | `EVD-009`, `SRC-REPO-001` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-004` | `EVD-019`, `AUD-003`, `AUD-004` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-005` | `EVD-006`, `EVD-013`, `EVD-019` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-006` | `EVD-013`, `EVD-019` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-007` | `EVD-019`, `AUD-007` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-008` | `EVD-019` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-009` | `EVD-019`, `AUD-005`, `AUD-007` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-010` | `EVD-019`, `AUD-005`, `AUD-007` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-011` | `EVD-015`, `EVD-019`, `AUD-009` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-FR-012` | `EVD-010` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-BR-001`–`REQ-BR-005` | `EVD-014`, `EVD-015`, `EVD-019` | Stage 3 as applicable | Stage 4 | Stage 11 |
| `REQ-DR-001`–`REQ-DR-003` | `EVD-013`, `EVD-019` | Stage 3 as applicable | Stage 4 | Stage 11 |
| `REQ-AR-001`–`REQ-AR-003` | `EVD-005`, `EVD-006`, `EVD-016`, `EVD-019` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-AR-004`–`REQ-AR-005` | `AUD-005`, `AUD-007`, `AUD-008` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-NFR-001`–`REQ-NFR-002` | `EVD-002`, `EVD-003`, `EVD-011`, `EVD-012`, `AUD-001`, `AUD-002` | Stage 3 | Stage 4 | Stage 11 |
| `REQ-CON-001`–`REQ-CON-004` | `SRC-REPO-001`, `EVD-019`, project context | N/A or Stage 3 as applicable | Stage 4/6 | Stage 10/11 |

## 18. Review

### Pass 1 — Completeness and correctness

- [x] Requirements cover the agreed Home, Sign Up, navigation, plan, form, validation, persistence, feedback, countdown, accessibility, responsive, data, and current technical scope.
- [x] Every material requirement is specific, prioritized, and objectively testable at the requirements level.
- [x] Confirmed requirements are supported by `SRC-DS-001`, `SRC-REPO-001`, or evidence/findings owned by `DESIGN-AUDIT.md`.
- [x] Unsupported authentication, authorization, retention, privacy, browser, performance, analytics, and backend rules were not invented.
- [x] Security policy was not fabricated; only the source-supported local data boundary is recorded.
- [x] Exact Figma frame widths were not promoted to implementation breakpoints.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Requirement identifiers follow the canonical `REQ-*` namespaces and acceptance criteria use stable `AC-*` IDs.
- [x] Every material requirement references an active snapshot, `EVD-*` evidence item, `AUD-*` finding, or approved project context.
- [x] Figma-observed behavior and repository-confirmed product behavior remain distinguishable, especially for plan preservation, validation, persistence, feedback, and countdown timing.
- [x] Recommended accessibility and intermediate-responsive requirements are visibly classified as Recommended rather than silently presented as previously confirmed product decisions.
- [x] Missing select-open, validation, success/failure, browser-support, privacy/retention, countdown-terminal, and intermediate-layout decisions remain visible as non-blocking questions.
- [x] The active Figma source is still treated as time-bound and requires canonical reverification before Stage 2 closure.
- [x] No Stage 2 blocking question remains.
