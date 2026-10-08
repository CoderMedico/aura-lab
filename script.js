/* load extras.css (Leaderboard + Synergy styles) */
(function () { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'extras.css'; document.head.appendChild(l); })();

/* ==========================================================================
   DATA MODEL: 16 PERSONAS & METADATA
   ========================================================================== */
const PERSONAS = {
  INTJ: {
    code: "INTJ", name: "The Architect", group: "analyst", color: "#8b5cf6", emoji: "♟️",
    summary: "Thoughtful strategists with a plan for everything.",
    quirks: [
      "Has a contingency plan for their contingency plan.",
      "Will spend 3 hours automating a task that takes 5 minutes.",
      "Exhausted by small talk, energized by complex systems theory."
    ],
    famous: ["Elon Musk", "Christopher Nolan", "Stephen Hawking"],
    scores: { E: 15, I: 85, S: 20, N: 80, T: 85, F: 15, J: 80, P: 20 }
  },
  INTP: {
    code: "INTP", name: "The Logician", group: "analyst", color: "#8b5cf6", emoji: "🧪",
    summary: "Innovative inventors with an unquenchable thirst for knowledge.",
    quirks: [
      "Has 84 open tabs in their browser right now.",
      "Explains simple concepts using quantum physics analogies.",
      "Loves starting projects; finishing them is optional."
    ],
    famous: ["Albert Einstein", "Bill Gates", "Ada Lovelace"],
    scores: { E: 20, I: 80, S: 15, N: 85, T: 90, F: 10, J: 25, P: 75 }
  },
  ENTJ: {
    code: "ENTJ", name: "The Commander", group: "analyst", color: "#8b5cf6", emoji: "👑",
    summary: "Bold, imaginative, and strong-willed leaders.",
    quirks: [
      "Organizes board game night with a Gantt chart.",
      "Sees inefficiency as a personal insult.",
      "Can optimize a grocery run down to the second."
    ],
    famous: ["Steve Jobs", "Gordon Ramsay", "Margaret Thatcher"],
    scores: { E: 85, I: 15, S: 25, N: 75, T: 85, F: 15, J: 90, P: 10 }
  },
  ENTP: {
    code: "ENTP", name: "The Debater", group: "analyst", color: "#8b5cf6", emoji: "⚡",
    summary: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    quirks: [
      "Will argue the opposite point just to keep the conversation spicy.",
      "Can sell ice to a polar bear.",
      "Allergic to routines and repetitive tasks."
    ],
    famous: ["Robert Downey Jr.", "Mark Twain", "Thomas Edison"],
    scores: { E: 80, I: 20, S: 20, N: 80, T: 75, F: 25, J: 20, P: 80 }
  },
  INFJ: {
    code: "INFJ", name: "The Advocate", group: "diplomat", color: "#10b981", emoji: "🔮",
    summary: "Quiet and mystical, yet very inspiring and tireless idealists.",
    quirks: [
      "Can sense your emotional vibe from 50 feet away.",
      "Recharges social battery in solitude for 3 business days.",
      "Writes deep poetic essays in their notes app at 3 AM."
    ],
    famous: ["Martin Luther King Jr.", "Carl Jung", "Lady Gaga"],
    scores: { E: 20, I: 80, S: 15, N: 85, T: 20, F: 80, J: 85, P: 15 }
  },
  INFP: {
    code: "INFP", name: "The Mediator", group: "diplomat", color: "#10b981", emoji: "🎨",
    summary: "Poetic, kind, and altruistic people, always eager to help a good cause.",
    quirks: [
      "Daydreams full movie plots while waiting in line.",
      "Deeply attached to fictional characters.",
      "Possesses infinite empathy for stray animals."
    ],
    famous: ["William Shakespeare", "J.R.R. Tolkien", "Keanu Reeves"],
    scores: { E: 15, I: 85, S: 10, N: 90, T: 15, F: 85, J: 20, P: 80 }
  },
  ENFJ: {
    code: "ENFJ", name: "The Protagonist", group: "diplomat", color: "#10b981", emoji: "🌟",
    summary: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    quirks: [
      "Accidentally becomes the therapist for everyone in the group.",
      "Remembers everyone's birthday and favorite snack.",
      "Radiates main character energy wherever they go."
    ],
    famous: ["Barack Obama", "Oprah Winfrey", "Meryl Streep"],
    scores: { E: 85, I: 15, S: 20, N: 80, T: 20, F: 80, J: 80, P: 20 }
  },
  ENFP: {
    code: "ENFP", name: "The Campaigner", group: "diplomat", color: "#10b981", emoji: "🚀",
    summary: "Enthusiastic, creative, and sociable free spirits.",
    quirks: [
      "Adopts introverts against their will and makes them best friends.",
      "Starts 5 new hobbies every month.",
      "Connects completely unrelated topics effortlessly."
    ],
    famous: ["Robin Williams", "Walt Disney", "RM (BTS)"],
    scores: { E: 85, I: 15, S: 15, N: 85, T: 15, F: 85, J: 15, P: 85 }
  },
  ISTJ: {
    code: "ISTJ", name: "The Logistician", group: "sentinel", color: "#0ea5e9", emoji: "📋",
    summary: "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    quirks: [
      "Has a color-coded calendar for the next 5 years.",
      "Never late; arriving 15 minutes early is arriving on time.",
      "Follows manual instructions word for word."
    ],
    famous: ["Warren Buffett", "George Washington", "Angela Merkel"],
    scores: { E: 15, I: 85, S: 85, N: 15, T: 80, F: 20, J: 90, P: 10 }
  },
  ISFJ: {
    code: "ISFJ", name: "The Defender", group: "sentinel", color: "#0ea5e9", emoji: "🛡️",
    summary: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    quirks: [
      "Always has snacks, tissues, and band-aids in their bag.",
      "Apologizes when someone else bumps into them.",
      "Remembers what you wore 3 years ago."
    ],
    famous: ["Beyoncé", "Mother Teresa", "Captain America (Fiction)"],
    scores: { E: 20, I: 80, S: 80, N: 20, T: 20, F: 80, J: 85, P: 15 }
  },
  ESTJ: {
    code: "ESTJ", name: "The Executive", group: "sentinel", color: "#0ea5e9", emoji: "💼",
    summary: "Excellent administrators, unsurpassed at managing things or people.",
    quirks: [
      "Elected group leader before the teacher finishes explaining.",
      "Rules and structure are sacred.",
      "Gets things done before anyone else wakes up."
    ],
    famous: ["Judge Judy", "Henry Ford", "Sonia Sotomayor"],
    scores: { E: 85, I: 15, S: 80, N: 20, T: 85, F: 15, J: 90, P: 10 }
  },
  ESFJ: {
    code: "ESFJ", name: "The Consul", group: "sentinel", color: "#0ea5e9", emoji: "🤝",
    summary: "Extraordinarily caring, social, and popular people, always eager to help.",
    quirks: [
      "Knows all the local gossip before news networks do.",
      "Hosts the most aesthetic dinner parties.",
      "Cannot stand silent tension in a room."
    ],
    famous: ["Taylor Swift", "Jennifer Garner", "Hugh Jackman"],
    scores: { E: 85, I: 15, S: 75, N: 25, T: 15, F: 85, J: 80, P: 20 }
  },
  ISTP: {
    code: "ISTP", name: "The Virtuoso", group: "explorer", color: "#f59e0b", emoji: "🛠️",
    summary: "Bold and practical experimenters, masters of all kinds of tools.",
    quirks: [
      "Takes things apart just to see how they work.",
      "Calm in emergencies, bored during normal days.",
      "Communicates mostly in subtle head nods."
    ],
    famous: ["Tom Cruise", "Clint Eastwood", "Michael Jordan"],
    scores: { E: 20, I: 80, S: 85, N: 15, T: 80, F: 20, J: 20, P: 80 }
  },
  ISFP: {
    code: "ISFP", name: "The Adventurer", group: "explorer", color: "#f59e0b", emoji: "🎸",
    summary: "Flexible and charming artists, always ready to explore new experiences.",
    quirks: [
      "Has immaculate aesthetic taste in music and decor.",
      "Spontaneous weekend road trips are their love language.",
      "Expresses deep emotions through art rather than words."
    ],
    famous: ["Michael Jackson", "Frida Kahlo", "Britney Spears"],
    scores: { E: 25, I: 75, S: 80, N: 20, T: 20, F: 80, J: 20, P: 80 }
  },
  ESTP: {
    code: "ESTP", name: "The Entrepreneur", group: "explorer", color: "#f59e0b", emoji: "🏎️",
    summary: "Smart, energetic, and very perceptive people, who truly enjoy living on the edge.",
    quirks: [
      "Leaps before looking, handles consequences later.",
      "Can charm their way out of any sticky situation.",
      "Thrives under high adrenaline conditions."
    ],
    famous: ["Ernest Hemingway", "Madonna", "Bruce Willis"],
    scores: { E: 85, I: 15, S: 85, N: 15, T: 75, F: 25, J: 15, P: 85 }
  },
  ESFP: {
    code: "ESFP", name: "The Entertainer", group: "explorer", color: "#f59e0b", emoji: "🎉",
    summary: "Spontaneous, energetic, and enthusiastic people – life is never boring around them.",
    quirks: [
      "Turns mundane chores into a full musical performance.",
      "Always knows where the best vibe in town is.",
      "Lives 100% in the present moment."
    ],
    famous: ["Elton John", "Marilyn Monroe", "Will Smith"],
    scores: { E: 90, I: 10, S: 80, N: 20, T: 15, F: 85, J: 15, P: 85 }
  }
};

