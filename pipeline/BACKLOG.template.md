# Pipeline & Backlog
<!-- Copy to BACKLOG.md (gitignored — this holds real employer names and comp data). -->

## 🔴 ACTIVE PIPELINE
<!-- Status is the JOBS-ADR-004 D7 lifecycle state (see roles/_TEMPLATE.md's Status field):
     Shortlisted → Applied → Recruiter Screen → Interview → Offer / Rejected / Withdrawn /
     Retired-silent, plus On Hold for a hiring freeze. Terminal states are reversible — a
     late callback moves a row back here at zero cost, without re-running intake. -->
| Company | Role | Status | Next Action (due) | Open items | File |
|---|---|---|---|---|---|

## 🟡 NEXT ACTIONS
| Priority | Action | Related |
|---|---|---|

## ⚪ IDEAS / NOT YET STARTED

## ✅ DONE
| Item | Completed | Notes |
|---|---|---|

## 🗑️ ELIMINATED (pattern memory — never delete these, they're what sharpens the next verdict)
| Company | Reason | File |
|---|---|---|

---
## The 14-day rule — with carve-outs (JOBS-ADR-004 D9)
**Default, for a cold application with no human contact yet:** a non-response is a
rejection after ~2 weeks. Move it to `roles/passed/` with a dated no-response note; send no
follow-up. This is pipeline hygiene, not a judgment about the role — nothing is deleted,
and a late call flips it back at zero cost.

**Carve-outs — the clock doesn't apply the same way once any of these is true:**
- A referral or warm contact is involved (see the role file's "Referral / warm contact"
  field) — a human relationship is in play, not just an ATS queue.
- An active recruiter thread exists — you've had a real reply, not an autoresponder.
- You've completed at least one interview — silence after a live conversation reads
  differently than silence after a cold submission.

**The reset rule, so a carve-out can't become the exact accumulation problem this rule
exists to prevent:** each role tracks two dates (see `roles/_TEMPLATE.md`'s Application
Tracking section) — **last human contact date** (their most recent actual reply/call) and
**company-stated next date** (a date they themselves gave you, e.g. "we'll follow up by
Friday"). The 14-day clock re-applies from whichever of those two is most recent. A
carve-out is not a permanent exemption — it's a reason the clock restarted, not a reason it
stopped.

**Run this check at the start of every session** — a pipeline that's only cleaned when you
remember to accumulates dead "awaiting response" rows that make the active count look
bigger than it is.

*Last updated: <date>*
