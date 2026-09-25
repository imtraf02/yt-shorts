import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
    caps = json.load(f)

# Let's inspect tokens around each transition:
scenes_text_markers = [
    # Scene 1: Starts at token 0 ("Đi lên field..."), Ends around "web."
    ("S1 -> S2", "web", "1991"),
    # Scene 2: Starts at "Ông sinh...", Ends around "từ nhỏ"
    ("S2 -> S3", "nhỏ", "Brown"),
    # Scene 3: Starts at "Khi học...", Ends around "không thể."
    ("S3 -> S4", "thể", "2012"),
    # Scene 4: Starts at "Năm 2012...", Ends around "đồng ý."
    ("S4 -> S5", "ý", "canh"),
    # Scene 5: Starts at "Đó là một canh bạc...", Ends around "cá nhân"
    ("S5 -> S6", "nhân", "không"),
    # Scene 6: Starts at "và không ai tin...", Ends around "thay thế."
    ("S6 -> S7", "thế", "bốn"),
    # Scene 7: Starts at "Hai người mất...", Ends around "nền móng."
    ("S7 -> S8", "móng", "Evan"),
    # Scene 8: Starts at "Evan viết...", Ends around "trên máy."
    ("S8 -> S9", "máy", "2016"),
    # Scene 9: Starts at "Đến năm 2016...", Ends around "designer."
    ("S9 -> S10", "designer", "Cả"),
    # Scene 10: Starts at "Cả đội...", Ends around "nữa."
    ("S10 -> S11", "nữa", "nhanh"),
    # Scene 11: Starts at "Figma lớn...", Ends around "đô la."
    ("S11 -> S12", "la", "Anh"),
    # Scene 12: Starts at "Nhưng các cơ quan...", Ends around "bị hủy."
    ("S12 -> S13", "hủy", "phí"),
    # Scene 13: Starts at "Adobe phải trả...", Ends around "mức nào."
    ("S13 -> S14", "nào", "2025"),
    # Scene 14: Starts at "Tháng 7 năm 2025...", Ends around "ba mươi."
    ("S14 -> S15", "mươi", "Người"),
]

print("Searching for markers...")
for idx, c in enumerate(caps):
    t = c['text'].strip()
    ms = c['startMs']
    # print all tokens with their text
    if any(k in t.lower() for k in ['web', '1991', 'nhỏ', 'brown', 'round', '2012', 'đồng', 'canh', 'tranh', 'nhân', 'móng', 'evan', '2016', 'designer', 'nữa', 'nhanh', 'hủy', 'hủi', 'nào', '2025', 'mươi', 'thanh', 'thánh']):
        print(f"[{idx:3d}] {ms/1000:6.2f}s: {t}")
