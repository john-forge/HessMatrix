// Builds bigdogs_coverage.docx in the same Forge Prep style as the gap audit,
// but laid out to mirror the Lunch doc's "Standards Coverage Summary" section
// (Defensible / Soft / Combined / Coverage %).
//
// Single cohort 5/6 only. No Expected/Delta column — Big Dogs time budget data
// was not located. Per source-or-silent: counts and coverage % only.
//
// Reclassifications from PASS/WEAK/STRETCH/GHOST → Defensible/Soft are flagged
// per-code in the detail tables.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  PageOrientation, PageBreak
} = require('docx');

// Forge brand tokens (match build_audit_docx.js)
const COLOR_INK = '101010';
const COLOR_MUTED = '707070';
const COLOR_LINE = 'd9d1bd';
const COLOR_ACCENT = 'c2410c';
const COLOR_NAVY = '1f2937';
const COLOR_CREAM = 'FBF6E9';
const COLOR_TABLE_HEADER_BG = '1f2937';
const COLOR_TABLE_HEADER_FG = 'FFFFFF';

const FONT_SERIF = 'Georgia';
const FONT_BODY = 'Calibri';

const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color });
const cellBorders = (color = COLOR_LINE) => ({
  top: border(color), bottom: border(color), left: border(color), right: border(color)
});

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

const headerCell = (text, bg = COLOR_TABLE_HEADER_BG, fg = COLOR_TABLE_HEADER_FG, width = 3120) => new TableCell({
  borders: cellBorders(COLOR_NAVY),
  width: { size: width, type: WidthType.DXA },
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
        font: r.font || FONT_BODY,
        size: r.size || 20,
        bold: !!r.bold,
        italics: !!r.italics,
        color: r.color || COLOR_INK
      })]
    }))
  });
};

const threeColumnHeaderTable = (cells) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({ tableHeader: true, children: cells[0].map(t => headerCell(t)) }),
    new TableRow({ children: cells[1].map(c => bodyCell(c, { width: 3120 })) })
  ]
});

// ──────── Cohort 5/6 Coverage Summary (6 columns) ────────
// Subject | Grade band | Def. | Soft | Combined | Coverage %
const SUMMARY_COLS = [1800, 1400, 900, 900, 2160, 2200];  // sums to 9360
const summaryRow = (subject, gradeBand, def, soft, combined, coverage, opts = {}) => new TableRow({
  children: [
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[0], type: WidthType.DXA },
      shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text: subject, font: FONT_BODY, size: 20, bold: true, color: COLOR_NAVY })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[1], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: gradeBand, font: FONT_BODY, size: 19, italics: true, color: COLOR_MUTED })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[2], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(def), font: FONT_BODY, size: 20, bold: true, color: COLOR_INK })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[3], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(soft), font: FONT_BODY, size: 20, color: COLOR_INK })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[4], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: combined, font: FONT_BODY, size: 20, color: COLOR_INK })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: SUMMARY_COLS[5], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: coverage, font: FONT_BODY, size: 20, bold: true, color: COLOR_NAVY })] })]
    })
  ]
});

const summaryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: SUMMARY_COLS,
  rows: [
    new TableRow({ tableHeader: true, children: [
      headerCell('SUBJECT', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[0]),
      headerCell('GRADE BAND', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[1]),
      headerCell('DEF.', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[2]),
      headerCell('SOFT', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[3]),
      headerCell('COMBINED', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[4]),
      headerCell('COVERAGE %', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, SUMMARY_COLS[5])
    ] }),
    summaryRow('Math', 'G5-6', 4, 0, '4 of 59', '7%'),
    summaryRow('Science', 'G5 + MS', 3, 0, '3 of 75 (+1 ghost)', '4%'),
    summaryRow('ELA', 'G5-6', 6, 3, '9 of 66', '14%')
  ]
});

// ──────── Per-subject detail tables ────────
// Code | Standard text | Type | Sessions / where it lives | Audit note (if any)
const DETAIL_COLS = [1300, 4400, 1200, 2460];  // sums to 9360

