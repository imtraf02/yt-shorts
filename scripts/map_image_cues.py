# -*- coding: utf-8 -*-
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

def get_word_list(part_id):
    phrases = captions_data[part_id]
    all_words = []
    for p in phrases:
        for w in p["words"]:
            all_words.append(w)
    return all_words

def find_cue_start_ms(part_id, cue_text, start_search_idx=0):
    words = get_word_list(part_id)
    cue_tokens = [w.lower().strip(",.?!:;\"'") for w in cue_text.split() if w.strip()]
    if not cue_tokens:
        return 0, 0
    
    # Tìm chuỗi cue_tokens trong words
    for i in range(start_search_idx, len(words) - len(cue_tokens) + 1):
        match = True
        for j, ct in enumerate(cue_tokens):
            w_clean = words[i+j]["word"].lower().strip(",.?!:;\"'")
            if w_clean != ct:
                match = False
                break
        if match:
            return words[i]["startMs"], i
    
    # Nếu không khớp hoàn toàn, thử tìm 2 từ đầu
    first_two = cue_tokens[:2]
    for i in range(start_search_idx, len(words) - 1):
        w0 = words[i]["word"].lower().strip(",.?!:;\"'")
        w1 = words[i+1]["word"].lower().strip(",.?!:;\"'")
        if w0 == first_two[0] and (len(first_two) == 1 or w1 == first_two[1]):
            return words[i]["startMs"], i
            
    print(f"WARNING: Cue '{cue_text}' not found in {part_id}!")
    return -1, -1

# In ra toàn bộ câu của part1 với timestamp để xem
words_p1 = get_word_list("part1")
full_p1_text = " ".join(w["word"] for w in words_p1)
print("Part 1 full text length:", len(words_p1))
