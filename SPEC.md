---
artifact: SPEC
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Specification

## 1. Document Information

- Lifecycle status is owned by the canonical CLI record; narrative review completed in two passes.
- Scope: observable and testable Home, Sign Up, countdown, validation, local persistence, responsive, and accessibility behavior.
- Last updated: 2026-08-13
- Source baseline: `SOURCE-BASELINE.md`
- Related requirements: approved `REQUIREMENTS.md`
- Related design intent: approved `DESIGN.md`
- Evidence baseline: approved `DESIGN-AUDIT.md`
- Active inputs: `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`

## 2. Purpose and Scope

This specification converts approved outcomes and design intent into behavior that can be implemented and verified without returning to the mutable design source for ordinary decisions. It defines observable results and conceptual interfaces; repository paths, component boundaries, state-management structure, persistence schema mechanics, and task order remain downstream responsibilities.

### Included

- Complete Home and Sign Up content and connected navigation.
- Basic, Pro, and Ultimate entry intent and native Plan selection.
- Required-field and email validation, error timing, correction, and focus recovery.
- Browser-local IndexedDB persistence, single in-flight submission, success/failure feedback, and retry.
- Countdown calculation against `2026-12-31T00:00:00-03:00` and permanent all-zero expiry.
- Supplied and intermediate responsive behavior, state/content edges, semantic structure, keyboard operation, visible focus, names/relationships, and announcements.
- Production build and manual validation expectations already approved in `REQUIREMENTS.md`.

### Excluded

- Remote launch or sign-up APIs, backend processing, authentication, authorization, analytics, and deployment changes.
- Duplicate detection, identity verification, data synchronization, cross-device storage, retention/deletion policy, or remote privacy guarantees.
- A custom select/combobox, custom route transition, animated countdown, or unapproved modal/menu pattern.
- Browser matrix, numeric performance target, formal WCAG conformance claim, or unsupported validation formats.
- Repository structure, exact route encoding, database/store/key names, schema version, and implementation task order.

## 3. Terminology

| Term | Definition |
|---|---|
| Home | The promotional entry experience with hero, pricing, countdown, and five actions. |
| Sign Up | The distinct form experience reached directly or from Home. |
| Generic Home action | The hero or final countdown “Get Started” action; it carries no plan-specific intent. |
| Plan action | The Basic, Pro, or Ultimate pricing-card action; it carries its matching plan intent. |
| Recognized plan intent | One of the canonical values Basic, Pro, or Ultimate. |
| Accepted submission | A form state that passes all current-release validation and whose IndexedDB transaction completes successfully. |
| In-flight submission | The interval after a valid submit attempt starts a persistence operation and before its transaction completes, errors, or aborts. |
| Visible error | Field-specific text plus non-color visual emphasis shown only after the applicable validation trigger. |
| Programmatic announcement | A status exposed through an appropriate live-region or alert semantic so assistive technology receives the outcome without moving focus solely to discover it. |
| Launch target | The absolute instant `2026-12-31T00:00:00-03:00`. |
| Supplied widths | Home 375, 768, and 1440; Sign Up 375, 768, and 1321 CSS pixels. They are validation samples, not prescribed breakpoints. |

## 4. Behavioral Specifications

### SPEC-BEH-001 — Home content and hierarchy

- **Requirement references:** `REQ-FR-001`, `REQ-BR-001`, `REQ-BR-005`, `REQ-NFR-003`
- **Design references:** `DES-001`–`DES-006`
- **Source snapshots:** `SRC-DS-001`, `SRC-DOC-001`
- **Required behavior:** Home presents the brand; hero heading, description, action, and dashboard illustration; Basic/Pro/Ultimate plan cards in that order; the launch overline and four-unit countdown; and the final action. Each plan shows its approved placeholder name, price, billing summary, three features, and plan action without interchange.
- **Applicable states:** default responsive compositions, action Hover/Focus, and live/expired countdown.
- **Acceptance criteria:** `AC-001`, `AC-002`, `AC-034`, `AC-036`, `AC-037`

### SPEC-BEH-002 — Sign Up content and hierarchy

- **Requirement references:** `REQ-FR-002`, `REQ-FR-006`, `REQ-NFR-003`
- **Design references:** `DES-001`, `DES-006`–`DES-009`
- **Source snapshots:** `SRC-DS-001`, `SRC-DOC-001`
- **Required behavior:** Sign Up presents the linked brand, route heading and description, launch overline and countdown, and one form with Name, Email Address, Plan, Phone Number, Company, and “Get on the list” in that order. The form also owns pending, success, validation, and storage-failure feedback without removing required content.
- **Applicable states:** default responsive compositions, field/select/action states, validation, persistence pending/success/failure, and expired countdown.
- **Acceptance criteria:** `AC-003`, `AC-010`, `AC-011`, `AC-034`, `AC-036`, `AC-037`

### SPEC-BEH-003 — Plan-intent resolution

- **Requirement references:** `REQ-FR-003`, `REQ-FR-005`, `REQ-BR-002`
- **Design references:** `DES-002`, `DES-003`, `DES-INT-001`, `DES-INT-003`
- **Source snapshots:** `SRC-DOC-001`, `SRC-DS-001`
- **Required behavior:** Basic, Pro, and Ultimate plan actions initialize Sign Up to their matching plan. A generic Home action, direct Sign Up entry, missing intent, or unrecognized intent initializes Basic. After initialization, an explicit user selection becomes the current value used by validation and persistence.
- **Applicable states:** direct/generic/plan-specific entry, missing/unrecognized intent, and user-changed selection.
- **Acceptance criteria:** `AC-005`, `AC-007`–`AC-011`

### SPEC-BEH-004 — Countdown calculation and presentation

- **Requirement references:** `REQ-FR-012`, `REQ-BR-006`
- **Design references:** `DES-006`, `DES-INT-006`
- **Source snapshots:** `SRC-DS-001`, `SRC-DOC-001`
- **Required behavior:** Each route displays “Coming 31 Dec 2026.” On initial client readiness and once per second thereafter, it calculates `remaining = max(0, launch target − current time)`. Before the target, remaining whole seconds are rounded upward so zero is not shown early, then decomposed into total days plus 0–23 hours, 0–59 minutes, and 0–59 seconds. Hours/minutes/seconds and days below 10 use at least two digits; larger day values are not truncated. At or after the target, all units are `00` and no further visual change is required.
- **Applicable states:** future, boundary instant, expired, delayed/backgrounded page resumption.
- **Acceptance criteria:** `AC-022`–`AC-024`

