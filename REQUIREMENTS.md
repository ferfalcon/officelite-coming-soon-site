---
artifact: REQUIREMENTS
created: 2026-08-13
updated: 2026-08-13
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
---

# Project Requirements

## 1. Document Information

- Lifecycle status is owned by the canonical CLI record; narrative review completed in two passes.
- Scope: responsive Home and Sign Up experience in the current Astro repository.
- Last updated: 2026-08-13
- Owners: product approval — `ferfalcon`; requirements author — Codex
- Project context: `PROJECT-CONTEXT.md`
- Source baseline: `SOURCE-BASELINE.md`
- Evidence baseline: approved `DESIGN-AUDIT.md`
- Active inputs: `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-001`

## 2. Overview and Problem

The current `frontend/` package is an Astro starter and does not provide the Officelite experience. The required outcome is a responsive Home experience that presents the product, pricing placeholders, and launch countdown, connected to a Sign Up experience that retains plan intent, validates all current-release fields, and stores valid submissions locally. The result must preserve the approved visual evidence and support keyboard and assistive-technology users without adding a backend, authentication, or deployment change.

## 3. Goals and Non-goals

### Goals

- Deliver the complete Home and Sign Up content and hierarchy demonstrated by `EVD-002` and `EVD-003` across compact, medium, large, and intermediate layout conditions.
- Preserve Home-to-Sign-Up navigation and Basic/Pro/Ultimate plan intent.
- Provide a native plan selector, required-field and email validation, local IndexedDB persistence, and visible/programmatic transaction feedback.
- Display a once-per-second launch countdown to `2026-12-31T00:00:00-03:00`, clamped permanently to zero at and after expiry.
- Make current navigation, selection, validation, submission, and feedback behavior keyboard-operable with visible focus and accessible names/relationships.
- Integrate within the pinned Astro repository and validate a production build plus the documented manual behaviors.

### Non-goals

- A remote sign-up or launch-date API, remote persistence, authentication, authorization, analytics, or multiple services.
- Deployment or hosting changes.
- Treating placeholder marketing copy, pricing, plan features, or launch content as verified commercial facts.
- Redesigning the Figma source, implementing excluded Figma pages, or reverse-engineering the live site.
- Inventing a browser matrix, formal WCAG conformance claim, performance budget, privacy/retention policy, or unsupported field/state behavior.

## 4. Users and Needs

| User or actor | Need | Evidence or snapshot |
|---|---|---|
| Visitor evaluating Officelite | Understand the product, plans, launch timing, and path to sign up at different viewport sizes. | `EVD-002`, `EVD-003`, `EVD-005` |
| Prospective subscriber | Carry a selected plan into Sign Up, enter required details, correct validation issues, and receive a clear outcome. | `SRC-DOC-001`, `EVD-004`, `EVD-006`, `EVD-016` |
| Keyboard user | Navigate, choose a plan, submit, correct errors, and perceive focus without a pointer. | `SRC-DOC-001`, `EVD-012` |
| Assistive-technology user | Receive accessible control names, field-specific errors, and announced submission outcomes. | `SRC-DOC-001`, `AUD-005`, `AUD-012` |
| Project owner/reviewer | Verify visual fidelity, responsive integrity, local-only data handling, and a successful Astro build. | `SRC-REPO-001`, `SRC-DOC-001`, `EVD-007`–`EVD-015` |

## 5. Functional Requirements

### REQ-FR-001 — Present the complete Home experience

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Home must present the Officelite brand, hero content and primary action, product illustration, Basic/Pro/Ultimate plan content and actions, launch overline, four-unit countdown, and final action in the hierarchy demonstrated by the three Home compositions.
- **Rationale:** Home is one of the two requested implementation results and is the primary entry to Sign Up.
- **Evidence:** `EVD-002`, `EVD-005`, `EVD-007`–`EVD-010`, `SRC-DOC-001`
- **Acceptance criteria:** `AC-001`, `AC-002`

### REQ-FR-002 — Present the complete Sign Up experience

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Sign Up must present the Officelite brand, “Work smarter. Save time.” introduction, supporting copy, launch overline, four-unit countdown, and a form containing Name, Email Address, Plan, Phone Number, Company, and the submission action.
- **Rationale:** Sign Up is the destination for every Home call to action and owns the current-release data entry flow.
- **Evidence:** `EVD-003`, `EVD-006`, `SRC-DOC-001`
- **Acceptance criteria:** `AC-003`

### REQ-FR-003 — Navigate every Home call to action to Sign Up

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Activating the hero action, any of the three plan actions, or the final countdown action must navigate to Sign Up.
- **Rationale:** The project brief requires every Home call to action to reach Sign Up, and the prototype demonstrates all five connections per supplied viewport.
- **Evidence:** `SRC-DOC-001`, `EVD-004`
- **Acceptance criteria:** `AC-004`, `AC-005`

