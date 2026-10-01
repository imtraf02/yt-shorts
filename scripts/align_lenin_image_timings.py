# -*- coding: utf-8 -*-
"""
Script phân tích và xác định chính xác imageStartFrames cho toàn bộ 122 ảnh trong 13 chương LeninDocumentary.
Dựa vào timestamps của từ khóa tương ứng trong leninCaptions.ts.
"""

import sys
import json
import re
from pathlib import Path
from build_lenin_tts import LENIN_SECTIONS

IMAGE_CUES = {
    "part1": [
        ["ngày", "21", "tháng"],
        ["hàng", "nghìn", "người"],
        ["người", "đàn", "ông"],
        ["cậu", "học", "sinh"],
        ["kiến", "trúc", "sư"],
        ["điều", "gì", "đã", "biến"],
        ["câu", "trả", "lời"]
    ],
    "part2": [
        ["vladimir", "ilyich", "ulyanov"],
        ["không", "phải", "là", "gia", "đình", "nghèo"],
        ["cha", "ông", "ilya"],
        ["mẹ", "ông", "maria"],
        ["tám", "người", "con"],
        ["tuổi", "thơ", "của", "vladimir"],
        ["học", "sinh", "xuất", "sắc"],
        ["thường", "xuyên", "tràn", "ngập"],
        ["không", "có", "bất", "kỳ", "dấu", "hiệu"],
        ["hai", "bi", "kịch", "liên", "tiếp"]
    ],
    "part3": [
        ["năm", "1886"],
        ["nỗi", "đau", "mất", "cha"],
        ["sinh", "viên", "tại", "saint", "petersburg"],
        ["bị", "đưa", "ra", "xét", "xử"],
        ["ngày", "8", "tháng", "5"],
        ["khoảnh", "khắc", "bản", "lề"],
        ["từng", "được", "kính", "trọng"],
        ["người", "ta", "tránh", "xa"],
        ["chi", "tiết", "rất", "đáng", "chú", "ý"],
        ["nghiên", "cứu", "giun", "đất"],
        ["ông", "đã", "nhầm"],
        ["ngay", "năm", "anh", "trai"]
    ],
    "part4": [
        ["chỉ", "vài", "tháng", "sau"],
        ["tham", "gia", "biểu", "tình"],
        ["bị", "đuổi", "khỏi", "trường"],
        ["trang", "trại", "nhỏ"],
        ["tác", "phẩm", "của", "karl", "marx"],
        ["ông", "đọc", "ngấu", "nghiến"],
        ["chủ", "nghĩa", "marx", "đầy", "tâm", "huyết"],
        ["tự", "học", "từ", "xa"],
        ["năm", "1893"]
    ],
    "part5": [
        ["hoạt", "động", "cách", "mạng", "bí", "mật"],
        ["năm", "1897"],
        ["toa", "tàu", "hạng", "nhất"],
        ["ngôi", "làng", "có", "tên", "shushenskoye"],
        ["tự", "do", "viết", "lách"],
        ["nadezhda", "krupskaya"],
        ["bộ", "tư", "bản", "luận"],
        ["sau", "khi", "mãn", "hạn"],
        ["tờ", "báo", "bí", "mật", "mang", "tên", "iskra"],
        ["năm", "1901"],
        ["đại", "hội", "lần", "thứ", "hai"],
        ["tự", "gọi", "mình", "là", "bolshevik"]
    ],
    "part6": [
        ["chiến", "tranh", "với", "nhật", "bản"],
        ["cách", "mạng", "năm", "1905"],
        ["thất", "bại"],
        ["sa", "hoàng", "nicholas"],
        ["vô", "hiệu", "hóa"],
        ["năm", "1907"],
        ["thiếu", "thốn", "tài", "chính"],
        ["thế", "chiến", "thứ", "nhất"],
        ["cực", "lực", "phản", "đối"],
        ["zurich", "thụy", "sĩ"]
    ],
    "part7": [
        ["kiệt", "quệ", "hoàn", "toàn"],
        ["tháng", "3", "năm", "1917"],
        ["dòng", "họ", "romanov"],
        ["chính", "quyền", "đức"],
        ["toa", "tàu", "được", "niêm", "phong"],
        ["ngày", "3", "tháng", "4"],
        ["luận", "cương", "tháng", "tư"],
        ["nhiều", "đồng", "chí", "bolshevik"],
        ["chính", "phủ", "lâm", "thời"],
        ["kiệt", "quệ", "và", "phẫn", "nộ"]
    ],
    "part8": [
        ["tháng", "10", "năm", "1917"],
        ["xô", "viết", "petrograd"],
        ["đêm", "24", "rạng", "sáng", "25"],
        ["nhà", "ga", "bưu", "điện"],
        ["giai", "đoạn", "đầu"],
        ["sụp", "đổ", "nhanh", "chóng"],
        ["cách", "mạng", "tháng", "mười"],
        ["chỉ", "trong", "một", "đêm"],
        ["người", "đứng", "đầu", "chính", "phủ"]
    ],
    "part9": [
        ["tháng", "3", "năm", "1918"],
        ["hiệp", "ước", "brest-litovsk"],
        ["nhiều", "người", "trong", "nội", "bộ"],
        ["kẻ", "thù", "bên", "trong"],
        ["phe", "bạch", "vệ"],
        ["suốt", "ba", "năm", "đẫm", "máu"],
        ["cường", "quốc", "từng", "là", "đồng", "minh"],
        ["lo", "ngại", "sâu", "sắc"]
    ],
    "part10": [
        ["vụ", "ám", "sát", "hụt"],
        ["khủng", "bố", "đỏ"],
        ["lực", "lượng", "cảnh", "sát", "mật"],
        ["bạo", "lực"],
        ["thủy", "thủ", "và", "binh", "lính"],
        ["cộng", "sản", "thời", "chiến"],
        ["trưng", "thu", "lương", "thực"],
        ["nạn", "đói", "khủng", "khiếp"],
        ["khoảng", "năm", "1921"],
        ["cướp", "đi", "sinh", "mạng"]
    ],
    "part11": [
        ["làn", "sóng", "bất", "mãn"],
        ["chính", "sách", "kinh", "tế", "mới"],
        ["thương", "mại", "tư", "nhân"],
        ["thực", "dụng", "rất", "rõ", "rệt"],
        ["chính", "quyền", "xô", "viết", "còn", "non", "trẻ"],
        ["mang", "lại", "một", "mức", "độ", "ổn", "định"]
    ],
    "part12": [
        ["sức", "khỏe", "của", "chính", "lenin"],
        ["cơn", "đột", "quỵ", "đầu", "tiên"],
        ["đầu", "năm", "1923"],
        ["di", "chúc", "chính", "trị"],
        ["joseph", "stalin"],
        ["nỗi", "day", "dứt", "sâu", "sắc"],
        ["bộ", "máy", "quyền", "lực"],
        ["không", "được", "công", "bố", "rộng", "rãi"],
        ["người", "kế", "nhiệm", "thực", "sự"]
    ],
    "part13": [
        ["ngày", "21", "tháng", "1", "năm", "1924"],
        ["làn", "sóng", "thương", "tiếc"],
        ["ướp", "xác"],
        ["quảng", "trường", "đỏ"],
        ["nguyên", "tắc", "vô", "thần"],
        ["thần", "thánh", "hóa"],
        ["chưa", "đầy", "một", "thập", "kỷ"],
        ["di", "sản", "của", "lenin"],
        ["từ", "cậu", "bé", "học", "giỏi"],
        ["sau", "tròn", "một", "thế", "kỷ"]
    ]
}

