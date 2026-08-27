---
artifact: DESIGN
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

# Design

## 1. Document Information

- Scope: Current-release Officelite Home and Sign Up design intent inside Figma node 4:3.
- Last updated: 2026-08-27.
- Source baseline: SOURCE-BASELINE.md.
- Evidence baseline: DESIGN-AUDIT.md.
- Related requirements: REQUIREMENTS.md.
- Active snapshots: SRC-DS-001 and SRC-REPO-001.
- Implementation code and architecture are outside this document.

## 2. Purpose and Intent

Officelite presents a focused coming-soon conversion journey: first explain the product and its three plans, then move an interested visitor into a compact sign-up experience without losing plan context.

The visual direction is deliberately restrained and product-led:

- a light marketing surface for the primary proposition;
- a saturated blue accent for primary action and the emphasized Pro plan;
- dark supporting surfaces around launch/countdown content;
- large Kumbh Sans display typography with generous spacing;
- rounded cards, pill actions, and soft elevation;
- a small reusable component vocabulary with explicit Default, Hover, and Focus states;
- responsive transformations that preserve hierarchy rather than merely scale the desktop composition down.

The design should feel calm, clear, and conversion-oriented. Decorative orbit artwork and the product-dashboard illustration support the brand atmosphere, while the primary reading order remains heading, supporting copy, plan/value information, and action.

## 3. Source and Scope

### Included design-source regions

- Workflow canvas 4:3.
- Home section 2141:2383.
- Sign Up section 2141:2386.
- Design System — Components section 2141:935.
- Design System — Foundations section 2141:938.
- Home Desktop 2141:1599.
- Home Tablet 2141:1724.
- Home Mobile 2141:1813.
- Sign Up Desktop 2141:1680.
- Sign Up Tablet 2141:1896.
- Sign Up Mobile 2141:1940.

### Excluded

- Any Figma node outside 4:3.
- Backend, persistence, routing, storage, or deployment implementation.
- Exact CSS breakpoint values.
- Business rules not already owned by REQUIREMENTS.md.
- Final validation, success, and failure copy that is not supplied by the active sources.

### Source integrity and reproduction limitation

Stage 3 rechecked the configured Figma scope and confirmed the expected Workflow canvas, design-system sections, responsive Home/Sign Up frames, and audited component structure are still present. No unexpected material design-source change was observed in the current metadata inspection.

The Figma renderer again produced screenshots for all six product frames, but the active execution runtime cannot retrieve the short-lived image URLs. Therefore this document does not claim a new pixel-level screenshot comparison. Visual intent is grounded in the approved DESIGN-AUDIT.md evidence plus current Figma node metadata. SRC-DS-001 remains time-bound and requires canonical reverification before the Stage 3 gate closes.

## 4. Information Architecture and Reading Order

### Home

The intended content order is:

1. Brand header.
2. Hero proposition:
   - primary heading;
   - supporting description;
   - primary Get Started action;
   - product-dashboard illustration as supporting visual material.
3. Pricing and plan comparison:
   - Basic;
   - Pro;
   - Ultimate.
4. Launch timing:
   - launch-date overline;
   - four countdown units;
   - Get Started action.

The plans should remain ordered Basic, Pro, Ultimate in all compositions. Pro is visually emphasized, but the visual emphasis must not change the informational order or make Basic/Ultimate appear unavailable.

### Sign Up

The intended content order is:

1. Brand header.
2. Introductory heading and supporting paragraph.
3. Launch-date/countdown context.
4. Sign-up form:
   - Name;
   - Email Address;
   - Plan;
   - Phone Number;
   - Company;
   - Get on the list action.
5. Validation or persistence status messaging when applicable.

On the large composition, the intro/countdown and form are visually side by side. The logical reading sequence remains intro and launch context before the form. On compact and medium compositions, that same sequence is expressed vertically.

## 5. Screen and Layout Structure

### Home

The large Home composition uses a centered principal content region approximately 1110px wide within the supplied 1440px frame. The hero and countdown use horizontal composition, while the three pricing cards form a single row.

At the medium reference, the hero remains split, but its text and illustration compress. Pricing changes from a three-card row to vertically stacked cards, and each card uses an internal two-column arrangement so summary/action and features remain easy to scan.

At the compact reference, the page becomes strongly single-column. The brand is centered, the product illustration precedes the hero copy visually, plan-card internals stack, and countdown units compress into four equal narrow columns.

### Sign Up

The large Sign Up composition uses a side-by-side layout: introductory content and countdown occupy one side while the 445px form surface occupies the other.

