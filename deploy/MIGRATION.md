# China deployment preparation

Status: prepared locally; no server ordered, no DNS changed, no cloud data written,
and no deployment triggered. This is not yet a production cutover release.

## Confirmed requirements

- China public site: `www.ulead-edu.com`, root redirects to `/zh/`.
- Apex redirects to `www`, preserving the path and query string.
- US public site remains on Vercel at `en.ulead-edu.com`, root redirects to `/en/`.
- Administrators are in China. One portal at `admin.ulead-edu.com`.
- Public content can lag by 10 minutes. The portal must show both regions' inquiries.
- Peak concurrency is approximately five; a single-machine outage is acceptable.
- China infrastructure budget: CNY 2,000/year; first-year promotions are acceptable.
- The domain is already ICP-filed. The old server was deleted.

## Price verification

Checked on 2026-11-01 UTC (2026-10-31 US Central). No order was created.

The official [Lighthouse promotion](https://cloud.tencent.com/act/pro/lhsale)
advertises **4 CPU / 4 GB / 3 Mbps at CNY 109 for the first year**. Eligibility
depends on product order history across the real-name identity, not the number
of currently running servers. This is a verified advertised price, not a verified
account-specific checkout total. Promotional inventory and eligibility still need
checking before purchase. Do not use the standard API quote to order the promotion.

Read-only `DescribeBundles` confirmed the following bundles in Beijing, Shanghai
and Guangzhou. `InquirePriceCreateInstances` returned these Beijing account quotes
for one instance, 12 months, manual renewal:

| Bundle | CPU / RAM / bandwidth | SSD / monthly traffic | List total | Quoted total |
| --- | --- | --- | --- | --- |
| `bundle_starter_mc_med2_01` | 2 / 2 GB / 3 Mbps | 40 GB / 200 GB | CNY 480 | CNY 408 |
| `bundle_starter_mc_med4_01` | 2 / 4 GB / 5 Mbps | 60 GB / 500 GB | CNY 780 | CNY 663 |
| `bundle_budget_mc_lg4_01` | 4 / 4 GB / 3 Mbps | 40 GB / 300 GB | CNY 780 | CNY 663 |

Quote request IDs, in table order:

- `7c7b118b-89c1-4090-a8c7-1e3901ce5b36`
- `ba4479ca-a02e-4d67-9627-cc998517b994`
- `8f9bb1f6-c575-4007-88e8-264a779240fd`

Recommendation: first try the CNY 109 4 GB promotion; otherwise choose 2 CPU /
4 GB / 5 Mbps at the quoted CNY 663. The CNY 408 2 GB bundle is a lower-cost
alternative if needed. No 1 CPU / 2 GB bundle appeared in these returned catalogs.
Reserve CNY 300/year for low-volume object storage, requests, backup storage and
traffic; this is a planning allowance, not a COS usage quote. Even the CNY 663
fallback plus this allowance is below budget. Recheck renewal prices next year.

Sources: [official price list](https://cloud.tencent.com/document/product/1207/73452/),
[read-only inquiry API](https://cloud.tencent.com/document/api/1207/55558).

## Source inventory and rehearsal

Credentials were read from local `neon.env`; secret values are not reproduced here.
`*.env`, `.env*.local` and `.migration/` are ignored by Git. Container build context
also excludes secret files and migration exports.

- Neon PostgreSQL: 16.15; only the standard `plpgsql` extension.
- Public schema: 14 tables, 496 records, including seven historical inquiries.
- Vercel Blob: 122 objects, 14,934,865 bytes (approximately 14.2 MiB).
- Database content references 103 distinct Blob URLs; all are present in the store.
- A custom-format `pg_dump` of the public schema was created using pg_dump 18.6.
- All 122 objects were downloaded locally; sizes and SHA-256 checksums verified.
- The database was restored into isolated local PostgreSQL 18. Table counts and
  column definitions match the inventory; parameterized strings, arrays and JSONB
  work with the new `pg` adapter.
- The production build succeeded against the local restored database. Local HTTP
  tests passed for both regional root redirects, public pages, rejected anonymous
  and invalid-token admin calls, authenticated admin reads, HttpOnly/Secure/SameSite
  login cookies, disabled US admin, and a synthetic contact submission.
- The final build also passed with the existing Neon driver using read-only queries.
  Dependency audit reported zero vulnerabilities; lint reported zero errors and 41
  existing warnings. Routing tests passed. The temporary local database container
  and its volume were removed after testing.
- Source access tests and exports were read-only. No write/upload permission test
  was performed against Neon or Blob; future target writes require separate tests.

Private artifacts are under `.migration/`:

- `2026-11-01T03-59-39.333Z/inventory.json`
- `export-2026-11-01T04-01-13.646Z/database.dump`
- `export-2026-11-01T04-01-13.646Z/manifest.json` and `blobs/`

The dump contains personal information. Keep this directory private, do not upload
it to source control or a public bucket, and remove rehearsal copies when no longer
needed. This initial dump is a rehearsal snapshot, not the final cutover snapshot.

## Code prepared

- Real `/zh/` routes replace the `(zh)` route group. Old public shortcuts redirect
  according to `SITE_REGION`; US is the default. Locale-specific navigation and
  cross-site language links are explicit. Trailing slashes are canonical.
- `DATABASE_DRIVER=postgres` uses a five-connection `pg` pool. The default `neon`
  path preserves existing Vercel behavior. Tagged query parameters remain bound.
- Admin pages and APIs share JWT verification. Login uses a server-set HttpOnly
  cookie. `ADMIN_ENABLED=false` disables all admin/login entry points on the US
  deployment. `ADMIN_HOST` restricts them on China to the admin hostname.
- Read-only inventory/export scripts and local verification/smoke tests are included.

## Remaining implementation before cutover

These are explicit release gates, not features already implemented:

1. Add COS upload support and regional image URL mapping. Copy existing objects
   without deleting Blob originals; verify each copied object's size/hash before
   using its China URL. Keep the historical source URL or stable media identifier
   so publication to the US never points American pages at China-only storage.
2. Implement a one-way public-content publication job, run every ten minutes from
   China. Use an explicit table/column allowlist, versioned snapshots, transactionally
   apply records/deletions to the US content tables, and invalidate US page caches
   using a signed, replay-protected endpoint. Never copy inquiries, credentials or
   administrative tables through this pipeline. Preserve the last good version on
   failure; serialize runs, retry safely, and show last-success/failure status.
3. Implement US inquiry export through a protected, paginated endpoint and import
   into a separate China aggregate table, uniquely keyed by source region and source
   ID. Keep local submissions independent of cross-border availability. Use an
   overlap/rescan strategy so concurrent transactions cannot be skipped by a naive
   `id > last_id` cursor. Follow-up state belongs to the China portal. Propagate
   deletion/retention actions to both copies; document the US-to-China transfer in
   the actual privacy notice before enabling it.
4. Classify the seven existing inquiries as historical. Their original region is
   not reliably encoded. Establish the initial US import baseline at cutover so
   restored historical records are not duplicated as new US inquiries.
5. Prepare and verify the runtime image, Compose services (Caddy, Next.js,
   PostgreSQL 18), persistent volumes, health checks, log rotation and off-machine
   backups. Build from a clean checkout with secrets outside the image. The local
   `.next` build used for rehearsal is not a deployable production artifact.
6. Validate these features against scratch targets before any production switch.
   Test publication failure/retry, deletes, duplicate inquiries and image mapping.

## Purchase and migration sequence

Stop for review before the first purchase. No purchasing command is part of the
preparation scripts.

After approval:

1. Verify promotional eligibility, region inventory and ICP access-provider status;
   rent one Linux Lighthouse instance. Prefer Beijing for the China operations team,
   or another mainland region if the promotion is only available there.
2. Configure the host, SSH restrictions and firewall (public 80/443 only, restricted
   SSH; PostgreSQL must not be exposed). Create separate private backup and public
   media storage with least-privilege credentials. Issue certificates for the
   public, apex and admin hostnames.
3. Restore into an empty staging database, copy media and run all release-gate tests
   through a preview hostname before changing existing DNS.
4. Pause old admin content edits briefly. Export a fresh consistent database dump
   and media manifest; restore and reconcile counts, sequences and images. Keep US
   inquiry intake running and capture inquiries arriving after the snapshot through
   the idempotent import. Only then enable the China admin as the sole editor.
5. Deploy the US configuration with `SITE_REGION=us`, `DATABASE_DRIVER=neon`,
   `ADMIN_ENABLED=false`. Keep a schema compatible with its read queries and retain
   its independent `contact_us` table. Activate verified synchronization jobs.
6. Replace the stale apex/`www` A records (`62.234.148.46`), add `admin`, and review
   stale `m`/`mobile` records. Preserve `en` and mail-related DNS. Implement the apex
   HTTPS redirect in Caddy with path/query preservation. Verify all hostnames,
   certificates, forms, images and cache invalidation from each region.
7. Schedule daily database backups to private COS, retain 14 daily and three monthly
   backups, and prove a restore. Target a few hours to recover, with up to 24 hours
   of database data loss in a host-loss scenario between daily backups.

## Rollback

Keep the US deployment, original Neon snapshot and Blob originals until acceptance.
Retain previous application images and database backups. A China failure can roll
back the image or restore onto a replacement host. Do not revert DNS to the deleted
old server. If temporarily directing China users to Vercel, assess connectivity and
explicitly handle new inquiries first. Once China accepts edits/inquiries, reconcile
that new data before reverting the content master; never overwrite it with the old
Neon snapshot. Pause publication while investigating inconsistent versions.

## Repeating the preparation

```bash
pnpm migration:inspect neon.env
pnpm migration:export neon.env
pnpm test:migration
```

Exports use `pg_dump` in read-only mode with credentials passed through its child
environment. Use a matching/newer PostgreSQL client and verify the target major
version; the tested target is PostgreSQL 18. The export only includes `public`,
so re-evaluate the scope if other application schemas/extensions are introduced.
The database snapshot and Blob listing are not one distributed transaction:
freeze edits and repeat the final export before cutover.

For local restore testing, use a new isolated database whose name starts with
`ulead_rehearsal`, bound to loopback. Restore with `pg_restore --clean --if-exists
--no-owner --no-acl --single-transaction --exit-on-error`; **never use this cleanup
restore command against the production database**. Set
`MIGRATION_TEST_DATABASE_URL` only to that scratch database, then run:

```bash
node scripts/migration/verify-local.mjs PATH_TO_INVENTORY_JSON EXPORT_DIRECTORY
# Build with DATABASE_DRIVER=postgres and DATABASE_URL pointing at the scratch DB.
pnpm build
node scripts/migration/smoke-local.mjs
```

Both verification scripts reject non-loopback/non-rehearsal database URLs. The
HTTP smoke test removes its synthetic inquiry afterward; sequence values can still
advance, so discard the scratch database rather than treating it as a pristine dump.
