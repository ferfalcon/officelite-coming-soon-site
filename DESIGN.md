---
artifact: DESIGN
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Design

## 1. Document Information

- Lifecycle status is owned by the canonical CLI record; narrative review completed in two passes.
- Scope: visual, responsive, content, interaction, and accessibility intent for the Home and Sign Up experiences.
- Last updated: 2026-08-13
- Source baseline: `SOURCE-BASELINE.md`
- Evidence baseline: approved `DESIGN-AUDIT.md`
- Related requirements: approved `REQUIREMENTS.md`
- Active inputs: `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`

## 2. Purpose and Intent

The experience should feel focused, calm, and credible: generous light surfaces introduce Officelite and its plans, saturated blue creates a clear action path, and dark patterned regions frame the launch moment. Home leads from product promise to plan comparison to urgency; Sign Up shortens that story into reassurance, launch context, and one clear transaction.

Across both routes, the hierarchy should remain obvious before decorative detail: brand, route-specific heading, supporting information, primary action or form, and launch context. Responsive transformations preserve this order while changing composition to fit the available space. Repeated controls and cards should read as one coherent system rather than one-off reproductions.

The source is authoritative for visual hierarchy, supplied compositions, example content, and demonstrated Default/Hover/Focus appearances. Approved requirements and the explicit product-owner countdown decision are authoritative for behavior the source does not demonstrate.

## 3. Source and Scope

- **Design snapshot:** `SRC-DS-001`, a Time-bound snapshot of Figma page `4:3` “🤖 Workflow” in file `L7MdLOW8usVUcPwV0cMQ1n`.
- **Included regions:** Home `2141:2383`, Sign Up `2141:2386`, Interaction States `2141:2949`, Foundations `2141:938`, and Components `2141:935`.
- **Included Home evidence:** 1440 `2141:1599`, 768 `2141:1724`, and 375 `2141:1813`.
- **Included Sign Up evidence:** 1321 `2141:1680`, 768 `2141:1896`, and 375 `2141:1940`.
- **Included state evidence:** Home Hover `2141:2441`, Home Focus `2141:2542`, Sign Up Hover `2141:2387`, and Sign Up Focus `2141:2638`.
- **Excluded:** all other Figma pages, the linked live site, unshown runtime states, and any redesign beyond requirement-driven gap resolution.
- **Limitations:** the Figma URL has no named version or checksum-backed export; it remains mutable and was last recorded `Unchanged` by `VER-007`. The repository and brief are immutably pinned and were last recorded `Unchanged` by `VER-008` and `VER-009`.

This document cites the approved evidence index `EVD-001`–`EVD-016` and findings `AUD-001`–`AUD-013`; it does not treat a mutable URL as an immutable design revision.

## 4. Information Architecture and Reading Order

### Home

1. Officelite brand.
2. Product promise: “A simple solution to complex tasks is coming soon.”
3. Supporting copy and primary “Get Started” action.
4. Product dashboard illustration.
5. Pricing comparison in Basic, Pro, Ultimate order.
6. Launch overline and days/hours/minutes/seconds countdown.
7. Final “Get Started” action.

The large and medium visual compositions place hero copy beside the illustration, while the compact composition visually moves the illustration ahead of the copy. The semantic reading order should keep the heading and its explanation before the decorative/product illustration so assistive-technology order does not change merely to reproduce visual placement.

### Sign Up

1. Officelite brand, which also provides the return path to Home.
2. “Work smarter. Save time.” heading and supporting copy.
3. Launch overline and countdown.
4. Sign-up form in Name, Email Address, Plan, Phone Number, Company, submit order.
5. Submission outcome associated with the form.

The form is the route's primary action. Launch context supports rather than interrupts completion, and transaction feedback belongs near the form while remaining programmatically announced.

### Route relationship

Every Home action reaches Sign Up. Plan actions carry Basic, Pro, or Ultimate intent; generic entry uses Basic. The Sign Up logo returns to Home. These are connected pages, not separate promotional concepts. Evidence: `EVD-004`, `REQ-FR-003`–`REQ-FR-006`.

## 5. Screen and Layout Structure

### Home structure

- A centered content region establishes the header, hero, and plan grid at large widths; the supplied desktop evidence uses an approximately 1110px content span.
- The hero balances text/action and the dashboard illustration against a light surface with cropped orbit decoration.
- The pricing region overlaps or bridges the light page and dark launch region, making the plans the transition from explanation to urgency.
- Basic and Ultimate use light cards. Pro uses the primary blue surface and inverse text/action treatment to create visual emphasis without changing plan order.
- The launch region uses a dark surface, large orbit decoration, four repeatable countdown units, and a final primary action.
- Page height remains content-driven; no composition should force the stacked compact content into the desktop frame height.

### Sign Up structure

