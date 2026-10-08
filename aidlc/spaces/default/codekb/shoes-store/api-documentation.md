# API Documentation — Sole & Strand

## Base Path
All API routes are relative to the Next.js application root.

## Endpoints

### `GET /api/products`
- **Description**: Retrieve all products with their variants
- **Response**: `200 OK` — JSON array of product objects
- **Schema**:
  ```json
  [
    {
      "id": number,
      "name": string,
      "slug": string,
      "description": string | null,
      "category": string,
      "variants": [
        {
          "id": number,
          "sku": string,
          "color": string,
          "size": string,
          "price": number,
          "inventory": number
        }
      ]
    }
  ]
  ```
- **Errors**: None (empty array if no products)
- **Notes**: Used by `app/products/page.tsx` with `cache: 'no-store'`

### `POST /api/products`
- **Description**: Create a new product (admin functionality)
- **Request Body**:
  ```json
  {
    "name": string,
    "slug": string,
    "description": string | null,
    "category": string,
    "variants": [
      {
        "sku": string,
        "color": string,
        "size": string,
        "price": number,
        "inventory": number
      }
    ]
  }
  ```
- **Response**: `200 OK` — Created product object with variants
- **Errors**: `400 Bad Request` if validation fails

### `POST /api/orders`
- **Description**: Create a new order (COD supported)
- **Request Body**:
  ```json
  {
    "items": [
      {
        "variantId": number,
        "quantity": number
      }
    ],
    "user": {
      "email": string,
      "name": string | undefined,
      "phone": string | undefined
    } | undefined,
    "shippingAddress": {
      "fullName": string,
      "line1": string,
      "line2": string | null,
      "city": string,
      "state": string | null,
      "postalCode": string,
      "country": string,
      "phone": string | null
    } | undefined
  }
  ```
- **Response**: `200 OK` — Created order object
- **Errors**: `400 Bad Request` — `err.message` describes validation failure (e.g., "No items provided", "Variant X not found", "Insufficient inventory for variant X")
- **Notes**: Uses `createOrder()` from `src/lib/orderService`. Wraps in try/catch and returns 400 on error.

### `GET /api/orders`
- **Description**: Get information about order endpoints
- **Response**: `200 OK` — `{ "info": "POST to create order (COD supported)" }`

### `GET /api/orders/[id]`
- **Description**: Retrieve a specific order by numeric ID or order number
- **Parameters**: `id` — numeric order ID or order number string
- **Response**: `200 OK` — Order object with items, shipping address
- **Errors**: `404 Not Found` if order not found
- **Notes**: Supports both numeric ID and orderNumber string lookup

### `POST /api/cart`
- **Description**: Validate cart items and check inventory availability
- **Request Body**:
  ```json
  {
    "items": [
      {
        "variantId": number,
        "quantity": number
      }
    ]
  }
  ```
- **Response**: `200 OK` — `{ items: [{ variantId, quantity, price, inventory, available }], total: number }`
- **Errors**: `400 Bad Request` if items array is empty or missing
- **Notes**: Returns detailed availability for each item including price and current inventory

### `GET /api/cart`
- **Description**: Get cart information
- **Response**: `200 OK` — `{ "info": "POST to validate cart items" }`