### REQ-FR-004 — Provide return navigation from Sign Up

- **Classification:** Inferred
- **Priority:** Should
- **Description:** Activating the Officelite logo on Sign Up should return to Home.
- **Rationale:** Every supplied Sign Up prototype frame assigns this behavior to the logo, but the project brief does not state it independently.
- **Evidence:** `EVD-004`
- **Acceptance criteria:** `AC-006`

### REQ-FR-005 — Resolve and retain plan intent

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Sign Up must initialize to the plan chosen from a Basic, Pro, or Ultimate Home plan action. Generic Home actions and direct Sign Up entry must initialize to Basic. The user must remain able to change the selection on Sign Up.
- **Rationale:** Plan intent must survive navigation without preventing user correction.
- **Evidence:** `SRC-DOC-001`, `EVD-004`, `EVD-006`
- **Acceptance criteria:** `AC-007`, `AC-008`, `AC-009`

### REQ-FR-006 — Use a native Plan select

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Plan must use a native select control with Basic, Pro, and Ultimate choices and standard pointer and keyboard behavior.
- **Rationale:** Native selection behavior is an explicit current-release rule; the closed visual appearance is demonstrated, while an open custom menu is not.
- **Evidence:** `SRC-DOC-001`, `EVD-006`, `AUD-006`
- **Acceptance criteria:** `AC-010`, `AC-011`

### REQ-FR-007 — Validate all required fields

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Name, Email Address, Plan, Phone Number, and Company must all have a value before a sign-up record can be accepted. Empty required fields must receive field-specific feedback.
- **Rationale:** The project brief makes all five values required for the current release.
- **Evidence:** `SRC-DOC-001`, `EVD-006`, `AUD-004`, `AUD-005`
- **Acceptance criteria:** `AC-012`, `AC-013`

### REQ-FR-008 — Validate email syntax

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** An email address that is syntactically invalid must prevent acceptance and receive field-specific feedback; a syntactically valid address must not fail that rule.
- **Rationale:** Email syntax is the only content-specific validation rule established by the product brief.
- **Evidence:** `SRC-DOC-001`
- **Acceptance criteria:** `AC-014`, `AC-015`

### REQ-FR-009 — Persist valid submissions in IndexedDB

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** A valid submission must be stored as a browser-local sign-up record in IndexedDB. Submission data must not be sent to a remote sign-up API.
- **Rationale:** Local persistence is the current-release destination while the future API is out of scope.
- **Evidence:** `SRC-DOC-001`
- **Acceptance criteria:** `AC-016`, `AC-017`, `AC-025`, `AC-026`

### REQ-FR-010 — Confirm successful persistence

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Only after the IndexedDB transaction succeeds, the user must receive a visible confirmation and an equivalent programmatic announcement.
- **Rationale:** A submission must not be reported successful before durable local completion.
- **Evidence:** `SRC-DOC-001`
- **Acceptance criteria:** `AC-018`, `AC-019`, `AC-032`

### REQ-FR-011 — Report persistence failure without false success

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** If IndexedDB storage cannot complete, the user must receive visible and programmatically announced failure feedback, no success state may be reported, and entered values must remain available where technically possible.
- **Rationale:** Storage can fail independently of form validity and must be recoverable without misleading the user.
- **Evidence:** `SRC-DOC-001`
- **Acceptance criteria:** `AC-020`, `AC-021`, `AC-033`

### REQ-FR-012 — Display a live launch countdown

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Both experiences must display days, hours, minutes, and seconds remaining to `2026-12-31T00:00:00-03:00` and update the visible values once per second while time remains. The calculation must never display negative values. At and after the target, both experiences must remain at `00 days / 00 hours / 00 min / 00 sec`.
- **Rationale:** A live countdown is required. The product owner resolved the conflicting placeholder evidence by approving the exact target and persistent zero-state behavior on 2026-08-13.
- **Evidence:** Explicit product-owner decision by `ferfalcon` on 2026-08-13; `SRC-DOC-001`, `EVD-002`, `EVD-003`, `EVD-014`, `AUD-009`
- **Acceptance criteria:** `AC-022`, `AC-023`, `AC-024`

## 6. Business Rules

### REQ-BR-001 — Supported plans

- **Description:** The current-release plan set is Basic, Pro, and Ultimate. Visual prices, features, and “Pack” labels are placeholder content rather than verified commercial terms.
- **Evidence:** `SRC-DOC-001`, `EVD-005`, `EVD-006`
- **Affected requirements:** `REQ-FR-001`, `REQ-FR-005`, `REQ-FR-006`, `REQ-DR-001`

