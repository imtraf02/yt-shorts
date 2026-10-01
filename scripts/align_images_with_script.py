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

# 1. Load captions to get word timestamps
with open("src/data/usWarEconomyCaptions.ts", "r", encoding="utf-8") as f:
    raw_ts = f.read()

# Extract the JSON object from the typescript file
json_str = raw_ts[raw_ts.find("{"):raw_ts.rfind("}") + 1]
captions_data = json.loads(json_str)

# 2. Load sections data from build_us_war_economy_tts.py
from build_us_war_economy_tts import SECTIONS_DATA

print("Loaded captions for parts:", list(captions_data.keys()))
for sec in SECTIONS_DATA:
    part_id = sec["id"]
    phrases = captions_data[part_id]
    total_words = sum(len(p["words"]) for p in phrases)
    last_end_ms = phrases[-1]["endMs"] if phrases else 0
    print(f"{part_id}: {total_words} words, duration ~{last_end_ms/1000:.1f}s, {sec['image_range']}")
