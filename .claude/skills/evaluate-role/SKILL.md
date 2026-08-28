---
name: evaluate-role
description: Evaluate a job opportunity against the user's profile. Use when the user pastes a job description, a job link, or a company name and asks whether to pursue a role, or says "evaluate this role", "assess this JD", "should I apply", or "vet this company". Runs a front-end filter, live company due-diligence research, and a fit scorecard, then produces a decisive Pursue/Explore Further/Pass verdict and saves it to roles/.
tools: Read, Write, Edit, WebSearch, WebFetch, Glob
---

# Evaluate Role

**Preflight (JOBS-ADR-004 D12):** read `pipeline/LEARNED.md` first, if it exists — skip if
absent. Treat every entry there as binding, exactly like a rule in `constraints.md`.

Produce a decisive, research-backed assessment of a job opportunity against the user's own
profile — never against a generic notion of a "good role." **Lead with the verdict. Be
direct. Don't hedge** — except in exactly the one place hedging is correct (see Step 0).

## Step 0 — check profile completeness FIRST, always

Before anything else, read every `profile/*.md` file (skip any that don't exist yet — that
itself is a completeness signal). Count how many required fields per stage still say
`UNKNOWN`, and note whether `profile/` doesn't exist at all.

**If `profile/` doesn't exist or has no real content:** don't run a full evaluation. Say so
directly and route to `/onboard`: *"I don't have a profile to score this against yet —
let's set that up first (`/onboard`), or I can give you a surface read with no scoring, if
you'd rather see the tool work first."* Offer the surface-read option; don't hard-block.

**If `profile/` exists but is thin:** run the full evaluation, but **prepend a visible
provisional-verdict banner naming the specific thin stages**, not a generic disclaimer:

> ⚠️ **Provisional verdict** — this profile is missing: [comp floor / drivers ranking /
> portfolio project 2's failure field / voice samples — name the actual thin fields].
> This verdict may be less reliable than the confidence below suggests. Resume onboarding
> with `/onboard` to sharpen it.

This is the one place this skill deliberately dilutes its own "don't hedge" instruction.
The reason: a confident wrong verdict from a thin profile is a silent failure — nobody
investigates a role they were told to Pass on, so a wrong Pass from a bad framework never
gets caught. A visibly hedged verdict the user can calibrate against is strictly better
than a confident one they can't.

## Step 1 — front-end filter (fast reject)

Check the JD against `profile/constraints.md`:
- Domain exclusions the user named — treat these as immediate disqualifiers.
- Location: check which tier the role falls in (see `profile/constraints.md` Tier 1/Tier 2
  structure). A role outside every configured tier → reject, and say so — don't extend a
  tier to a new location "by analogy"; that requires the user to deliberately edit
  `constraints.md` first.
- Structural hard-no: "influence without authority" — a role with no team and no real
  decision rights, regardless of title.
- Comp: **reject on comp only when a visible band's entire top is clearly under the
  floor.** Never infer comp from title, seniority language, or reporting line — that
  inference has produced real wrong verdicts before (see `docs/LESSONS.md`). If comp isn't
  visible, research it (see Step 2) before rejecting on it.
- Travel tolerance beyond what `constraints.md` states.

If a hard filter trips, you may issue a **Pass** immediately — but still name what tripped
it. Otherwise continue.

## Step 2 — live company due-diligence

Use **live web research** — never assert company health from memory. Run these checks:
- Recent news (funding, layoffs, exec changes, pivots) — past 6 months.
- Public sentiment (Glassdoor-style ratings, leadership themes) if available.
- Headcount/employee-count trend if visible (growing/shrinking).
- If B2B: category/analyst positioning. If PE/VC-backed: identify the investor and their
  stated thesis — growth vs. cost-cutting is a materially different signal, not a neutral
  fact.
- Comp: search for the actual band for this title/level (job-board aggregators with salary
  data, transparency-state postings for the same employer/title) to validate against the
  floor in `constraints.md`.

Track how many checks return a concerning signal. **More than 3 → escalate scrutiny
explicitly** — say so in the output, don't just quietly weigh it in.

**Before investing real research time, confirm the posting is actually live on the
employer's own careers page/ATS** — aggregators keep dead listings up long after an
employer closes them. A 404 or an "expired" redirect on the employer's own site is a
signal, not an inconvenience; stop and say so rather than writing a full assessment for a
closed role. Re-confirm this before any resume tailoring — postings close mid-pipeline.

## Step 3 — score the fit dimensions

Use the dimensions in `roles/_TEMPLATE.md` (edit that file if the user's `drivers.md`
implies different dimensions matter more). Rate each Strong / Partial / Weak /
Disqualifier with a one-sentence rationale, **scored against `profile/drivers.md`'s ranked
list, not against a generic notion of seniority.** A dimension the user ranked low in
`drivers.md` should not silently dominate the verdict just because it's easy to assess.

**Title and team size are not criteria unless the user's own `drivers.md` says they are.**
Score authority from headcount and real decision rights described in the JD, not from
title. Never treat a bigger title or a bigger team as inherently better — that correlation
runs the wrong direction often enough that assuming it has produced wrong verdicts before
(a role ranked #1 in one sourcing sweep purely because it carried the biggest title in a
cluster turned out to carry the least real authority — see `docs/LESSONS.md`).

## Step 4 — estimate compensation

Give a total-comp range (base + bonus + equity) from JD signals + market data + company
stage. **Explicitly flag** if it likely misses the floor in `constraints.md`.

## Step 5 — write the assessment

**Before creating a new file, check for an existing one on this company** (JOBS-ADR-004
D6): glob `roles/active/*.md` and `roles/passed/*.md` for a file whose company name
matches, under EITHER naming shape — an old `<company-slug>.md` file from before this rule
existed, or a current `<role-id>.md` file. A match under either shape means this is an
update to an existing evaluation, not a new one: ask the user whether to update that file
in place or, if it's genuinely a different role at the same company, proceed with a new
file. Never silently create a second file for a company already tracked. This repo never
migrates an old file's name just because you touched it (see README.md's one-time-handoff
stance) — leave a pre-existing `<company-slug>.md` exactly as named.

