(function () {
  var OPEN = ["ROŠTILJ JE VRUĆ", "KUĆICA RADI", "AUTO JE NA PUTU", "DOSTAVA U INĐIJI", "GLADAN? DOĐI"];
  var SHUT = ["ZATVORENO ZA SADA", "ROŠTILJ SE HLADI", "SUTRA OD 09:00", "ČUVAJ APETIT", "VIDIMO SE"];
  var STAR = "\u00a0 \u2605 \u00a0";

  function isOpenNow() {
    var n = new Date(), d = n.getDay(), m = n.getHours() * 60 + n.getMinutes();
    if (d === 0) return m >= 960 && m < 1380;
    if (d === 5 || d === 6) return m >= 540;
    return m >= 540 && m < 1380;
  }

  function paintStatus() {
    var bar = document.getElementById("statusbar");
    var label = document.getElementById("statusLabel");
    var mq = document.getElementById("marquee");
    if (!bar || !mq) return;
    var open = isOpenNow();
    bar.classList.toggle("closed", !open);
    label.textContent = open ? "Sada otvoreno" : "Sada zatvoreno";
    var text = (open ? OPEN : SHUT).join(STAR) + STAR;
    var spans = mq.querySelectorAll("span");
    spans[0].textContent = text;
    spans[1].textContent = text;
  }

  var io = null;
  function scan() {
    var els = document.querySelectorAll("[data-reveal]:not(.sg-in)");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top < window.innerHeight * 0.9) {
        el.style.animationDelay = "0s";
        el.classList.add("sg-in");
        if (io) io.unobserve(el);
      } else if (io) {
        io.observe(el);
      }
    }
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("sg-in"); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = Array.prototype.slice.call(el.parentNode ? el.parentNode.children : []);
        el.style.animationDelay = Math.min(Math.max(0, sibs.indexOf(el)), 6) * 0.07 + "s";
        el.classList.add("sg-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    scan();
    setInterval(scan, 1200);
  }

  function parallax() {
    var hero = document.getElementById("pocetna"), v = document.getElementById("heroVideo");
    if (!hero || !v) return;
    var h = hero.offsetHeight || 1;
    var p = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / h));
    v.style.transform = "scale(" + (1 + p * 0.16).toFixed(3) + ") translateY(" + (p * 6).toFixed(2) + "%)";
    v.style.filter = "brightness(" + (1 - p * 0.4).toFixed(3) + ")";
  }

  function initTabs() {
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("is-active"); });
        t.classList.add("is-active");
        var pick = t.getAttribute("data-tab");
        ["klopa", "sosevi"].forEach(function (k) {
          var p = document.getElementById("panel-" + k);
          if (p) p.hidden = k !== pick;
        });
        scan();
      });
    });
  }

  function initDrawer() {
    var drawer = document.getElementById("drawer");
    var open = document.getElementById("burger");
    var close = document.getElementById("drawerClose");
    if (!drawer || !open) return;
    function set(on) {
      drawer.classList.toggle("is-open", on);
      drawer.setAttribute("aria-hidden", on ? "false" : "true");
      document.body.style.overflow = on ? "hidden" : "";
    }
    open.addEventListener("click", function () { set(true); });
    if (close) close.addEventListener("click", function () { set(false); });
    drawer.querySelectorAll(".drawer-nav a, .drawer-cta").forEach(function (a) {
      a.addEventListener("click", function () { set(false); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function initVideo() {
    var v = document.getElementById("heroVideo");
    if (!v) return;
    v.muted = true;
    var go = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    if (v.readyState >= 2) go(); else v.addEventListener("loadeddata", go, { once: true });
  }

  function onScroll() {
    if (onScroll.raf) return;
    onScroll.raf = requestAnimationFrame(function () {
      onScroll.raf = null;
      parallax();
      scan();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintStatus();
    setInterval(paintStatus, 60000);
    initVideo();
    initTabs();
    initDrawer();
    initReveal();
    parallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    var pre = document.getElementById("preloader");
    if (pre) setTimeout(function () { pre.remove(); }, 1700);
  });
})();
