# Architecture Decision Records

## ADR-001: Component Boundary - Catalog Separation

- **Context**: The system needs to display product listings on multiple pages (home page, search results, category pages). Each page may have different filtering and sorting requirements. Product listing logic is distinct from product detail view logic.

- **Decision**: Create a separate `CatalogComponent` responsible solely for product listing, filtering, and sorting. The component fetches product data, applies category filters and price sort, provides pagination, and renders the product grid via `ProductCard`.

- **Consequences**:
  - **Positive**: Enables reuse of catalog logic across multiple pages; independent testing of catalog functionality; clear ownership of product data; enables independent deployment of catalog changes.
  - **Negative**: One additional component to maintain; requires data passing (product IDs) between catalog and detail views; slightly more complex state management.

- **Alternatives Rejected**: Combining catalog and product detail into a single component — would reduce reuse potential and make independent testing more difficult; changing catalog logic would risk affecting detail view behavior; would blur the boundary between listing and detail views.

## ADR-002: Authentication - Centralized Component

- **Context**: User authentication is required across multiple flows (login, registration, password reset, protected routes). Consistent authentication behavior is critical for security and user experience. Session management needs to be centralized to avoid token duplication and session inconsistency.

- **Decision**: Create a centralized `AuthComponent` that handles all authentication-related functionality including login, registration, password reset, and provides authenticated user context to other components.

- **Consequences**:
  - **Positive**: Ensures consistent authentication flow and security practices; single point for auth state management; simplifies protected route implementation; all components receive authenticated user context through a single source.
  - **Negative**: Component becomes a larger responsibility area; requires careful prop drilling or context provider; any auth issue affects all dependent components.

- **Alternatives Rejected**: Distributed authentication forms on each page — would duplicate auth logic, risk inconsistent security implementation, and make global auth state management more complex; would make it difficult to enforce consistent password policies and session management across the application.

## ADR-003: Cart - Dedicated Component

- **Context**: The shopping cart needs to be accessible from multiple places (product detail page, header icon, checkout flow) and may need to persist across browser sessions. Cart state management is a distinct concern from checkout processing.

- **Decision**: Create a dedicated `CartComponent` that manages cart state independently (items, quantities, totals) and provides cart summary to the checkout flow. Cart persistence is handled via LocalStorage with optional Prisma backend sync.

- **Consequences**:
  - **Positive**: Cart can be managed independently of checkout; enables cart persistence and recovery across browser sessions; cart summary can be displayed anywhere (header, product detail); clear ownership of cart state.
  - **Negative**: One additional component; requires careful state management to sync with checkout; potential for cart-state divergence if not properly synchronized.

- **Alternatives Rejected**: Integrating cart state within checkout component — would limit cart functionality outside checkout (e.g., displaying cart count in header); would make cart persistence and recovery more complex; would require cart state to be recreated if user navigates away before checkout; would blur the boundary between cart management and order processing.

## ADR-004: User Profile - Separate Component

- **Context**: User profile, order history, and account settings are distinct concerns with different change rates and ownership. Profile updates (email, password, notification preferences) should not necessarily affect order history display logic. Order history is read-focused while profile is read-write.

- **Decision**: Create a `UserComponent` that manages user profile, order history, and account settings as a cohesive unit for user-related operations. The component is owned by the user domain and integrates with `AuthComponent` for authentication state.

- **Consequences**:
  - **Positive**: Clear ownership of user data; enables independent user-focused testing; logical grouping of user-related functionality; enables targeted user-facing improvements.
  - **Negative**: Component may grow large over time as more user-related features are added; some profile settings could be extracted later into smaller components; initial scope may feel broader than necessary.

- **Alternatives Rejected**: Scattering profile, order history, and settings across multiple components — would fragment user data ownership; would make it harder to ensure consistent user experience; would create ambiguity about which component owns user data changes; would require coordination across multiple components for simple user profile updates.