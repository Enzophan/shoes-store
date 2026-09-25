# Component Inventory — shoes-store

## Reusable Components

### ProductCard (`app/components/ProductCard.tsx`)
- **Props**: `{ product: Product }`
- **Features**: Image, drop tag (BEST/NEW/DEAL/RESTOCK), category, name, price
- **Variants**: None (single component)
- **Used in**: Homepage featured, category strips, product listing
- **Styling**: Tailwind, aspect-square, hover scale animation
- **Accessibility**: aria-label with name and price

### DropTag (inline in ProductCard & page.tsx)
- **Variants**: rose, ink, stone, pearl
- **Labels**: BEST, FW25 ↓, DEAL, RESTOCK, ARCHIVE
- **Styling**: font-mono, rounded badge

### Link Wrappers (Next.js Link)
- Used throughout for navigation
- No custom Link component

## Page-Level Components (Inline)

### Homepage (`app/page.tsx`)
| Section | Component | Lines |
|---------|-----------|-------|
| Hero Banner | Inline static section | 68-96 |
| Highlights Bar | Inline nav with Links | 99-119 |
| Featured Edit | Inline grid with hero + cards | 121-197 |
| Category Strips | Inline horizontal scroll sections | 199-252 |
| DropTag | Inline function component | 42-54 |
| getDropTag | Helper function | 34-40 |
| clampText4xl5xl | Fluid typography helper | 266-275 |

### Admin Products
| File | Components |
|------|------------|
| `page.tsx` | Product list table (inline) |
| `new/page.tsx` | Create form (inline) |
| `[id]/page.tsx` | Product detail view |
| `[id]/EditProduct.tsx` | Edit form (inline) |

## Missing/Needed for Banner Feature

### New Components Needed
1. **BannerCarousel** — Auto-rotating carousel (3-10 slides, 10s interval)
   - Pause on hover/focus
   - Keyboard navigation
   - Touch/swipe support
   - Reduced motion preference
   - ARIA live region for slide announcements

2. **BannerSlide** — Individual slide component
   - Image (Next.js Image optimized)
   - Headline, subtext, CTA button
   - Link handling

3. **Admin Banner Management**
   - BannerList (table/grid)
   - BannerForm (create/edit)
   - Drag-drop reordering (nice-to-have)

### Integration Points
- **Homepage**: Replace static hero (lines 68-96) with `<BannerCarousel />`
- **Admin Dashboard**: Add "Manage Banners" card linking to `/admin/banners`
- **Admin Routes**: New `/admin/banners` page + API routes

## Styling System
- **Tailwind CSS** with custom theme colors:
  - `--ink` (near-black), `--chalk` (off-white), `--rose` (brand pink)
  - `--rose-soft`, `--stone`, `--pearl` (semantic colors)
- **Typography**: `font-display` (headings), `font-mono` (labels/prices)
- **Animations**: `transition-transform`, `transition-colors`, `duration-500`