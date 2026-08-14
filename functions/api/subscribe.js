/**
 * Cloudflare Pages Function — receives the site's access request and files it in Brevo.
 *
 * Needs two environment variables, set in the Pages project (Settings → Variables):
 *   BREVO_API_KEY  — Brevo → SMTP & API → API keys
 *   BREVO_LIST_ID  — the numeric id of the contact list, e.g. 3
 *
 * The API key stays server-side; the browser never sees it.
 */

const JSON_HEADERS = { "Content-Type": "application/json" };

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Could not read the form." }, 400);
  }

  // Honeypot: bots fill hidden fields, people don't.
  if (form.get("company-hp")) return json({ ok: true });

  const email = String(form.get("email") || "").trim();
  const role = String(form.get("role") || "").trim();

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }

  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    return json({ error: "The form is not configured yet." }, 500);
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { ...JSON_HEADERS, "api-key": env.BREVO_API_KEY },
    body: JSON.stringify({
      email,
      attributes: { ROLE: role || undefined, SOURCE: "med5.health" },
      listIds: [Number(env.BREVO_LIST_ID)],
      updateEnabled: true,
    }),
  });

  // Brevo returns 400 with code duplicate_parameter when the contact already exists.
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (body.code === "duplicate_parameter") return json({ ok: true });
    return json({ error: "We could not record that. Please email hello@med5.health." }, 502);
  }

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
