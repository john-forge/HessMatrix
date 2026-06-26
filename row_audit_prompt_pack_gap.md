# Forge Row-Standards Audit Prompt Pack — gap analysis

Reading the pack against three reference points: (1) the curriculum workbench, (2) the v2.9.15 scoping prompt embedded in `forge_app.html`, (3) the way we have been auditing NJSLS standards in this challenge (the `bigdogs_gap_audit.docx` doctrine).

Locked vocabulary: I use the pack's terms (WITNESSED, USED-NOT-WITNESSED, MIS-TAGGED, TOOL-MEDIATED, manifest) verbatim. I use the workbench's terms (first-teach, retrieve, apply, orphan, uncover, standardsRole, session, pin, sub-unit, Outline Heatmap) verbatim. I do not collapse them into a single schema because they answer different questions.

Source convention: every claim about what the workbench currently does cites a line range in `forge_app.html` or a file in the outputs folder. Anything I cannot verify is marked "no source" or "I am inferring."

---

## Section 1. Gap against the curriculum workbench as a whole

### Concepts the pack has that the workbench does not

**The artifact-as-witness rule (Contract rule 4).** The pack treats a standard as defensible only if the row produces a specific student artifact that could not exist unless the student performed the cognitive work the standard names. Search the workbench for the term `witness` (case-sensitive) returns zero matches. There is no schema field for `session.artifact`, no field for `session.witnessRequiresWork`, no linter check for "this session claims standard X but produces no specific artifact." The closest existing field is `session.lessonObjective`, which is what the session is driving at, not what the student physically produces.

**The could-it-exist-without-the-work test (Stage 3 step 2).** This is the core defensibility heuristic in the pack. The workbench has no equivalent gate. The acceptance gate (`lintScope` at `forge_app.html:19267`) checks Cognitive arc, title rules (v2.9.13), DOK depth floor (v2.9.11), cohort floor (v2.9.12), undifferentiation. None of those check whether the named artifact requires the named cognitive work.

**The TOOL-MEDIATED bucket.** When software performs the named computation, the artifact witnesses design sense rather than the named skill. The workbench has nothing here. A session that tags 8.SP.A.1 (scatter plots) and uses Canva to make the chart would currently pass any check the workbench runs, because the workbench does not distinguish student-computed from tool-computed.

**The DECLARED STANDARDS MANIFEST.** The pack's Stage 6 audits against a canonical list of standards the challenge commits to teach and witness, separate from what got tagged on rows. The workbench has no such manifest. The closest analog is the texture (`bigdogs_texture_v9.md` for Big Dogs), which lists vocabulary, anchors, and standards by domain, but is not formatted as a yes-list manifest. The post hoc `all_njsls_codes_tagged_unique_sorted` array in the inventory is the OPPOSITE: it is what got tagged, not what was promised.

**UNVERIFIED CONTENT CLAIM.** Contract rule 2 forces the model to label any unsourced subject-matter claim. The workbench has no claim-flagging schema. Session descriptions can assert anything; nothing forces the model or the Guide to cite. The scoping prompt's grounding rule (line 14870+ in `forge_app.html`) demands texture-anchored descriptions but is silent on subject-matter truth.

**Per-row atomize (Stage 1, Rosenshine gut-check at the lesson level).** The workbench has `lintScope` checks for cognitive arc and DOK floor across a sub-unit, plus the undifferentiation linter at the session level, plus title rules. It does not check "this single 40 to 50 minute block forces a 10-year-old to learn more than one new skill OR chain more than four moves." That granular new-skill / move-count test does not exist.

**The four ratification gates (A through D).** The workbench has the acceptance gate, but it is a single auto-run gate, not a sequence of human-in-the-loop stops where the model proposes and the Guide ratifies each call. The pack's whole design assumes the model is confidently wrong and gates the wrongness from reaching the table; the workbench's gate is closer to a linter (fail / pass / warn) without an explicit ratification UX.

### Concepts the workbench has that the pack does not use

**`standardsRole`** (first-teach / retrieve / apply / orphan / uncover). Per the v2.2 doctrine surfaced in the Standards Roles table on the Standards × Rigor page (`forge_app.html:4262`, `4731-4735`, `5038`). This answers "who first-teaches this standard, who retrieves, who applies it later" across the year. The pack is silent on year-arc sequencing; it is row-level and unit-level only. These two schemas are orthogonal: a `first-teach` session can be either WITNESSED or USED-NOT-WITNESSED.

