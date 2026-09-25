import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_columbus_tokens.json', encoding='utf-8'))
print(f"Loaded {len(tokens)} tokens.")

sentences = [
    "Christopher Columbus nổi tiếng là người 'phát hiện ra Châu Mỹ' năm 1492.",
    "Nhưng sự thật thú vị là: ông chưa từng biết mình đã tìm ra một lục địa mới —",
    "và có hàng triệu người đã sống ở đó từ hàng ngàn năm trước khi ông đặt chân tới.",
    "Đúng vậy, cho đến tận lúc qua đời, Columbus vẫn đinh ninh rằng mình đã đến được Ấn Độ hoặc vùng ven châu Á,",
    "không hề nhận ra ông đã đặt chân lên một vùng đất hoàn toàn khác biệt.",
    "Đó cũng là lý do vì sao người bản địa ở châu Mỹ bị gọi nhầm là 'người Indian' suốt hàng trăm năm sau đó.",
    "Chuyến hải trình huyền thoại của ông thực ra dựa trên một phép tính sai be bét.",
    "Columbus tính toán khoảng cách từ châu Âu đến châu Á ngắn hơn thực tế rất nhiều — nếu không có châu Mỹ tình cờ nằm chắn giữa đường, đoàn thủy thủ của ông gần như chắc chắn sẽ chết đói trên biển trước khi đến nơi.",
    "Về tên gọi 'châu Mỹ', trớ trêu thay, nó không hề được đặt theo tên Columbus.",
    "Cái tên này lấy từ Amerigo Vespucci, một nhà thám hiểm người Ý khác,",
    "người đầu tiên nhận ra và công bố rằng đây thực sự là một lục địa hoàn toàn mới, chứ không phải châu Á.",
    "Người tính toán sai lại nổi tiếng hơn, còn người tính đúng lại được đặt tên cho cả lục địa —",
    "lịch sử đôi khi trớ trêu như vậy.",
    "Một chi tiết ít người biết: Columbus chưa từng đặt chân lên lãnh thổ ngày nay là nước Mỹ.",
    "Ông chỉ đến các đảo vùng Caribbean và Trung Mỹ, chưa từng đi xa đến lục địa Bắc Mỹ thực sự.",
    "Và cuối đời, dù được xem là người mở đường cho làn sóng thám hiểm châu Âu sau này,",
    "Columbus lại qua đời trong cảnh gần như bị lãng quên và không được công nhận đầy đủ,",
    "vẫn tin chắc đến hơi thở cuối cùng rằng mình đã tìm ra con đường tới châu Á —",
    "trong khi cả thế giới dần nhận ra",
    "ông đã tìm ra một điều gì đó lớn lao hơn thế rất nhiều."
]

badges = [
    "🧭 CUỘC HẢI TRÌNH LỊCH SỬ NĂM 1492",
    "🗺️ BÍ MẬT KHÔNG NGỜ VỀ LỤC ĐỊA MỚI",
    "🏕️ HÀNG TRIỆU DÂN BẢN ĐỊA ĐÃ Ở ĐÓ",
    "⚓ TƯỞNG NHẦM LÀ ẤN ĐỘ TỚI CUỐI ĐỜI",
    "🏝️ MỘT THẾ GIỚI HOÀN TOÀN KHÁC BIỆT",
    "🏹 NGUỒN GỐC TÊN GỌI 'NGƯỜI INDIAN'",
    "📐 PHÉP TÍNH SAI BE BÉT CỦA COLUMBUS",
    "💀 SUÝT CHẾT ĐÓI GIỮA ĐẠI TÂY DƯƠNG",
    "📜 NGHỊCH LÝ CỦA TÊN GỌI 'CHÂU MỸ'",
    "🧭 NHÀ THÁM HIỂM AMERIGO VESPUCCI",
    "🌐 NGƯỜI ĐẦU TIÊN CÔNG BỐ LỤC ĐỊA MỚI",
    "⚖️ KẺ TÍNH SAI NỔI DANH HƠN KẺ ĐÚNG",
    "⏳ SỰ TRỚ TRÊU BẤT NGỜ CỦA LỊCH SỬ",
    "🚫 CHƯA TỪNG ĐẶT CHÂN LÊN ĐẤT MỸ",
    "🌴 CHỈ ĐẾN CÁC ĐẢO VÙNG CARIBBEAN",
    "⛵ MỞ ĐƯỜNG CHO LÀN SÓNG THÁM HIỂM",
    "🕯️ CUỐI ĐỜI BỊ LÃNG QUÊN & CÔ ĐỘC",
    "🌊 NIỀM TIN CỐ CHẤP ĐẾN HƠI THỞ CUỐI",
    "🌍 CẢ THẾ GIỚI DẦN DẦN THỨC TỈNH",
    "⭐ DI SẢN VĨ ĐẠI NGOÀI DỰ ĐOÁN",
]

