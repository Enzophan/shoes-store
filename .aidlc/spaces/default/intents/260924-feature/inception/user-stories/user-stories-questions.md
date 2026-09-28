# User Stories Questions

## Persona Development Approach

- **Primary personas**: Customer (shopping for shoes), Admin (managing inventory), Guest (browsing without account)
- **Secondary personas**: Returning customer, Price-sensitive shopper, Style-conscious shopper
- **Goals**: Find products quickly, complete purchase efficiently, manage orders, discover new styles

## Story Format

- All stories follow INVEST criteria
- Format: "As a [persona], I want [goal], so that [benefit]"
- Each story receives a stable ID: US{group}.{seq} (e.g., US1.1)
- Acceptance criteria receive ID: AC{story-group}.{story-seq}.{criterion-seq} (e.g., AC1.1.1)

## Story Prioritization (MoSCoW)

### Must Have (MVP)
- User can browse product catalog
- User can view product detail page
- User can add product to cart
- User can proceed to checkout
- User can create account/login
- User can enter shipping information
- User can select payment method
- User can receive order confirmation

### Should Have
- User can apply promotional discounts
- User can view order history
- User can filter products by category
- User can sort products by price

### Could Have
- User can save products to wishlist
- User can compare multiple products
- Advanced search with multiple filters
- Personalized recommendations

### Won't Have (Out of Scope)
- User can chat with support within the app
- Complex custom product configurator
- Social media integration for sharing purchases

## Breakdown Approach

- By feature: browsing, cart, checkout, account, search
- By persona: customer, admin, guest
- By workflow: discovery → selection → purchase → ownership
- By domain area: product, user, order, catalog

## Embedded Questions (for user input)

[Answer: What are the top 3 user goals when shopping for shoes online?] Customer wants to find the right shoes quickly, complete purchase easily, and track orders conveniently.
[Answer: What INVEST criteria are most important for your user stories?] Independent, Negotiable, Valuable, Small, Testable - all five are essential for maintainable stories.
[Answer: Which MoSCoW priority should receive the most focus for MVP?] Must Have - the MVP boundary must deliver core shopping functionality.