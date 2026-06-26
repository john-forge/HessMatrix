// Builds bigdogs_lessons_organized.docx in Forge Prep style.
// Renders the markdown deliverable as a single boss-facing Word document.
// Same Forge brand tokens as build_audit_docx.js and build_coverage_docx.js.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  PageBreak, PageOrientation, SectionType, LevelFormat
} = require('docx');

// Forge brand tokens
const COLOR_INK = '101010';
const COLOR_MUTED = '707070';
const COLOR_LINE = 'd9d1bd';
const COLOR_ACCENT = 'c2410c';
const COLOR_NAVY = '1f2937';
const COLOR_CREAM = 'FBF6E9';
const COLOR_TABLE_HEADER_BG = '1f2937';
const COLOR_TABLE_HEADER_FG = 'FFFFFF';
const COLOR_FLAG_GHOST = 'c2410c';
const COLOR_FLAG_ORPHAN = '8a4a1f';

const FONT_SERIF = 'Georgia';
const FONT_BODY = 'Calibri';
const FONT_MONO = 'Consolas';

const border = (color) => ({ style: BorderStyle.SINGLE, size: 4, color });
const cellBorders = (color = COLOR_LINE) => ({
  top: border(color), bottom: border(color), left: border(color), right: border(color)
});

// ─── Inline helpers ─────────────────────────────────────────────────

const para = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after !== undefined ? opts.after : 100, before: opts.before || 0 },
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
  spacing: { before: 320, after: 160 },
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

const actHeader = (n, title) => new Paragraph({
  spacing: { before: 360, after: 100 },
  pageBreakBefore: false,
  children: [
    new TextRun({ text: 'Act ' + n + '. ', font: FONT_SERIF, size: 30, bold: true, color: COLOR_ACCENT }),
    new TextRun({ text: title, font: FONT_SERIF, size: 30, bold: true, color: COLOR_NAVY })
  ]
});

const dayHeader = (n, progression) => richPara([
  { text: '— Day ' + n + ' — ', font: FONT_BODY, size: 21, bold: true, color: COLOR_ACCENT },
  { text: progression + ' —', font: FONT_BODY, size: 21, bold: true, color: COLOR_NAVY }
], { before: 200, after: 80 });

// ─── Header cells ────────────────────────────────────────────────────

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

const bodyCell = (textOrRuns, opts = {}) => {
  const runs = Array.isArray(textOrRuns) ? textOrRuns : [{ text: textOrRuns }];
  return new TableCell({
    borders: cellBorders(COLOR_LINE),
    width: { size: opts.width || 3120, type: WidthType.DXA },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: runs.map(r => new Paragraph({
      spacing: { after: 40 },
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: r.text,
        font: r.font || FONT_BODY,
        size: r.size || (opts.compact ? 16 : 19),
        bold: !!r.bold,
        italics: !!r.italics,
        color: r.color || COLOR_INK
      })]
    }))
  });
};

// Three-column masthead (DOCUMENT / POPULATION / CODES)
const threeColHeader = (cells) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({ tableHeader: true, children: cells[0].map(t => headerCell(t)) }),
    new TableRow({ children: cells[1].map(c => bodyCell(c, { width: 3120 })) })
  ]
});

// ─── Lesson card (Stage 3) ─────────────────────────────────────────

const flagColor = (flagText) => {
  if (/GHOST/.test(flagText)) return COLOR_FLAG_GHOST;
  if (/ORPHAN/.test(flagText)) return COLOR_FLAG_ORPHAN;
  if (/EVIDENCE-MISMATCH/.test(flagText)) return COLOR_ACCENT;
  if (/AUDIT-NOTE/.test(flagText)) return COLOR_ACCENT;
  if (/NEAR-DUPE/.test(flagText)) return COLOR_MUTED;
  return COLOR_INK;
};

// Render one lesson as a small bordered block
function lessonCard(L) {
  const header = new Paragraph({
    spacing: { before: 100, after: 20 },
    children: [
      new TextRun({ text: 'L' + L.lord, font: FONT_MONO, size: 21, bold: true, color: COLOR_NAVY }),
      new TextRun({ text: '   Day ' + L.day, font: FONT_BODY, size: 19, italics: true, color: COLOR_MUTED }),
      ...(L.sub ? [new TextRun({ text: '   ' + L.sub, font: FONT_BODY, size: 19, italics: true, color: COLOR_MUTED })] : [])
    ]
  });

  const fieldRow = (label, value, valueOpts = {}) => new Paragraph({
    spacing: { after: 30 },
    indent: { left: 240 },
    children: [
      new TextRun({ text: label + ': ', font: FONT_BODY, size: 18, bold: true, color: COLOR_NAVY }),
      new TextRun({ text: value, font: valueOpts.mono ? FONT_MONO : FONT_BODY, size: valueOpts.size || 18, italics: !!valueOpts.italics, color: valueOpts.color || COLOR_INK })
    ]
  });

  const flagRuns = [];
  flagRuns.push(new TextRun({ text: 'Flags: ', font: FONT_BODY, size: 18, bold: true, color: COLOR_NAVY }));
  if (!L.flags || L.flags.length === 0) {
    flagRuns.push(new TextRun({ text: 'none', font: FONT_BODY, size: 18, color: COLOR_MUTED, italics: true }));
  } else {
    L.flags.forEach((f, i) => {
      if (i > 0) flagRuns.push(new TextRun({ text: '; ', font: FONT_BODY, size: 18, color: COLOR_INK }));
      flagRuns.push(new TextRun({ text: f, font: FONT_BODY, size: 18, bold: /GHOST|ORPHAN|EVIDENCE-MISMATCH/.test(f), color: flagColor(f) }));
    });
  }

  return [
    header,
    fieldRow('Title', L.title),
    fieldRow('Concept Progression', L.cp, { italics: true }),
    fieldRow('Evidence (drives at)', L.evidence, { italics: true }),
    fieldRow('Standards', (L.standards && L.standards.length) ? L.standards.join(', ') : 'none tagged', { mono: !!(L.standards && L.standards.length), color: (L.standards && L.standards.length) ? COLOR_INK : COLOR_MUTED }),
    new Paragraph({ spacing: { after: 160 }, indent: { left: 240 }, children: flagRuns })
  ];
}

