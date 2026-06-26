const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
        BorderStyle, WidthType, ShadingType, PageNumber } = require('docx');
const fs = require('fs');
const path = require('path');

const ORANGE = "c2410c";
const NAVY = "1f2937";
const INK = "222222";
const MUTED = "595959";

function plain(text, runOpts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, color: INK, ...runOpts })],
    spacing: { after: 120 }
  });
}
function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 32, color: NAVY, bold: true })],
    spacing: { before: 360, after: 180 },
    heading: HeadingLevel.HEADING_1,
  });
}
function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 24, color: ORANGE, bold: true })],
    spacing: { before: 240, after: 100 },
    heading: HeadingLevel.HEADING_2,
  });
}
function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: INK, ...opts })],
    spacing: { after: 40 }
  });
}
function rule() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 1 } },
    spacing: { before: 60, after: 60 }
  });
}
function masthead() {
  return new Paragraph({
    children: [new TextRun({ text: "FORGE PREP LIVINGSTON, NEW JERSEY  ·  FOUNDING YEAR 2026 – 2027", font: "Calibri", size: 18, color: ORANGE, bold: true })],
    spacing: { after: 60 }
  });
}
function title(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 40, color: NAVY, bold: true })],
    spacing: { before: 60, after: 60 }
  });
}
function subtitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, color: MUTED, italics: true })],
    spacing: { after: 240 }
  });
}
function note(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 20, color: MUTED, italics: true })],
    spacing: { after: 120 }
  });
}

// Two-column conversion table builder
function conversionTable(rows) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "e8e2d2" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const headerShading = { fill: "f7f1e1", type: ShadingType.CLEAR };
  const tableRows = [];

  // Header row
  tableRows.push(new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 4680, type: WidthType.DXA }, shading: headerShading,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: "Before (Big Dogs source)", font: "Calibri", size: 18, color: ORANGE, bold: true })] })]
      }),
      new TableCell({
        borders, width: { size: 4680, type: WidthType.DXA }, shading: headerShading,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: "After (clinical/transferable)", font: "Calibri", size: 18, color: ORANGE, bold: true })] })]
      })
    ]
  }));

  rows.forEach(row => {
    tableRows.push(new TableRow({
      children: [
        new TableCell({
          borders, width: { size: 4680, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: row.before, font: "Calibri", size: 20, color: INK })] })]
        }),
        new TableCell({
          borders, width: { size: 4680, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: row.after, font: "Calibri", size: 20, color: INK })] })]
        })
      ]
    }));
  });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    rows: tableRows
  });
}

function spacer() { return new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 200 } }); }

// CONVERSIONS
const children = [];

children.push(masthead());
children.push(title("Big Dogs → Clinical"));
children.push(subtitle("Translation map from challenge-specific language to transferable curriculum-design language"));
children.push(rule());

children.push(plain("This reference documents every conversion made when the Big-Dogs-specific learning-objectives document was rewritten as a transferable curriculum-design template. Every \"Before\" cell is a verbatim quote from the original Big Dogs document. Every \"After\" cell is the clinical/transferable equivalent that appears in the template. Standards anchors did not change in the translation."));

children.push(plain("Read this document in either direction. Left-to-right shows how to neutralize a challenge-specific document into a reusable template. Right-to-left shows how to anchor a generic template back onto a specific challenge."));

// FRAMING PARAGRAPH
children.push(h1("Header paragraph"));
children.push(conversionTable([
  {
    before: "Exploration (Weeks 4–6) is where students explore through their chosen dog. Presentation (Weeks 7–8) is the campaign delivery and the individual oral defense.",
    after: "Exploration (Weeks 4–6) is applied investigation through a team-selected case anchor. Presentation (Weeks 7–8) is the partner-facing deliverable and the individual transfer assessment."
  }
]));
children.push(spacer());

