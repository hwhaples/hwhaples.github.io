"""Stage only the archived homepage and its theme in an ignored local workspace."""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parent.parent
source = root / '.cache' / 'legacy-source'
archive = root / '_archive' / 'legacy'
source.mkdir(parents=True, exist_ok=True)
for folder in ('_layouts', '_includes', '_sass', 'css', 'fonts'):
    shutil.copytree(archive / folder, source / folder, dirs_exist_ok=True)
(source / 'image').mkdir(exist_ok=True)
for name in ('banner.png', 'logo.svg'):
    shutil.copy2(archive / 'image' / name, source / 'image' / name)
shutil.copy2(archive / 'index.html', source / 'index.html')
(source / '_config.yml').write_text('''title: Hunter Whaples
url: http://127.0.0.1:4001
baseurl: ""
markdown: kramdown
plugins: []
exclude: [Gemfile, Gemfile.lock]
sass:
  sass_dir: _sass
  style: compressed
''', encoding='utf-8')
print('Original homepage staged under .cache/legacy-source. Archive files unchanged.')
