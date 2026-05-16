/* ================================================================
   GLOBAL JS — Dr. Aishath Ali Naaz Portfolio
   Component loader, fade animations, mobile nav
   ================================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. Component Loader
        Fetches nav.html and footer.html, injects them, then wires
        up active-link highlighting and mobile-nav toggle.
  ---------------------------------------------------------------- */
  var PAGE = document.body.dataset.page || '';

  function loadComponent(selector, url, callback) {
    var placeholder = document.querySelector(selector);
    if (!placeholder) return;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + url);
        return res.text();
      })
      .then(function (html) {
        placeholder.outerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.warn('[components]', err);
      });
  }

  /* Mark active nav link after nav is injected */
  function highlightActiveLink() {
    var links = document.querySelectorAll('nav [data-page]');
    links.forEach(function (link) {
      if (link.dataset.page === PAGE) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* Wire mobile nav toggle after nav is injected */
  function initMobileNav() {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks  = document.querySelector('.nav-links');
    var navEl     = document.querySelector('nav');

    if (!navToggle || !navLinks || !navEl) return;

    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open');
      navEl.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navEl.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Inject nav — placeholder <div id="nav-placeholder"> in each page */
  loadComponent('#nav-placeholder', 'components/nav.html', function () {
    highlightActiveLink();
    initMobileNav();
  });

  /* Inject footer — placeholder <div id="footer-placeholder"> in each page */
  loadComponent('#footer-placeholder', 'components/footer.html');

  /* ----------------------------------------------------------------
     2. Fade-In Observer
  ---------------------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    /* Re-query after components load so dynamically injected elements
       also get observed — use a short delay as a simple workaround.    */
    var observeFades = function () {
      var els = document.querySelectorAll('.fade-in:not(.visible)');
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = (i * 0.08) + 's';
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { obs.observe(el); });
    };

    if ('IntersectionObserver' in window) {
      observeFades();
    } else {
      /* Fallback: show immediately */
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

})();
