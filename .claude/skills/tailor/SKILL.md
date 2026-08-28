---
name: tailor
description: Tailor a resume to a specific role from the user's fact base and portfolio. Use when the user asks for a resume, says "tailor my resume for this role", or wants to apply to a role already saved in roles/active/. Refuses to draft against an empty or near-empty profile/fact-base.md.
tools: Read, Write, Edit, Glob
---

# Tailor

**Preflight (JOBS-ADR-004 D12):** read `pipeline/LEARNED.md` first, if it exists — skip if
absent. Treat every entry there as binding, exactly like a rule in `constraints.md`.

## Step 0 — refuse without a fact base (D9: writing refuses, evaluation degrades)

Check `profile/fact-base.md`. If it has no real content beyond `UNKNOWN` placeholders,
refuse: *"There's no fact base yet — a tailored resume right now would be inventing your
career, not describing it. Run `/onboard` (at least stage 3) first."*

## Step 1 — read the role and the fact base in full

Read the target role's file in `roles/active/` — including its Verbatim Job Description
section if the role file has one (JOBS-ADR-004 D6) — plus `profile/fact-base.md`,
`profile/portfolio.md`, and `profile/never-claim.md`.

## Step 2 — build the requirement-to-evidence matrix BEFORE writing any prose

**JOBS-ADR-004 D8.** Extract every distinct requirement/qualification the JD states — not a
paraphrase, the requirement as it's actually written — and build a table before drafting
anything:

| JD Requirement | Status | Evidence / source |
|---|---|---|
| <requirement, in the JD's own words> | Verified / Partial / Missing / Unknown | <the
  specific `fact-base.md` or `portfolio.md` citation this rests on, or "none — real gap"> |

- **Verified**: the fact base or portfolio directly supports this, with a citable line.
- **Partial**: related experience exists but doesn't fully match scope/level/recency —
  name the gap, don't round it up.
- **Missing**: nothing in the fact base speaks to this at all.
- **Unknown**: plausible the user has this, but it isn't written down anywhere — this is
  the same UNKNOWN-not-zero discipline as everywhere else in this tool; don't silently
  promote it to Verified because it "seems likely."

This does two things at once: it's a real ATS/reviewer-alignment check (which requirements
does this resume actually address), and it's the claim-discipline check from Step 4 stated
as a table instead of discovered ad hoc while drafting — a Missing or Unknown row is exactly
the signal Step 4 exists to catch, surfaced before prose exists to hide it in. Show this
table to the user before drafting; a role with several Missing rows is real signal about
fit worth naming plainly, not smoothing over.

## Step 3 — select and order for THIS role

Don't include everything in `fact-base.md` — select and order achievements by relevance to
what this specific role emphasizes, using `profile/drivers.md` to break ties on emphasis
when the JD itself doesn't make the priority obvious, and the Step 2 matrix to know which
requirements actually need addressing. Different roles should produce visibly different
resumes from the same fact base, not the same resume with a different header.

## Step 4 — never claim beyond what's sourced

Every bullet must trace to `fact-base.md` or `portfolio.md`. **Never add a skill, a
number, or a scope claim because the role wants it and it seems plausible** — see
`docs/LESSONS.md` lesson 9. If the role wants something genuinely absent from the fact
base, that's real signal about fit; don't paper over it by rounding a claim up. Check every
claim against `profile/never-claim.md` explicitly before finalizing.

**Numbers specifically**: never state a bare count of things built/shipped/managed unless
the fact base states that exact count. See `docs/LESSONS.md` lesson 10 — a real body of
work described with an artificially small precise number reads as smaller than the truth,
not more credible. Prefer the fact base's own framing over inventing a tally.

## Step 5 — keep every claim defensible under a follow-up question

Draft as if every bullet will be probed in an interview. Prefer accurate, scoped language
("reduced," "contributed to") over inflated language ("eliminated," "solely responsible
for") unless the fact base genuinely supports the stronger claim. A smaller true claim is
stronger than a larger indefensible one — it survives the follow-up question the larger one
doesn't.

## Step 6 — run packet-qc before calling it done

Same as `/cover-letter` Step 7 — independent review catches a class of error self-review
reliably misses. Don't skip this because the draft "looks fine."

## Step 7 — save and report

Save the source as `applications/<role-id>/resume.md` — see `applications/README.md` for
the `<role-id>` naming rule (roughly `<company>-<role-slug>[-<req-id>]`). Create the
directory if it doesn't exist yet. If `generators/` is set up, also run
`node generate-resume.js` from inside `applications/<role-id>/` to produce `resume.docx`
alongside it. Tell the user what changed relative to their base resume/fact base, and why,
so the tailoring is auditable.
