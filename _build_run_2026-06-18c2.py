import json, datetime

TS = datetime.datetime.now(datetime.timezone.utc).isoformat()

def c(o, k, t, m):
    return {"objective": o, "observableCheck": k, "sampleTask": t, "materials": m}

NULLS_DEFAULT = ["remember-2","remember-3","remember-4","evaluate-1","evaluate-2"]
ORDER = ["remember-1","remember-2","remember-3","remember-4",
         "understand-1","understand-2","understand-3","understand-4",
         "apply-1","apply-2","apply-3","apply-4",
         "analyze-1","analyze-2","analyze-3","analyze-4",
         "evaluate-1","evaluate-2","evaluate-3","evaluate-4",
         "create-1","create-2","create-3","create-4"]

def matrix(code, stmt, subj, grade, cells, extra_nulls=None):
    nulls = set(NULLS_DEFAULT)
    if extra_nulls:
        nulls |= set(extra_nulls)
    full = {k: (None if k in nulls else cells[k]) for k in ORDER}
    return {"schema_version":1,"standardCode":code,"standardStatement":stmt,
            "subject":subj,"grade":grade,"generatedAt":TS,"cells":full}

NEW = {}

# ---------------- 2.3.8.HCDM.1 ----------------
NEW["2.3.8.HCDM.1"] = matrix(
 "2.3.8.HCDM.1",
 "Justify how the use of universal precautions, sanitation and waste disposal, proper food handling and storage, and environmental controls can prevent diseases and health conditions.",
 "chpe","8",{
 "remember-1": c(
  "Name the four prevention practices in this standard: universal precautions, sanitation and waste disposal, food handling and storage, and environmental controls.",
  "Each student lists all four practices on a card before checking with a partner.",
  "Guide displays the four prevention practices and removes them, then asks students to list all four from memory on an index card. Pairs compare lists and the Guide confirms the four on the board.",
  ["index cards","class board"]),
 "understand-1": c(
  "Describe what one prevention practice involves in everyday terms.",
  "Each student writes two sentences naming an action and the disease risk it lowers.",
  "Students pick one of the four practices, such as proper food storage. Each writes two sentences naming a real action and the disease risk it lowers. Pairs trade and check the action matches the practice and names a real risk.",
  ["practice fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how one practice breaks the path a germ takes from source to person.",
  "Each student writes a cause-and-effect sentence showing where the practice stops the germ.",
  "Guide reviews how germs travel from a source to a person. Students write a cause-and-effect sentence showing how one practice, such as handwashing, stops a germ along that path. Pairs check the sentence names where the germ is blocked.",
  ["germ-path diagram","lined paper"]),
 "understand-3": c(
  "Summarize how the four practices together lower disease risk in a setting like a cafeteria.",
  "Each student writes a paragraph naming at least three practices and what each prevents there.",
  "Students write a paragraph about a school cafeteria, summarizing how at least three of the practices lower disease risk in that setting and what each prevents. Pairs check the paragraph names real actions tied to the cafeteria.",
  ["practice fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why skipping one practice can undo the protection from the others.",
  "Each student writes two sentences showing how one missed step lets disease through.",
  "Guide poses a setting where three practices are followed but one is skipped. Students write two sentences explaining how the missed step lets disease through despite the others. Pairs compare and check the reasoning follows.",
  ["scenario card","lined paper"]),
 "apply-1": c(
  "Match six described actions to the prevention practice each belongs to.",
  "Each student writes the matching practice beside each of six action cards.",
  "Guide hands out six action cards, such as 'wears gloves to handle a cut' or 'stores raw meat below ready food.' Students write the matching practice beside each. Pairs compare and resolve mismatches by pointing to the action wording.",
  ["action cards","practice list"]),
 "apply-2": c(
  "Use a checklist to find prevention failures in a described kitchen or clinic.",
  "Each pair marks at least three failures and names the practice each violates.",
  "Guide gives each pair a scene description of a kitchen or clinic and a prevention checklist. Pairs mark at least three points where a practice is not followed and name the practice each violates. Pairs post findings and the Guide checks each against the scene.",
  ["scene description","prevention checklist"]),
 "apply-3": c(
  "Apply the four practices to design safe steps for one real task, such as serving lunch.",
  "Each student writes an ordered step list covering at least three practices.",
  "Students choose a real task, such as serving lunch or cleaning up a spill. Each writes an ordered step list that builds in at least three of the four practices. Pairs check each step ties to a practice and the order makes sense.",
  ["task card","practice list","lined paper"]),
 "apply-4": c(
  "Build a labeled prevention poster for one practice that shows the right steps.",
  "Each student produces a poster naming the practice and showing at least three correct steps.",
  "Students design a poster for one practice, naming it and showing at least three correct steps in order with simple drawings. Students post and trade, checking each step is accurate and clearly shown.",
  ["poster paper","practice fact sheet","markers"]),
 "analyze-1": c(
  "Identify which prevention practice matters most in a specific described setting.",
  "Each student names the practice and cites the setting clue behind the choice.",
  "Guide gives a setting, such as a daycare. Students name the practice that matters most there and cite the clue. Pairs compare and point to the detail behind each choice.",
  ["setting card","pencils"]),
 "analyze-2": c(
  "Compare two settings to determine which faces higher disease risk without prevention.",
  "Each student names the higher-risk setting with two pieces of evidence.",
  "Students read two short setting descriptions and decide which faces higher disease risk if practices are skipped, citing two details. Pairs discuss why some settings need stricter prevention than others.",
  ["two setting cards","comparison sheet"]),
 "analyze-3": c(
  "Distinguish a true universal precaution from a step that only looks protective.",
  "Each team sorts action cards into real-precaution and not-a-precaution columns and defends two.",
  "Guide gives teams cards mixing real precautions with steps that look safe but are not, such as rinsing gloves to reuse them. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a card that looks protective but is not.",
  ["action cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how one prevention failure in a case led to a chain of disease spread.",
  "Each team produces a labeled chain from the failure to at least three downstream effects.",
  "Guide provides a case where one missed practice started an outbreak. Teams build a labeled chain from the failure to at least three downstream effects. Teams post chains and the class marks the point the spread could have been stopped.",
  ["outbreak case","chain template","markers"]),
 "evaluate-3": c(
  "Justify which prevention practice a school should invest in first, and defend it.",
  "Each student writes a paragraph with a judgment, two reasons, and one trade-off.",
  "Guide presents a school choosing among the four practices to strengthen. Students write a paragraph justifying which to invest in first, with two reasons and one trade-off. Volunteers share and the class weighs the cases.",
  ["school scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate three sanitation plans and judge which best prevents disease in a setting.",
  "Each team rates three plans against a rubric and reports the strongest with evidence.",
  "Teams receive three sample sanitation plans for a cafeteria and a rubric scoring coverage, feasibility, and clarity. Teams rate each and write a note naming the strongest and the feature that earned the rating. Teams report out and the Guide flags any plan that misses a key practice.",
  ["plan set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm everyday places where these prevention practices keep people from getting sick.",
  "Each student adds at least three places to the class list.",
  "Open brainstorm. Guide asks, 'Where do these practices quietly keep people healthy every day?' Students name places such as kitchens, pools, hospitals, and buses. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how adding one missing practice could change health in a described setting.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a setting added one missing practice, how would health there change? The paragraph names at least two changed outcomes. Pairs trade and check the changes follow from the added practice.",
  ["setting notes","lined paper"]),
 "create-3": c(
  "Construct a one-page prevention guide grouping the four practices with example steps.",
  "Each team produces a guide with at least two example steps under each practice.",
  "Teams design a one-page guide grouping the four practices, each with at least two example steps in plain language. Teams trade guides and check each step is accurate and placed under the right practice.",
  ["guide template","practice fact sheet"]),
 "create-4": c(
  "Develop and test a short safety routine for one task and revise it after a trial.",
  "Each group runs the routine in a mock trial and submits one revision note.",
  "Groups write a short safety routine for a real task, such as cleaning a shared surface, building in the relevant practices. Groups run a mock trial while classmates check each step on a feedback card. Each group revises once and notes what changed and why.",
  ["routine planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.HCDM.2 ----------------
NEW["2.3.8.HCDM.2"] = matrix(
 "2.3.8.HCDM.2",
 "Determine the role of genetics in being susceptible to disease and health conditions and identify the types of behavior that might reduce the risk factors.",
 "chpe","8",{
 "remember-1": c(
  "Name two health conditions with a known genetic risk and two behaviors that lower risk.",
  "Each student lists two conditions and two behaviors on a card before checking with a partner.",
  "Guide displays the prompt: 'Name two conditions that can run in families and two behaviors that lower the risk.' Students write them on a card. Pairs compare and the Guide confirms accurate examples on the board.",
  ["index cards","class board"]),
 "understand-1": c(
  "Describe what it means for a condition to have a genetic risk factor.",
  "Each student writes two sentences explaining genetic risk in plain terms.",
  "Students write two sentences explaining what it means that a condition can run in families, using the idea of inherited risk rather than certainty. Pairs trade and check the sentences say risk, not guarantee.",
  ["genetics fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how a behavior can lower the risk of a condition a person is genetically prone to.",
  "Each student writes a cause-and-effect sentence linking a behavior to lower risk.",
  "Guide reviews how genes and behavior both shape risk. Students write a cause-and-effect sentence linking a behavior, such as regular activity, to lower risk of a condition like heart disease. Pairs check the sentence names a behavior and a clear effect on risk.",
  ["risk fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how genes and behavior together shape one person's disease risk.",
  "Each student writes a paragraph naming one genetic factor and two behaviors that change risk.",
  "Students write a paragraph summarizing how genes and behavior together shape risk for one condition, naming one genetic factor and two behaviors that change the risk. Pairs check both genes and behavior appear and the claims are accurate.",
  ["risk fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why two people with the same genetic risk can end up with different outcomes.",
  "Each student writes two sentences linking the difference to behavior or environment.",
  "Guide poses two people with the same family history but different habits. Students write two sentences explaining why their outcomes can differ, linking the difference to behavior or environment. Pairs compare and check the reasoning.",
  ["scenario card","lined paper"]),
 "apply-1": c(
  "Sort eight factors into genetic risk and behavioral risk categories.",
  "Each student places all eight factor cards into the correct column.",
  "Guide hands out eight factor cards, such as 'family history of diabetes' or 'eats few vegetables.' Students place each in the genetic or behavioral column. Pairs compare and resolve any disagreement by pointing to the card wording.",
  ["factor cards","sorting sheet"]),
 "apply-2": c(
  "Use a risk profile to identify which behaviors a described person could change.",
  "Each pair lists at least three changeable behaviors from the profile.",
  "Guide gives each pair a profile listing a person's family history and habits. Pairs list at least three behaviors the person could change to lower risk, leaving the genetic factors aside. Pairs post their list and the Guide checks each behavior is changeable and tied to risk.",
  ["risk profile","lined paper"]),
 "apply-3": c(
  "Apply risk knowledge to write a behavior plan for a person with a given family history.",
  "Each student writes a plan with at least three behavior goals tied to the history.",
  "Students read a person's family history. Each writes a behavior plan with at least three goals that lower the risks tied to that history. Pairs check each goal connects to a real risk and is something the person controls.",
  ["family history card","plan template"]),
 "apply-4": c(
  "Build a labeled risk diagram separating fixed factors from factors a person can change.",
  "Each student produces a two-zone diagram with at least three items in each zone.",
  "Students draw a diagram with a fixed zone and a changeable zone. They place at least three genetic or fixed factors in one zone and three behaviors in the other for a chosen condition. Students trade diagrams and check each item is in the right zone.",
  ["diagram template","risk fact sheet","markers"]),
 "analyze-1": c(
  "Identify which behavior in a profile would most lower the person's disease risk.",
  "Each student names the behavior and cites the profile detail behind it.",
  "Guide gives a profile with several habits. Students name the one behavior change that would most lower risk and cite the detail. Pairs compare and point to the evidence.",
  ["risk profile","pencils"]),
 "analyze-2": c(
  "Compare two people to determine whose risk is shaped more by behavior than genes.",
  "Each student names the person with two pieces of evidence.",
  "Students read two profiles and decide whose risk is driven more by behavior than by genes, citing two details. Pairs discuss why this matters for deciding what a person can change.",
  ["two profiles","comparison sheet"]),
 "analyze-3": c(
  "Distinguish a claim that genes cause a condition from a claim that genes raise its risk.",
  "Each team sorts statement cards into cause and risk-factor columns and defends two.",
  "Guide gives teams statement cards, some overclaiming that genes cause a condition and some correctly naming raised risk. Teams sort each and prepare to defend two placements. During share-out the Guide presses on an overclaiming card.",
  ["statement cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how behavior changed disease risk over time in a detailed case.",
  "Each team produces a timeline showing at least three behavior changes and their effect on risk.",
  "Guide provides a detailed case following a person with a family history over years. Teams build a timeline placing at least three behavior changes in order and noting the effect on risk at each. Teams post timelines and the class marks the change that mattered most.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue which one behavior change a person with a strong family history should start first, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide presents a person with a strong family history of a condition. Students write a paragraph judging which behavior change to start first, with two reasons tied to the risk. Volunteers share and the class weighs the cases.",
  ["case handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate three health messages and judge which most accurately explains genes and behavior.",
  "Each team rates three messages against a rubric and reports the strongest with evidence.",
  "Teams receive three sample health messages and a rubric scoring accuracy, balance, and clarity. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any message that says genes alone decide the outcome.",
  ["message set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm habits teens can build now that lower future disease risk.",
  "Each student adds at least three habits to the class list.",
  "Open brainstorm. Guide asks, 'What habits started now could lower disease risk later?' Students name habits such as staying active, not vaping, and regular checkups. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how steady behavior changes could shift a person's risk despite family history.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a person with a family history kept up healthy habits for years, how would their risk change? The paragraph names at least two changed outcomes. Pairs trade and check the changes follow from the habits.",
  ["risk notes","lined paper"]),
 "create-3": c(
  "Construct a one-page guide that pairs common genetic risks with behaviors that lower them.",
  "Each team produces a guide pairing at least three conditions with risk-lowering behaviors.",
  "Teams design a one-page guide pairing at least three conditions that carry genetic risk with behaviors that lower each, in plain language. Teams trade guides and check each pairing is accurate and the behavior is something a person controls.",
  ["guide template","risk fact sheet"]),
 "create-4": c(
  "Develop and test a short message urging a healthy habit for at-risk peers, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message encouraging one risk-lowering habit without shaming anyone for their genes. Groups deliver it to a test audience who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.HCDM.3 ----------------
NEW["2.3.8.HCDM.3"] = matrix(
 "2.3.8.HCDM.3",
 "Describe behaviors which may contribute to or prevent a person from being susceptible to disease and illness (e.g., cardiovascular, stroke, hepatitis, sexually transmitted infections (STIs), HIV/AIDS, breast cancer, HPV, testicular cancer).",
 "chpe","8",{
 "remember-1": c(
  "Name one behavior that raises risk and one that lowers risk for two of the listed conditions.",
  "Each student writes four behaviors on a card, marked raises or lowers, for two conditions.",
  "Guide displays the prompt and a short condition list. Students pick two conditions and write one risk-raising and one risk-lowering behavior for each, marked on a card. Pairs compare and the Guide confirms accurate examples.",
  ["index cards","condition list"]),
 "understand-1": c(
  "Describe how one behavior raises the risk of a specific condition.",
  "Each student writes two sentences naming the behavior and the condition it affects.",
  "Students pick one risk-raising behavior, such as smoking. Each writes two sentences naming the behavior and a condition it raises risk for, such as stroke. Pairs trade and check the link is accurate.",
  ["behavior fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how a protective behavior lowers the risk of a specific condition.",
  "Each student writes a cause-and-effect sentence linking the behavior to lower risk.",
  "Guide reviews protective behaviors. Students write a cause-and-effect sentence linking a protective behavior, such as HPV vaccination, to lower risk of a condition. Pairs check the sentence names a behavior and a clear effect on risk.",
  ["behavior fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize the behaviors that raise and lower risk for one condition.",
  "Each student writes a paragraph naming at least two raising and two lowering behaviors.",
  "Students choose one condition and write a paragraph summarizing behaviors that raise and lower its risk, naming at least two of each. Pairs check the behaviors are accurate and matched to the condition.",
  ["behavior fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why one behavior can affect risk for more than one condition.",
  "Each student writes two sentences naming the behavior and at least two conditions it touches.",
  "Guide notes that some behaviors touch many conditions. Students write two sentences naming one behavior, such as not smoking, and at least two conditions it affects. Pairs compare and check both links are accurate.",
  ["behavior fact sheet","lined paper"]),
 "apply-1": c(
  "Match eight behaviors to whether each raises or lowers disease risk.",
  "Each student marks all eight behavior cards as raises or lowers.",
  "Guide hands out eight behavior cards. Students mark each as raising or lowering risk and name one condition it affects. Pairs compare and resolve disagreements by checking the fact sheet.",
  ["behavior cards","behavior fact sheet"]),
 "apply-2": c(
  "Use a fact sheet to identify the risk behaviors in a described person's routine.",
  "Each pair lists at least three risk behaviors and the condition each affects.",
  "Guide gives each pair a profile of a person's daily routine and a fact sheet. Pairs list at least three behaviors that raise risk and name the condition each affects. Pairs post the list and the Guide checks each against the profile.",
  ["routine profile","behavior fact sheet"]),
 "apply-3": c(
  "Apply protective behaviors to revise a described person's routine to lower risk.",
  "Each student rewrites the routine with at least three protective changes named.",
  "Students read a person's risky routine. Each rewrites it with at least three protective changes, naming the condition each change protects against. Pairs check each change is realistic and lowers a named risk.",
  ["routine profile","behavior fact sheet"]),
 "apply-4": c(
  "Build a labeled chart pairing behaviors with the conditions they raise or lower.",
  "Each student produces a chart with at least three behaviors, each linked to a condition and direction.",
  "Students build a chart pairing at least three behaviors with the conditions they affect and whether they raise or lower risk. Students trade charts and check each pairing is accurate and the direction is correct.",
  ["chart template","behavior fact sheet","markers"]),
 "analyze-1": c(
  "Identify which behavior in a profile raises the most disease risk.",
  "Each student names the behavior and cites the profile detail behind it.",
  "Guide gives a profile with several behaviors. Students name the one that raises the most risk and cite the detail. Pairs compare and point to the evidence.",
  ["routine profile","pencils"]),
 "analyze-2": c(
  "Compare two routines to determine which carries higher disease risk.",
  "Each student names the higher-risk routine with two pieces of evidence.",
  "Students read two routines and decide which carries higher disease risk, citing two behaviors. Pairs discuss why small daily behaviors add up to large differences in risk.",
  ["two routines","comparison sheet"]),
 "analyze-3": c(
  "Distinguish a behavior that prevents a disease from one that only treats it after.",
  "Each team sorts behavior cards into prevention and treatment columns and defends two.",
  "Guide gives teams cards mixing prevention behaviors with treatment actions. Teams sort each into prevention or treatment and prepare to defend two placements. During share-out the Guide presses on a card that could look like either.",
  ["behavior cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how behaviors over time shaped disease risk in a detailed case.",
  "Each team produces a timeline showing at least three behaviors and their effect on risk.",
  "Guide provides a detailed case following a person's behaviors over years. Teams build a timeline placing at least three behaviors in order and noting the effect on risk at each. Teams post timelines and the class marks the behavior that shifted risk most.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue which one protective behavior gives teens the most benefit across conditions, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide asks which single protective behavior helps teens most across the listed conditions. Students write a paragraph naming their choice with two reasons drawn from the evidence. Volunteers share and the class weighs the cases.",
  ["behavior notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three health campaigns and judge which most accurately links behavior to disease risk.",
  "Each team rates three campaigns against a rubric and reports the strongest with evidence.",
  "Teams receive three sample health campaigns and a rubric scoring accuracy, clarity, and tone. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any campaign that overstates or misstates risk.",
  ["campaign set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm protective behaviors teens can start now to lower lifelong disease risk.",
  "Each student adds at least three behaviors to the class list.",
  "Open brainstorm. Guide asks, 'What can teens do now to lower disease risk for life?' Students name behaviors such as activity, vaccines, and avoiding tobacco. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how a set of protective behaviors could change a person's disease risk over a decade.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a person kept up several protective behaviors for ten years, how would their disease risk change? The paragraph names at least two changed outcomes. Pairs trade and check the changes follow from the behaviors.",
  ["behavior notes","lined paper"]),
 "create-3": c(
  "Construct a one-page guide pairing behaviors with the conditions they raise or lower.",
  "Each team produces a guide grouping at least four behaviors by effect with accurate condition links.",
  "Teams design a one-page guide grouping at least four behaviors into raises-risk and lowers-risk, each linked to a condition, in plain language. Teams trade guides and check each link is accurate and grouped correctly.",
  ["guide template","behavior fact sheet"]),
 "create-4": c(
  "Develop and test a short message promoting one protective behavior, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message promoting one protective behavior with accurate facts. Groups deliver it to a test audience who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.HCDM.4 ----------------
NEW["2.3.8.HCDM.4"] = matrix(
 "2.3.8.HCDM.4",
 "Describe the signs, symptoms, and potential impacts of STIs (including HIV).",
 "chpe","8",{
 "remember-1": c(
  "Name three common signs or symptoms of STIs and one reason some show no symptoms.",
  "Each student lists three signs and the no-symptom reason on a card.",
  "Guide displays the prompt using accurate medical terms. Students write three common signs or symptoms and note that some STIs show no symptoms at all. Pairs compare and the Guide confirms an accurate list on the board.",
  ["index cards","fact sheet"]),
 "understand-1": c(
  "Describe the difference between a sign and a symptom of an STI.",
  "Each student writes two sentences giving one example of each.",
  "Students write two sentences explaining that a sign is something observed and a symptom is something felt, giving one accurate example of each. Pairs trade and check both examples fit the definitions.",
  ["fact sheet","lined paper"]),
 "understand-2": c(
  "Explain why many STIs can be present without obvious symptoms.",
  "Each student writes a cause-and-effect sentence linking no symptoms to delayed detection.",
  "Guide reviews that many STIs, including HIV, can be present without obvious symptoms. Students write a cause-and-effect sentence explaining how the lack of symptoms can delay detection and testing. Pairs check the sentence names cause and effect.",
  ["fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize the potential health impacts of an untreated STI.",
  "Each student writes a paragraph naming at least three possible long-term impacts.",
  "Students write a paragraph summarizing potential impacts of an untreated STI, naming at least three accurate long-term effects such as ongoing infection or harm to future health. Pairs check the impacts are accurate and not exaggerated.",
  ["fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why early testing changes the impact of an STI.",
  "Each student writes two sentences linking early testing to better outcomes.",
  "Guide reviews that early testing and care change outcomes. Students write two sentences explaining how finding an STI early lowers its impact compared with finding it late. Pairs compare and check the reasoning.",
  ["fact sheet","lined paper"]),
 "apply-1": c(
  "Sort eight statements into accurate and inaccurate descriptions of STI signs and impacts.",
  "Each student marks all eight statement cards accurate or inaccurate.",
  "Guide hands out eight statement cards about STI signs and impacts, some accurate and some myths. Students mark each accurate or inaccurate using the fact sheet. Pairs compare and resolve disagreements by checking the sheet.",
  ["statement cards","fact sheet"]),
 "apply-2": c(
  "Use a fact sheet to identify which described situations call for STI testing.",
  "Each pair marks at least three situations and names the reason testing fits.",
  "Guide gives each pair situation cards and a fact sheet. Pairs mark at least three situations where testing is the right next step and name the reason. Pairs post their choices and the Guide checks each against the sheet.",
  ["situation cards","fact sheet"]),
 "apply-3": c(
  "Apply accurate facts to correct three myths about STI signs and impacts.",
  "Each student rewrites three myth statements into accurate ones.",
  "Students receive three common myths about STIs. Each rewrites all three into accurate statements using the fact sheet. Pairs check each correction is accurate and clearly worded.",
  ["myth cards","fact sheet"]),
 "apply-4": c(
  "Build a labeled fact card on STI signs, symptoms, and impacts for a peer.",
  "Each student produces a card with at least two accurate points in each category.",
  "Students design a fact card with three sections: signs, symptoms, and impacts, each with at least two accurate points in plain language. Students trade cards and check each point is accurate and placed in the right section.",
  ["card template","fact sheet","markers"]),
 "analyze-1": c(
  "Identify which fact about STIs is most important for prevention and explain why.",
  "Each student names the fact and cites the reason it matters most.",
  "Guide gives a short fact set. Students name the fact most important for prevention, such as that many STIs show no symptoms, and explain why. Pairs compare and point to the reasoning.",
  ["fact set","pencils"]),
 "analyze-2": c(
  "Compare two information sources to determine which describes STI impacts more accurately.",
  "Each student names the more accurate source with two pieces of evidence.",
  "Students read two short sources about STI impacts, one accurate and one with errors. Each names the more accurate source and gives two pieces of evidence. Pairs discuss why accurate information matters for health decisions.",
  ["two sources","comparison sheet"]),
 "analyze-3": c(
  "Distinguish an accurate STI fact from a stigmatizing or false claim.",
  "Each team sorts statement cards into fact and stigma-or-myth columns and defends two.",
  "Guide gives teams cards mixing accurate facts with stigmatizing or false claims. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a card that sounds factual but stigmatizes.",
  ["statement cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how delaying testing changed outcomes in a detailed case.",
  "Each team produces a timeline showing how impact grew while testing was delayed.",
  "Guide provides a detailed, non-graphic case where testing was delayed. Teams build a timeline showing how the potential impact grew over time and mark the point where earlier testing would have changed the outcome. Teams post timelines and compare.",
  ["case handout","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue what one message would most improve teen understanding of STIs, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide asks what single accurate message would most improve teen understanding of STIs. Students write a paragraph naming their choice with two reasons. Volunteers share and the class weighs the cases.",
  ["fact notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three health resources and judge which most accurately and respectfully explains STIs.",
  "Each team rates three resources against a rubric and reports the strongest with evidence.",
  "Teams receive three sample health resources and a rubric scoring accuracy, clarity, and respect. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any resource that is inaccurate or shaming.",
  ["resource set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm accurate questions a teen could ask a clinician about STI testing.",
  "Each student adds at least three questions to the class list.",
  "Open brainstorm. Guide asks, 'What could a teen ask a doctor or nurse about testing?' Students name questions such as what tests exist and whether results are private. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how routine testing could change STI impacts across a community.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if regular testing were common and stigma-free, how would STI impacts change for a community? The paragraph names at least two changed outcomes. Pairs trade and check the changes follow from routine testing.",
  ["fact notes","lined paper"]),
 "create-3": c(
  "Construct a one-page accurate, respectful STI information sheet for peers.",
  "Each team produces a sheet with accurate sections on signs, impacts, and testing.",
  "Teams design a one-page information sheet with accurate, respectful sections on signs and symptoms, potential impacts, and where to get tested. Teams trade sheets and check each point is accurate and free of stigma.",
  ["sheet template","fact sheet"]),
 "create-4": c(
  "Develop and test a short message encouraging testing without stigma, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message encouraging STI testing in an accurate, non-stigmatizing way. Groups deliver it to a test audience who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.HCDM.6 ----------------
NEW["2.3.8.HCDM.6"] = matrix(
 "2.3.8.HCDM.6",
 "Explain how the immune system fights disease.",
 "chpe","8",{
 "remember-1": c(
  "Name three parts of the immune system and what each does in one phrase.",
  "Each student labels three parts on a diagram before checking with a partner.",
  "Guide gives a simple immune-system diagram with three blanks. Students label parts such as white blood cells, antibodies, and the skin barrier with a one-phrase job for each. Pairs compare and the Guide confirms the labels.",
  ["immune diagram","pencils"]),
 "understand-1": c(
  "Describe what one part of the immune system does when a germ enters the body.",
  "Each student writes two sentences naming the part and its action.",
  "Students pick one immune part, such as white blood cells. Each writes two sentences naming the part and what it does when a germ enters. Pairs trade and check the action is accurate.",
  ["immune fact sheet","lined paper"]),
 "understand-2": c(
  "Explain the order of steps the immune system takes to fight an infection.",
  "Each student writes the steps in order showing cause and effect.",
  "Guide reviews the basic immune response. Students write the steps in order, from a germ entering to the body clearing it, showing how each step leads to the next. Pairs check the order and the cause-and-effect links.",
  ["immune fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how the immune system remembers a germ after the first infection.",
  "Each student writes a paragraph explaining immune memory and faster second response.",
  "Students write a paragraph summarizing how the immune system remembers a germ so it responds faster the second time, naming the role of memory cells. Pairs check the paragraph explains memory and a faster response.",
  ["immune fact sheet","lined paper"]),
 "understand-4": c(
  "Explain how a vaccine uses the immune system's memory to prevent disease.",
  "Each student writes two sentences linking a vaccine to immune memory.",
  "Guide reviews how vaccines work. Students write two sentences explaining how a vaccine trains the immune system to remember a germ without causing the disease. Pairs compare and check the reasoning.",
  ["immune fact sheet","lined paper"]),
 "apply-1": c(
  "Order five immune-response steps into the correct sequence.",
  "Each student arranges all five step cards in order.",
  "Guide hands out five step cards describing the immune response out of order. Students arrange them in the correct sequence on a strip. Pairs compare and resolve disagreements by checking the fact sheet.",
  ["step cards","sequence strip"]),
 "apply-2": c(
  "Use the immune model to explain what happens in a described infection.",
  "Each pair writes a short account naming at least three immune actions in order.",
  "Guide gives each pair a scenario of a person catching a cold. Pairs write a short account naming at least three immune actions in order. Pairs post accounts and the Guide checks each action is accurate and in order.",
  ["scenario card","immune fact sheet"]),
 "apply-3": c(
  "Apply the immune model to predict how the body responds to a second exposure.",
  "Each student writes a prediction naming the role of memory cells.",
  "Students read about a person exposed to a germ a second time. Each writes a prediction of how the body responds faster, naming the role of memory cells. Pairs check the prediction uses immune memory correctly.",
  ["scenario card","immune fact sheet"]),
 "apply-4": c(
  "Build a labeled flow diagram of the immune response to one germ.",
  "Each student produces a diagram with at least four labeled steps in order.",
  "Students draw a flow diagram tracing the immune response to one germ, with at least four labeled steps in order. Students trade diagrams and check each step is accurate and the arrows show the right order.",
  ["diagram template","immune fact sheet","markers"]),
 "analyze-1": c(
  "Identify which immune part is most important in stopping a germ at the body's surface.",
  "Each student names the part and cites the reason.",
  "Guide describes a germ landing on the skin. Students name the immune part most important at that stage and cite the reason. Pairs compare and point to the reasoning.",
  ["immune fact sheet","pencils"]),
 "analyze-2": c(
  "Compare a first and second exposure to the same germ to determine which response is faster.",
  "Each student names the faster response with two pieces of evidence.",
  "Students read about a first and second exposure to the same germ. Each names which response is faster and gives two pieces of evidence about memory cells. Pairs discuss why this is the basis of immunity.",
  ["scenario cards","comparison sheet"]),
 "analyze-3": c(
  "Distinguish an accurate statement about immunity from a common myth.",
  "Each team sorts statement cards into accurate and myth columns and defends two.",
  "Guide gives teams cards mixing accurate immune facts with myths, such as that vaccines overload the system. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a myth that sounds plausible.",
  ["statement cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how a weakened immune step in a case changed the body's ability to fight a germ.",
  "Each team produces a labeled chain from the weak step to its downstream effects.",
  "Guide provides a case where one immune step is weakened. Teams build a labeled chain showing how the weak step changes the body's response downstream. Teams post chains and the class marks where the response broke down.",
  ["case handout","chain template","markers"]),
 "evaluate-3": c(
  "Argue which one habit best supports a strong immune system, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide asks which single habit, such as sleep or vaccination, best supports immune function. Students write a paragraph naming their choice with two reasons drawn from the immune model. Volunteers share and the class weighs the cases.",
  ["immune notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three explanations of the immune system and judge which is most accurate and clear.",
  "Each team rates three explanations against a rubric and reports the strongest with evidence.",
  "Teams receive three sample explanations of immune defense and a rubric scoring accuracy, clarity, and completeness. Teams rate each and write a note naming the strongest and the feature that earned the rating. Teams report out and the Guide flags any explanation with an error.",
  ["explanation set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm everyday habits that help or hurt the immune system.",
  "Each student adds at least three habits to the class list.",
  "Open brainstorm. Guide asks, 'What helps or hurts your body's defenses?' Students name habits such as sleep, handwashing, and poor diet. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how a vaccine campaign could change disease spread in a school.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if most students were vaccinated against a germ, how would spread in the school change? The paragraph names at least two changed outcomes and uses immune memory. Pairs trade and check the reasoning.",
  ["immune notes","lined paper"]),
 "create-3": c(
  "Construct a labeled model or comic that shows the immune system fighting a germ.",
  "Each team produces a model with at least four accurate, ordered steps.",
  "Teams build a labeled model or comic showing the immune system fighting one germ, with at least four accurate steps in order. Teams trade models and check each step is accurate and clearly ordered.",
  ["poster paper","immune fact sheet","markers"]),
 "create-4": c(
  "Develop and test a short explainer that teaches a younger student how immunity works, then revise it.",
  "Each group delivers the explainer to a test listener and submits one revision note.",
  "Groups create a short explainer that teaches a younger student how the immune system fights disease, in plain words. Groups deliver it to a test listener who rates accuracy and clarity on a feedback card. Each group revises once and notes what changed and why.",
  ["explainer planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.HCDM.7 ----------------
NEW["2.3.8.HCDM.7"] = matrix(
 "2.3.8.HCDM.7",
 "Explain how certain methods of disease prevention, treatment strategies, and appropriate medicine use promote health-enhancing behaviors.",
 "chpe","8",{
 "remember-1": c(
  "Name one example each of disease prevention, a treatment strategy, and appropriate medicine use.",
  "Each student writes one example in each of three boxes on a card.",
  "Guide gives a card with three boxes labeled prevention, treatment, and medicine use. Students write one accurate example in each box. Pairs compare and the Guide confirms accurate examples on the board.",
  ["index cards","fact sheet"]),
 "understand-1": c(
  "Describe what appropriate medicine use means in plain terms.",
  "Each student writes two sentences naming a rule of safe medicine use.",
  "Students write two sentences describing appropriate medicine use, naming a rule such as following the dose and finishing a prescription as directed. Pairs trade and check the rule is accurate.",
  ["fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how following a treatment plan promotes a health-enhancing behavior.",
  "Each student writes a cause-and-effect sentence linking the plan to a healthy habit.",
  "Guide reviews how treatment plans build habits. Students write a cause-and-effect sentence linking following a plan, such as taking medicine on schedule, to a health-enhancing behavior. Pairs check the sentence names cause and effect.",
  ["fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how prevention, treatment, and medicine use work together for one condition.",
  "Each student writes a paragraph naming one example of each for the condition.",
  "Students choose one condition and write a paragraph summarizing how prevention, treatment, and appropriate medicine use work together, naming one accurate example of each. Pairs check all three appear and are accurate.",
  ["fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why misusing medicine can undo the benefit of a treatment.",
  "Each student writes two sentences showing how misuse harms the outcome.",
  "Guide reviews risks of misuse. Students write two sentences explaining how skipping doses or sharing medicine can undo the benefit of treatment. Pairs compare and check the reasoning.",
  ["fact sheet","lined paper"]),
 "apply-1": c(
  "Sort eight actions into prevention, treatment, and medicine-use categories.",
  "Each student places all eight action cards into the correct column.",
  "Guide hands out eight action cards. Students place each into prevention, treatment, or medicine use on a sorting sheet. Pairs compare and resolve disagreements by checking the fact sheet.",
  ["action cards","sorting sheet"]),
 "apply-2": c(
  "Use a fact sheet to identify safe and unsafe medicine use in a described situation.",
  "Each pair marks at least three actions safe or unsafe with a reason.",
  "Guide gives each pair a scenario showing a person using medicine and a fact sheet. Pairs mark at least three actions safe or unsafe and give a reason for each. Pairs post findings and the Guide checks each against the sheet.",
  ["scenario card","fact sheet"]),
 "apply-3": c(
  "Apply safe-use rules to write directions for taking a sample medicine correctly.",
  "Each student writes clear directions covering dose, timing, and one safety rule.",
  "Students read a sample medicine label. Each writes clear directions for a peer covering dose, timing, and one safety rule. Pairs check the directions match the label and include a safety rule.",
  ["sample label","fact sheet"]),
 "apply-4": c(
  "Build a labeled poster showing how prevention, treatment, and medicine use protect health.",
  "Each student produces a poster with at least one accurate example in each section.",
  "Students design a three-section poster on prevention, treatment, and appropriate medicine use, with at least one accurate example in each. Students trade posters and check each example fits its section.",
  ["poster paper","fact sheet","markers"]),
 "analyze-1": c(
  "Identify which method in a case did the most to protect the person's health.",
  "Each student names the method and cites the case clue.",
  "Guide gives a case using prevention, treatment, and medicine. Students name the method that did the most to protect health and cite the clue. Pairs compare and point to the evidence.",
  ["case handout","pencils"]),
 "analyze-2": c(
  "Compare two patients to determine whose medicine use better supported recovery.",
  "Each student names the patient with two pieces of evidence.",
  "Students read two short patient accounts and decide whose medicine use better supported recovery, citing two details. Pairs discuss why following directions changes outcomes.",
  ["two patient accounts","comparison sheet"]),
 "analyze-3": c(
  "Distinguish appropriate medicine use from misuse in a set of described actions.",
  "Each team sorts action cards into appropriate and misuse columns and defends two.",
  "Guide gives teams cards mixing appropriate use with misuse, such as sharing a prescription. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a card that looks fine but is misuse.",
  ["action cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how a person's choices across prevention, treatment, and medicine use shaped their health over time.",
  "Each team produces a timeline showing at least three choices and their health effects.",
  "Guide provides a detailed case following a person's health choices over time. Teams build a timeline placing at least three choices in order and noting the health effect of each. Teams post timelines and the class marks the choice that mattered most.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue which method does the most to promote health-enhancing behavior, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide asks which method, prevention, treatment, or medicine use, does the most to promote healthy behavior. Students write a paragraph naming their choice with two reasons. Volunteers share and the class weighs the cases.",
  ["fact notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three medicine labels or instructions and judge which best supports safe use.",
  "Each team rates three labels against a rubric and reports the strongest with evidence.",
  "Teams receive three sample medicine labels or instruction sheets and a rubric scoring clarity, completeness, and safety. Teams rate each and write a note naming the strongest and the feature that earned the rating. Teams report out and the Guide flags any label that could lead to misuse.",
  ["label set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm health-enhancing habits that come from following prevention and treatment advice.",
  "Each student adds at least three habits to the class list.",
  "Open brainstorm. Guide asks, 'What good habits grow from following health advice?' Students name habits such as regular checkups, finishing prescriptions, and reading labels. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how good medicine habits could change a person's long-term health.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a person always used medicine appropriately and followed prevention advice, how would their long-term health change? The paragraph names at least two changed outcomes. Pairs trade and check the reasoning.",
  ["fact notes","lined paper"]),
 "create-3": c(
  "Construct a one-page guide to safe medicine use and prevention habits for peers.",
  "Each team produces a guide with accurate sections on prevention, treatment, and medicine use.",
  "Teams design a one-page guide with accurate sections on prevention habits, following treatment, and safe medicine use, each with at least two plain-language tips. Teams trade guides and check each tip is accurate and placed correctly.",
  ["guide template","fact sheet"]),
 "create-4": c(
  "Develop and test a short message promoting safe medicine use, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message promoting safe medicine use with accurate rules. Groups deliver it to a test audience who rate accuracy and clarity on a feedback card. Each group revises once and notes what changed and why.",
  ["message planning sheet","feedback cards","timer"]),
})

print("authored", len(NEW))
json.dump(NEW, open("_new_c2.json","w"), indent=2, ensure_ascii=False)
