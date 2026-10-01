# -*- coding: utf-8 -*-
import json
from pathlib import Path

DESCRIPTIONS = {
    "part1": [
        "Tàn tích châu Âu sau chiến tranh",
        "Châu Âu hoang tàn & Công nghiệp Mỹ bùng nổ",
        "Tượng Nữ thần Tự do & Đoàn tàu vận tải hàng hóa",
        "Bảng điện tử Phố Wall liên tục lập đỉnh",
        "Bản đồ chiến sự: Dòng tiền và các điểm nóng toàn cầu",
        "Chiến trường hiện đại: Sa mạc và bão cát",
        "Biểu tượng đại bàng vàng trên hồ sơ quốc gia",
        "Dây chuyền sản xuất đạn pháo thời chiến"
    ],
    "part2": [
        "Tổng thống Woodrow Wilson tuyên bố trung lập 1914",
        "Phố phường New York đón tin chiến sự châu Âu 1914",
        "Chiến hào bùn lầy đẫm máu tại châu Âu",
        "Công nhân lắp ráp súng trường tại công xưởng Mỹ",
        "Cảng biển Mỹ bốc dỡ vũ khí xuất khẩu",
        "Xuất khẩu quân sự tăng vọt hơn 30 lần",
        "Quân đội Anh tiếp nhận súng trường Enfield từ Mỹ",
        "Giới tài phiệt Phố Wall: Nhà tài trợ chính chiến tranh",
        "Tập đoàn ngân hàng J.P. Morgan thu xếp 3 tỷ USD",
        "Tàu vận tải hàng hóa vượt Đại Tây Dương trong đêm",
        "Hải quân Anh phong tỏa các tuyến hàng hải Đức",
        "Thảm kịch chìm tàu Lusitania năm 1915",
        "Tập đoàn thép Bethlehem Steel đúc vũ khí thời chiến",
        "Sản xuất 40% tổng lượng đạn pháo chiến tranh",
        "Ủy ban Nye điều tra giới buôn vũ khí & ngân hàng",
        "Nước Mỹ trở thành chủ nợ lớn nhất thế giới"
    ],
    "part3": [
        "Cuốn sách gây chấn động: Những kẻ buôn cái chết",
        "Quốc hội Mỹ thông qua các Đạo luật Trung lập",
        "Chính sách Cash and Carry: Trả tiền mặt, tự vận chuyển",
        "Giao dịch vũ khí tại cảng: Đẩy hết rủi ro cho bên mua",
        "Tàu chở hàng Anh đơn độc giữa Đại Tây Dương",
        "Mối đe dọa tàu ngầm U-boat của Đức trên biển",
        "Tổng thống F.D. Roosevelt với bài nói chuyện bên bếp lửa",
        "Chương trình Lend-Lease: Cho mượn vòi cứu hỏa khi nhà cháy",
        "Nhà máy chế tạo hàng chục nghìn máy bay chiến đấu",
        "Cỗ máy công nghiệp Mỹ vận hành hết công suất",
        "Trận tập kích Trân Châu Cảng năm 1941",
        "Châu Âu hoang tàn đối lập kinh tế Mỹ nguyên vẹn",
        "Nước Mỹ thoát Đại Suy Thoái & bước vào kỷ nguyên thịnh vượng",
        "New York chính thức thay thế London làm trung tâm tài chính",
        "Chuyển giao quyền lực kinh tế & quân sự toàn cầu",
        "Năng lực sản xuất công nghiệp lớn nhất hành tinh"
    ],
    "part4": [
        "Giải ngũ sau Thế chiến II: Chi tiêu quân sự giảm sâu",
        "Chiến tranh Triều Tiên bùng nổ tháng 6 năm 1950",
        "Ngân sách quân sự tăng từ 13,5 tỷ lên 50 tỷ USD",
        "Đạo luật Sản xuất Quốc phòng năm 1950",
        "Tổng thống Harry Truman ký chính sách thời chiến",
        "Công tắc bật vĩnh viễn: Ngành vũ khí hoạt động thường trực",
        "Đầu tư R&D: Nghiên cứu & phát triển khí tài quân sự",
        "Suy thoái 1953: Nền kinh tế lệ thuộc chi tiêu quân sự",
        "Tổng thống Eisenhower với bài phát biểu từ nhiệm 1961",
        "Lời cảnh báo về tổ hợp công nghiệp - quân sự",
        "Chiến trường Việt Nam: Cuộc chiến kéo dài 20 năm",
        "Đội trực thăng và khí tài quân sự đổ bộ chiến trường",
        "Tổng thống Lyndon B. Johnson mở rộng chiến tranh",
        "Hợp đồng hậu cần & xây dựng căn cứ hàng triệu USD",
        "Tập đoàn dầu khí và hậu cần thời chiến",
        "Tiền thuế đổ vào túi các nhà thầu công nghiệp quân sự",
        "Đoàn xe hậu cần Brown & Root trên chiến trường",
        "Mối liên minh giữa vũ khí, hậu cần và năng lượng"
    ],
    "part5": [
        "Truyền hình trực tiếp chiến tranh toàn cầu trên CNN",
        "Bầu trời Trung Đông rực lửa trong đêm chiến tranh 1991",
        "Tên lửa Patriot phóng đánh chặn tên lửa Scud",
        "Hàng tỷ người dõi theo triển lãm vũ khí qua màn hình",
        "Tổng thống George H.W. Bush ca ngợi hiệu quả vũ khí Mỹ",
        "Hệ thống phòng thủ và radar dẫn đường công nghệ cao",
        "Cơn sốt đặt hàng vũ khí Mỹ từ các quốc gia toàn cầu",
        "Các nước Vùng Vịnh ký hợp đồng quân sự nghìn tỷ",
        "Bước chuyển dịch: Bắt đầu sử dụng nhà thầu tư nhân",
        "Chiến trường trở thành chiến dịch marketing vũ khí khổng lồ"
    ],
    "part6": [
        "Sự kiện 11 tháng 9 năm 2001 & Bước ngoặt lịch sử",
        "Ngân sách Lầu Năm Góc đạt đỉnh hơn 800 tỷ USD/năm",
        "Cuộc chiến 20 năm tại địa hình hiểm trở Afghanistan",
        "Hơn 14 nghìn tỷ USD chi tiêu cho chiến tranh chống khủng bố",
        "5 đại gia quốc phòng: Lockheed, Boeing, General Dynamics, Raytheon, Northrop",
        "Dây chuyền lắp ráp tiêm kích và khí tài thế hệ mới",
        "Cổ phiếu vũ khí tăng gấp 10 lần sau 20 năm",
        "Thủ đô Baghdad đổ nát sau cuộc tấn công năm 2003",
        "Lực lượng nhà thầu quân sự tư nhân tại Trung Đông",
        "Mô hình mới: Một đồng bắn phá, một đồng tái thiết",
        "Tái thiết ngành công nghiệp dầu mỏ tại Iraq",
        "Các hợp đồng tái thiết không qua đấu thầu cạnh tranh",
        "Kiếm lợi từ cả phá hủy lẫn phục hồi hậu chiến",
        "Mối quan hệ giữa quan chức và tập đoàn Halliburton & KBR",
        "KBR độc quyền hậu cần, xây dựng và tiếp vận quân sự",
        "Hợp đồng xây dựng trại giam Guantanamo hàng trăm triệu USD",
        "Quốc hội điều tra cáo buộc khai khống chi phí thời chiến",
        "Lợi nhuận khổng lồ đối lập sự tàn phá do chiến tranh",
        "100.000 nhà thầu tư nhân tại chiến trường Afghanistan",
        "Cuộc rút quân hỗn loạn khỏi Kabul năm 2021"
    ],
    "part7": [
        "Ngọn nến suy tư: Bài học về lợi nhuận và xung đột",
        "Dòng chảy 100 năm: Mô hình kiếm tiền gần như bất biến",
        "Cán cân đạo đức: Kinh tế quân sự và cái giá phải trả",
        "Câu hỏi trăn trở: Liệu có thực sự muốn hòa bình?",
        "Cỗ máy kiếm tiền từ chiến tranh & Tương lai",
        "Trái đất trong đêm: Hướng tới một thế giới hòa bình"
    ]
}

data_path = Path("src/data/usWarEconomyData.ts")
text = data_path.read_text(encoding="utf-8")

# 1. Thêm imageDescriptions vào DocumentaryChapter interface
if "imageDescriptions?: string[];" not in text:
    text = text.replace(
        "  images: string[];\n}",
        "  images: string[];\n  imageDescriptions?: string[];\n}"
    )

# 2. Thêm imageDescriptions cho từng chapter
for part_id, descs in DESCRIPTIONS.items():
    formatted_descs = json.dumps(descs, ensure_ascii=False, indent=6)
    # Tìm đoạn của chapter
    target = f'id: "{part_id}",'
    idx = text.find(target)
    if idx != -1:
        # Tìm chỗ kết thúc mảng images của chapter này
        img_idx = text.find("images: [", idx)
        close_img_idx = text.find("],", img_idx) + 2
        # Kiểm tra xem đã có imageDescriptions chưa
        if "imageDescriptions:" not in text[idx:idx+1500]:
            insert_str = f"\n    imageDescriptions: {formatted_descs},"
            text = text[:close_img_idx] + insert_str + text[close_img_idx:]

data_path.write_text(text, encoding="utf-8")
print("Done updating usWarEconomyData.ts with all 94 image descriptions!")
