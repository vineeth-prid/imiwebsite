# IMI — Information Management Institute

Pre-launch waitlist landing page for the Information Management Institute, plus a
minimal protected admin view of the collected leads.

- **Stack** — Next.js (App Router) · TypeScript · Tailwind CSS v4 · Prisma · SQLite
- **Design** — built from the supplied IMI branding guidelines and landing page reference image
  (Switzer primary / Barlow secondary typefaces, brand palette in `app/globals.css`).
  The artwork in `public/` was extracted from that reference. The source files live in
  `brand/`, which is gitignored — they are internal material and are not published here.

## Install

```bash
npm install
```

## Configure

Copy the example env file and fill it in:

```bash
cp .env.example .env
```

| Variable              | Purpose                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`        | Database connection. `file:./dev.db` for SQLite.                         |
| `SESSION_SECRET`      | Signs the admin session cookie. Use a long random string.                |
| `ADMIN_EMAIL`         | The single admin account's email.                                        |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password. Never store the password in plaintext. |

Generate the two secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"   # SESSION_SECRET
npm run admin:hash -- "your-admin-password"                                # prints the full .env line
```

Paste the `admin:hash` output over the `ADMIN_PASSWORD_HASH` line as-is — the
backslashes it emits are required, because Next.js expands unescaped `$` when it
reads `.env` files and that would corrupt the hash.

## Initialise the database

```bash
npm run db:migrate     # creates the database and applies prisma/migrations
```

In production use `npm run db:deploy` instead (applies migrations without prompting).

## Run locally

```bash
npm run dev            # http://localhost:3000
```

## Admin

Visit `/admin` and sign in with `ADMIN_EMAIL` and the password you hashed. The page
shows the waitlist total, the lead table, and a **Download CSV** button. `/admin` and
`/api/admin/export` are both behind the session cookie; there is no public link to them.

## Build and deploy

```bash
npm run build
npm run start
```

Deploy anywhere that runs Next.js. Set the four environment variables on the host and
run `npm run db:deploy` as part of the release step.

**PostgreSQL:** change `provider` to `"postgresql"` in `prisma/schema.prisma`, point
`DATABASE_URL` at the instance, then run `npx prisma migrate reset` (or regenerate the
migration) so the SQL is emitted for Postgres.

## Notes

- Waitlist submissions are rate limited to 5 per IP per 10 minutes, and admin logins to
  10 per IP per 10 minutes. The counters are in-process, so behind multiple instances
  each one keeps its own — move them to a shared store if you scale out.
- `npm audit` reports an advisory in `deepmerge-ts`, reached only through the Prisma
  **CLI** (`@prisma/config`). It is a devDependency and is not in the runtime bundle.