- Large composition uses a light main region and a dark patterned side region. Intro/countdown occupy the left and the form card sits prominently across the right-side split.
- Medium and compact compositions stack intro, countdown, and form. The dark region begins behind the lower part of the composition so the form visually bridges the two surfaces.
- The form is a white elevated card with a single-column control flow. Its width is capped by the supplied large/medium form size and contracts with available compact width.
- Decorative patterns may crop at the viewport boundary; informational content and interactive controls may not be clipped.

### Overflow and width behavior

- Primary content is centered within a fluid inline gutter and a composition-specific maximum width.
- Text wraps naturally. Cards and form controls contract only until readable content and operable target sizes would fail, at which point the applicable responsive transformation occurs.
- Decorative vectors can overflow and be clipped by their visual region. The page itself must not gain horizontal scrolling from layout or decoration.
- Large canvases do not imply that content should grow indefinitely beyond the supplied composition; whitespace expands around capped content.

Evidence: `EVD-002`, `EVD-003`, `EVD-005`, `EVD-006`, `AUD-002`, `AUD-003`; requirements `REQ-NFR-001`–`REQ-NFR-003`.

## 6. Design Decisions

### DES-001 — Preserve the light-to-dark narrative

- **Classification:** Observed
- **Intent:** Use light, spacious introduction and comparison surfaces followed by a dark patterned launch region. On Sign Up, let the white form bridge the light and dark regions.
- **Evidence:** `EVD-002`, `EVD-003`, `EVD-008`, `EVD-013` in `SRC-DS-001`.
- **Requirement references:** `REQ-FR-001`, `REQ-FR-002`, `REQ-NFR-003`.
- **Implications:** Dark regions frame launch urgency; they do not replace the readable content hierarchy or become full-page visual noise.

### DES-002 — Keep one dominant action path

- **Classification:** Observed
- **Intent:** Saturated blue marks primary progress actions. Secondary plan actions remain visually quieter, while the highlighted Pro card uses an inverse action treatment.
- **Evidence:** `EVD-005`, `EVD-008`, `EVD-010`, `EVD-012`.
- **Requirement references:** `REQ-FR-003`, `REQ-FR-005`, `REQ-NFR-003`.
- **Implications:** Repeated “Get Started” and “Try for Free” controls share shape, weight, and state language; prominence comes from context and variant, not arbitrary new styles.

### DES-003 — Emphasize Pro without changing comparison order

- **Classification:** Observed
- **Intent:** Keep Basic, Pro, Ultimate in that order and distinguish Pro with the blue card/inverse style.
- **Evidence:** `EVD-002`, `EVD-005`, `EVD-008`, `EVD-010`.
- **Requirement references:** `REQ-FR-001`, `REQ-FR-005`, `REQ-BR-001`.
- **Implications:** Responsive stacking preserves the same sequence and Pro emphasis; emphasis does not imply an unapproved “recommended” claim.

### DES-004 — Treat orbit artwork as atmosphere, not content

- **Classification:** Inferred
- **Intent:** Use orbit patterns as cropped, non-interactive background decoration that reinforces depth without entering the reading order.
- **Evidence:** `EVD-002`, `EVD-003`, `EVD-010`, `EVD-013`; `AUD-011`.
- **Requirement references:** `REQ-AR-001`, `REQ-NFR-003`, `REQ-CON-005`.
- **Implications:** If decoration fails to render, the experience remains understandable and operable.

### DES-005 — Keep the dashboard illustration subordinate to the message

- **Classification:** Observed
- **Intent:** Use the supplied dashboard artwork as the hero's product cue, scaling from the large presentation to the smaller medium/compact treatments without obscuring the heading or action.
- **Evidence:** `EVD-002`, `EVD-010`, `EVD-013`.
- **Requirement references:** `REQ-FR-001`, `REQ-NFR-001`, `REQ-NFR-003`.
- **Implications:** Its visual position may change responsively, but the logical message order remains stable.

### DES-006 — Present the countdown as one shared four-unit pattern

- **Classification:** Confirmed
- **Intent:** Home and Sign Up use the same labeled days/hours/minutes/seconds pattern and the approved target `2026-12-31T00:00:00-03:00`. Values are visually prominent but remain secondary to each route's primary heading/action.
- **Evidence:** `EVD-002`, `EVD-003`, `EVD-014`; explicit product-owner decision recorded in `REQ-BR-006`.
- **Requirement references:** `REQ-FR-012`, `REQ-BR-006`, `AC-022`–`AC-024`.
- **Implications:** At expiry the four tiles remain present and display zero rather than being replaced by a new message or composition.

### DES-007 — Preserve minimalist form anatomy while making labels persistent

- **Classification:** Recommended
- **Intent:** Retain the white card, single-column rhythm, understated field boundaries, and blue focus language. Field names must remain visibly and programmatically available after values are entered; placeholder-only naming is not acceptable.
- **Evidence:** `EVD-003`, `EVD-006`, `EVD-011`, `EVD-012`; gap `AUD-005`.
- **Requirement references:** `REQ-FR-007`, `REQ-FR-008`, `REQ-AR-001`, `REQ-AR-004`.
- **Implications:** Persistent labels and field-specific feedback may add vertical space beyond the pristine default specimen. The form card must grow with that content rather than overlap it.

