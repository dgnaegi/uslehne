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
│   │   ├── App.tsx          # ThemeProvider root
│   │   ├── GlobalStyle.ts   # Global CSS reset
│   │   ├── theme.ts         # Design tokens
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── Hero.tsx
│   │       └── ItemList.tsx # Fetches /api/v1/items
│   ├── index.html
│   ├── vite.config.ts       # Proxies /api → backend in dev
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.node.json
├── .gitignore
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

# On first deploy, run migrations via Scalingo CLI:
scalingo --app uslehne-api run npm run db:migrate

# Deploy frontend
git subtree push --prefix frontend scalingo-frontend main
```

## API Routes

| Method | Path                | Description         |
|--------|---------------------|---------------------|
| GET    | /api/v1/health      | Health + DB check   |
| GET    | /api/v1/items       | List all items      |
| GET    | /api/v1/items/:id   | Get item by id      |
| POST   | /api/v1/items       | Create item         |
| DELETE | /api/v1/items/:id   | Delete item         |

## Skills

| Skill     | Description                        |
|-----------|------------------------------------|
| `run`     | Start the dev environment locally  |
| `deploy`  | Deploy to Scalingo                 |

## Conventions

- API routes prefixed `/api/v1/`
- Strict TypeScript throughout (no `any`)
- styled-components with typed theme via `ThemeProvider`
- Prisma migrations committed in `prisma/migrations/`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`)
