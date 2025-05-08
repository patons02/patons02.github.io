document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const savedSkin = localStorage.getItem("skin") || "default";

  applySkin(savedSkin);

  toggleButton.addEventListener("click", () => {
    const newSkin = document.body.classList.contains("skin-dark") ? "default" : "dark";
    applySkin(newSkin);
    localStorage.setItem("skin", newSkin);
  });

  function applySkin(skin) {
    document.body.classList.remove("skin-dark", "skin-default");
    document.body.classList.add(`skin-${skin}`);
    document.getElementById("skin-style").setAttribute("href", `/assets/css/${skin}.css`);
    themeIcon.textContent = skin === "dark" ? "🌙" : "🌞";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.querySelector('nav.site-nav a[href="#theme-toggle"]');
  const icon       = document.getElementById("theme-icon"); // if you’re still swapping an on-page icon
  const linkEl     = document.getElementById("skin-style");
  const current    = localStorage.getItem("skin") || "default";

  applySkin(current);

  toggleLink.addEventListener("click", e => {
    e.preventDefault();
    const next = document.body.classList.contains("skin-dark") ? "default" : "dark";
    applySkin(next);
    localStorage.setItem("skin", next);
  });

  function applySkin(name) {
    document.body.classList.toggle("skin-dark", name === "dark");
    document.body.classList.toggle("skin-default", name === "default");
    linkEl.setAttribute("href", `/assets/css/${name}.css`);
    if (icon) icon.textContent = name === "dark" ? "🌙" : "🌞";
  }
});