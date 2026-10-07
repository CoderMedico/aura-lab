/* ==========================================================================
   TYPE ILLUSTRATIONS
   --------------------------------------------------------------------------
   Each of the 16 types has its own hand-built scene:

     INTJ Architect    -> chess tower + blueprint     INTP Logician     -> atom
     ENTJ Commander    -> crown on a podium           ENTP Debater      -> speech bubbles + spark
     INFJ Advocate     -> lighthouse                  INFP Mediator     -> feather + moon
     ENFJ Protagonist  -> sun above a circle of people ENFP Campaigner  -> balloons + confetti
     ISTJ Logistician  -> checklist + clock           ISFJ Defender     -> shield with a heart
     ESTJ Executive    -> city + flag                 ESFJ Consul       -> gift + hearts
     ISTP Virtuoso     -> gear + wrench               ISFP Adventurer   -> paint palette + brush
     ESTP Entrepreneur -> rocket                      ESFP Entertainer  -> disco ball

   Colours come from the type's group:
     purple = Analysts, green = Diplomats, blue = Sentinels, amber = Explorers

   Everything is plain SVG text, so no image files are needed. To tweak a
   scene, edit its function below and refresh the page.
   ========================================================================== */

const GROUP_PALETTES = {
  analyst:  { a: "#7c3aed", b: "#c4b5fd", glow: "#a855f7", bg1: "#2e1065", bg2: "#0b0620" },
  diplomat: { a: "#059669", b: "#6ee7b7", glow: "#10b981", bg1: "#064e3b", bg2: "#03120d" },
  sentinel: { a: "#0284c7", b: "#7dd3fc", glow: "#38bdf8", bg1: "#0c4a6e", bg2: "#040f1c" },
  explorer: { a: "#d97706", b: "#fcd34d", glow: "#f59e0b", bg1: "#78350f", bg2: "#160a02" }
};

function groupOf(code) {
  if (code[1] === "N") return code[2] === "T" ? "analyst" : "diplomat";
  return code[3] === "J" ? "sentinel" : "explorer";
}

/* ---------- small drawing helpers ---------- */
const _W = "#ffffff";
const _gold = "#fde68a";

function _spark(x, y, r, fill = _W, op = 0.9) {
  return `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="${fill}" fill-opacity="${op}"/>`;
}
function _heart(cx, cy, k, fill, extra = "") {
  return `<path transform="translate(${cx} ${cy}) scale(${k})" d="M0 22 C-50 -14 -52 -66 -20 -72 C-6 -74 0 -64 0 -56 C0 -64 6 -74 20 -72 C52 -66 50 -14 0 22Z" fill="${fill}" ${extra}/>`;
}

function _moon(id, cx, cy, r) {
  return `<mask id="${id}"><rect width="400" height="400" fill="#fff"/><circle cx="${cx + r * 0.5}" cy="${cy - r * 0.3}" r="${r * 0.86}" fill="#000"/></mask>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fef3c7" mask="url(#${id})"/>`;
}

/* ==========================================================================
   THE 16 SCENES  (each returns SVG markup drawn on a 400 x 400 canvas)
   ========================================================================== */
