# Architecture — shoes-store

## System Overview
Next.js 14+ App Router (React 18, TypeScript) with PostgreSQL/Prisma backend. Deployed on Vercel with edge functions.

## Layer Diagram
```
┌─────────────────────────────────────────────┐
│           Presentation (Next.js)            │
│  app/ (pages, layouts, components)          │
│  lib/ (validation, services)                │
└─────────────────────┬───────────────────────┘
                      │ Server Components / API Routes
┌─────────────────────▼───────────────────────┐
│              Data Layer (Prisma)            │
│  Product, Variant, Order, User, Address     │
└─────────────────────┬───────────────────────┘
                      │ PostgreSQL
┌─────────────────────▼───────────────────────┐
│           Infrastructure (Vercel)           │
│  Edge Network, Image Optimization,          │
│  Serverless Functions, PostgreSQL (Neon)    │
└─────────────────────────────────────────────┘
```

## Key Architectural Patterns
- **Server Components First**: `page.tsx` uses async/await for data fetching
- **Route Handlers**: `/api/*` for mutations (cart, orders, admin)
- **Colocated Components**: UI components in `app/components/`
- **Type-Safe Database**: Prisma schema → TypeScript types
- **Optimistic UI**: Client-side cart with server sync

## Data Flow (Homepage)
1. `page.tsx` calls `getProducts()` → `fetch('/api/products')`
2. `/api/products/route.ts` → Prisma `findMany()` → JSON response
3. Products filtered client-side for featured/categories
4. Rendered via `ProductCard` and inline components

## Integration Points for Banner Feature
| Integration Point | Current State | Banner Feature Need |
|-------------------|---------------|---------------------|
| Homepage (`page.tsx`) | Static hero section (lines 68-96) | Replace with carousel component |
| Admin Dashboard | Products, Orders only | Add "Manage Banners" section |
| Database (Prisma) | Product, Variant, Order, User | Add `Banner` model |
| API Routes | `/api/products`, `/api/cart`, `/api/orders` | Add `/api/admin/banners` |
| Image Handling | Next.js Image (Vercel) | Same for banner images |
| Styling | Tailwind CSS, CSS variables | Carousel animations |

## Existing Patterns to Follow
- Admin routes: `/admin/*` with page.tsx + API routes
- Data fetching: Server components with `fetch()` to own API
- Components: Colocated in `app/components/`
- Styling: Tailwind with CSS custom properties (--rose-soft, --ink, --chalk)
- TypeScript: Strict mode, interfaces in component files