/* FUN FACTS ARRAY */
const FUN_FACTS = [
  "INFJ is often cited as the rarest of the 16 types, at roughly 1.5% of people (estimates vary).",
  "ENTPs are nicknamed 'Debaters' because they love testing ideas through friendly argument.",
  "ISTJ and ISFJ are usually estimated to be among the most common types (numbers vary by study).",
  "ENFPs are often described as extroverts with a surprisingly deep inner world.",
  "INTPs are famous for having 84 browser tabs open. Totally unscientific, but you know it's true.",
  "ENTJs are nicknamed 'Commanders' because they tend to take charge of group plans."
];

/* ==========================================================================
   APP STATE ENGINE
   ========================================================================== */
let currentQuestionIdx = 0;
let quizTimerInterval = null;
let quizSeconds = 0;
let currentResultPersona = null;

/* DOM ELEMENT REFERENCES */
const views = {
  hero: document.getElementById('heroView'),
  mode: document.getElementById('modeView'),
  quiz: document.getElementById('quizView'),
  result: document.getElementById('resultView'),
  gallery: document.getElementById('galleryView'),
  compare: document.getElementById('compareView'),
  history: document.getElementById('historyView'),
  play: document.getElementById('playView'),
};

/* ==========================================================================
   NAVIGATION & VIEW SWITCHING
   ========================================================================== */
const NAV_MAP = {
  hero: 'navQuizBtn', mode: 'navQuizBtn', quiz: 'navQuizBtn', result: 'navQuizBtn',
  gallery: 'navGalleryBtn', compare: 'navCompareBtn', history: 'navHistoryBtn', play: 'navPlayBtn'
};
let currentNavKey = 'hero';

function updateNavIndicator(viewKey, instant = false) {
  currentNavKey = viewKey;
  document.querySelectorAll('.mnav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === NAV_MAP[viewKey]));
  const btn = document.getElementById(NAV_MAP[viewKey]);
  const ind = document.getElementById('navIndicator');
  if (!btn || !ind) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b === btn));
  if (instant) ind.style.transition = 'none';
  ind.style.width = btn.offsetWidth + 'px';
  ind.style.transform = `translateX(${btn.offsetLeft}px)`;
  if (instant) { void ind.offsetWidth; ind.style.transition = ''; }
}
window.addEventListener('load', () => updateNavIndicator(currentNavKey, true));
window.addEventListener('resize', () => updateNavIndicator(currentNavKey, true));
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => updateNavIndicator(currentNavKey, true));
}
if (window.ResizeObserver) {
  new ResizeObserver(() => updateNavIndicator(currentNavKey, true)).observe(document.getElementById('mainNav'));
}

function switchView(targetViewKey) {
  Object.keys(views).forEach(key => {
    if (key === targetViewKey) {
      views[key].classList.remove('hidden');
    } else {
      views[key].classList.add('hidden');
    }
  });
  updateNavIndicator(targetViewKey);
  try { sessionStorage.setItem('aura_view', targetViewKey); } catch (e) {}
  if (targetViewKey === 'hero' || targetViewKey === 'mode') renderResumeBanners();
  if (targetViewKey === 'play') renderPlayZone();
  window.scrollTo(0, 0);
}

// Nav Button Click Handlers
document.getElementById('navLogo').addEventListener('click', () => switchView('hero'));
document.getElementById('navQuizBtn').addEventListener('click', () => switchView('hero'));
document.getElementById('startQuizBtn').addEventListener('click', showModeSelect);
document.getElementById('navGalleryBtn').addEventListener('click', () => {
  renderGallery('all');
  switchView('gallery');
});
document.getElementById('explorePersonasBtn').addEventListener('click', () => {
  renderGallery('all');
  switchView('gallery');
});
document.getElementById('navCompareBtn').addEventListener('click', () => {
  switchView('compare');
  try { initCompareView(); } catch (e) { console.error('Compare view error:', e); }
});
document.getElementById('navPlayBtn').addEventListener('click', () => switchView('play'));
document.getElementById('navHistoryBtn').addEventListener('click', () => {
  renderHistoryList();
  switchView('history');
});
document.getElementById('exitQuizBtn').addEventListener('click', () => {
  clearInterval(quizTimerInterval);
  switchView('hero');
});
document.getElementById('restartQuizBtn').addEventListener('click', showModeSelect);
document.getElementById('modeBackBtn').addEventListener('click', () => switchView('hero'));

/* ==========================================================================
   QUIZ ENGINE LOGIC  (modes, 5-point scale, back/skip, resume, A/T)
   ========================================================================== */
const PROGRESS_KEY = 'aura_quiz_progress';
const RECENT_KEY = 'aura_recent_questions';
const LIKERT_LABELS = ['Strongly agree', 'Agree', 'Neutral', 'Disagree', 'Strongly disagree'];
const DOT_SIZES = [
  'w-10 h-10 sm:w-14 sm:h-14', 'w-8 h-8 sm:w-11 sm:h-11', 'w-6 h-6 sm:w-9 sm:h-9',
  'w-8 h-8 sm:w-11 sm:h-11', 'w-10 h-10 sm:w-14 sm:h-14'
];
const DOT_SIDES = ['left', 'left', 'mid', 'right', 'right'];

let quizMode = 'standard';
let quizQuestions = [];   // [{ id, flip }]
let quizAnswers = [];     // [{ letter, strength, pick } | { skipped: true }]
let currentResultCode = '';
let currentRadarData = null;
let currentResultBars = null;

/* ---------- small helpers ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function quizTotal(mode) {
  return Object.values(QUIZ_MODES[mode].perDim).reduce((a, b) => a + b, 0);
}
function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch (e) { return []; }
}
function rememberQuestions(ids) {
  try {
    const old = getRecent().filter(id => !ids.includes(id));
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids.concat(old).slice(0, 80)));
  } catch (e) { /* storage unavailable */ }
}

/* ---------- save / resume ---------- */
function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      mode: quizMode, questions: quizQuestions, answers: quizAnswers,
      idx: currentQuestionIdx, seconds: quizSeconds
    }));
  } catch (e) { /* storage unavailable */ }
}
function loadProgress() {
  try {
    const p = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
    if (p && QUIZ_MODES[p.mode] && Array.isArray(p.questions) && p.questions.length &&
        p.questions.every(q => QUESTION_MAP[q.id]) && p.idx < p.questions.length) return p;
  } catch (e) { /* ignore */ }
  return null;
}
function clearProgress() {
  try { localStorage.removeItem(PROGRESS_KEY); } catch (e) { /* ignore */ }
}

function renderResumeBanners() {
  const p = loadProgress();
  document.querySelectorAll('.resume-slot').forEach(slot => {
    if (!p) { slot.innerHTML = ''; return; }
    slot.innerHTML = `
      <div class="glass-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-indigo-500 max-w-xl mx-auto">
        <div class="text-left">
          <p class="font-display font-bold text-sm text-white">Unfinished quiz found</p>
          <p class="text-xs text-slate-400">${QUIZ_MODES[p.mode].label} · Question ${p.idx + 1} of ${p.questions.length}</p>
        </div>
        <div class="flex items-center gap-2">
          <button data-resume class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all">Resume ▶</button>
          <button data-discard class="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">Discard</button>
        </div>
      </div>`;
    slot.querySelector('[data-resume]').addEventListener('click', resumeQuiz);
    slot.querySelector('[data-discard]').addEventListener('click', () => {
      clearProgress();
      renderResumeBanners();
    });
  });
}

/* ---------- mode picker ---------- */
function renderModeCards() {
  const wrap = document.getElementById('modeCards');
  wrap.innerHTML = '';
  Object.entries(QUIZ_MODES).forEach(([key, m]) => {
    const hasAT = m.perDim.AT > 0;
    const card = document.createElement('button');
    card.className = 'glass-card p-6 rounded-3xl text-left space-y-3 hover:scale-[1.02] hover:border-brand-500/60 transition-all';
    card.innerHTML = `
      <div class="text-4xl">${m.emoji}</div>
      <h3 class="font-display font-bold text-xl text-white">${m.label}</h3>
      <p class="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">${quizTotal(key)} questions · ${m.time}</p>
      <p class="text-sm text-slate-300">${m.desc}</p>
      <span class="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${hasAT ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}">${hasAT ? 'Includes A / T suffix' : 'Core 4 letters only'}</span>`;
    card.addEventListener('click', () => startQuiz(key));
    wrap.appendChild(card);
  });
}
function showModeSelect() {
  renderModeCards();
  switchView('mode');
}

