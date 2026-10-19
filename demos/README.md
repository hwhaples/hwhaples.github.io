# Adding standalone demos

Each experiment lives in `demos/<slug>/`, with `index.html` and its supporting JavaScript, styles, and images together. The URL is `/demos/<slug>/`. Avoid spaces and keep published slugs stable.

1. Copy `_templates/demo.html` to `demos/<slug>/index.html`.
2. Keep the YAML front matter. `layout: default` gives the HTML file the site header, footer, metadata, and reading layout; `demo: true` adds shared demo styling. The file still contains ordinary HTML and can load independent scripts with no application framework.
3. Add `demo.js` and any assets alongside it. Reference paths with Liquid, for example `{{ '/demos/my-demo/demo.js' | relative_url }}`. The rendered `_site/demos/<slug>/index.html` is the browser-ready file; preview with Jekyll rather than opening source HTML directly.
4. Add an entry to `_data/demos.yml` with `title`, `description`, `thumbnail`, `thumbnail_alt`, `url`, and `category`. The gallery updates at the next build.
5. Test the experiment on desktop, on a narrow screen, and with the keyboard. Link it from related Markdown projects using a normal link to its demo URL.

```yaml
- title: Your experiment
  description: What a visitor can explore in one sentence.
  thumbnail: /demos/your-demo/thumbnail.svg
  thumbnail_alt: Explain what is shown in the preview.
  url: /demos/your-demo/
  category: Geometry · Interactive
```

## Shared styling conventions

`assets/css/site.css` defines the shared tokens: `--paper`, `--surface`, `--ink`, `--muted`, `--accent`, `--line`, `--heading`, and `--body`. Inherit them; do not hard-code a new page background, type system, header, or footer. The shared shell uses the academic editorial design throughout the site.

`assets/css/demo.css` provides `.demo-header`, `.demo-workspace`, `.control-group`, `.slider-control`, `.slider-readout`, `.math-display`, `.vis-container`, `.canvas-wrapper`, `.canvas-label`, `.demo-reset`, and `.demo-explanation`. The cylinder is a complete working example. Specific visualization colors may remain fixed to distinguish scientific quantities consistently.

- Place a back link, one `<h1>`, and a plain-language introduction in `.demo-header`.
- Use `.demo-workspace` for controls and the experiment; `.prose.demo-explanation` is for explanatory text.
- Associate every control with a visible `<label>`. Give canvases an accessible description and expose important computed values as text.
- Let controls wrap responsively; never require a fixed-width desktop page. Resize the canvas backing store when its container changes.
- Scope additional CSS under your demo’s class; avoid global `body`, `h1`, or `canvas` overrides. Add a separate demo-specific stylesheet in the HTML if necessary.
- Prefer rendering when a value changes instead of a permanent animation loop. Respect reduced-motion preferences for nonessential animation.
- Set `math: true` only when equations are needed. In HTML, MathJax accepts `\(inline\)` and `\[display\]`; in Markdown use Kramdown's `$$` notation.
- Keep dependency versions pinned. Explain unavailable graphics or network dependencies with a visible status message; preserve any parts that can continue working.

Completely independent HTML documents without Jekyll front matter are also supported as static files, but must link the shared CSS and supply their own accessible navigation. The supplied template is the recommended route.

This README is excluded from the published website.
