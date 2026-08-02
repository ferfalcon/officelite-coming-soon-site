# Officelite Coming Soon Site — Technical Specification

## 1. Document information

- **Status:** Reviewed — Stage 5 consistency gate complete
- **Version:** 0.2
- **Last updated:** 2026-08-01
- **Owner:** Project owner
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Source documents:** `FIGMA-AUDIT.md`, `REQUIREMENTS.md`, `DESIGN.md`, `Document-Guidelines-SPEC.md`
- **Review trail:** `DOCUMENT-REVIEW.md`
- **Downstream documents:** `ARCHITECTURE.md`, `PLAN.md`, implementation tasks, tests

## 2. Purpose and authority

This document translates the approved requirements and design intent into observable, testable behavior for the current Officelite browser-only release.

The following terms describe normative status:

- **Confirmed:** mandatory behavior supported by a requirement, stakeholder decision, or direct Figma evidence.
- **Confirmed direction:** an approved technical direction that still requires repository verification before architecture is finalized.
- **Confirmed technical resolution:** normative testable detail owned by `SPEC.md` because a confirmed requirement delegates or requires precise behavior.
- **Confirmed technical safeguard:** normative protective behavior required to avoid concurrent actions or false outcomes without introducing an unapproved visual state.
- **Confirmed deviation:** an explicitly accepted exception from a normal quality or conformance target.
- **Architecture decision required:** a mandatory implementation choice delegated to Stage 6.
- **Open product/data decision:** an unresolved stakeholder policy that architecture and implementation must not guess.
- **Provisional:** mandatory for the current release but explicitly subject to later stakeholder revision.
- **Recommended:** a testable proposed resolution to an unresolved requirement or design gap; it is not an approved product decision until accepted.
- **Open:** behavior cannot be finalized from current evidence and must not be silently invented.
- **Out of scope:** no implementation or acceptance behavior is required for this release.

`SPEC.md` defines outcomes and interaction contracts. Repository structure, module boundaries, database implementation details, and implementation order remain responsibilities of `ARCHITECTURE.md` and `PLAN.md`.

## 3. Goals

- Present the Home and Sign Up experiences represented by the six production Figma frames.
- Preserve plan context between Home pricing actions and Sign Up.
- Validate and store sign-up data in browser IndexedDB.
- Report validation, successful storage, and storage failure accessibly.
- Display a launch countdown that visually updates once per second.
- Support the approved responsive transformations and native keyboard behavior.
- Preserve a clear boundary for future launch-date and sign-up APIs without implementing them now.

**Requirements:** `G-001`–`G-005`, `FR-001`–`FR-012`.

## 4. Scope

### 4.1 Included

- Home page content, pricing, launch countdown, and calls to action.
- Sign Up page content, countdown, form, native Plan select, validation, IndexedDB storage, and feedback.
- Basic, Pro, and Ultimate plan context.
- Default, hover, and focus visual states supplied by Figma.
- Keyboard navigation and native control behavior.
- Responsive compositions at compact, medium, and large ranges.
- Long-content, narrow-width, invalid-data, storage-failure, unsupported-plan, repeated-action, and JavaScript-failure considerations.

### 4.2 Excluded

- Production launch-date API integration.
- Sending sign-up records to any API, CRM, email service, or remote processor.
- Countdown behavior at or after zero.
- Authentication, accounts, authorization, anti-spam, consent, privacy-policy integration, retention policy, and remote security rules.
- Localization or alternate date formats.
- Final marketing, pricing, validation, failure, or success copy approval.
- Full WCAG AA conformance claims while the accepted contrast deviation remains.
- A scripted custom Plan popup.
- User-facing record listing, editing, deletion, or data export.

**Requirements:** `NG-001`–`NG-008`, `CON-003`, `CON-004`, `CON-006`, `CON-007`.

## 5. Terminology

| Term | Meaning |
|---|---|
| Home | The marketing and pricing experience shown in Figma frames `2141:1599`, `2141:1724`, and `2141:1813`. |
| Sign Up | The early-access form experience shown in frames `2141:1680`, `2141:1896`, and `2141:1940`. |
| Generic CTA | A `Get Started` action that is not attached to a specific plan. |
| Plan CTA | A `Try for Free` action attached to Basic, Pro, or Ultimate. |
| Supported plan | Exactly Basic, Pro, or Ultimate. |
| Plan context | The supported plan carried from a Home Plan CTA into Sign Up. |
| Successful sign-up | Completion of the IndexedDB write transaction for a valid record. |
| Storage failure | IndexedDB unavailable, rejected, aborted, or otherwise unable to complete the write transaction. |
| Pending submission | The period after valid submission begins and before the IndexedDB transaction succeeds or fails. |
| Compact composition | The stacked mobile design represented by the 375 px frames. |
| Medium composition | The tablet design represented by the 768 px frames. |
| Large composition | The desktop design represented by the 1321 px and 1440 px frames. |
| Placeholder content | Current marketing copy, pricing, features, and date that may be replaced without changing the required structure. |

## 6. Global page behavior

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-GLOBAL-001` | Confirmed | Home and Sign Up each expose one page-level heading and a meaningful document reading order. | Inspect semantic outline and accessibility tree. | `AR-001`; `DESIGN.md` §§4–5, 15. |
| `SP-GLOBAL-002` | Confirmed | Meaningful content remains within the primary flow. Only decorative artwork may overflow and be clipped. | Replace copy with longer strings and inspect clipping/overlap. | `CR-002`, `NFR-002`; `DESIGN.md` §6. |
| `SP-GLOBAL-003` | Confirmed | Home and Sign Up use the same Officelite brand asset and preserve its aspect ratio. | Compare rendered logo at all required compositions. | `FR-001`, `FR-004`, `CON-005`; Figma `4:871`. |
| `SP-GLOBAL-004` | Confirmed | Dashboard and orbit artwork are decorative, do not receive focus, and do not add accessible names. | Inspect accessibility tree and keyboard order. | `AR-005`; Figma `5:275`, `2141:931`, `2141:932`. |
| `SP-GLOBAL-005` | Confirmed | Navigation uses link semantics; form submission uses button semantics. | Inspect roles and activate by keyboard. | `AR-001`, `AR-002`. |
| `SP-GLOBAL-006` | Confirmed | No required interaction depends on hover, animation, or decorative artwork. | Complete the flow by keyboard with reduced motion and missing decorative assets. | `AR-002`, `AR-010`. |

## 7. Home specification

### 7.1 Required structure

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-HOME-001` | Confirmed | Home renders the brand header, hero heading, hero description, generic CTA, decorative dashboard illustration, three pricing plans, launch date, four-unit countdown, and final generic CTA. | Compare content regions with all three Home frames. | `FR-001`; Figma `2141:1599`, `2141:1724`, `2141:1813`; `DESIGN.md` §5.1. |
| `SP-HOME-002` | Confirmed | Pricing order is Basic, Pro, Ultimate. Each plan exposes name, price, billing summary, feature list, and Plan CTA. | Inspect visual and semantic order. | `FR-001`, `BR-001`; `DESIGN.md` §5.1. |
| `SP-HOME-003` | Confirmed | Pro is visually featured using the approved blue-card treatment, but this does not change the generic Sign Up default from Basic. | Compare Pro styling and generic CTA result. | `FR-001`, `FR-012`; Figma `2141:1643`; `DESIGN.md` §§7, 11.6. |
| `SP-HOME-004` | Confirmed | Current plan content remains replaceable; longer plan names, prices, billing text, and features wrap or grow without truncation. | Substitute longer strings and inspect all ranges. | `CR-001`, `CR-002`, `NFR-002`; `DESIGN.md` §§8, 11.6. |
| `SP-HOME-005` | Out of scope | The Home logo has no required navigation behavior in this release. It may remain static; this specification does not require or forbid an additional Home self-link. | Confirm no acceptance claim depends on Home-logo activation. | `BR-006`; `DESIGN.md` §4.1. |

