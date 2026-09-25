# Project-Level Rules

> Project-specific specialisation and corrections. Loaded after `org.md` and
> `team.md` as strict-additive guidance; contradictions with broader policy
> are rejected. Populated by practices-discovery and the self-learning loop.
>
> Use sparingly: most teams don't need a project layer. Reach for it
> only when this specific project needs stable, durable guidance beyond the
> team practice (for example, package-specific release checks or an additional
> regression suite for a legacy component).

## Way of Working

<!-- Project-specific specialisation. Example: -->
<!-- This monorepo requires package-scoped branch names and a package owner -->
<!-- review in addition to the team's normal merge policy. -->

## Walking Skeleton

<!-- Project-specific specialisation. Example: -->
<!-- The walking skeleton must exercise the legacy service adapter as well -->
<!-- as the new service boundary. -->

## Testing Posture

<!-- Project-specific specialisation. -->

## Change Control

<!-- Project-specific. Mode: strict or relaxed. Strict here holds for every intent and cannot be changed from chat. -->

## Deployment

<!-- Project-specific specialisation. -->

## Code Style

<!-- Project-specific specialisation. -->

## Tech Stack

<!-- Technology choices locked for this project. -->

## Decided

<!-- Decisions made in earlier stages that should not be re-asked. -->
<!-- Format: DECIDED: [decision] (Stage [slug], [date]) -->

## Scope Overrides

<!-- Custom scope rules for this project. -->

## Forbidden

<!-- Populated by practices-discovery affirmation gate. -->
<!-- Format: NEVER [behavior] (affirmed [date]) -->
<!-- Example: NEVER throw exceptions across service layer boundaries (affirmed 2026-05-17) -->

- **NEVER** create long-lived release branches; all work merges to `main` (affirmed 2026-09-25)

- **NEVER** merge without CI passing (lint, type-check, tests) (affirmed 2026-09-25)

- **NEVER** deploy to production without manual approval (affirmed 2026-09-25)

- **NEVER** use `any` type in TypeScript; use `unknown` or proper types (affirmed 2026-09-25)

- **NEVER** bypass ESLint/Prettier; zero errors/warnings required (affirmed 2026-09-25)

- **NEVER** use `<img>` directly; always use Next.js `<Image />` (affirmed 2026-09-25)

- **NEVER** hardcode API URLs; use environment variables (affirmed 2026-09-25)

- **NEVER** commit secrets or credentials; use Vercel environment variables (affirmed 2026-09-25)

- **NEVER** skip test coverage floor for feature scope (80% minimum) (affirmed 2026-09-25)

- **NEVER** use inline styles for layout; use Tailwind utilities (affirmed 2026-09-25)

## Mandated

<!-- Populated by practices-discovery affirmation gate. -->
<!-- Format: ALWAYS [behavior] (affirmed [date]) -->
<!-- Example: ALWAYS use Result<T,E> for fallible operations in service layer (affirmed 2026-05-17) -->

- **ALWAYS** use trunk-based development with short-lived feature branches (1-2 days max) merged via squash to `main` (affirmed 2026-09-25)

- **ALWAYS** run CI (lint, type-check, tests) on every PR; merge requires CI pass (affirmed 2026-09-25)

- **ALWAYS** deploy `main` to staging automatically via Vercel (affirmed 2026-09-25)

- **ALWAYS** require manual approval for production deployment (tech lead + product owner) (affirmed 2026-09-25)

- **ALWAYS** use TypeScript strict mode; `tsc --noEmit` must pass (affirmed 2026-09-25)

- **ALWAYS** use ESLint with `eslint-config-next`; zero errors required (affirmed 2026-09-25)

- **ALWAYS** format with Prettier (via ESLint integration) (affirmed 2026-09-25)

- **ALWAYS** use Server Components by default; Client Components only when interactivity needed (`use client`) (affirmed 2026-09-25)

- **ALWAYS** use Next.js Image optimization for all images (affirmed 2026-09-25)

- **ALWAYS** use Prisma for database access; raw SQL only with explicit approval (affirmed 2026-09-25)

- **ALWAYS** write tests for new features; 80% line coverage floor for feature scope (affirmed 2026-09-25)

- **ALWAYS** use Tailwind CSS for styling; CSS variables for theme tokens (affirmed 2026-09-25)

## Corrections

<!-- Project-specific corrections from human feedback. -->
<!-- Format: NEVER/ALWAYS [behavior] (learned [date]) -->