// ESSENTIAL QUESTIONS
children.push(h1("1. Essential Questions"));
children.push(conversionTable([
  {
    before: "Genetics: How much of a dog's behavior is bred for, and how much is shaped by experience?",
    after: "Genetics: How much of an organism's behavior is shaped by heredity, and how much is shaped by environment?"
  },
  {
    before: "Persuasion: What turns evidence into something that changes someone's mind?",
    after: "Persuasion: What conditions allow evidence to change a reader's position?"
  },
  {
    before: "Gap question: When does a real difference become unfair?",
    after: "Equity question: When does a measurable difference become an injustice?"
  }
]));
children.push(note("Critical evaluation EQ (\"How do you tell a real reason from a story you have been told?\") and the Day-1-hook scaffolding were retained without conversion because they were already domain-neutral."));
children.push(spacer());

// TOPICS
children.push(h1("2. Topics"));
children.push(conversionTable([
  { before: "Animal shelter role in communities", after: "Partner institutions and their role in communities" },
  { before: "Population control as a community issue (Seniors)", after: "Population-level community issues (Seniors)" },
  { before: "Breed-specific legislation", after: "Targeted legislation and its effects on a population" },
  { before: "Municipal residential restrictions", after: "Municipal restrictions and their effects on a population" },
  { before: "Shelter operational practices that may contribute to the gap", after: "Partner operational practices that may contribute to a documented disparity" },
  { before: "Audience profiling (the ideal big-dog adopter vs the NBD adopter)", after: "Audience profiling (primary target vs adjacent target)" },
  { before: "Tone adaptation across channels (in-shelter, social, board memo)", after: "Tone adaptation across channels (stakeholder-facing, broadcast, formal memo)" },
  { before: "Hypothesis formation from a partner's data", after: "Hypothesis formation from partner-supplied data" }
]));
children.push(spacer());

// LEARNING OBJECTIVES — GENETICS
children.push(h1("3. Learning Objectives — Genetics"));
children.push(h2("Juniors (G5/G6)"));
children.push(conversionTable([
  {
    before: "Trace one of the team's chosen dog's distinctive traits back to its wolf ancestor, naming the selective-breeding moves humans used",
    after: "Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves humans used"
  },
  {
    before: "Distinguish a heritable trait from a learned behavior in dogs",
    after: "Distinguish a heritable trait from a learned behavior in a domesticated organism"
  },
  {
    before: "Define selective breeding and give two examples from working-dog history",
    after: "Define selective breeding and give two examples from the documented history of a domesticated species"
  }
]));
children.push(h2("Seniors (G7/G8)"));
children.push(conversionTable([
  {
    before: "Trace one of the team's chosen dog's distinctive traits back to its wolf ancestor, naming the selective-breeding moves and approximate generational timeline",
    after: "Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves and the approximate generational timeline"
  },
  {
    before: "Use the Russian silver fox experiment to argue that domestication is itself a heritable trait set",
    after: "Use a documented selective-breeding case study to argue that domestication is itself a heritable trait set"
  }
]));
children.push(note("The Punnett-square objectives were retained without conversion because they were already domain-neutral."));
children.push(spacer());

// LEARNING OBJECTIVES — CRITICAL EVAL
children.push(h1("4. Learning Objectives — Critical evaluation of a claim"));
children.push(h2("Juniors (G5/G6)"));
children.push(conversionTable([
  {
    before: "Calculate the real annual cost of a big dog and compare it to the real annual cost of a small dog",
    after: "Calculate the unit cost of two comparable consumer categories and identify which is higher"
  },
  {
    before: "Decide whether a stated NBD adopter concern is evidence-based or bias-based, using shelter data as the check",
    after: "Determine whether a stated stakeholder concern is evidence-supported or bias-driven, using partner-supplied data as the check"
  }
]));
children.push(h2("Seniors (G7/G8)"));
children.push(conversionTable([
  {
    before: "Calculate the real lifetime cost of a big dog and compare it to the real lifetime cost of a small dog using proportional reasoning",
    after: "Calculate the lifetime cost of two comparable consumer categories using proportional reasoning and identify which is higher"
  },
  {
    before: "Separate a legitimate NBD adopter objection from stigma by analyzing per-dog and per-breed shelter data",
    after: "Distinguish a legitimate stakeholder objection from stigma by analyzing per-instance and per-category primary-source data"
  },
  {
    before: "Deconstruct a speaker's argument and evaluate whether the reasoning is sound (load-bearing in the bias seminar during transition)",
    after: "Deconstruct a speaker's argument and evaluate whether the reasoning is sound"
  }
]));
children.push(note("The \"load-bearing in the bias seminar during transition\" annotation was dropped, not converted. That parenthetical was a Big-Dogs-internal placement note and does not belong in a generic template."));
children.push(spacer());

