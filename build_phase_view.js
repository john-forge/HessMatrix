const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType,
        LevelFormat, HeadingLevel, BorderStyle, PageNumber } = require('docx');
const fs = require('fs');
const path = require('path');

const ORANGE = "c2410c";
const NAVY = "1f2937";
const INK = "222222";
const MUTED = "595959";
const SEAFOAM = "3a6b65";

function plain(text, runOpts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, color: INK, ...runOpts })],
    spacing: { after: 120 }
  });
}
function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: INK, ...opts })],
    spacing: { after: 40 }
  });
}
function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 34, color: NAVY, bold: true })],
    spacing: { before: 400, after: 180 },
    heading: HeadingLevel.HEADING_1,
  });
}
function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 26, color: NAVY, bold: true })],
    spacing: { before: 280, after: 120 },
    heading: HeadingLevel.HEADING_2,
  });
}
function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 22, color: ORANGE, bold: true })],
    spacing: { before: 180, after: 80 },
    heading: HeadingLevel.HEADING_3,
  });
}
function h4(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 20, color: SEAFOAM, bold: true })],
    spacing: { before: 100, after: 50 },
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
function phaseHeader(label, verb, mode, anchor) {
  return [
    new Paragraph({
      children: [new TextRun({ text: label, font: "Calibri", size: 34, color: NAVY, bold: true })],
      spacing: { before: 400, after: 60 },
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Phase verb: ", font: "Calibri", size: 20, color: MUTED, bold: true }),
        new TextRun({ text: verb + ".  ", font: "Calibri", size: 20, color: INK }),
        new TextRun({ text: "Mode: ", font: "Calibri", size: 20, color: MUTED, bold: true }),
        new TextRun({ text: mode + ".  ", font: "Calibri", size: 20, color: INK }),
        new TextRun({ text: "Anchor: ", font: "Calibri", size: 20, color: MUTED, bold: true }),
        new TextRun({ text: anchor + ".", font: "Calibri", size: 20, color: INK })
      ],
      spacing: { after: 200 }
    })
  ];
}

const children = [];
children.push(masthead());
children.push(title("Forge Challenge — Phase View"));
children.push(subtitle("Curriculum design template organized by Preparation, Transition, Exploration, Presentation"));
children.push(rule());

children.push(plain("Three durable skills the challenge teaches: Genetics, Critical evaluation of a claim, Persuasion. Four phases divide the 8 weeks. Standards anchors carry through unchanged from the source template."));
children.push(plain("Each objective's phase placement is an inference based on the texture work. Mark anything you would move."));

// ESSENTIAL QUESTIONS
children.push(h1("Essential Questions (cross-cutting)"));
children.push(plain("These hold across all four phases."));
[
  "Genetics: How much of an organism's behavior is shaped by heredity, and how much is shaped by environment?",
  "Critical evaluation: How do you distinguish an evidence-supported claim from an inherited assumption?",
  "Persuasion: What conditions allow evidence to change a reader's position?",
  "Equity question: When does a measurable difference become an injustice?"
].forEach(b => children.push(bullet(b)));

// PHASE 1
phaseHeader("Phase 1 — Preparation (Weeks 1–2)", "Define", "explicit instruction", "content delivery, not yet the team-selected case").forEach(p => children.push(p));

children.push(h3("What students learn in this phase"));
[
  "Heredity, wolves-to-dogs evolutionary arc, domestication, animal husbandry",
  "Punnett square mechanics",
  "Claim, counterclaim, reasoning, evidence (the argument frame)",
  "Relevant vs irrelevant evidence",
  "Unit rates, ratios, proportional reasoning",
  "Partner institutions and their role in communities"
].forEach(b => children.push(bullet(b)));

children.push(h3("Genetics"));
children.push(h4("Juniors (G5/G6)"));
[
  "Distinguish a heritable trait from a learned behavior in a domesticated organism (MS-LS3-1, out-of-file)",
  "Define selective breeding and give two examples from the documented history of a domesticated species (MS-LS4-5, out-of-file)",
  "Apply a Punnett square to predict the inheritance of a single trait across one generation (MS-LS3-2, out-of-file)"
].forEach(b => children.push(bullet(b)));
children.push(h4("Seniors (G7/G8)"));
[
  "Apply a Punnett square to predict the probability that a specific trait will appear across multiple offspring (MS-LS3-2 out-of-file, 7.SP.C.7 in-file)",
  "Explain how artificial selection shifts trait frequency across a population over generations (MS-LS4-5, out-of-file)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Critical evaluation of a claim"));
