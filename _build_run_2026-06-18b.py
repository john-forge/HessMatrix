import json, datetime, re

TS = datetime.datetime.now(datetime.timezone.utc).isoformat()

def c(o, k, t, m):
    return {"objective": o, "observableCheck": k, "sampleTask": t, "materials": m}

# chpe null pattern: remember-2,3,4 null; evaluate-1,2 null
NULLS = ["remember-2","remember-3","remember-4","evaluate-1","evaluate-2"]

def matrix(code, stmt, subj, grade, cells):
    full = {}
    for key in ["remember-1","remember-2","remember-3","remember-4",
                "understand-1","understand-2","understand-3","understand-4",
                "apply-1","apply-2","apply-3","apply-4",
                "analyze-1","analyze-2","analyze-3","analyze-4",
                "evaluate-1","evaluate-2","evaluate-3","evaluate-4",
                "create-1","create-2","create-3","create-4"]:
        full[key] = None if key in NULLS else cells[key]
    return {
        "schema_version": 1,
        "standardCode": code,
        "standardStatement": stmt,
        "subject": subj,
        "grade": grade,
        "generatedAt": TS,
        "cells": full,
    }

NEW = {}

# ---------------- 2.3.5.PS.5 ----------------
NEW["2.3.5.PS.5"] = matrix(
 "2.3.5.PS.5",
 "Communicate personal boundaries and demonstrate ways to respect other people’s personal boundaries.",
 "chpe","5",{
 "remember-1": c(
  "Name three kinds of personal boundaries a person can set, such as physical space, touch, and personal property.",
  "Each student writes three boundary types on an index card before sharing with a partner.",
  "Guide posts the prompt: 'A boundary is a limit you set so you feel safe and respected. Name three kinds you can think of.' Each student writes three on an index card. Cards go on a class chart grouped into space, touch, and belongings. Guide reads the chart aloud and fills any missing category.",
  ["index cards","class chart"]),
 "understand-1": c(
  "Describe in plain words what a person means when they set a specific boundary.",
  "Each student restates four sample boundary statements in their own words on a worksheet.",
  "Guide hands out a worksheet with four boundary statements, such as 'Please do not borrow my things without asking.' Students rewrite each one explaining what the person is asking for and why it matters to them. Pairs compare answers and check that each restatement keeps the original meaning.",
  ["boundary statement worksheet","pencils"]),
 "understand-2": c(
  "Explain why respecting a classmate’s boundary keeps a friendship healthy.",
  "Each student writes one 'respecting this boundary helps because' sentence for two examples.",
  "Each student picks two boundaries from the class chart and writes a sentence that finishes 'Respecting this boundary helps the friendship because...' for each. Pairs trade papers and mark whether the reason names a real effect on the friendship rather than just saying it is nice.",
  ["class chart","lined paper"]),
 "understand-3": c(
  "Summarize the difference between a boundary that is stated out loud and one shown through body language.",
  "Each student fills a two-column note separating spoken boundaries from body-language signals.",
  "Guide gives a two-column note catcher labeled 'said out loud' and 'shown with the body.' Students sort eight examples, such as 'stepping back' or 'saying no thank you,' into the correct column. Whole-class review confirms each placement and adds one student example per column.",
  ["two-column note catcher","example slips"]),
 "understand-4": c(
  "Explain how the same boundary can be communicated politely or rudely and why tone changes the result.",
  "Each pair labels three message pairs as polite or rude and explains the difference in one sentence.",
  "Guide gives pairs three sets of two messages that set the same boundary in different tones. Pairs label each message polite or rude and write one sentence naming what made the tone change. The class discusses which version is more likely to be respected and why.",
  ["message pair cards","response sheet"]),
 "apply-1": c(
  "State a personal boundary out loud using a clear 'I' statement.",
  "Each student delivers one rehearsed 'I' statement to a partner who repeats it back.",
  "Guide models the frame 'I feel ___ when ___, so please ___.' Each student writes one true boundary using the frame, then says it to a partner. The partner repeats it back to confirm they heard it. Students switch roles so both practice speaking and listening.",
  ["sentence frame poster","note cards"]),
 "apply-2": c(
  "Demonstrate a respectful response when someone else states a boundary in a role-play.",
  "Each pair performs a short role-play where the listener honors the boundary and the Guide observes.",
  "Guide gives pairs three short scenario cards. In each, one student states a boundary and the other practices a respectful reply, such as 'Okay, I will ask first next time.' Pairs perform two scenarios while the Guide circulates and notes whether the listener honored the limit. The class names what respectful responses had in common.",
  ["scenario cards","observation checklist"]),
 "apply-3": c(
  "Use a calm boundary statement to handle a situation where a friend keeps pushing.",
  "Each student records a second, firmer boundary statement to use when the first is ignored.",
  "Guide presents three situations where a first boundary is ignored, such as a friend who keeps grabbing a phone. Students write a calm first statement and a firmer second one to use if the first does not work. Pairs role-play the escalation once so each student practices staying calm while repeating the limit.",
  ["situation handout","script template"]),
 "apply-4": c(
  "Carry out a respectful boundary conversation that involves both setting a limit and listening to one in return.",
  "Each pair completes a two-way conversation and logs both boundaries on a shared sheet.",
  "Guide gives each pair a setting, such as sharing a desk or a group project. Each student sets one boundary and responds respectfully to the partner’s boundary in the same conversation. Pairs log both boundaries and the agreed plan on a shared sheet. The Guide reviews two or three logs aloud as models.",
  ["setting cards","shared agreement sheet"]),
 "analyze-1": c(
  "Identify in a written scenario the exact moment a boundary was crossed.",
  "Each student underlines the boundary-crossing line in a short scenario and labels it.",
  "Guide hands out three short written scenarios. In each, students underline the single line where a boundary is crossed and write a margin note naming which boundary it was. Pairs compare underlines and resolve any disagreement by pointing to the text.",
  ["scenario handout","highlighters"]),
 "analyze-2": c(
  "Compare two responses to a crossed boundary and explain which one respects the other person.",
  "Each student marks the respectful response and gives one text-based reason on a comparison sheet.",
  "Guide gives a comparison sheet with one scenario and two possible responses to a crossed boundary. Students mark which response respects the other person and cite the words that show it. Pairs discuss whether the disrespectful response would make the situation better or worse.",
  ["comparison sheet","pencils"]),
 "analyze-3": c(
  "Sort a set of behaviors into respecting a boundary, ignoring a boundary, or testing a boundary.",
  "Each team places eight behavior cards into three labeled zones and defends two placements.",
  "Guide gives teams eight behavior cards and a mat with three zones: respects, ignores, tests. Teams place each card and prepare to defend two placements to the class. During share-out, the Guide presses one team to explain how testing differs from ignoring.",
  ["behavior cards","sorting mat"]),
 "analyze-4": c(
  "Analyze a multi-part conflict to trace how one ignored boundary led to the next problem.",
  "Each team produces a cause-and-effect chain naming at least three linked steps.",
  "Guide provides a longer scenario where ignoring a small boundary leads to a bigger conflict. Teams build a cause-and-effect chain on chart paper showing how each ignored limit fed the next problem, naming at least three linked steps. Teams post chains and the class identifies the earliest point where a respectful choice could have stopped the chain.",
  ["multi-part scenario","chart paper","markers"]),
 "evaluate-3": c(
  "Argue which of two boundary statements is clearer and more likely to be respected.",
  "Each student writes a short paragraph choosing one statement and giving two reasons.",
  "Guide presents two boundary statements for the same situation, one vague and one specific. Students write a paragraph picking the statement more likely to be respected, naming two reasons and one weakness of the rejected version. Volunteers read their picks and the class votes after hearing the cases.",
  ["statement pair handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a class set of boundary scripts and judge which ones are both clear and respectful.",
  "Each team rates four scripts against a rubric and reports the strongest with evidence.",
  "Teams receive four anonymous boundary scripts and a rubric scoring clarity and respect. Teams rate each script, then write a short note naming the strongest script and the specific lines that earned the rating. Teams report out and the Guide compiles the highest-rated lines into a class reference poster.",
  ["script set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm situations at school where setting a boundary would help.",
  "Each student adds at least three situations to the class list.",
  "Open brainstorm. Guide asks, 'Where in a school day might you need to set a boundary?' Students call out situations such as group work, the lunch line, or sharing supplies. Guide records every idea on the board with none rejected during the brainstorm.",
  ["whiteboard"]),
 "create-2": c(
  "Design a short script a younger student could use to set a boundary kindly.",
  "Each student writes a three-line script aimed at a second or third grader.",
  "Each student picks one situation from the brainstorm and writes a three-line script a younger student could say to set a boundary kindly. Scripts must use simple words a second or third grader would know. Pairs read scripts aloud to check the wording sounds natural and kind.",
  ["situation list","script template"]),
 "create-3": c(
  "Construct a class poster that teaches three steps for respecting other people’s boundaries.",
  "Each team produces a finished three-step poster with an example for each step.",
  "Teams design a poster that teaches three steps for respecting boundaries, such as notice, ask, and adjust. Each step needs a short example drawn from the class brainstorm. Teams display posters and the class picks the clearest one to hang outside the room.",
  ["poster paper","markers","brainstorm list"]),
 "create-4": c(
  "Develop and rehearse a short skit that models setting and respecting a boundary, then revise it from peer feedback.",
  "Each group performs the skit and submits one revision note based on audience feedback.",
  "Groups write and rehearse a short skit showing one character setting a boundary and another respecting it. Groups perform for a test audience of classmates who give two pieces of feedback using a glow-and-grow card. Each group makes one revision and notes what they changed and why before the final run.",
  ["skit planning sheet","glow-and-grow cards","props"]),
})

# ---------------- 2.3.5.PS.6 ----------------
NEW["2.3.5.PS.6"] = matrix(
 "2.3.5.PS.6",
 "Identify strategies a person could use to call attention to or leave an uncomfortable or dangerous situation, including bullying, teasing, teen dating violence, sexual harassment, sexual assault, and sexual abuse.",
 "chpe","5",{
 "remember-1": c(
  "List four strategies a person can use to get help or leave an unsafe situation, such as telling a trusted adult, moving to a public place, calling for help, and saying no firmly.",
  "Each student writes four strategies on a card before they are posted on the class chart.",
  "Guide posts the prompt: 'If a situation feels unsafe or wrong, what can a person do to get help or get out?' Students write four strategies on a card. Cards are grouped on a chart under headings for tell, leave, and call for help. Guide reads the chart and adds any standard strategy the class missed.",
  ["index cards","class chart"]),
 "understand-1": c(
  "Describe what makes a situation uncomfortable or unsafe rather than just annoying.",
  "Each student sorts six short situations into uncomfortable, unsafe, or just annoying with a reason.",
  "Guide hands out six short, age-appropriate situations. Students label each as just annoying, uncomfortable, or unsafe and write one reason for the label. Pairs compare and discuss any situation they labeled differently, focusing on what signals tell a person to act.",
  ["situation sort handout","pencils"]),
 "understand-2": c(
  "Explain why telling a trusted adult is a strong strategy even when it feels hard.",
  "Each student writes a two-sentence explanation naming what an adult can do that a child cannot.",
  "Each student writes two sentences explaining why telling a trusted adult helps, naming at least one thing an adult can do that a student cannot do alone. Pairs trade and check that the reason names a real action, such as stopping the behavior or getting other help.",
  ["lined paper","trusted-adult prompt"]),
 "understand-3": c(
  "Summarize the difference between a secret that is okay to keep and one that should always be told.",
  "Each student completes a two-column chart with two examples in each column.",
  "Guide leads a short discussion, then gives a two-column chart labeled 'okay to keep' and 'always tell.' Students place two examples in each column, such as a surprise party versus a secret that makes someone feel unsafe. Whole-class review confirms the rule that secrets making a person feel scared or hurt should always be told.",
  ["two-column chart","example slips"]),
 "understand-4": c(
  "Explain how naming a trusted adult ahead of time makes it easier to get help later.",
  "Each student lists three trusted adults and where to find each one.",
  "Students fill a wallet-size card naming three trusted adults from different parts of life, such as home, school, and the neighborhood, with where to find each one. Students explain in one sentence why having more than one name matters. Guide reminds students to keep the card somewhere they can find it.",
  ["wallet card template","markers"]),
 "apply-1": c(
  "Demonstrate a firm 'no' and a confident exit in a low-stakes role-play.",
  "Each student performs a firm refusal and a move toward safety while a partner observes.",
  "Guide models a firm voice, steady eye contact, and walking toward people. Each student practices saying a clear no and moving to a safe spot in a low-stakes scenario, such as a stranger asking them to leave a group. Partners watch and confirm the no was firm and the exit was toward other people.",
  ["scenario cards","open space"]),
 "apply-2": c(
  "Use a help script to report an uncomfortable situation to a trusted adult in a role-play.",
  "Each pair runs a report role-play and the Guide checks that the script names who, what, and where.",
  "Guide gives a simple report script: name the person, say what happened, say where, and ask for help. Pairs role-play a student reporting bullying or teasing to a trusted adult using the script. The Guide circulates and confirms each report includes who, what, and where.",
  ["report script card","scenario handout"]),
 "apply-3": c(
  "Choose and carry out the best get-help strategy for a specific scenario.",
  "Each student picks one strategy per scenario and writes the first step they would take.",
  "Guide presents three different scenarios covering teasing, an uncomfortable adult, and an unsafe walk home. For each, students pick the strongest strategy and write the exact first step they would take. Pairs compare choices and explain why one strategy fit better than another for that scenario.",
  ["scenario handout","response sheet"]),
 "apply-4": c(
  "Carry out a two-step plan that first calls attention and then leaves an unsafe situation.",
  "Each pair performs a two-step plan and logs both steps on a planning sheet.",
  "Guide gives pairs a scenario in a public place. Students build a two-step plan: first call attention by speaking loudly or moving toward others, then leave toward a trusted adult or safe location. Pairs perform the plan and log both steps. The Guide reviews two plans aloud as models.",
  ["scenario cards","two-step planning sheet"]),
 "analyze-1": c(
  "Identify the warning signs in a scenario that show a situation is becoming unsafe.",
  "Each student underlines two warning signs in a written scenario and labels them.",
  "Guide hands out two short scenarios. Students underline two warning signs in each that show the situation is turning unsafe, such as being asked to keep a secret or being isolated from friends. Pairs compare underlines and point to the exact words that signaled danger.",
  ["scenario handout","highlighters"]),
 "analyze-2": c(
  "Compare two responses to the same unsafe situation and explain which keeps the person safer.",
  "Each student marks the safer response and cites one detail that supports the choice.",
  "Guide gives a comparison sheet with one scenario and two responses. Students mark which response keeps the person safer and cite the detail that shows it, such as moving toward people versus staying alone. Pairs discuss what made the weaker response risky.",
  ["comparison sheet","pencils"]),
 "analyze-3": c(
  "Sort strategies by which situations they fit best.",
  "Each team matches six strategies to the situations they fit and defends two matches.",
  "Guide gives teams six strategy cards and four situation cards covering bullying, an uncomfortable adult, an unsafe online message, and harassment. Teams match strategies to the situations they fit best and prepare to defend two matches. During share-out the Guide presses one team on why a strategy fit one situation but not another.",
  ["strategy cards","situation cards"]),
 "analyze-4": c(
  "Analyze a multi-part scenario to find the earliest safe point a person could have acted.",
  "Each team marks the earliest action point on a timeline and explains the choice.",
  "Guide provides a longer scenario that escalates over several steps. Teams build a timeline of the events and mark the earliest point where a get-help or leave strategy would have worked. Teams explain why acting early is safer than waiting, and the class compares chosen points.",
  ["multi-part scenario","timeline strip","markers"]),
 "evaluate-3": c(
  "Argue which strategy is the best first move for a difficult scenario and defend the choice.",
  "Each student writes a short paragraph naming the chosen strategy and two reasons.",
  "Guide presents a difficult scenario with competing options. Students write a paragraph choosing the best first strategy, giving two reasons it fits and one reason a different strategy was rejected. Volunteers share and the class weighs the strongest cases.",
  ["scenario handout","lined paper"]),
 "evaluate-4": c(
  "Evaluate a set of safety plans and judge which is most realistic for a fifth grader to follow.",
  "Each team rates three plans against a rubric and reports the most realistic with evidence.",
  "Teams receive three sample safety plans and a rubric scoring clarity, realism, and use of trusted adults. Teams rate each plan and write a note naming the most realistic one and the specific steps that make it work. Teams report out and the Guide builds a class master plan from the strongest steps.",
  ["safety plan set","scoring rubric","report slip"]),
 "create-1": c(
  "Brainstorm trusted adults and safe places available in students’ daily lives.",
  "Each student adds at least three people or places to the class list.",
  "Open brainstorm. Guide asks, 'Who are the trusted adults and where are the safe places in your day?' Students name people such as teachers, coaches, and family, and places such as the main office or a neighbor’s home. Guide records all ideas on the board with none rejected.",
  ["whiteboard"]),
 "create-2": c(
  "Design a wallet card that lists get-help steps and contacts a person can use in a hurry.",
  "Each student produces a finished wallet card with steps and at least two contacts.",
  "Each student designs a wallet-size card with three quick get-help steps and at least two trusted contacts. Cards must be readable at a glance because a person using one may be stressed. Pairs check each other’s cards for clear steps and complete contacts.",
  ["card stock","markers","contact prompt"]),
 "create-3": c(
  "Construct a class poster teaching peers three ways to call attention to or leave an unsafe situation.",
  "Each team produces a finished poster with one example per strategy.",
  "Teams build a poster teaching three strategies with a short example for each, drawn from the class brainstorm. Posters must use words and pictures a younger student could follow. Teams display posters and the class selects the clearest for the hallway.",
  ["poster paper","markers","brainstorm list"]),
 "create-4": c(
  "Develop and rehearse a short public-service skit that teaches a get-help strategy, then revise it from feedback.",
  "Each group performs the skit and submits one revision note based on audience feedback.",
  "Groups write and rehearse a short public-service skit that teaches one get-help or leave strategy without showing anything graphic. Groups perform for classmates who give two pieces of feedback on a glow-and-grow card. Each group makes one revision and notes what changed and why before the final run.",
  ["skit planning sheet","glow-and-grow cards","props"]),
})

print("authored", len(NEW), "matrices in this file")
json.dump(NEW, open("_new_b1.json","w"), indent=2, ensure_ascii=False)