### 7.2 Home calls to action

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-NAV-001` | Confirmed | Hero and final `Get Started` actions navigate to Sign Up with Basic selected. | Activate each action by pointer and keyboard; inspect Plan value. | `FR-002`, `FR-012`; prototype reactions; `DESIGN.md` §12.1. |
| `SP-NAV-002` | Confirmed | Basic, Pro, and Ultimate Plan CTAs navigate to Sign Up with the corresponding plan selected. | Test all three CTAs and inspect Plan value. | `FR-002`, `FR-003`, `BR-002`; prototype reactions. |
| `SP-NAV-003` | Confirmed | Missing plan context uses Basic. | Navigate directly with no plan context. | `FR-012`. |
| `SP-NAV-004` | Confirmed | Unsupported incoming plan context is ignored and Sign Up falls back to Basic rather than exposing or storing an unsupported value. | Navigate with an unsupported plan value. | `FR-012` permits only a valid supplied plan to override the Basic default; `BR-001`. |
| `SP-NAV-005` | Confirmed | Navigation works with standard pointer activation and keyboard link activation. | Activate links using pointer and Enter. | `FR-002`, `AR-002`. |
| `SP-NAV-006` | Confirmed | The mechanism used to carry plan context is not prescribed, but personal form data must not be required to navigate from Home to Sign Up. | Verify correct selected plan without entering personal data. | `FR-003`, `FR-012`; architecture deferred. |
| `SP-NAV-007` | Confirmed | Home-to-Sign-Up and Sign-Up-to-Home navigation requires no transition animation. Native page-transition behavior is acceptable. | Activate each navigation path with reduced motion and inspect for required animation dependencies. | Figma prototype uses direct navigation with no transition; `AR-010`. |

## 8. Sign Up specification

### 8.1 Required structure and initial values

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-SIGNUP-001` | Confirmed | Sign Up renders the logo link, page heading, supporting description, launch date, four-unit countdown, Name, Email Address, Plan, Phone Number, Company, and submit button. | Compare all three Sign Up frames. | `FR-004`; Figma `2141:1680`, `2141:1896`, `2141:1940`. |
| `SP-SIGNUP-002` | Confirmed | The logo is a Home link with an accessible name that identifies Officelite and its destination. | Inspect role/name and activate by pointer and keyboard. | `FR-010`, `AR-001`; prototype reactions. |
| `SP-SIGNUP-003` | Confirmed | Direct Sign Up entry and generic CTA entry initially select Basic. | Open Sign Up directly and from both generic CTA locations. | `FR-012`. |
| `SP-SIGNUP-004` | Confirmed | A valid Plan CTA context overrides the Basic default. | Open Sign Up from each Plan CTA. | `FR-003`, `FR-012`. |
| `SP-SIGNUP-005` | Confirmed | Plan uses native select semantics and exposes exactly Basic, Pro, and Ultimate. | Inspect role/options and exercise native pointer/keyboard behavior. | `FR-005`, `BR-001`, `CON-004`; Figma `10:512`. |
| `SP-SIGNUP-006` | Confirmed | The closed Plan control shows the selected plan; the opened option menu follows the browser/platform native appearance. The supplied Basic appearance includes supporting text `Free`, but no confirmed rule requires corresponding Pro or Ultimate supporting text. | Compare the selected plan with the native value and the Basic closed state with Figma. | `FR-005`; `DESIGN.md` §11.9. |
| `SP-SIGNUP-007` | Recommended | When supporting price text is retained for all selections, map Basic to `Free`, Pro to `$9.99`, and Ultimate to `$19.99`; exact `Pack` display labels remain content/design decisions. | Change each Plan selection and inspect the secondary text. | Inferred from the pricing inventory; Pro and Ultimate select states are absent from Figma. |

### 8.2 Form control semantics

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-FORM-001` | Confirmed | Name and Company use text-entry semantics; Email Address uses email-entry semantics; Phone Number uses telephone-entry semantics; Plan uses native select semantics. | Inspect control types and accessibility roles. | `AR-001`, `FR-004`, `FR-005`. |
| `SP-FORM-002` | Confirmed | Each control has a persistent programmatic label. Placeholder or prompt text is not its only accessible name. | Inspect computed accessible names with empty and populated values. | `AR-004`; `DESIGN.md` §15.2. |
| `SP-FORM-003` | Provisional | Name, Email Address, Plan, Phone Number, and Company are all required in the current release. | Inspect required state and submit each field empty in turn. | `FR-006`, `BR-003`, `DR-002`. |
| `SP-FORM-004` | Confirmed | No unapproved maximum length, phone pattern, company pattern, or name pattern is imposed. | Enter long and varied valid text; verify it is not rejected by an invented rule. | `FR-006`, `CR-002`; open governance limits. |
| `SP-FORM-005` | Confirmed | User-entered values remain present after validation failure and storage failure. | Trigger each failure and inspect controls. | `FR-011`; `DESIGN.md` §12.5. |
| `SP-FORM-006` | Open | Whether values remain, clear, disable, or are replaced after successful storage is not approved. Implementations must not claim one outcome as confirmed. | Documentation review before implementation approval. | `DESIGN.md` §§12.6, 20. |

## 9. Validation specification

### 9.1 Validation rules

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-VAL-001` | Confirmed technical resolution | A required text value containing only whitespace is treated as empty for validation. This does not define storage trimming or casing. | Submit spaces in Name, Phone, or Company. | Testable interpretation required by `FR-006` and `BR-003`; storage normalization remains open. |
| `SP-VAL-002` | Confirmed technical resolution | Email Address is invalid when empty or when the native email control reports a syntax error. No stricter custom email policy or separate regular expression is required. | Test empty, malformed, and ordinary valid addresses. | Precise browser-native interpretation of `FR-006`, `DR-002`, `AR-001`. |
| `SP-VAL-003` | Confirmed | Plan is invalid when empty or not one of Basic, Pro, or Ultimate. | Attempt submission with missing or unsupported Plan. | `FR-006`, `BR-001`, `DR-002`. |
| `SP-VAL-004` | Confirmed | Phone Number and Company are required but have no additional format validation. | Submit non-empty values in varied formats. | `FR-006`. |
| `SP-VAL-005` | Confirmed | Any invalid field prevents every IndexedDB write attempt. | Spy on persistence boundary while submitting invalid data. | `FR-006`, `FR-007`. |
| `SP-VAL-006` | Confirmed | Every invalid field receives visible field-specific feedback and is programmatically marked invalid. | Inspect visible output, `aria-invalid`, and accessible relationships. | `FR-006`, `AR-004`. |
| `SP-VAL-007` | Confirmed | Each field error is programmatically associated with its control, for example through the control’s description relationship. | Inspect accessibility tree/relationships. | `AR-004`. |
| `SP-VAL-008` | Confirmed | Correcting a field and resubmitting removes or updates the stale error for that field. | Correct each invalid value and resubmit. | `FR-006`; recovery behavior. |
| `SP-VAL-009` | Open | Exact validation copy, iconography, color, spacing, and invalid-control visual styling are unapproved. Tests must verify meaning and association rather than exact wording or pixels. | Documentation and visual review. | `CR-004`; Figma design gap. |