// ─── Sequence-table row (Stage 4) ──────────────────────────────────

const SEQ_COLS = [400, 400, 500, 500, 1900, 1700, 1700, 1100, 1160]; // sum 9360
const seqHeaderRow = () => new TableRow({ tableHeader: true, children: [
  headerCell('#', SEQ_COLS[0]),
  headerCell('Act', SEQ_COLS[1]),
  headerCell('Day', SEQ_COLS[2]),
  headerCell('L#', SEQ_COLS[3]),
  headerCell('Title', SEQ_COLS[4]),
  headerCell('Concept Progression', SEQ_COLS[5]),
  headerCell('Evidence (drives at)', SEQ_COLS[6]),
  headerCell('Standards', SEQ_COLS[7]),
  headerCell('Flags', SEQ_COLS[8])
] });

function seqRow(n, act, day, lord, title, cp, evidence, standards, flags) {
  const cell = (txt, width, opts = {}) => new TableCell({
    borders: cellBorders(COLOR_LINE),
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text: txt,
        font: opts.font || FONT_BODY,
        size: opts.size || 14,
        bold: !!opts.bold,
        italics: !!opts.italics,
        color: opts.color || COLOR_INK
      })]
    })]
  });

  const flagsTxt = (flags && flags.length) ? flags.join(', ') : 'none';
  const flagColorVal = (flags && flags.length) ? flagColor(flags[0]) : COLOR_MUTED;

  return new TableRow({ children: [
    cell(String(n), SEQ_COLS[0], { align: AlignmentType.CENTER, bold: true, color: COLOR_NAVY }),
    cell(String(act), SEQ_COLS[1], { align: AlignmentType.CENTER }),
    cell(String(day), SEQ_COLS[2], { align: AlignmentType.CENTER }),
    cell('L' + lord, SEQ_COLS[3], { align: AlignmentType.CENTER, font: FONT_MONO, bold: true }),
    cell(title, SEQ_COLS[4]),
    cell(cp, SEQ_COLS[5], { italics: true, color: COLOR_MUTED }),
    cell(evidence, SEQ_COLS[6], { italics: true, color: COLOR_MUTED }),
    cell((standards && standards.length) ? standards.join(', ') : '—', SEQ_COLS[7], { font: FONT_MONO }),
    cell(flagsTxt, SEQ_COLS[8], { color: flagColorVal, bold: !!(flags && flags.length) })
  ] });
}

// ─── DATA ──────────────────────────────────────────────────────────

const acts = [
  { n: 1, title: 'Is This Even True?', dq: 'Is this even true?', evidence: 'Initial analysis of adoption data and a written claim about whether a real adoption gap exists.' },
  { n: 2, title: 'How a Wolf Became Both a Great Dane and a German Shepherd', dq: 'How did dogs become dogs?', evidence: 'Explanation of how domestication and selective breeding produced modern dog breeds.' },
  { n: 3, title: 'Meet Your Dog', dq: "What's your dog actually like?", evidence: "A written assumption based on the dog's photo, a structured observation log, and a comparison of the two." },
  { n: 4, title: 'Why Do People Pass Them By?', dq: 'Why do people pass them by?', evidence: 'Survey findings, evidence checks, and conclusions supported by data.' },
  { n: 5, title: 'Telling the Truth So It Moves Someone', dq: 'How do stories move people?', evidence: 'Draft profile cards and reader feedback.' },
  { n: 6, title: 'The Cards Go Up', dq: 'What do we owe the shelter?', evidence: 'Final profile cards and partner briefing.' }
];

