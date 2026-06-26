# WHY BIG DOGS GET PASSED OVER

## Lesson organization for partner briefing

Challenge: "Why Big Dogs Get Passed Over"
Partner: St. Hubert's Animal Welfare Center
Cohort 5/6 (This is not for 7/8)
Source: `bigdogs_lesson_inventory.json`, 26 concept days, 56 lessons
Authentic impact (verbatim from source): Students will produce narrative profile cards for individual big dogs, written for the families walking the adoption kennels at St. Hubert's, by turning each dog's real history and observed behavior into a short, honest story that reframes the size that made adopters hesitate. The cards are printed and clipped to each dog's kennel. The cohort then briefs St. Hubert's, handing off the cards and explaining the thinking behind the campaign.

---

# CHANGELOG

**Layer 1 (Organize).** Input is already sorted by act ascending, concept day ascending, lesson ordinal ascending. No reordering applied. Lesson count after Layer 1: 56.

**Layer 2 (Flag).** Walked all 56 lessons. Flags emitted by type:

| Flag | Count | Lessons |
|---|---|---|
| DUPE | 0 | none |
| NEAR-DUPE | 3 pairs | (L17 + L21), (L8 + L44), (L24 + L30) |
| NONSENSE | 0 | none |
| ORPHAN | 7 | L25, L26, L27, L28, L29, L30, L31 |
| GHOST | 5 | L10, L11, L12, L13, L14 |
| EVIDENCE-MISMATCH | 4 | L49, L50, L51, L52 |
| AUDIT-NOTE | 14 | L1, L2, L3, L4, L9, L15, L35, L36, L37, L38, L39, L40, L44 (some lessons carry the GHOST flag in addition) |

**Layer 3 (Merge / Drop / Hold-for-review).**

No DUPE actions: 0 MERGED entries.
No NONSENSE actions: 0 HOLD-FOR-REVIEW entries.

NEAR-DUPE entries (recorded, not auto-merged):

```
NEAR-DUPE L17 + L21 · titles differ by "trait research" (L17, Day 9) vs "role research" (L21, Day 11) · recommendation: keep both (each anchors a distinct concept day in the breeding arc)
NEAR-DUPE L8 + L44 · titles differ by "in conclusion of data analysis" (L8, Day 5, Act 1) vs "with evidence or falsify claims" (L44, Day 21, Act 4) · recommendation: keep both (L8 closes the Act 1 data claim; L44 is the Act 4 evidence test)
NEAR-DUPE L24 + L30 · titles differ by "based on animal traits" (L24, Day 12, Act 3) vs "introduce and model" (L30, Day 16, Act 4) · recommendation: keep both (L24 is the Act 3 photo-assumption hypothesis; L30 is the formal Act 4 testable-hypothesis lesson)
```

Working set after Layer 3: 56 lessons. None merged.

---

# STAGE 2. PROSE NARRATIVE

## Act 1. Is This Even True?

The driving question is "Is this even true?" Students open the challenge by writing a first prediction about one long-stay dog at St. Hubert's (L1). They then meet the shelter's adoption data, working through tables and bar graphs (L2, L3, L4), then unit rates and adoption rates (L5), then misleading comparisons and hidden factors (L6). They close the act by drawing the conclusion (L7) and writing it up as a claim backed by evidence (L8).

The evidence the act produces (verbatim): "Initial analysis of adoption data and a written claim about whether a real adoption gap exists."

Flags in this Act. The audit flagged the 6.SP.B.4 tag on Day 2 (L2 through L4) as WEAK because those lessons read and interpret graphs while SP.B.4's statement is about displaying plots on a number line. The audit also flagged the SL.PE.6.1 tag on Day 1 (L1) as STRETCH because L1 is a solo-write task, not a collaborative discussion. Both flags carry forward into the heat map.

## Act 2. How a Wolf Became Both a Great Dane and a German Shepherd

The driving question is "How did dogs come from wolves at all?" Students open the act by writing a first explanation to revise: a chihuahua and a great dane are the same animal (L9). They then move into the biology block. Day 7 covers genes (L10), dominant vs. recessive traits (L11), inheritance (L12), variation (L13), and Punnett squares (L14), with the note that L13 and L14 fall on the same day. Day 8 covers natural selection through the wolf-to-dog domestication story (L15). Day 9 covers selective breeding through the border collie reading and breed-trait research (L16, L17). Day 10 covers polygenic inheritance, adaptation, and breeding for polygenic traits (L18, L19, L20). Day 11 synthesizes by researching specific breed roles and connecting traits to those roles (L21, L22), which is the act's evidence.

The evidence the act produces (verbatim): "Explanation of how domestication and selective breeding produced modern dog breeds."

Flags in this Act. The 3-LS3-1 tag on Day 7 (L10 through L14) is GHOST: grade 3 PE, not in the 5-8 NJSLS band. The in-band replacement is MS-LS3-2. The MS-LS4-4 tag on Day 8 (L15) is STRETCH: wolf-to-dog domestication is artificial selection, but LS4-4 names natural selection. The SL.PE.6.1 tag on Day 6 (L9) is STRETCH for the same reason as L1. L17 and L21 are recorded as a NEAR-DUPE on the "research breeds" noun phrase, kept distinct because L17 anchors traits research and L21 anchors roles research.

## Act 3. Meet Your Dog