### DES-008 — Extend missing feedback states from semantic tokens, not invented ornament

- **Classification:** Recommended
- **Intent:** Invalid fields use the existing red semantic role plus text feedback; success and storage failure use concise visible status text near the form. State meaning must not depend on color or an unproven icon alone.
- **Evidence:** `EVD-008`, `EVD-016`; gaps `AUD-004`, `AUD-005`, `AUD-013`.
- **Requirement references:** `REQ-FR-007`–`REQ-FR-011`, `REQ-AR-004`, `REQ-AR-005`.
- **Implications:** Repository check/cross icons are optional candidates only; their presence is not evidence that the design requires them.

### DES-009 — Let content determine height and state expansion

- **Classification:** Recommended
- **Intent:** Error messages, status messages, wrapped labels, and longer user values expand their owning region without covering the next control or crossing the card boundary.
- **Evidence:** Gaps `AUD-004`, `AUD-005`, `AUD-013`; supplied compositions `EVD-002`, `EVD-003`.
- **Requirement references:** `REQ-NFR-001`, `REQ-NFR-002`, `REQ-AR-001`, `REQ-AR-004`.
- **Implications:** Exact pristine frame heights are reference outcomes for default content, not fixed runtime heights.

### DES-010 — Preserve demonstrated focus as a system-wide affordance

- **Classification:** Confirmed
- **Intent:** Apply a clearly visible focus treatment to every interactive control, including controls not shown focused in the specimen. The demonstrated blue/white paired-ring language is the visual reference where it remains distinguishable against the surface.
- **Evidence:** `EVD-012`, `EVD-015`; limitation `AUD-012`; project authority `SRC-DOC-001`.
- **Requirement references:** `REQ-AR-002`, `REQ-AR-003`, `AC-029`, `AC-030`.
- **Implications:** Hover never substitutes for focus. Logo, native select, and all route actions require an equally perceptible focus state.

## 7. Visual System

### Typography

| Role | Style or value | Usage | Evidence |
|---|---|---|---|
| Display large | Kumbh Sans Bold, 56px, 120% | Large route headings, prices, large countdown values | `EVD-007` |
| Display medium | Kumbh Sans Bold, 40px, 120% | Medium/compact headings and compact countdown values | `EVD-007` |
| Heading small | Kumbh Sans Bold, 20px, 140% | Plan names | `EVD-007` |
| Body large | Kumbh Sans Regular, 18px, 150% | Large hero/Sign Up descriptions | `EVD-007` |
| Body medium | Kumbh Sans Regular, 16px, 160% | Compact body, billing summaries, features, form copy | `EVD-007` |
| Label strong | Kumbh Sans Bold, 16px, 160% | Buttons, selected plan, countdown units | `EVD-007` |
| Overline | Kumbh Sans Bold, 16px, 160%, uppercase, 5px tracking | “Coming” date line | `EVD-007` |

Typography uses role and hierarchy rather than fixed text boxes. Headings and body copy wrap; essential copy is not truncated. Kumbh Sans is source-observed, but the repository-safe font source remains unresolved.

### Color and tokens

| Semantic role | Token or value | Usage | Evidence |
|---|---|---|---|
| Deep neutral | `#25293A` | Dark launch/side surfaces, strongest Home text | `EVD-008` |
| Secondary neutral | `#333950` | Headings, plan content, countdown tiles | `EVD-008` |
| Muted neutral | `#747B95` | Descriptions and secondary copy | `EVD-008` |
| Page/card surfaces | `#FAFAFA`, `#FFFFFF` | Page background and elevated cards | `EVD-008` |
| Primary action | `#5175FF` | Primary buttons, Pro card, dates and countdown values | `EVD-008` |
| Primary hover | `#829CFF` | Primary hover fill | `EVD-008`, `EVD-012` |
| Pale action | `#E4EAFF` | Secondary actions, pale countdown surface | `EVD-008` |
| Error | `#F05B5B` | Recommended invalid/failure emphasis with text | `EVD-008`, `AUD-004` |

The named colors express semantic roles. Illustration-only mint and light-blue colors remain internal to the supplied artwork rather than becoming new product tokens.

### Spacing, radii, borders, shadows, imagery, and icons

- Use the observed spacing scale (2 through 140px) to preserve repeatable rhythm rather than introducing arbitrary near-duplicate gaps. Evidence: `EVD-009`.
- Use the observed radius family, including pill treatment for actions and restrained card rounding. Evidence: `EVD-009`, `EVD-010`.
- Buttons retain the observed 50px height; fields retain approximately 43–45px default control height, with additional label/error space outside the control. Evidence: `EVD-015`.
- Form/card elevation remains restrained and supports separation from split backgrounds; decoration supplies depth elsewhere.
- The arrow icon belongs to the closed Plan control. Check/cross files have no confirmed design role and must not be treated as mandatory.
- Focus uses the demonstrated high-visibility paired blue/white treatment or an equivalently perceptible adaptation where surface contrast requires it.

