# -*- coding: utf-8 -*-
import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

p_vn = Path("src/data/pharaoh_phrases_for_en.json")
p_en = Path("src/data/pharaoh_translations_en.json")

d_vn = json.loads(p_vn.read_text(encoding="utf-8"))
d_en = json.loads(p_en.read_text(encoding="utf-8"))

for sec, vn_list in d_vn.items():
    en_list = d_en.get(sec, [])
    diff = len(vn_list) - len(en_list)
    if diff != 0:
        print(f"Sec {sec}: VN={len(vn_list)} vs EN={len(en_list)} (diff: {diff})")
        for i in range(max(len(vn_list), len(en_list))):
            v = vn_list[i]["textVn"] if i < len(vn_list) else "---"
            e = en_list[i] if i < len(en_list) else "---"
            print(f"  [{i:02d}] VN: {v[:40]} | EN: {e[:40]}")
