#!/usr/bin/env bash
# Move o diretório de build do Next.js para fora do volume Google Drive.
#
# Por quê: o Drive não garante consistência de leitura imediata para os
# milhares de arquivos que `next build` escreve em .next, causando
# PageNotFoundError (ENOENT) na fase "Collecting page data".
# Solução: apps/web/.next vira um symlink para um diretório local.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_NEXT="$REPO_DIR/apps/web/.next"
LOCAL_DIR="${HOME}/Library/Caches/academia-dungeon/web-next"

mkdir -p "$LOCAL_DIR"

if [ -L "$WEB_NEXT" ]; then
  echo "ok: $WEB_NEXT já é um symlink → $(readlink "$WEB_NEXT")"
  exit 0
fi

if [ -d "$WEB_NEXT" ]; then
  echo "removendo .next existente no Drive…"
  rm -rf "$WEB_NEXT"
fi

ln -s "$LOCAL_DIR" "$WEB_NEXT"
echo "ok: $WEB_NEXT → $LOCAL_DIR"
