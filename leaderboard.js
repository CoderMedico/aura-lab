/* ==========================================================================
   LEADERBOARD for "Guess the Type"  (free Supabase database, works on GitHub Pages)
   1) Paste your two values below.  2) That's it.
   The public key is SAFE to keep here: the database rules (set in setup.sql) only
   allow reading scores and adding new ones.
   Styles live in extras.css (plain CSS, no Tailwind rebuild needed).
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
  const note = t => `<p class="lb-note">${t}</p>`;

  /* ---------- rebuild the card with plain-CSS markup (so index.html needs no changes) ---------- */
  const oldList = document.getElementById("lbList");
  const card = oldList && oldList.closest(".glass-card");
  if (card) {
    card.className = "glass-card lb-card";
    card.innerHTML = `
      <div class="lb-head">
        <h3 class="lb-title"><span>🏅</span> Leaderboard · Guess the Type</h3>
        <div class="lb-tabs">
          <button class="lb-tab on" data-lb-range="today">Today</button>
          <button class="lb-tab" data-lb-range="all">All time</button>
        </div>
      </div>
      <div id="lbList"></div>
      <p class="lb-foot">Top 10 by score, then by speed. Nicknames are public.</p>`;
  }

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
      box.innerHTML = '<div class="lb-list">' + rows.map((r, i) => `
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
    box.className = "lb-submit";
    box.innerHTML = `
      <p class="lb-submit-hint">Add your score to the leaderboard</p>
      <div class="lb-submit-row">
        <input id="lbName" class="lb-input" maxlength="16" placeholder="Your nickname" value="${esc(saved)}">
        <button id="lbSubmitBtn" class="lb-btn">Submit</button>
      </div>
      <p id="lbMsg" class="lb-msg">Only your nickname and score are saved.</p>`;
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
        box.innerHTML = '<p class="lb-ok">Saved! Check the leaderboard below 🏅</p>';
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

  // if this file finished loading while the Play tab is already open, draw it now
  const pv = document.getElementById("playView");
  if (pv && !pv.classList.contains("hidden")) window.renderLeaderboard();
})();