/* ---------- picking questions (balanced, random, avoids recent) ---------- */
function pickQuestions(mode) {
  const recent = new Set(getRecent());
  const picked = [];
  Object.entries(QUIZ_MODES[mode].perDim).forEach(([dim, n]) => {
    if (!n) return;
    const pool = QUESTION_BANK.filter(q => q.dim === dim);
    const fresh = shuffle(pool.filter(q => !recent.has(q.id)));
    const stale = shuffle(pool.filter(q => recent.has(q.id)));
    fresh.concat(stale).slice(0, n).forEach(q => picked.push({ id: q.id, flip: Math.random() < 0.5 }));
  });
  return shuffle(picked);
}

/* ---------- start / resume ---------- */
function startQuiz(mode) {
  quizMode = (typeof mode === 'string' && QUIZ_MODES[mode]) ? mode : 'standard';
  quizQuestions = pickQuestions(quizMode);
  quizAnswers = [];
  currentQuestionIdx = 0;
  quizSeconds = 0;
  clearProgress();
  beginQuizSession();
}
function resumeQuiz() {
  const p = loadProgress();
  if (!p) return;
  quizMode = p.mode;
  quizQuestions = p.questions;
  quizAnswers = p.answers || [];
  currentQuestionIdx = p.idx;
  quizSeconds = p.seconds || 0;
  beginQuizSession();
}
function updateTimerText() {
  const mins = String(Math.floor(quizSeconds / 60)).padStart(2, '0');
  const secs = String(quizSeconds % 60).padStart(2, '0');
  document.getElementById('quizTimer').textContent = `${mins}:${secs}`;
}
function beginQuizSession() {
  clearInterval(quizTimerInterval);
  updateTimerText();
  quizTimerInterval = setInterval(() => {
    quizSeconds++;
    updateTimerText();
  }, 1000);
  switchView('quiz');
  renderQuestion();
}

/* ---------- ordering helpers (flip = randomised left/right) ---------- */
function orderedSides(q, item) {
  const sides = q.type === 'choice' ? q.answers : [q.left, q.right];
  return item.flip ? [sides[1], sides[0]] : [sides[0], sides[1]];
}

/* ---------- rendering a question ---------- */
function renderQuestion() {
  const total = quizQuestions.length;
  const item = quizQuestions[currentQuestionIdx];
  const q = QUESTION_MAP[item.id];
  const pct = Math.round((currentQuestionIdx / total) * 100);

  document.getElementById('quizProgressText').textContent = `Question ${currentQuestionIdx + 1} of ${total}`;
  document.getElementById('quizPercentText').textContent = `${pct}%`;
  document.getElementById('quizProgressBar').style.width = `${pct}%`;
  document.getElementById('qCategoryBadge').textContent = DIM_LABELS[q.dim];
  document.getElementById('quizBackBtn').disabled = currentQuestionIdx === 0;

  const saved = quizAnswers[currentQuestionIdx];
  const savedPick = saved && !saved.skipped ? saved.pick : -1;
  const container = document.getElementById('qAnswersContainer');
  container.innerHTML = '';

  if (q.type === 'agree') {
    document.getElementById('qTitleText').textContent = q.text;
    container.appendChild(buildScale(savedPick, 'Agree', 'Disagree'));
  } else if (q.type === 'slider') {
    document.getElementById('qTitleText').textContent = 'Which side sounds more like you?';
    const [L, R] = orderedSides(q, item);
    const statements = document.createElement('div');
    statements.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6';
    statements.innerHTML = `
      <div class="glass-card p-4 rounded-2xl border-l-4 border-l-emerald-500 text-sm font-semibold text-slate-200">${L.text}</div>
      <div class="glass-card p-4 rounded-2xl border-l-4 border-l-purple-500 text-sm font-semibold text-slate-200">${R.text}</div>`;
    container.appendChild(statements);
    container.appendChild(buildScale(savedPick, 'Left', 'Right'));
  } else {
    document.getElementById('qTitleText').textContent = q.title;
    orderedSides(q, item).forEach((ans, idx) => {
      const btn = document.createElement('button');
      const selected = savedPick === idx ? ' ring-2 ring-brand-500 bg-brand-500/10' : '';
      btn.className = 'w-full text-left p-5 rounded-2xl glass-card hover:border-brand-500/80 hover:bg-brand-500/10 transition-all flex items-center justify-between group' + selected;
      btn.innerHTML = `
        <span class="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-white">${ans.text}</span>
        <span class="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-brand-600 text-slate-400 group-hover:text-white flex items-center justify-center font-bold text-xs transition-colors ml-4 flex-shrink-0">→</span>`;
      btn.addEventListener('click', () => answerQuestion(idx));
      container.appendChild(btn);
    });
  }
}

function buildScale(savedPick, leftLabel, rightLabel) {
  const wrap = document.createElement('div');
  wrap.className = 'flex items-center justify-between gap-2 sm:gap-4';
  const dots = [0, 1, 2, 3, 4].map(i => `
    <button type="button" data-pick="${i}" data-side="${DOT_SIDES[i]}" title="${LIKERT_LABELS[i]}"
      aria-label="${LIKERT_LABELS[i]}"
      class="scale-dot ${DOT_SIZES[i]} flex-shrink-0${savedPick === i ? ' selected' : ''}"></button>`).join('');
  wrap.innerHTML = `
    <span class="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-500 w-12 sm:w-16 text-left">${leftLabel}</span>
    <div class="flex items-center justify-center gap-2 sm:gap-4">${dots}</div>
    <span class="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-purple-500 w-12 sm:w-16 text-right">${rightLabel}</span>`;
  wrap.querySelectorAll('.scale-dot').forEach(btn => {
    btn.addEventListener('click', () => answerQuestion(Number(btn.dataset.pick)));
  });
  return wrap;
}

/* ---------- answering ---------- */
function buildAnswer(q, item, pick) {
  const [first, second] = DIM_LETTERS[q.dim];
  if (q.type === 'agree') {
    const v = [2, 1, 0, -1, -2][pick];
    if (v === 0) return { letter: null, strength: 0, pick };
    const other = q.toward === first ? second : first;
    return v > 0 ? { letter: q.toward, strength: v, pick } : { letter: other, strength: -v, pick };
  }
  if (q.type === 'slider') {
    const [L, R] = orderedSides(q, item);
    const m = [[L.code, 2], [L.code, 1], [null, 0], [R.code, 1], [R.code, 2]][pick];
    return { letter: m[0], strength: m[1], pick };
  }
  const ans = orderedSides(q, item)[pick];
  return { letter: ans.code, strength: 2, pick };
}

function answerQuestion(pick) {
  const item = quizQuestions[currentQuestionIdx];
  const q = QUESTION_MAP[item.id];
  quizAnswers[currentQuestionIdx] = buildAnswer(q, item, pick);
  advanceQuiz();
}
function skipQuestion() {
  quizAnswers[currentQuestionIdx] = { skipped: true };
  advanceQuiz();
}
function goBackQuestion() {
  if (currentQuestionIdx === 0) return;
  currentQuestionIdx--;
  saveProgress();
  renderQuestion();
}
function advanceQuiz() {
  currentQuestionIdx++;
  if (currentQuestionIdx < quizQuestions.length) {
    saveProgress();
    renderQuestion();
  } else {
    finishQuiz();
  }
}

document.getElementById('quizBackBtn').addEventListener('click', goBackQuestion);
document.getElementById('quizSkipBtn').addEventListener('click', skipQuestion);

/* ---------- scoring ---------- */
function computeResults() {
  const dims = {};
  Object.keys(DIM_LETTERS).forEach(d => { dims[d] = { sum: 0, max: 0, answered: 0 }; });

  quizQuestions.forEach((item, i) => {
    const a = quizAnswers[i];
    if (!a || a.skipped) return;
    const q = QUESTION_MAP[item.id];
    const d = dims[q.dim];
    d.max += 2;
    d.answered++;
    if (a.letter) d.sum += (a.letter === DIM_LETTERS[q.dim][0] ? 1 : -1) * a.strength;
  });

  const out = {};
  Object.keys(dims).forEach(d => {
    const { sum, max, answered } = dims[d];
    const [first, second] = DIM_LETTERS[d];
    const firstPct = max ? Math.round(((sum + max) / (2 * max)) * 100) : 50;
    out[d] = { first, second, firstPct, secondPct: 100 - firstPct, answered, winner: sum >= 0 ? first : second };
  });
  return out;
}

function letterName(dim, letter) {
  return dim === 'AT' ? AT_NAMES[letter] : LETTER_NAMES[letter];
}

