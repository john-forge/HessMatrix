// Builds forge_workbench_tutorial.docx in Forge Prep style.
// Layered audience: Overview (boss), Change-log (returning Guide), Deep-dive
// (new Guide). Anchored to Big Dogs as the worked example.
//
// Locked vocabulary: Act, Concept Progression, Lesson, Evidence (drives at),
// Standard, Cohort 5/6, authentic impact, driving question. No em dashes in
// my prose; source quotes carry whatever the source carries. Source-or-silent
// on UI claims.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  PageBreak, LevelFormat
} = require('docx');

const COLOR_INK = '101010';
const COLOR_MUTED = '707070';
const COLOR_LINE = 'd9d1bd';
const COLOR_ACCENT = 'c2410c';
const COLOR_NAVY = '1f2937';
const COLOR_CREAM = 'FBF6E9';
const COLOR_OK = '3d6b3d';
const COLOR_FLAG = '7a1f2b';
const COLOR_TABLE_HEADER_BG = '1f2937';
const COLOR_TABLE_HEADER_FG = 'FFFFFF';

const FONT_SERIF = 'Georgia';
const FONT_BODY = 'Calibri';
const FONT_MONO = 'Consolas';

const border = (c) => ({ style: BorderStyle.SINGLE, size: 4, color: c });
const cellBorders = (c = COLOR_LINE) => ({ top: border(c), bottom: border(c), left: border(c), right: border(c) });

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after !== undefined ? opts.after : 120, before: opts.before || 0 },
  alignment: opts.align || AlignmentType.LEFT,
  children: [new TextRun({
    text,
    font: opts.font || FONT_BODY,
    size: opts.size || 22,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || COLOR_INK
  })]
});

const richPara = (runs, opts = {}) => new Paragraph({
  spacing: { after: opts.after !== undefined ? opts.after : 120, before: opts.before || 0 },
  alignment: opts.align || AlignmentType.LEFT,
  children: runs.map(r => new TextRun({
    text: r.text,
    font: r.font || FONT_BODY,
    size: r.size || 22,
    bold: !!r.bold,
    italics: !!r.italics,
    color: r.color || COLOR_INK
  }))
});

const sectionHeader = (label, title, meta) => new Paragraph({
  spacing: { before: 360, after: 200 },
  children: [
    new TextRun({ text: label, font: FONT_BODY, size: 22, bold: true, color: COLOR_NAVY }),
    new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, bold: true, color: COLOR_ACCENT }),
    new TextRun({ text: title, font: FONT_BODY, size: 22, bold: true, color: COLOR_NAVY }),
    ...(meta ? [
      new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, bold: true, color: COLOR_ACCENT }),
      new TextRun({ text: meta, font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED })
    ] : [])
  ]
});

const h2 = (text) => new Paragraph({
  spacing: { before: 280, after: 100 },
  children: [new TextRun({ text, font: FONT_SERIF, size: 30, bold: true, color: COLOR_NAVY })]
});

const h3 = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, font: FONT_SERIF, size: 24, bold: true, color: COLOR_NAVY })]
});

const screenshot = (description) => new Paragraph({
  spacing: { before: 100, after: 140 },
  alignment: AlignmentType.CENTER,
  children: [
    new TextRun({ text: '◤ SCREENSHOT placeholder ◢   ', font: FONT_BODY, size: 18, bold: true, color: COLOR_ACCENT }),
    new TextRun({ text: description, font: FONT_BODY, size: 18, italics: true, color: COLOR_MUTED })
  ]
});

const step = (n, title, body) => [
  new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [
      new TextRun({ text: 'Step ' + n + '. ', font: FONT_SERIF, size: 22, bold: true, color: COLOR_ACCENT }),
      new TextRun({ text: title, font: FONT_SERIF, size: 22, bold: true, color: COLOR_NAVY })
    ]
  }),
  ...body
];

const headerCell = (text, width = 3120) => new TableCell({
  borders: cellBorders(COLOR_NAVY),
  width: { size: width, type: WidthType.DXA },
  shading: { fill: COLOR_TABLE_HEADER_BG, type: ShadingType.CLEAR },
  margins: { top: 100, bottom: 100, left: 140, right: 140 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: FONT_BODY, size: 18, bold: true, color: COLOR_TABLE_HEADER_FG })]
  })]
});

