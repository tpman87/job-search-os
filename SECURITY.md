# Security Policy

## Reporting a vulnerability

If you find a security issue in this repo — something in `hooks/pre-commit` that fails to
catch what it should, a way the scrub logic can be bypassed, or a way the generators could
leak data — please report it privately rather than opening a public issue.

Use GitHub's private vulnerability reporting: **Security** tab → **Report a vulnerability**
on this repo. This lets the fix land before the gap is publicly documented.

## What counts as a security issue here

This tool's core promise is that `profile/`, `pipeline/`, and `roles/` never leave your
machine unless you explicitly choose to publish them. Anything that undermines that —
- a gap in `hooks/pre-commit`'s scrub patterns
- a way real data could end up in a place `.gitignore` doesn't cover
- a generator or skill that could be tricked into writing real data somewhere it shouldn't

— is a security issue for the purposes of this policy, not just a bug.

## What's out of scope

General bugs that don't involve data exposure (a formatting error, a broken markdown
parser edge case) belong in a normal issue, not a private report.
