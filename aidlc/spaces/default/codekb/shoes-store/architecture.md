# Architecture Overview — Sole & Strand

## High-Level Architecture
**Full-Stack TypeScript/Next.js application** with a **Prisma ORM** layer connecting to a **PostgreSQL** database.

## Technology Stack
- **Frontend**: Next.js 13+ (App Router), React, TypeScript
- **Backend**: Next.js API Routes (serverless functions), Prisma Client
- **Database**: PostgreSQL (managed via Supabase or self-hosted)
- **Styling**: Tailwind CSS with custom color palette (chalk, ink, rose, stone, pearl)
- **Deployment**: Vercel (recommended) or Node.js hosting

## Component Decomposition

### Presentation Layer (App Router)
- `app/layout.tsx` — Root layout with header, navigation, footer
- `app/products/page.tsx` — Product listing page with filtering and sorting
- `app/products/[slug]/page.tsx` — Product detail page
- `app/cart/[id]/page.tsx` — Cart management
- `app/api/...` — API routes for products, orders, cart

### Business Logic Layer
- `src/lib/orderService.ts` — Order creation with inventory validation, user management, shipping address, and Prisma transaction
- `src/lib/validation.ts` — Input validation for cart items, email addresses, and shipping addresses

### Data Access Layer
- **Prisma Schema** (`prisma/schema.prisma`) — 7 models: Product, Variant, Order, OrderItem, User, Address, Enum types (OrderStatus, PaymentMethod)
- **Prisma Client** — Auto-generated TypeScript client for database operations

## Data Flow
1. **Product Listing**: Client fetches `/api/products` → Prisma `product.findMany` with variants → JSON response
2. **Order Creation**: Client posts to `/api/orders` → `createOrder()` service → validates items, finds/creates user, creates shipping address, Prisma transaction: create order + decrement inventory
3. **Cart Validation**: Client posts to `/api/cart` → validates variant existence and inventory, returns detailed availability

## Key Integration Points
- **Prisma Migrations** — Versioned database schema changes
- **Next.js Server Components** — Data fetching in `app/products/page.tsx` via `fetch('/api/products')`
- **API Route Handlers** — All routes in `src/app/api/` are server-side by default
- **Tailwind CSS** — Utility-first styling configured in `tailwind.config.js`