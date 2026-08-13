---
artifact: PROJECT-CONTEXT
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
created: 2026-08-13
updated: 2026-08-13
---

# Project Context

## 1. Project

- Project name: Officelite coming soon site
- Goal: Implement the complete linked Figma page as the responsive Home and Sign Up experience in the current Astro repository, including the current-release behavior confirmed by the pinned root project brief.
- Project type: Multi-page static marketing site with client-side form, navigation state, countdown, validation, feedback, and IndexedDB persistence.
- Profile rationale: Standard is the smallest safe profile. The work has two connected routes, three responsive compositions per route, reusable components and interaction states, shared plan-selection state, validation, a live countdown, and client persistence. Express and Lite cannot represent the connected routing and persistence concerns; Full is unnecessary because remote APIs, authentication, multiple services, migrations, and deployment changes are explicitly outside the current release.
- Created: 2026-08-13
- Last updated: 2026-08-13

## 2. Active Source Baseline

- Source baseline: `SOURCE-BASELINE.md`
- Design snapshots: `SRC-DS-001`
- Repository snapshots: `SRC-REPO-001`
- Runtime snapshots: None
- Documentation snapshots: `SRC-DOC-001`
- Asset snapshots: None; supplied assets are within `SRC-REPO-001`

Every listed ID must exist in `SOURCE-BASELINE.md` with Active status.

## 3. Design Scope

- Included pages, frames, nodes, screens, files, URLs, or regions: Figma page `4:3` “🤖 Workflow”; Home, Sign Up, Interaction States, Foundations, and Components sections; Home frames at 1440/768/375; Sign Up frames at 1321/768/375; supplied Home and Sign Up desktop hover/focus boards.
- Explicitly excluded areas: Other Figma pages, redesign or normalization of the Figma source, live-site reverse engineering, deployment changes, the future sign-up API, a future launch-date API, authentication, authorization, and unrelated repository work.
- Access limitations: Authenticated read access is available, but no named Figma version or durable checksum-backed export is available; inspection is time-bound.
- Known design-source dependencies: Implementation screens and interaction boards use local components. A remote palette specimen appears only in Foundations; file-level community library subscriptions are not established implementation dependencies.

Do not repeat source identity details already owned by `SOURCE-BASELINE.md`.

## 4. Repository Scope

- Target branch: `main`.
- Relevant application, package, or directory: `frontend/`; supplied reference markup and assets under `docs/starter-code/`; root product brief and repository instructions.
- Existing implementation state: Astro Basics starter with one placeholder route, layout, and welcome component; no Officelite route, form, countdown, plan-state, validation, announcement, or IndexedDB implementation exists.
- Known technical constraints: Work from the Linux WSL checkout; Node `>=22.12.0` with the verified Node 24 toolchain; pnpm lockfile; Astro `^7.1.6`; no frontend formatter, linter, automated test framework, or coverage threshold; match existing Astro tab indentation and repository conventions.
- Access or tooling limitations: No root package script; frontend validation is `pnpm build` plus manual responsive, keyboard, validation, announcement, and IndexedDB checks. No frontend build is part of Stage 0.

The pinned repository identity and commit belong to the canonical `SRC-REPO-001` record.

## 5. Runtime References

- Production snapshot: Not available in the active baseline
- Preview or staging snapshot: Not available
- Local runtime snapshot: Not available

Use `Not available` rather than inventing a runtime state.

## 6. Scope

### Included

- Responsive Home and Sign Up routes represented by `SRC-DS-001`.
- Navigation from all Home calls to action to Sign Up.
- Basic/Pro/Ultimate plan retention from plan actions; Basic default for generic and direct entry.
- Native Plan select behavior; required Name, Email Address, Plan, Phone Number, and Company fields; empty-field and syntactically invalid-email feedback.
- Browser IndexedDB storage with no remote submission; visible and programmatically announced success/failure feedback; value preservation where technically possible on storage failure.
- Launch countdown that updates visually once per second.
- Keyboard access and visible focus for current navigation, selection, validation, submission, and feedback behavior.
- Repository-integrated assets, semantic markup, mobile-first styling, accessibility, responsive behavior, and validation appropriate to the confirmed scope.

### Excluded

- Future API integration for launch date or sign-up processing.
- Authentication, authorization, remote persistence, analytics, deployment mutation, migration, and unrelated refactors.
- Figma editing, source normalization, or implementation of other Figma pages.
- Treating the current live site as target authority.

### Deferred or resolved downstream

- Resolved by product owner `ferfalcon` on 2026-08-13: use `2026-12-31T00:00:00-03:00` and retain `00 days / 00 hours / 00 min / 00 sec` at and after expiry.
- Decide the separate architecture artifact at Stage 6; persistence and cross-route plan state currently make explicit architecture handling likely.
- Define exact intermediate breakpoints, complete form states, IndexedDB schema/error behavior, and accessibility behavior only in their owning downstream stages.

## 7. Authoritative Sources

| Source or direction | Authority | Scope | Notes |
|---|---|---|---|
| Explicit current user request | Project authority | Overall goal, exact design URL, current repository, Stage 0-only boundary, Standard/Gated initialization | Highest authority for the present request |
| `SRC-DOC-001` | Product behavior and release scope | Required navigation, plan behavior, form validation, IndexedDB, feedback, countdown, keyboard access, placeholder status, and future-API exclusion | Root README at an immutable commit; `frontend/README.md` is only starter documentation |
| `SRC-DS-001` | Design authority | Visual hierarchy, supplied responsive compositions, component appearance, content examples, and demonstrated hover/focus appearance | Does not independently establish semantics, keyboard behavior, persistence, intermediate responsiveness, or complete states |
| `SRC-REPO-001` | Current implementation and technical constraint authority | Framework, scripts, dependencies, structure, assets, and repository conventions | Current starter behavior is evidence of present state, not target correctness |