## 8. Components and Patterns

| Component or pattern | Purpose | Anatomy | Variants | States | Reuse evidence |
|---|---|---|---|---|---|
| Brand logo | Identify Officelite; return from Sign Up | Mark/wordmark SVG and accessible navigation name where linked | One visual variant | Default; visible focus required when interactive | `EVD-010`, `EVD-004` |
| Primary button | Advance to Sign Up or submit | Pill surface, strong label | Standard width; full form width | Default, Hover, Focus; submission outcome handled separately | `EVD-010`–`EVD-012` |
| Pricing button | Select a plan | Pill surface, strong label | Standard light and inverse | Default, Hover, Focus | `EVD-010`–`EVD-012` |
| Dashboard illustration | Explain product visually | Supplied vector composition | Responsive sizes | Static | `EVD-002`, `EVD-010`, `EVD-013` |
| Pricing card | Compare one plan | Name, price, billing, three features, action | Basic, Pro-highlighted, Ultimate | Default; action states owned by button | `EVD-002`, `EVD-005` |
| Countdown | Communicate launch timing | Overline plus four labeled value tiles | Light-context treatment shared across routes | Future values; persistent all-zero expired state | `EVD-002`, `EVD-003`, `REQ-BR-006` |
| Text field | Collect one required text value | Persistent label, native input, boundary, field feedback | Name, Email, Phone, Company | Empty/default, Hover, Focus, filled, invalid | `EVD-006`, `EVD-011`, `AUD-005` |
| Plan select | Choose one supported plan | Persistent label, native select, three options, arrow treatment | Basic, Pro, Ultimate values | Default, Hover, Focus, selected; native open state | `EVD-006`, `EVD-010`, `AUD-006` |
| Form status | Confirm transaction result | Concise visible message associated with form | Success, storage failure | Appears after completed/failed transaction | `REQ-FR-010`, `REQ-FR-011`, `REQ-AR-005` |
| Orbit decoration | Establish depth/brand atmosphere | Supplied vector background | Hero, footer, Sign Up side | Static/decorative | `EVD-010`, `EVD-013` |

These are design patterns and anatomy, not prescribed file/module boundaries.

## 9. Interaction Intent

### DES-INT-001 — Home actions lead to Sign Up

- **Trigger:** Activate hero, Basic, Pro, Ultimate, or final launch action.
- **Intended result:** Navigate to Sign Up; a plan action carries its matching plan intent, while generic actions use Basic.
- **Pattern:** Standard page navigation.
- **Motion:** Source shows no transition; no route animation is required.
- **Focus or keyboard implication:** Each action is keyboard activatable and visibly focusable using standard link/action semantics.
- **Evidence and snapshot:** `EVD-004`; `REQ-FR-003`, `REQ-FR-005`.

### DES-INT-002 — Sign Up logo returns Home

- **Trigger:** Activate the linked Officelite logo on Sign Up.
- **Intended result:** Navigate to Home.
- **Pattern:** Standard linked-brand navigation.
- **Motion:** None demonstrated.
- **Focus or keyboard implication:** The logo exposes a descriptive accessible name and visible focus.
- **Evidence and snapshot:** `EVD-004`; inferred requirement `REQ-FR-004`.

### DES-INT-003 — Plan selection uses the platform pattern

- **Trigger:** Focus or activate the Plan control and choose an option.
- **Intended result:** Display and retain Basic, Pro, or Ultimate as the current form value.
- **Pattern:** Native select, including platform-owned open menu and keyboard behavior.
- **Motion:** No custom opening/closing animation.
- **Focus or keyboard implication:** Preserve native selection keys and expose a persistent label plus visible focus; do not imitate a custom combobox from the closed Figma specimen.
- **Evidence and snapshot:** `EVD-006`, `EVD-011`; gap `AUD-006`; `REQ-FR-005`, `REQ-FR-006`.

### DES-INT-004 — Validation remains field-local and recoverable

- **Trigger:** Attempt submission with an empty required field or invalid email.
- **Intended result:** Keep the form available, visually identify each affected field, and place specific feedback with that field.
- **Pattern:** Inline form validation.
- **Motion:** No required animation; appearance must not depend on motion.
- **Focus or keyboard implication:** Invalid relationships are programmatic. Focus behavior is left to Stage 4 specification, but users must be able to reach and correct every field without pointer input.
- **Evidence and snapshot:** `AUD-004`, `AUD-005`, `EVD-016`; `REQ-FR-007`, `REQ-FR-008`, `REQ-AR-004`.

### DES-INT-005 — Submission status follows the transaction