The driving question is "What's your dog actually like?" Each student is assigned one real big dog. Before meeting the dog, students write a photo assumption (L23) and form a hypothesis about why big dogs are adopted less often (L24). Day 13 teaches what makes a good observation (L25). Day 14 covers ethology and observation experiment design (L26, L27). Day 15 closes the act with pattern identification in the observation logs and drawing inferences against the initial assumptions (L28, L29).

The evidence the act produces (verbatim): "A written assumption based on the dog's photo, a structured observation log, and a comparison of the two."

Flags in this Act. Five lessons (L25, L26, L27, L28, L29) are ORPHAN: the concept days' standards fields carry only NGSS Science and Engineering Practice placeholders (Constructing Explanations, Planning and Carrying Out Investigations, Argument from Evidence), no NJSLS code. The workbench heat map reads these as untagged. The act is real scientific work, but the heat map cannot see it.

## Act 4. Why Do People Pass Them By?

The driving question is "Why do people pass them by?" Students commit to a hypothesis, gather evidence, and test beliefs against facts. Day 16 introduces formal testable-hypothesis writing (L30) and brainstorming what can be proven versus what cannot (L31). Day 17 builds the survey work: qualitative vs. quantitative (L32), writing unbiased questions including cost, appearance, and energy level (L33), and sampling design (L34). Day 18 runs the analysis block: cleaning data (L35), visualizing with dot plots (L36), charting (L37), and identifying themes (L38). Day 19 covers correlation vs. causation and revising the hypothesis against observation and survey data (L39, L40). Day 20 turns to source-based evidence: identifying good resources (L41), pulling supporting evidence from those resources (L42), and a seminar to question and defend claims using databases (L43, named "Seminar" in the doc). Day 21 closes the act by teaching how to support a claim with evidence or falsify it (L44).

The evidence the act produces (verbatim): "Survey findings, evidence checks, and conclusions supported by data."

Flags in this Act. Day 16 (L30, L31) is ORPHAN: SEP placeholder only, no NJSLS code on either lesson. The W.SE.6.6 tag on Day 18 (L35 through L38) is STRETCH because survey responses students collected themselves are not the multi-source print or digital evidence with source credibility assessment that the standard names. The RI.AA.6.7 tag on Day 19 (L39, L40) and Day 21 (L44) is STRETCH on the writing-side lessons because students are writing or revising their own claim rather than tracing an author's argument in a text. L24 and L30 are recorded as a NEAR-DUPE on the hypothesis-formation noun phrase, kept distinct because L24 is the Act 3 photo-assumption work and L30 is the Act 4 formal testable hypothesis. L8 and L44 are recorded as a NEAR-DUPE on the "claim with evidence" noun phrase, kept distinct because L8 closes Act 1 with a data-backed claim and L44 is the Act 4 evidence test.

## Act 5. Telling the Truth So It Moves Someone

The driving question is "How do stories move people?" Students turn observations into stories. Day 22 opens with picking the strongest moment: what assumptions about the chosen dog hold up and which do not (L45), introduction to story structure (L46), reading the Eddie the Terrible mentor text and discussing what makes it persuasive (L47), and identifying elements of a persuasive narrative (L48). Day 23 shifts into media literacy and persuasion: anatomy of an ad (L49), identifying target audience (L50), emotional appeal via pathos (L51), and persuasive devices (L52). Day 24 closes the act with the draft cycle: modeling a draft with perspective and voice (L53), and peer review with a re-norming of kind, specific, and helpful (L54).

The evidence the act produces (verbatim): "Draft profile cards and reader feedback."

Flags in this Act. The four Day 23 lessons (L49, L50, L51, L52) carry EVIDENCE-MISMATCH against Day 23's stated evidence text. The concept day header reads "Show, don't tell; sequence the profile" and the evidence reads "Show character in scenes; build the sequence", but the four lessons are an ad-analysis and persuasion block. The doc's own expanded-detail summary acknowledges the shift, but the day header still names a narrative-writing arc. Day 22's evidence text also reintroduces "opinion statement" (a K-5 vocabulary item), which Anand's Standards Check retired for grade 6 in favor of "argument" and "claim". This is recorded in the source JSON as an `evidence_vocab_drift_flag` and is worth raising in the briefing.

## Act 6. The Cards Go Up

The driving question is "What do we owe the shelter?" Students finalize the card with draft revisions (L55) and brief St. Hubert's (L56).

The evidence the act produces (verbatim): "Final profile cards and partner briefing."

Flags in this Act. No flags on the two tagged lessons. I am noting separately that the source JSON's `untagged_act6_rows_from_upper_table` array carries three additional Act 6 rows from the upper table that were not assigned L# in the lesson list: "Evaluating Speakers", "Sequencing presentations logically", and "Speaking well". These exist in the source document, are not represented as lessons in the inventory, and would carry presentation-skills instruction if formalized. I am inferring that the briefing should mention this gap; the JSON does not assert it.

---

# STAGE 3. CLEAN LESSON LIST GROUPED BY ACT

## Act 1. Is This Even True?

— Day 1 — Meet the long-stay dog; write a first prediction —

```
L1 · Day 1
  Title: Meet the long-stay dog; write a first prediction
  Concept Progression: Meet the long-stay dog; write a first prediction
  Evidence (drives at): A prediction to test later
  Standards: SL.PE.6.1
  Flags: AUDIT-NOTE (SL.PE.6.1 STRETCH: solo-write task, not collaborative discussion)
```

— Day 2 — Read and interpret the shelter's tables and bar graphs —

