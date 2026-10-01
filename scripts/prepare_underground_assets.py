# -*- coding: utf-8 -*-
"""
Script chuẩn bị cấu trúc 8 chương và metadata 63 ảnh cho phim tài liệu:
'Cuộc Sống Bí Mật Dưới Lòng Đất: Mạng Lưới Nấm Kết Nối Cả Khu Rừng' (16:9 Widescreen Documentary).
Xuất ra src/data/underground_chapters.json.
"""

import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# 63 Mô tả cảnh tiếng Việt cô đọng, sắc sảo cho từng khung hình (Badge hiển thị trên video)
SCENE_DESCRIPTIONS_VN = [
    # Mở đầu (001 - 007)
    "Khu rừng già nguyên sinh tĩnh lặng trong làn sương sớm mai",
    "Mạng lưới liên lạc phát sáng kỳ diệu ẩn sâu dưới rễ cây",
    "Thế giới đông đúc dưới lòng đất với sinh vật và sợi nấm chen chúc",
    "Một thìa đất rừng chứa đựng lượng sinh vật nhiều hơn cả nhân loại",
    "Tán rừng nhìn từ trên cao biến hóa thành sơ đồ mạng lưới gỗ",
    "Cây nấm nhỏ bé trồi lên từ thảm rêu ẩm ướt hé lộ bí mật",
    "Cây phả hệ sự sống: Nấm nằm tách biệt và gần với động vật",

    # Phần 1: Cây nấm chỉ là phần nổi (008 - 016)
    "Cây nấm trên mặt đất chỉ là phần quả nổi của tảng băng chìm",
    "Mạng lưới sợi nấm khổng lồ lan tỏa ngút ngàn trong lòng đất tối",
    "Một mét khối đất rừng chứa hàng chục cây số sợi nấm đan xen",
    "Nấm không phải thực vật: Không có diệp lục để tự quang hợp",
    "Sơ đồ di truyền: Nấm có quan hệ gần gũi với động vật hơn cây xanh",
    "Nhà thực vật học Albert Frank bên kính hiển vi quang học năm 1885",
    "Người nông dân khoe giỏ nấm cục quý hiếm cạnh vườn cây sai quả",
    "Sợi nấm quấn quanh khúc gỗ mục hút dưỡng chất nuôi cơ thể",
    "Sợi nấm tìm kiếm và bắt tay cộng sinh cùng đầu rễ cây rừng",

    # Phần 2: Một cuộc trao đổi dưới lòng đất (017 - 021)
    "Chín phần mười loài cây trên cạn gắn bó cộng sinh cùng nấm rễ",
    "Lá cây đón ánh nắng mặt trời quang hợp tạo ra dòng đường ngọt",
    "Sợi nấm luồn lách vào khe đất li ti hút nước và khoáng chất phốt pho",
    "Dòng trao đổi hai chiều công bằng: Cây gửi đường, nấm trả nước và khoáng",
    "Thực vật cổ đại bước chân lên cạn nhờ cuộc bắt tay cùng nấm 400 triệu năm trước",

    # Phần 3: Khi mạng lưới nối liền cả khu rừng (022 - 034)
    "Mạng lưới sợi nấm nối liền rễ của muôn vàn cây cối thành mạng lưới chung",
    "Sơ đồ 'mạng lưới gỗ' kết nối toàn bộ khu rừng như internet sống",
    "Giáo sư Suzanne Simard lội rừng thu thập mẫu đất nghiên cứu nấm",
    "Thí nghiệm đánh dấu đồng vị carbon theo dõi dòng dinh dưỡng dưới lòng đất",
    "Máy đo phát hiện nguyên tử carbon di chuyển từ cây bạch dương sang linh sam",
    "Cây con nhỏ bé dưới bóng râm nhận đường tiếp sức từ mạng lưới nấm",
    "Cây mẹ cổ thụ xòe tán rộng làm trạm trung chuyển nuôi dưỡng đàn con",
    "Cây mẹ gửi tín hiệu cảnh báo và dinh dưỡng cho cây non quanh vùng",
    "Đàn rệp tấn công lá cây khiến cây phát tín hiệu cầu cứu hóa học",
    "Tín hiệu xung điện và hóa học lan truyền thần tốc qua sợi nấm",
    "Cây bên cạnh nhận tín hiệu lập tức kích hoạt chất phòng vệ xua đuổi sâu",
    "Khu rừng như một thực thể sống thống nhất giao tiếp và bảo bọc nhau",
    "Bản đồ mô hình mạng lưới gỗ: Tranh luận khoa học về mức độ chia sẻ tự nguyện",

    # Phần 4: Mạng lưới cũng có thể mang tin xấu (035 - 046)
    "Mạng lưới nấm không phải xứ sở thần tiên: Cạnh tranh và toan tính khốc liệt",
    "Sợi nấm đóng vai trò nhà môi giới lấy hoa hồng từ mọi giao dịch",
    "Nấm chặn đường dinh dưỡng của cây nếu không được trả đủ đường",
    "Loài cây củ đen tiết chất độc qua sợi nấm triệt hạ các cây đối thủ",
    "Cây láng giềng héo rũ vì chất độc lan truyền ngầm dưới đất",
    "Cây hoa ống khói ma trắng muốt không lá, sống ký sinh hút trộm đường",
    "Hoa ống khói ma cắm vòi hút cạn dưỡng chất từ sợi nấm ngầm",
    "Bào tử nấm gây bệnh di chuyển âm thầm theo đường cao tốc sợi nấm",
    "Một cây nhiễm bệnh khiến cả cụm cây xung quanh bị lây lan nhanh chóng",
    "Mạng lưới hai mặt: Vừa kết nối sẻ chia, vừa là công cụ cạnh tranh sinh tồn",
    "Hai góc nhìn đối lập: Rừng như cơ thể thống nhất hay chiến trường toan tính",
    "Tự nhiên phức tạp và kỳ diệu hơn bất kỳ câu chuyện cổ tích nào",

    # Phần 5: Sinh vật lớn nhất từng được biết đến (047 - 052)
    "Quái vật nấm Armillaria khổng lồ ẩn mình dưới rừng quốc gia Oregon",
    "Khu rừng ngút ngàn rộng 9 cây số vuông thực chất chỉ là MỘT cá thể nấm",
    "Mạng lưới sợi nấm lan tỏa dưới đất nặng hàng trăm tấn, sống hơn 2.000 năm",
    "Cá thể nấm cổ xưa nảy mầm từ thời kỳ đế chế La Mã còn thịnh vượng",
    "Cụm nấm màu mật ong trồi lên mặt đất vào mùa thu hé lộ quái vật ngầm",
    "Cú sốc nhận thức: Sinh vật lớn nhất Trái Đất không phải cá voi xanh mà là nấm",

    # Phần 6: Vì sao điều này quan trọng với chúng ta (053 - 057)
    "Mạng lưới nấm lưu giữ hàng tỷ tấn carbon dưới đất, bảo vệ khí hậu Trái Đất",
    "Nấm khóa chặt khí thải nhà kính trong đất rừng lâu hơn nhiều lần thân cây",
    "Máy ủi xới tung đất làm đứt gãy mạng lưới nấm, giải phóng khí carbon",
    "Khu rừng cằn cỗi mất đi sức đề kháng khi mạng lưới ngầm bị phá hủy",
    "Tương lai nông nghiệp tái sinh: Phục hồi mạng lưới nấm để chữa lành đất đai",

    # Lời kết (058 - 063)
    "Dừng chân ngắm nhìn thảm lá khô tĩnh lặng dưới tán rừng chiều",
    "Lắng nghe nhịp đập thì thầm của hàng triệu kết nối dưới chân",
    "Khung hình nghệ thuật: Thế giới bí mật dưới lòng đất phát sáng kỳ ảo",
    "Cây cối và nấm nương tựa nhau tạo nên bức tranh hài hòa của tự nhiên",
    "Con người chiêm nghiệm sự gắn kết giữa muôn loài trên hành tinh xanh",
    "Khép lại hành trình: Lời tri ân gửi tới mạng lưới sự sống diệu kỳ"
]

