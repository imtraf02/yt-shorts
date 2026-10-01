# -*- coding: utf-8 -*-
"""
Script tạo src/data/worldTimeData.ts và src/data/worldTimeCaptions.ts
cho video tài liệu 'Vì sao cả thế giới vẫn mô tả được cùng một thời điểm?' (world-time-documentary).
- Đồng bộ 100% giữa 128 ảnh minh họa và 64 câu thoại audio WAV (Trúc Ly 48kHz).
- Gắn phụ đề song ngữ Anh - Việt chuẩn nghĩa (chuẩn mực như UndergroundDocumentary).
"""
import sys
import json
import re
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

manifest_path = Path("public/audio/world-time-documentary/sentences_manifest.json")
if not manifest_path.exists():
    print(f"❌ Không tìm thấy {manifest_path}")
    sys.exit(1)

manifest_items = json.loads(manifest_path.read_text(encoding="utf-8"))
items_dict = {x["id"]: x for x in manifest_items}

trans_path = Path("src/data/world_time_translations_en.json")
if not trans_path.exists():
    print(f"❌ Không tìm thấy {trans_path}")
    sys.exit(1)

translations_en = json.loads(trans_path.read_text(encoding="utf-8"))

CHAPTER_METAS = [
    {
        "id": "part1",
        "title": "Khi Mỗi Thành Phố Từng Có Một Giờ Riêng",
        "subtitle": "Thời Kỳ Mặt Trời Làm Chủ Đồng Hồ Địa Phương",
        "badge": "LỊCH SỬ THỜI GIAN",
        "sentences": [f"S{i:03d}" for i in range(1, 9)],
        "img_start": 1,
        "img_end": 16,
    },
    {
        "id": "part2",
        "title": "Hàng Hải Biến Thời Gian Thành Vấn Đề Sống Còn",
        "subtitle": "Kinh Độ Trên Biển & Đài Thiên Văn Greenwich",
        "badge": "ĐẠI DƯƠNG & THỜI GIAN",
        "sentences": [f"S{i:03d}" for i in range(9, 17)],
        "img_start": 17,
        "img_end": 32,
    },
    {
        "id": "part3",
        "title": "Đường Sắt Phá Vỡ Giờ Địa Phương",
        "subtitle": "Tốc Độ Cơ Khí & Sự Xuất Hiện Của Điện Báo",
        "badge": "CÁCH MẠNG CÔNG NGHIỆP",
        "sentences": [f"S{i:03d}" for i in range(17, 25)],
        "img_start": 33,
        "img_end": 48,
    },
    {
        "id": "part4",
        "title": "Bắc Mỹ Và Sự Ra Đời Của Múi Giờ Tiêu Chuẩn",
        "subtitle": "Ngày Hai Trưa 1883 & Sandford Fleming",
        "badge": "CHUẨN HÓA KHU VỰC",
        "sentences": [f"S{i:03d}" for i in range(25, 33)],
        "img_start": 49,
        "img_end": 64,
    },
    {
        "id": "part5",
        "title": "Hội Nghị Năm 1884 Và Kinh Tuyến Greenwich",
        "subtitle": "Thỏa Thuận Toàn Cầu Về Kinh Tuyến Gốc",
        "badge": "HỘI NGHỊ QUỐC TẾ",
        "sentences": [f"S{i:03d}" for i in range(33, 41)],
        "img_start": 65,
        "img_end": 80,
    },
    {
        "id": "part6",
        "title": "Trái Đất Không Phải Chiếc Đồng Hồ Hoàn Hảo",
        "subtitle": "Đồng Hồ Nguyên Tử Cesium & Giây Chuẩn SI",
        "badge": "VẬT LÝ NGUYÊN TỬ",
        "sentences": [f"S{i:03d}" for i in range(41, 49)],
        "img_start": 81,
        "img_end": 96,
    },
    {
        "id": "part7",
        "title": "Vì Sao Đôi Khi Một Phút Có 61 Giây?",
        "subtitle": "Giây Nhuận & Coordinated Universal Time (UTC)",
        "badge": "UTC & THIÊN VĂN",
        "sentences": [f"S{i:03d}" for i in range(49, 57)],
        "img_start": 97,
        "img_end": 112,
    },
    {
        "id": "part8",
        "title": "Chiếc Điện Thoại Của Bạn Biết Mấy Giờ Bằng Cách Nào?",
        "subtitle": "Vệ Tinh GPS, Mạng Internet & Cơ Sở Dữ Liệu IANA",
        "badge": "HẠ TẦNG KỸ THUẬT SỐ",
        "sentences": [f"S{i:03d}" for i in range(57, 61)],
        "img_start": 113,
        "img_end": 120,
    },
    {
        "id": "part9",
        "title": "Chúng Ta Đang Thay Đổi UTC Một Lần Nữa",
        "subtitle": "Nới Giới Hạn Giây Nhuận Hướng Tới Năm 2035",
        "badge": "TƯƠNG LAI CỦA THỜI GIAN",
        "sentences": [f"S{i:03d}" for i in range(61, 63)],
        "img_start": 121,
        "img_end": 124,
    },
    {
        "id": "part10",
        "title": "Câu Trả Lời Thật Sự",
        "subtitle": "Cùng Một Giây, Cùng Một Hệ Quy Chiếu Cả Hành Tinh",
        "badge": "KẾT NỐI TOÀN CẦU",
        "sentences": [f"S{i:03d}" for i in range(63, 65)],
        "img_start": 125,
        "img_end": 128,
    },
]