def load_captions():
    with open("src/data/leninCaptions.ts", "r", encoding="utf-8") as f:
        text = f.read()
    start_idx = text.find("export const LENIN_CAPTIONS: Record<string, CaptionPhrase[]> = ") + len("export const LENIN_CAPTIONS: Record<string, CaptionPhrase[]> = ")
    end_idx = text.rfind(";")
    return json.loads(text[start_idx:end_idx].strip())

def clean_tok(t):
    return re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t.lower()).strip()

def find_cue_start_frame(words, cue_tokens, min_idx=0):
    cue_clean = [clean_tok(c) for c in cue_tokens if clean_tok(c)]
    if not cue_clean:
        return 0, min_idx

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

    # Thử tìm 2 từ đầu hoặc 1 từ đầu nếu chuỗi dài
    if len(cue_clean) >= 2:
        for i in range(min_idx, len(words) - 1):
            if clean_tok(words[i]["word"]) == cue_clean[0] and clean_tok(words[i+1]["word"]) == cue_clean[1]:
                frame = int(round((words[i]["startMs"] / 1000) * 30))
                return frame, i

    if len(cue_clean) >= 1:
        for i in range(min_idx, len(words)):
            if clean_tok(words[i]["word"]) == cue_clean[0]:
                frame = int(round((words[i]["startMs"] / 1000) * 30))
                return frame, i

    return None, min_idx

def main():
    captions = load_captions()
    
    # Đọc leninData.ts hiện tại
    with open("src/data/leninData.ts", "r", encoding="utf-8") as f:
        data_text = f.read()
    start_idx = data_text.find("export const LENIN_CHAPTERS: LeninChapter[] = ") + len("export const LENIN_CHAPTERS: LeninChapter[] = ")
    end_idx = data_text.find("export const TOTAL_LENIN_FRAMES =")
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

    # Ghi lại vào src/data/leninData.ts
    out_ts = f"""// Dữ liệu 13 chương phim tài liệu 'Lenin: Từ cậu bé Simbirsk đến người kiến tạo Liên Xô'
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
    with open("src/data/leninData.ts", "w", encoding="utf-8") as f:
        f.write(out_ts)
    print("\n🎉 Đã cập nhật thành công imageStartFrames vào src/data/leninData.ts!")

if __name__ == "__main__":
    main()
