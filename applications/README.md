# applications/

Canonical location for everything generated when you apply to a role: the tailored
résumé (source `.md` + rendered `.docx`), the cover letter (source `.md` + rendered
`.docx`), the independent QC report `/tailor` and `/cover-letter` run before presenting a
draft, and any packet notes worth keeping.

**Nothing under here is ever committed** — `applications/*` is gitignored and categorically
blocked by `hooks/pre-commit` even with `git add -f`. This README is the one exception
(it's documentation, not data), which is why it's the only file you'll see in a fresh
clone.

Per JOBS-ADR-004 D5. This replaced an earlier, undefined "save to the appropriate
location" instruction that pointed at directories (`career/tailored/`,
`career/cover-letters/`) inherited from the private workspace this tool was built from and
that don't exist in this repo.

## Layout

```
applications/
  <role-id>/
    resume.md
    resume.docx
    letter.md
    letter.docx
    qc-report.md
    notes.md            (optional — anything else worth keeping about this application)
```

## The `<role-id>` naming rule

```
<company>-<role-slug>[-<req-id>]
```

- **`<company>`**: lowercase, hyphenated, legal suffixes (Inc, LLC, Corp, Co) stripped —
  `acme corp` → `acme`.
- **`<role-slug>`**: the job title, lowercased, hyphenated, with stopwords stripped
  (a, an, the, of, for, and, or, in, at, to, on), capped at **5 significant words**. A
  12-word title gets cut down to its most identifying 5, not truncated mid-word.
- **`<req-id>`**: the employer's own requisition ID, if the posting has one. Append it
  whenever it exists — it's the cheapest possible disambiguator and it's free.
- **No req-id and a potential collision** (a second role at the same company with a
  similar title): append `-2`, `-3`, etc. Never silently overwrite an existing
  `applications/` directory.

Examples:
- `acme-vp-engineering-platform/` (no req-id, title fit in 5 words)
- `acme-director-cloud-platform-4821/` (req-id `4821` appended)
- `acme-director-cloud-platform-2/` (second similar role at the same company, no req-id
  to disambiguate)

This same rule is reused by `roles/active/` and `roles/passed/` filenames once JOBS-ADR-004
D6 lands (tracked separately — that phase also adds verbatim JD preservation to the role
file itself, not just the application packet).
