# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 123 ảnh trong 14 chương của PharaohDocumentary.
Dựa vào từ khóa trong pharaohCaptions.ts và phân bổ nhịp nhàng theo câu chữ.
Cập nhật trực tiếp vào src/data/pharaohData.ts.
"""

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

# Bộ từ khóa mốc (anchor keywords) cho 123 ảnh qua 14 phần
IMAGE_CUES = {
    "part1": [
        ["nếu", "nhắc", "đến", "ai", "cập"],
        ["nhưng", "có", "một", "sự", "thật"],
        ["thay", "vào", "đó", "họ", "chọn"],
        ["nhưng", "câu", "chuyện", "không", "dừng"],
        ["tại", "sao", "lại", "có", "sự", "đối", "lập"],
        ["câu", "trả", "lời"],
        ["về", "cái", "chết", "và", "quyền", "lực"],
        ["hôm", "nay", "chúng", "ta", "sẽ"]
    ],
    "part2": [
        ["trước", "khi", "tìm", "hiểu"],
        ["kim", "tự", "tháp", "đầu", "tiên"],
        ["kiến", "trúc", "sư", "của", "djoser"],
        ["imhotep"],
        ["từ", "đó", "qua", "nhiều", "thế", "hệ"],
        ["quần", "thể", "kim", "tự", "tháp", "giza"],
        ["biểu", "tượng", "quyền", "lực", "tối", "cao"],
        ["nhưng", "việc", "xây", "dựng"],
        ["hàng", "chục", "nghìn", "nhân", "công"],
        ["và", "đó", "chính", "là", "mấu", "chốt"]
    ],
    "part3": [
        ["có", "một", "nghịch", "lý", "rất", "đau", "đớn"],
        ["chính", "sự", "đồ", "sộ", "hoành", "tráng"],
        ["một", "công", "trình", "cao", "hàng", "trăm"],
        ["đạo", "tặc", "thời", "cổ", "đại"],
        ["kết", "quả", "là", "gần", "như", "toàn", "bộ"],
        ["đều", "đã", "bị", "đột", "nhập"],
        ["không", "phải", "đến", "thời", "hiện", "đại"],
        ["ngay", "trong", "thời", "cổ", "đại"],
        ["đối", "với", "người", "ai", "cập"],
        ["sự", "xâm", "phạm", "lăng", "mộ"]
    ],
    "part4": [
        ["bên", "cạnh", "vấn", "đề", "an", "ninh"],
        ["kinh", "tế", "cũng", "là", "yếu", "tố"],
        ["mỗi", "kim", "tự", "tháp", "lớn"],
        ["nguồn", "lực", "quốc", "gia", "bị", "bào", "mòn"],
        ["đến", "cuối", "thời", "kỳ", "cổ", "vương", "quốc"],
        ["quy", "mô", "xây", "dựng", "buộc", "phải", "thu", "hẹp"]
    ],
    "part5": [
        ["bước", "sang", "thời", "kỳ", "tân", "vương", "quốc"],
        ["một", "thay", "đổi", "mang", "tính", "cách", "mạng"],
        ["pharaoh", "thutmose", "đệ", "nhất"],
        ["kiến", "trúc", "sư", "ineni"],
        ["tách", "biệt", "hoàn", "toàn"],
        ["nơi", "an", "nghỉ", "giấu", "kín"],
        ["đền", "thờ", "tưởng", "niệm", "đặt", "ở", "nơi", "khác"]
    ],
    "part6": [
        ["thung", "lũng", "các", "vị", "vua"],
        ["nằm", "ở", "bờ", "tây", "sông", "nile"],
        ["kinh", "đô", "thebes"],
        ["được", "bao", "bọc", "bởi", "những", "vách", "núi"],
        ["đỉnh", "núi", "tự", "nhiên", "hình", "kim", "tự", "tháp"],
        ["các", "ngôi", "mộ", "được", "khoét", "sâu"],
        ["hàng", "chục", "mét", "vào", "lòng", "núi"],
        ["bên", "trong", "được", "trang", "trí"],
        ["bích", "họa", "tinh", "xảo"],
        ["lối", "vào", "được", "lấp", "kín"],
        ["ngụy", "trang", "bằng", "đá", "vụn"],
        ["vị", "trí", "từng", "ngôi", "mộ"],
        ["tuyệt", "mật", "quốc", "gia"],
        ["lực", "lượng", "vệ", "binh", "medjay"]
    ],
    "part7": [
        ["để", "giữ", "kín", "bí", "mật"],
        ["những", "người", "thợ", "xây", "mộ"],
        ["sống", "trong", "ngôi", "làng", "biệt", "lập"],
        ["deir", "el-medina"],
        ["được", "trả", "công", "hậu", "hĩnh"],
        ["nhưng", "bị", "giám", "sát", "chặt", "chẽ"],
        ["những", "mảnh", "gốm", "ostracon"]
    ],
    "part8": [
        ["dù", "đã", "áp", "dụng", "biện", "pháp"],
        ["nhưng", "lòng", "tham", "con", "người"],
        ["các", "cuộn", "giấy", "cói", "cổ", "đại"],
        ["phiên", "tòa", "xét", "xử"],
        ["dưới", "thời", "ramses", "thứ", "chín"],
        ["mạng", "lưới", "thông", "đồng"],
        ["quan", "chức", "địa", "phương"],
        ["hình", "phạt", "cực", "kỳ", "khắc", "nghiệt"],
        ["vẫn", "không", "ngăn", "được"]
    ],
    "part9": [
        ["trong", "số", "hàng", "chục", "ngôi", "mộ"],
        ["có", "một", "trường", "hợp", "ngoại", "lệ"],
        ["ngôi", "mộ", "của", "tutankhamun"],
        ["bị", "lãng", "quên", "dưới", "đống", "đất", "đá"],
        ["xây", "dựng", "lăng", "mộ", "khác"],
        ["năm", "1922"],
        ["howard", "carter"],
        ["nguyên", "vẹn", "gần", "như", "hoàn", "toàn"],
        ["hàng", "nghìn", "báu", "vật", "vàng", "ròng"],
        ["minh", "chứng", "cho", "sự", "giàu", "có"]
    ],
    "part10": [
        ["trong", "khi", "nơi", "chôn", "cất", "giấu", "kín"],
        ["thì", "ở", "bờ", "đông", "sông", "nile"],
        ["đền", "karnak"],
        ["trung", "tâm", "tôn", "giáo", "lớn", "nhất"],
        ["thờ", "thần", "amun-re"],
        ["mỗi", "đời", "pharaoh"],
        ["đều", "mở", "rộng", "thêm"],
        ["thể", "hiện", "lòng", "thành", "kính"]
    ],
    "part11": [
        ["quy", "mô", "của", "đền", "karnak"],
        ["rộng", "hơn", "một", "trăm", "héc-ta"],
        ["đại", "sảnh", "hypostyle"],
        ["một", "trăm", "ba", "mươi", "tư", "cột", "đá"],
        ["cao", "hơn", "hai", "mươi", "mét"],
        ["chạm", "khắc", "chữ", "tượng", "hình"],
        ["hồ", "nước", "thiêng"],
        ["các", "cổng", "pylon", "đồ", "sộ"],
        ["thành", "phố", "thần", "linh"],
        ["hoạt", "động", "suốt", "ngày", "đêm"],
        ["hàng", "nghìn", "tư", "tế"]
    ],
    "part12": [
        ["để", "duy", "trì", "và", "mở", "rộng"],
        ["nguồn", "tài", "chính", "khổng", "lồ"],
        ["đến", "từ", "hai", "nguồn", "chính"],
        ["thuế", "nông", "nghiệp"],
        ["và", "chiến", "lợi", "phẩm"],
        ["từ", "các", "cuộc", "chinh", "phạt"],
        ["vàng", "bạc", "và", "nô", "lệ"],
        ["đều", "được", "dâng", "lên", "thần", "amun"]
    ],
    "part13": [
        ["sự", "giàu", "có", "của", "karnak"],
        ["dẫn", "đến", "quyền", "lực", "khổng", "lồ"],
        ["của", "giới", "tư", "tế"],
        ["đe", "dọa", "trực", "tiếp", "vương", "quyền"],
        ["pharaoh", "akhenaten"],
        ["thực", "hiện", "cuộc", "cải", "cách"],
        ["thờ", "thần", "aten"],
        ["nhưng", "sau", "khi", "ông", "qua", "đời"],
        ["karnak", "lại", "lấy", "lại", "vị", "thế"]
    ],
    "part14": [
        ["nhìn", "lại", "toàn", "bộ", "tiến", "trình"],
        ["sự", "thay", "đổi", "từ", "kim", "tự", "tháp"],
        ["sang", "thung", "lũng", "các", "vị", "vua"],
        ["và", "đền", "karnak"],
        ["phản", "ánh", "sự", "thực", "dụng"],
        ["bài", "học", "lịch", "sử", "sâu", "sắc"]
    ]
}

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    return re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)

def find_cue_frame(phrase_list, cue_words):
    if not cue_words:
        return None
    cue_str = " ".join([normalize_text(w) for w in cue_words])

    for phrase in phrase_list:
        phrase_str = " ".join([normalize_text(w["word"]) for w in phrase["words"]])
        if cue_str in phrase_str or any(cw in phrase_str for cw in cue_words[:2]):
            ms = phrase["startMs"]
            return int(round((ms / 1000.0) * 30))
    return None

def update_image_timings():
    captions_file = Path("src/data/pharaohCaptions.ts")
    if not captions_file.exists():
        print(f"❌ Chưa có {captions_file}")
        return

    # Trích xuất JSON từ TS
    ts_text = captions_file.read_text(encoding="utf-8")
    m = re.search(r'export const PHARAOH_CAPTIONS: Record<string, CaptionPhrase\[\]> = (\{[\s\S]*?\});', ts_text)
    if not m:
        print("❌ Không tìm thấy JSON PHARAOH_CAPTIONS trong file TS")
        return
    captions_by_chapter = json.loads(m.group(1))

    data_file = Path("src/data/pharaohData.ts")
    data_text = data_file.read_text(encoding="utf-8")
    dm = re.search(r'export const PHARAOH_CHAPTERS: PharaohChapter\[\] = (\[[\s\S]*?\]);', data_text)
    if not dm:
        print("❌ Không tìm thấy JSON PHARAOH_CHAPTERS")
        return
    chapters = json.loads(dm.group(1))

    total_updated = 0

    for ch in chapters:
        ch_id = ch["id"]
        num_imgs = len(ch["images"])
        dur = ch["durationInFrames"]
        phrases = captions_by_chapter.get(ch_id, [])
        cues = IMAGE_CUES.get(ch_id, [])

        start_frames = [0] * num_imgs
        start_frames[0] = 0

        # Tìm frame tương ứng
        found_frames = []
        for i in range(num_imgs):
            if i == 0:
                found_frames.append(0)
                continue
            cue_words = cues[i] if i < len(cues) else None
            frame = find_cue_frame(phrases, cue_words) if cue_words else None
            found_frames.append(frame)

        # Chuẩn hóa & nội suy mượt mà
        min_gap = 105  # Tối thiểu 3.5 giây mỗi ảnh (105 frames)
        for i in range(1, num_imgs):
            expected_even = int(round(i * (dur / num_imgs)))
            f = found_frames[i]
            if f is None or f <= start_frames[i - 1] + min_gap:
                f = max(start_frames[i - 1] + min_gap, expected_even)
            # Không vượt quá giới hạn
            max_allowed = dur - (num_imgs - i) * min_gap
            f = min(f, max_allowed)
            start_frames[i] = f

        ch["imageStartFrames"] = start_frames
        total_updated += num_imgs
        print(f"🎬 {ch_id} ({num_imgs} ảnh, {dur} frames): {start_frames}")

    # Ghi lại vào pharaohData.ts
    new_json = json.dumps(chapters, indent=2, ensure_ascii=False)
    new_data_text = re.sub(
        r'(export const PHARAOH_CHAPTERS: PharaohChapter\[\] = )\[[\s\S]*?\];',
        f'\\1{new_json};',
        data_text
    )
    data_file.write_text(new_data_text, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công imageStartFrames cho {total_updated} ảnh trong pharaohData.ts!")

if __name__ == "__main__":
    update_image_timings()
