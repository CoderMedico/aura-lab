/* ==========================================================================
   DAILY FORECAST
   The same type gets the same forecast all day, and a new one tomorrow.
   (It is seeded from the date + the type, so it needs no server.)
   For entertainment only.
   ========================================================================== */

const DAILY_MOODS = {
  INTJ: ["Your master plan is quietly coming together.", "Today you see three steps ahead of everyone.", "Your focus is razor-sharp. Guard it.", "A tiny idea today becomes a big strategy."],
  INTP: ["Your brain is running at full theory mode.", "A random question leads you somewhere brilliant.", "You will find a bug in something nobody asked about.", "Curiosity beats deadlines today."],
  ENTJ: ["People naturally look to you for direction today.", "Your energy is a rocket. Aim it.", "A bold decision is waiting for you.", "Today you turn chaos into a clean plan."],
  ENTP: ["Your wit is at maximum today.", "An argument you start turns into a great idea.", "You will have five ideas before lunch.", "Someone is about to be charmed by your logic."],
  INFJ: ["Your intuition is unusually accurate today.", "A quiet conversation changes your perspective.", "You sense what people need before they say it.", "Your inner world is full of good ideas today."],
  INFP: ["A daydream today holds a real spark.", "Your creativity wants to come out and play.", "Something small and beautiful will make your day.", "Your kind words land deeper than you know."],
  ENFJ: ["People are drawn to your warmth today.", "You will inspire someone without even trying.", "Your encouragement lands at exactly the right time.", "A group needs your glue today."],
  ENFP: ["Your enthusiasm is contagious today.", "A spontaneous plan turns into a great memory.", "A new idea shows up wearing a sparkly outfit.", "Today you will meet someone fascinating."],
  ISTJ: ["Your steady routine pays off today.", "Quiet effort gets noticed today.", "Everything on your list goes smoothly.", "Your reliability is someone's lifeline today."],
  ISFJ: ["A small act of care will be remembered for years.", "Your patience is your superpower today.", "Someone needs your gentle presence today.", "Your thoughtfulness brings peace to the room."],
  ESTJ: ["Your leadership keeps everything running today.", "A messy situation gets organized by you.", "Your clear decisions save time today.", "People appreciate your honesty today."],
  ESFJ: ["Your warmth brings people together today.", "A kind gesture from you lights up someone's day.", "You will be the glue of a big moment.", "Your hosting skills are in high demand."],
  ISTP: ["A tricky problem has your name on it today.", "Your calm hands fix what others can't.", "Today rewards doing over talking.", "A small adventure appears out of nowhere."],
  ISFP: ["Beauty finds you in an ordinary moment today.", "Your creativity flows best when you don't force it.", "A quiet moment recharges your artist soul.", "Someone sees the real you today, and loves it."],
  ESTP: ["Adrenaline and opportunity arrive together today.", "Your quick thinking wins the day.", "Action beats overthinking today.", "A spontaneous move opens a door."],
  ESFP: ["The spotlight finds you today. Enjoy it.", "Your joy is the soundtrack of the room.", "A last-minute plan turns into the best night.", "Your laughter is contagious today."]
};

const DAILY_MISSIONS = {
  analyst: ["Learn one new thing and explain it to someone.", "Finish one unfinished project, even a small one.", "Take a 10-minute walk with no screen.", "Tell someone you appreciate their idea.", "Write down one big goal and its first step.", "Ask a question you're usually afraid to ask.", "Clean up one corner of your desk or desktop.", "Share something you've been keeping in your head."],
  diplomat: ["Send a kind message to someone you miss.", "Do something creative for 15 minutes.", "Say no to one thing that drains you.", "Spend time in nature, even briefly.", "Write down three things you're grateful for.", "Tell someone what you really think, gently.", "Do one thing just for you.", "Give a stranger a sincere compliment."],
  sentinel: ["Finish the task you've been postponing.", "Check in with someone who relies on you.", "Try one small thing outside your routine.", "Plan tomorrow in five minutes.", "Thank someone who works behind the scenes.", "Declutter one small space.", "Ask for help with something, just once.", "Take a proper break without feeling guilty."],
  explorer: ["Do something you've never done before.", "Take a different route today.", "Call a friend and plan something fun.", "Fix or build something with your hands.", "Try a new food or drink.", "Spend an hour fully offline.", "Learn a quick new skill.", "Make a plan for one thing. Just one."]
};

const DAILY_WARNINGS = {
  analyst: ["Don't overthink one message for three hours.", "Beware of the 'one more tab' trap.", "Don't correct someone just because you can.", "Eat a real meal, not just coffee.", "Don't skip sleep for a side project.", "Not every idea needs a debate.", "Beware of perfectionism.", "Don't leave a friend's text unanswered for days."],
  diplomat: ["Don't take a casual comment too personally.", "Beware of saying 'I'm fine' when you're not.", "Don't absorb everyone else's stress.", "Beware of daydreaming through deadlines.", "Don't say yes when you mean no.", "Don't replay an old conversation tonight.", "Beware of putting someone on a pedestal.", "Don't forget to eat and drink water."],
  sentinel: ["Don't take on everyone's tasks.", "Beware of 'it's fine' said with a tight smile.", "Don't judge a new idea too fast.", "Beware of working through lunch.", "Don't compare yourself with others today.", "Don't postpone fun for chores.", "Beware of sticking to a plan that stopped working.", "Don't hold a grudge over a small thing."],
  explorer: ["Beware of impulse purchases.", "Don't skip the boring-but-important task.", "Beware of 'I'll do it later'.", "Don't say something you'll regret in the heat of the moment.", "Beware of accidentally ghosting a friend.", "Don't ignore your own tiredness.", "Beware of too many open plans.", "Don't forget to charge your phone."]
};

const DAILY_COLORS = [
  { name: "Midnight Blue", hex: "#1e3a8a" }, { name: "Sunset Orange", hex: "#f97316" },
  { name: "Mint Green", hex: "#34d399" }, { name: "Royal Purple", hex: "#7c3aed" },
  { name: "Rose Pink", hex: "#f43f5e" }, { name: "Sky Blue", hex: "#38bdf8" },
  { name: "Golden Yellow", hex: "#facc15" }, { name: "Forest Green", hex: "#166534" },
  { name: "Cherry Red", hex: "#dc2626" }, { name: "Silver Grey", hex: "#94a3b8" }
];

/* ---------- tiny seeded random (same seed = same forecast) ---------- */
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function seededRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* Build the forecast data for one type (pure function, easy to test) */
function buildForecast(code, dateKey) {
  const rng = seededRng(hashStr(dateKey + "|" + code));
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const grp = groupOf(code);
  const allCodes = Object.keys(DAILY_MOODS);
  return {
    mood: pick(DAILY_MOODS[code]),
    vibe: 45 + Math.floor(rng() * 56),
    color: pick(DAILY_COLORS),
    lucky: 1 + Math.floor(rng() * 99),
    mission: pick(DAILY_MISSIONS[grp]),
    warning: pick(DAILY_WARNINGS[grp]),
    match: pick(allCodes.filter(c => c !== code))
  };
}