### REQ-BR-002 — Plan-entry precedence

- **Description:** A plan-specific Home action supplies its matching initial plan; a generic Home action or direct Sign Up entry supplies Basic; an explicit user change on Sign Up becomes the current value.
- **Evidence:** `SRC-DOC-001`
- **Affected requirements:** `REQ-FR-003`, `REQ-FR-005`, `REQ-FR-006`

### REQ-BR-003 — Validity precedes persistence

- **Description:** No sign-up record may be accepted or persisted until every required-field rule and the email-syntax rule pass.
- **Evidence:** `SRC-DOC-001`
- **Affected requirements:** `REQ-FR-007`, `REQ-FR-008`, `REQ-FR-009`

### REQ-BR-004 — Transaction outcome controls feedback

- **Description:** Success feedback corresponds to a completed IndexedDB transaction; a failed transaction produces failure feedback and never success feedback.
- **Evidence:** `SRC-DOC-001`
- **Affected requirements:** `REQ-FR-009`, `REQ-FR-010`, `REQ-FR-011`

### REQ-BR-005 — Placeholder and future-API boundary

- **Description:** Current marketing copy, pricing, plan features, and launch content are placeholders. The current release must not add a remote launch-date or sign-up-processing API.
- **Evidence:** `SRC-DOC-001`, `EVD-014`
- **Affected requirements:** `REQ-FR-001`, `REQ-FR-002`, `REQ-FR-009`, `REQ-FR-012`, `REQ-CON-003`

### REQ-BR-006 — Countdown target and expiry

- **Description:** The launch target is `2026-12-31T00:00:00-03:00`. While the target is in the future, both routes derive the displayed days, hours, minutes, and seconds from that instant. At and after the target, each unit remains clamped to zero.
- **Evidence:** Explicit product-owner decision by `ferfalcon` on 2026-08-13; `SRC-DOC-001`, `AUD-009`
- **Affected requirements:** `REQ-FR-012`

## 7. Data Requirements

### REQ-DR-001 — Sign-up record content

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Each accepted sign-up record must preserve the submitted Name, Email Address, Plan, Phone Number, and Company values.
- **Required and optional data:** All five listed values are required. No additional user-provided field is established. The plan value is one of Basic, Pro, or Ultimate.
- **Validation or ownership:** `REQ-FR-007`, `REQ-FR-008`, and `REQ-BR-003` control acceptance.
- **Privacy or retention evidence:** `SRC-DOC-001` requires browser-local IndexedDB and no remote API. Retention duration, deletion, encryption, deduplication, and record-update rules are unspecified.
- **Acceptance criteria:** `AC-025`, `AC-026`

### REQ-DR-002 — Local transaction result

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** The product must distinguish a completed IndexedDB write from a failed write so the correct feedback path is observable.
- **Required and optional data:** No exact IndexedDB database name, object-store name, key strategy, schema version, or metadata fields are defined at requirements stage.
- **Validation or ownership:** Transaction outcome controls `REQ-FR-010` and `REQ-FR-011`.
- **Privacy or retention evidence:** Same boundary as `REQ-DR-001`.
- **Acceptance criteria:** `AC-018`–`AC-021`

## 8. Accessibility Requirements

### REQ-AR-001 — Semantic structure and accessible names

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Home and Sign Up must expose meaningful page structure, headings, navigation/actions, form controls, and persistent accessible names and relationships. Visible placeholder text alone must not be the only accessible name for a field.
- **Rationale:** Semantic HTML and accessible labels are part of the approved quality baseline; the Figma source does not prove them.
- **Evidence or standard:** `SRC-DOC-001`, `AUD-005`, `AUD-012`
- **Acceptance criteria:** `AC-027`, `AC-028`

### REQ-AR-002 — Keyboard operation

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Every current navigation, plan-selection, validation, submission, correction, and feedback path must be operable without a pointer using standard keyboard behavior.
- **Rationale:** Keyboard access is explicitly required, and native Plan selection preserves familiar behavior.
- **Evidence or standard:** `SRC-DOC-001`, `EVD-012`
- **Acceptance criteria:** `AC-029`

### REQ-AR-003 — Visible focus

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Every interactive element must display a clearly visible keyboard focus indicator. Demonstrated button and form focus treatments must inform later design decisions without limiting coverage to the specimen elements.
- **Rationale:** The state boards show a strong focus treatment selectively, while the product brief requires visible focus across current behavior.
- **Evidence or standard:** `SRC-DOC-001`, `EVD-012`, `AUD-007`, `AUD-012`
- **Acceptance criteria:** `AC-030`

