const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType,
        LevelFormat, HeadingLevel, BorderStyle, PageNumber } = require('docx');
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
function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: INK, ...opts })],
    spacing: { after: 40 }
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
    children: [new TextRun({ text, font: "Calibri", size: 26, color: NAVY, bold: true })],
    spacing: { before: 240, after: 120 },
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
function rule() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ORANGE, space: 1 } },
    spacing: { before: 60, after: 60 }
  });
}
function masthead() {
  return new Paragraph({
    children: [new TextRun({ text: "FORGE PREP LIVINGSTON, NEW JERSEY  ·  FOUNDING YEAR 2026 – 2027", font: "Calibri", size: 18, color: ORANGE, bold: true })],
    spacing: { after: 60 },
    alignment: AlignmentType.LEFT
  });
}
function title(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 44, color: NAVY, bold: true })],
    spacing: { before: 60, after: 60 }
  });
}
function subtitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 24, color: MUTED, italics: true })],
    spacing: { after: 240 }
  });
}
function note(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Calibri", size: 20, color: MUTED, italics: true })],
    spacing: { after: 120 }
  });
}

const children = [];
children.push(masthead());
children.push(title("Forge Challenge — Curriculum Design Template"));
children.push(subtitle("Essential Questions, Topics, Learning Objectives, Prerequisites"));
children.push(rule());

children.push(plain("Three durable skills the challenge teaches: Genetics, Critical evaluation of a claim, Persuasion. The 8 weeks divide into four phases. Preparation (Weeks 1–2) is explicit instruction. Week 3 is the transition. Exploration (Weeks 4–6) is applied investigation through a team-selected case anchor. Presentation (Weeks 7–8) is the partner-facing deliverable and the individual transfer assessment."));

// 1. Essential Questions
children.push(h1("1. Essential Questions"));
children.push(plain("Per UbD Stage 1 doctrine (v2.9.15), 2 to 4 open, recurring, interpretive questions students grapple with across the 8 weeks. These constrain seminar tensions and the Day 1 hook."));
children.push(note("All four below are proposals. Pick or modify."));
children.push(bullet("Genetics: How much of an organism's behavior is shaped by heredity, and how much is shaped by environment?"));
children.push(bullet("Critical evaluation: How do you distinguish an evidence-supported claim from an inherited assumption?"));
children.push(bullet("Persuasion: What conditions allow evidence to change a reader's position?"));
children.push(bullet("Equity question: When does a measurable difference become an injustice?"));

// 2. Topics
children.push(h1("2. Topics"));
children.push(plain("The content units students engage with, organized by domain."));

children.push(h3("Biology and genetics"));
[
  "Heredity (heritable vs acquired traits)",
  "Domestication of animals",
  "Ancestral-species to modern-species evolutionary arc",
  "Trait specialization and selective breeding",
  "Animal husbandry",
  "Punnett squares for single-trait inheritance",
  "Punnett squares for probability across multiple offspring (Seniors)",
  "Selective breeding pressure and population shift (Seniors)",
  "A documented selective-breeding case study"
].forEach(b => children.push(bullet(b)));

children.push(h3("Mathematics"));
[
  "Unit rates and ratios",
  "Proportional reasoning",
  "Percentage difference",
  "Mean and range of a data set",
  "Interquartile range (Seniors)",
  "Sample size and inference from samples (Seniors)",
  "Reading a bar chart, dot plot, box plot",
  "A/B testing methodology",
  "Cost-per-response and per-channel cost analysis"
].forEach(b => children.push(bullet(b)));

children.push(h3("ELA — persuasion and critical evaluation"));
[
  "Claim, counterclaim, reasoning, evidence (the argument frame)",
  "Relevant vs irrelevant evidence",
  "Evidence that is sufficient vs insufficient (Seniors)",
  "Argument structure in written form",
  "Argument structure in oral form (deconstructing a speaker's argument)",
  "Audience analysis and stakeholder profiling",
  "Persuasive appeals",
  "Tone adaptation across channels (stakeholder-facing, broadcast, formal memo)",
  "Oral presentation with claim, evidence, call-to-action"
].forEach(b => children.push(bullet(b)));

