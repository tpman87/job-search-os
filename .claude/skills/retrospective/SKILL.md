---
name: retrospective
description: Capture a correction the user just gave the advisor into pipeline/LEARNED.md so it applies to every future session, not just this one. Use when the user corrects a verdict, a scoring decision, or a piece of writing this tool produced — especially when they say something like "no, that's not right", "actually I care more about X", or "don't do that again". Also invoke proactively at natural session-end moments to check whether anything from the session should be captured before it's lost.
tools: Read, Write, Edit, Glob
---

# Retrospective

**The gap this closes:** a correction given once, in conversation, and never written down
gets made again. This tool's own origin had this exact failure — corrections lived in
scattered files that only their author could navigate, which is precisely what made the
knowledge non-transferable. `pipeline/LEARNED.md` exists so a correction is written down
exactly once and then actually changes behavior, rather than being remembered by habit.

## When to act

- **Immediately, any time the user corrects something the tool did** — a wrong verdict, a
  scoring decision that missed what they actually meant, a piece of writing that didn't
  sound like them, a rule they want applied differently going forward. Don't wait for them
  to ask you to "remember" this — a correction is itself the trigger.
- **Proactively near the end of a session**, if the conversation included any correction
  that hasn't yet been written to `LEARNED.md`. Ask: "should I capture [the correction] in
  LEARNED.md before we wrap up?" Most people won't remember to ask for this themselves.

## What makes a good entry

Not everything the user says is worth capturing — a one-off preference for this single role
("skip the location check for it, I already know it's out of scope, just this once")
usually isn't. What is worth capturing:
- A correction that will apply to **future** roles/letters/decisions, not just this one.
- Anything that reveals the user's actual priorities diverge from what `drivers.md` or
  `constraints.md` currently say — in which case, **update those files directly** instead
  of (or in addition to) logging it here; `LEARNED.md` is for process/behavior corrections,
  the profile files are for facts about the person.
- A correction to *how the tool should behave*, not just a one-time fix to one output.

## How to write the entry

Append to the top of `pipeline/LEARNED.md` (create it from the template if it doesn't
exist yet), in the format the file already shows:

```
## YYYY-MM-DD — <short title>
**What I corrected:** <specifically what the tool did that was wrong>
**Why:** <the reason, if stated — this is what lets a future session judge edge cases
  instead of just following the rule blindly>
**How this should change future behavior:** <stated as a plain, actionable rule>
```

Then **actually apply the correction going forward in this session** — don't just log it
and continue the old behavior. And check: does this correction contradict or duplicate an
existing entry? If so, note that the old entry is superseded rather than leaving two
conflicting rules for a future session to stumble over.

## Reading LEARNED.md

Every skill in this repo should treat `pipeline/LEARNED.md` as required reading alongside
`profile/*.md` before acting — a correction logged here is exactly as binding as a
constraint in `constraints.md`. If a skill's default behavior conflicts with an entry here,
the entry wins.
