import json
import os
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    with open('scripts/aligned_linux_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    print(f"Total tokens loaded: {len(tokens)}")

    # 15 Scenes strictly aligned to the visual content and audio narration
    scene_configs = [
        {
            "id": 1,
            "image": "01-linux-scene.png",
            "badge": "🐧 NGƯỜI TẠO RA LINUX",
            "hud": "LINUS TORVALDS • LINUX",
            "end_token": ("nghiệp", "đâu"),
            "keywords": ["Linus", "Torvalds", "Linux", "hệ điều hành", "máy chủ", "internet", "Android", "siêu máy tính", "sở thích", "chuyên nghiệp"]
        },
        {
            "id": 2,
            "image": "02-linux-scene.png",
            "badge": "🕹️ CHIẾC COMMODORE VIC-20",
            "hud": "HELSINKI NĂM 1969",
            "end_token": ("lập", "trình"),
            "keywords": ["1969", "Helsinki", "Phần Lan", "Linus Pauling", "ông nội", "thống kê", "Commodore", "VIC-20", "tự học", "lập trình"]
        },
        {
            "id": 3,
            "image": "03-linux-scene.png",
            "badge": "💻 CỖ MÁY INTEL 80386",
            "hud": "BẤT MÃN VỚI MINIX",
            "end_token": ("của", "mình"),
            "keywords": ["1991", "Đại học Helsinki", "Intel 80386", "hệ điều hành", "Minix", "nhu cầu"]
        },
        {
            "id": 4,
            "image": "04-linux-scene.png",
            "badge": "📢 THÔNG BÁO LỊCH SỬ 25/8",
            "hud": "CHỈ LÀ SỞ THÍCH",
            "end_token": ("sở", "thích"),
            "keywords": ["nhân hệ điều hành", "25 tháng 8", "diễn đàn", "miễn phí", "sở thích"]
        },
        {
            "id": 5,
            "image": "05-linux-scene.png",
            "badge": "📁 CÁI TÊN BẤT NGỜ 'LINUX'",
            "hud": "TỪ FREAX THÀNH LINUX",
            "end_token": ("mãi", "mãi"),
            "keywords": ["Freax", "quản trị máy chủ", "thư mục", "Linux", "mãi mãi"]
        },
        {
            "id": 6,
            "image": "06-linux-scene.png",
            "badge": "🌍 SỨC MẠNH MÃ NGUỒN MỞ",
            "hud": "HÀNG NGHÌN LẬP TRÌNH VIÊN",
            "end_token": ("giới", "số"),
            "keywords": ["quyết định", "mã nguồn", "công khai", "đóng góp", "lập trình viên", "thế giới số"]
        },
        {
            "id": 7,
            "image": "07-linux-scene.png",
            "badge": "⚡ LỜI CHÊ CỦA CHA ĐẺ MINIX",
            "hud": "GS. ANDREW TANENBAUM",
            "end_token": ("lỗi", "thời"),
            "keywords": ["giáo sư", "Andrew Tanenbaum", "cha đẻ", "Minix", "công khai", "lỗi thời"]
        },
        {
            "id": 8,
            "image": "08-linux-scene.png",
            "badge": "🐧 LINH VẬT TUX VÀ CHIẾN THẮNG",
            "hud": "LỊCH SỬ CHỨNG MINH",
            "end_token": ("ngược", "lại"),
            "keywords": ["Lịch sử", "chứng minh", "ngược lại", "Tux"]
        },
        {
            "id": 9,
            "image": "09-linux-scene.png",
            "badge": "⚡ BƯỚC NGOẶT NĂM 2005",
            "hud": "ĐIỀU BẤT NGỜ TIẾP THEO",
            "end_token": ("ngờ", "nữa"),
            "keywords": ["2005", "bất ngờ"]
        },
        {
            "id": 10,
            "image": "10-linux-scene.png",
            "badge": "🔒 BỊ THU HỒI GIẤY PHÉP",
            "hud": "TỰ VIẾT BẢN ĐẦU TIÊN",
            "end_token": ("vài", "tuần"),
            "keywords": ["quản lý mã nguồn", "thu hồi", "giấy phép", "tự viết", "vài tuần"]
        },
        {
            "id": 11,
            "image": "11-linux-scene.png",
            "badge": "🌿 GIT RA ĐỜI THỐNG TRỊ THẾ GIỚI",
            "hud": "CÔNG CỤ CỦA MỌI CODER",
            "end_token": ("chính", "mình"),
            "keywords": ["Git", "lập trình viên", "hành tinh", "mỗi ngày", "tiếng lóng", "chính mình"]
        },
        {
            "id": 12,
            "image": "12-linux-scene.png",
            "badge": "✉️ NHỮNG EMAIL NẢY LỬA",
            "hud": "TÍNH CÁCH THẲNG THẮN",
            "end_token": ("cãi", "lớn"),
            "keywords": ["thẳng tính", "email", "chê bai", "nhân Linux", "tranh cãi"]
        },
        {
            "id": 13,
            "image": "13-linux-scene.png",
            "badge": "🛑 NĂM 2018: TẠM NGHỈ TỰ NHÌN LẠI",
            "hud": "THAY ĐỔI CÁCH CƯ XỬ",
            "end_token": ("cư", "xử"),
            "keywords": ["2018", "tạm nghỉ", "công khai", "thay đổi", "cách cư xử"]
        },
        {
            "id": 14,
            "image": "14-linux-scene.png",
            "badge": "💎 KHÔNG CHỌN LÀM TỶ PHÚ",
            "hud": "NGƯỜI GÌN GIỮ NHÂN LINUX",
            "end_token": ("ngày", "nay"),
            "keywords": ["không hề", "tỷ phú", "miễn phí", "người gìn giữ", "ngày nay"]
        },
        {
            "id": 15,
            "image": "15-linux-scene.png",
            "badge": "🌐 NỀN MÓNG CỦA INTERNET HIỆN ĐẠI",
            "hud": "LINUS TORVALDS",
            "end_token": ("Linus", "Torvalds"),
            "keywords": ["làm cho vui", "xây nên", "nền móng", "internet hiện đại", "Linus Torvalds"]
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

    TOTAL_FRAMES = 3570 # 119.00s @ 30fps (audio ends at 117.56s)
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
    ts_code.append('// Auto-generated Subtitles and Scene Configuration for Linus Torvalds (Linux) Short')
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
    ts_code.append(f'export const LINUX_TOTAL_FRAMES = {TOTAL_FRAMES};')
    ts_code.append('export const LINUX_FPS = 30;')
    ts_code.append('export const LINUX_AUDIO_PATH = "audio/linus-torvalds.wav";')
    ts_code.append('')
    ts_code.append('export const LINUX_SCENES: SceneMeta[] = [')
    
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
    ts_code.append('export const LINUX_PHRASES: PhraseCaption[] = [')
    
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

    target_ts_file = os.path.join('src', 'data', 'linuxSubtitles.ts')
    with open(target_ts_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_code))

    print(f"Successfully generated {target_ts_file}!")

if __name__ == '__main__':
    main()
