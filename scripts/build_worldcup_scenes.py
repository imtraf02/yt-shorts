import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_worldcup_tokens.json', encoding='utf-8'))
print(f"Loaded {len(tokens)} tokens.")

scenes = [
    {
        "id": 1,
        "image": "01-korea-2002-miracle-hook.png",
        "text": "World Cup 2002 của Hàn Quốc… cái “phép màu” bóng đá châu Á mà đến giờ vẫn khiến người ta phải cười ra nước mắt. Mời quý vị cùng tôi ôn lại hành trình “công bằng tuyệt đối” của đội chủ nhà năm ấy nhé.",
        "badge": "⚽ 'PHÉP MÀU' WORLD CUP 2002",
        "hud": "WORLD CUP 2002 • CONTROVERSY"
    },
    {
        "id": 2,
        "image": "02-host-nation-spotlight.png",
        "text": "Trước hết, xin chúc mừng Hàn Quốc đã biến World Cup thành… World Cup dành riêng cho mình. Ý tôi là, FIFA lúc đó chắc nghĩ: “Ủa, đã cho họ làm chủ nhà rồi thì phải cho họ đá bán kết chứ, không thì dân Hàn buồn lắm, bán vé không chạy đâu.”",
        "badge": "🎪 WORLD CUP DÀNH RIÊNG CHO CHỦ NHÀ",
        "hud": "SUẤT BÁN KẾT ĐẶC CÁCH"
    },
    {
        "id": 3,
        "image": "03-italy-match-controversial-red-card.png",
        "text": "Trận với Ý. Ý đá hay, Hàn đá… được trọng tài. Totti vừa chạm bóng đã bị thẻ đỏ vì “giả vờ ngã”, trong khi cầu thủ Hàn Quốc ngã như đang đóng phim hành động Hollywood thì trọng tài quay đi uống nước.",
        "badge": "🟥 THẺ ĐỎ OAN NGHIỆT CHO TOTTI",
        "hud": "TRẬN CHIẾN Ý - HÀN QUỐC"
    },
    {
        "id": 4,
        "image": "04-replay-and-golden-goal.png",
        "text": "Rồi đến phút vàng, Ahn Jung-hwan đánh đầu ghi bàn… ừ thì đẹp, nhưng cái đường chuyền trước đó thì “hơi hơi” việt vị một tí. Nhưng không sao, trọng tài mắt tinh lắm, ông ấy nhìn rõ là… không việt vị. Kết quả: Ý về nước sớm, Totti ôm mặt khóc, còn Hàn Quốc thì ôm cúp… à không, ôm chiếc vé vào tứ kết.",
        "badge": "⚡ BÀN THẮNG VÀNG & NỖI UẤT ỨC Ý",
        "hud": "BÀN THẮNG VÀNG TRANH CÃI"
    },
    {
        "id": 5,
        "image": "05-spain-disallowed-goal-debate.png",
        "text": "Sang đến Tây Ban Nha. Hai bàn thắng của Tây Ban Nha bị hủy vì… “việt vị”. Việt vị kiểu gì mà camera chậm lại vẫn không thấy, nhưng trọng tài Ecuador thì thấy rõ như ban ngày.",
        "badge": "🚫 2 BÀN THẮNG BỊ TỪ CHỐI KHÓ HIỂU",
        "hud": "TÂY BAN NHA BỊ XỬ ÉP"
    },
    {
        "id": 6,
        "image": "07-twelve-vs-eleven-satire.png",
        "text": "Người Tây Ban Nha lúc đó chắc nghĩ mình đang đá với đội bóng 12 người: 11 cầu thủ Hàn + 1 trọng tài.",
        "badge": "👥 ĐỘI BÓNG 12 NGƯỜI TRÊN SÂN",
        "hud": "11 CẦU THỦ + 1 TRỌNG TÀI"
    },
    {
        "id": 7,
        "image": "06-penalty-shootout-reactions.png",
        "text": "Phạt đền, Hàn Quốc thắng, Tây Ban Nha về nước với tâm trạng “lần sau tôi không đá World Cup ở châu Á nữa”.",
        "badge": "🥅 PHẠT ĐỀN NƯỚC MẮT TÂY BAN NHA",
        "hud": "LUÂN LƯU 11M ĐỊNH MỆNH"
    },
    {
        "id": 8,
        "image": "08-germany-semifinal-reality-check.png",
        "text": "Rồi bán kết gặp Đức. Lúc này trọng tài chắc nghĩ “thôi, cho chúng nó đá thật đi, kẻo lộ quá”. Kết quả thua 0-1.",
        "badge": "🇩🇪 BÁN KẾT: ĐỨC DẬP TẮT ẢO TƯỞNG",
        "hud": "KẾT QUẢ THUA 0-1 TRƯỚC ĐỨC"
    },
    {
        "id": 9,
        "image": "09-fourth-place-celebration.png",
        "text": "Nhưng không sao, Hàn Quốc vẫn về hạng tư, cả nước ăn mừng như vừa vô địch vũ trụ.",
        "badge": "🎆 ĂN MỪNG NHƯ VÔ ĐỊCH VŨ TRỤ",
        "hud": "KỲ TÍCH HẠNG TƯ THẾ GIỚI"
    },
    {
        "id": 10,
        "image": "10-refereeing-debate-after-tournament.png",
        "text": "Mỉa mai nhất là sau giải, FIFA vẫn cười toe toét bảo “trọng tài làm rất tốt”. Còn người Hàn thì nói “đấy, chúng tôi mạnh thật đấy chứ”. Ừ, mạnh thật… mạnh nhờ… “sự hỗ trợ nhiệt tình từ phía ban tổ chức”.",
        "badge": "🎤 'TRỌNG TÀI ĐÃ LÀM RẤT TỐT'",
        "hud": "PHÁT NGÔN BẤT HỦ CỦA FIFA"
    },
    {
        "id": 11,
        "image": "11-fans-divided-legacy.png",
        "text": "Thế đấy, World Cup 2002 – nơi Hàn Quốc chứng minh rằng muốn vào bán kết thì không cần đá hay bằng Ronaldo hay Zidane, chỉ cần… trọng tài thích bạn là được.",
        "badge": "🤷 CHỈ CẦN TRỌNG TÀI THÍCH BẠN",
        "hud": "CÔNG THỨC VÀO BÁN KẾT"
    },
    {
        "id": 12,
        "image": "12-fairness-is-relative-ending.png",
        "text": "Cảm ơn FIFA đã mang đến cho chúng ta một kỳ World Cup đầy… bất ngờ. Và cảm ơn Hàn Quốc đã dạy cả thế giới bài học: đôi khi, công bằng chỉ là… một khái niệm tương đối.",
        "badge": "⚖️ CÔNG BẰNG LÀ KHÁI NIỆM TƯƠNG ĐỐI",
        "hud": "BÀI HỌC VỀ SỰ CÔNG BẰNG"
    }
]

