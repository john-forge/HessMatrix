# Fix the inventory-to-scope converter field mismatch — agentic workflow

Hand this entire document to a tool-using agent with file-edit access to `/Users/user/Downloads/Forge-Hess/`. The agent runs the stages in order. Four gates stop for you. The agent proposes; you ratify load-bearing calls.

---

## YOUR TASK

You are fixing a known bug in `scopeInventoryToScope` (defined in `/Users/user/Downloads/Forge-Hess/forge_app.html` around line 16493). When a Guide imports a lesson inventory JSON via Step 3 on the Scope page, the workbench detects the inventory shape and runs `scopeInventoryToScope` to convert it to a scope. The scope renders, but most of the Challenge snapshot reads `[Confirm]` on every field (Challenge Name, Driving Question, Cohort, Term, Duration, Audience, Partners, Deliverables, Showcase Pin), and the Mini-audit shows 0 sub-units / 0 standards / 0 sessions. The pin and sub-unit walking works structurally; the field names inside each object do not match what the renderer reads.

This is a CONVERTER bug, not a renderer bug. Do not modify the renderer. The renderer's schema is the canonical scope schema the v2.9.16 prompt also emits; anything that ships through the LLM Step-1 → Step-3 path renders correctly. The converter must produce the same shape.

## OPERATING RULES (these override any instinct to be helpful or agreeable)

