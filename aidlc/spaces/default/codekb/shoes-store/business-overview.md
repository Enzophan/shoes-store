# Business Overview — shoes-store

## Product Description
An e-commerce platform for curated footwear and accessories ("Sole & Strand"). Sells sneakers, boots, bags, hats, and backpacks with seasonal drops, restocked classics, and promotional deals.

## Core Domain Entities
- **Product**: Name, slug, description, category, variants
- **Variant**: SKU, color, size, price, inventory
- **Order**: Order number, items, total, status, payment method
- **User**: Email, name, password hash, phone, addresses

## Key Business Flows
1. **Browse & Discover**: Homepage → Category pages → Product detail
2. **Cart & Checkout**: Add to cart → Cart page → Order placement (COD/Card)
3. **Admin Management**: Products CRUD, Order fulfillment

## Revenue Model
- Direct sales (COD and card payments)
- Seasonal promotions and "Deal" tagged products
- Bestseller/new arrival highlighting

## Target Audience
- Footwear enthusiasts seeking curated selections
- Seasonal shoppers (spring drops, restocks)
- Deal-conscious buyers

## Current Homepage Structure
- **Static Hero Banner**: "NEW SEASON DROP" with CTA buttons
- **Highlights Bar**: Filter tabs (Best Seller, New Arrival, Best Deals, categories)
- **Featured Edit**: Hero product + 2 secondary cards
- **Category Strips**: Horizontal scrolling cards per category