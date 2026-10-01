# -*- coding: utf-8 -*-
"""
Helper script to extract Vietnamese phrases per chapter from any *Captions.ts file
and save to a clean JSON for translation.
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

def extract_phrases_from_ts(ts_path: Path):
    content = ts_path.read_text(encoding="utf-8")
    # Match the JSON dictionary after the export line
    match = re.search(r'export const \w+(?::\s*Record<[^>]+>)?\s*=\s*(\{[\s\S]*\});?\s*$', content)
    if not match:
        raise ValueError(f"Could not find captions JSON in {ts_path}")
    raw_json = match.group(1).rstrip(";").strip()
    data = json.loads(raw_json)
    
    result = {}
    for sec_id, phrases in data.items():
        result[sec_id] = []
        for p in phrases:
            text_vn = p.get("text", " ".join(w["word"] for w in p.get("words", []))).strip()
            result[sec_id].append({
                "textVn": text_vn,
                "textEn": p.get("textEn", "")
            })
    return result

if __name__ == "__main__":
    slug = sys.argv[1] if len(sys.argv) > 1 else "pharaoh"
    ts_map = {
        "pharaoh": "src/data/pharaohCaptions.ts",
        "maya": "src/data/mayaCaptions.ts",
        "dinosaur": "src/data/dinosaurCaptions.ts",
        "history_gaps": "src/data/historyGapsCaptions.ts",
        "facebook_who_pays": "src/data/facebookWhoPaysCaptions.ts",
        "game_history": "src/data/game_historyCaptions.ts",
        "vacxin": "src/data/vacxinCaptions.ts",
        "binary": "src/data/binaryCaptions.ts",
        "underground": "src/data/undergroundCaptions.ts",
    }
    target_ts = Path(ts_map[slug])
    if target_ts.exists():
        res = extract_phrases_from_ts(target_ts)
        out_json = Path(f"src/data/{slug}_phrases_for_en.json")
        out_json.write_text(json.dumps(res, indent=2, ensure_ascii=False), encoding="utf-8")
        total_p = sum(len(v) for v in res.values())
        print(f"✅ Extracted {total_p} phrases across {len(res)} chapters for {slug} -> {out_json}")
    else:
        print(f"❌ File not found: {target_ts}")
