# -*- coding: utf-8 -*-
"""
Script phân tích và xác định chính xác imageStartFrames cho toàn bộ 125 ảnh trong 12 chương FidelCastroDocumentary.
Dựa vào timestamps của từ khóa tương ứng trong fidelCastroCaptions.ts.
"""

import sys
import json
import re
from pathlib import Path
from build_fidel_tts import FIDEL_SECTIONS

IMAGE_CUES = {
    "part1": [
        ["tháng", "9", "năm", "1973"],
        ["ông", "vượt", "sông", "bến", "hải"],
        ["người", "đó", "là", "fidel", "castro"],
        ["với", "nhiều", "thế", "hệ"],
        ["nhưng", "đằng", "sau", "hình", "ảnh"],
        ["đối", "đầu", "trực", "diện"],
        ["sống", "sót", "qua", "hơn", "sáu", "trăm"],
        ["hôm", "nay", "chúng", "ta", "sẽ", "cùng"]
    ],
    "part2": [
        ["fidel", "alejandro", "castro", "ruz"],
        ["cha", "ông", "angel", "castro"],
        ["fidel", "là", "một", "trong", "bảy"],
        ["thuở", "nhỏ", "ông", "theo", "học"],
        ["năng", "khiếu", "thể", "thao", "nổi", "bật"],
        ["tinh", "thần", "tranh", "luận"],
        ["sau", "khi", "hoàn", "thành"],
        ["trung", "tâm", "sục", "sôi"],
        ["và", "chính", "tại", "giảng", "đường"]
    ],
    "part3": [
        ["ngay", "từ", "những", "năm", "còn", "ngồi"],
        ["sau", "khi", "tốt", "nghiệp"],
        ["năm", "1952", "tướng", "fulgencio", "batista"],
        ["nắm", "giữ", "quyền", "lực", "tuyệt", "đối"],
        ["đây", "chính", "là", "bước", "ngoặt"],
        ["ngày", "26", "tháng", "7", "năm", "1953"],
        ["pháo", "đài", "moncada"],
        ["cuộc", "tấn", "công", "này"],
        ["bản", "thân", "fidel", "castro", "cũng", "bị", "bắt"],
        ["tại", "phiên", "tòa", "xét", "xử"],
        ["lịch", "sử", "sẽ", "xá", "tội", "cho", "tôi"],
        ["văn", "kiện", "chính", "trị", "quan", "trọng"],
        ["mười", "lăm", "năm", "tù", "giam"]
    ],
    "part4": [
        ["may", "mắn", "thay", "cho", "fidel"],
        ["lệnh", "ân", "xá", "trả", "tự", "do"],
        ["ngay", "sau", "khi", "được", "trả", "tự", "do"],
        ["ernesto", "che", "guevara"],
        ["huấn", "luyện", "quân", "sự", "bí", "mật"],
        ["chuẩn", "bị", "cho", "một", "cuộc", "đổ", "bộ"],
        ["tháng", "11", "năm", "1956"],
        ["cuộc", "đổ", "bộ", "ban", "đầu"],
        ["ngay", "lập", "tức", "bị", "quân", "đội"],
        ["sống", "sót", "và", "trốn", "thoát"],
        ["từ", "một", "nhóm", "nhỏ"],
        ["sự", "ủng", "hộ", "ngày", "càng", "lớn"]
    ],
    "part5": [
        ["tháng", "5", "năm", "1958"],
        ["nhưng", "chiến", "dịch", "này", "đã", "thất", "bại"],
        ["kém", "hiệu", "quả", "và", "mất", "tinh", "thần"],
        ["sau", "thất", "bại", "này"],
        ["đến", "cuối", "năm", "1958"],
        ["lặng", "lẽ", "rời", "bỏ", "đất", "nước"],
        ["cuộc", "cách", "mạng", "cuba"],
        ["ở", "tuổi", "ba", "mươi", "hai"],
        ["đến", "tháng", "2", "năm", "1959"]
    ],
    "part6": [
        ["điều", "thú", "vị", "mà", "không", "phải", "ai"],
        ["tháng", "4", "năm", "1959"],
        ["chương", "trình", "quốc", "hữu", "hóa"],
        ["nước", "mỹ", "đáp", "trả"],
        ["cấm", "vận", "toàn", "diện"],
        ["ngày", "28", "tháng", "9", "năm", "1960"],
        ["khả", "năng", "hùng", "biện", "phi", "thường"],
        ["sáu", "bảy", "tiếng", "đồng", "hồ"],
        ["đến", "tháng", "1", "năm", "1961"]
    ],
    "part7": [
        ["chính", "quyền", "mỹ", "dưới", "thời", "tổng", "thống"],
        ["cơ", "quan", "tình", "báo", "trung", "ương"],
        ["ngày", "17", "tháng", "4", "năm", "1961"],
        ["nhưng", "kế", "hoạch", "này", "đã", "thất", "bại"],
        ["chính", "fidel", "castro", "đã", "đích", "thân"],
        ["trong", "vòng", "chưa", "đầy", "ba", "ngày"],
        ["đây", "là", "một", "thất", "bại", "nhục", "nhã"],
        ["chỉ", "hai", "tuần", "sau", "chiến", "thắng"],
        ["quốc", "gia", "theo", "con", "đường", "xã", "hội"]
    ],
    "part8": [
        ["sau", "thất", "bại", "cay", "đắng"],
        ["yêu", "cầu", "sự", "trợ", "giúp"],
        ["nikita", "khrushchev"],
        ["chiến", "dịch", "anadyr"],
        ["tháng", "10", "năm", "1962"],
        ["mười", "ba", "ngày"],
        ["cuối", "cùng", "sau", "nhiều", "ngày"],
        ["ngày", "28", "tháng", "10", "năm", "1962"],
        ["toàn", "bộ", "quá", "trình", "đàm", "phán"],
        ["dù", "vậy", "kết", "quả", "cuối", "cùng"]
    ],
    "part9": [
        ["trong", "bối", "cảnh", "đối", "đầu"],
        ["tìm", "thấy", "ở", "việt", "nam"],
        ["trong", "suốt", "những", "năm", "tháng"],
        ["công", "khai", "bày", "tỏ", "sự", "ủng", "hộ"],
        ["nhưng", "đỉnh", "cao", "của", "mối", "quan", "hệ"],
        ["từ", "hà", "nội", "fidel", "castro"],
        ["vượt", "qua", "sông", "bến", "hải"],
        ["hành", "động", "mang", "tính", "biểu", "tượng"],
        ["tại", "đây", "fidel", "castro", "đã", "cùng"],
        ["chào", "mừng", "đoàn", "đại", "biểu"],
        ["hình", "ảnh", "vị", "lãnh", "tụ", "cuba"],
        ["giữa", "những", "đổ", "nát", "còn", "chưa", "kịp"],
        ["biểu", "tượng", "sâu", "đậm", "nhất"],
        ["về", "sau", "fidel", "castro", "còn", "có"],
        ["duy", "trì", "mối", "quan", "hệ", "gắn", "bó"]
    ],
    "part10": [
        ["trong", "suốt", "gần", "năm", "mươi", "năm"],
        ["xây", "dựng", "chủ", "nghĩa", "xã", "hội"],
        ["bất", "chấp", "những", "khó", "khăn", "kinh", "tế"],
        ["lĩnh", "vực", "y", "tế", "và", "giáo", "dục"],
        ["hệ", "thống", "y", "tế", "công", "cộng"],
        ["tỷ", "lệ", "người", "dân", "biết", "đọc"],
        ["cử", "các", "đoàn", "bác", "sĩ"],
        ["giải", "nobel", "hòa", "bình"],
        ["hệ", "thống", "chính", "trị", "độc", "đảng"],
        ["điểm", "gây", "tranh", "cãi", "lớn", "nhất"],
        ["hơn", "sáu", "trăm", "âm", "mưu", "ám", "sát"],
        ["khi", "được", "hỏi", "về", "vấn", "đề", "này"]
    ],
    "part11": [
        ["bước", "sang", "những", "năm", "2000"],
        ["ngày", "20", "tháng", "10", "năm", "2004"],
        ["người", "em", "trai", "raul", "castro"],
        ["đến", "tháng", "2", "năm", "2008"],
        ["dù", "đã", "chính", "thức", "rút", "lui"],
        ["thường", "xuyên", "viết", "các", "bài", "phản", "ánh"],
        ["tháng", "4", "năm", "2016"],
        ["bước", "sang", "tuổi", "chín", "mươi"]
    ],
    "part12": [
        ["tối", "ngày", "25", "tháng", "11", "năm", "2016"],
        ["sau", "khi", "sống", "sót", "qua", "hơn", "sáu", "trăm"],
        ["tin", "tức", "về", "sự", "ra", "đi"],
        ["thành", "phố", "miami", "của", "mỹ"],
        ["tại", "việt", "nam", "tin", "tức"],
        ["đại", "sứ", "quán", "cuba", "ở", "hà", "nội"],
        ["sát", "cánh", "cùng", "nhân", "dân", "việt", "nam"],
        ["từ", "một", "cậu", "bé", "con", "nhà", "điền", "chủ"],
        ["chàng", "sinh", "viên", "luật", "đầy", "nhiệt", "huyết"],
        ["người", "bạn", "lớn", "không", "bao", "giờ", "quên"],
        ["vẫn", "còn", "nguyên", "vẹn", "cho", "đến", "hôm", "nay"]
    ]
}

