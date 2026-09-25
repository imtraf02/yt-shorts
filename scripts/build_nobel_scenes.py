import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_nobel_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# The 20 segment start words / phrases:
scenes_def = [
    {"id": 1, "image": "01-alfred-nobel-scene.png", "first": "Alfred", "last": "Nobel."},
    {"id": 2, "image": "02-alfred-nobel-scene.png", "first": "Nhưng", "last": "sống."},
    {"id": 3, "image": "03-alfred-nobel-scene.png", "first": "Chuyện", "last": "ông."},
    {"id": 4, "image": "04-alfred-nobel-scene.png", "first": "Tiêu", "last": "—"},
    {"id": 5, "image": "05-alfred-nobel-scene.png", "first": "ám", "last": "dynamite,"},
    {"id": 6, "image": "06-alfred-nobel-scene.png", "first": "thứ", "last": "mỏ."},
    {"id": 7, "image": "07-alfred-nobel-scene.png", "first": "Đọc", "last": "diệt."},
    {"id": 8, "image": "08-alfred-nobel-scene.png", "first": "Ông", "last": "—"},
    {"id": 9, "image": "09-alfred-nobel-scene.png", "first": "và", "last": "đó."},
    {"id": 10, "image": "10-alfred-nobel-scene.png", "first": "Nhưng", "last": "loạt,"},
    {"id": 11, "image": "11-alfred-nobel-scene.png", "first": "rồi", "last": "giới."},
    {"id": 12, "image": "12-alfred-nobel-scene.png", "first": "Nói", "last": "nổ."},
    {"id": 13, "image": "13-alfred-nobel-scene.png", "first": "Về", "last": "cái,",
    },
    {"id": 14, "image": "14-alfred-nobel-scene.png", "first": "và", "last": "hội."},
    {"id": 15, "image": "15-alfred-nobel-scene.png", "first": "Ông", "last": "giới',"},
    {"id": 16, "image": "16-alfred-nobel-scene.png", "first": "dù", "last": "khác:"},
    {"id": 17, "image": "17-alfred-nobel-scene.png", "first": "giải", "last": "khác."},
    {"id": 18, "image": "18-alfred-nobel-scene.png", "first": "Có", "last": "đó."},
    {"id": 19, "image": "19-alfred-nobel-scene.png", "first": "Người", "last": "—"},
    {"id": 20, "image": "20-alfred-nobel-scene.png", "first": "đó", "last": "Nobel."},
]

curr_idx = 0
results = []

for sc in scenes_def:
    # find where this scene starts and ends
    start_token = None
    end_token = None
    
    # search from curr_idx
    target_first = sc["first"].lower()
    target_last = sc["last"].lower()
    
    # find start
    while curr_idx < len(tokens):
        w = tokens[curr_idx]['word'].lower().strip()
        if w.startswith(target_first):
            start_token = curr_idx
            break
        curr_idx += 1
        
    # find end
    while curr_idx < len(tokens):
        w = tokens[curr_idx]['word'].lower().strip()
        if target_last in w or w.endswith(target_last):
            end_token = curr_idx
            curr_idx += 1
            break
        curr_idx += 1
        
    s_ms = tokens[start_token]['startMs']
    e_ms = tokens[end_token]['endMs']
    text_slice = ' '.join(tokens[i]['word'] for i in range(start_token, end_token + 1))
    
    results.append({
        "id": sc["id"],
        "image": sc["image"],
        "startToken": start_token,
        "endToken": end_token,
        "tokenCount": end_token - start_token + 1,
        "startMs": s_ms,
        "endMs": e_ms,
        "startFrame": round(s_ms * 30 / 1000),
        "endFrame": round(e_ms * 30 / 1000),
        "text": text_slice
    })

print(f"Total matched scenes: {len(results)}")
for r in results:
    print(f"Scene {r['id']:02d}: [{r['startMs']}ms -> {r['endMs']}ms] ({r['startFrame']}f -> {r['endFrame']}f) tokens={r['tokenCount']}")
    print(f"   Text: {r['text'][:80]}...")

with open('scripts/nobel_scenes.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
