# The Method

This document stands alone — you can use everything in it with no tooling at all, a
notebook, or any other AI assistant. The skills in `.claude/skills/` automate it; they
don't invent it.

## The core idea

Most job searches run on vibes: a role looks impressive, the company is well-known, the
title is a step up, so it goes on the list. This method replaces vibes with two things —
**a written-down, ranked statement of what you actually want** (`profile/drivers.md`), and
**a repeatable research process** that checks a role and a company against it before you
spend real time on either. The research process matters more than the framework: most of
what makes a wrong verdict is a fact that could have been checked and wasn't.

## Step 1 — know what you're actually optimizing for

Before evaluating any role, write down your drivers, **ranked, no ties.** Most people skip
this and default to title-and-comp as the only two axes, then wonder why a role that
scored well on paper felt wrong. See `profile/drivers.template.md` for the intake
questions — the short version is: if two things you want ever conflicted directly, which
one wins? Answer that for every pair that matters, and you have your ranking.

**Title is not automatically a proxy for anything** — not pay, not authority, not scope.
Score each dimension on its own evidence. A smaller title with real decision rights and a
real team beats a bigger title with neither, and the two correlate less often than
intuition suggests.

## Step 2 — the front-end filter (cheap, run it first)

Before spending real research time on a role, check it against your hard constraints:
- Domain exclusions you've named.
- Location tier (see the two-tier structure in `profile/constraints.template.md` — a
  default "no relocation" zone plus an optional, narrowly-scoped relocation tier with
  explicit gates, never opened by assuming one exception generalizes to others).
- The one universal structural hard-no: **influence without authority** — a role
  describing outcomes it owns but no team, no budget, no real decision rights. This
  pattern shows up disguised behind senior-sounding titles more often than you'd expect.
- Comp, but only when a *visible band's entire top* is clearly under your floor. Never
  reject on an *inferred* comp — a guess based on title, seniority language, or reporting
  line. That inference is wrong often enough to be actively dangerous; research it instead.

If something trips here, you can Pass immediately — but write down what tripped it. That
record is what prevents a nearly-identical bad-fit role from eating another hour of your
time in three weeks.

## Step 3 — confirm the posting is actually alive

**Before any deep research, confirm the role is open on the employer's own careers page —
not an aggregator.** Job boards (LinkedIn, Indeed, and the smaller aggregators) keep
listings up long after an employer pulls them. A 404, an "expired" redirect, or a posting
you can't find on the employer's own ATS (Greenhouse, Lever, Workday, Ashby, etc.) is a
real signal that the role is gone, not a glitch to route around. Confirm again immediately
before tailoring a resume — postings close mid-process, and a resume tailored to a dead req
is wasted work you won't discover until you don't hear back.

## Step 4 — live company due-diligence, every time

Never assess a company from memory or reputation alone — research it live, for every
role you take seriously. At minimum:
- Recent news: funding, layoffs, executive departures, strategic pivots (last 6 months).
- Public sentiment signals if available (review-site ratings, recurring themes in
  comments about leadership or direction).
- Headcount trend — growing or shrinking, and where this role sits in that trend.
- If venture- or PE-backed: identify the investor and their stated thesis. A growth
  mandate and a cost-cutting mandate produce very different roles even at superficially
  similar companies — this single fact changes more verdicts than almost anything else on
  this list.
- Comp: search for real market data on the specific title and level, not just what's in the
  posting.

**If more than three checks return a concerning signal, say so explicitly and escalate
scrutiny** — don't quietly average it into a middling verdict. A cluster of weak signals is
information a single weak signal isn't.

## Step 5 — score the fit, against YOUR drivers

Use whatever dimensions matter given your `drivers.md` — a common starting set is scope &
authority, technical/domain alignment, working-style fit, compensation, and
location/lifestyle. Rate each honestly (Strong / Partial / Weak / Disqualifier) with one
sentence of reasoning. **A dimension you ranked low in `drivers.md` should not silently
dominate the verdict just because it's the easiest one to assess** — comp is almost always
the easiest thing to research, which makes it tempting to over-weight relative to how much
you actually said it matters.

## Step 6 — verdict first, then justification

Lead with a decisive verdict — Pursue / Explore Further / Pass / Conditional — then explain
it. Don't bury the conclusion under a wall of research notes. The scorecard and company
snapshot exist to justify the verdict, not to replace having one.

**Except:** when your own profile is thin — comp floor still `UNKNOWN`, drivers unranked,
no writing samples — a confident verdict is actively misleading. See `profile/*.md`'s role
in producing a provisional-verdict banner, described in the `/evaluate-role` skill. A
hedged verdict you can calibrate against beats a confident one you can't.

## Sourcing — search by vocabulary, not by industry

If your target role type crosses industries (a lot of modern roles do — "AI-forward
engineering leadership" shows up in healthcare, fintech, logistics, and retail alike),
searching by industry first will systematically miss matches. Instead: take a role
description that's a strong fingerprint for what you want, extract its actual vocabulary
(the specific phrases it uses for scope, technology, and working style), and search job
postings for that vocabulary directly. This surfaces matches an industry-first search
misses entirely, and it's cheap to run repeatedly as your fingerprint sharpens.

**Confirm every result live on the employer's own ATS before logging it** — same rule as
Step 3, applied at scale across a sweep instead of one role at a time.

## Pipeline hygiene

- **A non-response is a rejection after about two weeks — with carve-outs.** The default
  applies to a cold application with no human contact: move it to your "passed" list with a
  dated note, and don't chase it with a follow-up. But a referral/warm contact, an active
  recruiter thread, or a completed interview changes what silence means, so the clock
  doesn't apply the same way once one of those is true. It also doesn't stop entirely: it
  **resets** from whichever is more recent of your last actual human contact or a date the
  employer themselves gave you — a carve-out is a reason the clock restarted, not a reason
  it stopped forever. See `pipeline/BACKLOG.template.md` for the full rule. Nothing is
  deleted either way; a late callback flips a role back to active at zero cost.
- **Track lifecycle state explicitly**, not just "active" vs. "passed": Shortlisted →
  Applied → Recruiter Screen → Interview → Offer / Rejected / Withdrawn / Retired-silent,
  plus On Hold for a hiring freeze (freezes are real and shouldn't read as a rejection).
  The three terminal states are explicitly reversible — see `roles/_TEMPLATE.md`'s Status
  field and Application Tracking section.
- **Never delete a passed-on role.** The reasons you passed are pattern memory — re-reading
  them before evaluating a similar role sharpens the next verdict the same way avoiding a
  repeated mistake does.
- **When a role reaches a terminal state, capture the outcome** — did they respond, did you
  screen, what channel sourced it, which packet version, the stated reason if any — into
  `pipeline/LEARNED.md`'s outcomes section. This is what lets `/retrospective` find real
  patterns (which channels actually convert, which packet framing gets a response) instead
  of relying on impression.
- Run the non-response check at the start of every session, not just when you remember to.
  A pipeline that only gets cleaned occasionally accumulates dead "awaiting response" rows
  that make your active count look bigger than it really is.

## Writing resumes and cover letters that actually sound like you, and stay honest

See `docs/LESSONS.md` for the specific failure patterns this guards against and why they
happen. The short version: claims need a source in `profile/fact-base.md` or
`profile/portfolio.md`, no exceptions, and the writing skills refuse to draft against an
empty fact base rather than produce something plausible-sounding and unsupported.

Every generated packet — the tailored resume, the cover letter, and the QC report run
against both — lives in `applications/<role-id>/`. See `applications/README.md` for the
naming rule; like `profile/` and `roles/`, nothing under it is ever committed.
