import json
import re
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')

    with open('scripts/aligned_bitcoin_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    with open('scripts/bitcoin_script.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    print(f"Total script sentences: {len(lines)}")
    print(f"Total tokens: {len(tokens)}")

    # Scene metadata definitions for 22 scenes
    # Notice: Sentence 21 is split into Scene 21 and Scene 22
    scene_metas = [
        {"id": 1, "image": "01-bitcoin-scene.png", "badge": "🪙 TIỀN SỐ ĐẦU TIÊN THẾ GIỚI", "hud": "BITCOIN & ĐỊNH GIÁ NGHÌN TỶ"},
        {"id": 2, "image": "02-bitcoin-scene.png", "badge": "👤 BÍ ẨN SATOSHI NAKAMOTO", "hud": "DANH TÍNH CHƯA TỪNG LỘ DIỆN"},
        {"id": 3, "image": "03-bitcoin-scene.png", "badge": "💥 KHỦNG HOẢNG TÀI CHÍNH 2008", "hud": "NGÂN HÀNG SỤP ĐỔ HÀNG LOẠT"},
        {"id": 4, "image": "04-bitcoin-scene.png", "badge": "📄 BẢN MÔ TẢ 9 TRANG LỊCH SỬ", "hud": "31/10/2008: WHITEPAPER"},
        {"id": 5, "image": "05-bitcoin-scene.png", "badge": "🔗 CÔNG NGHỆ BLOCKCHAIN", "hud": "SỔ CÁI PHI TẬP TRUNG"},
        {"id": 6, "image": "06-bitcoin-scene.png", "badge": "⛏️ KHỐI KHỞI NGUYÊN (GENESIS BLOCK)", "hud": "03/01/2009: KHỞI NGUYÊN RA ĐỜI"},
        {"id": 7, "image": "07-bitcoin-scene.png", "badge": "📰 DÒNG TÍT BÁO THE TIMES", "hud": "LỜI NHẮN GỬI CỦA SATOSHI"},
        {"id": 8, "image": "08-bitcoin-scene.png", "badge": "⚡ GIAO DỊCH ĐẦU TIÊN CỦA BITCOIN", "hud": "GỬI TẶNG HAL FINNEY"},
        {"id": 9, "image": "09-bitcoin-scene.png", "badge": "🍕 10.000 BITCOIN MUA 2 PIZZA", "hud": "22/05/2010: GIAO DỊCH ĐẦU TIÊN"},
        {"id": 10, "image": "10-bitcoin-scene.png", "badge": "💸 BỮA ĂN ĐẮT NHẤT LỊCH SỬ", "hud": "TRỊ GIÁ HÀNG NGHÌN TỶ ĐỒNG"},
        {"id": 11, "image": "11-bitcoin-scene.png", "badge": "🎉 NGÀY PIZZA BITCOIN", "hud": "BITCOIN PIZZA DAY"},
        {"id": 12, "image": "12-bitcoin-scene.png", "badge": "🚪 SATOSHI BIẾN MẤT NĂM 2011", "hud": "TIN NHẮN CUỐI CÙNG"},
        {"id": 13, "image": "13-bitcoin-scene.png", "badge": "🔒 1 TRIỆU BITCOIN BẤT ĐỘNG", "hud": "KHO BÁU CHƯA TỪNG DI CHUYỂN"},
        {"id": 14, "image": "14-bitcoin-scene.png", "badge": "🕵️ MANH MỐI BÍ ẨN VỀ SATOSHI", "hud": "CHƯA TỪNG ĐƯỢC GIẢI MÃ"},
        {"id": 15, "image": "15-bitcoin-scene.png", "badge": "🔢 GIỚI HẠN 21 TRIỆU & HALVING", "hud": "GIẢM NỬA MỖI 4 NĂM"},
        {"id": 16, "image": "16-bitcoin-scene.png", "badge": "📈 CƠN SỐT VƯỢT $20.000", "hud": "TĂNG TRƯỞNG KỶ LỤC"},
        {"id": 17, "image": "17-bitcoin-scene.png", "badge": "📉 THẢM HỌA SÀN MT. GOX 2014", "hud": "HÀNG TRĂM NGHÌN COIN BIẾN MẤT"},
        {"id": 18, "image": "18-bitcoin-scene.png", "badge": "🔥 HỒI SINH TỪ TRO TÀN", "hud": "HÀNG TRĂM LẦN BỊ TUYÊN BỐ 'CHẾT'"},
        {"id": 19, "image": "19-bitcoin-scene.png", "badge": "🇸🇻 EL SALVADOR CÔNG NHẬN HỢP PHÁP", "hud": "ĐẠT MỐC $69.000 NĂM 2021"},
        {"id": 20, "image": "20-bitcoin-scene.png", "badge": "🏛️ ETF BITCOIN CHÍNH THỨC ĐƯỢC DUYỆT", "hud": "THÁNG 01/2024: VÀO PHỐ WALL"},
        {"id": 21, "image": "21-bitcoin-scene.png", "badge": "⚖️ VÀNG KỸ THUẬT SỐ HAY BONG BÓNG?", "hud": "TRANH CÃI KHÔNG HỒI KẾT"},
        {"id": 22, "image": "22-bitcoin-scene.png", "badge": "⚡ TIÊU THỤ ĐIỆN & TƯƠNG LAI", "hud": "KỶ NGUYÊN MỚI CỦA TIỀN TỆ"},
    ]

    KEYWORDS = {
        "bitcoin", "tiền", "số", "đầu", "tiên", "ngân", "hàng", "chính", "phủ", "định", "giá",
        "nghìn", "tỷ", "đô", "la", "satoshi", "nakamoto", "khủng", "hoảng", "tài", "sụp", "đổ",
        "cứu", "31", "10", "2008", "mật", "mã", "chín", "trang", "blockchain", "máy", "tính",
        "trung", "gian", "3", "1", "2009", "khởi", "nguyên", "times", "hal", "finney", "22",
        "5", "2010", "laszlo", "hanyecz", "10.000", "hai", "pizza", "triệu", "2011", "biến",
        "mất", "một", "21", "bốn", "năm", "nửa", "2013", "1.000", "2017", "20.000", "mt.",
        "gox", "chết", "2021", "salvador", "hợp", "pháp", "69.000", "2024", "etf", "chứng",
        "khoán", "vàng", "bong", "bóng", "khai", "thác", "điện"
    }

    # Slice tokens for 22 scenes
    # Sentences 1..20 go to scenes 1..20
    # Sentence 21 is sliced:
    #   Tokens 0..20 ("Dù vậy... đầu cơ,") -> Scene 21
    #   Tokens 21..30 ("và việc khai thác... nhiều điện.") -> Scene 22
    token_cursor = 0
    scene_tokens = []

    for i in range(20):
        swords = lines[i].split()
        s_toks = tokens[token_cursor : token_cursor + len(swords)]
        token_cursor += len(swords)
        scene_tokens.append(s_toks)

    # For sentence 21 (lines[20]):
    s21_words = lines[20].split()
    s21_toks = tokens[token_cursor : token_cursor + len(s21_words)]
    token_cursor += len(s21_words)

    # Split at token 21 ("và việc khai thác cũng tiêu tốn rất nhiều điện.")
    s21_part1 = s21_toks[:21] # "Dù vậy..." up to "đầu cơ,"
    s21_part2 = s21_toks[21:] # "và việc khai thác..." up to "nhiều điện."

    scene_tokens.append(s21_part1) # Scene 21
    scene_tokens.append(s21_part2) # Scene 22

    print(f"Total scenes to produce: {len(scene_tokens)}")

    fps = 30
    total_frames = 4140 # 138.000s (audio length 136.92s + tail hold)

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

    # Now create phrase captions: 4-6 words per chunk
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
        else:
            h = n_toks // 7
            chunk_sizes = [h] * 6 + [n_toks - 6 * h]

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
    ts_content = f"""// Auto-generated Subtitles and Scene Configuration for Bitcoin Short
// 22 Scenes matching 22 images and narration beats (Scene 21 & 22 paired from sentence 21)

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

export const BITCOIN_TOTAL_FRAMES = {total_frames};
export const BITCOIN_FPS = {fps};
export const BITCOIN_AUDIO_PATH = "audio/bitcoin.wav";

export const BITCOIN_SCENES: SceneMeta[] = {json.dumps(scenes_output, ensure_ascii=False, indent=2)};

export const BITCOIN_PHRASES: PhraseCaption[] = {json.dumps(phrases_output, ensure_ascii=False, indent=2)};
"""

    with open('src/data/bitcoinSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Written to src/data/bitcoinSubtitles.ts successfully!")

if __name__ == '__main__':
    main()
