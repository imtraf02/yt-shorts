# -*- coding: utf-8 -*-
"""
Tạo file src/data/pharaohData.ts chứa đầy đủ 14 chapters, 123 ảnh và descriptions,
tự động đọc chính xác thời lượng từ các file public/audio/pharaoh_part*.wav.
"""

import sys
import json
import wave
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def get_wav_duration_seconds(wav_path: Path) -> float:
    with wave.open(str(wav_path), 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def generate_ts():
    meta_path = Path("src/data/pharaoh_chapters.json")
    if not meta_path.exists():
        print(f"❌ Không tìm thấy {meta_path}")
        return

    with open(meta_path, 'r', encoding='utf-8') as f:
        chapters_meta = json.load(f)

    chapters = []
    cur_start_frame = 0
    out_audio_dir = Path("public/audio")

    for ch in chapters_meta:
        sec_id = ch["id"]
        p_num = ch["chapter_num"]
        wav_file = out_audio_dir / f"pharaoh_{sec_id}.wav"
        if wav_file.exists():
            dur_s = get_wav_duration_seconds(wav_file)
            dur = int(round(dur_s * 30))
        else:
            words = ch.get("word_count", 300)
            dur = int(round((words / 2.5) * 30))

        images = ch["images"]
        descriptions = ch["image_descriptions"]
        num_imgs = len(images)

        # Mặc định chia đều thời gian ảnh nếu chưa có timing cụ thể
        base_dur = dur // num_imgs
        default_start_frames = [k * base_dur for k in range(num_imgs)]

        chapters.append({
            "id": sec_id,
            "chapterNumber": p_num,
            "partLabel": f"PHẦN {p_num}",
            "historicalEra": ch["historical_era"],
            "title": ch["title"],
            "subtitle": ch["subtitle"],
            "audioSrc": f"audio/pharaoh_{sec_id}.wav",
            "durationInFrames": dur,
            "startFrame": cur_start_frame,
            "images": images,
            "imageDescriptions": descriptions,
            "imageStartFrames": default_start_frames
        })
        cur_start_frame += dur

    ts_content = f"""// Dữ liệu 14 chương phim tài liệu 'Tại sao Pharaoh ngừng xây Kim tự tháp? Bí mật đền Karnak và Thung lũng các vị Vua'
export interface PharaohChapter {{
  id: string;
  chapterNumber: number;
  partLabel: string;
  historicalEra: string;
  title: string;
  subtitle: string;
  audioSrc: string;
  durationInFrames: number;
  startFrame: number;
  images: string[];
  imageDescriptions: string[];
  imageStartFrames?: number[];
}}

export const PHARAOH_CHAPTERS: PharaohChapter[] = {json.dumps(chapters, indent=2, ensure_ascii=False)};

export const TOTAL_PHARAOH_FRAMES = PHARAOH_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    out_path = Path("src/data/pharaohData.ts")
    out_path.write_text(ts_content, encoding="utf-8")
    print(f"✅ Đã tạo {out_path} ({len(chapters)} chapters, {cur_start_frame} total frames)")

if __name__ == "__main__":
    generate_ts()
