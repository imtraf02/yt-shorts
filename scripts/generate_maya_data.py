# -*- coding: utf-8 -*-
"""
Tạo file src/data/mayaData.ts chứa đầy đủ 8 chapters, 82 ảnh và descriptions,
tự động đọc chính xác thời lượng từ các file public/audio/maya_part*.wav.
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
    meta_path = Path("src/data/maya_chapters.json")
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
        wav_file = out_audio_dir / f"maya_{sec_id}.wav"
        if wav_file.exists():
            dur_s = get_wav_duration_seconds(wav_file)
            dur = int(round(dur_s * 30))
        else:
            words = ch.get("word_count", 400)
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
            "audioSrc": f"audio/maya_{sec_id}.wav",
            "durationInFrames": dur,
            "startFrame": cur_start_frame,
            "images": images,
            "imageDescriptions": descriptions,
            "imageStartFrames": default_start_frames
        })
        cur_start_frame += dur

    ts_content = f"""// Dữ liệu 8 chương phim tài liệu 'ĐẾ CHẾ MAYA SỤP ĐỔ: BÍ ẨN LỚN NHẤT CỦA NGÀNH KHẢO CỔ HỌC'
export interface MayaChapter {{
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

export const MAYA_CHAPTERS: MayaChapter[] = {json.dumps(chapters, indent=2, ensure_ascii=False)};

export const TOTAL_MAYA_FRAMES = MAYA_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    out_path = Path("src/data/mayaData.ts")
    out_path.write_text(ts_content, encoding="utf-8")
    print(f"✅ Đã tạo {out_path} ({len(chapters)} chapters, {cur_start_frame} total frames)")

if __name__ == "__main__":
    generate_ts()
