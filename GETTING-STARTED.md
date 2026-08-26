# Getting Started

## Step 0 — before anything else

**If you got here via GitHub's "Use this template" button, set your copy to Private
before you go any further.** Public is sometimes the default on that flow; check it
explicitly. This is defense-in-depth, not the reason your data is safe — your real data is
already gitignored and hook-blocked from ever being committed at all, private repo or not.
Setting it Private is one more layer against a mistake in that mechanism, not permission to
commit real data because the repo is private. Your real data will live in `profile/` and
`pipeline/` in your own copy of this repo — see `docs/CONFIDENTIALITY.md` for exactly
what's protected, what isn't, and what's inherent to running this inside an AI assistant.

## Step 1 — install the safety hook

```bash
bash scripts/setup.sh
```

This installs a pre-commit hook that refuses to let real personal data (comp figures,
phone numbers, employer names in the wrong place) leave your machine, and proves it
actually works before finishing. **`git clone` does not install this for you** — that's
why it's a manual first step rather than something you can skip. Nothing in `profile/` or
`pipeline/` is protected until this has run.

## Step 2 — run the interview

Open Claude Code in this repo and run:

```
/onboard
```

This is a real conversation, not a form — expect it to take a while (realistically an hour
or more spread across however many sittings you want; it saves your progress as you go, so
you can stop and resume anytime). It builds your `profile/` from scratch: your
constraints, what you're actually optimizing for, your career facts, a few projects worth
featuring, your writing voice, and where your honest boundaries are. The quality of
everything downstream — role verdicts, resumes, cover letters — depends entirely on how
real this is. A rushed answer here produces a generic result later, silently.

**Have 2-3 pieces of real writing on hand** (an email, a document, a message you sent) for
the voice-capture stage — not something already polished by another AI tool.

## Step 3 — evaluate a role

Paste a job description, a link, or just a company + title:

```
/evaluate-role
```

If your profile is still thin, you'll get a verdict with a visible banner naming what's
missing — that's intentional, not a bug. It's more honest than a confident verdict from an
incomplete picture.

## Step 4 — if it's a Pursue: tailor a resume and letter

```
/tailor
/cover-letter
```

Both refuse to draft anything if your fact base is empty — that's also intentional (see
`CLAUDE.md`'s degrade-vs-refuse policy). An independent QC check (`packet-qc`) runs on
every draft before it's presented as ready to send, and reports specific, fixable findings
rather than a bare pass/fail.

## Step 5 — optional: generate polished documents

```bash
cd generators
npm ci
node generate-resume.js ../applications/some-company-role/resume.md
```

If `npm ci` fails (common on a locked-down corporate machine), you don't need this —
the markdown source files `/tailor` and `/cover-letter` write are fully usable on their
own; copy the text into any document editor. See `generators/README.md`.

---

## Five things people usually ask, answered before you have to ask them

**"The generator won't run."** Almost always `npm install` failing on a machine without
Node.js or without write access to install packages. You don't need it — see Step 5 above.

**"The interview gave me a generic-feeling result."** That means it went too fast. Go back
into `/onboard` — it resumes exactly where you left off — and give fuller answers,
especially in the drivers-ranking and portfolio-failure stages, which are the two that do
the most work.

**"Can I get updates to the method as the maintainer learns more?"** No — this is a
one-time handoff with no ongoing support (see `README.md`). You have a complete, working
copy; improvements the maintainer makes to their own instance don't flow to you
automatically.

**"Something broke that isn't covered above."** Check `docs/CONFIDENTIALITY.md` and
`docs/METHOD.md` first — most non-obvious behavior (the refuse-vs-degrade split, the
hook's exact rules) is explained there. If it's a genuine bug in the tool itself, the repo
accepts issues — read the issue template's warning about not pasting real data into a
public issue first.

**"Can I share this with someone else?"** Yes — point them at the repo, not at your own
copy. Your `profile/`, `pipeline/`, and `roles/` are yours; a fresh clone starts empty for
them, exactly like yours did.
