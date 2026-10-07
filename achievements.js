/* ==========================================================================
   STATS, DAILY STREAK, TROPHIES & CONFETTI
   Everything is stored in the visitor's own browser (localStorage).
   ========================================================================== */
const STATS_KEY = "aura_stats";

function freshStats() {
  return {
    quizzes: 0, deepDone: 0, fastQuick: 0,
    typesSeen: [], compares: 0, shares: 0, cards: 0,
    dailyDays: [], dailyType: "",
    streak: 0, bestStreak: 0, lastVisit: "",
    gamesPlayed: 0, perfectGames: 0, bestGame: 0,
    themeSwitches: 0, unlocked: {}
  };
}

function getStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
    return Object.assign(freshStats(), saved);
  } catch (e) { return freshStats(); }
}
function saveStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable */ }
}
function bumpStat(key, n = 1) {
  const s = getStats();
  s[key] = (s[key] || 0) + n;
  saveStats(s);
  checkAchievements();
}
function trackTypeSeen(code) {
  const s = getStats();
  if (!s.typesSeen.includes(code)) {
    s.typesSeen.push(code);
    saveStats(s);
    checkAchievements();
  }
}

/* ---------- the trophy list (add your own: id, icon, name, desc, test) ---------- */
const ACHIEVEMENTS = [
  { id: "first_quiz",   icon: "🌱", name: "First Steps",         desc: "Finish your first quiz",                          test: s => s.quizzes >= 1 },
  { id: "three_quizzes",icon: "🔁", name: "Self-Explorer",       desc: "Finish 3 quizzes",                                test: s => s.quizzes >= 3 },
  { id: "deep",         icon: "🧬", name: "Deep Diver",          desc: "Finish a Deep Dive quiz",                         test: s => s.deepDone >= 1 },
  { id: "speed",        icon: "⚡", name: "Speed Runner",        desc: "Finish a Quick Scan in under 60 seconds",         test: s => s.fastQuick >= 1 },
  { id: "curious",      icon: "👀", name: "Type Collector",      desc: "Open 8 different type profiles",                  test: s => s.typesSeen.length >= 8 },
  { id: "all16",        icon: "🎭", name: "Know Them All",       desc: "Open all 16 type profiles",                       test: s => s.typesSeen.length >= 16 },
  { id: "match",        icon: "⚖️", name: "Matchmaker",          desc: "Use the compare tool",                            test: s => s.compares >= 1 },
  { id: "sharer",       icon: "📣", name: "Spreading the Word",  desc: "Share a result",                                  test: s => s.shares >= 1 },
  { id: "card",         icon: "🖼️", name: "Poster Child",        desc: "Save your result card",                           test: s => s.cards >= 1 },
  { id: "daily3",       icon: "🔮", name: "Daily Ritual",        desc: "Check your forecast on 3 different days",         test: s => s.dailyDays.length >= 3 },
  { id: "streak3",      icon: "🔥", name: "On Fire",             desc: "Visit 3 days in a row",                           test: s => s.bestStreak >= 3 },
  { id: "streak7",      icon: "🌋", name: "Unstoppable",         desc: "Visit 7 days in a row",                           test: s => s.bestStreak >= 7 },
  { id: "game1",        icon: "🎯", name: "Type Detective",      desc: "Play Guess the Type",                             test: s => s.gamesPlayed >= 1 },
  { id: "perfect",      icon: "🏆", name: "Mind Reader",         desc: "Score 8 out of 8 in Guess the Type",              test: s => s.perfectGames >= 1 },
  { id: "theme",        icon: "🌗", name: "Both Sides",          desc: "Switch between day and night mode",               test: s => s.themeSwitches >= 2 }
];

function checkAchievements() {
  const s = getStats();
  const newly = [];
  ACHIEVEMENTS.forEach(a => {
    if (!s.unlocked[a.id] && a.test(s)) {
      s.unlocked[a.id] = Date.now();
      newly.push(a);
    }
  });
  if (newly.length) {
    saveStats(s);
    // small delay so it doesn't overwrite another toast shown at the same moment
    setTimeout(() => showToast("🏆 Unlocked: " + newly.map(a => a.name).join(", ")), 1500);
  }
  renderStreakChip();
  if (typeof renderTrophies === "function") renderTrophies();
  return newly;
}

/* ---------- daily streak ---------- */
function touchStreak() {
  const s = getStats();
  const today = todayKey();
  if (s.lastVisit === today) return;
  let streak = 1;
  if (s.lastVisit) {
    const diff = Math.round((new Date(today + "T00:00:00") - new Date(s.lastVisit + "T00:00:00")) / 86400000);
    if (diff === 1) streak = s.streak + 1;
  }
  s.streak = streak;
  s.bestStreak = Math.max(s.bestStreak, streak);
  s.lastVisit = today;
  saveStats(s);
}
function renderStreakChip() {
  const el = document.getElementById("streakCount");
  if (el) el.textContent = getStats().streak || 1;
}

function onQuizCompleted(mode, seconds) {
  const s = getStats();
  s.quizzes++;
  if (mode === "deep") s.deepDone++;
  if (mode === "quick" && seconds < 60) s.fastQuick++;
  saveStats(s);
  checkAchievements();
}

function initEngagement() {
  touchStreak();
  renderStreakChip();
  checkAchievements();
}

/* ---------- confetti (skipped if the visitor prefers reduced motion) ---------- */
function launchConfetti() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:60;pointer-events:none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const colors = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#38bdf8"];
  const pieces = Array.from({ length: 140 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 160,
    y: canvas.height * 0.35,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 15 - 4,
    size: 6 + Math.random() * 7,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  const start = performance.now();
  (function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.vy += 0.38; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - t / 2800);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (t < 2800) requestAnimationFrame(frame);
    else canvas.remove();
  })(start);
}