### 9.2 Validation focus recommendation

| Specification ID | Status | Proposed behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-VAL-010` | Recommended | After a submit attempt fails validation, move focus to the first invalid control in DOM order. Do not move focus repeatedly while the user corrects fields. | Submit multiple invalid fields and inspect focus. | Supports `AR-002`, `AR-004`; not explicitly approved in Figma. |

## 10. Submission and IndexedDB specification

### 10.1 Submission state machine

The form has the following conceptual submission states:

`idle` → `invalid` or `pending` → `success` or `storage-failure`

A new submit attempt may start from `idle`, `invalid`, or `storage-failure`. Post-success behavior remains open under `SP-FORM-006`.

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-SUBMIT-001` | Confirmed | Submission starts validation before any storage operation. | Observe call order. | `FR-006`, `FR-007`. |
| `SP-SUBMIT-002` | Confirmed | A valid submission creates one storage transaction attempt containing the five required values. | Submit valid data and inspect persistence call/record. | `FR-007`, `DR-001`, `DR-003`. |
| `SP-SUBMIT-003` | Confirmed | Button activation alone never produces success. | Delay/reject the transaction and inspect feedback. | `FR-008`, `BR-004`, `NFR-001`. |
| `SP-SUBMIT-004` | Confirmed | Success occurs only after the IndexedDB transaction completes successfully. A request-level event that precedes transaction completion is insufficient. | Control transaction completion and inspect status timing. | `FR-007`, `FR-008`, `BR-004`. |
| `SP-SUBMIT-005` | Confirmed | Any IndexedDB write that cannot complete successfully produces storage-failure, never success. Architecture determines how individual open, request, and transaction failures map to this outcome. | Simulate unavailable storage, open failure, request failure, and transaction abort as supported by the implementation. | `FR-011`, `NFR-001`. |
| `SP-SUBMIT-006` | Confirmed | Storage failure preserves entered values where technically possible and allows a later retry. | Fail a write, inspect values, then retry successfully. | `FR-011`. |
| `SP-SUBMIT-007` | Confirmed | Current submission sends no form record to a remote endpoint. | Inspect network activity during submission. | `FR-007`, `BR-005`, `DR-004`, `CON-006`. |
| `SP-SUBMIT-008` | Confirmed | Success and storage failure are shown in the existing Sign Up context without mandatory navigation. | Complete and fail a transaction; inspect page location. | `FR-008`, `FR-011`; `DESIGN.md` §12.6. |

### 10.2 Pending and duplicate-action recommendation

| Specification ID | Status | Proposed behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-SUBMIT-009` | Confirmed technical safeguard | While a valid IndexedDB transaction is pending, additional submit activations do not start concurrent writes. The form exposes a programmatic busy state. No new loading animation or permanent disabled visual variant is required. | Delay a transaction, activate submit repeatedly, count write attempts, inspect busy state. | Duplicate-action coverage required by the workflow; preserves `NFR-001` and does not decide sequential duplicate-record policy. |

### 10.3 Feedback behavior

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-FEEDBACK-001` | Confirmed | Successful storage creates a visible, non-empty confirmation message and programmatically announces it to assistive technology. | Complete a transaction and inspect visual/status output. | `FR-008`, `AR-006`. |
| `SP-FEEDBACK-002` | Confirmed | Storage failure creates a visible, non-empty failure message and announces it when the failure occurs. | Reject a transaction and inspect visual/announcement output. | `FR-011`, `AR-006`. |
| `SP-FEEDBACK-003` | Confirmed | Success and failure are mutually exclusive; stale success is removed before a retry and is never displayed for a failed transaction. | Succeed, retry with failure, and inspect status. | `FR-011`, `NFR-001`. |
| `SP-FEEDBACK-004` | Confirmed | Success or storage-failure feedback does not move keyboard focus unexpectedly. | Submit with focus on the button and inspect focus after resolution. | `AR-006`; `DESIGN.md` §15.3. |
| `SP-FEEDBACK-005` | Open | Exact feedback copy, iconography, color, and final visual composition are unapproved. | Documentation and visual review. | `CR-004`; `DESIGN.md` §20. |
| `SP-FEEDBACK-006` | Recommended | Render one form-level status region between the field group and submit action; use polite status semantics for success and assertive alert semantics for storage failure. Let the panel grow vertically. | Inspect DOM order, announcement priority, and layout growth. | `DESIGN.md` §§12.6, 19 recommendations. |

## 11. Data specification

### 11.1 Minimum record data

