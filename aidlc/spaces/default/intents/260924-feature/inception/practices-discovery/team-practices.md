# Team Practices — shoes-store (Discovered)

## Way of Working

We use **trunk-based development** with short-lived feature branches (typically 1-2 days). All work merges to `main` via squash-merge. Long-lived branches are avoided.

**Evidence:** Git history shows linear `main` with squash merges from feature branches. No release branches exist.

**Branching Strategy:**
- Feature branches from `main`
- PRs reviewed and squash-merged
- Branch deleted after merge
- No long-lived release branches

**Integration:** CI runs on every PR (lint, type-check, tests). Merge requires CI pass.

## Walking Skeleton

**Stance: Scope-dependent** — We run a walking skeleton Bolt first only when the active scope declares `skeleton: on`. For this feature scope, no skeleton ceremony is required as the deployment pipeline and infrastructure are already mature.

**Evidence:** Vercel deployment pipeline is already configured and working. No bootstrap needed for this feature.

## Testing Posture

**Methodology:** test-after
**Ordering:** Implement each applicable testable layer, then write and run that layer's tests.

**Coverage Floor:** 80% line coverage for feature scope (mvp, enterprise, feature, infra, classic all require this)

**Test Types:**
- Unit tests for business logic (lib/, services)
- Integration tests for API routes
- Component tests for React components
- E2E tests for critical user flows (checkout, cart)

**Tooling:**
- Jest (configured in package.json)
- @testing-library/react
- @testing-library/jest-dom

**CI Execution:** Tests run in CI before merge; failure blocks PR.

## Deployment

**Strategy:** Deploy on merge to staging environments via Vercel. Production deploys gate on separate manual approval (tech lead + product owner sign-off).

**Evidence:** Vercel auto-deploys `main` to preview/staging. Production deployment requires manual promotion in Vercel dashboard.

**Environments:**
- Preview: Every PR gets a unique Vercel preview URL
- Staging: `main` branch auto-deploys
- Production: Manual promotion from staging

**Rollback:** Vercel instant rollback to previous deployment.

## Code Style

**Formatter:** Prettier (via ESLint integration)
**Linter:** ESLint with `eslint-config-next`
**Type Checking:** TypeScript strict mode (`tsc --noEmit`)

**Naming Conventions:**
- Components: PascalCase (`ProductCard.tsx`)
- Functions/Variables: camelCase (`getProducts`, `productSlug`)
- Types/Interfaces: PascalCase (`Product`, `Variant`)
- Files: kebab-case for pages (`page.tsx`), PascalCase for components

**CSS:** Tailwind CSS with custom theme colors via CSS variables (`--ink`, `--chalk`, `--rose`, `--rose-soft`)

**Code Organization:**
- Server Components by default (async `page.tsx`)
- API routes in `app/api/*/route.ts`
- Components colocated with routes or in `app/components/`
- Types defined inline in component files
- Zod schemas in `lib/validation.ts`