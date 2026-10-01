# -*- coding: utf-8 -*-
"""
Script phân tích kịch bản 13 phần cho phim tài liệu chuyên sâu:
'TOÀN CẢNH KHỦNG LONG: HÀNH TRÌNH QUA CÁC NHÓM LOÀI THỐNG TRỊ TRÁI ĐẤT'
và tạo src/data/dinosaur_chapters.json
"""

import os
import sys
import json
import re
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from dinosaur_descriptions import DINOSAUR_DESCRIPTIONS

# 170 ảnh tương ứng từ 001.png đến 170.png
IMAGE_FILES = [f"{i:03d}.png" for i in range(1, 171)]

CHAPTER_CONFIGS = [
    {
        "num": 1,
        "title": "Mở Bài: Một Sự Thật Bất Ngờ",
        "subtitle": "Thằn lằn bay và bò sát biển không phải là khủng long",
        "historical_era": "230 - 66 TRIỆU NĂM TRƯỚC · ĐỊNH NGHĨA KHOA HỌC",
        "image_range": (1, 10),
    },
    {
        "num": 2,
        "title": "Hai Nhánh Chính: Xương Hông Quyết Định",
        "subtitle": "Saurischia (hông thằn lằn) và Ornithischia (hông chim)",
        "historical_era": "KỶ TAM ĐIỆP (TRIAS) · PHÂN NHÁNH TIẾN HÓA",
        "image_range": (11, 16),
    },
    {
        "num": 3,
        "title": "Nhóm Theropoda: Kẻ Săn Mồi Hai Chân",
        "subtitle": "Từ quái thú T-Rex, Spinosaurus đến nguồn gốc loài chim",
        "historical_era": "KỶ JURA - BẠCH PHẤN · THỢ SĂN THỐNG TRỊ",
        "image_range": (17, 40),
    },
    {
        "num": 4,
        "title": "Nhóm Sauropodomorpha: Gã Khổng Lồ Cổ Dài",
        "subtitle": "Brachiosaurus, Argentinosaurus và kỳ quan sinh học",
        "historical_era": "KỶ JURA - BẠCH PHẤN · GÃ KHỔNG LỒ ĂN CỎ",
        "image_range": (41, 60),
    },
    {
        "num": 5,
        "title": "Nhóm Stegosauria: Tấm Giáp Lưng Bí Ẩn",
        "subtitle": "Thagomizer đuôi gai và chức năng điều nhiệt của phiến sừng",
        "historical_era": "KỶ JURA MUỘN · CHIẾN BINH PHIẾN SỪNG",
        "image_range": (61, 72),
    },
    {
        "num": 6,
        "title": "Nhóm Ankylosauria: Xe Tăng Sống Thời Tiền Sử",
        "subtitle": "Chùy đuôi ngàn cân và lớp giáp xương Osteoderm bất khả xâm phạm",
        "historical_era": "KỶ BẠCH PHẤN · PHÁO ĐÀI DI ĐỘNG",
        "image_range": (73, 84),
    },
    {
        "num": 7,
        "title": "Nhóm Ceratopsia: Những Chiến Binh Mang Sừng",
        "subtitle": "Triceratops, diềm cổ khổng lồ và vũ khí đấu tranh bầy đàn",
        "historical_era": "KỶ BẠCH PHẤN MUỘN · VŨ KHÍ SỪNG & DIỀM CỔ",
        "image_range": (85, 100),
    },
    {
        "num": 8,
        "title": "Nhóm Ornithopoda: Loài Ăn Cỏ Thành Công Nhất",
        "subtitle": "Khủng long mỏ vịt Hadrosauridae và bộ hàm nhai hoàn hảo",
        "historical_era": "KỶ BẠCH PHẤN · ĐỘI QUÂN MỎ VỊT",
        "image_range": (101, 116),
    },
    {
        "num": 9,
        "title": "Nhóm Pachycephalosauria: Thiết Đầu Công Tiền Sử",
        "subtitle": "Hộp sọ vòm đá dày 25cm và những cú húc đầu chấn động",
        "historical_era": "KỶ BẠCH PHẤN MUỘN · ĐẦU CỨNG BÍ ẨN",
        "image_range": (117, 126),
    },
    {
        "num": 10,
        "title": "Những Người Hàng Xóm Dễ Nhầm Lẫn",
        "subtitle": "Pterosaur bầu trời và Mosasaur - Plesiosaur chúa tể đại dương",
        "historical_era": "TRUNG SINH ĐẠI · KHÔNG PHẢI KHỦNG LONG",
        "image_range": (127, 138),
    },
    {
        "num": 11,
        "title": "Đại Tuyệt Chủng K-Pg: Buổi Sáng Định Mệnh",
        "subtitle": "Tiểu hành tinh Chicxulub 10km, mùa đông hạt nhân và hủy diệt",
        "historical_era": "66 TRIỆU NĂM TRƯỚC · THẢM HỌA THIÊN THẠCH",
        "image_range": (139, 152),
    },
    {
        "num": 12,
        "title": "Kẻ Sống Sót & Kẻ Diệt Vong",
        "subtitle": "Kích thước cơ thể, chuỗi thức ăn đáy và chọn lọc tự nhiên",
        "historical_era": "SAU THẢM HỌA · CHỌN LỌC SINH TỒN",
        "image_range": (153, 162),
    },
    {
        "num": 13,
        "title": "Tổng Kết: Di Sản Kỷ Nguyên Thống Trị",
        "subtitle": "160 triệu năm thống trị và 10.000 loài chim sống quanh ta",
        "historical_era": "KỶ NGUYÊN HIỆN ĐẠI · DI SẢN BẤT TỬ",
        "image_range": (163, 170),
    }
]

