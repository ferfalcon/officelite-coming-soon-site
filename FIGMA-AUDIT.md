# Figma Audit — Officelite Coming Soon Site

## 1. Document information

- **Status:** Stage 1 complete
- **Audit date:** 2026-08-01
- **Project:** Officelite coming soon site
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Supplied node:** `4:3`
- **Figma file key:** `L7MdLOW8usVUcPwV0cMQ1n`
- **Figma page:** `4:2` — `👋 Overview`
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Purpose:** Establish a factual Figma evidence baseline for the later requirements, design, specification, architecture, planning, implementation, and validation stages.

## 2. Evidence classification

This audit uses the following classifications:

- **Confirmed:** explicitly supplied in project instructions or established by a user decision.
- **Observed:** directly inspected in the Figma file.
- **Inferred:** strongly suggested by the design but not explicitly defined.
- **Recommended:** a proposed resolution to a gap or implementation concern.
- **Open question:** cannot be determined safely from the available evidence.

This document does not convert inferred behavior into confirmed product requirements.

## 3. Audit scope

### 3.1 Confirmed scope

The supplied source is the Figma design file and node referenced above.

### 3.2 Observed scope

The supplied node resolves to a page-level Figma node named `Border`. The relevant content is organized on the single top-level page `👋 Overview` into five sections:

| Section | Node | Purpose |
|---|---|---|
| Home | [`2141:2383`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2383) | Responsive landing-page compositions |
| Sign Up | [`2141:2386`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2386) | Responsive sign-up compositions |
| Interaction States | [`2141:2949`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2949) | Desktop hover and focus examples |
| Design System — Foundations | [`2141:938`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-938) | Color, typography, spacing, and radius references |
| Design System — Components | [`2141:935`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-935) | Reusable logo, buttons, form controls, illustration, and decoration |

### 3.3 Excluded from this stage

- Product requirements not directly established by the design
- Repository architecture and implementation decisions
- API, persistence, analytics, security, or deployment behavior
- Final accessibility conformance decisions
- Production validation against the live site

Those responsibilities belong to later workflow stages.

## 4. Screen and viewport inventory

### 4.1 Home

| Viewport | Frame | Dimensions | Primary composition |
|---|---|---:|---|
| Desktop | [`2141:1599`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1599) | 1440 × 1778 | Two-column hero, three-column pricing, horizontal footer countdown |
| Tablet | [`2141:1724`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1724) | 768 × 2164 | Compressed two-column hero, vertically stacked horizontal pricing cards, centered countdown |
| Mobile | [`2141:1813`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1813) | 375 × 2801 | Illustration-first hero, centered copy, vertically stacked pricing cards, centered countdown |

### 4.2 Sign Up

| Viewport | Frame | Dimensions | Primary composition |
|---|---|---:|---|
| Desktop | [`2141:1680`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1680) | 1321 × 1024 | Left introduction and countdown; right form overlapping a dark background strip |
| Tablet | [`2141:1896`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1896) | 768 × 1230 | Centered introduction and countdown; form below over a dark lower region |
| Mobile | [`2141:1940`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1940) | 375 × 1244 | Centered introduction and compact countdown; full-width inset form over a dark lower region |

### 4.3 Interaction-state frames

| Frame | Node | Demonstrated state |
|---|---|---|
| Desktop — Home — Hover | [`2141:2441`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2441) | Hover treatments for representative calls to action |
| Desktop — Home — Focus | [`2141:2542`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2542) | Focus treatments for representative calls to action |
| Desktop — Sign Up — Hover | [`2141:2387`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2387) | Hover treatment for the name field and submit action |
| Desktop — Sign Up — Focus | [`2141:2638`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2638) | Focus treatment for the name field and submit action |

## 5. Page structure and content hierarchy

### 5.1 Home

**Observed:** The page reads in the following visual order:

1. Brand header
2. Hero illustration and hero message
3. Primary `Get Started` action
4. Three pricing plans
5. Launch date and countdown
6. Final `Get Started` action

Desktop and tablet place hero copy before the illustration in the left-to-right visual order. Mobile places the illustration above the heading and description.

### 5.2 Sign Up

**Observed:** The page reads in the following visual order:

1. Brand header
2. Page heading and description
3. Launch date and countdown
4. Sign-up form

On desktop, the introduction and form are side by side. On tablet and mobile, they stack vertically.

## 6. Navigation and prototype flow

