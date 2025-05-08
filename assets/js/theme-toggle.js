document.addEventListener("DOMContentLoaded", () => {
  const linkEl = document.getElementById("skin-style");
  if (!linkEl) return;

  function applySkin(name) {
    // remove any previous skin-XXX class
    document.body.className = document.body.className
      .split(" ")
      .filter(c => !c.startsWith("skin-"))
      .join(" ");
    document.body.classList.add(`skin-${name}`);
    linkEl.href = linkEl.href.replace(/\/[^\/]+\.css$/, `/${name}.css`);
    // if you have an icon in your header, swap it here:
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = name === "dark" ? "🌙" : "🌞";
  }

  // initial apply
  const saved = localStorage.getItem("skin") || "default";
  applySkin(saved);

  // header toggle button
  const hdrBtn = document.getElementById("theme-toggle");
  if (hdrBtn) {
    hdrBtn.addEventListener("click", e => {
      e.preventDefault();
      const next = document.body.classList.contains("skin-dark") ? "default" : "dark";
      localStorage.setItem("skin", next);
      applySkin(next);
    });
  }

  // all "Activate" buttons on your themes page
  document.querySelectorAll("[data-skin]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const skin = btn.getAttribute("data-skin");
      localStorage.setItem("skin", skin);
      applySkin(skin);
      // optional: go home after applying
      // window.location.href = "{{ '/' | relative_url }}";
    });
  });
});