// LEARNING OBJECTIVES — PERSUASION
children.push(h1("5. Learning Objectives — Persuasion"));
children.push(h2("Juniors (G5/G6)"));
children.push(conversionTable([
  {
    before: "Write a complete argument for adopting a specific big dog, addressing one named adopter, with claim, counterclaim, reasoning, and evidence",
    after: "Compose a complete written argument for a specific course of action, addressing one named audience member, with claim, counterclaim, reasoning, and evidence"
  },
  {
    before: "Orally pitch an NBD adopter on adopting a big dog",
    after: "Deliver an oral pitch to a named audience member proposing a specific course of action"
  },
  {
    before: "Rewrite a generic shelter listing for a specific NBD adopter profile",
    after: "Rewrite a generic listing for a specific target-audience profile"
  }
]));
children.push(h2("Seniors (G7/G8)"));
children.push(conversionTable([
  {
    before: "Write a complete argument for adopting a specific big dog with claim, counterclaim, reasoning, and evidence, anticipating and answering the strongest opposing position",
    after: "Compose a complete written argument for a specific course of action with claim, counterclaim, reasoning, and evidence, anticipating and answering the strongest opposing position"
  },
  {
    before: "Adapt the same persuasive argument for three channels (in-shelter, social, board memo) and explain why each adaptation fits its channel",
    after: "Adapt the same persuasive argument across three channels and explain why each adaptation fits its channel"
  },
  {
    before: "Present claims and findings, emphasizing salient points with relevant evidence, sound valid reasoning, and well-chosen details",
    after: "Present claims and findings, emphasizing salient points with relevant evidence, sound reasoning, and well-chosen details"
  }
]));
children.push(spacer());

// MATH SPINE
children.push(h1("6. Math spine"));
children.push(h2("Juniors (G5/G6)"));
children.push(conversionTable([
  { before: "Calculate the unit rates of days-to-adoption for big dogs and small dogs", after: "Calculate the unit rates of two comparable quantities from primary-source data" },
  { before: "Calculate the per-breed adoption rate as a unit rate", after: "Calculate a per-category rate as a unit rate" },
  { before: "Calculate the team's chosen dog's time-in-shelter and compare to the breed average", after: "Calculate a single case's value and compare it to the category average" },
  { before: "Use a calculation from Week 4 to defend an adoption recommendation in the oral exam", after: "Apply a calculation from the analysis phase to defend a recommendation in the individual transfer assessment" }
]));
children.push(h2("Seniors (G7/G8)"));
children.push(conversionTable([
  { before: "Calculate the big-dog adoption-time gap as a unit rate and percentage difference", after: "Calculate the gap between two comparable quantities as a unit rate and as a percentage difference" },
  { before: "Calculate the median, range, and IQR of time-in-shelter across the team's dogs", after: "Calculate the median, range, and interquartile range of values across a team's selected sample" },
  { before: "Project the additional monthly big-dog adoptions at various lift rates", after: "Project additional monthly outcomes at varying lift rates" },
  { before: "Use a per-dog calculation to defend an adoption recommendation", after: "Apply a per-instance calculation to defend a recommendation in the individual transfer assessment" }
]));
children.push(spacer());

// PREREQUISITES (Domain)
children.push(h1("7. Domain prerequisites"));
children.push(conversionTable([
  {
    before: "Familiarity with the concept of an animal shelter (most students will have this; the visit on Thursday of Week 1 backstops anything missing)",
    after: "Familiarity with the partner institution's domain of work; a structured partner visit early in the challenge backstops anything missing"
  },
  {
    before: "Basic dog vocabulary (breed, puppy, leash, adoption, foster)",
    after: "Basic vocabulary relevant to the partner's domain"
  },
  {
    before: "Most students walk in with some dog familiarity; the team will rely on the team member with the strongest familiarity as a peer resource",
    after: "Variation in incoming familiarity is expected; teams should be composed so each team has at least one student with strong domain familiarity as a peer resource"
  }
]));
children.push(spacer());

