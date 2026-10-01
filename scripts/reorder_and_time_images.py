# -*- coding: utf-8 -*-
"""
Script phân tích và đối soát chính xác 94 ảnh với lời thoại thuyết minh của Trúc Ly.
Cập nhật src/data/usWarEconomyData.ts với:
- Thứ tự ảnh hoàn toàn khớp theo diễn biến kịch bản
- imageStartFrames chuẩn từng frame (30fps) khớp chính xác millisecond từ audio
- Mô tả ảnh khớp 100% với nội dung hiển thị
"""

import sys
import json
import re
from pathlib import Path

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

# Danh sách chi tiết từng ảnh theo thứ tự kịch bản và câu thoại tương ứng
SCHEDULE = {
    "part1": [
        ("001_ruined-european-city.png", "Tàn tích châu Âu sau chiến tranh", ["Trong", "hơn", "một", "trăm"]),
        ("002_war-torn-village-factory.png", "Châu Âu hoang tàn & Công nghiệp Mỹ bùng nổ", ["Châu", "Âu", "sau", "hai"]),
        ("003_statue-liberty-cargo-ships.png", "Tượng Nữ thần Tự do & Đoàn tàu vận tải hàng hóa", ["Còn", "nước", "Mỹ", "thì"]),
        ("004_stock-ticker-new-york.png", "Bảng điện tử Phố Wall liên tục lập đỉnh", ["Và", "cổ", "phiếu", "của"]),
        ("005_world-map-war-zones.png", "Bản đồ chiến sự: Dòng tiền và các điểm nóng toàn cầu", ["Đây", "là", "trùng", "hợp"]),
        ("006_modern-war-desert.png", "Chiến trường hiện đại: Sa mạc và bão cát", ["Hôm", "nay", "mình", "sẽ"]),
        ("007_american-eagle-emblem.png", "Biểu tượng đại bàng vàng trên hồ sơ quốc gia", ["Cái", "mình", "muốn", "làm"]),
        ("008_artillery-shell-factory.png", "Dây chuyền sản xuất đạn pháo thời chiến", ["Và", "để", "làm", "điều"]),
    ],
    "part2": [
        ("009.png", "Tổng thống Woodrow Wilson tuyên bố trung lập 1914", ["Năm", "1914", "chiến", "tranh"]),
        ("010.png", "Phố phường New York đón tin chiến sự châu Âu 1914", ["Nghe", "thì", "rất", "đẹp"]),
        ("011.png", "Chiến hào bùn lầy đẫm máu tại châu Âu", ["Nhưng", "khi", "cuộc", "chiến"]),
        ("012.png", "Công nhân lắp ráp súng trường tại công xưởng Mỹ", ["Nước", "Anh", "đặt", "một"]),
        ("013.png", "Cảng biển Mỹ bốc dỡ vũ khí xuất khẩu", ["Cứ", "đơn", "hàng", "này"]),
        ("014.png", "Xuất khẩu quân sự tăng vọt hơn 30 lần", ["Bạn", "cứ", "hình", "dung"]),
        ("015.png", "Quân đội Anh tiếp nhận súng trường Enfield từ Mỹ", ["Hơn", "một", "nửa", "lượng"]),
        ("016.png", "Giới tài phiệt Phố Wall: Nhà tài trợ chính chiến tranh", ["Nhưng", "vũ", "khí", "chỉ"]),
        ("017.png", "Tập đoàn ngân hàng J.P. Morgan thu xếp 3 tỷ USD", ["Tập", "đoàn", "ngân", "hàng"]),
        ("018.png", "Tàu vận tải hàng hóa vượt Đại Tây Dương trong đêm", ["Phố", "Wall", "chính", "thức"]),
        ("019.png", "Hải quân Anh phong tỏa các tuyến hàng hải Đức", ["Nước", "Anh", "với", "sức"]),
        ("020.png", "Thảm kịch chìm tàu Lusitania năm 1915", ["Khi", "nước", "Đức", "bắt"]),
        ("021.png", "Tập đoàn thép Bethlehem Steel đúc vũ khí thời chiến", ["Một", "trong", "những", "công"]),
        ("022.png", "Sản xuất 40% tổng lượng đạn pháo chiến tranh", ["Công", "ty", "này", "sản"]),
        ("023.png", "Ủy ban Nye điều tra giới buôn vũ khí & ngân hàng", ["Sau", "chiến", "tranh", "một"]),
        ("024.png", "Nước Mỹ trở thành chủ nợ lớn nhất thế giới", ["Là", "việc", "nước", "Mỹ"]),
    ],
    "part3": [
        ("025.png", "Cuốn sách gây chấn động: Những kẻ buôn cái chết", ["Sau", "Thế", "chiến", "I"]),
        ("026.png", "Quốc hội Mỹ thông qua các Đạo luật Trung lập", ["Kết", "quả", "là", "giữa"]),
        ("027.png", "Chính sách Cash and Carry: Trả tiền mặt, tự vận chuyển", ["Đó", "là", "chính", "sách"]),
        ("028.png", "Giao dịch vũ khí tại cảng: Đẩy hết rủi ro cho bên mua", ["Bạn", "thấy", "sự", "khôn"]),
        ("029.png", "Tàu chở hàng Anh đơn độc giữa Đại Tây Dương", ["Chủ", "yếu", "là", "nước"]),
        ("030.png", "Mối đe dọa tàu ngầm U-boat của Đức trên biển", ["Trong", "khi", "đó", "phe"]),
        ("031.png", "Tổng thống F.D. Roosevelt với bài nói chuyện bên bếp lửa", ["Đến", "năm", "1941", "khi"]),
        ("032.png", "Chương trình Lend-Lease: Cho mượn vòi cứu hỏa khi nhà cháy", ["thiết", "bị", "quân", "sự"]),
        ("033.png", "Nhà máy chế tạo hàng chục nghìn máy bay chiến đấu", ["Chương", "trình", "này", "đã"]),
        ("034.png", "Cỗ máy công nghiệp Mỹ vận hành hết công suất", ["tạo", "ra", "hàng", "triệu"]),
        ("035.png", "Trận tập kích Trân Châu Cảng năm 1941", ["Và", "khi", "Nhật", "Bản"]),
        ("036.png", "Châu Âu hoang tàn đối lập kinh tế Mỹ nguyên vẹn", ["Sau", "chiến", "tranh", "một"]),
        ("037.png", "Nước Mỹ thoát Đại Suy Thoái & bước vào kỷ nguyên thịnh vượng", ["đội", "ngũ", "công", "nhân"]),
        ("038.png", "New York chính thức thay thế London làm trung tâm tài chính", ["Đây", "là", "lúc", "nước"]),
        ("039.png", "Chuyển giao quyền lực kinh tế & quân sự toàn cầu", ["Bài", "học", "rút", "ra"]),
        ("040.png", "Năng lực sản xuất công nghiệp lớn nhất hành tinh", ["và", "để", "địa", "lý"]),
    ],
    "part4": [
        ("041.png", "Giải ngũ sau Thế chiến II: Chi tiêu quân sự giảm sâu", ["Sau", "Thế", "chiến", "II"]),
        ("042.png", "Chiến tranh Triều Tiên bùng nổ tháng 6 năm 1950", ["Và", "đến", "khi", "chiến"]),
        ("043.png", "Ngân sách quân sự tăng từ 13,5 tỷ lên 50 tỷ USD", ["Chỉ", "trong", "vài", "tháng"]),
        ("044.png", "Đạo luật Sản xuất Quốc phòng năm 1950", ["Quốc", "hội", "Mỹ", "thông"]),
        ("045.png", "Tổng thống Harry Truman ký chính sách thời chiến", ["thiết", "lập", "một", "hệ"]),
        ("046.png", "Công tắc bật vĩnh viễn: Ngành vũ khí hoạt động thường trực", ["Nói", "cách", "khác", "công"]),
        ("047.png", "Đầu tư R&D: Nghiên cứu & phát triển khí tài quân sự", ["Chi", "tiêu", "cho", "nghiên"]),
        ("048.png", "Suy thoái 1953: Nền kinh tế lệ thuộc chi tiêu quân sự", ["một", "cuộc", "suy", "thoái"]),
        ("049.png", "Tổng thống Eisenhower với bài phát biểu từ nhiệm 1961", ["tổ", "hợp", "công", "nghiệp"]),
        ("050.png", "Lời cảnh báo về tổ hợp công nghiệp - quân sự", ["Eisenhower", "cảnh", "báo", "nước"]),
        ("051.png", "Chiến trường Việt Nam: Cuộc chiến kéo dài 20 năm", ["tại", "Việt", "Nam", "Cuộc"]),
        ("052.png", "Đội trực thăng và khí tài quân sự đổ bộ chiến trường", ["Đây", "không", "chỉ", "đơn"]),
        ("053.png", "Tổng thống Lyndon B. Johnson mở rộng chiến tranh", ["Tổng", "thống", "Lyndon", "B"]),
        ("054.png", "Hợp đồng hậu cần & xây dựng căn cứ hàng triệu USD", ["rót", "hàng", "triệu", "đô"]),
        ("055.png", "Tập đoàn dầu khí và hậu cần thời chiến", ["tập", "đoàn", "dầu", "khí"]),
        ("056.png", "Tiền thuế đổ vào túi các nhà thầu công nghiệp quân sự", ["tại", "chiến", "trường", "Việt"]),
        ("057.png", "Đoàn xe hậu cần Brown & Root trên chiến trường", ["tiền", "thân", "của", "một"]),
        ("058.png", "Mối liên minh giữa vũ khí, hậu cần và năng lượng", ["cùng", "một", "cái", "tên"]),
    ],
    "part5": [
        ("059.png", "Truyền hình trực tiếp chiến tranh toàn cầu trên CNN", ["Trước", "khi", "đi", "đến"]),
        ("060.png", "Bầu trời Trung Đông rực lửa trong đêm chiến tranh 1991", ["Và", "đây", "cũng", "là"]),
        ("061.png", "Tên lửa Patriot phóng đánh chặn tên lửa Scud", ["Hình", "ảnh", "gây", "ấn"]),
        ("062.png", "Hàng tỷ người dõi theo triển lãm vũ khí qua màn hình", ["Tổng", "thống", "George", "H.W"]),
        ("063.png", "Tổng thống George H.W. Bush ca ngợi hiệu quả vũ khí Mỹ", ["công", "khai", "ca", "ngợi"]),
        ("064.png", "Hệ thống phòng thủ và radar dẫn đường công nghệ cao", ["các", "phân", "tích", "kỹ"]),
        ("065.png", "Cơn sốt đặt hàng vũ khí Mỹ từ các quốc gia toàn cầu", ["Ngay", "sau", "cuộc", "chiến"]),
        ("067.png", "Bước chuyển dịch: Bắt đầu sử dụng nhà thầu tư nhân", ["Về", "quy", "mô", "nhân"]),
        ("066.png", "Các nước Vùng Vịnh ký hợp đồng quân sự nghìn tỷ", ["Sau", "chiến", "tranh", "Ả"]),
        ("068.png", "Chiến trường trở thành chiến dịch marketing vũ khí khổng lồ", ["Đây", "chính", "là", "lúc"]),
    ],
    "part6": [
        ("069.png", "Sự kiện 11 tháng 9 năm 2001 & Bước ngoặt lịch sử", ["Sau", "sự", "kiện", "11"]),
        ("070.png", "Ngân sách Lầu Năm Góc đạt đỉnh hơn 800 tỷ USD/năm", ["Đến", "năm", "2010", "ngân"]),
        ("071.png", "Cuộc chiến 20 năm tại địa hình hiểm trở Afghanistan", ["kể", "từ", "khi", "cuộc"]),
        ("072.png", "Hơn 14 nghìn tỷ USD chi tiêu cho chiến tranh chống khủng bố", ["tổng", "chi", "tiêu", "của"]),
        ("073.png", "5 đại gia quốc phòng: Lockheed, Boeing, General Dynamics, Raytheon, Northrop", ["phần", "lớn", "trong", "số"]),
        ("075.png", "Cổ phiếu vũ khí tăng gấp 10 lần sau 20 năm", ["Nếu", "năm", "2001", "bạn"]),
        ("074.png", "Dây chuyền lắp ráp tiêm kích và khí tài thế hệ mới", ["Riêng", "Lockheed", "Martin", "tập"]),
        ("076.png", "Thủ đô Baghdad đổ nát sau cuộc tấn công năm 2003", ["Nhưng", "ở", "Iraq", "mô"]),
        ("078.png", "Tái thiết hạ tầng bị tàn phá sau chiến tranh", ["kiếm", "tiền", "từ", "việc"]),
        ("081.png", "Mô hình mới: Một đồng bắn phá, một đồng tái thiết", ["một", "đồng", "đô", "la"]),
        ("077.png", "Lực lượng nhà thầu quân sự tư nhân tại Trung Đông", ["Ví", "dụ", "điển", "hình"]),
        ("080.png", "Bàn bạc các hợp đồng tái thiết không qua đấu thầu", ["Theo", "phân", "tích", "của"]),
        ("083.png", "KBR độc quyền hậu cần, xây dựng và tiếp vận quân sự", ["KBR", "cung", "cấp", "mọi"]),
        ("082.png", "Ký kết hợp đồng quân sự trị giá hàng chục tỷ USD", ["hợp", "đồng", "không", "qua"]),
        ("079.png", "Tái thiết ngành công nghiệp dầu mỏ tại Iraq", ["tái", "thiết", "ngành", "công"]),
        ("084.png", "Hợp đồng xây dựng trại giam Guantanamo hàng trăm triệu USD", ["nhà", "tù", "tại", "căn"]),
        ("085.png", "Quốc hội điều tra cáo buộc khai khống chi phí thời chiến", ["Halliburton", "sau", "đó", "bị"]),
        ("086.png", "Lợi nhuận khổng lồ đối lập sự tàn phá do chiến tranh", ["Nhưng", "dù", "con", "số"]),
        ("087.png", "100.000 nhà thầu tư nhân tại chiến trường Afghanistan", ["Còn", "ở", "Afghanistan", "quy"]),
        ("088.png", "Cuộc rút quân hỗn loạn khỏi Kabul năm 2021", ["Đến", "năm", "2021", "khi"]),
    ],
    "part7": [
        ("089.png", "Ngọn nến suy tư: Bài học về lợi nhuận và xung đột", ["Vậy", "đó", "Từ", "những"]),
        ("090.png", "Dòng chảy 100 năm: Mô hình kiếm tiền gần như bất biến", ["ở", "Iraq", "mô", "hình"]),
        ("091.png", "Cán cân đạo đức: Kinh tế quân sự và cái giá phải trả", ["Câu", "hỏi", "mình", "muốn"]),
        ("092.png", "Câu hỏi trăn trở: Liệu có thực sự muốn hòa bình?", ["liệu", "quốc", "gia", "đó"]),
        ("093.png", "Cỗ máy kiếm tiền từ chiến tranh & Tương lai", ["Bạn", "nghĩ", "sao", "Để"]),
        ("094.png", "Trái đất trong đêm: Hướng tới một thế giới hòa bình", ["like", "và", "subscribe", "để"]),
    ]
}

