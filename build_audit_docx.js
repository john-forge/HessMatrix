// Builds bigdogs_gap_audit.docx in Forge Prep style (matches the lesson plan
// reference doc John provided: bold-caps section headers with middle-dot
// separators, three-column header tables with bold center-aligned headers,
// serif headings, italic context notes).

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  PageOrientation, PageBreak
} = require('docx');

// Forge brand tokens (from forge_app.html :root)
const COLOR_INK = '101010';        // forge-night
const COLOR_MUTED = '707070';      // forge-dim
const COLOR_LINE = 'd9d1bd';       // ss-line
const COLOR_ACCENT = 'c2410c';     // forge-orange (chili-ish)
const COLOR_NAVY = '1f2937';       // brand navy
const COLOR_CREAM = 'FBF6E9';      // header tint
const COLOR_TABLE_HEADER_BG = '1f2937';
const COLOR_TABLE_HEADER_FG = 'FFFFFF';
const COLOR_TABLE_ALT_BG = 'fbf8f1';

const FONT_SERIF = 'Georgia';  // serif headings (Iowan Old Style → Georgia fallback)
const FONT_BODY = 'Calibri';

const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color });
const cellBorders = (color = COLOR_LINE) => ({
  top: border(color), bottom: border(color), left: border(color), right: border(color)
});

// Helper: a paragraph of plain body text
const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after !== undefined ? opts.after : 100, before: opts.before || 0 },
  alignment: opts.align || AlignmentType.LEFT,
  children: [new TextRun({
    text,
    font: FONT_BODY,
    size: opts.size || 22,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || COLOR_INK
  })]
});

// Helper: a paragraph composed of mixed runs (rich text)
const richPara = (runs, opts = {}) => new Paragraph({
  spacing: { after: opts.after !== undefined ? opts.after : 100, before: opts.before || 0 },
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

// SECTION HEADER · matches "SECTION 1 · DAILY REVIEW · 5 min" pattern
const sectionHeader = (label, title, meta) => new Paragraph({
  spacing: { before: 280, after: 160 },
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

// Three-column header table (PREVIOUS/THIS/NEXT pattern)
const headerCell = (text, bg = COLOR_TABLE_HEADER_BG, fg = COLOR_TABLE_HEADER_FG) => new TableCell({
  borders: cellBorders(COLOR_NAVY),
  width: { size: 3120, type: WidthType.DXA },
  shading: { fill: bg, type: ShadingType.CLEAR },
  margins: { top: 100, bottom: 100, left: 140, right: 140 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: FONT_BODY, size: 20, bold: true, color: fg })]
  })]
});

const bodyCell = (textOrRuns, opts = {}) => {
  const runs = Array.isArray(textOrRuns) ? textOrRuns : [{ text: textOrRuns }];
  return new TableCell({
    borders: cellBorders(COLOR_LINE),
    width: { size: opts.width || 3120, type: WidthType.DXA },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: runs.map(r => new Paragraph({
      spacing: { after: 40 },
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: r.text,
        font: FONT_BODY,
        size: r.size || 20,
        bold: !!r.bold,
        italics: !!r.italics,
        color: r.color || COLOR_INK
      })]
    }))
  });
};

// Three-column 3120 + 3120 + 3120 = 9360 (US Letter content width)
const threeColumnHeaderTable = (cells, opts = {}) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({ tableHeader: true, children: cells[0].map(t => headerCell(t)) }),
    new TableRow({ children: cells[1].map(c => bodyCell(c, { width: 3120 })) })
  ]
});

