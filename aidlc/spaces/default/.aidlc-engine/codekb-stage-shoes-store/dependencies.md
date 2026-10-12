# Dependencies

## External Dependencies (package.json)

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | `^14.0.0` | React framework; App Router, API routes, development server |
| react | `^18.0.0` | UI library; core React functionality |
| react-dom | `^18.0.0` | React DOM rendering; client-side and server-side rendering |
| @prisma/client | `^5.0.0` | Type-safe Prisma database client; used by products, variants, orders APIs |
| @tailwindcss/postcss | `^4.3.3` | Tailwind CSS v4 PostCSS integration |
| tailwindcss | `^4.0.0` | Utility-first CSS framework v4 |
| axios | `^1.0.0` | HTTP client; imported in codebase but not prominently used in scanned files |
| react-hook-form | `^7.89.0` | Form state management; used in AdminBanners component |
| uuid | `^14.0.2` | UUID v4 generation; used for banner ID generation in AdminBanners |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| @types/jest | `^29.0.0` | Jest type definitions for TypeScript |
| @types/node | `^18.0.0` | Node.js type definitions for ts-node and API routes |
| @types/react | `^18.0.0` | React type definitions |
| autoprefixer | `^10.0.0` | CSS vendor prefixing |
| eslint | `^8.0.0` | Code linting; Next.js default configuration |
| jest | `^29.0.0` | Test framework; runs with ts-jest transformer |
| postcss | `^8.0.0` | CSS post-processing framework |
| prisma | `^5.0.0` | Database ORM CLI; migrations, schema introspection |
| tailwindcss | `^4.0.0` | Dev dependency for Tailwind CSS v4 |
| ts-jest | `^29.0.0` | TypeScript transformer for Jest |
| typescript | `^5.0.0` | Type checker and compiler |

## Internal Cross-Package Dependencies

| From → To | Dependency Type | Description |
|---|---|---|
| `src/app/api/products/route.ts` → `@prisma/client` | Import | Instantiates `new PrismaClient()` for DB queries |
| `src/app/api/admin/variants/[id]/route.ts` → `@prisma/client` | Import | Instantiates `new PrismaClient()` for variant updates |
| `src/app/api/orders/route.ts` → `@prisma/client` + `src/lib/orderService` | Import | Uses Prisma for DB + orderService for business logic |
| `src/app/api/banners/route.ts` → (none) | None | Uses in-memory array; no Prisma import |
| `src/app/admin/banners/page.tsx` → `react-hook-form` | Import | `useForm` hook for form state management |
| `src/app/admin/banners/page.tsx` → `uuid` | Import | `v4 as uuidv4` for generating new banner IDs |
| `src/app/admin/banners/page.tsx` → `next/navigation` | Import | `useNavigate` for navigation |
| `src/app/admin/page.tsx` → `next/link` | Import | Navigation links between dashboard sections |
| `src/lib/validation.ts` → (consumed by) | Internal | Validation functions for cart, email, shipping (not fully scanned) |
| `src/lib/orderService.ts` → `prisma` | Import | Used in `src/app/api/orders/route.ts` for order creation |
| `src/components/` → (various) | Internal | Reusable UI components; not individually scanned |

## Dependency Notes

- **Prisma client** is the most widely used external dependency after core React/Next.js packages
- **@prisma/client** is imported in 3 API route files (products, variants, orders) but NOT in banners API
- **react-hook-form** and **uuid** are used specifically in the AdminBanners component
- **axios** is listed in package.json dependencies but was not prominently used in the scanned files; may be used in code not covered by the developer scan
- All TypeScript type definitions (@types/*) correspond to their respective runtime package versions
- Tailwind CSS v4 and @tailwindcss/postcss v4.3.3 work together; autoprefixer v10.0.0 is also configured