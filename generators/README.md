# Generators

Renders a resume or cover-letter source markdown file (see `docs/METHOD.md` and the
`/tailor` / `/cover-letter` skills, which write these files) into a formatted `.docx`.

## Setup

Requires Node.js 18 or later.

```bash
cd generators
npm ci
```

(`npm ci` installs exactly what's pinned in `package-lock.json` — use `npm install` only if
you're deliberately updating a dependency version.)

This installs into `generators/node_modules` only — **no global install, ever.** The
original tool this repo was built from resolved its `docx` dependency via a global npm
root, which broke on any machine where a global install wasn't writable (locked-down
corporate laptops, most notably). That's fixed here by design: this folder is
self-contained.

## Usage

```bash
node generate-resume.js ../applications/some-company-role/resume.md
node generate-cover-letter.js ../applications/some-company-role/letter.md
```

Each writes a `.docx` alongside the source file by default, or to an explicit path if you
pass a second argument. See `applications/README.md` for the `<role-id>` directory naming
rule. The source must be a `.md` file, and the output path must differ from the source —
both are refused outright rather than silently overwriting the source with binary `.docx`
bytes (a real defect in an earlier version of this tool, JOBS-ADR-004 D4).

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
- **Embedded document metadata — checked, closed (JOBS-ADR-004 D15).** `core.xml`'s
  `dc:creator`/`cp:lastModifiedBy` fields are a static `"Un-named"` from the `docx` library
  itself, not your OS username or any local path — verified by inspecting a generated
  document's `core.xml` directly, and asserted on every CI run
  (`generators/test/run-tests.js`) so a future `docx` version change that starts leaking
  real machine info would fail the build rather than ship silently. This was an open
  question in JOBS-ADR-003 Finding 9 / D8; it's resolved.