CHAPTER_CONFIGS = [
    {
        "id": "part1",
        "chapterNumber": 1,
        "partLabel": "MỞ ĐẦU",
        "historicalEra": "HỆ SINH THÁI NGẦM",
        "title": "Mạng Lưới Dưới Chân Bạn",
        "subtitle": "Mạng lưới liên lạc phức tạp hơn internet nằm sâu dưới lớp đất rừng",
        "imageRange": (1, 7),
    },
    {
        "id": "part2",
        "chapterNumber": 2,
        "partLabel": "PHẦN 1",
        "historicalEra": "NẤM HỌC ĐỘC LẬP",
        "title": "Cây Nấm Chỉ Là Phần Nổi",
        "subtitle": "Mạng lưới sợi nấm khổng lồ và cái bắt tay lịch sử 400 triệu năm",
        "imageRange": (8, 16),
    },
    {
        "id": "part3",
        "chapterNumber": 3,
        "partLabel": "PHẦN 2",
        "historicalEra": "CỘNG SINH RỄ CÂY",
        "title": "Một Cuộc Trao Đổi Dưới Lòng Đất",
        "subtitle": "Cây trả đường, nấm trả nước và khoáng chất nuôi sống khu rừng",
        "imageRange": (17, 21),
    },
    {
        "id": "part4",
        "chapterNumber": 4,
        "partLabel": "PHẦN 3",
        "historicalEra": "WOOD WIDE WEB",
        "title": "Khi Mạng Lưới Nối Liền Cả Khu Rừng",
        "subtitle": "Internet của rừng già: Cây mẹ truyền chất dinh dưỡng và phát tín hiệu cảnh báo",
        "imageRange": (22, 34),
    },
    {
        "id": "part5",
        "chapterNumber": 5,
        "partLabel": "PHẦN 4",
        "historicalEra": "MẶT TỐI MẠNG LƯỚI",
        "title": "Mạng Lưới Cũng Có Thể Mang Tin Xấu",
        "subtitle": "Những kẻ nghe lén, cướp đường và phát tán độc tố hóa học",
        "imageRange": (35, 46),
    },
    {
        "id": "part6",
        "chapterNumber": 6,
        "partLabel": "PHẦN 5",
        "historicalEra": "QUÁI VẬT OREGON",
        "title": "Sinh Vật Lớn Nhất Từng Được Biết Đến",
        "subtitle": "Cá thể nấm Armillaria khổng lồ 9 cây số vuông nặng hàng trăm tấn",
        "imageRange": (47, 52),
    },
    {
        "id": "part7",
        "chapterNumber": 7,
        "partLabel": "PHẦN 6",
        "historicalEra": "BẢO VỆ HÀNH TINH",
        "title": "Vì Sao Điều Này Quan Trọng Với Chúng Ta",
        "subtitle": "Kho dự trữ carbon khổng lồ và tương lai phục hồi đất đai toàn cầu",
        "imageRange": (53, 57),
    },
    {
        "id": "part8",
        "chapterNumber": 8,
        "partLabel": "LỜI KẾT",
        "historicalEra": "BÀI HỌC THIÊN NHIÊN",
        "title": "Thế Giới Dưới Chân Chúng Ta",
        "subtitle": "Vẻ đẹp của sự tĩnh lặng và mạng lưới kết nối kỳ diệu của sự sống",
        "imageRange": (58, 63),
    },
]