- **Trigger:** Submit a valid form.
- **Intended result:** Show success only after IndexedDB succeeds; show failure without false success if it fails, preserving entered values where possible.
- **Pattern:** Form transaction with inline status feedback.
- **Motion:** No loading or transition treatment is established; Stage 4 must not require an unapproved animation.
- **Focus or keyboard implication:** Outcome text is visible and programmatically announced. The feedback must not require pointer discovery.
- **Evidence and snapshot:** missing-source boundary `EVD-016`; authoritative requirements `REQ-FR-009`–`REQ-FR-011`, `REQ-AR-005`.

### DES-INT-006 — Countdown changes without visual disruption

- **Trigger:** Passage of time.
- **Intended result:** Update the four numeric values once per second toward the approved instant, then remain at four zero values.
- **Pattern:** Passive status display, not an interactive control.
- **Motion:** Direct value replacement; no flip, slide, or easing is demonstrated or required.
- **Focus or keyboard implication:** Countdown values are readable as a coherent group but should not announce every one-second update, which would overwhelm assistive-technology users.
- **Evidence and snapshot:** `EVD-002`, `EVD-003`, `EVD-016`; `REQ-FR-012`, `REQ-BR-006`.

### DES-INT-007 — Hover and focus remain distinct

- **Trigger:** Pointer hover or keyboard focus.
- **Intended result:** Hover changes surface/boundary color as demonstrated; focus adds a conspicuous ring that remains visible across light, blue, and dark contexts.
- **Pattern:** Standard control states.
- **Motion:** No transition timing is shown; any subtle interpolation must preserve immediate state perception and reduced-motion expectations.
- **Focus or keyboard implication:** Focus appears only on the focused control, not simultaneously on all specimen controls.
- **Evidence and snapshot:** `EVD-011`, `EVD-012`; `AUD-007`; `REQ-AR-003`.

## 10. Responsive Intent

### DES-RWD-001 — Home hero transforms by content pressure

- **What remains stable:** Brand, heading, supporting copy, primary action, dashboard artwork, and their relative conceptual hierarchy.
- **What becomes fluid:** Container/gutters, copy measure, inter-column space, illustration scale, and section height.
- **What wraps, stacks, reorders, hides, or is replaced:** Large and 768 compositions place copy and illustration side by side. The 375 composition centers content and visually places the illustration before the copy. Nothing material is hidden or replaced.
- **Content-driven transition condition:** Switch from side-by-side when both the readable copy measure and illustration can no longer coexist without crowding, clipping, or horizontal overflow—not at an assumed framework breakpoint.
- **Evidence, snapshot, and uncertainty:** `EVD-002`, `AUD-002`; supplied widths 1440/768/375. Exact transition width is not source-defined.

### DES-RWD-002 — Pricing changes row to horizontal cards to vertical cards

- **What remains stable:** Basic/Pro/Ultimate order, Pro emphasis, content fields, and one action per plan.
- **What becomes fluid:** Card width, internal spacing, feature-column measure, and region height.
- **What wraps, stacks, reorders, hides, or is replaced:** Large uses a three-card row; 768 uses three stacked horizontal cards with grouped content; 375 uses stacked vertical centered cards. No plan content disappears.
- **Content-driven transition condition:** Use the horizontal-card composition when three complete cards no longer fit as a readable row; use the vertical-card composition when a card can no longer support its horizontal internal groups without cramped wrapping.
- **Evidence, snapshot, and uncertainty:** `EVD-002`, `EVD-005`, `AUD-002`; exact transition values remain for later specification/validation.

### DES-RWD-003 — Home launch region changes horizontal to centered stack

- **What remains stable:** Dark patterned surface, launch overline, four units, and final action.
- **What becomes fluid:** Region height, gaps, tile dimensions, and pattern crop.
- **What wraps, stacks, reorders, hides, or is replaced:** Large places countdown group and action horizontally; medium/compact center them vertically. The four units remain one row at supplied widths.
- **Content-driven transition condition:** Stack the action below when countdown and action cannot share the row without reducing target size or causing overflow.
- **Evidence, snapshot, and uncertainty:** `EVD-002`. Below the supplied 375 width, first reduce allowable gaps/tile width; if four readable units still cannot fit, a two-by-two fallback is recommended rather than horizontal scrolling.

### DES-RWD-004 — Sign Up changes split composition to stacked bridge

- **What remains stable:** Brand, intro, countdown, form order, white form card, and dark patterned region.
- **What becomes fluid:** Intro measure, column gap, form width, surface split position, and page height.
- **What wraps, stacks, reorders, hides, or is replaced:** Large uses a left intro/countdown with right form across the light/dark split. Medium/compact center intro and countdown above the form; the form remains visually bridged over the dark region. Nothing material is hidden.
- **Content-driven transition condition:** Stack when the intro and full readable form width cannot coexist beside the dark side region without collision or excessive compression.
- **Evidence, snapshot, and uncertainty:** `EVD-003`, `AUD-002`, `AUD-003`; large evidence is 1321, not 1440, so no shared numeric large breakpoint is confirmed.

### DES-RWD-005 — Form controls are fluid within a capped card