def load_captions():
    with open("src/data/fidelCastroCaptions.ts", "r", encoding="utf-8") as f:
        text = f.read()
    start_idx = text.find("export const FIDEL_CAPTIONS: Record<string, CaptionPhrase[]> = ") + len("export const FIDEL_CAPTIONS: Record<string, CaptionPhrase[]> = ")
    end_idx = text.rfind(";")
    return json.loads(text[start_idx:end_idx].strip())

def clean_tok(t):
    return re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t.lower()).strip()

def find_cue_start_frame(words, cue_tokens, min_idx=0):
    cue_clean = [clean_tok(c) for c in cue_tokens if clean_tok(c)]
    if not cue_clean:
        return None, min_idx

    for i in range(min_idx, len(words) - len(cue_clean) + 1):
        match = True
        for j, c in enumerate(cue_clean):
            w = clean_tok(words[i + j]["word"])
            if w != c:
                match = False
                break
        if match:
            frame = int(round((words[i]["startMs"] / 1000) * 30))
            return frame, i

    # Thử tìm 2 từ đầu
    if len(cue_clean) >= 2:
        for i in range(min_idx, len(words) - 1):
            if clean_tok(words[i]["word"]) == cue_clean[0] and clean_tok(words[i+1]["word"]) == cue_clean[1]:
                frame = int(round((words[i]["startMs"] / 1000) * 30))
                return frame, i

    # Thử tìm 1 từ đầu
    if len(cue_clean) >= 1:
        for i in range(min_idx, len(words)):
            if clean_tok(words[i]["word"]) == cue_clean[0]:
                frame = int(round((words[i]["startMs"] / 1000) * 30))
                return frame, i

    return None, min_idx

