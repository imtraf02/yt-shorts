import json

with open('whisper_busy_captions.json', 'r', encoding='utf-8') as f:
    captions = json.load(f)

with open('scripts/tokens_busy_dump.txt', 'w', encoding='utf-8') as out:
    for idx, c in enumerate(captions):
        out.write(f"{idx:3d}: {c['startMs']}-{c['endMs']} {c['text']}\n")

print(f"Dumped {len(captions)} tokens to scripts/tokens_busy_dump.txt")
