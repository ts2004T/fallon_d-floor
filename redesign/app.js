/* StatPadder™ — shared behavior: theme toggle + mobile nav + reveal stagger */
(function () {
  var KEY = "statpadder_theme";

  function current() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }
  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    document.querySelectorAll("[data-theme-icon]").forEach(function (el) {
      el.textContent = theme === "dark" ? "☀️" : "🌙";
    });
    document.querySelectorAll("[data-theme-label]").forEach(function (el) {
      el.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }
  window.toggleTheme = function () {
    apply(current() === "dark" ? "light" : "dark");
  };

  document.addEventListener("DOMContentLoaded", function () {
    // theme (set early by inline head script to avoid FOUC; sync icons here)
    apply(current());
    document.querySelectorAll("[data-toggle-theme]").forEach(function (btn) {
      btn.addEventListener("click", window.toggleTheme);
    });

    // mobile nav
    var nav = document.querySelector(".nav");
    var burger = document.querySelector("[data-nav-toggle]");
    if (nav && burger) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // close on link tap or escape
      nav.querySelectorAll(".nav-mobile a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") nav.classList.remove("open");
      });
    }

    // stagger reveal
    var i = 0;
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.animationDelay = Math.min(i * 60, 480) + "ms";
      i++;
    });
  });
})();
