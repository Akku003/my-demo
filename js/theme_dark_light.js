function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
  }

  toggleBtn.addEventListener("click", function () {
    const isDark = body.getAttribute("data-theme") === "dark";

    if (isDark) {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}
(function () {
  const header = document.querySelector(".theme-main-menu");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    },
    { passive: true }
  );
})();

