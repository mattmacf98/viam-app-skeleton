## Viam App Skeleton

This repository is a starter template to help you quickly develop and deploy a SvelteKit-based Viam module. It comes pre-configured with:

- SvelteKit
- Linting (`eslint`)
- Code formatting (`prettier`)
- TypeScript type checks (`tsc`)
- Testing setup
- Robust CI/CD with auto-deploy and rollback GitHub Actions workflows
- Versioning management via [Changesets](https://github.com/changesets/changesets)

You can fork or clone this skeleton and adapt it to your own Viam app module projects, getting robust CI and tooling out of the box.

## Versioning & Changesets

This skeleton uses [Changesets](https://github.com/changesets/changesets) to manage versioning and package publishing. To manage changes and control semantic version bumps for your package, use the Changesets CLI:

- **Patch, Minor, and Major Bumps:**  
  Run `npx @changesets/cli` (`npx changeset`) locally, and follow the prompts to select affected packages and the type of version bump (patch, minor, or major).

This approach lets you keep clear, incremental release notes and ensures version bumps are managed consistently with each update.

## Continuous Integration & Deployment

### Pull Request Workflow

When you open a PR with code or configuration updates:

- The GitHub Actions workflow will run type-checks, linting, (and eventually tests TODO).
- When the PR is merged, the specified package changes (via Changesets) are compiled and reconciled to figure out what the package.json should bump to.
- A Version Package update is then cut as a new release PR by a github bot. When this PR is merged, a new Git tag matching the `package.json` version is automatically created, triggering deployment of your module.

### Rollback Workflow

If you need to roll back a deployed bug, you do not need to revert any git commits. Instead, use the provided "Rollback" GitHub Actions workflow:

- You can enter any safe previous tag (e.g. `1.4.2`) as input.
- The workflow creates a new tag at that commit, named as the latest version plus an incremented patch (e.g. if the latest is `1.5.2`, it will create `1.5.3`).
- The module is redeployed at this previous state (commit), as referenced by the new rollback tag.

This allows you to safely roll back deployments without altering your git history, making hotfixes and reversions straightforward.

## Setup Instructions

1. **Remove Skeleton Changesets Directory**  
   Remove the `.changset` directory and create your own with `pnpm changeset init`.

2. **Update GitHub Workflow Permissions and Add Viam Secrets**
   - Grant the proper permissions for pull requests in your GitHub workflows (they need `Read and write permissions` and `Allow GitHub Actions to create and approve pull requests`).
   - Add the necessary Viam secrets as described in the [Viam Build Action Auth Instructions](https://github.com/viamrobotics/build-action?tab=readme-ov-file#auth-instructions).

3. **Update Metadata and Versions**
   - Set your unique Viam App ID in `meta.json` and update the `golang` files and `Makefile` accordingly.
   - Reset the version in `package.json` back to `0.0.1`.

# TODO

- **Rollback Tag Sync Issue:**  
  When using the rollback workflow, the new rollback tag (e.g. `1.5.3`) created in git will not match what's in `package.json`, since only the tag and deployment are updated, not the repo files. This requires a manual edit to bump `package.json` (and `CHANGELOG.md`) to match the deployed version, or else future tags may conflict or versioning becomes confusing.  
  _TODO: Consider writing a script or Github Action to automatically sync `package.json` to the latest deployed tag after a rollback! Open to cleaner solutions._

- **No Automated Test Running (Yet):**  
  CI workflows currently do not run unit or end-to-end tests—only linting and type-checks are performed.  
  _TODO: Set up gh action to properly run with playwright_

---

**Suggestions Welcome!**  
If you have ideas to improve the skeleton please feel free to open an issue and request
