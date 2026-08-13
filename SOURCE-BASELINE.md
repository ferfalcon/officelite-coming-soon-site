---
artifact: SOURCE-BASELINE
project: Officelite coming soon site
profile: Standard
execution_mode: Gated
created: 2026-08-13
updated: 2026-08-13
---

# Source Baseline

## 2. Document Information

- Project: Officelite coming soon site
- Created: 2026-08-13
- Last updated: 2026-08-13
- Workflow operator: Codex; human approval actor: `ferfalcon`
- Related context: `PROJECT-CONTEXT.md`
- Operational state: `WORKFLOW-STATE.md`

## 3. Design Source Evidence

### SRC-DS-001 — Officelite Figma workflow page

The ID and current registry fields belong in the workflow record in CLI-managed mode.

- **Source type:** Figma Design file.
- **Purpose:** Visual, responsive, component, content-example, and demonstrated interaction-state source for the requested implementation.
- **Included scope:** File key `L7MdLOW8usVUcPwV0cMQ1n`; page `4:3` “🤖 Workflow”; sections Home `2141:2383`, Sign Up `2141:2386`, Interaction States `2141:2949`, Design System — Foundations `2141:938`, and Design System — Components `2141:935`.
- **Responsive frames:** Home Desktop `2141:1599` (1440), Tablet `2141:1724` (768), Mobile `2141:1813` (375); Sign Up Desktop `2141:1680` (1321), Tablet `2141:1896` (768), Mobile `2141:1940` (375).
- **State frames:** Home Hover `2141:2441`, Home Focus `2141:2542`, Sign Up Hover `2141:2387`, and Sign Up Focus `2141:2638`.
- **Excluded scope:** Pages Overview `4:2`, Design System - Init `2141:234`, Prototype `4:4`, and Designs `4:5`. They are not part of the node-specific request and were not adopted as active inputs.
- **Captured or inspected at:** 2026-08-13T04:36:58-03:00.
- **Version, revision, or checksum evidence:** No named Figma version, version URL, or checksum-backed export was available. The canonical record therefore classifies this normal mutable URL as Time-bound.
- **Captured evidence:** Read-only programmatic page, section, frame, instance, main-component, and library inventory; one transient 1600×928 screenshot of the 13095×7594 page canvas was inspected. The short-lived screenshot URL was not retained as immutable evidence.
- **Access and reproduction instructions:** Use authenticated Figma read access with the canonical URL, file key, and page node `4:3`; re-run the page/section inventory and compare exact node IDs before downstream stages.
- **Dependencies:** Home, Sign Up, Interaction States, and the local component section contain no remote component dependencies. Four remote `Palette` instances are confined to the foundations color specimen. The file subscribes to Material 3 Design Kit, Simple Design System, and iOS 18 and iPadOS 18 community libraries, but no dependency from those libraries to an implementation screen was established in Stage 0.
- **Authority for this project:** Confirmed authority for visual hierarchy, supplied compositions, responsive examples, component appearance, content examples, and demonstrated hover/focus appearance. It is not authority for persistence, validation rules, accessibility semantics, intermediate-width behavior, security/privacy rules, or browser performance.
- **Known limitations:** The source is mutable and only time-bound; the connector exposes no named version history for this capture. Figma does not prove semantic HTML, keyboard/screen-reader behavior, actual browser rendering, behavior between supplied widths, IndexedDB rules, or complete error/success states.

## 4. Repository Source Evidence

### SRC-REPO-001 — Implementation repository input baseline

