# API Documentation — shoes-store

## Base URL
`/api` (same-origin, serverless functions on Vercel)

## Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products with variants |

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Air Max 90",
    "slug": "air-max-90",
    "description": "Classic runner...",
    "category": "sneakers",
    "variants": [
      { "id": 1, "color": "White/Black", "size": "10", "price": 120 }
    ],
    "isBestseller": true,
    "isNewArrival": false,
    "isDeal": false,
    "isRestock": false
  }
]
```

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart` | Add/update cart item |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List orders (admin) |
| POST | `/api/orders` | Create order (checkout) |
| GET | `/api/orders/[id]` | Get order details |
| PATCH | `/api/orders/[id]` | Update order status (admin) |

### Admin Variants
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/admin/variants/[id]` | Update variant (price, inventory) |
| DELETE | `/api/admin/variants/[id]` | Delete variant |

## Data Models (from Prisma)

### Product
```typescript
interface Product {
  id: number
  name: string
  slug: string
  description: string | null
  category: string
  variants: Variant[]
  createdAt: Date
  updatedAt: Date
}
```

### Variant
```typescript
interface Variant {
  id: number
  sku: string
  color: string
  size: string
  price: number
  inventory: number
  productId: number
}
```

### Order
```typescript
interface Order {
  id: number
  orderNumber: string
  items: OrderItem[]
  total: number
  currency: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'COD' | 'CARD' | 'OTHER'
  userId: number | null
  createdAt: Date
}
```

## Authentication
- No explicit auth middleware in API routes
- Admin routes protected by UI navigation only (no server-side auth)
- Orders can be guest (userId nullable)

## Error Handling
- Returns `{ error: string }` with appropriate HTTP status
- No standardized error format across routes