children.push(h3("Social studies and civic context"));
[
  "Partner institutions and their role in communities",
  "Population-level community issues (Seniors)",
  "Targeted legislation and its effects on a population",
  "Municipal restrictions and their effects on a population",
  "Partner operational practices that may contribute to a documented disparity"
].forEach(b => children.push(bullet(b)));

children.push(h3("Marketing and communication"));
[
  "Marketing channels (owned, earned, paid, in-person)",
  "Audience profiling (primary target vs adjacent target)",
  "A/B testing as message testing",
  "Campaign branding (one look, one voice)",
  "Cost-per-response economics"
].forEach(b => children.push(bullet(b)));

children.push(h3("Cognitive and meta-skills"));
[
  "Hypothesis formation from partner-supplied data",
  "Bias recognition and naming",
  "Critical evaluation of one's own starting assumptions",
  "Distinguishing assumption, opinion, and evidence-supported claim"
].forEach(b => children.push(bullet(b)));

// 3. Learning Objectives
children.push(h1("3. Learning Objectives"));
children.push(plain("Organized by durable skill, by cohort. Standards anchors in parentheses. Quoted standards are from your NJSLS file; out-of-file standards are canonical NJSLS-Science codes and are marked."));

children.push(h2("Durable skill 1: Genetics"));
children.push(h3("Juniors (G5/G6)"));
[
  "Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves humans used (MS-LS4-5, out-of-file)",
  "Apply a Punnett square to predict the inheritance of a single trait across one generation (MS-LS3-2, out-of-file)",
  "Distinguish a heritable trait from a learned behavior in a domesticated organism (MS-LS3-1, out-of-file)",
  "Define selective breeding and give two examples from the documented history of a domesticated species (MS-LS4-5, out-of-file)"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors (G7/G8)"));
[
  "Trace a domesticated organism's distinctive traits back to its ancestral species, naming the selective-breeding moves and the approximate generational timeline (MS-LS4-5, out-of-file)",
  "Apply a Punnett square to predict the probability that a specific trait will appear across multiple offspring (MS-LS3-2 out-of-file, 7.SP.C.5 in-file)",
  "Explain how artificial selection shifts trait frequency across a population over generations (MS-LS4-5, out-of-file)",
  "Use a documented selective-breeding case study to argue that domestication is itself a heritable trait set (MS-LS4-5, out-of-file)"
].forEach(b => children.push(bullet(b)));

children.push(h2("Durable skill 2: Critical evaluation of a claim"));
children.push(h3("Juniors (G5/G6)"));
[
  "Distinguish evidence relevant to a claim from evidence irrelevant to it (RI.AA.6.7, W.AW.6.1)",
  "Distinguish a claim supported by reasons and evidence from a claim that is not (RI.AA.6.7)",
  "Identify the opposing claim a strong argument must answer (W.AW.6.1)",
  "Calculate the unit cost of two comparable consumer categories and identify which is higher (6.RP.A.2)",
  "Determine whether a stated stakeholder concern is evidence-supported or bias-driven, using partner-supplied data as the check (RI.CR.6.1, 6.RP.A.3)"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors (G7/G8)"));
[
  "Evaluate an argument and assess whether the reasoning is sound and the evidence is relevant and sufficient (RI.AA.7.7, RI.AA.8.7)",
  "Recognize when irrelevant evidence is introduced into an argument (RI.AA.8.7)",
  "Calculate the lifetime cost of two comparable consumer categories using proportional reasoning and identify which is higher (7.RP.A.2, 7.RP.A.3)",
  "Distinguish a legitimate stakeholder objection from stigma by analyzing per-instance and per-category primary-source data (7.SP.A.2, RI.CR.7.1)",
  "Deconstruct a speaker's argument and evaluate whether the reasoning is sound (SL.ES.7.3, SL.ES.8.3)"
].forEach(b => children.push(bullet(b)));

children.push(h2("Durable skill 3: Persuasion"));
children.push(h3("Juniors (G5/G6)"));
[
  "Compose a complete written argument for a specific course of action, addressing one named audience member, with claim, counterclaim, reasoning, and evidence (W.AW.6.1)",
  "Deliver an oral pitch to a named audience member proposing a specific course of action (SL.PI.6.4)",
  "Rewrite a generic listing for a specific target-audience profile (W.AW.6.1, W.WP.6.4)",
  "Present claims and findings to an audience, sequencing ideas logically using facts and details (SL.PI.6.4)"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors (G7/G8)"));
[
  "Compose a complete written argument for a specific course of action with claim, counterclaim, reasoning, and evidence, anticipating and answering the strongest opposing position (W.AW.7.1, W.AW.8.1)",
  "Adapt the same persuasive argument across three channels and explain why each adaptation fits its channel (W.AW.8.1, W.WP.8.4)",
  "Test the effectiveness of two persuasive variants using A/B response rates and proportional reasoning (7.RP.A.3, 7.SP.A.2)",
  "Present claims and findings, emphasizing salient points with relevant evidence, sound reasoning, and well-chosen details (SL.PI.8.4)"
].forEach(b => children.push(bullet(b)));

children.push(h2("Math spine (cross-cutting)"));
children.push(note("Highlights only. Full week-by-week list lives in bigdogs_math_thread_v1.md."));
children.push(h3("Juniors (G5/G6)"));
[
  "Calculate the unit rates of two comparable quantities from primary-source data (6.RP.A.2)",
  "Calculate a per-category rate as a unit rate (6.RP.A.2)",
  "Calculate a single case's value and compare it to the category average (6.SP.B.5)",
  "Calculate the response rate for each A/B test variant (6.RP.A.3.c)",
  "Apply a calculation from the analysis phase to defend a recommendation in the individual transfer assessment (6.SP.B.5 applied)"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors (G7/G8)"));
[
  "Calculate the gap between two comparable quantities as a unit rate and as a percentage difference (7.RP.A.3)",
  "Calculate the median, range, and interquartile range of values across a team's selected sample (7.SP.B.4)",
  "Determine whether the difference between A/B response rates is a real effect or sample noise (7.SP.A.2)",
  "Project additional monthly outcomes at varying lift rates (7.RP.A.2)",
  "Apply a per-instance calculation to defend a recommendation in the individual transfer assessment (7.RP.A.3 applied)"
].forEach(b => children.push(bullet(b)));

// 4. Prerequisites
children.push(h1("4. Prerequisites"));
children.push(plain("What students walk in with on Day 1. Per v2.9.15 doctrine, these map to standardsRole.retrieves with firstTaughtIn = \"pre-Forge\" or naming a prior Forge challenge. Standards quoted are from your NJSLS file unless marked otherwise."));

children.push(h2("Math prerequisites"));
children.push(h3("Juniors entering with 5th-grade floor"));
[
  "Multiply multi-digit whole numbers (5.NBT.B.5)",
  "Add, subtract, multiply, and divide decimals to hundredths (5.NBT.B.7)",
  "Add and subtract fractions with unlike denominators (5.NF.A.1)",
  "Read and interpret line plots of data (5.MD.B.2)",
  "(Inferred) Basic ratio language if a prior Forge challenge first-taught it; otherwise 6.RP.A.1 becomes a first-teach in this challenge"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors entering with 6th-grade floor"));
[
  "All Juniors prerequisites",
  "Understand the concept of a ratio (6.RP.A.1, retrieves)",
  "Understand the concept of a unit rate (6.RP.A.2, retrieves)",
  "Recognize a statistical question (6.SP.A.1, retrieves)",
  "Summarize a numerical data set in relation to its context (6.SP.B.5, retrieves)",
  "(Inferred) Basic probability vocabulary"
].forEach(b => children.push(bullet(b)));

children.push(h2("ELA prerequisites"));
children.push(h3("Juniors entering with 5th-grade floor"));
[
  "Write opinion pieces on topics or texts, supporting a point of view with reasons and information (W.AW.5.1, retrieves)",
  "Quote accurately from an informational text when explaining what the text says explicitly (RI.CR.5.1, retrieves)",
  "Explain how an author uses reasons and evidence to support particular points in a text (RI.AA.5.7, retrieves)",
  "Report on a topic or present an opinion, sequencing ideas logically (SL.PI.5.4, retrieves)",
  "Gather information from multiple sources (W.SE.5.6, retrieves)"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors entering with 6th-grade floor"));
[
  "All Juniors prerequisites",
  "Cite textual evidence to support analysis (RI.CR.6.1, retrieves)",
  "Trace and evaluate the argument and specific claims in a text (RI.AA.6.7, retrieves for Seniors; first-taught for Juniors inside this challenge)",
  "Deconstruct a speaker's argument and specific claims (SL.ES.6.3, retrieves)"
].forEach(b => children.push(bullet(b)));

children.push(h2("Science prerequisites"));
children.push(note("Out-of-file. NJSLS file does not contain middle-school science. These are canonical NJSLS-Science codes from earlier grades."));
children.push(h3("Juniors"));
[
  "Basic life-science vocabulary (organism, trait, parent, offspring)",
  "Familiarity with the concept that traits can be transmitted from parents to offspring (4-LS1 territory)",
  "(Inferred) Simple cause-and-effect reasoning in biological systems"
].forEach(b => children.push(bullet(b)));
children.push(h3("Seniors"));
[
  "All Juniors prerequisites",
  "(Inferred) Basic familiarity with cells and reproduction (MS-LS1) if the Year One scope places it earlier; otherwise these become first-teaches inside this challenge"
].forEach(b => children.push(bullet(b)));

children.push(h2("Cognitive and academic prerequisites"));
children.push(h3("Both cohorts"));
[
  "Working in teams of 3 to 4 students",
  "Sustained writing for 30 to 40 minutes in one session",
  "Reading a 2 to 3 page informational text",
  "Using a worksheet or graphic organizer to capture ideas",
  "Following a multi-step task without per-step instruction",
  "For Juniors: the developmental load of a 35 to 40 minute session per Yardsticks"
].forEach(b => children.push(bullet(b)));

children.push(h2("Domain prerequisites (challenge-specific)"));
children.push(h3("Both cohorts"));
[
  "Familiarity with the partner institution's domain of work; a structured partner visit early in the challenge backstops anything missing",
  "Basic vocabulary relevant to the partner's domain",
  "(Inferred) Variation in incoming familiarity is expected; teams should be composed so each team has at least one student with strong domain familiarity as a peer resource"
].forEach(b => children.push(bullet(b)));

children.push(rule());
children.push(h2("Three notes before lock"));
children.push(plain("The Genetics learning objectives carry out-of-file standards (MS-LS3-1, MS-LS3-2, MS-LS4-5). Per the earlier finding, your uploaded NJSLS file does not contain middle-school science. Worth supplementing the standards reference before these objectives lock."));
children.push(plain("The prerequisites section assumes this challenge sits somewhere in the middle of Year One, not first. If it is the first challenge, several Seniors prerequisites (6.RP.A.1/.2, 6.SP.A.1/.B.5, RI.AA.6.7, SL.ES.6.3) become first-teaches inside this challenge rather than retrieves. Worth confirming the Year One ordering."));
children.push(plain("The fourth essential question (Equity question) is a proposal that ties the three durable skills together. If you only want three essential questions, drop the fourth. If you want four, you may want to rephrase it to fit your voice."));

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
      children: [new TextRun({ text: "Forge Challenge — Curriculum Design Template", font: "Calibri", size: 18, color: MUTED })],
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
  fs.writeFileSync(path.join(__dirname, "forge_curriculum_design_template_v1.docx"), buffer);
  console.log("Wrote forge_curriculum_design_template_v1.docx");
});
