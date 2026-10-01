# -*- coding: utf-8 -*-
import json
from pathlib import Path

def main():
    chapters_path = Path("src/data/fidel_chapters.json")
    chapters = json.loads(chapters_path.read_text(encoding="utf-8"))

    html = """<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>FIDEL CASTRO: NGƯỜI BẠN LỚN Ở BÊN KIA ĐẠI DƯƠNG — Preview Gallery</title>
<style>
  :root {
    --bg-dark: #070d18;
    --card-bg: #0f1c2e;
    --card-border: #1e3a5f;
    --accent-red: #ef4444;
    --accent-cyan: #38bdf8;
    --accent-gold: #facc15;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
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
    background: rgba(239, 68, 68, 0.15);
    color: var(--accent-red);
    border: 1px solid rgba(239, 68, 68, 0.4);
    padding: 4px 12px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .header p {
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1.5;
  }
  .chapter-section {
    max-width: 1300px;
    margin: 0 auto 50px;
    background: rgba(15, 28, 46, 0.6);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .chapter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(56, 189, 248, 0.15);
  }
  .chapter-title-group h2 {
    margin: 0 0 6px 0;
    font-size: 22px;
    color: var(--accent-cyan);
  }
  .chapter-title-group .era {
    font-size: 12px;
    color: var(--accent-gold);
    background: rgba(250, 204, 21, 0.1);
    border: 1px solid rgba(250, 204, 21, 0.3);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 8px;
  }
  .chapter-title-group .sub {
    font-size: 14px;
    color: var(--text-muted);
  }
  .audio-player {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  audio {
    height: 38px;
  }
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  .image-card {
    background: #09121e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, border-color 0.2s;
  }
  .image-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-cyan);
  }
  .image-card img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    background: #050b14;
  }
  .card-body {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }
  .card-num {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-gold);
    letter-spacing: 0.5px;
  }
  .card-desc {
    font-size: 13px;
    line-height: 1.45;
    color: #cbd5e1;
  }
</style>
</head>
<body>

<div class="header">
  <div class="badge">Phim Tài Liệu Lịch Sử Chuyên Sâu · 16:9 4K / Full HD</div>
  <h1>FIDEL CASTRO: NGƯỜI BẠN LỚN Ở BÊN KIA ĐẠI DƯƠNG</h1>
  <p>Toàn bộ 12 chương, 125 ảnh minh họa 2D anime điện ảnh nhiệt đới, giọng thuyết minh Trúc Ly 48kHz (VieNeu-TTS v3 Turbo), phụ đề động word-level và âm thanh Remotion.</p>
</div>
"""

    for ch in chapters:
        ch_num = str(ch['chapter_num']).padStart(2, '0') if hasattr(str(ch['chapter_num']), 'padStart') else f"{ch['chapter_num']:02d}"
        html += f"""
<div class="chapter-section">
  <div class="chapter-header">
    <div class="chapter-title-group">
      <h2>{ch['title']}</h2>
      <div>
        <span class="era">{ch['historical_era']}</span>
        <span class="sub">{ch['subtitle']} ({len(ch['images'])} ảnh · {ch['word_count']} từ)</span>
      </div>
    </div>
    <div class="audio-player">
      <audio controls src="public/{ch['audio_file']}"></audio>
    </div>
  </div>

  <div class="image-grid">
"""
        for i, (img, desc) in enumerate(zip(ch['images'], ch['image_descriptions'])):
            img_num = Path(img).stem
            html += f"""    <div class="image-card">
      <img src="public/{img}" alt="{desc}" loading="lazy" />
      <div class="card-body">
        <span class="card-num">Ảnh #{img_num}</span>
        <span class="card-desc">{desc}</span>
      </div>
    </div>
"""
        html += """  </div>
</div>
"""

    html += """
</body>
</html>
"""
    out_html = Path("preview_fidel_gallery.html")
    out_html.write_text(html, encoding="utf-8")
    print(f"✅ Đã tạo {out_html}")

if __name__ == "__main__":
    main()