### 6.1 Observed click paths

The page contains 18 click reactions and no named prototype flow starting point.

- Home hero, pricing, and countdown calls to action navigate to the corresponding Sign Up frame at the same responsive size.
- The logo on each Sign Up frame navigates back to the corresponding Home frame.
- Reactions use direct navigation with no transition animation.

| Source family | Desktop destination | Tablet destination | Mobile destination |
|---|---|---|---|
| Home calls to action | Sign Up `2141:1680` | Sign Up `2141:1896` | Sign Up `2141:1940` |
| Sign Up logo | Home `2141:1599` | Home `2141:1724` | Home `2141:1813` |

### 6.2 Missing prototype evidence

- No submit action or post-submission destination is defined.
- No plan-selection interaction is defined.
- No field validation or error path is defined.
- No loading or success path is defined.
- No live countdown behavior is prototyped.
- No keyboard-specific interaction is demonstrated.

## 7. Responsive behavior

### 7.1 Home hero

**Desktop — observed:**

- A centered 1110 px content region begins at x = 165 px.
- Copy occupies 540 px and the illustration occupies 475 × 531 px.
- Decorative orbit geometry extends beyond the top and right edges and is clipped by the page frame.

**Tablet — observed:**

- The hero remains side by side.
- Copy width reduces to 345 px.
- The illustration scales to approximately 280 × 313 px.
- Horizontal content inset is approximately 40 px.

**Mobile — observed:**

- The illustration moves above the message.
- Main content uses a 343 px region with 16 px side insets.
- Heading, description, and action are centered.
- The illustration scales to approximately 200 × 224 px.

### 7.2 Pricing

**Desktop — observed:**

- Three cards share one row within a 1110 px content region.
- Cards are approximately 349 × 489 px with 30–32 px horizontal separation.
- The Pro card is visually emphasized with a blue surface.
- Cards overlap the transition between the light page background and dark footer region.

**Tablet — observed:**

- Cards stack vertically within an approximately 689 px region.
- Each card changes to a horizontal internal composition: plan summary and action on the left, features on the right.
- Each card is approximately 689 × 315 px.
- The Pro card includes decorative orbit geometry.

**Mobile — observed:**

- Cards stack vertically in a 343 px region.
- Internal content becomes centered and vertically ordered.
- Basic and Ultimate cards are 481 px high; Pro is 497 px high.
- The dark background begins behind the pricing stack rather than only below it.

### 7.3 Countdown

**Desktop — observed:** The date and countdown are left aligned while the final action is right aligned.

**Tablet and mobile — observed:** The date, countdown, and final action are centered and vertically grouped.

**Mobile — observed:** Countdown cards shrink to approximately 74 px wide and 110 px high.

### 7.4 Sign Up

**Desktop — observed:**

- The viewport is 1321 px wide, unlike the 1440 px Home desktop frame.
- The main content region is 1110 px wide and centered at x = 105.5 px.
- A 420 px dark strip occupies the right side.
- The 445 × 489 px form overlaps the boundary between light and dark regions.

**Tablet — observed:**

- Introductory content and countdown center above the form.
- The form remains 445 × 489 px.
- A dark lower section begins behind the lower part of the form.

**Mobile — observed:**

- The form becomes 327 × 489 px with 24 px page insets.
- Form horizontal padding reduces from 40 px to 20 px.
- Countdown values and form controls reduce in width without removing content.

### 7.5 Behavior between supplied widths

**Open question:** Figma demonstrates 375 px, 768 px, and desktop compositions but does not establish exact breakpoint values or interpolation rules between them.

**Recommended for later specification:** Define behavior in terms of content fit and layout transformation, then select implementation breakpoints that preserve those behaviors rather than treating the three frame widths as the only supported sizes.

## 8. Layout systems and grids

### 8.1 Desktop grid

**Observed:** Home desktop uses:

- 12 columns
- 65 px column width
- 30 px gutter
- 165 px left offset
- A repeated 60 px row with 12 px gutter

This produces the 1110 px central content region used by the header, hero, pricing, and countdown.

### 8.2 Tablet grid

**Observed:** Tablet frames use:

- 12 columns
- 48 px column width
- 10 px gutter
- Approximately 39.17 px offset
- The same 60 px row / 12 px gutter pattern

### 8.3 Mobile grid inconsistency

**Observed:** Mobile frames retain the same 48 px / 10 px / 12-column grid metadata as tablet. That grid cannot fit inside a 375 px viewport.

