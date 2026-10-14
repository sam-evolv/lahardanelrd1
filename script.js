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

  // 5) Document pages: count per section, plus a filter on longer pages
  var tables = Array.prototype.slice.call(document.querySelectorAll('main .table-container'));
  if (tables.length) {
    var allRows = Array.prototype.slice.call(document.querySelectorAll('main .table-container tbody tr'));
    var total = allRows.length;
    var docs = function (n) { return n + (n === 1 ? ' document' : ' documents'); };

    // count badge on each section heading
    tables.forEach(function (tc) {
      var head = tc.previousElementSibling;
      if (head && head.classList.contains('section-subhead')) {
        var badge = document.createElement('span');
        badge.className = 'subhead-count';
        badge.textContent = tc.querySelectorAll('tbody tr').length;
        head.appendChild(badge);
      }
    });

    // toolbar above the first section
    var first = tables[0].previousElementSibling && tables[0].previousElementSibling.classList.contains('section-subhead')
      ? tables[0].previousElementSibling : tables[0];
    var bar = document.createElement('div');
    bar.className = 'doc-toolbar';
    var count = document.createElement('p');
    count.className = 'doc-count';
    count.setAttribute('aria-live', 'polite');
    count.textContent = docs(total);
    bar.appendChild(count);
    first.parentNode.insertBefore(bar, first);

    if (total >= 10) {
      var wrap = document.createElement('div');
      wrap.className = 'doc-filter';
      wrap.innerHTML = '<i class="fas fa-magnifying-glass" aria-hidden="true"></i>' +
        '<input type="search" placeholder="Filter documents…" aria-label="Filter documents by title">';
      bar.appendChild(wrap);
      var empty = document.createElement('div');
      empty.className = 'doc-empty';
      empty.hidden = true;
      empty.textContent = 'No documents match your search.';
      bar.parentNode.insertBefore(empty, bar.nextSibling);

      wrap.querySelector('input').addEventListener('input', function () {
        var q = this.value.trim().toLowerCase();
        var shown = 0;
        tables.forEach(function (tc) {
          var visible = 0;
          tc.querySelectorAll('tbody tr').forEach(function (tr) {
            var title = (tr.cells[0] ? tr.cells[0].textContent : '').toLowerCase();
            var match = !q || title.indexOf(q) !== -1;
            tr.hidden = !match;
            if (match) visible++;
          });
          tc.hidden = visible === 0;
          var head = tc.previousElementSibling;
          if (head && head.classList.contains('section-subhead')) head.hidden = visible === 0;
          shown += visible;
        });
        count.textContent = q ? shown + ' of ' + docs(total) : docs(total);
        empty.hidden = shown !== 0;
      });
    }
  }
});
