# Component Inventory

## Complete Component List

| Component | File Path | Responsibility | Dependencies |
|---|---|---|---|
| **AdminHome** | `src/app/admin/page.tsx` | Admin dashboard main page; provides navigation to Products and Orders management | `next/link`, grid layout, header with description |
| **AdminBanners** | `src/app/admin/banners/page.tsx` | Banners management UI; form for add/edit/delete, table display of banners | `React useState/useEffect`, `useNavigate`, `useForm` (react-hook-form), `uuid`, table component |
| **Product Page** | `src/app/admin/...` (not fully scanned) | Product management interface | - |
| **Orders Page** | `src/app/admin/...` (not fully scanned) | Order viewing and fulfillment interface | - |
| **Banner List Row** | Within `AdminBanners` | Display individual banner with image, link, order, status, and action buttons (edit/delete) | Banner object state, `startEdit`, `deleteBanner` functions |
| **Banner Form** | Within `AdminBanners` | Add new banner or edit existing banner form | `react-hook-form` registration, field validation, submit/cancel handlers |
| **API Route: GET /api/banners** | `src/app/api/banners/route.ts` | Return in-memory banner array as JSON | None (static array) |
| **API Route: POST /api/banners** | `src/app/api/banners/route.ts` | Create new banner from request body | In-memory array push |
| **API Route: DELETE /api/banners** | `src/app/api/banners/route.ts` | Delete banner by ID from query params | In-memory array splice |
| **API Route: GET /api/products** | `src/app/api/products/route.ts` | Fetch all products with variants via Prisma | `@prisma/client`, database query |
| **API Route: POST /api/products** | `src/app/api/products/route.ts` | Create new product with variants | `@prisma/client`, Prisma create |
| **API Route: PATCH /api/admin/variants/[id]** | `src/app/api/admin/variants/[id]/route.ts` | Update variant inventory count | `@prisma/client`, Prisma variant.update |
| **API Route: GET/POST /api/orders** | `src/app/api/orders/route.ts` | Order creation and info retrieval | `@prisma/client`, `createOrder` from `lib/orderService` |
| **Order Service** | `src/lib/orderService.ts` | Business logic for order creation | Not fully scanned (skipped in developer scan) |
| **Validation Utilities** | `src/lib/validation.ts` | Cart, email, shipping address validation | Not fully scanned (skipped in developer scan) |

## Ownership & Boundaries

### Assigning Entities to Components (Key Design Rule)

Each entity is assigned to exactly one owning component:

| Entity | Owning Component | Rationale |
|---|---|---|
| Banner data (id, imageUrl, linkUrl, displayOrder, isActive) | AdminBanners (UI state) | Component manages local state + form handling; API route manages server-side storage |
| Banner CRUD operations | AdminBanners (UI) + /api/banners (server) | UI handles user interactions; API handles data persistence |
| Navigation links | AdminHome | Dashboard-level component providing site navigation |
| Product data | Products component + /api/products | Separate component (not fully scanned) handles product display |
| Order data | Orders component + /api/orders | Separate component (not fully scanned) handles order display |
| Variant inventory | /api/admin/variants/[id] | Standalone API endpoint; no owning UI component was scanned |

### Dependency Flow

- **AdminBanners** → `react`, `react-hook-form`, `uuid`, Next.js APIs
- **AdminHome** → `next/link`, basic styling classes
- **API Routes** → `@prisma/client` (products, variants, orders), in-memory array (banners)
- **No circular dependencies** detected in scanned code

### Code Smells / Boundary Issues

1. **Banner ownership ambiguity**: The AdminBanners component has full CRUD UI (add/edit/delete) but the API uses in-memory storage with no Prisma model. The data has no permanent home in the database.
2. **Missing navigation ownership**: AdminHome should own the navigation link boundary to Banners, but currently links only to Products and Orders.
3. **Inconsistent data layer**: Products use Prisma + PostgreSQL; banners use in-memory JavaScript array. This creates a maintenance burden and data persistence risk.