The medium composition changes to a vertical flow. The form retains its approximately 445px width and is centered, allowing it to preserve comfortable field proportions.

The compact composition keeps the same vertical flow but allows the form to become narrower and fluid within the viewport. The supplied 375px frame shows a 327px form surface with 20px horizontal internal padding.

## 6. Design Decisions

### DES-001 — Preserve proposition-first hierarchy

- Classification: Observed.
- Intent: The Home experience should lead with the product proposition and a single primary action before presenting detailed plan comparison.
- Evidence: EVD-002, EVD-011, Home nodes 2141:1610–2141:1631.
- Requirement references: REQ-FR-001, REQ-NFR-001.
- Implications: The product-dashboard illustration supports the proposition but must not outrank the heading or CTA in content hierarchy.

### DES-002 — Preserve conversion continuity from Home to Sign Up

- Classification: Confirmed.
- Intent: Home actions and Sign Up should read as one continuous conversion journey rather than two unrelated pages.
- Evidence: EVD-009, EVD-013, EVD-019.
- Requirement references: REQ-FR-003, REQ-FR-004, REQ-FR-005.
- Implications: Sign Up should immediately expose the current plan selection in the same plan-control area shown by Figma, including Basic as the generic/direct-entry default defined by requirements.

### DES-003 — Use Pro as visual emphasis, not exclusive hierarchy

- Classification: Observed.
- Intent: Pro is the emphasized pricing choice through its blue card surface and inverse action styling.
- Evidence: EVD-014, EVD-005.
- Requirement references: REQ-FR-001, REQ-BR-001.
- Implications: Basic and Ultimate remain equally available choices; Pro emphasis is visual, not a separate product rule.

### DES-004 — Maintain a restrained action hierarchy

- Classification: Observed.
- Intent: Saturated blue primary buttons indicate the strongest action, while standard and inverse pricing buttons adapt to their card surfaces.
- Evidence: EVD-005, component sets 10:526, 10:531, 10:567.
- Requirement references: REQ-FR-003, REQ-FR-012, REQ-AR-002.
- Implications: Additional actions introduced by later specifications should not create a competing visual hierarchy without new design authority.

### DES-005 — Treat the form as a focused elevated surface

- Classification: Observed.
- Intent: The sign-up form should remain visually self-contained through a white surface, 12px radius, soft shadow, generous internal spacing, and vertically grouped controls.
- Evidence: EVD-003, EVD-006, Sign Up form nodes 2141:1716 and 2141:1976.
- Requirement references: REQ-FR-002, REQ-FR-006, REQ-FR-007.
- Implications: Validation and transaction feedback should stay visually attached to this form context rather than appearing as unrelated page-level notices.

### DES-006 — Keep launch timing visually consistent across both pages

- Classification: Observed.
- Intent: Home and Sign Up use the same launch-date language and the same four-unit countdown concept so launch timing feels like one shared piece of information.
- Evidence: EVD-015.
- Requirement references: REQ-FR-011, REQ-BR-005.
- Implications: Current date/value content is replaceable current-release content; the visual pattern should not depend on the specific supplied numbers.

### DES-007 — Preserve Kumbh Sans role hierarchy

- Classification: Observed.
- Intent: Typography should use the audited Kumbh Sans role system rather than ad hoc sizes.
- Evidence: EVD-008 and Foundations node 4:456.
- Requirement references: REQ-FR-001, REQ-FR-002, REQ-NFR-001.
- Implications: Display size may step down between large and smaller compositions, but role hierarchy must stay stable.

### DES-008 — Extend existing visual language for validation states

- Classification: Recommended.
- Intent: Requirements-defined invalid fields should use the existing red token as the error signal while preserving the established blue focus treatment as a separate state.
- Evidence: EVD-006, EVD-007, EVD-016, AUD-005, AUD-007.
- Requirement references: REQ-FR-007, REQ-AR-002, REQ-AR-005.
- Implications:
  - Invalid field divider/border and associated message may use colors/red/400.
  - Focus should remain visibly distinct through the existing white/blue ring rather than being replaced by error color alone.
  - Error styling must not rely on color as the only cue; text feedback is also required by REQ-FR-007.
  - Exact validation copy remains open.

### DES-009 — Keep persistence feedback inside the form language

- Classification: Recommended.
- Intent: Success and failure feedback should appear inside the form surface, adjacent to the submission context, so users can connect the outcome with the action they just took.
- Evidence: AUD-005, AUD-007, EVD-019.
- Requirement references: REQ-FR-009, REQ-FR-010, REQ-AR-003.
- Implications:
  - Failure feedback may use the existing red token.
  - No green success token exists in the audited design system, so success should use existing blue/neutral typography or surface treatment rather than inventing an unsupported green palette.
  - Exact message wording remains open.