| Field | Required | Valid value | Normalization status |
|---|---:|---|---|
| Name | Yes, provisional | Non-whitespace string | Storage trimming/casing is open. |
| Email Address | Yes, provisional | Non-empty value satisfying standard email validity | Casing and canonicalization are open. |
| Plan | Yes | Basic, Pro, or Ultimate | Serialized representation is architecture-owned. |
| Phone Number | Yes, provisional | Non-whitespace string; no additional pattern | Formatting normalization is open. |
| Company | Yes, provisional | Non-whitespace string | Storage trimming/casing is open. |

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-DATA-001` | Confirmed | A successful record contains all five conceptual fields listed above. | Read the committed record from the origin’s IndexedDB. | `DR-001`, `FR-007`. |
| `SP-DATA-002` | Confirmed | The record remains in browser IndexedDB for the same origin after a normal page reload unless the browser/user clears site data. | Submit, reload, and inspect IndexedDB. | `DR-003`, `CON-003`. |
| `SP-DATA-003` | Confirmed | No API schema, remote identifier, server status, or remote synchronization field is required. | Inspect record and network behavior. | `DR-004`, `DR-006`, `CON-006`. |
| `SP-DATA-004` | Architecture decision required | Stage 6 must define the database name, object-store name, schema version, key strategy, and any generated identifier or timestamp needed for a valid record. | Verify `ARCHITECTURE.md` records the choices, rationale, and migration implications before implementation tasks are finalized. | `DR-005`. |
| `SP-DATA-005` | Open product/data decision | Duplicate submissions may be allowed, rejected, or update an existing record. Retention duration and future update/deletion policy are also unapproved. Concurrent pending activation remains independently prevented by `SP-SUBMIT-009`. | Product/data decision required. | `DR-007`; `REQUIREMENTS.md` §16. |

## 12. Countdown specification

### 12.1 Data and display

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-COUNT-001` | Confirmed | Home and Sign Up each display the same launch target date and the units days, hours, min, and sec. | Compare both pages at the same instant. | `FR-009`, `CR-003`. |
| `SP-COUNT-002` | Confirmed | The visible date uses English `DD Mon YYYY`, matching `31 Dec 2026`. Localization is not required. | Supply a known target and inspect output. | `FR-009`, `CR-003`, `CR-005`. |
| `SP-COUNT-003` | Confirmed | Visible countdown values update once per second while the target is in the future and the countdown is active. | Observe value changes with a controlled clock. | `FR-009`; README. |
| `SP-COUNT-004` | Confirmed technical resolution | Each unit is calculated from the remaining duration: whole days, remaining hours, remaining minutes, and remaining seconds. Values below 10 display with at least two digits; values above two digits are not truncated. | Test controlled durations. | Required to make `FR-009` objectively testable; supported by Figma values `47`, `07`, `56`, `14`. |
| `SP-COUNT-005` | Confirmed technical resolution | Each update is recalculated from the target and current wall-clock time. After timer throttling or tab inactivity, the next visible update catches up rather than replaying missed ticks. | Pause/throttle execution, resume, and compare with target time. | Accuracy behavior required by `FR-009`. |
| `SP-COUNT-006` | Confirmed | The countdown is not an assertive or one-second live announcement. Visual updates do not announce every tick. | Inspect live-region semantics and screen-reader behavior. | `AR-007`; `DESIGN.md` §15.4. |
| `SP-COUNT-007` | Open | Target timezone, current placeholder timestamp, future API payload, request lifecycle, and failure fallback are undefined. | Future API specification required. | `DEP-003`, `A-003`. |
| `SP-COUNT-008` | Out of scope | No required behavior is defined when the target is reached or is in the past. | Confirm no acceptance test claims a zero-state outcome. | `NG-002`, `FR-009`. |

## 13. Conceptual component structure

These are behavioral patterns, not mandatory source-code modules.

| Conceptual pattern | Required responsibilities | Requirement/design references |
|---|---|---|
| Page shell | Canvas, header placement, meaningful main region, light/dark composition, decorative overflow boundaries. | `FR-001`, `FR-004`; `DESIGN.md` §§5–6. |
| Brand logo | Shared visual asset; static identity on Home; Home link on Sign Up. | `FR-010`, `BR-006`; Figma `4:871`. |
| Hero | Heading, description, generic CTA, decorative dashboard illustration. | `FR-001`; Figma Home frames. |
| Pricing group | Ordered Basic/Pro/Ultimate cards and responsive re-composition. | `FR-001`, `RR-003`; `DESIGN.md` §11.6. |
| Pricing card | Plan name, price, billing, features, Plan CTA; neutral/featured variants. | `FR-001`, `FR-003`; Figma `2141:1633`, `2141:1643`, `2141:1653`. |
| Countdown | Date label, four labeled units, one-second visual updates, light/dark variants. | `FR-009`; `DESIGN.md` §11.7. |
| Sign Up form | Five controls, validation, submission state, IndexedDB result feedback. | `FR-004`–`FR-008`, `FR-011`, `FR-012`. |
| Text field | Label, control, divider, default/hover/focus, invalid relationship. | `FR-006`, `AR-004`; Figma `10:503`. |
| Plan select | Label, native select, current selection, chevron, default/hover/focus, and the observed Basic supporting text. Pro/Ultimate supporting text is optional pending approval. | `FR-005`; Figma `10:512`; `SP-SIGNUP-007`. |
| Form status | Success or storage-failure message and announcement semantics. | `FR-008`, `FR-011`, `AR-006`; design gap/recommendation. |

## 14. Visual and interaction states

| State | Normative behavior | Evidence status |
|---|---|---|
| Default | Match the corresponding production-frame and component default appearance. | Confirmed; all six frames and component sets. |
| Hover | Apply the supplied Hover variant when a hover-capable pointer is over the control. Hover does not replace focus. | Confirmed; `10:526`, `10:531`, `10:567`, `10:503`, `10:512`. |
| Focus | Show a visible focus treatment independent of hover. Use the supplied component-family Focus variant where it exists. | Confirmed; component sets and interaction frames. |
| Active/pressed | Standard native activation feedback is permitted; no separate custom visual state is required. | Out of design scope. |
| Selected | Plan select displays the selected supported plan; Pro remains visually featured on Home. | Confirmed. |
| Select open | Browser/platform native menu and keyboard behavior. | Confirmed. |
| Disabled | No persistent disabled visual state is required. While a valid write is pending, repeated submission is behaviorally blocked under `SP-SUBMIT-009`. | No persistent Figma state; confirmed technical safeguard. |
| Loading/pending | No spinner or loading animation is required. The form exposes a programmatic busy state while a write is pending. | No Figma visual; confirmed technical safeguard. |
| Empty | Text controls begin empty; Plan begins with resolved plan context or Basic. | Confirmed. |
| Validation error | Invalid field is visibly identified, marked invalid, and associated with a field message. Exact visual treatment is open. | Confirmed behavior / design gap. |
| Storage failure | Values remain, success is absent, and visible/programmatic failure feedback is provided. | Confirmed behavior / design gap. |
| Success | Visible/programmatic confirmation follows transaction completion. Post-success form treatment is open. | Confirmed behavior / design gap. |

