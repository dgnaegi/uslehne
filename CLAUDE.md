# uslehne — CLAUDE.md

## Project Overview

**uslehne.ch** — a web application with a React frontend and Node.js/Express REST API backend, deployed on [Scalingo](https://scalingo.com).

## Stack

| Layer    | Technology         | Notes                              |
|----------|--------------------|------------------------------------|
| Frontend | React (Vite)       | Deployed as static build or Scalingo app |
| Backend  | Node.js + Express  | REST API, deployed on Scalingo     |
| Hosting  | Scalingo           | PaaS, European cloud (GDPR-friendly) |

> **Why Node.js over C#?** Scalingo does not officially support .NET/C# buildpacks. Node.js is officially supported and the most natural choice for a REST API on this platform.

## Repository Structure

```
uslehne/
├── .claude/
│   └── skills/          # Claude skill definitions
├── backend/             # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── package.json
│   └── Procfile         # Scalingo process definition
├── frontend/            # React (Vite) app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
├── CLAUDE.md            # This file
├── LICENSE              # WTFPL
└── README.md
```

## Development

### Prerequisites
- Node.js >= 20
- npm >= 10

### Run locally

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (separate terminal)
cd frontend && npm install && npm run dev
```

### Environment Variables

**Backend** (`.env` in `backend/`):
```
PORT=3001
NODE_ENV=development
```

**Frontend** (`.env` in `frontend/`):
```
VITE_API_URL=http://localhost:3001
```

## Scalingo Deployment

Each app is deployed as a separate Scalingo application:

- **backend** → push `backend/` subdirectory (or use the root with a `Procfile`)
- **frontend** → push `frontend/` subdirectory, or build and serve static files

```bash
# Add Scalingo remotes
git remote add scalingo-backend git@ssh.osc-fr1.scalingo.com:uslehne-api.git
git remote add scalingo-frontend git@ssh.osc-fr1.scalingo.com:uslehne-web.git
```

## Skills

| Skill     | Description                        |
|-----------|------------------------------------|
| `run`     | Start the dev environment locally  |
| `deploy`  | Deploy to Scalingo                 |

See [.claude/skills/](.claude/skills/) for definitions.

## Conventions

- API routes are prefixed with `/api/v1/`
- CORS is configured in backend middleware
- Frontend communicates with backend via `VITE_API_URL`
- Commits follow conventional commits format (`feat:`, `fix:`, `chore:`)
