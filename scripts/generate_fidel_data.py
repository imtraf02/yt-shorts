# -*- coding: utf-8 -*-
"""
Tạo file src/data/fidelCastroData.ts chứa đầy đủ 12 chapters, 125 ảnh và descriptions,
tự động đọc chính xác thời lượng từ các file public/audio/fidel_part*.wav.
"""

import json
import wave
from pathlib import Path
from build_fidel_tts import FIDEL_SECTIONS, IMAGE_DESCRIPTIONS

def get_wav_duration_seconds(wav_path: Path) -> float:
    with wave.open(str(wav_path), 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def generate_ts():
    chapters = []
    desc_idx = 0
    cur_start_frame = 0

    out_audio_dir = Path("public/audio")

    for sec in FIDEL_SECTIONS:
        sec_id = sec["id"]
        wav_file = out_audio_dir / f"fidel_{sec_id}.wav"
        if wav_file.exists():
            dur_s = get_wav_duration_seconds(wav_file)
            dur = int(round(dur_s * 30))
        else:
            # Ước lượng 150 words/min = 2.5 words/sec -> 30 fps
            words = len(sec["text"].split())
            dur = int(round((words / 2.5) * 30))

        start_img, end_img = sec["image_range"]
        num_imgs = end_img - start_img + 1

        images = []
        descriptions = []
        for i in range(start_img, end_img + 1):
            images.append(f"images/fidel-castro/{i:03d}.png")
            descriptions.append(IMAGE_DESCRIPTIONS[desc_idx])
            desc_idx += 1

        # Mặc định chia đều thời gian ảnh nếu chưa có timing cụ thể
        base_dur = dur // num_imgs
        default_start_frames = [k * base_dur for k in range(num_imgs)]

        chapters.append({
            "id": sec_id,
            "chapterNumber": sec["chapter_num"],
            "partLabel": f"PHẦN {sec['chapter_num']}",
            "historicalEra": sec["historical_era"],
            "title": sec["title"],
            "subtitle": sec["subtitle"],
            "audioSrc": f"audio/fidel_{sec_id}.wav",
            "durationInFrames": dur,
            "startFrame": cur_start_frame,
            "images": images,
            "imageDescriptions": descriptions,
            "imageStartFrames": default_start_frames
        })
        cur_start_frame += dur

    ts_content = f"""// Dữ liệu 12 chương phim tài liệu 'Fidel Castro: Người bạn lớn ở bên kia đại dương'
export interface FidelChapter {{
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

export const FIDEL_CHAPTERS: FidelChapter[] = {json.dumps(chapters, indent=2, ensure_ascii=False)};

export const TOTAL_FIDEL_FRAMES = FIDEL_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    out_path = Path("src/data/fidelCastroData.ts")
    out_path.write_text(ts_content, encoding="utf-8")
    print(f"✅ Đã tạo {out_path} ({len(chapters)} chapters, {desc_idx} images, {cur_start_frame} total frames)")

if __name__ == "__main__":
    generate_ts()