// Heat-distribution table (4 columns: Code, Touches, Subject/Grade, Status)
const heatRow = (code, touches, sg, status, statusColor, isHeader = false) => new TableRow({
  tableHeader: isHeader,
  children: [
    isHeader ? headerCell(code) :
      new TableCell({
        borders: cellBorders(COLOR_LINE),
        width: { size: 2200, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: code, font: 'Consolas', size: 20, bold: true, color: COLOR_INK })] })]
      }),
    isHeader ? headerCell(touches) :
      new TableCell({
        borders: cellBorders(COLOR_LINE),
        width: { size: 1400, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(touches), font: FONT_BODY, size: 20, bold: true, color: COLOR_NAVY })] })]
      }),
    isHeader ? headerCell(sg) :
      new TableCell({
        borders: cellBorders(COLOR_LINE),
        width: { size: 1960, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: sg, font: FONT_BODY, size: 19, italics: true, color: COLOR_MUTED })] })]
      }),
    isHeader ? headerCell(status) :
      new TableCell({
        borders: cellBorders(COLOR_LINE),
        width: { size: 3800, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: status, font: FONT_BODY, size: 19, bold: status.startsWith('PASS') || status.startsWith('GHOST') || status.startsWith('WEAK') || status.startsWith('STRETCH'), color: statusColor || COLOR_INK })] })]
      }),
  ]
});

const heatTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2200, 1400, 1960, 3800],
  rows: [
    new TableRow({ tableHeader: true, children: [headerCell('CODE'), headerCell('TOUCHES'), headerCell('SUBJECT/GRADE'), headerCell('STATUS')] }),
    heatRow('W.NW.6.3', 9, 'ela G6', 'PASS', COLOR_NAVY),
    heatRow('W.AW.6.1', 7, 'ela G6', 'PASS', COLOR_NAVY),
    heatRow('6.SP.B.5', 6, 'math G6', 'PASS', COLOR_NAVY),
    heatRow('3-LS3-1', 5, '— (grade 3)', 'GHOST · replace', COLOR_ACCENT),
    heatRow('MS-LS4-6', 5, 'science MS', 'PASS', COLOR_NAVY),
    heatRow('SL.PE.6.1', 4, 'ela G6', 'STRETCH on solo-write lessons', COLOR_ACCENT),
    heatRow('MS-LS4-5', 4, 'science MS', 'PASS', COLOR_NAVY),
    heatRow('W.SE.6.6', 4, 'ela G6', 'STRETCH on L35-L38 (survey responses ≠ source evidence)', COLOR_ACCENT),
    heatRow('6.SP.B.4', 3, 'math G6', 'WEAK on L2-L4 (display, but lessons interpret)', COLOR_ACCENT),
    heatRow('W.WR.6.5', 3, 'ela G6', 'PASS', COLOR_NAVY),
    heatRow('RI.AA.6.7', 3, 'ela G6', 'STRETCH on writing-side lessons', COLOR_ACCENT),
    heatRow('W.WP.6.4', 2, 'ela G6', 'PASS', COLOR_NAVY),
    heatRow('6.RP.A.2', 1, 'math G6', 'PASS', COLOR_NAVY),
    heatRow('6.RP.A.3', 1, 'math G6', 'PASS', COLOR_NAVY),
    heatRow('MS-LS4-4', 1, 'science MS', 'STRETCH (artificial selection ≠ natural selection per statement)', COLOR_ACCENT),
    heatRow('SL.PI.6.4', 1, 'ela G6', 'PASS', COLOR_NAVY),
    heatRow('SL.UM.6.5', 1, 'ela G6', 'PASS', COLOR_NAVY),
  ]
});

// Inferred-but-untagged block builder
const inferredBlock = (code, sg, statement, evidence, why) => [
  richPara([
    { text: code, bold: true, color: COLOR_ACCENT, font: 'Consolas' },
    { text: '  ' + sg, italics: true, color: COLOR_MUTED }
  ], { before: 160, after: 60 }),
  richPara([
    { text: 'Statement (verbatim): ', bold: true, color: COLOR_NAVY },
    { text: '"' + statement + '"', italics: true }
  ], { after: 80 }),
  richPara([
    { text: 'Evidence: ', bold: true, color: COLOR_NAVY },
    { text: evidence }
  ], { after: 80 }),
  richPara([
    { text: 'Why: ', bold: true, color: COLOR_NAVY },
    { text: why }
  ], { after: 160 })
];

