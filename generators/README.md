# Generators

Renders a resume or cover-letter source markdown file (see `docs/METHOD.md` and the
`/tailor` / `/cover-letter` skills, which write these files) into a formatted `.docx`.

## Setup

```bash
cd generators
npm install
```

This installs into `generators/node_modules` only — **no global install, ever.** The
original tool this repo was built from resolved its `docx` dependency via a global npm
root, which broke on any machine where a global install wasn't writable (locked-down
corporate laptops, most notably). That's fixed here by design: this folder is
self-contained.

## Usage

```bash
node generate-resume.js ../career/tailored/some-role.md
node generate-cover-letter.js ../career/cover-letters/some-role.md
```

Each writes a `.docx` alongside the source file by default, or to an explicit path if you
pass a second argument.

## If `npm install` fails

This happens most often on a managed/corporate machine with no write access to install
packages, or with no Node.js at all. **You don't need this step to use the rest of the
tool.** The `/tailor` and `/cover-letter` skills write plain markdown source files
regardless of whether the generators work — those files are fully readable and usable on
their own; you can copy the text directly into any document editor and format it by hand.
See `docs/METHOD.md` for the plain-markdown workflow. The generators are a convenience for
producing a polished `.docx` automatically, not a requirement for the tool to function.

## Design notes (why this file matters if you're reading the code)

- **Identity is never hardcoded.** `lib/parse-profile.js` reads name/phone/email/LinkedIn
  fresh from `profile/fact-base.md` on every render. See the comment at the top of
  `lib/docx-engine.js` for why this rule exists — it was a real, documented defect in an
  earlier version of this tool.
- **The `.md` source files are the source of truth.** The `.docx` output is generated and
  disposable — edit the source, regenerate, never hand-edit the `.docx` output directly, or
  your edits will be silently lost the next time it's regenerated.
- **Embedded document metadata**: before this pipeline is trusted for anything you'll send
  externally, generate one sample document and inspect its `core.xml` for a `creator` or
  `lastModifiedBy` field that might leak information about whoever's machine built it. See
  the note in the repo's `docs/ADRs/` history (JOBS-ADR-003 Finding 9 / D8) — this was an
  open question when the pipeline was built and should be checked on your own machine.