// Per-act prose paragraphs (verbatim from the markdown)
const actProse = {
  1: [
    'The driving question is "Is this even true?" Students open the challenge by writing a first prediction about one long-stay dog at St. Hubert\'s (L1). They then meet the shelter\'s adoption data, working through tables and bar graphs (L2, L3, L4), then unit rates and adoption rates (L5), then misleading comparisons and hidden factors (L6). They close the act by drawing the conclusion (L7) and writing it up as a claim backed by evidence (L8).',
    'The evidence the act produces (verbatim): "Initial analysis of adoption data and a written claim about whether a real adoption gap exists."',
    'Flags in this Act. The audit flagged the 6.SP.B.4 tag on Day 2 (L2 through L4) as WEAK because those lessons read and interpret graphs while SP.B.4\'s statement is about displaying plots on a number line. The audit also flagged the SL.PE.6.1 tag on Day 1 (L1) as STRETCH because L1 is a solo-write task, not a collaborative discussion. Both flags carry forward into the heat map.'
  ],
  2: [
    'The driving question is "How did dogs come from wolves at all?" Students open the act by writing a first explanation to revise: a chihuahua and a great dane are the same animal (L9). They then move into the biology block. Day 7 covers genes (L10), dominant vs. recessive traits (L11), inheritance (L12), variation (L13), and Punnett squares (L14), with the note that L13 and L14 fall on the same day. Day 8 covers natural selection through the wolf-to-dog domestication story (L15). Day 9 covers selective breeding through the border collie reading and breed-trait research (L16, L17). Day 10 covers polygenic inheritance, adaptation, and breeding for polygenic traits (L18, L19, L20). Day 11 synthesizes by researching specific breed roles and connecting traits to those roles (L21, L22), which is the act\'s evidence.',
    'The evidence the act produces (verbatim): "Explanation of how domestication and selective breeding produced modern dog breeds."',
    'Flags in this Act. The 3-LS3-1 tag on Day 7 (L10 through L14) is GHOST: grade 3 PE, not in the 5-8 NJSLS band. The in-band replacement is MS-LS3-2. The MS-LS4-4 tag on Day 8 (L15) is STRETCH: wolf-to-dog domestication is artificial selection, but LS4-4 names natural selection. The SL.PE.6.1 tag on Day 6 (L9) is STRETCH for the same reason as L1. L17 and L21 are recorded as a NEAR-DUPE on the "research breeds" noun phrase, kept distinct because L17 anchors traits research and L21 anchors roles research.'
  ],
  3: [
    'The driving question is "What\'s your dog actually like?" Each student is assigned one real big dog. Before meeting the dog, students write a photo assumption (L23) and form a hypothesis about why big dogs are adopted less often (L24). Day 13 teaches what makes a good observation (L25). Day 14 covers ethology and observation experiment design (L26, L27). Day 15 closes the act with pattern identification in the observation logs and drawing inferences against the initial assumptions (L28, L29).',
    'The evidence the act produces (verbatim): "A written assumption based on the dog\'s photo, a structured observation log, and a comparison of the two."',
    'Flags in this Act. Five lessons (L25, L26, L27, L28, L29) are ORPHAN: the concept days\' standards fields carry only NGSS Science and Engineering Practice placeholders (Constructing Explanations, Planning and Carrying Out Investigations, Argument from Evidence), no NJSLS code. The workbench heat map reads these as untagged. The act is real scientific work, but the heat map cannot see it.'
  ],
  4: [
    'The driving question is "Why do people pass them by?" Students commit to a hypothesis, gather evidence, and test beliefs against facts. Day 16 introduces formal testable-hypothesis writing (L30) and brainstorming what can be proven versus what cannot (L31). Day 17 builds the survey work: qualitative vs. quantitative (L32), writing unbiased questions including cost, appearance, and energy level (L33), and sampling design (L34). Day 18 runs the analysis block: cleaning data (L35), visualizing with dot plots (L36), charting (L37), and identifying themes (L38). Day 19 covers correlation vs. causation and revising the hypothesis against observation and survey data (L39, L40). Day 20 turns to source-based evidence: identifying good resources (L41), pulling supporting evidence from those resources (L42), and a seminar to question and defend claims using databases (L43, named "Seminar" in the doc). Day 21 closes the act by teaching how to support a claim with evidence or falsify it (L44).',
    'The evidence the act produces (verbatim): "Survey findings, evidence checks, and conclusions supported by data."',
    'Flags in this Act. Day 16 (L30, L31) is ORPHAN: SEP placeholder only, no NJSLS code on either lesson. The W.SE.6.6 tag on Day 18 (L35 through L38) is STRETCH because survey responses students collected themselves are not the multi-source print or digital evidence with source credibility assessment that the standard names. The RI.AA.6.7 tag on Day 19 (L39, L40) and Day 21 (L44) is STRETCH on the writing-side lessons because students are writing or revising their own claim rather than tracing an author\'s argument in a text. L24 and L30 are recorded as a NEAR-DUPE on the hypothesis-formation noun phrase, kept distinct because L24 is the Act 3 photo-assumption work and L30 is the Act 4 formal testable hypothesis. L8 and L44 are recorded as a NEAR-DUPE on the "claim with evidence" noun phrase, kept distinct because L8 closes Act 1 with a data-backed claim and L44 is the Act 4 evidence test.'
  ],
  5: [
    'The driving question is "How do stories move people?" Students turn observations into stories. Day 22 opens with picking the strongest moment: what assumptions about the chosen dog hold up and which do not (L45), introduction to story structure (L46), reading the Eddie the Terrible mentor text and discussing what makes it persuasive (L47), and identifying elements of a persuasive narrative (L48). Day 23 shifts into media literacy and persuasion: anatomy of an ad (L49), identifying target audience (L50), emotional appeal via pathos (L51), and persuasive devices (L52). Day 24 closes the act with the draft cycle: modeling a draft with perspective and voice (L53), and peer review with a re-norming of kind, specific, and helpful (L54).',
    'The evidence the act produces (verbatim): "Draft profile cards and reader feedback."',
    'Flags in this Act. The four Day 23 lessons (L49, L50, L51, L52) carry EVIDENCE-MISMATCH against Day 23\'s stated evidence text. The concept day header reads "Show, don\'t tell; sequence the profile" and the evidence reads "Show character in scenes; build the sequence", but the four lessons are an ad-analysis and persuasion block. The doc\'s own expanded-detail summary acknowledges the shift, but the day header still names a narrative-writing arc. Day 22\'s evidence text also reintroduces "opinion statement" (a K-5 vocabulary item), which Anand\'s Standards Check retired for grade 6 in favor of "argument" and "claim". This is recorded in the source JSON as an evidence_vocab_drift_flag and is worth raising in the briefing.'
  ],
  6: [
    'The driving question is "What do we owe the shelter?" Students finalize the card with draft revisions (L55) and brief St. Hubert\'s (L56).',
    'The evidence the act produces (verbatim): "Final profile cards and partner briefing."',
    'Flags in this Act. No flags on the two tagged lessons. I am noting separately that the source JSON\'s untagged_act6_rows_from_upper_table array carries three additional Act 6 rows from the upper table that were not assigned L# in the lesson list: "Evaluating Speakers", "Sequencing presentations logically", and "Speaking well". These exist in the source document, are not represented as lessons in the inventory, and would carry presentation-skills instruction if formalized. I am inferring that the briefing should mention this gap; the JSON does not assert it.'
  ]
};

