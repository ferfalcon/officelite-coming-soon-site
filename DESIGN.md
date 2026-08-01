# Officelite Coming Soon Site — Design Intent

## 1. Document information

- **Status:** Draft — Stage 3 complete
- **Version:** 0.1
- **Last updated:** 2026-08-01
- **Owner:** Project owner
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Figma file key:** `L7MdLOW8usVUcPwV0cMQ1n`
- **Analyzed page:** `4:2` — `👋 Overview`
- **Supplied node:** `4:3` — `Border`
- **Primary evidence:** `FIGMA-AUDIT.md`, `REQUIREMENTS.md`, Figma production frames, component sets, foundations, and interaction-state frames
- **Downstream documents:** `SPEC.md`, `ARCHITECTURE.md`, `PLAN.md`

## 2. Authority and evidence classification

This document is the design-intent source of truth for the current scope. It explains the visual structure, hierarchy, interaction intent, responsive transformations, and design-system relationships represented by Figma and approved stakeholder decisions.

- **Confirmed:** established by `REQUIREMENTS.md` or an explicit user decision.
- **Observed:** directly visible or defined in Figma.
- **Inferred:** strongly suggested by the design but not explicitly approved.
- **Recommended:** proposed to resolve a design gap and requiring approval.
- **Open question:** cannot be determined safely from the available evidence.

`DESIGN.md` does not define implementation architecture or precise test procedures. Those responsibilities belong to `ARCHITECTURE.md`, `SPEC.md`, and `PLAN.md`.

## 3. Design purpose and intent

Officelite is designed as a focused pre-launch experience with one primary journey:

1. Understand the product proposition.
2. Compare the three plans.
3. See the intended launch timing.
4. Move to Sign Up with plan context preserved.
5. Submit interest and receive clear local-storage feedback.

The visual direction is restrained, spacious, and product-oriented. A light neutral canvas prioritizes the message and pricing content, while a dark lower region anchors the countdown and conversion endpoint. Blue is the primary action and emphasis color. Large orbit graphics and the dashboard illustration create depth and product personality without carrying essential meaning.

### Design principles

- **Clarity before decoration:** Marketing copy, plan comparison, and actions remain understandable without the illustration or orbit artwork.
- **One dominant conversion path:** Repeated calls to action all lead to the same Sign Up experience.
- **Strong but limited emphasis:** The Pro plan and primary actions use saturated blue; supporting plans remain neutral.
- **Responsive re-composition:** Layouts change grouping, order, and card anatomy rather than merely scaling the desktop composition.
- **Consistent control language:** Reusable buttons and form controls share default, hover, and focus patterns.
- **Future-ready content:** Placeholder copy, pricing, and dates can change without changing the design hierarchy.

**Supports:** `G-001`–`G-005`, `FR-001`–`FR-012`, `CR-001`, `CR-002`.

## 4. Information architecture and reading order

### 4.1 Home

**Observed source:** Home section `2141:2383`; production frames `2141:1599`, `2141:1724`, `2141:1813`.

The visual sequence is:

1. Officelite brand header
2. Hero illustration and product proposition
3. Primary `Get Started` action
4. Basic, Pro, and Ultimate pricing plans
5. Launch date and countdown
6. Final `Get Started` action

On large and medium layouts, the hero copy appears before the illustration in the left-to-right reading direction. On the compact composition, the decorative illustration appears visually before the heading.

**Confirmed:** The compact semantic order follows the visual order. The illustration is decorative and removed from the accessibility tree, so assistive-technology reading proceeds from the meaningful heading and copy without redundant image output. This supports `AR-005` and the stakeholder reading-order decision.

### 4.2 Sign Up

**Observed source:** Sign Up section `2141:2386`; production frames `2141:1680`, `2141:1896`, `2141:1940`.

The visual and meaningful sequence is:

1. Officelite logo
2. Page heading and explanatory copy
3. Launch date and countdown
4. Sign-up form
5. Submission feedback within the form context

On large layouts, introduction/countdown and form are presented side by side. On medium and compact layouts, they stack vertically.

**Confirmed:** The logo is navigation only on Sign Up and returns to Home. The Home logo is not required to behave as a link. This supports `FR-010` and `BR-006`.

## 5. Screen and page structure

### 5.1 Home structure

#### Header

- Contains only the Officelite brand.
- Uses substantial whitespace and no navigation menu.
- Acts as orientation rather than a competing interaction area.

#### Hero

- Combines a large proposition, supporting paragraph, primary CTA, and dashboard illustration.
- Decorative orbit geometry extends beyond the viewport and is clipped.
- The CTA sits close to the copy to make the next action unambiguous.