- **Repository:** `https://github.com/ferfalcon/officelite-coming-soon-site`.
- **Relevant application, package, or directory:** `frontend/` Astro application; root `README.md`; `docs/starter-code/` reference markup and supplied assets; repository workflow instructions.
- **Branch at capture:** `main`, tracking `origin/main`.
- **Captured at:** 2026-08-13T04:35:23-03:00.
- **Lockfile, submodule, or workspace state:** `frontend/pnpm-lock.yaml` is present; no Git submodules are registered; `frontend/package.json` declares Astro `^7.1.6` and Node `>=22.12.0`.
- **Uncommitted changes or patch:** None at baseline capture. The later untracked `.workflow/` directory and Stage 0 Markdown artifacts are expected workflow output; no frontend implementation file changed.
- **Access and reproduction instructions:** From the Linux checkout, compare `git rev-parse HEAD` with the immutable commit in the canonical source registry, inspect `git status --short`, and use Node 24 with pnpm 11 as defined by repository instructions.
- **Build or inspection context:** Existing `frontend/` content is the Astro Basics starter with one `index.astro` route and no implemented Officelite behavior. No frontend build was required or claimed during Stage 0.
- **Known limitations:** The commit proves current code, documentation, assets, dependencies, and tooling only. Current starter behavior is not authority for the requested target behavior.

Commit, parent, role, task, and current status belong in the workflow record in CLI-managed mode.

## 5. Runtime Source Evidence

No runtime snapshot is active. The README-linked live site is not needed to establish the requested Figma and repository input baseline and is excluded from Stage 0 authority.

## 6. Documentation Source Evidence

### SRC-DOC-001 — Root project brief

- **Authority:** Normative project behavior and current-release scope, subordinate only to explicit current user decisions.
- **Path or URL:** Root `README.md`; immutable GitHub permalink recorded in the canonical source registry.
- **Included sections:** “Overview / The job” user capabilities, placeholder/future-API boundary, and “Built with” implementation expectations.
- **Revision, version, date, commit, or checksum evidence:** Pinned to repository commit `7119e9b8c7e5b483b8aeb8c1330e507c42bac11f`; SHA-256 `72bee1d93b40d80643935b254499a9d3c0f3fd280392ad94eb4f4c6cf57fb1af` matched both the commit path and working copy.
- **Captured at:** 2026-08-13T04:36:58-03:00.
- **Access and reproduction instructions:** Read `README.md` from the pinned commit, not from an unpinned branch URL, and compare its SHA-256 before relying on it.
- **Known limitations:** Marketing copy, pricing, plan features, and launch date are explicitly placeholders. The document does not specify a real launch target, formal WCAG conformance level, browser matrix, performance threshold, data-retention policy, or deployment requirement.

## 7. Asset Source Evidence

The supplied SVG, PNG, and starter-reference files under `docs/starter-code/` remain immutably covered by `SRC-REPO-001`. Stage 7 registered one additional material source to resolve the approved typography requirement without a runtime third-party request.

### SRC-ASSET-001 — Kumbh Sans self-hosting input

- **Source type and purpose:** Official Google Fonts repository subtree supplying the Kumbh Sans variable font bytes, metadata, and redistribution license for later repository-local hosting.
- **Immutable reference:** `google/fonts` commit `73fc2ff52147e34a74804b500cf89ca219eac55d`, path `ofl/kumbhsans`.
- **Included files:** `KumbhSans[YOPQ,wght].ttf` Git blob `df9fce2d04d53f54686933581c76e94222274609`; `OFL.txt` Git blob `678f3f2ae0626d9750bea8b5df1c52dfc28b8999`; `METADATA.pb` Git blob `6f2ad27358e64d77c9d7c5785f38c8525b0aa750`.
- **Observed metadata:** Family Kumbh Sans, normal variable face with weight axis 100–900 and YOPQ axis 40–300; the project needs only its approved Regular/Bold roles.
- **License:** SIL Open Font License 1.1. The font and license must be vendored together; the current release must not request Google Fonts or another font CDN at runtime.
- **Access and reproduction:** Read the immutable GitHub tree/API/raw files at the recorded commit and compare the exact Git blob IDs before vendoring.
- **Authority and limitation:** Authority only for font bytes, metadata, provenance, and license. It does not change Figma typography roles, project behavior, or approved scope. The registered file is TTF rather than WOFF2; no numeric performance threshold or browser matrix is claimed.

## 8. Source Verification Log

