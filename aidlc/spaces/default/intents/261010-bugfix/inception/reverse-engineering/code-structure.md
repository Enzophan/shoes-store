# Code Structure

## Package/Module Organization

The project uses **Next.js 14 with App Router** and is organized as a monolithic full-stack application. The source code lives under `src/`.

### Top-Level Structure

```
src/
  app/          ← Next.js App Router pages and API routes
    admin/      ← Admin dashboard
      page.tsx  ← Admin home dashboard
      banners/  ← Banners management page
        page.tsx
    api/        ← API routes (route handlers)
      banners/  ← GET/POST/DELETE /api/banners
      products/ ← GET/POST /api/products
      admin/    ← PATCH /api/admin/variants/[id]
      orders/   ← GET/POST /api/orders
    layout.tsx
    page.tsx     ← Root/home page
  components/   ← Reusable UI components
  lib/          ← Utility functions and services
    orderService.ts  ← Order creation logic
  styles/       ← Global styles
```

### File Classification

| Category | Description | Key Files |
|---|---|---|
| **API Routes** | Route handlers for all backend endpoints | `src/app/api/banners/route.ts`, `src/app/api/products/route.ts`, `src/app/api/admin/variants/[id]/route.ts`, `src/app/api/orders/route.ts` |
| **Admin UI** | Admin dashboard and management pages | `src/app/admin/page.tsx`, `src/app/admin/banners/page.tsx` |
| **Components** | Reusable UI building blocks | `src/components/` (not individually scanned) |
| **Lib** | Business logic services | `src/lib/orderService.ts` |
| **Prisma Schema** | Database model definitions | `prisma/schema.prisma` |
| **Config** | Framework configuration | `next.config.js`, `tailwind.config.js`, `tsconfig.json` |

### Code Patterns

#### API Route Pattern (all routes follow this structure)
```typescript
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// handler functions (GET, POST, etc.)
export const GET = async (req) => { ... }
export const POST = async (req) => { ... }
```

#### Component Pattern (AdminBanners)
- Functional component with React hooks (`useState`, `useEffect`, `useNavigate`, `useForm`)
- Local state management for banners list, editing state, form visibility
- Inline form handling with react-hook-form
- Table-based display with edit/delete actions

#### Prisma Usage Pattern (products, orders, variants)
- Singleton `PrismaClient` instance
- `await prisma.model.findMany()` for reads
- `await prisma.model.create()` for writes
- `await prisma.model.update()` for updates
- Includes for relation data (`include: { variants: true }`)

## Module Dependencies

- **`src/app/api/banners/route.ts`** → In-memory array (no Prisma)
- **`src/app/api/products/route.ts`** → Prisma `@prisma/client`
- **`src/app/api/orders/route.ts`** → Prisma + `createOrder` from `src/lib/orderService`
- **`src/app/admin/banners/page.tsx`** → `react-hook-form`, `uuid`, Next.js `useNavigate`
- **`src/app/admin/page.tsx`** → `next/link`, basic grid layout
- **`prisma/schema.prisma`** → Defines Product, Variant, Order, User, Address models (no Banner)