### REQ-AR-004 — Field-error identification and association

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Each invalid field must be identifiable as invalid and its field-specific feedback must be programmatically associated with that field.
- **Rationale:** Users must be able to locate and understand validation failures regardless of visual perception.
- **Evidence or standard:** `SRC-DOC-001`, `AUD-005`
- **Acceptance criteria:** `AC-031`

### REQ-AR-005 — Submission outcome announcements

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Successful and failed IndexedDB outcomes must be visibly presented and programmatically announced without requiring users to find an unannounced change.
- **Rationale:** Both outcome channels are explicit current-release capabilities.
- **Evidence or standard:** `SRC-DOC-001`, `AUD-012`
- **Acceptance criteria:** `AC-032`, `AC-033`

## 9. Other Non-functional Requirements

### REQ-NFR-001 — Supplied-layout responsive integrity

- **Classification:** Confirmed
- **Priority:** Must
- **Category:** Compatibility / usability
- **Description:** The complete content and behavior must remain readable and operable at the supplied compact, medium, and large composition widths without content overlap, unintended clipping, or horizontal page scrolling caused by the layout.
- **Measurement conditions:** Visual and interaction checks at 375, 768, Home 1440, and Sign Up 1321; exact CSS breakpoints are not requirements.
- **Evidence:** `SRC-DOC-001`, `EVD-002`, `EVD-003`, `AUD-002`, `AUD-003`
- **Acceptance criteria:** `AC-034`

### REQ-NFR-002 — Intermediate-width resilience

- **Classification:** Recommended
- **Priority:** Should
- **Category:** Compatibility / usability
- **Description:** At representative widths between and beyond the supplied samples, material content and controls should remain readable and operable without content overlap, unintended clipping, or horizontal page scrolling caused by the layout.
- **Measurement conditions:** Manual checks at representative intermediate, unusually narrow, and wider widths chosen where layout stress occurs; no browser matrix or arbitrary CSS breakpoint is implied.
- **Evidence:** `PROJECT-CONTEXT.md`, `AUD-002`, `AUD-003`
- **Acceptance criteria:** `AC-035`

### REQ-NFR-003 — Design-evidence fidelity

- **Classification:** Confirmed
- **Priority:** Must
- **Category:** Visual quality
- **Description:** The delivered experiences must preserve the approved source’s hierarchy, content examples, typography roles, color roles, spacing/radius system, decorative asset roles, component reuse, and demonstrated Default/Hover/Focus differentiation, allowing only changes required by approved requirements or responsive integrity.
- **Measurement conditions:** Side-by-side review at each supplied frame size plus interaction-state review.
- **Evidence:** `EVD-002`–`EVD-015`
- **Acceptance criteria:** `AC-036`, `AC-037`

### REQ-NFR-004 — Production build validity

- **Classification:** Confirmed
- **Priority:** Must
- **Category:** Reliability / maintainability
- **Description:** The integrated Astro package must complete its repository-defined production build successfully.
- **Measurement conditions:** Run `pnpm build` from `frontend/` in the verified Linux/Node/pnpm environment.
- **Evidence:** `SRC-REPO-001`, `SRC-DOC-001`
- **Acceptance criteria:** `AC-038`

No numeric performance threshold or browser-support matrix is defined. Neither may be claimed without a later approved decision and actual validation evidence.

## 10. Security Requirements

### REQ-SEC-001 — Keep sign-up data within the browser

- **Classification:** Confirmed
- **Priority:** Must
- **Description:** Submitted Name, Email Address, Plan, Phone Number, and Company data must be written only to browser-local IndexedDB for the current release and must not be included in a request to a remote sign-up service.
- **Evidence:** `SRC-DOC-001`
- **Affected boundaries:** Form submission and persistence. This does not establish retention, deletion, encryption, authentication, authorization, or a broader privacy policy.
- **Acceptance criteria:** `AC-017`

## 11. Responsive and Content Requirements

- Home must preserve the content groups identified by `REQ-FR-001` while transforming from a large side-by-side hero/three-card row into the supplied tablet and mobile stacking outcomes. Exact breakpoints belong to later design/specification work.
- Sign Up must preserve the content groups identified by `REQ-FR-002` while transforming from the large split composition into the supplied centered tablet/mobile stacking outcomes.
- Placeholder copy, prices, features, and the selected approved launch content must remain internally consistent across routes and viewports; their display does not assert real commercial terms.
- Text must wrap without truncating material content or making controls inoperable under the validated layout conditions.
- Only Default/Hover/Focus appearance is source-demonstrated. Missing states in `AUD-004` must not be invented as source evidence; later design/specification must define only states required by approved functional and accessibility requirements.

## 12. Constraints

### REQ-CON-001 — Existing Astro package and verified toolchain

