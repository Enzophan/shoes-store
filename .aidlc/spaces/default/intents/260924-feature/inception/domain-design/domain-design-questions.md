# Domain Design Questions

## Component Boundary Decisions

- **US1.1 (Browse catalog)**: Should product browsing be a separate `CatalogComponent` or combined with `ProductDetailComponent`?
  - Option A: Separate component for catalog listing with its own data fetching and state
  - Option B: Combined component with lazy loading of product details
  - Trade-off: Separate component enables reuse and independent testing, but increases number of components

- **US1.3 (Add to cart)**: Should cart functionality be in a dedicated `CartComponent` or part of a `CheckoutComponent`?
  - Option A: Dedicated cart component managing cart state independently
  - Option B: Cart state integrated within checkout flow
  - Trade-off: Dedicated cart enables cart persistence and reuse, but adds complexity

- **US1.5 (Account/login)**: Should authentication be in an `AuthComponent` or scattered across pages?
  - Option A: Centralized auth component handling login, registration, password reset
  - Option B: Distributed auth forms on each page
  - Trade-off: Centralized component ensures consistency, but requires careful prop drilling

- **US1.9 (Order history)**: Should order history be part of `UserComponent` or separate `OrderHistoryComponent`?
  - Option A: Separate component with its own data fetching for orders
  - Option B: Integrated within user profile component
  - Trade-off: Separate component enables independent testing, but duplicates some user profile logic

## Entity Ownership

- **Product entity**: Which component owns product data (IDs, names, prices, descriptions)?
- **User entity**: Which component owns user account data (profile, preferences, addresses)?
- **Order entity**: Which component owns order data (items, totals, status, history)?
- **Cart entity**: Which component owns cart data (items, quantities, selections)?

## Component Responsibilities

- What business logic should each component own?
- What validation rules apply to each component's domain?
- What external services does each component interact with?

## Component Interaction Patterns

- Which components call which other components?
- Should interactions be synchronous or asynchronous?
- Should any components communicate via events?

## Integration with Existing (Brownfield)

- Are there existing components from previous work that need integration?
- How should new components coexist with existing ones?

## UI Component Structure (informed by Designer)

- Which components have UI representations informed by the refined mockups?
- What UI state does each component manage?
- How do UI components relate to business logic components?