### DES-010 — Keep placeholder content replaceable

- Classification: Confirmed.
- Intent: Current marketing copy, prices, features, and launch date should fit the approved layout but must not be treated as immutable design dimensions.
- Evidence: EVD-014, EVD-015, EVD-019.
- Requirement references: REQ-BR-005, REQ-CON-004.
- Implications: Components and layout should tolerate reasonable content replacement without depending on the exact supplied strings.

### DES-011 — Decorative artwork supports atmosphere, not primary meaning

- Classification: Inferred.
- Intent: Orbit artwork and the scaled dashboard illustration should support brand character without interrupting the main reading order.
- Evidence: EVD-004, EVD-017, DESIGN-AUDIT.md Section 14.
- Requirement references: REQ-NFR-001, REQ-AR-001.
- Implications: Orbit artwork should be treated as decorative. The dashboard illustration should be treated as illustrative unless a later product decision establishes essential informational meaning.

## 7. Visual System

### Typography

| Role | Observed style | Intended usage | Evidence |
|---|---|---|---|
| Display/Large | Kumbh Sans Bold 56px / 120% | Large-composition hero and major Sign Up heading; large countdown values | EVD-008 |
| Display/Medium | Kumbh Sans Bold 40px / 120% | Medium/compact major headings and compact countdown values | EVD-008 |
| Heading/Small | Kumbh Sans Bold 20px / 140% | Plan names | EVD-008 |
| Body/Large | Kumbh Sans Regular 18px / 150% | Major supporting copy | EVD-008 |
| Body/Medium | Kumbh Sans Regular 16px / 160% | Feature and supporting content | EVD-008 |
| Label/Strong | Kumbh Sans Bold 16px / 160% | Buttons, labels, countdown units | EVD-008 |
| Label/Overline | Kumbh Sans Bold 16px / 160%, 5px tracking | Launch-date overline | EVD-008 |

The hierarchy should be preserved even when exact font sizes change between supplied layout conditions. A smaller composition should step down the display role rather than collapsing all hierarchy into one size.

### Color and semantic roles

| Semantic role | Observed token/value | Intended usage | Evidence |
|---|---|---|---|
| White surface | colors/neutral/0 — #FFFFFF | Form and standard pricing-card surfaces | EVD-007 |
| Light surface | colors/neutral/50 — #FAFAFA | Light page/background support | EVD-007 |
| Secondary text | colors/neutral/500 — #747B95 | Supporting copy and secondary information | EVD-007 |
| Strong text | colors/neutral/800 — #333950 | Primary dark text | EVD-007 |
| Dark surface | colors/neutral/900 — #25293A | Dark launch/supporting areas where used by source | EVD-007 |
| Soft accent | colors/blue/100 — #E4EAFF | Standard pricing-button surface | EVD-005, EVD-007 |
| Hover accent | colors/blue/300 — #829CFF | Primary hover treatment | EVD-005, EVD-007 |
| Primary accent | colors/blue/500 — #5175FF | Primary actions, Pro emphasis, interactive detail | EVD-005, EVD-007 |
| Error accent | colors/red/400 — #F05B5B | Recommended requirements-defined invalid/failure feedback | EVD-007, DES-008, DES-009 |

### Spacing intent

The audited spacing system ranges from 2px to 140px. The design should use those existing rhythm values rather than arbitrary one-off gaps.

Important observed relationships include:

- compact horizontal page padding around 16px;
- medium page padding around 40px;
- 24px separation between form controls;
- 32px spacing in major card/action groupings;
- 40px form padding on larger compositions;
- 48px internal pricing-card spacing in the medium composition;
- 64–80px major section spacing;
- 140px large Home page section rhythm.

These are source relationships, not a requirement that every corresponding implementation gap must use the same fixed value at every width.

### Radius and elevation

- Pricing cards and the sign-up form use the 12px radius.
- Buttons use the full/pill radius.
- Primary buttons and elevated card/form surfaces use soft shadows.
- Focus rings are explicit visual layers, not merely box-shadow decoration that may be removed without replacement.

## 8. Components and Patterns