- **Description:** The result must integrate into `frontend/`, using the pinned Astro package and the repository’s verified Linux checkout, Node `>=22.12.0`, and pnpm lockfile.
- **Evidence:** `SRC-REPO-001`, `PROJECT-CONTEXT.md`
- **Impact:** Repository structure and supported commands constrain later architecture and planning; no root package script exists.

### REQ-CON-002 — Repository implementation conventions

- **Description:** The result must use semantic HTML5, mobile-first CSS, CSS custom properties, and the existing Astro/TypeScript stack, matching adjacent repository style unless a later approved decision requires otherwise.
- **Evidence:** `SRC-DOC-001`, `SRC-REPO-001`
- **Impact:** These are real repository/project constraints, not a detailed implementation design.

### REQ-CON-003 — No backend or deployment expansion

- **Description:** Remote API integration, authentication/authorization, remote persistence, and deployment mutation are outside the current release.
- **Evidence:** `SRC-DOC-001`, `PROJECT-CONTEXT.md`
- **Impact:** Persistence and feedback must be satisfied within the client/browser boundary.

### REQ-CON-004 — Time-bound design input

- **Description:** `SRC-DS-001` is a mutable Figma URL verified only at recorded times; downstream work must reverify it rather than claim immutable design reproduction.
- **Evidence:** `SRC-DS-001`, `VER-004`, `AUD-001`
- **Impact:** A material upstream change requires workflow impact assessment/rebaseline before reliance.

### REQ-CON-005 — Supplied asset boundary

- **Description:** Repository-supplied assets under `docs/starter-code/assets/` are the only immutably registered implementation assets. No separate external asset snapshot is active.
- **Evidence:** `SRC-REPO-001`, `EVD-013`, `AUD-011`
- **Impact:** Any new external implementation asset requires source registration and authority review.

## 13. Dependencies

| Dependency | Snapshot or evidence | Purpose | Availability | Risk |
|---|---|---|---|---|
| Scoped Figma page and responsive/state frames | `SRC-DS-001`, `EVD-001`–`EVD-016` | Visual, content, responsive, and demonstrated-state evidence | Accessible; Time-bound | Mutable source requires re-verification |
| Current Astro repository/toolchain | `SRC-REPO-001` | Implementation package, scripts, conventions | Available; immutable commit | Current frontend is only a starter |
| Root product brief | `SRC-DOC-001` | Normative behavior and release boundary | Available; immutable commit | Its placeholder countdown required the recorded product-owner decision |
| Supplied SVG/PNG assets | `SRC-REPO-001`, `EVD-013`, `AUD-011` | Logo, illustration, patterns, icons, favicon | Available | Exact Figma-vector equivalence is not checksum-proven |
| Kumbh Sans | `EVD-007` | Required typography family | Design evidence present; implementation font source not registered | Availability/licensing/hosting path must be resolved later without untracked assumptions |
| Browser IndexedDB and native select | `SRC-DOC-001` | Local persistence and standard plan selection | Required platform capabilities | Browser matrix and failure modes are unspecified |
| Approved launch decision | Product-owner decision by `ferfalcon`, 2026-08-13; `AUD-009` | Countdown target and zero-state | Available | Conversation evidence is recorded here; preserve it through downstream traceability |

## 14. Assumptions and Open Questions

### Assumptions

- The three responsive frames per route express target outcomes, not approved CSS breakpoint values.
- The state boards are appearance specimens; they do not imply multiple simultaneous hover/focus states in runtime.
- The supplied repository assets are intended candidates for their matching visual roles, but later work must verify render equivalence.
- No duplicate-submission, record-replacement, retention, deletion, encryption, or data-export rule is assumed.

### Blocking questions

- None.

### Resolved decisions

- **`BQ-002` — Launch target and zero-state:** Resolved by product owner `ferfalcon` on 2026-08-13. The target is `2026-12-31T00:00:00-03:00`; at and after expiry, the countdown remains at `00 days / 00 hours / 00 min / 00 sec`. This explicit decision supersedes the conflicting placeholder dates without treating either mutable design content or the repository brief as authoritative launch data.
- **Sign Up logo return:** Retained as `REQ-FR-004` and approved through `DES-INT-002` and `SPEC-INT-002` because all three Sign Up prototype frames demonstrate the behavior.
- **Feedback and expired-state content:** Approved `SPEC.md` Sections 7 and 10 own the exact required-field, invalid-email, pending, success, and storage-failure strings. `REQ-BR-006` and `SPEC-BEH-004` retain the permanent four-unit zero state rather than a replacement message.

### Non-blocking questions

- What database/store names, schema version, record key strategy, duplicate handling, and optional metadata should later architecture/specification define?
- Which browser/device matrix, if any, should later validation claim?
- What approved source/hosting strategy should provide Kumbh Sans?
- Is a formal WCAG conformance target required beyond the confirmed accessibility outcomes?

