# Requirements Analysis - Bugfix: Admin page, don't see Banners Management

## Intent Analysis
The user wants to fix the issue where the Banners Management feature is not visible on the admin page. This is a brownfield Next.js/React project with an existing codebase. The fix should make the Banners Management feature accessible and functional for admin users.

## Functional Requirements

### FR1: Add Banners Management Navigation Link
- **ID**: FR1
- **Description**: Add a navigation link to the Banners Management page in the admin dashboard
- **Location**: `src/app/admin/page.tsx`
- **Acceptance**: Admin user can navigate to `/admin/banners` from the dashboard

### FR2: Re-enable Banners API Fetch
- **ID**: FR2
- **Description**: Enable the API data fetch in the Banners Management UI component
- **Location**: `src/app/admin/banners/page.tsx`
- **Acceptance**: Banners data populates from `/api/banners` endpoint on page load

### FR3: Add Banner Model to Prisma Schema
- **ID**: FR3
- **Description**: Add Banner model to `prisma/schema.prisma` for database-backed storage
- **Location**: `prisma/schema.prisma`
- **Acceptance**: Banner model exists with fields: id, imageUrl, linkUrl, displayOrder, isActive

### FR4: Ensure Banner API Persistence
- **ID**: FR4
- **Description**: Update `/api/banners/route.ts` to use Prisma-backed storage instead of in-memory array
- **Location**: `src/app/api/banners/route.ts`
- **Acceptance**: Banner data persists across server restarts

## Non-Functional Requirements

### NFR1: Maintain Consistency with Existing Data Layer
- **ID**: NFR1
- **Description**: Banner storage should be consistent with existing Prisma-backed features (products, variants, orders)
- **Priority**: High - maintains architectural consistency

### NFR2: minimal Disruption to Existing Functionality
- **ID**: NFR2
- **Description**: Changes should not break existing product/order management functionality
- **Priority**: High - preserves current workflow

### NFR3: Type Safety
- **ID**: NFR3
- **Description**: All changes should maintain TypeScript type safety
- **Priority**: Medium - existing type conventions should be followed

## Constraints

### C1: Existing Database Migration
- Must handle database migration for new Banner model without data loss
- May require seed data for existing installations

### C2: Backward Compatibility
- Changes should not break existing admin functionality
- Existing products and orders must continue to work

### C3: Minimal Changes
- Bugfix scope: only fix the identified issue, no broader refactoring
- Priority: High - bugfix scope constraint

## Assumptions

### A1: Database Access
- Project has PostgreSQL database accessible via Prisma
- Migrations can be applied

### A2: Admin User Role
- Admin users have access to navigation and management features
- No additional permission changes required

### A3: Codebase Stability
- No other pending changes that would conflict with these fixes
- Changes can be merged to main branch

## Out of Scope

### OS1: Full Banner UI Redesign
- Only fixing visibility and data persistence, not redesigning the UI

### OS2: New Banner Features
- Adding edit/delete functionality beyond what exists
- New banner types or collection features

### OS3: Performance Optimization
- Not addressing performance concerns beyond baseline functionality

## Open Questions

### Q1: Storage Approach
- Should banners use Prisma/PostgreSQL (consistent with products) or remain in-memory with documentation?
- **Decision needed**: Required for FR3/FR4 implementation

### Q2: Navigation Link Text
- What should the navigation link text be? "Banners Management", "Banners", or custom?
- **Decision needed**: Affects FR1 implementation

### Q3: Banner Initial Data
- Should sample banners be seeded on migration, or is empty state acceptable?
- **Decision needed**: Affects C1 backward compatibility

## Traceability

- **Related Bug**: "Admin page, don't see Banners Management"
- **Reverse Engineering**: Completed 2026-10-11, identified root causes
- **CodeKB Artifacts**: business-overview.md, architecture.md, code-structure.md
- **Dependencies**: FR1 depends on FR3, FR2 depends on FR4, FR3/FR4 require database migration