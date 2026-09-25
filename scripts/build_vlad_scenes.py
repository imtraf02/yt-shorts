import json
import os
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/aligned_vlad_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    print(f"Total tokens loaded: {len(tokens)}")

    # 15 Scenes strictly aligned to the visual content and audio narration
    scene_configs = [
        {
            "id": 1,
            "image": "01-vlad-dracula-scene.png",
            "badge": "👑 ANH HÙNG DÂN TỘC ROMANIA",
            "hud": "VLAD ĐỆ TAM • DRACULA",
            "end_token": ("bấy", "giờ"),
            "keywords": ["Vlad", "III", "Kẻ Đâm Xuyên", "Wallachia", "Dracula", "ma cà rồng", "Romania", "anh hùng", "Ottoman"]
        },
        {
            "id": 2,
            "image": "02-vlad-dracula-scene.png",
            "badge": "🐉 HỘI RỒNG VÀ DANH HIỆU DRACULA",
            "hud": "CON TRAI CỦA RỒNG",
            "end_token": ("gia", "tộc"),
            "keywords": ["1431", "Vlad II", "Hội Rồng", "Dracul", "Rồng", "Dracula", "con trai của Rồng", "gia tộc"]
        },
        {
            "id": 3,
            "image": "03-vlad-dracula-scene.png",
            "badge": "⛓️ CON TIN GIỮA TRIỀU ĐÌNH OTTOMAN",
            "hud": "TUỔI THƠ BỊ GIÁM SÁT",
            "end_token": ("kẻ", "thù"),
            "keywords": ["Tuổi thơ", "Radu", "Ottoman", "con tin", "trung thành", "giám sát", "kẻ thù"]
        },
        {
            "id": 4,
            "image": "04-vlad-dracula-scene.png",
            "badge": "💔 VẾT THƯƠNG KHÔNG BAO GIỜ LÀNH",
            "hud": "CHA VÀ ANH BỊ SÁT HẠI",
            "end_token": ("ai", "nữa"),
            "keywords": ["cha", "anh trai", "bị giết", "Wallachia", "chôn sống", "vết thương", "không bao giờ tin"]
        },
        {
            "id": 5,
            "image": "05-vlad-dracula-scene.png",
            "badge": "👑 LÊN NGÔI QUÂN VƯƠNG WALLACHIA",
            "hud": "TRIỀU ĐẠI 1456 - 1462",
            "end_token": ("đến", "1462"),
            "keywords": ["lên ngôi", "triều đại", "1456", "1462"]
        },
        {
            "id": 6,
            "image": "06-vlad-dracula-scene.png",
            "badge": "🏆 CHIẾC CỐC VÀNG KHÔNG AI DÁM LẤY",
            "hud": "LUẬT PHÁP KHẮC NGHIỆT",
            "end_token": ("của", "ông"),
            "keywords": ["luật pháp", "khắc nghiệt", "chiếc cốc vàng", "quảng trường", "không ai dám lấy", "truyền thuyết"]
        },
        {
            "id": 7,
            "image": "07-vlad-dracula-scene.png",
            "badge": "⚔️ HÌNH PHẠT 'KẺ ĐÂM XUYÊN'",
            "hud": "BIỆT DANH KHÉT TIẾNG",
            "end_token": ("dè", "dặt"),
            "keywords": ["Kẻ Đâm Xuyên", "đóng cọc", "xuyên người", "kẻ thù", "hàng chục nghìn", "thổi phồng", "dè dặt"]
        },
        {
            "id": 8,
            "image": "08-vlad-dracula-scene.png",
            "badge": "⚔️ SULTAN MEHMED II KÉO QUÂN TIẾN VÀO",
            "hud": "CHIẾN DỊCH NĂM 1462",
            "end_token": ("vào", "Wallachia"),
            "keywords": ["1462", "Sultan", "Mehmed II", "Constantinople", "Wallachia"]
        },
        {
            "id": 9,
            "image": "10-vlad-dracula-scene.png", # Night attack matches word "tập kích ban đêm"
            "badge": "🌙 CUỘC TẬP KÍCH BAN ĐÊM",
            "hud": "TẤN CÔNG BẤT NGỜ",
            "end_token": ("rút", "lui"),
            "keywords": ["tập kích", "ban đêm", "rút lui"]
        },
        {
            "id": 10,
            "image": "09-vlad-dracula-scene.png", # Scorched earth matches word "đốt phá đồng ruộng"
            "badge": "🔥 CHIẾN THUẬT VƯỜN KHÔNG NHÀ TRỐNG",
            "hud": "LÀM KIỆT SỨC QUÂN ĐỊCH",
            "end_token": ("kiệt", "sức"),
            "keywords": ["đốt phá", "đồng ruộng", "đầu độc", "nguồn nước", "kiệt sức"]
        },
        {
            "id": 11,
            "image": "11-vlad-dracula-scene.png",
            "badge": "🌲 CÁNH RỪNG CỌC RÙNG RỢN",
            "hud": "QUÂN OTTOMAN THÁO CHẠY",
            "end_token": ("rút", "quân"),
            "keywords": ["thủ đô", "Ottoman", "cánh rừng cọc", "thi thể", "Mehmed", "rút quân"]
        },
        {
            "id": 12,
            "image": "12-vlad-dracula-scene.png",
            "badge": "⚔️ CÁI CHẾT BÍ ẨN NĂM 1476",
            "hud": "TRẬN CHIẾN CUỐI CÙNG",
            "end_token": ("bí", "ẩn"),
            "keywords": ["qua đời", "1476", "trận chiến", "cái chết", "bí ẩn"]
        },
        {
            "id": 13,
            "image": "13-vlad-dracula-scene.png",
            "badge": "🏛️ BÍ ẨN NƠI AN NGHỈ",
            "hud": "LĂNG MỘ CHƯA XÁC ĐỊNH",
            "end_token": ("chắc", "chắn"),
            "keywords": ["vị trí", "ngôi mộ", "chưa được xác định", "chắc chắn"]
        },
        {
            "id": 14,
            "image": "14-vlad-dracula-scene.png",
            "badge": "📖 HUYỀN THOẠI BRAM STOKER 1897",
            "hud": "TIỂU THUYẾT DRACULA",
            "end_token": ("kinh", "dị"),
            "keywords": ["ma cà rồng", "1897", "Bram Stoker", "tiểu thuyết", "Dracula", "không hề uống máu", "kinh dị"]
        },
        {
            "id": 15,
            "image": "15-vlad-dracula-scene.png",
            "badge": "👑 ANH HÙNG DÂN TỘC HAY QUÁI VẬT?",
            "hud": "VLAD DRACULA",
            "end_token": ("Vlad", "Dracula"),
            "keywords": ["con tin", "khiếp sợ", "đế chế", "quái vật", "Vlad Dracula"]
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
                c1 = tokens[i]['word'].strip(".,!?:;\"'—- ").lower()
                c2 = tokens[i+1]['word'].strip(".,!?:;\"'—- ").lower()
                if c1 == w1.lower() and c2 == w2.lower():
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

    TOTAL_FRAMES = 4110 # 137.00s @ 30fps (audio ends at 135.44s)
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
        print(f"Scene {s['config']['id']} ({s['config']['image']}): {sf['startFrame']} -> {sf['endFrame']} ({sf['durationInFrames']}f, {sf['durationInFrames']/30.0:.2f}s) | '{s['tokens'][0]['word']}' -> '{s['tokens'][-1]['word']}'")

    phrases = []
    phrase_id = 1
    
    for s_idx, s in enumerate(scenes_data):
        sc_tokens = s["tokens"]
        sc_keywords = [kw.lower() for kw in s["config"]["keywords"]]

        curr_phrase_tokens = []
        for t_idx, t in enumerate(sc_tokens):
            curr_phrase_tokens.append(t)
            is_last_token = (t_idx == len(sc_tokens) - 1)
            
            ends_punct = any(t["word"].endswith(p) for p in [".", ",", "!", "?", "—", ":", ";", "..."])
            
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
                p_text = " ".join([pt["word"] for pt in curr_phrase_tokens])
                p_start = curr_phrase_tokens[0]["startMs"]
                p_end = curr_phrase_tokens[-1]["endMs"]
                
                words_list = []
                for pt in curr_phrase_tokens:
                    clean_pt = pt["word"].strip(".,!?:;\"'—- ").lower()
                    is_kw = any(clean_pt == kw or kw in clean_pt for kw in sc_keywords)
                    words_list.append({
                        "word": pt["word"],
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

    print(f"Generated {len(phrases)} phrases across 15 scenes.")

    ts_content = """// Auto-generated 100% synchronized subtitle & scene data for Vlad Dracula
// Audio duration: 135.443s (4063 frames @ 30 FPS). Composition total: 4110 frames (137.000s @ 30 FPS)

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

export const VLAD_SCENES: SceneMeta[] = """ + json.dumps([
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

export const VLAD_PHRASES: PhraseItem[] = """ + json.dumps(phrases, ensure_ascii=False, indent=2) + """;

export const TOTAL_VLAD_FRAMES = 4110;
"""

    with open('src/data/vladSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Successfully wrote src/data/vladSubtitles.ts with 100% accurate visual alignment!")

if __name__ == '__main__':
    main()
