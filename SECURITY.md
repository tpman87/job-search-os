# Security Policy

## Reporting a vulnerability

If you find a security issue in this repo — something in `hooks/pre-commit` that fails to
catch what it should, a way the scrub logic can be bypassed, or a way the generators could
leak data — please report it privately rather than opening a public issue.

Use GitHub's private vulnerability reporting: **Security** tab → **Report a vulnerability**
on this repo. This lets the fix land before the gap is publicly documented.

## What counts as a security issue here

This tool's actual promise, precisely: `profile/`, `pipeline/`, `roles/`, and
`applications/` are never **committed to this repository or published anywhere by this
tool's own mechanisms**, unless you explicitly choose to. That is deliberately narrower
than "never leaves your machine" — using this tool inside an AI assistant means that data
is processed by that assistant's own servers as an inherent part of the conversation, same
as any other AI-assisted work. See `docs/CONFIDENTIALITY.md` for the full, honest
breakdown of what's mechanically enforced here versus what's inherent to the assistant
you're running this inside of. (This document used to claim the broader, inaccurate
promise — corrected per an external audit, `docs/ADRs/JOBS-ADR-004` D1.)

A security issue, for the purposes of this policy, is anything that undermines the promise
this tool actually controls:
- a gap in `hooks/pre-commit`'s scrub patterns or categorical blocks
- a way real data could end up in a place `.gitignore` doesn't cover
- a generator or skill that could be tricked into writing real data somewhere it shouldn't
- any other way real data could be committed, published, or otherwise leave the repo
  boundary through this tool's own mechanisms

## What's out of scope

General bugs that don't involve data exposure (a formatting error, a broken markdown
parser edge case) belong in a normal issue, not a private report. Anything inherent to
using an AI assistant at all — the model provider processing your conversation, per its own
terms — is also out of scope here; that's disclosed, not a defect in this tool. Direct
feedback on that to your AI provider, not this repo.
