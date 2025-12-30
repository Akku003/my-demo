document.addEventListener("DOMContentLoaded", function () {
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
});
