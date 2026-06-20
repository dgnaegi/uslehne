# Skill: review

Code review for uslehne — review the current diff against this project's conventions
before it gets committed or merged.

## What to review

Run `git diff` (or `git diff main...HEAD` for a branch) and review only the changed code.
Group findings by severity: **must fix** (bugs, broken conventions) vs **nice to have**.

## Project conventions checklist

### Structure
- [ ] **Max 150 lines per file** — flag any file that grows beyond this
- [ ] **One component per file** — no second exported component in a `.tsx`
- [ ] **Styling in a sibling `.styled.ts`** — no styled-components defined inside a `.tsx`
- [ ] API routes prefixed `/api/v1/`

### TypeScript
- [ ] **Strict, no `any`** — flag every `any`, `as any`, or `@ts-ignore`
- [ ] No unused imports / variables
- [ ] Async route handlers wrap errors so they reach `errorHandler`

### Styled-components / design
- [ ] No hardcoded px/rem/hex — all values come from `theme.ts`
- [ ] Spacing on the 4px grid (`theme.spacing` tokens)
- [ ] No inline `style={{}}` for anything the theme covers
- [ ] (see the `design` skill for the full design system)

### Backend
- [ ] Prisma migrations committed under `prisma/migrations/`, never hand-edited
- [ ] No secrets, connection strings, or tokens committed (`.env` stays out of git)
- [ ] Input validation on every route that takes a body or params
- [ ] (see the `security` and `db` skills for deeper checks)

### Hygiene
- [ ] Conventional commit messages (`feat:`, `fix:`, `chore:`)
- [ ] `npm run lint` passes and files are formatted (`npm run format`)
- [ ] No leftover `console.log`, commented-out code, or TODO without an owner

## How to deliver the review

1. State whether the diff is mergeable as-is.
2. List **must fix** items with file:line and a concrete suggested change.
3. List **nice to have** items separately.
4. If lint/format wasn't run, say so and run it.

Be specific and reference `file_path:line`. Don't restate code that is fine — only flag
what needs attention.