## 15. Risks

| Risk | Impact | Likelihood | Mitigation | Blocking |
|---|---|---:|---|---|
| Recorded launch decision is lost or replaced by placeholder content | Countdown may drift from the approved target or expired state | Low | Trace `REQ-BR-006` and `AC-022`–`AC-024` to the 2026-08-13 product-owner decision | No |
| Mutable Figma input changes | Evidence and visual targets may drift | Medium | Reverify exact scoped IDs before downstream reliance | No while unchanged |
| Missing form/feedback visual states | Later UI decisions may be inconsistent or inaccessible | High | Define only requirement-driven states in Stage 3/4 and trace them to `AUD-004`–`AUD-007` | No |
| IndexedDB failures vary by environment | Failure path and value preservation may be missed | Medium | Specify controllable failure validation and manual checks later | No |
| Font source/licensing is not registered | Typography fidelity or asset provenance may be blocked | Medium | Resolve a repository-safe source before implementation planning | Potential later blocker |
| No browser/WCAG/performance targets | Validation claims may overreach | Medium | Report only tested conditions; obtain explicit targets if needed | No |
| Placeholder commercial content may be mistaken for real data | User/reviewer expectations may diverge | Medium | Preserve placeholder classification in content and review artifacts | No |

## 16. Acceptance Criteria

- `AC-001`: At the three supplied Home widths, the brand, hero, illustration, all three plans, launch overline, four countdown units, and final action are present in the demonstrated hierarchy.
- `AC-002`: Basic, Pro, and Ultimate each display the demonstrated placeholder price/billing summary, three feature lines, and a plan action without missing or interchanged content.
- `AC-003`: At the three supplied Sign Up widths, the brand, introduction, supporting copy, launch overline, four countdown units, five form controls, and submission action are present.
- `AC-004`: Activating each of the five Home actions reaches Sign Up.
- `AC-005`: Basic, Pro, and Ultimate plan actions each deliver their matching plan intent to Sign Up.
- `AC-006`: Activating the Sign Up logo returns to Home.
- `AC-007`: Direct Sign Up entry and either generic Home action initialize Plan to Basic.
- `AC-008`: Entry through Basic, Pro, or Ultimate initializes the matching Plan option.
- `AC-009`: After entry, the user can change Plan and the current selection is used for validation/persistence.
- `AC-010`: Plan is an actual native select operable by pointer and standard keyboard commands.
- `AC-011`: The native select exposes Basic, Pro, and Ultimate as available choices.
- `AC-012`: Submission with any required value empty is not persisted.
- `AC-013`: Every empty required field receives field-specific visible feedback.
- `AC-014`: A syntactically invalid email prevents persistence and receives email-specific feedback.
- `AC-015`: A syntactically valid email does not fail the email-syntax rule when other required values are valid.
- `AC-016`: A fully valid submission completes an IndexedDB write containing the submitted sign-up values.
- `AC-017`: No request to a remote sign-up service contains the submitted Name, Email Address, Plan, Phone Number, or Company data.
- `AC-018`: Visible success feedback appears only after the IndexedDB transaction completes successfully.
- `AC-019`: The successful outcome is programmatically announced.
- `AC-020`: A forced/observed IndexedDB failure produces visible failure feedback and no success feedback.
- `AC-021`: The failed outcome is programmatically announced and entered values remain available where the browser state still permits preservation.
- `AC-022`: Home and Sign Up display labeled days, hours, minutes, and seconds values calculated against the single target `2026-12-31T00:00:00-03:00`.
- `AC-023`: While the target is in the future, the visible countdown updates once per second and reflects actual elapsed time rather than decrementing from a hard-coded example.
- `AC-024`: At and after `2026-12-31T00:00:00-03:00`, both routes show and continue to show `00 days / 00 hours / 00 min / 00 sec`; no unit becomes negative.
- `AC-025`: An accepted IndexedDB record preserves Name, Email Address, selected Plan, Phone Number, and Company values corresponding to the submitted form.
- `AC-026`: Invalid submissions do not create an accepted sign-up record.
- `AC-027`: The rendered pages expose a meaningful document language, page title, landmark/section structure, heading hierarchy, actions, and form semantics appropriate to the content.
- `AC-028`: Every form control retains an accessible name and required relationship independent of placeholder visibility.
- `AC-029`: A user can complete all current navigation, plan selection, validation correction, and submission paths using the keyboard alone.
- `AC-030`: Each keyboard-focusable interactive element has a clearly visible focus indicator in all backgrounds where it appears.
- `AC-031`: Each invalid control exposes its invalid state and is programmatically associated with its field-specific feedback.
- `AC-032`: Success feedback is both visible and exposed through an appropriate programmatic status announcement.
- `AC-033`: Persistence-failure feedback is both visible and exposed through an appropriate programmatic alert/status announcement.
- `AC-034`: At 375, 768, Home 1440, and Sign Up 1321 widths, the content order and composition correspond to the supplied frames without unintended clipping, overlap, or layout-caused horizontal page scrolling.
- `AC-035`: At representative widths between and beyond the supplied samples, all material content and controls remain readable and operable without unintended clipping, overlap, or layout-caused horizontal page scrolling.
- `AC-036`: Side-by-side review at the supplied widths finds no material unexplained divergence in hierarchy, typography/color roles, spacing/radius relationships, card/control proportions, or decorative asset role.
- `AC-037`: Demonstrated interactive controls have distinguishable Default, Hover, and visible Focus appearances consistent with `EVD-012`, with missing requirement-driven states resolved in later approved artifacts.
- `AC-038`: `pnpm build` exits successfully from `frontend/` in the verified project environment.

