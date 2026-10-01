# -*- coding: utf-8 -*-
import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

slug = sys.argv[1] if len(sys.argv) > 1 else "pharaoh"
parts = sys.argv[2].split(",") if len(sys.argv) > 2 else None

p = Path(f"src/data/{slug}_phrases_for_en.json")
if not p.exists():
    print(f"Not found: {p}")
    sys.exit(1)

data = json.loads(p.read_text(encoding="utf-8"))
for sec, phrases in data.items():
    if parts and sec not in parts:
        continue
    print(f"\n=== {sec} ({len(phrases)} phrases) ===")
    for i, item in enumerate(phrases):
        print(f"[{i:02d}] {item['textVn']}")
