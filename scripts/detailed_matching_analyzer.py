# -*- coding: utf-8 -*-
"""
Script phân tích chi tiết từng câu thoại trong kịch bản và ánh xạ với 179 ảnh.
"""

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

meta = json.loads(Path("src/data/history_gaps_chapters.json").read_text(encoding="utf-8"))

for ch in meta:
    sec_id = ch["id"]
    print(f"\n=======================================================")
    print(f"=== {sec_id}: {ch['title']} ({len(ch['images'])} images) ===")
    print(f"=======================================================")
    paragraphs = [p.strip() for p in ch["text"].split("\n") if p.strip()]
    for p_idx, p in enumerate(paragraphs, 1):
        print(f"\n[Đoạn {p_idx}]: {p}")
