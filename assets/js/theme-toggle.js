document.addEventListener("DOMContentLoaded", () => {
  const linkEl = document.getElementById("skin-style");
  if (!linkEl) return;

  // core apply logic
  function applySkin(name) {
    document.body.classList.remove(...[...document.body.classList]
      .filter(c => c.startsWith("skin-")));
    document.body.classList.add(`skin-${name}`);
    linkEl.href = linkEl.href.replace(/\/[^\/]+\.css$/, `/${name}.css`);
    // update header icon if present
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = name === "dark" ? "🌙" : "🌞";
  }

  // load saved or default
  const saved = localStorage.getItem("skin") || "default";
  applySkin(saved);

  // header toggle button
  const hdrBtn = document.getElementById("theme-toggle");
  if (hdrBtn) {
    hdrBtn.addEventListener("click", e => {
      e.preventDefault();
      const next = document.body.classList.contains("skin-dark") ? "air" : "dark";
      localStorage.setItem("skin", next);
      applySkin(next);
    });
  }

  // hijack grid item title links
  document.querySelectorAll(".collection-grid__item a").forEach(link => {
    // match URLs like "/themes/default/" or "/themes/dark/"
    const m = link.getAttribute("href").match(/^\/?themes\/([^\/]+)\/?$/);
    if (m) {
      link.style.cursor = "pointer";  // show it’s clickable
      link.addEventListener("click", e => {
        e.preventDefault();
        const skin = m[1];
        localStorage.setItem("skin", skin);
        applySkin(skin);
      });
    }
  });
});