**Inferred:** The mobile grid metadata was likely copied from the tablet frame and does not describe the actual 16 px inset / 343 px content composition.

**Open question:** Should implementation use a dedicated mobile grid token or a simple fluid container with 16 px insets?

## 9. Design foundations

### 9.1 Color variables

One local variable collection named `Collections` contains one mode, `Mode 1`.

| Variable | Value | Observed usage |
|---|---:|---|
| `colors/neutral/0` | `#FFFFFF` | Card and control surfaces, inverse button |
| `colors/neutral/50` | `#FAFAFA` | Page background |
| `colors/neutral/500` | `#747B95` | Secondary and body text |
| `colors/neutral/800` | `#333950` | Supporting dark text and countdown surfaces |
| `colors/neutral/900` | `#25293A` | Primary text and dark page regions |
| `colors/blue/100` | `#E4EAFF` | Subtle action and countdown backgrounds |
| `colors/blue/300` | `#829CFF` | Primary-button hover surface |
| `colors/blue/500` | `#5175FF` | Primary actions, Pro plan, accent text |
| `colors/red/400` | `#F05B5B` | Error-oriented token; no error composition is shown |

**Observed:** Variables use `ALL_SCOPES`, have no platform code syntax, and are grouped in a generically named collection.

### 9.2 Typography styles

All production text uses Kumbh Sans. No missing fonts were reported during inspection.

| Style | Font | Size | Line height | Tracking | Intended role shown in foundations |
|---|---|---:|---:|---:|---|
| `Display/Large` | Kumbh Sans Bold | 56 px | 120% | 0 | Desktop headings, prices, large countdown values |
| `Display/Medium` | Kumbh Sans Bold | 40 px | 120% | 0 | Tablet/mobile headings and compact countdown values |
| `Heading/Small` | Kumbh Sans Bold | 20 px | 140% | 0 | Plan names |
| `Body/Large` | Kumbh Sans Regular | 18 px | 150% | 0 | Hero and Sign Up descriptions |
| `Body/Medium` | Kumbh Sans Regular | 16 px | 160% | 0 | Billing summaries and feature lists |
| `Label/Strong` | Kumbh Sans Bold | 16 px | 160% | 0 | Buttons, selected plan, countdown units |
| `Label/Overline` | Kumbh Sans Bold | 16 px | 160% | 5 px | Uppercase launch-date overline |

### 9.3 Spacing variables

The variable collection defines:

`0`, `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`, `96`, `112`, `128`, and `140` px.

**Observed inconsistency:** The foundation specimen documents `spacing-125` as 10 px, but no `spacing/125` variable exists in the local collection.

### 9.4 Radius variables

The variable collection defines:

`0`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, and `999` px (`corner-radius/full`).

Observed major use:

- Cards and form: 12 px
- Buttons: full/pill radius
- Countdown tiles: compact rounded rectangles

### 9.5 Styles and bindings

- Seven local text styles exist.
- No local paint, effect, or grid styles exist.
- Colors, spacing, radii, and some effects are bound directly to variables on many component layers.
- Frame grids are local to individual frames rather than reusable grid styles.

## 10. Reusable components

All inspected components are local and unpublished. Component descriptions are empty.

| Component | Node | Variants or anatomy |
|---|---|---|
| Brand / Logo | [`4:871`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-871) | Logo mark and wordmark |
| Button / Pricing / Standard | [`10:531`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=10-531) | Default, Hover, Focus |
| Button / Primary | [`10:526`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=10-526) | Default, Hover, Focus |
| Button / Pricing / Inverse | [`10:567`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=10-567) | Default, Hover, Focus |
| Illustration / Product Dashboard | [`5:275`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=5-275) | Line-chart card, typography preview, metrics card |
| Form / Text Field | [`10:503`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=10-503) | Default, Hover, Focus |
| Form / Plan Select | [`10:512`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=10-512) | Default, Hover, Focus |
| Decoration / Hero Orbits | [`2141:931`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-931) | Three orbit rings and dot cluster |
| Decoration / Footer Orbits | [`2141:932`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-932) | Six rings and three dots |
| Typography Specimen | [`4:462`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-462) | Reused to display the seven text roles |

### 10.1 Component-instance integrity

**Observed:** Inspected production instances resolve to their source components. No detached or unresolved production instances were found in the audited scope.

