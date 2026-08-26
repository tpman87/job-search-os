---
name: cover-letter
description: Draft a cover letter for a specific role, in the user's own voice, with every claim sourced. Use when the user asks for a cover letter, says "write a letter for this role", or wants to apply to a role already saved in roles/active/. Refuses to draft against an empty or near-empty profile/fact-base.md.
tools: Read, Write, Edit, Glob
---

# Cover Letter

A cover letter drafted by an AI system under structural pressure to sound personal and
specific will invent details when the real ones aren't on hand — see `docs/LESSONS.md`
lessons 6-8 for exactly how this happens and why it's convincing when it does. This skill
exists to make that structurally hard to do by accident.

## Step 0 — refuse without a fact base (D9: writing refuses, evaluation degrades)

Check `profile/fact-base.md` and `profile/portfolio.md`. If either is missing or has no
real content beyond the template's `UNKNOWN` placeholders, **do not draft anything.** Say
so plainly: *"There's no fact base to draw from yet — a letter written now would be
fabricating claims about you by construction, not writing about you. Run `/onboard` first
(at least stages 3 and 4), then come back."* This is a hard refusal, unlike
`/evaluate-role`'s degrade-and-banner approach — a provisional verdict is honestly useful;
a provisional cover letter full of invented specifics is not.

## Step 1 — read the role and the profile

Read the target role's file in `roles/active/`. Read `profile/fact-base.md`,
`profile/portfolio.md`, `profile/voice.md`, and `profile/never-claim.md` in full.

## Step 2 — pick 1-3 stories that actually map to this role

Don't reach for the most impressive story in `portfolio.md` by default — reach for the one
whose content actually matches what this specific role's description emphasizes. A
mismatched impressive story reads as generic; a well-matched modest one reads as
attentive.

## Step 3 — pre-commit the friction-beat fact skeleton BEFORE drafting any prose

This is lesson 7 in `docs/LESSONS.md`, applied directly. If the letter will include a
friction/pivot moment (a real failure and what changed), **write out the specific facts
first, each with a citation to where it lives in `profile/portfolio.md`** — including every
number that will appear. Only after that skeleton exists, write the prose. **No number may
enter the prose that wasn't already in the skeleton.** If `portfolio.md`'s failure field
for the story you want to tell is `UNKNOWN`, do not invent one — pick a different story, or
write the letter without a friction beat at all. A letter with no friction beat is honest;
one with an invented friction beat is not.

## Step 4 — the attribution rule, if quoting the employer's own language

If the letter quotes the job posting or company materials back to them, **verify the exact
phrase appears in the exact document being applied to** — not a sibling posting, a
different req, or a different page researched in the same session. If several related
postings from the same employer were researched together, this is exactly where they blur
— re-check, don't rely on memory of which one said what.

## Step 5 — structure

A reasonable default shape, adjust to fit:
1. **Hook** — something specific about the role/company (researched, cited per Step 4 if
   it's a quote), tied to what the user actually does. Not "I'm excited to apply."
2. **Proof** — 1-3 stories from `portfolio.md` that map to this role's actual emphasis.
3. **Address the obvious gap or concern head-on**, if there is one — on the user's own
   terms, honestly, reframed toward the real transferable strength. Burying a known
   concern and hoping it isn't noticed is worse than naming it.
4. **Confident, low-friction close.**

## Step 6 — check voice

Read `profile/voice.md`. If `status: degraded` (no real samples were ever captured), tell
the user the draft will read generic and flag it visibly in the output — don't silently
ship generic prose as if it were calibrated. If real voice rules exist, check the draft
against them: sentence-length variation, natural vocabulary, structural habits. Rewrite
anything that reads uniform or generic against what the samples actually showed.

## Step 7 — every claim gets checked before it ships

Before presenting the draft, walk every factual claim in it and confirm it traces to
`profile/fact-base.md` or `profile/portfolio.md`, and doesn't cross a line in
`profile/never-claim.md`. **This is not optional and not a formality** — this is the exact
check `packet-qc` (see `.claude/agents/packet-qc.md`) re-runs independently, because
self-review by the same process that wrote the draft has a documented track record of
missing exactly this class of error. Run `packet-qc` on every draft before calling it
done, even if this step found nothing.

## Step 8 — save and report

Save the source as `applications/<role-id>/letter.md` — see `applications/README.md` for
the `<role-id>` naming rule (roughly `<company>-<role-slug>[-<req-id>]`); reuse the same
`<role-id>` directory `/tailor` used for this role. If `generators/` is set up, also run
`node generate-cover-letter.js` from inside `applications/<role-id>/` to produce
`letter.docx` alongside it. Tell the user plainly which claims came from where — this
makes the letter auditable by them, not just by the tooling.
