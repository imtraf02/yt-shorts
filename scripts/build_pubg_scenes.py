import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

tokens = json.load(open('scripts/aligned_pubg_tokens.json', encoding='utf-8'))
print(f"Loaded {len(tokens)} tokens.")

scenes = [
    {
        "id": 1,
        "image": "01-football-to-battle-royale-hook.png",
        "text": "các bạn ơi… nhớ cái thoại World Cup 2002 của Hàn Quốc hôm trước không? Cái “phép màu” mà trọng tài biến thành cầu thủ thứ 12 ấy? Giờ thì lịch sử lặp lại, nhưng lần này không phải trên sân cỏ, mà trên… map Erangel. Và nhân vật chính vẫn là… Hàn Quốc.",
        "badge": "🎮 TỪ WORLD CUP 2002 ĐẾN ERANGEL",
        "hud": "PUBG ASIA STARS 2026 • SCANDAL"
    },
    {
        "id": 2,
        "image": "02-friendly-tournament-gameplay.png",
        "text": "Mời quý vị cùng tôi ôn lại vụ “PUBG Asia Stars 2026” – giải giao hữu vui vẻ, giải trí, không áp lực… cho đến khi có người Hàn bị hạ.",
        "badge": "🎯 GIẢI GIAO HỮU CHO ĐẾN KHI...",
        "hud": "GIẢI GIAO HỮU ASIA STARS"
    },
    {
        "id": 3,
        "image": "03-disputed-accusation-replay.png",
        "text": "Ngày 17/9, hai tuyển thủ Việt Nam Himass và TanVuu đang chơi bình thường. Nữ streamer Hàn Quốc Soopi bị hạ, lên tiếng tố “đá stream”. Cái gì? Xem livestream đối thủ á? Ôi trời, tội nặng quá! Ban tổ chức Krafton (công ty Hàn Quốc) nghe xong lập tức… xử lý nhanh như chớp. Loại hai người Việt khỏi giải, thu hồi Partner, còn giải thì hỗn loạn.",
        "badge": "🚨 CÁO BUỘC 'ĐÁ STREAM' VÔ CĂN CỨ",
        "hud": "STREAMER HÀN QUỐC TỐ CÁO"
    },
    {
        "id": 4,
        "image": "04-rapid-administrative-action.png",
        "text": "Ban tổ chức Krafton (công ty Hàn Quốc) nghe xong lập tức… xử lý nhanh như chớp. Loại hai người Việt khỏi giải, thu hồi Partner, còn giải thì hỗn loạn.",
        "badge": "⚡ KRAFTON XỬ PHẠT NHANH NHƯ CHỚP",
        "hud": "LOẠI 2 TUYỂN THỦ VIỆT NAM"
    },
    {
        "id": 5,
        "image": "05-tournament-disruption-boycott.png",
        "text": "Đội Hàn tẩy chay, ngày 3 hủy luôn.",
        "badge": "⛔ ĐỘI HÀN TẨY CHAY & HỦY GIẢI ĐẤU",
        "hud": "HỦY NGÀY THI ĐẤU THỨ 3"
    },
    {
        "id": 6,
        "image": "06-apology-and-confusion.png",
        "text": "Krafton xin lỗi ầm ầm: “Chúng tôi vận hành kém, công bố vội vàng, thiếu quy định rõ ràng…”",
        "badge": "🙇 LỜI XIN LỖI VỤNG VỀ TỪ KRAFTON",
        "hud": "THỪA NHẬN LỖI VẬN HÀNH"
    },
    {
        "id": 7,
        "image": "07-severe-long-term-ban-metaphor.png",
        "text": "Rồi… đến ngày 23/9. Sau khi “điều tra toàn diện”, Krafton đưa ra bản án: Cấm thi đấu vĩnh viễn. Khóa nick vĩnh viễn. Cấm mọi giải chính thức toàn cầu.",
        "badge": "🔨 BẢN ÁN CẤM THI ĐẤU VĨNH VIỄN",
        "hud": "ÁP ĐẶT ÁN PHẠT TỐI CAO"
    },
    {
        "id": 8,
        "image": "08-unclear-rules-heavy-punishment.png",
        "text": "Ừ, giải giao hữu. Quy định lúc đó chưa rõ. Họ thừa nhận lỗi vận hành. Nhưng hai cậu Việt Nam thì… hết đường về.",
        "badge": "⚖️ QUY ĐỊNH MẬP MỜ - ÁN PHẠT TẬN CÙNG",
        "hud": "BẤT CÔNG KHÔNG LỐI THOÁT"
    },
    {
        "id": 9,
        "image": "09-football-game-parallel.png",
        "text": "Nghe quen không? Năm 2002, trọng tài “vô tình” giúp chủ nhà Hàn vào bán kết. Năm 2026, nhà phát hành Hàn “vô tình” ban vĩnh viễn hai tuyển thủ Việt sau khi bị tố bởi người Hàn. Công bằng tuyệt đối, đúng không nào?",
        "badge": "🔄 KỊCH BẢN THÂN QUEN CỦA NGƯỜI HÀN",
        "hud": "SỰ 'TRÙNG HỢP' LỊCH SỬ"
    },
    {
        "id": 10,
        "image": "10-community-uninstall-response.png",
        "text": "Cộng đồng Việt Nam thì sao? Xóa game hàng loạt. Độ Mixi xóa. Streamer xóa.",
        "badge": "🗑️ LÀN SÓNG XÓA GAME TẠI VIỆT NAM",
        "hud": "ĐỘ MIXI & CỘNG ĐỒNG TẨY CHAY"
    },
    {
        "id": 11,
        "image": "11-negative-reaction-wave.png",
        "text": "Review “Mostly Negative” tăng vọt.",
        "badge": "📉 'MOSTLY NEGATIVE' TRÊN TOÀN CẦU",
        "hud": "BÃO REVIEW TIÊU CỰC"
    },
    {
        "id": 12,
        "image": "12-reputation-financial-shock-metaphor.png",
        "text": "Cổ phiếu Krafton bốc hơi gần 160 triệu USD. Người ta bảo “thị trường Việt Nam quan trọng”, nhưng xử lý thì… quan trọng kiểu “cấm luôn cho khỏe”.",
        "badge": "💸 CỔ PHIẾU BỐC HƠI 160 TRIỆU USD",
        "hud": "THIỆT HẠI TÀI CHÍNH NẶNG NỀ"
    },
    {
        "id": 13,
        "image": "13-himass-personal-impact.png",
        "text": "Himass đăng status “Chính thức thất nghiệp”.",
        "badge": "💔 HIMASS: 'CHÍNH THỨC THẤT NGHIỆP'",
        "hud": "SỰ NGHIỆP BỊ ĐẬP TAN"
    },
    {
        "id": 14,
        "image": "14-tanvuu-personal-impact.png",
        "text": "TanVuu livestream xóa game trong nước mắt.",
        "badge": "😢 TANVUU XÓA GAME TRONG NƯỚC MẮT",
        "hud": "NỖI ĐAU CỦA TUYỂN THỦ TRẺ"
    },
    {
        "id": 15,
        "image": "15-apology-versus-sanction.png",
        "text": "Còn Krafton thì vừa xin lỗi, vừa ban, vừa bảo vệ streamer Hàn. Hoàn hảo. Vậy nên, nếu bạn từng nghĩ World Cup 2002 là đỉnh cao của “công bằng kiểu Hàn”, thì xin lỗi… PUBG Asia Stars 2026 vừa phá kỷ lục. Từ trọng tài bóng đá đến nhà phát hành game, công thức vẫn thế: Có người Hàn bị thiệt → xử nhanh. Có người Việt bị hại → “chúng tôi xin lỗi… nhưng ban vĩnh viễn nhé”.",
        "badge": "🛡️ BẢO VỆ GIA TỘC - TRỪ KHỬ NGOẠI TỘC",
        "hud": "CÔNG THỨC XỬ LÝ KIỂU HÀN"
    },
    {
        "id": 16,
        "image": "16-leave-map-new-path.png",
        "text": "Cảm ơn Krafton đã mang đến cho chúng ta một bài học quý giá: Ở châu Á, đôi khi “công bằng” chỉ là… một từ để dịch sang tiếng Hàn cho dễ nghe. Còn Việt Nam ư? Thôi, xóa PUBG, chuyển sang game khác. Vì rõ ràng, trên map của họ, họ thượng đẳng.",
        "badge": "🚪 TẠM BIỆT PUBG: RỜI KHỎI MAP ĐỘC QUYỀN",
        "hud": "TRÊN MAP CỦA HỌ, HỌ THƯỢNG ĐẲNG"
    }
]

