# API Documentation

## External and Internal API Surfaces

The application exposes the following API endpoints through Next.js API routes (app router).

### Banner APIs

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/banners` | GET | Retrieve all banners | `200` + `Array<{id: string, imageUrl: string, linkUrl: string, displayOrder: number, isActive: boolean}>` |
| `/api/banners` | POST | Create a new banner | `201` + `Banner object` |
| `/api/banners` | DELETE | Delete a banner by ID | `200` + `{success: boolean}` |

**Note**: The banners API uses in-memory JavaScript array storage (not Prisma-backed). Sample data includes 3 banners for spring/summer/autumn collections.

### Product APIs

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/products` | GET | Retrieve all products with variants | `200` + `Array<Product>` (includes variant data) |
| `/api/products` | POST | Create a new product | `201` + `Product object` (with created variants) |

### Admin Variant API

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/admin/variants/[id]` | PATCH | Update variant inventory | `200` + `{id: number, inventory: number}`<br>`400` if `inventory` is not a number |

### Order APIs

| Endpoint | Method | Description | Response |
|---|---|---|---|
| `/api/orders` | POST | Create a new order (COD supported) | `200` + Order creation result from `orderService` |
| `/api/orders` | GET | Retrieve order info | `200` + `{info: 'POST to create order (COD supported)'}` |

## Contract Ownership

| API | Owner | Storage Backing | Status |
|---|---|---|---|
| GET/POST/DELETE /api/banners | Admin team | In-memory array | ⚠️ Not Prisma-backed, data lost on restart |
| GET/POST /api/products | Admin team | Prisma / PostgreSQL | ✅ Fully backed |
| PATCH /api/admin/variants/[id] | Admin team | Prisma / PostgreSQL | ✅ Fully backed |
| GET/POST /api/orders | Admin team | Prisma + orderService | ✅ Fully backed |

## Request/Response Schemas

### Banner Model
```typescript
interface Banner {
  id: string           // UUID v4 (client-generated)
  imageUrl: string     // Full URL to banner image
  linkUrl: string      // Destination URL (opens in new tab)
  displayOrder: number // Order of appearance in rotation
  isActive: boolean    // Whether banner is currently active
}
```

### Product Model (simplified)
- id: number (autoincrement)
- name: string
- slug: string (unique)
- description: string?
- category: string
- variants: Variant[]

### Variant Model (simplified)
- id: number (autoincrement)
- sku: string (unique)
- color: string
- size: string
- price: Float
- inventory: Int (default 0)

### Order Model (from schema)
- id: number (autoincrement)
- orderNumber: string (unique)
- items: OrderItem[]
- total: Float
- currency: string (default "USD")
- status: OrderStatus (pending, confirmed, shipped, delivered, cancelled)
- paymentMethod: PaymentMethod (COD, CARD, OTHER)

## Failure Behaviour

- **GET /api/banners**: Always returns 200 with current in-memory array (empty if server restarted)
- **POST /api/banners**: Returns 201 on success; does not persist across server restarts
- **DELETE /api/banners**: Returns 200 with `{success: true}`; silently does nothing if ID not found
- **PATCH /api/admin/variants/[id]**: Returns 400 if inventory is not a number; returns 500 on Prisma error
- **POST /api/orders**: Returns result from `orderService`; may return 400/500 on validation/service errors