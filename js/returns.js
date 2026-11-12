/* =============================================================
   THE BLURGBLOG — Returns (comments)
   needs: reviews.js, returns-config.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc;
  var CFG = window.RETURNS_BACKEND || { type: "local" };
  var REVIEWS = window.REVIEWS || [];
  var MAX_NAME = 40, MAX_TEXT = 600, COOLDOWN = 20000;

  var PALETTES = [
    ["#ff4fb3", "#2a0a5e"], ["#ffcf3f", "#e0461b"], ["#9cff3a", "#0b1d05"], ["#1b6ef3", "#061a3d"],
    ["#ff2d2d", "#1a0000"], ["#ff8a00", "#2a0b3d"], ["#00e0ff", "#120a3a"], ["#ffe600", "#e0185f"],
    ["#1d6b3a", "#07170d"], ["#e8c06a", "#5b2c0f"]
  ];
  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function hash(s) {
    s = String(s); var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  /* =============================================================
     STORAGE — "local" (this browser only) or "supabase" (shared)
     ============================================================= */
  var LOCAL_KEY = "blurg-returns";
  var localStore = {
    shared: false,
    list: function () {
      try { return Promise.resolve(JSON.parse(localStorage.getItem(LOCAL_KEY)) || []); }
      catch (e) { return Promise.resolve([]); }
    },
    add: function (c) {
      var all;
      try { all = JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch (e) { all = []; }
      c.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      c.created_at = new Date().toISOString();
      all.unshift(c);
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(all.slice(0, 200))); }
      catch (e) { return Promise.reject(new Error("This browser won't let us save. Try another browser.")); }
      return Promise.resolve(c);
    }
  };

  function supabaseStore(cfg) {
    var base = String(cfg.url).replace(/\/+$/, "") + "/rest/v1/returns";
    var headers = { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey };
    function ok(r) { if (!r.ok) throw new Error("The bin is jammed (" + r.status + "). Try again in a minute."); return r.json(); }
    return {
      shared: true,
      list: function () {
        return fetch(base + "?select=id,name,movie,comment,created_at&order=created_at.desc&limit=200", { headers: headers }).then(ok);
      },
      add: function (c) {
        return fetch(base, {
          method: "POST",
          headers: Object.assign({ "Content-Type": "application/json", Prefer: "return=representation" }, headers),
          body: JSON.stringify({ name: c.name || null, movie: c.movie, comment: c.comment })
        }).then(ok).then(function (rows) { return rows[0]; });
      }
    };
  }

  var store = CFG.type === "supabase" && CFG.url && CFG.anonKey ? supabaseStore(CFG) : localStore;

  /* =============================================================
     THE FORM
     ============================================================= */
  var form = $("#return-form");
  var fName = $("#f-name"), fMovie = $("#f-movie"), fComment = $("#f-comment");
  var fCount = $("#f-count"), fMsg = $("#f-msg"), fSubmit = $("#f-submit");

  var movieOpts = ["General chatter", "Suggest a movie for review"].concat(REVIEWS.map(function (r) { return r.title; }));
  fMovie.innerHTML = movieOpts.map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");
  // returns.html?movie=the-raid preselects that film
  var want = new URLSearchParams(location.search).get("movie");
  REVIEWS.forEach(function (r) { if (r.slug === want) fMovie.value = r.title; });

  $("#slip-no").textContent = "Nº " + String(Date.now()).slice(-6);

  fComment.addEventListener("input", function () {
    fCount.textContent = fComment.value.length + " / " + MAX_TEXT;
    fCount.classList.toggle("near", fComment.value.length > MAX_TEXT - 60);
  });

  var lastPost = 0;
  try { lastPost = +sessionStorage.getItem("blurg-returns-last") || 0; } catch (e) {}

  function setMsg(text, kind) {
    fMsg.textContent = text;
    fMsg.className = "form-msg" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = fName.value.trim().slice(0, MAX_NAME);
    var comment = fComment.value.trim().slice(0, MAX_TEXT);
    if ($("#f-trap").value) return; // a bot filled the hidden field
    if (comment.length < 2) { setMsg("The slip is blank! Write a comment first.", "err"); fComment.focus(); return; }
    var wait = COOLDOWN - (Date.now() - lastPost);
    if (wait > 0) { setMsg("Whoa, slow down. The slot needs " + Math.ceil(wait / 1000) + " more seconds.", "err"); return; }

    fSubmit.disabled = true;
    setMsg("Dropping it in…");
    var flight = flyTape();

    store.add({ name: name, movie: fMovie.value, comment: comment }).then(function (saved) {
      return flight.then(function () {
        lastPost = Date.now();
        try { sessionStorage.setItem("blurg-returns-last", String(lastPost)); } catch (e) {}
        form.reset();
        fCount.textContent = "0 / " + MAX_TEXT;
        $("#slip-no").textContent = "Nº " + String(Date.now()).slice(-6);
        setMsg("Returned! Thanks — it's in the bin below ▼", "ok");
        comments.unshift(saved);
        renderBin(saved);
      });
    }).catch(function (err) {
      setMsg(err && err.message ? err.message : "Something jammed. Try again.", "err");
    }).then(function () { fSubmit.disabled = false; });
  });

  /* a little VHS tape flies from the button into the slot */
  function flyTape() {
    var slot = $("#slot"), flap = $("#flap");
    if (B.reduceMotion || !document.body.animate) {
      flap.classList.add("open");
      return new Promise(function (r) { setTimeout(function () { flap.classList.remove("open"); r(); }, 400); });
    }
    var from = fSubmit.getBoundingClientRect(), to = slot.getBoundingClientRect();
    var tape = document.createElement("div");
    tape.className = "flying-tape";
    document.body.appendChild(tape);
    var sx = from.left + from.width / 2 - 45, sy = from.top - 10;
    var tx = to.left + to.width / 2 - 45, ty = to.top + to.height / 2 - 15;
    flap.classList.add("open");
    var anim = tape.animate([
      { transform: "translate(" + sx + "px," + sy + "px) rotate(-20deg) scale(.7)", opacity: 0 },
      { transform: "translate(" + sx + "px," + (sy - 80) + "px) rotate(-8deg) scale(1)", opacity: 1, offset: .25 },
      { transform: "translate(" + tx + "px," + (ty - 70) + "px) rotate(0deg) scale(1)", opacity: 1, offset: .7 },
      { transform: "translate(" + tx + "px," + (ty + 10) + "px) rotate(0deg) scale(.95, .2)", opacity: 0 }
    ], { duration: 1100, easing: "cubic-bezier(.45,0,.3,1)" });
    return anim.finished.then(function () {
      tape.remove();
      flap.classList.remove("open");
      var box = $("#dropbox");
      box.classList.add("thunk");
      setTimeout(function () { box.classList.remove("thunk"); }, 400);
    });
  }

  /* =============================================================
     THE BIN — every comment is a VHS case
     ============================================================= */
  var comments = [];
  var casesEl = $("#cases");

  function stamp(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return MONTHS[d.getMonth()] + " " + d.getDate() + " '" + String(d.getFullYear()).slice(-2);
  }

  function caseHTML(c, opts) {
    opts = opts || {};
    var key = c.id || c.created_at || c.comment;
    var pal = PALETTES[hash(key) % PALETTES.length];
    var name = (c.name || "").trim() || "Anonymous renter";
    var movie = c.movie || "General chatter";
    var member = String(hash(name) % 10000).padStart(4, "0");
    var tilt = ((hash(key) % 5) - 2) * 0.6;
    return (
      '<article class="vcase' + (opts.pinned ? " is-staff" : "") + (opts.fresh ? " fresh" : "") + '" style="--c1:' + pal[0] + ";--c2:" + pal[1] + ";--tilt:" + tilt + 'deg">' +
        '<div class="vc-spine" aria-hidden="true"><span>' + esc(name) + "</span></div>" +
        '<div class="vc-front">' +
          '<header class="vc-band">' +
            '<span class="vc-movie">RE: ' + esc(movie) + "</span>" +
            '<span class="vc-stamp">RETURNED<b>' + esc(stamp(c.created_at)) + "</b></span>" +
          "</header>" +
          '<blockquote class="vc-text">' + esc(c.comment) + "</blockquote>" +
          '<footer class="vc-foot"><b>— ' + esc(name) + "</b><span>MEMBER #" + member + "</span></footer>" +
        "</div>" +
        (opts.pinned ? '<span class="vc-sticker staff">STAFF</span>' : "") +
        (opts.fresh ? '<span class="vc-sticker new">JUST RETURNED</span>' : "") +
        (!opts.pinned && hash(key) % 4 === 0 ? '<span class="vc-sticker rewind">BE KIND<br>REWIND</span>' : "") +
      "</article>"
    );
  }

  function renderBin(fresh) {
    var pinned = window.RETURNS_PINNED;
    var html = (pinned ? caseHTML(pinned, { pinned: true }) : "") +
      comments.map(function (c) { return caseHTML(c, { fresh: c === fresh }); }).join("");
    casesEl.innerHTML = html;
    var n = comments.length;
    $("#bin-count").textContent = n ? n + (n === 1 ? " tape" : " tapes") + " in the bin. Newest on top." : "The bin is empty. Be the first to return something.";
    var cases = $$(".vcase", casesEl);
    cases.forEach(function (el, i) { el.style.setProperty("--i", i % 3); });
    if (fresh) cases.forEach(function (el) { el.classList.add("in"); });
    else B.reveal(cases, 0.1);
    B.refresh();
  }

  if (!store.shared) {
    var note = $("#mode-note");
    note.hidden = false;
    note.textContent = "Preview mode: returns are saved in this browser only, so other visitors can't see them yet.";
  }

  store.list().then(function (rows) {
    comments = (rows || []).filter(function (c) { return c && c.comment; });
    renderBin();
  }).catch(function () {
    $("#bin-count").textContent = "Couldn't open the bin right now. Try refreshing.";
    renderBin();
  });

  /* ---------- scroll effect: the drop box sinks back as you head to the bin ---------- */
  var box = $("#dropbox");
  B.onScroll(function (y) {
    if (B.reduceMotion || y > window.innerHeight * 1.5) return;
    box.style.setProperty("--sink", Math.min(1, y / (window.innerHeight * 1.2)).toFixed(3));
  });
  B.refresh();
})();
