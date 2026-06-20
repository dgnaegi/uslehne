# Skill: run

Start the local development environment for uslehne.

## Steps

1. Start the backend:
   ```bash
   cd backend && npm install && npm run dev
   ```
   Runs on `http://localhost:3001`

2. Start the frontend (separate terminal):
   ```bash
   cd frontend && npm install && npm run dev
   ```
   Runs on `http://localhost:5173`

## Health check

- Backend: `curl http://localhost:3001/api/v1/health`
- Frontend: open browser at `http://localhost:5173`
