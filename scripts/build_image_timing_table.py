# -*- coding: utf-8 -*-
"""
Script xác định chính xác cue thoại và frame xuất hiện cho toàn bộ 94 ảnh.
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

def find_word_index(words, token_list, min_idx=0):
    tokens = [t.lower().strip(",.?!:;\"'") for t in token_list]
    for i in range(min_idx, len(words) - len(tokens) + 1):
        match = True
        for j, t in enumerate(tokens):
            w = words[i+j]["word"].lower().strip(",.?!:;\"'")
            if w != t:
                match = False
                break
        if match:
            return i
    # Thử 2 từ đầu
    if len(tokens) >= 2:
        for i in range(min_idx, len(words) - 1):
            w0 = words[i]["word"].lower().strip(",.?!:;\"'")
            w1 = words[i+1]["word"].lower().strip(",.?!:;\"'")
            if w0 == tokens[0] and w1 == tokens[1]:
                return i
    return -1

# Danh sách cue thoại chuẩn xác cho từng ảnh trong từng phần
CUES = {
    "part1": [
        (1, ["Trong", "hơn", "một", "trăm"]),      # Img 1: Ruined European city intro (0s)
        (2, ["Châu", "Âu", "sau", "hai"]),        # Img 2: Split screen ruins vs factory (14.8s)
        (3, ["Còn", "nước", "Mỹ", "thì"]),        # Img 3: Statue of Liberty & cargo ships (38.4s)
        (4, ["Và", "cổ", "phiếu", "của"]),        # Img 4: Stock ticker glowing green (48.9s)
        (5, ["Đây", "là", "trùng", "hợp"]),       # Img 5: World map red thread (53.8s)
        (6, ["Hôm", "nay", "mình", "sẽ"]),        # Img 6: Soldier in barren desert (64.6s)
        (7, ["Cái", "mình", "muốn", "làm"]),      # Img 7: Golden eagle emblem on document (72.2s)
        (8, ["Và", "để", "làm", "điều"]),         # Img 8: Artillery shell factory assembly (79.8s)
    ],
    "part2": [
        (9, ["Năm", "1914", "chiến", "tranh"]),   # Img 9: Wilson speech 1914 (0s)
        (10, ["Nghe", "thì", "rất", "đẹp"]),      # Img 10: New York streets 1914 (13.6s)
        (11, ["Nhưng", "khi", "cuộc", "chiến"]),  # Img 11: Muddy trenches Europe (38.2s)
        (12, ["Nước", "Anh", "đặt", "một"]),      # Img 12: Munitions factory Enfield (50.2s)
        (13, ["Cứ", "đơn", "hàng", "này"]),       # Img 13: Crates on cargo ship (58.5s)
        (14, ["Bạn", "cứ", "hình", "dung"]),      # Img 14: Rising bar chart gold coins (73.3s)
        (15, ["Hơn", "một", "nửa", "lượng"]),     # Img 15: British soldiers inspect rifles (89.6s)
        (16, ["Nhưng", "vũ", "khí", "chỉ"]),      # Img 16: Stern banker Wall Street (96.5s)
        (17, ["Tập", "đoàn", "ngân", "hàng"]),    # Img 17: Wall street bank building JP Morgan (102.4s)
        (18, ["Phố", "Wall", "chính", "thức"]),   # Img 18: Cargo ship Atlantic night (134.9s)
        (19, ["Nước", "Anh", "với", "sức"]),      # Img 19: British naval blockade (153.8s)
        (20, ["Khi", "nước", "Đức", "bắt"]),      # Img 20: Lusitania sinking (188.7s)
        (21, ["Một", "trong", "những", "công"]),  # Img 21: Bethlehem Steel mill (207.3s)
        (22, ["Công", "ty", "này", "sản"]),       # Img 22: Artillery shell line (213.7s)
        (23, ["Sau", "chiến", "tranh", "một"]),   # Img 23: Nye Committee senate (233.7s)
        (24, ["Là", "việc", "nước", "Mỹ"]),       # Img 24: New York world financial center (256.7s)
    ],
    "part3": [
        (25, ["Sau", "Thế", "chiến", "I"]),       # Img 25: Skeletal death book cover (0s)
        (26, ["Kết", "quả", "là", "giữa"]),       # Img 26: Capitol building Congress (28.7s)
        (27, ["Đó", "là", "chính", "sách"]),      # Img 27: Cash and carry cargo ship (55.2s)
        (28, ["Bạn", "thấy", "sự", "khôn"]),      # Img 28: Exchanging cash for rifles (84.2s)
        (29, ["Chủ", "yếu", "là", "nước"]),       # Img 29: British freighter rough Atlantic (118.4s)
        (30, ["Trong", "khi", "đó", "phe"]),      # Img 30: German U-boat periscope (124.3s)
        (31, ["Đến", "năm", "1941", "khi"]),      # Img 31: FDR fireside chat Lend-Lease (144.0s)
        (32, ["thiết", "bị", "quân", "sự"]),      # Img 32: Garden hose neighboring house fire (162.2s)
        (33, ["Chương", "trình", "này", "đã"]),   # Img 33: Aircraft factory (171.5s)
        (34, ["tạo", "ra", "hàng", "triệu"]),     # Img 34: Tanks lined up (176.6s)
        (35, ["Và", "khi", "Nhật", "Bản"]),       # Img 35: Pearl Harbor attack (184.2s)
        (36, ["Sau", "chiến", "tranh", "một"]),   # Img 36: Bombed Europe vs untouched US (201.9s)
        (37, ["đội", "ngũ", "công", "nhân"]),     # Img 37: Factory worker family prosperity (213.4s)
        (38, ["Đây", "là", "lúc", "nước"]),       # Img 38: NYSE stock exchange super power (218.6s)
        (39, ["Bài", "học", "rút", "ra"]),        # Img 39: World map crown shifting to NY (224.6s)
        (40, ["và", "để", "địa", "lý"]),          # Img 40: Shipyard warships (232.9s)
    ]
}

print("Checking part1, part2, part3 timings...")
for part_id in ["part1", "part2", "part3"]:
    words = get_part_words(part_id)
    cues = CUES[part_id]
    curr_idx = 0
    print(f"\n--- {part_id.upper()} ---")
    for img_num, tokens in cues:
        w_idx = find_word_index(words, tokens, curr_idx)
        if w_idx == -1:
            print(f"FAILED to find cue {tokens} for Img {img_num}")
        else:
            w = words[w_idx]
            frame = int(round((w["startMs"] / 1000) * 30))
            print(f"Img {img_num:2d} -> frame {frame:5d} ({w['startMs']/1000:6.2f}s) | '{' '.join(tokens)}'")
            curr_idx = w_idx + len(tokens)
