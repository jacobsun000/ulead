# ULEAD website

China deployment preparation, verified pricing, migration inventory and cutover
gates are documented in [deploy/MIGRATION.md](deploy/MIGRATION.md). No cloud
deployment is performed by the preparation scripts. Keep `neon.env` and
`.migration/` private and out of Git.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use Node.js 26.x and pnpm 11.24.0 (pinned in `package.json`). Install the
locked dependencies before starting the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The application uses Next.js 16 and React 19. `engines.node` selects Node.js
26.x on Vercel. Use the committed `pnpm-lock.yaml` and `pnpm-workspace.yaml`;
the workspace file includes security overrides for transitive dependencies.

Vercel database queries use `@neondatabase/serverless` through `lib/db.js`, retaining
the existing `POSTGRES_URL` environment variable (`DATABASE_URL` is a fallback).
China deployments select the native PostgreSQL adapter with
`DATABASE_DRIVER=postgres` and `DATABASE_URL`. Production builds prerender public
pages and need read access to the configured database. See the migration guide
before switching database providers.

Run `pnpm lint`, `pnpm build`, and `pnpm audit` before deployment. Existing
client-side loading effects are reported as lint warnings during the React
upgrade. ESLint remains on 9.x because the Next.js React/import plugins do not
yet declare compatibility with ESLint 10.

Python utilities have a separate lockfile. Install their updated dependencies
with `uv sync --locked --project scripts`.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
