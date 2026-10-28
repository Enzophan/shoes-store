# EditVariant Feature — Implementation Plan

Project: `shoes-store` (`/home/hiennhan/Desktop/git/shoes-store`)
Date: 2026-10-29
Status: Implemented

## Goal

Make the admin "Variants" section actually persist changes. Today the Save button is a
no-op and Add/Remove only mutate local component state.

## Confirmed decisions

- Per-row **Save** (POST for new rows, PATCH for existing rows).
- Deleting a variant referenced by existing orders is **blocked** with a 409 error.
- A product must keep **at least one variant** (Remove is hidden/disabled when
  `variants.length === 1`).

## Current state

| Location | Problem |
| --- | --- |
| `src/app/admin/products/[id]/EditVariant.tsx` | `Save` is `onClick={() => {}}`; Add/Remove only touch local state; new rows use `id: undefined`; `useRouter` imported but unused. |
| `src/app/api/admin/variants/[id]/route.ts` | Only `PATCH` exists, and it only accepts `{ inventory, price }`. |
| `src/app/api/admin/variants/route.ts` | Does not exist — no create endpoint. |
| `src/app/admin/products/[id]/EditProduct.tsx` | Holds a duplicate `variants` state that never syncs back; unused `handleInventorySave`; commented-out table. |
| `prisma/schema.prisma` | `Variant.sku` is `@unique`; `Variant` is referenced by `OrderItem` (required relation → default `Restrict`). No schema change needed. |

## Plan

### 1. Validation helpers — `src/lib/validation.ts`

Add pure functions so the rules are testable and shared by API routes and the UI:

- `validateVariantInput(input)` → `{ valid: boolean; errors: string[] }`
  - `productId`: positive integer
  - `sku`, `color`, `size`: non-empty strings (trimmed)
  - `price`: number, finite, `> 0`
  - `inventory`: integer `>= 0`
- `validateVariantPatch(input)` → `{ valid: boolean; errors: string[] }`
  - Same field rules, all optional, at least one known field present.

### 2. API routes

**`src/app/api/admin/variants/[id]/route.ts`**

- `PATCH`
  - Accept partial `{ sku?, color?, size?, price?, inventory? }` (keeps the existing
    inventory/price caller working).
  - Validate with `validateVariantPatch`; return 400 on errors.
  - Return the full updated variant.
  - Map Prisma errors: `P2025` → 404, `P2002` → 400 `"SKU already exists"`.
- `DELETE`
  - 404 if the variant does not exist.
  - Check for related `OrderItem`s (via `_count` or catch `P2003`/`P2014`); return
    **409** `"Cannot delete variant with existing orders"`.
  - Otherwise delete and return `{ success: true }`.

**New `src/app/api/admin/variants/route.ts`**

- `POST`
  - Validate with `validateVariantInput`.
  - Confirm the product exists → 404 otherwise.
  - Create the variant; return **201** with the full record.
  - Map `P2002` → 400 `"SKU already exists"`.

### 3. `src/app/admin/products/[id]/EditVariant.tsx`

- Props: `{ productId: number; initialVariants: Variant[] }`.
- Row state: `isNew`, `isSaving`, `isDeleting`, `error`.
- **Save**
  - `POST /api/admin/variants` when `id` is undefined.
  - `PATCH /api/admin/variants/:id` otherwise.
  - Client-side validation first; on success replace the row with the server
    response (new rows receive their real `id`) and call `router.refresh()`.
- **Remove**
  - Unsaved rows: remove locally.
  - Saved rows: `DELETE`, then remove on success; show the 409 message inline.
  - Keep the "at least one variant" guard.
- Disable a row's buttons while saving/deleting.
- Show section-level success and per-row error messages using the existing
  `bg-rose-soft border-rose` styling.
- Validation mirrors the API: required SKU/color/size, `price > 0`,
  `inventory >= 0`.
- Keep the existing Tailwind classes and layout (no visual redesign).

### 4. `src/app/admin/products/[id]/EditProduct.tsx`

- Remove the duplicated `variants` state.
- Render `<EditVariant productId={product.id} initialVariants={product.variants ?? []} />`.
- Delete the unused `handleInventorySave` and the commented-out variants table.

### 5. Tests — `src/__tests__/validation.test.ts`

- `validateVariantInput`: valid case, missing fields, wrong types, `price <= 0`,
  negative/non-integer inventory.
- `validateVariantPatch`: valid partials, empty object, invalid field values.

### 6. Verification

```bash
npm test
npm run build
```

Manual check:
1. Open `/admin/products/<id>`.
2. Edit SKU/color/size/price/inventory of an existing variant → Save → reload shows
   the new values.
3. Add a variant → Save → row gets an id and survives reload.
4. Remove a variant with no orders → gone after reload.
5. Try to remove a variant attached to an order → inline 409 message, row remains.
6. Try saving a duplicate SKU → inline "SKU already exists".
7. Remove button stays unavailable when only one variant remains.

## Out of scope

- No Prisma schema change or migration.
- No authentication changes.
- No bulk-save endpoint (per-row save was chosen).
- No soft-delete of variants.

## Result (2026-10-29)

- All items above implemented.
- `npx jest src/__tests__/validation.test.ts` → 29 tests passed.
- `npx tsc --noEmit` → no errors in changed files; only pre-existing
  `TS1117` duplicate-key errors in `src/__tests__/orderService.test.ts`.
- `npm run build` → blocked by a pre-existing, unrelated type error in
  `src/app/admin/banners/add/page.tsx` (invalid default export).