| Component or pattern | Purpose | Anatomy | Variants | Supplied states | Reuse evidence |
|---|---|---|---|---|---|
| Brand / Logo | Identify Officelite; return to Home on Sign Up | Vector mark | Single | N/A | EVD-004, EVD-010 |
| Button / Primary | Primary conversion/submit action | Label within pill action | State | Default, Hover, Focus | EVD-005 |
| Button / Pricing / Standard | Basic/Ultimate pricing action | Label within pill action | State | Default, Hover, Focus | EVD-005 |
| Button / Pricing / Inverse | Pro pricing action | Label within pill action | State | Default, Hover, Focus | EVD-005 |
| Illustration / Product Dashboard | Support hero proposition visually | Scalable dashboard composition | Single | N/A | EVD-004 |
| Form / Text Field | Collect text-like form values | Visible field text, value area/divider, focus treatment | State | Default, Hover, Focus | EVD-006 |
| Form / Plan Select | Show current plan and enable selection | Plan label/value and native-select affordance | State | Default, Hover, Focus | EVD-006 |
| Pricing card pattern | Compare plan name, price, billing, features, action | Summary + features + CTA | Basic, Pro, Ultimate compositions | Default only | EVD-014, AUD-012 |
| Countdown pattern | Communicate launch timing | Date overline + 4 units | Home/Sign Up contextual use | Static design state | EVD-015, AUD-012 |
| Orbit decoration | Brand atmosphere | Concentric/vector orbit artwork | Hero/Footer uses | N/A | EVD-004 |

Pricing cards and countdowns are repeated design patterns, but Figma does not establish them as code-component boundaries.

## 9. Interaction Intent

### DES-INT-001 — Home conversion actions navigate to Sign Up

- Classification: Confirmed.
- Trigger: Activation of hero, pricing, or countdown CTA.
- Intended result: Open Sign Up.
- Pattern: Navigation action.
- Motion: No transition animation is supplied by the prototype.
- Focus/keyboard implication: The visual action must support keyboard activation and visible focus as required by REQ-AR-001 and REQ-AR-002.
- Evidence: EVD-009, EVD-005, EVD-019.
- Requirement references: REQ-FR-003, REQ-AR-001, REQ-AR-002.

### DES-INT-002 — Pricing entry preserves visible plan context

- Classification: Confirmed.
- Trigger: Activation of Basic, Pro, or Ultimate plan CTA.
- Intended result: Sign Up opens with the corresponding plan visibly selected.
- Pattern: Navigation followed by contextual form state.
- Motion: None supplied.
- Focus/keyboard implication: No special focus transfer is established by design; Stage 4 must specify observable navigation/focus behavior without inventing modal semantics.
- Evidence: EVD-019, AUD-003, AUD-004.
- Requirement references: REQ-FR-004, REQ-FR-005.

### DES-INT-003 — Sign Up logo provides return navigation

- Classification: Observed.
- Trigger: Activation of the Officelite logo on Sign Up.
- Intended result: Return to Home.
- Pattern: Brand navigation link/action.
- Motion: No transition animation supplied.
- Focus/keyboard implication: Must remain reachable and visibly focusable under REQ-AR-001/002.
- Evidence: EVD-010.
- Requirement references: REQ-FR-012, REQ-AR-001, REQ-AR-002.

### DES-INT-004 — Preserve Default, Hover, and Focus distinctions

- Classification: Observed.
- Trigger: Pointer hover or keyboard/programmatic focus.
- Intended result: Interactive affordance changes visibly according to the supplied component states.
- Pattern: Native interactive-control state styling.
- Motion: Timing is not supplied; no animation requirement is introduced here.
- Focus/keyboard implication: Hover must not substitute for Focus.
- Evidence: EVD-005, EVD-006, EVD-016.
- Requirement references: REQ-AR-001, REQ-AR-002.

### DES-INT-005 — Native plan select owns its open-menu presentation

- Classification: Confirmed design implication of REQ-FR-005.
- Trigger: Activation of the Plan Select.
- Intended result: The user can inspect and choose Basic, Pro, or Ultimate.
- Pattern: Native select.
- Motion: Platform/browser controlled.
- Focus/keyboard implication: Use standard native select keyboard behavior.
- Evidence: EVD-006, AUD-006, EVD-019.
- Requirement references: REQ-FR-005, REQ-AR-001.
- Implication: Figma defines the closed control treatment only. The platform-native option popup does not need a bespoke Figma-matched overlay.

### DES-INT-006 — Validation and persistence feedback remain contextual

- Classification: Recommended.
- Trigger: Invalid submission, successful IndexedDB transaction, or failed IndexedDB transaction.
- Intended result: Field-specific validation appears with the affected control; transaction status appears within the form submission context.
- Pattern: Inline validation plus non-modal status feedback.
- Motion: No motion is required.
- Focus/keyboard implication: Feedback should not require pointer interaction to discover it. Programmatic announcement belongs to Stage 4 specification.
- Evidence: AUD-005, AUD-007, EVD-019.
- Requirement references: REQ-FR-007, REQ-FR-009, REQ-FR-010, REQ-AR-003, REQ-AR-005.