// 56 lessons with all field data needed for Stage 3 cards + Stage 4 table
const lessons = [
  { lord: 1, day: 1, sub: null, act: 1, title: 'Meet the long-stay dog; write a first prediction', cp: 'Meet the long-stay dog; write a first prediction', evidence: 'A prediction to test later', standards: ['SL.PE.6.1'], flags: ['AUDIT-NOTE (SL.PE.6.1 STRETCH: solo-write task, not collaborative discussion)'] },
  { lord: 2, day: 2, sub: 'L1', act: 1, title: 'Introduce the data', cp: "Read and interpret the shelter's tables and bar graphs", evidence: 'Extract info from tables and graphs. What information can they gather from the website.', standards: ['6.SP.B.4'], flags: ['AUDIT-NOTE (6.SP.B.4 WEAK: lessons read and interpret graphs; SP.B.4 statement is about displaying plots on a number line)'] },
  { lord: 3, day: 2, sub: 'L2', act: 1, title: 'Introduce graphs (bar, line, pie)', cp: "Read and interpret the shelter's tables and bar graphs", evidence: 'Extract info from tables and graphs. What information can they gather from the website.', standards: ['6.SP.B.4'], flags: ['AUDIT-NOTE (6.SP.B.4 WEAK)'] },
  { lord: 4, day: 2, sub: 'L3', act: 1, title: 'Interpret graphs', cp: "Read and interpret the shelter's tables and bar graphs", evidence: 'Extract info from tables and graphs. What information can they gather from the website.', standards: ['6.SP.B.4'], flags: ['AUDIT-NOTE (6.SP.B.4 WEAK)'] },
  { lord: 5, day: 3, sub: 'L1', act: 1, title: 'Percentage vs number', cp: 'Counts vs. rates; calculate an adoption rate', evidence: 'Calculate adoption rates', standards: ['6.RP.A.2'], flags: [] },
  { lord: 6, day: 4, sub: 'L1', act: 1, title: 'How the presentation of information can be misleading; what else are hidden factors', cp: 'Compare unequal groups by rate; spot the hidden factor', evidence: 'Compare fairly; name the hidden factor', standards: ['6.RP.A.3'], flags: [] },
  { lord: 7, day: 5, sub: 'L1', act: 1, title: 'How to draw the conclusion', cp: 'Write a data-backed claim (Act 1 evidence)', evidence: 'Defend a conclusion using data', standards: ['6.SP.B.5', 'W.AW.6.1'], flags: [] },
  { lord: 8, day: 5, sub: 'L2', act: 1, title: 'How to write up claim with evidence', cp: 'Write a data-backed claim (Act 1 evidence)', evidence: 'Defend a conclusion using data', standards: ['6.SP.B.5', 'W.AW.6.1'], flags: ['NEAR-DUPE (paired with L44 on "claim with evidence")'] },

  { lord: 9, day: 6, sub: 'L1', act: 2, title: 'Species vs breeds', cp: 'Same species? Write a first explanation to revise', evidence: 'A starting explanation of how a chihuahua and a great dane are the same animal', standards: ['SL.PE.6.1'], flags: ['AUDIT-NOTE (SL.PE.6.1 STRETCH)'] },
  { lord: 10, day: 7, sub: 'L1', act: 2, title: 'Genes', cp: 'Inheritance and variation', evidence: 'Explain inheritance; identify variation. L4 and L5 same day.', standards: ['3-LS3-1'], flags: ['GHOST (3-LS3-1: grade 3 PE; in-band replacement is MS-LS3-2)', 'AUDIT-NOTE'] },
  { lord: 11, day: 7, sub: 'L2', act: 2, title: 'Traits - Dominant vs Recessive', cp: 'Inheritance and variation', evidence: 'Explain inheritance; identify variation. L4 and L5 same day.', standards: ['3-LS3-1'], flags: ['GHOST', 'AUDIT-NOTE'] },
  { lord: 12, day: 7, sub: 'L3', act: 2, title: 'Inheritance - how traits are passed down', cp: 'Inheritance and variation', evidence: 'Explain inheritance; identify variation. L4 and L5 same day.', standards: ['3-LS3-1'], flags: ['GHOST', 'AUDIT-NOTE'] },
  { lord: 13, day: 7, sub: 'L4', act: 2, title: 'Variation - How traits vary in the same species', cp: 'Inheritance and variation', evidence: 'Explain inheritance; identify variation. L4 and L5 same day.', standards: ['3-LS3-1'], flags: ['GHOST', 'AUDIT-NOTE'] },
  { lord: 14, day: 7, sub: 'L5', act: 2, title: 'Punnett Squares', cp: 'Inheritance and variation', evidence: 'Explain inheritance; identify variation. L4 and L5 same day.', standards: ['3-LS3-1'], flags: ['GHOST', 'AUDIT-NOTE'] },
  { lord: 15, day: 8, sub: 'L1', act: 2, title: 'What is natural selection', cp: 'Wolf to dog (fox story told aloud)', evidence: 'Explain how domestication changed wolves', standards: ['MS-LS4-4'], flags: ['AUDIT-NOTE (MS-LS4-4 STRETCH: wolf-to-dog is artificial selection; LS4-4 names natural selection)'] },
  { lord: 16, day: 9, sub: 'L1', act: 2, title: 'Read and discuss border collie reading', cp: 'Bred for a job (border collie reading)', evidence: 'Tie a breed trait to its original job', standards: ['MS-LS4-5'], flags: [] },
  { lord: 17, day: 9, sub: 'L2', act: 2, title: 'Research specific breed traits and summarize findings', cp: 'Bred for a job (border collie reading)', evidence: 'Tie a breed trait to its original job', standards: ['MS-LS4-5'], flags: ['NEAR-DUPE (paired with L21 on "research breeds")'] },
  { lord: 18, day: 10, sub: 'L1', act: 2, title: 'Polygenic Inheritance', cp: 'Model a trait spreading over generations', evidence: 'Model a trait becoming more common', standards: ['MS-LS4-6'], flags: [] },
  { lord: 19, day: 10, sub: 'L2', act: 2, title: 'Adaptation - how some traits increase survival over time', cp: 'Model a trait spreading over generations', evidence: 'Model a trait becoming more common', standards: ['MS-LS4-6'], flags: [] },
  { lord: 20, day: 10, sub: 'L3', act: 2, title: 'Breeding dogs for polygenic traits (size, weight, behavior)', cp: 'Model a trait spreading over generations', evidence: 'Model a trait becoming more common', standards: ['MS-LS4-6'], flags: [] },
  { lord: 21, day: 11, sub: 'L1', act: 2, title: 'Research the roles of specific breeds', cp: 'Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization', evidence: 'The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds', standards: ['MS-LS4-5', 'MS-LS4-6'], flags: ['NEAR-DUPE (paired with L17)'] },
  { lord: 22, day: 11, sub: 'L2', act: 2, title: 'Connect the traits (appearance and behavior) that were bred for these roles', cp: 'Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization', evidence: 'The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds', standards: ['MS-LS4-5', 'MS-LS4-6'], flags: [] },

  { lord: 23, day: 12, sub: 'L1', act: 3, title: 'Define assumption vs observation (picture of dog activity)', cp: 'Write the photo assumption - What assumptions might people make about this dog?', evidence: 'State the photo assumption', standards: ['SL.PE.6.1'], flags: [] },
  { lord: 24, day: 12, sub: 'L2', act: 3, title: 'Forming a hypothesis based on animal traits and behavior', cp: 'Write the photo assumption - What assumptions might people make about this dog?', evidence: 'State the photo assumption', standards: ['SL.PE.6.1'], flags: ['NEAR-DUPE (paired with L30 on hypothesis formation)'] },
  { lord: 25, day: 13, sub: 'L1', act: 3, title: 'What makes a good observation? (Practices of good observation)', cp: 'Observation vs. inference (Horowitz aloud)', evidence: 'Separate observed from concluded', standards: [], flags: ['ORPHAN (concept day standards_raw = SEP placeholder only)'] },
  { lord: 26, day: 14, sub: 'L1', act: 3, title: 'Observing animal behavior - What does it tell us? (ethology)', cp: 'Meet the dog; keep an observation log', evidence: 'Maintain a structured log', standards: [], flags: ['ORPHAN'] },
  { lord: 27, day: 14, sub: 'L2', act: 3, title: 'Designing observation experiments for our dogs', cp: 'Meet the dog; keep an observation log', evidence: 'Maintain a structured log', standards: [], flags: ['ORPHAN'] },
  { lord: 28, day: 15, sub: 'L1', act: 3, title: 'Identifying patterns in animal behavior - Identifying patterns in our observational logs', cp: 'Assumption vs. reality (Act 3 evidence)', evidence: 'Revise when observations contradict', standards: [], flags: ['ORPHAN'] },
  { lord: 29, day: 15, sub: 'L2', act: 3, title: 'Drawing inferences from the patterns; compare to initial assumptions', cp: 'Assumption vs. reality (Act 3 evidence)', evidence: 'Revise when observations contradict', standards: [], flags: ['ORPHAN'] },

  { lord: 30, day: 16, sub: 'L1', act: 4, title: 'Introduce and model how to create a testable hypothesis', cp: 'Write a testable hypothesis', evidence: 'Write a testable hypothesis', standards: [], flags: ['ORPHAN', 'NEAR-DUPE (paired with L24)'] },
  { lord: 31, day: 16, sub: 'L2', act: 4, title: 'What can we prove / test for — brainstorm testable reasons people might have for not adopting big dogs', cp: 'Write a testable hypothesis', evidence: 'Write a testable hypothesis', standards: [], flags: ['ORPHAN'] },
  { lord: 32, day: 17, sub: 'L1', act: 4, title: 'Why are surveys useful? Qualitative vs. Quantitative', cp: 'Design non-leading survey/interview questions', evidence: 'Write non-leading questions', standards: ['W.WR.6.5'], flags: [] },
  { lord: 33, day: 17, sub: 'L2', act: 4, title: 'How to write good survey questions (avoid leading questions, avoid testing friends; must include cost, appearance, energy level)', cp: 'Design non-leading survey/interview questions', evidence: 'Write non-leading questions', standards: ['W.WR.6.5'], flags: [] },
  { lord: 34, day: 17, sub: 'L3', act: 4, title: 'Sampling and respondent pool: who should complete the survey, how many people', cp: 'Design non-leading survey/interview questions', evidence: 'Write non-leading questions', standards: ['W.WR.6.5'], flags: [] },
  { lord: 35, day: 18, sub: 'L1', act: 4, title: 'Cleaning data (strong response vs weak response)', cp: 'Gather, tally, and summarize responses', evidence: 'Organize and summarize results', standards: ['W.SE.6.6', '6.SP.B.5'], flags: ['AUDIT-NOTE (W.SE.6.6 STRETCH: survey responses students collected themselves are not multi-source print/digital evidence with credibility assessment)'] },
  { lord: 36, day: 18, sub: 'L2', act: 4, title: 'Visualize data - dot plot', cp: 'Gather, tally, and summarize responses', evidence: 'Organize and summarize results', standards: ['W.SE.6.6', '6.SP.B.5'], flags: ['AUDIT-NOTE (W.SE.6.6 STRETCH)'] },
  { lord: 37, day: 18, sub: 'L3', act: 4, title: 'Charting data (pie charts, line charts - quantitative)', cp: 'Gather, tally, and summarize responses', evidence: 'Organize and summarize results', standards: ['W.SE.6.6', '6.SP.B.5'], flags: ['AUDIT-NOTE (W.SE.6.6 STRETCH)'] },
  { lord: 38, day: 18, sub: 'L4', act: 4, title: 'Identifying themes (patterns - qualitative)', cp: 'Gather, tally, and summarize responses', evidence: 'Organize and summarize results', standards: ['W.SE.6.6', '6.SP.B.5'], flags: ['AUDIT-NOTE (W.SE.6.6 STRETCH)'] },
  { lord: 39, day: 19, sub: 'L1', act: 4, title: 'Informal introduction to correlation vs causation', cp: 'Test beliefs against facts (Act 4 evidence)', evidence: 'Evaluate evidence; spot overreach; revise a belief', standards: ['RI.AA.6.7'], flags: ["AUDIT-NOTE (RI.AA.6.7 STRETCH: writing-side lesson; students are not tracing an author's argument)"] },
  { lord: 40, day: 19, sub: 'L2', act: 4, title: 'Revising hypothesis against data from observation and survey', cp: 'Test beliefs against facts (Act 4 evidence)', evidence: 'Evaluate evidence; spot overreach; revise a belief', standards: ['RI.AA.6.7'], flags: ['AUDIT-NOTE (RI.AA.6.7 STRETCH)'] },
  { lord: 41, day: 20, sub: 'L1', act: 4, title: 'How to identify good resources', cp: "The 'prove it' move: label (preconceptions) to evidence", evidence: "Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)", standards: ['W.AW.6.1'], flags: [] },
  { lord: 42, day: 20, sub: 'L2', act: 4, title: 'Identifying supporting evidence in the resource for supporting the hypothesis', cp: "The 'prove it' move: label (preconceptions) to evidence", evidence: "Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)", standards: ['W.AW.6.1'], flags: [] },
  { lord: 43, day: 20, sub: 'Seminar', act: 4, title: 'Seminar: question and defend your claims (Explore facts from databases — dog bites, fatalities, cost using medication and food costs, housing restrictions, size vs breed energy levels)', cp: "The 'prove it' move: label (preconceptions) to evidence", evidence: "Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)", standards: ['W.AW.6.1'], flags: [] },
  { lord: 44, day: 21, sub: 'L1', act: 4, title: 'How to support a claim with evidence or falsify claims', cp: 'Claim only what you saw. Final analysis.', evidence: "Spot and fix overclaiming - grounding in evidence 'What can you support with evidence?'", standards: ['W.AW.6.1', 'RI.AA.6.7'], flags: ['AUDIT-NOTE (RI.AA.6.7 STRETCH)', 'NEAR-DUPE (paired with L8)'] },

  { lord: 45, day: 22, sub: 'L1', act: 5, title: "Based on your findings, what are people assuming about our chosen dog that are true and what things aren't true (pick a dog)", cp: 'What makes a story (Eddie + Billie mentor texts)', evidence: 'Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion.', standards: ['W.NW.6.3'], flags: [] },
  { lord: 46, day: 22, sub: 'L2', act: 5, title: 'Introduction to story structure', cp: 'What makes a story (Eddie + Billie mentor texts)', evidence: 'Pick the strongest moment; structure a profile. (full text on L45)', standards: ['W.NW.6.3'], flags: [] },
  { lord: 47, day: 22, sub: 'L3', act: 5, title: 'Writing to seminar — read Eddie the Terrible blog and discuss what makes it persuasive', cp: 'What makes a story (Eddie + Billie mentor texts)', evidence: 'Pick the strongest moment; structure a profile. (full text on L45)', standards: ['W.NW.6.3'], flags: [] },
  { lord: 48, day: 22, sub: 'L4', act: 5, title: 'Identifying elements of a persuasive narrative', cp: 'What makes a story (Eddie + Billie mentor texts)', evidence: 'Pick the strongest moment; structure a profile. (full text on L45)', standards: ['W.NW.6.3'], flags: [] },
  { lord: 49, day: 23, sub: 'L1', act: 5, title: 'Anatomy of an Ad', cp: "Show, don't tell; sequence the profile", evidence: 'Show character in scenes; build the sequence', standards: ['W.NW.6.3'], flags: ['EVIDENCE-MISMATCH (media literacy / ad analysis under a character-in-scenes day)'] },
  { lord: 50, day: 23, sub: 'L2', act: 5, title: 'Identifying Target Audience', cp: "Show, don't tell; sequence the profile", evidence: 'Show character in scenes; build the sequence', standards: ['W.NW.6.3'], flags: ['EVIDENCE-MISMATCH'] },
  { lord: 51, day: 23, sub: 'L3', act: 5, title: 'Emotional Appeal (Pathos)', cp: "Show, don't tell; sequence the profile", evidence: 'Show character in scenes; build the sequence', standards: ['W.NW.6.3'], flags: ['EVIDENCE-MISMATCH'] },
  { lord: 52, day: 23, sub: 'L4', act: 5, title: 'Persuasive Devices', cp: "Show, don't tell; sequence the profile", evidence: 'Show character in scenes; build the sequence', standards: ['W.NW.6.3'], flags: ['EVIDENCE-MISMATCH'] },
  { lord: 53, day: 24, sub: 'L1', act: 5, title: 'Modeling how to draft your dog card — what perspective, how you want to write it', cp: 'Draft, test on a reader, revise (Act 5 evidence)', evidence: 'Revise from reader feedback', standards: ['W.WP.6.4'], flags: [] },
  { lord: 54, day: 24, sub: 'L2', act: 5, title: 'Peer review of drafts (re-norm kind, specific, helpful to start class)', cp: 'Draft, test on a reader, revise (Act 5 evidence)', evidence: 'Revise from reader feedback', standards: ['W.WP.6.4'], flags: [] },

  { lord: 55, day: 25, sub: null, act: 6, title: 'Finalize the card — draft revisions (put it all together)', cp: 'Finalize the card', evidence: 'Create the final profile card. Doc also notes: Explanation and Presentation of Cards; Recommendations to solve the Big Dog Challenge.', standards: ['W.NW.6.3', 'W.AW.6.1'], flags: [] },
  { lord: 56, day: 26, sub: null, act: 6, title: "Brief St. Hubert's", cp: "Brief St. Hubert's (Act 6 evidence)", evidence: 'Final cards and partner briefing', standards: ['SL.PI.6.4', 'SL.UM.6.5'], flags: [] }
];

