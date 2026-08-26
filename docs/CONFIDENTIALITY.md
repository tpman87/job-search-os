# Confidentiality — read this before you type anything real into `profile/`

This tool is designed so the repository can be public while your data never is. That only
works if you follow the rules below — the tooling enforces what it mechanically can, and
names what it can't.

## What the tooling enforces for you
- **`profile/*.md` (except `*.template.md`) is gitignored and refused by a pre-commit
  hook**, even if you `git add -f` it. See `hooks/pre-commit`.
- **The hook also scans every staged diff** for currency ranges, phone numbers, personal
  email addresses, and LinkedIn URLs, and blocks the commit if any appear outside a
  template file.
- **`roles/active/` and `roles/passed/`** (your real pipeline of companies and verdicts)
  are gitignored the same way.

Run `scripts/setup.sh` before you do anything else — it installs this hook (git does not
install it for you on clone) and proves it actually blocks a seeded unsafe commit before
declaring itself done. **If setup hasn't run, nothing in this repo is protected.**

## What you have to enforce yourself — no git mechanism can see these
1. **GitHub issues.** If you paste content from `profile/` into a public issue on this
   repo (or a fork of it) to ask for help, that content is now public and permanent, and
   no hook can stop you before you hit submit. If you're reporting a bug, describe the
   *behavior*, not your actual data.
2. **Other tools connected to your Claude Code session.** If you're running this project
   with additional MCP servers connected — Slack, email, a browser, a cloud drive — a
   session in this repo can read `profile/` and hand it to any of those tools. Git
   protections don't apply once your own data has left the filesystem through a channel
   git doesn't see. **Keep sessions in this project scoped to local file read/write.**
   If you need a broader session for something else, do it in a different project.
3. **Template-repo default visibility.** If you got here via GitHub's "Use this template"
   button, **set your copy to Private before you run `/onboard`.** Public is sometimes the
   default; check it explicitly rather than assuming.
4. **Dates in your own content.** A cover letter or role note that includes real dates can
   correlate against other public activity of yours (a LinkedIn update, a public
   application) even if no name or company appears. If you ever intend to publish anything
   derived from your own `roles/` or `pipeline/` content, generalize dates first.

## Why this exists, briefly
This tool was built from a real, hand-run confidential job search. Across that process,
four separate identifier leaks were caught — a scrub list that used the wrong name variant,
an unclassified settings file disclosing unrelated affiliations, a git commit identity that
would have de-anonymized every commit regardless of file content, and a "single source of
truth" convention for sensitive constraints that had already silently failed before it was
ever enforced. All four were mechanically checkable and none were caught by self-review —
only by independent, adversarial verification. The hooks and rules in this repo exist
because every one of them was a real near-miss, not a hypothetical.

**Treat `profile/` and `roles/` as if they're already public, and let the tooling be the
thing that keeps them from actually becoming so.**
