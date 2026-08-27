---
artifact: PROJECT-CONTEXT
project: Officelite coming soon site
profile: Full
execution_mode: Gated
created: 2026-08-27
updated: 2026-08-27
---

# Project Context

## 1. Project

- **Project name:** Officelite coming soon site
- **Goal:** Implement the Officelite Home and Sign Up experience from the configured Figma scope in the existing Astro application, preserving the documented responsive, navigation, form, local-persistence, countdown, and accessibility behaviors for the current release.
- **Project type:** Web application
- **Profile rationale:** **Full**. The work spans connected Home and Sign Up flows, cross-route plan state, form validation, browser persistence through IndexedDB, live countdown state, multiple responsive compositions, deployment/runtime concerns, and enough structural risk that consolidated Express/Lite documentation would not preserve clear ownership.
- **Created:** 2026-08-27
- **Last updated:** 2026-08-27

## 2. Active Source Baseline

- Source baseline: `SOURCE-BASELINE.md`
- Design snapshots: `SRC-DS-001`
- Repository snapshots: `SRC-REPO-001`
- Runtime snapshots: None
- Documentation snapshots: None separate from `SRC-REPO-001`
- Asset snapshots: None separate from the active design/repository sources

The canonical workflow record owns current snapshot status and pin strength.

## 3. Design Scope

- **Included:** Figma page/canvas `🤖 Workflow` (node `4:3`), including implementation-relevant design-system foundations/components and responsive Home and Sign Up compositions nested within that scope.
- **Explicitly excluded:** Any Figma page or node outside configured node `4:3`.
- **Access limitations:** Current connector access supports metadata inspection of the configured scope. A design-context request currently requires an active Figma selection; Stage 1 must treat that as a tooling constraint rather than inventing missing evidence.
- **Known design-source dependencies:** Local foundations and reusable components are observed. External Figma-library dependencies, prototype completeness, and full asset/export requirements remain to be established in Stage 1.

## 4. Repository Scope

- **Target branch:** `main`
- **Relevant application, package, or directory:** `frontend/`
- **Existing implementation state:** Astro starter application. At the immutable implementation baseline, `frontend/src/pages/index.astro` renders the default `Welcome.astro`; the target Officelite UI is not yet implemented.
- **Known technical constraints:** Astro `^7.1.6`; ESM; Node `>=22.12.0`; pnpm lock/workspace files are present; implementation-root instructions live in `frontend/AGENTS.md`.
- **Access or tooling limitations:** Repository inspection and mutation are available through GitHub. Local shell/CLI execution is not assumed; canonical workflow mutations use the installed GitHub remote bridge.

The pinned repository identity and commit remain owned by `SRC-REPO-001`.

## 5. Runtime References

- Production snapshot: None registered
- Preview or staging snapshot: None registered
- Local runtime snapshot: None registered
- Project configuration identifies production at `https://officelite-coming-soon-site-ferfalcon.vercel.app` and a Vercel project, but no runtime evidence is promoted to a workflow snapshot at Stage 0.

## 6. Scope

### Included

- Responsive Home and Sign Up experiences represented in the configured Figma scope.
- Navigation from Home calls to action to Sign Up.
- Plan preservation for Basic, Pro, and Ultimate entry paths and Basic defaulting for generic/direct entry.
- Native plan selection behavior.
- Required Name, Email Address, Plan, Phone Number, and Company inputs for the current release.
- Required-field and email-format validation described by repository documentation.
- Browser IndexedDB persistence for valid sign-up submissions.
- Visible and programmatic success/failure feedback for IndexedDB transactions.
- Launch countdown that updates visually once per second.
- Keyboard operability and visible focus for current interactions.
- Repository integration, accessibility, testing, and deployment validation required by the canonical workflow.

### Excluded

- Remote sign-up API integration for the current release.
- A real production launch-date service.
- Treating placeholder marketing copy, pricing, plan features, or launch date as final business content.
- Figma areas outside node `4:3`.

### Deferred

- Future API-backed launch date.
- Future server-side sign-up processing.
- Any additional business, permission, retention, analytics, or security policy not supported by current project evidence.

## 7. Authoritative Sources

