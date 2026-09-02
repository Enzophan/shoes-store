# Shoes Store

Next.js + TypeScript ecommerce scaffold for shoes, hats, bags and backpacks.

Key features
- Product variants (color, size)
- Guest and optional user checkout
- Cash-on-delivery (COD) flow
- Admin UI for inventory per variant
- Prisma + PostgreSQL schema and migrations

Quick start (development)

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.

```bash
cp .env.example .env
```

2. Install dependencies

```bash
npm install
```

3. Run Prisma migrations (local Postgres)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Run the app

```bash
npm run dev
```

Testing

```bash
npm test
```

Docker

Build and run in Docker (requires Docker installed):

```bash
docker build -t shoes-store:dev .
docker run -p 3000:3000 --env-file .env shoes-store:dev
```

CI

GitHub Actions included in `.github/workflows/ci.yml` runs install, tests, and builds on push and PR.

Project structure
- `src/app` — Next.js app routes and pages
- `src/app/api` — API routes (products, orders, admin)
- `prisma/schema.prisma` — DB schema
- `__tests__` — Jest unit tests

Notes
- The project uses Prisma with PostgreSQL. For production, set `DATABASE_URL` to your managed DB.
- Admin pages are not authenticated by default — add auth before deploying publicly.

Next steps
- Add authentication, email notifications, and production deployment scripts.

# shoes-store
