/* =============================================================
   THE BLURGBLOG — The Golden Blurgs page
   needs: reviews.js, awards.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc;
  var bySlug = {};
  (window.REVIEWS || []).forEach(function (r) { bySlug[r.slug] = r; });

  function youtubeId(url) {
    if (!url) return "";
    var m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(url) ? url : "";
  }
  function safeUrl(u) {
    // only allow http(s) links and relative file paths
    return /^(https?:\/\/|[\w./-]+$)/i.test(String(u)) && !/^javascript:/i.test(u) ? u : "";
  }

  var STATIC = '<div class="static"><span class="no-signal">NO SIGNAL</span><small>Add a GIF or YouTube link in js/awards.js</small></div>';

  function screenHTML(a, title) {
    var yt = youtubeId(a.youtube);
    if (yt) {
      return '<button class="yt-facade" type="button" data-yt="' + yt + '" aria-label="Play the scene from ' + esc(title) + ' (YouTube)" style="background-image:url(https://i.ytimg.com/vi/' + yt + '/hqdefault.jpg)">' +
        '<span class="yt-play" aria-hidden="true">▶</span><span class="yt-label">PLAY</span></button>';
    }
    if (safeUrl(a.gif)) {
      return '<img src="' + esc(a.gif) + '" alt="' + esc(a.scene + " — " + title) + '" loading="lazy">';
    }
    if (safeUrl(a.video)) {
      return '<video src="' + esc(a.video) + '" autoplay muted loop playsinline aria-label="' + esc(a.scene + " — " + title) + '"></video>';
    }
    return STATIC;
  }

  var list = $("#awards");
  list.innerHTML = (window.AWARDS || []).map(function (a, i) {
    var r = bySlug[a.slug] || {};
    var film = {
      title: a.title || r.title || "Untitled",
      year: a.year || r.year || "",
      country: a.country || r.country || "",
      colors: a.colors || r.colors
    };
    var links = [];
    if (r.slug) links.push('<a href="index.html#/review/' + esc(r.slug) + '">Read the review</a>');
    var yt = youtubeId(a.youtube);
    if (yt) links.push('<a href="https://www.youtube.com/watch?v=' + yt + '" target="_blank" rel="noopener">Watch on YouTube ↗</a>');
    if (safeUrl(a.link)) links.push('<a href="' + esc(a.link) + '" target="_blank" rel="noopener">Watch the scene ↗</a>');

    return (
      '<article class="award ' + (i % 2 ? "flip" : "") + '" style="' + B.colorVars(film) + '">' +
        '<div class="tv">' +
          '<div class="tv-screen">' + screenHTML(a, film.title) + "</div>" +
          '<div class="tv-panel" aria-hidden="true"><span class="tv-brand">BLURGVISION</span><span class="knob"></span><span class="knob"></span></div>' +
        "</div>" +
        '<div class="plaque">' +
          '<p class="aw-num">AWARD Nº ' + (i + 1) + "</p>" +
          '<h2 class="aw-cat">' + esc(a.award) + "</h2>" +
          '<p class="aw-winner"><span>WINNER</span>' + esc(film.title) + " <small>" + esc(film.year) + (film.country ? " · " + esc(film.country) : "") + "</small></p>" +
          '<p class="aw-scene">“' + esc(a.scene) + "”</p>" +
          '<p class="aw-why">' + esc(a.why) + "</p>" +
          (links.length ? '<p class="aw-links">' + links.join("") + "</p>" : "") +
        "</div>" +
      "</article>"
    );
  }).join("");

  // broken GIF/video paths fall back to static
  $$(".tv-screen img, .tv-screen video").forEach(function (el) {
    el.addEventListener("error", function () { el.parentNode.innerHTML = STATIC; });
  });

  // click-to-play YouTube (nothing loads from YouTube until pressed)
  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".yt-facade");
    if (!btn) return;
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + btn.getAttribute("data-yt") + "?autoplay=1&rel=0";
    f.title = btn.getAttribute("aria-label");
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    btn.replaceWith(f);
  });

  // TVs switch on as they scroll into view
  B.reveal($$(".award"), 0.3);

  // scroll effects: spotlights sweep, trophy rises and turns
  var root = document.documentElement;
  var trophy = $(".trophy");
  B.onScroll(function (y) {
    if (B.reduceMotion) return;
    root.style.setProperty("--sweep", (Math.sin(y / 260) * 18).toFixed(2) + "deg");
    if (y < window.innerHeight * 1.2) {
      trophy.style.transform = "translate3d(0," + (y * -0.25).toFixed(1) + "px,0) rotateY(" + (y * 0.3).toFixed(1) + "deg)";
    }
  });
  B.refresh();
})();
