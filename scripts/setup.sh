#!/usr/bin/env bash
# job-search-os setup — installs the safety hooks.
#
# Per JOBS-ADR-003 D1a: `.git/hooks` is not tracked by git, so neither `git clone` nor
# GitHub's "Use this template" flow installs the scrub gate on its own. This script is
# GETTING-STARTED's literal step 0 — CLAUDE.md refuses to write anything in this repo
# until it can verify the hook below is actually installed.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

HOOK_SRC="hooks/pre-commit"
HOOK_DST=".git/hooks/pre-commit"

if [ ! -f "$HOOK_SRC" ]; then
  echo "🔴 $HOOK_SRC not found — are you running this from the repo root?"
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "✅ Installed $HOOK_DST from $HOOK_SRC."
echo
echo "Verifying (red-then-green self-test)..."

# Red check: a deliberately unsafe staged file must be blocked.
TMPFILE="profile/__setup_selftest.template.md"
mkdir -p profile
# This test intentionally targets a NON-template path to confirm the categorical
# refusal actually fires — using .template.md here would incorrectly pass.
TESTFILE="profile/__setup_selftest.md"
# Uses the hook's own recommended obviously-fake placeholder shape ($XXX,XXX) so this
# fixture doesn't ALSO trip the scrub gate when setup.sh itself gets committed.
echo "fake comp: \$XXX,XXX-\$XXX,XXX" > "$TESTFILE"
# -f forces past .gitignore: the point of this test is to prove the HOOK itself blocks
# the file, not that .gitignore silently kept it unstaged (a false-green risk — the file
# would never reach the pre-commit hook at all without -f, and the test would "pass" for
# the wrong reason).
git add -f "$TESTFILE"

STAGED_CHECK=$(git diff --cached --name-only)
if [ "$STAGED_CHECK" != "$TESTFILE" ]; then
  echo "🔴 SELF-TEST SETUP FAILED: expected exactly '$TESTFILE' staged, got: '$STAGED_CHECK'"
  git reset -q "$TESTFILE" 2>/dev/null || true
  rm -f "$TESTFILE"
  exit 1
fi

if git commit -q -m "hook self-test (should be blocked)" 2>/tmp/hook-selftest.log; then
  echo "🔴 SELF-TEST FAILED: the hook did not block a seeded profile/ file with a fake comp"
  echo "   figure. Do not proceed until this is fixed — commit the fix, do not skip the hook."
  git reset -q "$TESTFILE" 2>/dev/null || true
  rm -f "$TESTFILE"
  exit 1
else
  echo "✅ Red check passed — the hook blocked the seeded unsafe commit as expected."
fi

git reset -q "$TESTFILE" 2>/dev/null || true
rm -f "$TESTFILE"

echo
echo "Setup complete. The pre-commit scrub gate is installed and verified."
