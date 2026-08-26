# Contributing

Thanks for considering a contribution. A few things to know before opening a PR.

## Before you paste anything into an issue or PR

**Never include real content from your own `profile/`, `pipeline/`, `roles/`, or
`applications/`** — comp
figures, employer names, resume text, or anything else about your actual search. Those
directories are gitignored for exactly this reason; a PR or issue is public and permanent
in a way a local file isn't. Use obviously fake placeholder data
(`$XXX,XXX`, `Company A`, `name@example.com`) in any example you share. See
`docs/CONFIDENTIALITY.md` for the full reasoning.

## What's welcome

- Bug fixes in the skills, generators, or hooks
- Improvements to `docs/METHOD.md` or `docs/LESSONS.md` that keep the same "no real
  identifying detail" discipline the existing content follows (see the note at the bottom
  of `docs/LESSONS.md`)
- New skills or refinements to existing ones, as long as they respect the degrade-vs-refuse
  policy in `CLAUDE.md` (evaluation degrades gracefully on a thin profile; writing refuses
  rather than fabricates)
- Generator/rendering fixes — especially anything that improves the manual-markdown
  fallback path when `npm ci` isn't available

## How the process works

1. Fork the repo, branch from `main`.
2. Make your change. If you're touching a skill or the hooks, test it against a throwaway
   local profile — never your real one, and definitely not this repo's.
3. Open a PR against `main`. Branch protection requires at least one approving review
   before merge, and CI (`.github/workflows/ci.yml`: the pre-commit hook's own self-test,
   syntax checks, generator regression tests) must be green — that's not personal, it's the
   same rule for everyone including the repo owner's own changes when they're not exempted.
4. Keep PRs focused. A PR that both fixes a bug and reorganizes unrelated files is harder
   to review honestly.

## Code style

CI checks syntax (`bash -n`, `node --check`) and runs the generator regression tests —
nothing style-level (formatting, linting) is enforced yet. Match the tone and structure of
the file you're editing —
this repo's skills and docs are written in a specific, deliberate voice (direct, no filler,
reasons stated plainly). A PR that's technically correct but reads like it was pasted from
somewhere else will likely come back with review comments asking for a rewrite.

## Questions

Open an issue — see the issue template's warning about not pasting real data first.
