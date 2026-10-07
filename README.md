# AURA.lab

A free 16-type personality quiz with real percentages, deep profiles, shareable results, a daily forecast, a mini-game and trophies.
Plain HTML, CSS and JavaScript. No build step, no server.

## Files

| File | What it does |
|---|---|
| `index.html` | The page and all screens |
| `style.css` | Custom styles (day mode, scale dots, mobile nav) |
| `script.js` | Main app logic: quiz, results, sharing, gallery, compare, history |
| `questions.js` | 92 quiz questions and the three quiz modes. Add your own here |
| `profiles.js` | Deep profile text for all 16 types |
| `characters.js` | "You vibe with" character matches |
| `quotes.js` | Taglines and in-character quotes (also used by the mini-game) |
| `daily.js` | Daily forecast content |
| `art.js` | Draws the illustration for each type (tower, atom, crown, lighthouse...) |
| `achievements.js` | Streaks, trophies and confetti |
| `playzone.js` | The Play tab: forecast, Guess the Type game, trophies |
| `manifest.json`, `sw.js`, `icons/` | Make the site installable and usable offline |
| `images/` | The 16 emblems as standalone SVG files |
| `og-image.png` | The preview picture shown when your link is shared |

## Site: https://codermedico.github.io/aura-lab/

## After you have a real address

1. Open `index.html` and change `content="og-image.png"` (twice) to the full address, for example
   `content="https://your-site.netlify.app/og-image.png"`. Chat apps need the full address to show the preview picture.
2. Share links only work for other people once the site is online (not from a file on your computer).

## Notes

- Everything a visitor saves (history, streak, trophies) stays in their own browser.
- Entertainment only. Not affiliated with the Myers & Briggs Foundation or The Myers-Briggs Company.
