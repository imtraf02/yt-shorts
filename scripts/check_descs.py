# -*- coding: utf-8 -*-
import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

with open("src/data/usWarEconomyData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Extract array inside imageDescriptions
desc_blocks = re.findall(r'imageDescriptions:\s*\[(.*?)\]', text, re.DOTALL)
all_descs = []
for b in desc_blocks:
    items = re.findall(r'"([^"]+)"', b)
    all_descs.extend(items)

print(f"Total extracted descriptions: {len(all_descs)}")
all_descs.sort(key=len, reverse=True)
for d in all_descs[:15]:
    print(f"Len {len(d):2d}: {d}")
