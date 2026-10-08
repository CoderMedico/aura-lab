/* ==========================================================================
   PLAY ZONE: daily forecast, "Guess the Type" mini-game, trophies
   ========================================================================== */

/* Daily forecast styles are injected right here (plain CSS, applied instantly),
   so the card can never appear half-styled while other CSS files are still loading. */
(function () {
  if (document.getElementById("dailyCss")) return;
  const st = document.createElement("style");
  st.id = "dailyCss";
  st.textContent = `
    .dly { display: flex; flex-direction: column; gap: 20px; }
    .dly-date { font-size: 12px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: .1em; color: #818cf8; }
    .light .dly-date { color: #4f46e5; }
    .dly-mood { font-family: "Space Grotesk", sans-serif; font-size: 22px; font-weight: 700; line-height: 1.3; color: #fff; margin-top: 4px; }
    .light .dly-mood { color: #0f172a; }
    .dly-vibe-top { display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 600; color: #94a3b8; margin-bottom: 6px; }
    .light .dly-vibe-top { color: #475569; }
    .dly-track { display: block; height: 12px; width: 100%; border-radius: 9999px; background: #1e293b; overflow: hidden; }
    .light .dly-track { background: #e2e8f0; }
    .dly-fill { display: block; height: 100%; border-radius: 9999px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899); }
    .dly-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; text-align: center; }
    .dly-stat { padding: 12px; border-radius: 16px; }
    .dly-swatch { width: 32px; height: 32px; border-radius: 9999px; margin: 0 auto 6px; border: 1px solid rgba(255,255,255,.3); }
    .dly-num { font-family: "Space Grotesk", sans-serif; font-size: 24px; font-weight: 800; line-height: 32px; margin-bottom: 6px;
      background: linear-gradient(135deg, #a855f7, #6366f1, #3b82f6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .dly-emoji { font-size: 24px; line-height: 32px; margin-bottom: 6px; }
    .dly-cap { font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: #94a3b8; }
    .light .dly-cap { color: #475569; }
    .dly-val { font-size: 12px; font-weight: 700; color: #e2e8f0; min-height: 18px; }
    .light .dly-val { color: #1e293b; }
    .dly-cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
    @media (min-width: 768px) { .dly-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .dly-card { padding: 16px; border-radius: 16px; border: 1px solid transparent; }
    .dly-label { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px; }
    .dly-text { font-size: 14px; line-height: 1.5; color: #cbd5e1; }
    .light .dly-text { color: #334155; }
    .dly-green { background: rgba(16,185,129,.10); border-color: rgba(16,185,129,.20); }
    .dly-green .dly-label { color: #34d399; }
    .dly-amber { background: rgba(245,158,11,.10); border-color: rgba(245,158,11,.20); }
    .dly-amber .dly-label { color: #fbbf24; }
    .light .dly-green .dly-label { color: #059669; }
    .light .dly-amber .dly-label { color: #d97706; }
    .dly-foot { font-size: 11px; color: #64748b; }
  `;
  document.head.appendChild(st);
})();

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
    <div class="dly">
      <div>
        <div class="dly-date">${dateText} · ${persona.emoji} ${code}</div>
        <div class="dly-mood">${f.mood}</div>
      </div>

      <div>
        <div class="dly-vibe-top"><span>Today's vibe</span><span>${f.vibe}%</span></div>
        <div class="dly-track"><div class="dly-fill" style="width:${f.vibe}%"></div></div>
      </div>

      <div class="dly-stats">
        <div class="glass-card dly-stat">
          <div class="dly-swatch" style="background:${f.color.hex}"></div>
          <div class="dly-cap">Lucky color</div>
          <div class="dly-val">${f.color.name}</div>
        </div>
        <div class="glass-card dly-stat">
          <div class="dly-num">${f.lucky}</div>
          <div class="dly-cap">Lucky number</div>
          <div class="dly-val">&nbsp;</div>
        </div>
        <div class="glass-card dly-stat">
          <div class="dly-emoji">${PERSONAS[f.match].emoji}</div>
          <div class="dly-cap">Best energy</div>
          <div class="dly-val">${f.match}</div>
        </div>
      </div>

      <div class="dly-cards">
        <div class="dly-card dly-green">
          <div class="dly-label">🎯 Today's mission</div>
          <div class="dly-text">${f.mission}</div>
        </div>
        <div class="dly-card dly-amber">
          <div class="dly-label">⚠️ Watch out</div>
          <div class="dly-text">${f.warning}</div>
        </div>
      </div>
      <div class="dly-foot">Just for fun. Come back tomorrow for a new one.</div>
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