#### Pricing

- Presents three comparable plans with the same content categories: name, price, billing summary, features, and CTA.
- Pro is the featured plan and receives the only saturated card surface.
- The card group bridges the light content area and dark countdown region, visually connecting comparison and conversion.

#### Launch countdown

- Uses an uppercase, tracked date label followed by four time units.
- The final CTA is separated from the numeric group on large layouts and centered below it on narrower layouts.
- Orbit geometry continues in the dark region to visually relate the footer to the hero artwork.

### 5.2 Sign Up structure

#### Header

- Contains the logo as the only Home navigation.
- Retains the same brand scale and whitespace language as Home.

#### Introduction and countdown

- Uses a shorter heading and supporting paragraph than Home.
- Places the countdown directly after the explanation to reinforce launch context before data entry.

#### Form panel

- Uses a raised white surface over the light/dark page boundary.
- Contains four text-entry fields, one plan select, and a full-width primary action.
- Groups fields with even vertical rhythm and a stronger separation before the submission action.
- Preserves the selected plan when navigation originates from a pricing CTA.

**Supports:** `FR-001`, `FR-004`, `FR-009`, `RR-003`, `RR-004`.

## 6. Layout system

### 6.1 Page canvas and vertical composition

**Observed:** Both pages use `#FAFAFA` as the primary page surface and `#25293A` as the dark lower region. Large decorative orbit systems are positioned independently of content and clipped by page boundaries.

The light-to-dark transition is structural, not merely decorative:

- On Home, pricing cards overlap the transition and lead into the countdown.
- On Sign Up, the form overlaps or sits against the transition, keeping the conversion panel visually connected to both introduction and footer space.

Only decorative artwork may overflow and be clipped. Text, controls, cards, feedback, and meaningful content must grow with content and remain visible.

### 6.2 Large content container

**Observed:** Home large uses a centered 1110 px content region within the 1440 px frame. Sign Up large also uses a 1110 px region, although its source frame is 1321 px wide.

**Design intent:** The shared content width is more important than the differing Figma frame widths. At large viewports, meaningful content remains centered with generous outer margins rather than stretching indefinitely.

### 6.3 Grid intent

- **Large observed grid:** 12 columns, 65 px columns, 30 px gutters, 165 px offset in the 1440 px Home frame.
- **Medium observed grid:** 12 columns, 48 px columns, 10 px gutters, approximately 39 px offset in the 768 px frames.
- **Compact confirmed layout:** Fluid content containers, not the hidden copied tablet grid.

The hidden 12-column metadata on the compact frames is stale and must not guide implementation. The operative compact layout uses:

- 16 px outer insets for primary Home and Sign Up content
- 343 px content width in the 375 px source frames
- 24 px outer insets for the 327 px Sign Up form
- 20 px internal horizontal padding in the compact form

### 6.4 Fixed and fluid behavior

- The large content region has a maximum width.
- Medium and compact regions are fluid within their insets.
- Buttons retain their intended minimum height and pill shape while labels remain centered.
- Pricing cards and the form may grow vertically when content or feedback is longer.
- Decorative illustrations preserve their aspect ratio and may scale down.
- Fixed Figma frame heights are compositional references, not content-height limits.

**Supports:** `RR-002`–`RR-005`, `CR-002`, `NFR-002`, `AR-008`.

## 7. Visual hierarchy

### 7.1 Primary hierarchy

1. Page heading
2. Primary CTA or Sign Up action
3. Featured Pro plan
4. Launch date and countdown values
5. Supporting copy and plan details
6. Decorative artwork

The heading establishes the page purpose. Primary actions use saturated blue and high visual separation. The Pro card uses a full blue surface, making it the dominant pricing option without increasing its structural complexity.

### 7.2 Grouping and density

- Related text is grouped with tighter spacing than the separation between sections.
- Pricing-card summaries are separated from feature lists and CTAs.
- Countdown values are visually grouped as one unit but remain individually labeled.
- The form keeps a calm, regular field rhythm and reserves larger separation for the submit action.
- Large whitespace around the logo, hero, and form reinforces a premium, uncluttered tone.

### 7.3 Emphasis rules

- Use blue for actions, selected date text, featured-plan surfaces, and key countdown values on light backgrounds.
- Do not introduce additional competing accent colors.
- Use dark neutral text for headings and strong labels.
- Use muted neutral text for supporting copy, features, and unselected form prompts.

## 8. Typography

All production typography uses Kumbh Sans. The Figma foundations are in section `2141:938`.