## 15. Keyboard and focus behavior

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-KEY-001` | Confirmed | Tab order follows meaningful DOM order and does not include decorative elements. | Traverse each page with Tab/Shift+Tab. | `AR-002`, `AR-005`; `DESIGN.md` §4. |
| `SP-KEY-002` | Confirmed | Navigation links activate with standard keyboard link behavior. | Activate each CTA and Sign Up logo using Enter. | `FR-002`, `FR-010`, `AR-002`. |
| `SP-KEY-003` | Confirmed | Submit activates with standard native button behavior, including Enter and Space when the button has focus. | Keyboard test. | `AR-002`. |
| `SP-KEY-004` | Confirmed | Plan retains native select keyboard operation and does not introduce a scripted keyboard model. | Exercise platform-standard select keys. | `FR-005`, `CON-004`. |
| `SP-KEY-005` | Confirmed | Focus remains visible at compact, medium, and large compositions and is not obscured by overflow clipping. | Keyboard test at all ranges. | `AR-003`, `RR-006`. |
| `SP-KEY-006` | Confirmed | Success and storage-failure announcements do not force focus away from the user’s current location. | Resolve transactions and inspect focus. | `AR-006`. |
| `SP-KEY-007` | Confirmed | No keyboard trap is introduced by the Plan select, form, decorative layers, or page transitions. | Keyboard traversal. | `AR-002`. |
| `SP-KEY-008` | Open | Automatic focus movement after validation is governed by recommended `SP-VAL-010` until approved. | Stakeholder/accessibility decision. | Current documents do not confirm it. |

## 16. Responsive specification

### 16.1 Reference-range recommendation

The requirements confirm `24rem`, `48rem`, and `80rem` and delegate exact testable boundary behavior to this specification. Stage 5 resolves them using mobile-first inclusive lower bounds:

| Range | Recommended inclusive/exclusive semantics | Composition |
|---|---|---|
| Narrow compact | `< 24rem` | Compact composition with additional content-fit wrapping when required. |
| Standard compact | `>= 24rem` and `< 48rem` | Compact composition represented by the 375 px frames. |
| Medium | `>= 48rem` and `< 80rem` | Medium composition represented by the 768 px frames. |
| Large | `>= 80rem` | Large composition represented by the desktop frames. |

At exactly `24rem`, `48rem`, and `80rem`, the range beginning at that threshold applies.

### 16.2 Responsive behavior

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-RWD-001` | Confirmed technical resolution | Use the exact ranges in §16.1. | Test immediately below, at, and immediately above each threshold. | `RR-001` delegates exact boundary behavior to SPEC; `DESIGN.md` §13.1. |
| `SP-RWD-002` | Confirmed | Layout is fluid between reference widths; no meaningful content overlaps, clips, or forces primary-flow horizontal scrolling. | Test intermediate widths and long content. | `RR-002`, `AR-008`, `NFR-002`. |
| `SP-RWD-003` | Confirmed | Compact Home centers the logo, places the decorative illustration before centered hero copy, stacks vertical pricing cards, and centers countdown/final CTA. | Compare with `2141:1813`. | `RR-003`; `DESIGN.md` §13.2. |
| `SP-RWD-004` | Confirmed | Medium Home keeps a two-column hero, stacks pricing cards, and uses horizontal summary/features anatomy within each card. | Compare with `2141:1724`. | `RR-003`; `DESIGN.md` §13.3. |
| `SP-RWD-005` | Confirmed | Large Home uses the centered 1110 px maximum content region, two-column hero, three-column pricing row, and left-countdown/right-CTA arrangement. | Compare with `2141:1599`. | `RR-003`; `DESIGN.md` §13.4. |
| `SP-RWD-006` | Confirmed | Compact Sign Up centers introduction/countdown, uses 16 px primary insets, 24 px form outer insets, and 20 px form internal horizontal padding at the 375 px reference. | Measure `2141:1940`. | `RR-004`; mobile reinspection. |
| `SP-RWD-007` | Confirmed | Medium Sign Up stacks centered introduction/countdown above the approximately 445 px form. | Compare with `2141:1896`. | `RR-004`; `DESIGN.md` §13.6. |
| `SP-RWD-008` | Confirmed | Large Sign Up uses the centered 1110 px content region, introduction/countdown left, and form right against the dark region. | Compare with `2141:1680`. | `RR-004`; `DESIGN.md` §13.7. |
| `SP-RWD-009` | Confirmed | The stale hidden tablet grid on compact Figma frames is not reproduced. | Inspect compact CSS/layout output. | `RR-005`; `FIGMA-AUDIT.md` §6.4. |
| `SP-RWD-010` | Confirmed | Pricing cards and the Sign Up form grow vertically for longer copy, errors, and statuses; Figma heights are not fixed production limits. | Long-content and feedback tests. | `CR-002`, `NFR-002`; `DESIGN.md` §§6.4, 11.10. |
| `SP-RWD-011` | Confirmed | Countdown tiles remain in one row when they fit. If one row would overflow at an unusually narrow width or with enlarged text, the group wraps rather than causing horizontal scrolling. Exact wrapped visual arrangement is not design-approved. | Test narrow width and enlarged text. | `AR-008`; `DESIGN.md` §§13.1–13.5, 20. |
| `SP-RWD-012` | Confirmed | Default, hover, and focus behavior remains available in every responsive range. | Interaction test in all ranges. | `RR-006`. |

