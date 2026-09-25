import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('whisper_figma_captions.json', 'r', encoding='utf-8') as f:
    caps = json.load(f)

# Inspect exact tokens around each boundary:
boundaries = [
    (60, 68),   # S1 -> S2 (around web. and Ông sinh...)
    (84, 91),   # S2 -> S3 (around từ nhỏ. and Khi học...)
    (140, 149), # S3 -> S4 (around không thể. and Năm 2012...)
    (175, 185), # S4 -> S5 (around đồng ý. and Đó là...)
    (204, 213), # S5 -> S6 (around cá nhân and và không ai tin...)
    (218, 225), # S6 -> S7 (around thay thế. and Hai người mất...)
    (228, 235), # S7 -> S8 (around nền móng. and Evan viết...)
    (259, 267), # S8 -> S9 (around trên máy. and Đến năm 2016...)
    (298, 305), # S9 -> S10 (around designer. and Cả đội...)
    (308, 316), # S10 -> S11 (around lại nữa. and Figma lớn...)
    (330, 338), # S11 -> S12 (around đô la. and Nhưng các cơ quan...)
    (352, 360), # S12 -> S13 (around bị hủy. and Adobe phải trả...)
    (384, 393), # S13 -> S14 (around mức nào. and Tháng 7 năm 2025...)
    (424, 432), # S14 -> S15 (around ngoài ba mươi. and Người thanh niên...)
]

for b_start, b_end in boundaries:
    print(f"\n--- Range [{b_start}:{b_end}] ---")
    for i in range(b_start, min(b_end, len(caps))):
        c = caps[i]
        print(f"  [{i:3d}] {c['startMs']/1000:6.2f}s - {c['endMs']/1000:6.2f}s: {c['text'].strip()}")
