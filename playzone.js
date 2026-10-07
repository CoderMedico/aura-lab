/* ==========================================================================
   PLAY ZONE: daily forecast, "Guess the Type" mini-game, trophies
   ========================================================================== */

function renderPlayZone() {
  renderDaily();
  renderGameIdle();
  renderTrophies();
}

/* ---------- DAILY FORECAST ---------- */
let dailyWired = false;

function lastResultBaseCode() {
  try {
    const h = JSON.parse(localStorage.getItem("aura_mbti_history") || "[]");
    if (h.length && h[0].code) return String(h[0].code).slice(0, 4);
  } catch (e) { /* ignore */ }
  return "";
}

function renderDaily() {
  const sel = document.getElementById("dailyTypeSelect");
  if (!sel) return;

  if (!sel.options.length) {
    sel.innerHTML = Object.values(PERSONAS).map(p => `<option value="${p.code}">${p.code} · ${p.name}</option>`).join("");
    const s = getStats();
    sel.value = PERSONAS[s.dailyType] ? s.dailyType : (PERSONAS[lastResultBaseCode()] ? lastResultBaseCode() : "INFP");
  }
  if (!dailyWired) {
    dailyWired = true;
    sel.addEventListener("change", () => {
      const s = getStats();
      s.dailyType = sel.value;
      saveStats(s);
      renderDaily();
    });
  }

  const code = sel.value;
  const key = todayKey();
  const f = buildForecast(code, key);
  const persona = PERSONAS[code];
  const dateText = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  document.getElementById("dailyCard").innerHTML = `
    <div class="space-y-5">
      <div>
        <p class="text-xs font-mono uppercase tracking-widest text-indigo-400">${dateText} · ${persona.emoji} ${code}</p>
        <p class="font-display text-xl sm:text-2xl font-bold text-white mt-1">${f.mood}</p>
      </div>

      <div>
        <div class="flex justify-between text-xs font-semibold text-slate-400 mb-1.5"><span>Today's vibe</span><span>${f.vibe}%</span></div>
        <div class="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style="width:${f.vibe}%"></div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="glass-card p-3 rounded-2xl">
          <div class="w-8 h-8 rounded-full mx-auto mb-1.5 border border-white/30" style="background:${f.color.hex}"></div>
          <p class="text-[10px] uppercase tracking-wider text-slate-400">Lucky color</p>
          <p class="text-xs font-bold text-slate-200">${f.color.name}</p>
        </div>
        <div class="glass-card p-3 rounded-2xl">
          <div class="text-2xl font-display font-extrabold gradient-text leading-8 mb-1.5">${f.lucky}</div>
          <p class="text-[10px] uppercase tracking-wider text-slate-400">Lucky number</p>
          <p class="text-xs font-bold text-slate-200">&nbsp;</p>
        </div>
        <div class="glass-card p-3 rounded-2xl">
          <div class="text-2xl leading-8 mb-1.5">${PERSONAS[f.match].emoji}</div>
          <p class="text-[10px] uppercase tracking-wider text-slate-400">Best energy</p>
          <p class="text-xs font-bold text-slate-200">${f.match}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <p class="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">🎯 Today's mission</p>
          <p class="text-sm text-slate-300">${f.mission}</p>
        </div>
        <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <p class="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">⚠️ Watch out</p>
          <p class="text-sm text-slate-300">${f.warning}</p>
        </div>
      </div>
      <p class="text-[11px] text-slate-500">Just for fun. Come back tomorrow for a new one.</p>
    </div>`;

  // count this day for the "Daily Ritual" trophy
  const s = getStats();
  if (!s.dailyDays.includes(key)) {
    s.dailyDays.push(key);
    s.dailyDays = s.dailyDays.slice(-60);
    saveStats(s);
    checkAchievements();
  }
}

/* ---------- GUESS THE TYPE (8 rounds) ---------- */
let game = null;

function renderGameIdle() {
  const el = document.getElementById("gameArea");
  if (!el || (game && game.active)) return;
  const best = getStats().bestGame;
  el.innerHTML = `
    <p class="text-sm text-slate-300 mb-4">Read the quote and guess which type said it. 8 rounds, 4 choices each.${best ? ` <span class="font-bold text-indigo-400">Your best: ${best}/8</span>` : ""}</p>
    <button id="startGameBtn" class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all">Start game ▶</button>`;
  document.getElementById("startGameBtn").addEventListener("click", startGame);
}

