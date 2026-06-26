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

# ---------------- 2.3.8.ATD.4 ----------------
NEW["2.3.8.ATD.4"] = matrix(
 "2.3.8.ATD.4",
 "Explain the impact of alcohol and other drugs on areas of the brain that control vision, sleep, coordination, reaction time, judgment, and memory.",
 "chpe","8",{
 "remember-1": c(
  "Name the six brain-controlled functions in this standard: vision, sleep, coordination, reaction time, judgment, and memory.",
  "Each student labels six functions on a blank brain handout before checking with a partner.",
  "Guide gives a blank brain outline with six blank labels. Students write in vision, sleep, coordination, reaction time, judgment, and memory. Pairs compare labels and the Guide confirms the full list on the board.",
  ["blank brain handout","pencils"]),
 "understand-1": c(
  "Describe what one brain function does in everyday life.",
  "Each student writes a one-sentence everyday example for three of the six functions.",
  "Students pick three of the six functions and write a one-sentence everyday example for each, such as reaction time mattering when catching a ball. Pairs trade and check that each example shows the function in action. Guide shares two strong examples.",
  ["function list","lined paper"]),
 "understand-2": c(
  "Explain how a substance can disrupt one specific brain function.",
  "Each student writes a two-sentence cause-and-effect for one function.",
  "Guide gives a short, factual reading on substance effects. Each student picks one function and writes a two-sentence cause-and-effect showing how a substance disrupts it, such as alcohol slowing reaction time. Pairs check that the effect matches the function.",
  ["unit reading","lined paper"]),
 "understand-3": c(
  "Summarize the reading by matching each function to one likely effect of substance use.",
  "Each student completes a six-row match between functions and effects.",
  "Guide hands out a six-row organizer listing the functions. Students fill one likely substance effect per function from the reading. Pairs compare organizers and confirm each effect sits with the correct function.",
  ["function organizer","unit reading"]),
 "understand-4": c(
  "Explain why slowed reaction time and weakened judgment are especially risky together.",
  "Each student writes two sentences linking two impaired functions to a real danger.",
  "Students choose two functions, such as reaction time and judgment, and write two sentences explaining why impairing both at once creates a real danger, such as driving. Guide collects examples and confirms the functions combine to raise risk. Class names one situation where this matters.",
  ["function list","lined paper"]),
 "apply-1": c(
  "Match a list of impaired behaviors to the brain function each one signals.",
  "Each pair matches eight behavior cards to the six functions with reasons.",
  "Guide gives pairs eight behavior cards, such as stumbling or forgetting steps, and the six function labels. Pairs match each behavior to the function it signals and note their reason. The class reviews any behavior that could point to two functions.",
  ["behavior cards","function labels"]),
 "apply-2": c(
  "Apply the function framework to predict effects in a new scenario.",
  "Each student predicts which functions are impaired in a fresh scenario with clues.",
  "Guide presents a new scenario describing a person’s impaired behavior. Each student predicts which functions are impaired and underlines the clue for each. Pairs compare predictions and resolve differences using the scenario.",
  ["new scenario handout","highlighters"]),
 "apply-3": c(
  "Use the framework to explain why a specific task gets harder under substance influence.",
  "Each student names the impaired functions behind a chosen task’s difficulty.",
  "Guide lists tasks such as driving, studying, or playing a sport. Each student picks one task and explains which functions substance use would impair to make that task harder, naming at least two functions. Pairs compare and add any function the partner missed.",
  ["task list","response sheet"]),
 "apply-4": c(
  "Build a labeled diagram connecting three functions to specific real-world consequences.",
  "Each pair produces a diagram linking each function to a named consequence.",
  "Pairs choose three functions and build a diagram linking each to a specific real-world consequence of impairment, such as memory loss leading to missed assignments. Diagrams must show the link, not just the labels. Pairs post diagrams and the class checks the consequences follow from the function.",
  ["function cards","chart paper","markers"]),
 "analyze-1": c(
  "Identify which impaired function in a scenario created the most danger.",
  "Each student names the most dangerous impaired function with a text clue.",
  "Guide gives a scenario with several impaired functions. Students name the one that created the most danger and cite the clue. Pairs compare and point to the text behind their choice.",
  ["scenario handout","pencils"]),
 "analyze-2": c(
  "Compare two substances by which functions each affects most.",
  "Each student names the most-affected functions for each substance with evidence.",
  "Students read short, factual profiles of two substances. They name which functions each affects most and cite evidence from the profiles. Pairs discuss why two substances impair different functions.",
  ["substance profiles","comparison sheet"]),
 "analyze-3": c(
  "Distinguish short-term effects on these functions from longer-term effects.",
  "Each team sorts effect cards onto a now-versus-later timeline and defends two.",
  "Guide gives teams effect cards and a now-versus-later timeline. Teams place each effect and prepare to defend two placements. During share-out the Guide presses on an effect that could appear both now and later.",
  ["effect cards","timeline mat"]),
 "analyze-4": c(
  "Analyze how impairing several functions at once builds toward an accident in a case.",
  "Each team produces a chain diagram naming at least three functions and their combined effect.",
  "Guide provides a case where several functions are impaired and an accident follows. Teams build a chain diagram naming at least three impaired functions and how they combined to lead to the outcome. Teams post diagrams and the class marks which single function, if protected, would most have changed the result.",
  ["case handout","chart paper","markers"]),
 "evaluate-3": c(
  "Argue which impaired function poses the greatest risk while driving and defend the claim.",
  "Each student writes a paragraph naming the function with two reasons.",
  "Guide frames a driving context. Students write a paragraph arguing which impaired function poses the greatest risk behind the wheel, giving two reasons and one reason a different function ranks lower. Volunteers share and the class weighs the cases.",
  ["driving context handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of public-safety messages and judge which most accurately explains brain effects.",
  "Each team rates three messages against a rubric and reports the strongest with evidence.",
  "Teams receive three sample public-safety messages and a rubric scoring accuracy, clarity, and impact. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any message that overstates or distorts the science.",
  ["message set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm everyday activities that depend on the six brain functions.",
  "Each student adds at least three activities to the class list.",
  "Open brainstorm. Guide asks, 'What daily activities rely on these six functions?' Students name activities such as sports, driving, and tests. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how a single night of impaired sleep or judgment could affect the next day.",
  "Each student writes a one-paragraph what-if naming at least two next-day effects.",
  "Each student writes a what-if paragraph: if one function were impaired tonight, how would tomorrow change? The paragraph must name at least two next-day effects tied to the function. Pairs trade and check the effects follow from the impaired function.",
  ["function list","lined paper"]),
 "create-3": c(
  "Construct an infographic mapping each brain function to its substance-related risk.",
  "Each team produces a finished infographic covering at least four functions.",
  "Teams design an infographic mapping at least four functions to the risk substance use creates for each. The infographic must be accurate and readable from across the room. Teams post infographics and the class checks each function-risk pair against the unit reading.",
  ["poster paper","markers","unit notes"]),
 "create-4": c(
  "Develop and test a short demonstration that shows how impairment slows reaction time, then revise it.",
  "Each group runs the demonstration with a test audience and submits one revision note.",
  "Groups design a safe demonstration, such as a ruler-drop reaction test paired with an explanation of how substances would slow the response. Groups run it with a test audience of classmates who rate clarity and accuracy on a feedback card. Each group revises once and notes what changed and why before the final run.",
  ["ruler or stopwatch","demonstration plan","feedback cards"]),
})

# ---------------- 2.3.8.ATD.5 ----------------
NEW["2.3.8.ATD.5"] = matrix(
 "2.3.8.ATD.5",
 "Analyze how the influence of peers and different social settings (e.g., home, school, party) can result in positive and/or negative outcomes.",
 "chpe","8",{
 "remember-1": c(
  "Name three social settings and one peer-influence example for each.",
  "Each student writes three settings with an example on an entry slip.",
  "Guide posts the settings home, school, and party and asks students to write each with one peer-influence example, such as friends studying together at school. Slips go on a labeled board. Guide reads the board and corrects any example placed in the wrong setting.",
  ["entry slips","labeled board"]),
 "understand-1": c(
  "Describe how peer influence can be positive or negative in the same setting.",
  "Each student writes one positive and one negative example for a single setting.",
  "Students pick one setting and write one positive and one negative peer-influence example for it. Pairs compare and confirm both examples fit the setting and the direction labeled. Guide shares one balanced pair.",
  ["setting list","lined paper"]),
 "understand-2": c(
  "Explain why the same peer pressure can lead to different outcomes for different people.",
  "Each student writes two sentences naming a factor that changes the outcome.",
  "Guide gives a short scenario reading. Students write two sentences explaining why the same pressure led to different outcomes for two people, naming a factor such as confidence or planning. Pairs check that the factor is specific.",
  ["scenario reading","lined paper"]),
 "understand-3": c(
  "Summarize a scenario by naming the influence, the setting, and the outcome.",
  "Each student completes a three-part summary for one scenario.",
  "Guide hands out two scenarios. Students summarize one by naming the peer influence, the setting, and the outcome in three short lines. Pairs share and add any element the partner missed.",
  ["scenario handout","summary template"]),
 "understand-4": c(
  "Explain how the setting itself can strengthen or weaken peer influence.",
  "Each student writes two sentences linking a setting feature to stronger or weaker influence.",
  "Students choose a setting and write two sentences explaining how a feature of it, such as adults being present, strengthens or weakens peer influence. Guide collects examples and confirms setting shapes influence. Class names one setting feature that lowers pressure.",
  ["setting list","lined paper"]),
 "apply-1": c(
  "Label scenarios as positive or negative peer influence.",
  "Each pair labels eight scenario cards and underlines the clue for each.",
  "Guide gives pairs eight scenario cards. Pairs label each as positive or negative peer influence and underline the clue. The class reviews any card that could be read both ways.",
  ["scenario cards","highlighters"]),
 "apply-2": c(
  "Apply a refusal or redirection strategy to a negative-influence scenario.",
  "Each pair role-plays a strategy and the Guide confirms it fits the setting.",
  "Guide gives pairs a negative-influence scenario in a specific setting. Pairs role-play a refusal or a redirection that fits that setting, such as suggesting a different activity. The Guide circulates and confirms the strategy matches the setting and the pressure.",
  ["scenario cards","open space"]),
 "apply-3": c(
  "Use the framework to predict outcomes when the setting changes but the peers stay the same.",
  "Each student predicts how an outcome shifts across two settings with reasons.",
  "Guide gives a peer group and two settings. Each student predicts how the outcome shifts from one setting to the other and names the reason, such as supervision changing. Pairs compare predictions and refine them.",
  ["setting-shift handout","response sheet"]),
 "apply-4": c(
  "Build a plan a teen could use to turn a negative-influence setting toward a positive outcome.",
  "Each pair produces a written plan with at least three concrete steps.",
  "Pairs take a negative-influence scenario and write a plan with at least three concrete steps to steer it toward a positive outcome, such as inviting a trusted friend or changing the activity. Pairs post plans and the class checks each step is realistic for a teen.",
  ["scenario cards","plan template"]),
 "analyze-1": c(
  "Identify the moment peer influence changed the direction of a scenario.",
  "Each student circles the turning point and labels it positive or negative.",
  "Guide gives a scenario where peer influence shifts the outcome. Students circle the moment the influence took hold and label it positive or negative. Pairs compare and point to the text behind the choice.",
  ["scenario handout","pencils"]),
 "analyze-2": c(
  "Compare two settings to determine which made positive choices easier and why.",
  "Each student names the easier setting with two pieces of evidence.",
  "Students read two scenarios set in different places. They decide which setting made a positive choice easier and cite two details. Pairs discuss what setting features supported the better choice.",
  ["two scenarios","comparison sheet"]),
 "analyze-3": c(
  "Distinguish peer influences that push toward risk from those that pull toward safety.",
  "Each team sorts influence cards into push and pull columns and defends two.",
  "Guide gives teams influence cards and a mat with push-to-risk and pull-to-safety columns. Teams sort each card and prepare to defend two placements. During share-out the Guide presses on a card that could go either way depending on context.",
  ["influence cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how peers and setting combined to produce an outcome in a multi-part scenario.",
  "Each team produces a diagram naming at least three factors and the outcome they built toward.",
  "Guide provides a multi-part scenario. Teams build a diagram showing how peer influences and setting features combined to produce the outcome, naming at least three factors. Teams post diagrams and the class marks the factor that most shaped the result.",
  ["multi-part scenario","chart paper","markers"]),
 "evaluate-3": c(
  "Argue which strategy best protects a teen from negative peer influence in a setting and defend it.",
  "Each student writes a paragraph naming the strategy with two reasons.",
  "Guide presents a high-pressure scenario. Students write a paragraph choosing the strategy that best protects the teen, giving two reasons and one reason a different strategy was rejected. Volunteers share and the class weighs the cases.",
  ["scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of peer-support plans and judge which is most realistic across settings.",
  "Each team rates three plans against a rubric and reports the strongest with evidence.",
  "Teams receive three sample peer-support plans and a rubric scoring realism, range across settings, and clarity. Teams rate each and write a note naming the strongest and the steps that earned the rating. Teams report out and the Guide notes the most common gap.",
  ["plan set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm ways peers can be a positive influence in each setting.",
  "Each student adds at least three positive-influence ideas to the class list.",
  "Open brainstorm. Guide asks, 'How can friends help each other make good choices at home, school, and gatherings?' Students name ideas such as studying together or backing each other’s refusals. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how adding one supportive friend changes a high-pressure scenario.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student takes a high-pressure scenario and writes a what-if paragraph: if one supportive friend were added, how would the outcome change? The paragraph must name at least two changed outcomes. Pairs trade and check the changes follow from the added support.",
  ["scenario cards","lined paper"]),
 "create-3": c(
  "Construct a poster teaching three ways to be a positive peer influence.",
  "Each team produces a finished poster with one example per strategy.",
  "Teams design a poster teaching three ways to be a positive peer influence, each with an example drawn from the brainstorm. Posters must use words and images peers would respond to. Teams display posters and the class picks the clearest for the hallway.",
  ["poster paper","markers","brainstorm list"]),
 "create-4": c(
  "Develop and rehearse a short skit showing peer influence shifting an outcome, then revise it from feedback.",
  "Each group performs the skit and submits one revision note based on feedback.",
  "Groups write and rehearse a short skit showing how peer influence shifts an outcome in a chosen setting, ending with a positive turn. Groups perform for a test audience of classmates who give two pieces of feedback on a glow-and-grow card. Each group revises once and notes what changed and why before the final run.",
  ["skit planning sheet","glow-and-grow cards","props"]),
})

# ---------------- 2.3.8.DSDT.1 ----------------
NEW["2.3.8.DSDT.1"] = matrix(
 "2.3.8.DSDT.1",
 "Summarize the signs and symptoms of alcohol, tobacco, and drug disorders.",
 "chpe","8",{
 "remember-1": c(
  "List four signs or symptoms that can point to a substance use disorder.",
  "Each student writes four signs on a card before they are posted on the class chart.",
  "Guide posts the prompt asking what signs might show a person has a substance use disorder. Students write four from the reading, such as needing more to feel the same effect or losing interest in usual activities. Cards go on a chart grouped into behavior, body, and mood signs. Guide reads the chart and adds any standard sign the class missed.",
  ["index cards","class chart","unit reading"]),
 "understand-1": c(
  "Describe in plain words what one sign of a substance disorder looks like.",
  "Each student restates four signs in everyday language on a worksheet.",
  "Guide hands out a worksheet listing four clinical signs. Students rewrite each in everyday language describing what a person would notice. Pairs compare and confirm each restatement keeps the meaning.",
  ["sign worksheet","unit reading"]),
 "understand-2": c(
  "Explain why one sign on its own does not mean a person has a disorder.",
  "Each student writes two sentences explaining the difference between one sign and a pattern.",
  "Guide explains that a disorder shows up as a pattern, not a single event. Students write two sentences explaining why one sign alone is not enough and what a pattern adds. Pairs check that the explanation names the idea of a pattern over time.",
  ["reference sheet","lined paper"]),
 "understand-3": c(
  "Summarize the main categories of signs: physical, behavioral, and emotional.",
  "Each student sorts nine signs into three categories on a chart.",
  "Guide gives a chart with three category headers. Students sort nine signs into physical, behavioral, and emotional. Whole-class review confirms each placement and adds one student example per category.",
  ["sign sort chart","sign slips"]),
 "understand-4": c(
  "Explain how signs across categories together build a clearer picture than any one alone.",
  "Each student connects three signs from different categories to one overall picture.",
  "Students pick three signs from different categories and write a short note explaining how, together, they paint a clearer picture of a possible disorder. Guide collects examples and reinforces that a fuller picture comes from patterns across categories. Class names why one category alone can mislead.",
  ["sign list","lined paper"]),
 "apply-1": c(
  "Identify signs of a disorder in a short case profile.",
  "Each student underlines three signs in a profile and labels each category.",
  "Guide gives a short, age-appropriate case profile. Students underline three signs and label each as physical, behavioral, or emotional. Pairs compare underlines and point to the text for each.",
  ["case profile","highlighters"]),
 "apply-2": c(
  "Apply the sign categories to sort observations from a new case.",
  "Each student tags a fresh case with at least one sign per category.",
  "Guide presents a new case profile. Each student tags it with at least one physical, behavioral, and emotional sign, underlining the clue for each. Pairs compare tags and resolve differences using the text.",
  ["new case profile","response sheet"]),
 "apply-3": c(
  "Use a sign checklist to summarize a case for a class discussion.",
  "Each student completes a checklist and writes a two-sentence summary.",
  "Guide gives a sign checklist and a case profile. Students mark the signs present and write a two-sentence summary of the pattern they see. Pairs compare summaries and confirm the pattern is supported by the marked signs.",
  ["sign checklist","case profile"]),
 "apply-4": c(
  "Build a labeled summary chart of one case organized by sign category.",
  "Each pair produces a three-column chart with at least two signs per column.",
  "Pairs choose a case profile and build a three-column chart for physical, behavioral, and emotional signs, with at least two signs per column drawn from the text. Pairs post charts and the class checks each sign is supported by the profile.",
  ["case profile","chart paper","markers"]),
 "analyze-1": c(
  "Identify which sign in a case is the strongest indicator of a disorder.",
  "Each student names the strongest sign and cites the text clue.",
  "Guide gives a case with several signs. Students name the strongest indicator and cite the clue. Pairs compare and point to the text behind their choice.",
  ["case profile","pencils"]),
 "analyze-2": c(
  "Compare two cases to determine which shows a clearer pattern of a disorder.",
  "Each student names the clearer case with two pieces of evidence.",
  "Students read two short cases and decide which shows a clearer pattern, citing two details. Pairs discuss why a clearer pattern matters when deciding whether to seek help.",
  ["two case profiles","comparison sheet"]),
 "analyze-3": c(
  "Distinguish signs of a disorder from ordinary teen behavior that is not a sign.",
  "Each team sorts behavior cards into sign and not-a-sign columns and defends two.",
  "Guide gives teams behavior cards mixing real signs with ordinary teen behavior. Teams sort each into sign or not-a-sign and prepare to defend two placements. During share-out the Guide presses on a card that looks like a sign but may not be.",
  ["behavior cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how signs in a detailed case developed over time into a pattern.",
  "Each team produces a timeline showing at least three signs and how the pattern grew.",
  "Guide provides a detailed case spanning several months. Teams build a timeline placing at least three signs in order and showing how the pattern grew clearer over time. Teams post timelines and the class marks the earliest point the pattern became hard to ignore.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue whether a case shows enough signs to suggest seeking help and defend the claim.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide presents one case. Students write a paragraph judging whether the signs suggest the person should seek help, giving two reasons and one reason for caution. Volunteers share and the class weighs the cases.",
  ["case handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of awareness materials and judge which most accurately lists signs.",
  "Each team rates three materials against a rubric and reports the strongest with evidence.",
  "Teams receive three sample awareness materials and a rubric scoring accuracy, clarity, and tone. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any material that exaggerates or stigmatizes.",
  ["awareness material set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm changes a friend might notice when someone is struggling with substance use.",
  "Each student adds at least three observable changes to the class list.",
  "Open brainstorm. Guide asks, 'What changes might a friend notice in someone struggling?' Students name changes such as skipping practice or pulling away from friends. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how noticing signs early could change what happens next.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a friend noticed the signs early and spoke up, how would the situation change? The paragraph must name at least two changed outcomes. Pairs trade and check the changes follow from acting early.",
  ["case profiles","lined paper"]),
 "create-3": c(
  "Construct a one-page reference that groups common signs by category for peers.",
  "Each team produces a finished reference with at least two signs per category.",
  "Teams design a one-page reference grouping common signs into physical, behavioral, and emotional, with at least two signs per category. The reference must be accurate and written in plain language. Teams trade references and check each sign is correctly placed and clearly worded.",
  ["reference template","unit notes"]),
 "create-4": c(
  "Develop and test a short awareness message that explains signs without stigma, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short awareness message that explains signs of a disorder in a caring, non-stigmatizing way. Groups deliver it to a test audience of classmates who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why before the final delivery.",
  ["message planning sheet","feedback cards","timer"]),
})

print("authored", len(NEW))
json.dump(NEW, open("_new_b3.json","w"), indent=2, ensure_ascii=False)
