/* =============================================================
   THE BLURGBLOG — Coming Soon page
   needs: reviews.js, upcoming.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc;
  var reviewed = {};
  (window.REVIEWS || []).forEach(function (r) { reviewed[r.slug] = true; });

  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var STATUS = {
    "reviewing": "REWINDING NOW",
    "writing": "WATCHED · WRITING",
    "in-transit": "IN TRANSIT",
    "on-order": "ON ORDER",
    "shelf": "NOW ON THE SHELF",
    "late": "RUNNING LATE"
  };

  function parseDate(s) {
    var p = String(s).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  var today = new Date(); today.setHours(0, 0, 0, 0);

  var list = (window.UPCOMING || []).map(function (m) {
    var d = parseDate(m.date);
    var st = m.slug && reviewed[m.slug] ? "shelf" : (d < today ? "late" : m.status || "on-order");
    return Object.assign({}, m, { d: d, st: st });
  }).sort(function (a, b) { return a.d - b.d; });

  /* ---------- letterboard: each letter gets its own slightly crooked tile ---------- */
  $$(".lb-line").forEach(function (el) {
    var text = el.getAttribute("data-letters");
    el.setAttribute("aria-label", el.textContent);
    var i = 0;
    el.innerHTML = text.split(" ").map(function (word) {
      var letters = word.split("").map(function (ch) {
        var r = (Math.sin(++i * 12.9898) * 43758.5453) % 1; // stable pseudo-random
        return '<span class="lb-letter" style="--r:' + (r * 4).toFixed(2) + "deg;--y:" + (r * 3).toFixed(1) + 'px;--d:' + i * 45 + 'ms">' + esc(ch) + "</span>";
      }).join("");
      return '<span class="lb-word" aria-hidden="true">' + letters + "</span>";
    }).join("");
  });

  /* ---------- next up: the featured tape + countdown ---------- */
  var next = list.filter(function (m) { return m.st !== "shelf" && m.d >= today; })[0];
  var nextEl = $("#next-up");
  if (next) {
    nextEl.style.cssText = B.colorVars(next) + "--hi:" + B.brightest(next.colors) + ";";
    nextEl.innerHTML =
      '<div class="nu-tape reveal">' +
        '<div class="nu-box">' + B.coverHTML(next) + '<span class="nu-sticker">COMING<br>SOON</span></div>' +
      "</div>" +
      '<div class="nu-info reveal">' +
        '<p class="nu-kicker">NEXT NEW RELEASE · ' + DAYS[next.d.getDay()] + " " + MONTHS[next.d.getMonth()] + " " + next.d.getDate() + "</p>" +
        '<h2 id="next-title">' + esc(next.title) + "</h2>" +
        '<p class="nu-meta">' + esc(next.year) + " · " + esc(next.country) + " · dir. " + esc(next.director) + "</p>" +
        '<p class="nu-note">' + esc(next.note) + "</p>" +
        '<div class="countdown" aria-live="off" aria-label="Time until the review goes up">' +
          '<div><b id="cd-d">00</b><span>DAYS</span></div>' +
          '<div><b id="cd-h">00</b><span>HRS</span></div>' +
          '<div><b id="cd-m">00</b><span>MIN</span></div>' +
          '<div><b id="cd-s">00</b><span>SEC</span></div>' +
        "</div>" +
        '<span class="sp-status s-' + next.st + '">' + STATUS[next.st] + "</span>" +
      "</div>";

    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var tick = function () {
      var ms = Math.max(0, next.d - new Date());
      var s = Math.floor(ms / 1000);
      $("#cd-d").textContent = pad(Math.floor(s / 86400));
      $("#cd-h").textContent = pad(Math.floor(s / 3600) % 24);
      $("#cd-m").textContent = pad(Math.floor(s / 60) % 60);
      $("#cd-s").textContent = pad(s % 60);
    };
    tick();
    setInterval(tick, 1000);
  } else {
    nextEl.innerHTML = '<p class="section-sub">Nothing scheduled yet. The truck is empty. Check back soon.</p>';
  }

  /* ---------- the spine stack ---------- */
  var REEL = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#e9e4d8"/><circle cx="20" cy="20" r="6" fill="#111"/><g fill="#111"><rect x="18.5" y="3" width="3" height="9" rx="1"/><rect x="18.5" y="28" width="3" height="9" rx="1"/><rect x="3" y="18.5" width="9" height="3" rx="1"/><rect x="28" y="18.5" width="9" height="3" rx="1"/></g></svg>';

  $("#spines").innerHTML = list.map(function (m, i) {
    var label =
      '<div class="sp-label">' +
        '<h3>' + esc(m.title) + "</h3>" +
        '<p class="sp-meta">' + esc(m.year) + " · " + esc(m.country) + " · dir. " + esc(m.director) +
          ' · <span class="sp-kind ' + (m.kind === "bad" ? "bad" : "") + '">' + (m.kind === "bad" ? "AISLE 2: SO BAD" : "AISLE 1: CLASSIC") + "</span></p>" +
        '<p class="sp-note">' + esc(m.note) + "</p>" +
      "</div>";
    var body =
      '<div class="sp-date"><b>' + MONTHS[m.d.getMonth()] + "</b><span>" + m.d.getDate() + "</span><small>" + DAYS[m.d.getDay()] + "</small></div>" +
      label +
      '<span class="sp-status s-' + m.st + '">' + STATUS[m.st] + "</span>" +
      '<div class="sp-window" aria-hidden="true"><i class="reel">' + REEL + '</i><i class="reel">' + REEL + "</i></div>";
    var inner = m.st === "shelf"
      ? '<a class="sp-body" href="index.html#/review/' + esc(m.slug) + '">' + body + "</a>"
      : '<div class="sp-body">' + body + "</div>";
    return '<li class="spine ' + (i % 2 ? "from-right" : "from-left") + (m.st === "reviewing" ? " is-live" : "") + '" style="' + B.colorVars(m) + '">' + inner + "</li>";
  }).join("");

  B.reveal($$(".spine, .reveal"));

  /* ---------- scroll effects: letterboard parallax + reels spin with scroll ---------- */
  var root = document.documentElement;
  var board = $(".letterboard");
  B.onScroll(function (y) {
    if (y < window.innerHeight * 1.2) board.style.transform = "translate3d(0," + (y * -0.12).toFixed(1) + "px,0)";
    if (!B.reduceMotion) root.style.setProperty("--spin", (y * 0.6).toFixed(1) + "deg");
  });
  B.refresh();
})();
