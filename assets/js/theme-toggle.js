// assets/js/theme-toggle.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.querySelector('a[title="toggle-theme"]');
  if (!toggleLink || typeof window.applySkin !== "function") return;

  // 1) Inject three spans: sun icon, knob, moon icon
  toggleLink.innerHTML = `
    <span class="slider-icon slider-icon--sun">☀︎</span>
    <span class="slider-knob"></span>
    <span class="slider-icon slider-icon--moon">🌙</span>
  `;

  // 2) Helper to sync the .is-dark class on the link
  const syncClass = () => {
    const current = getCurrentSkin();
    if (darkThemes.includes(current)) {
      toggleLink.classList.add("is-dark");
    } else {
      toggleLink.classList.remove("is-dark");
    }
  };

  // 3) Wrap applySkin so that any skin change re-syncs our slider
  const originalApply = window.applySkin;
  window.applySkin = name => {
    originalApply(name);
    syncClass();
  };

  // 4) Initial sync
  syncClass();

  // 5) Click handler: flip light ↔ dark
  toggleLink.addEventListener("click", e => {
    e.preventDefault();
    const current = getCurrentSkin();
    const next = darkThemes.includes(current)
      ? (localStorage.getItem("last-light") || lightThemes[0])
      : (localStorage.getItem("last-dark")  || darkThemes[0]);

    // remember
    if (lightThemes.includes(next)) localStorage.setItem("last-light", next);
    if (darkThemes.includes(next))  localStorage.setItem("last-dark",  next);
    localStorage.setItem("skin", next);

    window.applySkin(next);  // this also re-runs syncClass()
  });
});
