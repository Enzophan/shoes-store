# Dependencies — shoes-store

## Production Dependencies
| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| next | 14.x | MIT | React framework |
| react | 18.x | MIT | UI library |
| react-dom | 18.x | MIT | React DOM renderer |
| @prisma/client | 5.x | Apache-2.0 | Database client |

## Development Dependencies
| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| typescript | 5.x | Apache-2.0 | Type checker |
| @types/react | 18.x | MIT | React types |
| @types/node | 20.x | MIT | Node.js types |
| tailwindcss | 3.x | MIT | CSS framework |
| postcss | 8.x | MIT | CSS processor |
| autoprefixer | 10.x | MIT | CSS prefixer |
| prisma | 5.x | Apache-2.0 | ORM CLI |
| eslint | 8.x | MIT | Linter |
| eslint-config-next | 14.x | MIT | Next.js ESLint config |
| jest | 29.x | MIT | Test runner |
| @testing-library/react | 14.x | MIT | React testing utilities |
| @testing-library/jest-dom | 6.x | MIT | Jest DOM matchers |

## For Banner Feature (To Add)
| Package | Version | License | Purpose |
|---------|---------|---------|---------|
| swiper | 11.x | MIT | Carousel/slider library |
| @types/swiper | (built-in) | MIT | TypeScript types |

## Dependency Graph
```
shoes-store
├── next
│   ├── react
│   └── react-dom
├── @prisma/client
│   └── (generated from schema)
├── swiper (to add)
└── Dev toolchain
    ├── typescript
    ├── tailwindcss
    ├── postcss
    ├── eslint
    └── jest
```

## Security Considerations
- No known vulnerabilities in current dependencies (run `npm audit`)
- Prisma uses parameterized queries (SQL injection safe)
- Next.js handles XSS protection in Server Components
- No authentication library (admin routes unprotected)

## Update Policy
- Patch updates: Auto-merge via Dependabot
- Minor updates: Review changelog, test
- Major updates: Plan migration sprint