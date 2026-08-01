# Figma Audit — Officelite Coming Soon Site

## 1. Document information

- **Status:** Stage 1 complete — stakeholder decisions incorporated
- **Audit date:** 2026-08-01
- **Decision update:** 2026-08-01
- **Design source:** [Officelite coming soon site](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=4-3)
- **Supplied node:** `4:3`
- **Figma file key:** `L7MdLOW8usVUcPwV0cMQ1n`
- **Page:** `4:2` — `👋 Overview`
- **Repository:** `ferfalcon/officelite-coming-soon-site`
- **Purpose:** Provide the factual Figma evidence baseline for requirements, design, specification, architecture, planning, implementation, and validation.

## 2. Evidence classification

- **Confirmed:** supported by project documentation or a user decision.
- **Observed:** directly inspected in Figma.
- **Inferred:** strongly suggested but not confirmed.
- **Recommended:** proposed to resolve a gap.
- **Open question:** cannot be determined safely.

Inferences and recommendations are not treated as confirmed requirements.

## 3. Audited scope

The supplied node resolves to a page-level node named `Border`. The relevant content is organized into five sections:

| Section | Node | Purpose |
|---|---|---|
| Home | [`2141:2383`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2383) | Responsive landing-page compositions |
| Sign Up | [`2141:2386`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2386) | Responsive sign-up compositions |
| Interaction States | [`2141:2949`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-2949) | Desktop hover and focus examples |
| Design System — Foundations | [`2141:938`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-938) | Color, typography, spacing, and radius references |
| Design System — Components | [`2141:935`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-935) | Logo, buttons, controls, illustration, and decoration |

This audit does not define repository architecture, production APIs, analytics, deployment, or final accessibility conformance.

## 4. Screen inventory

### 4.1 Home

| Viewport | Frame | Dimensions | Composition |
|---|---|---:|---|
| Desktop | [`2141:1599`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1599) | 1440 × 1778 | Two-column hero, three-column pricing, horizontal countdown footer |
| Tablet | [`2141:1724`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1724) | 768 × 2164 | Compact two-column hero, stacked horizontal pricing cards, centered countdown |
| Mobile | [`2141:1813`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1813) | 375 × 2801 | Illustration-first hero, centered copy, stacked vertical pricing cards |

### 4.2 Sign Up

