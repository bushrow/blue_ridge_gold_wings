// Blue Ridge Gold Wings. Site interactivity.
// Three responsibilities: mobile nav toggle, fade-up on scroll,
// sticky auto-hide site header.

(function () {
  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 639.98px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Fade-up on scroll ---
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('[data-fade-up]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // --- Sticky auto-hide site header ---
  // After scrolling past 80% of the hero, the header switches to fixed
  // position with a solid background. While in this fixed state, the
  // header hides on scroll-down and reveals on scroll-up.
  var header = document.querySelector('.site-header');
  var hero   = document.querySelector('.hero');
  if (!header) return;

  var lastY = window.scrollY;
  var ticking = false;
  var heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
  var threshold = heroBottom * 0.8;
  var DELTA = 6;

  function recalcHero() {
    if (!hero) return;
    heroBottom = hero.offsetTop + hero.offsetHeight;
    threshold = heroBottom * 0.8;
  }

  function onScroll() {
    var y = window.scrollY;

    if (y < threshold) {
      header.classList.remove('is-fixed', 'is-hidden');
    } else {
      header.classList.add('is-fixed');
      var dy = y - lastY;
      if (Math.abs(dy) > DELTA) {
        if (dy > 0) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
        lastY = y;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    recalcHero();
  });
})();