const bodyCell = (runs, opts = {}) => new TableCell({
  borders: cellBorders(COLOR_LINE),
  width: { size: opts.width || 3120, type: WidthType.DXA },
  margins: { top: 120, bottom: 120, left: 140, right: 140 },
  children: (Array.isArray(runs) ? runs : [{ text: String(runs) }]).map(r => new Paragraph({
    spacing: { after: 30 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({
      text: r.text, font: r.font || FONT_BODY,
      size: r.size || 19, bold: !!r.bold, italics: !!r.italics,
      color: r.color || COLOR_INK
    })]
  }))
});

// ─── Audience map (cover page) ──────────────────────────────────

const audienceMapTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2600, 2300, 4460],
  rows: [
    new TableRow({ tableHeader: true, children: [
      headerCell('IF YOU ARE', 2600), headerCell('TIME COMMITMENT', 2300), headerCell('JUMP TO', 4460)
    ] }),
    new TableRow({ children: [
      bodyCell([{ text: 'A boss, partner, or showcase audience', bold: true }], { width: 2600 }),
      bodyCell([{ text: '5 minutes', italics: true, color: COLOR_MUTED }], { width: 2300, align: AlignmentType.CENTER }),
      bodyCell([{ text: 'Section A. Overview', bold: true, color: COLOR_NAVY }, { text: 'What the workbench does, what a Guide ships, why it matters.', italics: true, color: COLOR_MUTED }], { width: 4460 })
    ] }),
    new TableRow({ children: [
      bodyCell([{ text: 'A Guide who has used an earlier version', bold: true }], { width: 2600 }),
      bodyCell([{ text: '10 minutes', italics: true, color: COLOR_MUTED }], { width: 2300, align: AlignmentType.CENTER }),
      bodyCell([{ text: 'Section B. Change-log', bold: true, color: COLOR_NAVY }, { text: 'What is new since the last revision. Inventory import, docx import button, scope schema extension, texture v9.', italics: true, color: COLOR_MUTED }], { width: 4460 })
    ] }),
    new TableRow({ children: [
      bodyCell([{ text: 'A Guide opening the workbench for the first time', bold: true }], { width: 2600 }),
      bodyCell([{ text: '45 minutes', italics: true, color: COLOR_MUTED }], { width: 2300, align: AlignmentType.CENTER }),
      bodyCell([{ text: 'Section C. Full pipeline', bold: true, color: COLOR_NAVY }, { text: 'Big Dogs end to end. Either entry path. Through Review and Stage, Standards × Rigor audit, and the Cohort Calendar.', italics: true, color: COLOR_MUTED }], { width: 4460 })
    ] })
  ]
});

// ─── Section A: Overview ───────────────────────────────────────

const sectionAOverview = [
  sectionHeader('SECTION A', 'OVERVIEW', 'for boss, partner, or showcase audience'),

  para('The Forge curriculum workbench takes a challenge brief at one end and ships, at the other end, a scope and sequence that a partner can read, a year-long calendar that places every session on a real day, and a coverage audit that says which New Jersey Student Learning Standards the challenge actually hits. One Guide can move a challenge from a paragraph of intent to a partner-ready year in one or two working sessions.', { after: 160 }),

  para('The workbench is built around two entry paths. A Guide either writes a challenge brief and a texture (a description of the partner, place, artifacts, vocabulary, and anti-contamination guards), assembles an LLM prompt, and pastes the response back. Or the Guide imports an existing scope and sequence document directly. Either path produces the same scope shape. The downstream tools, the audit, the calendar, the linter, and the refine UI, do not know which path was used.', { after: 160 }),

  para('Big Dogs is the canonical worked example. The challenge title is "Why Big Dogs Get Passed Over." The partner is St. Hubert\'s Animal Welfare Center. The cohort is 5/6, which is not for 7/8. The authentic impact is narrative profile cards for individual big dogs, printed and clipped to each dog\'s kennel, written for the families walking the adoption kennels at St. Hubert\'s.', { after: 160 }),

  screenshot('Hub page on first load. Title across the top: "From a challenge brief to a scoped, sequenced year."'),

  h3('What a Guide produces at the end'),

  para('When the pipeline is run all the way through, the Guide hands their partner four artifacts. A scope and sequence document. A Cohort Calendar showing every session placed on the year grid. A coverage audit listing every standard touched, every standard untouched in band, and every flagged mismatch (WEAK, STRETCH, WRONG, GHOST). A briefing deck rendered from the scope.', { after: 160 }),

  screenshot('Standards × Rigor page heat map view. Big Dogs covers 17 codes, one of them out of band (GHOST: 3-LS3-1).'),

  h3('Why it exists'),

  para('A typical scope and sequence drift between authoring tools, source documents, calendars, and audit reports until nobody can answer "which standards is this challenge actually hitting?" The workbench solves that by holding one canonical scope shape across every view: scope, calendar, standards, audit, refine. Every edit is logged. Every standard tag is traceable back to the source.', { after: 200 })
];

