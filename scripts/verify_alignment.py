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

# Load historyGapsData.ts
data_content = Path('src/data/historyGapsData.ts').read_text(encoding='utf-8')
m = re.search(r'export const HISTORY_GAPS_CHAPTERS: HistoryGapsChapter\[\] = (\[.*?\]);', data_content, re.DOTALL)
chapters = json.loads(m.group(1))

# Load historyGapsCaptions.ts
cap_content = Path('src/data/historyGapsCaptions.ts').read_text(encoding='utf-8')
mc = re.search(r'export const HISTORY_GAPS_CAPTIONS: Record<string, CaptionPhrase\[\]> = ({.*?});', cap_content, re.DOTALL)
captions = json.loads(mc.group(1))

for ch in chapters:
    sec_id = ch['id']
    phrases = captions.get(sec_id, [])
    print(f"\n=======================================================")
    print(f"=== {sec_id}: {ch['title']} ({len(ch['images'])} images, total {ch['durationInFrames']} frames / {ch['durationInFrames']/30:.1f}s) ===")
    print(f"=======================================================")
    start_frames = ch.get('imageStartFrames', [])
    for idx, (img, desc, sf) in enumerate(zip(ch['images'], ch['imageDescriptions'], start_frames)):
        t_ms = (sf / 30.0) * 1000
        # find closest phrase or phrase containing t_ms
        matching_phrases = [p for p in phrases if p['startMs'] <= t_ms <= p['endMs']]
        if matching_phrases:
            text_spoken = ' '.join(w['word'] for w in matching_phrases[0]['words'])
        else:
            # find next phrase
            next_p = [p for p in phrases if p['startMs'] >= t_ms]
            if next_p:
                text_spoken = f"(next ~{int(next_p[0]['startMs'] - t_ms)}ms: " + ' '.join(w['word'] for w in next_p[0]['words']) + ")"
            else:
                prev_p = [p for p in phrases if p['endMs'] <= t_ms]
                text_spoken = f"(prev: " + ' '.join(w['word'] for w in prev_p[-1]['words']) + ")" if prev_p else "(none)"

        print(f"  Img #{idx+1:02d} [{sf:4d}f / {sf/30:5.1f}s] {Path(img).name}: {desc[:48]}... | Đang đọc: \"{text_spoken}\"")
