# Design System Mapping

## Existing Components

| Component | Pattern | Status |
|-----------|---------|--------|
| Button | Primary, secondary, ghost, danger | ✅ Available |
| Input | Text, email, password, number | ✅ Available |
| Select | Single select, multi-select | ✅ Available |
| Modal | Simple, confirmed, full-width | ✅ Available |
| Card | Product card, project card | ✅ Available |
| Badge | Status, category, tag | ✅ Available |
| Avatar | Image with initials | ✅ Available |
| Tabs | Horizontal, vertical | ✅ Available |

## New Components to Design

| Component | Description | Priority |
|-----------|-------------|----------|
| ProductCard | Shoe product display with image, name, price, size/color selector | Must Have |
| SizeSelector | Visual size selection with hover labels | Must Have |
| ColorSwatch | Color selection with swatches | Must Have |
| QuantityInput | Number input with increment/decrement buttons | Must Have |
| PriceBadge | Formatted price with strikethrough for comparison | Should Have |
| FilterChip | Selected filter chip with close icon | Should Have |
| EmptyState | State images for empty cart, no results, error | Could Have |

## Design Tokens Mapping

### Color Variables
- `--ink`: Text color (#18181B) - primary text
- `--chalk`: Background color (#F5F5F5) - surfaces
- `--rose`: Accent color (#BC5090) - primary actions, focus states
- `--rose-soft`: Light accent (#F4C2C9) - hover backgrounds, disabled states

### Typography Scale
- `text-xs`: 0.75rem (12px) - captions, metadata
- `text-sm`: 0.875rem (14px) - body text, prices
- `text-base`: 1rem (16px) - default body
- `text-lg`: 1.125rem (18px) - section headers
- `text-xl`: 1.25rem (20px) - product titles
- `text-2xl`: 1.5rem (24px) - headers, H2

### Spacing Scale
- `space-1`: 0.25rem (4px) - inner spacing
- `space-2`: 0.5rem (8px) - gutters
- `space-3`: 0.75rem (12px) - card padding
- `space-4`: 1rem (16px) - section margins
- `space-6`: 1.5rem (24px) - page padding
- `space-8`: 2rem (32px) - major sections

### Border Radius
- `radius-sm`: 0.125rem (2px) - inputs, buttons
- `radius-md`: 0.375rem (6px) - product cards, modals
- `radius-lg`: 0.5rem (8px) - top-level containers

### Shadow Scale
- `shadow-sm`: 0 1px 2px 0 rgba(0,0,0,0.05) - subtle elevation
- `shadow-md`: 0 4px 6px -1px rgba(0,0,0,0.1) - cards, modals
- `shadow-lg`: 0 10px 15px -1px rgba(0,0,0,0.1) - page containers