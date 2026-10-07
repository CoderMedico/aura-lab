/* ==========================================================================
   QUESTION BANK & QUIZ CONFIG
   --------------------------------------------------------------------------
   HOW TO ADD YOUR OWN QUESTIONS (just copy a line and edit the text):

   agree(dim, towardLetter, "statement")
       -> 5-point scale. "Agree" pushes toward `towardLetter`.

   pick2(dim, "question", ["answer A", "LETTER"], ["answer B", "LETTER"])
       -> "Which sounds more like you?" / scenario / would-you-rather cards.

   slide(dim, ["left statement", "LETTER"], ["right statement", "LETTER"])
       -> slider between two statements.

   dim is one of: "EI", "SN", "TF", "JP", "AT"
   ========================================================================== */

const DIM_LETTERS = { EI: ["E", "I"], SN: ["S", "N"], TF: ["T", "F"], JP: ["J", "P"], AT: ["A", "T"] };

const DIM_LABELS = {
  EI: "Energy Source (E vs I)",
  SN: "Information Processing (S vs N)",
  TF: "Decision Making (T vs F)",
  JP: "Lifestyle Structure (J vs P)",
  AT: "Identity (Assertive vs Turbulent)"
};

const LETTER_NAMES = {
  E: "Extravert", I: "Introvert", S: "Sensing", N: "Intuition",
  T: "Thinking", F: "Feeling", J: "Judging", P: "Perceiving"
};
const AT_NAMES = { A: "Assertive", T: "Turbulent" };

/* How many questions of each dimension appear in each mode */
const QUIZ_MODES = {
  quick: {
    label: "Quick Scan", emoji: "⚡", time: "~2 min",
    desc: "A fast snapshot of your four core letters.",
    perDim: { EI: 2, SN: 2, TF: 2, JP: 2, AT: 0 }
  },
  standard: {
    label: "Standard", emoji: "🧭", time: "~6 min",
    desc: "The sweet spot: reliable letters plus your A/T identity.",
    perDim: { EI: 5, SN: 5, TF: 5, JP: 5, AT: 4 }
  },
  deep: {
    label: "Deep Dive", emoji: "🧬", time: "~15 min",
    desc: "Maximum accuracy with the widest mix of question styles.",
    perDim: { EI: 13, SN: 13, TF: 13, JP: 13, AT: 8 }
  }
};

/* ---------- helpers that build the bank ---------- */
const _bank = [];
const _add = (dim, type, data) =>
  _bank.push({ id: dim.toLowerCase() + (_bank.filter(q => q.dim === dim).length + 1), dim, type, ...data });
const agree = (dim, toward, text) => _add(dim, "agree", { toward, text });
const pick2 = (dim, title, a, b) =>
  _add(dim, "choice", { title, answers: [{ text: a[0], code: a[1] }, { text: b[0], code: b[1] }] });
const slide = (dim, l, r) =>
  _add(dim, "slider", { left: { text: l[0], code: l[1] }, right: { text: r[0], code: r[1] } });

/* ==========================================================================
   E vs I  (20 questions)
   ========================================================================== */
agree("EI", "E", "You feel energized after spending an evening with a big group of people.");
agree("EI", "I", "You need real alone time after social events to feel like yourself again.");
agree("EI", "E", "You usually start conversations instead of waiting for others to approach you.");
agree("EI", "I", "You prefer deep one-on-one conversations to lively group chatter.");
agree("EI", "E", "You think out loud. Talking helps you figure out what you actually think.");
agree("EI", "I", "You think carefully before speaking and often rehearse things in your head.");
agree("EI", "E", "You have a wide circle of friends and love adding new people to it.");
agree("EI", "I", "You would rather text than take a phone call.");
agree("EI", "E", "A quiet weekend with zero plans would bore you pretty quickly.");
agree("EI", "I", "Being the center of attention makes you uncomfortable.");

pick2("EI", "It's Friday night and you finally have a free evening. You're more likely to…",
  ["Text the group chat and see who's up for something.", "E"],
  ["Enjoy a cozy night in, preferably alone or with one close person.", "I"]);
pick2("EI", "You arrive at a party where you only know the host. You…",
  ["Introduce yourself around within the first few minutes.", "E"],
  ["Find a comfortable corner and let conversations come to you.", "I"]);
pick2("EI", "Would you rather…",
  ["Work in a busy open space buzzing with people.", "E"],
  ["Work in a quiet room where you can focus alone.", "I"]);