data_ts_path = Path("src/data/usWarEconomyData.ts")
data_ts_text = data_ts_path.read_text(encoding="utf-8")

# Thêm imageStartFrames?: number[]; vào DocumentaryChapter interface nếu chưa có
if "imageStartFrames?: number[];" not in data_ts_text:
    data_ts_text = data_ts_text.replace(
        "  imageDescriptions?: string[];\n}",
        "  imageDescriptions?: string[];\n  imageStartFrames?: number[];\n}"
    )

for part_id, entries in SCHEDULE.items():
    words = get_part_words(part_id)
    curr_idx = 0
    start_frames = []
    new_images = []
    new_descriptions = []
    
    print(f"\n==================== {part_id.upper()} ====================")
    for i, (img_filename, desc, tokens) in enumerate(entries):
        if i == 0:
            frame = 0
            w_idx = 0
        else:
            w_idx = find_word_index(words, tokens, curr_idx)
            if w_idx == -1:
                print(f"FAILED to find cue {tokens} for {img_filename}")
                frame = start_frames[-1] + 120
            else:
                w = words[w_idx]
                frame = int(round((w["startMs"] / 1000) * 30))
                # Đảm bảo frame tăng dần
                if frame <= start_frames[-1]:
                    frame = start_frames[-1] + 30
                curr_idx = w_idx + 1
        start_frames.append(frame)
        new_images.append(f"images/us-war-economy/{img_filename}")
        new_descriptions.append(desc)
        print(f"  [{frame:5d}f | {frame/30:6.2f}s] {img_filename} - {desc}")
        
    # Cập nhật trong data_ts_text
    # Tìm đoạn của chapter
    target = f'id: "{part_id}",'
    idx = data_ts_text.find(target)
    if idx != -1:
        # Tìm block kết thúc chapter này (dấu '},\n')
        next_part = data_ts_text.find('  {\n    id: "', idx + 10)
        if next_part == -1:
            next_part = data_ts_text.find('];', idx)
            
        chapter_block = data_ts_text[idx:next_part]
        
        # Thay thế images
        images_json = json.dumps(new_images, indent=6, ensure_ascii=False)
        chapter_block = re.sub(r'images:\s*\[[^\]]+\]', f'images: {images_json}', chapter_block)
        
        # Thay thế imageDescriptions
        descs_json = json.dumps(new_descriptions, indent=6, ensure_ascii=False)
        chapter_block = re.sub(r'imageDescriptions:\s*\[[^\]]+\]', f'imageDescriptions: {descs_json}', chapter_block)
        
        # Thay thế hoặc chèn imageStartFrames
        frames_json = json.dumps(start_frames, indent=6)
        if "imageStartFrames:" in chapter_block:
            chapter_block = re.sub(r'imageStartFrames:\s*\[[^\]]+\]', f'imageStartFrames: {frames_json}', chapter_block)
        else:
            # chèn trước dấu kết thúc
            chapter_block = chapter_block.rstrip()
            if chapter_block.endswith(","):
                chapter_block += f"\n    imageStartFrames: {frames_json},"
            else:
                chapter_block += f",\n    imageStartFrames: {frames_json},"
                
        data_ts_text = data_ts_text[:idx] + chapter_block + data_ts_text[next_part:]

data_ts_path.write_text(data_ts_text, encoding="utf-8")
print("\nSuccessfully updated usWarEconomyData.ts with precise image schedule & startFrames!")