Output in the format in `roles/_TEMPLATE.md`, then save it:
- Copy `roles/_TEMPLATE.md` → `roles/active/<role-id>.md` (or `roles/passed/` on a Pass) —
  see `applications/README.md` for the `<role-id>` naming rule
  (`<company>-<role-slug>[-<req-id>]`), filled in — including the provisional-verdict
  banner content if one was shown, so the file stays honest about the confidence it was
  written under.
- **Capture the verbatim JD** (JOBS-ADR-004 D6): paste the full posting text, unedited,
  into the "Verbatim Job Description" section, and fill in Req ID, Source URL, Retrieved
  date, and Closing date (if the posting states one). This is provenance — a posting can be
  edited or pulled later, and this is the only record of what it said when you evaluated
  it. Do not paraphrase or summarize it in that section; save summarizing for the scorecard.
- Update `pipeline/BACKLOG.md` with the role's status and open due-diligence items.
- Confirm the saved path to the user.

## Output format (present in chat AND save to file)
```
[⚠️ Provisional-verdict banner, if profile is thin — see Step 0]
✅ Verdict        — one sentence: Pursue / Explore Further / Pass / Conditional + primary reason
📊 Fit Scorecard  — dimensions scored against drivers.md, rating + 1-sentence rationale each
🟢 What Works     — genuine alignment points
🔴 Concerns & Red Flags — honest, specific; call out automatic disqualifiers
🏢 Company Snapshot — health/culture/trajectory, with sources; note >3-signal escalation
💰 Compensation Assessment — estimated total-comp range; flag if it misses the floor
❓ Questions to Ask If You Move Forward — sharp questions that pressure-test the red flags
```

## Style
Decisive verdict first, except the one deliberate hedge in Step 0. Pattern recognition over
generic advice — score against *this* user's `drivers.md`, not a template person. Cite
sources for company-health claims. If research is thin or a source is unreachable, say so
rather than guessing.