// PATTERNS SECTION
children.push(rule());
children.push(h1("Conversion patterns"));
children.push(plain("These are the general substitution rules that govern every conversion in the table above."));
[
  "\"big dog\" / \"small dog\" → \"two comparable consumer categories\" or \"two comparable quantities\"",
  "\"big-dog adoption-time gap\" → \"the gap between two comparable quantities\"",
  "\"NBD adopter\" → \"stakeholder\" or \"named audience member\"",
  "\"shelter data\" / \"St Hubert's data\" → \"partner-supplied data\" or \"primary-source data\"",
  "\"the team's chosen dog\" → \"a single case\" or \"the team-selected case anchor\"",
  "\"the breed\" / \"per-breed\" → \"the category\" / \"per-category\"",
  "\"days-to-adoption\" → \"comparable quantities from primary-source data\"",
  "\"a dog\" (as object of inheritance verbs) → \"a domesticated organism\"",
  "\"the wolf ancestor\" → \"the ancestral species\"",
  "\"Russian silver fox experiment\" → \"a documented selective-breeding case study\"",
  "\"working-dog history\" → \"the documented history of a domesticated species\"",
  "\"adoption recommendation\" / \"adoption campaign\" → \"a recommendation\" / \"a specific course of action\"",
  "\"animal shelter\" → \"partner institution\"",
  "\"in-shelter, social, board memo\" → \"stakeholder-facing, broadcast, formal memo\""
].forEach(p => children.push(bullet(p)));
children.push(spacer());

// WHAT WAS LOST
children.push(h1("What the conversion erased"));
children.push(plain("Two things the clinical version does not carry. Worth knowing if you use this template as a starting point for a new challenge."));
children.push(h2("The causal frame of the disparity"));
children.push(plain("The original objectives implicitly named WHY the gap matters: big dogs get passed over for adoption, a real outcome with real stakes for real animals. The clinical version says \"gap between two comparable quantities,\" which is true but abstract. When using this template for a new challenge, add a parenthetical or annotation reminding the user that \"comparable quantities\" should be a real disparity worth investigating, not a math exercise."));
children.push(h2("The partner anchor"));
children.push(plain("\"Shelter data\" and \"St Hubert's data\" became \"partner-supplied data\" or \"primary-source data.\" The original made it clear the data comes from an actual partner institution and that the partnership is load-bearing for the challenge. The clinical version reads as if data could come from any source. When using this template for a new challenge, mark partner-supplied as the default expectation; primary-source data from arms-length sources is a weaker substitute."));
children.push(spacer());

// USE INSTRUCTIONS
children.push(h1("How to use this document"));
children.push(plain("Going clinical → specific (right-to-left): when adapting the template to a new challenge, replace every clinical term in the After column with the equivalent specific term for that challenge. For example, a \"Recycling and Materials Recovery\" challenge would replace \"two comparable consumer categories\" with \"residential and commercial recycling streams\" and \"stakeholder\" with \"facility operator\" or \"municipal planner.\""));
children.push(plain("Going specific → clinical (left-to-right): when generalizing a finished challenge document into a reusable template, apply the substitution rules in the conversion patterns section. Run the document through the Claude-isms audit prompt after the translation to catch any drift the substitution rules missed."));

// BUILD
const doc = new Document({
  styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
  numbering: {
    config: [{ reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: { default: new Header({ children: [new Paragraph({
      children: [new TextRun({ text: "Big Dogs → Clinical Translation Map", font: "Calibri", size: 18, color: MUTED })],
      alignment: AlignmentType.RIGHT })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: "Forge Prep · Page ", font: "Calibri", size: 18, color: MUTED }),
        new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: MUTED })
      ] })] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(path.join(__dirname, "bigdogs_clinical_translations.docx"), buffer);
  console.log("Wrote bigdogs_clinical_translations.docx");
});
