/* =============================================================
   THE BLURGBLOG — main page (the shelves)
   needs: reviews.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc, clamp = B.clamp;
  var REVIEWS = window.REVIEWS || [];
  var bySlug = {};
  REVIEWS.forEach(function (m) { bySlug[m.slug] = m; });

  function tapeHTML(m, i) {
    var isBad = m.category === "bad";
    var score = isBad ? "FUN " + m.fun : "★ " + m.craft;
    var price = isBad ? "99¢<small>5 NIGHTS</small>" : "$2.99<small>2 NIGHTS</small>";
    return (
      '<article class="tape" data-slug="' + esc(m.slug) + '" style="--i:' + (i % 6) + ";" + B.colorVars(m) + '">' +
        '<div class="tilt">' +
          '<button class="box" type="button" aria-label="Read the review of ' + esc(m.title) + " (" + m.year + ')">' +
            B.coverHTML(m) +
            '<span class="sticker st-score">' + score + "</span>" +
            '<span class="sticker st-price">' + price + "</span>" +
            (isBad ? '<span class="sticker st-bad">BAD!</span>' : "") +
            '<span class="sticker st-rewind">BE KIND<br>REWIND</span>' +
          "</button>" +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- build the shelves ---------- */
  $$(".shelf").forEach(function (shelf) {
    var cat = shelf.getAttribute("data-cat");
    shelf.innerHTML =
      REVIEWS.filter(function (m) { return m.category === cat; }).map(tapeHTML).join("") +
      '<p class="shelf-empty" hidden>All rented out! Nothing here matches.</p>';
  });

  var picksTrack = $("#picks-track");
  var rot = ["3deg", "-2deg", "4deg", "-3deg", "2deg"];
  picksTrack.innerHTML = REVIEWS.filter(function (m) { return m.staffPick; }).map(function (m, i) {
    return (
      '<div class="pick">' + tapeHTML(m, i) +
      '<div class="talker" style="--r:' + rot[i % rot.length] + '"><b>STAFF PICK</b>' + esc(m.verdict) + "</div>" +
      "</div>"
    );
  }).join("");

  B.reveal($$(".shelf .tape"));

  /* ---------- filters ---------- */
  var countries = REVIEWS.map(function (m) { return m.country; })
    .filter(function (c, i, a) { return a.indexOf(c) === i; }).sort();
  var chipsEl = $("#country-chips");
  chipsEl.innerHTML = ["All"].concat(countries).map(function (c) {
    return '<button type="button" class="chip" data-country="' + esc(c) + '" aria-pressed="' + (c === "All") + '">' + esc(c) + "</button>";
  }).join("");

  var state = { country: "All", q: "" };
  function applyFilters() {
    var any = false;
    $$(".shelf").forEach(function (shelf) {
      var visible = 0;
      $$(".tape", shelf).forEach(function (t) {
        var m = bySlug[t.getAttribute("data-slug")];
        var hay = (m.title + " " + m.director + " " + m.starring + " " + m.country + " " + m.year).toLowerCase();
        var ok = (state.country === "All" || m.country === state.country) && hay.indexOf(state.q) !== -1;
        t.classList.toggle("gone", !ok);
        if (ok) visible++;
      });
      $(".shelf-empty", shelf).hidden = visible > 0;
      if (visible) any = true;
    });
    $("#empty").hidden = any;
    B.refresh();
  }
  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    state.country = b.getAttribute("data-country");
    $$(".chip", chipsEl).forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    applyFilters();
  });
  $("#search").addEventListener("input", function (e) {
    state.q = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  /* ---------- scroll effects: hero parallax + staff picks aisle ---------- */
  var parallax = $$("[data-speed]");
  var heroSign = $(".sign-wrap");
  var pinned = $("#staff-picks");
  var bar = $("#picks-bar");
  var pin = { top: 0, height: 0, dist: 0 };

  B.onResize(function () {
    pin.dist = Math.max(0, picksTrack.scrollWidth - window.innerWidth);
    pinned.style.height = (window.innerHeight + pin.dist) + "px";
    pin.top = pinned.getBoundingClientRect().top + window.scrollY;
    pin.height = pinned.offsetHeight;
  });

  B.onScroll(function (y, vel, force) {
    var vh = window.innerHeight;
    if (y < vh * 1.3 || force) {
      parallax.forEach(function (el) {
        el.style.transform = "translate3d(0," + (y * parseFloat(el.getAttribute("data-speed"))).toFixed(1) + "px,0)";
      });
      heroSign.style.opacity = clamp(1 - y / (vh * 0.8), 0, 1).toFixed(3);
    }
    var p = pin.dist ? clamp((y - pin.top) / (pin.height - vh), 0, 1) : 0;
    picksTrack.style.transform = "translate3d(" + (-p * pin.dist).toFixed(1) + "px,0,0)";
    bar.style.width = (p * 100).toFixed(1) + "%";
  });

  B.refresh();

  /* ---------- review modal ---------- */
  var modal = $("#review");
  var card = $(".box-back", modal);
  var lastFocus = null;
  var current = -1;
  var baseTitle = document.title;

  function meter(label, v) {
    var cells = "";
    for (var i = 1; i <= 5; i++) cells += '<i style="--f:' + clamp(v - (i - 1), 0, 1) * 100 + '%"></i>';
    return '<div class="meter"><span>' + label + '</span><span class="meter-bar">' + cells + "</span><span>" + v + "/5</span></div>";
  }

  function render(m) {
    card.setAttribute("style", B.colorVars(m) + "--hi:" + B.brightest(m.colors) + ";");
    $("#rv-cover").innerHTML = B.coverHTML(m);
    $("#rv-meta").textContent = m.country + " · " + m.year + " · " + (m.category === "bad" ? "So bad it's glorious" : "Certified classic");
    $("#rv-title").textContent = m.title;
    $("#rv-tag").textContent = "“" + m.tagline + "”";
    $("#rv-scores").innerHTML = meter("CRAFT", m.craft) + meter("FUN", m.fun);
    $("#rv-verdict").textContent = m.verdict;
    $("#rv-text").innerHTML = m.review.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#rv-best").textContent = m.bestMoment;
    $("#rv-watch").textContent = m.watchIf;
    $("#rv-credits").innerHTML = "Directed by " + esc(m.director) + "<br>Starring " + esc(m.starring);
    document.title = m.title + " (" + m.year + ") — The Blurgblog";
  }

  function route() {
    var match = location.hash.match(/^#\/review\/([\w-]+)/);
    var m = match && bySlug[match[1]];
    if (m) {
      current = REVIEWS.indexOf(m);
      render(m);
      if (modal.hidden) {
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.classList.add("modal-open");
      }
      card.scrollTop = 0;
      card.focus();
    } else if (!modal.hidden) {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
      document.title = baseTitle;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
  }

  function close() {
    history.pushState(null, "", location.pathname + location.search);
    route();
  }
  function step(d) {
    var n = (current + d + REVIEWS.length) % REVIEWS.length;
    history.replaceState(null, "", "#/review/" + REVIEWS[n].slug);
    route();
  }

  document.addEventListener("click", function (e) {
    var box = e.target.closest(".box");
    if (box) { location.hash = "#/review/" + box.closest(".tape").getAttribute("data-slug"); return; }
    if (e.target.closest("[data-close]")) close();
  });
  $("#rv-prev").addEventListener("click", function () { step(-1); });
  $("#rv-next").addEventListener("click", function () { step(1); });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {
      var f = $$("button", card);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.addEventListener("hashchange", route);
  route();
})();