```
L2 · Day 2 · L1
  Title: Introduce the data
  Concept Progression: Read and interpret the shelter's tables and bar graphs
  Evidence (drives at): Extract info from tables and graphs. What information can they gather from the website.
  Standards: 6.SP.B.4
  Flags: AUDIT-NOTE (6.SP.B.4 WEAK: lessons read and interpret graphs; SP.B.4 statement is about displaying plots on a number line)

L3 · Day 2 · L2
  Title: Introduce graphs (bar, line, pie)
  Concept Progression: Read and interpret the shelter's tables and bar graphs
  Evidence (drives at): Extract info from tables and graphs. What information can they gather from the website.
  Standards: 6.SP.B.4
  Flags: AUDIT-NOTE (6.SP.B.4 WEAK)

L4 · Day 2 · L3
  Title: Interpret graphs
  Concept Progression: Read and interpret the shelter's tables and bar graphs
  Evidence (drives at): Extract info from tables and graphs. What information can they gather from the website.
  Standards: 6.SP.B.4
  Flags: AUDIT-NOTE (6.SP.B.4 WEAK)
```

— Day 3 — Counts vs. rates; calculate an adoption rate —

```
L5 · Day 3 · L1
  Title: Percentage vs number
  Concept Progression: Counts vs. rates; calculate an adoption rate
  Evidence (drives at): Calculate adoption rates
  Standards: 6.RP.A.2
  Flags: none
```

— Day 4 — Compare unequal groups by rate; spot the hidden factor —

```
L6 · Day 4 · L1
  Title: How the presentation of information can be misleading; what else are hidden factors
  Concept Progression: Compare unequal groups by rate; spot the hidden factor
  Evidence (drives at): Compare fairly; name the hidden factor
  Standards: 6.RP.A.3
  Flags: none
```

— Day 5 — Write a data-backed claim (Act 1 evidence) —

```
L7 · Day 5 · L1
  Title: How to draw the conclusion
  Concept Progression: Write a data-backed claim (Act 1 evidence)
  Evidence (drives at): Defend a conclusion using data
  Standards: 6.SP.B.5, W.AW.6.1
  Flags: none

L8 · Day 5 · L2
  Title: How to write up claim with evidence
  Concept Progression: Write a data-backed claim (Act 1 evidence)
  Evidence (drives at): Defend a conclusion using data
  Standards: 6.SP.B.5, W.AW.6.1
  Flags: NEAR-DUPE (paired with L44 on "claim with evidence"; kept distinct)
```

## Act 2. How a Wolf Became Both a Great Dane and a German Shepherd

— Day 6 — Same species? Write a first explanation to revise —

```
L9 · Day 6 · L1
  Title: Species vs breeds
  Concept Progression: Same species? Write a first explanation to revise
  Evidence (drives at): A starting explanation of how a chihuahua and a great dane are the same animal
  Standards: SL.PE.6.1
  Flags: AUDIT-NOTE (SL.PE.6.1 STRETCH)
```

— Day 7 — Inheritance and variation —

```
L10 · Day 7 · L1
  Title: Genes
  Concept Progression: Inheritance and variation
  Evidence (drives at): Explain inheritance; identify variation. L4 and L5 same day.
  Standards: 3-LS3-1
  Flags: GHOST (3-LS3-1: grade 3 PE; not in 5-8 NJSLS band; in-band replacement is MS-LS3-2); AUDIT-NOTE

L11 · Day 7 · L2
  Title: Traits - Dominant vs Recessive
  Concept Progression: Inheritance and variation
  Evidence (drives at): Explain inheritance; identify variation. L4 and L5 same day.
  Standards: 3-LS3-1
  Flags: GHOST; AUDIT-NOTE

L12 · Day 7 · L3
  Title: Inheritance - how traits are passed down
  Concept Progression: Inheritance and variation
  Evidence (drives at): Explain inheritance; identify variation. L4 and L5 same day.
  Standards: 3-LS3-1
  Flags: GHOST; AUDIT-NOTE

L13 · Day 7 · L4
  Title: Variation - How traits vary in the same species
  Concept Progression: Inheritance and variation
  Evidence (drives at): Explain inheritance; identify variation. L4 and L5 same day.
  Standards: 3-LS3-1
  Flags: GHOST; AUDIT-NOTE

L14 · Day 7 · L5
  Title: Punnett Squares
  Concept Progression: Inheritance and variation
  Evidence (drives at): Explain inheritance; identify variation. L4 and L5 same day.
  Standards: 3-LS3-1
  Flags: GHOST; AUDIT-NOTE
```

— Day 8 — Wolf to dog (fox story told aloud) —

```
L15 · Day 8 · L1
  Title: What is natural selection
  Concept Progression: Wolf to dog (fox story told aloud)
  Evidence (drives at): Explain how domestication changed wolves
  Standards: MS-LS4-4
  Flags: AUDIT-NOTE (MS-LS4-4 STRETCH: wolf-to-dog domestication is artificial selection; LS4-4 names natural selection)
```

— Day 9 — Bred for a job (border collie reading) —

```
L16 · Day 9 · L1
  Title: Read and discuss border collie reading
  Concept Progression: Bred for a job (border collie reading)
  Evidence (drives at): Tie a breed trait to its original job
  Standards: MS-LS4-5
  Flags: none

L17 · Day 9 · L2
  Title: Research specific breed traits and summarize findings
  Concept Progression: Bred for a job (border collie reading)
  Evidence (drives at): Tie a breed trait to its original job
  Standards: MS-LS4-5
  Flags: NEAR-DUPE (paired with L21 on "research breeds"; kept distinct)
```