| Role / Figma style | Font | Weight | Size | Line height | Tracking | Design usage |
|---|---|---:|---:|---:|---:|---|
| `Display/Large` | Kumbh Sans | Bold | 56 px | 120% | 0 | Large Home heading, large prices, large countdown values |
| `Display/Medium` | Kumbh Sans | Bold | 40 px | 120% | 0 | Medium/compact headings and compact countdown values |
| `Heading/Small` | Kumbh Sans | Bold | 20 px | 140% | 0 | Plan names and compact section-level emphasis |
| `Body/Large` | Kumbh Sans | Regular | 18 px | 150% | 0 | Hero and Sign Up explanatory copy |
| `Body/Medium` | Kumbh Sans | Regular | 16 px | 160% | 0 | Billing summaries, features, fields, and supporting content |
| `Label/Strong` | Kumbh Sans | Bold | 16 px | 160% | 0 | Buttons, selected plan, countdown units |
| `Label/Overline` | Kumbh Sans | Bold | 16 px | 160% | 5 px | Uppercase launch-date label |

### Typography intent

- Display sizes create strong page-level hierarchy but should step down on medium and compact layouts.
- Body line height is intentionally generous to preserve readability in narrow columns.
- The overline style is reserved for launch timing and should not spread to unrelated labels.
- Placeholder content may be longer; text must wrap without clipping or forcing fixed-height containers.
- Plan prices remain visually dominant inside cards, but the plan name precedes them in reading order.

**Supports:** `FR-001`, `FR-004`, `CR-001`, `CR-002`, `NFR-002`.

## 9. Color and visual tokens

Figma variables are stored in collection `4:385` (`Collections`). The current colors remain approved for this stage despite documented contrast risk.

| Semantic role | Figma variable | Value | Intended use |
|---|---|---:|---|
| Canvas | `colors/neutral/50` | `#FAFAFA` | Main light page background |
| Surface | `colors/neutral/0` | `#FFFFFF` | Cards, form panel, inverse button |
| Primary text / dark region | `colors/neutral/900` | `#25293A` | Main headings, dark page background |
| Strong supporting text | `colors/neutral/800` | `#333950` | Plan text and dark tiles |
| Secondary text | `colors/neutral/500` | `#747B95` | Body copy, features, field prompts |
| Primary accent | `colors/blue/500` | `#5175FF` | Primary actions, Pro plan, date accent |
| Accent hover | `colors/blue/300` | `#829CFF` | Primary-button hover state |
| Subtle accent surface | `colors/blue/100` | `#E4EAFF` | Standard pricing button and light countdown tiles |
| Error candidate | `colors/red/400` | `#F05B5B` | Existing error-oriented token; final feedback design is not approved |

### Color intent and deviation

- Blue is the sole brand/action accent.
- White and pale blue establish card and control depth against the neutral canvas.
- Dark neutral creates the launch-countdown region and visual endpoint.
- Error and success must not depend on color alone.
- Several current foreground/background combinations are below common WCAG AA thresholds for normal text.

**Confirmed deviation:** Preserve the current palette for this stage and do not claim full WCAG AA conformance. This supports `AR-009` and `CON-007`.

## 10. Spacing and radius relationships

### 10.1 Foundation scale

The spacing collection contains:

`0`, `2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`, `96`, `112`, `128`, and `140` px.

`spacing/125 = 10` was added to Figma and verified during Stage 1.

The radius collection contains:

`0`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, and `999` px.

### 10.2 Relationship intent

- 8–16 px values handle tight control and label relationships.
- 20–24 px values separate related text or card content groups.
- 40 px is a recurring panel/card internal separation and large form padding.
- 64–80 px values separate major responsive content groups.
- Larger values create page-level vertical rhythm rather than component internals.
- 12 px radius defines cards and the form panel.
- Full radius defines all pill-shaped CTAs.

Spacing should preserve these relationships when content grows; exact absolute heights should not override readable grouping.

## 11. Components and variants

### 11.1 Brand / Logo

**Figma component:** `4:871`

- **Purpose:** Brand identification and, on Sign Up only, Home navigation.
- **Anatomy:** Overlapping blue circular mark and dark wordmark.
- **Variants:** None.
- **Content rule:** Accessible name identifies Officelite; decorative internal geometry is not separately announced.
- **Reuse:** Same visual component across both pages and all viewports.

### 11.2 Primary button

**Figma component set:** `10:526`

- **Purpose:** Generic `Get Started` and form submission actions.
- **Anatomy:** Centered strong label inside a 50 px-high pill.
- **Default:** `#5175FF` surface, white label, soft downward shadow.
- **Hover:** `#829CFF` surface, white label.
- **Focus:** Default surface with a high-visibility white/blue two-ring treatment.
- **Content rule:** Label may grow; control should preserve height and adequate horizontal padding.

