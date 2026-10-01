# -*- coding: utf-8 -*-
"""
Script tạo metadata và sinh audio thuyết minh chuẩn giọng Trúc Ly (VieNeu-TTS)
cho phim tài liệu 'TẠI SAO PHARAOH NGỪNG XÂY KIM TỰ THÁP? BÍ MẬT ĐỀN KARNAK VÀ THUNG LŨNG CÁC VỊ VUA' (14 phần)
"""

import os
import sys
import time
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from pharaoh_descriptions import PHARAOH_DESCRIPTIONS

CHAPTER_METAS = [
    {
        "num": 1,
        "title": "Mở Đầu: Nghịch Lý Sa Mạc Ai Cập",
        "subtitle": "Bí ẩn giữa kim tự tháp bị bỏ rơi và đại đền Karnak tráng lệ",
        "historical_era": "2600 TCN - 1000 TCN · TỔNG QUAN",
        "image_range": (1, 8),
    },
    {
        "num": 2,
        "title": "Thời Đại Hoàng Kim Của Kim Tự Tháp",
        "subtitle": "Từ kiến trúc sư Imhotep đến đại kỳ quan Giza vươn tới thần linh",
        "historical_era": "CỔ VƯƠNG QUỐC · THẾ KỶ 27 - 25 TCN",
        "image_range": (9, 18),
    },
    {
        "num": 3,
        "title": "Vấn Đề Lớn Nhất: Những Kẻ Trộm Mộ",
        "subtitle": "Khi biểu tượng bất tử trở thành mục tiêu béo bở của đạo tặc",
        "historical_era": "TRUNG VƯƠNG QUỐC · THẾ KỶ 22 - 18 TCN",
        "image_range": (19, 28),
    },
    {
        "num": 4,
        "title": "Bài Toán Kinh Tế & Khủng Hoảng Ngân Sách",
        "subtitle": "Gánh nặng xây dựng hàng chục năm vắt kiệt nguồn lực quốc gia",
        "historical_era": "CUỐI CỔ VƯƠNG QUỐC · KHỦNG HOẢNG KINH TẾ",
        "image_range": (29, 34),
    },
    {
        "num": 5,
        "title": "Ý Tưởng Đột Phá: Tách Biệt Mộ Và Đền Thờ",
        "subtitle": "Pharaoh Thutmose I và quyết định táo bạo thay đổi truyền thống ngàn năm",
        "historical_era": "TÂN VƯƠNG QUỐC · THỜI VUA THUTMOSE I",
        "image_range": (35, 41),
    },
    {
        "num": 6,
        "title": "Thung Lũng Các Vị Vua: Giấu Mình Trong Lòng Núi",
        "subtitle": "Những hầm mộ khoét sâu vào vách đá câm lặng bên bờ tây sông Nile",
        "historical_era": "TÂN VƯƠNG QUỐC · THẾ KỶ 16 - 11 TCN",
        "image_range": (42, 55),
    },
    {
        "num": 7,
        "title": "Những Người Thợ Bí Mật Ở Deir El-Medina",
        "subtitle": "Ngôi làng biệt lập của những nghệ nhân nắm giữ bí mật hoàng gia",
        "historical_era": "LÀNG THỢ DEIR EL-MEDINA · TÂN VƯƠNG QUỐC",
        "image_range": (56, 62),
    },
    {
        "num": 8,
        "title": "Những Phiên Tòa Xét Xử Trộm Mộ Thời Cổ Đại",
        "subtitle": "Lời khai trên giấy cói Mayer và mạng lưới tham nhũng thế kỷ 12 TCN",
        "historical_era": "THỜI RAMSES IX · KHOẢNG NĂM 1110 TCN",
        "image_range": (63, 71),
    },
    {
        "num": 9,
        "title": "Trường Hợp Ngoại Lệ: Lăng Mộ Tutankhamun",
        "subtitle": "Ngôi mộ bị lãng quên dưới đống đất đá bảo toàn kho báu 3.000 năm",
        "historical_era": "1323 TCN - 1922 SCN · KHẢO CỔ HỌC",
        "image_range": (72, 81),
    },
    {
        "num": 10,
        "title": "Sự Phô Trương Của Đền Karnak",
        "subtitle": "Bản trường ca bằng đá tôn vinh thần Amun-Re bên bờ đông trù phú",
        "historical_era": "BỜ ĐÔNG SÔNG NILE · THẾ KỶ 16 - 11 TCN",
        "image_range": (82, 89),
    },
    {
        "num": 11,
        "title": "Quy Mô Khổng Lồ Của Thành Phố Thần Linh",
        "subtitle": "Đại sảnh Hypostyle với 134 cột đá khổng lồ thách thức thời gian",
        "historical_era": "ĐẠI SẢNH HYPOSTYLE · THỜI RAMSES II",
        "image_range": (90, 100),
    },
    {
        "num": 12,
        "title": "Nguồn Lực Cho Karnak: Thuế & Chiến Lợi Phẩm",
        "subtitle": "Dòng chảy của cải từ các cuộc viễn chinh nuôi dưỡng thánh địa",
        "historical_era": "ĐẾ CHẾ TÂN VƯƠNG QUỐC · THỊNH VƯỢNG TỐI ĐA",
        "image_range": (101, 108),
    },
    {
        "num": 13,
        "title": "Quyền Lực Tư Tế & Cuộc Khủng Hoảng Tôn Giáo",
        "subtitle": "Khi giới tư tế Amun đe dọa vương quyền và cuộc cải cách Akhenaten",
        "historical_era": "THỜI VUA AKHENATEN · KHOẢNG 1350 TCN",
        "image_range": (109, 117),
    },
    {
        "num": 14,
        "title": "Hai Công Trình, Một Câu Chuyện",
        "subtitle": "Bài học lịch sử về cái chết thầm lặng và quyền lực trường tồn",
        "historical_era": "KẾT LUẬN & DI SẢN LỊCH SỬ",
        "image_range": (118, 123),
    },
]

