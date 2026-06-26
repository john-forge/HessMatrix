// build_inventory_from_doc.js
//
// One-shot converter: takes the Scope and Sequence tab from the Big Dogs
// Google Doc (markdown extract pasted inline below) and produces an
// inventory JSON in the shape forge_app.html's scopeInventoryToScope
// expects.
//
// Why inline the doc text? The Drive read tool returns the doc as one
// big markdown string. The Lesson Hypothesis table sits inside that
// string. This file vendors the doc text so the converter is
// deterministic and reproducible without re-fetching Drive.
//
// Algorithm:
//   1. Locate the Lesson Hypothesis table (the 8-column one starting
//      with "| original# | # | Act | Concept Progression | Topic | ...").
//   2. Walk each row. Split on " | ", trim, strip Google-doc markdown
//      artefacts (markdown links, italic stars, &#10; encoded newlines).
//   3. Each row becomes either:
//      - a NORMAL row (has # and Act) → concept day + parsed lessons
//      - a MARKER row (no #, no Act, only a Concept Progression value)
//        → recorded as a marker, not a concept day
//      - a CONTINUATION row (same content in every cell) → recorded as
//        an attached sub-row note on the preceding concept day
//      - an EVIDENCE-ONLY row (no #, no CP, has Evidence) → attached to
//        the preceding act as an evidence-summary note
//   4. Run parseLessonContent (harness parser) on the Lesson Content
//      cell to derive per-lesson L# entries.
//   5. Emit the inventory JSON shape, ready to paste into Step 3 of
//      forge_app.html.

var fs = require('fs');
var path = require('path');
var parser = require('./parser.js');

// ─── DOC TEXT (verbatim from Drive 2026-06-25) ─────────────────
// Only the Lesson Hypothesis table is parsed. Other sections are
// preserved as a comment block for traceability.
//
// SOURCE: https://docs.google.com/document/d/1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU

