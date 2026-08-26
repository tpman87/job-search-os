# Changelog

Entries are written at tag time, not maintained continuously — see `docs/ADRs/` for the
decisions behind each release.

## v0.9.0 — 2026-08-25

Pre-1.0: the naming conventions below are expected to be final, but `roles/active/` and
`roles/passed/` filenames still change in a near-term follow-up (JOBS-ADR-004 D6) before a
1.0 tag is cut.

Remediation from an external audit (JOBS-ADR-004), QC'd by five independent review lenses:

- **Security fix**: `SECURITY.md` and `docs/CONFIDENTIALITY.md` no longer claim your data
  "never leaves your machine" — it's processed by whichever AI assistant you're running
  this inside of, same as any AI-assisted work. What this tool actually controls (keeping
  data out of git/GitHub) is now stated precisely, alongside links to the current Claude
  Code and Codex data-usage docs.
- **Security fix**: `hooks/pre-commit` now also blocks `pipeline/*.md` and everything under
  `applications/` (previously only `profile/` and `roles/` were covered), matches
  case-insensitively, is rename-proof, and categorically refuses binary/image files
  outside `docs/` — a screenshot of an offer letter previously passed the text-only scrub
  untouched.
- **Security fix**: `scripts/setup.sh`'s self-test previously treated *any* failed
  `git commit` as proof the hook worked. It now asserts the commit's own output names the
  hook as the cause, and separately confirms `core.hooksPath` isn't silently routing
  commits around the installed hook altogether.
- **Bug fix**: both `generators/generate-*.js` scripts would silently overwrite a non-`.md`
  source file with binary `.docx` bytes if pointed at one by mistake. Both now refuse a
  non-`.md` source and refuse when the computed output path matches the source path, and
  write atomically.
- **New**: `applications/<role-id>/` is now the defined, documented location for generated
  packets (resume, cover letter, QC report) — replacing an undefined "save to the
  appropriate location" instruction that pointed at directories from the private workspace
  this tool was built from and that don't exist in this repo. See `applications/README.md`
  for the naming rule.
- Repository hygiene: enabled as a GitHub template repo, enabled private vulnerability
  reporting, renamed `Career-Search` → `job-search-os` (matching the name used everywhere
  else in the repo), pinned Node.js 18+ and switched setup docs to `npm ci`.
