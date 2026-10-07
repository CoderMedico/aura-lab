/* ==========================================================================
   DEEP PROFILES FOR ALL 16 TYPES
   --------------------------------------------------------------------------
   Written for fun and self-reflection, not as clinical or professional advice.
   To edit a profile, just change the text inside the quotes.
   ========================================================================== */
const PROFILES = {
  INTJ: {
    strengths: ["Long-range strategic thinking", "Independent and self-driven", "High standards and sharp analysis", "Calm and decisive under pressure"],
    blindspots: ["Can come across as cold or dismissive", "Finds it hard to ask for help", "Impatient with slow or illogical processes"],
    careers: ["Software architect", "Scientist / researcher", "Strategy consultant", "Engineer", "Investor / analyst"],
    love: "Deeply loyal once they let someone in, but slow to open up and bad at saying feelings out loud.",
    friends: "Keeps a small circle of carefully chosen friends and prefers deep conversations over small talk.",
    stress: "Withdraws, overthinks worst-case scenarios, and may have rare, surprising emotional outbursts.",
    growth: "Say your appreciation out loud. A brilliant plan works better when people feel heard."
  },
  INTP: {
    strengths: ["Original, creative problem-solving", "Curious and open-minded", "Spots flaws in logic quickly", "Flexible and low-drama"],
    blindspots: ["Starts far more than they finish", "Forgets everyday practical basics", "Overanalyzes simple decisions"],
    careers: ["Programmer / data scientist", "Researcher / academic", "Game designer", "Systems analyst", "Writer / philosopher"],
    love: "Shows care through ideas, jokes and quiet loyalty. Needs a partner who respects their alone time.",
    friends: "Loves friends who match their curiosity and happily tolerate long tangents.",
    stress: "Goes silent, gets stuck in thought loops, or becomes unusually critical of people.",
    growth: "Pick one project and finish it. Tell people what you feel, not just what you think."
  },
  ENTJ: {
    strengths: ["Natural, confident leader", "Efficient organizer of people and plans", "Decisive and goal-oriented", "Strong work ethic"],
    blindspots: ["Can steamroll other people's ideas", "Impatient with emotions", "Finds it hard to relax"],
    careers: ["Executive / CEO", "Lawyer", "Entrepreneur", "Operations / project manager", "Management consultant"],
    love: "Brings energy, ambition and loyalty. Has to learn to listen before trying to fix things.",
    friends: "A motivating friend who pushes everyone to level up, sometimes a bit too hard.",
    stress: "Turns controlling and blunt, or buries themselves in work to avoid feeling anything.",
    growth: "Ask 'how are you feeling?' before 'what's the plan?' and praise people out loud."
  },
  ENTP: {
    strengths: ["Quick-witted and inventive", "Great at debate and persuasion", "Adapts easily to change", "Sees possibilities everywhere"],
    blindspots: ["Loses interest after the exciting start", "Argues for sport and can hurt feelings", "Dislikes routine and small details"],
    careers: ["Entrepreneur", "Marketer / creative director", "Lawyer", "Product manager", "Journalist / comedian"],
    love: "A playful, stimulating partner who flirts with ideas. Needs freedom and reassurance that commitment won't be boring.",
    friends: "The fun, unpredictable friend who is always up for a late-night debate.",
    stress: "Scatters their energy, turns sarcastic, or fixates on small errors and details.",
    growth: "Finish what you start, and check whether the other person actually wants a debate."
  },
  INFJ: {
    strengths: ["Deep empathy and insight", "Principled and purposeful", "Excellent listener and counselor", "Creative visionary"],
    blindspots: ["Perfectionism that leads to burnout", "Hides their own needs", "Sensitive to criticism and thinks in all-or-nothing terms"],
    careers: ["Counselor / therapist", "Writer", "Teacher", "Nonprofit / social work", "UX researcher / designer"],
    love: "Seeks a soulmate-level bond. Devoted and attentive, but needs a partner who accepts their need for solitude.",
    friends: "Has a few very close friends they can be fully honest with. The one people call at 2 AM.",
    stress: "Withdraws completely, then may suddenly shut people out.",
    growth: "Say what you need before resentment builds. Rest counts as progress."
  },
  INFP: {
    strengths: ["Authentic and value-driven", "Creative and imaginative", "Kind and accepting of others", "Strong inner compass"],
    blindspots: ["Very self-critical", "Avoids conflict", "Procrastinates when overwhelmed"],
    careers: ["Writer / poet", "Graphic designer / artist", "Counselor", "Librarian / archivist", "Cause-driven nonprofit work"],
    love: "Romantic, loyal and deeply caring. Needs emotional honesty and room to be themselves.",
    friends: "A gentle, accepting friend who remembers what matters to you.",
    stress: "Spirals into self-doubt, withdraws, or becomes harshly critical of small details.",
    growth: "Take one small, concrete step toward your ideals every day."
  },
  ENFJ: {
    strengths: ["Inspiring communicator", "Reads people extremely well", "Organizes and motivates groups", "Generous and reliable"],
    blindspots: ["Takes on too much of other people's problems", "Needs approval", "Struggles to say no"],
    careers: ["Teacher / coach", "HR / people manager", "Counselor", "Event / community organizer", "Nonprofit or political leader"],
    love: "An attentive, devoted partner who invests in growing together. May overgive and ignore their own needs.",
    friends: "Remembers everything about you and gathers the whole group together.",
    stress: "Feels unappreciated, becomes controlling, or turns very self-critical.",
    growth: "Put your own needs on the calendar. Helping people isn't only your job."
  },
  ENFP: {
    strengths: ["Enthusiastic and warm", "Endless creative ideas", "Connects with almost anyone", "Optimistic and adaptable"],
    blindspots: ["Scattered focus", "Overcommits", "Big emotional ups and downs"],
    careers: ["Content creator", "Marketing / brand", "Coach / counselor", "Entrepreneur", "Teacher / trainer"],
    love: "Passionate and affectionate. Wants deep emotional connection plus adventure, and may fear feeling tied down.",
    friends: "The spark of any group who makes strangers feel like old friends.",
    stress: "Feels overwhelmed and indecisive, or fixates on everything that could go wrong.",
    growth: "Pick a few projects and see them through. Simple routines give your ideas room to grow."
  },
  ISTJ: {
    strengths: ["Reliable and responsible", "Organized and thorough", "Calm and practical", "Strong sense of duty"],
    blindspots: ["Resists change", "Can be rigid", "Reluctant to show feelings"],
    careers: ["Accountant / auditor", "Engineer", "Logistics / operations manager", "Law enforcement / military", "Judge / legal professional"],
    love: "Shows love through actions and steady commitment instead of words.",
    friends: "A dependable, long-term friend who always shows up.",
    stress: "Becomes rigid and pessimistic, fixating on worst-case scenarios.",
    growth: "Try one unplanned thing, and say 'I appreciate you' out loud."
  },
  ISFJ: {
    strengths: ["Warm and caring", "Detail-oriented and observant", "Loyal and dependable", "Patient and supportive"],
    blindspots: ["Finds it hard to say no", "Avoids conflict and change", "Stores up quiet resentment"],
    careers: ["Nurse / healthcare", "Teacher", "Social worker", "Administrator", "Librarian / HR"],
    love: "Thoughtful and devoted. Remembers all the little things that matter.",
    friends: "The caretaker who always has a snack and a tissue ready.",
    stress: "Overworks silently, then feels unappreciated and worries about worst cases.",
    growth: "Ask for what you need. Small boundaries protect big hearts."
  },
  ESTJ: {
    strengths: ["Organized and decisive", "Honest and dedicated", "Great at managing people and processes", "Strong work ethic"],
    blindspots: ["Can be inflexible", "Judges unfamiliar methods too quickly", "Uncomfortable with emotional conversations"],
    careers: ["Manager / administrator", "Judge / lawyer", "Financial officer", "Military / police", "Operations director"],
    love: "Loyal, protective and tradition-minded. Shows love by providing and planning.",
    friends: "The friend who organizes the plans and tells it to you straight.",
    stress: "Gets controlling and critical, and works nonstop.",
    growth: "Stay open to other ways of doing things, and listen without trying to solve."
  },
  ESFJ: {
    strengths: ["Warm and sociable", "Reliable and organized", "Builds strong communities", "Attentive to others' needs"],
    blindspots: ["Sensitive to criticism", "Needs approval", "Reluctant to try unconventional approaches"],
    careers: ["Nurse / healthcare", "Teacher", "Event planner / hospitality", "HR / customer success", "Social services"],
    love: "Affectionate and attentive. Values harmony, traditions and showing up for each other.",
    friends: "The host who knows everyone's story and keeps the group together.",
    stress: "Takes things personally, over-explains, and keeps seeking reassurance.",
    growth: "Your worth isn't measured by everyone's approval. Healthy disagreement is okay."
  },
  ISTP: {
    strengths: ["Hands-on problem solver", "Calm in a crisis", "Practical and efficient", "Independent and flexible"],
    blindspots: ["Hard to read emotionally", "Risk-taking", "Dislikes long-term planning and commitment"],
    careers: ["Mechanic / engineer", "Pilot", "Developer / IT security", "Paramedic / firefighter", "Craftsperson"],
    love: "Shows care through actions and shared activities. Needs space.",
    friends: "A chill, low-drama friend who can fix almost anything and joins spontaneous adventures.",
    stress: "Bottles things up and then explodes, or becomes reckless.",
    growth: "Say your feelings in words, even briefly, and plan one thing further ahead."
  },
  ISFP: {
    strengths: ["Artistic and sensitive", "Easygoing and open-minded", "Loyal to their values", "Lives fully in the present"],
    blindspots: ["Avoids conflict", "Takes criticism very personally", "Struggles with long-term planning"],
    careers: ["Artist / designer", "Musician", "Photographer", "Chef", "Veterinary / healthcare"],
    love: "Gentle, passionate and affectionate. Shows love through gestures, art and shared experiences.",
    friends: "A warm, nonjudgmental friend who makes life more beautiful.",
    stress: "Withdraws or becomes uncharacteristically harsh, and feels trapped.",
    growth: "Speak up early, and set small goals to make big dreams real."
  },
  ESTP: {
    strengths: ["Energetic and action-oriented", "Perceptive and quick", "Great in a crisis", "Persuasive and sociable"],
    blindspots: ["Impulsive", "Impatient with theory and long planning", "Gets bored easily"],
    careers: ["Entrepreneur / sales", "Paramedic / first responder", "Athlete / coach", "Marketing / events", "Trader / broker"],
    love: "Fun, spontaneous and generous. Keeps things exciting and needs freedom.",
    friends: "The life of the party, always ready for the next adventure.",
    stress: "Gets restless or reckless, and may dwell on inner feelings they usually ignore.",
    growth: "Pause before leaping, and think about how your choices affect others."
  },
  ESFP: {
    strengths: ["Fun, warm and spontaneous", "Great with people", "Practical and observant", "Naturally optimistic"],
    blindspots: ["Avoids serious long-term planning", "Gets bored with routine", "Sensitive to criticism"],
    careers: ["Performer / actor", "Event planner", "Teacher / childcare", "Sales / hospitality", "Travel / tour guide"],
    love: "Romantic, generous and affectionate. Makes every day feel like a celebration.",
    friends: "The one who brings the energy and makes everyone feel included.",
    stress: "Seeks distraction, avoids problems, or fears the worst outcomes.",
    growth: "Build one small saving or planning habit, and face hard conversations early."
  }
};
