Shoes Store — Project Specification

Todo List (current)
- Define requirements & tech stack: completed
- Scaffold repository + CI: completed
- Design data models (products, variants, orders, users): completed
- Implement backend APIs (products, cart, checkout, COD): completed
- Implement frontend (listing, filters, product detail, cart): completed
- Implement checkout flow with COD: completed
- Add admin panel & inventory management: completed
- Write tests and validation: completed
- Prepare deployment/docs and README: completed
- Optional: analytics, email notifications, coupons: pending

Scope
- Ecommerce store selling shoes, hats, bags, backpacks.
- Product variants support color and size selection.
- Checkout supports Cash On Delivery (COD) and stores paymentMethod on orders.
- Guest checkout supported; optional user accounts.

Tech stack
- Frontend: Next.js (App Router) with TypeScript and Tailwind CSS.
- Backend: Next.js API routes + Prisma ORM (PostgreSQL datasource).
- Testing: Jest + ts-jest (unit tests), Playwright/Cypress optional for E2E.
- CI/CD: GitHub Actions; Dockerfile included for container builds.

Data models (summary)
- Product: id, name, slug, description, category, variants[], timestamps
- Variant: id, sku, color, size, price, inventory, productId
- User: id, email, name, passwordHash?, phone, addresses[], orders[]
- Address: id, userId?, fullName, line1, line2?, city, state?, postalCode, country, phone
- Order: id, orderNumber, items[], total, currency, status (enum), paymentMethod (enum), userId?, shippingAddressId?, timestamps
- OrderItem: id, variantId, quantity, price, orderId

APIs (implemented)
- GET /api/products — list products with variants
- POST /api/products — create product with variants (admin)
- POST /api/cart — validate cart items, return availability and totals
- POST /api/orders — create order (uses createOrder service), supports COD, transactional inventory decrement
- GET /api/orders/[id] — fetch order by id or orderNumber
- PATCH /api/admin/variants/[id] — update variant inventory (admin)

Frontend (implemented)
- Products listing page: `/products`
- Product detail page with variant (color/size) selection and add-to-cart
- Cart page: localStorage-based cart, shipping form, checkout with COD
- Order confirmation page: `/order/[id]`
- Admin pages: `/admin`, `/admin/products`, `/admin/products/[id]` (inventory edit)

Testing & CI
- Unit tests: `__tests__` with Jest (validation and orderService mocked tests).
- CI: GitHub Actions runs `npm ci`, `npm test`, `npm run build` on push/PR.

Run / Dev notes
1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install: `npm install`
3. Migrate: `npx prisma migrate dev --name init` and `npx prisma generate`
4. Dev: `npm run dev`
5. Test: `npm test`

Notes / Next steps
- Add authentication for admin routes before public deployment.
- Add email notifications and analytics as optional enhancements.
- Add E2E tests and production deployment scripts.
