# Component Inventory — Sole & Strand

## React Components

### `src/app/components/ProductCard.tsx`
- **Props**: `product: Product` — Product interface with id, name, slug, category, image?, variants, isBestseller?, isNewArrival?, isDeal?, isRestock?
- **Exports**: Default `ProductCard` component
- **Dependencies**: React, `next/link`
- **Displays**: Product image, drop tag (BEST/FW25 ↓/DEAL/RESTOCK/ARCHIVE), category, name (linked), price
- **State**: None (presentational component)
- **Side Effects**: None

### `src/app/layout.tsx` (Root Layout)
- **Exports**: Default `RootLayout` component
- **Dependencies**: `./styles/globals.css`, `next`, `next/link`, `type { Metadata } from 'next'`
- **Displays**: Header with brand/navigation, main content area, footer with links and social icons
- **State**: None (root layout)
- **Side Effects**: Sets document structure, sticky header, responsive grid

## API Route Handlers

### `src/app/api/products/route.ts`
- **Exports**: `GET`, `POST` async functions
- **Dependencies**: `next/server`, `@prisma/client`
- **Prisma Client**: `new PrismaClient()` (singleton instance)
- **GET**: `prisma.product.findMany({ include: { variants: true } })`
- **POST**: `prisma.product.create()` with data from request body

### `src/app/api/orders/route.ts`
- **Exports**: `GET`, `POST` async functions
- **Dependencies**: `next/server`, `@prisma/client`, `../../../lib/orderService`
- **POST**: Calls `createOrder(prisma, body)` — wraps in try/catch, returns 400 on error
- **GET**: Returns `{ info: 'POST to create order (COD supported)' }`

### `src/app/api/cart/route.ts`
- **Exports**: `GET`, `POST` async functions
- **Dependencies**: `next/server`, `@prisma/client`
- **POST**: Validates items, checks variant availability, returns detailed cart summary with total
- **GET**: Returns `{ info: 'POST to validate cart items' }`

### `src/app/api/orders/[id]/route.ts`
- **Exports**: `GET` async function
- **Dependencies**: `next/server`, `@prisma/client`
- **GET**: Looks up order by numeric ID OR orderNumber string, includes items with variants and shipping address

## Utilities

### `src/lib/validation.ts`
- **Exports**: `validateCartItems`, `validateEmail`, `validateShippingAddress`
- **Type**: `CartItem = { variantId: number; quantity: number }`
- **validateCartItems(items: any)**: Returns `{ valid: boolean; errors: string[] }`
  - Checks items is an array
  - Validates each item: variantId must be positive integer, quantity must be positive integer
- **validateEmail(email?: string)**: Returns `boolean` — regex test `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **validateShippingAddress(addr: any)**: Returns `{ valid: boolean; errors: string[] }`
  - Checks address is provided
  - Validates: fullName, line1, city, postalCode, country are present

## Configuration Files
- `next.config.js` — Next.js configuration
- `tailwind.config.js` — Tailwind CSS color palette (chalk, ink, rose, stone, pearl)
- `tsconfig.json` — TypeScript paths and compiler options
- `package.json` — Dependencies: next, react, prisma, @prisma/client, tailwindcss