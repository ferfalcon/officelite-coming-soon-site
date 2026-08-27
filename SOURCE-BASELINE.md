---
artifact: SOURCE-BASELINE
project: Officelite coming soon site
profile: Full
execution_mode: Gated
created: 2026-08-27
updated: 2026-08-27
---

# Source Baseline

## 2. Document Information

- Project: Officelite coming soon site
- Created: 2026-08-27
- Last updated: 2026-08-27
- Owner: Project workflow
- Related context: `PROJECT-CONTEXT.md`
- Operational state: `WORKFLOW-STATE.md`

The canonical snapshot IDs, pin strengths, current status, and lineage are owned by `.workflow/workflow-record.json`. This document records the evidence and limitations behind those registry entries.

## 3. Design Source Evidence

### SRC-DS-001 — Officelite Figma workflow scope

- **Source type:** Figma design
- **File:** `officelite-coming-soon-site`
- **File key:** `L7MdLOW8usVUcPwV0cMQ1n`
- **Purpose:** Primary visual and interaction source for implementation.
- **Included scope:** Figma page/canvas `🤖 Workflow` (node `4:3`) and all implementation-relevant descendants. Observed descendants include `Design System — Components` (node `2141:935`), `Design System — Foundations` (node `2141:938`), and responsive product compositions including `Mobile — 375` (node `2141:1813`). The complete node inventory is deferred to the Stage 1 design audit.
- **Excluded scope:** Figma pages or nodes outside configured node `4:3`.
- **Captured or inspected at:** 2026-08-27T16:09:27-05:00
- **Version, revision, or checksum evidence:** No named Figma version or checksum-backed export is available in the configured source. The normal design URL is mutable, so the canonical record correctly classifies this snapshot as time-bound.
- **Captured evidence:** Figma connector metadata for node `4:3`, including nested sections, components, foundations, responsive frames, and node identifiers.
- **Access and reproduction instructions:** Inspect the configured Figma URL through the connected Figma source using file key `L7MdLOW8usVUcPwV0cMQ1n` and node `4:3`. Metadata inspection succeeds in the current environment. A design-context call currently requires an active Figma selection, so Stage 1 must not assume code-context extraction is available until that condition is satisfied.
- **Dependencies:** Local design-system foundations and reusable components are visibly present in the configured scope. External library dependencies have not yet been established and must be audited in Stage 1.
- **Authority for this project:** Authoritative for supplied composition, visual hierarchy, observed component states, design tokens, and demonstrated responsive examples. It does not independently prove business rules, semantic HTML, keyboard/screen-reader behavior, backend behavior, security policy, or runtime performance.
- **Known limitations:** Mutable source; no named version; full prototype path, external-library dependency, and accessibility evidence have not yet been exhaustively audited.

## 4. Repository Source Evidence

### SRC-REPO-001 — Implementation repository baseline

- **Repository:** https://github.com/ferfalcon/officelite-coming-soon-site
- **Relevant application, package, or directory:** `frontend/`
- **Branch at capture:** `main`
- **Pinned commit:** `602d0e987bacea61f81f4d8f159510e220e97af4` (canonical registry owner)
- **Captured at:** 2026-08-27T21:02:23Z
- **Lockfile, submodule, or workspace state:** `frontend/pnpm-lock.yaml` and `frontend/pnpm-workspace.yaml` are present. No submodule requirement was observed.
- **Uncommitted changes or patch:** Not applicable to the remote GitHub snapshot; the baseline is an immutable commit.
- **Access and reproduction instructions:** Inspect repository content at commit `602d0e987bacea61f81f4d8f159510e220e97af4`. Scope implementation work to `frontend/` unless repo-wide workflow/integration changes are required.
- **Build or inspection context:** `frontend/package.json` declares Astro `^7.1.6`, ESM, Node `>=22.12.0`, and standard Astro dev/build/preview scripts. The baseline implementation is still the Astro starter: `frontend/src/pages/index.astro` renders `Welcome.astro`.
- **Repository instructions:** `frontend/AGENTS.md` applies to the implementation root and requires background mode for the Astro dev server when it is run.
- **Product evidence inside the repository:** Root `README.md` describes the intended Home and Sign Up flows, plan preservation/defaulting, native plan selection, required sign-up fields, validation, IndexedDB persistence, success/failure announcements, countdown behavior, keyboard operability, placeholder launch/pricing content, and the future API exclusion.
- **Known limitations:** The repository baseline predates the workflow initialization commit. Current `main` contains workflow-control files added after the baseline, but those files do not change the implementation-root source captured at `SRC-REPO-001`. No build, browser, or deployed-runtime verification is claimed at Stage 0.

## 5. Runtime Source Evidence

No runtime snapshot is registered as an active Stage 0 input. Project configuration identifies a Vercel production deployment, but runtime evidence will be captured only when the workflow requires it.

## 6. Documentation Source Evidence

No separate `SRC-DOC-*` snapshot is registered. Repository documentation such as `README.md` and `frontend/AGENTS.md` is evaluated as content of immutable repository snapshot `SRC-REPO-001`.

## 7. Asset Source Evidence

No separate `SRC-ASSET-*` snapshot is registered. Assets inside the implementation repository are part of `SRC-REPO-001`; design assets visible in Figma remain part of `SRC-DS-001` until Stage 1 identifies material export dependencies.

## 8. Source Verification Log

| Date and time | Snapshot | Verification method | Result classification | Change detected | Action |
|---|---|---|---|---|---|
| 2026-08-27T16:09:27-05:00 | `SRC-DS-001` | Figma file-key, configured-node, and metadata inspection | Pending canonical CLI verification | Unknown | Run `snapshot verify` before Stage 0 closure |
| 2026-08-27T16:09:27-05:00 | `SRC-REPO-001` | GitHub immutable commit and scoped file inspection | Pending canonical CLI verification | No implementation change observed | Run `snapshot verify` before Stage 0 closure |

## 9. Upstream Rebaseline and Impact Assessments

No upstream rebaseline has been required. Any later unexpected Figma or repository change must create a new snapshot and be assessed against the earliest affected stage rather than silently replacing these inputs.

## 10. Baseline Review

### Pass 1 — Completeness and correctness

- [x] Every active material source has a snapshot ID and evidence section.
- [x] Exact configured design scope and inspection time are recorded.
- [x] The repository snapshot uses an immutable commit SHA in the canonical registry.
- [x] Mutable Figma source is not mislabeled as immutable.
- [x] Access, reproduction instructions, and current limitations are explicit.
- [x] Existing repository instructions and implementation-root boundaries are recorded.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Narrative evidence matches the initialized canonical snapshot IDs.
- [x] Design evidence is not used to invent backend, semantic, accessibility-compliance, or runtime requirements.
- [x] The post-initialization workflow commit is distinguished from the pre-initialization implementation baseline.
- [x] Expected future implementation outputs are distinguished from upstream changes.
- [x] External-library, prototype, runtime, and browser-support uncertainty remains visible.
- [x] No artifact silently relies on a newer implementation snapshot.
