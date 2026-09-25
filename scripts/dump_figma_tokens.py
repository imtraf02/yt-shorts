import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
    caps = json.load(f)

# Let's see all tokens with timestamps
print(f"Total tokens: {len(caps)}")
for i, c in enumerate(caps):
    print(f"[{i:3d}] {c['startMs']/1000:6.2f}s - {c['endMs']/1000:6.2f}s: {c['text'].strip()}")
