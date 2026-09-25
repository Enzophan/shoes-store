# Discovered Rules — shoes-store

## Mandated

- **ALWAYS** use trunk-based development with short-lived feature branches (1-2 days max) merged via squash to `main`
- **ALWAYS** run CI (lint, type-check, tests) on every PR; merge requires CI pass
- **ALWAYS** deploy `main` to staging automatically via Vercel
- **ALWAYS** require manual approval for production deployment (tech lead + product owner)
- **ALWAYS** use TypeScript strict mode; `tsc --noEmit` must pass
- **ALWAYS** use ESLint with `eslint-config-next`; zero errors required
- **ALWAYS** format with Prettier (via ESLint integration)
- **ALWAYS** use Server Components by default; Client Components only when interactivity needed (`use client`)
- **ALWAYS** use Next.js Image optimization for all images
- **ALWAYS** use Prisma for database access; raw SQL only with explicit approval
- **ALWAYS** write tests for new features; 80% line coverage floor for feature scope
- **ALWAYS** use Tailwind CSS for styling; CSS variables for theme tokens

## Forbidden

- **NEVER** create long-lived release branches; all work merges to `main`
- **NEVER** merge without CI passing (lint, type-check, tests)
- **NEVER** deploy to production without manual approval
- **NEVER** use `any` type in TypeScript; use `unknown` or proper types
- **NEVER** bypass ESLint/Prettier; zero errors/warnings required
- **NEVER** use `<img>` directly; always use Next.js `<Image />`
- **NEVER** hardcode API URLs; use environment variables
- **NEVER** commit secrets or credentials; use Vercel environment variables
- **NEVER** skip test coverage floor for feature scope (80% minimum)
- **NEVER** use inline styles for layout; use Tailwind utilities