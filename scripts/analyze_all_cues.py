# -*- coding: utf-8 -*-
import sys
import json
import re
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def normalize_text(text: str) -> str:
    t = text.lower().strip()
    t = re.sub(r'[.,!?;:\"“”\'…()—–-]', '', t)
    return t

# Kiểm tra các phần Part 1, 2, 3, 4, 6, 7
for sec_num in [1, 2, 3, 4, 6, 7]:
    sec_id = f"part{sec_num}"
    raw_path = Path(f"src/data/history_gaps_captions_raw_{sec_id}.json")
    if not raw_path.exists():
        continue
    tokens = json.loads(raw_path.read_text(encoding="utf-8"))
    
    meta_path = Path("src/data/history_gaps_chapters.json")
    chapters = json.loads(meta_path.read_text(encoding="utf-8"))
    ch = [c for c in chapters if c["id"] == sec_id][0]
    
    print(f"\n==================================================")
    print(f"=== {sec_id}: {ch['title']} ===")
    print(f"==================================================")
    
    for idx, (img, desc) in enumerate(zip(ch["images"], ch["image_descriptions"])):
        print(f"Img #{idx+1:02d} ({Path(img).name}): {desc}")
