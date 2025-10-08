#!/usr/bin/env bash
set -euo pipefail
OUT="_reports/semgrep-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT"
semgrep scan \
  --config p/ci \
  --timeout 600 --metrics=off \
  --json  --output "$OUT/semgrep.json" \
  --sarif --output "$OUT/semgrep.sarif"
echo "Saved → $OUT"