const detailRow = (code, text, type, sessions, opts = {}) => new TableRow({
  children: [
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: DETAIL_COLS[0], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text: code, font: 'Consolas', size: 19, bold: true, color: COLOR_INK })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: DETAIL_COLS[1], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text: text, font: FONT_BODY, size: 18, italics: true, color: COLOR_INK })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: DETAIL_COLS[2], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({
        text: type,
        font: FONT_BODY,
        size: 19,
        bold: true,
        color: type === 'defensible' ? COLOR_NAVY : (type === 'soft' ? COLOR_MUTED : COLOR_ACCENT)
      })] })]
    }),
    new TableCell({
      borders: cellBorders(COLOR_LINE),
      width: { size: DETAIL_COLS[3], type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: opts.audit ? [
        new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: sessions, font: FONT_BODY, size: 18, color: COLOR_INK })] }),
        new Paragraph({ children: [new TextRun({ text: 'Audit note: ' + opts.audit, font: FONT_BODY, size: 17, italics: true, color: COLOR_ACCENT })] })
      ] : [
        new Paragraph({ children: [new TextRun({ text: sessions, font: FONT_BODY, size: 18, color: COLOR_INK })] })
      ]
    })
  ]
});

const detailHeaderRow = () => new TableRow({ tableHeader: true, children: [
  headerCell('CODE', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, DETAIL_COLS[0]),
  headerCell('STANDARD TEXT (VERBATIM, NJSLS)', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, DETAIL_COLS[1]),
  headerCell('TYPE', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, DETAIL_COLS[2]),
  headerCell('SESSIONS / WHERE IT LIVES', COLOR_TABLE_HEADER_BG, COLOR_TABLE_HEADER_FG, DETAIL_COLS[3])
] });

// ── Math detail ──
const mathDetail = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: DETAIL_COLS,
  rows: [
    detailHeaderRow(),
    detailRow(
      '6.RP.A.2', 6, 'G6',
      'Understand the concept of a unit rate a/b associated with a ratio a:b with b ≠ 0, and use rate language in the context of a ratio relationship.',
      'defensible',
      'Day 3 (Act 1): adoption-rate lesson L1 — counts vs. rates, compute the rate.'
    ),
    detailRow(
      '6.RP.A.3',
      'Use ratio and rate reasoning to solve real-world and mathematical problems, e.g., by reasoning about tables of equivalent ratios, tape diagrams, double number line diagrams, or equations.',
      'defensible',
      'Day 4 (Act 1): misleading-presentation lesson L1 — hidden-factor reasoning over groups.'
    ),
    detailRow(
      '6.SP.B.4',
      'Display numerical data in plots on a number line, including dot plots, histograms, and box plots.',
      'defensible',
      'Day 2 (Act 1): L1 intro data, L2 intro graphs (bar/line/pie), L3 interpret graphs.',
      { audit: 'WEAK on L2-L4 — lessons read and interpret graphs; SP.B.4 statement is about displaying plots on a number line.' }
    ),
    detailRow(
      '6.SP.B.5',
      'Summarize numerical data sets in relation to their context, such as by:',
      'defensible',
      'Day 5 (Act 1) write-up of claim with evidence; Day 18 (Act 4) data cleaning, dot plot, charts, themes.'
    )
  ]
});

// Fix the mathDetail — first detailRow had wrong arg order. Rewrite cleanly.
const mathDetailFixed = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: DETAIL_COLS,
  rows: [
    detailHeaderRow(),
    detailRow(
      '6.RP.A.2',
      'Understand the concept of a unit rate a/b associated with a ratio a:b with b ≠ 0, and use rate language in the context of a ratio relationship.',
      'defensible',
      'Day 3 (Act 1): adoption-rate lesson L1 — counts vs. rates, compute the rate.'
    ),
    detailRow(
      '6.RP.A.3',
      'Use ratio and rate reasoning to solve real-world and mathematical problems, e.g., by reasoning about tables of equivalent ratios, tape diagrams, double number line diagrams, or equations.',
      'defensible',
      'Day 4 (Act 1): misleading-presentation lesson L1 — hidden-factor reasoning over groups.'
    ),
    detailRow(
      '6.SP.B.4',
      'Display numerical data in plots on a number line, including dot plots, histograms, and box plots.',
      'defensible',
      'Day 2 (Act 1): L1 intro data, L2 intro graphs (bar/line/pie), L3 interpret graphs.',
      { audit: 'WEAK in audit — lessons read and interpret graphs; SP.B.4 statement is about displaying.' }
    ),
    detailRow(
      '6.SP.B.5',
      'Summarize numerical data sets in relation to their context, such as by:',
      'defensible',
      'Day 5 (Act 1) write claim with evidence; Day 18 (Act 4) data cleaning, dot plot, charts, themes.'
    )
  ]
});

