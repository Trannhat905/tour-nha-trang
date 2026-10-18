# -*- coding: utf-8 -*-
"""Build download/index.html — gộp 15 slide tĩnh thành 1 file trình chiếu độc lập.
- Mỗi slide = 1 section full-viewport, canvas 1280x720 scale vừa màn hình
- Scroll-snap + phím mũi tên + dot nav + counter + progress + fullscreen (F / F11)
- Vá nội dung theo bản web mới nhất: NHÓM 4, số liệu dự báo 2026, bỏ dòng thành viên ở bìa
"""
import re, pathlib

SLIDES_DIR = pathlib.Path("/home/z/my-project/download/slides")
OUT = pathlib.Path("/home/z/my-project/download/index.html")

slides = [SLIDES_DIR / f"slide_{i:02d}.html" for i in range(1, 16)]
bodies, styles = [], []

def body_of(path: pathlib.Path) -> str:
    html = path.read_text(encoding="utf-8")
    m = re.search(r"<body>(.*)</body>", html, re.S)
    assert m, f"no body in {path.name}"
    inner = m.group(1).strip()
    assert re.match(r'<div class="slide[ "]', inner), f"no .slide root in {path.name}"
    return inner

def style_of(path: pathlib.Path) -> str:
    html = path.read_text(encoding="utf-8")
    m = re.search(r"<style>(.*?)</style>", html, re.S)
    if not m:
        return ""
    css = m.group(1)
    css = re.sub(r"html,\s*body\s*\{[^}]*\}", "", css)  # bỏ rule html,body
    return css.strip()

# ---------- slide 01: chip NHÓM 4 + bỏ dòng thành viên ----------
b = body_of(slides[0])
b = b.replace("BÀI THUYẾT TRÌNH NHÓM</span>", "BÀI THUYẾT TRÌNH NHÓM 4</span>")
b, n = re.subn(r"<p[^>]*>Thành viên: Kỳ Anh.*?</p>\s*", "", b, flags=re.S)
assert n == 1, f"members line removed {n}"
bodies.append(b); styles.append(style_of(slides[0]))

# ---------- slide 02: chip NHÓM 4 THỰC HIỆN ----------
b = body_of(slides[1]).replace("NHÓM THỰC HIỆN", "NHÓM 4 THỰC HIỆN")
bodies.append(b); styles.append(style_of(slides[1]))

# ---------- slide 03..07 nguyên bản ----------
for p in slides[2:7]:
    bodies.append(body_of(p)); styles.append(style_of(p))

# ---------- slide 08: số liệu dự báo 2026 + lưu ý ----------
b = body_of(slides[7])
b = b.replace('>16,4 triệu<', '>23,7 triệu<')
b = b.replace('lượt khách đến Khánh Hòa năm 2025', 'lượt khách du lịch tổng')
b = b.replace(
    '>5,5 triệu<',
    '><span style="font-size:26px;font-weight:800;margin-right:6px;">hơn</span>9,4 triệu<')
b = b.replace(
    '>Top 29<',
    '><span style="font-size:26px;font-weight:800;margin-right:6px;">hơn</span>80.200 tỷ<')
b = b.replace('vịnh đẹp nhất thế giới', 'đồng doanh thu du lịch dự kiến')
b = b.replace('workspace_premium', 'payments')
b = b.replace(
    'Nguồn: Hệ thống thống kê du lịch Việt Nam — 2025',
    'Lưu ý: Đây là số liệu dự báo cho cả năm 2026, chưa phải kết quả tổng kết cuối năm.')
assert '23,7 triệu' in b and '80.200 tỷ' in b
bodies.append(b); styles.append(style_of(slides[7]))