hud_titles = [
    "CHRISTOPHER COLUMBUS • 1492",
    "BÍ MẬT LỤC ĐỊA MỚI",
    "VĂN MINH BẢN ĐỊA CHÂU MỸ",
    "LẦM TƯỞNG VỀ ẤN ĐỘ",
    "VÙNG ĐẤT HOÀN TOÀN MỚI",
    "NGUỒN GỐC 'NGƯỜI INDIAN'",
    "PHÉP TÍNH SAI LẦM TAI HẠI",
    "BÊN BỜ VỰC CHẾT ĐÓI TRÊN BIỂN",
    "BÍ ẨN TÊN GỌI CHÂU MỸ",
    "AMERIGO VESPUCCI 1501",
    "LỤC ĐỊA MỚI CHÍNH THỨC CÔNG BỐ",
    "NGHỊCH LÝ LỊCH SỬ HÀI HƯỚC",
    "SỰ TRỚ TRÊU CỦA ĐỊNH MỆNH",
    "SỰ THẬT VỀ ĐẤT NƯỚC CỜ HOA",
    "QUẦN ĐẢO CARIBBEAN 1492",
    "MỞ ĐƯỜNG CHO ĐẠI HẢI TRÌNH",
    "KẾT CỤC BI THẢM CUỐI ĐỜI",
    "ẢO TƯỞNG CON ĐƯỜNG TỚI CHÂU Á",
    "THẾ GIỚI THỨC TỈNH VĨ ĐẠI",
    "DI SẢN THAY ĐỔI LỊCH SỬ",
]

def norm(w):
    return re.sub(r"[^\w]", "", w, flags=re.UNICODE).lower()

# Map sentences to token bounds
curr_idx = 0
scene_token_bounds = []

for s_idx, s in enumerate(sentences):
    s_words = [w for w in s.split() if norm(w)]
    start_token = curr_idx
    matched = 0
    while curr_idx < len(tokens) and matched < len(s_words):
        t_word = tokens[curr_idx]['word']
        if not norm(t_word):
            curr_idx += 1
            continue
        if norm(t_word) == norm(s_words[matched]):
            matched += 1
            curr_idx += 1
        else:
            print(f"Error at sentence {s_idx+1}: expected '{s_words[matched]}' but token {curr_idx} is '{t_word}'")
            break
            
    if curr_idx < len(tokens) and not norm(tokens[curr_idx]['word']):
        curr_idx += 1
        
    end_token = curr_idx - 1
    scene_token_bounds.append((start_token, end_token))

assert curr_idx == len(tokens), f"Consumed {curr_idx} of {len(tokens)}"

FPS = 30
TOTAL_FRAMES = 2560

# Calculate scene frame timing
# Start from 0, and transition when each scene's audio ends
raw_scene_times = []
for i, (st, en) in enumerate(scene_token_bounds):
    s_ms = tokens[st]['startMs']
    e_ms = tokens[en]['endMs']
    raw_scene_times.append({
        'id': i + 1,
        'st': st,
        'en': en,
        'startMs': s_ms,
        'endMs': e_ms
    })

# Compute frame bounds ensuring strict continuity
scenes_meta = []
for i in range(len(raw_scene_times)):
    if i == 0:
        start_frame = 0
    else:
        start_frame = scenes_meta[i - 1]['endFrame']
        
    if i == len(raw_scene_times) - 1:
        end_frame = TOTAL_FRAMES
    else:
        # scene transition frame based on next scene's startMs
        next_s_ms = raw_scene_times[i + 1]['startMs']
        curr_e_ms = raw_scene_times[i]['endMs']
        split_ms = (curr_e_ms + next_s_ms) / 2.0
        calculated_frame = int(round((split_ms / 1000.0) * FPS))
        # Ensure at least 15 frames duration
        end_frame = max(start_frame + 20, calculated_frame)
        
    scenes_meta.append({
        'id': i + 1,
        'image': f"{i+1:02d}-columbus-scene.png",
        'badge': badges[i],
        'hud': hud_titles[i],
        'startFrame': start_frame,
        'endFrame': end_frame,
        'durationInFrames': end_frame - start_frame,
        'tokenStart': raw_scene_times[i]['st'],
        'tokenEnd': raw_scene_times[i]['en'],
        'startMs': raw_scene_times[i]['startMs'],
        'endMs': raw_scene_times[i]['endMs'],
    })