// ── Science detail ──
const scienceDetail = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: DETAIL_COLS,
  rows: [
    detailHeaderRow(),
    detailRow(
      'MS-LS4-4',
      'Construct an explanation based on evidence that describes how genetic variations of traits in a population increase some individuals’ probability of surviving and reproducing in a specific environment.',
      'defensible',
      'Day 8 (Act 2) L1: what is natural selection — wolf-to-dog story.',
      { audit: 'STRETCH in audit — wolf-to-dog domestication is artificial (human-driven) selection; LS4-4 names natural selection.' }
    ),
    detailRow(
      'MS-LS4-5',
      'Gather and synthesize information about the technologies that have changed the way humans influence the inheritance of desired traits in organisms.',
      'defensible',
      'Day 9 (Act 2) L1-L2 border collie reading + breed-trait research; Day 11 (Act 2) L1-L2 roles + trait-role connections.'
    ),
    detailRow(
      'MS-LS4-6',
      'Use mathematical representations to support explanations of how natural selection may lead to increases and decreases of specific traits in populations over time.',
      'defensible',
      'Day 10 (Act 2) L1 polygenic inheritance, L2 adaptation, L3 breeding for polygenic traits; Day 11 L1-L2.'
    )
  ]
});

// ── ELA detail ──
const elaDetail = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: DETAIL_COLS,
  rows: [
    detailHeaderRow(),
    detailRow(
      'W.NW.6.3',
      'Write narratives to develop real or imagined experiences or events using effective technique, relevant descriptive details, and well-structured event sequences.',
      'defensible',
      'Day 22 (L46-L48) story structure + Eddie/Billie mentor texts; Day 23 (L49-L52) anatomy of an ad, target audience, pathos, devices; Day 25 finalize the card.'
    ),
    detailRow(
      'W.AW.6.1',
      'Write arguments on discipline-specific content (e.g., social studies, science, math, technical subjects, English/Language Arts) to support claims with clear reasons and relevant evidence.',
      'defensible',
      'Day 5 (Act 1) L1-L2 claim with data; Day 20 (Act 4) L1-L2 + Seminar; Day 21 L1 falsify/support claims; Day 25 finalize.'
    ),
    detailRow(
      'W.WR.6.5',
      'Conduct short research projects to answer a question, drawing on several sources and refocusing the inquiry when appropriate.',
      'defensible',
      'Day 17 (Act 4) L1 qual vs. quant, L2 writing unbiased questions, L3 sampling and respondent pool.'
    ),
    detailRow(
      'W.SE.6.6',
      'Gather relevant information from multiple print and digital sources; assess the credibility of each source; and quote or paraphrase the data and conclusions of others while avoiding plagiarism and providing basic bibliographic information for sources.',
      'defensible',
      'Day 18 (Act 4) L1-L4: data cleaning, dot plot, charts, themes.',
      { audit: 'STRETCH in audit — survey responses students collected themselves are not multi-source print/digital evidence with credibility assessment.' }
    ),
    detailRow(
      'W.WP.6.4',
      'With some guidance and support from peers and adults, develop and strengthen writing as needed by planning; flexibly making editing and revision choices; sustaining effort to fit composition needs and purposes; and attempting to address purpose and audience.',
      'defensible',
      'Day 24 (Act 5) L1 model the draft (perspective, voice); L2 peer review re-norm.'
    ),
    detailRow(
      'RI.AA.6.7',
      'Trace the development of and evaluate the argument and specific claims in a text, distinguishing claims that are supported by reasons and evidence from claims that are not.',
      'defensible',
      'Day 19 (Act 4) L1 correlation vs. causation, L2 revise hypothesis; Day 21 L1 support/falsify claims.',
      { audit: 'STRETCH in audit on writing-side lessons — students are writing/revising their own claim rather than tracing an author\'s argument in a text.' }
    ),
    detailRow(
      'SL.PE.6.1',
      'Engage effectively in a range of collaborative discussions (one-on-one, in groups, and teacher-led) with diverse partners on grade 6 topics, texts, and issues, building on others’ ideas and expressing their own clearly.',
      'soft',
      'Tagged on driving-question days 1, 6, 12 and on day 12 L1-L2 (assumption activity). No standalone discussion-skills instruction lesson; lives as the discussion frame.',
      { audit: 'STRETCH in audit on day 1 + day 6 — solo-write tasks, not collaborative discussion. Reclassified soft because no standalone instruction lesson exists.' }
    ),
    detailRow(
      'SL.PI.6.4',
      'Present claims and findings, sequencing ideas logically and using pertinent descriptions, facts, and details to accentuate main ideas or themes; use appropriate speaking behaviors (e.g., eye contact, adequate volume, and clear pronunciation).',
      'soft',
      'Tagged on day 26 (Brief St. Hubert\'s) deliverable only. Untagged Act 6 rows ("Speaking well", "Sequencing presentations logically") would carry instruction but were not tagged to this code.',
      { audit: 'Reclassified soft: the deliverable is named but instruction is not tagged to SL.PI.6.4 in the source document.' }
    ),
    detailRow(
      'SL.UM.6.5',
      'Include multimedia components (e.g., graphics, images, music, sound) and visual displays in presentations to clarify information.',
      'soft',
      'Tagged on day 26 (Brief St. Hubert\'s) deliverable only. No standalone multimedia-design instruction lesson tagged.',
      { audit: 'Reclassified soft: same pattern as SL.PI.6.4 — deliverable named, instruction not tagged to this code.' }
    )
  ]
});