## 17. Accessibility specification

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-A11Y-001` | Confirmed | Use native landmarks and controls where they express the required behavior; ARIA supplements rather than replaces native semantics. | Semantic/accessibility-tree review. | `AR-001`. |
| `SP-A11Y-002` | Confirmed | Each page has one clear H1; pricing plan names and other sections use a logical descending heading hierarchy. | Document outline review. | `AR-001`; `DESIGN.md` §§4–5. |
| `SP-A11Y-003` | Confirmed | Every interactive element has an accessible name that matches or includes its visible purpose. | Accessibility-name inspection. | `AR-001`, `AR-004`. |
| `SP-A11Y-004` | Confirmed | Required state, invalid state, and error descriptions are programmatically exposed for each form control. | Accessibility-tree review. | `AR-004`. |
| `SP-A11Y-005` | Confirmed | Success and storage failure are announced once when the state changes; countdown ticks are not announced every second. | Screen-reader test. | `AR-006`, `AR-007`. |
| `SP-A11Y-006` | Confirmed | Decorative SVGs are hidden from assistive technology and cannot receive focus. | Accessibility-tree and keyboard review. | `AR-005`. |
| `SP-A11Y-007` | Confirmed | Primary functionality remains usable with reduced motion; no motion is necessary to understand state. | Reduced-motion test. | `AR-010`. |
| `SP-A11Y-008` | Confirmed | Content reflows with narrow viewports, zoom, and enlarged text without loss of navigation, form controls, messages, or submit action. | Reflow/zoom/manual tests. | `AR-008`. |
| `SP-A11Y-009` | Confirmed deviation | Preserve current approved colors and focus variants, document known contrast failures, and do not claim full WCAG AA conformance. | Documentation and visual audit. | `AR-009`, `CON-007`; `DESIGN.md` §9. |
| `SP-A11Y-010` | Confirmed | Primary buttons retain the observed approximately 50 px height; form controls are not reduced below their comfortably operable 43–45 px reference solely to fit a viewport. | Measure controls across ranges. | Figma component evidence; `DESIGN.md` §15.6. |
| `SP-A11Y-011` | Confirmed | Each countdown is exposed as one named group containing four values, and every value remains programmatically associated with its visible unit label. | Inspect the accessibility tree on Home and Sign Up. | `FR-009`, `AR-001`; `DESIGN.md` §§11.7, 15.4. |

## 18. Content specification

### 18.1 Current placeholder content

The current release may use the following Figma copy while treating it as replaceable:

- Home heading: `A simple solution to complex tasks is coming soon`
- Home description: `Say goodbye to inefficient juggling of multiple apps, teams, and projects. Officelite is the new collaboration platform built with an intuitive interface to improve productivity.`
- Sign Up heading: `Work smarter. Save time.`
- Sign Up description: `Easily manage your projects. Get on the list and receive in-app perks available only to early subscribers. We are moving into final development and getting ready for official launch soon.`
- Generic CTA: `Get Started`
- Plan CTA: `Try for Free`
- Submit CTA: `Get on the list`
- Plans and features: the Basic, Pro, and Ultimate inventory recorded in `FIGMA-AUDIT.md` §10.

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-CONTENT-001` | Confirmed | Marketing, pricing, feature, and launch-date content can be replaced without changing the required information architecture. | Replace all placeholder strings. | `CR-001`, `BR-007`. |
| `SP-CONTENT-002` | Confirmed | Content wraps and containers grow; required text is not truncated with ellipsis solely to preserve Figma height. | Long-string test. | `CR-002`, `NFR-002`. |
| `SP-CONTENT-003` | Confirmed | Countdown labels remain `days`, `hours`, `min`, and `sec`; the visible date remains English `DD Mon YYYY`. | Inspect rendered labels/date. | `CR-003`, `CR-005`. |
| `SP-CONTENT-004` | Confirmed | The current release has one language and requires no locale switcher or translated variants. | Scope review. | `CR-005`, `NG-004`. |
| `SP-CONTENT-005` | Confirmed | Validation, success, and failure messages must be non-empty, outcome-specific, and understandable without color alone. Exact wording remains provisional. | Content/accessibility review. | `FR-006`, `FR-008`, `FR-011`, `CR-004`. |
| `SP-CONTENT-006` | Open | No approved character limits or final copy lengths exist. | Product/content decision. | `CR-004`, `DR-005`. |

## 19. Error handling and recovery

| Condition | Required response | Recovery |
|---|---|---|
| Empty or whitespace-only required field | Prevent storage; show associated field error; mark field invalid. | User edits field and resubmits. |
| Malformed email | Prevent storage; show associated Email Address error; mark field invalid. | User edits email and resubmits. |
| Unsupported Plan value | Prevent storage; show associated Plan error; resolve to a supported option before storage. | User selects Basic, Pro, or Ultimate. |
| IndexedDB unavailable or open failure | Show/announce storage failure; do not show success; keep values. | Retry if the environment later permits storage. |
| IndexedDB transaction abort/rejection | Show/announce storage failure; do not show success; keep values. | Retry; duplicate policy remains open. |
| Repeated activation during pending write | No concurrent IndexedDB write starts; expose programmatic busy state. | Await current result. |
| Decorative SVG unavailable | Meaningful content and interaction remain present; exact spacing fallback is not Figma-defined. | No user action required. |
| Future launch-date API slow/fails | Out of current scope; placeholder source remains the current boundary. | Future API specification required. |
| Countdown reaches zero | Out of scope. | Future product decision required. |