### DES-INT-007 — Countdown ticks should not become repeated assistive announcements

- Classification: Recommended.
- Trigger: Once-per-second visible countdown update.
- Intended result: Values change visually without creating a continuous stream of screen-reader announcements.
- Pattern: Passive live visual data.
- Motion: Numeric content changes only; no transition animation is supplied.
- Focus/keyboard implication: None.
- Evidence: EVD-015, AUD-009; no requirement requests per-second announcements.
- Requirement references: REQ-FR-011.
- Implication: Stage 4 should preserve visual updates while avoiding unnecessary live-region behavior for every tick.

## 10. Responsive Intent

### DES-RWD-001 — Use supplied widths as evidence points, not implementation breakpoints

- Classification: Confirmed limitation.
- What remains stable: Content hierarchy, required actions, plan order, countdown structure, form fields.
- What becomes fluid: Outer gutters, content widths, illustration scale, card/form widths.
- Transformation condition: Layout changes when the current arrangement can no longer preserve readable content and usable controls without overlap or application-caused horizontal scrolling.
- Evidence: EVD-002, EVD-003, AUD-001, AUD-002.
- Requirement references: REQ-NFR-001, REQ-NFR-002.

### DES-RWD-002 — Home hero moves from split composition to illustration-first stack

- Classification: Observed at supplied references; intermediate trigger is Inferred.
- Stable: Heading, description, primary CTA, product illustration.
- Large/medium: Copy and illustration can coexist side by side.
- Compact: Illustration precedes the centered copy and CTA.
- Content-driven transition condition: Use the stacked presentation when copy and illustration can no longer coexist without making either unreasonably narrow.
- Evidence: EVD-011, Home frames 2141:1599, 2141:1724, 2141:1813.
- Requirement references: REQ-FR-001, REQ-NFR-001, REQ-NFR-002.

### DES-RWD-003 — Pricing progresses from three columns to stacked two-column cards to fully stacked cards

- Classification: Observed at supplied references; intermediate trigger is Inferred.
- Stable: Basic/Pro/Ultimate order, content, actions, Pro emphasis.
- Large: Three cards in one row.
- Medium: Cards stack vertically; each card splits summary/action and features into two internal columns.
- Compact: Cards remain stacked and each card's internal content becomes a single centered vertical flow.
- Content-driven transition condition:
  - leave the three-card row when cards cannot maintain readable widths and spacing;
  - leave the two-column card anatomy when summary and feature columns cannot coexist without compression or overflow.
- Evidence: EVD-011, EVD-014.
- Requirement references: REQ-FR-001, REQ-NFR-001, REQ-NFR-002.

### DES-RWD-004 — Countdown keeps four units while compressing unit width

- Classification: Observed.
- Stable: Launch overline, four units, unit order, related CTA where present.
- Large/medium: Wider unit blocks and larger display typography.
- Compact: Four narrower equal units remain on one row with reduced value typography.
- Content-driven transition condition: Unit blocks may shrink and display role may step down, but the four-part grouping should remain readable without horizontal page scrolling.
- Evidence: EVD-015, Home/Sign Up compact countdown nodes.
- Requirement references: REQ-FR-011, REQ-NFR-001, REQ-NFR-002.

### DES-RWD-005 — Sign Up changes from split layout to vertical flow before the form becomes cramped

- Classification: Observed at supplied references; intermediate trigger is Inferred.
- Stable: Header, intro, countdown, form field order, form action.
- Large: Intro/countdown and form share the row.
- Medium/compact: Intro/countdown precede a centered form in a vertical flow.
- Content-driven transition condition: Use vertical flow when the intro region plus approximately 445px form and required gutters can no longer coexist comfortably.
- Evidence: EVD-012, Sign Up frames 2141:1680, 2141:1896, 2141:1940.
- Requirement references: REQ-FR-002, REQ-NFR-001, REQ-NFR-002.

### DES-RWD-006 — Sign Up form stays comfortable first, then becomes fluid

- Classification: Observed.
- Stable: Single-column field arrangement and vertical rhythm.
- Large/medium: Form remains approximately 445px wide.
- Compact: Form becomes fluid within the viewport, shown at 327px inside the 375px reference.
- Content-driven transition condition: Preserve the larger form width while space allows; then reduce width with outer gutters rather than causing page overflow.
- Evidence: EVD-012, Sign Up form nodes 2141:1716 and 2141:1976.
- Requirement references: REQ-FR-002, REQ-NFR-001, REQ-NFR-002.

