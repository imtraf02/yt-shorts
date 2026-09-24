import json

with open('scripts/aligned_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

from build_qin_scenes import all_phrases, scene_definitions

# Generate src/data/qinSubtitles.ts
ts_content = """export type SubtitleToken = {
  text: string;
  startMs: number;
  endMs: number;
};

export type SubtitlePhrase = {
  id: number;
  scene?: number;
  startMs: number;
  endMs: number;
  text: string;
  tokens: SubtitleToken[];
  highlightKeywords?: string[];
};

export const qinSubtitles: SubtitlePhrase[] = """

ts_content += json.dumps(all_phrases, ensure_ascii=False, indent=2)
ts_content += ";\n"

with open('src/data/qinSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/data/qinSubtitles.ts successfully!")

# Let's verify frame allocations
frame_splits = [
    ("SCENE_1_FRAMES", 176, "0.00s - 5.87s: Thống nhất Trung Hoa, đế chế 2000 năm"),
    ("SCENE_2_FRAMES", 156, "5.87s - 11.07s: Nỗi ám ảnh lớn nhất: cái chết"),
    ("SCENE_3_FRAMES", 126, "11.07s - 15.27s: Điên cuồng tìm kiếm thuốc trường sinh"),
    ("SCENE_4_FRAMES", 251, "15.27s - 23.63s: Đoàn thám hiểm ra khơi, không ai trở về"),
    ("SCENE_5_FRAMES", 301, "23.63s - 33.67s: Viên thuốc chứa thủy ngân lỏng lánh bạc"),
    ("SCENE_6_FRAMES", 200, "33.67s - 40.33s: Bị đầu độc tuổi 49, chết vì sợ chết"),
    ("SCENE_7_FRAMES", 299, "40.33s - 50.30s: 8000 tượng đất nung sơn màu rực rỡ"),
    ("SCENE_8_FRAMES", 88,  "50.30s - 53.23s: 2000 năm chôn vùi, màu sơn phai mờ"),
    ("SCENE_9_FRAMES", 184, "53.23s - 59.37s: Lăng mộ với sông suối thủy ngân lỏng"),
    ("SCENE_10_FRAMES", 290,"59.37s - 69.03s: Bẫy nỏ tự động, chưa dám khai quật"),
    ("SCENE_11_FRAMES", 342,"69.03s - 80.43s: Đốt sách chôn nho, thanh trừng tri thức"),
    ("SCENE_12_FRAMES", 227,"80.43s - 88.00s: Vạn Lý Trường Thành, Tần Thủy Hoàng"),
]

total = sum(item[1] for item in frame_splits)
print(f"Total composition frames: {total} (duration: {total/30:.2f}s)")
