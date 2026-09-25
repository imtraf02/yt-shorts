import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
    caps = json.load(f)

with open('scripts/figma_script.txt', 'r', encoding='utf-8') as f:
    paragraphs = [p.strip() for p in f.read().split('\n\n') if p.strip()]

print(f"Total script paragraphs: {len(paragraphs)}")
print(f"Total whisper tokens: {len(caps)}")

# Let's inspect whisper text stream
whisper_words = [c['text'].strip() for c in caps]

# Find matches for paragraph beginnings and endings in whisper stream
for p_idx, p in enumerate(paragraphs):
    p_words = p.split()
    print(f"\n--- Paragraph {p_idx+1} ({len(p_words)} words) ---")
    print(f"Start: {' '.join(p_words[:6])}")
    print(f"End:   {' '.join(p_words[-6:])}")