### SPEC-BEH-005 — Countdown recovery after delayed execution

- **Requirement references:** `REQ-FR-012`
- **Design references:** `DES-INT-006`
- **Source snapshots:** `SRC-DOC-001`
- **Required behavior:** Each update derives values from the current clock and launch target rather than decrementing prior display state. If execution is throttled or paused, the next update catches up to current time; it does not replay missed seconds or drift from the target.
- **Applicable states:** background tab, suspended device, delayed callback, resumed route.
- **Acceptance criteria:** `AC-023`, `AC-024`

### SPEC-BEH-006 — Home responsive transformation

- **Requirement references:** `REQ-FR-001`, `REQ-NFR-001`, `REQ-NFR-002`
- **Design references:** `DES-RWD-001`–`DES-RWD-003`, `DES-RWD-006`
- **Source snapshots:** `SRC-DS-001`
- **Required behavior:** At 1440, Home matches the large side-by-side hero, three-card row, and horizontal countdown/action composition. At 768, hero remains side by side with the smaller illustration, pricing becomes stacked horizontal cards, and countdown/action stack centrally. At 375, illustration is visually placed before centered hero copy, pricing becomes stacked vertical cards, and the launch region remains centered. Between samples, the current composition remains until it would cause overlap, clipping, unreadable measures, material target compression, or layout-caused horizontal scrolling; then it changes toward the next supplied composition without hiding content.
- **Applicable states:** supplied, intermediate, unusually narrow, and wide viewports; long content/error-independent Home content.
- **Acceptance criteria:** `AC-001`, `AC-002`, `AC-034`, `AC-035`

### SPEC-BEH-007 — Sign Up responsive transformation

- **Requirement references:** `REQ-FR-002`, `REQ-NFR-001`, `REQ-NFR-002`
- **Design references:** `DES-RWD-004`–`DES-RWD-006`, `DES-009`
- **Source snapshots:** `SRC-DS-001`
- **Required behavior:** At 1321, intro/countdown and form use the supplied split composition. At 768 and 375, intro and countdown center above the form, and the white form bridges the light and dark regions. Form controls remain one column and fluid within a capped card. Field/status text expands card/page height without overlap. Between samples, stacking occurs when readable intro and form widths cannot coexist beside the dark region. No material content is hidden.
- **Applicable states:** supplied and intermediate widths; default, validation, pending, success, and failure content.
- **Acceptance criteria:** `AC-003`, `AC-034`, `AC-035`

### SPEC-BEH-008 — Very narrow and wide resilience

- **Requirement references:** `REQ-NFR-001`, `REQ-NFR-002`
- **Design references:** `DES-RWD-003`, `DES-RWD-005`, `DES-RWD-006`
- **Source snapshots:** `SRC-DS-001`
- **Required behavior:** Beyond the largest samples, content remains capped and centered while outer whitespace grows. Below the compact sample, gutters and repeatable gaps may contract while controls remain operable. If four countdown units cannot remain readable in one row without horizontal page scrolling, they form a two-by-two grid in the same days/hours/minutes/seconds order. Material copy, controls, and feedback wrap or expand vertically rather than being clipped.
- **Applicable states:** representative widths beyond the supplied samples, including layout stress from long status/error text.
- **Acceptance criteria:** `AC-035`

## 5. Interaction Specifications

### SPEC-INT-001 — Home-to-Sign-Up navigation

- **Pattern:** Standard page navigation.
- **Source snapshots and evidence:** `SRC-DS-001`, `EVD-004`; `REQ-FR-003`, `REQ-FR-005`; `DES-INT-001`.
- **Trigger:** Pointer activation or standard keyboard activation of any Home action.
- **Preconditions:** Home is active.
- **Result:** The Sign Up experience loads. Plan actions supply their recognized intent; generic actions supply Basic behavior.
- **Keyboard behavior:** Link/button semantics provide their standard activation behavior; no custom key binding is added.
- **Focus behavior:** Navigation uses the destination page's normal initial focus/reading behavior; no modal-style focus transfer or trapping occurs.
- **Closing or cancellation behavior:** Not applicable to page navigation. Browser Back remains available through ordinary history behavior.
- **Accessible state and relationships:** Each action has an accessible name matching its visible purpose/context.
- **Failure behavior:** An unsupported/missing plan intent does not block navigation and defaults to Basic.
- **Acceptance criteria:** `AC-004`, `AC-005`, `AC-007`–`AC-009`, `AC-029`

### SPEC-INT-002 — Sign Up logo return

- **Pattern:** Standard linked-brand navigation.
- **Source snapshots and evidence:** `SRC-DS-001`, `EVD-004`; `REQ-FR-004`; `DES-INT-002`.
- **Trigger:** Pointer or keyboard activation of the Sign Up logo link.
- **Preconditions:** Sign Up is active.
- **Result:** Home loads.
- **Keyboard behavior:** Standard link activation.
- **Focus behavior:** The logo has visible focus; destination uses normal page navigation behavior.
- **Closing or cancellation behavior:** Not applicable.
- **Accessible state and relationships:** Accessible name communicates the Officelite Home destination.
- **Failure behavior:** None beyond ordinary navigation failure; no custom fallback route is specified.
- **Acceptance criteria:** `AC-006`, `AC-029`, `AC-030`

### SPEC-INT-003 — Native Plan selection

- **Pattern:** Native single-select form control, not a custom listbox/combobox/menu.
- **Source snapshots and evidence:** `SRC-DOC-001`, `EVD-006`, `AUD-006`; `REQ-FR-005`, `REQ-FR-006`; `DES-INT-003`.
- **Trigger:** Pointer or platform-standard keyboard operation of Plan.
- **Preconditions:** Sign Up form is available.
- **Result:** The closed control displays the current choice and the selected canonical value becomes Basic, Pro, or Ultimate.
- **Keyboard behavior:** Preserve the browser/platform's standard select keys and open/close behavior; do not override them with custom menu bindings.
- **Focus behavior:** Focus remains governed by the native control and has a clearly visible indicator.
- **Closing or cancellation behavior:** Platform-native behavior applies; canceling an open menu preserves the prior selection.
- **Accessible state and relationships:** A persistent Plan label is associated with the select. Options expose “Basic Pack — Free,” “Pro Pack — $9.99,” and “Ultimate Pack — $19.99” while their persisted canonical values are Basic, Pro, and Ultimate.
- **Failure behavior:** Missing/unrecognized navigation intent initializes Basic; the user can still choose another option.
- **Acceptance criteria:** `AC-008`–`AC-011`, `AC-028`–`AC-030`