## 17. Definition of Done

- [x] `BQ-002` has an explicit approved decision and `REQ-FR-012`/`AC-024` are updated accordingly.
- [ ] All Must acceptance criteria pass; any unimplemented Should requirement has an approved disposition.
- [ ] Home and Sign Up match the approved responsive and interaction evidence at supplied and intermediate validation widths.
- [ ] Keyboard, focus, accessible naming/error relationships, and outcome announcements are manually verified.
- [ ] Required/invalid-email cases and successful/failed IndexedDB transactions are manually verified.
- [ ] `pnpm build` succeeds.
- [ ] Approved documentation, traceability, source verifications, and generated workflow projections are synchronized.
- [ ] No critical/high-severity blocker or unapproved source deviation remains.

## 18. Traceability

| Requirement | Snapshot or evidence | Approved design support | Approved specification support | Validation |
|---|---|---|---|---|
| `REQ-FR-001` | `EVD-002`, `EVD-005`, `EVD-007`–`EVD-010` | `DES-001`–`DES-006`, `DES-RWD-001`–`DES-RWD-003` | `SPEC-BEH-001`, `SPEC-BEH-006` | `AC-001`, `AC-002`, `AC-034`–`AC-037` |
| `REQ-FR-002` | `EVD-003`, `EVD-006` | `DES-004`, `DES-006`–`DES-009`, `DES-RWD-004`–`DES-RWD-006` | `SPEC-BEH-002`, `SPEC-BEH-007` | `AC-003`, `AC-034`–`AC-037` |
| `REQ-FR-003` | `SRC-DOC-001`, `EVD-004` | `DES-002`, `DES-INT-001` | `SPEC-INT-001` | `AC-004`, `AC-005`, `AC-029` |
| `REQ-FR-004` | `EVD-004` | `DES-INT-002` | `SPEC-INT-002` | `AC-006`, `AC-029`, `AC-030` |
| `REQ-FR-005`, `REQ-FR-006` | `SRC-DOC-001`, `EVD-006`, `AUD-006` | `DES-INT-001`, `DES-INT-003` | `SPEC-BEH-003`, `SPEC-INT-003`, `SPEC-DATA-001` | `AC-005`, `AC-007`–`AC-011` |
| `REQ-FR-007`, `REQ-FR-008` | `SRC-DOC-001`, `AUD-004`, `AUD-005` | `DES-007`, `DES-008`, `DES-INT-004` | `SPEC-INT-004`, `SPEC-INT-005`, `SPEC-VAL-001`, `SPEC-VAL-002` | `AC-012`–`AC-015`, `AC-031`, `AC-039`–`AC-041` |
| `REQ-FR-009`–`REQ-FR-011` | `SRC-DOC-001`, `EVD-016` | `DES-008`, `DES-INT-004`, `DES-INT-005` | `SPEC-INT-004`, `SPEC-INT-006`, `SPEC-DATA-002`, `SPEC-DATA-003`, `SPEC-VAL-003`, `SPEC-VAL-004` | `AC-016`–`AC-021`, `AC-025`, `AC-026`, `AC-032`, `AC-033`, `AC-042`, `AC-043`, `AC-047` |
| `REQ-FR-012` | Product-owner decision by `ferfalcon` (2026-08-13), `SRC-DOC-001`, `EVD-014`, `AUD-009` | `DES-006`, `DES-INT-006` | `SPEC-BEH-004`, `SPEC-BEH-005`, `SPEC-DATA-004` | `AC-022`–`AC-024`, `AC-044` |
| `REQ-BR-001`–`REQ-BR-006` | Product-owner decision by `ferfalcon` (2026-08-13), `SRC-DOC-001`, `EVD-004`–`EVD-006`, `EVD-014` | `DES-002`, `DES-INT-001`, `DES-INT-003`–`DES-INT-006` | `SPEC-BEH-003`–`SPEC-BEH-005`, `SPEC-INT-004`–`SPEC-INT-006`, `SPEC-DATA-001`–`SPEC-DATA-004` | Rule-specific criteria above |
| `REQ-DR-001`, `REQ-DR-002` | `SRC-DOC-001` | `DES-INT-004`, `DES-INT-005` | `SPEC-DATA-002`, `SPEC-DATA-003` | `AC-016`, `AC-018`–`AC-021`, `AC-025`, `AC-026`, `AC-047` |
| `REQ-AR-001`–`REQ-AR-005` | `SRC-DOC-001`, `EVD-012`, `AUD-005`, `AUD-012` | `DES-004`, `DES-005`, `DES-007`, `DES-008`, `DES-010` | `SPEC-ACC-001`–`SPEC-ACC-005`, `SPEC-INT-005`, `SPEC-INT-006` | `AC-027`–`AC-033`, `AC-039`–`AC-045` |
| `REQ-NFR-001`–`REQ-NFR-003` | `EVD-002`, `EVD-003`, `AUD-002`, `AUD-003` | `DES-RWD-001`–`DES-RWD-006`, `DES-009`, `DES-INT-007` | `SPEC-BEH-006`–`SPEC-BEH-008`, `SPEC-ACC-005` | `AC-034`–`AC-037`, `AC-045` |
| `REQ-NFR-004` | `SRC-REPO-001` | Repository-owned constraint | `SPEC.md` Section 11 | `AC-038`; `pnpm build` |
| `REQ-SEC-001` | `SRC-DOC-001` | `DES-INT-004`, `DES-INT-005` | `SPEC-DATA-003`, `SPEC.md` Section 11 | `AC-017`; network/persistence inspection |
| `REQ-CON-001`–`REQ-CON-005` | `SRC-REPO-001`, `SRC-DOC-001`, `VER-007`, `EVD-013` | Constrains approved design without redefining visual intent | `SPEC.md` Section 11; Stage 6 owns structural choices | Workflow, build, source, and asset checks |

