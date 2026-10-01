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

cap_content = Path('src/data/historyGapsCaptions.ts').read_text(encoding='utf-8')
mc = re.search(r'export const HISTORY_GAPS_CAPTIONS: Record<string, CaptionPhrase\[\]> = ({.*?});', cap_content, re.DOTALL)
captions = json.loads(mc.group(1))

for part in ['part2', 'part3', 'part4', 'part5', 'part6', 'part7']:
    print(f"\n=======================================================")
    print(f"=== {part.upper()} PHRASES & TIMESTAMPS ===")
    print(f"=======================================================")
    phrases = captions[part]
    buf = []
    t_start = phrases[0]['startMs']
    for p in phrases:
        w_text = ' '.join(w['word'] for w in p['words'])
        buf.append(w_text)
        if len(' '.join(buf)) >= 100 or p == phrases[-1]:
            print(f"[{t_start/1000:6.2f}s - {p['endMs']/1000:6.2f}s] " + ' '.join(buf))
            buf = []
            t_start = p['endMs']
