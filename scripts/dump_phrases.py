import json
import sys
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

slug = sys.argv[1] if len(sys.argv) > 1 else "game_history"
fpath = Path(f"src/data/{slug}_phrases_for_en.json")
if not fpath.exists():
    print(f"File not found: {fpath}")
    sys.exit(1)

data = json.loads(fpath.read_text(encoding="utf-8"))
for part, items in data.items():
    print(f"\n==================== {part} ({len(items)} phrases) ====================")
    for idx, it in enumerate(items):
        txt = it if isinstance(it, str) else it.get("textVn", it.get("text", ""))
        print(f"{idx:02d}: {txt}")