def main():
    raw_prompt_path = Path("scripts/dinosaur_raw_prompt.txt")
    if not raw_prompt_path.exists():
        print(f"❌ Không tìm thấy {raw_prompt_path}")
        return

    full_raw = raw_prompt_path.read_text(encoding="utf-8")
    
    # Kịch bản nằm trước phần ghi chú dựng video hoặc danh sách prompt ảnh
    notes_pos = full_raw.find("## GHI CHÚ")
    prompt_pos = full_raw.find("# PROMPT")
    split_pos = min([p for p in [notes_pos, prompt_pos, len(full_raw)] if p != -1])
    script_part = full_raw[:split_pos]

    # Tìm các phần '## PHẦN X — ...'
    parts_matches = list(re.finditer(r'## PHẦN (\d+) — ([^\n]+)', script_part))
    print(f"📖 Tìm thấy {len(parts_matches)} phần trong kịch bản.")

    out_json = Path("src/data/dinosaur_chapters.json")
    out_json.parent.mkdir(parents=True, exist_ok=True)

    chapters_export = []

    for i, cfg in enumerate(CHAPTER_CONFIGS):
        p_num = cfg["num"]
        p_match = parts_matches[i]
        
        start_pos = p_match.end()
        end_pos = parts_matches[i+1].start() if i+1 < len(parts_matches) else len(script_part)
        
        body_text = script_part[start_pos:end_pos].strip()
        body_text = re.sub(r'^\s*---\s*', '', body_text).strip()
        body_text = re.sub(r'\s*---\s*$', '', body_text).strip()

        s_img, e_img = cfg["image_range"]
        images = []
        descriptions = []
        for img_idx in range(s_img - 1, e_img):
            images.append(f"images/dinosaur/{IMAGE_FILES[img_idx]}")
            descriptions.append(DINOSAUR_DESCRIPTIONS[img_idx])

        word_count = len(body_text.split())

        chapters_export.append({
            "id": f"part{p_num}",
            "chapter_num": p_num,
            "title": cfg["title"],
            "subtitle": cfg["subtitle"],
            "historical_era": cfg["historical_era"],
            "images": images,
            "image_descriptions": descriptions,
            "word_count": word_count,
            "audio_file": f"audio/dinosaur_part{p_num}.wav",
            "text": body_text
        })

    out_json.write_text(json.dumps(chapters_export, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Đã tạo cấu hình 13 chương tại: {out_json}")
    total_words = sum(c["word_count"] for c in chapters_export)
    print(f"📊 Tổng số từ 13 chương: {total_words} từ")
    print(f"🖼️ Tổng số ảnh: {sum(len(c['images']) for c in chapters_export)} ảnh")
    for c in chapters_export:
        print(f"   - {c['id']}: {c['title']} ({c['word_count']} từ, {len(c['images'])} ảnh)")

if __name__ == "__main__":
    main()
