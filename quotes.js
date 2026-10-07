/* ==========================================================================
   TAGLINES (shown on the result page + share card)
   QUOTES   ("Your type says..." + used by the Guess the Type game)
   Just for fun. Edit freely, but keep exactly 3 quotes per type or more.
   ========================================================================== */
const TYPE_TAGLINES = {
  INTJ: "Plans three moves ahead. Tells no one.",
  INTP: "84 tabs open. Zero regrets.",
  ENTJ: "Born to lead. Already scheduled the meeting.",
  ENTP: "Argued both sides. Won both.",
  INFJ: "Quietly understands you better than you do.",
  INFP: "Lives in a world only they can see. It's beautiful.",
  ENFJ: "Everyone's biggest fan and best coach.",
  ENFP: "Started 12 projects today. All of them are magic.",
  ISTJ: "Reliable like sunrise. Organized like a spreadsheet.",
  ISFJ: "Remembers your coffee order and your bad day.",
  ESTJ: "Has a plan. Has a backup plan. Has a clipboard.",
  ESFJ: "The glue of every group chat.",
  ISTP: "Fixes it first. Explains it never.",
  ISFP: "Feels in colors. Moves at their own pace.",
  ESTP: "Says 'watch this'. Makes it look easy.",
  ESFP: "Enters the room. The room becomes a party."
};

const TYPE_QUOTES = {
  INTJ: [
    "I have a plan. It has seven phases and a backup for each.",
    "Small talk is just inefficient data transfer.",
    "I'm not cold. I'm just calculating."
  ],
  INTP: [
    "I'll answer after I read the eleven papers on this.",
    "Technically, you're right. Technically, so am I.",
    "I started the project. Then I started a better project."
  ],
  ENTJ: [
    "Let's skip the discussion and go straight to the plan.",
    "If it's not on the schedule, it's not happening.",
    "I don't do 'maybe'. I do 'next steps'."
  ],
  ENTP: [
    "Let me play devil's advocate. Actually, make that both devils.",
    "I wasn't arguing, I was just exploring the idea out loud.",
    "Rules are just suggestions with better PR."
  ],
  INFJ: [
    "I can tell something's off. Do you want to talk about it?",
    "I need a few days alone, but I care about you very much.",
    "I've been thinking about the meaning of that for three weeks."
  ],
  INFP: [
    "I wrote a poem about this instead of replying.",
    "I'm fine. (I am secretly rewriting this whole conversation in my head.)",
    "I'd rather be authentic than popular."
  ],
  ENFJ: [
    "I organized a surprise party. Also a feelings circle. Also snacks.",
    "I can't relax if someone in this room is sad.",
    "You have so much potential. Let me help you see it."
  ],
  ENFP: [
    "I have a brilliant idea! Wait, a better one! Wait...",
    "Everyone here is secretly fascinating. Let me find out how.",
    "I'll start tomorrow. Tomorrow I'll have a new idea."
  ],
  ISTJ: [
    "I arrived fifteen minutes early. As planned.",
    "The instructions clearly say step four. We are on step four.",
    "Rules exist for a reason."
  ],
  ISFJ: [
    "I packed an extra snack in case you got hungry.",
    "No, no, it's fine, I don't mind at all. (I do mind a little.)",
    "I remember what you told me three months ago."
  ],
  ESTJ: [
    "Who's in charge here? Oh, it's me. Great.",
    "A good plan today beats a perfect plan never.",
    "Let's follow the process. The process works."
  ],
  ESFJ: [
    "Does everyone have a drink? Does everyone feel included?",
    "I'll host. I already have a menu and a seating chart.",
    "I just want everyone to get along."
  ],
  ISTP: [
    "I fixed it. Don't ask how.",
    "I don't need a plan. I'll figure it out as I go.",
    "Talk less. Do more."
  ],
  ISFP: [
    "I can't explain it, but I can show you in a painting.",
    "I'm going with the flow. The flow is a bit slow today.",
    "I feel everything. I just don't say it."
  ],
  ESTP: [
    "Hold my drink and watch this.",
    "Why plan it when we can just do it?",
    "Rules are a challenge, not a limit."
  ],
  ESFP: [
    "Is anyone else feeling like karaoke right now?",
    "I'm not late. The party just started when I arrived.",
    "Life is short. Let's make it fun."
  ]
};

/* ==========================================================================
   SUPERPOWER + MOTTO  (shown on the shareable card)
   ========================================================================== */
const TYPE_POWERS = {
  INTJ: { power: "Strategic vision",        motto: "You see the whole board. Make your move." },
  INTP: { power: "Endless curiosity",       motto: "The world needs the questions only you ask." },
  ENTJ: { power: "Natural leadership",      motto: "Lead boldly. People are ready to follow." },
  ENTP: { power: "Idea lightning",          motto: "Your wild ideas are tomorrow's breakthroughs." },
  INFJ: { power: "Deep insight",            motto: "Your quiet depth lights the way for others." },
  INFP: { power: "Inner magic",             motto: "Stay true. The world needs your kind of dream." },
  ENFJ: { power: "Inspiring others",        motto: "You help people believe in themselves." },
  ENFP: { power: "Spark of possibility",    motto: "Your enthusiasm is a gift. Spread it everywhere." },
  ISTJ: { power: "Rock-solid reliability",  motto: "Steady work builds extraordinary things." },
  ISFJ: { power: "Quiet strength",          motto: "Your care holds the world together." },
  ESTJ: { power: "Getting it done",         motto: "You turn plans into results. Own it." },
  ESFJ: { power: "Heart of the group",      motto: "You make every place feel like home." },
  ISTP: { power: "Cool-headed skill",       motto: "Calm hands, sharp mind. You can fix anything." },
  ISFP: { power: "Creative soul",           motto: "Your way of seeing makes the world more beautiful." },
  ESTP: { power: "Bold action",             motto: "Fortune favors the bold. Go first." },
  ESFP: { power: "Pure joy",                motto: "You bring the light. Never dim it." }
};