### SPEC-INT-004 — Form submission lifecycle

- **Pattern:** Native form submission event enhanced with client-side validation and local asynchronous persistence.
- **Source snapshots and evidence:** `SRC-DOC-001`, `EVD-016`; `REQ-FR-007`–`REQ-FR-011`; `DES-INT-004`, `DES-INT-005`.
- **Trigger:** Submit-button activation or standard form submission from a control.
- **Preconditions:** Sign Up form is available and no persistence operation is in flight.
- **Result:** Invalid input follows `SPEC-VAL-001`/`SPEC-VAL-002` and performs no write. Valid input captures an immutable candidate snapshot, starts exactly one IndexedDB transaction for that snapshot, shows “Saving your details…”, and prevents an additional write until that transaction settles. Edits made after capture do not mutate the in-flight record and apply only to a later submit attempt.
- **Keyboard behavior:** The submit action is reachable and activatable through native keyboard behavior. The submit control is not disabled before validation merely to hide errors.
- **Focus behavior:** Invalid submission focuses the first invalid control in DOM order. A valid in-flight, success, or failure transition does not move focus solely to expose status; the programmatic announcement supplies the outcome.
- **Closing or cancellation behavior:** No dialog opens. An in-flight operation has no user cancellation control.
- **Accessible state and relationships:** The form exposes its in-flight state programmatically; status text is associated with the form and announced according to `SPEC-ACC-004`.
- **Failure behavior:** Transaction error/abort/unavailability follows `SPEC-VAL-003`; input remains and retry becomes available after the operation settles.
- **Acceptance criteria:** `AC-012`–`AC-021`, `AC-025`, `AC-026`, `AC-029`, `AC-032`, `AC-033`

### SPEC-INT-005 — Field validation timing and correction

- **Pattern:** Native constraint validation with synchronized inline visual/programmatic feedback.
- **Source snapshots and evidence:** `SRC-DOC-001`, `AUD-004`, `AUD-005`; `REQ-FR-007`, `REQ-FR-008`, `REQ-AR-004`; `DES-007`, `DES-008`, `DES-INT-004`.
- **Trigger:** A field loses focus after user interaction, or the user attempts form submission.
- **Preconditions:** The field is available and not covered by a current in-flight transaction.
- **Result:** An invalid field receives its specific message and non-color emphasis. Initial untouched fields do not display errors. After an error is visible, input/change reevaluates it and removes the invalid state as soon as the relevant constraint passes.
- **Keyboard behavior:** Errors do not block Tab/Shift+Tab traversal or correction.
- **Focus behavior:** Blur validation does not pull focus back. Submit validation focuses only the first invalid field; later invalid fields retain visible/programmatic associations for discovery.
- **Closing or cancellation behavior:** Correcting a field clears its error; resetting behavior is not required because no reset control is in scope.
- **Accessible state and relationships:** `aria-invalid="true"` is present only while an exposed error is active; the control references the visible message through a supported error/description relationship.
- **Failure behavior:** If enhanced styling is unavailable, native invalidity and visible text still communicate the failure; validation must not depend solely on a pseudo-class.
- **Acceptance criteria:** `AC-012`–`AC-015`, `AC-028`, `AC-031`

### SPEC-INT-006 — Post-transaction recovery

- **Pattern:** Inline persistent form status.
- **Source snapshots and evidence:** `SRC-DOC-001`; `REQ-FR-010`, `REQ-FR-011`; `DES-INT-005`.
- **Trigger:** IndexedDB transaction completes, errors, or aborts.
- **Preconditions:** One valid submission is in flight.
- **Result:** Completion shows “Thanks! Your submitted details have been saved on this device.” Error/abort shows “We couldn't save your details on this device. Please try again.” The control becomes available again after either outcome. Values and current Plan remain visible after both outcomes.
- **Keyboard behavior:** Retry uses the same submit action after failure.
- **Focus behavior:** Focus is not forcibly moved to the status; announcement communicates it. Existing focus remains usable.
- **Closing or cancellation behavior:** Editing a field after a settled outcome clears the stale outcome message. A later valid submit is a new attempt; no duplicate-content rejection is in scope.
- **Accessible state and relationships:** Success is a polite status; failure is an assertive alert/status appropriate to an unsuccessful requested action.
- **Failure behavior:** A retry repeats validation and starts a new transaction only if valid and no other transaction is active.
- **Acceptance criteria:** `AC-018`–`AC-021`, `AC-025`, `AC-032`, `AC-033`

## 6. Responsive Specifications

The observable responsive rules are owned by `SPEC-BEH-006`–`SPEC-BEH-008` and are validated at supplied widths plus representative intermediate/stress widths.

| Experience | Supplied large | Supplied medium | Supplied compact | Between/beyond behavior |
|---|---|---|---|---|
| Home hero | Side-by-side copy/illustration at 1440 | Side-by-side with smaller illustration at 768 | Centered stack with illustration visually before copy at 375 | Transform only before crowding, clipping, or overflow; logical heading/copy order stays stable |
| Pricing | Three-card row | Stacked horizontal cards | Stacked vertical cards | Preserve plan order/content and Pro emphasis; stack internal groups when horizontal fit fails |
| Home launch | Countdown/action horizontal | Centered vertical stack | Centered vertical stack | Four units remain ordered; use 2×2 only if narrow fit otherwise fails |
| Sign Up | Split intro/form composition at 1321 | Centered stack/form bridge at 768 | Centered compact stack/form bridge at 375 | Stack before readable intro/form widths collide; form height follows feedback content |
| Wide viewport | Capped large composition | N/A | N/A | Outer whitespace grows; content does not scale without limit |

No numeric breakpoint is specified by this artifact. Later implementation/plan work must choose and validate transition values against the listed failure conditions rather than treating 768 as an automatic CSS boundary.

## 7. State and Content Specifications