### 11.3 Pricing standard button

**Figma component set:** `10:531`

- **Purpose:** CTA on neutral pricing cards.
- **Default:** Pale blue surface and blue label.
- **Hover:** Blue surface and white label.
- **Focus:** Pale blue surface with two-color focus treatment.

### 11.4 Pricing inverse button

**Figma component set:** `10:567`

- **Purpose:** CTA on the featured blue Pro card.
- **Default:** White surface and blue label.
- **Hover:** Pale blue surface and blue label.
- **Focus:** White surface with reversed two-color focus treatment.

### 11.5 Product dashboard illustration

**Figma component:** `5:275`

- **Purpose:** Visually suggest analytics, typography, and product-management capability.
- **Anatomy:** Line chart card, typography preview, and metric card.
- **Behavior:** Scales proportionally and changes position by viewport.
- **Accessibility:** Confirmed decorative; no alternative text is required.

### 11.6 Pricing card pattern

**Observed instances:** Basic `2141:1633`, Pro `2141:1643`, Ultimate `2141:1653` in the large Home frame.

- **Purpose:** Compare plan identity, price, billing model, features, and action.
- **Variants:** Neutral card and featured blue card.
- **Responsive anatomy:** Vertical on large and compact layouts; split summary/features composition on medium layouts.
- **Content rule:** Same data categories across plans. Cards grow vertically for longer content rather than truncating.
- **Selected emphasis:** Pro is visually featured, but this does not automatically mean it is the default selected plan; generic/direct Sign Up defaults to Basic under `FR-012`.

### 11.7 Countdown pattern

- **Purpose:** Present a date and four labeled time values.
- **Anatomy:** Overline date plus Days, Hours, Minutes, and Seconds tiles.
- **Variants:** Light tiles on Sign Up; dark tiles on Home’s dark region.
- **Behavior:** Values update visually once per second. Layout changes from left-aligned/horizontal to centered/stacked by viewport.
- **Content rule:** Labels remain `days`, `hours`, `min`, `sec`; date follows `DD Mon YYYY`.

### 11.8 Text field

**Figma component set:** `10:503`

- **Purpose:** Name, Email Address, Phone Number, and Company entry.
- **Anatomy:** Text area and underline divider.
- **States shown:** Default, Hover, Focus.
- **Focus:** White local surface with two-color ring treatment.
- **Accessibility intent:** A persistent programmatic label is required even though Figma shows prompt text inside the control area.
- **Gap:** Required-field invalid appearance and associated message are not designed.

### 11.9 Native plan select

**Figma component set:** `10:512`

- **Purpose:** Select Basic, Pro, or Ultimate.
- **Closed appearance:** Selected plan, supporting price text, underline divider, and downward chevron.
- **States shown:** Default, Hover, Focus.
- **Confirmed behavior:** Uses a native select interaction and platform menu. The Figma component describes the closed-state visual intent, not a custom popup implementation.
- **Accepted variance:** Open-menu visuals may differ across browsers and operating systems.

### 11.10 Form panel

**Observed instances:** `2141:1716`, `2141:1932`, `2141:1976`.

- **Purpose:** Contain fields, plan selection, action, and feedback.
- **Surface:** White, 12 px radius, elevated shadow.
- **Large/medium:** 445 px reference width with 40 px padding.
- **Compact:** 327 px reference width with 20 px horizontal padding.
- **Content behavior:** Grows vertically for validation, failure, success, or longer labels.

### 11.11 Orbit decoration

**Figma components:** Hero `2141:931`; Footer `2141:932`.

- **Purpose:** Establish a consistent orbital visual motif and depth.
- **Behavior:** Positioned independently, may extend beyond the page, and is clipped.
- **Accessibility:** Decorative and excluded from the accessibility tree.
- **Motion:** No motion is demonstrated or required.

## 12. Interaction intent

### 12.1 Navigation

- Hero and countdown `Get Started` actions open Sign Up with Basic selected.
- Basic, Pro, and Ultimate pricing actions open Sign Up with the corresponding plan selected.
- Direct Sign Up navigation begins with Basic selected.
- The Sign Up logo returns Home.
- Prototype navigation uses direct transitions with no animation.

**Supports:** `FR-002`, `FR-003`, `FR-010`, `FR-012`.

### 12.2 Hover

- Hover changes button surfaces while retaining label readability.
- Form-field and select hover examples are present, but the difference is intentionally restrained.
- Hover is supplemental; no essential meaning depends on it.

### 12.3 Focus