def norm(w):
    return re.sub(r"[^\w]", "", w, flags=re.UNICODE).lower()

curr_idx = 0
scene_bounds = []

for sc in scenes:
    s_words = [w for w in sc['text'].split() if norm(w)]
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
            print(f"Mismatch at scene {sc['id']}: expected '{s_words[matched]}', got token {curr_idx}='{t_word}'")
            break
            
    while curr_idx < len(tokens) and not norm(tokens[curr_idx]['word']):
        curr_idx += 1
        
    end_token = curr_idx - 1
    scene_bounds.append((start_token, end_token))

assert curr_idx == len(tokens), f"Consumed {curr_idx} of {len(tokens)}"

FPS = 30
TOTAL_FRAMES = 3530

raw_scene_times = []
for i, (st, en) in enumerate(scene_bounds):
    raw_scene_times.append({
        'id': i + 1,
        'st': st,
        'en': en,
        'startMs': tokens[st]['startMs'],
        'endMs': tokens[en]['endMs']
    })

scenes_meta = []
for i in range(len(raw_scene_times)):
    if i == 0:
        start_frame = 0
    else:
        start_frame = scenes_meta[i - 1]['endFrame']
        
    if i == len(raw_scene_times) - 1:
        end_frame = TOTAL_FRAMES
    else:
        next_s_ms = raw_scene_times[i + 1]['startMs']
        curr_e_ms = raw_scene_times[i]['endMs']
        split_ms = (curr_e_ms + next_s_ms) / 2.0
        calculated_frame = int(round((split_ms / 1000.0) * FPS))
        end_frame = max(start_frame + 30, calculated_frame)
        
    scenes_meta.append({
        'id': i + 1,
        'image': scenes[i]['image'],
        'badge': scenes[i]['badge'],
        'hud': scenes[i]['hud'],
        'startFrame': start_frame,
        'endFrame': end_frame,
        'durationInFrames': end_frame - start_frame,
        'tokenStart': raw_scene_times[i]['st'],
        'tokenEnd': raw_scene_times[i]['en'],
        'startMs': raw_scene_times[i]['startMs'],
        'endMs': raw_scene_times[i]['endMs'],
    })