const ILLUSTRATIONS = {

  /* INTJ - The Architect: a chess tower over a blueprint */
  INTJ: P => `
    <g stroke="${P.b}" stroke-opacity=".28" stroke-width="2" stroke-dasharray="5 9" fill="none">
      <circle cx="200" cy="215" r="132"/><path d="M52 338H348M200 70V338"/>
    </g>
    ${_spark(200, 94, 24)}
    <g fill="url(#core)" stroke="${_W}" stroke-opacity=".9" stroke-width="3" stroke-linejoin="round">
      <rect x="140" y="152" width="30" height="30" rx="3"/><rect x="185" y="152" width="30" height="30" rx="3"/><rect x="230" y="152" width="30" height="30" rx="3"/>
      <rect x="134" y="178" width="132" height="22" rx="5"/>
      <path d="M156 200H244L254 292H146Z"/>
      <rect x="126" y="290" width="148" height="26" rx="8"/>
      <rect x="116" y="316" width="168" height="18" rx="8"/>
    </g>
    <rect x="191" y="226" width="18" height="40" rx="9" fill="${P.bg2}" fill-opacity=".75"/>`,

  /* INTP - The Logician: an atom with floating symbols */
  INTP: P => `
    <g fill="none" stroke="${P.b}" stroke-width="4" stroke-opacity=".95">
      <ellipse cx="200" cy="205" rx="130" ry="48"/>
      <ellipse cx="200" cy="205" rx="130" ry="48" transform="rotate(60 200 205)"/>
      <ellipse cx="200" cy="205" rx="130" ry="48" transform="rotate(120 200 205)"/>
    </g>
    <circle cx="200" cy="205" r="30" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <circle cx="200" cy="205" r="9" fill="${_W}"/>
    <g fill="${_W}"><circle cx="330" cy="205" r="10"/><circle cx="135" cy="317" r="10"/><circle cx="265" cy="93" r="10"/></g>
    <g fill="${P.b}" fill-opacity=".6" font-family="Georgia,serif" font-size="38" font-weight="bold">
      <text x="62" y="96">π</text><text x="318" y="336">Σ</text><text x="60" y="336">∞</text>
    </g>`,

  /* ENTJ - The Commander: crown on a podium */
  ENTJ: P => `
    <g stroke="${P.b}" stroke-opacity=".45" stroke-width="3" stroke-linecap="round">
      <path d="M200 86V58M160 98L146 74M240 98L254 74M122 120L98 106M278 120L302 106"/>
    </g>
    <g stroke="${_W}" stroke-opacity=".6" stroke-width="2" fill="${P.a}" fill-opacity=".55">
      <rect x="104" y="306" width="62" height="30" rx="4"/><rect x="170" y="292" width="62" height="44" rx="4"/><rect x="236" y="306" width="62" height="30" rx="4"/>
    </g>
    <path d="M120 262L106 156L160 200L200 128L240 200L294 156L280 262Z" fill="url(#core)" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="118" y="260" width="164" height="30" rx="8" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
    <g fill="${_W}"><circle cx="106" cy="152" r="11"/><circle cx="200" cy="122" r="13"/><circle cx="294" cy="152" r="11"/></g>
    <g fill="${_gold}"><circle cx="160" cy="275" r="6"/><circle cx="200" cy="275" r="6"/><circle cx="240" cy="275" r="6"/></g>`,

  /* ENTP - The Debater: two speech bubbles + a spark of an idea */
  ENTP: P => `
    <path d="M110 208L96 258L150 212Z" fill="url(#core)"/>
    <rect x="70" y="100" width="172" height="112" rx="32" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <path d="M292 280L312 330L250 284Z" fill="${_W}" fill-opacity=".93"/>
    <rect x="158" y="172" width="172" height="112" rx="32" fill="${_W}" fill-opacity=".93"/>
    <text x="156" y="184" font-family="Arial,sans-serif" font-size="92" font-weight="900" text-anchor="middle" fill="${_W}">!</text>
    <text x="244" y="256" font-family="Arial,sans-serif" font-size="92" font-weight="900" text-anchor="middle" fill="${P.a}">?</text>
    <polygon points="318,44 284,104 308,104 292,150 338,88 314,88" fill="#fde047" stroke="${_W}" stroke-width="2.5" stroke-linejoin="round"/>
    ${_spark(84, 304, 14, P.b)}${_spark(344, 220, 10, P.b)}`,

  /* INFJ - The Advocate: a lighthouse guiding the way */
  INFJ: P => `
    <defs>
      <linearGradient id="beamL" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="beamR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    ${_moon("moonA", 320, 92, 32)}
    ${_spark(80, 84, 9)}${_spark(130, 138, 6)}${_spark(250, 66, 7)}
    <polygon points="200,184 30,128 30,240" fill="url(#beamL)"/>
    <polygon points="200,184 370,128 370,240" fill="url(#beamR)"/>
    <polygon points="174,334 226,334 214,198 186,198" fill="url(#core)" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="182.5,244 217.5,244 218.6,266 181.4,266" fill="${_W}" fill-opacity=".9"/>
    <polygon points="178.6,296 221.4,296 222.9,318 177.1,318" fill="${_W}" fill-opacity=".9"/>
    <rect x="178" y="192" width="44" height="8" rx="3" fill="${_W}"/>
    <rect x="186" y="164" width="28" height="30" rx="5" fill="#fde68a" stroke="${_W}" stroke-width="2.5"/>
    <polygon points="180,166 220,166 200,138" fill="${P.a}" stroke="${_W}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M0 334Q50 316 100 334T200 334T300 334T400 334V400H0Z" fill="${P.a}" fill-opacity=".55"/>
    <path d="M0 356Q50 340 100 356T200 356T300 356T400 356V400H0Z" fill="${P.b}" fill-opacity=".25"/>
    <polygon points="146,338 254,338 234,320 166,320" fill="${P.bg2}" fill-opacity=".85"/>`,

  /* INFP - The Mediator: a dreamy feather under a crescent moon */
  INFP: P => {
    let barbs = "";
    for (let y = 92; y <= 300; y += 18) {
      const w = Math.max(10, Math.min(52, (y - 52) * 0.62, (326 - y) * 0.7));
      barbs += `<path d="M200 ${y}L${(200 - w).toFixed(0)} ${y - 20}M200 ${y}L${(200 + w).toFixed(0)} ${y - 20}"/>`;
    }
    return `
    ${_moon("moonB", 92, 96, 34)}
    ${_spark(336, 112, 11)}${_spark(70, 262, 8)}${_spark(340, 300, 9, P.b)}
    <g fill="${P.b}" fill-opacity=".5"><circle cx="296" cy="62" r="4"/><circle cx="356" cy="190" r="3"/><circle cx="52" cy="176" r="3"/></g>
    <g transform="rotate(30 200 214)">
      <path d="M200 50C240 84 264 152 254 218L246 228L258 238L240 268L250 276L216 312L200 322L184 312L150 276L160 268L142 238L154 228L146 218C136 152 160 84 200 50Z" fill="url(#core)" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
      <g stroke="${_W}" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round" fill="none">${barbs}</g>
      <path d="M200 50V322" stroke="${_W}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M200 322V376" stroke="${_W}" stroke-width="5" stroke-linecap="round"/>
    </g>`;
  },

  /* ENFJ - The Protagonist: a rising sun above people holding hands */
  ENFJ: P => {
    let rays = "";
    for (let i = 0; i < 14; i++) {
      const a = (i * Math.PI * 2) / 14;
      rays += `<line x1="${(200 + Math.cos(a) * 66).toFixed(1)}" y1="${(138 + Math.sin(a) * 66).toFixed(1)}" x2="${(200 + Math.cos(a) * 92).toFixed(1)}" y2="${(138 + Math.sin(a) * 92).toFixed(1)}"/>`;
    }
    const xs = [84, 142, 200, 258, 316];
    const people = xs.map((x, i) => {
      const c = i === 2;
      const hy = c ? 246 : 258, by = 332, bw = c ? 21 : 17;
      return `<circle cx="${x}" cy="${hy}" r="${c ? 17 : 14}" fill="${c ? _W : P.b}"/>`
        + `<path d="M${x - bw} ${by}V${hy + 34}a${bw} ${bw} 0 0 1 ${bw * 2} 0V${by}Z" fill="${c ? _W : P.b}"/>`;
    }).join("");
    return `
    <g stroke="${P.b}" stroke-width="5" stroke-linecap="round" stroke-opacity=".9">${rays}</g>
    <circle cx="200" cy="138" r="48" fill="#fde68a" stroke="${_W}" stroke-width="3"/>
    <path d="M84 300H316" stroke="${_W}" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>
    ${people}
    ${_heart(200, 148, 0.42, "#f472b6")}`;
  },

  /* ENFP - The Campaigner: balloons and confetti */
  ENFP: P => `
    <g stroke="${_W}" stroke-opacity=".7" stroke-width="2.5" fill="none">
      <path d="M214 172Q206 260 204 336"/><path d="M140 214Q170 280 204 336"/><path d="M268 220Q240 280 204 336"/>
    </g>
    <ellipse cx="214" cy="122" rx="46" ry="56" fill="${_W}" fill-opacity=".93" stroke="${_W}" stroke-width="2"/>
    <ellipse cx="138" cy="158" rx="46" ry="56" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <ellipse cx="270" cy="168" rx="42" ry="52" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
    <g fill="${_W}" fill-opacity=".55"><ellipse cx="196" cy="98" rx="9" ry="16" transform="rotate(20 196 98)"/><ellipse cx="120" cy="134" rx="9" ry="16" transform="rotate(20 120 134)"/><ellipse cx="256" cy="146" rx="8" ry="14" transform="rotate(20 256 146)"/></g>
    <g fill="${P.b}"><polygon points="214,176 207,188 221,188"/><polygon points="138,216 131,228 145,228"/><polygon points="270,218 263,230 277,230"/></g>
    <g>
      <rect x="64" y="84" width="12" height="6" rx="2" fill="#fde047" transform="rotate(30 64 84)"/>
      <rect x="326" y="96" width="12" height="6" rx="2" fill="#f472b6" transform="rotate(-25 326 96)"/>
      <rect x="342" y="252" width="12" height="6" rx="2" fill="${P.b}" transform="rotate(50 342 252)"/>
      <rect x="52" y="262" width="12" height="6" rx="2" fill="#fde047" transform="rotate(-40 52 262)"/>
      <circle cx="96" cy="320" r="5" fill="#f472b6"/><circle cx="314" cy="324" r="5" fill="#fde047"/><circle cx="350" cy="158" r="4" fill="${_W}"/>
    </g>
    ${_spark(94, 196, 12)}${_spark(332, 52, 9)}`,

  /* ISTJ - The Logistician: a checklist and a clock */
  ISTJ: P => {
    let rows = "";
    for (let i = 0; i < 4; i++) {
      const y = 150 + i * 40;
      rows += i < 3
        ? `<polyline points="146,${y} 156,${y + 10} 174,${y - 12}" fill="none" stroke="${P.a}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<rect x="146" y="${y - 12}" width="24" height="24" rx="5" fill="none" stroke="${P.a}" stroke-width="4"/>`;
      rows += `<rect x="186" y="${y - 5}" width="${i === 3 ? 44 : 62}" height="10" rx="5" fill="${P.a}" fill-opacity=".35"/>`;
    }
    return `
    <rect x="112" y="90" width="168" height="240" rx="20" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <rect x="130" y="118" width="132" height="194" rx="10" fill="#f8fafc" fill-opacity=".96"/>
    <rect x="160" y="72" width="72" height="38" rx="12" fill="${P.bg1}" stroke="${_W}" stroke-width="3"/>
    <circle cx="196" cy="90" r="6" fill="${_W}"/>
    ${rows}
    <circle cx="290" cy="296" r="48" fill="${_W}" stroke="${P.a}" stroke-width="7"/>
    <g stroke="${P.a}" stroke-width="5" stroke-linecap="round"><path d="M290 296V268M290 296L310 306"/></g>
    <g fill="${P.a}"><circle cx="290" cy="260" r="3"/><circle cx="290" cy="332" r="3"/><circle cx="254" cy="296" r="3"/><circle cx="326" cy="296" r="3"/></g>`;
  },

  /* ISFJ - The Defender: a shield with a heart */
  ISFJ: P => `
    <path d="M200 70L296 106V196C296 258 254 298 200 330C146 298 104 258 104 196V106Z" fill="url(#core)" stroke="${_W}" stroke-width="4" stroke-linejoin="round"/>
    <path transform="translate(200 200) scale(.84) translate(-200 -200)" d="M200 70L296 106V196C296 258 254 298 200 330C146 298 104 258 104 196V106Z" fill="none" stroke="${_W}" stroke-opacity=".6" stroke-width="3"/>
    ${_heart(200, 232, 1.38, _W)}
    ${_spark(70, 110, 12)}${_spark(336, 300, 10, P.b)}${_spark(326, 84, 8)}`,

  /* ESTJ - The Executive: a city skyline with a flag on top */
  ESTJ: P => {
    const windows = (x, y, cols, rows, w = 10, h = 12, gx = 17, gy = 22) => {
      let s = "";
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
        s += `<rect x="${x + c * gx}" y="${y + r * gy}" width="${w}" height="${h}" rx="2"/>`;
      return s;
    };
    return `
    <path d="M214 112V62" stroke="${_W}" stroke-width="4" stroke-linecap="round"/>
    <polygon points="214,62 262,76 214,92" fill="${_gold}" stroke="${_W}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="100" y="188" width="74" height="146" rx="6" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
    <rect x="166" y="112" width="96" height="222" rx="6" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <rect x="254" y="206" width="64" height="128" rx="6" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
    <g fill="${_W}" fill-opacity=".85">${windows(176, 128, 4, 7, 11, 13, 21, 26)}</g>
    <g fill="${_W}" fill-opacity=".65">${windows(112, 204, 3, 5, 10, 12, 20, 25)}${windows(266, 222, 3, 4, 10, 12, 18, 25)}</g>
    <rect x="70" y="334" width="280" height="12" rx="6" fill="${P.b}" fill-opacity=".55"/>`;
  },

  /* ESFJ - The Consul: a gift box with hearts */
  ESFJ: P => `
    <rect x="124" y="200" width="152" height="124" rx="10" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <rect x="112" y="166" width="176" height="42" rx="10" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
    <rect x="186" y="166" width="28" height="158" fill="${_W}" fill-opacity=".92"/>
    <g fill="${_W}" fill-opacity=".92" stroke="${P.a}" stroke-width="3">
      <ellipse cx="158" cy="148" rx="42" ry="24" transform="rotate(-20 158 148)"/>
      <ellipse cx="242" cy="148" rx="42" ry="24" transform="rotate(20 242 148)"/>
    </g>
    <circle cx="200" cy="162" r="14" fill="${_W}" stroke="${P.a}" stroke-width="3"/>
    ${_heart(86, 118, 0.5, "#f472b6")}${_heart(322, 96, 0.38, "#f472b6")}${_heart(334, 252, 0.46, _W, 'fill-opacity=".85"')}${_heart(70, 262, 0.32, P.b)}
    ${_spark(300, 170, 9)}${_spark(104, 196, 8)}`,

  /* ISTP - The Virtuoso: a gear and a wrench */
  ISTP: P => {
    let teeth = "";
    for (let i = 0; i < 10; i++)
      teeth += `<rect x="-13" y="-88" width="26" height="28" rx="5" transform="translate(150 238) rotate(${i * 36})"/>`;
    return `
    <g fill="${P.b}" stroke="${_W}" stroke-width="3" stroke-linejoin="round">${teeth}</g>
    <circle cx="150" cy="238" r="68" fill="url(#core)" stroke="${_W}" stroke-width="3"/>
    <circle cx="150" cy="238" r="40" fill="none" stroke="${_W}" stroke-opacity=".5" stroke-width="3"/>
    <circle cx="150" cy="238" r="22" fill="${P.bg1}" stroke="${_W}" stroke-width="3"/>
    <g transform="translate(266 150) rotate(38)">
      <rect x="-15" y="-40" width="30" height="172" rx="14" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
      <circle cx="0" cy="-70" r="38" fill="${P.a}" stroke="${_W}" stroke-width="3"/>
      <rect x="-14" y="-118" width="28" height="50" fill="${P.bg1}"/>
      <circle cx="0" cy="112" r="9" fill="${P.bg1}"/>
    </g>
    ${_spark(334, 296, 10)}${_spark(66, 96, 9, P.b)}`;
  },

  /* ISFP - The Adventurer: a painter's palette and brush */
  ISFP: P => `
    <path d="M104 212C80 140 150 92 226 108C306 126 326 226 270 270C240 296 226 258 200 276C168 300 120 284 104 212Z" fill="url(#core)" stroke="${_W}" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="164" cy="232" r="15" fill="${P.bg1}" stroke="${_W}" stroke-width="3"/>
    <circle cx="150" cy="166" r="17" fill="#f472b6" stroke="${_W}" stroke-width="2.5"/>
    <circle cx="204" cy="138" r="17" fill="#fde047" stroke="${_W}" stroke-width="2.5"/>
    <circle cx="258" cy="164" r="17" fill="#38bdf8" stroke="${_W}" stroke-width="2.5"/>
    <circle cx="268" cy="222" r="15" fill="${_W}" stroke="${_W}" stroke-width="2.5"/>
    <g transform="translate(300 96) rotate(40)">
      <rect x="-8" y="-6" width="16" height="150" rx="8" fill="${_W}" stroke="${P.b}" stroke-width="2.5"/>
      <rect x="-9" y="-22" width="18" height="28" rx="3" fill="#94a3b8" stroke="${_W}" stroke-width="2"/>
      <path d="M-9 -22C-9 -58 9 -58 9 -22Z" fill="#f472b6" stroke="${_W}" stroke-width="2"/>
    </g>
    ${_spark(86, 90, 11)}${_spark(330, 318, 9, P.b)}`,

  /* ESTP - The Entrepreneur: a rocket blasting off */
  ESTP: P => `
    <g stroke="${_W}" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"><path d="M70 330L116 284M48 296L84 262M104 352L142 314"/></g>
    <g transform="rotate(40 200 206)">
      <path d="M162 216L116 276V308L172 266Z" fill="${P.a}" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M238 216L284 276V308L228 266Z" fill="${P.a}" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M186 284C190 322 200 346 200 362C200 346 210 322 214 284Z" fill="#fbbf24"/>
      <path d="M192 284C194 308 200 322 200 332C200 322 206 308 208 284Z" fill="${_W}"/>
      <clipPath id="rocketBody"><path d="M200 62C254 112 262 204 240 270H160C138 204 146 112 200 62Z"/></clipPath>
      <path d="M200 62C254 112 262 204 240 270H160C138 204 146 112 200 62Z" fill="#f8fafc"/>
      <g clip-path="url(#rocketBody)"><rect x="130" y="40" width="140" height="106" fill="${P.a}"/><rect x="130" y="240" width="140" height="16" fill="${P.a}"/></g>
      <path d="M200 62C254 112 262 204 240 270H160C138 204 146 112 200 62Z" fill="none" stroke="${_W}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="200" cy="198" r="28" fill="${P.bg1}" stroke="${P.b}" stroke-width="7"/>
      <ellipse cx="192" cy="190" rx="8" ry="11" fill="${_W}" fill-opacity=".6"/>
      <path d="M176 270H224L216 290H184Z" fill="#64748b" stroke="${_W}" stroke-width="2"/>
    </g>
    ${_spark(92, 108, 12)}${_spark(330, 316, 10, P.b)}${_spark(338, 90, 8)}`,

  /* ESFP - The Entertainer: a disco ball under the spotlights */
  ESFP: P => {
    let grid = "";
    for (let k = -3; k <= 3; k++) grid += `<path d="M120 ${196 + k * 20}H280"/>`;
    [24, 46, 68].forEach(rx => { grid += `<ellipse cx="200" cy="196" rx="${rx}" ry="76"/>`; });
    return `
    <defs>
      <clipPath id="ball"><circle cx="200" cy="196" r="76"/></clipPath>
      <linearGradient id="spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="spot2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <polygon points="0,0 80,0 270,330 70,330" fill="url(#spot)" opacity=".55"/>
    <polygon points="400,0 320,0 130,330 330,330" fill="url(#spot2)" opacity=".55"/>
    <path d="M200 52V120" stroke="${_W}" stroke-width="4"/>
    <rect x="188" y="110" width="24" height="12" rx="4" fill="${P.b}" stroke="${_W}" stroke-width="2"/>
    <g clip-path="url(#ball)">
      <circle cx="200" cy="196" r="76" fill="url(#core)"/>
      <g fill="${_W}" fill-opacity=".38"><rect x="150" y="146" width="20" height="20"/><rect x="210" y="176" width="20" height="20"/><rect x="170" y="216" width="20" height="20"/><rect x="236" y="136" width="20" height="20"/><rect x="130" y="196" width="20" height="20"/></g>
      <g fill="none" stroke="${_W}" stroke-opacity=".55" stroke-width="2">${grid}</g>
    </g>
    <circle cx="200" cy="196" r="76" fill="none" stroke="${_W}" stroke-width="3.5"/>
    ${_spark(96, 176, 14)}${_spark(312, 150, 12)}${_spark(310, 252, 9, P.b)}${_spark(98, 262, 8, P.b)}
    <g fill="${P.b}" font-family="Arial,sans-serif" font-weight="bold"><text x="96" y="352" font-size="58">♪</text><text x="268" y="356" font-size="64">♫</text></g>`;
  }
};

