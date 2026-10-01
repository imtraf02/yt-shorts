# -*- coding: utf-8 -*-
"""
Tạo file src/data/leninData.ts chứa đầy đủ 13 chapters, 122 ảnh và descriptions.
"""

import json
from pathlib import Path
from build_lenin_tts import LENIN_SECTIONS, IMAGE_DESCRIPTIONS

FRAME_DURATIONS = {
    "part1": 1861,
    "part2": 2785,
    "part3": 3860,
    "part4": 2325,
    "part5": 3090,
    "part6": 3178,
    "part7": 3422,
    "part8": 2090,
    "part9": 2440,
    "part10": 2722,
    "part11": 1537,
    "part12": 2273,
    "part13": 3525,
}

def generate_ts():
    chapters = []
    desc_idx = 0
    cur_start_frame = 0

    for sec in LENIN_SECTIONS:
        sec_id = sec["id"]
        dur = FRAME_DURATIONS[sec_id]
        start_img, end_img = sec["image_range"]
        num_imgs = end_img - start_img + 1

        images = []
        descriptions = []
        for i in range(start_img, end_img + 1):
            images.append(f"images/lenin-documentary/{i:03d}.png")
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
            "audioSrc": f"audio/lenin_{sec_id}.wav",
            "durationInFrames": dur,
            "startFrame": cur_start_frame,
            "images": images,
            "imageDescriptions": descriptions,
            "imageStartFrames": default_start_frames
        })
        cur_start_frame += dur

    ts_content = f"""// Dữ liệu 13 chương phim tài liệu 'Lenin: Từ cậu bé Simbirsk đến người kiến tạo Liên Xô'
export interface LeninChapter {{
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

export const LENIN_CHAPTERS: LeninChapter[] = {json.dumps(chapters, indent=2, ensure_ascii=False)};

export const TOTAL_LENIN_FRAMES = LENIN_CHAPTERS.reduce(
  (acc, chapter) => acc + chapter.durationInFrames,
  0
);
"""
    out_path = Path("src/data/leninData.ts")
    out_path.write_text(ts_content, encoding="utf-8")
    print(f"✅ Đã tạo {out_path} ({len(chapters)} chapters, {desc_idx} images, {cur_start_frame} total frames)")

if __name__ == "__main__":
    generate_ts()