## 20. Edge cases

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-EDGE-001` | Confirmed | Long marketing, plan, field-label, validation, success, and failure text wraps without hiding controls or feedback. | Substitute long strings. | `CR-002`, `NFR-002`. |
| `SP-EDGE-002` | Confirmed | Missing decorative assets do not create a broken-image announcement or remove meaningful content. | Block asset loading. | `AR-005`, `SP-GLOBAL-006`; decorative assets are not essential content. |
| `SP-EDGE-003` | Confirmed | Unsupported incoming Plan context falls back to Basic. | Navigate with unsupported context. | Same confirmed resolution as `SP-NAV-004`. |
| `SP-EDGE-004` | Confirmed | IndexedDB unavailable is handled as storage failure. | Disable/mock IndexedDB. | `FR-011`. |
| `SP-EDGE-005` | Confirmed | No primary-flow horizontal scrolling appears at the 375 px reference or intermediate widths due to content, focus rings, or feedback. | Test reference/intermediate widths. | `AR-008`, `RR-002`, `RR-004`. |
| `SP-EDGE-006` | Recommended | Static brand, product, pricing, date label, and page copy remain readable when JavaScript fails; countdown updates and IndexedDB submission may be unavailable. | Disable JavaScript and inspect static content. | `NFR-007`; `DESIGN.md` §19 inference. |
| `SP-EDGE-007` | Open | Runtime behavior for missing required build-time content is undefined; required content should be treated as an authoring/configuration defect rather than silently invented. | Content pipeline decision. | No source defines runtime content fetching. |
| `SP-EDGE-008` | Open | Duplicate submission identity and deduplication are undefined. | Product/data decision. | `DR-007`. |

## 21. Relevant non-functional requirements

| Specification ID | Status | Required behavior | Verification | Requirement / design evidence |
|---|---|---|---|---|
| `SP-NFR-001` | Confirmed | Implementation, tests, and later tasks reference applicable requirement and specification IDs. | Traceability review. | `NFR-003`. |
| `SP-NFR-002` | Confirmed | Current behavior operates without a production backend or sign-up API. | Run the full flow offline from remote application services. | `CON-006`. |
| `SP-NFR-003` | Confirmed direction | Preserve the documented Astro and TypeScript direction unless Stage 6 repository reinspection establishes a documented deviation. Exact architecture remains Stage 6 work. | Repository/architecture review. | `NFR-004`, `CON-002`. |
| `SP-NFR-004` | Confirmed | Existing matching SVG assets are reused rather than visually redrawn. | Asset/source review. | `CON-005`. |
| `SP-NFR-005` | Open | No quantitative performance budget is approved. No numeric threshold is introduced here. | Documentation review. | `NFR-005`. |
| `SP-NFR-006` | Open | No browser-support matrix is approved. IndexedDB and native-select assumptions must be evaluated in architecture/planning. | Browser-support decision. | `NFR-006`, `A-004`. |
| `SP-NFR-007` | Confirmed deviation | Known contrast risks remain documented and prevent a full WCAG AA claim. | Accessibility report/documentation. | `AR-009`, `CON-007`. |

## 22. Acceptance criteria

### 22.1 Home and navigation

- [ ] Home contains all required content regions in the required order.
- [ ] Basic, Pro, and Ultimate are present; Pro is visually featured.
- [ ] Both generic CTAs open Sign Up with Basic selected.
- [ ] Each Plan CTA opens Sign Up with its matching plan selected.
- [ ] Direct Sign Up entry selects Basic.
- [ ] Unsupported incoming plan context falls back to Basic.
- [ ] All Home navigation is usable by keyboard.

### 22.2 Sign Up and validation

- [ ] Sign Up contains the logo link, heading, copy, countdown, five fields, and submit button.
- [ ] Plan uses a native select with exactly three supported options.
- [ ] Every control has a persistent programmatic label.
- [ ] Every current field is required; whitespace-only text values are invalid; email uses native syntax validation.
- [ ] Invalid values prevent every IndexedDB write attempt.
- [ ] Invalid fields expose visible, field-specific, programmatically associated feedback.
- [ ] Values persist through validation and storage failure.

### 22.3 Persistence and feedback

- [ ] A valid submission attempts one IndexedDB transaction containing the five required values.
- [ ] Success is not displayed before the transaction completes.
- [ ] Successful completion creates visible and politely announced confirmation.
- [ ] Storage failure creates visible and announced failure, never success.
- [ ] Storage failure preserves entered values and permits retry where technically possible.
- [ ] No form record is sent to a remote endpoint.
- [ ] Repeated activation during a pending write starts no concurrent transaction and exposes a programmatic busy state.

### 22.4 Countdown

- [ ] Home and Sign Up display the same target date and four units.
- [ ] The date uses `DD Mon YYYY`; labels are `days`, `hours`, `min`, `sec`.
- [ ] Values update visually once per second.
- [ ] The countdown recalculates from wall-clock time after timer throttling.
- [ ] Values below 10 use at least two digits and values above two digits are not truncated.
- [ ] One-second ticks are not announced as a live stream.
- [ ] No zero-state behavior is claimed.

### 22.5 Responsive and visual states

- [ ] Home and Sign Up match their compact, medium, and large composition intent.
- [ ] The 1110 px large maximum content intent is preserved.
- [ ] The 375 px Sign Up composition preserves 16 px content insets, 24 px form insets, and 20 px form padding.
- [ ] The stale compact Figma grid is not implemented.
- [ ] Default, hover, and focus states work at every responsive range.
- [ ] Long content and feedback grow containers without clipping or primary-flow horizontal scrolling.
- [ ] Countdown tiles wrap rather than overflow when one row cannot fit.
- [ ] Exact threshold tests pass immediately below, at, and immediately above `24rem`, `48rem`, and `80rem`.

### 22.6 Accessibility

- [ ] Native roles, labels, headings, and landmarks are correct.
- [ ] Pointer and keyboard users can complete the full current flow.
- [ ] Focus is visible and not clipped.
- [ ] Decorative graphics are ignored by assistive technology.
- [ ] Success and failure are announced without unexpected focus movement.
- [ ] Reduced motion does not remove functionality.
- [ ] The accepted contrast deviation is recorded and no full WCAG AA claim is made.

## 23. Requirement-to-specification traceability

### 23.1 Goals, user needs, non-goals, and dependencies

| Source ID | Specification coverage |
|---|---|
| `G-001` | Home content, hierarchy, plans, countdown, and responsive structure in §§6–7, 12–18. |
| `G-002` | Plan-context navigation and selection in §§7.2–8.1. |
| `G-003` | Validation, IndexedDB storage, and result feedback in §§9–11. |
| `G-004` | Keyboard, focus, responsive, and accessibility behavior in §§14–17. |
| `G-005` | Current local-only boundary and future API deferrals in §§4, 11–12, 21. |
| `UN-001` | Home proposition and single-page information hierarchy in §§6–7. |
| `UN-002` | Ordered and comparable pricing cards in §7.1. |
| `UN-003` | Generic and plan CTA navigation in §7.2. |
| `UN-004` | Plan-context preservation in §§7.2–8.1. |
| `UN-005` | Transaction-aware success and failure feedback in §§10, 19. |
| `UN-006` | Compact, medium, large, and intermediate-width behavior in §16. |
| `UN-007` | Native semantics, keyboard operation, focus, validation, and announcements in §§9, 15, 17. |
| `NG-001` | No backend, remote processor, or submission API in §§4.2, 10–11, 21. |
| `NG-002` | Countdown zero-state explicitly excluded in §§4.2, 12. |
| `NG-003` | Anti-spam, consent, privacy, retention, and production governance excluded or open in §§4.2, 11, 25. |
| `NG-004` | Single-language content and no localization in §§4.2, 12, 18. |
| `NG-005` | Current copy, prices, features, and date remain placeholders in §18. |
| `NG-006` | Current palette and accepted contrast deviation in §§17, 21. |
| `NG-007` | No account, authentication, or authorization behavior in §4.2. |
| `NG-008` | No user-facing local-record listing, editing, export, or deletion in §4.2. |
| `DEP-001` | Figma and design evidence referenced throughout and summarized in §24. |
| `DEP-002` | IndexedDB current persistence boundary in §§10–11. |
| `DEP-003` | Future launch-date API remains open in §§12, 19, 25. |
| `DEP-004` | Future sign-up API remains outside scope in §§4.2, 10–11. |
| `DEP-005` | Final content and feedback approvals remain open in §§18, 25. |

### 23.2 Requirements

| Requirement | Primary specification coverage |
|---|---|
| `FR-001` | `SP-HOME-001`–`SP-HOME-005`, `SP-RWD-003`–`SP-RWD-005` |
| `FR-002` | `SP-NAV-001`, `SP-NAV-002`, `SP-NAV-005` |
| `FR-003` | `SP-NAV-002`, `SP-SIGNUP-004` |
| `FR-004` | `SP-SIGNUP-001`, `SP-FORM-001`–`SP-FORM-005` |
| `FR-005` | `SP-SIGNUP-005`, `SP-SIGNUP-006`, `SP-KEY-004` |
| `FR-006` | `SP-FORM-003`, `SP-VAL-001`–`SP-VAL-009` |
| `FR-007` | `SP-SUBMIT-001`–`SP-SUBMIT-008`, `SP-DATA-001`–`SP-DATA-003` |
| `FR-008` | `SP-SUBMIT-003`, `SP-SUBMIT-004`, `SP-FEEDBACK-001`, `SP-FEEDBACK-003` |
| `FR-009` | `SP-COUNT-001`–`SP-COUNT-008` |
| `FR-010` | `SP-SIGNUP-002`, `SP-KEY-002` |
| `FR-011` | `SP-SUBMIT-005`, `SP-SUBMIT-006`, `SP-FEEDBACK-002`–`SP-FEEDBACK-004` |
| `FR-012` | `SP-NAV-001`, `SP-NAV-003`, `SP-SIGNUP-003`, `SP-SIGNUP-004` |
| `BR-001`–`BR-007` | §§7–12, 18–20 |
| `DR-001`–`DR-007` | §§10–11, 19–20 |
| `AR-001`–`AR-010` | §§14–17, 22.6 |
| `RR-001`–`RR-006` | §16, §22.5 |
| `CR-001`–`CR-005` | §18, `SP-EDGE-001` |
| `NFR-001`–`NFR-007` | §§10, 16, 20–21 |
| `CON-001`–`CON-007` | §§2, 4, 11, 13, 17, 21 |

## 24. Figma and design traceability

| Evidence area | Figma / design reference | Specification sections |
|---|---|---|
| Home large/medium/compact | `2141:1599`, `2141:1724`, `2141:1813`; `DESIGN.md` §§5, 13 | §§7, 16 |
| Sign Up large/medium/compact | `2141:1680`, `2141:1896`, `2141:1940`; `DESIGN.md` §§5, 13 | §§8–10, 16 |
| CTA states | `10:526`, `10:531`, `10:567`; interaction frames `2141:2441`, `2141:2542` | §§7, 14–15 |
| Text-field states | `10:503`; interaction frames `2141:2387`, `2141:2638` | §§8–9, 14–15 |
| Plan-select states | `10:512` | §§8, 14–15 |
| Countdown | Production frames; `DESIGN.md` §11.7 | §§12, 16, 18 |
| Feedback gap | No Figma state; `DESIGN.md` §§12.6, 14, 20 | §§9–10, 14, 19 |
| Foundations and assets | `2141:938`, `2141:935`; `DESIGN.md` §§8–11, 16–17 | §§13–18, 21 |

## 25. Assumptions, recommendations, and open questions

### 25.1 Confirmed and provisional assumptions

- Basic is the initial Plan for generic and direct entry.
- Basic, Pro, and Ultimate are the complete supported Plan set.
- All five visible fields remain required for this release, provisionally.
- A future date source will provide a countdown-compatible target; its contract is unknown.
- Current browsers used by the project are assumed to support IndexedDB until a browser matrix is approved.

### 25.2 Recommendations requiring approval

1. `SP-VAL-010`: Move focus to the first invalid control after failed submission.
2. `SP-FEEDBACK-006`: Use one form-level status region between fields and submit, with polite success and assertive failure semantics.
3. `SP-SIGNUP-007`: Update supporting Plan price text for Pro and Ultimate using the pricing inventory.
4. `SP-EDGE-006`: Preserve static product and pricing content when JavaScript fails.

### 25.3 Open questions

1. What exact validation, success, and storage-failure copy is approved?
2. What visual styling, iconography, and spacing are approved for field errors, success, and storage failure?
3. After successful storage, do fields remain visible, clear, disable, or get replaced?
4. Should duplicate submissions be allowed, rejected, or update an existing record, and what retention duration applies?
5. What browser-support matrix is required?
6. What timezone and payload shape will the future launch-date API provide?
7. Should the Plan control show supporting price text for Pro and Ultimate, and what exact `Pack` labels should be used?
8. At extreme copy lengths, is unrestricted vertical growth acceptable or should content limits be introduced?

**Stage 6 architecture decision required:** Define the IndexedDB database name, object-store name, schema version, key strategy, and any identifier/timestamp needed for implementation under `SP-DATA-004`.

## 26. Review pass 1 — Completeness and correctness

Completed checks:

- Defined scope, exclusions, terminology, functional behavior, content, conceptual patterns, states, interactions, keyboard/focus, responsiveness, accessibility, data, validation, error handling, edge cases, non-functional constraints, and acceptance criteria.
- Translated all twelve confirmed functional requirements into observable specifications.
- Tied IndexedDB success to transaction completion and storage failure to rejected/incomplete transactions.
- Preserved native Plan behavior and did not specify a custom popup.
- Defined field validation without inventing phone, company, name, or character-limit rules.
- Defined one-second display, non-announcement, whole-unit formatting, and wall-clock catch-up behavior.
- Kept countdown zero-state, production APIs, final content, data governance, browser matrix, and quantitative performance outside confirmed scope.
- Covered default, hover, focus, active, selected, disabled, pending/loading, empty, error, and success states with explicit evidence status.

Corrections made during this pass:

- Separated confirmed validation/error semantics from unapproved visual treatment.
- Separated concurrent-pending protection from the unresolved duplicate-record policy.
- Kept post-success form treatment open rather than assuming fields clear or disappear.
- Confirmed unsupported Plan fallback from the existing Basic-default rule.
- Resolved `24rem`, `48rem`, and `80rem` boundary semantics as a SPEC-owned technical decision.

## 27. Review pass 2 — Consistency, traceability, and uncertainty

Completed checks:

- Verified coverage of `FR-001`–`FR-012`, business/data rules, accessibility, responsive, content, non-functional, and constraint groups.
- Mapped material specification groups to `DESIGN.md` sections and Figma nodes.
- Preserved Pro visual emphasis while keeping Basic as the generic/direct default.
- Preserved the stale-mobile-grid exclusion and actual compact inset relationships.
- Preserved the accepted contrast deviation and avoided a WCAG AA claim.
- Kept recommended focus movement, status-region placement, Plan supporting-price mapping, and JavaScript fallback visibly unapproved.
- Confirmed technical resolutions for whitespace handling, native email validity, unsupported-Plan fallback, pending duplicate protection, countdown calculation/catch-up, breakpoint boundaries, and decorative-asset failure.
- Delegated IndexedDB names, version, key, and identifier/timestamp choices to Stage 6; kept duplicate, retention, future API, browser-support, feedback-copy, and post-success decisions open.
- Avoided repository paths, concrete modules, database names, or implementation sequence.

No contradiction prevents architecture and planning. Breakpoint mapping is now normative; the remaining form-feedback placement and Plan supporting-price recommendations still require approval before they become fidelity requirements.

## 28. Stage completion

- **File reviewed and modified:** `SPEC.md`
- **Important findings:** The confirmed behavior is sufficient to specify navigation, native Plan selection, current validation, IndexedDB transaction outcomes, countdown updates, responsive compositions, keyboard operation, and accessible feedback semantics.
- **Recommendations remaining:** First-invalid focus, form-level status-region placement, Plan supporting-price mapping, and static-content resilience without JavaScript.
- **Open questions:** Final feedback copy/visuals, post-success form treatment, duplicate/retention policy, browser support, future date API contract, Plan supporting labels, and extreme content limits.
- **Deviations:** Current color contrast risk remains accepted; full WCAG AA conformance is not claimed.
- **Stage 5 review:** Cross-document corrections and remaining uncertainties are recorded in `DOCUMENT-REVIEW.md`.
- **Blockers:** None for architecture and planning. Product/design choices remain implementation gates for their related tasks.
- **Readiness:** **Ready for architecture and planning.**