### 10.2 Button visual states

All button variants are approximately 170–171 × 50 px with 40 px horizontal and 12 px vertical padding.

| Button family | Default | Hover | Focus |
|---|---|---|---|
| Primary | Blue `#5175FF`, white label, soft lower shadow | Blue `#829CFF`, white label | Default surface with a white/blue multi-ring focus treatment |
| Pricing / Standard | Pale blue `#E4EAFF`, blue label | Blue `#5175FF`, white label | Default surface with a white/blue multi-ring focus treatment |
| Pricing / Inverse | White, blue label | Pale blue `#E4EAFF`, blue label | White surface with reversed white/blue focus rings |

### 10.3 Form controls

- Text fields are 360 × 45 px on desktop/tablet.
- The plan select is 360 × 43 px on desktop/tablet.
- Mobile form controls reduce to 287 px wide.
- Controls use an underline-style boundary rather than a full box in default and hover states.
- Focus introduces a white fill and visible two-ring treatment.

## 11. Assets and decoration

### 11.1 Observed assets

- Brand logo is built from vector/boolean geometry.
- Product dashboard illustration is built from Figma shapes and text; no raster image fill is present.
- Hero and footer orbit decorations are reusable vector components.
- The select includes a small downward chevron.
- No external photography or raster imagery appears in the audited scope.

### 11.2 Implementation implications to carry forward

**Recommended:** Treat orbit systems as decorative and exclude them from the accessibility tree unless a later product decision gives them meaning.

**Open question:** Whether the dashboard illustration is purely decorative or requires a concise alternative text cannot be determined from Figma alone.

## 12. Canonical content observed in Figma

### 12.1 Home hero

- Heading: `A simple solution to complex tasks is coming soon`
- Description: `Say goodbye to inefficient juggling of multiple apps, teams, and projects. Officelite is the new collaboration platform built with an intuitive interface to improve productivity.`
- Primary action: `Get Started`

### 12.2 Pricing

| Plan | Price | Billing | Features |
|---|---|---|---|
| Basic | Free | Up to 5 users for free | Basic document collaboration; 2 GB storage; Great security and support |
| Pro | $9.99 | Per user, billed monthly | All essential integrations; 50 GB storage; More control and insights |
| Ultimate | $19.99 | Per user, billed monthly | Robust work management; 100 GB storage; VIP support |

Pricing action: `Try for Free`

### 12.3 Countdown

- Launch label: `Coming 31 Dec 2026`
- Sample displayed values: `47 days`, `07 hours`, `56 min`, `14 sec`

**Observed:** The countdown values are static text in the design.

**Open question:** The design does not define target timezone, update cadence, behavior at zero, or whether the target date includes a specific time.

### 12.4 Sign Up

- Heading: `Work smarter. Save time.`
- Description: `Easily manage your projects. Get on the list and receive in-app perks available only to early subscribers. We are moving into final development and getting ready for official launch soon.`
- Form content: `Name`, `Email Address`, `Basic Pack`, `Free`, `Phone Number`, `Company`
- Submit action: `Get on the list`

## 13. State coverage

| State | Buttons | Text fields | Plan select | Form/page flow |
|---|---|---|---|---|
| Default | Observed | Observed | Observed | Observed |
| Hover | Observed | Observed | Observed | Representative desktop frame observed |
| Focus | Observed | Observed | Observed | Representative desktop frame observed |
| Active/pressed | Not shown | Not shown | Not shown | Not shown |
| Selected/open | Pro card emphasized; selected plan text shown | Not applicable | Closed selected value only | Dropdown list not shown |
| Disabled | Not shown | Not shown | Not shown | Not shown |
| Loading | Not shown | Not shown | Not shown | Not shown |
| Empty | Not shown | Placeholder-like empty fields shown | Not shown | Not shown |
| Error/invalid | Red token exists; no control state | Not shown | Not shown | Not shown |
| Success | Not shown | Not shown | Not shown | No completion screen or message |

## 14. Accessibility observations

These observations identify implementation risks; they are not a final conformance audit.

### 14.1 Positive evidence

- Explicit focus variants exist for all reusable button and form-control families.
- Primary action height is 50 px.
- Text fields are 45 px high; the select is 43 px high.
- Main text hierarchy is visually clear.
- Tablet and mobile layouts reflow rather than depending on horizontal scrolling.

### 14.2 Contrast concerns