# ---------- slide 09..14 nguyên bản, slide 10 scope dot-navy ----------
for p in slides[8:14]:
    b, s = body_of(p), style_of(p)
    if p.name == "slide_10.html":
        b = b.replace('class="dot-track"', 'class="dot-track dt-navy"', 1)
        s = (s
             .replace('.dot-track span { background: rgba(255, 255, 255, 0.35); }',
                      '.dt-navy span { background: rgba(255, 255, 255, 0.35); }')
             .replace('.dot-track span.active { background: var(--accent); }',
                      '.dt-navy span.active { background: var(--accent); }'))
        assert 'dt-navy span' in s
    bodies.append(b); styles.append(s)

# ---------- slide 15: Nhóm 4 thực hiện ----------
b = body_of(slides[14]).replace('Nhóm thực hiện: Kỳ Anh', 'Nhóm 4 thực hiện: Kỳ Anh')
bodies.append(b); styles.append(style_of(slides[14]))

# ---------- gộp style (đã bỏ html,body) ----------
merged_styles = "\n/* ---- style riêng từng slide ---- */\n"
for i, s in enumerate(styles, 1):
    if s:
        merged_styles += f"\n/* slide {i:02d} */\n{s}\n"

global_css = (SLIDES_DIR / "global.css").read_text(encoding="utf-8")

dots = "\n".join(
    f'<button class="dotp" data-i="{i}" aria-label="Slide {i+1}"></button>'
    for i in range(15))

stages = "\n".join(
    f'  <section class="stage">{b}</section>'
    for b in bodies)