| State or edge | Observable behavior | Authority |
|---|---|---|
| Default | Match the six approved responsive compositions and content examples. | `EVD-002`, `EVD-003`, `REQ-FR-001`, `REQ-FR-002` |
| Hover | Apply the demonstrated primary/pricing/field hover differentiation only on devices that produce hover; content/geometry remains stable. | `EVD-012`, `DES-INT-007` |
| Focus | Every interactive element displays a visible focus indicator; hover is not used as a substitute. | `REQ-AR-003`, `DES-010` |
| Active/pressed | Native activation feedback may occur; no separate ornamental animation or persistent state is required. | `AUD-004`, `DESIGN.md` recommendation |
| Selected plan | Closed native select shows the current option; open/options UI remains platform-native. | `REQ-FR-005`, `REQ-FR-006`, `SPEC-INT-003` |
| Empty required field | Untouched initial state is neutral. After validation trigger, show “Name is required.”, “Email Address is required.”, “Select a plan.”, “Phone Number is required.”, or “Company is required.” as applicable. | `REQ-FR-007`, `SPEC-VAL-001` |
| Invalid email | After validation trigger, show “Enter a valid email address.”; do not impose an additional project regex. | `REQ-FR-008`, `SPEC-VAL-002` |
| In flight | Show “Saving your details…”, expose busy state, allow exactly one transaction, and retain values. | `SPEC-INT-004`, `SPEC-VAL-004` |
| Success | Show/announce “Thanks! Your submitted details have been saved on this device.” only after transaction completion; preserve values until edited/navigation. | `REQ-FR-010`, `SPEC-INT-006` |
| Storage failure | Show/announce failure, report no success, preserve values, and allow retry. | `REQ-FR-011`, `SPEC-INT-006` |
| Countdown future | Display actual remaining time, at least two digits per unit where value is below 10. | `REQ-FR-012`, `SPEC-BEH-004` |
| Countdown expired | Keep four units and permanently display `00 / 00 / 00 / 00`; no replacement message. | `REQ-BR-006`, `AC-024` |
| Long text/value | Wrap material text and expand containers; native single-line controls retain standard value scrolling. No material label/error/status is ellipsized. | `REQ-NFR-002`, `DES-009` |
| Missing decoration | Core surface, content, layout, and interaction remain usable; no alternative text is announced. | `DES-004`, `REQ-AR-001` |
| Missing illustration | Hero copy/action remain complete; failed artwork does not create overflow or expose filename text. Alternative-text treatment is resolved by `SPEC-ACC-005`. | `REQ-NFR-001`, `AUD-012` |

The exact feedback strings above are Recommended gap resolutions made testable by this specification. They do not claim to have been observed in Figma; approval of `ART-SPEC` approves them for the current release.

## 8. Accessibility Specifications

### SPEC-ACC-001 — Page semantics and reading order

- **Source snapshot, requirement, or standard:** `SRC-DOC-001`, `EVD-002`, `EVD-003`, `AUD-005`, `AUD-012`; `REQ-AR-001`; `DESIGN.md` Section 4.
- **Semantic structure:** Each route declares English document language, a route-specific page title, one clear top-level heading, meaningful landmarks/sections, real links/actions, and a real form on Sign Up. Plan feature groups use meaningful list structure.
- **Accessible name and relationships:** Linked logo has a destination name; decorative orbits do not enter the accessibility tree.
- **Keyboard operation:** Semantic source order follows the logical reading sequence even where visual placement changes.
- **Focus order and visibility:** Sequential focus follows actionable visual/reading order; CSS visual reordering does not create a contradictory tab order.
- **Status or error announcements:** Owned by `SPEC-ACC-003`/`SPEC-ACC-004`.
- **Reflow, contrast, touch target, or reduced-motion behavior:** Content remains available under responsive reflow; no formal conformance level is claimed.
- **Requirement reference:** `REQ-AR-001`, `REQ-AR-002`
- **Acceptance criteria:** `AC-027`, `AC-029`

### SPEC-ACC-002 — Keyboard operation and focus visibility

- **Source snapshot, requirement, or standard:** `SRC-DOC-001`, `EVD-012`, `AUD-012`; `REQ-AR-002`, `REQ-AR-003`; `DES-010`.
- **Semantic structure:** Links, native select, text inputs, and submit button use their native interaction semantics.
- **Accessible name and relationships:** Every focusable control has a persistent accessible name.
- **Keyboard operation:** Tab/Shift+Tab reaches each interactive element in logical order. Enter/Space behavior follows the native element; native select keys are not overridden.
- **Focus order and visibility:** A visible focus indicator appears on every focused interactive element against light, blue, and dark surfaces and is not clipped.
- **Status or error announcements:** Focus is not moved to a status solely to cause announcement.
- **Reflow, contrast, touch target, or reduced-motion behavior:** The observed 50px buttons and approximately 43–45px visible controls are preserved without material shrinkage. On coarse pointers, associated labels and available control padding enlarge the activation area without changing field order or claiming an unsupported numeric project threshold; no focus animation is required.
- **Requirement reference:** `REQ-AR-002`, `REQ-AR-003`
- **Acceptance criteria:** `AC-029`, `AC-030`

### SPEC-ACC-003 — Form names, required state, and errors

- **Source snapshot, requirement, or standard:** `SRC-DOC-001`, `AUD-005`; `REQ-AR-001`, `REQ-AR-004`; `DES-007`, `DES-008`.
- **Semantic structure:** Name, Email Address, Plan, Phone Number, and Company have persistent visible labels associated with native controls. All expose required state through native semantics. Name and Company use text inputs; Email Address uses a single-address email input; Phone Number uses a telephone input; Plan uses a native select. Name, Email Address, Phone Number, and Company expose the standard `name`, `email`, `tel`, and `organization` autofill purposes respectively.
- **Accessible name and relationships:** Each visible field error has a unique relationship to its control using a supported error/description mechanism.
- **Keyboard operation:** Users can reach, edit, and revalidate every field without a pointer.
- **Focus order and visibility:** Invalid submit focuses the first invalid field; blur validation never steals focus.
- **Status or error announcements:** `aria-invalid` is synchronized with an exposed visual error, not present on untouched initial fields. Focusing an invalid field exposes its specific message through the relationship.
- **Reflow, contrast, touch target, or reduced-motion behavior:** Error text expands layout and uses text/non-color indication; it is not overlaid or clipped.
- **Requirement reference:** `REQ-AR-001`, `REQ-AR-004`
- **Acceptance criteria:** `AC-028`, `AC-031`

### SPEC-ACC-004 — Transaction and countdown announcements

