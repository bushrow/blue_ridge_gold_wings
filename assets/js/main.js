// Blue Ridge Gold Wings. Site interactivity.
// Two responsibilities: mobile nav toggle, fade-up on scroll.

(function () {
  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    // Close the mobile nav when a link inside it is clicked.
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
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
