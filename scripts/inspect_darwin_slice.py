import json

with open('whisper_darwin_captions.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

with open('scripts/darwin_slice.txt', 'w', encoding='utf-8') as out:
    for i in range(280, 335):
        out.write(f"{i:3d}: {tokens[i]['text']} ({tokens[i]['startMs']}-{tokens[i]['endMs']} ms)\n")
