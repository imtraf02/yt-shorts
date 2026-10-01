# -*- coding: utf-8 -*-
"""
Script tính toán chính xác frame bắt đầu của từng ảnh (imageStartFrames)
cho toàn bộ 7 phần (94 ảnh) của phim tài liệu USWarEconomyDocumentary.
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
    if len(tokens) >= 2:
        for i in range(min_idx, len(words) - 1):
            w0 = words[i]["word"].lower().strip(",.?!:;\"'")
            w1 = words[i+1]["word"].lower().strip(",.?!:;\"'")
            if w0 == tokens[0] and w1 == tokens[1]:
                return i
    return -1

# Định nghĩa các cue khớp chuẩn 100% với lời thoại thuyết minh Trúc Ly cho từng ảnh
CUES_BY_PART = {
    "part1": [
        (1, ["Trong", "hơn", "một", "trăm"]),      # Img 1: Ruined European city intro (0s)
        (2, ["Châu", "Âu", "sau", "hai"]),        # Img 2: Split screen ruins vs factory (14.4s)
        (3, ["Còn", "nước", "Mỹ", "thì"]),        # Img 3: Statue of Liberty & cargo ships (37.9s)
        (4, ["Và", "cổ", "phiếu", "của"]),        # Img 4: Stock ticker glowing green (48.5s)
        (5, ["Đây", "là", "trùng", "hợp"]),       # Img 5: World map red thread (53.3s)
        (6, ["Hôm", "nay", "mình", "sẽ"]),        # Img 6: Soldier in barren desert (64.3s)
        (7, ["Cái", "mình", "muốn", "làm"]),      # Img 7: Golden eagle emblem on document (72.0s)
        (8, ["Và", "để", "làm", "điều"]),         # Img 8: Artillery shell factory assembly (79.4s)
    ],
    "part2": [
        (9, ["Năm", "1914", "chiến", "tranh"]),   # Img 9: Wilson speech 1914 (0s)
        (10, ["Nghe", "thì", "rất", "đẹp"]),      # Img 10: New York streets 1914 (13.3s)
        (11, ["Nhưng", "khi", "cuộc", "chiến"]),  # Img 11: Muddy trenches Europe (38.2s)
        (12, ["Nước", "Anh", "đặt", "một"]),      # Img 12: Munitions factory Enfield (50.6s)
        (13, ["Cứ", "đơn", "hàng", "này"]),       # Img 13: Crates on cargo ship (59.5s)
        (14, ["Bạn", "cứ", "hình", "dung"]),      # Img 14: Rising bar chart gold coins (73.4s)
        (15, ["Hơn", "một", "nửa", "lượng"]),     # Img 15: British soldiers inspect rifles (90.1s)
        (16, ["Nhưng", "vũ", "khí", "chỉ"]),      # Img 16: Stern banker Wall Street (96.8s)
        (17, ["Tập", "đoàn", "ngân", "hàng"]),    # Img 17: Wall street bank building JP Morgan (102.1s)
        (18, ["Phố", "Wall", "chính", "thức"]),   # Img 18: Cargo ship Atlantic night (135.7s)
        (19, ["Nước", "Anh", "với", "sức"]),      # Img 19: British naval blockade (153.5s)
        (20, ["Khi", "nước", "Đức", "bắt"]),      # Img 20: Lusitania sinking (188.2s)
        (21, ["Một", "trong", "những", "công"]),  # Img 21: Bethlehem Steel mill (207.0s)
        (22, ["Công", "ty", "này", "sản"]),       # Img 22: Artillery shell line (213.3s)
        (23, ["Sau", "chiến", "tranh", "một"]),   # Img 23: Nye Committee senate (233.2s)
        (24, ["Là", "việc", "nước", "Mỹ"]),       # Img 24: New York world financial center (257.0s)
    ],
    "part3": [
        (25, ["Sau", "Thế", "chiến", "I"]),       # Img 25: Skeletal death book cover (0s)
        (26, ["Kết", "quả", "là", "giữa"]),       # Img 26: Capitol building Congress (27.6s)
        (27, ["Đó", "là", "chính", "sách"]),      # Img 27: Cash and carry cargo ship (55.2s)
        (28, ["Bạn", "thấy", "sự", "khôn"]),      # Img 28: Exchanging cash for rifles (84.2s)
        (29, ["Chủ", "yếu", "là", "nước"]),       # Img 29: British freighter rough Atlantic (118.9s)
        (30, ["Trong", "khi", "đó", "phe"]),      # Img 30: German U-boat periscope (124.0s)
        (31, ["Đến", "năm", "1941", "khi"]),      # Img 31: FDR fireside chat Lend-Lease (143.6s)
        (32, ["thiết", "bị", "quân", "sự"]),      # Img 32: Garden hose neighboring house fire (162.6s)
        (33, ["Chương", "trình", "này", "đã"]),   # Img 33: Aircraft factory (171.0s)
        (34, ["tạo", "ra", "hàng", "triệu"]),     # Img 34: Tanks lined up (177.9s)
        (35, ["Và", "khi", "Nhật", "Bản"]),       # Img 35: Pearl Harbor attack (185.0s)
        (36, ["Sau", "chiến", "tranh", "một"]),   # Img 36: Bombed Europe vs untouched US (201.4s)
        (37, ["đội", "ngũ", "công", "nhân"]),     # Img 37: Factory worker family prosperity (214.0s)
        (38, ["Đây", "là", "lúc", "nước"]),       # Img 38: NYSE stock exchange super power (219.0s)
        (39, ["Bài", "học", "rút", "ra"]),        # Img 39: World map crown shifting to NY (224.6s)
        (40, ["và", "để", "địa", "lý"]),          # Img 40: Shipyard warships (232.9s)
    ],
    "part4": [
        (41, ["Sau", "Thế", "chiến", "II"]),      # Img 41: Empty military base demobilization (0s)
        (42, ["Và", "đến", "khi", "chiến"]),      # Img 42: Korean War soldiers marching (22.2s)
        (43, ["Chỉ", "trong", "vài", "tháng"]),   # Img 43: Defense budget surge rising graph (37.7s)
        (44, ["Quốc", "hội", "Mỹ", "thông"]),     # Img 44: Defense Production Act 1950 steel furnace (57.4s)
        (45, ["thiết", "lập", "một", "hệ"]),      # Img 45: Truman government policy signing (65.9s)
        (46, ["Nói", "cách", "khác", "công"]),    # Img 46: Giant switch locked ON (101.9s)
        (47, ["Chi", "tiêu", "cho", "nghiên"]),   # Img 47: 1950s research lab jet blueprints (84.4s -> check order!)
        (48, ["một", "cuộc", "suy", "thoái"]),    # Img 48: Post-Korean war recession unpaid bills (135.5s)
        (49, ["tổ", "hợp", "công", "nghiệp"]),    # Img 49: Eisenhower farewell address 1961 (156.1s)
        (50, ["Eisenhower", "cảnh", "báo", "nước"]), # Img 50: General and businessman handshake (169.8s)
        (51, ["tại", "Việt", "Nam", "Cuộc"]),     # Img 51: Dense jungle warfare Vietnam (184.8s)
        (52, ["Đây", "không", "chỉ", "đơn"]),     # Img 52: Helicopters airfield Vietnam (191.3s)
        (53, ["Tổng", "thống", "Lyndon", "B"]),   # Img 53: Lyndon B Johnson Oval Office (206.1s)
        (54, ["rót", "hàng", "triệu", "đô"]),     # Img 54: Base logistics camp construction (213.9s)
        (55, ["tập", "đoàn", "dầu", "khí"]),      # Img 55: Halliburton oil refinery towers (221.1s)
        (56, ["tại", "chiến", "trường", "Việt"]), # Img 56: Weary soldier supply crate rain (225.6s)
        (57, ["tiền", "thân", "của", "một"]),     # Img 57: Logistics supply convoy trucks (226.8s)
        (58, ["cùng", "một", "cái", "tên"]),      # Img 58: Symbolic gears oil & rifle (235.2s)
    ],
    "part5": [
        (59, ["Trước", "khi", "đi", "đến"]),      # Img 59: TV broadcast control room CNN (0s)
        (60, ["Và", "đây", "cũng", "là"]),        # Img 60: Night sky Middle East anti-aircraft (15.8s)
        (61, ["Hình", "ảnh", "gây", "ấn"]),       # Img 61: Patriot missile launch desert (26.5s)
        (62, ["Tổng", "thống", "George", "H.W"]), # Img 62: Family gathered watching TV (34.1s)
        (63, ["công", "khai", "ca", "ngợi"]),     # Img 63: Bush press conference podium (36.8s)
        (64, ["các", "phân", "tích", "kỹ"]),      # Img 64: Technical radar tracking screen (38.9s)
        (65, ["Ngay", "sau", "cuộc", "chiến"]),   # Img 65: Arms trade show international buyers (52.7s)
        (66, ["Về", "quy", "mô", "nhân"]),        # Img 66: Military convoy tanks desert (60.5s)
        (67, ["Sau", "chiến", "tranh", "Ả"]),     # Img 67: Wealthy Middle Eastern office contract (86.0s)
        (68, ["Đây", "chính", "là", "lúc"]),      # Img 68: Fighter jet transform to dollar sign (102.8s)
    ],
    "part6": [
        (69, ["Sau", "sự", "kiện", "11"]),        # Img 69: Twin Towers smoke (14.2s - start 0s)
        (70, ["Đến", "năm", "2010", "ngân"]),     # Img 70: Pentagon aerial angle (29.2s)
        (71, ["kể", "từ", "khi", "cuộc"]),        # Img 71: Afghan mountain convoy (47.6s)
        (72, ["tổng", "chi", "tiêu", "của"]),     # Img 72: Pie chart stacked gold bars (50.4s)
        (73, ["phần", "lớn", "trong", "số"]),     # Img 73: 5 corporate skyscraper HQs (62.5s)
        (74, ["Nếu", "năm", "2001", "bạn"]),      # Img 74: 10x stock market rocket chart (80.7s)
        (75, ["Riêng", "Lockheed", "Martin", "tập"]), # Img 75: Fighter jet assembly factory (99.6s)
        (76, ["Nhưng", "ở", "Iraq", "mô"]),       # Img 76: Baghdad ruins smoke sunset (127.9s)
        (77, ["một", "đồng", "đô", "la"]),        # Img 77: Private contractor tactical gear SUV (134.6s)
        (78, ["việc", "dọn", "dẹp", "hậu"]),      # Img 78: Construction workers rebuild bridge (138.8s)
        (79, ["Halliburton", "và", "công", "ty"]),# Img 79: Corporate boardroom Iraq map (146.3s)
        (80, ["Ví", "dụ", "điển", "hình"]),       # Img 80: Split explosion vs reconstruction (141.1s)
        (81, ["KBR", "cung", "cấp", "mọi"]),      # Img 81: Supply trucks and fuel tankers (172.0s)
        (82, ["hợp", "đồng", "không", "qua"]),    # Img 82: Silhouetted figure signing contract (178.1s)
        (83, ["tái", "thiết", "ngành", "công"]),  # Img 83: Desert oil field pipeline (182.2s)
        (84, ["nhà", "tù", "tại", "căn"]),        # Img 84: Guantanamo Bay detention facility (185.8s)
        (85, ["Halliburton", "sau", "đó", "bị"]), # Img 85: Congressional hearing corporate witness (228.9s)
        (86, ["Nhưng", "dù", "con", "số"]),       # Img 86: Golden scales profit vs destruction (263.4s)
        (87, ["Còn", "ở", "Afghanistan", "quy"]), # Img 87: Afghanistan outpost soldiers & contractors (286.0s)
        (88, ["Đến", "năm", "2021", "khi"]),      # Img 88: Kabul airport chaotic evacuation 2021 (329.7s)
    ],
    "part7": [
        (89, ["Vậy", "đó", "Từ", "những"]),       # Img 89: Lit candle windowsill dawn (0s)
        (90, ["ở", "Iraq", "mô", "hình"]),        # Img 90: Timeline 1914 to present glowing thread (11.4s)
        (91, ["Câu", "hỏi", "mình", "muốn"]),     # Img 91: Hands holding scales of justice (15.3s)
        (92, ["liệu", "quốc", "gia", "đó"]),      # Img 92: Lone figure on hilltop sunrise (24.0s)
        (93, ["Bạn", "nghĩ", "sao", "Để"]),       # Img 93: American flag dramatic sky (27.0s)
        (94, ["like", "và", "subscribe", "để"]),  # Img 94: Planet Earth from space night lights (31.8s)
    ]
}

final_timings = {}

for part_id, cues in CUES_BY_PART.items():
    words = get_part_words(part_id)
    curr_idx = 0
    start_frames = []
    print(f"\n==================== {part_id.upper()} ====================")
    for i, (img_num, tokens) in enumerate(cues):
        if i == 0:
            frame = 0
            w_idx = 0
        else:
            w_idx = find_word_index(words, tokens, curr_idx)
            if w_idx == -1:
                print(f"FAILED to find cue {tokens} for Img {img_num}")
                frame = start_frames[-1] + 120 # fallback
            else:
                w = words[w_idx]
                frame = int(round((w["startMs"] / 1000) * 30))
                curr_idx = w_idx + 1
        start_frames.append(frame)
        print(f"  Img {img_num:2d} -> frame {frame:5d} ({frame/30:6.2f}s) | '{' '.join(tokens)}'")
    final_timings[part_id] = start_frames

# Lưu ra json để nạp vào usWarEconomyData.ts
with open("src/data/us_war_economy_image_timings.json", "w", encoding="utf-8") as f:
    json.dump(final_timings, f, indent=2, ensure_ascii=False)
print("\nSaved image timings to src/data/us_war_economy_image_timings.json")