| Snapshot ID | Authority | Scope | Notes |
|---|---|---|---|
| `SRC-DS-001` | Design | Configured Figma node `4:3` | Authoritative for observed design intent and supplied compositions; mutable/time-bound |
| `SRC-REPO-001` | Current implementation + repository documentation + technical constraints | Repository at pinned commit, with implementation root `frontend/` | Includes README product intent, package versions, current starter implementation, and scoped AGENTS instructions |

## 8. Quality Baseline

Only source-supported expectations are recorded here.

- **Accessibility:** Current interactions must be keyboard-operable with visible focus. Successful and failed sign-up persistence must provide visible and programmatically announced feedback. Additional semantic, screen-reader, contrast, reduced-motion, and focus-management requirements must be established from Stage 1–4 evidence rather than assumed.
- **Responsive coverage:** Figma provides compact, medium, and large compositions for Home and Sign Up. Exact implementation breakpoints are not yet established and must not be inferred from frame widths alone.
- **Browser or device coverage:** No explicit supported-browser matrix is currently documented.
- **Performance expectations:** No numeric performance threshold is currently documented.
- **Security and privacy expectations:** Current release stores valid sign-up records in browser IndexedDB and does not send them to a remote API. No retention, encryption, consent, or broader privacy policy is currently established by the source.
- **Testing expectations:** Canonical workflow validation is required; the repository does not currently establish a complete automated test matrix.
- **Deployment expectations:** The project is configured for Vercel production. Actual deployment/runtime acceptance evidence must be captured when the workflow reaches the relevant validation stage.

## 9. Constraints and Dependencies

| ID | Constraint or dependency | Evidence or snapshot | Impact | Status |
|---|---|---|---|---|
| — | Implementation work is scoped to `frontend/` by project configuration | Project configuration + `SRC-REPO-001` | App code changes remain inside the implementation root except required repo-wide integration | Confirmed |
| — | Astro/ESM/Node/pnpm versions and conventions come from the existing app | `SRC-REPO-001` | Implementation must adapt to the existing stack rather than replace it without an approved architecture decision | Confirmed |
| — | Current sign-up persistence is IndexedDB-only | `SRC-REPO-001` README | Local persistence, error handling, and validation are in current scope; remote API work is not | Confirmed |
| — | Figma source is mutable and not pinned to a named version | `SRC-DS-001` | Source must be reverified before material stage transitions and implementation | Confirmed |
| — | Exact intermediate responsive behavior is not fully established at Stage 0 | `SRC-DS-001` | Stage 1–4 must separate observed frames from inferred interpolation | Open |

## 10. Known Decisions

| Decision | Owner | Evidence or snapshot | Status |
|---|---|---|---|
| Use the canonical Design-to-Implementation Workflow | Project | Installed pinned toolkit caller and workflow record | Confirmed |
| Workflow profile is Full | Canonical workflow classification | Cross-route state, persistence, validation, responsive scope, deployment risk | Confirmed |
| Execution mode is Gated | Canonical workflow default | Workflow record | Confirmed |
| Implementation root is `frontend/` | Project configuration | Project settings + repository structure | Confirmed |
| Current release persists sign-up data in IndexedDB and excludes remote API submission | Product/source documentation | `SRC-REPO-001` README | Confirmed |

## 11. Initial Risks and Questions

### Blocking

No Stage 0 blocking question is currently identified.

### Non-blocking

- The Figma source has no named immutable version; source verification remains necessary throughout the workflow.
- External Figma-library dependencies and prototype completeness are not yet established.
- Exact responsive interpolation between supplied frames is not yet established.
- No explicit supported-browser matrix or numeric performance target is documented.
- Runtime deployment evidence is not yet registered as a workflow snapshot.
- The current implementation is only the Astro starter, so downstream planning must not assume reusable product components already exist.

## 12. Stage 0 Completion

- [x] Scope is explicit.
- [x] `SOURCE-BASELINE.md` exists.
- [x] Every active snapshot ID exists and its pin strength is honestly described.
- [x] Design and repository scope are recorded.
- [x] The repository baseline uses an immutable commit SHA in the canonical registry.
- [x] Workflow profile is selected and justified.
- [x] Quality expectations are evidence-based and gaps remain visible.
- [x] Blocking questions and source limitations are explicit.
- [x] `WORKFLOW-STATE.md` references the same active baseline.
