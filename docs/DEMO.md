# Demo — a full walkthrough, start to finish

<!-- JOBS-ADR-004 D18. Everything below is entirely fictional: the person, the company
     being evaluated, the role, every number, every quote. This uses the same synthetic
     persona (Pat Testworthy / Acme Testing Co) as generators/test/fixtures/, per JOBS-ADR-003
     D10's fictionalization rule and this ADR's requirement that the demo and the CI
     fixtures share one synthetic profile rather than inventing a second fake persona to
     keep straight. If any detail here resembles something real, that's coincidence. -->

This walks one role, start to finish, through every stage this tool automates:
`/evaluate-role` → `/tailor` → `/cover-letter` → `packet-qc`. Read it before your first
real run if you want to see the shape of the output before you commit an hour to
`/onboard`. Nothing here is executable — it's a fixed illustration, not a script.

## The (fictional) person: Pat Testworthy

**`profile/constraints.md` (excerpt):**
- Comp floor: $185K total comp (verified — added up base + last two bonus payouts + vested
  equity value from the actual account statement, not a guess)
- Location: Tier 1 (remote / Testville-metro), no Tier 2 configured
- Domain exclusions: none named
- Structural hard-no: influence without authority

**`profile/drivers.md` (excerpt, ranked, no ties):**
1. Hands-on technical leadership — still reviewing designs and code, not purely people
   management
2. Compensation clears the floor
3. Small team (4-8 direct reports) over a large org
4. Remote-first culture
5. Title — explicitly ranked last; Pat has taken a lower title before for a better team

**`profile/portfolio.md` (excerpt — Project 1, with its documented failure):**
> **The problem:** Acme's fixture-verification pipeline took 40 minutes per run, so
> engineers stopped running it before pushing.
> **What was tried first:** A caching layer that skipped unchanged fixtures — shipped,
> declared done.
> **What specifically changed:** the cache had a correctness bug that skipped fixtures
> whose *dependencies* changed, not just the fixture file itself — two silent regressions
> reached production before anyone noticed the cache was the cause.
> **Who noticed:** the second regression triggered a customer-facing incident; the
> post-mortem traced it to the cache's dependency-tracking gap specifically.
> **What changed:** rebuilt the cache key from a full dependency-hash instead of the
> fixture file's own mtime; added a nightly full-run with no cache as a backstop.
> **What you'd cite if asked "how do you know":** zero cache-related regressions in the
> following two quarters, tracked in the same incident log that caught the first two.

## Step 1 — `/evaluate-role`, run against a pasted JD

**Fictional target: "Vertex Fixture Systems," Director of Platform Engineering**

```
✅ Verdict — Explore Further. Strong technical fit, but comp isn't visible and the org
   chart in the JD is ambiguous about real headcount authority — resolve both before
   investing in a tailored packet.

📊 Fit Scorecard (scored against Pat's drivers.md, not a generic template)
| Dimension                     | Rating   | Rationale |
|---|---|---|
| Scope & Authority              | Partial  | JD says "lead platform strategy" but doesn't state team size — the exact ambiguity drivers.md ranks as the thing to resolve before comp, since it's Pat's #1 driver |
| Technical / Domain Alignment   | Strong   | JD's "test infrastructure at scale" language is a near-literal match for the Acme fixture-pipeline project |
| Leadership / Working Style Fit | Strong   | "player-coach, still reviews designs" appears verbatim in the JD |
| Compensation                   | Unknown  | No band posted — flagged for research, not assumed from the Director title |
| Location & Lifestyle           | Strong   | Fully remote, no relocation ask |

🟢 What Works — the fixture-pipeline story maps directly to this JD's core ask.
🔴 Concerns & Red Flags — team size genuinely unstated; comp genuinely unresearched. Two
   real unknowns, not two soft-pedaled negatives.
🏢 Company Snapshot — [would cite live research here; omitted in this fixed illustration]
💰 Compensation Assessment — Unknown; JD gives no band. Do not infer from "Director."
❓ Questions to Ask — "How many engineers report into this role today, and is that number
   growing or shrinking?" leads the list, because it's the one open item drivers.md ranks
   highest.
```

Saved to `roles/active/vertex-fixture-systems-director-platform-engineering.md` (per the
D6 naming rule) with the verbatim JD, retrieval date, and source URL captured inline.

## Step 2 — `/tailor`, requirement-to-evidence matrix first (D8)

Before any resume prose is written:

| JD Requirement (verbatim) | Status | Evidence / source |
|---|---|---|
| "owns test infrastructure serving 200+ engineers" | Partial | Acme's pipeline served ~40 engineers, not 200+ — real scale gap, named honestly rather than rounded up |
| "player-coach who still reviews designs" | Verified | `fact-base.md` — Pat's current role description states design review as an ongoing, hands-on responsibility |
| "experience with Kubernetes-based CI infrastructure" | Missing | nothing in `fact-base.md` or `portfolio.md` mentions Kubernetes at all |
| "led a team through a production incident post-mortem" | Verified | the fixture-pipeline story above, with a citable incident log |

This table is shown to the user before drafting — the Kubernetes gap is real signal worth
naming plainly, not a reason to invent a claim.

## Step 3 — `/cover-letter`, the friction beat

The letter's friction paragraph uses the fixture-pipeline story above, with every number
(40 minutes, two regressions, two quarters) pre-committed to the skeleton before any prose
was drafted (per the cover-letter skill's Step 3) — no number appears in the letter that
wasn't already cited to `portfolio.md` first.

## Step 4 — `packet-qc`, independent review

```
Checked 11 factual claims in the draft resume against fact-base.md and portfolio.md.

❌ "Reduced pipeline runtime for 200+ engineers" — presented as if it matches this posting's
   scale claim.
   fact-base.md states the actual team size was ~40 engineers.
   → Fix: state the real number (~40) and let the requirement-to-evidence matrix's honest
     "Partial" stand, rather than borrowing the JD's own scale figure.

1 blocking finding, 0 advisory. Fix required before this draft is ready to send.
```

## What this demonstrates

- The verdict is scored against *this* fictional person's drivers, not a generic template.
- An unresearched comp band stays `Unknown`, never inferred from a title.
- A real scope gap (200+ vs. ~40 engineers) survived into the draft once, and independent
  QC caught it before it shipped — exactly the failure pattern `docs/LESSONS.md` and
  `.claude/agents/packet-qc.md` exist to catch, shown here actually happening and actually
  getting caught.
- Nothing above required real data. If you want to try the tool without running `/onboard`
  first, ask `/evaluate-role` for a no-scoring surface read of any JD you paste — see
  `CLAUDE.md`'s cold-start routing.
