# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a SvelteKit-based Viam module skeleton for building deployable web
applications. The project uses:

- **SvelteKit 2** with the static adapter (outputs to `dist/`)
- **Svelte 5** with runes (`$state`, `$derived`, etc.)
- **Tailwind CSS 4** via Vite plugin
- **TypeScript** throughout
- **pnpm** as the package manager (v10.14.0)
- **Vitest** for unit tests with browser mode (Playwright)
- **Playwright** for e2e tests

## Common Development Commands

```bash
# Development
pnpm run dev              # Start dev server
pnpm run build            # Build static site to dist/
pnpm run preview          # Preview production build

# Code Quality
pnpm run check            # Type check (svelte-check + tsc)
pnpm run lint             # Run ESLint and Prettier checks
pnpm run format           # Format code with Prettier

# Testing
pnpm run test:unit        # Run unit tests (Vitest)
pnpm run test:e2e         # Run e2e tests (Playwright)
pnpm run test             # Run all tests

# Build for Viam deployment
make module               # Creates module.tar.gz with dist/ and meta.json
make module-beta          # Deploy to beta environment (requires meta-beta.json update)
```

## Architecture

### SvelteKit Structure

The app uses SvelteKit's file-based routing:

- `src/routes/+page.svelte` - Main page
- `src/routes/+layout.svelte` - Root layout
- `src/routes/+layout.ts` - Layout load function (disables SSR via
  `export const ssr = false`)
- `src/lib/` - Reusable components and utilities

### State Management with Svelte 5 Context

The codebase uses Svelte 5's context API with runes for state management:

- Context is created using `setContext()` with a Symbol key
- State is managed using `$state()` runes
- Contexts are retrieved with `getContext()`

Example pattern (see `src/lib/context/counter.svelte.ts`):

```typescript
const KEY = Symbol('context-name');

export function createContext(initial) {
	let state = $state(initial);

	const ctx = {
		get state() {
			return state;
		},
		method: () => {
			/* ... */
		}
	};

	setContext(KEY, ctx);
	return ctx;
}

export function getContext() {
	return getContext<ContextType>(KEY);
}
```

### Component Library

Components live in `src/lib/components/` and are exported via
`src/lib/index.ts`. The library includes reusable UI components like `Button`
and `Counter`.

### Testing Setup

- **Unit tests**: Files matching `src/**/*.{test,spec}.{js,ts}` run in Node
  environment
- **Component tests**: Files matching `src/**/*.svelte.{test,spec}.{js,ts}` run
  in browser with Playwright
- Tests require assertions (`expect.requireAssertions: true` in vitest config)

### Static Site Generation

The project uses `@sveltejs/adapter-static` to build a fully static site:

- Output directory: `dist/`
- No server-side rendering (SSR disabled in `+layout.ts`)
- Suitable for deployment as a Viam application module

## Viam Deployment

This skeleton is designed to be deployed as a Viam application module:

### Module Configuration (`meta.json`)

- `module_id`: Your Viam namespace and module name
- `build.build`: Points to `make module`
- `build.path`: Points to `module.tar.gz`
- `applications[].entrypoint`: Points to `dist/index.html`

### Deployment Flow

1. Merge PR to `master` branch
2. CI runs type checks, linting, and builds
3. Changesets creates a Version Package PR if changesets exist
4. When Version Package PR is merged:
   - Git tag is created from `package.json` version
   - Viam Build Action deploys the module using the tag

### Beta Deployment

Update `meta-beta.json` with your own `module_id`, then run `make module-beta`
to deploy to a beta environment for testing.

## Version Management with Changesets

Use Changesets to manage semantic versioning:

```bash
npx @changesets/cli              # Create a new changeset
```

Follow the prompts to:

1. Select the type of change (patch/minor/major)
2. Write a description of the change

The CI workflow will automatically create a "Version Package" PR that bumps the
version and updates the changelog. Merging this PR triggers deployment.

## CI/CD Workflows

### Pull Request Workflow (`.github/workflows/pull-request.yml`)

Runs on PRs to `master`:

- Type checking (`pnpm run check`)
- Linting (`pnpm run lint`)
- Build verification

Note: Tests are not yet run in CI (TODO).

### Main Workflow (`.github/workflows/main.yml`)

Runs on pushes to `master`:

1. Builds the project
2. Creates git tags when `package.json` version changes
3. Deploys to Viam using `viamrobotics/build-action@v1`
4. Creates Version Package PR using `changesets/action@v1`

### Rollback Workflow (`.github/workflows/rollback.yml`)

Manual workflow for rolling back to a previous version:

- Input a previous tag (e.g., `1.4.2`)
- Creates a new incremental tag at the old commit (e.g., `1.5.3` pointing to
  `1.4.2`'s commit)
- Redeploys without reverting git history

## Important Notes

- The project uses Svelte 5's new runes syntax (`$state`, `$derived`, etc.)
  instead of legacy stores
- Tailwind CSS 4 is configured via Vite plugin, not `tailwind.config.js`
- SSR is disabled - this is a pure static site
- The package manager is `pnpm`, not `npm` or `yarn`
