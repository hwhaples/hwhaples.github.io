"""Check a normal Jekyll production build; uses Python's standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys
import xml.etree.ElementTree as ET


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.images, self.scripts = [], set(), [], []
        self.headings = 0
        self.refreshes = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag in ('img', 'script', 'link'):
            value = attrs.get('src') if tag != 'link' else attrs.get('href')
            # Absolute canonical URLs belong to production, not the local file tree.
            if value and attrs.get('rel') != 'canonical':
                self.links.append(value)
        if tag == 'img':
            self.images.append(attrs)
        if tag == 'script':
            self.scripts.append(attrs.get('src', ''))
        if tag == 'h1':
            self.headings += 1
        if tag == 'meta' and attrs.get('http-equiv', '').lower() == 'refresh':
            self.refreshes.append(attrs.get('content', ''))


def check(root):
    root = root.resolve()
    errors = []
    documents = {p: Document(p.read_text(encoding='utf-8')) for p in root.rglob('*.html')}
    for path, document in documents.items():
        relative = path.relative_to(root)
        if not document.refreshes and document.headings != 1:
            errors.append(f'{relative}: expected exactly one h1')
        for img in document.images:
            if 'alt' not in img or not img['alt'].strip():
                errors.append(f'{relative}: image missing descriptive alt text')
        for href in document.links:
            url = urlsplit(href)
            if url.scheme or url.netloc:
                continue
            raw = unquote(url.path)
            target = (root / raw.lstrip('/') if raw.startswith('/') else path.parent / raw).resolve() if raw else path
            if not target.is_relative_to(root):
                errors.append(f'{relative}: link escapes build directory: {href}')
                continue
            if target.is_dir():
                target /= 'index.html'
            if not target.is_file():
                errors.append(f'{relative}: broken local link {href}')
            elif url.fragment and target in documents and unquote(url.fragment) not in documents[target].ids:
                errors.append(f'{relative}: missing fragment {href}')
    for excluded in ('_archive', '_templates', '_previews', '_reviews', 'blog', 'preview', 'review', 'scripts', 'tests', 'docs', 'README.md', 'Gemfile', 'Gemfile.lock', 'demos/README.md', 'demos/cylinder/README.md', 'assets/js/design-preview.js'):
        if (root / excluded).exists():
            errors.append(f'Excluded source published: {excluded}')
    for required in ('index.html', 'projects/index.html', 'demos/index.html', 'demos/cylinder/index.html', 'cv/index.html', 'app_cylinder.html', 'resume/index.html'):
        if not (root / required).is_file():
            errors.append(f'Missing required output: {required}')
    for page in ('app_cylinder.html', 'resume/index.html'):
        document = documents.get(root / page)
        destination = '/demos/cylinder/' if page.startswith('app_') else '/cv/'
        if not document or not any(destination in value for value in document.refreshes):
            errors.append(f'Invalid compatibility redirect: {page}')
    for path, document in documents.items():
        text = path.read_text(encoding='utf-8')
        if 'preview-bar' in text or 'ARCHIVE_SENTINEL' in text:
            errors.append(f'Preview or archive content leaked: {path.relative_to(root)}')
        if 'MathJax-script' in text and path != root / 'demos/cylinder/index.html' and '\\[' not in text and '\\(' not in text:
            errors.append(f'MathJax loaded on a page without equations: {path.relative_to(root)}')
    sitemap = root / 'sitemap.xml'
    if sitemap.exists():
        tree = ET.parse(sitemap)
        for loc in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            url = urlsplit(loc.text)
            if url.netloc != 'hwhaples.com' or any(part in url.path for part in ('archive', 'preview', 'blog', 'template')):
                errors.append(f'Invalid sitemap URL: {loc.text}')
    else:
        errors.append('Sitemap missing')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'PASS: {len(documents)} HTML pages; internal links, fragments, images, redirects, sitemap, and publication boundaries.')


if __name__ == '__main__':
    check(Path(sys.argv[1] if len(sys.argv) > 1 else '_site'))