### DES-RWD-007 — Intermediate widths must interpolate by preserving hierarchy

- Classification: Recommended.
- Intent: When a supplied composition is no longer viable, switch to the next simpler structural pattern based on content fit rather than a familiar device number.
- Evidence: AUD-002, EVD-011, EVD-012.
- Requirement references: REQ-NFR-002.
- Implications:
  - avoid clipping decorative artwork into required content;
  - prevent required buttons/controls from becoming narrower than their content permits;
  - allow text to wrap naturally;
  - retain readable line lengths;
  - keep page-level horizontal scrolling out of the required flow.

## 11. States and Edge Cases

### Supplied states

- Buttons: Default, Hover, Focus.
- Text fields: Default, Hover, Focus.
- Plan Select: Default, Hover, Focus.
- Pricing: default visual compositions only.
- Countdown: static design state only.

### Requirements-defined states without supplied Figma compositions

#### Invalid field

Recommended visual direction:

- keep the control in the same component family;
- use red/400 for invalid indication and inline message;
- preserve the normal visible focus ring when the invalid control receives focus;
- do not use color alone to communicate the problem.

#### Successful local persistence

Recommended visual direction:

- keep the user on the form surface;
- show concise visible confirmation near the submit action;
- use existing blue/neutral visual language rather than adding an unsupported green semantic token;
- avoid clearing or moving content in a way not required by the product source.

#### Failed local persistence

Recommended visual direction:

- keep entered values visible where technically possible;
- show failure feedback near the submission context;
- use the existing red token plus text, not color alone.

#### Native select open state

- The closed control follows Figma.
- The option popup is platform/browser presentation because REQ-FR-005 requires a native select.
- No bespoke menu overlay is introduced by design.

### Long content

- Not supplied by Figma.
- Recommended: allow supporting paragraphs, feature lines, validation messages, and status feedback to wrap without clipping.
- Pricing-card heights should be allowed to grow when replacement content needs additional lines.
- Exact content-length limits are not established.

### Missing content or assets

- No empty marketing/content state is defined by active sources.
- Decorative orbit artwork must never be required for comprehension.
- If the dashboard illustration cannot be loaded, primary hero copy and CTA should still retain their hierarchy; exact fallback rendering belongs to Stage 4/implementation planning.

### Countdown terminal state

Open question: active sources do not define behavior when the countdown reaches the target. Stage 3 does not invent a terminal visual state.

## 12. Accessibility Intent

The design source suggests accessibility intent but does not establish runtime compliance.

### Semantic hierarchy and reading order

- Preserve a clear page heading followed by supporting content and actions.
- Preserve Basic, Pro, Ultimate order.
- Keep the Sign Up logical order intro/countdown then form even when desktop places them side by side.
- Decorative orbit artwork should not interrupt the accessible reading order.

### Keyboard and focus

- All supplied interactive component families expose a distinct Focus state.
- Hover treatment must never be the only visual affordance.
- Keyboard users must be able to reach navigation, plan selection, form fields, and submit action per REQ-AR-001.
- Focus treatment should remain the established blue/white ring style where applicable.

### Form labels and validation

- Figma visually places field text inside the control and does not prove accessible labeling.
- REQ-AR-004 remains a Recommended requirement: visible design may preserve the supplied minimal control appearance while implementation provides programmatically determinable labels independently.
- REQ-AR-005 remains a Recommended requirement: field-specific validation feedback should be associated with the affected control.
- The design should not force placeholder-only naming as an accessibility requirement.

### Contrast and state distinction

- The supplied palette and explicit focus states indicate intent for strong visual distinction.
- Runtime contrast must still be verified in Stage 11; this document does not claim compliance from Figma alone.
- Invalid/error treatment should use both color and text.

### Touch targets and reflow

- Primary/pricing actions are about 50px tall in the source.
- Form controls are about 43–45px tall.
- Compact compositions demonstrate deliberate reflow rather than desktop shrinkage.
- Intermediate and zoom/reflow behavior still requires later specification and validation.

### Alternative text

- Orbit artwork is Recommended as decorative.
- Product Dashboard is Inferred as illustrative rather than primary content. If implementation treats it as informative, Stage 4 must define an appropriate text alternative; otherwise it should not duplicate surrounding copy.

### Motion and announcements

- Prototype navigation contains no transition animation.
- No reduced-motion variant is supplied because no design-level motion is demonstrated.
- Once-per-second countdown changes should not be promoted into continuous assistive announcements without a product requirement.
- Persistence success/failure must be programmatically announced under REQ-AR-003.

