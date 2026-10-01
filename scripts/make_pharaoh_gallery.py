# -*- coding: utf-8 -*-
import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


def main():
    chapters_path = Path("src/data/pharaoh_chapters.json")
    chapters = json.loads(chapters_path.read_text(encoding="utf-8"))

    html = """<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>TẠI SAO PHARAOH NGỪNG XÂY KIM TỰ THÁP? — Preview Gallery</title>
<style>
  :root {
    --bg-dark: #090603;
    --card-bg: #150f09;
    --card-border: #3d2814;
    --accent-gold: #f59e0b;
    --accent-yellow: #fde68a;
    --accent-sand: #d97706;
    --text-main: #fef3c7;
    --text-muted: #b45309;
    --text-body: #fde68a;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--bg-dark);
    color: var(--text-main);
    padding: 32px;
    margin: 0;
  }
  .header {
    text-align: center;
    max-width: 1000px;
    margin: 0 auto 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--card-border);
  }
  .header h1 {
    font-size: 32px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  .header .badge {
    display: inline-block;
    background: rgba(245, 158, 11, 0.15);
    color: var(--accent-gold);
    border: 1px solid rgba(245, 158, 11, 0.4);
    padding: 4px 14px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .header p {
    color: #d1a774;
    font-size: 16px;
    line-height: 1.5;
  }
  .chapter-section {
    max-width: 1300px;
    margin: 0 auto 50px;
    background: rgba(21, 15, 9, 0.7);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  }
  .chapter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  }
  .chapter-title-group h2 {
    margin: 0 0 6px 0;
    font-size: 22px;
    color: var(--accent-gold);
  }
  .chapter-title-group .era {
    font-size: 12px;
    color: #fef08a;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.35);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 8px;
  }
  .chapter-title-group .sub {
    font-size: 14px;
    color: #d1a774;
  }
  audio {
    height: 38px;
    outline: none;
    border-radius: 20px;
  }
  .images-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 18px;
  }
  .image-card {
    background: #1b1208;
    border: 1px solid #3d2814;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .image-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-gold);
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 */
    background: #0d0804;
  }
  .image-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-wrapper .img-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(9, 6, 3, 0.85);
    border: 1px solid rgba(245, 158, 11, 0.4);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent-gold);
  }
  .card-body {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
  .card-desc {
    font-size: 13px;
    line-height: 1.45;
    color: #fde68a;
  }
</style>
</head>
<body>

<div class="header">
  <div class="badge">Phim Tài Liệu Khảo Cổ · 16:9 4K Cinema</div>
  <h1>TẠI SAO PHARAOH NGỪNG XÂY KIM TỰ THÁP?</h1>
  <p>Bí Mật Đền Karnak và Thung Lũng Các Vị Vua · Giọng đọc Trúc Ly (48kHz Hi-Fi) · 14 Phần · 123 Minh Họa Phân Cảnh</p>
</div>
"""

    for ch in chapters:
        html += f"""
<div class="chapter-section">
  <div class="chapter-header">
    <div class="chapter-title-group">
      <h2><span class="era">{ch['historical_era']}</span> {ch['title']}</h2>
      <div class="sub">{ch['subtitle']} · ({ch['word_count']} từ · {len(ch['images'])} ảnh)</div>
    </div>
    <audio controls preload="none" src="{ch['audio_file']}"></audio>
  </div>
  <div class="images-grid">
"""
        for img, desc in zip(ch["images"], ch["image_descriptions"]):
            img_num = Path(img).stem
            html += f"""
    <div class="image-card">
      <div class="image-wrapper">
        <img loading="lazy" src="{img}" alt="{desc}" />
        <span class="img-badge">Ảnh #{img_num}</span>
      </div>
      <div class="card-body">
        <div class="card-desc">{desc}</div>
      </div>
    </div>
"""
        html += """
  </div>
</div>
"""

    html += """
</body>
</html>
"""

    out_file = Path("preview_pharaoh_gallery.html")
    out_file.write_text(html, encoding="utf-8")
    print(f"✅ Đã tạo trang thư viện: {out_file.resolve()}")

if __name__ == "__main__":
    main()
