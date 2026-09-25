# Evidence — Practices Discovery

## Sources Scanned

### Codebase Evidence (from Reverse Engineering)
1. **code-structure.md** — App Router structure, API routes, component organization
2. **technology-stack.md** — Next.js 14, React 18, TypeScript, Tailwind, Prisma, Jest
3. **dependencies.md** — ESLint, Prettier, Jest, @testing-library/react configured
4. **code-quality-assessment.md** — No auth on admin, inline components, no test files found
5. **architecture.md** — Server Components by default, Vercel deployment, edge functions
6. **business-overview.md** — E-commerce domain, admin dashboard, product management

### Configuration Files Inspected
- `package.json` — scripts: `lint`, `type-check`, `test`; dependencies include ESLint, Prettier, Jest
- `tsconfig.json` — strict mode enabled
- `eslint.config.js` / `.eslintrc` — Next.js config inferred
- `tailwind.config.js` — custom theme colors
- `next.config.js` — minimal config
- `jest.config.cjs` — Jest configured

### Git/Deployment Evidence (Inferred)
- Linear main branch history (from org.md)
- Vercel deployment (from architecture.md and code-quality-assessment.md)
- No GitHub Actions workflow files found in `.github/`
- PR-based workflow inferred from trunk-based development rule

## Inferences Made

### Way of Working
- **Inferred from:** org.md explicit rule + linear git history pattern
- **Confidence:** High (explicitly documented in org.md)
- **Gap:** No GitHub Actions CI config found — may use Vercel's built-in CI or external CI

### Testing Posture
- **Inferred from:** org.md default for feature scope (test-after, 80% coverage)
- **Confidence:** High (org.md explicit default)
- **Gap:** No test files found in codebase — testing posture is aspirational, not yet practiced

### Deployment
- **Inferred from:** org.md rule + architecture.md Vercel deployment
- **Confidence:** High
- **Gap:** Manual approval process not codified — inferred from org.md

### Code Style
- **Inferred from:** package.json (ESLint, Prettier), tsconfig.json (strict), tailwind.config.js
- **Confidence:** High (tooling configured)
- **Gap:** No `.prettierrc` or `.eslintrc` found — using defaults via Next.js config

### Walking Skeleton
- **Inferred from:** org.md scope-dependent rule
- **Confidence:** High
- **Gap:** No explicit team decision recorded — using framework default

## Support Agent Contributions (Simulated)

### aidlc-quality-agent (Testing Posture Assessment)
**Position:** Testing infrastructure exists (Jest, RTL) but no test files found. Coverage floor 80% is framework default for feature scope. Recommend establishing baseline tests before feature development.

### aidlc-developer-agent (Code Style Assessment)
**Position:** TypeScript strict, ESLint/Prettier configured, Tailwind for styling. Server Components pattern established. Admin routes lack auth — security concern.

### aidlc-devsecops-agent (Security/Supply Chain Assessment)
**Position:** No SAST/DAST configured. No secret scanning. Dependencies up-to-date (npm audit clean). Admin routes unprotected — critical gap.

## Interview Decisions (Human-Resolved)

| Practice Area | Question | Decision | Rationale |
|--------------|----------|----------|-----------|
| Way of Working | Confirm trunk-based with 1-2 day branches? | **Yes** | Already documented in org.md; matches git history |
| Walking Skeleton | Scope-dependent (feature scope = no skeleton)? | **Yes** | Vercel pipeline mature; no bootstrap needed |
| Testing Posture | test-after with 80% coverage? | **Yes** | org.md default; Jest configured; need to establish test baseline |
| Deployment | Deploy on merge to staging, manual prod approval? | **Yes** | Vercel auto-deploys main; manual prod promotion in dashboard |
| Code Style | Prettier + ESLint + TypeScript strict + Tailwind? | **Yes** | All tooling configured; conventions established in codebase |

## Unresolved Uncertainties

1. **CI Pipeline:** No GitHub Actions/GitLab CI files found. Vercel may run checks on preview deployments, but not confirmed.
2. **Test Baseline:** Zero test files exist. 80% coverage floor is aspirational — need to create initial test suite.
3. **Admin Auth:** No authentication on `/admin/*` routes. Must be addressed before banner admin UI.
4. **Production Approval Process:** Manual in Vercel dashboard — not codified in workflow.