import json

with open('scripts/pharaoh_prompts_123.json', 'r', encoding='utf-8') as f:
    prompts = json.load(f)

for p in prompts:
    print(f"{p['index']:3d}: {p['prompt']}")
