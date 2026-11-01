# China deployment and operations

Deployed on 2026-11-01 UTC. China is live at https://www.ulead-edu.com/zh/;
https://ulead-edu.com redirects to www with path/query preservation. The sole
admin portal is https://admin.ulead-edu.com/ and retains the existing admin login.

## Infrastructure

- Tencent Beijing Lighthouse `lhins-dtevgg98`, `49.233.128.125`: 2 CPU, 4 GB RAM,
  5 Mbps, 60 GB SSD, Ubuntu 24.04. Purchased for CNY 663 for 12 months;
  manual renewal, expires 2027-11-01. COS is usage-billed separately.
- Nginx terminates HTTPS; Let's Encrypt covers www/apex/admin with automatic renewal.
- `/opt/ulead/compose.yaml`: Next.js on loopback port 3000 and PostgreSQL 18 on a
  private Docker network. Persistent database volume, health checks, log rotation.
- Current app image: `ulead:china-20261101-r3`; worker: `ulead-worker:20261101`.
- Private COS bucket `ulead-cn-1258928601`, `ap-beijing`. Only media objects are
  public-read. Application credentials are restricted to media/backup prefixes.
- www/apex/admin DNS points to the new server. en and mail records were preserved.
  Legacy m/mobile DNS was not changed.

## Migration and backups

Full Neon database and all 122 Blob objects were first backed up locally to
`data/backups/export-2026-11-01T04-12-34.191Z/`. The final cutover snapshot is
`data/backups/export-2026-11-01T07-33-44.453Z/`: 14 public tables, 496 rows,
including seven historical inquiries; 122 objects totaling 14,934,865 bytes.
The full logical database dump was restored and the media SHA-256 checks passed.
Original Neon and Blob data remains available. Credentials and backup files are
excluded from Git and application image contexts.

China content references COS URLs. Seven imported inquiries are marked historical;
new China inquiries remain local, and US inquiries are deduplicated by remote ID.
The admin upload and deletion paths use COS and inquiry tombstones respectively.

`ulead-backup.timer` runs daily at 03:00 Beijing time. Dumps are kept locally for
14 days and uploaded privately to COS; each upload is downloaded and SHA-256
verified. COS lifecycle retains daily copies for 14 days and monthly copies for
93 days. The first daily and monthly copies passed verification on deployment.
Local restore rehearsal passed before cutover. Backups cover the database; media
is retained in COS and the original full media export remains local. Single-server
outage and up to 24 hours of database loss between backups remain possible.

## Regional synchronization

`ulead-sync.timer` runs every ten minutes. The initial production inquiry import
successfully scanned seven existing records without duplicates. Content publication
is implemented and locally tested, but `SYNC_PUBLISH_ENABLED=false` is intentional
until the updated Vercel release disables the old admin portal. This prevents two
active editors while Vercel account binding is unresolved. China operates normally.

After the new Vercel release is live, confirm US admin/login endpoints return 404,
set `SYNC_PUBLISH_ENABLED=true` in `/opt/ulead/worker.env`, and start
`systemctl start ulead-sync.service`. Use China admin for all future edits.
Only the 13 allowlisted content tables publish to Neon, atomically with version
hashes; inquiries and operational tables are excluded. New COS images are copied
to Blob and URLs rewritten for US pages. Inquiries are imported independently.
US inquiry deletion from China propagates on the next sync. The portal displays
last successful sync/failure. Existing US page revalidation adds up to five minutes.
A failed cross-border sync retains the last committed US content and retries later.

US Vercel variables: `SITE_REGION=us`, `DATABASE_DRIVER=neon`,
`ADMIN_ENABLED=false`, existing Neon URL and Blob credentials. Never copy the China
DATABASE_URL to Vercel. The China web container has no US database credentials;
only the isolated maintenance worker has them.

## Build and operations

Build the app using the root pinned pnpm dependencies and `pnpm build`; prepare
an isolated context containing `.next/standalone`, `.next/static` and `public`,
then use `deploy/Dockerfile`. Never include local env files or migration backups.
For the worker, prepare another context with `deploy/worker.package.json` renamed
`package.json`, `deploy/worker.pnpm-lock.yaml` renamed `pnpm-lock.yaml`, install via
`pnpm install --ignore-workspace --prod --frozen-lockfile --ignore-scripts`, and
include `lib/{cos.mjs,content-sync.mjs,content-schema.json}` plus `scripts/sync`.
Build with `deploy/worker.Dockerfile`. Separate dependencies avoid relying on
Next.js standalone tracing for maintenance-only imports.

Runtime files under `/opt/ulead` are root-private: `app.env`, `worker.env`,
`database.env`, and `.env` with APP_IMAGE/WORKER_IMAGE. See the example templates.
The worker scripts mount allows small operational fixes without rebuilding the app.

Useful server commands (sudo):

```sh
cd /opt/ulead
docker compose ps
systemctl list-timers 'ulead-*'
journalctl -u ulead-sync.service -u ulead-backup.service --since today
systemctl start ulead-backup.service
certbot renew --dry-run
```

Validation: routing tests pass; production build and isolated restore passed;
regional sync tests cover publication, retries, inquiry deduplication/deletion and
transaction rollback. ESLint has zero errors and 41 existing warnings. HTTPS roots,
Chinese page rendering, image loading, admin isolation login, synthetic inquiry creation/deletion, and COS upload/download were verified.

## Rollback

Keep previous images and original exports. Roll back APP_IMAGE then run
`docker compose up -d app`. Do not rerun `scripts/migration/localize.mjs` against a
live database: it is only for a fresh restore. Never overwrite new China inquiries
or edits with an old Neon snapshot. For database recovery restore a verified dump
into a separate empty target first and validate counts before switching the app.
Do not revert DNS to the deleted old server. Pause content publication during any
recovery or change of content master.

## Price verification

Checked on 2026-11-01 UTC (2026-10-31 US Central). These were pre-purchase quotes; the selected instance is recorded above.

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
