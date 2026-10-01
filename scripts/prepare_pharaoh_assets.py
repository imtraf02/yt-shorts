# -*- coding: utf-8 -*-
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/pharaoh_raw_prompt.txt', 'r', encoding='utf-8') as f:
    full_text = f.read()

# 1. Tách script và prompts
note_split = full_text.find('GHI CHÚ CHO NGƯỜI DỰNG VIDEO')
if note_split != -1:
    script_part = full_text[:note_split].strip()
else:
    prompt_split = full_text.find('PHẦN 1 — MỞ BÀI (8')
    script_part = full_text[:prompt_split].strip()

prompt_split = full_text.find('PHẦN 1 — MỞ BÀI (8')
prompts_part = full_text[prompt_split:].strip()

# 2. Parse 14 sections
header_matches = list(re.finditer(r'(?:##\s*)?PHẦN\s+(\d+)\s*—\s*([^\n\r]+)', script_part))
sections = []
for i, m in enumerate(header_matches):
    num = int(m.group(1))
    title = m.group(2).strip()
    s_idx = m.end()
    e_idx = header_matches[i+1].start() if i+1 < len(header_matches) else len(script_part)
    body = script_part[s_idx:e_idx].strip()
    body = re.sub(r'^\s*---\s*$', '', body, flags=re.MULTILINE).strip()
    sections.append({
        'num': num,
        'title': title,
        'body': body,
        'words': len(body.split())
    })

print(f"✅ Đã parse {len(sections)} sections kịch bản:")
for s in sections:
    print(f"   Phần {s['num']}: {s['title']} ({s['words']} từ)")

with open('scripts/pharaoh_parsed_sections.json', 'w', encoding='utf-8') as f:
    json.dump(sections, f, ensure_ascii=False, indent=2)

print("✅ Đã lưu vào scripts/pharaoh_parsed_sections.json")
