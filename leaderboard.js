/* ==========================================================================
   LEADERBOARD for "Guess the Type"  (free Supabase database, works on GitHub Pages)
   1) Paste your two values below.  2) That's it.
   The public key is SAFE to keep here: the database rules (set in setup.sql) only
   allow reading scores and adding new ones.
   ========================================================================== */
(function () {
  const SUPABASE_URL = "https://cshattnrzcqbbvovujpy.supabase.co";        // e.g. https://abcdxyz.supabase.co
  const SUPABASE_KEY = "sb_publishable_Wt0c_ohLNi4qsVc1DIpDQw_5yc3msvx";         // the "anon public" or "publishable" key

  const TABLE = SUPABASE_URL + "/rest/v1/scores";
  const ready = !/PASTE_YOUR/.test(SUPABASE_URL + SUPABASE_KEY);
  const headers = { apikey: SUPABASE_KEY, "Content-Type": "application/json" };
  if (SUPABASE_KEY.indexOf("eyJ") === 0) headers.Authorization = "Bearer " + SUPABASE_KEY;

  let range = "today";          // "today" | "all"
  let startedAt = Date.now();

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const note = t => `<p class="text-sm text-slate-400 text-center py-4">${t}</p>`;

  /* ---------- styles (injected so no other file needs editing) ---------- */
  const st = document.createElement("style");
  st.textContent = `
    .lb-input{background:rgba(15,23,42,.9);border:1px solid #334155;color:#fff;border-radius:12px;padding:10px 14px;font-size:14px;font-weight:600;outline:none;min-width:0;flex:1;max-width:220px}
    .lb-input:focus{border-color:#6366f1}
    .light .lb-input{background:#fff;color:#0f172a;border-color:#cbd5e1}
    .lb-tab{padding:6px 14px;border-radius:9999px;font-size:12px;font-weight:700;background:#1e293b;color:#94a3b8;transition:all .15s}
    .lb-tab.on{background:#4f46e5;color:#fff}
    .light .lb-tab{background:#e2e8f0;color:#475569}
    .light .lb-tab.on{background:#4f46e5;color:#fff}
    .lb-row{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.15)}
    .lb-rank{width:30px;text-align:center;font-weight:800;font-size:15px}
    .lb-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;font-size:14px;color:inherit}
    .lb-time{font-size:11px;opacity:.6;font-family:"Space Grotesk",sans-serif}
    .lb-score{font-family:"Space Grotesk",sans-serif;font-weight:800;font-size:15px;color:#818cf8}
    .light .lb-score{color:#4f46e5}
  `;
  document.head.appendChild(st);

  /* ---------- read the top 10 ---------- */
  async function fetchTop() {
    let url = TABLE + "?select=name,score,time_ms&order=score.desc,time_ms.asc,created_at.asc&limit=10";
    if (range === "today") {
      const d = new Date(); d.setHours(0, 0, 0, 0);
      url += "&created_at=gte." + encodeURIComponent(d.toISOString());
    }
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  }

  function syncTabs() {
    document.querySelectorAll("[data-lb-range]").forEach(b => b.classList.toggle("on", b.dataset.lbRange === range));
  }

  window.renderLeaderboard = async function () {
    const box = document.getElementById("lbList");
    if (!box) return;
    syncTabs();
    if (!ready) { box.innerHTML = note("Leaderboard isn't set up yet."); return; }
    box.innerHTML = note("Loading…");
    try {
      const rows = await fetchTop();
      if (!rows.length) { box.innerHTML = note("No scores yet. Be the first! 🎯"); return; }
      const medals = ["🥇", "🥈", "🥉"];
      box.innerHTML = '<div class="space-y-2">' + rows.map((r, i) => `
        <div class="lb-row">
          <span class="lb-rank">${medals[i] || i + 1}</span>
          <span class="lb-name">${esc(r.name)}</span>
          <span class="lb-time">${(r.time_ms / 1000).toFixed(1)}s</span>
          <span class="lb-score">${r.score}/8</span>
        </div>`).join("") + "</div>";
    } catch (e) {
      box.innerHTML = note("Couldn't load the leaderboard. Try again later.");
    }
  };

  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-lb-range]");
    if (!b) return;
    range = b.dataset.lbRange;
    window.renderLeaderboard();
  });

  /* ---------- save a score ---------- */
  async function submitScore(name, score, timeMs) {
    const res = await fetch(TABLE, {
      method: "POST",
      headers: Object.assign({ Prefer: "return=minimal" }, headers),
      body: JSON.stringify({ name: name, score: score, time_ms: Math.min(Math.round(timeMs), 3600000) })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
  }

  function showSubmitBox(score, timeMs) {
    const area = document.getElementById("gameArea");
    if (!area || !ready) return;
    let saved = "";
    try { saved = localStorage.getItem("aura_lb_name") || ""; } catch (e) {}

    const box = document.createElement("div");
    box.className = "text-center pt-2";
    box.innerHTML = `
      <p class="text-xs text-slate-400 mb-2">Add your score to the leaderboard</p>
      <div class="flex gap-2 justify-center">
        <input id="lbName" class="lb-input" maxlength="16" placeholder="Your nickname" value="${esc(saved)}">
        <button id="lbSubmitBtn" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold transition-all">Submit</button>
      </div>
      <p id="lbMsg" class="text-xs mt-2 text-slate-400">Only your nickname and score are saved.</p>`;
    area.appendChild(box);

    const btn = box.querySelector("#lbSubmitBtn");
    const input = box.querySelector("#lbName");
    const msg = box.querySelector("#lbMsg");
    btn.addEventListener("click", async () => {
      const name = input.value.trim().slice(0, 16);
      if (!name) { msg.textContent = "Please type a nickname first."; return; }
      btn.disabled = true; btn.textContent = "Saving…";
      try {
        await submitScore(name, score, timeMs);
        try { localStorage.setItem("aura_lb_name", name); } catch (e) {}
        box.innerHTML = '<p class="text-sm font-bold text-emerald-400">Saved! Check the leaderboard below 🏅</p>';
        range = "today";
        window.renderLeaderboard();
      } catch (e) {
        btn.disabled = false; btn.textContent = "Submit";
        msg.textContent = "Couldn't save your score. Try again.";
      }
    });
  }

  /* ---------- hook into the existing game & play tab (playzone.js is not edited) ---------- */
  const _startGame = window.startGame;
  window.startGame = function () { startedAt = Date.now(); _startGame(); };

  const _endGame = window.endGame;
  window.endGame = function () {
    const score = game.score;
    const timeMs = Date.now() - startedAt;
    _endGame();
    showSubmitBox(score, timeMs);
  };

  const _renderPlayZone = window.renderPlayZone;
  window.renderPlayZone = function () { _renderPlayZone(); window.renderLeaderboard(); };
})();
