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

# ---------------- 2.3.8.DSDT.2 ----------------
NEW["2.3.8.DSDT.2"] = matrix(
 "2.3.8.DSDT.2",
 "Compare and contrast the various services that are available for individuals affected by substance disorders in the community and at the state level.",
 "chpe","8",{
 "remember-1": c(
  "Name four services available to a person with a substance disorder, two local and two at the state level.",
  "Each student lists four services on an index card, marking each local or state.",
  "Guide displays the prompt: 'List four places or programs that help someone with a substance use problem.' Students write four on an index card and mark each as local or state. Cards go on a class board sorted into a local column and a state column.",
  ["index cards","class board"]),
 "understand-1": c(
  "Describe what one community service and one state service each do for a person with a substance disorder.",
  "Each student writes one sentence per service naming who it serves and what it offers.",
  "Students pick one community service (such as a local counseling center) and one state service (such as a state helpline). Each student writes one sentence per service naming who it serves and what it offers. Pairs trade and check both sentences name a real form of help.",
  ["service fact sheet","lined paper"]),
 "understand-2": c(
  "Explain why a person might choose a community service over a state service, or the reverse.",
  "Each student writes two sentences linking a service feature to a person's need.",
  "Guide gives short descriptions of a walk-in community clinic and a statewide phone line. Students write two sentences explaining when a person would pick each, linking a feature such as cost or distance to a need. Pairs share and the Guide records the clearest reasons on the board.",
  ["service descriptions","lined paper"]),
 "understand-3": c(
  "Summarize the range of services across community and state levels in a short paragraph.",
  "Each student produces a paragraph naming at least three services and what each provides.",
  "Students read a one-page list of community and state services. Each writes a paragraph summarizing the range, naming at least three services and what each provides. The paragraph must include at least one community service and one state service. Pairs check that both levels appear.",
  ["service list handout","lined paper"]),
 "understand-4": c(
  "Explain how community and state services connect, so a person moves from one to another.",
  "Each student draws a two-step path showing a referral from one service to another.",
  "Guide explains that services often refer people to each other. Students draw a two-step path showing how a person could start at a local clinic and be referred to a state-funded program, labeling each step. Pairs compare paths and check each step names a real service and a reason for the referral.",
  ["service list handout","blank path template"]),
 "apply-1": c(
  "Match four sample needs to the service that fits each best.",
  "Each student writes the matching service beside each of four need cards.",
  "Guide hands out four need cards, such as 'needs a free local meeting tonight' or 'wants a statewide number to call any hour.' Students write the matching service beside each card from the service list. Pairs compare and resolve any mismatch by pointing to the service feature that fits.",
  ["need cards","service list handout"]),
 "apply-2": c(
  "Use a service directory to find the right service for a described person.",
  "Each pair locates and records the service name, level, and contact type for one scenario.",
  "Guide gives each pair a short scenario about a person seeking help and a one-page service directory. Pairs locate a fitting service and record its name, whether it is community or state, and how to reach it. Pairs post their choice and the Guide checks the service matches the scenario.",
  ["scenario card","service directory"]),
 "apply-3": c(
  "Apply a two-column compare-and-contrast frame to one community service and one state service.",
  "Each student fills a frame with at least two shared features and two differences.",
  "Students choose one community service and one state service from the directory. Using a compare-and-contrast frame, each student records at least two features the services share and two ways they differ, such as cost, hours, or who runs them. Pairs check that every entry is supported by the directory.",
  ["service directory","compare-contrast frame"]),
 "apply-4": c(
  "Build a labeled resource card for a peer that lists three services by level and use.",
  "Each student produces a finished card naming three services, marking level and one-line use.",
  "Students design a pocket-size resource card a peer could keep. The card names three services, marks each as community or state, and gives a one-line use for each. Students trade cards and check each entry is accurate and clearly labeled by level.",
  ["card template","service directory","markers"]),
 "analyze-1": c(
  "Identify the single most important difference between a chosen community and state service.",
  "Each student names the key difference and cites the directory entry behind it.",
  "Guide gives one community and one state service description. Students name the one difference that matters most for a person seeking help and cite the entry behind it. Pairs compare choices and point to the text that supports each.",
  ["two service descriptions","pencils"]),
 "analyze-2": c(
  "Compare two services to determine which better fits a specific person's situation.",
  "Each student names the better-fit service with two pieces of evidence.",
  "Students read a short profile of a person and two service descriptions. Each decides which service fits better and gives two pieces of evidence from the descriptions. Pairs discuss why fit, not just availability, matters when someone reaches out for help.",
  ["person profile","two service descriptions","comparison sheet"]),
 "analyze-3": c(
  "Distinguish services that treat the disorder from services that provide support around it.",
  "Each team sorts service cards into treatment and support columns and defends two placements.",
  "Guide gives teams service cards mixing treatment programs with support resources such as transportation or housing help. Teams sort each into treatment or support and prepare to defend two placements. During share-out the Guide presses on a card that could fit either column.",
  ["service cards","sorting mat"]),
 "analyze-4": c(
  "Analyze gaps in a town's service list and identify a need that is not covered.",
  "Each team marks one uncovered need and the evidence that the list misses it.",
  "Guide provides a sample town's full service list and a set of common needs. Teams check each need against the list and mark one need the town does not cover well. Teams post the gap and the evidence, and the class discusses how a state service might fill it.",
  ["town service list","needs checklist","markers"]),
 "evaluate-3": c(
  "Argue which one service a town should add first and defend the choice.",
  "Each student writes a paragraph with a judgment, two reasons, and one trade-off.",
  "Guide presents a town with three candidate services it could add. Students write a paragraph judging which to add first, giving two reasons and naming one trade-off. Volunteers share and the class weighs the strongest cases.",
  ["town scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate three service brochures and judge which most clearly helps a person take a next step.",
  "Each team rates three brochures against a rubric and reports the strongest with evidence.",
  "Teams receive three sample service brochures and a rubric scoring clarity, accuracy, and ease of next step. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any brochure that promises more than a real service can offer.",
  ["brochure set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm the kinds of help a person with a substance disorder might need beyond medical care.",
  "Each student adds at least three needs to the class list.",
  "Open brainstorm. Guide asks, 'Besides treatment, what does someone recovering from a substance problem need?' Students name needs such as a ride to appointments, a job, or a friend to check in. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how a fuller set of services could change a person's chance of recovery.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a town offered both treatment and support services together, how would a person's recovery change? The paragraph names at least two changed outcomes. Pairs trade and check the outcomes follow from the added services.",
  ["service notes","lined paper"]),
 "create-3": c(
  "Construct a one-page community-and-state resource guide grouped by type of help.",
  "Each team produces a finished guide with at least two services per group and correct level labels.",
  "Teams design a one-page resource guide grouping services into treatment, counseling, and family support, with at least two services per group. Each entry is labeled community or state and written in plain language. Teams trade guides and check each service is correctly grouped and labeled.",
  ["guide template","service directory"]),
 "create-4": c(
  "Develop and test a short referral script that helps a peer reach the right service, then revise it.",
  "Each group delivers the script to a test listener and submits one revision note.",
  "Groups write a short script a peer could use to point a friend toward a fitting service, naming the service and the next step. Groups deliver the script to a test listener who rates clarity and accuracy on a feedback card. Each group revises once and notes what changed and why before a final read.",
  ["script planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.DSDT.3 ----------------
NEW["2.3.8.DSDT.3"] = matrix(
 "2.3.8.DSDT.3",
 "Determine the impact that alcohol and drugs can have on an individual’s social, emotional, and physical well-being.",
 "chpe","8",{
 "remember-1": c(
  "Name two impacts of alcohol or drugs for each area: social, emotional, and physical.",
  "Each student writes six impacts on a three-column chart before checking with a partner.",
  "Guide gives a blank three-column chart labeled social, emotional, and physical. Students write two impacts of alcohol or drugs in each column. Pairs compare charts and the Guide confirms a shared list on the board.",
  ["three-column chart","pencils"]),
 "understand-1": c(
  "Describe one physical impact of a substance in plain everyday terms.",
  "Each student writes a two-sentence description naming the body part and the effect.",
  "Students pick one physical impact, such as slower reaction time or liver strain. Each writes a two-sentence description naming the body part affected and the effect on daily life. Pairs trade and check the description names a real, accurate effect.",
  ["impact fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how a substance can affect a person's mood or emotions.",
  "Each student writes a cause-and-effect sentence linking a substance to an emotional change.",
  "Guide reviews how substances change brain chemistry. Students write a cause-and-effect sentence linking a substance to an emotional change, such as a drug raising anxiety the next day. Pairs check that the sentence names a cause and a clear emotional effect.",
  ["impact fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how one substance can affect all three areas of well-being at once.",
  "Each student writes a short paragraph naming a social, an emotional, and a physical effect.",
  "Students choose one substance and write a paragraph summarizing how it can touch social, emotional, and physical well-being. The paragraph must name one effect in each area. Pairs check all three areas appear and each effect is accurate.",
  ["impact fact sheet","lined paper"]),
 "understand-4": c(
  "Explain how one impact can lead to another across the three areas.",
  "Each student draws a labeled chain linking at least three connected impacts.",
  "Guide shows that impacts often chain, such as missed practice leading to lost friendships leading to low mood. Students draw a labeled chain of at least three connected impacts that crosses at least two areas. Pairs compare chains and check each link follows from the one before.",
  ["impact fact sheet","blank chain template"]),
 "apply-1": c(
  "Sort eight described impacts into social, emotional, and physical categories.",
  "Each student places all eight impact cards into the correct column.",
  "Guide hands out eight impact cards describing real effects. Students place each in the social, emotional, or physical column on a sorting sheet. Pairs compare and resolve any disagreement by pointing to the wording on the card.",
  ["impact cards","sorting sheet"]),
 "apply-2": c(
  "Use the three areas to map the impacts shown in a short case.",
  "Each pair lists at least one impact per area found in the case text.",
  "Guide gives each pair a short case about a teen using a substance. Pairs list at least one social, one emotional, and one physical impact they find in the text. Pairs post their map and the Guide checks each impact is supported by a line in the case.",
  ["case handout","mapping sheet"]),
 "apply-3": c(
  "Apply the impact chart to predict effects a substance could have on a described student.",
  "Each student writes three predicted impacts, one per area, tied to the student's life.",
  "Students read a profile of a student with a busy life of sports, friends, and school. Each writes three predicted impacts, one social, one emotional, one physical, tied to that student's life. Pairs check each prediction connects to a real detail in the profile.",
  ["student profile","impact chart"]),
 "apply-4": c(
  "Build a labeled diagram of one person showing impacts across all three areas.",
  "Each student produces a body-and-life diagram with at least two labeled impacts per area.",
  "Students draw a simple figure with a thought bubble and a friend circle around it. They label at least two physical impacts on the body, two emotional impacts in the bubble, and two social impacts in the circle. Students trade diagrams and check each label names an accurate impact in the right place.",
  ["diagram template","impact fact sheet","markers"]),
 "analyze-1": c(
  "Identify which single impact in a case is most likely to spread to other areas.",
  "Each student names the impact and cites the case clue.",
  "Guide gives a case listing several impacts. Students name the one impact most likely to spread to other areas and cite the clue. Pairs compare and point to the text behind their choice.",
  ["case handout","pencils"]),
 "analyze-2": c(
  "Compare two cases to determine which shows wider impact across the three areas.",
  "Each student names the wider-impact case with two pieces of evidence.",
  "Students read two short cases and decide which shows impact spread across more areas, citing two details. Pairs discuss why impact that crosses areas is harder to recover from than a single effect.",
  ["two case handouts","comparison sheet"]),
 "analyze-3": c(
  "Distinguish a direct impact of a substance from a consequence that comes from a choice around it.",
  "Each team sorts impact cards into direct and indirect columns and defends two.",
  "Guide gives teams cards mixing direct effects, such as slowed reflexes, with indirect consequences, such as a suspension for missing school. Teams sort each into direct or indirect and prepare to defend two placements. During share-out the Guide presses on a card that could fit either column.",
  ["impact cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how impacts in a detailed case built up over time across the three areas.",
  "Each team produces a timeline showing at least three impacts and how they accumulated.",
  "Guide provides a detailed case spanning several months. Teams build a timeline placing at least three impacts in order and showing how they accumulated across social, emotional, and physical areas. Teams post timelines and the class marks the point the impacts became hard to reverse.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue which area of well-being a prevention message should focus on first, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide asks which area, social, emotional, or physical, a prevention message for teens should lead with. Students write a paragraph naming their choice with two reasons drawn from the impact evidence. Volunteers share and the class weighs the cases.",
  ["impact notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three prevention posters and judge which most accurately shows real impacts.",
  "Each team rates three posters against a rubric and reports the strongest with evidence.",
  "Teams receive three sample prevention posters and a rubric scoring accuracy, clarity, and honesty. Teams rate each and write a note naming the strongest and the wording or image that earned the rating. Teams report out and the Guide flags any poster that exaggerates or scares without facts.",
  ["poster set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm everyday signs that a substance is affecting someone's well-being.",
  "Each student adds at least three observable signs to the class list.",
  "Open brainstorm. Guide asks, 'What might you notice if a substance was hurting someone's life?' Students name signs such as falling grades, mood swings, or quitting a team. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how removing a substance could change a person's well-being across areas.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a person stopped using and got support, how would their social, emotional, and physical life change? The paragraph names at least two changed outcomes across different areas. Pairs trade and check the changes follow from stopping.",
  ["impact notes","lined paper"]),
 "create-3": c(
  "Construct a one-page guide that groups substance impacts by area for peers.",
  "Each team produces a finished guide with at least two impacts per area in plain language.",
  "Teams design a one-page guide grouping impacts into social, emotional, and physical, with at least two accurate impacts per area written in plain language. Teams trade guides and check each impact is correctly placed and clearly worded.",
  ["guide template","impact fact sheet"]),
 "create-4": c(
  "Develop and test a short message that explains real impacts honestly, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message explaining the real impacts of a substance in an honest, non-scare way. Groups deliver it to a test audience of classmates who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why before final delivery.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.DSDT.4 ----------------
NEW["2.3.8.DSDT.4"] = matrix(
 "2.3.8.DSDT.4",
 "Examine how alcohol and drug disorders can impact the social, emotional, and physical lives of friends and family members.",
 "chpe","8",{
 "remember-1": c(
  "Name two ways a person's substance disorder can affect a friend or family member in each area: social, emotional, and physical.",
  "Each student writes six effects on a three-column chart before checking with a partner.",
  "Guide gives a blank three-column chart labeled social, emotional, and physical. Students write two ways a loved one is affected in each column. Pairs compare and the Guide confirms a shared list on the board.",
  ["three-column chart","pencils"]),
 "understand-1": c(
  "Describe one emotional effect a substance disorder can have on a family member.",
  "Each student writes two sentences naming the feeling and what causes it.",
  "Students pick one emotional effect on a family member, such as constant worry. Each writes two sentences naming the feeling and what in the situation causes it. Pairs trade and check the effect is realistic and clearly explained.",
  ["effects fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how one person's substance use can change daily routines for the whole household.",
  "Each student writes a cause-and-effect sentence linking the use to a household change.",
  "Guide reviews how a disorder reshapes home life. Students write a cause-and-effect sentence linking one person's use to a change in the household, such as a sibling taking on extra chores. Pairs check the sentence names a cause and a clear household effect.",
  ["effects fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how a friend's well-being can be touched across all three areas.",
  "Each student writes a paragraph naming a social, an emotional, and a physical effect on a friend.",
  "Students write a paragraph summarizing how a close friend's social, emotional, and physical life can be affected when someone they care about has a substance disorder. The paragraph names one effect in each area. Pairs check all three areas appear and each effect is accurate.",
  ["effects fact sheet","lined paper"]),
 "understand-4": c(
  "Explain how the impact can ripple from the person to friends to family and back.",
  "Each student draws a labeled ripple diagram with at least three connected effects.",
  "Guide shows that impact ripples outward and back. Students draw a labeled ripple diagram showing at least three connected effects moving from the person to friends and family. Pairs compare and check each link follows from the one before.",
  ["effects fact sheet","ripple template"]),
 "apply-1": c(
  "Sort eight described effects on loved ones into social, emotional, and physical categories.",
  "Each student places all eight effect cards into the correct column.",
  "Guide hands out eight cards describing real effects on friends and family. Students place each in the social, emotional, or physical column on a sorting sheet. Pairs compare and resolve any disagreement by pointing to the card wording.",
  ["effect cards","sorting sheet"]),
 "apply-2": c(
  "Use the three areas to map how a case affects the people around the person.",
  "Each pair lists at least one effect per area found in the case.",
  "Guide gives each pair a short case about a family living with a member's substance disorder. Pairs list at least one social, one emotional, and one physical effect on the people around that member. Pairs post their map and the Guide checks each effect is supported by the case.",
  ["case handout","mapping sheet"]),
 "apply-3": c(
  "Apply the effects chart to predict how a described teen's life changes when a parent has a disorder.",
  "Each student writes three predicted effects, one per area, tied to the teen's life.",
  "Students read a profile of a teen whose parent has a substance disorder. Each writes three predicted effects on the teen, one social, one emotional, one physical, tied to details in the profile. Pairs check each prediction connects to a real detail.",
  ["teen profile","effects chart"]),
 "apply-4": c(
  "Build a labeled family map showing effects on each member across the three areas.",
  "Each student produces a map naming each member and at least one labeled effect per member.",
  "Students draw a simple map of a household and a friend. For each person they label at least one effect and mark whether it is social, emotional, or physical. Students trade maps and check each label names a realistic effect placed on the right person.",
  ["family map template","effects fact sheet","markers"]),
 "analyze-1": c(
  "Identify which family member in a case carries the heaviest impact.",
  "Each student names the member and cites two clues from the case.",
  "Guide gives a case describing several family members. Students name the member carrying the heaviest impact and cite two clues. Pairs compare and point to the text behind each choice.",
  ["case handout","pencils"]),
 "analyze-2": c(
  "Compare two cases to determine which shows greater impact on friends and family.",
  "Each student names the greater-impact case with two pieces of evidence.",
  "Students read two short cases and decide which shows greater impact on the people around the person, citing two details. Pairs discuss why impact on loved ones can last even after the person gets help.",
  ["two case handouts","comparison sheet"]),
 "analyze-3": c(
  "Distinguish an effect caused directly by the disorder from one a family member chooses in response.",
  "Each team sorts effect cards into caused and chosen-response columns and defends two.",
  "Guide gives teams cards mixing direct effects, such as a missed family event, with chosen responses, such as a sibling joining a support group. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a card that could fit either column.",
  ["effect cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how the impact on a family in a detailed case grew over time.",
  "Each team produces a timeline showing at least three effects on loved ones and how they grew.",
  "Guide provides a detailed case spanning a year. Teams build a timeline placing at least three effects on friends and family in order and showing how the impact grew. Teams post timelines and the class marks the point the family most needed outside support.",
  ["detailed case","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue what one form of support would help an affected family member most, and defend it.",
  "Each student writes a paragraph with a judgment and two reasons.",
  "Guide presents a family member affected by a loved one's disorder. Students write a paragraph judging which one support, such as a support group or counseling, would help most, with two reasons. Volunteers share and the class weighs the cases.",
  ["case handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate three support resources for families and judge which best fits an affected teen.",
  "Each team rates three resources against a rubric and reports the strongest with evidence.",
  "Teams receive three sample support resources for families and a rubric scoring fit, clarity, and tone. Teams rate each and write a note naming the strongest for an affected teen and the feature that earned the rating. Teams report out and the Guide flags any resource that blames the family.",
  ["resource set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm ways a friend can support someone whose family member has a substance disorder.",
  "Each student adds at least three supportive actions to the class list.",
  "Open brainstorm. Guide asks, 'How can you support a friend whose home is affected by a substance problem?' Students name actions such as listening, including them in plans, or pointing them to a counselor. Guide records every idea on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how support for the family could change outcomes for everyone in the home.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if friends and family got support too, how would the whole home change? The paragraph names at least two changed outcomes for different people. Pairs trade and check the changes follow from the added support.",
  ["effects notes","lined paper"]),
 "create-3": c(
  "Construct a one-page guide for peers on how a substance disorder affects loved ones and how to help.",
  "Each team produces a finished guide grouping effects by area and listing two ways to help.",
  "Teams design a one-page guide grouping effects on loved ones into social, emotional, and physical, with at least one effect per area, and listing two supportive actions. The guide is written in plain, caring language. Teams trade guides and check each effect is correctly placed and each action is realistic.",
  ["guide template","effects fact sheet"]),
 "create-4": c(
  "Develop and test a short message that helps peers support an affected friend, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message teaching peers how to support a friend whose family is affected by a substance disorder. Groups deliver it to a test audience of classmates who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why before final delivery.",
  ["message planning sheet","feedback cards","timer"]),
})

# ---------------- 2.3.8.DSDT.5 ----------------
NEW["2.3.8.DSDT.5"] = matrix(
 "2.3.8.DSDT.5",
 "Compare and contrast the various services that are available for family members and others affected by substance disorders in the community and at the state level.",
 "chpe","8",{
 "remember-1": c(
  "Name four services for family members affected by a loved one's substance disorder, two local and two at the state level.",
  "Each student lists four services on an index card, marking each local or state.",
  "Guide displays the prompt: 'List four places or programs that help the family of someone with a substance problem.' Students write four on an index card and mark each local or state. Cards go on a class board sorted into local and state columns.",
  ["index cards","class board"]),
 "understand-1": c(
  "Describe what one family-support service does and who it serves.",
  "Each student writes two sentences naming the service, who it serves, and what it offers.",
  "Students pick one family-support service, such as a peer support group for relatives. Each writes two sentences naming who it serves and what it offers. Pairs trade and check both sentences describe a real form of help for family members.",
  ["service fact sheet","lined paper"]),
 "understand-2": c(
  "Explain why a family member might choose a community group over a state hotline, or the reverse.",
  "Each student writes two sentences linking a service feature to a family need.",
  "Guide gives descriptions of a local family support group and a statewide family helpline. Students write two sentences explaining when a family member would pick each, linking a feature such as privacy or in-person contact to a need. Pairs share and the Guide records the clearest reasons.",
  ["service descriptions","lined paper"]),
 "understand-3": c(
  "Summarize the range of family-support services across community and state levels.",
  "Each student writes a paragraph naming at least three services and what each provides.",
  "Students read a one-page list of community and state family-support services. Each writes a paragraph summarizing the range, naming at least three services and what each provides, with at least one at each level. Pairs check both levels appear.",
  ["service list handout","lined paper"]),
 "understand-4": c(
  "Explain how a family member could move from one service to another through a referral.",
  "Each student draws a two-step path showing a referral between two family-support services.",
  "Guide explains that family services often refer people onward. Students draw a two-step path showing how a family member could start at a local group and be referred to a state program, labeling each step and the reason. Pairs compare and check each step names a real service.",
  ["service list handout","path template"]),
 "apply-1": c(
  "Match four family needs to the family-support service that fits each best.",
  "Each student writes the matching service beside each of four need cards.",
  "Guide hands out four need cards, such as 'a sibling needs other teens who understand' or 'a parent wants a confidential number to call.' Students write the matching service beside each card. Pairs compare and resolve mismatches by pointing to the service feature that fits.",
  ["need cards","service list handout"]),
 "apply-2": c(
  "Use a directory to find the right family-support service for a described situation.",
  "Each pair records the service name, level, and contact type for one scenario.",
  "Guide gives each pair a scenario about a family seeking help and a one-page family-support directory. Pairs locate a fitting service and record its name, level, and how to reach it. Pairs post their choice and the Guide checks the service fits the scenario.",
  ["scenario card","family-support directory"]),
 "apply-3": c(
  "Apply a compare-and-contrast frame to one community and one state family-support service.",
  "Each student fills a frame with at least two shared features and two differences.",
  "Students choose one community and one state family-support service from the directory. Using a compare-and-contrast frame, each records at least two shared features and two differences, such as cost, format, or who runs them. Pairs check every entry is supported by the directory.",
  ["family-support directory","compare-contrast frame"]),
 "apply-4": c(
  "Build a labeled resource card for an affected family member listing three services by level.",
  "Each student produces a finished card naming three services, marking level and one-line use.",
  "Students design a pocket-size card a family member could keep. It names three services, marks each community or state, and gives a one-line use. Students trade cards and check each entry is accurate and clearly labeled.",
  ["card template","family-support directory","markers"]),
 "analyze-1": c(
  "Identify the most important difference between a chosen community and state family-support service.",
  "Each student names the key difference and cites the directory entry behind it.",
  "Guide gives one community and one state family-support service. Students name the difference that matters most for a family seeking help and cite the entry. Pairs compare and point to the supporting text.",
  ["two service descriptions","pencils"]),
 "analyze-2": c(
  "Compare two family-support services to determine which better fits a specific family.",
  "Each student names the better-fit service with two pieces of evidence.",
  "Students read a short family profile and two service descriptions. Each decides which service fits better and gives two pieces of evidence. Pairs discuss why fit matters when a whole family is affected.",
  ["family profile","two service descriptions","comparison sheet"]),
 "analyze-3": c(
  "Distinguish services that treat the affected person from services that support the family around them.",
  "Each team sorts service cards into person-focused and family-focused columns and defends two.",
  "Guide gives teams cards mixing services for the person with services for the family. Teams sort each and prepare to defend two placements. During share-out the Guide presses on a card that could serve both.",
  ["service cards","sorting mat"]),
 "analyze-4": c(
  "Analyze gaps in a town's family-support services and identify a need that is not covered.",
  "Each team marks one uncovered family need and the evidence that the list misses it.",
  "Guide provides a sample town's family-support list and a set of common family needs. Teams check each need against the list and mark one the town does not cover well. Teams post the gap and evidence, and the class discusses how a state service might fill it.",
  ["town service list","needs checklist","markers"]),
 "evaluate-3": c(
  "Argue which one family-support service a town should add first, and defend the choice.",
  "Each student writes a paragraph with a judgment, two reasons, and one trade-off.",
  "Guide presents a town with three candidate family-support services. Students write a paragraph judging which to add first, giving two reasons and one trade-off. Volunteers share and the class weighs the strongest cases.",
  ["town scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate three family-support brochures and judge which most clearly guides a relative to a next step.",
  "Each team rates three brochures against a rubric and reports the strongest with evidence.",
  "Teams receive three sample family-support brochures and a rubric scoring clarity, accuracy, and ease of next step. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any brochure that overpromises.",
  ["brochure set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm the kinds of help a family of someone with a substance disorder might need.",
  "Each student adds at least three needs to the class list.",
  "Open brainstorm. Guide asks, 'What does a family living with a substance problem need?' Students name needs such as someone to talk to, childcare, or guidance on what to say. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how family-support services could change outcomes for an affected household.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if a family used both a local group and a state program, how would the household change? The paragraph names at least two changed outcomes. Pairs trade and check the changes follow from the added services.",
  ["service notes","lined paper"]),
 "create-3": c(
  "Construct a one-page family-support resource guide grouped by type of help and level.",
  "Each team produces a finished guide with at least two services per group and correct level labels.",
  "Teams design a one-page guide grouping family-support services into peer support, counseling, and practical help, with at least two services per group. Each entry is labeled community or state in plain language. Teams trade guides and check grouping and labels.",
  ["guide template","family-support directory"]),
 "create-4": c(
  "Develop and test a short referral script that helps a peer point an affected friend's family to help, then revise it.",
  "Each group delivers the script to a test listener and submits one revision note.",
  "Groups write a short script a peer could use to point a friend's family toward a fitting service, naming the service and next step. Groups deliver it to a test listener who rates clarity and accuracy on a feedback card. Each group revises once and notes what changed and why.",
  ["script planning sheet","feedback cards","timer"]),
})

print("authored", len(NEW))
json.dump(NEW, open("_new_c.json","w"), indent=2, ensure_ascii=False)
