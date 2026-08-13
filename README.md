# Med5 — 5med.health

Static landing page for the Med5 genetics education platform (Prof. Eitan Friedman).

## Structure

- `index.html` — the whole page
- `styles.css`, `main.js` — styling and the video lightbox / YouTube facades
- `assets/logo*.png` — wordmark, extracted from `MED5.psd`
- `assets/hero.jpg` — hero image
- `assets/video/*.mp4`, `assets/poster/*.jpg` — 12 oncogenetics B-roll modules (web-encoded from `BLUEPRINT/`)

Source files (`MED5.psd`, `BLUEPRINT/`) are git-ignored — they are large originals, not site assets.

## Local preview

```bash
python3 -m http.server 4321
```

## Deploy (Netlify)

Publish directory is the repo root (`netlify.toml`). No build step.

The contact form uses Netlify Forms (`data-netlify="true"`) — submissions appear under
Site settings → Forms once deployed.

## DNS — 5med.health (registrar: Spaceship)

Two options, confirm exact values in the live Netlify UI before changing anything:

- **Netlify DNS** — replace the Spaceship nameservers (`launch1/launch2.spaceship.net`)
  with the four `dns*.pXX.nsone.net` servers Netlify shows.
- **Keep Spaceship DNS** — `A @ → <Netlify apex IP>` and `CNAME www → <site>.netlify.app`.

HTTPS is auto-provisioned (Let's Encrypt) once DNS resolves.
