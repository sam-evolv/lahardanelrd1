// Lahardane LRD — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  // 1) Desktop: open nav dropdowns on hover (click still works, and is the
  //    only mode on touch/mobile where Bootstrap handles it natively).
  var isDesktop = function () { return window.matchMedia('(min-width: 992px)').matches; };
  document.querySelectorAll('.site-navbar .nav-item.dropdown').forEach(function (dd) {
    var toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
    if (!toggle || typeof bootstrap === 'undefined') return;
    var instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
    var hideTimer;
    dd.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      clearTimeout(hideTimer); instance.show();
    });
    dd.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      hideTimer = setTimeout(function () { instance.hide(); }, 180);
    });
    // On desktop, clicking the toggle follows its href (first page in section)
    toggle.addEventListener('click', function (e) {
      if (isDesktop() && toggle.getAttribute('href') && toggle.getAttribute('href') !== '#') {
        e.preventDefault(); e.stopPropagation();
        window.location.href = toggle.getAttribute('href');
      }
    });
  });

  // 2) Highlight the current page in the navbar
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.site-navbar .dropdown-item, .site-navbar .nav-link').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here) {
      a.classList.add('active');
      var parent = a.closest('.nav-item.dropdown');
      if (parent) { var t = parent.querySelector('.nav-link'); if (t) t.classList.add('active'); }
    }
  });

  // 3) Back-to-top button (injected on every page)
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(btn);
  var onScroll = function () { btn.classList.toggle('show', window.scrollY > 420); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // 4) Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