**Cohort-first emission (v2.9.12).** Every session emits a `cohort` field; cross-cohort overrides via `juniorsOverride` and `seniorsOverride` blocks. The pack does not address cross-cohort differentiation at all. Auditing a cohort-overridden row would need the pack extended to walk both base and override.

**Cold Transfer Task (v2.9.9).** Per-sub-unit CTT lives in the scope schema. The pack has nothing equivalent, but the CTT IS an artifact-as-witness moment already shaped the way the pack wants. The pack would treat the CTT as a strong WITNESSED candidate by default.

**The Year Calendar.** Once sessions are placed on weeks and days, conflicts surface. The pack treats scheduling as out of scope. The workbench does too at audit time, but the year context is available.

**Activity log.** Every patch, save, paste, and stage logs an event. The pack does not address audit-trail tracking. Integrating the pack would benefit from new event types (`row-audit-stage-1-run`, `gate-a-ratified`, etc.) so the audit run is itself auditable.

**Texture catalog and per-user texture library.** The pack does not use texture; the workbench has it as a first-class artifact. Texture is not redundant with the manifest, because texture is about vocabulary and named anchors, while the manifest the pack wants is the standards-commitment yes-list.

### Structural concepts the workbench could borrow

If the pack were integrated, three new schema fields would carry the bulk of it: `session.artifact` (the specific student artifact the row produces); `session.std_defensible` (per-standard boolean populated by Stage 5); `challenge.declaredStandardsManifest` (the yes-list).

The pack's six unit-level buckets (WITNESSED & CLAIMED, CLAIMED BUT UNWITNESSED, MISSING, SCOPE CREEP, ORPHANED REMEDY, REDUNDANT) could be a new view on the existing Year Coverage Map page, sitting alongside the first-teach / retrieve / apply view.

---

## Section 2. Gap against the v2.9.15 scoping prompt

### The fundamental tension: generative vs evaluative

The scoping prompt is generative. It takes a brief and a texture and produces a scope JSON with tagged standards on sessions. The pack is evaluative. It takes an already-designed scope and audits it for defensibility. The pack is explicit (page 2, Contract rule 3): "What and how to teach is already decided by a human designer. Do NOT propose re-teaching, re-sequencing for pedagogy, or 'better' lessons. Your only job is to detect defects in defensibility. Stay in the auditor's chair."

This is not a contradiction. It is a layer separation. The scoping prompt generates; the pack audits the generated output. The two prompts can coexist in the pipeline as long as the boundary is enforced: do not roll evaluative gates into the generator, and do not let the auditor propose new lessons.

### Discipline from the pack that the scoping prompt could borrow at generation time

These are NOT recommendations to merge the audit into the generator. They are places where the scoping prompt could be tightened so fewer rows fail the audit in the first place.

**Verbatim retrieval over recall (Contract rule 1).** The scoping prompt currently lets the model tag standards by code without quoting the verbatim text. If the scoping prompt required the model to quote the verbatim NJSLS text alongside each tagged standard, Stage 2 of the audit (verb audit) would have less to do. The workbench's NJSLS database (window.NJSLS_STANDARDS, augmented in v1.1) makes verbatim retrieval cheap; the scoping prompt could require it.

**Artifact-as-required-field.** Currently `session.lessonObjective` and `session.description` are required; `session.artifact` is not a field. If the scoping prompt required every session to emit `artifact` (the specific student artifact this session produces), the audit's Stage 3 would have a hand-off. Without this, the auditor has to infer the artifact from prose.

**FLAG, DON'T SMOOTH (Contract rule 6).** The scoping prompt currently asks the model to assert. It does not give the model a structured way to flag uncertainty. Adding a `session.flags[]` array (where the model could write `UNVERIFIED_CONTENT_CLAIM: traits are single-gene Punnett`) would let the audit start from the model's own self-doubt rather than discovering all the doubt fresh.

### Things to NOT merge into the scoping prompt