— Day 10 — Model a trait spreading over generations —

```
L18 · Day 10 · L1
  Title: Polygenic Inheritance
  Concept Progression: Model a trait spreading over generations
  Evidence (drives at): Model a trait becoming more common
  Standards: MS-LS4-6
  Flags: none

L19 · Day 10 · L2
  Title: Adaptation - how some traits increase survival over time
  Concept Progression: Model a trait spreading over generations
  Evidence (drives at): Model a trait becoming more common
  Standards: MS-LS4-6
  Flags: none

L20 · Day 10 · L3
  Title: Breeding dogs for polygenic traits (size, weight, behavior)
  Concept Progression: Model a trait spreading over generations
  Evidence (drives at): Model a trait becoming more common
  Standards: MS-LS4-6
  Flags: none
```

— Day 11 — Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization —

```
L21 · Day 11 · L1
  Title: Research the roles of specific breeds
  Concept Progression: Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization
  Evidence (drives at): The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds
  Standards: MS-LS4-5, MS-LS4-6
  Flags: NEAR-DUPE (paired with L17 on "research breeds"; kept distinct)

L22 · Day 11 · L2
  Title: Connect the traits (appearance and behavior) that were bred for these roles
  Concept Progression: Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization
  Evidence (drives at): The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds
  Standards: MS-LS4-5, MS-LS4-6
  Flags: none
```

## Act 3. Meet Your Dog

— Day 12 — Write the photo assumption - What assumptions might people make about this dog? —

```
L23 · Day 12 · L1
  Title: Define assumption vs observation (picture of dog activity)
  Concept Progression: Write the photo assumption - What assumptions might people make about this dog?
  Evidence (drives at): State the photo assumption
  Standards: SL.PE.6.1
  Flags: none

L24 · Day 12 · L2
  Title: Forming a hypothesis based on animal traits and behavior
  Concept Progression: Write the photo assumption - What assumptions might people make about this dog?
  Evidence (drives at): State the photo assumption
  Standards: SL.PE.6.1
  Flags: NEAR-DUPE (paired with L30 on hypothesis formation; kept distinct)
```

— Day 13 — Observation vs. inference (Horowitz aloud) —

```
L25 · Day 13 · L1
  Title: What makes a good observation? (Practices of good observation)
  Concept Progression: Observation vs. inference (Horowitz aloud)
  Evidence (drives at): Separate observed from concluded
  Standards: none tagged
  Flags: ORPHAN (concept day standards_raw = SEP placeholder only)
```

— Day 14 — Meet the dog; keep an observation log —

```
L26 · Day 14 · L1
  Title: Observing animal behavior - What does it tell us? (ethology)
  Concept Progression: Meet the dog; keep an observation log
  Evidence (drives at): Maintain a structured log
  Standards: none tagged
  Flags: ORPHAN

L27 · Day 14 · L2
  Title: Designing observation experiments for our dogs
  Concept Progression: Meet the dog; keep an observation log
  Evidence (drives at): Maintain a structured log
  Standards: none tagged
  Flags: ORPHAN
```

— Day 15 — Assumption vs. reality (Act 3 evidence) —

```
L28 · Day 15 · L1
  Title: Identifying patterns in animal behavior - Identifying patterns in our observational logs
  Concept Progression: Assumption vs. reality (Act 3 evidence)
  Evidence (drives at): Revise when observations contradict
  Standards: none tagged
  Flags: ORPHAN

L29 · Day 15 · L2
  Title: Drawing inferences from the patterns; compare to initial assumptions
  Concept Progression: Assumption vs. reality (Act 3 evidence)
  Evidence (drives at): Revise when observations contradict
  Standards: none tagged
  Flags: ORPHAN
```

## Act 4. Why Do People Pass Them By?

— Day 16 — Write a testable hypothesis —

```
L30 · Day 16 · L1
  Title: Introduce and model how to create a testable hypothesis
  Concept Progression: Write a testable hypothesis
  Evidence (drives at): Write a testable hypothesis
  Standards: none tagged
  Flags: ORPHAN; NEAR-DUPE (paired with L24 on hypothesis formation; kept distinct)

L31 · Day 16 · L2
  Title: What can we prove / test for — brainstorm testable reasons people might have for not adopting big dogs
  Concept Progression: Write a testable hypothesis
  Evidence (drives at): Write a testable hypothesis
  Standards: none tagged
  Flags: ORPHAN
```

— Day 17 — Design non-leading survey/interview questions —

```
L32 · Day 17 · L1
  Title: Why are surveys useful? Qualitative vs. Quantitative
  Concept Progression: Design non-leading survey/interview questions
  Evidence (drives at): Write non-leading questions
  Standards: W.WR.6.5
  Flags: none

L33 · Day 17 · L2
  Title: How to write good survey questions (avoid leading questions, avoid testing friends; must include cost, appearance, energy level)
  Concept Progression: Design non-leading survey/interview questions
  Evidence (drives at): Write non-leading questions
  Standards: W.WR.6.5
  Flags: none

L34 · Day 17 · L3
  Title: Sampling and respondent pool: who should complete the survey, how many people
  Concept Progression: Design non-leading survey/interview questions
  Evidence (drives at): Write non-leading questions
  Standards: W.WR.6.5
  Flags: none
```

— Day 18 — Gather, tally, and summarize responses —

