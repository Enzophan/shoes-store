# Technology Stack

## Languages

| Language | Version | Usage |
|---|---|---|
| TypeScript | 5.x | Primary application language (Next.js, React, API routes, components) |
| JavaScript | ES2020+ | Runtime execution; some dependencies may use JS |

## Frameworks and Libraries

| Framework/Library | Version | Purpose |
|---|---|---|
| **Next.js** | `^14.0.0` | Full-stack React framework; App Router pattern; API routes; file-based routing |
| **React** | `^18.0.0` | UI library; hooks (useState, useEffect, useNavigate, useForm) |
| **React Hook Form** | `^7.89.0` | Form state management and validation in AdminBanners component |
| **Tailwind CSS** | `^4.0.0` | Utility-first CSS framework; v4 with JIT compilation |
| **@tailwindcss/postcss** | `^4.3.3` | Tailwind CSS PostCSS integration for Next.js 14 |
| **Prisma ORM** | `^5.0.0` | Database ORM; `@prisma/client` generator for type-safe DB queries |
| **Next.js App Router** | Built-in (v14) | Page routing pattern; `app/` directory structure |
| **React 18** | Built-in (v18) | Concurrent rendering, hooks support |

## Utility Libraries

| Library | Version | Purpose |
|---|---|---|
| **uuid** | `^14.0.2` | UUID v4 generation (used for banner IDs in AdminBanners) |
| **axios** | `^1.0.0` | HTTP client (imported but not prominently used in scanned files) |

## Development and Tooling

| Tool | Version | Purpose |
|---|---|---|
| **@types/jest** | `^29.0.0` | Jest type definitions for TypeScript |
| **@types/node** | `^18.0.0` | Node.js type definitions |
| **@types/react** | `^18.0.0` | React type definitions |
| **autoprefixer** | `^10.0.0` | CSS vendor prefixing (Tailwind v4 compatible) |
| **eslint** | `^8.0.0` | Code linting; Next.js default configuration |
| **jest** | `^29.0.0` | Test framework; runs with `ts-jest` transformer |
| **postcss** | `^8.0.0` | CSS post-processing; configured with Tailwind and Autoprefixer |
| **prisma** | `^5.0.0` | Database ORM CLI; migrations and client generation |
| **ts-jest** | `^29.0.0` | TypeScript transformer for Jest tests |
| **typescript** | `^5.0.0` | Type checker; strict mode configuration |

## Configuration Files

| File | Purpose |
|---|---|
| `next.config.js` | Next.js root configuration (app router, reactStrictMode, API routes) |
| `tailwind.config.js` | Tailwind CSS v4 configuration (content paths, customizations) |
| `tsconfig.json` | TypeScript project strictness and compiler options |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) |
| `jest.config.cjs` | Jest test configuration and coverage settings |

## Storage Backend

| Technology | Purpose | Status |
|---|---|---|
| **PostgreSQL** | Primary database for products, users, orders, variants | ✅ In use |
| **@prisma/client** | Type-safe PostgreSQL client | ✅ In use (products, variants, orders) |
| **In-memory JavaScript array** | Banner storage (temporary/prototyping) | ⚠️ Not Prisma-backed, data lost on restart |