# -*- coding: utf-8 -*-
import json
import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Let's inspect each chapter's text vs prompts
from debug_script_and_prompts import PROMPTS

meta = json.load(open("src/data/facebook_who_pays_chapters.json", encoding="utf-8"))

for ch in meta:
    print(f"\n=======================================================")
    print(f"CHAPTER: {ch['id']} ({ch['title']})")
    print(f"IMAGES RANGE: {ch['img_start']} to {ch['img_end']}")
    print(f"=======================================================")
    print("PROMPTS IN THIS SECTION:")
    for i in range(ch['img_start'], ch['img_end'] + 1):
        print(f"  [{i:03d}]: {PROMPTS[i][:90]}...")
    print("\nPARAGRAPHS IN THIS SECTION:")
    for p_idx, p in enumerate(ch['paragraphs']):
        print(f"  P{p_idx+1}: {p}")
