import json
with open('scripts/aligned_genghis_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

keywords = ['börte', '1206', 'cung', 'cừu', 'yam', 'yassa', 'kháng', '1227', 'chôn', '2003']
with open('scripts/timestamps_check.txt', 'w', encoding='utf-8') as out:
    for i, t in enumerate(tokens):
        txt = t['text']
        for kw in keywords:
            if kw in txt.lower():
                start_s = t['startMs'] / 1000
                end_s = t['endMs'] / 1000
                out.write(f"{i:3d}: {txt:15s} ({start_s:6.2f}s - {end_s:6.2f}s)\n")
print("Wrote scripts/timestamps_check.txt")
