import json
import re

with open('scripts/aligned_genghis_tokens.json', 'r', encoding='utf-8') as f:
    tokens = json.load(f)

scene_definitions = [
    # Scene 1: 01-genghis-khan-scene.png
    # Thành Cát Tư Hãn là người sáng lập Đế quốc Mông Cổ, đế chế liền lãnh thổ lớn nhất lịch sử nhân loại, trải dài từ Thái Bình Dương đến tận Đông Âu.
    {
        "scene": 1,
        "name": "01-genghis-khan-scene.png",
        "badgeText": "👑 ĐẾ CHẾ LỚN NHẤT LỊCH SỬ",
        "badgeColor": "#0284C7",
        "tag": "ĐẾ QUỐC MÔNG CỔ",
        "phrases": [
            ("Thành Cát Tư Hãn là người sáng lập", ["Thành Cát Tư Hãn", "sáng lập"]),
            ("Đế quốc Mông Cổ,", ["Đế quốc Mông Cổ"]),
            ("đế chế liền lãnh thổ lớn nhất lịch sử nhân loại,", ["lớn nhất lịch sử"]),
            ("trải dài từ Thái Bình Dương", ["Thái Bình Dương"]),
            ("đến tận Đông Âu.", ["Đông Âu"]),
        ]
    },
    # Scene 2: 02-genghis-khan-scene.png
    # Nhưng ít ai biết rằng người đàn ông ấy bắt đầu cuộc đời từ đáy xã hội, bị chính bộ tộc của mình bỏ rơi.
    {
        "scene": 2,
        "name": "02-genghis-khan-scene.png",
        "badgeText": "🐺 KHỞI ĐẦU TỪ ĐÁY XÃ HỘI",
        "badgeColor": "#F59E0B",
        "tag": "BỊ BỘ TỘC BỎ RƠI",
        "phrases": [
            ("Nhưng ít ai biết rằng", ["ít ai biết"]),
            ("người đàn ông ấy bắt đầu cuộc đời", ["bắt đầu cuộc đời"]),
            ("từ đáy xã hội,", ["đáy xã hội"]),
            ("bị chính bộ tộc của mình bỏ rơi.", ["bộ tộc", "bỏ rơi"]),
        ]
    },
    # Scene 3: 03-genghis-khan-scene.png
    # Ông tên thật là Temüjin. Khi ông mới khoảng 9 tuổi, cha ông bị người Tatar đầu độc. Cả gia đình bị bộ tộc ruồng bỏ giữa thảo nguyên khắc nghiệt,
    {
        "scene": 3,
        "name": "03-genghis-khan-scene.png",
        "badgeText": "☠️ CHA BỊ ĐẦU ĐỘC TUỔI LÊN 9",
        "badgeColor": "#EF4444",
        "tag": "TEMÜJIN NĂM 9 TUỔI",
        "phrases": [
            ("Ông tên thật là Temüjin.", ["Temüjin"]),
            ("Khi ông mới khoảng 9 tuổi,", ["khoảng 9 tuổi"]),
            ("cha ông bị người Tatar đầu độc.", ["Tatar đầu độc"]),
            ("Cả gia đình bị bộ tộc ruồng bỏ", ["ruồng bỏ"]),
            ("giữa thảo nguyên khắc nghiệt,", ["thảo nguyên khắc nghiệt"]),
        ]
    },
    # Scene 4: 04-genghis-khan-scene.png
    # phải sống sót bằng rễ cây, quả dại và những con thú nhỏ. Đây là khởi đầu của người sau này chinh phục nửa thế giới.
    {
        "scene": 4,
        "name": "04-genghis-khan-scene.png",
        "badgeText": "🌿 SINH TỒN BẰNG RỄ CÂY",
        "badgeColor": "#10B981",
        "tag": "SỐNG SÓT THẢO NGUYÊN",
        "phrases": [
            ("phải sống sót bằng rễ cây,", ["sống sót", "rễ cây"]),
            ("quả dại và những con thú nhỏ.", ["quả dại", "con thú nhỏ"]),
            ("Đây là khởi đầu", ["khởi đầu"]),
            ("của người sau này chinh phục nửa thế giới.", ["chinh phục nửa thế giới"]),
        ]
    },
    # Scene 5: 05-genghis-khan-scene.png
    # Ông lớn lên trong bị bắt giữ, phản bội và mất mát, đến cả vợ ông là Börte cũng từng bị bắt cóc.
    {
        "scene": 5,
        "name": "05-genghis-khan-scene.png",
        "badgeText": "⛓️ BỊ BẮT GIỮ VÀ PHẢN BỘI",
        "badgeColor": "#F97316",
        "tag": "VỢ BỊ BẮT CÓC",
        "phrases": [
            ("Ông lớn lên trong bị bắt giữ,", ["bắt giữ"]),
            ("phản bội và mất mát,", ["phản bội", "mất mát"]),
            ("đến cả vợ ông là Börte", ["vợ ông", "Börte"]),
            ("cũng từng bị bắt cóc.", ["bị bắt cóc"]),
        ]
    },
    # Scene 6: 06-genghis-khan-scene.png
    # Nhưng chính những năm tháng ấy dạy ông một điều: sức mạnh không đến từ dòng máu, mà đến từ lòng trung thành.
    {
        "scene": 6,
        "name": "06-genghis-khan-scene.png",
        "badgeText": "🛡️ SỨC MẠNH CỦA LÒNG TRUNG THÀNH",
        "badgeColor": "#38BDF8",
        "tag": "LÒNG TRUNG THÀNH",
        "phrases": [
            ("Nhưng chính những năm tháng ấy", ["năm tháng ấy"]),
            ("dạy ông một điều:", ["dạy ông"]),
            ("sức mạnh không đến từ dòng máu,", ["dòng máu"]),
            ("mà đến từ lòng trung thành.", ["lòng trung thành"]),
        ]
    },
    # Scene 7: 07-genghis-khan-scene.png
    # Năm 1206, sau khi thống nhất các bộ tộc Mông Cổ vốn thù địch nhau suốt nhiều thế hệ, ông được tôn làm Thành Cát Tư Hãn.
    {
        "scene": 7,
        "name": "07-genghis-khan-scene.png",
        "badgeText": "👑 ĐẠI HÃN NĂM 1206",
        "badgeColor": "#F59E0B",
        "tag": "THÀNH CÁT TƯ HÃN",
        "phrases": [
            ("Năm 1206,", ["Năm 1206"]),
            ("sau khi thống nhất các bộ tộc Mông Cổ", ["thống nhất", "Mông Cổ"]),
            ("vốn thù địch nhau suốt nhiều thế hệ,", ["thù địch nhau"]),
            ("ông được tôn làm Thành Cát Tư Hãn.", ["Thành Cát Tư Hãn"]),
        ]
    },
    # Scene 8: 08-genghis-khan-scene.png
    # Điều khiến quân đội của ông bất bại không chỉ là ngựa và cung tên. Ông thăng chức theo năng lực chứ không theo xuất thân, nên một người chăn cừu hoàn toàn có thể trở thành tướng lĩnh.
    {
        "scene": 8,
        "name": "08-genghis-khan-scene.png",
        "badgeText": "🏹 TRỌNG DỤNG NGƯỜI TÀI",
        "badgeColor": "#EAB308",
        "tag": "QUÂN ĐỘI BẤT BẠI",
        "phrases": [
            ("Điều khiến quân đội của ông bất bại", ["quân đội bất bại"]),
            ("không chỉ là ngựa và cung tên.", ["ngựa và cung tên"]),
            ("Ông thăng chức theo năng lực", ["theo năng lực"]),
            ("chứ không theo xuất thân,", ["không theo xuất thân"]),
            ("nên một người chăn cừu", ["người chăn cừu"]),
            ("hoàn toàn có thể trở thành tướng lĩnh.", ["trở thành tướng lĩnh"]),
        ]
    },
    # Scene 9: 09-genghis-khan-scene.png
    # Ông lập hệ thống trạm dịch Yam để tin tức băng qua hàng nghìn cây số chỉ trong thời gian ngắn,
    {
        "scene": 9,
        "name": "09-genghis-khan-scene.png",
        "badgeText": "🐎 TRẠM DỊCH HỎA TỐC YAM",
        "badgeColor": "#0284C7",
        "tag": "MẠNG LƯỚI TIN TỨC YAM",
        "phrases": [
            ("Ông lập hệ thống trạm dịch Yam", ["trạm dịch Yam"]),
            ("để tin tức băng qua hàng nghìn cây số", ["hàng nghìn cây số"]),
            ("chỉ trong thời gian ngắn,", ["thời gian ngắn"]),
        ]
    },
    # Scene 10: 10-genghis-khan-scene.png
    # ban hành bộ luật Yassa và cho phép các tôn giáo được tự do tín ngưỡng trong đế chế.
    {
        "scene": 10,
        "name": "10-genghis-khan-scene.png",
        "badgeText": "📜 BỘ LUẬT YASSA & TỰ DO TÔN GIÁO",
        "badgeColor": "#8B5CF6",
        "tag": "BỘ LUẬT YASSA",
        "phrases": [
            ("ban hành bộ luật Yassa", ["bộ luật Yassa"]),
            ("và cho phép các tôn giáo", ["các tôn giáo"]),
            ("được tự do tín ngưỡng trong đế chế.", ["tự do tín ngưỡng"]),
        ]
    },
    # Scene 11: 11-genghis-khan-scene.png
    # Nhưng mặt tối cũng khủng khiếp không kém. Khi các thành phố kháng cự, quân Mông Cổ san phẳng chúng, và nhiều nhà sử học ước tính hàng triệu người đã thiệt mạng trong các cuộc chinh phạt. Con số chính xác vẫn còn tranh cãi.
    {
        "scene": 11,
        "name": "11-genghis-khan-scene.png",
        "badgeText": "🔥 CÁC CUỘC CHINH PHẠT ĐẪM MÁU",
        "badgeColor": "#DC2626",
        "tag": "MẶT TỐI KHỦNG KHIẾP",
        "phrases": [
            ("Nhưng mặt tối cũng khủng khiếp không kém.", ["mặt tối khủng khiếp"]),
            ("Khi các thành phố kháng cự,", ["kháng cự"]),
            ("quân Mông Cổ san phẳng chúng,", ["san phẳng chúng"]),
            ("và nhiều nhà sử học ước tính", ["nhà sử học"]),
            ("hàng triệu người đã thiệt mạng", ["hàng triệu người", "thiệt mạng"]),
            ("trong các cuộc chinh phạt.", ["chinh phạt"]),
            ("Con số chính xác vẫn còn tranh cãi.", ["vẫn còn tranh cãi"]),
        ]
    },
    # Scene 12: 12-genghis-khan-scene.png
    # Ông qua đời năm 1227 trong chiến dịch chống Tây Hạ, nguyên nhân vẫn chưa ai chắc chắn.
    {
        "scene": 12,
        "name": "12-genghis-khan-scene.png",
        "badgeText": "⚔️ QUA ĐỜI NĂM 1227",
        "badgeColor": "#94A3B8",
        "tag": "CHIẾN DỊCH TÂY HẠ",
        "phrases": [
            ("Ông qua đời năm 1227", ["qua đời năm 1227"]),
            ("trong chiến dịch chống Tây Hạ,", ["chống Tây Hạ"]),
            ("nguyên nhân vẫn chưa ai chắc chắn.", ["chưa ai chắc chắn"]),
        ]
    },
    # Scene 13: 13-genghis-khan-scene.png
    # Nơi chôn cất ông cho đến nay vẫn là bí ẩn. Theo truyền thuyết, mộ ông được giấu kín, nhưng chi tiết này chưa được kiểm chứng.
    {
        "scene": 13,
        "name": "13-genghis-khan-scene.png",
        "badgeText": "🏜️ MỘ BÍ ẨN GIỮA ĐẤT TRỜI",
        "badgeColor": "#D97706",
        "tag": "BÍ ẨN NƠI AN NGHỈ",
        "phrases": [
            ("Nơi chôn cất ông", ["chôn cất"]),
            ("cho đến nay vẫn là bí ẩn.", ["vẫn là bí ẩn"]),
            ("Theo truyền thuyết,", ["truyền thuyết"]),
            ("mộ ông được giấu kín,", ["giấu kín"]),
            ("nhưng chi tiết này chưa được kiểm chứng.", ["chưa được kiểm chứng"]),
        ]
    },
    # Scene 14: 14-genghis-khan-scene.png
    # Có một điều còn tồn tại đến tận hôm nay: một nghiên cứu di truyền năm 2003 cho thấy dòng gen Y hiếm gặp, có thể bắt nguồn từ ông hoặc gia tộc ông, hiện diện ở khoảng 16 triệu đàn ông trên khắp châu Á.
    {
        "scene": 14,
        "name": "14-genghis-khan-scene.png",
        "badgeText": "🧬 DẤU ẤN 16 TRIỆU HẬU DUỆ",
        "badgeColor": "#10B981",
        "tag": "DI TRUYỀN NĂM 2003",
        "phrases": [
            ("Có một điều còn tồn tại đến tận hôm nay:", ["tồn tại đến hôm nay"]),
            ("một nghiên cứu di truyền năm 2003 cho thấy", ["nghiên cứu di truyền", "2003"]),
            ("dòng gen Y hiếm gặp,", ["dòng gen Y hiếm gặp"]),
            ("có thể bắt nguồn từ ông hoặc gia tộc ông,", ["gia tộc ông"]),
            ("hiện diện ở khoảng 16 triệu đàn ông", ["16 triệu đàn ông"]),
            ("trên khắp châu Á.", ["khắp châu Á"]),
        ]
    },
    # Scene 15: 15-genghis-khan-scene.png
    # Người đàn ông bị bỏ rơi giữa thảo nguyên, để rồi dựng nên đế chế lớn nhất lịch sử, và còn để lại dấu vết trong gen của hàng triệu người, đó chính là Thành Cát Tư Hãn.
    {
        "scene": 15,
        "name": "15-genghis-khan-scene.png",
        "badgeText": "👑 THÀNH CÁT TƯ HÃN HUYỀN THOẠI",
        "badgeColor": "#F59E0B",
        "tag": "HUYỀN THOẠI MÔNG CỔ",
        "phrases": [
            ("Người đàn ông bị bỏ rơi giữa thảo nguyên,", ["bị bỏ rơi", "thảo nguyên"]),
            ("để rồi dựng nên đế chế lớn nhất lịch sử,", ["đế chế lớn nhất lịch sử"]),
            ("và còn để lại dấu vết trong gen", ["dấu vết trong gen"]),
            ("của hàng triệu người,", ["hàng triệu người"]),
            ("đó chính là Thành Cát Tư Hãn.", ["Thành Cát Tư Hãn"]),
        ]
    },
]

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

print(f"Matched {len(all_phrases)} phrases across 15 scenes. All {curr_token_idx} tokens used!")
assert curr_token_idx == len(tokens)

# Print scene timings
print("\n--- SCENE TIMINGS ---")
for idx, s in enumerate(scene_timing_info):
    start_s = s['startMs'] / 1000
    end_s = s['endMs'] / 1000
    next_start_s = (scene_timing_info[idx+1]['startMs'] / 1000) if idx + 1 < len(scene_timing_info) else 102.50
    gap_s = next_start_s - end_s
    print(f"Scene {s['scene']:2d} ({s['name']}): {start_s:6.2f}s - {end_s:6.2f}s (audio end). Gap to next: {gap_s:.2f}s")
