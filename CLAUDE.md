# uslehne — CLAUDE.md

## Project Overview

**uslehne.ch** — a web application with a React/TypeScript frontend and Node.js/Express/TypeScript REST API backend, deployed on [Scalingo](https://scalingo.com).

## Stack

| Layer    | Technology                     | Notes                                    |
|----------|--------------------------------|------------------------------------------|
| Frontend | React 18 + TypeScript + Vite   | Styled with styled-components v6         |
| Backend  | Node.js + Express + TypeScript | REST API, compiled to CommonJS           |
| ORM      | Prisma                         | PostgreSQL, migrations via prisma migrate |
| Database | PostgreSQL                     | Scalingo PostgreSQL addon                |
| Hosting  | Scalingo                       | PaaS, European cloud (GDPR-friendly)     |

> **Why Node.js over C#?** Scalingo does not officially support .NET/C# buildpacks. Node.js is officially supported and the most natural choice for a REST API on this platform.

## Repository Structure

```
uslehne/
├── .claude/
│   └── skills/              # Claude skill definitions
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Prisma schema (models + db config)
│   │   └── seed.ts          # Seed script (npm run db:seed)
│   ├── src/
│   │   ├── db.ts            # Prisma client singleton
│   │   ├── index.ts         # Express app entry point
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   └── routes/
│   │       ├── health.ts    # GET /api/v1/health
│   │       └── items.ts     # CRUD /api/v1/items
│   ├── .env.example
│   ├── package.json
│   ├── Procfile             # Scalingo: web: node dist/index.js
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx              # ThemeProvider root
│   │   ├── GlobalStyle.ts       # Global CSS reset
│   │   ├── theme.ts             # Design tokens
│   │   ├── styled.d.ts          # DefaultTheme augmentation
│   │   └── components/
│   │       ├── Header.tsx       # Component logic only
│   │       ├── Header.styled.ts # Styled components for Header
│   │       ├── Hero.tsx
│   │       ├── Hero.styled.ts
│   │       ├── ItemList.tsx     # Fetches /api/v1/items
│   │       └── ItemList.styled.ts
│   ├── index.html
│   ├── eslint.config.js
│   ├── vite.config.ts       # Proxies /api → backend in dev
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.node.json
├── .gitignore
├── .prettierrc              # Shared Prettier config
├── CLAUDE.md
├── LICENSE                  # WTFPL
└── README.md
```

## Development

### Prerequisites
- Node.js >= 20
- PostgreSQL running locally

### Run locally

```bash
# Backend
cd backend
cp .env.example .env        # fill in DATABASE_URL
npm install
npm run db:migrate:dev      # run migrations
npm run db:seed             # optional: seed demo data
npm run dev                 # starts on :3001 with tsx watch

# Frontend (separate terminal)
cd frontend
npm install
npm run dev                 # starts on :5173, proxies /api → :3001
```

### Typed theme in styled-components

The theme is declared in `frontend/src/theme.ts`. To get full TypeScript support in styled-components, add a `styled.d.ts` declaration if needed:

```ts
// src/styled.d.ts
import { Theme } from './theme'
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

## Scalingo Deployment

Each app is a separate Scalingo application. Backend requires the **PostgreSQL** addon.

```bash
# Deploy backend (run from repo root)
git subtree push --prefix backend scalingo-backend main

# Deploy frontend
git subtree push --prefix frontend scalingo-frontend main
```

## API Routes

| Method | Path                           | Description                        |
|--------|--------------------------------|------------------------------------|
| GET    | /api/v1/health                 | Health + DB check                  |
| GET    | /api/v1/offers                 | List offers (cursor, limit, zip)   |
| GET    | /api/v1/offers/:id             | Get offer by id                    |
| POST   | /api/v1/offers                 | Create offer                       |
| PATCH  | /api/v1/offers/:id             | Update offer                       |
| DELETE | /api/v1/offers/:id             | Delete offer                       |
| POST   | /api/v1/offers/:id/request     | Request an offer                   |
| GET    | /api/v1/transactions           | List transactions (role=incoming/outgoing) |
| POST   | /api/v1/transactions/:id/accept  | Accept request                   |
| POST   | /api/v1/transactions/:id/decline | Decline request                  |
| POST   | /api/v1/transactions/:id/cancel  | Cancel request                   |
| POST   | /api/v1/transactions/:id/return  | Mark as returned                 |
| POST   | /api/v1/transactions/:id/rate    | Rate requester (1–5 stars)       |
| GET    | /api/v1/users/:id              | Public user profile                |
| GET    | /api/v1/karma/ledger           | Karma history (own)                |
| GET    | /api/v1/invites                | List own invites                   |
| POST   | /api/v1/invites                | Create invite                      |
| GET    | /api/v1/invites/:code          | Check invite code                  |
| GET    | /api/v1/addresses              | List own addresses                 |
| POST   | /api/v1/addresses              | Create address                     |
| DELETE | /api/v1/addresses/:id          | Delete address                     |
| POST   | /api/v1/auth/register          | Register with invite               |
| POST   | /api/v1/auth/login             | Login                              |
| GET    | /api/v1/auth/me                | Current user                       |

## Skills

| Skill           | Description                                              |
|-----------------|----------------------------------------------------------|
| `run`           | Start the dev environment locally                        |
| `deploy`        | Deploy to Scalingo                                       |
| `design-review` | Full design audit — spacing, a11y, responsive, 2026 best practices |

## Conventions

### General
- API routes prefixed `/api/v1/`
- Strict TypeScript throughout (no `any`)
- Prisma migrations committed in `prisma/migrations/`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`)

### File size & structure
- **Max 150 lines per file** — if a file grows beyond this, split it
- **One component per file** — no multiple exported components in one `.tsx`
- **Styling in a separate file** — every component `Foo.tsx` has a sibling `Foo.styled.ts` that contains all its styled-components; never define styled components inside a component file

### Linting & formatting
- ESLint + Prettier are configured in both `frontend/` and `backend/`
- Run `npm run lint` to check, `npm run lint:fix` to auto-fix, `npm run format` to format
- Prettier config lives at the repo root (`.prettierrc`) and applies to both apps
- **Never commit code that fails lint or has unformatted files** — run format + lint before committing

### UI copy & writing style
- All UI text, error messages, empty states, buttons, and email templates must follow **[docs/UX_WRITING.md](docs/UX_WRITING.md)**
- Typography, gender language, and punctuation rules are in **[docs/TYPOGRAFIE.md](docs/TYPOGRAFIE.md)**
- German locale strings live in `frontend/src/locales/de/`; hardcoded strings in components should be moved there
- When writing or reviewing any copy: check against UX_WRITING.md before committing

### Styled-components
- All theme tokens live in `frontend/src/theme.ts`
- Full TypeScript support via `frontend/src/styled.d.ts` — `DefaultTheme` extends `Theme`
- Global reset in `frontend/src/GlobalStyle.ts`
- Never use inline `style={{}}` for anything covered by the theme