/* ==========================================================================
   Compose the final picture: background + glow + the type's scene
   ========================================================================== */
function artSVG(code) {
  code = String(code).slice(0, 4).toUpperCase();
  const P = GROUP_PALETTES[groupOf(code)];
  const isJ = code[3] === "J";
  let texture = "";

  // J = faint grid, P = faint waves (the letter's mood shows in the background)
  if (isJ) {
    let lines = "";
    for (let i = 0; i <= 400; i += 40) lines += `<line x1="${i}" y1="0" x2="${i}" y2="400"/><line x1="0" y1="${i}" x2="400" y2="${i}"/>`;
    texture = `<g stroke="${P.b}" stroke-opacity=".10" stroke-width="1">${lines}</g>`;
  } else {
    let waves = "";
    for (let k = 0; k < 6; k++) {
      const y = 60 + k * 56;
      waves += `<path d="M-10 ${y}C70 ${y - 34} 130 ${y + 34} 200 ${y}S330 ${y - 34} 410 ${y}"/>`;
    }
    texture = `<g fill="none" stroke="${P.b}" stroke-opacity=".13" stroke-width="2">${waves}</g>`;
  }

  const scene = (ILLUSTRATIONS[code] || (() => ""))(P);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">`
    + `<title>${code}</title>`
    + `<defs>`
    + `<radialGradient id="bg" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="${P.bg1}"/><stop offset="1" stop-color="${P.bg2}"/></radialGradient>`
    + `<radialGradient id="glow"><stop offset="0" stop-color="${P.glow}" stop-opacity=".5"/><stop offset="1" stop-color="${P.glow}" stop-opacity="0"/></radialGradient>`
    + `<linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.b}"/><stop offset="1" stop-color="${P.a}"/></linearGradient>`
    + `</defs>`
    + `<clipPath id="frame"><rect width="400" height="400" rx="36"/></clipPath>`
    + `<rect width="400" height="400" rx="36" fill="url(#bg)"/>`
    + `<g clip-path="url(#frame)">`
    + texture
    + `<circle cx="200" cy="200" r="190" fill="url(#glow)"/>`
    + scene
    + `</g>`
    + `</svg>`;
}

/* data: URI so it works inside <img> and canvas with no extra files */
function artDataURI(code) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(artSVG(code));
}
