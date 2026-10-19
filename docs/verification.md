# Local verification — 2026-10-18

## Project wording update — 2026-10-19

- Revised article bodies for Magprint, solar thermal air receiver, ICARUS, solar minigrid reliability, Halon recovery, Ametek Ameron, and TapLok toward a conversational first-person tone. Existing project metadata, figures, sources, and review status were retained.
- VAM was explicitly excluded from this revision. Its source SHA256 remained `8aa266b5e80ddd99e8c18eb3088bade701aa13b271e846444668b52105942a5c`.
- Jekyll production build and generated-site checks passed for all 16 HTML outputs. All seven revised pages were inspected in the desktop browser without document overflow; TapLok was also checked at 390px. A representative Magprint screenshot was saved for review. No publishing action was taken.

## Earlier rebuild verification

The rebuild remains local on the existing `gpt-overhaul` branch. No commit, push, Pages configuration change, or deployment was made.

Passed:

- GitHub Pages gem 232 / Jekyll 3.10 production build on Windows with Ruby 3.4.9. Lockfile also resolves the Linux platform; `.ruby-version` recommends Pages’ Ruby 3.3.4. The hosted GitHub build itself has not been run.
- Isolated real-build integration checks: adding a new Markdown project; dedicated article and gallery links; newest-first sorting; featured/unfeatured behavior; figure captions, footnotes, paper links, code, opt-in equations; compatibility redirects; and production exclusion of archives, templates, blog, and comparison tooling.
- Generated production-site check: all 16 HTML outputs, internal links and fragments, image descriptions, required pages, sitemap URLs, redirects, and publication boundaries.
- Cylinder numerical regression check: original default values, a known 90°/60° geometry case, maximum slider values, reset, high-density canvas sizing, and 2D fallback without Three.js/WebGL.
- Browser inspection of both designs at desktop size and 390px width across Home, Projects, HMC Clinic, Demos, Cylinder, and CV: no horizontal document overflow.
- Cylinder browser inspection at 320px: both canvas views render, all four controls accept keyboard input, extrema yield finite expected readouts, reset restores defaults, MathJax renders equations, and no browser console errors were reported.
- Gallery-to-article navigation through keyboard Enter retains the chosen design and marks Projects as the current navigation section.
- Archived source checked against the original tracked content, with no content differences after line-ending normalization. The untracked Blackjack file remains at its original path with SHA256 `b83e46cd0d2107b2e07e03a79b4f13b63d8c563a223c0f2252ff75600c5c7cc0`.
- Latest featured-project update: exactly four homepage cards in the requested order, all four earlier projects retained in the full gallery, and public Gmail contact links on the homepage and CV. The real-build fixture also verifies that adding and featuring a new project updates the site automatically.
- Latest browser checks: supplied VAM video plays; mobile homepage cards and image crops checked at 390px; Magprint's full portrait figure and long receiver title checked at 320px without horizontal overflow. ICARUS's live YouTube player reports “Video unavailable,” so the article links to the supplied archive rather than embedding that player. The archive's playback is not verified.

Still requiring review:

- Biography, CV, Gmail contact, and four featured articles have been updated from owner-provided information and cited sources. Owner review before launch remains useful, especially for project scope and wording. The academic editorial direction and top portrait have been selected. The initial month/day metadata values are for sorting; display periods retain the known dates.
- Solar-site photographs have now been supplied and incorporated: the field is the project cover, followed by workstation and thermal-camera figures in the article. The VAM side view is now Figure 1 and its homepage/gallery cover; the front view is Figure 2.
- CV print CSS is implemented. Clicking Print / Save PDF in the embedded browser did not expose an inspectable print preview, so a rendered/exported PDF has not been visually verified. Check it in a regular browser before launch.
- External project-resource links are preserved; no claims are made about continued availability of every third-party resource. Equation rendering and the cylinder’s 3D view use pinned CDN dependencies.
