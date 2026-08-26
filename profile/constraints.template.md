# Constraints
<!--
Copy this file to constraints.md (gitignored — never committed) and fill it in.
This is the ONLY place these values live. Every skill in this repo reads from here.
Do not duplicate a value into a skill file or a checklist — that already went wrong once
in the tool this repo was built from: a location rule and a comp floor each drifted
across three-plus files despite an explicit "single source of truth" decision, because
the convention was never mechanically enforced. Here it is: the pre-commit hook
(hooks/pre-commit) refuses to let a comp figure or location string leave this file.

Write UNKNOWN, never a plausible default. An unresolved field that says UNKNOWN gets
re-checked. A field with an invented value never does, because nothing looks missing.
-->

## Compensation floor
- **Current total comp** (base + bonus + equity, honestly totaled): UNKNOWN
- **Minimum acceptable** (usually = current, sometimes higher): UNKNOWN
- **Target** (the number that makes a move clearly worth it): UNKNOWN
- **How was this researched, not guessed?** (Levels.fyi / Glassdoor / a specific recruiter
  conversation / a transparency-state posting for your own title) — cite the source:

> The floor must be a number you would defend to yourself in six months, not a round
> number that felt right today. If you don't know your own total comp precisely, that's
> the first thing to go compute — not to estimate.

## Location
- **Home base:** UNKNOWN
- **Tier 1 — no-relocation zone:** fully remote, or [your local commutable metro]. Fill in.
- **Tier 2 — relocation-eligible (optional, scoped, off by default):**
  - Is relocation on the table at all? UNKNOWN (default: no)
  - If yes: which metro(s), specifically? A metro not listed here is out of scope — do not
    extend by analogy; edit this file deliberately instead.
  - Household feasibility cleared? (A one-time unlock before the FIRST relocation
    application, re-confirmed at offer stage — this is not a box to check once and forget.)
- **Travel tolerance:** UNKNOWN (occasional / up to X%/ regular is a disqualifier)

## Domain exclusions (non-negotiable — a role hitting one of these is an automatic Pass)
- UNKNOWN — list industries, work types, or role shapes that are hard nos for you.
  (Examples from the tool's own origin, not prescriptive: some people exclude
  pre-sales/GTM engineering roles regardless of title; some exclude specific regulated
  industries; some exclude 100%-onsite. Yours will be different — don't inherit these.)

## Structural hard-no (not domain-specific — a pattern, not an industry)
"Influence without authority": a role with no team and no real decision rights, regardless
of title. Most people find this is a hard no once they see it named. Confirm or edit:
UNKNOWN
