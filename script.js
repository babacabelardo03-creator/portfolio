/* ==========================================================
   Portfolio scripts - Abelardo Pangan Babac
   ========================================================== */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------- Toast notification ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 5000);
  }

  /* ---------- Loading screen ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => $("#loader").classList.add("done"), 400);
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const menu = $("#menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Typing effect ---------- */
  const typed = $("#typed");
  const phrases = ["practical web systems.", "PHP and MySQL apps.", "responsive websites.", "small Arduino projects."];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    typed.textContent = phrases[0];
  } else {
    let p = 0, c = 0, deleting = false;
    (function tick() {
      const word = phrases[p];
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 40 : 80;
      if (!deleting && c === word.length) { deleting = true; delay = 1500; }
      else if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
      c += deleting ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Fade-in on scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Active nav link ---------- */
  const links = $$("#menu a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  function updateActive() {
    let current = sections[0];
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= 120) current = s; });
    // "Currently Learning" sits between Education and Contact; keep Education active for it
    if (current && current.id === "learning") current = $("#education");
    links.forEach((a) => a.classList.toggle("active", current && a.getAttribute("href") === "#" + current.id));
  }

  /* ---------- Scroll to top button ---------- */
  const totop = $("#totop");
  function onScroll() {
    totop.classList.toggle("show", window.scrollY > 500);
    updateActive();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  totop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Placeholder project links ---------- */
  $$("a[data-placeholder]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Placeholder: replace this button's link (" + a.dataset.placeholder + ") in index.html.");
    });
  });
})();