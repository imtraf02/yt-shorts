import json

with open("public/audio/world-time-documentary/sentences_manifest.json", "r", encoding="utf-8") as f:
    sentences = json.load(f)

# Carefully selected emotion and action sequence matching each sentence's topic:
pose_map = [
    # Part 1: Giờ địa phương xưa & Mặt Trời (S001 - S008)
    "ngoi-nghieng-vay-chao",  # S001: Mở đầu, chào hỏi các múi giờ toàn cầu
    "ngoi-quy-hao-huc",       # S002: Điều kỳ lạ về mốc giờ chung
    "suy-ngam",              # S003: Lịch sử loài người không có giờ thế giới
    "ngoi-doc-sach",         # S004: Quan sát Mặt Trời giữa trưa
    "ngoi-ghi-chep",         # S005: Trái Đất quay 360 độ 24h, 15 độ/giờ
    "giat-minh",             # S006: Hai thành phố lệch nhau vài phút 12h trưa
    "ngoi-thu-gian",         # S007: Đi bộ cưỡi ngựa vài phút chẳng sao
    "quyet-tam",             # S008: Mọi thứ thay đổi khi đi nhanh hơn giờ địa phương

    # Part 2: Hàng hải & Greenwich (S009 - S016)
    "thuyet-minh",           # S009: Ngành hàng hải trên biển
    "ngoi-xep-bang-suy-ngam",# S010: Khó khăn xác định kinh độ ngoài đại dương
    "nay-y-tuong",           # S011: Lệch 1 giờ là lệch 15 độ kinh tuyến
    "ngoi-thuyet-minh",      # S012: Thành lập Đài Greenwich 1675
    "ngoi-doc-sach",         # S013: Xuất bản Nautical Almanac 1767
    "khoanh-tay",            # S014: Greenwich thành mốc quen thuộc
    "ngac-nhien",            # S015: Quả cầu báo giờ 1h chiều trên sông Thames
    "lang-nghe",             # S016: Thời gian thành tín hiệu phân phối

    # Part 3: Đường sắt & Điện báo (S017 - S024)
    "giat-minh",             # S017: Đường sắt xuất hiện, nguy cơ va chạm tàu!
    "lo-lang",               # S018: Đi vài giờ đến nơi nhưng đồng hồ lại lệch
    "khoanh-tay",            # S019: Hàng chục giờ địa phương gây rối loạn
    "quyet-tam",             # S020: Great Western Railway áp dụng giờ London
    "thuyet-minh",           # S021: Lái tàu và ga cần chung một giờ
    "nay-y-tuong",           # S022: Điện báo truyền tín hiệu tức thì
    "ngoi-thuyet-minh",      # S023: Tín hiệu điện báo Greenwich lan rộng
    "an-mung",               # S024: Bước ngoặt thành hạ tầng quốc gia

    # Part 4: Vùng giờ & Sandford Fleming (S025 - S032)
    "ngoi-lo-lang",          # S025: Bắc Mỹ rối loạn hàng trăm giờ
    "ngoi-xep-bang-suy-ngam",# S026: Giao cho William Frederick Allen
    "nay-y-tuong",           # S027: Gom thành các vùng cách nhau 15 độ
    "an-mung",               # S028: 18/11/1883 áp dụng Standard Railway Time
    "vui-suong",             # S029: Thành phố hào hứng theo hệ thống mới
    "khoanh-tay",            # S030: Có người lo mất quyền địa phương
    "ngoi-doc-sach",         # S031: Sandford Fleming vận động 24 vùng giờ
    "thuyet-minh",           # S032: Thành tựu của cả tập thể nhiều năm

    # Part 5: Hội nghị Washington 1884 (S033 - S040)
    "ngoi-chap-tay",         # S033: 41 đại biểu 25 quốc gia họp tại Washington
    "suy-ngam",              # S034: Trước đó mỗi nước dùng kinh tuyến riêng
    "nay-y-tuong",           # S035: Lợi thế lớn của kinh tuyến Greenwich
    "an-mung",               # S036: Chọn Greenwich làm kinh tuyến gốc 0-24h
    "giat-minh",             # S037: Chi tiết hay hiểu nhầm: không ép 24 múi giờ dân sự
    "ngoi-thuyet-minh",      # S038: Các nước tự chọn giờ theo mốc Greenwich
    "ngoi-ghi-chep",         # S039: Đường biên múi giờ uốn lượn theo biên giới
    "ngoi-quy-hao-huc",      # S040: Ngôn ngữ chung cho cả nhân loại

    # Part 6: Độ quay Trái Đất & Đồng hồ nguyên tử (S041 - S046)
    "suy-ngam",              # S041: Trái Đất quay không hoàn toàn đều!
    "ngac-nhien",            # S042: Độ dài ngày thiên văn thay đổi rất nhỏ
    "nay-y-tuong",           # S043: Đồng hồ nguyên tử ổn định hơn hành tinh
    "ngoi-doc-sach",         # S044: 1967 định nghĩa giây SI theo cesium-133
    "quyet-tam",             # S045: Không còn đếm vòng quay Trái Đất
    "thuyet-minh",           # S046: Giờ nguyên tử quốc tế TAI của BIPM

    # Part 7: Giờ UTC & Giây nhuận (S047 - S052)
    "ngoi-thuyet-minh",      # S047: UTC lệch nguyên giây với TAI
    "khoanh-tay",            # S048: Giờ dân sự là UTC cộng trừ độ lệch
    "ngoi-xep-bang-suy-ngam",# S049: So sánh UTC với UT1 Mặt Trời
    "nay-y-tuong",           # S050: Quy tắc thêm giây nhuận khi lệch 0.9s
    "ngac-nhien",            # S051: 27 giây nhuận từ 1972 đến nay
    "lo-lang",               # S052: Giây nhuận gây phiền toái cho mạng máy tính

    # Part 8: UTC(k) & Vệ tinh GPS (S053 - S056)
    "suy-ngam",              # S053: Không có chiếc đồng hồ duy nhất giấu kín
    "ngoi-ghi-chep",         # S054: Các viện đo lường duy trì UTC(k)
    "ngoi-quy-hao-huc",      # S055: Vệ tinh GPS phát tín hiệu cực chính xác
    "thuyet-minh",           # S056: Tín hiệu đi qua Internet vào điện thoại

    # Part 9: Bản đồ múi giờ & Cơ sở dữ liệu IANA (S057 - S060)
    "khoanh-tay",            # S057: UTC là nền, luật giờ dân sự từng nước bên trên
    "suy-ngam",              # S058: Có nơi dùng độ lệch 30 phút hoặc 45 phút
    "ngoi-doc-sach",         # S059: Cơ sở dữ liệu IANA Time Zone Database
    "nay-y-tuong",           # S060: Tự động đổi giờ trên hàng triệu điện thoại

    # Part 10: Tương lai thời gian & Kết luận (S061 - S064)
    "lo-lang",               # S061: Giây nhuận gây khó cho hạ tầng số
    "quyet-tam",             # S062: Quyết định nới giới hạn trước năm 2035
    "ngoi-xep-bang-suy-ngam",# S063: Chúng ta dùng cùng một giây và cùng hệ quy chiếu
    "cam-on",                # S064: Đúc kết từ bóng Mặt Trời đến GPS, cảm ơn & vẫy chào
]

current_frame = 0
timeline = []

for i, s in enumerate(sentences):
    pose = pose_map[i] if i < len(pose_map) else "thuyet-minh"
    timeline.append({
        "from": current_frame,
        "pose": pose,
        "sentenceId": s["id"],
        "duration": s["durationInFrames"],
    })
    current_frame += s["durationInFrames"]

print(f"Total timeline segments: {len(timeline)}")
print(f"End frame: {current_frame}")

# Format TypeScript output
ts_code = "const TRA_XANH_WORLD_TIME_TIMELINE: TraXanhTimelineSegment[] = [\n"
for seg in timeline:
    ts_code += f'  {{ from: {seg["from"]}, pose: "{seg["pose"]}" }}, // {seg["sentenceId"]} ({seg["duration"]}f)\n'
ts_code += "];\n"

with open("scratch/timeline_output.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Saved scratch/timeline_output.ts")
