# Outline Heatmap — Roadmap

A pre-prompt-generation tool that takes any JSON outline and returns a standards-coverage heatmap against NJSLS. Lives in the Forge workbench, on the Standards × Rigor page. No staging, no calendar, no scope generation required.

Date: 2026-06-17
Status: not yet built. Sequenced for incremental ship.

---

## Why this exists

Today, to see standards coverage of a proposed challenge, the workflow is: assemble brief → run v2.9.15 prompt → paste JSON response → stage to calendar → look at Standards × Rigor. That is roughly 30 to 90 minutes per outline-shape iteration.

The heatmap shortens this to: paste outline → read coverage. Roughly 60 seconds per iteration. Designed for the early-design moment when a Guide is sketching a challenge and wants a fast gut check on whether the rough shape covers the right grade band, subject mix, and cluster density.

---

## Out of scope

- Generating outlines (the v2.9.15 prompt still owns that)
- Staging to calendar (the existing scope-and-sequence flow owns that)
- Per-cell Hess matrix work (the per-standard scheduled task owns that)
- Lesson plan generation (Lesson Plan workbench owns that)

This is a read-only coverage view over a pasted JSON.

---

## Phase 1 — Minimum viable. Subject × cohort tiles.

The smallest version that earns its place on the page.

Scope:
- New panel on Standards × Rigor page titled "Outline heatmap"
- Textarea + Parse button
- Accepts any JSON shape; recursive extractor pulls every string that matches an NJSLS code pattern
- Renders 8 tiles: (math, ELA, science, social-studies, other) × (Juniors G5-6, Seniors G7-8)
- Each tile shows the count of standards-citations touching that bucket, shaded by intensity
- Subject inferred from code pattern (digit + cluster = math, RI/W/SL/RL/L = ELA, MS-LS/MS-PS = science, others = social studies)
- Grade inferred from leading digit or the second segment

Effort: ~45 min focused work in `forge_app.html`.

Ships value alone: lets a Guide paste anything and immediately see "does this outline lean Seniors-heavy on math and Juniors-light on ELA, or the other way."

---

## Phase 2 — Cluster breakdown.

Goes deeper than the 8 tiles.

Scope:
- Below the tile grid, render a sortable bar list of every NJSLS cluster touched (6.RP, 6.SP, 7.RP, 7.SP, RI.AA, W.AW, MS-LS3, etc.)
- Each row: cluster code + count + bar
- Sort by count descending by default; click header to sort by code
- Tap-to-expand: show the individual session titles or session ids that cite this cluster (requires the paste to include session titles)

Effort: ~30 min.

Ships value: lets a Guide see "this outline touches 6.RP eight times and 6.SP twice; I am over-rotating on ratios and under-rotating on data work."

---

## Phase 3 — Gap view.

What is the outline NOT covering.

Scope:
- Collapsible panel: "Standards in NJSLS not touched by this outline"
- Grouped by cluster, then by grade
- Counts at each grouping
- Cohort filter toggle (show Juniors gaps, show Seniors gaps, show both)

Effort: ~20 min.

Ships value: surfaces what is missing as well as what is present. Critical for year-coverage planning since the outline might leave whole clusters dark.

---

## Phase 4 — Drill-down interactivity.

Make the heatmap clickable.

Scope:
- Click a subject × cohort tile to see the citations that land in that tile (with session title context if available)
- Click a cluster bar to see citations expanded
- Click a code in either view to see the verbatim NJSLS statement
- ESC or close-X to dismiss

Effort: ~30 min.

Ships value: turns the heatmap from a read-only view into an exploration tool. The Guide can ask "why is math-Seniors so heavy?" and find the answer in one click.

---

## Phase 5 — Compare mode.

Side-by-side coverage diff.

Scope:
- Toggle to a two-paste-box layout: outline A and outline B
- Same heatmap shape per side
- Diff column in the middle: codes covered by A but not B (red), B but not A (blue), both (gray)
- Useful for "is the new draft outline an improvement over the previous one"

Effort: ~45 min.

Ships value: makes iteration on outline shape mechanical. Paste old, paste new, see the diff.

---

## Phase 6 — Save and recall outlines.

Persist named outlines in localStorage.

Scope:
- After parsing an outline, prompt to save under a name
- Saved outlines listed in a sidebar of the panel
- Click a saved outline to reload it into the textarea and re-render the heatmap
- Cross-reference: which saved outlines cite a particular standard
- Export saved outlines as JSON for sharing across machines

Effort: ~30 min.

Ships value: makes the heatmap reusable across sessions. A Guide can keep three or four candidate outlines and compare.

---

## Dependencies

- Phase 1 depends on the embedded `forge-standards-hess-data` block parsing reliably and the NJSLS standards database being loaded into the page (already true; the standards picker on the matrix page already does this).
- Phases 2 through 4 are layered improvements on Phase 1 and have no external dependencies.
- Phase 5 depends on Phases 1 through 4 shipping.
- Phase 6 depends on Phase 1 only.

---

## Open decisions

1. Subject buckets. Are five (math, ELA, science, social studies, other) right, or do we want CTE, art, world languages, chpe broken out? The NJSLS file has chpe, csdt, clks; right now those land in "other." If those need their own tile, the grid becomes nine cells, not eight. Worth deciding before Phase 1.

2. Out-of-file codes. The uploaded NJSLS file lacks middle-school science. Outlines that cite MS-LS3-1 etc. are valid but out-of-file. Heatmap should count them in science but should it visually distinguish out-of-file citations (dotted shading) from in-file ones?

3. Frequency vs uniqueness. Should the tile count cite-instances (a standard cited in five sessions counts as five) or unique standards (counts as one)? The first measures intensity; the second measures breadth. Default proposal: show both numbers in the tile, with shading driven by intensity.

4. Cluster vs sub-code. NJSLS uses clusters (6.RP.A) and sub-codes (6.RP.A.3.c). The file is parent-cluster only. Outlines may cite sub-codes. Should the heatmap roll sub-codes up to clusters automatically, or show them separately? Default: roll up.

---

## What to ship first

Ship Phase 1 alone. Validate it produces useful gut checks. Then ship Phases 2 and 3 together (cluster breakdown + gap view). Phases 4 through 6 are nice-to-have and can wait for usage data.

---

## Related work

- `bigdogs_math_thread_v1.md` — the math spine the heatmap will be validated against during Big Dogs design iteration
- `forge_app.html` Standards × Rigor page — the existing parent page this panel lives inside
- `njsls_standards_2026.json` (in outputs) — the standards source the heatmap reads from
- `standards_hess_data.json` (in Forge-Hess) — the per-standard Hess matrix data; out of scope for the heatmap but a future drill-down target could surface a Hess preview when clicking a code
