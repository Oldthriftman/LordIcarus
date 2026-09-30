(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Post rail ---------- */
  var rail = document.getElementById("rail");
  if (!rail) return;

  var prev = document.querySelector('.rail-btn[data-dir="-1"]');
  var next = document.querySelector('.rail-btn[data-dir="1"]');

  function maxScroll() { return rail.scrollWidth - rail.clientWidth; }

  // Distance between the starts of two neighbouring cards.
  function step() {
    var cards = rail.querySelectorAll(".card");
    if (cards.length < 2) return rail.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  function updateArrows() {
    if (!prev || !next) return;
    prev.disabled = rail.scrollLeft <= 1;
    next.disabled = rail.scrollLeft >= maxScroll() - 1;
  }

  [prev, next].forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      rail.scrollBy({
        left: Number(btn.dataset.dir) * step(),
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  });

  rail.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // Vertical mouse wheel → horizontal scroll (desktop / fine pointers only).
  // Snapping is suspended while the wheel moves so small wheel deltas aren't
  // snapped back to the same card, then restored so the rail settles on a card.
  // At either end the wheel falls through to normal page scrolling.
  var desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
  var settleTimer;

  rail.addEventListener("wheel", function (e) {
    if (!desktop.matches || e.ctrlKey) return;              // ctrl+wheel = zoom
    if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;   // native horizontal swipe

    var delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 16;                     // lines
    else if (e.deltaMode === 2) delta *= rail.clientWidth;  // pages

    var atStart = rail.scrollLeft <= 0 && delta < 0;
    var atEnd = rail.scrollLeft >= maxScroll() - 1 && delta > 0;
    if (atStart || atEnd) return;

    e.preventDefault();
    rail.classList.add("is-wheeling");
    rail.scrollLeft += delta;

    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      rail.classList.remove("is-wheeling");
    }, 180);
  }, { passive: false });
})();