/* ---------- finishing + result screen ---------- */
function finishQuiz() {
  const answeredCount = quizAnswers.filter(a => a && !a.skipped).length;
  if (!answeredCount) {
    currentQuestionIdx = quizQuestions.length - 1;
    renderQuestion();
    showToast('Answer at least one question to see your result.');
    return;
  }

  clearInterval(quizTimerInterval);
  const r = computeResults();
  const code = r.EI.winner + r.SN.winner + r.TF.winner + r.JP.winner;
  const suffix = r.AT.answered > 0 ? r.AT.winner : '';

  const mins = String(Math.floor(quizSeconds / 60)).padStart(2, '0');
  const secs = String(quizSeconds % 60).padStart(2, '0');
  const meta = `${QUIZ_MODES[quizMode].label} · ${answeredCount} of ${quizQuestions.length} answered · ${mins}:${secs}`;

  rememberQuestions(quizQuestions.map(q => q.id));
  clearProgress();

  showResultScreen(code, suffix, r, meta, false);
  saveToHistory(currentResultPersona, currentResultCode);
  onQuizCompleted(quizMode, quizSeconds);
  launchConfetti();
}

/* Shared by the quiz AND by shared links (?r=INTJ-A&b=...) */
function showResultScreen(code, suffix, r, metaText, isShared) {
  currentResultPersona = PERSONAS[code] || PERSONAS.INTJ;
  currentResultCode = code + (suffix ? '-' + suffix : '');
  currentResultBars = ['EI', 'SN', 'TF', 'JP'].concat(suffix ? ['AT'] : []).map(d => r[d].firstPct);

  document.getElementById('sharedBanner').classList.toggle('hidden', !isShared);
  document.getElementById('resultCodeTitle').textContent = currentResultCode;
  document.getElementById('resultRoleName').textContent = currentResultPersona.name;
  document.getElementById('resultSummaryText').textContent = currentResultPersona.summary;
  document.getElementById('resultBadgeEmoji').textContent = currentResultPersona.emoji;
  document.getElementById('resultBadgeCode').textContent = currentResultCode;
  document.getElementById('resultBadgeGroup').textContent = currentResultPersona.group;
  document.getElementById('resultMeta').textContent = metaText;

  renderBreakdown(r, !!suffix);

  document.getElementById('resultFunFactsList').innerHTML = currentResultPersona.quirks
    .map(q => `<li class="flex items-start gap-2"><span>•</span> <span>${q}</span></li>`).join('');
  document.getElementById('resultFamousList').innerHTML = currentResultPersona.famous
    .map(f => `<span class="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">${f}</span>`).join('');
  document.getElementById('resultProfile').innerHTML = profileSectionsHTML(code, true);
  renderResultExtras(code);

  // Radar uses the person's OWN percentages
  currentRadarData = {
    axes: ['EI', 'SN', 'TF', 'JP'].map(d => {
      const w = r[d].winner;
      return { name: letterName(d, w), pct: w === r[d].first ? r[d].firstPct : r[d].secondPct };
    })
  };

  switchView('result');
  setTimeout(() => renderRadarChart(currentRadarData), 50);
}

/* ---------- artwork, tagline, characters, quote ---------- */
function characterChipsHTML(code, withAvatar) {
  const P = GROUP_PALETTES[groupOf(code)];
  return (CHARACTERS[code] || []).map(([name, from]) => `
    <div class="flex items-center gap-2.5 px-3 py-2 rounded-2xl glass-card">
      ${withAvatar ? `<span class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style="background:linear-gradient(135deg,${P.a},${P.glow})">${name.charAt(0)}</span>` : ''}
      <div class="leading-tight">
        <p class="text-sm font-bold text-white">${name}</p>
        <p class="text-[11px] text-slate-400">${from}</p>
      </div>
    </div>`).join('');
}

function renderResultExtras(code) {
  const art = document.getElementById('resultArt');
  if (art) art.src = artDataURI(code);
  document.getElementById('resultTagline').textContent = TYPE_TAGLINES[code] || '';
  document.getElementById('resultCharacters').innerHTML = characterChipsHTML(code, true);
  const qs = TYPE_QUOTES[code] || [];
  document.getElementById('resultQuote').textContent = qs.length ? `"${qs[Math.floor(Math.random() * qs.length)]}"` : '';
}

/* ---------- deep profile (strengths, careers, love...) ---------- */
function profileSectionsHTML(code, twoColumns) {
  const p = (typeof PROFILES !== 'undefined') ? PROFILES[code] : null;
  if (!p) return '';
  const list = (items, icon) => `<ul class="space-y-1.5 text-sm text-slate-300">${items
    .map(i => `<li class="flex items-start gap-2"><span>${icon}</span><span>${i}</span></li>`).join('')}</ul>`;
  const chips = items => `<div class="flex flex-wrap gap-2">${items
    .map(c => `<span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">${c}</span>`).join('')}</div>`;
  const para = t => `<p class="text-sm text-slate-300 leading-relaxed">${t}</p>`;
  const block = (title, body) => `<div class="space-y-2"><h4 class="text-xs font-bold uppercase tracking-widest text-slate-400">${title}</h4>${body}</div>`;

  return `
    <div class="grid grid-cols-1 ${twoColumns ? 'md:grid-cols-2' : ''} gap-6">
      ${block('💪 Strengths', list(p.strengths, '✓'))}
      ${block('🌱 Blind spots', list(p.blindspots, '•'))}
      ${block('💼 Career matches', chips(p.careers))}
      ${block('💞 Love & relationships', para(p.love))}
      ${block('🤝 As a friend', para(p.friends))}
      ${block('⛈️ Under stress', para(p.stress))}
    </div>
    <div class="mt-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
      <h4 class="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1">🌟 Growth tip</h4>
      ${para(p.growth)}
    </div>`;
}

/* ---------- SHARING (real result links) ---------- */
function buildShareUrl() {
  const base = window.location.href.split('#')[0].split('?')[0];
  let url = `${base}?r=${encodeURIComponent(currentResultCode)}`;
  if (currentResultBars) url += `&b=${currentResultBars.join(',')}`;
  return url;
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) { /* fall through to legacy copy */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}

async function shareResult() {
  if (!currentResultCode) { showToast('Take the quiz first to get a result to share.'); return; }
  const url = buildShareUrl();
  const text = `I got ${currentResultCode} — ${currentResultPersona.name}! What are you?`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'AURA.lab', text, url });
      bumpStat('shares');
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return; // user closed the share sheet
    }
  }
  const ok = await copyText(url);
  if (ok) bumpStat('shares');
  showToast(ok ? 'Result link copied. Send it to a friend!' : url);
}

/* Opening a shared link (?r=INTJ-A&b=15,20,85,80,72) shows that result */
function loadSharedResult() {
  const params = new URLSearchParams(window.location.search);
  const m = (params.get('r') || '').toUpperCase().match(/^([EI])([SN])([TF])([JP])(?:-([AT]))?$/);
  if (!m) return false;
  const code = m[1] + m[2] + m[3] + m[4];
  const persona = PERSONAS[code];
  if (!persona) return false;
  const suffix = m[5] || '';

  const letters = { EI: m[1], SN: m[2], TF: m[3], JP: m[4], AT: suffix };
  const dims = ['EI', 'SN', 'TF', 'JP'].concat(suffix ? ['AT'] : []);

  let bars = (params.get('b') || '').split(',').map(Number);
  const barsValid = bars.length === dims.length && bars.every(n => Number.isFinite(n) && n >= 0 && n <= 100);

  const r = {};
  dims.forEach((d, i) => {
    const [first, second] = DIM_LETTERS[d];
    const winner = letters[d];
    let fp;
    if (barsValid) fp = Math.round(bars[i]);
    else if (d === 'AT') fp = winner === first ? 70 : 30;
    else fp = persona.scores[first];
    // keep the bar consistent with the letter in the link
    if (winner === first && fp < 50) fp = 100 - fp;
    if (winner === second && fp > 50) fp = 100 - fp;
    r[d] = { first, second, firstPct: fp, secondPct: 100 - fp, winner, answered: 1 };
  });

  showResultScreen(code, suffix, r, 'Shared result', true);
  return true;
}

document.getElementById('shareResultBtn').addEventListener('click', shareResult);
document.getElementById('sharedTakeQuizBtn').addEventListener('click', () => {
  try { window.history.replaceState(null, '', window.location.href.split('?')[0]); } catch (e) { /* ignore */ }
  showModeSelect();
});

/* ---------- mobile bottom nav ---------- */
document.querySelectorAll('.mnav-btn').forEach(btn => {
  btn.addEventListener('click', () => document.getElementById(btn.dataset.target).click());
});

