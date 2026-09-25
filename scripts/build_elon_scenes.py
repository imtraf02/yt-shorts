import json
import re
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')

    with open('scripts/aligned_elon_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    with open('scripts/elon_script.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    lines = [line.strip() for line in text.split('\n') if line.strip()]
    sentences = []
    for p in lines:
        sents = re.split(r'(?<=[.!?])\s+', p)
        for s in sents:
            if s.strip():
                sentences.append(s.strip())

    print(f"Total sentences: {len(sentences)}")

    # Scene metadata definitions for 27 scenes
    scene_metas = [
        {"id": 1, "image": "01-elon-musk-scene.png", "badge": "🚀 THIÊN TÀI ELON MUSK", "hud": "TESLA & SPACEX"},
        {"id": 2, "image": "02-elon-musk-scene.png", "badge": "⚡ BỜ VỰC PHÁ SẢN", "hud": "SUÝT MẤT TẤT CẢ"},
        {"id": 3, "image": "03-elon-musk-scene.png", "badge": "🌍 PRETORIA, NAM PHI 1971", "hud": "QUÊ HƯƠNG NAM PHI"},
        {"id": 4, "image": "04-elon-musk-scene.png", "badge": "📖 CẬU BÉ MÊ ĐỌC SÁCH", "hud": "BỊ BẠN BÈ BẮT NẠT"},
        {"id": 5, "image": "05-elon-musk-scene.png", "badge": "👾 TRÒ CHƠI BLASTAR $500", "hud": "12 TUỔI TỰ VIẾT GAME"},
        {"id": 6, "image": "06-elon-musk-scene.png", "badge": "✈️ ĐẾN CANADA & MỸ", "hud": "ĐẠI HỌC PENNSYLVANIA"},
        {"id": 7, "image": "07-elon-musk-scene.png", "badge": "💻 KHỞI NGHIỆP ZIP2 NĂM 1995", "hud": "CÙNG EM TRAI KIMBAL"},
        {"id": 8, "image": "08-elon-musk-scene.png", "badge": "💰 COMPAQ MUA LẠI $300 TRIỆU", "hud": "THẮNG LỢI ĐẦU ĐỜI"},
        {"id": 9, "image": "09-elon-musk-scene.png", "badge": "🏦 NGÂN HÀNG X.COM", "hud": "TIẾP TỤC ĐẦU TƯ TẤT CẢ"},
        {"id": 10, "image": "10-elon-musk-scene.png", "badge": "💳 SÁP NHẬP THÀNH PAYPAL", "hud": "EBAY MUA LẠI $1.5 TỶ"},
        {"id": 11, "image": "11-elon-musk-scene.png", "badge": "🚀 THÀNH LẬP SPACEX NĂM 2002", "hud": "CANH BẠC ĐIÊN RỒ"},
        {"id": 12, "image": "12-elon-musk-scene.png", "badge": "❌ NGÀNH HÀNG KHÔNG HOÀI NGHI", "hud": "BỊ COI LÀ HOANG TƯỞNG"},
        {"id": 13, "image": "13-elon-musk-scene.png", "badge": "⚡ ĐẦU TƯ TESLA & TRỞ THÀNH CEO", "hud": "CÁCH MẠNG XE ĐIỆN"},
        {"id": 14, "image": "14-elon-musk-scene.png", "badge": "🌪️ CƠN ÁC MỘNG NĂM 2008", "hud": "KHỦNG HOẢNG KÉP"},
        {"id": 15, "image": "15-elon-musk-scene.png", "badge": "💥 FALCON 1 THẤT BẠI 3 LẦN", "hud": "NỔ LIÊN TIẾP TRÊN TRỜI"},
        {"id": 16, "image": "16-elon-musk-scene.png", "badge": "📉 TESLA CẠN SẠCH TIỀN", "hud": "SÁT NGÀY PHÁT LƯƠNG"},
        {"id": 17, "image": "17-elon-musk-scene.png", "badge": "🎲 DỒN HẾT ĐỒNG XU CUỐI CÙNG", "hud": "ALL-IN VÀO HAI CÔNG TY"},
        {"id": 18, "image": "18-elon-musk-scene.png", "badge": "✨ PHÓNG LẦN 4 THÀNH CÔNG", "hud": "THÁNG 9 NĂM 2008 LỊCH SỬ"},
        {"id": 19, "image": "19-elon-musk-scene.png", "badge": "🛰️ HỢP ĐỒNG NASA $1.6 TỶ", "hud": "VƯỢT QUA KHỦNG HOẢNG"},
        {"id": 20, "image": "20-elon-musk-scene.png", "badge": "🧗 BIẾN BẤT KHẢ THI THÀNH CÓ THỂ", "hud": "TỪNG BƯỚC CHỨNG MINH"},
        {"id": 21, "image": "21-elon-musk-scene.png", "badge": "🎯 HẠ CÁNH FALCON 9 NĂM 2015", "hud": "TÊN LỬA TÁI SỬ DỤNG"},
        {"id": 22, "image": "22-elon-musk-scene.png", "badge": "🌌 TESLA ROADSTER VÀO VŨ TRỤ", "hud": "FALCON HEAVY 2018"},
        {"id": 23, "image": "23-elon-musk-scene.png", "badge": "🏭 NHÀ SẢN XUẤT XE ĐIỆN LỚN NHẤT", "hud": "KỶ LỤC CỦA TESLA"},
        {"id": 24, "image": "24-elon-musk-scene.png", "badge": "🐦 MUA TWITTER $44 TỶ ĐỔI TÊN X", "hud": "THƯƠNG VỤ GÂY BÃO NĂM 2022"},
        {"id": 25, "image": "25-elon-musk-scene.png", "badge": "⚖️ TRANH CÃI DỮ DỘI", "hud": "NGƯỜI KHEN KẺ CHÊ"},
        {"id": 26, "image": "26-elon-musk-scene.png", "badge": "🔍 NHÂN VẬT GÂY CHIA RẼ NHẤT", "hud": "SOI XÉT TỪNG PHÁT NGÔN"},
        {"id": 27, "image": "27-elon-musk-scene.png", "badge": "👑 HUYỀN THOẠI ELON MUSK", "hud": "CẢ THẾ GIỚI PHẢI BÀN TÁN"},
    ]

    KEYWORDS = {
        "musk", "tesla", "spacex", "xe", "điện", "tên", "lửa", "tái", "sử", "dụng", "thực", "tế",
        "phá", "sản", "mất", "sạch", "1971", "pretoria", "nam", "phi", "đọc", "sách", "bắt", "nạt",
        "12", "tuổi", "lập", "trình", "blastar", "500", "đô", "la", "17", "canada", "mỹ",
        "pennsylvania", "1995", "kimball", "zip2", "compaq", "300", "triệu", "x.com", "ngân", "hàng",
        "paypal", "2002", "ebay", "1,5", "tỷ", "1.5", "đặt", "cược", "điên", "rồ", "rẻ", "hơn",
        "ceo", "2008", "falcon", "1", "thất", "bại", "cạn", "tiền", "lương", "dồn", "hết",
        "thành", "công", "nasa", "hợp", "đồng", "1,6", "1.6", "khủng", "hoảng", "chứng", "minh",
        "2015", "hạ", "cánh", "9", "2018", "heavy", "roadster", "không", "gian", "lớn", "nhất",
        "2022", "twitter", "44", "x", "tranh", "cãi", "chia", "rẽ", "phát", "ngôn", "hai", "lần"
    }

    token_cursor = 0
    scenes_output = []
    fps = 30
    total_frames = 4245 # 141.5s (audio 140.52s + tail hold)

    current_frame = 0

    # First pass: collect sentence token slices
    sentence_tokens = []
    for s in sentences:
        swords = s.split()
        s_toks = tokens[token_cursor : token_cursor + len(swords)]
        token_cursor += len(swords)
        sentence_tokens.append(s_toks)

    # Frame boundaries
    for idx, (meta, s_toks) in enumerate(zip(scene_metas, sentence_tokens)):
        s_id = idx + 1
        if s_id == 1:
            start_frame = 0
        else:
            start_frame = scenes_output[-1]["endFrame"]

        if s_id == len(scene_metas):
            end_frame = total_frames
        else:
            next_start_ms = sentence_tokens[idx + 1][0]["startMs"]
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

    for s_idx, (meta, s_toks) in enumerate(zip(scenes_output, sentence_tokens)):
        # Break s_toks into chunks of 3-6 words, aiming for natural break
        n_toks = len(s_toks)
        
        # Determine number of chunks
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

    # Write TypeScript file
    ts_content = f"""// Auto-generated Subtitles and Scene Configuration for Elon Musk Short
// 27 Scenes matching exact 27 images and narration beats

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

export const ELON_TOTAL_FRAMES = {total_frames};
export const ELON_FPS = {fps};
export const ELON_AUDIO_PATH = "audio/elon-musk.wav";

export const ELON_SCENES: SceneMeta[] = {json.dumps(scenes_output, ensure_ascii=False, indent=2)};

export const ELON_PHRASES: PhraseCaption[] = {json.dumps(phrases_output, ensure_ascii=False, indent=2)};
"""

    with open('src/data/elonSubtitles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print("Written to src/data/elonSubtitles.ts")

if __name__ == '__main__':
    main()