| Viewport | Frame | Dimensions | Composition |
|---|---|---:|---|
| Desktop | [`2141:1680`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1680) | 1321 × 1024 | Introduction/countdown left; form overlapping right dark region |
| Tablet | [`2141:1896`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1896) | 768 × 1230 | Centered introduction/countdown; form below over dark region |
| Mobile | [`2141:1940`](https://www.figma.com/design/L7MdLOW8usVUcPwV0cMQ1n/officelite-coming-soon-site?node-id=2141-1940) | 375 × 1244 | Centered introduction/countdown; inset form over dark region |

### 4.3 Interaction examples

| Frame | Node | Evidence |
|---|---|---|
| Home hover | `2141:2441` | Representative CTA hover states |
| Home focus | `2141:2542` | Representative CTA focus states |
| Sign Up hover | `2141:2387` | Name field and submit hover states |
| Sign Up focus | `2141:2638` | Name field and submit focus states |

## 5. Page structure and flow

### 5.1 Home reading order

1. Brand header
2. Hero illustration and message
3. Primary `Get Started` action
4. Basic, Pro, and Ultimate plans
5. Launch date and countdown
6. Final `Get Started` action

Desktop and tablet place copy before the illustration visually. Mobile places the decorative illustration before the heading.

### 5.2 Sign Up reading order

1. Brand header
2. Heading and description
3. Launch date and countdown
4. Sign-up form

### 5.3 Prototype navigation

The file contains 18 click reactions and no named prototype starting point.

- Every Home CTA navigates to the matching responsive Sign Up frame.
- The logo navigates to Home only from Sign Up.
- Navigation has no transition animation.
- Form submission, validation, success, and failure are not prototyped.

## 6. Responsive behavior

### 6.1 Confirmed breakpoints

**User decision:** Use `24rem`, `48rem`, and `80rem`.

The Figma reference widths demonstrate target compositions. Exact inclusive/exclusive media-query semantics remain a specification detail.

### 6.2 Home transformations

- Desktop uses a centered 1110 px content region.
- Tablet retains a side-by-side hero but reduces copy and illustration dimensions.
- Mobile moves the illustration above centered copy and CTA.
- Pricing changes from three columns, to stacked horizontal cards, to stacked centered cards.
- Countdown and final CTA change from a horizontal desktop arrangement to a centered vertical arrangement.

### 6.3 Sign Up transformations

- Desktop uses a two-column composition with a 445 × 489 px form.
- Tablet centers the introduction and places the form below without reducing its width.
- Mobile reduces the form to 327 px, with 24 px outer insets and 20 px internal horizontal padding.

### 6.4 Mobile grid re-inspection

Both 375 px production frames contain a hidden copied grid with 12 columns, 48 px columns, 10 px gutters, and an approximately 39.17 px offset. It cannot fit within 375 px and is not the operative layout.

The actual composition uses:

- A 343 px content region with approximately 16 px side insets for primary mobile content.
- A 327 px Sign Up form with 24 px page insets.
- Fluid width and wrapping rather than the stale hidden grid.

## 7. Design foundations

### 7.1 Colors

| Variable | Value | Main use |
|---|---:|---|
| `colors/neutral/0` | `#FFFFFF` | Cards and control surfaces |
| `colors/neutral/50` | `#FAFAFA` | Page background |
| `colors/neutral/500` | `#747B95` | Secondary/body text |
| `colors/neutral/800` | `#333950` | Supporting dark text and countdown tiles |
| `colors/neutral/900` | `#25293A` | Primary text and dark surfaces |
| `colors/blue/100` | `#E4EAFF` | Subtle action/countdown backgrounds |
| `colors/blue/300` | `#829CFF` | Primary-button hover |
| `colors/blue/500` | `#5175FF` | Primary actions and Pro plan |
| `colors/red/400` | `#F05B5B` | Error token; no error state is shown |

The file has one local variable collection named `Collections`, one mode, `ALL_SCOPES` variables, and no platform code syntax.

### 7.2 Typography

| Style | Font | Size | Line height | Usage |
|---|---|---:|---:|---|
| `Display/Large` | Kumbh Sans Bold | 56 px | 120% | Desktop headings, prices, large countdown values |
| `Display/Medium` | Kumbh Sans Bold | 40 px | 120% | Tablet/mobile headings and compact values |
| `Heading/Small` | Kumbh Sans Bold | 20 px | 140% | Plan names |
| `Body/Large` | Kumbh Sans Regular | 18 px | 150% | Page descriptions |
| `Body/Medium` | Kumbh Sans Regular | 16 px | 160% | Billing and feature text |
| `Label/Strong` | Kumbh Sans Bold | 16 px | 160% | Buttons, selected plan, countdown units |
| `Label/Overline` | Kumbh Sans Bold | 16 px | 160% | Uppercase launch-date label; 5 px tracking |

### 7.3 Spacing and radius

Spacing variables now include `0`, `2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`, `96`, `112`, `128`, and `140` px.

**Resolved Figma correction:** Added `spacing/125 = 10` as `VariableID:2182:134`, matching the existing foundation specimen.

Radius variables include `0`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, and `999` px. Cards/forms use 12 px; buttons use the full radius.

## 8. Reusable components

All inspected components are local, connected to their instances, unpublished, and have empty descriptions.

| Component | Node | Variants or anatomy |
|---|---|---|
| Brand / Logo | `4:871` | Mark and wordmark |
| Button / Pricing / Standard | `10:531` | Default, Hover, Focus |
| Button / Primary | `10:526` | Default, Hover, Focus |
| Button / Pricing / Inverse | `10:567` | Default, Hover, Focus |
| Illustration / Product Dashboard | `5:275` | Chart, typography, and metric cards |
| Form / Text Field | `10:503` | Default, Hover, Focus |
| Form / Plan Select | `10:512` | Default, Hover, Focus |
| Decoration / Hero Orbits | `2141:931` | Rings and dot cluster |
| Decoration / Footer Orbits | `2141:932` | Rings and dots |

Buttons are approximately 170–171 × 50 px and use pill radii. Text fields are 360 × 45 px on desktop/tablet and 287 px wide on mobile. The plan select is 360 × 43 px on desktop/tablet.

**User decision:** Use the states supplied by Figma: default, hover, and focus. Additional active, disabled, loading, and invalid control states are not in current design scope.

**User decision:** The plan control should open and behave like a native select.

## 9. Assets and decoration

- The logo, dashboard illustration, orbit systems, and select chevron are vector-based.
- Existing SVG assets are available for implementation.
- No raster photography or image fills are present.
- The dashboard illustration and orbit systems are decorative and should not add accessible names or announced content.

## 10. Content inventory and rules

### 10.1 Placeholder content

The current marketing copy, prices, features, and launch date are placeholders rather than final content.

Observed pricing content:

| Plan | Price | Billing | Features |
|---|---|---|---|
| Basic | Free | Up to 5 users for free | Basic document collaboration; 2 GB storage; Great security and support |
| Pro | $9.99 | Per user, billed monthly | All essential integrations; 50 GB storage; More control and insights |
| Ultimate | $19.99 | Per user, billed monthly | Robust work management; 100 GB storage; VIP support |

### 10.2 Confirmed content behavior

- Content can vary in length.
- Countdown labels remain `days`, `hours`, `min`, and `sec`.
- The launch date uses the `31 Dec 2026` display pattern when populated with the real value.
- Localization is out of scope.
- Exact validation, error, loading, and success-message copy is deferred.

## 11. Product and technical decisions

1. The displayed launch date is a placeholder. The final date will be server-derived from an API.
2. Countdown behavior at zero is out of scope.
3. Current sign-up data is stored in browser IndexedDB.
4. Sending sign-up data to an API is future scope.
5. All displayed form fields are provisionally required.
6. A sign-up is successful when the record is stored in IndexedDB.
7. Successful storage must produce an on-screen confirmation message.
8. Pricing-plan CTAs must preselect the corresponding plan on Sign Up.
9. Phone Number and Company remain in scope and are currently required.
10. The logo navigates Home only from Sign Up.
11. Anti-spam, privacy, retention, consent, and production API policies are deferred and must be flagged for the future integration phase.
12. Implementation token naming and Figma code syntax mapping are deferred.
13. An IndexedDB write failure must show and announce an error, must not show success, and should preserve entered values for correction or retry where technically possible.
14. Generic `Get Started` actions and direct Sign Up navigation default the Plan field to Basic.

## 12. State coverage

| State | Current decision |
|---|---|
| Default | Required and shown |
| Hover | Required and shown |
| Focus | Required and shown |
| Active/pressed | Not required in current design scope |
| Selected | Pro plan emphasis and selected plan value are shown |
| Select open | Native-select behavior required; menu appearance follows the platform control |
| Disabled | Not required in current design scope |
| Loading | Not required in current design scope |
| Invalid/error | IndexedDB storage failure feedback is required; exact visual treatment and copy remain undefined |
| Success | Required after IndexedDB storage; visual treatment and copy remain undefined |

## 13. Accessibility observations and decisions

### 13.1 Positive evidence

- Explicit focus variants exist for buttons and form controls.
- Primary actions are 50 px high.
- Layouts reflow rather than requiring horizontal scrolling.
- Visual hierarchy is clear.

### 13.2 Form labeling

The fields display prompt text but no separate persistent visual labels. Later specification must require programmatic labels and must not rely on placeholders as the only accessible name.

### 13.3 Reading order

**User decision:** On mobile, semantic order follows the visual order. The decorative illustration precedes the heading but contributes no announced content.

### 13.4 Contrast risk

Observed approximate ratios include:

- `#5175FF` on `#FFFFFF`: 3.93:1
- `#5175FF` on `#E4EAFF`: 3.28:1
- `#747B95` on `#FFFFFF`: 4.19:1
- `#747B95` on `#FAFAFA`: 4.02:1
- `#829CFF` on `#FFFFFF`: 2.58:1

Several normal-size text combinations may not satisfy WCAG AA contrast expectations.

**User decision:** Do not remediate contrast at this stage. Preserve this as an accepted accessibility risk and potential implementation deviation, not as a claim of conformance.

### 13.5 Dynamic content

Countdown announcement frequency is not defined by Figma and must avoid announcing every second disruptively. IndexedDB success and failure feedback must be visibly presented and programmatically announced.

## 14. Inconsistencies and risks

| Finding | Status or impact |
|---|---|
| Supplied page-level node is named `Border` | Weak handoff naming remains |
| Mobile frames retain an unusable hidden tablet grid | Confirmed stale metadata; use actual fluid insets |
| `spacing/125` was absent | Resolved in Figma |
| Components are unpublished and undocumented | Reuse intent exists but guidance is not encoded |
| Variables use `ALL_SCOPES` and no code syntax | Code mapping remains deferred |
| No paint, effect, or grid styles | Some visual rules remain local to frames/nodes |
| Desktop Home and Sign Up use different source widths | Use the confirmed `80rem` breakpoint, not equal frame widths |
| Interaction examples are desktop-only | Apply the demonstrated states responsively |
| Success state is not designed | Functional success feedback is required; presentation remains open |
| Long-content examples are missing | Later design/spec must define wrapping and growth |
| IndexedDB failure behavior was undefined | Resolved by user decision: show and announce failure, suppress success, and preserve entered values where technically possible |
| Contrast remediation is deferred | Accepted accessibility risk |

## 15. Remaining non-blocking open questions

1. What exact confirmation and storage-failure copy and visual treatment should be used?
2. What fields and metadata constitute the IndexedDB record: identifier, selected plan, timestamp, schema version, or only entered values?
3. How should provisional required-field rules be revisited before production/API integration?
4. Which inclusive/exclusive media-query semantics map `24rem`, `48rem`, and `80rem` to the demonstrated compositions?
5. Should the observed two-color focus treatment be normalized across every surface? This is deferred.

## 16. Evidence map

| Evidence | Figma references | Later use |
|---|---|---|
| Home responsive behavior | `2141:1599`, `2141:1724`, `2141:1813` | REQUIREMENTS, DESIGN, SPEC |
| Sign Up responsive behavior | `2141:1680`, `2141:1896`, `2141:1940` | REQUIREMENTS, DESIGN, SPEC |
| Navigation intent | CTA and Sign Up logo reactions | REQUIREMENTS, SPEC |
| Interactive states | `2141:2949`, `10:531`, `10:526`, `10:567`, `10:503`, `10:512` | DESIGN, SPEC |
| Foundations | `2141:938`, variable collection `4:385` | DESIGN, ARCHITECTURE, tokens |
| Reusable patterns | `2141:935` | DESIGN, ARCHITECTURE, PLAN |
| Content and plans | Production Home and Sign Up frames | REQUIREMENTS, DESIGN, SPEC |
| Decisions and gaps | Sections 10–15 | REQUIREMENTS, DESIGN, SPEC, DOCUMENT-REVIEW |

## 17. Review pass 1 — Completeness and correctness

Completed:

- Inspected all six production frames and four interaction-state frames.
- Inspected foundations, components, variants, instances, variables, text styles, grids, assets, and prototype reactions.
- Re-inspected both mobile frames and nested content containers.
- Incorporated stakeholder decisions without turning deferred details into facts.
- Added and verified `spacing/125 = 10` in Figma.
- Distinguished current IndexedDB behavior from future API integration.
- Distinguished required success and storage-failure feedback from undefined message copy/design.
- Confirmed Basic as the default Plan for generic and direct Sign Up navigation.

## 18. Review pass 2 — Consistency, traceability, and uncertainty

Completed:

- Material findings are connected to Figma nodes or explicit user decisions.
- Observed evidence, decisions, risks, and open questions remain distinct.
- The stale mobile grid and resolved spacing token are accurately recorded.
- Contrast deferral is documented as risk, not accessibility conformance.
- Current and future persistence boundaries do not conflict.
- Remaining questions are non-blocking for requirements but cannot be invented later.
- IndexedDB failure feedback and the Basic generic default are confirmed decisions, not recommendations.

## 19. Stage completion

- **File modified:** `FIGMA-AUDIT.md`
- **Figma modified:** Added and verified `spacing/125 = 10` (`VariableID:2182:134`).
- **Important findings:** Two responsive page flows, explicit default/hover/focus states, direct Home-to-Sign-Up navigation, IndexedDB persistence and failure feedback, plan preselection, Basic as the generic default, and a future server-derived launch date are established.
- **Accepted risks/deferrals:** Contrast remediation, exact feedback copy, IndexedDB record shape, focus-ring normalization, privacy/retention policy, and code token naming.
- **Blockers:** None for Stage 2.
- **Readiness:** **Stage 2 decisions are fully incorporated; ready for Stage 3 with documented non-blocking questions and risks.**
