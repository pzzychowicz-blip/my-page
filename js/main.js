// Patryk Zychowicz — portfolio
// Theme toggle · scroll reveal · nav hide-on-scroll · obfuscated mailto ·
// liquid-glass enablement. No dependencies.

(function () {
  "use strict";

  /* ── Theme toggle ─────────────────────────────────────────────────────────
     Same contract as the MGT apps: one data-theme attribute flip on <html>,
     preference persisted per device, OS preference respected until the user
     chooses explicitly (the no-flash resolver lives inline in index.html). */
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  toggle.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("pz-theme", next); } catch (e) {}
  });

  /* ── Scroll reveal ────────────────────────────────────────────────────────
     IntersectionObserver only — no scroll listeners. Elements get .in once
     and stay revealed. Reduced-motion users see everything immediately
     via the CSS media query, so this is purely additive. */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Nav hide-on-scroll ───────────────────────────────────────────────────
     The floating pill tucks away while scrolling down, returns on scroll up.
     rAF-throttled so the scroll handler does near-zero work per frame. */
  var nav = document.querySelector(".nav");
  var lastY = window.scrollY;
  var ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY && y > 160) nav.classList.add("hidden");
        else nav.classList.remove("hidden");
        lastY = y;
        ticking = false;
      });
    },
    { passive: true }
  );

  /* ── Obfuscated mailto ────────────────────────────────────────────────────
     The address never appears assembled in the page source; it is joined
     from parts here at click time to keep scraper bots away. */
  var emailBtn = document.getElementById("email-btn");
  emailBtn.addEventListener("click", function () {
    var user = ["pz", "zychowicz"].join(".");
    var host = ["gmail", "com"].join(".");
    window.location.href = "mailto:" + user + "@" + host;
  });

  /* ── Liquid-glass refraction (progressive enhancement) ────────────────────
     backdrop-filter: url(#frosted) — an SVG displacement-map lens — only
     renders in Chromium. Safari/Firefox parse it but paint nothing, which
     would silently REMOVE the fallback blur, so gate it to Chromium and
     keep the plain blur-glass everywhere else. */
  var isChromium = !!window.chrome && CSS.supports("backdrop-filter", "url(#frosted)");
  if (isChromium && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("lg-on");
  }
})();
