import json, sys
sys.stdout.reconfigure(encoding='utf-8')
tokens = json.load(open('scripts/aligned_columbus_tokens.json', encoding='utf-8'))
for i in range(275, 310):
    print(f"{i}: {tokens[i]['word']}")
