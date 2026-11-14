/* =============================================================
   THE BACKROOMS — secret book club page
   needs: books.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc, clamp = B.clamp;
  var CLUB = window.BOOK_CLUB || { nowReading: null, pile: [], rules: [] };
  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function parseDate(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function colorVars(b) { var c = b.colors || ["#444", "#111", "#fff"]; return "--c1:" + c[0] + ";--c2:" + c[1] + ";--c3:" + c[2] + ";"; }

  /* ---------- now reading ---------- */
  var nr = CLUB.nowReading;
  if (nr) {
    var book = $("#nr-book");
    book.style.cssText = colorVars(nr);
    book.innerHTML =
      '<div class="cover-face">' +
        '<span class="cf-top">' + esc(nr.year) + "</span>" +
        '<span class="cf-title">' + esc(nr.title) + "</span>" +
        (nr.subtitle ? '<span class="cf-sub">' + esc(nr.subtitle) + "</span>" : "") +
        '<span class="cf-author">' + esc(nr.author) + "</span>" +
      "</div>";
    $("#nr-name").textContent = nr.title + (nr.subtitle ? ": " + nr.subtitle : "");
    $("#nr-sub").textContent = nr.author + " · " + nr.year;
    $("#nr-blurb").textContent = nr.blurb || "";
    $("#nr-where").textContent = CLUB.where || "";
    var gr = $("#nr-goodreads");
    gr.href = goodreadsUrl(nr);
    gr.hidden = false;

    var nextFound = false;
    $("#due-rows").innerHTML = (nr.meetings || []).map(function (m, i) {
      var d = parseDate(m.date);
      var past = d < today;
      var isNext = !past && !nextFound;
      if (isNext) nextFound = true;
      return '<li class="due-row' + (past ? " past" : "") + (isNext ? " next" : "") + '" style="--i:' + i + ";--r:" + ((i * 7 % 9) - 4) + 'deg">' +
        '<span class="stamp">' + MONTHS[d.getMonth()] + " " + d.getDate() + "</span>" +
        '<span class="due-read">' + esc(m.read) + (isNext ? ' <b class="next-tag">NEXT MEETING</b>' : "") + "</span>" +
      "</li>";
    }).join("");
  }

  /* ---------- the pile: spines on a shelf ---------- */
  var pile = CLUB.pile || [];
  var pileEl = $("#pile"), card = $("#pile-card");
  // the book's Goodreads page, or a Goodreads search if none is set
  function goodreadsUrl(b) {
    if (/^https:\/\/(www\.)?goodreads\.com\//i.test(b.goodreads || "")) return b.goodreads;
    return "https://www.goodreads.com/search?q=" + encodeURIComponent(b.title + " " + b.author);
  }

  // each book's state comes from its meeting date:
  // past = "read", the soonest future date = "next", later ones = "pile"
  var nextIdx = -1, nextTime = Infinity;
  pile.forEach(function (b, i) {
    b._date = b.meeting ? parseDate(b.meeting) : null;
    b._state = b._date && b._date < today ? "read" : "pile";
    if (b._state === "pile" && b._date && b._date.getTime() < nextTime) { nextTime = b._date.getTime(); nextIdx = i; }
  });
  if (nextIdx >= 0) pile[nextIdx]._state = "next";
  var KICKER = { read: "ALREADY READ", next: "NEXT UP", pile: "ON THE PILE" };

  pileEl.innerHTML = pile.map(function (b, i) {
    var w = 46 + (b.title.length % 4) * 6;        // books are different thicknesses
    var h = 250 + ((b.title.length * 7) % 5) * 12; // ...and heights
    return '<a class="spine-book' + (b._state === "next" ? " is-next" : "") + '" data-i="' + i + '" ' +
      'href="' + esc(goodreadsUrl(b)) + '" target="_blank" rel="noopener" ' +
      'style="' + colorVars(b) + "--w:" + w + "px;--h:" + h + "px;--d:" + i * 90 + 'ms" ' +
      'aria-label="' + esc(b.title) + " by " + esc(b.author) + ' — open on Goodreads (new tab)">' +
        '<span class="sb-title">' + esc(b.title) + "</span>" +
        '<span class="sb-author">' + esc(b.author.split(" ").slice(-1)[0]) + "</span>" +
        (b._state === "next" ? '<span class="sb-next" aria-hidden="true">NEXT<br>UP</span>' : "") +
      "</a>";
  }).join("") + '<span class="bookend" aria-hidden="true"></span>';

  function showBook(i) {
    var b = pile[i];
    if (!b) return;
    $$(".spine-book", pileEl).forEach(function (s) { s.classList.toggle("is-active", +s.getAttribute("data-i") === i); });
    card.style.cssText = colorVars(b);
    card.innerHTML =
      '<p class="pc-kicker">' + KICKER[b._state] + "</p>" +
      "<h3>" + esc(b.title) + "</h3>" +
      '<p class="pc-by">' + esc(b.author) + " · " + esc(b.year) + "</p>" +
      (b._date ? '<p class="pc-meet">' + (b._state === "read" ? "MET" : "MEETING") + " · " +
        MONTHS[b._date.getMonth()] + " " + b._date.getDate() + ", " + b._date.getFullYear() + "</p>" : "") +
      '<p class="pc-note">' + esc(b.note || "") + "</p>" +
      '<a class="gr-link" href="' + esc(goodreadsUrl(b)) + '" target="_blank" rel="noopener">See it on Goodreads ↗</a>';
  }
  // hovering or tabbing to a spine shows its card; clicking opens Goodreads
  ["mouseover", "focusin"].forEach(function (ev) {
    pileEl.addEventListener(ev, function (e) {
      var s = e.target.closest(".spine-book");
      if (s) showBook(+s.getAttribute("data-i"));
    });
  });
  // start on the next-up book, or the most recent one if they're all read
  if (pile.length) showBook(Math.max(0, nextIdx));

  /* ---------- rules ---------- */
  $("#rules").innerHTML = (CLUB.rules || []).map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");

  /* ---------- scroll effects ---------- */
  // reveal blocks, stamps and spines as they come into view
  B.reveal($$(".reveal"));
  B.reveal([$(".due-card")].filter(Boolean), 0.3);
  B.reveal([$(".bookshelf")], 0.25);

  // the door swings open as you scroll through the first screen
  var scene = $("#door-scene"), door = $("#door"), glow = $(".room-glow"), cue = $("#door-cue");
  var sceneTop = 0, sceneLen = 1;
  B.onResize(function () {
    sceneTop = scene.getBoundingClientRect().top + window.scrollY;
    sceneLen = Math.max(1, scene.offsetHeight - window.innerHeight);
  });
  B.onScroll(function (y) {
    var p = clamp((y - sceneTop) / sceneLen, 0, 1);
    if (B.reduceMotion) p = p > 0.05 ? 1 : 0;
    door.style.transform = "rotateY(" + (-p * 100).toFixed(1) + "deg)";
    glow.style.opacity = (0.15 + p * 0.85).toFixed(3);
    cue.style.opacity = clamp(1 - p * 3, 0, 1).toFixed(3);
  });
  B.refresh();
})();
