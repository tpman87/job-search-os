#!/usr/bin/env bash
# job-search-os preflight-coverage check.
#
# Per JOBS-ADR-004 D12: "every skill's preflight reads pipeline/LEARNED.md" is a rule
# stated in .claude/skills/retrospective/SKILL.md, but a rule stated in one file and
# followed by convention elsewhere is exactly the failure shape this repo was built to
# stop repeating — the same METHOD-not-routed failure the source workspace hit with its
# own drifted Codex skill mirror (a rule written down once, never mechanically checked,
# quietly stopped being true). This script is the mechanism, not the reminder.
#
# It asserts every .claude/skills/*/SKILL.md contains the literal marker string
# "JOBS-ADR-004 D12" in a preflight line. This is deliberately a dumb string match, not a
# parse of the line's exact wording — the wording is free to improve; the marker is the
# contract. Run by .github/workflows/ci.yml on every push/PR (D15's same pattern).

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

MARKER="JOBS-ADR-004 D12"
MISSING=()

shopt -s nullglob
for f in .claude/skills/*/SKILL.md; do
  if ! grep -q "$MARKER" "$f"; then
    MISSING+=("$f")
  fi
done
shopt -u nullglob

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "🔴 The following skills are missing the pipeline/LEARNED.md preflight line"
  echo "   (must contain the literal marker \"$MARKER\"):"
  for f in "${MISSING[@]}"; do
    echo "   - $f"
  done
  echo
  echo "   Add, near the top of the skill's instructions:"
  echo "   \"**Preflight ($MARKER):** read \`pipeline/LEARNED.md\` first, if it exists —"
  echo "   skip if absent. Treat every entry there as binding, exactly like a rule in"
  echo "   \`constraints.md\`.\""
  exit 1
fi

echo "✅ Every skill in .claude/skills/ declares the LEARNED.md preflight."
exit 0