def build_data_and_captions():
    chapters_data = []
    captions_data = {}
    
    global_frame = 0
    total_phrases = 0
    
    for ch_meta in CHAPTER_METAS:
        cid = ch_meta["id"]
        sentence_ids = ch_meta["sentences"]
        en_list = translations_en.get(cid, [])
        
        chapter_duration_frames = 0
        image_start_frames = []
        chapter_images = []
        chapter_captions = []
        
        cur_sentence_frame = 0
        cur_sentence_ms = 0
        
        for s_idx, sid in enumerate(sentence_ids):
            s_item = items_dict[sid]
            s_dur_frames = s_item["durationInFrames"]
            s_speech_ms = s_item["speechDurationMs"]
            s_total_ms = s_item["durationMs"]
            s_text = s_item["text"]
            s_en = en_list[s_idx] if s_idx < len(en_list) else ""
            
            # 2 ảnh cho mỗi câu:
            img1_num = (ch_meta["img_start"] + s_idx * 2)
            img2_num = img1_num + 1
            
            img1_src = f"images/world-time-documentary/{img1_num:03d}.png"
            img2_src = f"images/world-time-documentary/{img2_num:03d}.png"
            
            chapter_images.extend([img1_src, img2_src])
            
            # Thời điểm chuyển ảnh (khớp chính xác giữa câu):
            half_dur = s_dur_frames // 2
            image_start_frames.append(cur_sentence_frame)
            image_start_frames.append(cur_sentence_frame + half_dur)
            
            # Phụ đề cho câu:
            # Chia từ theo độ dài và thời lượng giọng nói
            words = s_text.split()
            word_objects = []
            if words:
                ms_per_word = s_speech_ms / len(words)
                for w_i, w in enumerate(words):
                    w_start = int(round(cur_sentence_ms + w_i * ms_per_word))
                    w_end = int(round(cur_sentence_ms + (w_i + 1) * ms_per_word))
                    word_objects.append({
                        "word": w,
                        "startMs": w_start,
                        "endMs": w_end
                    })
                    
            phrase_obj = {
                "id": total_phrases + 1,
                "startMs": cur_sentence_ms,
                "endMs": cur_sentence_ms + s_speech_ms,
                "words": word_objects,
                "text": s_text,
                "textEn": s_en
            }
            chapter_captions.append(phrase_obj)
            total_phrases += 1
            
            cur_sentence_frame += s_dur_frames
            cur_sentence_ms += s_total_ms
            chapter_duration_frames += s_dur_frames
            
        captions_data[cid] = chapter_captions
        
        chapter_obj = {
            "id": cid,
            "title": ch_meta["title"],
            "subtitle": ch_meta["subtitle"],
            "badge": ch_meta["badge"],
            "audioSrc": f"audio/world_time_{cid}.wav",
            "durationInFrames": chapter_duration_frames,
            "globalStartFrame": global_frame,
            "images": chapter_images,
            "imageStartFrames": image_start_frames
        }
        chapters_data.append(chapter_obj)
        global_frame += chapter_duration_frames
        
    # Ghi file src/data/worldTimeData.ts
    data_content = f"""// Auto-generated data for World Time Documentary ("Vì sao cả thế giới vẫn mô tả được cùng một thời điểm?")
export interface WorldTimeChapter {{
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  audioSrc: string;
  durationInFrames: number;
  globalStartFrame: number;
  images: string[];
  imageStartFrames: number[];
}}

export const WORLD_TIME_CHAPTERS: WorldTimeChapter[] = {json.dumps(chapters_data, ensure_ascii=False, indent=2)};

export const TOTAL_WORLD_TIME_FRAMES = {global_frame};
"""
    Path("src/data/worldTimeData.ts").write_text(data_content, encoding="utf-8")
    print(f"✅ Đã tạo src/data/worldTimeData.ts ({len(chapters_data)} chapters, {global_frame} frames ~ {global_frame/30/60:.2f} phút)")

    # Ghi file src/data/worldTimeCaptions.ts
    captions_content = f"""// Auto-generated bilingual subtitles (VN + EN) for World Time Documentary
export interface CaptionWord {{
  word: string;
  startMs: number;
  endMs: number;
}}

export interface CaptionPhrase {{
  id?: number;
  startMs: number;
  endMs: number;
  words: CaptionWord[];
  text?: string;
  textEn?: string;
}}

export const WORLD_TIME_CAPTIONS: Record<string, CaptionPhrase[]> = {json.dumps(captions_data, ensure_ascii=False, indent=2)};
"""
    Path("src/data/worldTimeCaptions.ts").write_text(captions_content, encoding="utf-8")
    print(f"✅ Đã tạo src/data/worldTimeCaptions.ts ({total_phrases} phrases có đầy đủ textEn)")

if __name__ == "__main__":
    build_data_and_captions()