function startGame() {
  const allCodes = Object.keys(PERSONAS);
  const picks = shuffle(allCodes).slice(0, 8);
  game = {
    active: true, i: 0, score: 0, locked: false,
    rounds: picks.map(code => {
      const qs = TYPE_QUOTES[code];
      const others = shuffle(allCodes.filter(c => c !== code)).slice(0, 3);
      return { code, text: qs[Math.floor(Math.random() * qs.length)], options: shuffle([code].concat(others)) };
    })
  };
  renderGameRound();
}

function renderGameRound() {
  const el = document.getElementById("gameArea");
  const r = game.rounds[game.i];
  game.locked = false;
  el.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between text-xs font-semibold text-slate-400">
        <span>Round ${game.i + 1} of ${game.rounds.length}</span><span>Score: ${game.score}</span>
      </div>
      <div class="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
        <p class="font-display text-lg sm:text-xl font-bold text-white italic">"${r.text}"</p>
      </div>
      <p class="text-xs uppercase tracking-widest text-slate-400">Who said it?</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${r.options.map(c => `
          <button data-code="${c}" class="game-opt glass-card p-3 rounded-xl text-left text-sm font-semibold text-slate-200 transition-all">
            <span class="mr-1.5">${PERSONAS[c].emoji}</span>${c} · ${PERSONAS[c].name}
          </button>`).join("")}
      </div>
    </div>`;
  el.querySelectorAll(".game-opt").forEach(btn => btn.addEventListener("click", () => answerGame(btn.dataset.code)));
}

function answerGame(code) {
  if (!game || game.locked) return;
  game.locked = true;
  const r = game.rounds[game.i];
  const right = code === r.code;
  if (right) game.score++;
  document.querySelectorAll("#gameArea .game-opt").forEach(b => {
    if (b.dataset.code === r.code) b.classList.add("opt-correct");
    else if (b.dataset.code === code) b.classList.add("opt-wrong");
  });
  setTimeout(() => {
    game.i++;
    if (game.i < game.rounds.length) renderGameRound();
    else endGame();
  }, 1100);
}

function endGame() {
  const score = game.score;
  const total = game.rounds.length;
  game.active = false;

  const s = getStats();
  s.gamesPlayed++;
  if (score === total) s.perfectGames++;
  s.bestGame = Math.max(s.bestGame, score);
  saveStats(s);

  const msg = score === total ? "Perfect! You're basically a mind reader. 🔮"
    : score >= 6 ? "Impressive. You really know your types. 🧠"
    : score >= 4 ? "Not bad! A few more rounds and you'll nail it. 🙂"
    : "Time to explore the 16 Personas tab! 📚";

  document.getElementById("gameArea").innerHTML = `
    <div class="text-center space-y-4 py-4">
      <p class="text-5xl font-display font-extrabold gradient-text">${score} / ${total}</p>
      <p class="text-sm text-slate-300">${msg}</p>
      <button id="startGameBtn" class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm hover:scale-105 transition-all">Play again ↻</button>
    </div>`;
  document.getElementById("startGameBtn").addEventListener("click", startGame);
  if (score === total) launchConfetti();
  checkAchievements();
}

/* ---------- TROPHIES ---------- */
function renderTrophies() {
  const grid = document.getElementById("trophyGrid");
  if (!grid) return;
  const s = getStats();
  const got = ACHIEVEMENTS.filter(a => s.unlocked[a.id]).length;
  document.getElementById("trophyCount").textContent = `${got} / ${ACHIEVEMENTS.length} unlocked`;
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const on = !!s.unlocked[a.id];
    return `
      <div class="trophy glass-card p-4 rounded-2xl text-center space-y-1${on ? "" : " locked"}" title="${a.desc}">
        <div class="text-3xl">${on ? a.icon : "🔒"}</div>
        <p class="text-xs font-bold text-white">${a.name}</p>
        <p class="text-[11px] text-slate-400 leading-snug">${a.desc}</p>
      </div>`;
  }).join("");
}

/* ---------- RANDOM TYPE ---------- */
document.getElementById("randomTypeBtn").addEventListener("click", () => {
  const codes = Object.keys(PERSONAS);
  openPersonaModal(PERSONAS[codes[Math.floor(Math.random() * codes.length)]]);
});
document.getElementById("heroPlayBtn").addEventListener("click", () => switchView("play"));