- **Source snapshot, requirement, or standard:** `SRC-DOC-001`, `AUD-012`; `REQ-AR-005`; `DES-INT-005`, `DES-INT-006`.
- **Semantic structure:** One form-status region presents pending/success/failure text. Countdown values form one labeled group.
- **Accessible name and relationships:** Status is associated with the form; countdown units expose clear labels.
- **Keyboard operation:** No status requires focus to be understood or dismissed.
- **Focus order and visibility:** Status is not added to sequential focus unless it contains a later explicit control.
- **Status or error announcements:** Pending/success use polite status behavior; storage failure uses assertive alert/status behavior. The once-per-second countdown is not a live region and must not announce every tick.
- **Reflow, contrast, touch target, or reduced-motion behavior:** Status text wraps and remains visible. Countdown changes directly without motion.
- **Requirement reference:** `REQ-AR-005`
- **Acceptance criteria:** `AC-019`, `AC-021`, `AC-032`, `AC-033`

### SPEC-ACC-005 — Images, contrast, reflow, and reduced motion

- **Source snapshot, requirement, or standard:** `SRC-DS-001`, `EVD-008`, `EVD-013`, `AUD-012`; `REQ-NFR-001`–`REQ-NFR-003`; `DES-004`, `DES-005`.
- **Semantic structure:** Orbits are decorative. The dashboard illustration is treated as decorative/redundant when adjacent hero text supplies the complete product message; it receives an empty alternative rather than repeating nearby copy.
- **Accessible name and relationships:** Brand logo meaning is supplied by its linked accessible name, not duplicated filename text.
- **Keyboard operation:** Images create no focus target unless they are part of the linked logo.
- **Focus order and visibility:** Decoration cannot obscure focus indicators.
- **Status or error announcements:** Missing decorative/image assets do not create announcements.
- **Reflow, contrast, touch target, or reduced-motion behavior:** Validate actual text/control/focus contrast rather than claiming it from tokens; preserve content at supplied/intermediate widths and zoom/reflow stress; no essential motion or reduced-motion exception exists.
- **Requirement reference:** `REQ-AR-001`, `REQ-AR-003`, `REQ-NFR-001`, `REQ-NFR-002`
- **Acceptance criteria:** `AC-027`, `AC-030`, `AC-034`–`AC-037`

## 9. Data and Interface Specifications

### SPEC-DATA-001 — Plan-intent interface

- **Source documentation snapshot:** `SRC-DOC-001`
- **Inputs:** Basic, Pro, Ultimate, absent, or unrecognized navigation intent.
- **Outputs:** Current Plan select value.
- **Required and optional fields:** Intent is optional for generic/direct entry; recognized plan actions supply it.
- **Defaults:** Basic for absent/unrecognized/generic entry.
- **Validation ownership:** Only the three canonical values are recognized; `SPEC-BEH-003` owns fallback.
- **Persistence or synchronization:** The current form value is used for the sign-up record. Cross-session navigation-state persistence is not required.
- **Error conditions:** An unsupported value falls back to Basic without user-facing error.
- **Acceptance criteria:** `AC-005`, `AC-007`–`AC-009`

### SPEC-DATA-002 — Sign-up input data

- **Source documentation snapshot:** `SRC-DOC-001`
- **Inputs:** Name, Email Address, Plan, Phone Number, Company.
- **Outputs:** One immutable candidate snapshot containing the five current values at the instant a valid submit attempt begins.
- **Required and optional fields:** All five are required; no extra user-provided field is in scope.
- **Defaults:** Plan follows `SPEC-DATA-001`; other fields initially have no value.
- **Validation ownership:** `REQ-BR-003`, `SPEC-VAL-001`, and `SPEC-VAL-002`.
- **Persistence or synchronization:** The captured snapshot is passed to `SPEC-DATA-003` only after validation succeeds. Edits after capture are not applied to that transaction. No content normalization, deduplication, or additional format rule is specified beyond native required/email constraints.
- **Error conditions:** Invalid candidate data never starts an accepted write.
- **Acceptance criteria:** `AC-012`–`AC-016`, `AC-025`, `AC-026`

### SPEC-DATA-003 — IndexedDB transaction boundary

- **Source documentation snapshot:** `SRC-DOC-001`
- **Inputs:** One valid immutable candidate snapshot from `SPEC-DATA-002`.
- **Outputs:** Completed or failed/aborted transaction outcome.
- **Required and optional fields:** A stored record preserves all five submitted values. A technical key or metadata may be defined only by later approved architecture; no additional product field is required here.
- **Defaults:** None.
- **Validation ownership:** Candidate validity is complete before this interface starts.
- **Persistence or synchronization:** Start one browser-local IndexedDB write per valid attempt. Acceptance occurs only on transaction completion. No form data is sent to a remote sign-up service.
- **Error conditions:** IndexedDB unavailability, opening/schema failure, request error, transaction error, or abort produce the same user-visible failure outcome; they never produce success.
- **Acceptance criteria:** `AC-016`–`AC-021`, `AC-025`, `AC-026`

### SPEC-DATA-004 — Countdown time interface

- **Source documentation snapshot:** product-owner decision recorded in `REQUIREMENTS.md`; `SRC-DOC-001` establishes the future-API exclusion.
- **Inputs:** Current clock and immutable current-release target `2026-12-31T00:00:00-03:00`.
- **Outputs:** Non-negative days, hours, minutes, seconds plus expired state.
- **Required and optional fields:** Both inputs required; no remote response is in scope.
- **Defaults:** Target is fixed for this release. Invalid/missing runtime target configuration is an implementation defect, not a user-selectable state.
- **Validation ownership:** `SPEC-BEH-004`, `SPEC-BEH-005`.
- **Persistence or synchronization:** No persistence required; calculate on each render/update.
- **Error conditions:** Clock delay/throttling is corrected on the next calculation; values never go negative.
- **Acceptance criteria:** `AC-022`–`AC-024`

## 10. Validation and Error Specifications

### SPEC-VAL-001 — Required-value validation

- **Condition:** A submit attempt occurs with Name, Email Address, Plan, Phone Number, or Company failing its native required constraint; or an interacted field loses focus while failing that constraint.
- **Prevented or permitted action:** Submission is prevented; no IndexedDB write starts.
- **User feedback:** Show the field-specific required message listed in Section 7 and non-color invalid emphasis.
- **Programmatic relationship or announcement:** Expose invalid state only when feedback is shown and associate the message with its control.
- **Recovery:** User supplies a value; on input/change, clear the message and invalid state as soon as the required constraint passes.
- **References:** `REQ-FR-007`, `REQ-AR-004`, `DES-007`, `SPEC-INT-005`; `AC-012`, `AC-013`, `AC-031`

