#!/usr/bin/env bash
# job-search-os setup — installs and verifies the safety hooks.
#
# Per JOBS-ADR-003 D1a: `.git/hooks` is not tracked by git, so neither `git clone` nor
# GitHub's "Use this template" flow installs the scrub gate on its own. This script is
# GETTING-STARTED's literal step 0 — CLAUDE.md refuses to write anything in this repo
# until it can verify the hook below is actually installed AND actually dispatched by git.
#
# v2 (JOBS-ADR-004 D3) closes two gaps a QC round found in v1:
#   1. v1 treated ANY failed `git commit` as proof the hook worked — a commit failing for
#      an unrelated reason (missing user.name, a GPG error, another hook) read as green.
#      Fixed: the self-test now asserts the commit's own output contains "BLOCKED", the
#      literal string every hooks/pre-commit diagnostic carries.
#   2. v1 never checked whether git would actually DISPATCH the installed hook at all. If
#      core.hooksPath points somewhere else (husky, lefthook, a global git template), the
#      file this script just installed is inert — and v1's direct-invocation-adjacent test
#      would still pass, because it happened to invoke the right file by construction.
#      Fixed: setup aborts up front if core.hooksPath is set to anything but the default,
#      and the RED check is a REAL `git commit`, not a direct script invocation, so the
#      test exercises git's actual hook-dispatch path, not just the hook's own logic.
#
# NOTE: the self-test below requires a CLEAN staging area (nothing else staged) — it
# checks that exactly its own seeded test file is staged before proceeding, so a real
# commit-in-progress with unrelated staged changes doesn't get swept into the test. If
# you're re-running this mid-edit, `git reset` first, then re-stage your real changes after.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

HOOK_SRC="hooks/pre-commit"
HOOK_DST=".git/hooks/pre-commit"

if [ ! -f "$HOOK_SRC" ]; then
  echo "🔴 $HOOK_SRC not found — are you running this from the repo root?"
  exit 1
fi

# ---- core.hooksPath check: prove git will actually RUN the file we're about to install. ----
HOOKS_PATH_CONFIG=$(git config --get core.hooksPath 2>/dev/null || true)
if [ -n "$HOOKS_PATH_CONFIG" ] && [ "$HOOKS_PATH_CONFIG" != ".git/hooks" ] && \
   [ "$HOOKS_PATH_CONFIG" != "$(pwd)/.git/hooks" ]; then
  echo "🔴 core.hooksPath is set to '$HOOKS_PATH_CONFIG', not the default .git/hooks."
  echo "   This means git will NOT run the hook this script is about to install — it would"
  echo "   sit inert at $HOOK_DST while every commit skips it silently. Common cause: husky,"
  echo "   lefthook, or a global git template that redirects core.hooksPath."
  echo
  echo "   Fix one of:"
  echo "     git config --unset core.hooksPath      # use git's default hook location"
  echo "     cp $HOOK_SRC '$HOOKS_PATH_CONFIG/pre-commit'   # install into the active path"
  echo "   then re-run this script."
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "✅ Installed $HOOK_DST from $HOOK_SRC (core.hooksPath confirmed default)."
echo
echo "Verifying (red-then-green self-test)..."

# ============================================================================
# RED — real commit round-trip. Deliberately a full `git commit`, not a direct
# invocation of $HOOK_DST: the point is to prove GIT ITSELF dispatches the hook,
# not merely that the hook script's own logic is correct in isolation.
# ============================================================================
HEAD_BEFORE=$(git rev-parse HEAD 2>/dev/null || echo "")
TESTFILE="profile/__setup_selftest.md"
mkdir -p profile
# This test intentionally targets a NON-template path to confirm the categorical
# refusal actually fires — using .template.md here would incorrectly pass.
# Uses the hook's own recommended obviously-fake placeholder shape ($XXX,XXX) so this
# fixture doesn't ALSO trip the scrub gate for the wrong reason when read by a human.
echo "fake comp: \$XXX,XXX-\$XXX,XXX" > "$TESTFILE"
# -f forces past .gitignore: the point of this test is to prove the HOOK itself blocks
# the file, not that .gitignore silently kept it unstaged (a false-green risk).
git add -f "$TESTFILE"

STAGED_CHECK=$(git diff --cached --name-only)
if [ "$STAGED_CHECK" != "$TESTFILE" ]; then
  echo "🔴 SELF-TEST SETUP FAILED: expected exactly '$TESTFILE' staged, got: '$STAGED_CHECK'"
  git reset -q "$TESTFILE" 2>/dev/null || true
  rm -f "$TESTFILE"
  exit 1