# Adjust Scene 3 and 4 text split
scenes[2]["text"] = "Ngày 17/9, hai tuyển thủ Việt Nam Himass và TanVuu đang chơi bình thường. Nữ streamer Hàn Quốc Soopi bị hạ, lên tiếng tố “đá stream”. Cái gì? Xem livestream đối thủ á? Ôi trời, tội nặng quá!"
scenes[3]["text"] = "Ban tổ chức Krafton (công ty Hàn Quốc) nghe xong lập tức… xử lý nhanh như chớp. Loại hai người Việt khỏi giải, thu hồi Partner, còn giải thì hỗn loạn."

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
TOTAL_FRAMES = 4260

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
        end_frame = max(start_frame + 25, calculated_frame)
        
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

print(f"Scene 16: {scenes_meta[15]['startFrame']:4d} -> {scenes_meta[15]['endFrame']:4d} ({scenes_meta[15]['durationInFrames']:3d} frames) | {scenes_meta[15]['badge']}")

# Keywords
KEYWORDS = {
    "pubg", "erangel", "krafton", "himass", "tanvuu", "soopi", "hàn", "quốc",
    "việt", "nam", "stream", "partner", "ban", "vĩnh", "viễn", "khóa", "nick",
    "độ", "mixi", "xóa", "negative", "cổ", "phiếu", "160", "triệu", "usd",
    "thất", "nghiệp", "nước", "mắt", "thượng", "đẳng", "2002", "2026"
}

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

print(f"\nGenerated {len(all_phrases)} phrases across 16 scenes.")

ts_code = f"""// Auto-generated Subtitles and Scene Configuration for PUBG Asia Stars 2026 Short
// Vox / Esports Editorial Anime Style
// 16 Scenes matching 16 illustrations and aligned narrative beats

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

export const PUBG_TOTAL_FRAMES = {TOTAL_FRAMES};
export const PUBG_FPS = {FPS};
export const PUBG_AUDIO_PATH = "audio/pubg-asia-stars-2026.wav";

export const PUBG_SCENES: SceneMeta[] = {json.dumps([{
    'id': s['id'],
    'image': s['image'],
    'badge': s['badge'],
    'hud': s['hud'],
    'startFrame': s['startFrame'],
    'endFrame': s['endFrame'],
    'durationInFrames': s['durationInFrames']
} for s in scenes_meta], indent=2, ensure_ascii=False)};

export const PUBG_PHRASES: PhraseCaption[] = {json.dumps(all_phrases, indent=2, ensure_ascii=False)};
"""

with open('src/data/pubgSubtitles.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Wrote src/data/pubgSubtitles.ts successfully!")