## 19. Review

### Pass 1 — Completeness and correctness

- [x] Requirements cover the agreed scope.
- [x] Requirements are necessary, specific, testable, and prioritized.
- [x] Unsupported business, security, retention, browser, or performance rules were not invented.
- [x] Snapshot IDs in metadata exist and were actually used.

Review status: completed on 2026-08-13.

Findings and corrections:

- The newly approved countdown decision had not yet propagated through the goal, requirement, business rule, dependency, risk, acceptance criteria, Definition of Done, and traceability sections. Those sections now consistently use `2026-12-31T00:00:00-03:00` and the permanent all-zero expired state.
- Two review summaries still described `BQ-002` as unresolved after the decision was applied. Both stale statements were removed, and `BQ-002` is retained as a resolved, attributed decision.
- An identifier/reference check found 35 unique requirement definitions and 38 unique acceptance-criterion definitions, with no duplicate or missing requirement/acceptance definitions. All 23 distinct `EVD-*`/`AUD-*` references used here resolve in `DESIGN-AUDIT.md`.
- No unsupported browser matrix, formal conformance level, performance threshold, retention policy, backend behavior, or security guarantee was added.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Identifiers follow `Identifier-Conventions.md`.
- [x] Every material requirement has evidence from a pinned snapshot or an explicit approved authority.
- [x] No source changed silently after the artifact baseline was recorded.
- [x] Confirmed, inferred, recommended, and open information remain distinct.
- [x] Blocking questions are visible; none remain, and `BQ-002` is recorded under Resolved decisions.

Review status: completed on 2026-08-13.

Findings and corrections:

- The Figma and brief dates are explicitly retained as conflicting placeholder evidence; the product-owner decision is the authority for runtime behavior, so no placeholder is misrepresented as verified launch data.
- Git remained on `main` at `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`; only expected workflow artifacts are untracked, and `README.md` retained SHA-256 `72bee1d93b40d80643935b254499a9d3c0f3fd280392ad94eb4f4c6cf57fb1af`. Latest active-source verifications remain `VER-004`, `VER-005`, and `VER-006`, all `Unchanged`.
- Standard remains the smallest suitable profile because the two connected responsive routes include shared selection state, validation, IndexedDB persistence, and countdown behavior without the multi-service, authentication, deployment, or architecture-migration risk that would require Full.
- Remaining uncertainty is non-blocking and visible: persistence schema choices, font sourcing, browser coverage, and formal accessibility conformance are deferred to their owning downstream stages rather than invented here. Exact feedback copy was subsequently approved in `SPEC.md`.