- **What remains stable:** Single-column field order, control rhythm, full-width submit relationship, and touch-friendly control height.
- **What becomes fluid:** Card width, inline padding, control width, message height, and total form/card height.
- **What wraps, stacks, reorders, hides, or is replaced:** Controls remain a single column; labels/errors wrap and increase height. The supplied 360/365 controls contract to 287 at 375.
- **Content-driven transition condition:** Inline padding and control width contract with the viewport while retaining readable labels and operable targets; the page must not clip the form.
- **Evidence, snapshot, and uncertainty:** `EVD-003`, `EVD-006`, `EVD-015`; behavior below 375 and with long feedback is recommended from `REQ-NFR-002`, not observed.

### DES-RWD-006 — Wide and intermediate widths preserve composition, not canvas dimensions

- **What remains stable:** Centered hierarchy, maximum readable measures, card proportions, and route-specific large composition.
- **What becomes fluid:** Outer whitespace and gutters.
- **What wraps, stacks, reorders, hides, or is replaced:** Nothing changes merely because the viewport exceeds the source frame; content remains capped. Between samples, the current composition flows until its content-driven failure condition is reached.
- **Content-driven transition condition:** A transition is justified by overlap, clipping, unreadable measures, target compression, or horizontal overflow—not by a familiar device label.
- **Evidence, snapshot, and uncertainty:** `AUD-002`, `AUD-003`; requirements `REQ-NFR-001`, `REQ-NFR-002`.

## 11. States and Edge Cases

| State or edge | Design intent | Classification and evidence |
|---|---|---|
| Default | Match the six supplied compositions and local Default component variants. | Observed — `EVD-002`, `EVD-003`, `EVD-011` |
| Hover | Primary blue lightens; standard pricing action becomes blue; inverse pricing action becomes pale blue; text-field boundary becomes blue. | Observed — `EVD-012` |
| Focus | Use a conspicuous blue/white ring or equally visible contextual adaptation on every interactive element. | Observed/Confirmed — `EVD-012`, `REQ-AR-003` |
| Active/pressed | No distinct source appearance. Preserve recognizability and do not remove focus; an elaborate pressed animation is not required. | Recommended — `AUD-004` |
| Selected plan | Closed native select displays the current Basic/Pro/Ultimate value; the platform owns the open selection UI. | Confirmed — `REQ-FR-005`, `REQ-FR-006`; source gap `AUD-006` |
| Filled field | Keep the persistent label and display the entered value with the same hierarchy as the default control. | Recommended — `AUD-004`, `AUD-005` |
| Invalid field | Add field-specific text and red semantic emphasis without relying on color alone; grow the form to fit. | Recommended/required outcome — `EVD-008`, `REQ-AR-004` |
| Submission success | Show concise visible confirmation near the form only after the transaction succeeds and announce it programmatically. | Confirmed outcome — `REQ-FR-010`, `REQ-AR-005` |
| Storage failure | Show concise failure feedback, no success treatment, and leave entered values visible where possible. | Confirmed outcome — `REQ-FR-011`, `REQ-AR-005` |
| Disabled/loading | No source or requirement establishes a distinct disabled/loading presentation. Do not add one as source-derived intent; specification may define only what transaction integrity needs. | Open — `AUD-004` |
| Empty form | Persistent labels remain; placeholder/example text may support but never replace them. | Recommended/required outcome — `AUD-005`, `REQ-AR-001` |
| Countdown expiry | Keep the existing four-unit composition and permanently show all zero values. | Confirmed — `REQ-BR-006`, `AC-024` |
| Long content | Wrap headings, body, labels, feedback, and plan copy; expand cards/regions rather than truncate material information. Native fields may use their standard value overflow behavior. | Recommended — `AUD-013`, `REQ-NFR-002` |
| Missing decorative asset | Preserve surface color, layout, content, and operation; decoration may disappear without a text alternative. | Inferred — `EVD-013`, `REQ-AR-001` |
| Missing informative illustration | Retain the product message; alternative-text choice depends on whether implementation review finds the artwork adds information beyond adjacent copy. | Open — `AUD-012` |

Exact validation, success, and failure wording remains a Stage 4 content/specification decision. The current design intent defines placement, hierarchy, and distinguishability without inventing copy.

## 12. Accessibility Intent

