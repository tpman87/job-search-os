# <Company> — <Role Title>
<!-- Copy to roles/active/<role-id>.md. See applications/README.md for the <role-id>
     naming rule (<company>-<role-slug>[-<req-id>]) — JOBS-ADR-004 D6 reuses D5's rule here
     so one convention covers both a role's evaluation file and its application packet
     directory. Move to roles/passed/ on a Pass — never delete, never rename on a status
     change. Passed roles are pattern memory: re-reading why you passed on similar roles
     before sharpens the next verdict, the same way avoiding a repeated mistake does.

     Pre-D6 files named <company-slug>.md are NOT migrated — this repo makes no promise to
     update an existing clone (see README.md's "one-time handoff" stance). /evaluate-role's
     duplicate check matches on company name across BOTH naming shapes, so an old file and
     a new evaluation for the same company trigger an update prompt, not a silent
     duplicate. -->

- **Req ID:** <the employer's own requisition ID, if the posting has one — UNKNOWN if not>
- **Source URL:** <the employer's own careers page/ATS link, not an aggregator>
- **Retrieved:** YYYY-MM-DD <the date the JD below was captured — may predate re-evaluation>
- **Date evaluated:** YYYY-MM-DD
- **Closing date (if posted):** <YYYY-MM-DD, or "not stated">
- **Location / remote:** <remote | onsite-where | hybrid-where>
- **Status:** Shortlisted | Applied | Recruiter Screen | Interview | Offer | Rejected |
  Withdrawn | Retired-silent | On Hold — plus the evaluation label:
  Explore Further | Pursue | Conditional | Passed
  <!-- Terminal states (Rejected / Withdrawn / Retired-silent) are explicitly reversible —
       a late inbound call moves a role back to an active status at zero cost and without
       re-running intake. Never treat "terminal" as "delete" or "can't reopen." -->
- **Comp signal:** <visible range, "competitive," or an estimate — and how you got it>
- **Profile completeness at evaluation time:** <copy from the provisional-verdict banner if
  one was shown — this makes a thin-profile verdict traceable later>

---

## 📄 Verbatim Job Description (as retrieved)
<!-- Paste the FULL text of the posting here, unedited, exactly as it read on the Retrieved
     date above. This is provenance, not decoration: a posting can be edited or pulled
     later, and this is the only record of what it actually said when you evaluated it.
     JOBS-ADR-004 D6 deliberately does NOT also store a content hash here — for a
     single-user markdown file, the verbatim text plus the retrieval date already is full
     provenance; a hash would be a producer with no consumer. -->
<details>
<summary>Full posting text</summary>

UNKNOWN — paste the JD here.

</details>

---

## ✅ Verdict
> **Pursue / Explore Further / Pass** — one sentence, the primary reason.

## 📊 Fit Scorecard
<!-- Dimensions below are a reasonable default set. Edit to match what your constraints.md
     and drivers.md actually care about — these aren't fixed. -->
| Dimension | Rating | Rationale (1 sentence) |
|---|---|---|
| Scope & Authority | Strong / Partial / Weak / Disqualifier | |
| Technical / Domain Alignment | | |
| Leadership / Working Style Fit | | |
| Compensation | | |
| Location & Lifestyle | | |

## 🟢 What Works
- <genuine alignment points between your profile and this role/company>

## 🔴 Concerns & Red Flags
- <friction points, gaps, automatic disqualifiers — honest and specific>

## 🏢 Company Snapshot
<Health, culture signals, trajectory — cite sources for any health claim; don't assert
from memory. See docs/METHOD.md's due-diligence checklist.>

| Check | Finding | Signal |
|---|---|---|
| Revenue trend | | |
| Layoffs (12 mo) | | |
| Leadership tenure | | |
| Public rating / sentiment | | |
| Org placement of this role | | |
| Market position | | |
| Posting volume / freshness | | |
| Comp transparency | | |
| Investor thesis (if PE/VC-backed) | | |

## 💰 Compensation Assessment
<Estimated total-comp range from JD + market data + company stage. Explicitly flag if it
likely misses your floor from constraints.md — never infer comp from title alone.>

## ❓ Questions to Ask If You Move Forward
1.
2.
3.
4.
5.

---

## 📋 Open Due-Diligence Items
- [ ] <tracked here and mirrored in pipeline/BACKLOG.md>

## 🚦 Application Tracking
<!-- JOBS-ADR-004 D7. No database — this table plus the dated log below is the whole
     lifecycle mechanism, kept in the one file that already exists per role. -->
- **Packet sent:** <files + date, e.g. "resume.docx + letter.docx, 2026-08-20" — or
  "not yet">
- **Referral / warm contact:** <name + relationship, or "none — cold application">
- **Next action:** <the specific next thing, e.g. "follow up if no screen by 9/03">
- **Next action due:** YYYY-MM-DD
- **Last human contact:** YYYY-MM-DD <date of the most recent actual reply/call from the
  employer side — distinct from when you last acted. See pipeline/BACKLOG.template.md's
  14-day rule for how this date and "Company-stated next date" below interact.>
- **Company-stated next date:** <a date the employer themselves gave you, e.g. "screen
  scheduled 9/05" — or "none given">

## 🗒️ Notes / Updates — dated history log
<!-- Append dated updates as the process progresses. This IS the application's history —
     every status change, contact, and decision gets one line here, oldest first, so the
     lifecycle above is always reconstructable from this file alone. -->