// ─── Section B: Change-log ─────────────────────────────────────

const sectionBChangelog = [
  new Paragraph({ children: [new PageBreak()] }),
  sectionHeader('SECTION B', 'CHANGE-LOG', 'for a Guide who has used an earlier version'),

  para('Everything you knew about the brief → scope → calendar path still works. The system prompt, the LLM workflow, the linter, the acceptance gate, the activity log, the Cohort Calendar, and the Standards × Rigor audit are unchanged. What is new is a second entry path into the same downstream tooling.', { after: 200 }),

  h3('New entry path: inventory ingestion'),

  para('You can now paste a lesson inventory JSON into the same Step 3 textarea on the Scope page. The workbench detects the shape (inventory has acts[], concept_days[], and lessons[]; no pins[]) and converts the inventory into a scope before rendering. The conversion is additive: the original inventory is preserved on scope.inventory for round-trip export.', { after: 160 }),

  para('Mapping: each act becomes a pin, each concept day becomes a sub-unit, each lesson becomes a session. session.inventoryRef carries the lesson_ord, concept_day_ord, and act so traceability survives. Downstream tools (linter, calendar, refine) work unchanged.', { after: 160 }),

  richPara([
    { text: 'Source of truth: ', bold: true },
    { text: 'forge_app.html scope-render-btn handler. Inventory detection runs after scopeExtractJson and before the chunked-merge handler. See scopeLooksLikeInventory() and scopeInventoryToScope() in the file.', italics: true, color: COLOR_MUTED }
  ], { after: 200 }),

  h3('New entry path: docx import on the Scope page'),

  para('A new button on the Scope page, "Load Scope & Sequence docx," sits below the existing "Load JSON from file" row. Drop a Word export of any scope and sequence table or lesson list. The workbench uses mammoth.js to convert the docx to HTML in your browser, then runs a header-agnostic detector that picks the lesson column by L# density rather than by header text.', { after: 160 }),

  para('What this means in practice: a docx column does not need to be named "Lesson Content." The detector finds whichever column has the most L1, L2, Seminar entries and treats that as the lessons. Other columns map to act, concept progression, topic, evidence, and standards by position. If the docx has no L# tables, the detector falls back to a paragraph scan and groups lessons under their preceding heading.', { after: 160 }),

  para('Output of the docx import is an inventory JSON, written to the Step 3 textarea. Click Review & Stage and the inventory ingestion path takes over.', { after: 200 }),

  h3('Scope schema extension'),

  para('The scope schema gained two additive fields: scope.inventory (the source provenance of an imported inventory) and session.inventoryRef (lesson_ord, concept_day_ord, act, sub, doc_text). Existing scopes have neither and work unchanged. New imports populate both.', { after: 200 }),

  h3('Big Dogs specifically'),

  para('bigdogs_texture_v8.md is retired. The current source of truth for Big Dogs is the boss-facing organized doc (Cohort 5/6 only, six Acts, 56 lessons in the original inventory, 61 lessons in the harness-driven v2 conversion that captures the Day 2 second L1-L3 dataset group and Day 18 L4 "Creating charts using excel"). bigdogs_texture_v9.md replaces v8 and reflects the new architecture (Cohort 5/6 only, no 7/8, six-Act arc, no PREP/EXPL/PRES phase model).', { after: 160 }),

  para('The Texture catalog on the Documentation page still lists v8. That is historical reference. The v9 file lives in the same folder; load it from there if you want the current texture.', { after: 200 }),

  h3('Activity log entries to watch for'),

  para('Two new event types are logged when you use the inventory paths:', { after: 80 }),

  richPara([
    { text: 'scope-docx-imported', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   logged when the Load Scope & Sequence docx button writes inventory JSON into Step 3. Payload: file name, detection mode (table or paragraphs), concept day count, lesson count, lesson column index if table mode.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'inventory-converted-to-scope', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   logged when Review & Stage detects inventory shape and converts. Payload: pin count, concept day total, session total, source document URL if present.', italics: true, color: COLOR_MUTED }
  ], { after: 240 })
];

// ─── Section C: Deep-dive ──────────────────────────────────────

const sectionCDeepDive = [
  new Paragraph({ children: [new PageBreak()] }),
  sectionHeader('SECTION C', 'FULL PIPELINE WALKTHROUGH', 'Big Dogs end to end · for a Guide opening the workbench for the first time'),

  para('This section walks one challenge end to end. The challenge is "Why Big Dogs Get Passed Over." The partner is St. Hubert\'s Animal Welfare Center. The cohort is 5/6 (which is not for 7/8). By the end you will have a staged scope, a year calendar with every session placed, a Standards × Rigor coverage audit, and a path to refine and ship.', { after: 160 }),

  para('Before you start, open the Documentation page once. It links to four reference documents: forge_glossary.md (the 40 locked terms), forge_brief_template.md (a working example brief), forge_workflow_guide.md (the eight-step end-to-end workflow), and forge_flag_reading_guide.md (how to read the acceptance gate). These are the canonical references. This tutorial points at them rather than duplicating them.', { after: 240 }),

  ...step(0, 'Open the workbench at the Hub page', [
    para('The Hub page is the entry point. Across the top is the title "From a challenge brief to a scoped, sequenced year." Three navigation links sit underneath: Scope & Sequence, Cohort Calendar, Standards × Rigor. There are also links to Documentation, Activity Log, Title Ledger, and Scope Diff for follow-up work.', { after: 100 }),
    screenshot('Hub page. Three primary nav links visible.'),
    para('Click Scope & Sequence to begin.', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(1, 'Pick your entry path', [
    para('On the Scope page you will see three numbered sections. Step 1 is the brief input. Step 2 is texture and prompt assembly. Step 3 is the JSON paste box.', { after: 100 }),
    para('You have two paths to a scope:', { bold: true, after: 80 }),
    richPara([
      { text: 'Path A. Brief → Scope (LLM-assisted).  ', bold: true, color: COLOR_NAVY },
      { text: 'Write the brief in Step 1, write or load a texture in Step 2, click Assemble prompt, paste the assembled prompt into your LLM of choice, paste the LLM\'s JSON response into Step 3. Detailed in forge_workflow_guide.md.' }
    ], { after: 100 }),
    richPara([
      { text: 'Path B. Inventory → Scope (direct import).  ', bold: true, color: COLOR_NAVY },
      { text: 'Skip the LLM. If you already have a scope and sequence document or a lesson inventory JSON, click "Load Scope & Sequence docx" (next to "Load JSON from file") to import a Word export. Or paste an inventory JSON directly into Step 3. The workbench detects the shape and converts.' }
    ], { after: 160 }),
    screenshot('Scope page Step 3. Two file load buttons side by side: "Load JSON from file" and "Load Scope & Sequence docx."'),
    para('For Big Dogs we will use Path B. The inventory exists at bigdogs_lesson_inventory_v2.json (61 lessons, 26 concept days, 6 acts).', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(2, 'Load the Big Dogs inventory', [
    para('Click "Load JSON from file" and pick bigdogs_lesson_inventory_v2.json. The Step 3 textarea fills with the inventory JSON. The status line below the button confirms the file size.', { after: 100 }),
    screenshot('Step 3 after loading the inventory JSON. ~30 KB of JSON in the textarea.'),
    para('Alternatively, if you have a Word docx of the scope and sequence table, click "Load Scope & Sequence docx" instead. The mammoth converter, the harness parser, and the header-agnostic detector run in your browser. The resulting inventory JSON appears in the textarea, ready to review.', { after: 160 })
  ]),

  ...step(3, 'Click Review & Stage', [
    para('Review & Stage is the primary action below Step 3. Click it. The workbench detects that the JSON is in inventory shape (no pins[], yes concept_days[] and lessons[]), converts it to scope shape, and renders the scope card view.', { after: 100 }),
    para('A toast confirms the conversion: "Lesson inventory detected — converted to scope (6 acts, 26 concept days, 61 sessions)." The scope view below shows the pins, sub-units, and sessions in order.', { after: 100 }),
    screenshot('Rendered scope. Pin 1 is "Act 1. Is This Even True?" with 5 sub-units beneath it.'),
    para('Underneath the scope, the acceptance gate runs the linter. Read every flag. Blocker-level flags must be addressed before you can stage to the calendar. Fixme-level flags should be reviewed. Polish-level flags can be acknowledged. The forge_flag_reading_guide.md explains each category in detail.', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(4, 'Run the Standards × Rigor audit', [
    para('Navigate to Standards × Rigor (top nav, or back-link from any sub-page). The page has three views: NJSLS Library, Coverage Audit, and Year Coverage Map. Pick Coverage Audit.', { after: 100 }),
    para('At the top of the Coverage Audit page is the Outline Heatmap panel. The current scope is already known to the workbench. The audit identifies which standards the scope touches and how often (the heat). It flags GHOST codes (out of band), STRETCH codes (the tagged standard does not match the lesson activity), and WEAK codes (partial match).', { after: 100 }),
    screenshot('Coverage Audit Outline Heatmap for Big Dogs. 3-LS3-1 flagged GHOST. MS-LS4-4 on L15 flagged STRETCH. Three SP.B.4 tags on L2-L4 flagged WEAK.'),
    para('Each flag is a real call to action. GHOST means a code is grade 3 and the cohort is 5/6 (replace it). STRETCH means the lesson does not really teach the tagged standard (re-tag or rewrite). WEAK means the match is partial (consider a co-tag).', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(5, 'Place sessions on the Cohort Calendar', [
    para('Navigate to Cohort Calendar. The year grid renders with weeks across the top and days down the side. Sessions that arrived without week / dayOfWeek / durationMinutes fields (which is true for any session imported from an inventory) show in the staging tray rather than on the grid.', { after: 100 }),
    para('Drag sessions from the staging tray onto the year grid. Or use the Transforms panel on the Scope page to bulk-assign weeks based on concept day order. Conflicts (two sessions in the same slot, missing duration, off-cohort placement) are flagged immediately.', { after: 100 }),
    screenshot('Cohort Calendar with first three weeks of Big Dogs sessions placed. Conflict highlighted on week 2 Wednesday.'),
    para('Once all sessions are placed without conflicts, click "Save to year" on the Scope page. This persists to forge_ss_year so the Year Coverage Map, Title Ledger, and Scope Diff views all see the staged challenge.', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(6, 'Refine and re-stage', [
    para('On the Scope page, click any session title to edit it inline. Enter saves; Esc cancels. Edits are written to scope.pins[i].subUnits[j].sessions[k].title and persisted to forge_ss_last immediately. Click the lock badge (🔓) next to a title to lock it; locked titles survive LLM regenerations.', { after: 100 }),
    screenshot('Inline title edit on a session. Lock badge visible at the right edge.'),
    para('To regenerate parts of the scope through the LLM while preserving your locks and edits, return to Step 2 (texture and prompt assembly), tweak the brief or texture, click Assemble prompt, take it to the LLM, paste the response back into Step 3, click Review & Stage. The locked-title merge runs automatically.', { italics: true, color: COLOR_MUTED, after: 160 })
  ]),

  ...step(7, 'Ship', [
    para('When the scope is staged, the calendar is conflict-free, and the audit shows the coverage you want, you have a partner-ready year.', { after: 100 }),
    para('To export: Scope page → "Export lessons" produces a flattened list of session objects suitable for a partner share. Scope page → "Print skeleton" produces a print-ready three-view document (By Topic, Three-Phase Arc, Lessons by Subject) that replaces the hand-maintained Google Doc skeleton. Documentation page → "Export starter year (.json)" produces a full workbench-state snapshot you can hand to a colleague.', { after: 240 })
  ])
];

// ─── Glossary appendix (pointer, not duplicate) ────────────────

const glossaryAppendix = [
  new Paragraph({ children: [new PageBreak()] }),
  sectionHeader('APPENDIX', 'WHERE TO LOOK', 'pointers, not duplicates'),

  para('This tutorial deliberately does not duplicate the reference material that already lives in the workbench. Use these as your day-to-day references:', { after: 160 }),

  richPara([
    { text: 'forge_glossary.md', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   40 locked terms. Read this first if any vocabulary in the workbench feels unfamiliar.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'forge_brief_template.md', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   Working example brief modeled on Big Dogs. Required fields and optional ones. Copy and edit to start a new challenge.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'forge_workflow_guide.md', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   The eight-step end-to-end workflow for Path A (brief → scope → calendar → audit). Troubleshooting at the end.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'forge_flag_reading_guide.md', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   How to read the acceptance gate. Severity tiers (blocker / fixme / polish), flag categories, common flags and surgical fixes.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'bigdogs_texture_v9.md', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   The current Big Dogs texture (Cohort 5/6, six Acts, partner is St. Hubert\'s). Replaces the v8 entry in the Documentation page Texture catalog. v8 is preserved as historical reference.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'bigdogs_lesson_inventory_v2.json', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   The current Big Dogs inventory (61 lessons, 26 concept days, 6 acts, 20 unique codes tagged). The Path B import target for the walkthrough above.', italics: true, color: COLOR_MUTED }
  ], { after: 80 }),

  richPara([
    { text: 'texture_lessons_harness/', font: FONT_MONO, color: COLOR_NAVY, bold: true },
    { text: '   The xUnit-disciplined harness that backs the docx import. Run node harness.js inside the directory to see PASS / FAIL on every parser fixture.', italics: true, color: COLOR_MUTED }
  ], { after: 240 }),

  para('When this tutorial drifts from the workbench, the workbench wins. Open Documentation → Glossary first; the locked vocabulary in that file is the source of truth for every term you see here.', { italics: true, color: COLOR_MUTED, after: 200 })
];

// ─── Document ──────────────────────────────────────────────────

const doc = new Document({
  creator: 'Claude',
  title: 'Forge Curriculum Workbench Tutorial',
  description: 'Layered tutorial for the Forge curriculum workbench. Three audience sections (Overview, Change-log, Full pipeline) anchored to Big Dogs.',
  styles: {
    default: { document: { run: { font: FONT_BODY, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 40, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
        paragraph: { spacing: { before: 0, after: 80 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 }
      }
    },
    children: [
      // Cover
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: 'The Forge Curriculum Workbench', font: FONT_SERIF, size: 48, bold: true, color: COLOR_NAVY })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: 'From a challenge brief to a scoped, sequenced, audited year', font: FONT_SERIF, size: 28, italics: true, color: COLOR_MUTED })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({ text: 'Tutorial', font: FONT_BODY, size: 22, bold: true, color: COLOR_ACCENT }),
          new TextRun({ text: '   ·   ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Big Dogs as the worked example', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '   ·   ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Built 2026-06-25', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED })
        ]
      }),

      // Audience map
      h3('Pick your section'),
      audienceMapTable,

      para('This tutorial is one document with three audience-targeted sections. You do not need to read all three. Pick the one that matches you and jump to it. Section C uses Big Dogs end to end, so even if you only read Section A you will see the same example named throughout.', { italics: true, color: COLOR_MUTED, before: 240, after: 200 }),

      para('Where this tutorial points at an existing reference file in the workbench rather than duplicating it, follow the pointer. Drift is real; duplication makes it worse. The Documentation page links to every reference doc the tutorial cites.', { italics: true, color: COLOR_MUTED, after: 200 }),

      // Section A
      new Paragraph({ children: [new PageBreak()] }),
      ...sectionAOverview,

      // Section B
      ...sectionBChangelog,

      // Section C
      ...sectionCDeepDive,

      // Appendix
      ...glossaryAppendix
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = __dirname + '/forge_workbench_tutorial.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('✓ forge_workbench_tutorial.docx written (' + buffer.length + ' bytes)');
});