## 13. Assets and Design-system Mapping

| Asset or pattern | Evidence | Existing design resource | Design intent / required action | Risk |
|---|---|---|---|---|
| Brand / Logo | EVD-004, EVD-010 | Local component 4:871 | Reuse brand mark; interactive on Sign Up return path | Low |
| Product Dashboard | EVD-004 | Local component 5:275 | Reuse as scalable hero illustration; do not treat internal microcopy as primary page content | Medium |
| Hero Orbits | EVD-004 | Local component 2141:931 | Reuse as decorative artwork when practical | Low |
| Footer Orbits | EVD-004 | Local component 2141:932 | Reuse as decorative dark-section artwork when practical | Low |
| Primary button | EVD-005 | Component set 10:526 | Preserve Default/Hover/Focus language | Low |
| Pricing buttons | EVD-005 | Component sets 10:531 and 10:567 | Preserve surface-specific action hierarchy | Low |
| Text field | EVD-006 | Component set 10:503 | Preserve closed/default/hover/focus visual language; extend carefully for validation | Medium |
| Plan Select | EVD-006 | Component set 10:512 | Preserve closed control treatment; native popup remains platform-owned | Medium |
| Pricing cards | EVD-014, AUD-012 | Repeated frames, not component set | Treat as reusable design pattern without claiming an existing code component | Medium |
| Countdown | EVD-015, AUD-012 | Repeated frames, not component set | Treat as shared design pattern; live behavior comes from requirements | Medium |
| Color/spacing/radius tokens | EVD-007 | One local variable collection | Reuse observed token vocabulary; avoid unnecessary new semantic colors | Medium |
| Kumbh Sans roles | EVD-008 | Seven local text styles | Reuse role hierarchy | Low |

No external Figma library dependency is established. The repository baseline contains an Astro starter rather than an existing Officelite product component system, so design-system mapping currently points primarily to Figma resources, not reusable product code.

## 14. Inferences, Recommendations, and Open Questions

### Inferred

- The 375px, 768px, and supplied desktop frames are responsive reference conditions rather than device-specific routes or exact implementation breakpoints.
- Orbit artwork is decorative.
- Product Dashboard is illustrative rather than essential semantic content.
- Content-fit pressure, not a predetermined device taxonomy, should determine transitions between the demonstrated layout patterns.

### Recommended

- Extend the existing red token and inline-message pattern for requirements-defined invalid/failure states.
- Keep success feedback in existing blue/neutral visual language because no success-green token exists.
- Preserve the existing blue/white focus ring independently from invalid/error state.
- Allow validation/status text and replacement marketing content to increase container/card height.
- Use platform-native open-menu presentation for the required native Plan Select.
- Avoid per-second screen-reader announcements for countdown ticks.
- Switch responsive structures when content no longer fits comfortably rather than copying the supplied frame widths as CSS breakpoints.

### Open questions

- What final user-facing copy should be used for required-field, invalid-email, persistence-success, and persistence-failure feedback?
- What visual state should be shown when the countdown reaches its target?
- Is Product Dashboard definitively decorative, or does product want an informative alternative text?
- Are any additional disabled/loading states required for the current release? Active requirements do not currently require them.
- What browser/device support matrix will later define the exact native-select and responsive validation surface?

None of these questions blocks Stage 3 documentation; the first two must remain visible for Stage 4/specification and later validation.

## 15. Risks and Inconsistencies

| Finding | Evidence | Impact | Resolution owner |
|---|---|---|---|
| Different large reference widths for Home and Sign Up | AUD-001 | A shared desktop breakpoint cannot be inferred from frame labels | Stage 4/7 |
| Intermediate responsive behavior not explicitly demonstrated | AUD-002 | Layout could diverge between supplied examples | DES-RWD-007, then Stage 4/7 |
| Plan preservation not encoded in Figma prototype | AUD-003, AUD-004 | Visual source alone is insufficient | REQUIREMENTS.md + DES-INT-002 |
| No invalid/success/failure component states in Figma | AUD-005, AUD-007 | Runtime feedback could visually drift | DES-008, DES-009, DES-INT-006 |
| No open Plan Select composition | AUD-006 | Bespoke menu appearance cannot be derived | REQ-FR-005 + DES-INT-005 |
| Visible field text does not prove persistent labels | AUD-008 | Accessible naming cannot be inferred | REQ-AR-004 + Stage 4 |
| Countdown behavior is not demonstrated visually | AUD-009 | Live behavior comes from requirements, not design source | REQ-FR-011 + DES-INT-007 |
| Figma source is mutable/time-bound | AUD-010 | Later work can become stale | Canonical snapshot verification |
| Screenshot URLs cannot be fetched in current runtime | AUD-011 plus Stage 3 retry | No new pixel-level review claim is possible | Preserve limitation; rely on approved audit + metadata |
| Pricing/countdown repeats are not Figma components | AUD-012 | Code boundaries must not be copied mechanically | Stage 6/7 |
| Token collection is generic and single-mode | AUD-013 | Semantic implementation mapping needs later interpretation | Stage 6/7 |
| Long/localized/feedback copy variants are absent | AUD-014 | Content robustness needs explicit later specification | Stage 4 |