function renderBreakdown(r, hasAT) {
  const dimsToShow = hasAT ? ['EI', 'SN', 'TF', 'JP', 'AT'] : ['EI', 'SN', 'TF', 'JP'];
  const wrap = document.getElementById('resultBars');
  wrap.innerHTML = dimsToShow.map(d => {
    const x = r[d];
    const firstWins = x.winner === x.first;
    const balanced = x.firstPct === 50;
    const cls = (win, color) => win ? `font-extrabold ${color}` : 'font-semibold text-slate-400';
    return `
      <div>
        <div class="flex justify-between text-xs mb-1.5">
          <span class="${cls(firstWins, 'text-indigo-400')}">${letterName(d, x.first)} ${x.firstPct}%</span>
          ${balanced ? '<span class="text-[10px] uppercase tracking-widest text-slate-400">balanced</span>' : ''}
          <span class="${cls(!firstWins, 'text-pink-400')}">${x.secondPct}% ${letterName(d, x.second)}</span>
        </div>
        <div class="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div class="breakdown-fill h-full bg-gradient-to-r from-indigo-500 to-purple-500" style="width:0%;transition:width .9s ease" data-w="${x.firstPct}"></div>
          <div class="h-full flex-1 bg-gradient-to-r from-pink-500 to-rose-500"></div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('resultBreakdownNote').textContent = hasAT ? '' :
    'This mode skips the Assertive / Turbulent suffix. Try Standard or Deep Dive for the full 5-part result.';

  setTimeout(() => {
    wrap.querySelectorAll('.breakdown-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
  }, 120);
}

/* ---------- radar chart (draws the person's own percentages, sharp on any screen) ---------- */
function renderRadarChart(data) {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas || !data) return;

  const SIZE = 300;                                            // design units
  const cssSize = canvas.getBoundingClientRect().width || SIZE;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const px = Math.round(cssSize * dpr);
  if (canvas.width !== px) { canvas.width = px; canvas.height = px; }

  const ctx = canvas.getContext('2d');
  ctx.setTransform(px / SIZE, 0, 0, px / SIZE, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);

  const centerX = SIZE / 2;
  const centerY = SIZE / 2;
  const radius = 88;
  const isLight = document.body.classList.contains('light');
  const numAxes = data.axes.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Grid rings (25 / 50 / 75 / 100 %)
  ctx.strokeStyle = isLight ? "rgba(15,23,42,0.18)" : "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius * i) / 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Axes + two-line labels
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    ctx.stroke();

    const lx = centerX + Math.cos(angle) * (radius + 28);
    const ly = centerY + Math.sin(angle) * (radius + 24);
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isLight ? "#475569" : "#94a3b8";
    ctx.fillText(data.axes[i].name, lx, ly - 7);
    ctx.font = "bold 12px 'Space Grotesk', sans-serif";
    ctx.fillStyle = isLight ? "#4f46e5" : "#a5b4fc";
    ctx.fillText(data.axes[i].pct + "%", lx, ly + 7);
  }

  // Data polygon
  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const valRadius = (data.axes[i].pct / 100) * radius;
    const x = centerX + Math.cos(angle) * valRadius;
    const y = centerY + Math.sin(angle) * valRadius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(99, 102, 241, 0.35)";
  ctx.fill();
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 3;
  ctx.stroke();
}

// redraw crisply if the window is resized or rotated
let radarResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(radarResizeTimer);
  radarResizeTimer = setTimeout(() => {
    if (currentRadarData && !views.result.classList.contains('hidden')) renderRadarChart(currentRadarData);
  }, 150);
});

/* ==========================================================================
   PERSONAS GALLERY & MODAL ENGINE
   ========================================================================== */
function renderGallery(filterGroup = 'all') {
  const grid = document.getElementById('personasGrid');
  grid.innerHTML = '';

  Object.values(PERSONAS).forEach(p => {
    if (filterGroup !== 'all' && p.group !== filterGroup) return;

    const card = document.createElement('div');
    const prof = (typeof PROFILES !== 'undefined') ? PROFILES[p.code] : null;
    card.className = 'glass-card rounded-2xl cursor-pointer hover:scale-[1.02] hover:border-brand-500/50 transition-all overflow-hidden flex flex-col';
    card.innerHTML = `
      <div class="relative">
        <img src="${artDataURI(p.code)}" alt="" loading="lazy" class="w-full aspect-[4/3] object-cover">
        <span class="persona-badge absolute top-2 right-2">${p.group}</span>
      </div>
      <div class="p-4 space-y-3 flex-1 flex flex-col">
        <div>
          <h3 class="font-display font-bold text-lg text-white">${p.code}</h3>
          <p class="text-xs font-semibold text-brand-500">${p.name}</p>
        </div>
        <p class="text-xs italic text-slate-300">${(typeof TYPE_TAGLINES !== 'undefined' && TYPE_TAGLINES[p.code]) || p.summary}</p>
        ${prof ? `<ul class="space-y-1 text-xs text-slate-400">${prof.strengths.slice(0, 2).map(s => `<li class="flex gap-1.5"><span class="text-emerald-400">✓</span><span>${s}</span></li>`).join('')}</ul>
        <div class="flex flex-wrap gap-1.5">${prof.careers.slice(0, 2).map(c => `<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">${c}</span>`).join('')}</div>` : ''}
        <p class="text-xs font-bold text-indigo-400 mt-auto pt-1">View deep profile →</p>
      </div>
    `;
    card.addEventListener('click', () => openPersonaModal(p));
    grid.appendChild(card);
  });
}

// Gallery Filter Tabs
document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.gallery-filter-btn').forEach(b => {
      b.classList.remove('bg-brand-600', 'text-white');
      b.classList.add('bg-slate-800', 'text-slate-400');
    });
    e.target.classList.remove('bg-slate-800', 'text-slate-400');
    e.target.classList.add('bg-brand-600', 'text-white');

    renderGallery(e.target.dataset.filter);
  });
});

/* ---------- popups: Back button / Esc / outside-tap close them ---------- */
const OVERLAY_IDS = ['personaModal', 'cardModal'];
function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el.classList.contains('hidden')) return;
  el.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  history.pushState({ overlay: id }, '');
}
function closeOverlay(id) {
  const el = document.getElementById(id);
  if (el.classList.contains('hidden')) return;
  el.classList.add('hidden');
  document.body.style.overflow = '';
  if (history.state && history.state.overlay === id) history.back();
}
window.addEventListener('popstate', () => {
  OVERLAY_IDS.forEach(id => document.getElementById(id).classList.add('hidden'));
  document.body.style.overflow = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') OVERLAY_IDS.forEach(closeOverlay);
});

function openPersonaModal(p) {
  trackTypeSeen(p.code);
  const modal = document.getElementById('personaModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <img src="${artDataURI(p.code)}" alt="" class="w-44 h-44 mx-auto rounded-2xl shadow-xl">
    <div class="flex items-center gap-4">
      <div class="text-5xl p-3 bg-slate-800 rounded-2xl border border-slate-700">${p.emoji}</div>
      <div>
        <h2 class="font-display text-3xl font-extrabold text-white">${p.code} - ${p.name}</h2>
        <span class="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 mt-1">${p.group}</span>
      </div>
    </div>

    <p class="text-slate-300 text-sm leading-relaxed">${p.summary}</p>

    <div class="space-y-2">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Classic Quirks & Traits</h4>
      <ul class="space-y-2 text-sm text-slate-300">
        ${p.quirks.map(q => `<li class="flex items-start gap-2"><span>⚡</span><span>${q}</span></li>`).join('')}
      </ul>
    </div>

    <div class="space-y-2 pt-2">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Famous Counterparts <span class="normal-case tracking-normal font-medium opacity-70">(fan-typed, just for fun)</span></h4>
      <div class="flex flex-wrap gap-2 text-xs font-semibold text-purple-300">
        ${p.famous.map(f => `<span class="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">${f}</span>`).join('')}
      </div>
    </div>

    <div class="space-y-2 pt-2">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">You vibe with <span class="normal-case tracking-normal font-medium opacity-70">(fan-typed)</span></h4>
      <div class="flex flex-wrap gap-2">${characterChipsHTML(p.code, false)}</div>
    </div>

    <div class="pt-5 border-t border-slate-700/50">${profileSectionsHTML(p.code, true)}</div>
  `;

  openOverlay('personaModal');
  const sc = document.getElementById('modalScroll') || {};   // reset AFTER it is visible, otherwise the browser ignores it
  sc.scrollTop = 0;
  requestAnimationFrame(() => { sc.scrollTop = 0; });
}

document.getElementById('closeModalBtn').addEventListener('click', () => closeOverlay('personaModal'));
document.getElementById('personaModal').addEventListener('click', e => {
  if (e.target.id === 'personaModal') closeOverlay('personaModal');
});

/* ==========================================================================
   COMPARISON & SYNERGY ENGINE
   ========================================================================== */
let compareReady = false;
const COMPARE_KEY = 'aura_compare';

function initCompareView() {
  const selA = document.getElementById('compareSelectA');
  const selB = document.getElementById('compareSelectB');

  // build the menus and listeners only ONCE, so opening the tab again never resets your picks
  if (!compareReady) {
    compareReady = true;
    const options = Object.values(PERSONAS).map(p => `<option value="${p.code}">${p.code} - ${p.name}</option>`).join('');
    selA.innerHTML = options;
    selB.innerHTML = options;

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(COMPARE_KEY) || '{}'); } catch (e) { saved = {}; }
    const mine = (typeof lastResultBaseCode === 'function') ? lastResultBaseCode() : '';
    selA.value = PERSONAS[saved.a] ? saved.a : (PERSONAS[mine] ? mine : 'INTJ');
    selB.value = PERSONAS[saved.b] ? saved.b : (selA.value === 'ENFP' ? 'INTJ' : 'ENFP');

    const onChange = () => {
      try { localStorage.setItem(COMPARE_KEY, JSON.stringify({ a: selA.value, b: selB.value })); } catch (e) { /* storage unavailable */ }
      updateCompare();
      bumpStat('compares');
    };
    selA.addEventListener('change', onChange);
    selB.addEventListener('change', onChange);
  }
  updateCompare();
}

/* Types that are said to click best (kept here so this file works on its own) */
const SYNERGY_PAIRS = {
  INTJ: ["ENFP", "ENTP"], INTP: ["ENTJ", "ESTJ"], ENTJ: ["INTP", "INFP"], ENTP: ["INFJ", "INTJ"],
  INFJ: ["ENTP", "ENFP"], INFP: ["ENFJ", "ENTJ"], ENFJ: ["INFP", "ISFP"], ENFP: ["INTJ", "INFJ"],
  ISTJ: ["ESFP", "ESTP"], ISFJ: ["ESFP", "ESTP"], ESTJ: ["INTP", "ISTP"], ESFJ: ["ISFP", "ISTP"],
  ISTP: ["ESFJ", "ESTJ"], ISFP: ["ENFJ", "ESFJ"], ESTP: ["ISFJ", "ISTJ"], ESFP: ["ISTJ", "ISFJ"]
};

/* Fun synergy report. The same pair always gets the same result (A+B = B+A). */
function buildSynergy(pA, pB) {
  const A = pA.code, B = pB.code;
  const same = i => A[i] === B[i];
  const rng = seededRng(hashStr('synergy|' + [A, B].sort().join('+')));
  const jitter = () => Math.floor(rng() * 7) - 3;
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const clamp = n => Math.max(35, Math.min(99, Math.round(n)));
  const golden = (SYNERGY_PAIRS[A] || []).includes(B) || (SYNERGY_PAIRS[B] || []).includes(A);
  const g = golden ? 8 : 0;
  const fCount = (A[2] === 'F' ? 1 : 0) + (B[2] === 'F' ? 1 : 0);

  const comm  = clamp(50 + (same(1) ? 24 : 6) + (same(2) ? 12 : 8) + g + jitter());
  const team  = clamp(52 + (same(3) ? 14 : 18) + (same(2) ? 10 : 6) + g + jitter());
  const fun   = clamp(50 + (A[0] === 'E' && B[0] === 'E' ? 26 : (!same(0) ? 18 : 10)) + (A[3] === 'P' || B[3] === 'P' ? 12 : 4) + g + jitter());
  const heart = clamp(46 + fCount * 12 + (same(1) ? 8 : 4) + g + jitter());
  const score = clamp((comm + team + fun + heart) / 4 + (golden ? 5 : 0));

  const tier = score >= 90 ? { icon: '💞', name: 'Soulmate Sync' }
    : score >= 80 ? { icon: '🚀', name: 'Dream Team' }
    : score >= 70 ? { icon: '✨', name: 'Great Chemistry' }
    : score >= 60 ? { icon: '🌶️', name: 'Spicy Mix' }
    : { icon: '🎭', name: 'Plot-Twist Duo' };

  const power = A === B
    ? 'You are basically mirrors. Instant understanding, zero explaining.'
    : same(1)
      ? (A[1] === 'N' ? 'You two can invent entire universes in one conversation.' : 'You two turn plans into results with no drama and no wasted steps.')
      : 'One of you dreams it up, the other makes it real. Scary good combination.';

  const frictions = [];
  if (!same(0)) frictions.push('One wants a night out, the other wants a night in. Settle it with snacks.');
  if (!same(1)) frictions.push('One explains with facts, the other with big ideas. Both are right.');
  if (!same(2)) frictions.push('One says the blunt truth, the other asks how it feels. Translate for each other.');
  if (!same(3)) frictions.push('One has a schedule, the other has vibes. Meet in the middle.');
  if (!frictions.length) frictions.push('You might both dodge the same hard thing. Take turns being the brave one.');
  const friction = pick(frictions);

  const dates = [
    'Cook a new recipe together and rate it like judges.',
    'Pick a random bus, ride it, and explore wherever it ends.',
    'Build something together: a playlist, a fort, a tiny app.',
    'Do a 2-hour board game night with a snack budget.',
    'Take a sunset walk where the only rule is no phones.',
    'Debate a silly topic, like whether a hot dog is a sandwich.',
    'Do a mini road trip with a mystery destination.',
    'Visit a bookstore and pick a book for each other.'
  ];
  const date = pick(dates);

  const TQ = (typeof TYPE_QUOTES !== 'undefined') ? TYPE_QUOTES : {};
  const CH = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : {};
  const qa = TQ[A], qb = TQ[B];
  const quoteA = qa ? pick(qa) : '';
  const quoteB = qb ? pick(qb) : '';
  const ca = CH[A] && CH[A][0] ? CH[A][0][0] : pA.name;
  const cb = CH[B] && CH[B][0] ? CH[B][0][0] : pB.name;

  return { golden, score, tier, power, friction, date, quoteA, quoteB, ca, cb,
    bars: [['💬 Communication', comm], ['🤝 Teamwork', team], ['🎉 Fun', fun], ['💖 Heart', heart]] };
}

function updateCompare() {
  const codeA = document.getElementById('compareSelectA').value;
  const codeB = document.getElementById('compareSelectB').value;

  const pA = PERSONAS[codeA];
  const pB = PERSONAS[codeB];
  if (!pA || !pB) return;

  document.getElementById('compareDetailsA').innerHTML = `
    <div class="text-3xl mb-1">${pA.emoji}</div>
    <p class="font-bold text-white">${pA.name}</p>
    <p class="text-xs text-slate-400">${pA.summary}</p>
  `;
  document.getElementById('compareDetailsB').innerHTML = `
    <div class="text-3xl mb-1">${pB.emoji}</div>
    <p class="font-bold text-white">${pB.name}</p>
    <p class="text-xs text-slate-400">${pB.summary}</p>
  `;

  const r = buildSynergy(pA, pB);
  document.getElementById('synergyReportText').innerHTML = `
    <div class="syn">
      <div class="syn-head">
        <div class="syn-emoji">${pA.emoji} + ${pB.emoji}</div>
        <div class="syn-score">${r.score}%</div>
        <div class="syn-tier">${r.tier.icon} ${r.tier.name}</div>
        <div class="syn-sub">${pA.code} + ${pB.code}${r.golden ? ' · ⭐ Famous power pair' : ''}</div>
      </div>

      <div class="syn-bars">
        ${r.bars.map(b => `
          <div>
            <div class="syn-bar-top"><span>${b[0]}</span><span>${b[1]}%</span></div>
            <div class="syn-track"><div class="syn-fill" style="width:${b[1]}%"></div></div>
          </div>`).join('')}
      </div>

      <div class="syn-cards">
        <div class="syn-card syn-green">
          <div class="syn-label">🦸 Superpower together</div>
          <div class="syn-text">${r.power}</div>
        </div>
        <div class="syn-card syn-amber">
          <div class="syn-label">⚠️ Watch out</div>
          <div class="syn-text">${r.friction}</div>
        </div>
        <div class="syn-card syn-indigo">
          <div class="syn-label">🎟️ Hangout idea</div>
          <div class="syn-text">${r.date}</div>
        </div>
      </div>

      <div class="syn-chat">
        <div class="syn-chat-title">💬 If they texted each other</div>
        <div class="syn-line"><strong>${pA.emoji} ${pA.code}:</strong> "${r.quoteA}"</div>
        <div class="syn-line"><strong>${pB.emoji} ${pB.code}:</strong> "${r.quoteB}"</div>
      </div>

      <div class="syn-movie">🎬 Movie version: <strong>${r.ca}</strong> + <strong>${r.cb}</strong>.</div>
      <div class="syn-foot">Just for fun. Any two types can get along great.</div>
    </div>
  `;
}

/* ==========================================================================
   STORAGE & HISTORY MANAGEMENT
   ========================================================================== */
function readHistory() {
  try {
    const h = JSON.parse(localStorage.getItem('aura_mbti_history') || '[]');
    return Array.isArray(h) ? h : [];
  } catch (e) { return []; }
}
function saveToHistory(persona, fullCode) {
  let history = readHistory();
  history.unshift({
    code: fullCode || persona.code,
    name: persona.name,
    emoji: persona.emoji,
    date: new Date().toLocaleDateString()
  });
  try { localStorage.setItem('aura_mbti_history', JSON.stringify(history.slice(0, 10))); } catch (e) { /* storage unavailable */ }
}

function renderHistoryList() {
  const container = document.getElementById('historyListContainer');
  let history = readHistory();

  if (history.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-sm py-8">No past quiz results found.</p>`;
    return;
  }

  container.innerHTML = history.map(item => `
    <div class="glass-card p-4 rounded-2xl flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-2xl">${item.emoji}</span>
        <div>
          <h4 class="font-display font-bold text-white text-base">${item.code} - ${item.name}</h4>
          <span class="text-xs text-slate-400">${item.date}</span>
        </div>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300">Diagnosed</span>
    </div>
  `).join('');
}

document.getElementById('clearHistoryBtn').addEventListener('click', () => {
  try { localStorage.removeItem('aura_mbti_history'); } catch (e) { /* ignore */ }
  renderHistoryList();
  showToast('History cleared.');
});

/* UTILITY TOAST & SHARE HANDLERS */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  document.getElementById('toastMessage').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}