| Date and time | Snapshot | Verification method | Result classification | Change detected | Action |
|---|---|---|---|---|---|
| 2026-08-13T04:37:37-03:00 | `SRC-DS-001` | Figma file-key, page-node, section, frame, component-dependency, library, and screenshot inspection | Unchanged | No material difference within captured scope | Recorded `VER-001`; preserve Time-bound limitation and reverify before Stage 1 |
| 2026-08-13T04:37:37-03:00 | `SRC-REPO-001` | Git HEAD, branch, origin, submodule, worktree, and frontend configuration inspection | Unchanged | Only expected Stage 0 workflow files after initialization | Recorded `VER-002`; keep implementation baseline at the pinned commit |
| 2026-08-13T04:37:37-03:00 | `SRC-DOC-001` | Pinned commit-path and SHA-256 comparison | Unchanged | No | Recorded `VER-003`; use the immutable permalink |
| 2026-08-13 | `SRC-DS-001` | Authenticated Figma page, scoped-frame, screenshot, component, variant, variable, style, dependency, and prototype inspection | Unchanged | No material scoped difference; source remains Time-bound | Recorded `VER-004` for Stage 1 |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, scoped worktree, frontend path, and asset inspection | Unchanged | Only expected workflow artifacts | Recorded `VER-005` for Stage 1 |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and SHA-256 comparison | Unchanged | No | Recorded `VER-006` for Stage 1 |
| 2026-08-13 | `SRC-DS-001` | Authenticated read-only Figma Plugin API inspection of the five sections, six responsive frames, four state frames, components, styles, and variables | Unchanged | No material scoped difference; source remains Time-bound | Recorded `VER-007` before downstream design/specification reliance |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, scoped worktree, and submodule inspection | Unchanged | Only expected workflow artifacts | Recorded `VER-008` |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and SHA-256 comparison | Unchanged | No | Recorded `VER-009` |
| 2026-08-13 | `SRC-DS-001` | Authenticated read-only Figma metadata inspection of the page, five sections, six responsive frames, and four interaction-state frames | Unchanged | Recorded names, IDs, and dimensions matched; source remains Time-bound | Recorded `VER-010` before Stage 5 closure |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, scoped worktree, and submodule inspection | Unchanged | Only expected workflow documentation outputs; no implementation file changed | Recorded `VER-011` before Stage 5 closure |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and working-copy SHA-256 comparison | Unchanged | No | Recorded `VER-012` before Stage 5 closure |
| 2026-08-13 | `SRC-DS-001` | Authenticated read-only metadata inspection of page `4:3` and every exact scoped section/responsive/state frame ID | Unchanged | IDs, names, and dimensions matched; source remains Time-bound | Recorded `VER-013` before Stage 6 closure |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, origin, submodule, worktree, and frontend-scope inspection | Unchanged | No frontend change; only expected workflow documentation outputs | Recorded `VER-014` before Stage 6 closure |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and working-copy SHA-256 comparison | Unchanged | No | Recorded `VER-015` before Stage 6 closure |
| 2026-08-13 | `SRC-ASSET-001` | Official Google Fonts immutable commit, directory/API, metadata, font-blob, and OFL-blob inspection | Unchanged | No; exact commit/path/blob identities matched | Recorded `VER-016` before Stage 7 plan approval |
| 2026-08-13 | `SRC-DS-001` | Fresh authenticated metadata inspection of every exact scoped section/responsive/state ID | Unchanged | Names, IDs, and dimensions matched; source remains Time-bound | Recorded `VER-017` before Stage 7 closure |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, worktree, and frontend-scope inspection | Unchanged | No tracked or untracked frontend change; workflow narratives only | Recorded `VER-018` before Stage 7 closure |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and working-copy SHA-256 comparison | Unchanged | No | Recorded `VER-019` before Stage 7 closure |
| 2026-08-13 | `SRC-ASSET-001` | Immutable commit-directory API and exact font/OFL/metadata blob inspection | Unchanged | No | Recorded `VER-020` before Stage 7 closure |
| 2026-08-13 | `SRC-DS-001` | Authenticated read-only metadata inspection of all exact scoped section/responsive/state IDs | Unchanged | IDs, names, and dimensions matched; source remains Time-bound | Recorded `VER-021` before Stage 8 closure |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, tracked diff, and untracked frontend inspection | Unchanged | No frontend change | Recorded `VER-022` before Stage 8 closure |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and working-copy SHA-256 comparison | Unchanged | No | Recorded `VER-023` before Stage 8 closure |
| 2026-08-13 | `SRC-ASSET-001` | Immutable Google Fonts directory and exact font/OFL/metadata blob inspection | Unchanged | No | Recorded `VER-024` before Stage 8 closure |
| 2026-08-13 | `SRC-DS-001` | Authenticated read-only metadata inspection of exact page, sections, responsive frames, and interaction-state frames | Unchanged | IDs, names, and dimensions matched; source remains Time-bound | Recorded `VER-025` before Stage 9 decomposition |
| 2026-08-13 | `SRC-REPO-001` | Git HEAD, branch, tracked frontend diff, and untracked frontend inspection | Unchanged | No frontend change; workflow narratives only | Recorded `VER-026` before Stage 9 decomposition |
| 2026-08-13 | `SRC-DOC-001` | Pinned commit-path and working-copy SHA-256 comparison | Unchanged | No | Recorded `VER-027` before Stage 9 decomposition |
| 2026-08-13 | `SRC-ASSET-001` | Immutable Google Fonts tree and exact font/OFL/metadata blob inspection | Unchanged | No | Recorded `VER-028` before Stage 9 decomposition |

