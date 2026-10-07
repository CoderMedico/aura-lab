/* AURA.lab service worker: makes the site installable and usable offline.
   Strategy: try the network first (so updates always show up), fall back to the cache offline.
   Bump CACHE when you want to force everyone to refresh. */
const CACHE = "aura-v6";
const CORE = [
  "./", "index.html", "style.css", "tailwind.css", "script.js", "questions.js", "profiles.js", "art.js",
  "characters.js", "quotes.js", "daily.js", "achievements.js", "playzone.js", "dropdown.js", "leaderboard.js",
  "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => Promise.allSettled(CORE.map(url => cache.add(url))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith("http")) return;
  if (req.url.includes("supabase.co")) return;   // never cache live leaderboard data
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && (res.status === 200 || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined)))
  );
});