document.getElementById('randomFactBtn').addEventListener('click', () => {
  const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
  showToast(fact);
});

/* THEME TOGGLE ENGINE (the saved theme is also applied by a tiny script in <head>, so there is no flicker) */
function applyTheme(light) {
  document.body.classList.toggle('light', light);
  const el = document.documentElement;
  el.classList.toggle('light', light);
  el.style.backgroundColor = light ? '#f1f5f9' : '#020617';
  el.style.colorScheme = light ? 'light' : 'dark';
  document.getElementById('themeIcon').textContent = light ? '☀️' : '🌙';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', light ? '#f1f5f9' : '#020617');
}

document.getElementById('themeToggleBtn').addEventListener('click', () => {
  const isLight = !document.body.classList.contains('light');
  applyTheme(isLight);
  try { localStorage.setItem('aura_theme', isLight ? 'light' : 'dark'); } catch (e) {}
  bumpStat('themeSwitches');
  if (currentRadarData && !views.result.classList.contains('hidden')) {
    renderRadarChart(currentRadarData);
  }
});

let initialLight = window.__light;
if (initialLight === undefined) {
  initialLight = true;   // day mode is the default
  try { const t = localStorage.getItem('aura_theme'); if (t) initialLight = (t === 'light'); } catch (e) {}
}
applyTheme(!!initialLight);

