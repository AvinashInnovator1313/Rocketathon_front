"""Judgement rules and escalation. These run BEFORE the model, in plain Python.
Edit this file after every interview with Mr. Saleem."""
import re

HANDOFF = " Email: m.saleem@duet.edu.pk. His free window is only 3 to 4 hours a week, so book ahead."

# Each rule: id, regex, category, why it is refused, what the student should do instead.
RULES = [
    dict(id='code', pattern='\\b(write|give|make|create|solve|do|complete)\\b.*\\b(my|the|our|this|an?)?\\s*(assignment|project|homework|lab task)\\b|\\b(write|give|make|create)\\b.*\\b(code|program|snippet)\\b.*\\b(for|of|to)\\b|(assignment|project|homework).*(code|solution|answer)|full (java )?code|bypass.*plagiar|plagiar|turnitin|alter.*pdf', cat='Academic integrity',
         why="I can't write assignment or project code, or help get past plagiarism checks.",
         do='I can explain the concept behind it, suggest tools, or clarify the general assignment guidelines. Try asking about the concept instead.'),
    dict(id='exam', pattern='(final|mid ?term|upcoming|next|past|old|previous).*(exam|paper|quiz).*(question|paper|solution|answer|leak|expected)|exam.*(question|leak|solve|answer)|paper.*(leak|out|questions)', cat='Exam protection',
         why="I can't share or solve actual exam questions, past, current or future.",
         do='I can explain the underlying topics so you can prepare properly.'),
    dict(id='grade', pattern='(round|bump|increase|raise).*(mark|grade|percent|%|gpa|cgpa)|89 ?%|regrade|re-?evaluat|re-?check|recheck|re-?mark|(change|improve).*(my )?(mark|grade)', cat='Grading',
         why="I can't round up grades or grant regrade or re-evaluation requests.",
         do='Grades stand as recorded. Follow the official university process if you believe there was a recording error.'),
    dict(id='rec', pattern='recommendation|reference letter|letter of rec|recommend me|lor\\b|scholarship letter', cat='Official documents',
         why="I can't write or promise recommendation letters.",
         do='Request it from Mr. Saleem in person during office hours. His free window is only 3 to 4 hours a week, so book ahead.'),
    dict(id='reg', pattern='late (add|drop|registration|withdraw)|add (the )?course.*(late|deadline)|drop (the )?course.*(late|deadline)|after.*deadline.*(add|drop)', cat='Registration',
         why="I can't allow late course additions or drops past official university deadlines.",
         do='Please contact the university registrar/academic office.'),
    dict(id='extra', pattern='extra (project|marks|credit)|bonus marks|boost.*(cgpa|gpa|marks)|(cgpa|gpa).*boost|unsolicited project', cat='Marks policy',
         why="Extra projects don't earn extra marks or a CGPA boost.",
         do="They do improve your learning and skills, so they're still worth doing if you're curious."),
    dict(id='priv', pattern="(other|another|his|her|their|friend'?s|classmate'?s|everyone'?s|topper).*(mark|score|grade|result|gpa)|who (got|scored|topped)|class (average|topper|result)", cat='Privacy',
         why="I can't share scores or academic information of other students.",
         do='You can ask about your own results with the professor directly.'),
    dict(id='med', pattern='missed.*(mid ?term|exam|quiz)|hospital|medical|sick|\\bill(ness)?\\b|emergency|retake|re-?sit|makeup exam|make-up exam', cat='Missed exam / medical',
         why="I can't approve retakes or medical exemptions myself.",
         do='Any leniency requires an official emergency letter from a recognized hospital, submitted through university policy. The professor reviews retakes personally during office hours. His free window is only 3 to 4 hours a week, so book ahead.'),
]

_COMPILED = [(re.compile(r["pattern"], re.I), r) for r in RULES]


def check_escalation(question: str):
    """Return an escalation dict if any stop rule matches, else None."""
    for rx, r in _COMPILED:
        if rx.search(question):
            return {"type": "esc", "cat": r["cat"], "text": r["why"] + "\n" + r["do"],
                    "sources": ["Stop rule: " + r["cat"]]}
    return None


def outside_scope():
    return {"type": "esc", "cat": "Outside my data",
            "text": "I don't have this in Mr. Saleem's material, so I won't guess." + HANDOFF,
            "sources": ["No relevant slide found"]}
