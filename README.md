# hwhaples.com

A personal project portfolio built with Jekyll and hosted by GitHub Pages. The domain remains `hwhaples.com`. No hosting settings or DNS changes are required.

## Local preview

Install Ruby (3.3 recommended; 3.4 also tested) and Bundler, then run:

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --force_polling
```

Open <http://127.0.0.1:4000/>. The site uses the academic editorial design: warm paper, serif headings, burgundy accents, and a two-column project gallery.

Local preview uses the same layout and configuration as production. Publishing is a separate step through the existing GitHub Pages workflow.

### Compare homepage portrait placement locally

The main homepage keeps the portrait beside the introduction. `_reviews/` contains two local-only versions using the same content: the current placement and an alternative below “A little context.” These files are excluded from ordinary Jekyll output because the directory starts with an underscore.

Prepare an isolated snapshot of the original homepage, then start these two servers in separate terminals:

```sh
python scripts/prepare_home_review.py
bundle exec jekyll serve --source .cache/legacy-source --config .cache/legacy-source/_config.yml --destination .cache/legacy-site --port 4001 --force_polling
```

```sh
bundle exec jekyll serve --config _config.yml,_config.review.yml --destination .cache/review-site --port 4002 --force_polling
```

Open <http://127.0.0.1:4002/review/>. The original is a homepage snapshot for visual comparison; its historical links are preserved. The comparison configuration is for local review only and must not be used to publish the site. It never includes the archive in the normal site output.

## Add a project

1. Copy `_templates/project.md` to `_projects/my-project.md`.
2. Put images and downloads in `assets/projects/my-project/`.
3. Fill in the title, one-sentence description, cover path, meaningful `cover_alt`, and date. Dates control newest-first ordering; where only a year is known, use January 1 for sorting and set `period` to the accurate display text.
4. Write the article in Markdown. Delete starter sections and optional metadata you do not need. The filename becomes `/projects/my-project/`; keep it stable after publishing.
5. Set `featured: true` and choose a `featured_order` to select homepage projects. The homepage displays the four featured projects with the lowest order values; projects without an explicit order default to 1000. The current four are deliberately curated in order: VAM, Magprint, solar thermal air receiver, and ICARUS. The full gallery stays newest-first. Set `draft_content: false` once the text is reviewed. That flag controls the review notice, **not visibility**. Keep unpublished writing outside `_projects/` (for example in the excluded `_templates/` folder).

No gallery file needs editing. Each project generates its own page and linked gallery card automatically. Homepage entries link to the same article.

Captioned figure:

```liquid
{% include figure.html src="/assets/projects/my-project/figure.jpg" alt="Describe the image." caption="Figure 2. Explain what this shows, and credit the source." %}
```

Figures link to their full-resolution image. Add sources with ordinary Markdown links or footnotes (`[^source]` with a matching `[^source]: Author, Title, year.`). Use `papers` metadata for prominently listed papers, DOIs, related resources, or downloads. Links may be absolute external URLs or root-relative asset paths.

Set `cover_position` to adjust the gallery thumbnail crop, and `cover_contain: true` to show an uncropped portrait photograph in the article hero. A `date_label` can replace the displayed year when the exact project chronology has not been established; `date` still controls gallery ordering. Use the video include for a responsive YouTube player with a direct viewing link:

```liquid
{% include video.html id="VIDEO_ID" title="A descriptive video title" caption="What the reader will see." %}
```

The optional `archive` argument adds a fallback link. Embedding availability depends on the video host and owner; a direct link remains available below the player.

For equations set `math: true`. Kramdown accepts `$$x^2$$` inline and a separate `$$ ... $$` block for display math. MathJax 3 renders it; its script loads only on pages that opt in. Fenced code blocks, lists, blockquotes, and Markdown tables are supported. Use descriptive headings and image descriptions.

## Update other content

- `_data/profile.yml`: homepage biography, portrait, background, and contact/profile links. The illustrated portrait is selected by default; set `portrait` to `/assets/images/hunter-photo.png` and update `portrait_alt` to use the supplied photograph instead. Original image files are copied unchanged into the site assets.
- `cv/index.md`: traditional CV; the browser’s **Print / Save PDF** action uses the print stylesheet. Education and professional dates are based on the supplied résumé and current research information.
- `_data/navigation.yml`: shared navigation. Writing links to VOLUMETRIC on Substack, so there is no local blog to maintain.
- `demos/README.md`: add standalone HTML demos and apply the shared styling conventions.

## Archive

`_archive/legacy/` preserves the old source and assets. It is excluded from the built site, navigation, and sitemap. This is an unpublished repository archive, **not private storage**: files in a public GitHub repository remain viewable through GitHub. The original untracked Blackjack file stays untouched under `blog/_posts/`; the entire `blog` directory is excluded from publishing.

The older project articles are curated draft adaptations of existing material. The two HMC Clinic projects have separate articles for solar minigrid reliability and Halon recovery. Month/day values used for sorting do not assert exact project completion dates. The biography and CV have been updated using the owner's current research information, supplied résumé, and official MIT profile; the older project write-ups still need review before launch. Recent research and startup projects can be added once figures and project-specific descriptions are available.

## Verify and publish

```sh
bundle exec ruby scripts/verify.rb
node scripts/check_cylinder.cjs
bundle exec jekyll build
python scripts/check_site.py _site
```

The Ruby check builds an isolated fixture site to exercise adding a project, equation/footnote/code rendering, automatic gallery/featured links, and archive/template exclusion without touching your content. The Node check verifies the cylinder geometry, control limits, reset, and 2D fallback without a GPU or network. The Python check validates generated internal links, fragments, images, redirects, sitemap, and publication boundaries.

Review desktop and mobile layouts, demo controls, CV print preview, and draft content. When ready, use the repository’s existing review/merge/push workflow to its configured GitHub Pages publishing branch. Publishing is separate from local implementation. Keep `CNAME` unchanged. The old `/app_cylinder.html` and `/resume/` URLs redirect to their replacements; unselected legacy articles are intentionally not republished.

The dependency lock includes Windows and Linux platforms. GitHub Pages gem 232 supplies Jekyll 3.10. No custom build plugins are required. On Windows, `--force_polling` avoids the obsolete `wdm` extension. In the Codex filesystem sandbox, Ruby globbing may require running Bundler/Jekyll with the host’s normal filesystem access.