**The artifact-as-witness test.** This is a downstream evaluation. Asking the generator to apply the test would produce sessions that look like they pass it on the surface, which is worse than not applying it at all (because the audit would then trust the generator's self-grading).

**The TOOL-MEDIATED check.** Same logic. The model is poor at distinguishing tool-mediated from student-performed; running it at generation time would generate confident wrongness.

**Stage 4 truth check.** Subject-matter truth is what the pack is most paranoid about. The scoping prompt should not invite the model to assess its own content claims.

### One drift in the existing scoping prompt that the pack would catch

The v2.9.15 prompt has a CHALLENGE-SPECIFIC GROUNDING RULE that demands texture-anchored descriptions (partner, artifacts, vocabulary, places). This is a different test from the pack's artifact-as-witness test. A description can name the partner and the kennel-card and still fail the witness test, because "the lesson references the kennel-card" is not the same as "the artifact this lesson produces is a draft kennel-card that requires the student to perform the cognitive work tagged on this row." The grounding rule and the witness rule are both needed; neither subsumes the other.

---

## Section 3. Gap against the way we audit NJSLS standards

### Schema mismatch: our gap-audit vocabulary vs the pack's

In `bigdogs_gap_audit.docx` (built 2026-06-25 in this session) the per-code verdicts were: **PASS / WEAK / STRETCH / WRONG / GHOST**. In `bigdogs_coverage.docx` (same date) the per-code classification was: **defensible / soft / ghost** (borrowed from the Lunch doc's locked vocabulary).

The pack uses different verdicts:

| Pack | Closest in our audits | Note |
|---|---|---|
| WITNESSED | "defensible" or "PASS" | Pack's test is stricter (artifact-requires-the-work). Ours was looser ("named session with instruction, practice, and a challenge deliverable"). |
| USED-NOT-WITNESSED | "soft" or sometimes "WEAK" | The pack's framing names the remedy (add a dedicated witness). Ours described what's missing without naming the move. |
| MIS-TAGGED | "WRONG" or "STRETCH" | The pack requires naming the standard the artifact actually witnesses. Our STRETCH flag did this informally but did not always propose the re-tag. |
| TOOL-MEDIATED | (no equivalent) | Real gap. None of our verdicts caught the tool-mediation trap. |
| GHOST | "GHOST" | One match. Both schemas agree on out-of-band codes. |

The biggest schema gap: we have no concept of TOOL-MEDIATED. The pack treats this as a named bucket because it is a common failure mode (the chart is drawn, but Canva drew it, not the student).

### Coverage roll-up mismatch

Our audit produced an "untouched in band" count per subject (ELA G5-6: 57/66 untouched, etc., from `bigdogs_gap_audit.docx`). The pack's Stage 6 produces six buckets per standard:

- WITNESSED & CLAIMED (healthy)
- **CLAIMED BUT UNWITNESSED** (in manifest, tagged somewhere, witnessed nowhere) — hole
- **MISSING** (in manifest, never tagged) — hole
- **SCOPE CREEP** (tagged somewhere, not in manifest) — crept in
- **ORPHANED REMEDY** (came back USED-NOT-WITNESSED in some row with a proposed dedicated witness that appears nowhere) — hole
- REDUNDANT (witnessed in 3+ rows) — informational

We had only two effective buckets: "tagged in this challenge" vs "not tagged in this challenge." We could not distinguish CLAIMED BUT UNWITNESSED from MISSING because we had no manifest. We could not flag SCOPE CREEP for the same reason. We could not flag ORPHANED REMEDY because we had no concept of dedicated witnesses to be orphaned.

The pack's roll-up is more useful precisely where ours is least useful: the gap between what the challenge claims to teach and what it actually proves.

### The manifest gap, specifically

Big Dogs has no DECLARED STANDARDS MANIFEST. What it has:

- The boss-facing organized doc lists 17 codes (the all-tagged list) — but this is post hoc.
- The texture v9 lists standards by domain (`6.RP.A.2 unit rate, 6.RP.A.3 misleading comparisons, 6.SP.B.4 graphs, 6.SP.B.5 summarizing data` etc.) — closer, but not formatted as a yes-list.
- The original source doc (`1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU`) has a STANDARDS CHECK section that names the 2023 NJSLS codes the challenge intends — this is the closest thing we have to a manifest, but it is prose not a list and includes corrections (W.6.1 → W.AW.6.1) that mix manifest with verdict.

A clean manifest for Big Dogs would name, by act, exactly which codes the challenge commits to witness. Without that file, running the pack's Stage 6 on Big Dogs would surface mostly SCOPE CREEP rather than the more interesting CLAIMED BUT UNWITNESSED holes.

### Where our audit doctrine and the pack's diverge philosophically

Our doctrine, inherited from the Lunch doc's "defensible" definition: a code is defensible when there is a named session with instruction, practice, and a challenge deliverable.

The pack's doctrine: a code is witnessed only when the artifact produced by the row could not exist without the cognitive work the standard names.

The pack's test is stricter. Our test would call SL.PI.6.4 (briefing) defensible on Day 26 because there is a named session producing the briefing. The pack's test would ask "could the briefing happen without the cognitive work of present-claims-and-findings?" and probably still rule WITNESSED, because the briefing IS the presentation. But for a code like W.SE.6.6 on Day 18, our doctrine rules defensible (named instruction in clean data / dot plot / charts / themes) and the pack would rule MIS-TAGGED or USED-NOT-WITNESSED (the artifact is a chart of survey data the students collected themselves, not multi-source print-or-digital evidence with credibility assessment that the standard names).

We already discovered this divergence in the Big Dogs audit, where five codes got STRETCH flags (6.SP.B.4 on L2-L4, MS-LS4-4 on L15, W.SE.6.6 on L35-L38, RI.AA.6.7 on L39-L40 and L44, SL.PE.6.1 on L1 and L9). Three of those would survive our defensible test and fail the pack's witness test. So the pack's doctrine would tighten our verdict on a real subset of rows.

---

## Synthesis: the biggest gaps in priority order

1. **No artifact-as-witness concept anywhere in the workbench.** This is the single largest gap. Adding `session.artifact` as an emitted field and a `lintScope` check for "session has artifact" would be cheap. Adding the witness test (could it exist without the work) requires the four-gate human-in-the-loop UX, which is heavier.

2. **No DECLARED STANDARDS MANIFEST on any challenge.** Without this, the pack's Stage 6 roll-up cannot run. Authoring a manifest is a one-time per-challenge step. For Big Dogs, the texture v9 plus the STANDARDS CHECK section of the source doc are 80% there; promoting them to a structured `challenge.declaredStandardsManifest` would close the gap.

3. **No TOOL-MEDIATED bucket in our audit verdicts.** Real failure mode (Canva for the chart, Excel for the means, an LLM for the persuasive paragraph) that none of our flags catch.

4. **No claim-flagging schema.** The scoping prompt asserts; nothing forces it to label UNVERIFIED CONTENT CLAIMS. Adding `session.flags[]` for the model to surface its own uncertainty would benefit both generation and audit.

5. **No row-level atomize check.** The Rosenshine gut-check (one new skill OR four moves per 40-50 minute block) is not in `lintScope`. Adding it is a small linter rule once we have `session.movesCount` or can infer it.

6. **No four-gate ratification UX.** The workbench's acceptance gate is a single auto-pass. The pack assumes the model is confidently wrong and forces a Guide ratification at each stage. Building this is heavier (a full new audit view + per-stage UI).

## Synthesis: what bridging would look like (proposal, not plan)

A minimal version of the pack inside the workbench:

* `session.artifact` (string, required at generation time per a v2.9.16 prompt revision)
* `challenge.declaredStandardsManifest` (array of code strings, authored once per challenge alongside texture)
* `session.std_defensible` (boolean array, populated by the audit, not by the generator)
* A new page `#row-audit` (or a panel on Standards × Rigor) that walks the six stages, holds the model's proposals, and lets the Guide ratify each one
* New activity-log event types: `row-audit-stage-N-run`, `gate-{A,B,C,D}-ratified`, `manifest-updated`
* The coverage roll-up view as a new tab on Standards × Rigor, sitting alongside the existing first-teach / retrieve / apply view

A maximal version would also: extend the scoping prompt to require artifact emission and verbatim standard quotes; add a verb-audit linter check at staging time; require manifest authoring before the brief is considered complete.

None of this conflicts with what is currently in the workbench. The pack's discipline is additive.

## Closing honesty notes

I have not run the pack against any actual row in Big Dogs. Doing that would require pasting the Contract plus Stage 1 prompt into an LLM session with a concrete row attached, then walking the four gates. The gap analysis above is a structural read; the practical read needs one worked example.

I cannot verify all 81 case-insensitive `witness` matches in `forge_app.html` were unrelated; some may be in comments I have not read. The case-sensitive search returns zero. If there is a witness concept hiding somewhere I missed, this analysis would need to update.

The pack's note at the end says it is a different layer from a finished-lesson-plan audit (Rosenshine structure, Yardsticks, internal consistency). The workbench already has the `forge-lesson-audit` skill for the finished-lesson-plan audit. The pack would sit upstream of that, between scope generation and lesson plan authoring. Two distinct audits at two distinct moments.
