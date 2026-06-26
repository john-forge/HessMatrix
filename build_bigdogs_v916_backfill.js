// build_bigdogs_v916_backfill.js
//
// Takes bigdogs_lesson_inventory_v2.json and the NJSLS database (njsls_standards.js)
// and produces bigdogs_v916_backfill.json — a sidecar file with:
//   - challenge.declaredStandardsManifest (authored from texture v9 + STANDARDS CHECK)
//   - session.standardsVerbatim (lookup from NJSLS DB)
//   - session.artifact (one sentence per session, hand-authored below)
//
// The output JSON can be merged into a v2.9.16-compatible scope via Step 3 paste
// (the workbench's scopeInventoryToScope will then populate everything else).
//
// Locked vocabulary: Cohort 5/6, Act, Concept Progression, Lesson, Evidence
// (drives at), Standard, artifact-as-witness, declared standards manifest.

var fs = require('fs');
var path = require('path');

global.window = {};
require('./njsls_standards.js');
var DB = global.window.NJSLS_STANDARDS || {};

var inv = JSON.parse(fs.readFileSync('./bigdogs_lesson_inventory_v2.json', 'utf8'));

// ─── Manifest: hand-authored from bigdogs_texture_v9.md + source-doc STANDARDS CHECK
// 13 codes the challenge actually centers, distinct from the post-hoc 20-code
// tagged set. Excludes 3-LS3-1 (GHOST, replaced by MS-LS3-2) and 5.DL.A.1
// (data-literacy code dropped from Section 6 in the source).

var declaredStandardsManifest = [
  // Math (6.RP, 6.SP — load-bearing for Acts 1 + 4)
  "6.RP.A.2",   // unit rate — Act 1 Day 3
  "6.RP.A.3",   // misleading comparisons / hidden factors — Act 1 Day 4
  "6.SP.B.4",   // display data — Act 1 Day 2; Act 4 Day 18
  "6.SP.B.5",   // summarize data in context — Act 1 Day 5; Act 4 Day 18

  // Science (MS-LS3, MS-LS4 — Act 2 backbone)
  "MS-LS3-2",   // sexual vs asexual reproduction / variation (replaces GHOST 3-LS3-1)
  "MS-LS4-4",   // natural selection — Act 2 Day 8
  "MS-LS4-5",   // selective breeding — Act 2 Day 9, Day 11
  "MS-LS4-6",   // traits over generations — Act 2 Day 10, Day 11

  // ELA (writing + research + speaking — Acts 1 + 4 + 5 + 6)
  "W.AW.6.1",   // argument writing — Act 1 Day 5; Act 4 Day 20-21; Act 6 finalize
  "W.NW.6.3",   // narrative writing (the profile card) — Act 5 + Act 6
  "W.WR.6.5",   // short research projects (the survey) — Act 4 Day 17
  "W.WP.6.4",   // planning + revising — Act 5 Day 24
  "SL.PI.6.4"   // present claims and findings — Act 6 Day 26
];

var manifestStatus = "Manifest authored 2026-06-26 from bigdogs_texture_v9.md + source doc STANDARDS CHECK + boss-facing organized doc. Excludes 3-LS3-1 (GHOST: grade 3, replaced by MS-LS3-2). Excludes 5.DL.A.1 (data literacy code that the source dropped from Section 6). Includes W.SE.6.6 was considered but DEMOTED — the audit STRETCH on L35-L38 (survey responses are not multi-source print/digital evidence) means W.SE.6.6 is not centered, only incidentally used. RI.AA.6.7 and SL.PE.6.1 also considered but DEMOTED — both audit-flagged as STRETCH on the writing-side and solo-write lessons; better treated as retrieve roles in the year coverage map. 13 codes total.";

// ─── Hand-authored artifacts: one sentence per session.
// Each artifact names the student-produces verb, the specific challenge-anchor
// noun, and the cognitive move the artifact demonstrates. Quotes verbatim from
// the inventory where possible.