var TABLE_RAW = [
  "| 1 | 1 | 1 | Meet the long-stay dog; write a first prediction | Driving question |   | A prediction to test later  | SL.PE.6.1 |",
  "|   |   |   | 1st St Huberts Visit  |   |   |   |   |",
  "| 2 | 2 | 1 | Read and interpret the shelter's tables and bar graphs | Reading and interpreting tables and graphs   &#10;  &#10;   | L1: Introducing the data - “How can we use this information?”L2: Learn how to read graphs (bar, line, pie) - How to pull information from graphs - differentiate graphs by aptitude level L3: Interpret graphs - drawing conclusions  &#10;  &#10;L1- Introduce dataset for bar graph (ASPCA or St Huberts)   &#10;  &#10;L2-  Introduce dataset for Pie Chart (ASPCA or St Huberts)   &#10;  &#10;  &#10;L3 - Introduce dataset for Line graph (ASPCA or St Huberts)   &#10;  &#10;   | Extract info from tables and graphs  &#10;  &#10;  &#10;  &#10;What information can they gather from the website | \\[6.SP\\](http://6.sp).B.4 5.DL.A.1 |",
  "| 3 | 3 | 1 | Counts vs. rates; calculate an adoption rate | Raw counts vs. rates; unit rates | L1: Percentage vs number   &#10;   | Calculate adoption rates | 6.RP.A.2 |",
  "| 4 | 4 | 1 | Compare unequal groups by rate; spot the hidden factor | Comparing groups; misleading comparisons; hidden factors | L1: How the presentation of information can be misleading;what else are hidden factors  | Compare fairly; name the hidden factor | 6.RP.A.3 |",
  "| 5 | 5 | 1 | Write a data-backed claim \\*(Act 1 evidence)\\* | Defending a conclusion with data | L1: how to draw the conclusionL2: how to write up claim with evidence | Defend a conclusion using data | 6.SP.B.5, \\[W.AW\\](http://w.aw).6.1  &#10;\\\\\\*same day  |",
  "| Practice presenting the visual data and oral presentation of the analysis of adoption data. Confirmation of big dog gap   &#10;  &#10;Focus: Practicing eye contact, pacing, and projection   &#10;I do: VIdeo of good speaker vs video of bad speaker   &#10;We do: what do we notice about each - discussion   &#10;You do - Now you put it into practice  |  |  |  |  |  |  |  |",
  "|   |   |   | Present data visually and conclusions orally | Presentation of data analysis and written claim  |   | Initial analysis of adoption data and a written claim about whether a real adoption gap exists. |   |",
  "| 6 | 6 | 2 | Same species? (Great Dane vs. Chihuahua) Write a first explanation to revise | Driving question | L1: species vs breeds  &#10;  &#10;   | A starting explanation of how a chihuahua and a great dane are the same animal  | \\[SL.PE\\](http://sl.pe).6.1NONE (intro) |",
  "| 7 | 7 | 2 | Inheritance and variation | Inheritance; variation | L1: Genes  &#10;L2: Traits - Dominant vs Recessive   &#10;L3: Inheritance - how traits are passed down   &#10;L4: Variation - How traits vary in the same species  &#10;L5: Punnit Squares   &#10;  &#10;   | Explain inheritance; identify variation  &#10;  &#10;L4 and L5 Same day | 3-LS3-1MS-LS4-4     |",
  "| 8 | 8 | 2 |   | Domestication; natural selection | L1: What is natural selection   &#10;   | Explain how domestication changed wolves | MS-LS4-4  |",
  "|   |   |   | \\[Wolf to dog \\*(fox story told aloud)\\*\\](https://www.amazon.com/How-Tame-Fox-Build-Dog/dp/022644418X) |   | seminar? |   |   |",
  "| 9 | 9 | 2 | \\[Bred for a job \\*(border collie\\* \\](http://google.com/url?...)\\[\\*reading)\\*\\](http://google.com/url?...) | Selective breeding; Explain the breeds \\*(Act 2 evidence)\\* | L1: Read and discuss border collie readingL2:Research specific breed traits and summarize findings | Tie a breed trait to its original job | MS-LS4-5  &#10;   |",
  "| 10 | 10 | 2 | Model a trait spreading over generations | Traits over generations; polygenic inheritance | L1: Polygenic Inheritance   &#10;L2: Adaptation - how some traits increase survival over time  &#10;L3: Breeding dogs for polygenic traits (size, weight, behavior)  &#10;   &#10;   | Model a trait becoming more common | MS-LS4-6MS-LS4-5 |",
  "|   | 11 | 2 | Dog Breed traits and role specialization   |   | L1: Research the roles of specific breedsL2: Connect the traits (appearance and behavior) that were bred for these roles | The Act 2 explanation | MS-LS4-5, MS-LS4-6 |",
  "|   |   | 2 | How did dog breeding shape appearance and behavior?  |   | Analysis  &#10;  &#10;Deliverable:   &#10;Create a presentation describing the journey from wolf to dog with only images and data sets | The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds | MS-LS4-5, MS-LS4-6 |",
  "| 12 | 12 | 3 | Write the photo assumption - What assumptions might people make about this dog? | Naming an assumption | L1: (picture of dog)Define assumption vs observation (activity -”What would someone assume about this dog? (video) What do we observe?”)L2: Forming a hypothesis based on animal traits and behavior:  why do you think big dogs are adopted less frequently? | State the photo assumption | SEP (Asking Questions); SL.PE.6.1 |",
  "| 13 | 13 | 3 | \\[Observation vs. inference \\*(Horowitz aloud)\\*\\](https://www.amazon.com/Being-Dog-Following-World-Smell/dp/1476795991) | Observation vs. inference | L1: What makes a good observation? (Practices of good observation) | Separate observed from concluded | SEP (Constructing Explanations) |",
  "| 14 | 14 | 3 | Meet the dog; keep an observation log | Observation logs; recording objectively | L1: Observing animal behavior - What does it tell us? (ethology)   &#10;L2: Designing observation experiments for our dogs (What behaviors are we looking for?)(must include appearance and energy level)   &#10;   | Maintain a structured log | SEP (Planning and Carrying Out Investigations) |",
  "|   |   |   | 2nd St Huberts visit  |   |   |   |   |",
  "| 15 | 15 | 3 | Assumption vs. reality \\*(Act 3 evidence)\\*  | Comparing assumed vs. observed - How were first impressions right or wrong?  | L1: Identifying patterns in animal behavior - Identifying patterns in our observational logs (What did we notice?) L2: Drawing inferences from the patterns; compare to initial assumptions | Revise when observations contradict | SEP (Argument from Evidence) |",
  "| 16 | 16 | 4 | Write a testable hypothesis | Testable hypotheses | L1: Introduce and Model how to create a testable hypothesisL2: What can we prove / test for - brainstorm reasons people might have that keep them from adopting big dogs (distinguish which ones are testable and which ones are not), then choose one and create the hypothesis together. (you do: students write their own for the challenge) | Write a testable hypothesis | SEP (Asking Questions)  &#10;   |",
  "| 17 | 17 | 4 | Design non-leading survey/interview questions | Unbiased survey questions | L1: Why are surveys useful? Qualitative vs. Quantitative  &#10;L2: (writing unbiased questions) How to write good survey questions (Best practices in  surveying - avoid leading questions, avoid testing friends(must include cost, appearance, energy level)L3: Sampling and respondent pool: Who should complete the survey? How many people should complete it (survey sample) )  | Write non-leading questions | W.WR.6.5 |",
  "| 18 | 18 | 4 | Gather, tally, and summarize responses | Collecting/organizing; summarizing | L1: Cleaning data - (Strong response vs weak response)   &#10;L2: Visualize data - dot plot   &#10;L3: Charting data (charts - pie charts, line charts - quantitative)   &#10;L4: Creating charts using excel   &#10;L5: Identifying themes (patterns - qualitative)   &#10;   | Organize and summarize results | W.SE.6.6, 6.SP.B.5 |",
  "| 19 | 19  | 4 | Test beliefs against facts \\*(Act 4 evidence)\\* | Supported vs. unsupported claims; testing explanations | L1: Informal introduction to correlation vs causation   &#10;L2: Revising hypothesis against data from observation and survey | Evaluate evidence; spot overreach; revise a belief | RI.AA.6.7 |",
  "| 20 | 20 | 4 | The \"prove it\" move: label (preconceptions) to evidence{Explore Facts using Data Base for dog bites and fatalities, cost using medication and food costs, restrictions on pet allowance in housing, size of dog vs. breed energy levels} | Labels (preconceptions) vs. specific details; the \"prove it\" move | L1: How to identify good resourcesL2: Identifying supporting evidence in the resource for supporting the hypothesis Seminar: question and defend your claims | Replace labels with observed detail{“The things we're seeing in the survey - this is why they're not true or why this is true” The validity of the reasons} | W.AW.6.1 |",
  "| 21 | 21 | 4 | Claim only what you saw. Final analysis. | Claiming only what evidence supports; overclaiming | L1: How to support a claim with evidence or falsify claims | Spot and fix overclaiming - grounding in evidence “What can you support with evidence?”  | W.AW.6.1, RI.AA.6.7 |",
  "|   |   |   |   |   |   | Survey findings, evidence checks, and conclusions supported by data. |   |",
  "| 22 | 22 | 5 | What makes a story \\*(\\*\\[\\*Eddie\\*\\](https://hssvacc.blogspot.com) \\*+\\* \\[\\*Billie\\*\\](https://www.yahoo.com) \\*mentor texts)\\* | Story structure; hooks/endings; details | L1: Based on your findings - what are people assuming about our chosen dog that are true and what things aren't true (pick a dog)  &#10;  &#10;L2:  Introduction to story structure   &#10;  &#10;L3: Writing to  Seminar: read Eddie the Terrible blog and discussion what makes it persuasive  &#10;  &#10;L4: Identifying elements of a persuasive narrative  | Pick the strongest moment; structure a profile  &#10;  &#10;  &#10;Take your position   &#10;  &#10;Study your audience   &#10;  &#10;Research both sides   &#10;  &#10;Structure your text   &#10;  &#10;Support your argument -   &#10;Persuasive paragraph -   &#10;write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement) ,    &#10;  &#10;Add a conclusion  | \\[W.NW\\](http://w.nw).6.3  &#10;  &#10;  &#10;   |",
  "| 23 | 23 | 5 | Show, don't tell; sequence the profile | Showing vs. telling; sequencing and pacing | L1:Anatomy of an Ad:  &#10;L2: Identifying Target Audience  &#10;L3: Emotional Appeal (Pathos)  &#10;L4: Persuasive Devices | Show character in scenes; build the sequence | W.NW.6.3 |",
  "| 24 | 24 | 5 | Draft, test on a reader, revise \\*(Act 5 evidence)\\* | Revising on reader feedback | L1: Modeling how to draft your dog card  - What perspective, how you want to write it  &#10;L2: Peer review of drafts (re-norm kind, specific, helpful to start class)   | Revise from reader feedback | W.WP.6.4 |",
  "| 25 | 25 | 6 | Finalize the card | Grounding + story synthesis | Draft revisions (put it all together) | Create the final profile card | W.NW.6.3, W.AW.6.1 |",
  "|   |   |   |   |   |   | Explanation and Presentation of Cards |   |",
  "|   |   |   |   |   |   | Recommendations to solve the Big Dog Challenge |   |",
  "|   |   | 6 | Evaluating Speakers  |   | L1:  | Summarize the points of a speaker / explain how each claim is supported by evidence |   |",
  "|   |   |   | Presentation Tools  |   | L1:  |   |   |",
  "|   |   | 6 | Speaking well  |   |   | Pace, tonality, eye contact, pronunciation  |   |",
  "| 26 | 27 | 6 | Brief St. Hubert's \\*(Act 6 evidence)\\* | Presenting findings and recommendations |   | Final cards and partner briefing | SL.PI.6.4, SL.UM.6.5 |"
];