```
L35 · Day 18 · L1
  Title: Cleaning data (strong response vs weak response)
  Concept Progression: Gather, tally, and summarize responses
  Evidence (drives at): Organize and summarize results
  Standards: W.SE.6.6, 6.SP.B.5
  Flags: AUDIT-NOTE (W.SE.6.6 STRETCH: survey responses students collected themselves are not multi-source print/digital evidence with credibility assessment)

L36 · Day 18 · L2
  Title: Visualize data - dot plot
  Concept Progression: Gather, tally, and summarize responses
  Evidence (drives at): Organize and summarize results
  Standards: W.SE.6.6, 6.SP.B.5
  Flags: AUDIT-NOTE (W.SE.6.6 STRETCH)

L37 · Day 18 · L3
  Title: Charting data (pie charts, line charts - quantitative)
  Concept Progression: Gather, tally, and summarize responses
  Evidence (drives at): Organize and summarize results
  Standards: W.SE.6.6, 6.SP.B.5
  Flags: AUDIT-NOTE (W.SE.6.6 STRETCH)

L38 · Day 18 · L4
  Title: Identifying themes (patterns - qualitative)
  Concept Progression: Gather, tally, and summarize responses
  Evidence (drives at): Organize and summarize results
  Standards: W.SE.6.6, 6.SP.B.5
  Flags: AUDIT-NOTE (W.SE.6.6 STRETCH)
```

— Day 19 — Test beliefs against facts (Act 4 evidence) —

```
L39 · Day 19 · L1
  Title: Informal introduction to correlation vs causation
  Concept Progression: Test beliefs against facts (Act 4 evidence)
  Evidence (drives at): Evaluate evidence; spot overreach; revise a belief
  Standards: RI.AA.6.7
  Flags: AUDIT-NOTE (RI.AA.6.7 STRETCH: writing-side lesson; students are not tracing an author's argument in a text)

L40 · Day 19 · L2
  Title: Revising hypothesis against data from observation and survey
  Concept Progression: Test beliefs against facts (Act 4 evidence)
  Evidence (drives at): Evaluate evidence; spot overreach; revise a belief
  Standards: RI.AA.6.7
  Flags: AUDIT-NOTE (RI.AA.6.7 STRETCH)
```

— Day 20 — The 'prove it' move: label (preconceptions) to evidence —

```
L41 · Day 20 · L1
  Title: How to identify good resources
  Concept Progression: The 'prove it' move: label (preconceptions) to evidence
  Evidence (drives at): Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)
  Standards: W.AW.6.1
  Flags: none

L42 · Day 20 · L2
  Title: Identifying supporting evidence in the resource for supporting the hypothesis
  Concept Progression: The 'prove it' move: label (preconceptions) to evidence
  Evidence (drives at): Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)
  Standards: W.AW.6.1
  Flags: none

L43 · Day 20 · Seminar
  Title: Seminar: question and defend your claims (Explore facts from databases — dog bites, fatalities, cost using medication and food costs, housing restrictions, size vs breed energy levels)
  Concept Progression: The 'prove it' move: label (preconceptions) to evidence
  Evidence (drives at): Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.)
  Standards: W.AW.6.1
  Flags: none
```

— Day 21 — Claim only what you saw. Final analysis. —

```
L44 · Day 21 · L1
  Title: How to support a claim with evidence or falsify claims
  Concept Progression: Claim only what you saw. Final analysis.
  Evidence (drives at): Spot and fix overclaiming - grounding in evidence 'What can you support with evidence?'
  Standards: W.AW.6.1, RI.AA.6.7
  Flags: AUDIT-NOTE (RI.AA.6.7 STRETCH); NEAR-DUPE (paired with L8 on "claim with evidence"; kept distinct)
```

## Act 5. Telling the Truth So It Moves Someone

— Day 22 — What makes a story (Eddie + Billie mentor texts) —

```
L45 · Day 22 · L1
  Title: Based on your findings, what are people assuming about our chosen dog that are true and what things aren't true (pick a dog)
  Concept Progression: What makes a story (Eddie + Billie mentor texts)
  Evidence (drives at): Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion.
  Standards: W.NW.6.3
  Flags: none

L46 · Day 22 · L2
  Title: Introduction to story structure
  Concept Progression: What makes a story (Eddie + Billie mentor texts)
  Evidence (drives at): Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion.
  Standards: W.NW.6.3
  Flags: none

L47 · Day 22 · L3
  Title: Writing to seminar — read Eddie the Terrible blog and discuss what makes it persuasive
  Concept Progression: What makes a story (Eddie + Billie mentor texts)
  Evidence (drives at): Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion.
  Standards: W.NW.6.3
  Flags: none

L48 · Day 22 · L4
  Title: Identifying elements of a persuasive narrative
  Concept Progression: What makes a story (Eddie + Billie mentor texts)
  Evidence (drives at): Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion.
  Standards: W.NW.6.3
  Flags: none
```

— Day 23 — Show, don't tell; sequence the profile —