### SPEC-VAL-002 — Email syntax validation

- **Condition:** Email Address has a value but fails the browser's single-address `type=email` validity.
- **Prevented or permitted action:** Submission is prevented; no IndexedDB write starts.
- **User feedback:** Show “Enter a valid email address.” No additional project regex, domain check, confirmation field, or remote verification is applied.
- **Programmatic relationship or announcement:** Same exposed invalid state/message relationship as `SPEC-VAL-001`.
- **Recovery:** User enters a value accepted by the native email constraint; feedback clears on reevaluation.
- **References:** `REQ-FR-008`, `REQ-AR-004`, `SPEC-INT-005`; `AC-014`, `AC-015`, `AC-031`

### SPEC-VAL-003 — IndexedDB failure and retry

- **Condition:** Database open/request/transaction errors, aborts, or IndexedDB is unavailable.
- **Prevented or permitted action:** The candidate is not accepted; no success state is permitted.
- **User feedback:** Show “We couldn't save your details on this device. Please try again.” Keep all current form values and restore submit availability.
- **Programmatic relationship or announcement:** Announce the failure assertively once per failed attempt.
- **Recovery:** A later submit revalidates current values and, if valid, starts one new transaction. No automatic retry or remote fallback occurs.
- **References:** `REQ-FR-011`, `REQ-AR-005`, `SPEC-INT-006`; `AC-020`, `AC-021`, `AC-033`

### SPEC-VAL-004 — Concurrent duplicate-action prevention

- **Condition:** A valid IndexedDB transaction is already in flight and another submit activation occurs.
- **Prevented or permitted action:** No second transaction starts. The submit action is temporarily unavailable and the form exposes busy state until the first transaction settles.
- **User feedback:** “Saving your details…” remains visible; no duplicate pending message is added.
- **Programmatic relationship or announcement:** Busy state is exposed once; repeated activation does not cause repeated announcements.
- **Recovery:** After success/failure, the submit action becomes available. A deliberate later submission is a new attempt; duplicate-content detection is not in scope.
- **References:** `REQ-BR-004`, `REQ-FR-009`–`REQ-FR-011`, `DES-INT-005`

## 11. Non-functional Behavior

- **Responsive/compatibility:** At 375, 768, Home 1440, and Sign Up 1321 widths, supplied composition/content relationships hold without unintended clipping, overlap, or layout-caused horizontal page scrolling. Representative intermediate/narrow/wide stress conditions exercise `SPEC-BEH-006`–`SPEC-BEH-008`. No browser matrix is claimed.
- **Visual fidelity:** Side-by-side review covers hierarchy, role-based typography/colors, spacing/radius relationships, card/form/control proportions, decorative asset roles, and demonstrated Default/Hover/Focus differentiation. Approved label/error/status additions are explained deviations rather than source mismatches.
- **Reliability:** Success occurs only after IndexedDB transaction completion; an error/abort can be retried and does not erase values where browser state permits preservation.
- **Security/privacy boundary:** Current form values stay within browser-local IndexedDB and are not transmitted to a remote sign-up service. This is not a general retention, encryption, privacy, or device-security guarantee.
- **Build:** `pnpm build` from `frontend/` must exit successfully in the verified Linux/Node/pnpm environment.
- **Performance:** No numeric threshold exists. Countdown work occurs once per second and derives from current time; it must not create a per-second accessibility announcement.
- **Maintainability:** Use semantic/native platform behavior where it directly satisfies the specification. Exact repository modules and architectural boundaries are intentionally deferred.

References: `REQ-BR-005`, `REQ-NFR-001`–`REQ-NFR-004`, `REQ-SEC-001`, `REQ-CON-001`–`REQ-CON-005`.

## 12. Acceptance Criteria Validation Matrix

`AC-001`–`AC-038` remain owned and defined by approved `REQUIREMENTS.md`; this matrix operationalizes them without redefining their identity.

| Criterion | Preconditions / trigger | Observable result | Validation method |
|---|---|---|---|
| `AC-001`, `AC-002` | Render Home at 375/768/1440 | All hierarchy and exact plan examples/actions are present in Basic/Pro/Ultimate order | Side-by-side responsive inspection |
| `AC-003` | Render Sign Up at 375/768/1321 | Brand, intro, countdown, five labeled controls, submit, and form-status location are present | Side-by-side responsive/semantic inspection |
| `AC-004`–`AC-006` | Activate five Home actions and Sign Up logo by pointer and keyboard | Each reaches the required destination; plan actions carry matching intent | Navigation/history checks |
| `AC-007`–`AC-009` | Enter directly, generically, with each plan, unknown plan; then change selection | Basic fallback or matching initial option appears; user change becomes current value | Entry-state matrix and form-value inspection |
| `AC-010`, `AC-011` | Inspect and operate Plan | Actual native select exposes exactly three choices and standard pointer/keyboard operation | DOM/accessibility inspection plus manual keyboard test |
| `AC-012`, `AC-013` | Attempt submission with each required value absent in turn | No write; each affected field gets its specific visible message | Constraint and IndexedDB inspection |
| `AC-014`, `AC-015` | Submit invalid then native-valid email with other fields valid | Invalid is blocked with email message; valid passes that rule | Input case matrix |
| `AC-016`, `AC-025` | Submit fully valid data and wait for transaction completion | One local record preserves the five submitted values | IndexedDB database/object-store inspection |
| `AC-017` | Submit valid data while observing network | No request containing form data reaches a remote sign-up service | DevTools/network inspection |
| `AC-018`, `AC-019`, `AC-032` | Complete a valid transaction | Local-device success appears only after completion and is announced politely | Delayed/controlled transaction and accessibility-tree/live-region check |
| `AC-020`, `AC-021`, `AC-033` | Force open/request/transaction failure | Failure appears/announces, success does not, values remain, retry is available | Controlled failure injection/manual inspection |
| `AC-022`–`AC-024` | Evaluate known clocks before, near, at, and after target; pause/resume | Units match ceiling/decomposition rules, catch up, never go negative, and remain all zero after target | Controllable clock/timer checks |
| `AC-026` | Submit each invalid case and inspect persistence | No accepted record is created | IndexedDB before/after inspection |
| `AC-027`, `AC-028` | Inspect rendered DOM/accessibility tree | Language/title/landmarks/headings/form semantics and persistent labels/required relationships are meaningful | DOM and accessibility-tree inspection |
| `AC-029`, `AC-030` | Traverse complete flow with keyboard | Logical order, native operation, correction, submit, and visible unclipped focus work on all surfaces | Manual Tab/Shift+Tab/Enter/Space/select-key testing |
| `AC-031` | Expose each field error | Control exposes invalid state and references its visible message only when error is active | DOM/accessibility-tree inspection |
| `AC-034` | Review 375/768/Home 1440/Sign Up 1321 in default and feedback states | Supplied composition outcomes hold with no overlap, clipping, or layout-caused horizontal scroll | Screenshot/viewport inspection |
| `AC-035` | Test representative intermediate, narrower, and wider stress widths | Content remains readable/operable; transformations follow failure conditions; narrow countdown falls back if needed | Responsive sweep/manual stress test |
| `AC-036`, `AC-037` | Compare supplied widths and state specimens | No unexplained material visual divergence; Default/Hover/Focus remain distinguishable | Side-by-side screenshots and state checks |
| `AC-038` | Run repository build in verified environment | Command exits successfully | `pnpm build` from `frontend/` |

