---
name: onboard
description: Guided intake that builds a job-seeker's profile (constraints, drivers, fact base, portfolio, voice, claim boundaries) from a structured interview. Use when a user is setting up this tool for the first time, says "onboard me", "let's get started", "set up my profile", or when any other skill in this repo finds an empty or missing profile/ directory and needs to route here first. Resumable — safe to re-invoke mid-flow.
tools: Read, Write, Edit, Glob
---

# Onboard

Build the user's `profile/` from a real conversation, not a form. This is the front door
of the whole tool — a shallow run here produces shallow verdicts and generic writing
later, silently, because nothing downstream can tell the difference between "the role is
weak" and "the profile is thin." Take the time this actually needs.

## Step 0 — check for resume state, and confirm setup ran

1. Check whether `profile/` contains real files (`constraints.md`, `drivers.md`, etc. — not
   just the `.template.md` files). If none exist, this is a cold start: copy each
   `profile/*.template.md` to `profile/*.md` (drop the `.template` segment) before beginning.
2. **Verify `hooks/pre-commit` is actually installed** (check `.git/hooks/pre-commit` exists
   and is executable). If not, stop and tell the user to run `bash scripts/setup.sh` first —
   do not proceed with an interview whose output has no protection against being committed.
3. Read every `profile/*.md` file that exists. For each of the seven stages below, check
   whether its fields still say `UNKNOWN` or whether they've been filled in.
4. **Report status before asking anything**: "You've completed stages 1, 2, and 4. Stage 3
   (fact base) has 2 of 6 roles filled in. Want to continue there, or jump to something
   else?" Never restart a stage that has real content in it — ask what to add, not to redo.

This makes the flow resumable by construction: because every answer is written to
`profile/*.md` as it's given (see each stage below), there is no separate "session state"
to lose. The files ARE the state.

## The seven stages

Work through these in order for a cold start; for a resume, go wherever the user wants.
**After every stage, write the answer to the corresponding `profile/*.md` file
immediately** — don't hold answers in conversation and write them at the end. If the
session ends mid-stage, the next run picks up from exactly what's on disk.

### Stage 1 — Constraints (`profile/constraints.md`)
Ask for comp floor, location tiers, travel tolerance, and domain exclusions. **Push on the
comp floor specifically**: ask how they know their current total comp, not just what they
think it is. If they haven't actually added up base + bonus + equity recently, that's the
first homework — write `UNKNOWN` rather than let a rough guess become the number every
future evaluation is scored against.

Domain exclusions: ask "what's a hard no regardless of the offer?" Don't suggest a list —
their answer should come from them, not from a menu.

### Stage 2 — Drivers (`profile/drivers.md`)
This is the highest-leverage stage and the one people answer worst on autopilot. **Force a
strict ranking, no ties.** If they give you a flat list, push back: "if pay and role
prestige pulled in opposite directions, which wins?" Use the prompts in the template file
if they're stuck. Write the ranked list, not just their raw answer — do the synthesis work
so the file is usable by the scoring skills, not just readable by a human later.

### Stage 3 — Fact base (`profile/fact-base.md`)
Walk employment history in reverse-chronological order. For each achievement they mention,
ask "how would you back that up if an interviewer pushed on it?" — and if they can't answer
cleanly, mark it `[CONFIRM]` rather than write it as settled fact. **Do not let a good story
smooth over an unverifiable number.**

### Stage 4 — Portfolio (`profile/portfolio.md`) — interrogate the failure field
For each project they want to feature, get the standard shape (problem, architecture,
results) — but treat the "documented failure" field differently from the rest. **Do not
accept a single smooth answer.** Ask the three follow-ups explicitly:
1. "What did you actually try first, and what didn't work?"
2. "How do you know it didn't work — what did you see, or who told you?"
3. "What changed, specifically, and what would you point to as evidence it changed?"

If the answers stay vague after these follow-ups, **write the failure field as `UNKNOWN`
and say so out loud** — "we don't have a clean failure story for this one, and that's fine,
we just won't use it for the friction beat in a cover letter." This is not a formality: an
interview flow that accepts a vague answer here reproduces the exact fabrication pattern
this tool's writing layer exists to prevent, just one step earlier in the pipeline.

Also capture the claim-discipline note for each project — what it does NOT prove, so a
future draft doesn't stretch it by adjacency.

### Stage 5 — Personal anti-patterns (part of `profile/drivers.md`)
"What has burned you or bored you in a past role, specifically?" Write these down verbatim
where possible — specific language is more useful to a future evaluator than a generalized
category.

### Stage 6 — Voice (`profile/voice.md`) — screen every sample
Ask for 2-3 real writing samples: an email, a document, a message thread — something they
wrote themselves, in a real context, not something already polished by an AI tool.

**Screen each sample before accepting it.** Read it for the shape of AI-generated prose:
uniformly even sentence lengths, no contractions, generic transitional phrases ("it's worth
noting that," "in today's fast-paced environment"), an absence of any small imperfection or
personal quirk. If a sample reads this way, say so directly: "this one reads pretty
polished/generic — do you have something rawer, even an old email or a Slack message?"
Don't silently accept a sample that will poison the derived voice with someone else's
patterns while the user believes it's capturing their own.

From accepted samples, derive: typical sentence-length range, structural habits, words they
naturally use vs. words that would feel foreign in their mouth, and their general register
(direct, humorous, formal, etc.). Write these as concrete rules other skills can check
drafts against — not just a vague "sounds like them."

**If no usable sample is ever produced**, set `status: degraded` in `voice.md` explicitly.
Tell the user plainly: the writing skills will still work, but output will read generic, and
every draft will carry a visible note saying so. This is the honest outcome, not a failure.

### Stage 7 — Never-claim (`profile/never-claim.md`)
Ask directly: "is there anything you'd be tempted to round up on a resume, because a job
description wants it and you're 'probably fine' at it?" Most people have a few of these
once asked directly, and naming them here is what lets the writing skills catch an
overclaim later without re-litigating it with the user every time.

## Completing the run

When all seven stages have real content (not `UNKNOWN` in every field — some `UNKNOWN`s are
fine and expected), tell the user their profile is ready and that `/evaluate-role` will now
produce full-confidence verdicts instead of the provisional-verdict banner. Point out
specifically which fields are still `UNKNOWN`, since those will keep showing up in banners
until resolved.

**Never claim the profile is "complete."** A profile is always improvable; report
completeness as "these fields are filled, these are still UNKNOWN" rather than a pass/fail
state.
