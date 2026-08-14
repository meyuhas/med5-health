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

## Deploy (Cloudflare Pages)

No build step. Build output directory: `/` (repo root).

The access form posts to `functions/api/subscribe.js`, a Cloudflare Pages Function that
files the contact in Brevo. Set `BREVO_API_KEY` and `BREVO_LIST_ID` in the Pages project
(Settings → Variables) — without them the form returns "not configured yet".

## DNS — med5.health (registrar: Spaceship)

Registered Aug 13, 2026 for 3 years (auto-renew on, renews Aug 13, 2029).
Starting state: default nameservers `launch1.spaceship.net` / `launch2.spaceship.net`,
zero custom records.

DNS is delegated to Cloudflare. In Spaceship → Nameservers & DNS → Custom nameservers,
`launch*.spaceship.net` is replaced with:

    matias.ns.cloudflare.com
    nicole.ns.cloudflare.com

Everything else — the site records, MX for mail, SPF/DKIM/DMARC — lives in the
Cloudflare zone. Mail is received through Cloudflare Email Routing (forwarding only)
and sent through Brevo, which also holds the marketing list.

HTTPS is auto-provisioned (Let's Encrypt) once DNS resolves.
