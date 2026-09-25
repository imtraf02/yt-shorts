import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_figma_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

targets = [
    ('duyệt', 'web'),
    ('từ', 'nhỏ'),
    ('không', 'thể'),
    ('đồng', 'ý'),
    ('cá', 'nhân'),
    ('thay', 'thế'),
    ('nền', 'móng'),
    ('trên', 'máy'),
    ('cho', 'designer'),
    ('lại', 'nữa'),
    ('đô', 'la'),
    ('bị', 'hủy'),
    ('mức', 'nào'),
    ('ba', 'mươi'),
    ('Dylan', 'Field')
]

curr = 0
for idx, (w1, w2) in enumerate(targets):
    found = -1
    for i in range(curr, len(tokens)-1):
        c1 = tokens[i]['word'].strip('.,!?:;\"\'—- ').lower()
        c2 = tokens[i+1]['word'].strip('.,!?:;\"\'—- ').lower()
        if c1 == w1.lower() and c2 == w2.lower():
            found = i + 1
            break
    if idx == len(targets) - 1:
        found = len(tokens) - 1
    print(f"Target {idx+1:2d} ({w1} {w2}): found at {found} ({tokens[found]['word']} @ {tokens[found]['endMs']/1000:.2f}s)")
    curr = found + 1
