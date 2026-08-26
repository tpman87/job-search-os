---
name: sweep
description: Source new role candidates by matching job-description vocabulary rather than searching by industry. Use when the user wants to find new roles, says "sweep for roles", "find me some options", or wants a broader search than evaluating one JD at a time. Logs results to pipeline/SOURCING-LOG.md.
tools: Read, Write, Edit, WebSearch, WebFetch, Glob
---

# Sweep

**Preflight (JOBS-ADR-004 D12):** read `pipeline/LEARNED.md` first, if it exists — skip if
absent. Treat every entry there as binding, exactly like a rule in `constraints.md`.

See `docs/METHOD.md` §Sourcing and `docs/LESSONS.md` lesson 5 for why this searches by
vocabulary instead of industry — the short version: a role type that shows up in adjacent
industries gets systematically missed by an industry-first search, and vocabulary-matching
catches it instead.

## Step 1 — establish the fingerprint

Ask the user for a job description that's a strong example of what they want — ideally one
they've already evaluated as a good match with `/evaluate-role`, or one from a role saved in
`roles/active/`. Extract its actual, specific vocabulary: the phrases it uses for scope,
technology, and working style — not generic role-title synonyms.

## Step 2 — search broadly, filter by vocabulary not industry

Search job postings for that vocabulary, across industries — don't pre-filter by the
industry the fingerprint role happened to come from. Use `profile/drivers.md` and
`profile/constraints.md` to know what to look for, but don't let industry assumptions
narrow the search before the vocabulary match has a chance to surface something
unexpected.

## Step 3 — confirm every result is actually live

**Before logging anything, confirm it on the employer's own careers page/ATS** — not the
aggregator or job board where it was found. See `docs/METHOD.md` §3. This applies at scale
here exactly like it does for a single-role evaluation — a sweep full of dead postings
wastes more time than one, because there are more of them to individually discover are
dead.

## Step 4 — run the front-end filter on each live result

Cheaply reject anything that trips a hard constraint from `profile/constraints.md` before
spending research time on it. Log rejections with the specific reason — that's pattern
memory for the next sweep, same as `roles/passed/`.

## Step 5 — log results

Append a new dated section to `pipeline/SOURCING-LOG.md` (create from the template if it
doesn't exist), using the format already in that file: confirmed-live matches with
verbatim comp and ATS URL, near-misses with their failing constraint, and front-end
rejections with reasons.

## Step 6 — hand off

For anything that clears the front-end filter, tell the user and offer to run a full
`/evaluate-role` on it — a sweep result is a candidate for evaluation, not a finished
verdict.