/* DOWNLOAD BADGE IMAGE GENERATOR VIA HTML CANVAS */
/* ==========================================================================
   SHAREABLE RESULT CARD  (Story 1080x1920 and Post 1080x1350)
   ========================================================================== */
const CARD_FORMATS = { story: { w: 1080, h: 1920 }, post: { w: 1080, h: 1350 } };
let cardFormat = 'story';
let cardCanvas = null;

const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

function wrapLines(ctx, text, maxWidth) {
  const lines = []; let line = '';
  text.split(' ').forEach(w => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxWidth && line) { lines.push(line); line = w; } else line = t;
  });
  if (line) lines.push(line);
  return lines;
}
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
/* shrink a font until the text fits the width */
function fitFont(ctx, text, maxW, size, minSize, style, family) {
  while (size > minSize) {
    ctx.font = `${style} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxW) break;
    size -= 2;
  }
  ctx.font = `${style} ${size}px ${family}`;
  return size;
}
function sparkleField(ctx, W, H, seed, color) {
  const rng = seededRng(hashStr(seed));
  for (let i = 0; i < 60; i++) {
    const x = rng() * W, y = rng() * H, r = 1 + rng() * 3.2;
    ctx.fillStyle = rgba(color, 0.12 + rng() * 0.45);
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
}

const CARD_SANS = "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif";
const CARD_DISPLAY = "'Space Grotesk', 'Segoe UI', Arial, sans-serif";

function buildResultCard(format) {
  return new Promise(resolve => {
    const { w: W, h: H } = CARD_FORMATS[format] || CARD_FORMATS.story;
    const story = format !== 'post';
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    const base = currentResultPersona.code;
    const P = GROUP_PALETTES[groupOf(base)];
    const info = (typeof TYPE_POWERS !== 'undefined' && TYPE_POWERS[base]) || { power: currentResultPersona.group, motto: currentResultPersona.summary };
    const prof = (typeof PROFILES !== 'undefined') ? PROFILES[base] : null;

    // sizes for each format (everything below the picture is placed one block after another)
    const S = story
      ? { artSize: 500, artY: 140, code: 150, name: 58, motto: 38, mottoGap: 52, pillH: 66, barGap: 50, rr: 56 }
      : { artSize: 400, artY: 116, code: 124, name: 50, motto: 34, mottoGap: 46, pillH: 60, barGap: 44, rr: 44 };

    // ---------- background ----------
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, P.bg1); bg.addColorStop(1, P.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    const cyArt = S.artY + S.artSize / 2;
    const g1 = ctx.createRadialGradient(W / 2, cyArt, 30, W / 2, cyArt, 720);
    g1.addColorStop(0, rgba(P.glow, 0.40)); g1.addColorStop(1, rgba(P.glow, 0));
    ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
    const g2 = ctx.createRadialGradient(W / 2, H, 20, W / 2, H, 640);
    g2.addColorStop(0, rgba(P.a, 0.35)); g2.addColorStop(1, rgba(P.a, 0));
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
    sparkleField(ctx, W, H, base + format, P.b);

    // ---------- header ----------
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${story ? 44 : 38}px ${CARD_DISPLAY}`;
    ctx.fillText('AURA.lab', W / 2, story ? 92 : 76);

    const drawRest = () => {
      let y = S.artY + S.artSize + (story ? 76 : 66);

      // YOU ARE
      ctx.fillStyle = rgba('#ffffff', 0.62);
      ctx.font = `700 ${story ? 28 : 25}px ${CARD_SANS}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = '8px';
      ctx.fillText('YOU ARE', W / 2 + 4, y);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

      // code
      y += S.code * 0.9;
      ctx.save();
      ctx.shadowColor = rgba(P.glow, 0.8); ctx.shadowBlur = 40;
      ctx.fillStyle = '#ffffff';
      fitFont(ctx, currentResultCode, 940, S.code, 90, 'bold', CARD_DISPLAY);
      ctx.fillText(currentResultCode, W / 2, y);
      ctx.restore();

      // name
      y += S.name + 8;
      ctx.fillStyle = P.b;
      ctx.font = `bold ${S.name}px ${CARD_SANS}`;
      ctx.fillText(currentResultPersona.name, W / 2, y);

      // motto (1 or 2 lines)
      y += S.motto + 36;
      ctx.fillStyle = rgba('#ffffff', 0.92);
      ctx.font = `italic 600 ${S.motto}px ${CARD_SANS}`;
      const mottoLines = wrapLines(ctx, '"' + info.motto + '"', 880).slice(0, 2);
      mottoLines.forEach((l, i) => ctx.fillText(l, W / 2, y + i * S.mottoGap));
      y += (mottoLines.length - 1) * S.mottoGap;

      // superpower pill
      y += 34 + S.pillH / 2;
      const pillText = `SUPERPOWER  ·  ${info.power}`;
      ctx.font = `800 ${story ? 30 : 26}px ${CARD_SANS}`;
      const pw = Math.min(980, ctx.measureText(pillText).width + 84);
      roundRectPath(ctx, W / 2 - pw / 2, y - S.pillH / 2, pw, S.pillH, S.pillH / 2);
      ctx.fillStyle = rgba(P.a, 0.6); ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = rgba(P.b, 0.85); ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(pillText, W / 2, y + (story ? 10 : 9));
      y += S.pillH / 2;

      if (story && prof) {
        // three strengths
        y += 60;
        ctx.textAlign = 'left';
        prof.strengths.slice(0, 3).forEach((s, i) => {
          const sy = y + i * 44;
          ctx.beginPath(); ctx.arc(150, sy - 9, 16, 0, Math.PI * 2);
          ctx.fillStyle = P.a; ctx.fill();
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
          ctx.beginPath(); ctx.moveTo(142, sy - 9); ctx.lineTo(148, sy - 3); ctx.lineTo(159, sy - 16); ctx.stroke();
          ctx.fillStyle = rgba('#ffffff', 0.94);
          fitFont(ctx, s, 780, 30, 22, '600', CARD_SANS);
          ctx.fillText(s, 186, sy);
        });
        ctx.textAlign = 'center';
        y += 2 * 44;

        // career chips
        y += 70;
        ctx.fillStyle = rgba('#ffffff', 0.5);
        ctx.font = `700 22px ${CARD_SANS}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '6px';
        ctx.fillText('BEST FIT CAREERS', W / 2 + 3, y);
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
        ctx.font = `700 26px ${CARD_SANS}`;
        const chips = prof.careers.slice(0, 3).map(c => ({ c, w: ctx.measureText(c).width + 44 }));
        while (chips.reduce((a, b) => a + b.w, 0) + (chips.length - 1) * 14 > 960 && chips.length > 1) chips.pop();
        let x = (W - (chips.reduce((a, b) => a + b.w, 0) + (chips.length - 1) * 14)) / 2;
        chips.forEach(ch => {
          roundRectPath(ctx, x, y + 18, ch.w, 48, 24);
          ctx.fillStyle = rgba(P.b, 0.16); ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = rgba(P.b, 0.6); ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(ch.c, x + ch.w / 2, y + 51);
          x += ch.w + 14;
        });
        y += 66;
      }

      // percentage bars
      y += story ? 64 : 62;
      const dims = ['EI', 'SN', 'TF', 'JP'].concat(currentResultCode.includes('-') ? ['AT'] : []);
      const letters = currentResultCode.replace('-', '');
      dims.forEach((d, i) => {
        const [first] = DIM_LETTERS[d];
        const fp = (currentResultBars || [])[i] ?? 50;
        const winner = letters[i];
        const wp = winner === first ? fp : 100 - fp;
        const by = y + i * S.barGap;
        ctx.textAlign = 'left';
        ctx.fillStyle = rgba('#ffffff', 0.92);
        ctx.font = `700 ${story ? 26 : 24}px ${CARD_SANS}`;
        ctx.fillText(letterName(d, winner), 90, by);
        ctx.textAlign = 'right';
        ctx.fillText(wp + '%', W - 90, by);
        roundRectPath(ctx, 90, by + 10, W - 180, 14, 7);
        ctx.fillStyle = rgba('#ffffff', 0.14); ctx.fill();
        const bar = ctx.createLinearGradient(90, 0, W - 90, 0);
        bar.addColorStop(0, P.a); bar.addColorStop(1, P.b);
        roundRectPath(ctx, 90, by + 10, Math.max(14, (W - 180) * wp / 100), 14, 7);
        ctx.fillStyle = bar; ctx.fill();
      });

      // footer / call to action (pinned to the bottom)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = `800 ${story ? 36 : 32}px ${CARD_SANS}`;
      ctx.fillText("What's your type?", W / 2, H - (story ? 128 : 64));
      ctx.fillStyle = P.b;
      ctx.font = `700 ${story ? 28 : 25}px ${CARD_SANS}`;
      const host = /^https?:$/.test(window.location.protocol) ? window.location.host : 'AURA.lab';
      ctx.fillText(`Take the quiz  ·  ${host}`, W / 2, H - (story ? 78 : 26));
      resolve(canvas);
    };

    // ---------- illustration in a glowing frame ----------
    const img = new Image();
    img.onload = () => {
      const as = S.artSize, ax = (W - as) / 2, ay = S.artY, rr = S.rr;
      ctx.save();
      ctx.shadowColor = rgba(P.glow, 0.85); ctx.shadowBlur = 70;
      roundRectPath(ctx, ax, ay, as, as, rr);
      ctx.fillStyle = P.bg2; ctx.fill();
      ctx.restore();
      ctx.save();
      roundRectPath(ctx, ax, ay, as, as, rr);
      ctx.clip();
      ctx.drawImage(img, ax, ay, as, as);
      ctx.restore();
      ctx.lineWidth = 4; ctx.strokeStyle = rgba(P.b, 0.7);
      roundRectPath(ctx, ax, ay, as, as, rr);
      ctx.stroke();
      drawRest();
    };
    img.onerror = drawRest;
    img.src = artDataURI(base);
  });
}