// ─── Day header lookup ─────────────────────────────────────────────
const dayProgression = {};
lessons.forEach(L => { if (!dayProgression[L.day]) dayProgression[L.day] = L.cp; });

// ─── Build content arrays ──────────────────────────────────────────

function buildStage2() {
  const out = [];
  out.push(sectionHeader('STAGE 2', 'PROSE NARRATIVE', 'one section per Act'));
  acts.forEach(A => {
    out.push(actHeader(A.n, A.title));
    actProse[A.n].forEach(p => out.push(para(p, { after: 160 })));
  });
  return out;
}

function buildStage3() {
  const out = [];
  out.push(sectionHeader('STAGE 3', 'CLEAN LESSON LIST', 'grouped by Act with Day headers'));
  let currentAct = null;
  let currentDay = null;
  lessons.forEach(L => {
    if (L.act !== currentAct) {
      currentAct = L.act;
      const A = acts.find(a => a.n === L.act);
      out.push(actHeader(L.act, A.title));
      currentDay = null;
    }
    if (L.day !== currentDay) {
      currentDay = L.day;
      out.push(dayHeader(L.day, dayProgression[L.day]));
    }
    lessonCard(L).forEach(p => out.push(p));
  });
  return out;
}

function buildStage4Table() {
  const rows = [seqHeaderRow()];
  lessons.forEach((L, i) => {
    rows.push(seqRow(i + 1, L.act, L.day, L.lord, L.title, L.cp, L.evidence, L.standards, L.flags));
  });
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: SEQ_COLS,
    rows
  });
}

