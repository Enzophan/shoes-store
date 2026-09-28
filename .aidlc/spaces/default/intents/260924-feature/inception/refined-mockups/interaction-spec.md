# Interaction Specification

## Component Specifications

### ProductCard Component
- **Props**: `product` (id, name, price, image, sizes, colors), `onAddToCart` (product, size, color), `variant` (compact, compact-compact)
- **State**: `isInCart` (boolean), `selectedSize` (string | null), `selectedColor` (string | null)
- **Events**: `click`, `mouseenter`, `mouseleave`
- **Accessibility**: `aria-label` for "Add to cart" button, `role="button"` with keyboard support
- **Responsive**: Adapts from mobile to desktop grid

### SizeSelector Component
- **Props**: `availableSizes` (string[]), `selectedSize` (string), `onSelect` (size: string)
- **State**: `hoveredSize` (string | null)
- **Interaction**: Click to select, hover to highlight
- **Accessibility**: `role="group"`, `aria-label="Size selector"`, focus management

### ColorSwatch Component
- **Props**: `availableColors` (Color[]), `selectedColor` (Color), `onSelect` (color: Color)
- **State**: `hoveredColor` (Color | null)
- **Interaction**: Click to select, hover to preview
- **Accessibility**: `aria-label="Color selector"`, visible focus ring

### QuantityInput Component
- **Props**: `value` (number), `min` (number, default 1), `max` (number | null), `onChange` (value: number)
- **State**: `isDisabled` (boolean)
- **Interaction**: Click increment/decrement buttons, type directly
- **Validation**: Min/max enforcement, prevent negative values
- **Accessibility**: `type="number"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

## Interaction Patterns

### Add to Cart Flow
1. User clicks "Add to cart" on ProductCard
2. Modal/toast appears confirming addition
3. Cart count updates in header
4. Product size/color selector shown in modal
5. User can continue shopping or view cart

### Size/Color Selection
1. User opens size/color selector on Product Detail
2. Hover reveals color/size labels
3. User selects desired size and/or color
4. "Add to cart" button becomes enabled with selected options
5. Selection persists if user navigates away and returns

### Checkout Wizard
1. User clicks "Proceed to checkout" in cart
2. Step 1 (Shipping) form validates on submit
3. User progresses to Step 2 (Payment)
4. Form validates payment information
5. User confirms order on Step 3
6. Order submission shows loading spinner
7. Success: Order confirmation page with order number
8. Error: Inline messages with options to fix or retry

### Login/Registration Flow
1. User clicks login link
2. Modal opens with tabbed login/registration
3. Form validates on submit
4. Success: Redirect to original page or home
5. Error: Inline validation messages remain visible

### Filter and Sort
1. User selects filter options (category, price range)
2. Products update in real-time (debounced 300ms)
3. Selected filters shown as chips at top
4. User can clear all filters or select new ones
5. Sort options change product ordering instantly

## Responsive Behavior

### Mobile (<640px)
- Single column product grid
- Hamburger navigation
- Bottom tab bar for primary actions
- Full-width forms with stacked layout

### Tablet (640-1024px)
- Two column product grid
- Collapsible navigation sections
- Forms with left-right layout where possible

### Desktop (>1024px)
- Four column product grid
- Full navigation visible
- Compact form layouts

## Accessibility Checklist (see accessibility-checklist.md)

All components must meet WCAG 2.1 AA compliance.