page = f"""<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tour Du Lịch Nha Trang — Bài thuyết trình Nhóm 4</title>
<meta name="description" content="Bài thuyết trình nhóm 4: Thiết kế tour du lịch Nha Trang 3 ngày 2 đêm — 15 slide, trình chiếu cuộn từng trang.">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
{global_css}

/* ---------- style riêng từng slide (đã bỏ rule html,body) ---------- */
{merged_styles}

/* ================= PLAYER ================= */
*{{box-sizing:border-box}}
html,body{{margin:0;padding:0;height:100%;background:#E9F1F6;font-family:'Be Vietnam Pro',sans-serif}}
.deck{{height:100vh;height:100dvh;overflow-y:auto;scroll-snap-type:y mandatory;scroll-behavior:smooth}}
.deck::-webkit-scrollbar{{width:0}}
.stage{{height:100vh;height:100dvh;display:flex;align-items:center;justify-content:center;overflow:hidden;scroll-snap-align:start;scroll-snap-stop:always;padding:0}}
.stage .slide{{flex:none;transform:scale(var(--s,1));transform-origin:center center;box-shadow:0 26px 70px rgba(10,61,98,.16)}}

/* ---------- hiệu ứng nhảy chữ khi chuyển slide ---------- */
.jw{{display:inline-block;white-space:nowrap}}
.jl{{display:inline-block;opacity:0}}
.stage.is-live .jl{{animation:jl-in .62s cubic-bezier(.22,1,.36,1) both;animation-delay:calc(var(--i,0)*26ms + .12s)}}
@keyframes jl-in{{
  0%{{opacity:0;transform:translateY(.65em) scale(.6) rotate(5deg)}}
  55%{{opacity:1;transform:translateY(-.14em) scale(1.08) rotate(-2.5deg)}}
  75%{{transform:translateY(.05em) scale(.985) rotate(1deg)}}
  100%{{opacity:1;transform:translateY(0) scale(1) rotate(0)}}
}}
.jf{{opacity:0;transform:translateY(16px)}}
.stage.is-live .jf{{animation:jf-in .55s cubic-bezier(.22,1,.36,1) both;animation-delay:calc(var(--d,0)*1ms + .28s)}}
@keyframes jf-in{{to{{opacity:1;transform:none}}}}
@media (prefers-reduced-motion:reduce){{.jl,.jf{{opacity:1!important;transform:none!important;animation:none!important}}}}
#bar{{position:fixed;top:0;left:0;height:4px;width:0;background:linear-gradient(90deg,#2EC4B6,#149D92);z-index:60;transition:width .35s cubic-bezier(.22,1,.36,1)}}
#dots{{position:fixed;right:14px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;z-index:60}}
.dotp{{width:12px;height:12px;border-radius:50%;border:0;padding:0;cursor:pointer;background:rgba(10,61,98,.22);transition:all .25s}}
.dotp:hover{{background:#149D92}}
.dotp.on{{background:#2EC4B6;transform:scale(1.45);box-shadow:0 0 0 3px rgba(255,255,255,.65)}}
#count{{position:fixed;left:18px;bottom:16px;z-index:60;font-size:13px;font-weight:700;letter-spacing:2px;color:#0A3D62;background:rgba(255,255,255,.78);backdrop-filter:blur(6px);border:1px solid rgba(10,61,98,.12);border-radius:999px;padding:8px 16px}}
#count b{{color:#149D92}}
#hint{{position:fixed;right:38px;bottom:16px;z-index:60;font-size:12px;font-weight:600;letter-spacing:1.5px;color:#0A3D62;background:rgba(255,255,255,.78);backdrop-filter:blur(6px);border:1px solid rgba(10,61,98,.12);border-radius:999px;padding:8px 16px}}
@media (max-width:640px){{#hint{{display:none}}#dots{{right:8px}}}}
@media print{{#bar,#dots,#count,#hint{{display:none}}html,body{{background:#fff}}.deck{{height:auto;overflow:visible;scroll-snap-type:none}}.stage{{height:auto;padding:0;page-break-after:always}}.stage .slide{{transform:none;box-shadow:none}}.jl,.jf{{opacity:1!important;transform:none!important;animation:none!important}}}}
</style>
</head>
<body>
<div id="bar"></div>
<main class="deck" id="deck">
{stages}
</main>
<nav id="dots" aria-label="Điều hướng slide">
{dots}
</nav>
<div id="count"><b>01</b> / 15</div>
<div id="hint">↑ ↓ CHUYỂN SLIDE · F TOÀN MÀN HÌNH</div>
<script>
(function () {{
  var deck = document.getElementById('deck');
  var stages = [].slice.call(document.querySelectorAll('.stage'));
  var dots = [].slice.call(document.querySelectorAll('.dotp'));
  var bar = document.getElementById('bar');
  var count = document.getElementById('count');
  var N = stages.length, cur = 0;

  function fit() {{
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720) * 0.97;
    document.querySelectorAll('.stage .slide').forEach(function (el) {{
      el.style.setProperty('--s', s);
    }});
  }}
  window.addEventListener('resize', fit); fit();

  function pad(n) {{ return (n < 10 ? '0' : '') + n; }}
  function setActive(i) {{
    cur = Math.max(0, Math.min(N - 1, i));
    dots.forEach(function (d, k) {{ d.classList.toggle('on', k === cur); }});
    count.innerHTML = '<b>' + pad(cur + 1) + '</b> / ' + N;
    bar.style.width = ((cur + 1) / N * 100) + '%';
  }}

  var io = new IntersectionObserver(function (es) {{
    es.forEach(function (e) {{
      if (e.isIntersecting) {{ e.target.classList.add('is-live'); setActive(stages.indexOf(e.target)); }}
      else e.target.classList.remove('is-live');
    }});
  }}, {{ root: deck, threshold: 0.55 }});
  stages.forEach(function (st) {{ io.observe(st); }});

  function go(i) {{ stages[Math.max(0, Math.min(N - 1, i))].scrollIntoView({{ behavior: 'smooth' }}); }}
  dots.forEach(function (d) {{
    d.addEventListener('click', function () {{ go(+d.dataset.i); }});
  }});

  document.addEventListener('keydown', function (e) {{
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {{ e.preventDefault(); go(cur + 1); }}
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') {{ e.preventDefault(); go(cur - 1); }}
    else if (e.key === 'Home') {{ e.preventDefault(); go(0); }}
    else if (e.key === 'End') {{ e.preventDefault(); go(N - 1); }}
    else if (e.key === 'f' || e.key === 'F') {{
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }}
  }});

  /* ---------- hiệu ứng nhảy chữ: tách ký tự cho tiêu đề/chip/số, fade cho đoạn ---------- */
  var TITLE_SEL = 'h1, h2, h3, .stat-num, .chip, .chip-navy, .chip-qa, .num-badge, .day-chip';
  var FADE_SEL = 'p, li, .cost-name, .cost-money';
  function graphemes(str) {{
    if (window.Intl && Intl.Segmenter) {{
      var sg = new Intl.Segmenter('vi', {{ granularity: 'grapheme' }});
      return Array.from(sg.segment(str), function (s) {{ return s.segment; }});
    }}
    return Array.from(str);
  }}
  function inFlex(node) {{
    var d = getComputedStyle(node.parentNode).display;
    return d.indexOf('flex') > -1 || d.indexOf('grid') > -1;
  }}
  function splitChars(el) {{
    var i = 0;
    function walk(node) {{
      [].slice.call(node.childNodes).forEach(function (ch) {{
        if (ch.nodeType === 3) {{
          var frag = document.createDocumentFragment();
          function charSpan(g) {{
            if (/^\\s+$/.test(g)) return document.createTextNode(g);
            var c = document.createElement('span');
            c.className = 'jl'; c.textContent = g;
            c.style.setProperty('--i', Math.min(i++, 34));
            return c;
          }}
          if (inFlex(ch)) {{
            var w0 = document.createElement('span'); w0.className = 'jw';
            graphemes(ch.nodeValue).forEach(function (g) {{ w0.appendChild(charSpan(g)); }});
            frag.appendChild(w0);
          }} else {{
            ch.nodeValue.split(/(\\s+)/).forEach(function (part) {{
              if (!part) return;
              if (/^\\s+$/.test(part)) {{ frag.appendChild(document.createTextNode(part)); return; }}
              var w = document.createElement('span'); w.className = 'jw';
              graphemes(part).forEach(function (g) {{ w.appendChild(charSpan(g)); }});
              frag.appendChild(w);
            }});
          }}
          node.replaceChild(frag, ch);
        }} else if (ch.nodeType === 1 && !ch.classList.contains('material-icons')) walk(ch);
      }});
    }}
    walk(el);
  }}
  document.querySelectorAll('.slide').forEach(function (sl) {{
    sl.querySelectorAll(TITLE_SEL).forEach(splitChars);
    var fi = 0;
    sl.querySelectorAll(FADE_SEL).forEach(function (el) {{
      el.classList.add('jf');
      el.style.setProperty('--d', Math.min(fi++ * 80, 800));
    }});
  }});

  setActive(0);
}})();
</script>
</body>
</html>
"""

