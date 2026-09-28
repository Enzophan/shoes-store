# Refined Mockups Questions

## UI Representation of User Stories

- **US1.1 (Browse catalog)**: How should product cards be displayed - grid layout with image, name, price? Should there be quick view functionality?
- **US1.2 (Product details)**: What information architecture should the product detail page follow - image gallery, specs sidebar, related products section?
- **US1.3 (Add to cart)**: Should the cart update be immediate or show a toast notification? Should products be removable directly from the cart modal?
- **US1.4 (Proceed to checkout)**: Should the checkout be a multi-step wizard or single page? Should guest checkout be prominent?
- **US1.5 (Account/login)**: Should the login form be modal or dedicated page? Remember me functionality?
- **US1.6 (Shipping information)**: Should address autocompletion be supported? Should users save multiple addresses?
- **US1.7 (Payment method)**: Should card validation be real-time? Should saved payment methods be an option?
- **US1.8 (Order confirmation)**: Should the confirmation show order summary, estimated delivery, and tracking link?
- **US1.9 (Order history)**: Should orders be listed with expandable details? Should there be filtering by status?
- **US1.10 (Filter products)**: Should filters be applied as chips or dropdowns? Should filter state persist?

## Interaction Patterns

- **Modals**: Which stories should use modals (login, cart, size selection)?
- **Inline edits**: Which product details can be edited inline?
- **Wizards**: Which multi-step processes should use wizard pattern (checkout)?
- **Progressive disclosure**: What secondary information should be progressively disclosed?

## Design System Alignment

- Which existing components can be reused from the component library?
- What new components need to be designed (product card, price badge, size selector)?
- How should theme variables (--ink, --chalk, --rose, --rose-soft) be applied?
- What typography scale should be used for product text?

## Accessibility Requirements (WCAG)

- What minimum contrast ratio is required for text over product images?
- Should all interactive elements have ARIA labels?
- Is keyboard navigability required for all screen components?
- Should focus indicators be customized or use browser defaults?

## Responsive Breakpoints

- What breakpoints should be used (mobile: <640px, tablet: 640-1024px, desktop: >1024px)?
- How should the product grid reflow across breakpoints?
- How should the navigation adapt from hamburger to full menu?

## API Developer Experience (if applicable)

- What authentication method should be documented (Bearer token, API key)?
- What error response format should be specified?
- What request/response schemas are needed for cart and order endpoints?