Ratios calculated from the observed Figma color variables include:

| Foreground / background | Approximate ratio | Concern |
|---|---:|---|
| `#5175FF` on `#FFFFFF` | 3.93:1 | Insufficient for normal-size text at the common 4.5:1 AA threshold |
| `#5175FF` on `#E4EAFF` | 3.28:1 | Insufficient for normal-size text |
| `#747B95` on `#FFFFFF` | 4.19:1 | Slightly below the normal-text threshold |
| `#747B95` on `#FAFAFA` | 4.02:1 | Below the normal-text threshold |
| `#829CFF` on `#FFFFFF` | 2.58:1 | Insufficient for normal-size text and potentially weak for component boundaries |

**Observed risk:** Several 16 px labels and body-text combinations need formal contrast verification and likely adjustment during requirements/design review.

### 14.3 Form labeling

**Observed:** Form controls display prompt text inside the field area, but no separate persistent labels are shown.

**Open question:** Whether the prompt text represents placeholders, labels rendered within the control, or a floating-label pattern is not defined.

**Recommended:** Later specifications should require persistent programmatic labels and must not rely on placeholders as the only accessible name.

### 14.4 Reading order

**Observed:** Mobile visually places the dashboard illustration before the hero heading, while desktop visually places the heading before the illustration.

**Open question:** The intended semantic DOM order is not defined.

**Recommended:** Keep the page heading and explanatory content early in the semantic reading order unless user testing or product intent supports an illustration-first reading order.

### 14.5 Dynamic content

**Open question:** The countdown’s screen-reader announcement policy, update frequency, and behavior at zero are not defined. Announcing every second would be disruptive.

### 14.6 Keyboard and semantics

Figma demonstrates visual focus but cannot confirm:

- Native link, button, input, and select semantics
- Tab order
- Enter/Space behavior
- Focus movement after navigation or submission
- Error association and announcement
- Form autocomplete attributes
- Landmark and heading structure

## 15. Inconsistencies and missing evidence

| Finding | Classification | Impact |
|---|---|---|
| Supplied node is named `Border` although it represents the audited page scope | Observed | Node naming is not descriptive for handoff or traceability |
| Mobile frames retain an unusable tablet grid definition | Observed | Grid metadata cannot be copied directly into implementation |
| `spacing-125` is documented as 10 px but is absent from variables | Observed | Foundation specimen and token collection disagree |
| Components are unpublished and have empty descriptions | Observed | Reuse intent is visible but component guidance is not encoded |
| Variables use `ALL_SCOPES` and have no code syntax | Observed | Token intent is broad and code mapping is not defined |
| No paint, effect, or grid styles exist | Observed | Some reusable visual rules remain local to nodes or frames |
| Home desktop is 1440 px while Sign Up desktop is 1321 px | Observed | Shared desktop responsive rules cannot be derived from equal source widths |
| Interaction examples are desktop-only | Observed | Mobile/tablet hover and focus placement is not demonstrated |
| Active, disabled, loading, error, and success states are absent | Observed | Later requirements and design decisions must define applicable states |
| No long-content or missing-content examples exist | Observed | Resilience to copy growth and absent content remains undefined |
| Countdown behavior is not prototyped | Observed | Static design cannot establish functional countdown rules |
| Form submission and validation are not prototyped | Observed | Product and data behavior cannot be inferred safely |
| Plan dropdown contents are not shown | Observed | Available options and selection behavior are unknown |

## 16. Unresolved questions

### 16.1 Product questions

1. Is the launch target exactly 31 December 2026, and what time and timezone apply?
2. What happens when the countdown reaches zero?
3. What service or destination receives sign-up submissions?
4. Which form fields are required, optional, or conditionally required?
5. What constitutes a successful sign-up, and what confirmation must the user receive?
6. Must selecting a pricing-plan action preselect that plan on the Sign Up page?
7. Are `Phone Number` and `Company` necessary for the initial release?
8. Is the logo intended to navigate home only from Sign Up, or from every page?

### 16.2 Design questions

1. What exact breakpoints or content-fit conditions trigger the desktop, tablet, and mobile transformations?
2. What is the intended mobile grid, given the inconsistent frame metadata?
3. Which active/pressed, disabled, loading, invalid, and success states are required?
4. How should the plan select appear when open?
5. Should focus rings retain the demonstrated two-color treatment at every background boundary?
6. Should the mobile visual order of illustration before heading also be the semantic reading order?
7. Is the product dashboard illustration decorative or informative?
8. What is the approved resolution for the observed contrast concerns?

