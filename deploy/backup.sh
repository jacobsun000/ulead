#!/bin/sh
set -eu
cd /opt/ulead
umask 077
mkdir -p backups
name="$(date -u +%Y-%m-%dT%H-%M-%S).dump"
docker compose exec -T database pg_dump -U ulead -d ulead -Fc > "backups/$name"
# The maintenance container runs as uid 1000; the host directory stays private.
chown 1000:1000 "backups/$name"
docker compose run --rm worker node scripts/sync/backup.mjs "/backups/$name"
find backups -name '*.dump' -mtime +14 -delete
