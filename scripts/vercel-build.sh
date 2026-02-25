#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/vendor/ffmpeg"
CORE_DIR="$TARGET_DIR/core"

mkdir -p "$CORE_DIR"

download_with_fallback() {
  local output="$1"
  shift
  local ok=0
  for url in "$@"; do
    if curl -fL --retry 3 --connect-timeout 15 --max-time 180 "$url" -o "$output"; then
      ok=1
      break
    fi
  done
  if [[ "$ok" -ne 1 ]]; then
    echo "Failed to download: $output" >&2
    return 1
  fi
}

download_with_fallback \
  "$TARGET_DIR/ffmpeg-index.js" \
  "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js" \
  "https://fastly.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js" \
  "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js"

download_with_fallback \
  "$TARGET_DIR/ffmpeg-worker.js" \
  "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js" \
  "https://fastly.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js" \
  "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js"

download_with_fallback \
  "$TARGET_DIR/ffmpeg-util.js" \
  "https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.2/dist/esm/index.js" \
  "https://fastly.jsdelivr.net/npm/@ffmpeg/util@0.12.2/dist/esm/index.js" \
  "https://unpkg.com/@ffmpeg/util@0.12.2/dist/esm/index.js"

download_with_fallback \
  "$CORE_DIR/ffmpeg-core.js" \
  "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js" \
  "https://fastly.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js" \
  "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js"

download_with_fallback \
  "$CORE_DIR/ffmpeg-core.wasm" \
  "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm" \
  "https://fastly.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm" \
  "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm"

echo "FFmpeg static assets prepared in: $TARGET_DIR"
