# Skill: deploy

Deploy uslehne to Scalingo with a standard `git push`.

## How it works

One Scalingo app runs both the React frontend and the Node.js API:

1. Scalingo detects Node.js via the root `package.json`
2. Runs `npm install` → triggers `postinstall` → installs `backend/` and `frontend/` deps
3. Runs `npm run build` → builds the React app (`frontend/dist/`) then compiles TypeScript (`backend/dist/`)
4. Starts with `node backend/dist/index.js` via `Procfile`
5. In production, Express serves `frontend/dist/` as static files on `*` routes

## Deploy

```bash
git push scalingo main
```

## First deploy only — run DB migrations

```bash
scalingo --app uslehne run "npm run db:migrate"
```

## Useful Scalingo CLI commands

```bash
scalingo --app uslehne logs --lines 100   # view logs
scalingo --app uslehne ps                 # check running processes
scalingo --app uslehne run bash           # open a shell on the dyno
scalingo --app uslehne open               # open the app in browser
```

## Environment variables to set on Scalingo

| Variable       | Value                                    |
|----------------|------------------------------------------|
| `NODE_ENV`     | `production`                             |
| `DATABASE_URL` | Set automatically by PostgreSQL addon    |
