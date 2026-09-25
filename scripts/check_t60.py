import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/aligned_linux_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

for i in range(58, 66):
    print(f"[{i}] {tokens[i]['word']} @ {tokens[i]['startMs']}-{tokens[i]['endMs']}")