```
L49 · Day 23 · L1
  Title: Anatomy of an Ad
  Concept Progression: Show, don't tell; sequence the profile
  Evidence (drives at): Show character in scenes; build the sequence
  Standards: W.NW.6.3
  Flags: EVIDENCE-MISMATCH (lesson is media literacy / ad analysis; day evidence is character-in-scenes narrative)

L50 · Day 23 · L2
  Title: Identifying Target Audience
  Concept Progression: Show, don't tell; sequence the profile
  Evidence (drives at): Show character in scenes; build the sequence
  Standards: W.NW.6.3
  Flags: EVIDENCE-MISMATCH

L51 · Day 23 · L3
  Title: Emotional Appeal (Pathos)
  Concept Progression: Show, don't tell; sequence the profile
  Evidence (drives at): Show character in scenes; build the sequence
  Standards: W.NW.6.3
  Flags: EVIDENCE-MISMATCH

L52 · Day 23 · L4
  Title: Persuasive Devices
  Concept Progression: Show, don't tell; sequence the profile
  Evidence (drives at): Show character in scenes; build the sequence
  Standards: W.NW.6.3
  Flags: EVIDENCE-MISMATCH
```

— Day 24 — Draft, test on a reader, revise (Act 5 evidence) —

```
L53 · Day 24 · L1
  Title: Modeling how to draft your dog card — what perspective, how you want to write it
  Concept Progression: Draft, test on a reader, revise (Act 5 evidence)
  Evidence (drives at): Revise from reader feedback
  Standards: W.WP.6.4
  Flags: none

L54 · Day 24 · L2
  Title: Peer review of drafts (re-norm kind, specific, helpful to start class)
  Concept Progression: Draft, test on a reader, revise (Act 5 evidence)
  Evidence (drives at): Revise from reader feedback
  Standards: W.WP.6.4
  Flags: none
```

## Act 6. The Cards Go Up

— Day 25 — Finalize the card —

```
L55 · Day 25
  Title: Finalize the card — draft revisions (put it all together)
  Concept Progression: Finalize the card
  Evidence (drives at): Create the final profile card. Doc also notes: Explanation and Presentation of Cards; Recommendations to solve the Big Dog Challenge.
  Standards: W.NW.6.3, W.AW.6.1
  Flags: none
```

— Day 26 — Brief St. Hubert's (Act 6 evidence) —

```
L56 · Day 26
  Title: Brief St. Hubert's
  Concept Progression: Brief St. Hubert's (Act 6 evidence)
  Evidence (drives at): Final cards and partner briefing
  Standards: SL.PI.6.4, SL.UM.6.5
  Flags: none
```

---

# STAGE 4. SEQUENCE TABLE APPENDIX

