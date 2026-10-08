# Dependencies — Sole & Strand

## Root Package Dependencies

| Dependency | Version | Category | Purpose |
|-----------|---------|----------|---------|
| `next` | Latest | Framework | React framework with App Router |
| `react` | Latest | UI | User interface library |
| `react-dom` | Latest | UI | React DOM rendering |
| `@prisma/client` | Latest | Database | Type-safe PostgreSQL client |
| `prisma` | Latest | ORM | Database object-relational mapping |
| `tailwindcss` | Latest | Styling | Utility-first CSS framework |
| `postcss` | Latest | Build | CSS processing pipeline |
| `autoprefixer` | Latest | Build | CSS vendor prefixing |
| `@types/node` | Latest | Types | Node.js TypeScript types |
| `@types/react` | Latest | Types | React TypeScript types |
| `@types/react-dom` | Latest | Types | React DOM types |
| `typescript` | Latest | Lang | TypeScript compiler |

## DevDependencies
| Dependency | Version | Purpose |
|-----------|---------|---------|
| `eslint` | Latest | Linter |
| `prettier` | Latest | Formatter |
| `typescript` | Latest | Language support |

## Database Schema Dependencies (prisma/schema.prisma)

### Models
1. **Product** — id (Int, auto), name (String), slug (String, unique), description (String?), category (String), variants (Variant[]), createdAt/updatedAt
2. **Variant** — id (Int, auto), sku (String, unique), color (String), size (String), price (Float), inventory (Int, default 0), product (Product), productId (Int), orderItems (OrderItem[])
3. **Order** — id (Int, auto), orderNumber (String, unique), items (OrderItem[]), total (Float), currency (String, default "USD"), status (OrderStatus, default pending), paymentMethod (PaymentMethod, default COD), user (User?), userId (Int?), shippingAddress (Address?), shippingAddressId (Int?), createdAt/updatedAt
4. **OrderItem** — id (Int, auto), variant (Variant), variantId (Int), quantity (Int), price (Float), order (Order), orderId (Int)
5. **User** — id (Int, auto), email (String, unique), name (String?), passwordHash (String?), phone (String?), addresses (Address[]), orders (Order[]), createdAt/updatedAt
6. **Address** — id (Int, auto), user (User?), userId (Int?), fullName (String), line1 (String), line2 (String?), city (String), state (String?), postalCode (String), country (String), phone (String?), isDefault (Boolean, default false), shippingOrders (Order[] via "OrderShippingAddress")
7. **OrderStatus** — pending, confirmed, shipped, delivered, cancelled
8. **PaymentMethod** — COD, CARD, OTHER

### Enums
- `OrderStatus`: pending, confirmed, shipped, delivered, cancelled
- `PaymentMethod`: COD, CARD, OTHER

## Relationships (Prisma)
- Product ↔ Variant (1:N via productId)
- Product ↔ OrderItem (1:N)
- Variant ↔ OrderItem (1:N)
- Order ↔ OrderItem (1:N)
- Order ↔ User (1:1, optional via userId)
- Order ↔ Address (1:1, optional via shippingAddressId, named relation "OrderShippingAddress")
- User ↔ Address (1:N via userId)
- User ↔ Order (1:N via userId)
- Address ↔ Order (1:N via "OrderShippingAddress")
- Variant ↔ OrderItem (1:N via variantId)

## External Services
- **PostgreSQL** — Database server (connection string: `DATABASE_URL` environment variable)
- **Vercel** — Deployment platform (optional, for serverless function hosting)