def main():
    captions = load_captions()
    
    # Đọc fidelCastroData.ts hiện tại
    with open("src/data/fidelCastroData.ts", "r", encoding="utf-8") as f:
        data_text = f.read()
    start_idx = data_text.find("export const FIDEL_CHAPTERS: FidelChapter[] = ") + len("export const FIDEL_CHAPTERS: FidelChapter[] = ")
    end_idx = data_text.find("export const TOTAL_FIDEL_FRAMES =")
    chapters = json.loads(data_text[start_idx:end_idx].strip().rstrip(";"))

    for ch in chapters:
        ch_id = ch["id"]
        phrases = captions.get(ch_id, [])
        all_words = []
        for p in phrases:
            for w in p["words"]:
                all_words.append(w)

        cues = IMAGE_CUES.get(ch_id, [])
        num_imgs = len(ch["images"])
        start_frames = [0]
        cur_word_idx = 0

        for img_idx in range(1, num_imgs):
            cue = cues[img_idx] if img_idx < len(cues) else []
            frame, matched_idx = find_cue_start_frame(all_words, cue, min_idx=cur_word_idx + 1)
            
            # Đảm bảo frame tăng dần và không vượt quá duration
            prev_frame = start_frames[-1]
            min_frame = prev_frame + 45 # Mỗi ảnh tối thiểu 1.5s
            if frame is None or frame <= min_frame:
                frame = min_frame
            if frame >= ch["durationInFrames"] - 30:
                frame = ch["durationInFrames"] - 30

            start_frames.append(frame)
            cur_word_idx = matched_idx

        ch["imageStartFrames"] = start_frames
        print(f"✅ {ch_id} ({num_imgs} ảnh): {start_frames}")

    # Ghi lại vào src/data/fidelCastroData.ts
    out_ts = f"""// Dữ liệu 12 chương phim tài liệu 'Fidel Castro: Người bạn lớn ở bên kia đại dương'
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
    with open("src/data/fidelCastroData.ts", "w", encoding="utf-8") as f:
        f.write(out_ts)
    print("\n🎉 Đã cập nhật thành công imageStartFrames vào src/data/fidelCastroData.ts!")

if __name__ == "__main__":
    main()
