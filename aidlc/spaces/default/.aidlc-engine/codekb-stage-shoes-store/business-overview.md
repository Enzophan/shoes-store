# Business Overview

## Domain
The shoes store is an e-commerce application selling footwear and related accessories. The admin dashboard provides management capabilities for products, inventory, orders, and marketing content.

## Purpose
- Enable admin users to manage product catalog (products, variants, inventory)
- Process and fulfill customer orders
- Display rotating banners on the homepage for promotions and featured collections
- Manage customer data and shipping addresses

## Key Functionality

### Product Management
- Create, edit, and organize products and variants
- Track inventory levels per variant (size/color combinations)
- Monitor stock levels and low-inventory alerts

### Order Management
- Receive and process customer orders (COD - Cash on Delivery supported)
- Track order status from pending through delivered
- Manage shipping addresses and order items

### Banner Management (current state - under development)
- Display rotating homepage banners for promotions
- Link banners to collection pages (spring, summer, autumn collections)
- Admin can add, edit, and delete banners
- Banners currently use in-memory storage without Prisma backing

### Admin Navigation
- Dashboard provides links to Products and Orders management
- Missing: direct navigation link to Banners Management feature