children.push(h4("Juniors (G5/G6)"));
[
  "Distinguish evidence relevant to a claim from evidence irrelevant to it (RI.AA.6.7, W.AW.6.1)",
  "Distinguish a claim supported by reasons and evidence from a claim that is not (RI.AA.6.7)",
  "Identify the opposing claim a strong argument must answer (RI.AA.6.7)"
].forEach(b => children.push(bullet(b)));
children.push(h4("Seniors (G7/G8)"));
[
  "Evaluate an argument and assess whether the reasoning is sound and the evidence is relevant and sufficient (RI.AA.7.7, RI.AA.8.7)",
  "Recognize when irrelevant evidence is introduced into an argument (RI.AA.8.7)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Math spine"));
children.push(h4("Juniors (G5/G6)"));
children.push(bullet("Calculate the unit rates of two comparable quantities from primary-source data (6.RP.A.2)"));
children.push(h4("Seniors (G7/G8)"));
children.push(bullet("Calculate the gap between two comparable quantities as a unit rate and as a percentage difference (7.RP.A.3)"));

// PHASE 2
phaseHeader("Phase 2 — Transition (Week 3)", "Define → Interrogate (the pivot)", "explicit instruction begins to bend toward applied", "the team-selected case becomes a periodic reference, not yet central").forEach(p => children.push(p));

children.push(h3("What changes in this phase"));
[
  "The Preparation content gets applied to specific cases",
  "The team's chosen case shows up as illustrative material",
  "The first applied work begins",
  "Bias seminar fires here (Seniors)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Genetics"));
children.push(h4("Juniors (G5/G6)"));
children.push(bullet("Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves humans used (MS-LS4-5, out-of-file)"));
children.push(h4("Seniors (G7/G8)"));
[
  "Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves and the approximate generational timeline (MS-LS4-5, out-of-file)",
  "Use a documented selective-breeding case study to argue that domestication is itself a heritable trait set (MS-LS4-5, out-of-file)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Critical evaluation of a claim"));
children.push(h4("Seniors (G7/G8)"));
children.push(bullet("Deconstruct a speaker's argument and evaluate whether the reasoning is sound (SL.ES.7.3, SL.ES.8.3) — load-bearing in the bias seminar"));

children.push(h3("Math spine"));
children.push(h4("Juniors (G5/G6)"));
children.push(bullet("Calculate a per-category rate as a unit rate (6.RP.A.2)"));

// PHASE 3
phaseHeader("Phase 3 — Exploration (Weeks 4–6)", "Interrogate", "applied investigation through the team-selected case anchor", "the team's chosen case is the central object; everything routes through it").forEach(p => children.push(p));

children.push(plain("The most cognitively demanding phase. By end of Phase 3 each team has a defensible diagnosis of the disparity grounded in primary-source data, plus a persuasive argument drafted for a named audience."));

children.push(h3("Genetics"));
children.push(plain("Genetics work in this phase is retrieve-only. The Preparation/Transition genetics work appears in how the team understands their chosen case (breed traits, working history). No new genetics objectives fire here for either cohort."));

children.push(h3("Critical evaluation of a claim"));
children.push(h4("Juniors (G5/G6)"));
[
  "Calculate the unit cost of two comparable consumer categories and identify which is higher (6.RP.A.2)",
  "Determine whether a stated stakeholder concern is evidence-supported or bias-driven, using partner-supplied data as the check (RI.CR.6.1, 6.RP.A.3)"
].forEach(b => children.push(bullet(b)));
children.push(h4("Seniors (G7/G8)"));
[
  "Calculate the lifetime cost of two comparable consumer categories using proportional reasoning and identify which is higher (7.RP.A.2, 7.RP.A.3)",
  "Distinguish a legitimate stakeholder objection from stigma by analyzing per-instance and per-category primary-source data (7.SP.A.2, RI.CR.7.1)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Persuasion"));
children.push(h4("Juniors (G5/G6)"));
[
  "Compose a complete written argument for a specific course of action, addressing one named audience member, with claim, counterclaim, reasoning, and evidence (W.AW.6.1)",
  "Deliver an oral pitch to a named audience member proposing a specific course of action (SL.PI.6.4)",
  "Rewrite a generic listing for a specific target-audience profile (W.IW.6.2, W.WP.6.4)"
].forEach(b => children.push(bullet(b)));
children.push(h4("Seniors (G7/G8)"));
[
  "Compose a complete written argument for a specific course of action with claim, counterclaim, reasoning, and evidence, anticipating and answering the strongest opposing position (W.AW.7.1, W.AW.8.1)",
  "Adapt the same persuasive argument across three channels and explain why each adaptation fits its channel (W.AW.8.1, W.WP.8.4)",
  "Test the effectiveness of two persuasive variants using A/B response rates and proportional reasoning (7.RP.A.3, 7.SP.A.2)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Math spine"));
