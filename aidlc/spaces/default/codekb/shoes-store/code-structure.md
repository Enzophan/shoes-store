# Code Structure — shoes-store

## Directory Layout
```
src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── variants/[id]/route.ts
│   │   ├── cart/route.ts
│   │   ├── products/route.ts
│   │   ├── orders/route.ts
│   │   └── orders/[id]/route.ts
│   ├── admin/
│   │   ├── page.tsx                 # Admin dashboard
│   │   ├── products/
│   │   │   ├── page.tsx             # Product list
│   │   │   ├── new/page.tsx         # Create product
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # View product
│   │   │       └── EditProduct.tsx  # Edit form
│   ├── cart/page.tsx
│   ├── products/
│   │   ├── page.tsx                 # Product listing
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── ProductDetail.tsx
│   ├── order/[id]/page.tsx
│   ├── components/
│   │   └── ProductCard.tsx
│   ├── globals.d.ts
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Homepage (HERO + categories)
├── lib/
│   ├── validation.ts
│   └── orderService.ts
├── prisma/
│   └── schema.prisma
└── middleware.ts (if exists)
```

## File Purposes

### Pages (App Router)
| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage — static hero, highlights bar, featured products, category strips |
| `app/layout.tsx` | Root layout, metadata, fonts, global styles |
| `app/products/page.tsx` | Product listing with filters |
| `app/products/[slug]/page.tsx` | Product detail page |
| `app/cart/page.tsx` | Shopping cart |
| `app/admin/page.tsx` | Admin dashboard (Products, Orders links) |
| `app/admin/products/page.tsx` | Product management list |
| `app/admin/products/new/page.tsx` | Create product form |
| `app/admin/products/[id]/page.tsx` | View product details |
| `app/admin/products/[id]/EditProduct.tsx` | Edit product form |

### API Routes
| File | Method | Purpose |
|------|--------|---------|
| `app/api/products/route.ts` | GET | List all products |
| `app/api/cart/route.ts` | GET/POST | Cart operations |
| `app/api/orders/route.ts` | GET/POST | Order listing/creation |
| `app/api/orders/[id]/route.ts` | GET/PATCH | Order detail/status update |
| `app/api/admin/variants/[id]/route.ts` | PATCH/DELETE | Admin variant management |

### Components
| File | Purpose |
|------|---------|
| `app/components/ProductCard.tsx` | Reusable product display card with image, name, price, category, drop tag |

### Lib
| File | Purpose |
|------|---------|
| `lib/validation.ts` | Zod schemas for validation |
| `lib/orderService.ts` | Order business logic |

## Naming Conventions
- **Pages**: `page.tsx` (route segment), `ComponentName.tsx` (UI components)
- **Components**: PascalCase, colocated with route or in `components/`
- **API**: `route.ts` in route segment directory
- **Types**: Inline interfaces in component files
- **Styles**: Tailwind utility classes, CSS variables for theme colors