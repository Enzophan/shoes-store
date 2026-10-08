# Code Structure — Sole & Strand

## Directory Layout (src/)

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── admin/              # Admin routes
│   ├── api/                # API route handlers
│   │   ├── cart/route.ts
│   │   ├── orders/route.ts
│   │   ├── orders/[id]/route.ts
│   │   └── products/route.ts
│   ├── cart/               # Cart page
│   ├── components/         # React components
│   ├── order/              # Order-related pages
│   ├── products/           # Product catalog pages
│   ├── styles/             # Global styles
│   └── layout.tsx          # Root layout
├── lib/                    # Business logic libraries
│   ├── orderService.ts     # Order creation with transaction
│   └── validation.ts       # Input validation utilities
├── __tests__/              # Test files
├── globals.d.ts            # Global TypeScript definitions
├── next-env.d.ts           # Next.js type extensions
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Key Files and Responsibilities

### `src/lib/orderService.ts` — Order Creation
- Validates items array and variant availability
- Handles user creation/ lookup by email
- Creates shipping address if provided
- Prisma transaction: creates order + decrements inventory atomically
- Returns created order object

### `src/lib/validation.ts` — Input Validation
- `validateCartItems()` — Validates array format and item constraints (positive integer variantId, positive integer quantity)
- `validateEmail()` — Regex-based email validation
- `validateShippingAddress()` — Validates required address fields (fullName, line1, city, postalCode, country)

### `prisma/schema.prisma` — Database Schema
- 7 core models with relationships
- Enum types for OrderStatus and PaymentMethod
- Relations: Product↔Variant, Order↔User, Order↔Address, OrderItem↔Variant

### `app/api/products/route.ts` — Products API
- `GET` — List all products with variants included
- `POST` — Create a new product (admin functionality)

### `app/layout.tsx` — Root Layout
- Header with brand logo and navigation
- Cart display with item count
- Footer with links (Shop, Support, Company)
- Responsive grid layout

### `app/components/ProductCard.tsx` — Product Card Component
- Displays product image, category, name, price
- Shows drop tags (BEST, FW25 ↓, DEAL, RESTOCK, ARCHIVE)
- Link to product detail page

## Import Structure
- Absolute path aliases: `@/app/components/ProductCard`, `@/lib/orderService`
- Third-party: `next`, `next/link`, `next/server`, `@prisma/client`
- Custom: `src/lib/`, `src/app/`, `src/components/`