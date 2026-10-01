import sys
import json
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


with open('src/data/pharaohData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'export const PHARAOH_CHAPTERS: PharaohChapter\[\] = (\[[\s\S]*?\]);', text)
chapters = json.loads(m.group(1))

for ch in chapters:
    sf = ch['startFrame']
    ef = sf + ch['durationInFrames'] - 1
    dur = ch['durationInFrames']
    print(f"{ch['id']:6s} (p{ch['chapterNumber']:2d}): {sf:5d} -> {ef:5d} ({dur:5d} frames) - {ch['title']}")

total = sum(c['durationInFrames'] for c in chapters)
print(f"TOTAL: {total} frames")