Additional specification-level acceptance checks:

- `AC-039`: An untouched initial form shows no field errors or `aria-invalid="true"`; after blur of an interacted invalid field or invalid submit, visual and programmatic invalid states appear together. References: `SPEC-INT-005`, `SPEC-ACC-003`.
- `AC-040`: After a visible field error, correction clears both the visible message and programmatic invalid state as soon as that field's constraint passes. References: `SPEC-INT-005`, `SPEC-VAL-001`, `SPEC-VAL-002`.
- `AC-041`: An invalid submit focuses the first invalid control in DOM order without preventing later fields from exposing their own associated errors. References: `SPEC-INT-004`, `SPEC-ACC-003`.
- `AC-042`: While one valid write is in flight, repeated submit activation starts no second transaction; after settlement, submit becomes available. References: `SPEC-INT-004`, `SPEC-VAL-004`.
- `AC-043`: Editing any field after a settled success/failure clears the stale transaction message while preserving the edited values. References: `SPEC-INT-006`.
- `AC-044`: Countdown ticks update visually without producing a once-per-second live-region announcement. References: `SPEC-BEH-004`, `SPEC-ACC-004`.
- `AC-045`: Responsive visual placement does not create a DOM/focus order that contradicts the logical content/action sequence. References: `SPEC-BEH-006`, `SPEC-BEH-007`, `SPEC-ACC-001`.
- `AC-046`: Email uses native single-address validity; phone uses a telephone input type without an unapproved format pattern; Name and Company have no unapproved content-format restriction. The four text-like controls expose the approved autofill purposes. References: `SPEC-ACC-003`, `SPEC-DATA-002`, `SPEC-VAL-002`.
- `AC-047`: A valid submit persists the immutable values captured at that attempt; edits made while the write is pending do not mutate its record and can be persisted only by a later valid submit. References: `SPEC-INT-004`, `SPEC-DATA-002`, `SPEC-DATA-003`.

Each additional criterion is validated by DOM/accessibility inspection plus the manual or controllable interaction case stated in its owning specification.

## 13. Assumptions, Risks, and Open Questions

### Assumptions

- A browser with functional client-side JavaScript and IndexedDB is required for the local persistence outcome; unsupported/unavailable IndexedDB uses the defined failure path rather than a remote fallback.
- Browser-native constraint validity is the authority for `required` and single-address email syntax. No extra trimming, phone, name, company, domain, or duplicate-content rule is assumed.
- Standard route navigation can carry conceptual plan intent; Stage 6 owns the structural mechanism and exact encoding.
- The Figma state boards are appearance specimens, not simultaneous runtime states or a focus-order diagram.
- The supplied placeholder marketing/pricing content remains display content for this release.

### Risks

| Risk | Observable impact | Mitigation / owning stage | Blocking |
|---|---|---|---|
| IndexedDB behavior varies by browser/storage mode | Failure may be hard to reproduce | Stage 6 defines controllable boundary; validation forces open/request/transaction failures | No |
| Exact feedback strings were absent from sources | A future copy revision could change validation expectations | Current strings were explicitly disclosed and approved with `ART-SPEC`; any later change must update specification and validation together | No |
| Font source remains unregistered | Typography fidelity/provenance may fail | Resolve before implementation planning | Potential later blocker |
| No browser/WCAG matrix | Validation could overclaim | Report only tested conditions and confirmed outcomes | No |
| Mutable Figma input | Visual target may drift | Reverify Time-bound source before later reliance | No while `VER-007` remains current |
| Native select appearance varies by platform | Pixel identity of the open state is impossible | Validate semantics/options/focus and only the closed role-based appearance | No |

### Blocking questions

- None for Stage 4.

### Resolved by Stage 4 approval

- `ferfalcon` approved the exact current-release validation, pending, success, and storage-failure strings in Sections 7 and 10 together with the specified focus, recovery, and transaction-state behavior.

### Non-blocking open questions

- What approved repository-safe source/hosting strategy will provide Kumbh Sans?
- Does a later stage establish a browser matrix or formal WCAG conformance target?
- What exact IndexedDB database/store/key/schema mechanism will Stage 6 approve?

## 14. Traceability

