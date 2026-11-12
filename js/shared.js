/* =============================================================
   THE BLURGBLOG — shared code for every page
   (helpers, VHS cover generator, scroll engine, VCR display)
   ============================================================= */
(function () {
  "use strict";

  var B = (window.Blurg = {});
  var root = document.documentElement;

  B.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  B.$ = function (s, el) { return (el || document).querySelector(s); };
  B.$$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  B.clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  B.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- VHS covers ---------- */
  var FIGHTERS = [
    // flying kick
    '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M57 33 L45 56"/><path d="M56 37 L72 31 L84 22"/><path d="M55 39 L40 42 L29 35"/><path d="M45 56 L69 62 L93 57"/><path d="M45 56 L35 72 L44 86"/></g><circle cx="61" cy="21" r="9" fill="currentColor"/></svg>',
    // fighting stance
    '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M50 30 L50 56"/><path d="M50 35 L33 42 L24 31"/><path d="M50 35 L67 44 L80 39"/><path d="M50 56 L34 72 L26 91"/><path d="M50 56 L66 72 L75 91"/></g><circle cx="50" cy="19" r="9" fill="currentColor"/></svg>'
  ];

  function luminance(hex) {
    var n = parseInt(hex.slice(1), 16);
    return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  }
  B.brightest = function (colors) {
    return colors.slice().sort(function (a, b) { return luminance(b) - luminance(a); })[0];
  };
  B.colorVars = function (m) {
    var c = m.colors || ["#444444", "#111111", "#ffffff"];
    return "--c1:" + c[0] + ";--c2:" + c[1] + ";--c3:" + c[2] + ";";
  };
  function longestWord(s) {
    return Math.max(6, String(s).split(/\s+/).reduce(function (n, w) { return Math.max(n, w.length); }, 0));
  }
  B.coverHTML = function (m) {
    var layout = m.layout || 1;
    var esc = B.esc;
    return (
      '<div class="cover l' + layout + '">' +
        (layout === 2 ? '<span class="cv-band"></span>' : "") +
        '<div class="cv-top"><span>' + esc(m.country) + "</span><span>" + esc(m.year) + "</span></div>" +
        '<div class="cv-art">' + FIGHTERS[layout % 2] + "</div>" +
        '<h3 class="cv-title" style="--len:' + longestWord(m.title) + '">' + esc(m.title) + "</h3>" +
        '<div class="cv-tag">' + esc(m.tagline || "") + "</div>" +
        '<div class="cv-studio"><span>BLURG HOME VIDEO</span><span>VHS</span></div>' +
        // a real poster sits on top of the generated cover; if it fails to load, the generated one shows
        (m.poster ? '<img class="cv-poster" src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster" loading="lazy" onerror="this.remove()">' : "") +
      "</div>"
    );
  };

  /* ---------- reveal on scroll: adds .in when an element enters view ---------- */
  B.reveal = function (els, threshold) {
    if (B.reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: threshold || 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ---------- scroll engine ----------
     Pages register B.onScroll(fn(y, vel)) and B.onResize(fn).
     Sets --lean and --swing on :root and drives the VCR display. */
  var scrollFns = [], resizeFns = [];
  B.onScroll = function (fn) { scrollFns.push(fn); };
  B.onResize = function (fn) { resizeFns.push(fn); };

  var osdMode = B.$("#osd-mode");
  var osdTime = B.$("#osd-time");
  var tracking = B.$(".tracking");
  var RUNTIME = 90 * 60; // the "tape" is 90 minutes long

  var lastY = window.scrollY, vel = 0, swing = 0, swingV = 0, lean = 0;
  var idleTimer = null, running = false;

  function fmt(sec) {
    sec = Math.floor(sec);
    var h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
    return h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function update(force) {
    var y = window.scrollY;
    scrollFns.forEach(function (fn) { fn(y, vel, force); });
    if (osdTime) {
      var max = root.scrollHeight - window.innerHeight;
      osdTime.textContent = "SP " + fmt((y / Math.max(1, max)) * RUNTIME);
    }
  }

  function frame() {
    var y = window.scrollY;
    vel += (y - lastY - vel) * 0.25;
    lastY = y;

    if (!B.reduceMotion) {
      lean += (B.clamp(-vel * 0.18, -5, 5) - lean) * 0.2;
      swingV += (B.clamp(vel * 0.35, -14, 14) - swing) * 0.06;
      swingV *= 0.9;
      swing += swingV;
      root.style.setProperty("--lean", lean.toFixed(2) + "deg");
      root.style.setProperty("--swing", swing.toFixed(2) + "deg");
      if (tracking) tracking.classList.toggle("on", Math.abs(vel) > 45);
    }
    if (osdMode && Math.abs(vel) > 0.5) {
      osdMode.textContent = Math.abs(vel) > 45 ? (vel > 0 ? "▶▶ FF" : "◀◀ REW") : (vel > 0 ? "▶ PLAY" : "◀ REV");
    }
    update(false);

    if (Math.abs(vel) < 0.05 && Math.abs(swing) < 0.05 && Math.abs(swingV) < 0.05 && Math.abs(lean) < 0.05) {
      running = false;
      root.style.setProperty("--lean", "0deg");
      root.style.setProperty("--swing", "0deg");
      return;
    }
    requestAnimationFrame(frame);
  }

  function kick() {
    if (!running) { running = true; requestAnimationFrame(frame); }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { if (osdMode) osdMode.textContent = "❚❚ PAUSE"; }, 900);
  }

  B.refresh = function () {
    resizeFns.forEach(function (fn) { fn(); });
    update(true);
  };

  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", B.refresh);
  window.addEventListener("load", B.refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(B.refresh);

  /* ---------- nav: highlight the current page ---------- */
  var page = document.body.getAttribute("data-page");
  B.$$(".nav-links a").forEach(function (a) {
    if (a.getAttribute("data-page") === page) {
      a.setAttribute("aria-current", "page");
      // on phones the links scroll sideways: bring the current one into view
      var row = a.parentNode;
      var centre = function () {
        if (row.scrollWidth <= row.clientWidth) return;
        var ar = a.getBoundingClientRect(), rr = row.getBoundingClientRect();
        row.scrollLeft += ar.left - rr.left - (rr.width - ar.width) / 2;
      };
      centre();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(centre);
    }
  });

  var yr = B.$("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