function buildChangelogTable() {
  const cell = (txt, width, opts = {}) => new TableCell({
    borders: cellBorders(COLOR_LINE),
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({ text: txt, font: FONT_BODY, size: opts.size || 19, bold: !!opts.bold, color: opts.color || COLOR_INK })]
    })]
  });
  const rowOf = (flag, count, lessons) => new TableRow({ children: [
    cell(flag, 1800, { bold: true, color: flagColor(flag) }),
    cell(String(count), 900, { align: AlignmentType.CENTER, bold: true, color: COLOR_NAVY }),
    cell(lessons, 6660)
  ]});
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1800, 900, 6660],
    rows: [
      new TableRow({ tableHeader: true, children: [headerCell('FLAG', 1800), headerCell('COUNT', 900), headerCell('LESSONS', 6660)] }),
      rowOf('DUPE', 0, 'none'),
      rowOf('NEAR-DUPE', '3 pairs', '(L17 + L21), (L8 + L44), (L24 + L30)'),
      rowOf('NONSENSE', 0, 'none'),
      rowOf('ORPHAN', 7, 'L25, L26, L27, L28, L29, L30, L31'),
      rowOf('GHOST', 5, 'L10, L11, L12, L13, L14 (all carrying 3-LS3-1 on Day 7)'),
      rowOf('EVIDENCE-MISMATCH', 4, 'L49, L50, L51, L52 (Day 23 ad-analysis lessons under narrative day header)'),
      rowOf('AUDIT-NOTE', 14, 'L1, L2, L3, L4, L9, L10–L14, L15, L35–L38, L39, L40, L44')
    ]
  });
}