// v2 inventory uses different lesson_ord numbering than v1 because the v2
// parser captured the second L1-L3 dataset block on Day 2 and the L4 Excel
// charting lesson on Day 18 that v1 missed. The map below is v2-aligned.
var artifactsByLessonOrd = {
  // ACT 1 — Is This Even True?
  1:  "The student writes one paragraph predicting whether the assigned long-stay dog at St. Hubert's has waited unusually long for a big dog, naming the specific behavior or trait that drives the prediction.",
  // Day 2 — abstract teaching block (L2-L4) then concrete dataset block (L5-L7)
  2:  "The student extracts five rows from St. Hubert's intake dataset and writes a two-sentence summary of what the rows show, naming the dog count, the time window, and one pattern noticed.",
  3:  "The student identifies which of bar, line, and pie best fits St. Hubert's adoption-rate dataset and writes one sentence defending the choice based on the data type (categorical vs continuous).",
  4:  "The student interprets one provided St. Hubert's adoption-rate bar graph and writes one sentence stating what the graph implies about big-dog adoption rates, distinguishing what is shown from what is inferred.",
  5:  "The student builds a bar graph from one ASPCA or St. Hubert's dataset, labeling axes and selecting the bar grouping that makes the big-vs-small adoption comparison visible.",
  6:  "The student builds a pie chart from one ASPCA or St. Hubert's dataset showing the proportion of adopted dogs by size bucket (small, medium, large, extra-large), labeling each wedge with its percentage.",
  7:  "The student builds a line graph from one ASPCA or St. Hubert's dataset showing adoption-rate change over time for one size bucket, naming the time window on the x-axis and the rate scale on the y-axis.",
  // Day 3 — rates
  8:  "The student computes the adoption rate for big dogs and the adoption rate for small dogs from St. Hubert's intake table, expressing each as a percentage and as a ratio to one decimal place.",
  // Day 4 — hidden factors
  9:  "The student reads two presentations of the same St. Hubert's intake data (raw counts vs adoption rates) and writes one sentence naming the hidden factor that flips which dog size 'looks worse.'",
  // Day 5 — data-backed claim
  10: "The student writes the conclusion sentence of a data-backed claim about big-dog adoption rates at St. Hubert's, beginning 'The data shows...' and citing one rate computation as evidence.",
  11: "The student writes a two-sentence claim-with-evidence paragraph naming whether the adoption gap exists at St. Hubert's, supported by the specific rate computed on Day 3.",

  // ACT 2 — How a Wolf Became Both a Great Dane and a German Shepherd
  // Day 6 — driving question
  12: "The student writes one paragraph explaining how a chihuahua and a great dane are the same species despite their visible differences, naming one trait they share at the species level.",
  // Day 7 — inheritance + variation (5 lessons)
  13: "The student labels a diagram of a dog cell, identifying the chromosome, the gene, and one named allele pair the student can cite from the lesson (e.g., coat-color or ear-shape gene).",
  14: "The student completes one Punnett square for a single-gene trait (e.g., coat color) given one heterozygous and one homozygous parent, predicting the offspring ratio.",
  15: "The student writes two sentences explaining how a recessive trait can skip a generation, using one specific dog breed example named in the lesson.",
  16: "The student lists three variations of one trait (e.g., coat length, ear shape, tail carriage) observed across one breed group, and one sentence naming why the variation exists.",
  17: "The student completes a Punnett square for a single-gene trait and uses the offspring ratio to predict what percentage of a 100-puppy litter would express the recessive trait.",
  // Day 8 — natural selection
  18: "The student writes one paragraph explaining how natural selection acts on wild-wolf populations (the contrast case), naming one trait that increases survival in a named environment.",
  // Day 9 — border collie reading
  19: "The student writes one paragraph summarizing one observation from the border collie reading that ties a specific breed trait (low-stalk crouch, eye contact, herding circle) back to wolf hunting behavior.",
  20: "The student writes a one-paragraph trait profile for one assigned breed, naming three traits and pairing each with the original job the breed was bred for.",
  // Day 10 — polygenic
  21: "The student writes two sentences distinguishing single-gene inheritance (Punnett square traits) from polygenic inheritance (size, weight, behavior) using one named example of each.",
  22: "The student writes one paragraph explaining how one named trait (e.g., wolf cold-tolerance, border collie herding drive) becomes more common across generations through differential survival or selective breeding.",
  23: "The student writes one paragraph explaining how the size of a Great Dane or the small frame of a Chihuahua emerged through generations of selective breeding, naming polygenic inheritance as the mechanism.",
  // Day 11 — synthesis
  24: "The student writes a one-paragraph profile for one assigned working breed (border collie, Newfoundland, livestock guardian) naming the original job and three traits selectively bred to support it.",
  25: "The student writes one paragraph for the Act 2 evidence document explaining how domestication and selective breeding produced one named modern breed from wolf ancestors, citing one trait-to-role link.",

  // ACT 3 — Meet Your Dog
  // Day 12 — photo assumption
  26: "The student writes the photo-assumption paragraph: from the photo alone, three specific predictions about the assigned dog's energy, temperament, and behavior — written before meeting the dog.",
  27: "The student writes one testable hypothesis sentence about why families pass over the assigned dog, formatted 'If X is true, then we would expect to see Y when the dog is observed.'",
  // Day 13 — observation vs inference (Horowitz)
  28: "The student writes one paragraph distinguishing what counts as observation (what the dog did) from what counts as inference (what it meant), giving one example of each from a watched video clip.",
  // Day 14 — observation log
  29: "The student writes one paragraph defining one behavior they would look for in the kennel visit (pacing, leaning, hiding, tail position) and naming what observation would count as evidence for it.",
  30: "The student writes an observation-experiment plan naming the assigned dog, three behaviors to log (must include appearance and energy level), and the duration of observation.",
  // Day 15 — assumption vs reality
  31: "The student records ten observation-log entries on the assigned dog during the kennel visit, each entry timestamped and separated into observed-vs-inferred columns.",
  32: "The student writes one paragraph comparing the photo-assumption (from Day 12) to the observation-log entries, naming three places the assumption was wrong and one place it was right.",

  // ACT 4 — Why Do People Pass Them By?
  // Day 16 — testable hypothesis
  33: "The student writes one testable hypothesis sentence about why families pass over big dogs, formatted 'If X is the reason, then we would expect Y in the survey results.'",
  34: "The student writes a two-column list naming three testable beliefs (can be surveyed) and three untestable beliefs (cannot be surveyed), drawn from class brainstorm.",
  // Day 17 — survey design
  35: "The student writes two example survey questions, one qualitative (open-ended) and one quantitative (Likert or yes/no), about big-dog adoption hesitation.",
  36: "The student rewrites three leading survey questions into non-leading ones, demonstrating the technique on a checklist that must include cost, appearance, and energy level.",
  37: "The student writes a one-paragraph sampling plan naming who should complete the survey, how many respondents are needed, and one sentence on how respondents will be recruited.",
  // Day 18 — gather, tally, summarize (5 lessons, includes Excel)
  38: "The student walks one batch of 20 survey responses and marks each as strong or weak response, naming the criterion they used (effort, specificity, completeness).",
  39: "The student draws a dot plot by hand for one named survey question using the cleaned responses, naming the scale and labeling the median.",
  40: "The student draws one pie chart and one line chart from the cleaned survey data by hand, naming the data type each chart fits.",
  41: "The student builds one Excel chart (bar, line, or pie) from the cleaned survey data, manually entering the data into a spreadsheet and selecting the chart type, then writing one sentence on what Excel handled and what the student decided.",
  42: "The student walks the open-response survey answers and codes them into three named themes (e.g., cost, space, fear), writing one sentence per theme summarizing the pattern.",
  // Day 19 — correlation vs causation
  43: "The student writes one paragraph distinguishing correlation from causation using one finding from the survey data (e.g., 'apartment dwellers report cost concern more often, but the data does not show apartment-dwelling causes cost concern').",
  44: "The student writes a revised hypothesis sentence using the survey + observation data, naming one belief the original hypothesis got wrong.",
  // Day 20 — prove-it move
  45: "The student writes a one-paragraph evaluation of three named information sources (e.g., ASPCA blog, peer-reviewed study, breeder website) ranking them by credibility with one-sentence justification each.",
  46: "The student writes a one-paragraph extract from one assigned source naming three pieces of evidence that support or falsify the hypothesis from Day 19.",
  47: "The student writes a one-paragraph Seminar position statement defending one claim with two pieces of database evidence (dog bites, fatalities, cost data, housing restrictions, or breed energy levels) and one anticipated counter-argument.",
  // Day 21 — final analysis
  48: "The student writes a one-paragraph claim-with-evidence statement showing one belief from Day 16 has been falsified (with evidence) or supported (with evidence), naming the source.",

  // ACT 5 — Telling the Truth So It Moves Someone
  // Day 22 — what makes a story (Eddie + Billie)
  49: "The student writes a two-column comparison for the assigned dog: assumptions families make from the photo (Day 12) versus what the observation log proved true and false (Day 15).",
  50: "The student labels one Eddie-the-Terrible-style draft narrative with the four story elements: setup, complication, turn, payoff — naming one sentence from the draft as evidence of each.",
  51: "The student writes a one-paragraph Seminar response naming three persuasive moves Ann Handley used in the Eddie-the-Terrible post and one move that would not transfer to the assigned dog's profile card.",
  52: "The student writes a one-paragraph Seminar response specifically on the Eddie-the-Terrible reading, naming what makes the listing persuasive and one move the assigned dog's card should borrow.",
  53: "The student writes a checklist of four elements of a persuasive narrative profile (named character detail, evidence-anchored claim, emotional moment, call to action) and pairs each with one example from the Billie Jean mentor text.",
  // Day 23 — show don't tell / persuasive devices (4 lessons)
  54: "The student labels one shelter ad's components (catchy headline, body copy, slogan, logo, call to action), then writes a one-sentence critique naming which component is strongest.",
  55: "The student writes one paragraph naming the target audience for the assigned dog's profile card (e.g., young families, retirees, first-time owners) and three word choices that would shift if the audience changed.",
  56: "The student rewrites one plain description (e.g., 'he is a good dog') into one sentence using sensory-rich pathos-driven language about the assigned dog, citing one observation-log entry as the anchor.",
  57: "The student drafts one slogan and one rhetorical-question opener for the assigned dog's card, demonstrating one named persuasive device (alliteration, repetition, rhetorical question, or call-to-emotion).",
  // Day 24 — draft, peer review
  58: "The student drafts the full first-pass profile card for the assigned dog (under 100 words), written in either first-person dog perspective or third-person, naming the leading detail and the call to action.",
  59: "The student writes a peer-review response on one classmate's draft using the kind-specific-helpful protocol, naming two strengths and one specific revision proposal.",

  // ACT 6 — The Cards Go Up
  // Day 25 — finalize
  60: "The student delivers the final clean print-ready profile card for the assigned dog (under 100 words, leading detail named, call to action included), with one revision-log sentence naming the most significant change from the Day 24 draft.",
  // Day 27 — brief St. Hubert's (note: v2 inventory has concept_day_ord 27 for this; the source doc skipped 26)
  61: "The student delivers a two-minute partner briefing to St. Hubert's staff naming what the cohort learned about the adoption gap, the campaign-card strategy chosen, and one recommendation beyond the cards themselves."
};

