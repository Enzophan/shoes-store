# Requirements Analysis Questions

## Storage Approach

```question
prompt: "For the Banners Management bugfix, how should banner data be persisted?"
header: "Storage Backend"
multiSelect: false
options:
  - label: "Prisma / PostgreSQL"
    description: "Add Banner model to Prisma schema, consistent with products/variants/orders"
  - label: "In-Memory with Documentation"
    description: "Keep existing in-memory approach, add documentation noting the limitation"
  - label: "Focused Scan First"
    description: "Run focused scan to assess current state before deciding"
```

## Navigation Link Text

```question
prompt: "What should the text of the Banners Management navigation link say?"
header: "Navigation Label"
multiSelect: false
options:
  - label: "Banners Management"
    description: "Full text label for the dashboard link"
  - label: "Banners"
    description: "Shorter link text"
  - label: "Custom (please specify)"
    description: "Enter custom link text"
```
```

```question
prompt: "Enter custom navigation link text if you selected 'Custom':"
header: "Custom Label"
description: "Free text input for custom link text"
```

## Banner Initial Data

```question
prompt: "Should sample banners be seeded on database migration?"
header: "Seed Data"
multiSelect: false
options:
  - label: "Yes, seed sample banners"
    description: "Add 3 sample banners (spring, summer, autumn) on migration"
  - label: "No, empty state is acceptable"
    description: "Migration creates Banner model with no initial data"
  - label: "Decision depends on Q1 (storage approach)"
    description: "Choose storage approach first, then decide on seed data"
```
```

## Consolidated Summary Confirmation

- [ ] Does this all look correct before I generate the requirements artifact?
  - [Answer]: Looks correct
  - [ ] Request changes
  - [Answer]: