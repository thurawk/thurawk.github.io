document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ───────────────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme  = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', savedTheme || systemTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Mobile Nav ─────────────────────────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const siteNav   = document.getElementById('site-nav');

  const closeNav = () => {
    siteNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a nav link is clicked on mobile
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeNav();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  // ── Active Nav Link (Intersection Observer) ────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (navLinks.length) {
    // Resolve each nav link's target element by ID directly — works for both
    // <section id="..."> and plain elements like <div id="skills">.
    const linkedIds = [...navLinks].map((l) => l.getAttribute('href').slice(1));
    const linkedSections = linkedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Thin trigger band ~40–45% from the top of the viewport. Whichever section
    // overlaps that band is "current" — eliminates dead zones the threshold
    // approach left between sections of different heights.
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    linkedSections.forEach((s) => navObserver.observe(s));
  }

  // ── Scroll Reveal ──────────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px', // trigger slightly before the element reaches the bottom
      threshold: 0.06,
    });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

});