- Focus is visually distinct from hover.
- Figma uses a two-color ring system to remain visible across light, blue, and dark surfaces.
- Focus treatment must remain visible at every responsive size.
- **Open question:** Whether every control should use exactly the same two-ring construction remains deferred.

### 12.4 Plan selection

- The select shows the current plan in the closed state.
- Native platform behavior governs opening, option navigation, and selection.
- A valid plan supplied by a pricing CTA overrides the Basic generic default.

### 12.5 Form validation and submission

- All five displayed values are currently required.
- Field-specific validation prevents storage and keeps the user in the form context.
- Successful activation does not equal successful sign-up; success appears only after IndexedDB confirms the write.
- IndexedDB failure preserves entered values where technically possible, suppresses success, and presents visible/programmatic failure feedback.

### 12.6 Feedback presentation

Figma does not include validation, success, or storage-failure compositions.

**Recommended, requiring approval:**

- Reserve a full-width form-status region between the field group and submit action for storage success or storage failure.
- Keep field-validation messages adjacent to their fields so the relationship remains clear.
- Use text and semantic status/error treatment in addition to color.
- Allow the form panel to grow rather than overlaying feedback on controls.
- Preserve the user’s data after storage failure.

**Open question:** Exact message copy, icons, colors, spacing, and whether success replaces the fields or appears alongside them remain unapproved.

## 13. Responsive behavior

### 13.1 Reference thresholds

**Confirmed values:** `24rem`, `48rem`, and `80rem`.

These are design reference thresholds for compact, medium, and large transformations. The 375 px Figma frames represent the compact range near 24rem; the 768 px frames represent 48rem; the large compositions represent the 80rem-and-above intent.

**Open question:** Exact inclusive/exclusive media-query semantics belong in `SPEC.md`.

Below the compact reference, content must continue to shrink or wrap fluidly without horizontal scrolling in the primary flow. Between reference thresholds, spacing and widths interpolate fluidly rather than snapping to fixed Figma dimensions.

### 13.2 Home — compact intent

**Figma frame:** `2141:1813` — 375 × 2801.

- Center the brand.
- Place the decorative illustration above the hero copy.
- Center heading, supporting copy, and primary CTA.
- Use 16 px primary content insets.
- Stack all pricing cards vertically.
- Use centered vertical card anatomy.
- Begin the dark background behind the pricing stack so the cards bridge the light/dark regions.
- Center the launch label, countdown, and final CTA.
- Keep four countdown tiles on one row while allowing safe compression or wrapping at unusually narrow widths if needed.

### 13.3 Home — medium intent

**Figma frame:** `2141:1724` — 768 × 2164.

- Keep hero copy and illustration side by side at a reduced scale.
- Use approximately 40 px page insets.
- Stack pricing cards vertically.
- Change each pricing card to a horizontal internal composition: summary/action on the left, features on the right.
- Keep the featured Pro card blue and include its decorative orbit detail.
- Center the countdown group and final CTA in the dark region.

### 13.4 Home — large intent

**Figma frame:** `2141:1599` — 1440 × 1778.

- Use the centered 1110 px content region.
- Present hero copy and illustration as balanced columns.
- Present all three pricing cards in one row.
- Keep the pricing row overlapping the light/dark transition.
- Align launch label/countdown left and final CTA right.
- Preserve generous whitespace around the hero and pricing group.

### 13.5 Sign Up — compact intent

**Figma frame:** `2141:1940` — 375 × 1244.

- Center the logo, heading, copy, date, and countdown.
- Use 16 px primary content insets.
- Keep four compact countdown tiles on one row.
- Place the 327 px form inside 24 px outer insets.
- Use 20 px internal horizontal form padding.
- Let the form overlap the dark lower region.
- Grow form height for validation and status feedback.

### 13.6 Sign Up — medium intent

**Figma frame:** `2141:1896` — 768 × 1230.

- Center introduction and countdown above the form.
- Retain the 445 px form reference width.
- Let the dark lower region begin behind the lower part of the form.
- Preserve generous vertical separation between countdown and form.

### 13.7 Sign Up — large intent

**Figma frame:** `2141:1680` — 1321 × 1024.

- Use a centered 1110 px content region.
- Place introduction/countdown on the left and form on the right.
- Use a dark right-side background region as the visual anchor.
- Allow the form to overlap the light/dark boundary.
- Keep the form vertically aligned with the main introduction, not the header.

**Supports:** `RR-001`–`RR-006`, `AR-008`, `NFR-002`.

## 14. States and edge cases

