# Production verification

Recorded for workflow task `P04-T03` on 2026-08-28.

## Deployment and build evidence

- Vercel project: `prj_OMY7sPOGx5D2RN6EgjxFVDmCql6R` (`officelite-coming-soon-site`)
- Team: `fer-falcons-team`
- Verified production deployment: `dpl_GXZ8h4W2kxa7LjNbvEqnSMmg5bDj`
- Deployment state: `READY`
- Configured production alias: `officelite-coming-soon-site-ferfalcon.vercel.app`
- Vercel project Node version: `24.x`
- Package manager detected by build: `pnpm 10.28.0`
- Build working directory: `/vercel/path0/frontend`
- Build command: `pnpm run build` → `astro build`
- Astro build mode/output: `static`
- Output directory: `/vercel/path0/frontend/dist/`
- Generated routes: `/index.html`, `/sign-up/index.html`
- Production route checks: `/` → HTTP 200, `/sign-up/` → HTTP 200
- `frontend/astro.config.mjs` has no server adapter.
- Vercel runtime-log grouping returned no server/edge runtime entries for the verified static deployment.

## Data-boundary evidence

The deployed Sign Up JavaScript was fetched from production and inspected.

It:

- initializes the selected plan from the local `?plan=` query parameter;
- prevents normal form submission;
- validates required fields and email format client-side;
- persists valid records only to browser IndexedDB database `officelite-signups`;
- exposes local success/failure status copy;
- contains no `fetch`, XHR, API submission, or other remote sign-up persistence path.

## Browser-regression correlation

Final implementation output `3729e65a1ef8c07e474f644e446e910a07170049` passed GitHub Actions Frontend Validation run #33:

- `pnpm check`
- `pnpm build`
- all 56 Playwright tests

The browser suite covers plan context, validation before storage, IndexedDB persistence and network safety, keyboard/focus behavior, countdown behavior, responsive conditions, and accessibility regressions.

Repository lineage inspection confirms no runtime frontend source changes were introduced after that validated output before this verification task.

## Verification limitation

A direct Chromium session from the current ChatGPT execution container cannot navigate to `vercel.app`; Chromium returns `ERR_BLOCKED_BY_ADMINISTRATOR` before page load.

This is an execution-environment transport limitation, not a production failure. Production route/artifact checks were performed through authenticated Vercel access, and interactive behavior is corroborated by the exact-final-implementation Playwright suite. Stage 11 should repeat a literal production-origin interactive smoke when a browser execution surface that permits `vercel.app` navigation is available.
