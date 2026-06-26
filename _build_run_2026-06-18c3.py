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

# ---------------- 2.3.8.HCDM.5 ----------------
NEW["2.3.8.HCDM.5"] = matrix(
 "2.3.8.HCDM.5",
 "Compare and contrast behaviors, including abstinence, to determine the potential risk of pregnancy and/or STIs (including HIV) transmission.",
 "chpe","8",{
 "remember-1": c(
  "Name abstinence and two other behaviors, and state which carries the lowest risk of pregnancy and STIs.",
  "Each student lists three behaviors and marks the lowest-risk one on a card.",
  "Guide displays the prompt using accurate medical terms. Students list abstinence and two other behaviors and mark which carries the lowest risk of pregnancy and STIs. Pairs compare and the Guide confirms that abstinence carries the lowest risk.",
  ["index cards","fact sheet"]),
 "understand-1": c(
  "Describe what abstinence means and why it carries the lowest risk.",
  "Each student writes two sentences defining abstinence and naming the risk it removes.",
  "Students write two sentences defining abstinence and explaining why it carries the lowest risk of pregnancy and STIs. Pairs trade and check the definition is accurate and the reason is clear.",
  ["fact sheet","lined paper"]),
 "understand-2": c(
  "Explain how risk of pregnancy and risk of STIs can differ between two behaviors.",
  "Each student writes two sentences comparing the two kinds of risk for one behavior.",
  "Guide reviews that a behavior can carry different levels of pregnancy risk and STI risk. Students write two sentences comparing the two kinds of risk for one behavior. Pairs check both risks are named accurately.",
  ["fact sheet","lined paper"]),
 "understand-3": c(
  "Summarize how a set of behaviors ranks from lowest to highest risk.",
  "Each student writes a paragraph ordering at least three behaviors by risk with reasons.",
  "Students write a paragraph ordering at least three behaviors from lowest to highest risk of pregnancy and STIs, giving an accurate reason for the order. Pairs check the order and reasons match the fact sheet.",
  ["fact sheet","lined paper"]),
 "understand-4": c(
  "Explain why a behavior that lowers one risk may not lower the other.",
  "Each student writes two sentences showing the gap between pregnancy and STI risk.",
  "Guide poses a behavior that lowers pregnancy risk but not STI risk. Students write two sentences explaining why lowering one risk does not always lower the other. Pairs compare and check the reasoning.",
  ["fact sheet","lined paper"]),
 "apply-1": c(
  "Sort behavior cards by level of pregnancy and STI risk.",
  "Each student places all behavior cards into low, medium, and high risk columns.",
  "Guide hands out behavior cards. Students place each into low, medium, or high risk columns on a sorting sheet using the fact sheet. Pairs compare and resolve disagreements by checking the sheet.",
  ["behavior cards","sorting sheet"]),
 "apply-2": c(
  "Use a fact sheet to rate the risk in a set of described situations.",
  "Each pair rates at least three situations and names the risk in each.",
  "Guide gives each pair situation cards and a fact sheet. Pairs rate the pregnancy and STI risk in at least three situations and name the risk involved. Pairs post ratings and the Guide checks each against the sheet.",
  ["situation cards","fact sheet"]),
 "apply-3": c(
  "Apply accurate facts to correct three myths about risk and abstinence.",
  "Each student rewrites three myth statements into accurate ones.",
  "Students receive three common myths about pregnancy and STI risk. Each rewrites all three into accurate statements using the fact sheet. Pairs check each correction is accurate and clearly worded.",
  ["myth cards","fact sheet"]),
 "apply-4": c(
  "Build a labeled risk ladder placing behaviors from lowest to highest risk.",
  "Each student produces a ladder with at least four behaviors placed accurately.",
  "Students build a risk ladder placing at least four behaviors from lowest to highest risk of pregnancy and STIs, with abstinence at the lowest rung. Students trade ladders and check each placement matches the fact sheet.",
  ["ladder template","fact sheet","markers"]),
 "analyze-1": c(
  "Identify which behavior in a set most reduces both pregnancy and STI risk.",
  "Each student names the behavior and cites the reason.",
  "Guide gives a set of behaviors. Students name the one that most reduces both pregnancy and STI risk and cite the reason. Pairs compare and point to the evidence.",
  ["behavior set","pencils"]),
 "analyze-2": c(
  "Compare two behaviors to determine which carries higher overall risk.",
  "Each student names the higher-risk behavior with two pieces of evidence.",
  "Students read descriptions of two behaviors and decide which carries higher overall risk of pregnancy and STIs, citing two facts. Pairs discuss why a behavior can be higher risk for one outcome and not the other.",
  ["two behavior cards","comparison sheet"]),
 "analyze-3": c(
  "Distinguish an accurate risk claim from a myth about pregnancy or STI prevention.",
  "Each team sorts statement cards into accurate and myth columns and defends two.",
  "Guide gives teams cards mixing accurate risk claims with myths. Teams sort each into accurate or myth and prepare to defend two placements. During share-out the Guide presses on a myth that sounds plausible.",
  ["statement cards","sorting mat"]),
 "analyze-4": c(
  "Analyze how a decision in a non-graphic case changed the risk a person faced.",
  "Each team produces a labeled path showing how the decision changed risk.",
  "Guide provides a non-graphic decision scenario. Teams build a labeled path showing how one decision changed the level of pregnancy and STI risk the person faced. Teams post paths and the class marks the point that most changed the risk.",
  ["decision scenario","path template","markers"]),
 "evaluate-3": c(
  "Argue why abstinence is the most effective choice for avoiding both risks, and defend it with evidence.",
  "Each student writes a paragraph with a judgment and two evidence-based reasons.",
  "Guide asks students to make the case for abstinence as the most effective way to avoid both pregnancy and STIs. Students write a paragraph with a clear judgment and two evidence-based reasons. Volunteers share and the class weighs the cases.",
  ["fact notes","lined paper"]),
 "evaluate-4": c(
  "Evaluate three prevention messages and judge which most accurately presents risk.",
  "Each team rates three messages against a rubric and reports the strongest with evidence.",
  "Teams receive three sample prevention messages and a rubric scoring accuracy, clarity, and respect. Teams rate each and write a note naming the strongest and the wording that earned the rating. Teams report out and the Guide flags any message that misstates risk.",
  ["message set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm accurate questions a teen could ask a trusted adult or clinician about risk and prevention.",
  "Each student adds at least three questions to the class list.",
  "Open brainstorm. Guide asks, 'What could a teen ask a trusted adult or clinician about staying safe?' Students name accurate questions. Guide records every idea with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Hypothesize how accurate risk knowledge could change decisions across a peer group.",
  "Each student writes a one-paragraph what-if naming at least two changed outcomes.",
  "Each student writes a what-if paragraph: if every teen had accurate risk knowledge, how would decisions across a peer group change? The paragraph names at least two changed outcomes. Pairs trade and check the reasoning.",
  ["fact notes","lined paper"]),
 "create-3": c(
  "Construct a one-page accurate risk-comparison guide for peers.",
  "Each team produces a guide ranking behaviors by risk with accurate notes.",
  "Teams design a one-page guide ranking behaviors by risk of pregnancy and STIs, with abstinence as the lowest-risk choice and accurate notes for each. Teams trade guides and check each ranking and note is accurate.",
  ["guide template","fact sheet"]),
 "create-4": c(
  "Develop and test a short accurate prevention message, then revise it.",
  "Each group delivers the message to a test audience and submits one revision note.",
  "Groups create a short message that presents risk accurately and respectfully and names abstinence as the most effective choice. Groups deliver it to a test audience who rate accuracy and tone on a feedback card. Each group revises once and notes what changed and why.",
  ["message planning sheet","feedback cards","timer"]),
})

print("authored", len(NEW))
json.dump(NEW, open("_new_c3.json","w"), indent=2, ensure_ascii=False)