1. **RETRIEVE, DON'T RECALL.** Quote the renderer's field reads verbatim from `forge_app.html`. Quote the converter's current emissions verbatim. Do not paraphrase either schema. If a field appears in the renderer but you cannot locate its read site, say "no source" and stop on that field.
2. **PROPOSE, RATIFY.** Four gates stop for the human. At each gate, output the proposed mapping or diff as plain text. Do not apply edits until the human types "approved." Stages 1, 2, and 6 are auto-run. Stages 3, 4, and 5 are gated.
3. **DO NOT MODIFY THE RENDERER.** The functions `scopeRenderSnapshot`, `scopeRenderPin` (or equivalent), `scopeRenderSubUnit`, `scopeRenderSessions`, and `scopeMiniAudit` are the source of truth for the expected scope schema. They are NOT to be edited under this brief. If you find a renderer bug, surface it as a NOTE for human review; do not fix it.
4. **DO NOT MODIFY THE INVENTORY SHAPE.** The lesson inventory JSON (e.g., `bigdogs_lesson_inventory_v2.json`) is upstream data shipped by the Guide. The converter must read it as-is. If a renderer field has no plausible source in the inventory, mark it `[Confirm]` per the existing convention in the prompt's `OPERATING PRINCIPLES`.
5. **LOCKED VOCABULARY.** Use these terms exactly. Do not substitute.
   - "the converter" (`scopeInventoryToScope` in `forge_app.html`)
   - "the renderer" (the `scopeRender*` family of functions)
   - "the inventory" (the input JSON in inventory shape)
   - "the scope" (the output JSON the renderer consumes)
   - "session", "sub-unit", "pin", "challenge envelope" (the scope schema's structural nouns)
   - "[Confirm]" (the workbench's standard marker for fields the brief did not name)
   - "[Assumed: <value>]" (the workbench's standard marker for a derived working value)
6. **NO EM DASHES** in your prose. Verbatim quotes from existing code keep whatever punctuation the source uses.
7. **FLAG, DON'T SMOOTH.** If a stage exposes a contradiction (e.g., a renderer reads two fields that mean the same thing, or the inventory carries data in a field the renderer never reads), surface it loudly. Do not paper over with auto-mappings.
8. **OUTPUT ONLY THE STRUCTURED FORMAT REQUESTED.** No preamble. No encouragement.

## INPUTS

Read these in order. Do not read anything else unless a later stage explicitly requires it.

1. `/Users/user/Downloads/Forge-Hess/forge_app.html` — full file. Two regions matter:
   - `scopeInventoryToScope` (and its helpers `scopeArtifactPlaceholder`, `scopeStandardsVerbatimFor`, `scopeCohortFromInventory`, `scopeInventorySlugify`) around lines 16462 to 16620.
   - `scopeRenderSnapshot` and the rest of the `scopeRender*` family. Use `grep` for `function scopeRenderSnapshot`, `function scopeRenderPin`, `function scopeRenderSubUnit`, `function scopeRenderSessions`, and `function scopeMiniAudit` to find each.
2. `/Users/user/Downloads/Forge-Hess/bigdogs_lesson_inventory_v2.json` — the canonical inventory for the round-trip test. 26 concept days, 61 lessons.

## WHAT YOU MUST PRODUCE

A field-by-field mapping from inventory fields plus computed values to the renderer's expected scope schema, then a converter edit that emits that schema. Specifically:

- Challenge envelope (`scope.challenge`): map to `name`, `summary`, `drivingQuestion`, `primaryGrades`, `buckets`, `terms`, `duration` (with `yearStartWeek`, `yearEndWeek`, `weeks`, `sessionsPerWeek`, `minutesPerSession`, `totalSessions`), `audience`, `partners` (array of objects with `name`, `title`, `status`), `deliverables` (array of objects with `name`, `description`), `showcasePinId`. Plus preserve the v2.9.16 additive fields (`challengeId`, `cohort`, `cohortDocText`, `authenticImpact`, `inScopeBand`, `declaredStandardsManifest`, `declaredStandardsManifestStatus`).
- Pin objects (`scope.pins[]`): map to the renderer's expected pin fields. Use `grep` to enumerate `p.X` reads in `scopeRenderPin`.
- Sub-unit objects (`scope.pins[].subUnits[]`): the renderer reads `su.objective`, `su.phase`, `su.track`, `su.grades`, `su.observableMilestone`, `su.contentInventory`, `su.hourTotal`, `su.hostsFluencyGate`, `su.timeBudget`. Map each.
- Session objects: the renderer reads `s.id`, `s.title`, `s.lessonObjective`, `s.yearWeek`, `s.day`, `s.startTime`, `s.duration`, plus the v2.9.16 fields (`s.artifact`, `s.standardsVerbatim`, `s.standards`, `s.standardsRole`, `s.flags`). Map each.

For every renderer field with no plausible inventory source, output `[Confirm]` so the Guide sees explicit ratification points rather than empty placeholders that look populated.

## STAGES

### Stage 1 — Discover the renderer's expected schema (LLM, auto)

1. Use `grep` to find every read of the form `ch.X`, `p.X`, `su.X`, and `s.X` inside the rendering functions (`scopeRenderSnapshot`, `scopeRenderPin` if it exists or the inline pin loop in `scopeRender`, `scopeRenderSubUnit`, `scopeRenderSessions`, and `scopeMiniAudit`). Restrict the search to functions called from the main render path.
2. Build a four-section table (one section per level: challenge, pin, sub-unit, session). Each row: field name, type the renderer expects (string, array, object), line number of the read site, one verbatim quote of the read line.
3. Mark any field the renderer touches but never displays (e.g., reads `ch.X` only to pass it to a helper) so the mapping does not waste effort on these.

OUTPUT — four schema tables (challenge / pin / sub-unit / session), each with field, type, line number, verbatim quote. No edits yet.

### Stage 2 — Discover the converter's current output (LLM, auto)

1. Read `scopeInventoryToScope` and its helpers verbatim.
2. Build a parallel four-section table of what the converter currently emits at each level.
3. Mark v2.9.16 additive fields (artifact, standardsVerbatim, manifest) that already work end to end so they are not at risk in the mapping pass.

OUTPUT — four current-output tables matching the Stage 1 sections by level. No edits yet.

### Stage 3 — Build the field-mapping table (LLM proposes — YOU ratify)

For each renderer field from Stage 1, propose one of:
- **DIRECT**: the inventory already carries the value; rename and map.
- **DERIVED**: compute the value from one or more inventory fields. Show the computation.
- **DEFAULT [Confirm]**: the inventory has no plausible source; emit `[Confirm]` as the value. This is the right default for unknowns; do not invent.
- **DEFAULT [Assumed: <value>]**: the inventory has no source but a working value can be derived from the cohort, the act sequence, or the partner. Show the assumption.
- **DROP**: the renderer ignores or no-ops this field; emit `null` or omit.

For each load-bearing decision, write one sentence on why the chosen treatment is correct.

Specific high-stakes mappings to call out explicitly:
- `ch.name` from `inv.challenge.title` (DIRECT)
- `ch.partners` (array of {name, title, status}) from `inv.challenge.partner` (single string): proposed shape `[ { name: inv.challenge.partner, title: "[Confirm]", status: "Confirmed" } ]`
- `ch.primaryGrades` from `inv.challenge.cohort_doc_text` (parse "5/6" to `["5","6"]` or similar)
- `ch.duration.weeks` / `sessionsPerWeek` / `minutesPerSession` / `totalSessions` from inventory (NOT PRESENT — must be `[Confirm]` or `[Assumed: <value derived from concept_days_total>]`)
- `ch.audience` from inventory (NOT PRESENT — `[Confirm]`)
- `ch.drivingQuestion` from inventory (NOT PRESENT, but `inv.acts[0].core_question` is the Act 1 driving question, which is reasonable as a proposal)
- `ch.deliverables` from `inv.challenge.authentic_impact` (parse to `[ { name: "Narrative profile cards", description: <verbatim authentic_impact> } ]` or similar)
- `ch.showcasePinId` from inventory (Act 6 pin id, derivable)
- `pin.audience`, `pin.observableEvidence`, `pin.standards` from inventory's `acts[i].evidence_produced` and child-day standards (DERIVED)
- `su.objective` from inventory's `concept_days[i].evidence_drives_at` (currently emitted as `su.evidenceDrivesAt`; rename)
- `su.phase` from inventory (NOT PRESENT, but act position maps to a sensible phase: Acts 1 to 2 are PREP, Acts 3 to 4 are EXPL, Acts 5 to 6 are PRES; this is `[Assumed]`, requires Guide ratification at Gate)
- `su.grades`, `su.track` from the cohort info (DIRECT)
- `su.observableMilestone` from inventory's `concept_days[i].evidence_drives_at` (DIRECT, same source as su.objective but different field)
- `s.yearWeek` / `s.day` / `s.startTime` / `s.duration` from inventory (NOT PRESENT — all `[Confirm]` or `null`)

OUTPUT — the full mapping table plus a list of every `[Assumed]` decision flagged for human ratification.

→ **Gate A (load-bearing — YOU ratify the mapping table).** The human reads the table. The check is per-row: is each DIRECT mapping correct? Is each DERIVED computation sound? Is each [Confirm] truly unknowable from the inventory? Is each [Assumed] working value defensible?

If approved, the agent moves to Stage 4. If not, the agent revises and re-proposes.

### Stage 4 — Update the converter (LLM proposes diff — YOU ratify)

1. Compose the edit to `scopeInventoryToScope` and its helpers. The new emission must produce the field names the renderer reads, populated per the Stage 3 mapping.
2. Preserve the v2.9.16 additive fields (`session.artifact`, `session.standardsVerbatim`, `challenge.declaredStandardsManifest`, `challenge.declaredStandardsManifestStatus`). They already pass through correctly.
3. Preserve the inventory round-trip helpers (`session.inventoryRef`, `scope.inventory`) so re-export is reversible.
4. Output the proposed diff with line numbers.

OUTPUT — proposed diff for `scopeInventoryToScope` and any new helper functions.

→ **Gate B (load-bearing — YOU ratify the diff).** Three checks: (1) every Stage 3 mapping lands; (2) the v2.9.16 additive fields are preserved; (3) the diff touches only the converter and its helpers, not the renderer.

If approved, the agent applies the edit. If not, the agent revises.

### Stage 5 — Backfill defensible defaults (LLM proposes — YOU ratify)

For each Stage 3 `[Assumed]` field, the inventory provides no source. The Guide must ratify the proposed working value or override to `[Confirm]`. Examples worth explicit ratification:

- Should `ch.duration.weeks` default to `Math.ceil(inv.concept_days_total / 5)` (one teaching week per five concept days) or to `[Confirm]`?
- Should `ch.duration.minutesPerSession` default to `35` (Forge default per BLOCK DURATION CAPS in the prompt) or to `[Confirm]`?
- Should `su.phase` default per act range (Acts 1 to 2 = Preparation, Acts 3 to 4 = Exploration, Acts 5 to 6 = Presentation) or to `[Confirm]`?
- Should `ch.drivingQuestion` default to `inv.acts[0].core_question` (the Act 1 driving question) or to `[Confirm]`?
- Should `ch.showcasePinId` default to the last pin's id (Act 6) or to `[Confirm]`?

OUTPUT — a table of every `[Assumed]` field with the proposed default and one sentence of rationale.

→ **Gate C (load-bearing — YOU ratify the defaults).** Per row: approve the default, override to `[Confirm]`, or override to a different value. The agent records the human's choices and applies them to the converter.

### Stage 6 — Round-trip verification with Big Dogs (LLM, auto)

1. In a sandboxed Node session, extract the updated `scopeInventoryToScope` and helpers from `forge_app.html`. Stub `window.NJSLS_STANDARDS` with the entries needed for the Big Dogs codes.
2. Load `bigdogs_lesson_inventory_v2.json`. Run the converter. Get the scope object.
3. For each renderer field from Stage 1, walk the produced scope and verify:
   - DIRECT mappings carry the inventory value verbatim.
   - DERIVED mappings carry the computed value.
   - `[Confirm]` fields carry the literal string `"[Confirm]"`.
   - `[Assumed]` fields carry the literal pattern `"[Assumed: ...]"` if Gate C ratified that path, or `"[Confirm]"` if the human overrode.
4. Count: pins (expect 6), sub-units (expect 26), sessions (expect 61), tagged-standard codes across all sessions (compare to `inv.all_njsls_codes_tagged_unique_sorted_count` minus parser-mangled entries).
5. Sanity: the rendered scope, when this output is passed to a stubbed `scopeRender(r)`, should not throw and should not show empty `[Confirm]` for fields the inventory definitively supplied (challenge title, partner, cohort, authentic impact).

OUTPUT — verification report with PASS / FAIL per check plus the raw counts.

→ **Gate D (final — YOU approve the bundle ships).** Read the verification report. If any check failed, the agent rolls back the offending mapping and re-runs from Stage 4. If all pass, the human approves; the converter is shipped.

## OUTPUT FORMAT (the agent's final deliverable)

A single message with:

1. **CHANGELOG** — three to seven numbered entries describing the field-mapping changes.
2. **STAGE 3 MAPPING TABLE** — the full ratified mapping table, four sections, every row.
3. **DIFFS** — Stage 4's applied diff with `forge_app.html` line numbers.
4. **STAGE 6 VERIFICATION** — per-check PASS / FAIL plus counts.
5. **NOTES** — any renderer bug, schema contradiction, or scope-creep tightening that surfaced. Do not auto-fix; surface for human review.

## WHAT YOU WILL NOT DO

- You will not modify the renderer (`scopeRender*` family).
- You will not modify the inventory shape or any file in `texture_lessons_harness/`.
- You will not bump the prompt version.
- You will not change `scope.inventory`, `session.inventoryRef`, or any round-trip preservation field.
- You will not edit `lintScope` even if a check now misfires after the field rename. Surface the lint regression as a NOTE; the human will route it to a follow-up bundle.
- You will not invent fields the renderer never reads.
- You will not edit any file other than `forge_app.html`.
- You will not commit or push.
- You will not re-run the converter against any inventory other than `bigdogs_lesson_inventory_v2.json` in Stage 6.

Begin.