assert scenes_meta[0]['startFrame'] == 0
assert scenes_meta[-1]['endFrame'] == TOTAL_FRAMES
for i in range(len(scenes_meta) - 1):
    assert scenes_meta[i]['endFrame'] == scenes_meta[i+1]['startFrame']
    print(f"Scene {i+1:02d}: {scenes_meta[i]['startFrame']:4d} -> {scenes_meta[i]['endFrame']:4d} ({scenes_meta[i]['durationInFrames']:3d} frames) | {scenes_meta[i]['badge']}")

print(f"Scene 12: {scenes_meta[11]['startFrame']:4d} -> {scenes_meta[11]['endFrame']:4d} ({scenes_meta[11]['durationInFrames']:3d} frames) | {scenes_meta[11]['badge']}")

# Keywords for football / controversy emphasis
KEYWORDS = {
    "world", "cup", "2002", "hàn", "quốc", "phép", "màu", "bóng", "đá",
    "công", "bằng", "tuyệt", "đối", "chủ", "nhà", "fifa", "bán", "kết",
    "ý", "trọng", "tài", "totti", "thẻ", "đỏ", "hollywood", "ahn", "junghwan",
    "việt", "vị", "tứ", "tây", "ban", "nha", "ecuador", "12", "11",
    "phạt", "đền", "đức", "hạng", "tư", "vũ", "trụ", "ronaldo", "zidane"
}

# Generate phrases
all_phrases = []
phrase_id = 1

for sc in scenes_meta:
    st_idx = sc['tokenStart']
    en_idx = sc['tokenEnd']
    sc_tokens = tokens[st_idx:en_idx+1]
    
    cleaned_tokens = []
    for t in sc_tokens:
        word = t['word'].strip()
        if not norm(word) and cleaned_tokens:
            cleaned_tokens[-1]['word'] += f" {word}"
            cleaned_tokens[-1]['endMs'] = max(cleaned_tokens[-1]['endMs'], t['endMs'])
        else:
            cleaned_tokens.append({
                'word': word,
                'startMs': t['startMs'],
                'endMs': t['endMs'],
                'isKeyword': norm(word) in KEYWORDS
            })
            
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

print(f"\nGenerated {len(all_phrases)} phrases across 12 scenes.")

ts_code = f"""// Auto-generated Subtitles and Scene Configuration for World Cup 2002 Short
// Satirical Football Documentary Style
// 12 Scenes matching 12 illustrations and aligned narrative beats

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

export const WORLDCUP_TOTAL_FRAMES = {TOTAL_FRAMES};
export const WORLDCUP_FPS = {FPS};
export const WORLDCUP_AUDIO_PATH = "audio/world-cup-2002.wav";

export const WORLDCUP_SCENES: SceneMeta[] = {json.dumps([{
    'id': s['id'],
    'image': s['image'],
    'badge': s['badge'],
    'hud': s['hud'],
    'startFrame': s['startFrame'],
    'endFrame': s['endFrame'],
    'durationInFrames': s['durationInFrames']
} for s in scenes_meta], indent=2, ensure_ascii=False)};

export const WORLDCUP_PHRASES: PhraseCaption[] = {json.dumps(all_phrases, indent=2, ensure_ascii=False)};
"""

with open('src/data/worldcupSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Wrote src/data/worldcupSubtitles.ts successfully!")
