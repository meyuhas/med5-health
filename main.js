// Hero audience switch — organizations by default, clinicians one click away
const tabs = [...document.querySelectorAll('.switch [role="tab"]')];
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  });
});

// Deep links pick the matching view: #for-clinicians / #for-organizations
function viewFromHash() {
  const target = { "#for-clinicians": "tab-clin", "#for-organizations": "tab-org" }[location.hash];
  if (target) document.getElementById(target).click();
}
addEventListener("hashchange", viewFromHash);
viewFromHash();

// YouTube facades — load the iframe only on click
document.querySelectorAll(".yt").forEach(fig => {
  const btn = fig.querySelector(".yt__btn");
  btn.addEventListener("click", () => {
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${fig.dataset.id}?autoplay=1&rel=0`;
    frame.title = fig.dataset.label;
    frame.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    btn.replaceWith(frame);
  });
});

// Access request — posts to the Brevo-backed function without leaving the page
const accessForm = document.getElementById("access-form");
if (accessForm) {
  const status = document.getElementById("form-status");
  const submit = accessForm.querySelector("button[type=submit]");

  accessForm.addEventListener("submit", async e => {
    e.preventDefault();
    submit.disabled = true;
    show("Sending…");

    try {
      const res = await fetch(accessForm.action, { method: "POST", body: new FormData(accessForm) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        accessForm.reset();
        show("Thank you — we'll be in touch.");
      } else {
        show(body.error || "Something went wrong. Email hello@med5.health and we'll sort it out.");
      }
    } catch {
      show("No connection. Email hello@med5.health and we'll sort it out.");
    }
    submit.disabled = false;
  });

  function show(message) {
    status.textContent = message;
    status.hidden = false;
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
