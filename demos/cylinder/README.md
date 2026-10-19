# Cylinder intersections

Moved from `/app_cylinder.html`; the original implementation is preserved in `_archive/legacy/app_cylinder.html`. The old public URL is a compatibility redirect.

`index.html` uses the shared Jekyll shell and demo styles. `cylinder.js` keeps the original geometry, slider ranges, 3D cylinder/plane view, 2D ellipse/orbit view, and numeric summaries. It adds reset, responsive canvas sizing, accessible readouts, and a 2D fallback when Three.js or WebGL is unavailable.

Three.js r128 loads from cdnjs. MathJax 3.2.2 renders the explanatory equations. Both are versioned external dependencies. The demo needs JavaScript, and its 3D view needs WebGL. Neither dependency is required by ordinary project pages without equations.

See `../README.md` for the reusable demo authoring and styling conventions. Do not include a complete second document inside this source: the layout provides `<html>`, `<head>`, `<body>`, navigation, and footer.
