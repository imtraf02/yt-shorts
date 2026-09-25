import json
import re
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')

    with open('scripts/aligned_nobel_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    with open('scripts/nobel_scenes.json', 'r', encoding='utf-8') as f:
        raw_scenes = json.load(f)

    print(f"Total tokens: {len(tokens)}")
    print(f"Total raw scenes: {len(raw_scenes)}")

    scene_metas = [
        {"id": 1,  "image": "01-alfred-nobel-scene.png", "badge": "⚜️ DI SẢN DANH GIÁ NHẤT THẾ GIỚI", "hud": "DI SẢN & GIẢI NOBEL BẤT TỬ"},
        {"id": 2,  "image": "02-alfred-nobel-scene.png", "badge": "⚡ CÚ SỐC KỲ LẠ TRONG LỊCH SỬ", "hud": "ĐỌC BẢN CÁO PHÓ KHI CÒN SỐNG"},
        {"id": 3,  "image": "03-alfred-nobel-scene.png", "badge": "📰 NHẦM LẪN NĂM 1888 TẠI PHÁP", "hud": "TỜ BÁO ĐĂNG NHẦM CÁO PHÓ"},
        {"id": 4,  "image": "04-alfred-nobel-scene.png", "badge": "💀 'NGƯỜI BUÔN CÁI CHẾT ĐÃ CHẾT'", "hud": "TIÊU ĐỀ BÁO RÙNG RỢN"},
        {"id": 5,  "image": "05-alfred-nobel-scene.png", "badge": "💣 PHÁT MINH THUỐC NỔ DYNAMITE", "hud": "VŨ KHÍ HỦY DIỆT MỚI"},
        {"id": 6,  "image": "06-alfred-nobel-scene.png", "badge": "💥 NỖI KINH HOÀNG KHẮP CHIẾN TRƯỜNG", "hud": "HÀNG NGÀN NẠN NHÂN TỬ NẠN"},
        {"id": 7,  "image": "07-alfred-nobel-scene.png", "badge": "💔 SỐC NẶNG TRƯỚC SỰ THẬT ĐAU LÒNG", "hud": "KẺ BUÔN BÁN SỰ HỦY DIỆT"},
        {"id": 8,  "image": "08-alfred-nobel-scene.png", "badge": "💡 QUYẾT ĐỊNH THAY ĐỔI CUỘC ĐỜI", "hud": "THAY ĐỔI CÁCH ĐỜI NHÌN NHẬN"},
        {"id": 9,  "image": "09-alfred-nobel-scene.png", "badge": "📜 NỖI SỢ SINH RA GIẢI NOBEL", "hud": "BẢN DI CHÚC LỊCH SỬ 1895"},
        {"id": 10, "image": "10-alfred-nobel-scene.png", "badge": "💰 NGHỊCH LÝ CỦA KHỐI TÀI SẢN", "hud": "GIÀU CÓ TỪ VŨ KHÍ HÀNG LOẠT"},
        {"id": 11, "image": "11-alfred-nobel-scene.png", "badge": "🕊️ HÓA GIẢI BẰNG HÒA BÌNH THẾ GIỚI", "hud": "DÙNG TIỀN TÔN VINH HÒA BÌNH"},
        {"id": 12, "image": "12-alfred-nobel-scene.png", "badge": "⚖️ ĐỒNG TIỀN TÀI TRỢ TỪ THUỐC NỔ", "hud": "NOBEL HÒA BÌNH TỪ TIỀN BÁN VŨ KHÍ"},
        {"id": 13, "image": "13-alfred-nobel-scene.png", "badge": "🕯️ ĐỜI TƯ CÔ ĐỘC SUỐT MỘT ĐỜI", "hud": "KHÔNG GIA ĐÌNH, KHÔNG CON CÁI"},
        {"id": 14, "image": "14-alfred-nobel-scene.png", "badge": "🔬 ĐÊM DÀI TRONG PHÒNG THÍ NGHIỆM", "hud": "LẶNG LẼ BÊN NHỮNG PHÁT MINH"},
        {"id": 15, "image": "15-alfred-nobel-scene.png", "badge": "✉️ LỜI THÚ NHẬN BI QUAN NHẤT", "hud": "TỰ NHẬN LÀ NGƯỜI BI QUAN NHẤT"},
        {"id": 16, "image": "16-alfred-nobel-scene.png", "badge": "👑 GIA TÀI KHỔNG LỒ & BÍ MẬT LẠ", "hud": "VẪN CẢM THẤY TRỐNG RỖNG"},
        {"id": 17, "image": "17-alfred-nobel-scene.png", "badge": "📐 BÍ ẨN KHÔNG CÓ GIẢI TOÁN HỌC", "hud": "6 LĨNH VỰC LOẠI TRỪ TOÁN HỌC"},
        {"id": 18, "image": "18-alfred-nobel-scene.png", "badge": "⚔️ MÂU THUẪN VỚI NHÀ TOÁN HỌC", "hud": "GIẢ THUYẾT MỐI THÙ CÁ NHÂN"},
        {"id": 19, "image": "19-alfred-nobel-scene.png", "badge": "🔥 CHUỘC LẠI TÊN TUỔI BẰNG GIA TÀI", "hud": "DÙNG CẢ GIA TÀI ĐỂ ĐỔI LẠI DI SẢN"},
        {"id": 20, "image": "20-alfred-nobel-scene.png", "badge": "🏆 HUYỀN THOẠI ALFRED NOBEL", "hud": "NGƯỜI ĐÀN ÔNG THAY ĐỔI DI SẢN"},
    ]

    KEYWORDS = {
        "nobel", "alfred", "di", "sản", "giải", "thưởng", "danh", "giá", "nhất", "thế", "giới",
        "cú", "sốc", "kỳ", "lạ", "lịch", "sử", "cáo", "phó", "chính", "mình", "sống",
        "1888", "anh", "trai", "qua", "đời", "pháp", "nhầm", "lẫn",
        "buôn", "cái", "chết", "phát", "minh", "thuốc", "nổ", "dynamite", "hàng", "ngàn",
        "chiến", "tranh", "khai", "thác", "mỏ", "nặng", "công", "cụ", "hủy", "diệt", "thay", "đổi",
        "sợ", "hãi", "trớ", "trêu", "giàu", "có", "vũ", "khí", "giết", "người", "loạt",
        "tôn", "vinh", "hòa", "bình", "tài", "trợ", "đời", "tư", "cô", "độc", "kết", "hôn", "con", "cái",
        "phòng", "thí", "nghiệm", "bức", "thư", "bi", "quan", "khổng", "lồ",
        "toán", "học", "6", "lĩnh", "vực", "mâu", "thuẫn", "chuộc", "lại", "tên", "tuổi"
    }

    fps = 30
    total_frames = 2650 # 88.33s (audio 87.31s + 1.02s tail hold)

    scenes_output = []
    for idx, (meta, sc) in enumerate(zip(scene_metas, raw_scenes)):
        s_id = idx + 1
        if s_id == 1:
            start_frame = 0
        else:
            start_frame = scenes_output[-1]["endFrame"]

        if s_id == len(scene_metas):
            end_frame = total_frames
        else:
            next_start_ms = raw_scenes[idx + 1]["startMs"]
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

    # Now create phrase captions: 3-5 words per chunk
    phrases_output = []
    phrase_id = 1

    for s_idx, (sc_out, sc_raw) in enumerate(zip(scenes_output, raw_scenes)):
        s_toks = tokens[sc_raw["startToken"] : sc_raw["endToken"] + 1]
        n_toks = len(s_toks)

        if n_toks <= 5:
            chunk_sizes = [n_toks]
        elif n_toks <= 9:
            h = n_toks // 2
            chunk_sizes = [h, n_toks - h]
        elif n_toks <= 14:
            h = n_toks // 3
            chunk_sizes = [h, h, n_toks - 2 * h]
        elif n_toks <= 19:
            h = n_toks // 4
            chunk_sizes = [h, h, h, n_toks - 3 * h]
        elif n_toks <= 25:
            h = n_toks // 5
            chunk_sizes = [h, h, h, h, n_toks - 4 * h]
        elif n_toks <= 32:
            h = n_toks // 6
            chunk_sizes = [h] * 5 + [n_toks - 5 * h]
        else:
            h = n_toks // 8
            chunk_sizes = [h] * 7 + [n_toks - 7 * h]

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
                "sceneId": sc_out["id"],
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
    ts_content = f"""// Auto-generated Subtitles and Scene Configuration for Alfred Nobel Short
// 20 Scenes matching 20 images and Victorian Gold / Archival narrative beats

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

export const NOBEL_TOTAL_FRAMES = {total_frames};
export const NOBEL_FPS = {fps};
export const NOBEL_AUDIO_PATH = "audio/alfred-nobel.wav";

export const NOBEL_SCENES: SceneMeta[] = {json.dumps(scenes_output, ensure_ascii=False, indent=2)};

export const NOBEL_PHRASES: PhraseCaption[] = {json.dumps(phrases_output, ensure_ascii=False, indent=2)};
"""

    with open('src/data/nobelSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Written to src/data/nobelSubtitles.ts successfully!")

if __name__ == '__main__':
    main()