Record checks before stages, after meaningful pauses, before tasks, and before final acceptance. Current snapshot status remains in the workflow record in CLI-managed mode.

## 9. Upstream Rebaseline and Impact Assessments

| New snapshot | Previous snapshot | Change summary | Affected artifacts | Earliest affected stage | Required action | Status |
|---|---|---|---|---:|---|---|
| None | None | No upstream change detected during Stage 0 | None | N/A | Reverify active inputs before Stage 1 | Complete |
| `SRC-ASSET-001` | None | New immutable Kumbh Sans font and OFL source registered to resolve the previously open self-hosting precondition; no existing snapshot changed. | `PLAN.md` and downstream task/implementation-review artifacts | 7 | Add to `ART-PLAN` baseline; vendor only the pinned font and license during implementation; keep architecture decisions unchanged. | Complete |

Use this table for changed upstream inputs or unexpected concurrent changes, not for approved task output commits.

## 10. Baseline Review

### Pass 1 — Completeness and correctness

- [x] Every material source has a snapshot ID and evidence section.
- [x] Exact scope and capture time are recorded.
- [x] Repository snapshots use commit SHAs in the canonical registry.
- [x] Task-output lineage is not applicable before implementation.
- [x] The mutable Figma source is not mislabeled as immutable.
- [x] Access and reproduction limitations are explicit.

Findings corrected in pass 1:

- Replaced the remaining generic repository snapshot reference with the exact active ID.
- Corrected the source-authority table so the explicit current user direction is not mislabeled as a snapshot.
- Narrowed the architecture statement to the absent Officelite feature/persistence architecture rather than implying that the Astro scaffold has no structure.
- Removed a template-shaped “no deviation” row and replaced a premature validation claim with an explicit pending status.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Generated source state is current in CLI-managed mode (`sync --check` passed after pass 2 corrections).
- [x] Identifiers follow `Identifier-Conventions.md`.
- [x] Expected Stage 0 outputs are distinguished from upstream source changes.
- [x] No unexpected upstream change requires a rebaseline impact assessment.
- [x] Evidence sections do not redefine record-owned status or lineage.
- [x] No artifact silently relies on undefined or newer source content.

Findings corrected in pass 2:

- Aligned the narrative verification timestamps with the canonical CLI `checkedAt` events rather than the earlier source-inspection timestamp.
- Added an explicit conflict assessment distinguishing the Astro starter's current state from target truth and the then-unresolved placeholder launch date from a resolved source conflict. The later product-owner decision is recorded in approved downstream artifacts without changing the source snapshot.

No cross-artifact baseline mismatch, source-authority contradiction, undefined snapshot reference, hidden profile-upgrade trigger, or unrecorded upstream change remained after correction.
