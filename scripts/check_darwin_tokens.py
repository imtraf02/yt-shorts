import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_darwin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

for i, t in enumerate(tokens):
    txt = t['text'].lower()
    if any(k in txt for k in ['công', 'wallace', 'alfred', 'hôn', 'hà', 'thập', 'beagle', 'rùa', 'cú', 'hội']):
        print(f"{i:3d}: {t['text']} ({t['startMs']}-{t['endMs']} ms)")
