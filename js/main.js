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

  /* ── Screenshot galleries + lightbox ──────────────────────────────────────
     Each .gallery has a main shot (a <button>) and a .thumbs strip. Thumbs
     swap the main image; clicking the main shot opens the lightbox, which
     navigates the same item list. Light/dark variants follow the site theme. */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  var lbCaption = lightbox.querySelector("figcaption");
  var lbState = { items: [], index: 0, opener: null };

  function themedSrc(item) {
    return root.dataset.theme === "dark" ? item.dark : item.light;
  }

  function lbShow(i) {
    lbState.index = (i + lbState.items.length) % lbState.items.length;
    var item = lbState.items[lbState.index];
    lbImg.src = themedSrc(item);
    lbImg.alt = item.alt;
    lbCaption.textContent = item.label;
  }

  function lbOpen(items, index, opener) {
    lbState.items = items;
    lbState.opener = opener;
    lbShow(index);
    lightbox.hidden = false;
    document.body.classList.add("lb-open");
    lightbox.querySelector(".lb-close").focus();
  }

  function lbClose() {
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.classList.remove("lb-open");
    if (lbState.opener) lbState.opener.focus();
  }

  lightbox.querySelector(".lb-close").addEventListener("click", lbClose);
  lightbox.querySelector(".lb-prev").addEventListener("click", function () { lbShow(lbState.index - 1); });
  lightbox.querySelector(".lb-next").addEventListener("click", function () { lbShow(lbState.index + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.tagName === "FIGURE") lbClose();
  });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowLeft") lbShow(lbState.index - 1);
    else if (e.key === "ArrowRight") lbShow(lbState.index + 1);
  });

  document.querySelectorAll(".gallery").forEach(function (gallery) {
    var main = gallery.querySelector(".gallery-main");
    var mainLight = main.querySelector("img.light-only");
    var mainDark = main.querySelector("img.dark-only");
    var thumbs = [].slice.call(gallery.querySelectorAll(".thumb"));
    var items = thumbs.map(function (t) {
      return { light: t.dataset.light, dark: t.dataset.dark, alt: t.dataset.alt, label: t.dataset.label };
    });
    var current = 0;

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener("click", function () {
        current = i;
        mainLight.src = items[i].light;
        mainDark.src = items[i].dark;
        mainLight.alt = items[i].alt;
        mainDark.alt = items[i].alt;
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });

    main.addEventListener("click", function () {
      lbOpen(items, current, main);
    });
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