- **Semantic hierarchy:** One clear page heading per route, meaningful sectional structure, real navigation/action semantics, a real form, and native form controls. Visual text size does not determine heading level.
- **Reading order:** Keep route heading/supporting copy before related illustration; preserve Basic/Pro/Ultimate and form-field order across visual transformations. CSS-level placement must not create a confusing focus/reading sequence.
- **Accessible names:** The linked logo has a meaningful name. Every form control has a persistent label relationship; placeholder text is supplemental only.
- **Keyboard:** All links, actions, the native select, form fields, correction paths, and submission are operable with standard keyboard behavior. No pointer-only state carries required information.
- **Focus:** Every interactive element receives a visible focus indicator, including logo and select. Focus is not hidden by card, orbit, or split-region clipping.
- **Errors and status:** Invalid feedback is associated with its field. Success and storage-failure messages are visible and programmatically announced. The once-per-second countdown is not a live announcement stream.
- **Contrast:** Preserve the supplied semantic color roles, but verify actual text/control/focus combinations during validation. Visual evidence alone does not prove a formal conformance ratio.
- **Target size:** Preserve the observed 50px actions and 43–45px fields. Compact transformations must not materially shrink operable targets to solve layout pressure.
- **Reflow and zoom:** Content and cards grow vertically; no material text or controls are clipped or hidden. Intermediate and unusually narrow conditions use the responsive fallback rules rather than horizontal page scrolling.
- **Images:** Orbit patterns are treated as decorative. Logo naming comes from its linked purpose. The dashboard illustration's alternative-text treatment must be decided from its final informational role, not filename alone.
- **Motion:** No essential motion is present. Any subtle state transition must not delay perception and should respect reduced-motion preferences; route changes and countdown values require no animation.
- **Claim boundary:** These are design and project intentions. No formal WCAG conformance level is claimed without an approved target and implementation evidence.

Evidence: `EVD-012`, `EVD-015`, `AUD-005`, `AUD-012`; requirements `REQ-AR-001`–`REQ-AR-005`, `REQ-NFR-001`, `REQ-NFR-002`.

## 13. Assets and Design-system Mapping

| Asset or pattern | Snapshot or evidence | Existing project resource | Required design action | Risk |
|---|---|---|---|---|
| Logo | `EVD-010`, `EVD-013` | `docs/starter-code/assets/shared/logo.svg` | Compare rendered resource with source component; preserve brand proportions | Exact vector equivalence not checksum-proven |
| Dashboard illustration | `EVD-010`, `EVD-013` | `docs/starter-code/assets/home/illustration-charts.svg` | Preserve composition and responsive role | Same equivalence limitation |
| Hero orbit | `EVD-010`, `EVD-013` | `docs/starter-code/assets/home/bg-pattern-header.svg` | Map as cropped decorative background | Crop/position varies by composition |
| Pricing/footer orbits | `EVD-002`, `EVD-013` | `docs/starter-code/assets/home/bg-pattern-pricing.svg`, `bg-pattern-footer.svg` | Preserve region-specific pattern role | Source-to-file mapping is visually suggested only |
| Sign Up side orbit | `EVD-003`, `EVD-013` | `docs/starter-code/assets/sign-up/bg-pattern-side.svg` | Preserve dark-region atmospheric role | Crop changes across responsive layouts |
| Select arrow | `EVD-006`, `AUD-006` | `docs/starter-code/assets/sign-up/icon-arrow-down.svg` | Use only if it preserves native select operation and closed appearance | Platform rendering varies |
| Check/cross icons | `AUD-004`, `AUD-011` | `docs/starter-code/assets/sign-up/icon-check.svg`, `icon-cross.svg` | Optional candidates; do not require without later approved mapping | No state composition proves intended use |
| Favicon | `SRC-REPO-001` | `docs/starter-code/assets/favicon-32x32.png` | Use for browser identity if consistent with repository conventions | Not shown in scoped Figma |
| Typography | `EVD-007` | No registered font asset in active snapshots | Resolve an approved repository-safe Kumbh Sans source | Provenance/hosting remains open |
| Colors/spacing/radii | `EVD-008`, `EVD-009` | No established frontend token system | Preserve semantic roles and scale relationships in later specification | Figma collection names/scopes are not implementation-ready |
| Local components | `EVD-010`, `EVD-011` | Current frontend is a starter; no matching code components | Carry anatomy/variants into later specification and architecture | Design reuse is evidence, not repository structure |

All implementation assets remain immutably covered by `SRC-REPO-001`; no separate asset snapshot is needed. Subscribed community libraries and the remote Foundations-only `Palette` specimen are not dependencies of the scoped screens.

## 14. Inferences, Recommendations, and Open Questions

### Inferred

- Orbit patterns are decorative and should stay outside the accessibility tree.
- The source's simultaneous state-board highlights are specimens, not runtime behavior.
- Supplied SVGs are intended candidates for their similarly named visual roles, although exact vector equivalence is unproven.
- Sign Up logo return navigation should remain because all three prototype frames demonstrate it and `REQ-FR-004` retains it as a Should requirement.

### Recommended

- Keep field labels persistently visible and place field-specific feedback immediately with its control.
- Use the red semantic token plus text for invalid/failure emphasis; do not depend on an icon or color alone.
- Avoid live-region announcements for each countdown tick.
- At widths too narrow for four countdown units even after gap/tile contraction, use a two-by-two grid rather than horizontal page scrolling.
- Compare the pinned SVG assets with the inspected Figma vectors during specification/implementation review before claiming exact equivalence.

### Resolved downstream

