# frozen_string_literal: true
# Integration check: exercise the real Jekyll pipeline in an isolated source tree.
require 'jekyll'
require 'nokogiri'
require 'tmpdir'
require 'fileutils'
require 'rbconfig'

ROOT = File.expand_path('..', __dir__)
CACHE = File.join(ROOT, '.cache')
FileUtils.mkdir_p(CACHE)

def assert(condition, message)
  raise message unless condition
end

def html_at(destination, path)
  Nokogiri::HTML(File.read(File.join(destination, path), encoding: 'UTF-8'))
end

def build(source, output)
  configs = [File.join(source, '_config.yml')]
  success = system(RbConfig.ruby, Gem.bin_path('jekyll', 'jekyll'), 'build',
                   '--config', configs.join(','), '--source', source,
                   '--destination', output, '--quiet', '--safe')
  raise 'Fixture build failed' unless success
end

Dir.mktmpdir('portfolio-check-', CACHE) do |temporary|
  source = File.join(temporary, 'source')
  output = File.join(temporary, 'output')
  FileUtils.mkdir_p(source)
  %w[_config.yml _data _includes _layouts _projects _templates assets demos cv projects resume index.html app_cylinder.html 404.html robots.txt sitemap.xml CNAME favicon.ico].each do |path|
    FileUtils.cp_r(File.join(ROOT, path), source)
  end
  %w[_archive/legacy blog/_posts].each do |path|
    FileUtils.mkdir_p(File.join(source, path))
    File.write(File.join(source, path, 'unpublished.html'), 'ARCHIVE_SENTINEL')
  end
  fixture_path = File.join(source, '_projects', 'authoring-check.md')
  File.write(fixture_path, <<~'MARKDOWN')
    ---
    title: A deliberately long project title about the intersection of engineering research and visual communication
    description: A fixture that verifies the complete authoring workflow.
    date: 2026-01-01
    cover: /assets/projects/solar-minigrid-reliability/cover.jpg
    cover_alt: Solar panels on a hillside.
    featured: true
    featured_order: 0
    math: true
    papers:
      - title: Reference paper
        url: https://doi.org/10.1126/science.1069580
    ---
    ## Readable text

    A reference with a footnote.[^ref]

    [^ref]: A reference entry.

    {% include figure.html src="/assets/projects/solar-minigrid-reliability/cover.jpg" alt="A test figure." caption="Figure 2. A test caption." %}

    $$a = \frac{r}{\cos\alpha}$$

    ```python
    radius = 2
    ```
  MARKDOWN
  build(source, output)
  home = html_at(output, 'index.html')
  gallery = html_at(output, 'projects/index.html')
  article = html_at(output, 'projects/authoring-check/index.html')
  path = '/projects/authoring-check/'
  assert(home.at_css("a.project-card-link[href='#{path}']"), 'Featured project missing from homepage')
  assert(gallery.at_css("a.project-card-link[href='#{path}']"), 'New project missing from gallery')
  assert(gallery.css('a.project-card-link').first['href'] == path, 'Newest-first ordering failed')
  assert(article.at_css('h1').text.include?('deliberately long'), 'Dedicated article not rendered')
  assert(article.at_css('figcaption').text.include?('Figure 2'), 'Figure/caption missing')
  assert(article.at_css('.footnotes'), 'Footnotes missing')
  assert(article.at_css('code').text.include?('radius'), 'Code block missing')
  assert(article.to_html.include?('\\[a ='), 'Equation markup missing')
  assert(article.at_css('#MathJax-script'), 'MathJax missing from math page')
  assert(!html_at(output, 'projects/solar-minigrid-reliability/index.html').at_css('#MathJax-script'), 'MathJax loaded unnecessarily')
  assert(article.at_css("a[href='https://doi.org/10.1126/science.1069580']"), 'Paper link missing')
  %w[_archive _templates _previews blog preview].each do |path_to_exclude|
    assert(!File.exist?(File.join(output, path_to_exclude)), "Published excluded directory: #{path_to_exclude}")
  end
  assert(!File.exist?(File.join(output, 'assets/js/design-preview.js')), 'Published preview switcher')
  assert(File.file?(File.join(output, 'app_cylinder.html')), 'Legacy cylinder URL changed')
  redirect = html_at(output, 'app_cylinder.html')
  assert(redirect.at_css('meta[http-equiv="refresh"]')['content'].include?('/demos/cylinder/'), 'Cylinder redirect failed')
  assert(html_at(output, 'resume/index.html').at_css('meta[http-equiv="refresh"]')['content'].include?('/cv/'), 'CV redirect failed')

  # A project can remain in the gallery without appearing on the homepage.
  File.write(fixture_path, File.read(fixture_path).sub('featured: true', 'featured: false'))
  build(source, output)
  assert(!html_at(output, 'index.html').at_css("a.project-card-link[href='#{path}']"), 'Unfeatured project remained on homepage')
  assert(html_at(output, 'projects/index.html').at_css("a.project-card-link[href='#{path}']"), 'Unfeatured project disappeared from gallery')

  expected_featured = %w[volumetric-additive-manufacturing magprint solar-thermal-air-receiver icarus].map { |slug| "/projects/#{slug}/" }
  actual_featured = html_at(output, 'index.html').css('a.project-card-link').map { |link| link['href'] }
  assert(actual_featured == expected_featured, 'Homepage must show the four selected projects in the requested order')
  %w[solar-minigrid-reliability ametek-ameron halon-recovery taplok].each do |slug|
    assert(html_at(output, 'projects/index.html').at_css("a.project-card-link[href='/projects/#{slug}/']"), "Older project missing: #{slug}")
  end
  assert(html_at(output, 'index.html').at_css("a[href='mailto:hunter.whaples@gmail.com']"), 'Public Gmail contact missing from homepage')
  assert(html_at(output, 'cv/index.html').at_css("a[href='mailto:hunter.whaples@gmail.com']"), 'Public Gmail contact missing from CV')

end
puts 'PASS: project authoring, featured links, ordering, figures, references, math, code, redirects, and publication boundaries.'
