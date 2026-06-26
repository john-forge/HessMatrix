# Big Dogs lesson-organize prompt

Paste the entire prompt below into a fresh chat with your model of choice. At the marker `<<<PASTE bigdogs_lesson_inventory.json HERE>>>`, paste the contents of `bigdogs_lesson_inventory.json` (the 56-lesson source).

---

# YOUR TASK

You will organize the 56 lessons of the Big Dogs challenge ("Why Big Dogs Get Passed Over," partner St. Hubert's Animal Welfare Center, Cohort 5/6) into a single document I can hand to my boss. The input JSON has not been cleaned up. Some lessons may be duplicates of each other. Some lessons may not make sense. Some standards tags may be wrong (the gap audit has already been run against them; verdicts are referenced below).

You will produce three artifacts inside one document, in this order: a prose narrative of the arc act by act, a clean lesson list grouped by act, and a sequence-table appendix. You will run a three-layer cleanup pass before you write any of it.

# RULES YOU MUST FOLLOW

1. **Source-or-silent.** When you state a specific fact about the challenge (a name, a date, a standard code, a lesson title, an act name, a count), either quote it verbatim from the input JSON or say "no source" and stop. Do not invent. Do not paraphrase confidently from memory. If the input contradicts what you "remember," the input wins.

2. **Quote verbatim.** Lesson titles, concept-progression text, evidence-drives-at text, act titles, and standard codes are quoted verbatim from `lessons[].title`, `concept_days[].concept_progression`, `concept_days[].evidence_drives_at`, `acts[].title`, and the `standards_inherited[]` array on each lesson. If you cannot relocate a phrase in the JSON on a second read, retract the claim.

3. **Locked vocabulary.** Use these terms exactly. Do not substitute synonyms.

   * "Act" — never "phase," "unit," "module," "block."
   * "Concept Progression" — the day-level header. Never "lesson topic," "lesson title," "objective."
   * "Lesson" — one L# entry in the Lesson Content linked list. Never "activity," "session," "task."
   * "Evidence (drives at)" — what the lesson drives students toward producing. Never "objective," "outcome," "goal," "I-can statement."
   * "Standard" — the NJSLS code attached. Never "indicator," "benchmark," "competency."
   * "Cohort 5/6" — the audience. This challenge is not for 7/8. Do not invite 7/8 differentiation.
   * "Authentic impact" — what students produce for the partner. Never "real-world application," "project," "deliverable" used loosely.
   * "Driving question" — the question that opens an act. Never "essential question."

4. **No em dashes.** Use periods, commas, semicolons, parentheses, or new sentences. Never an em dash, even where you would naturally reach for one.

5. **Mark guessing inline.** If you are inferring something the JSON does not say, say "I am inferring that..." or "I cannot verify from the source, but..." in the same sentence as the claim. No vague disclaimers at the top or bottom that retroactively cover confident assertions in the middle.

6. **No softening.** If you find a lesson that does not connect to the authentic impact, do not bury it in a soft phrase. Say "this lesson does not connect to the authentic impact" and flag it.

7. **Iterate against the input.** When you revise your own draft, re-read the relevant JSON entry before each pass. Do not evolve from your previous draft.

# INPUT

`<<<PASTE bigdogs_lesson_inventory.json HERE>>>`

# STAGE 1 — CLEANUP PASS (three layers)

Run these in order. Produce a CHANGELOG block at the top of your final document recording every action.

## Layer 1: Organize

Sort the 56 lessons by:

1. `act` ascending (1 through 6)
2. Within an act, by `concept_day_ord` ascending
3. Within a concept day, by `lesson_ord` ascending

Do not renumber. The original `lesson_ord` values must remain attached to each lesson so I can trace any lesson back to the source.

## Layer 2: Flag

Walk the sorted list. For each lesson, check the following and emit a flag if it triggers. A flag does not delete the lesson. It marks it for my eye.

* **DUPE** — Two or more lessons with substantially identical titles AND identical `concept_day_ord`. (For example, two L1 entries on the same day with the same title.) Quote both verbatim.
* **NEAR-DUPE** — Two or more lessons whose titles overlap heavily in noun phrases but live on different days or different acts. Quote both. Note the act/day for each.
* **NONSENSE** — The lesson title is incomplete, contradicts its own concept day, contradicts its evidence-drives-at, or uses a term the JSON does not explain.
* **ORPHAN** — The lesson has `standards_inherited: []` AND the concept day's `standards_raw` field shows only an NGSS SEP placeholder (e.g., "SEP (Asking Questions)"). The workbench heatmap reads these as untagged.
* **GHOST** — The standard code on this lesson is one of the codes flagged in the `ghosts_and_notation_drift_known[]` array in the input JSON. (For Big Dogs the active ghost is `3-LS3-1`, applied to lessons L10 through L14 on concept day 7.)
* **EVIDENCE-MISMATCH** — The lesson title does not advance the concept day's `evidence_drives_at` text. State which part of the evidence the lesson is supposed to advance and explain why it does not.
* **AUDIT-NOTE** — The audit assigned WEAK or STRETCH to this code in this concept day. Quote the audit note from the per-code list below.

Audit notes to reference verbatim when emitting AUDIT-NOTE flags:

* `6.SP.B.4` on Day 2 (L2-L4): WEAK. Lessons read and interpret graphs; SP.B.4 statement is about displaying plots on a number line.
* `MS-LS4-4` on Day 8 (L15): STRETCH. Wolf-to-dog domestication is artificial (human-driven) selection; LS4-4 names natural selection.
* `W.SE.6.6` on Day 18 (L35-L38): STRETCH. Survey responses students collected themselves are not multi-source print/digital evidence with credibility assessment.
* `RI.AA.6.7` on Day 19 (L39-L40) and Day 21 (L44): STRETCH on writing-side lessons. Students are writing/revising their own claim rather than tracing an author's argument in a text.
* `SL.PE.6.1` on Day 1 (L1) and Day 6 (L9): STRETCH. Solo-write tasks, not collaborative discussion.
* `3-LS3-1` on Day 7 (L10-L14): GHOST. Grade 3 PE; not in the 5-8 NJSLS band. In-band replacement is MS-LS3-2.

## Layer 3: Merge / Drop with changelog

For every DUPE you flagged, merge into one lesson and record the action. Format of the changelog entry:

```
MERGED L<id_kept> + L<id_dropped> → kept title: "<verbatim kept title>" · dropped: "<verbatim dropped title>" · reason: <one sentence>
```

For every NONSENSE you flagged, do not auto-drop. Record:

```
HOLD-FOR-REVIEW L<id> · title: "<verbatim>" · reason: <one sentence> · recommendation: drop | rewrite | keep
```

For every NEAR-DUPE you flagged, do not auto-merge. Record:

```
NEAR-DUPE L<id1> + L<id2> · titles differ by <noun phrase> · recommendation: keep both | merge | split into clearer titles
```

After Layer 3 your working set is the surviving lessons (post-MERGED). Use this set for Stages 2, 3, and 4.

# STAGE 2 — PROSE NARRATIVE

Write a six-section narrative, one per Act. Each section is two to four paragraphs. No bullet points in this stage.

Each section opens with the Act number and Act title quoted verbatim from `acts[]`. Then in prose:

1. The driving question (quote verbatim from `acts[].core_question`).
2. What students actually do across the surviving lessons in this act, walking the concept-day arc in order. Reference lessons by their original `lesson_ord` in parentheses on first mention, like "(L7)".
3. The evidence the act produces (quote verbatim from `acts[].evidence_produced`).
4. Any flags that affect this act (one to three sentences). If there are no flags, say "No flags in this Act."

Voice: tight, declarative, present tense. The boss is reading to understand the arc, not to second-guess the design. Do not editorialize. Do not advocate.

# STAGE 3 — CLEAN LESSON LIST GROUPED BY ACT

For each Act, list the surviving lessons in their organized order. Format each lesson as:

```
L<lesson_ord> · Day <concept_day_ord> · <sub if present>
  Title: <verbatim>
  Concept Progression: <verbatim from concept_days[].concept_progression>
  Evidence (drives at): <verbatim from concept_days[].evidence_drives_at>
  Standards: <comma-separated codes from standards_inherited[], or "none tagged">
  Flags: <comma-separated flags from Stage 1, or "none">
```

Indent the lessons under their Act header. Insert a Day header between concept days (e.g., "— Day 7 — Inheritance and variation —").

No commentary. No "and finally" closers. Just the list.

# STAGE 4 — SEQUENCE TABLE APPENDIX

Render a table with these columns, in this order:

| # | Act | Day | L# | Title | Concept Progression | Evidence (drives at) | Standards | Flags |

One row per surviving lesson. Sort same as Stage 3 (Act → Day → Lesson order). Quote titles, concept progressions, evidence text, and standards verbatim.

The `#` column is a new running ordinal across the surviving set, starting at 1. The `L#` column preserves the original `lesson_ord` so traceability survives.

# STAGE 5 — VERIFICATION PASS (xUnit Test Patterns discipline)

Before you finalize, run the following checks on your own output. Treat them as Self-Checking Tests (Meszaros 2007, Chapter 5). If any test fails, fix it. Report the result at the end of the document under "VERIFICATION."

1. **Test: Lesson count conservation.** Number of lessons in the input = 56. Number of MERGED actions in your changelog = M. Number of lessons in your Stage 3 list = 56 − M. If this identity fails, you have lost or invented a lesson.

2. **Test: Verbatim integrity.** Pick any five lessons at random from your Stage 3 list. For each, locate the matching entry in the input JSON by `lesson_ord`. Confirm the title in your output is byte-identical to the title in the input. If any differ, name which and fix.

3. **Test: Act assignment integrity.** For each surviving lesson, the `act` field in your output equals the `act` field on the matching input entry. No reassignments.

4. **Test: Flag coverage.** Re-walk Layer 2. Confirm each input lesson that meets a flag criterion has the corresponding flag in your output. If you flag a lesson that does not meet criteria, retract.

5. **Test: Locked-vocabulary integrity.** Search your full draft for these banned substrings: "phase," "module," "unit" (as a synonym for act), "essential question," "I can," "objective," "outcome," "session" (used to mean lesson), "deliverable" (used loosely, not as authentic impact), em dash. If found, replace or remove.

6. **Test: 6 acts.** Your document references exactly six acts. Not five, not seven. Each act appears exactly once in Stage 2, Stage 3, and Stage 4.

7. **Test: Cohort.** Your document does not invite 7/8 differentiation. Search for "7/8," "7th," "8th," "grade 7," "grade 8." If present and not used to explicitly say "this is not for 7/8," remove.

# OUTPUT FORMAT

A single document, in this order:

1. **CHANGELOG** — Layer 1 organize result count, Layer 2 flag counts by type, Layer 3 merged / hold-for-review / near-dupe entries.
2. **STAGE 2 PROSE NARRATIVE** — six act sections.
3. **STAGE 3 CLEAN LESSON LIST** — grouped by Act, with Day headers.
4. **STAGE 4 SEQUENCE TABLE** — full appendix table.
5. **VERIFICATION** — seven test results, PASS or FAIL per test, with the failure detail if any.

Plain text or markdown is fine. No styling beyond headers, lists, and one table. Do not produce a docx. The user will format the deliverable separately.

# WHAT YOU WILL NOT DO

* You will not invent standards codes.
* You will not invent lesson titles.
* You will not invent concept progressions.
* You will not invent acts beyond the six in the input.
* You will not suggest new lessons or new readings the input does not contain.
* You will not editorialize about the design.
* You will not assert anything you cannot point at in the input.
* You will not write a closing paragraph that re-summarizes what the boss just read.

Begin.