def load_parsed_sections():
    with open('scripts/pharaoh_parsed_sections.json', 'r', encoding='utf-8') as f:
        sections = json.load(f)
    return {s['num']: s for s in sections}

import numpy as np

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", type=str, default="all", help="part1..part14 or 'all' or 'meta_only'")
    parser.add_argument("--force", action="store_true", help="Bắt buộc sinh lại nếu file đã tồn tại")
    args = parser.parse_args()

    parsed_sections = load_parsed_sections()

    # Tạo metadata export
    meta_path = Path("src/data/pharaoh_chapters.json")
    meta_path.parent.mkdir(parents=True, exist_ok=True)

    chapters_export = []
    desc_idx = 0

    for meta in CHAPTER_METAS:
        p_num = meta["num"]
        p_sec = parsed_sections[p_num]
        start_img, end_img = meta["image_range"]
        
        images = []
        descriptions = []
        for i in range(start_img, end_img + 1):
            images.append(f"images/pharaoh-pyramids/{i:03d}.png")
            descriptions.append(PHARAOH_DESCRIPTIONS[desc_idx])
            desc_idx += 1

        chapters_export.append({
            "id": f"part{p_num}",
            "chapter_num": p_num,
            "title": meta["title"],
            "subtitle": meta["subtitle"],
            "historical_era": meta["historical_era"],
            "images": images,
            "image_descriptions": descriptions,
            "word_count": len(p_sec["body"].split()),
            "audio_file": f"audio/pharaoh_part{p_num}.wav",
            "text": p_sec["body"]
        })

    meta_path.write_text(json.dumps(chapters_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã xuất metadata 14 chapters tại: {meta_path}")

    if args.section == "meta_only":
        return

    # Khởi tạo VieNeu-TTS
    from vieneu import Vieneu
    print("🚀 Khởi tạo VieNeu-TTS (mode='v3turbo', GPU RTX 3060, mặc định giọng: Trúc Ly)...")
    tts = Vieneu()

    out_dir = Path("public/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    sr = 48000
    start_silence = np.zeros(int(sr * 0.20), dtype=np.float32)
    paragraph_pause = np.zeros(int(sr * 0.45), dtype=np.float32)
    end_silence = np.zeros(int(sr * 0.35), dtype=np.float32)

    for ch in chapters_export:
        sec_id = ch["id"]
        if args.section != "all" and args.section != sec_id:
            continue

        target_wav = out_dir / f"pharaoh_{sec_id}.wav"
        if target_wav.exists() and not args.force:
            print(f"⏩ Đã tồn tại {target_wav}, bỏ qua.")
            continue

        paragraphs = [p.strip() for p in ch["text"].split("\n") if p.strip()]
        print(f"\n==================================================")
        print(f"🎙️ Đang sinh audio cho [{sec_id}] - {ch['title']}")
        print(f"📝 Số đoạn: {len(paragraphs)} đoạn | Tổng từ: {ch['word_count']} từ")
        t0 = time.time()
        audio_chunks = [start_silence]
        for p_idx, para in enumerate(paragraphs):
            p_audio = tts.infer(para, voice="Trúc Ly")
            audio_chunks.append(p_audio)
            if p_idx < len(paragraphs) - 1:
                audio_chunks.append(paragraph_pause)
        audio_chunks.append(end_silence)
        full_audio = np.concatenate(audio_chunks)

        t_gen = time.time() - t0
        tts.save(full_audio, str(target_wav))

        dur_s = len(full_audio) / sr
        rtf = t_gen / dur_s if dur_s > 0 else 0
        print(f"✅ Đã lưu: {target_wav}")
        print(f"📊 Thời lượng: {dur_s:.1f}s ({dur_s/60:.2f} phút) | Thời gian sinh: {t_gen:.1f}s | RTF: {rtf:.3f}x")

if __name__ == "__main__":
    main()
