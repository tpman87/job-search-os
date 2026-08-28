# Changelog

Entries are written at tag time, not maintained continuously — see `docs/ADRs/` for the
decisions behind each release.

## v1.0.0 — 2026-08-26

Phase 3 of the audit remediation (JOBS-ADR-004): the application-lifecycle half of the
tool. **Breaking**: `roles/active/` and `roles/passed/` filenames change shape (D6) — see
below. This is the breaking change v0.9.0 was held back from 1.0 for.

- **Breaking — role file naming (D6)**: role files now use `<role-id>.md`
  (`<company>-<role-slug>[-<req-id>]`, same rule as `applications/<role-id>/`), not
  `<company-slug>.md`. **Existing clones are NOT migrated** — this repo makes no promise to
  update files in an existing instance (see README's one-time-handoff stance).
  `/evaluate-role`'s duplicate check matches company name across both naming shapes, so an
  old file and a new evaluation for the same company prompt an update rather than a silent
  duplicate.
- **New — verbatim JD preservation (D6)**: role files now capture the full posting text,
  req ID, source URL, retrieval date, and closing date (if stated) at evaluation time. A
  posting can be edited or pulled later; this is the only record of what it said when you
  evaluated it. Deliberately does not also store a content hash — for a single-user
  markdown file, verbatim text plus a date already is full provenance.
- **New — application lifecycle (D7)**: explicit status states (Shortlisted → Applied →
  Recruiter Screen → Interview → Offer / Rejected / Withdrawn / Retired-silent, plus On
  Hold for a hiring freeze), all three terminal states explicitly reversible. Each role
  file now tracks packet-sent date, referral/contact, next action + due date, and a dated
  history log; `pipeline/BACKLOG.template.md` gained matching Status and Next Action
  columns.
- **New — requirement-to-evidence matrix (D8)**: `/tailor` now builds a JD-requirement →
  evidence table (Verified / Partial / Missing / Unknown, each with its `fact-base.md` or
  `portfolio.md` citation) before writing any resume prose — an ATS-alignment check and the
  claim-discipline check from the same skill, stated as one table instead of two.
- **Changed — the 14-day non-response rule now has carve-outs, with a reset (D9)**: a
  referral, an active recruiter thread, or a completed interview changes what silence
  means — but the clock doesn't stop for good, it resets from whichever is more recent of
  your last actual human contact or a company-stated date. (This changes the public
  template only.)
- **New — outcome capture (D11, halved from the original design)**: when a role reaches a
  terminal state, capture the outcome (response? screen reached? source channel? packet
  version? stated reason?) into `pipeline/LEARNED.md`'s new Outcomes section; `/retrospective`
  reads it for real patterns. The mechanical trade-off/confidence scoring apparatus from
  the original design was cut — no real reader for it in a single-decision-maker tool.
- **New — LEARNED.md preflight, enforced (D12)**: every skill now declares a literal
  preflight line naming `pipeline/LEARNED.md` as required reading; `scripts/check-preflight.sh`
  (wired into CI) fails the build if any skill's line goes missing, so this can't quietly
  drift back into an unenforced convention.
- **New — synthetic end-to-end demo (D18)**: `docs/DEMO.md` walks a fully fictional role
  through every stage (evaluate → tailor → cover letter → QC), reusing the same synthetic
  persona as the CI fixtures rather than inventing a second fake identity to keep straight.

Phase 4 (Codex adapters, D19) remains backlogged pending independent verification of
Codex's current discovery paths — tracked separately, not part of this release.

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
