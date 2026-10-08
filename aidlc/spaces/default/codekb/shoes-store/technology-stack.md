# Technology Stack — Sole & Strand

## Language
- **TypeScript** — Primary language for all source code (`tsconfig.json`, `.ts`/`.tsx` files)
- **JavaScript** — Runtime; Next.js and React components accept both

## Frameworks & Libraries
- **Next.js 13+** — React framework with App Router (`next.config.js`, `app/` directory)
- **React** — UI library (`package.json` dependency)
- **Tailwind CSS** — Utility-first styling framework (`tailwind.config.js`)
- **Prisma ORM** — Database toolkit and client generator (`prisma/schema.prisma`, `@prisma/client`)
- **Zod** (implied) — Based on validation patterns, though not explicitly listed in deps

## Build & Tooling
- **npm** — Package manager (`package.json`, `package-lock.json`)
- **TypeScript Compiler** — `tsc` via `tsconfig.json`
- **Next.js Development Server** — `next dev` (`package.json` scripts)
- **Vercel** — Recommended deployment platform

## Key Dependencies (package.json)
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `latest` | React framework |
| `react` | `latest` | UI library |
| `react-dom` | `latest` | React DOM rendering |
| `@prisma/client` | `latest` | Database client |
| `prisma` | `latest` | ORM and migration tool |
| `tailwindcss` | `latest` | Styling |
| `postcss` | `latest` | CSS processing |
| `` | `latest` | — |

## Development Environment
- **Language**: TypeScript strict mode
- **Formatter**: Prettier (configured in repo)
- **Linter**: ESLint (configured in repo)
- **Database**: PostgreSQL (connection string via `DATABASE_URL` env var)
- **Deployment**: Vercel (auto-deploys on git push)

## Architecture Decision Rationale
- **Next.js App Router**: Chosen for modern React data fetching patterns (server components, streaming)
- **Prisma ORM**: Selected for type-safe database access and migration workflow
- **Tailwind CSS**: Enables rapid UI development with consistent design tokens (chalk/ink/rose/stone/pearl palette)
- **API Routes**: Serverless functions on Vercel provide zero-config backend capability