### 16.3 Content questions

1. Are the supplied marketing and pricing strings final content?
2. Can plan names, prices, billing summaries, or features vary in length?
3. Are countdown labels fixed to `days`, `hours`, `min`, and `sec`?
4. What validation, error, loading, and success messages are required?
5. Is localization in scope?
6. Should the displayed launch date use the current `31 Dec 2026` format in every locale?

### 16.4 Technical questions

1. Is the countdown client-side only, server-derived, or synchronized against an external source?
2. Is form submission handled by an existing API, serverless function, third-party form service, or mail workflow?
3. What anti-spam, validation, privacy, retention, and consent rules apply?
4. How should the vector illustration and orbit decorations be exported or reconstructed for production?
5. What implementation token names should map to the Figma variables?
6. Should the missing `spacing/125` variable be added to Figma or intentionally excluded from code?

## 17. Evidence map for later documents

| Evidence area | Primary Figma references | Later document use |
|---|---|---|
| Home structure and responsive transformations | `2141:1599`, `2141:1724`, `2141:1813` | REQUIREMENTS, DESIGN, SPEC |
| Sign Up structure and responsive transformations | `2141:1680`, `2141:1896`, `2141:1940` | REQUIREMENTS, DESIGN, SPEC |
| Navigation intent | Home CTA and Sign Up logo reactions in the six production frames | REQUIREMENTS, SPEC |
| Interactive visual states | `2141:2949`, component sets `10:531`, `10:526`, `10:567`, `10:503`, `10:512` | DESIGN, SPEC |
| Typography | `2141:938`, local text styles | DESIGN, SPEC, implementation tokens |
| Color, spacing, and radius | `2141:938`, variable collection `4:385` | DESIGN, ARCHITECTURE, implementation tokens |
| Reusable visual patterns | `2141:935` | DESIGN, ARCHITECTURE, PLAN |
| Content | Production Home and Sign Up frames | REQUIREMENTS, DESIGN, SPEC |
| Missing states and unresolved behavior | Sections 13–16 of this audit | REQUIREMENTS, DESIGN, SPEC, DOCUMENT-REVIEW |

## 18. Review pass 1 — Completeness and correctness

Completed checks:

- Inspected the complete supplied page scope rather than only the selected production frame.
- Inspected all Home and Sign Up responsive frames.
- Inspected reusable components and their variants.
- Inspected foundation variables and text styles.
- Inspected representative hover and focus frames.
- Inspected prototype reactions and confirmed the absence of named flow starting points.
- Compared visual compositions with node metadata.
- Recorded missing states, accessibility concerns, responsive uncertainties, and content gaps.
- Verified that production instances inspected remain connected to source components.

Corrections made during this pass:

- Did not treat the static countdown sample as defined runtime behavior.
- Did not treat form fields as required or optional without evidence.
- Did not treat the demonstrated viewport widths as confirmed CSS breakpoints.
- Did not assume the form-submit destination or persistence model.

## 19. Review pass 2 — Consistency, traceability, and uncertainty

Completed checks:

- Every material screen, component, foundation, and interaction finding has a Figma node or section reference.
- Observations are separated from inferences and recommendations.
- Product behavior missing from Figma remains an open question.
- The mobile grid conflict and spacing-token conflict are recorded rather than silently resolved.
- Accessibility recommendations are not presented as existing design decisions.
- Later-document responsibilities are preserved; this audit does not prescribe repository architecture or implementation sequencing.

No blocking contradiction prevents creation of an initial requirements document. Product and technical questions must remain visible in Stage 2 and may prevent individual requirements from being classified as confirmed.

## 20. Stage completion

- **File created:** `FIGMA-AUDIT.md`
- **Important findings:** Two responsive page flows, six production frames, explicit default/hover/focus component states, a variable-backed foundation, and direct Home-to-Sign-Up prototype navigation are present.
- **Assumptions introduced:** None treated as confirmed. Recommendations are explicitly labeled.
- **Open questions:** Countdown rules, form requirements and submission behavior, plan-selection behavior, missing states, mobile grid, contrast remediation, and semantic reading order.
- **Blockers:** None for beginning Stage 2; several questions block finalizing particular requirements.
- **Readiness:** **Ready for Stage 2 with documented non-blocking open questions.**
