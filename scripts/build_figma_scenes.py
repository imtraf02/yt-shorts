import json
import os
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/aligned_figma_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    print(f"Total tokens loaded: {len(tokens)}")

    # 15 Scenes strictly aligned to the visual content and audio narration
    scene_configs = [
        {
            "id": 1,
            "image": "01-figma-scene.png",
            "badge": "⚡ NHÀ SÁNG LẬP FIGMA",
            "hud": "DYLAN FIELD • FIGMA",
            "end_token": ("duyệt", "web"),
            "keywords": ["Dylan", "Field", "Figma", "công cụ", "thiết kế", "designer", "ý tưởng", "bất khả thi", "trình duyệt", "web"]
        },
        {
            "id": 2,
            "image": "02-figma-scene.png",
            "badge": "🌉 CÁI NÔI SILICON VALLEY",
            "hud": "TUỔI THƠ SAY MÊ MÁY TÍNH",
            "end_token": ("từ", "nhỏ"),
            "keywords": ["1991", "Bay Area", "Thung lũng Silicon", "say mê", "máy tính"]
        },
        {
            "id": 3,
            "image": "03-figma-scene.png",
            "badge": "💻 BỘ ĐÔI THIÊN TÀI BROWN",
            "hud": "EVAN WALLACE & WEBGL",
            "end_token": ("không", "thể"),
            "keywords": ["Đại học Brown", "Evan Wallace", "đồ họa", "xuất sắc", "WebGL", "không thể"]
        },
        {
            "id": 4,
            "image": "04-figma-scene.png",
            "badge": "🎓 HỌC BỔNG THIEL $100.000",
            "hud": "QUYẾT ĐỊNH BỎ HỌC",
            "end_token": ("đồng", "ý"),
            "keywords": ["2012", "đại học", "Dylan", "Thiel Fellowship", "100.000", "đô la", "bỏ học", "đồng ý"]
        },
        {
            "id": 5,
            "image": "05-figma-scene.png",
            "badge": "🖥️ ĐẾ CHẾ PHẦN MỀM CÀI ĐẶT",
            "hud": "CANH BẠC CÔNG NGHỆ",
            "end_token": ("cá", "nhân"),
            "keywords": ["canh bạc", "phần mềm", "Adobe", "nặng nề", "máy tính", "cá nhân"]
        },
        {
            "id": 6,
            "image": "06-figma-scene.png",
            "badge": "🚫 NỖI HOÀI NGHI CẢ NGÀNH",
            "hud": "KHÔNG AI TIN TRÌNH DUYỆT",
            "end_token": ("thay", "thế"),
            "keywords": ["không ai tin", "trình duyệt", "đủ mạnh", "thay thế"]
        },
        {
            "id": 7,
            "image": "07-figma-scene.png",
            "badge": "⏳ 4 NĂM XÂY MÓNG",
            "hud": "KIÊN TRÌ TRONG BÓNG TỐI",
            "end_token": ("nền", "móng"),
            "keywords": ["bốn năm", "xây nền móng"]
        },
        {
            "id": 8,
            "image": "08-figma-scene.png",
            "badge": "⚙️ BỘ MÁY C++ & WEBGL",
            "hud": "TỐC ĐỘ NHƯ PHẦN MỀM GỐC",
            "end_token": ("trên", "máy"),
            "keywords": ["Evan", "đồ họa", "C++", "biên dịch", "trình duyệt", "WebGL", "vẽ nhanh"]
        },
        {
            "id": 9,
            "image": "09-figma-scene.png",
            "badge": "🚀 RA MẮT CHÍNH THỨC 2016",
            "hud": "CÙNG SỬA THỜI GIAN THỰC",
            "end_token": ("cho", "designer"),
            "keywords": ["2016", "Figma", "chính thức", "chỉnh sửa", "cùng lúc", "Google Docs", "designer"]
        },
        {
            "id": 10,
            "image": "10-figma-scene.png",
            "badge": "🔗 CHẤM DỨT NỖI ÁM ẢNH FILE",
            "hud": "CHỈ CẦN MỘT ĐƯỜNG LINK",
            "end_token": ("lại", "nữa"),
            "keywords": ["Cả đội", "không còn", "gửi file", "qua lại"]
        },
        {
            "id": 11,
            "image": "11-figma-scene.png",
            "badge": "💰 LỜI CHÀO MUA 20 TỶ USD",
            "hud": "ADOBE CÔNG BỐ THƯƠNG VỤ",
            "end_token": ("đô", "la"),
            "keywords": ["Figma", "lớn rất nhanh", "2022", "Adobe", "mua lại", "20 tỷ", "đô la"]
        },
        {
            "id": 12,
            "image": "12-figma-scene.png",
            "badge": "⚖️ CƠ QUAN QUẢN LÝ CHẶN ĐỨNG",
            "hud": "ANH & CHÂU ÂU TUÝT CÒI",
            "end_token": ("bị", "hủy"),
            "keywords": ["quản lý", "Anh", "châu Âu", "độc quyền", "2023", "bị hủy"]
        },
        {
            "id": 13,
            "image": "13-figma-scene.png",
            "badge": "💵 PHÍ ĐỀN BÙ 1 TỶ USD",
            "hud": "CHỨNG MINH GIÁ TRỊ KHỔNG LỒ",
            "end_token": ("mức", "nào"),
            "keywords": ["Adobe", "chấm dứt", "1 tỷ", "đô la", "thất bại", "giá trị", "Figma"]
        },
        {
            "id": 14,
            "image": "14-figma-scene.png",
            "badge": "📈 IPO LỊCH SỬ TĂNG 250%",
            "hud": "TỶ PHÚ NGOÀI BA MƯƠI",
            "end_token": ("ba", "mươi"),
            "keywords": ["Tháng 7", "2025", "chứng khoán", "cổ phiếu", "250%", "IPO", "Dylan", "tỷ phú", "ba mươi"]
        },
        {
            "id": 15,
            "image": "15-figma-scene.png",
            "badge": "✨ THAY ĐỔI CẢ NGÀNH THIẾT KẾ",
            "hud": "DYLAN FIELD - KẺ MỘNG MƠ",
            "end_token": ("Dylan", "Field"),
            "keywords": ["bỏ học", "đại học", "thay đổi", "ngành thiết kế", "Dylan Field"]
        }
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

    TOTAL_FRAMES = 3450 # 115.00s @ 30fps (audio ends at 113.10s)
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

            if should_break and curr_phrase_tokens:
                p_text = " ".join([pt["word"] for pt in curr_phrase_tokens])
                p_start_ms = curr_phrase_tokens[0]["startMs"]
                p_end_ms = curr_phrase_tokens[-1]["endMs"]
                
                p_words = []
                for pt in curr_phrase_tokens:
                    clean_w = pt["word"].strip(".,!?:;\"'—- ").lower()
                    is_kw = any(clean_w == kw or kw in clean_w for kw in sc_keywords if len(kw) > 1)
                    p_words.append({
                        "word": pt["word"],
                        "startMs": pt["startMs"],
                        "endMs": pt["endMs"],
                        "isKeyword": is_kw
                    })

                phrases.append({
                    "id": phrase_id,
                    "sceneId": s["config"]["id"],
                    "text": p_text,
                    "startMs": p_start_ms,
                    "endMs": p_end_ms,
                    "words": p_words
                })
                phrase_id += 1
                curr_phrase_tokens = []

    print(f"\nGenerated {len(phrases)} phrases across 15 scenes.")

    # Write TypeScript file
    ts_code = []
    ts_code.append('// Auto-generated Subtitles and Scene Configuration for Dylan Field (Figma) Short')
    ts_code.append('// 15 Scenes matching exact images and narration')
    ts_code.append('')
    ts_code.append('export interface WordTiming {')
    ts_code.append('  word: string;')
    ts_code.append('  startMs: number;')
    ts_code.append('  endMs: number;')
    ts_code.append('  isKeyword?: boolean;')
    ts_code.append('}')
    ts_code.append('')
    ts_code.append('export interface PhraseCaption {')
    ts_code.append('  id: number;')
    ts_code.append('  sceneId: number;')
    ts_code.append('  text: string;')
    ts_code.append('  startMs: number;')
    ts_code.append('  endMs: number;')
    ts_code.append('  words: WordTiming[];')
    ts_code.append('}')
    ts_code.append('')
    ts_code.append('export interface SceneMeta {')
    ts_code.append('  id: number;')
    ts_code.append('  image: string;')
    ts_code.append('  badge: string;')
    ts_code.append('  hud: string;')
    ts_code.append('  startFrame: number;')
    ts_code.append('  endFrame: number;')
    ts_code.append('  durationInFrames: number;')
    ts_code.append('}')
    ts_code.append('')
    ts_code.append(f'export const FIGMA_TOTAL_FRAMES = {TOTAL_FRAMES};')
    ts_code.append('export const FIGMA_FPS = 30;')
    ts_code.append('export const FIGMA_AUDIO_PATH = "audio/figma-dylan-field.wav";')
    ts_code.append('')
    ts_code.append('export const FIGMA_SCENES: SceneMeta[] = [')
    
    for i, sf in enumerate(scene_frames):
        s = scenes_data[i]
        ts_code.append('  {')
        ts_code.append(f'    id: {s["config"]["id"]},')
        ts_code.append(f'    image: "{s["config"]["image"]}",')
        ts_code.append(f'    badge: "{s["config"]["badge"]}",')
        ts_code.append(f'    hud: "{s["config"]["hud"]}",')
        ts_code.append(f'    startFrame: {sf["startFrame"]},')
        ts_code.append(f'    endFrame: {sf["endFrame"]},')
        ts_code.append(f'    durationInFrames: {sf["durationInFrames"]},')
        ts_code.append('  },')
    ts_code.append('];')
    ts_code.append('')
    ts_code.append('export const FIGMA_PHRASES: PhraseCaption[] = [')
    
    for p in phrases:
        ts_code.append('  {')
        ts_code.append(f'    id: {p["id"]},')
        ts_code.append(f'    sceneId: {p["sceneId"]},')
        safe_text = p["text"].replace('"', '\\"')
        ts_code.append(f'    text: "{safe_text}",')
        ts_code.append(f'    startMs: {p["startMs"]},')
        ts_code.append(f'    endMs: {p["endMs"]},')
        ts_code.append('    words: [')
        for w in p["words"]:
            safe_w = w["word"].replace('"', '\\"')
            kw_flag = 'true' if w.get('isKeyword') else 'false'
            ts_code.append(f'      {{ word: "{safe_w}", startMs: {w["startMs"]}, endMs: {w["endMs"]}, isKeyword: {kw_flag} }},')
        ts_code.append('    ],')
        ts_code.append('  },')
    ts_code.append('];')
    ts_code.append('')

    target_ts_file = os.path.join('src', 'data', 'figmaSubtitles.ts')
    with open(target_ts_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_code))

    print(f"Successfully generated {target_ts_file}!")

if __name__ == '__main__':
    main()
