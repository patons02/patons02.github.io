// assets/js/theme-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.querySelector('a[title="toggle-theme"]');
  if (!toggleLink) return;

  toggleLink.addEventListener("click", e => {
    e.preventDefault();

    // find current skin name from body classList
    const currentClass = [...document.body.classList]
      .find(c => c.startsWith("skin-"));
    const current = currentClass
      ? currentClass.replace("skin-", "")
      : null;

    let next;
    if (darkThemes.includes(current)) {
      // if you’re on any dark skin → switch to your preferred light skin
      next = localStorage.getItem("last-light")|| lightThemes[0];
    } else {
      // if you’re on any light skin (or unknown) → switch to your preferred dark skin
      next = localStorage.getItem("last-dark")  || darkThemes[0];
    }

    // remember this choice for next toggle
    if (lightThemes.includes(next)) localStorage.setItem("last-light", next);
    if (darkThemes.includes(next))  localStorage.setItem("last-dark",  next);
    localStorage.setItem("skin", next);

    // applySkin must be globally available (from theme-picker.js)
    window.applySkin(next);
  });
});