// ──────── Document ────────
const doc = new Document({
  creator: 'Claude',
  title: 'Big Dogs Standards Coverage',
  description: 'NJSLS coverage summary for the Big Dogs challenge in the Lunch-doc format. Defensible / Soft reclassification.',
  styles: {
    default: { document: { run: { font: FONT_BODY, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
        paragraph: { spacing: { before: 0, after: 80 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: FONT_SERIF, color: COLOR_NAVY },
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
      // Title block
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: 'Big Dogs Standards Coverage', font: FONT_SERIF, size: 44, bold: true, color: COLOR_NAVY })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({ text: 'Why Big Dogs Get Passed Over', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Cohort 5/6 only', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: '56 lessons', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED }),
          new TextRun({ text: '  ·  ', font: FONT_BODY, size: 22, color: COLOR_ACCENT }),
          new TextRun({ text: 'Sourced 2026-06-25', font: FONT_BODY, size: 22, italics: true, color: COLOR_MUTED })
        ]
      }),

      // Header three-column table
      threeColumnHeaderTable([
        ['DOCUMENT', 'POPULATION', 'CODES TAGGED'],
        [
          [
            { text: 'Why Big Dogs Get Passed Over', bold: true },
            { text: 'Scope and Sequence (Google Doc)' },
            { text: 'St. Hubert\'s Animal Welfare Center', italics: true, color: COLOR_MUTED }
          ],
          [
            { text: '56 lessons across 6 acts', bold: true },
            { text: '26 concept days expanded via the' },
            { text: 'L1 → L2 → L3 linked list in the' },
            { text: 'Lesson Content column' }
          ],
          [
            { text: '17 unique NJSLS codes', bold: true },
            { text: '13 defensible, 3 soft, 1 ghost' },
            { text: 'Ghost: 3-LS3-1 (grade 3, out of band)', italics: true, color: COLOR_ACCENT }
          ]
        ]
      ]),

      // Honesty preamble (mirrors Lunch doc's small-italic notes)
      para('Format mirrors the Lunch challenge\'s "Standards Coverage Summary" section. Big Dogs differences flagged below.', { italics: true, color: COLOR_MUTED, before: 200, after: 60 }),
      para('1. Single-cohort challenge (5/6 only). No 7/8 split. 2. No Expected (22%) baseline column. The Lunch doc derived 22% from a 195-hour time-budget computation; Big Dogs time-budget hours were not located in the curriculum workbench corpus and have not been computed. Counts and coverage % shown without an expected baseline. 3. The 17 audit verdicts (PASS / WEAK / STRETCH / WRONG / GHOST) have been reclassified into the Lunch doc\'s Defensible / Soft schema. Where reclassification required judgment, the original audit verdict is shown in the per-code Audit Note.', { italics: true, color: COLOR_MUTED, after: 200 }),

      // Definitions block (verbatim from Lunch doc)
      richPara([
        { text: 'Defensible coverage', bold: true, color: COLOR_NAVY },
        { text: '  Named session with instruction, practice, and a challenge deliverable.' }
      ], { after: 80 }),
      richPara([
        { text: 'Soft coverage', bold: true, color: COLOR_NAVY },
        { text: '  No standalone instruction or practice. Shows up in the challenge work.' }
      ], { after: 200 }),

      // SUMMARY TABLE
      sectionHeader('SECTION 1', 'COHORT 5/6 COVERAGE SUMMARY', '17 tagged codes, 16 in band'),
      summaryTable,
      para('Denominators: 66 ELA codes in the G5-6 band, 59 Math codes in G5-6, 75 Science codes in G5 + MS. Source: window.NJSLS_STANDARDS database (curriculum workbench, v1.1). The Science ghost (3-LS3-1) is excluded from the in-band denominator; it is reported separately below.', { italics: true, color: COLOR_MUTED, before: 120, after: 200 }),

      // GHOST FLAG BLOCK
      sectionHeader('SECTION 2', 'GHOST CODE', 'flagged for replacement'),
      richPara([
        { text: '3-LS3-1', bold: true, color: COLOR_ACCENT, font: 'Consolas' },
        { text: '  out-of-band  ', italics: true, color: COLOR_MUTED },
        { text: 'Tagged on concept day 7 (inheritance + variation), inherited by 5 lessons (L10-L14: Genes, Dominant/Recessive, Inheritance, Variation, Punnett Squares). Code is a grade 3 PE; not in the 5-8 NJSLS band. In-band match for this concept day is MS-LS3-2 ("Develop and use a model to describe why asexual reproduction results in offspring with identical genetic information and sexual reproduction results in offspring with genetic variation.").' }
      ], { after: 200 }),

      // SECTION 3 - Math detail
      sectionHeader('SECTION 3', 'STANDARDS DETAIL: MATH', '4 codes · all defensible'),
      mathDetailFixed,

      // SECTION 4 - Science detail
      sectionHeader('SECTION 4', 'STANDARDS DETAIL: SCIENCE', '3 codes in band · 1 ghost (above)'),
      scienceDetail,

      // SECTION 5 - ELA detail
      sectionHeader('SECTION 5', 'STANDARDS DETAIL: ENGLISH LANGUAGE ARTS', '9 codes · 6 defensible, 3 soft'),
      elaDetail,

      // SECTION 6 - Reclassification flags summary
      sectionHeader('SECTION 6', 'RECLASSIFICATION FLAGS', 'where Def/Soft involved judgment'),
      para('Three codes whose reclassification involved a call beyond the Lunch doc\'s plain definition. Listed so any disagreement can be tracked against the audit\'s original verdict.', { italics: true, color: COLOR_MUTED, after: 160 }),
      richPara([
        { text: 'SL.PE.6.1', bold: true, font: 'Consolas', color: COLOR_ACCENT },
        { text: '  Lunch doc would call this defensible if a standalone discussion-skills lesson existed. None does — the code is tagged on driving-question days where the discussion is the frame for a different concept. ', italics: true, color: COLOR_MUTED },
        { text: 'Reclassified to soft.', bold: true, color: COLOR_NAVY }
      ], { after: 120 }),
      richPara([
        { text: 'SL.PI.6.4', bold: true, font: 'Consolas', color: COLOR_ACCENT },
        { text: '  Final brief on day 26 is the deliverable. Audit found three Act 6 rows that would carry presentation-skills instruction ("Evaluating Speakers", "Sequencing presentations logically", "Speaking well") but they were not tagged to SL.PI.6.4 in the source doc. ', italics: true, color: COLOR_MUTED },
        { text: 'Reclassified to soft. Could flip to defensible if those rows are tagged.', bold: true, color: COLOR_NAVY }
      ], { after: 120 }),
      richPara([
        { text: 'SL.UM.6.5', bold: true, font: 'Consolas', color: COLOR_ACCENT },
        { text: '  Same pattern as SL.PI.6.4. Day 26 deliverable tagged; no standalone multimedia-design instruction tagged. ', italics: true, color: COLOR_MUTED },
        { text: 'Reclassified to soft.', bold: true, color: COLOR_NAVY }
      ], { after: 240 }),

      // Source key
      sectionHeader('SOURCES', 'PROVENANCE', 'verbatim quotes only'),
      para('Standard statements: New Jersey Student Learning Standards (2023/2020). Drawn verbatim from the curriculum workbench database, schema v1.1 (window.NJSLS_STANDARDS in forge_app.html).', { italics: true, after: 80 }),
      para('Big Dogs lesson inventory: bigdogs_lesson_inventory.json (2026-06-25). 26 concept days, 56 lessons, 17 unique codes, sourced from Google Doc 1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU.', { italics: true, after: 80 }),
      para('Audit verdicts (PASS / WEAK / STRETCH / GHOST): bigdogs_gap_audit.docx (2026-06-25), the source for the audit notes in this document\'s detail tables.', { italics: true, after: 80 }),
      para('Format reference: Lunch challenge "Time Budget and Standards Coverage" (Google Doc 1-cqGYHAvCY13OOMJcjV1RCfIrnxtr-Yus6o3H2lJkzg). Defensible/Soft definitions and table layout follow that document verbatim.', { italics: true, after: 80 }),
      para('Time-budget data for Big Dogs: not located. The Expected (22%) and Delta columns from the Lunch doc are not present here.', { italics: true, color: COLOR_ACCENT, after: 200 })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = __dirname + '/bigdogs_coverage.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('✓ bigdogs_coverage.docx written (' + buffer.length + ' bytes)');
});