pick2("EI", "In a team meeting you tend to…",
  ["Jump in and share ideas as they come to you.", "E"],
  ["Listen first and speak once your thoughts are ready.", "I"]);
pick2("EI", "Your ideal birthday is…",
  ["A big party with everyone you know.", "E"],
  ["A small dinner with your closest few.", "I"]);

slide("EI", ["I make the first move in new friendships.", "E"], ["I usually wait for others to reach out first.", "I"]);
slide("EI", ["I'm happiest when my calendar is full.", "E"], ["I'm happiest when my calendar has lots of empty space.", "I"]);
slide("EI", ["I share my news and feelings with many people.", "E"], ["I share personal things with only a few trusted people.", "I"]);
slide("EI", ["I feel recharged by crowds and noise.", "E"], ["I feel recharged by silence and solitude.", "I"]);
slide("EI", ["I speak first and refine my thoughts later.", "E"], ["I think first and speak later.", "I"]);

/* ==========================================================================
   S vs N  (20 questions)
   ========================================================================== */
agree("SN", "S", "You trust proven methods more than untested new ideas.");
agree("SN", "N", "You often get lost in thoughts about future possibilities.");
agree("SN", "S", "You notice small practical details that others overlook.");
agree("SN", "N", "You enjoy finding hidden patterns and connections between unrelated things.");
agree("SN", "S", "You prefer instructions that are clear and step-by-step.");
agree("SN", "N", "You get bored doing a task the same way twice.");
agree("SN", "S", "You care more about what works today than what might be possible someday.");
agree("SN", "N", "You would rather brainstorm wild ideas than polish existing ones.");
agree("SN", "S", "You learn best by doing, not by reading theory.");
agree("SN", "N", "Metaphors and symbolism fascinate you more than literal facts.");

pick2("SN", "When learning something brand new, you want…",
  ["Concrete examples and a practical use case.", "S"],
  ["The big picture and the theory behind it.", "N"]);
pick2("SN", "Which book would you pick up first?",
  ["A biography based on true events.", "S"],
  ["A sci-fi epic set in an invented universe.", "N"]);
pick2("SN", "When someone describes a problem, you listen for…",
  ["The facts of what actually happened.", "S"],
  ["The bigger pattern behind what's happening.", "N"]);
pick2("SN", "Your ideal trip is…",
  ["Seeing famous, well-reviewed landmarks.", "S"],
  ["Discovering hidden corners and imagining their stories.", "N"]);
pick2("SN", "A great teacher is someone who…",
  ["Gives precise, practical steps.", "S"],
  ["Inspires you to see new possibilities.", "N"]);

slide("SN", ["I live in the moment and focus on what's in front of me.", "S"], ["I live in my head, imagining what's next.", "N"]);
slide("SN", ["I describe things literally and precisely.", "S"], ["I describe things with metaphors and big ideas.", "N"]);
slide("SN", ["I trust experience over intuition.", "S"], ["I trust my gut feelings over past experience.", "N"]);
slide("SN", ["I like routines that I know work.", "S"], ["I like experimenting with new ways of doing things.", "N"]);
slide("SN", ["I'm known as realistic and down to earth.", "S"], ["I'm known as imaginative and visionary.", "N"]);

/* ==========================================================================
   T vs F  (20 questions)
   ========================================================================== */
agree("TF", "T", "When making decisions, you put logic ahead of feelings.");
agree("TF", "F", "You take other people's emotions into account before making a choice.");
agree("TF", "T", "You would rather be seen as fair than as kind.");
agree("TF", "F", "You often feel deeply moved by other people's pain or joy.");
agree("TF", "T", "You can critique an idea without taking it personally.");
agree("TF", "F", "You would rather soften bad news than deliver it bluntly.");
agree("TF", "T", "In arguments, you focus on being right more than keeping the peace.");
agree("TF", "F", "Harmony in a group matters more to you than winning a debate.");
agree("TF", "T", "You value competence in people more than warmth.");
agree("TF", "F", "You tend to follow your heart, even when logic points elsewhere.");

pick2("TF", "Your friend just made a bad decision. You…",
  ["Give honest, objective advice to fix it.", "T"],
  ["Offer empathy and support first.", "F"]);
pick2("TF", "A coworker keeps missing deadlines. You…",
  ["Address the problem directly and ask for a fix.", "T"],
  ["Ask what's going on in their life and offer help.", "F"]);
