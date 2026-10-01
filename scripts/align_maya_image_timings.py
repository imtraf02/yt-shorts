# -*- coding: utf-8 -*-
"""
Script tính toán chính xác imageStartFrames cho 82 ảnh trong 8 chương của MayaDocumentary.
Dựa vào từ khóa trong mayaCaptions.ts và phân bổ nhịp nhàng theo câu chữ audio.
Cập nhật trực tiếp vào src/data/mayaData.ts.
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

# Bộ từ khóa mốc (anchor keywords) cho 82 ảnh qua 8 phần
IMAGE_CUES = {
    # PHẦN 1 — MỞ BÀI (9 ảnh: 1..9)
    "part1": [
        ["năm", "1839"],                                     # 01: Hai nhà thám hiểm Stephens và Catherwood
        ["kim", "tự", "tháp", "đá", "khổng", "lồ"],          # 02: Kim tự tháp đá bị nuốt chửng bởi rễ cây
        ["những", "bức", "phù", "điêu", "tinh", "xảo"],      # 03: Tấm bia đá Stela rêu phong
        ["đó", "chính", "là", "những", "gì", "còn", "sót"],  # 04: Flycam tán rừng lộ đỉnh tháp
        ["nhưng", "điều", "khiến", "các", "nhà", "khảo"],    # 05: Tương phản phồn hoa và hoang tàn
        ["trong", "khoảng", "thời", "gian", "chỉ", "hơn"],   # 06: Quảng trường đá thinh lặng bỏ hoang
        ["người", "dân", "đơn", "giản", "là"],               # 07: Dấu hỏi phát sáng chữ tượng hình
        ["hơn", "tám", "mươi", "giả", "thuyết"],             # 08: Cuộn giấy các giả thuyết khoa học
        ["hôm", "nay", "chúng", "ta", "sẽ", "cùng"]          # 09: Hoàng hôn trên kim tự tháp
    ],

    # PHẦN 2 — THỜI KỲ HOÀNG KIM (14 ảnh: 10..23)
    "part2": [
        ["trước", "khi", "tìm", "hiểu"],                     # 10: Quảng trường đô thị nhộn nhịp buôn bán
        ["thời", "kỳ", "cổ", "điển"],                        # 11: Đường chân trời đại đô thị hoàng hôn
        ["tranh", "giành", "quyền", "lực", "chính", "trị"],  # 12: Vua Maya đội mũ lông vũ quan sát
        ["trải", "rộng", "trên", "một", "khu", "vực"],       # 13: Đô thị trải rộng hàng nghìn công trình
        ["hơn", "bốn", "mươi", "thành", "phố"],              # 14: Công nhân kéo khối đá vôi xây tháp
        ["tikal"],                                           # 15: Nhà thiên văn học ngắm sao đêm
        ["hệ", "thống", "chữ", "viết", "tượng", "hình"],     # 16: Học giả vẽ chữ tượng hình lên giấy vỏ cây
        ["hệ", "thống", "lịch", "pháp"],                     # 17: Sân bóng nghi lễ cổ đại
        ["copán"],                                           # 18: Cuộc gặp hai vị vua biên giới rừng sâu
        ["palenque", "calakmul"],                            # 19: Hệ thống ruộng bậc thang và kênh dẫn nước
        ["mỗi", "thành", "phố", "đều", "có"],                # 20: Sân cung điện hoàng gia nguy nga
        ["nhưng", "có", "một", "điều", "đáng", "chú"],       # 21: Nghi lễ trên đỉnh kim tự tháp
        ["dân", "số", "bùng", "nổ"],                         # 22: Chợ trung tâm trao đổi cacao obsidian
        ["cuộc", "chạy", "đua", "chiến", "tranh"]            # 23: Bản đồ mạng lưới thành bang
    ],

    # PHẦN 3 — DẤU HIỆU SUY TÀN (10 ảnh: 24..33)
    "part3": [
        ["đến", "khoảng", "cuối", "thế", "kỷ", "thứ", "8"],  # 24: Xưởng đục bia Stela thưa thớt thợ
        ["dựng", "lên", "những", "tấm", "bia", "đá"],        # 25: Hàng bia đá Stela dang dở
        ["số", "lượng", "những", "tấm", "bia", "đá"],        # 26: Biểu đồ cột đá Stela sụt giảm
        ["việc", "dựng", "bia", "đá", "đòi", "hỏi"],         # 27: Vua Maya lo âu trong cung điện rạn nứt
        ["vương", "quyền", "thần", "thánh"],                 # 28: Chiến binh Maya giáp lá cà đẫm máu
        ["đồng", "thời", "các", "nhà", "khảo", "cổ"],        # 29: Ngôi làng bốc cháy sau cuộc tập kích
        ["trở", "nên", "tàn", "khốc", "hơn"],                # 30: Đoàn tù binh bị áp giải trước vua
        ["một", "thành", "phố", "sụp", "đổ"],                # 31: Quảng trường hoang phế ngập cỏ dại
        ["cứ", "như", "vậy", "hết", "thành", "bang"],        # 32: Gia đình thường dân gùi đồ rời đi
        ["cho", "đến", "khi", "gần", "như", "toàn", "bộ"]     # 33: Dòng người di tản vào rừng sâu
    ],

    # PHẦN 4 — GIẢ THUYẾT HẠN HÁN (11 ảnh: 34..44)
    "part4": [
        ["hạn", "hán", "khốc", "liệt"],                      # 34: Đất nứt nẻ khô cằn tới chân trời
        ["bằng", "chứng", "cho", "giả", "thuyết"],           # 35: Nhà khoa học phân tích lõi trầm tích hồ
        ["thạch", "nhũ", "trong", "các", "hang", "động"],    # 36: Khảo sát thạch nhũ trong hang động đá vôi
        ["kết", "quả", "nghiên", "cứu", "cho", "thấy"],      # 37: Đáy hồ cạn trơ bùn nứt nẻ và cây khô
        ["giai", "đoạn", "hạn", "hán", "nghiêm", "trọng"],   # 38: Đồ thị lượng mưa cắm đầu lao dốc
        ["đây", "không", "phải", "là", "một", "đợt"],        # 39: Hố sụt tự nhiên Cenote nước xanh ngọc
        ["điều", "này", "có", "ý", "nghĩa"],                 # 40: Dân mót từng gáo nước trong bể chứa cạn
        ["phần", "lớn", "lãnh", "thổ", "maya"],              # 41: Hồ chứa nước nhân tạo nứt đáy
        ["khi", "hạn", "hán", "kéo", "dài"],                 # 42: Cánh đồng ngô héo rũ cháy nắng
        ["mùa", "màng", "thất", "bát", "liên", "tục"],       # 43: Nông dân quỳ gối nắm đất khô tuyệt vọng
        ["toàn", "bộ", "hệ", "thống", "nông", "nghiệp"]      # 44: Mặt trời chói chang thiêu đốt sự sống
    ],

    # PHẦN 5 — GIẢ THUYẾT PHÁ RỪNG (9 ảnh: 45..53)
    "part5": [
        ["nhưng", "nếu", "chỉ", "đơn", "thuần", "là"],       # 45: Chặt phá cây rừng bằng rìu đá
        ["đây", "chính", "là", "lúc", "giả", "thuyết"],      # 46: Lò nung vôi khói đen cuồn cuộn
        ["để", "nuôi", "sống", "một", "dân", "số"],          # 47: Đối lập: Rừng rậm tươi tốt vs Đồi trọc
        ["các", "nghiên", "cứu", "khảo", "cổ"],              # 48: Sơ đồ chu trình phản hồi tiêu cực
        ["điều", "này", "tạo", "ra", "một", "vòng"],         # 49: Đất canh tác gặm nhấm rừng nhiệt đới
        ["một", "nghiên", "cứu", "quan", "trọng"],           # 50: Mưa xói mòn sườn đồi trơ trọi
        ["có", "một", "chi", "tiết", "khảo", "cổ"],          # 51: Xà gỗ mái đền teo nhỏ dần
        ["gỗ", "cây", "sapodilla"],                          # 52: Một cây cổ thụ cô độc giữa cánh đồng
        ["dù", "sau", "đó", "việc", "sử", "dụng"]            # 53: Công nhân khiêng súc gỗ qua rừng cằn
    ],

    # PHẦN 6 — CHIẾN TRANH VÀ TAN RÃ CHÍNH TRỊ (11 ảnh: 54..64)
    "part6": [
        ["bên", "cạnh", "các", "yếu", "tố", "môi", "trường"],# 54: Vua Maya cầu mưa khẩn thiết trên đền
        ["xã", "hội", "maya", "thời", "kỳ", "cổ", "điển"],   # 55: Dân chúng đứng nhìn hoài nghi bất mãn
        ["khi", "khủng", "hoảng", "môi", "trường"],          # 56: Hai quân đội giao tranh dữ dội
        ["nếu", "các", "vị", "vua", "không", "còn"],         # 57: Thiêu rụi đền thờ đối phương
        ["cùng", "lúc", "đó", "sự", "cạnh", "tranh"],        # 58: Cướp phá đoàn thương buôn trên đường mòn
        ["chiến", "tranh", "đến", "lượt", "nó"],             # 59: Bản đồ các thành bang phân mảnh teo tóp
        ["khi", "hệ", "thống", "cống", "nạp"],               # 60: Miền Nam hoang tàn vs Miền Bắc rực sáng
        ["đáng", "chú", "ý", "không", "phải"],               # 61: Đô thị Chichen Itza phương bắc phồn thịnh
        ["trong", "khi", "các", "thành", "phố"],             # 62: Ngai vàng da báo bỏ hoang bụi phủ
        ["thì", "một", "số", "thành", "phố", "khác"],        # 63: Vương miện đá rạn nứt sụp đổ
        ["chichen", "itza"]                                   # 64: Quảng trường nghi lễ phủ đầy cỏ hoang
    ],

    # PHẦN 7 — KHÔNG PHẢI BIẾN MẤT, MÀ LÀ CHUYỂN DỊCH (10 ảnh: 65..74)
    "part7": [
        ["đây", "chính", "là", "lúc", "chúng", "ta"],        # 65: Kim tự tháp El Castillo Chichen Itza
        ["điều", "thực", "sự", "sụp", "đổ"],                 # 66: Thương cảng ven biển tấp nập tàu thuyền
        ["trong", "khi", "các", "thành", "phố"],             # 67: Bản đồ phương bắc sáng, phương nam tối
        ["thậm", "chí", "nền", "văn", "minh", "maya"],       # 68: Thành bang đảo Nojpetén giữa hồ nước
        ["mãi", "cho", "đến", "năm", "1697"],                # 69: Tàu chiến Tây Ban Nha áp sát bờ biển
        ["và", "cho", "đến", "tận", "ngày", "nay"],          # 70: Phụ nữ Maya dệt vải trên khung cửi
        ["vẫn", "gìn", "giữ", "được", "nhiều", "nét"],       # 71: Chợ truyền thống rực rỡ sắc màu
        ["vì", "vậy", "câu", "chuyện", "chính", "xác"],      # 72: Sợi chỉ vàng nối liền cổ đại và hiện tại
        ["trong", "khi", "bản", "thân", "dân", "tộc"],       # 73: Người bà truyền dạy hoa văn dệt vải
        ["cho", "đến", "tận", "hôm", "nay"]                  # 74: Hậu duệ tế lễ trang nghiêm trước phế tích
    ],

    # PHẦN 8 — TỔNG KẾT VÀ BÀI HỌC HIỆN ĐẠI (8 ảnh: 75..82)
    "part8": [
        ["ngày", "nay", "giới", "khoa", "học"],              # 75: Ba vòng tròn giao nhau (Hạn - Phá - Chiến)
        ["hạn", "hán", "đã", "gây", "áp", "lực"],            # 76: Nhà khoa học nghiên cứu phế tích kèm biểu đồ
        ["điều", "đáng", "chú", "ý", "và", "cũng"],          # 77: Đối chiếu phá rừng cổ đại vs hiện đại
        ["nền", "văn", "minh", "maya", "xét", "cho"],        # 78: Khách lặng lẽ ngắm kim tự tháp hoàng hôn
        ["nhưng", "chính", "sự", "tinh", "vi"],              # 79: Rễ cây ôm trọn vách đá chạm khắc
        ["rừng", "già", "sau", "khi", "nuốt", "chửng"],      # 80: Đàn chim tung cánh từ tháp cổ bình minh
        ["giờ", "đây", "thông", "qua", "bàn", "tay"],        # 81: Flycam rừng bạt ngàn ôm ấp các đỉnh tháp
        ["hé", "lộ", "trở", "lại", "câu", "chuyện"]          # 82: Nắng sớm rọi chữ tượng hình cổ trường tồn
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
    captions_file = Path("src/data/mayaCaptions.ts")
    if not captions_file.exists():
        print(f"❌ Chưa có {captions_file}")
        return

    # Trích xuất JSON từ TS
    ts_text = captions_file.read_text(encoding="utf-8")
    m = re.search(r'export const MAYA_CAPTIONS: Record<string, CaptionPhrase\[\]> = (\{[\s\S]*?\});', ts_text)
    if not m:
        print("❌ Không tìm thấy JSON MAYA_CAPTIONS trong file TS")
        return
    captions_by_chapter = json.loads(m.group(1))

    data_file = Path("src/data/mayaData.ts")
    data_text = data_file.read_text(encoding="utf-8")
    dm = re.search(r'export const MAYA_CHAPTERS: MayaChapter\[\] = (\[[\s\S]*?\]);', data_text)
    if not dm:
        print("❌ Không tìm thấy JSON MAYA_CHAPTERS")
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

    # Ghi lại vào mayaData.ts
    new_json = json.dumps(chapters, indent=2, ensure_ascii=False)
    new_data_text = re.sub(
        r'(export const MAYA_CHAPTERS: MayaChapter\[\] = )\[[\s\S]*?\];',
        f'\\1{new_json};',
        data_text
    )
    data_file.write_text(new_data_text, encoding="utf-8")
    print(f"\n🎉 Đã cập nhật thành công imageStartFrames cho {total_updated} ảnh trong mayaData.ts!")

if __name__ == "__main__":
    update_image_timings()
