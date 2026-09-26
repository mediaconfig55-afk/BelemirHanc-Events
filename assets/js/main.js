/* BelemirHancı Events — etkileşim katmanı
   Bağımlılık yok. Scroll dinleyicisi yerine IntersectionObserver kullanılır. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal ---------- */
  var targets = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });

    // Güvenlik ağı: gözlemci throttle edilirse (arka plan sekmesi vb.)
    // ekranda olan öğeler yine de görünür kalsın.
    window.addEventListener("load", function () {
      targets.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    });
  }

  /* ---------- Nav gölgesi (sentinel ile, scroll event'i olmadan) ---------- */
  var sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none";
  document.body.prepend(sentinel);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      document.body.classList.toggle("is-scrolled", !e[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- Mobil menü ---------- */
  var burger = document.querySelector(".burger");
  var sheet = document.getElementById("mobil-menu");

  function setMenu(open) {
    if (!burger || !sheet) return;
    if (open) {
      sheet.hidden = false;
      // reflow -> geçişin tetiklenmesi için
      void sheet.offsetWidth;
    }
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) {
      window.setTimeout(function () {
        if (!document.body.classList.contains("menu-open")) sheet.hidden = true;
      }, reduced ? 0 : 480);
    }
  }

  if (burger && sheet) {
    burger.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
    });
  }

  /* ---------- Talep formu -> WhatsApp mesajı ---------- */
  var form = document.getElementById("talep-formu");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      if (!f.ad.value.trim()) { f.ad.focus(); return; }

      var lines = [
        "Merhaba BelemirHancı Events,",
        "",
        "Ad: " + f.ad.value.trim(),
        "Organizasyon: " + f.tur.value
      ];
      if (f.tarih.value) {
        var d = f.tarih.value.split("-");
        lines.push("Tarih: " + d[2] + "." + d[1] + "." + d[0]);
      }
      if (f.yer.value.trim()) lines.push("Mekân / ilçe: " + f.yer.value.trim());
      if (f["not"].value.trim()) lines.push("", "Konsept notu: " + f["not"].value.trim());
      lines.push("", "Müsaitlik ve fiyat bilgisi alabilir miyim?");

      window.open(
        "https://wa.me/905340795548?text=" + encodeURIComponent(lines.join("\n")),
        "_blank",
        "noopener"
      );
    });
  }

  /* ---------- Yıl ---------- */
  var yil = document.getElementById("yil");
  if (yil) yil.textContent = String(new Date().getFullYear());
})();
