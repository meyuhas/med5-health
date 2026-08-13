# Med5 — med5.health

Static landing page for the Med5 genetics education platform (Prof. Eitan Friedman).

## Structure

- `index.html` — the whole page
- `styles.css`, `main.js` — styling and the click-to-load YouTube embeds
- `assets/logo*.png` — wordmark, extracted from `MED5.psd`
- `assets/hero.jpg` — hero image
- `assets/friedman.jpg` — portrait, frame from the Longevity lesson
- `assets/course/*.jpg` — thumbnails for the course-platform preview

Course content itself is **not** hosted here — the site links only to the two
public YouTube videos (promo + Longevity lesson 1).

Source files (`MED5.psd`, `BLUEPRINT/`) are git-ignored — they are large originals, not site assets.

## Local preview

```bash
python3 -m http.server 4321
```

## Deploy (Netlify)

Publish directory is the repo root (`netlify.toml`). No build step.

The contact form uses Netlify Forms (`data-netlify="true"`) — submissions appear under
Site settings → Forms once deployed.

## DNS — med5.health (registrar: Spaceship)

Two options, confirm exact values in the live Netlify UI before changing anything:

- **Netlify DNS** — replace the Spaceship nameservers (`launch1/launch2.spaceship.net`)
  with the four `dns*.pXX.nsone.net` servers Netlify shows.
- **Keep Spaceship DNS** — `A @ → <Netlify apex IP>` and `CNAME www → <site>.netlify.app`.

HTTPS is auto-provisioned (Let's Encrypt) once DNS resolves.
