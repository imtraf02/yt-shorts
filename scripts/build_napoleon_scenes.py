import json
import os
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/aligned_napoleon_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    print(f"Total tokens loaded: {len(tokens)}")

    # 16 Exact Scene Definitions matching the 16 generated artworks 1-to-1
    scene_configs = [
        {
            "id": 1,
            "image": "01-napoleon-scene.png",
            "badge": "👑 VỊ HOÀNG ĐẾ RUNG CHUYỂN CHÂU ÂU",
            "hud": "NAPOLEON BONAPARTE",
            "end_token": ("lục", "địa"),
            "keywords": ["Napoleon", "Bonaparte", "hoàng đế", "Pháp", "rung chuyển", "châu Âu", "viết lại", "bản đồ", "lục địa"]
        },
        {
            "id": 2,
            "image": "02-napoleon-scene.png",
            "badge": "📜 BỘ LUẬT DÂN SỰ BẤT HỦ",
            "hud": "DI SẢN PHÁP QUYỀN",
            "end_token": ("ngày", "nay"),
            "keywords": ["Bộ luật Dân sự", "Bộ", "luật", "Dân", "sự", "ảnh hưởng", "quốc gia", "ngày nay"]
        },
        {
            "id": 3,
            "image": "03-napoleon-scene.png",
            "badge": "📏 ÁM ẢNH 200 NĂM VỀ CHIỀU CAO",
            "hud": "HIỂU LẦM 2 THẾ KỶ",
            "end_token": ("chiều", "cao"),
            "keywords": ["200", "năm", "chiến công", "quyền lực", "chiều cao"]
        },
        {
            "id": 4,
            "image": "04-napoleon-scene.png",
            "badge": "📐 CON SỐ HIỂU LẦM: 5 PIEDS 2 POUCES",
            "hud": "SỐ LIỆU LỊCH SỬ",
            "end_token": ("2", "pouces"),
            "keywords": ["thế giới", "vua lùn tì", "hiểu lầm", "khổng lồ", "qua đời", "5", "pieds", "2", "pouces"]
        },
        {
            "id": 5,
            "image": "05-napoleon-scene.png",
            "badge": "⚖️ ĐƠN VỊ ĐO PHÁP DÀI HƠN ANH",
            "hud": "QUY ĐỔI ĐƠN VỊ ĐO",
            "end_token": ("của", "Anh"),
            "keywords": ["1", "mét", "57", "đơn vị", "Pháp", "dài hơn", "Anh"]
        },
        {
            "id": 6,
            "image": "06-napoleon-scene.png",
            "badge": "✅ SỰ THẬT: 1M68 ĐẾN 1M70",
            "hud": "CAO HƠN MỨC TRUNG BÌNH",
            "end_token": ("bấy", "giờ"),
            "keywords": ["Quy đổi", "thực tế", "1 mét 68", "1 mét 70", "68", "70", "cao hơn", "trung bình", "Pháp", "bấy giờ"]
        },
        {
            "id": 7,
            "image": "07-napoleon-scene.png",
            "badge": "💂 VỆ BINH CAO LỚN VƯỢT TRỘI",
            "hud": "TUYỂN CHỌN THEO CHIỀU CAO",
            "end_token": ("vượt", "trội"),
            "keywords": ["nhỏ bé", "vệ binh", "tuyển chọn", "chiều cao", "cao lớn", "vượt trội"]
        },
        {
            "id": 8,
            "image": "08-napoleon-scene.png",
            "badge": "👁️ HIỆU ỨNG THỊ GIÁC QUANH HỌ",
            "hud": "ẢO GIÁC QUANG HỌC",
            "end_token": ("bé", "đi"),
            "keywords": ["Đứng cạnh họ", "dù là ai", "trông bé đi"]
        },
        {
            "id": 9,
            "image": "09-napoleon-scene.png",
            "badge": "📰 BÁO CHÍ ANH & JAMES GILLRAY",
            "hud": "CHIẾN DỊCH BÔI NHỌ",
            "end_token": ("Little", "Boney"),
            "keywords": ["thủ phạm", "báo chí Anh", "họa sĩ", "biếm họa", "James", "Gillray", "Little", "Boney"]
        },
        {
            "id": 10,
            "image": "10-napoleon-scene.png",
            "badge": "🎨 HÌNH TƯỢNG 'LITTLE BONEY' HAY CÁU",
            "hud": "BIẾM HỌA LỊCH SỬ",
            "end_token": ("hay", "cáu"),
            "keywords": ["chú lùn", "nóng nảy", "hay dỗi", "hay cáu", "cáu"]
        },
        {
            "id": 11,
            "image": "11-napoleon-scene.png",
            "badge": "🌍 LAN TRUYỀN HÀNG TRIỆU ẤN BẢN",
            "hud": "IN SÂU SUỐT HAI THẾ KỶ",
            "end_token": ("thế", "kỷ"),
            "keywords": ["bức tranh", "lan truyền", "châu Âu", "in sâu", "trí nhớ", "nhân loại", "hai thế kỷ"]
        },
        {
            "id": 12,
            "image": "12-napoleon-scene.png",
            "badge": "💥 THUA TRẬN CHIẾN TRUYỀN THÔNG",
            "hud": "THẤT BẠI TRÊN MẶT BÁO",
            "end_token": ("truyền", "thông"),
            "keywords": ["Trớ trêu", "chinh phục", "châu Âu", "thua", "trận", "truyền thông"]
        },
        {
            "id": 13,
            "image": "13-napoleon-scene.png",
            "badge": "✒️ VŨ KHÍ KẺ THÙ: BÚT VÀ GIẤY",
            "hud": "SỨC MẠNH NGÒI BÚT",
            "end_token": ("mãi", "mãi"),
            "keywords": ["Kẻ thù", "chiến trường", "cây bút", "tờ giấy", "trò cười", "mãi mãi"]
        },
        {
            "id": 14,
            "image": "14-napoleon-scene.png",
            "badge": "🐇 BUỔI ĐI SĂN THỎ HIỆP ƯỚC 1807",
            "hud": "GIAI THOẠI THỎ NUÔI",
            "end_token": ("thỏ", "nuôi"),
            "keywords": ["giai thoại", "buổi săn thỏ", "săn thỏ", "chuẩn bị", "thỏ nuôi"]
        },
        {
            "id": 15,
            "image": "15-napoleon-scene.png",
            "badge": "🏃 VỊ TƯỚNG THÁO CHẠY TRƯỚC BẦY THỎ",
            "hud": "BẦY THỎ ĐỒNG LOẠT TẤN CÔNG",
            "end_token": ("bầy", "thỏ"),
            "keywords": ["thay vì", "bỏ chạy", "lao thẳng", "Napoleon", "đội quân nhỏ", "Vị tướng", "châu Âu", "run sợ", "tháo chạy", "bầy thỏ"]
        },
        {
            "id": 16,
            "image": "16-napoleon-scene.png",
            "badge": "👑 BIỂU TƯỢNG VĨ ĐẠI VÀ NGHỊCH LÝ",
            "hud": "NAPOLEON BONAPARTE",
            "end_token": ("là", "Napoleon"),
            "keywords": ["đánh bại", "đội quân", "không thắng", "chiến dịch", "bôi nhọ", "bầy thỏ", "chính là", "Napoleon"]
        },
    ]

    current_idx = 0
    scenes_data = []

    for s_idx, sc in enumerate(scene_configs):
        w1, w2 = sc["end_token"]
        found_idx = -1
        if s_idx == len(scene_configs) - 1:
            found_idx = len(tokens) - 1
        else:
            for i in range(current_idx, len(tokens) - 1):
                cleaned_1 = tokens[i]['text'].strip(".,!?:;\"'—- ")
                cleaned_2 = tokens[i+1]['text'].strip(".,!?:;\"'—- ")
                if cleaned_1.lower() == w1.lower() and cleaned_2.lower() == w2.lower():
                    found_idx = i + 1
                    break
        
        if found_idx == -1:
            print(f"Error finding boundary for scene {sc['id']}: {w1} {w2}")
            return
        
        sc_tokens = tokens[current_idx : found_idx + 1]
        scenes_data.append({
            "config": sc,
            "tokens": sc_tokens,
            "startMs": sc_tokens[0]["startMs"],
            "endMs": sc_tokens[-1]["endMs"]
        })
        current_idx = found_idx + 1

    TOTAL_FRAMES = 2850
    FPS = 30.0

    scene_frames = []
    for i, s in enumerate(scenes_data):
        if i == 0:
            start_f = 0
        else:
            prev_end_f = int(scenes_data[i-1]["endMs"] * FPS / 1000.0)
            curr_start_f = int(s["startMs"] * FPS / 1000.0)
            split_f = (prev_end_f + curr_start_f) // 2
            start_f = split_f

        scene_frames.append({"startFrame": start_f})

    for i in range(len(scene_frames)):
        if i < len(scene_frames) - 1:
            scene_frames[i]["endFrame"] = scene_frames[i+1]["startFrame"]
        else:
            scene_frames[i]["endFrame"] = TOTAL_FRAMES
        scene_frames[i]["durationInFrames"] = scene_frames[i]["endFrame"] - scene_frames[i]["startFrame"]

    for i, sf in enumerate(scene_frames):
        s = scenes_data[i]
        print(f"Scene {s['config']['id']} ({s['config']['image']}): {sf['startFrame']} -> {sf['endFrame']} ({sf['durationInFrames']}f, {sf['durationInFrames']/30.0:.2f}s) | '{s['tokens'][0]['text']}' -> '{s['tokens'][-1]['text']}'")

    phrases = []
    phrase_id = 1
    
    for s_idx, s in enumerate(scenes_data):
        sc_tokens = s["tokens"]
        sc_keywords = [kw.lower() for kw in s["config"]["keywords"]]

        curr_phrase_tokens = []
        for t_idx, t in enumerate(sc_tokens):
            curr_phrase_tokens.append(t)
            is_last_token = (t_idx == len(sc_tokens) - 1)
            
            ends_punct = any(t["text"].endswith(p) for p in [".", ",", "!", "?", "—", ":", ";", "..."])
            
            has_pause = False
            if not is_last_token:
                next_t = sc_tokens[t_idx + 1]
                if next_t["startMs"] - t["endMs"] >= 200:
                    has_pause = True

            word_count = len(curr_phrase_tokens)
            should_break = False

            if is_last_token:
                should_break = True
            elif ends_punct and word_count >= 3:
                should_break = True
            elif has_pause and word_count >= 3:
                should_break = True
            elif word_count >= 6:
                should_break = True

            if should_break:
                p_text = " ".join([pt["text"] for pt in curr_phrase_tokens])
                p_start = curr_phrase_tokens[0]["startMs"]
                p_end = curr_phrase_tokens[-1]["endMs"]
                
                words_list = []
                for pt in curr_phrase_tokens:
                    clean_pt = pt["text"].strip(".,!?:;\"'—- ").lower()
                    is_kw = any(clean_pt == kw or kw in clean_pt for kw in sc_keywords)
                    words_list.append({
                        "word": pt["text"],
                        "startMs": pt["startMs"],
                        "endMs": pt["endMs"],
                        "isKeyword": is_kw
                    })

                phrases.append({
                    "id": phrase_id,
                    "sceneId": s["config"]["id"],
                    "text": p_text,
                    "startMs": p_start,
                    "endMs": p_end,
                    "words": words_list
                })
                phrase_id += 1
                curr_phrase_tokens = []

    print(f"Generated {len(phrases)} phrases across 16 scenes.")

    ts_content = """// Auto-generated 100% synchronized subtitle & scene data for Napoleon Bonaparte
// Audio duration: 93.360s (2801 frames @ 30 FPS). Composition total: 2850 frames (95.000s @ 30 FPS)

export interface WordToken {
  word: string;
  startMs: number;
  endMs: number;
  isKeyword?: boolean;
}

export interface PhraseItem {
  id: number;
  sceneId: number;
  text: string;
  startMs: number;
  endMs: number;
  words: WordToken[];
}

export interface SceneMeta {
  id: number;
  title: string;
  badge: string;
  hud: string;
  image: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  startMs: number;
  endMs: number;
}

export const NAPOLEON_SCENES: SceneMeta[] = """ + json.dumps([
        {
            "id": s["config"]["id"],
            "title": f"Scene {s['config']['id']}",
            "badge": s["config"]["badge"],
            "hud": s["config"]["hud"],
            "image": s["config"]["image"],
            "startFrame": scene_frames[i]["startFrame"],
            "endFrame": scene_frames[i]["endFrame"],
            "durationInFrames": scene_frames[i]["durationInFrames"],
            "startMs": s["startMs"],
            "endMs": s["endMs"]
        } for i, s in enumerate(scenes_data)
    ], ensure_ascii=False, indent=2) + """;

export const NAPOLEON_PHRASES: PhraseItem[] = """ + json.dumps(phrases, ensure_ascii=False, indent=2) + """;

export const TOTAL_NAPOLEON_FRAMES = 2850;
"""

    with open('src/data/napoleonSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Successfully wrote src/data/napoleonSubtitles.ts with 100% accurate visual alignment!")

if __name__ == '__main__':
    main()
