import json

with open('scripts/aligned_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# Define the exact text phrases for the 12 scenes
# Each phrase is a list of word indices from tokens
# Let's inspect tokens sequentially to find phrase splits

scene_definitions = [
    # Scene 1: 01-unified-empire.png
    # Tần Thủy Hoàng là vị hoàng đế đầu tiên thống nhất Trung Hoa, người đặt nền móng cho cả một đế chế kéo dài hơn 2000 năm sau đó.
    {
        "scene": 1,
        "name": "01-unified-empire.png",
        "badgeText": "👑 THỐNG NHẤT ĐẾ CHẾ",
        "badgeColor": "#F59E0B", # Dragon Gold
        "tag": "ĐẾ CHẾ 2000 NĂM",
        "phrases": [
            ("Tần Thủy Hoàng là vị hoàng đế đầu tiên", ["Tần Thủy Hoàng", "hoàng đế đầu tiên"]),
            ("thống nhất Trung Hoa,", ["thống nhất Trung Hoa"]),
            ("người đặt nền móng cho cả một đế chế", ["đặt nền móng", "đế chế"]),
            ("kéo dài hơn 2000 năm sau đó.", ["hơn 2000 năm"]),
        ]
    },
    # Scene 2: 02-fear-of-death.png
    # Nhưng nỗi ám ảnh lớn nhất đời ông lại không phải chinh chiến hay quyền lực — mà là... cái chết.
    {
        "scene": 2,
        "name": "02-fear-of-death.png",
        "badgeText": "💀 NỖI ÁM ẢNH LỚN NHẤT",
        "badgeColor": "#EF4444", # Blood Crimson
        "tag": "NỖI SỢ CÁI CHẾT",
        "phrases": [
            ("Nhưng nỗi ám ảnh lớn nhất đời ông", ["nỗi ám ảnh lớn nhất"]),
            ("lại không phải chinh chiến hay quyền lực", ["chinh chiến", "quyền lực"]),
            ("mà là... cái chết.", ["cái chết"]),
        ]
    },
    # Scene 3: 03-immortal-island-fleet.png
    # Ông sợ chết đến mức điên cuồng tìm kiếm thuốc trường sinh bất tử suốt phần lớn cuộc đời làm hoàng đế.
    {
        "scene": 3,
        "name": "03-immortal-island-fleet.png",
        "badgeText": "⚡ TÌM THUỐC TRƯỜNG SINH",
        "badgeColor": "#EAB308", # Gold
        "tag": "TRƯỜNG SINH BẤT TỬ",
        "phrases": [
            ("Ông sợ chết đến mức điên cuồng", ["sợ chết", "điên cuồng"]),
            ("tìm kiếm thuốc trường sinh bất tử", ["thuốc trường sinh bất tử"]),
            ("suốt phần lớn cuộc đời làm hoàng đế.", ["suốt cuộc đời", "hoàng đế"]),
        ]
    },
    # Scene 4: 04-no-return.png
    # Ông cử hàng ngàn người, trong đó có cả đoàn thám hiểm hàng trăm nam nữ thanh niên, ra khơi tìm 'tiên đảo' huyền thoại để lấy linh dược — và không ai trong số họ từng quay trở lại.
    {
        "scene": 4,
        "name": "04-no-return.png",
        "badgeText": "🌊 ĐOÀN THÁM HIỂM RA KHƠI",
        "badgeColor": "#06B6D4", # Ocean Cyan
        "tag": "KHÔNG AI TRỞ VỀ",
        "phrases": [
            ("Ông cử hàng ngàn người,", ["hàng ngàn người"]),
            ("trong đó có cả đoàn thám hiểm", ["đoàn thám hiểm"]),
            ("hàng trăm nam nữ thanh niên,", ["nam nữ thanh niên"]),
            ("ra khơi tìm 'tiên đảo' huyền thoại", ["tiên đảo huyền thoại"]),
            ("để lấy linh dược —", ["linh dược"]),
            ("và không ai trong số họ từng quay trở lại.", ["không ai", "quay trở lại"]),
        ]
    },
    # Scene 5: 05-mercury-elixir.png
    # Trớ trêu thay, chính nỗi sợ chết đó lại giết chết ông. Để tìm thuốc trường sinh, các ngự y đã cho ông uống những viên thuốc chứa thủy ngân, tin rằng thứ kim loại lỏng lánh bạc đó mang lại sự bất tử.
    {
        "scene": 5,
        "name": "05-mercury-elixir.png",
        "badgeText": "🧪 PHƯƠNG THUỐC THỦY NGÂN",
        "badgeColor": "#94A3B8", # Mercury Silver
        "tag": "VIÊN THUỐC THỦY NGÂN",
        "phrases": [
            ("Trớ trêu thay, chính nỗi sợ chết", ["Trớ trêu thay", "nỗi sợ chết"]),
            ("đó lại giết chết ông.", ["giết chết ông"]),
            ("Để tìm thuốc trường sinh,", ["thuốc trường sinh"]),
            ("các ngự y đã cho ông uống", ["ngự y"]),
            ("những viên thuốc chứa thủy ngân,", ["viên thuốc", "thủy ngân"]),
            ("tin rằng thứ kim loại lỏng lánh bạc đó", ["kim loại lỏng", "lánh bạc"]),
            ("mang lại sự bất tử.", ["sự bất tử"]),
        ]
    },
    # Scene 6: 06-ironic-downfall.png
    # Tần Thủy Hoàng qua đời ở tuổi 49 vì chính ngộ độc thủy ngân — người sợ chết nhất lại chết vì chính phương thuốc chống lại cái chết.
    {
        "scene": 6,
        "name": "06-ironic-downfall.png",
        "badgeText": "⚰️ BỊ ĐẦU ĐỘC TUỔI 49",
        "badgeColor": "#DC2626", # Red
        "tag": "CHẾT VÌ NỖI SỢ",
        "phrases": [
            ("Tần Thủy Hoàng qua đời ở tuổi 49", ["qua đời", "tuổi 49"]),
            ("vì chính ngộ độc thủy ngân —", ["ngộ độc thủy ngân"]),
            ("người sợ chết nhất", ["sợ chết nhất"]),
            ("lại chết vì chính phương thuốc", ["chết vì phương thuốc"]),
            ("chống lại cái chết.", ["chống lại cái chết"]),
        ]
    },
    # Scene 7: 07-painted-terracotta-army.png
    # Về đội quân đất nung nổi tiếng, ít ai biết rằng hơn 8000 bức tượng binh lính đó ban đầu được sơn màu sắc sặc sỡ, rực rỡ như người thật, chứ không phải màu đất nung xám xịt như chúng ta thấy ngày nay.
    {
        "scene": 7,
        "name": "07-painted-terracotta-army.png",
        "badgeText": "🎨 8000 TƯỢNG ĐẤT NUNG",
        "badgeColor": "#F97316", # Terracotta Orange
        "tag": "SẮC MÀU RỰC RỠ",
        "phrases": [
            ("Về đội quân đất nung nổi tiếng,", ["đội quân đất nung"]),
            ("ít ai biết rằng hơn 8000 bức tượng binh lính đó", ["hơn 8000 bức tượng"]),
            ("ban đầu được sơn màu sắc sặc sỡ,", ["sơn màu sắc sặc sỡ"]),
            ("rực rỡ như người thật,", ["rực rỡ như người thật"]),
            ("chứ không phải màu đất nung xám xịt", ["đất nung xám xịt"]),
            ("như chúng ta thấy ngày nay.", ["thấy ngày nay"]),
        ]
    },
    # Scene 8: 08-terracotta-colors-fade.png
    # Lớp sơn đã phai mờ qua hơn 2000 năm chôn vùi dưới lòng đất.
    {
        "scene": 8,
        "name": "08-terracotta-colors-fade.png",
        "badgeText": "⏳ 2000 NĂM CHÔN VÙI",
        "badgeColor": "#EAB308", # Ochre
        "tag": "PHAI MỜ THEO THỜI GIAN",
        "phrases": [
            ("Lớp sơn đã phai mờ", ["phai mờ"]),
            ("qua hơn 2000 năm", ["hơn 2000 năm"]),
            ("chôn vùi dưới lòng đất.", ["chôn vùi dưới lòng đất"]),
        ]
    },
    # Scene 9: 09-mercury-rivers-tomb.png
    # Tần Thủy Hoàng còn cho xây cả một lăng mộ khổng lồ với sông suối bằng thủy ngân lỏng thật, mô phỏng lại bản đồ đế chế của mình,
    {
        "scene": 9,
        "name": "09-mercury-rivers-tomb.png",
        "badgeText": "🌊 SÔNG THỦY NGÂN LỎNG",
        "badgeColor": "#38BDF8", # Liquid Mercury Blue
        "tag": "LĂNG MỘ KHỔNG LỒ",
        "phrases": [
            ("Tần Thủy Hoàng còn cho xây cả", ["Tần Thủy Hoàng"]),
            ("một lăng mộ khổng lồ", ["lăng mộ khổng lồ"]),
            ("với sông suối bằng thủy ngân lỏng thật,", ["sông suối", "thủy ngân lỏng"]),
            ("mô phỏng lại bản đồ đế chế của mình,", ["mô phỏng bản đồ đế chế"]),
        ]
    },
    # Scene 10: 10-tomb-crossbow-traps.png
    # được thiết kế với bẫy nỏ tự động để ngăn kẻ trộm mộ xâm nhập. Đến nay, các nhà khảo cổ vẫn chưa dám khai quật toàn bộ lăng mộ vì lượng thủy ngân độc hại được cho là vẫn còn tồn tại bên trong.
    {
        "scene": 10,
        "name": "10-tomb-crossbow-traps.png",
        "badgeText": "🏹 BẪY NỎ TỰ ĐỘNG",
        "badgeColor": "#EF4444", # Red
        "tag": "CHƯA THỂ KHAI QUẬT",
        "phrases": [
            ("được thiết kế với bẫy nỏ tự động", ["bẫy nỏ tự động"]),
            ("để ngăn kẻ trộm mộ xâm nhập.", ["kẻ trộm mộ"]),
            ("Đến nay, các nhà khảo cổ", ["nhà khảo cổ"]),
            ("vẫn chưa dám khai quật toàn bộ lăng mộ", ["chưa dám khai quật"]),
            ("vì lượng thủy ngân độc hại", ["thủy ngân độc hại"]),
            ("được cho là vẫn còn tồn tại bên trong.", ["vẫn còn tồn tại"]),
        ]
    },
    # Scene 11: 11-scroll-bonfire.png
    # Và một sự thật gây sốc khác: Tần Thủy Hoàng ra lệnh đốt hầu hết sách vở trong nước và chôn sống hàng trăm học giả, chỉ vì họ dám chỉ trích hoặc đưa ra tư tưởng trái với triều đình — một trong những cuộc thanh trừng tri thức khét tiếng nhất lịch sử nhân loại.
    {
        "scene": 11,
        "name": "11-scroll-bonfire.png",
        "badgeText": "🔥 ĐỐT SÁCH CHÔN NHO",
        "badgeColor": "#F97316", # Flame Orange
        "tag": "THANH TRỪNG TRI THỨC",
        "phrases": [
            ("Và một sự thật gây sốc khác:", ["sự thật gây sốc"]),
            ("Tần Thủy Hoàng ra lệnh đốt hầu hết sách vở trong nước", ["đốt hầu hết sách vở"]),
            ("và chôn sống hàng trăm học giả,", ["chôn sống hàng trăm học giả"]),
            ("chỉ vì họ dám chỉ trích", ["dám chỉ trích"]),
            ("hoặc đưa ra tư tưởng trái với triều đình —", ["trái với triều đình"]),
            ("một trong những cuộc thanh trừng tri thức", ["thanh trừng tri thức"]),
            ("khét tiếng nhất lịch sử nhân loại.", ["khét tiếng nhất"]),
        ]
    },
    # Scene 12: 12-crown-and-great-wall.png
    # Người đàn ông thống nhất cả một đế chế, xây Vạn Lý Trường Thành, nhưng lại chết vì chính nỗi sợ chết của mình — đó chính là Tần Thủy Hoàng.
    {
        "scene": 12,
        "name": "12-crown-and-great-wall.png",
        "badgeText": "👑 VẠN LÝ TRƯỜNG THÀNH",
        "badgeColor": "#F59E0B", # Imperial Gold
        "tag": "TẦN THỦY HOÀNG",
        "phrases": [
            ("Người đàn ông thống nhất cả một đế chế,", ["thống nhất cả một đế chế"]),
            ("xây Vạn Lý Trường Thành,", ["Vạn Lý Trường Thành"]),
            ("nhưng lại chết vì chính nỗi sợ chết của mình —", ["chết vì nỗi sợ chết"]),
            ("đó chính là Tần Thủy Hoàng.", ["Tần Thủy Hoàng"]),
        ]
    },
]

import re

def clean_word(w):
    return re.sub(r'[,.…!—:?\'"“”/()]', '', w).strip().lower()

all_phrases = []
curr_token_idx = 0
phrase_id = 0

scene_timing_info = []

for sc in scene_definitions:
    sc_start_ms = None
    sc_end_ms = None
    sc_phrases = []

    for p_text, keywords in sc['phrases']:
        p_clean_words = [clean_word(w) for w in p_text.split() if clean_word(w)]
        p_tokens = []

        for expected_w in p_clean_words:
            if curr_token_idx >= len(tokens):
                raise ValueError(f"Ran out of tokens while matching '{expected_w}' in phrase '{p_text}'")
            tok = tokens[curr_token_idx]
            tok_clean = clean_word(tok['text'])
            if tok_clean != expected_w:
                raise ValueError(f"Mismatch at token {curr_token_idx}: expected '{expected_w}', got '{tok_clean}' ('{tok['text']}') in phrase '{p_text}'")
            p_tokens.append({
                "text": tok['text'],
                "startMs": tok['startMs'],
                "endMs": tok['endMs']
            })
            curr_token_idx += 1

        p_start_ms = p_tokens[0]['startMs']
        p_end_ms = p_tokens[-1]['endMs']

        if sc_start_ms is None:
            sc_start_ms = p_start_ms
        sc_end_ms = p_end_ms

        phrase_obj = {
            "id": phrase_id,
            "scene": sc['scene'],
            "startMs": p_start_ms,
            "endMs": p_end_ms,
            "text": p_text,
            "tokens": p_tokens,
            "highlightKeywords": keywords
        }
        all_phrases.append(phrase_obj)
        sc_phrases.append(phrase_obj)
        phrase_id += 1

    scene_timing_info.append({
        "scene": sc['scene'],
        "name": sc['name'],
        "badgeText": sc['badgeText'],
        "badgeColor": sc['badgeColor'],
        "tag": sc['tag'],
        "startMs": sc_start_ms,
        "endMs": sc_end_ms,
        "phraseCount": len(sc_phrases)
    })

print(f"Matched {len(all_phrases)} phrases across 12 scenes. All {curr_token_idx} tokens used!")
assert curr_token_idx == len(tokens)

# Now let's calculate scene frame allocations (contiguous from 0 to totalFrames)
# Audio duration is 86.68s = 2601 frames. Let's make total composition duration 2640 frames (88.00s).
# Scene boundaries should align with the audio breaks between scenes.
print("\n--- SCENE TIMINGS ---")
for idx, s in enumerate(scene_timing_info):
    start_s = s['startMs'] / 1000
    end_s = s['endMs'] / 1000
    next_start_s = (scene_timing_info[idx+1]['startMs'] / 1000) if idx + 1 < len(scene_timing_info) else 86.68
    gap_s = next_start_s - end_s
    print(f"Scene {s['scene']:2d} ({s['name']}): {start_s:6.2f}s - {end_s:6.2f}s (audio end). Gap to next: {gap_s:.2f}s")

