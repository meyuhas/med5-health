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

document.getElementById("year").textContent = new Date().getFullYear();
