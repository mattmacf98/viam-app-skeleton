## Viam App Skeleton

This repository is a starter template to help you quickly develop and deploy a SvelteKit-based Viam module. It comes pre-configured with:

- SvelteKit
- Linting (`eslint`)
- Code formatting (`prettier`)
- TypeScript type checks (`tsc`)
- Testing setup
- Helpful auto-deploy and rollback GitHub Actions workflows for easy CI/CD

You can fork or clone this skeleton and adapt it to your own Viam app module projects, getting robust CI and tooling out of the box.

## Setup Instructions

1. **Remove Changesets CLI**  
   Uninstall the Changesets CLI, then create your own `pnpm changeset init` workflow.

2. **Update GitHub Workflow Permissions and Add Viam Secrets**
   - Grant the proper permissions for pull requests in your GitHub workflows.
   - Add the necessary Viam secrets as described in the [Viam Build Action Auth Instructions](https://github.com/viamrobotics/build-action?tab=readme-ov-file#auth-instructions).

3. **Update Metadata and Versions**
   - Set your unique Viam App ID in `meta.json` and update the Go module and `Makefile` accordingly.
   - Reset the version in `package.json` back to `0.0.1`.
