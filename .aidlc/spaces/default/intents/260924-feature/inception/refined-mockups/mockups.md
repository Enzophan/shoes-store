# Refined Mockups

## Product Catalog Mockup

### Grid Layout
- Products displayed in responsive grid
- Mobile: 1 column, tablet: 2 columns, desktop: 4 columns
- Each product card: image at top, title below, price at bottom
- Hover effect: lift animation, quick view overlay

### Quick View Modal
- Image thumbnail carousel
- Price, available sizes/colors
- "Add to cart" button with size/color selector

## Product Detail Mockup

### Page Sections
- Hero image gallery (thumbnail navigation)
- Product title and brand
- Price with strikethrough for discounts
- Size/color selector with swatches
- Quantity selector
- "Add to cart" and "Save to wishlist" buttons
- Product description accordion
- Related products section

### States
- **Loading**: Skeleton placeholders
- **Empty**: State when no products match filters
- **Error**: Message with retry option
- **Success**: Toast confirmation after add to cart

## Cart Mockup

### Cart Drawer/Modal
- Summary of items with thumbnail, name, price, quantity
- Plus/minus buttons for quantity adjustment
- "Remove" button per item
- Subtotal, shipping, total calculation
- "Proceed to checkout" and "Continue shopping" buttons

### States
- Empty cart state with "Start shopping" CTA
- Item removed confirmation
- Cart saved for later message

## Checkout Mockup (Multi-step Wizard)

### Step 1: Shipping
- Address form with validation
- Save address checkbox
- Select shipping method with costs
- Estimated delivery date display

### Step 2: Payment
- Credit card form with real-time validation
- Saved payment methods selector
- PayPal or alternative payment option
- Placeholder for card numbers (masked)

### Step 3: Confirmation
- Order summary
- Terms and acceptance checkbox
- Place order button

### States
- **Loading**: Spinner with "Placing order..."
- **Success**: Order confirmation page with order number
- **Error**: Inline error messages with fix options

## Account/Login Mockup

### Login Form
- Email and password fields
- "Remember me" checkbox
- Forgot password link
- Divider with "Continue with Google/Apple" options

### Registration Form
- Name, email, password fields
- Terms acceptance
- "Already have an account?" link

### States
- Success: Redirect to original page with toast
- Error: Inline validation messages

## Order History Mockup

### Page Structure
- Header with "Orders" title
- List of orders with:
  - Order number and date
  - Total amount
  - Status badge (processing, shipped, delivered)
- Expandable order details:
  - Items purchased
  - Shipping address
  - Tracking number (when shipped)
  - Return button

### Empty State
- "No orders yet" message with "Start your first order" CTA