# User Stories — Planning Questions

## Persona Development Approach

**Who are the users?** Based on requirements and business overview:

1. **Admin / Content Manager** — Manages banner content, uploads images, sets display order, toggles active state
2. **Shopper / Site Visitor** — Views homepage carousel, clicks banners to navigate to promotions
3. **Marketing Stakeholder** (secondary) — Reviews banner performance, requests content changes

**What are their goals?**

| Persona | Primary Goal | Pain Points |
|---------|-------------|-------------|
| Admin | Efficiently manage promotional banners without technical help | Manual code changes for banner updates; no preview; hard to reorder |
| Shopper | Discover promotions visually without friction | Static hero doesn't rotate; no pause control; accessibility gaps |
| Marketing | Measure banner effectiveness | No click data; can't A/B test; scheduling not available |

---

## Story Format

Using **INVEST criteria** (Independent, Negotiable, Valuable, Estimable, Small, Testable):

- **Format**: "As a [persona], I want [goal], so that [benefit]"
- **Acceptance Criteria**: Given/When/Then (BDD) format per inception guardrails
- **ID Scheme**: `US{group}.{seq}` (e.g., `US1.1`, `US2.1`)
- **AC ID Scheme**: `AC{group}.{seq}.{criterion}` (e.g., `AC1.1.1`)

---

## Story Prioritization (MoSCoW)

Based on requirements analysis MVP boundary:

| Priority | Stories | Rationale |
|----------|---------|-----------|
| **Must Have** | Admin CRUD, Carousel display, Accessibility, Homepage integration | Core MVP per requirements FR-1 through FR-7 |
| **Should Have** | Click tracking (analytics event), Drag-drop reorder UX | FR-8, FR-3 reorder — valuable but not blocking launch |
| **Could Have** | Banner scheduling preview, Keyboard shortcuts for admin | Nice-to-have enhancements |
| **Won't Have** | A/B testing, Audience targeting, Visual builder, Video banners | Explicitly out of scope per requirements |

---

## Breakdown Approach Options

Answer: A

**Selected: A. By Feature** — Separate epics for Admin CRUD, Public Carousel, Analytics (clear separation of concerns)

---

## Embedded Questions

### Q1: Persona Granularity
**Question**: Should we distinguish between "Content Manager" (creates/edits) and "Admin" (full access including delete/reorder), or treat as single "Admin" persona?
**Options**:
- A. Single "Admin" persona (simpler, matches current auth model)
- B. Separate "Content Manager" and "Admin" personas (more granular permissions later)
- X. Other (please specify)

**Recommendation**: A — Current auth doesn't differentiate; single persona keeps MVP focused.

Answer: A

### Q2: Story Granularity for Carousel
**Question**: Should the carousel be one story ("As a shopper, I want a rotating banner carousel...") or split into multiple stories (auto-play, manual nav, accessibility, responsive)?
**Options**:
- A. Single story with multiple ACs (carousel is one cohesive feature)
- B. Separate stories per behavior (auto-play, navigation, accessibility, responsive)
- X. Other (please specify)

**Recommendation**: B — Separate stories improve testability and allow independent prioritization of accessibility.

Answer: B

### Q3: Click Tracking as Story
**Question**: Should click tracking (FR-8) be its own story or part of the carousel story?
**Options**:
- A. Separate story: "As a marketing stakeholder, I want banner clicks tracked..."
- B. Part of carousel story: "As a shopper, I can click banners... and my clicks are tracked"
- X. Other (please specify)

**Recommendation**: A — Different persona (marketing), different value prop, separable implementation.

Answer: A

### Q4: Admin Reorder Story
**Question**: Drag-and-drop reorder (FR-3) — separate story or part of admin CRUD?
**Options**:
- A. Separate story: "As an admin, I want to drag-drop reorder banners..."
- B. Part of "manage banners" story with AC for reordering
- X. Other (please specify)

**Recommendation**: A — Distinct UX interaction, separate implementation (@dnd-kit), different test approach.

Answer: A

---

## Consolidated Summary Confirmation

**Does this story plan look correct before proceeding to generation?**

[Answer]: Looks correct

**Selected: Looks correct** — Proceed to story generation

---

## Gate Approval

**All user stories artifacts have been generated and reviewed. Please approve to proceed to the next stage.**

**Artifacts Produced:**
- `personas.md` — 3 personas (Admin, Shopper, Marketing Stakeholder)
- `stories.md` — 14 user stories with BDD acceptance criteria (11 Must Have, 2 Should Have, 1 Could Have)
- `user-stories-assessment.md` — Execute decision with rationale
- `traceability.json` — 15 requirements traced to stories (OK/Deferred)
- `contributions/aidlc-design-agent.md` — UX/persona fidelity feedback
- `contributions/aidlc-developer-agent.md` — Implementability/sizing feedback  
- `contributions/aidlc-quality-agent.md` — Testability/quality feedback

**Sensors Validated:**
- required-sections: All required H2 headings present
- upstream-coverage: All requirements consumed and traced
- traceability: Element-level traceability.json valid

**Review:** Advisory review by Product Lead (aidlc-product-lead-agent) on stories.md

**Next Stage:** Refined Mockups

**Options:**
- A. Approve — Continue to Refined Mockups
- B. Request Changes — Return to User Stories for revision

**Format your response as:**
```
A
```

or

```
B
```

[Answer]: