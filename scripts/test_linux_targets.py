import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_linux_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

targets = [
    # Scene 1: ends around "chuyên nghiệp đâu"
    ('chuyên', 'nghiệp'),
    # Scene 2: ends around "tự học lập trình"
    ('lập', 'trình'),
    # Scene 3: ends around "nhu cầu của mình"
    ('của', 'mình'),
    # Scene 4: ends around "chỉ là sở thích"
    ('sở', 'thích'),
    # Scene 5: ends around "ở lại mãi mãi"
    ('mãi', 'mãi'),
    # Scene 6: ends around "cả thế giới số"
    ('giới', 'số'),
    # Scene 7: ends around "là lỗi thời"
    ('lỗi', 'thời'),
    # Scene 8: ends around "điều ngược lại"
    ('ngược', 'lại'),
    # Scene 9: ends around "điều bất ngờ nữa"
    ('ngờ', 'nữa'),
    # Scene 10: ends around "chỉ sau vài tuần"
    ('vài', 'tuần'),
    # Scene 11: ends around "theo chính mình"
    ('chính', 'mình'),
    # Scene 12: ends around "gây tranh cãi lớn"
    ('cãi', 'lớn'),
    # Scene 13: ends around "thay đổi cách cư xử"
    ('cư', 'xử'),
    # Scene 14: ends around "đến ngày nay"
    ('ngày', 'nay'),
    # Scene 15: ends around "Linus Torvalds"
    ('Linus', 'Torvalds'),
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