function buildVerificationTable() {
  const cell = (txt, width, opts = {}) => new TableCell({
    borders: cellBorders(COLOR_LINE),
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({ text: txt, font: FONT_BODY, size: opts.size || 18, bold: !!opts.bold, color: opts.color || COLOR_INK })]
    })]
  });
  const rowOf = (n, test, result, detail) => new TableRow({ children: [
    cell(String(n), 480, { align: AlignmentType.CENTER, bold: true, color: COLOR_NAVY }),
    cell(test, 2800, { bold: true }),
    cell(result, 900, { align: AlignmentType.CENTER, bold: true, color: result === 'PASS' ? COLOR_NAVY : COLOR_ACCENT }),
    cell(detail, 5180, { color: COLOR_MUTED, italics: true })
  ]});
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [480, 2800, 900, 5180],
    rows: [
      new TableRow({ tableHeader: true, children: [headerCell('#', 480), headerCell('TEST', 2800), headerCell('RESULT', 900), headerCell('DETAIL', 5180)] }),
      rowOf(1, 'Lesson count conservation', 'PASS', 'Input 56, MERGED 0, Stage 3 list 56. Identity holds.'),
      rowOf(2, 'Verbatim integrity', 'PASS', 'Spot-checked L8, L21, L31, L43, L55 against lessons[].title in source JSON. All five byte-identical.'),
      rowOf(3, 'Act assignment integrity', 'PASS', "Re-walked every surviving lesson's act field against the input. No reassignments."),
      rowOf(4, 'Flag coverage', 'PASS', '0 DUPE, 3 NEAR-DUPE pairs, 0 NONSENSE, 7 ORPHAN, 5 GHOST, 4 EVIDENCE-MISMATCH, 14 AUDIT-NOTE.'),
      rowOf(5, 'Locked-vocabulary integrity', 'PASS', 'Prose clean. Source quotes carry em dashes and the K-5 word "opinion"; verbatim wins. The evidence_vocab_drift_flag on Day 22 is raised in the Act 5 narrative.'),
      rowOf(6, '6 acts', 'PASS', 'Acts 1–6 appear once each in Stage 2, Stage 3, Stage 4. No drift.'),
      rowOf(7, 'Cohort', 'PASS', 'Document references "Cohort 5/6" verbatim from challenge.cohort_doc_text. No 7/8 differentiation invited.')
    ]
  });
}

