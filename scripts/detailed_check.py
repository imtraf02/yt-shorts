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

data_content = Path('src/data/historyGapsData.ts').read_text(encoding='utf-8')
m = re.search(r'export const HISTORY_GAPS_CHAPTERS: HistoryGapsChapter\[\] = (\[.*?\]);', data_content, re.DOTALL)
chapters = json.loads(m.group(1))

cap_content = Path('src/data/historyGapsCaptions.ts').read_text(encoding='utf-8')
mc = re.search(r'export const HISTORY_GAPS_CAPTIONS: Record<string, CaptionPhrase\[\]> = ({.*?});', cap_content, re.DOTALL)
captions = json.loads(mc.group(1))

for ch in chapters:
    sec_id = ch['id']
    phrases = captions.get(sec_id, [])
    start_frames = ch.get('imageStartFrames', [])
    images = ch['images']
    descs = ch['imageDescriptions']
    print(f"\n=======================================================")
    print(f"=== CHAPTER {sec_id}: {ch['title']} ({len(images)} images) ===")
    print(f"=======================================================")
    for i in range(len(images)):
        sf = start_frames[i]
        ef = start_frames[i+1] if i + 1 < len(start_frames) else ch['durationInFrames']
        st_ms = (sf / 30.0) * 1000
        et_ms = (ef / 30.0) * 1000
        matched = [p for p in phrases if not (p['endMs'] < st_ms or p['startMs'] > et_ms)]
        full_text = ' '.join(' '.join(w['word'] for w in p['words']) for p in matched)
        img_name = Path(images[i]).name
        print(f"[{i+1:02d}] {img_name} ({sf/30:5.1f}s - {ef/30:5.1f}s | {sf}f-{ef}f): {descs[i][:55]}...")
        print(f"     Audio: \"{full_text}\"")
