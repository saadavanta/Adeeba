#!/usr/bin/env python3
"""Assemble the single-file Wellness Journey site."""
import base64, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')

def read(name):
    with open(os.path.join(SRC, name), encoding='utf-8') as f:
        return f.read()

def data_uri(path, mime):
    with open(path, 'rb') as f:
        return 'data:%s;base64,%s' % (mime, base64.b64encode(f.read()).decode())

html = read('pages-home.html') + '\n' + read('pages-inner.html') + '\n' + read('footer.html')

css = '\n'.join([read('styles-a.css'), read('styles-b.css'), read('styles-c.css')])
js = '\n'.join([read('data.js'), read('app.js')])

for token in ('</script', '<!--', '-->'):
    if token in js:
        raise SystemExit('JS contains unsafe token: %r' % token)

html = html.replace('/*{{STYLES}}*/', css)
html = html.replace('/*{{APP_JS}}*/', js)

imgs = {
    '{{IMG_HERO}}': ('img/hero.jpg', 'image/jpeg'),
    '{{IMG_TABLE}}': ('img/table.jpg', 'image/jpeg'),
    '{{IMG_TEEN}}': ('img/teen.jpg', 'image/jpeg'),
    '{{IMG_CONSULT}}': ('img/consult.jpg', 'image/jpeg'),
}
for token, (rel, mime) in imgs.items():
    html = html.replace(token, data_uri(os.path.join(SRC, rel), mime))

leftover = re.findall(r'\{\{[A-Z_]+\}\}', html)
if leftover:
    raise SystemExit('Unreplaced tokens: %s' % sorted(set(leftover)))

out = os.path.join(ROOT, 'index.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)

print('wrote', out, round(os.path.getsize(out) / 1024, 1), 'KB')