fi

set +e
COMMIT_OUTPUT=$(git commit -q -m "hook self-test (should be blocked)" 2>&1)
COMMIT_EXIT=$?
set -e
HEAD_AFTER=$(git rev-parse HEAD 2>/dev/null || echo "")

git reset -q "$TESTFILE" 2>/dev/null || true
rm -f "$TESTFILE"

if [ "$COMMIT_EXIT" -eq 0 ]; then
  echo "🔴 SELF-TEST FAILED: \`git commit\` SUCCEEDED — the hook did not block a seeded"
  echo "   profile/ file with a fake comp figure. Do not proceed until this is fixed."
  if [ "$HEAD_AFTER" != "$HEAD_BEFORE" ]; then
    echo "   Removing the self-test commit that should never have landed..."
    git reset --hard -q "$HEAD_BEFORE"
  fi
  exit 1
fi

# The commit failing is NOT sufficient — it must have failed FOR THIS REASON. Every
# blocking diagnostic in hooks/pre-commit contains the literal string "BLOCKED" (see the
# CONTRACT comment in that file). A commit failing for any other reason (no user.name,
# GPG signing, an unrelated hook) must not read as a pass.
if ! printf '%s' "$COMMIT_OUTPUT" | grep -q "BLOCKED"; then
  echo "🔴 SELF-TEST FAILED: \`git commit\` was rejected, but not by hooks/pre-commit — its"
  echo "   output contains no 'BLOCKED' diagnostic, so something ELSE blocked it (missing"
  echo "   user.name, GPG signing, another hook). A rejected commit alone is not proof this"
  echo "   hook fired. Commit output was:"
  echo "$COMMIT_OUTPUT" | sed 's/^/   /'
  exit 1
fi

echo "✅ Red check (real commit) passed — the hook blocked the seeded unsafe commit, and"
echo "   the failure came from hooks/pre-commit itself (confirms core.hooksPath isn't"
echo "   silently routing around it)."

# ============================================================================
# RED 2 — pipeline/ coverage. Direct invocation is fine here: the commit-dispatch
# path is already proven above; this only needs to confirm the hook's own categorical
# rule for pipeline/ actually fires (JOBS-ADR-004 D2 closed this gap — v1's hook had
# no pipeline/ rule at all).
# ============================================================================
TESTFILE2="pipeline/__setup_selftest.md"
mkdir -p pipeline
echo "fake comp: \$XXX,XXX-\$XXX,XXX" > "$TESTFILE2"
git add -f "$TESTFILE2"

set +e
"$HOOK_DST" >/tmp/job-search-os-selftest-pipeline.log 2>&1
PIPELINE_EXIT=$?
set -e

git reset -q "$TESTFILE2" 2>/dev/null || true
rm -f "$TESTFILE2"

if [ "$PIPELINE_EXIT" -eq 0 ]; then
  echo "🔴 SELF-TEST FAILED: the hook did not block a seeded pipeline/ file."
  exit 1
fi
if ! grep -q "BLOCKED" /tmp/job-search-os-selftest-pipeline.log; then
  echo "🔴 SELF-TEST FAILED: the seeded pipeline/ file was rejected without a BLOCKED"
  echo "   diagnostic — the hook's pipeline/ rule may be missing or broken."
  exit 1
fi
rm -f /tmp/job-search-os-selftest-pipeline.log
echo "✅ pipeline/ coverage check passed."

# ============================================================================
# GREEN — a benign change must NOT be blocked, or the gate is unusable.
# ============================================================================
TESTFILE3="docs/__setup_selftest_ok.md"
mkdir -p docs
echo "Setup self-test OK marker — no real data, safe to commit." > "$TESTFILE3"
git add -f "$TESTFILE3"

set +e
"$HOOK_DST" >/tmp/job-search-os-selftest-green.log 2>&1
GREEN_EXIT=$?
set -e

git reset -q "$TESTFILE3" 2>/dev/null || true
rm -f "$TESTFILE3"

if [ "$GREEN_EXIT" -ne 0 ]; then
  echo "🔴 SELF-TEST FAILED: a benign docs/ file was blocked. The gate is too aggressive to"
  echo "   use. Output was:"
  cat /tmp/job-search-os-selftest-green.log | sed 's/^/   /'
  rm -f /tmp/job-search-os-selftest-green.log
  exit 1
fi
rm -f /tmp/job-search-os-selftest-green.log
echo "✅ Green check passed — a benign change is not blocked."

echo
echo "Setup complete. The pre-commit scrub gate is installed and verified — both that its"
echo "logic works, and that git actually dispatches it on every commit."
