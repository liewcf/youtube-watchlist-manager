#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")/.."

OUT="dist/youtube-watchlist-manager.zip"
TMP="dist/.youtube-watchlist-manager.$$.zip"

mkdir -p dist
zip -qr "$TMP" manifest.json src icons
mv "$TMP" "$OUT"

printf '%s\n' "$OUT"