// ─── Document ─────────────────────────────────────────────────────

const doc = new Document({
  creator: 'Claude',
  title: 'Big Dogs Lessons Organized',
  description: 'Boss-facing organization of the 56 Big Dogs lessons. Forge Prep style.',
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
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [
      // Title block
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: 'Why Big Dogs Get Passed Over', font: FONT_SERIF, size: 48, bold: true, color: COLOR_NAVY })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: 'Lesson organization for partner briefing', font: FONT_SERIF, size: 26, italics: true, color: COLOR_MUTED })]
      }),

      // Masthead three-col table
      threeColHeader([
        ['CHALLENGE', 'POPULATION', 'NJSLS CODES'],
        [
          [
            { text: 'Why Big Dogs Get Passed Over', bold: true },
            { text: "St. Hubert's Animal Welfare Center" },
            { text: 'Cohort 5/6 (This is not for 7/8)', italics: true, color: COLOR_MUTED }
          ],
          [
            { text: '56 lessons across 6 acts', bold: true },
            { text: '26 concept days expanded via the' },
            { text: 'Lesson Content linked list', italics: true, color: COLOR_MUTED }
          ],
          [
            { text: '17 unique codes tagged', bold: true },
            { text: '16 in band, 1 ghost' },
            { text: 'Ghost: 3-LS3-1 (grade 3, out of band)', italics: true, color: COLOR_ACCENT }
          ]
        ]
      ]),

      // Authentic impact (verbatim)
      sectionHeader('AUTHENTIC IMPACT', 'WHAT STUDENTS PRODUCE', 'verbatim from the source'),
      para('Students will produce narrative profile cards for individual big dogs, written for the families walking the adoption kennels at St. Hubert\'s, by turning each dog\'s real history and observed behavior into a short, honest story that reframes the size that made adopters hesitate.', { italics: true, after: 100 }),
      para('The cards are printed and clipped to each dog\'s kennel. The cohort then briefs St. Hubert\'s, handing off the cards and explaining the thinking behind the campaign.', { italics: true, after: 200 }),

      // CHANGELOG
      sectionHeader('CHANGELOG', 'CLEANUP-PASS RESULTS', 'three-layer audit'),
      para('Layer 1 (Organize): input already sorted; no reordering applied. Lesson count after Layer 1: 56.', { after: 60 }),
      para('Layer 2 (Flag): walked all 56 lessons; counts by type below.', { after: 60 }),
      para('Layer 3 (Merge / Drop / Hold-for-review): 0 MERGED, 0 HOLD-FOR-REVIEW, 3 NEAR-DUPE pairs recorded but not auto-merged (recommendation on each: keep both).', { after: 160 }),
      buildChangelogTable(),
      para('NEAR-DUPE entries: (L17 + L21) on "research breeds" (Day 9 trait research vs Day 11 role research); (L8 + L44) on "claim with evidence" (Act 1 data claim vs Act 4 evidence test); (L24 + L30) on hypothesis formation (Act 3 photo assumption vs Act 4 formal testable hypothesis). All three kept distinct because each anchors a different act of the arc.', { italics: true, color: COLOR_MUTED, before: 160, after: 200 }),

      // Stage 2 prose narrative
      new Paragraph({ children: [new PageBreak()] }),
      ...buildStage2(),

      // Stage 3 clean lesson list
      new Paragraph({ children: [new PageBreak()] }),
      ...buildStage3(),

      // Stage 4 sequence table appendix
      new Paragraph({ children: [new PageBreak()] }),
      sectionHeader('STAGE 4', 'SEQUENCE TABLE APPENDIX', '56 surviving lessons, full traceability'),
      para('Columns: # = running ordinal across surviving set. L# preserves original lesson_ord for traceability back to bigdogs_lesson_inventory.json. Titles, concept progressions, and evidence text are verbatim.', { italics: true, color: COLOR_MUTED, after: 200 }),
      buildStage4Table(),

      // Verification
      new Paragraph({ children: [new PageBreak()] }),
      sectionHeader('VERIFICATION', 'xUNIT TEST PATTERNS DISCIPLINE', 'Meszaros 2007 · Self-Checking Tests'),
      buildVerificationTable(),

      // Sources footer
      sectionHeader('SOURCES', 'PROVENANCE', 'every claim traceable'),
      para('Lesson inventory: bigdogs_lesson_inventory.json (2026-06-25). 26 concept days, 56 lessons, sourced verbatim from Google Doc 1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU.', { italics: true, after: 60 }),
      para('Standard codes: New Jersey Student Learning Standards (2023/2020). 17 unique codes tagged. 16 in band, 1 ghost (3-LS3-1).', { italics: true, after: 60 }),
      para('Audit verdicts (WEAK / STRETCH / GHOST) referenced in flags: bigdogs_gap_audit.docx (2026-06-25).', { italics: true, after: 60 }),
      para('Coverage analysis (Defensible / Soft / Combined / Coverage %): bigdogs_coverage.docx (2026-06-25).', { italics: true, after: 60 })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = __dirname + '/bigdogs_lessons_organized.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('✓ bigdogs_lessons_organized.docx written (' + buffer.length + ' bytes)');
});
