# -*- coding: utf-8 -*-
"""
Script phân tích và đối soát chính xác 94 prompt ảnh với kịch bản lời thoại
để sinh ra bảng timing chính xác từng frame cho từng ảnh trong 7 phần.
"""

import sys
import json
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Đọc captions từ usWarEconomyCaptions.ts
with open("src/data/usWarEconomyCaptions.ts", "r", encoding="utf-8") as f:
    text = f.read()

start_idx = text.find("export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = ") + len("export const US_WAR_ECONOMY_CAPTIONS: Record<string, CaptionPhrase[]> = ")
end_idx = text.rfind(";")
captions_data = json.loads(text[start_idx:end_idx].strip())

def get_part_words(part_id):
    phrases = captions_data[part_id]
    words = []
    for p in phrases:
        for w in p["words"]:
            words.append(w)
    return words

def find_phrase_start_frame(part_id, search_term, min_word_idx=0):
    words = get_part_words(part_id)
    search_tokens = [w.lower().strip(",.?!:;\"'") for w in search_term.split()]
    
    for i in range(min_word_idx, len(words) - len(search_tokens) + 1):
        match = True
        for j, tok in enumerate(search_tokens):
            w_clean = words[i+j]["word"].lower().strip(",.?!:;\"'")
            if w_clean != tok:
                match = False
                break
        if match:
            frame = int(round((words[i]["startMs"] / 1000) * 30))
            return frame, i
            
    # Thử tìm 2 từ đầu nếu chuỗi dài
    if len(search_tokens) > 2:
        two_tokens = search_tokens[:2]
        for i in range(min_word_idx, len(words) - 1):
            w0 = words[i]["word"].lower().strip(",.?!:;\"'")
            w1 = words[i+1]["word"].lower().strip(",.?!:;\"'")
            if w0 == two_tokens[0] and w1 == two_tokens[1]:
                frame = int(round((words[i]["startMs"] / 1000) * 30))
                return frame, i
                
    return None, min_word_idx

print("Helper ready.")