# Verify scenes coverage
assert scenes_meta[0]['startFrame'] == 0
assert scenes_meta[-1]['endFrame'] == TOTAL_FRAMES
for i in range(len(scenes_meta) - 1):
    assert scenes_meta[i]['endFrame'] == scenes_meta[i+1]['startFrame']
    print(f"Scene {i+1:02d}: {scenes_meta[i]['startFrame']:4d} -> {scenes_meta[i]['endFrame']:4d} ({scenes_meta[i]['durationInFrames']:3d} frames) | {scenes_meta[i]['badge']}")

print(f"Scene 20: {scenes_meta[19]['startFrame']:4d} -> {scenes_meta[19]['endFrame']:4d} ({scenes_meta[19]['durationInFrames']:3d} frames) | {scenes_meta[19]['badge']}")

# Keyword dictionary for highlighting
KEYWORDS = {
    "christopher", "columbus", "châu", "mỹ", "1492", "lục", "địa", "hàng", "triệu",
    "bản", "địa", "ấn", "độ", "indian", "hải", "trình", "sai", "chết", "đói", "biển",
    "amerigo", "vespucci", "caribbean", "bắc", "lãng", "quên", "lớn", "lao"
}

# Generate phrase captions (chunk 3-5 words)
all_phrases = []
phrase_id = 1

for sc in scenes_meta:
    st_idx = sc['tokenStart']
    en_idx = sc['tokenEnd']
    sc_tokens = tokens[st_idx:en_idx+1]
    
    # Filter out standalone punctuation tokens by merging with previous
    cleaned_tokens = []
    for t in sc_tokens:
        word = t['word'].strip()
        if not norm(word) and cleaned_tokens:
            # merge with previous word
            cleaned_tokens[-1]['word'] += f" {word}"
            cleaned_tokens[-1]['endMs'] = max(cleaned_tokens[-1]['endMs'], t['endMs'])
        else:
            cleaned_tokens.append({
                'word': word,
                'startMs': t['startMs'],
                'endMs': t['endMs'],
                'isKeyword': norm(word) in KEYWORDS
            })
            
    # Chunk into 3-4 words per phrase (max 5)
    i = 0
    while i < len(cleaned_tokens):
        rem = len(cleaned_tokens) - i
        if rem <= 5:
            chunk_size = rem
        elif rem == 6:
            chunk_size = 3
        elif rem == 7:
            chunk_size = 4
        else:
            chunk_size = 4
            
        chunk = cleaned_tokens[i:i+chunk_size]
        p_text = " ".join([w['word'] for w in chunk])
        p_start = chunk[0]['startMs']
        p_end = chunk[-1]['endMs']
        
        all_phrases.append({
            'id': phrase_id,
            'sceneId': sc['id'],
            'text': p_text,
            'startMs': p_start,
            'endMs': p_end,
            'words': chunk
        })
        phrase_id += 1
        i += chunk_size

print(f"\nGenerated {len(all_phrases)} phrases across 20 scenes.")

# Write TypeScript file
ts_code = f"""// Auto-generated Subtitles and Scene Configuration for Christopher Columbus Short
// Age of Discovery & Renaissance Cartography (1492)
// 20 Scenes matching 20 images and aligned narrative beats

export interface WordTiming {{
  word: string;
  startMs: number;
  endMs: number;
  isKeyword?: boolean;
}}

export interface PhraseCaption {{
  id: number;
  sceneId: number;
  text: string;
  startMs: number;
  endMs: number;
  words: WordTiming[];
}}

export interface SceneMeta {{
  id: number;
  image: string;
  badge: string;
  hud: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}}

export const COLUMBUS_TOTAL_FRAMES = {TOTAL_FRAMES};
export const COLUMBUS_FPS = {FPS};
export const COLUMBUS_AUDIO_PATH = "audio/christopher-columbus.wav";

export const COLUMBUS_SCENES: SceneMeta[] = {json.dumps([{
    'id': s['id'],
    'image': s['image'],
    'badge': s['badge'],
    'hud': s['hud'],
    'startFrame': s['startFrame'],
    'endFrame': s['endFrame'],
    'durationInFrames': s['durationInFrames']
} for s in scenes_meta], indent=2, ensure_ascii=False)};

export const COLUMBUS_PHRASES: PhraseCaption[] = {json.dumps(all_phrases, indent=2, ensure_ascii=False)};
"""

with open('src/data/columbusSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Wrote src/data/columbusSubtitles.ts successfully!")