| State or condition | Design intent | Evidence / status |
|---|---|---|
| Default | Use the production-frame appearance. | Observed in all six production frames. |
| Hover | Apply supplied button, text-field, and select variants. | Observed in component sets and interaction frames `2141:2441`, `2141:2387`. |
| Focus | Apply visible focus independent of hover. | Observed in component sets and frames `2141:2542`, `2141:2638`. |
| Active / pressed | No separate visual state is defined. Native activation feedback may occur. | Outside current design scope. |
| Selected plan | Closed select displays the selected plan. Pro remains visually featured on Home. | Observed/confirmed. |
| Select open | Use the native platform menu. | Confirmed decision. |
| Disabled | No disabled state is required or designed. | Outside current design scope. |
| Loading | No loading state is required or designed. | Outside current design scope. |
| Required-field error | Keep message associated with the field; exact appearance unapproved. | Functional requirement exists; design gap. |
| Storage failure | Preserve values, suppress success, and show/announce a form-level error. | Confirmed behavior; visual pattern open. |
| Success | Show/announce confirmation after the IndexedDB commit. | Confirmed behavior; visual pattern open. |
| Long marketing copy | Wrap and grow containers; preserve hierarchy and spacing relationships. | Confirmed content requirement. |
| Long feedback copy | Grow the form vertically; do not overlap fields or submit action. | Inferred from flexible-content requirement. |
| Missing decorative SVG | Preserve layout and meaningful content without a broken-image placeholder. | Recommended resilience behavior. |
| Countdown at zero | No design is required. | Explicitly out of scope. |
| JavaScript unavailable | Static product and pricing content should remain readable where feasible; dynamic behavior may not operate. | Inferred `NFR-007`, not a confirmed Must. |

## 15. Accessibility intent

### 15.1 Structure and semantics

- Use page landmarks and one clear page-level heading per page.
- Preserve meaningful reading order across responsive re-composition.
- Use links for navigation, buttons for actions, labeled inputs for data entry, and a native select for Plan.
- Do not use ARIA when native semantics already provide the required behavior.

### 15.2 Labels and instructions

- Every field has a persistent programmatic label.
- Prompt or placeholder text is not the only accessible name.
- Required state and validation relationships are programmatically exposed.
- Error messages identify the affected field and explain what must change once copy is approved.

### 15.3 Keyboard and focus

- All navigation, plan selection, submission, and feedback paths are keyboard operable.
- Focus remains visible on light, blue, and dark surfaces.
- Feedback does not cause unexpected focus movement.
- The native select retains platform keyboard behavior.

### 15.4 Dynamic content

- Countdown values update visually every second.
- Do not expose every one-second tick through an assertive live region.
- Success and storage-failure feedback are announced when their state changes.
- Field-validation feedback is associated with the relevant controls.

### 15.5 Decorative content

- Dashboard illustration and orbit systems are ignored by assistive technology.
- Their absence does not remove product meaning or navigation.

### 15.6 Reflow, zoom, and touch

- Primary functionality remains available at narrow widths and with enlarged text.
- Content grows rather than clipping.
- Primary buttons retain the observed 50 px height.
- The 43–45 px form-control references should not be reduced below a comfortably operable target.

### 15.7 Contrast deviation

The current palette includes known normal-text contrast risks. Preserve the palette for this stage, document the deviation, and do not state that the current design fully conforms to WCAG AA.

**Supports:** `AR-001`–`AR-010`, `CON-004`, `CON-007`.

## 16. Assets and iconography

| Asset | Figma reference | Design role | Treatment |
|---|---|---|---|
| Officelite logo | `4:871` | Brand identity and Sign Up Home link | Reuse existing vector/SVG asset; preserve aspect ratio |
| Product dashboard illustration | `5:275` | Decorative product character | Reuse existing SVG; responsive scale; `aria-hidden` |
| Hero orbit system | `2141:931` | Decorative depth behind hero | Reuse vector/SVG; crop through container overflow |
| Footer orbit system | `2141:932` | Decorative continuity in dark region | Reuse vector/SVG; crop through container overflow |
| Select chevron | Inside `10:512` | Indicates closed select affordance | Decorative when native select semantics provide state |

No raster photography is part of the approved design. The existing matching SVG assets should be reused rather than redrawn.

## 17. Design-system mapping

### 17.1 Existing Figma foundations

**Observed source:** Design System — Foundations `2141:938`; Design System — Components `2141:935`.

- One local variable collection with color, spacing, and radius primitives
- Seven Kumbh Sans text styles
- Local reusable components for logo, buttons, form controls, illustration, and orbit artwork
- Default, hover, and focus variants for interactive component families

### 17.2 Existing patterns suitable for implementation mapping

