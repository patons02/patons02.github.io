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