// ─── Standards verbatim: lookup against the NJSLS DB

function lookupVerbatim(codes) {
  var out = {};
  (codes || []).forEach(function(c) {
    var rec = DB[c];
    if (rec && rec.statement) out[c] = rec.statement;
    else out[c] = "[UNVERIFIED — code not in NJSLS database; check for typos or out-of-band PE]";
  });
  return out;
}

// ─── Build the backfill sidecar

var sessionsBackfill = (inv.lessons || []).map(function(L) {
  var codes = (L.standards_inherited || []).slice();
  return {
    lesson_ord: L.lesson_ord,
    concept_day_ord: L.concept_day_ord,
    act: L.act,
    sub: L.sub || null,
    title_for_verification: L.title,
    artifact: artifactsByLessonOrd[L.lesson_ord] || "[Confirm — no v2.9.16 artifact authored yet for this lesson_ord; do not stage to year until this is filled]",
    standards_for_verification: codes,
    standardsVerbatim: lookupVerbatim(codes)
  };
});

var backfill = {
  meta: {
    source_inventory: "bigdogs_lesson_inventory_v2.json",
    builder: "build_bigdogs_v916_backfill.js",
    built_at: new Date().toISOString().slice(0, 10),
    target_prompt_version: "v2.9.16",
    description: "v2.9.16 backfill sidecar for Big Dogs. Contains the declared standards manifest (challenge-level), per-session artifact authored from the lesson title and concept progression, and per-session standardsVerbatim looked up from the NJSLS database. Apply to a v2.9.16 scope via merge on lesson_ord."
  },
  challenge: {
    title: "Why Big Dogs Get Passed Over",
    partner: "St. Hubert's Animal Welfare Center",
    cohort: "Cohort 5/6 (This is not for 7/8)",
    declaredStandardsManifest: declaredStandardsManifest,
    declaredStandardsManifestStatus: manifestStatus
  },
  sessions_backfill: sessionsBackfill,
  reconciliation: {
    sessions_with_artifact: sessionsBackfill.filter(function(s) { return s.artifact && !/^\[Confirm/.test(s.artifact); }).length,
    sessions_with_confirm_artifact: sessionsBackfill.filter(function(s) { return /^\[Confirm/.test(s.artifact); }).length,
    sessions_total: sessionsBackfill.length,
    manifest_codes_count: declaredStandardsManifest.length,
    tagged_codes_count: (inv.all_njsls_codes_tagged_unique_sorted || []).length,
    codes_in_manifest_but_not_tagged: declaredStandardsManifest.filter(function(c) {
      return (inv.all_njsls_codes_tagged_unique_sorted || []).indexOf(c) < 0;
    }),
    codes_tagged_but_not_in_manifest: (inv.all_njsls_codes_tagged_unique_sorted || []).filter(function(c) {
      return declaredStandardsManifest.indexOf(c) < 0;
    })
  }
};

var outPath = path.join(__dirname, 'bigdogs_v916_backfill.json');
fs.writeFileSync(outPath, JSON.stringify(backfill, null, 2) + '\n');

console.log('═'.repeat(60));
console.log('Big Dogs v2.9.16 backfill — built');
console.log('═'.repeat(60));
console.log('Output: ' + outPath);
console.log();
console.log('Sessions total:           ' + backfill.reconciliation.sessions_total);
console.log('Artifacts authored:       ' + backfill.reconciliation.sessions_with_artifact);
console.log('Artifacts still [Confirm]: ' + backfill.reconciliation.sessions_with_confirm_artifact);
console.log('Manifest codes:           ' + backfill.reconciliation.manifest_codes_count);
console.log('Tagged codes:             ' + backfill.reconciliation.tagged_codes_count);
console.log();
console.log('In manifest but not tagged (Stage-6 MISSING candidates):');
backfill.reconciliation.codes_in_manifest_but_not_tagged.forEach(function(c) { console.log('  - ' + c); });
console.log();
console.log('Tagged but not in manifest (Stage-6 SCOPE CREEP candidates):');
backfill.reconciliation.codes_tagged_but_not_in_manifest.forEach(function(c) { console.log('  - ' + c); });
console.log('═'.repeat(60));
