/* index4.js
   - Keeps original behaviors: hamburger toggle, IntersectionObserver-based reveal,
     smooth scrolling, and toggleMore expand/collapse.
   - Guards theme-toggle code (since button removed).
   - Adds hamburger overlay close, click-away, and Escape key handling.
*/

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const menuClose = document.getElementById('menuClose');

  const openMenu = () => {
    if (navLinks) {
      navLinks.classList.add('active');
      navLinks.setAttribute('aria-hidden', 'false');
    }
  };
  const closeMenu = () => {
    if (navLinks) {
      navLinks.classList.remove('active');
      navLinks.setAttribute('aria-hidden', 'true');
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('active')) closeMenu();
      else openMenu();
    });
  }
  if (menuClose) {
    menuClose.addEventListener('click', () => {
      closeMenu();
      if (hamburger) hamburger.focus();
    });
  }

  // Click-away: close overlay when clicking outside navLinks on mobile
  document.addEventListener('click', (e) => {
    if (!navLinks) return;
    if (!navLinks.classList.contains('active')) return;
    const withinNav = navLinks.contains(e.target) || (hamburger && hamburger.contains(e.target));
    if (!withinNav) closeMenu();
  });

  // Escape key to close overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Section reveal (IntersectionObserver) ---------- */
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.add('hidden'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(s => observer.observe(s));

  /* ---------- Smooth scroll for nav links (and hero CTAs) ---------- */
  const navAnchors = document.querySelectorAll('.nav-links a, .hero-cta a, .btn-outline');
  navAnchors.forEach(link => {
    link.addEventListener('click', (evt) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return; // allow external links
      evt.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 60; // header offset
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // close menu on mobile after click
        if (navLinks && navLinks.classList.contains('active')) closeMenu();
      }
    });
  });

  /* ---------- Theme toggle guard (button removed from DOM) ---------- */
  const toggleThemeButton = document.getElementById('toggleTheme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('light-mode')) {
        toggleThemeButton.textContent = '🌞';
        localStorage.setItem('theme','light');
      } else {
        toggleThemeButton.textContent = '🌙';
        localStorage.setItem('theme','dark');
      }
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      toggleThemeButton.textContent = '🌞';
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      toggleThemeButton.textContent = '🌙';
    }
  }

  /* ---------- Original-like toggle fix (safe toggleMore function) ---------- */
  window.toggleMore = function(id){
    try {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.style.display === 'none' || el.style.display === '') {
        el.style.display = 'block';
        // smooth open: set a small transition
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.display = 'none';
        el.style.maxHeight = '0';
      }
    } catch (err) {
      console.error('toggleMore error:', err);
    }
  };

  /* ---------- Typing effect for tagline (non-blocking, subtle) ---------- */
  try {
    const tagline = document.getElementById('tagline');
    if (tagline) {
      const text = tagline.textContent.trim();
      tagline.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        if (i < text.length) { tagline.textContent += text.charAt(i); i++; }
        else clearInterval(t);
      }, 12);
    }
  } catch (e) {
    // ignore typing errors
  }

});