| Design pattern | Figma source | Requirement support |
|---|---|---|
| Brand logo | `4:871` | `FR-001`, `FR-004`, `FR-010` |
| Primary button | `10:526` | `FR-002`, `FR-008`, `FR-011` |
| Pricing buttons | `10:531`, `10:567` | `FR-002`, `FR-003` |
| Text field | `10:503` | `FR-004`, `FR-006`, `AR-004` |
| Plan select | `10:512` | `FR-003`, `FR-005`, `FR-012` |
| Illustration | `5:275` | `FR-001`, `AR-005` |
| Orbit decorations | `2141:931`, `2141:932` | `AR-005`, `AR-010` |

### 17.3 Patterns not encoded as reusable Figma components

The production frames repeat patterns that are not represented as standalone documented component sets:

- Pricing card, including neutral and featured variants
- Countdown group and countdown unit
- Sign Up form panel
- Field-validation message
- Form-level success/storage-failure status

**Recommended:** Treat repeated pricing, countdown, and form-panel structures as reusable conceptual patterns in `SPEC.md` and architecture. Do not infer a code-component boundary solely from Figma grouping.

### 17.4 Design-system inconsistencies and deferrals

- Components are local, unpublished, and have no descriptions.
- Variables use `ALL_SCOPES` and no platform code syntax.
- There are no local paint, effect, or grid styles.
- The mobile frames retain a stale hidden tablet grid.
- Feedback and invalid states are required functionally but absent visually.
- Focus-ring normalization is not decided.
- Semantic implementation token naming is deferred.

## 18. Requirement-to-design traceability

| Requirement group | Design support | Primary sections |
|---|---|---|
| `FR-001` | Home hierarchy, hero, plans, countdown, decoration | 3–7, 11, 13 |
| `FR-002`, `FR-003`, `FR-012` | CTA hierarchy, navigation, plan context, Basic default | 4, 11, 12 |
| `FR-004`, `FR-005`, `FR-006` | Sign Up structure, native select, fields, validation gap | 5, 11, 12, 14 |
| `FR-007`, `FR-008`, `FR-011` | Form feedback context and state intent | 12, 14, 15 |
| `FR-009` | Countdown anatomy, hierarchy, responsive placement | 5, 7, 11, 13, 15 |
| `FR-010` | Sign Up logo navigation | 4, 11, 12 |
| `BR-001`–`BR-007` | Plan structure, placeholder content, conversion flow | 3–5, 11, 12 |
| `DR-001`–`DR-006` | Visible field set and storage-result feedback context; record metadata and API mapping are not design-owned | 5, 11, 12, 14 |
| `AR-001`–`AR-010` | Semantics, focus, labels, decoration, feedback, reflow | 12, 14, 15 |
| `RR-001`–`RR-006` | Reference thresholds and responsive transformations | 6, 13 |
| `CR-001`–`CR-005` | Replaceable copy, growth, date/label treatment | 3, 8, 11, 14 |
| `NFR-001`, `NFR-002` | Transaction-aware feedback and flexible content | 11, 12, 14 |
| `NFR-003`–`NFR-007` | Traceability and resilience context; technology, performance, and browser targets remain downstream or open | 2, 14, 18, 19 |
| `CON-001`–`CON-007` | Figma authority, semantic/native control direction, SVG reuse, browser-only persistence boundary, and color deviation | 2, 9, 11, 15–17 |

## 19. Assumptions, inferences, and recommendations

### Confirmed design decisions

- Pro remains the visually featured pricing plan.
- Basic is the default selected plan for generic/direct Sign Up entry.
- Plan-specific CTAs preselect their matching plan.
- Plan selection uses a native select interaction.
- Dashboard and orbit artwork are decorative.
- Compact semantic order follows visual order.
- Current colors remain unchanged during this stage.
- Default, hover, and focus are the supplied control states.

### Inferences

- Flexible content requirements imply that cards and the form cannot retain hard fixed heights when copy or feedback grows.
- Static product and plan content should remain readable if JavaScript is unavailable, although this is not yet a confirmed Must requirement.
- The 1110 px large content width is a shared layout intent despite differing desktop frame widths.

### Recommendations requiring approval

- Use an in-form status region between fields and submit action for storage success/failure.
- Keep field-validation messages directly adjacent to affected fields.
- Preserve meaningful layout if decorative SVG assets fail to load.
- Normalize repeated pricing, countdown, and form-panel structures as conceptual reusable patterns.

## 20. Open questions

1. What visual pattern, iconography, color treatment, and exact placement should success use?
2. What visual pattern, iconography, color treatment, and exact placement should IndexedDB storage failure use?
3. What approved copy is used for field validation, storage failure, and success?
4. Does successful storage leave fields visible, clear them, disable them, or replace the form with confirmation?
5. What are the exact inclusive/exclusive ranges for `24rem`, `48rem`, and `80rem`?
6. Should every focusable control use the exact observed two-color focus ring, or may the treatment vary by surface?
7. At widths too narrow for four countdown tiles, should the group compress further or wrap to two rows?
8. What is the intended visual response when placeholder prices, plan names, or features become substantially longer?

