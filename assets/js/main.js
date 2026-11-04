/* ==========================================================================
   Portfolio behaviour. Plain JavaScript, no dependencies.
   Content comes from assets/js/data.js (window.SITE and window.PROJECTS).
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  /* ---------- 1. Bind site-wide data (links, counts, year) ---------- */
  function bindSiteData() {
    var social = SITE.social || {};

    $$("[data-social]").forEach(function (el) {
      var url = social[el.getAttribute("data-social")];
      if (url) el.setAttribute("href", url);
    });
    // Show optional social items only when a URL has been provided in data.js
    $$("[data-social-item]").forEach(function (item) {
      var key = item.getAttribute("data-social-item");
      if (social[key]) item.hidden = false;
    });
    $$("[data-site]").forEach(function (el) {
      var value = SITE[el.getAttribute("data-site")];
      if (value) el.textContent = value;
    });
    $$("[data-site-mail]").forEach(function (el) {
      if (SITE.email) el.setAttribute("href", "mailto:" + SITE.email);
    });
    $$("[data-whatsapp]").forEach(function (el) {
      if (SITE.whatsapp) el.setAttribute("href", "https://wa.me/" + SITE.whatsapp);
    });
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- 2. Navigation ---------- */
  function initNav() {
    var header = $("#siteHeader");
    var toggle = $("#navToggle");
    var nav = $("#primaryNav");
    if (!header || !toggle || !nav) return;
    var desktop = window.matchMedia("(min-width: 1180px)");

    function setOpen(open, returnFocus) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (!open && returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after choosing a link
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    // Escape closes and returns focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
    });
    // Click outside closes
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });
    // Leaving the mobile layout resets the panel
    var onChange = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Highlight the link of the section currently in view
    var links = $$(".nav-link", nav);
    var sections = links.map(function (l) { return $(l.getAttribute("href")); }).filter(Boolean);
    function setActive(id) {
      links.forEach(function (l) {
        var on = l.getAttribute("href") === "#" + id;
        l.classList.toggle("is-active", on);
        if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) setActive(entry.target.id); });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }
    setActive("home");
  }

  /* ---------- 3. Reveal on scroll ---------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. Projects ---------- */
  var INITIAL_VISIBLE = 6;
  var state = { filter: "all", expanded: false };
  var lastOpener = null;

  var LINK_ICON = { github: "github", live: "external", notebook: "file", drive: "folder", report: "file" };

  function projectLinks(p) {
    if (!p.links || !p.links.length) {
      return p.linkNote ? '<span class="link-note">' + icon("lock") + esc(p.linkNote) + "</span>" : "";
    }
    return p.links.map(function (l) {
      return '<a class="icon-btn" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        esc(l.label + " for " + p.title + " (opens in a new tab)") + '" title="' + esc(l.label) + '">' +
        icon(LINK_ICON[l.type] || "external") + "</a>";
    }).join("");
  }

  function projectCard(p) {
    var img = p.image || {};
    return '<li><article class="project-card" data-id="' + esc(p.id) + '">' +
      '<div class="project-media">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" width="960" height="600" loading="lazy" decoding="async">' +
        (img.placeholder ? '<span class="tag tag-placeholder">Placeholder graphic</span>' : "") +
        (p.status ? '<span class="tag tag-status">' + esc(p.status) + "</span>" : "") +
      "</div>" +
      '<div class="project-body">' +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="project-summary">' + esc(p.summary) + "</p>" +
        (p.problem ? '<p class="project-problem"><strong>Problem:</strong> ' + esc(p.problem) + "</p>" : "") +
        '<ul class="chips" aria-label="Technologies">' + (p.stack || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        '<div class="project-foot">' +
          '<div class="project-links">' + projectLinks(p) + "</div>" +
          '<button type="button" class="btn-details" aria-haspopup="dialog" data-open="' + esc(p.id) + '">Details' +
            '<span class="sr-only"> of ' + esc(p.title) + "</span>" + icon("arrow-r") + "</button>" +
        "</div>" +
      "</div>" +
    "</article></li>";
  }

  function renderProjects() {
    var grid = $("#projectGrid");
    var moreBtn = $("#projectMore");
    if (!grid) return;
    var list = PROJECTS.filter(function (p) { return state.filter === "all" || p.category === state.filter; });
    var visible = state.expanded ? list : list.slice(0, INITIAL_VISIBLE);
    grid.innerHTML = visible.map(projectCard).join("");

    if (moreBtn) {
      var hidden = list.length - visible.length;
      if (list.length > INITIAL_VISIBLE) {
        moreBtn.hidden = false;
        moreBtn.textContent = state.expanded ? "Show fewer projects" : "Show " + hidden + " more project" + (hidden === 1 ? "" : "s");
      } else {
        moreBtn.hidden = true;
      }
    }
  }

  function initProjects() {
    var grid = $("#projectGrid");
    if (!grid) return;
    renderProjects();

    $$("#projectFilters .filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.filter = btn.getAttribute("data-filter");
        $$("#projectFilters .filter").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        renderProjects();
      });
    });
    var moreBtn = $("#projectMore");
    if (moreBtn) moreBtn.addEventListener("click", function () {
      state.expanded = !state.expanded;
      renderProjects();
      if (!state.expanded) { var s = $("#projects"); if (s) s.scrollIntoView({ block: "start" }); }
    });

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-open]");
      if (btn) openProject(btn.getAttribute("data-open"), btn);
    });
    initModal();
  }

  /* Details window (native <dialog>) */
  function initModal() {
    var dialog = $("#projectModal");
    if (!dialog) return;
    dialog.addEventListener("click", function (e) {
      var thumb = e.target.closest(".modal-gallery button");
      if (thumb) {
        var main = $("#modalImage");
        main.src = thumb.getAttribute("data-src");
        main.alt = thumb.getAttribute("data-alt");
        $$(".modal-gallery button", dialog).forEach(function (b) { b.setAttribute("aria-current", String(b === thumb)); });
        return;
      }
      if (e.target === dialog || e.target.closest("[data-close]")) dialog.close();
    });
    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("modal-open");
      if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
    });
  }

  /* Extra screenshots: small buttons that swap the main image */
  function gallery(p) {
    if (!p.gallery || !p.gallery.length) return "";
    var all = [p.image].concat(p.gallery);
    return '<div class="modal-gallery" role="group" aria-label="Project images">' + all.map(function (g, i) {
      return '<button type="button" data-src="' + esc(g.src) + '" data-alt="' + esc(g.alt) + '" aria-label="Show image ' + (i + 1) + ' of ' + all.length + '" aria-current="' + (i === 0) + '">' +
        '<img src="' + esc(g.src) + '" alt=""></button>';
    }).join("") + "</div>";
  }

  function openProject(id, opener) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    var dialog = $("#projectModal");
    var body = $("#modalBody");
    if (!p || !dialog || !body || typeof dialog.showModal !== "function") return;
    lastOpener = opener || null;
    var img = p.image || {};

    var features = (p.features && p.features.length)
      ? "<div><h4>Key features</h4><ul class=\"ticks\">" + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></div>"
      : "";
    var links = (p.links && p.links.length)
      ? '<div class="modal-links">' + p.links.map(function (l, i) {
          return '<a class="btn ' + (i === 0 ? "btn-primary" : "btn-secondary") + '" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' +
            esc(l.label) + icon("external") + "</a>";
        }).join("") + "</div>"
      : (p.linkNote ? '<p class="link-note">' + icon("lock") + esc(p.linkNote) + "</p>" : "");
    var notes = [];
    if (img.placeholder) notes.push("The image above is a placeholder illustration, not a screenshot of the real project.");
    if (p.note) notes.push(p.note);

    body.innerHTML =
      '<button type="button" class="modal-close" data-close aria-label="Close project details">' + icon("close") + "</button>" +
      '<div class="modal-media"><img id="modalImage" src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" decoding="async"></div>' +
      gallery(p) +
      '<div class="modal-content">' +
        '<div><h3 id="modalTitle">' + esc(p.title) + "</h3>" +
        (p.status ? '<p style="margin-top:6px"><span class="tag" style="position:static;display:inline-block;color:#5EEAD4">' + esc(p.status) + "</span></p>" : "") + "</div>" +
        "<p>" + esc(p.summary) + "</p>" +
        (p.problem ? "<div><h4>Problem</h4><p>" + esc(p.problem) + "</p></div>" : "") +
        '<div class="modal-cols">' + features +
          '<div><h4>Technologies</h4><ul class="chips">' + (p.stack || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" +
        "</div>" +
        links +
        (notes.length ? '<p class="modal-note">' + esc(notes.join(" ")) + "</p>" : "") +
      "</div>";

    document.documentElement.classList.add("modal-open");
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  /* ---------- 5. Contact form (opens the visitor's email app) ---------- */
  function initContact() {
    var form = $("#contactForm");
    if (!form) return;
    var status = $("#formStatus");
    var subject = $("#cf-subject");

    // Service buttons pre-fill the subject
    $$("[data-subject]").forEach(function (a) {
      a.addEventListener("click", function () {
        if (subject) subject.value = a.getAttribute("data-subject");
      });
    });

    function setStatus(msg, isError) {
      status.textContent = msg;
      status.classList.toggle("is-error", !!isError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("input, textarea", form);
      fields.forEach(function (f) { f.removeAttribute("aria-invalid"); });
      var invalid = fields.filter(function (f) { return !f.checkValidity(); });
      if (invalid.length) {
        invalid.forEach(function (f) { f.setAttribute("aria-invalid", "true"); });
        setStatus("Please complete: " + invalid.map(function (f) {
          return $("label[for='" + f.id + "']", form).textContent.toLowerCase();
        }).join(", ") + ".", true);
        invalid[0].focus();
        return;
      }
      var name = $("#cf-name").value.trim();
      var email = $("#cf-email").value.trim();
      var msg = $("#cf-message").value.trim();
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + msg;
      var url = "mailto:" + (SITE.email || "") +
        "?subject=" + encodeURIComponent(subject.value.trim()) +
        "&body=" + encodeURIComponent(body);
      if (url.length > 1900) {
        setStatus("Your message is too long for an email link. Please shorten it or email " + SITE.email + " directly.", true);
        return;
      }
      window.location.href = url;
      setStatus("Your email app should now open with the message ready. If nothing happens, write to " + SITE.email + ".", false);
    });
  }

  /* ---------- 6. Back to top ---------- */
  function initToTop() {
    var btn = $("#toTop");
    if (!btn) return;
    var update = function () { btn.hidden = window.scrollY < 700; };
    window.addEventListener("scroll", update, { passive: true });
    update();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindSiteData();
    initNav();
    initReveal();
    initProjects();
    initContact();
    initToTop();
  });
})();
