# User Personas — Homepage Banner Management

## Primary Personas

### P1: Admin (Content Manager)
**Role**: Store administrator / Marketing content manager
**Goals**:
- Update promotional banners without developer assistance
- Control which banners display and in what order
- Preview changes before publishing
- Efficiently manage seasonal campaigns

**Pain Points**:
- Currently requires code changes to update hero banner
- No visual preview of banner changes
- Reordering requires manual database edits
- No way to schedule banners for future campaigns

**Context**:
- Accesses `/admin/banners` dashboard
- Comfortable with web-based CMS interfaces
- May not have technical/HTML skills
- Works on desktop during business hours

**Priority**: Highest — Primary user of admin features

---

### P2: Shopper (Site Visitor)
**Role**: Potential customer browsing the shoe store
**Goals**:
- Discover current promotions and new arrivals visually
- Navigate to relevant product pages from promotions
- Smooth, non-intrusive browsing experience
- Accessible experience (keyboard, screen reader compatible)

**Pain Points**:
- Static hero banner shows only one promotion
- Auto-play carousels often move too fast or can't be paused
- No keyboard navigation for carousel
- Images load slowly causing layout shift

**Context**:
- Visits homepage on mobile and desktop
- May use keyboard-only navigation
- May use screen reader (accessibility)
- Attention span: ~3 seconds for hero content

**Priority**: Highest — Revenue-generating audience

---

## Secondary Persona

### P3: Marketing Stakeholder
**Role**: Marketing manager / Campaign owner
**Goals**:
- Measure banner click-through rates
- Understand which promotions drive traffic
- Request banner updates for campaigns
- Eventually: A/B test banner variants

**Pain Points**:
- No visibility into banner performance
- Cannot correlate banners with sales
- Relies on developers for any changes

**Context**:
- Reviews analytics weekly/monthly
- Provides creative assets (images, copy)
- Not a daily admin user

**Priority**: Medium — Influences requirements but not daily user

---

## Persona Relationships & Priority Ranking

```
Priority 1 (Must Have):  P1 Admin, P2 Shopper
Priority 2 (Should Have): P3 Marketing Stakeholder
```

**Relationships**:
- Admin creates content → Shopper consumes content
- Marketing provides direction → Admin implements → Shopper sees
- Marketing analyzes results → Informs future Admin work

---

## Persona Validation Notes

- **P1 Admin**: Aligns with existing `/admin` routes and auth pattern
- **P2 Shopper**: Aligns with public homepage and product browsing flows
- **P3 Marketing**: Secondary; stories for this persona are "Should Have" priority

---

## Integration Notes from Mob Collaboration

**Design Agent Feedback Incorporated**:
- Added "Preview mode" consideration for P1 Admin (US1.1/1.4 ACs)
- Explicit "Reduced Motion" variant noted for P2 Shopper (US2.3 AC2.3.5)
- Touch gesture expectations documented for mobile (US2.1 AC2.1.3)
- Loading state design: blur placeholder for LCP (US2.5 AC2.5.1)

**Developer Agent Feedback Incorporated**:
- Drag-drop reorder (US1.6) moved to "Could Have" due to complexity
- Carousel split: US2.1 (display) + US2.1a (auto-play) for progressive enhancement
- Accessibility (US2.3) expanded with explicit WCAG SC references
- Technical implementation notes captured in contribution files

**Quality Agent Feedback Incorporated**:
- US2.3 ACs include automated (axe-core) and manual testing criteria
- Test strategy documented per story in quality contribution
- Performance budgets as CI gate (US2.5)