## 16. Requirement Traceability

| Design decision | Requirements supported |
|---|---|
| DES-001 | REQ-FR-001, REQ-NFR-001 |
| DES-002 | REQ-FR-003, REQ-FR-004, REQ-FR-005 |
| DES-003 | REQ-FR-001, REQ-BR-001 |
| DES-004 | REQ-FR-003, REQ-FR-012, REQ-AR-002 |
| DES-005 | REQ-FR-002, REQ-FR-006, REQ-FR-007 |
| DES-006 | REQ-FR-011, REQ-BR-005 |
| DES-007 | REQ-FR-001, REQ-FR-002, REQ-NFR-001 |
| DES-008 | REQ-FR-007, REQ-AR-002, REQ-AR-005 |
| DES-009 | REQ-FR-009, REQ-FR-010, REQ-AR-003 |
| DES-010 | REQ-BR-005, REQ-CON-004 |
| DES-011 | REQ-NFR-001, REQ-AR-001 |
| DES-INT-001 | REQ-FR-003, REQ-AR-001, REQ-AR-002 |
| DES-INT-002 | REQ-FR-004, REQ-FR-005 |
| DES-INT-003 | REQ-FR-012, REQ-AR-001, REQ-AR-002 |
| DES-INT-004 | REQ-AR-001, REQ-AR-002 |
| DES-INT-005 | REQ-FR-005, REQ-AR-001 |
| DES-INT-006 | REQ-FR-007, REQ-FR-009, REQ-FR-010, REQ-AR-003, REQ-AR-005 |
| DES-INT-007 | REQ-FR-011 |
| DES-RWD-001–DES-RWD-007 | REQ-NFR-001, REQ-NFR-002 and relevant Home/Sign Up functional requirements |

## 17. Review

### Pass 1 — Completeness and correctness

- [x] Purpose, information hierarchy, screen structure, visual roles, component patterns, interactions, responsive transformations, states, content edges, accessibility intent, assets, and design-system mapping are covered.
- [x] The document describes intent and relationships rather than duplicating raw Figma properties.
- [x] Observed visual states are kept separate from requirements-defined states that need Recommended design extensions.
- [x] Home and Sign Up are both covered across large, medium, compact, and intermediate-width intent.
- [x] No backend, persistence schema, routing architecture, repository structure, or implementation sequencing is prescribed.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] DES-, DES-RWD-, and DES-INT- identifiers follow the pinned Identifier Conventions.
- [x] Material decisions reference EVD/AUD evidence and relevant REQ identifiers.
- [x] Confirmed, Observed, Inferred, Recommended, and Open information remain distinct.
- [x] No supplied frame width is presented as an implementation breakpoint.
- [x] No bespoke Plan Select overlay is invented where the approved requirement specifies a native select.
- [x] Validation and persistence visual extensions are marked Recommended because Figma does not supply those states.
- [x] The mutable Figma source remains explicitly time-bound and requires canonical verification before gate closure.
- [x] The screenshot retrieval limitation is recorded rather than hidden.
- [x] No Stage 3 blocking design question remains.

## 18. Stage 3 Completion Summary

- Files created or modified: DESIGN.md.
- Important findings:
  - the approved visual hierarchy and design-system evidence remain consistent with the current Figma scope;
  - responsive transformations can be described without inventing breakpoint numbers;
  - native Plan Select resolves the missing bespoke open-menu design requirement;
  - validation and persistence outcomes require design extensions because Figma supplies no error/success states;
  - existing red, blue, neutral, focus, radius, and spacing language is sufficient to extend those states without introducing an unrelated visual system;
  - countdown terminal behavior and final feedback copy remain open.
- Assumptions introduced: only the explicitly labeled Inferred items in this document.
- Open questions or blockers: no Stage 3 blocker; copy, countdown terminal state, and final accessibility semantics remain downstream decisions.
- Readiness: ready for Stage 3 canonical source verification, artifact review, stage preflight, and human gate approval.