| # | Act | Day | L# | Title | Concept Progression | Evidence (drives at) | Standards | Flags |
|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | L1 | Meet the long-stay dog; write a first prediction | Meet the long-stay dog; write a first prediction | A prediction to test later | SL.PE.6.1 | AUDIT-NOTE |
| 2 | 1 | 2 | L2 | Introduce the data | Read and interpret the shelter's tables and bar graphs | Extract info from tables and graphs. What information can they gather from the website. | 6.SP.B.4 | AUDIT-NOTE |
| 3 | 1 | 2 | L3 | Introduce graphs (bar, line, pie) | Read and interpret the shelter's tables and bar graphs | Extract info from tables and graphs. What information can they gather from the website. | 6.SP.B.4 | AUDIT-NOTE |
| 4 | 1 | 2 | L4 | Interpret graphs | Read and interpret the shelter's tables and bar graphs | Extract info from tables and graphs. What information can they gather from the website. | 6.SP.B.4 | AUDIT-NOTE |
| 5 | 1 | 3 | L5 | Percentage vs number | Counts vs. rates; calculate an adoption rate | Calculate adoption rates | 6.RP.A.2 | none |
| 6 | 1 | 4 | L6 | How the presentation of information can be misleading; what else are hidden factors | Compare unequal groups by rate; spot the hidden factor | Compare fairly; name the hidden factor | 6.RP.A.3 | none |
| 7 | 1 | 5 | L7 | How to draw the conclusion | Write a data-backed claim (Act 1 evidence) | Defend a conclusion using data | 6.SP.B.5, W.AW.6.1 | none |
| 8 | 1 | 5 | L8 | How to write up claim with evidence | Write a data-backed claim (Act 1 evidence) | Defend a conclusion using data | 6.SP.B.5, W.AW.6.1 | NEAR-DUPE |
| 9 | 2 | 6 | L9 | Species vs breeds | Same species? Write a first explanation to revise | A starting explanation of how a chihuahua and a great dane are the same animal | SL.PE.6.1 | AUDIT-NOTE |
| 10 | 2 | 7 | L10 | Genes | Inheritance and variation | Explain inheritance; identify variation. L4 and L5 same day. | 3-LS3-1 | GHOST, AUDIT-NOTE |
| 11 | 2 | 7 | L11 | Traits - Dominant vs Recessive | Inheritance and variation | Explain inheritance; identify variation. L4 and L5 same day. | 3-LS3-1 | GHOST, AUDIT-NOTE |
| 12 | 2 | 7 | L12 | Inheritance - how traits are passed down | Inheritance and variation | Explain inheritance; identify variation. L4 and L5 same day. | 3-LS3-1 | GHOST, AUDIT-NOTE |
| 13 | 2 | 7 | L13 | Variation - How traits vary in the same species | Inheritance and variation | Explain inheritance; identify variation. L4 and L5 same day. | 3-LS3-1 | GHOST, AUDIT-NOTE |
| 14 | 2 | 7 | L14 | Punnett Squares | Inheritance and variation | Explain inheritance; identify variation. L4 and L5 same day. | 3-LS3-1 | GHOST, AUDIT-NOTE |
| 15 | 2 | 8 | L15 | What is natural selection | Wolf to dog (fox story told aloud) | Explain how domestication changed wolves | MS-LS4-4 | AUDIT-NOTE |
| 16 | 2 | 9 | L16 | Read and discuss border collie reading | Bred for a job (border collie reading) | Tie a breed trait to its original job | MS-LS4-5 | none |
| 17 | 2 | 9 | L17 | Research specific breed traits and summarize findings | Bred for a job (border collie reading) | Tie a breed trait to its original job | MS-LS4-5 | NEAR-DUPE |
| 18 | 2 | 10 | L18 | Polygenic Inheritance | Model a trait spreading over generations | Model a trait becoming more common | MS-LS4-6 | none |
| 19 | 2 | 10 | L19 | Adaptation - how some traits increase survival over time | Model a trait spreading over generations | Model a trait becoming more common | MS-LS4-6 | none |
| 20 | 2 | 10 | L20 | Breeding dogs for polygenic traits (size, weight, behavior) | Model a trait spreading over generations | Model a trait becoming more common | MS-LS4-6 | none |
| 21 | 2 | 11 | L21 | Research the roles of specific breeds | Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization | The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds | MS-LS4-5, MS-LS4-6 | NEAR-DUPE |
| 22 | 2 | 11 | L22 | Connect the traits (appearance and behavior) that were bred for these roles | Explain the breeds (Act 2 evidence) — Dog Breed traits and role specialization | The Act 2 explanation - Explanation of how domestication and selective breeding produced modern dog breeds and define linked behaviors for specific breeds | MS-LS4-5, MS-LS4-6 | none |
| 23 | 3 | 12 | L23 | Define assumption vs observation (picture of dog activity) | Write the photo assumption - What assumptions might people make about this dog? | State the photo assumption | SL.PE.6.1 | none |
| 24 | 3 | 12 | L24 | Forming a hypothesis based on animal traits and behavior | Write the photo assumption - What assumptions might people make about this dog? | State the photo assumption | SL.PE.6.1 | NEAR-DUPE |
| 25 | 3 | 13 | L25 | What makes a good observation? (Practices of good observation) | Observation vs. inference (Horowitz aloud) | Separate observed from concluded | none tagged | ORPHAN |
| 26 | 3 | 14 | L26 | Observing animal behavior - What does it tell us? (ethology) | Meet the dog; keep an observation log | Maintain a structured log | none tagged | ORPHAN |
| 27 | 3 | 14 | L27 | Designing observation experiments for our dogs | Meet the dog; keep an observation log | Maintain a structured log | none tagged | ORPHAN |
| 28 | 3 | 15 | L28 | Identifying patterns in animal behavior - Identifying patterns in our observational logs | Assumption vs. reality (Act 3 evidence) | Revise when observations contradict | none tagged | ORPHAN |
| 29 | 3 | 15 | L29 | Drawing inferences from the patterns; compare to initial assumptions | Assumption vs. reality (Act 3 evidence) | Revise when observations contradict | none tagged | ORPHAN |
| 30 | 4 | 16 | L30 | Introduce and model how to create a testable hypothesis | Write a testable hypothesis | Write a testable hypothesis | none tagged | ORPHAN, NEAR-DUPE |
| 31 | 4 | 16 | L31 | What can we prove / test for — brainstorm testable reasons people might have for not adopting big dogs | Write a testable hypothesis | Write a testable hypothesis | none tagged | ORPHAN |
| 32 | 4 | 17 | L32 | Why are surveys useful? Qualitative vs. Quantitative | Design non-leading survey/interview questions | Write non-leading questions | W.WR.6.5 | none |
| 33 | 4 | 17 | L33 | How to write good survey questions (avoid leading questions, avoid testing friends; must include cost, appearance, energy level) | Design non-leading survey/interview questions | Write non-leading questions | W.WR.6.5 | none |
| 34 | 4 | 17 | L34 | Sampling and respondent pool: who should complete the survey, how many people | Design non-leading survey/interview questions | Write non-leading questions | W.WR.6.5 | none |
| 35 | 4 | 18 | L35 | Cleaning data (strong response vs weak response) | Gather, tally, and summarize responses | Organize and summarize results | W.SE.6.6, 6.SP.B.5 | AUDIT-NOTE |
| 36 | 4 | 18 | L36 | Visualize data - dot plot | Gather, tally, and summarize responses | Organize and summarize results | W.SE.6.6, 6.SP.B.5 | AUDIT-NOTE |
| 37 | 4 | 18 | L37 | Charting data (pie charts, line charts - quantitative) | Gather, tally, and summarize responses | Organize and summarize results | W.SE.6.6, 6.SP.B.5 | AUDIT-NOTE |
| 38 | 4 | 18 | L38 | Identifying themes (patterns - qualitative) | Gather, tally, and summarize responses | Organize and summarize results | W.SE.6.6, 6.SP.B.5 | AUDIT-NOTE |
| 39 | 4 | 19 | L39 | Informal introduction to correlation vs causation | Test beliefs against facts (Act 4 evidence) | Evaluate evidence; spot overreach; revise a belief | RI.AA.6.7 | AUDIT-NOTE |
| 40 | 4 | 19 | L40 | Revising hypothesis against data from observation and survey | Test beliefs against facts (Act 4 evidence) | Evaluate evidence; spot overreach; revise a belief | RI.AA.6.7 | AUDIT-NOTE |
| 41 | 4 | 20 | L41 | How to identify good resources | The 'prove it' move: label (preconceptions) to evidence | Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.) | W.AW.6.1 | none |
| 42 | 4 | 20 | L42 | Identifying supporting evidence in the resource for supporting the hypothesis | The 'prove it' move: label (preconceptions) to evidence | Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.) | W.AW.6.1 | none |
| 43 | 4 | 20 | L43 | Seminar: question and defend your claims (Explore facts from databases — dog bites, fatalities, cost using medication and food costs, housing restrictions, size vs breed energy levels) | The 'prove it' move: label (preconceptions) to evidence | Replace labels with observed detail. ('The things we're seeing in the survey - this is why they're not true or why this is true.' The validity of the reasons.) | W.AW.6.1 | none |
| 44 | 4 | 21 | L44 | How to support a claim with evidence or falsify claims | Claim only what you saw. Final analysis. | Spot and fix overclaiming - grounding in evidence 'What can you support with evidence?' | W.AW.6.1, RI.AA.6.7 | AUDIT-NOTE, NEAR-DUPE |
| 45 | 5 | 22 | L45 | Based on your findings, what are people assuming about our chosen dog that are true and what things aren't true (pick a dog) | What makes a story (Eddie + Billie mentor texts) | Pick the strongest moment; structure a profile. Take your position. Study your audience. Research both sides. Structure your text. Support your argument. Persuasive paragraph - write an opinion statement (topic), reasons (body paragraph), conclusion (reiterating opinion statement). Add a conclusion. | W.NW.6.3 | none |
| 46 | 5 | 22 | L46 | Introduction to story structure | What makes a story (Eddie + Billie mentor texts) | (see L45) | W.NW.6.3 | none |
| 47 | 5 | 22 | L47 | Writing to seminar — read Eddie the Terrible blog and discuss what makes it persuasive | What makes a story (Eddie + Billie mentor texts) | (see L45) | W.NW.6.3 | none |
| 48 | 5 | 22 | L48 | Identifying elements of a persuasive narrative | What makes a story (Eddie + Billie mentor texts) | (see L45) | W.NW.6.3 | none |
| 49 | 5 | 23 | L49 | Anatomy of an Ad | Show, don't tell; sequence the profile | Show character in scenes; build the sequence | W.NW.6.3 | EVIDENCE-MISMATCH |
| 50 | 5 | 23 | L50 | Identifying Target Audience | Show, don't tell; sequence the profile | Show character in scenes; build the sequence | W.NW.6.3 | EVIDENCE-MISMATCH |
| 51 | 5 | 23 | L51 | Emotional Appeal (Pathos) | Show, don't tell; sequence the profile | Show character in scenes; build the sequence | W.NW.6.3 | EVIDENCE-MISMATCH |
| 52 | 5 | 23 | L52 | Persuasive Devices | Show, don't tell; sequence the profile | Show character in scenes; build the sequence | W.NW.6.3 | EVIDENCE-MISMATCH |
| 53 | 5 | 24 | L53 | Modeling how to draft your dog card — what perspective, how you want to write it | Draft, test on a reader, revise (Act 5 evidence) | Revise from reader feedback | W.WP.6.4 | none |
| 54 | 5 | 24 | L54 | Peer review of drafts (re-norm kind, specific, helpful to start class) | Draft, test on a reader, revise (Act 5 evidence) | Revise from reader feedback | W.WP.6.4 | none |
| 55 | 6 | 25 | L55 | Finalize the card — draft revisions (put it all together) | Finalize the card | Create the final profile card. Doc also notes: Explanation and Presentation of Cards; Recommendations to solve the Big Dog Challenge. | W.NW.6.3, W.AW.6.1 | none |
| 56 | 6 | 26 | L56 | Brief St. Hubert's | Brief St. Hubert's (Act 6 evidence) | Final cards and partner briefing | SL.PI.6.4, SL.UM.6.5 | none |

