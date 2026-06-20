# Skill: deploy

Deploy uslehne to Scalingo.

## Prerequisites

- [Scalingo CLI](https://doc.scalingo.com/platform/cli/start) installed
- Logged in: `scalingo login`
- Git remotes configured (see CLAUDE.md)

## Deploy backend

```bash
git subtree push --prefix backend scalingo-backend main
```

Or from inside the `backend/` directory:
```bash
git push scalingo-backend main
```

## Deploy frontend

Build and push:
```bash
cd frontend && npm run build
git subtree push --prefix frontend scalingo-frontend main
```

## Check status

```bash
scalingo --app uslehne-api ps
scalingo --app uslehne-web ps
```

## View logs

```bash
scalingo --app uslehne-api logs --lines 100
scalingo --app uslehne-web logs --lines 100
```