## 21. Risks and potential inconsistencies

| Finding | Design impact | Disposition |
|---|---|---|
| Success and error behavior is required but not designed | Form height, status placement, and visual hierarchy are unresolved | Carry to `SPEC.md`; approval required before fidelity validation |
| Required-field invalid state is absent | Field-error styling cannot be copied from Figma | Define behavior in SPEC; visual treatment remains open |
| Known contrast failures are accepted temporarily | Some text/control states may not meet WCAG AA | Preserve documented deviation; no conformance claim |
| Compact frames contain stale tablet grid metadata | Direct grid extraction would produce invalid layout | Use observed fluid insets and containers |
| Home and Sign Up desktop source widths differ | Breakpoints cannot be derived from frame equality | Use approved thresholds and shared container intent |
| Interaction-state examples are desktop-only | Responsive focus/hover placement is not explicitly drawn | Apply shared component states at all widths |
| Native select menu appearance varies | Pixel-identical open state is not possible across platforms | Prioritize native interaction and closed-state intent |
| Placeholder content is short | Fixed Figma heights may fail with real copy | Use flexible growth and long-content review |
| Pro is visually featured while Basic is default on generic entry | Visual emphasis and default form value differ | Preserve both; do not infer selected state from card emphasis |
| Components are unpublished and undocumented | Handoff guidance is weaker than the visual evidence | Use this document and node references as translation layer |

## 22. Review pass 1 — Completeness and correctness

Completed checks:

- Compared Home and Sign Up structures against all six production frames.
- Rechecked the Home, Sign Up, interaction-state, foundation, and component sections in Figma.
- Covered information architecture, reading order, page structure, layout, hierarchy, typography, color, spacing, components, interactions, responsiveness, states, accessibility, assets, and design-system mapping.
- Verified component and token names against `FIGMA-AUDIT.md`.
- Preserved the confirmed 16 px compact content inset and 24 px / 20 px compact form relationships.
- Preserved native select behavior rather than describing a custom popup.
- Kept success, error, invalid, breakpoint-boundary, and focus-normalization details explicitly unresolved where evidence is absent.
- Did not treat Figma frame heights as fixed production heights.

Corrections made during this pass:

- Distinguished Pro visual emphasis from Basic’s confirmed generic default selection.
- Distinguished decorative visual order from assistive-technology output.
- Described the shared large content width as intent rather than deriving a new breakpoint from unequal desktop frames.
- Kept the red token as an available primitive rather than an approved error design.

## 23. Review pass 2 — Consistency, traceability, and uncertainty

Completed checks:

- Mapped major design sections to stable requirement IDs.
- Verified that the document supports `FR-001`–`FR-012`, the accessibility group, and the responsive group without duplicating their acceptance criteria.
- Preserved the current color deviation and avoided a WCAG AA claim.
- Kept implementation details out of design intent.
- Marked feedback patterns as recommendations rather than approved Figma states.
- Preserved current non-goals: countdown zero-state, production API behavior, localization, and final content approval.
- Recorded conflicts and incomplete design-system patterns rather than silently resolving them.

No contradiction blocks creation of `SPEC.md`. Feedback presentation and exact breakpoint semantics must remain explicitly unresolved until approved or specified with a documented recommendation.

## 24. Stage completion

- **File created:** `DESIGN.md`
- **Important findings:** The experience uses a light-to-dark conversion narrative, a shared large content width, responsive re-composition of hero/pricing/form structures, consistent default/hover/focus component language, and decorative vector systems that must not carry meaning.
- **Assumptions introduced:** Cards and the form grow vertically for longer content; static content remains readable without JavaScript where feasible; the shared 1110 px large content width is the governing desktop intent.
- **Recommendations introduced:** In-form status region, adjacent field messages, graceful decorative-asset failure, and conceptual reuse of pricing/countdown/form patterns.
- **Open questions:** Feedback visuals and copy, success aftermath, exact breakpoint boundaries, focus-ring normalization, ultra-narrow countdown behavior, and extreme content growth.
- **Deviations:** Current contrast risk is preserved and full WCAG AA conformance is not claimed.
- **Blockers:** None for Stage 4; unresolved items must remain visible in `SPEC.md`.
- **Readiness:** **Ready for Stage 4 — create `SPEC.md` with documented non-blocking design questions and accepted deviations.**
