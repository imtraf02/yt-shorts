import json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_columbus_tokens.json', encoding='utf-8'))
print(f"Total tokens: {len(tokens)}")

scene_bounds = [
    (0, 12),     # 1
    (13, 31),    # 2 (ends with '—')
    (32, 50),    # 3
    (51, 74),    # 4
    (75, 90),    # 5
    (91, 115),   # 6
    (116, 132),  # 7
    (133, 178),  # 8 (includes '—' at 150)
    (179, 194),  # 9
    (195, 208),  # 10
    (209, 232),  # 11
    (233, 254),  # 12 (ends with '—')
    (255, 262),  # 13
    (263, 281),  # 14
    (282, 302),  # 15
    (303, 321),  # 16
    (322, 339),  # 17
    (340, 358),  # 18 (ends with '—')
    (359, 366),  # 19
    (367, 380),  # 20
]

for idx, (s, e) in enumerate(scene_bounds):
    scene_tokens = tokens[s:e+1]
    scene_text = " ".join([t['word'] for t in scene_tokens])
    start_ms = scene_tokens[0]['startMs']
    end_ms = scene_tokens[-1]['endMs']
    print(f"Scene {idx+1:02d}: [{s:3d}..{e:3d}] ({len(scene_tokens):2d} words) | {start_ms/1000:6.2f}s - {end_ms/1000:6.2f}s | {scene_text}")

assert scene_bounds[0][0] == 0
for i in range(len(scene_bounds)-1):
    assert scene_bounds[i][1] + 1 == scene_bounds[i+1][0], f"Gap between {i+1} and {i+2}"
assert scene_bounds[-1][1] == len(tokens) - 1, f"End mismatch: {scene_bounds[-1][1]} vs {len(tokens)-1}"
print("\nALL 20 SCENE BOUNDARIES ARE 100% CONTIGUOUS AND PERFECT!")