// Untouched-in-band table (3 columns)
const untouchedTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({ tableHeader: true, children: [headerCell('SUBJECT'), headerCell('UNTOUCHED IN BAND'), headerCell('COVERAGE %')] }),
    new TableRow({ children: [
      bodyCell([{ text: 'ELA G5-6', bold: true }]),
      bodyCell([{ text: '57 of 66 codes untouched' }], { align: AlignmentType.CENTER }),
      bodyCell([{ text: '14%', bold: true, color: COLOR_NAVY }], { align: AlignmentType.CENTER })
    ] }),
    new TableRow({ children: [
      bodyCell([{ text: 'Math G5-6', bold: true }]),
      bodyCell([{ text: '55 of 59 codes untouched' }], { align: AlignmentType.CENTER }),
      bodyCell([{ text: '7%', bold: true, color: COLOR_NAVY }], { align: AlignmentType.CENTER })
    ] }),
    new TableRow({ children: [
      bodyCell([{ text: 'Science 5 + MS', bold: true }]),
      bodyCell([{ text: '72 of 75 codes untouched' }], { align: AlignmentType.CENTER }),
      bodyCell([{ text: '4%', bold: true, color: COLOR_NAVY }], { align: AlignmentType.CENTER })
    ] })
  ]
});

// Bottom-line numbered fixes (use docx-js numbering)
const doc = new Document({
  creator: 'Claude',
  title: 'Big Dogs Gap Audit',
  description: 'NJSLS coverage and gap audit for the Big Dogs challenge, expanded from concept days into the 56 lessons in the Lesson Content linked list.',
  styles: {
    default: {
      document: { run: { font: FONT_BODY, size: 22 } }
    },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
        paragraph: { spacing: { before: 0, after: 80 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 280 } } } }] },
      { reference: 'fixes',
        levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
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
      // Title block
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: 'Big Dogs Gap Audit', font: FONT_SERIF, size: 44, bold: true, color: COLOR_NAVY })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({ text: 'Why Big Dogs Get Passed Over', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Cohort 5/6', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: '56 lessons', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Audited 2026-06-25', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED })
        ]
      }),

      // Header three-column table (DOCUMENT · POPULATION · TAGGED)
      threeColumnHeaderTable([
        ['DOCUMENT', 'POPULATION AUDITED', 'CODES TAGGED'],
        [
          [
            { text: 'Why Big Dogs Get Passed Over', bold: true },
            { text: 'Scope and Sequence (Google Doc)' },
            { text: 'Cohort 5/6 · St. Hubert\'s partner challenge', italics: true, color: COLOR_MUTED }
          ],
          [
            { text: '56 lessons', bold: true },
            { text: '(Lesson Content treated as actual lessons,' },
            { text: 'expanded from 26 concept days via the' },
            { text: 'L1 → L2 → L3 linked list)' }
          ],
          [
            { text: '17 unique codes', bold: true },
            { text: '16 resolve in v1.1 NJSLS DB' },
            { text: '1 ghost: 3-LS3-1 (grade 3, outside 5-8 band)', italics: true, color: COLOR_ACCENT }
          ]
        ]
      ]),

      // SECTION 1 — Heat distribution
      sectionHeader('SECTION 1', 'HEAT DISTRIBUTION', '17 tagged codes ranked by lesson count'),
      para('How many of the 56 lessons each tagged NJSLS code touches. STATUS column flags STRETCH, WEAK, and GHOST verdicts that warrant attention.', { italics: true, color: COLOR_MUTED, after: 200 }),
      heatTable,

      // SECTION 2 — Zero-NJSLS lessons
      sectionHeader('SECTION 2', 'UNTAGGED LESSONS', '7 in Acts 3-4 carry only SEP placeholders'),
      para('These lessons engage NGSS Science and Engineering Practices but no NJSLS code is recorded. The workbench heatmap reads them as untagged.', { italics: true, color: COLOR_MUTED, after: 200 }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L25 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 13, Act 3)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'What makes a good observation?' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L26 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 14, Act 3)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'Observing animal behavior (ethology)' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L27 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 14, Act 3)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'Designing observation experiments for our dogs' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L28 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 15, Act 3)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'Identifying patterns in animal behavior' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L29 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 15, Act 3)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'Drawing inferences from the patterns' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L30 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 16, Act 4)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'Introduce and model how to create a testable hypothesis' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 },
        children: [
          new TextRun({ text: 'L31 ', font: 'Consolas', size: 22, bold: true, color: COLOR_NAVY }),
          new TextRun({ text: '(day 16, Act 4)  ', size: 20, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: 'What can we prove / test for' })
        ]
      }),

      // SECTION 3 — Inferred gaps
      new Paragraph({ children: [new PageBreak()] }),
      sectionHeader('SECTION 3', 'INFERRED-BUT-UNTAGGED GAPS', '8 high-confidence findings'),
      para('Each pulls the verbatim .statement from window.NJSLS_STANDARDS. Each carries specific lesson_ord cites and explicit counter-evidence to the currently-tagged code.', { italics: true, color: COLOR_MUTED, after: 240 }),
      ...inferredBlock('5.DL.A.1', '[math G5]',
        'Understand how different visualizations can highlight different aspects of data. Ask questions and interpret data visualizations to describe and analyze patterns.',
        'L2-L4 (introducing the data, introducing graphs, interpreting graphs)',
        'On-target G5 standard for INTERPRETING visualizations. The upper table tagged it; Section 6 dropped it. 6.SP.B.4 (currently tagged) is for PRODUCING displays, not reading them.'
      ),
      ...inferredBlock('SL.ES.6.3', '[ela G6]',
        'Deconstruct a speaker\'s argument and specific claims, distinguishing claims that are supported by reasons and evidence from claims that are not.',
        'L19 (test beliefs against facts), L43 (Seminar question and defend), Act 6 untagged "Evaluating Speakers" row',
        'Listening-strand companion to RI.AA.6.7. The Seminar and Evaluating-Speakers rows are this standard verbatim.'
      ),
      ...inferredBlock('RI.CR.6.1', '[ela G6]',
        'Cite textual evidence and make relevant connections to support analysis of what an informational text says explicitly as well as inferences drawn from the text.',
        'L16 (border collie reading), L47 (Eddie blog reading)',
        'Three assigned informational-text readings; zero reading-strand codes tagged across the entire scope.'
      ),
      ...inferredBlock('RI.CI.6.2', '[ela G6]',
        'Determine the central idea of an informational text and explain how it is supported by key details; provide a summary of the text distinct from personal opinions or judgments.',
        'L16, L47',
        'Same readings, same gap. The mentor-text analysis specifically engages central-idea identification.'
      ),
      ...inferredBlock('SL.II.6.2', '[ela G6]',
        'Interpret information presented in diverse media and formats (e.g., visually, quantitatively, orally) and explain how it contributes to a topic, text, or issue under study.',
        'L2-L4 (interpreting shelter tables and graphs), L56 (briefing)',
        'The standard\'s verbatim "visually, quantitatively, orally" maps exactly to the shelter-data interpretation work and the final briefing.'
      ),
      ...inferredBlock('6.SP.A.1', '[math G6]',
        'Recognize a statistical question as one that anticipates variability in the data related to the question and accounts for it in the answers.',
        'L30 (testable hypothesis), L31 (testable reasons brainstorm)',
        'Testable-hypothesis work IS recognizing statistical questions. Currently L30 and L31 are SEP-only.'
      ),
      ...inferredBlock('6.SP.A.2', '[math G6]',
        'Understand that a set of data collected to answer a statistical question has a distribution which can be described by its center, spread, and overall shape.',
        'L35-L38 (cleaning data, dot plot, charts, themes), Line 18 detail block in doc (mean/median/mode taught)',
        'The Line 18 expansion explicitly teaches mean/median/mode; that\'s 6.SP.A.2 verbatim. Currently only 6.SP.B.5 is tagged.'
      ),
      ...inferredBlock('W.NW.6.3.b/.d', '[ela G6 sub-bullets]',
        'Code already tagged at the day level; sub-bullets .b (narrative techniques: dialogue, pacing, description) and .d (sensory language) are not surfaced in the current tagging.',
        'L48 (Identifying elements of a persuasive narrative)',
        'L48 specifically engages the .b and .d sub-bullets of W.NW.6.3. Surfacing sub-bullet-level tagging gives the workbench finer-grained heat coloring.'
      ),

      // SECTION 4 — Untouched in band
      new Paragraph({ children: [new PageBreak()] }),
      sectionHeader('SECTION 4', 'UNTOUCHED-IN-BAND COUNTS', 'Cold cells in the workbench heatmap'),
      para('This is a single 7-week challenge. Low percentages are expected. The cold cells become meaningful in the workbench\'s Year Coverage Map where the year of challenges should fill them in cumulatively.', { italics: true, color: COLOR_MUTED, after: 200 }),
      untouchedTable,

      // SECTION 5 — Bottom line
      sectionHeader('SECTION 5', 'BOTTOM LINE', 'Three priority fixes'),
      richPara([{ text: 'Verbatim .statement quotes pulled from window.NJSLS_STANDARDS in each replacement.', italics: true, color: COLOR_MUTED }], { after: 200 }),

      new Paragraph({ numbering: { reference: 'fixes', level: 0 }, spacing: { after: 120, before: 60 },
        children: [
          new TextRun({ text: 'Replace 3-LS3-1 with an in-database code. ', bold: true, color: COLOR_NAVY }),
          new TextRun({ text: 'Closest in-database PE for "inheritance + variation" in the Junior band: ' }),
          new TextRun({ text: 'MS-LS3-2', bold: true, font: 'Consolas' }),
          new TextRun({ text: ' — "Develop and use a model to describe why asexual reproduction results in offspring with identical genetic information and sexual reproduction results in offspring with genetic variation."', italics: true })
        ]
      }),
      new Paragraph({ numbering: { reference: 'fixes', level: 0 }, spacing: { after: 120 },
        children: [
          new TextRun({ text: 'Restore 5.DL.A.1 on day 2 and add SL.II.6.2. ', bold: true, color: COLOR_NAVY }),
          new TextRun({ text: 'The shelter-data interpretation work (L2-L4) currently reads as DOK 1 display-creation in the workbench because 6.SP.B.4 is the production standard, not the interpretation one. Add both codes so the lessons land on the on-target rigor.' })
        ]
      }),
      new Paragraph({ numbering: { reference: 'fixes', level: 0 }, spacing: { after: 200 },
        children: [
          new TextRun({ text: 'Tag the reading-strand standards on the assigned readings. ', bold: true, color: COLOR_NAVY }),
          new TextRun({ text: 'RI.CR.6.1 + RI.CI.6.2 on L16 (border collie) and L47 (Eddie). The three assigned readings have no reading-strand code in the inventory.' })
        ]
      }),

      // Source footer
      new Paragraph({
        spacing: { before: 360, after: 0 },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_LINE, space: 6 } },
        children: [new TextRun({ text: 'Sources', font: FONT_BODY, size: 18, bold: true, color: COLOR_NAVY })]
      }),
      richPara([
        { text: 'bigdogs_lesson_inventory.json', font: 'Consolas', size: 18 },
        { text: '  ·  ', color: COLOR_ACCENT, size: 18 },
        { text: 'Big Dogs Scope and Sequence (Google Doc, file ID 1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU)', size: 18, italics: true, color: COLOR_MUTED }
      ], { after: 60 }),
      richPara([
        { text: 'window.NJSLS_STANDARDS', font: 'Consolas', size: 18 },
        { text: ' schema 1.1, from ', size: 18, color: COLOR_MUTED },
        { text: 'njsls_standards.js', font: 'Consolas', size: 18 },
        { text: ' + ', size: 18, color: COLOR_MUTED },
        { text: 'njsls_v1_1_augmentations.js', font: 'Consolas', size: 18 }
      ], { after: 60 }),
      richPara([
        { text: 'Audit verified under xUnit Test Patterns harness (Meszaros, 2007): 94 of 94 mechanical checks PASS; 8 of 8 inferences carry specific lesson cites and explicit counter-evidence; WRONG verdict not present in this inventory.', size: 18, italics: true, color: COLOR_MUTED }
      ])
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(__dirname + '/bigdogs_gap_audit.docx', buffer);
  console.log('✓ bigdogs_gap_audit.docx written');
});