The authority classification does not change snapshot identity.

Conflict assessment: no material source conflict is silently resolved. The Astro starter and its package README describe current scaffold state rather than target behavior, so they do not override the root project brief or Figma design. The Figma/README launch date remains placeholder content; the explicit 2026-08-13 product-owner decision supplies the current-release target and expiry behavior without promoting either placeholder source to product authority.

## 8. Quality Baseline

Record only approved or source-supported expectations.

- Accessibility standard or expectations: Semantic HTML, keyboard-operable current flows, visible focus, accessible form names/relationships, field-specific errors, and programmatic success/failure announcements. No formal WCAG conformance level is specified.
- Responsive coverage: Match supplied 375, 768, and large Home/Sign Up compositions; also validate intermediate, unusually narrow, and wider conditions based on content/layout failure rather than treating Figma widths as automatic CSS breakpoints.
- Browser or device coverage: No explicit browser matrix is specified. Do not claim compatibility beyond browsers actually tested in later validation.
- Performance expectations: No numeric threshold is specified. Avoid inventing one.
- Security and privacy expectations: Store valid sign-up records locally in IndexedDB and do not send them to a remote API in the current release. Retention, deletion, encryption, and broader privacy policy remain unspecified.
- Testing expectations: Run `pnpm build`; manually verify affected responsive layouts, keyboard paths, visible focus, native select behavior, validation, announcements, success/failure behavior, and IndexedDB transactions. Automated frontend test coverage is not currently available.
- Deployment expectations: No deployment mutation is requested. Deployment readiness may be assessed later only against approved scope and actual validation evidence.

## 9. Constraints and Dependencies

| ID | Constraint or dependency | Evidence or snapshot | Impact | Status |
|---|---|---|---|---|
| `REQ-CON-001` | Implement within the existing `frontend/` Astro package using the repository's verified Linux/Node/pnpm environment. | `SRC-REPO-001` | Constrains structure, commands, and dependency choices. | Confirmed |
| `REQ-CON-002` | Follow the repository's semantic HTML, mobile-first CSS, CSS custom-property, Astro/TypeScript, and adjacent-style conventions. | `SRC-DOC-001`, `SRC-REPO-001` | Constrains implementation conventions without prescribing detailed architecture. | Confirmed |
| `REQ-CON-003` | No backend, remote persistence, authentication/authorization, or deployment expansion is in scope. | `SRC-DOC-001` | Requires client persistence and error handling without backend assumptions. | Confirmed |
| `REQ-CON-004` | The Figma baseline is Time-bound and must be reverified before downstream reliance after a meaningful pause or suspected change. | `SRC-DS-001` | Upstream design changes could invalidate approved evidence. | Confirmed |
| `REQ-CON-005` | No independent asset source is active; use only repository-covered assets unless a later source is registered. | `SRC-REPO-001` | Prevents untracked external asset assumptions. | Confirmed |

## 10. Known Decisions

| Decision | Owner | Evidence or snapshot | Status |
|---|---|---|---|
| Use Standard profile and Gated CLI-managed execution. | Explicit user decision, supported by workflow profile rules | `SRC-DS-001`, `SRC-DOC-001`, `SRC-REPO-001` | Confirmed |
| Treat root `README.md` as behavior/release-scope authority and Figma as visual/demonstrated-state authority. | Source authority rules | `SRC-DOC-001`, `SRC-DS-001` | Confirmed |
| Do not adopt the README-linked live site as a runtime baseline. | Stage 0 scope decision | `SRC-DOC-001` | Confirmed |
| Use `2026-12-31T00:00:00-03:00` and clamp the expired countdown permanently to zero. | Product owner `ferfalcon` | Explicit 2026-08-13 decision; `REQ-BR-006` | Confirmed |
| Whether Stage 6 requires a separate architecture artifact. | Stage 6 decision owner | `SRC-DOC-001`, `SRC-REPO-001` | Open; explicit architecture handling is recommended |

## 11. Initial Risks and Questions

### Blocking

- None. Historical Stage 0 approvals were supplied by `ferfalcon`; later Gated stages continue to require explicit human approval.

### Non-blocking

- The Figma source is Time-bound rather than immutably versioned; reverify it before downstream reliance after a meaningful pause or suspected change.
- The launch target and expiry behavior are resolved by the product-owner decision recorded in `REQ-BR-006`.
- Exact browser coverage, formal WCAG target, performance thresholds, IndexedDB schema/retention behavior, and complete form failure states are unspecified; downstream owning stages must not invent them.
- The Home and Sign Up large frames use different widths, and Figma does not prove intermediate responsive behavior.

## 12. Stage 0 Completion

- [x] Scope is explicit.
- [x] `SOURCE-BASELINE.md` exists.
- [x] Every active snapshot ID exists and its pin strength is honest.
- [x] Design and repository scope are recorded.
- [x] The repository baseline uses a commit SHA in the canonical registry.
- [x] Workflow profile is selected and justified.
- [x] Quality expectations are evidence-based.
- [x] Blocking questions and source limitations are visible.
- [x] `WORKFLOW-STATE.md` exists and references the same active baseline.
