import json, datetime

TS = datetime.datetime.now(datetime.timezone.utc).isoformat()

def c(o, k, t, m):
    return {"objective": o, "observableCheck": k, "sampleTask": t, "materials": m}

NULLS = ["remember-2","remember-3","remember-4","evaluate-1","evaluate-2"]
ORDER = ["remember-1","remember-2","remember-3","remember-4",
         "understand-1","understand-2","understand-3","understand-4",
         "apply-1","apply-2","apply-3","apply-4",
         "analyze-1","analyze-2","analyze-3","analyze-4",
         "evaluate-1","evaluate-2","evaluate-3","evaluate-4",
         "create-1","create-2","create-3","create-4"]

def matrix(code, stmt, subj, grade, cells):
    full = {k: (None if k in NULLS else cells[k]) for k in ORDER}
    return {"schema_version":1,"standardCode":code,"standardStatement":stmt,
            "subject":subj,"grade":grade,"generatedAt":TS,"cells":full}

NEW = {}

# ---------------- 2.3.8.ATD.1 ----------------
NEW["2.3.8.ATD.1"] = matrix(
 "2.3.8.ATD.1",
 "Examine how the use of alcohol, tobacco, and other drugs by adolescents has impacted their lives and the lives of family members socially, emotionally, and physically.",
 "chpe","8",{
 "remember-1": c(
  "Name the three impact areas used in this unit: social, emotional, and physical.",
  "Each student writes the three areas and one keyword for each on an entry slip.",
  "Guide posts the three impact areas and asks students to write each one with a keyword that captures it, such as friendships for social or body for physical. Slips go on a labeled board. Guide reads the board aloud and corrects any keyword that lands in the wrong area.",
  ["entry slips","labeled board"]),
 "understand-1": c(
  "Describe one social, one emotional, and one physical effect adolescent substance use can have.",
  "Each student completes a three-row organizer with one named effect per row.",
  "Guide gives a three-row organizer for social, emotional, and physical effects. Students fill one specific effect per row drawn from the reading, such as losing a sports spot for physical. Pairs compare organizers and confirm each effect sits in the correct area.",
  ["impact organizer","unit reading"]),
 "understand-2": c(
  "Explain how one effect can spread from the adolescent to a family member.",
  "Each student writes a two-sentence chain showing the effect moving from teen to family.",
  "Each student picks one effect from their organizer and writes a two-sentence chain showing how it reaches a family member, such as missed school leading to a parent missing work. Pairs trade and check that the chain names a real connection rather than a guess.",
  ["impact organizer","lined paper"]),
 "understand-3": c(
  "Summarize a short case profile by naming the main impacts across the three areas.",
  "Each student writes a three-bullet summary of one profile, one bullet per impact area.",
  "Guide hands out two short, age-appropriate case profiles of teens affected by substance use. Students read one and write a three-bullet summary naming a social, emotional, and physical impact. Pairs share summaries and add any impact the partner missed.",
  ["case profiles","summary template"]),
 "understand-4": c(
  "Explain why effects in one area often trigger effects in another.",
  "Each student draws and labels one arrow connecting two impact areas with a reason.",
  "Students review their case profile and draw a labeled arrow connecting two impact areas, such as physical to social, with a sentence explaining the link. Guide collects two examples and shows how the areas feed each other. Class agrees the areas are connected, not separate.",
  ["case profiles","arrow diagram sheet"]),
 "apply-1": c(
  "Sort a list of consequences into social, emotional, and physical categories.",
  "Each pair places ten consequence cards into three labeled bins with no leftovers.",
  "Guide gives pairs ten consequence cards and three labeled bins. Pairs sort each card and resolve any that seem to fit two bins by choosing the strongest fit. The class reviews the trickiest cards and explains the placement.",
  ["consequence cards","bin labels"]),
 "apply-2": c(
  "Apply the three-area framework to a new scenario the class has not seen.",
  "Each student tags a fresh scenario with at least one impact in each area.",
  "Guide presents a new scenario about an adolescent’s substance use. Each student tags the scenario with at least one social, one emotional, and one physical impact, underlining the text clue for each. Pairs compare tags and resolve disagreements using the text.",
  ["new scenario handout","highlighters"]),
 "apply-3": c(
  "Use the framework to interview a partner about a fictional character’s impacts.",
  "Each student records partner answers on an interview sheet covering all three areas.",
  "Pairs take a character card describing a teen affected by substance use. One student interviews the other using questions that cover all three impact areas, then they switch. Each student records answers on an interview sheet that the Guide spot-checks for full coverage.",
  ["character cards","interview sheet"]),
 "apply-4": c(
  "Build a labeled impact map for one case that shows effects reaching both the teen and the family.",
  "Each pair produces a two-side map with at least three labeled effects per side.",
  "Pairs choose one case profile and build a map with the teen on one side and the family on the other. They draw at least three labeled effects per side and connect any that link across. Pairs post maps and the class checks that family impacts are shown, not just the teen’s.",
  ["case profiles","chart paper","markers"]),
 "analyze-1": c(
  "Identify which impact in a profile started the chain of other impacts.",
  "Each student circles the first-domino impact in a profile and labels it.",
  "Guide gives a profile where several impacts pile up. Students circle the impact that appears to start the chain and write a margin note explaining the choice. Pairs compare and point to the text that shows which impact came first.",
  ["case profile","pencils"]),
 "analyze-2": c(
  "Compare two profiles to find which impact area was hit hardest in each.",
  "Each student names the hardest-hit area for each profile with one piece of evidence.",
  "Students read two short profiles and decide which impact area was hit hardest in each, citing one detail per profile. Pairs discuss why the same substance affected two teens differently. Guide records the range of answers to show impacts are not identical.",
  ["two case profiles","comparison sheet"]),
 "analyze-3": c(
  "Distinguish short-term impacts from longer-term impacts in a profile.",
  "Each team sorts impacts onto a now-versus-later timeline and defends two placements.",
  "Guide gives teams a profile and a now-versus-later timeline. Teams place each impact on the timeline and prepare to defend two placements. During share-out the Guide presses one team on an impact that could land in both spots.",
  ["case profile","timeline mat","impact slips"]),
 "analyze-4": c(
  "Analyze how impacts spread across a whole family in a multi-part case.",
  "Each team produces a ripple diagram naming at least four people and the impact on each.",
  "Guide provides a multi-part case involving a teen and several family members. Teams build a ripple diagram placing the teen at the center and naming at least four people affected, with the specific impact on each. Teams post diagrams and the class identifies who was affected even though they never used the substance.",
  ["multi-part case","chart paper","markers"]),
 "evaluate-3": c(
  "Argue which impact area deserves the most attention in a given case and defend the claim.",
  "Each student writes a paragraph naming the priority area with two reasons.",
  "Guide presents one detailed case. Students write a paragraph arguing which impact area a support plan should address first, giving two reasons and one reason a different area was ranked lower. Volunteers share and the class weighs competing priorities.",
  ["detailed case handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate the completeness of a peer team’s impact map and judge what is missing.",
  "Each team writes a review naming at least two gaps with evidence from the map.",
  "Teams swap the impact maps built earlier and review them against a checklist covering all three areas and both the teen and family. Each team writes a review naming at least two gaps and the evidence for each. Teams return reviews and the class names the most common gap across maps.",
  ["impact maps","review checklist","review slip"]),
 "create-1": c(
  "Brainstorm ways adolescent substance use could affect people the teen never expected.",
  "Each student adds at least three affected people or situations to the class list.",
  "Open brainstorm. Guide asks, 'Beyond the teen, who else feels the effects?' Students name people such as younger siblings, teammates, and neighbors. Guide records every idea on the board with none rejected during the brainstorm.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how one early choice could change a teen’s impact story.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student takes a case profile and writes a what-if paragraph: if the teen had made one different choice early on, how would the social, emotional, and physical story change? The paragraph must name at least two changed outcomes. Pairs trade and check the changes follow logically from the choice.",
  ["case profiles","lined paper"]),
 "create-3": c(
  "Construct an infographic that shows the three impact areas with one real example each.",
  "Each team produces a finished infographic with a labeled example per area.",
  "Teams design an infographic showing social, emotional, and physical impacts of adolescent substance use, each with one example drawn from the unit. The infographic must be readable from across the room. Teams post infographics and the class checks each area has a clear, accurate example.",
  ["poster paper","markers","unit notes"]),
 "create-4": c(
  "Develop and test a short peer message that explains how substance use ripples beyond the user, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short peer message, such as a 30-second announcement, explaining how one teen’s substance use affects family and friends. Groups deliver it to a test audience of classmates who rate clarity and accuracy on a feedback card. Each group revises once and notes what changed and why before the final delivery.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.ATD.2 ----------------
NEW["2.3.8.ATD.2"] = matrix(
 "2.3.8.ATD.2",
 "Relate the use of alcohol and other drugs to decision-making, consent, and risk for sexual assault and abuse.",
 "chpe","8",{
 "remember-1": c(
  "Define decision-making, consent, and risk in this unit’s words.",
  "Each student writes a one-line definition for each of the three terms on a card.",
  "Guide posts the three terms and the class co-builds a plain definition for each. Students copy a one-line definition for decision-making, consent, and risk onto a card. Guide collects two cards per term to confirm the definitions match the agreed wording.",
  ["definition cards","term poster"]),
 "understand-1": c(
  "Explain how alcohol and other drugs change a person’s ability to make clear decisions.",
  "Each student writes two sentences naming a specific change to thinking or judgment.",
  "Guide presents a short, factual reading on how substances slow judgment and reaction. Students write two sentences naming a specific change, such as trouble weighing consequences. Pairs check that each sentence names a real change rather than a vague claim.",
  ["unit reading","lined paper"]),
 "understand-2": c(
  "Describe why consent cannot be given when a person is impaired.",
  "Each student restates the rule in their own words and gives one reason.",
  "Guide states the rule that a person who is impaired cannot give consent and explains why. Students rewrite the rule in their own words and add one reason it holds, tied to clear thinking. Pairs compare restatements for accuracy.",
  ["consent reference sheet","lined paper"]),
 "understand-3": c(
  "Summarize how substance use raises risk in a social situation.",
  "Each student writes a three-bullet summary naming how risk goes up.",
  "Guide gives a short scenario reading. Students write a three-bullet summary of how substance use raised risk for the people involved, such as reduced awareness or harder communication. Pairs share and add any risk factor the partner missed.",
  ["scenario reading","summary template"]),
 "understand-4": c(
  "Explain the link between clear decision-making and the ability to give or read consent.",
  "Each student draws a labeled link between decision-making and consent with a reason.",
  "Students draw a labeled connection on a half-sheet showing how clear decision-making supports both giving and reading consent, with a sentence of reasoning. Guide shows two examples and reinforces that impaired judgment breaks the link. Class confirms the connection in their own words.",
  ["link diagram sheet","pencils"]),
 "apply-1": c(
  "Identify in a scenario whether clear decision-making was possible.",
  "Each student marks possible or not possible for three scenarios with a text clue.",
  "Guide gives three short scenarios. Students mark whether clear decision-making was possible in each and underline the clue, such as a description of impairment. Pairs compare marks and resolve differences using the text.",
  ["scenario set","highlighters"]),
 "apply-2": c(
  "Apply the consent rule to decide whether consent could be given in sample situations.",
  "Each student labels each situation and cites the rule that applies.",
  "Guide hands out four sample situations. Students label whether consent could be given in each and cite the specific rule that applies, such as impairment removing consent. Pairs review and confirm the cited rule fits the situation.",
  ["situation handout","consent reference sheet"]),
 "apply-3": c(
  "Use a refusal or exit strategy to lower risk in a substance-pressure scenario.",
  "Each pair role-plays a refusal-and-exit and the Guide confirms both steps appear.",
  "Guide gives pairs a scenario where substance use raises risk at a gathering. Pairs role-play a clear refusal and a move to a safer setting, such as leaving with a trusted friend. The Guide circulates and confirms both the refusal and the exit appear in each role-play.",
  ["scenario cards","open space"]),
 "apply-4": c(
  "Build a risk-lowering plan for a social situation that involves substances.",
  "Each pair produces a written plan with at least three concrete steps.",
  "Pairs take a realistic gathering scenario and write a plan with at least three concrete steps to lower risk, such as arriving with a friend, setting a check-in time, and naming an exit ride. Pairs post plans and the class checks each step is something a teen could actually do.",
  ["scenario cards","plan template"]),
 "analyze-1": c(
  "Identify the point in a scenario where impaired judgment raised risk.",
  "Each student circles the turning point and labels the risk it created.",
  "Guide gives a scenario where substance use leads to a risky situation. Students circle the moment impaired judgment raised risk and label the risk created. Pairs compare and point to the text that marks the turning point.",
  ["scenario handout","pencils"]),
 "analyze-2": c(
  "Compare two scenarios to determine which carried higher risk and why.",
  "Each student names the higher-risk scenario with two pieces of evidence.",
  "Students read two scenarios and decide which carried higher risk, citing two details. Pairs discuss how substance use changed the level of risk in each. Guide records the reasoning to highlight which factors raised risk most.",
  ["two scenarios","comparison sheet"]),
 "analyze-3": c(
  "Distinguish factors that raised risk from factors that lowered it in a scenario.",
  "Each team sorts factor cards into raised-risk and lowered-risk columns and defends two.",
  "Guide gives teams a scenario and factor cards naming choices and conditions. Teams sort each into raised-risk or lowered-risk columns and prepare to defend two placements. During share-out the Guide presses on a factor that could go either way depending on details.",
  ["scenario card","factor cards","sorting mat"]),
 "analyze-4": c(
  "Analyze a multi-step scenario to trace how one choice changed both decision-making and risk.",
  "Each team produces a cause-and-effect chain with at least three linked steps.",
  "Guide provides a multi-step scenario. Teams build a cause-and-effect chain on chart paper showing how one early choice changed later decision-making and raised risk, naming at least three linked steps. Teams post chains and the class marks the earliest point a different choice would have lowered risk.",
  ["multi-step scenario","chart paper","markers"]),
 "evaluate-3": c(
  "Argue which strategy best protects a person in a high-risk scenario and defend it.",
  "Each student writes a paragraph naming the chosen strategy with two reasons.",
  "Guide presents a high-risk scenario with several possible responses. Students write a paragraph choosing the strategy that best protects the person, giving two reasons and one reason a different strategy was rejected. Volunteers share and the class weighs the cases.",
  ["scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of risk-lowering plans and judge which is most realistic and complete.",
  "Each team rates three plans against a rubric and reports the strongest with evidence.",
  "Teams receive three sample risk-lowering plans and a rubric scoring realism, completeness, and use of trusted people. Teams rate each plan and write a note naming the strongest and the steps that earned the rating. Teams report out and the Guide builds a class master plan from the best steps.",
  ["plan set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm protective choices a teen can make before and during a risky social situation.",
  "Each student adds at least three protective choices to the class list.",
  "Open brainstorm. Guide asks, 'What can a person decide ahead of time to stay safer?' Students name choices such as going with friends, planning a ride, and setting a check-in. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how planning ahead changes the outcome of a risky scenario.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student takes a risky scenario and writes a what-if paragraph: if the teen had planned ahead using one protective choice, how would the outcome change? The paragraph must name at least two changed outcomes. Pairs trade and confirm the changes follow from the choice.",
  ["scenario cards","lined paper"]),
 "create-3": c(
  "Construct a peer reference card that lists protective strategies for social situations.",
  "Each team produces a finished card with at least four clear strategies.",
  "Teams design a wallet-size reference card listing at least four protective strategies a teen could use in a social situation involving substances. The card must be readable at a glance and use plain language. Teams trade cards and check each strategy is clear and doable.",
  ["card stock","markers","brainstorm list"]),
 "create-4": c(
  "Develop and test a short peer scenario that teaches the link between impairment, judgment, and risk, then revise it.",
  "Each group runs the scenario with a test audience and submits one revision note.",
  "Groups write a short, non-graphic scenario and a debrief that teaches how impairment lowers judgment and raises risk. Groups run it with a test audience of classmates who rate clarity and accuracy on a feedback card. Each group revises once and notes what changed and why before the final run.",
  ["scenario planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.ATD.3 ----------------
NEW["2.3.8.ATD.3"] = matrix(
 "2.3.8.ATD.3",
 "Determine the factors that contribute to different rules, laws, and policies in schools, communities, and states regarding alcohol, tobacco (including e-cigarettes, vaping, cannabis products), and other drugs.",
 "chpe","8",{
 "remember-1": c(
  "Name the three levels where rules about substances are set: school, community, and state.",
  "Each student writes the three levels and one example rule for each on an entry slip.",
  "Guide posts the three levels and asks students to write each with one example rule, such as a school vaping ban or a state age limit. Slips go on a labeled board. Guide reads the board and corrects any rule placed at the wrong level.",
  ["entry slips","labeled board"]),
 "understand-1": c(
  "Describe what a specific rule or law about substances requires.",
  "Each student restates four sample rules in plain words on a worksheet.",
  "Guide hands out four sample rules from different levels. Students rewrite each rule in plain words stating who it applies to and what it requires. Pairs compare restatements and confirm the meaning is kept.",
  ["rule worksheet","pencils"]),
 "understand-2": c(
  "Explain the goal behind one substance rule.",
  "Each student writes a 'this rule exists to' sentence for two rules.",
  "Each student picks two rules from the board and writes a sentence finishing 'This rule exists to...' for each, naming the goal, such as protecting young people. Pairs trade and check that the goal is a real aim rather than a guess.",
  ["rule list","lined paper"]),
 "understand-3": c(
  "Summarize the main factors that shape substance rules, such as health, age, and safety.",
  "Each student lists three factors and ties each to a specific rule.",
  "Guide gives a short reading on why substance rules exist. Students list three factors and tie each to a specific rule, such as health driving an age limit. Pairs share and add any factor the partner missed.",
  ["factor reading","summary template"]),
 "understand-4": c(
  "Explain why the same substance can have different rules in different places.",
  "Each student writes two sentences explaining a difference between two places’ rules.",
  "Guide shows two real, contrasting rules for the same substance from different places. Students write two sentences explaining why the rules differ, naming a factor such as local priorities. Guide collects examples and confirms rules vary by place and reason.",
  ["contrasting rules handout","lined paper"]),
 "apply-1": c(
  "Sort sample rules by the level that sets them.",
  "Each pair places eight rule cards into school, community, and state bins with no leftovers.",
  "Guide gives pairs eight rule cards and three labeled bins. Pairs sort each rule by the level that sets it and resolve any that seem to fit two levels by choosing the primary one. The class reviews the trickiest cards.",
  ["rule cards","bin labels"]),
 "apply-2": c(
  "Match each rule to the factor that most likely drove it.",
  "Each student matches six rules to driving factors and underlines the clue.",
  "Guide hands out six rules and a list of factors. Students match each rule to the factor that most likely drove it and underline the clue that supports the match. Pairs compare and resolve differences with reasons.",
  ["rule-factor handout","highlighters"]),
 "apply-3": c(
  "Apply the factor framework to explain a new rule the class has not seen.",
  "Each student names two factors behind a fresh rule with evidence.",
  "Guide presents a new substance rule. Each student names the two factors most likely behind it and cites evidence from the rule’s wording. Pairs compare and refine their factor list.",
  ["new rule handout","response sheet"]),
 "apply-4": c(
  "Build a labeled chart connecting three rules to the factors and levels behind them.",
  "Each pair produces a chart linking each rule to its factor and level.",
  "Pairs choose three rules and build a chart linking each to its driving factor and the level that set it. Charts must show the reasoning, not just labels. Pairs post charts and the class checks the links are supported.",
  ["rule cards","chart paper","markers"]),
 "analyze-1": c(
  "Identify the strongest factor behind a given rule.",
  "Each student names the strongest factor for a rule and cites a clue.",
  "Guide gives a rule with several possible drivers. Students name the factor that most strongly explains it and cite a clue from the rule. Pairs compare and point to the wording behind their choice.",
  ["rule handout","pencils"]),
 "analyze-2": c(
  "Compare a school rule and a state law on the same substance and explain why they differ.",
  "Each student names two differences and a likely reason for each.",
  "Students compare a school rule and a state law on the same substance. They name two differences and a likely reason for each, such as a school addressing daily behavior and a state addressing age. Pairs discuss which level can do things the other cannot.",
  ["paired rules handout","comparison sheet"]),
 "analyze-3": c(
  "Distinguish factors based on health from factors based on safety or law enforcement.",
  "Each team sorts factor cards into categories and defends two placements.",
  "Guide gives teams factor cards and category labels for health, safety, and enforcement. Teams sort each factor and prepare to defend two placements. During share-out the Guide presses on a factor that fits more than one category.",
  ["factor cards","category labels"]),
 "analyze-4": c(
  "Analyze how several factors combined to shape one detailed policy.",
  "Each team produces a labeled web naming at least three factors and how each shows up.",
  "Guide provides a detailed policy and background. Teams build a web placing the policy at the center and naming at least three contributing factors, with a note on how each shows up in the policy. Teams post webs and the class identifies the factor that seemed to matter most.",
  ["detailed policy handout","chart paper","markers"]),
 "evaluate-3": c(
  "Argue whether a given rule does a good job meeting its goal and defend the claim.",
  "Each student writes a paragraph judging the rule with two reasons.",
  "Guide presents one rule and its stated goal. Students write a paragraph judging whether the rule meets its goal, giving two reasons and one limitation. Volunteers share and the class weighs the cases.",
  ["rule and goal handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of school policies and judge which best balances health and fairness.",
  "Each team rates three policies against a rubric and reports the strongest with evidence.",
  "Teams receive three sample school substance policies and a rubric scoring health protection, fairness, and clarity. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide notes the most common weakness across policies.",
  ["policy set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm factors that should be considered when writing a school substance policy.",
  "Each student adds at least three factors to the class list.",
  "Open brainstorm. Guide asks, 'If our school wrote a substance policy, what should it weigh?' Students name factors such as student health, fairness, and enforceability. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how changing one factor would change a policy.",
  "Each student writes a one-paragraph what-if naming at least two changes to the policy.",
  "Each student takes a sample policy and writes a what-if paragraph: if one factor, such as health concern, were weighted more heavily, how would the policy change? The paragraph must name at least two changes. Pairs trade and check the changes follow from the factor.",
  ["sample policy","lined paper"]),
 "create-3": c(
  "Construct a draft school policy section that names its goal and the factors behind it.",
  "Each team produces a one-paragraph draft policy with goal and factors stated.",
  "Teams draft a one-paragraph school policy section on a substance topic, stating the goal and the factors that shaped it. The draft must be specific enough to follow. Teams trade drafts and check the goal and factors are both present and clear.",
  ["draft template","brainstorm list"]),
 "create-4": c(
  "Develop and pitch a proposed school policy change, then revise it from peer feedback.",
  "Each group pitches the proposal and submits one revision note based on feedback.",
  "Groups develop a proposed change to a school substance policy and a short pitch naming the factors behind it. Groups pitch to a test audience of classmates who rate clarity and fairness on a feedback card. Each group revises once and notes what changed and why before the final pitch.",
  ["proposal template","feedback cards","timer"]),
})

print("authored", len(NEW))
json.dump(NEW, open("_new_b2.json","w"), indent=2, ensure_ascii=False)
