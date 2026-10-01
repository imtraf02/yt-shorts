import json
import re
from pathlib import Path

content = Path("src/data/facebookWhoPaysCaptions.ts").read_text(encoding="utf-8")
prefix = "export const FACEBOOK_WHO_PAYS_CAPTIONS: Record<string, CaptionPhrase[]> = "
idx = content.find(prefix)
captions = json.loads(content[idx + len(prefix):].rstrip().rstrip(";"))

for part, phrases in captions.items():
    raw_path = Path(f"src/data/facebook_who_pays_captions_raw_{part}.json")
    if not raw_path.exists():
        continue
    raw = json.loads(raw_path.read_text(encoding="utf-8"))
    
    total_aligned = sum(len(p["words"]) for p in phrases)
    total_raw = len(raw)
    
    # Check max gap between consecutive phrases
    max_gap = 0
    for i in range(len(phrases) - 1):
        gap = phrases[i+1]["startMs"] - phrases[i]["endMs"]
        if gap > max_gap:
            max_gap = gap
            
    print(f"{part:<8}: Aligned words = {total_aligned:<4} | Raw Whisper tokens = {total_raw:<4} | Max phrase gap = {max_gap}ms")
