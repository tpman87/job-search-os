# Confidentiality — read this before you type anything real into `profile/`

## The one thing to understand before anything else

Every message you send in a Claude Code or Codex session — including your résumé, your
comp history, your target companies, and anything else in `profile/`, `pipeline/`, or
`roles/` — goes to that assistant's own servers (Anthropic's, for Claude; OpenAI's, for
Codex) to generate a response. That's true of **any** AI-assistant conversation, with or
without this tool. **job-search-os doesn't add extra transmission, and it can't remove the
transmission that's already inherent to using an AI assistant.**

What retention and training that data is subject to depends on your own account type and
settings, not on this tool — check directly, don't take this document's word for it:
- Claude Code: [code.claude.com/docs/en/data-usage](https://code.claude.com/docs/en/data-usage)
- ChatGPT / Codex: [How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)

**What this tool actually controls is narrower and mechanical**: keeping your data out of
git history, off GitHub, and away from any other tool sharing your session. That's real and
it's enforced (see below) — it's just a different, more honest promise than "your data
never leaves your machine," which is what this document and `SECURITY.md` used to say
before an external audit caught the overclaim (see `docs/ADRs/JOBS-ADR-004` D1).

### Web research is its own disclosed data flow

`/evaluate-role` and `/sweep` use the AI assistant's own web-search/fetch capability to
research a company. The queries they generate — built from the company name and role
title — leave your machine to fulfill that search, separately from the conversation
itself. Keep personal specifics (your comp target, your current employer, your own name)
out of any research query you type or approve, for the same reason you keep them out of
`profile/` commits: it's one more channel data can leave through.

This tool is designed so the repository can be public while your data never enters git
history or GitHub. That only works if you follow the rules below — the tooling enforces
what it mechanically can, and names what it can't.

## What the tooling enforces for you
- **Every directory this tool writes real user data into is gitignored and categorically
  refused by a pre-commit hook**, even if you `git add -f` it — currently `profile/*.md`,
  `pipeline/*.md` (both except `*.template.md`), `roles/active/*.md`, `roles/passed/*.md`,
  and everything under `applications/`. The rule is structural (what's gitignored here is
  what the hook blocks), not a hand-maintained list to keep in sync — see `hooks/pre-commit`.
- **The hook also scans the full staged content of every text file** for currency ranges,
  phone numbers, personal email addresses, and LinkedIn URLs, and blocks the commit if any
  appear outside a template file. It also categorically refuses staged `.docx`/`.pdf` and
  common image formats outside `docs/` — a screenshot of an offer letter carries real
  content a text scrub can't see.

Run `scripts/setup.sh` before you do anything else — it installs this hook (git does not
install it for you on clone), confirms git will actually dispatch it (not just that the
file's logic is correct), and proves it blocks a seeded unsafe commit before declaring
itself done. **If setup hasn't run, nothing in this repo is protected.**

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
