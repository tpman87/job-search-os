# job-search-os

A self-contained job-search operating system for Claude Code: a guided intake that builds
a real profile of you (constraints, what you actually want, career facts, portfolio,
writing voice), a research-backed role evaluator scored against that profile — not a
generic notion of a "good role" — and a writing layer that drafts resumes and cover
letters that sound like you and never claim more than you can defend.

**This is a template, not a service.** It ships with zero personal data. Your profile
lives entirely in your own copy, gitignored and hook-guarded from commit zero. See
`docs/CONFIDENTIALITY.md` for exactly what's protected and what you have to watch
yourself.

## Why this exists

Most job searches run on instinct: a role looks impressive, the company is well-known, the
title is a step up, so it goes on the list. This tool replaces that with two disciplines —
a written-down, honestly ranked statement of what you're actually optimizing for, and a
repeatable research process that checks a role against it before you spend real time on
either. Neither discipline is novel on its own. What matters is that the tool actually
enforces them: it won't score a role confidently against an empty profile, and it won't
draft a cover letter with a fabricated failure story just because the structure of a good
letter wants one.

`docs/LESSONS.md` documents the specific, real mistakes that shaped these rules — every one
of them happened once, cost something, and got written down so it wouldn't happen twice.

## Quick start

```bash
git clone https://github.com/tpman87/job-search-os.git my-job-search
cd my-job-search
bash scripts/setup.sh   # installs the safety hook — do this before anything else
```

Then open Claude Code and run `/onboard`. Full walkthrough: **[GETTING-STARTED.md](GETTING-STARTED.md)**.

## What's in here

| Path | What |
|---|---|
| `docs/METHOD.md` | The full method, human-readable, works with any tool or none |
| `docs/LESSONS.md` | Learned rules, each tied to a real (fictionalized) failure |
| `docs/CONFIDENTIALITY.md` | What's protected mechanically vs. what's on you |
| `profile/` | Your data — gitignored, hook-guarded, ships only as `*.template.md` |
| `roles/` `pipeline/` | Your pipeline — same protection |
| `applications/` | Generated packets per role (resume, cover letter, QC report) — same protection |
| `.claude/skills/` | `/onboard` `/evaluate-role` `/sweep` `/tailor` `/cover-letter` `/retrospective` |
| `.claude/agents/packet-qc.md` | Independent QC, mandatory before any resume/letter ships |
| `generators/` | Self-contained docx rendering — `npm install` here only, never global |

## A note on support

This is a one-time, no-strings handoff. There's no ongoing maintenance commitment behind
it — you have a complete, working system as of whatever commit you cloned. If you improve
it, that's yours; it doesn't need to flow back anywhere, and improvements made to any other
instance of this tool don't automatically reach yours either.

## License

MIT — see `LICENSE`.
