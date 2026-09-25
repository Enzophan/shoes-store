# Practices Discovery Timestamp

**Discovered**: 2026-09-25T17:00:36Z at commit N/A (local development)

## Scope of Analysis

**Analyzed Paths:**
- `src/app/` — All pages, API routes, components
- `src/lib/` — Validation, services
- `prisma/schema.prisma` — Database schema
- `package.json` — Dependencies, scripts
- `tsconfig.json` — TypeScript config
- `tailwind.config.js` — Tailwind config
- `jest.config.cjs` — Jest config
- `next.config.js` — Next.js config

**Analyzed Components:**
- Next.js App Router structure (Server Components by default)
- API route handlers (GET/POST/PATCH/DELETE)
- React components (ProductCard, inline page components)
- Prisma models (Product, Variant, Order, OrderItem, User, Address)
- Configuration (TypeScript strict, ESLint, Prettier, Tailwind, Jest)

**Shallow Paths:**
- `.github/` — No workflow files found
- `docker-compose.yml`, `Dockerfile` — Infrastructure only
- `.env.example` — Environment template