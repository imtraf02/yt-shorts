# -*- coding: utf-8 -*-
"""
Universal Script: Apply high-quality English subtitles (textEn) to any documentary Captions.ts
Bảo toàn 100% timestamps và từ ngữ tiếng Việt, đảm bảo giao diện CaptionPhrase có textEn?: string.
"""

import sys
import re
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

CAPTIONS_MAP = {
    "pharaoh": {
        "file": "src/data/pharaohCaptions.ts",
        "var_name": "PHARAOH_CAPTIONS",
        "title": "Tại sao Pharaoh ngừng xây Kim tự tháp?",
    },
    "maya": {
        "file": "src/data/mayaCaptions.ts",
        "var_name": "MAYA_CAPTIONS",
        "title": "Đế Chế Maya Sụp Đổ",
    },
    "dinosaur": {
        "file": "src/data/dinosaurCaptions.ts",
        "var_name": "DINOSAUR_CAPTIONS",
        "title": "Toàn Cảnh Khủng Long",
    },
    "history_gaps": {
        "file": "src/data/historyGapsCaptions.ts",
        "var_name": "HISTORY_GAPS_CAPTIONS",
        "title": "Những Khoảng Trống Lịch Sử",
    },
    "facebook_who_pays": {
        "file": "src/data/facebookWhoPaysCaptions.ts",
        "var_name": "FACEBOOK_WHO_PAYS_CAPTIONS",
        "title": "Facebook Không Thu Tiền Bạn",
    },
    "game_history": {
        "file": "src/data/game_historyCaptions.ts",
        "var_name": "GAME_HISTORY_CAPTIONS",
        "title": "Vì Sao Ai Cũng Chơi Game?",
    },
    "vacxin": {
        "file": "src/data/vacxinCaptions.ts",
        "var_name": "VACXIN_CAPTIONS",
        "title": "Vacxin: Từ Con Bò Đến Mũi Tiêm",
    },
    "binary": {
        "file": "src/data/binaryCaptions.ts",
        "var_name": "BINARY_CAPTIONS",
        "title": "Vì Sao Máy Tính Chỉ Hiểu Số 0 Và 1?",
    },
    "underground": {
        "file": "src/data/undergroundCaptions.ts",
        "var_name": "UNDERGROUND_CAPTIONS",
        "title": "Mạng Lưới Nấm Rừng",
    },
}

def apply_translations(slug: str, translations_dict: dict):
    if slug not in CAPTIONS_MAP:
        raise ValueError(f"Unknown slug: {slug}")

    cfg = CAPTIONS_MAP[slug]
    target_path = Path(cfg["file"])
    if not target_path.exists():
        raise FileNotFoundError(f"File not found: {target_path}")

    content = target_path.read_text(encoding="utf-8")

    # Match JSON dictionary in typescript
    match = re.search(r'export const \w+(?::\s*Record<[^>]+>)?\s*=\s*(\{[\s\S]*\});?\s*$', content)
    if not match:
        raise ValueError(f"Could not find captions JSON in {target_path}")

    raw_json = match.group(1).rstrip(";").strip()
    raw_json = re.sub(r",\s*([\}\]])", r"\1", raw_json)
    data = json.loads(raw_json)

    total_phrases = 0
    total_translated = 0

    for sec_id, phrases in data.items():
        en_list = translations_dict.get(sec_id, [])
        for idx, p in enumerate(phrases):
            total_phrases += 1
            if idx < len(en_list) and en_list[idx]:
                p["textEn"] = en_list[idx].strip()
                total_translated += 1
            elif "textEn" not in p:
                p["textEn"] = ""

    # Reconstruct clean TS file with bilingual CaptionPhrase interface
    var_name = cfg["var_name"]
    header = f"""// Auto-generated bilingual subtitles (VN + EN) for {cfg['title']}
export interface CaptionWord {{
  word: string;
  startMs: number;
  endMs: number;
}}

export interface CaptionPhrase {{
  id?: number;
  startMs: number;
  endMs: number;
  words: CaptionWord[];
  text?: string;
  textEn?: string;
}}

export const {var_name}: Record<string, CaptionPhrase[]> = {{"""

    lines = [header]
    sec_keys = list(data.keys())
    for i, sec_id in enumerate(sec_keys):
        phrases = data[sec_id]
        formatted_json = json.dumps(phrases, ensure_ascii=False, indent=2)
        comma = "," if i < len(sec_keys) - 1 else ""
        lines.append(f'  "{sec_id}": {formatted_json}{comma}')
    lines.append("};\n")

    target_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"🎉 [{slug.upper()}] Đã gắn phụ đề tiếng Anh cho {total_translated}/{total_phrases} cụm phụ đề -> {target_path}")
    return total_translated, total_phrases

if __name__ == "__main__":
    slug = sys.argv[1] if len(sys.argv) > 1 else None
    if not slug:
        print("Usage: python apply_documentary_english_subtitles.py <slug>")
        sys.exit(1)

    trans_file = Path(f"src/data/{slug}_translations_en.json")
    if not trans_file.exists():
        print(f"❌ Translation file not found: {trans_file}")
        sys.exit(1)

    translations = json.loads(trans_file.read_text(encoding="utf-8"))
    apply_translations(slug, translations)
