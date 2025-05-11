// assets/js/theme-picker.js

const getCurrentSkin = () => {
  // let localStorage override if set
  const saved = localStorage.getItem("skin");
  if (saved) return saved;

  // otherwise read it from the CSS variable
  const skin = getComputedStyle(document.documentElement)
    .getPropertyValue("--current-skin")
    .trim();

  // 3) fall back to the OS preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "air";
}

document.addEventListener("DOMContentLoaded", () => {
  const linkEl = document.getElementById("skin-style");
  if (!linkEl) return;

  // core apply logic
  function applySkin(name) {
    // swap body class + href
    document.body.classList.remove(
      ...[...document.body.classList].filter(c => c.startsWith("skin-"))
    );
    document.body.classList.add(`skin-${name}`);
    linkEl.href = linkEl.href.replace(/\/[^\/]+\.css$/, `/${name}.css`);

    // remember last-in-group
    if (darkThemes.includes(name)) {
      localStorage.setItem("last-dark", name);
    } else if (lightThemes.includes(name)) {
      localStorage.setItem("last-light", name);
    }

    // update toggle‐icon if you have one
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = darkThemes.includes(name) ? "🌙" : "🌞";
  }

  window.applySkin = applySkin;

  document.body.addEventListener("click", e => {
    // look up from the clicked element to an <a href="/themes/...">
    const link = e.target.closest('a[href^="/themes/"]');
    if (!link) return;    // not a theme-picker link
    e.preventDefault();    // stop the real navigation

    // pull the skin name out of the URL
    const skin = link.getAttribute("href").match(/\/themes\/([^\/]+)\//)[1];

    localStorage.setItem("skin", skin);
    applySkin(skin);
  });

  // load saved or default
  let saved = localStorage.getItem("skin");
  if (!saved) {
    // no explicit selection: fall back to last in that group
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    saved = prefersDark
      ? localStorage.getItem("last-dark")  || darkThemes[0]
      : localStorage.getItem("last-light") || lightThemes[0];
  }
  applySkin(saved);

  // header toggle button (your existing logic)
  const hdrBtn = document.getElementById("theme-toggle");
  if (hdrBtn) hdrBtn.addEventListener("click", e => {
    e.preventDefault();
    const current = getCurrentSkin();
    const next = darkThemes.includes(current)
      ? (localStorage.getItem("last-light") || lightThemes[0])
      : (localStorage.getItem("last-dark")  || darkThemes[0]);
    localStorage.setItem("skin", next);
    applySkin(next);
  });

  // hijack collection-grid links just like before
  document.querySelectorAll(".collection-grid__item a").forEach(link => {
    const m = link.getAttribute("href")?.match(/^\/?themes\/([^\/]+)\/?$/);
    if (!m) return;

    link.style.cursor = "pointer";
    link.addEventListener("click", e => {
      e.preventDefault();
      const skin = m[1];
      localStorage.setItem("skin", skin);
      applySkin(skin);
    });
  });
});