/* ---------- card popup: preview, formats, download, share ---------- */
async function renderCardPreview() {
  const preview = document.getElementById('cardPreview');
  preview.style.opacity = '0.35';
  cardCanvas = await buildResultCard(cardFormat);
  preview.src = cardCanvas.toDataURL('image/png');
  preview.style.opacity = '1';
  document.querySelectorAll('.card-fmt-btn').forEach(b => b.classList.toggle('active', b.dataset.fmt === cardFormat));
}
async function openCardModal() {
  if (!currentResultPersona) return;
  openOverlay('cardModal');
  await renderCardPreview();
  let canShareFiles = false;
  try { canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'a.png', { type: 'image/png' })] })); } catch (e) { /* ignore */ }
  document.getElementById('cardShareBtn').classList.toggle('hidden', !canShareFiles);
}
function cardBlob() { return new Promise(res => cardCanvas.toBlob(res, 'image/png')); }
function cardCaption() {
  const m = (typeof TYPE_POWERS !== 'undefined' && TYPE_POWERS[currentResultPersona.code]) ? TYPE_POWERS[currentResultPersona.code].motto : '';
  return `I'm ${currentResultCode}, ${currentResultPersona.name}! ${m} What are you?`;
}
async function downloadCard() {
  if (!cardCanvas) return;
  const blob = await cardBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${currentResultCode}-AURA-${cardFormat}.png`;
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  bumpStat('cards');
  showToast('Card saved. Go post it!');
}
async function shareCardFile() {
  if (!cardCanvas) return;
  const blob = await cardBlob();
  const file = new File([blob], `${currentResultCode}-AURA-${cardFormat}.png`, { type: 'image/png' });
  try {
    await navigator.share({ files: [file], text: `${cardCaption()} ${buildShareUrl()}` });
    bumpStat('shares'); bumpStat('cards');
  } catch (e) {
    if (!e || e.name !== 'AbortError') downloadCard();
  }
}

document.getElementById('downloadBadgeBtn').addEventListener('click', openCardModal);
document.getElementById('closeCardModalBtn').addEventListener('click', () => closeOverlay('cardModal'));
document.getElementById('cardModal').addEventListener('click', e => { if (e.target.id === 'cardModal') closeOverlay('cardModal'); });
document.querySelectorAll('.card-fmt-btn').forEach(b => b.addEventListener('click', () => { cardFormat = b.dataset.fmt; renderCardPreview(); }));
document.getElementById('cardDownloadBtn').addEventListener('click', downloadCard);
document.getElementById('cardShareBtn').addEventListener('click', shareCardFile);
document.getElementById('cardCopyBtn').addEventListener('click', async () => {
  const ok = await copyText(`${cardCaption()} ${buildShareUrl()}`);
  if (ok) bumpStat('shares');
  showToast(ok ? 'Caption + link copied. Paste it with your card!' : buildShareUrl());
});

/* Show an 'unfinished quiz' banner on first load if one exists */
renderResumeBanners();

/* If the page was opened from a shared link, show that result */
/* Remember which tab the visitor was on when they refresh (per browser tab) */
function restoreLastView() {
  let v = null;
  try { v = sessionStorage.getItem('aura_view'); } catch (e) {}
  if (v === 'gallery') renderGallery('all');
  else if (v === 'compare') initCompareView();
  else if (v === 'history') renderHistoryList();
  else if (v === 'mode') showModeSelect();
  else if (v !== 'play') return;   // hero, quiz, result: stay on home (quiz has its own Resume banner)
  switchView(v);
}
const openedShared = loadSharedResult();
if (!openedShared) restoreLastView();

/* ---------- start-up: streak/trophies + offline support ---------- */
initEngagement();
if ('serviceWorker' in navigator && /^https?:$/.test(window.location.protocol)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}


/* ---------- install-app button ---------- */
let deferredInstall = null;
const installBtn = document.getElementById('installBtn');
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
function showInstallBtn() { if (!installBtn) return; installBtn.classList.remove('hidden'); installBtn.classList.add('flex'); }
function hideInstallBtn() { if (!installBtn) return; installBtn.classList.add('hidden'); installBtn.classList.remove('flex'); }

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  if (!isStandalone) showInstallBtn();
});
window.addEventListener('appinstalled', hideInstallBtn);
if (isIOS && !isStandalone) showInstallBtn();   // iPhones have no install prompt, so we show a hint

if (installBtn) installBtn.addEventListener('click', async () => {
  if (deferredInstall) {
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    hideInstallBtn();
  } else if (isIOS) {
    showToast('Tap the Share icon, then "Add to Home Screen"');
  }
});


/* ---------- make sure the Leaderboard is on the Play tab (works even with an older index.html) ---------- */
(function ensureLeaderboard() {
  try {
    const play = document.getElementById('playView');
    if (play && !document.getElementById('lbList')) {
      const card = document.createElement('div');
      card.className = 'glass-card lb-card';
      card.innerHTML = '<div id="lbList"></div>';
      const trophies = document.getElementById('trophyGrid');
      const anchor = trophies && trophies.closest('.glass-card');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card, anchor);
      else play.appendChild(card);
    }
    if (!document.querySelector('script[src*="leaderboard.js"]')) {
      const sc = document.createElement('script');
      sc.src = 'leaderboard.js';
      document.body.appendChild(sc);
    }
  } catch (e) { console.error('Leaderboard setup error:', e); }
})();
