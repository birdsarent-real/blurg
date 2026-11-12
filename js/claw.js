/* =============================================================
   THE BLURGBLOG — The Claw of Doom
   needs: claw-data.js, shared.js
   ============================================================= */
(function () {
  "use strict";

  var B = window.Blurg;
  var $ = B.$, $$ = B.$$, esc = B.esc, clamp = B.clamp;
  var POOL = window.CLAW_PRIZES || [];

  var glass = $("#glass"), pile = $("#pile"), carriage = $("#carriage");
  var cable = $("#cable"), claw = $("#claw"), held = $("#held");
  var msg = $("#msg"), dropBtn = $("#drop");

  var PALETTES = [
    ["#ff4fb3", "#2a0a5e", "#2ef2ff"], ["#ffcf3f", "#e0461b", "#141414"], ["#9cff3a", "#0b1d05", "#ffffff"],
    ["#1b6ef3", "#061a3d", "#ffd400"], ["#ff2d2d", "#1a0000", "#ffd84a"], ["#ff8a00", "#2a0b3d", "#ffe600"],
    ["#2d3a3a", "#0b0f10", "#ff3b1f"], ["#f4f1ea", "#b3122d", "#151515"], ["#00e0ff", "#120a3a", "#ff3fa4"],
    ["#ffe600", "#e0185f", "#111111"], ["#1d6b3a", "#07170d", "#d8ff3d"], ["#e8c06a", "#5b2c0f", "#fff3d6"]
  ];
  var QUIPS = [
    "The claw has chosen. You must obey.",
    "Bad movie night is officially booked.",
    "Snacks recommended. Expectations not.",
    "Somebody made this on purpose. Respect it.",
    "Rewind it when you're done. Or don't. We won't check.",
    "A low score just means more room for surprises.",
    "Your friends will never forgive you. Invite them anyway.",
    "Grab a drink every time someone does a slow-motion kick."
  ];

  function rand(n) { return Math.floor(Math.random() * n); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function say(t) { msg.textContent = t; }

  /* ---------- prize pool: shuffled bag so you don't get repeats quickly ---------- */
  var bag = [];
  function nextPrize() {
    if (!bag.length) bag = POOL.map(function (_, i) { return i; }).sort(function () { return Math.random() - 0.5; });
    var m = POOL[bag.pop()];
    return Object.assign({ colors: PALETTES[rand(PALETTES.length)], layout: 1 + rand(4), country: "IMDb " + m.rating, tagline: "" }, m);
  }
  $("#pool-count").textContent = POOL.length + " BAD MOVIES INSIDE";

  /* ---------- the pile of tapes ---------- */
  // slots: [left %, bottom px, rotation, z]
  var SLOTS = [];
  [[24, 6], [36, 2], [48, 8], [60, 0], [72, 6], [84, 3], [30, 46], [42, 52], [54, 44], [66, 54], [78, 47], [90, 40]].forEach(function (s, i) {
    SLOTS.push({ left: s[0], bottom: s[1], rot: (i * 37 % 50) - 25, z: s[1] > 30 ? 1 : 2 });
  });

  function makeTape(m) {
    var el = document.createElement("div");
    el.className = "ptape";
    el.style.cssText = B.colorVars(m);
    el.innerHTML = B.coverHTML(m);
    el._movie = m;
    return el;
  }
  function placeTape(el, slot) {
    el._slot = slot;
    // spread the pile across the space right of the prize chute at any width
    el.style.left = "calc(126px + (100% - 156px) * " + ((slot.left - 24) / 66).toFixed(3) + ")";
    el.style.bottom = slot.bottom + "px";
    el.style.zIndex = slot.z;
    el.style.setProperty("--rot", slot.rot + "deg");
    pile.appendChild(el);
  }
  SLOTS.forEach(function (s) { placeTape(makeTape(nextPrize()), s); });

  /* ---------- claw position ---------- */
  var x = 0, minX = 0, maxX = 0, startX = 0, chuteX = 0, busy = false;
  function bounds() {
    var w = glass.clientWidth;
    minX = 46; maxX = w - 40; chuteX = 54; startX = w * 0.58;
    x = clamp(x || startX, minX, maxX);
    setX(x, true);
  }
  function setX(v, instant) {
    x = clamp(v, minX, maxX);
    carriage.style.transition = instant ? "none" : "";
    carriage.style.transform = "translateX(" + x.toFixed(1) + "px)";
  }
  window.addEventListener("resize", bounds);
  bounds();

  // hold-to-move
  var moveDir = 0, moveRaf = 0;
  function moveLoop() {
    if (!moveDir || busy) { moveRaf = 0; return; }
    carriage.style.transition = "none";
    setX(x + moveDir * 4, true);
    moveRaf = requestAnimationFrame(moveLoop);
  }
  function startMove(d) { if (busy) return; moveDir = d; if (!moveRaf) moveRaf = requestAnimationFrame(moveLoop); }
  function stopMove() { moveDir = 0; }
  [["#left", -1], ["#right", 1]].forEach(function (p) {
    var b = $(p[0]);
    b.addEventListener("pointerdown", function (e) { e.preventDefault(); b.setPointerCapture(e.pointerId); startMove(p[1]); });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (ev) { b.addEventListener(ev, stopMove); });
    b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setX(x + p[1] * 30); } });
  });
  document.addEventListener("keydown", function (e) {
    if (!$("#prize").hidden || e.target.closest("input, textarea")) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); startMove(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); startMove(1); }
    else if ((e.key === " " || e.key === "Enter") && !e.target.closest("button, a")) { e.preventDefault(); drop(); }
  });
  document.addEventListener("keyup", function (e) { if (e.key === "ArrowLeft" || e.key === "ArrowRight") stopMove(); });

  // tap the glass to aim (and tap again where the claw is to drop)
  glass.addEventListener("click", function (e) {
    if (busy) return;
    var r = glass.getBoundingClientRect();
    var tx = e.clientX - r.left;
    if (Math.abs(tx - x) < 24) { drop(); return; }
    setX(tx);
    say("AIMING… TAP AGAIN OR PRESS DROP");
  });

  /* ---------- the drop ---------- */
  var slippedLast = true; // first try never slips
  function targetUnderClaw() {
    var g = glass.getBoundingClientRect(), best = null, bestD = 34;
    $$(".ptape", pile).forEach(function (t) {
      var r = t.getBoundingClientRect();
      var d = Math.abs(r.left + r.width / 2 - g.left - x);
      // prefer the back row (higher up) when tapes overlap
      var score = d - (t._slot.bottom > 30 ? 6 : 0);
      if (score < bestD) { bestD = score; best = t; }
    });
    return best;
  }

  function setDrop(px, ms) {
    claw.style.transitionDuration = ms + "ms";
    cable.style.transitionDuration = ms + "ms";
    claw.style.transform = "translateY(" + px + "px)";
    cable.style.height = (18 + px) + "px";
    return wait(ms + 30);
  }

  async function drop() {
    if (busy) return;
    busy = true; stopMove();
    dropBtn.disabled = true;
    glass.classList.add("busy");
    say("DROPPING…");

    var g = glass.getBoundingClientRect();
    var target = targetUnderClaw();
    var clawRect = claw.getBoundingClientRect();
    var depth;
    if (target) {
      var tr = target.getBoundingClientRect();
      depth = tr.top - clawRect.bottom + 36;
    } else {
      depth = g.bottom - clawRect.bottom - 30;
    }
    depth = Math.max(40, depth);

    claw.classList.remove("closed");
    await setDrop(depth, B.reduceMotion ? 200 : 1300);
    claw.classList.add("closed");
    await wait(450);

    if (!target) {
      say("NOTHING BUT AIR. TRY AGAIN!");
      await setDrop(0, 1000);
      claw.classList.remove("closed");
      return finish();
    }

    // grab it
    var slip = !slippedLast && Math.random() < 0.3;
    var slot = target._slot;
    held.appendChild(target);
    target.classList.add("grabbed");
    say(slip ? "GOT IT… MAYBE…" : "GOT ONE!");
    await setDrop(0, B.reduceMotion ? 200 : 1300);

    if (slip) {
      slippedLast = true;
      claw.classList.add("wobble");
      await wait(500);
      claw.classList.remove("closed", "wobble");
      target.classList.remove("grabbed");
      placeTape(target, slot);
      target.classList.add("fall");
      setTimeout(function () { target.classList.remove("fall"); }, 700);
      say(["IT SLIPPED! THE CLAW IS WEAK.", "SO CLOSE! LIKE THE PLOT.", "DROPPED IT. CLASSIC CLAW."][rand(3)]);
      return finish();
    }
    slippedLast = false;

    // carry it to the chute
    say("DELIVERING…");
    carriage.style.transition = "";
    setX(chuteX);
    await wait(B.reduceMotion ? 200 : 1100);
    claw.classList.remove("closed");
    target.classList.add("into-chute");
    await wait(650);
    target.remove();

    // refill the empty slot with a fresh tape from the ceiling
    var fresh = makeTape(nextPrize());
    placeTape(fresh, slot);
    fresh.classList.add("fall");
    setTimeout(function () { fresh.classList.remove("fall"); }, 700);

    showPrize(target._movie);
    setX(startX);
    finish();
    say("WINNER! PRESS DROP TO PLAY AGAIN");
  }
  function finish() {
    busy = false;
    dropBtn.disabled = false;
    glass.classList.remove("busy");
  }
  dropBtn.addEventListener("click", drop);

  /* ---------- prize reveal ---------- */
  var prize = $("#prize"), card = $(".prize-card", prize), lastFocus = null;
  function stars(r) {
    var out = "";
    for (var i = 1; i <= 10; i++) out += '<i style="--f:' + clamp(r - (i - 1), 0, 1) * 100 + '%"></i>';
    return out;
  }
  function showPrize(m) {
    card.style.cssText = B.colorVars(m) + "--hi:" + B.brightest(m.colors) + ";";
    $("#pz-cover").innerHTML = B.coverHTML(m);
    $("#pz-title").textContent = m.title;
    $("#pz-meta").textContent = m.year + " · " + m.runtime;
    $("#pz-rating").innerHTML =
      '<span class="pz-stars" aria-hidden="true">' + stars(m.rating) + "</span>" +
      "<b>" + m.rating.toFixed(1) + "</b><span>/10 on IMDb · " + esc(m.votes) + " votes</span>";
    $("#pz-quip").textContent = QUIPS[rand(QUIPS.length)];
    $("#pz-imdb").href = "https://www.imdb.com/title/" + m.id + "/";
    lastFocus = document.activeElement;
    prize.hidden = false;
    document.body.classList.add("modal-open");
    card.focus();
    addWin(m);
  }
  function closePrize() {
    if (prize.hidden) return;
    prize.hidden = true;
    document.body.classList.remove("modal-open");
    (lastFocus && lastFocus.focus ? lastFocus : dropBtn).focus({ preventScroll: true });
  }
  prize.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closePrize(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePrize(); });

  /* ---------- your prize shelf (remembered in this browser only) ---------- */
  var KEY = "blurg-claw-wins";
  function loadWins() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveWins(w) { try { localStorage.setItem(KEY, JSON.stringify(w)); } catch (e) {} }
  var byId = {};
  POOL.forEach(function (m) { byId[m.id] = m; });
  function renderWins() {
    var wins = loadWins().filter(function (id) { return byId[id]; });
    $("#win-empty").hidden = wins.length > 0;
    $("#clear-wins").hidden = !wins.length;
    $("#win-list").innerHTML = wins.map(function (id) {
      var m = byId[id];
      return '<li><a href="https://www.imdb.com/title/' + m.id + '/" target="_blank" rel="noopener">' +
        '<b>' + esc(m.title) + '</b><span>' + m.year + " · ★ " + m.rating.toFixed(1) + "</span></a></li>";
    }).join("");
  }
  function addWin(m) {
    var wins = loadWins().filter(function (id) { return id !== m.id; });
    wins.unshift(m.id);
    saveWins(wins.slice(0, 24));
    renderWins();
  }
  $("#clear-wins").addEventListener("click", function () { saveWins([]); renderWins(); });
  renderWins();

  B.refresh();
})();
