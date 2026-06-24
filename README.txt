LAHARDANE LRD — PLANNING APPLICATION WEBSITE
============================================

Static multi-page site in the conventional Irish LRD layout (modelled on
knockbroganlrd.ie): light navbar with logo, CGI hero carousel, application
title strip, development description, quick-link buttons, simple footer.
Bootstrap 5 via CDN.

FILES
  index.html ................. Home: carousel, description, quick links
  docs-*.html ................ Documents (Planning, Architectural, Engineering, Landscape)
  drawings-*.html ............ Drawings (Architectural, Engineering, Landscape, Photomontages, Scheme Images)
  style.css / script.js ...... Shared styles and behaviour
  media/hero-1..5.jpg ........ Scheme CGIs used in the carousel
  media/lahardane-logo-nav.png Navbar/favicon logo (cropped from brand art)

TO FINISH
  1. Description (index.html): COMPLETE — full development description installed from
     the Architects Design Statement (262 units, creche, parking, open space, a-g works).
     Verify it matches the final public notice as lodged before going live.
  2. Documents/Drawings pages: each row's View/Download links point to "#".
     Replace with real PDF paths (e.g. href="documents/planning-report.pdf")
     and update the file-size text.
  3. Carousel: to swap or reorder images, edit the <img src="media/hero-N.jpg">
     tags in index.html. Higher-resolution CGIs will look sharper at full width.
  4. Navbar: Planning Application Documents ▾ and Planning Application
     Drawings ▾. If an EIAR/NIS or a Response to Further Information is needed
     later, add a nav item and page the same way (copy a nav-item li).

HOSTING
  Deploy the whole folder as-is (Netlify drag-and-drop, or `vercel deploy`).
  Point the domain at it and keep it live through the 5-week statutory period.
