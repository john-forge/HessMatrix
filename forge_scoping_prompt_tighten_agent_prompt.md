# Tighten the Forge v2.9.16 scoping prompt — agentic workflow

Hand this entire document to a tool-using agent with file-edit access to `/Users/user/Downloads/Forge-Hess/`. The agent should run the stages in order. Three gates stop for you. The agent proposes; you ratify load-bearing calls.

---

## YOUR TASK

You are an engineer tightening Forge Prep's v2.9.16 system prompt, embedded as a JavaScript string array `PROMPT_LINES` in `/Users/user/Downloads/Forge-Hess/forge_app.html` starting around line 14835. Your job is to make the prompt match the discipline laid out in Section 2 of `/Users/user/Downloads/Forge-Hess/row_audit_prompt_pack_gap.md` (the row-standards audit gap analysis), no more and no less.

The premise you must preserve, taken verbatim from the Forge row-standards audit prompt pack (Stage 0 Contract): the model is as capable of confident wrongness as any human, and load-bearing calls must be ratified by a human. Your tightening upholds that premise: the generator must not self-grade.

## OPERATING RULES (these override any instinct to be helpful or agreeable)

1. **RETRIEVE, DON'T RECALL.** Quote verbatim from the gap analysis and the existing prompt text. Do not paraphrase a rule from memory. If you cannot relocate a verbatim source for a claim, say "no source" and stop on that claim.
2. **PROPOSE, RATIFY.** Three gates stop for the human. At each gate, output your proposed edit as a diff. Do not apply edits at gated points until the human types "approved." Stages 1, 4, and 5 are auto-run. Stages 2 and 3 are gated.
3. **DO NOT GO BEYOND THIS BRIEF.** Other parts of the v2.9.16 prompt that this brief does not touch must stay untouched. Specifically: do not retitle, do not reorder, do not rewrite the CROSS-CHALLENGE NON-CONTAMINATION RULE, the CHALLENGE-SPECIFIC GROUNDING RULE, EXTENDED GROUNDING, the ONE CONCEPT PER SESSION RULE, the BLOCK DURATION CAPS, the duration distribution check, or any UbD-doctrine block. If a tightening seems necessary outside this brief, surface it as a NOTE in the verification report, do not edit.
4. **LOCKED VOCABULARY.** Use these terms exactly. Do not substitute synonyms.
   - "session" (not "lesson," "block," "module")
   - "artifact" (not "deliverable," "product," "output")
   - "tagged standard" (not "associated standard," "linked standard")
   - "Act" (not "phase," "unit")
   - "Cohort 5/6" (not "5/6 cohort," "grades 5-6")
   - "the generator" / "the model" (the v2.9.16 LLM running the scoping prompt)
   - "the auditor" / "the audit pack" (the Forge row-standards audit, downstream)
   - "WITNESSED / USED-NOT-WITNESSED / MIS-TAGGED / TOOL-MEDIATED" (audit verdicts, never used in the generator's voice)
5. **NO EM DASHES.** Use periods, commas, semicolons, parentheses, or new sentences. Verbatim quotes from existing prompt text keep whatever punctuation the source uses.
6. **FLAG, DON'T SMOOTH.** If a stage exposes a contradiction in the existing prompt, surface it loudly. Do not paper over.
7. **OUTPUT ONLY THE STRUCTURED FORMAT REQUESTED.** No preamble. No encouragement. No "I'd be happy to."

## INPUTS

Read these in this order:

1. `/Users/user/Downloads/Forge-Hess/row_audit_prompt_pack_gap.md` — specifically Section 2 ("Gap against the v2.9.15 scoping prompt"). Note: Section 2 references v2.9.15 but v2.9.16 has shipped since. The discipline it lays out is what we want; the version number is stale.
2. `/Users/user/Downloads/Forge-Hess/forge_app.html` lines 14835 to 15500 — the v2.9.16 PROMPT_LINES array. Focus on the three v2.9.16 rule blocks added between EXTENDED GROUNDING and ONE CONCEPT PER SESSION RULE: ARTIFACT-AS-WITNESS RULE, VERBATIM STANDARDS RULE, DECLARED STANDARDS MANIFEST RULE.
3. `/Users/user/Downloads/Forge-Hess/forge_app.html` lines 4165, 4176, 4323, 5917, 14836 — the user-facing version strings, currently "v2.9.16".

## WHAT IS ALREADY DONE IN v2.9.16 (verify; do not re-do)

Verify presence and shape; do not edit unless this brief explicitly calls for it.

- ARTIFACT-AS-WITNESS RULE requires `session.artifact` as an emitted field.
- VERBATIM STANDARDS RULE requires `session.standardsVerbatim` populated from `window.NJSLS_STANDARDS`, never from recall.
- DECLARED STANDARDS MANIFEST RULE requires `challenge.declaredStandardsManifest` array of 5 to 15 codes, distinct from the post-hoc tagged set.

## WHAT YOU MUST ADD (the only net-new content)

**FLAG-DON'T-SMOOTH RULE.** Insert a new rule section immediately after DECLARED STANDARDS MANIFEST RULE and immediately before ONE CONCEPT PER SESSION RULE.

The rule emits `session.flags[]` as an array of strings. Permitted flag prefixes (the model must pick from this exact set; ad-hoc flag tokens are a verification failure):

- `UNVERIFIED_CONTENT_CLAIM: ` followed by the specific subject-matter claim the session leans on that the model cannot retrieve a named source for.
- `STANDARD_TAG_UNSURE: ` followed by the code, followed by one sentence on why the tag may not hold.
- `ARTIFACT_UNCERTAIN: ` followed by one sentence on why the named artifact may not actually witness the tagged standards.
- `PREREQ_UNCERTAIN: ` followed by the prerequisite the model is unsure has been established.
- `BAND_STRETCH: ` followed by detail on which standard or content is at or above the top of the cohort's grade band.

The rule must include:

- A HARD RULE statement: `session.flags[]` is REQUIRED (may be empty array, but the field must be present).
- A HARD RULE statement: a session that emits zero flags on a topic where the model has only general knowledge of the named subject matter is a verification failure. Honest uncertainty is the goal; smoothed assertion is the failure mode.
- An explicit statement that flags do NOT block emission. They are the model's structured way of saying "I don't know." The downstream auditor uses them as audit-pack entry points.
- A WHY THIS RULE EXISTS block: cite the Forge row-standards audit Contract rule 6 (FLAG, DON'T SMOOTH) and the premise that the model is as capable of confident wrongness as any human.
- An OPERATIONAL TEST framed as a self-question the model asks once per session: "Could a Guide reading this session catch a content error I missed?" If yes, an `UNVERIFIED_CONTENT_CLAIM:` flag is required.

Length budget: 20 to 35 lines in the PROMPT_LINES array, matching the existing v2.9.16 rule blocks' density.

## WHAT YOU MUST REMOVE OR SOFTEN

The existing ARTIFACT-AS-WITNESS RULE in v2.9.16 includes the following block (you will find it; locate verbatim):

> "OPERATIONAL TEST (apply at emission time, every session): name your session.artifact aloud. Then ask: could a student who learned NOTHING from this session and skipped the cognitive work still produce something that looks like this artifact? If yes, the artifact does not witness the cognitive work and either the artifact or the standard tags must change."

This block applies the audit's witness test at generation time. Per the gap analysis Section 2 ("Things to NOT merge into the scoping prompt"), this is the wrong place for the witness test. Quoted verbatim from the gap analysis: "Asking the generator to apply the test would produce sessions that look like they pass it on the surface, which is worse than not applying it at all (because the audit would then trust the generator's self-grading)."

**Replace** the above block with this softer emission-time directive (write the replacement in the prompt's existing voice):

> "OPERATIONAL TEST (apply at emission time, every session): name session.artifact in one sentence that uses a student-produces verb, the named artifact noun, and the cognitive move. Do NOT self-grade the artifact against the tagged standards; that is the downstream auditor's job. Your job at emission time is to make the artifact specific enough that the auditor can run the could-it-exist-without-the-work test cleanly."

The TOOL-MEDIATION TRAP block in the same rule (currently present) must be **softened**, not removed. Replace its hard rule with: "NOTE: if the named artifact is produced by a tool, the audit will examine whether the artifact witnesses the cognitive work. The generator's job is to name the artifact clearly; the auditor classifies tool-mediated cases."

## WHAT YOU MUST PRESERVE

The CHALLENGE-SPECIFIC GROUNDING RULE (around line 14875) and the new ARTIFACT-AS-WITNESS RULE (around line 14938 in v2.9.16) are different rules. Both stay. Do not subsume one into the other.

- The GROUNDING RULE demands texture-anchored prose: partner, artifact, place, audience, named subject named somewhere in the field.
- The ARTIFACT-AS-WITNESS RULE demands that the session emits a specific student artifact as a structured field.

A description that mentions "the kennel-card" passes the GROUNDING test. A session whose description mentions "the kennel-card" but whose artifact field says "the student engages with the kennel-card concept" passes GROUNDING and fails ARTIFACT-AS-WITNESS. Both tests stand.

In your verification report you must affirm that no edit collapses one rule into the other.

## STAGES

### Stage 1 — Read and verify state (LLM, auto)

1. Read the inputs listed above.
2. Locate the three v2.9.16 rule blocks (ARTIFACT-AS-WITNESS RULE, VERBATIM STANDARDS RULE, DECLARED STANDARDS MANIFEST RULE) by their HARD RULE markers. Quote each block's opening and closing line verbatim so the human can confirm you found the right blocks.
3. Locate the OPERATIONAL TEST inside ARTIFACT-AS-WITNESS RULE. Quote it verbatim.
4. Locate the TOOL-MEDIATION TRAP block inside ARTIFACT-AS-WITNESS RULE. Quote it verbatim.
5. Locate the CHALLENGE-SPECIFIC GROUNDING RULE opening and closing lines. Quote them.

OUTPUT — verbatim quoted blocks plus their line numbers in `forge_app.html`. No edits yet.

### Stage 2 — Add FLAG-DON'T-SMOOTH RULE (LLM proposes — YOU ratify)

1. Draft the FLAG-DON'T-SMOOTH RULE in the existing PROMPT_LINES array style (one string per logical line, terse, HARD RULE markers where appropriate).
2. Identify the exact insertion point: immediately after the DECLARED STANDARDS MANIFEST RULE's OPERATIONAL TEST line and immediately before the ONE CONCEPT PER SESSION RULE opener.
3. Output the proposed insertion as a diff against `forge_app.html`.

OUTPUT — proposed diff plus a one-paragraph rationale citing Contract rule 6 verbatim from the audit pack.

→ **Gate A (load-bearing — YOU ratify the rule shape).** The human reads the diff. If the flag prefix list is wrong, or the HARD RULE block is too aggressive (a flag should never block emission), or the OPERATIONAL TEST drifts into self-grading territory, the human rejects with a one-sentence reason. The agent revises and re-proposes.

If approved, the agent applies the edit.

### Stage 3 — Remove the OPERATIONAL TEST drift from ARTIFACT-AS-WITNESS RULE (LLM proposes — YOU ratify)

1. Compose the replacement text for the OPERATIONAL TEST (per the WHAT YOU MUST REMOVE OR SOFTEN section above, use the exact replacement text given there).
2. Compose the softened TOOL-MEDIATION TRAP text (per the same section).
3. Output the proposed two-block diff.

OUTPUT — proposed diff. Note the lines removed and the lines added.

→ **Gate B (load-bearing — YOU ratify the softening).** The human reads the diff. The check: does the replacement text still require the model to name the artifact clearly, while ceasing to ask the model to apply the witness test or the tool-mediation test at generation time? The check is binary. If yes, approve. If no, the agent revises.

If approved, the agent applies the edit.

### Stage 4 — Audit GROUNDING vs WITNESS coexistence (LLM, auto)

1. Re-read the CHALLENGE-SPECIFIC GROUNDING RULE block.
2. Re-read the (just-edited) ARTIFACT-AS-WITNESS RULE block.
3. For each of the following test cases, state which rule(s) apply and what the verdict would be at emission time:
   - (a) Description: "Students draft the lobby kennel card for one named dog at St. Hubert's." Artifact: "The student drafts the lobby kennel card for the assigned dog."
   - (b) Description: "Students draft the lobby kennel card for one named dog at St. Hubert's." Artifact: "The student engages with the kennel-card concept."
   - (c) Description: "Students apply their understanding in a real-world scenario." Artifact: "The student drafts the lobby kennel card for the assigned dog."
   - (d) Description: "Students apply their understanding in a real-world scenario." Artifact: "The student engages with the kennel-card concept."

4. Confirm that the four verdicts are: (a) PASS both, (b) PASS GROUNDING / FAIL ARTIFACT-AS-WITNESS, (c) FAIL GROUNDING / PASS ARTIFACT-AS-WITNESS, (d) FAIL both. If any verdict comes out differently, you have collapsed one rule into the other. Stop and report.

OUTPUT — the four verdicts plus a one-paragraph confirmation that neither rule subsumes the other.

### Stage 5 — Verify (xUnit Test Patterns, Meszaros 2007 · LLM proposes — YOU approve)

Run these seven Self-Checking Tests (Meszaros, Ch. 5) on the edited file. Report PASS / FAIL on each.

1. **Insertion-point integrity.** The FLAG-DON'T-SMOOTH RULE block sits between DECLARED STANDARDS MANIFEST RULE and ONE CONCEPT PER SESSION RULE. No other content is between them.
2. **Removal integrity.** The original OPERATIONAL TEST block inside ARTIFACT-AS-WITNESS RULE (the could-it-exist-without-the-work version) no longer appears anywhere in `forge_app.html`. Search the file; report any remaining matches verbatim.
3. **Replacement integrity.** The new softer OPERATIONAL TEST text appears exactly once in the file, in the right location.
4. **TOOL-MEDIATION integrity.** The softened TOOL-MEDIATION NOTE appears; the original HARD RULE version does not.
5. **Locked-vocabulary integrity.** Search the new FLAG-DON'T-SMOOTH RULE block for these banned tokens: "lesson" (as a synonym for session), "block" (as a synonym for session), "deliverable" (used loosely), em dash. Report any hits.
6. **Version-string integrity.** All five user-facing version strings (lines 4165, 4176, 4323, 5917, 14836) still read "v2.9.16". The prompt has not been re-bumped.
7. **Out-of-scope integrity.** Confirm by line-range diff that no edits landed outside the ARTIFACT-AS-WITNESS RULE block (Stage 3 edits) and the post-MANIFEST insertion point (Stage 2 edits). If diff shows edits elsewhere, report and roll back.

OUTPUT — seven test results plus the file's new line count (was 14XXX before; is 15YYY after; delta = ZZ).

→ **Gate C (final — YOU approve the bundle ships).** The human reads the seven verifications. If any FAIL, the agent rolls back the offending edit and re-runs Stage 5. If all PASS, the human approves and the bundle is shipped.

## OUTPUT FORMAT (the agent's final deliverable)

A single message with:

1. **CHANGELOG** — three numbered entries (added FLAG-DON'T-SMOOTH RULE, softened ARTIFACT-AS-WITNESS OPERATIONAL TEST, softened TOOL-MEDIATION TRAP).
2. **DIFFS** — the exact text added and removed per stage, with `forge_app.html` line numbers.
3. **VERIFICATION** — Stage 5's seven test results plus the Stage 4 four-case verdict table.
4. **NOTES** — any drift, contradiction, or out-of-brief tightening that surfaced. Do not auto-fix; surface for human review.

## WHAT YOU WILL NOT DO

- You will not bump the prompt version (v2.9.16 stays).
- You will not edit the CHALLENGE-SPECIFIC GROUNDING RULE.
- You will not edit EXTENDED GROUNDING.
- You will not edit the VERBATIM STANDARDS RULE.
- You will not edit the DECLARED STANDARDS MANIFEST RULE (except to identify the insertion point).
- You will not add the artifact-as-witness test, the TOOL-MEDIATED test, or any Stage-4 truth check to the generator's voice.
- You will not invent flag-prefix tokens beyond the five named in this brief; if the human ratifies new ones at Gate A, those become the locked set.
- You will not edit any file other than `forge_app.html`.
- You will not commit or push.
- You will not run the v2.9.16 prompt end-to-end against any LLM.
- You will not assess the quality of the existing v2.9.16 content beyond what this brief calls for.

Begin.