# ---------- nhúng ảnh z-cdn thành base64: file độc lập tuyệt đối, không phụ thuộc CDN ----------
import base64, urllib.request

def inline_zcdn_images(html: str) -> str:
    cache = {}
    def repl(m):
        url = m.group(1)
        if url not in cache:
            try:
                with urllib.request.urlopen(url, timeout=30) as r:
                    data = r.read()
                mime = "image/png" if url.lower().endswith(".png") else "image/jpeg"
                cache[url] = "data:%s;base64,%s" % (mime, base64.b64encode(data).decode())
                print("  inline: %s (%.0f KB)" % (url.rsplit("/", 1)[-1], len(data) / 1024))
            except Exception as ex:
                print("  WARN giu nguyen URL (loi tai): %s — %s" % (url, ex))
                cache[url] = url
        return 'src="' + cache[url] + '"'
    return re.sub(r'src="(https://z-cdn\.chatglm\.cn/image-search-mcp/[^"]+)"', repl, html)

page = inline_zcdn_images(page)
leftover = len(re.findall(r'z-cdn\.chatglm\.cn/image-search', page))
assert leftover == 0, f"van con {leftover} anh chua nhung duoc"

OUT.write_text(page, encoding="utf-8")
print(f"OK → {OUT} ({OUT.stat().st_size/1024:.0f} KB), slides: {len(bodies)}")
