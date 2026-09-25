import json
import re
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')

    with open('scripts/aligned_steve_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    with open('scripts/steve_jobs_script.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    print(f"Total script lines: {len(lines)}")
    print(f"Total tokens: {len(tokens)}")

    scene_metas = [
        {"id": 1,  "image": "01-steve-jobs-scene.png", "badge": "🍎 HUYỀN THOẠI STEVE JOBS", "hud": "APPLE & NHỮNG ĐỘT PHÁ THẾ KỶ"},
        {"id": 2,  "image": "02-steve-jobs-scene.png", "badge": "📦 BỊ SA THẢI & 12 NĂM TÁI SINH", "hud": "CỨU APPLE TỪ BỜ VỰC SỤP ĐỔ"},
        {"id": 3,  "image": "03-steve-jobs-scene.png", "badge": "🌉 SAN FRANCISCO 1955", "hud": "CẬU BÉ ĐƯỢC NHẬN NUÔI"},
        {"id": 4,  "image": "04-steve-jobs-scene.png", "badge": "⚡ ĐAM MÊ ĐIỆN TỬ TỪ NHỎ", "hud": "TRÁI TIM THUNG LŨNG SILICON"},
        {"id": 5,  "image": "05-steve-jobs-scene.png", "badge": "🖋️ LỚP THƯ PHÁP ĐẠI HỌC REED", "hud": "QUYẾT ĐỊNH BỎ HỌC ĐỂ DỰ THÍNH"},
        {"id": 6,  "image": "06-steve-jobs-scene.png", "badge": "💻 NGHỆ THUẬT FONT CHỮ MACINTOSH", "hud": "GIAO THOA CÔNG NGHỆ & NGHỆ THUẬT"},
        {"id": 7,  "image": "07-steve-jobs-scene.png", "badge": "🔨 GA-RA NHÀ STEVE JOBS 1976", "hud": "CÙNG WOZNIAK SÁNG LẬP APPLE"},
        {"id": 8,  "image": "08-steve-jobs-scene.png", "badge": "📈 TRIỆU PHÚ TUỔI 25 VỚI APPLE II", "hud": "IPO LỊCH SỬ NĂM 1980"},
        {"id": 9,  "image": "09-steve-jobs-scene.png", "badge": "🖥️ ĐẠI CÁCH MẠNG MACINTOSH 1984", "hud": "GIAO DIỆN ĐỒ HỌA & CON CHUỘT"},
        {"id": 10, "image": "10-steve-jobs-scene.png", "badge": "🥤 CÂU HỎI THAY ĐỔI LỊCH SỬ", "hud": "LỜI MỜI DÀNH CHO JOHN SCULLEY"},
        {"id": 11, "image": "11-steve-jobs-scene.png", "badge": "⚡ BI KỊCH BỊ ĐẨY KHỎI APPLE 1985", "hud": "CUỘC ĐẢO CHÍNH PHÒNG HỌP"},
        {"id": 12, "image": "12-steve-jobs-scene.png", "badge": "⬛ KHỐI LẬP PHƯƠNG NEXT COMPUTER", "hud": "BẮT ĐẦU LẠI TỪ CON SỐ KHÔNG"},
        {"id": 13, "image": "13-steve-jobs-scene.png", "badge": "🎨 MUA LẠI PIXAR NĂM 1986", "hud": "5 TRIỆU ĐÔ LA & ĐỒ HỌA 3D"},
        {"id": 14, "image": "14-steve-jobs-scene.png", "badge": "🧸 TOY STORY 1995 THẮNG LỚN", "hud": "PHIM HOẠT HÌNH 3D ĐẦU TIÊN"},
        {"id": 15, "image": "15-steve-jobs-scene.png", "badge": "🔄 CÚ TRỞ LẠI NGOẠN MỤC 1997", "hud": "APPLE MUA NEXT $400 TRIỆU"},
        {"id": 16, "image": "16-steve-jobs-scene.png", "badge": "🤝 CẮT GIẢM & BẮT TAY MICROSOFT", "hud": "KHOẢN CỨU NGUY $150 TRIỆU"},
        {"id": 17, "image": "17-steve-jobs-scene.png", "badge": "🌈 IMAC ĐẦY MÀU SẮC 1998", "hud": "HỒI SINH LINH HỒN APPLE"},
        {"id": 18, "image": "18-steve-jobs-scene.png", "badge": "🎵 1.000 BÀI HÁT TRONG TÚI ÁO", "hud": "IPOD 2001 & CỬA HÀNG ITUNES"},
        {"id": 19, "image": "19-steve-jobs-scene.png", "badge": "📱 NGÀY IPHONE RA ĐỜI 2007", "hud": "3 THIẾT BỊ TRONG MỘT CHIẾC MÁY"},
        {"id": 20, "image": "20-steve-jobs-scene.png", "badge": "📖 MÁY TÍNH BẢNG IPAD 2010", "hud": "KỶ NGUYÊN HẬU PC"},
        {"id": 21, "image": "21-steve-jobs-scene.png", "badge": "🌀 TRƯỜNG BÓP MÉO THỰC TẠI", "hud": "SỰ CẦU TOÀN TUYỆT ĐỐI"},
        {"id": 22, "image": "22-steve-jobs-scene.png", "badge": "🎓 BÀI HỌC CÁI CHẾT TẠI STANFORD", "hud": "SỐNG THẬT VỚI ĐIỀU MÌNH YÊU"},
        {"id": 23, "image": "23-steve-jobs-scene.png", "badge": "🕯️ VĨNH BIỆT STEVE JOBS 2011", "hud": "HƯỞNG THỌ 56 TUỔI"},
        {"id": 24, "image": "24-steve-jobs-scene.png", "badge": "🍎 STAY HUNGRY, STAY FOOLISH", "hud": "NGƯỜI THAY ĐỔI CẢ THẾ GIỚI"},
    ]

    KEYWORDS = {
        "steve", "jobs", "apple", "macintosh", "ipod", "iphone", "ipad", "sa", "thải", "12",
        "năm", "phá", "sản", "1955", "san", "francisco", "nhận", "nuôi", "silicon", "điện", "tử",
        "reed", "bỏ", "học", "thư", "pháp", "kiểu", "chữ", "đẹp", "1976", "wozniak", "ga-ra",
        "1977", "1980", "triệu", "phú", "25", "1984", "chuột", "sculley", "pepsi", "ceo", "nước",
        "ngọt", "1985", "next", "1986", "lucasfilm", "5", "đô", "la", "pixar", "1995", "toy",
        "story", "1997", "400", "microsoft", "150", "1998", "imac", "hồi", "sinh", "2001", "túi",
        "áo", "2003", "itunes", "nhạc", "2007", "thoại", "internet", "2010", "khắt", "khe", "bóp",
        "méo", "thực", "tại", "ung", "thư", "2005", "stanford", "chết", "yêu", "2011", "56"
    }

    scene_line_indices = [
        [0],        # 01: S01
        [1],        # 02: S02
        [2],        # 03: S03
        [3],        # 04: S04
        [4],        # 05: S05
        [5],        # 06: S06
        [6],        # 07: S07
        [7],        # 08: S08
        [8],        # 09: S09
        [9],        # 10: S10
        [10, 11],   # 11: S11 + S12
        [12],       # 12: S13
        [13],       # 13: S14
        [14],       # 14: S15
        [15, 16],   # 15: S16 + S17
        [17],       # 16: S18
        [18],       # 17: S19
        [19, 20],   # 18: S20 + S21
        [21],       # 19: S22
        [22],       # 20: S23
        [23, 24],   # 21: S24 + S25
        [25, 26],   # 22: S26 + S27
        [27],       # 23: S28
        [28],       # 24: S29
    ]

    cursor = 0
    line_tokens = []
    for l in lines:
        w_count = len(l.split())
        l_toks = tokens[cursor : cursor + w_count]
        cursor += w_count
        line_tokens.append(l_toks)

    scene_tokens = []
    for l_indices in scene_line_indices:
        st = []
        for li in l_indices:
            st.extend(line_tokens[li])
        scene_tokens.append(st)

    fps = 30
    total_frames = 5010 # 167.0s (audio 166.08s + 0.92s tail hold)

    scenes_output = []
    for idx, (meta, s_toks) in enumerate(zip(scene_metas, scene_tokens)):
        s_id = idx + 1
        if s_id == 1:
            start_frame = 0
        else:
            start_frame = scenes_output[-1]["endFrame"]

        if s_id == len(scene_metas):
            end_frame = total_frames
        else:
            next_start_ms = scene_tokens[idx + 1][0]["startMs"]
            end_frame = max(start_frame + 20, round((next_start_ms / 1000) * fps))

        scenes_output.append({
            "id": s_id,
            "image": meta["image"],
            "badge": meta["badge"],
            "hud": meta["hud"],
            "startFrame": start_frame,
            "endFrame": end_frame,
            "durationInFrames": end_frame - start_frame
        })

    # Now create phrase captions: 3-6 words per chunk
    phrases_output = []
    phrase_id = 1

    for s_idx, (meta, s_toks) in enumerate(zip(scenes_output, scene_tokens)):
        n_toks = len(s_toks)
        if n_toks <= 6:
            chunk_sizes = [n_toks]
        elif n_toks <= 11:
            h = n_toks // 2
            chunk_sizes = [h, n_toks - h]
        elif n_toks <= 17:
            h = n_toks // 3
            chunk_sizes = [h, h, n_toks - 2 * h]
        elif n_toks <= 24:
            h = n_toks // 4
            chunk_sizes = [h, h, h, n_toks - 3 * h]
        elif n_toks <= 32:
            h = n_toks // 5
            chunk_sizes = [h, h, h, h, n_toks - 4 * h]
        elif n_toks <= 42:
            h = n_toks // 6
            chunk_sizes = [h] * 5 + [n_toks - 5 * h]
        else:
            h = n_toks // 9
            chunk_sizes = [h] * 8 + [n_toks - 8 * h]

        c_offset = 0
        for c_size in chunk_sizes:
            chunk = s_toks[c_offset : c_offset + c_size]
            c_offset += c_size
            if not chunk:
                continue

            words = []
            for w in chunk:
                raw_w = w["word"]
                clean_w = re.sub(r'[^\w]', '', raw_w.lower())
                is_kw = clean_w in KEYWORDS
                words.append({
                    "word": raw_w,
                    "startMs": w["startMs"],
                    "endMs": w["endMs"],
                    "isKeyword": is_kw
                })

            p_text = " ".join([w["word"] for w in words])
            p_start_ms = words[0]["startMs"]
            p_end_ms = words[-1]["endMs"]

            phrases_output.append({
                "id": phrase_id,
                "sceneId": meta["id"],
                "text": p_text,
                "startMs": p_start_ms,
                "endMs": p_end_ms,
                "words": words
            })
            phrase_id += 1

    print(f"Generated {len(scenes_output)} scenes and {len(phrases_output)} phrases.")
    for sc in scenes_output:
        print(f"Scene {sc['id']:02d}: Frames {sc['startFrame']:4d} -> {sc['endFrame']:4d} ({sc['durationInFrames']:3d} frames, {sc['durationInFrames']/30:4.2f}s) | {sc['badge']}")

    # Write TypeScript file
    ts_content = f"""// Auto-generated Subtitles and Scene Configuration for Steve Jobs Short
// 24 Scenes matching 24 images and Apple narrative beats

export interface WordTiming {{
  word: string;
  startMs: number;
  endMs: number;
  isKeyword?: boolean;
}}

export interface PhraseCaption {{
  id: number;
  sceneId: number;
  text: string;
  startMs: number;
  endMs: number;
  words: WordTiming[];
}}

export interface SceneMeta {{
  id: number;
  image: string;
  badge: string;
  hud: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}}

export const STEVE_TOTAL_FRAMES = {total_frames};
export const STEVE_FPS = {fps};
export const STEVE_AUDIO_PATH = "audio/steve-jobs.wav";

export const STEVE_SCENES: SceneMeta[] = {json.dumps(scenes_output, ensure_ascii=False, indent=2)};

export const STEVE_PHRASES: PhraseCaption[] = {json.dumps(phrases_output, ensure_ascii=False, indent=2)};
"""

    with open('src/data/steveSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Written to src/data/steveSubtitles.ts successfully!")

if __name__ == '__main__':
    main()