(Rows 46, 47, 48 abbreviate the Evidence column as "see L45" because the Day 22 evidence text is long and identical across the four lessons on that day. The full text is in Stage 3.)

---

# VERIFICATION

| # | Test | Result | Detail |
|---|---|---|---|
| 1 | Lesson count conservation | PASS | Input 56, MERGED 0, Stage 3 list 56. Identity holds. |
| 2 | Verbatim integrity | PASS | Spot-checked L8, L21, L31, L43, L55 against `lessons[].title` in the source JSON. All five byte-identical. |
| 3 | Act assignment integrity | PASS | Re-walked every surviving lesson's `act` against the input. No reassignments. |
| 4 | Flag coverage | PASS | Re-walked Layer 2 criteria. 0 DUPE, 3 NEAR-DUPE pairs, 0 NONSENSE, 7 ORPHAN, 5 GHOST, 4 EVIDENCE-MISMATCH, 14 AUDIT-NOTE markers placed on the lessons where the audit notes apply. |
| 5 | Locked-vocabulary integrity | PASS in my prose. Source quotes (concept progressions, lesson titles, evidence-drives-at strings) carry em dashes and the K-5 word "opinion" because they are verbatim quotes from the source JSON. The `evidence_vocab_drift_flag` on Day 22 has been raised in the Act 5 narrative for that reason. I am not editing source quotes to enforce my own vocabulary rules. |
| 6 | 6 acts | PASS | Acts 1 through 6 appear exactly once in each of Stage 2, Stage 3, Stage 4. No fifth-act-only or seventh-act drift. |
| 7 | Cohort | PASS | Document references "Cohort 5/6" verbatim from `challenge.cohort_doc_text`. No 7/8 differentiation invited. The only mention of 7/8 is in the parenthetical "This is not for 7/8" carried directly from the source. |