def main():
    tts_txt_path = Path("kịch bản/Cuộc sống bí mật dưới lòng đất/loi-doc-tts-mang-luoi-nam.txt")
    if not tts_txt_path.exists():
        print(f"❌ Không tìm thấy {tts_txt_path}")
        return

    content = tts_txt_path.read_text(encoding="utf-8")
    sections_raw = re.split(r"\n(?=\[[^\]]+\])", content.strip())

    if len(sections_raw) != 8:
        print(f"⚠️ Cảnh báo: Tìm thấy {len(sections_raw)} phần, dự kiến 8 phần.")

    chapters = []
    for idx, (cfg, sec_text) in enumerate(zip(CHAPTER_CONFIGS, sections_raw)):
        lines = sec_text.strip().split("\n")
        header = lines[0].strip()
        paras = [l.strip() for l in lines[1:] if l.strip()]
        full_text = " ".join(paras)
        words = full_text.split()

        start_img, end_img = cfg["imageRange"]
        img_paths = [f"images/mang-luoi-nam/{i:03d}.png" for i in range(start_img, end_img + 1)]
        descs = [SCENE_DESCRIPTIONS_VN[i - 1] for i in range(start_img, end_img + 1)]

        ch_data = {
            "id": cfg["id"],
            "chapterNumber": cfg["chapterNumber"],
            "partLabel": cfg["partLabel"],
            "historicalEra": cfg["historicalEra"],
            "title": cfg["title"],
            "subtitle": cfg["subtitle"],
            "header": header,
            "audioSrc": f"audio/underground_{cfg['id']}.wav",
            "paragraphs": paras,
            "script": full_text,
            "word_count": len(words),
            "images": img_paths,
            "imageDescriptions": descs,
        }
        chapters.append(ch_data)

    out_file = Path("src/data/underground_chapters.json")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(chapters, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"✅ Đã tạo thành công {out_file} với {len(chapters)} chương và 63 ảnh.")
    for ch in chapters:
        print(f"  - [{ch['id']}] {ch['partLabel']}: {ch['title']} ({len(ch['images'])} ảnh, {ch['word_count']} từ)")

if __name__ == "__main__":
    main()