pick2("TF", "You would prefer to be described as…",
  ["Rational and fair.", "T"],
  ["Compassionate and warm.", "F"]);
pick2("TF", "When two friends argue, you…",
  ["Work out who is actually right.", "T"],
  ["Help both of them feel heard.", "F"]);
pick2("TF", "What matters most in a leader?",
  ["Sound judgment.", "T"],
  ["Understanding the team.", "F"]);

slide("TF", ["I decide with my head.", "T"], ["I decide with my heart.", "F"]);
slide("TF", ["Truth matters more than tact.", "T"], ["Tact matters more than blunt truth.", "F"]);
slide("TF", ["I stay calm and analytical when others get emotional.", "T"], ["I get emotionally involved when others struggle.", "F"]);
slide("TF", ["I'm motivated by results and efficiency.", "T"], ["I'm motivated by people and meaning.", "F"]);
slide("TF", ["Criticism is just useful data.", "T"], ["Criticism stings and sticks with me.", "F"]);

/* ==========================================================================
   J vs P  (20 questions)
   ========================================================================== */
agree("JP", "J", "You like having a plan for your day before it starts.");
agree("JP", "P", "You do your best work under last-minute pressure.");
agree("JP", "J", "An unfinished to-do list nags at you until it's done.");
agree("JP", "P", "You like keeping your options open as long as possible.");
agree("JP", "J", "You usually finish projects well before the deadline.");
agree("JP", "P", "Strict schedules make you feel trapped.");
agree("JP", "J", "Your space is tidy and everything has its place.");
agree("JP", "P", "You often start new projects before finishing old ones.");
agree("JP", "J", "You feel calmer once a decision has been made.");
agree("JP", "P", "You're happy to change plans at the last second.");

pick2("JP", "Planning a vacation, you…",
  ["Book everything and build a schedule.", "J"],
  ["Book the flight and figure out the rest on arrival.", "P"]);
pick2("JP", "Your workspace right now is…",
  ["Neat, with everything in its spot.", "J"],
  ["Organized chaos. You know where everything is.", "P"]);
pick2("JP", "A deadline is one week away. You…",
  ["Start now and finish early.", "J"],
  ["Wait for the burst of energy closer to the date.", "P"]);
pick2("JP", "Which sounds more like you?",
  ["Make a decision and move on.", "J"],
  ["Keep exploring until you're really sure.", "P"]);
pick2("JP", "On a free weekend, you prefer…",
  ["A rough plan for each day.", "J"],
  ["Seeing what happens.", "P"]);

slide("JP", ["I plan ahead.", "J"], ["I go with the flow.", "P"]);
slide("JP", ["I like closure and clear endings.", "J"], ["I like open endings and flexible options.", "P"]);
slide("JP", ["I keep a calendar and stick to it.", "J"], ["I treat calendars as suggestions.", "P"]);
slide("JP", ["I need structure to feel productive.", "J"], ["I need freedom to feel productive.", "P"]);
slide("JP", ["I finish one thing before starting another.", "J"], ["I juggle many things at once.", "P"]);

/* ==========================================================================
   A vs T  Assertive / Turbulent  (12 questions)
   ========================================================================== */
agree("AT", "A", "You rarely worry about what other people think of you.");
agree("AT", "T", "You often replay past mistakes in your head.");
agree("AT", "A", "Setbacks bounce off you quickly.");
agree("AT", "T", "You set very high standards for yourself and feel disappointed when you miss them.");
agree("AT", "A", "You stay calm even when things go wrong.");
agree("AT", "T", "You worry about things that might go wrong.");
agree("AT", "A", "You feel confident that things will work out in the end.");
agree("AT", "T", "Criticism stays with you for days.");
agree("AT", "T", "You often doubt whether you made the right decision.");

pick2("AT", "After a presentation that went well except for one slip, you…",
  ["Remember the good parts and move on.", "A"],
  ["Replay the slip for the rest of the night.", "T"]);

slide("AT", ["I'm relaxed and rarely stressed.", "A"], ["I'm always a little on edge and driven to improve.", "T"]);
slide("AT", ["I trust my abilities.", "A"], ["I question my abilities even when things go well.", "T"]);

/* ---------- final exports ---------- */
const QUESTION_BANK = _bank;
const QUESTION_MAP = {};
QUESTION_BANK.forEach(q => { QUESTION_MAP[q.id] = q; });