children.push(h4("Juniors (G5/G6)"));
[
  "Calculate a single case's value and compare it to the category average (6.SP.B.5)",
  "Calculate the response rate for each A/B test variant (6.RP.A.3)"
].forEach(b => children.push(bullet(b)));
children.push(h4("Seniors (G7/G8)"));
[
  "Calculate the median, range, and interquartile range of values across a team's selected sample (7.SP.B.4)",
  "Determine whether the difference between A/B response rates is a real effect or sample noise (7.SP.A.2)",
  "Project additional monthly outcomes at varying lift rates (7.RP.A.2)"
].forEach(b => children.push(bullet(b)));

// PHASE 4
phaseHeader("Phase 4 — Presentation (Weeks 7–8)", "Build / Act", "partner-facing deliverable + individual transfer assessment", "the campaign and the per-student oral defense").forEach(p => children.push(p));

children.push(h3("What students deliver in this phase"));
[
  "Team campaign (assets, brand, channel-specific adaptations, pitch to the partner)",
  "Individual oral defense on a case the student has not researched (Cold Transfer Task)",
  "Optional partner-facing event (drive, education campaign, operational audit recommendation)"
].forEach(b => children.push(bullet(b)));

children.push(h3("Persuasion"));
children.push(h4("Juniors (G5/G6)"));
children.push(bullet("Present claims and findings to an audience, sequencing ideas logically using facts and details (SL.PI.6.4)"));
children.push(h4("Seniors (G7/G8)"));
children.push(bullet("Present claims and findings, emphasizing salient points with relevant evidence, sound reasoning, and well-chosen details (SL.PI.8.4)"));

children.push(h3("Math spine"));
children.push(h4("Juniors (G5/G6)"));
children.push(bullet("Apply a calculation from the analysis phase to defend a recommendation in the individual transfer assessment (6.SP.B.5 applied)"));
children.push(h4("Seniors (G7/G8)"));
children.push(bullet("Apply a per-instance calculation to defend a recommendation in the individual transfer assessment (7.RP.A.3 applied)"));

children.push(h3("Critical evaluation of a claim (closer)"));
children.push(plain("All four critical-evaluation objectives from earlier phases get tested in the individual oral defense (Cold Transfer Task). The student must apply them to a case they have not researched."));

// PREREQUISITES
children.push(h1("Prerequisites (pre-Day 1, not phase-tagged)"));
children.push(plain("What students walk in with. Carries forward unchanged from the source template:"));
[
  "5th-grade math floor for Juniors, 6th-grade math floor for Seniors",
  "ELA prerequisites per cohort (W.AW.5.1, RI.CR, RI.AA, SL.PI, W.SE etc.)",
  "Science prerequisites per cohort (life-science vocabulary, parent-offspring transmission)",
  "Cognitive and academic prerequisites (team work, sustained writing, multi-step task following)",
  "Domain prerequisites (partner-institution familiarity, partner-domain vocabulary)"
].forEach(b => children.push(bullet(b)));

// FLAGS
children.push(rule());
children.push(h1("Three flags worth knowing about the phase placements"));
children.push(plain("The Critical-evaluation Juniors objectives all sit in Preparation. That makes Preparation heavy for Juniors and leaves Transition thin (only one objective). May want to move \"Identify the opposing claim\" to Transition for Juniors so the bridge week has something to do."));
children.push(plain("The Genetics work essentially completes by end of Phase 2. Phase 3 carries no new Genetics objectives — it is retrieve-only. This is intentional (genetics is the science foundation, applied in narrative not in new science work), but worth confirming you want the genetics arc to close that early."));
children.push(plain("The Phase 4 critical-evaluation closer is implicit (CTT applies the earlier objectives to a novel case). No new objectives fire in Phase 4 for critical evaluation. If you want the CTT to require demonstrated competence on a specific Phase-4 objective, name it explicitly."));

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
      children: [new TextRun({ text: "Forge Challenge — Phase View", font: "Calibri", size: 18, color: MUTED })],
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
  fs.writeFileSync(path.join(__dirname, "forge_curriculum_phase_view_v1.docx"), buffer);
  console.log("Wrote forge_curriculum_phase_view_v1.docx");
});
