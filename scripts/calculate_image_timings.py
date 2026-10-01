# -*- coding: utf-8 -*-
"""
Script phân tích và xác định chính xác thời điểm (frame) xuất hiện của từng ảnh
dựa trên câu thoại / từ khóa trong audio của từng phần.
"""

import sys
import json
import re
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đọc captions từ usWarEconomyCaptions.ts
with open("src/data/usWarEconomyCaptions.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Trích xuất json captions
start_idx = text.find("export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = ") + len("export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = ")
end_idx = text.rfind(";")
captions_json_str = text[start_idx:end_idx].strip()
captions_data = json.loads(captions_json_str)

def get_word_list(part_id):
    phrases = captions_data[part_id]
    all_words = []
    for p in phrases:
        for w in p["words"]:
            all_words.append(w)
    return all_words

from build_us_war_economy_tts import SECTIONS_DATA

# Đọc prompts
with open("scripts/full_image_prompts.txt", "r", encoding="utf-8") as f:
    prompt_text = f.read()

pattern = r"^(\d+)\.\s+(.*?)(?=\n\n\d+\.|\n\n---|\Z)"
matches = re.findall(pattern, prompt_text, re.DOTALL | re.MULTILINE)
prompt_dict = {}
for num, content in matches:
    clean = content.split(", 2D anime")[0].strip().replace("\n", " ")
    prompt_dict[int(num)] = clean

for sec in SECTIONS_DATA:
    part_id = sec["id"]
    paragraphs = [p.strip() for p in sec["text"].split("\n\n") if p.strip()]
    img_start, img_end = sec["image_range"]
    num_imgs = img_end - img_start + 1
    print(f"\n=== {part_id.upper()} ({num_imgs} images: {img_start} to {img_end}, {len(paragraphs)} paragraphs) ===")
    for i in range(img_start, img_end + 1):
        print(f"  Img {i}: {prompt_dict[i][:70]}...")

