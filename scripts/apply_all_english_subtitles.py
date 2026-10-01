# -*- coding: utf-8 -*-
"""
Apply English Subtitles to all 9 Documentaries.
"""
import sys
from pathlib import Path

# Add scripts directory to path
sys.path.append(str(Path(__file__).parent))
from apply_documentary_english_subtitles import apply_translations, CAPTIONS_MAP
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DOCS = [
    "underground",
    "pharaoh",
    "maya",
    "history_gaps",
    "facebook_who_pays",
    "game_history",
    "vacxin",
    "binary",
]

def main():
    print("=" * 60)
    print("🌐 APPLYING HIGH-QUALITY ENGLISH SUBTITLES TO ALL 8 DOCUMENTARIES")
    print("=" * 60)
    
    total_docs = 0
    total_phrases_all = 0
    
    for slug in DOCS:
        trans_file = Path(f"src/data/{slug}_translations_en.json")
        if not trans_file.exists():
            print(f"⚠️ [SKIP] {slug}: Missing {trans_file}")
            continue
        try:
            translations = json.loads(trans_file.read_text(encoding="utf-8"))
            applied, total = apply_translations(slug, translations)
            total_docs += 1
            total_phrases_all += applied
        except Exception as e:
            print(f"❌ Error applying subtitles to {slug}: {e}")
            
    print("=" * 60)
    print(f"✅ Successfully applied English subtitles across {total_docs}/9 documentaries ({total_phrases_all} phrases total)!")
    print("=" * 60)

if __name__ == "__main__":
    main()
