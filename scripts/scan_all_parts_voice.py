# -*- coding: utf-8 -*-
import sys
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

for p in range(1, 8):
    sec_id = f"part{p}"
    raw_file = Path(f"src/data/history_gaps_captions_raw_{sec_id}.json")
    if not raw_file.exists():
        continue
    tokens = json.loads(raw_file.read_text(encoding="utf-8"))
    suspicious = []
    for i, t in enumerate(tokens):
        txt = t.get('text', '').strip()
        # Look for repeated single letters, weird symbols, or spell-outs
        if len(txt) == 1 and txt.isalpha() and txt.isupper():
            suspicious.append((t.get('startMs'), txt, tokens[max(0, i-2):min(len(tokens), i+3)]))
        elif txt in ['EE', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X']:
            suspicious.append((t.get('startMs'), txt, tokens[max(0, i-2):min(len(tokens), i+3)]))

    print(f"\n=== {sec_id} Suspicious tokens count: {len(suspicious)} ===")
    for sm, txt, ctx in suspicious:
        ctx_str = ' '.join(c.get('text', '').strip() for c in ctx)
        print(f"  [{sm/1000:6.1f}s] '{txt}' in context: \"{ctx_str}\"")