// ─── Cell cleanup helpers ──────────────────────────────────────

function stripMarkdown(s) {
  if (!s) return '';
  var t = String(s);
  // Replace Google-doc markdown link wrappers like [W.AW](http://w.aw).6.1 → W.AW.6.1
  t = t.replace(/\\\[([^\]]+)\\\]\([^)]*\)/g, '$1');
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  // Strip escaped asterisks and trailing whitespace stars
  t = t.replace(/\\\*/g, '*');
  t = t.replace(/\*+/g, '');
  // Trim
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function decodeEntities(s) {
  if (!s) return '';
  return String(s).replace(/&#10;/g, '\n');
}

// Split a markdown table row "| a | b | c |" into trimmed cells.
function splitRow(row) {
  var t = row.trim().replace(/^\|/, '').replace(/\|$/, '');
  return t.split('|').map(function (c) { return c; });
}

// Detect row shape based on the # column and Act column.
function classifyRow(cells) {
  var orig = String(cells[0] || '').trim();
  var num = String(cells[1] || '').trim();
  var act = String(cells[2] || '').trim();
  var cp = stripMarkdown(cells[3] || '');
  var topic = String(cells[4] || '').trim();
  var lessonContent = String(cells[5] || '').trim();
  var evidence = String(cells[6] || '').trim();
  var standard = String(cells[7] || '').trim();

  // Row entirely empty → skip
  if (!orig && !num && !act && !cp && !topic && !lessonContent && !evidence && !standard) {
    return { kind: 'empty' };
  }

  // Continuation row: only the first cell has content, rest empty
  var firstHasContent = !!orig;
  var restAllEmpty = !num && !act && !cp && !topic && !lessonContent && !evidence && !standard;
  if (firstHasContent && restAllEmpty) {
    return { kind: 'continuation', text: stripMarkdown(decodeEntities(orig)) };
  }

  // Normal row: has #, has act
  if (num && act) {
    return { kind: 'normal', cells: cells };
  }

  // Sub-row: has act and CP but no #
  if (!num && act && cp) {
    return { kind: 'sub', cells: cells };
  }

  // Marker row: has CP only (visit, etc.)
  if (!num && !act && cp) {
    return { kind: 'marker', cp: cp };
  }

  // Evidence-only row: no # no act no CP but has evidence
  if (!num && !act && !cp && evidence) {
    return { kind: 'evidence_only', evidence: stripMarkdown(decodeEntities(evidence)) };
  }

  return { kind: 'unknown', cells: cells };
}

// ─── Build the inventory ───────────────────────────────────────

var conceptDays = [];
var lessons = [];
var markers = [];
var continuations = [];
var subRows = [];
var evidenceOnlyRows = [];
var unknownRows = [];

var lessonOrd = 0;
var lastConceptDayOrd = null;

TABLE_RAW.forEach(function (row, rowIdx) {
  var cells = splitRow(row);
  var classified = classifyRow(cells);

  if (classified.kind === 'empty') return;

  if (classified.kind === 'marker') {
    markers.push({ row_index: rowIdx, concept_progression: classified.cp, preceding_concept_day_ord: lastConceptDayOrd });
    return;
  }

  if (classified.kind === 'continuation') {
    continuations.push({ row_index: rowIdx, text: classified.text, preceding_concept_day_ord: lastConceptDayOrd });
    return;
  }

  if (classified.kind === 'evidence_only') {
    evidenceOnlyRows.push({ row_index: rowIdx, evidence: classified.evidence, preceding_concept_day_ord: lastConceptDayOrd });
    return;
  }

  if (classified.kind === 'sub') {
    subRows.push({
      row_index: rowIdx,
      act: parseInt(cells[2], 10) || null,
      concept_progression: stripMarkdown(cells[3]) || '',
      topic: stripMarkdown(cells[4]) || '',
      lesson_content_raw: cells[5] || '',
      evidence_drives_at: stripMarkdown(decodeEntities(cells[6])) || '',
      standards_raw: stripMarkdown(decodeEntities(cells[7])) || '',
      preceding_concept_day_ord: lastConceptDayOrd
    });
    return;
  }

  if (classified.kind === 'unknown') {
    unknownRows.push({ row_index: rowIdx, cells: cells });
    return;
  }

  // Normal row: build a concept day + parse lessons.
  var num = parseInt(cells[1], 10);
  var act = parseInt(cells[2], 10);
  var cp = stripMarkdown(cells[3]) || '';
  var topic = stripMarkdown(cells[4]) || '';
  var lessonContentRaw = cells[5] || '';
  var evidence = stripMarkdown(decodeEntities(cells[6])) || '';
  var standardsRaw = stripMarkdown(decodeEntities(cells[7])) || '';

  // Extract standard codes. Handles: doubled science codes glued together in
  // the doc ("3-LS3-1MS-LS4-4" → ["3-LS3-1","MS-LS4-4"]), SEP science-practice
  // tokens whose qualifier must be preserved ("SEP (Asking Questions)"), and
  // non-code parentheticals / same-day markers that must be dropped.
  var standardCodes = (function () {
    var out = [];
    var t = String(standardsRaw);
    // 1. Capture SEP practice tokens WITH their qualifier before stripping parens.
    t = t.replace(/SEP\s*\(([^)]*)\)/g, function (m, q) {
      out.push('SEP (' + q.trim() + ')');
      return ' ';
    });
    // 2. Drop non-code parentheticals (intro, evidence notes), same-day markers, bare NONE.
    t = t.replace(/NONE\s*\(intro\)/gi, ' ')
         .replace(/\([^)]*\)/g, ' ')
         .replace(/\*?same day/gi, ' ')
         .replace(/\bNONE\b/gi, ' ');
    // 3. Tokenize on comma, semicolon, or whitespace.
    var rough = t.split(/[,\s;]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    // 4. Split doubled science codes using a science-code-aware regex (NGSS LS strand).
    var SCI = /(?:[A-Z]+-LS[3-4]-\d+)|(?:\d-LS\d-\d+)/g;
    rough.forEach(function (code) {
      var sub = code.match(SCI);
      if (sub && sub.length > 1) sub.forEach(function (s) { out.push(s); });
      else out.push(code);
    });
    // 5. Keep SEP qualifier tokens plus anything shaped like an NJSLS / NGSS code.
    return out.filter(function (s) {
      if (/^SEP \(/.test(s)) return true;
      return /^[A-Z\d.\-]+$/.test(s) && /[A-Z]/.test(s) && /\d/.test(s) && s.length >= 3;
    });
  })();

  var parsed = parser.parseLessonContent(lessonContentRaw);

  conceptDays.push({
    ord: num,
    act: act,
    concept_progression: cp,
    topic: topic,
    evidence_drives_at: evidence,
    standards: standardCodes,
    standards_raw: standardsRaw,
    parsed_lesson_groups: parsed.groups.length,
    child_lesson_count: parsed.lessons.length
  });
  lastConceptDayOrd = num;

  // Emit one lesson per parsed entry. If empty, emit a single lesson representing the concept day itself.
  if (parsed.lessons.length === 0) {
    lessonOrd++;
    lessons.push({
      lesson_ord: lessonOrd,
      concept_day_ord: num,
      act: act,
      sub: null,
      title: cp,
      doc_text: '(no L# subdivision in doc; concept day = the lesson)',
      standards_inherited: standardCodes.slice()
    });
  } else {
    parsed.lessons.forEach(function (L) {
      lessonOrd++;
      lessons.push({
        lesson_ord: lessonOrd,
        concept_day_ord: num,
        act: act,
        sub: L.id,
        title: L.title,
        doc_text: L.id + ': ' + L.title,
        standards_inherited: standardCodes.slice()
      });
    });
  }
});

// ─── Define acts (verbatim from doc / boss-facing organization) ──

var acts = [
  { act: 1, title: 'Is This Even True?', core_question: 'Is this even true?', evidence_produced: 'Initial analysis of adoption data and a written claim about whether a real adoption gap exists.' },
  { act: 2, title: 'How a Wolf Became Both a Great Dane and a German Shepherd', core_question: 'How did dogs become dogs?', evidence_produced: 'Explanation of how domestication and selective breeding produced modern dog breeds.' },
  { act: 3, title: 'Meet Your Dog', core_question: "What's your dog actually like?", evidence_produced: "A written assumption based on the dog's photo, a structured observation log, and a comparison of the two." },
  { act: 4, title: 'Why Do People Pass Them By?', core_question: 'Why do people pass them by?', evidence_produced: 'Survey findings, evidence checks, and conclusions supported by data.' },
  { act: 5, title: 'Telling the Truth So It Moves Someone', core_question: 'How do stories move people?', evidence_produced: 'Draft profile cards and reader feedback.' },
  { act: 6, title: 'The Cards Go Up', core_question: 'What do we owe the shelter?', evidence_produced: 'Final profile cards and partner briefing.' }
];

// ─── Collect all unique codes ─────────────────────────────────

var allCodes = {};
conceptDays.forEach(function (cd) {
  cd.standards.forEach(function (c) { allCodes[c] = true; });
});
var allCodesSorted = Object.keys(allCodes).sort();

// ─── Emit inventory JSON ──────────────────────────────────────

var inventory = {
  audit_input_meta: {
    source_document: 'https://docs.google.com/document/d/1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU/edit',
    source_extracted_at: '2026-06-25',
    converter: 'texture_lessons_harness/build_inventory_from_doc.js',
    converter_version: 'v2 (harness-driven, captures doubled L# sets and L4 Excel charts)',
    structural_note: 'Each row in the Lesson Hypothesis table is parsed via the harness parser (texture_lessons_harness/parser.js) which handles every cell shape seen in the doc: empty cells, single L1, sequential L1-Ln, doubled L1-L3 sets, L1- dash notation, inline run-ons like conclusionL2:, named Seminar entries, marker rows.'
  },
  challenge: {
    title: 'Why Big Dogs Get Passed Over',
    partner: "St. Hubert's Animal Welfare Center",
    cohort: 'Juniors G5/G6',
    cohort_doc_text: 'Cohort 5/6 (This is not for 7/8)',
    in_scope_band: {
      grades: ['5', '6', 'MS', '3-5'],
      subjects: ['ela', 'math', 'science', 'social_studies', 'csdt', 'clks', 'chpe']
    },
    authentic_impact: "Students will produce narrative profile cards for individual big dogs, written for the families walking the adoption kennels at St. Hubert's, by turning each dog's real history and observed behavior into a short, honest story that reframes the size that made adopters hesitate. The cards are printed and clipped to each dog's kennel. The cohort then briefs St. Hubert's, handing off the cards and explaining the thinking behind the campaign."
  },
  acts: acts,
  concept_days_total: conceptDays.length,
  concept_days: conceptDays,
  lessons_total: lessons.length,
  lessons: lessons,
  markers_from_doc: markers,
  continuation_rows_from_doc: continuations,
  sub_rows_from_doc: subRows,
  evidence_only_rows_from_doc: evidenceOnlyRows,
  unknown_rows_from_doc: unknownRows,
  all_njsls_codes_tagged_unique_sorted: allCodesSorted,
  all_njsls_codes_tagged_unique_sorted_count: allCodesSorted.length
};

var outPath = path.join(__dirname, '..', 'bigdogs_lesson_inventory_v2.json');
fs.writeFileSync(outPath, JSON.stringify(inventory, null, 2) + '\n');

// ─── Summary ──────────────────────────────────────────────────

console.log('═'.repeat(60));
console.log('build_inventory_from_doc — fresh conversion');
console.log('═'.repeat(60));
console.log('Source: ' + inventory.audit_input_meta.source_document);
console.log('Output: ' + outPath);
console.log();
console.log('Concept days:        ' + conceptDays.length);
console.log('Lessons:             ' + lessons.length);
console.log('Markers (visits):    ' + markers.length);
console.log('Continuation rows:   ' + continuations.length);
console.log('Sub rows:            ' + subRows.length);
console.log('Evidence-only rows:  ' + evidenceOnlyRows.length);
console.log('Unknown rows:        ' + unknownRows.length);
console.log('Unique codes tagged: ' + allCodesSorted.length);
console.log();
console.log('Per-act breakdown:');
acts.forEach(function (a) {
  var actDays = conceptDays.filter(function (cd) { return cd.act === a.act; });
  var actLessons = lessons.filter(function (L) { return L.act === a.act; });
  console.log('  Act ' + a.act + ': ' + actDays.length + ' days, ' + actLessons.length + ' lessons');
});
console.log('═'.repeat(60));
