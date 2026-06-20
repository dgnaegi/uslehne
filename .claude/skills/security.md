# Skill: security

Security review for uslehne — act as a security expert for a Node.js/Express/Prisma API
and a React/Vite frontend deployed on Scalingo. Audit the current changes (or a named area)
for real, exploitable issues. Prioritise by impact; don't pad with theoretical noise.

## Threat model for this project

- Public REST API at `/api/v1/*` backed by PostgreSQL via Prisma
- React SPA served to anonymous and (future) authenticated users
- Single Scalingo app, European hosting, GDPR-relevant (Swiss user data)

## Backend checklist

### Input & injection
- [ ] Every route validates body, params, and query before use (type, length, format)
- [ ] No raw SQL string interpolation — prefer Prisma's query API; if `$queryRaw` is used,
      it must be the **tagged-template** form, never `$queryRawUnsafe` with concatenation
- [ ] `:id` params parsed/validated as the expected type before hitting the DB
- [ ] Request body size limited (`express.json({ limit })`)

### Auth & access (as auth is added)
- [ ] Secrets only from `process.env`, never hardcoded; `.env` is gitignored
- [ ] Passwords hashed with bcrypt/argon2 — never stored or logged in plaintext
- [ ] Session/JWT secrets are strong and not committed
- [ ] Authorization checked per resource (no IDOR — user can only touch their own items)

### Transport & headers
- [ ] `helmet` (or equivalent security headers) enabled
- [ ] CORS restricted to known origins, not `*`, when credentials are involved
- [ ] Rate limiting on write/auth endpoints
- [ ] Errors return generic messages — no stack traces or Prisma errors leaked to clients

### Data & privacy
- [ ] No PII in logs
- [ ] Only necessary fields returned (no `select *` exposing internal columns)
- [ ] Dependency audit clean: `npm audit --omit=dev`

## Frontend checklist

- [ ] No `dangerouslySetInnerHTML` with unsanitised content
- [ ] No secrets/API keys baked into the Vite bundle (only `VITE_`-prefixed public config)
- [ ] User-supplied content escaped before render (React does this by default — flag manual HTML)
- [ ] External links use `rel="noopener noreferrer"`

## How to deliver

For each finding: **severity** (critical / high / medium / low), the `file:line`, why it's
exploitable, and a concrete fix. If you find nothing exploitable in a category, say so briefly.
Confirm authorization context is defensive/owner-driven before suggesting any offensive testing.
