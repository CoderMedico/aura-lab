/* ==========================================================================
   MODERN DROPDOWNS
   Upgrades every <select> on the page into a rounded, scrollable menu
   (about 5-6 options visible at a time). The real <select> stays in the DOM
   (hidden), so existing code that reads .value or listens for "change"
   keeps working with no edits.
   ========================================================================== */
(function () {
  const valueDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");

  function splitLabel(text) {
    const m = text.match(/^(.+?)\s[-·]\s(.+)$/);
    return m ? { code: m[1], name: m[2] } : { code: "", name: text };
  }

  function enhanceSelect(sel) {
    if (sel._dd) return;
    sel._dd = true;

    const wrap = document.createElement("div");
    wrap.className = "dd" + (sel.classList.contains("w-full") ? " dd-block" : "");
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.classList.add("dd-native");
    sel.tabIndex = -1;
    sel.setAttribute("aria-hidden", "true");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "dd-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    const lbl = sel.id && document.querySelector(`label[for="${sel.id}"]`);
    if (lbl) trigger.setAttribute("aria-labelledby", lbl.id || (lbl.id = sel.id + "Label"));

    const panel = document.createElement("div");
    panel.className = "dd-panel";
    panel.setAttribute("role", "listbox");
    panel.tabIndex = -1;

    wrap.append(trigger, panel);

    let items = [];
    let active = -1;

    function labelHTML(text) {
      const { code, name } = splitLabel(text);
      return code
        ? `<span class="dd-code">${code}</span><span class="dd-name">${name}</span>`
        : `<span class="dd-name dd-solo">${name}</span>`;
    }

    function build() {
      panel.innerHTML = "";
      items = Array.from(sel.options).map((opt, i) => {
        const el = document.createElement("div");
        el.className = "dd-item";
        el.setAttribute("role", "option");
        el.dataset.index = i;
        el.innerHTML = labelHTML(opt.textContent) + '<span class="dd-check" aria-hidden="true">✓</span>';
        el.addEventListener("mousedown", e => e.preventDefault());
        el.addEventListener("click", () => choose(i));
        el.addEventListener("mousemove", () => setActive(i, false));
        panel.appendChild(el);
        return el;
      });
      sync();
    }

    function sync() {
      const opt = sel.options[sel.selectedIndex];
      trigger.innerHTML = `<span class="dd-label">${opt ? labelHTML(opt.textContent) : ""}</span><svg class="dd-caret" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      items.forEach((el, i) => {
        const on = i === sel.selectedIndex;
        el.classList.toggle("selected", on);
        el.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function setActive(i, scroll = true) {
      if (!items.length) return;
      active = Math.max(0, Math.min(items.length - 1, i));
      items.forEach((el, k) => el.classList.toggle("active", k === active));
      if (scroll) items[active].scrollIntoView({ block: "nearest" });
    }

    function isOpen() { return wrap.classList.contains("open"); }

    function open() {
      if (isOpen() || !items.length) return;
      // open upwards if there is clearly more room above than below
      const r = trigger.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      wrap.classList.toggle("up", below < 270 && r.top > below);
      wrap.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      const card = wrap.closest(".glass-card");
      if (card) card.classList.add("dd-raise");
      setActive(sel.selectedIndex, false);
      const cur = items[sel.selectedIndex];
      if (cur) panel.scrollTop = Math.max(0, cur.offsetTop - panel.clientHeight / 2 + cur.offsetHeight / 2);
    }

    function close() {
      if (!isOpen()) return;
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
      const card = wrap.closest(".glass-card");
      if (card) card.classList.remove("dd-raise");
    }

    function choose(i) {
      const changed = i !== sel.selectedIndex;
      valueDesc.set.call(sel, sel.options[i].value);
      sync();
      close();
      trigger.focus();
      if (changed) sel.dispatchEvent(new Event("change", { bubbles: true }));
    }

    trigger.addEventListener("click", () => (isOpen() ? close() : open()));
    trigger.addEventListener("keydown", e => {
      const k = e.key;
      if (k === "ArrowDown" || k === "ArrowUp") {
        e.preventDefault();
        if (!isOpen()) open(); else setActive(active + (k === "ArrowDown" ? 1 : -1));
      } else if (k === "Home" && isOpen()) { e.preventDefault(); setActive(0); }
      else if (k === "End" && isOpen()) { e.preventDefault(); setActive(items.length - 1); }
      else if (k === "Enter" || k === " ") {
        e.preventDefault();
        if (isOpen()) choose(active); else open();
      } else if (k === "Escape" && isOpen()) { e.preventDefault(); close(); }
      else if (k === "Tab") close();
      else if (k.length === 1 && /\S/.test(k)) {            // type-ahead: press "E" to jump to the next E-type
        const ch = k.toLowerCase();
        const from = isOpen() ? active + 1 : sel.selectedIndex + 1;
        const order = items.map((_, n) => (from + n) % items.length);
        const hit = order.find(n => sel.options[n].textContent.trim().toLowerCase().startsWith(ch));
        if (hit !== undefined) { if (!isOpen()) open(); setActive(hit); }
      }
    });

    document.addEventListener("mousedown", e => { if (!wrap.contains(e.target)) close(); });
    window.addEventListener("resize", close);

    // keep the menu in sync when code changes options or sets sel.value
    new MutationObserver(build).observe(sel, { childList: true });
    Object.defineProperty(sel, "value", {
      configurable: true,
      get() { return valueDesc.get.call(sel); },
      set(v) { valueDesc.set.call(sel, v); sync(); }
    });

    build();
  }

  window.enhanceSelect = enhanceSelect;
  document.querySelectorAll("select").forEach(enhanceSelect);
})();
