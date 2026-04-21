/* ================================================================
   GLOBAL JS — Dr. Aishath Ali Naaz Portfolio
   Custom cursor, ripple effect, fade animations, mobile nav
   ================================================================ */

(function () {
  'use strict';

  /* ---- Custom Cursor (null-safe) ---- */
  var cursor = document.getElementById('cursor');
  var ring = document.getElementById('cursorRing');
  var mx = 0, my = 0, rx = 0, ry = 0;
  var animating = false;

  if (cursor && ring) {
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';

      if (!animating) {
        animating = true;
        requestAnimationFrame(animRing);
      }
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      /* Stop the loop when cursor catches up — saves CPU */
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        requestAnimationFrame(animRing);
      } else {
        animating = false;
      }
    }


  }

  /* ---- Fade-In Observer ---- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.animationDelay = (i * 0.08) + 's';
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) {
      fadeObs.observe(el);
    });
  }

  /* ---- Mobile Nav Toggle ---- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var navEl = document.querySelector('nav');

  if (navToggle && navLinks && navEl) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open');
      navEl.classList.toggle('menu-open');
    });

    /* Close menu when a link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navEl.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

})();