- Approved `SPEC.md` Sections 7 and 10 define the exact validation, pending, success, and storage-failure copy.
- `SPEC-ACC-005` treats the dashboard illustration as decorative/redundant because the adjacent hero text supplies the complete product message.
- `SPEC-INT-004`, `SPEC-ACC-004`, and `SPEC-VAL-004` define a text-based pending/busy state and duplicate-action prevention without inventing a loading animation.

### Open questions

- What repository-safe source/hosting method will provide Kumbh Sans?
- Does the project owner require a browser matrix or formal WCAG conformance target beyond the approved outcomes?

These remaining questions are non-blocking for design intent because approved Requirements and Specification own current-release outcomes, while later stages own font provisioning and any formally claimed validation matrix.

## 15. Risks and Inconsistencies

| Finding | Snapshot or evidence | Impact | Resolution owner |
|---|---|---|---|
| Mutable Figma input has no immutable export | `AUD-001`, `VER-007` | Visual intent may drift if the file changes | Workflow source verification before downstream reliance |
| Only three widths per route are supplied | `AUD-002`, `AUD-003` | Exact transition points and below-375 behavior are not observed | Stage 4 specification and later responsive validation |
| Form and transaction states are visually incomplete | `AUD-004`–`AUD-007`, `AUD-013` | Requirement-driven states need coherent extensions | Stage 4 specification, then implementation validation |
| Placeholder dates conflict with approved runtime target | `AUD-009`, `REQ-BR-006` | A source example could overwrite product intent | Preserve explicit decision authority in all downstream artifacts |
| Figma variables are not implementation-ready tokens | `AUD-010` | Literal source naming could create a poor code system | Stage 4/6 mapping, without changing semantic visual roles |
| Asset equivalence is not checksum-proven | `AUD-011` | Small visual differences may appear | Side-by-side asset validation |
| Font source is not registered | `EVD-007`, `SRC-REPO-001` | Typography fidelity or provenance may be blocked | Resolve before implementation planning |
| Accessibility cannot be proven from source | `AUD-005`, `AUD-012` | Visual fidelity alone could miss required behavior | Specification and manual validation against `REQ-AR-*` |

No risk currently requires a profile upgrade. Shared client state and IndexedDB structure remain architecture questions for Stage 6 rather than design decisions.

## 16. Review

### Pass 1 — Completeness and correctness

- [x] Important structure, visual roles, components, states, interactions, responsive behavior, accessibility intent, and assets are covered.
- [x] Design intent is documented rather than copied as a property dump.
- [x] Snapshot IDs in metadata exist and were actually inspected.

Review status: completed on 2026-08-13.

Findings and corrections:

- Lifecycle status and baseline are owned by the canonical CLI record. Stage 5 removed manually duplicated record-owned fields from narrative frontmatter while retaining the three-source artifact baseline in the registry.
- The initial draft did not yet distinguish the source-observed closed select from the required native open interaction. `DES-INT-003` now explicitly assigns the open menu to the platform and rejects an invented custom combobox pattern.
- Missing error, success, failure, label, loading, and expired states were checked against `AUD-004`–`AUD-006`, `AUD-009`, `AUD-013`, and approved requirements. Required/recommended extensions are identified by classification; disabled/loading remains open rather than source-derived.
- An identifier/reference audit found 23 unique design decisions (`DES-*`, `DES-INT-*`, and `DES-RWD-*`), no duplicate IDs, no unresolved exact `EVD-*`/`AUD-*` references, and no unresolved exact `REQ-*` references.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] `DES-*` identifiers follow `Identifier-Conventions.md`.
- [x] Decisions map to evidence, snapshots, and requirements.
- [x] No source changed silently after the artifact baseline was recorded.
- [x] Observed, inferred, recommended, confirmed, and open information remain distinct.
- [x] No arbitrary breakpoint or unsupported interaction behavior is presented as confirmed.

Review status: completed on 2026-08-13.

Findings and corrections:

- Fresh authenticated Figma inspection confirmed page `4:3`, all five scoped sections, six responsive frames, four state frames, nine recorded local components/component sets, 38 local variables, and seven local text styles unchanged. `VER-007` preserves the source's Time-bound limitation.
- The draft still cited the earlier Stage 1 verification IDs after fresh checks were recorded. Source/limit and risk references now use `VER-007`, `VER-008`, and `VER-009`; repository HEAD remains `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`, and README SHA-256 remains `72bee1d93b40d80643935b254499a9d3c0f3fd280392ad94eb4f4c6cf57fb1af`.
- Responsive decisions use the supplied widths only as evidence and define content-failure conditions for transformations. The below-375 countdown fallback is explicitly Recommended, not Observed or Confirmed.
- Source authority remains consistent: Figma owns demonstrated visual intent, approved requirements own behavior, and `ferfalcon`'s 2026-08-13 decision owns the countdown target/expiry rule. Placeholder dates are not promoted to product facts.
- Remaining uncertainty is visible and non-blocking: font sourcing and browser/conformance targets remain deferred to their owning downstream decisions. Approved `SPEC.md` resolves feedback copy, dashboard alternative-text treatment, and pending-state behavior.
