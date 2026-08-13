# Repository Guidelines

## Verified WSL Development Environment

Develop from the Linux checkout under `/home/fer/`; never invoke Windows Node shims under `/mnt/c`. The verified stack (2026-08-13) is Ubuntu 24.04.4 on WSL2, Bash 5.2, NVM 0.40.4, Node 24.18.0 (default `24`), npm 11.16.0, Corepack 0.35.0, and pnpm 11.9.0. Packages require Node 22.12+.

Non-interactive shells skip NVM and inherit Windows temporary paths. Initialize them with:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24
export TMPDIR=/tmp TMP=/tmp TEMP=/tmp
export npm_config_cache=/tmp/officelite-npm-cache
```

Sandboxed installs may need approval for the Linux pnpm store; never redirect caches to `/mnt/c`. Docker Engine 29.6.1, Compose 5.3.0, and DDEV 1.25.2 work through WSL2 Docker CE. This repository has no `.ddev/`, Dockerfile, or Compose file, so do not use DDEV. Available tools include Git 2.43, GitHub CLI 2.45, Python 3.12, curl, wget, and Windows VS Code integration. `make`, GCC, pip, jq, Yarn, Bun, and Deno are absent.

## Project Structure & Module Organization

`frontend/` is the Astro site: routes are in `src/pages/`, UI in `src/components/`, shells in `src/layouts/`, imports in `src/assets/`, and static files in `public/`. `docs/starter-code/` is the reference baseline. `docs/implementation-workflow/` is a separate Node toolkit; follow its nested guides.

## Build, Test, and Development Commands

There is no root package script.

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm dev                         # foreground localhost:4321 server
pnpm astro dev --background      # agent sessions
pnpm build                       # build dist/
pnpm preview                     # preview dist/
```

```bash
cd docs/implementation-workflow
npm run validate                 # all checks
npm run test:cli                 # focused CLI scenarios
```

## Coding Style & Naming Conventions

No repository-wide formatter or linter exists; match adjacent files. Astro uses tabs; toolkit `.mjs` uses two spaces, ESM, single quotes, and semicolons. Use semantic HTML, mobile-first CSS, and custom properties. Name components `PascalCase`, routes lowercase, and identifiers `camelCase`. Preserve accessibility and visible focus.

## Testing Guidelines

The frontend has no automated framework or coverage threshold. Run `pnpm build`, then verify affected responsive layouts, keyboard paths, validation, announcements, and IndexedDB behavior. Toolkit tests are `scripts/test-*.mjs` files with `tests/fixtures/`; add passing and rejected cases for validation changes.

## Commit & Pull Request Guidelines

Follow the dominant `feat:`, `docs:`, and `chore:` history with short, imperative subjects and focused commits. Pull requests must explain what and why, link issues, list validation, and note migration effects. Include compact, medium, and large screenshots for visual changes. Never commit secrets, real sign-up data, `dist/`, or dependencies.