| Specification | Snapshot | Requirement | Design evidence or decision | Acceptance criteria | Validation |
|---|---|---|---|---|---|
| `SPEC-BEH-001`, `SPEC-BEH-002` | `SRC-DS-001`, `SRC-DOC-001` | `REQ-FR-001`, `REQ-FR-002`, `REQ-BR-005`, `REQ-NFR-003` | `DES-001`–`DES-009`, `EVD-002`, `EVD-003` | `AC-001`–`AC-003`, `AC-034`, `AC-036`, `AC-037` | Supplied-width content/visual review |
| `SPEC-BEH-003`, `SPEC-DATA-001` | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-003`, `REQ-FR-005`, `REQ-FR-006`, `REQ-BR-002` | `DES-002`, `DES-003`, `DES-INT-001`, `DES-INT-003` | `AC-005`, `AC-007`–`AC-011` | Entry/selection matrix |
| `SPEC-BEH-004`, `SPEC-BEH-005`, `SPEC-DATA-004` | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-012`, `REQ-BR-006` | `DES-006`, `DES-INT-006` | `AC-022`–`AC-024`, `AC-044` | Controllable clock/timer checks |
| `SPEC-BEH-006`–`SPEC-BEH-008` | `SRC-DS-001` | `REQ-NFR-001`, `REQ-NFR-002` | `DES-RWD-001`–`DES-RWD-006` | `AC-034`, `AC-035`, `AC-045` | Responsive sweep/stress review |
| `SPEC-INT-001`, `SPEC-INT-002` | `SRC-DS-001`, `SRC-DOC-001` | `REQ-FR-003`–`REQ-FR-005`, `REQ-AR-002`, `REQ-AR-003` | `DES-INT-001`, `DES-INT-002`, `EVD-004` | `AC-004`–`AC-006`, `AC-029`, `AC-030` | Navigation and keyboard checks |
| `SPEC-INT-003` | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-005`, `REQ-FR-006` | `DES-INT-003`, `AUD-006` | `AC-008`–`AC-011`, `AC-028`–`AC-030` | Native-control inspection |
| `SPEC-INT-004`–`SPEC-INT-006` | `SRC-DOC-001` | `REQ-FR-007`–`REQ-FR-011`, `REQ-AR-004`, `REQ-AR-005` | `DES-007`–`DES-009`, `DES-INT-004`, `DES-INT-005` | `AC-012`–`AC-021`, `AC-031`–`AC-033`, `AC-039`–`AC-043`, `AC-047` | Validation/transaction cases |
| `SPEC-ACC-001`–`SPEC-ACC-005` | `SRC-DOC-001`, `SRC-DS-001` | `REQ-AR-001`–`REQ-AR-005`, `REQ-NFR-001`, `REQ-NFR-002` | `DES-004`, `DES-005`, `DES-007`, `DES-008`, `DES-010` | `AC-027`–`AC-037`, `AC-039`–`AC-045` | DOM/a11y tree/manual checks |
| `SPEC-DATA-002`, `SPEC-DATA-003` | `SRC-DOC-001` | `REQ-BR-003`, `REQ-DR-001`, `REQ-DR-002`, `REQ-SEC-001` | `DES-INT-004`, `DES-INT-005` | `AC-016`–`AC-021`, `AC-025`, `AC-026`, `AC-042`, `AC-046`, `AC-047` | IndexedDB/network inspection |
| `SPEC-VAL-001`–`SPEC-VAL-004` | `SRC-DOC-001`, `SRC-DS-001` | `REQ-FR-007`–`REQ-FR-011`, `REQ-AR-004`, `REQ-AR-005` | `DES-007`, `DES-008`, `DES-INT-004`, `DES-INT-005` | `AC-012`–`AC-021`, `AC-031`–`AC-033`, `AC-039`–`AC-043`, `AC-046` | Constraint/error/retry/concurrency cases |
| Non-functional Section 11 | `SRC-REPO-001`, `SRC-DOC-001`, `SRC-DS-001` | `REQ-BR-005`, `REQ-NFR-001`–`REQ-NFR-004`, `REQ-SEC-001`, `REQ-CON-001`–`REQ-CON-005` | `DESIGN.md` Sections 5, 7, 10, 12, 13 | `AC-017`, `AC-034`–`AC-038`, `AC-044`, `AC-045` | Visual, network, accessibility, build checks |

## 15. Review

### Pass 1 — Completeness and correctness

- [x] Material behavior, interactions, states, responsive behavior, accessibility, data, validation, errors, and edge cases are testable.
- [x] The specification does not prescribe implementation paths or task order without a genuine constraint.
- [x] Snapshot IDs in metadata exist and support the specified behavior.

Review status: completed on 2026-08-13.

Findings and corrections:

- Lifecycle status and baseline are owned by the canonical CLI record. Stage 5 removed manually duplicated record-owned fields from narrative frontmatter while retaining the three-source artifact baseline in the registry.
- The initial transaction text did not specify whether edits made after valid submission could alter an in-flight IndexedDB record. `SPEC-INT-004`, `SPEC-DATA-002`, `SPEC-DATA-003`, and `AC-047` now require an immutable snapshot captured at the submit attempt.
- Exact validation/pending/success/failure text was absent from the sources. The proposed strings are now explicit, testable, and labeled as Recommended gap resolutions whose approval belongs to `ART-SPEC`, rather than being presented as Figma evidence.
- Native input types, autofill purposes, native single-address email validity, native select behavior, error timing, concurrent-action prevention, and delayed-countdown recovery were made observable. No extra phone/name/company pattern, remote fallback, or duplicate-content rule was introduced.
- An identifier/reference audit found 27 unique `SPEC-*` definitions and nine new `AC-*` definitions (`AC-039`–`AC-047`), with no duplicates, AC ownership collision, or unresolved exact requirement/design/evidence/acceptance reference.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Identifiers follow `Identifier-Conventions.md`.
- [x] Every material specification maps to requirements and relevant pinned design or documentation evidence.
- [x] No source changed silently after the artifact baseline was recorded.
- [x] No arbitrary breakpoint, focus rule, threshold, or unsupported behavior is presented as confirmed.
- [x] Open questions and assumptions remain visible.

Review status: completed on 2026-08-13.

Findings and corrections:

- A modern-web best-practice draft clause proposed a 48px coarse-pointer target. Because the project has no approved numeric touch-target threshold and the source fields are 43–45px high, the number was removed. The specification retains only the supported non-shrink/associated-label/padding intent.
- Responsive rules were compared to `DES-RWD-001`–`DES-RWD-006`; supplied widths remain evidence samples, transformations use observable content-failure conditions, and the narrow two-by-two countdown is identifiable as a requirement-driven fallback rather than a source-observed breakpoint.
- Accessibility focus rules were checked against the actual interaction patterns: page links use navigation behavior, Plan stays a native select, validation focuses the first invalid control only on invalid submit, and statuses announce without modal/menu-style focus movement.
- Source authority remains consistent: Figma owns demonstrated composition/states, approved requirements own product behavior, the 2026-08-13 `ferfalcon` decision owns the target/expiry rule, and the approved specification owns the clearly disclosed feedback/focus/recovery gap resolutions.
- Active verification remains current: `VER-007` confirms the Time-bound Figma scope unchanged; `VER-008` keeps repository HEAD at `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`; `VER-009` keeps README SHA-256 at `72bee1d93b40d80643935b254499a9d3c0f3fd280392ad94eb4f4c6cf57fb1af`. `frontend/`, `README.md`, and `docs/starter-code/` remain unchanged.
- Architecture ownership is preserved: route-intent encoding and IndexedDB database/store/key/schema mechanics remain undecided for Stage 6. Font sourcing and browser/conformance targets remain visible non-blocking questions; exact current-release copy is approved.
